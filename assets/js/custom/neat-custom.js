(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 Ref path is not needed for some reason
 <reference path="/Users/yosemetie/Dropbox/development/vhosts/www.lyndascore.dev/wp-content/themes/neat/typings/tsd.d.ts" />
 */
"use strict";
var utils_1 = require("./partials/utils");
var navigation_1 = require("./navigation/navigation");
var search_1 = require("./navigation/components/search");
var header_svg_1 = require("./partials/header-svg");
// import SmoothState from "./partials/smoothState";
var imageLoader_1 = require("./partials/imageLoader");
var sticky_sidebar_1 = require("./partials/sticky-sidebar");
var processAnimation_1 = require("./partials/processAnimation");
// import StickySidebar from "./partials/service-sidebar";
var $ = jQuery;
// declare var revapi1: any;
(function () {
    var App = (function () {
        function App() {
        }
        App.prototype.init = function () {
            console.log("Neat loaded");
            header_svg_1.default.init();
            utils_1.default.init();
            navigation_1.default.init();
            search_1.default.init();
            sticky_sidebar_1.default.init();
            processAnimation_1.default.init();
        };
        return App;
    }());
    var bootstrap = new App();
    /** run all functions */
    $(document).ready(function () {
        bootstrap.init();
        imageLoader_1.default.init();
        // SmoothState.init("");
    });
    // Global window function
    var sideBar = $(".service-sidebar-wrapper");
    window.onbeforeunload = function (e) {
        console.log("window change");
        if (utils_1.default.breakpoint >= utils_1.default.bps.tablet) {
            $(".m-scene").addClass("is-exiting");
            TweenLite
                .to($(window), .5, {
                scrollTo: { y: 0 }, ease: Power2.easeOut
            });
            // animate SVG out
            TweenLite.to(sideBar, .3, {
                x: "-100",
                z: ".001",
                delay: 0,
                opacity: 0,
                ease: "Linear.easeNone"
            });
            // animate sidebar out
            if (sideBar.length > 0) {
                TweenLite.to($(".divider-svg"), .3, {
                    y: "30",
                    z: ".001",
                    delay: 0,
                    ease: "Linear.easeNone"
                });
            }
        }
    };
    // $(window).on("load", function () {
    //   // modify the "revapi1" part with your slider"s API name listed here:
    //   // https://www.themepunch.com/revslider-doc/api/
    //   if ( typeof revapi1 !== "undefined" ) {
    //     console.log("rev start");
    //     revapi1.revstart();
    //   }
    //
    // });
})();
// declare var Isotope: any;
// class iso {
//     constructor() {
//     }
//     init():any{
//         var elem = document.querySelector(".grid");
//         var isot = new Isotope( elem, {
//             // options
//             itemSelector: ".grid-item",
//             layoutMode: "fitRows"
//         });
//         console.log($(".grid"));
//     }
// }

},{"./navigation/components/search":2,"./navigation/navigation":3,"./partials/header-svg":4,"./partials/imageLoader":5,"./partials/processAnimation":6,"./partials/sticky-sidebar":7,"./partials/utils":8}],2:[function(require,module,exports){
"use strict";
var $ = jQuery;
var SearchComponent = (function () {
    function SearchComponent() {
        this.$searchTrigger = $(".meta-search-trigger");
        this.$searchCloseTrigger = $(".super-search-close");
        this.$searchForm = $(".super-search");
        this.$searchButtonArea = $(".meta-search");
        this.$icon = this.$searchTrigger.children("i");
        this.$form = this.$searchForm.find(".et-search");
        this.$input = this.$form.first();
        this.$width = this.$searchButtonArea.width();
        this.$height = this.$searchButtonArea.height();
    }
    SearchComponent.prototype.reload = function () {
        console.log("Search Reload");
        this.$searchTrigger = $(".meta-search-trigger");
        this.$searchCloseTrigger = $(".super-search-close");
        this.$searchForm = $(".super-search");
        this.$searchButtonArea = $(".meta-search");
        this.$icon = this.$searchTrigger.children("i");
        this.$form = $(".et-search");
        this.$width = this.$searchButtonArea.width();
        this.$height = this.$searchButtonArea.height();
        this.$searchTrigger.on("click", this.openSearch.bind(this)).bind(this);
        this.$searchCloseTrigger.on("click", this.closeSearch.bind(this)).bind(this);
    };
    SearchComponent.prototype.getWidth = function () {
        return this.$searchButtonArea.width();
    };
    SearchComponent.prototype.getTopPosition = function () {
        return this.$searchTrigger.offset().top - $(window).scrollTop();
    };
    SearchComponent.prototype.getLeftPosition = function () {
        return this.$searchTrigger.offset().left;
    };
    SearchComponent.prototype.closeSearch = function (event) {
        this.isOpen = false;
        var animation = new TimelineLite();
        TweenLite.to(this.$searchCloseTrigger, .2, {
            top: "5%",
            opacity: "0"
        });
        TweenLite.to(this.$form, .4, {
            top: "25%",
            opacity: "0",
            ease: Expo.easeInOut
        });
        animation.to(this.$searchForm, .2, {
            left: this.getLeftPosition(),
            top: this.getTopPosition(),
            width: this.getWidth(),
            height: this.getWidth(),
            delay: .3,
            onComplete: function () {
                $("body").css({
                    position: "relative",
                    width: "100%"
                });
                TweenLite.to(this.$icon, .2, {
                    top: "50%",
                    opacity: "1",
                });
            }.bind(this)
        }).to(this.$searchForm, .4, {
            opacity: 0,
            onComplete: function () {
                this.$searchForm.css({
                    "z-index": -1,
                    "left": 0,
                    "top": 0,
                    "width": this.getWidth(),
                    "height": this.getWidth(),
                });
            }.bind(this)
        });
    };
    SearchComponent.prototype.openSearch = function (event) {
        event.preventDefault();
        this.isOpen = true;
        // prevent button from being used once search is open
        this.$searchTrigger.blur();
        this.$searchForm.css({
            left: this.getLeftPosition(),
            top: this.getTopPosition(),
            width: this.getWidth(),
            height: this.getWidth(),
            "z-index": 999
        });
        var animation = new TimelineLite();
        animation.to(this.$searchForm, .2, {
            visibility: "visible",
            opacity: "1",
            delay: .2
        }).to(this.$searchForm, .2, {
            left: 0,
            top: 0,
            width: "100%",
            height: "100vh",
            background: "#35373D",
            onComplete: function () {
                $("body").css({
                    position: "fixed",
                    width: "100%",
                    overflowY: "scroll"
                });
                console.log("complete");
            }
        });
        TweenLite.to(this.$icon, .2, {
            top: "110%",
            opacity: "0",
        });
        TweenLite.to(this.$searchCloseTrigger, .3, {
            top: "3%",
            opacity: "1",
            delay: .4,
        });
        TweenLite.to(this.$form, .4, {
            top: "20%",
            opacity: "1",
            delay: .4,
            ease: Expo.easeInOut
        });
    };
    SearchComponent.prototype.init = function () {
        var _this = this;
        console.log("Search loaded");
        // this.openSearch();
        this.$input.keyup(function (event) {
            // if key is enter - animate out
            if (event.which === 13) {
                _this.closeSearch(event);
            }
        });
        this.$searchTrigger.on("click", this.openSearch.bind(this)).bind(this);
        this.$searchCloseTrigger.on("click", this.closeSearch.bind(this)).bind(this);
        $("body").keyup(function (event) {
            if (event.which === 27 && _this.isOpen) {
                _this.closeSearch(event);
                event.preventDefault();
            }
            else {
                event.preventDefault();
                return;
            }
        });
    };
    return SearchComponent;
}());
var SearchBox = new SearchComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchBox;

},{}],3:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("../partials/utils");
var NavComponent = (function () {
    function NavComponent() {
        this.$navTrigger = document.getElementById("nav-trigger");
        this.$navDropdown = document.getElementById("et-dropdown-trigger");
        this.$lowerContainer = $(".lowercontainer");
        this.$upperContainer = $(".uppercontainer");
        this.$navMeta = $(".et-nav-meta");
        this.$dropDownWrapper = $(".et-dropdown-wrapper");
        this.$search = $("#nav-xfer");
        this.$dropDownContent = $(".et-dropdown-content");
        this.state = {
            navEnabled: false,
            mobile: false,
            tablet: false,
            laptop: false,
            desktop: false
        };
    }
    /*
     Mobile Nav functionality
     */
    NavComponent.prototype.reload = function () {
        this.$navTrigger = document.getElementById("nav-trigger");
        this.$navDropdown = document.getElementById("et-dropdown-trigger");
        this.$lowerContainer = $(".lowercontainer");
        this.$upperContainer = $(".uppercontainer");
        this.$navMeta = $(".et-nav-meta");
        this.$dropDownWrapper = $(".et-dropdown-wrapper");
        this.$search = $("#nav-xfer");
        this.$dropDownContent = $(".et-dropdown-content");
        this.state = {
            navEnabled: false,
            mobile: false,
            tablet: false,
            laptop: false,
            desktop: false
        };
        this.init();
    };
    NavComponent.prototype.openNav = function (event) {
        event.preventDefault();
        $(this.$navDropdown).addClass("menu-is-active");
        TweenMax.to(this.$navDropdown, .3, {
            top: 0,
            ease: Cubic.easeOut
        });
    };
    NavComponent.prototype.closeNav = function (event) {
        event.preventDefault();
        $(this.$navDropdown).removeClass("menu-is-active");
        TweenMax.to(this.$navDropdown, .3, {
            top: "-100%",
            ease: Cubic.easeIn
        });
    };
    NavComponent.prototype.navOpenInit = function (init) {
        if (init) {
            $(this.$navTrigger).on("click", this.openNav.bind(this));
        }
        else {
            $(this.$navTrigger).off();
        }
    };
    NavComponent.prototype.navClose = function (init) {
        if (init) {
            $(".et-close").on("click", this.closeNav.bind(this));
        }
        else {
            $(".et-close").off();
        }
    };
    NavComponent.prototype.navItemClick = function (init) {
        if (init) {
            $(".menu-item-has-children").children("a").on("click", function (event) {
                event.preventDefault();
                var selected = $(this);
                selected.next("ul").removeClass("is-hidden").parent(".menu-item-has-children").parent("ul").addClass("move-out");
            });
        }
        else {
            $(".menu-item-has-children").children("a").off();
        }
    };
    NavComponent.prototype.goback = function (init) {
        if (init) {
            $(".go-back > a").on("click", function (event) {
                event.preventDefault();
                var selected = $(this);
                selected.parent("li").parent(".et-secondary-dropdown").addClass("is-hidden").parent(".menu-item-has-children").parent("ul").removeClass("move-out");
            });
        }
        else {
            $(".go-back > a").off();
        }
    };
    NavComponent.prototype.moveNavigationMobile = function () {
        // console.log("move navigation mobile");
        this.$search.detach();
        this.$navMeta.detach();
        this.$lowerContainer.detach();
        this.$dropDownWrapper.detach();
        this.$lowerContainer.insertAfter(this.$upperContainer);
        this.$navMeta.insertBefore(this.$upperContainer);
        this.$upperContainer.append(this.$dropDownWrapper);
        this.$navMeta.append(this.$search);
    };
    NavComponent.prototype.moveNavigationTablet = function () {
        // console.log("move navigation tablet");
        this.$search.detach();
        this.$lowerContainer.detach();
        this.$upperContainer.append(this.$navMeta);
        this.$upperContainer.append(this.$lowerContainer);
        this.$dropDownWrapper.insertAfter(this.$upperContainer);
        this.$dropDownWrapper.prepend(this.$search);
    };
    NavComponent.prototype.moveNavigationDekstop = function () {
        // console.log("move navigation desktop");
        this.$search.insertBefore(this.$dropDownContent);
    };
    NavComponent.prototype.disableMobileNav = function () {
        // console.log("Nav turned off");
        this.navOpenInit(false);
        this.navClose(false);
        this.navItemClick(false);
        this.goback(false);
        this.state.navEnabled = false;
    };
    NavComponent.prototype.enableMobileNav = function () {
        // console.log("Nav turned on");
        this.navOpenInit(true);
        this.navClose(true);
        this.navItemClick(true);
        this.goback(true);
        this.state.navEnabled = true;
    };
    NavComponent.prototype.breakPointMobile = function () {
        console.log("Breakpoint Mobile");
        if (!this.state.navEnabled) {
            this.enableMobileNav();
        }
        this.moveNavigationMobile();
    };
    NavComponent.prototype.breakPointTablet = function (prevState) {
        console.log("Breakpoint Tablet");
        if (!this.state.navEnabled) {
            this.enableMobileNav();
        }
        this.moveNavigationTablet();
    };
    NavComponent.prototype.breakPointLaptop = function (prevState) {
        console.log("Breakpoint Laptop");
        if (this.state.navEnabled) {
            this.disableMobileNav();
        }
        // if prev state was tablet do this:
        if (prevState.desktop === false || prevState.mobile === true) {
            this.moveNavigationTablet();
            this.moveNavigationDekstop();
        }
    };
    NavComponent.prototype.breakPointDesktop = function (prevState) {
        console.log("Breakpoint Desktop");
        if (prevState.laptop === false || prevState.mobile === true) {
            this.moveNavigationTablet();
            this.moveNavigationDekstop();
        }
    };
    NavComponent.prototype.navResize = function () {
        /*
         Mobile
         */
        if (utils_1.default.breakpoint === utils_1.default.bps.mobile) {
            if (!this.state.mobile) {
                this.breakPointMobile();
            }
            // Turn mobile on
            this.state = {
                navEnabled: true,
                mobile: true,
                tablet: false,
                laptop: false,
                desktop: false
            };
        }
        /*
         Tablet
         */
        if (utils_1.default.breakpoint === utils_1.default.bps.tablet) {
            var prevState = this.state;
            // tablet and higher
            // do once
            if (!this.state.tablet) {
                this.breakPointTablet(prevState);
            }
            // Turn mobile on
            this.state = {
                navEnabled: true,
                mobile: false,
                tablet: true,
                laptop: false,
                desktop: false
            };
        }
        /*
         Laptop
         */
        if (utils_1.default.breakpoint === utils_1.default.bps.laptop) {
            var prevState = this.state;
            if (!this.state.laptop) {
                this.breakPointLaptop(prevState);
            }
            this.state = {
                navEnabled: false,
                mobile: false,
                tablet: false,
                laptop: true,
                desktop: false
            };
        }
        /*
         Desktop
         */
        if (utils_1.default.breakpoint === utils_1.default.bps.desktop) {
            var prevState = this.state;
            if (!this.state.desktop) {
                this.breakPointDesktop(prevState);
            }
            this.state = {
                navEnabled: false,
                mobile: false,
                tablet: false,
                laptop: false,
                desktop: true
            };
        }
    };
    NavComponent.prototype.navLoad = function () {
        if (utils_1.default.breakpoint === utils_1.default.bps.mobile) {
            this.breakPointMobile();
            this.state = {
                navEnabled: true,
                mobile: true,
                tablet: false,
                laptop: false,
                desktop: false
            };
        }
        if (utils_1.default.breakpoint === utils_1.default.bps.tablet) {
            this.breakPointTablet(this.state);
            this.state = {
                navEnabled: true,
                mobile: false,
                tablet: true,
                laptop: false,
                desktop: false
            };
        }
        if (utils_1.default.breakpoint === utils_1.default.bps.laptop) {
            this.breakPointLaptop(this.state);
            this.state = {
                navEnabled: false,
                mobile: false,
                tablet: false,
                laptop: true,
                desktop: false
            };
        }
        if (utils_1.default.breakpoint === utils_1.default.bps.desktop) {
            this.breakPointDesktop(this.state);
            this.state = {
                navEnabled: false,
                mobile: false,
                tablet: false,
                laptop: false,
                desktop: true
            };
        }
    };
    NavComponent.prototype.init = function () {
        var _this = this;
        console.log("Nav loaded");
        this.navLoad();
        // SearchBox.init();
        /****************
         NAV RESIZE EVENT
         ***************/
        window.onresize = function (event) {
            (!window.requestAnimationFrame)
                ? setTimeout(_this.navResize.bind(_this), 300)
                : window.requestAnimationFrame(_this.navResize.bind(_this));
        };
    };
    return NavComponent;
}());
var Nav = new NavComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Nav;

},{"../partials/utils":8}],4:[function(require,module,exports){
"use strict";
var $ = jQuery;
var SvgHeaderComponent = (function () {
    function SvgHeaderComponent() {
        this.svg = $(".divider-svg");
        this.window = $(window);
        this.proportion = 18;
        this.winWidth = this._setWindowWidth();
        this.height = this.winWidth / this.proportion;
    }
    SvgHeaderComponent.prototype._setWindowWidth = function () {
        return $(window).width();
    };
    SvgHeaderComponent.prototype._setSvgHeight = function () {
        var height = this._setWindowWidth() / 18;
        return height;
    };
    SvgHeaderComponent.prototype.resizeSvg = function () {
        this.winWidth = this._setWindowWidth();
        this.height = this._setSvgHeight();
        // set width of item
        // this.svg.attr("width", this.winWidth);
        this.svg.css("width", this.winWidth);
        // set height proportion of 28
        this.svg.attr("height", this.height);
        this.svg.height(this.height);
    };
    SvgHeaderComponent.prototype.animateIn = function () {
        // console.log("Animate In");
        this.svg = $(".divider-svg");
        this.proportion = 18;
        this.window = $(window);
        this.winWidth = this.window.width();
        this.height = this.winWidth / this.proportion;
        // set width of item
        this.svg.attr("width", this.winWidth);
        // set height proportion of 28
        this.svg.attr("height", this.height);
        this.svg.height(this.height);
        TweenLite.to(this.svg, .3, {
            opacity: 1,
            height: this.height,
            bottom: "-3px",
        });
    };
    SvgHeaderComponent.prototype.init = function () {
        console.log("Svg header loaded");
        // this.svg.height(this._setSvgHeight());
        // this.svg.attr("height", this._setSvgHeight());
        TweenLite.to(this.svg, .1, {
            y: "3",
            z: ".001",
            width: this._setWindowWidth(),
            height: this._setSvgHeight(),
            delay: 0,
            ease: "Linear.easeNone"
        });
        $(window).on("resize", this.resizeSvg.bind(this)).bind(this);
    };
    return SvgHeaderComponent;
}());
var SvgHeader = new SvgHeaderComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SvgHeader;

},{}],5:[function(require,module,exports){
"use strict";
var $ = jQuery;
// TODO: Sidebar image loading
var ImageLoaderComponent = (function () {
    function ImageLoaderComponent() {
        this.arr = [];
        this.body = $("body");
        this.content = $("#content");
        this.hero = $(".hero");
        this.hasHero = this.hero.length;
    }
    ImageLoaderComponent.prototype.animateBlogPrimary = function () {
        var blogPrimary = $(".primary");
        var blogBgImage = blogPrimary.css("background-image");
        if (blogBgImage !== "none") {
            setTimeout(function () {
                TweenLite
                    .to(blogPrimary, .3, {
                    z: ".001",
                    opacity: 1,
                });
            }, 300);
        }
    };
    ImageLoaderComponent.prototype.animateHeroHeader = function () {
        var _this = this;
        var b = this.hero.find(".hero-background").css("background-image");
        if (b !== "none") {
            setTimeout(function () {
                _this.hero.addClass("loaded");
                TweenLite
                    .to(_this.hero, .4, {
                    opacity: 1,
                });
            }, 300);
        }
        else {
            this.hero.addClass("loaded");
        }
    };
    ImageLoaderComponent.prototype.animateBlogArticles = function () {
        var animate = new TimelineMax();
        for (var i = 0; i < this.arr.length; i++) {
            animate.to(this.arr[i], 0.1, { opacity: "1", ease: "Linear.easeNone" });
        }
    };
    ImageLoaderComponent.prototype.preloadImages = function () {
        var _this = this;
        this.arr = [];
        this.content.imagesLoaded({ background: true }, function () {
            // Blog primary article
            _this.body.hasClass("blog") ? _this.animateBlogPrimary() : "";
            // Hero header intro
            _this.hasHero > 0 ? _this.animateHeroHeader() : "";
        })
            .always(function (instance) {
            console.log("all images loaded");
        })
            .done(function (instance) {
            console.log("all images successfully loaded");
            // Animation for Blog index homepage
            _this.animateBlogArticles();
            $(document).trigger("imgLoaded");
            // Example on how to trigger events elsewhere
            // $(document).on("imgLoaded", function(e){
            //   console.log("image loaded custom event");
            // });
        })
            .fail(function () {
            console.log("all images loaded, at least one is broken");
        })
            .progress(function (instance, image) {
            var result = image.isLoaded ? "loaded" : "broken";
            if (result) {
                _this.arr.push(image.img);
            }
            // console.log("image is " + result + " for " + image.img.src);
        });
    };
    ImageLoaderComponent.prototype.init = function () {
        console.log("Image Preloader Module");
        this.preloadImages();
    };
    return ImageLoaderComponent;
}());
var ImageLoader = new ImageLoaderComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImageLoader;

},{}],6:[function(require,module,exports){
"use strict";
var $ = jQuery;
var ProcessComponent = (function () {
    function ProcessComponent() {
        this.container = $(".process-container");
        this.item = $(".process-item-container");
    }
    ProcessComponent.prototype.desc_o_animate = function () {
        if ($(".desc-o-animate").length > 0) {
            var wipeAnimation = new TimelineMax();
            wipeAnimation.add([
                TweenMax.fromTo($(".desc-o-image-1"), 1, { yPercent: 0 }, { yPercent: -20, ease: Power0.easeInOut })
            ]);
            var wipeAnimation2 = new TimelineMax();
            wipeAnimation2.add([
                TweenMax.fromTo($(".desc-o-image-2"), 1, { yPercent: 0, }, { yPercent: -105, ease: Power0.easeInOut })
            ]);
            var controller = new ScrollMagic.Controller();
            var scene = new ScrollMagic.Scene({
                triggerElement: ".desc-o-animate",
                duration: $(".desc-o-animate").height(),
                offset: -100
            })
                .setTween(wipeAnimation)
                .addIndicators({ name: "1 (duration: El)" }) // add indicators (requires plugin)
                .addTo(controller);
            var scene2 = new ScrollMagic.Scene({
                triggerElement: ".desc-o-animate",
                duration: $(".desc-o-animate").height() + 100,
            })
                .setTween(wipeAnimation2)
                .addIndicators({ name: "2 (duration: El)" }) // add indicators (requires plugin)
                .addTo(controller);
        }
    };
    ProcessComponent.prototype.animateIn = function () {
        var container = this.container;
        var item = this.item;
        var controller = new ScrollMagic.Controller();
        var scene = new ScrollMagic.Scene({
            triggerElement: ".process-container",
            duration: container.height(),
        })
            .on("enter", function () {
            item.find(".process-item-inner").addClass("in");
            container.find("img").addClass("in");
        })
            .addTo(controller);
    };
    ProcessComponent.prototype.init = function () {
        this.animateIn();
        this.desc_o_animate();
    };
    return ProcessComponent;
}());
var ProcessMap = new ProcessComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProcessMap;

},{}],7:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("./utils");
var StickySidebarComponent = (function () {
    function StickySidebarComponent() {
        this.isAnimating = false;
        this.contentWrapper = $(".sidebar-content");
        this.aside = $(".service-sidebar-wrapper");
        this.windowHeight = $(window).height();
        this.sidebarHeight = this.aside.outerHeight();
        this.sidebarWrapper = $(".service-sidebar");
    }
    StickySidebarComponent.prototype.checkSidebar = function () {
        // Check if the sidebar is fixed or not
        if (!this.isAnimating && utils_1.default.breakpoint >= utils_1.default.bps.tablet) {
            this.isAnimating = true;
            (!window.requestAnimationFrame) ? setTimeout(this.updateSidebarPosition.bind(this), 300) : window.requestAnimationFrame(this.updateSidebarPosition.bind(this));
        }
        else {
        }
    };
    StickySidebarComponent.prototype.resetSideBar = function () {
        this.isAnimating = false;
        this.aside.removeClass("sticky");
        this.aside.attr("style", "");
    };
    StickySidebarComponent.prototype.updateSidebarPosition = function () {
        this.checkScrollDirection();
        // get distance from top of content
        this.contentOffsetTop = this.contentWrapper.offset().top - 5;
        this.contentWrapperHeight = this.contentWrapper.outerHeight(); // include padding and margin
        // get where top of window is
        this.scrollTop = $(window).scrollTop();
        // If the window V position is less than the content V position make sidebar normal
        if (this.scrollTop < this.contentOffsetTop) {
            this.aside.removeClass("sticky");
            this.aside.css("transition", "top .3s");
        }
        else if (this.scrollTop >= this.contentOffsetTop && this.scrollTop < this.contentWrapperHeight + this.sidebarHeight + this.contentOffsetTop - this.windowHeight) {
            this.aside.addClass("sticky").attr("style", "");
            if (this.scrollingDown === true) {
                this.aside.css("transition", "top .3s");
            }
            else {
                this.aside.css("transition", "");
            }
        }
        else {
            // let articlePaddingTop = Number(articles.eq(1).css("padding-top").replace("px", ""));
            if (this.aside.hasClass("sticky")) {
                this.aside.attr("style", "");
                this.aside.removeClass("sticky").css("top", this.contentWrapperHeight + this.sidebarHeight + 45 - this.windowHeight + "px");
            }
        }
        this.isAnimating = false;
    };
    StickySidebarComponent.prototype.checkScrollDirection = function () {
        // Log current scrollPoint
        var st = $(this).scrollTop();
        // compare to last scrollPoint
        if (st > this.lastScrollTop) {
            console.log("scroll down");
            // downscroll code
            this.scrollingDown = true;
        }
        else {
            console.log("scroll up");
            // upscroll code
            this.scrollingDown = false;
        }
        // on complete - make last Scroll point the point at which they started scrolling at first
        this.lastScrollTop = st;
    };
    StickySidebarComponent.prototype.animateSidebarIn = function () {
        this.aside.removeClass("intro");
        var sidebarIntro = TweenMax.from(this.aside, .3, {
            x: -100,
            opacity: 0,
            z: .001,
            ease: Cubic.easeOut,
            delay: .5
        });
    };
    StickySidebarComponent.prototype.init = function () {
        console.log("Sticky sidebar loaded");
        this.lastScrollTop = 0;
        if (this.aside.length > 0) {
            this.checkSidebar();
            $(window).on("scroll", this.checkSidebar.bind(this));
            $(window).on("resize", this.checkSidebar.bind(this));
            // Animate side bar in on load
            this.animateSidebarIn();
        }
    };
    return StickySidebarComponent;
}());
var StickySidebar = new StickySidebarComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StickySidebar;

},{"./utils":8}],8:[function(require,module,exports){
"use strict";
var $ = jQuery;
// Add interface JQuerySmooth {
// smoothState():void;
// }
// smoothState(arg: Object): JQuery;
var UtilityComponent = (function () {
    function UtilityComponent() {
        var _this = this;
        this._setBreakpoints = function (bps) {
            var arr = [];
            for (var key in bps) {
                if (bps.hasOwnProperty(key)) {
                    arr.push(bps[key]);
                }
            }
            return arr.reverse();
        };
        this._checkBreakpoint = function () {
            // make breakpoint event available to all files via the window object
            var old_breakpoint = _this.breakpoint;
            _this._setBreakpoint();
            if (old_breakpoint !== _this.breakpoint) {
                $(window).trigger("breakpointChange", Utils.breakpoint);
            }
        };
        this._setBreakpoint = function () {
            // get breakpoint from css
            var body = getComputedStyle(document.body), zindex = getComputedStyle(document.body)["z-index"];
            _this.breakpoint = parseInt(zindex, 10);
        };
        this._setWindowWidth = function () {
            _this.windowWidth = window.innerWidth;
        };
        this.windowWidth = 0;
        this.breakpoint = 320;
        this.breakpoints = [];
        this.bps = {
            mobile: 544,
            tablet: 768,
            laptop: 992,
            desktop: 1200,
            desktop_xl: 1600
        };
    }
    UtilityComponent.prototype.init = function () {
        console.log("Utilities loaded");
        // set breakpoint on window load
        this._setBreakpoint();
        this._setWindowWidth();
        console.log("Current Breakpoint is:", this.breakpoint);
        // create full array for image compression ref
        this.breakpoints = this._setBreakpoints(this.bps);
        $(window).on("resize", this._checkBreakpoint).bind(this);
    };
    return UtilityComponent;
}());
var Utils = new UtilityComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Utils;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9oZWFkZXItc3ZnLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9pbWFnZUxvYWRlci50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvcHJvY2Vzc0FuaW1hdGlvbi50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvc3RpY2t5LXNpZGViYXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztHQUdHOztBQUVILHNCQUFrQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLDJCQUFnQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzFDLHVCQUFtQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3BELDJCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLG9EQUFvRDtBQUNwRCw0QkFBd0Isd0JBQXdCLENBQUMsQ0FBQTtBQUNqRCwrQkFBMEIsMkJBQTJCLENBQUMsQ0FBQTtBQUN0RCxpQ0FBdUIsNkJBQTZCLENBQUMsQ0FBQTtBQUNyRCwwREFBMEQ7QUFDMUQsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBRWpCLDRCQUE0QjtBQUM1QixDQUFDO0lBQ0M7UUFBQTtRQVdBLENBQUM7UUFUQyxrQkFBSSxHQUFKO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzQixvQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLGVBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNi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ZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gUmVmIHBhdGggaXMgbm90IG5lZWRlZCBmb3Igc29tZSByZWFzb25cbiA8cmVmZXJlbmNlIHBhdGg9XCIvVXNlcnMveW9zZW1ldGllL0Ryb3Bib3gvZGV2ZWxvcG1lbnQvdmhvc3RzL3d3dy5seW5kYXNjb3JlLmRldi93cC1jb250ZW50L3RoZW1lcy9uZWF0L3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuICovXG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi9wYXJ0aWFscy91dGlsc1wiO1xuaW1wb3J0IE5hdiBmcm9tIFwiLi9uYXZpZ2F0aW9uL25hdmlnYXRpb25cIjtcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IFN2Z0hlYWRlciBmcm9tIFwiLi9wYXJ0aWFscy9oZWFkZXItc3ZnXCI7XG4vLyBpbXBvcnQgU21vb3RoU3RhdGUgZnJvbSBcIi4vcGFydGlhbHMvc21vb3RoU3RhdGVcIjtcbmltcG9ydCBJbWFnZUxvYWRlciBmcm9tIFwiLi9wYXJ0aWFscy9pbWFnZUxvYWRlclwiO1xuaW1wb3J0IFN0aWNreVNpZGViYXIgZnJvbSBcIi4vcGFydGlhbHMvc3RpY2t5LXNpZGViYXJcIjtcbmltcG9ydCBQcm9jZXNzTWFwIGZyb20gXCIuL3BhcnRpYWxzL3Byb2Nlc3NBbmltYXRpb25cIjtcbi8vIGltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3NlcnZpY2Utc2lkZWJhclwiO1xuY29uc3QgJCA9IGpRdWVyeTtcbmRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG4vLyBkZWNsYXJlIHZhciByZXZhcGkxOiBhbnk7XG4oZnVuY3Rpb24gKCkge1xuICBjbGFzcyBBcHAge1xuXG4gICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTmVhdCBsb2FkZWRcIik7XG4gICAgICBTdmdIZWFkZXIuaW5pdCgpO1xuICAgICAgVXRpbHMuaW5pdCgpO1xuICAgICAgTmF2LmluaXQoKTtcbiAgICAgIFNlYXJjaC5pbml0KCk7XG4gICAgICBTdGlja3lTaWRlYmFyLmluaXQoKTtcbiAgICAgIFByb2Nlc3NNYXAuaW5pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGxldCBib290c3RyYXAgPSBuZXcgQXBwKCk7XG5cbiAgLyoqIHJ1biBhbGwgZnVuY3Rpb25zICovXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBib290c3RyYXAuaW5pdCgpO1xuICAgIEltYWdlTG9hZGVyLmluaXQoKTtcbiAgICAvLyBTbW9vdGhTdGF0ZS5pbml0KFwiXCIpO1xuICB9KTtcblxuICAvLyBHbG9iYWwgd2luZG93IGZ1bmN0aW9uXG4gIGxldCBzaWRlQmFyID0gJChcIi5zZXJ2aWNlLXNpZGViYXItd3JhcHBlclwiKTtcblxuICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoIGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJ3aW5kb3cgY2hhbmdlXCIpO1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgJChcIi5tLXNjZW5lXCIpLmFkZENsYXNzKFwiaXMtZXhpdGluZ1wiKTtcblxuICAgICAgVHdlZW5MaXRlXG4gICAgICAgIC50bygkKHdpbmRvdyksIC41LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjcm9sbFRvOiB7IHk6IDAgfSwgZWFzZTogUG93ZXIyLmVhc2VPdXRcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgIC8vIGFuaW1hdGUgU1ZHIG91dFxuICAgICAgVHdlZW5MaXRlLnRvKHNpZGVCYXIsIC4zLCB7XG4gICAgICAgIHg6IFwiLTEwMFwiLFxuICAgICAgICB6OiBcIi4wMDFcIixcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCJcbiAgICAgIH0pO1xuXG4gICAgICAvLyBhbmltYXRlIHNpZGViYXIgb3V0XG4gICAgICBpZiAoIHNpZGVCYXIubGVuZ3RoID4gMCApIHtcbiAgICAgICAgVHdlZW5MaXRlLnRvKCQoXCIuZGl2aWRlci1zdmdcIiksIC4zLCB7XG4gICAgICAgICAgeTogXCIzMFwiLFxuICAgICAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCJcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFxuICBcblxuICAvLyAkKHdpbmRvdykub24oXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgLy8gICAvLyBtb2RpZnkgdGhlIFwicmV2YXBpMVwiIHBhcnQgd2l0aCB5b3VyIHNsaWRlclwicyBBUEkgbmFtZSBsaXN0ZWQgaGVyZTpcbiAgLy8gICAvLyBodHRwczovL3d3dy50aGVtZXB1bmNoLmNvbS9yZXZzbGlkZXItZG9jL2FwaS9cbiAgLy8gICBpZiAoIHR5cGVvZiByZXZhcGkxICE9PSBcInVuZGVmaW5lZFwiICkge1xuICAvLyAgICAgY29uc29sZS5sb2coXCJyZXYgc3RhcnRcIik7XG4gIC8vICAgICByZXZhcGkxLnJldnN0YXJ0KCk7XG4gIC8vICAgfVxuICAvL1xuICAvLyB9KTtcblxufSkoKTtcblxuLy8gZGVjbGFyZSB2YXIgSXNvdG9wZTogYW55O1xuLy8gY2xhc3MgaXNvIHtcbi8vICAgICBjb25zdHJ1Y3RvcigpIHtcbi8vICAgICB9XG4vLyAgICAgaW5pdCgpOmFueXtcbi8vICAgICAgICAgdmFyIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdyaWRcIik7XG4vLyAgICAgICAgIHZhciBpc290ID0gbmV3IElzb3RvcGUoIGVsZW0sIHtcbi8vICAgICAgICAgICAgIC8vIG9wdGlvbnNcbi8vICAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogXCIuZ3JpZC1pdGVtXCIsXG4vLyAgICAgICAgICAgICBsYXlvdXRNb2RlOiBcImZpdFJvd3NcIlxuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgY29uc29sZS5sb2coJChcIi5ncmlkXCIpKTtcbi8vICAgICB9XG4vLyB9XG4iLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi8uLi9wYXJ0aWFscy91dGlsc1wiO1xuXG5jbGFzcyBTZWFyY2hDb21wb25lbnQge1xuICAkc2VhcmNoVHJpZ2dlcjogSlF1ZXJ5O1xuICAkc2VhcmNoQ2xvc2VUcmlnZ2VyOiBKUXVlcnk7XG4gICRzZWFyY2hGb3JtOiBKUXVlcnk7XG4gICRzZWFyY2hCdXR0b25BcmVhOiBKUXVlcnk7XG4gICRpY29uOiBKUXVlcnk7XG4gICRmb3JtOiBKUXVlcnk7XG4gICRpbnB1dDogSlF1ZXJ5O1xuICAkd2lkdGg6IG51bWJlcjtcbiAgJGhlaWdodDogbnVtYmVyO1xuICBpc09wZW46IGJvb2xlYW47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyID0gJChcIi5tZXRhLXNlYXJjaC10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciA9ICQoXCIuc3VwZXItc2VhcmNoLWNsb3NlXCIpO1xuICAgIHRoaXMuJHNlYXJjaEZvcm0gPSAkKFwiLnN1cGVyLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRzZWFyY2hCdXR0b25BcmVhID0gJChcIi5tZXRhLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRpY29uID0gdGhpcy4kc2VhcmNoVHJpZ2dlci5jaGlsZHJlbihcImlcIik7XG4gICAgdGhpcy4kZm9ybSA9IHRoaXMuJHNlYXJjaEZvcm0uZmluZChcIi5ldC1zZWFyY2hcIik7XG4gICAgdGhpcy4kaW5wdXQgPSB0aGlzLiRmb3JtLmZpcnN0KCk7XG4gICAgdGhpcy4kd2lkdGggPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gICAgdGhpcy4kaGVpZ2h0ID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS5oZWlnaHQoKTtcbiAgfVxuXG4gIHJlbG9hZCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCBSZWxvYWRcIik7XG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlciA9ICQoXCIubWV0YS1zZWFyY2gtdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIgPSAkKFwiLnN1cGVyLXNlYXJjaC1jbG9zZVwiKTtcbiAgICB0aGlzLiRzZWFyY2hGb3JtID0gJChcIi5zdXBlci1zZWFyY2hcIik7XG4gICAgdGhpcy4kc2VhcmNoQnV0dG9uQXJlYSA9ICQoXCIubWV0YS1zZWFyY2hcIik7XG4gICAgdGhpcy4kaWNvbiA9IHRoaXMuJHNlYXJjaFRyaWdnZXIuY2hpbGRyZW4oXCJpXCIpO1xuICAgIHRoaXMuJGZvcm0gPSAkKFwiLmV0LXNlYXJjaFwiKTtcbiAgICB0aGlzLiR3aWR0aCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgICB0aGlzLiRoZWlnaHQgPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLmhlaWdodCgpO1xuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMub3BlblNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgfVxuXG4gIGdldFRvcFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaFRyaWdnZXIub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICB9XG5cbiAgZ2V0TGVmdFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaFRyaWdnZXIub2Zmc2V0KCkubGVmdDtcbiAgfVxuXG4gIGNsb3NlU2VhcmNoKCBldmVudCApIHtcblxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cbiAgICBsZXQgYW5pbWF0aW9uID0gbmV3IFRpbWVsaW5lTGl0ZSgpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciwgLjIsIHtcbiAgICAgIHRvcDogXCI1JVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCJcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjI1JVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gICAgYW5pbWF0aW9uLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC4yLCB7XG4gICAgICBsZWZ0OiB0aGlzLmdldExlZnRQb3NpdGlvbigpLFxuICAgICAgdG9wOiB0aGlzLmdldFRvcFBvc2l0aW9uKCksXG4gICAgICB3aWR0aDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBkZWxheTogLjMsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCJcbiAgICAgICAgfSk7XG4gICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRpY29uLCAuMiwge1xuICAgICAgICAgIHRvcDogXCI1MCVcIixcbiAgICAgICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgICAgfSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KS50byh0aGlzLiRzZWFyY2hGb3JtLCAuNCwge1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc2VhcmNoRm9ybS5jc3Moe1xuICAgICAgICAgIFwiei1pbmRleFwiOiAtMSxcbiAgICAgICAgICBcImxlZnRcIjogMCxcbiAgICAgICAgICBcInRvcFwiOiAwLFxuICAgICAgICAgIFwid2lkdGhcIjogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgICAgIFwiaGVpZ2h0XCI6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgfSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcblxuICB9XG5cbiAgb3BlblNlYXJjaChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cbiAgICAvLyBwcmV2ZW50IGJ1dHRvbiBmcm9tIGJlaW5nIHVzZWQgb25jZSBzZWFyY2ggaXMgb3BlblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIuYmx1cigpO1xuXG4gICAgdGhpcy4kc2VhcmNoRm9ybS5jc3Moe1xuICAgICAgbGVmdDogdGhpcy5nZXRMZWZ0UG9zaXRpb24oKSxcbiAgICAgIHRvcDogdGhpcy5nZXRUb3BQb3NpdGlvbigpLFxuICAgICAgd2lkdGg6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgXCJ6LWluZGV4XCI6IDk5OVxuICAgIH0pO1xuXG4gICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIGFuaW1hdGlvbi50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuMlxuICAgIH0pLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC4yLCB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gICAgICBiYWNrZ3JvdW5kOiBcIiMzNTM3M0RcIixcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICBvdmVyZmxvd1k6IFwic2Nyb2xsXCJcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgIHRvcDogXCIxMTAlXCIsXG4gICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIsIC4zLCB7XG4gICAgICB0b3A6IFwiMyVcIixcbiAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgZGVsYXk6IC40LFxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGZvcm0sIC40LCB7XG4gICAgICB0b3A6IFwiMjAlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICAgIGVhc2U6IEV4cG8uZWFzZUluT3V0XG4gICAgfSk7XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggbG9hZGVkXCIpO1xuICAgIC8vIHRoaXMub3BlblNlYXJjaCgpO1xuICAgIHRoaXMuJGlucHV0LmtleXVwKChldmVudCkgPT4ge1xuICAgICAgLy8gaWYga2V5IGlzIGVudGVyIC0gYW5pbWF0ZSBvdXRcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTZWFyY2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMub3BlblNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICBcbiAgICAkKFwiYm9keVwiKS5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT09IDI3ICYmIHRoaXMuaXNPcGVuICkge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5sZXQgU2VhcmNoQm94ID0gbmV3IFNlYXJjaENvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCb3g7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBTZWFyY2hCb3ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hcIjtcblxuaW50ZXJmYWNlIE5hdlN0YXRlIHtcbiAgbmF2RW5hYmxlZDogYm9vbGVhbjtcbiAgbW9iaWxlOiBib29sZWFuO1xuICB0YWJsZXQ6IGJvb2xlYW47XG4gIGxhcHRvcDogYm9vbGVhbjtcbiAgZGVza3RvcDogYm9vbGVhbjtcbn1cblxuY2xhc3MgTmF2Q29tcG9uZW50IHtcbiAgJG5hdlRyaWdnZXI6IEhUTUxFbGVtZW50O1xuICAkbmF2RHJvcGRvd246IEhUTUxFbGVtZW50O1xuICAkbG93ZXJDb250YWluZXI6IEpRdWVyeTtcbiAgJHVwcGVyQ29udGFpbmVyOiBKUXVlcnk7XG4gICRuYXZNZXRhOiBKUXVlcnk7XG4gICRkcm9wRG93bldyYXBwZXI6IEpRdWVyeTtcbiAgJHNlYXJjaDogSlF1ZXJ5O1xuICAkZHJvcERvd25Db250ZW50OiBKUXVlcnk7XG5cbiAgc3RhdGU6IE5hdlN0YXRlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy4kbmF2VHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LXRyaWdnZXJcIik7XG4gICAgdGhpcy4kbmF2RHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV0LWRyb3Bkb3duLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kbG93ZXJDb250YWluZXIgPSAkKFwiLmxvd2VyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyID0gJChcIi51cHBlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiRuYXZNZXRhID0gJChcIi5ldC1uYXYtbWV0YVwiKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIgPSAkKFwiLmV0LWRyb3Bkb3duLXdyYXBwZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoID0gJChcIiNuYXYteGZlclwiKTtcbiAgICB0aGlzLiRkcm9wRG93bkNvbnRlbnQgPSAkKFwiLmV0LWRyb3Bkb3duLWNvbnRlbnRcIik7XG5cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIC8qXG4gICBNb2JpbGUgTmF2IGZ1bmN0aW9uYWxpdHlcbiAgICovXG5cbiAgcmVsb2FkKCkge1xuXG4gICAgdGhpcy4kbmF2VHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LXRyaWdnZXJcIik7XG4gICAgdGhpcy4kbmF2RHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV0LWRyb3Bkb3duLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kbG93ZXJDb250YWluZXIgPSAkKFwiLmxvd2VyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyID0gJChcIi51cHBlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiRuYXZNZXRhID0gJChcIi5ldC1uYXYtbWV0YVwiKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIgPSAkKFwiLmV0LWRyb3Bkb3duLXdyYXBwZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoID0gJChcIiNuYXYteGZlclwiKTtcbiAgICB0aGlzLiRkcm9wRG93bkNvbnRlbnQgPSAkKFwiLmV0LWRyb3Bkb3duLWNvbnRlbnRcIik7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICBkZXNrdG9wOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIG9wZW5OYXYoIGV2ZW50OiBFdmVudCApOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJCh0aGlzLiRuYXZEcm9wZG93bikuYWRkQ2xhc3MoXCJtZW51LWlzLWFjdGl2ZVwiKTtcbiAgICBUd2Vlbk1heC50byh0aGlzLiRuYXZEcm9wZG93biwgLjMsIHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGNsb3NlTmF2KCBldmVudDogRXZlbnQgKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKHRoaXMuJG5hdkRyb3Bkb3duKS5yZW1vdmVDbGFzcyhcIm1lbnUtaXMtYWN0aXZlXCIpO1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuJG5hdkRyb3Bkb3duLCAuMywge1xuICAgICAgICB0b3A6IFwiLTEwMCVcIixcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5hdk9wZW5Jbml0KCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQodGhpcy4kbmF2VHJpZ2dlcikub24oXCJjbGlja1wiLCB0aGlzLm9wZW5OYXYuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcy4kbmF2VHJpZ2dlcikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBuYXZDbG9zZSggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcblxuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQoXCIuZXQtY2xvc2VcIikub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlTmF2LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiLmV0LWNsb3NlXCIpLm9mZigpO1xuICAgIH1cblxuICB9XG5cbiAgbmF2SXRlbUNsaWNrKCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuXG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKFwiYVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9ICQodGhpcyk7XG4gICAgICAgIHNlbGVjdGVkLm5leHQoXCJ1bFwiKS5yZW1vdmVDbGFzcyhcImlzLWhpZGRlblwiKS5wYXJlbnQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5wYXJlbnQoXCJ1bFwiKS5hZGRDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5jaGlsZHJlbihcImFcIikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBnb2JhY2soIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKFwiLmdvLWJhY2sgPiBhXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZWN0ZWQucGFyZW50KFwibGlcIikucGFyZW50KFwiLmV0LXNlY29uZGFyeS1kcm9wZG93blwiKS5hZGRDbGFzcyhcImlzLWhpZGRlblwiKS5wYXJlbnQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5wYXJlbnQoXCJ1bFwiKS5yZW1vdmVDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIuZ28tYmFjayA+IGFcIikub2ZmKCk7XG4gICAgfVxuXG5cbiAgfVxuXG4gIG1vdmVOYXZpZ2F0aW9uTW9iaWxlKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibW92ZSBuYXZpZ2F0aW9uIG1vYmlsZVwiKTtcblxuICAgIHRoaXMuJHNlYXJjaC5kZXRhY2goKTtcbiAgICB0aGlzLiRuYXZNZXRhLmRldGFjaCgpO1xuICAgIHRoaXMuJGxvd2VyQ29udGFpbmVyLmRldGFjaCgpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlci5kZXRhY2goKTtcbiAgICB0aGlzLiRsb3dlckNvbnRhaW5lci5pbnNlcnRBZnRlcih0aGlzLiR1cHBlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kbmF2TWV0YS5pbnNlcnRCZWZvcmUodGhpcy4kdXBwZXJDb250YWluZXIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRkcm9wRG93bldyYXBwZXIpO1xuICAgIHRoaXMuJG5hdk1ldGEuYXBwZW5kKHRoaXMuJHNlYXJjaCk7XG4gIH1cblxuICBtb3ZlTmF2aWdhdGlvblRhYmxldCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiB0YWJsZXRcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guZGV0YWNoKCk7XG4gICAgdGhpcy4kbG93ZXJDb250YWluZXIuZGV0YWNoKCk7XG4gICAgdGhpcy4kdXBwZXJDb250YWluZXIuYXBwZW5kKHRoaXMuJG5hdk1ldGEpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRsb3dlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyLmluc2VydEFmdGVyKHRoaXMuJHVwcGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIucHJlcGVuZCh0aGlzLiRzZWFyY2gpO1xuICB9XG5cbiAgbW92ZU5hdmlnYXRpb25EZWtzdG9wKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibW92ZSBuYXZpZ2F0aW9uIGRlc2t0b3BcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guaW5zZXJ0QmVmb3JlKHRoaXMuJGRyb3BEb3duQ29udGVudCk7XG5cbiAgfVxuXG4gIGRpc2FibGVNb2JpbGVOYXYoKSB7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIk5hdiB0dXJuZWQgb2ZmXCIpO1xuICAgIHRoaXMubmF2T3BlbkluaXQoZmFsc2UpO1xuICAgIHRoaXMubmF2Q2xvc2UoZmFsc2UpO1xuICAgIHRoaXMubmF2SXRlbUNsaWNrKGZhbHNlKTtcbiAgICB0aGlzLmdvYmFjayhmYWxzZSk7XG4gICAgdGhpcy5zdGF0ZS5uYXZFbmFibGVkID0gZmFsc2U7XG5cbiAgfVxuXG4gIGVuYWJsZU1vYmlsZU5hdigpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIk5hdiB0dXJuZWQgb25cIik7XG4gICAgdGhpcy5uYXZPcGVuSW5pdCh0cnVlKTtcbiAgICB0aGlzLm5hdkNsb3NlKHRydWUpO1xuICAgIHRoaXMubmF2SXRlbUNsaWNrKHRydWUpO1xuICAgIHRoaXMuZ29iYWNrKHRydWUpO1xuXG4gICAgdGhpcy5zdGF0ZS5uYXZFbmFibGVkID0gdHJ1ZTtcblxuICB9XG5cbiAgYnJlYWtQb2ludE1vYmlsZSgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgTW9iaWxlXCIpO1xuXG4gICAgaWYgKCAhdGhpcy5zdGF0ZS5uYXZFbmFibGVkICkge1xuICAgICAgdGhpcy5lbmFibGVNb2JpbGVOYXYoKTtcbiAgICB9XG4gICAgdGhpcy5tb3ZlTmF2aWdhdGlvbk1vYmlsZSgpO1xuICB9XG5cbiAgYnJlYWtQb2ludFRhYmxldCggcHJldlN0YXRlICkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBUYWJsZXRcIik7XG4gICAgaWYgKCAhdGhpcy5zdGF0ZS5uYXZFbmFibGVkICkge1xuICAgICAgdGhpcy5lbmFibGVNb2JpbGVOYXYoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uVGFibGV0KCk7XG4gIH1cblxuICBicmVha1BvaW50TGFwdG9wKCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IExhcHRvcFwiKTtcblxuICAgIGlmICggdGhpcy5zdGF0ZS5uYXZFbmFibGVkICkge1xuICAgICAgdGhpcy5kaXNhYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuXG4gICAgLy8gaWYgcHJldiBzdGF0ZSB3YXMgdGFibGV0IGRvIHRoaXM6XG4gICAgaWYgKCBwcmV2U3RhdGUuZGVza3RvcCA9PT0gZmFsc2UgfHwgcHJldlN0YXRlLm1vYmlsZSA9PT0gdHJ1ZSApIHtcblxuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvblRhYmxldCgpO1xuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvbkRla3N0b3AoKTtcbiAgICB9XG4gIH1cblxuICBicmVha1BvaW50RGVza3RvcCggcHJldlN0YXRlICkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBEZXNrdG9wXCIpO1xuXG4gICAgaWYgKCBwcmV2U3RhdGUubGFwdG9wID09PSBmYWxzZSB8fCBwcmV2U3RhdGUubW9iaWxlID09PSB0cnVlICkge1xuXG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uVGFibGV0KCk7XG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uRGVrc3RvcCgpO1xuICAgIH1cblxuICB9XG5cbiAgbmF2UmVzaXplKCkge1xuICAgIC8qXG4gICAgIE1vYmlsZVxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLm1vYmlsZSApIHtcblxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS5tb2JpbGUgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludE1vYmlsZSgpO1xuICAgICAgfVxuICAgICAgLy8gVHVybiBtb2JpbGUgb25cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiB0cnVlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBUYWJsZXRcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIC8vIHRhYmxldCBhbmQgaGlnaGVyXG4gICAgICAvLyBkbyBvbmNlXG4gICAgICBpZiAoICF0aGlzLnN0YXRlLnRhYmxldCApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50VGFibGV0KHByZXZTdGF0ZSk7XG4gICAgICB9XG4gICAgICAvLyBUdXJuIG1vYmlsZSBvblxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IHRydWUsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qXG4gICAgIExhcHRvcFxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIGxldCBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS5sYXB0b3AgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludExhcHRvcChwcmV2U3RhdGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiB0cnVlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgIERlc2t0b3BcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5kZXNrdG9wICkge1xuXG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS5kZXNrdG9wICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnREZXNrdG9wKHByZXZTdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIG5hdkxvYWQoKSB7XG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubW9iaWxlICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnRNb2JpbGUoKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogdHJ1ZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy50YWJsZXQgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludFRhYmxldCh0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogdHJ1ZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnRMYXB0b3AodGhpcy5zdGF0ZSk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiB0cnVlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5kZXNrdG9wICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnREZXNrdG9wKHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIk5hdiBsb2FkZWRcIik7XG5cbiAgICB0aGlzLm5hdkxvYWQoKTtcbiAgICAvLyBTZWFyY2hCb3guaW5pdCgpO1xuXG4gICAgLyoqKioqKioqKioqKioqKipcbiAgICAgTkFWIFJFU0laRSBFVkVOVFxuICAgICAqKioqKioqKioqKioqKiovXG5cbiAgICB3aW5kb3cub25yZXNpemUgPSAoIGV2ZW50ICkgPT4ge1xuICAgICAgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgICA/IHNldFRpbWVvdXQodGhpcy5uYXZSZXNpemUuYmluZCh0aGlzKSwgMzAwKVxuICAgICAgICA6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5uYXZSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuXG4gIH1cbn1cblxubGV0IE5hdiA9IG5ldyBOYXZDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuXG5jbGFzcyBTdmdIZWFkZXJDb21wb25lbnQge1xuICBzdmc6IEpRdWVyeTtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHdpbmRvdzogSlF1ZXJ5O1xuICB3aW5XaWR0aDogbnVtYmVyO1xuICBwcm9wb3J0aW9uOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdmcgPSAkKFwiLmRpdmlkZXItc3ZnXCIpO1xuICAgIHRoaXMud2luZG93ID0gJCh3aW5kb3cpO1xuICAgIHRoaXMucHJvcG9ydGlvbiA9IDE4O1xuICAgIHRoaXMud2luV2lkdGggPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53aW5XaWR0aCAvIHRoaXMucHJvcG9ydGlvbjtcbiAgfVxuXG4gIF9zZXRXaW5kb3dXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiAkKHdpbmRvdykud2lkdGgoKTtcbiAgfVxuXG4gIF9zZXRTdmdIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBsZXQgaGVpZ2h0ID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKSAvIDE4O1xuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuXG4gIHJlc2l6ZVN2ZygpIHtcblxuICAgIHRoaXMud2luV2lkdGggPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5fc2V0U3ZnSGVpZ2h0KCk7XG5cbiAgICAvLyBzZXQgd2lkdGggb2YgaXRlbVxuICAgIC8vIHRoaXMuc3ZnLmF0dHIoXCJ3aWR0aFwiLCB0aGlzLndpbldpZHRoKTtcbiAgICB0aGlzLnN2Zy5jc3MoXCJ3aWR0aFwiLCB0aGlzLndpbldpZHRoKTtcblxuICAgIC8vIHNldCBoZWlnaHQgcHJvcG9ydGlvbiBvZiAyOFxuICAgIHRoaXMuc3ZnLmF0dHIoXCJoZWlnaHRcIiwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuc3ZnLmhlaWdodCh0aGlzLmhlaWdodCk7XG4gIH1cblxuICBhbmltYXRlSW4oKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJBbmltYXRlIEluXCIpO1xuXG4gICAgdGhpcy5zdmcgPSAkKFwiLmRpdmlkZXItc3ZnXCIpO1xuICAgIHRoaXMucHJvcG9ydGlvbiA9IDE4O1xuICAgIHRoaXMud2luZG93ID0gJCh3aW5kb3cpO1xuICAgIHRoaXMud2luV2lkdGggPSB0aGlzLndpbmRvdy53aWR0aCgpO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53aW5XaWR0aCAvIHRoaXMucHJvcG9ydGlvbjtcblxuICAgIC8vIHNldCB3aWR0aCBvZiBpdGVtXG4gICAgdGhpcy5zdmcuYXR0cihcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuXG4gICAgLy8gc2V0IGhlaWdodCBwcm9wb3J0aW9uIG9mIDI4XG4gICAgdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zdmcuaGVpZ2h0KHRoaXMuaGVpZ2h0KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLnN2ZywgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgYm90dG9tOiBcIi0zcHhcIixcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJTdmcgaGVhZGVyIGxvYWRlZFwiKTtcblxuICAgIC8vIHRoaXMuc3ZnLmhlaWdodCh0aGlzLl9zZXRTdmdIZWlnaHQoKSk7XG4gICAgLy8gdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLl9zZXRTdmdIZWlnaHQoKSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy5zdmcsIC4xLCB7XG4gICAgICB5OiBcIjNcIixcbiAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgd2lkdGg6IHRoaXMuX3NldFdpbmRvd1dpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuX3NldFN2Z0hlaWdodCgpLFxuICAgICAgZGVsYXk6IDAsXG4gICAgICBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiXG4gICAgfSk7XG5cblxuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMucmVzaXplU3ZnLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IFN2Z0hlYWRlciA9IG5ldyBTdmdIZWFkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3ZnSGVhZGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG4vLyBUT0RPOiBTaWRlYmFyIGltYWdlIGxvYWRpbmdcbmNsYXNzIEltYWdlTG9hZGVyQ29tcG9uZW50IHtcbiAgYXJyOiBzdHJpbmdbXTtcbiAgYm9keTogSlF1ZXJ5O1xuICBjb250ZW50OiBKUXVlcnk7XG4gIGhlcm86IEpRdWVyeTtcbiAgaGFzSGVybzogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXJyID0gW107XG4gICAgdGhpcy5ib2R5ID0gJChcImJvZHlcIik7XG4gICAgdGhpcy5jb250ZW50ID0gJChcIiNjb250ZW50XCIpO1xuICAgIHRoaXMuaGVybyA9ICQoXCIuaGVyb1wiKTtcbiAgICB0aGlzLmhhc0hlcm8gPSB0aGlzLmhlcm8ubGVuZ3RoO1xuICB9XG5cbiAgYW5pbWF0ZUJsb2dQcmltYXJ5KCk6IHZvaWQge1xuICAgIGxldCBibG9nUHJpbWFyeSA9ICQoXCIucHJpbWFyeVwiKTtcbiAgICBsZXQgYmxvZ0JnSW1hZ2UgPSBibG9nUHJpbWFyeS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuXG4gICAgaWYgKCBibG9nQmdJbWFnZSAhPT0gXCJub25lXCIgKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBUd2VlbkxpdGVcbiAgICAgICAgICAudG8oYmxvZ1ByaW1hcnksIC4zLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB6OiBcIi4wMDFcIixcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfSwgMzAwKTtcbiAgICB9XG4gIH1cblxuICBhbmltYXRlSGVyb0hlYWRlcigpOiB2b2lkIHtcbiAgICBsZXQgYiA9IHRoaXMuaGVyby5maW5kKFwiLmhlcm8tYmFja2dyb3VuZFwiKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuXG4gICAgaWYgKCBiICE9PSBcIm5vbmVcIiApIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgIHRoaXMuaGVyby5hZGRDbGFzcyhcImxvYWRlZFwiKTtcblxuICAgICAgICBUd2VlbkxpdGVcbiAgICAgICAgICAudG8odGhpcy5oZXJvLCAuNCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfSwgMzAwKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmhlcm8uYWRkQ2xhc3MoXCJsb2FkZWRcIik7XG5cbiAgICB9XG4gIH1cblxuICBhbmltYXRlQmxvZ0FydGljbGVzKCk6IHZvaWQge1xuICAgIGxldCBhbmltYXRlID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGFuaW1hdGUudG8odGhpcy5hcnJbIGkgXSwgMC4xLCB7IG9wYWNpdHk6IFwiMVwiLCBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByZWxvYWRJbWFnZXMoKTogdm9pZCB7XG4gICAgdGhpcy5hcnIgPSBbXTtcblxuICAgIHRoaXMuY29udGVudC5pbWFnZXNMb2FkZWQoeyBiYWNrZ3JvdW5kOiB0cnVlIH0sICgpID0+IHtcblxuICAgICAgICAvLyBCbG9nIHByaW1hcnkgYXJ0aWNsZVxuICAgICAgICB0aGlzLmJvZHkuaGFzQ2xhc3MoXCJibG9nXCIpID8gdGhpcy5hbmltYXRlQmxvZ1ByaW1hcnkoKSA6IFwiXCI7XG5cbiAgICAgICAgLy8gSGVybyBoZWFkZXIgaW50cm9cbiAgICAgICAgdGhpcy5oYXNIZXJvID4gMCA/IHRoaXMuYW5pbWF0ZUhlcm9IZWFkZXIoKSA6IFwiXCI7XG5cbiAgICAgIH0pXG4gICAgICAuYWx3YXlzKGZ1bmN0aW9uICggaW5zdGFuY2UgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBsb2FkZWRcIik7XG4gICAgICB9KVxuICAgICAgLmRvbmUoKCBpbnN0YW5jZSApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIHN1Y2Nlc3NmdWxseSBsb2FkZWRcIik7XG5cbiAgICAgICAgLy8gQW5pbWF0aW9uIGZvciBCbG9nIGluZGV4IGhvbWVwYWdlXG4gICAgICAgIHRoaXMuYW5pbWF0ZUJsb2dBcnRpY2xlcygpO1xuICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKFwiaW1nTG9hZGVkXCIpO1xuICAgICAgICBcbiAgICAgICAgLy8gRXhhbXBsZSBvbiBob3cgdG8gdHJpZ2dlciBldmVudHMgZWxzZXdoZXJlXG4gICAgICAgIC8vICQoZG9jdW1lbnQpLm9uKFwiaW1nTG9hZGVkXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgIH0pXG4gICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBsb2FkZWQsIGF0IGxlYXN0IG9uZSBpcyBicm9rZW5cIik7XG4gICAgICB9KVxuICAgICAgLnByb2dyZXNzKCggaW5zdGFuY2UsIGltYWdlICkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gaW1hZ2UuaXNMb2FkZWQgPyBcImxvYWRlZFwiIDogXCJicm9rZW5cIjtcblxuICAgICAgICBpZiAoIHJlc3VsdCApIHtcbiAgICAgICAgICB0aGlzLmFyci5wdXNoKGltYWdlLmltZyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJpbWFnZSBpcyBcIiArIHJlc3VsdCArIFwiIGZvciBcIiArIGltYWdlLmltZy5zcmMpO1xuICAgICAgfSk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuXG4gICAgY29uc29sZS5sb2coXCJJbWFnZSBQcmVsb2FkZXIgTW9kdWxlXCIpO1xuXG4gICAgdGhpcy5wcmVsb2FkSW1hZ2VzKCk7XG4gIH1cbn1cblxubGV0IEltYWdlTG9hZGVyID0gbmV3IEltYWdlTG9hZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlTG9hZGVyOyIsImRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG5jb25zdCAkID0galF1ZXJ5O1xuXG5jbGFzcyBQcm9jZXNzQ29tcG9uZW50IHtcblxuICBjb250YWluZXI6IEpRdWVyeTtcbiAgaXRlbTogSlF1ZXJ5O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChcIi5wcm9jZXNzLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLml0ZW0gPSAkKFwiLnByb2Nlc3MtaXRlbS1jb250YWluZXJcIik7XG4gIH1cblxuICBkZXNjX29fYW5pbWF0ZSgpIHtcbiAgICBpZiAoICQoXCIuZGVzYy1vLWFuaW1hdGVcIikubGVuZ3RoID4gMCApIHtcbiAgICAgIGxldCB3aXBlQW5pbWF0aW9uID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICB3aXBlQW5pbWF0aW9uLmFkZChbXG4gICAgICAgIFR3ZWVuTWF4LmZyb21UbygkKFwiLmRlc2Mtby1pbWFnZS0xXCIpLCAxLCB7IHlQZXJjZW50OiAwIH0sIHsgeVBlcmNlbnQ6IC0yMCwgZWFzZTogUG93ZXIwLmVhc2VJbk91dCB9KVxuICAgICAgXSk7XG5cbiAgICAgIGxldCB3aXBlQW5pbWF0aW9uMiA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgd2lwZUFuaW1hdGlvbjIuYWRkKFtcbiAgICAgICAgVHdlZW5NYXguZnJvbVRvKCQoXCIuZGVzYy1vLWltYWdlLTJcIiksIDEsIHsgeVBlcmNlbnQ6IDAsIH0sIHsgeVBlcmNlbnQ6IC0xMDUsIGVhc2U6IFBvd2VyMC5lYXNlSW5PdXQgfSlcbiAgICAgIF0pO1xuXG4gICAgICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cbiAgICAgIGxldCBzY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgICAge1xuICAgICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5kZXNjLW8tYW5pbWF0ZVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAkKFwiLmRlc2Mtby1hbmltYXRlXCIpLmhlaWdodCgpLFxuICAgICAgICAgIG9mZnNldDogLTEwMFxuICAgICAgICB9KVxuICAgICAgLy8gLnNldFBpbihcIi5kZXNjLW8taW1hZ2UtMVwiKVxuICAgICAgICAuc2V0VHdlZW4od2lwZUFuaW1hdGlvbilcbiAgICAgICAgLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBFbClcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgICAuYWRkVG8oY29udHJvbGxlcik7XG5cbiAgICAgIGxldCBzY2VuZTIgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICAgIHtcbiAgICAgICAgICB0cmlnZ2VyRWxlbWVudDogXCIuZGVzYy1vLWFuaW1hdGVcIixcbiAgICAgICAgICBkdXJhdGlvbjogJChcIi5kZXNjLW8tYW5pbWF0ZVwiKS5oZWlnaHQoKSArIDEwMCxcbiAgICAgICAgfSlcbiAgICAgIC8vIC5zZXRQaW4oXCIuZGVzYy1vLWltYWdlLTFcIilcbiAgICAgICAgLnNldFR3ZWVuKHdpcGVBbmltYXRpb24yKVxuICAgICAgICAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMiAoZHVyYXRpb246IEVsKVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAgIC5hZGRUbyhjb250cm9sbGVyKTtcbiAgICB9XG4gIH1cblxuICBhbmltYXRlSW4oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgIGxldCBpdGVtID0gdGhpcy5pdGVtO1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcbiAgICBsZXQgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICB7XG4gICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5wcm9jZXNzLWNvbnRhaW5lclwiLFxuICAgICAgICBkdXJhdGlvbjogY29udGFpbmVyLmhlaWdodCgpLFxuICAgICAgICAvLyBvZmZzZXQ6IHRoaXMuYXNpZGVPZmZzZXQsXG4gICAgICB9KVxuICAgICAgLm9uKFwiZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdGVtLmZpbmQoXCIucHJvY2Vzcy1pdGVtLWlubmVyXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICAgIGNvbnRhaW5lci5maW5kKFwiaW1nXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICB9KVxuICAgICAgLy8gLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBvZmZzZXQ/KVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAuYWRkVG8oY29udHJvbGxlcik7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuYW5pbWF0ZUluKCk7XG4gICAgdGhpcy5kZXNjX29fYW5pbWF0ZSgpO1xuICB9XG59XG5cbmxldCBQcm9jZXNzTWFwID0gbmV3IFByb2Nlc3NDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvY2Vzc01hcDsiLCJjb25zdCAkID0galF1ZXJ5O1xuXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgU3RpY2t5U2lkZWJhckNvbXBvbmVudCB7XG5cbiAgaXNBbmltYXRpbmc6IGJvb2xlYW47XG4gIGNvbnRlbnRXcmFwcGVyOiBKUXVlcnk7XG4gIGNvbnRlbnRPZmZzZXRUb3A6IG51bWJlcjtcbiAgY29udGVudFdyYXBwZXJIZWlnaHQ6IG51bWJlcjtcbiAgc2Nyb2xsVG9wOiBudW1iZXI7XG4gIGFzaWRlOiBKUXVlcnk7XG4gIHNpZGViYXJXcmFwcGVyOiBKUXVlcnk7XG4gIHdpbmRvd0hlaWdodDogbnVtYmVyO1xuICBzaWRlYmFySGVpZ2h0OiBudW1iZXI7XG4gIGZvb3Rlck9mZnNldDogbnVtYmVyO1xuICBmb290ZXJIZWlnaHQ6IG51bWJlcjtcbiAgc2Nyb2xsaW5nRG93bjogYm9vbGVhbjtcbiAgbGFzdFNjcm9sbFRvcDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRlbnRXcmFwcGVyID0gJChcIi5zaWRlYmFyLWNvbnRlbnRcIik7XG4gICAgdGhpcy5hc2lkZSA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFySGVpZ2h0ID0gdGhpcy5hc2lkZS5vdXRlckhlaWdodCgpO1xuICAgIHRoaXMuc2lkZWJhcldyYXBwZXIgPSAkKFwiLnNlcnZpY2Utc2lkZWJhclwiKTtcbiAgfVxuXG4gIGNoZWNrU2lkZWJhcigpOiB2b2lkIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgc2lkZWJhciBpcyBmaXhlZCBvciBub3RcbiAgICBpZiAoICF0aGlzLmlzQW5pbWF0aW5nICYmIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLnRhYmxldCApIHtcbiAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuICAgICAgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSA/IHNldFRpbWVvdXQodGhpcy51cGRhdGVTaWRlYmFyUG9zaXRpb24uYmluZCh0aGlzKSwgMzAwKSA6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVTaWRlYmFyUG9zaXRpb24uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoaXMucmVzZXRTaWRlQmFyKCk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRTaWRlQmFyKCkge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpO1xuICAgIHRoaXMuYXNpZGUuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuICB9XG5cbiAgdXBkYXRlU2lkZWJhclBvc2l0aW9uKCk6IHZvaWQge1xuXG4gICAgdGhpcy5jaGVja1Njcm9sbERpcmVjdGlvbigpO1xuXG4gICAgLy8gZ2V0IGRpc3RhbmNlIGZyb20gdG9wIG9mIGNvbnRlbnRcbiAgICB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm9mZnNldCgpLnRvcCAtIDU7XG5cbiAgICB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0ID0gdGhpcy5jb250ZW50V3JhcHBlci5vdXRlckhlaWdodCgpOyAvLyBpbmNsdWRlIHBhZGRpbmcgYW5kIG1hcmdpblxuXG4gICAgLy8gZ2V0IHdoZXJlIHRvcCBvZiB3aW5kb3cgaXNcbiAgICB0aGlzLnNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblxuICAgIC8vIElmIHRoZSB3aW5kb3cgViBwb3NpdGlvbiBpcyBsZXNzIHRoYW4gdGhlIGNvbnRlbnQgViBwb3NpdGlvbiBtYWtlIHNpZGViYXIgbm9ybWFsXG4gICAgaWYgKCB0aGlzLnNjcm9sbFRvcCA8IHRoaXMuY29udGVudE9mZnNldFRvcCApIHtcbiAgICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIik7XG4gICAgICB0aGlzLmFzaWRlLmNzcyhcInRyYW5zaXRpb25cIiwgXCJ0b3AgLjNzXCIpO1xuXG4gICAgICAvLyBpZiB3aW5kb3cgViBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gY29udGVudCAtIGFkZCBzdGlja3lcbiAgICAgIC8vIDJuZCBjaGVja3MgdGhlIG9mZnNldCBvZiB0aGUgdG9wIG9mIHRoZSB3aW5kb3cgdG8gdGhlIHRvcCBvZiB0aGUgY29udGVudCAmJiB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRlbnQgaW4gcmVsYXRpb24gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSB3aW5kb3dcbiAgICB9IGVsc2UgaWYgKCB0aGlzLnNjcm9sbFRvcCA+PSB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgJiYgdGhpcy5zY3JvbGxUb3AgPCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0ICsgdGhpcy5zaWRlYmFySGVpZ2h0ICsgdGhpcy5jb250ZW50T2Zmc2V0VG9wIC0gdGhpcy53aW5kb3dIZWlnaHQgKSB7XG4gICAgICB0aGlzLmFzaWRlLmFkZENsYXNzKFwic3RpY2t5XCIpLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcblxuICAgICAgaWYgKCB0aGlzLnNjcm9sbGluZ0Rvd24gPT09IHRydWUgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcInRvcCAuM3NcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFzaWRlLmNzcyhcInRyYW5zaXRpb25cIiwgXCJcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbGV0IGFydGljbGVQYWRkaW5nVG9wID0gTnVtYmVyKGFydGljbGVzLmVxKDEpLmNzcyhcInBhZGRpbmctdG9wXCIpLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XG4gICAgICBpZiAoIHRoaXMuYXNpZGUuaGFzQ2xhc3MoXCJzdGlja3lcIikgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuICAgICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpLmNzcyhcInRvcFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0ICsgdGhpcy5zaWRlYmFySGVpZ2h0ICsgNDUgLSB0aGlzLndpbmRvd0hlaWdodCArIFwicHhcIik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgfVxuXG4gIGNoZWNrU2Nyb2xsRGlyZWN0aW9uKCkge1xuICAgIC8vIExvZyBjdXJyZW50IHNjcm9sbFBvaW50XG4gICAgbGV0IHN0ID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblxuICAgIC8vIGNvbXBhcmUgdG8gbGFzdCBzY3JvbGxQb2ludFxuICAgIGlmICggc3QgPiB0aGlzLmxhc3RTY3JvbGxUb3AgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNjcm9sbCBkb3duXCIpO1xuICAgICAgLy8gZG93bnNjcm9sbCBjb2RlXG4gICAgICB0aGlzLnNjcm9sbGluZ0Rvd24gPSB0cnVlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2Nyb2xsIHVwXCIpO1xuICAgICAgLy8gdXBzY3JvbGwgY29kZVxuICAgICAgdGhpcy5zY3JvbGxpbmdEb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gb24gY29tcGxldGUgLSBtYWtlIGxhc3QgU2Nyb2xsIHBvaW50IHRoZSBwb2ludCBhdCB3aGljaCB0aGV5IHN0YXJ0ZWQgc2Nyb2xsaW5nIGF0IGZpcnN0XG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gc3Q7XG4gIH1cblxuICBhbmltYXRlU2lkZWJhckluKCkge1xuICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJpbnRyb1wiKTtcblxuICAgIGxldCBzaWRlYmFySW50cm8gPSBUd2Vlbk1heC5mcm9tKHRoaXMuYXNpZGUsIC4zLCB7XG4gICAgICB4OiAtMTAwLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIHo6IC4wMDEsXG4gICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0LFxuICAgICAgZGVsYXk6IC41XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU3RpY2t5IHNpZGViYXIgbG9hZGVkXCIpO1xuXG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gMDtcbiAgICBpZiAoIHRoaXMuYXNpZGUubGVuZ3RoID4gMCApIHtcbiAgICAgIHRoaXMuY2hlY2tTaWRlYmFyKCk7XG5cbiAgICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcbiAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcblxuICAgICAgLy8gQW5pbWF0ZSBzaWRlIGJhciBpbiBvbiBsb2FkXG4gICAgICB0aGlzLmFuaW1hdGVTaWRlYmFySW4oKTtcbiAgICB9XG4gIH1cbn1cblxubGV0IFN0aWNreVNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdGlja3lTaWRlYmFyOyIsImltcG9ydCB7QnBzSW50ZXJmYWNlfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9icHMuaW50ZXJmYWNlXCI7XG5jb25zdCAkID0galF1ZXJ5O1xuXG4vLyBBZGQgaW50ZXJmYWNlIEpRdWVyeVNtb290aCB7XG4vLyBzbW9vdGhTdGF0ZSgpOnZvaWQ7XG4vLyB9XG4vLyBzbW9vdGhTdGF0ZShhcmc6IE9iamVjdCk6IEpRdWVyeTtcblxuY2xhc3MgVXRpbGl0eUNvbXBvbmVudCB7XG4gIHdpbmRvd1dpZHRoOiBudW1iZXI7XG4gIGJyZWFrcG9pbnQ6IG51bWJlcjtcbiAgYnJlYWtwb2ludHM6IG51bWJlcltdO1xuICBicHM6IEJwc0ludGVyZmFjZTtcblxuICBwcml2YXRlIF9zZXRCcmVha3BvaW50cyA9ICggYnBzOiBCcHNJbnRlcmZhY2UgKSA9PiB7XG4gICAgbGV0IGFyciA9IFtdO1xuXG4gICAgZm9yICggbGV0IGtleSBpbiBicHMgKSB7XG4gICAgICBpZiAoIGJwcy5oYXNPd25Qcm9wZXJ0eShrZXkpICkge1xuICAgICAgICBhcnIucHVzaChicHNbIGtleSBdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyLnJldmVyc2UoKTtcbiAgfTtcbiAgcHJpdmF0ZSBfY2hlY2tCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIG1ha2UgYnJlYWtwb2ludCBldmVudCBhdmFpbGFibGUgdG8gYWxsIGZpbGVzIHZpYSB0aGUgd2luZG93IG9iamVjdFxuICAgIGxldCBvbGRfYnJlYWtwb2ludCA9IHRoaXMuYnJlYWtwb2ludDtcblxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcblxuICAgIGlmICggb2xkX2JyZWFrcG9pbnQgIT09IHRoaXMuYnJlYWtwb2ludCApIHtcblxuICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoXCJicmVha3BvaW50Q2hhbmdlXCIsIFV0aWxzLmJyZWFrcG9pbnQpO1xuICAgIH1cbiAgfTtcbiAgcHJpdmF0ZSBfc2V0QnJlYWtwb2ludCA9ICgpID0+IHtcbiAgICAvLyBnZXQgYnJlYWtwb2ludCBmcm9tIGNzc1xuICAgIGxldCBib2R5ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KSxcbiAgICAgIHppbmRleCA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbIFwiei1pbmRleFwiIF07XG5cbiAgICB0aGlzLmJyZWFrcG9pbnQgPSBwYXJzZUludCh6aW5kZXgsIDEwKTtcbiAgfTtcbiAgcHJpdmF0ZSBfc2V0V2luZG93V2lkdGggPSAoKSA9PiB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMud2luZG93V2lkdGggPSAwO1xuICAgIHRoaXMuYnJlYWtwb2ludCA9IDMyMDtcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0gW107XG4gICAgdGhpcy5icHMgPSB7XG4gICAgICBtb2JpbGU6IDU0NCxcbiAgICAgIHRhYmxldDogNzY4LFxuICAgICAgbGFwdG9wOiA5OTIsXG4gICAgICBkZXNrdG9wOiAxMjAwLFxuICAgICAgZGVza3RvcF94bDogMTYwMFxuICAgIH07XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiVXRpbGl0aWVzIGxvYWRlZFwiKTtcblxuICAgIC8vIHNldCBicmVha3BvaW50IG9uIHdpbmRvdyBsb2FkXG4gICAgdGhpcy5fc2V0QnJlYWtwb2ludCgpO1xuICAgIHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgY29uc29sZS5sb2coXCJDdXJyZW50IEJyZWFrcG9pbnQgaXM6XCIsIHRoaXMuYnJlYWtwb2ludCk7XG5cbiAgICAvLyBjcmVhdGUgZnVsbCBhcnJheSBmb3IgaW1hZ2UgY29tcHJlc3Npb24gcmVmXG4gICAgdGhpcy5icmVha3BvaW50cyA9IHRoaXMuX3NldEJyZWFrcG9pbnRzKHRoaXMuYnBzKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLl9jaGVja0JyZWFrcG9pbnQpLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IFV0aWxzID0gbmV3IFV0aWxpdHlDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7Il19
