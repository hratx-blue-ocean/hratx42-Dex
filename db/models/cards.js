const pgClient = require('../hosteddb');

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
    `UPDATE cards SET deck_id = ${deck_id}, title = '${title}', weight = ${weight}, impact = ${impact}, due_date = ${due_date}, description = '${description}', created_at = ${created_at}, updated_at = ${updated_at} WHERE id = ${id}`
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
  getCardByID,
  createNewCard,
  updateCard,
  deleteCard
};
