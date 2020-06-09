module.exports = {
  plugins: [
    /*
    ['module-resolver', {
      'ws-client': 'node_modules/ws/lib/websocket',
    }],
    */
    ['@babel/plugin-transform-template-literals', {
      loose: true,
    }],
  ],
  presets: [
    ['@babel/preset-env', {
      modules: false,
      targets: {
        node: 'current',
      },
    }],
    ['@babel/preset-typescript'],
  ],
};
