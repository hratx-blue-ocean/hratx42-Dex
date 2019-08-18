const { pgClient } = require('../hosteddb');

const getColumnsString = require('../utils/getColumns');
const getValuesString = require('../utils/getValuesString');
const makeUpdateString = require('../utils/makeUpdateString');

const cardsModel = {
   async getCardsByDeckId(deckId) {
     const query = `
         select 
           c.id,
           c.title,
           c.description,
           c.due_date,
           c.weight,
           c.impact,
           c.table_id,
           c.deck_id,
           array_agg(
             json_build_object(
               'member_id', cast(u.id as varchar),
               'member_name', u.name
             )
           ) as cards_members,
           array_agg(
             json_build_object(
                 'id', l.id,
                 'label_name', l.label_name,
                 'color', l.color
             )
           ) as card_labels
         from
           cards c 
           left outer join cards_members cm on c.id = cm.card_id
           left join users u on cm.user_id = u.id
           left outer join cards_labels cl on c.id = cl.card_id
           left join labels l on cl.label_id = l.id
         where c.deck_id = $1 
         group by c.id;`;
     const { rows: cards } = await pgClient.query(query, [deckId]);
     return cards;
   },
  async getCardByID(id) {
    const query = `
        select 
          c.id,
          c.title,
          c.description,
          c.due_date,
          c.weight,
          c.impact,
          c.table_id,
          c.deck_id,
          array_agg(
            json_build_object(
              'member_id', cast(u.id as varchar),
              'member_name', u.name
            )
          ) as cards_members,
          array_agg(
            json_build_object(
                'id', l.id,
                'label_name', l.label_name,
                'color', l.color
            )
          ) as card_labels
        from
          cards c 
          left outer join cards_members cm on c.id = cm.card_id
          left join users u on cm.user_id = u.id
          left outer join cards_labels cl on c.id = cl.card_id
          left join labels l on cl.label_id = l.id
        where c.id = $1 
        group by c.id;
      `;
    const { rows: cards } = await pgClient.query(query, [id]);
    return cards[0];
  },
  async getCardsByUserID(userId) {
    const query = `
        select
          c.id,
          c.title,
          c.description,
          c.due_date,
          c.weight,
          c.impact,
          array_agg(
            json_build_object(
                'id', l.id,
                'label_name', l.label_name,
                'color', l.color
            )
          ) as card_labels,
          array_agg(
            json_build_object(
              'member_id', cast(u.id as varchar),
              'member_name', u.name
            )
          ) as cards_members
        from
          cards c 
          left outer join cards_members cm on c.id = cm.card_id
          left join users u on cm.user_id = u.id
          left outer join cards_labels cl on c.id = cl.card_id
          left join labels l on cl.label_id = l.id
          inner join cards_members cm2 on cm2.card_id = c.id
          where cm2.user_id = $1
        group by c.id;
      `;
    const { rows: cards } = await pgClient.query(query, [userId]);
    return cards;
  },
  async delete(id) {
    const query = 'delete from cards where id = $1';
    const values = [id];
    const result = await pgClient.query(query, values);
    return result;
  },
  // create new card
  async createNewCard(card) {
    const columnString = getColumnsString(card);
    const valuesString = getValuesString(card);
    const values = Object.values(card);
    let query = `Insert into cards ${columnString} values ${valuesString} returning *`;
    const { rows: cards } = await pgClient.query(query, values);
    return cards[0];
  },
  // update card
  async updateCard(card) {
    const query = makeUpdateString(card, 'cards');
    const values = Object.values(card);
    const { rows: cards } = await pgClient.query(query, values);
    return cards[0];
  },
  async addUserToCard(cardId, memberId) {
    const query = `insert into cards_members (card_id, user_id)
                   values ($1, $2) returning user_id;`;
    const { rows: result } = await pgClient.query(query, [cardId, memberId]);
    const insertedMemberId = await result[0].member_id;
    return insertedMemberId;
  },
  async removeUserFromCard(cardId, memberId) {
    const query = `delete from cards_members where card_id = $1 and user_id = $2 returning 1;`;
    const { rows: result } = await pgClient.query(query, [cardId, memberId]);
    const deletedMember = await result[0];
    return deletedMember;
  },
  async addLabelToCard(cardId, labelId) {
    const query = `insert into cards_labels (card_id, label_id)
                   values ($1, $2) returning label_id;`;
    const { rows: result } = await pgClient.query(query, [cardId, labelId]);
    const insertedLabelId = await result[0].label_id;
    return insertedLabelId;
  },
  async removeLabelFromCard(cardId, labelId) {
    const query = `delete from cards_labels where card_id = $1 and label_id = $2 returning 1;`;
    const { rows: result } = await pgClient.query(query, [cardId, labelId]);
    const deletedLabel = await result[0];
    return deletedLabel;
  },
  // delete card
  async deleteCard(cardId) {
    const query = 'delete from cards where id = $1 returning id;'
    const deletedCard = await pgClient.query(query, [cardId]);
    return deletedCard;
  },
  async countUserCardsByTable(userId, tableId){
    const query = `
    select count(c.id) from cards c
    inner join 
      (select * from cards_members where user_id = $1) cm
    on c.id = cm.card_id
    where c.table_id = $2;
    `;
    const {rows: results} = await pgClient.query(query, [userId, tableId]);
    return results[0];
  }
};

module.exports = cardsModel;
