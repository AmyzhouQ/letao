$(function(){
  var currentPage = 1;
  var pageSize = 3;
  var picArr = [];
  render();

  // 页面渲染
  function render(){
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info){
        // console.log(info);
        var htmlStr = template("goodsTmp", info);
        $("tbody").html(htmlStr);

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(info.total/info.size),
          onPageClicked: function (a,b,c,page) {
              currentPage = page;
              render();
          }
      })
      }
    })
  }

  // 添加分类弹出添加模态框
  $("#addBtn").click(function(){
    $("#addModal").modal("show");
    // 下拉菜单渲染
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data:{
        page : 1,
        pageSize : 100
      },
      dataType: "json",
      success: function(info){
        // console.log(info)
        var htmlLis = template("brandTmp", info);
        $(".dropdown-menu").html(htmlLis);
      }
    })
  })


  // 给下拉菜单每个a注册点击事件,获取id和内容,赋值到相对区域
  // 动态渲染的,所以用事件委托
  $(".dropdown-menu").on("click","a",function(){
    var txt = $(this).text();
    $("#dropdownMenu1").text(txt);

    var id = $(this).data("id");
    $("[name='brandId']").val(id);

    // 表单校验
    $("#form").data("bootstrapValidator").updateStatus("brandId", "VALID");              
    

  })

  // 文件上传
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    // data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      console.log(data)
      var picObj = data.result;
      var picAddr = data.result.picAddr;
      var picName = data.result.picName;

      picArr.unshift(picObj);
      $("#imgBox").prepend('<img src="'+picAddr+'" alt="" style="height:100px;">')

      if(picArr.length > 3){
        picArr.pop();
        $("#imgBox img:last-of-type").remove();
      }
      if(picArr.length === 3){
        $("#form").data("bootstrapValidator").updateStatus("picStatus", "VALID" );
      }
    }
  });

  // 表单校验
  $('#form').bootstrapValidator({
    // 对隐藏域校验
    excluded: [],
    feedbackIcons: {
      　　　　　　　　valid: 'glyphicon glyphicon-ok',
      　　　　　　　　invalid: 'glyphicon glyphicon-remove',
      　　　　　　　　validating: 'glyphicon glyphicon-refresh'
  　　　　　　　　   },
    fields: {
      brandId: {
        validators: {
            notEmpty: {
                message: '请输入二级分类'
            }
        }
      },
      proName: {
            validators: {
                notEmpty: {
                    message: '产品名称不能为空'
                }
            }
      },
      proDesc: {
          validators: {
              notEmpty: {
                  message: '产品描述不能为空'
              }
          }
      },
      num: {
          validators: {
              notEmpty: {
                  message: '产品库存不能为空'
              },
              regexp: {
                regexp: /^[1-9]\d*$/,
                message: '请输入非零开头的数字'
              }
          }
      },
      size: {
          validators: {
              notEmpty: {
                  message: '产品尺寸不能为空'
              },
              regexp: {
                regexp: /^\d{2}-\d{2}$/,
                message: '必须是 xx-xx 的格式,  xx两位数字'
              }
          }
      },
      oldPrice: {
          validators: {
              notEmpty: {
                  message: '产品原价不能为空'
              },
              regexp: {
                regexp: /^[1-9]\d*$/,
                message: '请输入非零开头的数字'
              }
          }
      },
      price: {
          validators: {
              notEmpty: {
                  message: '产品现价不能为空'
              },
              regexp: {
                regexp: /^[1-9]\d*$/,
                message: '请输入非零开头的数字'
              }
          }
      },
      price: {
          validators: {
              notEmpty: {
                  message: '产品现价不能为空'
              }
          }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });

  // 表单提交添加
  $("#form").on('success.form.bv',function(e){
    e.preventDefault();
    var info = $("#form").serialize();
    console.log(info);
    info += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
    info += "&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
    info += "&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;
   
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: info,
      dataType: "json",
      success:function(info){
        console.log(info);
        if(info.success){
          $('#addModal').modal("hide");
          currentPage = 1;
          render();
  
          $("#form").data("bootstrapValidator").resetForm("true");
          $("#dropdownMenu1").text("请选择二级分类");
          $("#imgBox img").remove();
          picArr = [];
        }
      }
    })
  })

})