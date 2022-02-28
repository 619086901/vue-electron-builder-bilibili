<template>
  <div :class="['tm']">
    <span class="min" @click="min">-</span>
    <span class="close" @click="close">×</span>

    <span class="suo" @click="suo">
      <i :class="[fensi.faClass, fensi.unlock]" aria-hidden="true"></i>
    </span>

    <div class="ul1">
      <span class="span-color span1">粉丝数:</span>
      <br />
      <span class="span-color span2">{{ fensi.follower }}</span>
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
      <ul class="span-color ul2">
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
    <span
      ><svg
        t="1626831116361"
        class="icon-bili"
        viewBox="0 0 2299 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2345"
        width="64"
        height="64"
      >
        <path
          d="M1775.840814 322.588002c6.0164 1.002733 53.144869-9.525967 55.150336-6.016401 3.0082 4.5123 24.065601 155.92504 18.550567 156.927774s-44.621635 10.027334-44.621635 10.027334c-3.0082-20.556034-28.577901-147.903173-29.079268-160.938707m75.205003-14.539634l20.556034 162.944174c10.5287-0.501367 53.144869-3.509567 57.155803-4.010934-6.0164-61.668103-16.545101-158.933241-16.545101-158.93324-20.054668-4.010934-41.112069-4.010934-61.166736 0m-40.610702 226.116376s92.752838-23.564234 126.344406-12.0328c17.046467 61.668103 48.131202 407.611118 51.139402 421.649386-21.057401 2.506833-90.246004 8.523234-95.761037 10.027333-4.5123-26.071068-81.72277-403.098818-81.722771-419.643919m343.436183-207.565809c5.515034 1.5041 54.648969-5.013667 55.150335-1.5041 1.002733 12.032801 6.0164 157.42914 0.501367 157.930507s-44.621635 4.010934-44.621635 4.010934c-1.002733-20.054668-12.032801-146.90044-11.030067-160.437341m75.70637-4.010933l4.010933 160.938707c10.5287 0 52.643502 2.506833 57.155803 2.005467-1.002733-61.668103 0-158.933241 0-158.933241-20.054668-3.509567-40.610702-5.013667-61.166736-4.010933m-64.676303 216.089043s94.758304-12.534167 126.845772 2.506833c7.019134 72.196803 6.0164 408.613852 7.019134 422.652119-21.558768 0-90.246004 1.002733-95.761038 2.005467-1.002733-26.071068-39.607968-410.619319-38.103868-427.164419m-220.099977-413.627519c54.648969 278.759879 96.262404 755.058234 97.766504 785.641602 0 0 43.117535 1.002733 91.750105 4.010934C2105.740095 614.383415 2070.644427 134.575493 2071.145794 119.033126c-12.032801-13.536901-126.344406 6.0164-126.344406 6.0164m-120.328005 659.297196c-10.5287-78.213204-290.291313-166.955108-447.720454-138.377206 0 0-19.553301-172.470141-27.073801-339.425248-6.517767-143.390873-1.002733-282.770813 0.501366-305.833681-10.5287-7.5205-123.837572 46.627102-185.004308 69.188603 0 0 73.199537 309.844614 126.344406 952.59671 0 0 84.730971 9.0246 230.12731-19.051934s317.365114-115.815705 302.825481-219.097244m-341.932083 140.88404l-24.566967-176.982441c6.0164-3.0082 156.927774 53.144869 172.971507 63.172203-2.506833 11.030067-148.40454 113.810238-148.40454 113.810238M610.664628 322.588002c6.0164 1.002733 53.144869-9.525967 55.150335-6.016401 3.0082 4.5123 24.065601 155.92504 18.550568 156.927774s-44.621635 10.027334-44.621635 10.027334c-3.0082-20.556034-28.577901-147.903173-29.079268-160.938707m75.205003-14.539634l20.556034 162.944174c10.5287-0.501367 53.144869-3.509567 57.155803-4.010934-6.517767-61.668103-16.545101-158.933241-16.545101-158.93324-20.054668-4.010934-41.112069-4.010934-61.166736 0m-40.610702 226.116376s92.752838-23.564234 126.344406-12.0328c17.046467 61.668103 48.131202 407.611118 51.139402 421.649386-21.057401 2.506833-90.246004 8.523234-95.761037 10.027333-4.5123-26.071068-81.72277-403.098818-81.722771-419.643919m343.436182-207.565809c5.515034 1.5041 54.648969-5.013667 55.150336-1.5041 1.002733 12.032801 6.0164 157.42914 0.501367 157.930507s-44.621635 4.010934-44.621635 4.010934c-1.002733-20.054668-11.531434-146.90044-11.030068-160.437341m75.706371-4.010933l4.010933 160.938707c10.5287 0 52.643502 2.506833 57.155803 2.005467-1.002733-61.668103 0-158.933241 0-158.933241-20.054668-3.509567-40.610702-4.5123-61.166736-4.010933m-64.676303 216.089043s94.758304-12.534167 126.845772 2.506833c7.019134 72.196803 6.0164 408.613852 7.019134 422.652119-21.558768 0-90.246004 1.002733-95.761038 2.005467-0.501367-26.071068-39.607968-410.619319-38.103868-427.164419m-220.099977-413.627519c54.648969 278.759879 96.262404 755.058234 97.766504 785.641602 0 0 43.117535 1.002733 91.750105 4.010934-28.577901-300.318647-63.67357-780.126569-63.172203-796.170303-12.032801-13.035534-126.344406 6.517767-126.344406 6.517767m-120.328005 659.297196c-10.5287-78.213204-290.291313-166.955108-447.720454-138.377206 0 0-19.553301-172.470141-27.073801-339.425248-6.517767-143.390873-1.002733-282.770813 0.501366-305.833681C174.475608-6.308547 61.166736 47.337689 0 69.89919c0 0 73.199537 309.844614 126.344406 952.59671 0 0 84.730971 9.0246 230.12731-19.051934s317.365114-115.815705 302.825481-219.097244m-341.932083 140.88404l-24.566967-176.982441c6.0164-3.0082 156.927774 53.144869 172.971507 63.172203-2.506833 11.030067-148.40454 113.810238-148.40454 113.810238"
          p-id="2346"
          fill="#1296db"
        ></path></svg
    ></span>
    <span
      ><svg
        t="1626831609335"
        class="icon-television"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="8228"
        width="100"
        height="100"
      >
        <path
          d="M450.803484 456.506027l-120.670435 23.103715 10.333298 45.288107 119.454151-23.102578-9.117014-45.289244z m65.04448 120.060586c-29.483236 63.220622-55.926329 15.502222-55.926328 15.502223l-19.754098 12.768142s38.90176 53.192249 75.986489 12.764729c43.770311 40.42752 77.203911-13.068516 77.203911-13.068516l-17.934791-11.55072c0.001138-0.304924-31.305956 44.983182-59.575183-16.415858z m59.57632-74.773617L695.182222 524.895573l10.029511-45.288106-120.364373-23.103716-9.423076 45.289245z m237.784178-88.926436c-1.905778-84.362809-75.487004-100.540871-75.487004-100.540871s-57.408853-0.316302-131.944676-0.95232l54.237867-52.332089s8.562916-10.784996-6.026809-22.834062c-14.592-12.051342-15.543182-6.660551-20.615396-3.487289-4.441884 3.169849-69.462471 66.920676-80.878933 78.340551-29.494613 0-60.2624-0.319716-90.075591-0.319716h10.466418s-77.705671-76.754489-82.781298-80.241777c-5.075627-3.488427-5.709369-8.56064-20.616533 3.487289-14.589724 12.05248-6.026809 22.8352-6.026809 22.8352l55.504213 53.919288c-60.261262 0-112.280462 0.319716-136.383147 1.268623-78.025387 22.521173-71.99744 100.859449-71.99744 100.859449s0.950044 168.100978 0 253.103217c8.562916 85.00224 73.899804 98.636231 73.899805 98.636231s26.007324 0.63488 45.357511 0.63488c1.900089 5.391929 3.486151 32.034133 33.302756 32.034134 29.495751 0 33.30048-32.034133 33.30048-32.034134s217.263218-0.950044 235.340231-0.950044c0.953458 9.196658 5.394204 33.619058 35.207395 33.303893 29.494613-0.636018 31.714418-35.20512 31.714418-35.20512s10.151253-0.95232 40.280747 0c70.413653-13.005938 74.534684-95.468658 74.534684-95.468657s-1.265209-169.689316-0.312889-254.056676zM752.628622 681.8304c0 13.319964-10.467556 24.102684-23.471218 24.102684H300.980907c-13.003662 0-23.47008-10.78272-23.47008-24.102684V397.961671c0-13.32224 10.467556-24.106098 23.47008-24.106098h428.176497c13.003662 0 23.471218 10.783858 23.471218 24.106098v283.868729z"
          p-id="8229"
          fill="#1296db"
        ></path></svg
    ></span>
    <span class="span-color bili-name">{{ fensi.name }}</span>

    <button @click="start" class="span-color">获取</button>
    <span class="span-color span3">查询ID:</span>
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
      id: '517327498',
      //B站姓名
      name: '',
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
        but3()
      }, fensi.time)
    }
    //罗翔测试id 517327498
    //监听返回的粉丝数
    ipcRenderer.on('fansbili', (event, arg) => {
      let { follower, following } = arg
      //粉丝数大于之前粉丝则添加+号
      fensi.a.add = follower > fensi.follower ? true : false
      fensi.b.add = following > fensi.following ? true : false

      fensi.a.number = follower - fensi.follower
      fensi.b.number = following - fensi.following

      //增加的粉丝不为0则开启动画过渡
      fensi.a.flash = fensi.a.number !== 0 ? true : false
      fensi.b.flash = fensi.b.number !== 0 ? true : false

      fensi.follower = follower //当前粉丝数
      fensi.following = following //当前关注数

      setTimeout(() => {
        //恢复
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
      let { sum, comment, video_review } = arg
      console.log(arg)
      // 播放数大于之前粉丝则添加+号
      // 播放量+号
      fensi.c.add = sum > fensi.sum ? true : false
      // 评论量+号
      fensi.d.add = comment > fensi.comment ? true : false
      // 弹幕数+号
      fensi.e.add = video_review > fensi.video_review ? true : false

      //  增加的播放、评论、弹幕
      fensi.c.number = sum - fensi.sum
      fensi.d.number = comment - fensi.comment
      fensi.e.number = video_review - fensi.video_review

      // 增加的粉丝不为0则开启动画过渡
      fensi.c.flash = fensi.c.number !== 0 ? true : false
      fensi.d.flash = fensi.d.number !== 0 ? true : false
      fensi.e.flash = fensi.e.number !== 0 ? true : false

      fensi.sum = sum
      fensi.comment = comment
      fensi.video_review = video_review

      setTimeout(() => {
        //恢复
        fensi.c.flash = false
        fensi.c.add = false
        fensi.d.flash = false
        fensi.d.add = false
        fensi.e.flash = false
        fensi.e.add = false
      }, 4000)
    })

    //获取姓名
    const but3 = () => {
      ipcRenderer.send('name', { id: fensi.id })
    }

    ipcRenderer.on('namebili', (event, arg) => {
      let { name } = arg
      fensi.name = name
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
      fensi.unlock = fensi.unlock === 'fa-unlock' ? 'fa-lock' : 'fa-unlock'
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
.span-color {
  //字体颜色
  color: transparent;
  background: linear-gradient(90deg, #00ff8a, #8e038c);
  background-clip: text;
}
span {
  //取消文本选择
}
.ul1 {
  list-style: none;
  padding: 0;
  span {
    user-select: none;
    -webkit-app-region: drag;
  }
  .span1 {
    font-size: 16px;
  }
  .span2 {
    font-size: 60px;
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
    font-size: 20px;
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
  span {
    font-size: 16px;
    //取消文本选择
    user-select: none;
    -webkit-app-region: drag;
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
  width: 50px;
  padding: 5px;
  margin-left: 100px;
  border: none; //取消默认样式
  outline: none; //取消选择样式
  //取消文本选择
  user-select: none;
}
button:hover {
  border-bottom: 3px solid #bd16df;
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

// B站图标
.icon-bili {
  position: absolute;
  top: -15px;
  left: 220px;
}
.icon-television {
  position: absolute;
  top: 140px;
  left: 50px;
}
// B站用户名
.bili-name {
  //取消文本选择
  user-select: none;
  -webkit-app-region: drag;
  position: absolute;
  top: 200px;
  left: 260px;
  font-size: 30px;
}
</style>
