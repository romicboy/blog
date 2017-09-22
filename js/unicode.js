(function() {

	var $this;

	var Options = function() {

		this.bindEvent = function() {
			$this = this;
			$("input[name='encode']").click(function(){
				var string = $("[name='string']").val();
				$("[name='result']").val($this.ToGB2312(string));
			});
			$("input[name='decode']").click(function(){
				var string = $("[name='result']").val();
				$("[name='string']").val($this.ToUnicode(string));
			});
		};

		this.ToUnicode = function (str) {
	  		return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
	  	};

		this.ToGB2312 = function (str) {
	    	return unescape(str.replace(/\\u/gi, '%u'));
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
