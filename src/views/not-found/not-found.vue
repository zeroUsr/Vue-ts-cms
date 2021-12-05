<template>
  <div class="not-found">
    <img class="img" src="~@/assets/img/not-found.png" alt="Not Found" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.not-found {
  height: 100%;

  .img {
    display: block;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
