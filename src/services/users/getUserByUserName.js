import userData from '../../data/users.json' with { type: 'json' };

const getUserByUserName = (username) => {
    const user = userData.users.find((user) => user.username === username);

    if (!user) {
        return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export default getUserByUserName;