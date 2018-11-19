$(function(){
  // var arr = ["耐克", "阿迪", "耐克王", "阿迪王", "老北京" ];
  // var jsonStr = JSON.stringify( arr );
  // localStorage.setItem( "search_list", jsonStr )
  //1.渲染历史记录
  // 获取历史记录,通过模板引擎渲染
  render();
  function gethistory(){
    var jsonStr = localStorage.getItem("search_list");
    var arr = JSON.parse(jsonStr);
    return arr;
  }
  function render(){
    var arr = gethistory();
    var htmlStr = template("searchTmp",{list: arr});
    $(".lt-history").html(htmlStr);
  }
  render();

  // 2.清空所有记录
  $(".lt-history").on("click","#deleteBtn",function(){
    mui.confirm("你确定要清空历史记录嘛?","文星提示",["取消","确认"],function(e){
      console.log(e)
      if(e.index === 1 ){
        localStorage.removeItem("search_list");
      }
      render();
    })
  })

  // 3.删除单个
  $(".lt-history").on("click",".icon-del",function(){
    var index = $(this).data("index");
    var arr = gethistory();
    arr.splice(index,1);
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem("search_list", jsonStr);
    render();
  })

  // 4.添加
  // 给搜索按钮添加点击事件,获取文本框内容,添加到数组第一项
  $(".searchBtn").click(function(){
    var key = $(".search-input").val().trim(); 
    if(key === ""){
      mui.toast('请输入关键字');
      return;
    }

    var arr = gethistory();
    // 有重复项
    var index = arr.indexOf(key);
    if(index != -1){
      arr.splice(index,1);
    }
    // 数量超过5个,添加前面,删除后面
    if(arr.length >= 5){
      arr.pop();
    }
    arr.unshift(key);
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem("search_list", jsonStr);
    $(".search-input").val("");
    render();

    









  })





})