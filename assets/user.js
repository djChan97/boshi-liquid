
//  用户自定义 JS  //

// The Code



// 为了优化和提升页面性能，可以使用全局的 JS 路由功能，选择性的在不同页面运行所需的 JS 代码。
// https://docs.youhaosuda.com/development/s/5743d23a02282e2d0300001c

$(document).ready(function(){
	var oRouteCustom = {};
	
	oRouteCustom['all'] = function (path) {
		// tranlate
		if (!Jssdk.util.getCookie("front_custom_variable")) {
			Jssdk.util.setCookie("front_custom_variable", 'zh-cn', false);
			location.reload();
		}
		const langItem = $("div.lang")[0];
		window.setLang = function (lang) {
			if (Jssdk.util.getCookie("front_custom_variable") === lang) return;
			Jssdk.util.setCookie("front_custom_variable", lang, false);
			location.reload();
		}
		langItem.addEventListener('click', () => {
			if (Jssdk.util.getCookie("front_custom_variable") === 'zh-cn') {
				Jssdk.util.setCookie("front_custom_variable", 'en', false);
			} else {
				Jssdk.util.setCookie("front_custom_variable", 'zh-cn', false);
			}
			location.reload();
		})
	};
	$yhsd.route.init(oRouteCustom);
  });