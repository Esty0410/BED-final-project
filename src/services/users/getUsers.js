import userData from '../../data/users.json' with { type: 'json' };

const getUsers = () => {
    return userData.users.map(({ password, ...user}) => user);
};

export default getUsers;