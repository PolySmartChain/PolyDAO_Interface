<template>
  <transition name="msgbox-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'message_wrapper',
        { success: type === 'success' },
        { error: type === 'error' },
      ]"
      v-show="visible"
    >
      <div class="pic">
        <img :src="message_obj.img" v-if="message_obj.img" />
      </div>
      <div class="messageBox">
        <div>
          <p class="message-title">{{ message }}</p>
        </div>
      </div>
      <a class="close" @click="close_message($el)"></a>
    </div>
  </transition>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      message: "",
      type: "",
      message_obj: "",
      isLink: false,
      visible: false,
      view: "",
    };
  },
  async mounted() {
    let that = this;
  },
  methods: {
    /**
     * @description: message show
     */
    messageShow() {
      this.visible = true;
    },

    /**
     * @description: message hide
     */
    messageHide() {
      this.visible = false;
    },

    /**
     * @description: destroy component
     */
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>

<style scoped lang="less">
.message_wrapper {
  position: fixed;
  min-width: 600px;
  z-index: 99999;
  color: #fff;
  padding: 15px 15px 15px 20px;
  font-size: 14px;
  bottom: 36px;
  border-radius: 10px 0 0 10px;
  background: #fff;
  color: #909399;
  //box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  line-height: 1;
  right: 0px;
  height: 72px;
  padding-left: 136px;
  .pic {
    width: 84px;
    height: 72px;
    position: absolute;
    border-radius: 10px 0 0 10px;
    left: 0px;
    top: 0px;
  }
  .pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .messageBox {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    height: 100%;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .messageBox div {
    width: 100%;
    text-align: center;
  }
  i {
    margin-right: 4px;
  }
  .transaction_view {
    font-size: 18px;
    color: #255ea2;
    cursor: pointer;
  }
  p {
    padding: 4px 0;
    line-height: 26px;
  }
  .ptext {
    font-size: 18px;
    color: #23282e;
  }
  .close {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 5px;
    top: 10px;
    // background: url() center no-repeat;
    cursor: pointer;
  }
}
.message_wrapper.success {
  // background: mix(#ffffff, #67C23A, 90%);
  .pic {
    background: url(../../assets/img/succ.png) center no-repeat #5abc77;
  }
  color: #5abc77;
  .message-title {
    color: #5abc77;
    font-size: 20px;
    font-weight: 900;
  }
}

.message_wrapper.error {
  color: #d44040;
  .pic {
    background: url(../../assets/img/error.png) center no-repeat #d44040;
  }
  .message-title {
    color: #d44040;
    font-size: 20px;
    font-weight: 900;
  }
}

.msgbox-fade-enter-active {
  -webkit-animation: msgbox-fade-in 0.3s;
  animation: msgbox-fade-in 0.3s;
}
.msgbox-fade-leave-active {
  -webkit-animation: msgbox-fade-out 0.1s;
  animation: msgbox-fade-out 0.2s;
}
@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(411px, 0px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0px, 0, 0);
    opacity: 1;
  }
}
@keyframes msgbox-fade-out {
  0% {
    transform: translate3d(0px, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0px, 0px, 0);
    opacity: 0;
  }
}

@media screen and(max-width:800px) {
  .message_wrapper {
    font-size: 7px;
    bottom: 36px;
    min-width: 300px;
    border-radius: 5px 0 0 5px;
    height: 36px;
    padding-left: 60px;
    .pic {
      width: 42px;
      height: 36px;
      position: absolute;
      border-radius: 5px 0 0 5px;
    }

    .transaction_view {
      font-size: 18px;
      color: #255ea2;
      cursor: pointer;
    }
    p {
      padding: 4px 0;
      line-height: 26px;
    }
    .ptext {
      font-size: 18px;
      color: #23282e;
    }
  }
  .message_wrapper.success {
    // background: mix(#ffffff, #67C23A, 90%);
    .pic {
      background: url(../../assets/img/succ.png) center no-repeat #5abc77;
      background-size: 50% 50%;
    }
    .message-title {
      font-size: 10px;
      font-weight: 700;
    }
  }

  .message_wrapper.error {
    color: #d44040;
    .pic {
      background: url(../../assets/img/error.png) center no-repeat #d44040;
      background-size: 50% 50%;
    }
    .message-title {
      font-size: 10px;
      font-weight: 700;
    }
  }
}
</style>
