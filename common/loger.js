(function() {

	var $this;
	
	var Loger = function() {

		this.getTime = function () {
			return new Date().Format("yyyy-MM-dd HH:mm:ss");
		};
	
		this.info = function (domain, info) {
			console.log(this.getTime() + ' ' + domain + ' ' + info);
		};
		
		this.error = function (domain, info) {
			console.error(this.getTime() + ' ' + domain + ' ' + info);
		};

		this.print = function (domain, object) {
			console.log(this.getTime() + ' ' + domain +' print >>>');
			console.log(object);
			console.log('<<< ====== print ====== !');
		};
		
		this.init = function () {
			$this = this;
			return this;
		};
	};

    $loger = new Loger().init();
    
})();