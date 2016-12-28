<template>
  <div class="shopCart">
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
    <p class="cart-settle" :class="{'on':this.totalPrice >= this.minPrice}">{{payDesc}}</p>
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
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{num: 1, price: 20}]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 4
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
        dropBall: []
      }
    },
    created () {
      this.$parent.$on('cart.add', this._drop)
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          console.log(food)
          total += food.price * food.num
        })
        return total
      },
      totalCount () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.num
        })
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
      beforeEnter: function (el) {
        console.log('before')
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `transform3d(0,${y},0)`
            el.style.transform = `transform3d(0,${y},0)`
            let inner = el.querySelector('.inner-hook')
            inner.style.webkitTransform = `transform3d(${x},0,0)`
            inner.style.transform = `transform3d(${x},0,0)`
            inner.style.background = 'red'
          }
        }
      },
      enter: function (el) {
        let rf = el.offsetHeight
        this.$nextTick(() => {
          console.log('enter')
          el.style.webkitTransform = 'transform3d(200px,0,0)'
          el.style.transform = 'transform3d(0,0,0)'
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = 'transform3d(0,0,0)'
          inner.style.transform = 'transform3d(0,0,0)'
        })
      },
      afterEnter: function (el) {
        console.log('afterEnter')
        el.style.webkitTransform = 'transform3d(200px,0,0)'
        let ball = this.dropBall.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      _drop: function (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBall.push(ball)
            return
          }
        }
      }
    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/base";

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
    margin: -10px 13px 0px;
    position: relative;
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
