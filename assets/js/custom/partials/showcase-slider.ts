const $ = jQuery;
import Utils from "./utils";

interface ShowcaseSliderInterface {
  desktopPos: number;
  tabletPos: number;
  indexSelected: number;
  currentSlide: number;
}

class ShowcaseComponent {
  container: JQuery;
  resizeTimer: number;
  nextBtnMobile: JQuery;
  prevBtnMobile: JQuery;
  nextBtn: JQuery;
  prevBtn: JQuery;
  index: number;
  gallery: JQuery;
  desc: JQuery;
  thumbsContainer: JQuery;
  gradients: JQuery;
  thumbsClick: JQuery;
  closeBtn: JQuery;
  countTotal: JQuery;
  currentCountItem: JQuery;
  showCaseThumbs: JQuery;
  statePosition: ShowcaseSliderInterface;
  thumbScaleTop: number;
  thumbScaleLeft: number;

  constructor( el: Object ) {
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

  setFirstSlide() {

    // loop through images and set active element
    let firstImage = this.gallery.find("li[data-index=" + this.statePosition.indexSelected + "]");
    firstImage.addClass("selected");

    this.animateGalleryIn();

    // loop through desc and set active element
    let firstDesc = this.desc.find(".showcase__desc--item[data-index=" + this.statePosition.indexSelected + "]");
    firstDesc.addClass("selected");

    // Build thumbnails
    this.buildThumbs();

    // Set Current Slide, which is always the first slide to selected - onLoad
    this.updateMobileNav(this.getCurrentSlideElement());

    // add click events to thumbnail images, then when finished animate in with callback
    this.buildThumbsClickHandler(this.animateInThumbs.bind(this));

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

  updateMobileNav( selected: JQuery ) {

    // Enable/Disable arrow btns
    this.prevBtnMobile.parent("li").toggleClass("slider-hidden", selected.is(":first-child"));
    this.nextBtnMobile.parent("li").toggleClass("slider-hidden", selected.is(":last-child"));

  }

  updateState( index: number ) {

    this.statePosition.indexSelected = index;
    this.statePosition.currentSlide = index + 1;

  }

  getCurrentSlideCount(): number {
    return this.statePosition.currentSlide;
  }

  updateSlide( direction: string ) {

    // get current selected and find the match to the next el
    let currentSlide = this.getCurrentSlideElement();
    let nextSlide = this.gallery.find("li[data-index=" + this.statePosition.indexSelected + "]");

    if ( direction === "right" ) {
      // add left to all slides prev, in-case you skipped over one
      currentSlide.removeClass("selected");
      nextSlide.addClass("selected");
      nextSlide.prevAll().addClass("left");
      nextSlide.nextAll().removeClass("left");
    } else {
      // add left to all slides prev, in-case you skipped over one
      currentSlide.removeClass("selected");
      nextSlide.addClass("selected").removeClass("left");
      nextSlide.prevAll().addClass("left");
      nextSlide.nextAll().removeClass("left");
    }

    // update Navigation check
    this.updateMobileNav(this.getCurrentSlideElement());
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
    let nextSlide = this.desc.find(".showcase__desc--item[data-index=" + this.statePosition.indexSelected + "]");

    if ( direction === "right" ) {

      // add left to all slides prev, in-case you skipped over one
      currentSlide.removeClass("selected");
      nextSlide.addClass("selected");
      nextSlide.prevAll().addClass("left");
      nextSlide.nextAll().removeClass("left");

      this.updateDescHeight("right", nextSlide);

    } else {

      // add left to all slides prev, in-case you skipped over one
      currentSlide.removeClass("selected");
      nextSlide.addClass("selected").removeClass("left");
      nextSlide.prevAll().addClass("left");
      nextSlide.nextAll().removeClass("left");

      this.updateDescHeight("left", nextSlide);

    }

  }

  updateThumbsnav( direction: string ) {

    let currentSlide = this.getCurrentNavElement();
    let nextSlide = this.thumbsContainer.find("li[data-index=" + this.statePosition.indexSelected + "]");

    if ( Utils.breakpoint < Utils.bps.laptop ) {

      /*
       * TABLET THUMB SELECT
       */

      if ( direction === "right" ) {
        currentSlide.removeClass("selected");
        nextSlide.addClass("selected");

        if ( this.statePosition.currentSlide >= 4 && this.statePosition.currentSlide < this.getTotalSlides() ) {
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


      } else {
        // Move left
        currentSlide.removeClass("selected");
        nextSlide.addClass("selected");

        // dont move group just yet if you are on 2nd to last slide moving back up
        if ( this.statePosition.currentSlide === (this.getTotalSlides() - 1 ) ) {
          // console.log(" 2nd to last item");
          return;
        }


        if ( this.statePosition.tabletPos !== 0 && this.statePosition.currentSlide !== 1 ) {

          this.statePosition.tabletPos = this.statePosition.tabletPos + this.thumbScaleLeft;
          TweenMax.to(this.thumbsContainer, .1, {
            z: .001,
            x: this.statePosition.tabletPos,
            ease: Cubic.easeIn
          });

        }

        if ( this.statePosition.desktopPos !== 0 && this.statePosition.currentSlide !== 1 ) {
          // update the state
          this.statePosition.desktopPos = this.statePosition.desktopPos + this.thumbScaleTop;
        }

      }

    } else {

      /*
       * DESKTOP THUMB SELECT
       */
      if ( direction === "right" ) {
        console.log("down");
        currentSlide.removeClass("selected");
        nextSlide.addClass("selected");

        // detecting if slide should move or not
        if ( this.statePosition.currentSlide >= 4 && this.statePosition.currentSlide < this.getTotalSlides() ) {
          // update the position controller
          this.statePosition.desktopPos = this.statePosition.desktopPos - this.thumbScaleTop;
          this.statePosition.tabletPos = this.statePosition.tabletPos - this.thumbScaleLeft;

          // move slider
          TweenMax.to(this.thumbsContainer, .1, {
              z: .001,
              y: this.statePosition.desktopPos,
              ease: Cubic.easeIn
            }
          );

        }

      } else {

        currentSlide.removeClass("selected");
        nextSlide.addClass("selected");

        // dont move group just yet if you are on 2nd to last slide moving back up
        if ( this.statePosition.currentSlide === (this.getTotalSlides() - 1 ) ) {
          return;
        }

        if ( this.statePosition.desktopPos !== 0 && this.statePosition.currentSlide !== 1 ) {

          this.statePosition.desktopPos = this.statePosition.desktopPos + this.thumbScaleTop;
          TweenMax.to(this.thumbsContainer, .1, {
              z: .001,
              y: this.statePosition.desktopPos,
              ease: Cubic.easeIn
            }
          );

        }

        // seperate tablet looking at should it update tablet state
        if ( this.statePosition.tabletPos !== 0 && this.statePosition.currentSlide !== 1 ) {

          this.statePosition.tabletPos = this.statePosition.tabletPos + this.thumbScaleLeft;

        }

      }

    }

  }

  checkThumbsNav( size: string ) {

    if ( size === "mobile" ) {

      TweenMax.to(this.thumbsContainer, .1, {
          z: .001,
          y: 0,
          x: this.statePosition.tabletPos,
          ease: Cubic.easeOut
        }
      );

    } else {

      TweenMax.to(this.thumbsContainer, .1, {
          z: .001,
          y: this.statePosition.desktopPos,
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
    if ( event.data.keys === "right" && this.statePosition.currentSlide <= this.getTotalSlides() ) {

      // update state on arrow click
      this.updateState(this.statePosition.indexSelected + 1);

      this.updateSlide("right");
      this.updateDesc("right");
      this.updateThumbsnav("right");
      this.animateShadowInOut();


    } else if ( event.data.keys === "left" && this.statePosition.currentSlide !== 1 ) {

      // update state on arrow click
      this.updateState(this.statePosition.indexSelected - 1);

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
      // compare item selected index with new item selected and determine which direction to move
      // update State
      this.updateState(thumbIndex);

      // update thumbs nav
      this.updateThumbsnav("right");
      this.updateSlide("right");
      this.updateDesc("right");
      this.animateShadowInOut();

    }
    else if ( event.data.keys === "thumbnail" && prevIndex > thumbIndex
    ) {
      // update State
      this.updateState(thumbIndex);

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

    this.updateDescHeight();

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

  animateShadowIn() {
    TweenMax.to(this.gallery, .3, {
      boxShadow: "0px 18px 94px -16px rgba(0,0,0,0.68)",
      delay: .1
    });
  }

  buildThumbs() {

    let fragment = $(document.createDocumentFragment());
    // build loop for images
    this.gallery.find("li").each(( index: number, el: Object ) => {

      // create html elements
      let itemIndex = Utils.setNumber(index),
        imageThumbUrl = $(el).data("thumb"),
        imageThumbAlt = $(el).data("alt"),
        imageElement = document.createElement("img"),
        linkElement = document.createElement("a"),
        element = document.createElement("li");

      // add src and attr to image
      imageElement.setAttribute("src", imageThumbUrl);
      imageElement.setAttribute("alt", imageThumbAlt);
      linkElement.setAttribute("href", "#");
      linkElement.appendChild(imageElement);
      element.appendChild(linkElement);
      element.setAttribute("data-index", itemIndex);

      // set first image to selected
      index === this.statePosition.indexSelected ? element.className = "selected" : "";

      // append to fragment
      fragment.append(element);

    });

    // insert html element to the dom after loop finishes
    this.thumbsContainer.append(fragment);

  }

  buildThumbsClickHandler( callback ) {

    // Add array of html object to attach click events to later
    this.thumbsClick = this.thumbsContainer.find("a");

    // Click handler for preview thumbs on desktop, needs to work on tablet -> desktop
    this.thumbsClick.each(( index, el ) => {
      $(el).on("click", { keys: "thumbnail" }, this.arrowHandler.bind(this));
    });

    callback();
  }

  animateInThumbs() {
    TweenMax.to(this.showCaseThumbs, .3, {
      opacity: 1,
      delay: 1
    });
  }

  animateGalleryIn() {
    TweenMax.to(this.container.find(".showcase__outer--bgimage"), .3, {
      opacity: 1,
      delay: .7,
      onComplete: () => {
        this.animateShadowIn();
      }
    });
  }

  init() {

    this.setFirstSlide();

    // Init correct nav depending on viewport size
    this.checkSize();
    this.updateDescHeight();
    this.prevBtnMobile.on("click", { keys: "left" }, this.arrowHandler.bind(this));
    this.nextBtnMobile.on("click", { keys: "right" }, this.arrowHandler.bind(this));

    $(window).on("resize", this.checkSize.bind(this));


    // set total slides number
    this.countTotal.html(Utils.setNumber(this.getTotalSlides()));

    // update counter
    this.currentCountItem.html(Utils.setNumber(this.getCurrentSlideCount()));

  }
}

// loop through each header slider object on the page
class ShowCaseSLider {

  itemInfoWrapper: JQuery;

  constructor() {
    this.itemInfoWrapper = $(".showcase");
  }

  init() {
    // console.log("Showcase Slider init");

    this.itemInfoWrapper.each(( index: number, el: Object ) => {

      // Pass "this" to each new Header slider component
      let slider = new ShowcaseComponent(el);
      slider.init();
    });
  }

}

let ShowcaseSlider = new ShowCaseSLider();

export default ShowcaseSlider;
