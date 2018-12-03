<!--  -->
<template>
  <div>
    <audio ref="audioHome" v-show="false" @ended="audioEnded" preload></audio>
    <img class="welcomeImg" v-if="welcomeData" src="../assets/0.jpg" alt="" srcset="" @click="welcomeHide" @load="playAudio">
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 播放地址
      audioUrl: "/data/A/A.mp3",
      welcomeData: true
    };
  },
  created() {},
  components: {},

  computed: {},

  mounted() {},

  methods: {
    welcomeHide() {
      var that = this;
      setTimeout(function() {
        that.welcomeData = false;
        that.$router.push("/map");
      }, 1000);
      //音频播放完1秒后跳转    配合 app.vue 底部  (进入过渡生效时   离开过渡生效)样式
      //定时器1秒加离开过渡生效1秒加进入过渡生效时1秒
    },
    playAudio() {
      var audio = this.$refs.audioHome;
      audio.src = this.audioUrl;
      audio.play();
    },
    audioEnded() {
      this.welcomeHide();
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped >
.welcomeImg {
  width: 100%;
}
</style>