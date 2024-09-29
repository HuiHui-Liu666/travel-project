<script setup>
import tabBar from '@/components/tabBar/index.vue'
</script>

<template>
  <div>
   <router-view></router-view>
  <tabBar/>
  </div>
</template>

<style>
#app{
  height: 200vh;
}
</style>
 