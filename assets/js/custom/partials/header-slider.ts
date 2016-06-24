const $ = jQuery;

class SliderComponent {
  gallery: JQuery;
  container: JQuery;
  closeBtn: JQuery;
  nextBtn: JQuery;
  prevBtn: JQuery;
  index: number;

  constructor( el ) {
    this.container = $(el);
    this.gallery = this.container.find(".header-slider-gallery");
    this.closeBtn = this.container.find(".header-slider-close");
    this.nextBtn = this.container.find(".slider-navigation-next");
    this.prevBtn = this.container.find(".slider-navigation-prev");
    this.index = 0;
  }

  getCurrentSlide(): JQuery {
    return this.gallery.find(".selected");
  }

  updateNav( index: number, selected: JQuery ) {
    this.prevBtn.toggleClass("hidden", selected.is(":first-child"));
    this.nextBtn.toggleClass("hidden", selected.is(":last-child"));
  }

  nextSlide( e ) {
    console.log("next slide");
    e.preventDefault();
    let currentSlide = this.getCurrentSlide();

    // remove currently selected class, then move left
    currentSlide.removeClass("selected").addClass("left");
    currentSlide.next().addClass("selected");

    // update index
    this.index++;

    // update Navigation
    this.updateNav(this.index, this.getCurrentSlide());

  }

  prevSlide( e ){
    console.log("prev slide");
    e.preventDefault();
    let currentSlide = this.getCurrentSlide();

    // remove currently selected class, then move left
    currentSlide.removeClass("selected");
    currentSlide.prev().addClass("selected").removeClass("left");

    // update index
    this.index--;

    // update Navigation
    this.updateNav(this.index, this.getCurrentSlide());
  }

  sliderClick( el, event ) {
    // el = this
    // el2 is event
    if ( !this.container.hasClass("is-active") && $(event.currentTarget).is(this.gallery) ) {
      this.container.addClass("is-active").one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", () => {
        $("body,html").animate({ "scrollTop": this.container.offset().top }, 200);
      });
    }
  }

  close( e ) {
    e.preventDefault();
    console.log("close");
    this.container.removeClass("is-active");

    TweenLite
      .to($(window), .5,
        {
          scrollTo: { y: 0 }, ease: Power2.easeOut,
          delay: .5
        }
      );
  }

  init() {
    let $this = this;

    // Create Binding Events
    this.gallery.on("click", this.sliderClick.bind(this, $this));
    this.closeBtn.on("click", this.close.bind(this));
    this.nextBtn.on("click", this.nextSlide.bind(this));
    this.prevBtn.on("click", this.prevSlide.bind(this));

    // update nav on first load
    this.updateNav(this.index, this.getCurrentSlide());
  }
}

class HeaderSliderComponent {

  itemInfoWrapper: JQuery;

  constructor() {
    this.itemInfoWrapper = $(".header-slider-container");
  }

  init() {
    console.log("Header Slider init");

    this.itemInfoWrapper.each(( index, el ) => {
      let slider = new SliderComponent(el);
      slider.init();
    });
  }

}

let HeaderSlider = new HeaderSliderComponent();

export default HeaderSlider;