(function() {

    var $this;

    var Options = function() {

        this.bindEvent = function() {
            $("input[type='submit']").click(function(){
                var inject = parseInt($("input[name='inject']").val());
                var income = parseInt($("input[name='income']").val());
                var number = parseInt($("input[name='number']").val());
                $this.getResult(inject, income, number);
                return false;
            });
        };

        /**
         * 获取结果
         * @param inject
         * @param income
         * @param number
         */
        this.getResult = function (inject, income, number) {
          var finance = new Finance();

          var cashFlow = [];
          cashFlow.push(inject * -1);
          for (var i = 0; i < number; i++) {
            cashFlow.push(income);
          }
          var data = {
            cashFlow : cashFlow
          };
          var res = finance.IRR(data);
          $this.setFuture(res);
        };

        this.setFuture = function(future) {
            $("input[name='future']").val(future);
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
