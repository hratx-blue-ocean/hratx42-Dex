DROP FUNCTION cards_notify() CASCADE;
DROP TABLE cards; 

CREATE OR REPLACE FUNCTION tables_notify() RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      PERFORM pg_notify('insert_table', row_to_json(NEW)::text);
    ELSIF TG_OP = 'UPDATE' THEN
      PERFORM pg_notify(CAST('update_table' AS text), row_to_json(NEW)::text);
    ELSIF TG_OP = 'DELETE' THEN
      PERFORM pg_notify(CAST('delete_table' AS text), row_to_json(old)::text);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TABLE IF NOT EXISTS tables (
    id serial primary key,
    table_id int,
    title varchar,
    weight int,
    impact int,
    label varchar, 
    due_date varchar,
    description text, 
    working_users varchar
);

CREATE TRIGGER before_insert_cards_trigger BEFORE INSERT ON cards FOR EACH ROW EXECUTE PROCEDURE tables_notify();
CREATE TRIGGER update_cards_trigger AFTER UPDATE ON cards FOR EACH ROW EXECUTE PROCEDURE tables_notify();
CREATE TRIGGER after_delete_cards_trigger AFTER DELETE ON cards FOR EACH ROW EXECUTE PROCEDURE tables_notify();