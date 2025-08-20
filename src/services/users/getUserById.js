import userData from '../../data/users.json' with { type: 'json' };

const getUserById = (id) => {
    const user = userData.users.find((user) => user.id === id);
    if (!user) {
        return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export default getUserById;