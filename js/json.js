(function() {

    var $this;

    var Options = function() {

        this.bindEvent = function() {
            $("#submit").click(function(){
                var jsonString = $("textarea[name='jsonString']").val();
                var jdata = JSON.stringify(JSON.parse(jsonString), null, 4);
                $("#result").html(jdata);
                return false;
            });
            $("#hide").click(function(){
                var status = $(this).data('status');
                if(status == 1){
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
        };

        this.init = function() {
            $this = this;
            this.bindEvent();
            return this;
        };
    };

    $(function() {
        var options = new Options();
        options.init();
    });

})();