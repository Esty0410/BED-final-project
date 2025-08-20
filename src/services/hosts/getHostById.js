import hostData from '../../data/hosts.json' with { type: 'json' };

const getHostById = (id) => {
    return hostData.hosts.find((host) => host.id === id);
};

export default getHostById;
