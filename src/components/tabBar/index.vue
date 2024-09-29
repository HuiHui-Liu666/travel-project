<template>
  <van-tabbar v-model="active" route active-color="#ff9800" inactive-color="#000">
  <van-tabbar-item to= '/' icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item to= '/found' icon="location-o">目的地</van-tabbar-item>
  <van-tabbar-item to= '/publish' icon="guide-o">写游记</van-tabbar-item>
  <van-tabbar-item to= '/mine' icon="manager-o">我的</van-tabbar-item>
</van-tabbar>

</template>
<script lang="ts" setup>
import { ref } from 'vue'
const active = ref('index')
</script>
<style lang="scss" scoped></style>