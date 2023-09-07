(function() {

	var $this;

	var Options = function() {

		this.bindEvent = function() {
			$this = this;

            $('input[name=color-code]').blur(function(){
                $('#color-result').css({backgroundColor:$(this).val()})
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