const pgClient = require('../hosteddb');

const authorizationModel = {
  user: {
    async ownsTable(userId, tableId) {
      let query =
        'select * from tables_members where member_id = $1 and table_id = $2';
      const values = [userId, tableId];
      const result = await pgClient.query(query, values);
      console.log('DB result ', result.rows);
      return result.rows.length > 0;
    },
    async ownsCard(userId, cardId) {
      const query =
        'select * from cards inner join tables_members on  tables_members.table_id = cards.table_id and tables_members.member_id = $1 and cards.id = $2';
      const values = [userId, cardId];
      const result = await pgClient.query(query, values);
      return result.rows.length > 0;
    },
  },
};

module.exports = authorizationModel;
