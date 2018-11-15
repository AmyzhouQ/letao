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

// 点击分类管理二级菜单显示隐藏
$(function(){
  $(".cate").click(function(){
    $(this).next().stop().slideToggle();  
  })
});

// 单击icon-left 侧边栏滑出
$(function(){
  $(".icon-left").click(function(){
    $(".lt-aside").toggleClass("hidemenu");
    $(".lt-main").toggleClass("hidemenu"); 
    $(".lt-topbar").toggleClass("hidemenu"); 
  })
})

// 模态框退出功能
$(function(){
  $(".btn-out").click(function(){
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function(info){
        console.log(info);
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  })
})
