
import Utils from "./partials/utils";
import Nav from "./navigation/navigation";
import Search from "./navigation/components/search";
import SvgHeader from "./partials/header-svg";
import ImageLoader from "./partials/imageLoader";
import StickySidebar from "./partials/sticky-sidebar";
import AnimationController from "./partials/processAnimation";
import IsotopeGallery from "./partials/gallery-isotope";
import HeaderSlider from "./partials/header-slider";
import ShowcaseSlider from "./partials/showcase-slider";
import Testimonials from "./partials/testimonials";
import QuoteBuilder from "./partials/quote-builder";

const $ = jQuery;
declare var ScrollMagic: any;

(function () {

  class App {

    init(): void {
      // console.log("App loaded");
      SvgHeader.init();
      Utils.init();
      Nav.init();
      Search.init();
      StickySidebar.init();
      Testimonials.init();
      QuoteBuilder.init();
      AnimationController.init(); // Global window anim and click control
    }
  }

    let bootstrap = new App();


  /** run all functions */
  $(document).ready(function () {
    bootstrap.init();
    ImageLoader.init();
  });

  // Bind events to the imagesLoaded plugin here
  $(document).on("imgLoaded", function ( e ) {
    // console.log("image loaded custom event");
    
    // check if page has gallery
    if ( $(".gallery-container").length > 0 ) {
      IsotopeGallery.init();
    }
    HeaderSlider.init();
    ShowcaseSlider.init();

  });

})();