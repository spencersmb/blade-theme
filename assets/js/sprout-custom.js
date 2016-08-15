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
var imageLoader_1 = require("./partials/imageLoader");
var sticky_sidebar_1 = require("./partials/sticky-sidebar");
var processAnimation_1 = require("./partials/processAnimation");
var gallery_isotope_1 = require("./partials/gallery-isotope");
var header_slider_1 = require("./partials/header-slider");
var showcase_slider_1 = require("./partials/showcase-slider");
var testimonials_1 = require("./partials/testimonials");
var quote_builder_1 = require("./partials/quote-builder");
// import StickySidebar from "./partials/service-sidebar";
var $ = jQuery;
(function () {
    var App = (function () {
        function App() {
        }
        App.prototype.init = function () {
            console.log("App loaded");
            header_svg_1.default.init();
            utils_1.default.init();
            navigation_1.default.init();
            search_1.default.init();
            sticky_sidebar_1.default.init();
            testimonials_1.default.init();
            quote_builder_1.default.init();
            processAnimation_1.default.init(); // Global window anim and click control
        };
        return App;
    }());
    var bootstrap = new App();
    /** run all functions */
    $(document).ready(function () {
        bootstrap.init();
        imageLoader_1.default.init();
    });
    // Bind events to the imagesLoaded plugin here
    $(document).on("imgLoaded", function (e) {
        console.log("image loaded custom event");
        // check if page has gallery
        if ($(".gallery-container").length > 0) {
            gallery_isotope_1.default.init();
        }
        header_slider_1.default.init();
        showcase_slider_1.default.init();
    });
})();

},{"./navigation/components/search":2,"./navigation/navigation":3,"./partials/gallery-isotope":5,"./partials/header-slider":6,"./partials/header-svg":7,"./partials/imageLoader":8,"./partials/processAnimation":9,"./partials/quote-builder":10,"./partials/showcase-slider":11,"./partials/sticky-sidebar":12,"./partials/testimonials":13,"./partials/utils":14}],2:[function(require,module,exports){
"use strict";
var $ = jQuery;
var SearchComponent = (function () {
    function SearchComponent() {
        this.$searchTrigger = $(".meta-search-trigger");
        this.$searchCloseTrigger = $(".super-search-close");
        this.$searchForm = $(".super-search");
        this.$searchButtonArea = $(".meta-search");
        this.$icon = this.$searchTrigger.children("i");
        this.$form = this.$searchForm.find(".sprout-search");
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
        this.$form = $(".sprout-search");
        this.$width = this.$searchButtonArea.width();
        this.$height = this.$searchButtonArea.height();
        this.$searchTrigger.on("click", this.openSearch.bind(this)).bind(this);
        this.$searchCloseTrigger.on("click", this.closeSearch.bind(this)).bind(this);
    };
    SearchComponent.prototype.getWidth = function () {
        return this.$searchButtonArea.width();
    };
    SearchComponent.prototype.getHeight = function () {
        return this.$searchButtonArea.height();
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
            height: this.getHeight(),
            delay: .3,
            opacity: 0,
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
            onComplete: function () {
                this.$searchForm.css({
                    "z-index": -1,
                    "left": 0,
                    "top": 0,
                    "width": 0,
                    "height": 0,
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
            width: 35,
            height: 35,
            "z-index": 999
        });
        var animation = new TimelineLite();
        animation.to(this.$searchForm, .2, {
            visibility: "visible",
            delay: .2
        }).to(this.$searchForm, .2, {
            left: 0,
            opacity: "1",
            top: 0,
            width: "100%",
            height: "100vh",
            borderRadius: 0,
            onComplete: function () {
                $("body").css({
                    position: "fixed",
                    width: "100%",
                    overflowY: "scroll"
                });
                console.log("complete form animate in");
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
        this.$navDropdown = document.getElementById("sprout-dropdown-trigger");
        this.$dropDownWrapper = $(".sprout-dropdown-wrapper");
        this.$dropDownContent = $(".sprout-dropdown-content");
        /*
         Nav State Object
         */
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
    NavComponent.prototype.openNav = function (event) {
        event.preventDefault();
        $(this.$navDropdown).addClass("menu-is-active");
        // Check if user is logged in
        if ($('body').hasClass("admin-bar")) {
            // check what window size is
            if (window.innerWidth <= 782) {
                TweenMax.to(this.$navDropdown, .3, {
                    top: 46,
                    ease: Cubic.easeOut
                });
                return;
            }
            else if (window.innerWidth <= 991) {
                TweenMax.to(this.$navDropdown, .3, {
                    top: 32,
                    ease: Cubic.easeOut
                });
                return;
            }
        }
        else {
            TweenMax.to(this.$navDropdown, .3, {
                top: 0,
                ease: Cubic.easeOut
            });
        }
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
            $("#nav-close").on("click", this.closeNav.bind(this));
        }
        else {
            $("#nav-close").off();
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
                selected.parent("li").parent(".sprout-secondary-dropdown").addClass("is-hidden").parent(".menu-item-has-children").parent("ul").removeClass("move-out");
            });
        }
        else {
            $(".go-back > a").off();
        }
    };
    NavComponent.prototype.disableMobileNav = function () {
        // console.log("Nav turned off");
        this.navOpenInit(false);
        this.navClose(false);
        this.navItemClick(false);
        this.goback(false);
        this.state.navEnabled = false;
        // console.log("Nav turned off");
        /*
         Remove Styles from element & reset dropdown
         */
        this.$navDropdown.setAttribute("style", "");
        this.$dropDownContent.removeClass("move-out");
        var dropdown = this.$dropDownContent.find(".sprout-secondary-dropdown");
        dropdown.each(function (index, elem) {
            if (!$(elem).hasClass("is-hidden")) {
                $(elem).addClass("is-hidden");
            }
        });
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
        // Fix for mobile wordpress admin bar
        // and not wp-admin
        var body = $("body");
        if (body.hasClass("admin-bar") && body.hasClass("wp-admin") === false) {
            $("#wpadminbar").css("position", "fixed");
        }
    };
    NavComponent.prototype.breakPointTablet = function (prevState) {
        console.log("Breakpoint Tablet");
        if (!this.state.navEnabled) {
            this.enableMobileNav();
        }
    };
    NavComponent.prototype.breakPointLaptop = function (prevState) {
        console.log("Breakpoint Laptop");
        if (this.state.navEnabled) {
            this.disableMobileNav();
        }
    };
    NavComponent.prototype.breakPointDesktop = function (prevState) {
        console.log("Breakpoint Desktop");
    };
    NavComponent.prototype.safariResizeFix = function () {
        var _this = this;
        clearTimeout(this.reIsoTimeOut);
        // check if the container has items inside it
        if (utils_1.default.browser === "safari" && utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            console.log("safari");
            // remove animation classes temporarily
            $(this.$navDropdown).removeClass("scene_element--fadeInUpNav");
            // on resize complete, re-addClass elements
            this.reIsoTimeOut = setTimeout(function () {
                $(_this.$navDropdown).addClass("scene_element--fadeInUpNav");
            }, 500);
        }
    };
    NavComponent.prototype.navResize = function () {
        /*
         Mobile
         */
        if (utils_1.default.breakpoint === utils_1.default.bps.mobile) {
            // if state mobile = false - then run breakpoint mobile
            // if its true then skip cus its already mobile
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
        /*
         safari Nav resize event fix
         */
        this.safariResizeFix();
    };
    NavComponent.prototype.navLoad = function () {
        /*
         Set state on load
         */
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
        if (utils_1.default.breakpoint >= utils_1.default.bps.desktop) {
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

},{"../partials/utils":14}],4:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("./utils");
var DescOffsetAnimation = (function () {
    function DescOffsetAnimation(el) {
        this.$this = $(el);
    }
    DescOffsetAnimation.prototype.checkSize = function () {
        if (utils_1.default.breakpoint >= utils_1.default.bps.tablet) {
            // Enable Animation
            if (this.is_desc_animating === false) {
                this.is_desc_animating = true;
                this.desc_o_animate();
            }
        }
        // disable animation
        if (utils_1.default.breakpoint < utils_1.default.bps.tablet) {
            this.is_desc_animating = false;
            if (typeof this.scene === "object") {
                this.scene.destroy(true);
                this.scene2.destroy(true);
            }
        }
    };
    DescOffsetAnimation.prototype.desc_o_animate = function () {
        if (utils_1.default.breakpoint >= utils_1.default.bps.tablet) {
            this.is_desc_animating = true;
            // new timeline event
            var wipeAnimation = new TimelineMax();
            // Image one placement
            wipeAnimation.add([
                TweenMax.fromTo(this.$this.find(".desc-o-image-1"), 1, { yPercent: 0 }, {
                    yPercent: -20,
                    ease: Power0.easeInOut
                })
            ]);
            // Image 2 placement
            var wipeAnimation2 = new TimelineMax();
            wipeAnimation2.add([
                TweenMax.fromTo(this.$this.find(".desc-o-image-2"), 1, { yPercent: 0, }, {
                    yPercent: -105,
                    ease: Power0.easeInOut
                })
            ]);
            this.controller = new ScrollMagic.Controller();
            this.scene = new ScrollMagic.Scene({
                triggerElement: this.$this[0],
                duration: this.$this.height(),
                offset: -100
            })
                .setTween(wipeAnimation)
                .addTo(this.controller);
            this.scene2 = new ScrollMagic.Scene({
                triggerElement: this.$this[0],
                duration: this.$this.height() + 100,
            })
                .setTween(wipeAnimation2)
                .addTo(this.controller);
        }
    };
    DescOffsetAnimation.prototype.init = function () {
        this.desc_o_animate();
        $(window).on("resize", this.checkSize.bind(this));
    };
    return DescOffsetAnimation;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DescOffsetAnimation;

},{"./utils":14}],5:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("./utils");
var GalleryComponent = (function () {
    function GalleryComponent() {
        this.gridId = $(".inner-content-module").children("div").attr("id");
        this.$fullGrid = $("#" + this.gridId);
        this.$galleryContainer = $(".gallery-container");
        this.$isotopeGallery = $(".gallery-isotope");
        this.$galleryItem = $(".gallery-item");
        this.$filter = $(".filter-group");
    }
    GalleryComponent.prototype.setupIsotope = function () {
        // init isotope
        this.$grid = this.$fullGrid.isotope({
            percentPosition: true,
            itemSelector: ".gallery-item",
            isInitLayout: false,
            masonry: {
                "columnWidth": ".grid-sizer"
            },
            transitionDuration: ".3s"
        });
    };
    GalleryComponent.prototype.galleryIsotopeWrapper = function () {
        var windowWidthRef = $(window).innerWidth(); // for scroll bar fix currently
        // Is container or full width?
        if (this.$galleryContainer.hasClass("container")) {
            this.isContained = true;
        }
        //
        if (windowWidthRef > 1600 && this.isContained === false) {
            this.gallery_grid = 5;
        }
        else if (windowWidthRef <= 600) {
            this.gallery_grid = 1;
        }
        else if (windowWidthRef <= 991) {
            this.gallery_grid = 2;
        }
        else if (windowWidthRef <= 1199) {
            this.gallery_grid = 3;
        }
        else {
            this.gallery_grid = 4;
        }
        if ($(".gallery-3-grid").length > 0 && windowWidthRef > 1248) {
            this.gallery_grid = 3;
        }
        if ($(".gallery-4-grid").length > 0 && windowWidthRef > 1584) {
            this.gallery_grid = 4;
        }
        this.gallery_wrapper_width = $(".gallery-container").width();
        if (this.gallery_wrapper_width % this.gallery_grid > 0) {
            this.gallery_wrapper_width = this.gallery_wrapper_width + (this.gallery_grid - this.gallery_wrapper_width % this.gallery_grid);
        }
        this.$isotopeGallery.css("width", this.gallery_wrapper_width);
        return this.gallery_grid;
    };
    GalleryComponent.prototype.reloadIsotope = function () {
        var _this = this;
        this.$grid.isotope();
        this.setMinHeight();
        setTimeout(function () {
            // check if height is a round number to ensure no 1px issues
            _this.checkContainerHeight();
        }, 700);
    };
    GalleryComponent.prototype.setMinHeight = function () {
        var item = $(".gallery-item.width1");
        // Set min height depending one what content was filtered
        this.currentHeight = item.css("padding-bottom");
        var heightStr = this.currentHeight.toString();
        this.currentHeightPX = this.pxConvert(heightStr);
        if (this.currentHeightPX !== 0) {
            this.$isotopeGallery.css("min-height", Math.round(this.currentHeightPX));
        }
        else {
            this.currentHeightPX = item.height();
            this.$isotopeGallery.css("min-height", Math.round(this.currentHeightPX));
        }
    };
    GalleryComponent.prototype.pxConvert = function (objectHeight) {
        return parseInt(objectHeight.slice(0, -2));
    };
    GalleryComponent.prototype.addImageTransition = function () {
        // add transition for intro animation
        this.$galleryItem.css("transition-duration", "600ms");
    };
    GalleryComponent.prototype.loadImagesIn = function () {
        var _this = this;
        this.$grid.isotope("once", "arrangeComplete", function () {
            // fade in
            _this.$galleryItem.addClass("active");
            // remove animation for smooth filtering after images have loaded in
            setTimeout(function () {
                _this.$galleryItem.css("transition-duration", "0ms");
            }, 500);
        });
    };
    GalleryComponent.prototype.checkContainerHeight = function () {
        if (utils_1.default.breakpoint === utils_1.default.bps.laptop && this.$isotopeGallery.hasClass("width-contained")) {
            var currentHeight = this.$isotopeGallery.height();
            this.$isotopeGallery.css("height", currentHeight - 1 + "px");
        }
    };
    GalleryComponent.prototype.onResize = function () {
        clearTimeout(this.reIsoTimeOut);
        // check if the container has items inside it
        if (this.$galleryContainer.length > 0) {
            console.log("resize event");
            // set grid dimension
            this.galleryIsotopeWrapper();
            // on resize complete, re-adjust grid
            this.reIsoTimeOut = setTimeout(this.reloadIsotope.bind(this), 500);
        }
    };
    GalleryComponent.prototype.onFilterClick = function (el, el2) {
        var $this = $(el2.currentTarget);
        $this.parent().children("li").each(function () {
            $(this).removeClass("selected");
        });
        $this.addClass("selected");
        var filterValue = $this.attr("data-filter");
        this.reFilter(filterValue);
    };
    GalleryComponent.prototype.reFilter = function (item) {
        this.$grid.isotope({
            filter: item
        });
    };
    GalleryComponent.prototype.init = function () {
        console.log("Isotope Init");
        // Add transition to animate image in gracefully
        this.addImageTransition();
        // Setup Isotope for the first time
        this.setupIsotope();
        // Create perfect grid
        this.galleryIsotopeWrapper();
        // delay isotope init using helper function that fires on resize
        setTimeout(this.reloadIsotope.bind(this), 1000);
        // Animate Images in onLoad
        this.loadImagesIn();
        // Add filter on Click
        var $this = this;
        this.$filter.on("click", "li", this.onFilterClick.bind(this, $this));
        $(window).on("resize", this.onResize.bind(this));
    };
    return GalleryComponent;
}());
var IsotopeGallery = new GalleryComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IsotopeGallery;

},{"./utils":14}],6:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("./utils");
var SliderComponent = (function () {
    function SliderComponent(el) {
        this.container = $(el);
        this.gallery = this.container.find(".header-slider-gallery");
        this.closeBtn = this.container.find(".header-slider-close");
        this.nextBtn = this.container.find(".slider-navigation-next");
        this.prevBtn = this.container.find(".slider-navigation-prev");
        this.countTotal = this.container.find(".total");
        this.currentCount = this.container.find(".current");
        this.index = 0;
        this.currentSlide = this.index + 1;
        this.sliderOpen = false;
    }
    SliderComponent.prototype.getCurrentSlideElement = function () {
        return this.gallery.find(".selected");
    };
    SliderComponent.prototype.getTotalSlides = function () {
        var count = this.gallery.children("li").length;
        return count;
    };
    SliderComponent.prototype.getCurrentSlideCount = function () {
        return this.currentSlide;
    };
    SliderComponent.prototype.updateCurrentSlide = function (event) {
        if (event === "right") {
            this.index++;
            this.currentSlide++;
        }
        else {
            this.index--;
            this.currentSlide--;
        }
    };
    SliderComponent.prototype.updateNav = function (index, selected) {
        // update numbers on screen
        this.currentCount.html(utils_1.default.setNumber(this.getCurrentSlideCount()));
        // Enable/Disable arrow btns
        this.prevBtn.parent("li").toggleClass("slider-hidden", selected.is(":first-child"));
        this.nextBtn.parent("li").toggleClass("slider-hidden", selected.is(":last-child"));
    };
    SliderComponent.prototype.updateSlide = function (direction) {
        var currentSlide = this.getCurrentSlideElement();
        if (direction === "right") {
            // remove currently selected class, then move left
            currentSlide.removeClass("selected").addClass("left");
            currentSlide.next().addClass("selected");
        }
        else {
            // remove currently selected class, then move left
            currentSlide.removeClass("selected");
            currentSlide.prev().addClass("selected").removeClass("left");
        }
        // update index
        this.updateCurrentSlide(direction);
        // update Navigation
        this.updateNav(this.index, this.getCurrentSlideElement());
    };
    SliderComponent.prototype.arrowHandler = function (event) {
        // check which key was pressed and make sure the slide isn't the beginning or the last one
        if (event.data.keys === "right" && this.currentSlide !== this.getTotalSlides()) {
            if (utils_1.default.breakpoint >= utils_1.default.bps.laptop && this.sliderOpen) {
                this.updateSlide("right");
            }
            else if (utils_1.default.breakpoint <= utils_1.default.bps.tablet) {
                this.updateSlide("right");
            }
        }
        else if (event.data.keys === "left" && this.currentSlide !== 1) {
            if (utils_1.default.breakpoint >= utils_1.default.bps.laptop && this.sliderOpen) {
                this.updateSlide("left");
            }
            else if (utils_1.default.breakpoint <= utils_1.default.bps.tablet) {
                this.updateSlide("left");
            }
        }
    };
    SliderComponent.prototype.openSlider = function (el, event) {
        var _this = this;
        // el = this
        // el2 is event
        if (!this.container.hasClass("is-active") && $(event.currentTarget).is(this.gallery)) {
            this.sliderOpen = true;
            this.container
                .addClass("is-active")
                .one("webkitTransitionEnd " +
                "otransitionend " +
                "oTransitionEnd " +
                "msTransitionEnd " +
                "transitionend", function () {
                $("body,html")
                    .animate({ "scrollTop": _this.container.offset().top }, 200);
                // Close Btn animate in
                var closeBtnAnimation = TweenMax.to(_this.closeBtn, .3, {
                    opacity: 1,
                    z: .001,
                    x: -30,
                    right: 0,
                    ease: Cubic.easeOut,
                    delay: .3
                });
            });
        }
    };
    SliderComponent.prototype.closeSlider = function (e) {
        var _this = this;
        e.preventDefault();
        this.container.removeClass("is-active");
        this.sliderOpen = false;
        TweenLite
            .to($(window), .5, {
            scrollTo: { y: 0 }, ease: Power2.easeOut,
            delay: .5
        });
        var closeBtnAnimation = TweenMax.to(this.closeBtn, .3, {
            opacity: 0,
            z: .001,
            ease: Cubic.easeOut,
            onComplete: function () {
                TweenMax.to(_this.closeBtn, .3, {
                    right: 50
                });
            }
        });
    };
    SliderComponent.prototype.checkSize = function () {
        var _this = this;
        // On resize end - check to enable clicks for desktop or remove them
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
            var $this = _this;
            if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
                _this.gallery.on("click", _this.openSlider.bind(_this, $this));
                _this.closeBtn.on("click", _this.closeSlider.bind(_this));
            }
            else {
                _this.gallery.off();
                _this.closeBtn.off();
            }
        }, 400);
    };
    SliderComponent.prototype.init = function () {
        // Create Binding Events
        this.checkSize();
        $(window).on("resize", this.checkSize.bind(this));
        // Left and right events
        this.nextBtn.on("click", { keys: "right" }, this.arrowHandler.bind(this));
        this.prevBtn.on("click", { keys: "left" }, this.arrowHandler.bind(this));
        // Jquery keys plugin
        $(document)
            .bind("keydown", "left", this.arrowHandler.bind(this))
            .bind("keydown", "esc", this.closeSlider.bind(this))
            .bind("keydown", "right", this.arrowHandler.bind(this));
        // update nav on first load
        this.updateNav(this.index, this.getCurrentSlideElement());
        // set total slides number
        this.countTotal.html(utils_1.default.setNumber(this.getTotalSlides()));
    };
    return SliderComponent;
}());
// loop through each header slider object on the page
var HeaderSliderComponent = (function () {
    function HeaderSliderComponent() {
        this.itemInfoWrapper = $(".header-slider-container");
    }
    HeaderSliderComponent.prototype.init = function () {
        console.log("Header Slider init");
        this.itemInfoWrapper.each(function (index, el) {
            // Pass "this" to each new Header slider component
            var slider = new SliderComponent(el);
            slider.init();
        });
    };
    return HeaderSliderComponent;
}());
var HeaderSlider = new HeaderSliderComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeaderSlider;

},{"./utils":14}],7:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("./utils");
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
    SvgHeaderComponent.prototype.loadDivider = function () {
        var _this = this;
        var y = utils_1.default.breakpoint < utils_1.default.bps.tablet ? 0 : 50;
        TweenLite.to(this.svg, .1, {
            y: y,
            z: ".001",
            width: this._setWindowWidth(),
            height: this._setSvgHeight(),
            delay: 0,
            ease: "Linear.easeNone",
            onComplete: function () {
                _this.svg.parent("div").css("opacity", 1);
                _this.svg.addClass("m-page scene_element scene_element--fadeinupDivider");
            }
        });
    };
    SvgHeaderComponent.prototype.init = function () {
        console.log("Svg header loaded");
        // this.svg.height(this._setSvgHeight());
        // this.svg.attr("height", this._setSvgHeight());
        this.loadDivider();
        $(window).on("resize", this.resizeSvg.bind(this)).bind(this);
    };
    return SvgHeaderComponent;
}());
var SvgHeader = new SvgHeaderComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SvgHeader;

},{"./utils":14}],8:[function(require,module,exports){
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
        this.bgImage = $(".img-loader-bg");
        this.hasBgImage = this.bgImage.length;
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
    // Remove
    // animateHeroHeader(): void {
    //   let b = this.hero.find(".hero-background").css("background-image");
    //
    //   if ( b !== "none" ) {
    //     setTimeout(() => {
    //
    //       this.hero.addClass("loaded");
    //
    //       TweenLite
    //         .to(this.hero, .4,
    //           {
    //             opacity: 1,
    //           }
    //         );
    //     }, 300);
    //   } else {
    //
    //     this.hero.addClass("loaded");
    //
    //   }
    // }
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
            // this.hasHero > 0 ? this.animateHeroHeader() : "";
            _this.hasBgImage > 0 ? _this.bgImage.addClass("loaded") : "";
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
            // console.log(image);
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

},{}],9:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("./utils");
var desc_o_animation_1 = require("./desc-o-animation");
var AnimationComponent = (function () {
    function AnimationComponent() {
        this.container = $(".process-container");
        this.item = $(".process-item-container");
        this.mScene = $(".m-scene");
        this.serviceSideBar = $(".service-sidebar-wrapper");
        this.descOffset = $(".desc-o-animate");
    }
    AnimationComponent.prototype.processAnimateIn = function () {
        var container = this.container;
        var item = this.item;
        var controller = new ScrollMagic.Controller();
        var scene = new ScrollMagic.Scene({
            triggerElement: ".process-container",
            duration: container.height(),
            offset: -250,
        })
            .on("enter", function () {
            item.find(".process-item-inner").addClass("in");
            container.find("img").addClass("in");
        })
            .addTo(controller);
    };
    AnimationComponent.prototype.animateWindowTop = function () {
        console.log("animate Top");
        TweenLite
            .to($(window), .3, {
            scrollTo: {
                y: 0
            },
            ease: Power2.easeOut
        });
    };
    AnimationComponent.prototype.animateServiceSidebarOut = function () {
        var _this = this;
        if (this.serviceSideBar.length > 0) {
            TweenLite.to(this.serviceSideBar, .3, {
                x: "-100",
                z: ".001",
                delay: 0,
                opacity: 0,
                ease: "Linear.easeNone",
                onComplete: function () {
                    // remove sidebar html element so it doesnt show up again when scrolling up
                    _this.serviceSideBar.remove();
                }
            });
        }
        else {
            TweenLite.to($(".service-sidebar-nostick"), .3, {
                x: "-100",
                z: ".001",
                delay: 0,
                opacity: 0,
                ease: "Linear.easeNone",
                onComplete: function () {
                    // remove sidebar html element so it doesnt show up again when scrolling up
                    _this.serviceSideBar.remove();
                }
            });
        }
    };
    AnimationComponent.prototype.loadUrl = function (url, newWindow) {
        // if url is to open in new window open it, else open in same window
        if (newWindow) {
            window.open(url, newWindow);
        }
        else {
            document.location.href = url;
        }
    };
    AnimationComponent.prototype.mainContentAnimationOut = function (callback) {
        var _this = this;
        // Load in animations here
        this.animateServiceSidebarOut();
        this.mScene.addClass("is-exiting")
            .one("oanimationend msAnimationEnd animationend", function () {
            // Load in animations here that need to occur after main ones
            _this.animateWindowTop();
        });
        if (typeof (callback) === "function") {
            callback();
        }
    };
    AnimationComponent.prototype.checkUrl = function (url) {
        if (url.match(/^#/) !== null || url === "") {
            return false;
        }
        else {
            return true;
        }
    };
    AnimationComponent.prototype.globalClickCheck = function (event) {
        var _this = this;
        // Get url from the a tag
        var newUrl = $(event.currentTarget).attr("href");
        var target = $(event.currentTarget).attr("target");
        var hasChildren = $(event.currentTarget).parent("li").hasClass("menu-item-has-children");
        /*
         * First Validation: Is the url valid
         */
        if (!this.checkUrl(newUrl)) {
            event.preventDefault();
            return;
        }
        /*
         * If first validation fails, the url is real and continue validating
         */
        /*
         * Check if its horizontal tablet and user is tapping on menu
         */
        if (utils_1.default.breakpoint > utils_1.default.bps.tablet &&
            this.checkUrl(newUrl) &&
            utils_1.default.browser === "ipad" && hasChildren) {
            event.preventDefault();
            return;
        }
        else if (utils_1.default.breakpoint > utils_1.default.bps.tablet && this.checkUrl(newUrl)) {
            /*
             * Check if its larger than tablet but not an ipad and if it needs to open in new window
             */
            if (target === "_blank" || newUrl.match(/^tel/)) {
                this.loadUrl(newUrl, target);
            }
            else {
                this.mainContentAnimationOut(function () {
                    _this.loadUrl(newUrl, target);
                });
            }
        }
        else if (this.checkUrl(newUrl) && hasChildren) {
        }
        else {
            /*
             * Passed the checks Load it!
             */
            this.loadUrl(newUrl, target);
        }
    };
    AnimationComponent.prototype.descOffsetCheck = function () {
        if (this.descOffset.length > 0) {
            this.addDescOffsetModule();
        }
    };
    AnimationComponent.prototype.addDescOffsetModule = function () {
        this.descOffset.each(function (index, el) {
            // Pass "this" to each new Header slider component
            var animation = new desc_o_animation_1.default(el);
            animation.init();
        });
    };
    AnimationComponent.prototype.init = function () {
        var _this = this;
        this.processAnimateIn();
        // this.desc_o_animate();
        // Click event to control window Loading
        $("a").on("click", function (e) {
            e.preventDefault();
            _this.globalClickCheck(e);
        });
        // Check for VC grid link
        if ($(".vc_grid-container").length > 0) {
            setTimeout(function () {
                $(".vc_grid-container").find("a").each(function (index, el) {
                    $(el).on("click", function (e) {
                        e.preventDefault();
                        _this.globalClickCheck(e);
                    });
                });
            }, 2000);
        }
        this.descOffsetCheck();
        // SPECIAL TABLES ADD CLASS
        if ($(".dataTables_wrapper").length > 0) {
            console.log("add data table class");
            var el = $(".dataTables_wrapper");
            el.each(function (index, el) {
                $(el).addClass("table-responsive");
            });
        }
        // $(window).on("resize", this.checkSize.bind(this));
        // Custom event example
        // $(document).on("test", {}, ( event, arg1, arg2 ) => {
        //
        //   if ( Utils.breakpoint > Utils.bps.tablet ) {
        //     console.log(event);
        //     console.log(arg1);
        //     console.log(arg2);
        //   }
        //
        // }).bind(this);
    };
    return AnimationComponent;
}());
var AnimationController = new AnimationComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnimationController;

},{"./desc-o-animation":4,"./utils":14}],10:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("./utils");
var QuoteComponent = (function () {
    function QuoteComponent() {
        this.quoteContainer = $(".quote");
        this.selectBtn = $(".quote__select--btn");
        this.quoteItemsArray = $(".quote__item");
        this.formBuilder = $(".quote__form--input");
        this.quoteChooser = $(".quote__form--select");
        this.selectConainer = this.selectBtn.find(".fieldset");
        this.state = {
            selected: '',
            isFormActive: false
        };
        this.currentBreakpoint = utils_1.default.breakpoint;
    }
    QuoteComponent.prototype.getSelectedLabel = function () {
        return this.selectConainer.find(".selected");
    };
    QuoteComponent.prototype.setWidth = function (label) {
        var labelWidth = label.outerWidth();
        this.switchBtn.css("width", labelWidth);
    };
    QuoteComponent.prototype.buildSelectBox = function () {
        var names = [];
        var fragment = $(document.createDocumentFragment());
        // get h2 titles from each quote item
        this.quoteItemsArray.each(function (index, el) {
            var $this = $(el), title = $this.find(".card__item--content > h2").text(), name = title.toLocaleLowerCase(), uniqueId = name + "-" + index;
            console.log("Title: ", title);
            // Add matching ID's to each Card
            $this.attr("id", uniqueId);
            // Create input and label DOM elements
            var input = utils_1.default.buildHtml("input", {
                id: uniqueId,
                type: "radio",
                class: "quote__input",
                name: uniqueId,
                value: name
            });
            var label = utils_1.default.buildHtml("label", {
                for: uniqueId,
                class: index === 0 ? "selected" : ""
            }, title);
            fragment.append(input).append(label);
        });
        // Get color from data el and set button
        var $button_color = this.selectConainer.data("color");
        fragment.append('<span class="quote__switch shadow-small-btn" style="background-color:' + $button_color + '"></span>');
        this.selectConainer.append(fragment);
    };
    QuoteComponent.prototype.buildSelectEventHandlers = function () {
        var _this = this;
        this.inputs = this.selectBtn.find(".quote__input");
        this.switchBtn = $(".quote__switch");
        // loop through each item and set width and change events and checked status
        this.inputs.each(function (index, el) {
            var $this = $(el), nextLabel = $this.next();
            if (index === 0) {
                $this.prop("checked", true);
                // set state to current selected input ID
                _this.state.selected = $this.attr("id");
            }
            // find Selected, get width of label, set width of span
            if (nextLabel.hasClass("selected")) {
                _this.setWidth(nextLabel);
            }
            // Add on change function here
            $this.change(_this.onChange.bind(_this));
        });
    };
    QuoteComponent.prototype.buildCardEventHandlers = function () {
        var _this = this;
        // Main Cards
        this.quoteItemsArray.each(function (index, el) {
            var $this = $(el), button = $this.find(".card__item--btn");
            button.on("click", _this.openForm.bind(_this));
        });
        // Back button for tablet
        var button = this.formBuilder.find(".tablet").find(".go-back");
        button.on("click", this.closeForm.bind(this));
    };
    QuoteComponent.prototype.fadeIn = function (el) {
        TweenMax.to(el, .3, {
            opacity: 1,
            delay: .3
        });
    };
    QuoteComponent.prototype.setTranslateX = function (currentTarget, width) {
        var $this = currentTarget;
        var inputId = $this.attr("id");
        // if the currently selected input matches the 2nd item - then move switchBtn right, otherwise back to position 1
        if (inputId === $(this.inputs[1]).attr("id")) {
            this.switchBtn.css({
                "webkitTransform": "translateX(" + width + "px)",
                "MozTransform": "translateX(" + width + "px)",
                "msTransform": "translateX(" + width + "px)",
                "OTransform": "translateX(" + width + "px)",
                "transform": "translateX(" + width + "px)"
            });
        }
        else {
            this.switchBtn.css({
                "webkitTransform": "translateX(0px)",
                "MozTransform": "translateX(0px)",
                "msTransform": "translateX(0px)",
                "OTransform": "translateX(0px)",
                "transform": "translateX(0px)"
            });
        }
    };
    QuoteComponent.prototype.onChange = function (e) {
        var $this = $(e.currentTarget), fieldset = $this.parent(".fieldset"), prevItem = fieldset.find(".selected"), prevWidth = prevItem.outerWidth() - 1, inputId = $this.attr("id");
        // remove selected from Prev Label
        fieldset.find("label").removeClass("selected");
        // remove checked state from prev input
        prevItem.prev("input").prop("checked", false);
        // set new item to selected and checked
        var selectedLabel = fieldset.find("label[for=" + inputId + "]").addClass("selected");
        $this.prop("checked", true);
        // if the currently selected input matches the 2nd item - then move switchBtn right, otherwise back to position 1
        this.setTranslateX($this, prevWidth);
        // change the width of the btn to match the width of the new label
        this.setWidth(selectedLabel);
        // set state to the newly selected input
        this.state.selected = $this.attr("id");
        console.log("Current State is: ", this.state.selected);
        this.toggleCards();
    };
    QuoteComponent.prototype.toggleCards = function () {
        var _this = this;
        // based on state, add selected to the card's id matching the state
        this.quoteItemsArray.each(function (index, el) {
            var $this = $(el), id = $this.attr("id");
            $this.removeClass("selected shadow-medium-dark");
            if (id === _this.state.selected) {
                $this.addClass("selected shadow-medium-dark");
            }
        });
    };
    QuoteComponent.prototype.setActivePlan = function () {
        var _this = this;
        var id = this.state.selected;
        var selectedCard = this.quoteItemsArray.filter(function (item) {
            return $(_this.quoteItemsArray[item]).attr("id") === id;
        });
        var button = '<a class="rounded-btn white-btn go-back" href="#">Go Back</a>';
        // find form
        var formRef = selectedCard.find(".quote__form--temp").find(".quote__form--inner");
        var form = formRef.detach();
        // cloned element
        var modifiedElement = selectedCard.clone();
        // remove form from cloned item.
        // modifiedElement.find(".quote__form--item.temp").remove();
        // formRef.remove();
        // add form to the VC content area
        var quoteFormContainer = $(".quote__form--vc");
        quoteFormContainer.append(form);
        // find button and remove
        modifiedElement.find(".card__item--btn").remove();
        // modifiedElement.insertBefore(this.formBuilder.find(".go-back"));
        var cardWrapper = this.formBuilder.find(".quote__form--card-wrapper");
        cardWrapper.append(modifiedElement).append(button);
        // Back button inside wrapper
        var buttonDom = cardWrapper.find(".go-back");
        buttonDom.on("click", this.closeForm.bind(this));
    };
    QuoteComponent.prototype.putFormBack = function (form) {
        var _this = this;
        var id = this.state.selected;
        // find element id that matches the current state
        var selectedCard = this.quoteItemsArray.filter(function (item) {
            return $(_this.quoteItemsArray[item]).attr("id") === id;
        });
        selectedCard.find(".quote__form--temp").append(form);
    };
    QuoteComponent.prototype.closeForm = function (e) {
        var _this = this;
        e.preventDefault();
        this.state.isFormActive = false;
        // ref for items in VC view
        var card = this.formBuilder.find(".card__item");
        var backBtn = this.formBuilder.find(".quote__form--card-wrapper").find(".go-back");
        var form = this.formBuilder.find(".quote__form--vc").find(".quote__form--inner");
        card.removeClass("in");
        setTimeout(function () {
            // set form to active
            _this.formBuilder.removeClass("active");
            // set body back to scrollable
            $("body").css("overflow-y", "auto");
        }, 400);
        if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            this.formBuilder
                .find(".quote__form--vc")
                .one('otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                // remove visibility once animation completes
                _this.formBuilder.css("visibility", "hidden");
                _this.quoteChooser.css("opacity", "1");
                // z-index fix
                $(".inner-page-wrapper").children("div").css("z-index", "0");
                // remove current card html
                card.remove();
                backBtn.remove();
                _this.putFormBack(form.detach());
            });
        }
        else {
            // remove visibility once animation completes
            this.formBuilder.css("visibility", "hidden");
            this.quoteChooser.css("opacity", "1");
            // z-index fix
            $(".inner-page-wrapper").children("div").css("z-index", "0");
            // remove current card html
            card.remove();
            backBtn.remove();
            this.putFormBack(form.detach());
        }
        // fade out first display
        this.quoteChooser.addClass("active");
    };
    QuoteComponent.prototype.openForm = function (e) {
        var _this = this;
        e.preventDefault();
        var $this = $(e.currentTarget);
        var parentConatiner = $this.parent("div").parent("div");
        // disable button click if item is selected
        if (!parentConatiner.hasClass("selected")) {
            return;
        }
        // set state
        this.state.isFormActive = true;
        // set content plan HTML in new form area
        this.setActivePlan();
        // Animate form in
        var activateInnerForm = function () {
            // z-index fix
            $(".inner-page-wrapper").children("div").css("z-index", "-1");
            _this.quoteContainer.parents(".vc_row").css("z-index", "2");
            // fade out cards
            _this.quoteChooser.css("opacity", "0");
            // set form to active
            _this.formBuilder.addClass("active");
            // add visibility immediately
            _this.formBuilder.css("visibility", "visible");
            // fade out first display
            _this.quoteChooser.removeClass("active");
        };
        // if desktop scroll top
        if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            // scroll top of div on open for graceful UX
            $("body,html").animate({
                "scrollTop": this.quoteContainer.offset().top
            }, 200, function () {
                activateInnerForm();
            }).bind(this);
        }
        else {
            activateInnerForm();
        }
        var card = this.formBuilder.find(".quote__form--card");
        // Set body to not scroll
        $("body").css("overflow-y", "hidden");
        if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            card.one('otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                // fade card in once data is set & the card bg is finished animating
                card.find(".card__item").addClass("in");
            });
        }
        else {
            // fade card in once data is set & the card bg is finished animating
            card.find(".card__item").addClass("in");
        }
    };
    QuoteComponent.prototype.resize = function () {
        var _this = this;
        // On resize end - check button size to accurately resize selected button width
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
            if (_this.currentBreakpoint !== utils_1.default.breakpoint) {
                var selectedLabel = _this.getSelectedLabel(), selectedInput = selectedLabel.prev(), firstLabel = $(_this.inputs[0]).next(), firstLabelWidth = firstLabel.outerWidth() - 1;
                _this.setTranslateX(selectedInput, firstLabelWidth);
                _this.setWidth(selectedLabel);
                _this.currentBreakpoint = utils_1.default.breakpoint;
            }
        }, 400);
    };
    QuoteComponent.prototype.init = function () {
        console.log("Quote Builder");
        // build select box button inputs
        this.buildSelectBox();
        // set click events and first selected items for Select Box
        this.buildSelectEventHandlers();
        this.fadeIn(this.selectBtn);
        // select card
        this.toggleCards();
        // add click events to cards buttons
        this.buildCardEventHandlers();
        // fade main container in
        this.fadeIn(this.quoteContainer);
        // on resize change button size
        $(window).on("resize", this.resize.bind(this));
    };
    return QuoteComponent;
}());
var QuoteBuilder = new QuoteComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuoteBuilder;

},{"./utils":14}],11:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("./utils");
var ShowcaseComponent = (function () {
    function ShowcaseComponent(el) {
        this.container = $(el);
        this.prevBtnMobile = this.container.find(".showcase__nav--prev");
        this.nextBtnMobile = this.container.find(".showcase__nav--next");
        this.prevBtn = this.container.find(".showcase__thumbsnav--prev");
        this.nextBtn = this.container.find(".showcase__thumbsnav--next");
        this.gallery = this.container.find(".showcase__slider--gallery");
        this.desc = this.container.find(".showcase__desc");
        this.countTotal = this.container.find(".total");
        this.currentCountItem = this.container.find(".current");
        this.index = 0; // set to 2nd slide
        this.thumbsContainer = this.container.find(".showcase__thumbs--images");
        this.showCaseThumbs = this.container.find(".showcase__thumbs");
        this.thumbScaleTop = 130;
        this.thumbScaleLeft = 75;
        this.statePosition = {
            desktopPos: 0,
            tabletPos: 0,
            indexSelected: this.index,
            currentSlide: this.index + 1
        };
    }
    ShowcaseComponent.prototype.setFirstSlide = function () {
        // loop through images and set active element
        var firstImage = this.gallery.find("li[data-index=" + this.statePosition.indexSelected + "]");
        firstImage.addClass("selected");
        this.animateGalleryIn();
        // loop through desc and set active element
        var firstDesc = this.desc.find(".showcase__desc--item[data-index=" + this.statePosition.indexSelected + "]");
        firstDesc.addClass("selected");
        // Build thumbnails
        this.buildThumbs();
        // Set Current Slide, which is always the first slide to selected - onLoad
        this.updateMobileNav(this.getCurrentSlideElement());
        // add click events to thumbnail images, then when finished animate in with callback
        this.buildThumbsClickHandler(this.animateInThumbs.bind(this));
    };
    ShowcaseComponent.prototype.getCurrentSlideElement = function () {
        return this.gallery.find(".selected");
    };
    ShowcaseComponent.prototype.getCurrentNavElement = function () {
        return this.thumbsContainer.find(".selected");
    };
    ShowcaseComponent.prototype.getCurrentDescElement = function () {
        return this.desc.find(".selected");
    };
    ShowcaseComponent.prototype.getTotalSlides = function () {
        var count = this.gallery.children("li").length;
        return count;
    };
    ShowcaseComponent.prototype.updateMobileNav = function (selected) {
        // Enable/Disable arrow btns
        this.prevBtnMobile.parent("li").toggleClass("slider-hidden", selected.is(":first-child"));
        this.nextBtnMobile.parent("li").toggleClass("slider-hidden", selected.is(":last-child"));
    };
    ShowcaseComponent.prototype.updateState = function (index) {
        this.statePosition.indexSelected = index;
        this.statePosition.currentSlide = index + 1;
    };
    ShowcaseComponent.prototype.getCurrentSlideCount = function () {
        return this.statePosition.currentSlide;
    };
    ShowcaseComponent.prototype.updateSlide = function (direction) {
        // get current selected and find the match to the next el
        var currentSlide = this.getCurrentSlideElement();
        var nextSlide = this.gallery.find("li[data-index=" + this.statePosition.indexSelected + "]");
        if (direction === "right") {
            // add left to all slides prev, in-case you skipped over one
            currentSlide.removeClass("selected");
            nextSlide.addClass("selected");
            nextSlide.prevAll().addClass("left");
            nextSlide.nextAll().removeClass("left");
        }
        else {
            // add left to all slides prev, in-case you skipped over one
            currentSlide.removeClass("selected");
            nextSlide.addClass("selected").removeClass("left");
            nextSlide.prevAll().addClass("left");
            nextSlide.nextAll().removeClass("left");
        }
        // update Navigation check
        this.updateMobileNav(this.getCurrentSlideElement());
    };
    ShowcaseComponent.prototype.updateDescHeight = function (direction, selected) {
        // direction
        if (direction) {
            var height = selected.outerHeight();
            TweenMax.to(this.desc, .3, {
                height: height,
                ease: Cubic.easeOut
            });
        }
        else {
            // get current slide
            var currentSlide = this.getCurrentDescElement();
            var height = currentSlide.outerHeight();
            this.desc.height(height);
        }
    };
    ShowcaseComponent.prototype.updateDesc = function (direction) {
        var currentSlide = this.getCurrentDescElement();
        var nextSlide = this.desc.find(".showcase__desc--item[data-index=" + this.statePosition.indexSelected + "]");
        if (direction === "right") {
            // add left to all slides prev, in-case you skipped over one
            currentSlide.removeClass("selected");
            nextSlide.addClass("selected");
            nextSlide.prevAll().addClass("left");
            nextSlide.nextAll().removeClass("left");
            this.updateDescHeight("right", nextSlide);
        }
        else {
            // add left to all slides prev, in-case you skipped over one
            currentSlide.removeClass("selected");
            nextSlide.addClass("selected").removeClass("left");
            nextSlide.prevAll().addClass("left");
            nextSlide.nextAll().removeClass("left");
            this.updateDescHeight("left", nextSlide);
        }
    };
    ShowcaseComponent.prototype.updateThumbsnav = function (direction) {
        var currentSlide = this.getCurrentNavElement();
        var nextSlide = this.thumbsContainer.find("li[data-index=" + this.statePosition.indexSelected + "]");
        if (utils_1.default.breakpoint < utils_1.default.bps.laptop) {
            /*
             * TABLET THUMB SELECT
             */
            if (direction === "right") {
                currentSlide.removeClass("selected");
                nextSlide.addClass("selected");
                if (this.statePosition.currentSlide >= 4 && this.statePosition.currentSlide < this.getTotalSlides()) {
                    // update the state
                    this.statePosition.tabletPos = this.statePosition.tabletPos - this.thumbScaleLeft;
                    this.statePosition.desktopPos = this.statePosition.desktopPos - this.thumbScaleTop;
                    // update html element
                    TweenMax.to(this.thumbsContainer, .1, {
                        z: .001,
                        x: this.statePosition.tabletPos,
                        ease: Cubic.easeIn
                    });
                }
            }
            else {
                console.log("left");
                currentSlide.removeClass("selected");
                nextSlide.addClass("selected");
                if (this.statePosition.tabletPos !== 0 && this.statePosition.currentSlide !== 1) {
                    this.statePosition.tabletPos = this.statePosition.tabletPos + this.thumbScaleLeft;
                    TweenMax.to(this.thumbsContainer, .1, {
                        z: .001,
                        x: this.statePosition.tabletPos,
                        ease: Cubic.easeIn
                    });
                }
                if (this.statePosition.desktopPos !== 0 && this.statePosition.currentSlide !== 1) {
                    // update the state
                    this.statePosition.desktopPos = this.statePosition.desktopPos + this.thumbScaleTop;
                }
            }
        }
        else {
            /*
             * DESKTOP THUMB SELECT
             */
            if (direction === "right") {
                currentSlide.removeClass("selected");
                nextSlide.addClass("selected");
                // detecting if slide should move or not
                if (this.statePosition.currentSlide >= 4 && this.statePosition.currentSlide < this.getTotalSlides()) {
                    // update the position controller
                    this.statePosition.desktopPos = this.statePosition.desktopPos - this.thumbScaleTop;
                    this.statePosition.tabletPos = this.statePosition.tabletPos - this.thumbScaleLeft;
                    // move slider
                    TweenMax.to(this.thumbsContainer, .1, {
                        z: .001,
                        y: this.statePosition.desktopPos,
                        ease: Cubic.easeIn
                    });
                }
            }
            else {
                currentSlide.removeClass("selected");
                nextSlide.addClass("selected");
                if (this.statePosition.desktopPos !== 0 && this.statePosition.currentSlide !== 1) {
                    this.statePosition.desktopPos = this.statePosition.desktopPos + this.thumbScaleTop;
                    TweenMax.to(this.thumbsContainer, .1, {
                        z: .001,
                        y: this.statePosition.desktopPos,
                        ease: Cubic.easeIn
                    });
                }
                // seperate tablet looking at should it update tablet state
                if (this.statePosition.tabletPos !== 0 && this.statePosition.currentSlide !== 1) {
                    this.statePosition.tabletPos = this.statePosition.tabletPos + this.thumbScaleLeft;
                }
            }
        }
    };
    ShowcaseComponent.prototype.checkThumbsNav = function (size) {
        if (size === "mobile") {
            TweenMax.to(this.thumbsContainer, .1, {
                z: .001,
                y: 0,
                x: this.statePosition.tabletPos,
                ease: Cubic.easeOut
            });
        }
        else {
            TweenMax.to(this.thumbsContainer, .1, {
                z: .001,
                y: this.statePosition.desktopPos,
                x: 0,
                ease: Cubic.easeOut
            });
        }
    };
    ShowcaseComponent.prototype.arrowHandler = function (event) {
        event.preventDefault();
        var $el = $(event.currentTarget); // a tag
        var thumbIndex = $el.parent("li").data("index");
        var prevEl = this.thumbsContainer.find(".selected");
        var prevIndex = prevEl.data("index");
        // Slider can move right because current slide is not the last slide
        if (event.data.keys === "right" && this.statePosition.currentSlide <= this.getTotalSlides()) {
            // update state on arrow click
            this.updateState(this.statePosition.indexSelected + 1);
            this.updateSlide("right");
            this.updateDesc("right");
            this.updateThumbsnav("right");
            this.animateShadowInOut();
        }
        else if (event.data.keys === "left" && this.statePosition.currentSlide !== 1) {
            // update state on arrow click
            this.updateState(this.statePosition.indexSelected - 1);
            // Else if its not the first slide - move left
            this.updateSlide("left");
            this.updateDesc("left");
            this.updateThumbsnav("left");
            this.animateShadowInOut();
        }
        else if (event.data.keys === "thumbnail" &&
            prevIndex < thumbIndex &&
            thumbIndex + 1 !== this.getTotalSlides) {
            // compare item selected index with new item selected and determine which direction to move
            // update State
            this.updateState(thumbIndex);
            // update thumbs nav
            this.updateThumbsnav("right");
            this.updateSlide("right");
            this.updateDesc("right");
            this.animateShadowInOut();
        }
        else if (event.data.keys === "thumbnail" && prevIndex > thumbIndex) {
            // update State
            this.updateState(thumbIndex);
            // update thumbs nav
            this.updateThumbsnav("left");
            this.updateSlide("left");
            this.updateDesc("left");
            this.animateShadowInOut();
        }
        // update counter
        this.currentCountItem.html(utils_1.default.setNumber(this.getCurrentSlideCount()));
    };
    ShowcaseComponent.prototype.checkSize = function () {
        var _this = this;
        // On resize end - check to enable clicks for desktop or remove them
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
            // if Tablet or smaller - bind mobile nav arrows
            if (utils_1.default.breakpoint < utils_1.default.bps.laptop) {
                // adjust css sizing for thumbs nav on position resize
                _this.checkThumbsNav("mobile");
            }
            else {
                _this.checkThumbsNav("desktop");
            }
        }, 400);
        this.updateDescHeight();
    };
    ShowcaseComponent.prototype.animateShadowInOut = function () {
        // remove dropshadow
        TweenMax.to(this.gallery, 0, {
            boxShadow: "0px 18px 94px -16px rgba(0,0,0,0.0)"
        });
        TweenMax.to(this.gallery, .1, {
            boxShadow: "0px 18px 94px -16px rgba(0,0,0,0.68)",
            delay: .3
        });
    };
    ShowcaseComponent.prototype.animateShadowIn = function () {
        TweenMax.to(this.gallery, .3, {
            boxShadow: "0px 18px 94px -16px rgba(0,0,0,0.68)",
            delay: .1
        });
    };
    ShowcaseComponent.prototype.buildThumbs = function () {
        var _this = this;
        var fragment = $(document.createDocumentFragment());
        // build loop for images
        this.gallery.find("li").each(function (index, el) {
            // create html elements
            var itemIndex = utils_1.default.setNumber(index), imageThumbUrl = $(el).data("thumb"), imageThumbAlt = $(el).data("alt"), imageElement = document.createElement("img"), linkElement = document.createElement("a"), element = document.createElement("li");
            // add src and attr to image
            imageElement.setAttribute("src", imageThumbUrl);
            imageElement.setAttribute("alt", imageThumbAlt);
            linkElement.setAttribute("href", "#");
            linkElement.appendChild(imageElement);
            element.appendChild(linkElement);
            element.setAttribute("data-index", itemIndex);
            // set first image to selected
            index === _this.statePosition.indexSelected ? element.className = "selected" : "";
            // append to fragment
            fragment.append(element);
        });
        // insert html element to the dom after loop finishes
        this.thumbsContainer.append(fragment);
    };
    ShowcaseComponent.prototype.buildThumbsClickHandler = function (callback) {
        var _this = this;
        // Add array of html object to attach click events to later
        this.thumbsClick = this.thumbsContainer.find("a");
        // Click handler for preview thumbs on desktop, needs to work on tablet -> desktop
        this.thumbsClick.each(function (index, el) {
            $(el).on("click", { keys: "thumbnail" }, _this.arrowHandler.bind(_this));
        });
        callback();
    };
    ShowcaseComponent.prototype.animateInThumbs = function () {
        TweenMax.to(this.showCaseThumbs, .3, {
            opacity: 1,
            delay: 1
        });
    };
    ShowcaseComponent.prototype.animateGalleryIn = function () {
        var _this = this;
        TweenMax.to(this.container.find(".showcase__outer--bgimage"), .3, {
            opacity: 1,
            delay: .7,
            onComplete: function () {
                _this.animateShadowIn();
            }
        });
    };
    ShowcaseComponent.prototype.init = function () {
        this.setFirstSlide();
        // Init correct nav depending on viewport size
        this.checkSize();
        this.updateDescHeight();
        this.prevBtnMobile.on("click", { keys: "left" }, this.arrowHandler.bind(this));
        this.nextBtnMobile.on("click", { keys: "right" }, this.arrowHandler.bind(this));
        $(window).on("resize", this.checkSize.bind(this));
        // set total slides number
        this.countTotal.html(utils_1.default.setNumber(this.getTotalSlides()));
        // update counter
        this.currentCountItem.html(utils_1.default.setNumber(this.getCurrentSlideCount()));
    };
    return ShowcaseComponent;
}());
// loop through each header slider object on the page
var ShowCaseSLider = (function () {
    function ShowCaseSLider() {
        this.itemInfoWrapper = $(".showcase");
    }
    ShowCaseSLider.prototype.init = function () {
        console.log("Showcase Slider init");
        this.itemInfoWrapper.each(function (index, el) {
            // Pass "this" to each new Header slider component
            var slider = new ShowcaseComponent(el);
            slider.init();
        });
    };
    return ShowCaseSLider;
}());
var ShowcaseSlider = new ShowCaseSLider();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShowcaseSlider;

},{"./utils":14}],12:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("./utils");
var StickySidebarComponent = (function () {
    function StickySidebarComponent() {
        this.isAnimating = false;
        this.contentWrapper = $(".sidebar-content");
        this.aside = $(".service-sidebar-wrapper");
        this.windowHeight = $(window).height();
        this.sidebarHeight = this.aside.height();
        this.sidebarWrapper = $(".service-sidebar");
    }
    StickySidebarComponent.prototype.checkSidebar = function () {
        // Check if the sidebar is fixed or not
        if (!this.isAnimating && utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            this.isAnimating = true;
            (!window.requestAnimationFrame) ?
                setTimeout(this.updateSidebarPosition.bind(this), 300) :
                window.requestAnimationFrame(this.updateSidebarPosition.bind(this));
        }
        else if (utils_1.default.breakpoint < utils_1.default.bps.laptop) {
            this.resetSideBar();
        }
    };
    StickySidebarComponent.prototype.checkSidebarVisibility = function () {
        if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            // does sidebar have class visibility
            var isVisible = this.aside.hasClass('visible');
            if (!isVisible) {
                this.animateSidebarIn(this.aside);
            }
        }
    };
    StickySidebarComponent.prototype.resetSideBar = function () {
        this.isAnimating = false;
        this.aside.removeClass("sticky");
        this.aside.attr("style", "");
    };
    StickySidebarComponent.prototype.updateSidebarPosition = function () {
        this.checkScrollDirection();
        this.checkSidebarVisibility();
        // get distance from top of content 10 + 40 = 50 padding top
        // this.contentOffsetTop = this.contentWrapper.offset().top - 10;
        this.contentOffsetTop = this.contentWrapper.offset().top + 25;
        this.sidebarHeight = this.aside.height();
        this.contentWrapperHeight = this.contentWrapper.outerHeight(); // include padding and margin
        // get where top of window is
        this.scrollTop = $(window).scrollTop();
        // console.log("Content Wrapper Height", this.contentWrapperHeight);
        // console.log("Content Offset", this.contentOffsetTop);
        // console.log("Sidebar Height", this.sidebarHeight);
        // console.log("Window Height", this.windowHeight);
        // console.log("offset Top", this.contentOffsetTop);
        // console.log("ScrollTop", this.scrollTop);
        // console.log("Sidebaroffset", this.scrollTop);
        // If the window V position is less than the content V position make sidebar normal
        if (this.scrollTop < this.contentOffsetTop) {
            var cssProps = {
                "transition": "top .3s"
            };
            this.aside.removeClass("sticky");
            this.aside.css(cssProps);
        }
        else if (this.scrollTop >= this.contentOffsetTop && this.scrollTop < this.contentWrapperHeight - this.sidebarHeight + this.contentOffsetTop - 50) {
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
                this.aside.removeClass("sticky").css("top", this.contentWrapperHeight - this.sidebarHeight + 1 + "px");
            }
        }
        this.isAnimating = false;
    };
    StickySidebarComponent.prototype.checkScrollDirection = function () {
        // Log current scrollPoint
        var st = $(this).scrollTop();
        // compare to last scrollPoint
        if (st > this.lastScrollTop) {
            // console.log("scroll down");
            // downscroll code
            this.scrollingDown = true;
        }
        else {
            // console.log("scroll up");
            // upscroll code
            this.scrollingDown = false;
        }
        // on complete - make last Scroll point the point at which they started scrolling at first
        this.lastScrollTop = st;
    };
    StickySidebarComponent.prototype.animateSidebarIn = function (element) {
        element.removeClass("intro");
        if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            var sidebarIntro = TweenMax.to(element, .3, {
                x: 0,
                opacity: 1,
                z: .001,
                ease: Cubic.easeOut,
                delay: .9,
                onComplete: function () {
                    // make sidebar permanently visible
                    element.addClass("visible");
                }
            });
        }
    };
    StickySidebarComponent.prototype.init = function () {
        console.log("Sticky sidebar loaded");
        this.lastScrollTop = 0;
        if (this.aside.length > 0) {
            this.checkSidebar();
            $(window).on("scroll", this.checkSidebar.bind(this));
            $(window).on("resize", this.checkSidebar.bind(this));
            // Animate side bar in on load
            this.animateSidebarIn(this.aside);
        }
        else {
            // Animate side bar in on load
            this.animateSidebarIn($(".service-sidebar-nostick"));
        }
    };
    return StickySidebarComponent;
}());
var StickySidebar = new StickySidebarComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StickySidebar;

},{"./utils":14}],13:[function(require,module,exports){
"use strict";
var $ = jQuery;
var TestimonailComponent = (function () {
    function TestimonailComponent() {
        this.testimonails = $(".testimonials");
    }
    TestimonailComponent.prototype.generateId = function (index, el) {
        // create Dynamic ID
        var idString = "carousel-testimonial-" + index;
        el.attr("id", idString);
        // Add matching href to controls
        var controls = el.find(".carousel-control");
        controls.each(function (index, el) {
            $(el).attr("href", "#" + idString);
        });
    };
    TestimonailComponent.prototype.onResize = function () {
        var _this = this;
        // On resize end - check to enable clicks for desktop or remove them
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
            // Change Height on resize
            _this.testimonails.each(function (index, el) {
                var $this = $(el);
                // establish vars
                var $inner = $this.find(".carousel-inner"), $active = $inner.find(".active"), blockItem = $active.find("blockquote");
                // Set height for first item
                var height = blockItem.outerHeight();
                // if they aren't equal, change them
                if (_this.currentHeight !== height) {
                    $inner.css("height", height);
                    _this.currentHeight = height;
                }
            });
        }, 400);
    };
    TestimonailComponent.prototype.init = function () {
        var _this = this;
        console.log("Testimonials Init");
        // Make items dynamic
        this.testimonails.each(function (index, el) {
            var $this = $(el);
            _this.generateId(index, $this);
            // make first element active
            var $inner = $this.find(".carousel-inner");
            var $first = $inner.children(".item").first().addClass("active");
            // Set height for first item
            var height = $first.outerHeight();
            _this.currentHeight = height;
            $inner.css("height", height);
        });
        // Start Sliders
        this.testimonails.each(function (index, el) {
            // init carousel
            $(el).carousel();
            // On slide change height for smooth transitions
            $(el).on("slid.bs.carousel", function (e) {
                // slide
                var $this = e.currentTarget;
                var currentSlide = $($this).find(".active");
                var blockItem = currentSlide.find("blockquote");
                var height = blockItem.outerHeight();
                _this.currentHeight = height;
                currentSlide.parent(".carousel-inner").css("height", height);
            });
        });
        // adjust size on resize
        $(window).on("resize", this.onResize.bind(this));
    };
    return TestimonailComponent;
}());
var Testimonails = new TestimonailComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Testimonails;

},{}],14:[function(require,module,exports){
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
            console.log($('body').css("z-index"));
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
        this.browser = this.whichBrowser();
    }
    UtilityComponent.prototype.setNumber = function (count) {
        // conver number to string
        var total = count;
        return total.toString();
    };
    UtilityComponent.prototype.whichBrowser = function () {
        if ((navigator.userAgent.toLowerCase().indexOf("safari") > -1) && !(navigator.userAgent.toLowerCase().indexOf("chrome") > -1) && (navigator.appName ===
            "Netscape")) {
            if (navigator.userAgent.match(/iPad/i) !== null) {
                return "ipad";
            }
            else {
                return "safari";
            }
        }
    };
    UtilityComponent.prototype.buildHtml = function (type, attrs, html) {
        // http://marcgrabanski.com/building-html-in-jquery-and-javascript/
        var h = '<' + type;
        for (var attr in attrs) {
            if (attrs[attr] === false)
                continue;
            h += ' ' + attr + '="' + attrs[attr] + '"';
        }
        return h += html ? ">" + html + "</" + type + ">" : "/>";
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9kZXNjLW8tYW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGUudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zdmcudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2ltYWdlTG9hZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9xdW90ZS1idWlsZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy90ZXN0aW1vbmlhbHMudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztHQUdHOztBQUVILHNCQUFrQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLDJCQUFnQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzFDLHVCQUFtQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3BELDJCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLDRCQUF3Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ2pELCtC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R0FBRyxDQUFDLENBQUM7UUFFbEQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDSCx1QkFBQztBQUFELENBdkdBLEFBdUdDLElBQUE7QUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7QUFFbkM7a0JBQWUsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gUmVmIHBhdGggaXMgbm90IG5lZWRlZCBmb3Igc29tZSByZWFzb25cbiA8cmVmZXJlbmNlIHBhdGg9XCIvVXNlcnMveW9zZW1ldGllL0Ryb3Bib3gvZGV2ZWxvcG1lbnQvdmhvc3RzL3d3dy5seW5kYXNjb3JlLmRldi93cC1jb250ZW50L3RoZW1lcy9uZWF0L3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuICovXG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi9wYXJ0aWFscy91dGlsc1wiO1xuaW1wb3J0IE5hdiBmcm9tIFwiLi9uYXZpZ2F0aW9uL25hdmlnYXRpb25cIjtcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IFN2Z0hlYWRlciBmcm9tIFwiLi9wYXJ0aWFscy9oZWFkZXItc3ZnXCI7XG5pbXBvcnQgSW1hZ2VMb2FkZXIgZnJvbSBcIi4vcGFydGlhbHMvaW1hZ2VMb2FkZXJcIjtcbmltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyXCI7XG5pbXBvcnQgQW5pbWF0aW9uQ29udHJvbGxlciBmcm9tIFwiLi9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uXCI7XG5pbXBvcnQgSXNvdG9wZUdhbGxlcnkgZnJvbSBcIi4vcGFydGlhbHMvZ2FsbGVyeS1pc290b3BlXCI7XG5pbXBvcnQgSGVhZGVyU2xpZGVyIGZyb20gXCIuL3BhcnRpYWxzL2hlYWRlci1zbGlkZXJcIjtcbmltcG9ydCBTaG93Y2FzZVNsaWRlciBmcm9tIFwiLi9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXJcIjtcbmltcG9ydCBUZXN0aW1vbmlhbHMgZnJvbSBcIi4vcGFydGlhbHMvdGVzdGltb25pYWxzXCI7XG5pbXBvcnQgUXVvdGVCdWlsZGVyIGZyb20gXCIuL3BhcnRpYWxzL3F1b3RlLWJ1aWxkZXJcIjtcbi8vIGltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3NlcnZpY2Utc2lkZWJhclwiO1xuY29uc3QgJCA9IGpRdWVyeTtcbmRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgY2xhc3MgQXBwIHtcblxuICAgIGluaXQoKTogdm9pZCB7XG4gICAgICBjb25zb2xlLmxvZyhcIkFwcCBsb2FkZWRcIik7XG4gICAgICBTdmdIZWFkZXIuaW5pdCgpO1xuICAgICAgVXRpbHMuaW5pdCgpO1xuICAgICAgTmF2LmluaXQoKTtcbiAgICAgIFNlYXJjaC5pbml0KCk7XG4gICAgICBTdGlja3lTaWRlYmFyLmluaXQoKTtcbiAgICAgIFRlc3RpbW9uaWFscy5pbml0KCk7XG4gICAgICBRdW90ZUJ1aWxkZXIuaW5pdCgpO1xuICAgICAgQW5pbWF0aW9uQ29udHJvbGxlci5pbml0KCk7IC8vIEdsb2JhbCB3aW5kb3cgYW5pbSBhbmQgY2xpY2sgY29udHJvbFxuICAgIH1cbiAgfVxuXG4gICAgbGV0IGJvb3RzdHJhcCA9IG5ldyBBcHAoKTtcblxuXG4gIC8qKiBydW4gYWxsIGZ1bmN0aW9ucyAqL1xuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgYm9vdHN0cmFwLmluaXQoKTtcbiAgICBJbWFnZUxvYWRlci5pbml0KCk7XG4gIH0pO1xuXG4gIC8vIEJpbmQgZXZlbnRzIHRvIHRoZSBpbWFnZXNMb2FkZWQgcGx1Z2luIGhlcmVcbiAgJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24gKCBlICkge1xuICAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICBcbiAgICAvLyBjaGVjayBpZiBwYWdlIGhhcyBnYWxsZXJ5XG4gICAgaWYgKCAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBJc290b3BlR2FsbGVyeS5pbml0KCk7XG4gICAgfVxuICAgIEhlYWRlclNsaWRlci5pbml0KCk7XG4gICAgU2hvd2Nhc2VTbGlkZXIuaW5pdCgpO1xuXG4gIH0pO1xuXG59KSgpOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uLy4uL3BhcnRpYWxzL3V0aWxzXCI7XG5cbmNsYXNzIFNlYXJjaENvbXBvbmVudCB7XG4gICRzZWFyY2hUcmlnZ2VyOiBKUXVlcnk7XG4gICRzZWFyY2hDbG9zZVRyaWdnZXI6IEpRdWVyeTtcbiAgJHNlYXJjaEZvcm06IEpRdWVyeTtcbiAgJHNlYXJjaEJ1dHRvbkFyZWE6IEpRdWVyeTtcbiAgJGljb246IEpRdWVyeTtcbiAgJGZvcm06IEpRdWVyeTtcbiAgJGlucHV0OiBKUXVlcnk7XG4gICR3aWR0aDogbnVtYmVyO1xuICAkaGVpZ2h0OiBudW1iZXI7XG4gIGlzT3BlbjogYm9vbGVhbjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gdGhpcy4kc2VhcmNoRm9ybS5maW5kKFwiLnNwcm91dC1zZWFyY2hcIik7XG4gICAgdGhpcy4kaW5wdXQgPSB0aGlzLiRmb3JtLmZpcnN0KCk7XG4gICAgdGhpcy4kd2lkdGggPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gICAgdGhpcy4kaGVpZ2h0ID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS5oZWlnaHQoKTtcbiAgfVxuXG4gIHJlbG9hZCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCBSZWxvYWRcIik7XG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlciA9ICQoXCIubWV0YS1zZWFyY2gtdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIgPSAkKFwiLnN1cGVyLXNlYXJjaC1jbG9zZVwiKTtcbiAgICB0aGlzLiRzZWFyY2hGb3JtID0gJChcIi5zdXBlci1zZWFyY2hcIik7XG4gICAgdGhpcy4kc2VhcmNoQnV0dG9uQXJlYSA9ICQoXCIubWV0YS1zZWFyY2hcIik7XG4gICAgdGhpcy4kaWNvbiA9IHRoaXMuJHNlYXJjaFRyaWdnZXIuY2hpbGRyZW4oXCJpXCIpO1xuICAgIHRoaXMuJGZvcm0gPSAkKFwiLnNwcm91dC1zZWFyY2hcIik7XG4gICAgdGhpcy4kd2lkdGggPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gICAgdGhpcy4kaGVpZ2h0ID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS5oZWlnaHQoKTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gIH1cblxuICBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS5oZWlnaHQoKTtcbiAgfVxuXG4gIGdldFRvcFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaFRyaWdnZXIub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICB9XG5cbiAgZ2V0TGVmdFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaFRyaWdnZXIub2Zmc2V0KCkubGVmdDtcbiAgfVxuXG4gIGNsb3NlU2VhcmNoKCBldmVudCApIHtcblxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cbiAgICBsZXQgYW5pbWF0aW9uID0gbmV3IFRpbWVsaW5lTGl0ZSgpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciwgLjIsIHtcbiAgICAgIHRvcDogXCI1JVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCJcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjI1JVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gICAgYW5pbWF0aW9uLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC4yLCB7XG4gICAgICBsZWZ0OiB0aGlzLmdldExlZnRQb3NpdGlvbigpLFxuICAgICAgdG9wOiB0aGlzLmdldFRvcFBvc2l0aW9uKCksXG4gICAgICB3aWR0aDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLmdldEhlaWdodCgpLFxuICAgICAgZGVsYXk6IC4zLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIlxuICAgICAgICB9KTtcbiAgICAgICAgVHdlZW5MaXRlLnRvKHRoaXMuJGljb24sIC4yLCB7XG4gICAgICAgICAgdG9wOiBcIjUwJVwiLFxuICAgICAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgICB9KTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC40LCB7XG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgICAgICBcInotaW5kZXhcIjogLTEsXG4gICAgICAgICAgXCJsZWZ0XCI6IDAsXG4gICAgICAgICAgXCJ0b3BcIjogMCxcbiAgICAgICAgICBcIndpZHRoXCI6IDAsXG4gICAgICAgICAgXCJoZWlnaHRcIjogMCxcbiAgICAgICAgfSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcblxuICB9XG5cbiAgb3BlblNlYXJjaChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cbiAgICAvLyBwcmV2ZW50IGJ1dHRvbiBmcm9tIGJlaW5nIHVzZWQgb25jZSBzZWFyY2ggaXMgb3BlblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIuYmx1cigpO1xuXG4gICAgdGhpcy4kc2VhcmNoRm9ybS5jc3Moe1xuICAgICAgbGVmdDogdGhpcy5nZXRMZWZ0UG9zaXRpb24oKSxcbiAgICAgIHRvcDogdGhpcy5nZXRUb3BQb3NpdGlvbigpLFxuICAgICAgd2lkdGg6IDM1LFxuICAgICAgaGVpZ2h0OiAzNSxcbiAgICAgIFwiei1pbmRleFwiOiA5OTlcbiAgICB9KTtcblxuICAgIGxldCBhbmltYXRpb24gPSBuZXcgVGltZWxpbmVMaXRlKCk7XG5cbiAgICBhbmltYXRpb24udG8odGhpcy4kc2VhcmNoRm9ybSwgLjIsIHtcbiAgICAgIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiLFxuICAgICAgZGVsYXk6IC4yXG4gICAgfSkudG8odGhpcy4kc2VhcmNoRm9ybSwgLjIsIHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIHRvcDogMCxcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgYm9yZGVyUmFkaXVzOiAwLFxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgIG92ZXJmbG93WTogXCJzY3JvbGxcIlxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjb21wbGV0ZSBmb3JtIGFuaW1hdGUgaW5cIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgIHRvcDogXCIxMTAlXCIsXG4gICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIsIC4zLCB7XG4gICAgICB0b3A6IFwiMyVcIixcbiAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgZGVsYXk6IC40LFxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGZvcm0sIC40LCB7XG4gICAgICB0b3A6IFwiMjAlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICAgIGVhc2U6IEV4cG8uZWFzZUluT3V0XG4gICAgfSk7XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggbG9hZGVkXCIpO1xuICAgIC8vIHRoaXMub3BlblNlYXJjaCgpO1xuICAgIHRoaXMuJGlucHV0LmtleXVwKChldmVudCkgPT4ge1xuICAgICAgLy8gaWYga2V5IGlzIGVudGVyIC0gYW5pbWF0ZSBvdXRcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTZWFyY2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMub3BlblNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICBcbiAgICAkKFwiYm9keVwiKS5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT09IDI3ICYmIHRoaXMuaXNPcGVuICkge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5sZXQgU2VhcmNoQm94ID0gbmV3IFNlYXJjaENvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCb3g7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBTZWFyY2hCb3ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hcIjtcblxuaW50ZXJmYWNlIE5hdlN0YXRlIHtcbiAgbmF2RW5hYmxlZDogYm9vbGVhbjtcbiAgbW9iaWxlOiBib29sZWFuO1xuICB0YWJsZXQ6IGJvb2xlYW47XG4gIGxhcHRvcDogYm9vbGVhbjtcbiAgZGVza3RvcDogYm9vbGVhbjtcbn1cblxuY2xhc3MgTmF2Q29tcG9uZW50IHtcbiAgJG5hdlRyaWdnZXI6IEhUTUxFbGVtZW50O1xuICAkbmF2RHJvcGRvd246IEhUTUxFbGVtZW50O1xuICAkbG93ZXJDb250YWluZXI6IEpRdWVyeTtcbiAgJHVwcGVyQ29udGFpbmVyOiBKUXVlcnk7XG4gICRuYXZNZXRhOiBKUXVlcnk7XG4gICRkcm9wRG93bldyYXBwZXI6IEpRdWVyeTtcbiAgJHNlYXJjaDogSlF1ZXJ5O1xuICAkZHJvcERvd25Db250ZW50OiBKUXVlcnk7XG5cbiAgc3RhdGU6IE5hdlN0YXRlO1xuICByZUlzb1RpbWVPdXQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuJG5hdlRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcHJvdXQtZHJvcGRvd24tdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIgPSAkKFwiLnNwcm91dC1kcm9wZG93bi13cmFwcGVyXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duQ29udGVudCA9ICQoXCIuc3Byb3V0LWRyb3Bkb3duLWNvbnRlbnRcIik7XG5cbiAgICAvKlxuICAgICBOYXYgU3RhdGUgT2JqZWN0XG4gICAgICovXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgZGVza3RvcDogZmFsc2VcbiAgICB9O1xuICB9XG5cbiAgLypcbiAgIE1vYmlsZSBOYXYgZnVuY3Rpb25hbGl0eVxuICAgKi9cbiAgb3Blbk5hdiggZXZlbnQ6IEV2ZW50ICk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAkKHRoaXMuJG5hdkRyb3Bkb3duKS5hZGRDbGFzcyhcIm1lbnUtaXMtYWN0aXZlXCIpO1xuXG4gICAgLy8gQ2hlY2sgaWYgdXNlciBpcyBsb2dnZWQgaW5cbiAgICBpZiAoICQoJ2JvZHknKS5oYXNDbGFzcyhcImFkbWluLWJhclwiKSApIHtcblxuICAgICAgLy8gY2hlY2sgd2hhdCB3aW5kb3cgc2l6ZSBpc1xuICAgICAgaWYgKCB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3ODIgKSB7XG5cbiAgICAgICAgVHdlZW5NYXgudG8odGhpcy4kbmF2RHJvcGRvd24sIC4zLCB7XG4gICAgICAgICAgICB0b3A6IDQ2LFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICB9IGVsc2UgaWYgKCB3aW5kb3cuaW5uZXJXaWR0aCA8PSA5OTEgKSB7XG5cbiAgICAgICAgVHdlZW5NYXgudG8odGhpcy4kbmF2RHJvcGRvd24sIC4zLCB7XG4gICAgICAgICAgICB0b3A6IDMyLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBUd2Vlbk1heC50byh0aGlzLiRuYXZEcm9wZG93biwgLjMsIHtcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfVxuICB9XG5cbiAgY2xvc2VOYXYoIGV2ZW50OiBFdmVudCApOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQodGhpcy4kbmF2RHJvcGRvd24pLnJlbW92ZUNsYXNzKFwibWVudS1pcy1hY3RpdmVcIik7XG4gICAgVHdlZW5NYXgudG8odGhpcy4kbmF2RHJvcGRvd24sIC4zLCB7XG4gICAgICAgIHRvcDogXCItMTAwJVwiLFxuICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmF2T3BlbkluaXQoIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJCh0aGlzLiRuYXZUcmlnZ2VyKS5vbihcImNsaWNrXCIsIHRoaXMub3Blbk5hdi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzLiRuYXZUcmlnZ2VyKS5vZmYoKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5hdkNsb3NlKCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuXG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJChcIiNuYXYtY2xvc2VcIikub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlTmF2LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI25hdi1jbG9zZVwiKS5vZmYoKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5hdkl0ZW1DbGljayggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcblxuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5jaGlsZHJlbihcImFcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAkKHRoaXMpO1xuICAgICAgICBzZWxlY3RlZC5uZXh0KFwidWxcIikucmVtb3ZlQ2xhc3MoXCJpcy1oaWRkZW5cIikucGFyZW50KFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikucGFyZW50KFwidWxcIikuYWRkQ2xhc3MoXCJtb3ZlLW91dFwiKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikuY2hpbGRyZW4oXCJhXCIpLm9mZigpO1xuICAgIH1cblxuICB9XG5cbiAgZ29iYWNrKCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuXG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJChcIi5nby1iYWNrID4gYVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9ICQodGhpcyk7XG4gICAgICAgIHNlbGVjdGVkLnBhcmVudChcImxpXCIpLnBhcmVudChcIi5zcHJvdXQtc2Vjb25kYXJ5LWRyb3Bkb3duXCIpLmFkZENsYXNzKFwiaXMtaGlkZGVuXCIpLnBhcmVudChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLnBhcmVudChcInVsXCIpLnJlbW92ZUNsYXNzKFwibW92ZS1vdXRcIik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIi5nby1iYWNrID4gYVwiKS5vZmYoKTtcbiAgICB9XG5cblxuICB9XG5cbiAgZGlzYWJsZU1vYmlsZU5hdigpIHtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiTmF2IHR1cm5lZCBvZmZcIik7XG4gICAgdGhpcy5uYXZPcGVuSW5pdChmYWxzZSk7XG4gICAgdGhpcy5uYXZDbG9zZShmYWxzZSk7XG4gICAgdGhpcy5uYXZJdGVtQ2xpY2soZmFsc2UpO1xuICAgIHRoaXMuZ29iYWNrKGZhbHNlKTtcbiAgICB0aGlzLnN0YXRlLm5hdkVuYWJsZWQgPSBmYWxzZTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIk5hdiB0dXJuZWQgb2ZmXCIpO1xuXG4gICAgLypcbiAgICAgUmVtb3ZlIFN0eWxlcyBmcm9tIGVsZW1lbnQgJiByZXNldCBkcm9wZG93blxuICAgICAqL1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duQ29udGVudC5yZW1vdmVDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgIGxldCBkcm9wZG93biA9IHRoaXMuJGRyb3BEb3duQ29udGVudC5maW5kKFwiLnNwcm91dC1zZWNvbmRhcnktZHJvcGRvd25cIik7XG5cbiAgICBkcm9wZG93bi5lYWNoKCggaW5kZXgsIGVsZW0gKSA9PiB7XG4gICAgICBpZiAoICEkKGVsZW0pLmhhc0NsYXNzKFwiaXMtaGlkZGVuXCIpICkge1xuICAgICAgICAkKGVsZW0pLmFkZENsYXNzKFwiaXMtaGlkZGVuXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBlbmFibGVNb2JpbGVOYXYoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJOYXYgdHVybmVkIG9uXCIpO1xuICAgIHRoaXMubmF2T3BlbkluaXQodHJ1ZSk7XG4gICAgdGhpcy5uYXZDbG9zZSh0cnVlKTtcbiAgICB0aGlzLm5hdkl0ZW1DbGljayh0cnVlKTtcbiAgICB0aGlzLmdvYmFjayh0cnVlKTtcblxuICAgIHRoaXMuc3RhdGUubmF2RW5hYmxlZCA9IHRydWU7XG5cbiAgfVxuXG4gIGJyZWFrUG9pbnRNb2JpbGUoKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IE1vYmlsZVwiKTtcblxuICAgIGlmICggIXRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZW5hYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuXG4gICAgLy8gRml4IGZvciBtb2JpbGUgd29yZHByZXNzIGFkbWluIGJhclxuICAgIC8vIGFuZCBub3Qgd3AtYWRtaW5cbiAgICBsZXQgYm9keSA9ICQoXCJib2R5XCIpO1xuXG4gICAgaWYgKCBib2R5Lmhhc0NsYXNzKFwiYWRtaW4tYmFyXCIpICYmIGJvZHkuaGFzQ2xhc3MoXCJ3cC1hZG1pblwiKSA9PT0gZmFsc2UgKSB7XG4gICAgICAkKFwiI3dwYWRtaW5iYXJcIikuY3NzKFwicG9zaXRpb25cIiwgXCJmaXhlZFwiKTtcbiAgICB9XG5cbiAgfVxuXG4gIGJyZWFrUG9pbnRUYWJsZXQoIHByZXZTdGF0ZSApIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgVGFibGV0XCIpO1xuICAgIGlmICggIXRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZW5hYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuXG4gIH1cblxuICBicmVha1BvaW50TGFwdG9wKCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IExhcHRvcFwiKTtcblxuICAgIGlmICggdGhpcy5zdGF0ZS5uYXZFbmFibGVkICkge1xuICAgICAgdGhpcy5kaXNhYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuXG4gIH1cblxuICBicmVha1BvaW50RGVza3RvcCggcHJldlN0YXRlICkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBEZXNrdG9wXCIpO1xuICB9XG5cbiAgc2FmYXJpUmVzaXplRml4KCkge1xuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVJc29UaW1lT3V0KTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZSBjb250YWluZXIgaGFzIGl0ZW1zIGluc2lkZSBpdFxuICAgIGlmICggVXRpbHMuYnJvd3NlciA9PT0gXCJzYWZhcmlcIiAmJiBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNhZmFyaVwiKTtcblxuICAgICAgLy8gcmVtb3ZlIGFuaW1hdGlvbiBjbGFzc2VzIHRlbXBvcmFyaWx5XG4gICAgICAkKHRoaXMuJG5hdkRyb3Bkb3duKS5yZW1vdmVDbGFzcyhcInNjZW5lX2VsZW1lbnQtLWZhZGVJblVwTmF2XCIpO1xuXG5cbiAgICAgIC8vIG9uIHJlc2l6ZSBjb21wbGV0ZSwgcmUtYWRkQ2xhc3MgZWxlbWVudHNcbiAgICAgIHRoaXMucmVJc29UaW1lT3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQodGhpcy4kbmF2RHJvcGRvd24pLmFkZENsYXNzKFwic2NlbmVfZWxlbWVudC0tZmFkZUluVXBOYXZcIik7XG4gICAgICB9LCA1MDApO1xuXG4gICAgfVxuICB9XG5cbiAgbmF2UmVzaXplKCkge1xuICAgIC8qXG4gICAgIE1vYmlsZVxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLm1vYmlsZSApIHtcblxuICAgICAgLy8gaWYgc3RhdGUgbW9iaWxlID0gZmFsc2UgLSB0aGVuIHJ1biBicmVha3BvaW50IG1vYmlsZVxuICAgICAgLy8gaWYgaXRzIHRydWUgdGhlbiBza2lwIGN1cyBpdHMgYWxyZWFkeSBtb2JpbGVcbiAgICAgIGlmICggIXRoaXMuc3RhdGUubW9iaWxlICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRNb2JpbGUoKTtcbiAgICAgIH1cbiAgICAgIC8vIFR1cm4gbW9iaWxlIG9uXG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogdHJ1ZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgVGFibGV0XG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAvLyB0YWJsZXQgYW5kIGhpZ2hlclxuICAgICAgLy8gZG8gb25jZVxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludFRhYmxldChwcmV2U3RhdGUpO1xuICAgICAgfVxuICAgICAgLy8gVHVybiBtb2JpbGUgb25cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiB0cnVlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBMYXB0b3BcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIGlmICggIXRoaXMuc3RhdGUubGFwdG9wICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRMYXB0b3AocHJldlN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogdHJ1ZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICBEZXNrdG9wXG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMuZGVza3RvcCApIHtcblxuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgIGlmICggIXRoaXMuc3RhdGUuZGVza3RvcCApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50RGVza3RvcChwcmV2U3RhdGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBzYWZhcmkgTmF2IHJlc2l6ZSBldmVudCBmaXhcbiAgICAgKi9cbiAgICB0aGlzLnNhZmFyaVJlc2l6ZUZpeCgpO1xuICB9XG5cbiAgbmF2TG9hZCgpIHtcbiAgICAvKlxuICAgICBTZXQgc3RhdGUgb24gbG9hZFxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLm1vYmlsZSApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50TW9iaWxlKCk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IHRydWUsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMudGFibGV0ICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnRUYWJsZXQodGhpcy5zdGF0ZSk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IHRydWUsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50TGFwdG9wKHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogdHJ1ZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5kZXNrdG9wICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnREZXNrdG9wKHRoaXMuc3RhdGUpO1xuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogdHJ1ZVxuICAgICAgfTtcblxuICAgIH1cbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJOYXYgbG9hZGVkXCIpO1xuXG4gICAgdGhpcy5uYXZMb2FkKCk7XG5cbiAgICAvKioqKioqKioqKioqKioqKlxuICAgICBOQVYgUkVTSVpFIEVWRU5UXG4gICAgICoqKioqKioqKioqKioqKi9cblxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9ICggZXZlbnQgKSA9PiB7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICAgID8gc2V0VGltZW91dCh0aGlzLm5hdlJlc2l6ZS5iaW5kKHRoaXMpLCAzMDApXG4gICAgICAgIDogd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLm5hdlJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG5cbiAgfVxufVxuXG5sZXQgTmF2ID0gbmV3IE5hdkNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBOYXY7IiwiZGVjbGFyZSB2YXIgU2Nyb2xsTWFnaWM6IGFueTtcbmNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgRGVzY09mZnNldEFuaW1hdGlvbiB7XG4gICR0aGlzOiBKUXVlcnk7XG4gIGlzX2Rlc2NfYW5pbWF0aW5nOiBib29sZWFuO1xuICBjb250cm9sbGVyOiBhbnk7XG4gIHNjZW5lOiBhbnk7XG4gIHNjZW5lMjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCBlbCApIHtcbiAgICB0aGlzLiR0aGlzID0gJChlbCk7XG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLnRhYmxldCApIHtcblxuICAgICAgLy8gRW5hYmxlIEFuaW1hdGlvblxuICAgICAgaWYgKCB0aGlzLmlzX2Rlc2NfYW5pbWF0aW5nID09PSBmYWxzZSApIHtcblxuICAgICAgICB0aGlzLmlzX2Rlc2NfYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kZXNjX29fYW5pbWF0ZSgpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gZGlzYWJsZSBhbmltYXRpb25cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMudGFibGV0ICkge1xuXG4gICAgICB0aGlzLmlzX2Rlc2NfYW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgICAgIGlmICggdHlwZW9mIHRoaXMuc2NlbmUgPT09IFwib2JqZWN0XCIgKSB7XG5cbiAgICAgICAgdGhpcy5zY2VuZS5kZXN0cm95KHRydWUpO1xuICAgICAgICB0aGlzLnNjZW5lMi5kZXN0cm95KHRydWUpO1xuXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBkZXNjX29fYW5pbWF0ZSgpIHtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMudGFibGV0ICkge1xuXG4gICAgICB0aGlzLmlzX2Rlc2NfYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgLy8gbmV3IHRpbWVsaW5lIGV2ZW50XG4gICAgICBsZXQgd2lwZUFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG4gICAgICAvLyBJbWFnZSBvbmUgcGxhY2VtZW50XG4gICAgICB3aXBlQW5pbWF0aW9uLmFkZChbXG4gICAgICAgIFR3ZWVuTWF4LmZyb21Ubyh0aGlzLiR0aGlzLmZpbmQoXCIuZGVzYy1vLWltYWdlLTFcIiksIDEsIHsgeVBlcmNlbnQ6IDAgfSwge1xuICAgICAgICAgIHlQZXJjZW50OiAtMjAsXG4gICAgICAgICAgZWFzZTogUG93ZXIwLmVhc2VJbk91dFxuICAgICAgICB9KVxuICAgICAgXSk7XG5cbiAgICAgIC8vIEltYWdlIDIgcGxhY2VtZW50XG4gICAgICBsZXQgd2lwZUFuaW1hdGlvbjIgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIHdpcGVBbmltYXRpb24yLmFkZChbXG4gICAgICAgIFR3ZWVuTWF4LmZyb21Ubyh0aGlzLiR0aGlzLmZpbmQoXCIuZGVzYy1vLWltYWdlLTJcIiksIDEsIHsgeVBlcmNlbnQ6IDAsIH0sIHtcbiAgICAgICAgICB5UGVyY2VudDogLTEwNSxcbiAgICAgICAgICBlYXNlOiBQb3dlcjAuZWFzZUluT3V0XG4gICAgICAgIH0pXG4gICAgICBdKTtcblxuXG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG4gICAgICB0aGlzLnNjZW5lID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKFxuICAgICAgICB7XG4gICAgICAgICAgdHJpZ2dlckVsZW1lbnQ6IHRoaXMuJHRoaXNbMF0sXG4gICAgICAgICAgZHVyYXRpb246IHRoaXMuJHRoaXMuaGVpZ2h0KCksXG4gICAgICAgICAgb2Zmc2V0OiAtMTAwXG4gICAgICAgIH0pXG4gICAgICAgIC5zZXRUd2Vlbih3aXBlQW5pbWF0aW9uKVxuICAgICAgICAvLyAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMSAoZHVyYXRpb246IEVsKVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAgIC5hZGRUbyh0aGlzLmNvbnRyb2xsZXIpO1xuXG4gICAgICB0aGlzLnNjZW5lMiA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgICAge1xuICAgICAgICAgIHRyaWdnZXJFbGVtZW50OiB0aGlzLiR0aGlzWzBdLFxuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLiR0aGlzLmhlaWdodCgpICsgMTAwLFxuICAgICAgICB9KVxuICAgICAgICAuc2V0VHdlZW4od2lwZUFuaW1hdGlvbjIpXG4gICAgICAgIC8vIC5hZGRJbmRpY2F0b3JzKHsgbmFtZTogXCIyIChkdXJhdGlvbjogRWwpXCIgfSkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcbiAgICAgICAgLmFkZFRvKHRoaXMuY29udHJvbGxlcik7XG4gICAgfVxuXG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgdGhpcy5kZXNjX29fYW5pbWF0ZSgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEZXNjT2Zmc2V0QW5pbWF0aW9uOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5kZWNsYXJlIHZhciBJc290b3BlOiBhbnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgR2FsbGVyeUNvbXBvbmVudCB7XG5cbiAgZ3JpZElkOiBzdHJpbmc7XG4gIGdhbGxlcnlfZ3JpZDogbnVtYmVyO1xuICBnYWxsZXJ5X3dyYXBwZXJfd2lkdGg6IG51bWJlcjtcbiAgJGZ1bGxHcmlkOiBKUXVlcnk7XG4gICRpc290b3BlR2FsbGVyeTogSlF1ZXJ5O1xuICAkZ2FsbGVyeUNvbnRhaW5lcjogSlF1ZXJ5O1xuICAkZ2FsbGVyeUl0ZW06IEpRdWVyeTtcbiAgJGZpbHRlcjogSlF1ZXJ5O1xuICAkZ3JpZDogYW55O1xuICBjdXJyZW50SGVpZ2h0OiBzdHJpbmc7XG4gIGN1cnJlbnRIZWlnaHRQWDogbnVtYmVyO1xuICByZUlzb1RpbWVPdXQ6IG51bWJlcjtcbiAgaXNDb250YWluZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ncmlkSWQgPSAkKFwiLmlubmVyLWNvbnRlbnQtbW9kdWxlXCIpLmNoaWxkcmVuKFwiZGl2XCIpLmF0dHIoXCJpZFwiKTtcbiAgICB0aGlzLiRmdWxsR3JpZCA9ICQoXCIjXCIgKyB0aGlzLmdyaWRJZCk7XG4gICAgdGhpcy4kZ2FsbGVyeUNvbnRhaW5lciA9ICQoXCIuZ2FsbGVyeS1jb250YWluZXJcIik7XG4gICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkgPSAkKFwiLmdhbGxlcnktaXNvdG9wZVwiKTtcbiAgICB0aGlzLiRnYWxsZXJ5SXRlbSA9ICQoXCIuZ2FsbGVyeS1pdGVtXCIpO1xuICAgIHRoaXMuJGZpbHRlciA9ICQoXCIuZmlsdGVyLWdyb3VwXCIpO1xuICB9XG5cbiAgc2V0dXBJc290b3BlKCkge1xuICAgIC8vIGluaXQgaXNvdG9wZVxuICAgIHRoaXMuJGdyaWQgPSB0aGlzLiRmdWxsR3JpZC5pc290b3BlKHtcbiAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgIGl0ZW1TZWxlY3RvcjogXCIuZ2FsbGVyeS1pdGVtXCIsXG4gICAgICBpc0luaXRMYXlvdXQ6IGZhbHNlLFxuICAgICAgbWFzb25yeToge1xuICAgICAgICBcImNvbHVtbldpZHRoXCI6IFwiLmdyaWQtc2l6ZXJcIlxuICAgICAgfSxcbiAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogXCIuM3NcIlxuICAgIH0pO1xuICB9XG5cbiAgZ2FsbGVyeUlzb3RvcGVXcmFwcGVyKCkge1xuICAgIGxldCB3aW5kb3dXaWR0aFJlZiA9ICQod2luZG93KS5pbm5lcldpZHRoKCk7IC8vIGZvciBzY3JvbGwgYmFyIGZpeCBjdXJyZW50bHlcblxuICAgIC8vIElzIGNvbnRhaW5lciBvciBmdWxsIHdpZHRoP1xuICAgIGlmICggdGhpcy4kZ2FsbGVyeUNvbnRhaW5lci5oYXNDbGFzcyhcImNvbnRhaW5lclwiKSApIHtcbiAgICAgIHRoaXMuaXNDb250YWluZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vXG4gICAgaWYgKCB3aW5kb3dXaWR0aFJlZiA+IDE2MDAgJiYgdGhpcy5pc0NvbnRhaW5lZCA9PT0gZmFsc2UgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDU7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gNjAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAxO1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDk5MSApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMjtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSAxMTk5ICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDQ7XG4gICAgfVxuXG4gICAgaWYgKCAkKFwiLmdhbGxlcnktMy1ncmlkXCIpLmxlbmd0aCA+IDAgJiYgd2luZG93V2lkdGhSZWYgPiAxMjQ4ICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAzO1xuICAgIH1cblxuICAgIGlmICggJChcIi5nYWxsZXJ5LTQtZ3JpZFwiKS5sZW5ndGggPiAwICYmIHdpbmRvd1dpZHRoUmVmID4gMTU4NCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gNDtcbiAgICB9XG5cbiAgICB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCA9ICQoXCIuZ2FsbGVyeS1jb250YWluZXJcIikud2lkdGgoKTtcblxuICAgIGlmICggdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggJSB0aGlzLmdhbGxlcnlfZ3JpZCA+IDAgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCA9IHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICsgKCB0aGlzLmdhbGxlcnlfZ3JpZCAtIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICUgdGhpcy5nYWxsZXJ5X2dyaWQpO1xuICAgIH1cbiAgICB0aGlzLiRpc290b3BlR2FsbGVyeS5jc3MoXCJ3aWR0aFwiLCB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCk7XG5cbiAgICByZXR1cm4gdGhpcy5nYWxsZXJ5X2dyaWQ7XG4gIH1cblxuICByZWxvYWRJc290b3BlKCkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZSgpO1xuICAgIHRoaXMuc2V0TWluSGVpZ2h0KCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIGNoZWNrIGlmIGhlaWdodCBpcyBhIHJvdW5kIG51bWJlciB0byBlbnN1cmUgbm8gMXB4IGlzc3Vlc1xuICAgICAgdGhpcy5jaGVja0NvbnRhaW5lckhlaWdodCgpO1xuICAgIH0sIDcwMCk7XG4gIH1cblxuICBzZXRNaW5IZWlnaHQoKSB7XG5cbiAgICBsZXQgaXRlbSA9ICQoXCIuZ2FsbGVyeS1pdGVtLndpZHRoMVwiKTtcblxuICAgIC8vIFNldCBtaW4gaGVpZ2h0IGRlcGVuZGluZyBvbmUgd2hhdCBjb250ZW50IHdhcyBmaWx0ZXJlZFxuICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGl0ZW0uY3NzKFwicGFkZGluZy1ib3R0b21cIik7XG4gICAgbGV0IGhlaWdodFN0ciA9IHRoaXMuY3VycmVudEhlaWdodC50b1N0cmluZygpO1xuICAgIHRoaXMuY3VycmVudEhlaWdodFBYID0gdGhpcy5weENvbnZlcnQoaGVpZ2h0U3RyKTtcblxuICAgIGlmICggdGhpcy5jdXJyZW50SGVpZ2h0UFggIT09IDAgKSB7XG5cbiAgICAgIHRoaXMuJGlzb3RvcGVHYWxsZXJ5LmNzcyhcIm1pbi1oZWlnaHRcIiwgTWF0aC5yb3VuZCh0aGlzLmN1cnJlbnRIZWlnaHRQWCkpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0UFggPSBpdGVtLmhlaWdodCgpO1xuXG4gICAgICB0aGlzLiRpc290b3BlR2FsbGVyeS5jc3MoXCJtaW4taGVpZ2h0XCIsIE1hdGgucm91bmQodGhpcy5jdXJyZW50SGVpZ2h0UFgpKTtcblxuICAgIH1cbiAgfVxuXG4gIHB4Q29udmVydCggb2JqZWN0SGVpZ2h0OiBzdHJpbmcgKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KG9iamVjdEhlaWdodC5zbGljZSgwLCAtMikpO1xuICB9XG5cbiAgYWRkSW1hZ2VUcmFuc2l0aW9uKCkge1xuICAgIC8vIGFkZCB0cmFuc2l0aW9uIGZvciBpbnRybyBhbmltYXRpb25cbiAgICB0aGlzLiRnYWxsZXJ5SXRlbS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiNjAwbXNcIik7XG4gIH1cblxuICBsb2FkSW1hZ2VzSW4oKSB7XG4gICAgdGhpcy4kZ3JpZC5pc290b3BlKFwib25jZVwiLCBcImFycmFuZ2VDb21wbGV0ZVwiLCAoKSA9PiB7XG5cbiAgICAgIC8vIGZhZGUgaW5cbiAgICAgIHRoaXMuJGdhbGxlcnlJdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyByZW1vdmUgYW5pbWF0aW9uIGZvciBzbW9vdGggZmlsdGVyaW5nIGFmdGVyIGltYWdlcyBoYXZlIGxvYWRlZCBpblxuICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgICB0aGlzLiRnYWxsZXJ5SXRlbS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiMG1zXCIpO1xuICAgICAgfSwgNTAwKTtcblxuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tDb250YWluZXJIZWlnaHQoKSB7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5sYXB0b3AgJiYgdGhpcy4kaXNvdG9wZUdhbGxlcnkuaGFzQ2xhc3MoXCJ3aWR0aC1jb250YWluZWRcIikpIHtcblxuICAgICAgbGV0IGN1cnJlbnRIZWlnaHQgPSB0aGlzLiRpc290b3BlR2FsbGVyeS5oZWlnaHQoKTtcblxuICAgICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkuY3NzKFwiaGVpZ2h0XCIsIGN1cnJlbnRIZWlnaHQgLSAxICsgXCJweFwiKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25SZXNpemUoKSB7XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZUlzb1RpbWVPdXQpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGNvbnRhaW5lciBoYXMgaXRlbXMgaW5zaWRlIGl0XG4gICAgaWYgKCB0aGlzLiRnYWxsZXJ5Q29udGFpbmVyLmxlbmd0aCA+IDAgKSB7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwicmVzaXplIGV2ZW50XCIpO1xuICAgICAgXG4gICAgICAvLyBzZXQgZ3JpZCBkaW1lbnNpb25cbiAgICAgIHRoaXMuZ2FsbGVyeUlzb3RvcGVXcmFwcGVyKCk7XG5cbiAgICAgIC8vIG9uIHJlc2l6ZSBjb21wbGV0ZSwgcmUtYWRqdXN0IGdyaWRcbiAgICAgIHRoaXMucmVJc29UaW1lT3V0ID0gc2V0VGltZW91dCh0aGlzLnJlbG9hZElzb3RvcGUuYmluZCh0aGlzKSwgNTAwKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25GaWx0ZXJDbGljayggZWwsIGVsMiApIHtcblxuICAgIGxldCAkdGhpcyA9ICQoZWwyLmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgJHRoaXMucGFyZW50KCkuY2hpbGRyZW4oXCJsaVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICB9KTtcblxuICAgICR0aGlzLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICBsZXQgZmlsdGVyVmFsdWUgPSAkdGhpcy5hdHRyKFwiZGF0YS1maWx0ZXJcIik7XG5cbiAgICB0aGlzLnJlRmlsdGVyKGZpbHRlclZhbHVlKTtcbiAgfVxuXG4gIHJlRmlsdGVyKCBpdGVtICkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZSh7XG4gICAgICBmaWx0ZXI6IGl0ZW1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJJc290b3BlIEluaXRcIik7XG5cbiAgICAvLyBBZGQgdHJhbnNpdGlvbiB0byBhbmltYXRlIGltYWdlIGluIGdyYWNlZnVsbHlcbiAgICB0aGlzLmFkZEltYWdlVHJhbnNpdGlvbigpO1xuXG4gICAgLy8gU2V0dXAgSXNvdG9wZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICB0aGlzLnNldHVwSXNvdG9wZSgpO1xuXG4gICAgLy8gQ3JlYXRlIHBlcmZlY3QgZ3JpZFxuICAgIHRoaXMuZ2FsbGVyeUlzb3RvcGVXcmFwcGVyKCk7XG5cbiAgICAvLyBkZWxheSBpc290b3BlIGluaXQgdXNpbmcgaGVscGVyIGZ1bmN0aW9uIHRoYXQgZmlyZXMgb24gcmVzaXplXG4gICAgc2V0VGltZW91dCh0aGlzLnJlbG9hZElzb3RvcGUuYmluZCh0aGlzKSwgMTAwMCk7XG5cbiAgICAvLyBBbmltYXRlIEltYWdlcyBpbiBvbkxvYWRcbiAgICB0aGlzLmxvYWRJbWFnZXNJbigpO1xuXG4gICAgLy8gQWRkIGZpbHRlciBvbiBDbGlja1xuICAgIGxldCAkdGhpcyA9IHRoaXM7XG4gICAgdGhpcy4kZmlsdGVyLm9uKFwiY2xpY2tcIiwgXCJsaVwiLCB0aGlzLm9uRmlsdGVyQ2xpY2suYmluZCh0aGlzLCAkdGhpcykpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxufVxuXG5sZXQgSXNvdG9wZUdhbGxlcnkgPSBuZXcgR2FsbGVyeUNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBJc290b3BlR2FsbGVyeTsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIFNsaWRlckNvbXBvbmVudCB7XG4gIGdhbGxlcnk6IEpRdWVyeTtcbiAgY29udGFpbmVyOiBKUXVlcnk7XG4gIGNsb3NlQnRuOiBKUXVlcnk7XG4gIG5leHRCdG46IEpRdWVyeTtcbiAgcHJldkJ0bjogSlF1ZXJ5O1xuICBpbmRleDogbnVtYmVyO1xuICBjdXJyZW50U2xpZGU6IG51bWJlcjtcbiAgdG90YWxTbGlkZTogbnVtYmVyO1xuICBjb3VudFRvdGFsOiBKUXVlcnk7XG4gIGN1cnJlbnRDb3VudDogSlF1ZXJ5O1xuICBzbGlkZXJPcGVuOiBib29sZWFuO1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCBlbCApIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9ICQoZWwpO1xuICAgIHRoaXMuZ2FsbGVyeSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuaGVhZGVyLXNsaWRlci1nYWxsZXJ5XCIpO1xuICAgIHRoaXMuY2xvc2VCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmhlYWRlci1zbGlkZXItY2xvc2VcIik7XG4gICAgdGhpcy5uZXh0QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zbGlkZXItbmF2aWdhdGlvbi1uZXh0XCIpO1xuICAgIHRoaXMucHJldkJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyLW5hdmlnYXRpb24tcHJldlwiKTtcbiAgICB0aGlzLmNvdW50VG90YWwgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnRvdGFsXCIpO1xuICAgIHRoaXMuY3VycmVudENvdW50ID0gdGhpcy5jb250YWluZXIuZmluZChcIi5jdXJyZW50XCIpO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMuY3VycmVudFNsaWRlID0gdGhpcy5pbmRleCArIDE7XG4gICAgdGhpcy5zbGlkZXJPcGVuID0gZmFsc2U7XG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeS5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0VG90YWxTbGlkZXMoKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSB0aGlzLmdhbGxlcnkuY2hpbGRyZW4oXCJsaVwiKS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U2xpZGU7XG4gIH1cblxuICB1cGRhdGVDdXJyZW50U2xpZGUoIGV2ZW50ICkge1xuXG4gICAgaWYgKCBldmVudCA9PT0gXCJyaWdodFwiICkge1xuICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGUrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRleC0tO1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGUtLTtcbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZU5hdiggaW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IEpRdWVyeSApIHtcblxuICAgIC8vIHVwZGF0ZSBudW1iZXJzIG9uIHNjcmVlblxuICAgIHRoaXMuY3VycmVudENvdW50Lmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gICAgLy8gRW5hYmxlL0Rpc2FibGUgYXJyb3cgYnRuc1xuICAgIHRoaXMucHJldkJ0bi5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6Zmlyc3QtY2hpbGRcIikpO1xuICAgIHRoaXMubmV4dEJ0bi5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6bGFzdC1jaGlsZFwiKSk7XG4gIH1cblxuICB1cGRhdGVTbGlkZSggZGlyZWN0aW9uICkge1xuXG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2xhc3MsIHRoZW4gbW92ZSBsZWZ0XG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBjdXJyZW50U2xpZGUubmV4dCgpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2xhc3MsIHRoZW4gbW92ZSBsZWZ0XG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIGN1cnJlbnRTbGlkZS5wcmV2KCkuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGluZGV4XG4gICAgdGhpcy51cGRhdGVDdXJyZW50U2xpZGUoZGlyZWN0aW9uKTtcblxuICAgIC8vIHVwZGF0ZSBOYXZpZ2F0aW9uXG4gICAgdGhpcy51cGRhdGVOYXYodGhpcy5pbmRleCwgdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuICB9XG5cbiAgYXJyb3dIYW5kbGVyKCBldmVudCApIHtcblxuICAgIC8vIGNoZWNrIHdoaWNoIGtleSB3YXMgcHJlc3NlZCBhbmQgbWFrZSBzdXJlIHRoZSBzbGlkZSBpc24ndCB0aGUgYmVnaW5uaW5nIG9yIHRoZSBsYXN0IG9uZVxuICAgIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInJpZ2h0XCIgJiYgdGhpcy5jdXJyZW50U2xpZGUgIT09IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcblxuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgJiYgdGhpcy5zbGlkZXJPcGVuICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDw9IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJsZWZ0XCIgJiYgdGhpcy5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuc2xpZGVyT3BlbiApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDw9IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBvcGVuU2xpZGVyKCBlbCwgZXZlbnQgKSB7XG4gICAgLy8gZWwgPSB0aGlzXG4gICAgLy8gZWwyIGlzIGV2ZW50XG4gICAgaWYgKCAhdGhpcy5jb250YWluZXIuaGFzQ2xhc3MoXCJpcy1hY3RpdmVcIikgJiYgJChldmVudC5jdXJyZW50VGFyZ2V0KS5pcyh0aGlzLmdhbGxlcnkpICkge1xuXG4gICAgICB0aGlzLnNsaWRlck9wZW4gPSB0cnVlO1xuXG4gICAgICB0aGlzLmNvbnRhaW5lclxuICAgICAgICAuYWRkQ2xhc3MoXCJpcy1hY3RpdmVcIilcbiAgICAgICAgLm9uZShcbiAgICAgICAgICBcIndlYmtpdFRyYW5zaXRpb25FbmQgXCIgK1xuICAgICAgICAgIFwib3RyYW5zaXRpb25lbmQgXCIgK1xuICAgICAgICAgIFwib1RyYW5zaXRpb25FbmQgXCIgK1xuICAgICAgICAgIFwibXNUcmFuc2l0aW9uRW5kIFwiICtcbiAgICAgICAgICBcInRyYW5zaXRpb25lbmRcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgJChcImJvZHksaHRtbFwiKVxuICAgICAgICAgICAgLmFuaW1hdGUoeyBcInNjcm9sbFRvcFwiOiB0aGlzLmNvbnRhaW5lci5vZmZzZXQoKS50b3AgfSwgMjAwKTtcblxuICAgICAgICAgIC8vIENsb3NlIEJ0biBhbmltYXRlIGluXG4gICAgICAgICAgbGV0IGNsb3NlQnRuQW5pbWF0aW9uID0gVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgeDogLTMwLFxuICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0LFxuICAgICAgICAgICAgZGVsYXk6IC4zXG4gICAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlU2xpZGVyKCBlICkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImlzLWFjdGl2ZVwiKTtcblxuICAgIHRoaXMuc2xpZGVyT3BlbiA9IGZhbHNlO1xuXG4gICAgVHdlZW5MaXRlXG4gICAgICAudG8oJCh3aW5kb3cpLCAuNSxcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvOiB7IHk6IDAgfSwgZWFzZTogUG93ZXIyLmVhc2VPdXQsXG4gICAgICAgICAgZGVsYXk6IC41XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICBsZXQgY2xvc2VCdG5BbmltYXRpb24gPSBUd2Vlbk1heC50byh0aGlzLmNsb3NlQnRuLCAuMywge1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIHo6IC4wMDEsXG4gICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0LFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICBUd2Vlbk1heC50byh0aGlzLmNsb3NlQnRuLCAuMywge1xuICAgICAgICAgIHJpZ2h0OiA1MFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrU2l6ZSgpIHtcblxuICAgIC8vIE9uIHJlc2l6ZSBlbmQgLSBjaGVjayB0byBlbmFibGUgY2xpY2tzIGZvciBkZXNrdG9wIG9yIHJlbW92ZSB0aGVtXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuICAgIHRoaXMucmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gdGhpcztcbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgICB0aGlzLmdhbGxlcnkub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TbGlkZXIuYmluZCh0aGlzLCAkdGhpcykpO1xuICAgICAgICB0aGlzLmNsb3NlQnRuLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVNsaWRlci5iaW5kKHRoaXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeS5vZmYoKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5vZmYoKTtcbiAgICAgIH1cblxuICAgIH0sIDQwMCk7XG5cbiAgfVxuXG4gIGluaXQoKSB7XG5cbiAgICAvLyBDcmVhdGUgQmluZGluZyBFdmVudHNcbiAgICB0aGlzLmNoZWNrU2l6ZSgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG4gICAgLy8gTGVmdCBhbmQgcmlnaHQgZXZlbnRzXG4gICAgdGhpcy5uZXh0QnRuLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcInJpZ2h0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5wcmV2QnRuLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcImxlZnRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIC8vIEpxdWVyeSBrZXlzIHBsdWdpblxuICAgICQoZG9jdW1lbnQpXG4gICAgICAuYmluZChcImtleWRvd25cIiwgXCJsZWZ0XCIsIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpXG4gICAgICAuYmluZChcImtleWRvd25cIiwgXCJlc2NcIiwgdGhpcy5jbG9zZVNsaWRlci5iaW5kKHRoaXMpKVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwicmlnaHRcIiwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAvLyB1cGRhdGUgbmF2IG9uIGZpcnN0IGxvYWRcbiAgICB0aGlzLnVwZGF0ZU5hdih0aGlzLmluZGV4LCB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKSk7XG5cbiAgICAvLyBzZXQgdG90YWwgc2xpZGVzIG51bWJlclxuICAgIHRoaXMuY291bnRUb3RhbC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldFRvdGFsU2xpZGVzKCkpKTtcbiAgfVxufVxuXG4vLyBsb29wIHRocm91Z2ggZWFjaCBoZWFkZXIgc2xpZGVyIG9iamVjdCBvbiB0aGUgcGFnZVxuY2xhc3MgSGVhZGVyU2xpZGVyQ29tcG9uZW50IHtcblxuICBpdGVtSW5mb1dyYXBwZXI6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlciA9ICQoXCIuaGVhZGVyLXNsaWRlci1jb250YWluZXJcIik7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiSGVhZGVyIFNsaWRlciBpbml0XCIpO1xuXG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgLy8gUGFzcyBcInRoaXNcIiB0byBlYWNoIG5ldyBIZWFkZXIgc2xpZGVyIGNvbXBvbmVudFxuICAgICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXJDb21wb25lbnQoZWwpO1xuICAgICAgc2xpZGVyLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmxldCBIZWFkZXJTbGlkZXIgPSBuZXcgSGVhZGVyU2xpZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlclNsaWRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cblxuY2xhc3MgU3ZnSGVhZGVyQ29tcG9uZW50IHtcbiAgc3ZnOiBKUXVlcnk7XG4gIGhlaWdodDogbnVtYmVyO1xuICB3aW5kb3c6IEpRdWVyeTtcbiAgd2luV2lkdGg6IG51bWJlcjtcbiAgcHJvcG9ydGlvbjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3ZnID0gJChcIi5kaXZpZGVyLXN2Z1wiKTtcbiAgICB0aGlzLndpbmRvdyA9ICQod2luZG93KTtcbiAgICB0aGlzLnByb3BvcnRpb24gPSAxODtcbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2luV2lkdGggLyB0aGlzLnByb3BvcnRpb247XG4gIH1cblxuICBfc2V0V2luZG93V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCk7XG4gIH1cblxuICBfc2V0U3ZnSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IGhlaWdodCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCkgLyAxODtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICByZXNpemVTdmcoKSB7XG5cbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NldFN2Z0hlaWdodCgpO1xuXG4gICAgLy8gc2V0IHdpZHRoIG9mIGl0ZW1cbiAgICAvLyB0aGlzLnN2Zy5hdHRyKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG4gICAgdGhpcy5zdmcuY3NzKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG5cbiAgICAvLyBzZXQgaGVpZ2h0IHByb3BvcnRpb24gb2YgMjhcbiAgICB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN2Zy5oZWlnaHQodGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgYW5pbWF0ZUluKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQW5pbWF0ZSBJblwiKTtcblxuICAgIHRoaXMuc3ZnID0gJChcIi5kaXZpZGVyLXN2Z1wiKTtcbiAgICB0aGlzLnByb3BvcnRpb24gPSAxODtcbiAgICB0aGlzLndpbmRvdyA9ICQod2luZG93KTtcbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy53aW5kb3cud2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2luV2lkdGggLyB0aGlzLnByb3BvcnRpb247XG5cbiAgICAvLyBzZXQgd2lkdGggb2YgaXRlbVxuICAgIHRoaXMuc3ZnLmF0dHIoXCJ3aWR0aFwiLCB0aGlzLndpbldpZHRoKTtcblxuICAgIC8vIHNldCBoZWlnaHQgcHJvcG9ydGlvbiBvZiAyOFxuICAgIHRoaXMuc3ZnLmF0dHIoXCJoZWlnaHRcIiwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuc3ZnLmhlaWdodCh0aGlzLmhlaWdodCk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy5zdmcsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIGJvdHRvbTogXCItM3B4XCIsXG4gICAgfSk7XG4gIH1cblxuICBsb2FkRGl2aWRlcigpIHtcbiAgICBsZXQgeSA9IFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMudGFibGV0ID8gMCA6IDUwO1xuICAgIFR3ZWVuTGl0ZS50byh0aGlzLnN2ZywgLjEsIHtcbiAgICAgIHk6IHksXG4gICAgICB6OiBcIi4wMDFcIixcbiAgICAgIHdpZHRoOiB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLl9zZXRTdmdIZWlnaHQoKSxcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIixcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgdGhpcy5zdmcucGFyZW50KFwiZGl2XCIpLmNzcyhcIm9wYWNpdHlcIiwgMSk7XG4gICAgICAgIHRoaXMuc3ZnLmFkZENsYXNzKFwibS1wYWdlIHNjZW5lX2VsZW1lbnQgc2NlbmVfZWxlbWVudC0tZmFkZWludXBEaXZpZGVyXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlN2ZyBoZWFkZXIgbG9hZGVkXCIpO1xuXG4gICAgLy8gdGhpcy5zdmcuaGVpZ2h0KHRoaXMuX3NldFN2Z0hlaWdodCgpKTtcbiAgICAvLyB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuX3NldFN2Z0hlaWdodCgpKTtcblxuICAgIHRoaXMubG9hZERpdmlkZXIoKTtcblxuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMucmVzaXplU3ZnLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IFN2Z0hlYWRlciA9IG5ldyBTdmdIZWFkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3ZnSGVhZGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG4vLyBUT0RPOiBTaWRlYmFyIGltYWdlIGxvYWRpbmdcbmNsYXNzIEltYWdlTG9hZGVyQ29tcG9uZW50IHtcbiAgYXJyOiBzdHJpbmdbXTtcbiAgYm9keTogSlF1ZXJ5O1xuICBjb250ZW50OiBKUXVlcnk7XG4gIGhlcm86IEpRdWVyeTtcbiAgaGFzSGVybzogbnVtYmVyO1xuICBiZ0ltYWdlOiBKUXVlcnk7XG4gIGhhc0JnSW1hZ2U6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFyciA9IFtdO1xuICAgIHRoaXMuYm9keSA9ICQoXCJib2R5XCIpO1xuICAgIHRoaXMuY29udGVudCA9ICQoXCIjY29udGVudFwiKTtcbiAgICB0aGlzLmhlcm8gPSAkKFwiLmhlcm9cIik7XG4gICAgdGhpcy5oYXNIZXJvID0gdGhpcy5oZXJvLmxlbmd0aDtcbiAgICB0aGlzLmJnSW1hZ2UgPSAkKFwiLmltZy1sb2FkZXItYmdcIik7XG4gICAgdGhpcy5oYXNCZ0ltYWdlID0gdGhpcy5iZ0ltYWdlLmxlbmd0aDtcbiAgfVxuXG4gIGFuaW1hdGVCbG9nUHJpbWFyeSgpOiB2b2lkIHtcbiAgICBsZXQgYmxvZ1ByaW1hcnkgPSAkKFwiLnByaW1hcnlcIik7XG4gICAgbGV0IGJsb2dCZ0ltYWdlID0gYmxvZ1ByaW1hcnkuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKTtcblxuICAgIGlmICggYmxvZ0JnSW1hZ2UgIT09IFwibm9uZVwiICkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgVHdlZW5MaXRlXG4gICAgICAgICAgLnRvKGJsb2dQcmltYXJ5LCAuMyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgejogXCIuMDAxXCIsXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlXG4gIC8vIGFuaW1hdGVIZXJvSGVhZGVyKCk6IHZvaWQge1xuICAvLyAgIGxldCBiID0gdGhpcy5oZXJvLmZpbmQoXCIuaGVyby1iYWNrZ3JvdW5kXCIpLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIik7XG4gIC8vXG4gIC8vICAgaWYgKCBiICE9PSBcIm5vbmVcIiApIHtcbiAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAvL1xuICAvLyAgICAgICB0aGlzLmhlcm8uYWRkQ2xhc3MoXCJsb2FkZWRcIik7XG4gIC8vXG4gIC8vICAgICAgIFR3ZWVuTGl0ZVxuICAvLyAgICAgICAgIC50byh0aGlzLmhlcm8sIC40LFxuICAvLyAgICAgICAgICAge1xuICAvLyAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAvLyAgICAgICAgICAgfVxuICAvLyAgICAgICAgICk7XG4gIC8vICAgICB9LCAzMDApO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vXG4gIC8vICAgICB0aGlzLmhlcm8uYWRkQ2xhc3MoXCJsb2FkZWRcIik7XG4gIC8vXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgYW5pbWF0ZUJsb2dBcnRpY2xlcygpOiB2b2lkIHtcbiAgICBsZXQgYW5pbWF0ZSA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5hcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICBhbmltYXRlLnRvKHRoaXMuYXJyWyBpIF0sIDAuMSwgeyBvcGFjaXR5OiBcIjFcIiwgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIiB9KTtcbiAgICB9XG4gIH1cblxuICBwcmVsb2FkSW1hZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuYXJyID0gW107XG5cbiAgICB0aGlzLmNvbnRlbnQuaW1hZ2VzTG9hZGVkKHsgYmFja2dyb3VuZDogdHJ1ZSB9LCAoKSA9PiB7XG5cbiAgICAgICAgLy8gQmxvZyBwcmltYXJ5IGFydGljbGVcbiAgICAgICAgdGhpcy5ib2R5Lmhhc0NsYXNzKFwiYmxvZ1wiKSA/IHRoaXMuYW5pbWF0ZUJsb2dQcmltYXJ5KCkgOiBcIlwiO1xuXG4gICAgICAgIC8vIEhlcm8gaGVhZGVyIGludHJvXG4gICAgICAgIC8vIHRoaXMuaGFzSGVybyA+IDAgPyB0aGlzLmFuaW1hdGVIZXJvSGVhZGVyKCkgOiBcIlwiO1xuICAgICAgICB0aGlzLmhhc0JnSW1hZ2UgPiAwID8gdGhpcy5iZ0ltYWdlLmFkZENsYXNzKFwibG9hZGVkXCIpIDogXCJcIjtcblxuICAgICAgfSlcbiAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCBpbnN0YW5jZSApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIGxvYWRlZFwiKTtcbiAgICAgIH0pXG4gICAgICAuZG9uZSgoIGluc3RhbmNlICkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBpbWFnZXMgc3VjY2Vzc2Z1bGx5IGxvYWRlZFwiKTtcblxuICAgICAgICAvLyBBbmltYXRpb24gZm9yIEJsb2cgaW5kZXggaG9tZXBhZ2VcbiAgICAgICAgdGhpcy5hbmltYXRlQmxvZ0FydGljbGVzKCk7XG4gICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoXCJpbWdMb2FkZWRcIik7XG4gICAgICAgIFxuICAgICAgICAvLyBFeGFtcGxlIG9uIGhvdyB0byB0cmlnZ2VyIGV2ZW50cyBlbHNld2hlcmVcbiAgICAgICAgLy8gJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coXCJpbWFnZSBsb2FkZWQgY3VzdG9tIGV2ZW50XCIpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgfSlcbiAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIGxvYWRlZCwgYXQgbGVhc3Qgb25lIGlzIGJyb2tlblwiKTtcbiAgICAgIH0pXG4gICAgICAucHJvZ3Jlc3MoKCBpbnN0YW5jZSwgaW1hZ2UgKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGltYWdlKTtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGltYWdlLmlzTG9hZGVkID8gXCJsb2FkZWRcIiA6IFwiYnJva2VuXCI7XG5cbiAgICAgICAgaWYgKCByZXN1bHQgKSB7XG4gICAgICAgICAgdGhpcy5hcnIucHVzaChpbWFnZS5pbWcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW1hZ2UgaXMgXCIgKyByZXN1bHQgKyBcIiBmb3IgXCIgKyBpbWFnZS5pbWcuc3JjKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcblxuICAgIGNvbnNvbGUubG9nKFwiSW1hZ2UgUHJlbG9hZGVyIE1vZHVsZVwiKTtcblxuICAgIHRoaXMucHJlbG9hZEltYWdlcygpO1xuICB9XG59XG5cbmxldCBJbWFnZUxvYWRlciA9IG5ldyBJbWFnZUxvYWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxvYWRlcjsiLCJkZWNsYXJlIHZhciBTY3JvbGxNYWdpYzogYW55O1xuY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IERlc2NPZmZzZXRBbmltYXRpb24gZnJvbSBcIi4vZGVzYy1vLWFuaW1hdGlvblwiO1xuXG5jbGFzcyBBbmltYXRpb25Db21wb25lbnQge1xuXG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICBpdGVtOiBKUXVlcnk7XG4gIG1TY2VuZTogSlF1ZXJ5O1xuICBzZXJ2aWNlU2lkZUJhcjogSlF1ZXJ5O1xuICBkZXNjT2Zmc2V0OiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKFwiLnByb2Nlc3MtY29udGFpbmVyXCIpO1xuICAgIHRoaXMuaXRlbSA9ICQoXCIucHJvY2Vzcy1pdGVtLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLm1TY2VuZSA9ICQoXCIubS1zY2VuZVwiKTtcbiAgICB0aGlzLnNlcnZpY2VTaWRlQmFyID0gJChcIi5zZXJ2aWNlLXNpZGViYXItd3JhcHBlclwiKTtcbiAgICB0aGlzLmRlc2NPZmZzZXQgPSAkKFwiLmRlc2Mtby1hbmltYXRlXCIpO1xuICB9XG5cbiAgcHJvY2Vzc0FuaW1hdGVJbigpIHtcbiAgICBsZXQgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW07XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuICAgIGxldCBzY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgIHtcbiAgICAgICAgdHJpZ2dlckVsZW1lbnQ6IFwiLnByb2Nlc3MtY29udGFpbmVyXCIsXG4gICAgICAgIGR1cmF0aW9uOiBjb250YWluZXIuaGVpZ2h0KCksXG4gICAgICAgIG9mZnNldDogLTI1MCxcbiAgICAgIH0pXG4gICAgICAub24oXCJlbnRlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0ZW0uZmluZChcIi5wcm9jZXNzLWl0ZW0taW5uZXJcIikuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICAgICAgY29udGFpbmVyLmZpbmQoXCJpbWdcIikuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICAgIH0pXG4gICAgICAvLyAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMSAoZHVyYXRpb246IG9mZnNldD8pXCIgfSkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcbiAgICAgIC5hZGRUbyhjb250cm9sbGVyKTtcbiAgfVxuXG4gIGFuaW1hdGVXaW5kb3dUb3AoKSB7XG4gICAgY29uc29sZS5sb2coXCJhbmltYXRlIFRvcFwiKTtcbiAgICBUd2VlbkxpdGVcbiAgICAgIC50bygkKHdpbmRvdyksIC4zLFxuICAgICAgICB7XG4gICAgICAgICAgc2Nyb2xsVG86IHtcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBhbmltYXRlU2VydmljZVNpZGViYXJPdXQoKSB7XG5cbiAgICBpZiAoIHRoaXMuc2VydmljZVNpZGVCYXIubGVuZ3RoID4gMCApIHtcblxuICAgICAgVHdlZW5MaXRlLnRvKHRoaXMuc2VydmljZVNpZGVCYXIsIC4zLCB7XG4gICAgICAgIHg6IFwiLTEwMFwiLFxuICAgICAgICB6OiBcIi4wMDFcIixcbiAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCIsXG4gICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAvLyByZW1vdmUgc2lkZWJhciBodG1sIGVsZW1lbnQgc28gaXQgZG9lc250IHNob3cgdXAgYWdhaW4gd2hlbiBzY3JvbGxpbmcgdXBcbiAgICAgICAgICB0aGlzLnNlcnZpY2VTaWRlQmFyLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIFR3ZWVuTGl0ZS50bygkKFwiLnNlcnZpY2Utc2lkZWJhci1ub3N0aWNrXCIpLCAuMywge1xuICAgICAgICB4OiBcIi0xMDBcIixcbiAgICAgICAgejogXCIuMDAxXCIsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiLFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHNpZGViYXIgaHRtbCBlbGVtZW50IHNvIGl0IGRvZXNudCBzaG93IHVwIGFnYWluIHdoZW4gc2Nyb2xsaW5nIHVwXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlU2lkZUJhci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGxvYWRVcmwoIHVybCwgbmV3V2luZG93PyApIHtcbiAgICAvLyBpZiB1cmwgaXMgdG8gb3BlbiBpbiBuZXcgd2luZG93IG9wZW4gaXQsIGVsc2Ugb3BlbiBpbiBzYW1lIHdpbmRvd1xuICAgIGlmICggbmV3V2luZG93ICkge1xuICAgICAgd2luZG93Lm9wZW4odXJsLCBuZXdXaW5kb3cpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgIH1cbiAgfVxuXG4gIG1haW5Db250ZW50QW5pbWF0aW9uT3V0KCBjYWxsYmFjayApIHtcblxuICAgIC8vIExvYWQgaW4gYW5pbWF0aW9ucyBoZXJlXG4gICAgdGhpcy5hbmltYXRlU2VydmljZVNpZGViYXJPdXQoKTtcblxuXG4gICAgdGhpcy5tU2NlbmUuYWRkQ2xhc3MoXCJpcy1leGl0aW5nXCIpXG4gICAgICAvLyBJZiBoYXMgd2Via2l0QW5pbWF0aW9uRW5kIC0gaXQgZ2V0cyBjYWxsZWQgdHdpY2VcbiAgICAgIC5vbmUoXCJvYW5pbWF0aW9uZW5kIG1zQW5pbWF0aW9uRW5kIGFuaW1hdGlvbmVuZFwiLCAoKSA9PiB7XG5cbiAgICAgICAgLy8gTG9hZCBpbiBhbmltYXRpb25zIGhlcmUgdGhhdCBuZWVkIHRvIG9jY3VyIGFmdGVyIG1haW4gb25lc1xuICAgICAgICB0aGlzLmFuaW1hdGVXaW5kb3dUb3AoKTtcblxuICAgICAgfSk7XG5cbiAgICBpZiAoIHR5cGVvZihjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICBjaGVja1VybCggdXJsICk6IGJvb2xlYW4ge1xuICAgIGlmICggdXJsLm1hdGNoKC9eIy8pICE9PSBudWxsIHx8IHVybCA9PT0gXCJcIiApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsQ2xpY2tDaGVjayggZXZlbnQ/ICkge1xuXG4gICAgLy8gR2V0IHVybCBmcm9tIHRoZSBhIHRhZ1xuICAgIGxldCBuZXdVcmwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJocmVmXCIpO1xuICAgIGxldCB0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJ0YXJnZXRcIik7XG4gICAgbGV0IGhhc0NoaWxkcmVuID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoXCJsaVwiKS5oYXNDbGFzcyhcIm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIik7XG5cbiAgICAvKlxuICAgICAqIEZpcnN0IFZhbGlkYXRpb246IElzIHRoZSB1cmwgdmFsaWRcbiAgICAgKi9cbiAgICBpZiAoICF0aGlzLmNoZWNrVXJsKG5ld1VybCkgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogSWYgZmlyc3QgdmFsaWRhdGlvbiBmYWlscywgdGhlIHVybCBpcyByZWFsIGFuZCBjb250aW51ZSB2YWxpZGF0aW5nXG4gICAgICovXG4gICAgLypcbiAgICAgKiBDaGVjayBpZiBpdHMgaG9yaXpvbnRhbCB0YWJsZXQgYW5kIHVzZXIgaXMgdGFwcGluZyBvbiBtZW51XG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCAmJlxuICAgICAgdGhpcy5jaGVja1VybChuZXdVcmwpICYmXG4gICAgICBVdGlscy5icm93c2VyID09PSBcImlwYWRcIiAmJiBoYXNDaGlsZHJlbiApIHtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcblxuICAgIH0gZWxzZSBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPiBVdGlscy5icHMudGFibGV0ICYmIHRoaXMuY2hlY2tVcmwobmV3VXJsKSApIHtcblxuICAgICAgLypcbiAgICAgICAqIENoZWNrIGlmIGl0cyBsYXJnZXIgdGhhbiB0YWJsZXQgYnV0IG5vdCBhbiBpcGFkIGFuZCBpZiBpdCBuZWVkcyB0byBvcGVuIGluIG5ldyB3aW5kb3dcbiAgICAgICAqL1xuXG4gICAgICBpZiAoIHRhcmdldCA9PT0gXCJfYmxhbmtcIiB8fCBuZXdVcmwubWF0Y2goL150ZWwvKSApIHtcbiAgICAgICAgdGhpcy5sb2FkVXJsKG5ld1VybCwgdGFyZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubWFpbkNvbnRlbnRBbmltYXRpb25PdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZFVybChuZXdVcmwsIHRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICggdGhpcy5jaGVja1VybChuZXdVcmwpICYmIGhhc0NoaWxkcmVuICkge1xuXG4gICAgICAvKlxuICAgICAgICogQ2hlY2sgaWYgaXRzIG1vYmlsZSBuYXYgbWVudSB0aGF0IGhhcyBjaGlsZHJlblxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW9iaWxlIG1lbnUgaXMgYWN0aXZlIGFuZCBwYXJlbnQgY2xpY2tlZFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogUGFzc2VkIHRoZSBjaGVja3MgTG9hZCBpdCFcbiAgICAgICAqL1xuXG4gICAgICB0aGlzLmxvYWRVcmwobmV3VXJsLCB0YXJnZXQpO1xuICAgIH1cblxuICB9XG5cbiAgZGVzY09mZnNldENoZWNrKCkge1xuICAgIGlmICggdGhpcy5kZXNjT2Zmc2V0Lmxlbmd0aCA+IDAgKSB7XG4gICAgICB0aGlzLmFkZERlc2NPZmZzZXRNb2R1bGUoKTtcbiAgICB9XG4gIH1cblxuICBhZGREZXNjT2Zmc2V0TW9kdWxlKCkge1xuICAgIHRoaXMuZGVzY09mZnNldC5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAvLyBQYXNzIFwidGhpc1wiIHRvIGVhY2ggbmV3IEhlYWRlciBzbGlkZXIgY29tcG9uZW50XG4gICAgICBsZXQgYW5pbWF0aW9uID0gbmV3IERlc2NPZmZzZXRBbmltYXRpb24oZWwpO1xuICAgICAgYW5pbWF0aW9uLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5wcm9jZXNzQW5pbWF0ZUluKCk7XG4gICAgLy8gdGhpcy5kZXNjX29fYW5pbWF0ZSgpO1xuXG4gICAgLy8gQ2xpY2sgZXZlbnQgdG8gY29udHJvbCB3aW5kb3cgTG9hZGluZ1xuICAgICQoXCJhXCIpLm9uKFwiY2xpY2tcIiwgKCBlICkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5nbG9iYWxDbGlja0NoZWNrKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gQ2hlY2sgZm9yIFZDIGdyaWQgbGlua1xuICAgIGlmICggJChcIi52Y19ncmlkLWNvbnRhaW5lclwiKS5sZW5ndGggPiAwICkge1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgJChcIi52Y19ncmlkLWNvbnRhaW5lclwiKS5maW5kKFwiYVwiKS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuICAgICAgICAgICQoZWwpLm9uKFwiY2xpY2tcIiwgKCBlICkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5nbG9iYWxDbGlja0NoZWNrKGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgfSwgMjAwMCk7XG4gICAgfVxuXG4gICAgdGhpcy5kZXNjT2Zmc2V0Q2hlY2soKTtcblxuICAgIC8vIFNQRUNJQUwgVEFCTEVTIEFERCBDTEFTU1xuICAgIGlmICggJChcIi5kYXRhVGFibGVzX3dyYXBwZXJcIikubGVuZ3RoID4gMCApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWRkIGRhdGEgdGFibGUgY2xhc3NcIik7XG4gICAgICBsZXQgZWwgPSAkKFwiLmRhdGFUYWJsZXNfd3JhcHBlclwiKTtcblxuICAgICAgZWwuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcbiAgICAgICAgJChlbCkuYWRkQ2xhc3MoXCJ0YWJsZS1yZXNwb25zaXZlXCIpO1xuICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvLyAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5jaGVja1NpemUuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBDdXN0b20gZXZlbnQgZXhhbXBsZVxuICAgIC8vICQoZG9jdW1lbnQpLm9uKFwidGVzdFwiLCB7fSwgKCBldmVudCwgYXJnMSwgYXJnMiApID0+IHtcbiAgICAvL1xuICAgIC8vICAgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCApIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhhcmcxKTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJnMik7XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyB9KS5iaW5kKHRoaXMpO1xuXG4gIH1cbn1cblxubGV0IEFuaW1hdGlvbkNvbnRyb2xsZXIgPSBuZXcgQW5pbWF0aW9uQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IEFuaW1hdGlvbkNvbnRyb2xsZXI7XG5cbiIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuXG5pbnRlcmZhY2UgUXVvdGVTdGF0ZUludGVyZmFjZSB7XG4gIHNlbGVjdGVkOiBzdHJpbmc7XG4gIGlzRm9ybUFjdGl2ZTogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIFF1b3RlU2VsZWN0ZWRPYmplY3Qge1xuICB0aXRsZTogc3RyaW5nO1xuICBwcmljZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBidWxsZXRzOiBPYmplY3Q7XG4gIGltZ1NyYzogc3RyaW5nO1xufVxuXG5jbGFzcyBRdW90ZUNvbXBvbmVudCB7XG5cbiAgc2VsZWN0QnRuOiBKUXVlcnk7XG4gIHN3aXRjaEJ0bjogSlF1ZXJ5O1xuICBmb3JtQnVpbGRlcjogSlF1ZXJ5O1xuICBxdW90ZUNob29zZXI6IEpRdWVyeTtcbiAgaW5wdXRzOiBKUXVlcnk7XG4gIHF1b3RlSXRlbXNBcnJheTogSlF1ZXJ5O1xuICBzZWxlY3RDb25haW5lcjogSlF1ZXJ5O1xuICBzdGF0ZTogUXVvdGVTdGF0ZUludGVyZmFjZTtcbiAgcXVvdGVDb250YWluZXI6IEpRdWVyeTtcbiAgc2VsZWN0ZWRJdGVtOiBRdW90ZVNlbGVjdGVkT2JqZWN0O1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuICBjdXJyZW50QnJlYWtwb2ludDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucXVvdGVDb250YWluZXIgPSAkKFwiLnF1b3RlXCIpO1xuICAgIHRoaXMuc2VsZWN0QnRuID0gJChcIi5xdW90ZV9fc2VsZWN0LS1idG5cIik7XG4gICAgdGhpcy5xdW90ZUl0ZW1zQXJyYXkgPSAkKFwiLnF1b3RlX19pdGVtXCIpO1xuICAgIHRoaXMuZm9ybUJ1aWxkZXIgPSAkKFwiLnF1b3RlX19mb3JtLS1pbnB1dFwiKTtcbiAgICB0aGlzLnF1b3RlQ2hvb3NlciA9ICQoXCIucXVvdGVfX2Zvcm0tLXNlbGVjdFwiKTtcbiAgICB0aGlzLnNlbGVjdENvbmFpbmVyID0gdGhpcy5zZWxlY3RCdG4uZmluZChcIi5maWVsZHNldFwiKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2VsZWN0ZWQ6ICcnLFxuICAgICAgaXNGb3JtQWN0aXZlOiBmYWxzZVxuICAgIH07XG4gICAgdGhpcy5jdXJyZW50QnJlYWtwb2ludCA9IFV0aWxzLmJyZWFrcG9pbnQ7XG5cbiAgfVxuXG4gIGdldFNlbGVjdGVkTGFiZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0Q29uYWluZXIuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIHNldFdpZHRoKCBsYWJlbDogSlF1ZXJ5ICkge1xuXG4gICAgbGV0IGxhYmVsV2lkdGggPSBsYWJlbC5vdXRlcldpZHRoKCk7XG4gICAgdGhpcy5zd2l0Y2hCdG4uY3NzKFwid2lkdGhcIiwgbGFiZWxXaWR0aCk7XG5cbiAgfVxuXG4gIGJ1aWxkU2VsZWN0Qm94KCkge1xuXG4gICAgbGV0IG5hbWVzID0gW107XG4gICAgbGV0IGZyYWdtZW50ID0gJChkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpO1xuXG4gICAgLy8gZ2V0IGgyIHRpdGxlcyBmcm9tIGVhY2ggcXVvdGUgaXRlbVxuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5LmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9ICQoZWwpLFxuICAgICAgICB0aXRsZSA9ICR0aGlzLmZpbmQoXCIuY2FyZF9faXRlbS0tY29udGVudCA+IGgyXCIpLnRleHQoKSxcbiAgICAgICAgbmFtZSA9IHRpdGxlLnRvTG9jYWxlTG93ZXJDYXNlKCksXG4gICAgICAgIHVuaXF1ZUlkID0gbmFtZSArIFwiLVwiICsgaW5kZXg7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwiVGl0bGU6IFwiLCB0aXRsZSk7XG5cbiAgICAgIC8vIEFkZCBtYXRjaGluZyBJRCdzIHRvIGVhY2ggQ2FyZFxuICAgICAgJHRoaXMuYXR0cihcImlkXCIsIHVuaXF1ZUlkKTtcblxuICAgICAgLy8gQ3JlYXRlIGlucHV0IGFuZCBsYWJlbCBET00gZWxlbWVudHNcbiAgICAgIGxldCBpbnB1dCA9IFV0aWxzLmJ1aWxkSHRtbChcImlucHV0XCIsIHtcbiAgICAgICAgaWQ6IHVuaXF1ZUlkLFxuICAgICAgICB0eXBlOiBcInJhZGlvXCIsXG4gICAgICAgIGNsYXNzOiBcInF1b3RlX19pbnB1dFwiLFxuICAgICAgICBuYW1lOiB1bmlxdWVJZCxcbiAgICAgICAgdmFsdWU6IG5hbWVcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgbGFiZWwgPSBVdGlscy5idWlsZEh0bWwoXCJsYWJlbFwiLCB7XG4gICAgICAgIGZvcjogdW5pcXVlSWQsXG4gICAgICAgIGNsYXNzOiBpbmRleCA9PT0gMCA/IFwic2VsZWN0ZWRcIiA6IFwiXCJcbiAgICAgIH0sIHRpdGxlKTtcblxuXG4gICAgICBmcmFnbWVudC5hcHBlbmQoaW5wdXQpLmFwcGVuZChsYWJlbCk7XG5cbiAgICB9KTtcblxuICAgIC8vIEdldCBjb2xvciBmcm9tIGRhdGEgZWwgYW5kIHNldCBidXR0b25cbiAgICBsZXQgJGJ1dHRvbl9jb2xvciA9IHRoaXMuc2VsZWN0Q29uYWluZXIuZGF0YShcImNvbG9yXCIpO1xuICAgIGZyYWdtZW50LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJxdW90ZV9fc3dpdGNoIHNoYWRvdy1zbWFsbC1idG5cIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JyArICRidXR0b25fY29sb3IgKyAnXCI+PC9zcGFuPicpO1xuXG4gICAgdGhpcy5zZWxlY3RDb25haW5lci5hcHBlbmQoZnJhZ21lbnQpO1xuXG4gIH1cblxuICBidWlsZFNlbGVjdEV2ZW50SGFuZGxlcnMoKSB7XG4gICAgdGhpcy5pbnB1dHMgPSB0aGlzLnNlbGVjdEJ0bi5maW5kKFwiLnF1b3RlX19pbnB1dFwiKTtcbiAgICB0aGlzLnN3aXRjaEJ0biA9ICQoXCIucXVvdGVfX3N3aXRjaFwiKTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBlYWNoIGl0ZW0gYW5kIHNldCB3aWR0aCBhbmQgY2hhbmdlIGV2ZW50cyBhbmQgY2hlY2tlZCBzdGF0dXNcbiAgICB0aGlzLmlucHV0cy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgbmV4dExhYmVsID0gJHRoaXMubmV4dCgpO1xuXG4gICAgICBpZiAoIGluZGV4ID09PSAwICkge1xuICAgICAgICAkdGhpcy5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcblxuICAgICAgICAvLyBzZXQgc3RhdGUgdG8gY3VycmVudCBzZWxlY3RlZCBpbnB1dCBJRFxuICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBmaW5kIFNlbGVjdGVkLCBnZXQgd2lkdGggb2YgbGFiZWwsIHNldCB3aWR0aCBvZiBzcGFuXG4gICAgICBpZiAoIG5leHRMYWJlbC5oYXNDbGFzcyhcInNlbGVjdGVkXCIpICkge1xuICAgICAgICB0aGlzLnNldFdpZHRoKG5leHRMYWJlbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBvbiBjaGFuZ2UgZnVuY3Rpb24gaGVyZVxuICAgICAgJHRoaXMuY2hhbmdlKHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBidWlsZENhcmRFdmVudEhhbmRsZXJzKCkge1xuXG4gICAgLy8gTWFpbiBDYXJkc1xuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5LmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9ICQoZWwpLFxuICAgICAgICBidXR0b24gPSAkdGhpcy5maW5kKFwiLmNhcmRfX2l0ZW0tLWJ0blwiKTtcblxuICAgICAgYnV0dG9uLm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuRm9ybS5iaW5kKHRoaXMpKTtcblxuICAgIH0pO1xuXG4gICAgLy8gQmFjayBidXR0b24gZm9yIHRhYmxldFxuICAgIGxldCBidXR0b24gPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIudGFibGV0XCIpLmZpbmQoXCIuZ28tYmFja1wiKTtcbiAgICBidXR0b24ub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlRm9ybS5iaW5kKHRoaXMpKTtcblxuICB9XG5cbiAgZmFkZUluKCBlbDogSlF1ZXJ5ICkge1xuXG4gICAgVHdlZW5NYXgudG8oZWwsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IC4zXG4gICAgfSk7XG5cbiAgfVxuXG4gIHNldFRyYW5zbGF0ZVgoIGN1cnJlbnRUYXJnZXQ6IEpRdWVyeSwgd2lkdGg6IE51bWJlciApIHtcbiAgICBsZXQgJHRoaXMgPSBjdXJyZW50VGFyZ2V0O1xuICAgIGxldCBpbnB1dElkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuXG4gICAgLy8gaWYgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpbnB1dCBtYXRjaGVzIHRoZSAybmQgaXRlbSAtIHRoZW4gbW92ZSBzd2l0Y2hCdG4gcmlnaHQsIG90aGVyd2lzZSBiYWNrIHRvIHBvc2l0aW9uIDFcbiAgICBpZiAoIGlucHV0SWQgPT09ICQodGhpcy5pbnB1dHNbIDEgXSkuYXR0cihcImlkXCIpICkge1xuICAgICAgdGhpcy5zd2l0Y2hCdG4uY3NzKHtcbiAgICAgICAgXCJ3ZWJraXRUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgd2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcIk1velRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyB3aWR0aCArIFwicHgpXCIsXG4gICAgICAgIFwibXNUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgd2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcIk9UcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgd2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcInRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyB3aWR0aCArIFwicHgpXCJcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN3aXRjaEJ0bi5jc3Moe1xuICAgICAgICBcIndlYmtpdFRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiLFxuICAgICAgICBcIk1velRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiLFxuICAgICAgICBcIm1zVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCIsXG4gICAgICAgIFwiT1RyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiLFxuICAgICAgICBcInRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZSggZSApIHtcblxuICAgIGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KSxcbiAgICAgIGZpZWxkc2V0ID0gJHRoaXMucGFyZW50KFwiLmZpZWxkc2V0XCIpLFxuICAgICAgcHJldkl0ZW0gPSBmaWVsZHNldC5maW5kKFwiLnNlbGVjdGVkXCIpLFxuICAgICAgcHJldldpZHRoID0gcHJldkl0ZW0ub3V0ZXJXaWR0aCgpIC0gMSxcbiAgICAgIGlucHV0SWQgPSAkdGhpcy5hdHRyKFwiaWRcIik7XG5cbiAgICAvLyByZW1vdmUgc2VsZWN0ZWQgZnJvbSBQcmV2IExhYmVsXG4gICAgZmllbGRzZXQuZmluZChcImxhYmVsXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAvLyByZW1vdmUgY2hlY2tlZCBzdGF0ZSBmcm9tIHByZXYgaW5wdXRcbiAgICBwcmV2SXRlbS5wcmV2KFwiaW5wdXRcIikucHJvcChcImNoZWNrZWRcIiwgZmFsc2UpO1xuXG4gICAgLy8gc2V0IG5ldyBpdGVtIHRvIHNlbGVjdGVkIGFuZCBjaGVja2VkXG4gICAgbGV0IHNlbGVjdGVkTGFiZWwgPSBmaWVsZHNldC5maW5kKFwibGFiZWxbZm9yPVwiICsgaW5wdXRJZCArIFwiXVwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICR0aGlzLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xuXG4gICAgLy8gaWYgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpbnB1dCBtYXRjaGVzIHRoZSAybmQgaXRlbSAtIHRoZW4gbW92ZSBzd2l0Y2hCdG4gcmlnaHQsIG90aGVyd2lzZSBiYWNrIHRvIHBvc2l0aW9uIDFcbiAgICB0aGlzLnNldFRyYW5zbGF0ZVgoJHRoaXMsIHByZXZXaWR0aCk7XG5cbiAgICAvLyBjaGFuZ2UgdGhlIHdpZHRoIG9mIHRoZSBidG4gdG8gbWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBuZXcgbGFiZWxcbiAgICB0aGlzLnNldFdpZHRoKHNlbGVjdGVkTGFiZWwpO1xuXG4gICAgLy8gc2V0IHN0YXRlIHRvIHRoZSBuZXdseSBzZWxlY3RlZCBpbnB1dFxuICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgPSAkdGhpcy5hdHRyKFwiaWRcIik7XG4gICAgY29uc29sZS5sb2coXCJDdXJyZW50IFN0YXRlIGlzOiBcIiwgdGhpcy5zdGF0ZS5zZWxlY3RlZCk7XG5cbiAgICB0aGlzLnRvZ2dsZUNhcmRzKCk7XG5cbiAgfVxuXG4gIHRvZ2dsZUNhcmRzKCkge1xuXG4gICAgLy8gYmFzZWQgb24gc3RhdGUsIGFkZCBzZWxlY3RlZCB0byB0aGUgY2FyZCdzIGlkIG1hdGNoaW5nIHRoZSBzdGF0ZVxuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5LmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9ICQoZWwpLFxuICAgICAgICBpZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcblxuICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZCBzaGFkb3ctbWVkaXVtLWRhcmtcIik7XG5cbiAgICAgIGlmICggaWQgPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWQgKSB7XG5cbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoXCJzZWxlY3RlZCBzaGFkb3ctbWVkaXVtLWRhcmtcIik7XG5cbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH1cblxuICBzZXRBY3RpdmVQbGFuKCkge1xuXG4gICAgbGV0IGlkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZDtcblxuICAgIGxldCBzZWxlY3RlZENhcmQgPSB0aGlzLnF1b3RlSXRlbXNBcnJheS5maWx0ZXIoKCBpdGVtICkgPT4ge1xuICAgICAgcmV0dXJuICQodGhpcy5xdW90ZUl0ZW1zQXJyYXlbIGl0ZW0gXSkuYXR0cihcImlkXCIpID09PSBpZDtcbiAgICB9KTtcblxuICAgIGxldCBidXR0b24gPSAnPGEgY2xhc3M9XCJyb3VuZGVkLWJ0biB3aGl0ZS1idG4gZ28tYmFja1wiIGhyZWY9XCIjXCI+R28gQmFjazwvYT4nO1xuXG4gICAgLy8gZmluZCBmb3JtXG4gICAgbGV0IGZvcm1SZWYgPSBzZWxlY3RlZENhcmQuZmluZChcIi5xdW90ZV9fZm9ybS0tdGVtcFwiKS5maW5kKFwiLnF1b3RlX19mb3JtLS1pbm5lclwiKTtcbiAgICBsZXQgZm9ybSA9IGZvcm1SZWYuZGV0YWNoKCk7XG5cbiAgICAvLyBjbG9uZWQgZWxlbWVudFxuICAgIGxldCBtb2RpZmllZEVsZW1lbnQgPSBzZWxlY3RlZENhcmQuY2xvbmUoKTtcblxuICAgIC8vIHJlbW92ZSBmb3JtIGZyb20gY2xvbmVkIGl0ZW0uXG4gICAgLy8gbW9kaWZpZWRFbGVtZW50LmZpbmQoXCIucXVvdGVfX2Zvcm0tLWl0ZW0udGVtcFwiKS5yZW1vdmUoKTtcbiAgICAvLyBmb3JtUmVmLnJlbW92ZSgpO1xuXG4gICAgLy8gYWRkIGZvcm0gdG8gdGhlIFZDIGNvbnRlbnQgYXJlYVxuICAgIGxldCBxdW90ZUZvcm1Db250YWluZXIgPSAkKFwiLnF1b3RlX19mb3JtLS12Y1wiKTtcbiAgICBxdW90ZUZvcm1Db250YWluZXIuYXBwZW5kKGZvcm0pO1xuXG4gICAgLy8gZmluZCBidXR0b24gYW5kIHJlbW92ZVxuICAgIG1vZGlmaWVkRWxlbWVudC5maW5kKFwiLmNhcmRfX2l0ZW0tLWJ0blwiKS5yZW1vdmUoKTtcblxuICAgIC8vIG1vZGlmaWVkRWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLmdvLWJhY2tcIikpO1xuICAgIGxldCBjYXJkV3JhcHBlciA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5xdW90ZV9fZm9ybS0tY2FyZC13cmFwcGVyXCIpO1xuXG4gICAgY2FyZFdyYXBwZXIuYXBwZW5kKG1vZGlmaWVkRWxlbWVudCkuYXBwZW5kKGJ1dHRvbik7XG5cbiAgICAvLyBCYWNrIGJ1dHRvbiBpbnNpZGUgd3JhcHBlclxuICAgIGxldCBidXR0b25Eb20gPSBjYXJkV3JhcHBlci5maW5kKFwiLmdvLWJhY2tcIik7XG4gICAgYnV0dG9uRG9tLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKSk7XG5cblxuICB9XG5cbiAgcHV0Rm9ybUJhY2soIGZvcm06IEpRdWVyeSApIHtcbiAgICBsZXQgaWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkO1xuICAgIC8vIGZpbmQgZWxlbWVudCBpZCB0aGF0IG1hdGNoZXMgdGhlIGN1cnJlbnQgc3RhdGVcbiAgICBsZXQgc2VsZWN0ZWRDYXJkID0gdGhpcy5xdW90ZUl0ZW1zQXJyYXkuZmlsdGVyKCggaXRlbSApID0+IHtcbiAgICAgIHJldHVybiAkKHRoaXMucXVvdGVJdGVtc0FycmF5WyBpdGVtIF0pLmF0dHIoXCJpZFwiKSA9PT0gaWQ7XG4gICAgfSk7XG5cbiAgICBzZWxlY3RlZENhcmQuZmluZChcIi5xdW90ZV9fZm9ybS0tdGVtcFwiKS5hcHBlbmQoIGZvcm0gKTtcbiAgfVxuXG4gIGNsb3NlRm9ybSggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zdGF0ZS5pc0Zvcm1BY3RpdmUgPSBmYWxzZTtcblxuICAgIC8vIHJlZiBmb3IgaXRlbXMgaW4gVkMgdmlld1xuICAgIGxldCBjYXJkID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLmNhcmRfX2l0ZW1cIik7XG4gICAgbGV0IGJhY2tCdG4gPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWNhcmQtd3JhcHBlclwiKS5maW5kKFwiLmdvLWJhY2tcIik7XG4gICAgbGV0IGZvcm0gPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLXZjXCIpLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWlubmVyXCIpO1xuXG4gICAgY2FyZC5yZW1vdmVDbGFzcyhcImluXCIpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBzZXQgZm9ybSB0byBhY3RpdmVcbiAgICAgIHRoaXMuZm9ybUJ1aWxkZXIucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAgIC8vIHNldCBib2R5IGJhY2sgdG8gc2Nyb2xsYWJsZVxuICAgICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImF1dG9cIik7XG5cbiAgICB9LCA0MDApO1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIHRoaXMuZm9ybUJ1aWxkZXJcbiAgICAgICAgLmZpbmQoXCIucXVvdGVfX2Zvcm0tLXZjXCIpXG4gICAgICAgIC5vbmUoJ290cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAoIGUgKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB2aXNpYmlsaXR5IG9uY2UgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgICAgICAgdGhpcy5mb3JtQnVpbGRlci5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICAgICAgICAgIC8vIHotaW5kZXggZml4XG4gICAgICAgICAgICAkKFwiLmlubmVyLXBhZ2Utd3JhcHBlclwiKS5jaGlsZHJlbihcImRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIFwiMFwiKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgY2FyZCBodG1sXG4gICAgICAgICAgICBjYXJkLnJlbW92ZSgpO1xuICAgICAgICAgICAgYmFja0J0bi5yZW1vdmUoKTtcblxuICAgICAgICAgICAgdGhpcy5wdXRGb3JtQmFjayggZm9ybS5kZXRhY2goKSApO1xuXG4gICAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gcmVtb3ZlIHZpc2liaWxpdHkgb25jZSBhbmltYXRpb24gY29tcGxldGVzXG4gICAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICB0aGlzLnF1b3RlQ2hvb3Nlci5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgICAgLy8gei1pbmRleCBmaXhcbiAgICAgICQoXCIuaW5uZXItcGFnZS13cmFwcGVyXCIpLmNoaWxkcmVuKFwiZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgXCIwXCIpO1xuXG4gICAgICAvLyByZW1vdmUgY3VycmVudCBjYXJkIGh0bWxcbiAgICAgIGNhcmQucmVtb3ZlKCk7XG4gICAgICBiYWNrQnRuLnJlbW92ZSgpO1xuXG4gICAgICB0aGlzLnB1dEZvcm1CYWNrKCBmb3JtLmRldGFjaCgpICk7XG4gICAgfVxuXG4gICAgLy8gZmFkZSBvdXQgZmlyc3QgZGlzcGxheVxuICAgIHRoaXMucXVvdGVDaG9vc2VyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgb3BlbkZvcm0oIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGV0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgIGxldCBwYXJlbnRDb25hdGluZXIgPSAkdGhpcy5wYXJlbnQoXCJkaXZcIikucGFyZW50KFwiZGl2XCIpO1xuXG4gICAgLy8gZGlzYWJsZSBidXR0b24gY2xpY2sgaWYgaXRlbSBpcyBzZWxlY3RlZFxuICAgIGlmICggIXBhcmVudENvbmF0aW5lci5oYXNDbGFzcyhcInNlbGVjdGVkXCIpICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHNldCBzdGF0ZVxuICAgIHRoaXMuc3RhdGUuaXNGb3JtQWN0aXZlID0gdHJ1ZTtcblxuICAgIC8vIHNldCBjb250ZW50IHBsYW4gSFRNTCBpbiBuZXcgZm9ybSBhcmVhXG4gICAgdGhpcy5zZXRBY3RpdmVQbGFuKCk7XG5cbiAgICAvLyBBbmltYXRlIGZvcm0gaW5cbiAgICBsZXQgYWN0aXZhdGVJbm5lckZvcm0gPSAoKSA9PiB7XG5cbiAgICAgIC8vIHotaW5kZXggZml4XG4gICAgICAkKFwiLmlubmVyLXBhZ2Utd3JhcHBlclwiKS5jaGlsZHJlbihcImRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIFwiLTFcIik7XG4gICAgICB0aGlzLnF1b3RlQ29udGFpbmVyLnBhcmVudHMoXCIudmNfcm93XCIpLmNzcyhcInotaW5kZXhcIiwgXCIyXCIpO1xuXG4gICAgICAvLyBmYWRlIG91dCBjYXJkc1xuICAgICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cbiAgICAgIC8vIHNldCBmb3JtIHRvIGFjdGl2ZVxuICAgICAgdGhpcy5mb3JtQnVpbGRlci5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgLy8gYWRkIHZpc2liaWxpdHkgaW1tZWRpYXRlbHlcbiAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuY3NzKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIik7XG5cbiAgICAgIC8vIGZhZGUgb3V0IGZpcnN0IGRpc3BsYXlcbiAgICAgIHRoaXMucXVvdGVDaG9vc2VyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgIH07XG5cbiAgICAvLyBpZiBkZXNrdG9wIHNjcm9sbCB0b3BcbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgLy8gc2Nyb2xsIHRvcCBvZiBkaXYgb24gb3BlbiBmb3IgZ3JhY2VmdWwgVVhcbiAgICAgICQoXCJib2R5LGh0bWxcIikuYW5pbWF0ZShcbiAgICAgICAge1xuICAgICAgICAgIFwic2Nyb2xsVG9wXCI6IHRoaXMucXVvdGVDb250YWluZXIub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDIwMCwgKCkgPT4ge1xuICAgICAgICAgIGFjdGl2YXRlSW5uZXJGb3JtKCk7XG4gICAgICAgIH1cbiAgICAgICkuYmluZCh0aGlzKTtcblxuICAgIH1lbHNlIHtcbiAgICAgIGFjdGl2YXRlSW5uZXJGb3JtKCk7XG4gICAgfVxuXG5cbiAgICBsZXQgY2FyZCA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5xdW90ZV9fZm9ybS0tY2FyZFwiKTtcblxuICAgIC8vIFNldCBib2R5IHRvIG5vdCBzY3JvbGxcbiAgICAkKFwiYm9keVwiKS5jc3MoXCJvdmVyZmxvdy15XCIsIFwiaGlkZGVuXCIpO1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICBjYXJkLm9uZSgnb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLFxuICAgICAgICAoIGUgKSA9PiB7XG5cbiAgICAgICAgICAvLyBmYWRlIGNhcmQgaW4gb25jZSBkYXRhIGlzIHNldCAmIHRoZSBjYXJkIGJnIGlzIGZpbmlzaGVkIGFuaW1hdGluZ1xuICAgICAgICAgIGNhcmQuZmluZChcIi5jYXJkX19pdGVtXCIpLmFkZENsYXNzKFwiaW5cIik7XG5cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gZmFkZSBjYXJkIGluIG9uY2UgZGF0YSBpcyBzZXQgJiB0aGUgY2FyZCBiZyBpcyBmaW5pc2hlZCBhbmltYXRpbmdcbiAgICAgIGNhcmQuZmluZChcIi5jYXJkX19pdGVtXCIpLmFkZENsYXNzKFwiaW5cIik7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHJlc2l6ZSgpIHtcblxuICAgIC8vIE9uIHJlc2l6ZSBlbmQgLSBjaGVjayBidXR0b24gc2l6ZSB0byBhY2N1cmF0ZWx5IHJlc2l6ZSBzZWxlY3RlZCBidXR0b24gd2lkdGhcbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG5cbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGlmICggdGhpcy5jdXJyZW50QnJlYWtwb2ludCAhPT0gVXRpbHMuYnJlYWtwb2ludCApIHtcblxuICAgICAgICBsZXQgc2VsZWN0ZWRMYWJlbCA9IHRoaXMuZ2V0U2VsZWN0ZWRMYWJlbCgpLFxuICAgICAgICAgIHNlbGVjdGVkSW5wdXQgPSBzZWxlY3RlZExhYmVsLnByZXYoKSxcbiAgICAgICAgICBmaXJzdExhYmVsID0gJCh0aGlzLmlucHV0c1sgMCBdKS5uZXh0KCksXG4gICAgICAgICAgZmlyc3RMYWJlbFdpZHRoID0gZmlyc3RMYWJlbC5vdXRlcldpZHRoKCkgLSAxO1xuXG4gICAgICAgIHRoaXMuc2V0VHJhbnNsYXRlWChzZWxlY3RlZElucHV0LCBmaXJzdExhYmVsV2lkdGgpO1xuICAgICAgICB0aGlzLnNldFdpZHRoKHNlbGVjdGVkTGFiZWwpO1xuICAgICAgICB0aGlzLmN1cnJlbnRCcmVha3BvaW50ID0gVXRpbHMuYnJlYWtwb2ludDtcbiAgICAgIH1cblxuICAgIH0sIDQwMCk7XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJRdW90ZSBCdWlsZGVyXCIpO1xuXG4gICAgLy8gYnVpbGQgc2VsZWN0IGJveCBidXR0b24gaW5wdXRzXG4gICAgdGhpcy5idWlsZFNlbGVjdEJveCgpO1xuXG4gICAgLy8gc2V0IGNsaWNrIGV2ZW50cyBhbmQgZmlyc3Qgc2VsZWN0ZWQgaXRlbXMgZm9yIFNlbGVjdCBCb3hcbiAgICB0aGlzLmJ1aWxkU2VsZWN0RXZlbnRIYW5kbGVycygpO1xuXG4gICAgdGhpcy5mYWRlSW4odGhpcy5zZWxlY3RCdG4pO1xuXG4gICAgLy8gc2VsZWN0IGNhcmRcbiAgICB0aGlzLnRvZ2dsZUNhcmRzKCk7XG5cbiAgICAvLyBhZGQgY2xpY2sgZXZlbnRzIHRvIGNhcmRzIGJ1dHRvbnNcbiAgICB0aGlzLmJ1aWxkQ2FyZEV2ZW50SGFuZGxlcnMoKTtcblxuICAgIC8vIGZhZGUgbWFpbiBjb250YWluZXIgaW5cbiAgICB0aGlzLmZhZGVJbih0aGlzLnF1b3RlQ29udGFpbmVyKTtcblxuICAgIC8vIG9uIHJlc2l6ZSBjaGFuZ2UgYnV0dG9uIHNpemVcbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgfVxufVxuXG5jb25zdCBRdW90ZUJ1aWxkZXIgPSBuZXcgUXVvdGVDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgUXVvdGVCdWlsZGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuaW50ZXJmYWNlIFNob3djYXNlU2xpZGVySW50ZXJmYWNlIHtcbiAgZGVza3RvcFBvczogbnVtYmVyO1xuICB0YWJsZXRQb3M6IG51bWJlcjtcbiAgaW5kZXhTZWxlY3RlZDogbnVtYmVyO1xuICBjdXJyZW50U2xpZGU6IG51bWJlcjtcbn1cblxuY2xhc3MgU2hvd2Nhc2VDb21wb25lbnQge1xuICBjb250YWluZXI6IEpRdWVyeTtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgbmV4dEJ0bk1vYmlsZTogSlF1ZXJ5O1xuICBwcmV2QnRuTW9iaWxlOiBKUXVlcnk7XG4gIG5leHRCdG46IEpRdWVyeTtcbiAgcHJldkJ0bjogSlF1ZXJ5O1xuICBpbmRleDogbnVtYmVyO1xuICBnYWxsZXJ5OiBKUXVlcnk7XG4gIGRlc2M6IEpRdWVyeTtcbiAgdGh1bWJzQ29udGFpbmVyOiBKUXVlcnk7XG4gIGdyYWRpZW50czogSlF1ZXJ5O1xuICB0aHVtYnNDbGljazogSlF1ZXJ5O1xuICBjbG9zZUJ0bjogSlF1ZXJ5O1xuICBjb3VudFRvdGFsOiBKUXVlcnk7XG4gIGN1cnJlbnRDb3VudEl0ZW06IEpRdWVyeTtcbiAgc2hvd0Nhc2VUaHVtYnM6IEpRdWVyeTtcbiAgc3RhdGVQb3NpdGlvbjogU2hvd2Nhc2VTbGlkZXJJbnRlcmZhY2U7XG4gIHRodW1iU2NhbGVUb3A6IG51bWJlcjtcbiAgdGh1bWJTY2FsZUxlZnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvciggZWw6IE9iamVjdCApIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9ICQoZWwpO1xuICAgIHRoaXMucHJldkJ0bk1vYmlsZSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX25hdi0tcHJldlwiKTtcbiAgICB0aGlzLm5leHRCdG5Nb2JpbGUgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19uYXYtLW5leHRcIik7XG4gICAgdGhpcy5wcmV2QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fdGh1bWJzbmF2LS1wcmV2XCIpO1xuICAgIHRoaXMubmV4dEJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1ic25hdi0tbmV4dFwiKTtcbiAgICB0aGlzLmdhbGxlcnkgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19zbGlkZXItLWdhbGxlcnlcIik7XG4gICAgdGhpcy5kZXNjID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fZGVzY1wiKTtcbiAgICB0aGlzLmNvdW50VG90YWwgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnRvdGFsXCIpO1xuICAgIHRoaXMuY3VycmVudENvdW50SXRlbSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuY3VycmVudFwiKTtcbiAgICB0aGlzLmluZGV4ID0gMDsgLy8gc2V0IHRvIDJuZCBzbGlkZVxuICAgIHRoaXMudGh1bWJzQ29udGFpbmVyID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fdGh1bWJzLS1pbWFnZXNcIik7XG4gICAgdGhpcy5zaG93Q2FzZVRodW1icyA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1ic1wiKTtcbiAgICB0aGlzLnRodW1iU2NhbGVUb3AgPSAxMzA7XG4gICAgdGhpcy50aHVtYlNjYWxlTGVmdCA9IDc1O1xuICAgIHRoaXMuc3RhdGVQb3NpdGlvbiA9IHtcbiAgICAgIGRlc2t0b3BQb3M6IDAsXG4gICAgICB0YWJsZXRQb3M6IDAsXG4gICAgICBpbmRleFNlbGVjdGVkOiB0aGlzLmluZGV4LFxuICAgICAgY3VycmVudFNsaWRlOiB0aGlzLmluZGV4ICsgMVxuICAgIH07XG5cbiAgfVxuXG4gIHNldEZpcnN0U2xpZGUoKSB7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggaW1hZ2VzIGFuZCBzZXQgYWN0aXZlIGVsZW1lbnRcbiAgICBsZXQgZmlyc3RJbWFnZSA9IHRoaXMuZ2FsbGVyeS5maW5kKFwibGlbZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuICAgIGZpcnN0SW1hZ2UuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgIHRoaXMuYW5pbWF0ZUdhbGxlcnlJbigpO1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGRlc2MgYW5kIHNldCBhY3RpdmUgZWxlbWVudFxuICAgIGxldCBmaXJzdERlc2MgPSB0aGlzLmRlc2MuZmluZChcIi5zaG93Y2FzZV9fZGVzYy0taXRlbVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG4gICAgZmlyc3REZXNjLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAvLyBCdWlsZCB0aHVtYm5haWxzXG4gICAgdGhpcy5idWlsZFRodW1icygpO1xuXG4gICAgLy8gU2V0IEN1cnJlbnQgU2xpZGUsIHdoaWNoIGlzIGFsd2F5cyB0aGUgZmlyc3Qgc2xpZGUgdG8gc2VsZWN0ZWQgLSBvbkxvYWRcbiAgICB0aGlzLnVwZGF0ZU1vYmlsZU5hdih0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKSk7XG5cbiAgICAvLyBhZGQgY2xpY2sgZXZlbnRzIHRvIHRodW1ibmFpbCBpbWFnZXMsIHRoZW4gd2hlbiBmaW5pc2hlZCBhbmltYXRlIGluIHdpdGggY2FsbGJhY2tcbiAgICB0aGlzLmJ1aWxkVGh1bWJzQ2xpY2tIYW5kbGVyKHRoaXMuYW5pbWF0ZUluVGh1bWJzLmJpbmQodGhpcykpO1xuXG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeS5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0Q3VycmVudE5hdkVsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldEN1cnJlbnREZXNjRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmRlc2MuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldFRvdGFsU2xpZGVzKCk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gdGhpcy5nYWxsZXJ5LmNoaWxkcmVuKFwibGlcIikubGVuZ3RoO1xuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIHVwZGF0ZU1vYmlsZU5hdiggc2VsZWN0ZWQ6IEpRdWVyeSApIHtcblxuICAgIC8vIEVuYWJsZS9EaXNhYmxlIGFycm93IGJ0bnNcbiAgICB0aGlzLnByZXZCdG5Nb2JpbGUucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmZpcnN0LWNoaWxkXCIpKTtcbiAgICB0aGlzLm5leHRCdG5Nb2JpbGUucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmxhc3QtY2hpbGRcIikpO1xuXG4gIH1cblxuICB1cGRhdGVTdGF0ZSggaW5kZXg6IG51bWJlciApIHtcblxuICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkID0gaW5kZXg7XG4gICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA9IGluZGV4ICsgMTtcblxuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZTtcbiAgfVxuXG4gIHVwZGF0ZVNsaWRlKCBkaXJlY3Rpb246IHN0cmluZyApIHtcblxuICAgIC8vIGdldCBjdXJyZW50IHNlbGVjdGVkIGFuZCBmaW5kIHRoZSBtYXRjaCB0byB0aGUgbmV4dCBlbFxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTtcbiAgICBsZXQgbmV4dFNsaWRlID0gdGhpcy5nYWxsZXJ5LmZpbmQoXCJsaVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG5cbiAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLnByZXZBbGwoKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUubmV4dEFsbCgpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIE5hdmlnYXRpb24gY2hlY2tcbiAgICB0aGlzLnVwZGF0ZU1vYmlsZU5hdih0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKSk7XG4gIH1cblxuICB1cGRhdGVEZXNjSGVpZ2h0KCBkaXJlY3Rpb24/OiBzdHJpbmcsIHNlbGVjdGVkPzogSlF1ZXJ5ICkge1xuXG4gICAgLy8gZGlyZWN0aW9uXG4gICAgaWYgKCBkaXJlY3Rpb24gKSB7XG5cbiAgICAgIGxldCBoZWlnaHQgPSBzZWxlY3RlZC5vdXRlckhlaWdodCgpO1xuICAgICAgVHdlZW5NYXgudG8odGhpcy5kZXNjLCAuMywge1xuICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIGdldCBjdXJyZW50IHNsaWRlXG4gICAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50RGVzY0VsZW1lbnQoKTtcbiAgICAgIGxldCBoZWlnaHQgPSBjdXJyZW50U2xpZGUub3V0ZXJIZWlnaHQoKTtcbiAgICAgIHRoaXMuZGVzYy5oZWlnaHQoaGVpZ2h0KTtcblxuICAgIH1cblxuICB9XG5cbiAgdXBkYXRlRGVzYyggZGlyZWN0aW9uOiBzdHJpbmcgKSB7XG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudERlc2NFbGVtZW50KCk7XG4gICAgbGV0IG5leHRTbGlkZSA9IHRoaXMuZGVzYy5maW5kKFwiLnNob3djYXNlX19kZXNjLS1pdGVtW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcblxuICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG5cbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG5cbiAgICAgIHRoaXMudXBkYXRlRGVzY0hlaWdodChcInJpZ2h0XCIsIG5leHRTbGlkZSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLnByZXZBbGwoKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUubmV4dEFsbCgpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcblxuICAgICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KFwibGVmdFwiLCBuZXh0U2xpZGUpO1xuXG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVUaHVtYnNuYXYoIGRpcmVjdGlvbjogc3RyaW5nICkge1xuXG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudE5hdkVsZW1lbnQoKTtcbiAgICBsZXQgbmV4dFNsaWRlID0gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcImxpW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcblxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgLypcbiAgICAgICAqIFRBQkxFVCBUSFVNQiBTRUxFQ1RcbiAgICAgICAqL1xuXG4gICAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlID49IDQgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA8IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHN0YXRlXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgLSB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgLSB0aGlzLnRodW1iU2NhbGVUb3A7XG5cbiAgICAgICAgICAvLyB1cGRhdGUgaHRtbCBlbGVtZW50XG4gICAgICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgeDogdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyxcbiAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcImxlZnRcIik7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyAhPT0gMCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgKyB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgIHg6IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MsXG4gICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyAhPT0gMCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICsgdGhpcy50aHVtYlNjYWxlVG9wO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBERVNLVE9QIFRIVU1CIFNFTEVDVFxuICAgICAgICovXG4gICAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuXG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICAvLyBkZXRlY3RpbmcgaWYgc2xpZGUgc2hvdWxkIG1vdmUgb3Igbm90XG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA+PSA0ICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPCB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBwb3NpdGlvbiBjb250cm9sbGVyXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyAtIHRoaXMudGh1bWJTY2FsZVRvcDtcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyAtIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG5cbiAgICAgICAgICAvLyBtb3ZlIHNsaWRlclxuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgICB5OiB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyxcbiAgICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgKyB0aGlzLnRodW1iU2NhbGVUb3A7XG4gICAgICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICAgIHk6IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zLFxuICAgICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXBlcmF0ZSB0YWJsZXQgbG9va2luZyBhdCBzaG91bGQgaXQgdXBkYXRlIHRhYmxldCBzdGF0ZVxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICsgdGhpcy50aHVtYlNjYWxlTGVmdDtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgY2hlY2tUaHVtYnNOYXYoIHNpemU6IHN0cmluZyApIHtcblxuICAgIGlmICggc2l6ZSA9PT0gXCJtb2JpbGVcIiApIHtcblxuICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICB5OiAwLFxuICAgICAgICAgIHg6IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICB5OiB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyxcbiAgICAgICAgICB4OiAwLFxuICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIH1cblxuICB9XG5cbiAgYXJyb3dIYW5kbGVyKCBldmVudDogYW55ICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgJGVsID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTsgLy8gYSB0YWdcbiAgICBsZXQgdGh1bWJJbmRleCA9ICRlbC5wYXJlbnQoXCJsaVwiKS5kYXRhKFwiaW5kZXhcIik7XG4gICAgbGV0IHByZXZFbCA9IHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gICAgbGV0IHByZXZJbmRleCA9IHByZXZFbC5kYXRhKFwiaW5kZXhcIik7XG5cblxuICAgIC8vIFNsaWRlciBjYW4gbW92ZSByaWdodCBiZWNhdXNlIGN1cnJlbnQgc2xpZGUgaXMgbm90IHRoZSBsYXN0IHNsaWRlXG4gICAgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwicmlnaHRcIiAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlIDw9IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcblxuICAgICAgLy8gdXBkYXRlIHN0YXRlIG9uIGFycm93IGNsaWNrXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgMSk7XG5cbiAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luT3V0KCk7XG5cblxuICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJsZWZ0XCIgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgLy8gdXBkYXRlIHN0YXRlIG9uIGFycm93IGNsaWNrXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkIC0gMSk7XG5cbiAgICAgIC8vIEVsc2UgaWYgaXRzIG5vdCB0aGUgZmlyc3Qgc2xpZGUgLSBtb3ZlIGxlZnRcbiAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwibGVmdFwiKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luT3V0KCk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJ0aHVtYm5haWxcIiAmJlxuICAgICAgcHJldkluZGV4IDwgdGh1bWJJbmRleCAmJlxuICAgICAgdGh1bWJJbmRleCArIDEgIT09IHRoaXMuZ2V0VG90YWxTbGlkZXNcbiAgICApIHtcbiAgICAgIC8vIGNvbXBhcmUgaXRlbSBzZWxlY3RlZCBpbmRleCB3aXRoIG5ldyBpdGVtIHNlbGVjdGVkIGFuZCBkZXRlcm1pbmUgd2hpY2ggZGlyZWN0aW9uIHRvIG1vdmVcbiAgICAgIC8vIHVwZGF0ZSBTdGF0ZVxuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aHVtYkluZGV4KTtcblxuICAgICAgLy8gdXBkYXRlIHRodW1icyBuYXZcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luT3V0KCk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJ0aHVtYm5haWxcIiAmJiBwcmV2SW5kZXggPiB0aHVtYkluZGV4XG4gICAgKSB7XG4gICAgICAvLyB1cGRhdGUgU3RhdGVcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGh1bWJJbmRleCk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aHVtYnMgbmF2XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcImxlZnRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGNvdW50ZXJcbiAgICB0aGlzLmN1cnJlbnRDb3VudEl0ZW0uaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRDdXJyZW50U2xpZGVDb3VudCgpKSk7XG5cbiAgfVxuXG4gIGNoZWNrU2l6ZSgpIHtcblxuICAgIC8vIE9uIHJlc2l6ZSBlbmQgLSBjaGVjayB0byBlbmFibGUgY2xpY2tzIGZvciBkZXNrdG9wIG9yIHJlbW92ZSB0aGVtXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuICAgIHRoaXMucmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgLy8gaWYgVGFibGV0IG9yIHNtYWxsZXIgLSBiaW5kIG1vYmlsZSBuYXYgYXJyb3dzXG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICAgIC8vIGFkanVzdCBjc3Mgc2l6aW5nIGZvciB0aHVtYnMgbmF2IG9uIHBvc2l0aW9uIHJlc2l6ZVxuICAgICAgICB0aGlzLmNoZWNrVGh1bWJzTmF2KFwibW9iaWxlXCIpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMuY2hlY2tUaHVtYnNOYXYoXCJkZXNrdG9wXCIpO1xuXG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KCk7XG5cbiAgfVxuXG4gIGFuaW1hdGVTaGFkb3dJbk91dCgpIHtcblxuICAgIC8vIHJlbW92ZSBkcm9wc2hhZG93XG4gICAgVHdlZW5NYXgudG8odGhpcy5nYWxsZXJ5LCAwLCB7XG4gICAgICBib3hTaGFkb3c6IFwiMHB4IDE4cHggOTRweCAtMTZweCByZ2JhKDAsMCwwLDAuMClcIlxuICAgIH0pO1xuXG5cbiAgICBUd2Vlbk1heC50byh0aGlzLmdhbGxlcnksIC4xLCB7XG4gICAgICBib3hTaGFkb3c6IFwiMHB4IDE4cHggOTRweCAtMTZweCByZ2JhKDAsMCwwLDAuNjgpXCIsXG4gICAgICBkZWxheTogLjNcbiAgICB9KTtcblxuXG4gIH1cblxuICBhbmltYXRlU2hhZG93SW4oKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5nYWxsZXJ5LCAuMywge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjY4KVwiLFxuICAgICAgZGVsYXk6IC4xXG4gICAgfSk7XG4gIH1cblxuICBidWlsZFRodW1icygpIHtcblxuICAgIGxldCBmcmFnbWVudCA9ICQoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcbiAgICAvLyBidWlsZCBsb29wIGZvciBpbWFnZXNcbiAgICB0aGlzLmdhbGxlcnkuZmluZChcImxpXCIpLmVhY2goKCBpbmRleDogbnVtYmVyLCBlbDogT2JqZWN0ICkgPT4ge1xuXG4gICAgICAvLyBjcmVhdGUgaHRtbCBlbGVtZW50c1xuICAgICAgbGV0IGl0ZW1JbmRleCA9IFV0aWxzLnNldE51bWJlcihpbmRleCksXG4gICAgICAgIGltYWdlVGh1bWJVcmwgPSAkKGVsKS5kYXRhKFwidGh1bWJcIiksXG4gICAgICAgIGltYWdlVGh1bWJBbHQgPSAkKGVsKS5kYXRhKFwiYWx0XCIpLFxuICAgICAgICBpbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpLFxuICAgICAgICBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpLFxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXG4gICAgICAvLyBhZGQgc3JjIGFuZCBhdHRyIHRvIGltYWdlXG4gICAgICBpbWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIGltYWdlVGh1bWJVcmwpO1xuICAgICAgaW1hZ2VFbGVtZW50LnNldEF0dHJpYnV0ZShcImFsdFwiLCBpbWFnZVRodW1iQWx0KTtcbiAgICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCIjXCIpO1xuICAgICAgbGlua0VsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsIGl0ZW1JbmRleCk7XG5cbiAgICAgIC8vIHNldCBmaXJzdCBpbWFnZSB0byBzZWxlY3RlZFxuICAgICAgaW5kZXggPT09IHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkID8gZWxlbWVudC5jbGFzc05hbWUgPSBcInNlbGVjdGVkXCIgOiBcIlwiO1xuXG4gICAgICAvLyBhcHBlbmQgdG8gZnJhZ21lbnRcbiAgICAgIGZyYWdtZW50LmFwcGVuZChlbGVtZW50KTtcblxuICAgIH0pO1xuXG4gICAgLy8gaW5zZXJ0IGh0bWwgZWxlbWVudCB0byB0aGUgZG9tIGFmdGVyIGxvb3AgZmluaXNoZXNcbiAgICB0aGlzLnRodW1ic0NvbnRhaW5lci5hcHBlbmQoZnJhZ21lbnQpO1xuXG4gIH1cblxuICBidWlsZFRodW1ic0NsaWNrSGFuZGxlciggY2FsbGJhY2sgKSB7XG5cbiAgICAvLyBBZGQgYXJyYXkgb2YgaHRtbCBvYmplY3QgdG8gYXR0YWNoIGNsaWNrIGV2ZW50cyB0byBsYXRlclxuICAgIHRoaXMudGh1bWJzQ2xpY2sgPSB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwiYVwiKTtcblxuICAgIC8vIENsaWNrIGhhbmRsZXIgZm9yIHByZXZpZXcgdGh1bWJzIG9uIGRlc2t0b3AsIG5lZWRzIHRvIHdvcmsgb24gdGFibGV0IC0+IGRlc2t0b3BcbiAgICB0aGlzLnRodW1ic0NsaWNrLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICAkKGVsKS5vbihcImNsaWNrXCIsIHsga2V5czogXCJ0aHVtYm5haWxcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9KTtcblxuICAgIGNhbGxiYWNrKCk7XG4gIH1cblxuICBhbmltYXRlSW5UaHVtYnMoKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5zaG93Q2FzZVRodW1icywgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBkZWxheTogMVxuICAgIH0pO1xuICB9XG5cbiAgYW5pbWF0ZUdhbGxlcnlJbigpIHtcbiAgICBUd2Vlbk1heC50byh0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19vdXRlci0tYmdpbWFnZVwiKSwgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBkZWxheTogLjcsXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgdGhpcy5zZXRGaXJzdFNsaWRlKCk7XG5cbiAgICAvLyBJbml0IGNvcnJlY3QgbmF2IGRlcGVuZGluZyBvbiB2aWV3cG9ydCBzaXplXG4gICAgdGhpcy5jaGVja1NpemUoKTtcbiAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoKTtcbiAgICB0aGlzLnByZXZCdG5Nb2JpbGUub24oXCJjbGlja1wiLCB7IGtleXM6IFwibGVmdFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMubmV4dEJ0bk1vYmlsZS5vbihcImNsaWNrXCIsIHsga2V5czogXCJyaWdodFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG5cbiAgICAvLyBzZXQgdG90YWwgc2xpZGVzIG51bWJlclxuICAgIHRoaXMuY291bnRUb3RhbC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldFRvdGFsU2xpZGVzKCkpKTtcblxuICAgIC8vIHVwZGF0ZSBjb3VudGVyXG4gICAgdGhpcy5jdXJyZW50Q291bnRJdGVtLmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gIH1cbn1cblxuLy8gbG9vcCB0aHJvdWdoIGVhY2ggaGVhZGVyIHNsaWRlciBvYmplY3Qgb24gdGhlIHBhZ2VcbmNsYXNzIFNob3dDYXNlU0xpZGVyIHtcblxuICBpdGVtSW5mb1dyYXBwZXI6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlciA9ICQoXCIuc2hvd2Nhc2VcIik7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2hvd2Nhc2UgU2xpZGVyIGluaXRcIik7XG5cbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlci5lYWNoKCggaW5kZXg6IG51bWJlciwgZWw6IE9iamVjdCApID0+IHtcblxuICAgICAgLy8gUGFzcyBcInRoaXNcIiB0byBlYWNoIG5ldyBIZWFkZXIgc2xpZGVyIGNvbXBvbmVudFxuICAgICAgbGV0IHNsaWRlciA9IG5ldyBTaG93Y2FzZUNvbXBvbmVudChlbCk7XG4gICAgICBzbGlkZXIuaW5pdCgpO1xuICAgIH0pO1xuICB9XG5cbn1cblxubGV0IFNob3djYXNlU2xpZGVyID0gbmV3IFNob3dDYXNlU0xpZGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNob3djYXNlU2xpZGVyO1xuIiwiY29uc3QgJCA9IGpRdWVyeTtcblxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIFN0aWNreVNpZGViYXJDb21wb25lbnQge1xuXG4gIGlzQW5pbWF0aW5nOiBib29sZWFuO1xuICBjb250ZW50V3JhcHBlcjogSlF1ZXJ5O1xuICBjb250ZW50T2Zmc2V0VG9wOiBudW1iZXI7XG4gIGNvbnRlbnRXcmFwcGVySGVpZ2h0OiBudW1iZXI7XG4gIHNjcm9sbFRvcDogbnVtYmVyO1xuICBhc2lkZTogSlF1ZXJ5O1xuICBzaWRlYmFyV3JhcHBlcjogSlF1ZXJ5O1xuICB3aW5kb3dIZWlnaHQ6IG51bWJlcjtcbiAgc2lkZWJhckhlaWdodDogbnVtYmVyO1xuICBmb290ZXJIZWlnaHQ6IG51bWJlcjtcbiAgc2Nyb2xsaW5nRG93bjogYm9vbGVhbjtcbiAgbGFzdFNjcm9sbFRvcDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRlbnRXcmFwcGVyID0gJChcIi5zaWRlYmFyLWNvbnRlbnRcIik7XG4gICAgdGhpcy5hc2lkZSA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFySGVpZ2h0ID0gdGhpcy5hc2lkZS5oZWlnaHQoKTtcbiAgICB0aGlzLnNpZGViYXJXcmFwcGVyID0gJChcIi5zZXJ2aWNlLXNpZGViYXJcIik7XG4gIH1cblxuICBjaGVja1NpZGViYXIoKTogdm9pZCB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIHNpZGViYXIgaXMgZml4ZWQgb3Igbm90XG4gICAgaWYgKCAhdGhpcy5pc0FuaW1hdGluZyAmJiBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICB0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkgP1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMudXBkYXRlU2lkZWJhclBvc2l0aW9uLmJpbmQodGhpcyksIDMwMCkgOlxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlU2lkZWJhclBvc2l0aW9uLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgdGhpcy5yZXNldFNpZGVCYXIoKTtcbiAgICB9XG4gIH1cblxuICBjaGVja1NpZGViYXJWaXNpYmlsaXR5KCkge1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8vIGRvZXMgc2lkZWJhciBoYXZlIGNsYXNzIHZpc2liaWxpdHlcbiAgICAgIGxldCBpc1Zpc2libGUgPSB0aGlzLmFzaWRlLmhhc0NsYXNzKCd2aXNpYmxlJyk7XG5cbiAgICAgIGlmICggIWlzVmlzaWJsZSApIHtcblxuICAgICAgICB0aGlzLmFuaW1hdGVTaWRlYmFySW4odGhpcy5hc2lkZSk7XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgcmVzZXRTaWRlQmFyKCkge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpO1xuICAgIHRoaXMuYXNpZGUuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuICB9XG5cbiAgdXBkYXRlU2lkZWJhclBvc2l0aW9uKCk6IHZvaWQge1xuXG4gICAgdGhpcy5jaGVja1Njcm9sbERpcmVjdGlvbigpO1xuXG4gICAgdGhpcy5jaGVja1NpZGViYXJWaXNpYmlsaXR5KCk7XG5cbiAgICAvLyBnZXQgZGlzdGFuY2UgZnJvbSB0b3Agb2YgY29udGVudCAxMCArIDQwID0gNTAgcGFkZGluZyB0b3BcbiAgICAvLyB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm9mZnNldCgpLnRvcCAtIDEwO1xuICAgIHRoaXMuY29udGVudE9mZnNldFRvcCA9IHRoaXMuY29udGVudFdyYXBwZXIub2Zmc2V0KCkudG9wICsgMjU7XG4gICAgdGhpcy5zaWRlYmFySGVpZ2h0ID0gdGhpcy5hc2lkZS5oZWlnaHQoKTtcbiAgICB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0ID0gdGhpcy5jb250ZW50V3JhcHBlci5vdXRlckhlaWdodCgpOyAvLyBpbmNsdWRlIHBhZGRpbmcgYW5kIG1hcmdpblxuXG5cbiAgICAvLyBnZXQgd2hlcmUgdG9wIG9mIHdpbmRvdyBpc1xuICAgIHRoaXMuc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29udGVudCBXcmFwcGVyIEhlaWdodFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnRlbnQgT2Zmc2V0XCIsIHRoaXMuY29udGVudE9mZnNldFRvcCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTaWRlYmFyIEhlaWdodFwiLCB0aGlzLnNpZGViYXJIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiV2luZG93IEhlaWdodFwiLCB0aGlzLndpbmRvd0hlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJvZmZzZXQgVG9wXCIsIHRoaXMuY29udGVudE9mZnNldFRvcCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTY3JvbGxUb3BcIiwgdGhpcy5zY3JvbGxUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2lkZWJhcm9mZnNldFwiLCB0aGlzLnNjcm9sbFRvcCk7XG5cbiAgICAvLyBJZiB0aGUgd2luZG93IFYgcG9zaXRpb24gaXMgbGVzcyB0aGFuIHRoZSBjb250ZW50IFYgcG9zaXRpb24gbWFrZSBzaWRlYmFyIG5vcm1hbFxuICAgIGlmICggdGhpcy5zY3JvbGxUb3AgPCB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgKSB7XG4gICAgICBsZXQgY3NzUHJvcHMgPSB7XG4gICAgICAgIFwidHJhbnNpdGlvblwiOiBcInRvcCAuM3NcIlxuICAgICAgfTtcbiAgICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIik7XG4gICAgICB0aGlzLmFzaWRlLmNzcyhjc3NQcm9wcyk7XG5cbiAgICAgIC8vIGlmIHdpbmRvdyBWIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiBjb250ZW50IC0gYWRkIHN0aWNreVxuICAgICAgLy8gMm5kIGNoZWNrcyB0aGUgb2Zmc2V0IG9mIHRoZSB0b3Agb2YgdGhlIHdpbmRvdyB0byB0aGUgdG9wIG9mIHRoZSBjb250ZW50ICYmIHRoZSBwb3NpdGlvbiBvZiB0aGUgY29udGVudCBpbiByZWxhdGlvbiB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHdpbmRvdyAtIDQwIG9uIGVuZFxuICAgIH0gZWxzZSBpZiAoIHRoaXMuc2Nyb2xsVG9wID49IHRoaXMuY29udGVudE9mZnNldFRvcCAmJiB0aGlzLnNjcm9sbFRvcCA8IHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQgLSB0aGlzLnNpZGViYXJIZWlnaHQgKyB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgLSA1MCApIHtcbiAgICAgIHRoaXMuYXNpZGUuYWRkQ2xhc3MoXCJzdGlja3lcIikuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuXG4gICAgICBpZiAoIHRoaXMuc2Nyb2xsaW5nRG93biA9PT0gdHJ1ZSApIHtcbiAgICAgICAgdGhpcy5hc2lkZS5jc3MoXCJ0cmFuc2l0aW9uXCIsIFwidG9wIC4zc1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcIlwiKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBsZXQgYXJ0aWNsZVBhZGRpbmdUb3AgPSBOdW1iZXIoYXJ0aWNsZXMuZXEoMSkuY3NzKFwicGFkZGluZy10b3BcIikucmVwbGFjZShcInB4XCIsIFwiXCIpKTtcbiAgICAgIGlmICggdGhpcy5hc2lkZS5oYXNDbGFzcyhcInN0aWNreVwiKSApIHtcbiAgICAgICAgdGhpcy5hc2lkZS5hdHRyKFwic3R5bGVcIiwgXCJcIik7XG4gICAgICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIikuY3NzKFwidG9wXCIsIHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQgLSB0aGlzLnNpZGViYXJIZWlnaHQgKyAxICsgXCJweFwiKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcblxuICB9XG5cbiAgY2hlY2tTY3JvbGxEaXJlY3Rpb24oKSB7XG4gICAgLy8gTG9nIGN1cnJlbnQgc2Nyb2xsUG9pbnRcbiAgICBsZXQgc3QgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy8gY29tcGFyZSB0byBsYXN0IHNjcm9sbFBvaW50XG4gICAgaWYgKCBzdCA+IHRoaXMubGFzdFNjcm9sbFRvcCApIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwic2Nyb2xsIGRvd25cIik7XG4gICAgICAvLyBkb3duc2Nyb2xsIGNvZGVcbiAgICAgIHRoaXMuc2Nyb2xsaW5nRG93biA9IHRydWU7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJzY3JvbGwgdXBcIik7XG4gICAgICAvLyB1cHNjcm9sbCBjb2RlXG4gICAgICB0aGlzLnNjcm9sbGluZ0Rvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBvbiBjb21wbGV0ZSAtIG1ha2UgbGFzdCBTY3JvbGwgcG9pbnQgdGhlIHBvaW50IGF0IHdoaWNoIHRoZXkgc3RhcnRlZCBzY3JvbGxpbmcgYXQgZmlyc3RcbiAgICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgfVxuXG4gIGFuaW1hdGVTaWRlYmFySW4oIGVsZW1lbnQ6IEpRdWVyeSApIHtcblxuICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoXCJpbnRyb1wiKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICBsZXQgc2lkZWJhckludHJvID0gVHdlZW5NYXgudG8oZWxlbWVudCwgLjMsIHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgejogLjAwMSxcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgICAgZGVsYXk6IC45LFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgLy8gbWFrZSBzaWRlYmFyIHBlcm1hbmVudGx5IHZpc2libGVcbiAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU3RpY2t5IHNpZGViYXIgbG9hZGVkXCIpO1xuXG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gMDtcblxuICAgIGlmICggdGhpcy5hc2lkZS5sZW5ndGggPiAwICkge1xuICAgICAgdGhpcy5jaGVja1NpZGViYXIoKTtcblxuICAgICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIHRoaXMuY2hlY2tTaWRlYmFyLmJpbmQodGhpcykpO1xuICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaWRlYmFyLmJpbmQodGhpcykpO1xuXG4gICAgICAvLyBBbmltYXRlIHNpZGUgYmFyIGluIG9uIGxvYWRcbiAgICAgIHRoaXMuYW5pbWF0ZVNpZGViYXJJbih0aGlzLmFzaWRlKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIEFuaW1hdGUgc2lkZSBiYXIgaW4gb24gbG9hZFxuICAgICAgdGhpcy5hbmltYXRlU2lkZWJhckluKCQoXCIuc2VydmljZS1zaWRlYmFyLW5vc3RpY2tcIikpO1xuXG4gICAgfVxuICB9XG59XG5cbmxldCBTdGlja3lTaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3RpY2t5U2lkZWJhcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuY2xhc3MgVGVzdGltb25haWxDb21wb25lbnQge1xuXG4gIHRlc3RpbW9uYWlsczogSlF1ZXJ5O1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuICBjdXJyZW50SGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZXN0aW1vbmFpbHMgPSAkKFwiLnRlc3RpbW9uaWFsc1wiKTtcbiAgfVxuXG4gIGdlbmVyYXRlSWQoIGluZGV4LCBlbCApIHtcblxuICAgIC8vIGNyZWF0ZSBEeW5hbWljIElEXG4gICAgbGV0IGlkU3RyaW5nID0gXCJjYXJvdXNlbC10ZXN0aW1vbmlhbC1cIiArIGluZGV4O1xuICAgIGVsLmF0dHIoXCJpZFwiLCBpZFN0cmluZyk7XG5cbiAgICAvLyBBZGQgbWF0Y2hpbmcgaHJlZiB0byBjb250cm9sc1xuICAgIGxldCBjb250cm9scyA9IGVsLmZpbmQoXCIuY2Fyb3VzZWwtY29udHJvbFwiKTtcbiAgICBjb250cm9scy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAkKGVsKS5hdHRyKFwiaHJlZlwiLCBcIiNcIiArIGlkU3RyaW5nKTtcblxuICAgIH0pO1xuXG4gIH1cblxuICBvblJlc2l6ZSgpIHtcblxuICAgIC8vIE9uIHJlc2l6ZSBlbmQgLSBjaGVjayB0byBlbmFibGUgY2xpY2tzIGZvciBkZXNrdG9wIG9yIHJlbW92ZSB0aGVtXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuICAgIHRoaXMucmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgLy8gQ2hhbmdlIEhlaWdodCBvbiByZXNpemVcbiAgICAgIHRoaXMudGVzdGltb25haWxzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgICAgbGV0ICR0aGlzID0gJChlbCk7XG5cbiAgICAgICAgLy8gZXN0YWJsaXNoIHZhcnNcbiAgICAgICAgbGV0ICRpbm5lciA9ICR0aGlzLmZpbmQoXCIuY2Fyb3VzZWwtaW5uZXJcIiksXG4gICAgICAgICAgICAkYWN0aXZlID0gJGlubmVyLmZpbmQoXCIuYWN0aXZlXCIpLFxuICAgICAgICAgICAgYmxvY2tJdGVtID0gJGFjdGl2ZS5maW5kKFwiYmxvY2txdW90ZVwiKTtcblxuICAgICAgICAvLyBTZXQgaGVpZ2h0IGZvciBmaXJzdCBpdGVtXG4gICAgICAgIGxldCBoZWlnaHQgPSBibG9ja0l0ZW0ub3V0ZXJIZWlnaHQoKTtcblxuICAgICAgICAvLyBpZiB0aGV5IGFyZW4ndCBlcXVhbCwgY2hhbmdlIHRoZW1cbiAgICAgICAgaWYgKCB0aGlzLmN1cnJlbnRIZWlnaHQgIT09IGhlaWdodCApIHtcbiAgICAgICAgICAkaW5uZXIuY3NzKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgfSwgNDAwKTtcbiAgfVxuXG4gIGluaXQoKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIlRlc3RpbW9uaWFscyBJbml0XCIpO1xuXG4gICAgLy8gTWFrZSBpdGVtcyBkeW5hbWljXG4gICAgdGhpcy50ZXN0aW1vbmFpbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcbiAgICAgIGxldCAkdGhpcyA9ICQoZWwpO1xuICAgICAgdGhpcy5nZW5lcmF0ZUlkKGluZGV4LCAkdGhpcyk7XG5cbiAgICAgIC8vIG1ha2UgZmlyc3QgZWxlbWVudCBhY3RpdmVcbiAgICAgIGxldCAkaW5uZXIgPSAkdGhpcy5maW5kKFwiLmNhcm91c2VsLWlubmVyXCIpO1xuICAgICAgbGV0ICRmaXJzdCA9ICRpbm5lci5jaGlsZHJlbihcIi5pdGVtXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAgIC8vIFNldCBoZWlnaHQgZm9yIGZpcnN0IGl0ZW1cbiAgICAgIGxldCBoZWlnaHQgPSAkZmlyc3Qub3V0ZXJIZWlnaHQoKTtcbiAgICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGhlaWdodDtcbiAgICAgICRpbm5lci5jc3MoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcblxuICAgIH0pO1xuXG4gICAgLy8gU3RhcnQgU2xpZGVyc1xuICAgIHRoaXMudGVzdGltb25haWxzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIC8vIGluaXQgY2Fyb3VzZWxcbiAgICAgICQoZWwpLmNhcm91c2VsKCk7XG5cbiAgICAgIC8vIE9uIHNsaWRlIGNoYW5nZSBoZWlnaHQgZm9yIHNtb290aCB0cmFuc2l0aW9uc1xuICAgICAgJChlbCkub24oXCJzbGlkLmJzLmNhcm91c2VsXCIsICggZSApID0+IHtcblxuICAgICAgICAvLyBzbGlkZVxuICAgICAgICBsZXQgJHRoaXMgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGxldCBjdXJyZW50U2xpZGUgPSAkKCR0aGlzKS5maW5kKFwiLmFjdGl2ZVwiKTtcbiAgICAgICAgbGV0IGJsb2NrSXRlbSA9IGN1cnJlbnRTbGlkZS5maW5kKFwiYmxvY2txdW90ZVwiKTtcbiAgICAgICAgbGV0IGhlaWdodCA9IGJsb2NrSXRlbS5vdXRlckhlaWdodCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5wYXJlbnQoXCIuY2Fyb3VzZWwtaW5uZXJcIikuY3NzKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gYWRqdXN0IHNpemUgb24gcmVzaXplXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxufVxuXG5jb25zdCBUZXN0aW1vbmFpbHMgPSBuZXcgVGVzdGltb25haWxDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgVGVzdGltb25haWxzOyIsImltcG9ydCB7QnBzSW50ZXJmYWNlfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9icHMuaW50ZXJmYWNlXCI7XG5jb25zdCAkID0galF1ZXJ5O1xuXG4vLyBBZGQgaW50ZXJmYWNlIEpRdWVyeVNtb290aCB7XG4vLyBzbW9vdGhTdGF0ZSgpOnZvaWQ7XG4vLyB9XG4vLyBzbW9vdGhTdGF0ZShhcmc6IE9iamVjdCk6IEpRdWVyeTtcblxuY2xhc3MgVXRpbGl0eUNvbXBvbmVudCB7XG4gIHdpbmRvd1dpZHRoOiBudW1iZXI7XG4gIGJyZWFrcG9pbnQ6IG51bWJlcjtcbiAgYnJlYWtwb2ludHM6IG51bWJlcltdO1xuICBicHM6IEJwc0ludGVyZmFjZTtcbiAgYnJvd3Nlcjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3NldEJyZWFrcG9pbnRzID0gKCBicHM6IEJwc0ludGVyZmFjZSApID0+IHtcbiAgICBsZXQgYXJyID0gW107XG5cbiAgICBmb3IgKCBsZXQga2V5IGluIGJwcyApIHtcbiAgICAgIGlmICggYnBzLmhhc093blByb3BlcnR5KGtleSkgKSB7XG4gICAgICAgIGFyci5wdXNoKGJwc1sga2V5IF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcnIucmV2ZXJzZSgpO1xuICB9O1xuICBwcml2YXRlIF9jaGVja0JyZWFrcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gbWFrZSBicmVha3BvaW50IGV2ZW50IGF2YWlsYWJsZSB0byBhbGwgZmlsZXMgdmlhIHRoZSB3aW5kb3cgb2JqZWN0XG4gICAgbGV0IG9sZF9icmVha3BvaW50ID0gdGhpcy5icmVha3BvaW50O1xuXG4gICAgdGhpcy5fc2V0QnJlYWtwb2ludCgpO1xuXG4gICAgaWYgKCBvbGRfYnJlYWtwb2ludCAhPT0gdGhpcy5icmVha3BvaW50ICkge1xuXG4gICAgICAkKHdpbmRvdykudHJpZ2dlcihcImJyZWFrcG9pbnRDaGFuZ2VcIiwgVXRpbHMuYnJlYWtwb2ludCk7XG4gICAgfVxuICB9O1xuICBwcml2YXRlIF9zZXRCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIGdldCBicmVha3BvaW50IGZyb20gY3NzXG4gICAgY29uc29sZS5sb2coJCgnYm9keScpLmNzcyhcInotaW5kZXhcIikpO1xuXG4gICAgbGV0IGJvZHkgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLFxuICAgICAgemluZGV4ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsgXCJ6LWluZGV4XCIgXTtcblxuICAgIHRoaXMuYnJlYWtwb2ludCA9IHBhcnNlSW50KHppbmRleCwgMTApO1xuICB9O1xuICBwcml2YXRlIF9zZXRXaW5kb3dXaWR0aCA9ICgpID0+IHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIH07XG5cbiAgc2V0TnVtYmVyKCBjb3VudDogbnVtYmVyICk6IHN0cmluZyB7XG4gICAgLy8gY29udmVyIG51bWJlciB0byBzdHJpbmdcbiAgICBsZXQgdG90YWwgPSBjb3VudDtcbiAgICByZXR1cm4gdG90YWwudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdoaWNoQnJvd3NlcigpIHtcbiAgICBpZiAoIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInNhZmFyaVwiKSA+IC0xKSAmJiAhKFxuICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJjaHJvbWVcIikgPiAtMSkgJiYgKG5hdmlnYXRvci5hcHBOYW1lID09PVxuICAgICAgXCJOZXRzY2FwZVwiKSApIHtcblxuICAgICAgaWYgKCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpICE9PSBudWxsICkge1xuICAgICAgICByZXR1cm4gXCJpcGFkXCI7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcInNhZmFyaVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkSHRtbCggdHlwZTogc3RyaW5nLCBhdHRycz86IE9iamVjdCwgaHRtbD86IHN0cmluZyApIHtcbiAgICBcbiAgICAvLyBodHRwOi8vbWFyY2dyYWJhbnNraS5jb20vYnVpbGRpbmctaHRtbC1pbi1qcXVlcnktYW5kLWphdmFzY3JpcHQvXG4gICAgXG4gICAgbGV0IGggPSAnPCcgKyB0eXBlO1xuXG4gICAgZm9yICggbGV0IGF0dHIgaW4gYXR0cnMgKSB7XG4gICAgICBpZiAoIGF0dHJzWyBhdHRyIF0gPT09IGZhbHNlICkgY29udGludWU7XG4gICAgICBoICs9ICcgJyArIGF0dHIgKyAnPVwiJyArIGF0dHJzWyBhdHRyIF0gKyAnXCInO1xuICAgIH1cblxuICAgIHJldHVybiBoICs9IGh0bWwgPyBcIj5cIiArIGh0bWwgKyBcIjwvXCIgKyB0eXBlICsgXCI+XCIgOiBcIi8+XCI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gMDtcbiAgICB0aGlzLmJyZWFrcG9pbnQgPSAzMjA7XG4gICAgdGhpcy5icmVha3BvaW50cyA9IFtdO1xuICAgIHRoaXMuYnBzID0ge1xuICAgICAgbW9iaWxlOiA1NDQsXG4gICAgICB0YWJsZXQ6IDc2OCxcbiAgICAgIGxhcHRvcDogOTkyLFxuICAgICAgZGVza3RvcDogMTIwMCxcbiAgICAgIGRlc2t0b3BfeGw6IDE2MDBcbiAgICB9O1xuICAgIHRoaXMuYnJvd3NlciA9IHRoaXMud2hpY2hCcm93c2VyKCk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiVXRpbGl0aWVzIGxvYWRlZFwiKTtcblxuICAgIC8vIHNldCBicmVha3BvaW50IG9uIHdpbmRvdyBsb2FkXG4gICAgdGhpcy5fc2V0QnJlYWtwb2ludCgpO1xuICAgIHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgY29uc29sZS5sb2coXCJDdXJyZW50IEJyZWFrcG9pbnQgaXM6XCIsIHRoaXMuYnJlYWtwb2ludCk7XG5cbiAgICAvLyBjcmVhdGUgZnVsbCBhcnJheSBmb3IgaW1hZ2UgY29tcHJlc3Npb24gcmVmXG4gICAgdGhpcy5icmVha3BvaW50cyA9IHRoaXMuX3NldEJyZWFrcG9pbnRzKHRoaXMuYnBzKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLl9jaGVja0JyZWFrcG9pbnQpLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IFV0aWxzID0gbmV3IFV0aWxpdHlDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7Il19
