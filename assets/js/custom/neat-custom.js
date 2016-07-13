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
        this.$form = this.$searchForm.find(".neat-search");
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
        this.$form = $(".neat-search");
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
var utils_1 = require("./utils");
var GalleryComponent = (function () {
    function GalleryComponent() {
        this.gridId = $(".inner-content-module").children("div").attr("id");
        this.$fullGrid = $("#" + this.gridId);
        this.$galleryContainer = $(".gallery-container");
        this.$isotopeGallery = $(".gallery-isotope");
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
        // Set min height depending one what content was filtered
        this.currentHeight = $(".gallery-item.width1").css("padding-bottom");
        var heightStr = this.currentHeight.toString();
        this.currentHeightPX = this.pxConvert(heightStr);
        if (this.currentHeightPX !== 0) {
            this.$isotopeGallery.css("min-height", Math.round(this.currentHeightPX));
        }
        else {
            this.currentHeightPX = $(".gallery-item.width1").height();
            this.$isotopeGallery.css("min-height", Math.round(this.currentHeightPX));
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
    GalleryComponent.prototype.checkContainerHeight = function () {
        if (utils_1.default.breakpoint === utils_1.default.bps.laptop && this.$isotopeGallery.hasClass("width-contained")) {
            var currentHeight = this.$isotopeGallery.height();
            this.$isotopeGallery.css("height", currentHeight - 1 + "px");
        }
    };
    GalleryComponent.prototype.onResize = function () {
        clearTimeout(this.reIsoTimeOut);
        // check if the container has items inside it
        if ($(".gallery-container").length > 0) {
            // set grid dimension
            this.galleryIsotopeWrapper();
            // on resize complete, re-adjust grid
            this.reIsoTimeOut = setTimeout(this.reloadIsotope.bind(this), 500);
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
        $(".filter-group").on("click", "li", this.onFilterClick.bind(this, $this));
        $(window).on("resize", this.onResize.bind(this));
    };
    return GalleryComponent;
}());
var IsotopeGallery = new GalleryComponent();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = IsotopeGallery;

},{"./utils":13}],5:[function(require,module,exports){
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
        fragment.append('<span class="quote__switch shadow-small-btn"></span>');
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
                // remove current card html
                card.remove();
                backBtn.remove();
            });
        }
        else {
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
        // disable button click if item is selected
        if (!parentConatiner.hasClass("selected")) {
            return;
        }
        // set state
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
        // if desktop scroll top
        if (utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
            // scroll top of div on open for graceful UX
            $("body,html").animate({ "scrollTop": this.quoteContainer.offset().top - 35 }, 200);
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
        // On resize end - check to enable clicks for desktop or remove them
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(function () {
            if (_this.currentBreakpoint !== utils_1.default.breakpoint) {
                _this.setWidth(_this.getSelectedLabel());
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
            // does sidebar haveclass visibility
            var isVisible = this.aside.hasClass('visible');
            if (!isVisible) {
                this.animateSidebarIn();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGUudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zdmcudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2ltYWdlTG9hZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9xdW90ZS1idWlsZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy90ZXN0aW1vbmlhbHMudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztHQUdHOztBQUVILHNCQUFrQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLDJCQUFnQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzFDLHVCQUFtQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3BELDJCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLG9EQUFvRDtBQUNwRCw0QkFBd0Isd0JBQXdCLENBQUMsQ0FBQTtBQUNqRCwrQkFBMEIsMkJBQTJCLENBQUMsQ0FBQTtBQUN0RCxpQ0FBZ0Ms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LENBckdBLEFBcUdDLElBQUE7QUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7QUFFbkM7a0JBQWUsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gUmVmIHBhdGggaXMgbm90IG5lZWRlZCBmb3Igc29tZSByZWFzb25cbiA8cmVmZXJlbmNlIHBhdGg9XCIvVXNlcnMveW9zZW1ldGllL0Ryb3Bib3gvZGV2ZWxvcG1lbnQvdmhvc3RzL3d3dy5seW5kYXNjb3JlLmRldi93cC1jb250ZW50L3RoZW1lcy9uZWF0L3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuICovXG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi9wYXJ0aWFscy91dGlsc1wiO1xuaW1wb3J0IE5hdiBmcm9tIFwiLi9uYXZpZ2F0aW9uL25hdmlnYXRpb25cIjtcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IFN2Z0hlYWRlciBmcm9tIFwiLi9wYXJ0aWFscy9oZWFkZXItc3ZnXCI7XG4vLyBpbXBvcnQgU21vb3RoU3RhdGUgZnJvbSBcIi4vcGFydGlhbHMvc21vb3RoU3RhdGVcIjtcbmltcG9ydCBJbWFnZUxvYWRlciBmcm9tIFwiLi9wYXJ0aWFscy9pbWFnZUxvYWRlclwiO1xuaW1wb3J0IFN0aWNreVNpZGViYXIgZnJvbSBcIi4vcGFydGlhbHMvc3RpY2t5LXNpZGViYXJcIjtcbmltcG9ydCBBbmltYXRpb25Db250cm9sbGVyIGZyb20gXCIuL3BhcnRpYWxzL3Byb2Nlc3NBbmltYXRpb25cIjtcbmltcG9ydCBJc290b3BlR2FsbGVyeSBmcm9tIFwiLi9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGVcIjtcbmltcG9ydCBIZWFkZXJTbGlkZXIgZnJvbSBcIi4vcGFydGlhbHMvaGVhZGVyLXNsaWRlclwiO1xuaW1wb3J0IFNob3djYXNlU2xpZGVyIGZyb20gXCIuL3BhcnRpYWxzL3Nob3djYXNlLXNsaWRlclwiO1xuaW1wb3J0IFRlc3RpbW9uaWFscyBmcm9tIFwiLi9wYXJ0aWFscy90ZXN0aW1vbmlhbHNcIjtcbmltcG9ydCBRdW90ZUJ1aWxkZXIgZnJvbSBcIi4vcGFydGlhbHMvcXVvdGUtYnVpbGRlclwiO1xuLy8gaW1wb3J0IFN0aWNreVNpZGViYXIgZnJvbSBcIi4vcGFydGlhbHMvc2VydmljZS1zaWRlYmFyXCI7XG5jb25zdCAkID0galF1ZXJ5O1xuZGVjbGFyZSB2YXIgU2Nyb2xsTWFnaWM6IGFueTtcbi8vIGRlY2xhcmUgdmFyIHJldmFwaTE6IGFueTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgY2xhc3MgQXBwIHtcblxuICAgIGluaXQoKTogdm9pZCB7XG4gICAgICBjb25zb2xlLmxvZyhcIkFwcCBsb2FkZWRcIik7XG4gICAgICBTdmdIZWFkZXIuaW5pdCgpO1xuICAgICAgVXRpbHMuaW5pdCgpO1xuICAgICAgTmF2LmluaXQoKTtcbiAgICAgIFNlYXJjaC5pbml0KCk7XG4gICAgICBTdGlja3lTaWRlYmFyLmluaXQoKTtcbiAgICAgIFRlc3RpbW9uaWFscy5pbml0KCk7XG4gICAgICBRdW90ZUJ1aWxkZXIuaW5pdCgpO1xuICAgICAgQW5pbWF0aW9uQ29udHJvbGxlci5pbml0KCk7IC8vIEdsb2JhbCB3aW5kb3cgYW5pbSBhbmQgY2xpY2sgY29udHJvbFxuXG4gICAgfVxuICB9XG5cbiAgbGV0IGJvb3RzdHJhcCA9IG5ldyBBcHAoKTtcblxuICAvKiogcnVuIGFsbCBmdW5jdGlvbnMgKi9cbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGJvb3RzdHJhcC5pbml0KCk7XG4gICAgSW1hZ2VMb2FkZXIuaW5pdCgpO1xuICAgIC8vIFNtb290aFN0YXRlLmluaXQoXCJcIik7XG4gIH0pO1xuXG4gIC8vIEJpbmQgZXZlbnRzIHRvIHRoZSBpbWFnZXNMb2FkZWQgcGx1Z2luIGhlcmVcbiAgJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24gKCBlICkge1xuICAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICAvLyBjaGVjayBpZiBwYWdlIGhhcyBnYWxsZXJ5XG4gICAgaWYgKCAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBJc290b3BlR2FsbGVyeS5pbml0KCk7XG4gICAgfVxuICAgIEhlYWRlclNsaWRlci5pbml0KCk7XG4gICAgU2hvd2Nhc2VTbGlkZXIuaW5pdCgpO1xuXG4gIH0pO1xuXG59KSgpOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uLy4uL3BhcnRpYWxzL3V0aWxzXCI7XG5cbmNsYXNzIFNlYXJjaENvbXBvbmVudCB7XG4gICRzZWFyY2hUcmlnZ2VyOiBKUXVlcnk7XG4gICRzZWFyY2hDbG9zZVRyaWdnZXI6IEpRdWVyeTtcbiAgJHNlYXJjaEZvcm06IEpRdWVyeTtcbiAgJHNlYXJjaEJ1dHRvbkFyZWE6IEpRdWVyeTtcbiAgJGljb246IEpRdWVyeTtcbiAgJGZvcm06IEpRdWVyeTtcbiAgJGlucHV0OiBKUXVlcnk7XG4gICR3aWR0aDogbnVtYmVyO1xuICAkaGVpZ2h0OiBudW1iZXI7XG4gIGlzT3BlbjogYm9vbGVhbjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gdGhpcy4kc2VhcmNoRm9ybS5maW5kKFwiLm5lYXQtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZm9ybS5maXJzdCgpO1xuICAgIHRoaXMuJHdpZHRoID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS53aWR0aCgpO1xuICAgIHRoaXMuJGhlaWdodCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEuaGVpZ2h0KCk7XG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggUmVsb2FkXCIpO1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gJChcIi5uZWF0LXNlYXJjaFwiKTtcbiAgICB0aGlzLiR3aWR0aCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgICB0aGlzLiRoZWlnaHQgPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLmhlaWdodCgpO1xuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMub3BlblNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgfVxuXG4gIGdldFRvcFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaFRyaWdnZXIub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICB9XG5cbiAgZ2V0TGVmdFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaFRyaWdnZXIub2Zmc2V0KCkubGVmdDtcbiAgfVxuXG4gIGNsb3NlU2VhcmNoKCBldmVudCApIHtcblxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cbiAgICBsZXQgYW5pbWF0aW9uID0gbmV3IFRpbWVsaW5lTGl0ZSgpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciwgLjIsIHtcbiAgICAgIHRvcDogXCI1JVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCJcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjI1JVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gICAgYW5pbWF0aW9uLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC4yLCB7XG4gICAgICBsZWZ0OiB0aGlzLmdldExlZnRQb3NpdGlvbigpLFxuICAgICAgdG9wOiB0aGlzLmdldFRvcFBvc2l0aW9uKCksXG4gICAgICB3aWR0aDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBkZWxheTogLjMsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCJcbiAgICAgICAgfSk7XG4gICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRpY29uLCAuMiwge1xuICAgICAgICAgIHRvcDogXCI1MCVcIixcbiAgICAgICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgICAgfSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KS50byh0aGlzLiRzZWFyY2hGb3JtLCAuNCwge1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc2VhcmNoRm9ybS5jc3Moe1xuICAgICAgICAgIFwiei1pbmRleFwiOiAtMSxcbiAgICAgICAgICBcImxlZnRcIjogMCxcbiAgICAgICAgICBcInRvcFwiOiAwLFxuICAgICAgICAgIFwid2lkdGhcIjogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgICAgIFwiaGVpZ2h0XCI6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgfSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcblxuICB9XG5cbiAgb3BlblNlYXJjaChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cbiAgICAvLyBwcmV2ZW50IGJ1dHRvbiBmcm9tIGJlaW5nIHVzZWQgb25jZSBzZWFyY2ggaXMgb3BlblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIuYmx1cigpO1xuXG4gICAgdGhpcy4kc2VhcmNoRm9ybS5jc3Moe1xuICAgICAgbGVmdDogdGhpcy5nZXRMZWZ0UG9zaXRpb24oKSxcbiAgICAgIHRvcDogdGhpcy5nZXRUb3BQb3NpdGlvbigpLFxuICAgICAgd2lkdGg6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgXCJ6LWluZGV4XCI6IDk5OVxuICAgIH0pO1xuXG4gICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIGFuaW1hdGlvbi50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuMlxuICAgIH0pLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC4yLCB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gICAgICBiYWNrZ3JvdW5kOiBcIiMzNTM3M0RcIixcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICBvdmVyZmxvd1k6IFwic2Nyb2xsXCJcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgIHRvcDogXCIxMTAlXCIsXG4gICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIsIC4zLCB7XG4gICAgICB0b3A6IFwiMyVcIixcbiAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgZGVsYXk6IC40LFxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGZvcm0sIC40LCB7XG4gICAgICB0b3A6IFwiMjAlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICAgIGVhc2U6IEV4cG8uZWFzZUluT3V0XG4gICAgfSk7XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggbG9hZGVkXCIpO1xuICAgIC8vIHRoaXMub3BlblNlYXJjaCgpO1xuICAgIHRoaXMuJGlucHV0LmtleXVwKChldmVudCkgPT4ge1xuICAgICAgLy8gaWYga2V5IGlzIGVudGVyIC0gYW5pbWF0ZSBvdXRcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTZWFyY2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMub3BlblNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICBcbiAgICAkKFwiYm9keVwiKS5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT09IDI3ICYmIHRoaXMuaXNPcGVuICkge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5sZXQgU2VhcmNoQm94ID0gbmV3IFNlYXJjaENvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCb3g7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBTZWFyY2hCb3ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hcIjtcblxuaW50ZXJmYWNlIE5hdlN0YXRlIHtcbiAgbmF2RW5hYmxlZDogYm9vbGVhbjtcbiAgbW9iaWxlOiBib29sZWFuO1xuICB0YWJsZXQ6IGJvb2xlYW47XG4gIGxhcHRvcDogYm9vbGVhbjtcbiAgZGVza3RvcDogYm9vbGVhbjtcbn1cblxuY2xhc3MgTmF2Q29tcG9uZW50IHtcbiAgJG5hdlRyaWdnZXI6IEhUTUxFbGVtZW50O1xuICAkbmF2RHJvcGRvd246IEhUTUxFbGVtZW50O1xuICAkbG93ZXJDb250YWluZXI6IEpRdWVyeTtcbiAgJHVwcGVyQ29udGFpbmVyOiBKUXVlcnk7XG4gICRuYXZNZXRhOiBKUXVlcnk7XG4gICRkcm9wRG93bldyYXBwZXI6IEpRdWVyeTtcbiAgJHNlYXJjaDogSlF1ZXJ5O1xuICAkZHJvcERvd25Db250ZW50OiBKUXVlcnk7XG5cbiAgc3RhdGU6IE5hdlN0YXRlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy4kbmF2VHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LXRyaWdnZXJcIik7XG4gICAgdGhpcy4kbmF2RHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV0LWRyb3Bkb3duLXRyaWdnZXJcIik7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIgPSAkKFwiLmxvd2VyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyID0gJChcIi51cHBlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiRuYXZNZXRhID0gJChcIi5ldC1uYXYtbWV0YVwiKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIgPSAkKFwiLmV0LWRyb3Bkb3duLXdyYXBwZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoID0gJChcIiNuYXYteGZlclwiKTtcbiAgICB0aGlzLiRkcm9wRG93bkNvbnRlbnQgPSAkKFwiLmV0LWRyb3Bkb3duLWNvbnRlbnRcIik7XG5cbiAgICAvKlxuICAgICBOYXYgU3RhdGUgT2JqZWN0XG4gICAgICovXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgZGVza3RvcDogZmFsc2VcbiAgICB9O1xuICB9XG5cblxuICAvLyBOb3QgdXNlZFxuICByZWxvYWQoKSB7XG5cbiAgICB0aGlzLiRuYXZUcmlnZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRuYXZEcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXQtZHJvcGRvd24tdHJpZ2dlclwiKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lciA9ICQoXCIubG93ZXJjb250YWluZXJcIik7XG4gICAgdGhpcy4kdXBwZXJDb250YWluZXIgPSAkKFwiLnVwcGVyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJG5hdk1ldGEgPSAkKFwiLmV0LW5hdi1tZXRhXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlciA9ICQoXCIuZXQtZHJvcGRvd24td3JhcHBlclwiKTtcbiAgICB0aGlzLiRzZWFyY2ggPSAkKFwiI25hdi14ZmVyXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duQ29udGVudCA9ICQoXCIuZXQtZHJvcGRvd24tY29udGVudFwiKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cblxuICAvKlxuICAgTW9iaWxlIE5hdiBmdW5jdGlvbmFsaXR5XG4gICAqL1xuICBvcGVuTmF2KCBldmVudDogRXZlbnQgKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICQodGhpcy4kbmF2RHJvcGRvd24pLmFkZENsYXNzKFwibWVudS1pcy1hY3RpdmVcIik7XG4gICAgVHdlZW5NYXgudG8odGhpcy4kbmF2RHJvcGRvd24sIC4zLCB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjbG9zZU5hdiggZXZlbnQ6IEV2ZW50ICk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgJCh0aGlzLiRuYXZEcm9wZG93bikucmVtb3ZlQ2xhc3MoXCJtZW51LWlzLWFjdGl2ZVwiKTtcbiAgICBUd2Vlbk1heC50byh0aGlzLiRuYXZEcm9wZG93biwgLjMsIHtcbiAgICAgICAgdG9wOiBcIi0xMDAlXCIsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuYXZPcGVuSW5pdCggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKHRoaXMuJG5hdlRyaWdnZXIpLm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuTmF2LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMuJG5hdlRyaWdnZXIpLm9mZigpO1xuICAgIH1cblxuICB9XG5cbiAgbmF2Q2xvc2UoIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKFwiI25hdi1jbG9zZVwiKS5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VOYXYuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIjbmF2LWNsb3NlXCIpLm9mZigpO1xuICAgIH1cblxuICB9XG5cbiAgbmF2SXRlbUNsaWNrKCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuXG4gICAgaWYgKCBpbml0ICkge1xuICAgICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKFwiYVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCBzZWxlY3RlZCA9ICQodGhpcyk7XG4gICAgICAgIHNlbGVjdGVkLm5leHQoXCJ1bFwiKS5yZW1vdmVDbGFzcyhcImlzLWhpZGRlblwiKS5wYXJlbnQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5wYXJlbnQoXCJ1bFwiKS5hZGRDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5jaGlsZHJlbihcImFcIikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBnb2JhY2soIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKFwiLmdvLWJhY2sgPiBhXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZWN0ZWQucGFyZW50KFwibGlcIikucGFyZW50KFwiLmV0LXNlY29uZGFyeS1kcm9wZG93blwiKS5hZGRDbGFzcyhcImlzLWhpZGRlblwiKS5wYXJlbnQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKS5wYXJlbnQoXCJ1bFwiKS5yZW1vdmVDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoXCIuZ28tYmFjayA+IGFcIikub2ZmKCk7XG4gICAgfVxuXG5cbiAgfVxuXG4gIG1vdmVOYXZpZ2F0aW9uTW9iaWxlKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibW92ZSBuYXZpZ2F0aW9uIG1vYmlsZVwiKTtcblxuICAgIHRoaXMuJHNlYXJjaC5kZXRhY2goKTtcbiAgICB0aGlzLiRuYXZNZXRhLmRldGFjaCgpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyLmRldGFjaCgpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlci5kZXRhY2goKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lci5pbnNlcnRBZnRlcih0aGlzLiR1cHBlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kbmF2TWV0YS5pbnNlcnRCZWZvcmUodGhpcy4kdXBwZXJDb250YWluZXIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRkcm9wRG93bldyYXBwZXIpO1xuICAgIHRoaXMuJG5hdk1ldGEuYXBwZW5kKHRoaXMuJHNlYXJjaCk7XG4gIH1cblxuICBtb3ZlTmF2aWdhdGlvblRhYmxldCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiB0YWJsZXRcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guZGV0YWNoKCk7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIuZGV0YWNoKCk7XG4gICAgdGhpcy4kdXBwZXJDb250YWluZXIuYXBwZW5kKHRoaXMuJG5hdk1ldGEpO1xuICAgIC8vIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRsb3dlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyLmluc2VydEFmdGVyKHRoaXMuJHVwcGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIucHJlcGVuZCh0aGlzLiRzZWFyY2gpO1xuICB9XG5cbiAgbW92ZU5hdmlnYXRpb25EZWtzdG9wKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwibW92ZSBuYXZpZ2F0aW9uIGRlc2t0b3BcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guaW5zZXJ0QmVmb3JlKHRoaXMuJGRyb3BEb3duQ29udGVudCk7XG5cbiAgfVxuXG4gIGRpc2FibGVNb2JpbGVOYXYoKSB7XG5cbiAgICAvLyBjb25zb2xlLmxvZyhcIk5hdiB0dXJuZWQgb2ZmXCIpO1xuICAgIHRoaXMubmF2T3BlbkluaXQoZmFsc2UpO1xuICAgIHRoaXMubmF2Q2xvc2UoZmFsc2UpO1xuICAgIHRoaXMubmF2SXRlbUNsaWNrKGZhbHNlKTtcbiAgICB0aGlzLmdvYmFjayhmYWxzZSk7XG4gICAgdGhpcy5zdGF0ZS5uYXZFbmFibGVkID0gZmFsc2U7XG5cbiAgICAvKlxuICAgICBSZW1vdmUgU3R5bGVzIGZyb20gZWxlbWVudCAmIHJlc2V0IGRyb3Bkb3duXG4gICAgICovXG4gICAgdGhpcy4kbmF2RHJvcGRvd24uc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJcIik7XG4gICAgdGhpcy4kZHJvcERvd25Db250ZW50LnJlbW92ZUNsYXNzKFwibW92ZS1vdXRcIik7XG4gICAgbGV0IGRyb3Bkb3duID0gdGhpcy4kZHJvcERvd25Db250ZW50LmZpbmQoXCIuZXQtc2Vjb25kYXJ5LWRyb3Bkb3duXCIpO1xuXG4gICAgZHJvcGRvd24uZWFjaCggKGluZGV4LCBlbGVtKSA9PiB7XG4gICAgICBpZiAoICEkKGVsZW0pLmhhc0NsYXNzKFwiaXMtaGlkZGVuXCIpICkge1xuICAgICAgICAkKGVsZW0pLmFkZENsYXNzKFwiaXMtaGlkZGVuXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBlbmFibGVNb2JpbGVOYXYoKSB7XG4gICAgY29uc29sZS5sb2coXCJOYXYgdHVybmVkIG9uXCIpO1xuICAgIHRoaXMubmF2T3BlbkluaXQodHJ1ZSk7XG4gICAgdGhpcy5uYXZDbG9zZSh0cnVlKTtcbiAgICB0aGlzLm5hdkl0ZW1DbGljayh0cnVlKTtcbiAgICB0aGlzLmdvYmFjayh0cnVlKTtcblxuICAgIHRoaXMuc3RhdGUubmF2RW5hYmxlZCA9IHRydWU7XG5cbiAgfVxuXG4gIGJyZWFrUG9pbnRNb2JpbGUoKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IE1vYmlsZVwiKTtcblxuICAgIGlmICggIXRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZW5hYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuICAgIHRoaXMubW92ZU5hdmlnYXRpb25Nb2JpbGUoKTtcbiAgfVxuXG4gIGJyZWFrUG9pbnRUYWJsZXQoIHByZXZTdGF0ZSApIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgVGFibGV0XCIpO1xuICAgIGlmICggIXRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZW5hYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuXG4gICAgdGhpcy5tb3ZlTmF2aWdhdGlvblRhYmxldCgpO1xuICB9XG5cbiAgYnJlYWtQb2ludExhcHRvcCggcHJldlN0YXRlICkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBMYXB0b3BcIik7XG5cbiAgICBpZiAoIHRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZGlzYWJsZU1vYmlsZU5hdigpO1xuICAgIH1cblxuICAgIC8vIGlmIHByZXYgc3RhdGUgd2FzIHRhYmxldCBkbyB0aGlzOlxuICAgIGlmICggcHJldlN0YXRlLmRlc2t0b3AgPT09IGZhbHNlIHx8IHByZXZTdGF0ZS5tb2JpbGUgPT09IHRydWUgKSB7XG5cbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25UYWJsZXQoKTtcbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25EZWtzdG9wKCk7XG4gICAgfVxuICB9XG5cbiAgYnJlYWtQb2ludERlc2t0b3AoIHByZXZTdGF0ZSApIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgRGVza3RvcFwiKTtcblxuICAgIGlmICggcHJldlN0YXRlLmxhcHRvcCA9PT0gZmFsc2UgfHwgcHJldlN0YXRlLm1vYmlsZSA9PT0gdHJ1ZSApIHtcblxuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvblRhYmxldCgpO1xuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvbkRla3N0b3AoKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5hdlJlc2l6ZSgpIHtcbiAgICAvKlxuICAgICBNb2JpbGVcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5tb2JpbGUgKSB7XG5cbiAgICAgIGlmICggIXRoaXMuc3RhdGUubW9iaWxlICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRNb2JpbGUoKTtcbiAgICAgIH1cbiAgICAgIC8vIFR1cm4gbW9iaWxlIG9uXG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogdHJ1ZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgVGFibGV0XG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAvLyB0YWJsZXQgYW5kIGhpZ2hlclxuICAgICAgLy8gZG8gb25jZVxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludFRhYmxldChwcmV2U3RhdGUpO1xuICAgICAgfVxuICAgICAgLy8gVHVybiBtb2JpbGUgb25cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiB0cnVlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBMYXB0b3BcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIGlmICggIXRoaXMuc3RhdGUubGFwdG9wICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRMYXB0b3AocHJldlN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogdHJ1ZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICBEZXNrdG9wXG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMuZGVza3RvcCApIHtcblxuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgIGlmICggIXRoaXMuc3RhdGUuZGVza3RvcCApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50RGVza3RvcChwcmV2U3RhdGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBuYXZMb2FkKCkge1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLm1vYmlsZSApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50TW9iaWxlKCk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IHRydWUsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMudGFibGV0ICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnRUYWJsZXQodGhpcy5zdGF0ZSk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IHRydWUsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50TGFwdG9wKHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogdHJ1ZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMuZGVza3RvcCApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50RGVza3RvcCh0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJOYXYgbG9hZGVkXCIpO1xuXG4gICAgdGhpcy5uYXZMb2FkKCk7XG4gICAgLy8gU2VhcmNoQm94LmluaXQoKTtcblxuICAgIC8qKioqKioqKioqKioqKioqXG4gICAgIE5BViBSRVNJWkUgRVZFTlRcbiAgICAgKioqKioqKioqKioqKioqL1xuXG4gICAgd2luZG93Lm9ucmVzaXplID0gKCBldmVudCApID0+IHtcbiAgICAgICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgICAgPyBzZXRUaW1lb3V0KHRoaXMubmF2UmVzaXplLmJpbmQodGhpcyksIDMwMClcbiAgICAgICAgOiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubmF2UmVzaXplLmJpbmQodGhpcykpO1xuICAgIH07XG5cblxuICB9XG59XG5cbmxldCBOYXYgPSBuZXcgTmF2Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IE5hdjsiLCJjb25zdCAkID0galF1ZXJ5O1xuZGVjbGFyZSB2YXIgSXNvdG9wZTogYW55O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIEdhbGxlcnlDb21wb25lbnQge1xuXG4gIGdyaWRJZDogc3RyaW5nO1xuICBnYWxsZXJ5X2dyaWQ6IG51bWJlcjtcbiAgZ2FsbGVyeV93cmFwcGVyX3dpZHRoOiBudW1iZXI7XG4gICRmdWxsR3JpZDogSlF1ZXJ5O1xuICAkaXNvdG9wZUdhbGxlcnk6IEpRdWVyeTtcbiAgJGdhbGxlcnlDb250YWluZXI6IEpRdWVyeTtcbiAgJGdyaWQ6IGFueTtcbiAgY3VycmVudEhlaWdodDogc3RyaW5nO1xuICBjdXJyZW50SGVpZ2h0UFg6IG51bWJlcjtcbiAgcmVJc29UaW1lT3V0OiBudW1iZXI7XG4gIGlzQ29udGFpbmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ3JpZElkID0gJChcIi5pbm5lci1jb250ZW50LW1vZHVsZVwiKS5jaGlsZHJlbihcImRpdlwiKS5hdHRyKFwiaWRcIik7XG4gICAgdGhpcy4kZnVsbEdyaWQgPSAkKFwiI1wiICsgdGhpcy5ncmlkSWQpO1xuICAgIHRoaXMuJGdhbGxlcnlDb250YWluZXIgPSAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJGlzb3RvcGVHYWxsZXJ5ID0gJChcIi5nYWxsZXJ5LWlzb3RvcGVcIik7XG4gIH1cblxuICBzZXR1cElzb3RvcGUoKSB7XG4gICAgLy8gaW5pdCBpc290b3BlXG4gICAgdGhpcy4kZ3JpZCA9IHRoaXMuJGZ1bGxHcmlkLmlzb3RvcGUoe1xuICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICAgICAgaXRlbVNlbGVjdG9yOiBcIi5nYWxsZXJ5LWl0ZW1cIixcbiAgICAgIGlzSW5pdExheW91dDogZmFsc2UsXG4gICAgICBtYXNvbnJ5OiB7XG4gICAgICAgIFwiY29sdW1uV2lkdGhcIjogXCIuZ3JpZC1zaXplclwiXG4gICAgICB9LFxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiBcIi4zc1wiXG4gICAgfSk7XG4gIH1cblxuICBnYWxsZXJ5SXNvdG9wZVdyYXBwZXIoKSB7XG4gICAgbGV0IHdpbmRvd1dpZHRoUmVmID0gJCh3aW5kb3cpLmlubmVyV2lkdGgoKTsgLy8gZm9yIHNjcm9sbCBiYXIgZml4IGN1cnJlbnRseVxuXG4gICAgLy8gSXMgY29udGFpbmVyIG9yIGZ1bGwgd2lkdGg/XG4gICAgaWYgKCB0aGlzLiRnYWxsZXJ5Q29udGFpbmVyLmhhc0NsYXNzKFwiY29udGFpbmVyXCIpICkge1xuICAgICAgdGhpcy5pc0NvbnRhaW5lZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy9cbiAgICBpZiAoIHdpbmRvd1dpZHRoUmVmID4gMTYwMCAmJiB0aGlzLmlzQ29udGFpbmVkID09PSBmYWxzZSApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gNTtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSA2MDAgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDE7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gOTkxICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAyO1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDExOTkgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gNDtcbiAgICB9XG5cbiAgICBpZiAoICQoXCIuZ2FsbGVyeS0zLWdyaWRcIikubGVuZ3RoID4gMCAmJiB3aW5kb3dXaWR0aFJlZiA+IDEyNDggKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDM7XG4gICAgfVxuXG4gICAgaWYgKCAkKFwiLmdhbGxlcnktNC1ncmlkXCIpLmxlbmd0aCA+IDAgJiYgd2luZG93V2lkdGhSZWYgPiAxNTg0ICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA0O1xuICAgIH1cblxuICAgIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoID0gJChcIi5nYWxsZXJ5LWNvbnRhaW5lclwiKS53aWR0aCgpO1xuXG4gICAgaWYgKCB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCAlIHRoaXMuZ2FsbGVyeV9ncmlkID4gMCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoID0gdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggKyAoIHRoaXMuZ2FsbGVyeV9ncmlkIC0gdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggJSB0aGlzLmdhbGxlcnlfZ3JpZCk7XG4gICAgfVxuICAgIHRoaXMuJGlzb3RvcGVHYWxsZXJ5LmNzcyhcIndpZHRoXCIsIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoKTtcblxuICAgIHJldHVybiB0aGlzLmdhbGxlcnlfZ3JpZDtcbiAgfVxuXG4gIHJlbG9hZElzb3RvcGUoKSB7XG4gICAgdGhpcy4kZ3JpZC5pc290b3BlKCk7XG4gICAgdGhpcy5zZXRNaW5IZWlnaHQoKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gY2hlY2sgaWYgaGVpZ2h0IGlzIGEgcm91bmQgbnVtYmVyIHRvIGVuc3VyZSBubyAxcHggaXNzdWVzXG4gICAgICB0aGlzLmNoZWNrQ29udGFpbmVySGVpZ2h0KCk7XG4gICAgfSwgNzAwKTtcbiAgfVxuXG4gIHNldE1pbkhlaWdodCgpIHtcblxuICAgIC8vIFNldCBtaW4gaGVpZ2h0IGRlcGVuZGluZyBvbmUgd2hhdCBjb250ZW50IHdhcyBmaWx0ZXJlZFxuICAgIHRoaXMuY3VycmVudEhlaWdodCA9ICQoXCIuZ2FsbGVyeS1pdGVtLndpZHRoMVwiKS5jc3MoXCJwYWRkaW5nLWJvdHRvbVwiKTtcbiAgICBsZXQgaGVpZ2h0U3RyID0gdGhpcy5jdXJyZW50SGVpZ2h0LnRvU3RyaW5nKCk7XG4gICAgdGhpcy5jdXJyZW50SGVpZ2h0UFggPSB0aGlzLnB4Q29udmVydChoZWlnaHRTdHIpO1xuXG4gICAgaWYgKCB0aGlzLmN1cnJlbnRIZWlnaHRQWCAhPT0gMCApIHtcblxuICAgICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkuY3NzKFwibWluLWhlaWdodFwiLCBNYXRoLnJvdW5kKHRoaXMuY3VycmVudEhlaWdodFBYKSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICB0aGlzLmN1cnJlbnRIZWlnaHRQWCA9ICQoXCIuZ2FsbGVyeS1pdGVtLndpZHRoMVwiKS5oZWlnaHQoKTtcblxuICAgICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkuY3NzKFwibWluLWhlaWdodFwiLCBNYXRoLnJvdW5kKHRoaXMuY3VycmVudEhlaWdodFBYKSk7XG5cbiAgICB9XG4gIH1cblxuICBweENvbnZlcnQoIG9iamVjdEhlaWdodDogc3RyaW5nICkge1xuICAgIHJldHVybiBwYXJzZUludChvYmplY3RIZWlnaHQuc2xpY2UoMCwgLTIpKTtcbiAgfVxuXG4gIGFkZEltYWdlVHJhbnNpdGlvbigpIHtcbiAgICAvLyBhZGQgdHJhbnNpdGlvbiBmb3IgaW50cm8gYW5pbWF0aW9uXG4gICAgJChcIi5nYWxsZXJ5LWl0ZW1cIikuY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIjYwMG1zXCIpO1xuICB9XG5cbiAgbG9hZEltYWdlc0luKCkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZShcIm9uY2VcIiwgXCJhcnJhbmdlQ29tcGxldGVcIiwgKCkgPT4ge1xuXG4gICAgICAvLyBmYWRlIGluXG4gICAgICAkKFwiLmdhbGxlcnktaXRlbVwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgLy8gcmVtb3ZlIGFuaW1hdGlvbiBmb3Igc21vb3RoIGZpbHRlcmluZ1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCIuZ2FsbGVyeS1pdGVtXCIpLmNzcyhcInRyYW5zaXRpb24tZHVyYXRpb25cIiwgXCIwbXNcIik7XG4gICAgICB9LCA1MDApO1xuXG4gICAgfSk7XG4gIH1cblxuICBjaGVja0NvbnRhaW5lckhlaWdodCgpIHtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmxhcHRvcCAmJiB0aGlzLiRpc290b3BlR2FsbGVyeS5oYXNDbGFzcyhcIndpZHRoLWNvbnRhaW5lZFwiKSkge1xuXG4gICAgICBsZXQgY3VycmVudEhlaWdodCA9IHRoaXMuJGlzb3RvcGVHYWxsZXJ5LmhlaWdodCgpO1xuXG4gICAgICB0aGlzLiRpc290b3BlR2FsbGVyeS5jc3MoXCJoZWlnaHRcIiwgY3VycmVudEhlaWdodC0xICsgXCJweFwiKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25SZXNpemUoKSB7XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZUlzb1RpbWVPdXQpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGNvbnRhaW5lciBoYXMgaXRlbXMgaW5zaWRlIGl0XG4gICAgaWYgKCAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLmxlbmd0aCA+IDAgKSB7XG5cbiAgICAgIC8vIHNldCBncmlkIGRpbWVuc2lvblxuICAgICAgdGhpcy5nYWxsZXJ5SXNvdG9wZVdyYXBwZXIoKTtcblxuICAgICAgLy8gb24gcmVzaXplIGNvbXBsZXRlLCByZS1hZGp1c3QgZ3JpZFxuICAgICAgdGhpcy5yZUlzb1RpbWVPdXQgPSBzZXRUaW1lb3V0KHRoaXMucmVsb2FkSXNvdG9wZS5iaW5kKHRoaXMpLCA1MDApO1xuXG4gICAgfVxuXG4gIH1cblxuICBvbkZpbHRlckNsaWNrKCBlbCwgZWwyICkge1xuICAgIGxldCAkdGhpcyA9ICQoZWwyLnRvRWxlbWVudCk7XG5cbiAgICAkdGhpcy5wYXJlbnQoKS5jaGlsZHJlbihcImxpXCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgIH0pO1xuXG4gICAgJHRoaXMuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgIGxldCBmaWx0ZXJWYWx1ZSA9ICR0aGlzLmF0dHIoXCJkYXRhLWZpbHRlclwiKTtcblxuICAgIHRoaXMucmVGaWx0ZXIoZmlsdGVyVmFsdWUpO1xuICB9XG5cbiAgcmVGaWx0ZXIoIGl0ZW0gKSB7XG4gICAgdGhpcy4kZ3JpZC5pc290b3BlKHtcbiAgICAgIGZpbHRlcjogaXRlbVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIklzb3RvcGUgSW5pdFwiKTtcblxuICAgIC8vIEFkZCB0cmFuc2l0aW9uIHRvIGFuaW1hdGUgaW1hZ2UgaW4gZ3JhY2VmdWxseVxuICAgIHRoaXMuYWRkSW1hZ2VUcmFuc2l0aW9uKCk7XG5cbiAgICAvLyBTZXR1cCBJc290b3BlIGZvciB0aGUgZmlyc3QgdGltZVxuICAgIHRoaXMuc2V0dXBJc290b3BlKCk7XG5cbiAgICAvLyBDcmVhdGUgcGVyZmVjdCBncmlkXG4gICAgdGhpcy5nYWxsZXJ5SXNvdG9wZVdyYXBwZXIoKTtcblxuICAgIC8vIGRlbGF5IGlzb3RvcGUgaW5pdCB1c2luZyBoZWxwZXIgZnVuY3Rpb24gdGhhdCBmaXJlcyBvbiByZXNpemVcbiAgICBzZXRUaW1lb3V0KHRoaXMucmVsb2FkSXNvdG9wZS5iaW5kKHRoaXMpLCAxMDAwKTtcblxuICAgIC8vIEFuaW1hdGUgSW1hZ2VzIGluIG9uTG9hZFxuICAgIHRoaXMubG9hZEltYWdlc0luKCk7XG5cbiAgICAvLyBBZGQgZmlsdGVyIG9uIENsaWNrXG4gICAgbGV0ICR0aGlzID0gdGhpcztcbiAgICAkKFwiLmZpbHRlci1ncm91cFwiKS5vbihcImNsaWNrXCIsIFwibGlcIiwgdGhpcy5vbkZpbHRlckNsaWNrLmJpbmQodGhpcywgJHRoaXMpKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxubGV0IElzb3RvcGVHYWxsZXJ5ID0gbmV3IEdhbGxlcnlDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSXNvdG9wZUdhbGxlcnk7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTbGlkZXJDb21wb25lbnQge1xuICBnYWxsZXJ5OiBKUXVlcnk7XG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICBjbG9zZUJ0bjogSlF1ZXJ5O1xuICBuZXh0QnRuOiBKUXVlcnk7XG4gIHByZXZCdG46IEpRdWVyeTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgY3VycmVudFNsaWRlOiBudW1iZXI7XG4gIHRvdGFsU2xpZGU6IG51bWJlcjtcbiAgY291bnRUb3RhbDogSlF1ZXJ5O1xuICBjdXJyZW50Q291bnQ6IEpRdWVyeTtcbiAgc2xpZGVyT3BlbjogYm9vbGVhbjtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvciggZWwgKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKGVsKTtcbiAgICB0aGlzLmdhbGxlcnkgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmhlYWRlci1zbGlkZXItZ2FsbGVyeVwiKTtcbiAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5oZWFkZXItc2xpZGVyLWNsb3NlXCIpO1xuICAgIHRoaXMubmV4dEJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyLW5hdmlnYXRpb24tbmV4dFwiKTtcbiAgICB0aGlzLnByZXZCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNsaWRlci1uYXZpZ2F0aW9uLXByZXZcIik7XG4gICAgdGhpcy5jb3VudFRvdGFsID0gdGhpcy5jb250YWluZXIuZmluZChcIi50b3RhbFwiKTtcbiAgICB0aGlzLmN1cnJlbnRDb3VudCA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuY3VycmVudFwiKTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLmN1cnJlbnRTbGlkZSA9IHRoaXMuaW5kZXggKyAxO1xuICAgIHRoaXMuc2xpZGVyT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmdhbGxlcnkuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldFRvdGFsU2xpZGVzKCk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gdGhpcy5nYWxsZXJ5LmNoaWxkcmVuKFwibGlcIikubGVuZ3RoO1xuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNsaWRlO1xuICB9XG5cbiAgdXBkYXRlQ3VycmVudFNsaWRlKCBldmVudCApIHtcblxuICAgIGlmICggZXZlbnQgPT09IFwicmlnaHRcIiApIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZXgtLTtcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlLS07XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVOYXYoIGluZGV4OiBudW1iZXIsIHNlbGVjdGVkOiBKUXVlcnkgKSB7XG5cbiAgICAvLyB1cGRhdGUgbnVtYmVycyBvbiBzY3JlZW5cbiAgICB0aGlzLmN1cnJlbnRDb3VudC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICAgIC8vIEVuYWJsZS9EaXNhYmxlIGFycm93IGJ0bnNcbiAgICB0aGlzLnByZXZCdG4ucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmZpcnN0LWNoaWxkXCIpKTtcbiAgICB0aGlzLm5leHRCdG4ucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmxhc3QtY2hpbGRcIikpO1xuICB9XG5cbiAgdXBkYXRlU2xpZGUoIGRpcmVjdGlvbiApIHtcblxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTtcblxuICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAvLyByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGNsYXNzLCB0aGVuIG1vdmUgbGVmdFxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIikuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgY3VycmVudFNsaWRlLm5leHQoKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGNsYXNzLCB0aGVuIG1vdmUgbGVmdFxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBjdXJyZW50U2xpZGUucHJldigpLmFkZENsYXNzKFwic2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBpbmRleFxuICAgIHRoaXMudXBkYXRlQ3VycmVudFNsaWRlKGRpcmVjdGlvbik7XG5cbiAgICAvLyB1cGRhdGUgTmF2aWdhdGlvblxuICAgIHRoaXMudXBkYXRlTmF2KHRoaXMuaW5kZXgsIHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcbiAgfVxuXG4gIGFycm93SGFuZGxlciggZXZlbnQgKSB7XG5cbiAgICAvLyBjaGVjayB3aGljaCBrZXkgd2FzIHByZXNzZWQgYW5kIG1ha2Ugc3VyZSB0aGUgc2xpZGUgaXNuJ3QgdGhlIGJlZ2lubmluZyBvciB0aGUgbGFzdCBvbmVcbiAgICBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJyaWdodFwiICYmIHRoaXMuY3VycmVudFNsaWRlICE9PSB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG5cbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuc2xpZGVyT3BlbiApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA8PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwibGVmdFwiICYmIHRoaXMuY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCAmJiB0aGlzLnNsaWRlck9wZW4gKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA8PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgb3BlblNsaWRlciggZWwsIGV2ZW50ICkge1xuICAgIC8vIGVsID0gdGhpc1xuICAgIC8vIGVsMiBpcyBldmVudFxuICAgIGlmICggIXRoaXMuY29udGFpbmVyLmhhc0NsYXNzKFwiaXMtYWN0aXZlXCIpICYmICQoZXZlbnQuY3VycmVudFRhcmdldCkuaXModGhpcy5nYWxsZXJ5KSApIHtcblxuICAgICAgdGhpcy5zbGlkZXJPcGVuID0gdHJ1ZTtcblxuICAgICAgdGhpcy5jb250YWluZXJcbiAgICAgICAgLmFkZENsYXNzKFwiaXMtYWN0aXZlXCIpXG4gICAgICAgIC5vbmUoXG4gICAgICAgICAgXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIFwiICtcbiAgICAgICAgICBcIm90cmFuc2l0aW9uZW5kIFwiICtcbiAgICAgICAgICBcIm9UcmFuc2l0aW9uRW5kIFwiICtcbiAgICAgICAgICBcIm1zVHJhbnNpdGlvbkVuZCBcIiArXG4gICAgICAgICAgXCJ0cmFuc2l0aW9uZW5kXCIsICgpID0+IHtcblxuICAgICAgICAgICQoXCJib2R5LGh0bWxcIilcbiAgICAgICAgICAgIC5hbmltYXRlKHsgXCJzY3JvbGxUb3BcIjogdGhpcy5jb250YWluZXIub2Zmc2V0KCkudG9wIH0sIDIwMCk7XG5cbiAgICAgICAgICAvLyBDbG9zZSBCdG4gYW5pbWF0ZSBpblxuICAgICAgICAgIGxldCBjbG9zZUJ0bkFuaW1hdGlvbiA9IFR3ZWVuTWF4LnRvKHRoaXMuY2xvc2VCdG4sIC4zLCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgIHg6IC0zMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgICAgICAgIGRlbGF5OiAuM1xuICAgICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVNsaWRlciggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2xhc3MoXCJpcy1hY3RpdmVcIik7XG5cbiAgICB0aGlzLnNsaWRlck9wZW4gPSBmYWxzZTtcblxuICAgIFR3ZWVuTGl0ZVxuICAgICAgLnRvKCQod2luZG93KSwgLjUsXG4gICAgICAgIHtcbiAgICAgICAgICBzY3JvbGxUbzogeyB5OiAwIH0sIGVhc2U6IFBvd2VyMi5lYXNlT3V0LFxuICAgICAgICAgIGRlbGF5OiAuNVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgbGV0IGNsb3NlQnRuQW5pbWF0aW9uID0gVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB6OiAuMDAxLFxuICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgICAgICByaWdodDogNTBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5Lm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2xpZGVyLmJpbmQodGhpcywgJHRoaXMpKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdhbGxlcnkub2ZmKCk7XG4gICAgICAgIHRoaXMuY2xvc2VCdG4ub2ZmKCk7XG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgLy8gQ3JlYXRlIEJpbmRpbmcgRXZlbnRzXG4gICAgdGhpcy5jaGVja1NpemUoKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIExlZnQgYW5kIHJpZ2h0IGV2ZW50c1xuICAgIHRoaXMubmV4dEJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJyaWdodFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMucHJldkJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJsZWZ0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBKcXVlcnkga2V5cyBwbHVnaW5cbiAgICAkKGRvY3VtZW50KVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwibGVmdFwiLCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwiZXNjXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSlcbiAgICAgIC5iaW5kKFwia2V5ZG93blwiLCBcInJpZ2h0XCIsIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgLy8gdXBkYXRlIG5hdiBvbiBmaXJzdCBsb2FkXG4gICAgdGhpcy51cGRhdGVOYXYodGhpcy5pbmRleCwgdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRUb3RhbFNsaWRlcygpKSk7XG4gIH1cbn1cblxuLy8gbG9vcCB0aHJvdWdoIGVhY2ggaGVhZGVyIHNsaWRlciBvYmplY3Qgb24gdGhlIHBhZ2VcbmNsYXNzIEhlYWRlclNsaWRlckNvbXBvbmVudCB7XG5cbiAgaXRlbUluZm9XcmFwcGVyOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIgPSAkKFwiLmhlYWRlci1zbGlkZXItY29udGFpbmVyXCIpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkhlYWRlciBTbGlkZXIgaW5pdFwiKTtcblxuICAgIHRoaXMuaXRlbUluZm9XcmFwcGVyLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIC8vIFBhc3MgXCJ0aGlzXCIgdG8gZWFjaCBuZXcgSGVhZGVyIHNsaWRlciBjb21wb25lbnRcbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2xpZGVyQ29tcG9uZW50KGVsKTtcbiAgICAgIHNsaWRlci5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5sZXQgSGVhZGVyU2xpZGVyID0gbmV3IEhlYWRlclNsaWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJTbGlkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5cbmNsYXNzIFN2Z0hlYWRlckNvbXBvbmVudCB7XG4gIHN2ZzogSlF1ZXJ5O1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgd2luZG93OiBKUXVlcnk7XG4gIHdpbldpZHRoOiBudW1iZXI7XG4gIHByb3BvcnRpb246IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN2ZyA9ICQoXCIuZGl2aWRlci1zdmdcIik7XG4gICAgdGhpcy53aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy5wcm9wb3J0aW9uID0gMTg7XG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpbldpZHRoIC8gdGhpcy5wcm9wb3J0aW9uO1xuICB9XG5cbiAgX3NldFdpbmRvd1dpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuICQod2luZG93KS53aWR0aCgpO1xuICB9XG5cbiAgX3NldFN2Z0hlaWdodCgpOiBudW1iZXIge1xuICAgIGxldCBoZWlnaHQgPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpIC8gMTg7XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgcmVzaXplU3ZnKCkge1xuXG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9zZXRTdmdIZWlnaHQoKTtcblxuICAgIC8vIHNldCB3aWR0aCBvZiBpdGVtXG4gICAgLy8gdGhpcy5zdmcuYXR0cihcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuICAgIHRoaXMuc3ZnLmNzcyhcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuXG4gICAgLy8gc2V0IGhlaWdodCBwcm9wb3J0aW9uIG9mIDI4XG4gICAgdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zdmcuaGVpZ2h0KHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGFuaW1hdGVJbigpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFuaW1hdGUgSW5cIik7XG5cbiAgICB0aGlzLnN2ZyA9ICQoXCIuZGl2aWRlci1zdmdcIik7XG4gICAgdGhpcy5wcm9wb3J0aW9uID0gMTg7XG4gICAgdGhpcy53aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMud2luZG93LndpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpbldpZHRoIC8gdGhpcy5wcm9wb3J0aW9uO1xuXG4gICAgLy8gc2V0IHdpZHRoIG9mIGl0ZW1cbiAgICB0aGlzLnN2Zy5hdHRyKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG5cbiAgICAvLyBzZXQgaGVpZ2h0IHByb3BvcnRpb24gb2YgMjhcbiAgICB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN2Zy5oZWlnaHQodGhpcy5oZWlnaHQpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuc3ZnLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBib3R0b206IFwiLTNweFwiLFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlN2ZyBoZWFkZXIgbG9hZGVkXCIpO1xuXG4gICAgLy8gdGhpcy5zdmcuaGVpZ2h0KHRoaXMuX3NldFN2Z0hlaWdodCgpKTtcbiAgICAvLyB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuX3NldFN2Z0hlaWdodCgpKTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLnN2ZywgLjEsIHtcbiAgICAgIHk6IFwiM1wiLFxuICAgICAgejogXCIuMDAxXCIsXG4gICAgICB3aWR0aDogdGhpcy5fc2V0V2luZG93V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5fc2V0U3ZnSGVpZ2h0KCksXG4gICAgICBkZWxheTogMCxcbiAgICAgIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCJcbiAgICB9KTtcblxuXG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5yZXNpemVTdmcuYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgfVxufVxuXG5sZXQgU3ZnSGVhZGVyID0gbmV3IFN2Z0hlYWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdmdIZWFkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbi8vIFRPRE86IFNpZGViYXIgaW1hZ2UgbG9hZGluZ1xuY2xhc3MgSW1hZ2VMb2FkZXJDb21wb25lbnQge1xuICBhcnI6IHN0cmluZ1tdO1xuICBib2R5OiBKUXVlcnk7XG4gIGNvbnRlbnQ6IEpRdWVyeTtcbiAgaGVybzogSlF1ZXJ5O1xuICBoYXNIZXJvOiBudW1iZXI7XG4gIGJnSW1hZ2U6IEpRdWVyeTtcbiAgaGFzQmdJbWFnZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXJyID0gW107XG4gICAgdGhpcy5ib2R5ID0gJChcImJvZHlcIik7XG4gICAgdGhpcy5jb250ZW50ID0gJChcIiNjb250ZW50XCIpO1xuICAgIHRoaXMuaGVybyA9ICQoXCIuaGVyb1wiKTtcbiAgICB0aGlzLmhhc0hlcm8gPSB0aGlzLmhlcm8ubGVuZ3RoO1xuICAgIHRoaXMuYmdJbWFnZSA9ICQoXCIuaW1nLWxvYWRlci1iZ1wiKTtcbiAgICB0aGlzLmhhc0JnSW1hZ2UgPSB0aGlzLmJnSW1hZ2UubGVuZ3RoO1xuICB9XG5cbiAgYW5pbWF0ZUJsb2dQcmltYXJ5KCk6IHZvaWQge1xuICAgIGxldCBibG9nUHJpbWFyeSA9ICQoXCIucHJpbWFyeVwiKTtcbiAgICBsZXQgYmxvZ0JnSW1hZ2UgPSBibG9nUHJpbWFyeS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuXG4gICAgaWYgKCBibG9nQmdJbWFnZSAhPT0gXCJub25lXCIgKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBUd2VlbkxpdGVcbiAgICAgICAgICAudG8oYmxvZ1ByaW1hcnksIC4zLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB6OiBcIi4wMDFcIixcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfSwgMzAwKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZW1vdmVcbiAgLy8gYW5pbWF0ZUhlcm9IZWFkZXIoKTogdm9pZCB7XG4gIC8vICAgbGV0IGIgPSB0aGlzLmhlcm8uZmluZChcIi5oZXJvLWJhY2tncm91bmRcIikuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKTtcbiAgLy9cbiAgLy8gICBpZiAoIGIgIT09IFwibm9uZVwiICkge1xuICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gIC8vXG4gIC8vICAgICAgIHRoaXMuaGVyby5hZGRDbGFzcyhcImxvYWRlZFwiKTtcbiAgLy9cbiAgLy8gICAgICAgVHdlZW5MaXRlXG4gIC8vICAgICAgICAgLnRvKHRoaXMuaGVybywgLjQsXG4gIC8vICAgICAgICAgICB7XG4gIC8vICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgKTtcbiAgLy8gICAgIH0sIDMwMCk7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy9cbiAgLy8gICAgIHRoaXMuaGVyby5hZGRDbGFzcyhcImxvYWRlZFwiKTtcbiAgLy9cbiAgLy8gICB9XG4gIC8vIH1cblxuICBhbmltYXRlQmxvZ0FydGljbGVzKCk6IHZvaWQge1xuICAgIGxldCBhbmltYXRlID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGFuaW1hdGUudG8odGhpcy5hcnJbIGkgXSwgMC4xLCB7IG9wYWNpdHk6IFwiMVwiLCBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByZWxvYWRJbWFnZXMoKTogdm9pZCB7XG4gICAgdGhpcy5hcnIgPSBbXTtcblxuICAgIHRoaXMuY29udGVudC5pbWFnZXNMb2FkZWQoeyBiYWNrZ3JvdW5kOiB0cnVlIH0sICgpID0+IHtcblxuICAgICAgICAvLyBCbG9nIHByaW1hcnkgYXJ0aWNsZVxuICAgICAgICB0aGlzLmJvZHkuaGFzQ2xhc3MoXCJibG9nXCIpID8gdGhpcy5hbmltYXRlQmxvZ1ByaW1hcnkoKSA6IFwiXCI7XG5cbiAgICAgICAgLy8gSGVybyBoZWFkZXIgaW50cm9cbiAgICAgICAgLy8gdGhpcy5oYXNIZXJvID4gMCA/IHRoaXMuYW5pbWF0ZUhlcm9IZWFkZXIoKSA6IFwiXCI7XG4gICAgICAgIHRoaXMuaGFzQmdJbWFnZSA+IDAgPyB0aGlzLmJnSW1hZ2UuYWRkQ2xhc3MoXCJsb2FkZWRcIikgOiBcIlwiO1xuXG4gICAgICB9KVxuICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoIGluc3RhbmNlICkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBpbWFnZXMgbG9hZGVkXCIpO1xuICAgICAgfSlcbiAgICAgIC5kb25lKCggaW5zdGFuY2UgKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBzdWNjZXNzZnVsbHkgbG9hZGVkXCIpO1xuXG4gICAgICAgIC8vIEFuaW1hdGlvbiBmb3IgQmxvZyBpbmRleCBob21lcGFnZVxuICAgICAgICB0aGlzLmFuaW1hdGVCbG9nQXJ0aWNsZXMoKTtcbiAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcihcImltZ0xvYWRlZFwiKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEV4YW1wbGUgb24gaG93IHRvIHRyaWdnZXIgZXZlbnRzIGVsc2V3aGVyZVxuICAgICAgICAvLyAkKGRvY3VtZW50KS5vbihcImltZ0xvYWRlZFwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcImltYWdlIGxvYWRlZCBjdXN0b20gZXZlbnRcIik7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICB9KVxuICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBpbWFnZXMgbG9hZGVkLCBhdCBsZWFzdCBvbmUgaXMgYnJva2VuXCIpO1xuICAgICAgfSlcbiAgICAgIC5wcm9ncmVzcygoIGluc3RhbmNlLCBpbWFnZSApID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGltYWdlLmlzTG9hZGVkID8gXCJsb2FkZWRcIiA6IFwiYnJva2VuXCI7XG5cbiAgICAgICAgaWYgKCByZXN1bHQgKSB7XG4gICAgICAgICAgdGhpcy5hcnIucHVzaChpbWFnZS5pbWcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW1hZ2UgaXMgXCIgKyByZXN1bHQgKyBcIiBmb3IgXCIgKyBpbWFnZS5pbWcuc3JjKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcblxuICAgIGNvbnNvbGUubG9nKFwiSW1hZ2UgUHJlbG9hZGVyIE1vZHVsZVwiKTtcblxuICAgIHRoaXMucHJlbG9hZEltYWdlcygpO1xuICB9XG59XG5cbmxldCBJbWFnZUxvYWRlciA9IG5ldyBJbWFnZUxvYWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxvYWRlcjsiLCJkZWNsYXJlIHZhciBTY3JvbGxNYWdpYzogYW55O1xuY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuY2xhc3MgQW5pbWF0aW9uQ29tcG9uZW50IHtcblxuICBjb250YWluZXI6IEpRdWVyeTtcbiAgaXRlbTogSlF1ZXJ5O1xuICBtU2NlbmU6IEpRdWVyeTtcbiAgc2VydmljZVNpZGVCYXI6IEpRdWVyeTtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChcIi5wcm9jZXNzLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLml0ZW0gPSAkKFwiLnByb2Nlc3MtaXRlbS1jb250YWluZXJcIik7XG4gICAgdGhpcy5tU2NlbmUgPSAkKFwiLm0tc2NlbmVcIik7XG4gICAgdGhpcy5zZXJ2aWNlU2lkZUJhciA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gIH1cblxuICBkZXNjX29fYW5pbWF0ZSgpIHtcbiAgICBpZiAoICQoXCIuZGVzYy1vLWFuaW1hdGVcIikubGVuZ3RoID4gMCApIHtcbiAgICAgIGxldCB3aXBlQW5pbWF0aW9uID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICB3aXBlQW5pbWF0aW9uLmFkZChbXG4gICAgICAgIFR3ZWVuTWF4LmZyb21UbygkKFwiLmRlc2Mtby1pbWFnZS0xXCIpLCAxLCB7IHlQZXJjZW50OiAwIH0sIHsgeVBlcmNlbnQ6IC0yMCwgZWFzZTogUG93ZXIwLmVhc2VJbk91dCB9KVxuICAgICAgXSk7XG5cbiAgICAgIGxldCB3aXBlQW5pbWF0aW9uMiA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgd2lwZUFuaW1hdGlvbjIuYWRkKFtcbiAgICAgICAgVHdlZW5NYXguZnJvbVRvKCQoXCIuZGVzYy1vLWltYWdlLTJcIiksIDEsIHsgeVBlcmNlbnQ6IDAsIH0sIHsgeVBlcmNlbnQ6IC0xMDUsIGVhc2U6IFBvd2VyMC5lYXNlSW5PdXQgfSlcbiAgICAgIF0pO1xuXG4gICAgICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cbiAgICAgIGxldCBzY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgICAge1xuICAgICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5kZXNjLW8tYW5pbWF0ZVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAkKFwiLmRlc2Mtby1hbmltYXRlXCIpLmhlaWdodCgpLFxuICAgICAgICAgIG9mZnNldDogLTEwMFxuICAgICAgICB9KVxuICAgICAgLy8gLnNldFBpbihcIi5kZXNjLW8taW1hZ2UtMVwiKVxuICAgICAgICAuc2V0VHdlZW4od2lwZUFuaW1hdGlvbilcbiAgICAgICAgLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBFbClcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgICAuYWRkVG8oY29udHJvbGxlcik7XG5cbiAgICAgIGxldCBzY2VuZTIgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICAgIHtcbiAgICAgICAgICB0cmlnZ2VyRWxlbWVudDogXCIuZGVzYy1vLWFuaW1hdGVcIixcbiAgICAgICAgICBkdXJhdGlvbjogJChcIi5kZXNjLW8tYW5pbWF0ZVwiKS5oZWlnaHQoKSArIDEwMCxcbiAgICAgICAgfSlcbiAgICAgIC8vIC5zZXRQaW4oXCIuZGVzYy1vLWltYWdlLTFcIilcbiAgICAgICAgLnNldFR3ZWVuKHdpcGVBbmltYXRpb24yKVxuICAgICAgICAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMiAoZHVyYXRpb246IEVsKVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAgIC5hZGRUbyhjb250cm9sbGVyKTtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzQW5pbWF0ZUluKCkge1xuICAgIGxldCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbTtcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG4gICAgbGV0IHNjZW5lID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKFxuICAgICAge1xuICAgICAgICB0cmlnZ2VyRWxlbWVudDogXCIucHJvY2Vzcy1jb250YWluZXJcIixcbiAgICAgICAgZHVyYXRpb246IGNvbnRhaW5lci5oZWlnaHQoKSxcbiAgICAgICAgLy8gb2Zmc2V0OiB0aGlzLmFzaWRlT2Zmc2V0LFxuICAgICAgfSlcbiAgICAgIC5vbihcImVudGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXRlbS5maW5kKFwiLnByb2Nlc3MtaXRlbS1pbm5lclwiKS5hZGRDbGFzcyhcImluXCIpO1xuICAgICAgICBjb250YWluZXIuZmluZChcImltZ1wiKS5hZGRDbGFzcyhcImluXCIpO1xuICAgICAgfSlcbiAgICAgIC8vIC5hZGRJbmRpY2F0b3JzKHsgbmFtZTogXCIxIChkdXJhdGlvbjogb2Zmc2V0PylcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgLmFkZFRvKGNvbnRyb2xsZXIpO1xuICB9XG5cbiAgYW5pbWF0ZVdpbmRvd1RvcCgpIHtcbiAgICBjb25zb2xlLmxvZyhcImFuaW1hdGUgVG9wXCIpO1xuICAgIFR3ZWVuTGl0ZVxuICAgICAgLnRvKCQod2luZG93KSwgLjMsXG4gICAgICAgIHtcbiAgICAgICAgICBzY3JvbGxUbzoge1xuICAgICAgICAgICAgeTogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG4gIGFuaW1hdGVTZXJ2aWNlU2lkZWJhck91dCgpIHtcbiAgICBUd2VlbkxpdGUudG8odGhpcy5zZXJ2aWNlU2lkZUJhciwgLjMsIHtcbiAgICAgIHg6IFwiLTEwMFwiLFxuICAgICAgejogXCIuMDAxXCIsXG4gICAgICBkZWxheTogMCxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiLFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAvLyByZW1vdmUgc2lkZWJhciBodG1sIGVsZW1lbnQgc28gaXQgZG9lc250IHNob3cgdXAgYWdhaW4gd2hlbiBzY3JvbGxpbmcgdXBcbiAgICAgICAgdGhpcy5zZXJ2aWNlU2lkZUJhci5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRVcmwoIHVybCApIHtcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICB9XG5cbiAgbWFpbkNvbnRlbnRBbmltYXRpb25PdXQoIGNhbGxiYWNrICkge1xuXG4gICAgLy8gTG9hZCBpbiBhbmltYXRpb25zIGhlcmVcbiAgICB0aGlzLmFuaW1hdGVTZXJ2aWNlU2lkZWJhck91dCgpO1xuXG5cbiAgICB0aGlzLm1TY2VuZS5hZGRDbGFzcyhcImlzLWV4aXRpbmdcIilcbiAgICAgIC8vIElmIGhhcyB3ZWJraXRBbmltYXRpb25FbmQgLSBpdCBnZXRzIGNhbGxlZCB0d2ljZVxuICAgICAgLm9uZShcIm9hbmltYXRpb25lbmQgbXNBbmltYXRpb25FbmQgYW5pbWF0aW9uZW5kXCIsICgpID0+IHtcblxuICAgICAgICAvLyBMb2FkIGluIGFuaW1hdGlvbnMgaGVyZSB0aGF0IG5lZWQgdG8gb2NjdXIgYWZ0ZXIgbWFpbiBvbmVzXG4gICAgICAgIHRoaXMuYW5pbWF0ZVdpbmRvd1RvcCgpO1xuXG4gICAgICB9KTtcblxuICAgIGlmICggdHlwZW9mKGNhbGxiYWNrKSA9PT0gXCJmdW5jdGlvblwiICkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNoZWNrVXJsKCB1cmwgKTogYm9vbGVhbiB7XG4gICAgaWYgKCB1cmwubWF0Y2goL14jLykgIT09IG51bGwgfHwgdXJsID09PSBcIlwiICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnbG9iYWxDbGlja0NoZWNrKCBldmVudD8gKSB7XG5cbiAgICAvLyBHZXQgdXJsIGZyb20gdGhlIGEgdGFnXG4gICAgbGV0IG5ld1VybCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcImhyZWZcIik7XG4gICAgbGV0IGhhc0NoaWxkcmVuID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoXCJsaVwiKS5oYXNDbGFzcyhcIm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIik7XG5cbiAgICAvKlxuICAgICAqIEZpcnN0IFZhbGlkYXRpb246IElzIHRoZSB1cmwgdmFsaWRcbiAgICAgKi9cbiAgICBpZiAoICF0aGlzLmNoZWNrVXJsKG5ld1VybCkgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogSWYgZmlyc3QgdmFsaWRhdGlvbiBmYWlscywgdGhlIHVybCBpcyByZWFsIGFuZCBjb250aW51ZSB2YWxpZGF0aW5nXG4gICAgICovXG4gICAgLypcbiAgICAgKiBDaGVjayBpZiBpdHMgaG9yaXpvbnRhbCB0YWJsZXRcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPiBVdGlscy5icHMudGFibGV0ICYmXG4gICAgICB0aGlzLmNoZWNrVXJsKG5ld1VybCkgJiZcbiAgICAgIFV0aWxzLmJyb3dzZXIgPT09IFwiaXBhZFwiICYmIGhhc0NoaWxkcmVuICkge1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gY29uc29sZS5sb2coJ1RhYmxldCBOYXYgY2xpY2snKTtcbiAgICAgIHJldHVybjtcblxuICAgIH0gZWxzZSBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPiBVdGlscy5icHMudGFibGV0ICYmIHRoaXMuY2hlY2tVcmwobmV3VXJsKSApIHtcblxuICAgICAgLypcbiAgICAgICAqIENoZWNrIGlmIGl0cyBsYXJnZXIgdGhhbiB0YWJsZXQgYnV0IG5vdCBhbiBpcGFkXG4gICAgICAgKi9cblxuICAgICAgLy8gY29uc29sZS5sb2coXCJsYXB0b3Agb3IgbGFyZ2VyXCIpO1xuICAgICAgdGhpcy5tYWluQ29udGVudEFuaW1hdGlvbk91dCggKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICggdGhpcy5jaGVja1VybChuZXdVcmwpICYmIGhhc0NoaWxkcmVuICkge1xuXG4gICAgICAvKlxuICAgICAgICogQ2hlY2sgaWYgaXRzIG1vYmlsZSBuYXYgbWVudSB0aGF0IGhhcyBjaGlsZHJlblxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW9iaWxlIG1lbnUgaXMgYWN0aXZlIGFuZCBwYXJlbnQgY2xpY2tlZFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogUGFzc2VkIHRoZSBjaGVja3MgTG9hZCBpdCFcbiAgICAgICAqL1xuXG4gICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICB9XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5wcm9jZXNzQW5pbWF0ZUluKCk7XG4gICAgdGhpcy5kZXNjX29fYW5pbWF0ZSgpO1xuXG4gICAgLy8gQ2xpY2sgZXZlbnQgdG8gY29udHJvbCB3aW5kb3cgTG9hZGluZ1xuICAgICQoXCJhXCIpLm9uKFwiY2xpY2tcIiwgKCBlICkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5nbG9iYWxDbGlja0NoZWNrKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gQ3VzdG9tIGV2ZW50IGV4YW1wbGVcbiAgICAvLyAkKGRvY3VtZW50KS5vbihcInRlc3RcIiwge30sICggZXZlbnQsIGFyZzEsIGFyZzIgKSA9PiB7XG4gICAgLy9cbiAgICAvLyAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJnMSk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZzIpO1xuICAgIC8vICAgfVxuICAgIC8vXG4gICAgLy8gfSkuYmluZCh0aGlzKTtcbiAgfVxufVxuXG5sZXQgQW5pbWF0aW9uQ29udHJvbGxlciA9IG5ldyBBbmltYXRpb25Db21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgQW5pbWF0aW9uQ29udHJvbGxlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cblxuaW50ZXJmYWNlIFF1b3RlU3RhdGVJbnRlcmZhY2Uge1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBpc0Zvcm1BY3RpdmU6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBRdW90ZVNlbGVjdGVkT2JqZWN0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgcHJpY2U6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgYnVsbGV0czogT2JqZWN0O1xuICBpbWdTcmM6IHN0cmluZztcbn1cblxuY2xhc3MgUXVvdGVDb21wb25lbnQge1xuXG4gIHNlbGVjdEJ0bjogSlF1ZXJ5O1xuICBzd2l0Y2hCdG46IEpRdWVyeTtcbiAgZm9ybUJ1aWxkZXI6IEpRdWVyeTtcbiAgcXVvdGVDaG9vc2VyOiBKUXVlcnk7XG4gIGlucHV0czogSlF1ZXJ5O1xuICBxdW90ZUl0ZW1zQXJyYXk6IEpRdWVyeTtcbiAgc2VsZWN0Q29uYWluZXI6IEpRdWVyeTtcbiAgc3RhdGU6IFF1b3RlU3RhdGVJbnRlcmZhY2U7XG4gIHF1b3RlQ29udGFpbmVyOiBKUXVlcnk7XG4gIHNlbGVjdGVkSXRlbTogUXVvdGVTZWxlY3RlZE9iamVjdDtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgY3VycmVudEJyZWFrcG9pbnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1b3RlQ29udGFpbmVyID0gJChcIi5xdW90ZVwiKTtcbiAgICB0aGlzLnNlbGVjdEJ0biA9ICQoXCIucXVvdGVfX3NlbGVjdC0tYnRuXCIpO1xuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5ID0gJChcIi5xdW90ZV9faXRlbVwiKTtcbiAgICB0aGlzLmZvcm1CdWlsZGVyID0gJChcIi5xdW90ZV9fZm9ybS0taW5wdXRcIik7XG4gICAgdGhpcy5xdW90ZUNob29zZXIgPSAkKFwiLnF1b3RlX19mb3JtLS1zZWxlY3RcIik7XG4gICAgdGhpcy5zZWxlY3RDb25haW5lciA9IHRoaXMuc2VsZWN0QnRuLmZpbmQoXCIuZmllbGRzZXRcIik7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkOiAnJyxcbiAgICAgIGlzRm9ybUFjdGl2ZTogZmFsc2VcbiAgICB9O1xuICAgIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgPSBVdGlscy5icmVha3BvaW50O1xuXG4gIH1cblxuICBnZXRTZWxlY3RlZExhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdENvbmFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBzZXRXaWR0aCggbGFiZWw6IEpRdWVyeSApIHtcblxuICAgIGxldCBsYWJlbFdpZHRoID0gbGFiZWwub3V0ZXJXaWR0aCgpO1xuICAgIHRoaXMuc3dpdGNoQnRuLmNzcyhcIndpZHRoXCIsIGxhYmVsV2lkdGgpO1xuXG4gIH1cblxuICBidWlsZFNlbGVjdEJveCgpIHtcblxuICAgIGxldCBuYW1lcyA9IFtdO1xuICAgIGxldCBmcmFnbWVudCA9ICQoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcblxuICAgIC8vIGdldCBoMiB0aXRsZXMgZnJvbSBlYWNoIHF1b3RlIGl0ZW1cbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgdGl0bGUgPSAkdGhpcy5maW5kKFwiaDJcIikudGV4dCgpLFxuICAgICAgICBuYW1lID0gdGl0bGUudG9Mb2NhbGVMb3dlckNhc2UoKSxcbiAgICAgICAgdW5pcXVlSWQgPSBuYW1lICsgXCItXCIgKyBpbmRleDtcblxuICAgICAgLy8gQWRkIG1hdGNoaW5nIElEJ3MgdG8gZWFjaCBDYXJkXG4gICAgICAkdGhpcy5hdHRyKFwiaWRcIiwgdW5pcXVlSWQpO1xuXG4gICAgICAvLyBDcmVhdGUgaW5wdXQgYW5kIGxhYmVsIERPTSBlbGVtZW50c1xuICAgICAgbGV0IGlucHV0ID0gVXRpbHMuYnVpbGRIdG1sKFwiaW5wdXRcIiwge1xuICAgICAgICBpZDogdW5pcXVlSWQsXG4gICAgICAgIHR5cGU6IFwicmFkaW9cIixcbiAgICAgICAgY2xhc3M6IFwicXVvdGVfX2lucHV0XCIsXG4gICAgICAgIG5hbWU6IHVuaXF1ZUlkLFxuICAgICAgICB2YWx1ZTogbmFtZVxuICAgICAgfSk7XG5cbiAgICAgIGxldCBsYWJlbCA9IFV0aWxzLmJ1aWxkSHRtbChcImxhYmVsXCIsIHtcbiAgICAgICAgZm9yOiB1bmlxdWVJZCxcbiAgICAgICAgY2xhc3M6IGluZGV4ID09PSAwID8gXCJzZWxlY3RlZFwiIDogXCJcIlxuICAgICAgfSwgdGl0bGUpO1xuXG5cbiAgICAgIGZyYWdtZW50LmFwcGVuZChpbnB1dCkuYXBwZW5kKGxhYmVsKTtcblxuICAgIH0pO1xuXG4gICAgZnJhZ21lbnQuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInF1b3RlX19zd2l0Y2ggc2hhZG93LXNtYWxsLWJ0blwiPjwvc3Bhbj4nKTtcblxuICAgIHRoaXMuc2VsZWN0Q29uYWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICB9XG5cbiAgYnVpbGRTZWxlY3RFdmVudEhhbmRsZXJzKCkge1xuICAgIHRoaXMuaW5wdXRzID0gdGhpcy5zZWxlY3RCdG4uZmluZChcIi5xdW90ZV9faW5wdXRcIik7XG4gICAgdGhpcy5zd2l0Y2hCdG4gPSAkKFwiLnF1b3RlX19zd2l0Y2hcIik7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZWFjaCBpdGVtIGFuZCBzZXQgd2lkdGggYW5kIGNoYW5nZSBldmVudHMgYW5kIGNoZWNrZWQgc3RhdHVzXG4gICAgdGhpcy5pbnB1dHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gJChlbCksXG4gICAgICAgIG5leHRMYWJlbCA9ICR0aGlzLm5leHQoKTtcblxuICAgICAgaWYgKCBpbmRleCA9PT0gMCApIHtcbiAgICAgICAgJHRoaXMucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gc2V0IHN0YXRlIHRvIGN1cnJlbnQgc2VsZWN0ZWQgaW5wdXQgSURcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gZmluZCBTZWxlY3RlZCwgZ2V0IHdpZHRoIG9mIGxhYmVsLCBzZXQgd2lkdGggb2Ygc3BhblxuICAgICAgaWYgKCBuZXh0TGFiZWwuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSApIHtcbiAgICAgICAgdGhpcy5zZXRXaWR0aChuZXh0TGFiZWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgb24gY2hhbmdlIGZ1bmN0aW9uIGhlcmVcbiAgICAgICR0aGlzLmNoYW5nZSh0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRDYXJkRXZlbnRIYW5kbGVycygpIHtcblxuICAgIC8vIE1haW4gQ2FyZHNcbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgYnV0dG9uID0gJHRoaXMuZmluZChcIi5jYXJkX19pdGVtLS1idG5cIik7XG5cbiAgICAgIGJ1dHRvbi5vbihcImNsaWNrXCIsIHRoaXMub3BlbkZvcm0uYmluZCh0aGlzKSk7XG5cbiAgICB9KTtcblxuICAgIC8vIEJhY2sgYnV0dG9uIGZvciB0YWJsZXRcbiAgICBsZXQgYnV0dG9uID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnRhYmxldFwiKS5maW5kKFwiLmdvLWJhY2tcIik7XG4gICAgYnV0dG9uLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKSk7XG5cbiAgfVxuXG4gIGZhZGVJbiggZWw6IEpRdWVyeSApIHtcblxuICAgIFR3ZWVuTWF4LnRvKGVsLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGRlbGF5OiAuM1xuICAgIH0pO1xuXG4gIH1cblxuICBvbkNoYW5nZSggZSApIHtcblxuICAgIGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KSxcbiAgICAgIGZpZWxkc2V0ID0gJHRoaXMucGFyZW50KFwiLmZpZWxkc2V0XCIpLFxuICAgICAgcHJldkl0ZW0gPSBmaWVsZHNldC5maW5kKFwiLnNlbGVjdGVkXCIpLFxuICAgICAgcHJldldpZHRoID0gcHJldkl0ZW0ub3V0ZXJXaWR0aCgpIC0gMSxcbiAgICAgIGlucHV0SWQgPSAkdGhpcy5hdHRyKFwiaWRcIik7XG5cbiAgICAvLyByZW1vdmUgc2VsZWN0ZWQgZnJvbSBQcmV2IExhYmVsXG4gICAgZmllbGRzZXQuZmluZChcImxhYmVsXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAvLyByZW1vdmUgY2hlY2tlZCBzdGF0ZSBmcm9tIHByZXYgaW5wdXRcbiAgICBwcmV2SXRlbS5wcmV2KFwiaW5wdXRcIikucHJvcChcImNoZWNrZWRcIiwgZmFsc2UpO1xuXG4gICAgLy8gc2V0IG5ldyBpdGVtIHRvIHNlbGVjdGVkIGFuZCBjaGVja2VkXG4gICAgbGV0IHNlbGVjdGVkTGFiZWwgPSBmaWVsZHNldC5maW5kKFwibGFiZWxbZm9yPVwiICsgaW5wdXRJZCArIFwiXVwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICR0aGlzLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xuXG4gICAgLy8gaWYgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpbnB1dCBtYXRjaGVzIHRoZSAybmQgaXRlbSAtIHRoZW4gbW92ZSBzd2l0Y2hCdG4gcmlnaHQsIG90aGVyd2lzZSBiYWNrIHRvIHBvc2l0aW9uIDFcbiAgICBpZiAoIGlucHV0SWQgPT09ICQodGhpcy5pbnB1dHNbIDEgXSkuYXR0cihcImlkXCIpICkge1xuICAgICAgdGhpcy5zd2l0Y2hCdG4uY3NzKHtcbiAgICAgICAgXCJ3ZWJraXRUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJNb3pUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJtc1RyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyBwcmV2V2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcIk9UcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIlxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3dpdGNoQnRuLmNzcyh7XG4gICAgICAgIFwid2Via2l0VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCIsXG4gICAgICAgIFwiTW96VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCIsXG4gICAgICAgIFwibXNUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJPVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCIsXG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCJcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGNoYW5nZSB0aGUgd2lkdGggb2YgdGhlIGJ0biB0byBtYXRjaCB0aGUgd2lkdGggb2YgdGhlIG5ldyBsYWJlbFxuICAgIHRoaXMuc2V0V2lkdGgoc2VsZWN0ZWRMYWJlbCk7XG5cbiAgICAvLyBzZXQgc3RhdGUgdG8gdGhlIG5ld2x5IHNlbGVjdGVkIGlucHV0XG4gICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcbiAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgU3RhdGUgaXM6IFwiLCB0aGlzLnN0YXRlLnNlbGVjdGVkKTtcblxuICAgIHRoaXMudG9nZ2xlQ2FyZHMoKTtcblxuICB9XG5cbiAgdG9nZ2xlQ2FyZHMoKSB7XG5cbiAgICAvLyBiYXNlZCBvbiBzdGF0ZSwgYWRkIHNlbGVjdGVkIHRvIHRoZSBjYXJkJ3MgaWQgbWF0Y2hpbmcgdGhlIHN0YXRlXG4gICAgdGhpcy5xdW90ZUl0ZW1zQXJyYXkuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gJChlbCksXG4gICAgICAgIGlkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuXG4gICAgICAkdGhpcy5yZW1vdmVDbGFzcyhcInNlbGVjdGVkIHNoYWRvdy1tZWRpdW0tZGFya1wiKTtcblxuICAgICAgaWYgKCBpZCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZCApIHtcblxuICAgICAgICAkdGhpcy5hZGRDbGFzcyhcInNlbGVjdGVkIHNoYWRvdy1tZWRpdW0tZGFya1wiKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIHNldEFjdGl2ZVBsYW4oKSB7XG5cbiAgICBsZXQgaWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkO1xuICAgIGxldCBzZWxlY3RlZENhcmQgPSB0aGlzLnF1b3RlSXRlbXNBcnJheS5maWx0ZXIoKCBpdGVtICkgPT4ge1xuICAgICAgcmV0dXJuICQodGhpcy5xdW90ZUl0ZW1zQXJyYXlbIGl0ZW0gXSkuYXR0cihcImlkXCIpID09PSBpZDtcbiAgICB9KTtcblxuICAgIGxldCBidXR0b24gPSAnPGEgY2xhc3M9XCJyb3VuZGVkLWJ0biB3aGl0ZS1idG4gZ28tYmFja1wiIGhyZWY9XCIjXCI+R28gQmFjazwvYT4nO1xuXG4gICAgbGV0IG1vZGlmaWVkRWxlbWVudCA9IHNlbGVjdGVkQ2FyZC5jbG9uZSgpO1xuXG4gICAgbW9kaWZpZWRFbGVtZW50LmZpbmQoXCIuY2FyZF9faXRlbS0tYnRuXCIpLnJlbW92ZSgpO1xuXG4gICAgLy8gbW9kaWZpZWRFbGVtZW50Lmluc2VydEJlZm9yZSh0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIuZ28tYmFja1wiKSk7XG4gICAgbGV0IGNhcmRXcmFwcGVyID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS1jYXJkLXdyYXBwZXJcIik7XG5cbiAgICBjYXJkV3JhcHBlci5hcHBlbmQobW9kaWZpZWRFbGVtZW50KS5hcHBlbmQoYnV0dG9uKTtcblxuICAgIC8vIEJhY2sgYnV0dG9uIGluc2lkZSB3cmFwcGVyXG4gICAgbGV0IGJ1dHRvbkRvbSA9IGNhcmRXcmFwcGVyLmZpbmQoXCIuZ28tYmFja1wiKTtcbiAgICBidXR0b25Eb20ub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlRm9ybS5iaW5kKHRoaXMpKTtcblxuXG4gIH1cblxuICBjbG9zZUZvcm0oIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUuaXNGb3JtQWN0aXZlID0gZmFsc2U7XG5cbiAgICAvLyByZW1vdmUgY3VycmVudCBjYXJkXG4gICAgbGV0IGNhcmQgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIuY2FyZF9faXRlbVwiKTtcbiAgICBsZXQgYmFja0J0biA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5xdW90ZV9fZm9ybS0tY2FyZC13cmFwcGVyXCIpLmZpbmQoXCIuZ28tYmFja1wiKTtcblxuICAgIGNhcmQucmVtb3ZlQ2xhc3MoXCJpblwiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gc2V0IGZvcm0gdG8gYWN0aXZlXG4gICAgICB0aGlzLmZvcm1CdWlsZGVyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyBzZXQgYm9keSBiYWNrIHRvIHNjcm9sbGFibGVcbiAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJhdXRvXCIpO1xuICAgIH0sIDQwMCk7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgdGhpcy5mb3JtQnVpbGRlclxuICAgICAgICAuZmluZChcIi5xdW90ZV9fZm9ybS0tdmNcIilcbiAgICAgICAgLm9uZSgnb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLFxuICAgICAgICAgICggZSApID0+IHtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHZpc2liaWxpdHkgb25jZSBhbmltYXRpb24gY29tcGxldGVzXG4gICAgICAgICAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB0aGlzLnF1b3RlQ2hvb3Nlci5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgY2FyZCBodG1sXG4gICAgICAgICAgICBjYXJkLnJlbW92ZSgpO1xuICAgICAgICAgICAgYmFja0J0bi5yZW1vdmUoKTtcblxuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIHJlbW92ZSB2aXNpYmlsaXR5IG9uY2UgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgdGhpcy5mb3JtQnVpbGRlci5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50IGNhcmQgaHRtbFxuICAgICAgY2FyZC5yZW1vdmUoKTtcbiAgICAgIGJhY2tCdG4ucmVtb3ZlKCk7XG4gICAgfVxuXG5cbiAgICAvLyBmYWRlIG91dCBmaXJzdCBkaXNwbGF5XG4gICAgdGhpcy5xdW90ZUNob29zZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gIH1cblxuICBvcGVuRm9ybSggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgbGV0IHBhcmVudENvbmF0aW5lciA9ICR0aGlzLnBhcmVudChcImRpdlwiKS5wYXJlbnQoXCJkaXZcIik7XG5cbiAgICAvLyBkaXNhYmxlIGJ1dHRvbiBjbGljayBpZiBpdGVtIGlzIHNlbGVjdGVkXG4gICAgaWYgKCAhcGFyZW50Q29uYXRpbmVyLmhhc0NsYXNzKFwic2VsZWN0ZWRcIikgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gc2V0IHN0YXRlXG4gICAgdGhpcy5zdGF0ZS5pc0Zvcm1BY3RpdmUgPSB0cnVlO1xuXG4gICAgLy8gc2V0IGNvbnRlbnQgcGxhbiBIVE1MIGluIG5ldyBmb3JtIGFyZWFcbiAgICB0aGlzLnNldEFjdGl2ZVBsYW4oKTtcblxuICAgIC8vIGZhZGUgb3V0IGNhcmRzXG4gICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cbiAgICAvLyBzZXQgZm9ybSB0byBhY3RpdmVcbiAgICB0aGlzLmZvcm1CdWlsZGVyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgLy8gYWRkIHZpc2liaWxpdHkgaW1tZWRpYXRlbHlcbiAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuXG4gICAgLy8gZmFkZSBvdXQgZmlyc3QgZGlzcGxheVxuICAgIHRoaXMucXVvdGVDaG9vc2VyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgLy8gaWYgZGVza3RvcCBzY3JvbGwgdG9wXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8vIHNjcm9sbCB0b3Agb2YgZGl2IG9uIG9wZW4gZm9yIGdyYWNlZnVsIFVYXG4gICAgICAkKFwiYm9keSxodG1sXCIpLmFuaW1hdGUoeyBcInNjcm9sbFRvcFwiOiB0aGlzLnF1b3RlQ29udGFpbmVyLm9mZnNldCgpLnRvcCAtIDM1IH0sIDIwMCk7XG5cbiAgICB9XG5cblxuICAgIGxldCBjYXJkID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS1jYXJkXCIpO1xuXG4gICAgLy8gU2V0IGJvZHkgdG8gbm90IHNjcm9sbFxuICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJoaWRkZW5cIik7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIGNhcmQub25lKCdvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICggZSApID0+IHtcblxuICAgICAgICAgIC8vIGZhZGUgY2FyZCBpbiBvbmNlIGRhdGEgaXMgc2V0ICYgdGhlIGNhcmQgYmcgaXMgZmluaXNoZWQgYW5pbWF0aW5nXG4gICAgICAgICAgY2FyZC5maW5kKFwiLmNhcmRfX2l0ZW1cIikuYWRkQ2xhc3MoXCJpblwiKTtcblxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBmYWRlIGNhcmQgaW4gb25jZSBkYXRhIGlzIHNldCAmIHRoZSBjYXJkIGJnIGlzIGZpbmlzaGVkIGFuaW1hdGluZ1xuICAgICAgY2FyZC5maW5kKFwiLmNhcmRfX2l0ZW1cIikuYWRkQ2xhc3MoXCJpblwiKTtcblxuICAgIH1cblxuICB9XG5cbiAgcmVzaXplKCkge1xuXG4gICAgLy8gT24gcmVzaXplIGVuZCAtIGNoZWNrIHRvIGVuYWJsZSBjbGlja3MgZm9yIGRlc2t0b3Agb3IgcmVtb3ZlIHRoZW1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG5cbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGlmICggdGhpcy5jdXJyZW50QnJlYWtwb2ludCAhPT0gVXRpbHMuYnJlYWtwb2ludCApIHtcbiAgICAgICAgdGhpcy5zZXRXaWR0aCh0aGlzLmdldFNlbGVjdGVkTGFiZWwoKSk7XG4gICAgICAgIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgPSBVdGlscy5icmVha3BvaW50O1xuICAgICAgfVxuXG4gICAgfSwgNDAwKTtcblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlF1b3RlIEJ1aWxkZXJcIik7XG5cbiAgICAvLyBidWlsZCBzZWxlY3QgYm94IGJ1dHRvbiBpbnB1dHNcbiAgICB0aGlzLmJ1aWxkU2VsZWN0Qm94KCk7XG5cbiAgICAvLyBzZXQgY2xpY2sgZXZlbnRzIGFuZCBmaXJzdCBzZWxlY3RlZCBpdGVtcyBmb3IgU2VsZWN0IEJveFxuICAgIHRoaXMuYnVpbGRTZWxlY3RFdmVudEhhbmRsZXJzKCk7XG5cbiAgICB0aGlzLmZhZGVJbih0aGlzLnNlbGVjdEJ0bik7XG5cbiAgICAvLyBzZWxlY3QgY2FyZFxuICAgIHRoaXMudG9nZ2xlQ2FyZHMoKTtcblxuICAgIC8vIGFkZCBjbGljayBldmVudHMgdG8gY2FyZHMgYnV0dG9uc1xuICAgIHRoaXMuYnVpbGRDYXJkRXZlbnRIYW5kbGVycygpO1xuXG4gICAgLy8gZmFkZSBtYWluIGNvbnRhaW5lciBpblxuICAgIHRoaXMuZmFkZUluKHRoaXMucXVvdGVDb250YWluZXIpO1xuXG4gICAgLy8gb24gcmVzaXplIGNoYW5nZSBidXR0b24gc2l6ZVxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICB9XG59XG5cbmNvbnN0IFF1b3RlQnVpbGRlciA9IG5ldyBRdW90ZUNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBRdW90ZUJ1aWxkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5pbnRlcmZhY2UgU2hvd2Nhc2VTbGlkZXJJbnRlcmZhY2Uge1xuICBkZXNrdG9wUG9zOiBudW1iZXI7XG4gIHRhYmxldFBvczogbnVtYmVyO1xuICBpbmRleFNlbGVjdGVkOiBudW1iZXI7XG4gIGN1cnJlbnRTbGlkZTogbnVtYmVyO1xufVxuXG5jbGFzcyBTaG93Y2FzZUNvbXBvbmVudCB7XG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuICBuZXh0QnRuTW9iaWxlOiBKUXVlcnk7XG4gIHByZXZCdG5Nb2JpbGU6IEpRdWVyeTtcbiAgbmV4dEJ0bjogSlF1ZXJ5O1xuICBwcmV2QnRuOiBKUXVlcnk7XG4gIGluZGV4OiBudW1iZXI7XG4gIGdhbGxlcnk6IEpRdWVyeTtcbiAgZGVzYzogSlF1ZXJ5O1xuICB0aHVtYnNDb250YWluZXI6IEpRdWVyeTtcbiAgZ3JhZGllbnRzOiBKUXVlcnk7XG4gIHRodW1ic0NsaWNrOiBKUXVlcnk7XG4gIGNsb3NlQnRuOiBKUXVlcnk7XG4gIGNvdW50VG90YWw6IEpRdWVyeTtcbiAgY3VycmVudENvdW50SXRlbTogSlF1ZXJ5O1xuICBzaG93Q2FzZVRodW1iczogSlF1ZXJ5O1xuICBzdGF0ZVBvc2l0aW9uOiBTaG93Y2FzZVNsaWRlckludGVyZmFjZTtcbiAgdGh1bWJTY2FsZVRvcDogbnVtYmVyO1xuICB0aHVtYlNjYWxlTGVmdDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCBlbDogT2JqZWN0ICkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChlbCk7XG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fbmF2LS1wcmV2XCIpO1xuICAgIHRoaXMubmV4dEJ0bk1vYmlsZSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX25hdi0tbmV4dFwiKTtcbiAgICB0aGlzLnByZXZCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNuYXYtLXByZXZcIik7XG4gICAgdGhpcy5uZXh0QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fdGh1bWJzbmF2LS1uZXh0XCIpO1xuICAgIHRoaXMuZ2FsbGVyeSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3NsaWRlci0tZ2FsbGVyeVwiKTtcbiAgICB0aGlzLmRlc2MgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19kZXNjXCIpO1xuICAgIHRoaXMuY291bnRUb3RhbCA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIudG90YWxcIik7XG4gICAgdGhpcy5jdXJyZW50Q291bnRJdGVtID0gdGhpcy5jb250YWluZXIuZmluZChcIi5jdXJyZW50XCIpO1xuICAgIHRoaXMuaW5kZXggPSAwOyAvLyBzZXQgdG8gMm5kIHNsaWRlXG4gICAgdGhpcy50aHVtYnNDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnMtLWltYWdlc1wiKTtcbiAgICB0aGlzLnNob3dDYXNlVGh1bWJzID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fdGh1bWJzXCIpO1xuICAgIHRoaXMudGh1bWJTY2FsZVRvcCA9IDEzMDtcbiAgICB0aGlzLnRodW1iU2NhbGVMZWZ0ID0gNzU7XG4gICAgdGhpcy5zdGF0ZVBvc2l0aW9uID0ge1xuICAgICAgZGVza3RvcFBvczogMCxcbiAgICAgIHRhYmxldFBvczogMCxcbiAgICAgIGluZGV4U2VsZWN0ZWQ6IHRoaXMuaW5kZXgsXG4gICAgICBjdXJyZW50U2xpZGU6IHRoaXMuaW5kZXggKyAxXG4gICAgfTtcblxuICB9XG5cbiAgc2V0Rmlyc3RTbGlkZSgpIHtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBpbWFnZXMgYW5kIHNldCBhY3RpdmUgZWxlbWVudFxuICAgIGxldCBmaXJzdEltYWdlID0gdGhpcy5nYWxsZXJ5LmZpbmQoXCJsaVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG4gICAgZmlyc3RJbWFnZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgdGhpcy5hbmltYXRlR2FsbGVyeUluKCk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZGVzYyBhbmQgc2V0IGFjdGl2ZSBlbGVtZW50XG4gICAgbGV0IGZpcnN0RGVzYyA9IHRoaXMuZGVzYy5maW5kKFwiLnNob3djYXNlX19kZXNjLS1pdGVtW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcbiAgICBmaXJzdERlc2MuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgIC8vIEJ1aWxkIHRodW1ibmFpbHNcbiAgICB0aGlzLmJ1aWxkVGh1bWJzKCk7XG5cbiAgICAvLyBTZXQgQ3VycmVudCBTbGlkZSwgd2hpY2ggaXMgYWx3YXlzIHRoZSBmaXJzdCBzbGlkZSB0byBzZWxlY3RlZCAtIG9uTG9hZFxuICAgIHRoaXMudXBkYXRlTW9iaWxlTmF2KHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcblxuICAgIC8vIGFkZCBjbGljayBldmVudHMgdG8gdGh1bWJuYWlsIGltYWdlcywgdGhlbiB3aGVuIGZpbmlzaGVkIGFuaW1hdGUgaW4gd2l0aCBjYWxsYmFja1xuICAgIHRoaXMuYnVpbGRUaHVtYnNDbGlja0hhbmRsZXIodGhpcy5hbmltYXRlSW5UaHVtYnMuYmluZCh0aGlzKSk7XG5cbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy5nYWxsZXJ5LmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRDdXJyZW50TmF2RWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0Q3VycmVudERlc2NFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuZGVzYy5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0VG90YWxTbGlkZXMoKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSB0aGlzLmdhbGxlcnkuY2hpbGRyZW4oXCJsaVwiKS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgdXBkYXRlTW9iaWxlTmF2KCBzZWxlY3RlZDogSlF1ZXJ5ICkge1xuXG4gICAgLy8gRW5hYmxlL0Rpc2FibGUgYXJyb3cgYnRuc1xuICAgIHRoaXMucHJldkJ0bk1vYmlsZS5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6Zmlyc3QtY2hpbGRcIikpO1xuICAgIHRoaXMubmV4dEJ0bk1vYmlsZS5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6bGFzdC1jaGlsZFwiKSk7XG5cbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKCBpbmRleDogbnVtYmVyICkge1xuXG4gICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgPSBpbmRleDtcbiAgICB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlID0gaW5kZXggKyAxO1xuXG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlO1xuICB9XG5cbiAgdXBkYXRlU2xpZGUoIGRpcmVjdGlvbjogc3RyaW5nICkge1xuXG4gICAgLy8gZ2V0IGN1cnJlbnQgc2VsZWN0ZWQgYW5kIGZpbmQgdGhlIG1hdGNoIHRvIHRoZSBuZXh0IGVsXG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSB0aGlzLmdhbGxlcnkuZmluZChcImxpW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcblxuICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLnByZXZBbGwoKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUubmV4dEFsbCgpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgTmF2aWdhdGlvbiBjaGVja1xuICAgIHRoaXMudXBkYXRlTW9iaWxlTmF2KHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcbiAgfVxuXG4gIHVwZGF0ZURlc2NIZWlnaHQoIGRpcmVjdGlvbj86IHN0cmluZywgc2VsZWN0ZWQ/OiBKUXVlcnkgKSB7XG5cbiAgICAvLyBkaXJlY3Rpb25cbiAgICBpZiAoIGRpcmVjdGlvbiApIHtcblxuICAgICAgbGV0IGhlaWdodCA9IHNlbGVjdGVkLm91dGVySGVpZ2h0KCk7XG4gICAgICBUd2Vlbk1heC50byh0aGlzLmRlc2MsIC4zLCB7XG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gZ2V0IGN1cnJlbnQgc2xpZGVcbiAgICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnREZXNjRWxlbWVudCgpO1xuICAgICAgbGV0IGhlaWdodCA9IGN1cnJlbnRTbGlkZS5vdXRlckhlaWdodCgpO1xuICAgICAgdGhpcy5kZXNjLmhlaWdodChoZWlnaHQpO1xuXG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVEZXNjKCBkaXJlY3Rpb246IHN0cmluZyApIHtcbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50RGVzY0VsZW1lbnQoKTtcbiAgICBsZXQgbmV4dFNsaWRlID0gdGhpcy5kZXNjLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2MtLWl0ZW1bZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcblxuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLnByZXZBbGwoKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUubmV4dEFsbCgpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcblxuICAgICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KFwicmlnaHRcIiwgbmV4dFNsaWRlKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuXG4gICAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoXCJsZWZ0XCIsIG5leHRTbGlkZSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZVRodW1ic25hdiggZGlyZWN0aW9uOiBzdHJpbmcgKSB7XG5cbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50TmF2RWxlbWVudCgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwibGlbZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuXG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICAvKlxuICAgICAgICogVEFCTEVUIFRIVU1CIFNFTEVDVFxuICAgICAgICovXG5cbiAgICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPj0gNCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlIDwgdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyAtIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyAtIHRoaXMudGh1bWJTY2FsZVRvcDtcblxuICAgICAgICAgIC8vIHVwZGF0ZSBodG1sIGVsZW1lbnRcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibGVmdFwiKTtcbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG5cbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyArIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG4gICAgICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgeDogdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyxcbiAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgKyB0aGlzLnRodW1iU2NhbGVUb3A7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLypcbiAgICAgICAqIERFU0tUT1AgVEhVTUIgU0VMRUNUXG4gICAgICAgKi9cbiAgICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG5cbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIC8vIGRldGVjdGluZyBpZiBzbGlkZSBzaG91bGQgbW92ZSBvciBub3RcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlID49IDQgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA8IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBvc2l0aW9uIGNvbnRyb2xsZXJcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zIC0gdGhpcy50aHVtYlNjYWxlVG9wO1xuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zIC0gdGhpcy50aHVtYlNjYWxlTGVmdDtcblxuICAgICAgICAgIC8vIG1vdmUgc2xpZGVyXG4gICAgICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICAgIHk6IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zLFxuICAgICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyAhPT0gMCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyArIHRoaXMudGh1bWJTY2FsZVRvcDtcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlcGVyYXRlIHRhYmxldCBsb29raW5nIGF0IHNob3VsZCBpdCB1cGRhdGUgdGFibGV0IHN0YXRlXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyAhPT0gMCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgKyB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBjaGVja1RodW1ic05hdiggc2l6ZTogc3RyaW5nICkge1xuXG4gICAgaWYgKCBzaXplID09PSBcIm1vYmlsZVwiICkge1xuXG4gICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgeDogdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgIHk6IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zLFxuICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfVxuXG4gIH1cblxuICBhcnJvd0hhbmRsZXIoIGV2ZW50OiBhbnkgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGxldCAkZWwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpOyAvLyBhIHRhZ1xuICAgIGxldCB0aHVtYkluZGV4ID0gJGVsLnBhcmVudChcImxpXCIpLmRhdGEoXCJpbmRleFwiKTtcbiAgICBsZXQgcHJldkVsID0gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgICBsZXQgcHJldkluZGV4ID0gcHJldkVsLmRhdGEoXCJpbmRleFwiKTtcblxuXG4gICAgLy8gU2xpZGVyIGNhbiBtb3ZlIHJpZ2h0IGJlY2F1c2UgY3VycmVudCBzbGlkZSBpcyBub3QgdGhlIGxhc3Qgc2xpZGVcbiAgICBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJyaWdodFwiICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPD0gdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGUgb24gYXJyb3cgY2xpY2tcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyAxKTtcblxuICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcInJpZ2h0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuXG4gICAgfSBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcImxlZnRcIiAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGUgb24gYXJyb3cgY2xpY2tcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgLSAxKTtcblxuICAgICAgLy8gRWxzZSBpZiBpdHMgbm90IHRoZSBmaXJzdCBzbGlkZSAtIG1vdmUgbGVmdFxuICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuICAgIH1cbiAgICBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInRodW1ibmFpbFwiICYmXG4gICAgICBwcmV2SW5kZXggPCB0aHVtYkluZGV4ICYmXG4gICAgICB0aHVtYkluZGV4ICsgMSAhPT0gdGhpcy5nZXRUb3RhbFNsaWRlc1xuICAgICkge1xuICAgICAgLy8gY29tcGFyZSBpdGVtIHNlbGVjdGVkIGluZGV4IHdpdGggbmV3IGl0ZW0gc2VsZWN0ZWQgYW5kIGRldGVybWluZSB3aGljaCBkaXJlY3Rpb24gdG8gbW92ZVxuICAgICAgLy8gdXBkYXRlIFN0YXRlXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRodW1iSW5kZXgpO1xuXG4gICAgICAvLyB1cGRhdGUgdGh1bWJzIG5hdlxuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcInJpZ2h0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuICAgIH1cbiAgICBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInRodW1ibmFpbFwiICYmIHByZXZJbmRleCA+IHRodW1iSW5kZXhcbiAgICApIHtcbiAgICAgIC8vIHVwZGF0ZSBTdGF0ZVxuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aHVtYkluZGV4KTtcblxuICAgICAgLy8gdXBkYXRlIHRodW1icyBuYXZcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwibGVmdFwiKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luT3V0KCk7XG5cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgY291bnRlclxuICAgIHRoaXMuY3VycmVudENvdW50SXRlbS5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICB9XG5cbiAgY2hlY2tTaXplKCkge1xuXG4gICAgLy8gT24gcmVzaXplIGVuZCAtIGNoZWNrIHRvIGVuYWJsZSBjbGlja3MgZm9yIGRlc2t0b3Agb3IgcmVtb3ZlIHRoZW1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG4gICAgdGhpcy5yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAvLyBpZiBUYWJsZXQgb3Igc21hbGxlciAtIGJpbmQgbW9iaWxlIG5hdiBhcnJvd3NcbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA8IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgICAgLy8gYWRqdXN0IGNzcyBzaXppbmcgZm9yIHRodW1icyBuYXYgb24gcG9zaXRpb24gcmVzaXplXG4gICAgICAgIHRoaXMuY2hlY2tUaHVtYnNOYXYoXCJtb2JpbGVcIik7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy5jaGVja1RodW1ic05hdihcImRlc2t0b3BcIik7XG5cbiAgICAgIH1cblxuICAgIH0sIDQwMCk7XG5cbiAgfVxuXG4gIGFuaW1hdGVTaGFkb3dJbk91dCgpIHtcblxuICAgIC8vIHJlbW92ZSBkcm9wc2hhZG93XG4gICAgVHdlZW5NYXgudG8odGhpcy5nYWxsZXJ5LCAwLCB7XG4gICAgICBib3hTaGFkb3c6IFwiMHB4IDE4cHggOTRweCAtMTZweCByZ2JhKDAsMCwwLDAuMClcIlxuICAgIH0pO1xuXG5cbiAgICBUd2Vlbk1heC50byh0aGlzLmdhbGxlcnksIC4xLCB7XG4gICAgICBib3hTaGFkb3c6IFwiMHB4IDE4cHggOTRweCAtMTZweCByZ2JhKDAsMCwwLDAuNjgpXCIsXG4gICAgICBkZWxheTogLjNcbiAgICB9KTtcblxuXG4gIH1cblxuICBhbmltYXRlU2hhZG93SW4oKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5nYWxsZXJ5LCAuMywge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjY4KVwiLFxuICAgICAgZGVsYXk6IC4xXG4gICAgfSk7XG4gIH1cblxuICBidWlsZFRodW1icygpIHtcblxuICAgIGxldCBmcmFnbWVudCA9ICQoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcbiAgICAvLyBidWlsZCBsb29wIGZvciBpbWFnZXNcbiAgICB0aGlzLmdhbGxlcnkuZmluZChcImxpXCIpLmVhY2goKCBpbmRleDogbnVtYmVyLCBlbDogT2JqZWN0ICkgPT4ge1xuXG4gICAgICAvLyBjcmVhdGUgaHRtbCBlbGVtZW50c1xuICAgICAgbGV0IGl0ZW1JbmRleCA9IFV0aWxzLnNldE51bWJlcihpbmRleCksXG4gICAgICAgIGltYWdlVGh1bWJVcmwgPSAkKGVsKS5kYXRhKFwidGh1bWJcIiksXG4gICAgICAgIGltYWdlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiksXG4gICAgICAgIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIiksXG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cbiAgICAgIC8vIGFkZCBzcmMgYW5kIGF0dHIgdG8gaW1hZ2VcbiAgICAgIGltYWdlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgaW1hZ2VUaHVtYlVybCk7XG4gICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiI1wiKTtcbiAgICAgIGxpbmtFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRWxlbWVudCk7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiLCBpdGVtSW5kZXgpO1xuXG4gICAgICAvLyBzZXQgZmlyc3QgaW1hZ2UgdG8gc2VsZWN0ZWRcbiAgICAgIGluZGV4ID09PSB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCA/IGVsZW1lbnQuY2xhc3NOYW1lID0gXCJzZWxlY3RlZFwiIDogXCJcIjtcblxuICAgICAgLy8gYXBwZW5kIHRvIGZyYWdtZW50XG4gICAgICBmcmFnbWVudC5hcHBlbmQoZWxlbWVudCk7XG5cbiAgICB9KTtcblxuICAgIC8vIGluc2VydCBodG1sIGVsZW1lbnQgdG8gdGhlIGRvbSBhZnRlciBsb29wIGZpbmlzaGVzXG4gICAgdGhpcy50aHVtYnNDb250YWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICB9XG5cbiAgYnVpbGRUaHVtYnNDbGlja0hhbmRsZXIoIGNhbGxiYWNrICkge1xuXG4gICAgLy8gQWRkIGFycmF5IG9mIGh0bWwgb2JqZWN0IHRvIGF0dGFjaCBjbGljayBldmVudHMgdG8gbGF0ZXJcbiAgICB0aGlzLnRodW1ic0NsaWNrID0gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcImFcIik7XG5cbiAgICAvLyBDbGljayBoYW5kbGVyIGZvciBwcmV2aWV3IHRodW1icyBvbiBkZXNrdG9wLCBuZWVkcyB0byB3b3JrIG9uIHRhYmxldCAtPiBkZXNrdG9wXG4gICAgdGhpcy50aHVtYnNDbGljay5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuICAgICAgJChlbCkub24oXCJjbGlja1wiLCB7IGtleXM6IFwidGh1bWJuYWlsXCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfSk7XG5cbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgYW5pbWF0ZUluVGh1bWJzKCkge1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuc2hvd0Nhc2VUaHVtYnMsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IDFcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVHYWxsZXJ5SW4oKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fb3V0ZXItLWJnaW1hZ2VcIiksIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IC43LFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcblxuICAgIHRoaXMuc2V0Rmlyc3RTbGlkZSgpO1xuXG4gICAgLy8gSW5pdCBjb3JyZWN0IG5hdiBkZXBlbmRpbmcgb24gdmlld3BvcnQgc2l6ZVxuICAgIHRoaXMuY2hlY2tTaXplKCk7XG4gICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KCk7XG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcImxlZnRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5leHRCdG5Nb2JpbGUub24oXCJjbGlja1wiLCB7IGtleXM6IFwicmlnaHRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRUb3RhbFNsaWRlcygpKSk7XG5cbiAgICAvLyB1cGRhdGUgY291bnRlclxuICAgIHRoaXMuY3VycmVudENvdW50SXRlbS5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICB9XG59XG5cbi8vIGxvb3AgdGhyb3VnaCBlYWNoIGhlYWRlciBzbGlkZXIgb2JqZWN0IG9uIHRoZSBwYWdlXG5jbGFzcyBTaG93Q2FzZVNMaWRlciB7XG5cbiAgaXRlbUluZm9XcmFwcGVyOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIgPSAkKFwiLnNob3djYXNlXCIpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNob3djYXNlIFNsaWRlciBpbml0XCIpO1xuXG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIuZWFjaCgoIGluZGV4OiBudW1iZXIsIGVsOiBPYmplY3QgKSA9PiB7XG5cbiAgICAgIC8vIFBhc3MgXCJ0aGlzXCIgdG8gZWFjaCBuZXcgSGVhZGVyIHNsaWRlciBjb21wb25lbnRcbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2hvd2Nhc2VDb21wb25lbnQoZWwpO1xuICAgICAgc2xpZGVyLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmxldCBTaG93Y2FzZVNsaWRlciA9IG5ldyBTaG93Q2FzZVNMaWRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBTaG93Y2FzZVNsaWRlcjtcbiIsImNvbnN0ICQgPSBqUXVlcnk7XG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTdGlja3lTaWRlYmFyQ29tcG9uZW50IHtcblxuICBpc0FuaW1hdGluZzogYm9vbGVhbjtcbiAgY29udGVudFdyYXBwZXI6IEpRdWVyeTtcbiAgY29udGVudE9mZnNldFRvcDogbnVtYmVyO1xuICBjb250ZW50V3JhcHBlckhlaWdodDogbnVtYmVyO1xuICBzY3JvbGxUb3A6IG51bWJlcjtcbiAgYXNpZGU6IEpRdWVyeTtcbiAgc2lkZWJhcldyYXBwZXI6IEpRdWVyeTtcbiAgd2luZG93SGVpZ2h0OiBudW1iZXI7XG4gIHNpZGViYXJIZWlnaHQ6IG51bWJlcjtcbiAgZm9vdGVySGVpZ2h0OiBudW1iZXI7XG4gIHNjcm9sbGluZ0Rvd246IGJvb2xlYW47XG4gIGxhc3RTY3JvbGxUb3A6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlciA9ICQoXCIuc2lkZWJhci1jb250ZW50XCIpO1xuICAgIHRoaXMuYXNpZGUgPSAkKFwiLnNlcnZpY2Utc2lkZWJhci13cmFwcGVyXCIpO1xuICAgIHRoaXMud2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFyV3JhcHBlciA9ICQoXCIuc2VydmljZS1zaWRlYmFyXCIpO1xuICB9XG5cbiAgY2hlY2tTaWRlYmFyKCk6IHZvaWQge1xuICAgIC8vIENoZWNrIGlmIHRoZSBzaWRlYmFyIGlzIGZpeGVkIG9yIG5vdFxuICAgIGlmICggIXRoaXMuaXNBbmltYXRpbmcgJiYgVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpID9cbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpLCAzMDApIDpcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIHRoaXMucmVzZXRTaWRlQmFyKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tTaWRlYmFyVmlzaWJpbGl0eSgpIHtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICAvLyBkb2VzIHNpZGViYXIgaGF2ZWNsYXNzIHZpc2liaWxpdHlcbiAgICAgIGxldCBpc1Zpc2libGUgPSB0aGlzLmFzaWRlLmhhc0NsYXNzKCd2aXNpYmxlJyk7XG5cbiAgICAgIGlmICggIWlzVmlzaWJsZSApIHtcblxuICAgICAgICB0aGlzLmFuaW1hdGVTaWRlYmFySW4oKTtcblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICByZXNldFNpZGVCYXIoKSB7XG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIik7XG4gICAgdGhpcy5hc2lkZS5hdHRyKFwic3R5bGVcIiwgXCJcIik7XG4gIH1cblxuICB1cGRhdGVTaWRlYmFyUG9zaXRpb24oKTogdm9pZCB7XG5cbiAgICB0aGlzLmNoZWNrU2Nyb2xsRGlyZWN0aW9uKCk7XG5cbiAgICB0aGlzLmNoZWNrU2lkZWJhclZpc2liaWxpdHkoKTtcblxuICAgIC8vIGdldCBkaXN0YW5jZSBmcm9tIHRvcCBvZiBjb250ZW50IDEwICsgNDAgPSA1MCBwYWRkaW5nIHRvcFxuICAgIC8vIHRoaXMuY29udGVudE9mZnNldFRvcCA9IHRoaXMuY29udGVudFdyYXBwZXIub2Zmc2V0KCkudG9wIC0gMTA7XG4gICAgdGhpcy5jb250ZW50T2Zmc2V0VG9wID0gdGhpcy5jb250ZW50V3JhcHBlci5vZmZzZXQoKS50b3A7XG4gICAgdGhpcy5zaWRlYmFySGVpZ2h0ID0gdGhpcy5hc2lkZS5oZWlnaHQoKTtcbiAgICB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0ID0gdGhpcy5jb250ZW50V3JhcHBlci5vdXRlckhlaWdodCgpOyAvLyBpbmNsdWRlIHBhZGRpbmcgYW5kIG1hcmdpblxuXG5cbiAgICAvLyBnZXQgd2hlcmUgdG9wIG9mIHdpbmRvdyBpc1xuICAgIHRoaXMuc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29udGVudCBXcmFwcGVyIEhlaWdodFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnRlbnQgT2Zmc2V0XCIsIHRoaXMuY29udGVudE9mZnNldFRvcCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTaWRlYmFyIEhlaWdodFwiLCB0aGlzLnNpZGViYXJIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiV2luZG93IEhlaWdodFwiLCB0aGlzLndpbmRvd0hlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJvZmZzZXQgVG9wXCIsIHRoaXMuY29udGVudE9mZnNldFRvcCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTY3JvbGxUb3BcIiwgdGhpcy5zY3JvbGxUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2lkZWJhcm9mZnNldFwiLCB0aGlzLnNjcm9sbFRvcCk7XG5cbiAgICAvLyBJZiB0aGUgd2luZG93IFYgcG9zaXRpb24gaXMgbGVzcyB0aGFuIHRoZSBjb250ZW50IFYgcG9zaXRpb24gbWFrZSBzaWRlYmFyIG5vcm1hbFxuICAgIGlmICggdGhpcy5zY3JvbGxUb3AgPCB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgKSB7XG4gICAgICAvLyBsZXQgY3NzUHJvcHMgPSB7XG4gICAgICAvLyAgIFwidHJhbnNpdGlvblwiOiBcInRvcCAuM3NcIlxuICAgICAgLy8gfTtcbiAgICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIik7XG4gICAgICAvLyB0aGlzLmFzaWRlLmNzcyhjc3NQcm9wcyk7XG5cbiAgICAgIC8vIGlmIHdpbmRvdyBWIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiBjb250ZW50IC0gYWRkIHN0aWNreVxuICAgICAgLy8gMm5kIGNoZWNrcyB0aGUgb2Zmc2V0IG9mIHRoZSB0b3Agb2YgdGhlIHdpbmRvdyB0byB0aGUgdG9wIG9mIHRoZSBjb250ZW50ICYmIHRoZSBwb3NpdGlvbiBvZiB0aGUgY29udGVudCBpbiByZWxhdGlvbiB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHdpbmRvdyAtIDQwIG9uIGVuZFxuICAgIH0gZWxzZSBpZiAoIHRoaXMuc2Nyb2xsVG9wID49IHRoaXMuY29udGVudE9mZnNldFRvcCAmJiB0aGlzLnNjcm9sbFRvcCA8IHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQgLSB0aGlzLnNpZGViYXJIZWlnaHQgKyB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgKSB7XG4gICAgICB0aGlzLmFzaWRlLmFkZENsYXNzKFwic3RpY2t5XCIpLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcblxuICAgICAgaWYgKCB0aGlzLnNjcm9sbGluZ0Rvd24gPT09IHRydWUgKSB7XG4gICAgICAgIC8vIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcInRvcCAuM3NcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGlzLmFzaWRlLmNzcyhcInRyYW5zaXRpb25cIiwgXCJcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbGV0IGFydGljbGVQYWRkaW5nVG9wID0gTnVtYmVyKGFydGljbGVzLmVxKDEpLmNzcyhcInBhZGRpbmctdG9wXCIpLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XG4gICAgICBpZiAoIHRoaXMuYXNpZGUuaGFzQ2xhc3MoXCJzdGlja3lcIikgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuICAgICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpLmNzcyhcInRvcFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgXCJweFwiKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcblxuICB9XG5cbiAgY2hlY2tTY3JvbGxEaXJlY3Rpb24oKSB7XG4gICAgLy8gTG9nIGN1cnJlbnQgc2Nyb2xsUG9pbnRcbiAgICBsZXQgc3QgPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuXG4gICAgLy8gY29tcGFyZSB0byBsYXN0IHNjcm9sbFBvaW50XG4gICAgaWYgKCBzdCA+IHRoaXMubGFzdFNjcm9sbFRvcCApIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic2Nyb2xsIGRvd25cIik7XG4gICAgICAvLyBkb3duc2Nyb2xsIGNvZGVcbiAgICAgIHRoaXMuc2Nyb2xsaW5nRG93biA9IHRydWU7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJzY3JvbGwgdXBcIik7XG4gICAgICAvLyB1cHNjcm9sbCBjb2RlXG4gICAgICB0aGlzLnNjcm9sbGluZ0Rvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBvbiBjb21wbGV0ZSAtIG1ha2UgbGFzdCBTY3JvbGwgcG9pbnQgdGhlIHBvaW50IGF0IHdoaWNoIHRoZXkgc3RhcnRlZCBzY3JvbGxpbmcgYXQgZmlyc3RcbiAgICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBzdDtcbiAgfVxuXG4gIGFuaW1hdGVTaWRlYmFySW4oKSB7XG5cbiAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwiaW50cm9cIik7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgbGV0IHNpZGViYXJJbnRybyA9IFR3ZWVuTWF4LnRvKHRoaXMuYXNpZGUsIC4zLCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHo6IC4wMDEsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXQsXG4gICAgICAgIGRlbGF5OiAuOSxcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIC8vIG1ha2Ugc2lkZWJhciBwZXJtYW5lbnRseSB2aXNpYmxlXG4gICAgICAgICAgdGhpcy5hc2lkZS5hZGRDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0aWNreSBzaWRlYmFyIGxvYWRlZFwiKTtcblxuICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IDA7XG4gICAgaWYgKCB0aGlzLmFzaWRlLmxlbmd0aCA+IDAgKSB7XG4gICAgICB0aGlzLmNoZWNrU2lkZWJhcigpO1xuXG4gICAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgdGhpcy5jaGVja1NpZGViYXIuYmluZCh0aGlzKSk7XG4gICAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5jaGVja1NpZGViYXIuYmluZCh0aGlzKSk7XG5cbiAgICAgIC8vIEFuaW1hdGUgc2lkZSBiYXIgaW4gb24gbG9hZFxuICAgICAgdGhpcy5hbmltYXRlU2lkZWJhckluKCk7XG4gICAgfVxuICB9XG59XG5cbmxldCBTdGlja3lTaWRlYmFyID0gbmV3IFN0aWNreVNpZGViYXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3RpY2t5U2lkZWJhcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuY2xhc3MgVGVzdGltb25haWxDb21wb25lbnQge1xuXG4gIHRlc3RpbW9uYWlsczogSlF1ZXJ5O1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuICBjdXJyZW50SGVpZ2h0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZXN0aW1vbmFpbHMgPSAkKFwiLnRlc3RpbW9uaWFsc1wiKTtcbiAgfVxuXG4gIGdlbmVyYXRlSWQoIGluZGV4LCBlbCApIHtcblxuICAgIC8vIGNyZWF0ZSBEeW5hbWljIElEXG4gICAgbGV0IGlkU3RyaW5nID0gXCJjYXJvdXNlbC10ZXN0aW1vbmlhbC1cIiArIGluZGV4O1xuICAgIGVsLmF0dHIoXCJpZFwiLCBpZFN0cmluZyk7XG5cbiAgICAvLyBBZGQgbWF0Y2hpbmcgaHJlZiB0byBjb250cm9sc1xuICAgIGxldCBjb250cm9scyA9IGVsLmZpbmQoXCIuY2Fyb3VzZWwtY29udHJvbFwiKTtcbiAgICBjb250cm9scy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAkKGVsKS5hdHRyKFwiaHJlZlwiLCBcIiNcIiArIGlkU3RyaW5nKTtcblxuICAgIH0pO1xuXG4gIH1cblxuICBvblJlc2l6ZSgpIHtcblxuICAgIC8vIE9uIHJlc2l6ZSBlbmQgLSBjaGVjayB0byBlbmFibGUgY2xpY2tzIGZvciBkZXNrdG9wIG9yIHJlbW92ZSB0aGVtXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuICAgIHRoaXMucmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgLy8gQ2hhbmdlIEhlaWdodCBvbiByZXNpemVcbiAgICAgIHRoaXMudGVzdGltb25haWxzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgICAgbGV0ICR0aGlzID0gJChlbCk7XG5cbiAgICAgICAgLy8gZXN0YWJsaXNoIHZhcnNcbiAgICAgICAgbGV0ICRpbm5lciA9ICR0aGlzLmZpbmQoXCIuY2Fyb3VzZWwtaW5uZXJcIiksXG4gICAgICAgICAgICAkYWN0aXZlID0gJGlubmVyLmZpbmQoXCIuYWN0aXZlXCIpLFxuICAgICAgICAgICAgYmxvY2tJdGVtID0gJGFjdGl2ZS5maW5kKFwiYmxvY2txdW90ZVwiKTtcblxuICAgICAgICAvLyBTZXQgaGVpZ2h0IGZvciBmaXJzdCBpdGVtXG4gICAgICAgIGxldCBoZWlnaHQgPSBibG9ja0l0ZW0ub3V0ZXJIZWlnaHQoKTtcblxuICAgICAgICAvLyBpZiB0aGV5IGFyZW4ndCBlcXVhbCwgY2hhbmdlIHRoZW1cbiAgICAgICAgaWYgKCB0aGlzLmN1cnJlbnRIZWlnaHQgIT09IGhlaWdodCApIHtcbiAgICAgICAgICAkaW5uZXIuY3NzKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG4gICAgICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuXG4gICAgfSwgNDAwKTtcbiAgfVxuXG4gIGluaXQoKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcIlRlc3RpbW9uaWFscyBJbml0XCIpO1xuXG4gICAgLy8gTWFrZSBpdGVtcyBkeW5hbWljXG4gICAgdGhpcy50ZXN0aW1vbmFpbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcbiAgICAgIGxldCAkdGhpcyA9ICQoZWwpO1xuICAgICAgdGhpcy5nZW5lcmF0ZUlkKGluZGV4LCAkdGhpcyk7XG5cbiAgICAgIC8vIG1ha2UgZmlyc3QgZWxlbWVudCBhY3RpdmVcbiAgICAgIGxldCAkaW5uZXIgPSAkdGhpcy5maW5kKFwiLmNhcm91c2VsLWlubmVyXCIpO1xuICAgICAgbGV0ICRmaXJzdCA9ICRpbm5lci5jaGlsZHJlbihcIi5pdGVtXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAgIC8vIFNldCBoZWlnaHQgZm9yIGZpcnN0IGl0ZW1cbiAgICAgIGxldCBoZWlnaHQgPSAkZmlyc3Qub3V0ZXJIZWlnaHQoKTtcbiAgICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGhlaWdodDtcbiAgICAgICRpbm5lci5jc3MoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcblxuICAgIH0pO1xuXG4gICAgLy8gU3RhcnQgU2xpZGVyc1xuICAgIHRoaXMudGVzdGltb25haWxzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIC8vIGluaXQgY2Fyb3VzZWxcbiAgICAgICQoZWwpLmNhcm91c2VsKCk7XG5cbiAgICAgIC8vIE9uIHNsaWRlIGNoYW5nZSBoZWlnaHQgZm9yIHNtb290aCB0cmFuc2l0aW9uc1xuICAgICAgJChlbCkub24oXCJzbGlkLmJzLmNhcm91c2VsXCIsICggZSApID0+IHtcblxuICAgICAgICAvLyBzbGlkZVxuICAgICAgICBsZXQgJHRoaXMgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGxldCBjdXJyZW50U2xpZGUgPSAkKCR0aGlzKS5maW5kKFwiLmFjdGl2ZVwiKTtcbiAgICAgICAgbGV0IGJsb2NrSXRlbSA9IGN1cnJlbnRTbGlkZS5maW5kKFwiYmxvY2txdW90ZVwiKTtcbiAgICAgICAgbGV0IGhlaWdodCA9IGJsb2NrSXRlbS5vdXRlckhlaWdodCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5wYXJlbnQoXCIuY2Fyb3VzZWwtaW5uZXJcIikuY3NzKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gYWRqdXN0IHNpemUgb24gcmVzaXplXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxufVxuXG5jb25zdCBUZXN0aW1vbmFpbHMgPSBuZXcgVGVzdGltb25haWxDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgVGVzdGltb25haWxzOyIsImltcG9ydCB7QnBzSW50ZXJmYWNlfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9icHMuaW50ZXJmYWNlXCI7XG5jb25zdCAkID0galF1ZXJ5O1xuXG4vLyBBZGQgaW50ZXJmYWNlIEpRdWVyeVNtb290aCB7XG4vLyBzbW9vdGhTdGF0ZSgpOnZvaWQ7XG4vLyB9XG4vLyBzbW9vdGhTdGF0ZShhcmc6IE9iamVjdCk6IEpRdWVyeTtcblxuY2xhc3MgVXRpbGl0eUNvbXBvbmVudCB7XG4gIHdpbmRvd1dpZHRoOiBudW1iZXI7XG4gIGJyZWFrcG9pbnQ6IG51bWJlcjtcbiAgYnJlYWtwb2ludHM6IG51bWJlcltdO1xuICBicHM6IEJwc0ludGVyZmFjZTtcbiAgYnJvd3Nlcjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3NldEJyZWFrcG9pbnRzID0gKCBicHM6IEJwc0ludGVyZmFjZSApID0+IHtcbiAgICBsZXQgYXJyID0gW107XG5cbiAgICBmb3IgKCBsZXQga2V5IGluIGJwcyApIHtcbiAgICAgIGlmICggYnBzLmhhc093blByb3BlcnR5KGtleSkgKSB7XG4gICAgICAgIGFyci5wdXNoKGJwc1sga2V5IF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhcnIucmV2ZXJzZSgpO1xuICB9O1xuICBwcml2YXRlIF9jaGVja0JyZWFrcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gbWFrZSBicmVha3BvaW50IGV2ZW50IGF2YWlsYWJsZSB0byBhbGwgZmlsZXMgdmlhIHRoZSB3aW5kb3cgb2JqZWN0XG4gICAgbGV0IG9sZF9icmVha3BvaW50ID0gdGhpcy5icmVha3BvaW50O1xuXG4gICAgdGhpcy5fc2V0QnJlYWtwb2ludCgpO1xuXG4gICAgaWYgKCBvbGRfYnJlYWtwb2ludCAhPT0gdGhpcy5icmVha3BvaW50ICkge1xuXG4gICAgICAkKHdpbmRvdykudHJpZ2dlcihcImJyZWFrcG9pbnRDaGFuZ2VcIiwgVXRpbHMuYnJlYWtwb2ludCk7XG4gICAgfVxuICB9O1xuICBwcml2YXRlIF9zZXRCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIGdldCBicmVha3BvaW50IGZyb20gY3NzXG4gICAgbGV0IGJvZHkgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLFxuICAgICAgemluZGV4ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsgXCJ6LWluZGV4XCIgXTtcblxuICAgIHRoaXMuYnJlYWtwb2ludCA9IHBhcnNlSW50KHppbmRleCwgMTApO1xuICB9O1xuICBwcml2YXRlIF9zZXRXaW5kb3dXaWR0aCA9ICgpID0+IHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gIH07XG5cbiAgc2V0TnVtYmVyKCBjb3VudDogbnVtYmVyICk6IHN0cmluZyB7XG4gICAgLy8gY29udmVyIG51bWJlciB0byBzdHJpbmdcbiAgICBsZXQgdG90YWwgPSBjb3VudDtcbiAgICByZXR1cm4gdG90YWwudG9TdHJpbmcoKTtcbiAgfVxuXG4gIHdoaWNoQnJvd3NlcigpIHtcbiAgICBpZiAoIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcInNhZmFyaVwiKSA+IC0xKSAmJiAhKFxuICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJjaHJvbWVcIikgPiAtMSkgJiYgKG5hdmlnYXRvci5hcHBOYW1lID09PVxuICAgICAgXCJOZXRzY2FwZVwiKSApIHtcblxuICAgICAgaWYgKCBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpICE9PSBudWxsICkge1xuICAgICAgICByZXR1cm4gXCJpcGFkXCI7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcInNhZmFyaVwiO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkSHRtbCggdHlwZTogc3RyaW5nLCBhdHRycz86IE9iamVjdCwgaHRtbD86IHN0cmluZyApIHtcbiAgICBcbiAgICAvLyBodHRwOi8vbWFyY2dyYWJhbnNraS5jb20vYnVpbGRpbmctaHRtbC1pbi1qcXVlcnktYW5kLWphdmFzY3JpcHQvXG4gICAgXG4gICAgbGV0IGggPSAnPCcgKyB0eXBlO1xuXG4gICAgZm9yICggbGV0IGF0dHIgaW4gYXR0cnMgKSB7XG4gICAgICBpZiAoIGF0dHJzWyBhdHRyIF0gPT09IGZhbHNlICkgY29udGludWU7XG4gICAgICBoICs9ICcgJyArIGF0dHIgKyAnPVwiJyArIGF0dHJzWyBhdHRyIF0gKyAnXCInO1xuICAgIH1cblxuICAgIHJldHVybiBoICs9IGh0bWwgPyBcIj5cIiArIGh0bWwgKyBcIjwvXCIgKyB0eXBlICsgXCI+XCIgOiBcIi8+XCI7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gMDtcbiAgICB0aGlzLmJyZWFrcG9pbnQgPSAzMjA7XG4gICAgdGhpcy5icmVha3BvaW50cyA9IFtdO1xuICAgIHRoaXMuYnBzID0ge1xuICAgICAgbW9iaWxlOiA1NDQsXG4gICAgICB0YWJsZXQ6IDc2OCxcbiAgICAgIGxhcHRvcDogOTkyLFxuICAgICAgZGVza3RvcDogMTIwMCxcbiAgICAgIGRlc2t0b3BfeGw6IDE2MDBcbiAgICB9O1xuICAgIHRoaXMuYnJvd3NlciA9IHRoaXMud2hpY2hCcm93c2VyKCk7XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiVXRpbGl0aWVzIGxvYWRlZFwiKTtcblxuICAgIC8vIHNldCBicmVha3BvaW50IG9uIHdpbmRvdyBsb2FkXG4gICAgdGhpcy5fc2V0QnJlYWtwb2ludCgpO1xuICAgIHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgY29uc29sZS5sb2coXCJDdXJyZW50IEJyZWFrcG9pbnQgaXM6XCIsIHRoaXMuYnJlYWtwb2ludCk7XG5cbiAgICAvLyBjcmVhdGUgZnVsbCBhcnJheSBmb3IgaW1hZ2UgY29tcHJlc3Npb24gcmVmXG4gICAgdGhpcy5icmVha3BvaW50cyA9IHRoaXMuX3NldEJyZWFrcG9pbnRzKHRoaXMuYnBzKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLl9jaGVja0JyZWFrcG9pbnQpLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IFV0aWxzID0gbmV3IFV0aWxpdHlDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7Il19
