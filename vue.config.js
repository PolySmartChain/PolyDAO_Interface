module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warning: false,
      errors: false,
    },
  },
  configureWebpack: {
    // devtool
    devtool: "cheap-module-eval-source-map",
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "POLYDAO";
      return args;
    });
  },
};
