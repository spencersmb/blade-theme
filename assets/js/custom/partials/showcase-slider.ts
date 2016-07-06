const $ = jQuery;
import Utils from "./utils";

interface ShowcaseSliderInterface {
  desktopPos: number;
  tabletPos: number;
}

class ShowcaseComponent {
  container: JQuery;
  resizeTimer: number;
  nextBtnMobile: JQuery;
  prevBtnMobile: JQuery;
  nextBtn: JQuery;
  prevBtn: JQuery;
  currentSlide: number;
  index: number;
  gallery: JQuery;
  desc: JQuery;
  thumbsContainer: JQuery;
  thumbsClick: JQuery;
  closeBtn: JQuery;
  countTotal: JQuery;
  currentCountItem: JQuery;
  showCaseThumbs: JQuery;
  thumbsPosition: ShowcaseSliderInterface;
  thumbScaleTop: number;
  thumbScaleLeft: number;

  constructor( el: Object ) {
    this.container = $(el);
    this.prevBtnMobile = $(".showcase__nav--prev");
    this.nextBtnMobile = $(".showcase__nav--next");
    this.prevBtn = $(".showcase__thumbsnav--prev");
    this.nextBtn = $(".showcase__thumbsnav--next");
    this.currentSlide = 1;
    this.gallery = $(".showcase__slider--gallery");
    this.desc = $(".showcase__desc");
    this.countTotal = $(".total");
    this.currentCountItem = $(".current");
    this.index = 0;
    this.thumbsContainer = $(".showcase__thumbs--images");
    this.showCaseThumbs = $(".showcase__thumbs");
    this.thumbScaleTop = 130;
    this.thumbScaleLeft = 75;
    this.thumbsPosition = {
      desktopPos: 118,
      tabletPos: this.thumbScaleLeft
    };

  }

  setFirstSlideElement(): void {
    $(".showcase__items--container").children(".showcase__item").first().addClass("selected");
  }

  getCurrentSlideElement(): JQuery {
    return this.gallery.find(".selected");
  }

  getCurrentNavElement(): JQuery {
    return this.thumbsContainer.find(".selected");
  }

  getCurrentDescElement(): JQuery {
    return this.desc.find(".selected");
  }

  getTotalSlides(): number {
    let count = this.gallery.children("li").length;
    return count;
  }

  updateMobileNav( index: number, selected: JQuery ) {

    // Enable/Disable arrow btns
    this.prevBtnMobile.parent("li").toggleClass("slider-hidden", selected.is(":first-child"));
    this.nextBtnMobile.parent("li").toggleClass("slider-hidden", selected.is(":last-child"));

  }

  updateCurrentSlide( event: string ) {

    if ( event === "right" ) {
      this.index++;
      this.currentSlide++;
    } else {
      this.index--;
      this.currentSlide--;
    }

  }

  getCurrentSlideCount(): number {
    return this.currentSlide;
  }

  updateSlide( direction: string ) {

    let currentSlide = this.getCurrentSlideElement();

    if ( direction === "right" ) {
      // remove currently selected class, then move left
      currentSlide.removeClass("selected").addClass("left");
      currentSlide.next().addClass("selected");
    } else {
      // remove currently selected class, then move left
      currentSlide.removeClass("selected");
      currentSlide.prev().addClass("selected").removeClass("left");
    }

    // update index
    this.updateCurrentSlide(direction);

    // update Navigation
    this.updateMobileNav(this.index, this.getCurrentSlideElement());
  }

  updateDescHeight( direction?: string, selected?: JQuery ) {

    // direction
    if ( direction ) {

      let height = selected.outerHeight();
      TweenMax.to(this.desc, .3, {
          height: height,
          ease: Cubic.easeOut
        }
      );

    } else {

      // get current slide
      let currentSlide = this.getCurrentDescElement();
      let height = currentSlide.outerHeight();
      this.desc.height(height);

    }

  }

  updateDesc( direction: string ) {
    let currentSlide = this.getCurrentDescElement();

    if ( direction === "right" ) {

      // remove currently selected class, then move left
      let next = currentSlide.next();

      currentSlide.addClass("left").removeClass("selected");
      currentSlide.next().addClass("selected");

      this.updateDescHeight("right", next);


    } else {

      let prev = currentSlide.prev();
      // remove currently selected class, then move left
      currentSlide.removeClass("selected");
      prev.addClass("selected").removeClass("left");

      this.updateDescHeight("left", prev);

    }

  }

  updateThumbsnav( direction: string ) {

    let currentSlide = this.getCurrentNavElement();

    if ( Utils.breakpoint < Utils.bps.laptop ) {

      /*
       * TABLET THUMB SELECT
       */

      if ( direction === "right" ) {

        currentSlide.removeClass("selected");
        currentSlide.next().addClass("selected");

        // update the position controller
        this.thumbsPosition.tabletPos = this.thumbsPosition.tabletPos - this.thumbScaleLeft;
        // update html element
        TweenMax.to(this.thumbsContainer, .1, {
          z: .001,
          x: this.thumbsPosition.tabletPos,
          ease: Cubic.easeIn
        });

        // update the desktop version
        this.thumbsPosition.desktopPos = this.thumbsPosition.desktopPos - this.thumbScaleTop;

      } else {

        currentSlide.removeClass("selected");
        currentSlide.prev().addClass("selected");

        this.thumbsPosition.tabletPos = this.thumbsPosition.tabletPos + this.thumbScaleLeft;
        TweenMax.to(this.thumbsContainer, .1, {
          z: .001,
          x: this.thumbsPosition.tabletPos,
          ease: Cubic.easeIn
        });

        // update the desktop version
        this.thumbsPosition.desktopPos = this.thumbsPosition.desktopPos + this.thumbScaleTop;

      }


    } else {

      /*
       * DESKTOP THUMB SELECT
       */
      if ( direction === "right" ) {

        currentSlide.removeClass("selected");
        currentSlide.next().addClass("selected");

        // update the position controller
        this.thumbsPosition.desktopPos = this.thumbsPosition.desktopPos - this.thumbScaleTop;

        // update html element
        TweenMax.to(this.thumbsContainer, .1, {
            z: .001,
            y: this.thumbsPosition.desktopPos,
            ease: Cubic.easeIn
          }
        );

        // update tablet version position
        this.thumbsPosition.tabletPos = this.thumbsPosition.tabletPos - this.thumbScaleLeft;

      } else {

        currentSlide.removeClass("selected");
        currentSlide.prev().addClass("selected");

        this.thumbsPosition.desktopPos = this.thumbsPosition.desktopPos + this.thumbScaleTop;
        TweenMax.to(this.thumbsContainer, .1, {
            z: .001,
            y: this.thumbsPosition.desktopPos,
            ease: Cubic.easeIn
          }
        );

        // update tablet version position
        this.thumbsPosition.tabletPos = this.thumbsPosition.tabletPos + this.thumbScaleLeft;

      }

    }

  }

  checkThumbsNav( size: string ) {

    if ( size === "mobile" ) {

      TweenMax.to(this.thumbsContainer, .1, {
          z: .001,
          y: 0,
          x: this.thumbsPosition.tabletPos,
          ease: Cubic.easeOut
        }
      );

    } else {

      TweenMax.to(this.thumbsContainer, .1, {
          z: .001,
          y: this.thumbsPosition.desktopPos,
          x: 0,
          ease: Cubic.easeOut
        }
      );

    }

  }

  arrowHandler( event: any ) {
    event.preventDefault();

    let $el = $(event.currentTarget); // a tag
    let thumbIndex = $el.parent("li").data("index");
    let prevEl = this.thumbsContainer.find(".selected");
    let prevIndex = prevEl.data("index");

    // Slider can move right because current slide is not the last slide
    if ( event.data.keys === "right" && this.currentSlide !== this.getTotalSlides() ) {

      this.updateSlide("right");
      this.updateDesc("right");
      this.updateThumbsnav("right");
      this.animateShadowInOut();


    } else if ( event.data.keys === "left" && this.currentSlide !== 1 ) {
      // Else if its not the first slide - move left
      this.updateSlide("left");
      this.updateDesc("left");
      this.updateThumbsnav("left");
      this.animateShadowInOut();

    }
    else if ( event.data.keys === "thumbnail" &&
      prevIndex < thumbIndex &&
      thumbIndex + 1 !== this.getTotalSlides
    ) {
      // update thumbs nav
      this.updateThumbsnav("right");
      this.updateSlide("right");
      this.updateDesc("right");
      this.animateShadowInOut();

    }
    else if ( event.data.keys === "thumbnail" && prevIndex > thumbIndex
    ) {
      // update thumbs nav
      this.updateThumbsnav("left");
      this.updateSlide("left");
      this.updateDesc("left");
      this.animateShadowInOut();

    }

    // update counter
    this.currentCountItem.html(Utils.setNumber(this.getCurrentSlideCount()));

  }

  checkSize() {

    // On resize end - check to enable clicks for desktop or remove them
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {

      // if Tablet or smaller - bind mobile nav arrows
      if ( Utils.breakpoint < Utils.bps.laptop ) {

        // adjust css sizing for thumbs nav on position resize
        this.checkThumbsNav("mobile");

      } else {

        this.checkThumbsNav("desktop");

      }

    }, 400);

  }

  animateShadowInOut() {

    // remove dropshadow
    TweenMax.to(this.gallery, 0, {
      boxShadow: "0px 18px 94px -16px rgba(0,0,0,0.0)"
    });


    TweenMax.to(this.gallery, .1, {
      boxShadow: "0px 18px 94px -16px rgba(0,0,0,0.68)",
      delay: .3
    });


  }

  buildThumbs() {

    let fragment = $(document.createDocumentFragment());
    // build loop for images
    this.gallery.find("li").each( ( index: number, el: Object ) => {

      // create html elements
      let itemIndex = Utils.setNumber(index),
        imageThumbUrl = $(el).data("thumb"),
        imageElement = document.createElement("img"),
        linkElement = document.createElement("a"),
        element = document.createElement("li");

      // add src and attr to image
      imageElement.setAttribute("src", imageThumbUrl);
      linkElement.setAttribute("href", "#");
      linkElement.appendChild(imageElement);
      element.appendChild(linkElement);
      element.setAttribute("data-index", itemIndex);

      // set first image to selected
      index === 0 ? element.className = "selected" : "";

      // append to fragment
      fragment.append(element);

    });

    // insert html element to the dom after loop finishes
    this.thumbsContainer.append(fragment);

    // Add array of html object to attach click events to later
    this.thumbsClick = this.thumbsContainer.find("a");

  }

  buildThumbsClickHandler( callback ) {
    // Click handler for preview thumbs on desktop, needs to work on tablet -> desktop
    this.thumbsClick.each(( index, el ) => {
      console.log(el);
      $(el).on("click", { keys: "thumbnail" }, this.arrowHandler.bind(this));
    });

    callback();
  }

  animateInThumbs() {
    TweenMax.to(this.showCaseThumbs, .3, {
      opacity: 1,
      delay: .7
    });
  }

  init() {

    // Build thumbnails
    this.buildThumbs();

    // Init correct nav depending on viewport size
    this.checkSize();
    this.updateDescHeight();
    this.prevBtnMobile.on("click", { keys: "left" }, this.arrowHandler.bind(this));
    this.nextBtnMobile.on("click", { keys: "right" }, this.arrowHandler.bind(this));

    $(window).on("resize", this.checkSize.bind(this));

    // Set Current Slide, which is always the first slide to selected - onLoad
    this.updateMobileNav(this.index, this.getCurrentSlideElement());

    // set total slides number
    this.countTotal.html(Utils.setNumber(this.getTotalSlides()));

    // add click events to thumbnail images
    this.buildThumbsClickHandler(this.animateInThumbs.bind(this));


  }
}

// loop through each header slider object on the page
class ShowCaseSLider {

  itemInfoWrapper: JQuery;

  constructor() {
    this.itemInfoWrapper = $(".showcase");
  }

  init() {
    console.log("Showcase Slider init");

    this.itemInfoWrapper.each(( index: number, el: Object ) => {

      console.log(typeof el);
      // Pass "this" to each new Header slider component
      let slider = new ShowcaseComponent(el);
      slider.init();
    });
  }

}

let ShowcaseSlider = new ShowCaseSLider();

export default ShowcaseSlider;
