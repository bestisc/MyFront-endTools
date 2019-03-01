//	封装cookie的设置和获取函数

/**
 * [setCookie 浏览器端设置cookie]
 * @param {[String]} options.key:key                 [传入cookie的key值]
 * @param {[String]} options.value:value             [传入cookie的value值]
 * @param {[number]} options.failureTime:failureTime [传入cookie的失效时间,单位为分钟,可以不传]
 */
function setCookie({
	key:key,
	value:value,
	failureTime:failureTime
}){
	//使用window.encodeURIComponent()方法对value值进行编码，来转义分号、逗号和空白符
	var cookie = key + "=" + window.encodeURIComponent(value);	
	
	//设置cookie失效时间 单位为分钟
	if(typeof failureTime === "number"){
		cookie += "; max-age=" + (failureTime * 60 + 8 * 60 * 60);
	}

	//将cookie存储到浏览器
	document.cookie = cookie;
}

/**
 * [getCookie 获取浏览器存储的cookie]
 * @return {[Object]} [把cookie字符串解析为对象返回]
 */
function getCookie(){
	//初始化返回的cookie解析后的对象
	var cookieObject = {};

	//获取浏览器中存储的cookie
	var allCookie = document.cookie;

	//如果浏览器中cookie为空字符串，则返回一个空对象
	if(allCookie === ""){
		return cookieObject;
	}

	//分离cookie字符串，存储为键/值对字符数组
	var cookieArray = allCookie.split("; ");

	//遍历每个cookie
	for(var i = 0; i < cookieArray.length; i++){
		var cookie = cookieArray[i];
		var index = cookie.indexOf("=");		//或者“=”号首次出现的位置
		var key = cookie.substring(0, index);	//获取cookie的键名
		var value = cookie.substring(index+1);	//获取cookie的value值
		value = decodeURIComponent(value);		//对值进行解码
		cookieObject[key] = value;				//将键值对存储到对象中
	}

	//返回对象
	return 	cookieObject;
}

//	注意cookie 的 path 属性, domain 属性, secure 属性

