import { v4 as uuidv4 } from 'uuid';
import userData from '../../data/users.json' with { type: 'json' };

const createUser = (username, password, name, email, phoneNumber, pictureUrl) => {
    const newUser = {
        id: uuidv4(),
        username,
        password,
        name,
        email,
        phoneNumber,
        pictureUrl,
    };

    userData.users.push(newUser);
    return newUser;
};

export default createUser;