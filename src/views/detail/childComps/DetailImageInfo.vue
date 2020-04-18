<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="item in detailInfo.detailImage">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img v-for="(item, index) in item.list" 
        :key="index" :src="item" @load="imgLoad" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailImageInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
   
    };
  },
  methods: {
    imgLoad() {
       // console.log("图片加载完成");
      //所有图片加载完成后 进行一次回调即可
        this.$emit("detailImageLoad");
      
      
    }
  },
  // watch: {
  //   detailInfo() {
  //     for (let item of this.detailInfo.detailImage) {
  //       if (item.list != null) {
  //         let a = item.list.length;
  //         this.imagesLength += a;
  //       }
  //     }
  //   }
  // }
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>
