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
    // reload() {
    //
    //   this.$navTrigger = document.getElementById("nav-trigger");
    //   this.$navDropdown = document.getElementById("neat-dropdown-trigger");
    //   // this.$lowerContainer = $(".lowercontainer");
    //   this.$upperContainer = $(".uppercontainer");
    //   this.$navMeta = $(".neat-nav-meta");
    //   this.$dropDownWrapper = $(".neat-dropdown-wrapper");
    //   this.$search = $("#nav-xfer");
    //   this.$dropDownContent = $(".neat-dropdown-content");
    //
    //   this.state = {
    //     navEnabled: false,
    //     mobile: false,
    //     tablet: false,
    //     laptop: false,
    //     desktop: false
    //   };
    //
    //   this.init();
    // }
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
        // console.log("Nav turned off");
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
    NavComponent.prototype.safariResizeFix = function () {
        var _this = this;
        clearTimeout(this.reIsoTimeOut);
        // check if the container has items inside it
        if (utils_1.default.browser === "safari" && utils_1.default.breakpoint >= utils_1.default.bps.laptop) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9kZXNjLW8tYW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9nYWxsZXJ5LWlzb3RvcGUudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2hlYWRlci1zdmcudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL2ltYWdlTG9hZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9xdW90ZS1idWlsZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXIudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy90ZXN0aW1vbmlhbHMudHMiLCJhc3NldHMvanMvY3VzdG9tL3BhcnRpYWxzL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7OztHQUdHOztBQUVILHNCQUFrQixrQkFBa0IsQ0FBQyxDQUFBO0FBQ3JDLDJCQUFnQix5QkFBeUIsQ0FBQyxDQUFBO0FBQzFDLHVCQUFtQixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ3BELDJCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLG9EQUFvRDtBQUNwRCw0QkFBd0Isd0JBQXdCLENBQUMs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LENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVoQyxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV2RCw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVsRCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FyR0EsQUFxR0MsSUFBQTtBQUVELElBQUksS0FBSyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztBQUVuQztrQkFBZSxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypcbiBSZWYgcGF0aCBpcyBub3QgbmVlZGVkIGZvciBzb21lIHJlYXNvblxuIDxyZWZlcmVuY2UgcGF0aD1cIi9Vc2Vycy95b3NlbWV0aWUvRHJvcGJveC9kZXZlbG9wbWVudC92aG9zdHMvd3d3Lmx5bmRhc2NvcmUuZGV2L3dwLWNvbnRlbnQvdGhlbWVzL25lYXQvdHlwaW5ncy90c2QuZC50c1wiIC8+XG4gKi9cblxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3BhcnRpYWxzL3V0aWxzXCI7XG5pbXBvcnQgTmF2IGZyb20gXCIuL25hdmlnYXRpb24vbmF2aWdhdGlvblwiO1xuaW1wb3J0IFNlYXJjaCBmcm9tIFwiLi9uYXZpZ2F0aW9uL2NvbXBvbmVudHMvc2VhcmNoXCI7XG5pbXBvcnQgU3ZnSGVhZGVyIGZyb20gXCIuL3BhcnRpYWxzL2hlYWRlci1zdmdcIjtcbi8vIGltcG9ydCBTbW9vdGhTdGF0ZSBmcm9tIFwiLi9wYXJ0aWFscy9zbW9vdGhTdGF0ZVwiO1xuaW1wb3J0IEltYWdlTG9hZGVyIGZyb20gXCIuL3BhcnRpYWxzL2ltYWdlTG9hZGVyXCI7XG5pbXBvcnQgU3RpY2t5U2lkZWJhciBmcm9tIFwiLi9wYXJ0aWFscy9zdGlja3ktc2lkZWJhclwiO1xuaW1wb3J0IEFuaW1hdGlvbkNvbnRyb2xsZXIgZnJvbSBcIi4vcGFydGlhbHMvcHJvY2Vzc0FuaW1hdGlvblwiO1xuaW1wb3J0IElzb3RvcGVHYWxsZXJ5IGZyb20gXCIuL3BhcnRpYWxzL2dhbGxlcnktaXNvdG9wZVwiO1xuaW1wb3J0IEhlYWRlclNsaWRlciBmcm9tIFwiLi9wYXJ0aWFscy9oZWFkZXItc2xpZGVyXCI7XG5pbXBvcnQgU2hvd2Nhc2VTbGlkZXIgZnJvbSBcIi4vcGFydGlhbHMvc2hvd2Nhc2Utc2xpZGVyXCI7XG5pbXBvcnQgVGVzdGltb25pYWxzIGZyb20gXCIuL3BhcnRpYWxzL3Rlc3RpbW9uaWFsc1wiO1xuaW1wb3J0IFF1b3RlQnVpbGRlciBmcm9tIFwiLi9wYXJ0aWFscy9xdW90ZS1idWlsZGVyXCI7XG4vLyBpbXBvcnQgU3RpY2t5U2lkZWJhciBmcm9tIFwiLi9wYXJ0aWFscy9zZXJ2aWNlLXNpZGViYXJcIjtcbmNvbnN0ICQgPSBqUXVlcnk7XG5kZWNsYXJlIHZhciBTY3JvbGxNYWdpYzogYW55O1xuLy8gZGVjbGFyZSB2YXIgcmV2YXBpMTogYW55O1xuXG4oZnVuY3Rpb24gKCkge1xuICBjbGFzcyBBcHAge1xuXG4gICAgaW5pdCgpOiB2b2lkIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQXBwIGxvYWRlZFwiKTtcbiAgICAgIFN2Z0hlYWRlci5pbml0KCk7XG4gICAgICBVdGlscy5pbml0KCk7XG4gICAgICBOYXYuaW5pdCgpO1xuICAgICAgU2VhcmNoLmluaXQoKTtcbiAgICAgIFN0aWNreVNpZGViYXIuaW5pdCgpO1xuICAgICAgVGVzdGltb25pYWxzLmluaXQoKTtcbiAgICAgIFF1b3RlQnVpbGRlci5pbml0KCk7XG4gICAgICBBbmltYXRpb25Db250cm9sbGVyLmluaXQoKTsgLy8gR2xvYmFsIHdpbmRvdyBhbmltIGFuZCBjbGljayBjb250cm9sXG4gICAgfVxuICB9XG5cbiAgbGV0IGJvb3RzdHJhcCA9IG5ldyBBcHAoKTtcblxuICAvKiogcnVuIGFsbCBmdW5jdGlvbnMgKi9cbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGJvb3RzdHJhcC5pbml0KCk7XG4gICAgSW1hZ2VMb2FkZXIuaW5pdCgpO1xuICAgIC8vIFNtb290aFN0YXRlLmluaXQoXCJcIik7XG4gIH0pO1xuXG4gIC8vIEJpbmQgZXZlbnRzIHRvIHRoZSBpbWFnZXNMb2FkZWQgcGx1Z2luIGhlcmVcbiAgJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24gKCBlICkge1xuICAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICBcbiAgICAvLyBjaGVjayBpZiBwYWdlIGhhcyBnYWxsZXJ5XG4gICAgaWYgKCAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBJc290b3BlR2FsbGVyeS5pbml0KCk7XG4gICAgfVxuICAgIEhlYWRlclNsaWRlci5pbml0KCk7XG4gICAgU2hvd2Nhc2VTbGlkZXIuaW5pdCgpO1xuXG4gIH0pO1xuXG59KSgpOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uLy4uL3BhcnRpYWxzL3V0aWxzXCI7XG5cbmNsYXNzIFNlYXJjaENvbXBvbmVudCB7XG4gICRzZWFyY2hUcmlnZ2VyOiBKUXVlcnk7XG4gICRzZWFyY2hDbG9zZVRyaWdnZXI6IEpRdWVyeTtcbiAgJHNlYXJjaEZvcm06IEpRdWVyeTtcbiAgJHNlYXJjaEJ1dHRvbkFyZWE6IEpRdWVyeTtcbiAgJGljb246IEpRdWVyeTtcbiAgJGZvcm06IEpRdWVyeTtcbiAgJGlucHV0OiBKUXVlcnk7XG4gICR3aWR0aDogbnVtYmVyO1xuICAkaGVpZ2h0OiBudW1iZXI7XG4gIGlzT3BlbjogYm9vbGVhbjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gdGhpcy4kc2VhcmNoRm9ybS5maW5kKFwiLm5lYXQtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZm9ybS5maXJzdCgpO1xuICAgIHRoaXMuJHdpZHRoID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS53aWR0aCgpO1xuICAgIHRoaXMuJGhlaWdodCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEuaGVpZ2h0KCk7XG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggUmVsb2FkXCIpO1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gJChcIi5uZWF0LXNlYXJjaFwiKTtcbiAgICB0aGlzLiR3aWR0aCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgICB0aGlzLiRoZWlnaHQgPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLmhlaWdodCgpO1xuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMub3BlblNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgfVxuXG4gIGdldFRvcFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaFRyaWdnZXIub2Zmc2V0KCkudG9wIC0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuICB9XG5cbiAgZ2V0TGVmdFBvc2l0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaFRyaWdnZXIub2Zmc2V0KCkubGVmdDtcbiAgfVxuXG4gIGNsb3NlU2VhcmNoKCBldmVudCApIHtcblxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG5cbiAgICBsZXQgYW5pbWF0aW9uID0gbmV3IFRpbWVsaW5lTGl0ZSgpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciwgLjIsIHtcbiAgICAgIHRvcDogXCI1JVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCJcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjI1JVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gICAgYW5pbWF0aW9uLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC4yLCB7XG4gICAgICBsZWZ0OiB0aGlzLmdldExlZnRQb3NpdGlvbigpLFxuICAgICAgdG9wOiB0aGlzLmdldFRvcFBvc2l0aW9uKCksXG4gICAgICB3aWR0aDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBkZWxheTogLjMsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCJcbiAgICAgICAgfSk7XG4gICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRpY29uLCAuMiwge1xuICAgICAgICAgIHRvcDogXCI1MCVcIixcbiAgICAgICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgICAgfSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KS50byh0aGlzLiRzZWFyY2hGb3JtLCAuNCwge1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc2VhcmNoRm9ybS5jc3Moe1xuICAgICAgICAgIFwiei1pbmRleFwiOiAtMSxcbiAgICAgICAgICBcImxlZnRcIjogMCxcbiAgICAgICAgICBcInRvcFwiOiAwLFxuICAgICAgICAgIFwid2lkdGhcIjogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgICAgIFwiaGVpZ2h0XCI6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgfSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcblxuICB9XG5cbiAgb3BlblNlYXJjaChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG5cbiAgICAvLyBwcmV2ZW50IGJ1dHRvbiBmcm9tIGJlaW5nIHVzZWQgb25jZSBzZWFyY2ggaXMgb3BlblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIuYmx1cigpO1xuXG4gICAgdGhpcy4kc2VhcmNoRm9ybS5jc3Moe1xuICAgICAgbGVmdDogdGhpcy5nZXRMZWZ0UG9zaXRpb24oKSxcbiAgICAgIHRvcDogdGhpcy5nZXRUb3BQb3NpdGlvbigpLFxuICAgICAgd2lkdGg6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgXCJ6LWluZGV4XCI6IDk5OVxuICAgIH0pO1xuXG4gICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIGFuaW1hdGlvbi50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuMlxuICAgIH0pLnRvKHRoaXMuJHNlYXJjaEZvcm0sIC4yLCB7XG4gICAgICBsZWZ0OiAwLFxuICAgICAgdG9wOiAwLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gICAgICBiYWNrZ3JvdW5kOiBcIiMzNTM3M0RcIixcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcImJvZHlcIikuY3NzKHtcbiAgICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgICAgICBvdmVyZmxvd1k6IFwic2Nyb2xsXCJcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgIHRvcDogXCIxMTAlXCIsXG4gICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIsIC4zLCB7XG4gICAgICB0b3A6IFwiMyVcIixcbiAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgZGVsYXk6IC40LFxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGZvcm0sIC40LCB7XG4gICAgICB0b3A6IFwiMjAlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICAgIGVhc2U6IEV4cG8uZWFzZUluT3V0XG4gICAgfSk7XG5cbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggbG9hZGVkXCIpO1xuICAgIC8vIHRoaXMub3BlblNlYXJjaCgpO1xuICAgIHRoaXMuJGlucHV0LmtleXVwKChldmVudCkgPT4ge1xuICAgICAgLy8gaWYga2V5IGlzIGVudGVyIC0gYW5pbWF0ZSBvdXRcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT09IDEzKSB7XG4gICAgICAgIHRoaXMuY2xvc2VTZWFyY2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMub3BlblNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICBcbiAgICAkKFwiYm9keVwiKS5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIGlmICggZXZlbnQud2hpY2ggPT09IDI3ICYmIHRoaXMuaXNPcGVuICkge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5sZXQgU2VhcmNoQm94ID0gbmV3IFNlYXJjaENvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hCb3g7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBTZWFyY2hCb3ggZnJvbSBcIi4vY29tcG9uZW50cy9zZWFyY2hcIjtcblxuaW50ZXJmYWNlIE5hdlN0YXRlIHtcbiAgbmF2RW5hYmxlZDogYm9vbGVhbjtcbiAgbW9iaWxlOiBib29sZWFuO1xuICB0YWJsZXQ6IGJvb2xlYW47XG4gIGxhcHRvcDogYm9vbGVhbjtcbiAgZGVza3RvcDogYm9vbGVhbjtcbn1cblxuY2xhc3MgTmF2Q29tcG9uZW50IHtcbiAgJG5hdlRyaWdnZXI6IEhUTUxFbGVtZW50O1xuICAkbmF2RHJvcGRvd246IEhUTUxFbGVtZW50O1xuICAkbG93ZXJDb250YWluZXI6IEpRdWVyeTtcbiAgJHVwcGVyQ29udGFpbmVyOiBKUXVlcnk7XG4gICRuYXZNZXRhOiBKUXVlcnk7XG4gICRkcm9wRG93bldyYXBwZXI6IEpRdWVyeTtcbiAgJHNlYXJjaDogSlF1ZXJ5O1xuICAkZHJvcERvd25Db250ZW50OiBKUXVlcnk7XG5cbiAgc3RhdGU6IE5hdlN0YXRlO1xuICByZUlzb1RpbWVPdXQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIHRoaXMuJG5hdlRyaWdnZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdi10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZWF0LWRyb3Bkb3duLXRyaWdnZXJcIik7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIgPSAkKFwiLmxvd2VyY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyID0gJChcIi51cHBlcmNvbnRhaW5lclwiKTtcbiAgICB0aGlzLiRuYXZNZXRhID0gJChcIi5uZWF0LW5hdi1tZXRhXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlciA9ICQoXCIubmVhdC1kcm9wZG93bi13cmFwcGVyXCIpO1xuICAgIHRoaXMuJHNlYXJjaCA9ICQoXCIjbmF2LXhmZXJcIik7XG4gICAgdGhpcy4kZHJvcERvd25Db250ZW50ID0gJChcIi5uZWF0LWRyb3Bkb3duLWNvbnRlbnRcIik7XG5cbiAgICAvKlxuICAgICBOYXYgU3RhdGUgT2JqZWN0XG4gICAgICovXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgZGVza3RvcDogZmFsc2VcbiAgICB9O1xuICB9XG5cblxuICAvLyBOb3QgdXNlZFxuICAvLyByZWxvYWQoKSB7XG4gIC8vXG4gIC8vICAgdGhpcy4kbmF2VHJpZ2dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF2LXRyaWdnZXJcIik7XG4gIC8vICAgdGhpcy4kbmF2RHJvcGRvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5lYXQtZHJvcGRvd24tdHJpZ2dlclwiKTtcbiAgLy8gICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lciA9ICQoXCIubG93ZXJjb250YWluZXJcIik7XG4gIC8vICAgdGhpcy4kdXBwZXJDb250YWluZXIgPSAkKFwiLnVwcGVyY29udGFpbmVyXCIpO1xuICAvLyAgIHRoaXMuJG5hdk1ldGEgPSAkKFwiLm5lYXQtbmF2LW1ldGFcIik7XG4gIC8vICAgdGhpcy4kZHJvcERvd25XcmFwcGVyID0gJChcIi5uZWF0LWRyb3Bkb3duLXdyYXBwZXJcIik7XG4gIC8vICAgdGhpcy4kc2VhcmNoID0gJChcIiNuYXYteGZlclwiKTtcbiAgLy8gICB0aGlzLiRkcm9wRG93bkNvbnRlbnQgPSAkKFwiLm5lYXQtZHJvcGRvd24tY29udGVudFwiKTtcbiAgLy9cbiAgLy8gICB0aGlzLnN0YXRlID0ge1xuICAvLyAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gIC8vICAgICBtb2JpbGU6IGZhbHNlLFxuICAvLyAgICAgdGFibGV0OiBmYWxzZSxcbiAgLy8gICAgIGxhcHRvcDogZmFsc2UsXG4gIC8vICAgICBkZXNrdG9wOiBmYWxzZVxuICAvLyAgIH07XG4gIC8vXG4gIC8vICAgdGhpcy5pbml0KCk7XG4gIC8vIH1cblxuXG4gIC8qXG4gICBNb2JpbGUgTmF2IGZ1bmN0aW9uYWxpdHlcbiAgICovXG4gIG9wZW5OYXYoIGV2ZW50OiBFdmVudCApOiB2b2lkIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJCh0aGlzLiRuYXZEcm9wZG93bikuYWRkQ2xhc3MoXCJtZW51LWlzLWFjdGl2ZVwiKTtcbiAgICBUd2Vlbk1heC50byh0aGlzLiRuYXZEcm9wZG93biwgLjMsIHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGNsb3NlTmF2KCBldmVudDogRXZlbnQgKTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKHRoaXMuJG5hdkRyb3Bkb3duKS5yZW1vdmVDbGFzcyhcIm1lbnUtaXMtYWN0aXZlXCIpO1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuJG5hdkRyb3Bkb3duLCAuMywge1xuICAgICAgICB0b3A6IFwiLTEwMCVcIixcbiAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5hdk9wZW5Jbml0KCBpbml0OiBib29sZWFuICk6IHZvaWQge1xuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQodGhpcy4kbmF2VHJpZ2dlcikub24oXCJjbGlja1wiLCB0aGlzLm9wZW5OYXYuYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcy4kbmF2VHJpZ2dlcikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBuYXZDbG9zZSggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcblxuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQoXCIjbmF2LWNsb3NlXCIpLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZU5hdi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIiNuYXYtY2xvc2VcIikub2ZmKCk7XG4gICAgfVxuXG4gIH1cblxuICBuYXZJdGVtQ2xpY2soIGluaXQ6IGJvb2xlYW4gKTogdm9pZCB7XG5cbiAgICBpZiAoIGluaXQgKSB7XG4gICAgICAkKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikuY2hpbGRyZW4oXCJhXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCBldmVudCApIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZWN0ZWQubmV4dChcInVsXCIpLnJlbW92ZUNsYXNzKFwiaXMtaGlkZGVuXCIpLnBhcmVudChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLnBhcmVudChcInVsXCIpLmFkZENsYXNzKFwibW92ZS1vdXRcIik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJChcIi5tZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpLmNoaWxkcmVuKFwiYVwiKS5vZmYoKTtcbiAgICB9XG5cbiAgfVxuXG4gIGdvYmFjayggaW5pdDogYm9vbGVhbiApOiB2b2lkIHtcblxuICAgIGlmICggaW5pdCApIHtcbiAgICAgICQoXCIuZ28tYmFjayA+IGFcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoIGV2ZW50ICkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsZXQgc2VsZWN0ZWQgPSAkKHRoaXMpO1xuICAgICAgICBzZWxlY3RlZC5wYXJlbnQoXCJsaVwiKS5wYXJlbnQoXCIubmVhdC1zZWNvbmRhcnktZHJvcGRvd25cIikuYWRkQ2xhc3MoXCJpcy1oaWRkZW5cIikucGFyZW50KFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW5cIikucGFyZW50KFwidWxcIikucmVtb3ZlQ2xhc3MoXCJtb3ZlLW91dFwiKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiLmdvLWJhY2sgPiBhXCIpLm9mZigpO1xuICAgIH1cblxuXG4gIH1cblxuICBtb3ZlTmF2aWdhdGlvbk1vYmlsZSgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiBtb2JpbGVcIik7XG5cbiAgICB0aGlzLiRzZWFyY2guZGV0YWNoKCk7XG4gICAgdGhpcy4kbmF2TWV0YS5kZXRhY2goKTtcbiAgICAvLyB0aGlzLiRsb3dlckNvbnRhaW5lci5kZXRhY2goKTtcbiAgICB0aGlzLiRkcm9wRG93bldyYXBwZXIuZGV0YWNoKCk7XG4gICAgLy8gdGhpcy4kbG93ZXJDb250YWluZXIuaW5zZXJ0QWZ0ZXIodGhpcy4kdXBwZXJDb250YWluZXIpO1xuICAgIHRoaXMuJG5hdk1ldGEuaW5zZXJ0QmVmb3JlKHRoaXMuJHVwcGVyQ29udGFpbmVyKTtcbiAgICB0aGlzLiR1cHBlckNvbnRhaW5lci5hcHBlbmQodGhpcy4kZHJvcERvd25XcmFwcGVyKTtcbiAgICB0aGlzLiRuYXZNZXRhLmFwcGVuZCh0aGlzLiRzZWFyY2gpO1xuICB9XG5cbiAgbW92ZU5hdmlnYXRpb25UYWJsZXQoKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCJtb3ZlIG5hdmlnYXRpb24gdGFibGV0XCIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLmRldGFjaCgpO1xuICAgIC8vIHRoaXMuJGxvd2VyQ29udGFpbmVyLmRldGFjaCgpO1xuICAgIHRoaXMuJHVwcGVyQ29udGFpbmVyLmFwcGVuZCh0aGlzLiRuYXZNZXRhKTtcbiAgICAvLyB0aGlzLiR1cHBlckNvbnRhaW5lci5hcHBlbmQodGhpcy4kbG93ZXJDb250YWluZXIpO1xuICAgIHRoaXMuJGRyb3BEb3duV3JhcHBlci5pbnNlcnRBZnRlcih0aGlzLiR1cHBlckNvbnRhaW5lcik7XG4gICAgdGhpcy4kZHJvcERvd25XcmFwcGVyLnByZXBlbmQodGhpcy4kc2VhcmNoKTtcbiAgfVxuXG4gIG1vdmVOYXZpZ2F0aW9uRGVrc3RvcCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIm1vdmUgbmF2aWdhdGlvbiBkZXNrdG9wXCIpO1xuXG4gICAgdGhpcy4kc2VhcmNoLmluc2VydEJlZm9yZSh0aGlzLiRkcm9wRG93bkNvbnRlbnQpO1xuXG4gIH1cblxuICBkaXNhYmxlTW9iaWxlTmF2KCkge1xuXG4gICAgLy8gY29uc29sZS5sb2coXCJOYXYgdHVybmVkIG9mZlwiKTtcbiAgICB0aGlzLm5hdk9wZW5Jbml0KGZhbHNlKTtcbiAgICB0aGlzLm5hdkNsb3NlKGZhbHNlKTtcbiAgICB0aGlzLm5hdkl0ZW1DbGljayhmYWxzZSk7XG4gICAgdGhpcy5nb2JhY2soZmFsc2UpO1xuICAgIHRoaXMuc3RhdGUubmF2RW5hYmxlZCA9IGZhbHNlO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiTmF2IHR1cm5lZCBvZmZcIik7XG4gICAgLypcbiAgICAgUmVtb3ZlIFN0eWxlcyBmcm9tIGVsZW1lbnQgJiByZXNldCBkcm9wZG93blxuICAgICAqL1xuICAgIHRoaXMuJG5hdkRyb3Bkb3duLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiXCIpO1xuICAgIHRoaXMuJGRyb3BEb3duQ29udGVudC5yZW1vdmVDbGFzcyhcIm1vdmUtb3V0XCIpO1xuICAgIGxldCBkcm9wZG93biA9IHRoaXMuJGRyb3BEb3duQ29udGVudC5maW5kKFwiLm5lYXQtc2Vjb25kYXJ5LWRyb3Bkb3duXCIpO1xuXG4gICAgZHJvcGRvd24uZWFjaCgoIGluZGV4LCBlbGVtICkgPT4ge1xuICAgICAgaWYgKCAhJChlbGVtKS5oYXNDbGFzcyhcImlzLWhpZGRlblwiKSApIHtcbiAgICAgICAgJChlbGVtKS5hZGRDbGFzcyhcImlzLWhpZGRlblwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgZW5hYmxlTW9iaWxlTmF2KCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiTmF2IHR1cm5lZCBvblwiKTtcbiAgICB0aGlzLm5hdk9wZW5Jbml0KHRydWUpO1xuICAgIHRoaXMubmF2Q2xvc2UodHJ1ZSk7XG4gICAgdGhpcy5uYXZJdGVtQ2xpY2sodHJ1ZSk7XG4gICAgdGhpcy5nb2JhY2sodHJ1ZSk7XG5cbiAgICB0aGlzLnN0YXRlLm5hdkVuYWJsZWQgPSB0cnVlO1xuXG4gIH1cblxuICBicmVha1BvaW50TW9iaWxlKCkge1xuICAgIGNvbnNvbGUubG9nKFwiQnJlYWtwb2ludCBNb2JpbGVcIik7XG5cbiAgICBpZiAoICF0aGlzLnN0YXRlLm5hdkVuYWJsZWQgKSB7XG4gICAgICB0aGlzLmVuYWJsZU1vYmlsZU5hdigpO1xuICAgIH1cbiAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uTW9iaWxlKCk7XG4gIH1cblxuICBicmVha1BvaW50VGFibGV0KCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IFRhYmxldFwiKTtcbiAgICBpZiAoICF0aGlzLnN0YXRlLm5hdkVuYWJsZWQgKSB7XG4gICAgICB0aGlzLmVuYWJsZU1vYmlsZU5hdigpO1xuICAgIH1cblxuICAgIHRoaXMubW92ZU5hdmlnYXRpb25UYWJsZXQoKTtcbiAgfVxuXG4gIGJyZWFrUG9pbnRMYXB0b3AoIHByZXZTdGF0ZSApIHtcbiAgICBjb25zb2xlLmxvZyhcIkJyZWFrcG9pbnQgTGFwdG9wXCIpO1xuXG4gICAgaWYgKCB0aGlzLnN0YXRlLm5hdkVuYWJsZWQgKSB7XG4gICAgICB0aGlzLmRpc2FibGVNb2JpbGVOYXYoKTtcbiAgICB9XG5cbiAgICAvLyBpZiBwcmV2IHN0YXRlIHdhcyB0YWJsZXQgZG8gdGhpczpcbiAgICBpZiAoIHByZXZTdGF0ZS5kZXNrdG9wID09PSBmYWxzZSB8fCBwcmV2U3RhdGUubW9iaWxlID09PSB0cnVlICkge1xuXG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uVGFibGV0KCk7XG4gICAgICB0aGlzLm1vdmVOYXZpZ2F0aW9uRGVrc3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIGJyZWFrUG9pbnREZXNrdG9wKCBwcmV2U3RhdGUgKSB7XG4gICAgY29uc29sZS5sb2coXCJCcmVha3BvaW50IERlc2t0b3BcIik7XG5cbiAgICBpZiAoIHByZXZTdGF0ZS5sYXB0b3AgPT09IGZhbHNlIHx8IHByZXZTdGF0ZS5tb2JpbGUgPT09IHRydWUgKSB7XG5cbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25UYWJsZXQoKTtcbiAgICAgIHRoaXMubW92ZU5hdmlnYXRpb25EZWtzdG9wKCk7XG4gICAgfVxuXG4gIH1cblxuICBzYWZhcmlSZXNpemVGaXgoKSB7XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZUlzb1RpbWVPdXQpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGNvbnRhaW5lciBoYXMgaXRlbXMgaW5zaWRlIGl0XG4gICAgaWYgKCBVdGlscy5icm93c2VyID09PSBcInNhZmFyaVwiICYmIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgLy8gcmVtb3ZlIGFuaW1hdGlvbiBjbGFzc2VzIHRlbXBvcmFyaWx5XG4gICAgICAkKHRoaXMuJG5hdkRyb3Bkb3duKS5yZW1vdmVDbGFzcyhcInNjZW5lX2VsZW1lbnQtLWZhZGVJblVwTmF2XCIpO1xuXG5cbiAgICAgIC8vIG9uIHJlc2l6ZSBjb21wbGV0ZSwgcmUtYWRkQ2xhc3MgZWxlbWVudHNcbiAgICAgIHRoaXMucmVJc29UaW1lT3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQodGhpcy4kbmF2RHJvcGRvd24pLmFkZENsYXNzKFwic2NlbmVfZWxlbWVudC0tZmFkZUluVXBOYXZcIik7XG4gICAgICB9LCA1MDApO1xuXG4gICAgfVxuICB9XG5cbiAgbmF2UmVzaXplKCkge1xuICAgIC8qXG4gICAgIE1vYmlsZVxuICAgICAqL1xuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLm1vYmlsZSApIHtcblxuICAgICAgLy8gaWYgc3RhdGUgbW9iaWxlID0gZmFsc2UgLSB0aGVuIHJ1biBicmVha3BvaW50IG1vYmlsZVxuICAgICAgLy8gaWYgaXRzIHRydWUgdGhlbiBza2lwIGN1cyBpdHMgYWxyZWFkeSBtb2JpbGVcbiAgICAgIGlmICggIXRoaXMuc3RhdGUubW9iaWxlICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRNb2JpbGUoKTtcbiAgICAgIH1cbiAgICAgIC8vIFR1cm4gbW9iaWxlIG9uXG5cbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IHRydWUsXG4gICAgICAgIG1vYmlsZTogdHJ1ZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgVGFibGV0XG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gICAgICAvLyB0YWJsZXQgYW5kIGhpZ2hlclxuICAgICAgLy8gZG8gb25jZVxuICAgICAgaWYgKCAhdGhpcy5zdGF0ZS50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMuYnJlYWtQb2ludFRhYmxldChwcmV2U3RhdGUpO1xuICAgICAgfVxuICAgICAgLy8gVHVybiBtb2JpbGUgb25cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiB0cnVlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBMYXB0b3BcbiAgICAgKi9cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG4gICAgICBsZXQgcHJldlN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgICAgIGlmICggIXRoaXMuc3RhdGUubGFwdG9wICkge1xuICAgICAgICB0aGlzLmJyZWFrUG9pbnRMYXB0b3AocHJldlN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogZmFsc2UsXG4gICAgICAgIG1vYmlsZTogZmFsc2UsXG4gICAgICAgIHRhYmxldDogZmFsc2UsXG4gICAgICAgIGxhcHRvcDogdHJ1ZSxcbiAgICAgICAgZGVza3RvcDogZmFsc2VcbiAgICAgIH07XG5cbiAgICB9XG5cbiAgICAvKlxuICAgICBEZXNrdG9wXG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMuZGVza3RvcCApIHtcblxuICAgICAgbGV0IHByZXZTdGF0ZSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgIGlmICggIXRoaXMuc3RhdGUuZGVza3RvcCApIHtcbiAgICAgICAgdGhpcy5icmVha1BvaW50RGVza3RvcChwcmV2U3RhdGUpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBzYWZhcmkgTmF2IHJlc2l6ZSBldmVudCBmaXhcbiAgICAgKi9cbiAgICB0aGlzLnNhZmFyaVJlc2l6ZUZpeCgpO1xuICB9XG5cbiAgbmF2TG9hZCgpIHtcbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5tb2JpbGUgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludE1vYmlsZSgpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiB0cnVlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcblxuICAgIH1cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLnRhYmxldCApIHtcblxuICAgICAgdGhpcy5icmVha1BvaW50VGFibGV0KHRoaXMuc3RhdGUpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbmF2RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiB0cnVlLFxuICAgICAgICBsYXB0b3A6IGZhbHNlLFxuICAgICAgICBkZXNrdG9wOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludExhcHRvcCh0aGlzLnN0YXRlKTtcbiAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgIG5hdkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtb2JpbGU6IGZhbHNlLFxuICAgICAgICB0YWJsZXQ6IGZhbHNlLFxuICAgICAgICBsYXB0b3A6IHRydWUsXG4gICAgICAgIGRlc2t0b3A6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA9PT0gVXRpbHMuYnBzLmRlc2t0b3AgKSB7XG5cbiAgICAgIHRoaXMuYnJlYWtQb2ludERlc2t0b3AodGhpcy5zdGF0ZSk7XG4gICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICBuYXZFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbW9iaWxlOiBmYWxzZSxcbiAgICAgICAgdGFibGV0OiBmYWxzZSxcbiAgICAgICAgbGFwdG9wOiBmYWxzZSxcbiAgICAgICAgZGVza3RvcDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBpbml0KCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKFwiTmF2IGxvYWRlZFwiKTtcblxuICAgIHRoaXMubmF2TG9hZCgpO1xuICAgIC8vIFNlYXJjaEJveC5pbml0KCk7XG5cbiAgICAvKioqKioqKioqKioqKioqKlxuICAgICBOQVYgUkVTSVpFIEVWRU5UXG4gICAgICoqKioqKioqKioqKioqKi9cblxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9ICggZXZlbnQgKSA9PiB7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICAgID8gc2V0VGltZW91dCh0aGlzLm5hdlJlc2l6ZS5iaW5kKHRoaXMpLCAzMDApXG4gICAgICAgIDogd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLm5hdlJlc2l6ZS5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG5cbiAgfVxufVxuXG5sZXQgTmF2ID0gbmV3IE5hdkNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBOYXY7IiwiZGVjbGFyZSB2YXIgU2Nyb2xsTWFnaWM6IGFueTtcbmNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgRGVzY09mZnNldEFuaW1hdGlvbiB7XG4gICR0aGlzOiBKUXVlcnk7XG4gIGlzX2Rlc2NfYW5pbWF0aW5nOiBib29sZWFuO1xuICBjb250cm9sbGVyOiBhbnk7XG4gIHNjZW5lOiBhbnk7XG4gIHNjZW5lMjogYW55O1xuXG4gIGNvbnN0cnVjdG9yKCBlbCApIHtcbiAgICB0aGlzLiR0aGlzID0gJChlbCk7XG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLnRhYmxldCApIHtcblxuICAgICAgLy8gRW5hYmxlIEFuaW1hdGlvblxuICAgICAgaWYgKCB0aGlzLmlzX2Rlc2NfYW5pbWF0aW5nID09PSBmYWxzZSApIHtcblxuICAgICAgICB0aGlzLmlzX2Rlc2NfYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kZXNjX29fYW5pbWF0ZSgpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLy8gZGlzYWJsZSBhbmltYXRpb25cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMudGFibGV0ICkge1xuXG4gICAgICB0aGlzLmlzX2Rlc2NfYW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgICAgIGlmICggdHlwZW9mIHRoaXMuc2NlbmUgPT09IFwib2JqZWN0XCIgKSB7XG5cbiAgICAgICAgdGhpcy5zY2VuZS5kZXN0cm95KHRydWUpO1xuICAgICAgICB0aGlzLnNjZW5lMi5kZXN0cm95KHRydWUpO1xuXG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBkZXNjX29fYW5pbWF0ZSgpIHtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMudGFibGV0ICkge1xuXG4gICAgICB0aGlzLmlzX2Rlc2NfYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgLy8gbmV3IHRpbWVsaW5lIGV2ZW50XG4gICAgICBsZXQgd2lwZUFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG4gICAgICAvLyBJbWFnZSBvbmUgcGxhY2VtZW50XG4gICAgICB3aXBlQW5pbWF0aW9uLmFkZChbXG4gICAgICAgIFR3ZWVuTWF4LmZyb21Ubyh0aGlzLiR0aGlzLmZpbmQoXCIuZGVzYy1vLWltYWdlLTFcIiksIDEsIHsgeVBlcmNlbnQ6IDAgfSwge1xuICAgICAgICAgIHlQZXJjZW50OiAtMjAsXG4gICAgICAgICAgZWFzZTogUG93ZXIwLmVhc2VJbk91dFxuICAgICAgICB9KVxuICAgICAgXSk7XG5cbiAgICAgIC8vIEltYWdlIDIgcGxhY2VtZW50XG4gICAgICBsZXQgd2lwZUFuaW1hdGlvbjIgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIHdpcGVBbmltYXRpb24yLmFkZChbXG4gICAgICAgIFR3ZWVuTWF4LmZyb21Ubyh0aGlzLiR0aGlzLmZpbmQoXCIuZGVzYy1vLWltYWdlLTJcIiksIDEsIHsgeVBlcmNlbnQ6IDAsIH0sIHtcbiAgICAgICAgICB5UGVyY2VudDogLTEwNSxcbiAgICAgICAgICBlYXNlOiBQb3dlcjAuZWFzZUluT3V0XG4gICAgICAgIH0pXG4gICAgICBdKTtcblxuXG4gICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuZXcgU2Nyb2xsTWFnaWMuQ29udHJvbGxlcigpO1xuXG4gICAgICB0aGlzLnNjZW5lID0gbmV3IFNjcm9sbE1hZ2ljLlNjZW5lKFxuICAgICAgICB7XG4gICAgICAgICAgdHJpZ2dlckVsZW1lbnQ6IHRoaXMuJHRoaXNbMF0sXG4gICAgICAgICAgZHVyYXRpb246IHRoaXMuJHRoaXMuaGVpZ2h0KCksXG4gICAgICAgICAgb2Zmc2V0OiAtMTAwXG4gICAgICAgIH0pXG4gICAgICAgIC5zZXRUd2Vlbih3aXBlQW5pbWF0aW9uKVxuICAgICAgICAvLyAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMSAoZHVyYXRpb246IEVsKVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAgIC5hZGRUbyh0aGlzLmNvbnRyb2xsZXIpO1xuXG4gICAgICB0aGlzLnNjZW5lMiA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgICAge1xuICAgICAgICAgIHRyaWdnZXJFbGVtZW50OiB0aGlzLiR0aGlzWzBdLFxuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLiR0aGlzLmhlaWdodCgpICsgMTAwLFxuICAgICAgICB9KVxuICAgICAgICAuc2V0VHdlZW4od2lwZUFuaW1hdGlvbjIpXG4gICAgICAgIC8vIC5hZGRJbmRpY2F0b3JzKHsgbmFtZTogXCIyIChkdXJhdGlvbjogRWwpXCIgfSkgLy8gYWRkIGluZGljYXRvcnMgKHJlcXVpcmVzIHBsdWdpbilcbiAgICAgICAgLmFkZFRvKHRoaXMuY29udHJvbGxlcik7XG4gICAgfVxuXG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgdGhpcy5kZXNjX29fYW5pbWF0ZSgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEZXNjT2Zmc2V0QW5pbWF0aW9uOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5kZWNsYXJlIHZhciBJc290b3BlOiBhbnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgR2FsbGVyeUNvbXBvbmVudCB7XG5cbiAgZ3JpZElkOiBzdHJpbmc7XG4gIGdhbGxlcnlfZ3JpZDogbnVtYmVyO1xuICBnYWxsZXJ5X3dyYXBwZXJfd2lkdGg6IG51bWJlcjtcbiAgJGZ1bGxHcmlkOiBKUXVlcnk7XG4gICRpc290b3BlR2FsbGVyeTogSlF1ZXJ5O1xuICAkZ2FsbGVyeUNvbnRhaW5lcjogSlF1ZXJ5O1xuICAkZ2FsbGVyeUl0ZW06IEpRdWVyeTtcbiAgJGZpbHRlcjogSlF1ZXJ5O1xuICAkZ3JpZDogYW55O1xuICBjdXJyZW50SGVpZ2h0OiBzdHJpbmc7XG4gIGN1cnJlbnRIZWlnaHRQWDogbnVtYmVyO1xuICByZUlzb1RpbWVPdXQ6IG51bWJlcjtcbiAgaXNDb250YWluZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ncmlkSWQgPSAkKFwiLmlubmVyLWNvbnRlbnQtbW9kdWxlXCIpLmNoaWxkcmVuKFwiZGl2XCIpLmF0dHIoXCJpZFwiKTtcbiAgICB0aGlzLiRmdWxsR3JpZCA9ICQoXCIjXCIgKyB0aGlzLmdyaWRJZCk7XG4gICAgdGhpcy4kZ2FsbGVyeUNvbnRhaW5lciA9ICQoXCIuZ2FsbGVyeS1jb250YWluZXJcIik7XG4gICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkgPSAkKFwiLmdhbGxlcnktaXNvdG9wZVwiKTtcbiAgICB0aGlzLiRnYWxsZXJ5SXRlbSA9ICQoXCIuZ2FsbGVyeS1pdGVtXCIpO1xuICAgIHRoaXMuJGZpbHRlciA9ICQoXCIuZmlsdGVyLWdyb3VwXCIpO1xuICB9XG5cbiAgc2V0dXBJc290b3BlKCkge1xuICAgIC8vIGluaXQgaXNvdG9wZVxuICAgIHRoaXMuJGdyaWQgPSB0aGlzLiRmdWxsR3JpZC5pc290b3BlKHtcbiAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcbiAgICAgIGl0ZW1TZWxlY3RvcjogXCIuZ2FsbGVyeS1pdGVtXCIsXG4gICAgICBpc0luaXRMYXlvdXQ6IGZhbHNlLFxuICAgICAgbWFzb25yeToge1xuICAgICAgICBcImNvbHVtbldpZHRoXCI6IFwiLmdyaWQtc2l6ZXJcIlxuICAgICAgfSxcbiAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogXCIuM3NcIlxuICAgIH0pO1xuICB9XG5cbiAgZ2FsbGVyeUlzb3RvcGVXcmFwcGVyKCkge1xuICAgIGxldCB3aW5kb3dXaWR0aFJlZiA9ICQod2luZG93KS5pbm5lcldpZHRoKCk7IC8vIGZvciBzY3JvbGwgYmFyIGZpeCBjdXJyZW50bHlcblxuICAgIC8vIElzIGNvbnRhaW5lciBvciBmdWxsIHdpZHRoP1xuICAgIGlmICggdGhpcy4kZ2FsbGVyeUNvbnRhaW5lci5oYXNDbGFzcyhcImNvbnRhaW5lclwiKSApIHtcbiAgICAgIHRoaXMuaXNDb250YWluZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vXG4gICAgaWYgKCB3aW5kb3dXaWR0aFJlZiA+IDE2MDAgJiYgdGhpcy5pc0NvbnRhaW5lZCA9PT0gZmFsc2UgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDU7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gNjAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAxO1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDk5MSApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMjtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSAxMTk5ICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDQ7XG4gICAgfVxuXG4gICAgaWYgKCAkKFwiLmdhbGxlcnktMy1ncmlkXCIpLmxlbmd0aCA+IDAgJiYgd2luZG93V2lkdGhSZWYgPiAxMjQ4ICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSAzO1xuICAgIH1cblxuICAgIGlmICggJChcIi5nYWxsZXJ5LTQtZ3JpZFwiKS5sZW5ndGggPiAwICYmIHdpbmRvd1dpZHRoUmVmID4gMTU4NCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gNDtcbiAgICB9XG5cbiAgICB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCA9ICQoXCIuZ2FsbGVyeS1jb250YWluZXJcIikud2lkdGgoKTtcblxuICAgIGlmICggdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggJSB0aGlzLmdhbGxlcnlfZ3JpZCA+IDAgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCA9IHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICsgKCB0aGlzLmdhbGxlcnlfZ3JpZCAtIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICUgdGhpcy5nYWxsZXJ5X2dyaWQpO1xuICAgIH1cbiAgICB0aGlzLiRpc290b3BlR2FsbGVyeS5jc3MoXCJ3aWR0aFwiLCB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCk7XG5cbiAgICByZXR1cm4gdGhpcy5nYWxsZXJ5X2dyaWQ7XG4gIH1cblxuICByZWxvYWRJc290b3BlKCkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZSgpO1xuICAgIHRoaXMuc2V0TWluSGVpZ2h0KCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIGNoZWNrIGlmIGhlaWdodCBpcyBhIHJvdW5kIG51bWJlciB0byBlbnN1cmUgbm8gMXB4IGlzc3Vlc1xuICAgICAgdGhpcy5jaGVja0NvbnRhaW5lckhlaWdodCgpO1xuICAgIH0sIDcwMCk7XG4gIH1cblxuICBzZXRNaW5IZWlnaHQoKSB7XG5cbiAgICBsZXQgaXRlbSA9ICQoXCIuZ2FsbGVyeS1pdGVtLndpZHRoMVwiKTtcblxuICAgIC8vIFNldCBtaW4gaGVpZ2h0IGRlcGVuZGluZyBvbmUgd2hhdCBjb250ZW50IHdhcyBmaWx0ZXJlZFxuICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGl0ZW0uY3NzKFwicGFkZGluZy1ib3R0b21cIik7XG4gICAgbGV0IGhlaWdodFN0ciA9IHRoaXMuY3VycmVudEhlaWdodC50b1N0cmluZygpO1xuICAgIHRoaXMuY3VycmVudEhlaWdodFBYID0gdGhpcy5weENvbnZlcnQoaGVpZ2h0U3RyKTtcblxuICAgIGlmICggdGhpcy5jdXJyZW50SGVpZ2h0UFggIT09IDAgKSB7XG5cbiAgICAgIHRoaXMuJGlzb3RvcGVHYWxsZXJ5LmNzcyhcIm1pbi1oZWlnaHRcIiwgTWF0aC5yb3VuZCh0aGlzLmN1cnJlbnRIZWlnaHRQWCkpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0UFggPSBpdGVtLmhlaWdodCgpO1xuXG4gICAgICB0aGlzLiRpc290b3BlR2FsbGVyeS5jc3MoXCJtaW4taGVpZ2h0XCIsIE1hdGgucm91bmQodGhpcy5jdXJyZW50SGVpZ2h0UFgpKTtcblxuICAgIH1cbiAgfVxuXG4gIHB4Q29udmVydCggb2JqZWN0SGVpZ2h0OiBzdHJpbmcgKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KG9iamVjdEhlaWdodC5zbGljZSgwLCAtMikpO1xuICB9XG5cbiAgYWRkSW1hZ2VUcmFuc2l0aW9uKCkge1xuICAgIC8vIGFkZCB0cmFuc2l0aW9uIGZvciBpbnRybyBhbmltYXRpb25cbiAgICB0aGlzLiRnYWxsZXJ5SXRlbS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiNjAwbXNcIik7XG4gIH1cblxuICBsb2FkSW1hZ2VzSW4oKSB7XG4gICAgdGhpcy4kZ3JpZC5pc290b3BlKFwib25jZVwiLCBcImFycmFuZ2VDb21wbGV0ZVwiLCAoKSA9PiB7XG5cbiAgICAgIC8vIGZhZGUgaW5cbiAgICAgIHRoaXMuJGdhbGxlcnlJdGVtLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyByZW1vdmUgYW5pbWF0aW9uIGZvciBzbW9vdGggZmlsdGVyaW5nIGFmdGVyIGltYWdlcyBoYXZlIGxvYWRlZCBpblxuICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgICB0aGlzLiRnYWxsZXJ5SXRlbS5jc3MoXCJ0cmFuc2l0aW9uLWR1cmF0aW9uXCIsIFwiMG1zXCIpO1xuICAgICAgfSwgNTAwKTtcblxuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tDb250YWluZXJIZWlnaHQoKSB7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPT09IFV0aWxzLmJwcy5sYXB0b3AgJiYgdGhpcy4kaXNvdG9wZUdhbGxlcnkuaGFzQ2xhc3MoXCJ3aWR0aC1jb250YWluZWRcIikpIHtcblxuICAgICAgbGV0IGN1cnJlbnRIZWlnaHQgPSB0aGlzLiRpc290b3BlR2FsbGVyeS5oZWlnaHQoKTtcblxuICAgICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkuY3NzKFwiaGVpZ2h0XCIsIGN1cnJlbnRIZWlnaHQgLSAxICsgXCJweFwiKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25SZXNpemUoKSB7XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5yZUlzb1RpbWVPdXQpO1xuXG4gICAgLy8gY2hlY2sgaWYgdGhlIGNvbnRhaW5lciBoYXMgaXRlbXMgaW5zaWRlIGl0XG4gICAgaWYgKCB0aGlzLiRnYWxsZXJ5Q29udGFpbmVyLmxlbmd0aCA+IDAgKSB7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwicmVzaXplIGV2ZW50XCIpO1xuICAgICAgXG4gICAgICAvLyBzZXQgZ3JpZCBkaW1lbnNpb25cbiAgICAgIHRoaXMuZ2FsbGVyeUlzb3RvcGVXcmFwcGVyKCk7XG5cbiAgICAgIC8vIG9uIHJlc2l6ZSBjb21wbGV0ZSwgcmUtYWRqdXN0IGdyaWRcbiAgICAgIHRoaXMucmVJc29UaW1lT3V0ID0gc2V0VGltZW91dCh0aGlzLnJlbG9hZElzb3RvcGUuYmluZCh0aGlzKSwgNTAwKTtcblxuICAgIH1cblxuICB9XG5cbiAgb25GaWx0ZXJDbGljayggZWwsIGVsMiApIHtcbiAgICBsZXQgJHRoaXMgPSAkKGVsMi50b0VsZW1lbnQpO1xuXG4gICAgJHRoaXMucGFyZW50KCkuY2hpbGRyZW4oXCJsaVwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICB9KTtcblxuICAgICR0aGlzLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICBsZXQgZmlsdGVyVmFsdWUgPSAkdGhpcy5hdHRyKFwiZGF0YS1maWx0ZXJcIik7XG5cbiAgICB0aGlzLnJlRmlsdGVyKGZpbHRlclZhbHVlKTtcbiAgfVxuXG4gIHJlRmlsdGVyKCBpdGVtICkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZSh7XG4gICAgICBmaWx0ZXI6IGl0ZW1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgY29uc29sZS5sb2coXCJJc290b3BlIEluaXRcIik7XG5cbiAgICAvLyBBZGQgdHJhbnNpdGlvbiB0byBhbmltYXRlIGltYWdlIGluIGdyYWNlZnVsbHlcbiAgICB0aGlzLmFkZEltYWdlVHJhbnNpdGlvbigpO1xuXG4gICAgLy8gU2V0dXAgSXNvdG9wZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICB0aGlzLnNldHVwSXNvdG9wZSgpO1xuXG4gICAgLy8gQ3JlYXRlIHBlcmZlY3QgZ3JpZFxuICAgIHRoaXMuZ2FsbGVyeUlzb3RvcGVXcmFwcGVyKCk7XG5cbiAgICAvLyBkZWxheSBpc290b3BlIGluaXQgdXNpbmcgaGVscGVyIGZ1bmN0aW9uIHRoYXQgZmlyZXMgb24gcmVzaXplXG4gICAgc2V0VGltZW91dCh0aGlzLnJlbG9hZElzb3RvcGUuYmluZCh0aGlzKSwgMTAwMCk7XG5cbiAgICAvLyBBbmltYXRlIEltYWdlcyBpbiBvbkxvYWRcbiAgICB0aGlzLmxvYWRJbWFnZXNJbigpO1xuXG4gICAgLy8gQWRkIGZpbHRlciBvbiBDbGlja1xuICAgIGxldCAkdGhpcyA9IHRoaXM7XG4gICAgdGhpcy4kZmlsdGVyLm9uKFwiY2xpY2tcIiwgXCJsaVwiLCB0aGlzLm9uRmlsdGVyQ2xpY2suYmluZCh0aGlzLCAkdGhpcykpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XG4gIH1cblxufVxuXG5sZXQgSXNvdG9wZUdhbGxlcnkgPSBuZXcgR2FsbGVyeUNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBJc290b3BlR2FsbGVyeTsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIFNsaWRlckNvbXBvbmVudCB7XG4gIGdhbGxlcnk6IEpRdWVyeTtcbiAgY29udGFpbmVyOiBKUXVlcnk7XG4gIGNsb3NlQnRuOiBKUXVlcnk7XG4gIG5leHRCdG46IEpRdWVyeTtcbiAgcHJldkJ0bjogSlF1ZXJ5O1xuICBpbmRleDogbnVtYmVyO1xuICBjdXJyZW50U2xpZGU6IG51bWJlcjtcbiAgdG90YWxTbGlkZTogbnVtYmVyO1xuICBjb3VudFRvdGFsOiBKUXVlcnk7XG4gIGN1cnJlbnRDb3VudDogSlF1ZXJ5O1xuICBzbGlkZXJPcGVuOiBib29sZWFuO1xuICByZXNpemVUaW1lcjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCBlbCApIHtcbiAgICB0aGlzLmNvbnRhaW5lciA9ICQoZWwpO1xuICAgIHRoaXMuZ2FsbGVyeSA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuaGVhZGVyLXNsaWRlci1nYWxsZXJ5XCIpO1xuICAgIHRoaXMuY2xvc2VCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmhlYWRlci1zbGlkZXItY2xvc2VcIik7XG4gICAgdGhpcy5uZXh0QnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zbGlkZXItbmF2aWdhdGlvbi1uZXh0XCIpO1xuICAgIHRoaXMucHJldkJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyLW5hdmlnYXRpb24tcHJldlwiKTtcbiAgICB0aGlzLmNvdW50VG90YWwgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnRvdGFsXCIpO1xuICAgIHRoaXMuY3VycmVudENvdW50ID0gdGhpcy5jb250YWluZXIuZmluZChcIi5jdXJyZW50XCIpO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMuY3VycmVudFNsaWRlID0gdGhpcy5pbmRleCArIDE7XG4gICAgdGhpcy5zbGlkZXJPcGVuID0gZmFsc2U7XG4gIH1cblxuICBnZXRDdXJyZW50U2xpZGVFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeS5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICB9XG5cbiAgZ2V0VG90YWxTbGlkZXMoKTogbnVtYmVyIHtcbiAgICBsZXQgY291bnQgPSB0aGlzLmdhbGxlcnkuY2hpbGRyZW4oXCJsaVwiKS5sZW5ndGg7XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U2xpZGU7XG4gIH1cblxuICB1cGRhdGVDdXJyZW50U2xpZGUoIGV2ZW50ICkge1xuXG4gICAgaWYgKCBldmVudCA9PT0gXCJyaWdodFwiICkge1xuICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGUrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmRleC0tO1xuICAgICAgdGhpcy5jdXJyZW50U2xpZGUtLTtcbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZU5hdiggaW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IEpRdWVyeSApIHtcblxuICAgIC8vIHVwZGF0ZSBudW1iZXJzIG9uIHNjcmVlblxuICAgIHRoaXMuY3VycmVudENvdW50Lmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gICAgLy8gRW5hYmxlL0Rpc2FibGUgYXJyb3cgYnRuc1xuICAgIHRoaXMucHJldkJ0bi5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6Zmlyc3QtY2hpbGRcIikpO1xuICAgIHRoaXMubmV4dEJ0bi5wYXJlbnQoXCJsaVwiKS50b2dnbGVDbGFzcyhcInNsaWRlci1oaWRkZW5cIiwgc2VsZWN0ZWQuaXMoXCI6bGFzdC1jaGlsZFwiKSk7XG4gIH1cblxuICB1cGRhdGVTbGlkZSggZGlyZWN0aW9uICkge1xuXG4gICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2xhc3MsIHRoZW4gbW92ZSBsZWZ0XG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKS5hZGRDbGFzcyhcImxlZnRcIik7XG4gICAgICBjdXJyZW50U2xpZGUubmV4dCgpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2xhc3MsIHRoZW4gbW92ZSBsZWZ0XG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIGN1cnJlbnRTbGlkZS5wcmV2KCkuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGluZGV4XG4gICAgdGhpcy51cGRhdGVDdXJyZW50U2xpZGUoZGlyZWN0aW9uKTtcblxuICAgIC8vIHVwZGF0ZSBOYXZpZ2F0aW9uXG4gICAgdGhpcy51cGRhdGVOYXYodGhpcy5pbmRleCwgdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuICB9XG5cbiAgYXJyb3dIYW5kbGVyKCBldmVudCApIHtcblxuICAgIC8vIGNoZWNrIHdoaWNoIGtleSB3YXMgcHJlc3NlZCBhbmQgbWFrZSBzdXJlIHRoZSBzbGlkZSBpc24ndCB0aGUgYmVnaW5uaW5nIG9yIHRoZSBsYXN0IG9uZVxuICAgIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInJpZ2h0XCIgJiYgdGhpcy5jdXJyZW50U2xpZGUgIT09IHRoaXMuZ2V0VG90YWxTbGlkZXMoKSApIHtcblxuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgJiYgdGhpcy5zbGlkZXJPcGVuICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDw9IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJyaWdodFwiKTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJsZWZ0XCIgJiYgdGhpcy5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuc2xpZGVyT3BlbiApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDw9IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cblxuICBvcGVuU2xpZGVyKCBlbCwgZXZlbnQgKSB7XG4gICAgLy8gZWwgPSB0aGlzXG4gICAgLy8gZWwyIGlzIGV2ZW50XG4gICAgaWYgKCAhdGhpcy5jb250YWluZXIuaGFzQ2xhc3MoXCJpcy1hY3RpdmVcIikgJiYgJChldmVudC5jdXJyZW50VGFyZ2V0KS5pcyh0aGlzLmdhbGxlcnkpICkge1xuXG4gICAgICB0aGlzLnNsaWRlck9wZW4gPSB0cnVlO1xuXG4gICAgICB0aGlzLmNvbnRhaW5lclxuICAgICAgICAuYWRkQ2xhc3MoXCJpcy1hY3RpdmVcIilcbiAgICAgICAgLm9uZShcbiAgICAgICAgICBcIndlYmtpdFRyYW5zaXRpb25FbmQgXCIgK1xuICAgICAgICAgIFwib3RyYW5zaXRpb25lbmQgXCIgK1xuICAgICAgICAgIFwib1RyYW5zaXRpb25FbmQgXCIgK1xuICAgICAgICAgIFwibXNUcmFuc2l0aW9uRW5kIFwiICtcbiAgICAgICAgICBcInRyYW5zaXRpb25lbmRcIiwgKCkgPT4ge1xuXG4gICAgICAgICAgJChcImJvZHksaHRtbFwiKVxuICAgICAgICAgICAgLmFuaW1hdGUoeyBcInNjcm9sbFRvcFwiOiB0aGlzLmNvbnRhaW5lci5vZmZzZXQoKS50b3AgfSwgMjAwKTtcblxuICAgICAgICAgIC8vIENsb3NlIEJ0biBhbmltYXRlIGluXG4gICAgICAgICAgbGV0IGNsb3NlQnRuQW5pbWF0aW9uID0gVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgeDogLTMwLFxuICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0LFxuICAgICAgICAgICAgZGVsYXk6IC4zXG4gICAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlU2xpZGVyKCBlICkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVDbGFzcyhcImlzLWFjdGl2ZVwiKTtcblxuICAgIHRoaXMuc2xpZGVyT3BlbiA9IGZhbHNlO1xuXG4gICAgVHdlZW5MaXRlXG4gICAgICAudG8oJCh3aW5kb3cpLCAuNSxcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvOiB7IHk6IDAgfSwgZWFzZTogUG93ZXIyLmVhc2VPdXQsXG4gICAgICAgICAgZGVsYXk6IC41XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICBsZXQgY2xvc2VCdG5BbmltYXRpb24gPSBUd2Vlbk1heC50byh0aGlzLmNsb3NlQnRuLCAuMywge1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIHo6IC4wMDEsXG4gICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0LFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICBUd2Vlbk1heC50byh0aGlzLmNsb3NlQnRuLCAuMywge1xuICAgICAgICAgIHJpZ2h0OiA1MFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrU2l6ZSgpIHtcblxuICAgIC8vIE9uIHJlc2l6ZSBlbmQgLSBjaGVjayB0byBlbmFibGUgY2xpY2tzIGZvciBkZXNrdG9wIG9yIHJlbW92ZSB0aGVtXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuICAgIHRoaXMucmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gdGhpcztcbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgICB0aGlzLmdhbGxlcnkub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TbGlkZXIuYmluZCh0aGlzLCAkdGhpcykpO1xuICAgICAgICB0aGlzLmNsb3NlQnRuLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZVNsaWRlci5iaW5kKHRoaXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZ2FsbGVyeS5vZmYoKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5vZmYoKTtcbiAgICAgIH1cblxuICAgIH0sIDQwMCk7XG5cbiAgfVxuXG4gIGluaXQoKSB7XG5cbiAgICAvLyBDcmVhdGUgQmluZGluZyBFdmVudHNcbiAgICB0aGlzLmNoZWNrU2l6ZSgpO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG4gICAgLy8gTGVmdCBhbmQgcmlnaHQgZXZlbnRzXG4gICAgdGhpcy5uZXh0QnRuLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcInJpZ2h0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5wcmV2QnRuLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcImxlZnRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIC8vIEpxdWVyeSBrZXlzIHBsdWdpblxuICAgICQoZG9jdW1lbnQpXG4gICAgICAuYmluZChcImtleWRvd25cIiwgXCJsZWZ0XCIsIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpXG4gICAgICAuYmluZChcImtleWRvd25cIiwgXCJlc2NcIiwgdGhpcy5jbG9zZVNsaWRlci5iaW5kKHRoaXMpKVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwicmlnaHRcIiwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAvLyB1cGRhdGUgbmF2IG9uIGZpcnN0IGxvYWRcbiAgICB0aGlzLnVwZGF0ZU5hdih0aGlzLmluZGV4LCB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKSk7XG5cbiAgICAvLyBzZXQgdG90YWwgc2xpZGVzIG51bWJlclxuICAgIHRoaXMuY291bnRUb3RhbC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldFRvdGFsU2xpZGVzKCkpKTtcbiAgfVxufVxuXG4vLyBsb29wIHRocm91Z2ggZWFjaCBoZWFkZXIgc2xpZGVyIG9iamVjdCBvbiB0aGUgcGFnZVxuY2xhc3MgSGVhZGVyU2xpZGVyQ29tcG9uZW50IHtcblxuICBpdGVtSW5mb1dyYXBwZXI6IEpRdWVyeTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLml0ZW1JbmZvV3JhcHBlciA9ICQoXCIuaGVhZGVyLXNsaWRlci1jb250YWluZXJcIik7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiSGVhZGVyIFNsaWRlciBpbml0XCIpO1xuXG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgLy8gUGFzcyBcInRoaXNcIiB0byBlYWNoIG5ldyBIZWFkZXIgc2xpZGVyIGNvbXBvbmVudFxuICAgICAgbGV0IHNsaWRlciA9IG5ldyBTbGlkZXJDb21wb25lbnQoZWwpO1xuICAgICAgc2xpZGVyLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmxldCBIZWFkZXJTbGlkZXIgPSBuZXcgSGVhZGVyU2xpZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlclNsaWRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cblxuY2xhc3MgU3ZnSGVhZGVyQ29tcG9uZW50IHtcbiAgc3ZnOiBKUXVlcnk7XG4gIGhlaWdodDogbnVtYmVyO1xuICB3aW5kb3c6IEpRdWVyeTtcbiAgd2luV2lkdGg6IG51bWJlcjtcbiAgcHJvcG9ydGlvbjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3ZnID0gJChcIi5kaXZpZGVyLXN2Z1wiKTtcbiAgICB0aGlzLndpbmRvdyA9ICQod2luZG93KTtcbiAgICB0aGlzLnByb3BvcnRpb24gPSAxODtcbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2luV2lkdGggLyB0aGlzLnByb3BvcnRpb247XG4gIH1cblxuICBfc2V0V2luZG93V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gJCh3aW5kb3cpLndpZHRoKCk7XG4gIH1cblxuICBfc2V0U3ZnSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IGhlaWdodCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCkgLyAxODtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICByZXNpemVTdmcoKSB7XG5cbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy5fc2V0V2luZG93V2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMuX3NldFN2Z0hlaWdodCgpO1xuXG4gICAgLy8gc2V0IHdpZHRoIG9mIGl0ZW1cbiAgICAvLyB0aGlzLnN2Zy5hdHRyKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG4gICAgdGhpcy5zdmcuY3NzKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG5cbiAgICAvLyBzZXQgaGVpZ2h0IHByb3BvcnRpb24gb2YgMjhcbiAgICB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN2Zy5oZWlnaHQodGhpcy5oZWlnaHQpO1xuICB9XG5cbiAgYW5pbWF0ZUluKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiQW5pbWF0ZSBJblwiKTtcblxuICAgIHRoaXMuc3ZnID0gJChcIi5kaXZpZGVyLXN2Z1wiKTtcbiAgICB0aGlzLnByb3BvcnRpb24gPSAxODtcbiAgICB0aGlzLndpbmRvdyA9ICQod2luZG93KTtcbiAgICB0aGlzLndpbldpZHRoID0gdGhpcy53aW5kb3cud2lkdGgoKTtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud2luV2lkdGggLyB0aGlzLnByb3BvcnRpb247XG5cbiAgICAvLyBzZXQgd2lkdGggb2YgaXRlbVxuICAgIHRoaXMuc3ZnLmF0dHIoXCJ3aWR0aFwiLCB0aGlzLndpbldpZHRoKTtcblxuICAgIC8vIHNldCBoZWlnaHQgcHJvcG9ydGlvbiBvZiAyOFxuICAgIHRoaXMuc3ZnLmF0dHIoXCJoZWlnaHRcIiwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuc3ZnLmhlaWdodCh0aGlzLmhlaWdodCk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy5zdmcsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIGJvdHRvbTogXCItM3B4XCIsXG4gICAgfSk7XG4gIH1cblxuICBsb2FkRGl2aWRlcigpIHtcbiAgICBsZXQgeSA9IFV0aWxzLmJyZWFrcG9pbnQgPCBVdGlscy5icHMudGFibGV0ID8gMCA6IDUwO1xuICAgIFR3ZWVuTGl0ZS50byh0aGlzLnN2ZywgLjEsIHtcbiAgICAgIHk6IHksXG4gICAgICB6OiBcIi4wMDFcIixcbiAgICAgIHdpZHRoOiB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpLFxuICAgICAgaGVpZ2h0OiB0aGlzLl9zZXRTdmdIZWlnaHQoKSxcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIixcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgdGhpcy5zdmcucGFyZW50KFwiZGl2XCIpLmNzcyhcIm9wYWNpdHlcIiwgMSk7XG4gICAgICAgIHRoaXMuc3ZnLmFkZENsYXNzKFwibS1wYWdlIHNjZW5lX2VsZW1lbnQgc2NlbmVfZWxlbWVudC0tZmFkZWludXBEaXZpZGVyXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlN2ZyBoZWFkZXIgbG9hZGVkXCIpO1xuXG4gICAgLy8gdGhpcy5zdmcuaGVpZ2h0KHRoaXMuX3NldFN2Z0hlaWdodCgpKTtcbiAgICAvLyB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuX3NldFN2Z0hlaWdodCgpKTtcblxuICAgIHRoaXMubG9hZERpdmlkZXIoKTtcblxuXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMucmVzaXplU3ZnLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cbn1cblxubGV0IFN2Z0hlYWRlciA9IG5ldyBTdmdIZWFkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU3ZnSGVhZGVyOyIsImNvbnN0ICQgPSBqUXVlcnk7XG4vLyBUT0RPOiBTaWRlYmFyIGltYWdlIGxvYWRpbmdcbmNsYXNzIEltYWdlTG9hZGVyQ29tcG9uZW50IHtcbiAgYXJyOiBzdHJpbmdbXTtcbiAgYm9keTogSlF1ZXJ5O1xuICBjb250ZW50OiBKUXVlcnk7XG4gIGhlcm86IEpRdWVyeTtcbiAgaGFzSGVybzogbnVtYmVyO1xuICBiZ0ltYWdlOiBKUXVlcnk7XG4gIGhhc0JnSW1hZ2U6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFyciA9IFtdO1xuICAgIHRoaXMuYm9keSA9ICQoXCJib2R5XCIpO1xuICAgIHRoaXMuY29udGVudCA9ICQoXCIjY29udGVudFwiKTtcbiAgICB0aGlzLmhlcm8gPSAkKFwiLmhlcm9cIik7XG4gICAgdGhpcy5oYXNIZXJvID0gdGhpcy5oZXJvLmxlbmd0aDtcbiAgICB0aGlzLmJnSW1hZ2UgPSAkKFwiLmltZy1sb2FkZXItYmdcIik7XG4gICAgdGhpcy5oYXNCZ0ltYWdlID0gdGhpcy5iZ0ltYWdlLmxlbmd0aDtcbiAgfVxuXG4gIGFuaW1hdGVCbG9nUHJpbWFyeSgpOiB2b2lkIHtcbiAgICBsZXQgYmxvZ1ByaW1hcnkgPSAkKFwiLnByaW1hcnlcIik7XG4gICAgbGV0IGJsb2dCZ0ltYWdlID0gYmxvZ1ByaW1hcnkuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKTtcblxuICAgIGlmICggYmxvZ0JnSW1hZ2UgIT09IFwibm9uZVwiICkge1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgVHdlZW5MaXRlXG4gICAgICAgICAgLnRvKGJsb2dQcmltYXJ5LCAuMyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgejogXCIuMDAxXCIsXG4gICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgIH0sIDMwMCk7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlXG4gIC8vIGFuaW1hdGVIZXJvSGVhZGVyKCk6IHZvaWQge1xuICAvLyAgIGxldCBiID0gdGhpcy5oZXJvLmZpbmQoXCIuaGVyby1iYWNrZ3JvdW5kXCIpLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIik7XG4gIC8vXG4gIC8vICAgaWYgKCBiICE9PSBcIm5vbmVcIiApIHtcbiAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAvL1xuICAvLyAgICAgICB0aGlzLmhlcm8uYWRkQ2xhc3MoXCJsb2FkZWRcIik7XG4gIC8vXG4gIC8vICAgICAgIFR3ZWVuTGl0ZVxuICAvLyAgICAgICAgIC50byh0aGlzLmhlcm8sIC40LFxuICAvLyAgICAgICAgICAge1xuICAvLyAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAvLyAgICAgICAgICAgfVxuICAvLyAgICAgICAgICk7XG4gIC8vICAgICB9LCAzMDApO1xuICAvLyAgIH0gZWxzZSB7XG4gIC8vXG4gIC8vICAgICB0aGlzLmhlcm8uYWRkQ2xhc3MoXCJsb2FkZWRcIik7XG4gIC8vXG4gIC8vICAgfVxuICAvLyB9XG5cbiAgYW5pbWF0ZUJsb2dBcnRpY2xlcygpOiB2b2lkIHtcbiAgICBsZXQgYW5pbWF0ZSA9IG5ldyBUaW1lbGluZU1heCgpO1xuXG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5hcnIubGVuZ3RoOyBpKysgKSB7XG4gICAgICBhbmltYXRlLnRvKHRoaXMuYXJyWyBpIF0sIDAuMSwgeyBvcGFjaXR5OiBcIjFcIiwgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIiB9KTtcbiAgICB9XG4gIH1cblxuICBwcmVsb2FkSW1hZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuYXJyID0gW107XG5cbiAgICB0aGlzLmNvbnRlbnQuaW1hZ2VzTG9hZGVkKHsgYmFja2dyb3VuZDogdHJ1ZSB9LCAoKSA9PiB7XG5cbiAgICAgICAgLy8gQmxvZyBwcmltYXJ5IGFydGljbGVcbiAgICAgICAgdGhpcy5ib2R5Lmhhc0NsYXNzKFwiYmxvZ1wiKSA/IHRoaXMuYW5pbWF0ZUJsb2dQcmltYXJ5KCkgOiBcIlwiO1xuXG4gICAgICAgIC8vIEhlcm8gaGVhZGVyIGludHJvXG4gICAgICAgIC8vIHRoaXMuaGFzSGVybyA+IDAgPyB0aGlzLmFuaW1hdGVIZXJvSGVhZGVyKCkgOiBcIlwiO1xuICAgICAgICB0aGlzLmhhc0JnSW1hZ2UgPiAwID8gdGhpcy5iZ0ltYWdlLmFkZENsYXNzKFwibG9hZGVkXCIpIDogXCJcIjtcblxuICAgICAgfSlcbiAgICAgIC5hbHdheXMoZnVuY3Rpb24gKCBpbnN0YW5jZSApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIGxvYWRlZFwiKTtcbiAgICAgIH0pXG4gICAgICAuZG9uZSgoIGluc3RhbmNlICkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFsbCBpbWFnZXMgc3VjY2Vzc2Z1bGx5IGxvYWRlZFwiKTtcblxuICAgICAgICAvLyBBbmltYXRpb24gZm9yIEJsb2cgaW5kZXggaG9tZXBhZ2VcbiAgICAgICAgdGhpcy5hbmltYXRlQmxvZ0FydGljbGVzKCk7XG4gICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoXCJpbWdMb2FkZWRcIik7XG4gICAgICAgIFxuICAgICAgICAvLyBFeGFtcGxlIG9uIGhvdyB0byB0cmlnZ2VyIGV2ZW50cyBlbHNld2hlcmVcbiAgICAgICAgLy8gJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIC8vICAgY29uc29sZS5sb2coXCJpbWFnZSBsb2FkZWQgY3VzdG9tIGV2ZW50XCIpO1xuICAgICAgICAvLyB9KTtcblxuICAgICAgfSlcbiAgICAgIC5mYWlsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIGxvYWRlZCwgYXQgbGVhc3Qgb25lIGlzIGJyb2tlblwiKTtcbiAgICAgIH0pXG4gICAgICAucHJvZ3Jlc3MoKCBpbnN0YW5jZSwgaW1hZ2UgKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBpbWFnZS5pc0xvYWRlZCA/IFwibG9hZGVkXCIgOiBcImJyb2tlblwiO1xuXG4gICAgICAgIGlmICggcmVzdWx0ICkge1xuICAgICAgICAgIHRoaXMuYXJyLnB1c2goaW1hZ2UuaW1nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImltYWdlIGlzIFwiICsgcmVzdWx0ICsgXCIgZm9yIFwiICsgaW1hZ2UuaW1nLnNyYyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG5cbiAgICBjb25zb2xlLmxvZyhcIkltYWdlIFByZWxvYWRlciBNb2R1bGVcIik7XG5cbiAgICB0aGlzLnByZWxvYWRJbWFnZXMoKTtcbiAgfVxufVxuXG5sZXQgSW1hZ2VMb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMb2FkZXI7IiwiZGVjbGFyZSB2YXIgU2Nyb2xsTWFnaWM6IGFueTtcbmNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBEZXNjT2Zmc2V0QW5pbWF0aW9uIGZyb20gXCIuL2Rlc2Mtby1hbmltYXRpb25cIjtcblxuY2xhc3MgQW5pbWF0aW9uQ29tcG9uZW50IHtcblxuICBjb250YWluZXI6IEpRdWVyeTtcbiAgaXRlbTogSlF1ZXJ5O1xuICBtU2NlbmU6IEpRdWVyeTtcbiAgc2VydmljZVNpZGVCYXI6IEpRdWVyeTtcbiAgZGVzY09mZnNldDogSlF1ZXJ5O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChcIi5wcm9jZXNzLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLml0ZW0gPSAkKFwiLnByb2Nlc3MtaXRlbS1jb250YWluZXJcIik7XG4gICAgdGhpcy5tU2NlbmUgPSAkKFwiLm0tc2NlbmVcIik7XG4gICAgdGhpcy5zZXJ2aWNlU2lkZUJhciA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gICAgdGhpcy5kZXNjT2Zmc2V0ID0gJChcIi5kZXNjLW8tYW5pbWF0ZVwiKTtcbiAgfVxuXG4gIHByb2Nlc3NBbmltYXRlSW4oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgIGxldCBpdGVtID0gdGhpcy5pdGVtO1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcbiAgICBsZXQgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICB7XG4gICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5wcm9jZXNzLWNvbnRhaW5lclwiLFxuICAgICAgICBkdXJhdGlvbjogY29udGFpbmVyLmhlaWdodCgpLFxuICAgICAgICAvLyBvZmZzZXQ6IHRoaXMuYXNpZGVPZmZzZXQsXG4gICAgICB9KVxuICAgICAgLm9uKFwiZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdGVtLmZpbmQoXCIucHJvY2Vzcy1pdGVtLWlubmVyXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICAgIGNvbnRhaW5lci5maW5kKFwiaW1nXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICB9KVxuICAgICAgLy8gLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBvZmZzZXQ/KVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAuYWRkVG8oY29udHJvbGxlcik7XG4gIH1cblxuICBhbmltYXRlV2luZG93VG9wKCkge1xuICAgIGNvbnNvbGUubG9nKFwiYW5pbWF0ZSBUb3BcIik7XG4gICAgVHdlZW5MaXRlXG4gICAgICAudG8oJCh3aW5kb3cpLCAuMyxcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvOiB7XG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgYW5pbWF0ZVNlcnZpY2VTaWRlYmFyT3V0KCkge1xuXG4gICAgaWYgKCB0aGlzLnNlcnZpY2VTaWRlQmFyLmxlbmd0aCA+IDAgKSB7XG5cbiAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLnNlcnZpY2VTaWRlQmFyLCAuMywge1xuICAgICAgICB4OiBcIi0xMDBcIixcbiAgICAgICAgejogXCIuMDAxXCIsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiLFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHNpZGViYXIgaHRtbCBlbGVtZW50IHNvIGl0IGRvZXNudCBzaG93IHVwIGFnYWluIHdoZW4gc2Nyb2xsaW5nIHVwXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlU2lkZUJhci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBUd2VlbkxpdGUudG8oJChcIi5zZXJ2aWNlLXNpZGViYXItbm9zdGlja1wiKSwgLjMsIHtcbiAgICAgICAgeDogXCItMTAwXCIsXG4gICAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIixcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIC8vIHJlbW92ZSBzaWRlYmFyIGh0bWwgZWxlbWVudCBzbyBpdCBkb2VzbnQgc2hvdyB1cCBhZ2FpbiB3aGVuIHNjcm9sbGluZyB1cFxuICAgICAgICAgIHRoaXMuc2VydmljZVNpZGVCYXIucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBsb2FkVXJsKCB1cmwgKSB7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfVxuXG4gIG1haW5Db250ZW50QW5pbWF0aW9uT3V0KCBjYWxsYmFjayApIHtcblxuICAgIC8vIExvYWQgaW4gYW5pbWF0aW9ucyBoZXJlXG4gICAgdGhpcy5hbmltYXRlU2VydmljZVNpZGViYXJPdXQoKTtcblxuXG4gICAgdGhpcy5tU2NlbmUuYWRkQ2xhc3MoXCJpcy1leGl0aW5nXCIpXG4gICAgICAvLyBJZiBoYXMgd2Via2l0QW5pbWF0aW9uRW5kIC0gaXQgZ2V0cyBjYWxsZWQgdHdpY2VcbiAgICAgIC5vbmUoXCJvYW5pbWF0aW9uZW5kIG1zQW5pbWF0aW9uRW5kIGFuaW1hdGlvbmVuZFwiLCAoKSA9PiB7XG5cbiAgICAgICAgLy8gTG9hZCBpbiBhbmltYXRpb25zIGhlcmUgdGhhdCBuZWVkIHRvIG9jY3VyIGFmdGVyIG1haW4gb25lc1xuICAgICAgICB0aGlzLmFuaW1hdGVXaW5kb3dUb3AoKTtcblxuICAgICAgfSk7XG5cbiAgICBpZiAoIHR5cGVvZihjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICBjaGVja1VybCggdXJsICk6IGJvb2xlYW4ge1xuICAgIGlmICggdXJsLm1hdGNoKC9eIy8pICE9PSBudWxsIHx8IHVybCA9PT0gXCJcIiApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsQ2xpY2tDaGVjayggZXZlbnQ/ICkge1xuXG4gICAgLy8gR2V0IHVybCBmcm9tIHRoZSBhIHRhZ1xuICAgIGxldCBuZXdVcmwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJocmVmXCIpO1xuICAgIGxldCBoYXNDaGlsZHJlbiA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50KFwibGlcIikuaGFzQ2xhc3MoXCJtZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpO1xuXG4gICAgLypcbiAgICAgKiBGaXJzdCBWYWxpZGF0aW9uOiBJcyB0aGUgdXJsIHZhbGlkXG4gICAgICovXG4gICAgaWYgKCAhdGhpcy5jaGVja1VybChuZXdVcmwpICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIElmIGZpcnN0IHZhbGlkYXRpb24gZmFpbHMsIHRoZSB1cmwgaXMgcmVhbCBhbmQgY29udGludWUgdmFsaWRhdGluZ1xuICAgICAqL1xuICAgIC8qXG4gICAgICogQ2hlY2sgaWYgaXRzIGhvcml6b250YWwgdGFibGV0XG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCAmJlxuICAgICAgdGhpcy5jaGVja1VybChuZXdVcmwpICYmXG4gICAgICBVdGlscy5icm93c2VyID09PSBcImlwYWRcIiAmJiBoYXNDaGlsZHJlbiApIHtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdUYWJsZXQgTmF2IGNsaWNrJyk7XG4gICAgICByZXR1cm47XG5cbiAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCAmJiB0aGlzLmNoZWNrVXJsKG5ld1VybCkgKSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBDaGVjayBpZiBpdHMgbGFyZ2VyIHRoYW4gdGFibGV0IGJ1dCBub3QgYW4gaXBhZFxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibGFwdG9wIG9yIGxhcmdlclwiKTtcbiAgICAgIHRoaXMubWFpbkNvbnRlbnRBbmltYXRpb25PdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICggdGhpcy5jaGVja1VybChuZXdVcmwpICYmIGhhc0NoaWxkcmVuICkge1xuXG4gICAgICAvKlxuICAgICAgICogQ2hlY2sgaWYgaXRzIG1vYmlsZSBuYXYgbWVudSB0aGF0IGhhcyBjaGlsZHJlblxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW9iaWxlIG1lbnUgaXMgYWN0aXZlIGFuZCBwYXJlbnQgY2xpY2tlZFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogUGFzc2VkIHRoZSBjaGVja3MgTG9hZCBpdCFcbiAgICAgICAqL1xuXG4gICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICB9XG5cbiAgfVxuXG4gIGRlc2NPZmZzZXRDaGVjaygpIHtcbiAgICBpZiAoIHRoaXMuZGVzY09mZnNldC5sZW5ndGggPiAwICkge1xuICAgICAgdGhpcy5hZGREZXNjT2Zmc2V0TW9kdWxlKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGVzY09mZnNldE1vZHVsZSgpIHtcbiAgICB0aGlzLmRlc2NPZmZzZXQuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgLy8gUGFzcyBcInRoaXNcIiB0byBlYWNoIG5ldyBIZWFkZXIgc2xpZGVyIGNvbXBvbmVudFxuICAgICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBEZXNjT2Zmc2V0QW5pbWF0aW9uKGVsKTtcbiAgICAgIGFuaW1hdGlvbi5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMucHJvY2Vzc0FuaW1hdGVJbigpO1xuICAgIC8vIHRoaXMuZGVzY19vX2FuaW1hdGUoKTtcblxuICAgIC8vIENsaWNrIGV2ZW50IHRvIGNvbnRyb2wgd2luZG93IExvYWRpbmdcbiAgICAkKFwiYVwiKS5vbihcImNsaWNrXCIsICggZSApID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZ2xvYmFsQ2xpY2tDaGVjayhlKTtcbiAgICB9KTtcblxuICAgIC8vIENoZWNrIGZvciBWQyBncmlkIGxpbmtcbiAgICBpZiAoICQoXCIudmNfZ3JpZC1jb250YWluZXJcIikubGVuZ3RoID4gMCApIHtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQoXCIudmNfZ3JpZC1jb250YWluZXJcIikuZmluZChcImFcIikuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcbiAgICAgICAgICAkKGVsKS5vbihcImNsaWNrXCIsICggZSApID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsQ2xpY2tDaGVjayhlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0sIDIwMDApO1xuICAgIH1cblxuICAgIHRoaXMuZGVzY09mZnNldENoZWNrKCk7XG5cbiAgICAvLyBTUEVDSUFMIFRBQkxFUyBBREQgQ0xBU1NcbiAgICBpZiAoICQoXCIuZGF0YVRhYmxlc193cmFwcGVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImFkZCBkYXRhIHRhYmxlIGNsYXNzXCIpO1xuICAgICAgbGV0IGVsID0gJChcIi5kYXRhVGFibGVzX3dyYXBwZXJcIik7XG5cbiAgICAgIGVsLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICAgICQoZWwpLmFkZENsYXNzKFwidGFibGUtcmVzcG9uc2l2ZVwiKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLy8gJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG4gICAgLy8gQ3VzdG9tIGV2ZW50IGV4YW1wbGVcbiAgICAvLyAkKGRvY3VtZW50KS5vbihcInRlc3RcIiwge30sICggZXZlbnQsIGFyZzEsIGFyZzIgKSA9PiB7XG4gICAgLy9cbiAgICAvLyAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJnMSk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZzIpO1xuICAgIC8vICAgfVxuICAgIC8vXG4gICAgLy8gfSkuYmluZCh0aGlzKTtcblxuICB9XG59XG5cbmxldCBBbmltYXRpb25Db250cm9sbGVyID0gbmV3IEFuaW1hdGlvbkNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBBbmltYXRpb25Db250cm9sbGVyO1xuXG4iLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cblxuaW50ZXJmYWNlIFF1b3RlU3RhdGVJbnRlcmZhY2Uge1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBpc0Zvcm1BY3RpdmU6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBRdW90ZVNlbGVjdGVkT2JqZWN0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgcHJpY2U6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgYnVsbGV0czogT2JqZWN0O1xuICBpbWdTcmM6IHN0cmluZztcbn1cblxuY2xhc3MgUXVvdGVDb21wb25lbnQge1xuXG4gIHNlbGVjdEJ0bjogSlF1ZXJ5O1xuICBzd2l0Y2hCdG46IEpRdWVyeTtcbiAgZm9ybUJ1aWxkZXI6IEpRdWVyeTtcbiAgcXVvdGVDaG9vc2VyOiBKUXVlcnk7XG4gIGlucHV0czogSlF1ZXJ5O1xuICBxdW90ZUl0ZW1zQXJyYXk6IEpRdWVyeTtcbiAgc2VsZWN0Q29uYWluZXI6IEpRdWVyeTtcbiAgc3RhdGU6IFF1b3RlU3RhdGVJbnRlcmZhY2U7XG4gIHF1b3RlQ29udGFpbmVyOiBKUXVlcnk7XG4gIHNlbGVjdGVkSXRlbTogUXVvdGVTZWxlY3RlZE9iamVjdDtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgY3VycmVudEJyZWFrcG9pbnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1b3RlQ29udGFpbmVyID0gJChcIi5xdW90ZVwiKTtcbiAgICB0aGlzLnNlbGVjdEJ0biA9ICQoXCIucXVvdGVfX3NlbGVjdC0tYnRuXCIpO1xuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5ID0gJChcIi5xdW90ZV9faXRlbVwiKTtcbiAgICB0aGlzLmZvcm1CdWlsZGVyID0gJChcIi5xdW90ZV9fZm9ybS0taW5wdXRcIik7XG4gICAgdGhpcy5xdW90ZUNob29zZXIgPSAkKFwiLnF1b3RlX19mb3JtLS1zZWxlY3RcIik7XG4gICAgdGhpcy5zZWxlY3RDb25haW5lciA9IHRoaXMuc2VsZWN0QnRuLmZpbmQoXCIuZmllbGRzZXRcIik7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkOiAnJyxcbiAgICAgIGlzRm9ybUFjdGl2ZTogZmFsc2VcbiAgICB9O1xuICAgIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgPSBVdGlscy5icmVha3BvaW50O1xuXG4gIH1cblxuICBnZXRTZWxlY3RlZExhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdENvbmFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBzZXRXaWR0aCggbGFiZWw6IEpRdWVyeSApIHtcblxuICAgIGxldCBsYWJlbFdpZHRoID0gbGFiZWwub3V0ZXJXaWR0aCgpO1xuICAgIHRoaXMuc3dpdGNoQnRuLmNzcyhcIndpZHRoXCIsIGxhYmVsV2lkdGgpO1xuXG4gIH1cblxuICBidWlsZFNlbGVjdEJveCgpIHtcblxuICAgIGxldCBuYW1lcyA9IFtdO1xuICAgIGxldCBmcmFnbWVudCA9ICQoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcblxuICAgIC8vIGdldCBoMiB0aXRsZXMgZnJvbSBlYWNoIHF1b3RlIGl0ZW1cbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgdGl0bGUgPSAkdGhpcy5maW5kKFwiLmNhcmRfX2l0ZW0tLWNvbnRlbnQgPiBoMlwiKS50ZXh0KCksXG4gICAgICAgIG5hbWUgPSB0aXRsZS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuICAgICAgICB1bmlxdWVJZCA9IG5hbWUgKyBcIi1cIiArIGluZGV4O1xuXG4gICAgICBjb25zb2xlLmxvZyhcIlRpdGxlOiBcIiwgdGl0bGUpO1xuXG4gICAgICAvLyBBZGQgbWF0Y2hpbmcgSUQncyB0byBlYWNoIENhcmRcbiAgICAgICR0aGlzLmF0dHIoXCJpZFwiLCB1bmlxdWVJZCk7XG5cbiAgICAgIC8vIENyZWF0ZSBpbnB1dCBhbmQgbGFiZWwgRE9NIGVsZW1lbnRzXG4gICAgICBsZXQgaW5wdXQgPSBVdGlscy5idWlsZEh0bWwoXCJpbnB1dFwiLCB7XG4gICAgICAgIGlkOiB1bmlxdWVJZCxcbiAgICAgICAgdHlwZTogXCJyYWRpb1wiLFxuICAgICAgICBjbGFzczogXCJxdW90ZV9faW5wdXRcIixcbiAgICAgICAgbmFtZTogdW5pcXVlSWQsXG4gICAgICAgIHZhbHVlOiBuYW1lXG4gICAgICB9KTtcblxuICAgICAgbGV0IGxhYmVsID0gVXRpbHMuYnVpbGRIdG1sKFwibGFiZWxcIiwge1xuICAgICAgICBmb3I6IHVuaXF1ZUlkLFxuICAgICAgICBjbGFzczogaW5kZXggPT09IDAgPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICB9LCB0aXRsZSk7XG5cblxuICAgICAgZnJhZ21lbnQuYXBwZW5kKGlucHV0KS5hcHBlbmQobGFiZWwpO1xuXG4gICAgfSk7XG5cbiAgICAvLyBHZXQgY29sb3IgZnJvbSBkYXRhIGVsIGFuZCBzZXQgYnV0dG9uXG4gICAgbGV0ICRidXR0b25fY29sb3IgPSB0aGlzLnNlbGVjdENvbmFpbmVyLmRhdGEoXCJjb2xvclwiKTtcbiAgICBmcmFnbWVudC5hcHBlbmQoJzxzcGFuIGNsYXNzPVwicXVvdGVfX3N3aXRjaCBzaGFkb3ctc21hbGwtYnRuXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicgKyAkYnV0dG9uX2NvbG9yICsgJ1wiPjwvc3Bhbj4nKTtcblxuICAgIHRoaXMuc2VsZWN0Q29uYWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICB9XG5cbiAgYnVpbGRTZWxlY3RFdmVudEhhbmRsZXJzKCkge1xuICAgIHRoaXMuaW5wdXRzID0gdGhpcy5zZWxlY3RCdG4uZmluZChcIi5xdW90ZV9faW5wdXRcIik7XG4gICAgdGhpcy5zd2l0Y2hCdG4gPSAkKFwiLnF1b3RlX19zd2l0Y2hcIik7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZWFjaCBpdGVtIGFuZCBzZXQgd2lkdGggYW5kIGNoYW5nZSBldmVudHMgYW5kIGNoZWNrZWQgc3RhdHVzXG4gICAgdGhpcy5pbnB1dHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gJChlbCksXG4gICAgICAgIG5leHRMYWJlbCA9ICR0aGlzLm5leHQoKTtcblxuICAgICAgaWYgKCBpbmRleCA9PT0gMCApIHtcbiAgICAgICAgJHRoaXMucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gc2V0IHN0YXRlIHRvIGN1cnJlbnQgc2VsZWN0ZWQgaW5wdXQgSURcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gZmluZCBTZWxlY3RlZCwgZ2V0IHdpZHRoIG9mIGxhYmVsLCBzZXQgd2lkdGggb2Ygc3BhblxuICAgICAgaWYgKCBuZXh0TGFiZWwuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSApIHtcbiAgICAgICAgdGhpcy5zZXRXaWR0aChuZXh0TGFiZWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgb24gY2hhbmdlIGZ1bmN0aW9uIGhlcmVcbiAgICAgICR0aGlzLmNoYW5nZSh0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRDYXJkRXZlbnRIYW5kbGVycygpIHtcblxuICAgIC8vIE1haW4gQ2FyZHNcbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgYnV0dG9uID0gJHRoaXMuZmluZChcIi5jYXJkX19pdGVtLS1idG5cIik7XG5cbiAgICAgIGJ1dHRvbi5vbihcImNsaWNrXCIsIHRoaXMub3BlbkZvcm0uYmluZCh0aGlzKSk7XG5cbiAgICB9KTtcblxuICAgIC8vIEJhY2sgYnV0dG9uIGZvciB0YWJsZXRcbiAgICBsZXQgYnV0dG9uID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnRhYmxldFwiKS5maW5kKFwiLmdvLWJhY2tcIik7XG4gICAgYnV0dG9uLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKSk7XG5cbiAgfVxuXG4gIGZhZGVJbiggZWw6IEpRdWVyeSApIHtcblxuICAgIFR3ZWVuTWF4LnRvKGVsLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGRlbGF5OiAuM1xuICAgIH0pO1xuXG4gIH1cblxuICBzZXRUcmFuc2xhdGVYKCBjdXJyZW50VGFyZ2V0OiBKUXVlcnksIHdpZHRoOiBOdW1iZXIgKSB7XG4gICAgbGV0ICR0aGlzID0gY3VycmVudFRhcmdldDtcbiAgICBsZXQgaW5wdXRJZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaW5wdXQgbWF0Y2hlcyB0aGUgMm5kIGl0ZW0gLSB0aGVuIG1vdmUgc3dpdGNoQnRuIHJpZ2h0LCBvdGhlcndpc2UgYmFjayB0byBwb3NpdGlvbiAxXG4gICAgaWYgKCBpbnB1dElkID09PSAkKHRoaXMuaW5wdXRzWyAxIF0pLmF0dHIoXCJpZFwiKSApIHtcbiAgICAgIHRoaXMuc3dpdGNoQnRuLmNzcyh7XG4gICAgICAgIFwid2Via2l0VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHdpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJNb3pUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgd2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcIm1zVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHdpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJPVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHdpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgd2lkdGggKyBcInB4KVwiXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zd2l0Y2hCdG4uY3NzKHtcbiAgICAgICAgXCJ3ZWJraXRUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJNb3pUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJtc1RyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiLFxuICAgICAgICBcIk9UcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIlxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25DaGFuZ2UoIGUgKSB7XG5cbiAgICBsZXQgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCksXG4gICAgICBmaWVsZHNldCA9ICR0aGlzLnBhcmVudChcIi5maWVsZHNldFwiKSxcbiAgICAgIHByZXZJdGVtID0gZmllbGRzZXQuZmluZChcIi5zZWxlY3RlZFwiKSxcbiAgICAgIHByZXZXaWR0aCA9IHByZXZJdGVtLm91dGVyV2lkdGgoKSAtIDEsXG4gICAgICBpbnB1dElkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuXG4gICAgLy8gcmVtb3ZlIHNlbGVjdGVkIGZyb20gUHJldiBMYWJlbFxuICAgIGZpZWxkc2V0LmZpbmQoXCJsYWJlbFwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgLy8gcmVtb3ZlIGNoZWNrZWQgc3RhdGUgZnJvbSBwcmV2IGlucHV0XG4gICAgcHJldkl0ZW0ucHJldihcImlucHV0XCIpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcblxuICAgIC8vIHNldCBuZXcgaXRlbSB0byBzZWxlY3RlZCBhbmQgY2hlY2tlZFxuICAgIGxldCBzZWxlY3RlZExhYmVsID0gZmllbGRzZXQuZmluZChcImxhYmVsW2Zvcj1cIiArIGlucHV0SWQgKyBcIl1cIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAkdGhpcy5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcblxuICAgIC8vIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaW5wdXQgbWF0Y2hlcyB0aGUgMm5kIGl0ZW0gLSB0aGVuIG1vdmUgc3dpdGNoQnRuIHJpZ2h0LCBvdGhlcndpc2UgYmFjayB0byBwb3NpdGlvbiAxXG4gICAgdGhpcy5zZXRUcmFuc2xhdGVYKCR0aGlzLCBwcmV2V2lkdGgpO1xuXG4gICAgLy8gY2hhbmdlIHRoZSB3aWR0aCBvZiB0aGUgYnRuIHRvIG1hdGNoIHRoZSB3aWR0aCBvZiB0aGUgbmV3IGxhYmVsXG4gICAgdGhpcy5zZXRXaWR0aChzZWxlY3RlZExhYmVsKTtcblxuICAgIC8vIHNldCBzdGF0ZSB0byB0aGUgbmV3bHkgc2VsZWN0ZWQgaW5wdXRcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBTdGF0ZSBpczogXCIsIHRoaXMuc3RhdGUuc2VsZWN0ZWQpO1xuXG4gICAgdGhpcy50b2dnbGVDYXJkcygpO1xuXG4gIH1cblxuICB0b2dnbGVDYXJkcygpIHtcblxuICAgIC8vIGJhc2VkIG9uIHN0YXRlLCBhZGQgc2VsZWN0ZWQgdG8gdGhlIGNhcmQncyBpZCBtYXRjaGluZyB0aGUgc3RhdGVcbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgaWQgPSAkdGhpcy5hdHRyKFwiaWRcIik7XG5cbiAgICAgICR0aGlzLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQgc2hhZG93LW1lZGl1bS1kYXJrXCIpO1xuXG4gICAgICBpZiAoIGlkID09PSB0aGlzLnN0YXRlLnNlbGVjdGVkICkge1xuXG4gICAgICAgICR0aGlzLmFkZENsYXNzKFwic2VsZWN0ZWQgc2hhZG93LW1lZGl1bS1kYXJrXCIpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgc2V0QWN0aXZlUGxhbigpIHtcblxuICAgIGxldCBpZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQ7XG5cbiAgICBsZXQgc2VsZWN0ZWRDYXJkID0gdGhpcy5xdW90ZUl0ZW1zQXJyYXkuZmlsdGVyKCggaXRlbSApID0+IHtcbiAgICAgIHJldHVybiAkKHRoaXMucXVvdGVJdGVtc0FycmF5WyBpdGVtIF0pLmF0dHIoXCJpZFwiKSA9PT0gaWQ7XG4gICAgfSk7XG5cbiAgICBsZXQgYnV0dG9uID0gJzxhIGNsYXNzPVwicm91bmRlZC1idG4gd2hpdGUtYnRuIGdvLWJhY2tcIiBocmVmPVwiI1wiPkdvIEJhY2s8L2E+JztcblxuICAgIC8vIGZpbmQgZm9ybVxuICAgIGxldCBmb3JtUmVmID0gc2VsZWN0ZWRDYXJkLmZpbmQoXCIucXVvdGVfX2Zvcm0tLXRlbXBcIikuZmluZChcIi5xdW90ZV9fZm9ybS0taW5uZXJcIik7XG4gICAgbGV0IGZvcm0gPSBmb3JtUmVmLmRldGFjaCgpO1xuXG4gICAgLy8gY2xvbmVkIGVsZW1lbnRcbiAgICBsZXQgbW9kaWZpZWRFbGVtZW50ID0gc2VsZWN0ZWRDYXJkLmNsb25lKCk7XG5cbiAgICAvLyByZW1vdmUgZm9ybSBmcm9tIGNsb25lZCBpdGVtLlxuICAgIC8vIG1vZGlmaWVkRWxlbWVudC5maW5kKFwiLnF1b3RlX19mb3JtLS1pdGVtLnRlbXBcIikucmVtb3ZlKCk7XG4gICAgLy8gZm9ybVJlZi5yZW1vdmUoKTtcblxuICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBWQyBjb250ZW50IGFyZWFcbiAgICBsZXQgcXVvdGVGb3JtQ29udGFpbmVyID0gJChcIi5xdW90ZV9fZm9ybS0tdmNcIik7XG4gICAgcXVvdGVGb3JtQ29udGFpbmVyLmFwcGVuZChmb3JtKTtcblxuICAgIC8vIGZpbmQgYnV0dG9uIGFuZCByZW1vdmVcbiAgICBtb2RpZmllZEVsZW1lbnQuZmluZChcIi5jYXJkX19pdGVtLS1idG5cIikucmVtb3ZlKCk7XG5cbiAgICAvLyBtb2RpZmllZEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5nby1iYWNrXCIpKTtcbiAgICBsZXQgY2FyZFdyYXBwZXIgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWNhcmQtd3JhcHBlclwiKTtcblxuICAgIGNhcmRXcmFwcGVyLmFwcGVuZChtb2RpZmllZEVsZW1lbnQpLmFwcGVuZChidXR0b24pO1xuXG4gICAgLy8gQmFjayBidXR0b24gaW5zaWRlIHdyYXBwZXJcbiAgICBsZXQgYnV0dG9uRG9tID0gY2FyZFdyYXBwZXIuZmluZChcIi5nby1iYWNrXCIpO1xuICAgIGJ1dHRvbkRvbS5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VGb3JtLmJpbmQodGhpcykpO1xuXG5cbiAgfVxuXG4gIHB1dEZvcm1CYWNrKCBmb3JtOiBKUXVlcnkgKSB7XG4gICAgbGV0IGlkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZDtcbiAgICAvLyBmaW5kIGVsZW1lbnQgaWQgdGhhdCBtYXRjaGVzIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgbGV0IHNlbGVjdGVkQ2FyZCA9IHRoaXMucXVvdGVJdGVtc0FycmF5LmZpbHRlcigoIGl0ZW0gKSA9PiB7XG4gICAgICByZXR1cm4gJCh0aGlzLnF1b3RlSXRlbXNBcnJheVsgaXRlbSBdKS5hdHRyKFwiaWRcIikgPT09IGlkO1xuICAgIH0pO1xuXG4gICAgc2VsZWN0ZWRDYXJkLmZpbmQoXCIucXVvdGVfX2Zvcm0tLXRlbXBcIikuYXBwZW5kKCBmb3JtICk7XG4gIH1cblxuICBjbG9zZUZvcm0oIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUuaXNGb3JtQWN0aXZlID0gZmFsc2U7XG5cbiAgICAvLyByZWYgZm9yIGl0ZW1zIGluIFZDIHZpZXdcbiAgICBsZXQgY2FyZCA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5jYXJkX19pdGVtXCIpO1xuICAgIGxldCBiYWNrQnRuID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS1jYXJkLXdyYXBwZXJcIikuZmluZChcIi5nby1iYWNrXCIpO1xuICAgIGxldCBmb3JtID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS12Y1wiKS5maW5kKFwiLnF1b3RlX19mb3JtLS1pbm5lclwiKTtcblxuICAgIGNhcmQucmVtb3ZlQ2xhc3MoXCJpblwiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gc2V0IGZvcm0gdG8gYWN0aXZlXG4gICAgICB0aGlzLmZvcm1CdWlsZGVyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyBzZXQgYm9keSBiYWNrIHRvIHNjcm9sbGFibGVcbiAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJhdXRvXCIpO1xuXG4gICAgfSwgNDAwKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICB0aGlzLmZvcm1CdWlsZGVyXG4gICAgICAgIC5maW5kKFwiLnF1b3RlX19mb3JtLS12Y1wiKVxuICAgICAgICAub25lKCdvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgKCBlICkgPT4ge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdmlzaWJpbGl0eSBvbmNlIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICAgICAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuY3NzKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICAgIHRoaXMucXVvdGVDaG9vc2VyLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXG4gICAgICAgICAgICAvLyB6LWluZGV4IGZpeFxuICAgICAgICAgICAgJChcIi5pbm5lci1wYWdlLXdyYXBwZXJcIikuY2hpbGRyZW4oXCJkaXZcIikuY3NzKFwiei1pbmRleFwiLCBcIjBcIik7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBjdXJyZW50IGNhcmQgaHRtbFxuICAgICAgICAgICAgY2FyZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGJhY2tCdG4ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIHRoaXMucHV0Rm9ybUJhY2soIGZvcm0uZGV0YWNoKCkgKTtcblxuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIHJlbW92ZSB2aXNpYmlsaXR5IG9uY2UgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgdGhpcy5mb3JtQnVpbGRlci5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICAgIC8vIHotaW5kZXggZml4XG4gICAgICAkKFwiLmlubmVyLXBhZ2Utd3JhcHBlclwiKS5jaGlsZHJlbihcImRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIFwiMFwiKTtcblxuICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgY2FyZCBodG1sXG4gICAgICBjYXJkLnJlbW92ZSgpO1xuICAgICAgYmFja0J0bi5yZW1vdmUoKTtcblxuICAgICAgdGhpcy5wdXRGb3JtQmFjayggZm9ybS5kZXRhY2goKSApO1xuICAgIH1cblxuICAgIC8vIGZhZGUgb3V0IGZpcnN0IGRpc3BsYXlcbiAgICB0aGlzLnF1b3RlQ2hvb3Nlci5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIG9wZW5Gb3JtKCBlICkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICBsZXQgcGFyZW50Q29uYXRpbmVyID0gJHRoaXMucGFyZW50KFwiZGl2XCIpLnBhcmVudChcImRpdlwiKTtcblxuICAgIC8vIGRpc2FibGUgYnV0dG9uIGNsaWNrIGlmIGl0ZW0gaXMgc2VsZWN0ZWRcbiAgICBpZiAoICFwYXJlbnRDb25hdGluZXIuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBzZXQgc3RhdGVcbiAgICB0aGlzLnN0YXRlLmlzRm9ybUFjdGl2ZSA9IHRydWU7XG5cbiAgICAvLyBzZXQgY29udGVudCBwbGFuIEhUTUwgaW4gbmV3IGZvcm0gYXJlYVxuICAgIHRoaXMuc2V0QWN0aXZlUGxhbigpO1xuXG4gICAgLy8gQW5pbWF0ZSBmb3JtIGluXG4gICAgbGV0IGFjdGl2YXRlSW5uZXJGb3JtID0gKCkgPT4ge1xuXG4gICAgICAvLyB6LWluZGV4IGZpeFxuICAgICAgJChcIi5pbm5lci1wYWdlLXdyYXBwZXJcIikuY2hpbGRyZW4oXCJkaXZcIikuY3NzKFwiei1pbmRleFwiLCBcIi0xXCIpO1xuICAgICAgdGhpcy5xdW90ZUNvbnRhaW5lci5wYXJlbnRzKFwiLnZjX3Jvd1wiKS5jc3MoXCJ6LWluZGV4XCIsIFwiMlwiKTtcblxuICAgICAgLy8gZmFkZSBvdXQgY2FyZHNcbiAgICAgIHRoaXMucXVvdGVDaG9vc2VyLmNzcyhcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG4gICAgICAvLyBzZXQgZm9ybSB0byBhY3RpdmVcbiAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAgIC8vIGFkZCB2aXNpYmlsaXR5IGltbWVkaWF0ZWx5XG4gICAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuXG4gICAgICAvLyBmYWRlIG91dCBmaXJzdCBkaXNwbGF5XG4gICAgICB0aGlzLnF1b3RlQ2hvb3Nlci5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9O1xuXG4gICAgLy8gaWYgZGVza3RvcCBzY3JvbGwgdG9wXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8vIHNjcm9sbCB0b3Agb2YgZGl2IG9uIG9wZW4gZm9yIGdyYWNlZnVsIFVYXG4gICAgICAkKFwiYm9keSxodG1sXCIpLmFuaW1hdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBcInNjcm9sbFRvcFwiOiB0aGlzLnF1b3RlQ29udGFpbmVyLm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAyMDAsICgpID0+IHtcbiAgICAgICAgICBhY3RpdmF0ZUlubmVyRm9ybSgpO1xuICAgICAgICB9XG4gICAgICApLmJpbmQodGhpcyk7XG5cbiAgICB9ZWxzZSB7XG4gICAgICBhY3RpdmF0ZUlubmVyRm9ybSgpO1xuICAgIH1cblxuXG4gICAgbGV0IGNhcmQgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWNhcmRcIik7XG5cbiAgICAvLyBTZXQgYm9keSB0byBub3Qgc2Nyb2xsXG4gICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImhpZGRlblwiKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgY2FyZC5vbmUoJ290cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgKCBlICkgPT4ge1xuXG4gICAgICAgICAgLy8gZmFkZSBjYXJkIGluIG9uY2UgZGF0YSBpcyBzZXQgJiB0aGUgY2FyZCBiZyBpcyBmaW5pc2hlZCBhbmltYXRpbmdcbiAgICAgICAgICBjYXJkLmZpbmQoXCIuY2FyZF9faXRlbVwiKS5hZGRDbGFzcyhcImluXCIpO1xuXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIGZhZGUgY2FyZCBpbiBvbmNlIGRhdGEgaXMgc2V0ICYgdGhlIGNhcmQgYmcgaXMgZmluaXNoZWQgYW5pbWF0aW5nXG4gICAgICBjYXJkLmZpbmQoXCIuY2FyZF9faXRlbVwiKS5hZGRDbGFzcyhcImluXCIpO1xuXG4gICAgfVxuXG4gIH1cblxuICByZXNpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgYnV0dG9uIHNpemUgdG8gYWNjdXJhdGVseSByZXNpemUgc2VsZWN0ZWQgYnV0dG9uIHdpZHRoXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuXG4gICAgdGhpcy5yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICBpZiAoIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgIT09IFV0aWxzLmJyZWFrcG9pbnQgKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkTGFiZWwgPSB0aGlzLmdldFNlbGVjdGVkTGFiZWwoKSxcbiAgICAgICAgICBzZWxlY3RlZElucHV0ID0gc2VsZWN0ZWRMYWJlbC5wcmV2KCksXG4gICAgICAgICAgZmlyc3RMYWJlbCA9ICQodGhpcy5pbnB1dHNbIDAgXSkubmV4dCgpLFxuICAgICAgICAgIGZpcnN0TGFiZWxXaWR0aCA9IGZpcnN0TGFiZWwub3V0ZXJXaWR0aCgpIC0gMTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZVgoc2VsZWN0ZWRJbnB1dCwgZmlyc3RMYWJlbFdpZHRoKTtcbiAgICAgICAgdGhpcy5zZXRXaWR0aChzZWxlY3RlZExhYmVsKTtcbiAgICAgICAgdGhpcy5jdXJyZW50QnJlYWtwb2ludCA9IFV0aWxzLmJyZWFrcG9pbnQ7XG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiUXVvdGUgQnVpbGRlclwiKTtcblxuICAgIC8vIGJ1aWxkIHNlbGVjdCBib3ggYnV0dG9uIGlucHV0c1xuICAgIHRoaXMuYnVpbGRTZWxlY3RCb3goKTtcblxuICAgIC8vIHNldCBjbGljayBldmVudHMgYW5kIGZpcnN0IHNlbGVjdGVkIGl0ZW1zIGZvciBTZWxlY3QgQm94XG4gICAgdGhpcy5idWlsZFNlbGVjdEV2ZW50SGFuZGxlcnMoKTtcblxuICAgIHRoaXMuZmFkZUluKHRoaXMuc2VsZWN0QnRuKTtcblxuICAgIC8vIHNlbGVjdCBjYXJkXG4gICAgdGhpcy50b2dnbGVDYXJkcygpO1xuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50cyB0byBjYXJkcyBidXR0b25zXG4gICAgdGhpcy5idWlsZENhcmRFdmVudEhhbmRsZXJzKCk7XG5cbiAgICAvLyBmYWRlIG1haW4gY29udGFpbmVyIGluXG4gICAgdGhpcy5mYWRlSW4odGhpcy5xdW90ZUNvbnRhaW5lcik7XG5cbiAgICAvLyBvbiByZXNpemUgY2hhbmdlIGJ1dHRvbiBzaXplXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXG4gIH1cbn1cblxuY29uc3QgUXVvdGVCdWlsZGVyID0gbmV3IFF1b3RlQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFF1b3RlQnVpbGRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmludGVyZmFjZSBTaG93Y2FzZVNsaWRlckludGVyZmFjZSB7XG4gIGRlc2t0b3BQb3M6IG51bWJlcjtcbiAgdGFibGV0UG9zOiBudW1iZXI7XG4gIGluZGV4U2VsZWN0ZWQ6IG51bWJlcjtcbiAgY3VycmVudFNsaWRlOiBudW1iZXI7XG59XG5cbmNsYXNzIFNob3djYXNlQ29tcG9uZW50IHtcbiAgY29udGFpbmVyOiBKUXVlcnk7XG4gIHJlc2l6ZVRpbWVyOiBudW1iZXI7XG4gIG5leHRCdG5Nb2JpbGU6IEpRdWVyeTtcbiAgcHJldkJ0bk1vYmlsZTogSlF1ZXJ5O1xuICBuZXh0QnRuOiBKUXVlcnk7XG4gIHByZXZCdG46IEpRdWVyeTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgZ2FsbGVyeTogSlF1ZXJ5O1xuICBkZXNjOiBKUXVlcnk7XG4gIHRodW1ic0NvbnRhaW5lcjogSlF1ZXJ5O1xuICBncmFkaWVudHM6IEpRdWVyeTtcbiAgdGh1bWJzQ2xpY2s6IEpRdWVyeTtcbiAgY2xvc2VCdG46IEpRdWVyeTtcbiAgY291bnRUb3RhbDogSlF1ZXJ5O1xuICBjdXJyZW50Q291bnRJdGVtOiBKUXVlcnk7XG4gIHNob3dDYXNlVGh1bWJzOiBKUXVlcnk7XG4gIHN0YXRlUG9zaXRpb246IFNob3djYXNlU2xpZGVySW50ZXJmYWNlO1xuICB0aHVtYlNjYWxlVG9wOiBudW1iZXI7XG4gIHRodW1iU2NhbGVMZWZ0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoIGVsOiBPYmplY3QgKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKGVsKTtcbiAgICB0aGlzLnByZXZCdG5Nb2JpbGUgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19uYXYtLXByZXZcIik7XG4gICAgdGhpcy5uZXh0QnRuTW9iaWxlID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fbmF2LS1uZXh0XCIpO1xuICAgIHRoaXMucHJldkJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1ic25hdi0tcHJldlwiKTtcbiAgICB0aGlzLm5leHRCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNuYXYtLW5leHRcIik7XG4gICAgdGhpcy5nYWxsZXJ5ID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fc2xpZGVyLS1nYWxsZXJ5XCIpO1xuICAgIHRoaXMuZGVzYyA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2NcIik7XG4gICAgdGhpcy5jb3VudFRvdGFsID0gdGhpcy5jb250YWluZXIuZmluZChcIi50b3RhbFwiKTtcbiAgICB0aGlzLmN1cnJlbnRDb3VudEl0ZW0gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmN1cnJlbnRcIik7XG4gICAgdGhpcy5pbmRleCA9IDA7IC8vIHNldCB0byAybmQgc2xpZGVcbiAgICB0aGlzLnRodW1ic0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1icy0taW1hZ2VzXCIpO1xuICAgIHRoaXMuc2hvd0Nhc2VUaHVtYnMgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNcIik7XG4gICAgdGhpcy50aHVtYlNjYWxlVG9wID0gMTMwO1xuICAgIHRoaXMudGh1bWJTY2FsZUxlZnQgPSA3NTtcbiAgICB0aGlzLnN0YXRlUG9zaXRpb24gPSB7XG4gICAgICBkZXNrdG9wUG9zOiAwLFxuICAgICAgdGFibGV0UG9zOiAwLFxuICAgICAgaW5kZXhTZWxlY3RlZDogdGhpcy5pbmRleCxcbiAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5pbmRleCArIDFcbiAgICB9O1xuXG4gIH1cblxuICBzZXRGaXJzdFNsaWRlKCkge1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGltYWdlcyBhbmQgc2V0IGFjdGl2ZSBlbGVtZW50XG4gICAgbGV0IGZpcnN0SW1hZ2UgPSB0aGlzLmdhbGxlcnkuZmluZChcImxpW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcbiAgICBmaXJzdEltYWdlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICB0aGlzLmFuaW1hdGVHYWxsZXJ5SW4oKTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBkZXNjIGFuZCBzZXQgYWN0aXZlIGVsZW1lbnRcbiAgICBsZXQgZmlyc3REZXNjID0gdGhpcy5kZXNjLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2MtLWl0ZW1bZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuICAgIGZpcnN0RGVzYy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgLy8gQnVpbGQgdGh1bWJuYWlsc1xuICAgIHRoaXMuYnVpbGRUaHVtYnMoKTtcblxuICAgIC8vIFNldCBDdXJyZW50IFNsaWRlLCB3aGljaCBpcyBhbHdheXMgdGhlIGZpcnN0IHNsaWRlIHRvIHNlbGVjdGVkIC0gb25Mb2FkXG4gICAgdGhpcy51cGRhdGVNb2JpbGVOYXYodGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50cyB0byB0aHVtYm5haWwgaW1hZ2VzLCB0aGVuIHdoZW4gZmluaXNoZWQgYW5pbWF0ZSBpbiB3aXRoIGNhbGxiYWNrXG4gICAgdGhpcy5idWlsZFRodW1ic0NsaWNrSGFuZGxlcih0aGlzLmFuaW1hdGVJblRodW1icy5iaW5kKHRoaXMpKTtcblxuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmdhbGxlcnkuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldEN1cnJlbnROYXZFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRDdXJyZW50RGVzY0VsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy5kZXNjLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRUb3RhbFNsaWRlcygpOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IHRoaXMuZ2FsbGVyeS5jaGlsZHJlbihcImxpXCIpLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICB1cGRhdGVNb2JpbGVOYXYoIHNlbGVjdGVkOiBKUXVlcnkgKSB7XG5cbiAgICAvLyBFbmFibGUvRGlzYWJsZSBhcnJvdyBidG5zXG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpmaXJzdC1jaGlsZFwiKSk7XG4gICAgdGhpcy5uZXh0QnRuTW9iaWxlLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpsYXN0LWNoaWxkXCIpKTtcblxuICB9XG5cbiAgdXBkYXRlU3RhdGUoIGluZGV4OiBudW1iZXIgKSB7XG5cbiAgICB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCA9IGluZGV4O1xuICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPSBpbmRleCArIDE7XG5cbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGU7XG4gIH1cblxuICB1cGRhdGVTbGlkZSggZGlyZWN0aW9uOiBzdHJpbmcgKSB7XG5cbiAgICAvLyBnZXQgY3VycmVudCBzZWxlY3RlZCBhbmQgZmluZCB0aGUgbWF0Y2ggdG8gdGhlIG5leHQgZWxcbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCk7XG4gICAgbGV0IG5leHRTbGlkZSA9IHRoaXMuZ2FsbGVyeS5maW5kKFwibGlbZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBOYXZpZ2F0aW9uIGNoZWNrXG4gICAgdGhpcy51cGRhdGVNb2JpbGVOYXYodGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuICB9XG5cbiAgdXBkYXRlRGVzY0hlaWdodCggZGlyZWN0aW9uPzogc3RyaW5nLCBzZWxlY3RlZD86IEpRdWVyeSApIHtcblxuICAgIC8vIGRpcmVjdGlvblxuICAgIGlmICggZGlyZWN0aW9uICkge1xuXG4gICAgICBsZXQgaGVpZ2h0ID0gc2VsZWN0ZWQub3V0ZXJIZWlnaHQoKTtcbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMuZGVzYywgLjMsIHtcbiAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBnZXQgY3VycmVudCBzbGlkZVxuICAgICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudERlc2NFbGVtZW50KCk7XG4gICAgICBsZXQgaGVpZ2h0ID0gY3VycmVudFNsaWRlLm91dGVySGVpZ2h0KCk7XG4gICAgICB0aGlzLmRlc2MuaGVpZ2h0KGhlaWdodCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZURlc2MoIGRpcmVjdGlvbjogc3RyaW5nICkge1xuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnREZXNjRWxlbWVudCgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSB0aGlzLmRlc2MuZmluZChcIi5zaG93Y2FzZV9fZGVzYy0taXRlbVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG5cbiAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuXG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuXG4gICAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoXCJyaWdodFwiLCBuZXh0U2xpZGUpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG5cbiAgICAgIHRoaXMudXBkYXRlRGVzY0hlaWdodChcImxlZnRcIiwgbmV4dFNsaWRlKTtcblxuICAgIH1cblxuICB9XG5cbiAgdXBkYXRlVGh1bWJzbmF2KCBkaXJlY3Rpb246IHN0cmluZyApIHtcblxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnROYXZFbGVtZW50KCk7XG4gICAgbGV0IG5leHRTbGlkZSA9IHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCJsaVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG5cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA8IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBUQUJMRVQgVEhVTUIgU0VMRUNUXG4gICAgICAgKi9cblxuICAgICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA+PSA0ICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPCB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zIC0gdGhpcy50aHVtYlNjYWxlTGVmdDtcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zIC0gdGhpcy50aHVtYlNjYWxlVG9wO1xuXG4gICAgICAgICAgLy8gdXBkYXRlIGh0bWwgZWxlbWVudFxuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgIHg6IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MsXG4gICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsZWZ0XCIpO1xuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICsgdGhpcy50aHVtYlNjYWxlTGVmdDtcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHN0YXRlXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyArIHRoaXMudGh1bWJTY2FsZVRvcDtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogREVTS1RPUCBUSFVNQiBTRUxFQ1RcbiAgICAgICAqL1xuICAgICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcblxuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgICAgLy8gZGV0ZWN0aW5nIGlmIHNsaWRlIHNob3VsZCBtb3ZlIG9yIG5vdFxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPj0gNCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlIDwgdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gY29udHJvbGxlclxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgLSB0aGlzLnRodW1iU2NhbGVUb3A7XG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgLSB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuXG4gICAgICAgICAgLy8gbW92ZSBzbGlkZXJcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICsgdGhpcy50aHVtYlNjYWxlVG9wO1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgICB5OiB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyxcbiAgICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VwZXJhdGUgdGFibGV0IGxvb2tpbmcgYXQgc2hvdWxkIGl0IHVwZGF0ZSB0YWJsZXQgc3RhdGVcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyArIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIGNoZWNrVGh1bWJzTmF2KCBzaXplOiBzdHJpbmcgKSB7XG5cbiAgICBpZiAoIHNpemUgPT09IFwibW9iaWxlXCIgKSB7XG5cbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgeTogMCxcbiAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGFycm93SGFuZGxlciggZXZlbnQ6IGFueSApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGV0ICRlbCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7IC8vIGEgdGFnXG4gICAgbGV0IHRodW1iSW5kZXggPSAkZWwucGFyZW50KFwibGlcIikuZGF0YShcImluZGV4XCIpO1xuICAgIGxldCBwcmV2RWwgPSB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICAgIGxldCBwcmV2SW5kZXggPSBwcmV2RWwuZGF0YShcImluZGV4XCIpO1xuXG5cbiAgICAvLyBTbGlkZXIgY2FuIG1vdmUgcmlnaHQgYmVjYXVzZSBjdXJyZW50IHNsaWRlIGlzIG5vdCB0aGUgbGFzdCBzbGlkZVxuICAgIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInJpZ2h0XCIgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA8PSB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSBvbiBhcnJvdyBjbGlja1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIDEpO1xuXG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwicmlnaHRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG5cbiAgICB9IGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwibGVmdFwiICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSBvbiBhcnJvdyBjbGlja1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCAtIDEpO1xuXG4gICAgICAvLyBFbHNlIGlmIGl0cyBub3QgdGhlIGZpcnN0IHNsaWRlIC0gbW92ZSBsZWZ0XG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcImxlZnRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwidGh1bWJuYWlsXCIgJiZcbiAgICAgIHByZXZJbmRleCA8IHRodW1iSW5kZXggJiZcbiAgICAgIHRodW1iSW5kZXggKyAxICE9PSB0aGlzLmdldFRvdGFsU2xpZGVzXG4gICAgKSB7XG4gICAgICAvLyBjb21wYXJlIGl0ZW0gc2VsZWN0ZWQgaW5kZXggd2l0aCBuZXcgaXRlbSBzZWxlY3RlZCBhbmQgZGV0ZXJtaW5lIHdoaWNoIGRpcmVjdGlvbiB0byBtb3ZlXG4gICAgICAvLyB1cGRhdGUgU3RhdGVcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGh1bWJJbmRleCk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aHVtYnMgbmF2XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwicmlnaHRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwidGh1bWJuYWlsXCIgJiYgcHJldkluZGV4ID4gdGh1bWJJbmRleFxuICAgICkge1xuICAgICAgLy8gdXBkYXRlIFN0YXRlXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRodW1iSW5kZXgpO1xuXG4gICAgICAvLyB1cGRhdGUgdGh1bWJzIG5hdlxuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBjb3VudGVyXG4gICAgdGhpcy5jdXJyZW50Q291bnRJdGVtLmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIGlmIFRhYmxldCBvciBzbWFsbGVyIC0gYmluZCBtb2JpbGUgbmF2IGFycm93c1xuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgICAvLyBhZGp1c3QgY3NzIHNpemluZyBmb3IgdGh1bWJzIG5hdiBvbiBwb3NpdGlvbiByZXNpemVcbiAgICAgICAgdGhpcy5jaGVja1RodW1ic05hdihcIm1vYmlsZVwiKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLmNoZWNrVGh1bWJzTmF2KFwiZGVza3RvcFwiKTtcblxuICAgICAgfVxuXG4gICAgfSwgNDAwKTtcblxuICAgIHRoaXMudXBkYXRlRGVzY0hlaWdodCgpO1xuXG4gIH1cblxuICBhbmltYXRlU2hhZG93SW5PdXQoKSB7XG5cbiAgICAvLyByZW1vdmUgZHJvcHNoYWRvd1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuZ2FsbGVyeSwgMCwge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjApXCJcbiAgICB9KTtcblxuXG4gICAgVHdlZW5NYXgudG8odGhpcy5nYWxsZXJ5LCAuMSwge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjY4KVwiLFxuICAgICAgZGVsYXk6IC4zXG4gICAgfSk7XG5cblxuICB9XG5cbiAgYW5pbWF0ZVNoYWRvd0luKCkge1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuZ2FsbGVyeSwgLjMsIHtcbiAgICAgIGJveFNoYWRvdzogXCIwcHggMThweCA5NHB4IC0xNnB4IHJnYmEoMCwwLDAsMC42OClcIixcbiAgICAgIGRlbGF5OiAuMVxuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRUaHVtYnMoKSB7XG5cbiAgICBsZXQgZnJhZ21lbnQgPSAkKGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG4gICAgLy8gYnVpbGQgbG9vcCBmb3IgaW1hZ2VzXG4gICAgdGhpcy5nYWxsZXJ5LmZpbmQoXCJsaVwiKS5lYWNoKCggaW5kZXg6IG51bWJlciwgZWw6IE9iamVjdCApID0+IHtcblxuICAgICAgLy8gY3JlYXRlIGh0bWwgZWxlbWVudHNcbiAgICAgIGxldCBpdGVtSW5kZXggPSBVdGlscy5zZXROdW1iZXIoaW5kZXgpLFxuICAgICAgICBpbWFnZVRodW1iVXJsID0gJChlbCkuZGF0YShcInRodW1iXCIpLFxuICAgICAgICBpbWFnZVRodW1iQWx0ID0gJChlbCkuZGF0YShcImFsdFwiKSxcbiAgICAgICAgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKSxcbiAgICAgICAgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSxcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgLy8gYWRkIHNyYyBhbmQgYXR0ciB0byBpbWFnZVxuICAgICAgaW1hZ2VFbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBpbWFnZVRodW1iVXJsKTtcbiAgICAgIGltYWdlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgaW1hZ2VUaHVtYkFsdCk7XG4gICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiI1wiKTtcbiAgICAgIGxpbmtFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRWxlbWVudCk7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiLCBpdGVtSW5kZXgpO1xuXG4gICAgICAvLyBzZXQgZmlyc3QgaW1hZ2UgdG8gc2VsZWN0ZWRcbiAgICAgIGluZGV4ID09PSB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCA/IGVsZW1lbnQuY2xhc3NOYW1lID0gXCJzZWxlY3RlZFwiIDogXCJcIjtcblxuICAgICAgLy8gYXBwZW5kIHRvIGZyYWdtZW50XG4gICAgICBmcmFnbWVudC5hcHBlbmQoZWxlbWVudCk7XG5cbiAgICB9KTtcblxuICAgIC8vIGluc2VydCBodG1sIGVsZW1lbnQgdG8gdGhlIGRvbSBhZnRlciBsb29wIGZpbmlzaGVzXG4gICAgdGhpcy50aHVtYnNDb250YWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICB9XG5cbiAgYnVpbGRUaHVtYnNDbGlja0hhbmRsZXIoIGNhbGxiYWNrICkge1xuXG4gICAgLy8gQWRkIGFycmF5IG9mIGh0bWwgb2JqZWN0IHRvIGF0dGFjaCBjbGljayBldmVudHMgdG8gbGF0ZXJcbiAgICB0aGlzLnRodW1ic0NsaWNrID0gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcImFcIik7XG5cbiAgICAvLyBDbGljayBoYW5kbGVyIGZvciBwcmV2aWV3IHRodW1icyBvbiBkZXNrdG9wLCBuZWVkcyB0byB3b3JrIG9uIHRhYmxldCAtPiBkZXNrdG9wXG4gICAgdGhpcy50aHVtYnNDbGljay5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuICAgICAgJChlbCkub24oXCJjbGlja1wiLCB7IGtleXM6IFwidGh1bWJuYWlsXCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfSk7XG5cbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgYW5pbWF0ZUluVGh1bWJzKCkge1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuc2hvd0Nhc2VUaHVtYnMsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IDFcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVHYWxsZXJ5SW4oKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fb3V0ZXItLWJnaW1hZ2VcIiksIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IC43LFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcblxuICAgIHRoaXMuc2V0Rmlyc3RTbGlkZSgpO1xuXG4gICAgLy8gSW5pdCBjb3JyZWN0IG5hdiBkZXBlbmRpbmcgb24gdmlld3BvcnQgc2l6ZVxuICAgIHRoaXMuY2hlY2tTaXplKCk7XG4gICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KCk7XG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcImxlZnRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5leHRCdG5Nb2JpbGUub24oXCJjbGlja1wiLCB7IGtleXM6IFwicmlnaHRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRUb3RhbFNsaWRlcygpKSk7XG5cbiAgICAvLyB1cGRhdGUgY291bnRlclxuICAgIHRoaXMuY3VycmVudENvdW50SXRlbS5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICB9XG59XG5cbi8vIGxvb3AgdGhyb3VnaCBlYWNoIGhlYWRlciBzbGlkZXIgb2JqZWN0IG9uIHRoZSBwYWdlXG5jbGFzcyBTaG93Q2FzZVNMaWRlciB7XG5cbiAgaXRlbUluZm9XcmFwcGVyOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIgPSAkKFwiLnNob3djYXNlXCIpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNob3djYXNlIFNsaWRlciBpbml0XCIpO1xuXG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIuZWFjaCgoIGluZGV4OiBudW1iZXIsIGVsOiBPYmplY3QgKSA9PiB7XG5cbiAgICAgIC8vIFBhc3MgXCJ0aGlzXCIgdG8gZWFjaCBuZXcgSGVhZGVyIHNsaWRlciBjb21wb25lbnRcbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2hvd2Nhc2VDb21wb25lbnQoZWwpO1xuICAgICAgc2xpZGVyLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmxldCBTaG93Y2FzZVNsaWRlciA9IG5ldyBTaG93Q2FzZVNMaWRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBTaG93Y2FzZVNsaWRlcjtcbiIsImNvbnN0ICQgPSBqUXVlcnk7XG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTdGlja3lTaWRlYmFyQ29tcG9uZW50IHtcblxuICBpc0FuaW1hdGluZzogYm9vbGVhbjtcbiAgY29udGVudFdyYXBwZXI6IEpRdWVyeTtcbiAgY29udGVudE9mZnNldFRvcDogbnVtYmVyO1xuICBjb250ZW50V3JhcHBlckhlaWdodDogbnVtYmVyO1xuICBzY3JvbGxUb3A6IG51bWJlcjtcbiAgYXNpZGU6IEpRdWVyeTtcbiAgc2lkZWJhcldyYXBwZXI6IEpRdWVyeTtcbiAgd2luZG93SGVpZ2h0OiBudW1iZXI7XG4gIHNpZGViYXJIZWlnaHQ6IG51bWJlcjtcbiAgZm9vdGVySGVpZ2h0OiBudW1iZXI7XG4gIHNjcm9sbGluZ0Rvd246IGJvb2xlYW47XG4gIGxhc3RTY3JvbGxUb3A6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlciA9ICQoXCIuc2lkZWJhci1jb250ZW50XCIpO1xuICAgIHRoaXMuYXNpZGUgPSAkKFwiLnNlcnZpY2Utc2lkZWJhci13cmFwcGVyXCIpO1xuICAgIHRoaXMud2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFyV3JhcHBlciA9ICQoXCIuc2VydmljZS1zaWRlYmFyXCIpO1xuICB9XG5cbiAgY2hlY2tTaWRlYmFyKCk6IHZvaWQge1xuICAgIC8vIENoZWNrIGlmIHRoZSBzaWRlYmFyIGlzIGZpeGVkIG9yIG5vdFxuICAgIGlmICggIXRoaXMuaXNBbmltYXRpbmcgJiYgVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpID9cbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpLCAzMDApIDpcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIHRoaXMucmVzZXRTaWRlQmFyKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tTaWRlYmFyVmlzaWJpbGl0eSgpIHtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICAvLyBkb2VzIHNpZGViYXIgaGF2ZSBjbGFzcyB2aXNpYmlsaXR5XG4gICAgICBsZXQgaXNWaXNpYmxlID0gdGhpcy5hc2lkZS5oYXNDbGFzcygndmlzaWJsZScpO1xuXG4gICAgICBpZiAoICFpc1Zpc2libGUgKSB7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU2lkZWJhckluKHRoaXMuYXNpZGUpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIHJlc2V0U2lkZUJhcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5hc2lkZS5yZW1vdmVDbGFzcyhcInN0aWNreVwiKTtcbiAgICB0aGlzLmFzaWRlLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGViYXJQb3NpdGlvbigpOiB2b2lkIHtcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxEaXJlY3Rpb24oKTtcblxuICAgIHRoaXMuY2hlY2tTaWRlYmFyVmlzaWJpbGl0eSgpO1xuXG4gICAgLy8gZ2V0IGRpc3RhbmNlIGZyb20gdG9wIG9mIGNvbnRlbnQgMTAgKyA0MCA9IDUwIHBhZGRpbmcgdG9wXG4gICAgLy8gdGhpcy5jb250ZW50T2Zmc2V0VG9wID0gdGhpcy5jb250ZW50V3JhcHBlci5vZmZzZXQoKS50b3AgLSAxMDtcbiAgICB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm9mZnNldCgpLnRvcCArIDI1O1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCA9IHRoaXMuY29udGVudFdyYXBwZXIub3V0ZXJIZWlnaHQoKTsgLy8gaW5jbHVkZSBwYWRkaW5nIGFuZCBtYXJnaW5cblxuXG4gICAgLy8gZ2V0IHdoZXJlIHRvcCBvZiB3aW5kb3cgaXNcbiAgICB0aGlzLnNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnRlbnQgV3JhcHBlciBIZWlnaHRcIiwgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJDb250ZW50IE9mZnNldFwiLCB0aGlzLmNvbnRlbnRPZmZzZXRUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2lkZWJhciBIZWlnaHRcIiwgdGhpcy5zaWRlYmFySGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIldpbmRvdyBIZWlnaHRcIiwgdGhpcy53aW5kb3dIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwib2Zmc2V0IFRvcFwiLCB0aGlzLmNvbnRlbnRPZmZzZXRUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2Nyb2xsVG9wXCIsIHRoaXMuc2Nyb2xsVG9wKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNpZGViYXJvZmZzZXRcIiwgdGhpcy5zY3JvbGxUb3ApO1xuXG4gICAgLy8gSWYgdGhlIHdpbmRvdyBWIHBvc2l0aW9uIGlzIGxlc3MgdGhhbiB0aGUgY29udGVudCBWIHBvc2l0aW9uIG1ha2Ugc2lkZWJhciBub3JtYWxcbiAgICBpZiAoIHRoaXMuc2Nyb2xsVG9wIDwgdGhpcy5jb250ZW50T2Zmc2V0VG9wICkge1xuICAgICAgbGV0IGNzc1Byb3BzID0ge1xuICAgICAgICBcInRyYW5zaXRpb25cIjogXCJ0b3AgLjNzXCJcbiAgICAgIH07XG4gICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpO1xuICAgICAgdGhpcy5hc2lkZS5jc3MoY3NzUHJvcHMpO1xuXG4gICAgICAvLyBpZiB3aW5kb3cgViBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gY29udGVudCAtIGFkZCBzdGlja3lcbiAgICAgIC8vIDJuZCBjaGVja3MgdGhlIG9mZnNldCBvZiB0aGUgdG9wIG9mIHRoZSB3aW5kb3cgdG8gdGhlIHRvcCBvZiB0aGUgY29udGVudCAmJiB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRlbnQgaW4gcmVsYXRpb24gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSB3aW5kb3cgLSA0MCBvbiBlbmRcbiAgICB9IGVsc2UgaWYgKCB0aGlzLnNjcm9sbFRvcCA+PSB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgJiYgdGhpcy5zY3JvbGxUb3AgPCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgdGhpcy5jb250ZW50T2Zmc2V0VG9wIC0gNTAgKSB7XG4gICAgICB0aGlzLmFzaWRlLmFkZENsYXNzKFwic3RpY2t5XCIpLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcblxuICAgICAgaWYgKCB0aGlzLnNjcm9sbGluZ0Rvd24gPT09IHRydWUgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcInRvcCAuM3NcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFzaWRlLmNzcyhcInRyYW5zaXRpb25cIiwgXCJcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbGV0IGFydGljbGVQYWRkaW5nVG9wID0gTnVtYmVyKGFydGljbGVzLmVxKDEpLmNzcyhcInBhZGRpbmctdG9wXCIpLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XG4gICAgICBpZiAoIHRoaXMuYXNpZGUuaGFzQ2xhc3MoXCJzdGlja3lcIikgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuICAgICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpLmNzcyhcInRvcFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgMSArIFwicHhcIik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgfVxuXG4gIGNoZWNrU2Nyb2xsRGlyZWN0aW9uKCkge1xuICAgIC8vIExvZyBjdXJyZW50IHNjcm9sbFBvaW50XG4gICAgbGV0IHN0ID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblxuICAgIC8vIGNvbXBhcmUgdG8gbGFzdCBzY3JvbGxQb2ludFxuICAgIGlmICggc3QgPiB0aGlzLmxhc3RTY3JvbGxUb3AgKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInNjcm9sbCBkb3duXCIpO1xuICAgICAgLy8gZG93bnNjcm9sbCBjb2RlXG4gICAgICB0aGlzLnNjcm9sbGluZ0Rvd24gPSB0cnVlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwic2Nyb2xsIHVwXCIpO1xuICAgICAgLy8gdXBzY3JvbGwgY29kZVxuICAgICAgdGhpcy5zY3JvbGxpbmdEb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gb24gY29tcGxldGUgLSBtYWtlIGxhc3QgU2Nyb2xsIHBvaW50IHRoZSBwb2ludCBhdCB3aGljaCB0aGV5IHN0YXJ0ZWQgc2Nyb2xsaW5nIGF0IGZpcnN0XG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gc3Q7XG4gIH1cblxuICBhbmltYXRlU2lkZWJhckluKCBlbGVtZW50OiBKUXVlcnkgKSB7XG5cbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzKFwiaW50cm9cIik7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgbGV0IHNpZGViYXJJbnRybyA9IFR3ZWVuTWF4LnRvKGVsZW1lbnQsIC4zLCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHo6IC4wMDEsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXQsXG4gICAgICAgIGRlbGF5OiAuOSxcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIC8vIG1ha2Ugc2lkZWJhciBwZXJtYW5lbnRseSB2aXNpYmxlXG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0aWNreSBzaWRlYmFyIGxvYWRlZFwiKTtcblxuICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IDA7XG5cbiAgICBpZiAoIHRoaXMuYXNpZGUubGVuZ3RoID4gMCApIHtcbiAgICAgIHRoaXMuY2hlY2tTaWRlYmFyKCk7XG5cbiAgICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcbiAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcblxuICAgICAgLy8gQW5pbWF0ZSBzaWRlIGJhciBpbiBvbiBsb2FkXG4gICAgICB0aGlzLmFuaW1hdGVTaWRlYmFySW4odGhpcy5hc2lkZSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBBbmltYXRlIHNpZGUgYmFyIGluIG9uIGxvYWRcbiAgICAgIHRoaXMuYW5pbWF0ZVNpZGViYXJJbigkKFwiLnNlcnZpY2Utc2lkZWJhci1ub3N0aWNrXCIpKTtcblxuICAgIH1cbiAgfVxufVxuXG5sZXQgU3RpY2t5U2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN0aWNreVNpZGViYXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmNsYXNzIFRlc3RpbW9uYWlsQ29tcG9uZW50IHtcblxuICB0ZXN0aW1vbmFpbHM6IEpRdWVyeTtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgY3VycmVudEhlaWdodDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVzdGltb25haWxzID0gJChcIi50ZXN0aW1vbmlhbHNcIik7XG4gIH1cblxuICBnZW5lcmF0ZUlkKCBpbmRleCwgZWwgKSB7XG5cbiAgICAvLyBjcmVhdGUgRHluYW1pYyBJRFxuICAgIGxldCBpZFN0cmluZyA9IFwiY2Fyb3VzZWwtdGVzdGltb25pYWwtXCIgKyBpbmRleDtcbiAgICBlbC5hdHRyKFwiaWRcIiwgaWRTdHJpbmcpO1xuXG4gICAgLy8gQWRkIG1hdGNoaW5nIGhyZWYgdG8gY29udHJvbHNcbiAgICBsZXQgY29udHJvbHMgPSBlbC5maW5kKFwiLmNhcm91c2VsLWNvbnRyb2xcIik7XG4gICAgY29udHJvbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgJChlbCkuYXR0cihcImhyZWZcIiwgXCIjXCIgKyBpZFN0cmluZyk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgb25SZXNpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIENoYW5nZSBIZWlnaHQgb24gcmVzaXplXG4gICAgICB0aGlzLnRlc3RpbW9uYWlscy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAgIGxldCAkdGhpcyA9ICQoZWwpO1xuXG4gICAgICAgIC8vIGVzdGFibGlzaCB2YXJzXG4gICAgICAgIGxldCAkaW5uZXIgPSAkdGhpcy5maW5kKFwiLmNhcm91c2VsLWlubmVyXCIpLFxuICAgICAgICAgICAgJGFjdGl2ZSA9ICRpbm5lci5maW5kKFwiLmFjdGl2ZVwiKSxcbiAgICAgICAgICAgIGJsb2NrSXRlbSA9ICRhY3RpdmUuZmluZChcImJsb2NrcXVvdGVcIik7XG5cbiAgICAgICAgLy8gU2V0IGhlaWdodCBmb3IgZmlyc3QgaXRlbVxuICAgICAgICBsZXQgaGVpZ2h0ID0gYmxvY2tJdGVtLm91dGVySGVpZ2h0KCk7XG5cbiAgICAgICAgLy8gaWYgdGhleSBhcmVuJ3QgZXF1YWwsIGNoYW5nZSB0aGVtXG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50SGVpZ2h0ICE9PSBoZWlnaHQgKSB7XG4gICAgICAgICAgJGlubmVyLmNzcyhcImhlaWdodFwiLCBoZWlnaHQpO1xuICAgICAgICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0sIDQwMCk7XG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgY29uc29sZS5sb2coXCJUZXN0aW1vbmlhbHMgSW5pdFwiKTtcblxuICAgIC8vIE1ha2UgaXRlbXMgZHluYW1pY1xuICAgIHRoaXMudGVzdGltb25haWxzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVJZChpbmRleCwgJHRoaXMpO1xuXG4gICAgICAvLyBtYWtlIGZpcnN0IGVsZW1lbnQgYWN0aXZlXG4gICAgICBsZXQgJGlubmVyID0gJHRoaXMuZmluZChcIi5jYXJvdXNlbC1pbm5lclwiKTtcbiAgICAgIGxldCAkZmlyc3QgPSAkaW5uZXIuY2hpbGRyZW4oXCIuaXRlbVwiKS5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyBTZXQgaGVpZ2h0IGZvciBmaXJzdCBpdGVtXG4gICAgICBsZXQgaGVpZ2h0ID0gJGZpcnN0Lm91dGVySGVpZ2h0KCk7XG4gICAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAkaW5uZXIuY3NzKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICB9KTtcblxuICAgIC8vIFN0YXJ0IFNsaWRlcnNcbiAgICB0aGlzLnRlc3RpbW9uYWlscy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAvLyBpbml0IGNhcm91c2VsXG4gICAgICAkKGVsKS5jYXJvdXNlbCgpO1xuXG4gICAgICAvLyBPbiBzbGlkZSBjaGFuZ2UgaGVpZ2h0IGZvciBzbW9vdGggdHJhbnNpdGlvbnNcbiAgICAgICQoZWwpLm9uKFwic2xpZC5icy5jYXJvdXNlbFwiLCAoIGUgKSA9PiB7XG5cbiAgICAgICAgLy8gc2xpZGVcbiAgICAgICAgbGV0ICR0aGlzID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBsZXQgY3VycmVudFNsaWRlID0gJCgkdGhpcykuZmluZChcIi5hY3RpdmVcIik7XG4gICAgICAgIGxldCBibG9ja0l0ZW0gPSBjdXJyZW50U2xpZGUuZmluZChcImJsb2NrcXVvdGVcIik7XG4gICAgICAgIGxldCBoZWlnaHQgPSBibG9ja0l0ZW0ub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBjdXJyZW50U2xpZGUucGFyZW50KFwiLmNhcm91c2VsLWlubmVyXCIpLmNzcyhcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGFkanVzdCBzaXplIG9uIHJlc2l6ZVxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxuY29uc3QgVGVzdGltb25haWxzID0gbmV3IFRlc3RpbW9uYWlsQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RpbW9uYWlsczsiLCJpbXBvcnQge0Jwc0ludGVyZmFjZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYnBzLmludGVyZmFjZVwiO1xuY29uc3QgJCA9IGpRdWVyeTtcblxuLy8gQWRkIGludGVyZmFjZSBKUXVlcnlTbW9vdGgge1xuLy8gc21vb3RoU3RhdGUoKTp2b2lkO1xuLy8gfVxuLy8gc21vb3RoU3RhdGUoYXJnOiBPYmplY3QpOiBKUXVlcnk7XG5cbmNsYXNzIFV0aWxpdHlDb21wb25lbnQge1xuICB3aW5kb3dXaWR0aDogbnVtYmVyO1xuICBicmVha3BvaW50OiBudW1iZXI7XG4gIGJyZWFrcG9pbnRzOiBudW1iZXJbXTtcbiAgYnBzOiBCcHNJbnRlcmZhY2U7XG4gIGJyb3dzZXI6IHN0cmluZztcblxuICBwcml2YXRlIF9zZXRCcmVha3BvaW50cyA9ICggYnBzOiBCcHNJbnRlcmZhY2UgKSA9PiB7XG4gICAgbGV0IGFyciA9IFtdO1xuXG4gICAgZm9yICggbGV0IGtleSBpbiBicHMgKSB7XG4gICAgICBpZiAoIGJwcy5oYXNPd25Qcm9wZXJ0eShrZXkpICkge1xuICAgICAgICBhcnIucHVzaChicHNbIGtleSBdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyLnJldmVyc2UoKTtcbiAgfTtcbiAgcHJpdmF0ZSBfY2hlY2tCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIG1ha2UgYnJlYWtwb2ludCBldmVudCBhdmFpbGFibGUgdG8gYWxsIGZpbGVzIHZpYSB0aGUgd2luZG93IG9iamVjdFxuICAgIGxldCBvbGRfYnJlYWtwb2ludCA9IHRoaXMuYnJlYWtwb2ludDtcblxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcblxuICAgIGlmICggb2xkX2JyZWFrcG9pbnQgIT09IHRoaXMuYnJlYWtwb2ludCApIHtcblxuICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoXCJicmVha3BvaW50Q2hhbmdlXCIsIFV0aWxzLmJyZWFrcG9pbnQpO1xuICAgIH1cbiAgfTtcbiAgcHJpdmF0ZSBfc2V0QnJlYWtwb2ludCA9ICgpID0+IHtcbiAgICAvLyBnZXQgYnJlYWtwb2ludCBmcm9tIGNzc1xuICAgIGxldCBib2R5ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KSxcbiAgICAgIHppbmRleCA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbIFwiei1pbmRleFwiIF07XG5cbiAgICB0aGlzLmJyZWFrcG9pbnQgPSBwYXJzZUludCh6aW5kZXgsIDEwKTtcbiAgfTtcbiAgcHJpdmF0ZSBfc2V0V2luZG93V2lkdGggPSAoKSA9PiB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICB9O1xuXG4gIHNldE51bWJlciggY291bnQ6IG51bWJlciApOiBzdHJpbmcge1xuICAgIC8vIGNvbnZlciBudW1iZXIgdG8gc3RyaW5nXG4gICAgbGV0IHRvdGFsID0gY291bnQ7XG4gICAgcmV0dXJuIHRvdGFsLnRvU3RyaW5nKCk7XG4gIH1cblxuICB3aGljaEJyb3dzZXIoKSB7XG4gICAgaWYgKCAobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJzYWZhcmlcIikgPiAtMSkgJiYgIShcbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiY2hyb21lXCIpID4gLTEpICYmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PT1cbiAgICAgIFwiTmV0c2NhcGVcIikgKSB7XG5cbiAgICAgIGlmICggbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKSAhPT0gbnVsbCApIHtcbiAgICAgICAgcmV0dXJuIFwiaXBhZFwiO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJzYWZhcmlcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBidWlsZEh0bWwoIHR5cGU6IHN0cmluZywgYXR0cnM/OiBPYmplY3QsIGh0bWw/OiBzdHJpbmcgKSB7XG4gICAgXG4gICAgLy8gaHR0cDovL21hcmNncmFiYW5za2kuY29tL2J1aWxkaW5nLWh0bWwtaW4tanF1ZXJ5LWFuZC1qYXZhc2NyaXB0L1xuICAgIFxuICAgIGxldCBoID0gJzwnICsgdHlwZTtcblxuICAgIGZvciAoIGxldCBhdHRyIGluIGF0dHJzICkge1xuICAgICAgaWYgKCBhdHRyc1sgYXR0ciBdID09PSBmYWxzZSApIGNvbnRpbnVlO1xuICAgICAgaCArPSAnICcgKyBhdHRyICsgJz1cIicgKyBhdHRyc1sgYXR0ciBdICsgJ1wiJztcbiAgICB9XG5cbiAgICByZXR1cm4gaCArPSBodG1sID8gXCI+XCIgKyBodG1sICsgXCI8L1wiICsgdHlwZSArIFwiPlwiIDogXCIvPlwiO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDA7XG4gICAgdGhpcy5icmVha3BvaW50ID0gMzIwO1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSBbXTtcbiAgICB0aGlzLmJwcyA9IHtcbiAgICAgIG1vYmlsZTogNTQ0LFxuICAgICAgdGFibGV0OiA3NjgsXG4gICAgICBsYXB0b3A6IDk5MixcbiAgICAgIGRlc2t0b3A6IDEyMDAsXG4gICAgICBkZXNrdG9wX3hsOiAxNjAwXG4gICAgfTtcbiAgICB0aGlzLmJyb3dzZXIgPSB0aGlzLndoaWNoQnJvd3NlcigpO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlV0aWxpdGllcyBsb2FkZWRcIik7XG5cbiAgICAvLyBzZXQgYnJlYWtwb2ludCBvbiB3aW5kb3cgbG9hZFxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcbiAgICB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBCcmVha3BvaW50IGlzOlwiLCB0aGlzLmJyZWFrcG9pbnQpO1xuXG4gICAgLy8gY3JlYXRlIGZ1bGwgYXJyYXkgZm9yIGltYWdlIGNvbXByZXNzaW9uIHJlZlxuICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLl9zZXRCcmVha3BvaW50cyh0aGlzLmJwcyk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5fY2hlY2tCcmVha3BvaW50KS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBVdGlscyA9IG5ldyBVdGlsaXR5Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyJdfQ==
