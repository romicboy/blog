(function() {

	var $this;

	var Options = function() {

		this.bindEvent = function() {
			$this = this;
			// var money = 10000;		// 每次投入金额
			// var price = 20;			// 当前价格
			// var length = 6;			// 循环次数
			// var unsteady = 0.1;		// 浮动比例
			// this.curve(money, price, length, unsteady);
			$("input[type='submit']").click(function(){
				var money = parseInt($("input[name='money']").val());
				var price = parseInt($("input[name='price']").val());
				var length = parseInt($("input[name='length']").val());
				var unsteady = parseInt($("input[name='unsteady']").val())/100;
				$this.log(money);
				$this.log(price);
				$this.log(length);
				$this.log(unsteady);
				$this.curve(money, price, length, unsteady);
				return false;
			});
		};

		/**
		 * money 	// 每次投入金额
		 * price 	// 当前价格
		 * length 	// 循环次数
		 * unsteady // 浮动比例
		 */
		this.curve = function(money, price, length, unsteady){
			$('.J-result').removeClass('hide');
			$('.J-result-item').remove();
			var number = 0;			// 每次能买的股票数
			var conut = 0;			// 拥有股票数
			var market = 0;			// 当前市值
			var invest = 0;			// 投入
			var earnings = 0; 		// 收益
			var html = null;
			number = Math.round(money / price);
			conut = number;
			market = conut * price;
			invest = money;
			earnings = 1;
			this.log('unsteady:1.0, price:'+price+', number:'+number+', conut:'+conut+', market:'+market+', invest:'+invest+', earnings:'+earnings);
			html = this.getHtml(unsteady*100+'%', price, number, conut, market, invest, parseFloat(earnings*100).toFixed(2)+'%');
			this.appendHtml(html);
			for (var i = 0; i < length-1; i++) {
				if (i > ((length - 2) / 2)) {
					price = Math.round(price * (1+unsteady));
				} else {
					price = Math.round(price * (1-unsteady));
				}
				number = Math.round(money / price);
				conut += number;
				market = conut*price;
				invest = money*(i+2);
				earnings = parseFloat(market / invest);
				this.log('unsteady:'+unsteady+', price:'+price+', number:'+number+', conut:'+conut+', market:'+market+', invest:'+invest+', earnings:'+earnings);
				html = this.getHtml(unsteady*100+'%', price, number, conut, market, invest, parseFloat(earnings*100).toFixed(2)+'%');
				this.appendHtml(html);
			}
		};

		this.appendHtml = function(html){
			$('table').append(html);
		};

		this.getHtml = function(unsteady, price, number, conut, market, invest, earnings){
			var html = '<tr class="J-result-item"><td>'+unsteady+'</td><td>'+price+'</td><td>'+number+'</td><td>'+conut+'</td><td>'+market+'</td><td>'+invest+'</td><td>'+earnings+'</td></tr>';
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
