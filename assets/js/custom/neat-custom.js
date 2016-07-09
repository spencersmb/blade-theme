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
var showcase_slider_1 = require("./partials/showcase-slider");
var testimonials_1 = require("./partials/testimonials");
var quote_builder_1 = require("./partials/quote-builder");
// import StickySidebar from "./partials/service-sidebar";
var $ = jQuery;
// declare var revapi1: any;
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
        showcase_slider_1.default.init();
    });
})();

},{"./navigation/components/search":2,"./navigation/navigation":3,"./partials/gallery-isotope":4,"./partials/header-slider":5,"./partials/header-svg":6,"./partials/imageLoader":7,"./partials/processAnimation":8,"./partials/quote-builder":9,"./partials/showcase-slider":10,"./partials/sticky-sidebar":11,"./partials/testimonials":12,"./partials/utils":13}],2:[function(require,module,exports){
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
    // Not used
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
    /*
     Mobile Nav functionality
     */
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
        /*
         Remove Styles from element & reset dropdown
         */
        this.$navDropdown.setAttribute("style", "");
        this.$dropDownContent.removeClass("move-out");
        var dropdown = this.$dropDownContent.find(".et-secondary-dropdown");
        dropdown.each(function (index, elem) {
            if (!$(elem).hasClass("is-hidden")) {
                $(elem).addClass("is-hidden");
            }
        });
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

},{"../partials/utils":13}],4:[function(require,module,exports){
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

},{"./utils":13}],6:[function(require,module,exports){
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
         * Check if its horizontal tablet
         */
        if (utils_1.default.breakpoint > utils_1.default.bps.tablet &&
            this.checkUrl(newUrl) &&
            utils_1.default.browser === "ipad" && hasChildren) {
            event.preventDefault();
            // console.log('Tablet Nav click');
            return;
        }
        else if (utils_1.default.breakpoint > utils_1.default.bps.tablet && this.checkUrl(newUrl)) {
            /*
             * Check if its larger than tablet but not an ipad
             */
            // console.log("laptop or larger");
            this.mainContentAnimationOut(function () {
                _this.loadUrl(newUrl);
            });
        }
        else if (this.checkUrl(newUrl) && hasChildren) {
        }
        else {
            /*
             * Passed the checks Load it!
             */
            this.loadUrl(newUrl);
        }
    };
    AnimationComponent.prototype.init = function () {
        var _this = this;
        this.processAnimateIn();
        this.desc_o_animate();
        // Click event to control window Loading
        $("a").on("click", function (e) {
            e.preventDefault();
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

},{"./utils":13}],9:[function(require,module,exports){
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
    }
    QuoteComponent.prototype.setWidth = function (label) {
        var labelWidth = label.outerWidth();
        this.switchBtn.css("width", labelWidth);
    };
    QuoteComponent.prototype.buildSelectBox = function () {
        var names = [];
        var fragment = $(document.createDocumentFragment());
        // get h2 titles from each quote item
        this.quoteItemsArray.each(function (index, el) {
            var $this = $(el), title = $this.find("h2").text(), name = title.toLocaleLowerCase(), uniqueId = name + "-" + index;
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
        fragment.append('<span class="quote__switch"></span>');
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
        if (inputId === $(this.inputs[1]).attr("id")) {
            this.switchBtn.css({
                "webkitTransform": "translateX(" + prevWidth + "px)",
                "MozTransform": "translateX(" + prevWidth + "px)",
                "msTransform": "translateX(" + prevWidth + "px)",
                "OTransform": "translateX(" + prevWidth + "px)",
                "transform": "translateX(" + prevWidth + "px)"
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
            $this.removeClass("selected");
            if (id === _this.state.selected) {
                $this.addClass("selected");
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
        var modifiedElement = selectedCard.clone();
        modifiedElement.find(".card__item--btn").remove();
        // modifiedElement.insertBefore(this.formBuilder.find(".go-back"));
        var cardWrapper = this.formBuilder.find(".quote__form--card-wrapper");
        cardWrapper.append(modifiedElement).append(button);
        // Back button inside wrapper
        var buttonDom = cardWrapper.find(".go-back");
        buttonDom.on("click", this.closeForm.bind(this));
    };
    QuoteComponent.prototype.closeForm = function (e) {
        var _this = this;
        e.preventDefault();
        this.state.isFormActive = false;
        // remove current card
        var card = this.formBuilder.find(".card__item");
        var backBtn = this.formBuilder.find(".quote__form--card-wrapper").find(".go-back");
        TweenMax.to(card, .2, {
            opacity: 0,
            y: 15,
            onComplete: function () {
                setTimeout(function () {
                    // set form to active
                    _this.formBuilder.removeClass("active");
                    // set body back to scrollable
                    $("body").css("overflow-y", "auto");
                }, 300);
            }
        });
        if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            this.formBuilder.find(".quote__form--vc").one('otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                // remove visibility once animation completes
                _this.formBuilder.css("visibility", "hidden");
                _this.quoteChooser.css("opacity", "1");
                // remove current card html
                card.remove();
                backBtn.remove();
            });
        }
        else {
            console.log("close");
            // remove visibility once animation completes
            this.formBuilder.css("visibility", "hidden");
            this.quoteChooser.css("opacity", "1");
            // remove current card html
            card.remove();
            backBtn.remove();
        }
        // fade out first display
        this.quoteChooser.addClass("active");
    };
    QuoteComponent.prototype.openForm = function (e) {
        e.preventDefault();
        var $this = $(e.currentTarget);
        var parentConatiner = $this.parent("div").parent("div");
        if (!parentConatiner.hasClass("selected")) {
            return;
        }
        this.state.isFormActive = true;
        // set content plan HTML in new form area
        this.setActivePlan();
        // fade out cards
        this.quoteChooser.css("opacity", "0");
        // set form to active
        this.formBuilder.addClass("active");
        // add visibility immediately
        this.formBuilder.css("visibility", "visible");
        // fade out first display
        this.quoteChooser.removeClass("active");
        if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            // scroll top of div on open for graceful UX
            $("body,html").animate({ "scrollTop": this.quoteContainer.offset().top - 35 }, 200);
        }
        var card = this.formBuilder.find(".quote__form--card");
        if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            card.one('otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                // Set body to not scroll
                $("body").css("overflow-y", "hidden");
                // fade card in once data is set & the card bg is finished animating
                TweenMax.to(card.find(".card__item"), .3, {
                    opacity: 1,
                    delay: .2
                });
                TweenMax.to(card.find(".card__item"), .2, {
                    y: 0,
                });
            });
        }
        else {
            // Set body to not scroll
            $("body").css("overflow-y", "hidden");
            // fade card in once data is set & the card bg is finished animating
            TweenMax.to(card.find(".card__item"), .3, {
                opacity: 1,
                delay: .2
            });
            TweenMax.to(card.find(".card__item"), .2, {
                y: 0,
            });
        }
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
    };
    return QuoteComponent;
}());
var QuoteBuilder = new QuoteComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuoteBuilder;

},{"./utils":13}],10:[function(require,module,exports){
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
            var itemIndex = utils_1.default.setNumber(index), imageThumbUrl = $(el).data("thumb"), imageElement = document.createElement("img"), linkElement = document.createElement("a"), element = document.createElement("li");
            // add src and attr to image
            imageElement.setAttribute("src", imageThumbUrl);
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

},{"./utils":13}],11:[function(require,module,exports){
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
        // this.contentOffsetTop = this.contentWrapper.offset().top - 10;
        this.contentOffsetTop = this.contentWrapper.offset().top;
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
            // let cssProps = {
            //   "transition": "top .3s"
            // };
            this.aside.removeClass("sticky");
        }
        else if (this.scrollTop >= this.contentOffsetTop && this.scrollTop < this.contentWrapperHeight - this.sidebarHeight + this.contentOffsetTop) {
            this.aside.addClass("sticky").attr("style", "");
            if (this.scrollingDown === true) {
            }
            else {
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

},{"./utils":13}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGUudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zdmcudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2ltYWdlTG9hZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9xdW90ZS1idWlsZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy90ZXN0aW1vbmlhbHMudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztHQUdHOztBQUVILHNCQUFrQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLDJCQUFnQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzFDLHVCQUFtQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3BELDJCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLG9EQUFvRDtBQUNwRCw0QkFBd0Isd0JBQXdCLENBQUMsQ0FBQTtBQUNqRCwrQkFBMEIsMkJBQTJCLENBQUMsQ0FBQTtBQUN0RCxpQ0FBZ0MsNkJBQTZCLENBQUMsQ0FBQTtBQUM5RCxnQ0FBMkIsNEJBQTRCLENBQUMsQ0FBQTtBQUN4RCw4QkFBeUIsMEJBQTBCLENBQUMsQ0FBQTtBQUNwRCxnQ0FBMkIsNEJBQTRCLENBQUMsQ0FBQTtBQUN4RCw2QkFBeUIseUJBQXlCLENBQUMsQ0FBQTtBQUNuRCw4QkFBeUIsMEJBQTBCLENBQUMsQ0FBQTtBQUNwRCwwREFBMEQ7QUFDMUQsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBRWpCLDRCQUE0QjtBQUU1QixDQUFDO0lBQ0M7UUFBQTtRQWNBLENBQUM7UUFaQyxrQkFBSSxHQUFKO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQixvQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLGVBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLG9CQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWCxnQkFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2Qsd0JBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixzQkFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLHVCQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsMEJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyx1Q0FBdUM7UUFFckUsQ0FBQztRQUNILFVBQUM7SUFBRCxDQWRBLEFBY0MsSUFBQTtJQUVELElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFFMUIsd0JBQXdCO0lBQ3hCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDaEIsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLHFCQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsd0JBQXdCO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsOENBQThDO0lBQzlDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVcsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDekMsNEJBQTRCO1FBQzVCLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLHlCQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNELHVCQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIseUJBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV4QixDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxFQUFFLENBQUM7Ozs7QUM3REwsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBR2pCO0lBYUU7UUFDRSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELGdDQUFNLEdBQU47UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUUvQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCx3Q0FBYyxHQUFkO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsRSxDQUFDO0lBRUQseUNBQWUsR0FBZjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFhLEtBQUs7UUFFaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLEVBQUU7WUFDekMsR0FBRyxFQUFFLElBQUk7WUFDVCxPQUFPLEVBQUUsR0FBRztTQUNiLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDM0IsR0FBRyxFQUFFLEtBQUs7WUFDVixPQUFPLEVBQUUsR0FBRztZQUNaLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztTQUNyQixDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFO1lBQ2pDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzVCLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLEtBQUssRUFBRSxFQUFFO1lBQ1QsVUFBVSxFQUFFO2dCQUNWLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQ1osUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLEtBQUssRUFBRSxNQUFNO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO29CQUMzQixHQUFHLEVBQUUsS0FBSztvQkFDVixPQUFPLEVBQUUsR0FBRztpQkFDYixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNiLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDMUIsT0FBTyxFQUFFLENBQUM7WUFDVixVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7b0JBQ25CLFNBQVMsRUFBRSxDQUFDLENBQUM7b0JBQ2IsTUFBTSxFQUFFLENBQUM7b0JBQ1QsS0FBSyxFQUFFLENBQUM7b0JBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO2lCQUMxQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNiLENBQUMsQ0FBQztJQUVMLENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsS0FBSztRQUNkLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUM1QixHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMxQixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN0QixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2QixTQUFTLEVBQUUsR0FBRztTQUNmLENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUNqQyxVQUFVLEVBQUUsU0FBUztZQUNyQixPQUFPLEVBQUUsR0FBRztZQUNaLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUMxQixJQUFJLEVBQUUsQ0FBQztZQUNQLEdBQUcsRUFBRSxDQUFDO1lBQ04sS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsT0FBTztZQUNmLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRTtnQkFDVixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUNaLFFBQVEsRUFBRSxPQUFPO29CQUNqQixLQUFLLEVBQUUsTUFBTTtvQkFDYixTQUFTLEVBQUUsUUFBUTtpQkFDcEIsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUIsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDM0IsR0FBRyxFQUFFLE1BQU07WUFDWCxPQUFPLEVBQUUsR0FBRztTQUNiLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsRUFBRTtZQUN6QyxHQUFHLEVBQUUsSUFBSTtZQUNULE9BQU8sRUFBRSxHQUFHO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQzNCLEdBQUcsRUFBRSxLQUFLO1lBQ1YsT0FBTyxFQUFFLEdBQUc7WUFDWixLQUFLLEVBQUUsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztTQUNyQixDQUFDLENBQUM7SUFFTCxDQUFDO0lBRUQsOEJBQUksR0FBSjtRQUFBLGlCQXNCQztRQXJCQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQUs7WUFDdEIsZ0NBQWdDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0UsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQUs7WUFDcEIsRUFBRSxDQUFDLENBQUUsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSSxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNLENBQUM7WUFDVCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQXJMQSxBQXFMQyxJQUFBO0FBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztBQUV0QztrQkFBZSxTQUFTLENBQUM7Ozs7QUM1THpCLElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNqQixzQkFBa0IsbUJBQW1CLENBQUMsQ0FBQTtBQVd0QztJQVlFO1FBRUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25FLCtDQUErQztRQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFbEQ7O1dBRUc7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsVUFBVSxFQUFFLEtBQUs7WUFDakIsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUdELFdBQVc7SUFDWCw2QkFBTSxHQUFOO1FBRUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25FLCtDQUErQztRQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsS0FBSztZQUNiLE9BQU8sRUFBRSxLQUFLO1NBQ2YsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFHRDs7T0FFRztJQUNILDhCQUFPLEdBQVAsVUFBUyxLQUFZO1FBQ25CLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUU7WUFDL0IsR0FBRyxFQUFFLENBQUM7WUFDTixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU87U0FDcEIsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBVSxLQUFZO1FBQ3BCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25ELFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUU7WUFDL0IsR0FBRyxFQUFFLE9BQU87WUFDWixJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07U0FDbkIsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGtDQUFXLEdBQVgsVUFBYSxJQUFhO1FBQ3hCLEVBQUUsQ0FBQyxDQUFFLElBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzVCLENBQUM7SUFFSCxDQUFDO0lBRUQsK0JBQVEsR0FBUixVQUFVLElBQWE7UUFFckIsRUFBRSxDQUFDLENBQUUsSUFBSyxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFFSCxDQUFDO0lBRUQsbUNBQVksR0FBWixVQUFjLElBQWE7UUFFekIsRUFBRSxDQUFDLENBQUUsSUFBSyxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVcsS0FBSztnQkFDckUsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbkgsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbkQsQ0FBQztJQUVILENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQVEsSUFBYTtRQUVuQixFQUFFLENBQUMsQ0FBRSxJQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVyxLQUFLO2dCQUM1QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0SixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBR0gsQ0FBQztJQUVELDJDQUFvQixHQUFwQjtRQUNFLHlDQUF5QztRQUV6QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQiwwREFBMEQ7UUFDMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsMkNBQW9CLEdBQXBCO1FBQ0UseUNBQXlDO1FBRXpDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELDRDQUFxQixHQUFyQjtRQUNFLDBDQUEwQztRQUUxQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUVuRCxDQUFDO0lBRUQsdUNBQWdCLEdBQWhCO1FBRUUsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRTlCOztXQUVHO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRXBFLFFBQVEsQ0FBQyxJQUFJLENBQUUsVUFBQyxLQUFLLEVBQUUsSUFBSTtZQUN6QixFQUFFLENBQUMsQ0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUM7SUFFRCxzQ0FBZSxHQUFmO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUUvQixDQUFDO0lBRUQsdUNBQWdCLEdBQWhCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWpDLEVBQUUsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBQ0QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELHVDQUFnQixHQUFoQixVQUFrQixTQUFTO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUVELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCx1Q0FBZ0IsR0FBaEIsVUFBa0IsU0FBUztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFakMsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFRCxvQ0FBb0M7UUFDcEMsRUFBRSxDQUFDLENBQUUsU0FBUyxDQUFDLE9BQU8sS0FBSyxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxJQUFLLENBQUMsQ0FBQyxDQUFDO1lBRS9ELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQy9CLENBQUM7SUFDSCxDQUFDO0lBRUQsd0NBQWlCLEdBQWpCLFVBQW1CLFNBQVM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRWxDLEVBQUUsQ0FBQyxDQUFFLFNBQVMsQ0FBQyxNQUFNLEtBQUssS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssSUFBSyxDQUFDLENBQUMsQ0FBQztZQUU5RCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMvQixDQUFDO0lBRUgsQ0FBQztJQUVELGdDQUFTLEdBQVQ7UUFDRTs7V0FFRztRQUNILEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLEtBQUssZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTVDLEVBQUUsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQixDQUFDO1lBQ0QsaUJBQWlCO1lBRWpCLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQztRQUNKLENBQUM7UUFFRDs7V0FFRztRQUNILEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLEtBQUssZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDM0Isb0JBQW9CO1lBQ3BCLFVBQVU7WUFDVixFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFDRCxpQkFBaUI7WUFFakIsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDWCxVQUFVLEVBQUUsSUFBSTtnQkFDaEIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsT0FBTyxFQUFFLEtBQUs7YUFDZixDQUFDO1FBQ0osQ0FBQztRQUVEOztXQUVHO1FBQ0gsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsS0FBSyxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUM7UUFFSixDQUFDO1FBRUQ7O1dBRUc7UUFDSCxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxLQUFLLGVBQUssQ0FBQyxHQUFHLENBQUMsT0FBUSxDQUFDLENBQUMsQ0FBQztZQUU3QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRSxJQUFJO2FBQ2QsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBRUQsOEJBQU8sR0FBUDtRQUNFLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLEtBQUssZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTVDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQztRQUVKLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxLQUFLLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQztRQUNKLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxLQUFLLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQztRQUNKLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxLQUFLLGVBQUssQ0FBQyxHQUFHLENBQUMsT0FBUSxDQUFDLENBQUMsQ0FBQztZQUU3QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRSxJQUFJO2FBQ2QsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBRUQsMkJBQUksR0FBSjtRQUFBLGlCQWlCQztRQWhCQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNmLG9CQUFvQjtRQUVwQjs7eUJBRWlCO1FBRWpCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsVUFBRSxLQUFLO1lBQ3ZCLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7a0JBQzNCLFVBQVUsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7a0JBQzFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQztJQUdKLENBQUM7SUFDSCxtQkFBQztBQUFELENBeFlBLEFBd1lDLElBQUE7QUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBRTdCO2tCQUFlLEdBQUcsQ0FBQzs7OztBQ3habkIsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBR2pCO0lBYUU7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELHVDQUFZLEdBQVo7UUFDRSxlQUFlO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUNsQyxlQUFlLEVBQUUsSUFBSTtZQUNyQixZQUFZLEVBQUUsZUFBZTtZQUM3QixZQUFZLEVBQUUsS0FBSztZQUNuQixPQUFPLEVBQUU7Z0JBQ1AsYUFBYSxFQUFFLGFBQWE7YUFDN0I7WUFDRCxrQkFBa0IsRUFBRSxLQUFLO1NBQzFCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnREFBcUIsR0FBckI7UUFDRSxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQywrQkFBK0I7UUFFNUUsOEJBQThCO1FBQzlCLEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzFCLENBQUM7UUFFRCxFQUFFO1FBQ0YsRUFBRSxDQUFDLENBQUUsY0FBYyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQU0sQ0FBQyxDQUFDLENBQUM7WUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLGNBQWMsSUFBSSxHQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUUsY0FBYyxJQUFJLEdBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxjQUFjLElBQUksSUFBSyxDQUFDLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksY0FBYyxHQUFHLElBQUssQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksY0FBYyxHQUFHLElBQUssQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUU3RCxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLEdBQUcsQ0FBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEksQ0FBQztRQUNELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVELHVDQUFZLEdBQVo7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsdUNBQVksR0FBWjtRQUVFLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpELEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxlQUFlLEtBQUssQ0FBRSxDQUFDLENBQUMsQ0FBQztZQUVqQyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUUxRCxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQztJQUNILENBQUM7SUFFRCxvQ0FBUyxHQUFULFVBQVcsWUFBb0I7UUFDN0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDZDQUFrQixHQUFsQjtRQUNFLHFDQUFxQztRQUNyQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCx1Q0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLGlCQUFpQixFQUFFO1lBRTVDLFVBQVU7WUFDVixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXRDLHdDQUF3QztZQUN4QyxVQUFVLENBQUM7Z0JBQ1QsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFVixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBRUUsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoQyxrQkFBa0I7UUFDbEIsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFFN0Isb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7SUFDSCxDQUFDO0lBRUQsd0NBQWEsR0FBYixVQUFlLEVBQUUsRUFBRSxHQUFHO1FBQ3BCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFN0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDakMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0IsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxtQ0FBUSxHQUFSLFVBQVUsSUFBSTtRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ2pCLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGlDQUFpQztJQUVqQywrQkFBSSxHQUFKO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU1QixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFMUIsbUNBQW1DO1FBQ25DLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFN0IsZ0VBQWdFO1FBQ2hFLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUvQywyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLHNCQUFzQjtRQUN0QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDakIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTNFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVILHVCQUFDO0FBQUQsQ0FuTEEsQUFtTEMsSUFBQTtBQUVELElBQUksY0FBYyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztBQUU1QztrQkFBZSxjQUFjLENBQUM7Ozs7QUMxTDlCLElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNqQixzQkFBa0IsU0FBUyxDQUFDLENBQUE7QUFFNUI7SUFjRSx5QkFBYSxFQUFFO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELGdEQUFzQixHQUF0QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsd0NBQWMsR0FBZDtRQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMvQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELDhDQUFvQixHQUFwQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCw0Q0FBa0IsR0FBbEIsVUFBb0IsS0FBSztRQUV2QixFQUFFLENBQUMsQ0FBRSxLQUFLLEtBQUssT0FBUSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUM7SUFFSCxDQUFDO0lBRUQsbUNBQVMsR0FBVCxVQUFXLEtBQWEsRUFBRSxRQUFnQjtRQUV4QywyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFckUsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQWEsU0FBUztRQUVwQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUVqRCxFQUFFLENBQUMsQ0FBRSxTQUFTLEtBQUssT0FBUSxDQUFDLENBQUMsQ0FBQztZQUM1QixrREFBa0Q7WUFDbEQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEQsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixrREFBa0Q7WUFDbEQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsZUFBZTtRQUNmLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuQyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELHNDQUFZLEdBQVosVUFBYyxLQUFLO1FBRWpCLDBGQUEwRjtRQUMxRixFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsY0FBYyxFQUFHLENBQUMsQ0FBQyxDQUFDO1lBRWpGLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxJQUFJLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixDQUFDO1FBRUgsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBRW5FLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxJQUFJLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixDQUFDO1FBRUgsQ0FBQztJQUVILENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVksRUFBRSxFQUFFLEtBQUs7UUFBckIsaUJBc0JDO1FBckJDLFlBQVk7UUFDWixlQUFlO1FBQ2YsRUFBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXZGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRXZCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpRkFBaUYsRUFBRTtnQkFDMUgsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUUxRSx1QkFBdUI7Z0JBQ3ZCLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRTtvQkFDckQsT0FBTyxFQUFFLENBQUM7b0JBQ1YsQ0FBQyxFQUFFLElBQUk7b0JBQ1AsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDTixLQUFLLEVBQUUsQ0FBQztvQkFDUixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU87b0JBQ25CLEtBQUssRUFBRSxFQUFFO2lCQUNWLENBQUMsQ0FBQztZQUVMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQWEsQ0FBQztRQUFkLGlCQXdCQztRQXZCQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsU0FBUzthQUNOLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUNmO1lBQ0UsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTztZQUN4QyxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQ0YsQ0FBQztRQUVKLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUNyRCxPQUFPLEVBQUUsQ0FBQztZQUNWLENBQUMsRUFBRSxJQUFJO1lBQ1AsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFO29CQUM3QixLQUFLLEVBQUUsRUFBRTtpQkFDVixDQUFDLENBQUM7WUFDTCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFBQSxpQkFpQkM7UUFmQyxvRUFBb0U7UUFDcEUsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUU1QixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsSUFBSSxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdEIsQ0FBQztRQUVILENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVWLENBQUM7SUFFRCw4QkFBSSxHQUFKO1FBRUUsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWxELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV6RSxxQkFBcUI7UUFDckIsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUNSLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JELElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25ELElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFMUQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBRTFELDBCQUEwQjtRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0F0TUEsQUFzTUMsSUFBQTtBQUVELHFEQUFxRDtBQUNyRDtJQUlFO1FBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsb0NBQUksR0FBSjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFFLEtBQUssRUFBRSxFQUFFO1lBRW5DLGtEQUFrRDtZQUNsRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUgsNEJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBRUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO0FBRS9DO2tCQUFlLFlBQVksQ0FBQzs7OztBQ25PNUIsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBSWpCO0lBT0U7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsNENBQWUsR0FBZjtRQUNFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDBDQUFhLEdBQWI7UUFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRXpDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELHNDQUFTLEdBQVQ7UUFFRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVuQyxvQkFBb0I7UUFDcEIseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFckMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxzQ0FBUyxHQUFUO1FBQ0UsNkJBQTZCO1FBRTdCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUU5QyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0Qyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0IsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTtZQUN6QixPQUFPLEVBQUUsQ0FBQztZQUNWLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpQ0FBSSxHQUFKO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWpDLHlDQUF5QztRQUN6QyxpREFBaUQ7UUFFakQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTtZQUN6QixDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxNQUFNO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDNUIsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsaUJBQWlCO1NBQ3hCLENBQUMsQ0FBQztRQUlILENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDSCx5QkFBQztBQUFELENBakZBLEFBaUZDLElBQUE7QUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7QUFFekM7a0JBQWUsU0FBUyxDQUFDOzs7O0FDekZ6QixJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDakIsOEJBQThCO0FBQzlCO0lBU0U7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxpREFBa0IsR0FBbEI7UUFDRSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsSUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRXRELEVBQUUsQ0FBQyxDQUFFLFdBQVcsS0FBSyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFVBQVUsQ0FBQztnQkFFVCxTQUFTO3FCQUNOLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUNqQjtvQkFDRSxDQUFDLEVBQUUsTUFBTTtvQkFDVCxPQUFPLEVBQUUsQ0FBQztpQkFDWCxDQUNGLENBQUM7WUFDTixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDO0lBQ0gsQ0FBQztJQUVELFNBQVM7SUFDVCw4QkFBOEI7SUFDOUIsd0VBQXdFO0lBQ3hFLEVBQUU7SUFDRiwwQkFBMEI7SUFDMUIseUJBQXlCO0lBQ3pCLEVBQUU7SUFDRixzQ0FBc0M7SUFDdEMsRUFBRTtJQUNGLGtCQUFrQjtJQUNsQiw2QkFBNkI7SUFDN0IsY0FBYztJQUNkLDBCQUEwQjtJQUMxQixjQUFjO0lBQ2QsYUFBYTtJQUNiLGVBQWU7SUFDZixhQUFhO0lBQ2IsRUFBRTtJQUNGLG9DQUFvQztJQUNwQyxFQUFFO0lBQ0YsTUFBTTtJQUNOLElBQUk7SUFFSixrREFBbUIsR0FBbkI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRWhDLEdBQUcsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUcsQ0FBQztZQUMzQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLENBQUM7SUFDSCxDQUFDO0lBRUQsNENBQWEsR0FBYjtRQUFBLGlCQXdDQztRQXZDQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFO1lBRTVDLHVCQUF1QjtZQUN2QixLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFFNUQsb0JBQW9CO1lBQ3BCLG9EQUFvRDtZQUNwRCxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFN0QsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLFVBQVcsUUFBUTtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQUUsUUFBUTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUU5QyxvQ0FBb0M7WUFDcEMsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVqQyw2Q0FBNkM7WUFDN0MsMkNBQTJDO1lBQzNDLDhDQUE4QztZQUM5QyxNQUFNO1FBRVIsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQzthQUNELFFBQVEsQ0FBQyxVQUFFLFFBQVEsRUFBRSxLQUFLO1lBQ3pCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUVsRCxFQUFFLENBQUMsQ0FBRSxNQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsK0RBQStEO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFJLEdBQUo7UUFFRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDSCwyQkFBQztBQUFELENBcEhBLEFBb0hDLElBQUE7QUFFRCxJQUFJLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7QUFFN0M7a0JBQWUsV0FBVyxDQUFDOzs7O0FDekgzQixJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDakIsc0JBQWtCLFNBQVMsQ0FBQyxDQUFBO0FBQzVCO0lBUUU7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsMkNBQWMsR0FBZDtRQUNFLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksYUFBYSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDdEMsYUFBYSxDQUFDLEdBQUcsQ0FBQztnQkFDaEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNyRyxDQUFDLENBQUM7WUFFSCxJQUFJLGNBQWMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQ2pCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDdkcsQ0FBQyxDQUFDO1lBRUgsSUFBSSxVQUFVLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFOUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUMvQjtnQkFDRSxjQUFjLEVBQUUsaUJBQWlCO2dCQUNqQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUN2QyxNQUFNLEVBQUUsQ0FBQyxHQUFHO2FBQ2IsQ0FBQztpQkFFRCxRQUFRLENBQUMsYUFBYSxDQUFDO2lCQUN2QixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLG1DQUFtQztpQkFDL0UsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXJCLElBQUksTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FDaEM7Z0JBQ0UsY0FBYyxFQUFFLGlCQUFpQjtnQkFDakMsUUFBUSxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUc7YUFDOUMsQ0FBQztpQkFFRCxRQUFRLENBQUMsY0FBYyxDQUFDO2lCQUN4QixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLG1DQUFtQztpQkFDL0UsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0lBRUQsNkNBQWdCLEdBQWhCO1FBQ0UsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksVUFBVSxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzlDLElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FDL0I7WUFDRSxjQUFjLEVBQUUsb0JBQW9CO1lBQ3BDLFFBQVEsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFO1NBRTdCLENBQUM7YUFDRCxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUM7YUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELDZDQUFnQixHQUFoQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0IsU0FBUzthQUNOLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUNmO1lBQ0UsUUFBUSxFQUFFO2dCQUNSLENBQUMsRUFBRSxDQUFDO2FBQ0w7WUFDRCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87U0FDckIsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVELHFEQUF3QixHQUF4QjtRQUFBLGlCQVlDO1FBWEMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxNQUFNO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsVUFBVSxFQUFFO2dCQUNWLDJFQUEyRTtnQkFDM0UsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQixDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFPLEdBQVAsVUFBUyxHQUFHO1FBQ1YsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQy9CLENBQUM7SUFFRCxvREFBdUIsR0FBdkIsVUFBeUIsUUFBUTtRQUFqQyxpQkFtQkM7UUFqQkMsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBR2hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQzthQUUvQixHQUFHLENBQUMsMkNBQTJDLEVBQUU7WUFFaEQsNkRBQTZEO1lBQzdELEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTFCLENBQUMsQ0FBQyxDQUFDO1FBRUwsRUFBRSxDQUFDLENBQUUsT0FBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFVBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsUUFBUSxFQUFFLENBQUM7UUFDYixDQUFDO0lBRUgsQ0FBQztJQUVELHFDQUFRLEdBQVIsVUFBVSxHQUFHO1FBQ1gsRUFBRSxDQUFDLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLEVBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVELDZDQUFnQixHQUFoQixVQUFrQixLQUFNO1FBQXhCLGlCQXVEQztRQXJEQyx5QkFBeUI7UUFDekIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFekY7O1dBRUc7UUFDSCxFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQ7O1dBRUc7UUFDSDs7V0FFRztRQUNILEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLEdBQUcsZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3JCLGVBQUssQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLFdBQVksQ0FBQyxDQUFDLENBQUM7WUFFM0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLG1DQUFtQztZQUNuQyxNQUFNLENBQUM7UUFFVCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLEdBQUcsZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFFMUU7O2VBRUc7WUFFSCxtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLHVCQUF1QixDQUFFO2dCQUM1QixLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUwsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVksQ0FBQyxDQUFDLENBQUM7UUFPcEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU47O2VBRUc7WUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFFSCxDQUFDO0lBRUQsaUNBQUksR0FBSjtRQUFBLGlCQW9CQztRQW5CQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsd0NBQXdDO1FBQ3hDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLHdEQUF3RDtRQUN4RCxFQUFFO1FBQ0YsaURBQWlEO1FBQ2pELDBCQUEwQjtRQUMxQix5QkFBeUI7UUFDekIseUJBQXlCO1FBQ3pCLE1BQU07UUFDTixFQUFFO1FBQ0YsaUJBQWlCO0lBQ25CLENBQUM7SUFDSCx5QkFBQztBQUFELENBaE5BLEFBZ05DLElBQUE7QUFFRCxJQUFJLG1CQUFtQixHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztBQUVuRDtrQkFBZSxtQkFBbUIsQ0FBQzs7OztBQ3ZObkMsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ2pCLHNCQUFrQixTQUFTLENBQUMsQ0FBQTtBQWdCNUI7SUFhRTtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLFFBQVEsRUFBRSxFQUFFO1lBQ1osWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztJQUVKLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVUsS0FBYTtRQUVyQixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRTFDLENBQUM7SUFFRCx1Q0FBYyxHQUFkO1FBRUUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7UUFFcEQscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQUUsS0FBSyxFQUFFLEVBQUU7WUFFbkMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUNmLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUMvQixJQUFJLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixFQUFFLEVBQ2hDLFFBQVEsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztZQUVoQyxpQ0FBaUM7WUFDakMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFM0Isc0NBQXNDO1lBQ3RDLElBQUksS0FBSyxHQUFHLGVBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUNuQyxFQUFFLEVBQUUsUUFBUTtnQkFDWixJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsY0FBYztnQkFDckIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLElBQUk7YUFDWixDQUFDLENBQUM7WUFFSCxJQUFJLEtBQUssR0FBRyxlQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDbkMsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsS0FBSyxFQUFFLEtBQUssS0FBSyxDQUFDLEdBQUcsVUFBVSxHQUFHLEVBQUU7YUFDckMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUdWLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZDLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXZDLENBQUM7SUFFRCxpREFBd0IsR0FBeEI7UUFBQSxpQkF5QkM7UUF4QkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXJDLDRFQUE0RTtRQUM1RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFFLEtBQUssRUFBRSxFQUFFO1lBRTFCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDZixTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRTNCLEVBQUUsQ0FBQyxDQUFFLEtBQUssS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFNUIseUNBQXlDO2dCQUN6QyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFFRCx1REFBdUQ7WUFDdkQsRUFBRSxDQUFDLENBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUVELDhCQUE4QjtZQUM5QixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0NBQXNCLEdBQXRCO1FBQUEsaUJBZ0JDO1FBZEMsYUFBYTtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQUUsS0FBSyxFQUFFLEVBQUU7WUFFbkMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUNmLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFMUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztRQUUvQyxDQUFDLENBQUMsQ0FBQztRQUVILHlCQUF5QjtRQUN6QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVoRCxDQUFDO0lBRUQsK0JBQU0sR0FBTixVQUFRLEVBQVU7UUFFaEIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDLENBQUM7SUFFTCxDQUFDO0lBRUQsaUNBQVEsR0FBUixVQUFVLENBQUM7UUFFVCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUM1QixRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFDcEMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQ3JDLFNBQVMsR0FBRyxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUNyQyxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QixrQ0FBa0M7UUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFL0MsdUNBQXVDO1FBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU5Qyx1Q0FBdUM7UUFDdkMsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRixLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU1QixpSEFBaUg7UUFDakgsRUFBRSxDQUFDLENBQUUsT0FBTyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDakIsaUJBQWlCLEVBQUUsYUFBYSxHQUFHLFNBQVMsR0FBRyxLQUFLO2dCQUNwRCxjQUFjLEVBQUUsYUFBYSxHQUFHLFNBQVMsR0FBRyxLQUFLO2dCQUNqRCxhQUFhLEVBQUUsYUFBYSxHQUFHLFNBQVMsR0FBRyxLQUFLO2dCQUNoRCxZQUFZLEVBQUUsYUFBYSxHQUFHLFNBQVMsR0FBRyxLQUFLO2dCQUMvQyxXQUFXLEVBQUUsYUFBYSxHQUFHLFNBQVMsR0FBRyxLQUFLO2FBQy9DLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUNqQixpQkFBaUIsRUFBRSxpQkFBaUI7Z0JBQ3BDLGNBQWMsRUFBRSxpQkFBaUI7Z0JBQ2pDLGFBQWEsRUFBRSxpQkFBaUI7Z0JBQ2hDLFlBQVksRUFBRSxpQkFBaUI7Z0JBQy9CLFdBQVcsRUFBRSxpQkFBaUI7YUFDL0IsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGtFQUFrRTtRQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTdCLHdDQUF3QztRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFFckIsQ0FBQztJQUVELG9DQUFXLEdBQVg7UUFBQSxpQkFrQkM7UUFoQkMsbUVBQW1FO1FBQ25FLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQUUsS0FBSyxFQUFFLEVBQUU7WUFFbkMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUNmLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUIsRUFBRSxDQUFDLENBQUUsRUFBRSxLQUFLLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQztnQkFFakMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU3QixDQUFDO1FBRUgsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBRUQsc0NBQWEsR0FBYjtRQUFBLGlCQXVCQztRQXJCQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFFLElBQUk7WUFDbkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFFLElBQUksQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxHQUFHLCtEQUErRCxDQUFDO1FBRTdFLElBQUksZUFBZSxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUzQyxlQUFlLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbEQsbUVBQW1FO1FBQ25FLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFFdEUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkQsNkJBQTZCO1FBQzdCLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUduRCxDQUFDO0lBRUQsa0NBQVMsR0FBVCxVQUFXLENBQUM7UUFBWixpQkFrREM7UUFqREMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUVoQyxzQkFBc0I7UUFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3BCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEVBQUU7WUFDTCxVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxDQUFFO29CQUNWLHFCQUFxQjtvQkFDckIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBRXZDLDhCQUE4QjtvQkFDOUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNWLENBQUM7U0FDRixDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxJQUFJLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyw2REFBNkQsRUFDekcsVUFBRSxDQUFDO2dCQUVELDZDQUE2QztnQkFDN0MsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBRXRDLDJCQUEyQjtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVuQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFckIsNkNBQTZDO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFdEMsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBR0QseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVUsQ0FBQztRQUNULENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVuQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9CLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhELEVBQUUsQ0FBQyxDQUFFLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUUvQix5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFdEMscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBDLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFOUMseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhDLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTNDLDRDQUE0QztZQUM1QyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXRGLENBQUM7UUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRXZELEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsNkRBQTZELEVBQ3BFLFVBQUUsQ0FBQztnQkFFRCx5QkFBeUI7Z0JBQ3pCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUV0QyxvRUFBb0U7Z0JBQ3BFLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLEVBQUU7b0JBQ3hDLE9BQU8sRUFBRSxDQUFDO29CQUNWLEtBQUssRUFBRSxFQUFFO2lCQUNWLENBQUMsQ0FBQztnQkFDSCxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFO29CQUN4QyxDQUFDLEVBQUUsQ0FBQztpQkFDTCxDQUFDLENBQUM7WUFFTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLHlCQUF5QjtZQUN6QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUV0QyxvRUFBb0U7WUFDcEUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsRUFBRTtnQkFDeEMsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLEVBQUU7YUFDVixDQUFDLENBQUM7WUFDSCxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxFQUFFO2dCQUN4QyxDQUFDLEVBQUUsQ0FBQzthQUNMLENBQUMsQ0FBQztRQUNMLENBQUM7SUFFSCxDQUFDO0lBRUQsNkJBQUksR0FBSjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFN0IsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QiwyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFFaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFNUIsY0FBYztRQUNkLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFHaEMsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0ExV0EsQUEwV0MsSUFBQTtBQUVELElBQU0sWUFBWSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7QUFFMUM7a0JBQWUsWUFBWSxDQUFDOzs7O0FDL1g1QixJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDakIsc0JBQWtCLFNBQVMsQ0FBQyxDQUFBO0FBUzVCO0lBcUJFLDJCQUFhLEVBQVU7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7UUFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLFVBQVUsRUFBRSxDQUFDO1lBQ2IsU0FBUyxFQUFFLENBQUM7WUFDWixhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDekIsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztTQUM3QixDQUFDO0lBRUosQ0FBQztJQUVELHlDQUFhLEdBQWI7UUFFRSw2Q0FBNkM7UUFDN0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDOUYsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QiwyQ0FBMkM7UUFDM0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDN0csU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUvQixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5CLDBFQUEwRTtRQUMxRSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7UUFFcEQsb0ZBQW9GO1FBQ3BGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRWhFLENBQUM7SUFFRCxrREFBc0IsR0FBdEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELGdEQUFvQixHQUFwQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsaURBQXFCLEdBQXJCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCwwQ0FBYyxHQUFkO1FBQ0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsMkNBQWUsR0FBZixVQUFpQixRQUFnQjtRQUUvQiw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFFM0YsQ0FBQztJQUVELHVDQUFXLEdBQVgsVUFBYSxLQUFhO1FBRXhCLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRTlDLENBQUM7SUFFRCxnREFBb0IsR0FBcEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7SUFDekMsQ0FBQztJQUVELHVDQUFXLEdBQVgsVUFBYSxTQUFpQjtRQUU1Qix5REFBeUQ7UUFDekQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDakQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFN0YsRUFBRSxDQUFDLENBQUUsU0FBUyxLQUFLLE9BQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUIsNERBQTREO1lBQzVELFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvQixTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sNERBQTREO1lBQzVELFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFFRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCw0Q0FBZ0IsR0FBaEIsVUFBa0IsU0FBa0IsRUFBRSxRQUFpQjtRQUVyRCxZQUFZO1FBQ1osRUFBRSxDQUFDLENBQUUsU0FBVSxDQUFDLENBQUMsQ0FBQztZQUVoQixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRTtnQkFDdkIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3BCLENBQ0YsQ0FBQztRQUVKLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLG9CQUFvQjtZQUNwQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUNoRCxJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0IsQ0FBQztJQUVILENBQUM7SUFFRCxzQ0FBVSxHQUFWLFVBQVksU0FBaUI7UUFDM0IsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDaEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFN0csRUFBRSxDQUFDLENBQUUsU0FBUyxLQUFLLE9BQVEsQ0FBQyxDQUFDLENBQUM7WUFFNUIsNERBQTREO1lBQzVELFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMvQixTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUU1QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTiw0REFBNEQ7WUFDNUQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUUzQyxDQUFDO0lBRUgsQ0FBQztJQUVELDJDQUFlLEdBQWYsVUFBaUIsU0FBaUI7UUFFaEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDL0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFHckcsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsR0FBRyxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7WUFFMUM7O2VBRUc7WUFFSCxFQUFFLENBQUMsQ0FBRSxTQUFTLEtBQUssT0FBUSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFL0IsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3RHLG1CQUFtQjtvQkFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztvQkFDbEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztvQkFFbkYsc0JBQXNCO29CQUN0QixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFO3dCQUNwQyxDQUFDLEVBQUUsSUFBSTt3QkFDUCxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTO3dCQUMvQixJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07cUJBQ25CLENBQUMsQ0FBQztnQkFFTCxDQUFDO1lBR0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLFlBQVksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3JDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBRy9CLEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVsRixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO29CQUNsRixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFO3dCQUNwQyxDQUFDLEVBQUUsSUFBSTt3QkFDUCxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTO3dCQUMvQixJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07cUJBQ25CLENBQUMsQ0FBQztnQkFFTCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNuRixtQkFBbUI7b0JBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7Z0JBQ3JGLENBQUM7WUFFSCxDQUFDO1FBRUgsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU47O2VBRUc7WUFDSCxFQUFFLENBQUMsQ0FBRSxTQUFTLEtBQUssT0FBUSxDQUFDLENBQUMsQ0FBQztnQkFFNUIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFL0Isd0NBQXdDO2dCQUN4QyxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRyxDQUFDLENBQUMsQ0FBQztvQkFDdEcsaUNBQWlDO29CQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUNuRixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO29CQUVsRixjQUFjO29CQUNkLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUU7d0JBQ2xDLENBQUMsRUFBRSxJQUFJO3dCQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVU7d0JBQ2hDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtxQkFDbkIsQ0FDRixDQUFDO2dCQUVKLENBQUM7WUFFSCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRU4sWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFL0IsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRW5GLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7b0JBQ25GLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUU7d0JBQ2xDLENBQUMsRUFBRSxJQUFJO3dCQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVU7d0JBQ2hDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtxQkFDbkIsQ0FDRixDQUFDO2dCQUVKLENBQUM7Z0JBRUQsMkRBQTJEO2dCQUMzRCxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEtBQUssQ0FBRSxDQUFDLENBQUMsQ0FBQztvQkFFbEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFFcEYsQ0FBQztZQUVILENBQUM7UUFFSCxDQUFDO0lBRUgsQ0FBQztJQUVELDBDQUFjLEdBQWQsVUFBZ0IsSUFBWTtRQUUxQixFQUFFLENBQUMsQ0FBRSxJQUFJLEtBQUssUUFBUyxDQUFDLENBQUMsQ0FBQztZQUV4QixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFO2dCQUNsQyxDQUFDLEVBQUUsSUFBSTtnQkFDUCxDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTO2dCQUMvQixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDcEIsQ0FDRixDQUFDO1FBRUosQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU4sUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRTtnQkFDbEMsQ0FBQyxFQUFFLElBQUk7Z0JBQ1AsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVTtnQkFDaEMsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPO2FBQ3BCLENBQ0YsQ0FBQztRQUVKLENBQUM7SUFFSCxDQUFDO0lBRUQsd0NBQVksR0FBWixVQUFjLEtBQVU7UUFDdEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXZCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQzFDLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFHckMsb0VBQW9FO1FBQ3BFLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTlGLDhCQUE4QjtZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRXZELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRzVCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFFakYsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFdkQsOENBQThDO1lBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTVCLENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssV0FBVztZQUN2QyxTQUFTLEdBQUcsVUFBVTtZQUN0QixVQUFVLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxjQUMxQixDQUFDLENBQUMsQ0FBQztZQUNELDJGQUEyRjtZQUMzRixlQUFlO1lBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU3QixvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFNUIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksU0FBUyxHQUFHLFVBQ3pELENBQUMsQ0FBQyxDQUFDO1lBQ0QsZUFBZTtZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFN0Isb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTVCLENBQUM7UUFFRCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUzRSxDQUFDO0lBRUQscUNBQVMsR0FBVDtRQUFBLGlCQW9CQztRQWxCQyxvRUFBb0U7UUFDcEUsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUU1QixnREFBZ0Q7WUFDaEQsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsR0FBRyxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRTFDLHNEQUFzRDtnQkFDdEQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVoQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRU4sS0FBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVqQyxDQUFDO1FBRUgsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRVYsQ0FBQztJQUVELDhDQUFrQixHQUFsQjtRQUVFLG9CQUFvQjtRQUNwQixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQzNCLFNBQVMsRUFBRSxxQ0FBcUM7U0FDakQsQ0FBQyxDQUFDO1FBR0gsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRTtZQUM1QixTQUFTLEVBQUUsc0NBQXNDO1lBQ2pELEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQyxDQUFDO0lBR0wsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFDRSxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQzVCLFNBQVMsRUFBRSxzQ0FBc0M7WUFDakQsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQVcsR0FBWDtRQUFBLGlCQStCQztRQTdCQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUNwRCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUUsS0FBYSxFQUFFLEVBQVU7WUFFdEQsdUJBQXVCO1lBQ3ZCLElBQUksU0FBUyxHQUFHLGVBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQ3BDLGFBQWEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUNuQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFDNUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQ3pDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpDLDRCQUE0QjtZQUM1QixZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztZQUNoRCxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0QyxXQUFXLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakMsT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFOUMsOEJBQThCO1lBQzlCLEtBQUssS0FBSyxLQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFFakYscUJBQXFCO1lBQ3JCLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFeEMsQ0FBQztJQUVELG1EQUF1QixHQUF2QixVQUF5QixRQUFRO1FBQWpDLGlCQVdDO1FBVEMsMkRBQTJEO1FBQzNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEQsa0ZBQWtGO1FBQ2xGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDL0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztRQUN6RSxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsRUFBRSxDQUFDO0lBQ2IsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFDRSxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxFQUFFO1lBQ25DLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFLENBQUM7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsNENBQWdCLEdBQWhCO1FBQUEsaUJBUUM7UUFQQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ2hFLE9BQU8sRUFBRSxDQUFDO1lBQ1YsS0FBSyxFQUFFLEVBQUU7WUFDVCxVQUFVLEVBQUU7Z0JBQ1YsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3pCLENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0NBQUksR0FBSjtRQUVFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQiw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWhGLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFHbEQsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUU3RCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUUzRSxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQTlmQSxBQThmQyxJQUFBO0FBRUQscURBQXFEO0FBQ3JEO0lBSUU7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsNkJBQUksR0FBSjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFFLEtBQWEsRUFBRSxFQUFVO1lBRW5ELGtEQUFrRDtZQUNsRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFSCxxQkFBQztBQUFELENBbkJBLEFBbUJDLElBQUE7QUFFRCxJQUFJLGNBQWMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBRTFDO2tCQUFlLGNBQWMsQ0FBQzs7OztBQ2xpQjlCLElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUVqQixzQkFBa0IsU0FBUyxDQUFDLENBQUE7QUFFNUI7SUFlRTtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsNkNBQVksR0FBWjtRQUNFLHVDQUF1QztRQUN2QyxFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksZUFBSyxDQUFDLFVBQVUsSUFBSSxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakssQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1FBRVIsQ0FBQztJQUNILENBQUM7SUFFRCw2Q0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxzREFBcUIsR0FBckI7UUFFRSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUU1Qiw0REFBNEQ7UUFDNUQsaUVBQWlFO1FBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUN6RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyw2QkFBNkI7UUFHNUYsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZDLG9FQUFvRTtRQUNwRSx3REFBd0Q7UUFDeEQscURBQXFEO1FBQ3JELG1EQUFtRDtRQUNuRCxvREFBb0Q7UUFDcEQsNENBQTRDO1FBQzVDLGdEQUFnRDtRQUVoRCxtRkFBbUY7UUFDbkYsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzdDLG1CQUFtQjtZQUNuQiw0QkFBNEI7WUFDNUIsS0FBSztZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBS25DLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQ2hKLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFaEQsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXBDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztZQUVSLENBQUM7UUFFSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTix1RkFBdUY7WUFDdkYsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDckcsQ0FBQztRQUVILENBQUM7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUUzQixDQUFDO0lBRUQscURBQW9CLEdBQXBCO1FBQ0UsMEJBQTBCO1FBQzFCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUU3Qiw4QkFBOEI7UUFDOUIsRUFBRSxDQUFDLENBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0Isa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTVCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUM7UUFFRCwwRkFBMEY7UUFDMUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGlEQUFnQixHQUFoQjtRQUFBLGlCQW1CQztRQWpCQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVoQyxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxJQUFJLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztZQUUzQyxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO2dCQUM3QyxDQUFDLEVBQUUsQ0FBQztnQkFDSixPQUFPLEVBQUUsQ0FBQztnQkFDVixDQUFDLEVBQUUsSUFBSTtnQkFDUCxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU87Z0JBQ25CLEtBQUssRUFBRSxFQUFFO2dCQUNULFVBQVUsRUFBRTtvQkFDVixtQ0FBbUM7b0JBQ25DLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUVILENBQUM7SUFFRCxxQ0FBSSxHQUFKO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXBCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUVyRCw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUIsQ0FBQztJQUNILENBQUM7SUFDSCw2QkFBQztBQUFELENBcEpBLEFBb0pDLElBQUE7QUFFRCxJQUFJLGFBQWEsR0FBRyxJQUFJLHNCQUFzQixFQUFFLENBQUM7QUFFakQ7a0JBQWUsYUFBYSxDQUFDOzs7O0FDNUo3QixJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDakI7SUFNRTtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQVksS0FBSyxFQUFFLEVBQUU7UUFFbkIsb0JBQW9CO1FBQ3BCLElBQUksUUFBUSxHQUFHLHVCQUF1QixHQUFHLEtBQUssQ0FBQztRQUMvQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV4QixnQ0FBZ0M7UUFDaEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBRSxLQUFLLEVBQUUsRUFBRTtZQUV2QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFckMsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUFBLGlCQTRCQztRQTFCQyxvRUFBb0U7UUFDcEUsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUU1QiwwQkFBMEI7WUFDMUIsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFFaEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUVsQixpQkFBaUI7Z0JBQ2pCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFDdEMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQ2hDLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUUzQyw0QkFBNEI7Z0JBQzVCLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFckMsb0NBQW9DO2dCQUNwQyxFQUFFLENBQUMsQ0FBRSxLQUFJLENBQUMsYUFBYSxLQUFLLE1BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUM3QixLQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztnQkFDOUIsQ0FBQztZQUVILENBQUMsQ0FBQyxDQUFDO1FBRUwsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVELG1DQUFJLEdBQUo7UUFBQSxpQkEwQ0M7UUF4Q0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWpDLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFFLEtBQUssRUFBRSxFQUFFO1lBQ2hDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQixLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUU5Qiw0QkFBNEI7WUFDNUIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzNDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWpFLDRCQUE0QjtZQUM1QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbEMsS0FBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7WUFDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBRSxLQUFLLEVBQUUsRUFBRTtZQUVoQyxnQkFBZ0I7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRWpCLGdEQUFnRDtZQUNoRCxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLFVBQUUsQ0FBQztnQkFFOUIsUUFBUTtnQkFDUixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO2dCQUM1QixJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JDLEtBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO2dCQUM1QixZQUFZLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUUvRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsd0JBQXdCO1FBQ3hCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVILDJCQUFDO0FBQUQsQ0FwR0EsQUFvR0MsSUFBQTtBQUVELElBQU0sWUFBWSxHQUFHLElBQUksb0JBQW9CLEVBQUUsQ0FBQztBQUVoRDtrQkFBZSxZQUFZLENBQUM7Ozs7QUN4RzVCLElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUVqQiwrQkFBK0I7QUFDL0Isc0JBQXNCO0FBQ3RCLElBQUk7QUFDSixvQ0FBb0M7QUFFcEM7SUEwRUU7UUExRUYsaUJBcUdDO1FBOUZTLG9CQUFlLEdBQUcsVUFBRSxHQUFpQjtZQUMzQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFFYixHQUFHLENBQUMsQ0FBRSxJQUFJLEdBQUcsSUFBSSxHQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsQ0FBQztvQkFDOUIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxDQUFFLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztZQUNILENBQUM7WUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztRQUNNLHFCQUFnQixHQUFHO1lBQ3pCLHFFQUFxRTtZQUNyRSxJQUFJLGNBQWMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO1lBRXJDLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV0QixFQUFFLENBQUMsQ0FBRSxjQUFjLEtBQUssS0FBSSxDQUFDLFVBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBRXpDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzFELENBQUM7UUFDSCxDQUFDLENBQUM7UUFDTSxtQkFBYyxHQUFHO1lBQ3ZCLDBCQUEwQjtZQUMxQixJQUFJLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQ3hDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUUsU0FBUyxDQUFFLENBQUM7WUFFeEQsS0FBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQztRQUNNLG9CQUFlLEdBQUc7WUFDeEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztRQXFDQSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxHQUFHO1lBQ1QsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUUsR0FBRztZQUNYLE1BQU0sRUFBRSxHQUFHO1lBQ1gsT0FBTyxFQUFFLElBQUk7WUFDYixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQTlDRCxvQ0FBUyxHQUFULFVBQVcsS0FBYTtRQUN0QiwwQkFBMEI7UUFDMUIsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELHVDQUFZLEdBQVo7UUFDRSxFQUFFLENBQUMsQ0FBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUNsRSxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87WUFDL0UsVUFBVSxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBRWYsRUFBRSxDQUFDLENBQUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUVoQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNsQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxvQ0FBUyxHQUFULFVBQVcsSUFBWSxFQUFFLEtBQWMsRUFBRSxJQUFhO1FBRXBELG1FQUFtRTtRQUVuRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBRW5CLEdBQUcsQ0FBQyxDQUFFLElBQUksSUFBSSxJQUFJLEtBQU0sQ0FBQyxDQUFDLENBQUM7WUFDekIsRUFBRSxDQUFDLENBQUUsS0FBSyxDQUFFLElBQUksQ0FBRSxLQUFLLEtBQU0sQ0FBQztnQkFBQyxRQUFRLENBQUM7WUFDeEMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBRSxJQUFJLENBQUUsR0FBRyxHQUFHLENBQUM7UUFDL0MsQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO0lBQzNELENBQUM7SUFnQkQsK0JBQUksR0FBSjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVoQyxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV2RCw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsRCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FyR0EsQUFxR0MsSUFBQTtBQUVELElBQUksS0FBSyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztBQUVuQztrQkFBZSxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiBSZWYgcGF0aCBpcyBub3QgbmVlZGVkIGZvciBzb21lIHJlYXNvblxuIDxyZWZlcmVuY2UgcGF0aD1cIi9Vc2Vycy95b3NlbWV0aWUvRHJvcGJveC9kZXZlbG9wbWVudC92aG9zdHMvd3d3Lmx5bmRhc2NvcmUuZGV2L3dwLWNvbnRlbnQvdGhlbWVzL25lYXQvdHlwaW5ncy90c2QuZC50c1wiIC8+XG4gKi9cblxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQgTmF2IGZyb20gXCIuL25hdmlnYXRpb24vbmF2aWdhdGlvblwiO1xuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9uYXZpZ2F0aW9uL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5pbXBvcnQgU3ZnSGVhZGVyIGZyb20gXCIuL3BhcnRpYWxzL2hlYWRlci1zdmdcIjtcbi8vIGltcG9ydCBTbW9vdGhTdGF0ZSBmcm9tIFwiLi9wYXJ0aWFscy9zbW9vdGhTdGF0ZVwiO1xuaW1wb3J0IEltYWdlTG9hZGVyIGZyb20gXCIuL3BhcnRpYWxzL2ltYWdlTG9hZGVyXCI7XG5pbXBvcnQgU3RpY2t5U2lkZWJhciBmcm9tIFwiLi9wYXJ0aWFscy9zdGlja3ktc2lkZWJhclwiO1xuaW1wb3J0IEFuaW1hdGlvbkNvbnRyb2xsZXIgZnJvbSBcIi4vcGFydGlhbHMvcHJvY2Vzc0FuaW1hdGlvblwiO1xuaW1wb3J0IElzb3RvcGVHYWxsZXJ5IGZyb20gXCIuL3BhcnRpYWxzL2dhbGxlcnktaXNvdG9wZVwiO1xuaW1wb3J0IEhlYWRlclNsaWRlciBmcm9tIFwiLi9wYXJ0aWFscy9oZWFkZXItc2xpZGVyXCI7XG5pbXBvcnQgU2hvd2Nhc2VTbGlkZXIgZnJvbSBcIi4vcGFydGlhbHMvc2hvd2Nhc2Utc2xpZGVyXCI7XG5pbXBvcnQgVGVzdGltb25pYWxzIGZyb20gXCIuL3BhcnRpYWxzL3Rlc3RpbW9uaWFsc1wiO1xuaW1wb3J0IFF1b3RlQnVpbGRlciBmcm9tIFwiLi9wYXJ0aWFscy9xdW90ZS1idWlsZGVyXCI7XG4vLyBpbXBvcnQgU3RpY2t5U2lkZWJhciBmcm9tIFwiLi9wYXJ0aWFscy9zZXJ2aWNlLXNpZGViYXJcIjtcbmNvbnN0ICQgPSBqUXVlcnk7XG5kZWNsYXJlIHZhciBTY3JvbGxNYWdpYzogYW55O1xuLy8gZGVjbGFyZSB2YXIgcmV2YXBpMTogYW55O1xuXG4oZnVuY3Rpb24gKCkge1xuICBjbGFzcyBBcHAge1xuXG4gICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQXBwIGxvYWRlZFwiKTtcbiAgICAgIFN2Z0hlYWRlci5pbml0KCk7XG4gICAgICBVdGlscy5pbml0KCk7XG4gICAgICBOYXYuaW5pdCgpO1xuICAgICAgU2VhcmNoLmluaXQoKTtcbiAgICAgIFN0aWNreVNpZGViYXIuaW5pdCgpO1xuICAgICAgVGVzdGltb25pYWxzLmluaXQoKTtcbiAgICAgIFF1b3RlQnVpbGRlci5pbml0KCk7XG4gICAgICBBbmltYXRpb25Db250cm9sbGVyLmluaXQoKTsgLy8gR2xvYmFsIHdpbmRvdyBhbmltIGFuZCBjbGljayBjb250cm9sXG5cbiAgICB9XG4gIH1cblxuICBsZXQgYm9vdHN0cmFwID0gbmV3IEFwcCgpO1xuXG4gIC8qKiBydW4gYWxsIGZ1bmN0aW9ucyAqL1xuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgYm9vdHN0cmFwLmluaXQoKTtcbiAgICBJbWFnZUxvYWRlci5pbml0KCk7XG4gICAgLy8gU21vb3RoU3RhdGUuaW5pdChcIlwiKTtcbiAgfSk7XG5cbiAgLy8gQmluZCBldmVudHMgdG8gdGhlIGltYWdlc0xvYWRlZCBwbHVnaW4gaGVyZVxuICAkKGRvY3VtZW50KS5vbihcImltZ0xvYWRlZFwiLCBmdW5jdGlvbiAoIGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJpbWFnZSBsb2FkZWQgY3VzdG9tIGV2ZW50XCIpO1xuICAgIC8vIGNoZWNrIGlmIHBhZ2UgaGFzIGdhbGxlcnlcbiAgICBpZiAoICQoXCIuZ2FsbGVyeS1jb250YWluZXJcIikubGVuZ3RoID4gMCApIHtcbiAgICAgIElzb3RvcGVHYWxsZXJ5LmluaXQoKTtcbiAgICB9XG4gICAgSGVhZGVyU2xpZGVyLmluaXQoKTtcbiAgICBTaG93Y2FzZVNsaWRlci5pbml0KCk7XG5cbiAgfSk7XG5cbn0pKCk7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vLi4vcGFydGlhbHMvdXRpbHNcIjtcblxuY2xhc3MgU2VhcmNoQ29tcG9uZW50IHtcbiAgJHNlYXJjaFRyaWdnZXI6IEpRdWVyeTtcbiAgJHNlYXJjaENsb3NlVHJpZ2dlcjogSlF1ZXJ5O1xuICAkc2VhcmNoRm9ybTogSlF1ZXJ5O1xuICAkc2VhcmNoQnV0dG9uQXJlYTogSlF1ZXJ5O1xuICAkaWNvbjogSlF1ZXJ5O1xuICAkZm9ybTogSlF1ZXJ5O1xuICAkaW5wdXQ6IEpRdWVyeTtcbiAgJHdpZHRoOiBudW1iZXI7XG4gICRoZWlnaHQ6IG51bWJlcjtcbiAgaXNPcGVuOiBib29sZWFuO1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlciA9ICQoXCIubWV0YS1zZWFyY2gtdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIgPSAkKFwiLnN1cGVyLXNlYXJjaC1jbG9zZVwiKTtcbiAgICB0aGlzLiRzZWFyY2hGb3JtID0gJChcIi5zdXBlci1zZWFyY2hcIik7XG4gICAgdGhpcy4kc2VhcmNoQnV0dG9uQXJlYSA9ICQoXCIubWV0YS1zZWFyY2hcIik7XG4gICAgdGhpcy4kaWNvbiA9IHRoaXMuJHNlYXJjaFRyaWdnZXIuY2hpbGRyZW4oXCJpXCIpO1xuICAgIHRoaXMuJGZvcm0gPSB0aGlzLiRzZWFyY2hGb3JtLmZpbmQoXCIuZXQtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZm9ybS5maXJzdCgpO1xuICAgIHRoaXMuJHdpZHRoID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS53aWR0aCgpO1xuICAgIHRoaXMuJGhlaWdodCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEuaGVpZ2h0KCk7XG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggUmVsb2FkXCIpO1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gJChcIi5ldC1zZWFyY2hcIik7XG4gICAgdGhpcy4kd2lkdGggPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gICAgdGhpcy4kaGVpZ2h0ID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS5oZWlnaHQoKTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gIH1cblxuICBnZXRUb3BQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgfVxuXG4gIGdldExlZnRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9mZnNldCgpLmxlZnQ7XG4gIH1cblxuICBjbG9zZVNlYXJjaCggZXZlbnQgKSB7XG5cbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG4gICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIsIC4yLCB7XG4gICAgICB0b3A6IFwiNSVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kZm9ybSwgLjQsIHtcbiAgICAgIHRvcDogXCIyNSVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgICAgZWFzZTogRXhwby5lYXNlSW5PdXRcbiAgICB9KTtcblxuICAgIGFuaW1hdGlvbi50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogdGhpcy5nZXRMZWZ0UG9zaXRpb24oKSxcbiAgICAgIHRvcDogdGhpcy5nZXRUb3BQb3NpdGlvbigpLFxuICAgICAgd2lkdGg6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgZGVsYXk6IC4zLFxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgd2lkdGg6IFwiMTAwJVwiXG4gICAgICAgIH0pO1xuICAgICAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgICAgICB0b3A6IFwiNTAlXCIsXG4gICAgICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSkudG8odGhpcy4kc2VhcmNoRm9ybSwgLjQsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgICAgICBcInotaW5kZXhcIjogLTEsXG4gICAgICAgICAgXCJsZWZ0XCI6IDAsXG4gICAgICAgICAgXCJ0b3BcIjogMCxcbiAgICAgICAgICBcIndpZHRoXCI6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgICBcImhlaWdodFwiOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgfVxuXG4gIG9wZW5TZWFyY2goZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgLy8gcHJldmVudCBidXR0b24gZnJvbSBiZWluZyB1c2VkIG9uY2Ugc2VhcmNoIGlzIG9wZW5cbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyLmJsdXIoKTtcblxuICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgIGxlZnQ6IHRoaXMuZ2V0TGVmdFBvc2l0aW9uKCksXG4gICAgICB0b3A6IHRoaXMuZ2V0VG9wUG9zaXRpb24oKSxcbiAgICAgIHdpZHRoOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIFwiei1pbmRleFwiOiA5OTlcbiAgICB9KTtcblxuICAgIGxldCBhbmltYXRpb24gPSBuZXcgVGltZWxpbmVMaXRlKCk7XG5cbiAgICBhbmltYXRpb24udG8odGhpcy4kc2VhcmNoRm9ybSwgLjIsIHtcbiAgICAgIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjJcbiAgICB9KS50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgYmFja2dyb3VuZDogXCIjMzUzNzNEXCIsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgb3ZlcmZsb3dZOiBcInNjcm9sbFwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGljb24sIC4yLCB7XG4gICAgICB0b3A6IFwiMTEwJVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyLCAuMywge1xuICAgICAgdG9wOiBcIjMlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjIwJVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjQsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIGxvYWRlZFwiKTtcbiAgICAvLyB0aGlzLm9wZW5TZWFyY2goKTtcbiAgICB0aGlzLiRpbnB1dC5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIC8vIGlmIGtleSBpcyBlbnRlciAtIGFuaW1hdGUgb3V0XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gICAgXG4gICAgJChcImJvZHlcIikua2V5dXAoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAyNyAmJiB0aGlzLmlzT3BlbiApIHtcbiAgICAgICAgdGhpcy5jbG9zZVNlYXJjaChldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubGV0IFNlYXJjaEJveCA9IG5ldyBTZWFyY2hDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQm94OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQgU2VhcmNoQm94IGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5cbmludGVyZmFjZSBOYXZTdGF0ZSB7XG4gIG5hdkVuYWJsZWQ6IGJvb2xlYW47XG4gIG1vYmlsZTogYm9vbGVhbjtcbiAgdGFibGV0OiBib29sZWFuO1xuICBsYXB0b3A6IGJvb2xlYW47XG4gIGRlc2t0b3A6IGJvb2xlYW47XG59XG5cbmNsYXNzIE5hdkNvbXBvbmVudCB7XG4gICRuYXZUcmlnZ2VyOiBIVE1MRWxlbWVudDtcbiAgJG5hdkRyb3Bkb3duOiBIVE1MRWxlbWVudDtcbiAgJGxvd2VyQ29udGFpbmVyOiBKUXVlcnk7XG4gICR1cHBlckNvbnRhaW5lcjogSlF1ZXJ5O1xuICAkbmF2TWV0YTogSlF1ZXJ5O1xuICAkZHJvcERvd25XcmFwcGVyOiBKUXVlcnk7XG4gICRzZWFyY2g6IEpRdWVyeTtcbiAgJGRyb3BEb3duQ29udGVudDogSlF1ZXJ5O1xuXG4gIHN0YXRlOiBOYXZTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuJG5hdlRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJldC1kcm9wZG93bi10cmlnZ2VyXCIpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyID0gJChcIi5sb3dlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lciA9ICQoXCIudXBwZXJjb250YWluZXJcIik7XG4gICAgdGhpcy4kbmF2TWV0YSA9ICQoXCIuZXQtbmF2LW1ldGFcIik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyID0gJChcIi5ldC1kcm9wZG93bi13cmFwcGVyXCIpO1xuICAgIHRoaXMuJHNlYXJjaCA9ICQoXCIjbmF2LXhmZXJcIik7XG4gICAgdGhpcy4kZHJvcERvd25Db250ZW50ID0gJChcIi5ldC1kcm9wZG93bi1jb250ZW50XCIpO1xuXG4gICAgLypcbiAgICAgTmF2IFN0YXRlIE9iamVjdFxuICAgICAqL1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG5cbiAgLy8gTm90IHVzZWRcbiAgcmVsb2FkKCkge1xuXG4gICAgdGhpcy4kbmF2VHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LXRyaWdnZXJcIik7XG4gICAgdGhpcy4kbmF2RHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV0LWRyb3Bkb3duLXRyaWdnZXJcIik7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIgPSAkKFwiLmxvd2VyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyID0gJChcIi51cHBlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiRuYXZNZXRhID0gJChcIi5ldC1uYXYtbWV0YVwiKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIgPSAkKFwiLmV0LWRyb3Bkb3duLXdyYXBwZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoID0gJChcIiNuYXYteGZlclwiKTtcbiAgICB0aGlzLiRkcm9wRG93bkNvbnRlbnQgPSAkKFwiLmV0LWRyb3Bkb3duLWNvbnRlbnRcIik7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICBkZXNrdG9wOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG5cbiAgLypcbiAgIE1vYmlsZSBOYXYgZnVuY3Rpb25hbGl0eVxuICAgKi9cbiAgb3Blbk5hdiggZXZlbnQ6IEV2ZW50ICk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAkKHRoaXMuJG5hdkRyb3Bkb3duKS5hZGRDbGFzcyhcIm1lbnUtaXMtYWN0aXZlXCIpO1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuJG5hdkRyb3Bkb3duLCAuMywge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY2xvc2VOYXYoIGV2ZW50OiBFdmVudCApOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQodGhpcy4kbmF2RHJvcGRvd24pLnJlbW92ZUNsYXNzKFwibWVudS1pcy1hY3RpdmVcIik7XG4gICAgVHdlZW5NYXgudG8odGhpcy4kbmF2RHJvcGRvd24sIC4zLCB7XG4gICAgICAgIHRvcDogXCItMTAwJVwiLFxuICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmF2T3BlbkluaXQoIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJCh0aGlzLiRuYXZUcmlnZ2VyKS5vbihcImNsaWNrXCIsIHRoaXMub3Blbk5hdi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzLiRuYXZUcmlnZ2VyKS5vZmYoKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5hdkNsb3NlKCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuXG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJChcIiNuYXYtY2xvc2VcIikub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlTmF2LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI25hdi1jbG9zZVwiKS5vZmYoKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5hdkl0ZW1DbGljayggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcblxuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5jaGlsZHJlbihcImFcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAkKHRoaXMpO1xuICAgICAgICBzZWxlY3RlZC5uZXh0KFwidWxcIikucmVtb3ZlQ2xhc3MoXCJpcy1oaWRkZW5cIikucGFyZW50KFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikucGFyZW50KFwidWxcIikuYWRkQ2xhc3MoXCJtb3ZlLW91dFwiKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikuY2hpbGRyZW4oXCJhXCIpLm9mZigpO1xuICAgIH1cblxuICB9XG5cbiAgZ29iYWNrKCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuXG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJChcIi5nby1iYWNrID4gYVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9ICQodGhpcyk7XG4gICAgICAgIHNlbGVjdGVkLnBhcmVudChcImxpXCIpLnBhcmVudChcIi5ldC1zZWNvbmRhcnktZHJvcGRvd25cIikuYWRkQ2xhc3MoXCJpcy1oaWRkZW5cIikucGFyZW50KFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikucGFyZW50KFwidWxcIikucmVtb3ZlQ2xhc3MoXCJtb3ZlLW91dFwiKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiLmdvLWJhY2sgPiBhXCIpLm9mZigpO1xuICAgIH1cblxuXG4gIH1cblxuICBtb3ZlTmF2aWdhdGlvbk1vYmlsZSgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiBtb2JpbGVcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guZGV0YWNoKCk7XG4gICAgdGhpcy4kbmF2TWV0YS5kZXRhY2goKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lci5kZXRhY2goKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIuZGV0YWNoKCk7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIuaW5zZXJ0QWZ0ZXIodGhpcy4kdXBwZXJDb250YWluZXIpO1xuICAgIHRoaXMuJG5hdk1ldGEuaW5zZXJ0QmVmb3JlKHRoaXMuJHVwcGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lci5hcHBlbmQodGhpcy4kZHJvcERvd25XcmFwcGVyKTtcbiAgICB0aGlzLiRuYXZNZXRhLmFwcGVuZCh0aGlzLiRzZWFyY2gpO1xuICB9XG5cbiAgbW92ZU5hdmlnYXRpb25UYWJsZXQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJtb3ZlIG5hdmlnYXRpb24gdGFibGV0XCIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLmRldGFjaCgpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyLmRldGFjaCgpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRuYXZNZXRhKTtcbiAgICAvLyB0aGlzLiR1cHBlckNvbnRhaW5lci5hcHBlbmQodGhpcy4kbG93ZXJDb250YWluZXIpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlci5pbnNlcnRBZnRlcih0aGlzLiR1cHBlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyLnByZXBlbmQodGhpcy4kc2VhcmNoKTtcbiAgfVxuXG4gIG1vdmVOYXZpZ2F0aW9uRGVrc3RvcCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiBkZXNrdG9wXCIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLmluc2VydEJlZm9yZSh0aGlzLiRkcm9wRG93bkNvbnRlbnQpO1xuXG4gIH1cblxuICBkaXNhYmxlTW9iaWxlTmF2KCkge1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJOYXYgdHVybmVkIG9mZlwiKTtcbiAgICB0aGlzLm5hdk9wZW5Jbml0KGZhbHNlKTtcbiAgICB0aGlzLm5hdkNsb3NlKGZhbHNlKTtcbiAgICB0aGlzLm5hdkl0ZW1DbGljayhmYWxzZSk7XG4gICAgdGhpcy5nb2JhY2soZmFsc2UpO1xuICAgIHRoaXMuc3RhdGUubmF2RW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgLypcbiAgICAgUmVtb3ZlIFN0eWxlcyBmcm9tIGVsZW1lbnQgJiByZXNldCBkcm9wZG93blxuICAgICAqL1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duQ29udGVudC5yZW1vdmVDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgIGxldCBkcm9wZG93biA9IHRoaXMuJGRyb3BEb3duQ29udGVudC5maW5kKFwiLmV0LXNlY29uZGFyeS1kcm9wZG93blwiKTtcblxuICAgIGRyb3Bkb3duLmVhY2goIChpbmRleCwgZWxlbSkgPT4ge1xuICAgICAgaWYgKCAhJChlbGVtKS5oYXNDbGFzcyhcImlzLWhpZGRlblwiKSApIHtcbiAgICAgICAgJChlbGVtKS5hZGRDbGFzcyhcImlzLWhpZGRlblwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgZW5hYmxlTW9iaWxlTmF2KCkge1xuICAgIGNvbnNvbGUubG9nKFwiTmF2IHR1cm5lZCBvblwiKTtcbiAgICB0aGlzLm5hdk9wZW5Jbml0KHRydWUpO1xuICAgIHRoaXMubmF2Q2xvc2UodHJ1ZSk7XG4gICAgdGhpcy5uYXZJdGVtQ2xpY2sodHJ1ZSk7XG4gICAgdGhpcy5nb2JhY2sodHJ1ZSk7XG5cbiAgICB0aGlzLnN0YXRlLm5hdkVuYWJsZWQgPSB0cnVlO1xuXG4gIH1cblxuICBicmVha1BvaW50TW9iaWxlKCkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBNb2JpbGVcIik7XG5cbiAgICBpZiAoICF0aGlzLnN0YXRlLm5hdkVuYWJsZWQgKSB7XG4gICAgICB0aGlzLmVuYWJsZU1vYmlsZU5hdigpO1xuICAgIH1cbiAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uTW9iaWxlKCk7XG4gIH1cblxuICBicmVha1BvaW50VGFibGV0KCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IFRhYmxldFwiKTtcbiAgICBpZiAoICF0aGlzLnN0YXRlLm5hdkVuYWJsZWQgKSB7XG4gICAgICB0aGlzLmVuYWJsZU1vYmlsZU5hdigpO1xuICAgIH1cblxuICAgIHRoaXMubW92ZU5hdmlnYXRpb25UYWJsZXQoKTtcbiAgfVxuXG4gIGJyZWFrUG9pbnRMYXB0b3AoIHByZXZTdGF0ZSApIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgTGFwdG9wXCIpO1xuXG4gICAgaWYgKCB0aGlzLnN0YXRlLm5hdkVuYWJsZWQgKSB7XG4gICAgICB0aGlzLmRpc2FibGVNb2JpbGVOYXYoKTtcbiAgICB9XG5cbiAgICAvLyBpZiBwcmV2IHN0YXRlIHdhcyB0YWJsZXQgZG8gdGhpczpcbiAgICBpZiAoIHByZXZTdGF0ZS5kZXNrdG9wID09PSBmYWxzZSB8fCBwcmV2U3RhdGUubW9iaWxlID09PSB0cnVlICkge1xuXG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uVGFibGV0KCk7XG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uRGVrc3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIGJyZWFrUG9pbnREZXNrdG9wKCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IERlc2t0b3BcIik7XG5cbiAgICBpZiAoIHByZXZTdGF0ZS5sYXB0b3AgPT09IGZhbHNlIHx8IHByZXZTdGF0ZS5tb2JpbGUgPT09IHRydWUgKSB7XG5cbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25UYWJsZXQoKTtcbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25EZWtzdG9wKCk7XG4gICAgfVxuXG4gIH1cblxuICBuYXZSZXNpemUoKSB7XG4gICAgLypcbiAgICAgTW9iaWxlXG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubW9iaWxlICkge1xuXG4gICAgICBpZiAoICF0aGlzLnN0YXRlLm1vYmlsZSApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50TW9iaWxlKCk7XG4gICAgICB9XG4gICAgICAvLyBUdXJuIG1vYmlsZSBvblxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IHRydWUsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qXG4gICAgIFRhYmxldFxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLnRhYmxldCApIHtcbiAgICAgIGxldCBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgLy8gdGFibGV0IGFuZCBoaWdoZXJcbiAgICAgIC8vIGRvIG9uY2VcbiAgICAgIGlmICggIXRoaXMuc3RhdGUudGFibGV0ICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRUYWJsZXQocHJldlN0YXRlKTtcbiAgICAgIH1cbiAgICAgIC8vIFR1cm4gbW9iaWxlIG9uXG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogdHJ1ZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgTGFwdG9wXG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICBpZiAoICF0aGlzLnN0YXRlLmxhcHRvcCApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50TGFwdG9wKHByZXZTdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IHRydWUsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgRGVza3RvcFxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmRlc2t0b3AgKSB7XG5cbiAgICAgIGxldCBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgICBpZiAoICF0aGlzLnN0YXRlLmRlc2t0b3AgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludERlc2t0b3AocHJldlN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgbmF2TG9hZCgpIHtcbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5tb2JpbGUgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludE1vYmlsZSgpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiB0cnVlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcblxuICAgIH1cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLnRhYmxldCApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50VGFibGV0KHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiB0cnVlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludExhcHRvcCh0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IHRydWUsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmRlc2t0b3AgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludERlc2t0b3AodGhpcy5zdGF0ZSk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiTmF2IGxvYWRlZFwiKTtcblxuICAgIHRoaXMubmF2TG9hZCgpO1xuICAgIC8vIFNlYXJjaEJveC5pbml0KCk7XG5cbiAgICAvKioqKioqKioqKioqKioqKlxuICAgICBOQVYgUkVTSVpFIEVWRU5UXG4gICAgICoqKioqKioqKioqKioqKi9cblxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9ICggZXZlbnQgKSA9PiB7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICAgID8gc2V0VGltZW91dCh0aGlzLm5hdlJlc2l6ZS5iaW5kKHRoaXMpLCAzMDApXG4gICAgICAgIDogd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLm5hdlJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG5cbiAgfVxufVxuXG5sZXQgTmF2ID0gbmV3IE5hdkNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBOYXY7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmRlY2xhcmUgdmFyIElzb3RvcGU6IGFueTtcblxuY2xhc3MgR2FsbGVyeUNvbXBvbmVudCB7XG5cbiAgZ3JpZElkOiBzdHJpbmc7XG4gIGdhbGxlcnlfZ3JpZDogbnVtYmVyO1xuICBnYWxsZXJ5X3dyYXBwZXJfd2lkdGg6IG51bWJlcjtcbiAgJGZ1bGxHcmlkOiBKUXVlcnk7XG4gICRnYWxsZXJ5Q29udGFpbmVyOiBKUXVlcnk7XG4gICRncmlkOiBhbnk7XG4gIGN1cnJlbnRIZWlnaHQ6IHN0cmluZztcbiAgY3VycmVudEhlaWdodFBYOiBudW1iZXI7XG4gIHJlSXNvVGltZU91dDogbnVtYmVyO1xuICBpc0NvbnRhaW5lZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdyaWRJZCA9ICQoXCIuaW5uZXItY29udGVudC1tb2R1bGVcIikuY2hpbGRyZW4oXCJkaXZcIikuYXR0cihcImlkXCIpO1xuICAgIHRoaXMuJGZ1bGxHcmlkID0gJChcIiNcIiArIHRoaXMuZ3JpZElkKTtcbiAgICB0aGlzLiRnYWxsZXJ5Q29udGFpbmVyID0gJChcIi5nYWxsZXJ5LWNvbnRhaW5lclwiKTtcbiAgfVxuXG4gIHNldHVwSXNvdG9wZSgpIHtcbiAgICAvLyBpbml0IGlzb3RvcGVcbiAgICB0aGlzLiRncmlkID0gdGhpcy4kZnVsbEdyaWQuaXNvdG9wZSh7XG4gICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gICAgICBpdGVtU2VsZWN0b3I6IFwiLmdhbGxlcnktaXRlbVwiLFxuICAgICAgaXNJbml0TGF5b3V0OiBmYWxzZSxcbiAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgXCJjb2x1bW5XaWR0aFwiOiBcIi5ncmlkLXNpemVyXCJcbiAgICAgIH0sXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246IFwiLjNzXCJcbiAgICB9KTtcbiAgfVxuXG4gIGdhbGxlcnlJc290b3BlV3JhcHBlcigpIHtcbiAgICBsZXQgd2luZG93V2lkdGhSZWYgPSAkKHdpbmRvdykuaW5uZXJXaWR0aCgpOyAvLyBmb3Igc2Nyb2xsIGJhciBmaXggY3VycmVudGx5XG5cbiAgICAvLyBJcyBjb250YWluZXIgb3IgZnVsbCB3aWR0aD9cbiAgICBpZiAoIHRoaXMuJGdhbGxlcnlDb250YWluZXIuaGFzQ2xhc3MoXCJjb250YWluZXJcIikgKSB7XG4gICAgICB0aGlzLmlzQ29udGFpbmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvL1xuICAgIGlmICggd2luZG93V2lkdGhSZWYgPiAxNjAwICYmIHRoaXMuaXNDb250YWluZWQgPT09IGZhbHNlICkge1xuICAgICAgY29uc29sZS5sb2coXCJncmlkIDVcIik7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDU7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gNjAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAxO1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDk5MSApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMjtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSAxMTk5ICkge1xuICAgICAgY29uc29sZS5sb2coXCJncmlkIDNcIik7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ3JpZCA0XCIpO1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA0O1xuICAgIH1cblxuICAgIGlmICggJChcIi5nYWxsZXJ5LTMtZ3JpZFwiKS5sZW5ndGggPiAwICYmIHdpbmRvd1dpZHRoUmVmID4gMTI0OCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMztcbiAgICB9XG5cbiAgICBpZiAoICQoXCIuZ2FsbGVyeS00LWdyaWRcIikubGVuZ3RoID4gMCAmJiB3aW5kb3dXaWR0aFJlZiA+IDE1ODQgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDQ7XG4gICAgfVxuXG4gICAgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggPSAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLndpZHRoKCk7XG5cbiAgICBpZiAoIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICUgdGhpcy5nYWxsZXJ5X2dyaWQgPiAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggPSB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCArICggdGhpcy5nYWxsZXJ5X2dyaWQgLSB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCAlIHRoaXMuZ2FsbGVyeV9ncmlkKTtcbiAgICB9XG4gICAgJChcIi5nYWxsZXJ5LWlzb3RvcGVcIikuY3NzKFwid2lkdGhcIiwgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeV9ncmlkO1xuICB9XG5cbiAgcmVsb2FkSXNvdG9wKCkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZSgpO1xuICAgIHRoaXMuc2V0TWluSGVpZ2h0KCk7XG4gIH1cblxuICBzZXRNaW5IZWlnaHQoKSB7XG5cbiAgICAvLyBTZXQgbWluIGhlaWdodCBkZXBlbmRpbmcgb25lIHdoYXQgY29udGVudCB3YXMgZmlsdGVyZWRcbiAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSAkKFwiLmdhbGxlcnktaXRlbS53aWR0aDFcIikuY3NzKFwicGFkZGluZy1ib3R0b21cIik7XG4gICAgbGV0IGhlaWdodFN0ciA9IHRoaXMuY3VycmVudEhlaWdodC50b1N0cmluZygpO1xuICAgIHRoaXMuY3VycmVudEhlaWdodFBYID0gdGhpcy5weENvbnZlcnQoaGVpZ2h0U3RyKTtcblxuICAgIGlmICggdGhpcy5jdXJyZW50SGVpZ2h0UFggIT09IDAgKSB7XG5cbiAgICAgICQoXCIuZ2FsbGVyeS1pc290b3BlXCIpLmNzcyhcIm1pbi1oZWlnaHRcIiwgTWF0aC5yb3VuZCh0aGlzLmN1cnJlbnRIZWlnaHRQWCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRIZWlnaHRQWCA9ICQoXCIuZ2FsbGVyeS1pdGVtLndpZHRoMVwiKS5oZWlnaHQoKTtcblxuICAgICAgJChcIi5nYWxsZXJ5LWlzb3RvcGVcIikuY3NzKFwibWluLWhlaWdodFwiLCBNYXRoLnJvdW5kKHRoaXMuY3VycmVudEhlaWdodFBYKSk7XG4gICAgfVxuICB9XG5cbiAgcHhDb252ZXJ0KCBvYmplY3RIZWlnaHQ6IHN0cmluZyApIHtcbiAgICByZXR1cm4gcGFyc2VJbnQob2JqZWN0SGVpZ2h0LnNsaWNlKDAsIC0yKSk7XG4gIH1cblxuICBhZGRJbWFnZVRyYW5zaXRpb24oKSB7XG4gICAgLy8gYWRkIHRyYW5zaXRpb24gZm9yIGludHJvIGFuaW1hdGlvblxuICAgICQoXCIuZ2FsbGVyeS1pdGVtXCIpLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIiwgXCI2MDBtc1wiKTtcbiAgfVxuXG4gIGxvYWRJbWFnZXNJbigpIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoXCJvbmNlXCIsIFwiYXJyYW5nZUNvbXBsZXRlXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gZmFkZSBpblxuICAgICAgJChcIi5nYWxsZXJ5LWl0ZW1cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAgIC8vIHJlbW92ZSBhbmltYXRpb24gZm9yIHNtb290aCBmaWx0ZXJpbmdcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiLmdhbGxlcnktaXRlbVwiKS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiMG1zXCIpO1xuICAgICAgfSwgNTAwKTtcblxuICAgIH0pO1xuICB9XG5cbiAgb25SZXNpemUoKSB7XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZUlzb1RpbWVPdXQpO1xuXG4gICAgLy8gZ2FsbGVyeSBpc290b3BlXG4gICAgaWYgKCAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlJc290b3BlV3JhcHBlcigpO1xuXG4gICAgICAvLyBvbiByZXNpemUgY29tcGxldGUsIHJlYWRqdXN0IGdyaWRcbiAgICAgIHRoaXMucmVJc29UaW1lT3V0ID0gc2V0VGltZW91dCh0aGlzLnJlbG9hZElzb3RvcC5iaW5kKHRoaXMpLCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIG9uRmlsdGVyQ2xpY2soIGVsLCBlbDIgKSB7XG4gICAgbGV0ICR0aGlzID0gJChlbDIudG9FbGVtZW50KTtcblxuICAgICR0aGlzLnBhcmVudCgpLmNoaWxkcmVuKFwibGlcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSk7XG5cbiAgICAkdGhpcy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgbGV0IGZpbHRlclZhbHVlID0gJHRoaXMuYXR0cihcImRhdGEtZmlsdGVyXCIpO1xuXG4gICAgdGhpcy5yZUZpbHRlcihmaWx0ZXJWYWx1ZSk7XG4gIH1cblxuICByZUZpbHRlciggaXRlbSApIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoe1xuICAgICAgZmlsdGVyOiBpdGVtXG4gICAgfSk7XG4gIH1cblxuICAvLyBHZXQgZ3JpZCB0byBhc3NpZ24gZHluYW1pY2FsbHlcblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiSXNvdG9wZSBJbml0XCIpO1xuXG4gICAgLy8gQWRkIHRyYW5zaXRpb24gdG8gYW5pbWF0ZSBpbWFnZSBpbiBncmFjZWZ1bGx5XG4gICAgdGhpcy5hZGRJbWFnZVRyYW5zaXRpb24oKTtcblxuICAgIC8vIFNldHVwIElzb3RvcGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgdGhpcy5zZXR1cElzb3RvcGUoKTtcblxuICAgIC8vIENyZWF0ZSBwZXJmZWN0IGdyaWRcbiAgICB0aGlzLmdhbGxlcnlJc290b3BlV3JhcHBlcigpO1xuXG4gICAgLy8gZGVsYXkgaXNvdG9wZSBpbml0IHVzaW5nIGhlbHBlciBmdW5jdGlvbiB0aGF0IGZpcmVzIG9uIHJlc2l6ZVxuICAgIHNldFRpbWVvdXQodGhpcy5yZWxvYWRJc290b3AuYmluZCh0aGlzKSwgMTAwMCk7XG5cbiAgICAvLyBBbmltYXRlIEltYWdlcyBpbiBvbkxvYWRcbiAgICB0aGlzLmxvYWRJbWFnZXNJbigpO1xuXG4gICAgLy8gQWRkIGZpbHRlciBvbiBDbGlja1xuICAgIGxldCAkdGhpcyA9IHRoaXM7XG4gICAgJChcIi5maWx0ZXItZ3JvdXBcIikub24oXCJjbGlja1wiLCBcImxpXCIsIHRoaXMub25GaWx0ZXJDbGljay5iaW5kKHRoaXMsICR0aGlzKSk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG59XG5cbmxldCBJc290b3BlR2FsbGVyeSA9IG5ldyBHYWxsZXJ5Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IElzb3RvcGVHYWxsZXJ5OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgU2xpZGVyQ29tcG9uZW50IHtcbiAgZ2FsbGVyeTogSlF1ZXJ5O1xuICBjb250YWluZXI6IEpRdWVyeTtcbiAgY2xvc2VCdG46IEpRdWVyeTtcbiAgbmV4dEJ0bjogSlF1ZXJ5O1xuICBwcmV2QnRuOiBKUXVlcnk7XG4gIGluZGV4OiBudW1iZXI7XG4gIGN1cnJlbnRTbGlkZTogbnVtYmVyO1xuICB0b3RhbFNsaWRlOiBudW1iZXI7XG4gIGNvdW50VG90YWw6IEpRdWVyeTtcbiAgY3VycmVudENvdW50OiBKUXVlcnk7XG4gIHNsaWRlck9wZW46IGJvb2xlYW47XG4gIHJlc2l6ZVRpbWVyOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoIGVsICkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChlbCk7XG4gICAgdGhpcy5nYWxsZXJ5ID0gdGhpcy5jb250YWluZXIuZmluZChcIi5oZWFkZXItc2xpZGVyLWdhbGxlcnlcIik7XG4gICAgdGhpcy5jbG9zZUJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuaGVhZGVyLXNsaWRlci1jbG9zZVwiKTtcbiAgICB0aGlzLm5leHRCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNsaWRlci1uYXZpZ2F0aW9uLW5leHRcIik7XG4gICAgdGhpcy5wcmV2QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zbGlkZXItbmF2aWdhdGlvbi1wcmV2XCIpO1xuICAgIHRoaXMuY291bnRUb3RhbCA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIudG90YWxcIik7XG4gICAgdGhpcy5jdXJyZW50Q291bnQgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmN1cnJlbnRcIik7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgdGhpcy5jdXJyZW50U2xpZGUgPSB0aGlzLmluZGV4ICsgMTtcbiAgICB0aGlzLnNsaWRlck9wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy5nYWxsZXJ5LmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRUb3RhbFNsaWRlcygpOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IHRoaXMuZ2FsbGVyeS5jaGlsZHJlbihcImxpXCIpLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTbGlkZTtcbiAgfVxuXG4gIHVwZGF0ZUN1cnJlbnRTbGlkZSggZXZlbnQgKSB7XG5cbiAgICBpZiAoIGV2ZW50ID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZSsrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluZGV4LS07XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZS0tO1xuICAgIH1cblxuICB9XG5cbiAgdXBkYXRlTmF2KCBpbmRleDogbnVtYmVyLCBzZWxlY3RlZDogSlF1ZXJ5ICkge1xuXG4gICAgLy8gdXBkYXRlIG51bWJlcnMgb24gc2NyZWVuXG4gICAgdGhpcy5jdXJyZW50Q291bnQuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRDdXJyZW50U2xpZGVDb3VudCgpKSk7XG5cbiAgICAvLyBFbmFibGUvRGlzYWJsZSBhcnJvdyBidG5zXG4gICAgdGhpcy5wcmV2QnRuLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpmaXJzdC1jaGlsZFwiKSk7XG4gICAgdGhpcy5uZXh0QnRuLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpsYXN0LWNoaWxkXCIpKTtcbiAgfVxuXG4gIHVwZGF0ZVNsaWRlKCBkaXJlY3Rpb24gKSB7XG4gICAgXG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2xhc3MsIHRoZW4gbW92ZSBsZWZ0XG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBjdXJyZW50U2xpZGUubmV4dCgpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2xhc3MsIHRoZW4gbW92ZSBsZWZ0XG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIGN1cnJlbnRTbGlkZS5wcmV2KCkuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGluZGV4XG4gICAgdGhpcy51cGRhdGVDdXJyZW50U2xpZGUoZGlyZWN0aW9uKTtcblxuICAgIC8vIHVwZGF0ZSBOYXZpZ2F0aW9uXG4gICAgdGhpcy51cGRhdGVOYXYodGhpcy5pbmRleCwgdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuICB9XG5cbiAgYXJyb3dIYW5kbGVyKCBldmVudCApIHtcblxuICAgIC8vIGNoZWNrIHdoaWNoIGtleSB3YXMgcHJlc3NlZCBhbmQgbWFrZSBzdXJlIHRoZSBzbGlkZSBpc24ndCB0aGUgYmVnaW5uaW5nIG9yIHRoZSBsYXN0IG9uZVxuICAgIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInJpZ2h0XCIgJiYgdGhpcy5jdXJyZW50U2xpZGUgIT09IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcblxuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgJiYgdGhpcy5zbGlkZXJPcGVuICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDw9IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJsZWZ0XCIgJiYgdGhpcy5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuc2xpZGVyT3BlbiApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDw9IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBvcGVuU2xpZGVyKCBlbCwgZXZlbnQgKSB7XG4gICAgLy8gZWwgPSB0aGlzXG4gICAgLy8gZWwyIGlzIGV2ZW50XG4gICAgaWYgKCAhdGhpcy5jb250YWluZXIuaGFzQ2xhc3MoXCJpcy1hY3RpdmVcIikgJiYgJChldmVudC5jdXJyZW50VGFyZ2V0KS5pcyh0aGlzLmdhbGxlcnkpICkge1xuXG4gICAgICB0aGlzLnNsaWRlck9wZW4gPSB0cnVlO1xuXG4gICAgICB0aGlzLmNvbnRhaW5lci5hZGRDbGFzcyhcImlzLWFjdGl2ZVwiKS5vbmUoXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kXCIsICgpID0+IHtcbiAgICAgICAgJChcImJvZHksaHRtbFwiKS5hbmltYXRlKHsgXCJzY3JvbGxUb3BcIjogdGhpcy5jb250YWluZXIub2Zmc2V0KCkudG9wIH0sIDIwMCk7XG5cbiAgICAgICAgLy8gQ2xvc2UgQnRuIGFuaW1hdGUgaW5cbiAgICAgICAgbGV0IGNsb3NlQnRuQW5pbWF0aW9uID0gVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgeDogLTMwLFxuICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXQsXG4gICAgICAgICAgZGVsYXk6IC4zXG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVNsaWRlciggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2xhc3MoXCJpcy1hY3RpdmVcIik7XG5cbiAgICB0aGlzLnNsaWRlck9wZW4gPSBmYWxzZTtcblxuICAgIFR3ZWVuTGl0ZVxuICAgICAgLnRvKCQod2luZG93KSwgLjUsXG4gICAgICAgIHtcbiAgICAgICAgICBzY3JvbGxUbzogeyB5OiAwIH0sIGVhc2U6IFBvd2VyMi5lYXNlT3V0LFxuICAgICAgICAgIGRlbGF5OiAuNVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgbGV0IGNsb3NlQnRuQW5pbWF0aW9uID0gVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB6OiAuMDAxLFxuICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgICAgICByaWdodDogNTBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5Lm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2xpZGVyLmJpbmQodGhpcywgJHRoaXMpKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdhbGxlcnkub2ZmKCk7XG4gICAgICAgIHRoaXMuY2xvc2VCdG4ub2ZmKCk7XG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgLy8gQ3JlYXRlIEJpbmRpbmcgRXZlbnRzXG4gICAgdGhpcy5jaGVja1NpemUoKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIExlZnQgYW5kIHJpZ2h0IGV2ZW50c1xuICAgIHRoaXMubmV4dEJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJyaWdodFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMucHJldkJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJsZWZ0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBKcXVlcnkga2V5cyBwbHVnaW5cbiAgICAkKGRvY3VtZW50KVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwibGVmdFwiLCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwiZXNjXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSlcbiAgICAgIC5iaW5kKFwia2V5ZG93blwiLCBcInJpZ2h0XCIsIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgLy8gdXBkYXRlIG5hdiBvbiBmaXJzdCBsb2FkXG4gICAgdGhpcy51cGRhdGVOYXYodGhpcy5pbmRleCwgdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRUb3RhbFNsaWRlcygpKSk7XG4gIH1cbn1cblxuLy8gbG9vcCB0aHJvdWdoIGVhY2ggaGVhZGVyIHNsaWRlciBvYmplY3Qgb24gdGhlIHBhZ2VcbmNsYXNzIEhlYWRlclNsaWRlckNvbXBvbmVudCB7XG5cbiAgaXRlbUluZm9XcmFwcGVyOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIgPSAkKFwiLmhlYWRlci1zbGlkZXItY29udGFpbmVyXCIpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkhlYWRlciBTbGlkZXIgaW5pdFwiKTtcblxuICAgIHRoaXMuaXRlbUluZm9XcmFwcGVyLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIC8vIFBhc3MgXCJ0aGlzXCIgdG8gZWFjaCBuZXcgSGVhZGVyIHNsaWRlciBjb21wb25lbnRcbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2xpZGVyQ29tcG9uZW50KGVsKTtcbiAgICAgIHNsaWRlci5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5sZXQgSGVhZGVyU2xpZGVyID0gbmV3IEhlYWRlclNsaWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJTbGlkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5cbmNsYXNzIFN2Z0hlYWRlckNvbXBvbmVudCB7XG4gIHN2ZzogSlF1ZXJ5O1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgd2luZG93OiBKUXVlcnk7XG4gIHdpbldpZHRoOiBudW1iZXI7XG4gIHByb3BvcnRpb246IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN2ZyA9ICQoXCIuZGl2aWRlci1zdmdcIik7XG4gICAgdGhpcy53aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy5wcm9wb3J0aW9uID0gMTg7XG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpbldpZHRoIC8gdGhpcy5wcm9wb3J0aW9uO1xuICB9XG5cbiAgX3NldFdpbmRvd1dpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuICQod2luZG93KS53aWR0aCgpO1xuICB9XG5cbiAgX3NldFN2Z0hlaWdodCgpOiBudW1iZXIge1xuICAgIGxldCBoZWlnaHQgPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpIC8gMTg7XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgcmVzaXplU3ZnKCkge1xuXG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9zZXRTdmdIZWlnaHQoKTtcblxuICAgIC8vIHNldCB3aWR0aCBvZiBpdGVtXG4gICAgLy8gdGhpcy5zdmcuYXR0cihcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuICAgIHRoaXMuc3ZnLmNzcyhcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuXG4gICAgLy8gc2V0IGhlaWdodCBwcm9wb3J0aW9uIG9mIDI4XG4gICAgdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zdmcuaGVpZ2h0KHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGFuaW1hdGVJbigpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFuaW1hdGUgSW5cIik7XG5cbiAgICB0aGlzLnN2ZyA9ICQoXCIuZGl2aWRlci1zdmdcIik7XG4gICAgdGhpcy5wcm9wb3J0aW9uID0gMTg7XG4gICAgdGhpcy53aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMud2luZG93LndpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpbldpZHRoIC8gdGhpcy5wcm9wb3J0aW9uO1xuXG4gICAgLy8gc2V0IHdpZHRoIG9mIGl0ZW1cbiAgICB0aGlzLnN2Zy5hdHRyKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG5cbiAgICAvLyBzZXQgaGVpZ2h0IHByb3BvcnRpb24gb2YgMjhcbiAgICB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN2Zy5oZWlnaHQodGhpcy5oZWlnaHQpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuc3ZnLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBib3R0b206IFwiLTNweFwiLFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlN2ZyBoZWFkZXIgbG9hZGVkXCIpO1xuXG4gICAgLy8gdGhpcy5zdmcuaGVpZ2h0KHRoaXMuX3NldFN2Z0hlaWdodCgpKTtcbiAgICAvLyB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuX3NldFN2Z0hlaWdodCgpKTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLnN2ZywgLjEsIHtcbiAgICAgIHk6IFwiM1wiLFxuICAgICAgejogXCIuMDAxXCIsXG4gICAgICB3aWR0aDogdGhpcy5fc2V0V2luZG93V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5fc2V0U3ZnSGVpZ2h0KCksXG4gICAgICBkZWxheTogMCxcbiAgICAgIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCJcbiAgICB9KTtcblxuXG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5yZXNpemVTdmcuYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgfVxufVxuXG5sZXQgU3ZnSGVhZGVyID0gbmV3IFN2Z0hlYWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdmdIZWFkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbi8vIFRPRE86IFNpZGViYXIgaW1hZ2UgbG9hZGluZ1xuY2xhc3MgSW1hZ2VMb2FkZXJDb21wb25lbnQge1xuICBhcnI6IHN0cmluZ1tdO1xuICBib2R5OiBKUXVlcnk7XG4gIGNvbnRlbnQ6IEpRdWVyeTtcbiAgaGVybzogSlF1ZXJ5O1xuICBoYXNIZXJvOiBudW1iZXI7XG4gIGJnSW1hZ2U6IEpRdWVyeTtcbiAgaGFzQmdJbWFnZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXJyID0gW107XG4gICAgdGhpcy5ib2R5ID0gJChcImJvZHlcIik7XG4gICAgdGhpcy5jb250ZW50ID0gJChcIiNjb250ZW50XCIpO1xuICAgIHRoaXMuaGVybyA9ICQoXCIuaGVyb1wiKTtcbiAgICB0aGlzLmhhc0hlcm8gPSB0aGlzLmhlcm8ubGVuZ3RoO1xuICAgIHRoaXMuYmdJbWFnZSA9ICQoXCIuaW1nLWxvYWRlci1iZ1wiKTtcbiAgICB0aGlzLmhhc0JnSW1hZ2UgPSB0aGlzLmJnSW1hZ2UubGVuZ3RoO1xuICB9XG5cbiAgYW5pbWF0ZUJsb2dQcmltYXJ5KCk6IHZvaWQge1xuICAgIGxldCBibG9nUHJpbWFyeSA9ICQoXCIucHJpbWFyeVwiKTtcbiAgICBsZXQgYmxvZ0JnSW1hZ2UgPSBibG9nUHJpbWFyeS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuXG4gICAgaWYgKCBibG9nQmdJbWFnZSAhPT0gXCJub25lXCIgKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBUd2VlbkxpdGVcbiAgICAgICAgICAudG8oYmxvZ1ByaW1hcnksIC4zLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB6OiBcIi4wMDFcIixcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfSwgMzAwKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZW1vdmVcbiAgLy8gYW5pbWF0ZUhlcm9IZWFkZXIoKTogdm9pZCB7XG4gIC8vICAgbGV0IGIgPSB0aGlzLmhlcm8uZmluZChcIi5oZXJvLWJhY2tncm91bmRcIikuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKTtcbiAgLy9cbiAgLy8gICBpZiAoIGIgIT09IFwibm9uZVwiICkge1xuICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gIC8vXG4gIC8vICAgICAgIHRoaXMuaGVyby5hZGRDbGFzcyhcImxvYWRlZFwiKTtcbiAgLy9cbiAgLy8gICAgICAgVHdlZW5MaXRlXG4gIC8vICAgICAgICAgLnRvKHRoaXMuaGVybywgLjQsXG4gIC8vICAgICAgICAgICB7XG4gIC8vICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgKTtcbiAgLy8gICAgIH0sIDMwMCk7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy9cbiAgLy8gICAgIHRoaXMuaGVyby5hZGRDbGFzcyhcImxvYWRlZFwiKTtcbiAgLy9cbiAgLy8gICB9XG4gIC8vIH1cblxuICBhbmltYXRlQmxvZ0FydGljbGVzKCk6IHZvaWQge1xuICAgIGxldCBhbmltYXRlID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGFuaW1hdGUudG8odGhpcy5hcnJbIGkgXSwgMC4xLCB7IG9wYWNpdHk6IFwiMVwiLCBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByZWxvYWRJbWFnZXMoKTogdm9pZCB7XG4gICAgdGhpcy5hcnIgPSBbXTtcblxuICAgIHRoaXMuY29udGVudC5pbWFnZXNMb2FkZWQoeyBiYWNrZ3JvdW5kOiB0cnVlIH0sICgpID0+IHtcblxuICAgICAgICAvLyBCbG9nIHByaW1hcnkgYXJ0aWNsZVxuICAgICAgICB0aGlzLmJvZHkuaGFzQ2xhc3MoXCJibG9nXCIpID8gdGhpcy5hbmltYXRlQmxvZ1ByaW1hcnkoKSA6IFwiXCI7XG5cbiAgICAgICAgLy8gSGVybyBoZWFkZXIgaW50cm9cbiAgICAgICAgLy8gdGhpcy5oYXNIZXJvID4gMCA/IHRoaXMuYW5pbWF0ZUhlcm9IZWFkZXIoKSA6IFwiXCI7XG4gICAgICAgIHRoaXMuaGFzQmdJbWFnZSA+IDAgPyB0aGlzLmJnSW1hZ2UuYWRkQ2xhc3MoXCJsb2FkZWRcIikgOiBcIlwiO1xuXG4gICAgICB9KVxuICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoIGluc3RhbmNlICkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBpbWFnZXMgbG9hZGVkXCIpO1xuICAgICAgfSlcbiAgICAgIC5kb25lKCggaW5zdGFuY2UgKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBzdWNjZXNzZnVsbHkgbG9hZGVkXCIpO1xuXG4gICAgICAgIC8vIEFuaW1hdGlvbiBmb3IgQmxvZyBpbmRleCBob21lcGFnZVxuICAgICAgICB0aGlzLmFuaW1hdGVCbG9nQXJ0aWNsZXMoKTtcbiAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcihcImltZ0xvYWRlZFwiKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEV4YW1wbGUgb24gaG93IHRvIHRyaWdnZXIgZXZlbnRzIGVsc2V3aGVyZVxuICAgICAgICAvLyAkKGRvY3VtZW50KS5vbihcImltZ0xvYWRlZFwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcImltYWdlIGxvYWRlZCBjdXN0b20gZXZlbnRcIik7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICB9KVxuICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBpbWFnZXMgbG9hZGVkLCBhdCBsZWFzdCBvbmUgaXMgYnJva2VuXCIpO1xuICAgICAgfSlcbiAgICAgIC5wcm9ncmVzcygoIGluc3RhbmNlLCBpbWFnZSApID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGltYWdlLmlzTG9hZGVkID8gXCJsb2FkZWRcIiA6IFwiYnJva2VuXCI7XG5cbiAgICAgICAgaWYgKCByZXN1bHQgKSB7XG4gICAgICAgICAgdGhpcy5hcnIucHVzaChpbWFnZS5pbWcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW1hZ2UgaXMgXCIgKyByZXN1bHQgKyBcIiBmb3IgXCIgKyBpbWFnZS5pbWcuc3JjKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcblxuICAgIGNvbnNvbGUubG9nKFwiSW1hZ2UgUHJlbG9hZGVyIE1vZHVsZVwiKTtcblxuICAgIHRoaXMucHJlbG9hZEltYWdlcygpO1xuICB9XG59XG5cbmxldCBJbWFnZUxvYWRlciA9IG5ldyBJbWFnZUxvYWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxvYWRlcjsiLCJkZWNsYXJlIHZhciBTY3JvbGxNYWdpYzogYW55O1xuY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuY2xhc3MgQW5pbWF0aW9uQ29tcG9uZW50IHtcblxuICBjb250YWluZXI6IEpRdWVyeTtcbiAgaXRlbTogSlF1ZXJ5O1xuICBtU2NlbmU6IEpRdWVyeTtcbiAgc2VydmljZVNpZGVCYXI6IEpRdWVyeTtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChcIi5wcm9jZXNzLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLml0ZW0gPSAkKFwiLnByb2Nlc3MtaXRlbS1jb250YWluZXJcIik7XG4gICAgdGhpcy5tU2NlbmUgPSAkKFwiLm0tc2NlbmVcIik7XG4gICAgdGhpcy5zZXJ2aWNlU2lkZUJhciA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gIH1cblxuICBkZXNjX29fYW5pbWF0ZSgpIHtcbiAgICBpZiAoICQoXCIuZGVzYy1vLWFuaW1hdGVcIikubGVuZ3RoID4gMCApIHtcbiAgICAgIGxldCB3aXBlQW5pbWF0aW9uID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICB3aXBlQW5pbWF0aW9uLmFkZChbXG4gICAgICAgIFR3ZWVuTWF4LmZyb21UbygkKFwiLmRlc2Mtby1pbWFnZS0xXCIpLCAxLCB7IHlQZXJjZW50OiAwIH0sIHsgeVBlcmNlbnQ6IC0yMCwgZWFzZTogUG93ZXIwLmVhc2VJbk91dCB9KVxuICAgICAgXSk7XG5cbiAgICAgIGxldCB3aXBlQW5pbWF0aW9uMiA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgd2lwZUFuaW1hdGlvbjIuYWRkKFtcbiAgICAgICAgVHdlZW5NYXguZnJvbVRvKCQoXCIuZGVzYy1vLWltYWdlLTJcIiksIDEsIHsgeVBlcmNlbnQ6IDAsIH0sIHsgeVBlcmNlbnQ6IC0xMDUsIGVhc2U6IFBvd2VyMC5lYXNlSW5PdXQgfSlcbiAgICAgIF0pO1xuXG4gICAgICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cbiAgICAgIGxldCBzY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgICAge1xuICAgICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5kZXNjLW8tYW5pbWF0ZVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAkKFwiLmRlc2Mtby1hbmltYXRlXCIpLmhlaWdodCgpLFxuICAgICAgICAgIG9mZnNldDogLTEwMFxuICAgICAgICB9KVxuICAgICAgLy8gLnNldFBpbihcIi5kZXNjLW8taW1hZ2UtMVwiKVxuICAgICAgICAuc2V0VHdlZW4od2lwZUFuaW1hdGlvbilcbiAgICAgICAgLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBFbClcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgICAuYWRkVG8oY29udHJvbGxlcik7XG5cbiAgICAgIGxldCBzY2VuZTIgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICAgIHtcbiAgICAgICAgICB0cmlnZ2VyRWxlbWVudDogXCIuZGVzYy1vLWFuaW1hdGVcIixcbiAgICAgICAgICBkdXJhdGlvbjogJChcIi5kZXNjLW8tYW5pbWF0ZVwiKS5oZWlnaHQoKSArIDEwMCxcbiAgICAgICAgfSlcbiAgICAgIC8vIC5zZXRQaW4oXCIuZGVzYy1vLWltYWdlLTFcIilcbiAgICAgICAgLnNldFR3ZWVuKHdpcGVBbmltYXRpb24yKVxuICAgICAgICAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMiAoZHVyYXRpb246IEVsKVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAgIC5hZGRUbyhjb250cm9sbGVyKTtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzQW5pbWF0ZUluKCkge1xuICAgIGxldCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbTtcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG4gICAgbGV0IHNjZW5lID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKFxuICAgICAge1xuICAgICAgICB0cmlnZ2VyRWxlbWVudDogXCIucHJvY2Vzcy1jb250YWluZXJcIixcbiAgICAgICAgZHVyYXRpb246IGNvbnRhaW5lci5oZWlnaHQoKSxcbiAgICAgICAgLy8gb2Zmc2V0OiB0aGlzLmFzaWRlT2Zmc2V0LFxuICAgICAgfSlcbiAgICAgIC5vbihcImVudGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXRlbS5maW5kKFwiLnByb2Nlc3MtaXRlbS1pbm5lclwiKS5hZGRDbGFzcyhcImluXCIpO1xuICAgICAgICBjb250YWluZXIuZmluZChcImltZ1wiKS5hZGRDbGFzcyhcImluXCIpO1xuICAgICAgfSlcbiAgICAgIC8vIC5hZGRJbmRpY2F0b3JzKHsgbmFtZTogXCIxIChkdXJhdGlvbjogb2Zmc2V0PylcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgLmFkZFRvKGNvbnRyb2xsZXIpO1xuICB9XG5cbiAgYW5pbWF0ZVdpbmRvd1RvcCgpIHtcbiAgICBjb25zb2xlLmxvZyhcImFuaW1hdGUgVG9wXCIpO1xuICAgIFR3ZWVuTGl0ZVxuICAgICAgLnRvKCQod2luZG93KSwgLjMsXG4gICAgICAgIHtcbiAgICAgICAgICBzY3JvbGxUbzoge1xuICAgICAgICAgICAgeTogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG4gIGFuaW1hdGVTZXJ2aWNlU2lkZWJhck91dCgpIHtcbiAgICBUd2VlbkxpdGUudG8odGhpcy5zZXJ2aWNlU2lkZUJhciwgLjMsIHtcbiAgICAgIHg6IFwiLTEwMFwiLFxuICAgICAgejogXCIuMDAxXCIsXG4gICAgICBkZWxheTogMCxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiLFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAvLyByZW1vdmUgc2lkZWJhciBodG1sIGVsZW1lbnQgc28gaXQgZG9lc250IHNob3cgdXAgYWdhaW4gd2hlbiBzY3JvbGxpbmcgdXBcbiAgICAgICAgdGhpcy5zZXJ2aWNlU2lkZUJhci5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRVcmwoIHVybCApIHtcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICB9XG5cbiAgbWFpbkNvbnRlbnRBbmltYXRpb25PdXQoIGNhbGxiYWNrICkge1xuXG4gICAgLy8gTG9hZCBpbiBhbmltYXRpb25zIGhlcmVcbiAgICB0aGlzLmFuaW1hdGVTZXJ2aWNlU2lkZWJhck91dCgpO1xuXG5cbiAgICB0aGlzLm1TY2VuZS5hZGRDbGFzcyhcImlzLWV4aXRpbmdcIilcbiAgICAgIC8vIElmIGhhcyB3ZWJraXRBbmltYXRpb25FbmQgLSBpdCBnZXRzIGNhbGxlZCB0d2ljZVxuICAgICAgLm9uZShcIm9hbmltYXRpb25lbmQgbXNBbmltYXRpb25FbmQgYW5pbWF0aW9uZW5kXCIsICgpID0+IHtcblxuICAgICAgICAvLyBMb2FkIGluIGFuaW1hdGlvbnMgaGVyZSB0aGF0IG5lZWQgdG8gb2NjdXIgYWZ0ZXIgbWFpbiBvbmVzXG4gICAgICAgIHRoaXMuYW5pbWF0ZVdpbmRvd1RvcCgpO1xuXG4gICAgICB9KTtcblxuICAgIGlmICggdHlwZW9mKGNhbGxiYWNrKSA9PT0gXCJmdW5jdGlvblwiICkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNoZWNrVXJsKCB1cmwgKTogYm9vbGVhbiB7XG4gICAgaWYgKCB1cmwubWF0Y2goL14jLykgIT09IG51bGwgfHwgdXJsID09PSBcIlwiICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnbG9iYWxDbGlja0NoZWNrKCBldmVudD8gKSB7XG5cbiAgICAvLyBHZXQgdXJsIGZyb20gdGhlIGEgdGFnXG4gICAgbGV0IG5ld1VybCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcImhyZWZcIik7XG4gICAgbGV0IGhhc0NoaWxkcmVuID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoXCJsaVwiKS5oYXNDbGFzcyhcIm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIik7XG5cbiAgICAvKlxuICAgICAqIEZpcnN0IFZhbGlkYXRpb246IElzIHRoZSB1cmwgdmFsaWRcbiAgICAgKi9cbiAgICBpZiAoICF0aGlzLmNoZWNrVXJsKG5ld1VybCkgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogSWYgZmlyc3QgdmFsaWRhdGlvbiBmYWlscywgdGhlIHVybCBpcyByZWFsIGFuZCBjb250aW51ZSB2YWxpZGF0aW5nXG4gICAgICovXG4gICAgLypcbiAgICAgKiBDaGVjayBpZiBpdHMgaG9yaXpvbnRhbCB0YWJsZXRcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPiBVdGlscy5icHMudGFibGV0ICYmXG4gICAgICB0aGlzLmNoZWNrVXJsKG5ld1VybCkgJiZcbiAgICAgIFV0aWxzLmJyb3dzZXIgPT09IFwiaXBhZFwiICYmIGhhc0NoaWxkcmVuICkge1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gY29uc29sZS5sb2coJ1RhYmxldCBOYXYgY2xpY2snKTtcbiAgICAgIHJldHVybjtcblxuICAgIH0gZWxzZSBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPiBVdGlscy5icHMudGFibGV0ICYmIHRoaXMuY2hlY2tVcmwobmV3VXJsKSApIHtcblxuICAgICAgLypcbiAgICAgICAqIENoZWNrIGlmIGl0cyBsYXJnZXIgdGhhbiB0YWJsZXQgYnV0IG5vdCBhbiBpcGFkXG4gICAgICAgKi9cblxuICAgICAgLy8gY29uc29sZS5sb2coXCJsYXB0b3Agb3IgbGFyZ2VyXCIpO1xuICAgICAgdGhpcy5tYWluQ29udGVudEFuaW1hdGlvbk91dCggKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICggdGhpcy5jaGVja1VybChuZXdVcmwpICYmIGhhc0NoaWxkcmVuICkge1xuXG4gICAgICAvKlxuICAgICAgICogQ2hlY2sgaWYgaXRzIG1vYmlsZSBuYXYgbWVudSB0aGF0IGhhcyBjaGlsZHJlblxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW9iaWxlIG1lbnUgaXMgYWN0aXZlIGFuZCBwYXJlbnQgY2xpY2tlZFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogUGFzc2VkIHRoZSBjaGVja3MgTG9hZCBpdCFcbiAgICAgICAqL1xuXG4gICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICB9XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5wcm9jZXNzQW5pbWF0ZUluKCk7XG4gICAgdGhpcy5kZXNjX29fYW5pbWF0ZSgpO1xuXG4gICAgLy8gQ2xpY2sgZXZlbnQgdG8gY29udHJvbCB3aW5kb3cgTG9hZGluZ1xuICAgICQoXCJhXCIpLm9uKFwiY2xpY2tcIiwgKCBlICkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5nbG9iYWxDbGlja0NoZWNrKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gQ3VzdG9tIGV2ZW50IGV4YW1wbGVcbiAgICAvLyAkKGRvY3VtZW50KS5vbihcInRlc3RcIiwge30sICggZXZlbnQsIGFyZzEsIGFyZzIgKSA9PiB7XG4gICAgLy9cbiAgICAvLyAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJnMSk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZzIpO1xuICAgIC8vICAgfVxuICAgIC8vXG4gICAgLy8gfSkuYmluZCh0aGlzKTtcbiAgfVxufVxuXG5sZXQgQW5pbWF0aW9uQ29udHJvbGxlciA9IG5ldyBBbmltYXRpb25Db21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgQW5pbWF0aW9uQ29udHJvbGxlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cblxuaW50ZXJmYWNlIFF1b3RlU3RhdGVJbnRlcmZhY2Uge1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBpc0Zvcm1BY3RpdmU6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBRdW90ZVNlbGVjdGVkT2JqZWN0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgcHJpY2U6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgYnVsbGV0czogT2JqZWN0O1xuICBpbWdTcmM6IHN0cmluZztcbn1cblxuY2xhc3MgUXVvdGVDb21wb25lbnQge1xuXG4gIHNlbGVjdEJ0bjogSlF1ZXJ5O1xuICBzd2l0Y2hCdG46IEpRdWVyeTtcbiAgZm9ybUJ1aWxkZXI6IEpRdWVyeTtcbiAgcXVvdGVDaG9vc2VyOiBKUXVlcnk7XG4gIGlucHV0czogSlF1ZXJ5O1xuICBxdW90ZUl0ZW1zQXJyYXk6IEpRdWVyeTtcbiAgc2VsZWN0Q29uYWluZXI6IEpRdWVyeTtcbiAgc3RhdGU6IFF1b3RlU3RhdGVJbnRlcmZhY2U7XG4gIHF1b3RlQ29udGFpbmVyOiBKUXVlcnk7XG4gIHNlbGVjdGVkSXRlbTogUXVvdGVTZWxlY3RlZE9iamVjdDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1b3RlQ29udGFpbmVyID0gJChcIi5xdW90ZVwiKTtcbiAgICB0aGlzLnNlbGVjdEJ0biA9ICQoXCIucXVvdGVfX3NlbGVjdC0tYnRuXCIpO1xuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5ID0gJChcIi5xdW90ZV9faXRlbVwiKTtcbiAgICB0aGlzLmZvcm1CdWlsZGVyID0gJChcIi5xdW90ZV9fZm9ybS0taW5wdXRcIik7XG4gICAgdGhpcy5xdW90ZUNob29zZXIgPSAkKFwiLnF1b3RlX19mb3JtLS1zZWxlY3RcIik7XG4gICAgdGhpcy5zZWxlY3RDb25haW5lciA9IHRoaXMuc2VsZWN0QnRuLmZpbmQoXCIuZmllbGRzZXRcIik7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkOiAnJyxcbiAgICAgIGlzRm9ybUFjdGl2ZTogZmFsc2VcbiAgICB9O1xuXG4gIH1cblxuICBzZXRXaWR0aCggbGFiZWw6IEpRdWVyeSApIHtcblxuICAgIGxldCBsYWJlbFdpZHRoID0gbGFiZWwub3V0ZXJXaWR0aCgpO1xuICAgIHRoaXMuc3dpdGNoQnRuLmNzcyhcIndpZHRoXCIsIGxhYmVsV2lkdGgpO1xuXG4gIH1cblxuICBidWlsZFNlbGVjdEJveCgpIHtcblxuICAgIGxldCBuYW1lcyA9IFtdO1xuICAgIGxldCBmcmFnbWVudCA9ICQoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcblxuICAgIC8vIGdldCBoMiB0aXRsZXMgZnJvbSBlYWNoIHF1b3RlIGl0ZW1cbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgdGl0bGUgPSAkdGhpcy5maW5kKFwiaDJcIikudGV4dCgpLFxuICAgICAgICBuYW1lID0gdGl0bGUudG9Mb2NhbGVMb3dlckNhc2UoKSxcbiAgICAgICAgdW5pcXVlSWQgPSBuYW1lICsgXCItXCIgKyBpbmRleDtcblxuICAgICAgLy8gQWRkIG1hdGNoaW5nIElEJ3MgdG8gZWFjaCBDYXJkXG4gICAgICAkdGhpcy5hdHRyKFwiaWRcIiwgdW5pcXVlSWQpO1xuXG4gICAgICAvLyBDcmVhdGUgaW5wdXQgYW5kIGxhYmVsIERPTSBlbGVtZW50c1xuICAgICAgbGV0IGlucHV0ID0gVXRpbHMuYnVpbGRIdG1sKFwiaW5wdXRcIiwge1xuICAgICAgICBpZDogdW5pcXVlSWQsXG4gICAgICAgIHR5cGU6IFwicmFkaW9cIixcbiAgICAgICAgY2xhc3M6IFwicXVvdGVfX2lucHV0XCIsXG4gICAgICAgIG5hbWU6IHVuaXF1ZUlkLFxuICAgICAgICB2YWx1ZTogbmFtZVxuICAgICAgfSk7XG5cbiAgICAgIGxldCBsYWJlbCA9IFV0aWxzLmJ1aWxkSHRtbChcImxhYmVsXCIsIHtcbiAgICAgICAgZm9yOiB1bmlxdWVJZCxcbiAgICAgICAgY2xhc3M6IGluZGV4ID09PSAwID8gXCJzZWxlY3RlZFwiIDogXCJcIlxuICAgICAgfSwgdGl0bGUpO1xuXG5cbiAgICAgIGZyYWdtZW50LmFwcGVuZChpbnB1dCkuYXBwZW5kKGxhYmVsKTtcblxuICAgIH0pO1xuXG4gICAgZnJhZ21lbnQuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInF1b3RlX19zd2l0Y2hcIj48L3NwYW4+Jyk7XG5cbiAgICB0aGlzLnNlbGVjdENvbmFpbmVyLmFwcGVuZChmcmFnbWVudCk7XG5cbiAgfVxuXG4gIGJ1aWxkU2VsZWN0RXZlbnRIYW5kbGVycygpIHtcbiAgICB0aGlzLmlucHV0cyA9IHRoaXMuc2VsZWN0QnRuLmZpbmQoXCIucXVvdGVfX2lucHV0XCIpO1xuICAgIHRoaXMuc3dpdGNoQnRuID0gJChcIi5xdW90ZV9fc3dpdGNoXCIpO1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGVhY2ggaXRlbSBhbmQgc2V0IHdpZHRoIGFuZCBjaGFuZ2UgZXZlbnRzIGFuZCBjaGVja2VkIHN0YXR1c1xuICAgIHRoaXMuaW5wdXRzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9ICQoZWwpLFxuICAgICAgICBuZXh0TGFiZWwgPSAkdGhpcy5uZXh0KCk7XG5cbiAgICAgIGlmICggaW5kZXggPT09IDAgKSB7XG4gICAgICAgICR0aGlzLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xuXG4gICAgICAgIC8vIHNldCBzdGF0ZSB0byBjdXJyZW50IHNlbGVjdGVkIGlucHV0IElEXG4gICAgICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgPSAkdGhpcy5hdHRyKFwiaWRcIik7XG4gICAgICB9XG5cbiAgICAgIC8vIGZpbmQgU2VsZWN0ZWQsIGdldCB3aWR0aCBvZiBsYWJlbCwgc2V0IHdpZHRoIG9mIHNwYW5cbiAgICAgIGlmICggbmV4dExhYmVsLmhhc0NsYXNzKFwic2VsZWN0ZWRcIikgKSB7XG4gICAgICAgIHRoaXMuc2V0V2lkdGgobmV4dExhYmVsKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIG9uIGNoYW5nZSBmdW5jdGlvbiBoZXJlXG4gICAgICAkdGhpcy5jaGFuZ2UodGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGJ1aWxkQ2FyZEV2ZW50SGFuZGxlcnMoKSB7XG5cbiAgICAvLyBNYWluIENhcmRzXG4gICAgdGhpcy5xdW90ZUl0ZW1zQXJyYXkuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gJChlbCksXG4gICAgICAgIGJ1dHRvbiA9ICR0aGlzLmZpbmQoXCIuY2FyZF9faXRlbS0tYnRuXCIpO1xuXG4gICAgICBidXR0b24ub24oXCJjbGlja1wiLCB0aGlzLm9wZW5Gb3JtLmJpbmQodGhpcykpO1xuXG4gICAgfSk7XG5cbiAgICAvLyBCYWNrIGJ1dHRvbiBmb3IgdGFibGV0XG4gICAgbGV0IGJ1dHRvbiA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi50YWJsZXRcIikuZmluZChcIi5nby1iYWNrXCIpO1xuICAgIGJ1dHRvbi5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VGb3JtLmJpbmQodGhpcykpO1xuXG4gIH1cblxuICBmYWRlSW4oIGVsOiBKUXVlcnkgKSB7XG5cbiAgICBUd2Vlbk1heC50byhlbCwgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBkZWxheTogLjNcbiAgICB9KTtcblxuICB9XG5cbiAgb25DaGFuZ2UoIGUgKSB7XG5cbiAgICBsZXQgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCksXG4gICAgICBmaWVsZHNldCA9ICR0aGlzLnBhcmVudChcIi5maWVsZHNldFwiKSxcbiAgICAgIHByZXZJdGVtID0gZmllbGRzZXQuZmluZChcIi5zZWxlY3RlZFwiKSxcbiAgICAgIHByZXZXaWR0aCA9IHByZXZJdGVtLm91dGVyV2lkdGgoKSAtIDEsXG4gICAgICBpbnB1dElkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuXG4gICAgLy8gcmVtb3ZlIHNlbGVjdGVkIGZyb20gUHJldiBMYWJlbFxuICAgIGZpZWxkc2V0LmZpbmQoXCJsYWJlbFwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgLy8gcmVtb3ZlIGNoZWNrZWQgc3RhdGUgZnJvbSBwcmV2IGlucHV0XG4gICAgcHJldkl0ZW0ucHJldihcImlucHV0XCIpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcblxuICAgIC8vIHNldCBuZXcgaXRlbSB0byBzZWxlY3RlZCBhbmQgY2hlY2tlZFxuICAgIGxldCBzZWxlY3RlZExhYmVsID0gZmllbGRzZXQuZmluZChcImxhYmVsW2Zvcj1cIiArIGlucHV0SWQgKyBcIl1cIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAkdGhpcy5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcblxuICAgIC8vIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaW5wdXQgbWF0Y2hlcyB0aGUgMm5kIGl0ZW0gLSB0aGVuIG1vdmUgc3dpdGNoQnRuIHJpZ2h0LCBvdGhlcndpc2UgYmFjayB0byBwb3NpdGlvbiAxXG4gICAgaWYgKCBpbnB1dElkID09PSAkKHRoaXMuaW5wdXRzWyAxIF0pLmF0dHIoXCJpZFwiKSApIHtcbiAgICAgIHRoaXMuc3dpdGNoQnRuLmNzcyh7XG4gICAgICAgIFwid2Via2l0VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHByZXZXaWR0aCArIFwicHgpXCIsXG4gICAgICAgIFwiTW96VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHByZXZXaWR0aCArIFwicHgpXCIsXG4gICAgICAgIFwibXNUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJPVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHByZXZXaWR0aCArIFwicHgpXCIsXG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHByZXZXaWR0aCArIFwicHgpXCJcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN3aXRjaEJ0bi5jc3Moe1xuICAgICAgICBcIndlYmtpdFRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiLFxuICAgICAgICBcIk1velRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiLFxuICAgICAgICBcIm1zVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCIsXG4gICAgICAgIFwiT1RyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiLFxuICAgICAgICBcInRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBjaGFuZ2UgdGhlIHdpZHRoIG9mIHRoZSBidG4gdG8gbWF0Y2ggdGhlIHdpZHRoIG9mIHRoZSBuZXcgbGFiZWxcbiAgICB0aGlzLnNldFdpZHRoKHNlbGVjdGVkTGFiZWwpO1xuXG4gICAgLy8gc2V0IHN0YXRlIHRvIHRoZSBuZXdseSBzZWxlY3RlZCBpbnB1dFxuICAgIHRoaXMuc3RhdGUuc2VsZWN0ZWQgPSAkdGhpcy5hdHRyKFwiaWRcIik7XG4gICAgY29uc29sZS5sb2coXCJDdXJyZW50IFN0YXRlIGlzOiBcIiwgdGhpcy5zdGF0ZS5zZWxlY3RlZCk7XG5cbiAgICB0aGlzLnRvZ2dsZUNhcmRzKCk7XG5cbiAgfVxuXG4gIHRvZ2dsZUNhcmRzKCkge1xuXG4gICAgLy8gYmFzZWQgb24gc3RhdGUsIGFkZCBzZWxlY3RlZCB0byB0aGUgY2FyZCdzIGlkIG1hdGNoaW5nIHRoZSBzdGF0ZVxuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5LmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9ICQoZWwpLFxuICAgICAgICBpZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcblxuICAgICAgJHRoaXMucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgaWYgKCBpZCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZCApIHtcblxuICAgICAgICAkdGhpcy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgc2V0QWN0aXZlUGxhbigpIHtcblxuICAgIGxldCBpZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQ7XG4gICAgbGV0IHNlbGVjdGVkQ2FyZCA9IHRoaXMucXVvdGVJdGVtc0FycmF5LmZpbHRlcigoIGl0ZW0gKSA9PiB7XG4gICAgICByZXR1cm4gJCh0aGlzLnF1b3RlSXRlbXNBcnJheVsgaXRlbSBdKS5hdHRyKFwiaWRcIikgPT09IGlkO1xuICAgIH0pO1xuXG4gICAgbGV0IGJ1dHRvbiA9ICc8YSBjbGFzcz1cInJvdW5kZWQtYnRuIHdoaXRlLWJ0biBnby1iYWNrXCIgaHJlZj1cIiNcIj5HbyBCYWNrPC9hPic7XG5cbiAgICBsZXQgbW9kaWZpZWRFbGVtZW50ID0gc2VsZWN0ZWRDYXJkLmNsb25lKCk7XG5cbiAgICBtb2RpZmllZEVsZW1lbnQuZmluZChcIi5jYXJkX19pdGVtLS1idG5cIikucmVtb3ZlKCk7XG5cbiAgICAvLyBtb2RpZmllZEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5nby1iYWNrXCIpKTtcbiAgICBsZXQgY2FyZFdyYXBwZXIgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWNhcmQtd3JhcHBlclwiKTtcblxuICAgIGNhcmRXcmFwcGVyLmFwcGVuZChtb2RpZmllZEVsZW1lbnQpLmFwcGVuZChidXR0b24pO1xuXG4gICAgLy8gQmFjayBidXR0b24gaW5zaWRlIHdyYXBwZXJcbiAgICBsZXQgYnV0dG9uRG9tID0gY2FyZFdyYXBwZXIuZmluZChcIi5nby1iYWNrXCIpO1xuICAgIGJ1dHRvbkRvbS5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VGb3JtLmJpbmQodGhpcykpO1xuXG5cbiAgfVxuXG4gIGNsb3NlRm9ybSggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zdGF0ZS5pc0Zvcm1BY3RpdmUgPSBmYWxzZTtcblxuICAgIC8vIHJlbW92ZSBjdXJyZW50IGNhcmRcbiAgICBsZXQgY2FyZCA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5jYXJkX19pdGVtXCIpO1xuICAgIGxldCBiYWNrQnRuID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS1jYXJkLXdyYXBwZXJcIikuZmluZChcIi5nby1iYWNrXCIpO1xuICAgIFR3ZWVuTWF4LnRvKGNhcmQsIC4yLCB7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgeTogMTUsXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgICAvLyBzZXQgZm9ybSB0byBhY3RpdmVcbiAgICAgICAgICB0aGlzLmZvcm1CdWlsZGVyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAgICAgLy8gc2V0IGJvZHkgYmFjayB0byBzY3JvbGxhYmxlXG4gICAgICAgICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImF1dG9cIik7XG4gICAgICAgIH0sIDMwMCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5xdW90ZV9fZm9ybS0tdmNcIikub25lKCdvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICggZSApID0+IHtcblxuICAgICAgICAgIC8vIHJlbW92ZSB2aXNpYmlsaXR5IG9uY2UgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuY3NzKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICB0aGlzLnF1b3RlQ2hvb3Nlci5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgICAgICAgIC8vIHJlbW92ZSBjdXJyZW50IGNhcmQgaHRtbFxuICAgICAgICAgIGNhcmQucmVtb3ZlKCk7XG4gICAgICAgICAgYmFja0J0bi5yZW1vdmUoKTtcblxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICBjb25zb2xlLmxvZyhcImNsb3NlXCIpO1xuXG4gICAgICAvLyByZW1vdmUgdmlzaWJpbGl0eSBvbmNlIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuY3NzKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgIHRoaXMucXVvdGVDaG9vc2VyLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXG4gICAgICAvLyByZW1vdmUgY3VycmVudCBjYXJkIGh0bWxcbiAgICAgIGNhcmQucmVtb3ZlKCk7XG4gICAgICBiYWNrQnRuLnJlbW92ZSgpO1xuICAgIH1cblxuXG4gICAgLy8gZmFkZSBvdXQgZmlyc3QgZGlzcGxheVxuICAgIHRoaXMucXVvdGVDaG9vc2VyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgb3BlbkZvcm0oIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGV0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpO1xuICAgIGxldCBwYXJlbnRDb25hdGluZXIgPSAkdGhpcy5wYXJlbnQoXCJkaXZcIikucGFyZW50KFwiZGl2XCIpO1xuXG4gICAgaWYgKCAhcGFyZW50Q29uYXRpbmVyLmhhc0NsYXNzKFwic2VsZWN0ZWRcIikgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS5pc0Zvcm1BY3RpdmUgPSB0cnVlO1xuXG4gICAgLy8gc2V0IGNvbnRlbnQgcGxhbiBIVE1MIGluIG5ldyBmb3JtIGFyZWFcbiAgICB0aGlzLnNldEFjdGl2ZVBsYW4oKTtcblxuICAgIC8vIGZhZGUgb3V0IGNhcmRzXG4gICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cbiAgICAvLyBzZXQgZm9ybSB0byBhY3RpdmVcbiAgICB0aGlzLmZvcm1CdWlsZGVyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgLy8gYWRkIHZpc2liaWxpdHkgaW1tZWRpYXRlbHlcbiAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuXG4gICAgLy8gZmFkZSBvdXQgZmlyc3QgZGlzcGxheVxuICAgIHRoaXMucXVvdGVDaG9vc2VyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8vIHNjcm9sbCB0b3Agb2YgZGl2IG9uIG9wZW4gZm9yIGdyYWNlZnVsIFVYXG4gICAgICAkKFwiYm9keSxodG1sXCIpLmFuaW1hdGUoeyBcInNjcm9sbFRvcFwiOiB0aGlzLnF1b3RlQ29udGFpbmVyLm9mZnNldCgpLnRvcCAtIDM1IH0sIDIwMCk7XG5cbiAgICB9XG5cbiAgICBsZXQgY2FyZCA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5xdW90ZV9fZm9ybS0tY2FyZFwiKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgY2FyZC5vbmUoJ290cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgKCBlICkgPT4ge1xuXG4gICAgICAgICAgLy8gU2V0IGJvZHkgdG8gbm90IHNjcm9sbFxuICAgICAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJoaWRkZW5cIik7XG5cbiAgICAgICAgICAvLyBmYWRlIGNhcmQgaW4gb25jZSBkYXRhIGlzIHNldCAmIHRoZSBjYXJkIGJnIGlzIGZpbmlzaGVkIGFuaW1hdGluZ1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKGNhcmQuZmluZChcIi5jYXJkX19pdGVtXCIpLCAuMywge1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIGRlbGF5OiAuMlxuICAgICAgICAgIH0pO1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKGNhcmQuZmluZChcIi5jYXJkX19pdGVtXCIpLCAuMiwge1xuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0IGJvZHkgdG8gbm90IHNjcm9sbFxuICAgICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImhpZGRlblwiKTtcblxuICAgICAgLy8gZmFkZSBjYXJkIGluIG9uY2UgZGF0YSBpcyBzZXQgJiB0aGUgY2FyZCBiZyBpcyBmaW5pc2hlZCBhbmltYXRpbmdcbiAgICAgIFR3ZWVuTWF4LnRvKGNhcmQuZmluZChcIi5jYXJkX19pdGVtXCIpLCAuMywge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBkZWxheTogLjJcbiAgICAgIH0pO1xuICAgICAgVHdlZW5NYXgudG8oY2FyZC5maW5kKFwiLmNhcmRfX2l0ZW1cIiksIC4yLCB7XG4gICAgICAgIHk6IDAsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJRdW90ZSBCdWlsZGVyXCIpO1xuXG4gICAgLy8gYnVpbGQgc2VsZWN0IGJveCBidXR0b24gaW5wdXRzXG4gICAgdGhpcy5idWlsZFNlbGVjdEJveCgpO1xuXG4gICAgLy8gc2V0IGNsaWNrIGV2ZW50cyBhbmQgZmlyc3Qgc2VsZWN0ZWQgaXRlbXMgZm9yIFNlbGVjdCBCb3hcbiAgICB0aGlzLmJ1aWxkU2VsZWN0RXZlbnRIYW5kbGVycygpO1xuXG4gICAgdGhpcy5mYWRlSW4odGhpcy5zZWxlY3RCdG4pO1xuXG4gICAgLy8gc2VsZWN0IGNhcmRcbiAgICB0aGlzLnRvZ2dsZUNhcmRzKCk7XG5cbiAgICAvLyBhZGQgY2xpY2sgZXZlbnRzIHRvIGNhcmRzIGJ1dHRvbnNcbiAgICB0aGlzLmJ1aWxkQ2FyZEV2ZW50SGFuZGxlcnMoKTtcblxuXG4gIH1cbn1cblxuY29uc3QgUXVvdGVCdWlsZGVyID0gbmV3IFF1b3RlQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFF1b3RlQnVpbGRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmludGVyZmFjZSBTaG93Y2FzZVNsaWRlckludGVyZmFjZSB7XG4gIGRlc2t0b3BQb3M6IG51bWJlcjtcbiAgdGFibGV0UG9zOiBudW1iZXI7XG4gIGluZGV4U2VsZWN0ZWQ6IG51bWJlcjtcbiAgY3VycmVudFNsaWRlOiBudW1iZXI7XG59XG5cbmNsYXNzIFNob3djYXNlQ29tcG9uZW50IHtcbiAgY29udGFpbmVyOiBKUXVlcnk7XG4gIHJlc2l6ZVRpbWVyOiBudW1iZXI7XG4gIG5leHRCdG5Nb2JpbGU6IEpRdWVyeTtcbiAgcHJldkJ0bk1vYmlsZTogSlF1ZXJ5O1xuICBuZXh0QnRuOiBKUXVlcnk7XG4gIHByZXZCdG46IEpRdWVyeTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgZ2FsbGVyeTogSlF1ZXJ5O1xuICBkZXNjOiBKUXVlcnk7XG4gIHRodW1ic0NvbnRhaW5lcjogSlF1ZXJ5O1xuICBncmFkaWVudHM6IEpRdWVyeTtcbiAgdGh1bWJzQ2xpY2s6IEpRdWVyeTtcbiAgY2xvc2VCdG46IEpRdWVyeTtcbiAgY291bnRUb3RhbDogSlF1ZXJ5O1xuICBjdXJyZW50Q291bnRJdGVtOiBKUXVlcnk7XG4gIHNob3dDYXNlVGh1bWJzOiBKUXVlcnk7XG4gIHN0YXRlUG9zaXRpb246IFNob3djYXNlU2xpZGVySW50ZXJmYWNlO1xuICB0aHVtYlNjYWxlVG9wOiBudW1iZXI7XG4gIHRodW1iU2NhbGVMZWZ0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoIGVsOiBPYmplY3QgKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKGVsKTtcbiAgICB0aGlzLnByZXZCdG5Nb2JpbGUgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19uYXYtLXByZXZcIik7XG4gICAgdGhpcy5uZXh0QnRuTW9iaWxlID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fbmF2LS1uZXh0XCIpO1xuICAgIHRoaXMucHJldkJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1ic25hdi0tcHJldlwiKTtcbiAgICB0aGlzLm5leHRCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNuYXYtLW5leHRcIik7XG4gICAgdGhpcy5nYWxsZXJ5ID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fc2xpZGVyLS1nYWxsZXJ5XCIpO1xuICAgIHRoaXMuZGVzYyA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2NcIik7XG4gICAgdGhpcy5jb3VudFRvdGFsID0gdGhpcy5jb250YWluZXIuZmluZChcIi50b3RhbFwiKTtcbiAgICB0aGlzLmN1cnJlbnRDb3VudEl0ZW0gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmN1cnJlbnRcIik7XG4gICAgdGhpcy5pbmRleCA9IDA7IC8vIHNldCB0byAybmQgc2xpZGVcbiAgICB0aGlzLnRodW1ic0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1icy0taW1hZ2VzXCIpO1xuICAgIHRoaXMuc2hvd0Nhc2VUaHVtYnMgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNcIik7XG4gICAgdGhpcy50aHVtYlNjYWxlVG9wID0gMTMwO1xuICAgIHRoaXMudGh1bWJTY2FsZUxlZnQgPSA3NTtcbiAgICB0aGlzLnN0YXRlUG9zaXRpb24gPSB7XG4gICAgICBkZXNrdG9wUG9zOiAwLFxuICAgICAgdGFibGV0UG9zOiAwLFxuICAgICAgaW5kZXhTZWxlY3RlZDogdGhpcy5pbmRleCxcbiAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5pbmRleCArIDFcbiAgICB9O1xuXG4gIH1cblxuICBzZXRGaXJzdFNsaWRlKCkge1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGltYWdlcyBhbmQgc2V0IGFjdGl2ZSBlbGVtZW50XG4gICAgbGV0IGZpcnN0SW1hZ2UgPSB0aGlzLmdhbGxlcnkuZmluZChcImxpW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcbiAgICBmaXJzdEltYWdlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICB0aGlzLmFuaW1hdGVHYWxsZXJ5SW4oKTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBkZXNjIGFuZCBzZXQgYWN0aXZlIGVsZW1lbnRcbiAgICBsZXQgZmlyc3REZXNjID0gdGhpcy5kZXNjLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2MtLWl0ZW1bZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuICAgIGZpcnN0RGVzYy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgLy8gQnVpbGQgdGh1bWJuYWlsc1xuICAgIHRoaXMuYnVpbGRUaHVtYnMoKTtcblxuICAgIC8vIFNldCBDdXJyZW50IFNsaWRlLCB3aGljaCBpcyBhbHdheXMgdGhlIGZpcnN0IHNsaWRlIHRvIHNlbGVjdGVkIC0gb25Mb2FkXG4gICAgdGhpcy51cGRhdGVNb2JpbGVOYXYodGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50cyB0byB0aHVtYm5haWwgaW1hZ2VzLCB0aGVuIHdoZW4gZmluaXNoZWQgYW5pbWF0ZSBpbiB3aXRoIGNhbGxiYWNrXG4gICAgdGhpcy5idWlsZFRodW1ic0NsaWNrSGFuZGxlcih0aGlzLmFuaW1hdGVJblRodW1icy5iaW5kKHRoaXMpKTtcblxuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmdhbGxlcnkuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldEN1cnJlbnROYXZFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRDdXJyZW50RGVzY0VsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy5kZXNjLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRUb3RhbFNsaWRlcygpOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IHRoaXMuZ2FsbGVyeS5jaGlsZHJlbihcImxpXCIpLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICB1cGRhdGVNb2JpbGVOYXYoIHNlbGVjdGVkOiBKUXVlcnkgKSB7XG5cbiAgICAvLyBFbmFibGUvRGlzYWJsZSBhcnJvdyBidG5zXG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpmaXJzdC1jaGlsZFwiKSk7XG4gICAgdGhpcy5uZXh0QnRuTW9iaWxlLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpsYXN0LWNoaWxkXCIpKTtcblxuICB9XG5cbiAgdXBkYXRlU3RhdGUoIGluZGV4OiBudW1iZXIgKSB7XG5cbiAgICB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCA9IGluZGV4O1xuICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPSBpbmRleCArIDE7XG5cbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGU7XG4gIH1cblxuICB1cGRhdGVTbGlkZSggZGlyZWN0aW9uOiBzdHJpbmcgKSB7XG5cbiAgICAvLyBnZXQgY3VycmVudCBzZWxlY3RlZCBhbmQgZmluZCB0aGUgbWF0Y2ggdG8gdGhlIG5leHQgZWxcbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCk7XG4gICAgbGV0IG5leHRTbGlkZSA9IHRoaXMuZ2FsbGVyeS5maW5kKFwibGlbZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBOYXZpZ2F0aW9uIGNoZWNrXG4gICAgdGhpcy51cGRhdGVNb2JpbGVOYXYodGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuICB9XG5cbiAgdXBkYXRlRGVzY0hlaWdodCggZGlyZWN0aW9uPzogc3RyaW5nLCBzZWxlY3RlZD86IEpRdWVyeSApIHtcblxuICAgIC8vIGRpcmVjdGlvblxuICAgIGlmICggZGlyZWN0aW9uICkge1xuXG4gICAgICBsZXQgaGVpZ2h0ID0gc2VsZWN0ZWQub3V0ZXJIZWlnaHQoKTtcbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMuZGVzYywgLjMsIHtcbiAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBnZXQgY3VycmVudCBzbGlkZVxuICAgICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudERlc2NFbGVtZW50KCk7XG4gICAgICBsZXQgaGVpZ2h0ID0gY3VycmVudFNsaWRlLm91dGVySGVpZ2h0KCk7XG4gICAgICB0aGlzLmRlc2MuaGVpZ2h0KGhlaWdodCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZURlc2MoIGRpcmVjdGlvbjogc3RyaW5nICkge1xuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnREZXNjRWxlbWVudCgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSB0aGlzLmRlc2MuZmluZChcIi5zaG93Y2FzZV9fZGVzYy0taXRlbVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG5cbiAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuXG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuXG4gICAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoXCJyaWdodFwiLCBuZXh0U2xpZGUpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG5cbiAgICAgIHRoaXMudXBkYXRlRGVzY0hlaWdodChcImxlZnRcIiwgbmV4dFNsaWRlKTtcblxuICAgIH1cblxuICB9XG5cbiAgdXBkYXRlVGh1bWJzbmF2KCBkaXJlY3Rpb246IHN0cmluZyApIHtcblxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnROYXZFbGVtZW50KCk7XG4gICAgbGV0IG5leHRTbGlkZSA9IHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCJsaVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG5cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA8IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBUQUJMRVQgVEhVTUIgU0VMRUNUXG4gICAgICAgKi9cblxuICAgICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA+PSA0ICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPCB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zIC0gdGhpcy50aHVtYlNjYWxlTGVmdDtcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zIC0gdGhpcy50aHVtYlNjYWxlVG9wO1xuXG4gICAgICAgICAgLy8gdXBkYXRlIGh0bWwgZWxlbWVudFxuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgIHg6IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MsXG4gICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsZWZ0XCIpO1xuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICsgdGhpcy50aHVtYlNjYWxlTGVmdDtcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHN0YXRlXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyArIHRoaXMudGh1bWJTY2FsZVRvcDtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogREVTS1RPUCBUSFVNQiBTRUxFQ1RcbiAgICAgICAqL1xuICAgICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcblxuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgICAgLy8gZGV0ZWN0aW5nIGlmIHNsaWRlIHNob3VsZCBtb3ZlIG9yIG5vdFxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPj0gNCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlIDwgdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gY29udHJvbGxlclxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgLSB0aGlzLnRodW1iU2NhbGVUb3A7XG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgLSB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuXG4gICAgICAgICAgLy8gbW92ZSBzbGlkZXJcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICsgdGhpcy50aHVtYlNjYWxlVG9wO1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgICB5OiB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyxcbiAgICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VwZXJhdGUgdGFibGV0IGxvb2tpbmcgYXQgc2hvdWxkIGl0IHVwZGF0ZSB0YWJsZXQgc3RhdGVcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyArIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIGNoZWNrVGh1bWJzTmF2KCBzaXplOiBzdHJpbmcgKSB7XG5cbiAgICBpZiAoIHNpemUgPT09IFwibW9iaWxlXCIgKSB7XG5cbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgeTogMCxcbiAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGFycm93SGFuZGxlciggZXZlbnQ6IGFueSApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGV0ICRlbCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7IC8vIGEgdGFnXG4gICAgbGV0IHRodW1iSW5kZXggPSAkZWwucGFyZW50KFwibGlcIikuZGF0YShcImluZGV4XCIpO1xuICAgIGxldCBwcmV2RWwgPSB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICAgIGxldCBwcmV2SW5kZXggPSBwcmV2RWwuZGF0YShcImluZGV4XCIpO1xuXG5cbiAgICAvLyBTbGlkZXIgY2FuIG1vdmUgcmlnaHQgYmVjYXVzZSBjdXJyZW50IHNsaWRlIGlzIG5vdCB0aGUgbGFzdCBzbGlkZVxuICAgIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInJpZ2h0XCIgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA8PSB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSBvbiBhcnJvdyBjbGlja1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIDEpO1xuXG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwicmlnaHRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG5cbiAgICB9IGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwibGVmdFwiICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSBvbiBhcnJvdyBjbGlja1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCAtIDEpO1xuXG4gICAgICAvLyBFbHNlIGlmIGl0cyBub3QgdGhlIGZpcnN0IHNsaWRlIC0gbW92ZSBsZWZ0XG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcImxlZnRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwidGh1bWJuYWlsXCIgJiZcbiAgICAgIHByZXZJbmRleCA8IHRodW1iSW5kZXggJiZcbiAgICAgIHRodW1iSW5kZXggKyAxICE9PSB0aGlzLmdldFRvdGFsU2xpZGVzXG4gICAgKSB7XG4gICAgICAvLyBjb21wYXJlIGl0ZW0gc2VsZWN0ZWQgaW5kZXggd2l0aCBuZXcgaXRlbSBzZWxlY3RlZCBhbmQgZGV0ZXJtaW5lIHdoaWNoIGRpcmVjdGlvbiB0byBtb3ZlXG4gICAgICAvLyB1cGRhdGUgU3RhdGVcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGh1bWJJbmRleCk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aHVtYnMgbmF2XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwicmlnaHRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwidGh1bWJuYWlsXCIgJiYgcHJldkluZGV4ID4gdGh1bWJJbmRleFxuICAgICkge1xuICAgICAgLy8gdXBkYXRlIFN0YXRlXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRodW1iSW5kZXgpO1xuXG4gICAgICAvLyB1cGRhdGUgdGh1bWJzIG5hdlxuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBjb3VudGVyXG4gICAgdGhpcy5jdXJyZW50Q291bnRJdGVtLmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIGlmIFRhYmxldCBvciBzbWFsbGVyIC0gYmluZCBtb2JpbGUgbmF2IGFycm93c1xuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgICAvLyBhZGp1c3QgY3NzIHNpemluZyBmb3IgdGh1bWJzIG5hdiBvbiBwb3NpdGlvbiByZXNpemVcbiAgICAgICAgdGhpcy5jaGVja1RodW1ic05hdihcIm1vYmlsZVwiKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLmNoZWNrVGh1bWJzTmF2KFwiZGVza3RvcFwiKTtcblxuICAgICAgfVxuXG4gICAgfSwgNDAwKTtcblxuICB9XG5cbiAgYW5pbWF0ZVNoYWRvd0luT3V0KCkge1xuXG4gICAgLy8gcmVtb3ZlIGRyb3BzaGFkb3dcbiAgICBUd2Vlbk1heC50byh0aGlzLmdhbGxlcnksIDAsIHtcbiAgICAgIGJveFNoYWRvdzogXCIwcHggMThweCA5NHB4IC0xNnB4IHJnYmEoMCwwLDAsMC4wKVwiXG4gICAgfSk7XG5cblxuICAgIFR3ZWVuTWF4LnRvKHRoaXMuZ2FsbGVyeSwgLjEsIHtcbiAgICAgIGJveFNoYWRvdzogXCIwcHggMThweCA5NHB4IC0xNnB4IHJnYmEoMCwwLDAsMC42OClcIixcbiAgICAgIGRlbGF5OiAuM1xuICAgIH0pO1xuXG5cbiAgfVxuXG4gIGFuaW1hdGVTaGFkb3dJbigpIHtcbiAgICBUd2Vlbk1heC50byh0aGlzLmdhbGxlcnksIC4zLCB7XG4gICAgICBib3hTaGFkb3c6IFwiMHB4IDE4cHggOTRweCAtMTZweCByZ2JhKDAsMCwwLDAuNjgpXCIsXG4gICAgICBkZWxheTogLjFcbiAgICB9KTtcbiAgfVxuXG4gIGJ1aWxkVGh1bWJzKCkge1xuXG4gICAgbGV0IGZyYWdtZW50ID0gJChkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpO1xuICAgIC8vIGJ1aWxkIGxvb3AgZm9yIGltYWdlc1xuICAgIHRoaXMuZ2FsbGVyeS5maW5kKFwibGlcIikuZWFjaCgoIGluZGV4OiBudW1iZXIsIGVsOiBPYmplY3QgKSA9PiB7XG5cbiAgICAgIC8vIGNyZWF0ZSBodG1sIGVsZW1lbnRzXG4gICAgICBsZXQgaXRlbUluZGV4ID0gVXRpbHMuc2V0TnVtYmVyKGluZGV4KSxcbiAgICAgICAgaW1hZ2VUaHVtYlVybCA9ICQoZWwpLmRhdGEoXCJ0aHVtYlwiKSxcbiAgICAgICAgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKSxcbiAgICAgICAgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSxcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgLy8gYWRkIHNyYyBhbmQgYXR0ciB0byBpbWFnZVxuICAgICAgaW1hZ2VFbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBpbWFnZVRodW1iVXJsKTtcbiAgICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCIjXCIpO1xuICAgICAgbGlua0VsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsIGl0ZW1JbmRleCk7XG5cbiAgICAgIC8vIHNldCBmaXJzdCBpbWFnZSB0byBzZWxlY3RlZFxuICAgICAgaW5kZXggPT09IHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkID8gZWxlbWVudC5jbGFzc05hbWUgPSBcInNlbGVjdGVkXCIgOiBcIlwiO1xuXG4gICAgICAvLyBhcHBlbmQgdG8gZnJhZ21lbnRcbiAgICAgIGZyYWdtZW50LmFwcGVuZChlbGVtZW50KTtcblxuICAgIH0pO1xuXG4gICAgLy8gaW5zZXJ0IGh0bWwgZWxlbWVudCB0byB0aGUgZG9tIGFmdGVyIGxvb3AgZmluaXNoZXNcbiAgICB0aGlzLnRodW1ic0NvbnRhaW5lci5hcHBlbmQoZnJhZ21lbnQpO1xuXG4gIH1cblxuICBidWlsZFRodW1ic0NsaWNrSGFuZGxlciggY2FsbGJhY2sgKSB7XG5cbiAgICAvLyBBZGQgYXJyYXkgb2YgaHRtbCBvYmplY3QgdG8gYXR0YWNoIGNsaWNrIGV2ZW50cyB0byBsYXRlclxuICAgIHRoaXMudGh1bWJzQ2xpY2sgPSB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwiYVwiKTtcblxuICAgIC8vIENsaWNrIGhhbmRsZXIgZm9yIHByZXZpZXcgdGh1bWJzIG9uIGRlc2t0b3AsIG5lZWRzIHRvIHdvcmsgb24gdGFibGV0IC0+IGRlc2t0b3BcbiAgICB0aGlzLnRodW1ic0NsaWNrLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICAkKGVsKS5vbihcImNsaWNrXCIsIHsga2V5czogXCJ0aHVtYm5haWxcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9KTtcblxuICAgIGNhbGxiYWNrKCk7XG4gIH1cblxuICBhbmltYXRlSW5UaHVtYnMoKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5zaG93Q2FzZVRodW1icywgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBkZWxheTogMVxuICAgIH0pO1xuICB9XG5cbiAgYW5pbWF0ZUdhbGxlcnlJbigpIHtcbiAgICBUd2Vlbk1heC50byh0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19vdXRlci0tYmdpbWFnZVwiKSwgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBkZWxheTogLjcsXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgdGhpcy5zZXRGaXJzdFNsaWRlKCk7XG5cbiAgICAvLyBJbml0IGNvcnJlY3QgbmF2IGRlcGVuZGluZyBvbiB2aWV3cG9ydCBzaXplXG4gICAgdGhpcy5jaGVja1NpemUoKTtcbiAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoKTtcbiAgICB0aGlzLnByZXZCdG5Nb2JpbGUub24oXCJjbGlja1wiLCB7IGtleXM6IFwibGVmdFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMubmV4dEJ0bk1vYmlsZS5vbihcImNsaWNrXCIsIHsga2V5czogXCJyaWdodFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG5cbiAgICAvLyBzZXQgdG90YWwgc2xpZGVzIG51bWJlclxuICAgIHRoaXMuY291bnRUb3RhbC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldFRvdGFsU2xpZGVzKCkpKTtcblxuICAgIC8vIHVwZGF0ZSBjb3VudGVyXG4gICAgdGhpcy5jdXJyZW50Q291bnRJdGVtLmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gIH1cbn1cblxuLy8gbG9vcCB0aHJvdWdoIGVhY2ggaGVhZGVyIHNsaWRlciBvYmplY3Qgb24gdGhlIHBhZ2VcbmNsYXNzIFNob3dDYXNlU0xpZGVyIHtcblxuICBpdGVtSW5mb1dyYXBwZXI6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlciA9ICQoXCIuc2hvd2Nhc2VcIik7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2hvd2Nhc2UgU2xpZGVyIGluaXRcIik7XG5cbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlci5lYWNoKCggaW5kZXg6IG51bWJlciwgZWw6IE9iamVjdCApID0+IHtcblxuICAgICAgLy8gUGFzcyBcInRoaXNcIiB0byBlYWNoIG5ldyBIZWFkZXIgc2xpZGVyIGNvbXBvbmVudFxuICAgICAgbGV0IHNsaWRlciA9IG5ldyBTaG93Y2FzZUNvbXBvbmVudChlbCk7XG4gICAgICBzbGlkZXIuaW5pdCgpO1xuICAgIH0pO1xuICB9XG5cbn1cblxubGV0IFNob3djYXNlU2xpZGVyID0gbmV3IFNob3dDYXNlU0xpZGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNob3djYXNlU2xpZGVyO1xuIiwiY29uc3QgJCA9IGpRdWVyeTtcblxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIFN0aWNreVNpZGViYXJDb21wb25lbnQge1xuXG4gIGlzQW5pbWF0aW5nOiBib29sZWFuO1xuICBjb250ZW50V3JhcHBlcjogSlF1ZXJ5O1xuICBjb250ZW50T2Zmc2V0VG9wOiBudW1iZXI7XG4gIGNvbnRlbnRXcmFwcGVySGVpZ2h0OiBudW1iZXI7XG4gIHNjcm9sbFRvcDogbnVtYmVyO1xuICBhc2lkZTogSlF1ZXJ5O1xuICBzaWRlYmFyV3JhcHBlcjogSlF1ZXJ5O1xuICB3aW5kb3dIZWlnaHQ6IG51bWJlcjtcbiAgc2lkZWJhckhlaWdodDogbnVtYmVyO1xuICBmb290ZXJIZWlnaHQ6IG51bWJlcjtcbiAgc2Nyb2xsaW5nRG93bjogYm9vbGVhbjtcbiAgbGFzdFNjcm9sbFRvcDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRlbnRXcmFwcGVyID0gJChcIi5zaWRlYmFyLWNvbnRlbnRcIik7XG4gICAgdGhpcy5hc2lkZSA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFySGVpZ2h0ID0gdGhpcy5hc2lkZS5oZWlnaHQoKTtcbiAgICB0aGlzLnNpZGViYXJXcmFwcGVyID0gJChcIi5zZXJ2aWNlLXNpZGViYXJcIik7XG4gIH1cblxuICBjaGVja1NpZGViYXIoKTogdm9pZCB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIHNpZGViYXIgaXMgZml4ZWQgb3Igbm90XG4gICAgaWYgKCAhdGhpcy5pc0FuaW1hdGluZyAmJiBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICB0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkgPyBzZXRUaW1lb3V0KHRoaXMudXBkYXRlU2lkZWJhclBvc2l0aW9uLmJpbmQodGhpcyksIDMwMCkgOiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlU2lkZWJhclBvc2l0aW9uLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGlzLnJlc2V0U2lkZUJhcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0U2lkZUJhcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5hc2lkZS5yZW1vdmVDbGFzcyhcInN0aWNreVwiKTtcbiAgICB0aGlzLmFzaWRlLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGViYXJQb3NpdGlvbigpOiB2b2lkIHtcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxEaXJlY3Rpb24oKTtcblxuICAgIC8vIGdldCBkaXN0YW5jZSBmcm9tIHRvcCBvZiBjb250ZW50IDEwICsgNDAgPSA1MCBwYWRkaW5nIHRvcFxuICAgIC8vIHRoaXMuY29udGVudE9mZnNldFRvcCA9IHRoaXMuY29udGVudFdyYXBwZXIub2Zmc2V0KCkudG9wIC0gMTA7XG4gICAgdGhpcy5jb250ZW50T2Zmc2V0VG9wID0gdGhpcy5jb250ZW50V3JhcHBlci5vZmZzZXQoKS50b3A7XG4gICAgdGhpcy5zaWRlYmFySGVpZ2h0ID0gdGhpcy5hc2lkZS5oZWlnaHQoKTtcbiAgICB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0ID0gdGhpcy5jb250ZW50V3JhcHBlci5vdXRlckhlaWdodCgpOyAvLyBpbmNsdWRlIHBhZGRpbmcgYW5kIG1hcmdpblxuXG5cbiAgICAvLyBnZXQgd2hlcmUgdG9wIG9mIHdpbmRvdyBpc1xuICAgIHRoaXMuc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29udGVudCBXcmFwcGVyIEhlaWdodFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnRlbnQgT2Zmc2V0XCIsIHRoaXMuY29udGVudE9mZnNldFRvcCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTaWRlYmFyIEhlaWdodFwiLCB0aGlzLnNpZGViYXJIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiV2luZG93IEhlaWdodFwiLCB0aGlzLndpbmRvd0hlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJvZmZzZXQgVG9wXCIsIHRoaXMuY29udGVudE9mZnNldFRvcCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTY3JvbGxUb3BcIiwgdGhpcy5zY3JvbGxUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2lkZWJhcm9mZnNldFwiLCB0aGlzLnNjcm9sbFRvcCk7XG5cbiAgICAvLyBJZiB0aGUgd2luZG93IFYgcG9zaXRpb24gaXMgbGVzcyB0aGFuIHRoZSBjb250ZW50IFYgcG9zaXRpb24gbWFrZSBzaWRlYmFyIG5vcm1hbFxuICAgIGlmICggdGhpcy5zY3JvbGxUb3AgPCB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgKSB7XG4gICAgICAvLyBsZXQgY3NzUHJvcHMgPSB7XG4gICAgICAvLyAgIFwidHJhbnNpdGlvblwiOiBcInRvcCAuM3NcIlxuICAgICAgLy8gfTtcbiAgICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIik7XG4gICAgICAvLyB0aGlzLmFzaWRlLmNzcyhjc3NQcm9wcyk7XG5cbiAgICAgIC8vIGlmIHdpbmRvdyBWIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiBjb250ZW50IC0gYWRkIHN0aWNreVxuICAgICAgLy8gMm5kIGNoZWNrcyB0aGUgb2Zmc2V0IG9mIHRoZSB0b3Agb2YgdGhlIHdpbmRvdyB0byB0aGUgdG9wIG9mIHRoZSBjb250ZW50ICYmIHRoZSBwb3NpdGlvbiBvZiB0aGUgY29udGVudCBpbiByZWxhdGlvbiB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHdpbmRvdyAtIDQwIG9uIGVuZFxuICAgIH0gZWxzZSBpZiAoIHRoaXMuc2Nyb2xsVG9wID49IHRoaXMuY29udGVudE9mZnNldFRvcCAmJiB0aGlzLnNjcm9sbFRvcCA8IHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQgLSB0aGlzLnNpZGViYXJIZWlnaHQgKyB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgKSB7XG4gICAgICB0aGlzLmFzaWRlLmFkZENsYXNzKFwic3RpY2t5XCIpLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcblxuICAgICAgaWYgKCB0aGlzLnNjcm9sbGluZ0Rvd24gPT09IHRydWUgKSB7XG4gICAgICAgIC8vIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcInRvcCAuM3NcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGlzLmFzaWRlLmNzcyhcInRyYW5zaXRpb25cIiwgXCJcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbGV0IGFydGljbGVQYWRkaW5nVG9wID0gTnVtYmVyKGFydGljbGVzLmVxKDEpLmNzcyhcInBhZGRpbmctdG9wXCIpLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XG4gICAgICBpZiAoIHRoaXMuYXNpZGUuaGFzQ2xhc3MoXCJzdGlja3lcIikgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuICAgICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpLmNzcyhcInRvcFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgXCJweFwiKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcblxuICB9XG5cbiAgY2hlY2tTY3JvbGxEaXJlY3Rpb24oKSB7XG4gICAgLy8gTG9nIGN1cnJlbnQgc2Nyb2xsUG9pbnRcbiAgICBsZXQgc3QgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy8gY29tcGFyZSB0byBsYXN0IHNjcm9sbFBvaW50XG4gICAgaWYgKCBzdCA+IHRoaXMubGFzdFNjcm9sbFRvcCApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2Nyb2xsIGRvd25cIik7XG4gICAgICAvLyBkb3duc2Nyb2xsIGNvZGVcbiAgICAgIHRoaXMuc2Nyb2xsaW5nRG93biA9IHRydWU7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJzY3JvbGwgdXBcIik7XG4gICAgICAvLyB1cHNjcm9sbCBjb2RlXG4gICAgICB0aGlzLnNjcm9sbGluZ0Rvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBvbiBjb21wbGV0ZSAtIG1ha2UgbGFzdCBTY3JvbGwgcG9pbnQgdGhlIHBvaW50IGF0IHdoaWNoIHRoZXkgc3RhcnRlZCBzY3JvbGxpbmcgYXQgZmlyc3RcbiAgICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgfVxuXG4gIGFuaW1hdGVTaWRlYmFySW4oKSB7XG5cbiAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwiaW50cm9cIik7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgbGV0IHNpZGViYXJJbnRybyA9IFR3ZWVuTWF4LnRvKHRoaXMuYXNpZGUsIC4zLCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHo6IC4wMDEsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXQsXG4gICAgICAgIGRlbGF5OiAuOSxcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIC8vIG1ha2Ugc2lkZWJhciBwZXJtYW5lbnRseSB2aXNpYmxlXG4gICAgICAgICAgdGhpcy5hc2lkZS5hZGRDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0aWNreSBzaWRlYmFyIGxvYWRlZFwiKTtcblxuICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgaWYgKCB0aGlzLmFzaWRlLmxlbmd0aCA+IDAgKSB7XG4gICAgICB0aGlzLmNoZWNrU2lkZWJhcigpO1xuXG4gICAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgdGhpcy5jaGVja1NpZGViYXIuYmluZCh0aGlzKSk7XG4gICAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5jaGVja1NpZGViYXIuYmluZCh0aGlzKSk7XG5cbiAgICAgIC8vIEFuaW1hdGUgc2lkZSBiYXIgaW4gb24gbG9hZFxuICAgICAgdGhpcy5hbmltYXRlU2lkZWJhckluKCk7XG4gICAgfVxuICB9XG59XG5cbmxldCBTdGlja3lTaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3RpY2t5U2lkZWJhcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuY2xhc3MgVGVzdGltb25haWxDb21wb25lbnQge1xuXG4gIHRlc3RpbW9uYWlsczogSlF1ZXJ5O1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuICBjdXJyZW50SGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZXN0aW1vbmFpbHMgPSAkKFwiLnRlc3RpbW9uaWFsc1wiKTtcbiAgfVxuXG4gIGdlbmVyYXRlSWQoIGluZGV4LCBlbCApIHtcblxuICAgIC8vIGNyZWF0ZSBEeW5hbWljIElEXG4gICAgbGV0IGlkU3RyaW5nID0gXCJjYXJvdXNlbC10ZXN0aW1vbmlhbC1cIiArIGluZGV4O1xuICAgIGVsLmF0dHIoXCJpZFwiLCBpZFN0cmluZyk7XG5cbiAgICAvLyBBZGQgbWF0Y2hpbmcgaHJlZiB0byBjb250cm9sc1xuICAgIGxldCBjb250cm9scyA9IGVsLmZpbmQoXCIuY2Fyb3VzZWwtY29udHJvbFwiKTtcbiAgICBjb250cm9scy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAkKGVsKS5hdHRyKFwiaHJlZlwiLCBcIiNcIiArIGlkU3RyaW5nKTtcblxuICAgIH0pO1xuXG4gIH1cblxuICBvblJlc2l6ZSgpIHtcblxuICAgIC8vIE9uIHJlc2l6ZSBlbmQgLSBjaGVjayB0byBlbmFibGUgY2xpY2tzIGZvciBkZXNrdG9wIG9yIHJlbW92ZSB0aGVtXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuICAgIHRoaXMucmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgLy8gQ2hhbmdlIEhlaWdodCBvbiByZXNpemVcbiAgICAgIHRoaXMudGVzdGltb25haWxzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgICAgbGV0ICR0aGlzID0gJChlbCk7XG5cbiAgICAgICAgLy8gZXN0YWJsaXNoIHZhcnNcbiAgICAgICAgbGV0ICRpbm5lciA9ICR0aGlzLmZpbmQoXCIuY2Fyb3VzZWwtaW5uZXJcIiksXG4gICAgICAgICAgICAkYWN0aXZlID0gJGlubmVyLmZpbmQoXCIuYWN0aXZlXCIpLFxuICAgICAgICAgICAgYmxvY2tJdGVtID0gJGFjdGl2ZS5maW5kKFwiYmxvY2txdW90ZVwiKTtcblxuICAgICAgICAvLyBTZXQgaGVpZ2h0IGZvciBmaXJzdCBpdGVtXG4gICAgICAgIGxldCBoZWlnaHQgPSBibG9ja0l0ZW0ub3V0ZXJIZWlnaHQoKTtcblxuICAgICAgICAvLyBpZiB0aGV5IGFyZW4ndCBlcXVhbCwgY2hhbmdlIHRoZW1cbiAgICAgICAgaWYgKCB0aGlzLmN1cnJlbnRIZWlnaHQgIT09IGhlaWdodCApIHtcbiAgICAgICAgICAkaW5uZXIuY3NzKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgfSwgNDAwKTtcbiAgfVxuXG4gIGluaXQoKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIlRlc3RpbW9uaWFscyBJbml0XCIpO1xuXG4gICAgLy8gTWFrZSBpdGVtcyBkeW5hbWljXG4gICAgdGhpcy50ZXN0aW1vbmFpbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcbiAgICAgIGxldCAkdGhpcyA9ICQoZWwpO1xuICAgICAgdGhpcy5nZW5lcmF0ZUlkKGluZGV4LCAkdGhpcyk7XG5cbiAgICAgIC8vIG1ha2UgZmlyc3QgZWxlbWVudCBhY3RpdmVcbiAgICAgIGxldCAkaW5uZXIgPSAkdGhpcy5maW5kKFwiLmNhcm91c2VsLWlubmVyXCIpO1xuICAgICAgbGV0ICRmaXJzdCA9ICRpbm5lci5jaGlsZHJlbihcIi5pdGVtXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAgIC8vIFNldCBoZWlnaHQgZm9yIGZpcnN0IGl0ZW1cbiAgICAgIGxldCBoZWlnaHQgPSAkZmlyc3Qub3V0ZXJIZWlnaHQoKTtcbiAgICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGhlaWdodDtcbiAgICAgICRpbm5lci5jc3MoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcblxuICAgIH0pO1xuXG4gICAgLy8gU3RhcnQgU2xpZGVyc1xuICAgIHRoaXMudGVzdGltb25haWxzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIC8vIGluaXQgY2Fyb3VzZWxcbiAgICAgICQoZWwpLmNhcm91c2VsKCk7XG5cbiAgICAgIC8vIE9uIHNsaWRlIGNoYW5nZSBoZWlnaHQgZm9yIHNtb290aCB0cmFuc2l0aW9uc1xuICAgICAgJChlbCkub24oXCJzbGlkLmJzLmNhcm91c2VsXCIsICggZSApID0+IHtcblxuICAgICAgICAvLyBzbGlkZVxuICAgICAgICBsZXQgJHRoaXMgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGxldCBjdXJyZW50U2xpZGUgPSAkKCR0aGlzKS5maW5kKFwiLmFjdGl2ZVwiKTtcbiAgICAgICAgbGV0IGJsb2NrSXRlbSA9IGN1cnJlbnRTbGlkZS5maW5kKFwiYmxvY2txdW90ZVwiKTtcbiAgICAgICAgbGV0IGhlaWdodCA9IGJsb2NrSXRlbS5vdXRlckhlaWdodCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5wYXJlbnQoXCIuY2Fyb3VzZWwtaW5uZXJcIikuY3NzKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gYWRqdXN0IHNpemUgb24gcmVzaXplXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxufVxuXG5jb25zdCBUZXN0aW1vbmFpbHMgPSBuZXcgVGVzdGltb25haWxDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgVGVzdGltb25haWxzOyIsImltcG9ydCB7QnBzSW50ZXJmYWNlfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9icHMuaW50ZXJmYWNlXCI7XG5jb25zdCAkID0galF1ZXJ5O1xuXG4vLyBBZGQgaW50ZXJmYWNlIEpRdWVyeVNtb290aCB7XG4vLyBzbW9vdGhTdGF0ZSgpOnZvaWQ7XG4vLyB9XG4vLyBzbW9vdGhTdGF0ZShhcmc6IE9iamVjdCk6IEpRdWVyeTtcblxuY2xhc3MgVXRpbGl0eUNvbXBvbmVudCB7XG4gIHdpbmRvd1dpZHRoOiBudW1iZXI7XG4gIGJyZWFrcG9pbnQ6IG51bWJlcjtcbiAgYnJlYWtwb2ludHM6IG51bWJlcltdO1xuICBicHM6IEJwc0ludGVyZmFjZTtcbiAgYnJvd3Nlcjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3NldEJyZWFrcG9pbnRzID0gKCBicHM6IEJwc0ludGVyZmFjZSApID0+IHtcbiAgICBsZXQgYXJyID0gW107XG5cbiAgICBmb3IgKCBsZXQga2V5IGluIGJwcyApIHtcbiAgICAgIGlmICggYnBzLmhhc093blByb3BlcnR5KGtleSkgKSB7XG4gICAgICAgIGFyci5wdXNoKGJwc1sga2V5IF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcnIucmV2ZXJzZSgpO1xuICB9O1xuICBwcml2YXRlIF9jaGVja0JyZWFrcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gbWFrZSBicmVha3BvaW50IGV2ZW50IGF2YWlsYWJsZSB0byBhbGwgZmlsZXMgdmlhIHRoZSB3aW5kb3cgb2JqZWN0XG4gICAgbGV0IG9sZF9icmVha3BvaW50ID0gdGhpcy5icmVha3BvaW50O1xuXG4gICAgdGhpcy5fc2V0QnJlYWtwb2ludCgpO1xuXG4gICAgaWYgKCBvbGRfYnJlYWtwb2ludCAhPT0gdGhpcy5icmVha3BvaW50ICkge1xuXG4gICAgICAkKHdpbmRvdykudHJpZ2dlcihcImJyZWFrcG9pbnRDaGFuZ2VcIiwgVXRpbHMuYnJlYWtwb2ludCk7XG4gICAgfVxuICB9O1xuICBwcml2YXRlIF9zZXRCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIGdldCBicmVha3BvaW50IGZyb20gY3NzXG4gICAgbGV0IGJvZHkgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLFxuICAgICAgemluZGV4ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsgXCJ6LWluZGV4XCIgXTtcblxuICAgIHRoaXMuYnJlYWtwb2ludCA9IHBhcnNlSW50KHppbmRleCwgMTApO1xuICB9O1xuICBwcml2YXRlIF9zZXRXaW5kb3dXaWR0aCA9ICgpID0+IHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIH07XG5cbiAgc2V0TnVtYmVyKCBjb3VudDogbnVtYmVyICk6IHN0cmluZyB7XG4gICAgLy8gY29udmVyIG51bWJlciB0byBzdHJpbmdcbiAgICBsZXQgdG90YWwgPSBjb3VudDtcbiAgICByZXR1cm4gdG90YWwudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdoaWNoQnJvd3NlcigpIHtcbiAgICBpZiAoIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInNhZmFyaVwiKSA+IC0xKSAmJiAhKFxuICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJjaHJvbWVcIikgPiAtMSkgJiYgKG5hdmlnYXRvci5hcHBOYW1lID09PVxuICAgICAgXCJOZXRzY2FwZVwiKSApIHtcblxuICAgICAgaWYgKCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpICE9PSBudWxsICkge1xuICAgICAgICByZXR1cm4gXCJpcGFkXCI7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcInNhZmFyaVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkSHRtbCggdHlwZTogc3RyaW5nLCBhdHRycz86IE9iamVjdCwgaHRtbD86IHN0cmluZyApIHtcbiAgICBcbiAgICAvLyBodHRwOi8vbWFyY2dyYWJhbnNraS5jb20vYnVpbGRpbmctaHRtbC1pbi1qcXVlcnktYW5kLWphdmFzY3JpcHQvXG4gICAgXG4gICAgbGV0IGggPSAnPCcgKyB0eXBlO1xuXG4gICAgZm9yICggbGV0IGF0dHIgaW4gYXR0cnMgKSB7XG4gICAgICBpZiAoIGF0dHJzWyBhdHRyIF0gPT09IGZhbHNlICkgY29udGludWU7XG4gICAgICBoICs9ICcgJyArIGF0dHIgKyAnPVwiJyArIGF0dHJzWyBhdHRyIF0gKyAnXCInO1xuICAgIH1cblxuICAgIHJldHVybiBoICs9IGh0bWwgPyBcIj5cIiArIGh0bWwgKyBcIjwvXCIgKyB0eXBlICsgXCI+XCIgOiBcIi8+XCI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gMDtcbiAgICB0aGlzLmJyZWFrcG9pbnQgPSAzMjA7XG4gICAgdGhpcy5icmVha3BvaW50cyA9IFtdO1xuICAgIHRoaXMuYnBzID0ge1xuICAgICAgbW9iaWxlOiA1NDQsXG4gICAgICB0YWJsZXQ6IDc2OCxcbiAgICAgIGxhcHRvcDogOTkyLFxuICAgICAgZGVza3RvcDogMTIwMCxcbiAgICAgIGRlc2t0b3BfeGw6IDE2MDBcbiAgICB9O1xuICAgIHRoaXMuYnJvd3NlciA9IHRoaXMud2hpY2hCcm93c2VyKCk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiVXRpbGl0aWVzIGxvYWRlZFwiKTtcblxuICAgIC8vIHNldCBicmVha3BvaW50IG9uIHdpbmRvdyBsb2FkXG4gICAgdGhpcy5fc2V0QnJlYWtwb2ludCgpO1xuICAgIHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgY29uc29sZS5sb2coXCJDdXJyZW50IEJyZWFrcG9pbnQgaXM6XCIsIHRoaXMuYnJlYWtwb2ludCk7XG5cbiAgICAvLyBjcmVhdGUgZnVsbCBhcnJheSBmb3IgaW1hZ2UgY29tcHJlc3Npb24gcmVmXG4gICAgdGhpcy5icmVha3BvaW50cyA9IHRoaXMuX3NldEJyZWFrcG9pbnRzKHRoaXMuYnBzKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLl9jaGVja0JyZWFrcG9pbnQpLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IFV0aWxzID0gbmV3IFV0aWxpdHlDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7Il19
