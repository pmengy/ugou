function toast(title, duration = 3000) {
  uni.showToast({
    title,
    icon: 'none',
    duration
  })
}

toast.err = function(title, duration = 3000) {
  uni.showToast({
    title,
    icon: 'error',
    duration
  })
}

toast.loading = function(title, duration) {
  uni.showToast({
    title: '正在加载中',
    icon: 'loading',
  })
}
export default toast
