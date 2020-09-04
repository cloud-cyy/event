$(function(){
    var layer=layui.layer
    initArtCateList()
    function initArtCateList() {
    $.ajax({
        url:'/my/article/cates',
        type:'GET',
        success(res){
            console.log(res);
            var htmlStr=template('tpl-table',res)
            $('tbody').html(htmlStr)
            
        }
    })

    }
})