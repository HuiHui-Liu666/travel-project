<script lang="js" setup>
  import { ref, watch } from 'vue';
  // 接收外面传递的参数
  const props = defineProps({
    userTravels:{
      type: Array,
      default: () => [],
      required: true
    }
  })

  // 左右侧的内容
  let leftItems = ref([])
  let rightItems = ref([])

  let leftHeight = ref(0)
  let rightHeight = ref(0)

  watch(props,(newValue,oldValue)=>{
    // 初始化操作：
    leftItems.value = []
    rightItems.value = []
    leftHeight.value = 0
    rightHeight.value = 0

    
    let {userTravels} = newValue
    if(userTravels.length > 0){
      // 循环数据
      userTravels.forEach((item,index)=>{
        // 如果左侧高度 小于 右侧高度
        if(leftHeight.value <= rightHeight.value){
          leftItems.value.push(item)
          leftHeight.value += handleHeight(item.cover_image.width,item.cover_image.height)
        }else{
          rightItems.value.push(item)
          rightHeight.value += handleHeight(item.cover_image.width,item.cover_image.height)
        }
      })
    }
  })
  // 计算收缩之后的宽度和高度
  const handleHeight = (realWidth,realHeight) => {
    let radio = realWidth / realHeight

    // 缩放之后的图片宽度？ 
    let screenWidth = window.innerHeight
    let itemWidth = Math.floor((screenWidth - 30) / 2)
    return Number(itemWidth / radio)
  }
</script>
<template>
  <div class="card-wrapper">
    <div class="card-wrapper-left">
      <div class="card-wrapper-item" v-for="item in leftItems" :key="item._id">
      <div class="card-wrapper-item-img">
        <img :src="item.cover_image.url" alt="">
        <div class="card-wrapper-item-img-dingwei">
          <div>
            <van-icon name="location" /><span>{{item.address}}</span>
          </div>
        </div>
      </div>
      <div class="card-wrapper-item-bottom">
        <div class="card-wrapper-item-title">{{item.title}}</div>
      <div class="card-wrapper-item-info">
        <div>
          <img :src="item.author_data[0].avatarUrl" alt="" class="card-wrapper-item-info-icon">
          <div class="card-wrapper-item-info-name">{{item.author_data[0].nickname}}</div>
        </div>
        <div>
          <div class="card-wrapper-item-info-likes"> <van-icon name="like-o" /><span style="margin-left: 5px;">5</span></div>
        </div>
      </div>
      </div>
    </div>
    </div>
    <div class="card-wrapper-right">
      <div class="card-wrapper-item" v-for="item in rightItems" :key="item._id">
      <div class="card-wrapper-item-img">
        <img :src="item.cover_image.url" alt="">
        <div class="card-wrapper-item-img-dingwei">
          <div>
            <van-icon name="location" /><span>{{item.address}}</span>
          </div>
        </div>
      </div>
      <div class="card-wrapper-item-bottom">
        <div class="card-wrapper-item-title">{{item.title}}</div>
      <div class="card-wrapper-item-info">
        <div>
          <img :src="item.author_data[0].avatarUrl" alt="" class="card-wrapper-item-info-icon">
          <div class="card-wrapper-item-info-name">{{item.author_data[0].nickname}}</div>
        </div>
        <div>
          <div class="card-wrapper-item-info-likes"> <van-icon name="like-o" /><span style="margin-left: 5px;">5</span></div>
        </div>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.card-wrapper{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  &-left,&-right{
    flex: 1;
    width: calc((100% - 30px) / 2);
    .card-wrapper-item{
      &:not(:first-of-type){
        margin-top: 25px;
}
    }

  }
  &-item{
    border-radius: 10px;
    overflow: hidden;
    &-img{
      position: relative;
      img{
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      &-dingwei{
        position: absolute;
        bottom: 3px;
        width: 100%;

        div{
          box-sizing: border-box;
          background-color: rgba(0,0,0,0.3);
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.8));
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          padding: 4px 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          span{
            margin-left: 5px;
          }
        }
        color: #fff;
        font-size: 12px;
      }
    }
    &-title{
      font-size: 14px;
      font-weight: 700;
      color: #000;
      margin-bottom: 10px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-info{
      display: flex;
      justify-content: space-between;
      &>div{
        display: flex;
        align-items: center;
      }
      &-icon{
        width: 25px;height: 25px;border-radius: 50%;margin-right: 10px;
      }
      &-name{
        max-width: 100px;
        font-size: 14px;
        color:#969799;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-likes{
        .van-icon-like-o{
          font-size: 16px;
        }
        font-size: 14px;
        color:#969799
      }
    }
  }
}
</style>