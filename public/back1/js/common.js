// 进度条
$(function(){
  $( document ).ajaxStart(function() {
    NProgress.start(); 
  });


  $( document ).ajaxStop(function() {
    setTimeout(function(){
      NProgress.done();
    },1000)
  });


// aside二级菜单显示隐藏

  $(".cate").click(function(){
    $(this).next().slideToggle();
  })


// aside滑出
  $(".icon-left").click(function(){
    $(".aside").toggleClass("hidemenu");
    $(".main").toggleClass("hidemenu");
    $(".topbar").toggleClass("hidemenu");
  })


// 退出功能
  $("#outBtn").click(function(){
    location.href = "login.html";
  })
})