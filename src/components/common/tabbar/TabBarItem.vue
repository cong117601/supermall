<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- <div :class="{active: isActive}"> 属性绑定 -->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
    <!-- <img src="../../assets/img/tabbar/category.svg" alt />
    <div>首页</div>-->
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // isActive: true
    };
  },
  computed: {
    isActive() {
      //$route 当前活跃的路由
      //$router 全部路由
      return this.$route.path.indexOf(this.path) !== -1; //=-1 找到了
    },
    //动态绑定style 并且把它抽到计算属性中
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // console.log("aaaa");
      this.$router.replace(this.path);
    }
  }
};
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /* .active {
  color: red;
} */
</style>