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
  thumbsPosition: ShowcaseSliderInterface;
  thumbScaleTop: number;
  thumbScaleLeft: number;

  constructor( el ) {
    this.container = $(el);
    this.prevBtnMobile = $(".showcase__nav--prev");
    this.nextBtnMobile = $(".showcase__nav--next");
    this.prevBtn = $(".showcase__thumbsnav--prev");
    this.nextBtn = $(".showcase__thumbsnav--next");
    this.currentSlide = 1;
    this.gallery = $(".showcase__slider--gallery");
    this.desc = $(".showcase__desc");
    this.index = 0;
    this.thumbsContainer = $(".showcase__thumbs--images");
    this.thumbsClick = this.thumbsContainer.find("a");
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
    return this.thumbsContainer.find(".selected");
  }

  getCurrentNavElement(): JQuery {
    return this.gallery.find(".selected");
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

  updateCurrentSlide( event ) {

    if ( event === "right" ) {
      this.index++;
      this.currentSlide++;
    } else {
      this.index--;
      this.currentSlide--;
    }

  }

  updateSlide( direction ) {
    event.preventDefault();
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

  updateDesc( direction ) {
    let currentSlide = this.getCurrentDescElement();

    if ( direction === "right" ) {
      // remove currently selected class, then move left
      let next = currentSlide.next();

      currentSlide.addClass("left").removeClass("selected");
      currentSlide.next().addClass("selected");

      let height = next.outerHeight();
      $(".showcase__desc").height(height);

    } else {

      // remove currently selected class, then move left
      currentSlide.removeClass("selected");
      currentSlide.prev().addClass("selected").removeClass("left");
      let prev = currentSlide.prev();
      let height = prev.outerHeight();
      $(".showcase__desc").height(height);

    }

  }

  updateThumbsnav( direction ) {

    let currentSlide = this.getCurrentNavElement();

    if ( Utils.breakpoint < Utils.bps.laptop ) {

      if(direction === "right"){

        currentSlide.removeClass("selected");
        currentSlide.next().addClass("selected");

        // update the position controller
        this.thumbsPosition.tabletPos = this.thumbsPosition.tabletPos - this.thumbScaleLeft;
        // update html element
        this.thumbsContainer.css("left", this.thumbsPosition.tabletPos + "px");

        // update the desktop version
        this.thumbsPosition.desktopPos = this.thumbsPosition.desktopPos - this.thumbScaleTop;

      }else {

        currentSlide.removeClass("selected");
        currentSlide.prev().addClass("selected");

        this.thumbsPosition.tabletPos = this.thumbsPosition.tabletPos + this.thumbScaleLeft;
        this.thumbsContainer.css("left", this.thumbsPosition.tabletPos + "px");

        // update the desktop version
        this.thumbsPosition.desktopPos = this.thumbsPosition.desktopPos + this.thumbScaleTop;

      }



    } else {


      if(direction === "right"){

        currentSlide.removeClass("selected");
        currentSlide.next().addClass("selected");

        // update the position controller
        this.thumbsPosition.desktopPos = this.thumbsPosition.desktopPos - this.thumbScaleTop;
        // update html element
        this.thumbsContainer.css("top", this.thumbsPosition.desktopPos + "px");

        // update tablet version position
        this.thumbsPosition.tabletPos = this.thumbsPosition.tabletPos - this.thumbScaleLeft;

      }else {

        currentSlide.removeClass("selected");
        currentSlide.prev().addClass("selected");

        this.thumbsPosition.desktopPos = this.thumbsPosition.desktopPos + this.thumbScaleTop;
        this.thumbsContainer.css("top", this.thumbsPosition.desktopPos + "px");

        // update tablet version position
        this.thumbsPosition.tabletPos = this.thumbsPosition.tabletPos + this.thumbScaleLeft;

      }


    }

  }

  checkThumbsNav( size ) {

    if ( size === "mobile" ) {

      this.thumbsContainer.css("left", this.thumbsPosition.tabletPos + "px");
      this.thumbsContainer.css("top", "0px");

    } else {

      this.thumbsContainer.css("top", this.thumbsPosition.desktopPos + "px");
      this.thumbsContainer.css("left", "0px");

    }

  }

  arrowHandler( event ) {

    // Slider can move right because current slide is not the last slide
    if ( event.data.keys === "right" && this.currentSlide !== this.getTotalSlides() ) {


      this.updateSlide("right");
      this.updateDesc("right");
      this.updateThumbsnav("right");


    } else if ( event.data.keys === "left" && this.currentSlide !== 1 ) {
      // Else if its not the first slide - move left
      this.updateSlide("left");
      this.updateDesc("left");
      this.updateThumbsnav("left");

    }


  }

  thumbsHandler( event ) {
    let $el = $(event.currentTarget); // a tag
    event.preventDefault();
    let thumbIndex = $el.parent("li").data("index");

    // update selected thumb icon
    // Extract out to function
    // function that gets the
    let prevEl = this.thumbsContainer.find(".selected");
    let prevIndex = prevEl.data("index");
    // prevEl.removeClass("selected");
    // $el.parent("li").addClass("selected");

    // move thumbs up and down
    // Move down - ie right
    if ( prevIndex < thumbIndex && thumbIndex + 1 !== this.getTotalSlides ) {

      // update thumbs nav
      this.updateThumbsnav("right");
      this.updateSlide("right");
      this.updateDesc("right");

    } else if ( prevIndex > thumbIndex ) {
      // Move up -  ie left
      this.updateThumbsnav("left");
      this.updateSlide("left");
      this.updateDesc("left");
    }

  }

  checkSize() {

    // On resize end - check to enable clicks for desktop or remove them
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {

      // if Tablet or smaller - bind mobile nav arrows
      if ( Utils.breakpoint < Utils.bps.laptop ) {

        this.prevBtnMobile.on("click", { keys: "left" }, this.arrowHandler.bind(this));
        this.nextBtnMobile.on("click", { keys: "right" }, this.arrowHandler.bind(this));

        // this.prevBtn.off();
        // this.nextBtn.off();

        this.checkThumbsNav("mobile");

      } else {

        // unBindMobile arrows
        this.prevBtnMobile.off();
        this.nextBtnMobile.off();

        // this.prevBtn.on("click", { keys: "left" }, this.arrowHandler.bind(this));
        // this.nextBtn.on("click", { keys: "right" }, this.arrowHandler.bind(this));

        this.checkThumbsNav("desktop");

      }

    }, 400);

  }


  init() {

    // this.setFirstSlideElement();

    // Init correct nav depending on viewport size
    this.checkSize();

    $(window).on("resize", this.checkSize.bind(this));

    console.log(this.getTotalSlides());

    // Set Current Slide, which is always the first slide to selected - onLoad
    this.updateMobileNav(this.index, this.getCurrentSlideElement());

    // Click handler for preview thumbs on desktop, needs to work on tablet -> desktop
    this.thumbsClick.each(( index, el ) => {
      let $this = this;
      $(el).on("click", this.thumbsHandler.bind(this));
    });

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

    this.itemInfoWrapper.each(( index, el ) => {

      // Pass "this" to each new Header slider component
      let slider = new ShowcaseComponent(el);
      slider.init();
    });
  }

}

let ShowcaseSlider = new ShowCaseSLider();

export default ShowcaseSlider;
