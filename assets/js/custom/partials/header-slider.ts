const $ = jQuery;
import Utils from "./utils";

class SliderComponent {
  gallery: JQuery;
  container: JQuery;
  closeBtn: JQuery;
  nextBtn: JQuery;
  prevBtn: JQuery;
  index: number;
  currentSlide: number;
  totalSlide: number;
  countTotal: JQuery;
  currentCount: JQuery;
  sliderOpen: boolean;
  resizeTimer: number;

  constructor( el ) {
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

  getCurrentSlideElement(): JQuery {
    return this.gallery.find(".selected");
  }

  getTotalSlides(): number {
    let count = this.gallery.children("li").length;
    return count;
  }

  getCurrentSlideCount(): number {
    return this.currentSlide;
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

  updateNav( index: number, selected: JQuery ) {

    // update numbers on screen
    this.currentCount.html(Utils.setNumber(this.getCurrentSlideCount()));

    // Enable/Disable arrow btns
    this.prevBtn.parent("li").toggleClass("slider-hidden", selected.is(":first-child"));
    this.nextBtn.parent("li").toggleClass("slider-hidden", selected.is(":last-child"));
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
    this.updateNav(this.index, this.getCurrentSlideElement());
  }

  arrowHandler( event ) {

    // check which key was pressed and make sure the slide isn't the beginning or the last one
    if ( event.data.keys === "right" && this.currentSlide !== this.getTotalSlides() ) {

      if ( Utils.breakpoint >= Utils.bps.laptop && this.sliderOpen ) {
        this.updateSlide("right");
      } else if ( Utils.breakpoint <= Utils.bps.tablet ) {
        this.updateSlide("right");
      }

    } else if ( event.data.keys === "left" && this.currentSlide !== 1 ) {

      if ( Utils.breakpoint >= Utils.bps.laptop && this.sliderOpen ) {
        this.updateSlide("left");
      } else if ( Utils.breakpoint <= Utils.bps.tablet ) {
        this.updateSlide("left");
      }

    }

  }

  openSlider( el, event ) {
    // el = this
    // el2 is event
    if ( !this.container.hasClass("is-active") && $(event.currentTarget).is(this.gallery) ) {

      this.sliderOpen = true;

      this.container.addClass("is-active").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", () => {
        $("body,html").animate({ "scrollTop": this.container.offset().top }, 200);

        // Close Btn animate in
        let closeBtnAnimation = TweenMax.to(this.closeBtn, .3, {
          opacity: 1,
          z: .001,
          x: -30,
          right: 0,
          ease: Cubic.easeOut,
          delay: .3
        });

      });
    }
  }

  closeSlider( e ) {
    e.preventDefault();
    this.container.removeClass("is-active");

    this.sliderOpen = false;

    TweenLite
      .to($(window), .5,
        {
          scrollTo: { y: 0 }, ease: Power2.easeOut,
          delay: .5
        }
      );

    let closeBtnAnimation = TweenMax.to(this.closeBtn, .3, {
      opacity: 0,
      z: .001,
      ease: Cubic.easeOut,
      onComplete: () => {
        TweenMax.to(this.closeBtn, .3, {
          right: 50
        });
      }
    });
  }

  checkSize() {

    // On resize end - check to enable clicks for desktop or remove them
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {

      let $this = this;
      if ( Utils.breakpoint >= Utils.bps.laptop ) {
        this.gallery.on("click", this.openSlider.bind(this, $this));
        this.closeBtn.on("click", this.closeSlider.bind(this));
      } else {
        this.gallery.off();
        this.closeBtn.off();
      }

    }, 400);

  }

  init() {

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
    this.countTotal.html(Utils.setNumber(this.getTotalSlides()));
  }
}

// loop through each header slider object on the page
class HeaderSliderComponent {

  itemInfoWrapper: JQuery;

  constructor() {
    this.itemInfoWrapper = $(".header-slider-container");
  }

  init() {
    console.log("Header Slider init");

    this.itemInfoWrapper.each(( index, el ) => {

      // Pass "this" to each new Header slider component
      let slider = new SliderComponent(el);
      slider.init();
    });
  }

}

let HeaderSlider = new HeaderSliderComponent();

export default HeaderSlider;