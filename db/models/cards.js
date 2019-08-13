const pgClient = require('../hosteddb');

const cardsModel = {
  async getCardsByDeckId(deckId) {
    const cards = pgClient.query(
      `
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
      `,
      [deckId]
    );
    return cards;
  }
};

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
  cardsModel,
  getCardByID,
  createNewCard,
  updateCard,
  deleteCard
};

