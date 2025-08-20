import userData from '../../data/users.json' with { type: 'json' };

const deleteUserById = (id) => {
    const userIndex = userData.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return null;
    }

    const deleteUser = userData.users.splice(userIndex, 1);
    return deleteUser;
};

export default deleteUserById;