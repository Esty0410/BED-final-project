import hostData from '../../data/hosts.json' with { type: 'json'};

const getHostByName = (name) => {
    return hostData.hosts.find((host) => host.name === name);
};

export default getHostByName;