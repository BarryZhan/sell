<template>
  <div>
    <div class="goods">
      <div class="goods-menu" ref="goodsMenu">
        <ul>
          <li v-for="(item , index) of goods" :class="{'active':currentIndex === index}"
              @click="selectMenu(index,$event)">
            <p class="b-1px"><span><i v-if="item.type >= 0" :class="classMap[item.type]"></i>{{item.name}}</span></p>
          </li>
        </ul>
      </div>
      <div class="goods-content" ref="goodsContent">
        <ul>
          <li v-for="item of goods" class="food-list-hook">
            <h2>{{item.name}}</h2>
            <div class="foods">
              <div class="food b-1px" v-for="item of item.foods" @click="selectFood(item,$event)">
                <img :src="item.icon">
                <div class="food-info">
                  <h3>{{item.name}}</h3>
                  <p class="food-desc" v-if="item.description">{{item.description}}</p>
                  <p class="food-sales">月售{{item.sellCount}}份 好评率{{item.rating}}%</p>
                  <p class="food-price"><span><i>￥</i>{{item.price}}</span>
                    <del v-if="item.oldPrice"><i>￥</i>{{item.oldPrice}}</del>
                  </p>
                </div>
                <div class="food-cartControl">
                  <cartControl :food="item"></cartControl>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <v-cart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></v-cart>
    <food :food="selectedFood" ref="foodDetail"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartControl from 'components/cartcontrol/cartcontrol'
  import food from 'components/food/food'
  import shopCart from 'components/shopCart/shopCart'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    name: 'goods',
    data () {
      return {
        goods: [],
        listHeight: [0],
        scrollY: 0,
        selectedFood: {}
      }
    },
    components: {
      cartControl,
      food,
      'v-cart': shopCart
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.axios.get('/api/goods').then((response) => {
        console.log(response)
        response = response.data
        if (response.code === 0) {
          this.goods = response.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
            console.log(this.listHeight)
          })
        }
      })
    },
    computed: {
      currentIndex () {
        const scrollY = this.scrollY
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || scrollY >= height1 && scrollY < height2) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      selectFood (food, event) {
        if (!event._constructed) return
        console.log(food)
        this.selectedFood = food
        this.$refs.foodDetail.toggleShow()
      },
      selectMenu (index, event) {
        if (!event._constructed) return
        let foodList = this.$refs.goodsContent.querySelectorAll('.food-list-hook')
        let el = foodList[index]
        this.contentScroll.scrollToElement(el)
      },
      _initScroll () {
        console.log(this.$refs.goodsMenu)
        this.menuScroll = new BScroll(this.$refs.goodsMenu, {click: true})
        this.contentScroll = new BScroll(this.$refs.goodsContent, {probeType: 3, click: true})
        this.contentScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.goodsContent.querySelectorAll('.food-list-hook')
        let height = 0
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
        console.log(this.listHeight)
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/base";

  .goods {
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    display: flex;
    overflow: hidden;
  }

  .goods-menu {
    width: 80px;
    flex: 0 0 80px;
    background-color: #f3f5f7;
    .active {
      background-color: #ffffff;
      font-weight: bold;
    }
    li {
      line-height: 14px;
      display: table;
      height: 54px;
      padding: 0 12px;
    }
    p {
      display: table-cell;
      vertical-align: middle;
      width: 56px;
    }
    span {
      .ellipsis(2);
    }
    i {
      display: inline-block;
      vertical-align: middle;
      width: 14px;
      height: 14px;
      margin-right: 2px;
      background-size: cover;
    }
  }

  .goods-content {
    flex-grow: 1;
    h2 {
      border-left: 2px solid #d9dde1;
      background-color: #f3f5f7;
      line-height: 26px;
      padding-left: 10px;
      color: rgb(147, 153, 159);
    }
  }

  .foods {
    padding: 0 18px;
  }

  .food-cartControl {
    position: absolute;
    bottom: 12px;
    right: 0;
  }

  .food {
    position: relative;
    display: flex;
    padding: 18px 0;
    img {
      height: 58px;
      width: 58px;
      display: block;
      margin-right: 10px;
    }
  }

  .food-desc {
    line-height: 1;
    margin-bottom: 8px;
  }

  .food-info {
    color: rgb(147, 153, 159);
    font-size: 10px;
    line-height: 1;
    h3 {
      font-size: 14px;
      color: rgb(7, 17, 27);
      margin: 2px 0 8px;
    }
  }

  .food-price {
    margin-top: 8px;
    span {
      color: rgb(240, 20, 20);
      font-size: 14px;
    }
    i {
      font-size: 10px;
      font-style: normal;
      display: inline-block;
      vertical-align: middle;
    }
  }

</style>
