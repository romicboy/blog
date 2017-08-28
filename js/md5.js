(function() {

	var $this;

	var Options = function() {

		this.bindEvent = function() {
			$this = this;
			$("input[type='submit']").click(function(){
				var str = parseInt($("input[name='str']").val());
				$("input[name='result']").val(md5(str));
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
