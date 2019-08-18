const { pgClient } = require('../hosteddb');
const makeUpdateString = require('../utils/makeUpdateString');

const usersModel = {
  async getUserByID(id) {
    const query = 'SELECT name, email FROM users WHERE id = $1;';
    const { rows: users } = await pgClient.query(query, [id]);
    return users[0];
  },

  async getUsersByTableId(tableId) {
    try {
      const query =
        'select distinct users.name, users.id from users inner join tables_members on tables_members.table_id = $1 and tables_members.member_id = users.id';
      const { rows: users } = await pgClient.query(query, [tableId]);
      return users;
    } catch (error) {
      console.error(error);
    }
  },

  getUserInfoByEmail: async email => {
    const { rows: users } = await pgClient.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    return users[0];
  },
  createNewUser: async ({ name, hashedPassword, email }) => {
    const userInfo = await pgClient.query(
      `INSERT INTO users VALUES (default, '${name}', '${hashedPassword}', '${email}');`
    );
    return userInfo;
  },
  deleteUser: async id => {
    const deletedUser = await pgClient.query(
      `DELETE FROM users WHERE id = ${id};`
    );
    return deletedUser;
  },
  updateUser: async user => {
    const query = makeUpdateString(user, 'users');
    const values = Object.values(user);
    const { rows: users } = await pgClient.query(query, values);
    return users[0];
  },
};

module.exports = usersModel;
