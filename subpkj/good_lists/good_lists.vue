<template>
  <view>
    <van-card
      v-for="item in goods"
      :key="item.goods_id"
      :price="item.goods_price | toFixed"
      :title="item.goods_name"
      :thumb="item.goods_small_logo || defaultPic"
      :thumb-link="`/subpkj/goods_detail/goods_detail?id=${item.goods_id}`"
    />
  </view>
</template>

<script>
  import { getGoodsList } from '@/api/goods.js'
  import toast from '@/uitls/tost.js'
  export default {
    data() {
      return {
        queryData: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goods: [],
        total: '',
        isLoading: false,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'

      }
    },
    onLoad({query}) {
      this.queryData.query = query
      this.loadGoodsList()
    },
    onPullDownRefresh() {
      this.queryData = {
          query: this.queryData.query,
          cid: '',
          pagenum: 1,
          pagesize: 10
        }
        this.goods = []
        this.total = ''
    this.loadGoodsList(() => {
      uni.stopPullDownRefresh()
    })
    },
    // 监听上拉触底
    onReachBottom() {
      if(this.queryData.pagenum * this.queryData.pagesize >= this.total) return toast('没有更多数据啦')
      if(this.isLoading) return
      this.queryData.pagenum ++
      this.loadGoodsList()
    },
    methods: {
      // 加载商品列表数据
     async loadGoodsList(stopPullDown){
       this.isLoading = true
        const { total , goods } = await getGoodsList(this.queryData)
        this.isLoading = false
        this.total = total
        this.goods = [...this.goods,...goods]
        stopPullDown && stopPullDown()
      }

    }
  }
</script>

<style>

</style>
