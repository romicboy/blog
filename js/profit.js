(function() {

	Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "¥";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var number = this,
            negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    };


	var $this;

	var Options = function() {

		this.bindEvent = function() {
			$this = this;
			// var money = 10000;		// 每次投入金额
			// var length = 12;		// 循环次数
			// var unsteady = 0.1;		// 浮动比例
			// this.curve(money, length, unsteady);
			$("input[type='submit']").click(function(){
				var money = parseInt($("input[name='money']").val());
				var length = parseInt($("input[name='length']").val());
				var unsteady = parseInt($("input[name='unsteady']").val())/100;
				if (money && length && unsteady) {
					$this.curve(money, length, unsteady);
				};
				return false;
			});
		};

		/**
		 * money 	// 每次投入金额
		 * price 	// 当前价格
		 * length 	// 循环次数
		 * unsteady // 浮动比例
		 */
		this.curve = function(money, length, unsteady){
			$('.J-result-item').remove();
			var interest = 0			// 上月结息
			var profit = unsteady / 12; //月利率
			var balance = 0;			// 余额
			var amount = 0;				// 总计
			var invest = 0;				// 投入
			var html = null;
			for (var i = 0; i < length; i++) {
				invest += money;
				interest = balance * profit;
				amount = balance + money + interest;
				this.log('索引:'+(i+1)+', 余额:'+balance+', 存入:'+money+', 上月结息:'+ interest+ ', 投入:'+invest+ ', 总计:'+amount);
				html = this.getHtml((i+1),parseFloat(balance).toFixed(2), money, parseFloat(interest).toFixed(2), invest, parseFloat(amount).toFixed(2));
				this.appendHtml(html);
				balance += money + interest;
			}
			var earnings = ((amount-invest)/invest)*100;
			this.setFuture("( "+amount.formatMoney(2)+" - "+invest.formatMoney(2)+" ) / "+invest.formatMoney(2)+" \n= "+parseFloat(earnings).toFixed(2)+'%');
			var show_detail = parseInt($("input[name='show_detail']:checked").val());
			if (show_detail == 2) this.showDetail();
			else this.hideDetail();
		};

		this.showDetail = function() {
			$('.J-result').removeClass('hide');
		};

		this.hideDetail = function() {
			$('.J-result').addClass('hide');
		};

		this.setFuture = function(future){
			$("[name='future']").val(future);
		};

		this.appendHtml = function(html){
			$('table').append(html);
		};

		this.getHtml = function(index, balance, money, interest, invest, amount){
			var html = '<tr class="J-result-item"><td>'+index+'</td><td>'+balance+'</td><td>'+money+'</td><td>'+interest+'</td><td>'+invest+'</td><td>'+amount+'</td></tr>';
			return html;
		};

		this.init = function() {
			$this = this;
			this.bindEvent();
			return this;
		};

		this.log = function(info) {
			console.log(info);
		};
	};

	$(function() {
		var options = new Options();
		options.init();
	});

})();
