DROP FUNCTION decks_notify() CASCADE;
DROP TABLE decks; 

CREATE OR REPLACE FUNCTION decks_notify() RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      PERFORM pg_notify('insert_deck', row_to_json(NEW)::text);
    ELSIF TG_OP = 'UPDATE' THEN
      PERFORM pg_notify(CAST('update_deck' AS text), row_to_json(NEW)::text);
    ELSIF TG_OP = 'DELETE' THEN
      PERFORM pg_notify(CAST('delete_deck' AS text), row_to_json(old)::text);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TABLE IF NOT EXISTS decks (
    id serial primary key,
    name varchar(150) NOT NULL,
);

CREATE TRIGGER before_insert_decks_trigger BEFORE INSERT ON decks FOR EACH ROW EXECUTE PROCEDURE decks_notify();
CREATE TRIGGER update_decks_trigger AFTER UPDATE ON decks FOR EACH ROW EXECUTE PROCEDURE decks_notify();
CREATE TRIGGER after_delete_decks_trigger AFTER DELETE ON decks FOR EACH ROW EXECUTE PROCEDURE decks_notify();