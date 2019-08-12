DROP FUNCTION tables_notify() CASCADE;
DROP TABLE tables; 

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

CREATE TABLE IF NOT EXISTS dex_tables (
    id serial primary key,
    name varchar(255)
);

CREATE TRIGGER before_insert_tables_trigger BEFORE INSERT ON dex_tables FOR EACH ROW EXECUTE PROCEDURE tables_notify();
CREATE TRIGGER update_tables_trigger AFTER UPDATE ON dex_tables FOR EACH ROW EXECUTE PROCEDURE tables_notify();
CREATE TRIGGER after_delete_tables_trigger AFTER DELETE ON dex_tables FOR EACH ROW EXECUTE PROCEDURE tables_notify();



CREATE OR REPLACE FUNCTION tables_members_notify() RETURNS trigger AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
      PERFORM pg_notify('insert_table_member', row_to_json(NEW)::text);
    ELSIF TG_OP = 'UPDATE' THEN
      PERFORM pg_notify(CAST('update_table_member' AS text), row_to_json(NEW)::text);
    ELSIF TG_OP = 'DELETE' THEN
      PERFORM pg_notify(CAST('delete_table_member' AS text), row_to_json(old)::text);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TABLE IF NOT EXISTS tables_members (
    id serial primary key,
    table_id int NOT NULL REFERENCES dex_tables(id),
    member_id int NOT NULL REFERENCES users(id)
);

CREATE TRIGGER before_insert_tables_members_trigger BEFORE INSERT ON tables_members FOR EACH ROW EXECUTE PROCEDURE tables_members_notify();
CREATE TRIGGER update_tables_members_trigger AFTER UPDATE ON tables_members FOR EACH ROW EXECUTE PROCEDURE tables_members_notify();
CREATE TRIGGER after_delete_tables_members_trigger AFTER DELETE ON tables_members FOR EACH ROW EXECUTE PROCEDURE tables_members_notify();