
//  用户自定义 JS  //

// The Code



// 为了优化和提升页面性能，可以使用全局的 JS 路由功能，选择性的在不同页面运行所需的 JS 代码。
// https://docs.youhaosuda.com/development/s/5743d23a02282e2d0300001c

// $('.calendar-year-select').click(function(e){
// 	e.stopPropagation();
//             $(".dropdown-month").removeClass("open");
//             $(".dropdown-year").toggleClass("open");
//             //创建下拉数据
//             var yearText = opts.newDate.getFullYear();
//             var s = '';
//             for (var i = 0; i < 21; i++) {
//                 if (i == 10) {
//                     s += '<li class="year-item active">'
//                 }
//                 else {
//                     s += '<li class="year-item">'
//                 }
//                 s += '<span class="year-check">' + (yearText - 10 + i) + '</span>'
//                 s += '<span >年</span>'
//                 s += '</li>'
//             }
//             me.el.find(".dropdown-year").html(s);
// })



$(document).ready(function(){
	var oRouteCustom = {};

	oRouteCustom['all'] = function (path) {
		// tranlate start

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

		// tranlate end
		
		// mainNav start

		// if (location.pathname === '/') sessionStorage.removeItem("main-nav-active");

		// const mainNavItems = $('a.main-nav-item');
		// const mainNavItemActive = sessionStorage.getItem("main-nav-active");

		// if (mainNavItemActive) {
		// 	for (let i = 0; i < mainNavItems.length; i++) {
		// 		const element = mainNavItems[i];
		// 		const index = element.getAttribute("data-active");
		// 		if (index === mainNavItemActive) {
		// 			element.classList.add('active');
		// 		}
		// 	}
		// }

		// for (let i = 0; i < mainNavItems.length; i++) {
		// 	const element = mainNavItems[i];
		// 	mainNavItems[i].addEventListener('click', () => {
		// 		if (element.getAttribute('data-about-us') === 'about-us') {

		// 			sessionStorage.setItem("about-us-nav-active", 1);
		// 		} else {
		// 			sessionStorage.removeItem("about-us-nav-active");
		// 		}
		// 		const activIndex = mainNavItems[i].getAttribute('data-active');
		// 		sessionStorage.setItem('main-nav-active', activIndex);
		// 	})
		// }

		// mainNav end

		// about-us start

		// if (location.pathname === '/') sessionStorage.removeItem("about-us-nav-active");

		// const aboutUsNavItems = $('.about-us-nav .nav-item > a');
		// const aboutUsNavItemActive = sessionStorage.getItem("about-us-nav-active");

		// if (aboutUsNavItemActive) {
		// 	for (let i = 0; i < aboutUsNavItems.length; i++) {
		// 		const element = aboutUsNavItems[i];
		// 		const index = element.getAttribute("data-active");
		// 		if (index === aboutUsNavItemActive) {
		// 			element.classList.add("active");
		// 		}
		// 	}
		// }

		// for (let i = 0; i < aboutUsNavItems.length; i++) {
		// 	const element = aboutUsNavItems[i];
		// 	const activeIndex = element.getAttribute("data-active");
		// 	element.addEventListener("click", () => {
		// 		sessionStorage.setItem("about-us-nav-active", activeIndex);
		// 	})
		// }

		// about-us end
	};
	$yhsd.route.init(oRouteCustom);
  });