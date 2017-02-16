(function() {

	var $this;

	var Options = function() {

		this.bindEvent = function() {
			$this = this;
			// var money = 10000;		// 每次投入金额
			// var price = 11;			// 当前价格
			// var length = 10;			// 循环次数
			// var unsteady = 0.04;		// 浮动比例
			// this.curve(money, price, length, unsteady);
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
			var count = 0;			//总金额
			var invest = 0;			// 投入
			var earnings = 0; 		// 收益
			var profit = unsteady / 12; //月利率
			var earnings_percent = 0;
			var html = null;
			for (var i = 0; i < length; i++) {
				count += money;
				earnings = count * profit * (i+1);
				count += count * profit * (i+1);
				invest = invest + money;	
				earnings_percent = parseFloat((parseFloat(count).toFixed(2) - invest) / invest).toFixed(4);
				this.log('unsteady:'+profit+', count:'+count+', invest:'+invest+', earnings:'+earnings+', earnings_percent'+earnings_percent);
				html = this.getHtml(unsteady*100+'%', parseFloat(count).toFixed(2), invest, parseFloat(earnings).toFixed(2), earnings_percent);
				this.appendHtml(html);

			}
		};

		this.appendHtml = function(html){
			$('table').append(html);
		};

		this.getHtml = function(unsteady, count, invest, earnings, earnings_percent){
			var html = '<tr class="J-result-item"><td>'+unsteady+'</td><td>'+count+'</td><td>'+invest+'</td><td>'+earnings+'</td><td>'+earnings_percent+'</td></tr>';
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
