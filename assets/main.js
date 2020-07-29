(function() {
  var cartFix;

  cartFix = function() {
    var _elem, _elemP;
    _elem = $('#yhsd_topCart_quantityTitle');
    _elemP = $('#nav-cart-a');
    return Events.listen(Event.cart.getDone, function(event){
      if (_elem.html() === '0') {
        return _elemP.removeClass('total_active');
      } else {
        return _elemP.addClass('total_active');
      }
    });
  };
}).call(this);

window.bIsMobile = false;

//首页加入购物车JSSDK
  var indexAddCart = function () {   
  yhsd.ready(function(jssdk){
      var addBtns = $('.pro_detail-addBtn-addCart'); //获取页面中的所有的加入按钮
      addBtns.click(function(){ //当某个按钮点击时
          var variantsId = $(this).siblings('.pro-variantid').val(); //找到需要传的ID
          var theStockQuantity = $(this).siblings('.pro-stock').val(); //获取库存量
          var item = { //建立需要传的参数对象
              variant_id : variantsId,
              quantity : 1,
              is_check: true
          };
          if(theStockQuantity > 0){//如果有库存
            jssdk.cart.add(item, function(data){ //data是服务器返回的东西
                var carProNumber = $('#yhsd_topCart_quantityTitle').html();
                    carProNumber++;
                    $('#yhsd_topCart_quantityTitle').html(carProNumber);
                    $('.wrapper-addcartusuccess').addClass('wrapper-addcartusuccess-active');
                    $(".proList-li").mouseleave(function(){
                        $('.wrapper-addcartusuccess').removeClass('wrapper-addcartusuccess-active');
                    });
                    if($(document).width()<=768){
                        setTimeout(function(){
                        $('.wrapper-addcartusuccess').removeClass('wrapper-addcartusuccess-active');
                    },1500)
                    };                        
            });
          } else{//如果没库存
              $('.wrapper-stockwarn').addClass('wrapper-stockwarn-active');
              $(".proList-li").mouseleave(function(){
                  $('.wrapper-stockwarn').removeClass('wrapper-stockwarn-active');
              });
              if($(document).width()<=768){ 
                  setTimeout(function(){
                      $('.wrapper-stockwarn').removeClass('wrapper-stockwarn-active');
                  },1500)
              } 
          }                
      })
  });
};

$(document).ready(function(){
  var oRouteCustom = {};
  oRouteCustom['index'] = oRouteCustom['page'] = oRouteCustom['types'] = oRouteCustom['vendors'] = oRouteCustom['search'] = oRouteCustom['discounts'] = oRouteCustom['productAll']  = function(path){
     indexAddCart();
  };  
  $yhsd.route.init(oRouteCustom);
});

// 顶部导航显示
 (function(){
    // 滚动监听
    var _elemFather = $(document);    // 滚动条所在元素
    var elem  = _elemFather[0]
    var _eTop = $('#wrapper_header');   // Top 元素
    var _bodyOrHtml = $('body');
    var _eTopLogo =  $('.wrapper-logo');
    var _eTopLogoLink = $('.wrapper-logo .logo .logo-link');
    var _eTopSlide =  $('.wrapper-slide');
    var _eTopBlog =  $('.wrapper-blog');
    var _eTopSearch = $('.header-search');
    // 兼容性
    if(navigator.userAgent.indexOf('Trident') > -1 || navigator.userAgent.indexOf('Firefox') > -1) {
      _elemFather = $(window)
      elem  = _elemFather[0]
      _bodyOrHtml = $('html')
    }
    // 显示处理
    var eventFn = function(e) {
    if(_elemFather.width() >768){ 
      if (_elemFather.scrollTop() >= 1) { 
         _eTop.css({
            'padding' : '0'
         });
         _eTopLogo.css({
            'height' : '68px',
            'top' : '-1px'
         }); 
         _eTopSearch.css({
            'padding' : '0',
            'top' : '0px'
         });          

      } else {
        _eTop.css({
            'padding' : '17px 0 17px'
         });
        _eTopLogo.css({
             'height' : '82px',
              'top' : '-7px'
         });
        _eTopSearch.css({
            'padding' : '17px 0',
            'top' : '-17px'
         });

      }
    }
      if(_elemFather.width() <=768){
       _eTop.css({
            'padding' : '0'
        }); 
      }
    };
    // 绑定滚动事件
    _elemFather.scroll(eventFn);
       $('.side-nav-link-has_sub span.icon_down').click(function(e) {
         console.log(1)
        var _item, _itemP;
        _item = $(this);
        _itemP = $(this).parent();
        linkID = _item.data('linkid');


        /* 事件父元素 */
         console.log(e.target)
         console.log($(this))
        if (_itemP.hasClass('active')) {
          _itemP.removeClass('active');
          _itemP.addClass('noactive');
          $('.noactive + li > .side-nav-link-sub_list').slideUp();
        } else {
          _itemP.addClass('active');
          _itemP.removeClass('noactive');
         $('.active + li > .side-nav-link-sub_list').slideDown();
        }
      });

  })();

// // 下拉子菜单（含三级）
var Multimenu = {
  mainLink : $('#top-nav-link>li'),
  subLink : $('.nav-sublink'),
  init : function(){
    var self = this;
    self.mainLink.on('mouseenter', function(e){
      $(e.currentTarget).addClass('active');
    });
    self.mainLink.on('mouseleave', function(e){
      $(e.currentTarget).removeClass('active');
    });
  }
};

// 顶部搜索
var TopSearch = {
  ico : $('.yhsd-header-search'),
  ipt : $('.yhsd-header-search-ipt'),
  init : function(){
    var self = this;
    var oIpt = self.ipt.find('input');
    //
    var sWidth = "200px";
    //
    if(bIsMobile){
      sWidth = '30%';
    }
    self.ico.on('click', function(){
    	self.ico.css("color","black");
      oIpt.focus();
      self.ipt.animate({
        'opacity' : 1,
        'width' : sWidth
      }, 200);
    });
    //
    oIpt.on('blur', function(){
      self.ipt.animate({
        'opacity' : 0,
        'width' : '0px'
      }, 200);
      self.ico.css("color","white");
    });
  }
};
// 移动导航
var Mobilenav = {
  navEl : $('#nav_mobile'),
  menuEl : $('#mobile_menu'),
  bgEl : $('#mobile_bg'),
  init : function(){
    var self = this;
    var bInMenu = false;
    var bStartMove = false;
    //
    if($('html')[0].className.indexOf('ie') > -1){
        return false;
    }
    //
    $(window).on('resize', function(){
      self.menuEl.css({'left' : '-100%'});
      $('.page').css({'height' : 'auto', 'overflow' : 'auto'});
    });
    //
    var fMenuOff= function(){
        bInMenu = false;
      self.bgEl.off('click', fMenuOff);
        self.menuEl.animate({
          'left' : '-100%'
        }, function(){
          $('.page').css({'height' : 'auto', 'overflow' : 'auto'});
        });
    }
    //
    self.navEl.on('click', function(){
      //
      self.menuEl.show();
      //
      self.menuEl.animate({
        'left' : '0'
      }, function(){
        var sHeight = $(window).height() + 'px';
        $('.page').css({'height' : sHeight, 'overflow' : 'hidden'});
        bInMenu = true;
      self.bgEl.on('click', fMenuOff);
      });
    });

    var touchSatrtFunc = function(evt){
      if(!bInMenu){
        return;
      }
      var touch = evt.touches[0]; //获取第一个触点
      var x = Number(touch.pageX); //页面触点X坐标
      self.startX = x;
      bStartMove = true;
    };


    var touchMoveFunc = function(evt){
        if(!bStartMove){
      return;
        }
        var touch = evt.touches[0];
        var x = Number(touch.pageX); //页面触点X坐标


        var nLeft = x - self.startX;
        if(nLeft < 0){
          self.leftSlide = nLeft;
          if(nLeft < -40){
            self.menuEl.css({'left' : nLeft + 'px'});
          }
        }
    };

    var touchEndFunc = function(){
      if(!bInMenu){
        return;
      }
      bStartMove = false;
      if(self.leftSlide < -80){
        fMenuOff();
      }else{
        self.menuEl.animate({
          'left' : '0'
        });
      }
    }

    document.addEventListener('touchstart', touchSatrtFunc, false);
    document.addEventListener('touchmove', touchMoveFunc, false);
    document.addEventListener('touchend', touchEndFunc, false);
  }
};

// JS SDK
// 获取当前顾客信息

var Account = {
  current: function() {
    yhsd.ready(function(sdk) {
      sdk.account.current(function(oUser){
        if(oUser.res.customer) {
         window.$account = oUser.res.customer
          var tpl1 = '<a id="customer-item1" class="header-link settings-top_color" href="/account">' + oUser.res.customer.name + '</a>';
          var tpl2 = '<a id="customer-item2" class="header-link settings-top_color" href="/account/logout">退出</a>';
          var mobile_tpl1 = '<a class="mobi-side-account-left settings-side_border settings-sideLink_color settings-sideLinkHover_color" href="/account">' + oUser.res.customer.name + '</a>';
          var mobile_tpl2 = '<a class="mobi-side-account-right settings-side_border settings-sideLink_color settings-sideLinkHover_color" href="/account/logout">退出</a>';
          $('#customer-item1').replaceWith(tpl1);
          $('#customer-item2').replaceWith(tpl2);
          $('.mobi-side-account-left').replaceWith(mobile_tpl1);
          $('.mobi-side-account-right').replaceWith(mobile_tpl2);
        }
      });
    });
  }
}

// 橱窗按钮
var GalleryControl = {
    init: function(PCDir, MobiDir){
        // 0: horizontal
        // 1: vertical
        var PCDir = PCDir || 0,
            MobiDir = MobiDir || 0,
            self = this;

        if (self.isMobileQuery()) {
            self.act(MobiDir);
        } else {
            self.act(PCDir);
        }
        $(window).on('resize',function(){
            $('.pro-detail-gallery-list-btns').remove();

            if (self.isMobileQuery()) {
                self.act(MobiDir);
            } else {
                self.act(PCDir);
            }
        })
    },
    act: function(direction) {
        var $oList = $('.pro-detail-gallery-list'),
            $oListA = $oList.children('a'),
            $oListLength,
            $oListALength,
            nAdmissibleNumber,
            $visibleOListA = $('.pro-detail-gallery-list a:visible');


        if (direction){
            //垂直
            $oListLength = $oList.outerHeight(),
            $oListALength = $visibleOListA.outerHeight();

            var $oListAMarginTop = parseInt($visibleOListA.css('marginTop')),
                $oListAMarginBottom = parseInt($visibleOListA.css('marginBottom')),
                $oListAMargin = $oListAMarginTop >= $oListAMarginBottom ? $oListAMarginTop : $oListAMarginBottom;

            $oListALength += $oListAMargin;

            // 创建按钮
            var prevBtnHtml = "<span class='pro-detail-gallery-list-btns pro-detail-gallery-list-prev'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAMAAADJYP15AAAAaVBMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0srH8VAAAAInRSTlMAa/qknZVQEebaqoN6dUEG9O/OycCwqZCJcmZfWlg0JR0LSn3EmAAAAGdJREFUeAHNyFcOgzAURcFjG1MgIb33u/9FRonAMnobYD6HOQpNhRXX9dZ+ob6qm4/ZEt6b3Ypc/C28/D7/sx78PXUg6XRj0CswWOhKUuo0riNzVwfgtGTCyUHh044uPnJsMdrAbHwB2LEEgfxPpdIAAAAASUVORK5CYII='></span>";
            var nextBtnHtml = "<span class='pro-detail-gallery-list-btns pro-detail-gallery-list-next'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAYCAMAAADJYP15AAAAXVBMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0Zwd5uAAAAHnRSTlMAmvdwlodWEebXpXtiT0DvzsnAsZFral4xJR0LBgNNpSo0AAAAZklEQVQYGc3Bhw2DQBREwfcvcGTnbG//ZRohhA5ogBn2wwIbZpjzrHhncJNnoZVn0OhOplBk1Khl1unKJOrBpFfNLKpg9NSFTFDB4OXOP3KmDt6H05clU5/K6sNacOUxsVVXif35A/suA8gBF9MzAAAAAElFTkSuQmCC'></span>";
        } else {
            // 水平
            $oListLength = $oList.outerWidth(),
            $oListALength = $visibleOListA.outerWidth();

            var $oListAMarginLeft = parseInt($visibleOListA.css('marginLeft')),
                $oListAMarginRight = parseInt($visibleOListA.css('marginRight')),
                $oListAMargin = $oListAMarginLeft + $oListAMarginRight;

            $oListALength += $oListAMargin;

            // 创建按钮
            var prevBtnHtml = "<span class='pro-detail-gallery-list-btns pro-detail-gallery-list-prev'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAMAAADto6y6AAAAhFBMVEUAAAD////m5ubn5+fl5eX////7+/v////g4ODs7Ozm5ubq6urj4+Pu7u7p6enn5+f////o6Ojq6urq6uri4uLu7u7v7+/s7Ozm5ubk5OTs7Ozp6enk5OTr6+v09PTx8fHn5+f19fX7+/v19fX39/fs7Oz////39/fg4ODe3t7i4uLl5eWLEt5aAAAAKHRSTlMACOHQmBgMBPjq3banmHlvHebe1tbOxsbGtrWYj46GhIRpXE40LxISbdyzUwAAAHdJREFUGBltwUUSwzAQBMARWWY7zEy78v//l6oco+nGP9eCOogF47UxyIWjbiJyodKVQe49132BXLHQHoRxcgURt3ICYXbSgamlAzWlJ6hbKl+gHlN5BnW36QKqWEoP6lPLACrMdDBgxkrWEczotTGgvFhwrsXPF510Bw9yKdQgAAAAAElFTkSuQmCC'></span>";
            var nextBtnHtml = "<span class='pro-detail-gallery-list-btns pro-detail-gallery-list-next'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAMAAADto6y6AAAAY1BMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d0qoXkoAAAAIHRSTlMA+aeTjXluUxgG2JiFaFrv7ubhybyvnp1zZExCQTQmDuORh7IAAABjSURBVBgZbcFFEgMxAAPBMa69FGbS/1+ZQ24pdfOTMl4MN7yiildU8KpmvEUZb9WEN+iCN+iMN2jCe4SI1XcbnLYfG8Z7OzaMVzh8MJ46doy7Th1jVcRZlHCumnFiqFgp8+cLSYwEKlrmUqgAAAAASUVORK5CYII='></span>";
        }

        // 可容纳的数量
        nAdmissibleNumber = parseInt($oListLength / $oListALength);

        // 初始化显示
        $oList.find('.hidden').removeClass('hidden');

        // 橱窗图片数量不足时返回
        if ($oListA.size() <= nAdmissibleNumber) return;
        // 多余的图片隐藏
        var selector = 'a:gt(' + (nAdmissibleNumber - 1) + ')';
        $oList.children(selector).addClass('hidden');

        $oList.prepend(prevBtnHtml);
        $oList.append(nextBtnHtml);

        var $prevBtn = $('.pro-detail-gallery-list-prev');
        var $nextBtn = $('.pro-detail-gallery-list-next');

        $nextBtn.click(function() {
            $visibleOListA = $('.pro-detail-gallery-list a:visible');

            var $lastVisibleOListA = $visibleOListA.last(),
                $firstVisibleOListA = $visibleOListA.first();

            if ($oListA.index($lastVisibleOListA) == $oListA.size()-1) return;

            $firstVisibleOListA.addClass('hidden');
            $lastVisibleOListA.next('a').removeClass('hidden');

        })

        $prevBtn.click(function() {
            $visibleOListA = $('.pro-detail-gallery-list a:visible')

            var $lastVisibleOListA = $visibleOListA.last(),
                $firstVisibleOListA = $visibleOListA.first();

            if ($oListA.index($firstVisibleOListA) == 0) return;

            $firstVisibleOListA.prev('a').removeClass('hidden');
            $lastVisibleOListA.addClass('hidden');

        })
    },
    isMobileQuery: function() {
        var isMatch = false;

        if(window && window.matchMedia) {
            isMatch = window.matchMedia("screen and (max-width: 768px)").matches;
        }

        return isMatch;
    }
}

// 文章列表
var postList = {
  init: function() {
    var $dirlist = $('#post-dirs-list');
    var $arrow = $dirlist.find('.post-dir-btn');
    $arrow.on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var $tar = $(e.currentTarget);
      var $next = $tar.parent().next();
      if($tar.hasClass('dir_off')) {
        $tar.removeClass('dir_off');
        $next.slideDown();
      } else {
        $tar.addClass('dir_off');
        $next.slideUp();
      }
    });
  }
};

var postDetail = {
  _post_count: 5,
  rePostTpl: '<a href="/posts/#{handle}" class="post-re-each settings-main_border settings-text_color"><span class="post-re-each-dot"></span>#{title}</a>',
  init: function() {
    var self = this;
    var $recentPostList = $('#post-re-list');
    yhsd.ready(function(jssdk) {
      jssdk.post.get({
        size: self._post_count + 1
      }, function(data) {
        var listInner = '';
        var rePostTpl = self.rePostTpl;
        var currentHandle = location.pathname.slice(7);
        if(data.res.code === 200 && data.res.posts.length > 1) {
          var posts = data.res.posts, i;
          for(i = 0; i < posts.length; i++) {
            // 不显示当前文章
            if(posts[i].handle != currentHandle) {
              listInner += rePostTpl.replace(/#{handle}/, posts[i].handle)
                .replace(/#{title}/, posts[i].title);
            }
          }
        } else {
          listInner = '<div class="post-re-list-tip settings-desc_color">暂无内容</div>';
        }
        $recentPostList.html(listInner);
      });
    });
  }
}

// Start Function

$(document).ready(function(){
  bIsMobile = $('body').hasClass('is_mobile');
  var oRouteCustom = {};
  oRouteCustom['all'] = function(path){
    Mobilenav.init();
    TopSearch.init();
    Account.current();
  };
  oRouteCustom['productDetail'] = function(path){
    GalleryControl.init(0,0);
  };
  oRouteCustom['postAll'] = function(path) {
    postList.init();
  };
  oRouteCustom['postDetail'] = function(path) {
    postDetail.init();
  };
  $yhsd.route.init(oRouteCustom);
    /* 移动端购物车商品数修复 */

    /* Placeholder 低端浏览器兼容 */
    _html = $('html');
    if (_html.hasClass('ie6') || _html.hasClass('ie7') || _html.hasClass('ie8')) {
      return setTimeout(function() {
        return $('input, textarea').placeholder();
      }, 100);
    }
});


