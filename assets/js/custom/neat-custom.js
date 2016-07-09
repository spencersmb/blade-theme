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
        //fade out first display
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
        //fade out first display
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGUudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zdmcudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2ltYWdlTG9hZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9xdW90ZS1idWlsZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy90ZXN0aW1vbmlhbHMudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztHQUdHOztBQUVILHNCQUFrQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLDJCQUFnQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzFDLHVCQUFtQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3BELDJCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLG9EQUFvRDtBQUNwRCw0QkFBd0Isd0JBQXdCLENBQUMsQ0FBQTtBQUNqRCwrQkFBMEIsMkJBQTJCLENBQUMsQ0FBQTtBQUN0RCxpQ0FBZ0Ms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QixFQUFFLENBQUM7QUFFbkM7a0JBQWUsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gUmVmIHBhdGggaXMgbm90IG5lZWRlZCBmb3Igc29tZSByZWFzb25cbiA8cmVmZXJlbmNlIHBhdGg9XCIvVXNlcnMveW9zZW1ldGllL0Ryb3Bib3gvZGV2ZWxvcG1lbnQvdmhvc3RzL3d3dy5seW5kYXNjb3JlLmRldi93cC1jb250ZW50L3RoZW1lcy9uZWF0L3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuICovXG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi9wYXJ0aWFscy91dGlsc1wiO1xuaW1wb3J0IE5hdiBmcm9tIFwiLi9uYXZpZ2F0aW9uL25hdmlnYXRpb25cIjtcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IFN2Z0hlYWRlciBmcm9tIFwiLi9wYXJ0aWFscy9oZWFkZXItc3ZnXCI7XG4vLyBpbXBvcnQgU21vb3RoU3RhdGUgZnJvbSBcIi4vcGFydGlhbHMvc21vb3RoU3RhdGVcIjtcbmltcG9ydCBJbWFnZUxvYWRlciBmcm9tIFwiLi9wYXJ0aWFscy9pbWFnZUxvYWRlclwiO1xuaW1wb3J0IFN0aWNreVNpZGViYXIgZnJvbSBcIi4vcGFydGlhbHMvc3RpY2t5LXNpZGViYXJcIjtcbmltcG9ydCBBbmltYXRpb25Db250cm9sbGVyIGZyb20gXCIuL3BhcnRpYWxzL3Byb2Nlc3NBbmltYXRpb25cIjtcbmltcG9ydCBJc290b3BlR2FsbGVyeSBmcm9tIFwiLi9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGVcIjtcbmltcG9ydCBIZWFkZXJTbGlkZXIgZnJvbSBcIi4vcGFydGlhbHMvaGVhZGVyLXNsaWRlclwiO1xuaW1wb3J0IFNob3djYXNlU2xpZGVyIGZyb20gXCIuL3BhcnRpYWxzL3Nob3djYXNlLXNsaWRlclwiO1xuaW1wb3J0IFRlc3RpbW9uaWFscyBmcm9tIFwiLi9wYXJ0aWFscy90ZXN0aW1vbmlhbHNcIjtcbmltcG9ydCBRdW90ZUJ1aWxkZXIgZnJvbSBcIi4vcGFydGlhbHMvcXVvdGUtYnVpbGRlclwiO1xuLy8gaW1wb3J0IFN0aWNreVNpZGViYXIgZnJvbSBcIi4vcGFydGlhbHMvc2VydmljZS1zaWRlYmFyXCI7XG5jb25zdCAkID0galF1ZXJ5O1xuZGVjbGFyZSB2YXIgU2Nyb2xsTWFnaWM6IGFueTtcbi8vIGRlY2xhcmUgdmFyIHJldmFwaTE6IGFueTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgY2xhc3MgQXBwIHtcblxuICAgIGluaXQoKTogdm9pZCB7XG4gICAgICBjb25zb2xlLmxvZyhcIkFwcCBsb2FkZWRcIik7XG4gICAgICBTdmdIZWFkZXIuaW5pdCgpO1xuICAgICAgVXRpbHMuaW5pdCgpO1xuICAgICAgTmF2LmluaXQoKTtcbiAgICAgIFNlYXJjaC5pbml0KCk7XG4gICAgICBTdGlja3lTaWRlYmFyLmluaXQoKTtcbiAgICAgIFRlc3RpbW9uaWFscy5pbml0KCk7XG4gICAgICBRdW90ZUJ1aWxkZXIuaW5pdCgpO1xuICAgICAgQW5pbWF0aW9uQ29udHJvbGxlci5pbml0KCk7IC8vIEdsb2JhbCB3aW5kb3cgYW5pbSBhbmQgY2xpY2sgY29udHJvbFxuXG4gICAgfVxuICB9XG5cbiAgbGV0IGJvb3RzdHJhcCA9IG5ldyBBcHAoKTtcblxuICAvKiogcnVuIGFsbCBmdW5jdGlvbnMgKi9cbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGJvb3RzdHJhcC5pbml0KCk7XG4gICAgSW1hZ2VMb2FkZXIuaW5pdCgpO1xuICAgIC8vIFNtb290aFN0YXRlLmluaXQoXCJcIik7XG4gIH0pO1xuXG4gIC8vIEJpbmQgZXZlbnRzIHRvIHRoZSBpbWFnZXNMb2FkZWQgcGx1Z2luIGhlcmVcbiAgJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24gKCBlICkge1xuICAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICAvLyBjaGVjayBpZiBwYWdlIGhhcyBnYWxsZXJ5XG4gICAgaWYgKCAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBJc290b3BlR2FsbGVyeS5pbml0KCk7XG4gICAgfVxuICAgIEhlYWRlclNsaWRlci5pbml0KCk7XG4gICAgU2hvd2Nhc2VTbGlkZXIuaW5pdCgpO1xuXG4gIH0pO1xuXG59KSgpOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uLy4uL3BhcnRpYWxzL3V0aWxzXCI7XG5cbmNsYXNzIFNlYXJjaENvbXBvbmVudCB7XG4gICRzZWFyY2hUcmlnZ2VyOiBKUXVlcnk7XG4gICRzZWFyY2hDbG9zZVRyaWdnZXI6IEpRdWVyeTtcbiAgJHNlYXJjaEZvcm06IEpRdWVyeTtcbiAgJHNlYXJjaEJ1dHRvbkFyZWE6IEpRdWVyeTtcbiAgJGljb246IEpRdWVyeTtcbiAgJGZvcm06IEpRdWVyeTtcbiAgJGlucHV0OiBKUXVlcnk7XG4gICR3aWR0aDogbnVtYmVyO1xuICAkaGVpZ2h0OiBudW1iZXI7XG4gIGlzT3BlbjogYm9vbGVhbjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gdGhpcy4kc2VhcmNoRm9ybS5maW5kKFwiLmV0LXNlYXJjaFwiKTtcbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGZvcm0uZmlyc3QoKTtcbiAgICB0aGlzLiR3aWR0aCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgICB0aGlzLiRoZWlnaHQgPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLmhlaWdodCgpO1xuICB9XG5cbiAgcmVsb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIFJlbG9hZFwiKTtcbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyID0gJChcIi5tZXRhLXNlYXJjaC10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciA9ICQoXCIuc3VwZXItc2VhcmNoLWNsb3NlXCIpO1xuICAgIHRoaXMuJHNlYXJjaEZvcm0gPSAkKFwiLnN1cGVyLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRzZWFyY2hCdXR0b25BcmVhID0gJChcIi5tZXRhLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRpY29uID0gdGhpcy4kc2VhcmNoVHJpZ2dlci5jaGlsZHJlbihcImlcIik7XG4gICAgdGhpcy4kZm9ybSA9ICQoXCIuZXQtc2VhcmNoXCIpO1xuICAgIHRoaXMuJHdpZHRoID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS53aWR0aCgpO1xuICAgIHRoaXMuJGhlaWdodCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEuaGVpZ2h0KCk7XG5cbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS53aWR0aCgpO1xuICB9XG5cbiAgZ2V0VG9wUG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4kc2VhcmNoVHJpZ2dlci5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gIH1cblxuICBnZXRMZWZ0UG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4kc2VhcmNoVHJpZ2dlci5vZmZzZXQoKS5sZWZ0O1xuICB9XG5cbiAgY2xvc2VTZWFyY2goIGV2ZW50ICkge1xuXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgIGxldCBhbmltYXRpb24gPSBuZXcgVGltZWxpbmVMaXRlKCk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyLCAuMiwge1xuICAgICAgdG9wOiBcIjUlXCIsXG4gICAgICBvcGFjaXR5OiBcIjBcIlxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGZvcm0sIC40LCB7XG4gICAgICB0b3A6IFwiMjUlXCIsXG4gICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICAgIGVhc2U6IEV4cG8uZWFzZUluT3V0XG4gICAgfSk7XG5cbiAgICBhbmltYXRpb24udG8odGhpcy4kc2VhcmNoRm9ybSwgLjIsIHtcbiAgICAgIGxlZnQ6IHRoaXMuZ2V0TGVmdFBvc2l0aW9uKCksXG4gICAgICB0b3A6IHRoaXMuZ2V0VG9wUG9zaXRpb24oKSxcbiAgICAgIHdpZHRoOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIGRlbGF5OiAuMyxcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIlxuICAgICAgICB9KTtcbiAgICAgICAgVHdlZW5MaXRlLnRvKHRoaXMuJGljb24sIC4yLCB7XG4gICAgICAgICAgdG9wOiBcIjUwJVwiLFxuICAgICAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgICB9KTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC40LCB7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzZWFyY2hGb3JtLmNzcyh7XG4gICAgICAgICAgXCJ6LWluZGV4XCI6IC0xLFxuICAgICAgICAgIFwibGVmdFwiOiAwLFxuICAgICAgICAgIFwidG9wXCI6IDAsXG4gICAgICAgICAgXCJ3aWR0aFwiOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICAgICAgXCJoZWlnaHRcIjogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgICB9KTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuXG4gIH1cblxuICBvcGVuU2VhcmNoKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcblxuICAgIC8vIHByZXZlbnQgYnV0dG9uIGZyb20gYmVpbmcgdXNlZCBvbmNlIHNlYXJjaCBpcyBvcGVuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5ibHVyKCk7XG5cbiAgICB0aGlzLiRzZWFyY2hGb3JtLmNzcyh7XG4gICAgICBsZWZ0OiB0aGlzLmdldExlZnRQb3NpdGlvbigpLFxuICAgICAgdG9wOiB0aGlzLmdldFRvcFBvc2l0aW9uKCksXG4gICAgICB3aWR0aDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBcInotaW5kZXhcIjogOTk5XG4gICAgfSk7XG5cbiAgICBsZXQgYW5pbWF0aW9uID0gbmV3IFRpbWVsaW5lTGl0ZSgpO1xuXG4gICAgYW5pbWF0aW9uLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC4yLCB7XG4gICAgICB2aXNpYmlsaXR5OiBcInZpc2libGVcIixcbiAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgZGVsYXk6IC4yXG4gICAgfSkudG8odGhpcy4kc2VhcmNoRm9ybSwgLjIsIHtcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICBoZWlnaHQ6IFwiMTAwdmhcIixcbiAgICAgIGJhY2tncm91bmQ6IFwiIzM1MzczRFwiLFxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgIG92ZXJmbG93WTogXCJzY3JvbGxcIlxuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRpY29uLCAuMiwge1xuICAgICAgdG9wOiBcIjExMCVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciwgLjMsIHtcbiAgICAgIHRvcDogXCIzJVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjQsXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kZm9ybSwgLjQsIHtcbiAgICAgIHRvcDogXCIyMCVcIixcbiAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgZGVsYXk6IC40LFxuICAgICAgZWFzZTogRXhwby5lYXNlSW5PdXRcbiAgICB9KTtcblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCBsb2FkZWRcIik7XG4gICAgLy8gdGhpcy5vcGVuU2VhcmNoKCk7XG4gICAgdGhpcy4kaW5wdXQua2V5dXAoKGV2ZW50KSA9PiB7XG4gICAgICAvLyBpZiBrZXkgaXMgZW50ZXIgLSBhbmltYXRlIG91dFxuICAgICAgaWYgKCBldmVudC53aGljaCA9PT0gMTMpIHtcbiAgICAgICAgdGhpcy5jbG9zZVNlYXJjaChldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIFxuICAgICQoXCJib2R5XCIpLmtleXVwKChldmVudCkgPT4ge1xuICAgICAgaWYgKCBldmVudC53aGljaCA9PT0gMjcgJiYgdGhpcy5pc09wZW4gKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTZWFyY2goZXZlbnQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmxldCBTZWFyY2hCb3ggPSBuZXcgU2VhcmNoQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaEJveDsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi9wYXJ0aWFscy91dGlsc1wiO1xuaW1wb3J0IFNlYXJjaEJveCBmcm9tIFwiLi9jb21wb25lbnRzL3NlYXJjaFwiO1xuXG5pbnRlcmZhY2UgTmF2U3RhdGUge1xuICBuYXZFbmFibGVkOiBib29sZWFuO1xuICBtb2JpbGU6IGJvb2xlYW47XG4gIHRhYmxldDogYm9vbGVhbjtcbiAgbGFwdG9wOiBib29sZWFuO1xuICBkZXNrdG9wOiBib29sZWFuO1xufVxuXG5jbGFzcyBOYXZDb21wb25lbnQge1xuICAkbmF2VHJpZ2dlcjogSFRNTEVsZW1lbnQ7XG4gICRuYXZEcm9wZG93bjogSFRNTEVsZW1lbnQ7XG4gICRsb3dlckNvbnRhaW5lcjogSlF1ZXJ5O1xuICAkdXBwZXJDb250YWluZXI6IEpRdWVyeTtcbiAgJG5hdk1ldGE6IEpRdWVyeTtcbiAgJGRyb3BEb3duV3JhcHBlcjogSlF1ZXJ5O1xuICAkc2VhcmNoOiBKUXVlcnk7XG4gICRkcm9wRG93bkNvbnRlbnQ6IEpRdWVyeTtcblxuICBzdGF0ZTogTmF2U3RhdGU7XG5cbiAgY29uc3RydWN0b3IoKSB7XG5cbiAgICB0aGlzLiRuYXZUcmlnZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRuYXZEcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXQtZHJvcGRvd24tdHJpZ2dlclwiKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lciA9ICQoXCIubG93ZXJjb250YWluZXJcIik7XG4gICAgdGhpcy4kdXBwZXJDb250YWluZXIgPSAkKFwiLnVwcGVyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJG5hdk1ldGEgPSAkKFwiLmV0LW5hdi1tZXRhXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlciA9ICQoXCIuZXQtZHJvcGRvd24td3JhcHBlclwiKTtcbiAgICB0aGlzLiRzZWFyY2ggPSAkKFwiI25hdi14ZmVyXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duQ29udGVudCA9ICQoXCIuZXQtZHJvcGRvd24tY29udGVudFwiKTtcblxuICAgIC8qXG4gICAgIE5hdiBTdGF0ZSBPYmplY3RcbiAgICAgKi9cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICBkZXNrdG9wOiBmYWxzZVxuICAgIH07XG4gIH1cblxuXG4gIC8vIE5vdCB1c2VkXG4gIHJlbG9hZCgpIHtcblxuICAgIHRoaXMuJG5hdlRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJldC1kcm9wZG93bi10cmlnZ2VyXCIpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyID0gJChcIi5sb3dlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lciA9ICQoXCIudXBwZXJjb250YWluZXJcIik7XG4gICAgdGhpcy4kbmF2TWV0YSA9ICQoXCIuZXQtbmF2LW1ldGFcIik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyID0gJChcIi5ldC1kcm9wZG93bi13cmFwcGVyXCIpO1xuICAgIHRoaXMuJHNlYXJjaCA9ICQoXCIjbmF2LXhmZXJcIik7XG4gICAgdGhpcy4kZHJvcERvd25Db250ZW50ID0gJChcIi5ldC1kcm9wZG93bi1jb250ZW50XCIpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgZGVza3RvcDogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuXG4gIC8qXG4gICBNb2JpbGUgTmF2IGZ1bmN0aW9uYWxpdHlcbiAgICovXG4gIG9wZW5OYXYoIGV2ZW50OiBFdmVudCApOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJCh0aGlzLiRuYXZEcm9wZG93bikuYWRkQ2xhc3MoXCJtZW51LWlzLWFjdGl2ZVwiKTtcbiAgICBUd2Vlbk1heC50byh0aGlzLiRuYXZEcm9wZG93biwgLjMsIHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGNsb3NlTmF2KCBldmVudDogRXZlbnQgKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKHRoaXMuJG5hdkRyb3Bkb3duKS5yZW1vdmVDbGFzcyhcIm1lbnUtaXMtYWN0aXZlXCIpO1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuJG5hdkRyb3Bkb3duLCAuMywge1xuICAgICAgICB0b3A6IFwiLTEwMCVcIixcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5hdk9wZW5Jbml0KCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQodGhpcy4kbmF2VHJpZ2dlcikub24oXCJjbGlja1wiLCB0aGlzLm9wZW5OYXYuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcy4kbmF2VHJpZ2dlcikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBuYXZDbG9zZSggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcblxuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQoXCIjbmF2LWNsb3NlXCIpLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZU5hdi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNuYXYtY2xvc2VcIikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBuYXZJdGVtQ2xpY2soIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikuY2hpbGRyZW4oXCJhXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZWN0ZWQubmV4dChcInVsXCIpLnJlbW92ZUNsYXNzKFwiaXMtaGlkZGVuXCIpLnBhcmVudChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLnBhcmVudChcInVsXCIpLmFkZENsYXNzKFwibW92ZS1vdXRcIik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKFwiYVwiKS5vZmYoKTtcbiAgICB9XG5cbiAgfVxuXG4gIGdvYmFjayggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcblxuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQoXCIuZ28tYmFjayA+IGFcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAkKHRoaXMpO1xuICAgICAgICBzZWxlY3RlZC5wYXJlbnQoXCJsaVwiKS5wYXJlbnQoXCIuZXQtc2Vjb25kYXJ5LWRyb3Bkb3duXCIpLmFkZENsYXNzKFwiaXMtaGlkZGVuXCIpLnBhcmVudChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLnBhcmVudChcInVsXCIpLnJlbW92ZUNsYXNzKFwibW92ZS1vdXRcIik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIi5nby1iYWNrID4gYVwiKS5vZmYoKTtcbiAgICB9XG5cblxuICB9XG5cbiAgbW92ZU5hdmlnYXRpb25Nb2JpbGUoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJtb3ZlIG5hdmlnYXRpb24gbW9iaWxlXCIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLmRldGFjaCgpO1xuICAgIHRoaXMuJG5hdk1ldGEuZGV0YWNoKCk7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIuZGV0YWNoKCk7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyLmRldGFjaCgpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyLmluc2VydEFmdGVyKHRoaXMuJHVwcGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLiRuYXZNZXRhLmluc2VydEJlZm9yZSh0aGlzLiR1cHBlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kdXBwZXJDb250YWluZXIuYXBwZW5kKHRoaXMuJGRyb3BEb3duV3JhcHBlcik7XG4gICAgdGhpcy4kbmF2TWV0YS5hcHBlbmQodGhpcy4kc2VhcmNoKTtcbiAgfVxuXG4gIG1vdmVOYXZpZ2F0aW9uVGFibGV0KCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibW92ZSBuYXZpZ2F0aW9uIHRhYmxldFwiKTtcblxuICAgIHRoaXMuJHNlYXJjaC5kZXRhY2goKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lci5kZXRhY2goKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lci5hcHBlbmQodGhpcy4kbmF2TWV0YSk7XG4gICAgLy8gdGhpcy4kdXBwZXJDb250YWluZXIuYXBwZW5kKHRoaXMuJGxvd2VyQ29udGFpbmVyKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIuaW5zZXJ0QWZ0ZXIodGhpcy4kdXBwZXJDb250YWluZXIpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlci5wcmVwZW5kKHRoaXMuJHNlYXJjaCk7XG4gIH1cblxuICBtb3ZlTmF2aWdhdGlvbkRla3N0b3AoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJtb3ZlIG5hdmlnYXRpb24gZGVza3RvcFwiKTtcblxuICAgIHRoaXMuJHNlYXJjaC5pbnNlcnRCZWZvcmUodGhpcy4kZHJvcERvd25Db250ZW50KTtcblxuICB9XG5cbiAgZGlzYWJsZU1vYmlsZU5hdigpIHtcblxuICAgIC8vIGNvbnNvbGUubG9nKFwiTmF2IHR1cm5lZCBvZmZcIik7XG4gICAgdGhpcy5uYXZPcGVuSW5pdChmYWxzZSk7XG4gICAgdGhpcy5uYXZDbG9zZShmYWxzZSk7XG4gICAgdGhpcy5uYXZJdGVtQ2xpY2soZmFsc2UpO1xuICAgIHRoaXMuZ29iYWNrKGZhbHNlKTtcbiAgICB0aGlzLnN0YXRlLm5hdkVuYWJsZWQgPSBmYWxzZTtcblxuICAgIC8qXG4gICAgIFJlbW92ZSBTdHlsZXMgZnJvbSBlbGVtZW50ICYgcmVzZXQgZHJvcGRvd25cbiAgICAgKi9cbiAgICB0aGlzLiRuYXZEcm9wZG93bi5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcIlwiKTtcbiAgICB0aGlzLiRkcm9wRG93bkNvbnRlbnQucmVtb3ZlQ2xhc3MoXCJtb3ZlLW91dFwiKTtcbiAgICBsZXQgZHJvcGRvd24gPSB0aGlzLiRkcm9wRG93bkNvbnRlbnQuZmluZChcIi5ldC1zZWNvbmRhcnktZHJvcGRvd25cIik7XG5cbiAgICBkcm9wZG93bi5lYWNoKCAoaW5kZXgsIGVsZW0pID0+IHtcbiAgICAgIGlmICggISQoZWxlbSkuaGFzQ2xhc3MoXCJpcy1oaWRkZW5cIikgKSB7XG4gICAgICAgICQoZWxlbSkuYWRkQ2xhc3MoXCJpcy1oaWRkZW5cIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIGVuYWJsZU1vYmlsZU5hdigpIHtcbiAgICBjb25zb2xlLmxvZyhcIk5hdiB0dXJuZWQgb25cIik7XG4gICAgdGhpcy5uYXZPcGVuSW5pdCh0cnVlKTtcbiAgICB0aGlzLm5hdkNsb3NlKHRydWUpO1xuICAgIHRoaXMubmF2SXRlbUNsaWNrKHRydWUpO1xuICAgIHRoaXMuZ29iYWNrKHRydWUpO1xuXG4gICAgdGhpcy5zdGF0ZS5uYXZFbmFibGVkID0gdHJ1ZTtcblxuICB9XG5cbiAgYnJlYWtQb2ludE1vYmlsZSgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgTW9iaWxlXCIpO1xuXG4gICAgaWYgKCAhdGhpcy5zdGF0ZS5uYXZFbmFibGVkICkge1xuICAgICAgdGhpcy5lbmFibGVNb2JpbGVOYXYoKTtcbiAgICB9XG4gICAgdGhpcy5tb3ZlTmF2aWdhdGlvbk1vYmlsZSgpO1xuICB9XG5cbiAgYnJlYWtQb2ludFRhYmxldCggcHJldlN0YXRlICkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBUYWJsZXRcIik7XG4gICAgaWYgKCAhdGhpcy5zdGF0ZS5uYXZFbmFibGVkICkge1xuICAgICAgdGhpcy5lbmFibGVNb2JpbGVOYXYoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uVGFibGV0KCk7XG4gIH1cblxuICBicmVha1BvaW50TGFwdG9wKCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IExhcHRvcFwiKTtcblxuICAgIGlmICggdGhpcy5zdGF0ZS5uYXZFbmFibGVkICkge1xuICAgICAgdGhpcy5kaXNhYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuXG4gICAgLy8gaWYgcHJldiBzdGF0ZSB3YXMgdGFibGV0IGRvIHRoaXM6XG4gICAgaWYgKCBwcmV2U3RhdGUuZGVza3RvcCA9PT0gZmFsc2UgfHwgcHJldlN0YXRlLm1vYmlsZSA9PT0gdHJ1ZSApIHtcblxuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvblRhYmxldCgpO1xuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvbkRla3N0b3AoKTtcbiAgICB9XG4gIH1cblxuICBicmVha1BvaW50RGVza3RvcCggcHJldlN0YXRlICkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBEZXNrdG9wXCIpO1xuXG4gICAgaWYgKCBwcmV2U3RhdGUubGFwdG9wID09PSBmYWxzZSB8fCBwcmV2U3RhdGUubW9iaWxlID09PSB0cnVlICkge1xuXG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uVGFibGV0KCk7XG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uRGVrc3RvcCgpO1xuICAgIH1cblxuICB9XG5cbiAgbmF2UmVzaXplKCkge1xuICAgIC8qXG4gICAgIE1vYmlsZVxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLm1vYmlsZSApIHtcblxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS5tb2JpbGUgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludE1vYmlsZSgpO1xuICAgICAgfVxuICAgICAgLy8gVHVybiBtb2JpbGUgb25cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiB0cnVlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBUYWJsZXRcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIC8vIHRhYmxldCBhbmQgaGlnaGVyXG4gICAgICAvLyBkbyBvbmNlXG4gICAgICBpZiAoICF0aGlzLnN0YXRlLnRhYmxldCApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50VGFibGV0KHByZXZTdGF0ZSk7XG4gICAgICB9XG4gICAgICAvLyBUdXJuIG1vYmlsZSBvblxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IHRydWUsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qXG4gICAgIExhcHRvcFxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIGxldCBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS5sYXB0b3AgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludExhcHRvcChwcmV2U3RhdGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiB0cnVlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgIERlc2t0b3BcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5kZXNrdG9wICkge1xuXG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS5kZXNrdG9wICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnREZXNrdG9wKHByZXZTdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIG5hdkxvYWQoKSB7XG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubW9iaWxlICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnRNb2JpbGUoKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogdHJ1ZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy50YWJsZXQgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludFRhYmxldCh0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogdHJ1ZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnRMYXB0b3AodGhpcy5zdGF0ZSk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiB0cnVlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5kZXNrdG9wICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnREZXNrdG9wKHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIk5hdiBsb2FkZWRcIik7XG5cbiAgICB0aGlzLm5hdkxvYWQoKTtcbiAgICAvLyBTZWFyY2hCb3guaW5pdCgpO1xuXG4gICAgLyoqKioqKioqKioqKioqKipcbiAgICAgTkFWIFJFU0laRSBFVkVOVFxuICAgICAqKioqKioqKioqKioqKiovXG5cbiAgICB3aW5kb3cub25yZXNpemUgPSAoIGV2ZW50ICkgPT4ge1xuICAgICAgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgICA/IHNldFRpbWVvdXQodGhpcy5uYXZSZXNpemUuYmluZCh0aGlzKSwgMzAwKVxuICAgICAgICA6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5uYXZSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgfTtcblxuXG4gIH1cbn1cblxubGV0IE5hdiA9IG5ldyBOYXZDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5kZWNsYXJlIHZhciBJc290b3BlOiBhbnk7XG5cbmNsYXNzIEdhbGxlcnlDb21wb25lbnQge1xuXG4gIGdyaWRJZDogc3RyaW5nO1xuICBnYWxsZXJ5X2dyaWQ6IG51bWJlcjtcbiAgZ2FsbGVyeV93cmFwcGVyX3dpZHRoOiBudW1iZXI7XG4gICRmdWxsR3JpZDogSlF1ZXJ5O1xuICAkZ2FsbGVyeUNvbnRhaW5lcjogSlF1ZXJ5O1xuICAkZ3JpZDogYW55O1xuICBjdXJyZW50SGVpZ2h0OiBzdHJpbmc7XG4gIGN1cnJlbnRIZWlnaHRQWDogbnVtYmVyO1xuICByZUlzb1RpbWVPdXQ6IG51bWJlcjtcbiAgaXNDb250YWluZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ncmlkSWQgPSAkKFwiLmlubmVyLWNvbnRlbnQtbW9kdWxlXCIpLmNoaWxkcmVuKFwiZGl2XCIpLmF0dHIoXCJpZFwiKTtcbiAgICB0aGlzLiRmdWxsR3JpZCA9ICQoXCIjXCIgKyB0aGlzLmdyaWRJZCk7XG4gICAgdGhpcy4kZ2FsbGVyeUNvbnRhaW5lciA9ICQoXCIuZ2FsbGVyeS1jb250YWluZXJcIik7XG4gIH1cblxuICBzZXR1cElzb3RvcGUoKSB7XG4gICAgLy8gaW5pdCBpc290b3BlXG4gICAgdGhpcy4kZ3JpZCA9IHRoaXMuJGZ1bGxHcmlkLmlzb3RvcGUoe1xuICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICAgICAgaXRlbVNlbGVjdG9yOiBcIi5nYWxsZXJ5LWl0ZW1cIixcbiAgICAgIGlzSW5pdExheW91dDogZmFsc2UsXG4gICAgICBtYXNvbnJ5OiB7XG4gICAgICAgIFwiY29sdW1uV2lkdGhcIjogXCIuZ3JpZC1zaXplclwiXG4gICAgICB9LFxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBcIi4zc1wiXG4gICAgfSk7XG4gIH1cblxuICBnYWxsZXJ5SXNvdG9wZVdyYXBwZXIoKSB7XG4gICAgbGV0IHdpbmRvd1dpZHRoUmVmID0gJCh3aW5kb3cpLmlubmVyV2lkdGgoKTsgLy8gZm9yIHNjcm9sbCBiYXIgZml4IGN1cnJlbnRseVxuXG4gICAgLy8gSXMgY29udGFpbmVyIG9yIGZ1bGwgd2lkdGg/XG4gICAgaWYgKCB0aGlzLiRnYWxsZXJ5Q29udGFpbmVyLmhhc0NsYXNzKFwiY29udGFpbmVyXCIpICkge1xuICAgICAgdGhpcy5pc0NvbnRhaW5lZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy9cbiAgICBpZiAoIHdpbmRvd1dpZHRoUmVmID4gMTYwMCAmJiB0aGlzLmlzQ29udGFpbmVkID09PSBmYWxzZSApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ3JpZCA1XCIpO1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA1O1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDYwMCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMTtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSA5OTEgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDI7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gMTE5OSApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ3JpZCAzXCIpO1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcImdyaWQgNFwiKTtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gNDtcbiAgICB9XG5cbiAgICBpZiAoICQoXCIuZ2FsbGVyeS0zLWdyaWRcIikubGVuZ3RoID4gMCAmJiB3aW5kb3dXaWR0aFJlZiA+IDEyNDggKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDM7XG4gICAgfVxuXG4gICAgaWYgKCAkKFwiLmdhbGxlcnktNC1ncmlkXCIpLmxlbmd0aCA+IDAgJiYgd2luZG93V2lkdGhSZWYgPiAxNTg0ICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA0O1xuICAgIH1cblxuICAgIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoID0gJChcIi5nYWxsZXJ5LWNvbnRhaW5lclwiKS53aWR0aCgpO1xuXG4gICAgaWYgKCB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCAlIHRoaXMuZ2FsbGVyeV9ncmlkID4gMCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoID0gdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggKyAoIHRoaXMuZ2FsbGVyeV9ncmlkIC0gdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggJSB0aGlzLmdhbGxlcnlfZ3JpZCk7XG4gICAgfVxuICAgICQoXCIuZ2FsbGVyeS1pc290b3BlXCIpLmNzcyhcIndpZHRoXCIsIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoKTtcblxuICAgIHJldHVybiB0aGlzLmdhbGxlcnlfZ3JpZDtcbiAgfVxuXG4gIHJlbG9hZElzb3RvcCgpIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoKTtcbiAgICB0aGlzLnNldE1pbkhlaWdodCgpO1xuICB9XG5cbiAgc2V0TWluSGVpZ2h0KCkge1xuXG4gICAgLy8gU2V0IG1pbiBoZWlnaHQgZGVwZW5kaW5nIG9uZSB3aGF0IGNvbnRlbnQgd2FzIGZpbHRlcmVkXG4gICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gJChcIi5nYWxsZXJ5LWl0ZW0ud2lkdGgxXCIpLmNzcyhcInBhZGRpbmctYm90dG9tXCIpO1xuICAgIGxldCBoZWlnaHRTdHIgPSB0aGlzLmN1cnJlbnRIZWlnaHQudG9TdHJpbmcoKTtcbiAgICB0aGlzLmN1cnJlbnRIZWlnaHRQWCA9IHRoaXMucHhDb252ZXJ0KGhlaWdodFN0cik7XG5cbiAgICBpZiAoIHRoaXMuY3VycmVudEhlaWdodFBYICE9PSAwICkge1xuXG4gICAgICAkKFwiLmdhbGxlcnktaXNvdG9wZVwiKS5jc3MoXCJtaW4taGVpZ2h0XCIsIE1hdGgucm91bmQodGhpcy5jdXJyZW50SGVpZ2h0UFgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0UFggPSAkKFwiLmdhbGxlcnktaXRlbS53aWR0aDFcIikuaGVpZ2h0KCk7XG5cbiAgICAgICQoXCIuZ2FsbGVyeS1pc290b3BlXCIpLmNzcyhcIm1pbi1oZWlnaHRcIiwgTWF0aC5yb3VuZCh0aGlzLmN1cnJlbnRIZWlnaHRQWCkpO1xuICAgIH1cbiAgfVxuXG4gIHB4Q29udmVydCggb2JqZWN0SGVpZ2h0OiBzdHJpbmcgKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KG9iamVjdEhlaWdodC5zbGljZSgwLCAtMikpO1xuICB9XG5cbiAgYWRkSW1hZ2VUcmFuc2l0aW9uKCkge1xuICAgIC8vIGFkZCB0cmFuc2l0aW9uIGZvciBpbnRybyBhbmltYXRpb25cbiAgICAkKFwiLmdhbGxlcnktaXRlbVwiKS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiNjAwbXNcIik7XG4gIH1cblxuICBsb2FkSW1hZ2VzSW4oKSB7XG4gICAgdGhpcy4kZ3JpZC5pc290b3BlKFwib25jZVwiLCBcImFycmFuZ2VDb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIGZhZGUgaW5cbiAgICAgICQoXCIuZ2FsbGVyeS1pdGVtXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyByZW1vdmUgYW5pbWF0aW9uIGZvciBzbW9vdGggZmlsdGVyaW5nXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcIi5nYWxsZXJ5LWl0ZW1cIikuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIjBtc1wiKTtcbiAgICAgIH0sIDUwMCk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVJc29UaW1lT3V0KTtcblxuICAgIC8vIGdhbGxlcnkgaXNvdG9wZVxuICAgIGlmICggJChcIi5nYWxsZXJ5LWNvbnRhaW5lclwiKS5sZW5ndGggPiAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5SXNvdG9wZVdyYXBwZXIoKTtcblxuICAgICAgLy8gb24gcmVzaXplIGNvbXBsZXRlLCByZWFkanVzdCBncmlkXG4gICAgICB0aGlzLnJlSXNvVGltZU91dCA9IHNldFRpbWVvdXQodGhpcy5yZWxvYWRJc290b3AuYmluZCh0aGlzKSwgNTAwKTtcbiAgICB9XG4gIH1cblxuICBvbkZpbHRlckNsaWNrKCBlbCwgZWwyICkge1xuICAgIGxldCAkdGhpcyA9ICQoZWwyLnRvRWxlbWVudCk7XG5cbiAgICAkdGhpcy5wYXJlbnQoKS5jaGlsZHJlbihcImxpXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgIH0pO1xuXG4gICAgJHRoaXMuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgIGxldCBmaWx0ZXJWYWx1ZSA9ICR0aGlzLmF0dHIoXCJkYXRhLWZpbHRlclwiKTtcblxuICAgIHRoaXMucmVGaWx0ZXIoZmlsdGVyVmFsdWUpO1xuICB9XG5cbiAgcmVGaWx0ZXIoIGl0ZW0gKSB7XG4gICAgdGhpcy4kZ3JpZC5pc290b3BlKHtcbiAgICAgIGZpbHRlcjogaXRlbVxuICAgIH0pO1xuICB9XG5cbiAgLy8gR2V0IGdyaWQgdG8gYXNzaWduIGR5bmFtaWNhbGx5XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIklzb3RvcGUgSW5pdFwiKTtcblxuICAgIC8vIEFkZCB0cmFuc2l0aW9uIHRvIGFuaW1hdGUgaW1hZ2UgaW4gZ3JhY2VmdWxseVxuICAgIHRoaXMuYWRkSW1hZ2VUcmFuc2l0aW9uKCk7XG5cbiAgICAvLyBTZXR1cCBJc290b3BlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgIHRoaXMuc2V0dXBJc290b3BlKCk7XG5cbiAgICAvLyBDcmVhdGUgcGVyZmVjdCBncmlkXG4gICAgdGhpcy5nYWxsZXJ5SXNvdG9wZVdyYXBwZXIoKTtcblxuICAgIC8vIGRlbGF5IGlzb3RvcGUgaW5pdCB1c2luZyBoZWxwZXIgZnVuY3Rpb24gdGhhdCBmaXJlcyBvbiByZXNpemVcbiAgICBzZXRUaW1lb3V0KHRoaXMucmVsb2FkSXNvdG9wLmJpbmQodGhpcyksIDEwMDApO1xuXG4gICAgLy8gQW5pbWF0ZSBJbWFnZXMgaW4gb25Mb2FkXG4gICAgdGhpcy5sb2FkSW1hZ2VzSW4oKTtcblxuICAgIC8vIEFkZCBmaWx0ZXIgb24gQ2xpY2tcbiAgICBsZXQgJHRoaXMgPSB0aGlzO1xuICAgICQoXCIuZmlsdGVyLWdyb3VwXCIpLm9uKFwiY2xpY2tcIiwgXCJsaVwiLCB0aGlzLm9uRmlsdGVyQ2xpY2suYmluZCh0aGlzLCAkdGhpcykpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxufVxuXG5sZXQgSXNvdG9wZUdhbGxlcnkgPSBuZXcgR2FsbGVyeUNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBJc290b3BlR2FsbGVyeTsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIFNsaWRlckNvbXBvbmVudCB7XG4gIGdhbGxlcnk6IEpRdWVyeTtcbiAgY29udGFpbmVyOiBKUXVlcnk7XG4gIGNsb3NlQnRuOiBKUXVlcnk7XG4gIG5leHRCdG46IEpRdWVyeTtcbiAgcHJldkJ0bjogSlF1ZXJ5O1xuICBpbmRleDogbnVtYmVyO1xuICBjdXJyZW50U2xpZGU6IG51bWJlcjtcbiAgdG90YWxTbGlkZTogbnVtYmVyO1xuICBjb3VudFRvdGFsOiBKUXVlcnk7XG4gIGN1cnJlbnRDb3VudDogSlF1ZXJ5O1xuICBzbGlkZXJPcGVuOiBib29sZWFuO1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCBlbCApIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9ICQoZWwpO1xuICAgIHRoaXMuZ2FsbGVyeSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuaGVhZGVyLXNsaWRlci1nYWxsZXJ5XCIpO1xuICAgIHRoaXMuY2xvc2VCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmhlYWRlci1zbGlkZXItY2xvc2VcIik7XG4gICAgdGhpcy5uZXh0QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zbGlkZXItbmF2aWdhdGlvbi1uZXh0XCIpO1xuICAgIHRoaXMucHJldkJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyLW5hdmlnYXRpb24tcHJldlwiKTtcbiAgICB0aGlzLmNvdW50VG90YWwgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnRvdGFsXCIpO1xuICAgIHRoaXMuY3VycmVudENvdW50ID0gdGhpcy5jb250YWluZXIuZmluZChcIi5jdXJyZW50XCIpO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMuY3VycmVudFNsaWRlID0gdGhpcy5pbmRleCArIDE7XG4gICAgdGhpcy5zbGlkZXJPcGVuID0gZmFsc2U7XG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeS5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0VG90YWxTbGlkZXMoKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSB0aGlzLmdhbGxlcnkuY2hpbGRyZW4oXCJsaVwiKS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U2xpZGU7XG4gIH1cblxuICB1cGRhdGVDdXJyZW50U2xpZGUoIGV2ZW50ICkge1xuXG4gICAgaWYgKCBldmVudCA9PT0gXCJyaWdodFwiICkge1xuICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGUrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRleC0tO1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGUtLTtcbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZU5hdiggaW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IEpRdWVyeSApIHtcblxuICAgIC8vIHVwZGF0ZSBudW1iZXJzIG9uIHNjcmVlblxuICAgIHRoaXMuY3VycmVudENvdW50Lmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gICAgLy8gRW5hYmxlL0Rpc2FibGUgYXJyb3cgYnRuc1xuICAgIHRoaXMucHJldkJ0bi5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6Zmlyc3QtY2hpbGRcIikpO1xuICAgIHRoaXMubmV4dEJ0bi5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6bGFzdC1jaGlsZFwiKSk7XG4gIH1cblxuICB1cGRhdGVTbGlkZSggZGlyZWN0aW9uICkge1xuICAgIFxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTtcblxuICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAvLyByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGNsYXNzLCB0aGVuIG1vdmUgbGVmdFxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIikuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgY3VycmVudFNsaWRlLm5leHQoKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGNsYXNzLCB0aGVuIG1vdmUgbGVmdFxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBjdXJyZW50U2xpZGUucHJldigpLmFkZENsYXNzKFwic2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBpbmRleFxuICAgIHRoaXMudXBkYXRlQ3VycmVudFNsaWRlKGRpcmVjdGlvbik7XG5cbiAgICAvLyB1cGRhdGUgTmF2aWdhdGlvblxuICAgIHRoaXMudXBkYXRlTmF2KHRoaXMuaW5kZXgsIHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcbiAgfVxuXG4gIGFycm93SGFuZGxlciggZXZlbnQgKSB7XG5cbiAgICAvLyBjaGVjayB3aGljaCBrZXkgd2FzIHByZXNzZWQgYW5kIG1ha2Ugc3VyZSB0aGUgc2xpZGUgaXNuJ3QgdGhlIGJlZ2lubmluZyBvciB0aGUgbGFzdCBvbmVcbiAgICBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJyaWdodFwiICYmIHRoaXMuY3VycmVudFNsaWRlICE9PSB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG5cbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuc2xpZGVyT3BlbiApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA8PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwibGVmdFwiICYmIHRoaXMuY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCAmJiB0aGlzLnNsaWRlck9wZW4gKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA8PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgb3BlblNsaWRlciggZWwsIGV2ZW50ICkge1xuICAgIC8vIGVsID0gdGhpc1xuICAgIC8vIGVsMiBpcyBldmVudFxuICAgIGlmICggIXRoaXMuY29udGFpbmVyLmhhc0NsYXNzKFwiaXMtYWN0aXZlXCIpICYmICQoZXZlbnQuY3VycmVudFRhcmdldCkuaXModGhpcy5nYWxsZXJ5KSApIHtcblxuICAgICAgdGhpcy5zbGlkZXJPcGVuID0gdHJ1ZTtcblxuICAgICAgdGhpcy5jb250YWluZXIuYWRkQ2xhc3MoXCJpcy1hY3RpdmVcIikub25lKFwid2Via2l0VHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZFwiLCAoKSA9PiB7XG4gICAgICAgICQoXCJib2R5LGh0bWxcIikuYW5pbWF0ZSh7IFwic2Nyb2xsVG9wXCI6IHRoaXMuY29udGFpbmVyLm9mZnNldCgpLnRvcCB9LCAyMDApO1xuXG4gICAgICAgIC8vIENsb3NlIEJ0biBhbmltYXRlIGluXG4gICAgICAgIGxldCBjbG9zZUJ0bkFuaW1hdGlvbiA9IFR3ZWVuTWF4LnRvKHRoaXMuY2xvc2VCdG4sIC4zLCB7XG4gICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgIHg6IC0zMCxcbiAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0LFxuICAgICAgICAgIGRlbGF5OiAuM1xuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VTbGlkZXIoIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNsYXNzKFwiaXMtYWN0aXZlXCIpO1xuXG4gICAgdGhpcy5zbGlkZXJPcGVuID0gZmFsc2U7XG5cbiAgICBUd2VlbkxpdGVcbiAgICAgIC50bygkKHdpbmRvdyksIC41LFxuICAgICAgICB7XG4gICAgICAgICAgc2Nyb2xsVG86IHsgeTogMCB9LCBlYXNlOiBQb3dlcjIuZWFzZU91dCxcbiAgICAgICAgICBkZWxheTogLjVcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIGxldCBjbG9zZUJ0bkFuaW1hdGlvbiA9IFR3ZWVuTWF4LnRvKHRoaXMuY2xvc2VCdG4sIC4zLCB7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgejogLjAwMSxcbiAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXQsXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMuY2xvc2VCdG4sIC4zLCB7XG4gICAgICAgICAgcmlnaHQ6IDUwXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tTaXplKCkge1xuXG4gICAgLy8gT24gcmVzaXplIGVuZCAtIGNoZWNrIHRvIGVuYWJsZSBjbGlja3MgZm9yIGRlc2t0b3Agb3IgcmVtb3ZlIHRoZW1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG4gICAgdGhpcy5yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSB0aGlzO1xuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeS5vbihcImNsaWNrXCIsIHRoaXMub3BlblNsaWRlci5iaW5kKHRoaXMsICR0aGlzKSk7XG4gICAgICAgIHRoaXMuY2xvc2VCdG4ub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2xpZGVyLmJpbmQodGhpcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5Lm9mZigpO1xuICAgICAgICB0aGlzLmNsb3NlQnRuLm9mZigpO1xuICAgICAgfVxuXG4gICAgfSwgNDAwKTtcblxuICB9XG5cbiAgaW5pdCgpIHtcblxuICAgIC8vIENyZWF0ZSBCaW5kaW5nIEV2ZW50c1xuICAgIHRoaXMuY2hlY2tTaXplKCk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5jaGVja1NpemUuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBMZWZ0IGFuZCByaWdodCBldmVudHNcbiAgICB0aGlzLm5leHRCdG4ub24oXCJjbGlja1wiLCB7IGtleXM6IFwicmlnaHRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnByZXZCdG4ub24oXCJjbGlja1wiLCB7IGtleXM6IFwibGVmdFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgLy8gSnF1ZXJ5IGtleXMgcGx1Z2luXG4gICAgJChkb2N1bWVudClcbiAgICAgIC5iaW5kKFwia2V5ZG93blwiLCBcImxlZnRcIiwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSlcbiAgICAgIC5iaW5kKFwia2V5ZG93blwiLCBcImVzY1wiLCB0aGlzLmNsb3NlU2xpZGVyLmJpbmQodGhpcykpXG4gICAgICAuYmluZChcImtleWRvd25cIiwgXCJyaWdodFwiLCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIC8vIHVwZGF0ZSBuYXYgb24gZmlyc3QgbG9hZFxuICAgIHRoaXMudXBkYXRlTmF2KHRoaXMuaW5kZXgsIHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcblxuICAgIC8vIHNldCB0b3RhbCBzbGlkZXMgbnVtYmVyXG4gICAgdGhpcy5jb3VudFRvdGFsLmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0VG90YWxTbGlkZXMoKSkpO1xuICB9XG59XG5cbi8vIGxvb3AgdGhyb3VnaCBlYWNoIGhlYWRlciBzbGlkZXIgb2JqZWN0IG9uIHRoZSBwYWdlXG5jbGFzcyBIZWFkZXJTbGlkZXJDb21wb25lbnQge1xuXG4gIGl0ZW1JbmZvV3JhcHBlcjogSlF1ZXJ5O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXRlbUluZm9XcmFwcGVyID0gJChcIi5oZWFkZXItc2xpZGVyLWNvbnRhaW5lclwiKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJIZWFkZXIgU2xpZGVyIGluaXRcIik7XG5cbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlci5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAvLyBQYXNzIFwidGhpc1wiIHRvIGVhY2ggbmV3IEhlYWRlciBzbGlkZXIgY29tcG9uZW50XG4gICAgICBsZXQgc2xpZGVyID0gbmV3IFNsaWRlckNvbXBvbmVudChlbCk7XG4gICAgICBzbGlkZXIuaW5pdCgpO1xuICAgIH0pO1xuICB9XG5cbn1cblxubGV0IEhlYWRlclNsaWRlciA9IG5ldyBIZWFkZXJTbGlkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyU2xpZGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuXG5jbGFzcyBTdmdIZWFkZXJDb21wb25lbnQge1xuICBzdmc6IEpRdWVyeTtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHdpbmRvdzogSlF1ZXJ5O1xuICB3aW5XaWR0aDogbnVtYmVyO1xuICBwcm9wb3J0aW9uOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdmcgPSAkKFwiLmRpdmlkZXItc3ZnXCIpO1xuICAgIHRoaXMud2luZG93ID0gJCh3aW5kb3cpO1xuICAgIHRoaXMucHJvcG9ydGlvbiA9IDE4O1xuICAgIHRoaXMud2luV2lkdGggPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53aW5XaWR0aCAvIHRoaXMucHJvcG9ydGlvbjtcbiAgfVxuXG4gIF9zZXRXaW5kb3dXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiAkKHdpbmRvdykud2lkdGgoKTtcbiAgfVxuXG4gIF9zZXRTdmdIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBsZXQgaGVpZ2h0ID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKSAvIDE4O1xuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuXG4gIHJlc2l6ZVN2ZygpIHtcblxuICAgIHRoaXMud2luV2lkdGggPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5fc2V0U3ZnSGVpZ2h0KCk7XG5cbiAgICAvLyBzZXQgd2lkdGggb2YgaXRlbVxuICAgIC8vIHRoaXMuc3ZnLmF0dHIoXCJ3aWR0aFwiLCB0aGlzLndpbldpZHRoKTtcbiAgICB0aGlzLnN2Zy5jc3MoXCJ3aWR0aFwiLCB0aGlzLndpbldpZHRoKTtcblxuICAgIC8vIHNldCBoZWlnaHQgcHJvcG9ydGlvbiBvZiAyOFxuICAgIHRoaXMuc3ZnLmF0dHIoXCJoZWlnaHRcIiwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuc3ZnLmhlaWdodCh0aGlzLmhlaWdodCk7XG4gIH1cblxuICBhbmltYXRlSW4oKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJBbmltYXRlIEluXCIpO1xuXG4gICAgdGhpcy5zdmcgPSAkKFwiLmRpdmlkZXItc3ZnXCIpO1xuICAgIHRoaXMucHJvcG9ydGlvbiA9IDE4O1xuICAgIHRoaXMud2luZG93ID0gJCh3aW5kb3cpO1xuICAgIHRoaXMud2luV2lkdGggPSB0aGlzLndpbmRvdy53aWR0aCgpO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53aW5XaWR0aCAvIHRoaXMucHJvcG9ydGlvbjtcblxuICAgIC8vIHNldCB3aWR0aCBvZiBpdGVtXG4gICAgdGhpcy5zdmcuYXR0cihcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuXG4gICAgLy8gc2V0IGhlaWdodCBwcm9wb3J0aW9uIG9mIDI4XG4gICAgdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zdmcuaGVpZ2h0KHRoaXMuaGVpZ2h0KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLnN2ZywgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgYm90dG9tOiBcIi0zcHhcIixcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJTdmcgaGVhZGVyIGxvYWRlZFwiKTtcblxuICAgIC8vIHRoaXMuc3ZnLmhlaWdodCh0aGlzLl9zZXRTdmdIZWlnaHQoKSk7XG4gICAgLy8gdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLl9zZXRTdmdIZWlnaHQoKSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy5zdmcsIC4xLCB7XG4gICAgICB5OiBcIjNcIixcbiAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgd2lkdGg6IHRoaXMuX3NldFdpbmRvd1dpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuX3NldFN2Z0hlaWdodCgpLFxuICAgICAgZGVsYXk6IDAsXG4gICAgICBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiXG4gICAgfSk7XG5cblxuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMucmVzaXplU3ZnLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IFN2Z0hlYWRlciA9IG5ldyBTdmdIZWFkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3ZnSGVhZGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG4vLyBUT0RPOiBTaWRlYmFyIGltYWdlIGxvYWRpbmdcbmNsYXNzIEltYWdlTG9hZGVyQ29tcG9uZW50IHtcbiAgYXJyOiBzdHJpbmdbXTtcbiAgYm9keTogSlF1ZXJ5O1xuICBjb250ZW50OiBKUXVlcnk7XG4gIGhlcm86IEpRdWVyeTtcbiAgaGFzSGVybzogbnVtYmVyO1xuICBiZ0ltYWdlOiBKUXVlcnk7XG4gIGhhc0JnSW1hZ2U6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFyciA9IFtdO1xuICAgIHRoaXMuYm9keSA9ICQoXCJib2R5XCIpO1xuICAgIHRoaXMuY29udGVudCA9ICQoXCIjY29udGVudFwiKTtcbiAgICB0aGlzLmhlcm8gPSAkKFwiLmhlcm9cIik7XG4gICAgdGhpcy5oYXNIZXJvID0gdGhpcy5oZXJvLmxlbmd0aDtcbiAgICB0aGlzLmJnSW1hZ2UgPSAkKFwiLmltZy1sb2FkZXItYmdcIik7XG4gICAgdGhpcy5oYXNCZ0ltYWdlID0gdGhpcy5iZ0ltYWdlLmxlbmd0aDtcbiAgfVxuXG4gIGFuaW1hdGVCbG9nUHJpbWFyeSgpOiB2b2lkIHtcbiAgICBsZXQgYmxvZ1ByaW1hcnkgPSAkKFwiLnByaW1hcnlcIik7XG4gICAgbGV0IGJsb2dCZ0ltYWdlID0gYmxvZ1ByaW1hcnkuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKTtcblxuICAgIGlmICggYmxvZ0JnSW1hZ2UgIT09IFwibm9uZVwiICkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgVHdlZW5MaXRlXG4gICAgICAgICAgLnRvKGJsb2dQcmltYXJ5LCAuMyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgejogXCIuMDAxXCIsXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlXG4gIC8vIGFuaW1hdGVIZXJvSGVhZGVyKCk6IHZvaWQge1xuICAvLyAgIGxldCBiID0gdGhpcy5oZXJvLmZpbmQoXCIuaGVyby1iYWNrZ3JvdW5kXCIpLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIik7XG4gIC8vXG4gIC8vICAgaWYgKCBiICE9PSBcIm5vbmVcIiApIHtcbiAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAvL1xuICAvLyAgICAgICB0aGlzLmhlcm8uYWRkQ2xhc3MoXCJsb2FkZWRcIik7XG4gIC8vXG4gIC8vICAgICAgIFR3ZWVuTGl0ZVxuICAvLyAgICAgICAgIC50byh0aGlzLmhlcm8sIC40LFxuICAvLyAgICAgICAgICAge1xuICAvLyAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAvLyAgICAgICAgICAgfVxuICAvLyAgICAgICAgICk7XG4gIC8vICAgICB9LCAzMDApO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vXG4gIC8vICAgICB0aGlzLmhlcm8uYWRkQ2xhc3MoXCJsb2FkZWRcIik7XG4gIC8vXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgYW5pbWF0ZUJsb2dBcnRpY2xlcygpOiB2b2lkIHtcbiAgICBsZXQgYW5pbWF0ZSA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5hcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICBhbmltYXRlLnRvKHRoaXMuYXJyWyBpIF0sIDAuMSwgeyBvcGFjaXR5OiBcIjFcIiwgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIiB9KTtcbiAgICB9XG4gIH1cblxuICBwcmVsb2FkSW1hZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuYXJyID0gW107XG5cbiAgICB0aGlzLmNvbnRlbnQuaW1hZ2VzTG9hZGVkKHsgYmFja2dyb3VuZDogdHJ1ZSB9LCAoKSA9PiB7XG5cbiAgICAgICAgLy8gQmxvZyBwcmltYXJ5IGFydGljbGVcbiAgICAgICAgdGhpcy5ib2R5Lmhhc0NsYXNzKFwiYmxvZ1wiKSA/IHRoaXMuYW5pbWF0ZUJsb2dQcmltYXJ5KCkgOiBcIlwiO1xuXG4gICAgICAgIC8vIEhlcm8gaGVhZGVyIGludHJvXG4gICAgICAgIC8vIHRoaXMuaGFzSGVybyA+IDAgPyB0aGlzLmFuaW1hdGVIZXJvSGVhZGVyKCkgOiBcIlwiO1xuICAgICAgICB0aGlzLmhhc0JnSW1hZ2UgPiAwID8gdGhpcy5iZ0ltYWdlLmFkZENsYXNzKFwibG9hZGVkXCIpIDogXCJcIjtcblxuICAgICAgfSlcbiAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCBpbnN0YW5jZSApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIGxvYWRlZFwiKTtcbiAgICAgIH0pXG4gICAgICAuZG9uZSgoIGluc3RhbmNlICkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBpbWFnZXMgc3VjY2Vzc2Z1bGx5IGxvYWRlZFwiKTtcblxuICAgICAgICAvLyBBbmltYXRpb24gZm9yIEJsb2cgaW5kZXggaG9tZXBhZ2VcbiAgICAgICAgdGhpcy5hbmltYXRlQmxvZ0FydGljbGVzKCk7XG4gICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoXCJpbWdMb2FkZWRcIik7XG4gICAgICAgIFxuICAgICAgICAvLyBFeGFtcGxlIG9uIGhvdyB0byB0cmlnZ2VyIGV2ZW50cyBlbHNld2hlcmVcbiAgICAgICAgLy8gJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coXCJpbWFnZSBsb2FkZWQgY3VzdG9tIGV2ZW50XCIpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgfSlcbiAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIGxvYWRlZCwgYXQgbGVhc3Qgb25lIGlzIGJyb2tlblwiKTtcbiAgICAgIH0pXG4gICAgICAucHJvZ3Jlc3MoKCBpbnN0YW5jZSwgaW1hZ2UgKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBpbWFnZS5pc0xvYWRlZCA/IFwibG9hZGVkXCIgOiBcImJyb2tlblwiO1xuXG4gICAgICAgIGlmICggcmVzdWx0ICkge1xuICAgICAgICAgIHRoaXMuYXJyLnB1c2goaW1hZ2UuaW1nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImltYWdlIGlzIFwiICsgcmVzdWx0ICsgXCIgZm9yIFwiICsgaW1hZ2UuaW1nLnNyYyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG5cbiAgICBjb25zb2xlLmxvZyhcIkltYWdlIFByZWxvYWRlciBNb2R1bGVcIik7XG5cbiAgICB0aGlzLnByZWxvYWRJbWFnZXMoKTtcbiAgfVxufVxuXG5sZXQgSW1hZ2VMb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMb2FkZXI7IiwiZGVjbGFyZSB2YXIgU2Nyb2xsTWFnaWM6IGFueTtcbmNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmNsYXNzIEFuaW1hdGlvbkNvbXBvbmVudCB7XG5cbiAgY29udGFpbmVyOiBKUXVlcnk7XG4gIGl0ZW06IEpRdWVyeTtcbiAgbVNjZW5lOiBKUXVlcnk7XG4gIHNlcnZpY2VTaWRlQmFyOiBKUXVlcnk7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9ICQoXCIucHJvY2Vzcy1jb250YWluZXJcIik7XG4gICAgdGhpcy5pdGVtID0gJChcIi5wcm9jZXNzLWl0ZW0tY29udGFpbmVyXCIpO1xuICAgIHRoaXMubVNjZW5lID0gJChcIi5tLXNjZW5lXCIpO1xuICAgIHRoaXMuc2VydmljZVNpZGVCYXIgPSAkKFwiLnNlcnZpY2Utc2lkZWJhci13cmFwcGVyXCIpO1xuICB9XG5cbiAgZGVzY19vX2FuaW1hdGUoKSB7XG4gICAgaWYgKCAkKFwiLmRlc2Mtby1hbmltYXRlXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBsZXQgd2lwZUFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgd2lwZUFuaW1hdGlvbi5hZGQoW1xuICAgICAgICBUd2Vlbk1heC5mcm9tVG8oJChcIi5kZXNjLW8taW1hZ2UtMVwiKSwgMSwgeyB5UGVyY2VudDogMCB9LCB7IHlQZXJjZW50OiAtMjAsIGVhc2U6IFBvd2VyMC5lYXNlSW5PdXQgfSlcbiAgICAgIF0pO1xuXG4gICAgICBsZXQgd2lwZUFuaW1hdGlvbjIgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIHdpcGVBbmltYXRpb24yLmFkZChbXG4gICAgICAgIFR3ZWVuTWF4LmZyb21UbygkKFwiLmRlc2Mtby1pbWFnZS0yXCIpLCAxLCB7IHlQZXJjZW50OiAwLCB9LCB7IHlQZXJjZW50OiAtMTA1LCBlYXNlOiBQb3dlcjAuZWFzZUluT3V0IH0pXG4gICAgICBdKTtcblxuICAgICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG4gICAgICBsZXQgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICAgIHtcbiAgICAgICAgICB0cmlnZ2VyRWxlbWVudDogXCIuZGVzYy1vLWFuaW1hdGVcIixcbiAgICAgICAgICBkdXJhdGlvbjogJChcIi5kZXNjLW8tYW5pbWF0ZVwiKS5oZWlnaHQoKSxcbiAgICAgICAgICBvZmZzZXQ6IC0xMDBcbiAgICAgICAgfSlcbiAgICAgIC8vIC5zZXRQaW4oXCIuZGVzYy1vLWltYWdlLTFcIilcbiAgICAgICAgLnNldFR3ZWVuKHdpcGVBbmltYXRpb24pXG4gICAgICAgIC5hZGRJbmRpY2F0b3JzKHsgbmFtZTogXCIxIChkdXJhdGlvbjogRWwpXCIgfSkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcbiAgICAgICAgLmFkZFRvKGNvbnRyb2xsZXIpO1xuXG4gICAgICBsZXQgc2NlbmUyID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKFxuICAgICAgICB7XG4gICAgICAgICAgdHJpZ2dlckVsZW1lbnQ6IFwiLmRlc2Mtby1hbmltYXRlXCIsXG4gICAgICAgICAgZHVyYXRpb246ICQoXCIuZGVzYy1vLWFuaW1hdGVcIikuaGVpZ2h0KCkgKyAxMDAsXG4gICAgICAgIH0pXG4gICAgICAvLyAuc2V0UGluKFwiLmRlc2Mtby1pbWFnZS0xXCIpXG4gICAgICAgIC5zZXRUd2Vlbih3aXBlQW5pbWF0aW9uMilcbiAgICAgICAgLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjIgKGR1cmF0aW9uOiBFbClcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgICAuYWRkVG8oY29udHJvbGxlcik7XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc0FuaW1hdGVJbigpIHtcbiAgICBsZXQgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW07XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuICAgIGxldCBzY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgIHtcbiAgICAgICAgdHJpZ2dlckVsZW1lbnQ6IFwiLnByb2Nlc3MtY29udGFpbmVyXCIsXG4gICAgICAgIGR1cmF0aW9uOiBjb250YWluZXIuaGVpZ2h0KCksXG4gICAgICAgIC8vIG9mZnNldDogdGhpcy5hc2lkZU9mZnNldCxcbiAgICAgIH0pXG4gICAgICAub24oXCJlbnRlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0ZW0uZmluZChcIi5wcm9jZXNzLWl0ZW0taW5uZXJcIikuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICAgICAgY29udGFpbmVyLmZpbmQoXCJpbWdcIikuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICAgIH0pXG4gICAgICAvLyAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMSAoZHVyYXRpb246IG9mZnNldD8pXCIgfSkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcbiAgICAgIC5hZGRUbyhjb250cm9sbGVyKTtcbiAgfVxuXG4gIGFuaW1hdGVXaW5kb3dUb3AoKSB7XG4gICAgY29uc29sZS5sb2coXCJhbmltYXRlIFRvcFwiKTtcbiAgICBUd2VlbkxpdGVcbiAgICAgIC50bygkKHdpbmRvdyksIC4zLFxuICAgICAgICB7XG4gICAgICAgICAgc2Nyb2xsVG86IHtcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBhbmltYXRlU2VydmljZVNpZGViYXJPdXQoKSB7XG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuc2VydmljZVNpZGVCYXIsIC4zLCB7XG4gICAgICB4OiBcIi0xMDBcIixcbiAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgZGVsYXk6IDAsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIixcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgLy8gcmVtb3ZlIHNpZGViYXIgaHRtbCBlbGVtZW50IHNvIGl0IGRvZXNudCBzaG93IHVwIGFnYWluIHdoZW4gc2Nyb2xsaW5nIHVwXG4gICAgICAgIHRoaXMuc2VydmljZVNpZGVCYXIucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBsb2FkVXJsKCB1cmwgKSB7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfVxuXG4gIG1haW5Db250ZW50QW5pbWF0aW9uT3V0KCBjYWxsYmFjayApIHtcblxuICAgIC8vIExvYWQgaW4gYW5pbWF0aW9ucyBoZXJlXG4gICAgdGhpcy5hbmltYXRlU2VydmljZVNpZGViYXJPdXQoKTtcblxuXG4gICAgdGhpcy5tU2NlbmUuYWRkQ2xhc3MoXCJpcy1leGl0aW5nXCIpXG4gICAgICAvLyBJZiBoYXMgd2Via2l0QW5pbWF0aW9uRW5kIC0gaXQgZ2V0cyBjYWxsZWQgdHdpY2VcbiAgICAgIC5vbmUoXCJvYW5pbWF0aW9uZW5kIG1zQW5pbWF0aW9uRW5kIGFuaW1hdGlvbmVuZFwiLCAoKSA9PiB7XG5cbiAgICAgICAgLy8gTG9hZCBpbiBhbmltYXRpb25zIGhlcmUgdGhhdCBuZWVkIHRvIG9jY3VyIGFmdGVyIG1haW4gb25lc1xuICAgICAgICB0aGlzLmFuaW1hdGVXaW5kb3dUb3AoKTtcblxuICAgICAgfSk7XG5cbiAgICBpZiAoIHR5cGVvZihjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICBjaGVja1VybCggdXJsICk6IGJvb2xlYW4ge1xuICAgIGlmICggdXJsLm1hdGNoKC9eIy8pICE9PSBudWxsIHx8IHVybCA9PT0gXCJcIiApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsQ2xpY2tDaGVjayggZXZlbnQ/ICkge1xuXG4gICAgLy8gR2V0IHVybCBmcm9tIHRoZSBhIHRhZ1xuICAgIGxldCBuZXdVcmwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJocmVmXCIpO1xuICAgIGxldCBoYXNDaGlsZHJlbiA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50KFwibGlcIikuaGFzQ2xhc3MoXCJtZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpO1xuXG4gICAgLypcbiAgICAgKiBGaXJzdCBWYWxpZGF0aW9uOiBJcyB0aGUgdXJsIHZhbGlkXG4gICAgICovXG4gICAgaWYgKCAhdGhpcy5jaGVja1VybChuZXdVcmwpICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIElmIGZpcnN0IHZhbGlkYXRpb24gZmFpbHMsIHRoZSB1cmwgaXMgcmVhbCBhbmQgY29udGludWUgdmFsaWRhdGluZ1xuICAgICAqL1xuICAgIC8qXG4gICAgICogQ2hlY2sgaWYgaXRzIGhvcml6b250YWwgdGFibGV0XG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCAmJlxuICAgICAgdGhpcy5jaGVja1VybChuZXdVcmwpICYmXG4gICAgICBVdGlscy5icm93c2VyID09PSBcImlwYWRcIiAmJiBoYXNDaGlsZHJlbiApIHtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdUYWJsZXQgTmF2IGNsaWNrJyk7XG4gICAgICByZXR1cm47XG5cbiAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCAmJiB0aGlzLmNoZWNrVXJsKG5ld1VybCkgKSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBDaGVjayBpZiBpdHMgbGFyZ2VyIHRoYW4gdGFibGV0IGJ1dCBub3QgYW4gaXBhZFxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibGFwdG9wIG9yIGxhcmdlclwiKTtcbiAgICAgIHRoaXMubWFpbkNvbnRlbnRBbmltYXRpb25PdXQoICgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkVXJsKG5ld1VybCk7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAoIHRoaXMuY2hlY2tVcmwobmV3VXJsKSAmJiBoYXNDaGlsZHJlbiApIHtcblxuICAgICAgLypcbiAgICAgICAqIENoZWNrIGlmIGl0cyBtb2JpbGUgbmF2IG1lbnUgdGhhdCBoYXMgY2hpbGRyZW5cbiAgICAgICAqL1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIm1vYmlsZSBtZW51IGlzIGFjdGl2ZSBhbmQgcGFyZW50IGNsaWNrZWRcIik7XG4gICAgfSBlbHNlIHtcblxuICAgICAgLypcbiAgICAgICAqIFBhc3NlZCB0aGUgY2hlY2tzIExvYWQgaXQhXG4gICAgICAgKi9cblxuICAgICAgdGhpcy5sb2FkVXJsKG5ld1VybCk7XG4gICAgfVxuXG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMucHJvY2Vzc0FuaW1hdGVJbigpO1xuICAgIHRoaXMuZGVzY19vX2FuaW1hdGUoKTtcblxuICAgIC8vIENsaWNrIGV2ZW50IHRvIGNvbnRyb2wgd2luZG93IExvYWRpbmdcbiAgICAkKFwiYVwiKS5vbihcImNsaWNrXCIsICggZSApID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZ2xvYmFsQ2xpY2tDaGVjayhlKTtcbiAgICB9KTtcblxuICAgIC8vIEN1c3RvbSBldmVudCBleGFtcGxlXG4gICAgLy8gJChkb2N1bWVudCkub24oXCJ0ZXN0XCIsIHt9LCAoIGV2ZW50LCBhcmcxLCBhcmcyICkgPT4ge1xuICAgIC8vXG4gICAgLy8gICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPiBVdGlscy5icHMudGFibGV0ICkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZzEpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhhcmcyKTtcbiAgICAvLyAgIH1cbiAgICAvL1xuICAgIC8vIH0pLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IEFuaW1hdGlvbkNvbnRyb2xsZXIgPSBuZXcgQW5pbWF0aW9uQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IEFuaW1hdGlvbkNvbnRyb2xsZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5cbmludGVyZmFjZSBRdW90ZVN0YXRlSW50ZXJmYWNlIHtcbiAgc2VsZWN0ZWQ6IHN0cmluZztcbiAgaXNGb3JtQWN0aXZlOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgUXVvdGVTZWxlY3RlZE9iamVjdCB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHByaWNlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGJ1bGxldHM6IE9iamVjdDtcbiAgaW1nU3JjOiBzdHJpbmc7XG59XG5cbmNsYXNzIFF1b3RlQ29tcG9uZW50IHtcblxuICBzZWxlY3RCdG46IEpRdWVyeTtcbiAgc3dpdGNoQnRuOiBKUXVlcnk7XG4gIGZvcm1CdWlsZGVyOiBKUXVlcnk7XG4gIHF1b3RlQ2hvb3NlcjogSlF1ZXJ5O1xuICBpbnB1dHM6IEpRdWVyeTtcbiAgcXVvdGVJdGVtc0FycmF5OiBKUXVlcnk7XG4gIHNlbGVjdENvbmFpbmVyOiBKUXVlcnk7XG4gIHN0YXRlOiBRdW90ZVN0YXRlSW50ZXJmYWNlO1xuICBxdW90ZUNvbnRhaW5lcjogSlF1ZXJ5O1xuICBzZWxlY3RlZEl0ZW06IFF1b3RlU2VsZWN0ZWRPYmplY3Q7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5xdW90ZUNvbnRhaW5lciA9ICQoXCIucXVvdGVcIik7XG4gICAgdGhpcy5zZWxlY3RCdG4gPSAkKFwiLnF1b3RlX19zZWxlY3QtLWJ0blwiKTtcbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheSA9ICQoXCIucXVvdGVfX2l0ZW1cIik7XG4gICAgdGhpcy5mb3JtQnVpbGRlciA9ICQoXCIucXVvdGVfX2Zvcm0tLWlucHV0XCIpO1xuICAgIHRoaXMucXVvdGVDaG9vc2VyID0gJChcIi5xdW90ZV9fZm9ybS0tc2VsZWN0XCIpO1xuICAgIHRoaXMuc2VsZWN0Q29uYWluZXIgPSB0aGlzLnNlbGVjdEJ0bi5maW5kKFwiLmZpZWxkc2V0XCIpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzZWxlY3RlZDogJycsXG4gICAgICBpc0Zvcm1BY3RpdmU6IGZhbHNlXG4gICAgfTtcblxuICB9XG5cbiAgc2V0V2lkdGgoIGxhYmVsOiBKUXVlcnkgKSB7XG5cbiAgICBsZXQgbGFiZWxXaWR0aCA9IGxhYmVsLm91dGVyV2lkdGgoKTtcbiAgICB0aGlzLnN3aXRjaEJ0bi5jc3MoXCJ3aWR0aFwiLCBsYWJlbFdpZHRoKTtcblxuICB9XG5cbiAgYnVpbGRTZWxlY3RCb3goKSB7XG5cbiAgICBsZXQgbmFtZXMgPSBbXTtcbiAgICBsZXQgZnJhZ21lbnQgPSAkKGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG5cbiAgICAvLyBnZXQgaDIgdGl0bGVzIGZyb20gZWFjaCBxdW90ZSBpdGVtXG4gICAgdGhpcy5xdW90ZUl0ZW1zQXJyYXkuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gJChlbCksXG4gICAgICAgIHRpdGxlID0gJHRoaXMuZmluZChcImgyXCIpLnRleHQoKSxcbiAgICAgICAgbmFtZSA9IHRpdGxlLnRvTG9jYWxlTG93ZXJDYXNlKCksXG4gICAgICAgIHVuaXF1ZUlkID0gbmFtZSArIFwiLVwiICsgaW5kZXg7XG5cbiAgICAgIC8vIEFkZCBtYXRjaGluZyBJRCdzIHRvIGVhY2ggQ2FyZFxuICAgICAgJHRoaXMuYXR0cihcImlkXCIsIHVuaXF1ZUlkKTtcblxuICAgICAgLy8gQ3JlYXRlIGlucHV0IGFuZCBsYWJlbCBET00gZWxlbWVudHNcbiAgICAgIGxldCBpbnB1dCA9IFV0aWxzLmJ1aWxkSHRtbChcImlucHV0XCIsIHtcbiAgICAgICAgaWQ6IHVuaXF1ZUlkLFxuICAgICAgICB0eXBlOiBcInJhZGlvXCIsXG4gICAgICAgIGNsYXNzOiBcInF1b3RlX19pbnB1dFwiLFxuICAgICAgICBuYW1lOiB1bmlxdWVJZCxcbiAgICAgICAgdmFsdWU6IG5hbWVcbiAgICAgIH0pO1xuXG4gICAgICBsZXQgbGFiZWwgPSBVdGlscy5idWlsZEh0bWwoXCJsYWJlbFwiLCB7XG4gICAgICAgIGZvcjogdW5pcXVlSWQsXG4gICAgICAgIGNsYXNzOiBpbmRleCA9PT0gMCA/IFwic2VsZWN0ZWRcIiA6IFwiXCJcbiAgICAgIH0sIHRpdGxlKTtcblxuXG4gICAgICBmcmFnbWVudC5hcHBlbmQoaW5wdXQpLmFwcGVuZChsYWJlbCk7XG5cbiAgICB9KTtcblxuICAgIGZyYWdtZW50LmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJxdW90ZV9fc3dpdGNoXCI+PC9zcGFuPicpO1xuXG4gICAgdGhpcy5zZWxlY3RDb25haW5lci5hcHBlbmQoZnJhZ21lbnQpO1xuXG4gIH1cblxuICBidWlsZFNlbGVjdEV2ZW50SGFuZGxlcnMoKSB7XG4gICAgdGhpcy5pbnB1dHMgPSB0aGlzLnNlbGVjdEJ0bi5maW5kKFwiLnF1b3RlX19pbnB1dFwiKTtcbiAgICB0aGlzLnN3aXRjaEJ0biA9ICQoXCIucXVvdGVfX3N3aXRjaFwiKTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBlYWNoIGl0ZW0gYW5kIHNldCB3aWR0aCBhbmQgY2hhbmdlIGV2ZW50cyBhbmQgY2hlY2tlZCBzdGF0dXNcbiAgICB0aGlzLmlucHV0cy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgbmV4dExhYmVsID0gJHRoaXMubmV4dCgpO1xuXG4gICAgICBpZiAoIGluZGV4ID09PSAwICkge1xuICAgICAgICAkdGhpcy5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcblxuICAgICAgICAvLyBzZXQgc3RhdGUgdG8gY3VycmVudCBzZWxlY3RlZCBpbnB1dCBJRFxuICAgICAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuICAgICAgfVxuXG4gICAgICAvLyBmaW5kIFNlbGVjdGVkLCBnZXQgd2lkdGggb2YgbGFiZWwsIHNldCB3aWR0aCBvZiBzcGFuXG4gICAgICBpZiAoIG5leHRMYWJlbC5oYXNDbGFzcyhcInNlbGVjdGVkXCIpICkge1xuICAgICAgICB0aGlzLnNldFdpZHRoKG5leHRMYWJlbCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBvbiBjaGFuZ2UgZnVuY3Rpb24gaGVyZVxuICAgICAgJHRoaXMuY2hhbmdlKHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgfSk7XG4gIH1cblxuICBidWlsZENhcmRFdmVudEhhbmRsZXJzKCkge1xuXG4gICAgLy8gTWFpbiBDYXJkc1xuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5LmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9ICQoZWwpLFxuICAgICAgICBidXR0b24gPSAkdGhpcy5maW5kKFwiLmNhcmRfX2l0ZW0tLWJ0blwiKTtcblxuICAgICAgYnV0dG9uLm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuRm9ybS5iaW5kKHRoaXMpKTtcblxuICAgIH0pO1xuXG4gICAgLy8gQmFjayBidXR0b24gZm9yIHRhYmxldFxuICAgIGxldCBidXR0b24gPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIudGFibGV0XCIpLmZpbmQoXCIuZ28tYmFja1wiKTtcbiAgICBidXR0b24ub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlRm9ybS5iaW5kKHRoaXMpKTtcblxuICB9XG5cbiAgZmFkZUluKCBlbDogSlF1ZXJ5ICkge1xuXG4gICAgVHdlZW5NYXgudG8oZWwsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IC4zXG4gICAgfSk7XG5cbiAgfVxuXG4gIG9uQ2hhbmdlKCBlICkge1xuXG4gICAgbGV0ICR0aGlzID0gJChlLmN1cnJlbnRUYXJnZXQpLFxuICAgICAgZmllbGRzZXQgPSAkdGhpcy5wYXJlbnQoXCIuZmllbGRzZXRcIiksXG4gICAgICBwcmV2SXRlbSA9IGZpZWxkc2V0LmZpbmQoXCIuc2VsZWN0ZWRcIiksXG4gICAgICBwcmV2V2lkdGggPSBwcmV2SXRlbS5vdXRlcldpZHRoKCkgLSAxLFxuICAgICAgaW5wdXRJZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIHJlbW92ZSBzZWxlY3RlZCBmcm9tIFByZXYgTGFiZWxcbiAgICBmaWVsZHNldC5maW5kKFwibGFiZWxcIikucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgIC8vIHJlbW92ZSBjaGVja2VkIHN0YXRlIGZyb20gcHJldiBpbnB1dFxuICAgIHByZXZJdGVtLnByZXYoXCJpbnB1dFwiKS5wcm9wKFwiY2hlY2tlZFwiLCBmYWxzZSk7XG5cbiAgICAvLyBzZXQgbmV3IGl0ZW0gdG8gc2VsZWN0ZWQgYW5kIGNoZWNrZWRcbiAgICBsZXQgc2VsZWN0ZWRMYWJlbCA9IGZpZWxkc2V0LmZpbmQoXCJsYWJlbFtmb3I9XCIgKyBpbnB1dElkICsgXCJdXCIpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgJHRoaXMucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XG5cbiAgICAvLyBpZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGlucHV0IG1hdGNoZXMgdGhlIDJuZCBpdGVtIC0gdGhlbiBtb3ZlIHN3aXRjaEJ0biByaWdodCwgb3RoZXJ3aXNlIGJhY2sgdG8gcG9zaXRpb24gMVxuICAgIGlmICggaW5wdXRJZCA9PT0gJCh0aGlzLmlucHV0c1sgMSBdKS5hdHRyKFwiaWRcIikgKSB7XG4gICAgICB0aGlzLnN3aXRjaEJ0bi5jc3Moe1xuICAgICAgICBcIndlYmtpdFRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyBwcmV2V2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcIk1velRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyBwcmV2V2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcIm1zVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHByZXZXaWR0aCArIFwicHgpXCIsXG4gICAgICAgIFwiT1RyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyBwcmV2V2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcInRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyBwcmV2V2lkdGggKyBcInB4KVwiXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zd2l0Y2hCdG4uY3NzKHtcbiAgICAgICAgXCJ3ZWJraXRUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJNb3pUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJtc1RyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiLFxuICAgICAgICBcIk9UcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIlxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gY2hhbmdlIHRoZSB3aWR0aCBvZiB0aGUgYnRuIHRvIG1hdGNoIHRoZSB3aWR0aCBvZiB0aGUgbmV3IGxhYmVsXG4gICAgdGhpcy5zZXRXaWR0aChzZWxlY3RlZExhYmVsKTtcblxuICAgIC8vIHNldCBzdGF0ZSB0byB0aGUgbmV3bHkgc2VsZWN0ZWQgaW5wdXRcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBTdGF0ZSBpczogXCIsIHRoaXMuc3RhdGUuc2VsZWN0ZWQpO1xuXG4gICAgdGhpcy50b2dnbGVDYXJkcygpO1xuXG4gIH1cblxuICB0b2dnbGVDYXJkcygpIHtcblxuICAgIC8vIGJhc2VkIG9uIHN0YXRlLCBhZGQgc2VsZWN0ZWQgdG8gdGhlIGNhcmQncyBpZCBtYXRjaGluZyB0aGUgc3RhdGVcbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgaWQgPSAkdGhpcy5hdHRyKFwiaWRcIik7XG5cbiAgICAgICR0aGlzLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgIGlmICggaWQgPT09IHRoaXMuc3RhdGUuc2VsZWN0ZWQgKSB7XG5cbiAgICAgICAgJHRoaXMuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuICBcbiAgc2V0QWN0aXZlUGxhbigpIHtcblxuICAgIGxldCBpZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQ7XG4gICAgbGV0IHNlbGVjdGVkQ2FyZCA9IHRoaXMucXVvdGVJdGVtc0FycmF5LmZpbHRlciggKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiAkKHRoaXMucXVvdGVJdGVtc0FycmF5W2l0ZW1dKS5hdHRyKFwiaWRcIikgPT09IGlkO1xuICAgIH0pO1xuXG4gICAgbGV0IGJ1dHRvbiA9ICc8YSBjbGFzcz1cInJvdW5kZWQtYnRuIHdoaXRlLWJ0biBnby1iYWNrXCIgaHJlZj1cIiNcIj5HbyBCYWNrPC9hPic7XG5cbiAgICBsZXQgbW9kaWZpZWRFbGVtZW50ID0gc2VsZWN0ZWRDYXJkLmNsb25lKCk7XG5cbiAgICBtb2RpZmllZEVsZW1lbnQuZmluZChcIi5jYXJkX19pdGVtLS1idG5cIikucmVtb3ZlKCk7XG5cbiAgICAvLyBtb2RpZmllZEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5nby1iYWNrXCIpKTtcbiAgICBsZXQgY2FyZFdyYXBwZXIgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWNhcmQtd3JhcHBlclwiKTtcblxuICAgIGNhcmRXcmFwcGVyLmFwcGVuZChtb2RpZmllZEVsZW1lbnQpLmFwcGVuZChidXR0b24pO1xuXG4gICAgLy8gQmFjayBidXR0b24gaW5zaWRlIHdyYXBwZXJcbiAgICBsZXQgYnV0dG9uRG9tID0gY2FyZFdyYXBwZXIuZmluZChcIi5nby1iYWNrXCIpO1xuICAgIGJ1dHRvbkRvbS5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VGb3JtLmJpbmQodGhpcykpO1xuXG5cbiAgfVxuXG4gIGNsb3NlRm9ybShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUuaXNGb3JtQWN0aXZlID0gZmFsc2U7XG5cbiAgICAvLyByZW1vdmUgY3VycmVudCBjYXJkXG4gICAgbGV0IGNhcmQgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIuY2FyZF9faXRlbVwiKTtcbiAgICBsZXQgYmFja0J0biA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5xdW90ZV9fZm9ybS0tY2FyZC13cmFwcGVyXCIpLmZpbmQoXCIuZ28tYmFja1wiKTtcbiAgICBUd2Vlbk1heC50byhjYXJkLCAuMiwge1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIHk6IDE1LFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgLy8gc2V0IGZvcm0gdG8gYWN0aXZlXG4gICAgICAgICAgdGhpcy5mb3JtQnVpbGRlci5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgICAgIC8vIHNldCBib2R5IGJhY2sgdG8gc2Nyb2xsYWJsZVxuICAgICAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJhdXRvXCIpO1xuICAgICAgICB9LCAzMDApXG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5xdW90ZV9fZm9ybS0tdmNcIikub25lKCdvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsXG4gICAgICAgIChlKSA9PiB7XG5cbiAgICAgICAgICAvLyByZW1vdmUgdmlzaWJpbGl0eSBvbmNlIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICAgICAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICAgICAgICAvLyByZW1vdmUgY3VycmVudCBjYXJkIGh0bWxcbiAgICAgICAgICBjYXJkLnJlbW92ZSgpO1xuICAgICAgICAgIGJhY2tCdG4ucmVtb3ZlKCk7XG5cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcblxuICAgICAgY29uc29sZS5sb2coXCJjbG9zZVwiKTtcblxuICAgICAgLy8gcmVtb3ZlIHZpc2liaWxpdHkgb25jZSBhbmltYXRpb24gY29tcGxldGVzXG4gICAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICB0aGlzLnF1b3RlQ2hvb3Nlci5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgY2FyZCBodG1sXG4gICAgICBjYXJkLnJlbW92ZSgpO1xuICAgICAgYmFja0J0bi5yZW1vdmUoKTtcbiAgICB9XG5cblxuICAgIC8vZmFkZSBvdXQgZmlyc3QgZGlzcGxheVxuICAgIHRoaXMucXVvdGVDaG9vc2VyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgb3BlbkZvcm0oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICBsZXQgcGFyZW50Q29uYXRpbmVyID0gJHRoaXMucGFyZW50KFwiZGl2XCIpLnBhcmVudChcImRpdlwiKTtcblxuICAgIGlmKCAhcGFyZW50Q29uYXRpbmVyLmhhc0NsYXNzKFwic2VsZWN0ZWRcIikgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zdGF0ZS5pc0Zvcm1BY3RpdmUgPSB0cnVlO1xuICAgIFxuICAgIC8vIHNldCBjb250ZW50IHBsYW4gSFRNTCBpbiBuZXcgZm9ybSBhcmVhXG4gICAgdGhpcy5zZXRBY3RpdmVQbGFuKCk7XG5cbiAgICAvLyBmYWRlIG91dCBjYXJkc1xuICAgIHRoaXMucXVvdGVDaG9vc2VyLmNzcyhcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG4gICAgLy8gc2V0IGZvcm0gdG8gYWN0aXZlXG4gICAgdGhpcy5mb3JtQnVpbGRlci5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICBcbiAgICAvLyBhZGQgdmlzaWJpbGl0eSBpbW1lZGlhdGVseVxuICAgIHRoaXMuZm9ybUJ1aWxkZXIuY3NzKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIik7XG5cbiAgICAvL2ZhZGUgb3V0IGZpcnN0IGRpc3BsYXlcbiAgICB0aGlzLnF1b3RlQ2hvb3Nlci5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgIGlmKFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApe1xuXG4gICAgICAvLyBzY3JvbGwgdG9wIG9mIGRpdiBvbiBvcGVuIGZvciBncmFjZWZ1bCBVWFxuICAgICAgJChcImJvZHksaHRtbFwiKS5hbmltYXRlKHsgXCJzY3JvbGxUb3BcIjogdGhpcy5xdW90ZUNvbnRhaW5lci5vZmZzZXQoKS50b3AgLTM1IH0sIDIwMCk7XG5cbiAgICB9XG4gICAgXG4gICAgbGV0IGNhcmQgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWNhcmRcIik7XG5cbiAgICBpZiggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICl7XG4gICAgICBjYXJkLm9uZSgnb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLFxuICAgICAgICAoZSkgPT4ge1xuXG4gICAgICAgICAgLy8gU2V0IGJvZHkgdG8gbm90IHNjcm9sbFxuICAgICAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJoaWRkZW5cIik7XG5cbiAgICAgICAgICAvLyBmYWRlIGNhcmQgaW4gb25jZSBkYXRhIGlzIHNldCAmIHRoZSBjYXJkIGJnIGlzIGZpbmlzaGVkIGFuaW1hdGluZ1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKGNhcmQuZmluZChcIi5jYXJkX19pdGVtXCIpLCAuMywge1xuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIGRlbGF5OiAuMlxuICAgICAgICAgIH0pO1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKGNhcmQuZmluZChcIi5jYXJkX19pdGVtXCIpLCAuMiwge1xuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0IGJvZHkgdG8gbm90IHNjcm9sbFxuICAgICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImhpZGRlblwiKTtcblxuICAgICAgLy8gZmFkZSBjYXJkIGluIG9uY2UgZGF0YSBpcyBzZXQgJiB0aGUgY2FyZCBiZyBpcyBmaW5pc2hlZCBhbmltYXRpbmdcbiAgICAgIFR3ZWVuTWF4LnRvKGNhcmQuZmluZChcIi5jYXJkX19pdGVtXCIpLCAuMywge1xuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBkZWxheTogLjJcbiAgICAgIH0pO1xuICAgICAgVHdlZW5NYXgudG8oY2FyZC5maW5kKFwiLmNhcmRfX2l0ZW1cIiksIC4yLCB7XG4gICAgICAgIHk6IDAsXG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiUXVvdGUgQnVpbGRlclwiKTtcblxuICAgIC8vIGJ1aWxkIHNlbGVjdCBib3ggYnV0dG9uIGlucHV0c1xuICAgIHRoaXMuYnVpbGRTZWxlY3RCb3goKTtcblxuICAgIC8vIHNldCBjbGljayBldmVudHMgYW5kIGZpcnN0IHNlbGVjdGVkIGl0ZW1zIGZvciBTZWxlY3QgQm94XG4gICAgdGhpcy5idWlsZFNlbGVjdEV2ZW50SGFuZGxlcnMoKTtcblxuICAgIHRoaXMuZmFkZUluKHRoaXMuc2VsZWN0QnRuKTtcblxuICAgIC8vIHNlbGVjdCBjYXJkXG4gICAgdGhpcy50b2dnbGVDYXJkcygpO1xuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50cyB0byBjYXJkcyBidXR0b25zXG4gICAgdGhpcy5idWlsZENhcmRFdmVudEhhbmRsZXJzKCk7XG5cblxuICB9XG59XG5cbmNvbnN0IFF1b3RlQnVpbGRlciA9IG5ldyBRdW90ZUNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBRdW90ZUJ1aWxkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5pbnRlcmZhY2UgU2hvd2Nhc2VTbGlkZXJJbnRlcmZhY2Uge1xuICBkZXNrdG9wUG9zOiBudW1iZXI7XG4gIHRhYmxldFBvczogbnVtYmVyO1xuICBpbmRleFNlbGVjdGVkOiBudW1iZXI7XG4gIGN1cnJlbnRTbGlkZTogbnVtYmVyO1xufVxuXG5jbGFzcyBTaG93Y2FzZUNvbXBvbmVudCB7XG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuICBuZXh0QnRuTW9iaWxlOiBKUXVlcnk7XG4gIHByZXZCdG5Nb2JpbGU6IEpRdWVyeTtcbiAgbmV4dEJ0bjogSlF1ZXJ5O1xuICBwcmV2QnRuOiBKUXVlcnk7XG4gIGluZGV4OiBudW1iZXI7XG4gIGdhbGxlcnk6IEpRdWVyeTtcbiAgZGVzYzogSlF1ZXJ5O1xuICB0aHVtYnNDb250YWluZXI6IEpRdWVyeTtcbiAgZ3JhZGllbnRzOiBKUXVlcnk7XG4gIHRodW1ic0NsaWNrOiBKUXVlcnk7XG4gIGNsb3NlQnRuOiBKUXVlcnk7XG4gIGNvdW50VG90YWw6IEpRdWVyeTtcbiAgY3VycmVudENvdW50SXRlbTogSlF1ZXJ5O1xuICBzaG93Q2FzZVRodW1iczogSlF1ZXJ5O1xuICBzdGF0ZVBvc2l0aW9uOiBTaG93Y2FzZVNsaWRlckludGVyZmFjZTtcbiAgdGh1bWJTY2FsZVRvcDogbnVtYmVyO1xuICB0aHVtYlNjYWxlTGVmdDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCBlbDogT2JqZWN0ICkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChlbCk7XG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fbmF2LS1wcmV2XCIpO1xuICAgIHRoaXMubmV4dEJ0bk1vYmlsZSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX25hdi0tbmV4dFwiKTtcbiAgICB0aGlzLnByZXZCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNuYXYtLXByZXZcIik7XG4gICAgdGhpcy5uZXh0QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fdGh1bWJzbmF2LS1uZXh0XCIpO1xuICAgIHRoaXMuZ2FsbGVyeSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3NsaWRlci0tZ2FsbGVyeVwiKTtcbiAgICB0aGlzLmRlc2MgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19kZXNjXCIpO1xuICAgIHRoaXMuY291bnRUb3RhbCA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIudG90YWxcIik7XG4gICAgdGhpcy5jdXJyZW50Q291bnRJdGVtID0gdGhpcy5jb250YWluZXIuZmluZChcIi5jdXJyZW50XCIpO1xuICAgIHRoaXMuaW5kZXggPSAwOyAvLyBzZXQgdG8gMm5kIHNsaWRlXG4gICAgdGhpcy50aHVtYnNDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnMtLWltYWdlc1wiKTtcbiAgICB0aGlzLnNob3dDYXNlVGh1bWJzID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fdGh1bWJzXCIpO1xuICAgIHRoaXMudGh1bWJTY2FsZVRvcCA9IDEzMDtcbiAgICB0aGlzLnRodW1iU2NhbGVMZWZ0ID0gNzU7XG4gICAgdGhpcy5zdGF0ZVBvc2l0aW9uID0ge1xuICAgICAgZGVza3RvcFBvczogMCxcbiAgICAgIHRhYmxldFBvczogMCxcbiAgICAgIGluZGV4U2VsZWN0ZWQ6IHRoaXMuaW5kZXgsXG4gICAgICBjdXJyZW50U2xpZGU6IHRoaXMuaW5kZXggKyAxXG4gICAgfTtcblxuICB9XG5cbiAgc2V0Rmlyc3RTbGlkZSgpIHtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBpbWFnZXMgYW5kIHNldCBhY3RpdmUgZWxlbWVudFxuICAgIGxldCBmaXJzdEltYWdlID0gdGhpcy5nYWxsZXJ5LmZpbmQoXCJsaVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG4gICAgZmlyc3RJbWFnZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgdGhpcy5hbmltYXRlR2FsbGVyeUluKCk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZGVzYyBhbmQgc2V0IGFjdGl2ZSBlbGVtZW50XG4gICAgbGV0IGZpcnN0RGVzYyA9IHRoaXMuZGVzYy5maW5kKFwiLnNob3djYXNlX19kZXNjLS1pdGVtW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcbiAgICBmaXJzdERlc2MuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgIC8vIEJ1aWxkIHRodW1ibmFpbHNcbiAgICB0aGlzLmJ1aWxkVGh1bWJzKCk7XG5cbiAgICAvLyBTZXQgQ3VycmVudCBTbGlkZSwgd2hpY2ggaXMgYWx3YXlzIHRoZSBmaXJzdCBzbGlkZSB0byBzZWxlY3RlZCAtIG9uTG9hZFxuICAgIHRoaXMudXBkYXRlTW9iaWxlTmF2KHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcblxuICAgIC8vIGFkZCBjbGljayBldmVudHMgdG8gdGh1bWJuYWlsIGltYWdlcywgdGhlbiB3aGVuIGZpbmlzaGVkIGFuaW1hdGUgaW4gd2l0aCBjYWxsYmFja1xuICAgIHRoaXMuYnVpbGRUaHVtYnNDbGlja0hhbmRsZXIodGhpcy5hbmltYXRlSW5UaHVtYnMuYmluZCh0aGlzKSk7XG5cbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy5nYWxsZXJ5LmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRDdXJyZW50TmF2RWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0Q3VycmVudERlc2NFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuZGVzYy5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0VG90YWxTbGlkZXMoKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSB0aGlzLmdhbGxlcnkuY2hpbGRyZW4oXCJsaVwiKS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgdXBkYXRlTW9iaWxlTmF2KCBzZWxlY3RlZDogSlF1ZXJ5ICkge1xuXG4gICAgLy8gRW5hYmxlL0Rpc2FibGUgYXJyb3cgYnRuc1xuICAgIHRoaXMucHJldkJ0bk1vYmlsZS5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6Zmlyc3QtY2hpbGRcIikpO1xuICAgIHRoaXMubmV4dEJ0bk1vYmlsZS5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6bGFzdC1jaGlsZFwiKSk7XG5cbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKCBpbmRleDogbnVtYmVyICkge1xuXG4gICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgPSBpbmRleDtcbiAgICB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlID0gaW5kZXggKyAxO1xuXG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlO1xuICB9XG5cbiAgdXBkYXRlU2xpZGUoIGRpcmVjdGlvbjogc3RyaW5nICkge1xuXG4gICAgLy8gZ2V0IGN1cnJlbnQgc2VsZWN0ZWQgYW5kIGZpbmQgdGhlIG1hdGNoIHRvIHRoZSBuZXh0IGVsXG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSB0aGlzLmdhbGxlcnkuZmluZChcImxpW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcblxuICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLnByZXZBbGwoKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUubmV4dEFsbCgpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgTmF2aWdhdGlvbiBjaGVja1xuICAgIHRoaXMudXBkYXRlTW9iaWxlTmF2KHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcbiAgfVxuXG4gIHVwZGF0ZURlc2NIZWlnaHQoIGRpcmVjdGlvbj86IHN0cmluZywgc2VsZWN0ZWQ/OiBKUXVlcnkgKSB7XG5cbiAgICAvLyBkaXJlY3Rpb25cbiAgICBpZiAoIGRpcmVjdGlvbiApIHtcblxuICAgICAgbGV0IGhlaWdodCA9IHNlbGVjdGVkLm91dGVySGVpZ2h0KCk7XG4gICAgICBUd2Vlbk1heC50byh0aGlzLmRlc2MsIC4zLCB7XG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gZ2V0IGN1cnJlbnQgc2xpZGVcbiAgICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnREZXNjRWxlbWVudCgpO1xuICAgICAgbGV0IGhlaWdodCA9IGN1cnJlbnRTbGlkZS5vdXRlckhlaWdodCgpO1xuICAgICAgdGhpcy5kZXNjLmhlaWdodChoZWlnaHQpO1xuXG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVEZXNjKCBkaXJlY3Rpb246IHN0cmluZyApIHtcbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50RGVzY0VsZW1lbnQoKTtcbiAgICBsZXQgbmV4dFNsaWRlID0gdGhpcy5kZXNjLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2MtLWl0ZW1bZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcblxuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLnByZXZBbGwoKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUubmV4dEFsbCgpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcblxuICAgICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KFwicmlnaHRcIiwgbmV4dFNsaWRlKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuXG4gICAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoXCJsZWZ0XCIsIG5leHRTbGlkZSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZVRodW1ic25hdiggZGlyZWN0aW9uOiBzdHJpbmcgKSB7XG5cbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50TmF2RWxlbWVudCgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwibGlbZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuXG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICAvKlxuICAgICAgICogVEFCTEVUIFRIVU1CIFNFTEVDVFxuICAgICAgICovXG5cbiAgICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPj0gNCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlIDwgdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyAtIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyAtIHRoaXMudGh1bWJTY2FsZVRvcDtcblxuICAgICAgICAgIC8vIHVwZGF0ZSBodG1sIGVsZW1lbnRcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibGVmdFwiKTtcbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG5cbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyArIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG4gICAgICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgeDogdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyxcbiAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgKyB0aGlzLnRodW1iU2NhbGVUb3A7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLypcbiAgICAgICAqIERFU0tUT1AgVEhVTUIgU0VMRUNUXG4gICAgICAgKi9cbiAgICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG5cbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIC8vIGRldGVjdGluZyBpZiBzbGlkZSBzaG91bGQgbW92ZSBvciBub3RcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlID49IDQgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA8IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBvc2l0aW9uIGNvbnRyb2xsZXJcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zIC0gdGhpcy50aHVtYlNjYWxlVG9wO1xuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zIC0gdGhpcy50aHVtYlNjYWxlTGVmdDtcblxuICAgICAgICAgIC8vIG1vdmUgc2xpZGVyXG4gICAgICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICAgIHk6IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zLFxuICAgICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyAhPT0gMCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyArIHRoaXMudGh1bWJTY2FsZVRvcDtcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlcGVyYXRlIHRhYmxldCBsb29raW5nIGF0IHNob3VsZCBpdCB1cGRhdGUgdGFibGV0IHN0YXRlXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyAhPT0gMCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgKyB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBjaGVja1RodW1ic05hdiggc2l6ZTogc3RyaW5nICkge1xuXG4gICAgaWYgKCBzaXplID09PSBcIm1vYmlsZVwiICkge1xuXG4gICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgeDogdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgIHk6IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zLFxuICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfVxuXG4gIH1cblxuICBhcnJvd0hhbmRsZXIoIGV2ZW50OiBhbnkgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGxldCAkZWwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpOyAvLyBhIHRhZ1xuICAgIGxldCB0aHVtYkluZGV4ID0gJGVsLnBhcmVudChcImxpXCIpLmRhdGEoXCJpbmRleFwiKTtcbiAgICBsZXQgcHJldkVsID0gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgICBsZXQgcHJldkluZGV4ID0gcHJldkVsLmRhdGEoXCJpbmRleFwiKTtcblxuXG4gICAgLy8gU2xpZGVyIGNhbiBtb3ZlIHJpZ2h0IGJlY2F1c2UgY3VycmVudCBzbGlkZSBpcyBub3QgdGhlIGxhc3Qgc2xpZGVcbiAgICBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJyaWdodFwiICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPD0gdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGUgb24gYXJyb3cgY2xpY2tcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyAxKTtcblxuICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcInJpZ2h0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuXG4gICAgfSBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcImxlZnRcIiAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGUgb24gYXJyb3cgY2xpY2tcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgLSAxKTtcblxuICAgICAgLy8gRWxzZSBpZiBpdHMgbm90IHRoZSBmaXJzdCBzbGlkZSAtIG1vdmUgbGVmdFxuICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuICAgIH1cbiAgICBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInRodW1ibmFpbFwiICYmXG4gICAgICBwcmV2SW5kZXggPCB0aHVtYkluZGV4ICYmXG4gICAgICB0aHVtYkluZGV4ICsgMSAhPT0gdGhpcy5nZXRUb3RhbFNsaWRlc1xuICAgICkge1xuICAgICAgLy8gY29tcGFyZSBpdGVtIHNlbGVjdGVkIGluZGV4IHdpdGggbmV3IGl0ZW0gc2VsZWN0ZWQgYW5kIGRldGVybWluZSB3aGljaCBkaXJlY3Rpb24gdG8gbW92ZVxuICAgICAgLy8gdXBkYXRlIFN0YXRlXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRodW1iSW5kZXgpO1xuXG4gICAgICAvLyB1cGRhdGUgdGh1bWJzIG5hdlxuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcInJpZ2h0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuICAgIH1cbiAgICBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInRodW1ibmFpbFwiICYmIHByZXZJbmRleCA+IHRodW1iSW5kZXhcbiAgICApIHtcbiAgICAgIC8vIHVwZGF0ZSBTdGF0ZVxuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aHVtYkluZGV4KTtcblxuICAgICAgLy8gdXBkYXRlIHRodW1icyBuYXZcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwibGVmdFwiKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luT3V0KCk7XG5cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgY291bnRlclxuICAgIHRoaXMuY3VycmVudENvdW50SXRlbS5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICB9XG5cbiAgY2hlY2tTaXplKCkge1xuXG4gICAgLy8gT24gcmVzaXplIGVuZCAtIGNoZWNrIHRvIGVuYWJsZSBjbGlja3MgZm9yIGRlc2t0b3Agb3IgcmVtb3ZlIHRoZW1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG4gICAgdGhpcy5yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAvLyBpZiBUYWJsZXQgb3Igc21hbGxlciAtIGJpbmQgbW9iaWxlIG5hdiBhcnJvd3NcbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA8IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgICAgLy8gYWRqdXN0IGNzcyBzaXppbmcgZm9yIHRodW1icyBuYXYgb24gcG9zaXRpb24gcmVzaXplXG4gICAgICAgIHRoaXMuY2hlY2tUaHVtYnNOYXYoXCJtb2JpbGVcIik7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy5jaGVja1RodW1ic05hdihcImRlc2t0b3BcIik7XG5cbiAgICAgIH1cblxuICAgIH0sIDQwMCk7XG5cbiAgfVxuXG4gIGFuaW1hdGVTaGFkb3dJbk91dCgpIHtcblxuICAgIC8vIHJlbW92ZSBkcm9wc2hhZG93XG4gICAgVHdlZW5NYXgudG8odGhpcy5nYWxsZXJ5LCAwLCB7XG4gICAgICBib3hTaGFkb3c6IFwiMHB4IDE4cHggOTRweCAtMTZweCByZ2JhKDAsMCwwLDAuMClcIlxuICAgIH0pO1xuXG5cbiAgICBUd2Vlbk1heC50byh0aGlzLmdhbGxlcnksIC4xLCB7XG4gICAgICBib3hTaGFkb3c6IFwiMHB4IDE4cHggOTRweCAtMTZweCByZ2JhKDAsMCwwLDAuNjgpXCIsXG4gICAgICBkZWxheTogLjNcbiAgICB9KTtcblxuXG4gIH1cblxuICBhbmltYXRlU2hhZG93SW4oKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5nYWxsZXJ5LCAuMywge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjY4KVwiLFxuICAgICAgZGVsYXk6IC4xXG4gICAgfSk7XG4gIH1cblxuICBidWlsZFRodW1icygpIHtcblxuICAgIGxldCBmcmFnbWVudCA9ICQoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcbiAgICAvLyBidWlsZCBsb29wIGZvciBpbWFnZXNcbiAgICB0aGlzLmdhbGxlcnkuZmluZChcImxpXCIpLmVhY2goKCBpbmRleDogbnVtYmVyLCBlbDogT2JqZWN0ICkgPT4ge1xuXG4gICAgICAvLyBjcmVhdGUgaHRtbCBlbGVtZW50c1xuICAgICAgbGV0IGl0ZW1JbmRleCA9IFV0aWxzLnNldE51bWJlcihpbmRleCksXG4gICAgICAgIGltYWdlVGh1bWJVcmwgPSAkKGVsKS5kYXRhKFwidGh1bWJcIiksXG4gICAgICAgIGltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiksXG4gICAgICAgIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIiksXG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cbiAgICAgIC8vIGFkZCBzcmMgYW5kIGF0dHIgdG8gaW1hZ2VcbiAgICAgIGltYWdlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgaW1hZ2VUaHVtYlVybCk7XG4gICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiI1wiKTtcbiAgICAgIGxpbmtFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRWxlbWVudCk7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiLCBpdGVtSW5kZXgpO1xuXG4gICAgICAvLyBzZXQgZmlyc3QgaW1hZ2UgdG8gc2VsZWN0ZWRcbiAgICAgIGluZGV4ID09PSB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCA/IGVsZW1lbnQuY2xhc3NOYW1lID0gXCJzZWxlY3RlZFwiIDogXCJcIjtcblxuICAgICAgLy8gYXBwZW5kIHRvIGZyYWdtZW50XG4gICAgICBmcmFnbWVudC5hcHBlbmQoZWxlbWVudCk7XG5cbiAgICB9KTtcblxuICAgIC8vIGluc2VydCBodG1sIGVsZW1lbnQgdG8gdGhlIGRvbSBhZnRlciBsb29wIGZpbmlzaGVzXG4gICAgdGhpcy50aHVtYnNDb250YWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICB9XG5cbiAgYnVpbGRUaHVtYnNDbGlja0hhbmRsZXIoIGNhbGxiYWNrICkge1xuXG4gICAgLy8gQWRkIGFycmF5IG9mIGh0bWwgb2JqZWN0IHRvIGF0dGFjaCBjbGljayBldmVudHMgdG8gbGF0ZXJcbiAgICB0aGlzLnRodW1ic0NsaWNrID0gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcImFcIik7XG5cbiAgICAvLyBDbGljayBoYW5kbGVyIGZvciBwcmV2aWV3IHRodW1icyBvbiBkZXNrdG9wLCBuZWVkcyB0byB3b3JrIG9uIHRhYmxldCAtPiBkZXNrdG9wXG4gICAgdGhpcy50aHVtYnNDbGljay5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuICAgICAgJChlbCkub24oXCJjbGlja1wiLCB7IGtleXM6IFwidGh1bWJuYWlsXCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfSk7XG5cbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgYW5pbWF0ZUluVGh1bWJzKCkge1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuc2hvd0Nhc2VUaHVtYnMsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IDFcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVHYWxsZXJ5SW4oKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fb3V0ZXItLWJnaW1hZ2VcIiksIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IC43LFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcblxuICAgIHRoaXMuc2V0Rmlyc3RTbGlkZSgpO1xuXG4gICAgLy8gSW5pdCBjb3JyZWN0IG5hdiBkZXBlbmRpbmcgb24gdmlld3BvcnQgc2l6ZVxuICAgIHRoaXMuY2hlY2tTaXplKCk7XG4gICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KCk7XG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcImxlZnRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5leHRCdG5Nb2JpbGUub24oXCJjbGlja1wiLCB7IGtleXM6IFwicmlnaHRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRUb3RhbFNsaWRlcygpKSk7XG5cbiAgICAvLyB1cGRhdGUgY291bnRlclxuICAgIHRoaXMuY3VycmVudENvdW50SXRlbS5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICB9XG59XG5cbi8vIGxvb3AgdGhyb3VnaCBlYWNoIGhlYWRlciBzbGlkZXIgb2JqZWN0IG9uIHRoZSBwYWdlXG5jbGFzcyBTaG93Q2FzZVNMaWRlciB7XG5cbiAgaXRlbUluZm9XcmFwcGVyOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIgPSAkKFwiLnNob3djYXNlXCIpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNob3djYXNlIFNsaWRlciBpbml0XCIpO1xuXG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIuZWFjaCgoIGluZGV4OiBudW1iZXIsIGVsOiBPYmplY3QgKSA9PiB7XG5cbiAgICAgIC8vIFBhc3MgXCJ0aGlzXCIgdG8gZWFjaCBuZXcgSGVhZGVyIHNsaWRlciBjb21wb25lbnRcbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2hvd2Nhc2VDb21wb25lbnQoZWwpO1xuICAgICAgc2xpZGVyLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmxldCBTaG93Y2FzZVNsaWRlciA9IG5ldyBTaG93Q2FzZVNMaWRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBTaG93Y2FzZVNsaWRlcjtcbiIsImNvbnN0ICQgPSBqUXVlcnk7XG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTdGlja3lTaWRlYmFyQ29tcG9uZW50IHtcblxuICBpc0FuaW1hdGluZzogYm9vbGVhbjtcbiAgY29udGVudFdyYXBwZXI6IEpRdWVyeTtcbiAgY29udGVudE9mZnNldFRvcDogbnVtYmVyO1xuICBjb250ZW50V3JhcHBlckhlaWdodDogbnVtYmVyO1xuICBzY3JvbGxUb3A6IG51bWJlcjtcbiAgYXNpZGU6IEpRdWVyeTtcbiAgc2lkZWJhcldyYXBwZXI6IEpRdWVyeTtcbiAgd2luZG93SGVpZ2h0OiBudW1iZXI7XG4gIHNpZGViYXJIZWlnaHQ6IG51bWJlcjtcbiAgZm9vdGVySGVpZ2h0OiBudW1iZXI7XG4gIHNjcm9sbGluZ0Rvd246IGJvb2xlYW47XG4gIGxhc3RTY3JvbGxUb3A6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlciA9ICQoXCIuc2lkZWJhci1jb250ZW50XCIpO1xuICAgIHRoaXMuYXNpZGUgPSAkKFwiLnNlcnZpY2Utc2lkZWJhci13cmFwcGVyXCIpO1xuICAgIHRoaXMud2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFyV3JhcHBlciA9ICQoXCIuc2VydmljZS1zaWRlYmFyXCIpO1xuICB9XG5cbiAgY2hlY2tTaWRlYmFyKCk6IHZvaWQge1xuICAgIC8vIENoZWNrIGlmIHRoZSBzaWRlYmFyIGlzIGZpeGVkIG9yIG5vdFxuICAgIGlmICggIXRoaXMuaXNBbmltYXRpbmcgJiYgVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpID8gc2V0VGltZW91dCh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpLCAzMDApIDogd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNldFNpZGVCYXIoKTtcbiAgICB9XG4gIH1cblxuICByZXNldFNpZGVCYXIoKSB7XG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIik7XG4gICAgdGhpcy5hc2lkZS5hdHRyKFwic3R5bGVcIiwgXCJcIik7XG4gIH1cblxuICB1cGRhdGVTaWRlYmFyUG9zaXRpb24oKTogdm9pZCB7XG5cbiAgICB0aGlzLmNoZWNrU2Nyb2xsRGlyZWN0aW9uKCk7XG5cbiAgICAvLyBnZXQgZGlzdGFuY2UgZnJvbSB0b3Agb2YgY29udGVudCAxMCArIDQwID0gNTAgcGFkZGluZyB0b3BcbiAgICAvLyB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm9mZnNldCgpLnRvcCAtIDEwO1xuICAgIHRoaXMuY29udGVudE9mZnNldFRvcCA9IHRoaXMuY29udGVudFdyYXBwZXIub2Zmc2V0KCkudG9wO1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCA9IHRoaXMuY29udGVudFdyYXBwZXIub3V0ZXJIZWlnaHQoKTsgLy8gaW5jbHVkZSBwYWRkaW5nIGFuZCBtYXJnaW5cblxuXG4gICAgLy8gZ2V0IHdoZXJlIHRvcCBvZiB3aW5kb3cgaXNcbiAgICB0aGlzLnNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnRlbnQgV3JhcHBlciBIZWlnaHRcIiwgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJDb250ZW50IE9mZnNldFwiLCB0aGlzLmNvbnRlbnRPZmZzZXRUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2lkZWJhciBIZWlnaHRcIiwgdGhpcy5zaWRlYmFySGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIldpbmRvdyBIZWlnaHRcIiwgdGhpcy53aW5kb3dIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwib2Zmc2V0IFRvcFwiLCB0aGlzLmNvbnRlbnRPZmZzZXRUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2Nyb2xsVG9wXCIsIHRoaXMuc2Nyb2xsVG9wKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNpZGViYXJvZmZzZXRcIiwgdGhpcy5zY3JvbGxUb3ApO1xuXG4gICAgLy8gSWYgdGhlIHdpbmRvdyBWIHBvc2l0aW9uIGlzIGxlc3MgdGhhbiB0aGUgY29udGVudCBWIHBvc2l0aW9uIG1ha2Ugc2lkZWJhciBub3JtYWxcbiAgICBpZiAoIHRoaXMuc2Nyb2xsVG9wIDwgdGhpcy5jb250ZW50T2Zmc2V0VG9wICkge1xuICAgICAgLy8gbGV0IGNzc1Byb3BzID0ge1xuICAgICAgLy8gICBcInRyYW5zaXRpb25cIjogXCJ0b3AgLjNzXCJcbiAgICAgIC8vIH07XG4gICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpO1xuICAgICAgLy8gdGhpcy5hc2lkZS5jc3MoY3NzUHJvcHMpO1xuXG4gICAgICAvLyBpZiB3aW5kb3cgViBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gY29udGVudCAtIGFkZCBzdGlja3lcbiAgICAgIC8vIDJuZCBjaGVja3MgdGhlIG9mZnNldCBvZiB0aGUgdG9wIG9mIHRoZSB3aW5kb3cgdG8gdGhlIHRvcCBvZiB0aGUgY29udGVudCAmJiB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRlbnQgaW4gcmVsYXRpb24gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSB3aW5kb3cgLSA0MCBvbiBlbmRcbiAgICB9IGVsc2UgaWYgKCB0aGlzLnNjcm9sbFRvcCA+PSB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgJiYgdGhpcy5zY3JvbGxUb3AgPCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgdGhpcy5jb250ZW50T2Zmc2V0VG9wICkge1xuICAgICAgdGhpcy5hc2lkZS5hZGRDbGFzcyhcInN0aWNreVwiKS5hdHRyKFwic3R5bGVcIiwgXCJcIik7XG5cbiAgICAgIGlmICggdGhpcy5zY3JvbGxpbmdEb3duID09PSB0cnVlICkge1xuICAgICAgICAvLyB0aGlzLmFzaWRlLmNzcyhcInRyYW5zaXRpb25cIiwgXCJ0b3AgLjNzXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhpcy5hc2lkZS5jc3MoXCJ0cmFuc2l0aW9uXCIsIFwiXCIpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGxldCBhcnRpY2xlUGFkZGluZ1RvcCA9IE51bWJlcihhcnRpY2xlcy5lcSgxKS5jc3MoXCJwYWRkaW5nLXRvcFwiKS5yZXBsYWNlKFwicHhcIiwgXCJcIikpO1xuICAgICAgaWYgKCB0aGlzLmFzaWRlLmhhc0NsYXNzKFwic3RpY2t5XCIpICkge1xuICAgICAgICB0aGlzLmFzaWRlLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcbiAgICAgICAgdGhpcy5hc2lkZS5yZW1vdmVDbGFzcyhcInN0aWNreVwiKS5jc3MoXCJ0b3BcIiwgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCAtIHRoaXMuc2lkZWJhckhlaWdodCArIFwicHhcIik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgfVxuXG4gIGNoZWNrU2Nyb2xsRGlyZWN0aW9uKCkge1xuICAgIC8vIExvZyBjdXJyZW50IHNjcm9sbFBvaW50XG4gICAgbGV0IHN0ID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblxuICAgIC8vIGNvbXBhcmUgdG8gbGFzdCBzY3JvbGxQb2ludFxuICAgIGlmICggc3QgPiB0aGlzLmxhc3RTY3JvbGxUb3AgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNjcm9sbCBkb3duXCIpO1xuICAgICAgLy8gZG93bnNjcm9sbCBjb2RlXG4gICAgICB0aGlzLnNjcm9sbGluZ0Rvd24gPSB0cnVlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2Nyb2xsIHVwXCIpO1xuICAgICAgLy8gdXBzY3JvbGwgY29kZVxuICAgICAgdGhpcy5zY3JvbGxpbmdEb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gb24gY29tcGxldGUgLSBtYWtlIGxhc3QgU2Nyb2xsIHBvaW50IHRoZSBwb2ludCBhdCB3aGljaCB0aGV5IHN0YXJ0ZWQgc2Nyb2xsaW5nIGF0IGZpcnN0XG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gc3Q7XG4gIH1cblxuICBhbmltYXRlU2lkZWJhckluKCkge1xuXG4gICAgdGhpcy5hc2lkZS5yZW1vdmVDbGFzcyhcImludHJvXCIpO1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIGxldCBzaWRlYmFySW50cm8gPSBUd2Vlbk1heC50byh0aGlzLmFzaWRlLCAuMywge1xuICAgICAgICB4OiAwLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICB6OiAuMDAxLFxuICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0LFxuICAgICAgICBkZWxheTogLjksXG4gICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAvLyBtYWtlIHNpZGViYXIgcGVybWFuZW50bHkgdmlzaWJsZVxuICAgICAgICAgIHRoaXMuYXNpZGUuYWRkQ2xhc3MoXCJ2aXNpYmxlXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTdGlja3kgc2lkZWJhciBsb2FkZWRcIik7XG5cbiAgICB0aGlzLmxhc3RTY3JvbGxUb3AgPSAwO1xuICAgIGlmICggdGhpcy5hc2lkZS5sZW5ndGggPiAwICkge1xuICAgICAgdGhpcy5jaGVja1NpZGViYXIoKTtcblxuICAgICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIHRoaXMuY2hlY2tTaWRlYmFyLmJpbmQodGhpcykpO1xuICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaWRlYmFyLmJpbmQodGhpcykpO1xuXG4gICAgICAvLyBBbmltYXRlIHNpZGUgYmFyIGluIG9uIGxvYWRcbiAgICAgIHRoaXMuYW5pbWF0ZVNpZGViYXJJbigpO1xuICAgIH1cbiAgfVxufVxuXG5sZXQgU3RpY2t5U2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN0aWNreVNpZGViYXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmNsYXNzIFRlc3RpbW9uYWlsQ29tcG9uZW50IHtcblxuICB0ZXN0aW1vbmFpbHM6IEpRdWVyeTtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgY3VycmVudEhlaWdodDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVzdGltb25haWxzID0gJChcIi50ZXN0aW1vbmlhbHNcIik7XG4gIH1cblxuICBnZW5lcmF0ZUlkKCBpbmRleCwgZWwgKSB7XG5cbiAgICAvLyBjcmVhdGUgRHluYW1pYyBJRFxuICAgIGxldCBpZFN0cmluZyA9IFwiY2Fyb3VzZWwtdGVzdGltb25pYWwtXCIgKyBpbmRleDtcbiAgICBlbC5hdHRyKFwiaWRcIiwgaWRTdHJpbmcpO1xuXG4gICAgLy8gQWRkIG1hdGNoaW5nIGhyZWYgdG8gY29udHJvbHNcbiAgICBsZXQgY29udHJvbHMgPSBlbC5maW5kKFwiLmNhcm91c2VsLWNvbnRyb2xcIik7XG4gICAgY29udHJvbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgJChlbCkuYXR0cihcImhyZWZcIiwgXCIjXCIgKyBpZFN0cmluZyk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgb25SZXNpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIENoYW5nZSBIZWlnaHQgb24gcmVzaXplXG4gICAgICB0aGlzLnRlc3RpbW9uYWlscy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAgIGxldCAkdGhpcyA9ICQoZWwpO1xuXG4gICAgICAgIC8vIGVzdGFibGlzaCB2YXJzXG4gICAgICAgIGxldCAkaW5uZXIgPSAkdGhpcy5maW5kKFwiLmNhcm91c2VsLWlubmVyXCIpLFxuICAgICAgICAgICAgJGFjdGl2ZSA9ICRpbm5lci5maW5kKFwiLmFjdGl2ZVwiKSxcbiAgICAgICAgICAgIGJsb2NrSXRlbSA9ICRhY3RpdmUuZmluZChcImJsb2NrcXVvdGVcIik7XG5cbiAgICAgICAgLy8gU2V0IGhlaWdodCBmb3IgZmlyc3QgaXRlbVxuICAgICAgICBsZXQgaGVpZ2h0ID0gYmxvY2tJdGVtLm91dGVySGVpZ2h0KCk7XG5cbiAgICAgICAgLy8gaWYgdGhleSBhcmVuJ3QgZXF1YWwsIGNoYW5nZSB0aGVtXG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50SGVpZ2h0ICE9PSBoZWlnaHQgKSB7XG4gICAgICAgICAgJGlubmVyLmNzcyhcImhlaWdodFwiLCBoZWlnaHQpO1xuICAgICAgICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0sIDQwMCk7XG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgY29uc29sZS5sb2coXCJUZXN0aW1vbmlhbHMgSW5pdFwiKTtcblxuICAgIC8vIE1ha2UgaXRlbXMgZHluYW1pY1xuICAgIHRoaXMudGVzdGltb25haWxzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVJZChpbmRleCwgJHRoaXMpO1xuXG4gICAgICAvLyBtYWtlIGZpcnN0IGVsZW1lbnQgYWN0aXZlXG4gICAgICBsZXQgJGlubmVyID0gJHRoaXMuZmluZChcIi5jYXJvdXNlbC1pbm5lclwiKTtcbiAgICAgIGxldCAkZmlyc3QgPSAkaW5uZXIuY2hpbGRyZW4oXCIuaXRlbVwiKS5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyBTZXQgaGVpZ2h0IGZvciBmaXJzdCBpdGVtXG4gICAgICBsZXQgaGVpZ2h0ID0gJGZpcnN0Lm91dGVySGVpZ2h0KCk7XG4gICAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAkaW5uZXIuY3NzKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICB9KTtcblxuICAgIC8vIFN0YXJ0IFNsaWRlcnNcbiAgICB0aGlzLnRlc3RpbW9uYWlscy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAvLyBpbml0IGNhcm91c2VsXG4gICAgICAkKGVsKS5jYXJvdXNlbCgpO1xuXG4gICAgICAvLyBPbiBzbGlkZSBjaGFuZ2UgaGVpZ2h0IGZvciBzbW9vdGggdHJhbnNpdGlvbnNcbiAgICAgICQoZWwpLm9uKFwic2xpZC5icy5jYXJvdXNlbFwiLCAoIGUgKSA9PiB7XG5cbiAgICAgICAgLy8gc2xpZGVcbiAgICAgICAgbGV0ICR0aGlzID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBsZXQgY3VycmVudFNsaWRlID0gJCgkdGhpcykuZmluZChcIi5hY3RpdmVcIik7XG4gICAgICAgIGxldCBibG9ja0l0ZW0gPSBjdXJyZW50U2xpZGUuZmluZChcImJsb2NrcXVvdGVcIik7XG4gICAgICAgIGxldCBoZWlnaHQgPSBibG9ja0l0ZW0ub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBjdXJyZW50U2xpZGUucGFyZW50KFwiLmNhcm91c2VsLWlubmVyXCIpLmNzcyhcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGFkanVzdCBzaXplIG9uIHJlc2l6ZVxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxuY29uc3QgVGVzdGltb25haWxzID0gbmV3IFRlc3RpbW9uYWlsQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RpbW9uYWlsczsiLCJpbXBvcnQge0Jwc0ludGVyZmFjZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYnBzLmludGVyZmFjZVwiO1xuY29uc3QgJCA9IGpRdWVyeTtcblxuLy8gQWRkIGludGVyZmFjZSBKUXVlcnlTbW9vdGgge1xuLy8gc21vb3RoU3RhdGUoKTp2b2lkO1xuLy8gfVxuLy8gc21vb3RoU3RhdGUoYXJnOiBPYmplY3QpOiBKUXVlcnk7XG5cbmNsYXNzIFV0aWxpdHlDb21wb25lbnQge1xuICB3aW5kb3dXaWR0aDogbnVtYmVyO1xuICBicmVha3BvaW50OiBudW1iZXI7XG4gIGJyZWFrcG9pbnRzOiBudW1iZXJbXTtcbiAgYnBzOiBCcHNJbnRlcmZhY2U7XG4gIGJyb3dzZXI6IHN0cmluZztcblxuICBwcml2YXRlIF9zZXRCcmVha3BvaW50cyA9ICggYnBzOiBCcHNJbnRlcmZhY2UgKSA9PiB7XG4gICAgbGV0IGFyciA9IFtdO1xuXG4gICAgZm9yICggbGV0IGtleSBpbiBicHMgKSB7XG4gICAgICBpZiAoIGJwcy5oYXNPd25Qcm9wZXJ0eShrZXkpICkge1xuICAgICAgICBhcnIucHVzaChicHNbIGtleSBdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyLnJldmVyc2UoKTtcbiAgfTtcbiAgcHJpdmF0ZSBfY2hlY2tCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIG1ha2UgYnJlYWtwb2ludCBldmVudCBhdmFpbGFibGUgdG8gYWxsIGZpbGVzIHZpYSB0aGUgd2luZG93IG9iamVjdFxuICAgIGxldCBvbGRfYnJlYWtwb2ludCA9IHRoaXMuYnJlYWtwb2ludDtcblxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcblxuICAgIGlmICggb2xkX2JyZWFrcG9pbnQgIT09IHRoaXMuYnJlYWtwb2ludCApIHtcblxuICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoXCJicmVha3BvaW50Q2hhbmdlXCIsIFV0aWxzLmJyZWFrcG9pbnQpO1xuICAgIH1cbiAgfTtcbiAgcHJpdmF0ZSBfc2V0QnJlYWtwb2ludCA9ICgpID0+IHtcbiAgICAvLyBnZXQgYnJlYWtwb2ludCBmcm9tIGNzc1xuICAgIGxldCBib2R5ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KSxcbiAgICAgIHppbmRleCA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbIFwiei1pbmRleFwiIF07XG5cbiAgICB0aGlzLmJyZWFrcG9pbnQgPSBwYXJzZUludCh6aW5kZXgsIDEwKTtcbiAgfTtcbiAgcHJpdmF0ZSBfc2V0V2luZG93V2lkdGggPSAoKSA9PiB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICB9O1xuXG4gIHNldE51bWJlciggY291bnQ6IG51bWJlciApOiBzdHJpbmcge1xuICAgIC8vIGNvbnZlciBudW1iZXIgdG8gc3RyaW5nXG4gICAgbGV0IHRvdGFsID0gY291bnQ7XG4gICAgcmV0dXJuIHRvdGFsLnRvU3RyaW5nKCk7XG4gIH1cblxuICB3aGljaEJyb3dzZXIoKSB7XG4gICAgaWYgKCAobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJzYWZhcmlcIikgPiAtMSkgJiYgIShcbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiY2hyb21lXCIpID4gLTEpICYmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PT1cbiAgICAgIFwiTmV0c2NhcGVcIikgKSB7XG5cbiAgICAgIGlmICggbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKSAhPT0gbnVsbCApIHtcbiAgICAgICAgcmV0dXJuIFwiaXBhZFwiO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJzYWZhcmlcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBidWlsZEh0bWwoIHR5cGU6IHN0cmluZywgYXR0cnM/OiBPYmplY3QsIGh0bWw/OiBzdHJpbmcgKSB7XG4gICAgXG4gICAgLy8gaHR0cDovL21hcmNncmFiYW5za2kuY29tL2J1aWxkaW5nLWh0bWwtaW4tanF1ZXJ5LWFuZC1qYXZhc2NyaXB0L1xuICAgIFxuICAgIGxldCBoID0gJzwnICsgdHlwZTtcblxuICAgIGZvciAoIGxldCBhdHRyIGluIGF0dHJzICkge1xuICAgICAgaWYgKCBhdHRyc1sgYXR0ciBdID09PSBmYWxzZSApIGNvbnRpbnVlO1xuICAgICAgaCArPSAnICcgKyBhdHRyICsgJz1cIicgKyBhdHRyc1sgYXR0ciBdICsgJ1wiJztcbiAgICB9XG5cbiAgICByZXR1cm4gaCArPSBodG1sID8gXCI+XCIgKyBodG1sICsgXCI8L1wiICsgdHlwZSArIFwiPlwiIDogXCIvPlwiO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDA7XG4gICAgdGhpcy5icmVha3BvaW50ID0gMzIwO1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSBbXTtcbiAgICB0aGlzLmJwcyA9IHtcbiAgICAgIG1vYmlsZTogNTQ0LFxuICAgICAgdGFibGV0OiA3NjgsXG4gICAgICBsYXB0b3A6IDk5MixcbiAgICAgIGRlc2t0b3A6IDEyMDAsXG4gICAgICBkZXNrdG9wX3hsOiAxNjAwXG4gICAgfTtcbiAgICB0aGlzLmJyb3dzZXIgPSB0aGlzLndoaWNoQnJvd3NlcigpO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlV0aWxpdGllcyBsb2FkZWRcIik7XG5cbiAgICAvLyBzZXQgYnJlYWtwb2ludCBvbiB3aW5kb3cgbG9hZFxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcbiAgICB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBCcmVha3BvaW50IGlzOlwiLCB0aGlzLmJyZWFrcG9pbnQpO1xuXG4gICAgLy8gY3JlYXRlIGZ1bGwgYXJyYXkgZm9yIGltYWdlIGNvbXByZXNzaW9uIHJlZlxuICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLl9zZXRCcmVha3BvaW50cyh0aGlzLmJwcyk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5fY2hlY2tCcmVha3BvaW50KS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBVdGlscyA9IG5ldyBVdGlsaXR5Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyJdfQ==
