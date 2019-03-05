$(function () {

    layui.use('element', function () {
        var element = layui.element;
    });

    var kum = decodeURI(location.search); //接收字符串
    var kum1 = kum.substring(1); //去掉？、oid和等号的字符，隐式转换
    // console.log(kum1);

    function shows() {
        $.ajax({
            type: "get",
            url: "/redact",
            data: {
                id: kum1
            },
            success: function (res) {
                var html = ` <div class="layui-form-item">
                <label class="layui-form-label">商品名称</label>
                <div class="layui-input-block">
                    <input type="text" name="pinpai" lay-verify="title" autocomplete="off" placeholder="请输入标题" class="layui-input" value="${res[0].pinpai}">
                </div>
                    </div>

                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">商品价格</label>
                            <div class="layui-input-inline">
                                <input type="text" name="price1" lay-verify="required|number" autocomplete="off" class="layui-input" value="${res[0].price1}">
                            </div>
                        </div>
                        <div class="layui-inline">
                            <label class="layui-form-label">销售价格</label>
                            <div class="layui-input-inline">
                                <input type="text" name="price2" lay-verify="required|text" autocomplete="off" class="layui-input" value="${res[0].price2}">
                            </div>
                        </div>
                        <div class="layui-inline">
                            <label class="layui-form-label">库存</label>
                            <div class="layui-input-inline">
                                <input type="text" name="ku" lay-verify="required|text" autocomplete="off" class="layui-input" value="${res[0].ku}">
                            </div>
                        </div>
                        <div class="layui-inline" style="margin-top: 10px">
                        <label class="layui-form-label">图片选择</label>
                            <input type="file" name="img" class=" layui-btn form-control-file form-control" id="goods">
                            <!-- multiple -->
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">商品描述</label>
                        <div class="layui-input-block">
                            <textarea placeholder="请输入内容" name="hotsale" class="layui-textarea" >${res[0].hotsale}</textarea>
                        </div>
                    </div>`;

                $('.shang').before(html);
            }
        });
    }
    shows();


    layui.use(['form', 'layedit', 'laydate'], function () {
        var form = layui.form
            , layer = layui.layer
            , layedit = layui.layedit
            , laydate = layui.laydate;

        // form.render(checkbox); //更新全部

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
            $.ajax({
                type: "get",
                url: "/redact",
                data: {
                    id: kum1,
                    pinpai: data.field.pinpai,
                    price1: data.field.price1,
                    price2: data.field.price2,
                    img: data.field.img,
                    ku: data.field.ku,
                    xian: xia,
                    hotsale: data.field.hotsale,
                    Day: nowDate,
                    interest: data.field.interest
                },
                success: function (res) {
                    layer.open({
                        content: '修改成功',
                        yes: function (index, layero) {
                            //do something
                            layer.close(index); //如果设定了yes回调，需进行手工关闭
                            location.href = 'list.html';
                        }
                    });
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