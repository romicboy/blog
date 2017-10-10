(function() {

	var $this;

	var Options = function() {

		this.bindEvent = function() {
			$this = this;

			$("input[type='submit']").click(function(){
				var date1 = $("input[name='date1']").val();
				var date2 = $("input[name='date2']").val();
				var days = $this.DateDiff(date1, date2);
				$("input[name='result']").val(days);
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

		//计算天数差的函数，通用
		this.DateDiff = function(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
			var  aDate,  oDate1,  oDate2,  iDays
			aDate  	=  sDate1.split("-")
			oDate1  =  new Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式
			aDate  	=  sDate2.split("-")
			oDate2  =  new Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
			iDays  	=  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
			return  iDays
		}
	};

	$(function() {
		var options = new Options();
		options.init();
	});

})();
