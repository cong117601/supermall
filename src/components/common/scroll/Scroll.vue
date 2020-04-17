<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" :probe-type="2">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    //通过document拿到 el 有可能不准确
    //console.log(document.querySelector(".wrapper"));
    this.scroll = new BScroll(this.$refs.wrapper, {
      //为了动态的时时 不同的状态，有可能别的地方不需要这个功能，所以不需要这个地方直接写死
      probeType: this.probeType, //  3 时时监听位置
      click: true,
      pullUpLoad: this.pullUpLoad
     
    });

    //监听滚动位置 以发送到home组件 需要使用这个位置
    this.scroll.on("scroll", prosition => {
      //console.log(prosition);
      this.$emit("scroll", prosition);
    });
    //监听上拉加载更多
    this.scroll.on("pullingUp", () => {
      // console.log("上拉加载");
      this.$emit('pullingUp')
    });
  },

  methods: {
    scroll2(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finshPullUp(){
       this.scroll.finishPullUp();
    }

  }
};
</script>

<style>
</style>