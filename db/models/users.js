const pgClient = require('../hosteddb');

const usersModel = {
    getUserByID: async (id) => {
        // update to include querying profiles table with INNER JOIN
        const user = await pgClient.query(`SELECT name, email FROM users WHERE id = ${id};`);
        return user;
    },
    getUserInfoByEmail: async (email) => {
        const userInfo = await pgClient.query(`SELECT * FROM users WHERE email = '${email}';`)
        return userInfo;
    },
    createNewUser: async ({ name, hashedPassword, email }) => {
        const userInfo = await pgClient.query(`INSERT INTO users VALUES (default, '${name}', '${hashedPassword}', '${email}');`)
        return userInfo
    },
    deleteUser: async (id) => {
        const deletedUser = await pgClient.query(`DELETE FROM users WHERE id = ${id};`);
        return deletedUser;
    },
    updateUser: async ({ name, hashedPassword, email, id, imageURL }) => {
        // Will not currently work as profiles schema is not yet made
        const updateUser = await pgClient.query(`UPDATE users SET name = '${name}', hashedPassword = '${hashedPassword}', email = '${email}' WHERE id = ${id};`)
        const updateProfile = await pgClient.query(`UPDATE users INNER JOIN profiles SET profiles.name = '${name}', profiles.imageURL = '${imageURL}' ON users.id = ${id} AND users.profileID = profiles.id;`)
    }
}

module.exports = usersModel;
