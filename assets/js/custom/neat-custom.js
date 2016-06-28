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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGUudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zdmcudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2ltYWdlTG9hZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zdGlja3ktc2lkZWJhci50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7O0dBR0c7O0FBRUgsc0JBQWtCLGtCQUFrQixDQUFDLENBQUE7QUFDckMsMkJBQWdCLHlCQUF5QixDQUFDLENBQUE7QUFDMUMsdUJBQW1CLGdDQUFnQyxDQUFDLENBQUE7QUFDcEQsMkJBQXNCLHVCQUF1QixDQUFDLENBQUE7QUFDOUMsb0RBQW9EO0FBQ3BELDRCQUF3Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ2pELCtCQUEwQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3RELGlDQUFnQyw2QkFBNkIsQ0FBQyxDQUFBO0FBQzlELGdDQUEyQiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3hELDhCQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3BELDBEQUEwRDtBQUMxRCxJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFFakIsNEJBQTRCO0FB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Q0FBQyxTQUFTLENBQUMsT0FBTztZQUMvRSxVQUFVLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFFZixFQUFFLENBQUMsQ0FBRSxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDO1lBRWhCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2xCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQWdCRCwrQkFBSSxHQUFKO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRWhDLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZELDhDQUE4QztRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxELENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQWpGQSxBQWlGQyxJQUFBO0FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0FBRW5DO2tCQUFlLEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuIFJlZiBwYXRoIGlzIG5vdCBuZWVkZWQgZm9yIHNvbWUgcmVhc29uXG4gPHJlZmVyZW5jZSBwYXRoPVwiL1VzZXJzL3lvc2VtZXRpZS9Ecm9wYm94L2RldmVsb3BtZW50L3Zob3N0cy93d3cubHluZGFzY29yZS5kZXYvd3AtY29udGVudC90aGVtZXMvbmVhdC90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbiAqL1xuXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBOYXYgZnJvbSBcIi4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL25hdmlnYXRpb24vY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCBTdmdIZWFkZXIgZnJvbSBcIi4vcGFydGlhbHMvaGVhZGVyLXN2Z1wiO1xuLy8gaW1wb3J0IFNtb290aFN0YXRlIGZyb20gXCIuL3BhcnRpYWxzL3Ntb290aFN0YXRlXCI7XG5pbXBvcnQgSW1hZ2VMb2FkZXIgZnJvbSBcIi4vcGFydGlhbHMvaW1hZ2VMb2FkZXJcIjtcbmltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyXCI7XG5pbXBvcnQgQW5pbWF0aW9uQ29udHJvbGxlciBmcm9tIFwiLi9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uXCI7XG5pbXBvcnQgSXNvdG9wZUdhbGxlcnkgZnJvbSBcIi4vcGFydGlhbHMvZ2FsbGVyeS1pc290b3BlXCI7XG5pbXBvcnQgSGVhZGVyU2xpZGVyIGZyb20gXCIuL3BhcnRpYWxzL2hlYWRlci1zbGlkZXJcIjtcbi8vIGltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3NlcnZpY2Utc2lkZWJhclwiO1xuY29uc3QgJCA9IGpRdWVyeTtcbmRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG4vLyBkZWNsYXJlIHZhciByZXZhcGkxOiBhbnk7XG5cbihmdW5jdGlvbiAoKSB7XG4gIGNsYXNzIEFwcCB7XG5cbiAgICBpbml0KCk6IHZvaWQge1xuICAgICAgY29uc29sZS5sb2coXCJOZWF0IGxvYWRlZFwiKTtcbiAgICAgIFN2Z0hlYWRlci5pbml0KCk7XG4gICAgICBVdGlscy5pbml0KCk7XG4gICAgICBOYXYuaW5pdCgpO1xuICAgICAgU2VhcmNoLmluaXQoKTtcbiAgICAgIFN0aWNreVNpZGViYXIuaW5pdCgpO1xuICAgICAgQW5pbWF0aW9uQ29udHJvbGxlci5pbml0KCk7IC8vIEdsb2JhbCB3aW5kb3cgYW5pbSBhbmQgY2xpY2sgY29udHJvbFxuXG4gICAgfVxuICB9XG5cbiAgbGV0IGJvb3RzdHJhcCA9IG5ldyBBcHAoKTtcblxuICAvKiogcnVuIGFsbCBmdW5jdGlvbnMgKi9cbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGJvb3RzdHJhcC5pbml0KCk7XG4gICAgSW1hZ2VMb2FkZXIuaW5pdCgpO1xuICAgIC8vIFNtb290aFN0YXRlLmluaXQoXCJcIik7XG4gIH0pO1xuXG4gIC8vIEJpbmQgZXZlbnRzIHRvIHRoZSBpbWFnZXNMb2FkZWQgcGx1Z2luIGhlcmVcbiAgJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24gKCBlICkge1xuICAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICAvLyBjaGVjayBpZiBwYWdlIGhhcyBnYWxsZXJ5XG4gICAgaWYgKCAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBJc290b3BlR2FsbGVyeS5pbml0KCk7XG4gICAgfVxuICAgIEhlYWRlclNsaWRlci5pbml0KCk7XG5cbiAgfSk7XG5cbn0pKCk7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vLi4vcGFydGlhbHMvdXRpbHNcIjtcblxuY2xhc3MgU2VhcmNoQ29tcG9uZW50IHtcbiAgJHNlYXJjaFRyaWdnZXI6IEpRdWVyeTtcbiAgJHNlYXJjaENsb3NlVHJpZ2dlcjogSlF1ZXJ5O1xuICAkc2VhcmNoRm9ybTogSlF1ZXJ5O1xuICAkc2VhcmNoQnV0dG9uQXJlYTogSlF1ZXJ5O1xuICAkaWNvbjogSlF1ZXJ5O1xuICAkZm9ybTogSlF1ZXJ5O1xuICAkaW5wdXQ6IEpRdWVyeTtcbiAgJHdpZHRoOiBudW1iZXI7XG4gICRoZWlnaHQ6IG51bWJlcjtcbiAgaXNPcGVuOiBib29sZWFuO1xuXG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlciA9ICQoXCIubWV0YS1zZWFyY2gtdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIgPSAkKFwiLnN1cGVyLXNlYXJjaC1jbG9zZVwiKTtcbiAgICB0aGlzLiRzZWFyY2hGb3JtID0gJChcIi5zdXBlci1zZWFyY2hcIik7XG4gICAgdGhpcy4kc2VhcmNoQnV0dG9uQXJlYSA9ICQoXCIubWV0YS1zZWFyY2hcIik7XG4gICAgdGhpcy4kaWNvbiA9IHRoaXMuJHNlYXJjaFRyaWdnZXIuY2hpbGRyZW4oXCJpXCIpO1xuICAgIHRoaXMuJGZvcm0gPSB0aGlzLiRzZWFyY2hGb3JtLmZpbmQoXCIuZXQtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZm9ybS5maXJzdCgpO1xuICAgIHRoaXMuJHdpZHRoID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS53aWR0aCgpO1xuICAgIHRoaXMuJGhlaWdodCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEuaGVpZ2h0KCk7XG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggUmVsb2FkXCIpO1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gJChcIi5ldC1zZWFyY2hcIik7XG4gICAgdGhpcy4kd2lkdGggPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gICAgdGhpcy4kaGVpZ2h0ID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS5oZWlnaHQoKTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gIH1cblxuICBnZXRUb3BQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgfVxuXG4gIGdldExlZnRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9mZnNldCgpLmxlZnQ7XG4gIH1cblxuICBjbG9zZVNlYXJjaCggZXZlbnQgKSB7XG5cbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG4gICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIsIC4yLCB7XG4gICAgICB0b3A6IFwiNSVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kZm9ybSwgLjQsIHtcbiAgICAgIHRvcDogXCIyNSVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgICAgZWFzZTogRXhwby5lYXNlSW5PdXRcbiAgICB9KTtcblxuICAgIGFuaW1hdGlvbi50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogdGhpcy5nZXRMZWZ0UG9zaXRpb24oKSxcbiAgICAgIHRvcDogdGhpcy5nZXRUb3BQb3NpdGlvbigpLFxuICAgICAgd2lkdGg6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgZGVsYXk6IC4zLFxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgd2lkdGg6IFwiMTAwJVwiXG4gICAgICAgIH0pO1xuICAgICAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgICAgICB0b3A6IFwiNTAlXCIsXG4gICAgICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSkudG8odGhpcy4kc2VhcmNoRm9ybSwgLjQsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgICAgICBcInotaW5kZXhcIjogLTEsXG4gICAgICAgICAgXCJsZWZ0XCI6IDAsXG4gICAgICAgICAgXCJ0b3BcIjogMCxcbiAgICAgICAgICBcIndpZHRoXCI6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgICBcImhlaWdodFwiOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgfVxuXG4gIG9wZW5TZWFyY2goZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgLy8gcHJldmVudCBidXR0b24gZnJvbSBiZWluZyB1c2VkIG9uY2Ugc2VhcmNoIGlzIG9wZW5cbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyLmJsdXIoKTtcblxuICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgIGxlZnQ6IHRoaXMuZ2V0TGVmdFBvc2l0aW9uKCksXG4gICAgICB0b3A6IHRoaXMuZ2V0VG9wUG9zaXRpb24oKSxcbiAgICAgIHdpZHRoOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIFwiei1pbmRleFwiOiA5OTlcbiAgICB9KTtcblxuICAgIGxldCBhbmltYXRpb24gPSBuZXcgVGltZWxpbmVMaXRlKCk7XG5cbiAgICBhbmltYXRpb24udG8odGhpcy4kc2VhcmNoRm9ybSwgLjIsIHtcbiAgICAgIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjJcbiAgICB9KS50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgYmFja2dyb3VuZDogXCIjMzUzNzNEXCIsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgb3ZlcmZsb3dZOiBcInNjcm9sbFwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGljb24sIC4yLCB7XG4gICAgICB0b3A6IFwiMTEwJVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyLCAuMywge1xuICAgICAgdG9wOiBcIjMlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjIwJVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjQsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIGxvYWRlZFwiKTtcbiAgICAvLyB0aGlzLm9wZW5TZWFyY2goKTtcbiAgICB0aGlzLiRpbnB1dC5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIC8vIGlmIGtleSBpcyBlbnRlciAtIGFuaW1hdGUgb3V0XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gICAgXG4gICAgJChcImJvZHlcIikua2V5dXAoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAyNyAmJiB0aGlzLmlzT3BlbiApIHtcbiAgICAgICAgdGhpcy5jbG9zZVNlYXJjaChldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubGV0IFNlYXJjaEJveCA9IG5ldyBTZWFyY2hDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQm94OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQgU2VhcmNoQm94IGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5cbmludGVyZmFjZSBOYXZTdGF0ZSB7XG4gIG5hdkVuYWJsZWQ6IGJvb2xlYW47XG4gIG1vYmlsZTogYm9vbGVhbjtcbiAgdGFibGV0OiBib29sZWFuO1xuICBsYXB0b3A6IGJvb2xlYW47XG4gIGRlc2t0b3A6IGJvb2xlYW47XG59XG5cbmNsYXNzIE5hdkNvbXBvbmVudCB7XG4gICRuYXZUcmlnZ2VyOiBIVE1MRWxlbWVudDtcbiAgJG5hdkRyb3Bkb3duOiBIVE1MRWxlbWVudDtcbiAgJGxvd2VyQ29udGFpbmVyOiBKUXVlcnk7XG4gICR1cHBlckNvbnRhaW5lcjogSlF1ZXJ5O1xuICAkbmF2TWV0YTogSlF1ZXJ5O1xuICAkZHJvcERvd25XcmFwcGVyOiBKUXVlcnk7XG4gICRzZWFyY2g6IEpRdWVyeTtcbiAgJGRyb3BEb3duQ29udGVudDogSlF1ZXJ5O1xuXG4gIHN0YXRlOiBOYXZTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuJG5hdlRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJldC1kcm9wZG93bi10cmlnZ2VyXCIpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyID0gJChcIi5sb3dlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lciA9ICQoXCIudXBwZXJjb250YWluZXJcIik7XG4gICAgdGhpcy4kbmF2TWV0YSA9ICQoXCIuZXQtbmF2LW1ldGFcIik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyID0gJChcIi5ldC1kcm9wZG93bi13cmFwcGVyXCIpO1xuICAgIHRoaXMuJHNlYXJjaCA9ICQoXCIjbmF2LXhmZXJcIik7XG4gICAgdGhpcy4kZHJvcERvd25Db250ZW50ID0gJChcIi5ldC1kcm9wZG93bi1jb250ZW50XCIpO1xuXG4gICAgLypcbiAgICAgTmF2IFN0YXRlIE9iamVjdFxuICAgICAqL1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG5cbiAgLy8gTm90IHVzZWRcbiAgcmVsb2FkKCkge1xuXG4gICAgdGhpcy4kbmF2VHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LXRyaWdnZXJcIik7XG4gICAgdGhpcy4kbmF2RHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV0LWRyb3Bkb3duLXRyaWdnZXJcIik7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIgPSAkKFwiLmxvd2VyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyID0gJChcIi51cHBlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiRuYXZNZXRhID0gJChcIi5ldC1uYXYtbWV0YVwiKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIgPSAkKFwiLmV0LWRyb3Bkb3duLXdyYXBwZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoID0gJChcIiNuYXYteGZlclwiKTtcbiAgICB0aGlzLiRkcm9wRG93bkNvbnRlbnQgPSAkKFwiLmV0LWRyb3Bkb3duLWNvbnRlbnRcIik7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICBkZXNrdG9wOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG5cbiAgLypcbiAgIE1vYmlsZSBOYXYgZnVuY3Rpb25hbGl0eVxuICAgKi9cbiAgb3Blbk5hdiggZXZlbnQ6IEV2ZW50ICk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAkKHRoaXMuJG5hdkRyb3Bkb3duKS5hZGRDbGFzcyhcIm1lbnUtaXMtYWN0aXZlXCIpO1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuJG5hdkRyb3Bkb3duLCAuMywge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgY2xvc2VOYXYoIGV2ZW50OiBFdmVudCApOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICQodGhpcy4kbmF2RHJvcGRvd24pLnJlbW92ZUNsYXNzKFwibWVudS1pcy1hY3RpdmVcIik7XG4gICAgVHdlZW5NYXgudG8odGhpcy4kbmF2RHJvcGRvd24sIC4zLCB7XG4gICAgICAgIHRvcDogXCItMTAwJVwiLFxuICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmF2T3BlbkluaXQoIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJCh0aGlzLiRuYXZUcmlnZ2VyKS5vbihcImNsaWNrXCIsIHRoaXMub3Blbk5hdi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzLiRuYXZUcmlnZ2VyKS5vZmYoKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5hdkNsb3NlKCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuXG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJChcIiNuYXYtY2xvc2VcIikub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlTmF2LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI25hdi1jbG9zZVwiKS5vZmYoKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5hdkl0ZW1DbGljayggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcblxuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5jaGlsZHJlbihcImFcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAkKHRoaXMpO1xuICAgICAgICBzZWxlY3RlZC5uZXh0KFwidWxcIikucmVtb3ZlQ2xhc3MoXCJpcy1oaWRkZW5cIikucGFyZW50KFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikucGFyZW50KFwidWxcIikuYWRkQ2xhc3MoXCJtb3ZlLW91dFwiKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikuY2hpbGRyZW4oXCJhXCIpLm9mZigpO1xuICAgIH1cblxuICB9XG5cbiAgZ29iYWNrKCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuXG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJChcIi5nby1iYWNrID4gYVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9ICQodGhpcyk7XG4gICAgICAgIHNlbGVjdGVkLnBhcmVudChcImxpXCIpLnBhcmVudChcIi5ldC1zZWNvbmRhcnktZHJvcGRvd25cIikuYWRkQ2xhc3MoXCJpcy1oaWRkZW5cIikucGFyZW50KFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikucGFyZW50KFwidWxcIikucmVtb3ZlQ2xhc3MoXCJtb3ZlLW91dFwiKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiLmdvLWJhY2sgPiBhXCIpLm9mZigpO1xuICAgIH1cblxuXG4gIH1cblxuICBtb3ZlTmF2aWdhdGlvbk1vYmlsZSgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiBtb2JpbGVcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guZGV0YWNoKCk7XG4gICAgdGhpcy4kbmF2TWV0YS5kZXRhY2goKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lci5kZXRhY2goKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIuZGV0YWNoKCk7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIuaW5zZXJ0QWZ0ZXIodGhpcy4kdXBwZXJDb250YWluZXIpO1xuICAgIHRoaXMuJG5hdk1ldGEuaW5zZXJ0QmVmb3JlKHRoaXMuJHVwcGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lci5hcHBlbmQodGhpcy4kZHJvcERvd25XcmFwcGVyKTtcbiAgICB0aGlzLiRuYXZNZXRhLmFwcGVuZCh0aGlzLiRzZWFyY2gpO1xuICB9XG5cbiAgbW92ZU5hdmlnYXRpb25UYWJsZXQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJtb3ZlIG5hdmlnYXRpb24gdGFibGV0XCIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLmRldGFjaCgpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyLmRldGFjaCgpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRuYXZNZXRhKTtcbiAgICAvLyB0aGlzLiR1cHBlckNvbnRhaW5lci5hcHBlbmQodGhpcy4kbG93ZXJDb250YWluZXIpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlci5pbnNlcnRBZnRlcih0aGlzLiR1cHBlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyLnByZXBlbmQodGhpcy4kc2VhcmNoKTtcbiAgfVxuXG4gIG1vdmVOYXZpZ2F0aW9uRGVrc3RvcCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiBkZXNrdG9wXCIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLmluc2VydEJlZm9yZSh0aGlzLiRkcm9wRG93bkNvbnRlbnQpO1xuXG4gIH1cblxuICBkaXNhYmxlTW9iaWxlTmF2KCkge1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJOYXYgdHVybmVkIG9mZlwiKTtcbiAgICB0aGlzLm5hdk9wZW5Jbml0KGZhbHNlKTtcbiAgICB0aGlzLm5hdkNsb3NlKGZhbHNlKTtcbiAgICB0aGlzLm5hdkl0ZW1DbGljayhmYWxzZSk7XG4gICAgdGhpcy5nb2JhY2soZmFsc2UpO1xuICAgIHRoaXMuc3RhdGUubmF2RW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgLypcbiAgICAgUmVtb3ZlIFN0eWxlcyBmcm9tIGVsZW1lbnQgJiByZXNldCBkcm9wZG93blxuICAgICAqL1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duQ29udGVudC5yZW1vdmVDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgIGxldCBkcm9wZG93biA9IHRoaXMuJGRyb3BEb3duQ29udGVudC5maW5kKFwiLmV0LXNlY29uZGFyeS1kcm9wZG93blwiKTtcblxuICAgIGRyb3Bkb3duLmVhY2goKGluZGV4LCBlbGVtKT0+e1xuICAgICAgaWYgKCAhJChlbGVtKS5oYXNDbGFzcyhcImlzLWhpZGRlblwiKSApIHtcbiAgICAgICAgJChlbGVtKS5hZGRDbGFzcyhcImlzLWhpZGRlblwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgZW5hYmxlTW9iaWxlTmF2KCkge1xuICAgIGNvbnNvbGUubG9nKFwiTmF2IHR1cm5lZCBvblwiKTtcbiAgICB0aGlzLm5hdk9wZW5Jbml0KHRydWUpO1xuICAgIHRoaXMubmF2Q2xvc2UodHJ1ZSk7XG4gICAgdGhpcy5uYXZJdGVtQ2xpY2sodHJ1ZSk7XG4gICAgdGhpcy5nb2JhY2sodHJ1ZSk7XG5cbiAgICB0aGlzLnN0YXRlLm5hdkVuYWJsZWQgPSB0cnVlO1xuXG4gIH1cblxuICBicmVha1BvaW50TW9iaWxlKCkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBNb2JpbGVcIik7XG5cbiAgICBpZiAoICF0aGlzLnN0YXRlLm5hdkVuYWJsZWQgKSB7XG4gICAgICB0aGlzLmVuYWJsZU1vYmlsZU5hdigpO1xuICAgIH1cbiAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uTW9iaWxlKCk7XG4gIH1cblxuICBicmVha1BvaW50VGFibGV0KCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IFRhYmxldFwiKTtcbiAgICBpZiAoICF0aGlzLnN0YXRlLm5hdkVuYWJsZWQgKSB7XG4gICAgICB0aGlzLmVuYWJsZU1vYmlsZU5hdigpO1xuICAgIH1cblxuICAgIHRoaXMubW92ZU5hdmlnYXRpb25UYWJsZXQoKTtcbiAgfVxuXG4gIGJyZWFrUG9pbnRMYXB0b3AoIHByZXZTdGF0ZSApIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgTGFwdG9wXCIpO1xuXG4gICAgaWYgKCB0aGlzLnN0YXRlLm5hdkVuYWJsZWQgKSB7XG4gICAgICB0aGlzLmRpc2FibGVNb2JpbGVOYXYoKTtcbiAgICB9XG5cbiAgICAvLyBpZiBwcmV2IHN0YXRlIHdhcyB0YWJsZXQgZG8gdGhpczpcbiAgICBpZiAoIHByZXZTdGF0ZS5kZXNrdG9wID09PSBmYWxzZSB8fCBwcmV2U3RhdGUubW9iaWxlID09PSB0cnVlICkge1xuXG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uVGFibGV0KCk7XG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uRGVrc3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIGJyZWFrUG9pbnREZXNrdG9wKCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IERlc2t0b3BcIik7XG5cbiAgICBpZiAoIHByZXZTdGF0ZS5sYXB0b3AgPT09IGZhbHNlIHx8IHByZXZTdGF0ZS5tb2JpbGUgPT09IHRydWUgKSB7XG5cbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25UYWJsZXQoKTtcbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25EZWtzdG9wKCk7XG4gICAgfVxuXG4gIH1cblxuICBuYXZSZXNpemUoKSB7XG4gICAgLypcbiAgICAgTW9iaWxlXG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubW9iaWxlICkge1xuXG4gICAgICBpZiAoICF0aGlzLnN0YXRlLm1vYmlsZSApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50TW9iaWxlKCk7XG4gICAgICB9XG4gICAgICAvLyBUdXJuIG1vYmlsZSBvblxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IHRydWUsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8qXG4gICAgIFRhYmxldFxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLnRhYmxldCApIHtcbiAgICAgIGxldCBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlO1xuICAgICAgLy8gdGFibGV0IGFuZCBoaWdoZXJcbiAgICAgIC8vIGRvIG9uY2VcbiAgICAgIGlmICggIXRoaXMuc3RhdGUudGFibGV0ICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRUYWJsZXQocHJldlN0YXRlKTtcbiAgICAgIH1cbiAgICAgIC8vIFR1cm4gbW9iaWxlIG9uXG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogdHJ1ZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgTGFwdG9wXG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICBpZiAoICF0aGlzLnN0YXRlLmxhcHRvcCApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50TGFwdG9wKHByZXZTdGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IHRydWUsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgRGVza3RvcFxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmRlc2t0b3AgKSB7XG5cbiAgICAgIGxldCBwcmV2U3RhdGUgPSB0aGlzLnN0YXRlO1xuXG4gICAgICBpZiAoICF0aGlzLnN0YXRlLmRlc2t0b3AgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludERlc2t0b3AocHJldlN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgbmF2TG9hZCgpIHtcbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5tb2JpbGUgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludE1vYmlsZSgpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiB0cnVlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcblxuICAgIH1cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLnRhYmxldCApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50VGFibGV0KHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiB0cnVlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludExhcHRvcCh0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IHRydWUsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmRlc2t0b3AgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludERlc2t0b3AodGhpcy5zdGF0ZSk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiTmF2IGxvYWRlZFwiKTtcblxuICAgIHRoaXMubmF2TG9hZCgpO1xuICAgIC8vIFNlYXJjaEJveC5pbml0KCk7XG5cbiAgICAvKioqKioqKioqKioqKioqKlxuICAgICBOQVYgUkVTSVpFIEVWRU5UXG4gICAgICoqKioqKioqKioqKioqKi9cblxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9ICggZXZlbnQgKSA9PiB7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICAgID8gc2V0VGltZW91dCh0aGlzLm5hdlJlc2l6ZS5iaW5kKHRoaXMpLCAzMDApXG4gICAgICAgIDogd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLm5hdlJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG5cbiAgfVxufVxuXG5sZXQgTmF2ID0gbmV3IE5hdkNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBOYXY7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmRlY2xhcmUgdmFyIElzb3RvcGU6IGFueTtcblxuY2xhc3MgR2FsbGVyeUNvbXBvbmVudCB7XG5cbiAgZ3JpZElkOiBzdHJpbmc7XG4gIGdhbGxlcnlfZ3JpZDogbnVtYmVyO1xuICBnYWxsZXJ5X3dyYXBwZXJfd2lkdGg6IG51bWJlcjtcbiAgJGZ1bGxHcmlkOiBKUXVlcnk7XG4gICRnYWxsZXJ5Q29udGFpbmVyOiBKUXVlcnk7XG4gICRncmlkOiBhbnk7XG4gIGN1cnJlbnRIZWlnaHQ6IHN0cmluZztcbiAgY3VycmVudEhlaWdodFBYOiBudW1iZXI7XG4gIHJlSXNvVGltZU91dDogbnVtYmVyO1xuICBpc0NvbnRhaW5lZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmdyaWRJZCA9ICQoXCIuaW5uZXItY29udGVudC1tb2R1bGVcIikuY2hpbGRyZW4oXCJkaXZcIikuYXR0cihcImlkXCIpO1xuICAgIHRoaXMuJGZ1bGxHcmlkID0gJChcIiNcIiArIHRoaXMuZ3JpZElkKTtcbiAgICB0aGlzLiRnYWxsZXJ5Q29udGFpbmVyID0gJChcIi5nYWxsZXJ5LWNvbnRhaW5lclwiKTtcbiAgfVxuXG4gIHNldHVwSXNvdG9wZSgpIHtcbiAgICAvLyBpbml0IGlzb3RvcGVcbiAgICB0aGlzLiRncmlkID0gdGhpcy4kZnVsbEdyaWQuaXNvdG9wZSh7XG4gICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gICAgICBpdGVtU2VsZWN0b3I6IFwiLmdhbGxlcnktaXRlbVwiLFxuICAgICAgaXNJbml0TGF5b3V0OiBmYWxzZSxcbiAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgXCJjb2x1bW5XaWR0aFwiOiBcIi5ncmlkLXNpemVyXCJcbiAgICAgIH0sXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246IFwiLjNzXCJcbiAgICB9KTtcbiAgfVxuXG4gIGdhbGxlcnlJc290b3BlV3JhcHBlcigpIHtcbiAgICBsZXQgd2luZG93V2lkdGhSZWYgPSAkKHdpbmRvdykuaW5uZXJXaWR0aCgpOyAvLyBmb3Igc2Nyb2xsIGJhciBmaXggY3VycmVudGx5XG5cbiAgICAvLyBJcyBjb250YWluZXIgb3IgZnVsbCB3aWR0aD9cbiAgICBpZiAoIHRoaXMuJGdhbGxlcnlDb250YWluZXIuaGFzQ2xhc3MoXCJjb250YWluZXJcIikgKSB7XG4gICAgICB0aGlzLmlzQ29udGFpbmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvL1xuICAgIGlmICggd2luZG93V2lkdGhSZWYgPiAxNjAwICYmIHRoaXMuaXNDb250YWluZWQgPT09IGZhbHNlICkge1xuICAgICAgY29uc29sZS5sb2coXCJncmlkIDVcIik7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDU7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gNjAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAxO1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDk5MSApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMjtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSAxMTk5ICkge1xuICAgICAgY29uc29sZS5sb2coXCJncmlkIDNcIik7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ3JpZCA0XCIpO1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA0O1xuICAgIH1cblxuICAgIGlmICggJChcIi5nYWxsZXJ5LTMtZ3JpZFwiKS5sZW5ndGggPiAwICYmIHdpbmRvd1dpZHRoUmVmID4gMTI0OCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMztcbiAgICB9XG5cbiAgICBpZiAoICQoXCIuZ2FsbGVyeS00LWdyaWRcIikubGVuZ3RoID4gMCAmJiB3aW5kb3dXaWR0aFJlZiA+IDE1ODQgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDQ7XG4gICAgfVxuXG4gICAgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggPSAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLndpZHRoKCk7XG5cbiAgICBpZiAoIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICUgdGhpcy5nYWxsZXJ5X2dyaWQgPiAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggPSB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCArICggdGhpcy5nYWxsZXJ5X2dyaWQgLSB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCAlIHRoaXMuZ2FsbGVyeV9ncmlkKTtcbiAgICB9XG4gICAgJChcIi5nYWxsZXJ5LWlzb3RvcGVcIikuY3NzKFwid2lkdGhcIiwgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeV9ncmlkO1xuICB9XG5cbiAgcmVsb2FkSXNvdG9wKCkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZSgpO1xuICAgIHRoaXMuc2V0TWluSGVpZ2h0KCk7XG4gIH1cblxuICBzZXRNaW5IZWlnaHQoKSB7XG5cbiAgICAvLyBTZXQgbWluIGhlaWdodCBkZXBlbmRpbmcgb25lIHdoYXQgY29udGVudCB3YXMgZmlsdGVyZWRcbiAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSAkKFwiLmdhbGxlcnktaXRlbS53aWR0aDFcIikuY3NzKFwicGFkZGluZy1ib3R0b21cIik7XG4gICAgbGV0IGhlaWdodFN0ciA9IHRoaXMuY3VycmVudEhlaWdodC50b1N0cmluZygpO1xuICAgIHRoaXMuY3VycmVudEhlaWdodFBYID0gdGhpcy5weENvbnZlcnQoaGVpZ2h0U3RyKTtcblxuICAgIGlmICggdGhpcy5jdXJyZW50SGVpZ2h0UFggIT09IDAgKSB7XG5cbiAgICAgICQoXCIuZ2FsbGVyeS1pc290b3BlXCIpLmNzcyhcIm1pbi1oZWlnaHRcIiwgTWF0aC5yb3VuZCh0aGlzLmN1cnJlbnRIZWlnaHRQWCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmN1cnJlbnRIZWlnaHRQWCA9ICQoXCIuZ2FsbGVyeS1pdGVtLndpZHRoMVwiKS5oZWlnaHQoKTtcblxuICAgICAgJChcIi5nYWxsZXJ5LWlzb3RvcGVcIikuY3NzKFwibWluLWhlaWdodFwiLCBNYXRoLnJvdW5kKHRoaXMuY3VycmVudEhlaWdodFBYKSk7XG4gICAgfVxuICB9XG5cbiAgcHhDb252ZXJ0KCBvYmplY3RIZWlnaHQ6IHN0cmluZyApIHtcbiAgICByZXR1cm4gcGFyc2VJbnQob2JqZWN0SGVpZ2h0LnNsaWNlKDAsIC0yKSk7XG4gIH1cblxuICBhZGRJbWFnZVRyYW5zaXRpb24oKSB7XG4gICAgLy8gYWRkIHRyYW5zaXRpb24gZm9yIGludHJvIGFuaW1hdGlvblxuICAgICQoXCIuZ2FsbGVyeS1pdGVtXCIpLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIiwgXCI2MDBtc1wiKTtcbiAgfVxuXG4gIGxvYWRJbWFnZXNJbigpIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoXCJvbmNlXCIsIFwiYXJyYW5nZUNvbXBsZXRlXCIsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gZmFkZSBpblxuICAgICAgJChcIi5nYWxsZXJ5LWl0ZW1cIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAgIC8vIHJlbW92ZSBhbmltYXRpb24gZm9yIHNtb290aCBmaWx0ZXJpbmdcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiLmdhbGxlcnktaXRlbVwiKS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiMG1zXCIpO1xuICAgICAgfSwgNTAwKTtcblxuICAgIH0pO1xuICB9XG5cbiAgb25SZXNpemUoKSB7XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZUlzb1RpbWVPdXQpO1xuXG4gICAgLy8gZ2FsbGVyeSBpc290b3BlXG4gICAgaWYgKCAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlJc290b3BlV3JhcHBlcigpO1xuXG4gICAgICAvLyBvbiByZXNpemUgY29tcGxldGUsIHJlYWRqdXN0IGdyaWRcbiAgICAgIHRoaXMucmVJc29UaW1lT3V0ID0gc2V0VGltZW91dCh0aGlzLnJlbG9hZElzb3RvcC5iaW5kKHRoaXMpLCA1MDApO1xuICAgIH1cbiAgfVxuXG4gIG9uRmlsdGVyQ2xpY2soIGVsLCBlbDIgKSB7XG4gICAgbGV0ICR0aGlzID0gJChlbDIudG9FbGVtZW50KTtcblxuICAgICR0aGlzLnBhcmVudCgpLmNoaWxkcmVuKFwibGlcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSk7XG5cbiAgICAkdGhpcy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgbGV0IGZpbHRlclZhbHVlID0gJHRoaXMuYXR0cihcImRhdGEtZmlsdGVyXCIpO1xuXG4gICAgdGhpcy5yZUZpbHRlcihmaWx0ZXJWYWx1ZSk7XG4gIH1cblxuICByZUZpbHRlciggaXRlbSApIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoe1xuICAgICAgZmlsdGVyOiBpdGVtXG4gICAgfSk7XG4gIH1cblxuICAvLyBHZXQgZ3JpZCB0byBhc3NpZ24gZHluYW1pY2FsbHlcblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiSXNvdG9wZSBJbml0XCIpO1xuXG4gICAgLy8gQWRkIHRyYW5zaXRpb24gdG8gYW5pbWF0ZSBpbWFnZSBpbiBncmFjZWZ1bGx5XG4gICAgdGhpcy5hZGRJbWFnZVRyYW5zaXRpb24oKTtcblxuICAgIC8vIFNldHVwIElzb3RvcGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgdGhpcy5zZXR1cElzb3RvcGUoKTtcblxuICAgIC8vIENyZWF0ZSBwZXJmZWN0IGdyaWRcbiAgICB0aGlzLmdhbGxlcnlJc290b3BlV3JhcHBlcigpO1xuXG4gICAgLy8gZGVsYXkgaXNvdG9wZSBpbml0IHVzaW5nIGhlbHBlciBmdW5jdGlvbiB0aGF0IGZpcmVzIG9uIHJlc2l6ZVxuICAgIHNldFRpbWVvdXQodGhpcy5yZWxvYWRJc290b3AuYmluZCh0aGlzKSwgMTAwMCk7XG5cbiAgICAvLyBBbmltYXRlIEltYWdlcyBpbiBvbkxvYWRcbiAgICB0aGlzLmxvYWRJbWFnZXNJbigpO1xuXG4gICAgLy8gQWRkIGZpbHRlciBvbiBDbGlja1xuICAgIGxldCAkdGhpcyA9IHRoaXM7XG4gICAgJChcIi5maWx0ZXItZ3JvdXBcIikub24oXCJjbGlja1wiLCBcImxpXCIsIHRoaXMub25GaWx0ZXJDbGljay5iaW5kKHRoaXMsICR0aGlzKSk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG59XG5cbmxldCBJc290b3BlR2FsbGVyeSA9IG5ldyBHYWxsZXJ5Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IElzb3RvcGVHYWxsZXJ5OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgU2xpZGVyQ29tcG9uZW50IHtcbiAgZ2FsbGVyeTogSlF1ZXJ5O1xuICBjb250YWluZXI6IEpRdWVyeTtcbiAgY2xvc2VCdG46IEpRdWVyeTtcbiAgbmV4dEJ0bjogSlF1ZXJ5O1xuICBwcmV2QnRuOiBKUXVlcnk7XG4gIGluZGV4OiBudW1iZXI7XG4gIGN1cnJlbnRTbGlkZTogbnVtYmVyO1xuICB0b3RhbFNsaWRlOiBudW1iZXI7XG4gIGNvdW50VG90YWw6IEpRdWVyeTtcbiAgY3VycmVudENvdW50OiBKUXVlcnk7XG4gIHNsaWRlck9wZW46IGJvb2xlYW47XG4gIHJlc2l6ZVRpbWVyOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoIGVsICkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChlbCk7XG4gICAgdGhpcy5nYWxsZXJ5ID0gdGhpcy5jb250YWluZXIuZmluZChcIi5oZWFkZXItc2xpZGVyLWdhbGxlcnlcIik7XG4gICAgdGhpcy5jbG9zZUJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuaGVhZGVyLXNsaWRlci1jbG9zZVwiKTtcbiAgICB0aGlzLm5leHRCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNsaWRlci1uYXZpZ2F0aW9uLW5leHRcIik7XG4gICAgdGhpcy5wcmV2QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zbGlkZXItbmF2aWdhdGlvbi1wcmV2XCIpO1xuICAgIHRoaXMuY291bnRUb3RhbCA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIudG90YWxcIik7XG4gICAgdGhpcy5jdXJyZW50Q291bnQgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmN1cnJlbnRcIik7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gICAgdGhpcy5jdXJyZW50U2xpZGUgPSB0aGlzLmluZGV4ICsgMTtcbiAgICB0aGlzLnNsaWRlck9wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy5nYWxsZXJ5LmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRUb3RhbFNsaWRlcygpOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IHRoaXMuZ2FsbGVyeS5jaGlsZHJlbihcImxpXCIpLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTbGlkZTtcbiAgfVxuXG4gIHVwZGF0ZUN1cnJlbnRTbGlkZSggZXZlbnQgKSB7XG5cbiAgICBpZiAoIGV2ZW50ID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICB0aGlzLmluZGV4Kys7XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZSsrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluZGV4LS07XG4gICAgICB0aGlzLmN1cnJlbnRTbGlkZS0tO1xuICAgIH1cblxuICB9XG5cbiAgc2V0TnVtYmVyKCBjb3VudDogbnVtYmVyICk6IHN0cmluZyB7XG4gICAgLy8gY29udmVyIG51bWJlciB0byBzdHJpbmdcbiAgICBsZXQgdG90YWwgPSBjb3VudDtcbiAgICByZXR1cm4gdG90YWwudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHVwZGF0ZU5hdiggaW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IEpRdWVyeSApIHtcblxuICAgIC8vIHVwZGF0ZSBudW1iZXJzIG9uIHNjcmVlblxuICAgIHRoaXMuY3VycmVudENvdW50Lmh0bWwodGhpcy5zZXROdW1iZXIodGhpcy5nZXRDdXJyZW50U2xpZGVDb3VudCgpKSk7XG5cbiAgICAvLyBFbmFibGUvRGlzYWJsZSBhcnJvdyBidG5zXG4gICAgdGhpcy5wcmV2QnRuLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpmaXJzdC1jaGlsZFwiKSk7XG4gICAgdGhpcy5uZXh0QnRuLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpsYXN0LWNoaWxkXCIpKTtcbiAgfVxuXG4gIHVwZGF0ZVNsaWRlKCBkaXJlY3Rpb24gKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCk7XG5cbiAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuICAgICAgLy8gcmVtb3ZlIGN1cnJlbnRseSBzZWxlY3RlZCBjbGFzcywgdGhlbiBtb3ZlIGxlZnRcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIGN1cnJlbnRTbGlkZS5uZXh0KCkuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVtb3ZlIGN1cnJlbnRseSBzZWxlY3RlZCBjbGFzcywgdGhlbiBtb3ZlIGxlZnRcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgY3VycmVudFNsaWRlLnByZXYoKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgaW5kZXhcbiAgICB0aGlzLnVwZGF0ZUN1cnJlbnRTbGlkZShkaXJlY3Rpb24pO1xuXG4gICAgLy8gdXBkYXRlIE5hdmlnYXRpb25cbiAgICB0aGlzLnVwZGF0ZU5hdih0aGlzLmluZGV4LCB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKSk7XG4gIH1cblxuICBhcnJvd0hhbmRsZXIoIGV2ZW50ICkge1xuXG4gICAgLy8gY2hlY2sgd2hpY2gga2V5IHdhcyBwcmVzc2VkIGFuZCBtYWtlIHN1cmUgdGhlIHNsaWRlIGlzbid0IHRoZSBiZWdpbm5pbmcgb3IgdGhlIGxhc3Qgb25lXG4gICAgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwicmlnaHRcIiAmJiB0aGlzLmN1cnJlbnRTbGlkZSAhPT0gdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuXG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCAmJiB0aGlzLnNsaWRlck9wZW4gKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPD0gVXRpbHMuYnBzLnRhYmxldCApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcImxlZnRcIiAmJiB0aGlzLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgJiYgdGhpcy5zbGlkZXJPcGVuICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIH0gZWxzZSBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPD0gVXRpbHMuYnBzLnRhYmxldCApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9wZW5TbGlkZXIoIGVsLCBldmVudCApIHtcbiAgICAvLyBlbCA9IHRoaXNcbiAgICAvLyBlbDIgaXMgZXZlbnRcbiAgICBpZiAoICF0aGlzLmNvbnRhaW5lci5oYXNDbGFzcyhcImlzLWFjdGl2ZVwiKSAmJiAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmlzKHRoaXMuZ2FsbGVyeSkgKSB7XG5cbiAgICAgIHRoaXMuc2xpZGVyT3BlbiA9IHRydWU7XG5cbiAgICAgIHRoaXMuY29udGFpbmVyLmFkZENsYXNzKFwiaXMtYWN0aXZlXCIpLm9uZShcIndlYmtpdFRyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmRcIiwgKCkgPT4ge1xuICAgICAgICAkKFwiYm9keSxodG1sXCIpLmFuaW1hdGUoeyBcInNjcm9sbFRvcFwiOiB0aGlzLmNvbnRhaW5lci5vZmZzZXQoKS50b3AgfSwgMjAwKTtcblxuICAgICAgICAvLyBDbG9zZSBCdG4gYW5pbWF0ZSBpblxuICAgICAgICBsZXQgY2xvc2VCdG5BbmltYXRpb24gPSBUd2Vlbk1heC50byh0aGlzLmNsb3NlQnRuLCAuMywge1xuICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICB4OiAtMzAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgICAgICBkZWxheTogLjNcbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlU2xpZGVyKCBlICkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImlzLWFjdGl2ZVwiKTtcblxuICAgIHRoaXMuc2xpZGVyT3BlbiA9IGZhbHNlO1xuXG4gICAgVHdlZW5MaXRlXG4gICAgICAudG8oJCh3aW5kb3cpLCAuNSxcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvOiB7IHk6IDAgfSwgZWFzZTogUG93ZXIyLmVhc2VPdXQsXG4gICAgICAgICAgZGVsYXk6IC41XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICBsZXQgY2xvc2VCdG5BbmltYXRpb24gPSBUd2Vlbk1heC50byh0aGlzLmNsb3NlQnRuLCAuMywge1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIHo6IC4wMDEsXG4gICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0LFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICBUd2Vlbk1heC50byh0aGlzLmNsb3NlQnRuLCAuMywge1xuICAgICAgICAgIHJpZ2h0OiA1MFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrU2l6ZSgpIHtcblxuICAgIC8vIE9uIHJlc2l6ZSBlbmQgLSBjaGVjayB0byBlbmFibGUgY2xpY2tzIGZvciBkZXNrdG9wIG9yIHJlbW92ZSB0aGVtXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuICAgIHRoaXMucmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gdGhpcztcbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgICB0aGlzLmdhbGxlcnkub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TbGlkZXIuYmluZCh0aGlzLCAkdGhpcykpO1xuICAgICAgICB0aGlzLmNsb3NlQnRuLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVNsaWRlci5iaW5kKHRoaXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeS5vZmYoKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5vZmYoKTtcbiAgICAgIH1cblxuICAgIH0sIDQwMCk7XG5cbiAgfVxuXG4gIGluaXQoKSB7XG5cbiAgICAvLyBDcmVhdGUgQmluZGluZyBFdmVudHNcbiAgICB0aGlzLmNoZWNrU2l6ZSgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG4gICAgLy8gTGVmdCBhbmQgcmlnaHQgZXZlbnRzXG4gICAgdGhpcy5uZXh0QnRuLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcInJpZ2h0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5wcmV2QnRuLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcImxlZnRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIC8vIEpxdWVyeSBrZXlzIHBsdWdpblxuICAgICQoZG9jdW1lbnQpXG4gICAgICAuYmluZChcImtleWRvd25cIiwgXCJsZWZ0XCIsIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpXG4gICAgICAuYmluZChcImtleWRvd25cIiwgXCJlc2NcIiwgdGhpcy5jbG9zZVNsaWRlci5iaW5kKHRoaXMpKVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwicmlnaHRcIiwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAvLyB1cGRhdGUgbmF2IG9uIGZpcnN0IGxvYWRcbiAgICB0aGlzLnVwZGF0ZU5hdih0aGlzLmluZGV4LCB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKSk7XG5cbiAgICAvLyBzZXQgdG90YWwgc2xpZGVzIG51bWJlclxuICAgIHRoaXMuY291bnRUb3RhbC5odG1sKHRoaXMuc2V0TnVtYmVyKHRoaXMuZ2V0VG90YWxTbGlkZXMoKSkpO1xuICB9XG59XG5cbi8vIGxvb3AgdGhyb3VnaCBlYWNoIGhlYWRlciBzbGlkZXIgb2JqZWN0IG9uIHRoZSBwYWdlXG5jbGFzcyBIZWFkZXJTbGlkZXJDb21wb25lbnQge1xuXG4gIGl0ZW1JbmZvV3JhcHBlcjogSlF1ZXJ5O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXRlbUluZm9XcmFwcGVyID0gJChcIi5oZWFkZXItc2xpZGVyLWNvbnRhaW5lclwiKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJIZWFkZXIgU2xpZGVyIGluaXRcIik7XG5cbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlci5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAvLyBQYXNzIFwidGhpc1wiIHRvIGVhY2ggbmV3IEhlYWRlciBzbGlkZXIgY29tcG9uZW50XG4gICAgICBsZXQgc2xpZGVyID0gbmV3IFNsaWRlckNvbXBvbmVudChlbCk7XG4gICAgICBzbGlkZXIuaW5pdCgpO1xuICAgIH0pO1xuICB9XG5cbn1cblxubGV0IEhlYWRlclNsaWRlciA9IG5ldyBIZWFkZXJTbGlkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyU2xpZGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuXG5jbGFzcyBTdmdIZWFkZXJDb21wb25lbnQge1xuICBzdmc6IEpRdWVyeTtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIHdpbmRvdzogSlF1ZXJ5O1xuICB3aW5XaWR0aDogbnVtYmVyO1xuICBwcm9wb3J0aW9uOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zdmcgPSAkKFwiLmRpdmlkZXItc3ZnXCIpO1xuICAgIHRoaXMud2luZG93ID0gJCh3aW5kb3cpO1xuICAgIHRoaXMucHJvcG9ydGlvbiA9IDE4O1xuICAgIHRoaXMud2luV2lkdGggPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53aW5XaWR0aCAvIHRoaXMucHJvcG9ydGlvbjtcbiAgfVxuXG4gIF9zZXRXaW5kb3dXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiAkKHdpbmRvdykud2lkdGgoKTtcbiAgfVxuXG4gIF9zZXRTdmdIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBsZXQgaGVpZ2h0ID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKSAvIDE4O1xuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuXG4gIHJlc2l6ZVN2ZygpIHtcblxuICAgIHRoaXMud2luV2lkdGggPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5fc2V0U3ZnSGVpZ2h0KCk7XG5cbiAgICAvLyBzZXQgd2lkdGggb2YgaXRlbVxuICAgIC8vIHRoaXMuc3ZnLmF0dHIoXCJ3aWR0aFwiLCB0aGlzLndpbldpZHRoKTtcbiAgICB0aGlzLnN2Zy5jc3MoXCJ3aWR0aFwiLCB0aGlzLndpbldpZHRoKTtcblxuICAgIC8vIHNldCBoZWlnaHQgcHJvcG9ydGlvbiBvZiAyOFxuICAgIHRoaXMuc3ZnLmF0dHIoXCJoZWlnaHRcIiwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuc3ZnLmhlaWdodCh0aGlzLmhlaWdodCk7XG4gIH1cblxuICBhbmltYXRlSW4oKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJBbmltYXRlIEluXCIpO1xuXG4gICAgdGhpcy5zdmcgPSAkKFwiLmRpdmlkZXItc3ZnXCIpO1xuICAgIHRoaXMucHJvcG9ydGlvbiA9IDE4O1xuICAgIHRoaXMud2luZG93ID0gJCh3aW5kb3cpO1xuICAgIHRoaXMud2luV2lkdGggPSB0aGlzLndpbmRvdy53aWR0aCgpO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53aW5XaWR0aCAvIHRoaXMucHJvcG9ydGlvbjtcblxuICAgIC8vIHNldCB3aWR0aCBvZiBpdGVtXG4gICAgdGhpcy5zdmcuYXR0cihcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuXG4gICAgLy8gc2V0IGhlaWdodCBwcm9wb3J0aW9uIG9mIDI4XG4gICAgdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zdmcuaGVpZ2h0KHRoaXMuaGVpZ2h0KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLnN2ZywgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0LFxuICAgICAgYm90dG9tOiBcIi0zcHhcIixcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJTdmcgaGVhZGVyIGxvYWRlZFwiKTtcblxuICAgIC8vIHRoaXMuc3ZnLmhlaWdodCh0aGlzLl9zZXRTdmdIZWlnaHQoKSk7XG4gICAgLy8gdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLl9zZXRTdmdIZWlnaHQoKSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy5zdmcsIC4xLCB7XG4gICAgICB5OiBcIjNcIixcbiAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgd2lkdGg6IHRoaXMuX3NldFdpbmRvd1dpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuX3NldFN2Z0hlaWdodCgpLFxuICAgICAgZGVsYXk6IDAsXG4gICAgICBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiXG4gICAgfSk7XG5cblxuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMucmVzaXplU3ZnLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IFN2Z0hlYWRlciA9IG5ldyBTdmdIZWFkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3ZnSGVhZGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG4vLyBUT0RPOiBTaWRlYmFyIGltYWdlIGxvYWRpbmdcbmNsYXNzIEltYWdlTG9hZGVyQ29tcG9uZW50IHtcbiAgYXJyOiBzdHJpbmdbXTtcbiAgYm9keTogSlF1ZXJ5O1xuICBjb250ZW50OiBKUXVlcnk7XG4gIGhlcm86IEpRdWVyeTtcbiAgaGFzSGVybzogbnVtYmVyO1xuICBiZ0ltYWdlOiBKUXVlcnk7XG4gIGhhc0JnSW1hZ2U6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFyciA9IFtdO1xuICAgIHRoaXMuYm9keSA9ICQoXCJib2R5XCIpO1xuICAgIHRoaXMuY29udGVudCA9ICQoXCIjY29udGVudFwiKTtcbiAgICB0aGlzLmhlcm8gPSAkKFwiLmhlcm9cIik7XG4gICAgdGhpcy5oYXNIZXJvID0gdGhpcy5oZXJvLmxlbmd0aDtcbiAgICB0aGlzLmJnSW1hZ2UgPSAkKFwiLmltZy1sb2FkZXItYmdcIik7XG4gICAgdGhpcy5oYXNCZ0ltYWdlID0gdGhpcy5iZ0ltYWdlLmxlbmd0aDtcbiAgfVxuXG4gIGFuaW1hdGVCbG9nUHJpbWFyeSgpOiB2b2lkIHtcbiAgICBsZXQgYmxvZ1ByaW1hcnkgPSAkKFwiLnByaW1hcnlcIik7XG4gICAgbGV0IGJsb2dCZ0ltYWdlID0gYmxvZ1ByaW1hcnkuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKTtcblxuICAgIGlmICggYmxvZ0JnSW1hZ2UgIT09IFwibm9uZVwiICkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgVHdlZW5MaXRlXG4gICAgICAgICAgLnRvKGJsb2dQcmltYXJ5LCAuMyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgejogXCIuMDAxXCIsXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlXG4gIC8vIGFuaW1hdGVIZXJvSGVhZGVyKCk6IHZvaWQge1xuICAvLyAgIGxldCBiID0gdGhpcy5oZXJvLmZpbmQoXCIuaGVyby1iYWNrZ3JvdW5kXCIpLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIik7XG4gIC8vXG4gIC8vICAgaWYgKCBiICE9PSBcIm5vbmVcIiApIHtcbiAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAvL1xuICAvLyAgICAgICB0aGlzLmhlcm8uYWRkQ2xhc3MoXCJsb2FkZWRcIik7XG4gIC8vXG4gIC8vICAgICAgIFR3ZWVuTGl0ZVxuICAvLyAgICAgICAgIC50byh0aGlzLmhlcm8sIC40LFxuICAvLyAgICAgICAgICAge1xuICAvLyAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAvLyAgICAgICAgICAgfVxuICAvLyAgICAgICAgICk7XG4gIC8vICAgICB9LCAzMDApO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vXG4gIC8vICAgICB0aGlzLmhlcm8uYWRkQ2xhc3MoXCJsb2FkZWRcIik7XG4gIC8vXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgYW5pbWF0ZUJsb2dBcnRpY2xlcygpOiB2b2lkIHtcbiAgICBsZXQgYW5pbWF0ZSA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5hcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICBhbmltYXRlLnRvKHRoaXMuYXJyWyBpIF0sIDAuMSwgeyBvcGFjaXR5OiBcIjFcIiwgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIiB9KTtcbiAgICB9XG4gIH1cblxuICBwcmVsb2FkSW1hZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuYXJyID0gW107XG5cbiAgICB0aGlzLmNvbnRlbnQuaW1hZ2VzTG9hZGVkKHsgYmFja2dyb3VuZDogdHJ1ZSB9LCAoKSA9PiB7XG5cbiAgICAgICAgLy8gQmxvZyBwcmltYXJ5IGFydGljbGVcbiAgICAgICAgdGhpcy5ib2R5Lmhhc0NsYXNzKFwiYmxvZ1wiKSA/IHRoaXMuYW5pbWF0ZUJsb2dQcmltYXJ5KCkgOiBcIlwiO1xuXG4gICAgICAgIC8vIEhlcm8gaGVhZGVyIGludHJvXG4gICAgICAgIC8vIHRoaXMuaGFzSGVybyA+IDAgPyB0aGlzLmFuaW1hdGVIZXJvSGVhZGVyKCkgOiBcIlwiO1xuICAgICAgICB0aGlzLmhhc0JnSW1hZ2UgPiAwID8gdGhpcy5iZ0ltYWdlLmFkZENsYXNzKFwibG9hZGVkXCIpIDogXCJcIjtcblxuICAgICAgfSlcbiAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCBpbnN0YW5jZSApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIGxvYWRlZFwiKTtcbiAgICAgIH0pXG4gICAgICAuZG9uZSgoIGluc3RhbmNlICkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBpbWFnZXMgc3VjY2Vzc2Z1bGx5IGxvYWRlZFwiKTtcblxuICAgICAgICAvLyBBbmltYXRpb24gZm9yIEJsb2cgaW5kZXggaG9tZXBhZ2VcbiAgICAgICAgdGhpcy5hbmltYXRlQmxvZ0FydGljbGVzKCk7XG4gICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoXCJpbWdMb2FkZWRcIik7XG4gICAgICAgIFxuICAgICAgICAvLyBFeGFtcGxlIG9uIGhvdyB0byB0cmlnZ2VyIGV2ZW50cyBlbHNld2hlcmVcbiAgICAgICAgLy8gJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coXCJpbWFnZSBsb2FkZWQgY3VzdG9tIGV2ZW50XCIpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgfSlcbiAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIGxvYWRlZCwgYXQgbGVhc3Qgb25lIGlzIGJyb2tlblwiKTtcbiAgICAgIH0pXG4gICAgICAucHJvZ3Jlc3MoKCBpbnN0YW5jZSwgaW1hZ2UgKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBpbWFnZS5pc0xvYWRlZCA/IFwibG9hZGVkXCIgOiBcImJyb2tlblwiO1xuXG4gICAgICAgIGlmICggcmVzdWx0ICkge1xuICAgICAgICAgIHRoaXMuYXJyLnB1c2goaW1hZ2UuaW1nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImltYWdlIGlzIFwiICsgcmVzdWx0ICsgXCIgZm9yIFwiICsgaW1hZ2UuaW1nLnNyYyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG5cbiAgICBjb25zb2xlLmxvZyhcIkltYWdlIFByZWxvYWRlciBNb2R1bGVcIik7XG5cbiAgICB0aGlzLnByZWxvYWRJbWFnZXMoKTtcbiAgfVxufVxuXG5sZXQgSW1hZ2VMb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMb2FkZXI7IiwiZGVjbGFyZSB2YXIgU2Nyb2xsTWFnaWM6IGFueTtcbmNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmNsYXNzIEFuaW1hdGlvbkNvbXBvbmVudCB7XG5cbiAgY29udGFpbmVyOiBKUXVlcnk7XG4gIGl0ZW06IEpRdWVyeTtcbiAgbVNjZW5lOiBKUXVlcnk7XG4gIHNlcnZpY2VTaWRlQmFyOiBKUXVlcnk7XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9ICQoXCIucHJvY2Vzcy1jb250YWluZXJcIik7XG4gICAgdGhpcy5pdGVtID0gJChcIi5wcm9jZXNzLWl0ZW0tY29udGFpbmVyXCIpO1xuICAgIHRoaXMubVNjZW5lID0gJChcIi5tLXNjZW5lXCIpO1xuICAgIHRoaXMuc2VydmljZVNpZGVCYXIgPSAkKFwiLnNlcnZpY2Utc2lkZWJhci13cmFwcGVyXCIpO1xuICB9XG5cbiAgZGVzY19vX2FuaW1hdGUoKSB7XG4gICAgaWYgKCAkKFwiLmRlc2Mtby1hbmltYXRlXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBsZXQgd2lwZUFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgd2lwZUFuaW1hdGlvbi5hZGQoW1xuICAgICAgICBUd2Vlbk1heC5mcm9tVG8oJChcIi5kZXNjLW8taW1hZ2UtMVwiKSwgMSwgeyB5UGVyY2VudDogMCB9LCB7IHlQZXJjZW50OiAtMjAsIGVhc2U6IFBvd2VyMC5lYXNlSW5PdXQgfSlcbiAgICAgIF0pO1xuXG4gICAgICBsZXQgd2lwZUFuaW1hdGlvbjIgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIHdpcGVBbmltYXRpb24yLmFkZChbXG4gICAgICAgIFR3ZWVuTWF4LmZyb21UbygkKFwiLmRlc2Mtby1pbWFnZS0yXCIpLCAxLCB7IHlQZXJjZW50OiAwLCB9LCB7IHlQZXJjZW50OiAtMTA1LCBlYXNlOiBQb3dlcjAuZWFzZUluT3V0IH0pXG4gICAgICBdKTtcblxuICAgICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG4gICAgICBsZXQgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICAgIHtcbiAgICAgICAgICB0cmlnZ2VyRWxlbWVudDogXCIuZGVzYy1vLWFuaW1hdGVcIixcbiAgICAgICAgICBkdXJhdGlvbjogJChcIi5kZXNjLW8tYW5pbWF0ZVwiKS5oZWlnaHQoKSxcbiAgICAgICAgICBvZmZzZXQ6IC0xMDBcbiAgICAgICAgfSlcbiAgICAgIC8vIC5zZXRQaW4oXCIuZGVzYy1vLWltYWdlLTFcIilcbiAgICAgICAgLnNldFR3ZWVuKHdpcGVBbmltYXRpb24pXG4gICAgICAgIC5hZGRJbmRpY2F0b3JzKHsgbmFtZTogXCIxIChkdXJhdGlvbjogRWwpXCIgfSkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcbiAgICAgICAgLmFkZFRvKGNvbnRyb2xsZXIpO1xuXG4gICAgICBsZXQgc2NlbmUyID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKFxuICAgICAgICB7XG4gICAgICAgICAgdHJpZ2dlckVsZW1lbnQ6IFwiLmRlc2Mtby1hbmltYXRlXCIsXG4gICAgICAgICAgZHVyYXRpb246ICQoXCIuZGVzYy1vLWFuaW1hdGVcIikuaGVpZ2h0KCkgKyAxMDAsXG4gICAgICAgIH0pXG4gICAgICAvLyAuc2V0UGluKFwiLmRlc2Mtby1pbWFnZS0xXCIpXG4gICAgICAgIC5zZXRUd2Vlbih3aXBlQW5pbWF0aW9uMilcbiAgICAgICAgLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjIgKGR1cmF0aW9uOiBFbClcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgICAuYWRkVG8oY29udHJvbGxlcik7XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc0FuaW1hdGVJbigpIHtcbiAgICBsZXQgY29udGFpbmVyID0gdGhpcy5jb250YWluZXI7XG4gICAgbGV0IGl0ZW0gPSB0aGlzLml0ZW07XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuICAgIGxldCBzY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgIHtcbiAgICAgICAgdHJpZ2dlckVsZW1lbnQ6IFwiLnByb2Nlc3MtY29udGFpbmVyXCIsXG4gICAgICAgIGR1cmF0aW9uOiBjb250YWluZXIuaGVpZ2h0KCksXG4gICAgICAgIC8vIG9mZnNldDogdGhpcy5hc2lkZU9mZnNldCxcbiAgICAgIH0pXG4gICAgICAub24oXCJlbnRlclwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGl0ZW0uZmluZChcIi5wcm9jZXNzLWl0ZW0taW5uZXJcIikuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICAgICAgY29udGFpbmVyLmZpbmQoXCJpbWdcIikuYWRkQ2xhc3MoXCJpblwiKTtcbiAgICAgIH0pXG4gICAgICAvLyAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMSAoZHVyYXRpb246IG9mZnNldD8pXCIgfSkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcbiAgICAgIC5hZGRUbyhjb250cm9sbGVyKTtcbiAgfVxuXG4gIGFuaW1hdGVXaW5kb3dUb3AoKSB7XG4gICAgY29uc29sZS5sb2coXCJhbmltYXRlIFRvcFwiKTtcbiAgICBUd2VlbkxpdGVcbiAgICAgIC50bygkKHdpbmRvdyksIC4zLFxuICAgICAgICB7XG4gICAgICAgICAgc2Nyb2xsVG86IHtcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIGVhc2U6IFBvd2VyMi5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuICBhbmltYXRlU2VydmljZVNpZGViYXJPdXQoKSB7XG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuc2VydmljZVNpZGVCYXIsIC4zLCB7XG4gICAgICB4OiBcIi0xMDBcIixcbiAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgZGVsYXk6IDAsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIixcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgLy8gcmVtb3ZlIHNpZGViYXIgaHRtbCBlbGVtZW50IHNvIGl0IGRvZXNudCBzaG93IHVwIGFnYWluIHdoZW4gc2Nyb2xsaW5nIHVwXG4gICAgICAgIHRoaXMuc2VydmljZVNpZGVCYXIucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBsb2FkVXJsKCB1cmwgKSB7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfVxuXG4gIG1haW5Db250ZW50QW5pbWF0aW9uT3V0KCBjYWxsYmFjayApIHtcblxuICAgIC8vIExvYWQgaW4gYW5pbWF0aW9ucyBoZXJlXG4gICAgdGhpcy5hbmltYXRlU2VydmljZVNpZGViYXJPdXQoKTtcblxuXG4gICAgdGhpcy5tU2NlbmUuYWRkQ2xhc3MoXCJpcy1leGl0aW5nXCIpXG4gICAgICAvLyBJZiBoYXMgd2Via2l0QW5pbWF0aW9uRW5kIC0gaXQgZ2V0cyBjYWxsZWQgdHdpY2VcbiAgICAgIC5vbmUoXCJvYW5pbWF0aW9uZW5kIG1zQW5pbWF0aW9uRW5kIGFuaW1hdGlvbmVuZFwiLCAoKSA9PiB7XG5cbiAgICAgICAgLy8gTG9hZCBpbiBhbmltYXRpb25zIGhlcmUgdGhhdCBuZWVkIHRvIG9jY3VyIGFmdGVyIG1haW4gb25lc1xuICAgICAgICB0aGlzLmFuaW1hdGVXaW5kb3dUb3AoKTtcblxuICAgICAgfSk7XG5cbiAgICBpZiAoIHR5cGVvZihjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICBjaGVja1VybCggdXJsICk6IGJvb2xlYW4ge1xuICAgIGlmICggdXJsID09PSBcIiNcIiB8fCB1cmwgPT09IFwiXCIgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGdsb2JhbENsaWNrQ2hlY2soIGV2ZW50PyApIHtcblxuICAgIC8vIEdldCB1cmwgZnJvbSB0aGUgYSB0YWdcbiAgICBsZXQgbmV3VXJsID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwiaHJlZlwiKTtcbiAgICBsZXQgaGFzQ2hpbGRyZW4gPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnBhcmVudChcImxpXCIpLmhhc0NsYXNzKFwibWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+IFV0aWxzLmJwcy50YWJsZXQgJiZcbiAgICAgIHRoaXMuY2hlY2tVcmwobmV3VXJsKSAmJlxuICAgICAgVXRpbHMuYnJvd3NlciA9PT0gXCJpcGFkXCIgJiYgaGFzQ2hpbGRyZW4gKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gY29uc29sZS5sb2coJ1RhYmxldCBOYXYgY2xpY2snKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCAmJiB0aGlzLmNoZWNrVXJsKG5ld1VybCkgKSB7XG4gICAgICAvLyBsYXB0b3Agb3IgbGFyZ2Ugbm8gaXBhZFxuICAgICAgLy8gY29uc29sZS5sb2coXCJsYXB0b3Agb3IgbGFyZ2VyXCIpO1xuICAgICAgdGhpcy5tYWluQ29udGVudEFuaW1hdGlvbk91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMubG9hZFVybChuZXdVcmwpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICggdGhpcy5jaGVja1VybChuZXdVcmwpICYmIGhhc0NoaWxkcmVuICkge1xuICAgICAgLy8gY29uc29sZS5sb2coXCJtb2JpbGUgbWVudSBpcyBhY3RpdmUgYW5kIHBhcmVudCBjbGlja2VkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICB9XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5wcm9jZXNzQW5pbWF0ZUluKCk7XG4gICAgdGhpcy5kZXNjX29fYW5pbWF0ZSgpO1xuXG4gICAgLy8gQ2xpY2sgZXZlbnQgdG8gY29udHJvbCB3aW5kb3cgTG9hZGluZ1xuICAgICQoXCJhXCIpLm9uKFwiY2xpY2tcIiwgKCBlICkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZ2xvYmFsQ2xpY2tDaGVjayhlKTtcbiAgICB9KTtcblxuICAgIC8vIEN1c3RvbSBldmVudCBleGFtcGxlXG4gICAgLy8gJChkb2N1bWVudCkub24oXCJ0ZXN0XCIsIHt9LCAoIGV2ZW50LCBhcmcxLCBhcmcyICkgPT4ge1xuICAgIC8vXG4gICAgLy8gICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPiBVdGlscy5icHMudGFibGV0ICkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZzEpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhhcmcyKTtcbiAgICAvLyAgIH1cbiAgICAvL1xuICAgIC8vIH0pLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IEFuaW1hdGlvbkNvbnRyb2xsZXIgPSBuZXcgQW5pbWF0aW9uQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IEFuaW1hdGlvbkNvbnRyb2xsZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcblxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIFN0aWNreVNpZGViYXJDb21wb25lbnQge1xuXG4gIGlzQW5pbWF0aW5nOiBib29sZWFuO1xuICBjb250ZW50V3JhcHBlcjogSlF1ZXJ5O1xuICBjb250ZW50T2Zmc2V0VG9wOiBudW1iZXI7XG4gIGNvbnRlbnRXcmFwcGVySGVpZ2h0OiBudW1iZXI7XG4gIHNjcm9sbFRvcDogbnVtYmVyO1xuICBhc2lkZTogSlF1ZXJ5O1xuICBzaWRlYmFyV3JhcHBlcjogSlF1ZXJ5O1xuICB3aW5kb3dIZWlnaHQ6IG51bWJlcjtcbiAgc2lkZWJhckhlaWdodDogbnVtYmVyO1xuICBmb290ZXJIZWlnaHQ6IG51bWJlcjtcbiAgc2Nyb2xsaW5nRG93bjogYm9vbGVhbjtcbiAgbGFzdFNjcm9sbFRvcDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRlbnRXcmFwcGVyID0gJChcIi5zaWRlYmFyLWNvbnRlbnRcIik7XG4gICAgdGhpcy5hc2lkZSA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFySGVpZ2h0ID0gdGhpcy5hc2lkZS5oZWlnaHQoKTtcbiAgICB0aGlzLnNpZGViYXJXcmFwcGVyID0gJChcIi5zZXJ2aWNlLXNpZGViYXJcIik7XG4gIH1cblxuICBjaGVja1NpZGViYXIoKTogdm9pZCB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIHNpZGViYXIgaXMgZml4ZWQgb3Igbm90XG4gICAgaWYgKCAhdGhpcy5pc0FuaW1hdGluZyAmJiBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICB0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkgPyBzZXRUaW1lb3V0KHRoaXMudXBkYXRlU2lkZWJhclBvc2l0aW9uLmJpbmQodGhpcyksIDMwMCkgOiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlU2lkZWJhclBvc2l0aW9uLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlc2V0U2lkZUJhcigpO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0U2lkZUJhcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5hc2lkZS5yZW1vdmVDbGFzcyhcInN0aWNreVwiKTtcbiAgICB0aGlzLmFzaWRlLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGViYXJQb3NpdGlvbigpOiB2b2lkIHtcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxEaXJlY3Rpb24oKTtcblxuICAgIC8vIGdldCBkaXN0YW5jZSBmcm9tIHRvcCBvZiBjb250ZW50IDEwICsgNDAgPSA1MCBwYWRkaW5nIHRvcFxuICAgIHRoaXMuY29udGVudE9mZnNldFRvcCA9IHRoaXMuY29udGVudFdyYXBwZXIub2Zmc2V0KCkudG9wIC0gMTA7XG4gICAgdGhpcy5zaWRlYmFySGVpZ2h0ID0gdGhpcy5hc2lkZS5oZWlnaHQoKTtcbiAgICB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0ID0gdGhpcy5jb250ZW50V3JhcHBlci5vdXRlckhlaWdodCgpOyAvLyBpbmNsdWRlIHBhZGRpbmcgYW5kIG1hcmdpblxuXG5cbiAgICAvLyBnZXQgd2hlcmUgdG9wIG9mIHdpbmRvdyBpc1xuICAgIHRoaXMuc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29udGVudCBXcmFwcGVyIEhlaWdodFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnRlbnQgT2Zmc2V0XCIsIHRoaXMuY29udGVudE9mZnNldFRvcCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTaWRlYmFyIEhlaWdodFwiLCB0aGlzLnNpZGViYXJIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiV2luZG93IEhlaWdodFwiLCB0aGlzLndpbmRvd0hlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJvZmZzZXQgVG9wXCIsIHRoaXMuY29udGVudE9mZnNldFRvcCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTY3JvbGxUb3BcIiwgdGhpcy5zY3JvbGxUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2lkZWJhcm9mZnNldFwiLCB0aGlzLnNjcm9sbFRvcCk7XG5cbiAgICAvLyBJZiB0aGUgd2luZG93IFYgcG9zaXRpb24gaXMgbGVzcyB0aGFuIHRoZSBjb250ZW50IFYgcG9zaXRpb24gbWFrZSBzaWRlYmFyIG5vcm1hbFxuICAgIGlmICggdGhpcy5zY3JvbGxUb3AgPCB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgKSB7XG4gICAgICBsZXQgY3NzUHJvcHMgPSB7XG4gICAgICAgIFwidHJhbnNpdGlvblwiOiBcInRvcCAuM3NcIlxuICAgICAgfTtcbiAgICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIik7XG4gICAgICB0aGlzLmFzaWRlLmNzcyhjc3NQcm9wcyk7XG5cbiAgICAgIC8vIGlmIHdpbmRvdyBWIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiBjb250ZW50IC0gYWRkIHN0aWNreVxuICAgICAgLy8gMm5kIGNoZWNrcyB0aGUgb2Zmc2V0IG9mIHRoZSB0b3Agb2YgdGhlIHdpbmRvdyB0byB0aGUgdG9wIG9mIHRoZSBjb250ZW50ICYmIHRoZSBwb3NpdGlvbiBvZiB0aGUgY29udGVudCBpbiByZWxhdGlvbiB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHdpbmRvd1xuICAgIH0gZWxzZSBpZiAoIHRoaXMuc2Nyb2xsVG9wID49IHRoaXMuY29udGVudE9mZnNldFRvcCAmJiB0aGlzLnNjcm9sbFRvcCA8IHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQgLSB0aGlzLnNpZGViYXJIZWlnaHQgKyB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgLSA0MCApIHtcbiAgICAgIHRoaXMuYXNpZGUuYWRkQ2xhc3MoXCJzdGlja3lcIikuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuXG4gICAgICBpZiAoIHRoaXMuc2Nyb2xsaW5nRG93biA9PT0gdHJ1ZSApIHtcbiAgICAgICAgdGhpcy5hc2lkZS5jc3MoXCJ0cmFuc2l0aW9uXCIsIFwidG9wIC4zc1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcIlwiKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBsZXQgYXJ0aWNsZVBhZGRpbmdUb3AgPSBOdW1iZXIoYXJ0aWNsZXMuZXEoMSkuY3NzKFwicGFkZGluZy10b3BcIikucmVwbGFjZShcInB4XCIsIFwiXCIpKTtcbiAgICAgIGlmICggdGhpcy5hc2lkZS5oYXNDbGFzcyhcInN0aWNreVwiKSApIHtcbiAgICAgICAgdGhpcy5hc2lkZS5hdHRyKFwic3R5bGVcIiwgXCJcIik7XG4gICAgICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIikuY3NzKFwidG9wXCIsIHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQgLSB0aGlzLnNpZGViYXJIZWlnaHQgKyBcInB4XCIpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuXG4gIH1cblxuICBjaGVja1Njcm9sbERpcmVjdGlvbigpIHtcbiAgICAvLyBMb2cgY3VycmVudCBzY3JvbGxQb2ludFxuICAgIGxldCBzdCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cbiAgICAvLyBjb21wYXJlIHRvIGxhc3Qgc2Nyb2xsUG9pbnRcbiAgICBpZiAoIHN0ID4gdGhpcy5sYXN0U2Nyb2xsVG9wICkge1xuICAgICAgY29uc29sZS5sb2coXCJzY3JvbGwgZG93blwiKTtcbiAgICAgIC8vIGRvd25zY3JvbGwgY29kZVxuICAgICAgdGhpcy5zY3JvbGxpbmdEb3duID0gdHJ1ZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNjcm9sbCB1cFwiKTtcbiAgICAgIC8vIHVwc2Nyb2xsIGNvZGVcbiAgICAgIHRoaXMuc2Nyb2xsaW5nRG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIG9uIGNvbXBsZXRlIC0gbWFrZSBsYXN0IFNjcm9sbCBwb2ludCB0aGUgcG9pbnQgYXQgd2hpY2ggdGhleSBzdGFydGVkIHNjcm9sbGluZyBhdCBmaXJzdFxuICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IHN0O1xuICB9XG5cbiAgYW5pbWF0ZVNpZGViYXJJbigpIHtcblxuICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJpbnRyb1wiKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICBsZXQgc2lkZWJhckludHJvID0gVHdlZW5NYXgudG8odGhpcy5hc2lkZSwgLjMsIHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgejogLjAwMSxcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgICAgZGVsYXk6IC45LFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgLy8gbWFrZSBzaWRlYmFyIHBlcm1hbmVudGx5IHZpc2libGVcbiAgICAgICAgICB0aGlzLmFzaWRlLmFkZENsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU3RpY2t5IHNpZGViYXIgbG9hZGVkXCIpO1xuXG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gMDtcbiAgICBpZiAoIHRoaXMuYXNpZGUubGVuZ3RoID4gMCApIHtcbiAgICAgIHRoaXMuY2hlY2tTaWRlYmFyKCk7XG5cbiAgICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcbiAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcblxuICAgICAgLy8gQW5pbWF0ZSBzaWRlIGJhciBpbiBvbiBsb2FkXG4gICAgICB0aGlzLmFuaW1hdGVTaWRlYmFySW4oKTtcbiAgICB9XG4gIH1cbn1cblxubGV0IFN0aWNreVNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdGlja3lTaWRlYmFyOyIsImltcG9ydCB7QnBzSW50ZXJmYWNlfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9icHMuaW50ZXJmYWNlXCI7XG5jb25zdCAkID0galF1ZXJ5O1xuXG4vLyBBZGQgaW50ZXJmYWNlIEpRdWVyeVNtb290aCB7XG4vLyBzbW9vdGhTdGF0ZSgpOnZvaWQ7XG4vLyB9XG4vLyBzbW9vdGhTdGF0ZShhcmc6IE9iamVjdCk6IEpRdWVyeTtcblxuY2xhc3MgVXRpbGl0eUNvbXBvbmVudCB7XG4gIHdpbmRvd1dpZHRoOiBudW1iZXI7XG4gIGJyZWFrcG9pbnQ6IG51bWJlcjtcbiAgYnJlYWtwb2ludHM6IG51bWJlcltdO1xuICBicHM6IEJwc0ludGVyZmFjZTtcbiAgYnJvd3Nlcjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3NldEJyZWFrcG9pbnRzID0gKCBicHM6IEJwc0ludGVyZmFjZSApID0+IHtcbiAgICBsZXQgYXJyID0gW107XG5cbiAgICBmb3IgKCBsZXQga2V5IGluIGJwcyApIHtcbiAgICAgIGlmICggYnBzLmhhc093blByb3BlcnR5KGtleSkgKSB7XG4gICAgICAgIGFyci5wdXNoKGJwc1sga2V5IF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcnIucmV2ZXJzZSgpO1xuICB9O1xuICBwcml2YXRlIF9jaGVja0JyZWFrcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gbWFrZSBicmVha3BvaW50IGV2ZW50IGF2YWlsYWJsZSB0byBhbGwgZmlsZXMgdmlhIHRoZSB3aW5kb3cgb2JqZWN0XG4gICAgbGV0IG9sZF9icmVha3BvaW50ID0gdGhpcy5icmVha3BvaW50O1xuXG4gICAgdGhpcy5fc2V0QnJlYWtwb2ludCgpO1xuXG4gICAgaWYgKCBvbGRfYnJlYWtwb2ludCAhPT0gdGhpcy5icmVha3BvaW50ICkge1xuXG4gICAgICAkKHdpbmRvdykudHJpZ2dlcihcImJyZWFrcG9pbnRDaGFuZ2VcIiwgVXRpbHMuYnJlYWtwb2ludCk7XG4gICAgfVxuICB9O1xuICBwcml2YXRlIF9zZXRCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIGdldCBicmVha3BvaW50IGZyb20gY3NzXG4gICAgbGV0IGJvZHkgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLFxuICAgICAgemluZGV4ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsgXCJ6LWluZGV4XCIgXTtcblxuICAgIHRoaXMuYnJlYWtwb2ludCA9IHBhcnNlSW50KHppbmRleCwgMTApO1xuICB9O1xuICBwcml2YXRlIF9zZXRXaW5kb3dXaWR0aCA9ICgpID0+IHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIH07XG5cbiAgd2hpY2hCcm93c2VyKCkge1xuICAgIGlmICggKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwic2FmYXJpXCIpID4gLTEpICYmICEoXG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImNocm9tZVwiKSA+IC0xKSAmJiAobmF2aWdhdG9yLmFwcE5hbWUgPT09XG4gICAgICBcIk5ldHNjYXBlXCIpICkge1xuXG4gICAgICBpZiAoIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSkgIT09IG51bGwgKSB7XG4gICAgICAgIHJldHVybiBcImlwYWRcIjtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwic2FmYXJpXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDA7XG4gICAgdGhpcy5icmVha3BvaW50ID0gMzIwO1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSBbXTtcbiAgICB0aGlzLmJwcyA9IHtcbiAgICAgIG1vYmlsZTogNTQ0LFxuICAgICAgdGFibGV0OiA3NjgsXG4gICAgICBsYXB0b3A6IDk5MixcbiAgICAgIGRlc2t0b3A6IDEyMDAsXG4gICAgICBkZXNrdG9wX3hsOiAxNjAwXG4gICAgfTtcbiAgICB0aGlzLmJyb3dzZXIgPSB0aGlzLndoaWNoQnJvd3NlcigpO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlV0aWxpdGllcyBsb2FkZWRcIik7XG5cbiAgICAvLyBzZXQgYnJlYWtwb2ludCBvbiB3aW5kb3cgbG9hZFxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcbiAgICB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBCcmVha3BvaW50IGlzOlwiLCB0aGlzLmJyZWFrcG9pbnQpO1xuXG4gICAgLy8gY3JlYXRlIGZ1bGwgYXJyYXkgZm9yIGltYWdlIGNvbXByZXNzaW9uIHJlZlxuICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLl9zZXRCcmVha3BvaW50cyh0aGlzLmJwcyk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5fY2hlY2tCcmVha3BvaW50KS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBVdGlscyA9IG5ldyBVdGlsaXR5Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyJdfQ==
