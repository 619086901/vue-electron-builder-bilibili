<template>
  <div :class="['tm']">
    <span class="min" @click="min">-</span>
    <span class="close" @click="close">×</span>
    <span class="suo" @click="suo" v-html="fensi.rawhtml"></span>

    <ul class="ul1">
      <span class="span1">粉丝数:</span>
      <li class="li1">{{ fensi.follower }}</li>
      <!--是否添加flase过渡 ‘+’号的颜色-->
      <span
        :class="[
          'follower',
          fensi.flash ? 'flash' : '',
          fensi.add ? 'addcolor' : 'deletecolor'
        ]"
      >
        <!--是否添加+号-->
        <template v-if="fensi.add">
          <span>+</span>
        </template>
        <!--增加的粉丝-->
        <span>{{ fensi.a }}</span>
      </span>
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
  </div>
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
      //定时器
      timer: null,
      //定时器延迟
      time: 15000,
      //锁定开关
      rawhtml: `&#128077;`,
      //
      a: 12,
      //动画开关
      flash: false,
      //是否添加+号
      add: false
    })

    //获取粉丝数
    const but1 = () => {
      ipcRenderer.send('fans', { id: fensi.id })
    }

    //开始获取
    const start = () => {
      if (fensi.timer) {
        clearInterval(fensi.timer)
      }
      fensi.timer = setInterval(() => {
        but1()
        but2()
      }, fensi.time)
    }
    //罗翔测试id 517327498
    //监听返回的粉丝数
    ipcRenderer.on('fansbili', (event, arg) => {
      if (arg.follower > fensi.follower) {
        fensi.add = true
      } else {
        fensi.add = false
      }

      fensi.a = arg.follower - fensi.follower
      if (fensi.a !== 0) {
        fensi.flash = true
      }

      fensi.follower = arg.follower
      fensi.following = arg.following
      setTimeout(() => {
        fensi.flash = false
        fensi.add = false
      }, 4000)
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

    //锁定
    const suo = () => {
      if (fensi.rawhtml === '&#128077;') {
        fensi.rawhtml = '&#128078;'
      } else {
        fensi.rawhtml = '&#128077;'
      }
      ipcRenderer.send('move')
    }

    return {
      fensi,
      close,
      min,
      suo,
      start
    }
  }
}
</script>

<style scoped lang="scss">
.tm {
  overflow: hidden;
}

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
  //粉丝样式
  .follower {
    position: absolute;
    border: 1px solid red;
    margin-top: -50px;
    margin-left: 30px;
    font-size: 25px;
    opacity: 0;
  }
  //动画过渡
  .flash {
    animation: mya 4s;
  }
  //增加粉丝颜色
  .addcolor {
    color: rgb(0, 255, 255);
  }
  //减少粉丝颜色
  .deletecolor {
    color: red;
  }
  @keyframes mya {
    from {
      opacity: 1;
      margin-top: -50px;
    }
    to {
      opacity: 0;
      margin-top: -100px;
    }
  }
}
//查询ID
.span2 {
  //字体颜色
  color: transparent;
  background: linear-gradient(90deg, #00ff8a, #8e038c);
  background-clip: text;
}
//关注数列表
.ul2 {
  display: flex;
  justify-content: space-between;
  list-style: none;
  span {
    -webkit-user-select: none;
    -webkit-app-region: drag;
    border: 1px solid red;
    margin-left: 1px;
  }
  li {
    //取消文本选择
    -webkit-user-select: none;
    -webkit-app-region: drag;
    margin-left: 10px;
    border: 1px solid red;
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
  width: 30px;
  height: 30px;
  font-size: 30px;
  color: white;
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
  margin-right: 30px;
  width: 20px;
  height: 20px;
  width: 30px;
  height: 30px;
  font-size: 30px;
  color: white;
}
.min:hover {
  color: red;
  cursor: default; //光标变手
  border-bottom: 2px solid #bd16df;
}

//锁定
.suo {
  position: absolute;
  right: 0;
  top: 0;
  margin-right: 60px;
  width: 20px;
  height: 20px;
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: white;
}
.suo:hover {
  color: red;
  cursor: default; //光标变手
  border-bottom: 2px solid #bd16df;
}
</style>
