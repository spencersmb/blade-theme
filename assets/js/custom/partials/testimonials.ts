const $ = jQuery;
class TestimonailComponent {

  testimonails: JQuery;

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

  init() {

    console.log("Testimonials Init");

    // Make items dynamic
    this.testimonails.each(( index, el ) => {
      let $this = $(el);
      this.generateId(index, $this);

      // make first element active
      $this.find(".carousel-inner").children(".item").first().addClass("active");
    });

    // Start Sliders
    this.testimonails.each(( index, el ) => {
      let $this = $(el);
      $(el).carousel();
    });
  }

}

const Testimonails = new TestimonailComponent();

export default Testimonails;