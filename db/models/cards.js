const pgClient = require('../hosteddb');

const cardsModel = {
  async getCardsByDeckId(deckId) {
    const query = `
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
        group by c.id;`
    const {rows: cards} = await pgClient.query(query, [deckId])
    return cards;
  },
  async getCardByID(id){
      const query = `
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
        where c.id = $1 
        group by c.id;
      `;
      const {rows: cards} = pgClient.query(query, id);
      return cards[0];
  },

  async delete(id){
    const query = 'delete from cards where id = $1';
    const values = [id]
    const result = await pgClient.query(query, values)
    return result;
  },

// create new card
  async createNewCard({
    table_id,
    deck_id,
    title,
    weight,
    impact,
    due_date,
    description,
    created_at,
    updated_at
  }){
    const newCard = await pgClient.query(
      `INSERT INTO cards VALUES (default, ${table_id}, ${deck_id}, '${title}', ${weight}, ${impact}, ${due_date}, '${description}', ${created_at}, ${updated_at})`
    );
    return newCard;
  },
  
  // update card
  async updateCard (
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
  ){
    const updatedCard = await pgClient.query(
      `UPDATE cards SET deck_id = ${deck_id}, title = '${title}', weight = ${weight}, impact = ${impact}, due_date = ${due_date}, description = '${description}', created_at = ${created_at}, updated_at = ${updated_at} WHERE id = ${id}`
    );
    return updatedCard;
  },
  async addUserToCard(cardId, memberId){
    const query = `insert into cards_members (card_id, user_id)
                   values ($1, $2) returning user_id;`;
    const {rows: result} = await pgClient.query(query, [cardId, memberId]);
    const insertedMemberId = await result[0].member_id;
    return insertedMemberId;
  },
  async removeUserFromCard(cardId, memberId){
    const query = `delete from cards_members where card_id = $1 and user_id = $2 returning 1;`;
    const {rows: result} = await pgClient.query(query, [cardId, memberId]);
    const deletedMemberId = await result[0];
    return deletedMemberId;
  },
  async addLabelToCard(cardId, labelId){
    const query = `insert into cards_labels (card_id, label_id)
                   values ($1, $2) returning label_id;`;
    const {rows: result} = await pgClient.query(query, [cardId, memberId]);
    const insertedLabelId = await result[0].member_id;
    return insertedLabelId;
  },
  // delete card
  async deleteCard(cardID){
    const deletedCard = await pgClient.query(
      `DELETE FROM cards WHERE id = ${cardID} RETURNING id;`
    );
    return deletedCard;
  }
}

module.exports = cardsModel;
