<template>
  <van-search v-model="value" placeholder="搜索地点/景点/游记" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('')
</script>

<style lang="scss" scoped></style>