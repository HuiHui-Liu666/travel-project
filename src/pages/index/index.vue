<template>
  <van-search v-model="value" placeholder="搜索地点/景点/游记" />
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import http from '@/api'
const value = ref('')

onMounted(async ()=>{
  http.get('recomm_travel').catch(err=>{console.log(err);})
})
</script>

<style lang="scss" scoped></style>