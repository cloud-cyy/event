$(function() {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
      // 提示用户是否确认退出layui里面弹出框的提示部分
// layer.confirm(content, options, yes, cancel) - 询问框
// 类似系统confirm，但却远胜confirm，另外它不是和系统的confirm一样阻塞你需要把交互的语句放在回调体中。同样的，它的参数也是自动补齐的。
//eg1
// layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
//   //do something
  
//   layer.close(index);
// });
      layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'
        // 关闭 confirm 询问框
        layer.close(index)
      })
    })
  })
  
  // 获取用户的基本信息
  function getUserInfo() {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败！')
        //   layui.layer.msg是layui里面的一个弹出框函数 可以弹出几秒后 自动隐藏
        }
        // 调用 renderAvatar 渲染用户的头像
        renderAvatar(res.data)
      }
    })
  }
  
  // 渲染用户的头像
  function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
      // 3.1 渲染图片头像
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-avatar').hide()
    } else {
      // 3.2 渲染文本头像
      $('.layui-nav-img').hide()
      var first = name[0].toUpperCase()    //name的第一个字母大写作为文本头像
      $('.text-avatar').html(first).show()
    }
  }
  