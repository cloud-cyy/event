$(function() {
    var layer = layui.layer
    var form=layui.form
    initArtCateList()
    // 获取文章分类的列表
    function initArtCateList() {
      $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
          var htmlStr = template('tpl-table', res)
          $('tbody').html(htmlStr)
        }
      })
    }
    var indexAdd = null
    $("#btnAddCate").on('click',function(){
        indexAdd =layer.open({   //点击会弹出一个输入框
            type: 1,          //  type: 1,表示把确定按钮給隐藏
            area: ['500px', '250px'],    //设置弹出框的宽高
            title: '添加文章类别',
            content: $("#dialog-add").html()    //引入弹出框的html
          }); 
    })
    $('body').on('submit','#form-add',function(e){
        //模板引擎里面的数据 页面加载时 还未渲染出来 所以要代理父元素执行点击事件
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),    //表单提交事件时  一般执行这行代码 快速渲染出数据
            success(res){
                if(res.status!==0){
                    console.log(res);
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()  //重新 获取文章分类的列表
                layer.msg('新增分类成功！')
                layer.close(indexAdd)      //添加成功后隐藏弹出框 
            }
        })
    })
    var indexEdit = null
    $('tbody').on('click','.btn-edit',function(){
        indexEdit =layer.open({
                type: 1,
                area: ['500px', '250px'],
                title: '修改文章类别',
                content: $("#dialog-edit").html()
              })
              var id=$(this).attr('data-id')
              $.ajax({
                  type:'GET',
                  url:'/my/article/cates/'+id,
                  success(res){
                 form.val('form-edit',res.data)
                 
                  }
              })  
    })
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('更新分类数据失败！')
              }
              layer.msg('更新分类数据成功！')
              layer.close(indexEdit)
              initArtCateList()
            }
          })
    })
$('tbody').on('click','.btn-delete',function(){
    var id = $(this).attr('data-id')
    layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
        
        $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('删除分类失败！')
              }
              layer.msg('删除分类成功！')
            layer.close(index);
        initArtCateList()
    }
      });
    })
})
})