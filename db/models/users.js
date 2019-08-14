const pgClient = require('../hosteddb');

const usersModel = {
  async getUserByID(id) {
    // update to include querying profiles table with INNER JOIN
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
    const userInfo = await pgClient.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    return userInfo;
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
  updateUser: async ({ name, hashedPassword, email, id, imageURL }) => {
    // Will not currently work as profiles schema is not yet made
    const updateUser = await pgClient.query(
      `UPDATE users SET name = '${name}', hashedPassword = '${hashedPassword}', email = '${email}' WHERE id = ${id};`
    );
    const updateProfile = await pgClient.query(
      `UPDATE users INNER JOIN profiles SET profiles.name = '${name}', profiles.imageURL = '${imageURL}' ON users.id = ${id} AND users.profileID = profiles.id;`
    );
  },
};

module.exports = usersModel;
