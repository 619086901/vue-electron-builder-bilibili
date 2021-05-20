'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
import axios from 'axios'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    useContentSize: true,
    width: 550,
    height: 230,
    show: false, //解决闪烁
    transparent: true,
    frame: false, //是否有边框
    minWidth: 500,
    minHeight: 260,
    resizable: false, //可否缩放
    movable: true, //是否可移动
    fullscreenable: false, //是否可以进入全屏状态
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  //解决闪烁
  win.once('ready-to-show', () => {
    win.show()
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 如果处于开发模式，则加载dev服务器的url
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  //缩小
  ipcMain.on('min', (e) => win.minimize())
  // ipcMain.on('max', (e) => win.maximize())
  //关闭
  ipcMain.on('close', (e) => win.close())
  //锁定
  ipcMain.on('move', (e) => (win.movable = !win.movable))
}

//监听
ipcMain.on('fans', (event, data) => {
  idfans(data.id).then((response) => {
    let data = response.data
    event.reply('fansbili', {
      following: data.following, // 关注数
      follower: data.follower //粉丝数
    })
  })
})

//监听播放量
ipcMain.on('play', (event, data) => {
  //async 要用then()接收
  idplay(data.id)
    .then((response) => {
      let sum = 0 //当前视频播放量(被删的没有)
      let comment = 0 //评论量
      let video_review = 0 //弹幕数

      //取出想要的数据
      response.forEach((data) => {
        sum += data.play
        comment += data.comment
        video_review += data.video_review
      })
      //返回数据
      event.reply('playbili', {
        sum: sum,
        comment: comment,
        video_review: video_review
      })
    })
    .catch((e) => console.log(e))
})

//根据id获取粉丝数和关注数
let idfans = async (id) => {
  //27856360
  let url = `https://api.bilibili.com/x/relation/stat?vmid=${id}&jsonp=jsonp`
  let response = await axios.get(url)
  let data = await response.data
  return data
}

//根据id获取评论量和播放数和弹幕数
let idplay = async (id) => {
  let url = `https://api.bilibili.com/x/space/arc/search?mid=${id}&pn=1&ps=25&index=1&jsonp=jsonp`
  let response = await axios.get(url)
  const count = response.data.data.page.count
  let sum = [] //存储每一个视频信息
  let vlist = [] //存储每一页的每一个视频信息
  let startget = async () => {
    //根据总视频判断循环次数
    //ps视频数(上限100)
    //pn为页数
    for (let i = 1; i <= Math.floor(count / 90) + 1; i++) {
      let geturl = `https://api.bilibili.com/x/space/arc/search?mid=${id}&ps=90&tid=0&pn=${i}&keyword=&order=pubdate&jsonp=jsonp`
      let response = await axios.get(geturl)
      vlist = response.data.data.list.vlist
      sum = sum.concat(vlist) //合并数组返回新对象
    }
  }
  //promise 要用then接收
  await startget()
  return sum
}

app.on('window-all-closed', () => {
  //监听当应用程序不再有任何打开窗口时试图退出
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  //监听应用程序激活后没有可见窗口
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  createWindow()
})

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
