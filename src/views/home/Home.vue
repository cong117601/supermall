<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-controll"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperUploadImg="swiperUploadImg" />
      <home-recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!--监听组件点击 回到顶部  使用native修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
//商品列表
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

//封装后的轮播图
import HomeSwiper from "./childComps/HomeSwiper";
//推荐（本周流行）
import HomeRecommendView from "./childComps/HomeRecommendView";
//特色 特定的  (是一个图片加上连接)
import FeatureView from "./childComps/FeatureView";

//导入 请求相关
import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { itemListerMixin } from "common/mixin";
//导入轮播图 (又进行了封装)
// import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop
  },
  //2.用于存储 请求过来的数据
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  //创建vue实例后执行的方法
  created() {
    console.log("home created");
    
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    //
    // this.tabClick(0)
  },
  mixins: [itemListerMixin],
  //console.log(this.$refs.tabControl.$el.offsetTop);
  destroyed() {
    //console.log("distory");
  },
  //活跃时的函数
  activated() {
    //console.log("avticed");
    this.$refs.scroll.scroll2(0, this.saveY, 0);
    //刷一次好像也会出现
    this.$refs.scroll.refresh();
  },
  //不活跃时的函数
  deactivated() {
    //1.保存y值
    this.saveY = this.$refs.scroll.getScrollY();
    //2.取消全局事件的监听
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  methods: {
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scroll2(0, 0);
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperUploadImg() {
      //console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    //获取到scroll中传来的 位置信息
    contentScroll(prosition) {
      //console.log(prosition);
      //判断backtop是否显示
      this.isShowBackTop = -prosition.y > 1000;
      //判断tabControl是否吸顶(position: fiexd)
      this.isTabFixed = -prosition.y > this.tabOffsetTop;
    },
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //3.保存在data 的result中
        this.banners = res.data.banner.list; //广告
        this.recommends = res.data.recommend.list; //推荐圆
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
