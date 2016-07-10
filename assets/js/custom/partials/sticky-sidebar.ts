const $ = jQuery;

import Utils from "./utils";

class StickySidebarComponent {

  isAnimating: boolean;
  contentWrapper: JQuery;
  contentOffsetTop: number;
  contentWrapperHeight: number;
  scrollTop: number;
  aside: JQuery;
  sidebarWrapper: JQuery;
  windowHeight: number;
  sidebarHeight: number;
  footerHeight: number;
  scrollingDown: boolean;
  lastScrollTop: number;

  constructor() {
    this.isAnimating = false;
    this.contentWrapper = $(".sidebar-content");
    this.aside = $(".service-sidebar-wrapper");
    this.windowHeight = $(window).height();
    this.sidebarHeight = this.aside.height();
    this.sidebarWrapper = $(".service-sidebar");
  }

  checkSidebar(): void {
    // Check if the sidebar is fixed or not
    if ( !this.isAnimating && Utils.breakpoint >= Utils.bps.laptop ) {
      this.isAnimating = true;
      (!window.requestAnimationFrame) ?
        setTimeout(this.updateSidebarPosition.bind(this), 300) :
        window.requestAnimationFrame(this.updateSidebarPosition.bind(this));
    } else if ( Utils.breakpoint < Utils.bps.laptop ) {
      this.resetSideBar();
    }
  }

  checkSidebarVisibility() {

    if ( Utils.breakpoint >= Utils.bps.laptop ) {

      // does sidebar haveclass visibility
      let isVisible = this.aside.hasClass('visible');

      if ( !isVisible ) {

        this.animateSidebarIn();

      }

    }

  }

  resetSideBar() {
    this.isAnimating = false;
    this.aside.removeClass("sticky");
    this.aside.attr("style", "");
  }

  updateSidebarPosition(): void {

    this.checkScrollDirection();

    this.checkSidebarVisibility();

    // get distance from top of content 10 + 40 = 50 padding top
    // this.contentOffsetTop = this.contentWrapper.offset().top - 10;
    this.contentOffsetTop = this.contentWrapper.offset().top;
    this.sidebarHeight = this.aside.height();
    this.contentWrapperHeight = this.contentWrapper.outerHeight(); // include padding and margin


    // get where top of window is
    this.scrollTop = $(window).scrollTop();
    // console.log("Content Wrapper Height", this.contentWrapperHeight);
    // console.log("Content Offset", this.contentOffsetTop);
    // console.log("Sidebar Height", this.sidebarHeight);
    // console.log("Window Height", this.windowHeight);
    // console.log("offset Top", this.contentOffsetTop);
    // console.log("ScrollTop", this.scrollTop);
    // console.log("Sidebaroffset", this.scrollTop);

    // If the window V position is less than the content V position make sidebar normal
    if ( this.scrollTop < this.contentOffsetTop ) {
      // let cssProps = {
      //   "transition": "top .3s"
      // };
      this.aside.removeClass("sticky");
      // this.aside.css(cssProps);

      // if window V position is greater than content - add sticky
      // 2nd checks the offset of the top of the window to the top of the content && the position of the content in relation to the position of the window - 40 on end
    } else if ( this.scrollTop >= this.contentOffsetTop && this.scrollTop < this.contentWrapperHeight - this.sidebarHeight + this.contentOffsetTop ) {
      this.aside.addClass("sticky").attr("style", "");

      if ( this.scrollingDown === true ) {
        // this.aside.css("transition", "top .3s");
      } else {
        // this.aside.css("transition", "");
      }

    } else {
      // let articlePaddingTop = Number(articles.eq(1).css("padding-top").replace("px", ""));
      if ( this.aside.hasClass("sticky") ) {
        this.aside.attr("style", "");
        this.aside.removeClass("sticky").css("top", this.contentWrapperHeight - this.sidebarHeight + "px");
      }

    }

    this.isAnimating = false;

  }

  checkScrollDirection() {
    // Log current scrollPoint
    let st = $(this).scrollTop();

    // compare to last scrollPoint
    if ( st > this.lastScrollTop ) {
      console.log("scroll down");
      // downscroll code
      this.scrollingDown = true;

    } else {
      console.log("scroll up");
      // upscroll code
      this.scrollingDown = false;
    }

    // on complete - make last Scroll point the point at which they started scrolling at first
    this.lastScrollTop = st;
  }

  animateSidebarIn() {

    this.aside.removeClass("intro");

    if ( Utils.breakpoint >= Utils.bps.laptop ) {

      let sidebarIntro = TweenMax.to(this.aside, .3, {
        x: 0,
        opacity: 1,
        z: .001,
        ease: Cubic.easeOut,
        delay: .9,
        onComplete: () => {
          // make sidebar permanently visible
          this.aside.addClass("visible");
        }
      });
    }

  }

  init() {
    console.log("Sticky sidebar loaded");

    this.lastScrollTop = 0;
    if ( this.aside.length > 0 ) {
      this.checkSidebar();

      $(window).on("scroll", this.checkSidebar.bind(this));
      $(window).on("resize", this.checkSidebar.bind(this));

      // Animate side bar in on load
      this.animateSidebarIn();
    }
  }
}

let StickySidebar = new StickySidebarComponent();

export default StickySidebar;