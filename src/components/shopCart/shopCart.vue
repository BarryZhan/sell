<template>
  <div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
    <transition name="slide">
      <div class="shopCart-list" v-show="listShow">
        <div class="list-header b-1px">
          <h3>购物车</h3>
          <a href="javascript:;" @click="empty">清空</a>
        </div>
        <div class="shopCartList" ref="shopCartList">
          <ul>
            <li v-for="food in selectFoods" class="b-1px">
              <p class="name">{{food.name}}</p>
              <p class="price"><span>￥</span>{{food.price * food.count}}</p>
              <cartControl :food="food"></cartControl>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="shopCart" @click="toggleList">
      <div class="cart-icon" :class="{'on':totalCount>0}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shopping_cart"></use>
        </svg>
        <i v-show="totalCount>0">{{totalCount}}</i>
      </div>
      <div class="cart-money">
        <p class="totalMoney">￥<span>{{totalPrice}}</span></p>
        <p class="sendMoney">另需配送费￥{{deliveryPrice}}元</p>
      </div>
      <p class="cart-settle" :class="{'on':this.totalPrice >= this.minPrice}" @click.stop="pay">{{payDesc}}</p>
      <div class="ball-container">
        <transition name="drop"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    v-for="(ball,index) in balls">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import cartControl from 'components/cartcontrol/cartcontrol'
  import BScroll from 'better-scroll'
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{count: 1, price: 20}]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 2
      },
      minPrice: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBall: [],
        listShow: false
      }
    },
    created () {
      this.$parent.$on('cart.add', this._drop)
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.count
        })
        if (total === 0) {
          this.listShow = false
        }
        return total
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差${this.minPrice - this.totalPrice}元起送`
        } else {
          return `去结算`
        }
      }
    },
    methods: {
      pay () {
        if (this.totalPrice > this.minPrice) {
          /* eslint-disable */
          alert(`一共需要支付${this.totalPrice}元`)
        }
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      toggleList () {
        if (!this.totalCount) {
          return
        }
        this.listShow = !this.listShow
        if (this.listShow) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.shopCartList, {click: true})
            } else {
              this.scroll.refresh()
            }
          })
        }
      },
      beforeEnter: function (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.querySelector('.inner-hook')
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter: function (el) {
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter: function () {
        let ball = this.dropBall.shift()
        if (ball) {
          ball.show = false
          // el.style.display = 'none'
        }
      },
      _drop: function (el) {
        this.$nextTick(() => {
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i]
            if (!ball.show) {
              ball.show = true
              ball.el = el
              this.dropBall.push(ball)
              return
            }
          }
        })
      }
    },
    components: {
      cartControl
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/base";

  .list-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(7, 17, 27, .6);
    -webkit-backdrop-filter: blur(10px);
  }

  .shopCartList {
    max-height: 192px;
    overflow: hidden;
  }

  .shopCart-list {
    position: fixed;
    width: 100%;
    bottom: 46px;
    left: 0;
    color: rgb(7, 17, 27);
    background-color: #ffffff;
    padding-bottom: 24px;
    ul {
      padding: 0 18px;
    }
    li {
      height: 24px;
      line-height: 24px;
      padding: 12px 0;
      display: flex;
    }
    .name {
      flex: 1;
      font-size: 14px;
    }
    .price {
      margin-right: 12px;
      color: rgb(240, 20, 20);
      font-size: 14px;
      font-weight: 700;
      span {
        font-size: 10px;
        font-weight: normal;
      }
    }
  }

  .list-header {
    height: 40px;
    line-height: 40px;
    background-color: #f3f4f5;
    padding: 0 18px;
    h3 {
      float: left;
      font-size: 14px;
    }
    a {
      float: right;
      color: rgb(0, 160, 200);
    }
  }

  .shopCart {
    position: fixed;
    width: 100%;
    display: flex;
    height: 46px;
    left: 0;
    bottom: 0;
    z-index: 2;
    background-color: #14172d;
    color: rgba(255, 255, 255, .4);
  }

  .cart-icon {
    width: 44px;
    height: 44px;
    line-height: 44px;
    float: left;
    font-size: 24px;
    background-color: #2b343c;
    text-align: center;
    border-radius: 50%;
    border: 6px solid #14172d;
    margin: -10px 13px 0;
    position: relative;
    z-index: 2;
    &.on {
      color: #ffffff;
      background-color: rgb(0, 160, 220);
    }
    i {
      position: absolute;
      color: #ffffff;
      border-radius: 8px;
      font-style: normal;
      background-color: rgb(240, 20, 20);
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, .4);
      height: 16px;
      line-height: 16px;
      font-size: 10px;
      padding: 0 6px;
      right: -5px;
      top: -5px;
    }
  }

  .cart-money {
    flex: 1;
    padding: 12px 0;
    line-height: 22px;
    p {
      float: left;
    }
  }

  .totalMoney {
    font-size: 16px;
    padding-right: 12px;
    margin-right: 12px;
    font-weight: bold;
    border-right: 1px solid rgba(255, 255, 255, .1);
  }

  .cart-settle {
    float: right;
    width: 105px;
    line-height: 46px;
    text-align: center;
    font-weight: bold;
    background-color: #2b343c;
    &.on {
      background-color: #00b43c;
      color: #ffffff;
    }
  }

  .slide-enter-active, .slide-leave-active {
    transition: transform .4s;
    transform: translate3d(0, 0, 0);
  }

  .slide-enter, .slide-leave-active {
    transform: translate3d(0, 100%, 0);
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 20px;
      z-index: 100;
      .inner {
        width: 16px;
        height: 16px;
        background-color: rgb(0, 160, 220);
        border-radius: 50%;
      }
      &.drop-enter-active {
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          transition: all 0.4s linear;
        }
      }
    }
  }
</style>
