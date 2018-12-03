<template>
  <div>
    <audio ref="audio" v-show="false" @ended="audioEnded"></audio>
    <l-map id="map" ref="map" :zoom="0" :min-zoom="minZoom" :max-zoom="maxZoom" :crs="crs" @click="showXy">
      <l-image-overlay :url="url" :bounds="bounds" />
      <!-- <v-marker-cluster> -->
      <l-marker @click="markerCilck" v-for="(item,index) in lists" :lat-lng="[item.lat,item.lng]" :key="index" :icon="item.type==0?defaultIcon:defaultIcon2" v-if="item.type==showMore">
        <l-popup class="popupBox">
          <h3 class="view-name">{{item.dels.title}}</h3>
          <div v-if="item.type==0">
            <div class="delWarp">
              <img class="viwe-photo" :src="item.dels.thumbnail">
              <div class="delCenton">
                <p class="introduction"> {{item.dels.del}}</p>
                <div class="btnBar">
                  <div class="btn">
                    <div class="btn" @click="playAudio(item.dels.audioUrl)" v-if="!isPlaAudio">
                      <img class="icon" src="../assets/Ht-iconPlay.png" alt="" srcset="">
                      讲解
                    </div>
                    <div class="btn " @click="stopAudio()" v-else>
                      <img class="icon" src="../assets/Ht-iconPlaying.gif" alt="" srcset="">
                      讲解</div>
                  </div>
                  <div class="show-details" @click="show(item)">详情</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="centorText">{{item.dels.del}}</div>
        </l-popup>
      </l-marker>
      <!-- </v-marker-cluster> -->
    </l-map>
    <modal name="hello-world" :adaptive="true" :scrollable="true" width="90%" height="auto" :resizable="true" :reset="true">
      <div class="modalWarp">
        <div class="titleBar">
          <div>{{modalTitle}}</div>
          <img class="cloe" src="../assets/iconClose.png" @click="hide">
        </div>
        <div class="centor">
          <div>{{modalCentent}}</div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { LMap, LImageOverlay, LMarker, LPopup, LPolyline } from "vue2-leaflet";
import Vue2LeafletMarkercluster from "./Vue2LeafletMarkercluster";
var datas = require("../../public/static/js/data.json");
export default {
  name: "Example",
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPopup,
    LPolyline,
    "v-marker-cluster": Vue2LeafletMarkercluster
  },
  data() {
    return {
      url: "http://b.yangcoder.top/img/bg.jpg",
      bounds: [[-0, 960], [-686, 0]],
      center: L.latLng(47.41322, -1.219482),
      minZoom: -1,
      maxZoom: 3,
      crs: L.CRS.Simple,
      lists: "",
      defaultIcon: L.icon({
        iconUrl: "http://b.yangcoder.top/img/audio.png",
        iconSize: [28, 36]
      }),
      defaultIcon2: L.icon({
     iconUrl: "http://b.yangcoder.top/img/text.png",
        iconSize: [28, 36]
      }),
      // 0 音频 1文字
      showMore: 0,
      // 是否播放音乐
      isPlaAudio: false,
      audioUrl: "",
      sendVal: false,
      modalTitle: "",
      modalCentent: ""
    };
  },
  mounted() {
    this.lists = datas.datas;
    var w = Math.abs(this.bounds[0][1]),
      h = Math.abs(this.bounds[1][0]);
    var southWest = this.$refs.map.mapObject.unproject([0, h]);
    this.$refs.map.mapObject.getMaxZoom() - 1;
    var northEast = this.$refs.map.mapObject.unproject([w, 0]);
    this.$refs.map.mapObject.getMaxZoom() - 1;
    var bounds = new L.LatLngBounds(southWest, northEast);
    this.$refs.map.mapObject.setMaxBounds(bounds);
    // console.log(this.$refs.map.mapObject._events.zoomlevelschange);
    this.addInit();
  },
  methods: {
    addInit() {
      var that = this;
      this.$refs.map.mapObject.on("popupclose", function() {
        that.stopAudio();
      });
      this.$refs.map.mapObject.on("zoomend", function(e) {
        // console.log(e.target.getZoom());
        var level = e.target.getZoom();
        console.log(level);
        if (level >= 2) {
          that.showMore = 1;
        } else if (level < 2) {
          that.showMore = 0;
        }
      });
    },
    showXy(e) {
      console.log(e.latlng);
      // this.$refs.map.mapObject.setView([-343, 390], 1);
    },
    markerCilck(e) {
      var audio = this.$refs.audio;
      this.isPlaAudio = false;
      audio.pause();
      // 设置视图位置
      this.$refs.map.mapObject.setView(e.latlng);
    },
    playAudio(e) {
      var audio = this.$refs.audio;
      audio.src = e;
      this.isPlaAudio = true;
      audio.play();
    },
    stopAudio() {
      this.isPlaAudio = false;
      var audio = this.$refs.audio;
      audio.pause();
    },
    audioEnded() {
      this.isPlaAudio = false;
    },
    openPupop(data) {
      this.sendVal = true;
      this.dialogTitle = data.dels.title;
      this.dialogCentent = data.dels.del;
    },
    show(e) {
      this.modalTitle = "";
      this.modalCentent = "";
      this.$modal.show("hello-world");
      this.modalTitle = e.dels.title;
      this.modalCentent = e.dels.del;
    },
    hide() {
      this.$modal.hide("hello-world");
    }
  }
};
</script>

<style lang='less' >
.fadeIn-enter,
.fadeIn-enter-active {
  opacity: 1;
  transition: opacity 2s;
}
.leaflet-marker-icon.leaflet-interactive div {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  text-align: center;
  line-height: 0.5rem;
  background: -webkit-radial-gradient(
    circle,
    rgba(240, 194, 12, 0.6),
    rgba(241, 211, 87, 0.6)
  ); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(
    circle,
    rgba(240, 194, 12, 0.6),
    rgba(241, 211, 87, 0.6)
  ); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(
    circle,
    rgba(240, 194, 12, 0.6),
    rgba(241, 211, 87, 0.6)
  ); /* Firefox 3.6 - 15 */
  background: radial-gradient(
    circle,
    rgba(240, 194, 12, 0.6),
    rgba(241, 211, 87, 0.6)
  ); /* 标准的语法 */
}
// +-
.leaflet-left .leaflet-control {
  display: none;
}
.leaflet-control-attribution {
  display: none;
}
.leaflet-control-container {
  .leaflet-top {
    bottom: 5px;
  }
}
.leaflet-popup-content-wrapper {
  overflow: hidden;
}
.leaflet-container .leaflet-popup-content {
  position: relative;
  width: 5.7rem;
  height: 3.1rem;
  padding: 0;
  margin: 0;
  border-radius: 0.1rem;
  background: rgba(255, 255, 255, 0.9);
  -webkit-box-shadow: 0 0.02rem 0.05rem 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 0.02rem 0.05rem 0 rgba(0, 0, 0, 0);
}
.leaflet-container .leaflet-popup a.leaflet-popup-close-button {
  padding: 9px 9px 0 0;
}
#map {
  background-color: #d4d4d4;
  height: 100vh;
  width: 100%; // opacity: 0;
}
.popupBox {
  .view-name {
    margin: 0;
    padding-right: 0.5rem; // width: 5.7rem;
    height: 0.7rem;
    font: 0.36rem/0.7rem PingFangSC-Regular;
    text-indent: 0.2rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #5b5b5b;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-bottom: solid 1px #e8e8e8;
    border-radius: 0.1rem 0.1rem 0 0;
    background: #f7f7f7;
    overflow: hidden;
  }
  .delWarp {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .viwe-photo {
      display: inline-block;
      margin: 0.2rem 0.2rem;
      height: 100%;
      width: 1.92rem;
      height: 1.92rem;
      border-radius: 0.08rem;
    }
    .delCenton {
      p.introduction {
        float: left;
        margin: 0.1rem 0 0.1rem 0;
        width: 3.2rem;
        height: 1.02rem;
        font: 0.24rem/0.33rem PingFangSC-Light;
        color: #202020;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .btnBar {
        width: 3.2rem;
        height: 0.72rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn {
          width: 1.52rem;
          height: 0.72rem;
          background: #ffdd02;
          color: #835609;
          border-radius: 0.05rem;
          text-align: center;
          line-height: 0.72rem;
          display: flex;
          justify-content: center;
          align-items: center;
          .icon {
            width: 0.4rem;
            height: 0.4rem;
            display: inline-block;
            margin-right: 0.133333rem;
          }
        }
        .show-details {
          width: 1.52rem;
          height: 0.72rem;
          background: #9196a9;
          color: #fff;
          border-radius: 0.05rem;
          text-align: center;
          line-height: 0.72rem;
        }
      }
    }
  }
  .centorText {
    margin: 0.266667rem;
    height: 1.9rem;
    word-wrap: break-word;
    text-align: left;
    display: block;
    text-indent: 0.2rem;
    line-height: 0.48rem;
    overflow: auto;
    // overflow-y: scroll;
  }
}
.modalWarp {
  height: 100%;
  background: #fff;
  font-size: 0.28rem;
  padding-bottom: 0.2rem;
  .titleBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.2rem;
    height: 0.96rem;
    font: 0.28rem/0.96rem PingFangSC-Medium;
    text-align: center;
    color: #5b5b5b;
    background: #f9f9f9;
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
    .cloe {
      width: 0.2rem;
      height: 0.2rem;
    }
  }
  .centor {
    padding: 0.25rem;
    // margin-bottom: 0.25rem;
    font-size: 0.32rem;
    word-wrap: break-word;
    overflow-y: auto;
    max-height: 300px;
    img {
      width: 100%;
    }
  }
  .v--modal-box {
    height: auto;
  }
}
</style>
