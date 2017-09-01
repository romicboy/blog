(function() {

	var $this;

	var Options = function() {

		this.bindEvent = function() {
			$this = this;
			$("input[name='encode']").click(function(){
				var string = $("[name='string']").val();
				$("[name='result']").val(window.btoa(string));
			});
			$("input[name='decode']").click(function(){
				var string = $("[name='result']").val();
				$("[name='string']").val(window.atob(string));
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
