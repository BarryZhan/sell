<template>
  <div class="header">
    <img :src="seller.avatar" class="background">
    <div class="content">
      <img :src="seller.avatar" class="avatar">
      <div class="info">
        <h2>{{seller.name}}</h2>
        <p class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
        <p v-if="seller.supports" class="support" :class="classMap[seller.supports[0].type]">
          {{seller.supports[0].description}}</p>
      </div>
      <div class="count" @click="toggleDetail" v-if="seller.supports">
        {{seller.supports.length}}个
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-keyboard_arrow_right"></use>
        </svg>
      </div>
    </div>
    <div class="bulletin" @click="toggleDetail">
      <p>{{seller.bulletin}}</p>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-keyboard_arrow_right"></use>
      </svg>
    </div>
    <transition name="fade">
      <div class="detail" v-show="isShowDetail">
        <div class="detail-main">
          <div class="detail-content">
            <h2>{{seller.name}}</h2>
            <v-star :score="seller.score"></v-star>
            <div v-if="seller.supports">
              <h3>优惠信息</h3>
              <ul class="supports">
                <li v-for="item of seller.supports" :class="classMap[item.type]">{{item.description}}</li>
              </ul>
            </div>
            <div v-if="seller.bulletin">
              <h3>商家公告</h3>
              <div class="detail-bulletin">
                {{seller.bulletin}}
              </div>
            </div>
          </div>
        </div>
        <svg class="icon close" aria-hidden="true" @click="toggleDetail">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        isShowDetail: false
      }
    },
    methods: {
      toggleDetail () {
        this.isShowDetail = !this.isShowDetail
      }
    },
    created () {
      window.a = this
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      'v-star': star
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/base";

  .header {
    background: rgba(7, 17, 27, 0.5);
    position: relative;
    overflow: hidden;
    color: #ffffff;
    min-height: 134px;
  }

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    filter: blur(10px);
  }

  .content {
    padding: 24px 24px 18px;
    display: flex;
    position: relative;
    font-size: 10px;
  }

  .count {
    position: absolute;
    background-color: rgba(0, 0, 0, .2);
    line-height: 24px;
    padding: 0 8px 0 12px;
    border-radius: 12px;
    right: 12px;
    bottom: 18px;
  }

  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 3px;
    margin-right: 16px;
  }

  .info {
    flex: 1;
    h2 {
      font-size: 16px;
      font-weight: bold;
      line-height: 18px;
      background: url("./img/brand@2x.png") left 1px no-repeat;
      background-size: 30px 18px;
      text-indent: 36px;
    }
  }

  .description {
    font-size: 12px;
    line-height: 1;
    padding: 8px 0 10px;
  }

  .bulletin {
    padding: 0 12px;
    background: rgba(7, 17, 27, .2);
    display: flex;
    p {
      .ellipsis;
      flex: 1;
      line-height: 28px;
      font-size: 10px;
      background: url("./img/bulletin@2x.png") left center no-repeat;
      background-size: 22px 12px;
      padding-left: 26px;
    }
    .icon {
      margin-top: 7px;
    }
  }

  .support {
    font-size: 10px;
    text-indent: 16px;
    line-height: 12px;
    background-repeat: no-repeat;
    background-size: 12px;
  }

  .supports {
    padding: 0 12px;
    li {
      text-indent: 22px;
      line-height: 16px;
      background-repeat: no-repeat;
      background-size: 16px;
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .detail-bulletin {
    line-height: 24px;
    padding: 0 12px;
  }

  @support: decrease, discount, special, invoice, guarantee;
  .for(@support);
  .each(@item) {
    &.@{item} {
      background-image: url("./img/@{item}_2@2x.png");
    }
  }

  .detail {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    background-color: rgba(7, 17, 27, .8);
    overflow: auto;
    color: #ffffff;
    .close {
      font-size: 32px;
      display: block;
      margin: -64px auto 0;
      color: rgba(255, 255, 255, .5);
    }
    h2 {
      font-weight: bold;
      font-size: 16px;
      line-height: 1;
      margin-bottom: 16px;
      text-align: center;
    }
    h3 {
      display: flex;
      align-items: center;
      font-weight: bold;
      margin: 28px -12px 24px;
      &:before, &:after {
        content: '';
        display: block;
        height: 1px;
        background-color: rgba(255, 255, 255, .2);
        flex-grow: 1;
        margin: 0 12px;
      }
    }
  }

  .detail-main {
    min-height: 100%;
  }

  .detail-content {
    padding: 64px 36px;
  }

  .star {
    text-align: center;
  }
</style>
