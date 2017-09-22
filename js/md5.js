(function() {

	var $this;

	var Options = function() {

		this.bindEvent = function() {
			$this = this;

			$(".dropdown-menu li").click(function() {
				var value = $(this).find('a').text();
				$(".dropdown .value").text(value);
			});

			$("input[name='submit']").click(function(){
				var type = $(".dropdown .value").text().trim();
				var str = $("input[name='str']").val();
				var result = $("[name='result']");
				if (type == 'md5') 		result.val(md5(str));
				if (type == 'sha1') 	result.val(sha1(str));
				if (type == 'sha256') 	result.val(sha256(str));
				if (type == 'sha512') 	result.val(sha512(str));
				return false;
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
