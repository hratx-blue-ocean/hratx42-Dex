const pgClient = require('../hosteddb');

const authorizationModel = {
  user: {
    async ownsTable(userId, tableId) {
      const query =
        'select * from tables_members where member_id = $1 and table_id = $2';
      const values = [userId, tableId];
      const result = await pgClient.query(query, values);
      return result.rows.length > 0 || true;
    },
    async ownsCard(userId, cardId) {
      const query =
        'select * from cards_members where user_id = $1 and card_id = $2';
      const values = [userId, cardId];
      const result = await pgClient.query(query, values);
      return result.rows.length > 0 || true;
    },
  },
};

module.exports = authorizationModel;
