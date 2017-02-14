(function() {
	
	var $this;
	
	var Options = function() {
		
		this.bindEvent = function() {
			$("input[type='submit']").click(function(){
				var type = parseInt($("input[name='type']:checked").val());
				var present = $("input[name='present']").val();
				var yield = $("input[name='yield']").val()/100;
				var year = $("input[name='year']").val();
				var future = $("input[name='future']").val();
				if(type == 1){
					$this.setFuture(present*Math.pow(1+yield,year));
				} else if(type == 2){
					$this.setPresent(future/Math.pow(1+yield,year));
				}
				return false;
			});

			$("input[name='type']").click(function(){
				var type = parseInt($("input[name='type']:checked").val());
				$("input[name='future']").removeAttr("disabled");
				$("input[name='present']").removeAttr("disabled");
				$("input[name='present']").val('');
				$("input[name='future']").val('');
				if(type == 1){
					$("input[name='future']").attr('disabled', 'disabled');
				} else if(type == 2){
					$("input[name='present']").attr('disabled', 'disabled');
				}
			});
		};

		this.setPresent = function(present) {
			$("input[name='present']").val(present);
		};

		this.setFuture = function(future) {
			$("input[name='future']").val(future);
		};
		
		this.init = function() {
			$this = this;
			this.bindEvent();
			return this;
		};
	};
	
	$(function() {
		var options = new Options();
		options.init();
	});
	
})();