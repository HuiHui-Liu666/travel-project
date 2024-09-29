<script lang="js" setup>
import card from '@/components/cardFlow/index.vue'
import http from '@/api';
  import { onMounted, ref } from 'vue';

  let keywords = ref('');
  let hotCity = ref([]);
  let historyShow = ref(true);
  let listShow = ref(false);
  let travelShow = ref(false);
  let historyData = ref([]);
  let searchList = ref([]);
  let userTravels = ref([])

  const loading = ref(false);
  const finished = ref(false);
  const page = ref(1);

  const onLoad = async ()=>{
  loading.value = true
  page.value++
  let res = await http.get('/user_travels', { page: page.value}).catch(err=>{console.log(err);})
  loading.value = false
  if(res.length){finished.value = true}
  userTravels.value = [...userTravels.value,...res]
}

  onMounted(async() => {
    let res = await http.get('/hot_city').catch(err=>{console.log(err);})
    hotCity.value = res

    // 历史记录
    historyData.value = JSON.parse(localStorage.getItem('historyData')) || []
  })
  const deleteHistory = ()=>{
    localStorage.removeItem('historyData')
    historyData.value = []

  }

  const debounce = function (fn,delay){
    let timer = null;
    return function(){
      if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(()=>{
      fn.apply(this,arguments)
    },delay)
    }
  }
  const handleSearch = async ()=>{
    historyShow.value = keywords.value ? false : true
    listShow.value = keywords.value ? true : false
    let res1 = await http.get('/search_travel',{keywords:keywords.value}).catch(err=>console.log(err))
    searchList.value = res1

  }
  const handleUpdate = debounce(handleSearch,500)

  const goSearch = async (item)=>{
    keywords.value = item
    let res2 = await http.get('/search_result',{page:1,keywords:keywords.value}).catch(err=>console.log(err))
    userTravels.value = res2
    travelShow.value = true
    listShow.value = false
    historyShow.value = false


    // 点击item之后存储 搜索结果
    let arr = JSON.parse(localStorage.getItem('historyData')) || []
    arr.unshift(item)
    historyData.value = [...new Set(arr)]
    localStorage.setItem('historyData',JSON.stringify(historyData.value))
  }

  const cancelEvent = ()=>{
    historyShow.value = true
    listShow.value = false
    travelShow.value = false
    keywords.value = ''
    userTravels.value = []
  }
  // 获取焦点的时候 div的显示隐藏
  const focusInput = ()=>{
    handleUpdate()
    historyShow.value = keywords.value === '' ? true : false
    listShow.value = keywords.value  === '' ? false : true
    travelShow.value = keywords.value  === '' ? true : false
  }
</script>
<template>
  <!-- 搜索 -->
  <van-search
    v-model="keywords"
    placeholder="搜索地点/美食等"
    :autofocus="true"
    @update:model-value="handleUpdate"
    @clear="cancelEvent"
    @focus="focusInput"
  />

  <div class="history-wrapper" v-show="historyShow">
    <!-- 搜索过的城市 -->
    <div class="history-list" v-if="historyData.length">
      <div class="history-list-top">
        <p class="title">历史搜索</p>
        <van-icon name="delete-o" @click="deleteHistory" />
      </div>
      <div class="history-list-item">
        <van-tag
          color="#f7f8fa"
          text-color="#5d717d"
          round
          v-for="item in historyData"
          :key="item"
          @click="goSearch(item)"
        >
          {{ item }}</van-tag
        >
      </div>
    </div>

    <!-- 热点旅游城市 -->
    <div class="hot_city">
      <p class="title">热点旅游城市</p>
      <div class="hot_city-list" v-if="hotCity.length">
        <div class="hot_city-list-item" v-for="item in hotCity" :key="item._id">
          <div class="left">
            <img :src="item.image" alt="" />
          </div>
          <div class="right">
            <div class="right-title">{{ item._id }}</div>
            <div class="right-info">{{ item.count }}人去过</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="searche-list-wrapper" v-show="listShow">
    <div
      class="searche-list-wrapper-item"
      v-for="(item, index) in searchList"
      :key="index"
      @click="goSearch(item)"
    >
      {{ item }}
    </div>
  </div>
  <!-- 搜索之后点击item之后展示 -->
  <div class="travelShow" v-show="travelShow">
    <van-list
      class="card-flow-list"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
      <card :userTravels="userTravels" />
    </van-list>
  </div>
</template>
<style lang="scss" scoped>
.hot_city {
  .title {
    font-size: 16px;
    font-weight: 700;
    margin: 10px;
    margin-bottom: 0;
  }
  &-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;

    &-item {
      display: flex;
      gap: 10px;
      height: 55px;

      .left {
        img {
          width: 55px;
          height: 55px;
          object-fit: cover;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        .right-title {
          font-size: 14px;
          color: #000;
        }
        .right-info {
          font-size: 12px;
          color: #969799;
        }
      }
    }
  }
}
.history-list {
  &-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .van-icon {
      font-size: 18px;
      margin-right: 10px;
    }
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    margin: 10px;
  }
  &-item {
    padding: 10px;
    padding-top: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    .van-tag {
      padding: 4px 10px;
      border-radius: 100px;
    }
  }
}
.searche-list-wrapper {
  padding: 10px;
  &-item {
    font-size: 16px;
    font-weight: 400;
    padding: 10px 0px;
    border-bottom: 1px solid #e5e5e5;
  }
}
.travelShow {
  padding: 10px;
}
</style>
