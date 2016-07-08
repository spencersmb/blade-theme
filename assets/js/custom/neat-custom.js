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
var QuoteComponent = (function () {
    function QuoteComponent() {
        this.selectBtn = $(".quote__select--btn");
        this.switch = $(".quote__switch");
    }
    QuoteComponent.prototype.setWidth = function (label) {
        var labelWidth = label.outerWidth();
        this.switch.css("width", labelWidth);
    };
    QuoteComponent.prototype.init = function () {
        var _this = this;
        console.log("Quote Builder");
        var inputs = this.selectBtn.find(".quote__input");
        inputs.each(function (index, el) {
            var $this = $(el), nextLabel = $this.next();
            // find Selected, get width of label, set width of span
            if (nextLabel.hasClass("selected")) {
                _this.setWidth(nextLabel);
            }
            // Add on change function here
            $this.change(function (e) {
                var $this = $(e.currentTarget), fieldset = $this.parent(".fieldset"), prevItem = fieldset.find(".selected"), prevWidth = prevItem.outerWidth() - 1, inputId = $this.attr("id");
                fieldset.find("label").removeClass("selected");
                var selectedLabel = fieldset.find("label[for=" + inputId + "]").addClass("selected");
                // if the currently selected input matches the 2nd item - then move switch right, otherwise back to position 1
                if (inputId === $(inputs[1]).attr("id")) {
                    _this.switch.css({
                        "webkitTransform": "translateX(" + prevWidth + "px)",
                        "MozTransform": "translateX(" + prevWidth + "px)",
                        "msTransform": "translateX(" + prevWidth + "px)",
                        "OTransform": "translateX(" + prevWidth + "px)",
                        "transform": "translateX(" + prevWidth + "px)"
                    });
                }
                else {
                    _this.switch.css({
                        "webkitTransform": "translateX(0px)",
                        "MozTransform": "translateX(0px)",
                        "msTransform": "translateX(0px)",
                        "OTransform": "translateX(0px)",
                        "transform": "translateX(0px)"
                    });
                }
                _this.setWidth(selectedLabel);
            });
        });
    };
    return QuoteComponent;
}());
var QuoteBuilder = new QuoteComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QuoteBuilder;

},{}],10:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGUudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zdmcudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2ltYWdlTG9hZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9xdW90ZS1idWlsZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy90ZXN0aW1vbmlhbHMudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztHQUdHOztBQUVILHNCQUFrQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLDJCQUFnQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzFDLHVCQUFtQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3BELDJCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLG9EQUFvRDtBQUNwRCw0QkFBd0Isd0JBQXdCLENBQUMsQ0FBQTtBQUNqRCwrQkFBMEIsMkJBQTJCLENBQUMsQ0FBQTtBQUN0RCxpQ0FBZ0Ms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QkFDTixNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2xCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQWdCRCwrQkFBSSxHQUFKO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRWhDLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZELDhDQUE4QztRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxELENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQXZGQSxBQXVGQyxJQUFBO0FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0FBRW5DO2tCQUFlLEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuIFJlZiBwYXRoIGlzIG5vdCBuZWVkZWQgZm9yIHNvbWUgcmVhc29uXG4gPHJlZmVyZW5jZSBwYXRoPVwiL1VzZXJzL3lvc2VtZXRpZS9Ecm9wYm94L2RldmVsb3BtZW50L3Zob3N0cy93d3cubHluZGFzY29yZS5kZXYvd3AtY29udGVudC90aGVtZXMvbmVhdC90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbiAqL1xuXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBOYXYgZnJvbSBcIi4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL25hdmlnYXRpb24vY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCBTdmdIZWFkZXIgZnJvbSBcIi4vcGFydGlhbHMvaGVhZGVyLXN2Z1wiO1xuLy8gaW1wb3J0IFNtb290aFN0YXRlIGZyb20gXCIuL3BhcnRpYWxzL3Ntb290aFN0YXRlXCI7XG5pbXBvcnQgSW1hZ2VMb2FkZXIgZnJvbSBcIi4vcGFydGlhbHMvaW1hZ2VMb2FkZXJcIjtcbmltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyXCI7XG5pbXBvcnQgQW5pbWF0aW9uQ29udHJvbGxlciBmcm9tIFwiLi9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uXCI7XG5pbXBvcnQgSXNvdG9wZUdhbGxlcnkgZnJvbSBcIi4vcGFydGlhbHMvZ2FsbGVyeS1pc290b3BlXCI7XG5pbXBvcnQgSGVhZGVyU2xpZGVyIGZyb20gXCIuL3BhcnRpYWxzL2hlYWRlci1zbGlkZXJcIjtcbmltcG9ydCBTaG93Y2FzZVNsaWRlciBmcm9tIFwiLi9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXJcIjtcbmltcG9ydCBUZXN0aW1vbmlhbHMgZnJvbSBcIi4vcGFydGlhbHMvdGVzdGltb25pYWxzXCI7XG5pbXBvcnQgUXVvdGVCdWlsZGVyIGZyb20gXCIuL3BhcnRpYWxzL3F1b3RlLWJ1aWxkZXJcIjtcbi8vIGltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3NlcnZpY2Utc2lkZWJhclwiO1xuY29uc3QgJCA9IGpRdWVyeTtcbmRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG4vLyBkZWNsYXJlIHZhciByZXZhcGkxOiBhbnk7XG5cbihmdW5jdGlvbiAoKSB7XG4gIGNsYXNzIEFwcCB7XG5cbiAgICBpbml0KCk6IHZvaWQge1xuICAgICAgY29uc29sZS5sb2coXCJBcHAgbG9hZGVkXCIpO1xuICAgICAgU3ZnSGVhZGVyLmluaXQoKTtcbiAgICAgIFV0aWxzLmluaXQoKTtcbiAgICAgIE5hdi5pbml0KCk7XG4gICAgICBTZWFyY2guaW5pdCgpO1xuICAgICAgU3RpY2t5U2lkZWJhci5pbml0KCk7XG4gICAgICBUZXN0aW1vbmlhbHMuaW5pdCgpO1xuICAgICAgUXVvdGVCdWlsZGVyLmluaXQoKTtcbiAgICAgIEFuaW1hdGlvbkNvbnRyb2xsZXIuaW5pdCgpOyAvLyBHbG9iYWwgd2luZG93IGFuaW0gYW5kIGNsaWNrIGNvbnRyb2xcblxuICAgIH1cbiAgfVxuXG4gIGxldCBib290c3RyYXAgPSBuZXcgQXBwKCk7XG5cbiAgLyoqIHJ1biBhbGwgZnVuY3Rpb25zICovXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBib290c3RyYXAuaW5pdCgpO1xuICAgIEltYWdlTG9hZGVyLmluaXQoKTtcbiAgICAvLyBTbW9vdGhTdGF0ZS5pbml0KFwiXCIpO1xuICB9KTtcblxuICAvLyBCaW5kIGV2ZW50cyB0byB0aGUgaW1hZ2VzTG9hZGVkIHBsdWdpbiBoZXJlXG4gICQoZG9jdW1lbnQpLm9uKFwiaW1nTG9hZGVkXCIsIGZ1bmN0aW9uICggZSApIHtcbiAgICBjb25zb2xlLmxvZyhcImltYWdlIGxvYWRlZCBjdXN0b20gZXZlbnRcIik7XG4gICAgLy8gY2hlY2sgaWYgcGFnZSBoYXMgZ2FsbGVyeVxuICAgIGlmICggJChcIi5nYWxsZXJ5LWNvbnRhaW5lclwiKS5sZW5ndGggPiAwICkge1xuICAgICAgSXNvdG9wZUdhbGxlcnkuaW5pdCgpO1xuICAgIH1cbiAgICBIZWFkZXJTbGlkZXIuaW5pdCgpO1xuICAgIFNob3djYXNlU2xpZGVyLmluaXQoKTtcblxuICB9KTtcblxufSkoKTsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi8uLi9wYXJ0aWFscy91dGlsc1wiO1xuXG5jbGFzcyBTZWFyY2hDb21wb25lbnQge1xuICAkc2VhcmNoVHJpZ2dlcjogSlF1ZXJ5O1xuICAkc2VhcmNoQ2xvc2VUcmlnZ2VyOiBKUXVlcnk7XG4gICRzZWFyY2hGb3JtOiBKUXVlcnk7XG4gICRzZWFyY2hCdXR0b25BcmVhOiBKUXVlcnk7XG4gICRpY29uOiBKUXVlcnk7XG4gICRmb3JtOiBKUXVlcnk7XG4gICRpbnB1dDogSlF1ZXJ5O1xuICAkd2lkdGg6IG51bWJlcjtcbiAgJGhlaWdodDogbnVtYmVyO1xuICBpc09wZW46IGJvb2xlYW47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyID0gJChcIi5tZXRhLXNlYXJjaC10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciA9ICQoXCIuc3VwZXItc2VhcmNoLWNsb3NlXCIpO1xuICAgIHRoaXMuJHNlYXJjaEZvcm0gPSAkKFwiLnN1cGVyLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRzZWFyY2hCdXR0b25BcmVhID0gJChcIi5tZXRhLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRpY29uID0gdGhpcy4kc2VhcmNoVHJpZ2dlci5jaGlsZHJlbihcImlcIik7XG4gICAgdGhpcy4kZm9ybSA9IHRoaXMuJHNlYXJjaEZvcm0uZmluZChcIi5ldC1zZWFyY2hcIik7XG4gICAgdGhpcy4kaW5wdXQgPSB0aGlzLiRmb3JtLmZpcnN0KCk7XG4gICAgdGhpcy4kd2lkdGggPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gICAgdGhpcy4kaGVpZ2h0ID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS5oZWlnaHQoKTtcbiAgfVxuXG4gIHJlbG9hZCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNlYXJjaCBSZWxvYWRcIik7XG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlciA9ICQoXCIubWV0YS1zZWFyY2gtdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIgPSAkKFwiLnN1cGVyLXNlYXJjaC1jbG9zZVwiKTtcbiAgICB0aGlzLiRzZWFyY2hGb3JtID0gJChcIi5zdXBlci1zZWFyY2hcIik7XG4gICAgdGhpcy4kc2VhcmNoQnV0dG9uQXJlYSA9ICQoXCIubWV0YS1zZWFyY2hcIik7XG4gICAgdGhpcy4kaWNvbiA9IHRoaXMuJHNlYXJjaFRyaWdnZXIuY2hpbGRyZW4oXCJpXCIpO1xuICAgIHRoaXMuJGZvcm0gPSAkKFwiLmV0LXNlYXJjaFwiKTtcbiAgICB0aGlzLiR3aWR0aCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgICB0aGlzLiRoZWlnaHQgPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLmhlaWdodCgpO1xuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMub3BlblNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgfVxuXG4gIGdldFRvcFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaFRyaWdnZXIub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICB9XG5cbiAgZ2V0TGVmdFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaFRyaWdnZXIub2Zmc2V0KCkubGVmdDtcbiAgfVxuXG4gIGNsb3NlU2VhcmNoKCBldmVudCApIHtcblxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cbiAgICBsZXQgYW5pbWF0aW9uID0gbmV3IFRpbWVsaW5lTGl0ZSgpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciwgLjIsIHtcbiAgICAgIHRvcDogXCI1JVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCJcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjI1JVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gICAgYW5pbWF0aW9uLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC4yLCB7XG4gICAgICBsZWZ0OiB0aGlzLmdldExlZnRQb3NpdGlvbigpLFxuICAgICAgdG9wOiB0aGlzLmdldFRvcFBvc2l0aW9uKCksXG4gICAgICB3aWR0aDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBkZWxheTogLjMsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCJcbiAgICAgICAgfSk7XG4gICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRpY29uLCAuMiwge1xuICAgICAgICAgIHRvcDogXCI1MCVcIixcbiAgICAgICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgICAgfSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KS50byh0aGlzLiRzZWFyY2hGb3JtLCAuNCwge1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc2VhcmNoRm9ybS5jc3Moe1xuICAgICAgICAgIFwiei1pbmRleFwiOiAtMSxcbiAgICAgICAgICBcImxlZnRcIjogMCxcbiAgICAgICAgICBcInRvcFwiOiAwLFxuICAgICAgICAgIFwid2lkdGhcIjogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgICAgIFwiaGVpZ2h0XCI6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgfSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcblxuICB9XG5cbiAgb3BlblNlYXJjaChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cbiAgICAvLyBwcmV2ZW50IGJ1dHRvbiBmcm9tIGJlaW5nIHVzZWQgb25jZSBzZWFyY2ggaXMgb3BlblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIuYmx1cigpO1xuXG4gICAgdGhpcy4kc2VhcmNoRm9ybS5jc3Moe1xuICAgICAgbGVmdDogdGhpcy5nZXRMZWZ0UG9zaXRpb24oKSxcbiAgICAgIHRvcDogdGhpcy5nZXRUb3BQb3NpdGlvbigpLFxuICAgICAgd2lkdGg6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgXCJ6LWluZGV4XCI6IDk5OVxuICAgIH0pO1xuXG4gICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIGFuaW1hdGlvbi50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuMlxuICAgIH0pLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC4yLCB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gICAgICBiYWNrZ3JvdW5kOiBcIiMzNTM3M0RcIixcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICBvdmVyZmxvd1k6IFwic2Nyb2xsXCJcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgIHRvcDogXCIxMTAlXCIsXG4gICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIsIC4zLCB7XG4gICAgICB0b3A6IFwiMyVcIixcbiAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgZGVsYXk6IC40LFxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGZvcm0sIC40LCB7XG4gICAgICB0b3A6IFwiMjAlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICAgIGVhc2U6IEV4cG8uZWFzZUluT3V0XG4gICAgfSk7XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggbG9hZGVkXCIpO1xuICAgIC8vIHRoaXMub3BlblNlYXJjaCgpO1xuICAgIHRoaXMuJGlucHV0LmtleXVwKChldmVudCkgPT4ge1xuICAgICAgLy8gaWYga2V5IGlzIGVudGVyIC0gYW5pbWF0ZSBvdXRcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTZWFyY2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMub3BlblNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICBcbiAgICAkKFwiYm9keVwiKS5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT09IDI3ICYmIHRoaXMuaXNPcGVuICkge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5sZXQgU2VhcmNoQm94ID0gbmV3IFNlYXJjaENvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCb3g7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBTZWFyY2hCb3ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hcIjtcblxuaW50ZXJmYWNlIE5hdlN0YXRlIHtcbiAgbmF2RW5hYmxlZDogYm9vbGVhbjtcbiAgbW9iaWxlOiBib29sZWFuO1xuICB0YWJsZXQ6IGJvb2xlYW47XG4gIGxhcHRvcDogYm9vbGVhbjtcbiAgZGVza3RvcDogYm9vbGVhbjtcbn1cblxuY2xhc3MgTmF2Q29tcG9uZW50IHtcbiAgJG5hdlRyaWdnZXI6IEhUTUxFbGVtZW50O1xuICAkbmF2RHJvcGRvd246IEhUTUxFbGVtZW50O1xuICAkbG93ZXJDb250YWluZXI6IEpRdWVyeTtcbiAgJHVwcGVyQ29udGFpbmVyOiBKUXVlcnk7XG4gICRuYXZNZXRhOiBKUXVlcnk7XG4gICRkcm9wRG93bldyYXBwZXI6IEpRdWVyeTtcbiAgJHNlYXJjaDogSlF1ZXJ5O1xuICAkZHJvcERvd25Db250ZW50OiBKUXVlcnk7XG5cbiAgc3RhdGU6IE5hdlN0YXRlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy4kbmF2VHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LXRyaWdnZXJcIik7XG4gICAgdGhpcy4kbmF2RHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV0LWRyb3Bkb3duLXRyaWdnZXJcIik7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIgPSAkKFwiLmxvd2VyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyID0gJChcIi51cHBlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiRuYXZNZXRhID0gJChcIi5ldC1uYXYtbWV0YVwiKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIgPSAkKFwiLmV0LWRyb3Bkb3duLXdyYXBwZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoID0gJChcIiNuYXYteGZlclwiKTtcbiAgICB0aGlzLiRkcm9wRG93bkNvbnRlbnQgPSAkKFwiLmV0LWRyb3Bkb3duLWNvbnRlbnRcIik7XG5cbiAgICAvKlxuICAgICBOYXYgU3RhdGUgT2JqZWN0XG4gICAgICovXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgZGVza3RvcDogZmFsc2VcbiAgICB9O1xuICB9XG5cblxuICAvLyBOb3QgdXNlZFxuICByZWxvYWQoKSB7XG5cbiAgICB0aGlzLiRuYXZUcmlnZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRuYXZEcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXQtZHJvcGRvd24tdHJpZ2dlclwiKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lciA9ICQoXCIubG93ZXJjb250YWluZXJcIik7XG4gICAgdGhpcy4kdXBwZXJDb250YWluZXIgPSAkKFwiLnVwcGVyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJG5hdk1ldGEgPSAkKFwiLmV0LW5hdi1tZXRhXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlciA9ICQoXCIuZXQtZHJvcGRvd24td3JhcHBlclwiKTtcbiAgICB0aGlzLiRzZWFyY2ggPSAkKFwiI25hdi14ZmVyXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duQ29udGVudCA9ICQoXCIuZXQtZHJvcGRvd24tY29udGVudFwiKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cblxuICAvKlxuICAgTW9iaWxlIE5hdiBmdW5jdGlvbmFsaXR5XG4gICAqL1xuICBvcGVuTmF2KCBldmVudDogRXZlbnQgKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICQodGhpcy4kbmF2RHJvcGRvd24pLmFkZENsYXNzKFwibWVudS1pcy1hY3RpdmVcIik7XG4gICAgVHdlZW5NYXgudG8odGhpcy4kbmF2RHJvcGRvd24sIC4zLCB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjbG9zZU5hdiggZXZlbnQ6IEV2ZW50ICk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCh0aGlzLiRuYXZEcm9wZG93bikucmVtb3ZlQ2xhc3MoXCJtZW51LWlzLWFjdGl2ZVwiKTtcbiAgICBUd2Vlbk1heC50byh0aGlzLiRuYXZEcm9wZG93biwgLjMsIHtcbiAgICAgICAgdG9wOiBcIi0xMDAlXCIsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuYXZPcGVuSW5pdCggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKHRoaXMuJG5hdlRyaWdnZXIpLm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuTmF2LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMuJG5hdlRyaWdnZXIpLm9mZigpO1xuICAgIH1cblxuICB9XG5cbiAgbmF2Q2xvc2UoIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKFwiI25hdi1jbG9zZVwiKS5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VOYXYuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjbmF2LWNsb3NlXCIpLm9mZigpO1xuICAgIH1cblxuICB9XG5cbiAgbmF2SXRlbUNsaWNrKCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuXG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKFwiYVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9ICQodGhpcyk7XG4gICAgICAgIHNlbGVjdGVkLm5leHQoXCJ1bFwiKS5yZW1vdmVDbGFzcyhcImlzLWhpZGRlblwiKS5wYXJlbnQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5wYXJlbnQoXCJ1bFwiKS5hZGRDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5jaGlsZHJlbihcImFcIikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBnb2JhY2soIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKFwiLmdvLWJhY2sgPiBhXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZWN0ZWQucGFyZW50KFwibGlcIikucGFyZW50KFwiLmV0LXNlY29uZGFyeS1kcm9wZG93blwiKS5hZGRDbGFzcyhcImlzLWhpZGRlblwiKS5wYXJlbnQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5wYXJlbnQoXCJ1bFwiKS5yZW1vdmVDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIuZ28tYmFjayA+IGFcIikub2ZmKCk7XG4gICAgfVxuXG5cbiAgfVxuXG4gIG1vdmVOYXZpZ2F0aW9uTW9iaWxlKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibW92ZSBuYXZpZ2F0aW9uIG1vYmlsZVwiKTtcblxuICAgIHRoaXMuJHNlYXJjaC5kZXRhY2goKTtcbiAgICB0aGlzLiRuYXZNZXRhLmRldGFjaCgpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyLmRldGFjaCgpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlci5kZXRhY2goKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lci5pbnNlcnRBZnRlcih0aGlzLiR1cHBlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kbmF2TWV0YS5pbnNlcnRCZWZvcmUodGhpcy4kdXBwZXJDb250YWluZXIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRkcm9wRG93bldyYXBwZXIpO1xuICAgIHRoaXMuJG5hdk1ldGEuYXBwZW5kKHRoaXMuJHNlYXJjaCk7XG4gIH1cblxuICBtb3ZlTmF2aWdhdGlvblRhYmxldCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiB0YWJsZXRcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guZGV0YWNoKCk7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIuZGV0YWNoKCk7XG4gICAgdGhpcy4kdXBwZXJDb250YWluZXIuYXBwZW5kKHRoaXMuJG5hdk1ldGEpO1xuICAgIC8vIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRsb3dlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyLmluc2VydEFmdGVyKHRoaXMuJHVwcGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIucHJlcGVuZCh0aGlzLiRzZWFyY2gpO1xuICB9XG5cbiAgbW92ZU5hdmlnYXRpb25EZWtzdG9wKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibW92ZSBuYXZpZ2F0aW9uIGRlc2t0b3BcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guaW5zZXJ0QmVmb3JlKHRoaXMuJGRyb3BEb3duQ29udGVudCk7XG5cbiAgfVxuXG4gIGRpc2FibGVNb2JpbGVOYXYoKSB7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIk5hdiB0dXJuZWQgb2ZmXCIpO1xuICAgIHRoaXMubmF2T3BlbkluaXQoZmFsc2UpO1xuICAgIHRoaXMubmF2Q2xvc2UoZmFsc2UpO1xuICAgIHRoaXMubmF2SXRlbUNsaWNrKGZhbHNlKTtcbiAgICB0aGlzLmdvYmFjayhmYWxzZSk7XG4gICAgdGhpcy5zdGF0ZS5uYXZFbmFibGVkID0gZmFsc2U7XG5cbiAgICAvKlxuICAgICBSZW1vdmUgU3R5bGVzIGZyb20gZWxlbWVudCAmIHJlc2V0IGRyb3Bkb3duXG4gICAgICovXG4gICAgdGhpcy4kbmF2RHJvcGRvd24uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XG4gICAgdGhpcy4kZHJvcERvd25Db250ZW50LnJlbW92ZUNsYXNzKFwibW92ZS1vdXRcIik7XG4gICAgbGV0IGRyb3Bkb3duID0gdGhpcy4kZHJvcERvd25Db250ZW50LmZpbmQoXCIuZXQtc2Vjb25kYXJ5LWRyb3Bkb3duXCIpO1xuXG4gICAgZHJvcGRvd24uZWFjaCggKGluZGV4LCBlbGVtKSA9PiB7XG4gICAgICBpZiAoICEkKGVsZW0pLmhhc0NsYXNzKFwiaXMtaGlkZGVuXCIpICkge1xuICAgICAgICAkKGVsZW0pLmFkZENsYXNzKFwiaXMtaGlkZGVuXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBlbmFibGVNb2JpbGVOYXYoKSB7XG4gICAgY29uc29sZS5sb2coXCJOYXYgdHVybmVkIG9uXCIpO1xuICAgIHRoaXMubmF2T3BlbkluaXQodHJ1ZSk7XG4gICAgdGhpcy5uYXZDbG9zZSh0cnVlKTtcbiAgICB0aGlzLm5hdkl0ZW1DbGljayh0cnVlKTtcbiAgICB0aGlzLmdvYmFjayh0cnVlKTtcblxuICAgIHRoaXMuc3RhdGUubmF2RW5hYmxlZCA9IHRydWU7XG5cbiAgfVxuXG4gIGJyZWFrUG9pbnRNb2JpbGUoKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IE1vYmlsZVwiKTtcblxuICAgIGlmICggIXRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZW5hYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuICAgIHRoaXMubW92ZU5hdmlnYXRpb25Nb2JpbGUoKTtcbiAgfVxuXG4gIGJyZWFrUG9pbnRUYWJsZXQoIHByZXZTdGF0ZSApIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgVGFibGV0XCIpO1xuICAgIGlmICggIXRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZW5hYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuXG4gICAgdGhpcy5tb3ZlTmF2aWdhdGlvblRhYmxldCgpO1xuICB9XG5cbiAgYnJlYWtQb2ludExhcHRvcCggcHJldlN0YXRlICkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBMYXB0b3BcIik7XG5cbiAgICBpZiAoIHRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZGlzYWJsZU1vYmlsZU5hdigpO1xuICAgIH1cblxuICAgIC8vIGlmIHByZXYgc3RhdGUgd2FzIHRhYmxldCBkbyB0aGlzOlxuICAgIGlmICggcHJldlN0YXRlLmRlc2t0b3AgPT09IGZhbHNlIHx8IHByZXZTdGF0ZS5tb2JpbGUgPT09IHRydWUgKSB7XG5cbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25UYWJsZXQoKTtcbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25EZWtzdG9wKCk7XG4gICAgfVxuICB9XG5cbiAgYnJlYWtQb2ludERlc2t0b3AoIHByZXZTdGF0ZSApIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgRGVza3RvcFwiKTtcblxuICAgIGlmICggcHJldlN0YXRlLmxhcHRvcCA9PT0gZmFsc2UgfHwgcHJldlN0YXRlLm1vYmlsZSA9PT0gdHJ1ZSApIHtcblxuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvblRhYmxldCgpO1xuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvbkRla3N0b3AoKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5hdlJlc2l6ZSgpIHtcbiAgICAvKlxuICAgICBNb2JpbGVcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5tb2JpbGUgKSB7XG5cbiAgICAgIGlmICggIXRoaXMuc3RhdGUubW9iaWxlICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRNb2JpbGUoKTtcbiAgICAgIH1cbiAgICAgIC8vIFR1cm4gbW9iaWxlIG9uXG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogdHJ1ZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgVGFibGV0XG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAvLyB0YWJsZXQgYW5kIGhpZ2hlclxuICAgICAgLy8gZG8gb25jZVxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludFRhYmxldChwcmV2U3RhdGUpO1xuICAgICAgfVxuICAgICAgLy8gVHVybiBtb2JpbGUgb25cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiB0cnVlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBMYXB0b3BcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIGlmICggIXRoaXMuc3RhdGUubGFwdG9wICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRMYXB0b3AocHJldlN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogdHJ1ZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICBEZXNrdG9wXG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMuZGVza3RvcCApIHtcblxuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgIGlmICggIXRoaXMuc3RhdGUuZGVza3RvcCApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50RGVza3RvcChwcmV2U3RhdGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBuYXZMb2FkKCkge1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLm1vYmlsZSApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50TW9iaWxlKCk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IHRydWUsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMudGFibGV0ICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnRUYWJsZXQodGhpcy5zdGF0ZSk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IHRydWUsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50TGFwdG9wKHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogdHJ1ZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMuZGVza3RvcCApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50RGVza3RvcCh0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJOYXYgbG9hZGVkXCIpO1xuXG4gICAgdGhpcy5uYXZMb2FkKCk7XG4gICAgLy8gU2VhcmNoQm94LmluaXQoKTtcblxuICAgIC8qKioqKioqKioqKioqKioqXG4gICAgIE5BViBSRVNJWkUgRVZFTlRcbiAgICAgKioqKioqKioqKioqKioqL1xuXG4gICAgd2luZG93Lm9ucmVzaXplID0gKCBldmVudCApID0+IHtcbiAgICAgICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgICAgPyBzZXRUaW1lb3V0KHRoaXMubmF2UmVzaXplLmJpbmQodGhpcyksIDMwMClcbiAgICAgICAgOiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubmF2UmVzaXplLmJpbmQodGhpcykpO1xuICAgIH07XG5cblxuICB9XG59XG5cbmxldCBOYXYgPSBuZXcgTmF2Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IE5hdjsiLCJjb25zdCAkID0galF1ZXJ5O1xuZGVjbGFyZSB2YXIgSXNvdG9wZTogYW55O1xuXG5jbGFzcyBHYWxsZXJ5Q29tcG9uZW50IHtcblxuICBncmlkSWQ6IHN0cmluZztcbiAgZ2FsbGVyeV9ncmlkOiBudW1iZXI7XG4gIGdhbGxlcnlfd3JhcHBlcl93aWR0aDogbnVtYmVyO1xuICAkZnVsbEdyaWQ6IEpRdWVyeTtcbiAgJGdhbGxlcnlDb250YWluZXI6IEpRdWVyeTtcbiAgJGdyaWQ6IGFueTtcbiAgY3VycmVudEhlaWdodDogc3RyaW5nO1xuICBjdXJyZW50SGVpZ2h0UFg6IG51bWJlcjtcbiAgcmVJc29UaW1lT3V0OiBudW1iZXI7XG4gIGlzQ29udGFpbmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ3JpZElkID0gJChcIi5pbm5lci1jb250ZW50LW1vZHVsZVwiKS5jaGlsZHJlbihcImRpdlwiKS5hdHRyKFwiaWRcIik7XG4gICAgdGhpcy4kZnVsbEdyaWQgPSAkKFwiI1wiICsgdGhpcy5ncmlkSWQpO1xuICAgIHRoaXMuJGdhbGxlcnlDb250YWluZXIgPSAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpO1xuICB9XG5cbiAgc2V0dXBJc290b3BlKCkge1xuICAgIC8vIGluaXQgaXNvdG9wZVxuICAgIHRoaXMuJGdyaWQgPSB0aGlzLiRmdWxsR3JpZC5pc290b3BlKHtcbiAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgIGl0ZW1TZWxlY3RvcjogXCIuZ2FsbGVyeS1pdGVtXCIsXG4gICAgICBpc0luaXRMYXlvdXQ6IGZhbHNlLFxuICAgICAgbWFzb25yeToge1xuICAgICAgICBcImNvbHVtbldpZHRoXCI6IFwiLmdyaWQtc2l6ZXJcIlxuICAgICAgfSxcbiAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogXCIuM3NcIlxuICAgIH0pO1xuICB9XG5cbiAgZ2FsbGVyeUlzb3RvcGVXcmFwcGVyKCkge1xuICAgIGxldCB3aW5kb3dXaWR0aFJlZiA9ICQod2luZG93KS5pbm5lcldpZHRoKCk7IC8vIGZvciBzY3JvbGwgYmFyIGZpeCBjdXJyZW50bHlcblxuICAgIC8vIElzIGNvbnRhaW5lciBvciBmdWxsIHdpZHRoP1xuICAgIGlmICggdGhpcy4kZ2FsbGVyeUNvbnRhaW5lci5oYXNDbGFzcyhcImNvbnRhaW5lclwiKSApIHtcbiAgICAgIHRoaXMuaXNDb250YWluZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vXG4gICAgaWYgKCB3aW5kb3dXaWR0aFJlZiA+IDE2MDAgJiYgdGhpcy5pc0NvbnRhaW5lZCA9PT0gZmFsc2UgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImdyaWQgNVwiKTtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gNTtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSA2MDAgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDE7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gOTkxICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAyO1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDExOTkgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImdyaWQgM1wiKTtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJncmlkIDRcIik7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDQ7XG4gICAgfVxuXG4gICAgaWYgKCAkKFwiLmdhbGxlcnktMy1ncmlkXCIpLmxlbmd0aCA+IDAgJiYgd2luZG93V2lkdGhSZWYgPiAxMjQ4ICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAzO1xuICAgIH1cblxuICAgIGlmICggJChcIi5nYWxsZXJ5LTQtZ3JpZFwiKS5sZW5ndGggPiAwICYmIHdpbmRvd1dpZHRoUmVmID4gMTU4NCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gNDtcbiAgICB9XG5cbiAgICB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCA9ICQoXCIuZ2FsbGVyeS1jb250YWluZXJcIikud2lkdGgoKTtcblxuICAgIGlmICggdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggJSB0aGlzLmdhbGxlcnlfZ3JpZCA+IDAgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCA9IHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICsgKCB0aGlzLmdhbGxlcnlfZ3JpZCAtIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICUgdGhpcy5nYWxsZXJ5X2dyaWQpO1xuICAgIH1cbiAgICAkKFwiLmdhbGxlcnktaXNvdG9wZVwiKS5jc3MoXCJ3aWR0aFwiLCB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCk7XG5cbiAgICByZXR1cm4gdGhpcy5nYWxsZXJ5X2dyaWQ7XG4gIH1cblxuICByZWxvYWRJc290b3AoKSB7XG4gICAgdGhpcy4kZ3JpZC5pc290b3BlKCk7XG4gICAgdGhpcy5zZXRNaW5IZWlnaHQoKTtcbiAgfVxuXG4gIHNldE1pbkhlaWdodCgpIHtcblxuICAgIC8vIFNldCBtaW4gaGVpZ2h0IGRlcGVuZGluZyBvbmUgd2hhdCBjb250ZW50IHdhcyBmaWx0ZXJlZFxuICAgIHRoaXMuY3VycmVudEhlaWdodCA9ICQoXCIuZ2FsbGVyeS1pdGVtLndpZHRoMVwiKS5jc3MoXCJwYWRkaW5nLWJvdHRvbVwiKTtcbiAgICBsZXQgaGVpZ2h0U3RyID0gdGhpcy5jdXJyZW50SGVpZ2h0LnRvU3RyaW5nKCk7XG4gICAgdGhpcy5jdXJyZW50SGVpZ2h0UFggPSB0aGlzLnB4Q29udmVydChoZWlnaHRTdHIpO1xuXG4gICAgaWYgKCB0aGlzLmN1cnJlbnRIZWlnaHRQWCAhPT0gMCApIHtcblxuICAgICAgJChcIi5nYWxsZXJ5LWlzb3RvcGVcIikuY3NzKFwibWluLWhlaWdodFwiLCBNYXRoLnJvdW5kKHRoaXMuY3VycmVudEhlaWdodFBYKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudEhlaWdodFBYID0gJChcIi5nYWxsZXJ5LWl0ZW0ud2lkdGgxXCIpLmhlaWdodCgpO1xuXG4gICAgICAkKFwiLmdhbGxlcnktaXNvdG9wZVwiKS5jc3MoXCJtaW4taGVpZ2h0XCIsIE1hdGgucm91bmQodGhpcy5jdXJyZW50SGVpZ2h0UFgpKTtcbiAgICB9XG4gIH1cblxuICBweENvbnZlcnQoIG9iamVjdEhlaWdodDogc3RyaW5nICkge1xuICAgIHJldHVybiBwYXJzZUludChvYmplY3RIZWlnaHQuc2xpY2UoMCwgLTIpKTtcbiAgfVxuXG4gIGFkZEltYWdlVHJhbnNpdGlvbigpIHtcbiAgICAvLyBhZGQgdHJhbnNpdGlvbiBmb3IgaW50cm8gYW5pbWF0aW9uXG4gICAgJChcIi5nYWxsZXJ5LWl0ZW1cIikuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIjYwMG1zXCIpO1xuICB9XG5cbiAgbG9hZEltYWdlc0luKCkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZShcIm9uY2VcIiwgXCJhcnJhbmdlQ29tcGxldGVcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBmYWRlIGluXG4gICAgICAkKFwiLmdhbGxlcnktaXRlbVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgLy8gcmVtb3ZlIGFuaW1hdGlvbiBmb3Igc21vb3RoIGZpbHRlcmluZ1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCIuZ2FsbGVyeS1pdGVtXCIpLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIiwgXCIwbXNcIik7XG4gICAgICB9LCA1MDApO1xuXG4gICAgfSk7XG4gIH1cblxuICBvblJlc2l6ZSgpIHtcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlSXNvVGltZU91dCk7XG5cbiAgICAvLyBnYWxsZXJ5IGlzb3RvcGVcbiAgICBpZiAoICQoXCIuZ2FsbGVyeS1jb250YWluZXJcIikubGVuZ3RoID4gMCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeUlzb3RvcGVXcmFwcGVyKCk7XG5cbiAgICAgIC8vIG9uIHJlc2l6ZSBjb21wbGV0ZSwgcmVhZGp1c3QgZ3JpZFxuICAgICAgdGhpcy5yZUlzb1RpbWVPdXQgPSBzZXRUaW1lb3V0KHRoaXMucmVsb2FkSXNvdG9wLmJpbmQodGhpcyksIDUwMCk7XG4gICAgfVxuICB9XG5cbiAgb25GaWx0ZXJDbGljayggZWwsIGVsMiApIHtcbiAgICBsZXQgJHRoaXMgPSAkKGVsMi50b0VsZW1lbnQpO1xuXG4gICAgJHRoaXMucGFyZW50KCkuY2hpbGRyZW4oXCJsaVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICB9KTtcblxuICAgICR0aGlzLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICBsZXQgZmlsdGVyVmFsdWUgPSAkdGhpcy5hdHRyKFwiZGF0YS1maWx0ZXJcIik7XG5cbiAgICB0aGlzLnJlRmlsdGVyKGZpbHRlclZhbHVlKTtcbiAgfVxuXG4gIHJlRmlsdGVyKCBpdGVtICkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZSh7XG4gICAgICBmaWx0ZXI6IGl0ZW1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIEdldCBncmlkIHRvIGFzc2lnbiBkeW5hbWljYWxseVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJJc290b3BlIEluaXRcIik7XG5cbiAgICAvLyBBZGQgdHJhbnNpdGlvbiB0byBhbmltYXRlIGltYWdlIGluIGdyYWNlZnVsbHlcbiAgICB0aGlzLmFkZEltYWdlVHJhbnNpdGlvbigpO1xuXG4gICAgLy8gU2V0dXAgSXNvdG9wZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICB0aGlzLnNldHVwSXNvdG9wZSgpO1xuXG4gICAgLy8gQ3JlYXRlIHBlcmZlY3QgZ3JpZFxuICAgIHRoaXMuZ2FsbGVyeUlzb3RvcGVXcmFwcGVyKCk7XG5cbiAgICAvLyBkZWxheSBpc290b3BlIGluaXQgdXNpbmcgaGVscGVyIGZ1bmN0aW9uIHRoYXQgZmlyZXMgb24gcmVzaXplXG4gICAgc2V0VGltZW91dCh0aGlzLnJlbG9hZElzb3RvcC5iaW5kKHRoaXMpLCAxMDAwKTtcblxuICAgIC8vIEFuaW1hdGUgSW1hZ2VzIGluIG9uTG9hZFxuICAgIHRoaXMubG9hZEltYWdlc0luKCk7XG5cbiAgICAvLyBBZGQgZmlsdGVyIG9uIENsaWNrXG4gICAgbGV0ICR0aGlzID0gdGhpcztcbiAgICAkKFwiLmZpbHRlci1ncm91cFwiKS5vbihcImNsaWNrXCIsIFwibGlcIiwgdGhpcy5vbkZpbHRlckNsaWNrLmJpbmQodGhpcywgJHRoaXMpKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxubGV0IElzb3RvcGVHYWxsZXJ5ID0gbmV3IEdhbGxlcnlDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSXNvdG9wZUdhbGxlcnk7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTbGlkZXJDb21wb25lbnQge1xuICBnYWxsZXJ5OiBKUXVlcnk7XG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICBjbG9zZUJ0bjogSlF1ZXJ5O1xuICBuZXh0QnRuOiBKUXVlcnk7XG4gIHByZXZCdG46IEpRdWVyeTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgY3VycmVudFNsaWRlOiBudW1iZXI7XG4gIHRvdGFsU2xpZGU6IG51bWJlcjtcbiAgY291bnRUb3RhbDogSlF1ZXJ5O1xuICBjdXJyZW50Q291bnQ6IEpRdWVyeTtcbiAgc2xpZGVyT3BlbjogYm9vbGVhbjtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvciggZWwgKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKGVsKTtcbiAgICB0aGlzLmdhbGxlcnkgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmhlYWRlci1zbGlkZXItZ2FsbGVyeVwiKTtcbiAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5oZWFkZXItc2xpZGVyLWNsb3NlXCIpO1xuICAgIHRoaXMubmV4dEJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyLW5hdmlnYXRpb24tbmV4dFwiKTtcbiAgICB0aGlzLnByZXZCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNsaWRlci1uYXZpZ2F0aW9uLXByZXZcIik7XG4gICAgdGhpcy5jb3VudFRvdGFsID0gdGhpcy5jb250YWluZXIuZmluZChcIi50b3RhbFwiKTtcbiAgICB0aGlzLmN1cnJlbnRDb3VudCA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuY3VycmVudFwiKTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLmN1cnJlbnRTbGlkZSA9IHRoaXMuaW5kZXggKyAxO1xuICAgIHRoaXMuc2xpZGVyT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmdhbGxlcnkuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldFRvdGFsU2xpZGVzKCk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gdGhpcy5nYWxsZXJ5LmNoaWxkcmVuKFwibGlcIikubGVuZ3RoO1xuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNsaWRlO1xuICB9XG5cbiAgdXBkYXRlQ3VycmVudFNsaWRlKCBldmVudCApIHtcblxuICAgIGlmICggZXZlbnQgPT09IFwicmlnaHRcIiApIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZXgtLTtcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlLS07XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVOYXYoIGluZGV4OiBudW1iZXIsIHNlbGVjdGVkOiBKUXVlcnkgKSB7XG5cbiAgICAvLyB1cGRhdGUgbnVtYmVycyBvbiBzY3JlZW5cbiAgICB0aGlzLmN1cnJlbnRDb3VudC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICAgIC8vIEVuYWJsZS9EaXNhYmxlIGFycm93IGJ0bnNcbiAgICB0aGlzLnByZXZCdG4ucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmZpcnN0LWNoaWxkXCIpKTtcbiAgICB0aGlzLm5leHRCdG4ucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmxhc3QtY2hpbGRcIikpO1xuICB9XG5cbiAgdXBkYXRlU2xpZGUoIGRpcmVjdGlvbiApIHtcbiAgICBcbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCk7XG5cbiAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuICAgICAgLy8gcmVtb3ZlIGN1cnJlbnRseSBzZWxlY3RlZCBjbGFzcywgdGhlbiBtb3ZlIGxlZnRcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIGN1cnJlbnRTbGlkZS5uZXh0KCkuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVtb3ZlIGN1cnJlbnRseSBzZWxlY3RlZCBjbGFzcywgdGhlbiBtb3ZlIGxlZnRcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgY3VycmVudFNsaWRlLnByZXYoKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgaW5kZXhcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRTbGlkZShkaXJlY3Rpb24pO1xuXG4gICAgLy8gdXBkYXRlIE5hdmlnYXRpb25cbiAgICB0aGlzLnVwZGF0ZU5hdih0aGlzLmluZGV4LCB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKSk7XG4gIH1cblxuICBhcnJvd0hhbmRsZXIoIGV2ZW50ICkge1xuXG4gICAgLy8gY2hlY2sgd2hpY2gga2V5IHdhcyBwcmVzc2VkIGFuZCBtYWtlIHN1cmUgdGhlIHNsaWRlIGlzbid0IHRoZSBiZWdpbm5pbmcgb3IgdGhlIGxhc3Qgb25lXG4gICAgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwicmlnaHRcIiAmJiB0aGlzLmN1cnJlbnRTbGlkZSAhPT0gdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuXG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCAmJiB0aGlzLnNsaWRlck9wZW4gKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPD0gVXRpbHMuYnBzLnRhYmxldCApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcImxlZnRcIiAmJiB0aGlzLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgJiYgdGhpcy5zbGlkZXJPcGVuICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPD0gVXRpbHMuYnBzLnRhYmxldCApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9wZW5TbGlkZXIoIGVsLCBldmVudCApIHtcbiAgICAvLyBlbCA9IHRoaXNcbiAgICAvLyBlbDIgaXMgZXZlbnRcbiAgICBpZiAoICF0aGlzLmNvbnRhaW5lci5oYXNDbGFzcyhcImlzLWFjdGl2ZVwiKSAmJiAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmlzKHRoaXMuZ2FsbGVyeSkgKSB7XG5cbiAgICAgIHRoaXMuc2xpZGVyT3BlbiA9IHRydWU7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyLmFkZENsYXNzKFwiaXMtYWN0aXZlXCIpLm9uZShcIndlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmRcIiwgKCkgPT4ge1xuICAgICAgICAkKFwiYm9keSxodG1sXCIpLmFuaW1hdGUoeyBcInNjcm9sbFRvcFwiOiB0aGlzLmNvbnRhaW5lci5vZmZzZXQoKS50b3AgfSwgMjAwKTtcblxuICAgICAgICAvLyBDbG9zZSBCdG4gYW5pbWF0ZSBpblxuICAgICAgICBsZXQgY2xvc2VCdG5BbmltYXRpb24gPSBUd2Vlbk1heC50byh0aGlzLmNsb3NlQnRuLCAuMywge1xuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICB4OiAtMzAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgICAgICBkZWxheTogLjNcbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlU2xpZGVyKCBlICkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImlzLWFjdGl2ZVwiKTtcblxuICAgIHRoaXMuc2xpZGVyT3BlbiA9IGZhbHNlO1xuXG4gICAgVHdlZW5MaXRlXG4gICAgICAudG8oJCh3aW5kb3cpLCAuNSxcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvOiB7IHk6IDAgfSwgZWFzZTogUG93ZXIyLmVhc2VPdXQsXG4gICAgICAgICAgZGVsYXk6IC41XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICBsZXQgY2xvc2VCdG5BbmltYXRpb24gPSBUd2Vlbk1heC50byh0aGlzLmNsb3NlQnRuLCAuMywge1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIHo6IC4wMDEsXG4gICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0LFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICBUd2Vlbk1heC50byh0aGlzLmNsb3NlQnRuLCAuMywge1xuICAgICAgICAgIHJpZ2h0OiA1MFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrU2l6ZSgpIHtcblxuICAgIC8vIE9uIHJlc2l6ZSBlbmQgLSBjaGVjayB0byBlbmFibGUgY2xpY2tzIGZvciBkZXNrdG9wIG9yIHJlbW92ZSB0aGVtXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuICAgIHRoaXMucmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gdGhpcztcbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgICB0aGlzLmdhbGxlcnkub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TbGlkZXIuYmluZCh0aGlzLCAkdGhpcykpO1xuICAgICAgICB0aGlzLmNsb3NlQnRuLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVNsaWRlci5iaW5kKHRoaXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeS5vZmYoKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5vZmYoKTtcbiAgICAgIH1cblxuICAgIH0sIDQwMCk7XG5cbiAgfVxuXG4gIGluaXQoKSB7XG5cbiAgICAvLyBDcmVhdGUgQmluZGluZyBFdmVudHNcbiAgICB0aGlzLmNoZWNrU2l6ZSgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG4gICAgLy8gTGVmdCBhbmQgcmlnaHQgZXZlbnRzXG4gICAgdGhpcy5uZXh0QnRuLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcInJpZ2h0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5wcmV2QnRuLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcImxlZnRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIC8vIEpxdWVyeSBrZXlzIHBsdWdpblxuICAgICQoZG9jdW1lbnQpXG4gICAgICAuYmluZChcImtleWRvd25cIiwgXCJsZWZ0XCIsIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpXG4gICAgICAuYmluZChcImtleWRvd25cIiwgXCJlc2NcIiwgdGhpcy5jbG9zZVNsaWRlci5iaW5kKHRoaXMpKVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwicmlnaHRcIiwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAvLyB1cGRhdGUgbmF2IG9uIGZpcnN0IGxvYWRcbiAgICB0aGlzLnVwZGF0ZU5hdih0aGlzLmluZGV4LCB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKSk7XG5cbiAgICAvLyBzZXQgdG90YWwgc2xpZGVzIG51bWJlclxuICAgIHRoaXMuY291bnRUb3RhbC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldFRvdGFsU2xpZGVzKCkpKTtcbiAgfVxufVxuXG4vLyBsb29wIHRocm91Z2ggZWFjaCBoZWFkZXIgc2xpZGVyIG9iamVjdCBvbiB0aGUgcGFnZVxuY2xhc3MgSGVhZGVyU2xpZGVyQ29tcG9uZW50IHtcblxuICBpdGVtSW5mb1dyYXBwZXI6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlciA9ICQoXCIuaGVhZGVyLXNsaWRlci1jb250YWluZXJcIik7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiSGVhZGVyIFNsaWRlciBpbml0XCIpO1xuXG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgLy8gUGFzcyBcInRoaXNcIiB0byBlYWNoIG5ldyBIZWFkZXIgc2xpZGVyIGNvbXBvbmVudFxuICAgICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXJDb21wb25lbnQoZWwpO1xuICAgICAgc2xpZGVyLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmxldCBIZWFkZXJTbGlkZXIgPSBuZXcgSGVhZGVyU2xpZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlclNsaWRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cblxuY2xhc3MgU3ZnSGVhZGVyQ29tcG9uZW50IHtcbiAgc3ZnOiBKUXVlcnk7XG4gIGhlaWdodDogbnVtYmVyO1xuICB3aW5kb3c6IEpRdWVyeTtcbiAgd2luV2lkdGg6IG51bWJlcjtcbiAgcHJvcG9ydGlvbjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3ZnID0gJChcIi5kaXZpZGVyLXN2Z1wiKTtcbiAgICB0aGlzLndpbmRvdyA9ICQod2luZG93KTtcbiAgICB0aGlzLnByb3BvcnRpb24gPSAxODtcbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2luV2lkdGggLyB0aGlzLnByb3BvcnRpb247XG4gIH1cblxuICBfc2V0V2luZG93V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCk7XG4gIH1cblxuICBfc2V0U3ZnSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IGhlaWdodCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCkgLyAxODtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICByZXNpemVTdmcoKSB7XG5cbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NldFN2Z0hlaWdodCgpO1xuXG4gICAgLy8gc2V0IHdpZHRoIG9mIGl0ZW1cbiAgICAvLyB0aGlzLnN2Zy5hdHRyKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG4gICAgdGhpcy5zdmcuY3NzKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG5cbiAgICAvLyBzZXQgaGVpZ2h0IHByb3BvcnRpb24gb2YgMjhcbiAgICB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN2Zy5oZWlnaHQodGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgYW5pbWF0ZUluKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQW5pbWF0ZSBJblwiKTtcblxuICAgIHRoaXMuc3ZnID0gJChcIi5kaXZpZGVyLXN2Z1wiKTtcbiAgICB0aGlzLnByb3BvcnRpb24gPSAxODtcbiAgICB0aGlzLndpbmRvdyA9ICQod2luZG93KTtcbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy53aW5kb3cud2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2luV2lkdGggLyB0aGlzLnByb3BvcnRpb247XG5cbiAgICAvLyBzZXQgd2lkdGggb2YgaXRlbVxuICAgIHRoaXMuc3ZnLmF0dHIoXCJ3aWR0aFwiLCB0aGlzLndpbldpZHRoKTtcblxuICAgIC8vIHNldCBoZWlnaHQgcHJvcG9ydGlvbiBvZiAyOFxuICAgIHRoaXMuc3ZnLmF0dHIoXCJoZWlnaHRcIiwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuc3ZnLmhlaWdodCh0aGlzLmhlaWdodCk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy5zdmcsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIGJvdHRvbTogXCItM3B4XCIsXG4gICAgfSk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiU3ZnIGhlYWRlciBsb2FkZWRcIik7XG5cbiAgICAvLyB0aGlzLnN2Zy5oZWlnaHQodGhpcy5fc2V0U3ZnSGVpZ2h0KCkpO1xuICAgIC8vIHRoaXMuc3ZnLmF0dHIoXCJoZWlnaHRcIiwgdGhpcy5fc2V0U3ZnSGVpZ2h0KCkpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuc3ZnLCAuMSwge1xuICAgICAgeTogXCIzXCIsXG4gICAgICB6OiBcIi4wMDFcIixcbiAgICAgIHdpZHRoOiB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLl9zZXRTdmdIZWlnaHQoKSxcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIlxuICAgIH0pO1xuXG5cblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZVN2Zy5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBTdmdIZWFkZXIgPSBuZXcgU3ZnSGVhZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN2Z0hlYWRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuLy8gVE9ETzogU2lkZWJhciBpbWFnZSBsb2FkaW5nXG5jbGFzcyBJbWFnZUxvYWRlckNvbXBvbmVudCB7XG4gIGFycjogc3RyaW5nW107XG4gIGJvZHk6IEpRdWVyeTtcbiAgY29udGVudDogSlF1ZXJ5O1xuICBoZXJvOiBKUXVlcnk7XG4gIGhhc0hlcm86IG51bWJlcjtcbiAgYmdJbWFnZTogSlF1ZXJ5O1xuICBoYXNCZ0ltYWdlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hcnIgPSBbXTtcbiAgICB0aGlzLmJvZHkgPSAkKFwiYm9keVwiKTtcbiAgICB0aGlzLmNvbnRlbnQgPSAkKFwiI2NvbnRlbnRcIik7XG4gICAgdGhpcy5oZXJvID0gJChcIi5oZXJvXCIpO1xuICAgIHRoaXMuaGFzSGVybyA9IHRoaXMuaGVyby5sZW5ndGg7XG4gICAgdGhpcy5iZ0ltYWdlID0gJChcIi5pbWctbG9hZGVyLWJnXCIpO1xuICAgIHRoaXMuaGFzQmdJbWFnZSA9IHRoaXMuYmdJbWFnZS5sZW5ndGg7XG4gIH1cblxuICBhbmltYXRlQmxvZ1ByaW1hcnkoKTogdm9pZCB7XG4gICAgbGV0IGJsb2dQcmltYXJ5ID0gJChcIi5wcmltYXJ5XCIpO1xuICAgIGxldCBibG9nQmdJbWFnZSA9IGJsb2dQcmltYXJ5LmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIik7XG5cbiAgICBpZiAoIGJsb2dCZ0ltYWdlICE9PSBcIm5vbmVcIiApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIFR3ZWVuTGl0ZVxuICAgICAgICAgIC50byhibG9nUHJpbWFyeSwgLjMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9LCAzMDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZVxuICAvLyBhbmltYXRlSGVyb0hlYWRlcigpOiB2b2lkIHtcbiAgLy8gICBsZXQgYiA9IHRoaXMuaGVyby5maW5kKFwiLmhlcm8tYmFja2dyb3VuZFwiKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuICAvL1xuICAvLyAgIGlmICggYiAhPT0gXCJub25lXCIgKSB7XG4gIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgLy9cbiAgLy8gICAgICAgdGhpcy5oZXJvLmFkZENsYXNzKFwibG9hZGVkXCIpO1xuICAvL1xuICAvLyAgICAgICBUd2VlbkxpdGVcbiAgLy8gICAgICAgICAudG8odGhpcy5oZXJvLCAuNCxcbiAgLy8gICAgICAgICAgIHtcbiAgLy8gICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICApO1xuICAvLyAgICAgfSwgMzAwKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvL1xuICAvLyAgICAgdGhpcy5oZXJvLmFkZENsYXNzKFwibG9hZGVkXCIpO1xuICAvL1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGFuaW1hdGVCbG9nQXJ0aWNsZXMoKTogdm9pZCB7XG4gICAgbGV0IGFuaW1hdGUgPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgYW5pbWF0ZS50byh0aGlzLmFyclsgaSBdLCAwLjEsIHsgb3BhY2l0eTogXCIxXCIsIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCIgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJlbG9hZEltYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmFyciA9IFtdO1xuXG4gICAgdGhpcy5jb250ZW50LmltYWdlc0xvYWRlZCh7IGJhY2tncm91bmQ6IHRydWUgfSwgKCkgPT4ge1xuXG4gICAgICAgIC8vIEJsb2cgcHJpbWFyeSBhcnRpY2xlXG4gICAgICAgIHRoaXMuYm9keS5oYXNDbGFzcyhcImJsb2dcIikgPyB0aGlzLmFuaW1hdGVCbG9nUHJpbWFyeSgpIDogXCJcIjtcblxuICAgICAgICAvLyBIZXJvIGhlYWRlciBpbnRyb1xuICAgICAgICAvLyB0aGlzLmhhc0hlcm8gPiAwID8gdGhpcy5hbmltYXRlSGVyb0hlYWRlcigpIDogXCJcIjtcbiAgICAgICAgdGhpcy5oYXNCZ0ltYWdlID4gMCA/IHRoaXMuYmdJbWFnZS5hZGRDbGFzcyhcImxvYWRlZFwiKSA6IFwiXCI7XG5cbiAgICAgIH0pXG4gICAgICAuYWx3YXlzKGZ1bmN0aW9uICggaW5zdGFuY2UgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBsb2FkZWRcIik7XG4gICAgICB9KVxuICAgICAgLmRvbmUoKCBpbnN0YW5jZSApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIHN1Y2Nlc3NmdWxseSBsb2FkZWRcIik7XG5cbiAgICAgICAgLy8gQW5pbWF0aW9uIGZvciBCbG9nIGluZGV4IGhvbWVwYWdlXG4gICAgICAgIHRoaXMuYW5pbWF0ZUJsb2dBcnRpY2xlcygpO1xuICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKFwiaW1nTG9hZGVkXCIpO1xuICAgICAgICBcbiAgICAgICAgLy8gRXhhbXBsZSBvbiBob3cgdG8gdHJpZ2dlciBldmVudHMgZWxzZXdoZXJlXG4gICAgICAgIC8vICQoZG9jdW1lbnQpLm9uKFwiaW1nTG9hZGVkXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgIH0pXG4gICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBsb2FkZWQsIGF0IGxlYXN0IG9uZSBpcyBicm9rZW5cIik7XG4gICAgICB9KVxuICAgICAgLnByb2dyZXNzKCggaW5zdGFuY2UsIGltYWdlICkgPT4ge1xuICAgICAgICBsZXQgcmVzdWx0ID0gaW1hZ2UuaXNMb2FkZWQgPyBcImxvYWRlZFwiIDogXCJicm9rZW5cIjtcblxuICAgICAgICBpZiAoIHJlc3VsdCApIHtcbiAgICAgICAgICB0aGlzLmFyci5wdXNoKGltYWdlLmltZyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJpbWFnZSBpcyBcIiArIHJlc3VsdCArIFwiIGZvciBcIiArIGltYWdlLmltZy5zcmMpO1xuICAgICAgfSk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuXG4gICAgY29uc29sZS5sb2coXCJJbWFnZSBQcmVsb2FkZXIgTW9kdWxlXCIpO1xuXG4gICAgdGhpcy5wcmVsb2FkSW1hZ2VzKCk7XG4gIH1cbn1cblxubGV0IEltYWdlTG9hZGVyID0gbmV3IEltYWdlTG9hZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlTG9hZGVyOyIsImRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG5jb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5jbGFzcyBBbmltYXRpb25Db21wb25lbnQge1xuXG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICBpdGVtOiBKUXVlcnk7XG4gIG1TY2VuZTogSlF1ZXJ5O1xuICBzZXJ2aWNlU2lkZUJhcjogSlF1ZXJ5O1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKFwiLnByb2Nlc3MtY29udGFpbmVyXCIpO1xuICAgIHRoaXMuaXRlbSA9ICQoXCIucHJvY2Vzcy1pdGVtLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLm1TY2VuZSA9ICQoXCIubS1zY2VuZVwiKTtcbiAgICB0aGlzLnNlcnZpY2VTaWRlQmFyID0gJChcIi5zZXJ2aWNlLXNpZGViYXItd3JhcHBlclwiKTtcbiAgfVxuXG4gIGRlc2Nfb19hbmltYXRlKCkge1xuICAgIGlmICggJChcIi5kZXNjLW8tYW5pbWF0ZVwiKS5sZW5ndGggPiAwICkge1xuICAgICAgbGV0IHdpcGVBbmltYXRpb24gPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIHdpcGVBbmltYXRpb24uYWRkKFtcbiAgICAgICAgVHdlZW5NYXguZnJvbVRvKCQoXCIuZGVzYy1vLWltYWdlLTFcIiksIDEsIHsgeVBlcmNlbnQ6IDAgfSwgeyB5UGVyY2VudDogLTIwLCBlYXNlOiBQb3dlcjAuZWFzZUluT3V0IH0pXG4gICAgICBdKTtcblxuICAgICAgbGV0IHdpcGVBbmltYXRpb24yID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICB3aXBlQW5pbWF0aW9uMi5hZGQoW1xuICAgICAgICBUd2Vlbk1heC5mcm9tVG8oJChcIi5kZXNjLW8taW1hZ2UtMlwiKSwgMSwgeyB5UGVyY2VudDogMCwgfSwgeyB5UGVyY2VudDogLTEwNSwgZWFzZTogUG93ZXIwLmVhc2VJbk91dCB9KVxuICAgICAgXSk7XG5cbiAgICAgIGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuICAgICAgbGV0IHNjZW5lID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKFxuICAgICAgICB7XG4gICAgICAgICAgdHJpZ2dlckVsZW1lbnQ6IFwiLmRlc2Mtby1hbmltYXRlXCIsXG4gICAgICAgICAgZHVyYXRpb246ICQoXCIuZGVzYy1vLWFuaW1hdGVcIikuaGVpZ2h0KCksXG4gICAgICAgICAgb2Zmc2V0OiAtMTAwXG4gICAgICAgIH0pXG4gICAgICAvLyAuc2V0UGluKFwiLmRlc2Mtby1pbWFnZS0xXCIpXG4gICAgICAgIC5zZXRUd2Vlbih3aXBlQW5pbWF0aW9uKVxuICAgICAgICAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMSAoZHVyYXRpb246IEVsKVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAgIC5hZGRUbyhjb250cm9sbGVyKTtcblxuICAgICAgbGV0IHNjZW5lMiA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgICAge1xuICAgICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5kZXNjLW8tYW5pbWF0ZVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAkKFwiLmRlc2Mtby1hbmltYXRlXCIpLmhlaWdodCgpICsgMTAwLFxuICAgICAgICB9KVxuICAgICAgLy8gLnNldFBpbihcIi5kZXNjLW8taW1hZ2UtMVwiKVxuICAgICAgICAuc2V0VHdlZW4od2lwZUFuaW1hdGlvbjIpXG4gICAgICAgIC5hZGRJbmRpY2F0b3JzKHsgbmFtZTogXCIyIChkdXJhdGlvbjogRWwpXCIgfSkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcbiAgICAgICAgLmFkZFRvKGNvbnRyb2xsZXIpO1xuICAgIH1cbiAgfVxuXG4gIHByb2Nlc3NBbmltYXRlSW4oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgIGxldCBpdGVtID0gdGhpcy5pdGVtO1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcbiAgICBsZXQgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICB7XG4gICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5wcm9jZXNzLWNvbnRhaW5lclwiLFxuICAgICAgICBkdXJhdGlvbjogY29udGFpbmVyLmhlaWdodCgpLFxuICAgICAgICAvLyBvZmZzZXQ6IHRoaXMuYXNpZGVPZmZzZXQsXG4gICAgICB9KVxuICAgICAgLm9uKFwiZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdGVtLmZpbmQoXCIucHJvY2Vzcy1pdGVtLWlubmVyXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICAgIGNvbnRhaW5lci5maW5kKFwiaW1nXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICB9KVxuICAgICAgLy8gLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBvZmZzZXQ/KVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAuYWRkVG8oY29udHJvbGxlcik7XG4gIH1cblxuICBhbmltYXRlV2luZG93VG9wKCkge1xuICAgIGNvbnNvbGUubG9nKFwiYW5pbWF0ZSBUb3BcIik7XG4gICAgVHdlZW5MaXRlXG4gICAgICAudG8oJCh3aW5kb3cpLCAuMyxcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvOiB7XG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgYW5pbWF0ZVNlcnZpY2VTaWRlYmFyT3V0KCkge1xuICAgIFR3ZWVuTGl0ZS50byh0aGlzLnNlcnZpY2VTaWRlQmFyLCAuMywge1xuICAgICAgeDogXCItMTAwXCIsXG4gICAgICB6OiBcIi4wMDFcIixcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCIsXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIC8vIHJlbW92ZSBzaWRlYmFyIGh0bWwgZWxlbWVudCBzbyBpdCBkb2VzbnQgc2hvdyB1cCBhZ2FpbiB3aGVuIHNjcm9sbGluZyB1cFxuICAgICAgICB0aGlzLnNlcnZpY2VTaWRlQmFyLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbG9hZFVybCggdXJsICkge1xuICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gIH1cblxuICBtYWluQ29udGVudEFuaW1hdGlvbk91dCggY2FsbGJhY2sgKSB7XG5cbiAgICAvLyBMb2FkIGluIGFuaW1hdGlvbnMgaGVyZVxuICAgIHRoaXMuYW5pbWF0ZVNlcnZpY2VTaWRlYmFyT3V0KCk7XG5cblxuICAgIHRoaXMubVNjZW5lLmFkZENsYXNzKFwiaXMtZXhpdGluZ1wiKVxuICAgICAgLy8gSWYgaGFzIHdlYmtpdEFuaW1hdGlvbkVuZCAtIGl0IGdldHMgY2FsbGVkIHR3aWNlXG4gICAgICAub25lKFwib2FuaW1hdGlvbmVuZCBtc0FuaW1hdGlvbkVuZCBhbmltYXRpb25lbmRcIiwgKCkgPT4ge1xuXG4gICAgICAgIC8vIExvYWQgaW4gYW5pbWF0aW9ucyBoZXJlIHRoYXQgbmVlZCB0byBvY2N1ciBhZnRlciBtYWluIG9uZXNcbiAgICAgICAgdGhpcy5hbmltYXRlV2luZG93VG9wKCk7XG5cbiAgICAgIH0pO1xuXG4gICAgaWYgKCB0eXBlb2YoY2FsbGJhY2spID09PSBcImZ1bmN0aW9uXCIgKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH1cblxuICB9XG5cbiAgY2hlY2tVcmwoIHVybCApOiBib29sZWFuIHtcbiAgICBpZiAoIHVybC5tYXRjaCgvXiMvKSAhPT0gbnVsbCB8fCB1cmwgPT09IFwiXCIgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdsb2JhbENsaWNrQ2hlY2soIGV2ZW50PyApIHtcblxuICAgIC8vIEdldCB1cmwgZnJvbSB0aGUgYSB0YWdcbiAgICBsZXQgbmV3VXJsID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwiaHJlZlwiKTtcbiAgICBsZXQgaGFzQ2hpbGRyZW4gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnBhcmVudChcImxpXCIpLmhhc0NsYXNzKFwibWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKTtcblxuICAgIC8qXG4gICAgICogRmlyc3QgVmFsaWRhdGlvbjogSXMgdGhlIHVybCB2YWxpZFxuICAgICAqL1xuICAgIGlmICggIXRoaXMuY2hlY2tVcmwobmV3VXJsKSApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBJZiBmaXJzdCB2YWxpZGF0aW9uIGZhaWxzLCB0aGUgdXJsIGlzIHJlYWwgYW5kIGNvbnRpbnVlIHZhbGlkYXRpbmdcbiAgICAgKi9cbiAgICAvKlxuICAgICAqIENoZWNrIGlmIGl0cyBob3Jpem9udGFsIHRhYmxldFxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+IFV0aWxzLmJwcy50YWJsZXQgJiZcbiAgICAgIHRoaXMuY2hlY2tVcmwobmV3VXJsKSAmJlxuICAgICAgVXRpbHMuYnJvd3NlciA9PT0gXCJpcGFkXCIgJiYgaGFzQ2hpbGRyZW4gKSB7XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnVGFibGV0IE5hdiBjbGljaycpO1xuICAgICAgcmV0dXJuO1xuXG4gICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA+IFV0aWxzLmJwcy50YWJsZXQgJiYgdGhpcy5jaGVja1VybChuZXdVcmwpICkge1xuXG4gICAgICAvKlxuICAgICAgICogQ2hlY2sgaWYgaXRzIGxhcmdlciB0aGFuIHRhYmxldCBidXQgbm90IGFuIGlwYWRcbiAgICAgICAqL1xuXG4gICAgICAvLyBjb25zb2xlLmxvZyhcImxhcHRvcCBvciBsYXJnZXJcIik7XG4gICAgICB0aGlzLm1haW5Db250ZW50QW5pbWF0aW9uT3V0KCAoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZFVybChuZXdVcmwpO1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2UgaWYgKCB0aGlzLmNoZWNrVXJsKG5ld1VybCkgJiYgaGFzQ2hpbGRyZW4gKSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBDaGVjayBpZiBpdHMgbW9iaWxlIG5hdiBtZW51IHRoYXQgaGFzIGNoaWxkcmVuXG4gICAgICAgKi9cblxuICAgICAgLy8gY29uc29sZS5sb2coXCJtb2JpbGUgbWVudSBpcyBhY3RpdmUgYW5kIHBhcmVudCBjbGlja2VkXCIpO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBQYXNzZWQgdGhlIGNoZWNrcyBMb2FkIGl0IVxuICAgICAgICovXG5cbiAgICAgIHRoaXMubG9hZFVybChuZXdVcmwpO1xuICAgIH1cblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnByb2Nlc3NBbmltYXRlSW4oKTtcbiAgICB0aGlzLmRlc2Nfb19hbmltYXRlKCk7XG5cbiAgICAvLyBDbGljayBldmVudCB0byBjb250cm9sIHdpbmRvdyBMb2FkaW5nXG4gICAgJChcImFcIikub24oXCJjbGlja1wiLCAoIGUgKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmdsb2JhbENsaWNrQ2hlY2soZSk7XG4gICAgfSk7XG5cbiAgICAvLyBDdXN0b20gZXZlbnQgZXhhbXBsZVxuICAgIC8vICQoZG9jdW1lbnQpLm9uKFwidGVzdFwiLCB7fSwgKCBldmVudCwgYXJnMSwgYXJnMiApID0+IHtcbiAgICAvL1xuICAgIC8vICAgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCApIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhhcmcxKTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJnMik7XG4gICAgLy8gICB9XG4gICAgLy9cbiAgICAvLyB9KS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBBbmltYXRpb25Db250cm9sbGVyID0gbmV3IEFuaW1hdGlvbkNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBBbmltYXRpb25Db250cm9sbGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgUXVvdGVDb21wb25lbnQge1xuXG4gIHNlbGVjdEJ0bjogSlF1ZXJ5O1xuICBzd2l0Y2g6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNlbGVjdEJ0biA9ICQoXCIucXVvdGVfX3NlbGVjdC0tYnRuXCIpO1xuICAgIHRoaXMuc3dpdGNoID0gJChcIi5xdW90ZV9fc3dpdGNoXCIpO1xuICB9XG5cbiAgc2V0V2lkdGgoIGxhYmVsOiBKUXVlcnkgKSB7XG5cbiAgICBsZXQgbGFiZWxXaWR0aCA9IGxhYmVsLm91dGVyV2lkdGgoKTtcbiAgICB0aGlzLnN3aXRjaC5jc3MoXCJ3aWR0aFwiLCBsYWJlbFdpZHRoKTtcblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlF1b3RlIEJ1aWxkZXJcIik7XG5cbiAgICBsZXQgaW5wdXRzID0gdGhpcy5zZWxlY3RCdG4uZmluZChcIi5xdW90ZV9faW5wdXRcIik7XG5cbiAgICBpbnB1dHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gJChlbCksXG4gICAgICAgIG5leHRMYWJlbCA9ICR0aGlzLm5leHQoKTtcblxuICAgICAgLy8gZmluZCBTZWxlY3RlZCwgZ2V0IHdpZHRoIG9mIGxhYmVsLCBzZXQgd2lkdGggb2Ygc3BhblxuICAgICAgaWYgKCBuZXh0TGFiZWwuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSApIHtcblxuICAgICAgICB0aGlzLnNldFdpZHRoKG5leHRMYWJlbCk7XG5cbiAgICAgIH1cblxuICAgICAgLy8gQWRkIG9uIGNoYW5nZSBmdW5jdGlvbiBoZXJlXG4gICAgICAkdGhpcy5jaGFuZ2UoKCBlICkgPT4ge1xuXG4gICAgICAgIGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KSxcbiAgICAgICAgICBmaWVsZHNldCA9ICR0aGlzLnBhcmVudChcIi5maWVsZHNldFwiKSxcbiAgICAgICAgICBwcmV2SXRlbSA9IGZpZWxkc2V0LmZpbmQoXCIuc2VsZWN0ZWRcIiksXG4gICAgICAgICAgcHJldldpZHRoID0gcHJldkl0ZW0ub3V0ZXJXaWR0aCgpIC0gMSxcbiAgICAgICAgICBpbnB1dElkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuXG4gICAgICAgIGZpZWxkc2V0LmZpbmQoXCJsYWJlbFwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIGxldCBzZWxlY3RlZExhYmVsID0gZmllbGRzZXQuZmluZChcImxhYmVsW2Zvcj1cIiArIGlucHV0SWQgKyBcIl1cIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICAvLyBpZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGlucHV0IG1hdGNoZXMgdGhlIDJuZCBpdGVtIC0gdGhlbiBtb3ZlIHN3aXRjaCByaWdodCwgb3RoZXJ3aXNlIGJhY2sgdG8gcG9zaXRpb24gMVxuICAgICAgICBpZiAoIGlucHV0SWQgPT09ICQoaW5wdXRzWyAxIF0pLmF0dHIoXCJpZFwiKSApIHtcbiAgICAgICAgICB0aGlzLnN3aXRjaC5jc3Moe1xuICAgICAgICAgICAgXCJ3ZWJraXRUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIixcbiAgICAgICAgICAgIFwiTW96VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHByZXZXaWR0aCArIFwicHgpXCIsXG4gICAgICAgICAgICBcIm1zVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHByZXZXaWR0aCArIFwicHgpXCIsXG4gICAgICAgICAgICBcIk9UcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIixcbiAgICAgICAgICAgIFwidHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHByZXZXaWR0aCArIFwicHgpXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN3aXRjaC5jc3Moe1xuICAgICAgICAgICAgXCJ3ZWJraXRUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgICAgIFwiTW96VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCIsXG4gICAgICAgICAgICBcIm1zVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCIsXG4gICAgICAgICAgICBcIk9UcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgICAgIFwidHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0V2lkdGgoc2VsZWN0ZWRMYWJlbCk7XG5cbiAgICAgIH0pO1xuICAgIH0pO1xuXG5cbiAgfVxufVxuXG5jb25zdCBRdW90ZUJ1aWxkZXIgPSBuZXcgUXVvdGVDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgUXVvdGVCdWlsZGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuaW50ZXJmYWNlIFNob3djYXNlU2xpZGVySW50ZXJmYWNlIHtcbiAgZGVza3RvcFBvczogbnVtYmVyO1xuICB0YWJsZXRQb3M6IG51bWJlcjtcbiAgaW5kZXhTZWxlY3RlZDogbnVtYmVyO1xuICBjdXJyZW50U2xpZGU6IG51bWJlcjtcbn1cblxuY2xhc3MgU2hvd2Nhc2VDb21wb25lbnQge1xuICBjb250YWluZXI6IEpRdWVyeTtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgbmV4dEJ0bk1vYmlsZTogSlF1ZXJ5O1xuICBwcmV2QnRuTW9iaWxlOiBKUXVlcnk7XG4gIG5leHRCdG46IEpRdWVyeTtcbiAgcHJldkJ0bjogSlF1ZXJ5O1xuICBpbmRleDogbnVtYmVyO1xuICBnYWxsZXJ5OiBKUXVlcnk7XG4gIGRlc2M6IEpRdWVyeTtcbiAgdGh1bWJzQ29udGFpbmVyOiBKUXVlcnk7XG4gIGdyYWRpZW50czogSlF1ZXJ5O1xuICB0aHVtYnNDbGljazogSlF1ZXJ5O1xuICBjbG9zZUJ0bjogSlF1ZXJ5O1xuICBjb3VudFRvdGFsOiBKUXVlcnk7XG4gIGN1cnJlbnRDb3VudEl0ZW06IEpRdWVyeTtcbiAgc2hvd0Nhc2VUaHVtYnM6IEpRdWVyeTtcbiAgc3RhdGVQb3NpdGlvbjogU2hvd2Nhc2VTbGlkZXJJbnRlcmZhY2U7XG4gIHRodW1iU2NhbGVUb3A6IG51bWJlcjtcbiAgdGh1bWJTY2FsZUxlZnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvciggZWw6IE9iamVjdCApIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9ICQoZWwpO1xuICAgIHRoaXMucHJldkJ0bk1vYmlsZSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX25hdi0tcHJldlwiKTtcbiAgICB0aGlzLm5leHRCdG5Nb2JpbGUgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19uYXYtLW5leHRcIik7XG4gICAgdGhpcy5wcmV2QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fdGh1bWJzbmF2LS1wcmV2XCIpO1xuICAgIHRoaXMubmV4dEJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1ic25hdi0tbmV4dFwiKTtcbiAgICB0aGlzLmdhbGxlcnkgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19zbGlkZXItLWdhbGxlcnlcIik7XG4gICAgdGhpcy5kZXNjID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fZGVzY1wiKTtcbiAgICB0aGlzLmNvdW50VG90YWwgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnRvdGFsXCIpO1xuICAgIHRoaXMuY3VycmVudENvdW50SXRlbSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuY3VycmVudFwiKTtcbiAgICB0aGlzLmluZGV4ID0gMDsgLy8gc2V0IHRvIDJuZCBzbGlkZVxuICAgIHRoaXMudGh1bWJzQ29udGFpbmVyID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fdGh1bWJzLS1pbWFnZXNcIik7XG4gICAgdGhpcy5zaG93Q2FzZVRodW1icyA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1ic1wiKTtcbiAgICB0aGlzLnRodW1iU2NhbGVUb3AgPSAxMzA7XG4gICAgdGhpcy50aHVtYlNjYWxlTGVmdCA9IDc1O1xuICAgIHRoaXMuc3RhdGVQb3NpdGlvbiA9IHtcbiAgICAgIGRlc2t0b3BQb3M6IDAsXG4gICAgICB0YWJsZXRQb3M6IDAsXG4gICAgICBpbmRleFNlbGVjdGVkOiB0aGlzLmluZGV4LFxuICAgICAgY3VycmVudFNsaWRlOiB0aGlzLmluZGV4ICsgMVxuICAgIH07XG5cbiAgfVxuXG4gIHNldEZpcnN0U2xpZGUoKSB7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggaW1hZ2VzIGFuZCBzZXQgYWN0aXZlIGVsZW1lbnRcbiAgICBsZXQgZmlyc3RJbWFnZSA9IHRoaXMuZ2FsbGVyeS5maW5kKFwibGlbZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuICAgIGZpcnN0SW1hZ2UuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgIHRoaXMuYW5pbWF0ZUdhbGxlcnlJbigpO1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGRlc2MgYW5kIHNldCBhY3RpdmUgZWxlbWVudFxuICAgIGxldCBmaXJzdERlc2MgPSB0aGlzLmRlc2MuZmluZChcIi5zaG93Y2FzZV9fZGVzYy0taXRlbVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG4gICAgZmlyc3REZXNjLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAvLyBCdWlsZCB0aHVtYm5haWxzXG4gICAgdGhpcy5idWlsZFRodW1icygpO1xuXG4gICAgLy8gU2V0IEN1cnJlbnQgU2xpZGUsIHdoaWNoIGlzIGFsd2F5cyB0aGUgZmlyc3Qgc2xpZGUgdG8gc2VsZWN0ZWQgLSBvbkxvYWRcbiAgICB0aGlzLnVwZGF0ZU1vYmlsZU5hdih0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKSk7XG5cbiAgICAvLyBhZGQgY2xpY2sgZXZlbnRzIHRvIHRodW1ibmFpbCBpbWFnZXMsIHRoZW4gd2hlbiBmaW5pc2hlZCBhbmltYXRlIGluIHdpdGggY2FsbGJhY2tcbiAgICB0aGlzLmJ1aWxkVGh1bWJzQ2xpY2tIYW5kbGVyKHRoaXMuYW5pbWF0ZUluVGh1bWJzLmJpbmQodGhpcykpO1xuXG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeS5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0Q3VycmVudE5hdkVsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldEN1cnJlbnREZXNjRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmRlc2MuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldFRvdGFsU2xpZGVzKCk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gdGhpcy5nYWxsZXJ5LmNoaWxkcmVuKFwibGlcIikubGVuZ3RoO1xuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIHVwZGF0ZU1vYmlsZU5hdiggc2VsZWN0ZWQ6IEpRdWVyeSApIHtcblxuICAgIC8vIEVuYWJsZS9EaXNhYmxlIGFycm93IGJ0bnNcbiAgICB0aGlzLnByZXZCdG5Nb2JpbGUucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmZpcnN0LWNoaWxkXCIpKTtcbiAgICB0aGlzLm5leHRCdG5Nb2JpbGUucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmxhc3QtY2hpbGRcIikpO1xuXG4gIH1cblxuICB1cGRhdGVTdGF0ZSggaW5kZXg6IG51bWJlciApIHtcblxuICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkID0gaW5kZXg7XG4gICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA9IGluZGV4ICsgMTtcblxuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZTtcbiAgfVxuXG4gIHVwZGF0ZVNsaWRlKCBkaXJlY3Rpb246IHN0cmluZyApIHtcblxuICAgIC8vIGdldCBjdXJyZW50IHNlbGVjdGVkIGFuZCBmaW5kIHRoZSBtYXRjaCB0byB0aGUgbmV4dCBlbFxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTtcbiAgICBsZXQgbmV4dFNsaWRlID0gdGhpcy5nYWxsZXJ5LmZpbmQoXCJsaVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG5cbiAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLnByZXZBbGwoKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUubmV4dEFsbCgpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIE5hdmlnYXRpb24gY2hlY2tcbiAgICB0aGlzLnVwZGF0ZU1vYmlsZU5hdih0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKSk7XG4gIH1cblxuICB1cGRhdGVEZXNjSGVpZ2h0KCBkaXJlY3Rpb24/OiBzdHJpbmcsIHNlbGVjdGVkPzogSlF1ZXJ5ICkge1xuXG4gICAgLy8gZGlyZWN0aW9uXG4gICAgaWYgKCBkaXJlY3Rpb24gKSB7XG5cbiAgICAgIGxldCBoZWlnaHQgPSBzZWxlY3RlZC5vdXRlckhlaWdodCgpO1xuICAgICAgVHdlZW5NYXgudG8odGhpcy5kZXNjLCAuMywge1xuICAgICAgICAgIGhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIGdldCBjdXJyZW50IHNsaWRlXG4gICAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50RGVzY0VsZW1lbnQoKTtcbiAgICAgIGxldCBoZWlnaHQgPSBjdXJyZW50U2xpZGUub3V0ZXJIZWlnaHQoKTtcbiAgICAgIHRoaXMuZGVzYy5oZWlnaHQoaGVpZ2h0KTtcblxuICAgIH1cblxuICB9XG5cbiAgdXBkYXRlRGVzYyggZGlyZWN0aW9uOiBzdHJpbmcgKSB7XG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudERlc2NFbGVtZW50KCk7XG4gICAgbGV0IG5leHRTbGlkZSA9IHRoaXMuZGVzYy5maW5kKFwiLnNob3djYXNlX19kZXNjLS1pdGVtW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcblxuICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG5cbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG5cbiAgICAgIHRoaXMudXBkYXRlRGVzY0hlaWdodChcInJpZ2h0XCIsIG5leHRTbGlkZSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLnByZXZBbGwoKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUubmV4dEFsbCgpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcblxuICAgICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KFwibGVmdFwiLCBuZXh0U2xpZGUpO1xuXG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVUaHVtYnNuYXYoIGRpcmVjdGlvbjogc3RyaW5nICkge1xuXG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudE5hdkVsZW1lbnQoKTtcbiAgICBsZXQgbmV4dFNsaWRlID0gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcImxpW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcblxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgLypcbiAgICAgICAqIFRBQkxFVCBUSFVNQiBTRUxFQ1RcbiAgICAgICAqL1xuXG4gICAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlID49IDQgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA8IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHN0YXRlXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgLSB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgLSB0aGlzLnRodW1iU2NhbGVUb3A7XG5cbiAgICAgICAgICAvLyB1cGRhdGUgaHRtbCBlbGVtZW50XG4gICAgICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgeDogdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyxcbiAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcImxlZnRcIik7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyAhPT0gMCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgKyB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgIHg6IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MsXG4gICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyAhPT0gMCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICsgdGhpcy50aHVtYlNjYWxlVG9wO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBERVNLVE9QIFRIVU1CIFNFTEVDVFxuICAgICAgICovXG4gICAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuXG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICAvLyBkZXRlY3RpbmcgaWYgc2xpZGUgc2hvdWxkIG1vdmUgb3Igbm90XG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA+PSA0ICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPCB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBwb3NpdGlvbiBjb250cm9sbGVyXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyAtIHRoaXMudGh1bWJTY2FsZVRvcDtcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyAtIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG5cbiAgICAgICAgICAvLyBtb3ZlIHNsaWRlclxuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgICB5OiB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyxcbiAgICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgKyB0aGlzLnRodW1iU2NhbGVUb3A7XG4gICAgICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICAgIHk6IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zLFxuICAgICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXBlcmF0ZSB0YWJsZXQgbG9va2luZyBhdCBzaG91bGQgaXQgdXBkYXRlIHRhYmxldCBzdGF0ZVxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICsgdGhpcy50aHVtYlNjYWxlTGVmdDtcblxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgY2hlY2tUaHVtYnNOYXYoIHNpemU6IHN0cmluZyApIHtcblxuICAgIGlmICggc2l6ZSA9PT0gXCJtb2JpbGVcIiApIHtcblxuICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICB5OiAwLFxuICAgICAgICAgIHg6IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICB5OiB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyxcbiAgICAgICAgICB4OiAwLFxuICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIH1cblxuICB9XG5cbiAgYXJyb3dIYW5kbGVyKCBldmVudDogYW55ICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgJGVsID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTsgLy8gYSB0YWdcbiAgICBsZXQgdGh1bWJJbmRleCA9ICRlbC5wYXJlbnQoXCJsaVwiKS5kYXRhKFwiaW5kZXhcIik7XG4gICAgbGV0IHByZXZFbCA9IHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gICAgbGV0IHByZXZJbmRleCA9IHByZXZFbC5kYXRhKFwiaW5kZXhcIik7XG5cblxuICAgIC8vIFNsaWRlciBjYW4gbW92ZSByaWdodCBiZWNhdXNlIGN1cnJlbnQgc2xpZGUgaXMgbm90IHRoZSBsYXN0IHNsaWRlXG4gICAgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwicmlnaHRcIiAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlIDw9IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcblxuICAgICAgLy8gdXBkYXRlIHN0YXRlIG9uIGFycm93IGNsaWNrXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgMSk7XG5cbiAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luT3V0KCk7XG5cblxuICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJsZWZ0XCIgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgLy8gdXBkYXRlIHN0YXRlIG9uIGFycm93IGNsaWNrXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkIC0gMSk7XG5cbiAgICAgIC8vIEVsc2UgaWYgaXRzIG5vdCB0aGUgZmlyc3Qgc2xpZGUgLSBtb3ZlIGxlZnRcbiAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwibGVmdFwiKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luT3V0KCk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJ0aHVtYm5haWxcIiAmJlxuICAgICAgcHJldkluZGV4IDwgdGh1bWJJbmRleCAmJlxuICAgICAgdGh1bWJJbmRleCArIDEgIT09IHRoaXMuZ2V0VG90YWxTbGlkZXNcbiAgICApIHtcbiAgICAgIC8vIGNvbXBhcmUgaXRlbSBzZWxlY3RlZCBpbmRleCB3aXRoIG5ldyBpdGVtIHNlbGVjdGVkIGFuZCBkZXRlcm1pbmUgd2hpY2ggZGlyZWN0aW9uIHRvIG1vdmVcbiAgICAgIC8vIHVwZGF0ZSBTdGF0ZVxuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aHVtYkluZGV4KTtcblxuICAgICAgLy8gdXBkYXRlIHRodW1icyBuYXZcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luT3V0KCk7XG5cbiAgICB9XG4gICAgZWxzZSBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJ0aHVtYm5haWxcIiAmJiBwcmV2SW5kZXggPiB0aHVtYkluZGV4XG4gICAgKSB7XG4gICAgICAvLyB1cGRhdGUgU3RhdGVcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGh1bWJJbmRleCk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aHVtYnMgbmF2XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcImxlZnRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGNvdW50ZXJcbiAgICB0aGlzLmN1cnJlbnRDb3VudEl0ZW0uaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRDdXJyZW50U2xpZGVDb3VudCgpKSk7XG5cbiAgfVxuXG4gIGNoZWNrU2l6ZSgpIHtcblxuICAgIC8vIE9uIHJlc2l6ZSBlbmQgLSBjaGVjayB0byBlbmFibGUgY2xpY2tzIGZvciBkZXNrdG9wIG9yIHJlbW92ZSB0aGVtXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuICAgIHRoaXMucmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgLy8gaWYgVGFibGV0IG9yIHNtYWxsZXIgLSBiaW5kIG1vYmlsZSBuYXYgYXJyb3dzXG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICAgIC8vIGFkanVzdCBjc3Mgc2l6aW5nIGZvciB0aHVtYnMgbmF2IG9uIHBvc2l0aW9uIHJlc2l6ZVxuICAgICAgICB0aGlzLmNoZWNrVGh1bWJzTmF2KFwibW9iaWxlXCIpO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIHRoaXMuY2hlY2tUaHVtYnNOYXYoXCJkZXNrdG9wXCIpO1xuXG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gIH1cblxuICBhbmltYXRlU2hhZG93SW5PdXQoKSB7XG5cbiAgICAvLyByZW1vdmUgZHJvcHNoYWRvd1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuZ2FsbGVyeSwgMCwge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjApXCJcbiAgICB9KTtcblxuXG4gICAgVHdlZW5NYXgudG8odGhpcy5nYWxsZXJ5LCAuMSwge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjY4KVwiLFxuICAgICAgZGVsYXk6IC4zXG4gICAgfSk7XG5cblxuICB9XG5cbiAgYW5pbWF0ZVNoYWRvd0luKCkge1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuZ2FsbGVyeSwgLjMsIHtcbiAgICAgIGJveFNoYWRvdzogXCIwcHggMThweCA5NHB4IC0xNnB4IHJnYmEoMCwwLDAsMC42OClcIixcbiAgICAgIGRlbGF5OiAuMVxuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRUaHVtYnMoKSB7XG5cbiAgICBsZXQgZnJhZ21lbnQgPSAkKGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG4gICAgLy8gYnVpbGQgbG9vcCBmb3IgaW1hZ2VzXG4gICAgdGhpcy5nYWxsZXJ5LmZpbmQoXCJsaVwiKS5lYWNoKCggaW5kZXg6IG51bWJlciwgZWw6IE9iamVjdCApID0+IHtcblxuICAgICAgLy8gY3JlYXRlIGh0bWwgZWxlbWVudHNcbiAgICAgIGxldCBpdGVtSW5kZXggPSBVdGlscy5zZXROdW1iZXIoaW5kZXgpLFxuICAgICAgICBpbWFnZVRodW1iVXJsID0gJChlbCkuZGF0YShcInRodW1iXCIpLFxuICAgICAgICBpbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpLFxuICAgICAgICBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpLFxuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuXG4gICAgICAvLyBhZGQgc3JjIGFuZCBhdHRyIHRvIGltYWdlXG4gICAgICBpbWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIGltYWdlVGh1bWJVcmwpO1xuICAgICAgbGlua0VsZW1lbnQuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBcIiNcIik7XG4gICAgICBsaW5rRWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUVsZW1lbnQpO1xuICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChsaW5rRWxlbWVudCk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtaW5kZXhcIiwgaXRlbUluZGV4KTtcblxuICAgICAgLy8gc2V0IGZpcnN0IGltYWdlIHRvIHNlbGVjdGVkXG4gICAgICBpbmRleCA9PT0gdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgPyBlbGVtZW50LmNsYXNzTmFtZSA9IFwic2VsZWN0ZWRcIiA6IFwiXCI7XG5cbiAgICAgIC8vIGFwcGVuZCB0byBmcmFnbWVudFxuICAgICAgZnJhZ21lbnQuYXBwZW5kKGVsZW1lbnQpO1xuXG4gICAgfSk7XG5cbiAgICAvLyBpbnNlcnQgaHRtbCBlbGVtZW50IHRvIHRoZSBkb20gYWZ0ZXIgbG9vcCBmaW5pc2hlc1xuICAgIHRoaXMudGh1bWJzQ29udGFpbmVyLmFwcGVuZChmcmFnbWVudCk7XG5cbiAgfVxuXG4gIGJ1aWxkVGh1bWJzQ2xpY2tIYW5kbGVyKCBjYWxsYmFjayApIHtcblxuICAgIC8vIEFkZCBhcnJheSBvZiBodG1sIG9iamVjdCB0byBhdHRhY2ggY2xpY2sgZXZlbnRzIHRvIGxhdGVyXG4gICAgdGhpcy50aHVtYnNDbGljayA9IHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCJhXCIpO1xuXG4gICAgLy8gQ2xpY2sgaGFuZGxlciBmb3IgcHJldmlldyB0aHVtYnMgb24gZGVza3RvcCwgbmVlZHMgdG8gd29yayBvbiB0YWJsZXQgLT4gZGVza3RvcFxuICAgIHRoaXMudGh1bWJzQ2xpY2suZWFjaCgoIGluZGV4LCBlbCApID0+IHtcbiAgICAgICQoZWwpLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcInRodW1ibmFpbFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH0pO1xuXG4gICAgY2FsbGJhY2soKTtcbiAgfVxuXG4gIGFuaW1hdGVJblRodW1icygpIHtcbiAgICBUd2Vlbk1heC50byh0aGlzLnNob3dDYXNlVGh1bWJzLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGRlbGF5OiAxXG4gICAgfSk7XG4gIH1cblxuICBhbmltYXRlR2FsbGVyeUluKCkge1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX291dGVyLS1iZ2ltYWdlXCIpLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGRlbGF5OiAuNyxcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW4oKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG5cbiAgICB0aGlzLnNldEZpcnN0U2xpZGUoKTtcblxuICAgIC8vIEluaXQgY29ycmVjdCBuYXYgZGVwZW5kaW5nIG9uIHZpZXdwb3J0IHNpemVcbiAgICB0aGlzLmNoZWNrU2l6ZSgpO1xuICAgIHRoaXMudXBkYXRlRGVzY0hlaWdodCgpO1xuICAgIHRoaXMucHJldkJ0bk1vYmlsZS5vbihcImNsaWNrXCIsIHsga2V5czogXCJsZWZ0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5uZXh0QnRuTW9iaWxlLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcInJpZ2h0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5jaGVja1NpemUuYmluZCh0aGlzKSk7XG5cblxuICAgIC8vIHNldCB0b3RhbCBzbGlkZXMgbnVtYmVyXG4gICAgdGhpcy5jb3VudFRvdGFsLmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0VG90YWxTbGlkZXMoKSkpO1xuXG4gICAgLy8gdXBkYXRlIGNvdW50ZXJcbiAgICB0aGlzLmN1cnJlbnRDb3VudEl0ZW0uaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRDdXJyZW50U2xpZGVDb3VudCgpKSk7XG5cbiAgfVxufVxuXG4vLyBsb29wIHRocm91Z2ggZWFjaCBoZWFkZXIgc2xpZGVyIG9iamVjdCBvbiB0aGUgcGFnZVxuY2xhc3MgU2hvd0Nhc2VTTGlkZXIge1xuXG4gIGl0ZW1JbmZvV3JhcHBlcjogSlF1ZXJ5O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXRlbUluZm9XcmFwcGVyID0gJChcIi5zaG93Y2FzZVwiKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTaG93Y2FzZSBTbGlkZXIgaW5pdFwiKTtcblxuICAgIHRoaXMuaXRlbUluZm9XcmFwcGVyLmVhY2goKCBpbmRleDogbnVtYmVyLCBlbDogT2JqZWN0ICkgPT4ge1xuXG4gICAgICAvLyBQYXNzIFwidGhpc1wiIHRvIGVhY2ggbmV3IEhlYWRlciBzbGlkZXIgY29tcG9uZW50XG4gICAgICBsZXQgc2xpZGVyID0gbmV3IFNob3djYXNlQ29tcG9uZW50KGVsKTtcbiAgICAgIHNsaWRlci5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5sZXQgU2hvd2Nhc2VTbGlkZXIgPSBuZXcgU2hvd0Nhc2VTTGlkZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgU2hvd2Nhc2VTbGlkZXI7XG4iLCJjb25zdCAkID0galF1ZXJ5O1xuXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgU3RpY2t5U2lkZWJhckNvbXBvbmVudCB7XG5cbiAgaXNBbmltYXRpbmc6IGJvb2xlYW47XG4gIGNvbnRlbnRXcmFwcGVyOiBKUXVlcnk7XG4gIGNvbnRlbnRPZmZzZXRUb3A6IG51bWJlcjtcbiAgY29udGVudFdyYXBwZXJIZWlnaHQ6IG51bWJlcjtcbiAgc2Nyb2xsVG9wOiBudW1iZXI7XG4gIGFzaWRlOiBKUXVlcnk7XG4gIHNpZGViYXJXcmFwcGVyOiBKUXVlcnk7XG4gIHdpbmRvd0hlaWdodDogbnVtYmVyO1xuICBzaWRlYmFySGVpZ2h0OiBudW1iZXI7XG4gIGZvb3RlckhlaWdodDogbnVtYmVyO1xuICBzY3JvbGxpbmdEb3duOiBib29sZWFuO1xuICBsYXN0U2Nyb2xsVG9wOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuY29udGVudFdyYXBwZXIgPSAkKFwiLnNpZGViYXItY29udGVudFwiKTtcbiAgICB0aGlzLmFzaWRlID0gJChcIi5zZXJ2aWNlLXNpZGViYXItd3JhcHBlclwiKTtcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICB0aGlzLnNpZGViYXJIZWlnaHQgPSB0aGlzLmFzaWRlLmhlaWdodCgpO1xuICAgIHRoaXMuc2lkZWJhcldyYXBwZXIgPSAkKFwiLnNlcnZpY2Utc2lkZWJhclwiKTtcbiAgfVxuXG4gIGNoZWNrU2lkZWJhcigpOiB2b2lkIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgc2lkZWJhciBpcyBmaXhlZCBvciBub3RcbiAgICBpZiAoICF0aGlzLmlzQW5pbWF0aW5nICYmIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuICAgICAgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSA/IHNldFRpbWVvdXQodGhpcy51cGRhdGVTaWRlYmFyUG9zaXRpb24uYmluZCh0aGlzKSwgMzAwKSA6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVTaWRlYmFyUG9zaXRpb24uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzZXRTaWRlQmFyKCk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXRTaWRlQmFyKCkge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpO1xuICAgIHRoaXMuYXNpZGUuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuICB9XG5cbiAgdXBkYXRlU2lkZWJhclBvc2l0aW9uKCk6IHZvaWQge1xuXG4gICAgdGhpcy5jaGVja1Njcm9sbERpcmVjdGlvbigpO1xuXG4gICAgLy8gZ2V0IGRpc3RhbmNlIGZyb20gdG9wIG9mIGNvbnRlbnQgMTAgKyA0MCA9IDUwIHBhZGRpbmcgdG9wXG4gICAgLy8gdGhpcy5jb250ZW50T2Zmc2V0VG9wID0gdGhpcy5jb250ZW50V3JhcHBlci5vZmZzZXQoKS50b3AgLSAxMDtcbiAgICB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm9mZnNldCgpLnRvcDtcbiAgICB0aGlzLnNpZGViYXJIZWlnaHQgPSB0aGlzLmFzaWRlLmhlaWdodCgpO1xuICAgIHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm91dGVySGVpZ2h0KCk7IC8vIGluY2x1ZGUgcGFkZGluZyBhbmQgbWFyZ2luXG5cblxuICAgIC8vIGdldCB3aGVyZSB0b3Agb2Ygd2luZG93IGlzXG4gICAgdGhpcy5zY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJDb250ZW50IFdyYXBwZXIgSGVpZ2h0XCIsIHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29udGVudCBPZmZzZXRcIiwgdGhpcy5jb250ZW50T2Zmc2V0VG9wKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNpZGViYXIgSGVpZ2h0XCIsIHRoaXMuc2lkZWJhckhlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJXaW5kb3cgSGVpZ2h0XCIsIHRoaXMud2luZG93SGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm9mZnNldCBUb3BcIiwgdGhpcy5jb250ZW50T2Zmc2V0VG9wKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNjcm9sbFRvcFwiLCB0aGlzLnNjcm9sbFRvcCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTaWRlYmFyb2Zmc2V0XCIsIHRoaXMuc2Nyb2xsVG9wKTtcblxuICAgIC8vIElmIHRoZSB3aW5kb3cgViBwb3NpdGlvbiBpcyBsZXNzIHRoYW4gdGhlIGNvbnRlbnQgViBwb3NpdGlvbiBtYWtlIHNpZGViYXIgbm9ybWFsXG4gICAgaWYgKCB0aGlzLnNjcm9sbFRvcCA8IHRoaXMuY29udGVudE9mZnNldFRvcCApIHtcbiAgICAgIC8vIGxldCBjc3NQcm9wcyA9IHtcbiAgICAgIC8vICAgXCJ0cmFuc2l0aW9uXCI6IFwidG9wIC4zc1wiXG4gICAgICAvLyB9O1xuICAgICAgdGhpcy5hc2lkZS5yZW1vdmVDbGFzcyhcInN0aWNreVwiKTtcbiAgICAgIC8vIHRoaXMuYXNpZGUuY3NzKGNzc1Byb3BzKTtcblxuICAgICAgLy8gaWYgd2luZG93IFYgcG9zaXRpb24gaXMgZ3JlYXRlciB0aGFuIGNvbnRlbnQgLSBhZGQgc3RpY2t5XG4gICAgICAvLyAybmQgY2hlY2tzIHRoZSBvZmZzZXQgb2YgdGhlIHRvcCBvZiB0aGUgd2luZG93IHRvIHRoZSB0b3Agb2YgdGhlIGNvbnRlbnQgJiYgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb250ZW50IGluIHJlbGF0aW9uIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgd2luZG93IC0gNDAgb24gZW5kXG4gICAgfSBlbHNlIGlmICggdGhpcy5zY3JvbGxUb3AgPj0gdGhpcy5jb250ZW50T2Zmc2V0VG9wICYmIHRoaXMuc2Nyb2xsVG9wIDwgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCAtIHRoaXMuc2lkZWJhckhlaWdodCArIHRoaXMuY29udGVudE9mZnNldFRvcCApIHtcbiAgICAgIHRoaXMuYXNpZGUuYWRkQ2xhc3MoXCJzdGlja3lcIikuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuXG4gICAgICBpZiAoIHRoaXMuc2Nyb2xsaW5nRG93biA9PT0gdHJ1ZSApIHtcbiAgICAgICAgLy8gdGhpcy5hc2lkZS5jc3MoXCJ0cmFuc2l0aW9uXCIsIFwidG9wIC4zc1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcIlwiKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBsZXQgYXJ0aWNsZVBhZGRpbmdUb3AgPSBOdW1iZXIoYXJ0aWNsZXMuZXEoMSkuY3NzKFwicGFkZGluZy10b3BcIikucmVwbGFjZShcInB4XCIsIFwiXCIpKTtcbiAgICAgIGlmICggdGhpcy5hc2lkZS5oYXNDbGFzcyhcInN0aWNreVwiKSApIHtcbiAgICAgICAgdGhpcy5hc2lkZS5hdHRyKFwic3R5bGVcIiwgXCJcIik7XG4gICAgICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIikuY3NzKFwidG9wXCIsIHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQgLSB0aGlzLnNpZGViYXJIZWlnaHQgKyBcInB4XCIpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuXG4gIH1cblxuICBjaGVja1Njcm9sbERpcmVjdGlvbigpIHtcbiAgICAvLyBMb2cgY3VycmVudCBzY3JvbGxQb2ludFxuICAgIGxldCBzdCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cbiAgICAvLyBjb21wYXJlIHRvIGxhc3Qgc2Nyb2xsUG9pbnRcbiAgICBpZiAoIHN0ID4gdGhpcy5sYXN0U2Nyb2xsVG9wICkge1xuICAgICAgY29uc29sZS5sb2coXCJzY3JvbGwgZG93blwiKTtcbiAgICAgIC8vIGRvd25zY3JvbGwgY29kZVxuICAgICAgdGhpcy5zY3JvbGxpbmdEb3duID0gdHJ1ZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNjcm9sbCB1cFwiKTtcbiAgICAgIC8vIHVwc2Nyb2xsIGNvZGVcbiAgICAgIHRoaXMuc2Nyb2xsaW5nRG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIG9uIGNvbXBsZXRlIC0gbWFrZSBsYXN0IFNjcm9sbCBwb2ludCB0aGUgcG9pbnQgYXQgd2hpY2ggdGhleSBzdGFydGVkIHNjcm9sbGluZyBhdCBmaXJzdFxuICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IHN0O1xuICB9XG5cbiAgYW5pbWF0ZVNpZGViYXJJbigpIHtcblxuICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJpbnRyb1wiKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICBsZXQgc2lkZWJhckludHJvID0gVHdlZW5NYXgudG8odGhpcy5hc2lkZSwgLjMsIHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgejogLjAwMSxcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgICAgZGVsYXk6IC45LFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgLy8gbWFrZSBzaWRlYmFyIHBlcm1hbmVudGx5IHZpc2libGVcbiAgICAgICAgICB0aGlzLmFzaWRlLmFkZENsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU3RpY2t5IHNpZGViYXIgbG9hZGVkXCIpO1xuXG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gMDtcbiAgICBpZiAoIHRoaXMuYXNpZGUubGVuZ3RoID4gMCApIHtcbiAgICAgIHRoaXMuY2hlY2tTaWRlYmFyKCk7XG5cbiAgICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcbiAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcblxuICAgICAgLy8gQW5pbWF0ZSBzaWRlIGJhciBpbiBvbiBsb2FkXG4gICAgICB0aGlzLmFuaW1hdGVTaWRlYmFySW4oKTtcbiAgICB9XG4gIH1cbn1cblxubGV0IFN0aWNreVNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdGlja3lTaWRlYmFyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5jbGFzcyBUZXN0aW1vbmFpbENvbXBvbmVudCB7XG5cbiAgdGVzdGltb25haWxzOiBKUXVlcnk7XG4gIHJlc2l6ZVRpbWVyOiBudW1iZXI7XG4gIGN1cnJlbnRIZWlnaHQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRlc3RpbW9uYWlscyA9ICQoXCIudGVzdGltb25pYWxzXCIpO1xuICB9XG5cbiAgZ2VuZXJhdGVJZCggaW5kZXgsIGVsICkge1xuXG4gICAgLy8gY3JlYXRlIER5bmFtaWMgSURcbiAgICBsZXQgaWRTdHJpbmcgPSBcImNhcm91c2VsLXRlc3RpbW9uaWFsLVwiICsgaW5kZXg7XG4gICAgZWwuYXR0cihcImlkXCIsIGlkU3RyaW5nKTtcblxuICAgIC8vIEFkZCBtYXRjaGluZyBocmVmIHRvIGNvbnRyb2xzXG4gICAgbGV0IGNvbnRyb2xzID0gZWwuZmluZChcIi5jYXJvdXNlbC1jb250cm9sXCIpO1xuICAgIGNvbnRyb2xzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgICQoZWwpLmF0dHIoXCJocmVmXCIsIFwiI1wiICsgaWRTdHJpbmcpO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuXG4gICAgLy8gT24gcmVzaXplIGVuZCAtIGNoZWNrIHRvIGVuYWJsZSBjbGlja3MgZm9yIGRlc2t0b3Agb3IgcmVtb3ZlIHRoZW1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG4gICAgdGhpcy5yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAvLyBDaGFuZ2UgSGVpZ2h0IG9uIHJlc2l6ZVxuICAgICAgdGhpcy50ZXN0aW1vbmFpbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgICBsZXQgJHRoaXMgPSAkKGVsKTtcblxuICAgICAgICAvLyBlc3RhYmxpc2ggdmFyc1xuICAgICAgICBsZXQgJGlubmVyID0gJHRoaXMuZmluZChcIi5jYXJvdXNlbC1pbm5lclwiKSxcbiAgICAgICAgICAgICRhY3RpdmUgPSAkaW5uZXIuZmluZChcIi5hY3RpdmVcIiksXG4gICAgICAgICAgICBibG9ja0l0ZW0gPSAkYWN0aXZlLmZpbmQoXCJibG9ja3F1b3RlXCIpO1xuXG4gICAgICAgIC8vIFNldCBoZWlnaHQgZm9yIGZpcnN0IGl0ZW1cbiAgICAgICAgbGV0IGhlaWdodCA9IGJsb2NrSXRlbS5vdXRlckhlaWdodCgpO1xuXG4gICAgICAgIC8vIGlmIHRoZXkgYXJlbid0IGVxdWFsLCBjaGFuZ2UgdGhlbVxuICAgICAgICBpZiAoIHRoaXMuY3VycmVudEhlaWdodCAhPT0gaGVpZ2h0ICkge1xuICAgICAgICAgICRpbm5lci5jc3MoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9LCA0MDApO1xuICB9XG5cbiAgaW5pdCgpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiVGVzdGltb25pYWxzIEluaXRcIik7XG5cbiAgICAvLyBNYWtlIGl0ZW1zIGR5bmFtaWNcbiAgICB0aGlzLnRlc3RpbW9uYWlscy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuICAgICAgbGV0ICR0aGlzID0gJChlbCk7XG4gICAgICB0aGlzLmdlbmVyYXRlSWQoaW5kZXgsICR0aGlzKTtcblxuICAgICAgLy8gbWFrZSBmaXJzdCBlbGVtZW50IGFjdGl2ZVxuICAgICAgbGV0ICRpbm5lciA9ICR0aGlzLmZpbmQoXCIuY2Fyb3VzZWwtaW5uZXJcIik7XG4gICAgICBsZXQgJGZpcnN0ID0gJGlubmVyLmNoaWxkcmVuKFwiLml0ZW1cIikuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgLy8gU2V0IGhlaWdodCBmb3IgZmlyc3QgaXRlbVxuICAgICAgbGV0IGhlaWdodCA9ICRmaXJzdC5vdXRlckhlaWdodCgpO1xuICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgJGlubmVyLmNzcyhcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gICAgfSk7XG5cbiAgICAvLyBTdGFydCBTbGlkZXJzXG4gICAgdGhpcy50ZXN0aW1vbmFpbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgLy8gaW5pdCBjYXJvdXNlbFxuICAgICAgJChlbCkuY2Fyb3VzZWwoKTtcblxuICAgICAgLy8gT24gc2xpZGUgY2hhbmdlIGhlaWdodCBmb3Igc21vb3RoIHRyYW5zaXRpb25zXG4gICAgICAkKGVsKS5vbihcInNsaWQuYnMuY2Fyb3VzZWxcIiwgKCBlICkgPT4ge1xuXG4gICAgICAgIC8vIHNsaWRlXG4gICAgICAgIGxldCAkdGhpcyA9IGUuY3VycmVudFRhcmdldDtcbiAgICAgICAgbGV0IGN1cnJlbnRTbGlkZSA9ICQoJHRoaXMpLmZpbmQoXCIuYWN0aXZlXCIpO1xuICAgICAgICBsZXQgYmxvY2tJdGVtID0gY3VycmVudFNsaWRlLmZpbmQoXCJibG9ja3F1b3RlXCIpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gYmxvY2tJdGVtLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgY3VycmVudFNsaWRlLnBhcmVudChcIi5jYXJvdXNlbC1pbm5lclwiKS5jc3MoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcblxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGp1c3Qgc2l6ZSBvbiByZXNpemVcbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG59XG5cbmNvbnN0IFRlc3RpbW9uYWlscyA9IG5ldyBUZXN0aW1vbmFpbENvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBUZXN0aW1vbmFpbHM7IiwiaW1wb3J0IHtCcHNJbnRlcmZhY2V9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2Jwcy5pbnRlcmZhY2VcIjtcbmNvbnN0ICQgPSBqUXVlcnk7XG5cbi8vIEFkZCBpbnRlcmZhY2UgSlF1ZXJ5U21vb3RoIHtcbi8vIHNtb290aFN0YXRlKCk6dm9pZDtcbi8vIH1cbi8vIHNtb290aFN0YXRlKGFyZzogT2JqZWN0KTogSlF1ZXJ5O1xuXG5jbGFzcyBVdGlsaXR5Q29tcG9uZW50IHtcbiAgd2luZG93V2lkdGg6IG51bWJlcjtcbiAgYnJlYWtwb2ludDogbnVtYmVyO1xuICBicmVha3BvaW50czogbnVtYmVyW107XG4gIGJwczogQnBzSW50ZXJmYWNlO1xuICBicm93c2VyOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfc2V0QnJlYWtwb2ludHMgPSAoIGJwczogQnBzSW50ZXJmYWNlICkgPT4ge1xuICAgIGxldCBhcnIgPSBbXTtcblxuICAgIGZvciAoIGxldCBrZXkgaW4gYnBzICkge1xuICAgICAgaWYgKCBicHMuaGFzT3duUHJvcGVydHkoa2V5KSApIHtcbiAgICAgICAgYXJyLnB1c2goYnBzWyBrZXkgXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyci5yZXZlcnNlKCk7XG4gIH07XG4gIHByaXZhdGUgX2NoZWNrQnJlYWtwb2ludCA9ICgpID0+IHtcbiAgICAvLyBtYWtlIGJyZWFrcG9pbnQgZXZlbnQgYXZhaWxhYmxlIHRvIGFsbCBmaWxlcyB2aWEgdGhlIHdpbmRvdyBvYmplY3RcbiAgICBsZXQgb2xkX2JyZWFrcG9pbnQgPSB0aGlzLmJyZWFrcG9pbnQ7XG5cbiAgICB0aGlzLl9zZXRCcmVha3BvaW50KCk7XG5cbiAgICBpZiAoIG9sZF9icmVha3BvaW50ICE9PSB0aGlzLmJyZWFrcG9pbnQgKSB7XG5cbiAgICAgICQod2luZG93KS50cmlnZ2VyKFwiYnJlYWtwb2ludENoYW5nZVwiLCBVdGlscy5icmVha3BvaW50KTtcbiAgICB9XG4gIH07XG4gIHByaXZhdGUgX3NldEJyZWFrcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gZ2V0IGJyZWFrcG9pbnQgZnJvbSBjc3NcbiAgICBsZXQgYm9keSA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSksXG4gICAgICB6aW5kZXggPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpWyBcInotaW5kZXhcIiBdO1xuXG4gICAgdGhpcy5icmVha3BvaW50ID0gcGFyc2VJbnQoemluZGV4LCAxMCk7XG4gIH07XG4gIHByaXZhdGUgX3NldFdpbmRvd1dpZHRoID0gKCkgPT4ge1xuICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgfTtcblxuICBzZXROdW1iZXIoIGNvdW50OiBudW1iZXIgKTogc3RyaW5nIHtcbiAgICAvLyBjb252ZXIgbnVtYmVyIHRvIHN0cmluZ1xuICAgIGxldCB0b3RhbCA9IGNvdW50O1xuICAgIHJldHVybiB0b3RhbC50b1N0cmluZygpO1xuICB9XG5cbiAgd2hpY2hCcm93c2VyKCkge1xuICAgIGlmICggKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwic2FmYXJpXCIpID4gLTEpICYmICEoXG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImNocm9tZVwiKSA+IC0xKSAmJiAobmF2aWdhdG9yLmFwcE5hbWUgPT09XG4gICAgICBcIk5ldHNjYXBlXCIpICkge1xuXG4gICAgICBpZiAoIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSkgIT09IG51bGwgKSB7XG4gICAgICAgIHJldHVybiBcImlwYWRcIjtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwic2FmYXJpXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDA7XG4gICAgdGhpcy5icmVha3BvaW50ID0gMzIwO1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSBbXTtcbiAgICB0aGlzLmJwcyA9IHtcbiAgICAgIG1vYmlsZTogNTQ0LFxuICAgICAgdGFibGV0OiA3NjgsXG4gICAgICBsYXB0b3A6IDk5MixcbiAgICAgIGRlc2t0b3A6IDEyMDAsXG4gICAgICBkZXNrdG9wX3hsOiAxNjAwXG4gICAgfTtcbiAgICB0aGlzLmJyb3dzZXIgPSB0aGlzLndoaWNoQnJvd3NlcigpO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlV0aWxpdGllcyBsb2FkZWRcIik7XG5cbiAgICAvLyBzZXQgYnJlYWtwb2ludCBvbiB3aW5kb3cgbG9hZFxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcbiAgICB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBCcmVha3BvaW50IGlzOlwiLCB0aGlzLmJyZWFrcG9pbnQpO1xuXG4gICAgLy8gY3JlYXRlIGZ1bGwgYXJyYXkgZm9yIGltYWdlIGNvbXByZXNzaW9uIHJlZlxuICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLl9zZXRCcmVha3BvaW50cyh0aGlzLmJwcyk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5fY2hlY2tCcmVha3BvaW50KS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBVdGlscyA9IG5ldyBVdGlsaXR5Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyJdfQ==
