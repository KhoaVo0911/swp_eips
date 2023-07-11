const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/demo/api/v1/general/login',
    createProxyMiddleware({
      target: 'http://localhost:4000', // Địa chỉ Tomcat chạy
      changeOrigin: true,
    })
  );
};
