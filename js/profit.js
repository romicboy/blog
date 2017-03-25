(function() {

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
			$('.J-result').removeClass('hide');
			$('.J-result-item').remove();
			var interest = 0			// 上月结息
			var profit = unsteady / 12; //月利率
			var balance = 0;			// 余额
			var amount = 0;				// 总计
			var html = null;
			for (var i = 0; i < length; i++) {
				interest = balance * profit;
				amount = balance + money + interest;
				this.log('索引:'+(i+1)+', 余额:'+balance+', 存入:'+money+', 上月结息:'+ interest+ ', 总计:'+amount);
				html = this.getHtml((i+1),parseFloat(balance).toFixed(2), money, parseFloat(interest).toFixed(2), parseFloat(amount).toFixed(2));
				this.appendHtml(html);
				balance += money + interest;
			}
		};

		this.appendHtml = function(html){
			$('table').append(html);
		};

		this.getHtml = function(index, balance, money, interest, amount){
			var html = '<tr class="J-result-item"><td>'+index+'</td><td>'+balance+'</td><td>'+money+'</td><td>'+interest+'</td><td>'+amount+'</td></tr>';
			return html;
		};

		this.init = function() {
			$this = this;
			this.bindEvent();
			return this;
		};

		this.log = function(info) {
			console.log(info);
		}
	};

	$(function() {
		var options = new Options();
		options.init();
	});

})();
