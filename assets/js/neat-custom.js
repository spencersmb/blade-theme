(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 Ref path is not needed for some reason
 <reference path="/Users/yosemetie/Dropbox/development/vhosts/www.lyndascore.dev/wp-content/themes/neat/typings/tsd.d.ts" />
 */
"use strict";
var utils_1 = require("./partials/utils");
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
            // Nav.init();
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

},{"./navigation/components/search":2,"./partials/gallery-isotope":4,"./partials/header-slider":5,"./partials/header-svg":6,"./partials/imageLoader":7,"./partials/processAnimation":8,"./partials/quote-builder":9,"./partials/showcase-slider":10,"./partials/sticky-sidebar":11,"./partials/testimonials":12,"./partials/utils":13}],2:[function(require,module,exports){
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

},{"./utils":13}],4:[function(require,module,exports){
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

},{"./utils":13}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./desc-o-animation":3,"./utils":13}],9:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvZGVzYy1vLWFuaW1hdGlvbi50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvZ2FsbGVyeS1pc290b3BlLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9oZWFkZXItc2xpZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9oZWFkZXItc3ZnLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9pbWFnZUxvYWRlci50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvcHJvY2Vzc0FuaW1hdGlvbi50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvcXVvdGUtYnVpbGRlci50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvc2hvd2Nhc2Utc2xpZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zdGlja3ktc2lkZWJhci50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvdGVzdGltb25pYWxzLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7R0FHRzs7QUFFSCxzQkFBa0Isa0JBQWtCLENBQUMsQ0FBQTtBQUVyQyx1QkFBbUIsZ0NBQWdDLENBQUMsQ0FBQTtBQUNwRCwyQkFBc0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM5Qyw0QkFBd0Isd0JBQXdCLENBQUMsQ0FBQTtBQUNqRCwrQkFBMEIsMkJBQTJCLENBQUMsQ0FBQTtBQUN0RCxpQ0FBZ0MsNkJBQTZCLENBQUMsQ0FBQTtBQUM5RCxnQ0FBMkIsNEJBQTRCLENB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ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gUmVmIHBhdGggaXMgbm90IG5lZWRlZCBmb3Igc29tZSByZWFzb25cbiA8cmVmZXJlbmNlIHBhdGg9XCIvVXNlcnMveW9zZW1ldGllL0Ryb3Bib3gvZGV2ZWxvcG1lbnQvdmhvc3RzL3d3dy5seW5kYXNjb3JlLmRldi93cC1jb250ZW50L3RoZW1lcy9uZWF0L3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuICovXG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi9wYXJ0aWFscy91dGlsc1wiO1xuaW1wb3J0IE5hdiBmcm9tIFwiLi9uYXZpZ2F0aW9uL25hdmlnYXRpb25cIjtcbmltcG9ydCBTZWFyY2ggZnJvbSBcIi4vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaFwiO1xuaW1wb3J0IFN2Z0hlYWRlciBmcm9tIFwiLi9wYXJ0aWFscy9oZWFkZXItc3ZnXCI7XG5pbXBvcnQgSW1hZ2VMb2FkZXIgZnJvbSBcIi4vcGFydGlhbHMvaW1hZ2VMb2FkZXJcIjtcbmltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3N0aWNreS1zaWRlYmFyXCI7XG5pbXBvcnQgQW5pbWF0aW9uQ29udHJvbGxlciBmcm9tIFwiLi9wYXJ0aWFscy9wcm9jZXNzQW5pbWF0aW9uXCI7XG5pbXBvcnQgSXNvdG9wZUdhbGxlcnkgZnJvbSBcIi4vcGFydGlhbHMvZ2FsbGVyeS1pc290b3BlXCI7XG5pbXBvcnQgSGVhZGVyU2xpZGVyIGZyb20gXCIuL3BhcnRpYWxzL2hlYWRlci1zbGlkZXJcIjtcbmltcG9ydCBTaG93Y2FzZVNsaWRlciBmcm9tIFwiLi9wYXJ0aWFscy9zaG93Y2FzZS1zbGlkZXJcIjtcbmltcG9ydCBUZXN0aW1vbmlhbHMgZnJvbSBcIi4vcGFydGlhbHMvdGVzdGltb25pYWxzXCI7XG5pbXBvcnQgUXVvdGVCdWlsZGVyIGZyb20gXCIuL3BhcnRpYWxzL3F1b3RlLWJ1aWxkZXJcIjtcbi8vIGltcG9ydCBTdGlja3lTaWRlYmFyIGZyb20gXCIuL3BhcnRpYWxzL3NlcnZpY2Utc2lkZWJhclwiO1xuY29uc3QgJCA9IGpRdWVyeTtcbmRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgY2xhc3MgQXBwIHtcblxuICAgIGluaXQoKTogdm9pZCB7XG4gICAgICBjb25zb2xlLmxvZyhcIkFwcCBsb2FkZWRcIik7XG4gICAgICBTdmdIZWFkZXIuaW5pdCgpO1xuICAgICAgVXRpbHMuaW5pdCgpO1xuICAgICAgLy8gTmF2LmluaXQoKTtcbiAgICAgIFNlYXJjaC5pbml0KCk7XG4gICAgICBTdGlja3lTaWRlYmFyLmluaXQoKTtcbiAgICAgIFRlc3RpbW9uaWFscy5pbml0KCk7XG4gICAgICBRdW90ZUJ1aWxkZXIuaW5pdCgpO1xuICAgICAgQW5pbWF0aW9uQ29udHJvbGxlci5pbml0KCk7IC8vIEdsb2JhbCB3aW5kb3cgYW5pbSBhbmQgY2xpY2sgY29udHJvbFxuICAgIH1cbiAgfVxuXG4gICAgbGV0IGJvb3RzdHJhcCA9IG5ldyBBcHAoKTtcblxuXG4gIC8qKiBydW4gYWxsIGZ1bmN0aW9ucyAqL1xuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgYm9vdHN0cmFwLmluaXQoKTtcbiAgICBJbWFnZUxvYWRlci5pbml0KCk7XG4gIH0pO1xuXG4gIC8vIEJpbmQgZXZlbnRzIHRvIHRoZSBpbWFnZXNMb2FkZWQgcGx1Z2luIGhlcmVcbiAgJChkb2N1bWVudCkub24oXCJpbWdMb2FkZWRcIiwgZnVuY3Rpb24gKCBlICkge1xuICAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICBcbiAgICAvLyBjaGVjayBpZiBwYWdlIGhhcyBnYWxsZXJ5XG4gICAgaWYgKCAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBJc290b3BlR2FsbGVyeS5pbml0KCk7XG4gICAgfVxuICAgIEhlYWRlclNsaWRlci5pbml0KCk7XG4gICAgU2hvd2Nhc2VTbGlkZXIuaW5pdCgpO1xuXG4gIH0pO1xuXG59KSgpOyIsImNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4uLy4uL3BhcnRpYWxzL3V0aWxzXCI7XG5cbmNsYXNzIFNlYXJjaENvbXBvbmVudCB7XG4gICRzZWFyY2hUcmlnZ2VyOiBKUXVlcnk7XG4gICRzZWFyY2hDbG9zZVRyaWdnZXI6IEpRdWVyeTtcbiAgJHNlYXJjaEZvcm06IEpRdWVyeTtcbiAgJHNlYXJjaEJ1dHRvbkFyZWE6IEpRdWVyeTtcbiAgJGljb246IEpRdWVyeTtcbiAgJGZvcm06IEpRdWVyeTtcbiAgJGlucHV0OiBKUXVlcnk7XG4gICR3aWR0aDogbnVtYmVyO1xuICAkaGVpZ2h0OiBudW1iZXI7XG4gIGlzT3BlbjogYm9vbGVhbjtcblxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gdGhpcy4kc2VhcmNoRm9ybS5maW5kKFwiLm5lYXQtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGlucHV0ID0gdGhpcy4kZm9ybS5maXJzdCgpO1xuICAgIHRoaXMuJHdpZHRoID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS53aWR0aCgpO1xuICAgIHRoaXMuJGhlaWdodCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEuaGVpZ2h0KCk7XG4gIH1cblxuICByZWxvYWQoKSB7XG4gICAgY29uc29sZS5sb2coXCJTZWFyY2ggUmVsb2FkXCIpO1xuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIgPSAkKFwiLm1ldGEtc2VhcmNoLXRyaWdnZXJcIik7XG4gICAgdGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyID0gJChcIi5zdXBlci1zZWFyY2gtY2xvc2VcIik7XG4gICAgdGhpcy4kc2VhcmNoRm9ybSA9ICQoXCIuc3VwZXItc2VhcmNoXCIpO1xuICAgIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEgPSAkKFwiLm1ldGEtc2VhcmNoXCIpO1xuICAgIHRoaXMuJGljb24gPSB0aGlzLiRzZWFyY2hUcmlnZ2VyLmNoaWxkcmVuKFwiaVwiKTtcbiAgICB0aGlzLiRmb3JtID0gJChcIi5uZWF0LXNlYXJjaFwiKTtcbiAgICB0aGlzLiR3aWR0aCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgICB0aGlzLiRoZWlnaHQgPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLmhlaWdodCgpO1xuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMub3BlblNlYXJjaC5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlci5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgfVxuXG4gIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLmhlaWdodCgpO1xuICB9XG5cbiAgZ2V0VG9wUG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4kc2VhcmNoVHJpZ2dlci5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gIH1cblxuICBnZXRMZWZ0UG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4kc2VhcmNoVHJpZ2dlci5vZmZzZXQoKS5sZWZ0O1xuICB9XG5cbiAgY2xvc2VTZWFyY2goIGV2ZW50ICkge1xuXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgIGxldCBhbmltYXRpb24gPSBuZXcgVGltZWxpbmVMaXRlKCk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyLCAuMiwge1xuICAgICAgdG9wOiBcIjUlXCIsXG4gICAgICBvcGFjaXR5OiBcIjBcIlxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGZvcm0sIC40LCB7XG4gICAgICB0b3A6IFwiMjUlXCIsXG4gICAgICBvcGFjaXR5OiBcIjBcIixcbiAgICAgIGVhc2U6IEV4cG8uZWFzZUluT3V0XG4gICAgfSk7XG5cbiAgICBhbmltYXRpb24udG8odGhpcy4kc2VhcmNoRm9ybSwgLjIsIHtcbiAgICAgIGxlZnQ6IHRoaXMuZ2V0TGVmdFBvc2l0aW9uKCksXG4gICAgICB0b3A6IHRoaXMuZ2V0VG9wUG9zaXRpb24oKSxcbiAgICAgIHdpZHRoOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuZ2V0SGVpZ2h0KCksXG4gICAgICBkZWxheTogLjMsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgd2lkdGg6IFwiMTAwJVwiXG4gICAgICAgIH0pO1xuICAgICAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgICAgICB0b3A6IFwiNTAlXCIsXG4gICAgICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSkudG8odGhpcy4kc2VhcmNoRm9ybSwgLjQsIHtcbiAgICAgIG9uQ29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kc2VhcmNoRm9ybS5jc3Moe1xuICAgICAgICAgIFwiei1pbmRleFwiOiAtMSxcbiAgICAgICAgICBcImxlZnRcIjogMCxcbiAgICAgICAgICBcInRvcFwiOiAwLFxuICAgICAgICAgIFwid2lkdGhcIjogMCxcbiAgICAgICAgICBcImhlaWdodFwiOiAwLFxuICAgICAgICB9KTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuXG4gIH1cblxuICBvcGVuU2VhcmNoKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcblxuICAgIC8vIHByZXZlbnQgYnV0dG9uIGZyb20gYmVpbmcgdXNlZCBvbmNlIHNlYXJjaCBpcyBvcGVuXG4gICAgdGhpcy4kc2VhcmNoVHJpZ2dlci5ibHVyKCk7XG5cbiAgICB0aGlzLiRzZWFyY2hGb3JtLmNzcyh7XG4gICAgICBsZWZ0OiB0aGlzLmdldExlZnRQb3NpdGlvbigpLFxuICAgICAgdG9wOiB0aGlzLmdldFRvcFBvc2l0aW9uKCksXG4gICAgICB3aWR0aDogMzUsXG4gICAgICBoZWlnaHQ6IDM1LFxuICAgICAgXCJ6LWluZGV4XCI6IDk5OVxuICAgIH0pO1xuXG4gICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIGFuaW1hdGlvbi50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXG4gICAgICBkZWxheTogLjJcbiAgICB9KS50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogMCxcbiAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgdG9wOiAwLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBcIjEwMHZoXCIsXG4gICAgICBib3JkZXJSYWRpdXM6IDAsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgb3ZlcmZsb3dZOiBcInNjcm9sbFwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGljb24sIC4yLCB7XG4gICAgICB0b3A6IFwiMTEwJVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyLCAuMywge1xuICAgICAgdG9wOiBcIjMlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjIwJVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjQsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIGxvYWRlZFwiKTtcbiAgICAvLyB0aGlzLm9wZW5TZWFyY2goKTtcbiAgICB0aGlzLiRpbnB1dC5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIC8vIGlmIGtleSBpcyBlbnRlciAtIGFuaW1hdGUgb3V0XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gICAgXG4gICAgJChcImJvZHlcIikua2V5dXAoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAyNyAmJiB0aGlzLmlzT3BlbiApIHtcbiAgICAgICAgdGhpcy5jbG9zZVNlYXJjaChldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubGV0IFNlYXJjaEJveCA9IG5ldyBTZWFyY2hDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQm94OyIsImRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG5jb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIERlc2NPZmZzZXRBbmltYXRpb24ge1xuICAkdGhpczogSlF1ZXJ5O1xuICBpc19kZXNjX2FuaW1hdGluZzogYm9vbGVhbjtcbiAgY29udHJvbGxlcjogYW55O1xuICBzY2VuZTogYW55O1xuICBzY2VuZTI6IGFueTtcblxuICBjb25zdHJ1Y3RvciggZWwgKSB7XG4gICAgdGhpcy4kdGhpcyA9ICQoZWwpO1xuICB9XG5cbiAgY2hlY2tTaXplKCkge1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy50YWJsZXQgKSB7XG5cbiAgICAgIC8vIEVuYWJsZSBBbmltYXRpb25cbiAgICAgIGlmICggdGhpcy5pc19kZXNjX2FuaW1hdGluZyA9PT0gZmFsc2UgKSB7XG5cbiAgICAgICAgdGhpcy5pc19kZXNjX2FuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZGVzY19vX2FuaW1hdGUoKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIGRpc2FibGUgYW5pbWF0aW9uXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLnRhYmxldCApIHtcblxuICAgICAgdGhpcy5pc19kZXNjX2FuaW1hdGluZyA9IGZhbHNlO1xuXG4gICAgICBpZiAoIHR5cGVvZiB0aGlzLnNjZW5lID09PSBcIm9iamVjdFwiICkge1xuXG4gICAgICAgIHRoaXMuc2NlbmUuZGVzdHJveSh0cnVlKTtcbiAgICAgICAgdGhpcy5zY2VuZTIuZGVzdHJveSh0cnVlKTtcblxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgZGVzY19vX2FuaW1hdGUoKSB7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLnRhYmxldCApIHtcblxuICAgICAgdGhpcy5pc19kZXNjX2FuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgIC8vIG5ldyB0aW1lbGluZSBldmVudFxuICAgICAgbGV0IHdpcGVBbmltYXRpb24gPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuICAgICAgLy8gSW1hZ2Ugb25lIHBsYWNlbWVudFxuICAgICAgd2lwZUFuaW1hdGlvbi5hZGQoW1xuICAgICAgICBUd2Vlbk1heC5mcm9tVG8odGhpcy4kdGhpcy5maW5kKFwiLmRlc2Mtby1pbWFnZS0xXCIpLCAxLCB7IHlQZXJjZW50OiAwIH0sIHtcbiAgICAgICAgICB5UGVyY2VudDogLTIwLFxuICAgICAgICAgIGVhc2U6IFBvd2VyMC5lYXNlSW5PdXRcbiAgICAgICAgfSlcbiAgICAgIF0pO1xuXG4gICAgICAvLyBJbWFnZSAyIHBsYWNlbWVudFxuICAgICAgbGV0IHdpcGVBbmltYXRpb24yID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICB3aXBlQW5pbWF0aW9uMi5hZGQoW1xuICAgICAgICBUd2Vlbk1heC5mcm9tVG8odGhpcy4kdGhpcy5maW5kKFwiLmRlc2Mtby1pbWFnZS0yXCIpLCAxLCB7IHlQZXJjZW50OiAwLCB9LCB7XG4gICAgICAgICAgeVBlcmNlbnQ6IC0xMDUsXG4gICAgICAgICAgZWFzZTogUG93ZXIwLmVhc2VJbk91dFxuICAgICAgICB9KVxuICAgICAgXSk7XG5cblxuICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuICAgICAgdGhpcy5zY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgICAge1xuICAgICAgICAgIHRyaWdnZXJFbGVtZW50OiB0aGlzLiR0aGlzWzBdLFxuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLiR0aGlzLmhlaWdodCgpLFxuICAgICAgICAgIG9mZnNldDogLTEwMFxuICAgICAgICB9KVxuICAgICAgICAuc2V0VHdlZW4od2lwZUFuaW1hdGlvbilcbiAgICAgICAgLy8gLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBFbClcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgICAuYWRkVG8odGhpcy5jb250cm9sbGVyKTtcblxuICAgICAgdGhpcy5zY2VuZTIgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICAgIHtcbiAgICAgICAgICB0cmlnZ2VyRWxlbWVudDogdGhpcy4kdGhpc1swXSxcbiAgICAgICAgICBkdXJhdGlvbjogdGhpcy4kdGhpcy5oZWlnaHQoKSArIDEwMCxcbiAgICAgICAgfSlcbiAgICAgICAgLnNldFR3ZWVuKHdpcGVBbmltYXRpb24yKVxuICAgICAgICAvLyAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMiAoZHVyYXRpb246IEVsKVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAgIC5hZGRUbyh0aGlzLmNvbnRyb2xsZXIpO1xuICAgIH1cblxuICB9XG5cbiAgaW5pdCgpIHtcblxuICAgIHRoaXMuZGVzY19vX2FuaW1hdGUoKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGVzY09mZnNldEFuaW1hdGlvbjsiLCJjb25zdCAkID0galF1ZXJ5O1xuZGVjbGFyZSB2YXIgSXNvdG9wZTogYW55O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIEdhbGxlcnlDb21wb25lbnQge1xuXG4gIGdyaWRJZDogc3RyaW5nO1xuICBnYWxsZXJ5X2dyaWQ6IG51bWJlcjtcbiAgZ2FsbGVyeV93cmFwcGVyX3dpZHRoOiBudW1iZXI7XG4gICRmdWxsR3JpZDogSlF1ZXJ5O1xuICAkaXNvdG9wZUdhbGxlcnk6IEpRdWVyeTtcbiAgJGdhbGxlcnlDb250YWluZXI6IEpRdWVyeTtcbiAgJGdhbGxlcnlJdGVtOiBKUXVlcnk7XG4gICRmaWx0ZXI6IEpRdWVyeTtcbiAgJGdyaWQ6IGFueTtcbiAgY3VycmVudEhlaWdodDogc3RyaW5nO1xuICBjdXJyZW50SGVpZ2h0UFg6IG51bWJlcjtcbiAgcmVJc29UaW1lT3V0OiBudW1iZXI7XG4gIGlzQ29udGFpbmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ3JpZElkID0gJChcIi5pbm5lci1jb250ZW50LW1vZHVsZVwiKS5jaGlsZHJlbihcImRpdlwiKS5hdHRyKFwiaWRcIik7XG4gICAgdGhpcy4kZnVsbEdyaWQgPSAkKFwiI1wiICsgdGhpcy5ncmlkSWQpO1xuICAgIHRoaXMuJGdhbGxlcnlDb250YWluZXIgPSAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJGlzb3RvcGVHYWxsZXJ5ID0gJChcIi5nYWxsZXJ5LWlzb3RvcGVcIik7XG4gICAgdGhpcy4kZ2FsbGVyeUl0ZW0gPSAkKFwiLmdhbGxlcnktaXRlbVwiKTtcbiAgICB0aGlzLiRmaWx0ZXIgPSAkKFwiLmZpbHRlci1ncm91cFwiKTtcbiAgfVxuXG4gIHNldHVwSXNvdG9wZSgpIHtcbiAgICAvLyBpbml0IGlzb3RvcGVcbiAgICB0aGlzLiRncmlkID0gdGhpcy4kZnVsbEdyaWQuaXNvdG9wZSh7XG4gICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gICAgICBpdGVtU2VsZWN0b3I6IFwiLmdhbGxlcnktaXRlbVwiLFxuICAgICAgaXNJbml0TGF5b3V0OiBmYWxzZSxcbiAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgXCJjb2x1bW5XaWR0aFwiOiBcIi5ncmlkLXNpemVyXCJcbiAgICAgIH0sXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246IFwiLjNzXCJcbiAgICB9KTtcbiAgfVxuXG4gIGdhbGxlcnlJc290b3BlV3JhcHBlcigpIHtcbiAgICBsZXQgd2luZG93V2lkdGhSZWYgPSAkKHdpbmRvdykuaW5uZXJXaWR0aCgpOyAvLyBmb3Igc2Nyb2xsIGJhciBmaXggY3VycmVudGx5XG5cbiAgICAvLyBJcyBjb250YWluZXIgb3IgZnVsbCB3aWR0aD9cbiAgICBpZiAoIHRoaXMuJGdhbGxlcnlDb250YWluZXIuaGFzQ2xhc3MoXCJjb250YWluZXJcIikgKSB7XG4gICAgICB0aGlzLmlzQ29udGFpbmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvL1xuICAgIGlmICggd2luZG93V2lkdGhSZWYgPiAxNjAwICYmIHRoaXMuaXNDb250YWluZWQgPT09IGZhbHNlICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA1O1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDYwMCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMTtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSA5OTEgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDI7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gMTE5OSApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA0O1xuICAgIH1cblxuICAgIGlmICggJChcIi5nYWxsZXJ5LTMtZ3JpZFwiKS5sZW5ndGggPiAwICYmIHdpbmRvd1dpZHRoUmVmID4gMTI0OCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMztcbiAgICB9XG5cbiAgICBpZiAoICQoXCIuZ2FsbGVyeS00LWdyaWRcIikubGVuZ3RoID4gMCAmJiB3aW5kb3dXaWR0aFJlZiA+IDE1ODQgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDQ7XG4gICAgfVxuXG4gICAgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggPSAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLndpZHRoKCk7XG5cbiAgICBpZiAoIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICUgdGhpcy5nYWxsZXJ5X2dyaWQgPiAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggPSB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCArICggdGhpcy5nYWxsZXJ5X2dyaWQgLSB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCAlIHRoaXMuZ2FsbGVyeV9ncmlkKTtcbiAgICB9XG4gICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkuY3NzKFwid2lkdGhcIiwgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeV9ncmlkO1xuICB9XG5cbiAgcmVsb2FkSXNvdG9wZSgpIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoKTtcbiAgICB0aGlzLnNldE1pbkhlaWdodCgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBjaGVjayBpZiBoZWlnaHQgaXMgYSByb3VuZCBudW1iZXIgdG8gZW5zdXJlIG5vIDFweCBpc3N1ZXNcbiAgICAgIHRoaXMuY2hlY2tDb250YWluZXJIZWlnaHQoKTtcbiAgICB9LCA3MDApO1xuICB9XG5cbiAgc2V0TWluSGVpZ2h0KCkge1xuXG4gICAgbGV0IGl0ZW0gPSAkKFwiLmdhbGxlcnktaXRlbS53aWR0aDFcIik7XG5cbiAgICAvLyBTZXQgbWluIGhlaWdodCBkZXBlbmRpbmcgb25lIHdoYXQgY29udGVudCB3YXMgZmlsdGVyZWRcbiAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBpdGVtLmNzcyhcInBhZGRpbmctYm90dG9tXCIpO1xuICAgIGxldCBoZWlnaHRTdHIgPSB0aGlzLmN1cnJlbnRIZWlnaHQudG9TdHJpbmcoKTtcbiAgICB0aGlzLmN1cnJlbnRIZWlnaHRQWCA9IHRoaXMucHhDb252ZXJ0KGhlaWdodFN0cik7XG5cbiAgICBpZiAoIHRoaXMuY3VycmVudEhlaWdodFBYICE9PSAwICkge1xuXG4gICAgICB0aGlzLiRpc290b3BlR2FsbGVyeS5jc3MoXCJtaW4taGVpZ2h0XCIsIE1hdGgucm91bmQodGhpcy5jdXJyZW50SGVpZ2h0UFgpKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuY3VycmVudEhlaWdodFBYID0gaXRlbS5oZWlnaHQoKTtcblxuICAgICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkuY3NzKFwibWluLWhlaWdodFwiLCBNYXRoLnJvdW5kKHRoaXMuY3VycmVudEhlaWdodFBYKSk7XG5cbiAgICB9XG4gIH1cblxuICBweENvbnZlcnQoIG9iamVjdEhlaWdodDogc3RyaW5nICkge1xuICAgIHJldHVybiBwYXJzZUludChvYmplY3RIZWlnaHQuc2xpY2UoMCwgLTIpKTtcbiAgfVxuXG4gIGFkZEltYWdlVHJhbnNpdGlvbigpIHtcbiAgICAvLyBhZGQgdHJhbnNpdGlvbiBmb3IgaW50cm8gYW5pbWF0aW9uXG4gICAgdGhpcy4kZ2FsbGVyeUl0ZW0uY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIjYwMG1zXCIpO1xuICB9XG5cbiAgbG9hZEltYWdlc0luKCkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZShcIm9uY2VcIiwgXCJhcnJhbmdlQ29tcGxldGVcIiwgKCkgPT4ge1xuXG4gICAgICAvLyBmYWRlIGluXG4gICAgICB0aGlzLiRnYWxsZXJ5SXRlbS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgLy8gcmVtb3ZlIGFuaW1hdGlvbiBmb3Igc21vb3RoIGZpbHRlcmluZyBhZnRlciBpbWFnZXMgaGF2ZSBsb2FkZWQgaW5cbiAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgdGhpcy4kZ2FsbGVyeUl0ZW0uY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIjBtc1wiKTtcbiAgICAgIH0sIDUwMCk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrQ29udGFpbmVySGVpZ2h0KCkge1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuJGlzb3RvcGVHYWxsZXJ5Lmhhc0NsYXNzKFwid2lkdGgtY29udGFpbmVkXCIpKSB7XG5cbiAgICAgIGxldCBjdXJyZW50SGVpZ2h0ID0gdGhpcy4kaXNvdG9wZUdhbGxlcnkuaGVpZ2h0KCk7XG5cbiAgICAgIHRoaXMuJGlzb3RvcGVHYWxsZXJ5LmNzcyhcImhlaWdodFwiLCBjdXJyZW50SGVpZ2h0IC0gMSArIFwicHhcIik7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVJc29UaW1lT3V0KTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZSBjb250YWluZXIgaGFzIGl0ZW1zIGluc2lkZSBpdFxuICAgIGlmICggdGhpcy4kZ2FsbGVyeUNvbnRhaW5lci5sZW5ndGggPiAwICkge1xuXG4gICAgICBjb25zb2xlLmxvZyhcInJlc2l6ZSBldmVudFwiKTtcbiAgICAgIFxuICAgICAgLy8gc2V0IGdyaWQgZGltZW5zaW9uXG4gICAgICB0aGlzLmdhbGxlcnlJc290b3BlV3JhcHBlcigpO1xuXG4gICAgICAvLyBvbiByZXNpemUgY29tcGxldGUsIHJlLWFkanVzdCBncmlkXG4gICAgICB0aGlzLnJlSXNvVGltZU91dCA9IHNldFRpbWVvdXQodGhpcy5yZWxvYWRJc290b3BlLmJpbmQodGhpcyksIDUwMCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uRmlsdGVyQ2xpY2soIGVsLCBlbDIgKSB7XG4gICAgbGV0ICR0aGlzID0gJChlbDIudG9FbGVtZW50KTtcblxuICAgICR0aGlzLnBhcmVudCgpLmNoaWxkcmVuKFwibGlcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSk7XG5cbiAgICAkdGhpcy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgbGV0IGZpbHRlclZhbHVlID0gJHRoaXMuYXR0cihcImRhdGEtZmlsdGVyXCIpO1xuXG4gICAgdGhpcy5yZUZpbHRlcihmaWx0ZXJWYWx1ZSk7XG4gIH1cblxuICByZUZpbHRlciggaXRlbSApIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoe1xuICAgICAgZmlsdGVyOiBpdGVtXG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiSXNvdG9wZSBJbml0XCIpO1xuXG4gICAgLy8gQWRkIHRyYW5zaXRpb24gdG8gYW5pbWF0ZSBpbWFnZSBpbiBncmFjZWZ1bGx5XG4gICAgdGhpcy5hZGRJbWFnZVRyYW5zaXRpb24oKTtcblxuICAgIC8vIFNldHVwIElzb3RvcGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgdGhpcy5zZXR1cElzb3RvcGUoKTtcblxuICAgIC8vIENyZWF0ZSBwZXJmZWN0IGdyaWRcbiAgICB0aGlzLmdhbGxlcnlJc290b3BlV3JhcHBlcigpO1xuXG4gICAgLy8gZGVsYXkgaXNvdG9wZSBpbml0IHVzaW5nIGhlbHBlciBmdW5jdGlvbiB0aGF0IGZpcmVzIG9uIHJlc2l6ZVxuICAgIHNldFRpbWVvdXQodGhpcy5yZWxvYWRJc290b3BlLmJpbmQodGhpcyksIDEwMDApO1xuXG4gICAgLy8gQW5pbWF0ZSBJbWFnZXMgaW4gb25Mb2FkXG4gICAgdGhpcy5sb2FkSW1hZ2VzSW4oKTtcblxuICAgIC8vIEFkZCBmaWx0ZXIgb24gQ2xpY2tcbiAgICBsZXQgJHRoaXMgPSB0aGlzO1xuICAgIHRoaXMuJGZpbHRlci5vbihcImNsaWNrXCIsIFwibGlcIiwgdGhpcy5vbkZpbHRlckNsaWNrLmJpbmQodGhpcywgJHRoaXMpKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxubGV0IElzb3RvcGVHYWxsZXJ5ID0gbmV3IEdhbGxlcnlDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSXNvdG9wZUdhbGxlcnk7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTbGlkZXJDb21wb25lbnQge1xuICBnYWxsZXJ5OiBKUXVlcnk7XG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICBjbG9zZUJ0bjogSlF1ZXJ5O1xuICBuZXh0QnRuOiBKUXVlcnk7XG4gIHByZXZCdG46IEpRdWVyeTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgY3VycmVudFNsaWRlOiBudW1iZXI7XG4gIHRvdGFsU2xpZGU6IG51bWJlcjtcbiAgY291bnRUb3RhbDogSlF1ZXJ5O1xuICBjdXJyZW50Q291bnQ6IEpRdWVyeTtcbiAgc2xpZGVyT3BlbjogYm9vbGVhbjtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvciggZWwgKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKGVsKTtcbiAgICB0aGlzLmdhbGxlcnkgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmhlYWRlci1zbGlkZXItZ2FsbGVyeVwiKTtcbiAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5oZWFkZXItc2xpZGVyLWNsb3NlXCIpO1xuICAgIHRoaXMubmV4dEJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyLW5hdmlnYXRpb24tbmV4dFwiKTtcbiAgICB0aGlzLnByZXZCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNsaWRlci1uYXZpZ2F0aW9uLXByZXZcIik7XG4gICAgdGhpcy5jb3VudFRvdGFsID0gdGhpcy5jb250YWluZXIuZmluZChcIi50b3RhbFwiKTtcbiAgICB0aGlzLmN1cnJlbnRDb3VudCA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuY3VycmVudFwiKTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLmN1cnJlbnRTbGlkZSA9IHRoaXMuaW5kZXggKyAxO1xuICAgIHRoaXMuc2xpZGVyT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmdhbGxlcnkuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldFRvdGFsU2xpZGVzKCk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gdGhpcy5nYWxsZXJ5LmNoaWxkcmVuKFwibGlcIikubGVuZ3RoO1xuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNsaWRlO1xuICB9XG5cbiAgdXBkYXRlQ3VycmVudFNsaWRlKCBldmVudCApIHtcblxuICAgIGlmICggZXZlbnQgPT09IFwicmlnaHRcIiApIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZXgtLTtcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlLS07XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVOYXYoIGluZGV4OiBudW1iZXIsIHNlbGVjdGVkOiBKUXVlcnkgKSB7XG5cbiAgICAvLyB1cGRhdGUgbnVtYmVycyBvbiBzY3JlZW5cbiAgICB0aGlzLmN1cnJlbnRDb3VudC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICAgIC8vIEVuYWJsZS9EaXNhYmxlIGFycm93IGJ0bnNcbiAgICB0aGlzLnByZXZCdG4ucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmZpcnN0LWNoaWxkXCIpKTtcbiAgICB0aGlzLm5leHRCdG4ucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmxhc3QtY2hpbGRcIikpO1xuICB9XG5cbiAgdXBkYXRlU2xpZGUoIGRpcmVjdGlvbiApIHtcblxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTtcblxuICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAvLyByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGNsYXNzLCB0aGVuIG1vdmUgbGVmdFxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIikuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgY3VycmVudFNsaWRlLm5leHQoKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGNsYXNzLCB0aGVuIG1vdmUgbGVmdFxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBjdXJyZW50U2xpZGUucHJldigpLmFkZENsYXNzKFwic2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBpbmRleFxuICAgIHRoaXMudXBkYXRlQ3VycmVudFNsaWRlKGRpcmVjdGlvbik7XG5cbiAgICAvLyB1cGRhdGUgTmF2aWdhdGlvblxuICAgIHRoaXMudXBkYXRlTmF2KHRoaXMuaW5kZXgsIHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcbiAgfVxuXG4gIGFycm93SGFuZGxlciggZXZlbnQgKSB7XG5cbiAgICAvLyBjaGVjayB3aGljaCBrZXkgd2FzIHByZXNzZWQgYW5kIG1ha2Ugc3VyZSB0aGUgc2xpZGUgaXNuJ3QgdGhlIGJlZ2lubmluZyBvciB0aGUgbGFzdCBvbmVcbiAgICBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJyaWdodFwiICYmIHRoaXMuY3VycmVudFNsaWRlICE9PSB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG5cbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuc2xpZGVyT3BlbiApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA8PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwibGVmdFwiICYmIHRoaXMuY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCAmJiB0aGlzLnNsaWRlck9wZW4gKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA8PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgb3BlblNsaWRlciggZWwsIGV2ZW50ICkge1xuICAgIC8vIGVsID0gdGhpc1xuICAgIC8vIGVsMiBpcyBldmVudFxuICAgIGlmICggIXRoaXMuY29udGFpbmVyLmhhc0NsYXNzKFwiaXMtYWN0aXZlXCIpICYmICQoZXZlbnQuY3VycmVudFRhcmdldCkuaXModGhpcy5nYWxsZXJ5KSApIHtcblxuICAgICAgdGhpcy5zbGlkZXJPcGVuID0gdHJ1ZTtcblxuICAgICAgdGhpcy5jb250YWluZXJcbiAgICAgICAgLmFkZENsYXNzKFwiaXMtYWN0aXZlXCIpXG4gICAgICAgIC5vbmUoXG4gICAgICAgICAgXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIFwiICtcbiAgICAgICAgICBcIm90cmFuc2l0aW9uZW5kIFwiICtcbiAgICAgICAgICBcIm9UcmFuc2l0aW9uRW5kIFwiICtcbiAgICAgICAgICBcIm1zVHJhbnNpdGlvbkVuZCBcIiArXG4gICAgICAgICAgXCJ0cmFuc2l0aW9uZW5kXCIsICgpID0+IHtcblxuICAgICAgICAgICQoXCJib2R5LGh0bWxcIilcbiAgICAgICAgICAgIC5hbmltYXRlKHsgXCJzY3JvbGxUb3BcIjogdGhpcy5jb250YWluZXIub2Zmc2V0KCkudG9wIH0sIDIwMCk7XG5cbiAgICAgICAgICAvLyBDbG9zZSBCdG4gYW5pbWF0ZSBpblxuICAgICAgICAgIGxldCBjbG9zZUJ0bkFuaW1hdGlvbiA9IFR3ZWVuTWF4LnRvKHRoaXMuY2xvc2VCdG4sIC4zLCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgIHg6IC0zMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgICAgICAgIGRlbGF5OiAuM1xuICAgICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVNsaWRlciggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2xhc3MoXCJpcy1hY3RpdmVcIik7XG5cbiAgICB0aGlzLnNsaWRlck9wZW4gPSBmYWxzZTtcblxuICAgIFR3ZWVuTGl0ZVxuICAgICAgLnRvKCQod2luZG93KSwgLjUsXG4gICAgICAgIHtcbiAgICAgICAgICBzY3JvbGxUbzogeyB5OiAwIH0sIGVhc2U6IFBvd2VyMi5lYXNlT3V0LFxuICAgICAgICAgIGRlbGF5OiAuNVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgbGV0IGNsb3NlQnRuQW5pbWF0aW9uID0gVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB6OiAuMDAxLFxuICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgICAgICByaWdodDogNTBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5Lm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2xpZGVyLmJpbmQodGhpcywgJHRoaXMpKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdhbGxlcnkub2ZmKCk7XG4gICAgICAgIHRoaXMuY2xvc2VCdG4ub2ZmKCk7XG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgLy8gQ3JlYXRlIEJpbmRpbmcgRXZlbnRzXG4gICAgdGhpcy5jaGVja1NpemUoKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIExlZnQgYW5kIHJpZ2h0IGV2ZW50c1xuICAgIHRoaXMubmV4dEJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJyaWdodFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMucHJldkJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJsZWZ0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBKcXVlcnkga2V5cyBwbHVnaW5cbiAgICAkKGRvY3VtZW50KVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwibGVmdFwiLCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwiZXNjXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSlcbiAgICAgIC5iaW5kKFwia2V5ZG93blwiLCBcInJpZ2h0XCIsIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgLy8gdXBkYXRlIG5hdiBvbiBmaXJzdCBsb2FkXG4gICAgdGhpcy51cGRhdGVOYXYodGhpcy5pbmRleCwgdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRUb3RhbFNsaWRlcygpKSk7XG4gIH1cbn1cblxuLy8gbG9vcCB0aHJvdWdoIGVhY2ggaGVhZGVyIHNsaWRlciBvYmplY3Qgb24gdGhlIHBhZ2VcbmNsYXNzIEhlYWRlclNsaWRlckNvbXBvbmVudCB7XG5cbiAgaXRlbUluZm9XcmFwcGVyOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIgPSAkKFwiLmhlYWRlci1zbGlkZXItY29udGFpbmVyXCIpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkhlYWRlciBTbGlkZXIgaW5pdFwiKTtcblxuICAgIHRoaXMuaXRlbUluZm9XcmFwcGVyLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIC8vIFBhc3MgXCJ0aGlzXCIgdG8gZWFjaCBuZXcgSGVhZGVyIHNsaWRlciBjb21wb25lbnRcbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2xpZGVyQ29tcG9uZW50KGVsKTtcbiAgICAgIHNsaWRlci5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5sZXQgSGVhZGVyU2xpZGVyID0gbmV3IEhlYWRlclNsaWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJTbGlkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5cbmNsYXNzIFN2Z0hlYWRlckNvbXBvbmVudCB7XG4gIHN2ZzogSlF1ZXJ5O1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgd2luZG93OiBKUXVlcnk7XG4gIHdpbldpZHRoOiBudW1iZXI7XG4gIHByb3BvcnRpb246IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN2ZyA9ICQoXCIuZGl2aWRlci1zdmdcIik7XG4gICAgdGhpcy53aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy5wcm9wb3J0aW9uID0gMTg7XG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpbldpZHRoIC8gdGhpcy5wcm9wb3J0aW9uO1xuICB9XG5cbiAgX3NldFdpbmRvd1dpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuICQod2luZG93KS53aWR0aCgpO1xuICB9XG5cbiAgX3NldFN2Z0hlaWdodCgpOiBudW1iZXIge1xuICAgIGxldCBoZWlnaHQgPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpIC8gMTg7XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgcmVzaXplU3ZnKCkge1xuXG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9zZXRTdmdIZWlnaHQoKTtcblxuICAgIC8vIHNldCB3aWR0aCBvZiBpdGVtXG4gICAgLy8gdGhpcy5zdmcuYXR0cihcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuICAgIHRoaXMuc3ZnLmNzcyhcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuXG4gICAgLy8gc2V0IGhlaWdodCBwcm9wb3J0aW9uIG9mIDI4XG4gICAgdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zdmcuaGVpZ2h0KHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGFuaW1hdGVJbigpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFuaW1hdGUgSW5cIik7XG5cbiAgICB0aGlzLnN2ZyA9ICQoXCIuZGl2aWRlci1zdmdcIik7XG4gICAgdGhpcy5wcm9wb3J0aW9uID0gMTg7XG4gICAgdGhpcy53aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMud2luZG93LndpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpbldpZHRoIC8gdGhpcy5wcm9wb3J0aW9uO1xuXG4gICAgLy8gc2V0IHdpZHRoIG9mIGl0ZW1cbiAgICB0aGlzLnN2Zy5hdHRyKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG5cbiAgICAvLyBzZXQgaGVpZ2h0IHByb3BvcnRpb24gb2YgMjhcbiAgICB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN2Zy5oZWlnaHQodGhpcy5oZWlnaHQpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuc3ZnLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBib3R0b206IFwiLTNweFwiLFxuICAgIH0pO1xuICB9XG5cbiAgbG9hZERpdmlkZXIoKSB7XG4gICAgbGV0IHkgPSBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLnRhYmxldCA/IDAgOiA1MDtcbiAgICBUd2VlbkxpdGUudG8odGhpcy5zdmcsIC4xLCB7XG4gICAgICB5OiB5LFxuICAgICAgejogXCIuMDAxXCIsXG4gICAgICB3aWR0aDogdGhpcy5fc2V0V2luZG93V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5fc2V0U3ZnSGVpZ2h0KCksXG4gICAgICBkZWxheTogMCxcbiAgICAgIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCIsXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3ZnLnBhcmVudChcImRpdlwiKS5jc3MoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICB0aGlzLnN2Zy5hZGRDbGFzcyhcIm0tcGFnZSBzY2VuZV9lbGVtZW50IHNjZW5lX2VsZW1lbnQtLWZhZGVpbnVwRGl2aWRlclwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJTdmcgaGVhZGVyIGxvYWRlZFwiKTtcblxuICAgIC8vIHRoaXMuc3ZnLmhlaWdodCh0aGlzLl9zZXRTdmdIZWlnaHQoKSk7XG4gICAgLy8gdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLl9zZXRTdmdIZWlnaHQoKSk7XG5cbiAgICB0aGlzLmxvYWREaXZpZGVyKCk7XG5cblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZVN2Zy5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBTdmdIZWFkZXIgPSBuZXcgU3ZnSGVhZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN2Z0hlYWRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuLy8gVE9ETzogU2lkZWJhciBpbWFnZSBsb2FkaW5nXG5jbGFzcyBJbWFnZUxvYWRlckNvbXBvbmVudCB7XG4gIGFycjogc3RyaW5nW107XG4gIGJvZHk6IEpRdWVyeTtcbiAgY29udGVudDogSlF1ZXJ5O1xuICBoZXJvOiBKUXVlcnk7XG4gIGhhc0hlcm86IG51bWJlcjtcbiAgYmdJbWFnZTogSlF1ZXJ5O1xuICBoYXNCZ0ltYWdlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hcnIgPSBbXTtcbiAgICB0aGlzLmJvZHkgPSAkKFwiYm9keVwiKTtcbiAgICB0aGlzLmNvbnRlbnQgPSAkKFwiI2NvbnRlbnRcIik7XG4gICAgdGhpcy5oZXJvID0gJChcIi5oZXJvXCIpO1xuICAgIHRoaXMuaGFzSGVybyA9IHRoaXMuaGVyby5sZW5ndGg7XG4gICAgdGhpcy5iZ0ltYWdlID0gJChcIi5pbWctbG9hZGVyLWJnXCIpO1xuICAgIHRoaXMuaGFzQmdJbWFnZSA9IHRoaXMuYmdJbWFnZS5sZW5ndGg7XG4gIH1cblxuICBhbmltYXRlQmxvZ1ByaW1hcnkoKTogdm9pZCB7XG4gICAgbGV0IGJsb2dQcmltYXJ5ID0gJChcIi5wcmltYXJ5XCIpO1xuICAgIGxldCBibG9nQmdJbWFnZSA9IGJsb2dQcmltYXJ5LmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIik7XG5cbiAgICBpZiAoIGJsb2dCZ0ltYWdlICE9PSBcIm5vbmVcIiApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIFR3ZWVuTGl0ZVxuICAgICAgICAgIC50byhibG9nUHJpbWFyeSwgLjMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9LCAzMDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZVxuICAvLyBhbmltYXRlSGVyb0hlYWRlcigpOiB2b2lkIHtcbiAgLy8gICBsZXQgYiA9IHRoaXMuaGVyby5maW5kKFwiLmhlcm8tYmFja2dyb3VuZFwiKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuICAvL1xuICAvLyAgIGlmICggYiAhPT0gXCJub25lXCIgKSB7XG4gIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgLy9cbiAgLy8gICAgICAgdGhpcy5oZXJvLmFkZENsYXNzKFwibG9hZGVkXCIpO1xuICAvL1xuICAvLyAgICAgICBUd2VlbkxpdGVcbiAgLy8gICAgICAgICAudG8odGhpcy5oZXJvLCAuNCxcbiAgLy8gICAgICAgICAgIHtcbiAgLy8gICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICApO1xuICAvLyAgICAgfSwgMzAwKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvL1xuICAvLyAgICAgdGhpcy5oZXJvLmFkZENsYXNzKFwibG9hZGVkXCIpO1xuICAvL1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGFuaW1hdGVCbG9nQXJ0aWNsZXMoKTogdm9pZCB7XG4gICAgbGV0IGFuaW1hdGUgPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgYW5pbWF0ZS50byh0aGlzLmFyclsgaSBdLCAwLjEsIHsgb3BhY2l0eTogXCIxXCIsIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCIgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJlbG9hZEltYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmFyciA9IFtdO1xuXG4gICAgdGhpcy5jb250ZW50LmltYWdlc0xvYWRlZCh7IGJhY2tncm91bmQ6IHRydWUgfSwgKCkgPT4ge1xuXG4gICAgICAgIC8vIEJsb2cgcHJpbWFyeSBhcnRpY2xlXG4gICAgICAgIHRoaXMuYm9keS5oYXNDbGFzcyhcImJsb2dcIikgPyB0aGlzLmFuaW1hdGVCbG9nUHJpbWFyeSgpIDogXCJcIjtcblxuICAgICAgICAvLyBIZXJvIGhlYWRlciBpbnRyb1xuICAgICAgICAvLyB0aGlzLmhhc0hlcm8gPiAwID8gdGhpcy5hbmltYXRlSGVyb0hlYWRlcigpIDogXCJcIjtcbiAgICAgICAgdGhpcy5oYXNCZ0ltYWdlID4gMCA/IHRoaXMuYmdJbWFnZS5hZGRDbGFzcyhcImxvYWRlZFwiKSA6IFwiXCI7XG5cbiAgICAgIH0pXG4gICAgICAuYWx3YXlzKGZ1bmN0aW9uICggaW5zdGFuY2UgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBsb2FkZWRcIik7XG4gICAgICB9KVxuICAgICAgLmRvbmUoKCBpbnN0YW5jZSApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIHN1Y2Nlc3NmdWxseSBsb2FkZWRcIik7XG5cbiAgICAgICAgLy8gQW5pbWF0aW9uIGZvciBCbG9nIGluZGV4IGhvbWVwYWdlXG4gICAgICAgIHRoaXMuYW5pbWF0ZUJsb2dBcnRpY2xlcygpO1xuICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKFwiaW1nTG9hZGVkXCIpO1xuICAgICAgICBcbiAgICAgICAgLy8gRXhhbXBsZSBvbiBob3cgdG8gdHJpZ2dlciBldmVudHMgZWxzZXdoZXJlXG4gICAgICAgIC8vICQoZG9jdW1lbnQpLm9uKFwiaW1nTG9hZGVkXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgIH0pXG4gICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBsb2FkZWQsIGF0IGxlYXN0IG9uZSBpcyBicm9rZW5cIik7XG4gICAgICB9KVxuICAgICAgLnByb2dyZXNzKCggaW5zdGFuY2UsIGltYWdlICkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbWFnZSk7XG4gICAgICAgIGxldCByZXN1bHQgPSBpbWFnZS5pc0xvYWRlZCA/IFwibG9hZGVkXCIgOiBcImJyb2tlblwiO1xuXG4gICAgICAgIGlmICggcmVzdWx0ICkge1xuICAgICAgICAgIHRoaXMuYXJyLnB1c2goaW1hZ2UuaW1nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImltYWdlIGlzIFwiICsgcmVzdWx0ICsgXCIgZm9yIFwiICsgaW1hZ2UuaW1nLnNyYyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG5cbiAgICBjb25zb2xlLmxvZyhcIkltYWdlIFByZWxvYWRlciBNb2R1bGVcIik7XG5cbiAgICB0aGlzLnByZWxvYWRJbWFnZXMoKTtcbiAgfVxufVxuXG5sZXQgSW1hZ2VMb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMb2FkZXI7IiwiZGVjbGFyZSB2YXIgU2Nyb2xsTWFnaWM6IGFueTtcbmNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBEZXNjT2Zmc2V0QW5pbWF0aW9uIGZyb20gXCIuL2Rlc2Mtby1hbmltYXRpb25cIjtcblxuY2xhc3MgQW5pbWF0aW9uQ29tcG9uZW50IHtcblxuICBjb250YWluZXI6IEpRdWVyeTtcbiAgaXRlbTogSlF1ZXJ5O1xuICBtU2NlbmU6IEpRdWVyeTtcbiAgc2VydmljZVNpZGVCYXI6IEpRdWVyeTtcbiAgZGVzY09mZnNldDogSlF1ZXJ5O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChcIi5wcm9jZXNzLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLml0ZW0gPSAkKFwiLnByb2Nlc3MtaXRlbS1jb250YWluZXJcIik7XG4gICAgdGhpcy5tU2NlbmUgPSAkKFwiLm0tc2NlbmVcIik7XG4gICAgdGhpcy5zZXJ2aWNlU2lkZUJhciA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gICAgdGhpcy5kZXNjT2Zmc2V0ID0gJChcIi5kZXNjLW8tYW5pbWF0ZVwiKTtcbiAgfVxuXG4gIHByb2Nlc3NBbmltYXRlSW4oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgIGxldCBpdGVtID0gdGhpcy5pdGVtO1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcbiAgICBsZXQgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICB7XG4gICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5wcm9jZXNzLWNvbnRhaW5lclwiLFxuICAgICAgICBkdXJhdGlvbjogY29udGFpbmVyLmhlaWdodCgpLFxuICAgICAgICBvZmZzZXQ6IC0yNTAsXG4gICAgICB9KVxuICAgICAgLm9uKFwiZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdGVtLmZpbmQoXCIucHJvY2Vzcy1pdGVtLWlubmVyXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICAgIGNvbnRhaW5lci5maW5kKFwiaW1nXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICB9KVxuICAgICAgLy8gLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBvZmZzZXQ/KVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAuYWRkVG8oY29udHJvbGxlcik7XG4gIH1cblxuICBhbmltYXRlV2luZG93VG9wKCkge1xuICAgIGNvbnNvbGUubG9nKFwiYW5pbWF0ZSBUb3BcIik7XG4gICAgVHdlZW5MaXRlXG4gICAgICAudG8oJCh3aW5kb3cpLCAuMyxcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvOiB7XG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgYW5pbWF0ZVNlcnZpY2VTaWRlYmFyT3V0KCkge1xuXG4gICAgaWYgKCB0aGlzLnNlcnZpY2VTaWRlQmFyLmxlbmd0aCA+IDAgKSB7XG5cbiAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLnNlcnZpY2VTaWRlQmFyLCAuMywge1xuICAgICAgICB4OiBcIi0xMDBcIixcbiAgICAgICAgejogXCIuMDAxXCIsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiLFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHNpZGViYXIgaHRtbCBlbGVtZW50IHNvIGl0IGRvZXNudCBzaG93IHVwIGFnYWluIHdoZW4gc2Nyb2xsaW5nIHVwXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlU2lkZUJhci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBUd2VlbkxpdGUudG8oJChcIi5zZXJ2aWNlLXNpZGViYXItbm9zdGlja1wiKSwgLjMsIHtcbiAgICAgICAgeDogXCItMTAwXCIsXG4gICAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIixcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIC8vIHJlbW92ZSBzaWRlYmFyIGh0bWwgZWxlbWVudCBzbyBpdCBkb2VzbnQgc2hvdyB1cCBhZ2FpbiB3aGVuIHNjcm9sbGluZyB1cFxuICAgICAgICAgIHRoaXMuc2VydmljZVNpZGVCYXIucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBsb2FkVXJsKCB1cmwgKSB7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfVxuXG4gIG1haW5Db250ZW50QW5pbWF0aW9uT3V0KCBjYWxsYmFjayApIHtcblxuICAgIC8vIExvYWQgaW4gYW5pbWF0aW9ucyBoZXJlXG4gICAgdGhpcy5hbmltYXRlU2VydmljZVNpZGViYXJPdXQoKTtcblxuXG4gICAgdGhpcy5tU2NlbmUuYWRkQ2xhc3MoXCJpcy1leGl0aW5nXCIpXG4gICAgICAvLyBJZiBoYXMgd2Via2l0QW5pbWF0aW9uRW5kIC0gaXQgZ2V0cyBjYWxsZWQgdHdpY2VcbiAgICAgIC5vbmUoXCJvYW5pbWF0aW9uZW5kIG1zQW5pbWF0aW9uRW5kIGFuaW1hdGlvbmVuZFwiLCAoKSA9PiB7XG5cbiAgICAgICAgLy8gTG9hZCBpbiBhbmltYXRpb25zIGhlcmUgdGhhdCBuZWVkIHRvIG9jY3VyIGFmdGVyIG1haW4gb25lc1xuICAgICAgICB0aGlzLmFuaW1hdGVXaW5kb3dUb3AoKTtcblxuICAgICAgfSk7XG5cbiAgICBpZiAoIHR5cGVvZihjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICBjaGVja1VybCggdXJsICk6IGJvb2xlYW4ge1xuICAgIGlmICggdXJsLm1hdGNoKC9eIy8pICE9PSBudWxsIHx8IHVybCA9PT0gXCJcIiApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsQ2xpY2tDaGVjayggZXZlbnQ/ICkge1xuXG4gICAgLy8gR2V0IHVybCBmcm9tIHRoZSBhIHRhZ1xuICAgIGxldCBuZXdVcmwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJocmVmXCIpO1xuICAgIGxldCBoYXNDaGlsZHJlbiA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50KFwibGlcIikuaGFzQ2xhc3MoXCJtZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpO1xuXG4gICAgLypcbiAgICAgKiBGaXJzdCBWYWxpZGF0aW9uOiBJcyB0aGUgdXJsIHZhbGlkXG4gICAgICovXG4gICAgaWYgKCAhdGhpcy5jaGVja1VybChuZXdVcmwpICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIElmIGZpcnN0IHZhbGlkYXRpb24gZmFpbHMsIHRoZSB1cmwgaXMgcmVhbCBhbmQgY29udGludWUgdmFsaWRhdGluZ1xuICAgICAqL1xuICAgIC8qXG4gICAgICogQ2hlY2sgaWYgaXRzIGhvcml6b250YWwgdGFibGV0XG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCAmJlxuICAgICAgdGhpcy5jaGVja1VybChuZXdVcmwpICYmXG4gICAgICBVdGlscy5icm93c2VyID09PSBcImlwYWRcIiAmJiBoYXNDaGlsZHJlbiApIHtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdUYWJsZXQgTmF2IGNsaWNrJyk7XG4gICAgICByZXR1cm47XG5cbiAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCAmJiB0aGlzLmNoZWNrVXJsKG5ld1VybCkgKSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBDaGVjayBpZiBpdHMgbGFyZ2VyIHRoYW4gdGFibGV0IGJ1dCBub3QgYW4gaXBhZFxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibGFwdG9wIG9yIGxhcmdlclwiKTtcbiAgICAgIHRoaXMubWFpbkNvbnRlbnRBbmltYXRpb25PdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICggdGhpcy5jaGVja1VybChuZXdVcmwpICYmIGhhc0NoaWxkcmVuICkge1xuXG4gICAgICAvKlxuICAgICAgICogQ2hlY2sgaWYgaXRzIG1vYmlsZSBuYXYgbWVudSB0aGF0IGhhcyBjaGlsZHJlblxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW9iaWxlIG1lbnUgaXMgYWN0aXZlIGFuZCBwYXJlbnQgY2xpY2tlZFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogUGFzc2VkIHRoZSBjaGVja3MgTG9hZCBpdCFcbiAgICAgICAqL1xuXG4gICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICB9XG5cbiAgfVxuXG4gIGRlc2NPZmZzZXRDaGVjaygpIHtcbiAgICBpZiAoIHRoaXMuZGVzY09mZnNldC5sZW5ndGggPiAwICkge1xuICAgICAgdGhpcy5hZGREZXNjT2Zmc2V0TW9kdWxlKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGVzY09mZnNldE1vZHVsZSgpIHtcbiAgICB0aGlzLmRlc2NPZmZzZXQuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgLy8gUGFzcyBcInRoaXNcIiB0byBlYWNoIG5ldyBIZWFkZXIgc2xpZGVyIGNvbXBvbmVudFxuICAgICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBEZXNjT2Zmc2V0QW5pbWF0aW9uKGVsKTtcbiAgICAgIGFuaW1hdGlvbi5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMucHJvY2Vzc0FuaW1hdGVJbigpO1xuICAgIC8vIHRoaXMuZGVzY19vX2FuaW1hdGUoKTtcblxuICAgIC8vIENsaWNrIGV2ZW50IHRvIGNvbnRyb2wgd2luZG93IExvYWRpbmdcbiAgICAkKFwiYVwiKS5vbihcImNsaWNrXCIsICggZSApID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZ2xvYmFsQ2xpY2tDaGVjayhlKTtcbiAgICB9KTtcblxuICAgIC8vIENoZWNrIGZvciBWQyBncmlkIGxpbmtcbiAgICBpZiAoICQoXCIudmNfZ3JpZC1jb250YWluZXJcIikubGVuZ3RoID4gMCApIHtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQoXCIudmNfZ3JpZC1jb250YWluZXJcIikuZmluZChcImFcIikuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcbiAgICAgICAgICAkKGVsKS5vbihcImNsaWNrXCIsICggZSApID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsQ2xpY2tDaGVjayhlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0sIDIwMDApO1xuICAgIH1cblxuICAgIHRoaXMuZGVzY09mZnNldENoZWNrKCk7XG5cbiAgICAvLyBTUEVDSUFMIFRBQkxFUyBBREQgQ0xBU1NcbiAgICBpZiAoICQoXCIuZGF0YVRhYmxlc193cmFwcGVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImFkZCBkYXRhIHRhYmxlIGNsYXNzXCIpO1xuICAgICAgbGV0IGVsID0gJChcIi5kYXRhVGFibGVzX3dyYXBwZXJcIik7XG5cbiAgICAgIGVsLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICAgICQoZWwpLmFkZENsYXNzKFwidGFibGUtcmVzcG9uc2l2ZVwiKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLy8gJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG4gICAgLy8gQ3VzdG9tIGV2ZW50IGV4YW1wbGVcbiAgICAvLyAkKGRvY3VtZW50KS5vbihcInRlc3RcIiwge30sICggZXZlbnQsIGFyZzEsIGFyZzIgKSA9PiB7XG4gICAgLy9cbiAgICAvLyAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJnMSk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZzIpO1xuICAgIC8vICAgfVxuICAgIC8vXG4gICAgLy8gfSkuYmluZCh0aGlzKTtcblxuICB9XG59XG5cbmxldCBBbmltYXRpb25Db250cm9sbGVyID0gbmV3IEFuaW1hdGlvbkNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBBbmltYXRpb25Db250cm9sbGVyO1xuXG4iLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cblxuaW50ZXJmYWNlIFF1b3RlU3RhdGVJbnRlcmZhY2Uge1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBpc0Zvcm1BY3RpdmU6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBRdW90ZVNlbGVjdGVkT2JqZWN0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgcHJpY2U6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgYnVsbGV0czogT2JqZWN0O1xuICBpbWdTcmM6IHN0cmluZztcbn1cblxuY2xhc3MgUXVvdGVDb21wb25lbnQge1xuXG4gIHNlbGVjdEJ0bjogSlF1ZXJ5O1xuICBzd2l0Y2hCdG46IEpRdWVyeTtcbiAgZm9ybUJ1aWxkZXI6IEpRdWVyeTtcbiAgcXVvdGVDaG9vc2VyOiBKUXVlcnk7XG4gIGlucHV0czogSlF1ZXJ5O1xuICBxdW90ZUl0ZW1zQXJyYXk6IEpRdWVyeTtcbiAgc2VsZWN0Q29uYWluZXI6IEpRdWVyeTtcbiAgc3RhdGU6IFF1b3RlU3RhdGVJbnRlcmZhY2U7XG4gIHF1b3RlQ29udGFpbmVyOiBKUXVlcnk7XG4gIHNlbGVjdGVkSXRlbTogUXVvdGVTZWxlY3RlZE9iamVjdDtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgY3VycmVudEJyZWFrcG9pbnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1b3RlQ29udGFpbmVyID0gJChcIi5xdW90ZVwiKTtcbiAgICB0aGlzLnNlbGVjdEJ0biA9ICQoXCIucXVvdGVfX3NlbGVjdC0tYnRuXCIpO1xuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5ID0gJChcIi5xdW90ZV9faXRlbVwiKTtcbiAgICB0aGlzLmZvcm1CdWlsZGVyID0gJChcIi5xdW90ZV9fZm9ybS0taW5wdXRcIik7XG4gICAgdGhpcy5xdW90ZUNob29zZXIgPSAkKFwiLnF1b3RlX19mb3JtLS1zZWxlY3RcIik7XG4gICAgdGhpcy5zZWxlY3RDb25haW5lciA9IHRoaXMuc2VsZWN0QnRuLmZpbmQoXCIuZmllbGRzZXRcIik7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkOiAnJyxcbiAgICAgIGlzRm9ybUFjdGl2ZTogZmFsc2VcbiAgICB9O1xuICAgIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgPSBVdGlscy5icmVha3BvaW50O1xuXG4gIH1cblxuICBnZXRTZWxlY3RlZExhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdENvbmFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBzZXRXaWR0aCggbGFiZWw6IEpRdWVyeSApIHtcblxuICAgIGxldCBsYWJlbFdpZHRoID0gbGFiZWwub3V0ZXJXaWR0aCgpO1xuICAgIHRoaXMuc3dpdGNoQnRuLmNzcyhcIndpZHRoXCIsIGxhYmVsV2lkdGgpO1xuXG4gIH1cblxuICBidWlsZFNlbGVjdEJveCgpIHtcblxuICAgIGxldCBuYW1lcyA9IFtdO1xuICAgIGxldCBmcmFnbWVudCA9ICQoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcblxuICAgIC8vIGdldCBoMiB0aXRsZXMgZnJvbSBlYWNoIHF1b3RlIGl0ZW1cbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgdGl0bGUgPSAkdGhpcy5maW5kKFwiLmNhcmRfX2l0ZW0tLWNvbnRlbnQgPiBoMlwiKS50ZXh0KCksXG4gICAgICAgIG5hbWUgPSB0aXRsZS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuICAgICAgICB1bmlxdWVJZCA9IG5hbWUgKyBcIi1cIiArIGluZGV4O1xuXG4gICAgICBjb25zb2xlLmxvZyhcIlRpdGxlOiBcIiwgdGl0bGUpO1xuXG4gICAgICAvLyBBZGQgbWF0Y2hpbmcgSUQncyB0byBlYWNoIENhcmRcbiAgICAgICR0aGlzLmF0dHIoXCJpZFwiLCB1bmlxdWVJZCk7XG5cbiAgICAgIC8vIENyZWF0ZSBpbnB1dCBhbmQgbGFiZWwgRE9NIGVsZW1lbnRzXG4gICAgICBsZXQgaW5wdXQgPSBVdGlscy5idWlsZEh0bWwoXCJpbnB1dFwiLCB7XG4gICAgICAgIGlkOiB1bmlxdWVJZCxcbiAgICAgICAgdHlwZTogXCJyYWRpb1wiLFxuICAgICAgICBjbGFzczogXCJxdW90ZV9faW5wdXRcIixcbiAgICAgICAgbmFtZTogdW5pcXVlSWQsXG4gICAgICAgIHZhbHVlOiBuYW1lXG4gICAgICB9KTtcblxuICAgICAgbGV0IGxhYmVsID0gVXRpbHMuYnVpbGRIdG1sKFwibGFiZWxcIiwge1xuICAgICAgICBmb3I6IHVuaXF1ZUlkLFxuICAgICAgICBjbGFzczogaW5kZXggPT09IDAgPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICB9LCB0aXRsZSk7XG5cblxuICAgICAgZnJhZ21lbnQuYXBwZW5kKGlucHV0KS5hcHBlbmQobGFiZWwpO1xuXG4gICAgfSk7XG5cbiAgICAvLyBHZXQgY29sb3IgZnJvbSBkYXRhIGVsIGFuZCBzZXQgYnV0dG9uXG4gICAgbGV0ICRidXR0b25fY29sb3IgPSB0aGlzLnNlbGVjdENvbmFpbmVyLmRhdGEoXCJjb2xvclwiKTtcbiAgICBmcmFnbWVudC5hcHBlbmQoJzxzcGFuIGNsYXNzPVwicXVvdGVfX3N3aXRjaCBzaGFkb3ctc21hbGwtYnRuXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicgKyAkYnV0dG9uX2NvbG9yICsgJ1wiPjwvc3Bhbj4nKTtcblxuICAgIHRoaXMuc2VsZWN0Q29uYWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICB9XG5cbiAgYnVpbGRTZWxlY3RFdmVudEhhbmRsZXJzKCkge1xuICAgIHRoaXMuaW5wdXRzID0gdGhpcy5zZWxlY3RCdG4uZmluZChcIi5xdW90ZV9faW5wdXRcIik7XG4gICAgdGhpcy5zd2l0Y2hCdG4gPSAkKFwiLnF1b3RlX19zd2l0Y2hcIik7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZWFjaCBpdGVtIGFuZCBzZXQgd2lkdGggYW5kIGNoYW5nZSBldmVudHMgYW5kIGNoZWNrZWQgc3RhdHVzXG4gICAgdGhpcy5pbnB1dHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gJChlbCksXG4gICAgICAgIG5leHRMYWJlbCA9ICR0aGlzLm5leHQoKTtcblxuICAgICAgaWYgKCBpbmRleCA9PT0gMCApIHtcbiAgICAgICAgJHRoaXMucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gc2V0IHN0YXRlIHRvIGN1cnJlbnQgc2VsZWN0ZWQgaW5wdXQgSURcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gZmluZCBTZWxlY3RlZCwgZ2V0IHdpZHRoIG9mIGxhYmVsLCBzZXQgd2lkdGggb2Ygc3BhblxuICAgICAgaWYgKCBuZXh0TGFiZWwuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSApIHtcbiAgICAgICAgdGhpcy5zZXRXaWR0aChuZXh0TGFiZWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgb24gY2hhbmdlIGZ1bmN0aW9uIGhlcmVcbiAgICAgICR0aGlzLmNoYW5nZSh0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRDYXJkRXZlbnRIYW5kbGVycygpIHtcblxuICAgIC8vIE1haW4gQ2FyZHNcbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgYnV0dG9uID0gJHRoaXMuZmluZChcIi5jYXJkX19pdGVtLS1idG5cIik7XG5cbiAgICAgIGJ1dHRvbi5vbihcImNsaWNrXCIsIHRoaXMub3BlbkZvcm0uYmluZCh0aGlzKSk7XG5cbiAgICB9KTtcblxuICAgIC8vIEJhY2sgYnV0dG9uIGZvciB0YWJsZXRcbiAgICBsZXQgYnV0dG9uID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnRhYmxldFwiKS5maW5kKFwiLmdvLWJhY2tcIik7XG4gICAgYnV0dG9uLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKSk7XG5cbiAgfVxuXG4gIGZhZGVJbiggZWw6IEpRdWVyeSApIHtcblxuICAgIFR3ZWVuTWF4LnRvKGVsLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGRlbGF5OiAuM1xuICAgIH0pO1xuXG4gIH1cblxuICBzZXRUcmFuc2xhdGVYKCBjdXJyZW50VGFyZ2V0OiBKUXVlcnksIHdpZHRoOiBOdW1iZXIgKSB7XG4gICAgbGV0ICR0aGlzID0gY3VycmVudFRhcmdldDtcbiAgICBsZXQgaW5wdXRJZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaW5wdXQgbWF0Y2hlcyB0aGUgMm5kIGl0ZW0gLSB0aGVuIG1vdmUgc3dpdGNoQnRuIHJpZ2h0LCBvdGhlcndpc2UgYmFjayB0byBwb3NpdGlvbiAxXG4gICAgaWYgKCBpbnB1dElkID09PSAkKHRoaXMuaW5wdXRzWyAxIF0pLmF0dHIoXCJpZFwiKSApIHtcbiAgICAgIHRoaXMuc3dpdGNoQnRuLmNzcyh7XG4gICAgICAgIFwid2Via2l0VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHdpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJNb3pUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgd2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcIm1zVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHdpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJPVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHdpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgd2lkdGggKyBcInB4KVwiXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zd2l0Y2hCdG4uY3NzKHtcbiAgICAgICAgXCJ3ZWJraXRUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJNb3pUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJtc1RyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiLFxuICAgICAgICBcIk9UcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIlxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25DaGFuZ2UoIGUgKSB7XG5cbiAgICBsZXQgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCksXG4gICAgICBmaWVsZHNldCA9ICR0aGlzLnBhcmVudChcIi5maWVsZHNldFwiKSxcbiAgICAgIHByZXZJdGVtID0gZmllbGRzZXQuZmluZChcIi5zZWxlY3RlZFwiKSxcbiAgICAgIHByZXZXaWR0aCA9IHByZXZJdGVtLm91dGVyV2lkdGgoKSAtIDEsXG4gICAgICBpbnB1dElkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuXG4gICAgLy8gcmVtb3ZlIHNlbGVjdGVkIGZyb20gUHJldiBMYWJlbFxuICAgIGZpZWxkc2V0LmZpbmQoXCJsYWJlbFwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgLy8gcmVtb3ZlIGNoZWNrZWQgc3RhdGUgZnJvbSBwcmV2IGlucHV0XG4gICAgcHJldkl0ZW0ucHJldihcImlucHV0XCIpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcblxuICAgIC8vIHNldCBuZXcgaXRlbSB0byBzZWxlY3RlZCBhbmQgY2hlY2tlZFxuICAgIGxldCBzZWxlY3RlZExhYmVsID0gZmllbGRzZXQuZmluZChcImxhYmVsW2Zvcj1cIiArIGlucHV0SWQgKyBcIl1cIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAkdGhpcy5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcblxuICAgIC8vIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaW5wdXQgbWF0Y2hlcyB0aGUgMm5kIGl0ZW0gLSB0aGVuIG1vdmUgc3dpdGNoQnRuIHJpZ2h0LCBvdGhlcndpc2UgYmFjayB0byBwb3NpdGlvbiAxXG4gICAgdGhpcy5zZXRUcmFuc2xhdGVYKCR0aGlzLCBwcmV2V2lkdGgpO1xuXG4gICAgLy8gY2hhbmdlIHRoZSB3aWR0aCBvZiB0aGUgYnRuIHRvIG1hdGNoIHRoZSB3aWR0aCBvZiB0aGUgbmV3IGxhYmVsXG4gICAgdGhpcy5zZXRXaWR0aChzZWxlY3RlZExhYmVsKTtcblxuICAgIC8vIHNldCBzdGF0ZSB0byB0aGUgbmV3bHkgc2VsZWN0ZWQgaW5wdXRcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBTdGF0ZSBpczogXCIsIHRoaXMuc3RhdGUuc2VsZWN0ZWQpO1xuXG4gICAgdGhpcy50b2dnbGVDYXJkcygpO1xuXG4gIH1cblxuICB0b2dnbGVDYXJkcygpIHtcblxuICAgIC8vIGJhc2VkIG9uIHN0YXRlLCBhZGQgc2VsZWN0ZWQgdG8gdGhlIGNhcmQncyBpZCBtYXRjaGluZyB0aGUgc3RhdGVcbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgaWQgPSAkdGhpcy5hdHRyKFwiaWRcIik7XG5cbiAgICAgICR0aGlzLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQgc2hhZG93LW1lZGl1bS1kYXJrXCIpO1xuXG4gICAgICBpZiAoIGlkID09PSB0aGlzLnN0YXRlLnNlbGVjdGVkICkge1xuXG4gICAgICAgICR0aGlzLmFkZENsYXNzKFwic2VsZWN0ZWQgc2hhZG93LW1lZGl1bS1kYXJrXCIpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgc2V0QWN0aXZlUGxhbigpIHtcblxuICAgIGxldCBpZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQ7XG5cbiAgICBsZXQgc2VsZWN0ZWRDYXJkID0gdGhpcy5xdW90ZUl0ZW1zQXJyYXkuZmlsdGVyKCggaXRlbSApID0+IHtcbiAgICAgIHJldHVybiAkKHRoaXMucXVvdGVJdGVtc0FycmF5WyBpdGVtIF0pLmF0dHIoXCJpZFwiKSA9PT0gaWQ7XG4gICAgfSk7XG5cbiAgICBsZXQgYnV0dG9uID0gJzxhIGNsYXNzPVwicm91bmRlZC1idG4gd2hpdGUtYnRuIGdvLWJhY2tcIiBocmVmPVwiI1wiPkdvIEJhY2s8L2E+JztcblxuICAgIC8vIGZpbmQgZm9ybVxuICAgIGxldCBmb3JtUmVmID0gc2VsZWN0ZWRDYXJkLmZpbmQoXCIucXVvdGVfX2Zvcm0tLXRlbXBcIikuZmluZChcIi5xdW90ZV9fZm9ybS0taW5uZXJcIik7XG4gICAgbGV0IGZvcm0gPSBmb3JtUmVmLmRldGFjaCgpO1xuXG4gICAgLy8gY2xvbmVkIGVsZW1lbnRcbiAgICBsZXQgbW9kaWZpZWRFbGVtZW50ID0gc2VsZWN0ZWRDYXJkLmNsb25lKCk7XG5cbiAgICAvLyByZW1vdmUgZm9ybSBmcm9tIGNsb25lZCBpdGVtLlxuICAgIC8vIG1vZGlmaWVkRWxlbWVudC5maW5kKFwiLnF1b3RlX19mb3JtLS1pdGVtLnRlbXBcIikucmVtb3ZlKCk7XG4gICAgLy8gZm9ybVJlZi5yZW1vdmUoKTtcblxuICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBWQyBjb250ZW50IGFyZWFcbiAgICBsZXQgcXVvdGVGb3JtQ29udGFpbmVyID0gJChcIi5xdW90ZV9fZm9ybS0tdmNcIik7XG4gICAgcXVvdGVGb3JtQ29udGFpbmVyLmFwcGVuZChmb3JtKTtcblxuICAgIC8vIGZpbmQgYnV0dG9uIGFuZCByZW1vdmVcbiAgICBtb2RpZmllZEVsZW1lbnQuZmluZChcIi5jYXJkX19pdGVtLS1idG5cIikucmVtb3ZlKCk7XG5cbiAgICAvLyBtb2RpZmllZEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5nby1iYWNrXCIpKTtcbiAgICBsZXQgY2FyZFdyYXBwZXIgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWNhcmQtd3JhcHBlclwiKTtcblxuICAgIGNhcmRXcmFwcGVyLmFwcGVuZChtb2RpZmllZEVsZW1lbnQpLmFwcGVuZChidXR0b24pO1xuXG4gICAgLy8gQmFjayBidXR0b24gaW5zaWRlIHdyYXBwZXJcbiAgICBsZXQgYnV0dG9uRG9tID0gY2FyZFdyYXBwZXIuZmluZChcIi5nby1iYWNrXCIpO1xuICAgIGJ1dHRvbkRvbS5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VGb3JtLmJpbmQodGhpcykpO1xuXG5cbiAgfVxuXG4gIHB1dEZvcm1CYWNrKCBmb3JtOiBKUXVlcnkgKSB7XG4gICAgbGV0IGlkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZDtcbiAgICAvLyBmaW5kIGVsZW1lbnQgaWQgdGhhdCBtYXRjaGVzIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgbGV0IHNlbGVjdGVkQ2FyZCA9IHRoaXMucXVvdGVJdGVtc0FycmF5LmZpbHRlcigoIGl0ZW0gKSA9PiB7XG4gICAgICByZXR1cm4gJCh0aGlzLnF1b3RlSXRlbXNBcnJheVsgaXRlbSBdKS5hdHRyKFwiaWRcIikgPT09IGlkO1xuICAgIH0pO1xuXG4gICAgc2VsZWN0ZWRDYXJkLmZpbmQoXCIucXVvdGVfX2Zvcm0tLXRlbXBcIikuYXBwZW5kKCBmb3JtICk7XG4gIH1cblxuICBjbG9zZUZvcm0oIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUuaXNGb3JtQWN0aXZlID0gZmFsc2U7XG5cbiAgICAvLyByZWYgZm9yIGl0ZW1zIGluIFZDIHZpZXdcbiAgICBsZXQgY2FyZCA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5jYXJkX19pdGVtXCIpO1xuICAgIGxldCBiYWNrQnRuID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS1jYXJkLXdyYXBwZXJcIikuZmluZChcIi5nby1iYWNrXCIpO1xuICAgIGxldCBmb3JtID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS12Y1wiKS5maW5kKFwiLnF1b3RlX19mb3JtLS1pbm5lclwiKTtcblxuICAgIGNhcmQucmVtb3ZlQ2xhc3MoXCJpblwiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gc2V0IGZvcm0gdG8gYWN0aXZlXG4gICAgICB0aGlzLmZvcm1CdWlsZGVyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyBzZXQgYm9keSBiYWNrIHRvIHNjcm9sbGFibGVcbiAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJhdXRvXCIpO1xuXG4gICAgfSwgNDAwKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICB0aGlzLmZvcm1CdWlsZGVyXG4gICAgICAgIC5maW5kKFwiLnF1b3RlX19mb3JtLS12Y1wiKVxuICAgICAgICAub25lKCdvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgKCBlICkgPT4ge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdmlzaWJpbGl0eSBvbmNlIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICAgICAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuY3NzKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICAgIHRoaXMucXVvdGVDaG9vc2VyLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXG4gICAgICAgICAgICAvLyB6LWluZGV4IGZpeFxuICAgICAgICAgICAgJChcIi5pbm5lci1wYWdlLXdyYXBwZXJcIikuY2hpbGRyZW4oXCJkaXZcIikuY3NzKFwiei1pbmRleFwiLCBcIjBcIik7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBjdXJyZW50IGNhcmQgaHRtbFxuICAgICAgICAgICAgY2FyZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGJhY2tCdG4ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIHRoaXMucHV0Rm9ybUJhY2soIGZvcm0uZGV0YWNoKCkgKTtcblxuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIHJlbW92ZSB2aXNpYmlsaXR5IG9uY2UgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgdGhpcy5mb3JtQnVpbGRlci5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICAgIC8vIHotaW5kZXggZml4XG4gICAgICAkKFwiLmlubmVyLXBhZ2Utd3JhcHBlclwiKS5jaGlsZHJlbihcImRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIFwiMFwiKTtcblxuICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgY2FyZCBodG1sXG4gICAgICBjYXJkLnJlbW92ZSgpO1xuICAgICAgYmFja0J0bi5yZW1vdmUoKTtcblxuICAgICAgdGhpcy5wdXRGb3JtQmFjayggZm9ybS5kZXRhY2goKSApO1xuICAgIH1cblxuICAgIC8vIGZhZGUgb3V0IGZpcnN0IGRpc3BsYXlcbiAgICB0aGlzLnF1b3RlQ2hvb3Nlci5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIG9wZW5Gb3JtKCBlICkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICBsZXQgcGFyZW50Q29uYXRpbmVyID0gJHRoaXMucGFyZW50KFwiZGl2XCIpLnBhcmVudChcImRpdlwiKTtcblxuICAgIC8vIGRpc2FibGUgYnV0dG9uIGNsaWNrIGlmIGl0ZW0gaXMgc2VsZWN0ZWRcbiAgICBpZiAoICFwYXJlbnRDb25hdGluZXIuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBzZXQgc3RhdGVcbiAgICB0aGlzLnN0YXRlLmlzRm9ybUFjdGl2ZSA9IHRydWU7XG5cbiAgICAvLyBzZXQgY29udGVudCBwbGFuIEhUTUwgaW4gbmV3IGZvcm0gYXJlYVxuICAgIHRoaXMuc2V0QWN0aXZlUGxhbigpO1xuXG4gICAgLy8gQW5pbWF0ZSBmb3JtIGluXG4gICAgbGV0IGFjdGl2YXRlSW5uZXJGb3JtID0gKCkgPT4ge1xuXG4gICAgICAvLyB6LWluZGV4IGZpeFxuICAgICAgJChcIi5pbm5lci1wYWdlLXdyYXBwZXJcIikuY2hpbGRyZW4oXCJkaXZcIikuY3NzKFwiei1pbmRleFwiLCBcIi0xXCIpO1xuICAgICAgdGhpcy5xdW90ZUNvbnRhaW5lci5wYXJlbnRzKFwiLnZjX3Jvd1wiKS5jc3MoXCJ6LWluZGV4XCIsIFwiMlwiKTtcblxuICAgICAgLy8gZmFkZSBvdXQgY2FyZHNcbiAgICAgIHRoaXMucXVvdGVDaG9vc2VyLmNzcyhcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG4gICAgICAvLyBzZXQgZm9ybSB0byBhY3RpdmVcbiAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAgIC8vIGFkZCB2aXNpYmlsaXR5IGltbWVkaWF0ZWx5XG4gICAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuXG4gICAgICAvLyBmYWRlIG91dCBmaXJzdCBkaXNwbGF5XG4gICAgICB0aGlzLnF1b3RlQ2hvb3Nlci5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9O1xuXG4gICAgLy8gaWYgZGVza3RvcCBzY3JvbGwgdG9wXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8vIHNjcm9sbCB0b3Agb2YgZGl2IG9uIG9wZW4gZm9yIGdyYWNlZnVsIFVYXG4gICAgICAkKFwiYm9keSxodG1sXCIpLmFuaW1hdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBcInNjcm9sbFRvcFwiOiB0aGlzLnF1b3RlQ29udGFpbmVyLm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAyMDAsICgpID0+IHtcbiAgICAgICAgICBhY3RpdmF0ZUlubmVyRm9ybSgpO1xuICAgICAgICB9XG4gICAgICApLmJpbmQodGhpcyk7XG5cbiAgICB9ZWxzZSB7XG4gICAgICBhY3RpdmF0ZUlubmVyRm9ybSgpO1xuICAgIH1cblxuXG4gICAgbGV0IGNhcmQgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWNhcmRcIik7XG5cbiAgICAvLyBTZXQgYm9keSB0byBub3Qgc2Nyb2xsXG4gICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImhpZGRlblwiKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgY2FyZC5vbmUoJ290cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgKCBlICkgPT4ge1xuXG4gICAgICAgICAgLy8gZmFkZSBjYXJkIGluIG9uY2UgZGF0YSBpcyBzZXQgJiB0aGUgY2FyZCBiZyBpcyBmaW5pc2hlZCBhbmltYXRpbmdcbiAgICAgICAgICBjYXJkLmZpbmQoXCIuY2FyZF9faXRlbVwiKS5hZGRDbGFzcyhcImluXCIpO1xuXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIGZhZGUgY2FyZCBpbiBvbmNlIGRhdGEgaXMgc2V0ICYgdGhlIGNhcmQgYmcgaXMgZmluaXNoZWQgYW5pbWF0aW5nXG4gICAgICBjYXJkLmZpbmQoXCIuY2FyZF9faXRlbVwiKS5hZGRDbGFzcyhcImluXCIpO1xuXG4gICAgfVxuXG4gIH1cblxuICByZXNpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgYnV0dG9uIHNpemUgdG8gYWNjdXJhdGVseSByZXNpemUgc2VsZWN0ZWQgYnV0dG9uIHdpZHRoXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuXG4gICAgdGhpcy5yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICBpZiAoIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgIT09IFV0aWxzLmJyZWFrcG9pbnQgKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkTGFiZWwgPSB0aGlzLmdldFNlbGVjdGVkTGFiZWwoKSxcbiAgICAgICAgICBzZWxlY3RlZElucHV0ID0gc2VsZWN0ZWRMYWJlbC5wcmV2KCksXG4gICAgICAgICAgZmlyc3RMYWJlbCA9ICQodGhpcy5pbnB1dHNbIDAgXSkubmV4dCgpLFxuICAgICAgICAgIGZpcnN0TGFiZWxXaWR0aCA9IGZpcnN0TGFiZWwub3V0ZXJXaWR0aCgpIC0gMTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZVgoc2VsZWN0ZWRJbnB1dCwgZmlyc3RMYWJlbFdpZHRoKTtcbiAgICAgICAgdGhpcy5zZXRXaWR0aChzZWxlY3RlZExhYmVsKTtcbiAgICAgICAgdGhpcy5jdXJyZW50QnJlYWtwb2ludCA9IFV0aWxzLmJyZWFrcG9pbnQ7XG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiUXVvdGUgQnVpbGRlclwiKTtcblxuICAgIC8vIGJ1aWxkIHNlbGVjdCBib3ggYnV0dG9uIGlucHV0c1xuICAgIHRoaXMuYnVpbGRTZWxlY3RCb3goKTtcblxuICAgIC8vIHNldCBjbGljayBldmVudHMgYW5kIGZpcnN0IHNlbGVjdGVkIGl0ZW1zIGZvciBTZWxlY3QgQm94XG4gICAgdGhpcy5idWlsZFNlbGVjdEV2ZW50SGFuZGxlcnMoKTtcblxuICAgIHRoaXMuZmFkZUluKHRoaXMuc2VsZWN0QnRuKTtcblxuICAgIC8vIHNlbGVjdCBjYXJkXG4gICAgdGhpcy50b2dnbGVDYXJkcygpO1xuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50cyB0byBjYXJkcyBidXR0b25zXG4gICAgdGhpcy5idWlsZENhcmRFdmVudEhhbmRsZXJzKCk7XG5cbiAgICAvLyBmYWRlIG1haW4gY29udGFpbmVyIGluXG4gICAgdGhpcy5mYWRlSW4odGhpcy5xdW90ZUNvbnRhaW5lcik7XG5cbiAgICAvLyBvbiByZXNpemUgY2hhbmdlIGJ1dHRvbiBzaXplXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXG4gIH1cbn1cblxuY29uc3QgUXVvdGVCdWlsZGVyID0gbmV3IFF1b3RlQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFF1b3RlQnVpbGRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmludGVyZmFjZSBTaG93Y2FzZVNsaWRlckludGVyZmFjZSB7XG4gIGRlc2t0b3BQb3M6IG51bWJlcjtcbiAgdGFibGV0UG9zOiBudW1iZXI7XG4gIGluZGV4U2VsZWN0ZWQ6IG51bWJlcjtcbiAgY3VycmVudFNsaWRlOiBudW1iZXI7XG59XG5cbmNsYXNzIFNob3djYXNlQ29tcG9uZW50IHtcbiAgY29udGFpbmVyOiBKUXVlcnk7XG4gIHJlc2l6ZVRpbWVyOiBudW1iZXI7XG4gIG5leHRCdG5Nb2JpbGU6IEpRdWVyeTtcbiAgcHJldkJ0bk1vYmlsZTogSlF1ZXJ5O1xuICBuZXh0QnRuOiBKUXVlcnk7XG4gIHByZXZCdG46IEpRdWVyeTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgZ2FsbGVyeTogSlF1ZXJ5O1xuICBkZXNjOiBKUXVlcnk7XG4gIHRodW1ic0NvbnRhaW5lcjogSlF1ZXJ5O1xuICBncmFkaWVudHM6IEpRdWVyeTtcbiAgdGh1bWJzQ2xpY2s6IEpRdWVyeTtcbiAgY2xvc2VCdG46IEpRdWVyeTtcbiAgY291bnRUb3RhbDogSlF1ZXJ5O1xuICBjdXJyZW50Q291bnRJdGVtOiBKUXVlcnk7XG4gIHNob3dDYXNlVGh1bWJzOiBKUXVlcnk7XG4gIHN0YXRlUG9zaXRpb246IFNob3djYXNlU2xpZGVySW50ZXJmYWNlO1xuICB0aHVtYlNjYWxlVG9wOiBudW1iZXI7XG4gIHRodW1iU2NhbGVMZWZ0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoIGVsOiBPYmplY3QgKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKGVsKTtcbiAgICB0aGlzLnByZXZCdG5Nb2JpbGUgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19uYXYtLXByZXZcIik7XG4gICAgdGhpcy5uZXh0QnRuTW9iaWxlID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fbmF2LS1uZXh0XCIpO1xuICAgIHRoaXMucHJldkJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1ic25hdi0tcHJldlwiKTtcbiAgICB0aGlzLm5leHRCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNuYXYtLW5leHRcIik7XG4gICAgdGhpcy5nYWxsZXJ5ID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fc2xpZGVyLS1nYWxsZXJ5XCIpO1xuICAgIHRoaXMuZGVzYyA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2NcIik7XG4gICAgdGhpcy5jb3VudFRvdGFsID0gdGhpcy5jb250YWluZXIuZmluZChcIi50b3RhbFwiKTtcbiAgICB0aGlzLmN1cnJlbnRDb3VudEl0ZW0gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmN1cnJlbnRcIik7XG4gICAgdGhpcy5pbmRleCA9IDA7IC8vIHNldCB0byAybmQgc2xpZGVcbiAgICB0aGlzLnRodW1ic0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1icy0taW1hZ2VzXCIpO1xuICAgIHRoaXMuc2hvd0Nhc2VUaHVtYnMgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNcIik7XG4gICAgdGhpcy50aHVtYlNjYWxlVG9wID0gMTMwO1xuICAgIHRoaXMudGh1bWJTY2FsZUxlZnQgPSA3NTtcbiAgICB0aGlzLnN0YXRlUG9zaXRpb24gPSB7XG4gICAgICBkZXNrdG9wUG9zOiAwLFxuICAgICAgdGFibGV0UG9zOiAwLFxuICAgICAgaW5kZXhTZWxlY3RlZDogdGhpcy5pbmRleCxcbiAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5pbmRleCArIDFcbiAgICB9O1xuXG4gIH1cblxuICBzZXRGaXJzdFNsaWRlKCkge1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGltYWdlcyBhbmQgc2V0IGFjdGl2ZSBlbGVtZW50XG4gICAgbGV0IGZpcnN0SW1hZ2UgPSB0aGlzLmdhbGxlcnkuZmluZChcImxpW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcbiAgICBmaXJzdEltYWdlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICB0aGlzLmFuaW1hdGVHYWxsZXJ5SW4oKTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBkZXNjIGFuZCBzZXQgYWN0aXZlIGVsZW1lbnRcbiAgICBsZXQgZmlyc3REZXNjID0gdGhpcy5kZXNjLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2MtLWl0ZW1bZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuICAgIGZpcnN0RGVzYy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgLy8gQnVpbGQgdGh1bWJuYWlsc1xuICAgIHRoaXMuYnVpbGRUaHVtYnMoKTtcblxuICAgIC8vIFNldCBDdXJyZW50IFNsaWRlLCB3aGljaCBpcyBhbHdheXMgdGhlIGZpcnN0IHNsaWRlIHRvIHNlbGVjdGVkIC0gb25Mb2FkXG4gICAgdGhpcy51cGRhdGVNb2JpbGVOYXYodGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50cyB0byB0aHVtYm5haWwgaW1hZ2VzLCB0aGVuIHdoZW4gZmluaXNoZWQgYW5pbWF0ZSBpbiB3aXRoIGNhbGxiYWNrXG4gICAgdGhpcy5idWlsZFRodW1ic0NsaWNrSGFuZGxlcih0aGlzLmFuaW1hdGVJblRodW1icy5iaW5kKHRoaXMpKTtcblxuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmdhbGxlcnkuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldEN1cnJlbnROYXZFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRDdXJyZW50RGVzY0VsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy5kZXNjLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRUb3RhbFNsaWRlcygpOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IHRoaXMuZ2FsbGVyeS5jaGlsZHJlbihcImxpXCIpLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICB1cGRhdGVNb2JpbGVOYXYoIHNlbGVjdGVkOiBKUXVlcnkgKSB7XG5cbiAgICAvLyBFbmFibGUvRGlzYWJsZSBhcnJvdyBidG5zXG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpmaXJzdC1jaGlsZFwiKSk7XG4gICAgdGhpcy5uZXh0QnRuTW9iaWxlLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpsYXN0LWNoaWxkXCIpKTtcblxuICB9XG5cbiAgdXBkYXRlU3RhdGUoIGluZGV4OiBudW1iZXIgKSB7XG5cbiAgICB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCA9IGluZGV4O1xuICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPSBpbmRleCArIDE7XG5cbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGU7XG4gIH1cblxuICB1cGRhdGVTbGlkZSggZGlyZWN0aW9uOiBzdHJpbmcgKSB7XG5cbiAgICAvLyBnZXQgY3VycmVudCBzZWxlY3RlZCBhbmQgZmluZCB0aGUgbWF0Y2ggdG8gdGhlIG5leHQgZWxcbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCk7XG4gICAgbGV0IG5leHRTbGlkZSA9IHRoaXMuZ2FsbGVyeS5maW5kKFwibGlbZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBOYXZpZ2F0aW9uIGNoZWNrXG4gICAgdGhpcy51cGRhdGVNb2JpbGVOYXYodGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuICB9XG5cbiAgdXBkYXRlRGVzY0hlaWdodCggZGlyZWN0aW9uPzogc3RyaW5nLCBzZWxlY3RlZD86IEpRdWVyeSApIHtcblxuICAgIC8vIGRpcmVjdGlvblxuICAgIGlmICggZGlyZWN0aW9uICkge1xuXG4gICAgICBsZXQgaGVpZ2h0ID0gc2VsZWN0ZWQub3V0ZXJIZWlnaHQoKTtcbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMuZGVzYywgLjMsIHtcbiAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBnZXQgY3VycmVudCBzbGlkZVxuICAgICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudERlc2NFbGVtZW50KCk7XG4gICAgICBsZXQgaGVpZ2h0ID0gY3VycmVudFNsaWRlLm91dGVySGVpZ2h0KCk7XG4gICAgICB0aGlzLmRlc2MuaGVpZ2h0KGhlaWdodCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZURlc2MoIGRpcmVjdGlvbjogc3RyaW5nICkge1xuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnREZXNjRWxlbWVudCgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSB0aGlzLmRlc2MuZmluZChcIi5zaG93Y2FzZV9fZGVzYy0taXRlbVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG5cbiAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuXG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuXG4gICAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoXCJyaWdodFwiLCBuZXh0U2xpZGUpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG5cbiAgICAgIHRoaXMudXBkYXRlRGVzY0hlaWdodChcImxlZnRcIiwgbmV4dFNsaWRlKTtcblxuICAgIH1cblxuICB9XG5cbiAgdXBkYXRlVGh1bWJzbmF2KCBkaXJlY3Rpb246IHN0cmluZyApIHtcblxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnROYXZFbGVtZW50KCk7XG4gICAgbGV0IG5leHRTbGlkZSA9IHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCJsaVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG5cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA8IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBUQUJMRVQgVEhVTUIgU0VMRUNUXG4gICAgICAgKi9cblxuICAgICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA+PSA0ICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPCB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zIC0gdGhpcy50aHVtYlNjYWxlTGVmdDtcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zIC0gdGhpcy50aHVtYlNjYWxlVG9wO1xuXG4gICAgICAgICAgLy8gdXBkYXRlIGh0bWwgZWxlbWVudFxuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgIHg6IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MsXG4gICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsZWZ0XCIpO1xuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICsgdGhpcy50aHVtYlNjYWxlTGVmdDtcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHN0YXRlXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyArIHRoaXMudGh1bWJTY2FsZVRvcDtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogREVTS1RPUCBUSFVNQiBTRUxFQ1RcbiAgICAgICAqL1xuICAgICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcblxuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgICAgLy8gZGV0ZWN0aW5nIGlmIHNsaWRlIHNob3VsZCBtb3ZlIG9yIG5vdFxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPj0gNCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlIDwgdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gY29udHJvbGxlclxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgLSB0aGlzLnRodW1iU2NhbGVUb3A7XG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgLSB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuXG4gICAgICAgICAgLy8gbW92ZSBzbGlkZXJcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICsgdGhpcy50aHVtYlNjYWxlVG9wO1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgICB5OiB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyxcbiAgICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VwZXJhdGUgdGFibGV0IGxvb2tpbmcgYXQgc2hvdWxkIGl0IHVwZGF0ZSB0YWJsZXQgc3RhdGVcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyArIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIGNoZWNrVGh1bWJzTmF2KCBzaXplOiBzdHJpbmcgKSB7XG5cbiAgICBpZiAoIHNpemUgPT09IFwibW9iaWxlXCIgKSB7XG5cbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgeTogMCxcbiAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGFycm93SGFuZGxlciggZXZlbnQ6IGFueSApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGV0ICRlbCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7IC8vIGEgdGFnXG4gICAgbGV0IHRodW1iSW5kZXggPSAkZWwucGFyZW50KFwibGlcIikuZGF0YShcImluZGV4XCIpO1xuICAgIGxldCBwcmV2RWwgPSB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICAgIGxldCBwcmV2SW5kZXggPSBwcmV2RWwuZGF0YShcImluZGV4XCIpO1xuXG5cbiAgICAvLyBTbGlkZXIgY2FuIG1vdmUgcmlnaHQgYmVjYXVzZSBjdXJyZW50IHNsaWRlIGlzIG5vdCB0aGUgbGFzdCBzbGlkZVxuICAgIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInJpZ2h0XCIgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA8PSB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSBvbiBhcnJvdyBjbGlja1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIDEpO1xuXG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwicmlnaHRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG5cbiAgICB9IGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwibGVmdFwiICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSBvbiBhcnJvdyBjbGlja1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCAtIDEpO1xuXG4gICAgICAvLyBFbHNlIGlmIGl0cyBub3QgdGhlIGZpcnN0IHNsaWRlIC0gbW92ZSBsZWZ0XG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcImxlZnRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwidGh1bWJuYWlsXCIgJiZcbiAgICAgIHByZXZJbmRleCA8IHRodW1iSW5kZXggJiZcbiAgICAgIHRodW1iSW5kZXggKyAxICE9PSB0aGlzLmdldFRvdGFsU2xpZGVzXG4gICAgKSB7XG4gICAgICAvLyBjb21wYXJlIGl0ZW0gc2VsZWN0ZWQgaW5kZXggd2l0aCBuZXcgaXRlbSBzZWxlY3RlZCBhbmQgZGV0ZXJtaW5lIHdoaWNoIGRpcmVjdGlvbiB0byBtb3ZlXG4gICAgICAvLyB1cGRhdGUgU3RhdGVcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGh1bWJJbmRleCk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aHVtYnMgbmF2XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwicmlnaHRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwidGh1bWJuYWlsXCIgJiYgcHJldkluZGV4ID4gdGh1bWJJbmRleFxuICAgICkge1xuICAgICAgLy8gdXBkYXRlIFN0YXRlXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRodW1iSW5kZXgpO1xuXG4gICAgICAvLyB1cGRhdGUgdGh1bWJzIG5hdlxuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBjb3VudGVyXG4gICAgdGhpcy5jdXJyZW50Q291bnRJdGVtLmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIGlmIFRhYmxldCBvciBzbWFsbGVyIC0gYmluZCBtb2JpbGUgbmF2IGFycm93c1xuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgICAvLyBhZGp1c3QgY3NzIHNpemluZyBmb3IgdGh1bWJzIG5hdiBvbiBwb3NpdGlvbiByZXNpemVcbiAgICAgICAgdGhpcy5jaGVja1RodW1ic05hdihcIm1vYmlsZVwiKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLmNoZWNrVGh1bWJzTmF2KFwiZGVza3RvcFwiKTtcblxuICAgICAgfVxuXG4gICAgfSwgNDAwKTtcblxuICAgIHRoaXMudXBkYXRlRGVzY0hlaWdodCgpO1xuXG4gIH1cblxuICBhbmltYXRlU2hhZG93SW5PdXQoKSB7XG5cbiAgICAvLyByZW1vdmUgZHJvcHNoYWRvd1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuZ2FsbGVyeSwgMCwge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjApXCJcbiAgICB9KTtcblxuXG4gICAgVHdlZW5NYXgudG8odGhpcy5nYWxsZXJ5LCAuMSwge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjY4KVwiLFxuICAgICAgZGVsYXk6IC4zXG4gICAgfSk7XG5cblxuICB9XG5cbiAgYW5pbWF0ZVNoYWRvd0luKCkge1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuZ2FsbGVyeSwgLjMsIHtcbiAgICAgIGJveFNoYWRvdzogXCIwcHggMThweCA5NHB4IC0xNnB4IHJnYmEoMCwwLDAsMC42OClcIixcbiAgICAgIGRlbGF5OiAuMVxuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRUaHVtYnMoKSB7XG5cbiAgICBsZXQgZnJhZ21lbnQgPSAkKGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG4gICAgLy8gYnVpbGQgbG9vcCBmb3IgaW1hZ2VzXG4gICAgdGhpcy5nYWxsZXJ5LmZpbmQoXCJsaVwiKS5lYWNoKCggaW5kZXg6IG51bWJlciwgZWw6IE9iamVjdCApID0+IHtcblxuICAgICAgLy8gY3JlYXRlIGh0bWwgZWxlbWVudHNcbiAgICAgIGxldCBpdGVtSW5kZXggPSBVdGlscy5zZXROdW1iZXIoaW5kZXgpLFxuICAgICAgICBpbWFnZVRodW1iVXJsID0gJChlbCkuZGF0YShcInRodW1iXCIpLFxuICAgICAgICBpbWFnZVRodW1iQWx0ID0gJChlbCkuZGF0YShcImFsdFwiKSxcbiAgICAgICAgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKSxcbiAgICAgICAgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSxcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgLy8gYWRkIHNyYyBhbmQgYXR0ciB0byBpbWFnZVxuICAgICAgaW1hZ2VFbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBpbWFnZVRodW1iVXJsKTtcbiAgICAgIGltYWdlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgaW1hZ2VUaHVtYkFsdCk7XG4gICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiI1wiKTtcbiAgICAgIGxpbmtFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRWxlbWVudCk7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiLCBpdGVtSW5kZXgpO1xuXG4gICAgICAvLyBzZXQgZmlyc3QgaW1hZ2UgdG8gc2VsZWN0ZWRcbiAgICAgIGluZGV4ID09PSB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCA/IGVsZW1lbnQuY2xhc3NOYW1lID0gXCJzZWxlY3RlZFwiIDogXCJcIjtcblxuICAgICAgLy8gYXBwZW5kIHRvIGZyYWdtZW50XG4gICAgICBmcmFnbWVudC5hcHBlbmQoZWxlbWVudCk7XG5cbiAgICB9KTtcblxuICAgIC8vIGluc2VydCBodG1sIGVsZW1lbnQgdG8gdGhlIGRvbSBhZnRlciBsb29wIGZpbmlzaGVzXG4gICAgdGhpcy50aHVtYnNDb250YWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICB9XG5cbiAgYnVpbGRUaHVtYnNDbGlja0hhbmRsZXIoIGNhbGxiYWNrICkge1xuXG4gICAgLy8gQWRkIGFycmF5IG9mIGh0bWwgb2JqZWN0IHRvIGF0dGFjaCBjbGljayBldmVudHMgdG8gbGF0ZXJcbiAgICB0aGlzLnRodW1ic0NsaWNrID0gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcImFcIik7XG5cbiAgICAvLyBDbGljayBoYW5kbGVyIGZvciBwcmV2aWV3IHRodW1icyBvbiBkZXNrdG9wLCBuZWVkcyB0byB3b3JrIG9uIHRhYmxldCAtPiBkZXNrdG9wXG4gICAgdGhpcy50aHVtYnNDbGljay5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuICAgICAgJChlbCkub24oXCJjbGlja1wiLCB7IGtleXM6IFwidGh1bWJuYWlsXCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfSk7XG5cbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgYW5pbWF0ZUluVGh1bWJzKCkge1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuc2hvd0Nhc2VUaHVtYnMsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IDFcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVHYWxsZXJ5SW4oKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fb3V0ZXItLWJnaW1hZ2VcIiksIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IC43LFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcblxuICAgIHRoaXMuc2V0Rmlyc3RTbGlkZSgpO1xuXG4gICAgLy8gSW5pdCBjb3JyZWN0IG5hdiBkZXBlbmRpbmcgb24gdmlld3BvcnQgc2l6ZVxuICAgIHRoaXMuY2hlY2tTaXplKCk7XG4gICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KCk7XG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcImxlZnRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5leHRCdG5Nb2JpbGUub24oXCJjbGlja1wiLCB7IGtleXM6IFwicmlnaHRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRUb3RhbFNsaWRlcygpKSk7XG5cbiAgICAvLyB1cGRhdGUgY291bnRlclxuICAgIHRoaXMuY3VycmVudENvdW50SXRlbS5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICB9XG59XG5cbi8vIGxvb3AgdGhyb3VnaCBlYWNoIGhlYWRlciBzbGlkZXIgb2JqZWN0IG9uIHRoZSBwYWdlXG5jbGFzcyBTaG93Q2FzZVNMaWRlciB7XG5cbiAgaXRlbUluZm9XcmFwcGVyOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIgPSAkKFwiLnNob3djYXNlXCIpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNob3djYXNlIFNsaWRlciBpbml0XCIpO1xuXG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIuZWFjaCgoIGluZGV4OiBudW1iZXIsIGVsOiBPYmplY3QgKSA9PiB7XG5cbiAgICAgIC8vIFBhc3MgXCJ0aGlzXCIgdG8gZWFjaCBuZXcgSGVhZGVyIHNsaWRlciBjb21wb25lbnRcbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2hvd2Nhc2VDb21wb25lbnQoZWwpO1xuICAgICAgc2xpZGVyLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmxldCBTaG93Y2FzZVNsaWRlciA9IG5ldyBTaG93Q2FzZVNMaWRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBTaG93Y2FzZVNsaWRlcjtcbiIsImNvbnN0ICQgPSBqUXVlcnk7XG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTdGlja3lTaWRlYmFyQ29tcG9uZW50IHtcblxuICBpc0FuaW1hdGluZzogYm9vbGVhbjtcbiAgY29udGVudFdyYXBwZXI6IEpRdWVyeTtcbiAgY29udGVudE9mZnNldFRvcDogbnVtYmVyO1xuICBjb250ZW50V3JhcHBlckhlaWdodDogbnVtYmVyO1xuICBzY3JvbGxUb3A6IG51bWJlcjtcbiAgYXNpZGU6IEpRdWVyeTtcbiAgc2lkZWJhcldyYXBwZXI6IEpRdWVyeTtcbiAgd2luZG93SGVpZ2h0OiBudW1iZXI7XG4gIHNpZGViYXJIZWlnaHQ6IG51bWJlcjtcbiAgZm9vdGVySGVpZ2h0OiBudW1iZXI7XG4gIHNjcm9sbGluZ0Rvd246IGJvb2xlYW47XG4gIGxhc3RTY3JvbGxUb3A6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlciA9ICQoXCIuc2lkZWJhci1jb250ZW50XCIpO1xuICAgIHRoaXMuYXNpZGUgPSAkKFwiLnNlcnZpY2Utc2lkZWJhci13cmFwcGVyXCIpO1xuICAgIHRoaXMud2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFyV3JhcHBlciA9ICQoXCIuc2VydmljZS1zaWRlYmFyXCIpO1xuICB9XG5cbiAgY2hlY2tTaWRlYmFyKCk6IHZvaWQge1xuICAgIC8vIENoZWNrIGlmIHRoZSBzaWRlYmFyIGlzIGZpeGVkIG9yIG5vdFxuICAgIGlmICggIXRoaXMuaXNBbmltYXRpbmcgJiYgVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpID9cbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpLCAzMDApIDpcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIHRoaXMucmVzZXRTaWRlQmFyKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tTaWRlYmFyVmlzaWJpbGl0eSgpIHtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICAvLyBkb2VzIHNpZGViYXIgaGF2ZSBjbGFzcyB2aXNpYmlsaXR5XG4gICAgICBsZXQgaXNWaXNpYmxlID0gdGhpcy5hc2lkZS5oYXNDbGFzcygndmlzaWJsZScpO1xuXG4gICAgICBpZiAoICFpc1Zpc2libGUgKSB7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU2lkZWJhckluKHRoaXMuYXNpZGUpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIHJlc2V0U2lkZUJhcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5hc2lkZS5yZW1vdmVDbGFzcyhcInN0aWNreVwiKTtcbiAgICB0aGlzLmFzaWRlLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGViYXJQb3NpdGlvbigpOiB2b2lkIHtcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxEaXJlY3Rpb24oKTtcblxuICAgIHRoaXMuY2hlY2tTaWRlYmFyVmlzaWJpbGl0eSgpO1xuXG4gICAgLy8gZ2V0IGRpc3RhbmNlIGZyb20gdG9wIG9mIGNvbnRlbnQgMTAgKyA0MCA9IDUwIHBhZGRpbmcgdG9wXG4gICAgLy8gdGhpcy5jb250ZW50T2Zmc2V0VG9wID0gdGhpcy5jb250ZW50V3JhcHBlci5vZmZzZXQoKS50b3AgLSAxMDtcbiAgICB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm9mZnNldCgpLnRvcCArIDI1O1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCA9IHRoaXMuY29udGVudFdyYXBwZXIub3V0ZXJIZWlnaHQoKTsgLy8gaW5jbHVkZSBwYWRkaW5nIGFuZCBtYXJnaW5cblxuXG4gICAgLy8gZ2V0IHdoZXJlIHRvcCBvZiB3aW5kb3cgaXNcbiAgICB0aGlzLnNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnRlbnQgV3JhcHBlciBIZWlnaHRcIiwgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJDb250ZW50IE9mZnNldFwiLCB0aGlzLmNvbnRlbnRPZmZzZXRUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2lkZWJhciBIZWlnaHRcIiwgdGhpcy5zaWRlYmFySGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIldpbmRvdyBIZWlnaHRcIiwgdGhpcy53aW5kb3dIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwib2Zmc2V0IFRvcFwiLCB0aGlzLmNvbnRlbnRPZmZzZXRUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2Nyb2xsVG9wXCIsIHRoaXMuc2Nyb2xsVG9wKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNpZGViYXJvZmZzZXRcIiwgdGhpcy5zY3JvbGxUb3ApO1xuXG4gICAgLy8gSWYgdGhlIHdpbmRvdyBWIHBvc2l0aW9uIGlzIGxlc3MgdGhhbiB0aGUgY29udGVudCBWIHBvc2l0aW9uIG1ha2Ugc2lkZWJhciBub3JtYWxcbiAgICBpZiAoIHRoaXMuc2Nyb2xsVG9wIDwgdGhpcy5jb250ZW50T2Zmc2V0VG9wICkge1xuICAgICAgbGV0IGNzc1Byb3BzID0ge1xuICAgICAgICBcInRyYW5zaXRpb25cIjogXCJ0b3AgLjNzXCJcbiAgICAgIH07XG4gICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpO1xuICAgICAgdGhpcy5hc2lkZS5jc3MoY3NzUHJvcHMpO1xuXG4gICAgICAvLyBpZiB3aW5kb3cgViBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gY29udGVudCAtIGFkZCBzdGlja3lcbiAgICAgIC8vIDJuZCBjaGVja3MgdGhlIG9mZnNldCBvZiB0aGUgdG9wIG9mIHRoZSB3aW5kb3cgdG8gdGhlIHRvcCBvZiB0aGUgY29udGVudCAmJiB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRlbnQgaW4gcmVsYXRpb24gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSB3aW5kb3cgLSA0MCBvbiBlbmRcbiAgICB9IGVsc2UgaWYgKCB0aGlzLnNjcm9sbFRvcCA+PSB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgJiYgdGhpcy5zY3JvbGxUb3AgPCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgdGhpcy5jb250ZW50T2Zmc2V0VG9wIC0gNTAgKSB7XG4gICAgICB0aGlzLmFzaWRlLmFkZENsYXNzKFwic3RpY2t5XCIpLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcblxuICAgICAgaWYgKCB0aGlzLnNjcm9sbGluZ0Rvd24gPT09IHRydWUgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcInRvcCAuM3NcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFzaWRlLmNzcyhcInRyYW5zaXRpb25cIiwgXCJcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbGV0IGFydGljbGVQYWRkaW5nVG9wID0gTnVtYmVyKGFydGljbGVzLmVxKDEpLmNzcyhcInBhZGRpbmctdG9wXCIpLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XG4gICAgICBpZiAoIHRoaXMuYXNpZGUuaGFzQ2xhc3MoXCJzdGlja3lcIikgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuICAgICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpLmNzcyhcInRvcFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgMSArIFwicHhcIik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgfVxuXG4gIGNoZWNrU2Nyb2xsRGlyZWN0aW9uKCkge1xuICAgIC8vIExvZyBjdXJyZW50IHNjcm9sbFBvaW50XG4gICAgbGV0IHN0ID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblxuICAgIC8vIGNvbXBhcmUgdG8gbGFzdCBzY3JvbGxQb2ludFxuICAgIGlmICggc3QgPiB0aGlzLmxhc3RTY3JvbGxUb3AgKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInNjcm9sbCBkb3duXCIpO1xuICAgICAgLy8gZG93bnNjcm9sbCBjb2RlXG4gICAgICB0aGlzLnNjcm9sbGluZ0Rvd24gPSB0cnVlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwic2Nyb2xsIHVwXCIpO1xuICAgICAgLy8gdXBzY3JvbGwgY29kZVxuICAgICAgdGhpcy5zY3JvbGxpbmdEb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gb24gY29tcGxldGUgLSBtYWtlIGxhc3QgU2Nyb2xsIHBvaW50IHRoZSBwb2ludCBhdCB3aGljaCB0aGV5IHN0YXJ0ZWQgc2Nyb2xsaW5nIGF0IGZpcnN0XG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gc3Q7XG4gIH1cblxuICBhbmltYXRlU2lkZWJhckluKCBlbGVtZW50OiBKUXVlcnkgKSB7XG5cbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzKFwiaW50cm9cIik7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgbGV0IHNpZGViYXJJbnRybyA9IFR3ZWVuTWF4LnRvKGVsZW1lbnQsIC4zLCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHo6IC4wMDEsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXQsXG4gICAgICAgIGRlbGF5OiAuOSxcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIC8vIG1ha2Ugc2lkZWJhciBwZXJtYW5lbnRseSB2aXNpYmxlXG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0aWNreSBzaWRlYmFyIGxvYWRlZFwiKTtcblxuICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IDA7XG5cbiAgICBpZiAoIHRoaXMuYXNpZGUubGVuZ3RoID4gMCApIHtcbiAgICAgIHRoaXMuY2hlY2tTaWRlYmFyKCk7XG5cbiAgICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcbiAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcblxuICAgICAgLy8gQW5pbWF0ZSBzaWRlIGJhciBpbiBvbiBsb2FkXG4gICAgICB0aGlzLmFuaW1hdGVTaWRlYmFySW4odGhpcy5hc2lkZSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBBbmltYXRlIHNpZGUgYmFyIGluIG9uIGxvYWRcbiAgICAgIHRoaXMuYW5pbWF0ZVNpZGViYXJJbigkKFwiLnNlcnZpY2Utc2lkZWJhci1ub3N0aWNrXCIpKTtcblxuICAgIH1cbiAgfVxufVxuXG5sZXQgU3RpY2t5U2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN0aWNreVNpZGViYXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmNsYXNzIFRlc3RpbW9uYWlsQ29tcG9uZW50IHtcblxuICB0ZXN0aW1vbmFpbHM6IEpRdWVyeTtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgY3VycmVudEhlaWdodDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVzdGltb25haWxzID0gJChcIi50ZXN0aW1vbmlhbHNcIik7XG4gIH1cblxuICBnZW5lcmF0ZUlkKCBpbmRleCwgZWwgKSB7XG5cbiAgICAvLyBjcmVhdGUgRHluYW1pYyBJRFxuICAgIGxldCBpZFN0cmluZyA9IFwiY2Fyb3VzZWwtdGVzdGltb25pYWwtXCIgKyBpbmRleDtcbiAgICBlbC5hdHRyKFwiaWRcIiwgaWRTdHJpbmcpO1xuXG4gICAgLy8gQWRkIG1hdGNoaW5nIGhyZWYgdG8gY29udHJvbHNcbiAgICBsZXQgY29udHJvbHMgPSBlbC5maW5kKFwiLmNhcm91c2VsLWNvbnRyb2xcIik7XG4gICAgY29udHJvbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgJChlbCkuYXR0cihcImhyZWZcIiwgXCIjXCIgKyBpZFN0cmluZyk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgb25SZXNpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIENoYW5nZSBIZWlnaHQgb24gcmVzaXplXG4gICAgICB0aGlzLnRlc3RpbW9uYWlscy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAgIGxldCAkdGhpcyA9ICQoZWwpO1xuXG4gICAgICAgIC8vIGVzdGFibGlzaCB2YXJzXG4gICAgICAgIGxldCAkaW5uZXIgPSAkdGhpcy5maW5kKFwiLmNhcm91c2VsLWlubmVyXCIpLFxuICAgICAgICAgICAgJGFjdGl2ZSA9ICRpbm5lci5maW5kKFwiLmFjdGl2ZVwiKSxcbiAgICAgICAgICAgIGJsb2NrSXRlbSA9ICRhY3RpdmUuZmluZChcImJsb2NrcXVvdGVcIik7XG5cbiAgICAgICAgLy8gU2V0IGhlaWdodCBmb3IgZmlyc3QgaXRlbVxuICAgICAgICBsZXQgaGVpZ2h0ID0gYmxvY2tJdGVtLm91dGVySGVpZ2h0KCk7XG5cbiAgICAgICAgLy8gaWYgdGhleSBhcmVuJ3QgZXF1YWwsIGNoYW5nZSB0aGVtXG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50SGVpZ2h0ICE9PSBoZWlnaHQgKSB7XG4gICAgICAgICAgJGlubmVyLmNzcyhcImhlaWdodFwiLCBoZWlnaHQpO1xuICAgICAgICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0sIDQwMCk7XG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgY29uc29sZS5sb2coXCJUZXN0aW1vbmlhbHMgSW5pdFwiKTtcblxuICAgIC8vIE1ha2UgaXRlbXMgZHluYW1pY1xuICAgIHRoaXMudGVzdGltb25haWxzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVJZChpbmRleCwgJHRoaXMpO1xuXG4gICAgICAvLyBtYWtlIGZpcnN0IGVsZW1lbnQgYWN0aXZlXG4gICAgICBsZXQgJGlubmVyID0gJHRoaXMuZmluZChcIi5jYXJvdXNlbC1pbm5lclwiKTtcbiAgICAgIGxldCAkZmlyc3QgPSAkaW5uZXIuY2hpbGRyZW4oXCIuaXRlbVwiKS5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyBTZXQgaGVpZ2h0IGZvciBmaXJzdCBpdGVtXG4gICAgICBsZXQgaGVpZ2h0ID0gJGZpcnN0Lm91dGVySGVpZ2h0KCk7XG4gICAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAkaW5uZXIuY3NzKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICB9KTtcblxuICAgIC8vIFN0YXJ0IFNsaWRlcnNcbiAgICB0aGlzLnRlc3RpbW9uYWlscy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAvLyBpbml0IGNhcm91c2VsXG4gICAgICAkKGVsKS5jYXJvdXNlbCgpO1xuXG4gICAgICAvLyBPbiBzbGlkZSBjaGFuZ2UgaGVpZ2h0IGZvciBzbW9vdGggdHJhbnNpdGlvbnNcbiAgICAgICQoZWwpLm9uKFwic2xpZC5icy5jYXJvdXNlbFwiLCAoIGUgKSA9PiB7XG5cbiAgICAgICAgLy8gc2xpZGVcbiAgICAgICAgbGV0ICR0aGlzID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBsZXQgY3VycmVudFNsaWRlID0gJCgkdGhpcykuZmluZChcIi5hY3RpdmVcIik7XG4gICAgICAgIGxldCBibG9ja0l0ZW0gPSBjdXJyZW50U2xpZGUuZmluZChcImJsb2NrcXVvdGVcIik7XG4gICAgICAgIGxldCBoZWlnaHQgPSBibG9ja0l0ZW0ub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBjdXJyZW50U2xpZGUucGFyZW50KFwiLmNhcm91c2VsLWlubmVyXCIpLmNzcyhcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGFkanVzdCBzaXplIG9uIHJlc2l6ZVxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxuY29uc3QgVGVzdGltb25haWxzID0gbmV3IFRlc3RpbW9uYWlsQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RpbW9uYWlsczsiLCJpbXBvcnQge0Jwc0ludGVyZmFjZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYnBzLmludGVyZmFjZVwiO1xuY29uc3QgJCA9IGpRdWVyeTtcblxuLy8gQWRkIGludGVyZmFjZSBKUXVlcnlTbW9vdGgge1xuLy8gc21vb3RoU3RhdGUoKTp2b2lkO1xuLy8gfVxuLy8gc21vb3RoU3RhdGUoYXJnOiBPYmplY3QpOiBKUXVlcnk7XG5cbmNsYXNzIFV0aWxpdHlDb21wb25lbnQge1xuICB3aW5kb3dXaWR0aDogbnVtYmVyO1xuICBicmVha3BvaW50OiBudW1iZXI7XG4gIGJyZWFrcG9pbnRzOiBudW1iZXJbXTtcbiAgYnBzOiBCcHNJbnRlcmZhY2U7XG4gIGJyb3dzZXI6IHN0cmluZztcblxuICBwcml2YXRlIF9zZXRCcmVha3BvaW50cyA9ICggYnBzOiBCcHNJbnRlcmZhY2UgKSA9PiB7XG4gICAgbGV0IGFyciA9IFtdO1xuXG4gICAgZm9yICggbGV0IGtleSBpbiBicHMgKSB7XG4gICAgICBpZiAoIGJwcy5oYXNPd25Qcm9wZXJ0eShrZXkpICkge1xuICAgICAgICBhcnIucHVzaChicHNbIGtleSBdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyLnJldmVyc2UoKTtcbiAgfTtcbiAgcHJpdmF0ZSBfY2hlY2tCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIG1ha2UgYnJlYWtwb2ludCBldmVudCBhdmFpbGFibGUgdG8gYWxsIGZpbGVzIHZpYSB0aGUgd2luZG93IG9iamVjdFxuICAgIGxldCBvbGRfYnJlYWtwb2ludCA9IHRoaXMuYnJlYWtwb2ludDtcblxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcblxuICAgIGlmICggb2xkX2JyZWFrcG9pbnQgIT09IHRoaXMuYnJlYWtwb2ludCApIHtcblxuICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoXCJicmVha3BvaW50Q2hhbmdlXCIsIFV0aWxzLmJyZWFrcG9pbnQpO1xuICAgIH1cbiAgfTtcbiAgcHJpdmF0ZSBfc2V0QnJlYWtwb2ludCA9ICgpID0+IHtcbiAgICAvLyBnZXQgYnJlYWtwb2ludCBmcm9tIGNzc1xuICAgIGNvbnNvbGUubG9nKCQoJ2JvZHknKS5jc3MoXCJ6LWluZGV4XCIpKTtcblxuICAgIGxldCBib2R5ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KSxcbiAgICAgIHppbmRleCA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbIFwiei1pbmRleFwiIF07XG5cbiAgICB0aGlzLmJyZWFrcG9pbnQgPSBwYXJzZUludCh6aW5kZXgsIDEwKTtcbiAgfTtcbiAgcHJpdmF0ZSBfc2V0V2luZG93V2lkdGggPSAoKSA9PiB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICB9O1xuXG4gIHNldE51bWJlciggY291bnQ6IG51bWJlciApOiBzdHJpbmcge1xuICAgIC8vIGNvbnZlciBudW1iZXIgdG8gc3RyaW5nXG4gICAgbGV0IHRvdGFsID0gY291bnQ7XG4gICAgcmV0dXJuIHRvdGFsLnRvU3RyaW5nKCk7XG4gIH1cblxuICB3aGljaEJyb3dzZXIoKSB7XG4gICAgaWYgKCAobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJzYWZhcmlcIikgPiAtMSkgJiYgIShcbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiY2hyb21lXCIpID4gLTEpICYmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PT1cbiAgICAgIFwiTmV0c2NhcGVcIikgKSB7XG5cbiAgICAgIGlmICggbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKSAhPT0gbnVsbCApIHtcbiAgICAgICAgcmV0dXJuIFwiaXBhZFwiO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJzYWZhcmlcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBidWlsZEh0bWwoIHR5cGU6IHN0cmluZywgYXR0cnM/OiBPYmplY3QsIGh0bWw/OiBzdHJpbmcgKSB7XG4gICAgXG4gICAgLy8gaHR0cDovL21hcmNncmFiYW5za2kuY29tL2J1aWxkaW5nLWh0bWwtaW4tanF1ZXJ5LWFuZC1qYXZhc2NyaXB0L1xuICAgIFxuICAgIGxldCBoID0gJzwnICsgdHlwZTtcblxuICAgIGZvciAoIGxldCBhdHRyIGluIGF0dHJzICkge1xuICAgICAgaWYgKCBhdHRyc1sgYXR0ciBdID09PSBmYWxzZSApIGNvbnRpbnVlO1xuICAgICAgaCArPSAnICcgKyBhdHRyICsgJz1cIicgKyBhdHRyc1sgYXR0ciBdICsgJ1wiJztcbiAgICB9XG5cbiAgICByZXR1cm4gaCArPSBodG1sID8gXCI+XCIgKyBodG1sICsgXCI8L1wiICsgdHlwZSArIFwiPlwiIDogXCIvPlwiO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDA7XG4gICAgdGhpcy5icmVha3BvaW50ID0gMzIwO1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSBbXTtcbiAgICB0aGlzLmJwcyA9IHtcbiAgICAgIG1vYmlsZTogNTQ0LFxuICAgICAgdGFibGV0OiA3NjgsXG4gICAgICBsYXB0b3A6IDk5MixcbiAgICAgIGRlc2t0b3A6IDEyMDAsXG4gICAgICBkZXNrdG9wX3hsOiAxNjAwXG4gICAgfTtcbiAgICB0aGlzLmJyb3dzZXIgPSB0aGlzLndoaWNoQnJvd3NlcigpO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlV0aWxpdGllcyBsb2FkZWRcIik7XG5cbiAgICAvLyBzZXQgYnJlYWtwb2ludCBvbiB3aW5kb3cgbG9hZFxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcbiAgICB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBCcmVha3BvaW50IGlzOlwiLCB0aGlzLmJyZWFrcG9pbnQpO1xuXG4gICAgLy8gY3JlYXRlIGZ1bGwgYXJyYXkgZm9yIGltYWdlIGNvbXByZXNzaW9uIHJlZlxuICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLl9zZXRCcmVha3BvaW50cyh0aGlzLmJwcyk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5fY2hlY2tCcmVha3BvaW50KS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBVdGlscyA9IG5ldyBVdGlsaXR5Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyJdfQ==
