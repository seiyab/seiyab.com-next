// eslint-disable-next-line
module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs`, `fast-glob` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
      config.externals = {
        'fast-glob': 'null',
      };
    }

    return config
  }
}
