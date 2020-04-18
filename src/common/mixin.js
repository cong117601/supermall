import { debounce } from "common/utils";
export const itemListerMixin = {
  data () {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted() {
      //防止这个函数调用多次，需要用到防抖函数
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    //监听 item 中加载图片完成
    this.itemImageListener = () => {
      this.refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImageListener)
    //console.log("我是混入itemListerMixin");
    
  },
}