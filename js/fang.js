(function() {

    var $this;

    var Options = function() {

        this.bindEvent = function() {
            $("input[type='submit']").click(function(){
                var amount = $("input[name='amount']").val() * 10000;
                var month = parseInt($("input[name='year']").val()) * 12;
                var rate = parseFloat($("input[name='rate']").val()) / 100;
                $this.getResult(amount,month,rate);
                return false;
            });
            // $("input[name='type']").click(function(){
            //
            // });
        };

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
            var all_total = month_money * month;
            var all_total1 = this.round(all_total);
            console.log(all_total);
            console.log(all_total1);

            //支付利息款
            var interest = this.round(all_total - amount);
            console.log(interest);

            $("#result").show();
            $("#result [name='amount']").text(amount+"元");
            $("#result [name='month']").text(month+"月");
            $("#result [name='month_refund']").text(month_money1+"元");
            $("#result [name='interest']").text(interest+"元");
            $("#result [name='total']").text(all_total1+"元");
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
            var lilv_month = rate / 12;//月利率
            return amount * lilv_month * Math.pow(1 + lilv_month, month) / ( Math.pow(1 + lilv_month, month) -1);
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