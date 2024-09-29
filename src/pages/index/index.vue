<template>
  <!-- 搜索 -->
  <van-search
    v-model="value"
    placeholder="搜索地点/景点/游记"
    @focus="$router.push('/search')"
  />
  <!-- 宫格 -->
  <van-grid column-num="5">
    <van-grid-item
      v-for="item in gridArr"
      :key="item.id"
      :icon="item.icon"
      :text="item.text"
    />
  </van-grid>
  <!-- 推荐 -->
  <p class="recommond">推荐</p>
  <div class="recommond-wrapper" v-if="recommendArr.length">
    <div
      class="recommond-wrapper-left"
      @click="toDetail(recommendArr[activeIndex]._id)"
    >
      <div class="recommond-wrapper-left-item">
        <img :src="recommendArr[activeIndex].cover_image.url" alt="" />
      </div>
      <div class="recommond-wrapper-left-info">
        <div class="info-title">{{ recommendArr[activeIndex].title }}</div>
        <div
          v-for="(item, index) in recommendArr[activeIndex].author_data"
          :key="index"
        >
          <img :src="item.avatarUrl" alt="" />
          <span
            >{{ item.nickname }} &nbsp; 我在
            {{ recommendArr[activeIndex].address }}</span
          >
        </div>
      </div>
    </div>
    <div class="recommond-wrapper-right">
      <div
        class="recommond-wrapper-right-item"
        v-for="(rItem, index) in recommendArr"
        :key="rItem._id"
        @click="clickRecommend(index)"
      >
        <img :src="rItem.cover_image.url" alt="" />
      </div>
    </div>
  </div>

  <!-- 瀑布流 -->
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
  <tabBar />
</template>
<script lang="js" setup>
import card from '@/components/cardFlow/index.vue'
import { ref, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import tabBar from '@/components/tabBar/index.vue'
import http from '@/api'
const value = ref('')
const gridArr = ref([])
const recommendArr = ref([])
const activeIndex = ref(0)
const userTravels = ref([])
const $router = useRouter()

onMounted(async ()=>{
  const {category_nav, recomm_travel} = await http.get('recomm_travel').catch(err=>{console.log(err);})
  gridArr.value = category_nav
  recommendArr.value = recomm_travel

  let user_travels = await http.get('/user_travels', { page: page.value}).catch(err=>{console.log(err);})
  userTravels.value = user_travels

})
const clickRecommend = (index)=>{activeIndex.value = index}


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
const toDetail = (id)=>{
  $router.push({path:'/details',query:{id}})
}
</script>

<style lang="scss" scoped>
body {
  height: 200vh;
}
.recommond {
  font-size: 16px;
  font-weight: 700;
  margin: 10px;
}
.recommond-wrapper {
  height: 250px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  margin: 10px;

  &-left {
    position: relative;
    flex: 4;
    &-item {
      width: 100%;
      height: 100%;
    }
    &-info {
      position: absolute;
      bottom: 10px;
      left: 10px;
      .info-title {
        color: #fff;
        font-weight: 700;
        font-size: 14px;
        margin-bottom: 5px;
      }
      div {
        display: flex;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
        span {
          font-size: 12px;
          color: #fff;
        }
      }
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  &-right {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    background-color: rgb(138, 147, 192);

    flex: 1;
    &-item {
      flex: 1;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  // &-item{
  //   &:first-of-type{
  //     grid-column: 1/5;
  //     grid-row: 1/5;
  //   }
  //   &:not(:first-of-type){
  //     // padding: 8px;
  //   }
  //   :nth-of-type(3), :nth-of-type(4),:nth-of-type(5){
  //     padding-bottom: 0px;

  //   }
  //   img{
  //     height: 100%;
  //     width: 100%;
  //     object-fit: cover;
  //   }
  // }
}
.card-flow-list {
  margin: 10px;
}
</style>
