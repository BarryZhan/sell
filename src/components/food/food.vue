<template>
  <transition name="move">
    <div class="food-detail" v-show="showDetail">
      <div class="back" @click="toggleShow"></div>
      <div class="fd-avatar" :style="{backgroundImage:'url('+food.image+')',fontSize:'10px'}"></div>
      <div class="fd-info">
        <p class="name">{{food.name}}</p>
        <p class="sales"><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}</span></p>
        <p class="price">
          <span><i>￥</i>{{food.price}}</span>
          <del v-if="food.oldPrice"><i>￥{{food.oldPrice}}</i></del>
        </p>
        <div class="addCart">

        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="less" rel="stylesheet/less">
  @import "../../common/less/base";

  .move-enter-active, .move-leave-active {
    transition: transform .4s;
    transform: translate3d(0, 0, 0);
  }

  .move-enter, .move-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  .food-detail {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #f3f5f7;
    padding-bottom: 46px;
    box-sizing: border-box;
    .back {
      position: absolute;
      background: url("./back.png") center no-repeat;
      background-size: cover;
      width: 24px;
      height: 24px;
      cursor: pointer;
      left: 10px;
      top: 20px;
    }
  }

  .fd-avatar {
    width: 100%;
    padding-top: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .fd-info {
    background-color: #ffffff;
    border-bottom: 1px solid rgba(7, 17, 27, .1);
    padding: 18px;
    .name {
      font-size: 14px;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 8px;
      .ellipsis
    }
    .sales {
      font-size: 10px;
      line-height: 1;
      color: rgb(147, 153, 159);
      margin-bottom: 18px;
      span {
        padding-right: 12px;
      }
    }
    .price {
      font-weight: 700;
      i {
        font-size: 10px;
        font-weight: normal;
        font-style: normal;
      }
      span {
        color: rgb(240, 20, 20);
        font-size: 14px;
      }
      del {
        color: rgb(147, 153, 159);
      }
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showDetail: false
      }
    },
    methods: {
      toggleShow () {
        this.showDetail = !this.showDetail
        this.$nextTick(() => {
          console.log(this.food)
        })
      }
    }
  }

</script>
