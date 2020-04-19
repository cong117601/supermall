<template>
  <div class="car">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{catLength}})</div>
    </nav-bar>
    <cat-list />
    <cat-buttom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CatList from "./childComps/CatList"
import CatButtomBar from "./childComps/CatButtomBar"
import { mapGetters } from "vuex";
export default {
  name: "ShopCat",
  components: {
    NavBar,
    CatList,
    CatButtomBar
  },
  computed: {
    //  catLength() {
    //    return this.$store.getters.carList()
    //  }
    ...mapGetters([
      'catLength'
    ])
  }
};
</script>

<style scoped>
.car {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>