(function() {

    var $this;

    var Options = function() {

        this.bindEvent = function() {
            $("input[type='submit']").click(function(){
                var amount = $("input[name='amount']").val() * 10000;
                var month = parseInt($("input[name='year']").val()) * 12;
                var rate = parseFloat($("input[name='rate']").val()) / 100;
                var type = parseInt($("input[name='type']:checked").val());
                if (type === 1){
                    $this.getResult(amount,month,rate);
                } else {
                    $this.getResult2(amount,month,rate);
                }
                return false;
            });
            // $("input[name='type']").click(function(){
            //
            // });
        };

        //1.等额本金
        this.getResult2 = function (amount, month, rate) {
            //还款总额
            var total = 0;
            // 首月还款
            var first = 0;

            $('#result2Detail .list-group').empty();

            for(j = 0; j < month; j++){
                //调用函数计算: 本金月还款额
                var huankuan = this.getMonthMoney2(rate, amount, month, j);
                if (first === 0) first = huankuan;
                total += huankuan;
                huankuan = this.round(huankuan);
                $('#result2Detail .list-group').append('<li class="list-group-item">'+ (j + 1) + ' 月, '+huankuan+' (元)</li>');
            }

            //支付利息款
            var interest = this.round(total - amount);
            console.log(interest);

            $("#result").hide();
            $("#result2").show();
            $("#result2Detail").show();
            $("#result2 [name='amount']").text(amount+"元");
            $("#result2 [name='month']").text(month+"月");
            $("#result2 [name='first']").text(this.round(first)+"元");
            $("#result2 [name='interest']").text(interest+"元");
            $("#result2 [name='total']").text(this.round(total)+"元");
        };

        /**
         * 等额本息
         * @param amount
         * @param month
         * @param rate
         */
        this.getResult = function (amount, month, rate) {
            // var total = 10000;
            // var month = 12;
            // var rate = 0.0435;

            //月均还款
            var month_money = this.getMonthMoney(rate,amount,month);
            var month_money1 = this.round(month_money);
            console.log(month_money);
            console.log(month_money1);

            //还款总额
            var total = month_money * month;
            console.log(total);

            //支付利息款
            var interest = this.round(total - amount);
            console.log(interest);

            $("#result2").hide();
            $("#result2Detail").hide();
            $("#result").show();
            $("#result [name='amount']").text(amount+"元");
            $("#result [name='month']").text(month+"月");
            $("#result [name='month_refund']").text(month_money1+"元");
            $("#result [name='interest']").text(interest+"元");
            $("#result [name='total']").text(this.round(total)+"元");
        };

        this.setPresent = function(present) {
            $("input[name='present']").val(present);
        };

        this.setFuture = function(future) {
            $("input[name='future']").val(future);
        };

        /**
         * 本息还款的月还款额
         * @param rate 年利率
         * @param amount 贷款总额
         * @param month 贷款总月份
         * @returns {number}
         */
        this.getMonthMoney = function (rate, amount, month){
            var rate_month = rate / 12;//月利率
            return amount * rate_month * Math.pow(1 + rate_month, month) / ( Math.pow(1 + rate_month, month) -1);
        };

        /**
         * 本金还款的月还款额
         * @param rate 年利率
         * @param amount 贷款总额
         * @param month 贷款总月份
         * @param cur_month 贷款当前月0～length-1
         * @returns {number}
         */
        this.getMonthMoney2 = function (rate, amount, month, cur_month){
            var rate_month = rate / 12;//月利率
            var benjin_money = amount / month;
            return (amount - benjin_money * cur_month) * rate_month + benjin_money;
        };

        /**
         * 去小数
         * @param number
         * @returns {number}
         */
        this.round = function (number) {
            return Math.round(number * 100) / 100
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