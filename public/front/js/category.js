$(function(){
  // 一级渲染
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function(info){
      console.log(info);
      var htmlStr = template("cateoneTmp",info);
      $("#cateone").html(htmlStr);
      renderById(info.rows[0].id);
    }
  })

  // 给一级菜单的a绑定点击事件,获取当前的id,发生ajax请求
  $("#cateone").on("click","a",function(){
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
    var id = $(this).data("id");
    // console.log(id)
    renderById(id)

    
    
  })
  
  // 二级渲染
  function renderById(id){
    $.ajax({
    type: "get",
    url: "/category/querySecondCategory",
    data: {
      id : id
    },
    dataType: "json",
    success: function(info){
      // console.log(info);
      var htmlStr = template("catetwoTmp",info);
      $("#catetwo").html(htmlStr);
    }
  }) 
  }
})