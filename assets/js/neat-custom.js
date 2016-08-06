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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvY3VzdG9tL2FwcC50cyIsImFzc2V0cy9qcy9jdXN0b20vbmF2aWdhdGlvbi9jb21wb25lbnRzL3NlYXJjaC50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvZGVzYy1vLWFuaW1hdGlvbi50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvZ2FsbGVyeS1pc290b3BlLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9oZWFkZXItc2xpZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9oZWFkZXItc3ZnLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9pbWFnZUxvYWRlci50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvcHJvY2Vzc0FuaW1hdGlvbi50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvcXVvdGUtYnVpbGRlci50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvc2hvd2Nhc2Utc2xpZGVyLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy9zdGlja3ktc2lkZWJhci50cyIsImFzc2V0cy9qcy9jdXN0b20vcGFydGlhbHMvdGVzdGltb25pYWxzLnRzIiwiYXNzZXRzL2pzL2N1c3RvbS9wYXJ0aWFscy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7R0FHRzs7QUFFSCxzQkFBa0Isa0JBQWtCLENBQUMsQ0FBQTtBQUVyQyx1QkFBbUIsZ0NBQWdDLENBQUMsQ0FBQTtBQUNwRCwyQkFBc0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM5Qyw0QkFBd0Isd0JBQXdCLENBQUMsQ0FBQTtBQUNqRCwrQkFBMEIsMkJBQTJCLENBQUMsQ0FBQTtBQUN0RCxpQ0FBZ0MsNkJBQTZCLENBQUMsQ0FBQTtBQUM5RCxnQ0FBMkIsNEJBQTRCLENB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QUFJLENBQUM7UUFFbkIsR0FBRyxDQUFDLENBQUUsSUFBSSxJQUFJLElBQUksS0FBTSxDQUFDLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBRSxLQUFLLENBQUUsSUFBSSxDQUFFLEtBQUssS0FBTSxDQUFDO2dCQUFDLFFBQVEsQ0FBQztZQUN4QyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFFLElBQUksQ0FBRSxHQUFHLEdBQUcsQ0FBQztRQUMvQyxDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDM0QsQ0FBQztJQWdCRCwrQkFBSSxHQUFKO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBRWhDLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZELDhDQUE4QztRQUM5QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxELENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQXZHQSxBQXVHQyxJQUFBO0FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO0FBRW5DO2tCQUFlLEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKlxuIFJlZiBwYXRoIGlzIG5vdCBuZWVkZWQgZm9yIHNvbWUgcmVhc29uXG4gPHJlZmVyZW5jZSBwYXRoPVwiL1VzZXJzL3lvc2VtZXRpZS9Ecm9wYm94L2RldmVsb3BtZW50L3Zob3N0cy93d3cubHluZGFzY29yZS5kZXYvd3AtY29udGVudC90aGVtZXMvbmVhdC90eXBpbmdzL3RzZC5kLnRzXCIgLz5cbiAqL1xuXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vcGFydGlhbHMvdXRpbHNcIjtcbmltcG9ydCBOYXYgZnJvbSBcIi4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgU2VhcmNoIGZyb20gXCIuL25hdmlnYXRpb24vY29tcG9uZW50cy9zZWFyY2hcIjtcbmltcG9ydCBTdmdIZWFkZXIgZnJvbSBcIi4vcGFydGlhbHMvaGVhZGVyLXN2Z1wiO1xuaW1wb3J0IEltYWdlTG9hZGVyIGZyb20gXCIuL3BhcnRpYWxzL2ltYWdlTG9hZGVyXCI7XG5pbXBvcnQgU3RpY2t5U2lkZWJhciBmcm9tIFwiLi9wYXJ0aWFscy9zdGlja3ktc2lkZWJhclwiO1xuaW1wb3J0IEFuaW1hdGlvbkNvbnRyb2xsZXIgZnJvbSBcIi4vcGFydGlhbHMvcHJvY2Vzc0FuaW1hdGlvblwiO1xuaW1wb3J0IElzb3RvcGVHYWxsZXJ5IGZyb20gXCIuL3BhcnRpYWxzL2dhbGxlcnktaXNvdG9wZVwiO1xuaW1wb3J0IEhlYWRlclNsaWRlciBmcm9tIFwiLi9wYXJ0aWFscy9oZWFkZXItc2xpZGVyXCI7XG5pbXBvcnQgU2hvd2Nhc2VTbGlkZXIgZnJvbSBcIi4vcGFydGlhbHMvc2hvd2Nhc2Utc2xpZGVyXCI7XG5pbXBvcnQgVGVzdGltb25pYWxzIGZyb20gXCIuL3BhcnRpYWxzL3Rlc3RpbW9uaWFsc1wiO1xuaW1wb3J0IFF1b3RlQnVpbGRlciBmcm9tIFwiLi9wYXJ0aWFscy9xdW90ZS1idWlsZGVyXCI7XG4vLyBpbXBvcnQgU3RpY2t5U2lkZWJhciBmcm9tIFwiLi9wYXJ0aWFscy9zZXJ2aWNlLXNpZGViYXJcIjtcbmNvbnN0ICQgPSBqUXVlcnk7XG5kZWNsYXJlIHZhciBTY3JvbGxNYWdpYzogYW55O1xuXG4oZnVuY3Rpb24gKCkge1xuXG4gIGNsYXNzIEFwcCB7XG5cbiAgICBpbml0KCk6IHZvaWQge1xuICAgICAgY29uc29sZS5sb2coXCJBcHAgbG9hZGVkXCIpO1xuICAgICAgU3ZnSGVhZGVyLmluaXQoKTtcbiAgICAgIFV0aWxzLmluaXQoKTtcbiAgICAgIC8vIE5hdi5pbml0KCk7XG4gICAgICBTZWFyY2guaW5pdCgpO1xuICAgICAgU3RpY2t5U2lkZWJhci5pbml0KCk7XG4gICAgICBUZXN0aW1vbmlhbHMuaW5pdCgpO1xuICAgICAgUXVvdGVCdWlsZGVyLmluaXQoKTtcbiAgICAgIEFuaW1hdGlvbkNvbnRyb2xsZXIuaW5pdCgpOyAvLyBHbG9iYWwgd2luZG93IGFuaW0gYW5kIGNsaWNrIGNvbnRyb2xcbiAgICB9XG4gIH1cblxuICAgIGxldCBib290c3RyYXAgPSBuZXcgQXBwKCk7XG5cblxuICAvKiogcnVuIGFsbCBmdW5jdGlvbnMgKi9cbiAgJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGJvb3RzdHJhcC5pbml0KCk7XG4gICAgSW1hZ2VMb2FkZXIuaW5pdCgpO1xuICB9KTtcblxuICAvLyBCaW5kIGV2ZW50cyB0byB0aGUgaW1hZ2VzTG9hZGVkIHBsdWdpbiBoZXJlXG4gICQoZG9jdW1lbnQpLm9uKFwiaW1nTG9hZGVkXCIsIGZ1bmN0aW9uICggZSApIHtcbiAgICBjb25zb2xlLmxvZyhcImltYWdlIGxvYWRlZCBjdXN0b20gZXZlbnRcIik7XG4gICAgXG4gICAgLy8gY2hlY2sgaWYgcGFnZSBoYXMgZ2FsbGVyeVxuICAgIGlmICggJChcIi5nYWxsZXJ5LWNvbnRhaW5lclwiKS5sZW5ndGggPiAwICkge1xuICAgICAgSXNvdG9wZUdhbGxlcnkuaW5pdCgpO1xuICAgIH1cbiAgICBIZWFkZXJTbGlkZXIuaW5pdCgpO1xuICAgIFNob3djYXNlU2xpZGVyLmluaXQoKTtcblxuICB9KTtcblxufSkoKTsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuLi8uLi9wYXJ0aWFscy91dGlsc1wiO1xuXG5jbGFzcyBTZWFyY2hDb21wb25lbnQge1xuICAkc2VhcmNoVHJpZ2dlcjogSlF1ZXJ5O1xuICAkc2VhcmNoQ2xvc2VUcmlnZ2VyOiBKUXVlcnk7XG4gICRzZWFyY2hGb3JtOiBKUXVlcnk7XG4gICRzZWFyY2hCdXR0b25BcmVhOiBKUXVlcnk7XG4gICRpY29uOiBKUXVlcnk7XG4gICRmb3JtOiBKUXVlcnk7XG4gICRpbnB1dDogSlF1ZXJ5O1xuICAkd2lkdGg6IG51bWJlcjtcbiAgJGhlaWdodDogbnVtYmVyO1xuICBpc09wZW46IGJvb2xlYW47XG5cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyID0gJChcIi5tZXRhLXNlYXJjaC10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciA9ICQoXCIuc3VwZXItc2VhcmNoLWNsb3NlXCIpO1xuICAgIHRoaXMuJHNlYXJjaEZvcm0gPSAkKFwiLnN1cGVyLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRzZWFyY2hCdXR0b25BcmVhID0gJChcIi5tZXRhLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRpY29uID0gdGhpcy4kc2VhcmNoVHJpZ2dlci5jaGlsZHJlbihcImlcIik7XG4gICAgdGhpcy4kZm9ybSA9IHRoaXMuJHNlYXJjaEZvcm0uZmluZChcIi5uZWF0LXNlYXJjaFwiKTtcbiAgICB0aGlzLiRpbnB1dCA9IHRoaXMuJGZvcm0uZmlyc3QoKTtcbiAgICB0aGlzLiR3aWR0aCA9IHRoaXMuJHNlYXJjaEJ1dHRvbkFyZWEud2lkdGgoKTtcbiAgICB0aGlzLiRoZWlnaHQgPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLmhlaWdodCgpO1xuICB9XG5cbiAgcmVsb2FkKCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIFJlbG9hZFwiKTtcbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyID0gJChcIi5tZXRhLXNlYXJjaC10cmlnZ2VyXCIpO1xuICAgIHRoaXMuJHNlYXJjaENsb3NlVHJpZ2dlciA9ICQoXCIuc3VwZXItc2VhcmNoLWNsb3NlXCIpO1xuICAgIHRoaXMuJHNlYXJjaEZvcm0gPSAkKFwiLnN1cGVyLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRzZWFyY2hCdXR0b25BcmVhID0gJChcIi5tZXRhLXNlYXJjaFwiKTtcbiAgICB0aGlzLiRpY29uID0gdGhpcy4kc2VhcmNoVHJpZ2dlci5jaGlsZHJlbihcImlcIik7XG4gICAgdGhpcy4kZm9ybSA9ICQoXCIubmVhdC1zZWFyY2hcIik7XG4gICAgdGhpcy4kd2lkdGggPSB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gICAgdGhpcy4kaGVpZ2h0ID0gdGhpcy4kc2VhcmNoQnV0dG9uQXJlYS5oZWlnaHQoKTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gIH1cblxuICBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hCdXR0b25BcmVhLndpZHRoKCk7XG4gIH1cblxuICBnZXRUb3BQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9mZnNldCgpLnRvcCAtICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgfVxuXG4gIGdldExlZnRQb3NpdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiRzZWFyY2hUcmlnZ2VyLm9mZnNldCgpLmxlZnQ7XG4gIH1cblxuICBjbG9zZVNlYXJjaCggZXZlbnQgKSB7XG5cbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG4gICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBUaW1lbGluZUxpdGUoKTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIsIC4yLCB7XG4gICAgICB0b3A6IFwiNSVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kZm9ybSwgLjQsIHtcbiAgICAgIHRvcDogXCIyNSVcIixcbiAgICAgIG9wYWNpdHk6IFwiMFwiLFxuICAgICAgZWFzZTogRXhwby5lYXNlSW5PdXRcbiAgICB9KTtcblxuICAgIGFuaW1hdGlvbi50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogdGhpcy5nZXRMZWZ0UG9zaXRpb24oKSxcbiAgICAgIHRvcDogdGhpcy5nZXRUb3BQb3NpdGlvbigpLFxuICAgICAgd2lkdGg6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgZGVsYXk6IC4zLFxuICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAkKFwiYm9keVwiKS5jc3Moe1xuICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgd2lkdGg6IFwiMTAwJVwiXG4gICAgICAgIH0pO1xuICAgICAgICBUd2VlbkxpdGUudG8odGhpcy4kaWNvbiwgLjIsIHtcbiAgICAgICAgICB0b3A6IFwiNTAlXCIsXG4gICAgICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSkudG8odGhpcy4kc2VhcmNoRm9ybSwgLjQsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgICAgICBcInotaW5kZXhcIjogLTEsXG4gICAgICAgICAgXCJsZWZ0XCI6IDAsXG4gICAgICAgICAgXCJ0b3BcIjogMCxcbiAgICAgICAgICBcIndpZHRoXCI6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgICBcImhlaWdodFwiOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICAgIH0pO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG5cbiAgfVxuXG4gIG9wZW5TZWFyY2goZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgLy8gcHJldmVudCBidXR0b24gZnJvbSBiZWluZyB1c2VkIG9uY2Ugc2VhcmNoIGlzIG9wZW5cbiAgICB0aGlzLiRzZWFyY2hUcmlnZ2VyLmJsdXIoKTtcblxuICAgIHRoaXMuJHNlYXJjaEZvcm0uY3NzKHtcbiAgICAgIGxlZnQ6IHRoaXMuZ2V0TGVmdFBvc2l0aW9uKCksXG4gICAgICB0b3A6IHRoaXMuZ2V0VG9wUG9zaXRpb24oKSxcbiAgICAgIHdpZHRoOiB0aGlzLmdldFdpZHRoKCksXG4gICAgICBoZWlnaHQ6IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgIFwiei1pbmRleFwiOiA5OTlcbiAgICB9KTtcblxuICAgIGxldCBhbmltYXRpb24gPSBuZXcgVGltZWxpbmVMaXRlKCk7XG5cbiAgICBhbmltYXRpb24udG8odGhpcy4kc2VhcmNoRm9ybSwgLjIsIHtcbiAgICAgIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjJcbiAgICB9KS50byh0aGlzLiRzZWFyY2hGb3JtLCAuMiwge1xuICAgICAgbGVmdDogMCxcbiAgICAgIHRvcDogMCxcbiAgICAgIHdpZHRoOiBcIjEwMCVcIixcbiAgICAgIGhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgYmFja2dyb3VuZDogXCIjMzUzNzNEXCIsXG4gICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyh7XG4gICAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgb3ZlcmZsb3dZOiBcInNjcm9sbFwiXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuJGljb24sIC4yLCB7XG4gICAgICB0b3A6IFwiMTEwJVwiLFxuICAgICAgb3BhY2l0eTogXCIwXCIsXG4gICAgfSk7XG5cbiAgICBUd2VlbkxpdGUudG8odGhpcy4kc2VhcmNoQ2xvc2VUcmlnZ2VyLCAuMywge1xuICAgICAgdG9wOiBcIjMlXCIsXG4gICAgICBvcGFjaXR5OiBcIjFcIixcbiAgICAgIGRlbGF5OiAuNCxcbiAgICB9KTtcblxuICAgIFR3ZWVuTGl0ZS50byh0aGlzLiRmb3JtLCAuNCwge1xuICAgICAgdG9wOiBcIjIwJVwiLFxuICAgICAgb3BhY2l0eTogXCIxXCIsXG4gICAgICBkZWxheTogLjQsXG4gICAgICBlYXNlOiBFeHBvLmVhc2VJbk91dFxuICAgIH0pO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiU2VhcmNoIGxvYWRlZFwiKTtcbiAgICAvLyB0aGlzLm9wZW5TZWFyY2goKTtcbiAgICB0aGlzLiRpbnB1dC5rZXl1cCgoZXZlbnQpID0+IHtcbiAgICAgIC8vIGlmIGtleSBpcyBlbnRlciAtIGFuaW1hdGUgb3V0XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAxMykge1xuICAgICAgICB0aGlzLmNsb3NlU2VhcmNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuJHNlYXJjaFRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLm9wZW5TZWFyY2guYmluZCh0aGlzKSkuYmluZCh0aGlzKTtcbiAgICB0aGlzLiRzZWFyY2hDbG9zZVRyaWdnZXIub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlU2VhcmNoLmJpbmQodGhpcykpLmJpbmQodGhpcyk7XG4gICAgXG4gICAgJChcImJvZHlcIikua2V5dXAoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoIGV2ZW50LndoaWNoID09PSAyNyAmJiB0aGlzLmlzT3BlbiApIHtcbiAgICAgICAgdGhpcy5jbG9zZVNlYXJjaChldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubGV0IFNlYXJjaEJveCA9IG5ldyBTZWFyY2hDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQm94OyIsImRlY2xhcmUgdmFyIFNjcm9sbE1hZ2ljOiBhbnk7XG5jb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIERlc2NPZmZzZXRBbmltYXRpb24ge1xuICAkdGhpczogSlF1ZXJ5O1xuICBpc19kZXNjX2FuaW1hdGluZzogYm9vbGVhbjtcbiAgY29udHJvbGxlcjogYW55O1xuICBzY2VuZTogYW55O1xuICBzY2VuZTI6IGFueTtcblxuICBjb25zdHJ1Y3RvciggZWwgKSB7XG4gICAgdGhpcy4kdGhpcyA9ICQoZWwpO1xuICB9XG5cbiAgY2hlY2tTaXplKCkge1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy50YWJsZXQgKSB7XG5cbiAgICAgIC8vIEVuYWJsZSBBbmltYXRpb25cbiAgICAgIGlmICggdGhpcy5pc19kZXNjX2FuaW1hdGluZyA9PT0gZmFsc2UgKSB7XG5cbiAgICAgICAgdGhpcy5pc19kZXNjX2FuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZGVzY19vX2FuaW1hdGUoKTtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIC8vIGRpc2FibGUgYW5pbWF0aW9uXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLnRhYmxldCApIHtcblxuICAgICAgdGhpcy5pc19kZXNjX2FuaW1hdGluZyA9IGZhbHNlO1xuXG4gICAgICBpZiAoIHR5cGVvZiB0aGlzLnNjZW5lID09PSBcIm9iamVjdFwiICkge1xuXG4gICAgICAgIHRoaXMuc2NlbmUuZGVzdHJveSh0cnVlKTtcbiAgICAgICAgdGhpcy5zY2VuZTIuZGVzdHJveSh0cnVlKTtcblxuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgZGVzY19vX2FuaW1hdGUoKSB7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLnRhYmxldCApIHtcblxuICAgICAgdGhpcy5pc19kZXNjX2FuaW1hdGluZyA9IHRydWU7XG5cbiAgICAgIC8vIG5ldyB0aW1lbGluZSBldmVudFxuICAgICAgbGV0IHdpcGVBbmltYXRpb24gPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuICAgICAgLy8gSW1hZ2Ugb25lIHBsYWNlbWVudFxuICAgICAgd2lwZUFuaW1hdGlvbi5hZGQoW1xuICAgICAgICBUd2Vlbk1heC5mcm9tVG8odGhpcy4kdGhpcy5maW5kKFwiLmRlc2Mtby1pbWFnZS0xXCIpLCAxLCB7IHlQZXJjZW50OiAwIH0sIHtcbiAgICAgICAgICB5UGVyY2VudDogLTIwLFxuICAgICAgICAgIGVhc2U6IFBvd2VyMC5lYXNlSW5PdXRcbiAgICAgICAgfSlcbiAgICAgIF0pO1xuXG4gICAgICAvLyBJbWFnZSAyIHBsYWNlbWVudFxuICAgICAgbGV0IHdpcGVBbmltYXRpb24yID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICB3aXBlQW5pbWF0aW9uMi5hZGQoW1xuICAgICAgICBUd2Vlbk1heC5mcm9tVG8odGhpcy4kdGhpcy5maW5kKFwiLmRlc2Mtby1pbWFnZS0yXCIpLCAxLCB7IHlQZXJjZW50OiAwLCB9LCB7XG4gICAgICAgICAgeVBlcmNlbnQ6IC0xMDUsXG4gICAgICAgICAgZWFzZTogUG93ZXIwLmVhc2VJbk91dFxuICAgICAgICB9KVxuICAgICAgXSk7XG5cblxuICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcblxuICAgICAgdGhpcy5zY2VuZSA9IG5ldyBTY3JvbGxNYWdpYy5TY2VuZShcbiAgICAgICAge1xuICAgICAgICAgIHRyaWdnZXJFbGVtZW50OiB0aGlzLiR0aGlzWzBdLFxuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLiR0aGlzLmhlaWdodCgpLFxuICAgICAgICAgIG9mZnNldDogLTEwMFxuICAgICAgICB9KVxuICAgICAgICAuc2V0VHdlZW4od2lwZUFuaW1hdGlvbilcbiAgICAgICAgLy8gLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBFbClcIiB9KSAvLyBhZGQgaW5kaWNhdG9ycyAocmVxdWlyZXMgcGx1Z2luKVxuICAgICAgICAuYWRkVG8odGhpcy5jb250cm9sbGVyKTtcblxuICAgICAgdGhpcy5zY2VuZTIgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICAgIHtcbiAgICAgICAgICB0cmlnZ2VyRWxlbWVudDogdGhpcy4kdGhpc1swXSxcbiAgICAgICAgICBkdXJhdGlvbjogdGhpcy4kdGhpcy5oZWlnaHQoKSArIDEwMCxcbiAgICAgICAgfSlcbiAgICAgICAgLnNldFR3ZWVuKHdpcGVBbmltYXRpb24yKVxuICAgICAgICAvLyAuYWRkSW5kaWNhdG9ycyh7IG5hbWU6IFwiMiAoZHVyYXRpb246IEVsKVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAgIC5hZGRUbyh0aGlzLmNvbnRyb2xsZXIpO1xuICAgIH1cblxuICB9XG5cbiAgaW5pdCgpIHtcblxuICAgIHRoaXMuZGVzY19vX2FuaW1hdGUoKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGVzY09mZnNldEFuaW1hdGlvbjsiLCJjb25zdCAkID0galF1ZXJ5O1xuZGVjbGFyZSB2YXIgSXNvdG9wZTogYW55O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNsYXNzIEdhbGxlcnlDb21wb25lbnQge1xuXG4gIGdyaWRJZDogc3RyaW5nO1xuICBnYWxsZXJ5X2dyaWQ6IG51bWJlcjtcbiAgZ2FsbGVyeV93cmFwcGVyX3dpZHRoOiBudW1iZXI7XG4gICRmdWxsR3JpZDogSlF1ZXJ5O1xuICAkaXNvdG9wZUdhbGxlcnk6IEpRdWVyeTtcbiAgJGdhbGxlcnlDb250YWluZXI6IEpRdWVyeTtcbiAgJGdhbGxlcnlJdGVtOiBKUXVlcnk7XG4gICRmaWx0ZXI6IEpRdWVyeTtcbiAgJGdyaWQ6IGFueTtcbiAgY3VycmVudEhlaWdodDogc3RyaW5nO1xuICBjdXJyZW50SGVpZ2h0UFg6IG51bWJlcjtcbiAgcmVJc29UaW1lT3V0OiBudW1iZXI7XG4gIGlzQ29udGFpbmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZ3JpZElkID0gJChcIi5pbm5lci1jb250ZW50LW1vZHVsZVwiKS5jaGlsZHJlbihcImRpdlwiKS5hdHRyKFwiaWRcIik7XG4gICAgdGhpcy4kZnVsbEdyaWQgPSAkKFwiI1wiICsgdGhpcy5ncmlkSWQpO1xuICAgIHRoaXMuJGdhbGxlcnlDb250YWluZXIgPSAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpO1xuICAgIHRoaXMuJGlzb3RvcGVHYWxsZXJ5ID0gJChcIi5nYWxsZXJ5LWlzb3RvcGVcIik7XG4gICAgdGhpcy4kZ2FsbGVyeUl0ZW0gPSAkKFwiLmdhbGxlcnktaXRlbVwiKTtcbiAgICB0aGlzLiRmaWx0ZXIgPSAkKFwiLmZpbHRlci1ncm91cFwiKTtcbiAgfVxuXG4gIHNldHVwSXNvdG9wZSgpIHtcbiAgICAvLyBpbml0IGlzb3RvcGVcbiAgICB0aGlzLiRncmlkID0gdGhpcy4kZnVsbEdyaWQuaXNvdG9wZSh7XG4gICAgICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gICAgICBpdGVtU2VsZWN0b3I6IFwiLmdhbGxlcnktaXRlbVwiLFxuICAgICAgaXNJbml0TGF5b3V0OiBmYWxzZSxcbiAgICAgIG1hc29ucnk6IHtcbiAgICAgICAgXCJjb2x1bW5XaWR0aFwiOiBcIi5ncmlkLXNpemVyXCJcbiAgICAgIH0sXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246IFwiLjNzXCJcbiAgICB9KTtcbiAgfVxuXG4gIGdhbGxlcnlJc290b3BlV3JhcHBlcigpIHtcbiAgICBsZXQgd2luZG93V2lkdGhSZWYgPSAkKHdpbmRvdykuaW5uZXJXaWR0aCgpOyAvLyBmb3Igc2Nyb2xsIGJhciBmaXggY3VycmVudGx5XG5cbiAgICAvLyBJcyBjb250YWluZXIgb3IgZnVsbCB3aWR0aD9cbiAgICBpZiAoIHRoaXMuJGdhbGxlcnlDb250YWluZXIuaGFzQ2xhc3MoXCJjb250YWluZXJcIikgKSB7XG4gICAgICB0aGlzLmlzQ29udGFpbmVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvL1xuICAgIGlmICggd2luZG93V2lkdGhSZWYgPiAxNjAwICYmIHRoaXMuaXNDb250YWluZWQgPT09IGZhbHNlICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA1O1xuICAgIH0gZWxzZSBpZiAoIHdpbmRvd1dpZHRoUmVmIDw9IDYwMCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMTtcbiAgICB9IGVsc2UgaWYgKCB3aW5kb3dXaWR0aFJlZiA8PSA5OTEgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDI7XG4gICAgfSBlbHNlIGlmICggd2luZG93V2lkdGhSZWYgPD0gMTE5OSApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYWxsZXJ5X2dyaWQgPSA0O1xuICAgIH1cblxuICAgIGlmICggJChcIi5nYWxsZXJ5LTMtZ3JpZFwiKS5sZW5ndGggPiAwICYmIHdpbmRvd1dpZHRoUmVmID4gMTI0OCApIHtcbiAgICAgIHRoaXMuZ2FsbGVyeV9ncmlkID0gMztcbiAgICB9XG5cbiAgICBpZiAoICQoXCIuZ2FsbGVyeS00LWdyaWRcIikubGVuZ3RoID4gMCAmJiB3aW5kb3dXaWR0aFJlZiA+IDE1ODQgKSB7XG4gICAgICB0aGlzLmdhbGxlcnlfZ3JpZCA9IDQ7XG4gICAgfVxuXG4gICAgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggPSAkKFwiLmdhbGxlcnktY29udGFpbmVyXCIpLndpZHRoKCk7XG5cbiAgICBpZiAoIHRoaXMuZ2FsbGVyeV93cmFwcGVyX3dpZHRoICUgdGhpcy5nYWxsZXJ5X2dyaWQgPiAwICkge1xuICAgICAgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGggPSB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCArICggdGhpcy5nYWxsZXJ5X2dyaWQgLSB0aGlzLmdhbGxlcnlfd3JhcHBlcl93aWR0aCAlIHRoaXMuZ2FsbGVyeV9ncmlkKTtcbiAgICB9XG4gICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkuY3NzKFwid2lkdGhcIiwgdGhpcy5nYWxsZXJ5X3dyYXBwZXJfd2lkdGgpO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeV9ncmlkO1xuICB9XG5cbiAgcmVsb2FkSXNvdG9wZSgpIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoKTtcbiAgICB0aGlzLnNldE1pbkhlaWdodCgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBjaGVjayBpZiBoZWlnaHQgaXMgYSByb3VuZCBudW1iZXIgdG8gZW5zdXJlIG5vIDFweCBpc3N1ZXNcbiAgICAgIHRoaXMuY2hlY2tDb250YWluZXJIZWlnaHQoKTtcbiAgICB9LCA3MDApO1xuICB9XG5cbiAgc2V0TWluSGVpZ2h0KCkge1xuXG4gICAgbGV0IGl0ZW0gPSAkKFwiLmdhbGxlcnktaXRlbS53aWR0aDFcIik7XG5cbiAgICAvLyBTZXQgbWluIGhlaWdodCBkZXBlbmRpbmcgb25lIHdoYXQgY29udGVudCB3YXMgZmlsdGVyZWRcbiAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBpdGVtLmNzcyhcInBhZGRpbmctYm90dG9tXCIpO1xuICAgIGxldCBoZWlnaHRTdHIgPSB0aGlzLmN1cnJlbnRIZWlnaHQudG9TdHJpbmcoKTtcbiAgICB0aGlzLmN1cnJlbnRIZWlnaHRQWCA9IHRoaXMucHhDb252ZXJ0KGhlaWdodFN0cik7XG5cbiAgICBpZiAoIHRoaXMuY3VycmVudEhlaWdodFBYICE9PSAwICkge1xuXG4gICAgICB0aGlzLiRpc290b3BlR2FsbGVyeS5jc3MoXCJtaW4taGVpZ2h0XCIsIE1hdGgucm91bmQodGhpcy5jdXJyZW50SGVpZ2h0UFgpKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIHRoaXMuY3VycmVudEhlaWdodFBYID0gaXRlbS5oZWlnaHQoKTtcblxuICAgICAgdGhpcy4kaXNvdG9wZUdhbGxlcnkuY3NzKFwibWluLWhlaWdodFwiLCBNYXRoLnJvdW5kKHRoaXMuY3VycmVudEhlaWdodFBYKSk7XG5cbiAgICB9XG4gIH1cblxuICBweENvbnZlcnQoIG9iamVjdEhlaWdodDogc3RyaW5nICkge1xuICAgIHJldHVybiBwYXJzZUludChvYmplY3RIZWlnaHQuc2xpY2UoMCwgLTIpKTtcbiAgfVxuXG4gIGFkZEltYWdlVHJhbnNpdGlvbigpIHtcbiAgICAvLyBhZGQgdHJhbnNpdGlvbiBmb3IgaW50cm8gYW5pbWF0aW9uXG4gICAgdGhpcy4kZ2FsbGVyeUl0ZW0uY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIjYwMG1zXCIpO1xuICB9XG5cbiAgbG9hZEltYWdlc0luKCkge1xuICAgIHRoaXMuJGdyaWQuaXNvdG9wZShcIm9uY2VcIiwgXCJhcnJhbmdlQ29tcGxldGVcIiwgKCkgPT4ge1xuXG4gICAgICAvLyBmYWRlIGluXG4gICAgICB0aGlzLiRnYWxsZXJ5SXRlbS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcblxuICAgICAgLy8gcmVtb3ZlIGFuaW1hdGlvbiBmb3Igc21vb3RoIGZpbHRlcmluZyBhZnRlciBpbWFnZXMgaGF2ZSBsb2FkZWQgaW5cbiAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgdGhpcy4kZ2FsbGVyeUl0ZW0uY3NzKFwidHJhbnNpdGlvbi1kdXJhdGlvblwiLCBcIjBtc1wiKTtcbiAgICAgIH0sIDUwMCk7XG5cbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrQ29udGFpbmVySGVpZ2h0KCkge1xuXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID09PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuJGlzb3RvcGVHYWxsZXJ5Lmhhc0NsYXNzKFwid2lkdGgtY29udGFpbmVkXCIpKSB7XG5cbiAgICAgIGxldCBjdXJyZW50SGVpZ2h0ID0gdGhpcy4kaXNvdG9wZUdhbGxlcnkuaGVpZ2h0KCk7XG5cbiAgICAgIHRoaXMuJGlzb3RvcGVHYWxsZXJ5LmNzcyhcImhlaWdodFwiLCBjdXJyZW50SGVpZ2h0IC0gMSArIFwicHhcIik7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uUmVzaXplKCkge1xuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVJc29UaW1lT3V0KTtcblxuICAgIC8vIGNoZWNrIGlmIHRoZSBjb250YWluZXIgaGFzIGl0ZW1zIGluc2lkZSBpdFxuICAgIGlmICggdGhpcy4kZ2FsbGVyeUNvbnRhaW5lci5sZW5ndGggPiAwICkge1xuXG4gICAgICBjb25zb2xlLmxvZyhcInJlc2l6ZSBldmVudFwiKTtcbiAgICAgIFxuICAgICAgLy8gc2V0IGdyaWQgZGltZW5zaW9uXG4gICAgICB0aGlzLmdhbGxlcnlJc290b3BlV3JhcHBlcigpO1xuXG4gICAgICAvLyBvbiByZXNpemUgY29tcGxldGUsIHJlLWFkanVzdCBncmlkXG4gICAgICB0aGlzLnJlSXNvVGltZU91dCA9IHNldFRpbWVvdXQodGhpcy5yZWxvYWRJc290b3BlLmJpbmQodGhpcyksIDUwMCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIG9uRmlsdGVyQ2xpY2soIGVsLCBlbDIgKSB7XG4gICAgbGV0ICR0aGlzID0gJChlbDIudG9FbGVtZW50KTtcblxuICAgICR0aGlzLnBhcmVudCgpLmNoaWxkcmVuKFwibGlcIikuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgfSk7XG5cbiAgICAkdGhpcy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgbGV0IGZpbHRlclZhbHVlID0gJHRoaXMuYXR0cihcImRhdGEtZmlsdGVyXCIpO1xuXG4gICAgdGhpcy5yZUZpbHRlcihmaWx0ZXJWYWx1ZSk7XG4gIH1cblxuICByZUZpbHRlciggaXRlbSApIHtcbiAgICB0aGlzLiRncmlkLmlzb3RvcGUoe1xuICAgICAgZmlsdGVyOiBpdGVtXG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiSXNvdG9wZSBJbml0XCIpO1xuXG4gICAgLy8gQWRkIHRyYW5zaXRpb24gdG8gYW5pbWF0ZSBpbWFnZSBpbiBncmFjZWZ1bGx5XG4gICAgdGhpcy5hZGRJbWFnZVRyYW5zaXRpb24oKTtcblxuICAgIC8vIFNldHVwIElzb3RvcGUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgdGhpcy5zZXR1cElzb3RvcGUoKTtcblxuICAgIC8vIENyZWF0ZSBwZXJmZWN0IGdyaWRcbiAgICB0aGlzLmdhbGxlcnlJc290b3BlV3JhcHBlcigpO1xuXG4gICAgLy8gZGVsYXkgaXNvdG9wZSBpbml0IHVzaW5nIGhlbHBlciBmdW5jdGlvbiB0aGF0IGZpcmVzIG9uIHJlc2l6ZVxuICAgIHNldFRpbWVvdXQodGhpcy5yZWxvYWRJc290b3BlLmJpbmQodGhpcyksIDEwMDApO1xuXG4gICAgLy8gQW5pbWF0ZSBJbWFnZXMgaW4gb25Mb2FkXG4gICAgdGhpcy5sb2FkSW1hZ2VzSW4oKTtcblxuICAgIC8vIEFkZCBmaWx0ZXIgb24gQ2xpY2tcbiAgICBsZXQgJHRoaXMgPSB0aGlzO1xuICAgIHRoaXMuJGZpbHRlci5vbihcImNsaWNrXCIsIFwibGlcIiwgdGhpcy5vbkZpbHRlckNsaWNrLmJpbmQodGhpcywgJHRoaXMpKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxubGV0IElzb3RvcGVHYWxsZXJ5ID0gbmV3IEdhbGxlcnlDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSXNvdG9wZUdhbGxlcnk7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTbGlkZXJDb21wb25lbnQge1xuICBnYWxsZXJ5OiBKUXVlcnk7XG4gIGNvbnRhaW5lcjogSlF1ZXJ5O1xuICBjbG9zZUJ0bjogSlF1ZXJ5O1xuICBuZXh0QnRuOiBKUXVlcnk7XG4gIHByZXZCdG46IEpRdWVyeTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgY3VycmVudFNsaWRlOiBudW1iZXI7XG4gIHRvdGFsU2xpZGU6IG51bWJlcjtcbiAgY291bnRUb3RhbDogSlF1ZXJ5O1xuICBjdXJyZW50Q291bnQ6IEpRdWVyeTtcbiAgc2xpZGVyT3BlbjogYm9vbGVhbjtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvciggZWwgKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKGVsKTtcbiAgICB0aGlzLmdhbGxlcnkgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmhlYWRlci1zbGlkZXItZ2FsbGVyeVwiKTtcbiAgICB0aGlzLmNsb3NlQnRuID0gdGhpcy5jb250YWluZXIuZmluZChcIi5oZWFkZXItc2xpZGVyLWNsb3NlXCIpO1xuICAgIHRoaXMubmV4dEJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2xpZGVyLW5hdmlnYXRpb24tbmV4dFwiKTtcbiAgICB0aGlzLnByZXZCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNsaWRlci1uYXZpZ2F0aW9uLXByZXZcIik7XG4gICAgdGhpcy5jb3VudFRvdGFsID0gdGhpcy5jb250YWluZXIuZmluZChcIi50b3RhbFwiKTtcbiAgICB0aGlzLmN1cnJlbnRDb3VudCA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuY3VycmVudFwiKTtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLmN1cnJlbnRTbGlkZSA9IHRoaXMuaW5kZXggKyAxO1xuICAgIHRoaXMuc2xpZGVyT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmdhbGxlcnkuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldFRvdGFsU2xpZGVzKCk6IG51bWJlciB7XG4gICAgbGV0IGNvdW50ID0gdGhpcy5nYWxsZXJ5LmNoaWxkcmVuKFwibGlcIikubGVuZ3RoO1xuICAgIHJldHVybiBjb3VudDtcbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNsaWRlO1xuICB9XG5cbiAgdXBkYXRlQ3VycmVudFNsaWRlKCBldmVudCApIHtcblxuICAgIGlmICggZXZlbnQgPT09IFwicmlnaHRcIiApIHtcbiAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5kZXgtLTtcbiAgICAgIHRoaXMuY3VycmVudFNsaWRlLS07XG4gICAgfVxuXG4gIH1cblxuICB1cGRhdGVOYXYoIGluZGV4OiBudW1iZXIsIHNlbGVjdGVkOiBKUXVlcnkgKSB7XG5cbiAgICAvLyB1cGRhdGUgbnVtYmVycyBvbiBzY3JlZW5cbiAgICB0aGlzLmN1cnJlbnRDb3VudC5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICAgIC8vIEVuYWJsZS9EaXNhYmxlIGFycm93IGJ0bnNcbiAgICB0aGlzLnByZXZCdG4ucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmZpcnN0LWNoaWxkXCIpKTtcbiAgICB0aGlzLm5leHRCdG4ucGFyZW50KFwibGlcIikudG9nZ2xlQ2xhc3MoXCJzbGlkZXItaGlkZGVuXCIsIHNlbGVjdGVkLmlzKFwiOmxhc3QtY2hpbGRcIikpO1xuICB9XG5cbiAgdXBkYXRlU2xpZGUoIGRpcmVjdGlvbiApIHtcblxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnRTbGlkZUVsZW1lbnQoKTtcblxuICAgIGlmICggZGlyZWN0aW9uID09PSBcInJpZ2h0XCIgKSB7XG4gICAgICAvLyByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGNsYXNzLCB0aGVuIG1vdmUgbGVmdFxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIikuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgY3VycmVudFNsaWRlLm5leHQoKS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGNsYXNzLCB0aGVuIG1vdmUgbGVmdFxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBjdXJyZW50U2xpZGUucHJldigpLmFkZENsYXNzKFwic2VsZWN0ZWRcIikucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBpbmRleFxuICAgIHRoaXMudXBkYXRlQ3VycmVudFNsaWRlKGRpcmVjdGlvbik7XG5cbiAgICAvLyB1cGRhdGUgTmF2aWdhdGlvblxuICAgIHRoaXMudXBkYXRlTmF2KHRoaXMuaW5kZXgsIHRoaXMuZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpKTtcbiAgfVxuXG4gIGFycm93SGFuZGxlciggZXZlbnQgKSB7XG5cbiAgICAvLyBjaGVjayB3aGljaCBrZXkgd2FzIHByZXNzZWQgYW5kIG1ha2Ugc3VyZSB0aGUgc2xpZGUgaXNuJ3QgdGhlIGJlZ2lubmluZyBvciB0aGUgbGFzdCBvbmVcbiAgICBpZiAoIGV2ZW50LmRhdGEua2V5cyA9PT0gXCJyaWdodFwiICYmIHRoaXMuY3VycmVudFNsaWRlICE9PSB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG5cbiAgICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICYmIHRoaXMuc2xpZGVyT3BlbiApIHtcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA8PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwibGVmdFwiICYmIHRoaXMuY3VycmVudFNsaWRlICE9PSAxICkge1xuXG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCAmJiB0aGlzLnNsaWRlck9wZW4gKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGUoXCJsZWZ0XCIpO1xuICAgICAgfSBlbHNlIGlmICggVXRpbHMuYnJlYWtwb2ludCA8PSBVdGlscy5icHMudGFibGV0ICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIH1cblxuICAgIH1cblxuICB9XG5cbiAgb3BlblNsaWRlciggZWwsIGV2ZW50ICkge1xuICAgIC8vIGVsID0gdGhpc1xuICAgIC8vIGVsMiBpcyBldmVudFxuICAgIGlmICggIXRoaXMuY29udGFpbmVyLmhhc0NsYXNzKFwiaXMtYWN0aXZlXCIpICYmICQoZXZlbnQuY3VycmVudFRhcmdldCkuaXModGhpcy5nYWxsZXJ5KSApIHtcblxuICAgICAgdGhpcy5zbGlkZXJPcGVuID0gdHJ1ZTtcblxuICAgICAgdGhpcy5jb250YWluZXJcbiAgICAgICAgLmFkZENsYXNzKFwiaXMtYWN0aXZlXCIpXG4gICAgICAgIC5vbmUoXG4gICAgICAgICAgXCJ3ZWJraXRUcmFuc2l0aW9uRW5kIFwiICtcbiAgICAgICAgICBcIm90cmFuc2l0aW9uZW5kIFwiICtcbiAgICAgICAgICBcIm9UcmFuc2l0aW9uRW5kIFwiICtcbiAgICAgICAgICBcIm1zVHJhbnNpdGlvbkVuZCBcIiArXG4gICAgICAgICAgXCJ0cmFuc2l0aW9uZW5kXCIsICgpID0+IHtcblxuICAgICAgICAgICQoXCJib2R5LGh0bWxcIilcbiAgICAgICAgICAgIC5hbmltYXRlKHsgXCJzY3JvbGxUb3BcIjogdGhpcy5jb250YWluZXIub2Zmc2V0KCkudG9wIH0sIDIwMCk7XG5cbiAgICAgICAgICAvLyBDbG9zZSBCdG4gYW5pbWF0ZSBpblxuICAgICAgICAgIGxldCBjbG9zZUJ0bkFuaW1hdGlvbiA9IFR3ZWVuTWF4LnRvKHRoaXMuY2xvc2VCdG4sIC4zLCB7XG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgIHg6IC0zMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgICAgICAgIGRlbGF5OiAuM1xuICAgICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVNsaWRlciggZSApIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2xhc3MoXCJpcy1hY3RpdmVcIik7XG5cbiAgICB0aGlzLnNsaWRlck9wZW4gPSBmYWxzZTtcblxuICAgIFR3ZWVuTGl0ZVxuICAgICAgLnRvKCQod2luZG93KSwgLjUsXG4gICAgICAgIHtcbiAgICAgICAgICBzY3JvbGxUbzogeyB5OiAwIH0sIGVhc2U6IFBvd2VyMi5lYXNlT3V0LFxuICAgICAgICAgIGRlbGF5OiAuNVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgbGV0IGNsb3NlQnRuQW5pbWF0aW9uID0gVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB6OiAuMDAxLFxuICAgICAgZWFzZTogQ3ViaWMuZWFzZU91dCxcbiAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgVHdlZW5NYXgudG8odGhpcy5jbG9zZUJ0biwgLjMsIHtcbiAgICAgICAgICByaWdodDogNTBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIGxldCAkdGhpcyA9IHRoaXM7XG4gICAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgICAgdGhpcy5nYWxsZXJ5Lm9uKFwiY2xpY2tcIiwgdGhpcy5vcGVuU2xpZGVyLmJpbmQodGhpcywgJHRoaXMpKTtcbiAgICAgICAgdGhpcy5jbG9zZUJ0bi5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdhbGxlcnkub2ZmKCk7XG4gICAgICAgIHRoaXMuY2xvc2VCdG4ub2ZmKCk7XG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgLy8gQ3JlYXRlIEJpbmRpbmcgRXZlbnRzXG4gICAgdGhpcy5jaGVja1NpemUoKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIExlZnQgYW5kIHJpZ2h0IGV2ZW50c1xuICAgIHRoaXMubmV4dEJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJyaWdodFwiIH0sIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIHRoaXMucHJldkJ0bi5vbihcImNsaWNrXCIsIHsga2V5czogXCJsZWZ0XCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICAvLyBKcXVlcnkga2V5cyBwbHVnaW5cbiAgICAkKGRvY3VtZW50KVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwibGVmdFwiLCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKVxuICAgICAgLmJpbmQoXCJrZXlkb3duXCIsIFwiZXNjXCIsIHRoaXMuY2xvc2VTbGlkZXIuYmluZCh0aGlzKSlcbiAgICAgIC5iaW5kKFwia2V5ZG93blwiLCBcInJpZ2h0XCIsIHRoaXMuYXJyb3dIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgLy8gdXBkYXRlIG5hdiBvbiBmaXJzdCBsb2FkXG4gICAgdGhpcy51cGRhdGVOYXYodGhpcy5pbmRleCwgdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRUb3RhbFNsaWRlcygpKSk7XG4gIH1cbn1cblxuLy8gbG9vcCB0aHJvdWdoIGVhY2ggaGVhZGVyIHNsaWRlciBvYmplY3Qgb24gdGhlIHBhZ2VcbmNsYXNzIEhlYWRlclNsaWRlckNvbXBvbmVudCB7XG5cbiAgaXRlbUluZm9XcmFwcGVyOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIgPSAkKFwiLmhlYWRlci1zbGlkZXItY29udGFpbmVyXCIpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkhlYWRlciBTbGlkZXIgaW5pdFwiKTtcblxuICAgIHRoaXMuaXRlbUluZm9XcmFwcGVyLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG5cbiAgICAgIC8vIFBhc3MgXCJ0aGlzXCIgdG8gZWFjaCBuZXcgSGVhZGVyIHNsaWRlciBjb21wb25lbnRcbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2xpZGVyQ29tcG9uZW50KGVsKTtcbiAgICAgIHNsaWRlci5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxufVxuXG5sZXQgSGVhZGVyU2xpZGVyID0gbmV3IEhlYWRlclNsaWRlckNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXJTbGlkZXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5cbmNsYXNzIFN2Z0hlYWRlckNvbXBvbmVudCB7XG4gIHN2ZzogSlF1ZXJ5O1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgd2luZG93OiBKUXVlcnk7XG4gIHdpbldpZHRoOiBudW1iZXI7XG4gIHByb3BvcnRpb246IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnN2ZyA9ICQoXCIuZGl2aWRlci1zdmdcIik7XG4gICAgdGhpcy53aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy5wcm9wb3J0aW9uID0gMTg7XG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpbldpZHRoIC8gdGhpcy5wcm9wb3J0aW9uO1xuICB9XG5cbiAgX3NldFdpbmRvd1dpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuICQod2luZG93KS53aWR0aCgpO1xuICB9XG5cbiAgX3NldFN2Z0hlaWdodCgpOiBudW1iZXIge1xuICAgIGxldCBoZWlnaHQgPSB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpIC8gMTg7XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgcmVzaXplU3ZnKCkge1xuXG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMuX3NldFdpbmRvd1dpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLl9zZXRTdmdIZWlnaHQoKTtcblxuICAgIC8vIHNldCB3aWR0aCBvZiBpdGVtXG4gICAgLy8gdGhpcy5zdmcuYXR0cihcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuICAgIHRoaXMuc3ZnLmNzcyhcIndpZHRoXCIsIHRoaXMud2luV2lkdGgpO1xuXG4gICAgLy8gc2V0IGhlaWdodCBwcm9wb3J0aW9uIG9mIDI4XG4gICAgdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5zdmcuaGVpZ2h0KHRoaXMuaGVpZ2h0KTtcbiAgfVxuXG4gIGFuaW1hdGVJbigpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkFuaW1hdGUgSW5cIik7XG5cbiAgICB0aGlzLnN2ZyA9ICQoXCIuZGl2aWRlci1zdmdcIik7XG4gICAgdGhpcy5wcm9wb3J0aW9uID0gMTg7XG4gICAgdGhpcy53aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgdGhpcy53aW5XaWR0aCA9IHRoaXMud2luZG93LndpZHRoKCk7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndpbldpZHRoIC8gdGhpcy5wcm9wb3J0aW9uO1xuXG4gICAgLy8gc2V0IHdpZHRoIG9mIGl0ZW1cbiAgICB0aGlzLnN2Zy5hdHRyKFwid2lkdGhcIiwgdGhpcy53aW5XaWR0aCk7XG5cbiAgICAvLyBzZXQgaGVpZ2h0IHByb3BvcnRpb24gb2YgMjhcbiAgICB0aGlzLnN2Zy5hdHRyKFwiaGVpZ2h0XCIsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLnN2Zy5oZWlnaHQodGhpcy5oZWlnaHQpO1xuXG4gICAgVHdlZW5MaXRlLnRvKHRoaXMuc3ZnLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBib3R0b206IFwiLTNweFwiLFxuICAgIH0pO1xuICB9XG5cbiAgbG9hZERpdmlkZXIoKSB7XG4gICAgbGV0IHkgPSBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLnRhYmxldCA/IDAgOiA1MDtcbiAgICBUd2VlbkxpdGUudG8odGhpcy5zdmcsIC4xLCB7XG4gICAgICB5OiB5LFxuICAgICAgejogXCIuMDAxXCIsXG4gICAgICB3aWR0aDogdGhpcy5fc2V0V2luZG93V2lkdGgoKSxcbiAgICAgIGhlaWdodDogdGhpcy5fc2V0U3ZnSGVpZ2h0KCksXG4gICAgICBkZWxheTogMCxcbiAgICAgIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCIsXG4gICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3ZnLnBhcmVudChcImRpdlwiKS5jc3MoXCJvcGFjaXR5XCIsIDEpO1xuICAgICAgICB0aGlzLnN2Zy5hZGRDbGFzcyhcIm0tcGFnZSBzY2VuZV9lbGVtZW50IHNjZW5lX2VsZW1lbnQtLWZhZGVpbnVwRGl2aWRlclwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coXCJTdmcgaGVhZGVyIGxvYWRlZFwiKTtcblxuICAgIC8vIHRoaXMuc3ZnLmhlaWdodCh0aGlzLl9zZXRTdmdIZWlnaHQoKSk7XG4gICAgLy8gdGhpcy5zdmcuYXR0cihcImhlaWdodFwiLCB0aGlzLl9zZXRTdmdIZWlnaHQoKSk7XG5cbiAgICB0aGlzLmxvYWREaXZpZGVyKCk7XG5cblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZVN2Zy5iaW5kKHRoaXMpKS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBTdmdIZWFkZXIgPSBuZXcgU3ZnSGVhZGVyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN2Z0hlYWRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuLy8gVE9ETzogU2lkZWJhciBpbWFnZSBsb2FkaW5nXG5jbGFzcyBJbWFnZUxvYWRlckNvbXBvbmVudCB7XG4gIGFycjogc3RyaW5nW107XG4gIGJvZHk6IEpRdWVyeTtcbiAgY29udGVudDogSlF1ZXJ5O1xuICBoZXJvOiBKUXVlcnk7XG4gIGhhc0hlcm86IG51bWJlcjtcbiAgYmdJbWFnZTogSlF1ZXJ5O1xuICBoYXNCZ0ltYWdlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hcnIgPSBbXTtcbiAgICB0aGlzLmJvZHkgPSAkKFwiYm9keVwiKTtcbiAgICB0aGlzLmNvbnRlbnQgPSAkKFwiI2NvbnRlbnRcIik7XG4gICAgdGhpcy5oZXJvID0gJChcIi5oZXJvXCIpO1xuICAgIHRoaXMuaGFzSGVybyA9IHRoaXMuaGVyby5sZW5ndGg7XG4gICAgdGhpcy5iZ0ltYWdlID0gJChcIi5pbWctbG9hZGVyLWJnXCIpO1xuICAgIHRoaXMuaGFzQmdJbWFnZSA9IHRoaXMuYmdJbWFnZS5sZW5ndGg7XG4gIH1cblxuICBhbmltYXRlQmxvZ1ByaW1hcnkoKTogdm9pZCB7XG4gICAgbGV0IGJsb2dQcmltYXJ5ID0gJChcIi5wcmltYXJ5XCIpO1xuICAgIGxldCBibG9nQmdJbWFnZSA9IGJsb2dQcmltYXJ5LmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIik7XG5cbiAgICBpZiAoIGJsb2dCZ0ltYWdlICE9PSBcIm5vbmVcIiApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIFR3ZWVuTGl0ZVxuICAgICAgICAgIC50byhibG9nUHJpbWFyeSwgLjMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICB9LCAzMDApO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZVxuICAvLyBhbmltYXRlSGVyb0hlYWRlcigpOiB2b2lkIHtcbiAgLy8gICBsZXQgYiA9IHRoaXMuaGVyby5maW5kKFwiLmhlcm8tYmFja2dyb3VuZFwiKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuICAvL1xuICAvLyAgIGlmICggYiAhPT0gXCJub25lXCIgKSB7XG4gIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgLy9cbiAgLy8gICAgICAgdGhpcy5oZXJvLmFkZENsYXNzKFwibG9hZGVkXCIpO1xuICAvL1xuICAvLyAgICAgICBUd2VlbkxpdGVcbiAgLy8gICAgICAgICAudG8odGhpcy5oZXJvLCAuNCxcbiAgLy8gICAgICAgICAgIHtcbiAgLy8gICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgLy8gICAgICAgICAgIH1cbiAgLy8gICAgICAgICApO1xuICAvLyAgICAgfSwgMzAwKTtcbiAgLy8gICB9IGVsc2Uge1xuICAvL1xuICAvLyAgICAgdGhpcy5oZXJvLmFkZENsYXNzKFwibG9hZGVkXCIpO1xuICAvL1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGFuaW1hdGVCbG9nQXJ0aWNsZXMoKTogdm9pZCB7XG4gICAgbGV0IGFuaW1hdGUgPSBuZXcgVGltZWxpbmVNYXgoKTtcblxuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuYXJyLmxlbmd0aDsgaSsrICkge1xuICAgICAgYW5pbWF0ZS50byh0aGlzLmFyclsgaSBdLCAwLjEsIHsgb3BhY2l0eTogXCIxXCIsIGVhc2U6IFwiTGluZWFyLmVhc2VOb25lXCIgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJlbG9hZEltYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmFyciA9IFtdO1xuXG4gICAgdGhpcy5jb250ZW50LmltYWdlc0xvYWRlZCh7IGJhY2tncm91bmQ6IHRydWUgfSwgKCkgPT4ge1xuXG4gICAgICAgIC8vIEJsb2cgcHJpbWFyeSBhcnRpY2xlXG4gICAgICAgIHRoaXMuYm9keS5oYXNDbGFzcyhcImJsb2dcIikgPyB0aGlzLmFuaW1hdGVCbG9nUHJpbWFyeSgpIDogXCJcIjtcblxuICAgICAgICAvLyBIZXJvIGhlYWRlciBpbnRyb1xuICAgICAgICAvLyB0aGlzLmhhc0hlcm8gPiAwID8gdGhpcy5hbmltYXRlSGVyb0hlYWRlcigpIDogXCJcIjtcbiAgICAgICAgdGhpcy5oYXNCZ0ltYWdlID4gMCA/IHRoaXMuYmdJbWFnZS5hZGRDbGFzcyhcImxvYWRlZFwiKSA6IFwiXCI7XG5cbiAgICAgIH0pXG4gICAgICAuYWx3YXlzKGZ1bmN0aW9uICggaW5zdGFuY2UgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBsb2FkZWRcIik7XG4gICAgICB9KVxuICAgICAgLmRvbmUoKCBpbnN0YW5jZSApID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhbGwgaW1hZ2VzIHN1Y2Nlc3NmdWxseSBsb2FkZWRcIik7XG5cbiAgICAgICAgLy8gQW5pbWF0aW9uIGZvciBCbG9nIGluZGV4IGhvbWVwYWdlXG4gICAgICAgIHRoaXMuYW5pbWF0ZUJsb2dBcnRpY2xlcygpO1xuICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKFwiaW1nTG9hZGVkXCIpO1xuICAgICAgICBcbiAgICAgICAgLy8gRXhhbXBsZSBvbiBob3cgdG8gdHJpZ2dlciBldmVudHMgZWxzZXdoZXJlXG4gICAgICAgIC8vICQoZG9jdW1lbnQpLm9uKFwiaW1nTG9hZGVkXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAvLyAgIGNvbnNvbGUubG9nKFwiaW1hZ2UgbG9hZGVkIGN1c3RvbSBldmVudFwiKTtcbiAgICAgICAgLy8gfSk7XG5cbiAgICAgIH0pXG4gICAgICAuZmFpbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWxsIGltYWdlcyBsb2FkZWQsIGF0IGxlYXN0IG9uZSBpcyBicm9rZW5cIik7XG4gICAgICB9KVxuICAgICAgLnByb2dyZXNzKCggaW5zdGFuY2UsIGltYWdlICkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhpbWFnZSk7XG4gICAgICAgIGxldCByZXN1bHQgPSBpbWFnZS5pc0xvYWRlZCA/IFwibG9hZGVkXCIgOiBcImJyb2tlblwiO1xuXG4gICAgICAgIGlmICggcmVzdWx0ICkge1xuICAgICAgICAgIHRoaXMuYXJyLnB1c2goaW1hZ2UuaW1nKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImltYWdlIGlzIFwiICsgcmVzdWx0ICsgXCIgZm9yIFwiICsgaW1hZ2UuaW1nLnNyYyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG5cbiAgICBjb25zb2xlLmxvZyhcIkltYWdlIFByZWxvYWRlciBNb2R1bGVcIik7XG5cbiAgICB0aGlzLnByZWxvYWRJbWFnZXMoKTtcbiAgfVxufVxuXG5sZXQgSW1hZ2VMb2FkZXIgPSBuZXcgSW1hZ2VMb2FkZXJDb21wb25lbnQoKTtcblxuZXhwb3J0IGRlZmF1bHQgSW1hZ2VMb2FkZXI7IiwiZGVjbGFyZSB2YXIgU2Nyb2xsTWFnaWM6IGFueTtcbmNvbnN0ICQgPSBqUXVlcnk7XG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBEZXNjT2Zmc2V0QW5pbWF0aW9uIGZyb20gXCIuL2Rlc2Mtby1hbmltYXRpb25cIjtcblxuY2xhc3MgQW5pbWF0aW9uQ29tcG9uZW50IHtcblxuICBjb250YWluZXI6IEpRdWVyeTtcbiAgaXRlbTogSlF1ZXJ5O1xuICBtU2NlbmU6IEpRdWVyeTtcbiAgc2VydmljZVNpZGVCYXI6IEpRdWVyeTtcbiAgZGVzY09mZnNldDogSlF1ZXJ5O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gJChcIi5wcm9jZXNzLWNvbnRhaW5lclwiKTtcbiAgICB0aGlzLml0ZW0gPSAkKFwiLnByb2Nlc3MtaXRlbS1jb250YWluZXJcIik7XG4gICAgdGhpcy5tU2NlbmUgPSAkKFwiLm0tc2NlbmVcIik7XG4gICAgdGhpcy5zZXJ2aWNlU2lkZUJhciA9ICQoXCIuc2VydmljZS1zaWRlYmFyLXdyYXBwZXJcIik7XG4gICAgdGhpcy5kZXNjT2Zmc2V0ID0gJChcIi5kZXNjLW8tYW5pbWF0ZVwiKTtcbiAgfVxuXG4gIHByb2Nlc3NBbmltYXRlSW4oKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgIGxldCBpdGVtID0gdGhpcy5pdGVtO1xuICAgIGxldCBjb250cm9sbGVyID0gbmV3IFNjcm9sbE1hZ2ljLkNvbnRyb2xsZXIoKTtcbiAgICBsZXQgc2NlbmUgPSBuZXcgU2Nyb2xsTWFnaWMuU2NlbmUoXG4gICAgICB7XG4gICAgICAgIHRyaWdnZXJFbGVtZW50OiBcIi5wcm9jZXNzLWNvbnRhaW5lclwiLFxuICAgICAgICBkdXJhdGlvbjogY29udGFpbmVyLmhlaWdodCgpLFxuICAgICAgICBvZmZzZXQ6IC0yNTAsXG4gICAgICB9KVxuICAgICAgLm9uKFwiZW50ZXJcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpdGVtLmZpbmQoXCIucHJvY2Vzcy1pdGVtLWlubmVyXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICAgIGNvbnRhaW5lci5maW5kKFwiaW1nXCIpLmFkZENsYXNzKFwiaW5cIik7XG4gICAgICB9KVxuICAgICAgLy8gLmFkZEluZGljYXRvcnMoeyBuYW1lOiBcIjEgKGR1cmF0aW9uOiBvZmZzZXQ/KVwiIH0pIC8vIGFkZCBpbmRpY2F0b3JzIChyZXF1aXJlcyBwbHVnaW4pXG4gICAgICAuYWRkVG8oY29udHJvbGxlcik7XG4gIH1cblxuICBhbmltYXRlV2luZG93VG9wKCkge1xuICAgIGNvbnNvbGUubG9nKFwiYW5pbWF0ZSBUb3BcIik7XG4gICAgVHdlZW5MaXRlXG4gICAgICAudG8oJCh3aW5kb3cpLCAuMyxcbiAgICAgICAge1xuICAgICAgICAgIHNjcm9sbFRvOiB7XG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlYXNlOiBQb3dlcjIuZWFzZU91dFxuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cbiAgYW5pbWF0ZVNlcnZpY2VTaWRlYmFyT3V0KCkge1xuXG4gICAgaWYgKCB0aGlzLnNlcnZpY2VTaWRlQmFyLmxlbmd0aCA+IDAgKSB7XG5cbiAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLnNlcnZpY2VTaWRlQmFyLCAuMywge1xuICAgICAgICB4OiBcIi0xMDBcIixcbiAgICAgICAgejogXCIuMDAxXCIsXG4gICAgICAgIGRlbGF5OiAwLFxuICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICBlYXNlOiBcIkxpbmVhci5lYXNlTm9uZVwiLFxuICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHNpZGViYXIgaHRtbCBlbGVtZW50IHNvIGl0IGRvZXNudCBzaG93IHVwIGFnYWluIHdoZW4gc2Nyb2xsaW5nIHVwXG4gICAgICAgICAgdGhpcy5zZXJ2aWNlU2lkZUJhci5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBUd2VlbkxpdGUudG8oJChcIi5zZXJ2aWNlLXNpZGViYXItbm9zdGlja1wiKSwgLjMsIHtcbiAgICAgICAgeDogXCItMTAwXCIsXG4gICAgICAgIHo6IFwiLjAwMVwiLFxuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgZWFzZTogXCJMaW5lYXIuZWFzZU5vbmVcIixcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIC8vIHJlbW92ZSBzaWRlYmFyIGh0bWwgZWxlbWVudCBzbyBpdCBkb2VzbnQgc2hvdyB1cCBhZ2FpbiB3aGVuIHNjcm9sbGluZyB1cFxuICAgICAgICAgIHRoaXMuc2VydmljZVNpZGVCYXIucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gIH1cblxuICBsb2FkVXJsKCB1cmwgKSB7XG4gICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgfVxuXG4gIG1haW5Db250ZW50QW5pbWF0aW9uT3V0KCBjYWxsYmFjayApIHtcblxuICAgIC8vIExvYWQgaW4gYW5pbWF0aW9ucyBoZXJlXG4gICAgdGhpcy5hbmltYXRlU2VydmljZVNpZGViYXJPdXQoKTtcblxuXG4gICAgdGhpcy5tU2NlbmUuYWRkQ2xhc3MoXCJpcy1leGl0aW5nXCIpXG4gICAgICAvLyBJZiBoYXMgd2Via2l0QW5pbWF0aW9uRW5kIC0gaXQgZ2V0cyBjYWxsZWQgdHdpY2VcbiAgICAgIC5vbmUoXCJvYW5pbWF0aW9uZW5kIG1zQW5pbWF0aW9uRW5kIGFuaW1hdGlvbmVuZFwiLCAoKSA9PiB7XG5cbiAgICAgICAgLy8gTG9hZCBpbiBhbmltYXRpb25zIGhlcmUgdGhhdCBuZWVkIHRvIG9jY3VyIGFmdGVyIG1haW4gb25lc1xuICAgICAgICB0aGlzLmFuaW1hdGVXaW5kb3dUb3AoKTtcblxuICAgICAgfSk7XG5cbiAgICBpZiAoIHR5cGVvZihjYWxsYmFjaykgPT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gIH1cblxuICBjaGVja1VybCggdXJsICk6IGJvb2xlYW4ge1xuICAgIGlmICggdXJsLm1hdGNoKC9eIy8pICE9PSBudWxsIHx8IHVybCA9PT0gXCJcIiApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgZ2xvYmFsQ2xpY2tDaGVjayggZXZlbnQ/ICkge1xuXG4gICAgLy8gR2V0IHVybCBmcm9tIHRoZSBhIHRhZ1xuICAgIGxldCBuZXdVcmwgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJocmVmXCIpO1xuICAgIGxldCBoYXNDaGlsZHJlbiA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50KFwibGlcIikuaGFzQ2xhc3MoXCJtZW51LWl0ZW0taGFzLWNoaWxkcmVuXCIpO1xuXG4gICAgLypcbiAgICAgKiBGaXJzdCBWYWxpZGF0aW9uOiBJcyB0aGUgdXJsIHZhbGlkXG4gICAgICovXG4gICAgaWYgKCAhdGhpcy5jaGVja1VybChuZXdVcmwpICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIElmIGZpcnN0IHZhbGlkYXRpb24gZmFpbHMsIHRoZSB1cmwgaXMgcmVhbCBhbmQgY29udGludWUgdmFsaWRhdGluZ1xuICAgICAqL1xuICAgIC8qXG4gICAgICogQ2hlY2sgaWYgaXRzIGhvcml6b250YWwgdGFibGV0XG4gICAgICovXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCAmJlxuICAgICAgdGhpcy5jaGVja1VybChuZXdVcmwpICYmXG4gICAgICBVdGlscy5icm93c2VyID09PSBcImlwYWRcIiAmJiBoYXNDaGlsZHJlbiApIHtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdUYWJsZXQgTmF2IGNsaWNrJyk7XG4gICAgICByZXR1cm47XG5cbiAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50ID4gVXRpbHMuYnBzLnRhYmxldCAmJiB0aGlzLmNoZWNrVXJsKG5ld1VybCkgKSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBDaGVjayBpZiBpdHMgbGFyZ2VyIHRoYW4gdGFibGV0IGJ1dCBub3QgYW4gaXBhZFxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibGFwdG9wIG9yIGxhcmdlclwiKTtcbiAgICAgIHRoaXMubWFpbkNvbnRlbnRBbmltYXRpb25PdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmICggdGhpcy5jaGVja1VybChuZXdVcmwpICYmIGhhc0NoaWxkcmVuICkge1xuXG4gICAgICAvKlxuICAgICAgICogQ2hlY2sgaWYgaXRzIG1vYmlsZSBuYXYgbWVudSB0aGF0IGhhcyBjaGlsZHJlblxuICAgICAgICovXG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKFwibW9iaWxlIG1lbnUgaXMgYWN0aXZlIGFuZCBwYXJlbnQgY2xpY2tlZFwiKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogUGFzc2VkIHRoZSBjaGVja3MgTG9hZCBpdCFcbiAgICAgICAqL1xuXG4gICAgICB0aGlzLmxvYWRVcmwobmV3VXJsKTtcbiAgICB9XG5cbiAgfVxuXG4gIGRlc2NPZmZzZXRDaGVjaygpIHtcbiAgICBpZiAoIHRoaXMuZGVzY09mZnNldC5sZW5ndGggPiAwICkge1xuICAgICAgdGhpcy5hZGREZXNjT2Zmc2V0TW9kdWxlKCk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGVzY09mZnNldE1vZHVsZSgpIHtcbiAgICB0aGlzLmRlc2NPZmZzZXQuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgLy8gUGFzcyBcInRoaXNcIiB0byBlYWNoIG5ldyBIZWFkZXIgc2xpZGVyIGNvbXBvbmVudFxuICAgICAgbGV0IGFuaW1hdGlvbiA9IG5ldyBEZXNjT2Zmc2V0QW5pbWF0aW9uKGVsKTtcbiAgICAgIGFuaW1hdGlvbi5pbml0KCk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMucHJvY2Vzc0FuaW1hdGVJbigpO1xuICAgIC8vIHRoaXMuZGVzY19vX2FuaW1hdGUoKTtcblxuICAgIC8vIENsaWNrIGV2ZW50IHRvIGNvbnRyb2wgd2luZG93IExvYWRpbmdcbiAgICAkKFwiYVwiKS5vbihcImNsaWNrXCIsICggZSApID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuZ2xvYmFsQ2xpY2tDaGVjayhlKTtcbiAgICB9KTtcblxuICAgIC8vIENoZWNrIGZvciBWQyBncmlkIGxpbmtcbiAgICBpZiAoICQoXCIudmNfZ3JpZC1jb250YWluZXJcIikubGVuZ3RoID4gMCApIHtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICQoXCIudmNfZ3JpZC1jb250YWluZXJcIikuZmluZChcImFcIikuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcbiAgICAgICAgICAkKGVsKS5vbihcImNsaWNrXCIsICggZSApID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuZ2xvYmFsQ2xpY2tDaGVjayhlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0sIDIwMDApO1xuICAgIH1cblxuICAgIHRoaXMuZGVzY09mZnNldENoZWNrKCk7XG5cbiAgICAvLyBTUEVDSUFMIFRBQkxFUyBBREQgQ0xBU1NcbiAgICBpZiAoICQoXCIuZGF0YVRhYmxlc193cmFwcGVyXCIpLmxlbmd0aCA+IDAgKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImFkZCBkYXRhIHRhYmxlIGNsYXNzXCIpO1xuICAgICAgbGV0IGVsID0gJChcIi5kYXRhVGFibGVzX3dyYXBwZXJcIik7XG5cbiAgICAgIGVsLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICAgICQoZWwpLmFkZENsYXNzKFwidGFibGUtcmVzcG9uc2l2ZVwiKTtcbiAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLy8gJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMuY2hlY2tTaXplLmJpbmQodGhpcykpO1xuXG4gICAgLy8gQ3VzdG9tIGV2ZW50IGV4YW1wbGVcbiAgICAvLyAkKGRvY3VtZW50KS5vbihcInRlc3RcIiwge30sICggZXZlbnQsIGFyZzEsIGFyZzIgKSA9PiB7XG4gICAgLy9cbiAgICAvLyAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+IFV0aWxzLmJwcy50YWJsZXQgKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAvLyAgICAgY29uc29sZS5sb2coYXJnMSk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGFyZzIpO1xuICAgIC8vICAgfVxuICAgIC8vXG4gICAgLy8gfSkuYmluZCh0aGlzKTtcblxuICB9XG59XG5cbmxldCBBbmltYXRpb25Db250cm9sbGVyID0gbmV3IEFuaW1hdGlvbkNvbXBvbmVudCgpO1xuXG5leHBvcnQgZGVmYXVsdCBBbmltYXRpb25Db250cm9sbGVyO1xuXG4iLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cblxuaW50ZXJmYWNlIFF1b3RlU3RhdGVJbnRlcmZhY2Uge1xuICBzZWxlY3RlZDogc3RyaW5nO1xuICBpc0Zvcm1BY3RpdmU6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBRdW90ZVNlbGVjdGVkT2JqZWN0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgcHJpY2U6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgYnVsbGV0czogT2JqZWN0O1xuICBpbWdTcmM6IHN0cmluZztcbn1cblxuY2xhc3MgUXVvdGVDb21wb25lbnQge1xuXG4gIHNlbGVjdEJ0bjogSlF1ZXJ5O1xuICBzd2l0Y2hCdG46IEpRdWVyeTtcbiAgZm9ybUJ1aWxkZXI6IEpRdWVyeTtcbiAgcXVvdGVDaG9vc2VyOiBKUXVlcnk7XG4gIGlucHV0czogSlF1ZXJ5O1xuICBxdW90ZUl0ZW1zQXJyYXk6IEpRdWVyeTtcbiAgc2VsZWN0Q29uYWluZXI6IEpRdWVyeTtcbiAgc3RhdGU6IFF1b3RlU3RhdGVJbnRlcmZhY2U7XG4gIHF1b3RlQ29udGFpbmVyOiBKUXVlcnk7XG4gIHNlbGVjdGVkSXRlbTogUXVvdGVTZWxlY3RlZE9iamVjdDtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgY3VycmVudEJyZWFrcG9pbnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnF1b3RlQ29udGFpbmVyID0gJChcIi5xdW90ZVwiKTtcbiAgICB0aGlzLnNlbGVjdEJ0biA9ICQoXCIucXVvdGVfX3NlbGVjdC0tYnRuXCIpO1xuICAgIHRoaXMucXVvdGVJdGVtc0FycmF5ID0gJChcIi5xdW90ZV9faXRlbVwiKTtcbiAgICB0aGlzLmZvcm1CdWlsZGVyID0gJChcIi5xdW90ZV9fZm9ybS0taW5wdXRcIik7XG4gICAgdGhpcy5xdW90ZUNob29zZXIgPSAkKFwiLnF1b3RlX19mb3JtLS1zZWxlY3RcIik7XG4gICAgdGhpcy5zZWxlY3RDb25haW5lciA9IHRoaXMuc2VsZWN0QnRuLmZpbmQoXCIuZmllbGRzZXRcIik7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNlbGVjdGVkOiAnJyxcbiAgICAgIGlzRm9ybUFjdGl2ZTogZmFsc2VcbiAgICB9O1xuICAgIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgPSBVdGlscy5icmVha3BvaW50O1xuXG4gIH1cblxuICBnZXRTZWxlY3RlZExhYmVsKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdENvbmFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBzZXRXaWR0aCggbGFiZWw6IEpRdWVyeSApIHtcblxuICAgIGxldCBsYWJlbFdpZHRoID0gbGFiZWwub3V0ZXJXaWR0aCgpO1xuICAgIHRoaXMuc3dpdGNoQnRuLmNzcyhcIndpZHRoXCIsIGxhYmVsV2lkdGgpO1xuXG4gIH1cblxuICBidWlsZFNlbGVjdEJveCgpIHtcblxuICAgIGxldCBuYW1lcyA9IFtdO1xuICAgIGxldCBmcmFnbWVudCA9ICQoZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKTtcblxuICAgIC8vIGdldCBoMiB0aXRsZXMgZnJvbSBlYWNoIHF1b3RlIGl0ZW1cbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgdGl0bGUgPSAkdGhpcy5maW5kKFwiLmNhcmRfX2l0ZW0tLWNvbnRlbnQgPiBoMlwiKS50ZXh0KCksXG4gICAgICAgIG5hbWUgPSB0aXRsZS50b0xvY2FsZUxvd2VyQ2FzZSgpLFxuICAgICAgICB1bmlxdWVJZCA9IG5hbWUgKyBcIi1cIiArIGluZGV4O1xuXG4gICAgICBjb25zb2xlLmxvZyhcIlRpdGxlOiBcIiwgdGl0bGUpO1xuXG4gICAgICAvLyBBZGQgbWF0Y2hpbmcgSUQncyB0byBlYWNoIENhcmRcbiAgICAgICR0aGlzLmF0dHIoXCJpZFwiLCB1bmlxdWVJZCk7XG5cbiAgICAgIC8vIENyZWF0ZSBpbnB1dCBhbmQgbGFiZWwgRE9NIGVsZW1lbnRzXG4gICAgICBsZXQgaW5wdXQgPSBVdGlscy5idWlsZEh0bWwoXCJpbnB1dFwiLCB7XG4gICAgICAgIGlkOiB1bmlxdWVJZCxcbiAgICAgICAgdHlwZTogXCJyYWRpb1wiLFxuICAgICAgICBjbGFzczogXCJxdW90ZV9faW5wdXRcIixcbiAgICAgICAgbmFtZTogdW5pcXVlSWQsXG4gICAgICAgIHZhbHVlOiBuYW1lXG4gICAgICB9KTtcblxuICAgICAgbGV0IGxhYmVsID0gVXRpbHMuYnVpbGRIdG1sKFwibGFiZWxcIiwge1xuICAgICAgICBmb3I6IHVuaXF1ZUlkLFxuICAgICAgICBjbGFzczogaW5kZXggPT09IDAgPyBcInNlbGVjdGVkXCIgOiBcIlwiXG4gICAgICB9LCB0aXRsZSk7XG5cblxuICAgICAgZnJhZ21lbnQuYXBwZW5kKGlucHV0KS5hcHBlbmQobGFiZWwpO1xuXG4gICAgfSk7XG5cbiAgICAvLyBHZXQgY29sb3IgZnJvbSBkYXRhIGVsIGFuZCBzZXQgYnV0dG9uXG4gICAgbGV0ICRidXR0b25fY29sb3IgPSB0aGlzLnNlbGVjdENvbmFpbmVyLmRhdGEoXCJjb2xvclwiKTtcbiAgICBmcmFnbWVudC5hcHBlbmQoJzxzcGFuIGNsYXNzPVwicXVvdGVfX3N3aXRjaCBzaGFkb3ctc21hbGwtYnRuXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOicgKyAkYnV0dG9uX2NvbG9yICsgJ1wiPjwvc3Bhbj4nKTtcblxuICAgIHRoaXMuc2VsZWN0Q29uYWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICB9XG5cbiAgYnVpbGRTZWxlY3RFdmVudEhhbmRsZXJzKCkge1xuICAgIHRoaXMuaW5wdXRzID0gdGhpcy5zZWxlY3RCdG4uZmluZChcIi5xdW90ZV9faW5wdXRcIik7XG4gICAgdGhpcy5zd2l0Y2hCdG4gPSAkKFwiLnF1b3RlX19zd2l0Y2hcIik7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggZWFjaCBpdGVtIGFuZCBzZXQgd2lkdGggYW5kIGNoYW5nZSBldmVudHMgYW5kIGNoZWNrZWQgc3RhdHVzXG4gICAgdGhpcy5pbnB1dHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgbGV0ICR0aGlzID0gJChlbCksXG4gICAgICAgIG5leHRMYWJlbCA9ICR0aGlzLm5leHQoKTtcblxuICAgICAgaWYgKCBpbmRleCA9PT0gMCApIHtcbiAgICAgICAgJHRoaXMucHJvcChcImNoZWNrZWRcIiwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gc2V0IHN0YXRlIHRvIGN1cnJlbnQgc2VsZWN0ZWQgaW5wdXQgSURcbiAgICAgICAgdGhpcy5zdGF0ZS5zZWxlY3RlZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gZmluZCBTZWxlY3RlZCwgZ2V0IHdpZHRoIG9mIGxhYmVsLCBzZXQgd2lkdGggb2Ygc3BhblxuICAgICAgaWYgKCBuZXh0TGFiZWwuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSApIHtcbiAgICAgICAgdGhpcy5zZXRXaWR0aChuZXh0TGFiZWwpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgb24gY2hhbmdlIGZ1bmN0aW9uIGhlcmVcbiAgICAgICR0aGlzLmNoYW5nZSh0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRDYXJkRXZlbnRIYW5kbGVycygpIHtcblxuICAgIC8vIE1haW4gQ2FyZHNcbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgYnV0dG9uID0gJHRoaXMuZmluZChcIi5jYXJkX19pdGVtLS1idG5cIik7XG5cbiAgICAgIGJ1dHRvbi5vbihcImNsaWNrXCIsIHRoaXMub3BlbkZvcm0uYmluZCh0aGlzKSk7XG5cbiAgICB9KTtcblxuICAgIC8vIEJhY2sgYnV0dG9uIGZvciB0YWJsZXRcbiAgICBsZXQgYnV0dG9uID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnRhYmxldFwiKS5maW5kKFwiLmdvLWJhY2tcIik7XG4gICAgYnV0dG9uLm9uKFwiY2xpY2tcIiwgdGhpcy5jbG9zZUZvcm0uYmluZCh0aGlzKSk7XG5cbiAgfVxuXG4gIGZhZGVJbiggZWw6IEpRdWVyeSApIHtcblxuICAgIFR3ZWVuTWF4LnRvKGVsLCAuMywge1xuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGRlbGF5OiAuM1xuICAgIH0pO1xuXG4gIH1cblxuICBzZXRUcmFuc2xhdGVYKCBjdXJyZW50VGFyZ2V0OiBKUXVlcnksIHdpZHRoOiBOdW1iZXIgKSB7XG4gICAgbGV0ICR0aGlzID0gY3VycmVudFRhcmdldDtcbiAgICBsZXQgaW5wdXRJZCA9ICR0aGlzLmF0dHIoXCJpZFwiKTtcblxuICAgIC8vIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaW5wdXQgbWF0Y2hlcyB0aGUgMm5kIGl0ZW0gLSB0aGVuIG1vdmUgc3dpdGNoQnRuIHJpZ2h0LCBvdGhlcndpc2UgYmFjayB0byBwb3NpdGlvbiAxXG4gICAgaWYgKCBpbnB1dElkID09PSAkKHRoaXMuaW5wdXRzWyAxIF0pLmF0dHIoXCJpZFwiKSApIHtcbiAgICAgIHRoaXMuc3dpdGNoQnRuLmNzcyh7XG4gICAgICAgIFwid2Via2l0VHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHdpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJNb3pUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgd2lkdGggKyBcInB4KVwiLFxuICAgICAgICBcIm1zVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHdpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJPVHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlWChcIiArIHdpZHRoICsgXCJweClcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKFwiICsgd2lkdGggKyBcInB4KVwiXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zd2l0Y2hCdG4uY3NzKHtcbiAgICAgICAgXCJ3ZWJraXRUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJNb3pUcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJtc1RyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVgoMHB4KVwiLFxuICAgICAgICBcIk9UcmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm1cIjogXCJ0cmFuc2xhdGVYKDBweClcIlxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb25DaGFuZ2UoIGUgKSB7XG5cbiAgICBsZXQgJHRoaXMgPSAkKGUuY3VycmVudFRhcmdldCksXG4gICAgICBmaWVsZHNldCA9ICR0aGlzLnBhcmVudChcIi5maWVsZHNldFwiKSxcbiAgICAgIHByZXZJdGVtID0gZmllbGRzZXQuZmluZChcIi5zZWxlY3RlZFwiKSxcbiAgICAgIHByZXZXaWR0aCA9IHByZXZJdGVtLm91dGVyV2lkdGgoKSAtIDEsXG4gICAgICBpbnB1dElkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuXG4gICAgLy8gcmVtb3ZlIHNlbGVjdGVkIGZyb20gUHJldiBMYWJlbFxuICAgIGZpZWxkc2V0LmZpbmQoXCJsYWJlbFwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgLy8gcmVtb3ZlIGNoZWNrZWQgc3RhdGUgZnJvbSBwcmV2IGlucHV0XG4gICAgcHJldkl0ZW0ucHJldihcImlucHV0XCIpLnByb3AoXCJjaGVja2VkXCIsIGZhbHNlKTtcblxuICAgIC8vIHNldCBuZXcgaXRlbSB0byBzZWxlY3RlZCBhbmQgY2hlY2tlZFxuICAgIGxldCBzZWxlY3RlZExhYmVsID0gZmllbGRzZXQuZmluZChcImxhYmVsW2Zvcj1cIiArIGlucHV0SWQgKyBcIl1cIikuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAkdGhpcy5wcm9wKFwiY2hlY2tlZFwiLCB0cnVlKTtcblxuICAgIC8vIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaW5wdXQgbWF0Y2hlcyB0aGUgMm5kIGl0ZW0gLSB0aGVuIG1vdmUgc3dpdGNoQnRuIHJpZ2h0LCBvdGhlcndpc2UgYmFjayB0byBwb3NpdGlvbiAxXG4gICAgdGhpcy5zZXRUcmFuc2xhdGVYKCR0aGlzLCBwcmV2V2lkdGgpO1xuXG4gICAgLy8gY2hhbmdlIHRoZSB3aWR0aCBvZiB0aGUgYnRuIHRvIG1hdGNoIHRoZSB3aWR0aCBvZiB0aGUgbmV3IGxhYmVsXG4gICAgdGhpcy5zZXRXaWR0aChzZWxlY3RlZExhYmVsKTtcblxuICAgIC8vIHNldCBzdGF0ZSB0byB0aGUgbmV3bHkgc2VsZWN0ZWQgaW5wdXRcbiAgICB0aGlzLnN0YXRlLnNlbGVjdGVkID0gJHRoaXMuYXR0cihcImlkXCIpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBTdGF0ZSBpczogXCIsIHRoaXMuc3RhdGUuc2VsZWN0ZWQpO1xuXG4gICAgdGhpcy50b2dnbGVDYXJkcygpO1xuXG4gIH1cblxuICB0b2dnbGVDYXJkcygpIHtcblxuICAgIC8vIGJhc2VkIG9uIHN0YXRlLCBhZGQgc2VsZWN0ZWQgdG8gdGhlIGNhcmQncyBpZCBtYXRjaGluZyB0aGUgc3RhdGVcbiAgICB0aGlzLnF1b3RlSXRlbXNBcnJheS5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKSxcbiAgICAgICAgaWQgPSAkdGhpcy5hdHRyKFwiaWRcIik7XG5cbiAgICAgICR0aGlzLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWQgc2hhZG93LW1lZGl1bS1kYXJrXCIpO1xuXG4gICAgICBpZiAoIGlkID09PSB0aGlzLnN0YXRlLnNlbGVjdGVkICkge1xuXG4gICAgICAgICR0aGlzLmFkZENsYXNzKFwic2VsZWN0ZWQgc2hhZG93LW1lZGl1bS1kYXJrXCIpO1xuXG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9XG5cbiAgc2V0QWN0aXZlUGxhbigpIHtcblxuICAgIGxldCBpZCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWQ7XG5cbiAgICBsZXQgc2VsZWN0ZWRDYXJkID0gdGhpcy5xdW90ZUl0ZW1zQXJyYXkuZmlsdGVyKCggaXRlbSApID0+IHtcbiAgICAgIHJldHVybiAkKHRoaXMucXVvdGVJdGVtc0FycmF5WyBpdGVtIF0pLmF0dHIoXCJpZFwiKSA9PT0gaWQ7XG4gICAgfSk7XG5cbiAgICBsZXQgYnV0dG9uID0gJzxhIGNsYXNzPVwicm91bmRlZC1idG4gd2hpdGUtYnRuIGdvLWJhY2tcIiBocmVmPVwiI1wiPkdvIEJhY2s8L2E+JztcblxuICAgIC8vIGZpbmQgZm9ybVxuICAgIGxldCBmb3JtUmVmID0gc2VsZWN0ZWRDYXJkLmZpbmQoXCIucXVvdGVfX2Zvcm0tLXRlbXBcIikuZmluZChcIi5xdW90ZV9fZm9ybS0taW5uZXJcIik7XG4gICAgbGV0IGZvcm0gPSBmb3JtUmVmLmRldGFjaCgpO1xuXG4gICAgLy8gY2xvbmVkIGVsZW1lbnRcbiAgICBsZXQgbW9kaWZpZWRFbGVtZW50ID0gc2VsZWN0ZWRDYXJkLmNsb25lKCk7XG5cbiAgICAvLyByZW1vdmUgZm9ybSBmcm9tIGNsb25lZCBpdGVtLlxuICAgIC8vIG1vZGlmaWVkRWxlbWVudC5maW5kKFwiLnF1b3RlX19mb3JtLS1pdGVtLnRlbXBcIikucmVtb3ZlKCk7XG4gICAgLy8gZm9ybVJlZi5yZW1vdmUoKTtcblxuICAgIC8vIGFkZCBmb3JtIHRvIHRoZSBWQyBjb250ZW50IGFyZWFcbiAgICBsZXQgcXVvdGVGb3JtQ29udGFpbmVyID0gJChcIi5xdW90ZV9fZm9ybS0tdmNcIik7XG4gICAgcXVvdGVGb3JtQ29udGFpbmVyLmFwcGVuZChmb3JtKTtcblxuICAgIC8vIGZpbmQgYnV0dG9uIGFuZCByZW1vdmVcbiAgICBtb2RpZmllZEVsZW1lbnQuZmluZChcIi5jYXJkX19pdGVtLS1idG5cIikucmVtb3ZlKCk7XG5cbiAgICAvLyBtb2RpZmllZEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5nby1iYWNrXCIpKTtcbiAgICBsZXQgY2FyZFdyYXBwZXIgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWNhcmQtd3JhcHBlclwiKTtcblxuICAgIGNhcmRXcmFwcGVyLmFwcGVuZChtb2RpZmllZEVsZW1lbnQpLmFwcGVuZChidXR0b24pO1xuXG4gICAgLy8gQmFjayBidXR0b24gaW5zaWRlIHdyYXBwZXJcbiAgICBsZXQgYnV0dG9uRG9tID0gY2FyZFdyYXBwZXIuZmluZChcIi5nby1iYWNrXCIpO1xuICAgIGJ1dHRvbkRvbS5vbihcImNsaWNrXCIsIHRoaXMuY2xvc2VGb3JtLmJpbmQodGhpcykpO1xuXG5cbiAgfVxuXG4gIHB1dEZvcm1CYWNrKCBmb3JtOiBKUXVlcnkgKSB7XG4gICAgbGV0IGlkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZDtcbiAgICAvLyBmaW5kIGVsZW1lbnQgaWQgdGhhdCBtYXRjaGVzIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgbGV0IHNlbGVjdGVkQ2FyZCA9IHRoaXMucXVvdGVJdGVtc0FycmF5LmZpbHRlcigoIGl0ZW0gKSA9PiB7XG4gICAgICByZXR1cm4gJCh0aGlzLnF1b3RlSXRlbXNBcnJheVsgaXRlbSBdKS5hdHRyKFwiaWRcIikgPT09IGlkO1xuICAgIH0pO1xuXG4gICAgc2VsZWN0ZWRDYXJkLmZpbmQoXCIucXVvdGVfX2Zvcm0tLXRlbXBcIikuYXBwZW5kKCBmb3JtICk7XG4gIH1cblxuICBjbG9zZUZvcm0oIGUgKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMuc3RhdGUuaXNGb3JtQWN0aXZlID0gZmFsc2U7XG5cbiAgICAvLyByZWYgZm9yIGl0ZW1zIGluIFZDIHZpZXdcbiAgICBsZXQgY2FyZCA9IHRoaXMuZm9ybUJ1aWxkZXIuZmluZChcIi5jYXJkX19pdGVtXCIpO1xuICAgIGxldCBiYWNrQnRuID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS1jYXJkLXdyYXBwZXJcIikuZmluZChcIi5nby1iYWNrXCIpO1xuICAgIGxldCBmb3JtID0gdGhpcy5mb3JtQnVpbGRlci5maW5kKFwiLnF1b3RlX19mb3JtLS12Y1wiKS5maW5kKFwiLnF1b3RlX19mb3JtLS1pbm5lclwiKTtcblxuICAgIGNhcmQucmVtb3ZlQ2xhc3MoXCJpblwiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gc2V0IGZvcm0gdG8gYWN0aXZlXG4gICAgICB0aGlzLmZvcm1CdWlsZGVyLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyBzZXQgYm9keSBiYWNrIHRvIHNjcm9sbGFibGVcbiAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93LXlcIiwgXCJhdXRvXCIpO1xuXG4gICAgfSwgNDAwKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICB0aGlzLmZvcm1CdWlsZGVyXG4gICAgICAgIC5maW5kKFwiLnF1b3RlX19mb3JtLS12Y1wiKVxuICAgICAgICAub25lKCdvdHJhbnNpdGlvbmVuZCBvVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQgdHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgKCBlICkgPT4ge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdmlzaWJpbGl0eSBvbmNlIGFuaW1hdGlvbiBjb21wbGV0ZXNcbiAgICAgICAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuY3NzKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTtcbiAgICAgICAgICAgIHRoaXMucXVvdGVDaG9vc2VyLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xuXG4gICAgICAgICAgICAvLyB6LWluZGV4IGZpeFxuICAgICAgICAgICAgJChcIi5pbm5lci1wYWdlLXdyYXBwZXJcIikuY2hpbGRyZW4oXCJkaXZcIikuY3NzKFwiei1pbmRleFwiLCBcIjBcIik7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSBjdXJyZW50IGNhcmQgaHRtbFxuICAgICAgICAgICAgY2FyZC5yZW1vdmUoKTtcbiAgICAgICAgICAgIGJhY2tCdG4ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIHRoaXMucHV0Rm9ybUJhY2soIGZvcm0uZGV0YWNoKCkgKTtcblxuICAgICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIHJlbW92ZSB2aXNpYmlsaXR5IG9uY2UgYW5pbWF0aW9uIGNvbXBsZXRlc1xuICAgICAgdGhpcy5mb3JtQnVpbGRlci5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xuICAgICAgdGhpcy5xdW90ZUNob29zZXIuY3NzKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cbiAgICAgIC8vIHotaW5kZXggZml4XG4gICAgICAkKFwiLmlubmVyLXBhZ2Utd3JhcHBlclwiKS5jaGlsZHJlbihcImRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIFwiMFwiKTtcblxuICAgICAgLy8gcmVtb3ZlIGN1cnJlbnQgY2FyZCBodG1sXG4gICAgICBjYXJkLnJlbW92ZSgpO1xuICAgICAgYmFja0J0bi5yZW1vdmUoKTtcblxuICAgICAgdGhpcy5wdXRGb3JtQmFjayggZm9ybS5kZXRhY2goKSApO1xuICAgIH1cblxuICAgIC8vIGZhZGUgb3V0IGZpcnN0IGRpc3BsYXlcbiAgICB0aGlzLnF1b3RlQ2hvb3Nlci5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgfVxuXG4gIG9wZW5Gb3JtKCBlICkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGxldCAkdGhpcyA9ICQoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICBsZXQgcGFyZW50Q29uYXRpbmVyID0gJHRoaXMucGFyZW50KFwiZGl2XCIpLnBhcmVudChcImRpdlwiKTtcblxuICAgIC8vIGRpc2FibGUgYnV0dG9uIGNsaWNrIGlmIGl0ZW0gaXMgc2VsZWN0ZWRcbiAgICBpZiAoICFwYXJlbnRDb25hdGluZXIuaGFzQ2xhc3MoXCJzZWxlY3RlZFwiKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBzZXQgc3RhdGVcbiAgICB0aGlzLnN0YXRlLmlzRm9ybUFjdGl2ZSA9IHRydWU7XG5cbiAgICAvLyBzZXQgY29udGVudCBwbGFuIEhUTUwgaW4gbmV3IGZvcm0gYXJlYVxuICAgIHRoaXMuc2V0QWN0aXZlUGxhbigpO1xuXG4gICAgLy8gQW5pbWF0ZSBmb3JtIGluXG4gICAgbGV0IGFjdGl2YXRlSW5uZXJGb3JtID0gKCkgPT4ge1xuXG4gICAgICAvLyB6LWluZGV4IGZpeFxuICAgICAgJChcIi5pbm5lci1wYWdlLXdyYXBwZXJcIikuY2hpbGRyZW4oXCJkaXZcIikuY3NzKFwiei1pbmRleFwiLCBcIi0xXCIpO1xuICAgICAgdGhpcy5xdW90ZUNvbnRhaW5lci5wYXJlbnRzKFwiLnZjX3Jvd1wiKS5jc3MoXCJ6LWluZGV4XCIsIFwiMlwiKTtcblxuICAgICAgLy8gZmFkZSBvdXQgY2FyZHNcbiAgICAgIHRoaXMucXVvdGVDaG9vc2VyLmNzcyhcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG4gICAgICAvLyBzZXQgZm9ybSB0byBhY3RpdmVcbiAgICAgIHRoaXMuZm9ybUJ1aWxkZXIuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG5cbiAgICAgIC8vIGFkZCB2aXNpYmlsaXR5IGltbWVkaWF0ZWx5XG4gICAgICB0aGlzLmZvcm1CdWlsZGVyLmNzcyhcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuXG4gICAgICAvLyBmYWRlIG91dCBmaXJzdCBkaXNwbGF5XG4gICAgICB0aGlzLnF1b3RlQ2hvb3Nlci5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICB9O1xuXG4gICAgLy8gaWYgZGVza3RvcCBzY3JvbGwgdG9wXG4gICAgaWYgKCBVdGlscy5icmVha3BvaW50ID49IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8vIHNjcm9sbCB0b3Agb2YgZGl2IG9uIG9wZW4gZm9yIGdyYWNlZnVsIFVYXG4gICAgICAkKFwiYm9keSxodG1sXCIpLmFuaW1hdGUoXG4gICAgICAgIHtcbiAgICAgICAgICBcInNjcm9sbFRvcFwiOiB0aGlzLnF1b3RlQ29udGFpbmVyLm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAyMDAsICgpID0+IHtcbiAgICAgICAgICBhY3RpdmF0ZUlubmVyRm9ybSgpO1xuICAgICAgICB9XG4gICAgICApLmJpbmQodGhpcyk7XG5cbiAgICB9ZWxzZSB7XG4gICAgICBhY3RpdmF0ZUlubmVyRm9ybSgpO1xuICAgIH1cblxuXG4gICAgbGV0IGNhcmQgPSB0aGlzLmZvcm1CdWlsZGVyLmZpbmQoXCIucXVvdGVfX2Zvcm0tLWNhcmRcIik7XG5cbiAgICAvLyBTZXQgYm9keSB0byBub3Qgc2Nyb2xsXG4gICAgJChcImJvZHlcIikuY3NzKFwib3ZlcmZsb3cteVwiLCBcImhpZGRlblwiKTtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgY2FyZC5vbmUoJ290cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgKCBlICkgPT4ge1xuXG4gICAgICAgICAgLy8gZmFkZSBjYXJkIGluIG9uY2UgZGF0YSBpcyBzZXQgJiB0aGUgY2FyZCBiZyBpcyBmaW5pc2hlZCBhbmltYXRpbmdcbiAgICAgICAgICBjYXJkLmZpbmQoXCIuY2FyZF9faXRlbVwiKS5hZGRDbGFzcyhcImluXCIpO1xuXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIC8vIGZhZGUgY2FyZCBpbiBvbmNlIGRhdGEgaXMgc2V0ICYgdGhlIGNhcmQgYmcgaXMgZmluaXNoZWQgYW5pbWF0aW5nXG4gICAgICBjYXJkLmZpbmQoXCIuY2FyZF9faXRlbVwiKS5hZGRDbGFzcyhcImluXCIpO1xuXG4gICAgfVxuXG4gIH1cblxuICByZXNpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgYnV0dG9uIHNpemUgdG8gYWNjdXJhdGVseSByZXNpemUgc2VsZWN0ZWQgYnV0dG9uIHdpZHRoXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzaXplVGltZXIpO1xuXG4gICAgdGhpcy5yZXNpemVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICBpZiAoIHRoaXMuY3VycmVudEJyZWFrcG9pbnQgIT09IFV0aWxzLmJyZWFrcG9pbnQgKSB7XG5cbiAgICAgICAgbGV0IHNlbGVjdGVkTGFiZWwgPSB0aGlzLmdldFNlbGVjdGVkTGFiZWwoKSxcbiAgICAgICAgICBzZWxlY3RlZElucHV0ID0gc2VsZWN0ZWRMYWJlbC5wcmV2KCksXG4gICAgICAgICAgZmlyc3RMYWJlbCA9ICQodGhpcy5pbnB1dHNbIDAgXSkubmV4dCgpLFxuICAgICAgICAgIGZpcnN0TGFiZWxXaWR0aCA9IGZpcnN0TGFiZWwub3V0ZXJXaWR0aCgpIC0gMTtcblxuICAgICAgICB0aGlzLnNldFRyYW5zbGF0ZVgoc2VsZWN0ZWRJbnB1dCwgZmlyc3RMYWJlbFdpZHRoKTtcbiAgICAgICAgdGhpcy5zZXRXaWR0aChzZWxlY3RlZExhYmVsKTtcbiAgICAgICAgdGhpcy5jdXJyZW50QnJlYWtwb2ludCA9IFV0aWxzLmJyZWFrcG9pbnQ7XG4gICAgICB9XG5cbiAgICB9LCA0MDApO1xuXG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnNvbGUubG9nKFwiUXVvdGUgQnVpbGRlclwiKTtcblxuICAgIC8vIGJ1aWxkIHNlbGVjdCBib3ggYnV0dG9uIGlucHV0c1xuICAgIHRoaXMuYnVpbGRTZWxlY3RCb3goKTtcblxuICAgIC8vIHNldCBjbGljayBldmVudHMgYW5kIGZpcnN0IHNlbGVjdGVkIGl0ZW1zIGZvciBTZWxlY3QgQm94XG4gICAgdGhpcy5idWlsZFNlbGVjdEV2ZW50SGFuZGxlcnMoKTtcblxuICAgIHRoaXMuZmFkZUluKHRoaXMuc2VsZWN0QnRuKTtcblxuICAgIC8vIHNlbGVjdCBjYXJkXG4gICAgdGhpcy50b2dnbGVDYXJkcygpO1xuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50cyB0byBjYXJkcyBidXR0b25zXG4gICAgdGhpcy5idWlsZENhcmRFdmVudEhhbmRsZXJzKCk7XG5cbiAgICAvLyBmYWRlIG1haW4gY29udGFpbmVyIGluXG4gICAgdGhpcy5mYWRlSW4odGhpcy5xdW90ZUNvbnRhaW5lcik7XG5cbiAgICAvLyBvbiByZXNpemUgY2hhbmdlIGJ1dHRvbiBzaXplXG4gICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXG4gIH1cbn1cblxuY29uc3QgUXVvdGVCdWlsZGVyID0gbmV3IFF1b3RlQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFF1b3RlQnVpbGRlcjsiLCJjb25zdCAkID0galF1ZXJ5O1xuaW1wb3J0IFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmludGVyZmFjZSBTaG93Y2FzZVNsaWRlckludGVyZmFjZSB7XG4gIGRlc2t0b3BQb3M6IG51bWJlcjtcbiAgdGFibGV0UG9zOiBudW1iZXI7XG4gIGluZGV4U2VsZWN0ZWQ6IG51bWJlcjtcbiAgY3VycmVudFNsaWRlOiBudW1iZXI7XG59XG5cbmNsYXNzIFNob3djYXNlQ29tcG9uZW50IHtcbiAgY29udGFpbmVyOiBKUXVlcnk7XG4gIHJlc2l6ZVRpbWVyOiBudW1iZXI7XG4gIG5leHRCdG5Nb2JpbGU6IEpRdWVyeTtcbiAgcHJldkJ0bk1vYmlsZTogSlF1ZXJ5O1xuICBuZXh0QnRuOiBKUXVlcnk7XG4gIHByZXZCdG46IEpRdWVyeTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgZ2FsbGVyeTogSlF1ZXJ5O1xuICBkZXNjOiBKUXVlcnk7XG4gIHRodW1ic0NvbnRhaW5lcjogSlF1ZXJ5O1xuICBncmFkaWVudHM6IEpRdWVyeTtcbiAgdGh1bWJzQ2xpY2s6IEpRdWVyeTtcbiAgY2xvc2VCdG46IEpRdWVyeTtcbiAgY291bnRUb3RhbDogSlF1ZXJ5O1xuICBjdXJyZW50Q291bnRJdGVtOiBKUXVlcnk7XG4gIHNob3dDYXNlVGh1bWJzOiBKUXVlcnk7XG4gIHN0YXRlUG9zaXRpb246IFNob3djYXNlU2xpZGVySW50ZXJmYWNlO1xuICB0aHVtYlNjYWxlVG9wOiBudW1iZXI7XG4gIHRodW1iU2NhbGVMZWZ0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoIGVsOiBPYmplY3QgKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSAkKGVsKTtcbiAgICB0aGlzLnByZXZCdG5Nb2JpbGUgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX19uYXYtLXByZXZcIik7XG4gICAgdGhpcy5uZXh0QnRuTW9iaWxlID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fbmF2LS1uZXh0XCIpO1xuICAgIHRoaXMucHJldkJ0biA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1ic25hdi0tcHJldlwiKTtcbiAgICB0aGlzLm5leHRCdG4gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNuYXYtLW5leHRcIik7XG4gICAgdGhpcy5nYWxsZXJ5ID0gdGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fc2xpZGVyLS1nYWxsZXJ5XCIpO1xuICAgIHRoaXMuZGVzYyA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2NcIik7XG4gICAgdGhpcy5jb3VudFRvdGFsID0gdGhpcy5jb250YWluZXIuZmluZChcIi50b3RhbFwiKTtcbiAgICB0aGlzLmN1cnJlbnRDb3VudEl0ZW0gPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLmN1cnJlbnRcIik7XG4gICAgdGhpcy5pbmRleCA9IDA7IC8vIHNldCB0byAybmQgc2xpZGVcbiAgICB0aGlzLnRodW1ic0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLmZpbmQoXCIuc2hvd2Nhc2VfX3RodW1icy0taW1hZ2VzXCIpO1xuICAgIHRoaXMuc2hvd0Nhc2VUaHVtYnMgPSB0aGlzLmNvbnRhaW5lci5maW5kKFwiLnNob3djYXNlX190aHVtYnNcIik7XG4gICAgdGhpcy50aHVtYlNjYWxlVG9wID0gMTMwO1xuICAgIHRoaXMudGh1bWJTY2FsZUxlZnQgPSA3NTtcbiAgICB0aGlzLnN0YXRlUG9zaXRpb24gPSB7XG4gICAgICBkZXNrdG9wUG9zOiAwLFxuICAgICAgdGFibGV0UG9zOiAwLFxuICAgICAgaW5kZXhTZWxlY3RlZDogdGhpcy5pbmRleCxcbiAgICAgIGN1cnJlbnRTbGlkZTogdGhpcy5pbmRleCArIDFcbiAgICB9O1xuXG4gIH1cblxuICBzZXRGaXJzdFNsaWRlKCkge1xuXG4gICAgLy8gbG9vcCB0aHJvdWdoIGltYWdlcyBhbmQgc2V0IGFjdGl2ZSBlbGVtZW50XG4gICAgbGV0IGZpcnN0SW1hZ2UgPSB0aGlzLmdhbGxlcnkuZmluZChcImxpW2RhdGEtaW5kZXg9XCIgKyB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIFwiXVwiKTtcbiAgICBmaXJzdEltYWdlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICB0aGlzLmFuaW1hdGVHYWxsZXJ5SW4oKTtcblxuICAgIC8vIGxvb3AgdGhyb3VnaCBkZXNjIGFuZCBzZXQgYWN0aXZlIGVsZW1lbnRcbiAgICBsZXQgZmlyc3REZXNjID0gdGhpcy5kZXNjLmZpbmQoXCIuc2hvd2Nhc2VfX2Rlc2MtLWl0ZW1bZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuICAgIGZpcnN0RGVzYy5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgLy8gQnVpbGQgdGh1bWJuYWlsc1xuICAgIHRoaXMuYnVpbGRUaHVtYnMoKTtcblxuICAgIC8vIFNldCBDdXJyZW50IFNsaWRlLCB3aGljaCBpcyBhbHdheXMgdGhlIGZpcnN0IHNsaWRlIHRvIHNlbGVjdGVkIC0gb25Mb2FkXG4gICAgdGhpcy51cGRhdGVNb2JpbGVOYXYodGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuXG4gICAgLy8gYWRkIGNsaWNrIGV2ZW50cyB0byB0aHVtYm5haWwgaW1hZ2VzLCB0aGVuIHdoZW4gZmluaXNoZWQgYW5pbWF0ZSBpbiB3aXRoIGNhbGxiYWNrXG4gICAgdGhpcy5idWlsZFRodW1ic0NsaWNrSGFuZGxlcih0aGlzLmFuaW1hdGVJblRodW1icy5iaW5kKHRoaXMpKTtcblxuICB9XG5cbiAgZ2V0Q3VycmVudFNsaWRlRWxlbWVudCgpOiBKUXVlcnkge1xuICAgIHJldHVybiB0aGlzLmdhbGxlcnkuZmluZChcIi5zZWxlY3RlZFwiKTtcbiAgfVxuXG4gIGdldEN1cnJlbnROYXZFbGVtZW50KCk6IEpRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRDdXJyZW50RGVzY0VsZW1lbnQoKTogSlF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy5kZXNjLmZpbmQoXCIuc2VsZWN0ZWRcIik7XG4gIH1cblxuICBnZXRUb3RhbFNsaWRlcygpOiBudW1iZXIge1xuICAgIGxldCBjb3VudCA9IHRoaXMuZ2FsbGVyeS5jaGlsZHJlbihcImxpXCIpLmxlbmd0aDtcbiAgICByZXR1cm4gY291bnQ7XG4gIH1cblxuICB1cGRhdGVNb2JpbGVOYXYoIHNlbGVjdGVkOiBKUXVlcnkgKSB7XG5cbiAgICAvLyBFbmFibGUvRGlzYWJsZSBhcnJvdyBidG5zXG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpmaXJzdC1jaGlsZFwiKSk7XG4gICAgdGhpcy5uZXh0QnRuTW9iaWxlLnBhcmVudChcImxpXCIpLnRvZ2dsZUNsYXNzKFwic2xpZGVyLWhpZGRlblwiLCBzZWxlY3RlZC5pcyhcIjpsYXN0LWNoaWxkXCIpKTtcblxuICB9XG5cbiAgdXBkYXRlU3RhdGUoIGluZGV4OiBudW1iZXIgKSB7XG5cbiAgICB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCA9IGluZGV4O1xuICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPSBpbmRleCArIDE7XG5cbiAgfVxuXG4gIGdldEN1cnJlbnRTbGlkZUNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGU7XG4gIH1cblxuICB1cGRhdGVTbGlkZSggZGlyZWN0aW9uOiBzdHJpbmcgKSB7XG5cbiAgICAvLyBnZXQgY3VycmVudCBzZWxlY3RlZCBhbmQgZmluZCB0aGUgbWF0Y2ggdG8gdGhlIG5leHQgZWxcbiAgICBsZXQgY3VycmVudFNsaWRlID0gdGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCk7XG4gICAgbGV0IG5leHRTbGlkZSA9IHRoaXMuZ2FsbGVyeS5maW5kKFwibGlbZGF0YS1pbmRleD1cIiArIHRoaXMuc3RhdGVQb3NpdGlvbi5pbmRleFNlbGVjdGVkICsgXCJdXCIpO1xuXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkZCBsZWZ0IHRvIGFsbCBzbGlkZXMgcHJldiwgaW4tY2FzZSB5b3Ugc2tpcHBlZCBvdmVyIG9uZVxuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBOYXZpZ2F0aW9uIGNoZWNrXG4gICAgdGhpcy51cGRhdGVNb2JpbGVOYXYodGhpcy5nZXRDdXJyZW50U2xpZGVFbGVtZW50KCkpO1xuICB9XG5cbiAgdXBkYXRlRGVzY0hlaWdodCggZGlyZWN0aW9uPzogc3RyaW5nLCBzZWxlY3RlZD86IEpRdWVyeSApIHtcblxuICAgIC8vIGRpcmVjdGlvblxuICAgIGlmICggZGlyZWN0aW9uICkge1xuXG4gICAgICBsZXQgaGVpZ2h0ID0gc2VsZWN0ZWQub3V0ZXJIZWlnaHQoKTtcbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMuZGVzYywgLjMsIHtcbiAgICAgICAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBnZXQgY3VycmVudCBzbGlkZVxuICAgICAgbGV0IGN1cnJlbnRTbGlkZSA9IHRoaXMuZ2V0Q3VycmVudERlc2NFbGVtZW50KCk7XG4gICAgICBsZXQgaGVpZ2h0ID0gY3VycmVudFNsaWRlLm91dGVySGVpZ2h0KCk7XG4gICAgICB0aGlzLmRlc2MuaGVpZ2h0KGhlaWdodCk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIHVwZGF0ZURlc2MoIGRpcmVjdGlvbjogc3RyaW5nICkge1xuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnREZXNjRWxlbWVudCgpO1xuICAgIGxldCBuZXh0U2xpZGUgPSB0aGlzLmRlc2MuZmluZChcIi5zaG93Y2FzZV9fZGVzYy0taXRlbVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG5cbiAgICBpZiAoIGRpcmVjdGlvbiA9PT0gXCJyaWdodFwiICkge1xuXG4gICAgICAvLyBhZGQgbGVmdCB0byBhbGwgc2xpZGVzIHByZXYsIGluLWNhc2UgeW91IHNraXBwZWQgb3ZlciBvbmVcbiAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICBuZXh0U2xpZGUucHJldkFsbCgpLmFkZENsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5uZXh0QWxsKCkucmVtb3ZlQ2xhc3MoXCJsZWZ0XCIpO1xuXG4gICAgICB0aGlzLnVwZGF0ZURlc2NIZWlnaHQoXCJyaWdodFwiLCBuZXh0U2xpZGUpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gYWRkIGxlZnQgdG8gYWxsIHNsaWRlcyBwcmV2LCBpbi1jYXNlIHlvdSBza2lwcGVkIG92ZXIgb25lXG4gICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKFwibGVmdFwiKTtcbiAgICAgIG5leHRTbGlkZS5wcmV2QWxsKCkuYWRkQ2xhc3MoXCJsZWZ0XCIpO1xuICAgICAgbmV4dFNsaWRlLm5leHRBbGwoKS5yZW1vdmVDbGFzcyhcImxlZnRcIik7XG5cbiAgICAgIHRoaXMudXBkYXRlRGVzY0hlaWdodChcImxlZnRcIiwgbmV4dFNsaWRlKTtcblxuICAgIH1cblxuICB9XG5cbiAgdXBkYXRlVGh1bWJzbmF2KCBkaXJlY3Rpb246IHN0cmluZyApIHtcblxuICAgIGxldCBjdXJyZW50U2xpZGUgPSB0aGlzLmdldEN1cnJlbnROYXZFbGVtZW50KCk7XG4gICAgbGV0IG5leHRTbGlkZSA9IHRoaXMudGh1bWJzQ29udGFpbmVyLmZpbmQoXCJsaVtkYXRhLWluZGV4PVwiICsgdGhpcy5zdGF0ZVBvc2l0aW9uLmluZGV4U2VsZWN0ZWQgKyBcIl1cIik7XG5cblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA8IFV0aWxzLmJwcy5sYXB0b3AgKSB7XG5cbiAgICAgIC8qXG4gICAgICAgKiBUQUJMRVQgVEhVTUIgU0VMRUNUXG4gICAgICAgKi9cblxuICAgICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcbiAgICAgICAgY3VycmVudFNsaWRlLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XG4gICAgICAgIG5leHRTbGlkZS5hZGRDbGFzcyhcInNlbGVjdGVkXCIpO1xuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA+PSA0ICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPCB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBzdGF0ZVxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zIC0gdGhpcy50aHVtYlNjYWxlTGVmdDtcbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zIC0gdGhpcy50aHVtYlNjYWxlVG9wO1xuXG4gICAgICAgICAgLy8gdXBkYXRlIGh0bWwgZWxlbWVudFxuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgIHg6IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MsXG4gICAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlSW5cbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJsZWZ0XCIpO1xuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcblxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICsgdGhpcy50aHVtYlNjYWxlTGVmdDtcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgIT09IDAgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSAhPT0gMSApIHtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHN0YXRlXG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgPSB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyArIHRoaXMudGh1bWJTY2FsZVRvcDtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvKlxuICAgICAgICogREVTS1RPUCBUSFVNQiBTRUxFQ1RcbiAgICAgICAqL1xuICAgICAgaWYgKCBkaXJlY3Rpb24gPT09IFwicmlnaHRcIiApIHtcblxuICAgICAgICBjdXJyZW50U2xpZGUucmVtb3ZlQ2xhc3MoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XG5cbiAgICAgICAgLy8gZGV0ZWN0aW5nIGlmIHNsaWRlIHNob3VsZCBtb3ZlIG9yIG5vdFxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgPj0gNCAmJiB0aGlzLnN0YXRlUG9zaXRpb24uY3VycmVudFNsaWRlIDwgdGhpcy5nZXRUb3RhbFNsaWRlcygpICkge1xuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gY29udHJvbGxlclxuICAgICAgICAgIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MgLSB0aGlzLnRodW1iU2NhbGVUb3A7XG4gICAgICAgICAgdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi50YWJsZXRQb3MgLSB0aGlzLnRodW1iU2NhbGVMZWZ0O1xuXG4gICAgICAgICAgLy8gbW92ZSBzbGlkZXJcbiAgICAgICAgICBUd2Vlbk1heC50byh0aGlzLnRodW1ic0NvbnRhaW5lciwgLjEsIHtcbiAgICAgICAgICAgICAgejogLjAwMSxcbiAgICAgICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VJblxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGN1cnJlbnRTbGlkZS5yZW1vdmVDbGFzcyhcInNlbGVjdGVkXCIpO1xuICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3MoXCJzZWxlY3RlZFwiKTtcblxuICAgICAgICBpZiAoIHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyA9IHRoaXMuc3RhdGVQb3NpdGlvbi5kZXNrdG9wUG9zICsgdGhpcy50aHVtYlNjYWxlVG9wO1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgICAgICB6OiAuMDAxLFxuICAgICAgICAgICAgICB5OiB0aGlzLnN0YXRlUG9zaXRpb24uZGVza3RvcFBvcyxcbiAgICAgICAgICAgICAgZWFzZTogQ3ViaWMuZWFzZUluXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2VwZXJhdGUgdGFibGV0IGxvb2tpbmcgYXQgc2hvdWxkIGl0IHVwZGF0ZSB0YWJsZXQgc3RhdGVcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zICE9PSAwICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgICAgICB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zID0gdGhpcy5zdGF0ZVBvc2l0aW9uLnRhYmxldFBvcyArIHRoaXMudGh1bWJTY2FsZUxlZnQ7XG5cbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIGNoZWNrVGh1bWJzTmF2KCBzaXplOiBzdHJpbmcgKSB7XG5cbiAgICBpZiAoIHNpemUgPT09IFwibW9iaWxlXCIgKSB7XG5cbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgeTogMCxcbiAgICAgICAgICB4OiB0aGlzLnN0YXRlUG9zaXRpb24udGFibGV0UG9zLFxuICAgICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXRcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIFR3ZWVuTWF4LnRvKHRoaXMudGh1bWJzQ29udGFpbmVyLCAuMSwge1xuICAgICAgICAgIHo6IC4wMDEsXG4gICAgICAgICAgeTogdGhpcy5zdGF0ZVBvc2l0aW9uLmRlc2t0b3BQb3MsXG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICBlYXNlOiBDdWJpYy5lYXNlT3V0XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICB9XG5cbiAgfVxuXG4gIGFycm93SGFuZGxlciggZXZlbnQ6IGFueSApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGV0ICRlbCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7IC8vIGEgdGFnXG4gICAgbGV0IHRodW1iSW5kZXggPSAkZWwucGFyZW50KFwibGlcIikuZGF0YShcImluZGV4XCIpO1xuICAgIGxldCBwcmV2RWwgPSB0aGlzLnRodW1ic0NvbnRhaW5lci5maW5kKFwiLnNlbGVjdGVkXCIpO1xuICAgIGxldCBwcmV2SW5kZXggPSBwcmV2RWwuZGF0YShcImluZGV4XCIpO1xuXG5cbiAgICAvLyBTbGlkZXIgY2FuIG1vdmUgcmlnaHQgYmVjYXVzZSBjdXJyZW50IHNsaWRlIGlzIG5vdCB0aGUgbGFzdCBzbGlkZVxuICAgIGlmICggZXZlbnQuZGF0YS5rZXlzID09PSBcInJpZ2h0XCIgJiYgdGhpcy5zdGF0ZVBvc2l0aW9uLmN1cnJlbnRTbGlkZSA8PSB0aGlzLmdldFRvdGFsU2xpZGVzKCkgKSB7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSBvbiBhcnJvdyBjbGlja1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCArIDEpO1xuXG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwicmlnaHRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJyaWdodFwiKTtcbiAgICAgIHRoaXMudXBkYXRlVGh1bWJzbmF2KFwicmlnaHRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG5cbiAgICB9IGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwibGVmdFwiICYmIHRoaXMuc3RhdGVQb3NpdGlvbi5jdXJyZW50U2xpZGUgIT09IDEgKSB7XG5cbiAgICAgIC8vIHVwZGF0ZSBzdGF0ZSBvbiBhcnJvdyBjbGlja1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCAtIDEpO1xuXG4gICAgICAvLyBFbHNlIGlmIGl0cyBub3QgdGhlIGZpcnN0IHNsaWRlIC0gbW92ZSBsZWZ0XG4gICAgICB0aGlzLnVwZGF0ZVNsaWRlKFwibGVmdFwiKTtcbiAgICAgIHRoaXMudXBkYXRlRGVzYyhcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcImxlZnRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwidGh1bWJuYWlsXCIgJiZcbiAgICAgIHByZXZJbmRleCA8IHRodW1iSW5kZXggJiZcbiAgICAgIHRodW1iSW5kZXggKyAxICE9PSB0aGlzLmdldFRvdGFsU2xpZGVzXG4gICAgKSB7XG4gICAgICAvLyBjb21wYXJlIGl0ZW0gc2VsZWN0ZWQgaW5kZXggd2l0aCBuZXcgaXRlbSBzZWxlY3RlZCBhbmQgZGV0ZXJtaW5lIHdoaWNoIGRpcmVjdGlvbiB0byBtb3ZlXG4gICAgICAvLyB1cGRhdGUgU3RhdGVcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGh1bWJJbmRleCk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aHVtYnMgbmF2XG4gICAgICB0aGlzLnVwZGF0ZVRodW1ic25hdihcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVTbGlkZShcInJpZ2h0XCIpO1xuICAgICAgdGhpcy51cGRhdGVEZXNjKFwicmlnaHRcIik7XG4gICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbk91dCgpO1xuXG4gICAgfVxuICAgIGVsc2UgaWYgKCBldmVudC5kYXRhLmtleXMgPT09IFwidGh1bWJuYWlsXCIgJiYgcHJldkluZGV4ID4gdGh1bWJJbmRleFxuICAgICkge1xuICAgICAgLy8gdXBkYXRlIFN0YXRlXG4gICAgICB0aGlzLnVwZGF0ZVN0YXRlKHRodW1iSW5kZXgpO1xuXG4gICAgICAvLyB1cGRhdGUgdGh1bWJzIG5hdlxuICAgICAgdGhpcy51cGRhdGVUaHVtYnNuYXYoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy51cGRhdGVTbGlkZShcImxlZnRcIik7XG4gICAgICB0aGlzLnVwZGF0ZURlc2MoXCJsZWZ0XCIpO1xuICAgICAgdGhpcy5hbmltYXRlU2hhZG93SW5PdXQoKTtcblxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBjb3VudGVyXG4gICAgdGhpcy5jdXJyZW50Q291bnRJdGVtLmh0bWwoVXRpbHMuc2V0TnVtYmVyKHRoaXMuZ2V0Q3VycmVudFNsaWRlQ291bnQoKSkpO1xuXG4gIH1cblxuICBjaGVja1NpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIGlmIFRhYmxldCBvciBzbWFsbGVyIC0gYmluZCBtb2JpbGUgbmF2IGFycm93c1xuICAgICAgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgICAvLyBhZGp1c3QgY3NzIHNpemluZyBmb3IgdGh1bWJzIG5hdiBvbiBwb3NpdGlvbiByZXNpemVcbiAgICAgICAgdGhpcy5jaGVja1RodW1ic05hdihcIm1vYmlsZVwiKTtcblxuICAgICAgfSBlbHNlIHtcblxuICAgICAgICB0aGlzLmNoZWNrVGh1bWJzTmF2KFwiZGVza3RvcFwiKTtcblxuICAgICAgfVxuXG4gICAgfSwgNDAwKTtcblxuICAgIHRoaXMudXBkYXRlRGVzY0hlaWdodCgpO1xuXG4gIH1cblxuICBhbmltYXRlU2hhZG93SW5PdXQoKSB7XG5cbiAgICAvLyByZW1vdmUgZHJvcHNoYWRvd1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuZ2FsbGVyeSwgMCwge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjApXCJcbiAgICB9KTtcblxuXG4gICAgVHdlZW5NYXgudG8odGhpcy5nYWxsZXJ5LCAuMSwge1xuICAgICAgYm94U2hhZG93OiBcIjBweCAxOHB4IDk0cHggLTE2cHggcmdiYSgwLDAsMCwwLjY4KVwiLFxuICAgICAgZGVsYXk6IC4zXG4gICAgfSk7XG5cblxuICB9XG5cbiAgYW5pbWF0ZVNoYWRvd0luKCkge1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuZ2FsbGVyeSwgLjMsIHtcbiAgICAgIGJveFNoYWRvdzogXCIwcHggMThweCA5NHB4IC0xNnB4IHJnYmEoMCwwLDAsMC42OClcIixcbiAgICAgIGRlbGF5OiAuMVxuICAgIH0pO1xuICB9XG5cbiAgYnVpbGRUaHVtYnMoKSB7XG5cbiAgICBsZXQgZnJhZ21lbnQgPSAkKGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSk7XG4gICAgLy8gYnVpbGQgbG9vcCBmb3IgaW1hZ2VzXG4gICAgdGhpcy5nYWxsZXJ5LmZpbmQoXCJsaVwiKS5lYWNoKCggaW5kZXg6IG51bWJlciwgZWw6IE9iamVjdCApID0+IHtcblxuICAgICAgLy8gY3JlYXRlIGh0bWwgZWxlbWVudHNcbiAgICAgIGxldCBpdGVtSW5kZXggPSBVdGlscy5zZXROdW1iZXIoaW5kZXgpLFxuICAgICAgICBpbWFnZVRodW1iVXJsID0gJChlbCkuZGF0YShcInRodW1iXCIpLFxuICAgICAgICBpbWFnZVRodW1iQWx0ID0gJChlbCkuZGF0YShcImFsdFwiKSxcbiAgICAgICAgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKSxcbiAgICAgICAgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSxcbiAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblxuICAgICAgLy8gYWRkIHNyYyBhbmQgYXR0ciB0byBpbWFnZVxuICAgICAgaW1hZ2VFbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCBpbWFnZVRodW1iVXJsKTtcbiAgICAgIGltYWdlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgaW1hZ2VUaHVtYkFsdCk7XG4gICAgICBsaW5rRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIFwiI1wiKTtcbiAgICAgIGxpbmtFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRWxlbWVudCk7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmtFbGVtZW50KTtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1pbmRleFwiLCBpdGVtSW5kZXgpO1xuXG4gICAgICAvLyBzZXQgZmlyc3QgaW1hZ2UgdG8gc2VsZWN0ZWRcbiAgICAgIGluZGV4ID09PSB0aGlzLnN0YXRlUG9zaXRpb24uaW5kZXhTZWxlY3RlZCA/IGVsZW1lbnQuY2xhc3NOYW1lID0gXCJzZWxlY3RlZFwiIDogXCJcIjtcblxuICAgICAgLy8gYXBwZW5kIHRvIGZyYWdtZW50XG4gICAgICBmcmFnbWVudC5hcHBlbmQoZWxlbWVudCk7XG5cbiAgICB9KTtcblxuICAgIC8vIGluc2VydCBodG1sIGVsZW1lbnQgdG8gdGhlIGRvbSBhZnRlciBsb29wIGZpbmlzaGVzXG4gICAgdGhpcy50aHVtYnNDb250YWluZXIuYXBwZW5kKGZyYWdtZW50KTtcblxuICB9XG5cbiAgYnVpbGRUaHVtYnNDbGlja0hhbmRsZXIoIGNhbGxiYWNrICkge1xuXG4gICAgLy8gQWRkIGFycmF5IG9mIGh0bWwgb2JqZWN0IHRvIGF0dGFjaCBjbGljayBldmVudHMgdG8gbGF0ZXJcbiAgICB0aGlzLnRodW1ic0NsaWNrID0gdGhpcy50aHVtYnNDb250YWluZXIuZmluZChcImFcIik7XG5cbiAgICAvLyBDbGljayBoYW5kbGVyIGZvciBwcmV2aWV3IHRodW1icyBvbiBkZXNrdG9wLCBuZWVkcyB0byB3b3JrIG9uIHRhYmxldCAtPiBkZXNrdG9wXG4gICAgdGhpcy50aHVtYnNDbGljay5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuICAgICAgJChlbCkub24oXCJjbGlja1wiLCB7IGtleXM6IFwidGh1bWJuYWlsXCIgfSwgdGhpcy5hcnJvd0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfSk7XG5cbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgYW5pbWF0ZUluVGh1bWJzKCkge1xuICAgIFR3ZWVuTWF4LnRvKHRoaXMuc2hvd0Nhc2VUaHVtYnMsIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IDFcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVHYWxsZXJ5SW4oKSB7XG4gICAgVHdlZW5NYXgudG8odGhpcy5jb250YWluZXIuZmluZChcIi5zaG93Y2FzZV9fb3V0ZXItLWJnaW1hZ2VcIiksIC4zLCB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgZGVsYXk6IC43LFxuICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICB0aGlzLmFuaW1hdGVTaGFkb3dJbigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcblxuICAgIHRoaXMuc2V0Rmlyc3RTbGlkZSgpO1xuXG4gICAgLy8gSW5pdCBjb3JyZWN0IG5hdiBkZXBlbmRpbmcgb24gdmlld3BvcnQgc2l6ZVxuICAgIHRoaXMuY2hlY2tTaXplKCk7XG4gICAgdGhpcy51cGRhdGVEZXNjSGVpZ2h0KCk7XG4gICAgdGhpcy5wcmV2QnRuTW9iaWxlLm9uKFwiY2xpY2tcIiwgeyBrZXlzOiBcImxlZnRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm5leHRCdG5Nb2JpbGUub24oXCJjbGlja1wiLCB7IGtleXM6IFwicmlnaHRcIiB9LCB0aGlzLmFycm93SGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2l6ZS5iaW5kKHRoaXMpKTtcblxuXG4gICAgLy8gc2V0IHRvdGFsIHNsaWRlcyBudW1iZXJcbiAgICB0aGlzLmNvdW50VG90YWwuaHRtbChVdGlscy5zZXROdW1iZXIodGhpcy5nZXRUb3RhbFNsaWRlcygpKSk7XG5cbiAgICAvLyB1cGRhdGUgY291bnRlclxuICAgIHRoaXMuY3VycmVudENvdW50SXRlbS5odG1sKFV0aWxzLnNldE51bWJlcih0aGlzLmdldEN1cnJlbnRTbGlkZUNvdW50KCkpKTtcblxuICB9XG59XG5cbi8vIGxvb3AgdGhyb3VnaCBlYWNoIGhlYWRlciBzbGlkZXIgb2JqZWN0IG9uIHRoZSBwYWdlXG5jbGFzcyBTaG93Q2FzZVNMaWRlciB7XG5cbiAgaXRlbUluZm9XcmFwcGVyOiBKUXVlcnk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIgPSAkKFwiLnNob3djYXNlXCIpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNob3djYXNlIFNsaWRlciBpbml0XCIpO1xuXG4gICAgdGhpcy5pdGVtSW5mb1dyYXBwZXIuZWFjaCgoIGluZGV4OiBudW1iZXIsIGVsOiBPYmplY3QgKSA9PiB7XG5cbiAgICAgIC8vIFBhc3MgXCJ0aGlzXCIgdG8gZWFjaCBuZXcgSGVhZGVyIHNsaWRlciBjb21wb25lbnRcbiAgICAgIGxldCBzbGlkZXIgPSBuZXcgU2hvd2Nhc2VDb21wb25lbnQoZWwpO1xuICAgICAgc2xpZGVyLmluaXQoKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmxldCBTaG93Y2FzZVNsaWRlciA9IG5ldyBTaG93Q2FzZVNMaWRlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBTaG93Y2FzZVNsaWRlcjtcbiIsImNvbnN0ICQgPSBqUXVlcnk7XG5cbmltcG9ydCBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jbGFzcyBTdGlja3lTaWRlYmFyQ29tcG9uZW50IHtcblxuICBpc0FuaW1hdGluZzogYm9vbGVhbjtcbiAgY29udGVudFdyYXBwZXI6IEpRdWVyeTtcbiAgY29udGVudE9mZnNldFRvcDogbnVtYmVyO1xuICBjb250ZW50V3JhcHBlckhlaWdodDogbnVtYmVyO1xuICBzY3JvbGxUb3A6IG51bWJlcjtcbiAgYXNpZGU6IEpRdWVyeTtcbiAgc2lkZWJhcldyYXBwZXI6IEpRdWVyeTtcbiAgd2luZG93SGVpZ2h0OiBudW1iZXI7XG4gIHNpZGViYXJIZWlnaHQ6IG51bWJlcjtcbiAgZm9vdGVySGVpZ2h0OiBudW1iZXI7XG4gIHNjcm9sbGluZ0Rvd246IGJvb2xlYW47XG4gIGxhc3RTY3JvbGxUb3A6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlciA9ICQoXCIuc2lkZWJhci1jb250ZW50XCIpO1xuICAgIHRoaXMuYXNpZGUgPSAkKFwiLnNlcnZpY2Utc2lkZWJhci13cmFwcGVyXCIpO1xuICAgIHRoaXMud2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5zaWRlYmFyV3JhcHBlciA9ICQoXCIuc2VydmljZS1zaWRlYmFyXCIpO1xuICB9XG5cbiAgY2hlY2tTaWRlYmFyKCk6IHZvaWQge1xuICAgIC8vIENoZWNrIGlmIHRoZSBzaWRlYmFyIGlzIGZpeGVkIG9yIG5vdFxuICAgIGlmICggIXRoaXMuaXNBbmltYXRpbmcgJiYgVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpID9cbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpLCAzMDApIDpcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnVwZGF0ZVNpZGViYXJQb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2UgaWYgKCBVdGlscy5icmVha3BvaW50IDwgVXRpbHMuYnBzLmxhcHRvcCApIHtcbiAgICAgIHRoaXMucmVzZXRTaWRlQmFyKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tTaWRlYmFyVmlzaWJpbGl0eSgpIHtcblxuICAgIGlmICggVXRpbHMuYnJlYWtwb2ludCA+PSBVdGlscy5icHMubGFwdG9wICkge1xuXG4gICAgICAvLyBkb2VzIHNpZGViYXIgaGF2ZSBjbGFzcyB2aXNpYmlsaXR5XG4gICAgICBsZXQgaXNWaXNpYmxlID0gdGhpcy5hc2lkZS5oYXNDbGFzcygndmlzaWJsZScpO1xuXG4gICAgICBpZiAoICFpc1Zpc2libGUgKSB7XG5cbiAgICAgICAgdGhpcy5hbmltYXRlU2lkZWJhckluKHRoaXMuYXNpZGUpO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgfVxuXG4gIHJlc2V0U2lkZUJhcigpIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5hc2lkZS5yZW1vdmVDbGFzcyhcInN0aWNreVwiKTtcbiAgICB0aGlzLmFzaWRlLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcbiAgfVxuXG4gIHVwZGF0ZVNpZGViYXJQb3NpdGlvbigpOiB2b2lkIHtcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxEaXJlY3Rpb24oKTtcblxuICAgIHRoaXMuY2hlY2tTaWRlYmFyVmlzaWJpbGl0eSgpO1xuXG4gICAgLy8gZ2V0IGRpc3RhbmNlIGZyb20gdG9wIG9mIGNvbnRlbnQgMTAgKyA0MCA9IDUwIHBhZGRpbmcgdG9wXG4gICAgLy8gdGhpcy5jb250ZW50T2Zmc2V0VG9wID0gdGhpcy5jb250ZW50V3JhcHBlci5vZmZzZXQoKS50b3AgLSAxMDtcbiAgICB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgPSB0aGlzLmNvbnRlbnRXcmFwcGVyLm9mZnNldCgpLnRvcCArIDI1O1xuICAgIHRoaXMuc2lkZWJhckhlaWdodCA9IHRoaXMuYXNpZGUuaGVpZ2h0KCk7XG4gICAgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCA9IHRoaXMuY29udGVudFdyYXBwZXIub3V0ZXJIZWlnaHQoKTsgLy8gaW5jbHVkZSBwYWRkaW5nIGFuZCBtYXJnaW5cblxuXG4gICAgLy8gZ2V0IHdoZXJlIHRvcCBvZiB3aW5kb3cgaXNcbiAgICB0aGlzLnNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIkNvbnRlbnQgV3JhcHBlciBIZWlnaHRcIiwgdGhpcy5jb250ZW50V3JhcHBlckhlaWdodCk7XG4gICAgLy8gY29uc29sZS5sb2coXCJDb250ZW50IE9mZnNldFwiLCB0aGlzLmNvbnRlbnRPZmZzZXRUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2lkZWJhciBIZWlnaHRcIiwgdGhpcy5zaWRlYmFySGVpZ2h0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIldpbmRvdyBIZWlnaHRcIiwgdGhpcy53aW5kb3dIZWlnaHQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwib2Zmc2V0IFRvcFwiLCB0aGlzLmNvbnRlbnRPZmZzZXRUb3ApO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiU2Nyb2xsVG9wXCIsIHRoaXMuc2Nyb2xsVG9wKTtcbiAgICAvLyBjb25zb2xlLmxvZyhcIlNpZGViYXJvZmZzZXRcIiwgdGhpcy5zY3JvbGxUb3ApO1xuXG4gICAgLy8gSWYgdGhlIHdpbmRvdyBWIHBvc2l0aW9uIGlzIGxlc3MgdGhhbiB0aGUgY29udGVudCBWIHBvc2l0aW9uIG1ha2Ugc2lkZWJhciBub3JtYWxcbiAgICBpZiAoIHRoaXMuc2Nyb2xsVG9wIDwgdGhpcy5jb250ZW50T2Zmc2V0VG9wICkge1xuICAgICAgbGV0IGNzc1Byb3BzID0ge1xuICAgICAgICBcInRyYW5zaXRpb25cIjogXCJ0b3AgLjNzXCJcbiAgICAgIH07XG4gICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpO1xuICAgICAgdGhpcy5hc2lkZS5jc3MoY3NzUHJvcHMpO1xuXG4gICAgICAvLyBpZiB3aW5kb3cgViBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gY29udGVudCAtIGFkZCBzdGlja3lcbiAgICAgIC8vIDJuZCBjaGVja3MgdGhlIG9mZnNldCBvZiB0aGUgdG9wIG9mIHRoZSB3aW5kb3cgdG8gdGhlIHRvcCBvZiB0aGUgY29udGVudCAmJiB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbnRlbnQgaW4gcmVsYXRpb24gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSB3aW5kb3cgLSA0MCBvbiBlbmRcbiAgICB9IGVsc2UgaWYgKCB0aGlzLnNjcm9sbFRvcCA+PSB0aGlzLmNvbnRlbnRPZmZzZXRUb3AgJiYgdGhpcy5zY3JvbGxUb3AgPCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgdGhpcy5jb250ZW50T2Zmc2V0VG9wIC0gNTAgKSB7XG4gICAgICB0aGlzLmFzaWRlLmFkZENsYXNzKFwic3RpY2t5XCIpLmF0dHIoXCJzdHlsZVwiLCBcIlwiKTtcblxuICAgICAgaWYgKCB0aGlzLnNjcm9sbGluZ0Rvd24gPT09IHRydWUgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuY3NzKFwidHJhbnNpdGlvblwiLCBcInRvcCAuM3NcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFzaWRlLmNzcyhcInRyYW5zaXRpb25cIiwgXCJcIik7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbGV0IGFydGljbGVQYWRkaW5nVG9wID0gTnVtYmVyKGFydGljbGVzLmVxKDEpLmNzcyhcInBhZGRpbmctdG9wXCIpLnJlcGxhY2UoXCJweFwiLCBcIlwiKSk7XG4gICAgICBpZiAoIHRoaXMuYXNpZGUuaGFzQ2xhc3MoXCJzdGlja3lcIikgKSB7XG4gICAgICAgIHRoaXMuYXNpZGUuYXR0cihcInN0eWxlXCIsIFwiXCIpO1xuICAgICAgICB0aGlzLmFzaWRlLnJlbW92ZUNsYXNzKFwic3RpY2t5XCIpLmNzcyhcInRvcFwiLCB0aGlzLmNvbnRlbnRXcmFwcGVySGVpZ2h0IC0gdGhpcy5zaWRlYmFySGVpZ2h0ICsgMSArIFwicHhcIik7XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgfVxuXG4gIGNoZWNrU2Nyb2xsRGlyZWN0aW9uKCkge1xuICAgIC8vIExvZyBjdXJyZW50IHNjcm9sbFBvaW50XG4gICAgbGV0IHN0ID0gJCh0aGlzKS5zY3JvbGxUb3AoKTtcblxuICAgIC8vIGNvbXBhcmUgdG8gbGFzdCBzY3JvbGxQb2ludFxuICAgIGlmICggc3QgPiB0aGlzLmxhc3RTY3JvbGxUb3AgKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhcInNjcm9sbCBkb3duXCIpO1xuICAgICAgLy8gZG93bnNjcm9sbCBjb2RlXG4gICAgICB0aGlzLnNjcm9sbGluZ0Rvd24gPSB0cnVlO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwic2Nyb2xsIHVwXCIpO1xuICAgICAgLy8gdXBzY3JvbGwgY29kZVxuICAgICAgdGhpcy5zY3JvbGxpbmdEb3duID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gb24gY29tcGxldGUgLSBtYWtlIGxhc3QgU2Nyb2xsIHBvaW50IHRoZSBwb2ludCBhdCB3aGljaCB0aGV5IHN0YXJ0ZWQgc2Nyb2xsaW5nIGF0IGZpcnN0XG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gc3Q7XG4gIH1cblxuICBhbmltYXRlU2lkZWJhckluKCBlbGVtZW50OiBKUXVlcnkgKSB7XG5cbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzKFwiaW50cm9cIik7XG5cbiAgICBpZiAoIFV0aWxzLmJyZWFrcG9pbnQgPj0gVXRpbHMuYnBzLmxhcHRvcCApIHtcblxuICAgICAgbGV0IHNpZGViYXJJbnRybyA9IFR3ZWVuTWF4LnRvKGVsZW1lbnQsIC4zLCB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIHo6IC4wMDEsXG4gICAgICAgIGVhc2U6IEN1YmljLmVhc2VPdXQsXG4gICAgICAgIGRlbGF5OiAuOSxcbiAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIC8vIG1ha2Ugc2lkZWJhciBwZXJtYW5lbnRseSB2aXNpYmxlXG4gICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInZpc2libGVcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIlN0aWNreSBzaWRlYmFyIGxvYWRlZFwiKTtcblxuICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IDA7XG5cbiAgICBpZiAoIHRoaXMuYXNpZGUubGVuZ3RoID4gMCApIHtcbiAgICAgIHRoaXMuY2hlY2tTaWRlYmFyKCk7XG5cbiAgICAgICQod2luZG93KS5vbihcInNjcm9sbFwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcbiAgICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLmNoZWNrU2lkZWJhci5iaW5kKHRoaXMpKTtcblxuICAgICAgLy8gQW5pbWF0ZSBzaWRlIGJhciBpbiBvbiBsb2FkXG4gICAgICB0aGlzLmFuaW1hdGVTaWRlYmFySW4odGhpcy5hc2lkZSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBBbmltYXRlIHNpZGUgYmFyIGluIG9uIGxvYWRcbiAgICAgIHRoaXMuYW5pbWF0ZVNpZGViYXJJbigkKFwiLnNlcnZpY2Utc2lkZWJhci1ub3N0aWNrXCIpKTtcblxuICAgIH1cbiAgfVxufVxuXG5sZXQgU3RpY2t5U2lkZWJhciA9IG5ldyBTdGlja3lTaWRlYmFyQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFN0aWNreVNpZGViYXI7IiwiY29uc3QgJCA9IGpRdWVyeTtcbmNsYXNzIFRlc3RpbW9uYWlsQ29tcG9uZW50IHtcblxuICB0ZXN0aW1vbmFpbHM6IEpRdWVyeTtcbiAgcmVzaXplVGltZXI6IG51bWJlcjtcbiAgY3VycmVudEhlaWdodDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVzdGltb25haWxzID0gJChcIi50ZXN0aW1vbmlhbHNcIik7XG4gIH1cblxuICBnZW5lcmF0ZUlkKCBpbmRleCwgZWwgKSB7XG5cbiAgICAvLyBjcmVhdGUgRHluYW1pYyBJRFxuICAgIGxldCBpZFN0cmluZyA9IFwiY2Fyb3VzZWwtdGVzdGltb25pYWwtXCIgKyBpbmRleDtcbiAgICBlbC5hdHRyKFwiaWRcIiwgaWRTdHJpbmcpO1xuXG4gICAgLy8gQWRkIG1hdGNoaW5nIGhyZWYgdG8gY29udHJvbHNcbiAgICBsZXQgY29udHJvbHMgPSBlbC5maW5kKFwiLmNhcm91c2VsLWNvbnRyb2xcIik7XG4gICAgY29udHJvbHMuZWFjaCgoIGluZGV4LCBlbCApID0+IHtcblxuICAgICAgJChlbCkuYXR0cihcImhyZWZcIiwgXCIjXCIgKyBpZFN0cmluZyk7XG5cbiAgICB9KTtcblxuICB9XG5cbiAgb25SZXNpemUoKSB7XG5cbiAgICAvLyBPbiByZXNpemUgZW5kIC0gY2hlY2sgdG8gZW5hYmxlIGNsaWNrcyBmb3IgZGVza3RvcCBvciByZW1vdmUgdGhlbVxuICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2l6ZVRpbWVyKTtcbiAgICB0aGlzLnJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgIC8vIENoYW5nZSBIZWlnaHQgb24gcmVzaXplXG4gICAgICB0aGlzLnRlc3RpbW9uYWlscy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAgIGxldCAkdGhpcyA9ICQoZWwpO1xuXG4gICAgICAgIC8vIGVzdGFibGlzaCB2YXJzXG4gICAgICAgIGxldCAkaW5uZXIgPSAkdGhpcy5maW5kKFwiLmNhcm91c2VsLWlubmVyXCIpLFxuICAgICAgICAgICAgJGFjdGl2ZSA9ICRpbm5lci5maW5kKFwiLmFjdGl2ZVwiKSxcbiAgICAgICAgICAgIGJsb2NrSXRlbSA9ICRhY3RpdmUuZmluZChcImJsb2NrcXVvdGVcIik7XG5cbiAgICAgICAgLy8gU2V0IGhlaWdodCBmb3IgZmlyc3QgaXRlbVxuICAgICAgICBsZXQgaGVpZ2h0ID0gYmxvY2tJdGVtLm91dGVySGVpZ2h0KCk7XG5cbiAgICAgICAgLy8gaWYgdGhleSBhcmVuJ3QgZXF1YWwsIGNoYW5nZSB0aGVtXG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50SGVpZ2h0ICE9PSBoZWlnaHQgKSB7XG4gICAgICAgICAgJGlubmVyLmNzcyhcImhlaWdodFwiLCBoZWlnaHQpO1xuICAgICAgICAgIHRoaXMuY3VycmVudEhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgIH0sIDQwMCk7XG4gIH1cblxuICBpbml0KCkge1xuXG4gICAgY29uc29sZS5sb2coXCJUZXN0aW1vbmlhbHMgSW5pdFwiKTtcblxuICAgIC8vIE1ha2UgaXRlbXMgZHluYW1pY1xuICAgIHRoaXMudGVzdGltb25haWxzLmVhY2goKCBpbmRleCwgZWwgKSA9PiB7XG4gICAgICBsZXQgJHRoaXMgPSAkKGVsKTtcbiAgICAgIHRoaXMuZ2VuZXJhdGVJZChpbmRleCwgJHRoaXMpO1xuXG4gICAgICAvLyBtYWtlIGZpcnN0IGVsZW1lbnQgYWN0aXZlXG4gICAgICBsZXQgJGlubmVyID0gJHRoaXMuZmluZChcIi5jYXJvdXNlbC1pbm5lclwiKTtcbiAgICAgIGxldCAkZmlyc3QgPSAkaW5uZXIuY2hpbGRyZW4oXCIuaXRlbVwiKS5maXJzdCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuXG4gICAgICAvLyBTZXQgaGVpZ2h0IGZvciBmaXJzdCBpdGVtXG4gICAgICBsZXQgaGVpZ2h0ID0gJGZpcnN0Lm91dGVySGVpZ2h0KCk7XG4gICAgICB0aGlzLmN1cnJlbnRIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAkaW5uZXIuY3NzKFwiaGVpZ2h0XCIsIGhlaWdodCk7XG5cbiAgICB9KTtcblxuICAgIC8vIFN0YXJ0IFNsaWRlcnNcbiAgICB0aGlzLnRlc3RpbW9uYWlscy5lYWNoKCggaW5kZXgsIGVsICkgPT4ge1xuXG4gICAgICAvLyBpbml0IGNhcm91c2VsXG4gICAgICAkKGVsKS5jYXJvdXNlbCgpO1xuXG4gICAgICAvLyBPbiBzbGlkZSBjaGFuZ2UgaGVpZ2h0IGZvciBzbW9vdGggdHJhbnNpdGlvbnNcbiAgICAgICQoZWwpLm9uKFwic2xpZC5icy5jYXJvdXNlbFwiLCAoIGUgKSA9PiB7XG5cbiAgICAgICAgLy8gc2xpZGVcbiAgICAgICAgbGV0ICR0aGlzID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBsZXQgY3VycmVudFNsaWRlID0gJCgkdGhpcykuZmluZChcIi5hY3RpdmVcIik7XG4gICAgICAgIGxldCBibG9ja0l0ZW0gPSBjdXJyZW50U2xpZGUuZmluZChcImJsb2NrcXVvdGVcIik7XG4gICAgICAgIGxldCBoZWlnaHQgPSBibG9ja0l0ZW0ub3V0ZXJIZWlnaHQoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBjdXJyZW50U2xpZGUucGFyZW50KFwiLmNhcm91c2VsLWlubmVyXCIpLmNzcyhcImhlaWdodFwiLCBoZWlnaHQpO1xuXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGFkanVzdCBzaXplIG9uIHJlc2l6ZVxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuICB9XG5cbn1cblxuY29uc3QgVGVzdGltb25haWxzID0gbmV3IFRlc3RpbW9uYWlsQ29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRlc3RpbW9uYWlsczsiLCJpbXBvcnQge0Jwc0ludGVyZmFjZX0gZnJvbSBcIi4uL2ludGVyZmFjZXMvYnBzLmludGVyZmFjZVwiO1xuY29uc3QgJCA9IGpRdWVyeTtcblxuLy8gQWRkIGludGVyZmFjZSBKUXVlcnlTbW9vdGgge1xuLy8gc21vb3RoU3RhdGUoKTp2b2lkO1xuLy8gfVxuLy8gc21vb3RoU3RhdGUoYXJnOiBPYmplY3QpOiBKUXVlcnk7XG5cbmNsYXNzIFV0aWxpdHlDb21wb25lbnQge1xuICB3aW5kb3dXaWR0aDogbnVtYmVyO1xuICBicmVha3BvaW50OiBudW1iZXI7XG4gIGJyZWFrcG9pbnRzOiBudW1iZXJbXTtcbiAgYnBzOiBCcHNJbnRlcmZhY2U7XG4gIGJyb3dzZXI6IHN0cmluZztcblxuICBwcml2YXRlIF9zZXRCcmVha3BvaW50cyA9ICggYnBzOiBCcHNJbnRlcmZhY2UgKSA9PiB7XG4gICAgbGV0IGFyciA9IFtdO1xuXG4gICAgZm9yICggbGV0IGtleSBpbiBicHMgKSB7XG4gICAgICBpZiAoIGJwcy5oYXNPd25Qcm9wZXJ0eShrZXkpICkge1xuICAgICAgICBhcnIucHVzaChicHNbIGtleSBdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyLnJldmVyc2UoKTtcbiAgfTtcbiAgcHJpdmF0ZSBfY2hlY2tCcmVha3BvaW50ID0gKCkgPT4ge1xuICAgIC8vIG1ha2UgYnJlYWtwb2ludCBldmVudCBhdmFpbGFibGUgdG8gYWxsIGZpbGVzIHZpYSB0aGUgd2luZG93IG9iamVjdFxuICAgIGxldCBvbGRfYnJlYWtwb2ludCA9IHRoaXMuYnJlYWtwb2ludDtcblxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcblxuICAgIGlmICggb2xkX2JyZWFrcG9pbnQgIT09IHRoaXMuYnJlYWtwb2ludCApIHtcblxuICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoXCJicmVha3BvaW50Q2hhbmdlXCIsIFV0aWxzLmJyZWFrcG9pbnQpO1xuICAgIH1cbiAgfTtcbiAgcHJpdmF0ZSBfc2V0QnJlYWtwb2ludCA9ICgpID0+IHtcbiAgICAvLyBnZXQgYnJlYWtwb2ludCBmcm9tIGNzc1xuICAgIGNvbnNvbGUubG9nKCQoJ2JvZHknKS5jc3MoXCJ6LWluZGV4XCIpKTtcblxuICAgIGxldCBib2R5ID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KSxcbiAgICAgIHppbmRleCA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbIFwiei1pbmRleFwiIF07XG5cbiAgICB0aGlzLmJyZWFrcG9pbnQgPSBwYXJzZUludCh6aW5kZXgsIDEwKTtcbiAgfTtcbiAgcHJpdmF0ZSBfc2V0V2luZG93V2lkdGggPSAoKSA9PiB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICB9O1xuXG4gIHNldE51bWJlciggY291bnQ6IG51bWJlciApOiBzdHJpbmcge1xuICAgIC8vIGNvbnZlciBudW1iZXIgdG8gc3RyaW5nXG4gICAgbGV0IHRvdGFsID0gY291bnQ7XG4gICAgcmV0dXJuIHRvdGFsLnRvU3RyaW5nKCk7XG4gIH1cblxuICB3aGljaEJyb3dzZXIoKSB7XG4gICAgaWYgKCAobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJzYWZhcmlcIikgPiAtMSkgJiYgIShcbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKFwiY2hyb21lXCIpID4gLTEpICYmIChuYXZpZ2F0b3IuYXBwTmFtZSA9PT1cbiAgICAgIFwiTmV0c2NhcGVcIikgKSB7XG5cbiAgICAgIGlmICggbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBhZC9pKSAhPT0gbnVsbCApIHtcbiAgICAgICAgcmV0dXJuIFwiaXBhZFwiO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJzYWZhcmlcIjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBidWlsZEh0bWwoIHR5cGU6IHN0cmluZywgYXR0cnM/OiBPYmplY3QsIGh0bWw/OiBzdHJpbmcgKSB7XG4gICAgXG4gICAgLy8gaHR0cDovL21hcmNncmFiYW5za2kuY29tL2J1aWxkaW5nLWh0bWwtaW4tanF1ZXJ5LWFuZC1qYXZhc2NyaXB0L1xuICAgIFxuICAgIGxldCBoID0gJzwnICsgdHlwZTtcblxuICAgIGZvciAoIGxldCBhdHRyIGluIGF0dHJzICkge1xuICAgICAgaWYgKCBhdHRyc1sgYXR0ciBdID09PSBmYWxzZSApIGNvbnRpbnVlO1xuICAgICAgaCArPSAnICcgKyBhdHRyICsgJz1cIicgKyBhdHRyc1sgYXR0ciBdICsgJ1wiJztcbiAgICB9XG5cbiAgICByZXR1cm4gaCArPSBodG1sID8gXCI+XCIgKyBodG1sICsgXCI8L1wiICsgdHlwZSArIFwiPlwiIDogXCIvPlwiO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IDA7XG4gICAgdGhpcy5icmVha3BvaW50ID0gMzIwO1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSBbXTtcbiAgICB0aGlzLmJwcyA9IHtcbiAgICAgIG1vYmlsZTogNTQ0LFxuICAgICAgdGFibGV0OiA3NjgsXG4gICAgICBsYXB0b3A6IDk5MixcbiAgICAgIGRlc2t0b3A6IDEyMDAsXG4gICAgICBkZXNrdG9wX3hsOiAxNjAwXG4gICAgfTtcbiAgICB0aGlzLmJyb3dzZXIgPSB0aGlzLndoaWNoQnJvd3NlcigpO1xuICB9XG5cbiAgaW5pdCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhcIlV0aWxpdGllcyBsb2FkZWRcIik7XG5cbiAgICAvLyBzZXQgYnJlYWtwb2ludCBvbiB3aW5kb3cgbG9hZFxuICAgIHRoaXMuX3NldEJyZWFrcG9pbnQoKTtcbiAgICB0aGlzLl9zZXRXaW5kb3dXaWR0aCgpO1xuICAgIGNvbnNvbGUubG9nKFwiQ3VycmVudCBCcmVha3BvaW50IGlzOlwiLCB0aGlzLmJyZWFrcG9pbnQpO1xuXG4gICAgLy8gY3JlYXRlIGZ1bGwgYXJyYXkgZm9yIGltYWdlIGNvbXByZXNzaW9uIHJlZlxuICAgIHRoaXMuYnJlYWtwb2ludHMgPSB0aGlzLl9zZXRCcmVha3BvaW50cyh0aGlzLmJwcyk7XG5cbiAgICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgdGhpcy5fY2hlY2tCcmVha3BvaW50KS5iaW5kKHRoaXMpO1xuICB9XG59XG5cbmxldCBVdGlscyA9IG5ldyBVdGlsaXR5Q29tcG9uZW50KCk7XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzOyJdfQ==
