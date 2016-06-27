declare var ScrollMagic: any;
const $ = jQuery;
import Utils from "./utils";
class AnimationComponent {

  container: JQuery;
  item: JQuery;
  mScene: JQuery;
  serviceSideBar: JQuery;


  constructor() {
    this.container = $(".process-container");
    this.item = $(".process-item-container");
    this.mScene = $(".m-scene");
    this.serviceSideBar = $(".service-sidebar-wrapper");
  }

  desc_o_animate() {
    if ( $(".desc-o-animate").length > 0 ) {
      let wipeAnimation = new TimelineMax();
      wipeAnimation.add([
        TweenMax.fromTo($(".desc-o-image-1"), 1, { yPercent: 0 }, { yPercent: -20, ease: Power0.easeInOut })
      ]);

      let wipeAnimation2 = new TimelineMax();
      wipeAnimation2.add([
        TweenMax.fromTo($(".desc-o-image-2"), 1, { yPercent: 0, }, { yPercent: -105, ease: Power0.easeInOut })
      ]);

      let controller = new ScrollMagic.Controller();

      let scene = new ScrollMagic.Scene(
        {
          triggerElement: ".desc-o-animate",
          duration: $(".desc-o-animate").height(),
          offset: -100
        })
      // .setPin(".desc-o-image-1")
        .setTween(wipeAnimation)
        .addIndicators({ name: "1 (duration: El)" }) // add indicators (requires plugin)
        .addTo(controller);

      let scene2 = new ScrollMagic.Scene(
        {
          triggerElement: ".desc-o-animate",
          duration: $(".desc-o-animate").height() + 100,
        })
      // .setPin(".desc-o-image-1")
        .setTween(wipeAnimation2)
        .addIndicators({ name: "2 (duration: El)" }) // add indicators (requires plugin)
        .addTo(controller);
    }
  }

  processAnimateIn() {
    let container = this.container;
    let item = this.item;
    let controller = new ScrollMagic.Controller();
    let scene = new ScrollMagic.Scene(
      {
        triggerElement: ".process-container",
        duration: container.height(),
        // offset: this.asideOffset,
      })
      .on("enter", function () {
        item.find(".process-item-inner").addClass("in");
        container.find("img").addClass("in");
      })
      // .addIndicators({ name: "1 (duration: offset?)" }) // add indicators (requires plugin)
      .addTo(controller);
  }

  animateWindowTop() {
    console.log("animate Top");
    TweenLite
      .to($(window), .3,
        {
          scrollTo: {
            y: 0
          },
          ease: Power2.easeOut
        }
      );
  }

  animateServiceSidebarOut(){
      TweenLite.to(this.serviceSideBar, .3, {
        x: "-100",
        z: ".001",
        delay: 0,
        opacity: 0,
        ease: "Linear.easeNone",
        onComplete: ()=>{
          // remove sidebar html element so it doesnt show up again when scrolling up
          this.serviceSideBar.remove();
        }
      });
  }

  loadUrl( url ) {
    document.location.href = url;
  }

  mainContentAnimationOut( callback ) {

    // Load in animations here
    this.animateServiceSidebarOut();


    this.mScene.addClass("is-exiting")
      // If has webkitAnimationEnd - it gets called twice
      .one("oanimationend msAnimationEnd animationend", () => {

        // Load in animations here that need to occur after main ones
        this.animateWindowTop();

      });

    if ( typeof(callback) === "function" ) {
      callback();
    }

  }

  checkUrl( url ): boolean {
    if ( url === "#" || url === "" ) {
      return false;
    } else {
      return true;
    }
  }

  globalClickCheck( event? ) {

    // Get url from the a tag
    let newUrl = $(event.currentTarget).attr("href");

    // check for window size to perform animations
    if ( Utils.breakpoint > Utils.bps.tablet && this.checkUrl(newUrl) ) {

      // When main controller animate is done -> load new url
      this.mainContentAnimationOut(() => {
        this.loadUrl(newUrl);
      });

    } else if ( this.checkUrl(newUrl) ) {

      console.log(this.checkUrl(newUrl));
      // check if nav item is clicked on mobile
      if($(event.currentTarget).parent("li").hasClass("menu-item-has-children")){
        console.log("mobile menu is active and parent clicked");
      }else{
        this.loadUrl(newUrl);
      }

    }
  }

  init() {
    this.processAnimateIn();
    this.desc_o_animate();

    // Click event to control window Loading
    $("a").on("click", ( e ) => {
      event.preventDefault();
      this.globalClickCheck(e);
    });

    // Custom event example
    // $(document).on("test", {}, ( event, arg1, arg2 ) => {
    //
    //   if ( Utils.breakpoint > Utils.bps.tablet ) {
    //     console.log(event);
    //     console.log(arg1);
    //     console.log(arg2);
    //   }
    //
    // }).bind(this);
  }
}

let AnimationController = new AnimationComponent();

export default AnimationController;