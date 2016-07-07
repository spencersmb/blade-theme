const $ = jQuery;
class TestimonailComponent {

  testimonails: JQuery;
  resizeTimer: number;
  currentHeight: number;

  constructor() {
    this.testimonails = $(".testimonials");
  }

  generateId( index, el ) {

    // create Dynamic ID
    let idString = "carousel-testimonial-" + index;
    el.attr("id", idString);

    // Add matching href to controls
    let controls = el.find(".carousel-control");
    controls.each(( index, el ) => {

      $(el).attr("href", "#" + idString);

    });

  }

  onResize() {

    // On resize end - check to enable clicks for desktop or remove them
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {

      // Change Height on resize
      this.testimonails.each(( index, el ) => {

        let $this = $(el);

        // establish vars
        let $inner = $this.find(".carousel-inner"),
            $active = $inner.find(".active"),
            blockItem = $active.find("blockquote");

        // Set height for first item
        let height = blockItem.outerHeight();

        if ( this.currentHeight !== height ) {
          $inner.css("height", height);
          this.currentHeight = height;
        }

      });

    }, 400);
  }

  init() {

    console.log("Testimonials Init");

    // Make items dynamic
    this.testimonails.each(( index, el ) => {
      let $this = $(el);
      this.generateId(index, $this);

      // make first element active
      let $inner = $this.find(".carousel-inner");
      let $first = $inner.children(".item").first().addClass("active");

      // Set height for first item
      let height = $first.outerHeight();
      this.currentHeight = height;
      $inner.css("height", height);

    });

    // Start Sliders
    this.testimonails.each(( index, el ) => {

      // init carousel
      $(el).carousel();

      // On slide change height for smooth transitions
      $(el).on("slid.bs.carousel", ( e ) => {

        // slide
        let $this = e.currentTarget;
        let currentSlide = $($this).find(".active");
        let blockItem = currentSlide.find("blockquote");
        let height = blockItem.outerHeight();
        this.currentHeight = height;
        currentSlide.parent(".carousel-inner").css("height", height);
        
      });
    });

    // adjust size on resize
    $(window).on("resize", this.onResize.bind(this));
  }

}

const Testimonails = new TestimonailComponent();

export default Testimonails;