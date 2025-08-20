import { v4 as uuidv4 } from 'uuid';
import hostData from '../../data/hosts.json' with { type: 'json' };

const createHost = (username, password, name, email, phoneNumber, pictureUrl, aboutMe) => {
    const newHost = {
        id: uuidv4(),
        username,
        password,
        name,
        email,
        phoneNumber,
        pictureUrl,
        aboutMe,
    };

    hostData.hosts.push(newHost);
    return newHost;
};

export default createHost;