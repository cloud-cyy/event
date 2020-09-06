$(function(){
    var layer = layui.layer
    var form = layui.form
    template.defaults.imports.dataFormat=function(date){
        const dt=new Date(date)
        var y=dt.getFullYear()
        var m=padZero(dt.getMonth()+1)
        var d= padZero(dt.getDate())
        var hh= padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
         var ss = padZero(dt.getSeconds())
         return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
      }
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
      }
      initTable()
      function initTable(){
    $.ajax({
        method: 'GET',
        url: '/my/article/list',
        data:q,
        success: function(res) {
            console.log(res);
          if (res.status !== 0) {
            return layer.msg('获取文章列表失败！')
          }
          // 使用模板引擎渲染页面的数据
          var htmlStr = template('tpl-table', res)
          $('tbody').html(htmlStr)
          renderPage(res.total)
        }
    })     
}
initCate()
function initCate(){
    $.ajax({
        type:'GET',
        url:'/my/article/cates',
        success(res){
if(res.status!==0){
    return layer.msg('获取分类数据失败！')
}
var htmlStr = template('tpl-cate', res)
//简单地说，模板引擎的作用就是取得数据并加以处理，最后显示出数据
$('[name=cate_id]').html(htmlStr)
form.render()  
//<option value="{{$value.Id}}">{{$value.name}}</option>这行代码可获取到$value.Id
// 被用layui隐藏了 重新设置样式 又重新渲染了出来
        }
    })
}
$('#form-search').on('submit', function(e) {
    e.preventDefault()
    // 获取表单中选中项的值
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    // 为查询参数对象 q 中对应的属性赋值
    q.cate_id = cate_id
    q.state = state
    // 根据最新的筛选条件，重新渲染表格的数据
    initTable()
})
function renderPage(total) {
  var laypage = layui.laypage;
  //执行一个laypage实例
  laypage.render({
    elem: 'pageBox', // 分页容器的 Id
      count: total, // 总数据条数
      limit: q.pagesize, // 每页显示几条数据
      curr: q.pagenum, // 设置默认被选中的分页
      layout:['count', 'limit','prev', 'page', 'next'],
      limits: [2, 3, 5, 10],
        // 分页发生切换的时候，触发 jump 回调
      // 触发 jump 回调的方式有两种：
      // 1. 点击页码的时候，会触发 jump 回调
      // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
      jump: function(obj,zhuangtai) {
        //zhuangtai为undefined表示手动触发
         //zhuangtai为true表示程序触发
         // console.log(zhuangtai)
        // console.log(obj.curr)
        q.pagenum = obj.curr
        q.pagesize = obj.limit
          // 把最新的页码值，赋值到 q 这个查询参数对象中
        if (!zhuangtai) {
          initTable()
        }
      }
})
}
$('tbody').on('click', '.btn-delete', function() {
  var id = $(this).attr('data-id')
  var len = $('.btn-delete').length
  layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
    $.ajax({
      method: 'GET',
      url: '/my/article/delete/' + id,
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('删除文章失败！')
        }
        layer.msg('删除文章成功！')
        if(len==1&& q.pagenum!==1){
          q.pagenum-=1
        }
        initTable()
      }
    })
    layer.close(index);
  })
})
})