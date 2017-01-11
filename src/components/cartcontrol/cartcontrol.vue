<template>
  <div class="cartControl">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease($event)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-remove_circle_outline"></use>
        </svg>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase" @click.stop="increase($event)">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-add_circle"></use>
      </svg>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    created () {
    },
    methods: {
      increase (event) {
        if (!event._constructed) return
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count += 1
        }
        this.$parent.$emit('cart.add', event.target)
      },
      decrease (event) {
        if (!event._constructed) return
        if (this.food.count) {
          this.food.count -= 1
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/base";

  .move-enter-active, .move-leave-active {
    transition: all .5s linear;
    transform: translate3D(0, 0, 0) rotate(0);
    opacity: 1;
  }

  .move-enter, .move-leave-active {
    transform: translate3D(24px, 0, 0) rotate(180deg);
    opacity: 0;
  }

  .cart-decrease, .cart-increase {
    color: rgb(0, 160, 220);
    font-size: 24px;
  }

  .cart-count {
    font-size: 10px;
  }

  .cartControl {
    font-size: 0;
    text-align: center;
    div {
      width: 24px;
      line-height: 24px;
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
