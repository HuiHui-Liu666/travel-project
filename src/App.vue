<script setup>
import tabBar from '@/components/tabBar/index.vue'
</script>

<template>
  <div class="container">
   <router-view></router-view>
    <tabBar/>
  </div>
</template>

<style>
#app{
  height: 200vh;
}
.container{
  padding-bottom: 50px;
}
</style>
 