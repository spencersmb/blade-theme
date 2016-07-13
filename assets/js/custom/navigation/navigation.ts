const $ = jQuery;
import Utils from "../partials/utils";
import SearchBox from "./components/search";

interface NavState {
  navEnabled: boolean;
  mobile: boolean;
  tablet: boolean;
  laptop: boolean;
  desktop: boolean;
}

class NavComponent {
  $navTrigger: HTMLElement;
  $navDropdown: HTMLElement;
  $lowerContainer: JQuery;
  $upperContainer: JQuery;
  $navMeta: JQuery;
  $dropDownWrapper: JQuery;
  $search: JQuery;
  $dropDownContent: JQuery;

  state: NavState;

  constructor() {

    this.$navTrigger = document.getElementById("nav-trigger");
    this.$navDropdown = document.getElementById("neat-dropdown-trigger");
    // this.$lowerContainer = $(".lowercontainer");
    this.$upperContainer = $(".uppercontainer");
    this.$navMeta = $(".neat-nav-meta");
    this.$dropDownWrapper = $(".neat-dropdown-wrapper");
    this.$search = $("#nav-xfer");
    this.$dropDownContent = $(".neat-dropdown-content");

    /*
     Nav State Object
     */
    this.state = {
      navEnabled: false,
      mobile: false,
      tablet: false,
      laptop: false,
      desktop: false
    };
  }


  // Not used
  reload() {

    this.$navTrigger = document.getElementById("nav-trigger");
    this.$navDropdown = document.getElementById("neat-dropdown-trigger");
    // this.$lowerContainer = $(".lowercontainer");
    this.$upperContainer = $(".uppercontainer");
    this.$navMeta = $(".neat-nav-meta");
    this.$dropDownWrapper = $(".neat-dropdown-wrapper");
    this.$search = $("#nav-xfer");
    this.$dropDownContent = $(".neat-dropdown-content");

    this.state = {
      navEnabled: false,
      mobile: false,
      tablet: false,
      laptop: false,
      desktop: false
    };

    this.init();
  }


  /*
   Mobile Nav functionality
   */
  openNav( event: Event ): void {
    event.preventDefault();

    $(this.$navDropdown).addClass("menu-is-active");
    TweenMax.to(this.$navDropdown, .3, {
        top: 0,
        ease: Cubic.easeOut
      }
    );
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
        selected.parent("li").parent(".neat-secondary-dropdown").addClass("is-hidden").parent(".menu-item-has-children").parent("ul").removeClass("move-out");
      });
    } else {
      $(".go-back > a").off();
    }


  }

  moveNavigationMobile() {
    // console.log("move navigation mobile");

    this.$search.detach();
    this.$navMeta.detach();
    // this.$lowerContainer.detach();
    this.$dropDownWrapper.detach();
    // this.$lowerContainer.insertAfter(this.$upperContainer);
    this.$navMeta.insertBefore(this.$upperContainer);
    this.$upperContainer.append(this.$dropDownWrapper);
    this.$navMeta.append(this.$search);
  }

  moveNavigationTablet() {
    // console.log("move navigation tablet");

    this.$search.detach();
    // this.$lowerContainer.detach();
    this.$upperContainer.append(this.$navMeta);
    // this.$upperContainer.append(this.$lowerContainer);
    this.$dropDownWrapper.insertAfter(this.$upperContainer);
    this.$dropDownWrapper.prepend(this.$search);
  }

  moveNavigationDekstop() {
    // console.log("move navigation desktop");

    this.$search.insertBefore(this.$dropDownContent);

  }

  disableMobileNav() {

    // console.log("Nav turned off");
    this.navOpenInit(false);
    this.navClose(false);
    this.navItemClick(false);
    this.goback(false);
    this.state.navEnabled = false;

    /*
     Remove Styles from element & reset dropdown
     */
    this.$navDropdown.setAttribute("style", "");
    this.$dropDownContent.removeClass("move-out");
    let dropdown = this.$dropDownContent.find(".neat-secondary-dropdown");

    dropdown.each( (index, elem) => {
      if ( !$(elem).hasClass("is-hidden") ) {
        $(elem).addClass("is-hidden");
      }
    });

  }

  enableMobileNav() {
    console.log("Nav turned on");
    this.navOpenInit(true);
    this.navClose(true);
    this.navItemClick(true);
    this.goback(true);

    this.state.navEnabled = true;

  }

  breakPointMobile() {
    console.log("Breakpoint Mobile");

    if ( !this.state.navEnabled ) {
      this.enableMobileNav();
    }
    this.moveNavigationMobile();
  }

  breakPointTablet( prevState ) {
    console.log("Breakpoint Tablet");
    if ( !this.state.navEnabled ) {
      this.enableMobileNav();
    }

    this.moveNavigationTablet();
  }

  breakPointLaptop( prevState ) {
    console.log("Breakpoint Laptop");

    if ( this.state.navEnabled ) {
      this.disableMobileNav();
    }

    // if prev state was tablet do this:
    if ( prevState.desktop === false || prevState.mobile === true ) {

      this.moveNavigationTablet();
      this.moveNavigationDekstop();
    }
  }

  breakPointDesktop( prevState ) {
    console.log("Breakpoint Desktop");

    if ( prevState.laptop === false || prevState.mobile === true ) {

      this.moveNavigationTablet();
      this.moveNavigationDekstop();
    }

  }

  navResize() {
    /*
     Mobile
     */
    if ( Utils.breakpoint === Utils.bps.mobile ) {

      if ( !this.state.mobile ) {
        this.breakPointMobile();
      }
      // Turn mobile on

      this.state = {
        navEnabled: true,
        mobile: true,
        tablet: false,
        laptop: false,
        desktop: false
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
      }
      // Turn mobile on

      this.state = {
        navEnabled: true,
        mobile: false,
        tablet: true,
        laptop: false,
        desktop: false
      };
    }

    /*
     Laptop
     */
    if ( Utils.breakpoint === Utils.bps.laptop ) {
      let prevState = this.state;
      if ( !this.state.laptop ) {
        this.breakPointLaptop(prevState);
      }

      this.state = {
        navEnabled: false,
        mobile: false,
        tablet: false,
        laptop: true,
        desktop: false
      };

    }

    /*
     Desktop
     */
    if ( Utils.breakpoint === Utils.bps.desktop ) {

      let prevState = this.state;

      if ( !this.state.desktop ) {
        this.breakPointDesktop(prevState);
      }

      this.state = {
        navEnabled: false,
        mobile: false,
        tablet: false,
        laptop: false,
        desktop: true
      };
    }
  }

  navLoad() {
    if ( Utils.breakpoint === Utils.bps.mobile ) {

      this.breakPointMobile();
      this.state = {
        navEnabled: true,
        mobile: true,
        tablet: false,
        laptop: false,
        desktop: false
      };

    }

    if ( Utils.breakpoint === Utils.bps.tablet ) {

      this.breakPointTablet(this.state);
      this.state = {
        navEnabled: true,
        mobile: false,
        tablet: true,
        laptop: false,
        desktop: false
      };
    }

    if ( Utils.breakpoint === Utils.bps.laptop ) {

      this.breakPointLaptop(this.state);
      this.state = {
        navEnabled: false,
        mobile: false,
        tablet: false,
        laptop: true,
        desktop: false
      };
    }

    if ( Utils.breakpoint === Utils.bps.desktop ) {

      this.breakPointDesktop(this.state);
      this.state = {
        navEnabled: false,
        mobile: false,
        tablet: false,
        laptop: false,
        desktop: true
      };
    }
  }

  init(): void {
    console.log("Nav loaded");

    this.navLoad();
    // SearchBox.init();

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