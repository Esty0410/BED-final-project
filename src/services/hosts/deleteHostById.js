import hostData from '../../data/hosts.json' with { type: 'json' };

const deleteHostById = (id) => {
    const hostIndex = hostData.hosts.findIndex(host => host.id === id);

    if (hostIndex === -1) {
        return null;
    }

    const deletedHost = hostData.hosts.splice(hostIndex, 1);
    return deletedHost;
};

export default deleteHostById;