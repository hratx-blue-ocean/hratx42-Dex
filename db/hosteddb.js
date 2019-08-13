const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
console.log(
  require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
);
const pg = require('pg');
require('dotenv').config();
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

const db = async id => {
  const product = await pgClient.query(`SELECT * FROM dex_tables`);
  return product;
};

const getUserInfoByEmail = async email => {
  const userInfo = await pgClient.query(
    `SELECT * FROM users WHERE email = '${email}';`
  );
  return userInfo;
};

const createNewUser = async ({ name, hashedPassword, email }) => {
  const userInfo = await pgClient.query(
    `INSERT INTO users VALUES (default, '${name}', '${hashedPassword}', '${email}');`
  );
  return userInfo;
};
// getUserInfoByEmail('ddd@aaa.com')
// pgClient.query(`INSERT INTO Users VALUES (default, 'DUCKDUCKGO', 123, '123@123')`)

// get card info by cardID
const getCardByID = async cardID => {
  const cardInfo = await pgClient.query(
    `SELECT * FROM cards WHERE id = ${cardID};`
  );
  return cardInfo;
};

// create new card
const createNewCard = async ({
  table_id,
  deck_id,
  title,
  weight,
  impact,
  due_date,
  description,
  created_at,
  updated_at
}) => {
  const newCard = await pgClient.query(
    `INSERT INTO cards VALUES (default, ${table_id}, ${deck_id}, '${title}', ${weight}, ${impact}, ${due_date}, '${description}', ${created_at}, ${updated_at})`
  );
  return newCard;
};

// update card
const updateCard = async (
  {
    table_id,
    deck_id,
    title,
    weight,
    impact,
    due_date,
    description,
    created_at,
    updated_at
  },
  id
) => {
  const updatedCard = await pgClient.query(
    `UPDATE cards SET table_id = ${table_id}, deck_id = ${deck_id}, title = '${title}', weight = ${weight}, impact = ${impact}, due_date = ${due_date}, description = '${description}', created_at = ${created_at}, updated_at = ${updated_at} WHERE id = ${id}`
  );
  return updatedCard;
};

// delete card
const deleteCard = async cardID => {
  const deletedCard = await pgClient.query(
    `DELETE FROM cards WHERE id = ${cardID} RETURNING id;`
  );
  return deletedCard;
};

module.exports = {
  db,
  getUserInfoByEmail,
  createNewUser,
  getCardByID,
  createNewCard,
  updateCard,
  deleteCard
};
