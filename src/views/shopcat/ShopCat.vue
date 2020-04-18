<template>
<div class="car">
 <nav-bar>
   <div slot="center" class="nav-bar">购物车</div>
 </nav-bar>
</div>
  <h2>购物车</h2>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
 name: 'ShopCat',
 components: {
   NavBar
 }
}
</script>

<style scoped>
 
 .nav-bar {
   background-color: var(--color-tint);
   color: #fff;
   
 }
</style>