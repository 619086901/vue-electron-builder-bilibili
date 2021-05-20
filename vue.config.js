module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true, //开启nodejs环境
      builderOptions: {
        nsis: {
          //https://www.electron.build/configuration/nsis
          // 是否一键安装
          oneClick: false,
          // 允许请求提升
          allowElevation: true,
          //是否允许用户更改安装目录。
          allowToChangeInstallationDirectory: true,
          // 图标名称
          shortcutName: 'demo'
        }
      }
    }
    //C:\Users\Administrator\AppData\Local\Programs\demo\demo.exe
  },
  css: {
    loaderOptions: {
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  }
}
