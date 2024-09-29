<template>
  <div class="details-wrapper">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in articleDetails.image" :key="item">
        <img :src="item" alt="" />
      </van-swipe-item>
    </van-swipe>

    <!-- 作者信息 -->
    <div
      class="author-info"
      v-for="item in articleDetails.author"
      :key="item._id"
    >
      <div class="auth-info-left">
        <img :src="item.avatarUrl" alt="" />
        <div>
          <span>{{ item.nickname }}</span>
          <span>{{ articleDetails.time }}</span>
        </div>
      </div>
      <div class="auth-info-right">
        <div class="follow" @click="attentionAuthor(item._id)">+ 未关注</div>
      </div>
    </div>
    <!-- tags -->
    <div class="tags-list">
      <div class="tag">成都市</div>
      <div class="tag">成华区</div>
      <div class="tag">成都市</div>
      <div class="tag">成华区</div>
      <div class="tag">成都市</div>
      <div class="tag">成华区</div>
      <div class="tag">成都市</div>
      <div class="tag">成华区</div>
    </div>

    <!-- 文章详情 -->
    <div class="article-details">
      <div class="article-title">{{ articleDetails.title }}</div>
      <div class="article-content">{{ articleDetails.content }}</div>
    </div>
    <!-- 评论列表 -->
    <div class="comments-list">
      <div
        class="comments-list-item"
        v-for="item in commentsData"
        :key="item._id"
      >
        <div
          class="left-wrapper"
          v-for="_itemt in item.comment_user"
          :key="_itemt"
        >
          <img :src="_itemt.avatarUrl" alt="" />
          <div>
            <span class="name">{{ _itemt.nickname }}</span>
            <span class="comments-content">{{ item.content }}</span>
          </div>
        </div>
        <span @click="deleteComments">删除</span>
      </div>
      <div class="comments-list-item">
        <div class="left-wrapper">
          <img
            src="https://travel-1327457995.cos.accelerate.myqcloud.com/travel/1719280399287-5166390.jpg"
            alt=""
          />
          <div>
            <span class="name">用户名</span>
            <span class="comments-content">2022-12-12</span>
          </div>
        </div>
        <span @click="deleteComments">删除</span>
      </div>
    </div>
    <!-- 相关推荐 -->
    <div class="relationRecommond-wrapper">
      <div class="title">相关推荐</div>
      <card :userTravels="userTravels" />
    </div>
    <!-- 发表评论 -->
    <div class="publish-comment">
      <van-search shape="round" v-model="comment" placeholder="谈谈感受">
        <template #slot="leftIcon"> jjj </template>
      </van-search>
      <div class="publish-comment-right">
        <div class="good-job">
          <van-icon name="good-job-o" /><span class="number">1</span>
        </div>
        <div class="chat">
          <van-icon name="chat-o" /><span class="number">1</span>
        </div>
        <div class="like">
          <van-icon name="like-o" /><span class="number">1</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="js" setup>
import http from '@/api'
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import card from '@/components/cardFlow/index.vue'

const $route = useRoute()
const articleDetails = ref({})
const userTravels = ref([])
const commentsData = ref([])
const comment = ref('')
onMounted(async () => {
  const id = $route.query.id;
  // 获取详情
  const res = await http.get('/article_data', { article_id:id }).catch((err) => {console.log(err)})
  articleDetails.value = res[0]

  // 获取相关推荐
  const recommand = await http.get('/rec_the_same', { article_id:id,page:1 }).catch((err) => {console.log(err)})
  userTravels.value = recommand

  // 获取评论列表
  const res3 =  await http.get('/comments_data', { article_id:id,page:1 }).catch((err) => {console.log(err)})
  commentsData.value = res3
  console.log(res3);
})
const deleteComments = (item) => {
  console.log('delete:',item);
}
const attentionAuthor = async (id)=>{
  let res = await http.get('/follow_author',{im_concerned_uid:id}).catch((err) => {console.log(err)})
  console.log(res);
}
</script>

<style lang="scss" scoped>
.details-wrapper {
  background-color: #fff;
  font-size: 14px;
  padding-bottom: 50px;
  .my-swipe {
    height: 300px;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .author-info {
    margin: 10px;
    padding: 10px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    .auth-info-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      & > div {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 4px;
      }
    }
    .auth-info-right {
      .follow {
        padding: 5px 8px;
        background-color: #f7d448;
        border-radius: 4px;
      }
    }
  }
  .article-details {
    padding: 10px;

    .article-title {
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .article-content {
      font-size: 14px;
      line-height: 22px;
    }
  }
  .tags-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    gap: 8px;
    .tag {
      padding: 2px 8px;
      font-size: 12px;
      font-weight: 700;
      border-radius: 1000px;
      background-color: #f4d347;
    }
  }

  .van-search .van-search__content {
    border-radius: 10px;
  }
  .comments-list {
    margin: 10px;
    background-color: #f7f8fa;
    border-radius: 6px;
    .comments-list-item {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      .left-wrapper {
        display: flex;
        align-items: center;
        font-size: 14px;
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }
        & > div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .name {
          color: #c6c4c7;
        }
      }
      > span {
        color: #adb3b9;
      }
    }
  }
  .relationRecommond-wrapper {
    padding: 10px;

    .title {
      font-size: 18px;
      font-weight: 700;
      margin: 10px;
      margin-left: 0;
    }
  }

  .publish-comment {
    width: 100%;
    position: fixed;
    bottom: 0px;
    background-color: #fff;
    border-top: 1px solid #f8f8f8;
    padding: 5px 0px;
    box-sizing: border-box;
    display: flex;
    .publish-comment-right {
      flex: 1;
      display: flex;
      & > div {
        font-size: 18px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2px;
        .number {
          font-size: 14px;
          color: #cbcace;
        }
      }
    }
  }
}
</style>
