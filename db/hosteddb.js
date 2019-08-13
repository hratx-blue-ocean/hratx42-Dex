const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const pg = require('pg');
require('dotenv').config();
const pgClient = new pg.Client({
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || '',
    database: 'dexdb'
});

pgClient.connect((err) => {
    if (err) console.log("Could not connect to database:", err);
    else console.log("Connected to database!");
});

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

// const getMasterTableData = async (tableId) => {
//     const tableData = await pgClient.query(`
//             select 
//                 t.id as table_id,
//                 t.name as table_name,
//                 tu.id as table_member_id,
//                 tu.name as table_member_name,
//                 d.id as deck_id,
//                 d.title as deck_title,
//                 c.id as card_id,
//                 c.deck_id as card_deck_id,
//                 c.title as card_title, 
//                 c.description as card_description, 
//                 c.updated_at as card_updated,
//                 c.created_at as card_created, 
//                 c.weight as card_weight,
//                 c.impact as card_impact,
//                 c.due_date as card_due_date,
//                 cu.id as card_member_id,
//                 cu.name as card_member_name,
//                 l.label_name as card_label_name,
//                 l.color as card_label_color
//             from dex_tables t 
//                 join tables_members tm on t.id = tm.table_id 
//                 join users tu on tm.member_id = tu.id
//                 join decks d on t.id = d.table_id
//                 join cards c on d.id = c.deck_id
//                 join cards_members cm on c.id = cm.card_id
//                 join users cu on cm.user_id = cu.id
//                 join cards_labels cl on c.id = cl.card_id
//                 join labels l on cl.label_id = l.id
//             where t.id = $1;
//         `, [tableId]
//     )
//     return tableData;
// }
// // getUserInfoByEmail('ddd@aaa.com')
// // pgClient.query(`INSERT INTO Users VALUES (default, 'DUCKDUCKGO', 123, '123@123')`)

module.exports = db;
