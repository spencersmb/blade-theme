const $ = jQuery;
import Utils from "../partials/utils";
import SearchBox from "./components/search";

interface NavState {
  navEnabled: boolean;
  mobile: boolean;
  tablet: boolean;
  laptop: boolean;
  desktop: boolean;
  stickyNav: number;
}

class NavComponent {
  $navTrigger: HTMLElement;
  $navDropdown: HTMLElement;
  $dropDownWrapper: JQuery;
  $dropDownContent: JQuery;
  isSticky: number;
  wrapperOffsetTop: number;
  navOffsetTop: number;
  resizeTimeOut: number;
  currentBreakPoint: number;

  state: NavState;
  reIsoTimeOut: number;

  constructor() {

    this.$navTrigger = document.getElementById("nav-trigger");
    this.$navDropdown = document.getElementById("sprout-dropdown-trigger");
    this.$dropDownWrapper = $(".sprout-dropdown-wrapper");
    this.$dropDownContent = $(".sprout-dropdown-content");
    this.isSticky = Utils.stickyNav;
    this.wrapperOffsetTop = this.$dropDownWrapper.offset().top;
    this.navOffsetTop = $(this.$navDropdown).offset().top;
    this.currentBreakPoint = Utils.breakpoint;

    /*
     Nav State Object
     */
    this.state = {
      navEnabled: false,
      mobile: false,
      tablet: false,
      laptop: false,
      desktop: false,
      stickyNav: this.isSticky
    };


  }

  /*
   Mobile Nav functionality
   */
  openNav( event: Event ): void {
    event.preventDefault();

    $(this.$navDropdown).addClass("menu-is-active");

    // Check if user is logged in
    if ( $('body').hasClass("admin-bar") ) {

      // check what window size is
      if ( window.innerWidth <= 782 ) {

        TweenMax.to(this.$navDropdown, .3, {
            top: 46,
            ease: Cubic.easeOut
          }
        );
        return;

      } else if ( window.innerWidth <= 991 ) {

        TweenMax.to(this.$navDropdown, .3, {
            top: 32,
            ease: Cubic.easeOut
          }
        );
        return;

      }

    } else {

      TweenMax.to(this.$navDropdown, .3, {
          top: 0,
          ease: Cubic.easeOut
        }
      );

    }
  }

  closeNav( event: Event ): void {

    event.preventDefault();

    $(this.$navDropdown).removeClass("menu-is-active");

    TweenMax.to(this.$navDropdown, .3, {
        top: "-100%",
        ease: Cubic.easeIn
      }
    );
  }

  navOpenInit( init: boolean ): void {
    if ( init ) {
      $(this.$navTrigger).on("click", this.openNav.bind(this));
    } else {
      $(this.$navTrigger).off();
    }

  }

  navClose( init: boolean ): void {

    if ( init ) {
      $("#nav-close").on("click", this.closeNav.bind(this));
    } else {
      $("#nav-close").off();
    }

  }

  navItemClick( init: boolean ): void {

    if ( init ) {
      $(".menu-item-has-children").children("a").on("click", function ( event ) {
        event.preventDefault();
        let selected = $(this);
        selected.next("ul").removeClass("is-hidden").parent(".menu-item-has-children").parent("ul").addClass("move-out");
      });
    } else {
      $(".menu-item-has-children").children("a").off();
    }

  }

  goback( init: boolean ): void {

    if ( init ) {
      $(".go-back > a").on("click", function ( event ) {
        event.preventDefault();
        let selected = $(this);
        selected.parent("li").parent(".sprout-secondary-dropdown").addClass("is-hidden").parent(".menu-item-has-children").parent("ul").removeClass("move-out");
      });
    } else {
      $(".go-back > a").off();
    }


  }

  disableMobileNav() {

    this.navOpenInit(false);
    this.navClose(false);
    this.navItemClick(false);
    this.goback(false);
    this.state.navEnabled = false;
    // console.log("Nav turned off");

    /*
     Remove Styles from element & reset dropdown
     */
    this.$navDropdown.setAttribute("style", "");
    this.$dropDownContent.removeClass("move-out");
    let dropdown = this.$dropDownContent.find(".sprout-secondary-dropdown");

    dropdown.each(( index, elem ) => {
      if ( !$(elem).hasClass("is-hidden") ) {
        $(elem).addClass("is-hidden");
      }
    });

  }

  enableMobileNav() {
    // console.log("Nav turned on");
    this.navOpenInit(true);
    this.navClose(true);
    this.navItemClick(true);
    this.goback(true);

    this.state.navEnabled = true;

  }

  breakPointMobile() {
    // console.log("Breakpoint Mobile");

    if ( !this.state.navEnabled ) {
      this.enableMobileNav();
    }

    // Fix for mobile wordpress admin bar
    // and not wp-admin
    let body = $("body");

    if ( body.hasClass("admin-bar") && body.hasClass("wp-admin") === false ) {
      $("#wpadminbar").css("position", "fixed");
    }

  }

  breakPointTablet( prevState ) {
    // console.log("Breakpoint Tablet");
    if ( !this.state.navEnabled ) {
      this.enableMobileNav();
    }

  }

  breakPointLaptop( prevState ) {
    // console.log("Breakpoint Laptop");

    if ( this.state.navEnabled ) {
      this.disableMobileNav();
    }

  }

  breakPointDesktop( prevState ) {
    // console.log("Breakpoint Desktop");
  }

  safariResizeFix() {

    clearTimeout(this.reIsoTimeOut);

    // check if the container has items inside it
    if ( Utils.browser === "safari" && Utils.breakpoint >= Utils.bps.laptop ) {

      // remove animation classes temporarily
      $(this.$navDropdown).removeClass("scene_element--fadeInUpNav");


      // on resize complete, re-addClass elements
      this.reIsoTimeOut = setTimeout(() => {
        $(this.$navDropdown).addClass("scene_element--fadeInUpNav");
      }, 500);

    }
  }

  navResize() {
    /*
     Mobile
     */
    if ( Utils.breakpoint === Utils.bps.mobile ) {

      // if state mobile = false - then run breakpoint mobile
      // if its true then skip cus its already mobile
      if ( !this.state.mobile ) {
        this.breakPointMobile();
        this.checkNavPosition();
      }
      // Turn mobile on

      this.state = {
        navEnabled: true,
        mobile: true,
        tablet: false,
        laptop: false,
        desktop: false,
        stickyNav: this.isSticky
      };
    }

    /*
     Tablet
     */
    if ( Utils.breakpoint === Utils.bps.tablet ) {
      let prevState = this.state;
      // tablet and higher
      // do once
      if ( !this.state.tablet ) {
        this.breakPointTablet(prevState);
        this.checkNavPosition();
      }

      // Turn mobile on
      this.state = {
        navEnabled: true,
        mobile: false,
        tablet: true,
        laptop: false,
        desktop: false,
        stickyNav: this.isSticky
      };
    }

    /*
     Laptop
     */
    if ( Utils.breakpoint === Utils.bps.laptop ) {
      let prevState = this.state;
      if ( !this.state.laptop ) {
        this.breakPointLaptop(prevState);
        this.checkNavPosition();
      }

      this.state = {
        navEnabled: false,
        mobile: false,
        tablet: false,
        laptop: true,
        desktop: false,
        stickyNav: this.isSticky
      };

    }

    /*
     Desktop
     */
    if ( Utils.breakpoint === Utils.bps.desktop ) {

      let prevState = this.state;

      if ( !this.state.desktop ) {
        this.breakPointDesktop(prevState);
        this.checkNavPosition();
      }

      this.state = {
        navEnabled: false,
        mobile: false,
        tablet: false,
        laptop: false,
        desktop: true,
        stickyNav: this.isSticky
      };
    }

    /*
     safari Nav resize event fix
     */
    this.safariResizeFix();

    this.checkOffset();
  }

  checkOffset() {
    clearTimeout(this.resizeTimeOut);
    // check if a new break point has been reached
    if ( this.currentBreakPoint !== Utils.breakpoint ) {

      // on resize complete, change current breakpoint to new breakpoint
      this.resizeTimeOut = setTimeout(() => {
        this.currentBreakPoint = Utils.breakpoint;
      }, 500);

    }
  }

  animateNavIn(): void {
    let nav = $(this.$navDropdown);
    let timeline = new TimelineMax();
    let isHome = ($("body").hasClass("home") ? 0.9 : 0.6);

    // Image one placement
    if ( Utils.breakpoint === Utils.bps.tablet ) {
      timeline.add([
        TweenMax.fromTo(this.$dropDownWrapper, 0.25, {
          opacity: 0,
          y: -10,
          ease: Power1.easeInOut
        }, {
          delay: isHome,
          opacity: 1,
          y: 0,
          ease: Power1.easeInOut,
          onComplete: () => {
            $(this.$navDropdown).addClass('nav-anim-done');
          }
        })
      ]);
    } else if ( Utils.breakpoint >= Utils.bps.laptop ) {
      timeline.add([
        TweenMax.fromTo(nav, 0.25, {
          opacity: 0,
          y: -10,
          ease: Power1.easeInOut
        }, {
          delay: isHome,
          opacity: 1,
          y: 0,
          x: 0,
          xPercent: -50,
          ease: Power1.easeInOut,
          onComplete: () => {
            $(this.$navDropdown).addClass('nav-anim-done');
          }
        })
      ]);
    }

  }

  navLoad() {

    this.animateNavIn();

    /*
     Set state on load
     */
    if ( Utils.breakpoint === Utils.bps.mobile ) {

      this.breakPointMobile();
      this.state = {
        navEnabled: true,
        mobile: true,
        tablet: false,
        laptop: false,
        desktop: false,
        stickyNav: this.isSticky
      };

    }

    if ( Utils.breakpoint === Utils.bps.tablet ) {

      this.breakPointTablet(this.state);
      this.state = {
        navEnabled: true,
        mobile: false,
        tablet: true,
        laptop: false,
        desktop: false,
        stickyNav: this.isSticky
      };
    }

    if ( Utils.breakpoint === Utils.bps.laptop ) {

      this.breakPointLaptop(this.state);
      this.state = {
        navEnabled: false,
        mobile: false,
        tablet: false,
        laptop: true,
        desktop: false,
        stickyNav: this.isSticky
      };
    }

    if ( Utils.breakpoint >= Utils.bps.desktop ) {

      this.breakPointDesktop(this.state);

      this.state = {
        navEnabled: false,
        mobile: false,
        tablet: false,
        laptop: false,
        desktop: true,
        stickyNav: this.isSticky
      };

    }

  }

  stickyCheck(): void {
    if ( this.state.stickyNav ) {
      this.stickyInit();
    }
  }

  stickyInit(): void {

    // Get current window position on load
    this.checkNavPosition();

    $(window).on('scroll', () => {
      (!window.requestAnimationFrame)
        ? this.checkNavPosition.bind(this)
        : window.requestAnimationFrame(this.checkNavPosition.bind(this));
    });

  }

  checkNavPosition(): void {

    let newCurrentPosition = $(window).scrollTop();
    // console.log(newCurrentPosition);

    let nav = $(this.$navDropdown);
    let stickyClassNames = (Utils.isLoggedIn) ? "sticky admin" : "sticky";

    /*
     check for admin login
     */
    if ( Utils.breakpoint < Utils.bps.tablet ) {

      if ( newCurrentPosition > 45 ) {
        $(".uppercontainer").addClass(stickyClassNames);
        this.$dropDownWrapper.addClass(stickyClassNames);
      } else if ( newCurrentPosition < 45 ) {
        $(".uppercontainer").removeClass(stickyClassNames);
        this.$dropDownWrapper.removeClass(stickyClassNames);
      }

      return;

    } else if ( Utils.breakpoint === Utils.bps.tablet ) {

      // remove as precaution to not show mobile nav when resizing
      nav.removeClass(stickyClassNames);
      $(".uppercontainer").removeClass(stickyClassNames);

      if ( newCurrentPosition > 49 ) {

        this.$dropDownWrapper.addClass(stickyClassNames);
      } else if ( newCurrentPosition < 49 ) {
        this.$dropDownWrapper.removeClass(stickyClassNames);
      }

      return;

    } else if ( Utils.breakpoint >= Utils.bps.laptop ) {

      if ( newCurrentPosition > 45 ) {
        nav.addClass(stickyClassNames);
      } else if ( newCurrentPosition < 45 ) {
        nav.removeClass(stickyClassNames);
      }

      return;

    }

  }

  init(): void {
    // console.log("Nav loaded");

    this.navLoad();
    this.stickyCheck();

    /****************
     NAV RESIZE EVENT
     ***************/

    window.onresize = ( event ) => {
      (!window.requestAnimationFrame)
        ? setTimeout(this.navResize.bind(this), 300)
        : window.requestAnimationFrame(this.navResize.bind(this));
    };


  }
}

let Nav = new NavComponent();

export default Nav;