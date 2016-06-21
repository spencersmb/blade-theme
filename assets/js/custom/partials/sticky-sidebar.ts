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
  footerOffset: number;
  footerHeight: number;
  scrollingDown: boolean;
  lastScrollTop: number;

  constructor() {
    this.isAnimating = false;
    this.contentWrapper = $(".sidebar-content");
    this.aside = $(".service-sidebar-wrapper");
    this.windowHeight = $(window).height();
    this.sidebarHeight = this.aside.outerHeight();
    this.sidebarWrapper = $(".service-sidebar");
  }

  checkSidebar(): void {
    // Check if the sidebar is fixed or not
    if ( !this.isAnimating && Utils.breakpoint >= Utils.bps.tablet ) {
      this.isAnimating = true;
      (!window.requestAnimationFrame) ? setTimeout(this.updateSidebarPosition.bind(this), 300) : window.requestAnimationFrame(this.updateSidebarPosition.bind(this));
    } else {
      // this.resetSideBar();
    }
  }

  resetSideBar() {
    this.isAnimating = false;
    this.aside.removeClass("sticky");
    this.aside.attr("style", "");
  }

  updateSidebarPosition(): void {

    this.checkScrollDirection();

    // get distance from top of content
    this.contentOffsetTop = this.contentWrapper.offset().top - 5;

    this.contentWrapperHeight = this.contentWrapper.outerHeight(); // include padding and margin

    // get where top of window is
    this.scrollTop = $(window).scrollTop();

    // If the window V position is less than the content V position make sidebar normal
    if ( this.scrollTop < this.contentOffsetTop ) {
      this.aside.removeClass("sticky");
      this.aside.css("transition", "top .3s");

      // if window V position is greater than content - add sticky
      // 2nd checks the offset of the top of the window to the top of the content && the position of the content in relation to the position of the window
    } else if ( this.scrollTop >= this.contentOffsetTop && this.scrollTop < this.contentWrapperHeight + this.sidebarHeight + this.contentOffsetTop - this.windowHeight ) {
      this.aside.addClass("sticky").attr("style", "");

      if ( this.scrollingDown === true ) {
        this.aside.css("transition", "top .3s");
      } else {
        this.aside.css("transition", "");
      }

    } else {
      // let articlePaddingTop = Number(articles.eq(1).css("padding-top").replace("px", ""));
      if ( this.aside.hasClass("sticky") ) {
        this.aside.attr("style", "");
        this.aside.removeClass("sticky").css("top", this.contentWrapperHeight + this.sidebarHeight + 45 - this.windowHeight + "px");
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

    let sidebarIntro = TweenMax.from(this.aside, .3, {
      x: -100,
      opacity: 0,
      z: .001,
      ease: Cubic.easeOut,
      delay: .5
    });
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