$(function(){
  var currentPage = 1;
  var pageSize = 5;

  render();

  function render(){
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data:{
        page : currentPage,
        pageSize : pageSize
      },
      dataType: "json",
      success: function(info){
        console.log(info)
        var htmlStr = template("firstTmp", info);
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

  // 添加按钮点击模态框显示事件
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
  })
  

  // 表单校验
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          }
        }
      },
    }
  });

  // 添加功能,ajax请求
  $("#form").on('success.form.bv', function (e) {
    // 阻止页面跳转
    e.preventDefault();
    // ajax请求数据
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("#form").serialize(),
      dataType: "json",
      success: function(info){
        if(info.success){
          $("#addModal").modal("hide");
          render();
          $("#form").data('bootstrapValidator').resetForm("true");

        }
      }
    })
  })


})