(function() {

	var $this;

	var ssoHost = 'http://www.edu-pay.com.cn/index.php/Shop/littlecare/login?ConfigId=338&url=';

	var Options = function() {

		this.bindEvent = function() {
			$this = this;
			$("input[name='encode']").click(function(){
				var string = $("[name='string']").val();
				$("[name='result']").val(ssoHost+encodeURIComponent(string));
			});
			$("input[name='decode']").click(function(){
				var string = $("[name='result']").val();
				$("[name='string']").val(decodeURIComponent(string.split(ssoHost)[1]));
			});
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
