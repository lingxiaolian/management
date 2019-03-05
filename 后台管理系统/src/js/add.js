$(function () {

    layui.use('element', function () {
        var element = layui.element;

    });

    layui.use(['form', 'layedit', 'laydate'], function () {
        var form = layui.form
            , layer = layui.layer
            , layedit = layui.layedit
            , laydate = layui.laydate;



        //监听指定开关
        form.on('switch(switchTest)', function (data) {
            layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
                offset: '6px'
            });
            layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
        });


        //监听提交
        form.on('submit(demo1)', function (data) {
            var xia = '';
            if (data.field.xian == 'on') {
                // console.log(data.field.xian);
                xia = "上架";
            }
            else {
                xia = "下架";
            }
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            var nowDate = year + "-" + month + "-" + day;
            // console.log(nowDate);
            $.ajax({
                type: "get",
                url: "/add",
                data: {
                    pinpai: data.field.pinpai,
                    price1: data.field.price1,
                    price2: data.field.price2,
                    img: data.field.img,
                    ku: data.field.ku,
                    xian: xia,
                    hotsale: data.field.hotsale,
                    Day: nowDate,
                    interest:data.field.interest
                },
                dataType: "dataType",
                success: function (res) {
                }
            });
            layer.open({
                content: '添加成功',
                yes: function (index, layero) {
                    //do something
                    layer.close(index); //如果设定了yes回调，需进行手工关闭
                    location.href = 'list.html';
                }
            });
            return false;
        });

        //表单初始赋值
        form.val('example', {

            "interest": 1
            , "like[write]": true //复选框选中状态
            , "close": true //开关状态
        })


    });

})