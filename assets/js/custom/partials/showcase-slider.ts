const $ = jQuery;
import Utils from "./utils";

class ShowcaseComponent {
  container: JQuery;
  resizeTimer: number;
  nextBtnMobile: JQuery;
  prevBtnMobile: JQuery;
  currentSlide: number;
  index: number;
  gallery: JQuery;
  desc: JQuery;

  closeBtn: JQuery;
  nextBtn: JQuery;
  prevBtn: JQuery;


  constructor( el ) {
    this.container = $(el);
    this.prevBtnMobile = $(".showcase__nav--prev");
    this.nextBtnMobile = $(".showcase__nav--next");
    this.currentSlide = this.index + 1;
    this.gallery = $(".showcase__slider--gallery");
    this.desc = $(".showcase__desc");
    this.index = 0;

  }

  setFirstSlideElement(): void {
    $(".showcase__items--container").children(".showcase__item").first().addClass("selected");
  }

  getCurrentSlideElement(): JQuery {
    console.log(this.gallery.find(".selected"));
    return this.gallery.find(".selected");
  }

  getCurrentDescElement(): JQuery {
    return this.desc.find(".selected");
  }

  getTotalSlides(): number {
    let count = this.gallery.children(".showcase_item").length;
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
      console.log(height);
      console.log(next);
      $(".showcase__desc").height(height);

    } else {

      // remove currently selected class, then move left

      currentSlide.removeClass("selected");
      currentSlide.prev().addClass("selected").removeClass("left");
      let prev = currentSlide.prev();
      let height = prev.outerHeight();
      console.log(height);
      console.log(prev);
      $(".showcase__desc").height(height);

    }

  }

  arrowHandler( event ) {

    // Slider can move right because current slide is not the last slide
    if ( event.data.keys === "right" && this.currentSlide !== this.getTotalSlides() ) {
      this.updateSlide("right");
      this.updateDesc("right");
    } else if ( event.data.keys === "left" && this.currentSlide !== 1 ) {
      // Else if its not the first slide - move left
      this.updateSlide("left");
      this.updateDesc("left");
    }


  }

  checkSize() {

    // On resize end - check to enable clicks for desktop or remove them
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {

      let $this = this;

      // if Tablet or smaller - bind mobile nav arrows
      if ( Utils.breakpoint < Utils.bps.laptop ) {

        this.prevBtnMobile.on("click", { keys: "left" }, this.arrowHandler.bind(this));
        this.nextBtnMobile.on("click", { keys: "right" }, this.arrowHandler.bind(this));

      } else {

        // unBindMobile arrows
        this.prevBtnMobile.off();
        this.nextBtnMobile.off();
      }

    }, 400);

  }


  init() {

    // this.setFirstSlideElement();

    // Init correct nav depending on viewport size
    this.checkSize();

    // Set Current Slide, which is always the first slide to selected - onLoad
    this.updateMobileNav(this.index, this.getCurrentSlideElement());

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
