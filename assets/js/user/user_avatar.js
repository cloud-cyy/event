// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
var layer = layui.layer
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域 
    preview: '.img-preview'
}
// 1.3 创建裁剪区域
$image.cropper(options)
$("#btnChooseimage").on('click', function () {
    $("#file").click()
})
$("#file").on('change', function (e) {
    var filelist = e.target.files
    if (filelist.length === 0) {
        return layer.msg('请选择图片！')
    }
    var file = e.target.files[0]
    var imgURL = URL.createObjectURL(file)
    $image
        .cropper('destroy') // 销毁旧的裁剪区域 
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})
$("#btnUpload").on('click',function(){
    var dataURL = $image .cropper('getCroppedCanvas', { width: 100, height: 100 }).toDataURL('image/png')
    $.ajax({
        url:'/my/update/avatar',
        type:'POST',
        data:{
            avatar:dataURL
        },
        success(res){
            if(res.status!==0){
                return layer.msg("上传图片失败！")
            }
            layer.msg("上传图片成功！")
            window.parent.getUserInfo()
        }
})


   
})