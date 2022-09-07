<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <view class="swiper-item">
          <!-- 动态绑定图片的 src 属性 -->
          <image @click="goGoodList(item.goods_id)" :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navs" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floors" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <view class="left-img-box">
            <image @click="goGoodList(item.product_list[0].navigator_url)" class="left-img" :src="item.product_list[0].image_src"
              :style="{width: item.product_list[0].image_width + 'rpx'}"></image>
          </view>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
              <image @click="goGoodList(item2.navigator_url)" :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
              </image>
            </view>
          </view>
        </view>
      </view>

    </view>

  </view>
</template>

<script>
  import {
    getBanners,
    getNavList,
    getFloorList
  } from "@/api/home.js"
  export default {
    data() {
      return {
        swiperList: [],
        navs: [],
        floors: []
      };
    },
    methods: {

      async getFloorList() {
        const res = await getFloorList()
        this.floors = res
        console.log(res)
      },
      navClickHandler(item) {
        // 判断点击的是哪个 nav
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 获取导航
      // 加载导航列表数据
      async loadNavList() {
        const res = await getNavList()
        this.navs = res
      },
      async getBanners() {
        const res = await getBanners()
        this.swiperList = res

      },
      goGoodList(url) {
        uni.navigateTo({
          url: '/subpkj/good_lists/good_lists?' + url.split('?')[1]
        })
      }
    },
    onLoad() {
      this.getBanners()
      this.loadNavList()
      this.getFloorList()
    }
  }
</script>

<style lang="scss">
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-title {
    height: 60rpx;
    width: 100%;
    display: flex;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .image {
      height: 190rpx;
    }
  }

  .floor-img-box {
    display: flex;
    padding-left: 10rpx;

    .left-img {
      height: 392rpx !important;
    }
  }
</style>
