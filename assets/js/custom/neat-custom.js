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
        this.$navDropdown = document.getElementById("neat-dropdown-trigger");
        // this.$lowerContainer = $(".lowercontainer");
        this.$upperContainer = $(".uppercontainer");
        this.$navMeta = $(".neat-nav-meta");
        this.$dropDownWrapper = $(".neat-dropdown-wrapper");
        this.$search = $("#nav-xfer");
        this.$dropDownContent = $(".neat-dropdown-content");
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
        this.$navDropdown = document.getElementById("neat-dropdown-trigger");
        // this.$lowerContainer = $(".lowercontainer");
        this.$upperContainer = $(".uppercontainer");
        this.$navMeta = $(".neat-nav-meta");
        this.$dropDownWrapper = $(".neat-dropdown-wrapper");
        this.$search = $("#nav-xfer");
        this.$dropDownContent = $(".neat-dropdown-content");
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
                selected.parent("li").parent(".neat-secondary-dropdown").addClass("is-hidden").parent(".menu-item-has-children").parent("ul").removeClass("move-out");
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
        var dropdown = this.$dropDownContent.find(".neat-secondary-dropdown");
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
        this.$filter.on("click", "li", this.onFilterClick.bind(this, $this));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGUudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zdmcudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2ltYWdlTG9hZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9xdW90ZS1idWlsZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy90ZXN0aW1vbmlhbHMudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztHQUdHOztBQUVILHNCQUFrQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLDJCQUFnQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzFDLHVCQUFtQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3BELDJCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLG9EQUFvRDtBQUNwRCw0QkFBd0Isd0JBQXdCLENBQUMsQ0FBQTtBQUNqRCwrQkFBMEIsMkJBQTJCLENBQUMsQ0FBQTtBQUN0RCxpQ0FBZ0MsNkJBQTZCLENBQUMsQ0FBQTtBQUM5RCxnQ0FBMkIsNEJBQTRCLENBQUMsQ0FBQTtBQUN4RCw4QkFBeUIsMEJBQTBCLENBQUMsQ0FBQTtBQUNwRCxnQ0FBMkIsNEJBQTRCLENBQUMsQ0FBQTtBQUN4RCw2QkFBeUIseUJBQXlCLENBQUMsQ0FBQTtBQUNuRCw4QkFBeUIsMEJBQTBCLENBQUMsQ0FBQTtBQUNwRCwwREFBMEQ7QUFDMUQsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBRWpCLDRCQUE0QjtBQUU1QixDQUFDO0lBQ0M7UUFBQTtRQWNBLENBQUM7UUFaQyxrQkFBSSxHQUFKO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQixvQkFBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pCLGVBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLG9CQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWCxnQkFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2Qsd0JBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixzQkFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLHVCQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsMEJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyx1Q0FBdUM7UUFFckUsQ0FBQztRQUNILFVBQUM7SUFBRCxDQWRBLEFBY0MsSUFBQTtJQUVELElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFFMUIsd0JBQXdCO0lBQ3hCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDaEIsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pCLHFCQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsd0JBQXdCO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsOENBQThDO0lBQzlDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVcsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDekMsNEJBQTRCO1FBQzVCLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLHlCQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNELHVCQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIseUJBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUV4QixDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxFQUFFLENBQUM7Ozs7QUM3REwsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBR2pCO0lBYUU7UUFDRSxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELGdDQUFNLEdBQU47UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUUvQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCx3Q0FBYyxHQUFkO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsRSxDQUFDO0lBRUQseUNBQWUsR0FBZjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztJQUMzQyxDQUFDO0lBRUQscUNBQVcsR0FBWCxVQUFhLEtBQUs7UUFFaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLEVBQUU7WUFDekMsR0FBRyxFQUFFLElBQUk7WUFDVCxPQUFPLEVBQUUsR0FBRztTQUNiLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDM0IsR0FBRyxFQUFFLEtBQUs7WUFDVixPQUFPLEVBQUUsR0FBRztZQUNaLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztTQUNyQixDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUFFO1lBQ2pDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQzVCLEdBQUcsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQzFCLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3RCLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLEtBQUssRUFBRSxFQUFFO1lBQ1QsVUFBVSxFQUFFO2dCQUNWLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7b0JBQ1osUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLEtBQUssRUFBRSxNQUFNO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO29CQUMzQixHQUFHLEVBQUUsS0FBSztvQkFDVixPQUFPLEVBQUUsR0FBRztpQkFDYixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNiLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUU7WUFDMUIsT0FBTyxFQUFFLENBQUM7WUFDVixVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7b0JBQ25CLFNBQVMsRUFBRSxDQUFDLENBQUM7b0JBQ2IsTUFBTSxFQUFFLENBQUM7b0JBQ1QsS0FBSyxFQUFFLENBQUM7b0JBQ1IsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ3hCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO2lCQUMxQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNiLENBQUMsQ0FBQztJQUVMLENBQUM7SUFFRCxvQ0FBVSxHQUFWLFVBQVcsS0FBSztRQUNkLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixxREFBcUQ7UUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUM1QixHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUMxQixLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN0QixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN2QixTQUFTLEVBQUUsR0FBRztTQUNmLENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbkMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUNqQyxVQUFVLEVBQUUsU0FBUztZQUNyQixPQUFPLEVBQUUsR0FBRztZQUNaLEtBQUssRUFBRSxFQUFFO1NBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRTtZQUMxQixJQUFJLEVBQUUsQ0FBQztZQUNQLEdBQUcsRUFBRSxDQUFDO1lBQ04sS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsT0FBTztZQUNmLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRTtnQkFDVixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUNaLFFBQVEsRUFBRSxPQUFPO29CQUNqQixLQUFLLEVBQUUsTUFBTTtvQkFDYixTQUFTLEVBQUUsUUFBUTtpQkFDcEIsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUIsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDM0IsR0FBRyxFQUFFLE1BQU07WUFDWCxPQUFPLEVBQUUsR0FBRztTQUNiLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsRUFBRTtZQUN6QyxHQUFHLEVBQUUsSUFBSTtZQUNULE9BQU8sRUFBRSxHQUFHO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQzNCLEdBQUcsRUFBRSxLQUFLO1lBQ1YsT0FBTyxFQUFFLEdBQUc7WUFDWixLQUFLLEVBQUUsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztTQUNyQixDQUFDLENBQUM7SUFFTCxDQUFDO0lBRUQsOEJBQUksR0FBSjtRQUFBLGlCQXNCQztRQXJCQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQUs7WUFDdEIsZ0NBQWdDO1lBQ2hDLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0UsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEtBQUs7WUFDcEIsRUFBRSxDQUFDLENBQUUsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFLElBQUksS0FBSSxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNLENBQUM7WUFDVCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQXJMQSxBQXFMQyxJQUFBO0FBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztBQUV0QztrQkFBZSxTQUFTLENBQUM7Ozs7QUM1THpCLElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNqQixzQkFBa0IsbUJBQW1CLENBQUMsQ0FBQTtBQVd0QztJQVlFO1FBRUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JFLCtDQUErQztRQUMvQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUVwRDs7V0FFRztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxVQUFVLEVBQUUsS0FBSztZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUM7SUFDSixDQUFDO0lBR0QsV0FBVztJQUNYLDZCQUFNLEdBQU47UUFFRSxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckUsK0NBQStDO1FBQy9DLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWCxVQUFVLEVBQUUsS0FBSztZQUNqQixNQUFNLEVBQUUsS0FBSztZQUNiLE1BQU0sRUFBRSxLQUFLO1lBQ2IsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUUsS0FBSztTQUNmLENBQUM7UUFFRixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBR0Q7O09BRUc7SUFDSCw4QkFBTyxHQUFQLFVBQVMsS0FBWTtRQUNuQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNoRCxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFO1lBQy9CLEdBQUcsRUFBRSxDQUFDO1lBQ04sSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPO1NBQ3BCLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCwrQkFBUSxHQUFSLFVBQVUsS0FBWTtRQUNwQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRCxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFO1lBQy9CLEdBQUcsRUFBRSxPQUFPO1lBQ1osSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO1NBQ25CLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxrQ0FBVyxHQUFYLFVBQWEsSUFBYTtRQUN4QixFQUFFLENBQUMsQ0FBRSxJQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM1QixDQUFDO0lBRUgsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBVSxJQUFhO1FBRXJCLEVBQUUsQ0FBQyxDQUFFLElBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QixDQUFDO0lBRUgsQ0FBQztJQUVELG1DQUFZLEdBQVosVUFBYyxJQUFhO1FBRXpCLEVBQUUsQ0FBQyxDQUFFLElBQUssQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFXLEtBQUs7Z0JBQ3JFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25ILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25ELENBQUM7SUFFSCxDQUFDO0lBRUQsNkJBQU0sR0FBTixVQUFRLElBQWE7UUFFbkIsRUFBRSxDQUFDLENBQUUsSUFBSyxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVcsS0FBSztnQkFDNUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEosQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDMUIsQ0FBQztJQUdILENBQUM7SUFFRCwyQ0FBb0IsR0FBcEI7UUFDRSx5Q0FBeUM7UUFFekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0IsMERBQTBEO1FBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELDJDQUFvQixHQUFwQjtRQUNFLHlDQUF5QztRQUV6QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RCLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MscURBQXFEO1FBQ3JELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCw0Q0FBcUIsR0FBckI7UUFDRSwwQ0FBMEM7UUFFMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFbkQsQ0FBQztJQUVELHVDQUFnQixHQUFoQjtRQUVFLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUU5Qjs7V0FFRztRQUNILElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUV0RSxRQUFRLENBQUMsSUFBSSxDQUFFLFVBQUMsS0FBSyxFQUFFLElBQUk7WUFDekIsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBRSxDQUFDLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBRUQsc0NBQWUsR0FBZjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFFL0IsQ0FBQztJQUVELHVDQUFnQixHQUFoQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVqQyxFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCx1Q0FBZ0IsR0FBaEIsVUFBa0IsU0FBUztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVcsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsdUNBQWdCLEdBQWhCLFVBQWtCLFNBQVM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWpDLEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRUQsb0NBQW9DO1FBQ3BDLEVBQUUsQ0FBQyxDQUFFLFNBQVMsQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssSUFBSyxDQUFDLENBQUMsQ0FBQztZQUUvRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUVELHdDQUFpQixHQUFqQixVQUFtQixTQUFTO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVsQyxFQUFFLENBQUMsQ0FBRSxTQUFTLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLElBQUssQ0FBQyxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0IsQ0FBQztJQUVILENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQ0U7O1dBRUc7UUFDSCxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxLQUFLLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztZQUU1QyxFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUIsQ0FBQztZQUNELGlCQUFpQjtZQUVqQixJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixNQUFNLEVBQUUsSUFBSTtnQkFDWixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUM7UUFDSixDQUFDO1FBRUQ7O1dBRUc7UUFDSCxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxLQUFLLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLG9CQUFvQjtZQUNwQixVQUFVO1lBQ1YsRUFBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBQ0QsaUJBQWlCO1lBRWpCLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQztRQUNKLENBQUM7UUFFRDs7V0FFRztRQUNILEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLEtBQUssZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBRUQsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDWCxVQUFVLEVBQUUsS0FBSztnQkFDakIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLEtBQUs7YUFDZixDQUFDO1FBRUosQ0FBQztRQUVEOztXQUVHO1FBQ0gsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsS0FBSyxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQVEsQ0FBQyxDQUFDLENBQUM7WUFFN0MsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUUzQixFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBUSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsSUFBSTthQUNkLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQztJQUVELDhCQUFPLEdBQVA7UUFDRSxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxLQUFLLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztZQUU1QyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixNQUFNLEVBQUUsSUFBSTtnQkFDWixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUM7UUFFSixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsS0FBSyxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsSUFBSTtnQkFDWixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUM7UUFDSixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsS0FBSyxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7WUFFNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUM7UUFDSixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsS0FBSyxlQUFLLENBQUMsR0FBRyxDQUFDLE9BQVEsQ0FBQyxDQUFDLENBQUM7WUFFN0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsS0FBSztnQkFDYixPQUFPLEVBQUUsSUFBSTthQUNkLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQztJQUVELDJCQUFJLEdBQUo7UUFBQSxpQkFpQkM7UUFoQkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixvQkFBb0I7UUFFcEI7O3lCQUVpQjtRQUVqQixNQUFNLENBQUMsUUFBUSxHQUFHLFVBQUUsS0FBSztZQUN2QixDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO2tCQUMzQixVQUFVLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO2tCQUMxQyxNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUM7SUFHSixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQXhZQSxBQXdZQyxJQUFBO0FBRUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztBQUU3QjtrQkFBZSxHQUFHLENBQUM7Ozs7QUN4Wm5CLElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUVqQixzQkFBa0IsU0FBUyxDQUFDLENBQUE7QUFFNUI7SUFnQkU7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsdUNBQVksR0FBWjtRQUNFLGVBQWU7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1lBQ2xDLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFlBQVksRUFBRSxlQUFlO1lBQzdCLFlBQVksRUFBRSxLQUFLO1lBQ25CLE9BQU8sRUFBRTtnQkFDUCxhQUFhLEVBQUUsYUFBYTthQUM3QjtZQUNELGtCQUFrQixFQUFFLEtBQUs7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdEQUFxQixHQUFyQjtRQUNFLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLCtCQUErQjtRQUU1RSw4QkFBOEI7UUFDOUIsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQztRQUVELEVBQUU7UUFDRixFQUFFLENBQUMsQ0FBRSxjQUFjLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBTSxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLGNBQWMsSUFBSSxHQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUUsY0FBYyxJQUFJLEdBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxjQUFjLElBQUksSUFBSyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxjQUFjLEdBQUcsSUFBSyxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxjQUFjLEdBQUcsSUFBSyxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBRUQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTdELEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxDQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsSSxDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRTlELE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFRCx3Q0FBYSxHQUFiO1FBQUEsaUJBUUM7UUFQQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixVQUFVLENBQUM7WUFDVCw0REFBNEQ7WUFDNUQsS0FBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDOUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVELHVDQUFZLEdBQVo7UUFFRSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVyQyx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakQsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLGVBQWUsS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBRWpDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBRTNFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXJDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBRTNFLENBQUM7SUFDSCxDQUFDO0lBRUQsb0NBQVMsR0FBVCxVQUFXLFlBQW9CO1FBQzdCLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw2Q0FBa0IsR0FBbEI7UUFDRSxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELHVDQUFZLEdBQVo7UUFBQSxpQkFZQztRQVhDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRTtZQUU1QyxVQUFVO1lBQ1YsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFckMsb0VBQW9FO1lBQ3BFLFVBQVUsQ0FBRTtnQkFDVixLQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0RCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFVixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQ0FBb0IsR0FBcEI7UUFFRSxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxLQUFLLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9GLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFbEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGFBQWEsR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFN0QsQ0FBQztJQUVILENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBRUUsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVoQyw2Q0FBNkM7UUFDN0MsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXhDLHFCQUFxQjtZQUNyQixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUU3QixxQ0FBcUM7WUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFckUsQ0FBQztJQUVILENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWUsRUFBRSxFQUFFLEdBQUc7UUFDcEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU3QixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUzQixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELG1DQUFRLEdBQVIsVUFBVSxJQUFJO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7WUFDakIsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0JBQUksR0FBSjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFNUIsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFCLG1DQUFtQztRQUNuQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTdCLGdFQUFnRTtRQUNoRSxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFaEQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixzQkFBc0I7UUFDdEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFckUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUgsdUJBQUM7QUFBRCxDQTlNQSxBQThNQyxJQUFBO0FBRUQsSUFBSSxjQUFjLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0FBRTVDO2tCQUFlLGNBQWMsQ0FBQzs7OztBQ3ROOUIsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ2pCLHNCQUFrQixTQUFTLENBQUMsQ0FBQTtBQUU1QjtJQWNFLHlCQUFhLEVBQUU7UUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRUQsZ0RBQXNCLEdBQXRCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCx3Q0FBYyxHQUFkO1FBQ0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsOENBQW9CLEdBQXBCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVELDRDQUFrQixHQUFsQixVQUFvQixLQUFLO1FBRXZCLEVBQUUsQ0FBQyxDQUFFLEtBQUssS0FBSyxPQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQztJQUVILENBQUM7SUFFRCxtQ0FBUyxHQUFULFVBQVcsS0FBYSxFQUFFLFFBQWdCO1FBRXhDLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVyRSw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztJQUVELHFDQUFXLEdBQVgsVUFBYSxTQUFTO1FBRXBCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRWpELEVBQUUsQ0FBQyxDQUFFLFNBQVMsS0FBSyxPQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVCLGtEQUFrRDtZQUNsRCxZQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGtEQUFrRDtZQUNsRCxZQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxlQUFlO1FBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5DLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsc0NBQVksR0FBWixVQUFjLEtBQUs7UUFFakIsMEZBQTBGO1FBQzFGLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxjQUFjLEVBQUcsQ0FBQyxDQUFDLENBQUM7WUFFakYsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsSUFBSSxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVyxDQUFDLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLENBQUM7UUFFSCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFFbkUsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsSUFBSSxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVyxDQUFDLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLENBQUM7UUFFSCxDQUFDO0lBRUgsQ0FBQztJQUVELG9DQUFVLEdBQVYsVUFBWSxFQUFFLEVBQUUsS0FBSztRQUFyQixpQkErQkM7UUE5QkMsWUFBWTtRQUNaLGVBQWU7UUFDZixFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFFdkYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFFdkIsSUFBSSxDQUFDLFNBQVM7aUJBQ1gsUUFBUSxDQUFDLFdBQVcsQ0FBQztpQkFDckIsR0FBRyxDQUNGLHNCQUFzQjtnQkFDdEIsaUJBQWlCO2dCQUNqQixpQkFBaUI7Z0JBQ2pCLGtCQUFrQjtnQkFDbEIsZUFBZSxFQUFFO2dCQUVqQixDQUFDLENBQUMsV0FBVyxDQUFDO3FCQUNYLE9BQU8sQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUU5RCx1QkFBdUI7Z0JBQ3ZCLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRTtvQkFDckQsT0FBTyxFQUFFLENBQUM7b0JBQ1YsQ0FBQyxFQUFFLElBQUk7b0JBQ1AsQ0FBQyxFQUFFLENBQUMsRUFBRTtvQkFDTixLQUFLLEVBQUUsQ0FBQztvQkFDUixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU87b0JBQ25CLEtBQUssRUFBRSxFQUFFO2lCQUNWLENBQUMsQ0FBQztZQUVQLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUM7SUFFRCxxQ0FBVyxHQUFYLFVBQWEsQ0FBQztRQUFkLGlCQXdCQztRQXZCQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsU0FBUzthQUNOLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUNmO1lBQ0UsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTztZQUN4QyxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQ0YsQ0FBQztRQUVKLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRTtZQUNyRCxPQUFPLEVBQUUsQ0FBQztZQUNWLENBQUMsRUFBRSxJQUFJO1lBQ1AsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFO29CQUM3QixLQUFLLEVBQUUsRUFBRTtpQkFDVixDQUFDLENBQUM7WUFDTCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1DQUFTLEdBQVQ7UUFBQSxpQkFpQkM7UUFmQyxvRUFBb0U7UUFDcEUsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztZQUU1QixJQUFJLEtBQUssR0FBRyxLQUFJLENBQUM7WUFDakIsRUFBRSxDQUFDLENBQUUsZUFBSyxDQUFDLFVBQVUsSUFBSSxlQUFLLENBQUMsR0FBRyxDQUFDLE1BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDNUQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ25CLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdEIsQ0FBQztRQUVILENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVWLENBQUM7SUFFRCw4QkFBSSxHQUFKO1FBRUUsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWxELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUV6RSxxQkFBcUI7UUFDckIsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUNSLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JELElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25ELElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFMUQsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBRTFELDBCQUEwQjtRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0EvTUEsQUErTUMsSUFBQTtBQUVELHFEQUFxRDtBQUNyRDtJQUlFO1FBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsb0NBQUksR0FBSjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFFLEtBQUssRUFBRSxFQUFFO1lBRW5DLGtEQUFrRDtZQUNsRCxJQUFJLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUgsNEJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBRUQsSUFBSSxZQUFZLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO0FBRS9DO2tCQUFlLFlBQVksQ0FBQzs7OztBQzVPNUIsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBSWpCO0lBT0U7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsNENBQWUsR0FBZjtRQUNFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELDBDQUFhLEdBQWI7UUFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRXpDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELHNDQUFTLEdBQVQ7UUFFRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVuQyxvQkFBb0I7UUFDcEIseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFckMsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxzQ0FBUyxHQUFUO1FBQ0UsNkJBQTZCO1FBRTdCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUU5QyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0Qyw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0IsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTtZQUN6QixPQUFPLEVBQUUsQ0FBQztZQUNWLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpQ0FBSSxHQUFKO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWpDLHlDQUF5QztRQUN6QyxpREFBaUQ7UUFFakQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRTtZQUN6QixDQUFDLEVBQUUsR0FBRztZQUNOLENBQUMsRUFBRSxNQUFNO1lBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDNUIsS0FBSyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsaUJBQWlCO1NBQ3hCLENBQUMsQ0FBQztRQUlILENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDSCx5QkFBQztBQUFELENBakZBLEFBaUZDLElBQUE7QUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7QUFFekM7a0JBQWUsU0FBUyxDQUFDOzs7O0FDekZ6QixJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDakIsOEJBQThCO0FBQzlCO0lBU0U7UUFDRSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxpREFBa0IsR0FBbEI7UUFDRSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEMsSUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRXRELEVBQUUsQ0FBQyxDQUFFLFdBQVcsS0FBSyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFVBQVUsQ0FBQztnQkFFVCxTQUFTO3FCQUNOLEVBQUUsQ0FBQyxXQUFXLEVBQUUsRUFBRSxFQUNqQjtvQkFDRSxDQUFDLEVBQUUsTUFBTTtvQkFDVCxPQUFPLEVBQUUsQ0FBQztpQkFDWCxDQUNGLENBQUM7WUFDTixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDVixDQUFDO0lBQ0gsQ0FBQztJQUVELFNBQVM7SUFDVCw4QkFBOEI7SUFDOUIsd0VBQXdFO0lBQ3hFLEVBQUU7SUFDRiwwQkFBMEI7SUFDMUIseUJBQXlCO0lBQ3pCLEVBQUU7SUFDRixzQ0FBc0M7SUFDdEMsRUFBRTtJQUNGLGtCQUFrQjtJQUNsQiw2QkFBNkI7SUFDN0IsY0FBYztJQUNkLDBCQUEwQjtJQUMxQixjQUFjO0lBQ2QsYUFBYTtJQUNiLGVBQWU7SUFDZixhQUFhO0lBQ2IsRUFBRTtJQUNGLG9DQUFvQztJQUNwQyxFQUFFO0lBQ0YsTUFBTTtJQUNOLElBQUk7SUFFSixrREFBbUIsR0FBbkI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBRWhDLEdBQUcsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUcsQ0FBQztZQUMzQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLENBQUM7SUFDSCxDQUFDO0lBRUQsNENBQWEsR0FBYjtRQUFBLGlCQXdDQztRQXZDQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxFQUFFO1lBRTVDLHVCQUF1QjtZQUN2QixLQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFFNUQsb0JBQW9CO1lBQ3BCLG9EQUFvRDtZQUNwRCxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFN0QsQ0FBQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLFVBQVcsUUFBUTtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQUUsUUFBUTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUU5QyxvQ0FBb0M7WUFDcEMsS0FBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVqQyw2Q0FBNkM7WUFDN0MsMkNBQTJDO1lBQzNDLDhDQUE4QztZQUM5QyxNQUFNO1FBRVIsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQzthQUNELFFBQVEsQ0FBQyxVQUFFLFFBQVEsRUFBRSxLQUFLO1lBQ3pCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUVsRCxFQUFFLENBQUMsQ0FBRSxNQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEtBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsK0RBQStEO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFJLEdBQUo7UUFFRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDSCwyQkFBQztBQUFELENBcEhBLEFBb0hDLElBQUE7QUFFRCxJQUFJLFdBQVcsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7QUFFN0M7a0JBQWUsV0FBVyxDQUFDOzs7O0FDekgzQixJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDakIsc0JBQWtCLFNBQVMsQ0FBQyxDQUFBO0FBQzVCO0lBUUU7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsMkNBQWMsR0FBZDtRQUNFLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksYUFBYSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDdEMsYUFBYSxDQUFDLEdBQUcsQ0FBQztnQkFDaEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNyRyxDQUFDLENBQUM7WUFFSCxJQUFJLGNBQWMsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ3ZDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQ2pCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDdkcsQ0FBQyxDQUFDO1lBRUgsSUFBSSxVQUFVLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFOUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUMvQjtnQkFDRSxjQUFjLEVBQUUsaUJBQWlCO2dCQUNqQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUN2QyxNQUFNLEVBQUUsQ0FBQyxHQUFHO2FBQ2IsQ0FBQztpQkFFRCxRQUFRLENBQUMsYUFBYSxDQUFDO2lCQUN2QixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLG1DQUFtQztpQkFDL0UsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXJCLElBQUksTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FDaEM7Z0JBQ0UsY0FBYyxFQUFFLGlCQUFpQjtnQkFDakMsUUFBUSxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUc7YUFDOUMsQ0FBQztpQkFFRCxRQUFRLENBQUMsY0FBYyxDQUFDO2lCQUN4QixhQUFhLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLG1DQUFtQztpQkFDL0UsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0lBRUQsNkNBQWdCLEdBQWhCO1FBQ0UsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksVUFBVSxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzlDLElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FDL0I7WUFDRSxjQUFjLEVBQUUsb0JBQW9CO1lBQ3BDLFFBQVEsRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFO1NBRTdCLENBQUM7YUFDRCxFQUFFLENBQUMsT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUM7YUFFRCxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELDZDQUFnQixHQUFoQjtRQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDM0IsU0FBUzthQUNOLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUNmO1lBQ0UsUUFBUSxFQUFFO2dCQUNSLENBQUMsRUFBRSxDQUFDO2FBQ0w7WUFDRCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87U0FDckIsQ0FDRixDQUFDO0lBQ04sQ0FBQztJQUVELHFEQUF3QixHQUF4QjtRQUFBLGlCQVlDO1FBWEMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxDQUFDLEVBQUUsTUFBTTtZQUNULENBQUMsRUFBRSxNQUFNO1lBQ1QsS0FBSyxFQUFFLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsVUFBVSxFQUFFO2dCQUNWLDJFQUEyRTtnQkFDM0UsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQixDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9DQUFPLEdBQVAsVUFBUyxHQUFHO1FBQ1YsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQy9CLENBQUM7SUFFRCxvREFBdUIsR0FBdkIsVUFBeUIsUUFBUTtRQUFqQyxpQkFtQkM7UUFqQkMsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBR2hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQzthQUUvQixHQUFHLENBQUMsMkNBQTJDLEVBQUU7WUFFaEQsNkRBQTZEO1lBQzdELEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRTFCLENBQUMsQ0FBQyxDQUFDO1FBRUwsRUFBRSxDQUFDLENBQUUsT0FBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFVBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsUUFBUSxFQUFFLENBQUM7UUFDYixDQUFDO0lBRUgsQ0FBQztJQUVELHFDQUFRLEdBQVIsVUFBVSxHQUFHO1FBQ1gsRUFBRSxDQUFDLENBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLEVBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVELDZDQUFnQixHQUFoQixVQUFrQixLQUFNO1FBQXhCLGlCQXVEQztRQXJEQyx5QkFBeUI7UUFDekIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFekY7O1dBRUc7UUFDSCxFQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixNQUFNLENBQUM7UUFDVCxDQUFDO1FBRUQ7O1dBRUc7UUFDSDs7V0FFRztRQUNILEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLEdBQUcsZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3JCLGVBQUssQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLFdBQVksQ0FBQyxDQUFDLENBQUM7WUFFM0MsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLG1DQUFtQztZQUNuQyxNQUFNLENBQUM7UUFFVCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLEdBQUcsZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFFMUU7O2VBRUc7WUFFSCxtQ0FBbUM7WUFDbkMsSUFBSSxDQUFDLHVCQUF1QixDQUFFO2dCQUM1QixLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUwsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVksQ0FBQyxDQUFDLENBQUM7UUFPcEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU47O2VBRUc7WUFFSCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFFSCxDQUFDO0lBRUQsaUNBQUksR0FBSjtRQUFBLGlCQW9CQztRQW5CQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsd0NBQXdDO1FBQ3hDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUUsQ0FBQztZQUNwQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLHdEQUF3RDtRQUN4RCxFQUFFO1FBQ0YsaURBQWlEO1FBQ2pELDBCQUEwQjtRQUMxQix5QkFBeUI7UUFDekIseUJBQXlCO1FBQ3pCLE1BQU07UUFDTixFQUFFO1FBQ0YsaUJBQWlCO0lBQ25CLENBQUM7SUFDSCx5QkFBQztBQUFELENBaE5BLEFBZ05DLElBQUE7QUFFRCxJQUFJLG1CQUFtQixHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztBQUVuRDtrQkFBZSxtQkFBbUIsQ0FBQzs7OztBQ3ZObkMsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ2pCLHNCQUFrQixTQUFTLENBQUMsQ0FBQTtBQWdCNUI7SUFlRTtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLFFBQVEsRUFBRSxFQUFFO1lBQ1osWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxlQUFLLENBQUMsVUFBVSxDQUFDO0lBRTVDLENBQUM7SUFFRCx5Q0FBZ0IsR0FBaEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELGlDQUFRLEdBQVIsVUFBVSxLQUFhO1FBRXJCLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFMUMsQ0FBQztJQUVELHVDQUFjLEdBQWQ7UUFFRSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUVwRCxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBRSxLQUFLLEVBQUUsRUFBRTtZQUVuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQ2YsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQy9CLElBQUksR0FBRyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsRUFDaEMsUUFBUSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBRWhDLGlDQUFpQztZQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUUzQixzQ0FBc0M7WUFDdEMsSUFBSSxLQUFLLEdBQUcsZUFBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ25DLEVBQUUsRUFBRSxRQUFRO2dCQUNaLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxjQUFjO2dCQUNyQixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsSUFBSTthQUNaLENBQUMsQ0FBQztZQUVILElBQUksS0FBSyxHQUFHLGVBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO2dCQUNuQyxHQUFHLEVBQUUsUUFBUTtnQkFDYixLQUFLLEVBQUUsS0FBSyxLQUFLLENBQUMsR0FBRyxVQUFVLEdBQUcsRUFBRTthQUNyQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBR1YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsTUFBTSxDQUFDLHNEQUFzRCxDQUFDLENBQUM7UUFFeEUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFdkMsQ0FBQztJQUVELGlEQUF3QixHQUF4QjtRQUFBLGlCQXlCQztRQXhCQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFckMsNEVBQTRFO1FBQzVFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUUsS0FBSyxFQUFFLEVBQUU7WUFFMUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUNmLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFM0IsRUFBRSxDQUFDLENBQUUsS0FBSyxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUU1Qix5Q0FBeUM7Z0JBQ3pDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsQ0FBQztZQUVELHVEQUF1RDtZQUN2RCxFQUFFLENBQUMsQ0FBRSxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBRSxDQUFDLENBQUMsQ0FBQztnQkFDckMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBRUQsOEJBQThCO1lBQzlCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQ0FBc0IsR0FBdEI7UUFBQSxpQkFnQkM7UUFkQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBRSxLQUFLLEVBQUUsRUFBRTtZQUVuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQ2YsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUUxQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO1FBRS9DLENBQUMsQ0FBQyxDQUFDO1FBRUgseUJBQXlCO1FBQ3pCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRWhELENBQUM7SUFFRCwrQkFBTSxHQUFOLFVBQVEsRUFBVTtRQUVoQixRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDbEIsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUMsQ0FBQztJQUVMLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVUsQ0FBQztRQUVULElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQzVCLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUNwQyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFDckMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEVBQ3JDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdCLGtDQUFrQztRQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUvQyx1Q0FBdUM7UUFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTlDLHVDQUF1QztRQUN2QyxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JGLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTVCLGlIQUFpSDtRQUNqSCxFQUFFLENBQUMsQ0FBRSxPQUFPLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUNqQixpQkFBaUIsRUFBRSxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUs7Z0JBQ3BELGNBQWMsRUFBRSxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUs7Z0JBQ2pELGFBQWEsRUFBRSxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUs7Z0JBQ2hELFlBQVksRUFBRSxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUs7Z0JBQy9DLFdBQVcsRUFBRSxhQUFhLEdBQUcsU0FBUyxHQUFHLEtBQUs7YUFDL0MsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQ2pCLGlCQUFpQixFQUFFLGlCQUFpQjtnQkFDcEMsY0FBYyxFQUFFLGlCQUFpQjtnQkFDakMsYUFBYSxFQUFFLGlCQUFpQjtnQkFDaEMsWUFBWSxFQUFFLGlCQUFpQjtnQkFDL0IsV0FBVyxFQUFFLGlCQUFpQjthQUMvQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsa0VBQWtFO1FBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0Isd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUVyQixDQUFDO0lBRUQsb0NBQVcsR0FBWDtRQUFBLGlCQWtCQztRQWhCQyxtRUFBbUU7UUFDbkUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBRSxLQUFLLEVBQUUsRUFBRTtZQUVuQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQ2YsRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBRWpELEVBQUUsQ0FBQyxDQUFFLEVBQUUsS0FBSyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBRWpDLEtBQUssQ0FBQyxRQUFRLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUVoRCxDQUFDO1FBRUgsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDO0lBRUQsc0NBQWEsR0FBYjtRQUFBLGlCQXVCQztRQXJCQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFFLElBQUk7WUFDbkQsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFFLElBQUksQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMzRCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxHQUFHLCtEQUErRCxDQUFDO1FBRTdFLElBQUksZUFBZSxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUzQyxlQUFlLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFbEQsbUVBQW1FO1FBQ25FLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFFdEUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkQsNkJBQTZCO1FBQzdCLElBQUksU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUduRCxDQUFDO0lBRUQsa0NBQVMsR0FBVCxVQUFXLENBQUM7UUFBWixpQkFnREM7UUEvQ0MsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUVoQyxzQkFBc0I7UUFDdEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbkYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV2QixVQUFVLENBQUM7WUFDVCxxQkFBcUI7WUFDckIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdkMsOEJBQThCO1lBQzlCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVSLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxXQUFXO2lCQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztpQkFDeEIsR0FBRyxDQUFDLDZEQUE2RCxFQUNoRSxVQUFFLENBQUM7Z0JBRUQsNkNBQTZDO2dCQUM3QyxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzdDLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFdEMsMkJBQTJCO2dCQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRW5CLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU4sNkNBQTZDO1lBQzdDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFdEMsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNkLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBR0QseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVUsQ0FBQztRQUNULENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUVuQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9CLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhELDJDQUEyQztRQUMzQyxFQUFFLENBQUMsQ0FBRSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQztRQUNULENBQUM7UUFFRCxZQUFZO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRS9CLHlDQUF5QztRQUN6QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV0QyxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEMsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUU5Qyx5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFeEMsd0JBQXdCO1FBQ3hCLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTNDLDRDQUE0QztZQUM1QyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXRGLENBQUM7UUFHRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRXZELHlCQUF5QjtRQUN6QixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUV0QyxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxJQUFJLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLDZEQUE2RCxFQUNwRSxVQUFFLENBQUM7Z0JBRUQsb0VBQW9FO2dCQUNwRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUxQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLG9FQUFvRTtZQUNwRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQyxDQUFDO0lBRUgsQ0FBQztJQUVELCtCQUFNLEdBQU47UUFBQSxpQkFjQztRQVpDLG9FQUFvRTtRQUNwRSxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRS9CLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBRTVCLEVBQUUsQ0FBQyxDQUFFLEtBQUksQ0FBQyxpQkFBaUIsS0FBSyxlQUFLLENBQUMsVUFBVyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxLQUFJLENBQUMsaUJBQWlCLEdBQUcsZUFBSyxDQUFDLFVBQVUsQ0FBQztZQUM1QyxDQUFDO1FBRUgsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRVYsQ0FBQztJQUVELDZCQUFJLEdBQUo7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTdCLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsMkRBQTJEO1FBQzNELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTVCLGNBQWM7UUFDZCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRTlCLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVqQywrQkFBK0I7UUFDL0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVqRCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQTNYQSxBQTJYQyxJQUFBO0FBRUQsSUFBTSxZQUFZLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztBQUUxQztrQkFBZSxZQUFZLENBQUM7Ozs7QUNoWjVCLElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNqQixzQkFBa0IsU0FBUyxDQUFDLENBQUE7QUFTNUI7SUFxQkUsMkJBQWEsRUFBVTtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLG1CQUFtQjtRQUNuQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDbkIsVUFBVSxFQUFFLENBQUM7WUFDYixTQUFTLEVBQUUsQ0FBQztZQUNaLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSztZQUN6QixZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDO1NBQzdCLENBQUM7SUFFSixDQUFDO0lBRUQseUNBQWEsR0FBYjtRQUVFLDZDQUE2QztRQUM3QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM5RixVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLDJDQUEyQztRQUMzQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM3RyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRS9CLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFbkIsMEVBQTBFO1FBQzFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztRQUVwRCxvRkFBb0Y7UUFDcEYsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFaEUsQ0FBQztJQUVELGtEQUFzQixHQUF0QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsZ0RBQW9CLEdBQXBCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxpREFBcUIsR0FBckI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELDBDQUFjLEdBQWQ7UUFDRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDL0MsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCwyQ0FBZSxHQUFmLFVBQWlCLFFBQWdCO1FBRS9CLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUUzRixDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFhLEtBQWE7UUFFeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFOUMsQ0FBQztJQUVELGdEQUFvQixHQUFwQjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztJQUN6QyxDQUFDO0lBRUQsdUNBQVcsR0FBWCxVQUFhLFNBQWlCO1FBRTVCLHlEQUF5RDtRQUN6RCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUU3RixFQUFFLENBQUMsQ0FBRSxTQUFTLEtBQUssT0FBUSxDQUFDLENBQUMsQ0FBQztZQUM1Qiw0REFBNEQ7WUFDNUQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTiw0REFBNEQ7WUFDNUQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELDBCQUEwQjtRQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELDRDQUFnQixHQUFoQixVQUFrQixTQUFrQixFQUFFLFFBQWlCO1FBRXJELFlBQVk7UUFDWixFQUFFLENBQUMsQ0FBRSxTQUFVLENBQUMsQ0FBQyxDQUFDO1lBRWhCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNwQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFO2dCQUN2QixNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDcEIsQ0FDRixDQUFDO1FBRUosQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU4sb0JBQW9CO1lBQ3BCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ2hELElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUzQixDQUFDO0lBRUgsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBWSxTQUFpQjtRQUMzQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNoRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUU3RyxFQUFFLENBQUMsQ0FBRSxTQUFTLEtBQUssT0FBUSxDQUFDLENBQUMsQ0FBQztZQUU1Qiw0REFBNEQ7WUFDNUQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTVDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLDREQUE0RDtZQUM1RCxZQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3JDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRTNDLENBQUM7SUFFSCxDQUFDO0lBRUQsMkNBQWUsR0FBZixVQUFpQixTQUFpQjtRQUVoQyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUMvQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUdyRyxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxHQUFHLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztZQUUxQzs7ZUFFRztZQUVILEVBQUUsQ0FBQyxDQUFFLFNBQVMsS0FBSyxPQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixZQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUUvQixFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRyxDQUFDLENBQUMsQ0FBQztvQkFDdEcsbUJBQW1CO29CQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO29CQUNsRixJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUVuRixzQkFBc0I7b0JBQ3RCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUU7d0JBQ3BDLENBQUMsRUFBRSxJQUFJO3dCQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7d0JBQy9CLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtxQkFDbkIsQ0FBQyxDQUFDO2dCQUVMLENBQUM7WUFHSCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDcEIsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFHL0IsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7b0JBRWxGLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7b0JBQ2xGLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUU7d0JBQ3BDLENBQUMsRUFBRSxJQUFJO3dCQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7d0JBQy9CLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtxQkFDbkIsQ0FBQyxDQUFDO2dCQUVMLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxLQUFLLENBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ25GLG1CQUFtQjtvQkFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztnQkFDckYsQ0FBQztZQUVILENBQUM7UUFFSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTjs7ZUFFRztZQUNILEVBQUUsQ0FBQyxDQUFFLFNBQVMsS0FBSyxPQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixZQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUUvQix3Q0FBd0M7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFHLENBQUMsQ0FBQyxDQUFDO29CQUN0RyxpQ0FBaUM7b0JBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7b0JBQ25GLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7b0JBRWxGLGNBQWM7b0JBQ2QsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRTt3QkFDbEMsQ0FBQyxFQUFFLElBQUk7d0JBQ1AsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVTt3QkFDaEMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO3FCQUNuQixDQUNGLENBQUM7Z0JBRUosQ0FBQztZQUVILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFTixZQUFZLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUUvQixFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEtBQUssQ0FBRSxDQUFDLENBQUMsQ0FBQztvQkFFbkYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztvQkFDbkYsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRTt3QkFDbEMsQ0FBQyxFQUFFLElBQUk7d0JBQ1AsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVTt3QkFDaEMsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO3FCQUNuQixDQUNGLENBQUM7Z0JBRUosQ0FBQztnQkFFRCwyREFBMkQ7Z0JBQzNELEVBQUUsQ0FBQyxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksS0FBSyxDQUFFLENBQUMsQ0FBQyxDQUFDO29CQUVsRixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO2dCQUVwRixDQUFDO1lBRUgsQ0FBQztRQUVILENBQUM7SUFFSCxDQUFDO0lBRUQsMENBQWMsR0FBZCxVQUFnQixJQUFZO1FBRTFCLEVBQUUsQ0FBQyxDQUFFLElBQUksS0FBSyxRQUFTLENBQUMsQ0FBQyxDQUFDO1lBRXhCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFLEVBQUU7Z0JBQ2xDLENBQUMsRUFBRSxJQUFJO2dCQUNQLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVM7Z0JBQy9CLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTzthQUNwQixDQUNGLENBQUM7UUFFSixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFO2dCQUNsQyxDQUFDLEVBQUUsSUFBSTtnQkFDUCxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVO2dCQUNoQyxDQUFDLEVBQUUsQ0FBQztnQkFDSixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDcEIsQ0FDRixDQUFDO1FBRUosQ0FBQztJQUVILENBQUM7SUFFRCx3Q0FBWSxHQUFaLFVBQWMsS0FBVTtRQUN0QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdkIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVE7UUFDMUMsSUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUdyQyxvRUFBb0U7UUFDcEUsRUFBRSxDQUFDLENBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUcsQ0FBQyxDQUFDLENBQUM7WUFFOUYsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFHNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEtBQUssQ0FBRSxDQUFDLENBQUMsQ0FBQztZQUVqRiw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUV2RCw4Q0FBOEM7WUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFNUIsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXO1lBQ3ZDLFNBQVMsR0FBRyxVQUFVO1lBQ3RCLFVBQVUsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLGNBQzFCLENBQUMsQ0FBQyxDQUFDO1lBQ0QsMkZBQTJGO1lBQzNGLGVBQWU7WUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTdCLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUU1QixDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxTQUFTLEdBQUcsVUFDekQsQ0FBQyxDQUFDLENBQUM7WUFDRCxlQUFlO1lBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU3QixvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFNUIsQ0FBQztRQUVELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTNFLENBQUM7SUFFRCxxQ0FBUyxHQUFUO1FBQUEsaUJBc0JDO1FBcEJDLG9FQUFvRTtRQUNwRSxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBRTVCLGdEQUFnRDtZQUNoRCxFQUFFLENBQUMsQ0FBRSxlQUFLLENBQUMsVUFBVSxHQUFHLGVBQUssQ0FBQyxHQUFHLENBQUMsTUFBTyxDQUFDLENBQUMsQ0FBQztnQkFFMUMsc0RBQXNEO2dCQUN0RCxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWhDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFTixLQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWpDLENBQUM7UUFFSCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFUixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUUxQixDQUFDO0lBRUQsOENBQWtCLEdBQWxCO1FBRUUsb0JBQW9CO1FBQ3BCLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDM0IsU0FBUyxFQUFFLHFDQUFxQztTQUNqRCxDQUFDLENBQUM7UUFHSCxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFO1lBQzVCLFNBQVMsRUFBRSxzQ0FBc0M7WUFDakQsS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDLENBQUM7SUFHTCxDQUFDO0lBRUQsMkNBQWUsR0FBZjtRQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUU7WUFDNUIsU0FBUyxFQUFFLHNDQUFzQztZQUNqRCxLQUFLLEVBQUUsRUFBRTtTQUNWLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx1Q0FBVyxHQUFYO1FBQUEsaUJBK0JDO1FBN0JDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBRSxLQUFhLEVBQUUsRUFBVTtZQUV0RCx1QkFBdUI7WUFDdkIsSUFBSSxTQUFTLEdBQUcsZUFBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFDcEMsYUFBYSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQ25DLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUM1QyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFDekMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekMsNEJBQTRCO1lBQzVCLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ2hELFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLFdBQVcsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqQyxPQUFPLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUU5Qyw4QkFBOEI7WUFDOUIsS0FBSyxLQUFLLEtBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUVqRixxQkFBcUI7WUFDckIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzQixDQUFDLENBQUMsQ0FBQztRQUVILHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV4QyxDQUFDO0lBRUQsbURBQXVCLEdBQXZCLFVBQXlCLFFBQVE7UUFBakMsaUJBV0M7UUFUQywyREFBMkQ7UUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsRCxrRkFBa0Y7UUFDbEYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBRSxLQUFLLEVBQUUsRUFBRTtZQUMvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxFQUFFLENBQUM7SUFDYixDQUFDO0lBRUQsMkNBQWUsR0FBZjtRQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLEVBQUU7WUFDbkMsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUUsQ0FBQztTQUNULENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw0Q0FBZ0IsR0FBaEI7UUFBQSxpQkFRQztRQVBDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDaEUsT0FBTyxFQUFFLENBQUM7WUFDVixLQUFLLEVBQUUsRUFBRTtZQUNULFVBQVUsRUFBRTtnQkFDVixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDekIsQ0FBQztTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxnQ0FBSSxHQUFKO1FBRUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLDhDQUE4QztRQUM5QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFaEYsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUdsRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTdELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTNFLENBQUM7SUFDSCx3QkFBQztBQUFELENBaGdCQSxBQWdnQkMsSUFBQTtBQUVELHFEQUFxRDtBQUNyRDtJQUlFO1FBQ0UsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELDZCQUFJLEdBQUo7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBRSxLQUFhLEVBQUUsRUFBVTtZQUVuRCxrREFBa0Q7WUFDbEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUgscUJBQUM7QUFBRCxDQW5CQSxBQW1CQyxJQUFBO0FBRUQsSUFBSSxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztBQUUxQztrQkFBZSxjQUFjLENBQUM7Ozs7QUNwaUI5QixJQUFNLENBQUMsR0FBRyxNQUFNLENBQUM7QUFFakIsc0JBQWtCLFNBQVMsQ0FBQyxDQUFBO0FBRTVCO0lBZUU7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELDZDQUFZLEdBQVo7UUFDRSx1Q0FBdUM7UUFDdkMsRUFBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUM7Z0JBQzdCLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDdEQsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLEdBQUcsZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQztJQUVELHVEQUFzQixHQUF0QjtRQUVFLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTNDLG9DQUFvQztZQUNwQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUvQyxFQUFFLENBQUMsQ0FBRSxDQUFDLFNBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBRWpCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBRTFCLENBQUM7UUFFSCxDQUFDO0lBRUgsQ0FBQztJQUVELDZDQUFZLEdBQVo7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELHNEQUFxQixHQUFyQjtRQUVFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRTVCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRTlCLDREQUE0RDtRQUM1RCxpRUFBaUU7UUFDakUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBQ3pELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLDZCQUE2QjtRQUc1Riw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdkMsb0VBQW9FO1FBQ3BFLHdEQUF3RDtRQUN4RCxxREFBcUQ7UUFDckQsbURBQW1EO1FBQ25ELG9EQUFvRDtRQUNwRCw0Q0FBNEM7UUFDNUMsZ0RBQWdEO1FBRWhELG1GQUFtRjtRQUNuRixFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDN0MsbUJBQW1CO1lBQ25CLDRCQUE0QjtZQUM1QixLQUFLO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFLbkMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDaEosSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVoRCxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUssQ0FBQyxDQUFDLENBQUM7WUFFcEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO1lBRVIsQ0FBQztRQUVILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLHVGQUF1RjtZQUN2RixFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNyRyxDQUFDO1FBRUgsQ0FBQztRQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBRTNCLENBQUM7SUFFRCxxREFBb0IsR0FBcEI7UUFDRSwwQkFBMEI7UUFDMUIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTdCLDhCQUE4QjtRQUM5QixFQUFFLENBQUMsQ0FBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzQixrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFFNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6QixnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQztRQUVELDBGQUEwRjtRQUMxRixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsaURBQWdCLEdBQWhCO1FBQUEsaUJBbUJDO1FBakJDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWhDLEVBQUUsQ0FBQyxDQUFFLGVBQUssQ0FBQyxVQUFVLElBQUksZUFBSyxDQUFDLEdBQUcsQ0FBQyxNQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTNDLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7Z0JBQzdDLENBQUMsRUFBRSxDQUFDO2dCQUNKLE9BQU8sRUFBRSxDQUFDO2dCQUNWLENBQUMsRUFBRSxJQUFJO2dCQUNQLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTztnQkFDbkIsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsVUFBVSxFQUFFO29CQUNWLG1DQUFtQztvQkFDbkMsS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pDLENBQUM7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDO0lBRUgsQ0FBQztJQUVELHFDQUFJLEdBQUo7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBRSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFcEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRXJELDhCQUE4QjtZQUM5QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0F6S0EsQUF5S0MsSUFBQTtBQUVELElBQUksYUFBYSxHQUFHLElBQUksc0JBQXNCLEVBQUUsQ0FBQztBQUVqRDtrQkFBZSxhQUFhLENBQUM7Ozs7QUNqTDdCLElBQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNqQjtJQU1FO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELHlDQUFVLEdBQVYsVUFBWSxLQUFLLEVBQUUsRUFBRTtRQUVuQixvQkFBb0I7UUFDcEIsSUFBSSxRQUFRLEdBQUcsdUJBQXVCLEdBQUcsS0FBSyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXhCLGdDQUFnQztRQUNoQyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFFLEtBQUssRUFBRSxFQUFFO1lBRXZCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsQ0FBQztRQUVyQyxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBQUEsaUJBNEJDO1FBMUJDLG9FQUFvRTtRQUNwRSxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBRTVCLDBCQUEwQjtZQUMxQixLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFFLEtBQUssRUFBRSxFQUFFO2dCQUVoQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRWxCLGlCQUFpQjtnQkFDakIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUN0QyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFDaEMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRTNDLDRCQUE0QjtnQkFDNUIsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUVyQyxvQ0FBb0M7Z0JBQ3BDLEVBQUUsQ0FBQyxDQUFFLEtBQUksQ0FBQyxhQUFhLEtBQUssTUFBTyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzdCLEtBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO2dCQUM5QixDQUFDO1lBRUgsQ0FBQyxDQUFDLENBQUM7UUFFTCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQsbUNBQUksR0FBSjtRQUFBLGlCQTBDQztRQXhDQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFakMscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDaEMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRTlCLDRCQUE0QjtZQUM1QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDM0MsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFakUsNEJBQTRCO1lBQzVCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNsQyxLQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztZQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUUvQixDQUFDLENBQUMsQ0FBQztRQUVILGdCQUFnQjtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFFLEtBQUssRUFBRSxFQUFFO1lBRWhDLGdCQUFnQjtZQUNoQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFFakIsZ0RBQWdEO1lBQ2hELENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBRSxDQUFDO2dCQUU5QixRQUFRO2dCQUNSLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUM7Z0JBQzVCLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzVDLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hELElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDckMsS0FBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7Z0JBQzVCLFlBQVksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRS9ELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCx3QkFBd0I7UUFDeEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUgsMkJBQUM7QUFBRCxDQXBHQSxBQW9HQyxJQUFBO0FBRUQsSUFBTSxZQUFZLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO0FBRWhEO2tCQUFlLFlBQVksQ0FBQzs7OztBQ3hHNUIsSUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBRWpCLCtCQUErQjtBQUMvQixzQkFBc0I7QUFDdEIsSUFBSTtBQUNKLG9DQUFvQztBQUVwQztJQTBFRTtRQTFFRixpQkFxR0M7UUE5RlMsb0JBQWUsR0FBRyxVQUFFLEdBQWlCO1lBQzNDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUViLEdBQUcsQ0FBQyxDQUFFLElBQUksR0FBRyxJQUFJLEdBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUUsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO1lBQ0gsQ0FBQztZQUVELE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdkIsQ0FBQyxDQUFDO1FBQ00scUJBQWdCLEdBQUc7WUFDekIscUVBQXFFO1lBQ3JFLElBQUksY0FBYyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7WUFFckMsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXRCLEVBQUUsQ0FBQyxDQUFFLGNBQWMsS0FBSyxLQUFJLENBQUMsVUFBVyxDQUFDLENBQUMsQ0FBQztnQkFFekMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUNILENBQUMsQ0FBQztRQUNNLG1CQUFjLEdBQUc7WUFDdkIsMEJBQTBCO1lBQzFCLElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDeEMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBRSxTQUFTLENBQUUsQ0FBQztZQUV4RCxLQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDO1FBQ00sb0JBQWUsR0FBRztZQUN4QixLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdkMsQ0FBQyxDQUFDO1FBcUNBLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUc7WUFDVCxNQUFNLEVBQUUsR0FBRztZQUNYLE1BQU0sRUFBRSxHQUFHO1lBQ1gsTUFBTSxFQUFFLEdBQUc7WUFDWCxPQUFPLEVBQUUsSUFBSTtZQUNiLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBOUNELG9DQUFTLEdBQVQsVUFBVyxLQUFhO1FBQ3RCLDBCQUEwQjtRQUMxQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsdUNBQVksR0FBWjtRQUNFLEVBQUUsQ0FBQyxDQUFFLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQ2xFLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTztZQUMvRSxVQUFVLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFFZixFQUFFLENBQUMsQ0FBRSxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDO1lBRWhCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2xCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELG9DQUFTLEdBQVQsVUFBVyxJQUFZLEVBQUUsS0FBYyxFQUFFLElBQWE7UUFFcEQsbUVBQW1FO1FBRW5FLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFFbkIsR0FBRyxDQUFDLENBQUUsSUFBSSxJQUFJLElBQUksS0FBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUUsSUFBSSxDQUFFLEtBQUssS0FBTSxDQUFDO2dCQUFDLFFBQVEsQ0FBQztZQUN4QyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFFLElBQUksQ0FBRSxHQUFHLEdBQUcsQ0FBQztRQUMvQyxDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDM0QsQ0FBQztJQWdCRCwrQkFBSSxHQUFKO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRWhDLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZELDhDQUE4QztRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxELENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQXJHQSxBQXFHQyxJQUFBO0FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0FBRW5DO2tCQUFlLEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuIFJlZiBwYXRoIGlzIG5vdCBuZWVkZWQgZm9yIHNvbWUgcmVhc29uXG4gPHJlZmVyZW5jZSBwYXRoPVwiL1VzZXJzL3lvc2VtZXRpZS9Ecm9wYm94L2RldmVsb3BtZW50L3Zob3N0cy93d3cubHluZGFzY29yZS5kZXYvd3AtY29udGVudC90aGVtZXMvbmVhdC90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbiAqL1xuXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBOYXYgZnJvbSBcIi4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL25hdmlnYXRpb24vY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCBTdmdIZWFkZXIgZnJvbSBcIi4vcGFydGlhbHMvaGVhZGVyLXN2Z1wiO1xuLy8gaW1wb3J0IFNtb290aFN0YXRlIGZyb20gXCIuL3BhcnRpYWxzL3Ntb290aFN0YXRlXCI7XG5pbXBvcnQgSW1hZ2VMb2FkZXIgZnJvbSBcIi4vcGFydGlhbHMvaW1hZ2VMb2FkZXJcIjtcbmltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyXCI7XG5pbXBvcnQgQW5pbWF0aW9uQ29udHJvbGxlciBmcm9tIFwiLi9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uXCI7XG5pbXBvcnQgSXNvdG9wZUdhbGxlcnkgZnJvbSBcIi4vcGFydGlhbHMvZ2FsbGVyeS1pc290b3BlXCI7XG5pbXBvcnQgSGVhZGVyU2xpZGVyIGZyb20gXCIuL3BhcnRpYWxzL2hlYWRlci1zbGlkZXJcIjtcbmltcG9ydCBTaG93Y2FzZVNsaWRlciBmcm9tIFwiLi9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXJcIjtcbmltcG9ydCBUZXN0aW1vbmlhbHMgZnJvbSBcIi4vcGFydGlhbHMvdGVzdGltb25pYWxzXCI7XG5pbXBvcnQgUXVvdGVCdWlsZGVyIGZyb20gXCIuL3BhcnRpYWxzL3F1b3RlLWJ1aWxkZXJcIjtcbi8vIGltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3NlcnZpY2Utc2lkZWJhclwiO1xuY29uc3QgJCA9IGpRdWVyeTtcbmRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG4vLyBkZWNsYXJlIHZhciByZXZhcGkxOiBhbnk7XG5cbihmdW5jdGlvbiAoKSB7XG4gIGNsYXNzIEFwcCB7XG5cbiAgICBpbml0KCk6IHZvaWQge1xuICAgICAgY29uc29sZS5sb2coXCJBcHAgbG9hZGVkXCIpO1xuICAgICAgU3ZnSGVhZGVyLmluaXQoKTtcbiAgICAgIFV0aWxzLmluaXQoKTtcbiAgICAgIE5hdi5pbml0KCk7XG4gICAgICBTZWFyY2guaW5pdCgpO1xuICAgICAgU3RpY2t5U2lkZWJhci5pbml0KCk7XG4gICAgICBUZXN0aW1vbmlhbHMuaW5pdCgpO1xuICAgICAgUXVvdGVCdWlsZGVyLmluaXQoKTtcbiAgICAgIEFuaW1hdGlvbkNvbnRyb2xsZXIuaW5pdCgpOyAvLyBHbG9iYWwgd2luZG93IGFuaW0gYW5kIGNsaWNrIGNvbnRyb2xcblxuICAgIH1cbiAgfVxuXG4gIGxldCBib290c3RyYXAgPSBuZXcgQXBwKCk7XG5cbiAgLyoqIHJ1biBhbGwgZnVuY3Rpb25zICovXG4gICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBib290c3RyYXAuaW5pdCgpO1xuICAgIEltYWdlTG9hZGVyLmluaXQoKTtcbiAgICAvLyBTbW9vdGhTdGF0ZS5pbml0KFwiXCIpO1xuICB9KTtcblxuICAvLyBCaW5kIGV2ZW50cyB0byB0aGUgaW1hZ2VzTG9hZGVkIHBsdWdpbiBoZXJlXG4gICQoZG9jdW1lbnQpLm9uKFwiaW1nTG9hZGVkXCIsIGZ1bmN0aW9uICggZSApIHtcbiAgICBjb25zb2xlLmxvZyhcImltYWdlIGxvYWRlZCBjdXN0b20gZXZlbnRcIik7XG4gICAgLy8gY2hlY2sgaWYgcGFnZSBoYXMgZ2FsbGVyeVxuICAgIGlmICggJChcIi5nYWxsZXJ5LWNvbnRhaW5lclwiKS5sZW5ndGggPiAwICkge1xuICAgICAgSXNvdG9wZUdhbGxlcnkuaW5pdCgpO1xuICAgIH1cbiAgICBIZWFkZXJTbGlkZXIuaW5pdCgpO1xuICAgIFNob3djYXNlU2xpZGVyLmluaXQoKTtcblxuICB9KTtcblxufSkoKTsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi8uLi9wYXJ0aWFscy91dGlsc1wiO1xuXG5jbGFzcyBTZWFyY2hDb21wb25lbnQge1xuICAkc2VhcmNoVHJpZ2dlcjogSlF1ZXJ5O1xuICAkc2VhcmNoQ2xvc2VUcmlnZ2VyOiBKUXVlcnk7XG4gICRzZWFyY2hGb3JtOiBKUXVlcnk7XG4gICRzZWFyY2hCdXR0b25BcmVhOiBKUXVlcnk7XG4gICRpY29uOiBKUXVlcnk7XG4gICRmb3JtOiBKUXVlcnk7XG4gICRpbnB1dDogSlF1ZXJ5O1xuICAkd2lkdGg6IG51bWJlcjtcbiAgJGhlaWdodDogbnVtYmVyO1xuICBpc09wZW46IGJvb2xlYW47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyID0gJChcIi5tZXRhLXNlYXJjaC10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciA9ICQoXCIuc3VwZXItc2VhcmNoLWNsb3NlXCIpO1xuICAgIHRoaXMuJHNlYXJjaEZvcm0gPSAkKFwiLnN1cGVyLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRzZWFyY2hCdXR0b25BcmVhID0gJChcIi5tZXRhLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRpY29uID0gdGhpcy4kc2VhcmNoVHJpZ2dlci5jaGlsZHJlbihcImlcIik7XG4gICAgdGhpcy4kZm9ybSA9IHRoaXMuJHNlYXJjaEZvcm0uZmluZChcIi5uZWF0LXNlYXJjaFwiKTtcbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGZvcm0uZmlyc3QoKTtcbiAgICB0aGlzLiR3aWR0aCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgICB0aGlzLiRoZWlnaHQgPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLmhlaWdodCgpO1xuICB9XG5cbiAgcmVsb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIFJlbG9hZFwiKTtcbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyID0gJChcIi5tZXRhLXNlYXJjaC10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciA9ICQoXCIuc3VwZXItc2VhcmNoLWNsb3NlXCIpO1xuICAgIHRoaXMuJHNlYXJjaEZvcm0gPSAkKFwiLnN1cGVyLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRzZWFyY2hCdXR0b25BcmVhID0gJChcIi5tZXRhLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRpY29uID0gdGhpcy4kc2VhcmNoVHJpZ2dlci5jaGlsZHJlbihcImlcIik7XG4gICAgdGhpcy4kZm9ybSA9ICQoXCIubmVhdC1zZWFyY2hcIik7XG4gICAgdGhpcy4kd2lkdGggPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gICAgdGhpcy4kaGVpZ2h0ID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS5oZWlnaHQoKTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gIH1cblxuICBnZXRUb3BQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgfVxuXG4gIGdldExlZnRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9mZnNldCgpLmxlZnQ7XG4gIH1cblxuICBjbG9zZVNlYXJjaCggZXZlbnQgKSB7XG5cbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG4gICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIsIC4yLCB7XG4gICAgICB0b3A6IFwiNSVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kZm9ybSwgLjQsIHtcbiAgICAgIHRvcDogXCIyNSVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgICAgZWFzZTogRXhwby5lYXNlSW5PdXRcbiAgICB9KTtcblxuICAgIGFuaW1hdGlvbi50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogdGhpcy5nZXRMZWZ0UG9zaXRpb24oKSxcbiAgICAgIHRvcDogdGhpcy5nZXRUb3BQb3NpdGlvbigpLFxuICAgICAgd2lkdGg6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgZGVsYXk6IC4zLFxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgd2lkdGg6IFwiMTAwJVwiXG4gICAgICAgIH0pO1xuICAgICAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgICAgICB0b3A6IFwiNTAlXCIsXG4gICAgICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSkudG8odGhpcy4kc2VhcmNoRm9ybSwgLjQsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgICAgICBcInotaW5kZXhcIjogLTEsXG4gICAgICAgICAgXCJsZWZ0XCI6IDAsXG4gICAgICAgICAgXCJ0b3BcIjogMCxcbiAgICAgICAgICBcIndpZHRoXCI6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgICBcImhlaWdodFwiOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgfVxuXG4gIG9wZW5TZWFyY2goZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgLy8gcHJldmVudCBidXR0b24gZnJvbSBiZWluZyB1c2VkIG9uY2Ugc2VhcmNoIGlzIG9wZW5cbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyLmJsdXIoKTtcblxuICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgIGxlZnQ6IHRoaXMuZ2V0TGVmdFBvc2l0aW9uKCksXG4gICAgICB0b3A6IHRoaXMuZ2V0VG9wUG9zaXRpb24oKSxcbiAgICAgIHdpZHRoOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIFwiei1pbmRleFwiOiA5OTlcbiAgICB9KTtcblxuICAgIGxldCBhbmltYXRpb24gPSBuZXcgVGltZWxpbmVMaXRlKCk7XG5cbiAgICBhbmltYXRpb24udG8odGhpcy4kc2VhcmNoRm9ybSwgLjIsIHtcbiAgICAgIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjJcbiAgICB9KS50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgYmFja2dyb3VuZDogXCIjMzUzNzNEXCIsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgb3ZlcmZsb3dZOiBcInNjcm9sbFwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGljb24sIC4yLCB7XG4gICAgICB0b3A6IFwiMTEwJVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyLCAuMywge1xuICAgICAgdG9wOiBcIjMlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjIwJVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjQsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIGxvYWRlZFwiKTtcbiAgICAvLyB0aGlzLm9wZW5TZWFyY2goKTtcbiAgICB0aGlzLiRpbnB1dC5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIC8vIGlmIGtleSBpcyBlbnRlciAtIGFuaW1hdGUgb3V0XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gICAgXG4gICAgJChcImJvZHlcIikua2V5dXAoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAyNyAmJiB0aGlzLmlzT3BlbiApIHtcbiAgICAgICAgdGhpcy5jbG9zZVNlYXJjaChldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubGV0IFNlYXJjaEJveCA9IG5ldyBTZWFyY2hDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQm94OyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQgU2VhcmNoQm94IGZyb20gXCIuL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5cbmludGVyZmFjZSBOYXZTdGF0ZSB7XG4gIG5hdkVuYWJsZWQ6IGJvb2xlYW47XG4gIG1vYmlsZTogYm9vbGVhbjtcbiAgdGFibGV0OiBib29sZWFuO1xuICBsYXB0b3A6IGJvb2xlYW47XG4gIGRlc2t0b3A6IGJvb2xlYW47XG59XG5cbmNsYXNzIE5hdkNvbXBvbmVudCB7XG4gICRuYXZUcmlnZ2VyOiBIVE1MRWxlbWVudDtcbiAgJG5hdkRyb3Bkb3duOiBIVE1MRWxlbWVudDtcbiAgJGxvd2VyQ29udGFpbmVyOiBKUXVlcnk7XG4gICR1cHBlckNvbnRhaW5lcjogSlF1ZXJ5O1xuICAkbmF2TWV0YTogSlF1ZXJ5O1xuICAkZHJvcERvd25XcmFwcGVyOiBKUXVlcnk7XG4gICRzZWFyY2g6IEpRdWVyeTtcbiAgJGRyb3BEb3duQ29udGVudDogSlF1ZXJ5O1xuXG4gIHN0YXRlOiBOYXZTdGF0ZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuJG5hdlRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZWF0LWRyb3Bkb3duLXRyaWdnZXJcIik7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIgPSAkKFwiLmxvd2VyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyID0gJChcIi51cHBlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiRuYXZNZXRhID0gJChcIi5uZWF0LW5hdi1tZXRhXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlciA9ICQoXCIubmVhdC1kcm9wZG93bi13cmFwcGVyXCIpO1xuICAgIHRoaXMuJHNlYXJjaCA9ICQoXCIjbmF2LXhmZXJcIik7XG4gICAgdGhpcy4kZHJvcERvd25Db250ZW50ID0gJChcIi5uZWF0LWRyb3Bkb3duLWNvbnRlbnRcIik7XG5cbiAgICAvKlxuICAgICBOYXYgU3RhdGUgT2JqZWN0XG4gICAgICovXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgZGVza3RvcDogZmFsc2VcbiAgICB9O1xuICB9XG5cblxuICAvLyBOb3QgdXNlZFxuICByZWxvYWQoKSB7XG5cbiAgICB0aGlzLiRuYXZUcmlnZ2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXYtdHJpZ2dlclwiKTtcbiAgICB0aGlzLiRuYXZEcm9wZG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmVhdC1kcm9wZG93bi10cmlnZ2VyXCIpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyID0gJChcIi5sb3dlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lciA9ICQoXCIudXBwZXJjb250YWluZXJcIik7XG4gICAgdGhpcy4kbmF2TWV0YSA9ICQoXCIubmVhdC1uYXYtbWV0YVwiKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIgPSAkKFwiLm5lYXQtZHJvcGRvd24td3JhcHBlclwiKTtcbiAgICB0aGlzLiRzZWFyY2ggPSAkKFwiI25hdi14ZmVyXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duQ29udGVudCA9ICQoXCIubmVhdC1kcm9wZG93bi1jb250ZW50XCIpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgZGVza3RvcDogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuXG4gIC8qXG4gICBNb2JpbGUgTmF2IGZ1bmN0aW9uYWxpdHlcbiAgICovXG4gIG9wZW5OYXYoIGV2ZW50OiBFdmVudCApOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJCh0aGlzLiRuYXZEcm9wZG93bikuYWRkQ2xhc3MoXCJtZW51LWlzLWFjdGl2ZVwiKTtcbiAgICBUd2Vlbk1heC50byh0aGlzLiRuYXZEcm9wZG93biwgLjMsIHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGNsb3NlTmF2KCBldmVudDogRXZlbnQgKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKHRoaXMuJG5hdkRyb3Bkb3duKS5yZW1vdmVDbGFzcyhcIm1lbnUtaXMtYWN0aXZlXCIpO1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuJG5hdkRyb3Bkb3duLCAuMywge1xuICAgICAgICB0b3A6IFwiLTEwMCVcIixcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5hdk9wZW5Jbml0KCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQodGhpcy4kbmF2VHJpZ2dlcikub24oXCJjbGlja1wiLCB0aGlzLm9wZW5OYXYuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcy4kbmF2VHJpZ2dlcikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBuYXZDbG9zZSggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcblxuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQoXCIjbmF2LWNsb3NlXCIpLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZU5hdi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNuYXYtY2xvc2VcIikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBuYXZJdGVtQ2xpY2soIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikuY2hpbGRyZW4oXCJhXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZWN0ZWQubmV4dChcInVsXCIpLnJlbW92ZUNsYXNzKFwiaXMtaGlkZGVuXCIpLnBhcmVudChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLnBhcmVudChcInVsXCIpLmFkZENsYXNzKFwibW92ZS1vdXRcIik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKFwiYVwiKS5vZmYoKTtcbiAgICB9XG5cbiAgfVxuXG4gIGdvYmFjayggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcblxuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQoXCIuZ28tYmFjayA+IGFcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAkKHRoaXMpO1xuICAgICAgICBzZWxlY3RlZC5wYXJlbnQoXCJsaVwiKS5wYXJlbnQoXCIubmVhdC1zZWNvbmRhcnktZHJvcGRvd25cIikuYWRkQ2xhc3MoXCJpcy1oaWRkZW5cIikucGFyZW50KFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikucGFyZW50KFwidWxcIikucmVtb3ZlQ2xhc3MoXCJtb3ZlLW91dFwiKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiLmdvLWJhY2sgPiBhXCIpLm9mZigpO1xuICAgIH1cblxuXG4gIH1cblxuICBtb3ZlTmF2aWdhdGlvbk1vYmlsZSgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiBtb2JpbGVcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guZGV0YWNoKCk7XG4gICAgdGhpcy4kbmF2TWV0YS5kZXRhY2goKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lci5kZXRhY2goKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIuZGV0YWNoKCk7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIuaW5zZXJ0QWZ0ZXIodGhpcy4kdXBwZXJDb250YWluZXIpO1xuICAgIHRoaXMuJG5hdk1ldGEuaW5zZXJ0QmVmb3JlKHRoaXMuJHVwcGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lci5hcHBlbmQodGhpcy4kZHJvcERvd25XcmFwcGVyKTtcbiAgICB0aGlzLiRuYXZNZXRhLmFwcGVuZCh0aGlzLiRzZWFyY2gpO1xuICB9XG5cbiAgbW92ZU5hdmlnYXRpb25UYWJsZXQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJtb3ZlIG5hdmlnYXRpb24gdGFibGV0XCIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLmRldGFjaCgpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyLmRldGFjaCgpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRuYXZNZXRhKTtcbiAgICAvLyB0aGlzLiR1cHBlckNvbnRhaW5lci5hcHBlbmQodGhpcy4kbG93ZXJDb250YWluZXIpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlci5pbnNlcnRBZnRlcih0aGlzLiR1cHBlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyLnByZXBlbmQodGhpcy4kc2VhcmNoKTtcbiAgfVxuXG4gIG1vdmVOYXZpZ2F0aW9uRGVrc3RvcCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiBkZXNrdG9wXCIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLmluc2VydEJlZm9yZSh0aGlzLiRkcm9wRG93bkNvbnRlbnQpO1xuXG4gIH1cblxuICBkaXNhYmxlTW9iaWxlTmF2KCkge1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJOYXYgdHVybmVkIG9mZlwiKTtcbiAgICB0aGlzLm5hdk9wZW5Jbml0KGZhbHNlKTtcbiAgICB0aGlzLm5hdkNsb3NlKGZhbHNlKTtcbiAgICB0aGlzLm5hdkl0ZW1DbGljayhmYWxzZSk7XG4gICAgdGhpcy5nb2JhY2soZmFsc2UpO1xuICAgIHRoaXMuc3RhdGUubmF2RW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgLypcbiAgICAgUmVtb3ZlIFN0eWxlcyBmcm9tIGVsZW1lbnQgJiByZXNldCBkcm9wZG93blxuICAgICAqL1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duQ29udGVudC5yZW1vdmVDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgIGxldCBkcm9wZG93biA9IHRoaXMuJGRyb3BEb3duQ29udGVudC5maW5kKFwiLm5lYXQtc2Vjb25kYXJ5LWRyb3Bkb3duXCIpO1xuXG4gICAgZHJvcGRvd24uZWFjaCggKGluZGV4LCBlbGVtKSA9PiB7XG4gICAgICBpZiAoICEkKGVsZW0pLmhhc0NsYXNzKFwiaXMtaGlkZGVuXCIpICkge1xuICAgICAgICAkKGVsZW0pLmFkZENsYXNzKFwiaXMtaGlkZGVuXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBlbmFibGVNb2JpbGVOYXYoKSB7XG4gICAgY29uc29sZS5sb2coXCJOYXYgdHVybmVkIG9uXCIpO1xuICAgIHRoaXMubmF2T3BlbkluaXQodHJ1ZSk7XG4gICAgdGhpcy5uYXZDbG9zZSh0cnVlKTtcbiAgICB0aGlzLm5hdkl0ZW1DbGljayh0cnVlKTtcbiAgICB0aGlzLmdvYmFjayh0cnVlKTtcblxuICAgIHRoaXMuc3RhdGUubmF2RW5hYmxlZCA9IHRydWU7XG5cbiAgfVxuXG4gIGJyZWFrUG9pbnRNb2JpbGUoKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IE1vYmlsZVwiKTtcblxuICAgIGlmICggIXRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZW5hYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuICAgIHRoaXMubW92ZU5hdmlnYXRpb25Nb2JpbGUoKTtcbiAgfVxuXG4gIGJyZWFrUG9pbnRUYWJsZXQoIHByZXZTdGF0ZSApIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgVGFibGV0XCIpO1xuICAgIGlmICggIXRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZW5hYmxlTW9iaWxlTmF2KCk7XG4gICAgfVxuXG4gICAgdGhpcy5tb3ZlTmF2aWdhdGlvblRhYmxldCgpO1xuICB9XG5cbiAgYnJlYWtQb2ludExhcHRvcCggcHJldlN0YXRlICkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBMYXB0b3BcIik7XG5cbiAgICBpZiAoIHRoaXMuc3RhdGUubmF2RW5hYmxlZCApIHtcbiAgICAgIHRoaXMuZGlzYWJsZU1vYmlsZU5hdigpO1xuICAgIH1cblxuICAgIC8vIGlmIHByZXYgc3RhdGUgd2FzIHRhYmxldCBkbyB0aGlzOlxuICAgIGlmICggcHJldlN0YXRlLmRlc2t0b3AgPT09IGZhbHNlIHx8IHByZXZTdGF0ZS5tb2JpbGUgPT09IHRydWUgKSB7XG5cbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25UYWJsZXQoKTtcbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25EZWtzdG9wKCk7XG4gICAgfVxuICB9XG5cbiAgYnJlYWtQb2ludERlc2t0b3AoIHByZXZTdGF0ZSApIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgRGVza3RvcFwiKTtcblxuICAgIGlmICggcHJldlN0YXRlLmxhcHRvcCA9PT0gZmFsc2UgfHwgcHJldlN0YXRlLm1vYmlsZSA9PT0gdHJ1ZSApIHtcblxuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvblRhYmxldCgpO1xuICAgICAgdGhpcy5tb3ZlTmF2aWdhdGlvbkRla3N0b3AoKTtcbiAgICB9XG5cbiAgfVxuXG4gIG5hdlJlc2l6ZSgpIHtcbiAgICAvKlxuICAgICBNb2JpbGVcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5tb2JpbGUgKSB7XG5cbiAgICAgIGlmICggIXRoaXMuc3RhdGUubW9iaWxlICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRNb2JpbGUoKTtcbiAgICAgIH1cbiAgICAgIC8vIFR1cm4gbW9iaWxlIG9uXG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogdHJ1ZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgVGFibGV0XG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAvLyB0YWJsZXQgYW5kIGhpZ2hlclxuICAgICAgLy8gZG8gb25jZVxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludFRhYmxldChwcmV2U3RhdGUpO1xuICAgICAgfVxuICAgICAgLy8gVHVybiBtb2JpbGUgb25cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiB0cnVlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBMYXB0b3BcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIGlmICggIXRoaXMuc3RhdGUubGFwdG9wICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRMYXB0b3AocHJldlN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogdHJ1ZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICBEZXNrdG9wXG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMuZGVza3RvcCApIHtcblxuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgIGlmICggIXRoaXMuc3RhdGUuZGVza3RvcCApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50RGVza3RvcChwcmV2U3RhdGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBuYXZMb2FkKCkge1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLm1vYmlsZSApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50TW9iaWxlKCk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IHRydWUsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuXG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMudGFibGV0ICkge1xuXG4gICAgICB0aGlzLmJyZWFrUG9pbnRUYWJsZXQodGhpcy5zdGF0ZSk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiB0cnVlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IHRydWUsXG4gICAgICAgIGxhcHRvcDogZmFsc2UsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50TGFwdG9wKHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogdHJ1ZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMuZGVza3RvcCApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50RGVza3RvcCh0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJOYXYgbG9hZGVkXCIpO1xuXG4gICAgdGhpcy5uYXZMb2FkKCk7XG4gICAgLy8gU2VhcmNoQm94LmluaXQoKTtcblxuICAgIC8qKioqKioqKioqKioqKioqXG4gICAgIE5BViBSRVNJWkUgRVZFTlRcbiAgICAgKioqKioqKioqKioqKioqL1xuXG4gICAgd2luZG93Lm9ucmVzaXplID0gKCBldmVudCApID0+IHtcbiAgICAgICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgICAgPyBzZXRUaW1lb3V0KHRoaXMubmF2UmVzaXplLmJpbmQodGhpcyksIDMwMClcbiAgICAgICAgOiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubmF2UmVzaXplLmJpbmQodGhpcykpO1xuICAgIH07XG5cblxuICB9XG59XG5cbmxldCBOYXYgPSBuZXcgTmF2Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IE5hdjsiLCJjb25zdCAkID0galF1ZXJ5O1xuZGVjbGFyZSB2YXIgSXNvdG9wZTogYW55O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIEdhbGxlcnlDb21wb25lbnQge1xuXG4gIGdyaWRJZDogc3RyaW5nO1xuICBnYWxsZXJ5X2dyaWQ6IG51bWJlcjtcbiAgZ2FsbGVyeV93cmFwcGVyX3dpZHRoOiBudW1iZXI7XG4gICRmdWxsR3JpZDogSlF1ZXJ5O1xuICAkaXNvdG9wZUdhbGxlcnk6IEpRdWVyeTtcbiAgJGdhbGxlcnlDb250YWluZXI6IEpRdWVyeTtcbiAgJGdhbGxlcnlJdGVtOiBKUXVlcnk7XG4gICRmaWx0ZXI6IEpRdWVyeTtcbiAgJGdyaWQ6IGFueTtcbiAgY3VycmVudEhlaWdodDogc3RyaW5nO1xuICBjdXJyZW50SGVpZ2h0UFg6IG51bWJlcjtcbiAgcmVJc29UaW1lT3V0OiBudW1iZXI7XG4gIGlzQ29udGFpbmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ3JpZElkID0gJChcIi5pbm5lci1jb250ZW50LW1vZHVsZVwiKS5jaGlsZHJlbihcImRpdlwiKS5hdHRyKFwiaWRcIik7XG4gICAgdGhpcy4kZnVsbEdyaWQgPSAkKFwiI1wiICsgdGhpcy5ncmlkSWQpO1xuICAgIHRoaXMuJGdhbGxlcnlDb250YWluZXIgPSAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJGlzb3RvcGVHYWxsZXJ5ID0gJChcIi5nYWxsZXJ5LWlzb3RvcGVcIik7XG4gICAgdGhpcy4kZ2FsbGVyeUl0ZW0gPSAkKFwiLmdhbGxlcnktaXRlbVwiKTtcbiAgICB0aGlzLiRmaWx0ZXIgPSAkKFwiLmZpbHRlci1ncm91cFwiKTtcbiAgfVxuXG4gIHNldHVwSXNvdG9wZSgpIHtcbiAgICAvLyBpbml0IGlzb3RvcGVcbiAgICB0aGlzLiRncmlkID0gdGhpcy4kZnVsbEdyaWQuaXNvdG9wZSh7XG4gICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gICAgICBpdGVtU2VsZWN0b3I6IFwiLmdhbGxlcnktaXRlbVwiLFxuICAgICAgaXNJbml0TGF5b3V0OiBmYWxzZSxcbiAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgXCJjb2x1bW5XaWR0aFwiOiBcIi5ncmlkLXNpemVyXCJcbiAgICAgIH0sXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246IFwiLjNzXCJcbiAgICB9KTtcbiAgfVxuXG4gIGdhbGxlcnlJc290b3BlV3JhcHBlcigpIHtcbiAgICBsZXQgd2luZG93V2lkdGhSZWYgPSAkKHdpbmRvdykuaW5uZXJXaWR0aCgpOyAvLyBmb3Igc2Nyb2xsIGJhciBmaXggY3VycmVudGx5XG5cbiAgICAvLyBJcyBjb250YWluZXIgb3IgZnVsbCB3aWR0aD9cbiAgICBpZiAoIHRoaXMuJGdhbGxlcnlDb250YWluZXIuaGFzQ2xhc3MoXCJjb250YWluZXJcIikgKSB7XG4gICAgICB0aGlzLmlzQ29udGFpbmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvL1xuICAgIGlmICggd2luZG93V2lkdGhSZWYgPiAxNjAwICYmIHRoaXMuaXNDb250YWluZWQgPT09IGZhbHNlICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA1O1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDYwMCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMTtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSA5OTEgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDI7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gMTE5OSApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA0O1xuICAgIH1cblxuICAgIGlmICggJChcIi5nYWxsZXJ5LTMtZ3JpZFwiKS5sZW5ndGggPiAwICYmIHdpbmRvd1dpZHRoUmVmID4gMTI0OCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMztcbiAgICB9XG5cbiAgICBpZiAoICQoXCIuZ2FsbGVyeS00LWdyaWRcIikubGVuZ3RoID4gMCAmJiB3aW5kb3dXaWR0aFJlZiA+IDE1ODQgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDQ7XG4gICAgfVxuXG4gICAgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggPSAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLndpZHRoKCk7XG5cbiAgICBpZiAoIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICUgdGhpcy5nYWxsZXJ5X2dyaWQgPiAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggPSB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCArICggdGhpcy5nYWxsZXJ5X2dyaWQgLSB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCAlIHRoaXMuZ2FsbGVyeV9ncmlkKTtcbiAgICB9XG4gICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkuY3NzKFwid2lkdGhcIiwgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeV9ncmlkO1xuICB9XG5cbiAgcmVsb2FkSXNvdG9wZSgpIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoKTtcbiAgICB0aGlzLnNldE1pbkhlaWdodCgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBjaGVjayBpZiBoZWlnaHQgaXMgYSByb3VuZCBudW1iZXIgdG8gZW5zdXJlIG5vIDFweCBpc3N1ZXNcbiAgICAgIHRoaXMuY2hlY2tDb250YWluZXJIZWlnaHQoKTtcbiAgICB9LCA3MDApO1xuICB9XG5cbiAgc2V0TWluSGVpZ2h0KCkge1xuXG4gICAgbGV0IGl0ZW0gPSAkKFwiLmdhbGxlcnktaXRlbS53aWR0aDFcIik7XG5cbiAgICAvLyBTZXQgbWluIGhlaWdodCBkZXBlbmRpbmcgb25lIHdoYXQgY29udGVudCB3YXMgZmlsdGVyZWRcbiAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBpdGVtLmNzcyhcInBhZGRpbmctYm90dG9tXCIpO1xuICAgIGxldCBoZWlnaHRTdHIgPSB0aGlzLmN1cnJlbnRIZWlnaHQudG9TdHJpbmcoKTtcbiAgICB0aGlzLmN1cnJlbnRIZWlnaHRQWCA9IHRoaXMucHhDb252ZXJ0KGhlaWdodFN0cik7XG5cbiAgICBpZiAoIHRoaXMuY3VycmVudEhlaWdodFBYICE9PSAwICkge1xuXG4gICAgICB0aGlzLiRpc290b3BlR2FsbGVyeS5jc3MoXCJtaW4taGVpZ2h0XCIsIE1hdGgucm91bmQodGhpcy5jdXJyZW50SGVpZ2h0UFgpKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuY3VycmVudEhlaWdodFBYID0gaXRlbS5oZWlnaHQoKTtcblxuICAgICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkuY3NzKFwibWluLWhlaWdodFwiLCBNYXRoLnJvdW5kKHRoaXMuY3VycmVudEhlaWdodFBYKSk7XG5cbiAgICB9XG4gIH1cblxuICBweENvbnZlcnQoIG9iamVjdEhlaWdodDogc3RyaW5nICkge1xuICAgIHJldHVybiBwYXJzZUludChvYmplY3RIZWlnaHQuc2xpY2UoMCwgLTIpKTtcbiAgfVxuXG4gIGFkZEltYWdlVHJhbnNpdGlvbigpIHtcbiAgICAvLyBhZGQgdHJhbnNpdGlvbiBmb3IgaW50cm8gYW5pbWF0aW9uXG4gICAgdGhpcy4kZ2FsbGVyeUl0ZW0uY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIjYwMG1zXCIpO1xuICB9XG5cbiAgbG9hZEltYWdlc0luKCkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZShcIm9uY2VcIiwgXCJhcnJhbmdlQ29tcGxldGVcIiwgKCkgPT4ge1xuXG4gICAgICAvLyBmYWRlIGluXG4gICAgICB0aGlzLiRnYWxsZXJ5SXRlbS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgLy8gcmVtb3ZlIGFuaW1hdGlvbiBmb3Igc21vb3RoIGZpbHRlcmluZyBhZnRlciBpbWFnZXMgaGF2ZSBsb2FkZWQgaW5cbiAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgdGhpcy4kZ2FsbGVyeUl0ZW0uY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIjBtc1wiKTtcbiAgICAgIH0sIDUwMCk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrQ29udGFpbmVySGVpZ2h0KCkge1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuJGlzb3RvcGVHYWxsZXJ5Lmhhc0NsYXNzKFwid2lkdGgtY29udGFpbmVkXCIpKSB7XG5cbiAgICAgIGxldCBjdXJyZW50SGVpZ2h0ID0gdGhpcy4kaXNvdG9wZUdhbGxlcnkuaGVpZ2h0KCk7XG5cbiAgICAgIHRoaXMuJGlzb3RvcGVHYWxsZXJ5LmNzcyhcImhlaWdodFwiLCBjdXJyZW50SGVpZ2h0LTEgKyBcInB4XCIpO1xuXG4gICAgfVxuXG4gIH1cblxuICBvblJlc2l6ZSgpIHtcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlSXNvVGltZU91dCk7XG5cbiAgICAvLyBjaGVjayBpZiB0aGUgY29udGFpbmVyIGhhcyBpdGVtcyBpbnNpZGUgaXRcbiAgICBpZiAoIHRoaXMuJGdhbGxlcnlDb250YWluZXIubGVuZ3RoID4gMCApIHtcblxuICAgICAgLy8gc2V0IGdyaWQgZGltZW5zaW9uXG4gICAgICB0aGlzLmdhbGxlcnlJc290b3BlV3JhcHBlcigpO1xuXG4gICAgICAvLyBvbiByZXNpemUgY29tcGxldGUsIHJlLWFkanVzdCBncmlkXG4gICAgICB0aGlzLnJlSXNvVGltZU91dCA9IHNldFRpbWVvdXQodGhpcy5yZWxvYWRJc290b3BlLmJpbmQodGhpcyksIDUwMCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uRmlsdGVyQ2xpY2soIGVsLCBlbDIgKSB7XG4gICAgbGV0ICR0aGlzID0gJChlbDIudG9FbGVtZW50KTtcblxuICAgICR0aGlzLnBhcmVudCgpLmNoaWxkcmVuKFwibGlcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSk7XG5cbiAgICAkdGhpcy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgbGV0IGZpbHRlclZhbHVlID0gJHRoaXMuYXR0cihcImRhdGEtZmlsdGVyXCIpO1xuXG4gICAgdGhpcy5yZUZpbHRlcihmaWx0ZXJWYWx1ZSk7XG4gIH1cblxuICByZUZpbHRlciggaXRlbSApIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoe1xuICAgICAgZmlsdGVyOiBpdGVtXG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiSXNvdG9wZSBJbml0XCIpO1xuXG4gICAgLy8gQWRkIHRyYW5zaXRpb24gdG8gYW5pbWF0ZSBpbWFnZSBpbiBncmFjZWZ1bGx5XG4gICAgdGhpcy5hZGRJbWFnZVRyYW5zaXRpb24oKTtcblxuICAgIC8vIFNldHVwIElzb3RvcGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgdGhpcy5zZXR1cElzb3RvcGUoKTtcblxuICAgIC8vIENyZWF0ZSBwZXJmZWN0IGdyaWRcbiAgICB0aGlzLmdhbGxlcnlJc290b3BlV3JhcHBlcigpO1xuXG4gICAgLy8gZGVsYXkgaXNvdG9wZSBpbml0IHVzaW5nIGhlbHBlciBmdW5jdGlvbiB0aGF0IGZpcmVzIG9uIHJlc2l6ZVxuICAgIHNldFRpbWVvdXQodGhpcy5yZWxvYWRJc290b3BlLmJpbmQodGhpcyksIDEwMDApO1xuXG4gICAgLy8gQW5pbWF0ZSBJbWFnZXMgaW4gb25Mb2FkXG4gICAgdGhpcy5sb2FkSW1hZ2VzSW4oKTtcblxuICAgIC8vIEFkZCBmaWx0ZXIgb24gQ2xpY2tcbiAgICBsZXQgJHRoaXMgPSB0aGlzO1xuICAgIHRoaXMuJGZpbHRlci5vbihcImNsaWNrXCIsIFwibGlcIiwgdGhpcy5vbkZpbHRlckNsaWNrLmJpbmQodGhpcywgJHRoaXMpKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxubGV0IElzb3RvcGVHYWxsZXJ5ID0gbmV3IEdhbGxlcnlDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSXNvdG9wZUdhbGxlcnk7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTbGlkZXJDb21wb25lbnQge1xuICBnYWxsZXJ5OiBKUXVlcnk7XG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICBjbG9zZUJ0bjogSlF1ZXJ5O1xuICBuZXh0QnRuOiBKUXVlcnk7XG4gIHByZXZCdG46IEpRdWVyeTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgY3VycmVudFNsaWRlOiBudW1iZXI7XG4gIHRvdGFsU2xpZGU6IG51bWJlcjtcbiAgY291bnRUb3RhbDogSlF1ZXJ5O1xuICBjdXJyZW50Q291bnQ6IEpRdWVyeTtcbiAgc2xpZGVyT3BlbjogYm9vbGVhbjtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvciggZWwgKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKGVsKTtcbiAgICB0aGlzLmdhbGxlcnkgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmhlYWRlci1zbGlkZXItZ2FsbGVyeVwiKTtcbiAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5oZWFkZXItc2xpZGVyLWNsb3NlXCIpO1xuICAgIHRoaXMubmV4dEJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyLW5hdmlnYXRpb24tbmV4dFwiKTtcbiAgICB0aGlzLnByZXZCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNsaWRlci1uYXZpZ2F0aW9uLXByZXZcIik7XG4gICAgdGhpcy5jb3VudFRvdGFsID0gdGhpcy5jb250YWluZXIuZmluZChcIi50b3RhbFwiKTtcbiAgICB0aGlzLmN1cnJlbnRDb3VudCA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuY3VycmVudFwiKTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLmN1cnJlbnRTbGlkZSA9IHRoaXMuaW5kZXggKyAxO1xuICAgIHRoaXMuc2xpZGVyT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmdhbGxlcnkuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldFRvdGFsU2xpZGVzKCk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gdGhpcy5nYWxsZXJ5LmNoaWxkcmVuKFwibGlcIikubGVuZ3RoO1xuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNsaWRlO1xuICB9XG5cbiAgdXBkYXRlQ3VycmVudFNsaWRlKCBldmVudCApIHtcblxuICAgIGlmICggZXZlbnQgPT09IFwicmlnaHRcIiApIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZXgtLTtcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlLS07XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVOYXYoIGluZGV4OiBudW1iZXIsIHNlbGVjdGVkOiBKUXVlcnkgKSB7XG5cbiAgICAvLyB1cGRhdGUgbnVtYmVycyBvbiBzY3JlZW5cbiAgICB0aGlzLmN1cnJlbnRDb3VudC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICAgIC8vIEVuYWJsZS9EaXNhYmxlIGFycm93IGJ0bnNcbiAgICB0aGlzLnByZXZCdG4ucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmZpcnN0LWNoaWxkXCIpKTtcbiAgICB0aGlzLm5leHRCdG4ucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmxhc3QtY2hpbGRcIikpO1xuICB9XG5cbiAgdXBkYXRlU2xpZGUoIGRpcmVjdGlvbiApIHtcblxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTtcblxuICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAvLyByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGNsYXNzLCB0aGVuIG1vdmUgbGVmdFxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIikuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgY3VycmVudFNsaWRlLm5leHQoKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGNsYXNzLCB0aGVuIG1vdmUgbGVmdFxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBjdXJyZW50U2xpZGUucHJldigpLmFkZENsYXNzKFwic2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBpbmRleFxuICAgIHRoaXMudXBkYXRlQ3VycmVudFNsaWRlKGRpcmVjdGlvbik7XG5cbiAgICAvLyB1cGRhdGUgTmF2aWdhdGlvblxuICAgIHRoaXMudXBkYXRlTmF2KHRoaXMuaW5kZXgsIHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcbiAgfVxuXG4gIGFycm93SGFuZGxlciggZXZlbnQgKSB7XG5cbiAgICAvLyBjaGVjayB3aGljaCBrZXkgd2FzIHByZXNzZWQgYW5kIG1ha2Ugc3VyZSB0aGUgc2xpZGUgaXNuJ3QgdGhlIGJlZ2lubmluZyBvciB0aGUgbGFzdCBvbmVcbiAgICBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJyaWdodFwiICYmIHRoaXMuY3VycmVudFNsaWRlICE9PSB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG5cbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuc2xpZGVyT3BlbiApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA8PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwibGVmdFwiICYmIHRoaXMuY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCAmJiB0aGlzLnNsaWRlck9wZW4gKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA8PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgb3BlblNsaWRlciggZWwsIGV2ZW50ICkge1xuICAgIC8vIGVsID0gdGhpc1xuICAgIC8vIGVsMiBpcyBldmVudFxuICAgIGlmICggIXRoaXMuY29udGFpbmVyLmhhc0NsYXNzKFwiaXMtYWN0aXZlXCIpICYmICQoZXZlbnQuY3VycmVudFRhcmdldCkuaXModGhpcy5nYWxsZXJ5KSApIHtcblxuICAgICAgdGhpcy5zbGlkZXJPcGVuID0gdHJ1ZTtcblxuICAgICAgdGhpcy5jb250YWluZXJcbiAgICAgICAgLmFkZENsYXNzKFwiaXMtYWN0aXZlXCIpXG4gICAgICAgIC5vbmUoXG4gICAgICAgICAgXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIFwiICtcbiAgICAgICAgICBcIm90cmFuc2l0aW9uZW5kIFwiICtcbiAgICAgICAgICBcIm9UcmFuc2l0aW9uRW5kIFwiICtcbiAgICAgICAgICBcIm1zVHJhbnNpdGlvbkVuZCBcIiArXG4gICAgICAgICAgXCJ0cmFuc2l0aW9uZW5kXCIsICgpID0+IHtcblxuICAgICAgICAgICQoXCJib2R5LGh0bWxcIilcbiAgICAgICAgICAgIC5hbmltYXRlKHsgXCJzY3JvbGxUb3BcIjogdGhpcy5jb250YWluZXIub2Zmc2V0KCkudG9wIH0sIDIwMCk7XG5cbiAgICAgICAgICAvLyBDbG9zZSBCdG4gYW5pbWF0ZSBpblxuICAgICAgICAgIGxldCBjbG9zZUJ0bkFuaW1hdGlvbiA9IFR3ZWVuTWF4LnRvKHRoaXMuY2xvc2VCdG4sIC4zLCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgIHg6IC0zMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgICAgICAgIGRlbGF5OiAuM1xuICAgICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVNsaWRlciggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2xhc3MoXCJpcy1hY3RpdmVcIik7XG5cbiAgICB0aGlzLnNsaWRlck9wZW4gPSBmYWxzZTtcblxuICAgIFR3ZWVuTGl0ZVxuICAgICAgLnRvKCQod2luZG93KSwgLjUsXG4gICAgICAgIHtcbiAgICAgICAgICBzY3JvbGxUbzogeyB5OiAwIH0sIGVhc2U6IFBvd2VyMi5lYXNlT3V0LFxuICAgICAgICAgIGRlbGF5OiAuNVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgbGV0IGNsb3NlQnRuQW5pbWF0aW9uID0gVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB6OiAuMDAxLFxuICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgICAgICByaWdodDogNTBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5Lm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2xpZGVyLmJpbmQodGhpcywgJHRoaXMpKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdhbGxlcnkub2ZmKCk7XG4gICAgICAgIHRoaXMuY2xvc2VCdG4ub2ZmKCk7XG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgLy8gQ3JlYXRlIEJpbmRpbmcgRXZlbnRzXG4gICAgdGhpcy5jaGVja1NpemUoKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIExlZnQgYW5kIHJpZ2h0IGV2ZW50c1xuICAgIHRoaXMubmV4dEJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJyaWdodFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMucHJldkJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJsZWZ0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBKcXVlcnkga2V5cyBwbHVnaW5cbiAgICAkKGRvY3VtZW50KVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwibGVmdFwiLCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwiZXNjXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSlcbiAgICAgIC5iaW5kKFwia2V5ZG93blwiLCBcInJpZ2h0XCIsIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgLy8gdXBkYXRlIG5hdiBvbiBmaXJzdCBsb2FkXG4gICAgdGhpcy51cGRhdGVOYXYodGhpcy5pbmRleCwgdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRUb3RhbFNsaWRlcygpKSk7XG4gIH1cbn1cblxuLy8gbG9vcCB0aHJvdWdoIGVhY2ggaGVhZGVyIHNsaWRlciBvYmplY3Qgb24gdGhlIHBhZ2VcbmNsYXNzIEhlYWRlclNsaWRlckNvbXBvbmVudCB7XG5cbiAgaXRlbUluZm9XcmFwcGVyOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIgPSAkKFwiLmhlYWRlci1zbGlkZXItY29udGFpbmVyXCIpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkhlYWRlciBTbGlkZXIgaW5pdFwiKTtcblxuICAgIHRoaXMuaXRlbUluZm9XcmFwcGVyLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIC8vIFBhc3MgXCJ0aGlzXCIgdG8gZWFjaCBuZXcgSGVhZGVyIHNsaWRlciBjb21wb25lbnRcbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2xpZGVyQ29tcG9uZW50KGVsKTtcbiAgICAgIHNsaWRlci5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5sZXQgSGVhZGVyU2xpZGVyID0gbmV3IEhlYWRlclNsaWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJTbGlkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5cbmNsYXNzIFN2Z0hlYWRlckNvbXBvbmVudCB7XG4gIHN2ZzogSlF1ZXJ5O1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgd2luZG93OiBKUXVlcnk7XG4gIHdpbldpZHRoOiBudW1iZXI7XG4gIHByb3BvcnRpb246IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN2ZyA9ICQoXCIuZGl2aWRlci1zdmdcIik7XG4gICAgdGhpcy53aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy5wcm9wb3J0aW9uID0gMTg7XG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpbldpZHRoIC8gdGhpcy5wcm9wb3J0aW9uO1xuICB9XG5cbiAgX3NldFdpbmRvd1dpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuICQod2luZG93KS53aWR0aCgpO1xuICB9XG5cbiAgX3NldFN2Z0hlaWdodCgpOiBudW1iZXIge1xuICAgIGxldCBoZWlnaHQgPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpIC8gMTg7XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgcmVzaXplU3ZnKCkge1xuXG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9zZXRTdmdIZWlnaHQoKTtcblxuICAgIC8vIHNldCB3aWR0aCBvZiBpdGVtXG4gICAgLy8gdGhpcy5zdmcuYXR0cihcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuICAgIHRoaXMuc3ZnLmNzcyhcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuXG4gICAgLy8gc2V0IGhlaWdodCBwcm9wb3J0aW9uIG9mIDI4XG4gICAgdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zdmcuaGVpZ2h0KHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGFuaW1hdGVJbigpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFuaW1hdGUgSW5cIik7XG5cbiAgICB0aGlzLnN2ZyA9ICQoXCIuZGl2aWRlci1zdmdcIik7XG4gICAgdGhpcy5wcm9wb3J0aW9uID0gMTg7XG4gICAgdGhpcy53aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMud2luZG93LndpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpbldpZHRoIC8gdGhpcy5wcm9wb3J0aW9uO1xuXG4gICAgLy8gc2V0IHdpZHRoIG9mIGl0ZW1cbiAgICB0aGlzLnN2Zy5hdHRyKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG5cbiAgICAvLyBzZXQgaGVpZ2h0IHByb3BvcnRpb24gb2YgMjhcbiAgICB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN2Zy5oZWlnaHQodGhpcy5oZWlnaHQpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuc3ZnLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBib3R0b206IFwiLTNweFwiLFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlN2ZyBoZWFkZXIgbG9hZGVkXCIpO1xuXG4gICAgLy8gdGhpcy5zdmcuaGVpZ2h0KHRoaXMuX3NldFN2Z0hlaWdodCgpKTtcbiAgICAvLyB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuX3NldFN2Z0hlaWdodCgpKTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLnN2ZywgLjEsIHtcbiAgICAgIHk6IFwiM1wiLFxuICAgICAgejogXCIuMDAxXCIsXG4gICAgICB3aWR0aDogdGhpcy5fc2V0V2luZG93V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5fc2V0U3ZnSGVpZ2h0KCksXG4gICAgICBkZWxheTogMCxcbiAgICAgIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCJcbiAgICB9KTtcblxuXG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5yZXNpemVTdmcuYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgfVxufVxuXG5sZXQgU3ZnSGVhZGVyID0gbmV3IFN2Z0hlYWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdmdIZWFkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbi8vIFRPRE86IFNpZGViYXIgaW1hZ2UgbG9hZGluZ1xuY2xhc3MgSW1hZ2VMb2FkZXJDb21wb25lbnQge1xuICBhcnI6IHN0cmluZ1tdO1xuICBib2R5OiBKUXVlcnk7XG4gIGNvbnRlbnQ6IEpRdWVyeTtcbiAgaGVybzogSlF1ZXJ5O1xuICBoYXNIZXJvOiBudW1iZXI7XG4gIGJnSW1hZ2U6IEpRdWVyeTtcbiAgaGFzQmdJbWFnZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYXJyID0gW107XG4gICAgdGhpcy5ib2R5ID0gJChcImJvZHlcIik7XG4gICAgdGhpcy5jb250ZW50ID0gJChcIiNjb250ZW50XCIpO1xuICAgIHRoaXMuaGVybyA9ICQoXCIuaGVyb1wiKTtcbiAgICB0aGlzLmhhc0hlcm8gPSB0aGlzLmhlcm8ubGVuZ3RoO1xuICAgIHRoaXMuYmdJbWFnZSA9ICQoXCIuaW1nLWxvYWRlci1iZ1wiKTtcbiAgICB0aGlzLmhhc0JnSW1hZ2UgPSB0aGlzLmJnSW1hZ2UubGVuZ3RoO1xuICB9XG5cbiAgYW5pbWF0ZUJsb2dQcmltYXJ5KCk6IHZvaWQge1xuICAgIGxldCBibG9nUHJpbWFyeSA9ICQoXCIucHJpbWFyeVwiKTtcbiAgICBsZXQgYmxvZ0JnSW1hZ2UgPSBibG9nUHJpbWFyeS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuXG4gICAgaWYgKCBibG9nQmdJbWFnZSAhPT0gXCJub25lXCIgKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBUd2VlbkxpdGVcbiAgICAgICAgICAudG8oYmxvZ1ByaW1hcnksIC4zLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB6OiBcIi4wMDFcIixcbiAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgfSwgMzAwKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZW1vdmVcbiAgLy8gYW5pbWF0ZUhlcm9IZWFkZXIoKTogdm9pZCB7XG4gIC8vICAgbGV0IGIgPSB0aGlzLmhlcm8uZmluZChcIi5oZXJvLWJhY2tncm91bmRcIikuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKTtcbiAgLy9cbiAgLy8gICBpZiAoIGIgIT09IFwibm9uZVwiICkge1xuICAvLyAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gIC8vXG4gIC8vICAgICAgIHRoaXMuaGVyby5hZGRDbGFzcyhcImxvYWRlZFwiKTtcbiAgLy9cbiAgLy8gICAgICAgVHdlZW5MaXRlXG4gIC8vICAgICAgICAgLnRvKHRoaXMuaGVybywgLjQsXG4gIC8vICAgICAgICAgICB7XG4gIC8vICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgKTtcbiAgLy8gICAgIH0sIDMwMCk7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy9cbiAgLy8gICAgIHRoaXMuaGVyby5hZGRDbGFzcyhcImxvYWRlZFwiKTtcbiAgLy9cbiAgLy8gICB9XG4gIC8vIH1cblxuICBhbmltYXRlQmxvZ0FydGljbGVzKCk6IHZvaWQge1xuICAgIGxldCBhbmltYXRlID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmFyci5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGFuaW1hdGUudG8odGhpcy5hcnJbIGkgXSwgMC4xLCB7IG9wYWNpdHk6IFwiMVwiLCBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByZWxvYWRJbWFnZXMoKTogdm9pZCB7XG4gICAgdGhpcy5hcnIgPSBbXTtcblxuICAgIHRoaXMuY29udGVudC5pbWFnZXNMb2FkZWQoeyBiYWNrZ3JvdW5kOiB0cnVlIH0sICgpID0+IHtcblxuICAgICAgICAvLyBCbG9nIHByaW1hcnkgYXJ0aWNsZVxuICAgICAgICB0aGlzLmJvZHkuaGFzQ2xhc3MoXCJibG9nXCIpID8gdGhpcy5hbmltYXRlQmxvZ1ByaW1hcnkoKSA6IFwiXCI7XG5cbiAgICAgICAgLy8gSGVybyBoZWFkZXIgaW50cm9cbiAgICAgICAgLy8gdGhpcy5oYXNIZXJvID4gMCA/IHRoaXMuYW5pbWF0ZUhlcm9IZWFkZXIoKSA6IFwiXCI7XG4gICAgICAgIHRoaXMuaGFzQmdJbWFnZSA+IDAgPyB0aGlzLmJnSW1hZ2UuYWRkQ2xhc3MoXCJsb2FkZWRcIikgOiBcIlwiO1xuXG4gICAgICB9KVxuICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoIGluc3RhbmNlICkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBpbWFnZXMgbG9hZGVkXCIpO1xuICAgICAgfSlcbiAgICAgIC5kb25lKCggaW5zdGFuY2UgKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBzdWNjZXNzZnVsbHkgbG9hZGVkXCIpO1xuXG4gICAgICAgIC8vIEFuaW1hdGlvbiBmb3IgQmxvZyBpbmRleCBob21lcGFnZVxuICAgICAgICB0aGlzLmFuaW1hdGVCbG9nQXJ0aWNsZXMoKTtcbiAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcihcImltZ0xvYWRlZFwiKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEV4YW1wbGUgb24gaG93IHRvIHRyaWdnZXIgZXZlbnRzIGVsc2V3aGVyZVxuICAgICAgICAvLyAkKGRvY3VtZW50KS5vbihcImltZ0xvYWRlZFwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcImltYWdlIGxvYWRlZCBjdXN0b20gZXZlbnRcIik7XG4gICAgICAgIC8vIH0pO1xuXG4gICAgICB9KVxuICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBpbWFnZXMgbG9hZGVkLCBhdCBsZWFzdCBvbmUgaXMgYnJva2VuXCIpO1xuICAgICAgfSlcbiAgICAgIC5wcm9ncmVzcygoIGluc3RhbmNlLCBpbWFnZSApID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGltYWdlLmlzTG9hZGVkID8gXCJsb2FkZWRcIiA6IFwiYnJva2VuXCI7XG5cbiAgICAgICAgaWYgKCByZXN1bHQgKSB7XG4gICAgICAgICAgdGhpcy5hcnIucHVzaChpbWFnZS5pbWcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW1hZ2UgaXMgXCIgKyByZXN1bHQgKyBcIiBmb3IgXCIgKyBpbWFnZS5pbWcuc3JjKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcblxuICAgIGNvbnNvbGUubG9nKFwiSW1hZ2UgUHJlbG9hZGVyIE1vZHVsZVwiKTtcblxuICAgIHRoaXMucHJlbG9hZEltYWdlcygpO1xuICB9XG59XG5cbmxldCBJbWFnZUxvYWRlciA9IG5ldyBJbWFnZUxvYWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBJbWFnZUxvYWRlcjsiLCJkZWNsYXJlIHZhciBTY3JvbGxNYWdpYzogYW55O1xuY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuY2xhc3MgQW5pbWF0aW9uQ29tcG9uZW50IHtcblxuICBjb250YWluZXI6IEpRdWVyeTtcbiAgaXRlbTogSlF1ZXJ5O1xuICBtU2NlbmU6IEpRdWVyeTtcbiAgc2VydmljZVNpZGVCYXI6IEpRdWVyeTtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChcIi5wcm9jZXNzLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLml0ZW0gPSAkKFwiLnByb2Nlc3MtaXRlbS1jb250YWluZXJcIik7XG4gICAgdGhpcy5tU2NlbmUgPSAkKFwiLm0tc2NlbmVcIik7XG4gICAgdGhpcy5zZXJ2aWNlU2lkZUJhciA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gIH1cblxuICBkZXNjX29fYW5pbWF0ZSgpIHtcbiAgICBpZiAoICQoXCIuZGVzYy1vLWFuaW1hdGVcIikubGVuZ3RoID4gMCApIHtcbiAgICAgIGxldCB3aXBlQW5pbWF0aW9uID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICB3aXBlQW5pbWF0aW9uLmFkZChbXG4gICAgICAgIFR3ZWVuTWF4LmZyb21UbygkKFwiLmRlc2Mtby1pbWFnZS0xXCIpLCAxLCB7IHlQZXJjZW50OiAwIH0sIHsgeVBlcmNlbnQ6IC0yMCwgZWFzZTogUG93ZXIwLmVhc2VJbk91dCB9KVxuICAgICAgXSk7XG5cbiAgICAgIGxldCB3aXBlQW5pbWF0aW9uMiA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgd2lwZUFuaW1hdGlvbjIuYWRkKFtcbiAgICAgICAgVHdlZW5NYXguZnJvbVRvKCQoXCIuZGVzYy1vLWltYWdlLTJcIiksIDEsIHsgeVBlcmNlbnQ6IDAsIH0sIHsgeVBlcmNlbnQ6IC0xMDUsIGVhc2U6IFBvd2VyMC5lYXNlSW5PdXQgfSlcbiAgICAgIF0pO1xuXG4gICAgICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG5cbiAgICAgIGxldCBzY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgICAge1xuICAgICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5kZXNjLW8tYW5pbWF0ZVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAkKFwiLmRlc2Mtby1hbmltYXRlXCIpLmhlaWdodCgpLFxuICAgICAgICAgIG9mZnNldDogLTEwMFxuICAgICAgICB9KVxuICAgICAgLy8gLnNldFBpbihcIi5kZXNjLW8taW1hZ2UtMVwiKVxuICAgICAgICAuc2V0VHdlZW4od2lwZUFuaW1hdGlvbilcbiAgICAgICAgLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBFbClcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgICAuYWRkVG8oY29udHJvbGxlcik7XG5cbiAgICAgIGxldCBzY2VuZTIgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICAgIHtcbiAgICAgICAgICB0cmlnZ2VyRWxlbWVudDogXCIuZGVzYy1vLWFuaW1hdGVcIixcbiAgICAgICAgICBkdXJhdGlvbjogJChcIi5kZXNjLW8tYW5pbWF0ZVwiKS5oZWlnaHQoKSArIDEwMCxcbiAgICAgICAgfSlcbiAgICAgIC8vIC5zZXRQaW4oXCIuZGVzYy1vLWltYWdlLTFcIilcbiAgICAgICAgLnNldFR3ZWVuKHdpcGVBbmltYXRpb24yKVxuICAgICAgICAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMiAoZHVyYXRpb246IEVsKVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAgIC5hZGRUbyhjb250cm9sbGVyKTtcbiAgICB9XG4gIH1cblxuICBwcm9jZXNzQW5pbWF0ZUluKCkge1xuICAgIGxldCBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICBsZXQgaXRlbSA9IHRoaXMuaXRlbTtcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBTY3JvbGxNYWdpYy5Db250cm9sbGVyKCk7XG4gICAgbGV0IHNjZW5lID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKFxuICAgICAge1xuICAgICAgICB0cmlnZ2VyRWxlbWVudDogXCIucHJvY2Vzcy1jb250YWluZXJcIixcbiAgICAgICAgZHVyYXRpb246IGNvbnRhaW5lci5oZWlnaHQoKSxcbiAgICAgICAgLy8gb2Zmc2V0OiB0aGlzLmFzaWRlT2Zmc2V0LFxuICAgICAgfSlcbiAgICAgIC5vbihcImVudGVyXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaXRlbS5maW5kKFwiLnByb2Nlc3MtaXRlbS1pbm5lclwiKS5hZGRDbGFzcyhcImluXCIpO1xuICAgICAgICBjb250YWluZXIuZmluZChcImltZ1wiKS5hZGRDbGFzcyhcImluXCIpO1xuICAgICAgfSlcbiAgICAgIC8vIC5hZGRJbmRpY2F0b3JzKHsgbmFtZTogXCIxIChkdXJhdGlvbjogb2Zmc2V0PylcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgLmFkZFRvKGNvbnRyb2xsZXIpO1xuICB9XG5cbiAgYW5pbWF0ZVdpbmRvd1RvcCgpIHtcbiAgICBjb25zb2xlLmxvZyhcImFuaW1hdGUgVG9wXCIpO1xuICAgIFR3ZWVuTGl0ZVxuICAgICAgLnRvKCQod2luZG93KSwgLjMsXG4gICAgICAgIHtcbiAgICAgICAgICBzY3JvbGxUbzoge1xuICAgICAgICAgICAgeTogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZWFzZTogUG93ZXIyLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG4gIGFuaW1hdGVTZXJ2aWNlU2lkZWJhck91dCgpIHtcbiAgICBUd2VlbkxpdGUudG8odGhpcy5zZXJ2aWNlU2lkZUJhciwgLjMsIHtcbiAgICAgIHg6IFwiLTEwMFwiLFxuICAgICAgejogXCIuMDAxXCIsXG4gICAgICBkZWxheTogMCxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiLFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAvLyByZW1vdmUgc2lkZWJhciBodG1sIGVsZW1lbnQgc28gaXQgZG9lc250IHNob3cgdXAgYWdhaW4gd2hlbiBzY3JvbGxpbmcgdXBcbiAgICAgICAgdGhpcy5zZXJ2aWNlU2lkZUJhci5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGxvYWRVcmwoIHVybCApIHtcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICB9XG5cbiAgbWFpbkNvbnRlbnRBbmltYXRpb25PdXQoIGNhbGxiYWNrICkge1xuXG4gICAgLy8gTG9hZCBpbiBhbmltYXRpb25zIGhlcmVcbiAgICB0aGlzLmFuaW1hdGVTZXJ2aWNlU2lkZWJhck91dCgpO1xuXG5cbiAgICB0aGlzLm1TY2VuZS5hZGRDbGFzcyhcImlzLWV4aXRpbmdcIilcbiAgICAgIC8vIElmIGhhcyB3ZWJraXRBbmltYXRpb25FbmQgLSBpdCBnZXRzIGNhbGxlZCB0d2ljZVxuICAgICAgLm9uZShcIm9hbmltYXRpb25lbmQgbXNBbmltYXRpb25FbmQgYW5pbWF0aW9uZW5kXCIsICgpID0+IHtcblxuICAgICAgICAvLyBMb2FkIGluIGFuaW1hdGlvbnMgaGVyZSB0aGF0IG5lZWQgdG8gb2NjdXIgYWZ0ZXIgbWFpbiBvbmVzXG4gICAgICAgIHRoaXMuYW5pbWF0ZVdpbmRvd1RvcCgpO1xuXG4gICAgICB9KTtcblxuICAgIGlmICggdHlwZW9mKGNhbGxiYWNrKSA9PT0gXCJmdW5jdGlvblwiICkge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNoZWNrVXJsKCB1cmwgKTogYm9vbGVhbiB7XG4gICAgaWYgKCB1cmwubWF0Y2goL14jLykgIT09IG51bGwgfHwgdXJsID09PSBcIlwiICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnbG9iYWxDbGlja0NoZWNrKCBldmVudD8gKSB7XG5cbiAgICAvLyBHZXQgdXJsIGZyb20gdGhlIGEgdGFnXG4gICAgbGV0IG5ld1VybCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcImhyZWZcIik7XG4gICAgbGV0IGhhc0NoaWxkcmVuID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnQoXCJsaVwiKS5oYXNDbGFzcyhcIm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIik7XG5cbiAgICAvKlxuICAgICAqIEZpcnN0IFZhbGlkYXRpb246IElzIHRoZSB1cmwgdmFsaWRcbiAgICAgKi9cbiAgICBpZiAoICF0aGlzLmNoZWNrVXJsKG5ld1VybCkgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogSWYgZmlyc3QgdmFsaWRhdGlvbiBmYWlscywgdGhlIHVybCBpcyByZWFsIGFuZCBjb250aW51ZSB2YWxpZGF0aW5nXG4gICAgICovXG4gICAgLypcbiAgICAgKiBDaGVjayBpZiBpdHMgaG9yaXpvbnRhbCB0YWJsZXRcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPiBVdGlscy5icHMudGFibGV0ICYmXG4gICAgICB0aGlzLmNoZWNrVXJsKG5ld1VybCkgJiZcbiAgICAgIFV0aWxzLmJyb3dzZXIgPT09IFwiaXBhZFwiICYmIGhhc0NoaWxkcmVuICkge1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gY29uc29sZS5sb2coJ1RhYmxldCBOYXYgY2xpY2snKTtcbiAgICAgIHJldHVybjtcblxuICAgIH0gZWxzZSBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPiBVdGlscy5icHMudGFibGV0ICYmIHRoaXMuY2hlY2tVcmwobmV3VXJsKSApIHtcblxuICAgICAgLypcbiAgICAgICAqIENoZWNrIGlmIGl0cyBsYXJnZXIgdGhhbiB0YWJsZXQgYnV0IG5vdCBhbiBpcGFkXG4gICAgICAgKi9cblxuICAgICAgLy8gY29uc29sZS5sb2coXCJsYXB0b3Agb3IgbGFyZ2VyXCIpO1xuICAgICAgdGhpcy5tYWluQ29udGVudEFuaW1hdGlvbk91dCggKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICggdGhpcy5jaGVja1VybChuZXdVcmwpICYmIGhhc0NoaWxkcmVuICkge1xuXG4gICAgICAvKlxuICAgICAgICogQ2hlY2sgaWYgaXRzIG1vYmlsZSBuYXYgbWVudSB0aGF0IGhhcyBjaGlsZHJlblxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW9iaWxlIG1lbnUgaXMgYWN0aXZlIGFuZCBwYXJlbnQgY2xpY2tlZFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogUGFzc2VkIHRoZSBjaGVja3MgTG9hZCBpdCFcbiAgICAgICAqL1xuXG4gICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICB9XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5wcm9jZXNzQW5pbWF0ZUluKCk7XG4gICAgdGhpcy5kZXNjX29fYW5pbWF0ZSgpO1xuXG4gICAgLy8gQ2xpY2sgZXZlbnQgdG8gY29udHJvbCB3aW5kb3cgTG9hZGluZ1xuICAgICQoXCJhXCIpLm9uKFwiY2xpY2tcIiwgKCBlICkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5nbG9iYWxDbGlja0NoZWNrKGUpO1xuICAgIH0pO1xuXG4gICAgLy8gQ3VzdG9tIGV2ZW50IGV4YW1wbGVcbiAgICAvLyAkKGRvY3VtZW50KS5vbihcInRlc3RcIiwge30sICggZXZlbnQsIGFyZzEsIGFyZzIgKSA9PiB7XG4gICAgLy9cbiAgICAvLyAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJnMSk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZzIpO1xuICAgIC8vICAgfVxuICAgIC8vXG4gICAgLy8gfSkuYmluZCh0aGlzKTtcbiAgfVxufVxuXG5sZXQgQW5pbWF0aW9uQ29udHJvbGxlciA9IG5ldyBBbmltYXRpb25Db21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgQW5pbWF0aW9uQ29udHJvbGxlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cblxuaW50ZXJmYWNlIFF1b3RlU3RhdGVJbnRlcmZhY2Uge1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBpc0Zvcm1BY3RpdmU6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBRdW90ZVNlbGVjdGVkT2JqZWN0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgcHJpY2U6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgYnVsbGV0czogT2JqZWN0O1xuICBpbWdTcmM6IHN0cmluZztcbn1cblxuY2xhc3MgUXVvdGVDb21wb25lbnQge1xuXG4gIHNlbGVjdEJ0bjogSlF1ZXJ5O1xuICBzd2l0Y2hCdG46IEpRdWVyeTtcbiAgZm9ybUJ1aWxkZXI6IEpRdWVyeTtcbiAgcXVvdGVDaG9vc2VyOiBKUXVlcnk7XG4gIGlucHV0czogSlF1ZXJ5O1xuICBxdW90ZUl0ZW1zQXJyYXk6IEpRdWVyeTtcbiAgc2VsZWN0Q29uYWluZXI6IEpRdWVyeTtcbiAgc3RhdGU6IFF1b3RlU3RhdGVJbnRlcmZhY2U7XG4gIHF1b3RlQ29udGFpbmVyOiBKUXVlcnk7XG4gIHNlbGVjdGVkSXRlbTogUXVvdGVTZWxlY3RlZE9iamVjdDtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgY3VycmVudEJyZWFrcG9pbnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1b3RlQ29udGFpbmVyID0gJChcIi5xdW90ZVwiKTtcbiAgICB0aGlzLnNlbGVjdEJ0biA9ICQoXCIucXVvdGVfX3NlbGVjdC0tYnRuXCIpO1xuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5ID0gJChcIi5xdW90ZV9faXRlbVwiKTtcbiAgICB0aGlzLmZvcm1CdWlsZGVyID0gJChcIi5xdW90ZV9fZm9ybS0taW5wdXRcIik7XG4gICAgdGhpcy5xdW90ZUNob29zZXIgPSAkKFwiLnF1b3RlX19mb3JtLS1zZWxlY3RcIik7XG4gICAgdGhpcy5zZWxlY3RDb25haW5lciA9IHRoaXMuc2VsZWN0QnRuLmZpbmQoXCIuZmllbGRzZXRcIik7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkOiAnJyxcbiAgICAgIGlzRm9ybUFjdGl2ZTogZmFsc2VcbiAgICB9O1xuICAgIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgPSBVdGlscy5icmVha3BvaW50O1xuXG4gIH1cblxuICBnZXRTZWxlY3RlZExhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdENvbmFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBzZXRXaWR0aCggbGFiZWw6IEpRdWVyeSApIHtcblxuICAgIGxldCBsYWJlbFdpZHRoID0gbGFiZWwub3V0ZXJXaWR0aCgpO1xuICAgIHRoaXMuc3dpdGNoQnRuLmNzcyhcIndpZHRoXCIsIGxhYmVsV2lkdGgpO1xuXG4gIH1cblxuICBidWlsZFNlbGVjdEJveCgpIHtcblxuICAgIGxldCBuYW1lcyA9IFtdO1xuICAgIGxldCBmcmFnbWVudCA9ICQoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcblxuICAgIC8vIGdldCBoMiB0aXRsZXMgZnJvbSBlYWNoIHF1b3RlIGl0ZW1cbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgdGl0bGUgPSAkdGhpcy5maW5kKFwiaDJcIikudGV4dCgpLFxuICAgICAgICBuYW1lID0gdGl0bGUudG9Mb2NhbGVMb3dlckNhc2UoKSxcbiAgICAgICAgdW5pcXVlSWQgPSBuYW1lICsgXCItXCIgKyBpbmRleDtcblxuICAgICAgLy8gQWRkIG1hdGNoaW5nIElEJ3MgdG8gZWFjaCBDYXJkXG4gICAgICAkdGhpcy5hdHRyKFwiaWRcIiwgdW5pcXVlSWQpO1xuXG4gICAgICAvLyBDcmVhdGUgaW5wdXQgYW5kIGxhYmVsIERPTSBlbGVtZW50c1xuICAgICAgbGV0IGlucHV0ID0gVXRpbHMuYnVpbGRIdG1sKFwiaW5wdXRcIiwge1xuICAgICAgICBpZDogdW5pcXVlSWQsXG4gICAgICAgIHR5cGU6IFwicmFkaW9cIixcbiAgICAgICAgY2xhc3M6IFwicXVvdGVfX2lucHV0XCIsXG4gICAgICAgIG5hbWU6IHVuaXF1ZUlkLFxuICAgICAgICB2YWx1ZTogbmFtZVxuICAgICAgfSk7XG5cbiAgICAgIGxldCBsYWJlbCA9IFV0aWxzLmJ1aWxkSHRtbChcImxhYmVsXCIsIHtcbiAgICAgICAgZm9yOiB1bmlxdWVJZCxcbiAgICAgICAgY2xhc3M6IGluZGV4ID09PSAwID8gXCJzZWxlY3RlZFwiIDogXCJcIlxuICAgICAgfSwgdGl0bGUpO1xuXG5cbiAgICAgIGZyYWdtZW50LmFwcGVuZChpbnB1dCkuYXBwZW5kKGxhYmVsKTtcblxuICAgIH0pO1xuXG4gICAgZnJhZ21lbnQuYXBwZW5kKCc8c3BhbiBjbGFzcz1cInF1b3RlX19zd2l0Y2ggc2hhZG93LXNtYWxsLWJ0blwiPjwvc3Bhbj4nKTtcblxuICAgIHRoaXMuc2VsZWN0Q29uYWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICB9XG5cbiAgYnVpbGRTZWxlY3RFdmVudEhhbmRsZXJzKCkge1xuICAgIHRoaXMuaW5wdXRzID0gdGhpcy5zZWxlY3RCdG4uZmluZChcIi5xdW90ZV9faW5wdXRcIik7XG4gICAgdGhpcy5zd2l0Y2hCdG4gPSAkKFwiLnF1b3RlX19zd2l0Y2hcIik7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZWFjaCBpdGVtIGFuZCBzZXQgd2lkdGggYW5kIGNoYW5nZSBldmVudHMgYW5kIGNoZWNrZWQgc3RhdHVzXG4gICAgdGhpcy5pbnB1dHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gJChlbCksXG4gICAgICAgIG5leHRMYWJlbCA9ICR0aGlzLm5leHQoKTtcblxuICAgICAgaWYgKCBpbmRleCA9PT0gMCApIHtcbiAgICAgICAgJHRoaXMucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gc2V0IHN0YXRlIHRvIGN1cnJlbnQgc2VsZWN0ZWQgaW5wdXQgSURcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gZmluZCBTZWxlY3RlZCwgZ2V0IHdpZHRoIG9mIGxhYmVsLCBzZXQgd2lkdGggb2Ygc3BhblxuICAgICAgaWYgKCBuZXh0TGFiZWwuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSApIHtcbiAgICAgICAgdGhpcy5zZXRXaWR0aChuZXh0TGFiZWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgb24gY2hhbmdlIGZ1bmN0aW9uIGhlcmVcbiAgICAgICR0aGlzLmNoYW5nZSh0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRDYXJkRXZlbnRIYW5kbGVycygpIHtcblxuICAgIC8vIE1haW4gQ2FyZHNcbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgYnV0dG9uID0gJHRoaXMuZmluZChcIi5jYXJkX19pdGVtLS1idG5cIik7XG5cbiAgICAgIGJ1dHRvbi5vbihcImNsaWNrXCIsIHRoaXMub3BlbkZvcm0uYmluZCh0aGlzKSk7XG5cbiAgICB9KTtcblxuICAgIC8vIEJhY2sgYnV0dG9uIGZvciB0YWJsZXRcbiAgICBsZXQgYnV0dG9uID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnRhYmxldFwiKS5maW5kKFwiLmdvLWJhY2tcIik7XG4gICAgYnV0dG9uLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKSk7XG5cbiAgfVxuXG4gIGZhZGVJbiggZWw6IEpRdWVyeSApIHtcblxuICAgIFR3ZWVuTWF4LnRvKGVsLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGRlbGF5OiAuM1xuICAgIH0pO1xuXG4gIH1cblxuICBvbkNoYW5nZSggZSApIHtcblxuICAgIGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KSxcbiAgICAgIGZpZWxkc2V0ID0gJHRoaXMucGFyZW50KFwiLmZpZWxkc2V0XCIpLFxuICAgICAgcHJldkl0ZW0gPSBmaWVsZHNldC5maW5kKFwiLnNlbGVjdGVkXCIpLFxuICAgICAgcHJldldpZHRoID0gcHJldkl0ZW0ub3V0ZXJXaWR0aCgpIC0gMSxcbiAgICAgIGlucHV0SWQgPSAkdGhpcy5hdHRyKFwiaWRcIik7XG5cbiAgICAvLyByZW1vdmUgc2VsZWN0ZWQgZnJvbSBQcmV2IExhYmVsXG4gICAgZmllbGRzZXQuZmluZChcImxhYmVsXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAvLyByZW1vdmUgY2hlY2tlZCBzdGF0ZSBmcm9tIHByZXYgaW5wdXRcbiAgICBwcmV2SXRlbS5wcmV2KFwiaW5wdXRcIikucHJvcChcImNoZWNrZWRcIiwgZmFsc2UpO1xuXG4gICAgLy8gc2V0IG5ldyBpdGVtIHRvIHNlbGVjdGVkIGFuZCBjaGVja2VkXG4gICAgbGV0IHNlbGVjdGVkTGFiZWwgPSBmaWVsZHNldC5maW5kKFwibGFiZWxbZm9yPVwiICsgaW5wdXRJZCArIFwiXVwiKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICR0aGlzLnByb3AoXCJjaGVja2VkXCIsIHRydWUpO1xuXG4gICAgLy8gaWYgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBpbnB1dCBtYXRjaGVzIHRoZSAybmQgaXRlbSAtIHRoZW4gbW92ZSBzd2l0Y2hCdG4gcmlnaHQsIG90aGVyd2lzZSBiYWNrIHRvIHBvc2l0aW9uIDFcbiAgICBpZiAoIGlucHV0SWQgPT09ICQodGhpcy5pbnB1dHNbIDEgXSkuYXR0cihcImlkXCIpICkge1xuICAgICAgdGhpcy5zd2l0Y2hCdG4uY3NzKHtcbiAgICAgICAgXCJ3ZWJraXRUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJNb3pUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJtc1RyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoXCIgKyBwcmV2V2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcIk9UcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgcHJldldpZHRoICsgXCJweClcIlxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3dpdGNoQnRuLmNzcyh7XG4gICAgICAgIFwid2Via2l0VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCIsXG4gICAgICAgIFwiTW96VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCIsXG4gICAgICAgIFwibXNUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJPVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCIsXG4gICAgICAgIFwidHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWCgwcHgpXCJcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGNoYW5nZSB0aGUgd2lkdGggb2YgdGhlIGJ0biB0byBtYXRjaCB0aGUgd2lkdGggb2YgdGhlIG5ldyBsYWJlbFxuICAgIHRoaXMuc2V0V2lkdGgoc2VsZWN0ZWRMYWJlbCk7XG5cbiAgICAvLyBzZXQgc3RhdGUgdG8gdGhlIG5ld2x5IHNlbGVjdGVkIGlucHV0XG4gICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcbiAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgU3RhdGUgaXM6IFwiLCB0aGlzLnN0YXRlLnNlbGVjdGVkKTtcblxuICAgIHRoaXMudG9nZ2xlQ2FyZHMoKTtcblxuICB9XG5cbiAgdG9nZ2xlQ2FyZHMoKSB7XG5cbiAgICAvLyBiYXNlZCBvbiBzdGF0ZSwgYWRkIHNlbGVjdGVkIHRvIHRoZSBjYXJkJ3MgaWQgbWF0Y2hpbmcgdGhlIHN0YXRlXG4gICAgdGhpcy5xdW90ZUl0ZW1zQXJyYXkuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gJChlbCksXG4gICAgICAgIGlkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuXG4gICAgICAkdGhpcy5yZW1vdmVDbGFzcyhcInNlbGVjdGVkIHNoYWRvdy1tZWRpdW0tZGFya1wiKTtcblxuICAgICAgaWYgKCBpZCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZCApIHtcblxuICAgICAgICAkdGhpcy5hZGRDbGFzcyhcInNlbGVjdGVkIHNoYWRvdy1tZWRpdW0tZGFya1wiKTtcblxuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfVxuXG4gIHNldEFjdGl2ZVBsYW4oKSB7XG5cbiAgICBsZXQgaWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkO1xuICAgIGxldCBzZWxlY3RlZENhcmQgPSB0aGlzLnF1b3RlSXRlbXNBcnJheS5maWx0ZXIoKCBpdGVtICkgPT4ge1xuICAgICAgcmV0dXJuICQodGhpcy5xdW90ZUl0ZW1zQXJyYXlbIGl0ZW0gXSkuYXR0cihcImlkXCIpID09PSBpZDtcbiAgICB9KTtcblxuICAgIGxldCBidXR0b24gPSAnPGEgY2xhc3M9XCJyb3VuZGVkLWJ0biB3aGl0ZS1idG4gZ28tYmFja1wiIGhyZWY9XCIjXCI+R28gQmFjazwvYT4nO1xuXG4gICAgbGV0IG1vZGlmaWVkRWxlbWVudCA9IHNlbGVjdGVkQ2FyZC5jbG9uZSgpO1xuXG4gICAgbW9kaWZpZWRFbGVtZW50LmZpbmQoXCIuY2FyZF9faXRlbS0tYnRuXCIpLnJlbW92ZSgpO1xuXG4gICAgLy8gbW9kaWZpZWRFbGVtZW50Lmluc2VydEJlZm9yZSh0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIuZ28tYmFja1wiKSk7XG4gICAgbGV0IGNhcmRXcmFwcGVyID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS1jYXJkLXdyYXBwZXJcIik7XG5cbiAgICBjYXJkV3JhcHBlci5hcHBlbmQobW9kaWZpZWRFbGVtZW50KS5hcHBlbmQoYnV0dG9uKTtcblxuICAgIC8vIEJhY2sgYnV0dG9uIGluc2lkZSB3cmFwcGVyXG4gICAgbGV0IGJ1dHRvbkRvbSA9IGNhcmRXcmFwcGVyLmZpbmQoXCIuZ28tYmFja1wiKTtcbiAgICBidXR0b25Eb20ub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlRm9ybS5iaW5kKHRoaXMpKTtcblxuXG4gIH1cblxuICBjbG9zZUZvcm0oIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUuaXNGb3JtQWN0aXZlID0gZmFsc2U7XG5cbiAgICAvLyByZW1vdmUgY3VycmVudCBjYXJkXG4gICAgbGV0IGNhcmQgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIuY2FyZF9faXRlbVwiKTtcbiAgICBsZXQgYmFja0J0biA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5xdW90ZV9fZm9ybS0tY2FyZC13cmFwcGVyXCIpLmZpbmQoXCIuZ28tYmFja1wiKTtcblxuICAgIGNhcmQucmVtb3ZlQ2xhc3MoXCJpblwiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gc2V0IGZvcm0gdG8gYWN0aXZlXG4gICAgICB0aGlzLmZvcm1CdWlsZGVyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyBzZXQgYm9keSBiYWNrIHRvIHNjcm9sbGFibGVcbiAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJhdXRvXCIpO1xuICAgIH0sIDQwMCk7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgdGhpcy5mb3JtQnVpbGRlclxuICAgICAgICAuZmluZChcIi5xdW90ZV9fZm9ybS0tdmNcIilcbiAgICAgICAgLm9uZSgnb3RyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgbXNUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQnLFxuICAgICAgICAgICggZSApID0+IHtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIHZpc2liaWxpdHkgb25jZSBhbmltYXRpb24gY29tcGxldGVzXG4gICAgICAgICAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB0aGlzLnF1b3RlQ2hvb3Nlci5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblxuICAgICAgICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgY2FyZCBodG1sXG4gICAgICAgICAgICBjYXJkLnJlbW92ZSgpO1xuICAgICAgICAgICAgYmFja0J0bi5yZW1vdmUoKTtcblxuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIHJlbW92ZSB2aXNpYmlsaXR5IG9uY2UgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgdGhpcy5mb3JtQnVpbGRlci5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50IGNhcmQgaHRtbFxuICAgICAgY2FyZC5yZW1vdmUoKTtcbiAgICAgIGJhY2tCdG4ucmVtb3ZlKCk7XG4gICAgfVxuXG5cbiAgICAvLyBmYWRlIG91dCBmaXJzdCBkaXNwbGF5XG4gICAgdGhpcy5xdW90ZUNob29zZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gIH1cblxuICBvcGVuRm9ybSggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgbGV0IHBhcmVudENvbmF0aW5lciA9ICR0aGlzLnBhcmVudChcImRpdlwiKS5wYXJlbnQoXCJkaXZcIik7XG5cbiAgICAvLyBkaXNhYmxlIGJ1dHRvbiBjbGljayBpZiBpdGVtIGlzIHNlbGVjdGVkXG4gICAgaWYgKCAhcGFyZW50Q29uYXRpbmVyLmhhc0NsYXNzKFwic2VsZWN0ZWRcIikgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gc2V0IHN0YXRlXG4gICAgdGhpcy5zdGF0ZS5pc0Zvcm1BY3RpdmUgPSB0cnVlO1xuXG4gICAgLy8gc2V0IGNvbnRlbnQgcGxhbiBIVE1MIGluIG5ldyBmb3JtIGFyZWFcbiAgICB0aGlzLnNldEFjdGl2ZVBsYW4oKTtcblxuICAgIC8vIGZhZGUgb3V0IGNhcmRzXG4gICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cbiAgICAvLyBzZXQgZm9ybSB0byBhY3RpdmVcbiAgICB0aGlzLmZvcm1CdWlsZGVyLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgLy8gYWRkIHZpc2liaWxpdHkgaW1tZWRpYXRlbHlcbiAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuXG4gICAgLy8gZmFkZSBvdXQgZmlyc3QgZGlzcGxheVxuICAgIHRoaXMucXVvdGVDaG9vc2VyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgLy8gaWYgZGVza3RvcCBzY3JvbGwgdG9wXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8vIHNjcm9sbCB0b3Agb2YgZGl2IG9uIG9wZW4gZm9yIGdyYWNlZnVsIFVYXG4gICAgICAkKFwiYm9keSxodG1sXCIpLmFuaW1hdGUoeyBcInNjcm9sbFRvcFwiOiB0aGlzLnF1b3RlQ29udGFpbmVyLm9mZnNldCgpLnRvcCAtIDM1IH0sIDIwMCk7XG5cbiAgICB9XG5cblxuICAgIGxldCBjYXJkID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS1jYXJkXCIpO1xuXG4gICAgLy8gU2V0IGJvZHkgdG8gbm90IHNjcm9sbFxuICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJoaWRkZW5cIik7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIGNhcmQub25lKCdvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICggZSApID0+IHtcblxuICAgICAgICAgIC8vIGZhZGUgY2FyZCBpbiBvbmNlIGRhdGEgaXMgc2V0ICYgdGhlIGNhcmQgYmcgaXMgZmluaXNoZWQgYW5pbWF0aW5nXG4gICAgICAgICAgY2FyZC5maW5kKFwiLmNhcmRfX2l0ZW1cIikuYWRkQ2xhc3MoXCJpblwiKTtcblxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBmYWRlIGNhcmQgaW4gb25jZSBkYXRhIGlzIHNldCAmIHRoZSBjYXJkIGJnIGlzIGZpbmlzaGVkIGFuaW1hdGluZ1xuICAgICAgY2FyZC5maW5kKFwiLmNhcmRfX2l0ZW1cIikuYWRkQ2xhc3MoXCJpblwiKTtcblxuICAgIH1cblxuICB9XG5cbiAgcmVzaXplKCkge1xuXG4gICAgLy8gT24gcmVzaXplIGVuZCAtIGNoZWNrIHRvIGVuYWJsZSBjbGlja3MgZm9yIGRlc2t0b3Agb3IgcmVtb3ZlIHRoZW1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG5cbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGlmICggdGhpcy5jdXJyZW50QnJlYWtwb2ludCAhPT0gVXRpbHMuYnJlYWtwb2ludCApIHtcbiAgICAgICAgdGhpcy5zZXRXaWR0aCh0aGlzLmdldFNlbGVjdGVkTGFiZWwoKSk7XG4gICAgICAgIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgPSBVdGlscy5icmVha3BvaW50O1xuICAgICAgfVxuXG4gICAgfSwgNDAwKTtcblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlF1b3RlIEJ1aWxkZXJcIik7XG5cbiAgICAvLyBidWlsZCBzZWxlY3QgYm94IGJ1dHRvbiBpbnB1dHNcbiAgICB0aGlzLmJ1aWxkU2VsZWN0Qm94KCk7XG5cbiAgICAvLyBzZXQgY2xpY2sgZXZlbnRzIGFuZCBmaXJzdCBzZWxlY3RlZCBpdGVtcyBmb3IgU2VsZWN0IEJveFxuICAgIHRoaXMuYnVpbGRTZWxlY3RFdmVudEhhbmRsZXJzKCk7XG5cbiAgICB0aGlzLmZhZGVJbih0aGlzLnNlbGVjdEJ0bik7XG5cbiAgICAvLyBzZWxlY3QgY2FyZFxuICAgIHRoaXMudG9nZ2xlQ2FyZHMoKTtcblxuICAgIC8vIGFkZCBjbGljayBldmVudHMgdG8gY2FyZHMgYnV0dG9uc1xuICAgIHRoaXMuYnVpbGRDYXJkRXZlbnRIYW5kbGVycygpO1xuXG4gICAgLy8gZmFkZSBtYWluIGNvbnRhaW5lciBpblxuICAgIHRoaXMuZmFkZUluKHRoaXMucXVvdGVDb250YWluZXIpO1xuXG4gICAgLy8gb24gcmVzaXplIGNoYW5nZSBidXR0b24gc2l6ZVxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICB9XG59XG5cbmNvbnN0IFF1b3RlQnVpbGRlciA9IG5ldyBRdW90ZUNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBRdW90ZUJ1aWxkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5pbnRlcmZhY2UgU2hvd2Nhc2VTbGlkZXJJbnRlcmZhY2Uge1xuICBkZXNrdG9wUG9zOiBudW1iZXI7XG4gIHRhYmxldFBvczogbnVtYmVyO1xuICBpbmRleFNlbGVjdGVkOiBudW1iZXI7XG4gIGN1cnJlbnRTbGlkZTogbnVtYmVyO1xufVxuXG5jbGFzcyBTaG93Y2FzZUNvbXBvbmVudCB7XG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuICBuZXh0QnRuTW9iaWxlOiBKUXVlcnk7XG4gIHByZXZCdG5Nb2JpbGU6IEpRdWVyeTtcbiAgbmV4dEJ0bjogSlF1ZXJ5O1xuICBwcmV2QnRuOiBKUXVlcnk7XG4gIGluZGV4OiBudW1iZXI7XG4gIGdhbGxlcnk6IEpRdWVyeTtcbiAgZGVzYzogSlF1ZXJ5O1xuICB0aHVtYnNDb250YWluZXI6IEpRdWVyeTtcbiAgZ3JhZGllbnRzOiBKUXVlcnk7XG4gIHRodW1ic0NsaWNrOiBKUXVlcnk7XG4gIGNsb3NlQnRuOiBKUXVlcnk7XG4gIGNvdW50VG90YWw6IEpRdWVyeTtcbiAgY3VycmVudENvdW50SXRlbTogSlF1ZXJ5O1xuICBzaG93Q2FzZVRodW1iczogSlF1ZXJ5O1xuICBzdGF0ZVBvc2l0aW9uOiBTaG93Y2FzZVNsaWRlckludGVyZmFjZTtcbiAgdGh1bWJTY2FsZVRvcDogbnVtYmVyO1xuICB0aHVtYlNjYWxlTGVmdDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCBlbDogT2JqZWN0ICkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChlbCk7XG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fbmF2LS1wcmV2XCIpO1xuICAgIHRoaXMubmV4dEJ0bk1vYmlsZSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX25hdi0tbmV4dFwiKTtcbiAgICB0aGlzLnByZXZCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNuYXYtLXByZXZcIik7XG4gICAgdGhpcy5uZXh0QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fdGh1bWJzbmF2LS1uZXh0XCIpO1xuICAgIHRoaXMuZ2FsbGVyeSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3NsaWRlci0tZ2FsbGVyeVwiKTtcbiAgICB0aGlzLmRlc2MgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19kZXNjXCIpO1xuICAgIHRoaXMuY291bnRUb3RhbCA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIudG90YWxcIik7XG4gICAgdGhpcy5jdXJyZW50Q291bnRJdGVtID0gdGhpcy5jb250YWluZXIuZmluZChcIi5jdXJyZW50XCIpO1xuICAgIHRoaXMuaW5kZXggPSAwOyAvLyBzZXQgdG8gMm5kIHNsaWRlXG4gICAgdGhpcy50aHVtYnNDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnMtLWltYWdlc1wiKTtcbiAgICB0aGlzLnNob3dDYXNlVGh1bWJzID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fdGh1bWJzXCIpO1xuICAgIHRoaXMudGh1bWJTY2FsZVRvcCA9IDEzMDtcbiAgICB0aGlzLnRodW1iU2NhbGVMZWZ0ID0gNzU7XG4gICAgdGhpcy5zdGF0ZVBvc2l0aW9uID0ge1xuICAgICAgZGVza3RvcFBvczogMCxcbiAgICAgIHRhYmxldFBvczogMCxcbiAgICAgIGluZGV4U2VsZWN0ZWQ6IHRoaXMuaW5kZXgsXG4gICAgICBjdXJyZW50U2xpZGU6IHRoaXMuaW5kZXggKyAxXG4gICAgfTtcblxuICB9XG5cbiAgc2V0Rmlyc3RTbGlkZSgpIHtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBpbWFnZXMgYW5kIHNldCBhY3RpdmUgZWxlbWVudFxuICAgIGxldCBmaXJzdEltYWdlID0gdGhpcy5nYWxsZXJ5LmZpbmQoXCJsaVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG4gICAgZmlyc3RJbWFnZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgdGhpcy5hbmltYXRlR2FsbGVyeUluKCk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZGVzYyBhbmQgc2V0IGFjdGl2ZSBlbGVtZW50XG4gICAgbGV0IGZpcnN0RGVzYyA9IHRoaXMuZGVzYy5maW5kKFwiLnNob3djYXNlX19kZXNjLS1pdGVtW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcbiAgICBmaXJzdERlc2MuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgIC8vIEJ1aWxkIHRodW1ibmFpbHNcbiAgICB0aGlzLmJ1aWxkVGh1bWJzKCk7XG5cbiAgICAvLyBTZXQgQ3VycmVudCBTbGlkZSwgd2hpY2ggaXMgYWx3YXlzIHRoZSBmaXJzdCBzbGlkZSB0byBzZWxlY3RlZCAtIG9uTG9hZFxuICAgIHRoaXMudXBkYXRlTW9iaWxlTmF2KHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcblxuICAgIC8vIGFkZCBjbGljayBldmVudHMgdG8gdGh1bWJuYWlsIGltYWdlcywgdGhlbiB3aGVuIGZpbmlzaGVkIGFuaW1hdGUgaW4gd2l0aCBjYWxsYmFja1xuICAgIHRoaXMuYnVpbGRUaHVtYnNDbGlja0hhbmRsZXIodGhpcy5hbmltYXRlSW5UaHVtYnMuYmluZCh0aGlzKSk7XG5cbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy5nYWxsZXJ5LmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRDdXJyZW50TmF2RWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0Q3VycmVudERlc2NFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuZGVzYy5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0VG90YWxTbGlkZXMoKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSB0aGlzLmdhbGxlcnkuY2hpbGRyZW4oXCJsaVwiKS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgdXBkYXRlTW9iaWxlTmF2KCBzZWxlY3RlZDogSlF1ZXJ5ICkge1xuXG4gICAgLy8gRW5hYmxlL0Rpc2FibGUgYXJyb3cgYnRuc1xuICAgIHRoaXMucHJldkJ0bk1vYmlsZS5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6Zmlyc3QtY2hpbGRcIikpO1xuICAgIHRoaXMubmV4dEJ0bk1vYmlsZS5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6bGFzdC1jaGlsZFwiKSk7XG5cbiAgfVxuXG4gIHVwZGF0ZVN0YXRlKCBpbmRleDogbnVtYmVyICkge1xuXG4gICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgPSBpbmRleDtcbiAgICB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlID0gaW5kZXggKyAxO1xuXG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlO1xuICB9XG5cbiAgdXBkYXRlU2xpZGUoIGRpcmVjdGlvbjogc3RyaW5nICkge1xuXG4gICAgLy8gZ2V0IGN1cnJlbnQgc2VsZWN0ZWQgYW5kIGZpbmQgdGhlIG1hdGNoIHRvIHRoZSBuZXh0IGVsXG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSB0aGlzLmdhbGxlcnkuZmluZChcImxpW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcblxuICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLnByZXZBbGwoKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUubmV4dEFsbCgpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgTmF2aWdhdGlvbiBjaGVja1xuICAgIHRoaXMudXBkYXRlTW9iaWxlTmF2KHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcbiAgfVxuXG4gIHVwZGF0ZURlc2NIZWlnaHQoIGRpcmVjdGlvbj86IHN0cmluZywgc2VsZWN0ZWQ/OiBKUXVlcnkgKSB7XG5cbiAgICAvLyBkaXJlY3Rpb25cbiAgICBpZiAoIGRpcmVjdGlvbiApIHtcblxuICAgICAgbGV0IGhlaWdodCA9IHNlbGVjdGVkLm91dGVySGVpZ2h0KCk7XG4gICAgICBUd2Vlbk1heC50byh0aGlzLmRlc2MsIC4zLCB7XG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gZ2V0IGN1cnJlbnQgc2xpZGVcbiAgICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnREZXNjRWxlbWVudCgpO1xuICAgICAgbGV0IGhlaWdodCA9IGN1cnJlbnRTbGlkZS5vdXRlckhlaWdodCgpO1xuICAgICAgdGhpcy5kZXNjLmhlaWdodChoZWlnaHQpO1xuXG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVEZXNjKCBkaXJlY3Rpb246IHN0cmluZyApIHtcbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50RGVzY0VsZW1lbnQoKTtcbiAgICBsZXQgbmV4dFNsaWRlID0gdGhpcy5kZXNjLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2MtLWl0ZW1bZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcblxuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLnByZXZBbGwoKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUubmV4dEFsbCgpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcblxuICAgICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KFwicmlnaHRcIiwgbmV4dFNsaWRlKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuXG4gICAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoXCJsZWZ0XCIsIG5leHRTbGlkZSk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZVRodW1ic25hdiggZGlyZWN0aW9uOiBzdHJpbmcgKSB7XG5cbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50TmF2RWxlbWVudCgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwibGlbZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuXG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICAvKlxuICAgICAgICogVEFCTEVUIFRIVU1CIFNFTEVDVFxuICAgICAgICovXG5cbiAgICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPj0gNCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlIDwgdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyAtIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyAtIHRoaXMudGh1bWJTY2FsZVRvcDtcblxuICAgICAgICAgIC8vIHVwZGF0ZSBodG1sIGVsZW1lbnRcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibGVmdFwiKTtcbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG5cbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyArIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG4gICAgICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgeDogdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyxcbiAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgKyB0aGlzLnRodW1iU2NhbGVUb3A7XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLypcbiAgICAgICAqIERFU0tUT1AgVEhVTUIgU0VMRUNUXG4gICAgICAgKi9cbiAgICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG5cbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIC8vIGRldGVjdGluZyBpZiBzbGlkZSBzaG91bGQgbW92ZSBvciBub3RcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlID49IDQgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA8IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHBvc2l0aW9uIGNvbnRyb2xsZXJcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zIC0gdGhpcy50aHVtYlNjYWxlVG9wO1xuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zIC0gdGhpcy50aHVtYlNjYWxlTGVmdDtcblxuICAgICAgICAgIC8vIG1vdmUgc2xpZGVyXG4gICAgICAgICAgVHdlZW5NYXgudG8odGhpcy50aHVtYnNDb250YWluZXIsIC4xLCB7XG4gICAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICAgIHk6IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zLFxuICAgICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuXG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyAhPT0gMCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyArIHRoaXMudGh1bWJTY2FsZVRvcDtcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNlcGVyYXRlIHRhYmxldCBsb29raW5nIGF0IHNob3VsZCBpdCB1cGRhdGUgdGFibGV0IHN0YXRlXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyAhPT0gMCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgKyB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBjaGVja1RodW1ic05hdiggc2l6ZTogc3RyaW5nICkge1xuXG4gICAgaWYgKCBzaXplID09PSBcIm1vYmlsZVwiICkge1xuXG4gICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgeDogdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgIHk6IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zLFxuICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgfVxuXG4gIH1cblxuICBhcnJvd0hhbmRsZXIoIGV2ZW50OiBhbnkgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGxldCAkZWwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpOyAvLyBhIHRhZ1xuICAgIGxldCB0aHVtYkluZGV4ID0gJGVsLnBhcmVudChcImxpXCIpLmRhdGEoXCJpbmRleFwiKTtcbiAgICBsZXQgcHJldkVsID0gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgICBsZXQgcHJldkluZGV4ID0gcHJldkVsLmRhdGEoXCJpbmRleFwiKTtcblxuXG4gICAgLy8gU2xpZGVyIGNhbiBtb3ZlIHJpZ2h0IGJlY2F1c2UgY3VycmVudCBzbGlkZSBpcyBub3QgdGhlIGxhc3Qgc2xpZGVcbiAgICBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJyaWdodFwiICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPD0gdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGUgb24gYXJyb3cgY2xpY2tcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyAxKTtcblxuICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcInJpZ2h0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuXG4gICAgfSBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcImxlZnRcIiAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICAvLyB1cGRhdGUgc3RhdGUgb24gYXJyb3cgY2xpY2tcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgLSAxKTtcblxuICAgICAgLy8gRWxzZSBpZiBpdHMgbm90IHRoZSBmaXJzdCBzbGlkZSAtIG1vdmUgbGVmdFxuICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuICAgIH1cbiAgICBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInRodW1ibmFpbFwiICYmXG4gICAgICBwcmV2SW5kZXggPCB0aHVtYkluZGV4ICYmXG4gICAgICB0aHVtYkluZGV4ICsgMSAhPT0gdGhpcy5nZXRUb3RhbFNsaWRlc1xuICAgICkge1xuICAgICAgLy8gY29tcGFyZSBpdGVtIHNlbGVjdGVkIGluZGV4IHdpdGggbmV3IGl0ZW0gc2VsZWN0ZWQgYW5kIGRldGVybWluZSB3aGljaCBkaXJlY3Rpb24gdG8gbW92ZVxuICAgICAgLy8gdXBkYXRlIFN0YXRlXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRodW1iSW5kZXgpO1xuXG4gICAgICAvLyB1cGRhdGUgdGh1bWJzIG5hdlxuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcInJpZ2h0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuICAgIH1cbiAgICBlbHNlIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInRodW1ibmFpbFwiICYmIHByZXZJbmRleCA+IHRodW1iSW5kZXhcbiAgICApIHtcbiAgICAgIC8vIHVwZGF0ZSBTdGF0ZVxuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aHVtYkluZGV4KTtcblxuICAgICAgLy8gdXBkYXRlIHRodW1icyBuYXZcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwibGVmdFwiKTtcbiAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luT3V0KCk7XG5cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgY291bnRlclxuICAgIHRoaXMuY3VycmVudENvdW50SXRlbS5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICB9XG5cbiAgY2hlY2tTaXplKCkge1xuXG4gICAgLy8gT24gcmVzaXplIGVuZCAtIGNoZWNrIHRvIGVuYWJsZSBjbGlja3MgZm9yIGRlc2t0b3Agb3IgcmVtb3ZlIHRoZW1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG4gICAgdGhpcy5yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAvLyBpZiBUYWJsZXQgb3Igc21hbGxlciAtIGJpbmQgbW9iaWxlIG5hdiBhcnJvd3NcbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA8IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgICAgLy8gYWRqdXN0IGNzcyBzaXppbmcgZm9yIHRodW1icyBuYXYgb24gcG9zaXRpb24gcmVzaXplXG4gICAgICAgIHRoaXMuY2hlY2tUaHVtYnNOYXYoXCJtb2JpbGVcIik7XG5cbiAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgdGhpcy5jaGVja1RodW1ic05hdihcImRlc2t0b3BcIik7XG5cbiAgICAgIH1cblxuICAgIH0sIDQwMCk7XG5cbiAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoKTtcblxuICB9XG5cbiAgYW5pbWF0ZVNoYWRvd0luT3V0KCkge1xuXG4gICAgLy8gcmVtb3ZlIGRyb3BzaGFkb3dcbiAgICBUd2Vlbk1heC50byh0aGlzLmdhbGxlcnksIDAsIHtcbiAgICAgIGJveFNoYWRvdzogXCIwcHggMThweCA5NHB4IC0xNnB4IHJnYmEoMCwwLDAsMC4wKVwiXG4gICAgfSk7XG5cblxuICAgIFR3ZWVuTWF4LnRvKHRoaXMuZ2FsbGVyeSwgLjEsIHtcbiAgICAgIGJveFNoYWRvdzogXCIwcHggMThweCA5NHB4IC0xNnB4IHJnYmEoMCwwLDAsMC42OClcIixcbiAgICAgIGRlbGF5OiAuM1xuICAgIH0pO1xuXG5cbiAgfVxuXG4gIGFuaW1hdGVTaGFkb3dJbigpIHtcbiAgICBUd2Vlbk1heC50byh0aGlzLmdhbGxlcnksIC4zLCB7XG4gICAgICBib3hTaGFkb3c6IFwiMHB4IDE4cHggOTRweCAtMTZweCByZ2JhKDAsMCwwLDAuNjgpXCIsXG4gICAgICBkZWxheTogLjFcbiAgICB9KTtcbiAgfVxuXG4gIGJ1aWxkVGh1bWJzKCkge1xuXG4gICAgbGV0IGZyYWdtZW50ID0gJChkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpO1xuICAgIC8vIGJ1aWxkIGxvb3AgZm9yIGltYWdlc1xuICAgIHRoaXMuZ2FsbGVyeS5maW5kKFwibGlcIikuZWFjaCgoIGluZGV4OiBudW1iZXIsIGVsOiBPYmplY3QgKSA9PiB7XG5cbiAgICAgIC8vIGNyZWF0ZSBodG1sIGVsZW1lbnRzXG4gICAgICBsZXQgaXRlbUluZGV4ID0gVXRpbHMuc2V0TnVtYmVyKGluZGV4KSxcbiAgICAgICAgaW1hZ2VUaHVtYlVybCA9ICQoZWwpLmRhdGEoXCJ0aHVtYlwiKSxcbiAgICAgICAgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKSxcbiAgICAgICAgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSxcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgLy8gYWRkIHNyYyBhbmQgYXR0ciB0byBpbWFnZVxuICAgICAgaW1hZ2VFbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBpbWFnZVRodW1iVXJsKTtcbiAgICAgIGxpbmtFbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgXCIjXCIpO1xuICAgICAgbGlua0VsZW1lbnQuYXBwZW5kQ2hpbGQoaW1hZ2VFbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQobGlua0VsZW1lbnQpO1xuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWluZGV4XCIsIGl0ZW1JbmRleCk7XG5cbiAgICAgIC8vIHNldCBmaXJzdCBpbWFnZSB0byBzZWxlY3RlZFxuICAgICAgaW5kZXggPT09IHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkID8gZWxlbWVudC5jbGFzc05hbWUgPSBcInNlbGVjdGVkXCIgOiBcIlwiO1xuXG4gICAgICAvLyBhcHBlbmQgdG8gZnJhZ21lbnRcbiAgICAgIGZyYWdtZW50LmFwcGVuZChlbGVtZW50KTtcblxuICAgIH0pO1xuXG4gICAgLy8gaW5zZXJ0IGh0bWwgZWxlbWVudCB0byB0aGUgZG9tIGFmdGVyIGxvb3AgZmluaXNoZXNcbiAgICB0aGlzLnRodW1ic0NvbnRhaW5lci5hcHBlbmQoZnJhZ21lbnQpO1xuXG4gIH1cblxuICBidWlsZFRodW1ic0NsaWNrSGFuZGxlciggY2FsbGJhY2sgKSB7XG5cbiAgICAvLyBBZGQgYXJyYXkgb2YgaHRtbCBvYmplY3QgdG8gYXR0YWNoIGNsaWNrIGV2ZW50cyB0byBsYXRlclxuICAgIHRoaXMudGh1bWJzQ2xpY2sgPSB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwiYVwiKTtcblxuICAgIC8vIENsaWNrIGhhbmRsZXIgZm9yIHByZXZpZXcgdGh1bWJzIG9uIGRlc2t0b3AsIG5lZWRzIHRvIHdvcmsgb24gdGFibGV0IC0+IGRlc2t0b3BcbiAgICB0aGlzLnRodW1ic0NsaWNrLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICAkKGVsKS5vbihcImNsaWNrXCIsIHsga2V5czogXCJ0aHVtYm5haWxcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9KTtcblxuICAgIGNhbGxiYWNrKCk7XG4gIH1cblxuICBhbmltYXRlSW5UaHVtYnMoKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5zaG93Q2FzZVRodW1icywgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBkZWxheTogMVxuICAgIH0pO1xuICB9XG5cbiAgYW5pbWF0ZUdhbGxlcnlJbigpIHtcbiAgICBUd2Vlbk1heC50byh0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19vdXRlci0tYmdpbWFnZVwiKSwgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBkZWxheTogLjcsXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZVNoYWRvd0luKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgdGhpcy5zZXRGaXJzdFNsaWRlKCk7XG5cbiAgICAvLyBJbml0IGNvcnJlY3QgbmF2IGRlcGVuZGluZyBvbiB2aWV3cG9ydCBzaXplXG4gICAgdGhpcy5jaGVja1NpemUoKTtcbiAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoKTtcbiAgICB0aGlzLnByZXZCdG5Nb2JpbGUub24oXCJjbGlja1wiLCB7IGtleXM6IFwibGVmdFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMubmV4dEJ0bk1vYmlsZS5vbihcImNsaWNrXCIsIHsga2V5czogXCJyaWdodFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG5cbiAgICAvLyBzZXQgdG90YWwgc2xpZGVzIG51bWJlclxuICAgIHRoaXMuY291bnRUb3RhbC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldFRvdGFsU2xpZGVzKCkpKTtcblxuICAgIC8vIHVwZGF0ZSBjb3VudGVyXG4gICAgdGhpcy5jdXJyZW50Q291bnRJdGVtLmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gIH1cbn1cblxuLy8gbG9vcCB0aHJvdWdoIGVhY2ggaGVhZGVyIHNsaWRlciBvYmplY3Qgb24gdGhlIHBhZ2VcbmNsYXNzIFNob3dDYXNlU0xpZGVyIHtcblxuICBpdGVtSW5mb1dyYXBwZXI6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlciA9ICQoXCIuc2hvd2Nhc2VcIik7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2hvd2Nhc2UgU2xpZGVyIGluaXRcIik7XG5cbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlci5lYWNoKCggaW5kZXg6IG51bWJlciwgZWw6IE9iamVjdCApID0+IHtcblxuICAgICAgLy8gUGFzcyBcInRoaXNcIiB0byBlYWNoIG5ldyBIZWFkZXIgc2xpZGVyIGNvbXBvbmVudFxuICAgICAgbGV0IHNsaWRlciA9IG5ldyBTaG93Y2FzZUNvbXBvbmVudChlbCk7XG4gICAgICBzbGlkZXIuaW5pdCgpO1xuICAgIH0pO1xuICB9XG5cbn1cblxubGV0IFNob3djYXNlU2xpZGVyID0gbmV3IFNob3dDYXNlU0xpZGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFNob3djYXNlU2xpZGVyO1xuIiwiY29uc3QgJCA9IGpRdWVyeTtcblxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIFN0aWNreVNpZGViYXJDb21wb25lbnQge1xuXG4gIGlzQW5pbWF0aW5nOiBib29sZWFuO1xuICBjb250ZW50V3JhcHBlcjogSlF1ZXJ5O1xuICBjb250ZW50T2Zmc2V0VG9wOiBudW1iZXI7XG4gIGNvbnRlbnRXcmFwcGVySGVpZ2h0OiBudW1iZXI7XG4gIHNjcm9sbFRvcDogbnVtYmVyO1xuICBhc2lkZTogSlF1ZXJ5O1xuICBzaWRlYmFyV3JhcHBlcjogSlF1ZXJ5O1xuICB3aW5kb3dIZWlnaHQ6IG51bWJlcjtcbiAgc2lkZWJhckhlaWdodDogbnVtYmVyO1xuICBmb290ZXJIZWlnaHQ6IG51bWJlcjtcbiAgc2Nyb2xsaW5nRG93bjogYm9vbGVhbjtcbiAgbGFzdFNjcm9sbFRvcDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmNvbnRlbnRXcmFwcGVyID0gJChcIi5zaWRlYmFyLWNvbnRlbnRcIik7XG4gICAgdGhpcy5hc2lkZSA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFySGVpZ2h0ID0gdGhpcy5hc2lkZS5oZWlnaHQoKTtcbiAgICB0aGlzLnNpZGViYXJXcmFwcGVyID0gJChcIi5zZXJ2aWNlLXNpZGViYXJcIik7XG4gIH1cblxuICBjaGVja1NpZGViYXIoKTogdm9pZCB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIHNpZGViYXIgaXMgZml4ZWQgb3Igbm90XG4gICAgaWYgKCAhdGhpcy5pc0FuaW1hdGluZyAmJiBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICB0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkgP1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMudXBkYXRlU2lkZWJhclBvc2l0aW9uLmJpbmQodGhpcyksIDMwMCkgOlxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMudXBkYXRlU2lkZWJhclBvc2l0aW9uLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgdGhpcy5yZXNldFNpZGVCYXIoKTtcbiAgICB9XG4gIH1cblxuICBjaGVja1NpZGViYXJWaXNpYmlsaXR5KCkge1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8vIGRvZXMgc2lkZWJhciBoYXZlY2xhc3MgdmlzaWJpbGl0eVxuICAgICAgbGV0IGlzVmlzaWJsZSA9IHRoaXMuYXNpZGUuaGFzQ2xhc3MoJ3Zpc2libGUnKTtcblxuICAgICAgaWYgKCAhaXNWaXNpYmxlICkge1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZVNpZGViYXJJbigpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIHJlc2V0U2lkZUJhcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5hc2lkZS5yZW1vdmVDbGFzcyhcInN0aWNreVwiKTtcbiAgICB0aGlzLmFzaWRlLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGViYXJQb3NpdGlvbigpOiB2b2lkIHtcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxEaXJlY3Rpb24oKTtcblxuICAgIHRoaXMuY2hlY2tTaWRlYmFyVmlzaWJpbGl0eSgpO1xuXG4gICAgLy8gZ2V0IGRpc3RhbmNlIGZyb20gdG9wIG9mIGNvbnRlbnQgMTAgKyA0MCA9IDUwIHBhZGRpbmcgdG9wXG4gICAgLy8gdGhpcy5jb250ZW50T2Zmc2V0VG9wID0gdGhpcy5jb250ZW50V3JhcHBlci5vZmZzZXQoKS50b3AgLSAxMDtcbiAgICB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm9mZnNldCgpLnRvcDtcbiAgICB0aGlzLnNpZGViYXJIZWlnaHQgPSB0aGlzLmFzaWRlLmhlaWdodCgpO1xuICAgIHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm91dGVySGVpZ2h0KCk7IC8vIGluY2x1ZGUgcGFkZGluZyBhbmQgbWFyZ2luXG5cblxuICAgIC8vIGdldCB3aGVyZSB0b3Agb2Ygd2luZG93IGlzXG4gICAgdGhpcy5zY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJDb250ZW50IFdyYXBwZXIgSGVpZ2h0XCIsIHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQ29udGVudCBPZmZzZXRcIiwgdGhpcy5jb250ZW50T2Zmc2V0VG9wKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNpZGViYXIgSGVpZ2h0XCIsIHRoaXMuc2lkZWJhckhlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJXaW5kb3cgSGVpZ2h0XCIsIHRoaXMud2luZG93SGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm9mZnNldCBUb3BcIiwgdGhpcy5jb250ZW50T2Zmc2V0VG9wKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNjcm9sbFRvcFwiLCB0aGlzLnNjcm9sbFRvcCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJTaWRlYmFyb2Zmc2V0XCIsIHRoaXMuc2Nyb2xsVG9wKTtcblxuICAgIC8vIElmIHRoZSB3aW5kb3cgViBwb3NpdGlvbiBpcyBsZXNzIHRoYW4gdGhlIGNvbnRlbnQgViBwb3NpdGlvbiBtYWtlIHNpZGViYXIgbm9ybWFsXG4gICAgaWYgKCB0aGlzLnNjcm9sbFRvcCA8IHRoaXMuY29udGVudE9mZnNldFRvcCApIHtcbiAgICAgIC8vIGxldCBjc3NQcm9wcyA9IHtcbiAgICAgIC8vICAgXCJ0cmFuc2l0aW9uXCI6IFwidG9wIC4zc1wiXG4gICAgICAvLyB9O1xuICAgICAgdGhpcy5hc2lkZS5yZW1vdmVDbGFzcyhcInN0aWNreVwiKTtcbiAgICAgIC8vIHRoaXMuYXNpZGUuY3NzKGNzc1Byb3BzKTtcblxuICAgICAgLy8gaWYgd2luZG93IFYgcG9zaXRpb24gaXMgZ3JlYXRlciB0aGFuIGNvbnRlbnQgLSBhZGQgc3RpY2t5XG4gICAgICAvLyAybmQgY2hlY2tzIHRoZSBvZmZzZXQgb2YgdGhlIHRvcCBvZiB0aGUgd2luZG93IHRvIHRoZSB0b3Agb2YgdGhlIGNvbnRlbnQgJiYgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb250ZW50IGluIHJlbGF0aW9uIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgd2luZG93IC0gNDAgb24gZW5kXG4gICAgfSBlbHNlIGlmICggdGhpcy5zY3JvbGxUb3AgPj0gdGhpcy5jb250ZW50T2Zmc2V0VG9wICYmIHRoaXMuc2Nyb2xsVG9wIDwgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCAtIHRoaXMuc2lkZWJhckhlaWdodCArIHRoaXMuY29udGVudE9mZnNldFRvcCApIHtcbiAgICAgIHRoaXMuYXNpZGUuYWRkQ2xhc3MoXCJzdGlja3lcIikuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuXG4gICAgICBpZiAoIHRoaXMuc2Nyb2xsaW5nRG93biA9PT0gdHJ1ZSApIHtcbiAgICAgICAgLy8gdGhpcy5hc2lkZS5jc3MoXCJ0cmFuc2l0aW9uXCIsIFwidG9wIC4zc1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcIlwiKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBsZXQgYXJ0aWNsZVBhZGRpbmdUb3AgPSBOdW1iZXIoYXJ0aWNsZXMuZXEoMSkuY3NzKFwicGFkZGluZy10b3BcIikucmVwbGFjZShcInB4XCIsIFwiXCIpKTtcbiAgICAgIGlmICggdGhpcy5hc2lkZS5oYXNDbGFzcyhcInN0aWNreVwiKSApIHtcbiAgICAgICAgdGhpcy5hc2lkZS5hdHRyKFwic3R5bGVcIiwgXCJcIik7XG4gICAgICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJzdGlja3lcIikuY3NzKFwidG9wXCIsIHRoaXMuY29udGVudFdyYXBwZXJIZWlnaHQgLSB0aGlzLnNpZGViYXJIZWlnaHQgKyBcInB4XCIpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuXG4gIH1cblxuICBjaGVja1Njcm9sbERpcmVjdGlvbigpIHtcbiAgICAvLyBMb2cgY3VycmVudCBzY3JvbGxQb2ludFxuICAgIGxldCBzdCA9ICQodGhpcykuc2Nyb2xsVG9wKCk7XG5cbiAgICAvLyBjb21wYXJlIHRvIGxhc3Qgc2Nyb2xsUG9pbnRcbiAgICBpZiAoIHN0ID4gdGhpcy5sYXN0U2Nyb2xsVG9wICkge1xuICAgICAgY29uc29sZS5sb2coXCJzY3JvbGwgZG93blwiKTtcbiAgICAgIC8vIGRvd25zY3JvbGwgY29kZVxuICAgICAgdGhpcy5zY3JvbGxpbmdEb3duID0gdHJ1ZTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcInNjcm9sbCB1cFwiKTtcbiAgICAgIC8vIHVwc2Nyb2xsIGNvZGVcbiAgICAgIHRoaXMuc2Nyb2xsaW5nRG93biA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIG9uIGNvbXBsZXRlIC0gbWFrZSBsYXN0IFNjcm9sbCBwb2ludCB0aGUgcG9pbnQgYXQgd2hpY2ggdGhleSBzdGFydGVkIHNjcm9sbGluZyBhdCBmaXJzdFxuICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IHN0O1xuICB9XG5cbiAgYW5pbWF0ZVNpZGViYXJJbigpIHtcblxuICAgIHRoaXMuYXNpZGUucmVtb3ZlQ2xhc3MoXCJpbnRyb1wiKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICBsZXQgc2lkZWJhckludHJvID0gVHdlZW5NYXgudG8odGhpcy5hc2lkZSwgLjMsIHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgejogLjAwMSxcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgICAgZGVsYXk6IC45LFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgLy8gbWFrZSBzaWRlYmFyIHBlcm1hbmVudGx5IHZpc2libGVcbiAgICAgICAgICB0aGlzLmFzaWRlLmFkZENsYXNzKFwidmlzaWJsZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU3RpY2t5IHNpZGViYXIgbG9hZGVkXCIpO1xuXG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gMDtcbiAgICBpZiAoIHRoaXMuYXNpZGUubGVuZ3RoID4gMCApIHtcbiAgICAgIHRoaXMuY2hlY2tTaWRlYmFyKCk7XG5cbiAgICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcbiAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcblxuICAgICAgLy8gQW5pbWF0ZSBzaWRlIGJhciBpbiBvbiBsb2FkXG4gICAgICB0aGlzLmFuaW1hdGVTaWRlYmFySW4oKTtcbiAgICB9XG4gIH1cbn1cblxubGV0IFN0aWNreVNpZGViYXIgPSBuZXcgU3RpY2t5U2lkZWJhckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTdGlja3lTaWRlYmFyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5jbGFzcyBUZXN0aW1vbmFpbENvbXBvbmVudCB7XG5cbiAgdGVzdGltb25haWxzOiBKUXVlcnk7XG4gIHJlc2l6ZVRpbWVyOiBudW1iZXI7XG4gIGN1cnJlbnRIZWlnaHQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRlc3RpbW9uYWlscyA9ICQoXCIudGVzdGltb25pYWxzXCIpO1xuICB9XG5cbiAgZ2VuZXJhdGVJZCggaW5kZXgsIGVsICkge1xuXG4gICAgLy8gY3JlYXRlIER5bmFtaWMgSURcbiAgICBsZXQgaWRTdHJpbmcgPSBcImNhcm91c2VsLXRlc3RpbW9uaWFsLVwiICsgaW5kZXg7XG4gICAgZWwuYXR0cihcImlkXCIsIGlkU3RyaW5nKTtcblxuICAgIC8vIEFkZCBtYXRjaGluZyBocmVmIHRvIGNvbnRyb2xzXG4gICAgbGV0IGNvbnRyb2xzID0gZWwuZmluZChcIi5jYXJvdXNlbC1jb250cm9sXCIpO1xuICAgIGNvbnRyb2xzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgICQoZWwpLmF0dHIoXCJocmVmXCIsIFwiI1wiICsgaWRTdHJpbmcpO1xuXG4gICAgfSk7XG5cbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuXG4gICAgLy8gT24gcmVzaXplIGVuZCAtIGNoZWNrIHRvIGVuYWJsZSBjbGlja3MgZm9yIGRlc2t0b3Agb3IgcmVtb3ZlIHRoZW1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNpemVUaW1lcik7XG4gICAgdGhpcy5yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAvLyBDaGFuZ2UgSGVpZ2h0IG9uIHJlc2l6ZVxuICAgICAgdGhpcy50ZXN0aW1vbmFpbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgICBsZXQgJHRoaXMgPSAkKGVsKTtcblxuICAgICAgICAvLyBlc3RhYmxpc2ggdmFyc1xuICAgICAgICBsZXQgJGlubmVyID0gJHRoaXMuZmluZChcIi5jYXJvdXNlbC1pbm5lclwiKSxcbiAgICAgICAgICAgICRhY3RpdmUgPSAkaW5uZXIuZmluZChcIi5hY3RpdmVcIiksXG4gICAgICAgICAgICBibG9ja0l0ZW0gPSAkYWN0aXZlLmZpbmQoXCJibG9ja3F1b3RlXCIpO1xuXG4gICAgICAgIC8vIFNldCBoZWlnaHQgZm9yIGZpcnN0IGl0ZW1cbiAgICAgICAgbGV0IGhlaWdodCA9IGJsb2NrSXRlbS5vdXRlckhlaWdodCgpO1xuXG4gICAgICAgIC8vIGlmIHRoZXkgYXJlbid0IGVxdWFsLCBjaGFuZ2UgdGhlbVxuICAgICAgICBpZiAoIHRoaXMuY3VycmVudEhlaWdodCAhPT0gaGVpZ2h0ICkge1xuICAgICAgICAgICRpbm5lci5jc3MoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG5cbiAgICB9LCA0MDApO1xuICB9XG5cbiAgaW5pdCgpIHtcblxuICAgIGNvbnNvbGUubG9nKFwiVGVzdGltb25pYWxzIEluaXRcIik7XG5cbiAgICAvLyBNYWtlIGl0ZW1zIGR5bmFtaWNcbiAgICB0aGlzLnRlc3RpbW9uYWlscy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuICAgICAgbGV0ICR0aGlzID0gJChlbCk7XG4gICAgICB0aGlzLmdlbmVyYXRlSWQoaW5kZXgsICR0aGlzKTtcblxuICAgICAgLy8gbWFrZSBmaXJzdCBlbGVtZW50IGFjdGl2ZVxuICAgICAgbGV0ICRpbm5lciA9ICR0aGlzLmZpbmQoXCIuY2Fyb3VzZWwtaW5uZXJcIik7XG4gICAgICBsZXQgJGZpcnN0ID0gJGlubmVyLmNoaWxkcmVuKFwiLml0ZW1cIikuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgLy8gU2V0IGhlaWdodCBmb3IgZmlyc3QgaXRlbVxuICAgICAgbGV0IGhlaWdodCA9ICRmaXJzdC5vdXRlckhlaWdodCgpO1xuICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgJGlubmVyLmNzcyhcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gICAgfSk7XG5cbiAgICAvLyBTdGFydCBTbGlkZXJzXG4gICAgdGhpcy50ZXN0aW1vbmFpbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgLy8gaW5pdCBjYXJvdXNlbFxuICAgICAgJChlbCkuY2Fyb3VzZWwoKTtcblxuICAgICAgLy8gT24gc2xpZGUgY2hhbmdlIGhlaWdodCBmb3Igc21vb3RoIHRyYW5zaXRpb25zXG4gICAgICAkKGVsKS5vbihcInNsaWQuYnMuY2Fyb3VzZWxcIiwgKCBlICkgPT4ge1xuXG4gICAgICAgIC8vIHNsaWRlXG4gICAgICAgIGxldCAkdGhpcyA9IGUuY3VycmVudFRhcmdldDtcbiAgICAgICAgbGV0IGN1cnJlbnRTbGlkZSA9ICQoJHRoaXMpLmZpbmQoXCIuYWN0aXZlXCIpO1xuICAgICAgICBsZXQgYmxvY2tJdGVtID0gY3VycmVudFNsaWRlLmZpbmQoXCJibG9ja3F1b3RlXCIpO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gYmxvY2tJdGVtLm91dGVySGVpZ2h0KCk7XG4gICAgICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgY3VycmVudFNsaWRlLnBhcmVudChcIi5jYXJvdXNlbC1pbm5lclwiKS5jc3MoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcblxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBhZGp1c3Qgc2l6ZSBvbiByZXNpemVcbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG59XG5cbmNvbnN0IFRlc3RpbW9uYWlscyA9IG5ldyBUZXN0aW1vbmFpbENvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBUZXN0aW1vbmFpbHM7IiwiaW1wb3J0IHtCcHNJbnRlcmZhY2V9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2Jwcy5pbnRlcmZhY2VcIjtcbmNvbnN0ICQgPSBqUXVlcnk7XG5cbi8vIEFkZCBpbnRlcmZhY2UgSlF1ZXJ5U21vb3RoIHtcbi8vIHNtb290aFN0YXRlKCk6dm9pZDtcbi8vIH1cbi8vIHNtb290aFN0YXRlKGFyZzogT2JqZWN0KTogSlF1ZXJ5O1xuXG5jbGFzcyBVdGlsaXR5Q29tcG9uZW50IHtcbiAgd2luZG93V2lkdGg6IG51bWJlcjtcbiAgYnJlYWtwb2ludDogbnVtYmVyO1xuICBicmVha3BvaW50czogbnVtYmVyW107XG4gIGJwczogQnBzSW50ZXJmYWNlO1xuICBicm93c2VyOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfc2V0QnJlYWtwb2ludHMgPSAoIGJwczogQnBzSW50ZXJmYWNlICkgPT4ge1xuICAgIGxldCBhcnIgPSBbXTtcblxuICAgIGZvciAoIGxldCBrZXkgaW4gYnBzICkge1xuICAgICAgaWYgKCBicHMuaGFzT3duUHJvcGVydHkoa2V5KSApIHtcbiAgICAgICAgYXJyLnB1c2goYnBzWyBrZXkgXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyci5yZXZlcnNlKCk7XG4gIH07XG4gIHByaXZhdGUgX2NoZWNrQnJlYWtwb2ludCA9ICgpID0+IHtcbiAgICAvLyBtYWtlIGJyZWFrcG9pbnQgZXZlbnQgYXZhaWxhYmxlIHRvIGFsbCBmaWxlcyB2aWEgdGhlIHdpbmRvdyBvYmplY3RcbiAgICBsZXQgb2xkX2JyZWFrcG9pbnQgPSB0aGlzLmJyZWFrcG9pbnQ7XG5cbiAgICB0aGlzLl9zZXRCcmVha3BvaW50KCk7XG5cbiAgICBpZiAoIG9sZF9icmVha3BvaW50ICE9PSB0aGlzLmJyZWFrcG9pbnQgKSB7XG5cbiAgICAgICQod2luZG93KS50cmlnZ2VyKFwiYnJlYWtwb2ludENoYW5nZVwiLCBVdGlscy5icmVha3BvaW50KTtcbiAgICB9XG4gIH07XG4gIHByaXZhdGUgX3NldEJyZWFrcG9pbnQgPSAoKSA9PiB7XG4gICAgLy8gZ2V0IGJyZWFrcG9pbnQgZnJvbSBjc3NcbiAgICBsZXQgYm9keSA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSksXG4gICAgICB6aW5kZXggPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpWyBcInotaW5kZXhcIiBdO1xuXG4gICAgdGhpcy5icmVha3BvaW50ID0gcGFyc2VJbnQoemluZGV4LCAxMCk7XG4gIH07XG4gIHByaXZhdGUgX3NldFdpbmRvd1dpZHRoID0gKCkgPT4ge1xuICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgfTtcblxuICBzZXROdW1iZXIoIGNvdW50OiBudW1iZXIgKTogc3RyaW5nIHtcbiAgICAvLyBjb252ZXIgbnVtYmVyIHRvIHN0cmluZ1xuICAgIGxldCB0b3RhbCA9IGNvdW50O1xuICAgIHJldHVybiB0b3RhbC50b1N0cmluZygpO1xuICB9XG5cbiAgd2hpY2hCcm93c2VyKCkge1xuICAgIGlmICggKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwic2FmYXJpXCIpID4gLTEpICYmICEoXG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImNocm9tZVwiKSA+IC0xKSAmJiAobmF2aWdhdG9yLmFwcE5hbWUgPT09XG4gICAgICBcIk5ldHNjYXBlXCIpICkge1xuXG4gICAgICBpZiAoIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2lQYWQvaSkgIT09IG51bGwgKSB7XG4gICAgICAgIHJldHVybiBcImlwYWRcIjtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwic2FmYXJpXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYnVpbGRIdG1sKCB0eXBlOiBzdHJpbmcsIGF0dHJzPzogT2JqZWN0LCBodG1sPzogc3RyaW5nICkge1xuICAgIFxuICAgIC8vIGh0dHA6Ly9tYXJjZ3JhYmFuc2tpLmNvbS9idWlsZGluZy1odG1sLWluLWpxdWVyeS1hbmQtamF2YXNjcmlwdC9cbiAgICBcbiAgICBsZXQgaCA9ICc8JyArIHR5cGU7XG5cbiAgICBmb3IgKCBsZXQgYXR0ciBpbiBhdHRycyApIHtcbiAgICAgIGlmICggYXR0cnNbIGF0dHIgXSA9PT0gZmFsc2UgKSBjb250aW51ZTtcbiAgICAgIGggKz0gJyAnICsgYXR0ciArICc9XCInICsgYXR0cnNbIGF0dHIgXSArICdcIic7XG4gICAgfVxuXG4gICAgcmV0dXJuIGggKz0gaHRtbCA/IFwiPlwiICsgaHRtbCArIFwiPC9cIiArIHR5cGUgKyBcIj5cIiA6IFwiLz5cIjtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMud2luZG93V2lkdGggPSAwO1xuICAgIHRoaXMuYnJlYWtwb2ludCA9IDMyMDtcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0gW107XG4gICAgdGhpcy5icHMgPSB7XG4gICAgICBtb2JpbGU6IDU0NCxcbiAgICAgIHRhYmxldDogNzY4LFxuICAgICAgbGFwdG9wOiA5OTIsXG4gICAgICBkZXNrdG9wOiAxMjAwLFxuICAgICAgZGVza3RvcF94bDogMTYwMFxuICAgIH07XG4gICAgdGhpcy5icm93c2VyID0gdGhpcy53aGljaEJyb3dzZXIoKTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJVdGlsaXRpZXMgbG9hZGVkXCIpO1xuXG4gICAgLy8gc2V0IGJyZWFrcG9pbnQgb24gd2luZG93IGxvYWRcbiAgICB0aGlzLl9zZXRCcmVha3BvaW50KCk7XG4gICAgdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcbiAgICBjb25zb2xlLmxvZyhcIkN1cnJlbnQgQnJlYWtwb2ludCBpczpcIiwgdGhpcy5icmVha3BvaW50KTtcblxuICAgIC8vIGNyZWF0ZSBmdWxsIGFycmF5IGZvciBpbWFnZSBjb21wcmVzc2lvbiByZWZcbiAgICB0aGlzLmJyZWFrcG9pbnRzID0gdGhpcy5fc2V0QnJlYWtwb2ludHModGhpcy5icHMpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuX2NoZWNrQnJlYWtwb2ludCkuYmluZCh0aGlzKTtcbiAgfVxufVxuXG5sZXQgVXRpbHMgPSBuZXcgVXRpbGl0eUNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBVdGlsczsiXX0=
