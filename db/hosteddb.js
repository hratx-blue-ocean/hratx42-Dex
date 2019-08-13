const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const pg = require('pg');
const pgClient = new pg.Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  database: 'dexdb'
});

pgClient.connect(err => {
  if (err) console.log('Could not connect to database:', err);
  else console.log('Connected to database!');
});

module.exports = pgClient;

const db = {};

db.getTables = async (id) => {
    const product = await pgClient.query(
        `SELECT * FROM dex_tables`
    );
    return product;
}

db.getUserInfoByEmail = async (email) => {
    const userInfo = await pgClient.query(`SELECT * FROM users WHERE email = '${email}';`)
    return userInfo;
}

db.createNewUser = async ({name, hashedPassword, email}) => {
    const userInfo = await pgClient.query(`INSERT INTO users VALUES (default, '${name}', '${hashedPassword}', '${email}');`)
    return userInfo
}

db.getCardsByDeckId = async deckId => {
    return pgClient.query(`
        select 
            c.id as card_id,
            c.title as card_title,
            c.description as card_description,
            c.updated_at as card_updated,
            c.created_at as card_created,
            c.weight as card_weight,
            c.impact as card_impact,
            array_agg(
                json_build_object(
                    'member_id', cast(u.id as varchar),
                    'member_name', u.name
                )
            ) as cards_members,
            array_agg(
                json_build_object(
                    'label_name', l.label_name,
                    'color', l.color
                )
            ) as card_labels
        from
            cards c 
            join cards_members cm on c.id = cm.card_id
            join users u on cm.user_id = u.id
            join cards_labels cl on c.id = cl.card_id
            join labels l on cl.label_id = l.id
        where c.deck_id = $1 
        group by c.id;
    `, [deckId])
}

// getUserInfoByEmail('ddd@aaa.com')
// pgClient.query(`INSERT INTO Users VALUES (default, 'DUCKDUCKGO', 123, '123@123')`)

module.exports = pgClient;

