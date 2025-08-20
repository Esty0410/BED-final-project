import userData from '../../data/users.json' with { type: 'json' };

const updateUserById = (id, updatedUser) => {
    const userIndex = userData.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return null;
    }

    const { username, password, name, email, phoneNumber, pictureUrl } = updatedUser;

    userData.users[userIndex] = {
        ...userData.users[userIndex],
        username: username || userData.users[userIndex].username,
        password: password || userData.users[userIndex].password,
        name: name || userData.users[userIndex].name,
        email: email || userData.users[userIndex].email,
        phoneNumber: phoneNumber || userData.users[userIndex].phoneNumber,
        pictureUrl: pictureUrl || userData.users[userIndex].pictureUrl,
    };

    return userData.users[userIndex];
};

export default updateUserById;