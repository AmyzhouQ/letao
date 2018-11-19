$(function(){
  var currentPage = 1;
  var pageSize = 5;

  render();
  // 渲染页面和分页
  function render(){
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data:{
        page : currentPage,
        pageSize : pageSize
      },
      dataType: "json",
      success: function(info){
        console.log(info)
        var htmlStr = template("secondTmp", info);
        $("tbody").html(htmlStr);

        $("#first_paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, b, c, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page)
            currentPage = page;
            render();
          }
        });
      }
    })
  }
  // 点击添加显示模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  })

  // 下拉菜单渲染
  $.ajax({
    type: "get",
    url: "/category/queryTopCategoryPaging",
    data:{
      page : 1,
      pageSize : 100
    },
    dataType: "json",
    success: function(info){
      console.log(info)
      var htmlLis = template("brandTmp", info);
      $("#brandList").html(htmlLis);
    }
  })

  // 下拉菜单文本赋值input
  $(".dropdown").on("click","a",function(){
    var txt = $(this).text();
    var id = $(this).data("id");
    $("#dropdownMenu1").text(txt);
    $("[name='categoryId']").val(id);
    // 表单校验
    // $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })

  //图片上传
  

  

})