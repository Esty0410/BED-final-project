import hostData from '../../data/hosts.json' with { type: 'json' };

const updateHostById = (id, updatedHost) => {
    const hostIndex = hostData.hosts.findIndex((host) => host.id === id);

    if (hostIndex === -1) {
        return null;
    }

    const { username, password, name, email, phoneNumber, pictureUrl, aboutMe } = updatedHost;

    hostData.hosts[hostIndex] = {
        ...hostData.hosts[hostIndex],
        username: username || hostData.hosts[hostIndex].username,
        password: password || hostData.hosts[hostIndex].password,
        name: name || hostData.hosts[hostIndex].name,
        email: email || hostData.hosts[hostIndex].email,
        phoneNumber: phoneNumber || hostData.hosts[hostIndex].phoneNumber,
        pictureUrl: pictureUrl || hostData.hosts[hostIndex].pictureUrl,
        aboutMe: aboutMe || hostData.hosts[hostIndex].aboutMe,
    };

    return hostData.hosts[hostIndex];
};

export default updateHostById;