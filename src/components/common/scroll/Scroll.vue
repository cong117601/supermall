<template>
  <div class="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// class="content" :probe-type="2"
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
     default: false
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
     //console.log(this.scroll);
   
    //监听滚动位置 以发送到home组件 需要使用这个位置
    this.scroll.on("scroll", prosition => {
      //console.log(prosition);
      this.$emit("scroll", prosition);
    });
    //监听scroll 滚动到底部
    if(this.pullUpLoad) {
      this.scroll.on("pullingUp", () =>{
        // console.log("监听到滚动底部");
        this.$emit("pullingUp")
        
      })
    } 
      
     
  },

  methods: {
    //滚动到某个位置
    scroll2(x, y, time = 300) {
     this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //刷新
    refresh(){
      //console.log("-------");
      this.scroll && this.refresh && this.scroll.refresh()
    },
    //上拉加载更多
    finishPullUp() {
      this.scroll && this.finishPullUp && this.scroll.finishPullUp()
    },
    //获取Y 以便再次点击 回到原来位置
    getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
  }
};
</script>

<style>
</style>