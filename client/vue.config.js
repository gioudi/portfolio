const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/portfolio/" : "/",
  chainWebpack: (config) => {
    /*  config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    .use('file-loader')
    .loader('file-loader')
    .options({
      name: 'img/[name].[hash:8].[ext]'
    }); */

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
