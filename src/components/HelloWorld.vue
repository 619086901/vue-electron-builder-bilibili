<template>
  <div :class="['tm']">
    <span class="min" @click="min">-</span>
    <span class="close" @click="close">×</span>

    <span class="suo" @click="suo">
      <i :class="[fensi.faClass, fensi.unlock]" aria-hidden="true"></i>
    </span>

    <div class="ul1">
      <span v-html="fensi.xiaochou"></span>
      <span class="span1">粉丝数:</span>
      <br />
      <span class="span2">{{ fensi.follower }}</span>
      <!--是否添加flase过渡 ‘+’号的颜色-->
      <span
        :class="[
          'follower',
          fensi.a.flash ? 'flash' : '',
          fensi.a.add ? 'addcolor' : 'deletecolor'
        ]"
      >
        <!--是否添加+号-->
        <template v-if="fensi.a.add">
          <span>+</span>
        </template>
        <!--增加的粉丝-->
        <span>{{ fensi.a.number }}</span>
      </span>
    </div>

    <div>
      <ul class="ul2">
        <span>关注数:</span>
        <li>{{ fensi.following }}</li>

        <!--是否添加flase过渡 ‘+’号的颜色-->
        <span
          :class="[
            'following',
            fensi.b.flash ? 'flash' : '',
            fensi.b.add ? 'addcolor' : 'deletecolor'
          ]"
        >
          <!--是否添加+号-->
          <template v-if="fensi.b.add">
            <span>+</span>
          </template>
          <!--增加的关注数-->
          <span>{{ fensi.b.number }}</span>
        </span>

        <span>播放数:</span>
        <li>{{ fensi.sum }}</li>

        <!--是否添加flase过渡 ‘+’号的颜色-->
        <span
          :class="[
            'sum',
            fensi.c.flash ? 'flash' : '',
            fensi.c.add ? 'addcolor' : 'deletecolor'
          ]"
        >
          <!--是否添加+号-->
          <template v-if="fensi.c.add">
            <span>+</span>
          </template>
          <!--增加的播放数-->
          <span>{{ fensi.c.number }}</span>
        </span>

        <span>评论量:</span>
        <li>{{ fensi.comment }}</li>

        <!--是否添加flase过渡 ‘+’号的颜色-->
        <span
          :class="[
            'comment',
            fensi.d.flash ? 'flash' : '',
            fensi.d.add ? 'addcolor' : 'deletecolor'
          ]"
        >
          <!--是否添加+号-->
          <template v-if="fensi.d.add">
            <span>+</span>
          </template>
          <!--增加的评论数-->
          <span>{{ fensi.d.number }}</span>
        </span>

        <span>弹幕数:</span>
        <li>{{ fensi.video_review }}</li>

        <!--是否添加flase过渡 ‘+’号的颜色-->
        <span
          :class="[
            'video_review',
            fensi.e.flash ? 'flash' : '',
            fensi.e.add ? 'addcolor' : 'deletecolor'
          ]"
        >
          <!--是否添加+号-->
          <template v-if="fensi.e.add">
            <span>+</span>
          </template>
          <!--增加的弹幕数-->
          <span>{{ fensi.e.number }}</span>
        </span>
      </ul>
    </div>

    <button @click="start">获取</button>
    <span class="span3">查询ID:</span>
    <input type="text" name="input1" id="input1" v-model="fensi.id" />
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

//通信器
import { ipcRenderer } from 'electron'

export default {
  name: 'HelloWorld',
  setup() {
    const fensi = reactive({
      //id
      id: '27856360',
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
      //锁图标
      faClass: 'fa',
      unlock: 'fa-unlock',
      //小丑图标
      xiaochou: `&#129313;`,
      //增加的粉丝数
      a: {
        number: 0, //增加的数量
        flash: false, //动画开关
        add: false //是否添加+号
      },
      //增加的关注数
      b: {
        number: 0, //增加的数量
        flash: false, //动画开关
        add: false //是否添加+号
      },
      //播放量
      c: {
        number: 0, //增加的数量
        flash: false, //动画开关
        add: false //是否添加+号
      },
      //评论量
      d: {
        number: 0, //增加的数量
        flash: false, //动画开关
        add: false //是否添加+号
      },
      //弹幕数
      e: {
        number: 0, //增加的数量
        flash: false, //动画开关
        add: false //是否添加+号
      }
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
      //粉丝数大于之前粉丝则添加+号
      if (arg.follower > fensi.follower) {
        fensi.a.add = true
      } else {
        fensi.a.add = false
      }

      if (arg.following > fensi.following) {
        fensi.b.add = true
      } else {
        fensi.b.add = false
      }

      fensi.a.number = arg.follower - fensi.follower
      fensi.b.number = arg.following - fensi.following

      //增加的粉丝不为0则开启动画过渡
      if (fensi.a.number !== 0) {
        fensi.a.flash = true
      }

      if (fensi.b.number !== 0) {
        fensi.b.flash = true
      }

      fensi.follower = arg.follower //当前粉丝数
      fensi.following = arg.following //当前关注数

      setTimeout(() => {
        fensi.a.flash = false
        fensi.a.add = false
        fensi.b.flash = false
        fensi.b.add = false
      }, 4000)
    })

    //获取播放数
    const but2 = () => {
      ipcRenderer.send('play', { id: fensi.id })
    }

    //监听返回的播放数
    ipcRenderer.on('playbili', (event, arg) => {
      //播放数大于之前粉丝则添加+号
      if (arg.sum > fensi.sum) {
        fensi.c.add = true
      } else {
        fensi.c.add = false
      }

      if (arg.comment > fensi.comment) {
        fensi.d.add = true
      } else {
        fensi.d.add = false
      }

      if (arg.video_review > fensi.video_review) {
        fensi.e.add = true
      } else {
        fensi.e.add = false
      }

      fensi.c.number = arg.sum - fensi.sum
      fensi.d.number = arg.comment - fensi.comment
      fensi.e.number = arg.video_review - fensi.video_review

      //增加的粉丝不为0则开启动画过渡
      if (fensi.c.number !== 0) {
        fensi.c.flash = true
      }

      if (fensi.d.number !== 0) {
        fensi.d.flash = true
      }

      if (fensi.e.number !== 0) {
        fensi.e.flash = true
      }

      fensi.sum = arg.sum
      fensi.comment = arg.comment
      fensi.video_review = arg.video_review

      setTimeout(() => {
        //初始化
        fensi.c.flash = false
        fensi.c.add = false
        fensi.d.flash = false
        fensi.d.add = false
        fensi.e.flash = false
        fensi.e.add = false
      }, 4000)
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
      if (fensi.unlock === 'fa-unlock') {
        fensi.unlock = 'fa-lock'
      } else {
        fensi.unlock = 'fa-unlock'
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
.ul1 {
  list-style: none;
  padding: 0;
  .span1 {
    font-size: 16px;
    //字体颜色
    color: transparent;
    background: linear-gradient(90deg, #00ff8a, #8e038c);
    background-clip: text;
  }
  .span2 {
    font-size: 60px;
    //字体颜色
    color: transparent;
    background: linear-gradient(90deg, #00ff8a, #8e038c);
    background-clip: text;
  }
  span {
    //取消文本选择
    user-select: none;
    -webkit-app-region: drag;
  }
  //粉丝样式
  .follower {
    position: absolute;
    margin-left: -80px;
    font-size: 25px;
    opacity: 0;
  }
  //动画过渡
  .flash {
    //动画过渡名称一样，效果不一样，是没有效果的
    animation: fensi 4s;
  }
  //增加粉丝颜色
  .addcolor {
    color: rgb(0, 255, 255);
  }
  //减少粉丝颜色
  .deletecolor {
    color: red;
  }
  @keyframes fensi {
    from {
      opacity: 1;
      margin-top: 0px;
    }
    to {
      opacity: 0;
      margin-top: -50px;
    }
  }
}
//查询ID
.span3 {
  //字体颜色
  color: transparent;
  background: linear-gradient(90deg, #00ff8a, #8e038c);
  background-clip: text;
  //取消文本选择
  user-select: none;
  -webkit-app-region: drag;
}
//关注数列表
.ul2 {
  display: flex;
  list-style: none;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  width: 600px;
  //字体颜色
  color: transparent;
  background: linear-gradient(90deg, #00ff8a, #8e038c);
  background-clip: text;
  span {
    user-select: none;
    -webkit-app-region: drag;
    font-size: 16px;
  }
  li {
    //取消文本选择
    user-select: none;
    -webkit-app-region: drag;
    line-height: 25px;
  }
  //关注数按钮
  .following {
    position: absolute;
    margin-left: 80px;
    opacity: 0;
  }

  //播放量按钮
  .sum {
    position: absolute;
    margin-left: 240px;
    opacity: 0;
  }

  //评论量按钮
  .comment {
    position: absolute;
    margin-left: 400px;
    opacity: 0;
  }

  //弹幕数按钮
  .video_review {
    position: absolute;
    margin-left: 550px;
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
      margin-top: -10px;
    }
    to {
      opacity: 0;
      margin-top: -50px;
    }
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
  //取消文本选择
  user-select: none;
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
  //取消文本选择
  user-select: none;
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
  //取消文本选择
  user-select: none;
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
  margin-top: 5px;
  margin-right: 60px;
  width: 20px;
  height: 20px;
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: white;
  //取消文本选择
  user-select: none;
}
.suo:hover {
  color: red;
  cursor: default; //光标变手
  border-bottom: 2px solid #bd16df;
}
</style>
