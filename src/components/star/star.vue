<template>
  <div class="star">
    <span v-for="item of itemClass" :class="item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    name: 'v-star',
    props: {
      score: {
        type: Number
      }
    },
    computed: {
      itemClass: function () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        for (let i = 0; i < Math.floor(score); i++) {
          result.push(CLS_ON)
        }
        if (score % 1 !== 0) { // 是否包含半星
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) { // 补星星
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "../../common/less/base";

  .star {
    span {
      display: inline-block;
      vertical-align: middle;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      width: 20px;
      height: 20px;
      margin-right: 22px;
      &:last-child {
        margin-right: 0 !important;
      }
    }

    @class: on, off, half;

    .for(@class);
    .each(@item) {
      .@{item} {
        background-image: url("./img/star48_@{item}@2x.png");
      }
    }
  }
</style>
