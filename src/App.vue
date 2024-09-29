<script setup>
import Login from '@/pages/login/index.vue'
</script>

<template>
  <div class="container">
   <router-view></router-view>
   <Login/>
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
 