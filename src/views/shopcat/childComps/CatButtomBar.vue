<template>
  <div class="buttom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CatButtomBar",
  components: {
    CheckButton
  },

  computed: {
    ...mapGetters(["catList"]),
    totalPrice() {
      return (
        "￥" +
        this.catList
          .filter(item => {
            return item.check;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.catList.filter(item => item.check).length;
    },
    isSelectAll() {
      if (this.catList.length === 0) return false;
      // return !(this.catList.filter(item => !item.check).length)
      return !this.catList.find(item => !item.check);
    }
  },
  methods: {
    checkClick() {
      //如果原来都是选中的 点击 一次后全不选
      if (this.isSelectAll) {
        this.catList.forEach(item => (item.check = false));
      } else {
        //如果原来有没选中的，点击一次  全部选中
        this.catList.forEach(item => (item.check = true));
      }
    }
  }
};
</script>

<style scoped>
.buttom-bar {
  position: relative;
  display: flex;

  line-height: 40px;
  height: 40px;
  font-size: 14px;
  background-color: #eee;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 90px;
}
.check-button {
  width: 22px;
  height: 22px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-right: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  background: red;
  color: fff;
  text-align: center;
}
</style>