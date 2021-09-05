module.exports = {
    images: {
        domains: ["links.papareact.com", "image.tmdb.org", "firebasestorage.googleapis.com"],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.node = {
                net: 'empty'
            };
        }

        return config;
    }
}