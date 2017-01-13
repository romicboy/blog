(function() {

	var $this;
	
    Array.prototype.unique = function() {
        this.sort();
        var re = [this[0]];
        for (var i = 1; i < this.length; i++) {
            if (this[i] !== re[re.length - 1]) {
                re.push(this[i]);
            }
        }
        return re;
    };

    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g,'');
    };
    
    // 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "H+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	};
    
    var Common = function() {
        
        this.getUrl = function(){
        	return window.location.href;
        };

		//桌面提醒
		this.notify = function (title, content) {
	        if(!title && !content){
	            title = "美秘通知";
	            content = "您看到此条信息桌面提醒设置成功";
	        }
	        var iconUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2lpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMzc3QjVCNjhEQzAxMUU1QkNEMkYyNzUxNkY5NzREMyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3OEJCNERBNkI1RTUxMUU1QThFNkQ4RDM3OEFDNkU1MyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3OEJCNERBNUI1RTUxMUU1QThFNkQ4RDM3OEFDNkU1MyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NmE3NjUyZGUtYzE0Ny04MDQxLTk1ZGItMDY0MDI3Nzc2MzBiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMzNzdCNUI2OERDMDExRTVCQ0QyRjI3NTE2Rjk3NEQzIi8+IDwvcmRmOkRlc2Ny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";
	        if (window.webkitNotifications) {
	            //chrome老版本
	            if (window.webkitNotifications.checkPermission() == 0) {
	                var notif = window.webkitNotifications.createNotification(iconUrl, title, content);
	                notif.display = function() {};
	                notif.onerror = function() {};
	                notif.onclose = function() {};
	                notif.onclick = function() {this.cancel();};
	                notif.replaceId = 'Meteoric';
	                notif.show();
	            } else {
	                window.webkitNotifications.requestPermission($jy.notify);
	            }
	        }
	        else if("Notification" in window){
	            // 判断是否有权限
	            if (Notification.permission === "granted") {
	                var notification = new Notification(title, {
                        icon: iconUrl,
                        body: content,
                        tag: 'meimi'
	                });
	            }
	            //如果没权限，则请求权限
	            else if (Notification.permission !== 'denied') {
	                Notification.requestPermission(function(permission) {
	                    // Whatever the user answers, we make sure we store the
	                    // information
	                    if (!('permission' in Notification)) {
	                        Notification.permission = permission;
	                    }
	                    //如果接受请求
	                    if (permission === "granted") {
	                        var notification = new Notification(title, {
	                            icon: iconUrl,
	                            body: content,
                        		tag: 'meimi'
	                        });
	                    }
	                });
	            }
	        }
	    };
	    
	    // 清楚数据
		this.clearData = function (callback) {
			chrome.browsingData.remove({}, {"appcache": true,"cache": true,"cookies": true,"downloads": true,"fileSystems": true,"formData": true,"history": true,
				"indexedDB": true,"localStorage": true,"serverBoundCertificates": true,"pluginData": true,"passwords": true,"webSQL": true},callback);
		};
		
		// 关闭窗口
		this.closeWindow = function (callback) {
			chrome.tabs.query({}, function(tabs){
				for ( var i = 0; i < tabs.length; i++) {
					if("微博用户采集工具" != tabs[i].title && (tabs[i].favIconUrl == "http://weibo.com/favicon.ico" || tabs[i].favIconUrl == "http://www.weibo.com/favicon.ico" || tabs[i].title.search("微博") != -1)){
						var tab_id = tabs[i].id;
						var tab_title = tabs[i].title;
						chrome.tabs.remove(tabs[i].id, function(){
							$loger.info('common', 'close_window tab.id:' + tab_id + ' tab.title: ' + tab_title);
						});
					}
				}
				callback();
			});
		};
		
		// 设置代理
		this.proxy = function (host, port) {
			return;
			var mode;
			var rules;
			if (undefined == host || undefined == port) {
				mode = 'direct';
				rules = null;
			} else {
				mode = 'fixed_servers';
				rules = {
			        proxyForHttp: {
			            scheme: "socks4",
			            host: host,
			            port: port
			        },
			        proxyForHttps: {
			             scheme: "socks4",
			             host: host,
			             port: port
			        },
			        bypassList: ["www.ip.cn"]
			   };
			}
			chrome.proxy.settings.set({value: { mode: mode,rules: rules}});
			chrome.proxy.settings.get({},function (config) {
				console.log(config);
			});
		};

		this.getConfig = function(key, fun){
			chrome.storage.local.get(key, function(value){
				fun(value);
			});
		};
		
		this.setConfig = function(key, value){
			chrome.storage.local.get(null, function(config){
				config[key] = value;
				chrome.storage.local.set(config);
			});
		};
		
        // 初始化
        this.init = function() {
            $this = this;
            return this;
        };
    };

    $common = new Common();
    $common.init();
})();
