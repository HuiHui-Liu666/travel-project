<script lang="js" setup>
import { ref } from 'vue';
import emitter from '@/api/event';
 const show = ref(false);
  const showPopup = () => {
    show.value = true;
  };
  emitter.on('login-pop-up',()=>{
    show.value = true;
  })
</script>

<template>
  <van-cell title="展示弹出层" is-link @click="showPopup" />
  <van-popup
    position="bottom"
    :closeable="true"
    v-model:show="show"
    :style="{ padding: '64px', height: '100%' }"
    >内容</van-popup
  >
</template>
<style lang="scss" scoped>
</style>
