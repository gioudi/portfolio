const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/portfolio/" : "/",
  pwa: {
    name: "Sergio Penagos — Portfolio",
    short_name: "Portfolio",
    themeColor: "#333333",
    backgroundColor: "#f2f2f2",
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("pdf")
      .test(/\.(pdf)(\?.*)?$/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "pdf/[name].[hash:8].[ext]",
      });
  },
});
