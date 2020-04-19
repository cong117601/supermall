<template>
  <div class="cat-list">
    <scroll class="content" ref="scroll">
     <cat-list-item v-for="(item,index) in catList" :item-info="item" :key="index"/>
    </scroll>
  </div>
</template>

<script>
import CatListItem from "./catListItem"
import Scroll from "components/common/scroll/Scroll";
import { mapGetters } from "vuex";

export default {
  name: "CatList",
  components: {
    Scroll,
    CatListItem
  },
  computed: {
    ...mapGetters(["catList"])
  },
  activated () {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
 .cat-list {
   height: calc(100% - 44px - 49px - 40px);
 } 
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>