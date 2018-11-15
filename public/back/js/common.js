//进度条
$( document ).ajaxStart(function() {
  NProgress.start();
});
$( document ).ajaxStop(function() {
  // 延迟
  setTimeout(function(){

    NProgress.done();
  },2000)
});