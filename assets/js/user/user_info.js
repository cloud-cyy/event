$(function(){
    var form = layui.form
  var layer = layui.layer
  form.verify({
    nickname: function(value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })
  initUserInfo()
function initUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        type:'GET',
        success:function(res){
            if(res.status===!0){
                return layer.msg('获取用户信息失败！')
            }
            console.log(res);
            form.val('formUserInfo', res.data)
        }
    })
}
$("#btnReset").on('click',function(e){
    e.preventDefault()
    initUserInfo()
})
$(".layui-form").on('submit',function(e){
    e.preventDefault()
    $.ajax({
        url:'/my/userinfo',
        type:'POST',
        data:$(this).serialize(),
        success(res){
            if(res.status!==0){
                return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            window.parent.getUserInfo()
        }
    })
})
})