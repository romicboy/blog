(function () {

    var $this;

    var Options = function () {

        this.bindEvent = function () {

            $("#submit").click(function () {
                var jsonString = $("textarea[name='jsonString']").val();
                var jdata = JSON.stringify(JSON.parse(jsonString), null, 4);
                $("#result").html(jdata);
                return false;
            });

            $("#hide").click(function () {
                var status = $(this).data('status');
                if (status == 1) {
                    $('#inputBox').show();
                    $('#resultBox').removeClass('col-sm-12').addClass('col-sm-6');
                    $(this).text('隐藏左侧');
                    $(this).data('status', 0);
                } else {
                    $('#inputBox').hide();
                    $('#resultBox').removeClass('col-sm-6').addClass('col-sm-12');
                    $(this).text('显示左侧');
                    $(this).data('status', 1);
                }
                return false;
            });

            var json = {
                "姓名": "张三",
                "籍贯": {
                    "省": "泰州",
                },
                "性别": "男",
                "学校1": ["北京大学"],
                "学校": [
                    {
                        "名称": "北京大学"
                    }
                ]
            }

            this.addRootNode($('#jsonNav'), 'JSON', 'JSON', json);

            this.folderClick();
        };

        this.folderClick = function(){
            $('li.folder .row').click(function(){
                $(this).parent().toggleClass('open');
            });
        }

        /**
         * 获取一个节点对象
         */
        this.getNode = function(nodePath){
            return $("[nodepath='"+nodePath+"']");
        }

        /**
         * 获取一个节点类型
         */
        this.getNodeType = function(value){
            var type = null;
            if (this.isObject(value)) {
                type = 'object';
                // for (var key in value) {
                //     console.log('key', key);
                // }
            }

            if (this.isArray(value)) {
                type = 'array';
            }

            if (this.isString(value)) {
                type = 'string';
            }

            return type;
        }

        /**
         * 创建一个节点
         */
        this.addRootNode = function(node, nodePath, key, value){
            var type = this.getNodeType(value);
            var str = '<div nodepath="{0}" class="elmBlock open folder {1} root"></div>';

            str = this.StringFormat(str, nodePath, type);
            node.append(str);
            var currentNode = this.getNode(nodePath);
            var rowHtml = this.getRowHtml(type, key, value);
            currentNode.append(rowHtml);
            var elmListHtml = this.getElmListHtml();
            currentNode.append(elmListHtml);
            console.log(currentNode[0].outerHTML);
            var elmListNode = currentNode.find('.elmList');
            console.log(elmListNode[0].outerHTML);

            this.addRowList(elmListNode, nodePath, value);
        }

        this.addRowList = function (node, parentNodePath, value) {
            var type = this.getNodeType(value);
            if (type == 'object') {
                for (var key in value) {
                    var val = value[key];
                    var nodePath = parentNodePath+'['+key+']';
                    this.addRow(node, nodePath, key, val);
                }
            }

            if (type == 'array') {
                for (var index = 0; index < value.length; index++) {
                    var element = value[index];
                    var nodePath = parentNodePath+'['+index+']';
                    this.addRow(node, nodePath, index, element);
                }
            }
        }

        this.addRow = function (node, nodePath, key, value){
            var type = this.getNodeType(value);

            var str = '<li nodepath="{0}" class="elmBlock"></li>';
            str = this.StringFormat(str, nodePath);
            node.append(str);

            var currentNode = this.getNode(nodePath);

            currentNode.addClass(type);
            if(type == 'object' || type == 'array'){
                currentNode.addClass('folder');
            } else {
                currentNode.addClass('node');
            }

            // open 在后面样式才生效
            currentNode.addClass('open');

            var rowHtml = this.getRowHtml(type, key, value);
            currentNode.append(rowHtml);
            var elmListHtml = this.getElmListHtml();
            currentNode.append(elmListHtml);
            var elmListNode = currentNode.find('.elmList');
            if(type == 'object' || type == 'array'){
                this.addRowList(elmListNode, nodePath, value);
            }
        }

        this.getRowHtml = function (type, key, value) {
            var str = '<div class="row"><div class="elmBox"><span class="elmSpan"><span class="elm {0}-key"title="">{1}</span><span class="value ">{2}</span></span></div></div>';
            if(type != 'string'){
                value = '';
            }
            return this.StringFormat(str, type, key, value);
        }

        this.getElmListHtml = function(){
            return '<ul class="elmList"></li>';
        }


        this.init = function () {
            $this = this;
            this.bindEvent();
            return this;
        };

        this.StringFormat = function () {
            if (arguments.length == 0)
                return null;

            var str = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                str = str.replace(re, arguments[i]);
            }
            return str;
        }

        this.isArray = function (o) {
            return Object.prototype.toString.call(o) == '[object Array]';
        }

        this.isObject = function (str) {
            return Object.prototype.toString.call(str) == "[object Object]"
        }

        this.isString = function (str) {
            return Object.prototype.toString.call(str) == "[object String]"
        }
    };

    $(function () {
        var options = new Options();
        options.init();
    });

})();