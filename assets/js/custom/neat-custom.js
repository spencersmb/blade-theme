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
var gallery_isotope_1 = require("./partials/gallery-isotope");
var header_slider_1 = require("./partials/header-slider");
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
            processAnimation_1.default.init(); // Global window anim and click control
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
    // Bind events to the imagesLoaded plugin here
    $(document).on("imgLoaded", function (e) {
        console.log("image loaded custom event");
        // check if page has gallery
        if ($(".gallery-container").length > 0) {
            gallery_isotope_1.default.init();
        }
        header_slider_1.default.init();
    });
})();

},{"./navigation/components/search":2,"./navigation/navigation":3,"./partials/gallery-isotope":4,"./partials/header-slider":5,"./partials/header-svg":6,"./partials/imageLoader":7,"./partials/processAnimation":8,"./partials/sticky-sidebar":9,"./partials/utils":10}],2:[function(require,module,exports){
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
        // this.$lowerContainer = $(".lowercontainer");
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
        // this.$lowerContainer = $(".lowercontainer");
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
        // this.$lowerContainer.detach();
        this.$dropDownWrapper.detach();
        // this.$lowerContainer.insertAfter(this.$upperContainer);
        this.$navMeta.insertBefore(this.$upperContainer);
        this.$upperContainer.append(this.$dropDownWrapper);
        this.$navMeta.append(this.$search);
    };
    NavComponent.prototype.moveNavigationTablet = function () {
        // console.log("move navigation tablet");
        this.$search.detach();
        // this.$lowerContainer.detach();
        this.$upperContainer.append(this.$navMeta);
        // this.$upperContainer.append(this.$lowerContainer);
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
        console.log("Nav turned on");
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

},{"../partials/utils":10}],4:[function(require,module,exports){
"use strict";
var $ = jQuery;
var GalleryComponent = (function () {
    function GalleryComponent() {
        this.gridId = $(".inner-content-module").children("div").attr("id");
        this.$fullGrid = $("#" + this.gridId);
        this.$galleryContainer = $(".gallery-container");
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
            console.log("grid 5");
            this.gallery_grid = 5;
        }
        else if (windowWidthRef <= 600) {
            this.gallery_grid = 1;
        }
        else if (windowWidthRef <= 991) {
            this.gallery_grid = 2;
        }
        else if (windowWidthRef <= 1199) {
            console.log("grid 3");
            this.gallery_grid = 3;
        }
        else {
            console.log("grid 4");
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
        $(".gallery-isotope").css("width", this.gallery_wrapper_width);
        return this.gallery_grid;
    };
    GalleryComponent.prototype.reloadIsotop = function () {
        this.$grid.isotope();
        this.setMinHeight();
    };
    GalleryComponent.prototype.setMinHeight = function () {
        // Set min height depending one what content was filtered
        this.currentHeight = $(".gallery-item.width1").css("padding-bottom");
        var heightStr = this.currentHeight.toString();
        this.currentHeightPX = this.pxConvert(heightStr);
        if (this.currentHeightPX !== 0) {
            $(".gallery-isotope").css("min-height", Math.round(this.currentHeightPX));
        }
        else {
            this.currentHeightPX = $(".gallery-item.width1").height();
            $(".gallery-isotope").css("min-height", Math.round(this.currentHeightPX));
        }
    };
    GalleryComponent.prototype.pxConvert = function (objectHeight) {
        return parseInt(objectHeight.slice(0, -2));
    };
    GalleryComponent.prototype.addImageTransition = function () {
        // add transition for intro animation
        $(".gallery-item").css("transition-duration", "600ms");
    };
    GalleryComponent.prototype.loadImagesIn = function () {
        this.$grid.isotope("once", "arrangeComplete", function () {
            // fade in
            $(".gallery-item").addClass("active");
            // remove animation for smooth filtering
            setTimeout(function () {
                $(".gallery-item").css("transition-duration", "0ms");
            }, 500);
        });
    };
    GalleryComponent.prototype.onResize = function () {
        clearTimeout(this.reIsoTimeOut);
        // gallery isotope
        if ($(".gallery-container").length > 0) {
            this.galleryIsotopeWrapper();
            // on resize complete, readjust grid
            this.reIsoTimeOut = setTimeout(this.reloadIsotop.bind(this), 500);
        }
    };
    GalleryComponent.prototype.onFilterClick = function (el, el2) {
        var $this = $(el2.toElement);
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
    // Get grid to assign dynamically
    GalleryComponent.prototype.init = function () {
        console.log("Isotope Init");
        // Add transition to animate image in gracefully
        this.addImageTransition();
        // Setup Isotope for the first time
        this.setupIsotope();
        // Create perfect grid
        this.galleryIsotopeWrapper();
        // delay isotope init using helper function that fires on resize
        setTimeout(this.reloadIsotop.bind(this), 1000);
        // Animate Images in onLoad
        this.loadImagesIn();
        // Add filter on Click
        var $this = this;
        $(".filter-group").on("click", "li", this.onFilterClick.bind(this, $this));
        $(window).on("resize", this.onResize.bind(this));
    };
    return GalleryComponent;
}());
var IsotopeGallery = new GalleryComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IsotopeGallery;

},{}],5:[function(require,module,exports){
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
    SliderComponent.prototype.setNumber = function (count) {
        // conver number to string
        var total = count;
        return total.toString();
    };
    SliderComponent.prototype.updateNav = function (index, selected) {
        // update numbers on screen
        this.currentCount.html(this.setNumber(this.getCurrentSlideCount()));
        // Enable/Disable arrow btns
        this.prevBtn.parent("li").toggleClass("slider-hidden", selected.is(":first-child"));
        this.nextBtn.parent("li").toggleClass("slider-hidden", selected.is(":last-child"));
    };
    SliderComponent.prototype.updateSlide = function (direction) {
        event.preventDefault();
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
            this.container.addClass("is-active").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                $("body,html").animate({ "scrollTop": _this.container.offset().top }, 200);
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
        this.countTotal.html(this.setNumber(this.getTotalSlides()));
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

},{"./utils":10}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
"use strict";
var $ = jQuery;
var utils_1 = require("./utils");
var AnimationComponent = (function () {
    function AnimationComponent() {
        this.container = $(".process-container");
        this.item = $(".process-item-container");
        this.mScene = $(".m-scene");
        this.serviceSideBar = $(".service-sidebar-wrapper");
    }
    AnimationComponent.prototype.desc_o_animate = function () {
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
    AnimationComponent.prototype.processAnimateIn = function () {
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
    };
    AnimationComponent.prototype.loadUrl = function (url) {
        document.location.href = url;
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
        if (url === "#" || url === "") {
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
        var hasChildren = $(event.currentTarget).parent("li").hasClass("menu-item-has-children");
        if (utils_1.default.breakpoint > utils_1.default.bps.tablet &&
            this.checkUrl(newUrl) &&
            utils_1.default.browser === "ipad" && hasChildren) {
            event.preventDefault();
            // console.log('Tablet Nav click');
            return;
        }
        else if (utils_1.default.breakpoint > utils_1.default.bps.tablet && this.checkUrl(newUrl)) {
            // laptop or large no ipad
            // console.log("laptop or larger");
            this.mainContentAnimationOut(function () {
                _this.loadUrl(newUrl);
            });
        }
        else if (this.checkUrl(newUrl) && hasChildren) {
        }
        else {
            this.loadUrl(newUrl);
        }
    };
    AnimationComponent.prototype.init = function () {
        var _this = this;
        this.processAnimateIn();
        this.desc_o_animate();
        // Click event to control window Loading
        $("a").on("click", function (e) {
            event.preventDefault();
            _this.globalClickCheck(e);
        });
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

},{"./utils":10}],9:[function(require,module,exports){
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
            (!window.requestAnimationFrame) ? setTimeout(this.updateSidebarPosition.bind(this), 300) : window.requestAnimationFrame(this.updateSidebarPosition.bind(this));
        }
        else {
            this.resetSideBar();
        }
    };
    StickySidebarComponent.prototype.resetSideBar = function () {
        this.isAnimating = false;
        this.aside.removeClass("sticky");
        this.aside.attr("style", "");
    };
    StickySidebarComponent.prototype.updateSidebarPosition = function () {
        this.checkScrollDirection();
        // get distance from top of content 10 + 40 = 50 padding top
        this.contentOffsetTop = this.contentWrapper.offset().top - 10;
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
        else if (this.scrollTop >= this.contentOffsetTop && this.scrollTop < this.contentWrapperHeight - this.sidebarHeight + this.contentOffsetTop - 40) {
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
                this.aside.removeClass("sticky").css("top", this.contentWrapperHeight - this.sidebarHeight + "px");
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
        var _this = this;
        this.aside.removeClass("intro");
        if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            var sidebarIntro = TweenMax.to(this.aside, .3, {
                x: 0,
                opacity: 1,
                z: .001,
                ease: Cubic.easeOut,
                delay: .9,
                onComplete: function () {
                    // make sidebar permanently visible
                    _this.aside.addClass("visible");
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
            this.animateSidebarIn();
        }
    };
    return StickySidebarComponent;
}());
var StickySidebar = new StickySidebarComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StickySidebar;

},{"./utils":10}],10:[function(require,module,exports){
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
        this.browser = this.whichBrowser();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGUudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zdmcudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2ltYWdlTG9hZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zdGlja3ktc2lkZWJhci50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7O0dBR0c7O0FBRUgsc0JBQWtCLGtCQUFrQixDQUFDLENBQUE7QUFDckMsMkJBQWdCLHlCQUF5QixDQUFDLENBQUE7QUFDMUMsdUJBQW1CLGdDQUFnQyxDQUFDLENBQUE7QUFDcEQsMkJBQXNCLHVCQUF1QixDQUFDLENBQUE7QUFDOUMsb0RBQW9EO0FBQ3BELDRCQUF3Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ2pELCtCQUEwQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3RELGlDQUFnQyw2QkFBNkIsQ0FBQyxDQUFBO0FBQzlELGdDQUEyQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3hELDhCQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3BELDBEQUEwRDtBQUMxRCxJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFFakIsNEJBQTRCO0FB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QVUsQ0FBQyxDQUFDO1FBRXZELDhDQUE4QztRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxELENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQWpGQSxBQWlGQyxJQUFBO0FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0FBRW5DO2tCQUFlLEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuIFJlZiBwYXRoIGlzIG5vdCBuZWVkZWQgZm9yIHNvbWUgcmVhc29uXG4gPHJlZmVyZW5jZSBwYXRoPVwiL1VzZXJzL3lvc2VtZXRpZS9Ecm9wYm94L2RldmVsb3BtZW50L3Zob3N0cy93d3cubHluZGFzY29yZS5kZXYvd3AtY29udGVudC90aGVtZXMvbmVhdC90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbiAqL1xuXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBOYXYgZnJvbSBcIi4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL25hdmlnYXRpb24vY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCBTdmdIZWFkZXIgZnJvbSBcIi4vcGFydGlhbHMvaGVhZGVyLXN2Z1wiO1xuLy8gaW1wb3J0IFNtb290aFN0YXRlIGZyb20gXCIuL3BhcnRpYWxzL3Ntb290aFN0YXRlXCI7XG5pbXBvcnQgSW1hZ2VMb2FkZXIgZnJvbSBcIi4vcGFydGlhbHMvaW1hZ2VMb2FkZXJcIjtcbmltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyXCI7XG5pbXBvcnQgQW5pbWF0aW9uQ29udHJvbGxlciBmcm9tIFwiLi9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uXCI7XG5pbXBvcnQgSXNvdG9wZUdhbGxlcnkgZnJvbSBcIi4vcGFydGlhbHMvZ2FsbGVyeS1pc290b3BlXCI7XG5pbXBvcnQgSGVhZGVyU2xpZGVyIGZyb20gXCIuL3BhcnRpYWxzL2hlYWRlci1zbGlkZXJcIjtcbi8vIGltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3NlcnZpY2Utc2lkZWJhclwiO1xuY29uc3QgJCA9IGpRdWVyeTtcbmRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG4vLyBkZWNsYXJlIHZhciByZXZhcGkxOiBhbnk7XG5cbihmdW5jdGlvbiAoKSB7XG4gIGNsYXNzIEFwcCB7XG5cbiAgICBpbml0KCk6IHZvaWQge1xuICAgICAgY29uc29sZS5sb2coXCJOZWF0IGxvYWRlZFwiKTtcbiAgICAgIFN2Z0hlYWRlci5pbml0KCk7XG4gICAgICBVdGlscy5pbml0KCk7XG4gICAgICBOYXYuaW5pdCgpO1xuICAgICAgU2VhcmNoLmluaXQoKTtcbiAgICAgIFN0aWNreVNpZGViYXIuaW5pdCgpO1xuICAgICAgQW5pbWF0aW9uQ29udHJvbGxlci5pbml0KCk7IC8vIEdsb2JhbCB3aW5kb3cgYW5pbSBhbmQgY2xpY2sgY29udHJvbFxuXG4gICAgfVxuICB9XG5cbiAgbGV0IGJvb3RzdHJhcCA9IG5ldyBBcHAoKTtcblxuICAvKiogcnVuIGFsbCBmdW5jdGlvbnMgKi9cbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGJvb3RzdHJhcC5pbml0KCk7XG4gICAgSW1hZ2VMb2FkZXIuaW5pdCgpO1xuICAgIC8vIFNtb290aFN0YXRlLmluaXQoXCJcIik7XG4gIH0pO1xuXG4gIC8vIEJpbmQgZXZlbnRzIHRvIHRoZSBpbWFnZXNMb2FkZWQgcGx1Z2luIGhlcmVcbiAgJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24gKCBlICkge1xuICAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICAvLyBjaGVjayBpZiBwYWdlIGhhcyBnYWxsZXJ5XG4gICAgaWYgKCAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBJc290b3BlR2FsbGVyeS5pbml0KCk7XG4gICAgfVxuICAgIEhlYWRlclNsaWRlci5pbml0KCk7XG5cbiAgfSk7XG5cbn0pKCk7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vLi4vcGFydGlhbHMvdXRpbHNcIjtcblxuY2xhc3MgU2VhcmNoQ29tcG9uZW50IHtcbiAgJHNlYXJjaFRyaWdnZXI6IEpRdWVyeTtcbiAgJHNlYXJjaENsb3NlVHJpZ2dlcjogSlF1ZXJ5O1xuICAkc2VhcmNoRm9ybTogSlF1ZXJ5O1xuICAkc2VhcmNoQnV0dG9uQXJlYTogSlF1ZXJ5O1xuICAkaWNvbjogSlF1ZXJ5O1xuICAkZm9ybTogSlF1ZXJ5O1xuICAkaW5wdXQ6IEpRdWVyeTtcbiAgJHdpZHRoOiBudW1iZXI7XG4gICRoZWlnaHQ6IG51bWJlcjtcbiAgaXNPcGVuOiBib29sZWFuO1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlciA9ICQoXCIubWV0YS1zZWFyY2gtdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIgPSAkKFwiLnN1cGVyLXNlYXJjaC1jbG9zZVwiKTtcbiAgICB0aGlzLiRzZWFyY2hGb3JtID0gJChcIi5zdXBlci1zZWFyY2hcIik7XG4gICAgdGhpcy4kc2VhcmNoQnV0dG9uQXJlYSA9ICQoXCIubWV0YS1zZWFyY2hcIik7XG4gICAgdGhpcy4kaWNvbiA9IHRoaXMuJHNlYXJjaFRyaWdnZXIuY2hpbGRyZW4oXCJpXCIpO1xuICAgIHRoaXMuJGZvcm0gPSB0aGlzLiRzZWFyY2hGb3JtLmZpbmQoXCIuZXQtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZm9ybS5maXJzdCgpO1xuICAgIHRoaXMuJHdpZHRoID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS53aWR0aCgpO1xuICAgIHRoaXMuJGhlaWdodCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEuaGVpZ2h0KCk7XG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggUmVsb2FkXCIpO1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gJChcIi5ldC1zZWFyY2hcIik7XG4gICAgdGhpcy4kd2lkdGggPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gICAgdGhpcy4kaGVpZ2h0ID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS5oZWlnaHQoKTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gIH1cblxuICBnZXRUb3BQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgfVxuXG4gIGdldExlZnRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9mZnNldCgpLmxlZnQ7XG4gIH1cblxuICBjbG9zZVNlYXJjaCggZXZlbnQgKSB7XG5cbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG4gICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIsIC4yLCB7XG4gICAgICB0b3A6IFwiNSVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kZm9ybSwgLjQsIHtcbiAgICAgIHRvcDogXCIyNSVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgICAgZWFzZTogRXhwby5lYXNlSW5PdXRcbiAgICB9KTtcblxuICAgIGFuaW1hdGlvbi50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogdGhpcy5nZXRMZWZ0UG9zaXRpb24oKSxcbiAgICAgIHRvcDogdGhpcy5nZXRUb3BQb3NpdGlvbigpLFxuICAgICAgd2lkdGg6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgZGVsYXk6IC4zLFxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgd2lkdGg6IFwiMTAwJVwiXG4gICAgICAgIH0pO1xuICAgICAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgICAgICB0b3A6IFwiNTAlXCIsXG4gICAgICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSkudG8odGhpcy4kc2VhcmNoRm9ybSwgLjQsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgICAgICBcInotaW5kZXhcIjogLTEsXG4gICAgICAgICAgXCJsZWZ0XCI6IDAsXG4gICAgICAgICAgXCJ0b3BcIjogMCxcbiAgICAgICAgICBcIndpZHRoXCI6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgICBcImhlaWdodFwiOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgfVxuXG4gIG9wZW5TZWFyY2goZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgLy8gcHJldmVudCBidXR0b24gZnJvbSBiZWluZyB1c2VkIG9uY2Ugc2VhcmNoIGlzIG9wZW5cbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyLmJsdXIoKTtcblxuICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgIGxlZnQ6IHRoaXMuZ2V0TGVmdFBvc2l0aW9uKCksXG4gICAgICB0b3A6IHRoaXMuZ2V0VG9wUG9zaXRpb24oKSxcbiAgICAgIHdpZHRoOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIFwiei1pbmRleFwiOiA5OTlcbiAgICB9KTtcblxuICAgIGxldCBhbmltYXRpb24gPSBuZXcgVGltZWxpbmVMaXRlKCk7XG5cbiAgICBhbmltYXRpb24udG8odGhpcy4kc2VhcmNoRm9ybSwgLjIsIHtcbiAgICAgIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjJcbiAgICB9KS50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgYmFja2dyb3VuZDogXCIjMzUzNzNEXCIsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgb3ZlcmZsb3dZOiBcInNjcm9sbFwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGljb24sIC4yLCB7XG4gICAgICB0b3A6IFwiMTEwJVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyLCAuMywge1xuICAgICAgdG9wOiBcIjMlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjIwJVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjQsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIGxvYWRlZFwiKTtcbiAgICAvLyB0aGlzLm9wZW5TZWFyY2goKTtcbiAgICB0aGlzLiRpbnB1dC5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIC8vIGlmIGtleSBpcyBlbnRlciAtIGFuaW1hdGUgb3V0XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gICAgXG4gICAgJChcImJvZHlcIikua2V5dXAoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAyNyAmJiB0aGlzLmlzT3BlbiApIHtcbiAgICAgICAgdGhpcy5jbG9zZVNlYXJjaChldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubGV0IFNlYXJjaEJveCA9IG5ldyBTZWFyY2hDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQm94OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQgU2VhcmNoQm94IGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5cbmludGVyZmFjZSBOYXZTdGF0ZSB7XG4gIG5hdkVuYWJsZWQ6IGJvb2xlYW47XG4gIG1vYmlsZTogYm9vbGVhbjtcbiAgdGFibGV0OiBib29sZWFuO1xuICBsYXB0b3A6IGJvb2xlYW47XG4gIGRlc2t0b3A6IGJvb2xlYW47XG59XG5cbmNsYXNzIE5hdkNvbXBvbmVudCB7XG4gICRuYXZUcmlnZ2VyOiBIVE1MRWxlbWVudDtcbiAgJG5hdkRyb3Bkb3duOiBIVE1MRWxlbWVudDtcbiAgJGxvd2VyQ29udGFpbmVyOiBKUXVlcnk7XG4gICR1cHBlckNvbnRhaW5lcjogSlF1ZXJ5O1xuICAkbmF2TWV0YTogSlF1ZXJ5O1xuICAkZHJvcERvd25XcmFwcGVyOiBKUXVlcnk7XG4gICRzZWFyY2g6IEpRdWVyeTtcbiAgJGRyb3BEb3duQ29udGVudDogSlF1ZXJ5O1xuXG4gIHN0YXRlOiBOYXZTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuJG5hdlRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJldC1kcm9wZG93bi10cmlnZ2VyXCIpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyID0gJChcIi5sb3dlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lciA9ICQoXCIudXBwZXJjb250YWluZXJcIik7XG4gICAgdGhpcy4kbmF2TWV0YSA9ICQoXCIuZXQtbmF2LW1ldGFcIik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyID0gJChcIi5ldC1kcm9wZG93bi13cmFwcGVyXCIpO1xuICAgIHRoaXMuJHNlYXJjaCA9ICQoXCIjbmF2LXhmZXJcIik7XG4gICAgdGhpcy4kZHJvcERvd25Db250ZW50ID0gJChcIi5ldC1kcm9wZG93bi1jb250ZW50XCIpO1xuXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICBkZXNrdG9wOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICAvKlxuICAgTW9iaWxlIE5hdiBmdW5jdGlvbmFsaXR5XG4gICAqL1xuXG4gIHJlbG9hZCgpIHtcblxuICAgIHRoaXMuJG5hdlRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJldC1kcm9wZG93bi10cmlnZ2VyXCIpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyID0gJChcIi5sb3dlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lciA9ICQoXCIudXBwZXJjb250YWluZXJcIik7XG4gICAgdGhpcy4kbmF2TWV0YSA9ICQoXCIuZXQtbmF2LW1ldGFcIik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyID0gJChcIi5ldC1kcm9wZG93bi13cmFwcGVyXCIpO1xuICAgIHRoaXMuJHNlYXJjaCA9ICQoXCIjbmF2LXhmZXJcIik7XG4gICAgdGhpcy4kZHJvcERvd25Db250ZW50ID0gJChcIi5ldC1kcm9wZG93bi1jb250ZW50XCIpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgZGVza3RvcDogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBvcGVuTmF2KCBldmVudDogRXZlbnQgKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICQodGhpcy4kbmF2RHJvcGRvd24pLmFkZENsYXNzKFwibWVudS1pcy1hY3RpdmVcIik7XG4gICAgVHdlZW5NYXgudG8odGhpcy4kbmF2RHJvcGRvd24sIC4zLCB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjbG9zZU5hdiggZXZlbnQ6IEV2ZW50ICk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCh0aGlzLiRuYXZEcm9wZG93bikucmVtb3ZlQ2xhc3MoXCJtZW51LWlzLWFjdGl2ZVwiKTtcbiAgICBUd2Vlbk1heC50byh0aGlzLiRuYXZEcm9wZG93biwgLjMsIHtcbiAgICAgICAgdG9wOiBcIi0xMDAlXCIsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuYXZPcGVuSW5pdCggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKHRoaXMuJG5hdlRyaWdnZXIpLm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuTmF2LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMuJG5hdlRyaWdnZXIpLm9mZigpO1xuICAgIH1cblxuICB9XG5cbiAgbmF2Q2xvc2UoIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKFwiI25hdi1jbG9zZVwiKS5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VOYXYuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjbmF2LWNsb3NlXCIpLm9mZigpO1xuICAgIH1cblxuICB9XG5cbiAgbmF2SXRlbUNsaWNrKCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuXG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKFwiYVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9ICQodGhpcyk7XG4gICAgICAgIHNlbGVjdGVkLm5leHQoXCJ1bFwiKS5yZW1vdmVDbGFzcyhcImlzLWhpZGRlblwiKS5wYXJlbnQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5wYXJlbnQoXCJ1bFwiKS5hZGRDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5jaGlsZHJlbihcImFcIikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBnb2JhY2soIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKFwiLmdvLWJhY2sgPiBhXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZWN0ZWQucGFyZW50KFwibGlcIikucGFyZW50KFwiLmV0LXNlY29uZGFyeS1kcm9wZG93blwiKS5hZGRDbGFzcyhcImlzLWhpZGRlblwiKS5wYXJlbnQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5wYXJlbnQoXCJ1bFwiKS5yZW1vdmVDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIuZ28tYmFjayA+IGFcIikub2ZmKCk7XG4gICAgfVxuXG5cbiAgfVxuXG4gIG1vdmVOYXZpZ2F0aW9uTW9iaWxlKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibW92ZSBuYXZpZ2F0aW9uIG1vYmlsZVwiKTtcblxuICAgIHRoaXMuJHNlYXJjaC5kZXRhY2goKTtcbiAgICB0aGlzLiRuYXZNZXRhLmRldGFjaCgpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyLmRldGFjaCgpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlci5kZXRhY2goKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lci5pbnNlcnRBZnRlcih0aGlzLiR1cHBlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kbmF2TWV0YS5pbnNlcnRCZWZvcmUodGhpcy4kdXBwZXJDb250YWluZXIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRkcm9wRG93bldyYXBwZXIpO1xuICAgIHRoaXMuJG5hdk1ldGEuYXBwZW5kKHRoaXMuJHNlYXJjaCk7XG4gIH1cblxuICBtb3ZlTmF2aWdhdGlvblRhYmxldCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiB0YWJsZXRcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guZGV0YWNoKCk7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIuZGV0YWNoKCk7XG4gICAgdGhpcy4kdXBwZXJDb250YWluZXIuYXBwZW5kKHRoaXMuJG5hdk1ldGEpO1xuICAgIC8vIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRsb3dlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyLmluc2VydEFmdGVyKHRoaXMuJHVwcGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIucHJlcGVuZCh0aGlzLiRzZWFyY2gpO1xuICB9XG5cbiAgbW92ZU5hdmlnYXRpb25EZWtzdG9wKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibW92ZSBuYXZpZ2F0aW9uIGRlc2t0b3BcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guaW5zZXJ0QmVmb3JlKHRoaXMuJGRyb3BEb3duQ29udGVudCk7XG5cbiAgfVxuXG4gIGRpc2FibGVNb2JpbGVOYXYoKSB7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIk5hdiB0dXJuZWQgb2ZmXCIpO1xuICAgIHRoaXMubmF2T3BlbkluaXQoZmFsc2UpO1xuICAgIHRoaXMubmF2Q2xvc2UoZmFsc2UpO1xuICAgIHRoaXMubmF2SXRlbUNsaWNrKGZhbHNlKTtcbiAgICB0aGlzLmdvYmFjayhmYWxzZSk7XG4gICAgdGhpcy5zdGF0ZS5uYXZFbmFibGVkID0gZmFsc2U7XG5cbiAgfVxuXG4gIGVuYWJsZU1vYmlsZU5hdigpIHtcbiAgICBjb25zb2xlLmxvZyhcIk5hdiB0dXJuZWQgb25cIik7XG4gICAgdGhpcy5uYXZPcGVuSW5pdCh0cnVlKTtcbiAgICB0aGlzLm5hdkNsb3NlKHRydWUpO1xuICAgIHRoaXMubmF2SXRlbUNsaWNrKHRydWUpO1xuICAgIHRoaXMuZ29iYWNrKHRydWUpO1xuXG4gICAgdGhpcy5zdGF0ZS5uYXZFbmFibGVkID0gdHJ1ZTtcblxuICB9XG5cbiAgYnJlYWtQb2ludE1vYmlsZSgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgTW9iaWxlXCIpO1xuXG4gICAgaWYgKCAhdGhpcy5zdGF0ZS5uYXZFbmFibGVkICkge1xuICAgICAgdGhpcy5lbmFibGVNb2JpbGVOYXYoKTtcbiAgICB9XG4gICAgdGhpcy5tb3ZlTmF2aWdhdGlvbk1vYmlsZSgpO1xuICB9XG5cbiAgYnJlYWtQb2ludFRhYmxldCggcHJldlN0YXRlICkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBUYWJsZXRcIik7XG4gICAgaWYgKCAhdGhpcy5zdGF0ZS5uYXZFbmFibGVkICkge1xuICAgICAgdGhpcy5lbmFibGVNb2JpbGVOYXYoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uVGFibGV0KCk7XG4gIH1cblxuICBicmVha1BvaW50TGFwdG9wKCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IExhcHRvcFwiKTtcblxuICAgIGlmICggdGhpcy5zdGF0ZS5uYXZFbmFibGVkICkge1xuICAgICAgdGhpcy5kaXNhYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuXG4gICAgLy8gaWYgcHJldiBzdGF0ZSB3YXMgdGFibGV0IGRvIHRoaXM6XG4gICAgaWYgKCBwcmV2U3RhdGUuZGVza3RvcCA9PT0gZmFsc2UgfHwgcHJldlN0YXRlLm1vYmlsZSA9PT0gdHJ1ZSApIHtcblxuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvblRhYmxldCgpO1xuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvbkRla3N0b3AoKTtcbiAgICB9XG4gIH1cblxuICBicmVha1BvaW50RGVza3RvcCggcHJldlN0YXRlICkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBEZXNrdG9wXCIpO1xuXG4gICAgaWYgKCBwcmV2U3RhdGUubGFwdG9wID09PSBmYWxzZSB8fCBwcmV2U3RhdGUubW9iaWxlID09PSB0cnVlICkge1xuXG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uVGFibGV0KCk7XG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uRGVrc3RvcCgpO1xuICAgIH1cblxuICB9XG5cbiAgbmF2UmVzaXplKCkge1xuICAgIC8qXG4gICAgIE1vYmlsZVxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLm1vYmlsZSApIHtcblxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS5tb2JpbGUgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludE1vYmlsZSgpO1xuICAgICAgfVxuICAgICAgLy8gVHVybiBtb2JpbGUgb25cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiB0cnVlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBUYWJsZXRcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIC8vIHRhYmxldCBhbmQgaGlnaGVyXG4gICAgICAvLyBkbyBvbmNlXG4gICAgICBpZiAoICF0aGlzLnN0YXRlLnRhYmxldCApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50VGFibGV0KHByZXZTdGF0ZSk7XG4gICAgICB9XG4gICAgICAvLyBUdXJuIG1vYmlsZSBvblxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IHRydWUsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qXG4gICAgIExhcHRvcFxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIGxldCBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS5sYXB0b3AgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludExhcHRvcChwcmV2U3RhdGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiB0cnVlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgIERlc2t0b3BcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5kZXNrdG9wICkge1xuXG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS5kZXNrdG9wICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnREZXNrdG9wKHByZXZTdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIG5hdkxvYWQoKSB7XG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubW9iaWxlICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnRNb2JpbGUoKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogdHJ1ZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy50YWJsZXQgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludFRhYmxldCh0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogdHJ1ZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnRMYXB0b3AodGhpcy5zdGF0ZSk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiB0cnVlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5kZXNrdG9wICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnREZXNrdG9wKHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIk5hdiBsb2FkZWRcIik7XG5cbiAgICB0aGlzLm5hdkxvYWQoKTtcbiAgICAvLyBTZWFyY2hCb3guaW5pdCgpO1xuXG4gICAgLyoqKioqKioqKioqKioqKipcbiAgICAgTkFWIFJFU0laRSBFVkVOVFxuICAgICAqKioqKioqKioqKioqKiovXG5cbiAgICB3aW5kb3cub25yZXNpemUgPSAoIGV2ZW50ICkgPT4ge1xuICAgICAgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgICA/IHNldFRpbWVvdXQodGhpcy5uYXZSZXNpemUuYmluZCh0aGlzKSwgMzAwKVxuICAgICAgICA6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5uYXZSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuXG4gIH1cbn1cblxubGV0IE5hdiA9IG5ldyBOYXZDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5kZWNsYXJlIHZhciBJc290b3BlOiBhbnk7XG5cbmNsYXNzIEdhbGxlcnlDb21wb25lbnQge1xuXG4gIGdyaWRJZDogc3RyaW5nO1xuICBnYWxsZXJ5X2dyaWQ6IG51bWJlcjtcbiAgZ2FsbGVyeV93cmFwcGVyX3dpZHRoOiBudW1iZXI7XG4gICRmdWxsR3JpZDogSlF1ZXJ5O1xuICAkZ2FsbGVyeUNvbnRhaW5lcjogSlF1ZXJ5O1xuICAkZ3JpZDogYW55O1xuICBjdXJyZW50SGVpZ2h0OiBzdHJpbmc7XG4gIGN1cnJlbnRIZWlnaHRQWDogbnVtYmVyO1xuICByZUlzb1RpbWVPdXQ6IG51bWJlcjtcbiAgaXNDb250YWluZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ncmlkSWQgPSAkKFwiLmlubmVyLWNvbnRlbnQtbW9kdWxlXCIpLmNoaWxkcmVuKFwiZGl2XCIpLmF0dHIoXCJpZFwiKTtcbiAgICB0aGlzLiRmdWxsR3JpZCA9ICQoXCIjXCIgKyB0aGlzLmdyaWRJZCk7XG4gICAgdGhpcy4kZ2FsbGVyeUNvbnRhaW5lciA9ICQoXCIuZ2FsbGVyeS1jb250YWluZXJcIik7XG4gIH1cblxuICBzZXR1cElzb3RvcGUoKSB7XG4gICAgLy8gaW5pdCBpc290b3BlXG4gICAgdGhpcy4kZ3JpZCA9IHRoaXMuJGZ1bGxHcmlkLmlzb3RvcGUoe1xuICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICAgICAgaXRlbVNlbGVjdG9yOiBcIi5nYWxsZXJ5LWl0ZW1cIixcbiAgICAgIGlzSW5pdExheW91dDogZmFsc2UsXG4gICAgICBtYXNvbnJ5OiB7XG4gICAgICAgIFwiY29sdW1uV2lkdGhcIjogXCIuZ3JpZC1zaXplclwiXG4gICAgICB9LFxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBcIi4zc1wiXG4gICAgfSk7XG4gIH1cblxuICBnYWxsZXJ5SXNvdG9wZVdyYXBwZXIoKSB7XG4gICAgbGV0IHdpbmRvd1dpZHRoUmVmID0gJCh3aW5kb3cpLmlubmVyV2lkdGgoKTsgLy8gZm9yIHNjcm9sbCBiYXIgZml4IGN1cnJlbnRseVxuXG4gICAgLy8gSXMgY29udGFpbmVyIG9yIGZ1bGwgd2lkdGg/XG4gICAgaWYgKCB0aGlzLiRnYWxsZXJ5Q29udGFpbmVyLmhhc0NsYXNzKFwiY29udGFpbmVyXCIpICkge1xuICAgICAgdGhpcy5pc0NvbnRhaW5lZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy9cbiAgICBpZiAoIHdpbmRvd1dpZHRoUmVmID4gMTYwMCAmJiB0aGlzLmlzQ29udGFpbmVkID09PSBmYWxzZSApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ3JpZCA1XCIpO1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA1O1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDYwMCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMTtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSA5OTEgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDI7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gMTE5OSApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ3JpZCAzXCIpO1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcImdyaWQgNFwiKTtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gNDtcbiAgICB9XG5cbiAgICBpZiAoICQoXCIuZ2FsbGVyeS0zLWdyaWRcIikubGVuZ3RoID4gMCAmJiB3aW5kb3dXaWR0aFJlZiA+IDEyNDggKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDM7XG4gICAgfVxuXG4gICAgaWYgKCAkKFwiLmdhbGxlcnktNC1ncmlkXCIpLmxlbmd0aCA+IDAgJiYgd2luZG93V2lkdGhSZWYgPiAxNTg0ICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA0O1xuICAgIH1cblxuICAgIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoID0gJChcIi5nYWxsZXJ5LWNvbnRhaW5lclwiKS53aWR0aCgpO1xuXG4gICAgaWYgKCB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCAlIHRoaXMuZ2FsbGVyeV9ncmlkID4gMCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoID0gdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggKyAoIHRoaXMuZ2FsbGVyeV9ncmlkIC0gdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggJSB0aGlzLmdhbGxlcnlfZ3JpZCk7XG4gICAgfVxuICAgICQoXCIuZ2FsbGVyeS1pc290b3BlXCIpLmNzcyhcIndpZHRoXCIsIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoKTtcblxuICAgIHJldHVybiB0aGlzLmdhbGxlcnlfZ3JpZDtcbiAgfVxuXG4gIHJlbG9hZElzb3RvcCgpIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoKTtcbiAgICB0aGlzLnNldE1pbkhlaWdodCgpO1xuICB9XG5cbiAgc2V0TWluSGVpZ2h0KCkge1xuXG4gICAgLy8gU2V0IG1pbiBoZWlnaHQgZGVwZW5kaW5nIG9uZSB3aGF0IGNvbnRlbnQgd2FzIGZpbHRlcmVkXG4gICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gJChcIi5nYWxsZXJ5LWl0ZW0ud2lkdGgxXCIpLmNzcyhcInBhZGRpbmctYm90dG9tXCIpO1xuICAgIGxldCBoZWlnaHRTdHIgPSB0aGlzLmN1cnJlbnRIZWlnaHQudG9TdHJpbmcoKTtcbiAgICB0aGlzLmN1cnJlbnRIZWlnaHRQWCA9IHRoaXMucHhDb252ZXJ0KGhlaWdodFN0cik7XG5cbiAgICBpZiAoIHRoaXMuY3VycmVudEhlaWdodFBYICE9PSAwICkge1xuXG4gICAgICAkKFwiLmdhbGxlcnktaXNvdG9wZVwiKS5jc3MoXCJtaW4taGVpZ2h0XCIsIE1hdGgucm91bmQodGhpcy5jdXJyZW50SGVpZ2h0UFgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0UFggPSAkKFwiLmdhbGxlcnktaXRlbS53aWR0aDFcIikuaGVpZ2h0KCk7XG5cbiAgICAgICQoXCIuZ2FsbGVyeS1pc290b3BlXCIpLmNzcyhcIm1pbi1oZWlnaHRcIiwgTWF0aC5yb3VuZCh0aGlzLmN1cnJlbnRIZWlnaHRQWCkpO1xuICAgIH1cbiAgfVxuXG4gIHB4Q29udmVydCggb2JqZWN0SGVpZ2h0OiBzdHJpbmcgKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KG9iamVjdEhlaWdodC5zbGljZSgwLCAtMikpO1xuICB9XG5cbiAgYWRkSW1hZ2VUcmFuc2l0aW9uKCkge1xuICAgIC8vIGFkZCB0cmFuc2l0aW9uIGZvciBpbnRybyBhbmltYXRpb25cbiAgICAkKFwiLmdhbGxlcnktaXRlbVwiKS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiNjAwbXNcIik7XG4gIH1cblxuICBsb2FkSW1hZ2VzSW4oKSB7XG4gICAgdGhpcy4kZ3JpZC5pc290b3BlKFwib25jZVwiLCBcImFycmFuZ2VDb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIGZhZGUgaW5cbiAgICAgICQoXCIuZ2FsbGVyeS1pdGVtXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyByZW1vdmUgYW5pbWF0aW9uIGZvciBzbW9vdGggZmlsdGVyaW5nXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcIi5nYWxsZXJ5LWl0ZW1cIikuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIjBtc1wiKTtcbiAgICAgIH0sIDUwMCk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVJc29UaW1lT3V0KTtcblxuICAgIC8vIGdhbGxlcnkgaXNvdG9wZVxuICAgIGlmICggJChcIi5nYWxsZXJ5LWNvbnRhaW5lclwiKS5sZW5ndGggPiAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5SXNvdG9wZVdyYXBwZXIoKTtcblxuICAgICAgLy8gb24gcmVzaXplIGNvbXBsZXRlLCByZWFkanVzdCBncmlkXG4gICAgICB0aGlzLnJlSXNvVGltZU91dCA9IHNldFRpbWVvdXQodGhpcy5yZWxvYWRJc290b3AuYmluZCh0aGlzKSwgNTAwKTtcbiAgICB9XG4gIH1cblxuICBvbkZpbHRlckNsaWNrKCBlbCwgZWwyICkge1xuICAgIGxldCAkdGhpcyA9ICQoZWwyLnRvRWxlbWVudCk7XG5cbiAgICAkdGhpcy5wYXJlbnQoKS5jaGlsZHJlbihcImxpXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgIH0pO1xuXG4gICAgJHRoaXMuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgIGxldCBmaWx0ZXJWYWx1ZSA9ICR0aGlzLmF0dHIoXCJkYXRhLWZpbHRlclwiKTtcblxuICAgIHRoaXMucmVGaWx0ZXIoZmlsdGVyVmFsdWUpO1xuICB9XG5cbiAgcmVGaWx0ZXIoIGl0ZW0gKSB7XG4gICAgdGhpcy4kZ3JpZC5pc290b3BlKHtcbiAgICAgIGZpbHRlcjogaXRlbVxuICAgIH0pO1xuICB9XG5cbiAgLy8gR2V0IGdyaWQgdG8gYXNzaWduIGR5bmFtaWNhbGx5XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIklzb3RvcGUgSW5pdFwiKTtcblxuICAgIC8vIEFkZCB0cmFuc2l0aW9uIHRvIGFuaW1hdGUgaW1hZ2UgaW4gZ3JhY2VmdWxseVxuICAgIHRoaXMuYWRkSW1hZ2VUcmFuc2l0aW9uKCk7XG5cbiAgICAvLyBTZXR1cCBJc290b3BlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgIHRoaXMuc2V0dXBJc290b3BlKCk7XG5cbiAgICAvLyBDcmVhdGUgcGVyZmVjdCBncmlkXG4gICAgdGhpcy5nYWxsZXJ5SXNvdG9wZVdyYXBwZXIoKTtcblxuICAgIC8vIGRlbGF5IGlzb3RvcGUgaW5pdCB1c2luZyBoZWxwZXIgZnVuY3Rpb24gdGhhdCBmaXJlcyBvbiByZXNpemVcbiAgICBzZXRUaW1lb3V0KHRoaXMucmVsb2FkSXNvdG9wLmJpbmQodGhpcyksIDEwMDApO1xuXG4gICAgLy8gQW5pbWF0ZSBJbWFnZXMgaW4gb25Mb2FkXG4gICAgdGhpcy5sb2FkSW1hZ2VzSW4oKTtcblxuICAgIC8vIEFkZCBmaWx0ZXIgb24gQ2xpY2tcbiAgICBsZXQgJHRoaXMgPSB0aGlzO1xuICAgICQoXCIuZmlsdGVyLWdyb3VwXCIpLm9uKFwiY2xpY2tcIiwgXCJsaVwiLCB0aGlzLm9uRmlsdGVyQ2xpY2suYmluZCh0aGlzLCAkdGhpcykpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxufVxuXG5sZXQgSXNvdG9wZUdhbGxlcnkgPSBuZXcgR2FsbGVyeUNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBJc290b3BlR2FsbGVyeTsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIFNsaWRlckNvbXBvbmVudCB7XG4gIGdhbGxlcnk6IEpRdWVyeTtcbiAgY29udGFpbmVyOiBKUXVlcnk7XG4gIGNsb3NlQnRuOiBKUXVlcnk7XG4gIG5leHRCdG46IEpRdWVyeTtcbiAgcHJldkJ0bjogSlF1ZXJ5O1xuICBpbmRleDogbnVtYmVyO1xuICBjdXJyZW50U2xpZGU6IG51bWJlcjtcbiAgdG90YWxTbGlkZTogbnVtYmVyO1xuICBjb3VudFRvdGFsOiBKUXVlcnk7XG4gIGN1cnJlbnRDb3VudDogSlF1ZXJ5O1xuICBzbGlkZXJPcGVuOiBib29sZWFuO1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCBlbCApIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9ICQoZWwpO1xuICAgIHRoaXMuZ2FsbGVyeSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuaGVhZGVyLXNsaWRlci1nYWxsZXJ5XCIpO1xuICAgIHRoaXMuY2xvc2VCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmhlYWRlci1zbGlkZXItY2xvc2VcIik7XG4gICAgdGhpcy5uZXh0QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zbGlkZXItbmF2aWdhdGlvbi1uZXh0XCIpO1xuICAgIHRoaXMucHJldkJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyLW5hdmlnYXRpb24tcHJldlwiKTtcbiAgICB0aGlzLmNvdW50VG90YWwgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnRvdGFsXCIpO1xuICAgIHRoaXMuY3VycmVudENvdW50ID0gdGhpcy5jb250YWluZXIuZmluZChcIi5jdXJyZW50XCIpO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMuY3VycmVudFNsaWRlID0gdGhpcy5pbmRleCArIDE7XG4gICAgdGhpcy5zbGlkZXJPcGVuID0gZmFsc2U7XG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeS5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0VG90YWxTbGlkZXMoKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSB0aGlzLmdhbGxlcnkuY2hpbGRyZW4oXCJsaVwiKS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U2xpZGU7XG4gIH1cblxuICB1cGRhdGVDdXJyZW50U2xpZGUoIGV2ZW50ICkge1xuXG4gICAgaWYgKCBldmVudCA9PT0gXCJyaWdodFwiICkge1xuICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGUrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRleC0tO1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGUtLTtcbiAgICB9XG5cbiAgfVxuXG4gIHNldE51bWJlciggY291bnQ6IG51bWJlciApOiBzdHJpbmcge1xuICAgIC8vIGNvbnZlciBudW1iZXIgdG8gc3RyaW5nXG4gICAgbGV0IHRvdGFsID0gY291bnQ7XG4gICAgcmV0dXJuIHRvdGFsLnRvU3RyaW5nKCk7XG4gIH1cblxuICB1cGRhdGVOYXYoIGluZGV4OiBudW1iZXIsIHNlbGVjdGVkOiBKUXVlcnkgKSB7XG5cbiAgICAvLyB1cGRhdGUgbnVtYmVycyBvbiBzY3JlZW5cbiAgICB0aGlzLmN1cnJlbnRDb3VudC5odG1sKHRoaXMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gICAgLy8gRW5hYmxlL0Rpc2FibGUgYXJyb3cgYnRuc1xuICAgIHRoaXMucHJldkJ0bi5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6Zmlyc3QtY2hpbGRcIikpO1xuICAgIHRoaXMubmV4dEJ0bi5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6bGFzdC1jaGlsZFwiKSk7XG4gIH1cblxuICB1cGRhdGVTbGlkZSggZGlyZWN0aW9uICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2xhc3MsIHRoZW4gbW92ZSBsZWZ0XG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBjdXJyZW50U2xpZGUubmV4dCgpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2xhc3MsIHRoZW4gbW92ZSBsZWZ0XG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIGN1cnJlbnRTbGlkZS5wcmV2KCkuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGluZGV4XG4gICAgdGhpcy51cGRhdGVDdXJyZW50U2xpZGUoZGlyZWN0aW9uKTtcblxuICAgIC8vIHVwZGF0ZSBOYXZpZ2F0aW9uXG4gICAgdGhpcy51cGRhdGVOYXYodGhpcy5pbmRleCwgdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuICB9XG5cbiAgYXJyb3dIYW5kbGVyKCBldmVudCApIHtcblxuICAgIC8vIGNoZWNrIHdoaWNoIGtleSB3YXMgcHJlc3NlZCBhbmQgbWFrZSBzdXJlIHRoZSBzbGlkZSBpc24ndCB0aGUgYmVnaW5uaW5nIG9yIHRoZSBsYXN0IG9uZVxuICAgIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInJpZ2h0XCIgJiYgdGhpcy5jdXJyZW50U2xpZGUgIT09IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcblxuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgJiYgdGhpcy5zbGlkZXJPcGVuICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDw9IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJsZWZ0XCIgJiYgdGhpcy5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuc2xpZGVyT3BlbiApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDw9IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBvcGVuU2xpZGVyKCBlbCwgZXZlbnQgKSB7XG4gICAgLy8gZWwgPSB0aGlzXG4gICAgLy8gZWwyIGlzIGV2ZW50XG4gICAgaWYgKCAhdGhpcy5jb250YWluZXIuaGFzQ2xhc3MoXCJpcy1hY3RpdmVcIikgJiYgJChldmVudC5jdXJyZW50VGFyZ2V0KS5pcyh0aGlzLmdhbGxlcnkpICkge1xuXG4gICAgICB0aGlzLnNsaWRlck9wZW4gPSB0cnVlO1xuXG4gICAgICB0aGlzLmNvbnRhaW5lci5hZGRDbGFzcyhcImlzLWFjdGl2ZVwiKS5vbmUoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIsICgpID0+IHtcbiAgICAgICAgJChcImJvZHksaHRtbFwiKS5hbmltYXRlKHsgXCJzY3JvbGxUb3BcIjogdGhpcy5jb250YWluZXIub2Zmc2V0KCkudG9wIH0sIDIwMCk7XG5cbiAgICAgICAgLy8gQ2xvc2UgQnRuIGFuaW1hdGUgaW5cbiAgICAgICAgbGV0IGNsb3NlQnRuQW5pbWF0aW9uID0gVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgeDogLTMwLFxuICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXQsXG4gICAgICAgICAgZGVsYXk6IC4zXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVNsaWRlciggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2xhc3MoXCJpcy1hY3RpdmVcIik7XG5cbiAgICB0aGlzLnNsaWRlck9wZW4gPSBmYWxzZTtcblxuICAgIFR3ZWVuTGl0ZVxuICAgICAgLnRvKCQod2luZG93KSwgLjUsXG4gICAgICAgIHtcbiAgICAgICAgICBzY3JvbGxUbzogeyB5OiAwIH0sIGVhc2U6IFBvd2VyMi5lYXNlT3V0LFxuICAgICAgICAgIGRlbGF5OiAuNVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgbGV0IGNsb3NlQnRuQW5pbWF0aW9uID0gVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB6OiAuMDAxLFxuICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgICAgICByaWdodDogNTBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5Lm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2xpZGVyLmJpbmQodGhpcywgJHRoaXMpKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdhbGxlcnkub2ZmKCk7XG4gICAgICAgIHRoaXMuY2xvc2VCdG4ub2ZmKCk7XG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgLy8gQ3JlYXRlIEJpbmRpbmcgRXZlbnRzXG4gICAgdGhpcy5jaGVja1NpemUoKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIExlZnQgYW5kIHJpZ2h0IGV2ZW50c1xuICAgIHRoaXMubmV4dEJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJyaWdodFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMucHJldkJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJsZWZ0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBKcXVlcnkga2V5cyBwbHVnaW5cbiAgICAkKGRvY3VtZW50KVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwibGVmdFwiLCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwiZXNjXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSlcbiAgICAgIC5iaW5kKFwia2V5ZG93blwiLCBcInJpZ2h0XCIsIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgLy8gdXBkYXRlIG5hdiBvbiBmaXJzdCBsb2FkXG4gICAgdGhpcy51cGRhdGVOYXYodGhpcy5pbmRleCwgdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbCh0aGlzLnNldE51bWJlcih0aGlzLmdldFRvdGFsU2xpZGVzKCkpKTtcbiAgfVxufVxuXG4vLyBsb29wIHRocm91Z2ggZWFjaCBoZWFkZXIgc2xpZGVyIG9iamVjdCBvbiB0aGUgcGFnZVxuY2xhc3MgSGVhZGVyU2xpZGVyQ29tcG9uZW50IHtcblxuICBpdGVtSW5mb1dyYXBwZXI6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlciA9ICQoXCIuaGVhZGVyLXNsaWRlci1jb250YWluZXJcIik7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiSGVhZGVyIFNsaWRlciBpbml0XCIpO1xuXG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgLy8gUGFzcyBcInRoaXNcIiB0byBlYWNoIG5ldyBIZWFkZXIgc2xpZGVyIGNvbXBvbmVudFxuICAgICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXJDb21wb25lbnQoZWwpO1xuICAgICAgc2xpZGVyLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmxldCBIZWFkZXJTbGlkZXIgPSBuZXcgSGVhZGVyU2xpZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlclNsaWRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cblxuY2xhc3MgU3ZnSGVhZGVyQ29tcG9uZW50IHtcbiAgc3ZnOiBKUXVlcnk7XG4gIGhlaWdodDogbnVtYmVyO1xuICB3aW5kb3c6IEpRdWVyeTtcbiAgd2luV2lkdGg6IG51bWJlcjtcbiAgcHJvcG9ydGlvbjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3ZnID0gJChcIi5kaXZpZGVyLXN2Z1wiKTtcbiAgICB0aGlzLndpbmRvdyA9ICQod2luZG93KTtcbiAgICB0aGlzLnByb3BvcnRpb24gPSAxODtcbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2luV2lkdGggLyB0aGlzLnByb3BvcnRpb247XG4gIH1cblxuICBfc2V0V2luZG93V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCk7XG4gIH1cblxuICBfc2V0U3ZnSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IGhlaWdodCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCkgLyAxODtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICByZXNpemVTdmcoKSB7XG5cbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NldFN2Z0hlaWdodCgpO1xuXG4gICAgLy8gc2V0IHdpZHRoIG9mIGl0ZW1cbiAgICAvLyB0aGlzLnN2Zy5hdHRyKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG4gICAgdGhpcy5zdmcuY3NzKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG5cbiAgICAvLyBzZXQgaGVpZ2h0IHByb3BvcnRpb24gb2YgMjhcbiAgICB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN2Zy5oZWlnaHQodGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgYW5pbWF0ZUluKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQW5pbWF0ZSBJblwiKTtcblxuICAgIHRoaXMuc3ZnID0gJChcIi5kaXZpZGVyLXN2Z1wiKTtcbiAgICB0aGlzLnByb3BvcnRpb24gPSAxODtcbiAgICB0aGlzLndpbmRvdyA9ICQod2luZG93KTtcbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy53aW5kb3cud2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2luV2lkdGggLyB0aGlzLnByb3BvcnRpb247XG5cbiAgICAvLyBzZXQgd2lkdGggb2YgaXRlbVxuICAgIHRoaXMuc3ZnLmF0dHIoXCJ3aWR0aFwiLCB0aGlzLndpbldpZHRoKTtcblxuICAgIC8vIHNldCBoZWlnaHQgcHJvcG9ydGlvbiBvZiAyOFxuICAgIHRoaXMuc3ZnLmF0dHIoXCJoZWlnaHRcIiwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuc3ZnLmhlaWdodCh0aGlzLmhlaWdodCk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy5zdmcsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIGJvdHRvbTogXCItM3B4XCIsXG4gICAgfSk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiU3ZnIGhlYWRlciBsb2FkZWRcIik7XG5cbiAgICAvLyB0aGlzLnN2Zy5oZWlnaHQodGhpcy5fc2V0U3ZnSGVpZ2h0KCkpO1xuICAgIC8vIHRoaXMuc3ZnLmF0dHIoXCJoZWlnaHRcIiwgdGhpcy5fc2V0U3ZnSGVpZ2h0KCkpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuc3ZnLCAuMSwge1xuICAgICAgeTogXCIzXCIsXG4gICAgICB6OiBcIi4wMDFcIixcbiAgICAgIHdpZHRoOiB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLl9zZXRTdmdIZWlnaHQoKSxcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIlxuICAgIH0pO1xuXG5cblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZVN2Zy5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBTdmdIZWFkZXIgPSBuZXcgU3ZnSGVhZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN2Z0hlYWRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuLy8gVE9ETzogU2lkZWJhciBpbWFnZSBsb2FkaW5nXG5jbGFzcyBJbWFnZUxvYWRlckNvbXBvbmVudCB7XG4gIGFycjogc3RyaW5nW107XG4gIGJvZHk6IEpRdWVyeTtcbiAgY29udGVudDogSlF1ZXJ5O1xuICBoZXJvOiBKUXVlcnk7XG4gIGhhc0hlcm86IG51bWJlcjtcbiAgYmdJbWFnZTogSlF1ZXJ5O1xuICBoYXNCZ0ltYWdlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hcnIgPSBbXTtcbiAgICB0aGlzLmJvZHkgPSAkKFwiYm9keVwiKTtcbiAgICB0aGlzLmNvbnRlbnQgPSAkKFwiI2NvbnRlbnRcIik7XG4gICAgdGhpcy5oZXJvID0gJChcIi5oZXJvXCIpO1xuICAgIHRoaXMuaGFzSGVybyA9IHRoaXMuaGVyby5sZW5ndGg7XG4gICAgdGhpcy5iZ0ltYWdlID0gJChcIi5pbWctbG9hZGVyLWJnXCIpO1xuICAgIHRoaXMuaGFzQmdJbWFnZSA9IHRoaXMuYmdJbWFnZS5sZW5ndGg7XG4gIH1cblxuICBhbmltYXRlQmxvZ1ByaW1hcnkoKTogdm9pZCB7XG4gICAgbGV0IGJsb2dQcmltYXJ5ID0gJChcIi5wcmltYXJ5XCIpO1xuICAgIGxldCBibG9nQmdJbWFnZSA9IGJsb2dQcmltYXJ5LmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIik7XG5cbiAgICBpZiAoIGJsb2dCZ0ltYWdlICE9PSBcIm5vbmVcIiApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIFR3ZWVuTGl0ZVxuICAgICAgICAgIC50byhibG9nUHJpbWFyeSwgLjMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9LCAzMDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZVxuICAvLyBhbmltYXRlSGVyb0hlYWRlcigpOiB2b2lkIHtcbiAgLy8gICBsZXQgYiA9IHRoaXMuaGVyby5maW5kKFwiLmhlcm8tYmFja2dyb3VuZFwiKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuICAvL1xuICAvLyAgIGlmICggYiAhPT0gXCJub25lXCIgKSB7XG4gIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgLy9cbiAgLy8gICAgICAgdGhpcy5oZXJvLmFkZENsYXNzKFwibG9hZGVkXCIpO1xuICAvL1xuICAvLyAgICAgICBUd2VlbkxpdGVcbiAgLy8gICAgICAgICAudG8odGhpcy5oZXJvLCAuNCxcbiAgLy8gICAgICAgICAgIHtcbiAgLy8gICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICApO1xuICAvLyAgICAgfSwgMzAwKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvL1xuICAvLyAgICAgdGhpcy5oZXJvLmFkZENsYXNzKFwibG9hZGVkXCIpO1xuICAvL1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGFuaW1hdGVCbG9nQXJ0aWNsZXMoKTogdm9pZCB7XG4gICAgbGV0IGFuaW1hdGUgPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgYW5pbWF0ZS50byh0aGlzLmFyclsgaSBdLCAwLjEsIHsgb3BhY2l0eTogXCIxXCIsIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCIgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJlbG9hZEltYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmFyciA9IFtdO1xuXG4gICAgdGhpcy5jb250ZW50LmltYWdlc0xvYWRlZCh7IGJhY2tncm91bmQ6IHRydWUgfSwgKCkgPT4ge1xuXG4gICAgICAgIC8vIEJsb2cgcHJpbWFyeSBhcnRpY2xlXG4gICAgICAgIHRoaXMuYm9keS5oYXNDbGFzcyhcImJsb2dcIikgPyB0aGlzLmFuaW1hdGVCbG9nUHJpbWFyeSgpIDogXCJcIjtcblxuICAgICAgICAvLyBIZXJvIGhlYWRlciBpbnRyb1xuICAgICAgICAvLyB0aGlzLmhhc0hlcm8gPiAwID8gdGhpcy5hbmltYXRlSGVyb0hlYWRlcigpIDogXCJcIjtcbiAgICAgICAgdGhpcy5oYXNCZ0ltYWdlID4gMCA/IHRoaXMuYmdJbWFnZS5hZGRDbGFzcyhcImxvYWRlZFwiKSA6IFwiXCI7XG5cbiAgICAgIH0pXG4gICAgICAuYWx3YXlzKGZ1bmN0aW9uICggaW5zdGFuY2UgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBsb2FkZWRcIik7XG4gICAgICB9KVxuICAgICAgLmRvbmUoKCBpbnN0YW5jZSApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIHN1Y2Nlc3NmdWxseSBsb2FkZWRcIik7XG5cbiAgICAgICAgLy8gQW5pbWF0aW9uIGZvciBCbG9nIGluZGV4IGhvbWVwYWdlXG4gICAgICAgIHRoaXMuYW5pbWF0ZUJsb2dBcnRpY2xlcygpO1xuICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKFwiaW1nTG9hZGVkXCIpO1xuICAgICAgICBcbiAgICAgICAgLy8gRXhhbXBsZSBvbiBob3cgdG8gdHJpZ2dlciBldmVudHMgZWxzZXdoZXJlXG4gICAgICAgIC8vICQoZG9jdW1lbnQpLm9uKFwiaW1nTG9hZGVkXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgIH0pXG4gICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBsb2FkZWQsIGF0IGxlYXN0IG9uZSBpcyBicm9rZW5cIik7XG4gICAgICB9KVxuICAgICAgLnByb2dyZXNzKCggaW5zdGFuY2UsIGltYWdlICkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gaW1hZ2UuaXNMb2FkZWQgPyBcImxvYWRlZFwiIDogXCJicm9rZW5cIjtcblxuICAgICAgICBpZiAoIHJlc3VsdCApIHtcbiAgICAgICAgICB0aGlzLmFyci5wdXNoKGltYWdlLmltZyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJpbWFnZSBpcyBcIiArIHJlc3VsdCArIFwiIGZvciBcIiArIGltYWdlLmltZy5zcmMpO1xuICAgICAgfSk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuXG4gICAgY29uc29sZS5sb2coXCJJbWFnZSBQcmVsb2FkZXIgTW9kdWxlXCIpO1xuXG4gICAgdGhpcy5wcmVsb2FkSW1hZ2VzKCk7XG4gIH1cbn1cblxubGV0IEltYWdlTG9hZGVyID0gbmV3IEltYWdlTG9hZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlTG9hZGVyOyIsImRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG5jb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5jbGFzcyBBbmltYXRpb25Db21wb25lbnQge1xuXG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICBpdGVtOiBKUXVlcnk7XG4gIG1TY2VuZTogSlF1ZXJ5O1xuICBzZXJ2aWNlU2lkZUJhcjogSlF1ZXJ5O1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKFwiLnByb2Nlc3MtY29udGFpbmVyXCIpO1xuICAgIHRoaXMuaXRlbSA9ICQoXCIucHJvY2Vzcy1pdGVtLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLm1TY2VuZSA9ICQoXCIubS1zY2VuZVwiKTtcbiAgICB0aGlzLnNlcnZpY2VTaWRlQmFyID0gJChcIi5zZXJ2aWNlLXNpZGViYXItd3JhcHBlclwiKTtcbiAgfVxuXG4gIGRlc2Nfb19hbmltYXRlKCkge1xuICAgIGlmICggJChcIi5kZXNjLW8tYW5pbWF0ZVwiKS5sZW5ndGggPiAwICkge1xuICAgICAgbGV0IHdpcGVBbmltYXRpb24gPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIHdpcGVBbmltYXRpb24uYWRkKFtcbiAgICAgICAgVHdlZW5NYXguZnJvbVRvKCQoXCIuZGVzYy1vLWltYWdlLTFcIiksIDEsIHsgeVBlcmNlbnQ6IDAgfSwgeyB5UGVyY2VudDogLTIwLCBlYXNlOiBQb3dlcjAuZWFzZUluT3V0IH0pXG4gICAgICBdKTtcblxuICAgICAgbGV0IHdpcGVBbmltYXRpb24yID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICB3aXBlQW5pbWF0aW9uMi5hZGQoW1xuICAgICAgICBUd2Vlbk1heC5mcm9tVG8oJChcIi5kZXNjLW8taW1hZ2UtMlwiKSwgMSwgeyB5UGVyY2VudDogMCwgfSwgeyB5UGVyY2VudDogLTEwNSwgZWFzZTogUG93ZXIwLmVhc2VJbk91dCB9KVxuICAgICAgXSk7XG5cbiAgICAgIGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuICAgICAgbGV0IHNjZW5lID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKFxuICAgICAgICB7XG4gICAgICAgICAgdHJpZ2dlckVsZW1lbnQ6IFwiLmRlc2Mtby1hbmltYXRlXCIsXG4gICAgICAgICAgZHVyYXRpb246ICQoXCIuZGVzYy1vLWFuaW1hdGVcIikuaGVpZ2h0KCksXG4gICAgICAgICAgb2Zmc2V0OiAtMTAwXG4gICAgICAgIH0pXG4gICAgICAvLyAuc2V0UGluKFwiLmRlc2Mtby1pbWFnZS0xXCIpXG4gICAgICAgIC5zZXRUd2Vlbih3aXBlQW5pbWF0aW9uKVxuICAgICAgICAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMSAoZHVyYXRpb246IEVsKVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAgIC5hZGRUbyhjb250cm9sbGVyKTtcblxuICAgICAgbGV0IHNjZW5lMiA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgICAge1xuICAgICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5kZXNjLW8tYW5pbWF0ZVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAkKFwiLmRlc2Mtby1hbmltYXRlXCIpLmhlaWdodCgpICsgMTAwLFxuICAgICAgICB9KVxuICAgICAgLy8gLnNldFBpbihcIi5kZXNjLW8taW1hZ2UtMVwiKVxuICAgICAgICAuc2V0VHdlZW4od2lwZUFuaW1hdGlvbjIpXG4gICAgICAgIC5hZGRJbmRpY2F0b3JzKHsgbmFtZTogXCIyIChkdXJhdGlvbjogRWwpXCIgfSkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcbiAgICAgICAgLmFkZFRvKGNvbnRyb2xsZXIpO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NBbmltYXRlSW4oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgIGxldCBpdGVtID0gdGhpcy5pdGVtO1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcbiAgICBsZXQgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICB7XG4gICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5wcm9jZXNzLWNvbnRhaW5lclwiLFxuICAgICAgICBkdXJhdGlvbjogY29udGFpbmVyLmhlaWdodCgpLFxuICAgICAgICAvLyBvZmZzZXQ6IHRoaXMuYXNpZGVPZmZzZXQsXG4gICAgICB9KVxuICAgICAgLm9uKFwiZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdGVtLmZpbmQoXCIucHJvY2Vzcy1pdGVtLWlubmVyXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICAgIGNvbnRhaW5lci5maW5kKFwiaW1nXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICB9KVxuICAgICAgLy8gLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBvZmZzZXQ/KVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAuYWRkVG8oY29udHJvbGxlcik7XG4gIH1cblxuICBhbmltYXRlV2luZG93VG9wKCkge1xuICAgIGNvbnNvbGUubG9nKFwiYW5pbWF0ZSBUb3BcIik7XG4gICAgVHdlZW5MaXRlXG4gICAgICAudG8oJCh3aW5kb3cpLCAuMyxcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvOiB7XG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgYW5pbWF0ZVNlcnZpY2VTaWRlYmFyT3V0KCkge1xuICAgIFR3ZWVuTGl0ZS50byh0aGlzLnNlcnZpY2VTaWRlQmFyLCAuMywge1xuICAgICAgeDogXCItMTAwXCIsXG4gICAgICB6OiBcIi4wMDFcIixcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCIsXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIC8vIHJlbW92ZSBzaWRlYmFyIGh0bWwgZWxlbWVudCBzbyBpdCBkb2VzbnQgc2hvdyB1cCBhZ2FpbiB3aGVuIHNjcm9sbGluZyB1cFxuICAgICAgICB0aGlzLnNlcnZpY2VTaWRlQmFyLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbG9hZFVybCggdXJsICkge1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gIH1cblxuICBtYWluQ29udGVudEFuaW1hdGlvbk91dCggY2FsbGJhY2sgKSB7XG5cbiAgICAvLyBMb2FkIGluIGFuaW1hdGlvbnMgaGVyZVxuICAgIHRoaXMuYW5pbWF0ZVNlcnZpY2VTaWRlYmFyT3V0KCk7XG5cblxuICAgIHRoaXMubVNjZW5lLmFkZENsYXNzKFwiaXMtZXhpdGluZ1wiKVxuICAgICAgLy8gSWYgaGFzIHdlYmtpdEFuaW1hdGlvbkVuZCAtIGl0IGdldHMgY2FsbGVkIHR3aWNlXG4gICAgICAub25lKFwib2FuaW1hdGlvbmVuZCBtc0FuaW1hdGlvbkVuZCBhbmltYXRpb25lbmRcIiwgKCkgPT4ge1xuXG4gICAgICAgIC8vIExvYWQgaW4gYW5pbWF0aW9ucyBoZXJlIHRoYXQgbmVlZCB0byBvY2N1ciBhZnRlciBtYWluIG9uZXNcbiAgICAgICAgdGhpcy5hbmltYXRlV2luZG93VG9wKCk7XG5cbiAgICAgIH0pO1xuXG4gICAgaWYgKCB0eXBlb2YoY2FsbGJhY2spID09PSBcImZ1bmN0aW9uXCIgKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9XG5cbiAgY2hlY2tVcmwoIHVybCApOiBib29sZWFuIHtcbiAgICBpZiAoIHVybCA9PT0gXCIjXCIgfHwgdXJsID09PSBcIlwiICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnbG9iYWxDbGlja0NoZWNrKCBldmVudD8gKSB7XG5cbiAgICAvLyBHZXQgdXJsIGZyb20gdGhlIGEgdGFnXG4gICAgbGV0IG5ld1VybCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcImhyZWZcIik7XG4gICAgbGV0IGhhc0NoaWxkcmVuID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoXCJsaVwiKS5oYXNDbGFzcyhcIm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIik7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPiBVdGlscy5icHMudGFibGV0ICYmXG4gICAgICB0aGlzLmNoZWNrVXJsKG5ld1VybCkgJiZcbiAgICAgIFV0aWxzLmJyb3dzZXIgPT09IFwiaXBhZFwiICYmIGhhc0NoaWxkcmVuICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdUYWJsZXQgTmF2IGNsaWNrJyk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA+IFV0aWxzLmJwcy50YWJsZXQgJiYgdGhpcy5jaGVja1VybChuZXdVcmwpICkge1xuICAgICAgLy8gbGFwdG9wIG9yIGxhcmdlIG5vIGlwYWRcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibGFwdG9wIG9yIGxhcmdlclwiKTtcbiAgICAgIHRoaXMubWFpbkNvbnRlbnRBbmltYXRpb25PdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoIHRoaXMuY2hlY2tVcmwobmV3VXJsKSAmJiBoYXNDaGlsZHJlbiApIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW9iaWxlIG1lbnUgaXMgYWN0aXZlIGFuZCBwYXJlbnQgY2xpY2tlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2FkVXJsKG5ld1VybCk7XG4gICAgfVxuXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMucHJvY2Vzc0FuaW1hdGVJbigpO1xuICAgIHRoaXMuZGVzY19vX2FuaW1hdGUoKTtcblxuICAgIC8vIENsaWNrIGV2ZW50IHRvIGNvbnRyb2wgd2luZG93IExvYWRpbmdcbiAgICAkKFwiYVwiKS5vbihcImNsaWNrXCIsICggZSApID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmdsb2JhbENsaWNrQ2hlY2soZSk7XG4gICAgfSk7XG5cbiAgICAvLyBDdXN0b20gZXZlbnQgZXhhbXBsZVxuICAgIC8vICQoZG9jdW1lbnQpLm9uKFwidGVzdFwiLCB7fSwgKCBldmVudCwgYXJnMSwgYXJnMiApID0+IHtcbiAgICAvL1xuICAgIC8vICAgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCApIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhhcmcxKTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJnMik7XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyB9KS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBBbmltYXRpb25Db250cm9sbGVyID0gbmV3IEFuaW1hdGlvbkNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBBbmltYXRpb25Db250cm9sbGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTdGlja3lTaWRlYmFyQ29tcG9uZW50IHtcblxuICBpc0FuaW1hdGluZzogYm9vbGVhbjtcbiAgY29udGVudFdyYXBwZXI6IEpRdWVyeTtcbiAgY29udGVudE9mZnNldFRvcDogbnVtYmVyO1xuICBjb250ZW50V3JhcHBlckhlaWdodDogbnVtYmVyO1xuICBzY3JvbGxUb3A6IG51bWJlcjtcbiAgYXNpZGU6IEpRdWVyeTtcbiAgc2lkZWJhcldyYXBwZXI6IEpRdWVyeTtcbiAgd2luZG93SGVpZ2h0OiBudW1iZXI7XG4gIHNpZGViYXJIZWlnaHQ6IG51bWJlcjtcbiAgZm9vdGVySGVpZ2h0OiBudW1iZXI7XG4gIHNjcm9sbGluZ0Rvd246IGJvb2xlYW47XG4gIGxhc3RTY3JvbGxUb3A6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlciA9ICQoXCIuc2lkZWJhci1jb250ZW50XCIpO1xuICAgIHRoaXMuYXNpZGUgPSAkKFwiLnNlcnZpY2Utc2lkZWJhci13cmFwcGVyXCIpO1xuICAgIHRoaXMud2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFyV3JhcHBlciA9ICQoXCIuc2VydmljZS1zaWRlYmFyXCIpO1xuICB9XG5cbiAgY2hlY2tTaWRlYmFyKCk6IHZvaWQge1xuICAgIC8vIENoZWNrIGlmIHRoZSBzaWRlYmFyIGlzIGZpeGVkIG9yIG5vdFxuICAgIGlmICggIXRoaXMuaXNBbmltYXRpbmcgJiYgVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpID8gc2V0VGltZW91dCh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpLCAzMDApIDogd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNldFNpZGVCYXIoKTtcbiAgICB9XG4gIH1cblxuICByZXNldFNpZGVCYXIoKSB7XG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIik7XG4gICAgdGhpcy5hc2lkZS5hdHRyKFwic3R5bGVcIiwgXCJcIik7XG4gIH1cblxuICB1cGRhdGVTaWRlYmFyUG9zaXRpb24oKTogdm9pZCB7XG5cbiAgICB0aGlzLmNoZWNrU2Nyb2xsRGlyZWN0aW9uKCk7XG5cbiAgICAvLyBnZXQgZGlzdGFuY2UgZnJvbSB0b3Agb2YgY29udGVudCAxMCArIDQwID0gNTAgcGFkZGluZyB0b3BcbiAgICB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm9mZnNldCgpLnRvcCAtIDEwO1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCA9IHRoaXMuY29udGVudFdyYXBwZXIub3V0ZXJIZWlnaHQoKTsgLy8gaW5jbHVkZSBwYWRkaW5nIGFuZCBtYXJnaW5cblxuXG4gICAgLy8gZ2V0IHdoZXJlIHRvcCBvZiB3aW5kb3cgaXNcbiAgICB0aGlzLnNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnRlbnQgV3JhcHBlciBIZWlnaHRcIiwgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJDb250ZW50IE9mZnNldFwiLCB0aGlzLmNvbnRlbnRPZmZzZXRUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2lkZWJhciBIZWlnaHRcIiwgdGhpcy5zaWRlYmFySGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIldpbmRvdyBIZWlnaHRcIiwgdGhpcy53aW5kb3dIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwib2Zmc2V0IFRvcFwiLCB0aGlzLmNvbnRlbnRPZmZzZXRUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2Nyb2xsVG9wXCIsIHRoaXMuc2Nyb2xsVG9wKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNpZGViYXJvZmZzZXRcIiwgdGhpcy5zY3JvbGxUb3ApO1xuXG4gICAgLy8gSWYgdGhlIHdpbmRvdyBWIHBvc2l0aW9uIGlzIGxlc3MgdGhhbiB0aGUgY29udGVudCBWIHBvc2l0aW9uIG1ha2Ugc2lkZWJhciBub3JtYWxcbiAgICBpZiAoIHRoaXMuc2Nyb2xsVG9wIDwgdGhpcy5jb250ZW50T2Zmc2V0VG9wICkge1xuICAgICAgbGV0IGNzc1Byb3BzID0ge1xuICAgICAgICBcInRyYW5zaXRpb25cIjogXCJ0b3AgLjNzXCJcbiAgICAgIH07XG4gICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpO1xuICAgICAgdGhpcy5hc2lkZS5jc3MoY3NzUHJvcHMpO1xuXG4gICAgICAvLyBpZiB3aW5kb3cgViBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gY29udGVudCAtIGFkZCBzdGlja3lcbiAgICAgIC8vIDJuZCBjaGVja3MgdGhlIG9mZnNldCBvZiB0aGUgdG9wIG9mIHRoZSB3aW5kb3cgdG8gdGhlIHRvcCBvZiB0aGUgY29udGVudCAmJiB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRlbnQgaW4gcmVsYXRpb24gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSB3aW5kb3dcbiAgICB9IGVsc2UgaWYgKCB0aGlzLnNjcm9sbFRvcCA+PSB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgJiYgdGhpcy5zY3JvbGxUb3AgPCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgdGhpcy5jb250ZW50T2Zmc2V0VG9wIC0gNDAgKSB7XG4gICAgICB0aGlzLmFzaWRlLmFkZENsYXNzKFwic3RpY2t5XCIpLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcblxuICAgICAgaWYgKCB0aGlzLnNjcm9sbGluZ0Rvd24gPT09IHRydWUgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcInRvcCAuM3NcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFzaWRlLmNzcyhcInRyYW5zaXRpb25cIiwgXCJcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbGV0IGFydGljbGVQYWRkaW5nVG9wID0gTnVtYmVyKGFydGljbGVzLmVxKDEpLmNzcyhcInBhZGRpbmctdG9wXCIpLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XG4gICAgICBpZiAoIHRoaXMuYXNpZGUuaGFzQ2xhc3MoXCJzdGlja3lcIikgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuICAgICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpLmNzcyhcInRvcFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgXCJweFwiKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcblxuICB9XG5cbiAgY2hlY2tTY3JvbGxEaXJlY3Rpb24oKSB7XG4gICAgLy8gTG9nIGN1cnJlbnQgc2Nyb2xsUG9pbnRcbiAgICBsZXQgc3QgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy8gY29tcGFyZSB0byBsYXN0IHNjcm9sbFBvaW50XG4gICAgaWYgKCBzdCA+IHRoaXMubGFzdFNjcm9sbFRvcCApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2Nyb2xsIGRvd25cIik7XG4gICAgICAvLyBkb3duc2Nyb2xsIGNvZGVcbiAgICAgIHRoaXMuc2Nyb2xsaW5nRG93biA9IHRydWU7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJzY3JvbGwgdXBcIik7XG4gICAgICAvLyB1cHNjcm9sbCBjb2RlXG4gICAgICB0aGlzLnNjcm9sbGluZ0Rvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBvbiBjb21wbGV0ZSAtIG1ha2UgbGFzdCBTY3JvbGwgcG9pbnQgdGhlIHBvaW50IGF0IHdoaWNoIHRoZXkgc3RhcnRlZCBzY3JvbGxpbmcgYXQgZmlyc3RcbiAgICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgfVxuXG4gIGFuaW1hdGVTaWRlYmFySW4oKSB7XG5cbiAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwiaW50cm9cIik7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgbGV0IHNpZGViYXJJbnRybyA9IFR3ZWVuTWF4LnRvKHRoaXMuYXNpZGUsIC4zLCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHo6IC4wMDEsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXQsXG4gICAgICAgIGRlbGF5OiAuOSxcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIC8vIG1ha2Ugc2lkZWJhciBwZXJtYW5lbnRseSB2aXNpYmxlXG4gICAgICAgICAgdGhpcy5hc2lkZS5hZGRDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0aWNreSBzaWRlYmFyIGxvYWRlZFwiKTtcblxuICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgaWYgKCB0aGlzLmFzaWRlLmxlbmd0aCA+IDAgKSB7XG4gICAgICB0aGlzLmNoZWNrU2lkZWJhcigpO1xuXG4gICAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgdGhpcy5jaGVja1NpZGViYXIuYmluZCh0aGlzKSk7XG4gICAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5jaGVja1NpZGViYXIuYmluZCh0aGlzKSk7XG5cbiAgICAgIC8vIEFuaW1hdGUgc2lkZSBiYXIgaW4gb24gbG9hZFxuICAgICAgdGhpcy5hbmltYXRlU2lkZWJhckluKCk7XG4gICAgfVxuICB9XG59XG5cbmxldCBTdGlja3lTaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3RpY2t5U2lkZWJhcjsiLCJpbXBvcnQge0Jwc0ludGVyZmFjZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYnBzLmludGVyZmFjZVwiO1xuY29uc3QgJCA9IGpRdWVyeTtcblxuLy8gQWRkIGludGVyZmFjZSBKUXVlcnlTbW9vdGgge1xuLy8gc21vb3RoU3RhdGUoKTp2b2lkO1xuLy8gfVxuLy8gc21vb3RoU3RhdGUoYXJnOiBPYmplY3QpOiBKUXVlcnk7XG5cbmNsYXNzIFV0aWxpdHlDb21wb25lbnQge1xuICB3aW5kb3dXaWR0aDogbnVtYmVyO1xuICBicmVha3BvaW50OiBudW1iZXI7XG4gIGJyZWFrcG9pbnRzOiBudW1iZXJbXTtcbiAgYnBzOiBCcHNJbnRlcmZhY2U7XG4gIGJyb3dzZXI6IHN0cmluZztcblxuICBwcml2YXRlIF9zZXRCcmVha3BvaW50cyA9ICggYnBzOiBCcHNJbnRlcmZhY2UgKSA9PiB7XG4gICAgbGV0IGFyciA9IFtdO1xuXG4gICAgZm9yICggbGV0IGtleSBpbiBicHMgKSB7XG4gICAgICBpZiAoIGJwcy5oYXNPd25Qcm9wZXJ0eShrZXkpICkge1xuICAgICAgICBhcnIucHVzaChicHNbIGtleSBdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyLnJldmVyc2UoKTtcbiAgfTtcbiAgcHJpdmF0ZSBfY2hlY2tCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIG1ha2UgYnJlYWtwb2ludCBldmVudCBhdmFpbGFibGUgdG8gYWxsIGZpbGVzIHZpYSB0aGUgd2luZG93IG9iamVjdFxuICAgIGxldCBvbGRfYnJlYWtwb2ludCA9IHRoaXMuYnJlYWtwb2ludDtcblxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcblxuICAgIGlmICggb2xkX2JyZWFrcG9pbnQgIT09IHRoaXMuYnJlYWtwb2ludCApIHtcblxuICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoXCJicmVha3BvaW50Q2hhbmdlXCIsIFV0aWxzLmJyZWFrcG9pbnQpO1xuICAgIH1cbiAgfTtcbiAgcHJpdmF0ZSBfc2V0QnJlYWtwb2ludCA9ICgpID0+IHtcbiAgICAvLyBnZXQgYnJlYWtwb2ludCBmcm9tIGNzc1xuICAgIGxldCBib2R5ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KSxcbiAgICAgIHppbmRleCA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbIFwiei1pbmRleFwiIF07XG5cbiAgICB0aGlzLmJyZWFrcG9pbnQgPSBwYXJzZUludCh6aW5kZXgsIDEwKTtcbiAgfTtcbiAgcHJpdmF0ZSBfc2V0V2luZG93V2lkdGggPSAoKSA9PiB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICB9O1xuXG4gIHdoaWNoQnJvd3NlcigpIHtcbiAgICBpZiAoIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInNhZmFyaVwiKSA+IC0xKSAmJiAhKFxuICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJjaHJvbWVcIikgPiAtMSkgJiYgKG5hdmlnYXRvci5hcHBOYW1lID09PVxuICAgICAgXCJOZXRzY2FwZVwiKSApIHtcblxuICAgICAgaWYgKCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpICE9PSBudWxsICkge1xuICAgICAgICByZXR1cm4gXCJpcGFkXCI7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcInNhZmFyaVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMud2luZG93V2lkdGggPSAwO1xuICAgIHRoaXMuYnJlYWtwb2ludCA9IDMyMDtcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0gW107XG4gICAgdGhpcy5icHMgPSB7XG4gICAgICBtb2JpbGU6IDU0NCxcbiAgICAgIHRhYmxldDogNzY4LFxuICAgICAgbGFwdG9wOiA5OTIsXG4gICAgICBkZXNrdG9wOiAxMjAwLFxuICAgICAgZGVza3RvcF94bDogMTYwMFxuICAgIH07XG4gICAgdGhpcy5icm93c2VyID0gdGhpcy53aGljaEJyb3dzZXIoKTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJVdGlsaXRpZXMgbG9hZGVkXCIpO1xuXG4gICAgLy8gc2V0IGJyZWFrcG9pbnQgb24gd2luZG93IGxvYWRcbiAgICB0aGlzLl9zZXRCcmVha3BvaW50KCk7XG4gICAgdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcbiAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgQnJlYWtwb2ludCBpczpcIiwgdGhpcy5icmVha3BvaW50KTtcblxuICAgIC8vIGNyZWF0ZSBmdWxsIGFycmF5IGZvciBpbWFnZSBjb21wcmVzc2lvbiByZWZcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0gdGhpcy5fc2V0QnJlYWtwb2ludHModGhpcy5icHMpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuX2NoZWNrQnJlYWtwb2ludCkuYmluZCh0aGlzKTtcbiAgfVxufVxuXG5sZXQgVXRpbHMgPSBuZXcgVXRpbGl0eUNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsczsiXX0=
