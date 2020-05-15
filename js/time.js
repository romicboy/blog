(function() {

	var $this;

	var Options = function() {

		this.bindEvent = function() {
			$this = this;
			$("input[name='encode']").click(function(){
				var str = $("input[name='string']").val();
				$("input[name='result']").val($this.formatDateTime(parseInt(str) * 1000));
			});
			$("input[name='decode']").click(function(){
				var string = $("[name='result']").val();
				$("[name='string']").val(new Date(string).getTime() / 1000);
			});
		};

		this.init = function() {
			$this = this;
			$("[name='string']").val(parseInt(new Date().getTime() / 1000));
			$("input[name='result']").val($this.formatDateTime(new Date().getTime()));
			this.bindEvent();
			return this;
		};

		this.log = function(info) {
			console.log(info);
		}

		this.formatDateTime = function(timeStr) {
			var date = new Date(timeStr);
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? ('0' + m) : m;
			var d = date.getDate();
			d = d < 10 ? ('0' + d) : d;
			var h = date.getHours();
			h = h < 10 ? ('0' + h) : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? ('0' + minute) : minute;
			second = second < 10 ? ('0' + second) : second;
			return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
		}
	};

	$(function() {
		var options = new Options();
		options.init();
	});

})();
