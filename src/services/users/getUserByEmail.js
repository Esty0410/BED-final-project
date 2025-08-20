import userData from '../../data/users.json' with { type: 'json'};

const getUserByEmail = (email) => {
    const user = userData.users.find((user) => user.email === email);

    if (!user) {
        return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export default getUserByEmail;