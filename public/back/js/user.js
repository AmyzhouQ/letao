$(function () {

  var currentPage = 1;
  var pageSize = 5;

  var currentId;
  var isDelete;

  render();
  // 渲染页面
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function (info) {
        console.log(info)
        var htmlStr = template("tmp", info);
        $("tbody").html(htmlStr);

        $("#user_paginator").bootstrapPaginator({
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

  // 启用禁用按钮
  // 动态渲染,所以采用时间委托
  $("tbody").on("click","button",function(){
    // $("#statusModal").modal("show");
    currentId = $(this).parent().data("id");
    console.log(currentId)
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1; 
  })
  $("#confirmBtn").click(function(){
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          $('#statusModal').modal("hide");
          render();
        }
      }
    })
  })
})