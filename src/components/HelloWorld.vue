<template class="touming">
  <span class="min" @click="min">-</span>
  <span class="close" @click="close">×</span>

  <ul class="ul1">
    <span class="span1">粉丝数:</span>
    <li class="li1">{{ fensi.follower }}</li>
  </ul>

  <ul class="ul2">
    <span>关注数:</span>
    <li>{{ fensi.following }}</li>
    <span>播放数:</span>
    <li>{{ fensi.sum }}</li>
    <span>评论量:</span>
    <li>{{ fensi.comment }}</li>
    <span>弹幕数:</span>
    <li>{{ fensi.video_review }}</li>
  </ul>
  <button @click="start">获取</button>
  <span class="span2">查询ID:</span>
  <input type="text" name="input1" id="input1" v-model="fensi.id" />
</template>

<script>
import { ref, reactive } from 'vue'

//通信器
import { ipcRenderer } from 'electron'

//防抖
import _ from 'lodash'
export default {
  name: 'HelloWorld',
  setup() {
    const fensi = reactive({
      id: '27856360', //id
      //粉丝数
      follower: 0,
      //关注数
      following: 0,
      //当前所有视频播放量(被删的没有)
      sum: 0,
      //评论量
      comment: 0,
      //弹幕数
      video_review: 0,
      timer: null,
      time: 15000
    })

    //获取粉丝数
    const but1 = () => {
      ipcRenderer.send('fans', { id: fensi.id })
    }

    const start = () => {
      if (fensi.timer) {
        clearInterval(fensi.timer)
      }
      fensi.timer = setInterval(() => {
        but1()
        but2()
      }, fensi.time)
    }

    //监听返回的粉丝数
    ipcRenderer.on('fansbili', (event, arg) => {
      fensi.follower = arg.follower
      fensi.following = arg.following
    })

    //获取播放数
    const but2 = () => {
      ipcRenderer.send('play', { id: fensi.id })
    }

    //监听返回的播放数
    ipcRenderer.on('playbili', (event, arg) => {
      fensi.sum = arg.sum
      fensi.comment = arg.comment
      fensi.video_review = arg.video_review
    })

    //关闭窗口
    const close = () => {
      ipcRenderer.send('close')
    }

    //缩小
    const min = () => {
      ipcRenderer.send('min')
    }

    return {
      fensi,
      close,
      min,
      start
    }
  }
}
</script>

<style scoped lang="scss">
ul {
  //字体颜色
  color: transparent;
  background: linear-gradient(90deg, #00ff8a, #8e038c);
  background-clip: text;
}
.ul1 {
  text-align: center;
  list-style: none;
  .li1 {
    font-size: 60px;
  }
  .span1 {
    font-size: 16px;
  }
  span {
    //取消文本选择
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
  li {
    //取消文本选择
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
}
.span2 {
  //字体颜色
  color: transparent;
  background: linear-gradient(90deg, #00ff8a, #8e038c);
  background-clip: text;
}
.ul2 {
  display: flex;
  justify-content: space-between;
  list-style: none;
  span {
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
  li {
    //取消文本选择
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }
}
//按钮
button {
  -webkit-app-region: no-drag; //可拖拽区
  color: transparent;
  background: linear-gradient(90deg, #00ff8a, #8e038c);
  background-clip: text;
  width: 50px;
  padding: 5px;
  margin-left: 100px;
  border: none; //取消默认样式
  outline: none; //取消选择样式
}
button:hover {
  border-bottom: 2px solid #bd16df;
}

//ID框
input {
  -webkit-app-region: no-drag; //可拖拽区
  border: none; //取消默认样式
  outline: none; //取消选择样式
  width: 80px;
  opacity: 0;
}
input:hover {
  opacity: 1;
}

//关闭
.close {
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
}
.close:hover {
  color: red;
  cursor: default; //光标变手
  border-bottom: 2px solid #bd16df;
}

//缩小
.min {
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 20px;
  width: 20px;
  height: 20px;
}
.min:hover {
  color: red;
  cursor: default; //光标变手
  border-bottom: 2px solid #bd16df;
}
</style>
