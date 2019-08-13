DROP FUNCTION cards_notify() CASCADE;
DROP TABLE cards; 

CREATE OR REPLACE FUNCTION cards_notify() RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      PERFORM pg_notify('insert_card', row_to_json(NEW)::text);
    ELSIF TG_OP = 'UPDATE' THEN
      PERFORM pg_notify(CAST('update_card' AS text), row_to_json(NEW)::text);
    ELSIF TG_OP = 'DELETE' THEN
      PERFORM pg_notify(CAST('delete_card' AS text), row_to_json(old)::text);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS cards (
    id serial primary key,
    table_id int NOT NULL REFERENCES tables(id),
    deck_id int NOT NULL REFERENCES decks(id),
    title varchar(255) NOT NULL,
    weight int NOT NULL,
    impact int NOT NULL,
    due_date DATE,
    description text NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER before_insert_cards_trigger BEFORE INSERT ON cards FOR EACH ROW EXECUTE PROCEDURE cards_notify();
CREATE TRIGGER update_cards_trigger AFTER UPDATE ON cards FOR EACH ROW EXECUTE PROCEDURE cards_notify();
CREATE TRIGGER after_delete_cards_trigger AFTER DELETE ON cards FOR EACH ROW EXECUTE PROCEDURE cards_notify();
CREATE TRIGGER set_timestamp BEFORE UPDATE ON cards FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();

CREATE OR REPLACE FUNCTION labels_notify() RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      PERFORM pg_notify('insert_label', row_to_json(NEW)::text);
    ELSIF TG_OP = 'DELETE' THEN
      PERFORM pg_notify(CAST('delete_label' AS text), row_to_json(old)::text);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TABLE IF NOT EXISTS labels (
    id serial primary key,
    label_name varchar(100) NOT NULL,
    color varchar(100) NOT NULL
);

CREATE TRIGGER before_insert_label_trigger BEFORE INSERT ON labels FOR EACH ROW EXECUTE PROCEDURE labels_notify();
CREATE TRIGGER after_delete_label_trigger AFTER DELETE ON labels FOR EACH ROW EXECUTE PROCEDURE labels_notify();



CREATE OR REPLACE FUNCTION card_labels_notify() RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      PERFORM pg_notify('insert_card_label', row_to_json(NEW)::text);
    ELSIF TG_OP = 'DELETE' THEN
      PERFORM pg_notify(CAST('delete_card_label' AS text), row_to_json(old)::text);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';



CREATE TABLE IF NOT EXISTS cards_labels (
    id serial primary key,
    card_id int NOT NULL REFERENCES cards(id),
    label_id int NOT NULL REFERENCES labels(id)
);

CREATE TRIGGER before_insert_card_label_trigger BEFORE INSERT ON cards_labels FOR EACH ROW EXECUTE PROCEDURE card_labels_notify();
CREATE TRIGGER after_delete_card_label_trigger AFTER DELETE ON cards_labels FOR EACH ROW EXECUTE PROCEDURE card_labels_notify();



CREATE OR REPLACE FUNCTION card_members_notify() RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      PERFORM pg_notify('insert_card_member', row_to_json(NEW)::text);
    ELSIF TG_OP = 'DELETE' THEN
      PERFORM pg_notify(CAST('delete_card_member' AS text), row_to_json(old)::text);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TABLE IF NOT EXISTS cards_members (
    id serial primary key,
    card_id int NOT NULL REFERENCES cards(id),
    user_id int NOT NULL REFERENCES users(id)
);

CREATE TRIGGER before_insert_card_members_trigger BEFORE INSERT ON cards_members FOR EACH ROW EXECUTE PROCEDURE card_members_notify();
CREATE TRIGGER after_delete_card_members_trigger AFTER DELETE ON cards_members FOR EACH ROW EXECUTE PROCEDURE card_members_notify();
