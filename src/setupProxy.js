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
};
