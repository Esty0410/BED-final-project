import hostData from '../../data/hosts.json' with { type: 'json' };

const getHosts = () => {
    return hostData.hosts;
};

export default getHosts;