<template>
  <div>
    <v-header :seller="seller"></v-header>
    <ul class="tab b-1px">
      <li>
        <router-link to="/goods">商品</router-link>
      </li>
      <li>
        <router-link to="/ratings">评价</router-link>
      </li>
      <li>
        <router-link to="/seller">商家</router-link>
      </li>
    </ul>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from 'components/header/header'
  import goods from 'components/goods/goods'

  const CODE_OK = 0

  export default {
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.axios.get('/api/seller').then((response) => {
        console.log(response)
        response = response.data
        if (response.code === CODE_OK) {
          this.seller = response.data
          console.log(this.seller)
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "common/less/base";

  .tab {
    height: 40px;
    line-height: 40px;
    display: flex;
    font-size: 14px;
    text-align: center;
    li {
      flex: 1;
    }
    .router-link-active {
      color: rgb(240, 20, 20);
    }
    a {
      color: rgb(77, 85, 93);
    }
  }
</style>


