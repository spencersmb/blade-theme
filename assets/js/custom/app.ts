/*
 Ref path is not needed for some reason
 <reference path="/Users/yosemetie/Dropbox/development/vhosts/www.lyndascore.dev/wp-content/themes/neat/typings/tsd.d.ts" />
 */

import Utils from "./partials/utils";
import Nav from "./navigation/navigation";
import Search from "./navigation/components/search";
import SvgHeader from "./partials/header-svg";
// import SmoothState from "./partials/smoothState";
import ImageLoader from "./partials/imageLoader";
import StickySidebar from "./partials/sticky-sidebar";
import ProcessMap from "./partials/processAnimation";
import IsotopeGallery from "./partials/gallery-isotope";
import HeaderSlider from "./partials/header-slider";
// import StickySidebar from "./partials/service-sidebar";
const $ = jQuery;
declare var ScrollMagic: any;
// declare var revapi1: any;

(function () {
  class App {

    init(): void {
      console.log("Neat loaded");
      SvgHeader.init();
      Utils.init();
      Nav.init();
      Search.init();
      StickySidebar.init();
      ProcessMap.init();

    }
  }

  let bootstrap = new App();

  /** run all functions */
  $(document).ready(function () {
    bootstrap.init();
    ImageLoader.init();
    // SmoothState.init("");
  });

  // Bind events to the imagesLoaded plugin here
  $(document).on("imgLoaded", function ( e ) {
    console.log("image loaded custom event");
    // check if page has gallery
    if ( $(".gallery-container").length > 0 ) {
      IsotopeGallery.init();
    }
    HeaderSlider.init();
    
  });

  // Global window function
  let sideBar = $(".service-sidebar-wrapper");

  window.onbeforeunload = function ( e ) {
    console.log("window change");
    if ( Utils.breakpoint >= Utils.bps.tablet ) {
      $(".m-scene").addClass("is-exiting");

      TweenLite
        .to($(window), .5,
          {
            scrollTo: { y: 0 }, ease: Power2.easeOut
          }
        );

      // animate SVG out
      TweenLite.to(sideBar, .3, {
        x: "-100",
        z: ".001",
        delay: 0,
        opacity: 0,
        ease: "Linear.easeNone"
      });

      // animate sidebar out
      if ( sideBar.length > 0 ) {
        TweenLite.to($(".divider-svg"), .3, {
          y: "30",
          z: ".001",
          delay: 0,
          ease: "Linear.easeNone"
        });
      }
    }
  };


  // $(window).on("load", function () {
  //   // modify the "revapi1" part with your slider"s API name listed here:
  //   // https://www.themepunch.com/revslider-doc/api/
  //   if ( typeof revapi1 !== "undefined" ) {
  //     console.log("rev start");
  //     revapi1.revstart();
  //   }
  //
  // });

})();

// declare var Isotope: any;
// class iso {
//     constructor() {
//     }
//     init():any{
//         var elem = document.querySelector(".grid");
//         var isot = new Isotope( elem, {
//             // options
//             itemSelector: ".grid-item",
//             layoutMode: "fitRows"
//         });
//         console.log($(".grid"));
//     }
// }
