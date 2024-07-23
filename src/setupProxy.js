/* eslint-disable import/no-extraneous-dependencies */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/weather-api',
    createProxyMiddleware({
      target: 'https://api.openweathermap.org',
      changeOrigin: true,
      pathRewrite: {
        '^/weather-api': '', // URL에서 /weather-api를 제거
      },
    })
  );
  app.use(
    '/tmap-tile',
    createProxyMiddleware({
      target: 'http://topopentile3.tmap.co.kr',
      changeOrigin: true,
      pathRewrite: {
        '^/tmap-tile': '', // URL에서 /tmap-tile을 제거
      },
    })
  );
};
