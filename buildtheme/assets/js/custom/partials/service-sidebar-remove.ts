const $ = jQuery;

import Utils from "./utils";

declare var ScrollMagic: any;
class ServiceSidebarComponent {
  isAnimating: boolean;
  contentWrapper: JQuery;
  contentOffsetTop: number;
  contentWrapperHeight: number;
  scrollTop: number;
  aside: JQuery;
  asideOffset: number;
  windowHeight: number;
  sidebarHeight: number;
  footerOffset: number;

  constructor() {
    this.isAnimating = false;
    this.contentWrapper = $(".sidebar-content");
    this.aside = $(".service-sidebar-wrapper");
    this.asideOffset = this.aside.offset().top;
    this.windowHeight = $(window).height();
    this.sidebarHeight = this.aside.outerHeight();
    this.footerOffset = $(".neat_footer").offset().top;
  }

  addClass( event ) {

    $(".service-sidebar").addClass("m-left-panel m-page scene_element scene_element--fadeinleft");

  }

  removeClass( event ) {
    $(".service-sidebar").removeClass("m-left-panel m-page scene_element scene_element--fadeinleft");
  }

  init() {
    this.contentWrapper = $(".sidebar-content");
    this.contentWrapperHeight = this.contentWrapper.height();
    this.contentOffsetTop = this.contentWrapper.offset().top;
    console.log(this.contentWrapperHeight);
    console.log(this.contentOffsetTop);

    let end = this.contentWrapperHeight - this.contentOffsetTop - 30;

    // iPhone intro animation Tween
    let iphoneIntro = TweenMax.to(this.aside, 1, {
      y: -1,
      z: .001,
      ease: Cubic.easeOut
    });

    let wipeAnimation = new TimelineMax()
      .fromTo(this.aside, .1, { y: "-5" }, { y: "50", ease: Cubic.easeOut });

    let controller = new ScrollMagic.Controller();
    $(window).on( "scroll", () => {
      // console.log($(window).scrollTop());
    });

    let scene = new ScrollMagic.Scene(
      {
        triggerElement: this.contentWrapper,
        duration: end,
        offset: this.asideOffset,
      })
      .setPin(".service-sidebar-wrapper")
      .setTween(wipeAnimation)
      .on("enter", this.removeClass.bind(this))
      .on("leave", this.addClass.bind(this))
      .addIndicators({ name: "1 (duration: " + end + ")" }) // add indicators (requires plugin)
      .addTo(controller);
  }
}

let ServiceSidebar = new ServiceSidebarComponent();

export default ServiceSidebar;