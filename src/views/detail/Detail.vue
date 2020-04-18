<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goodsInfo" />
      <detail-shop-info :shop="shopInfo" />
      <detail-image-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad" />
      <detail-params-info ref="params" :param-info="paramsInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    
    </scroll>
    <detail-bottom-bar @addToCat="addToCat"/>
    <!--监听组件点击 回到顶部  使用native修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { debounce } from "common/utils";
import { getDetail, getRecommend, Goods, Shop } from "network/detail";
import { itemListerMixin } from "common/mixin";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themesTopYs: [],
      getThemesTopY: null,
      currentIndex: 0,
      isShowBackTop: false
    };
  },
  created() {
    //1.保存点击后的iid
    this.iid = this.$route.params.iid;

    //2.通过iid 拿到数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      //1.获取顶部的轮播图信息
      this.topImages = data.itemInfo.topImages;
      //2.创建商品对象
      this.goodsInfo = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3.店铺信息
      this.shopInfo = new Shop(data.shopInfo);
      //4.取出商品详情信息
      this.detailInfo = data.detailInfo;
      //5.取出商品参数信息
      this.paramsInfo = data.itemParams;
      //6.取出评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
      //7.给获取offsetTop 做防抖操作
      this.getThemesTopY = debounce(() => {
        this.themesTopYs = [];
        this.themesTopYs.push(0);
        this.themesTopYs.push(this.$refs.params.$el.offsetTop);
        this.themesTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themesTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themesTopYs.push(Number.MAX_VALUE);
       // console.log(this.themesTopYs);
      }, 500);
    });
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  mixins: [itemListerMixin],
  methods: {
    detailImageLoad() {
      //console.log("detailImageLoad");
      // const refresh = debounce(this.$refs.scroll.refresh, 50);
      // this.$refs.scroll.refresh()

      //console.log("----");
      this.getThemesTopY();
      this.refresh();
    },
    titleClick(index) {
      this.$refs.scroll.scroll2(0, -this.themesTopYs[index], 300);
    },
    backClick() {
      this.$refs.scroll.scroll2(0, 0);
    },
    contentScroll(prosition) {
      //判断backtop是否显示
      this.isShowBackTop = -prosition.y > 1000;
      //获取Y值
      const prositionY = -prosition.y;
      //[0, 12944, 14309, 14659]
      const length = this.themesTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // if(this.currentIndex !== i && ((i < length -1) && prositionY > this.themesTopYs[i] && prositionY <= this.themesTopYs[i+1]
        //  || (i ===length - 1) && prositionY >= this.themesTopYs[i])){
        //    this.currentIndex = i
        //    this.$refs.nav.currentIndex = this.currentIndex
        // }
        if (
          this.currentIndex !== i &&
          prositionY > this.themesTopYs[i] &&
            prositionY <= this.themesTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCat() {
      console.log("detatil-cat");
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice
      product.iid = this.iid

      //2.将商品添加到购物车
      //不要这样写  没有通过 mutations
      //this.$store.cartList.push(product)
      //this.$store.commit('addCart',product)  调用mutations
      //调用actions
      this.$store.dispatch('addCart',product)  
    }

  },
  mounted() {},
  updated() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
  background-color: #fff;
}
</style>