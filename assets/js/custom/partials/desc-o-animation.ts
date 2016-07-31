declare var ScrollMagic: any;
const $ = jQuery;
import Utils from "./utils";

class DescOffsetAnimation {
  $this: JQuery;
  is_desc_animating: boolean;
  controller: any;
  scene: any;
  scene2: any;

  constructor( el ) {
    this.$this = $(el);
  }

  checkSize() {

    if ( Utils.breakpoint >= Utils.bps.tablet ) {

      // Enable Animation
      if ( this.is_desc_animating === false ) {

        this.is_desc_animating = true;
        this.desc_o_animate();
      }

    }

    // disable animation
    if ( Utils.breakpoint < Utils.bps.tablet ) {

      this.is_desc_animating = false;

      if ( typeof this.scene === "object" ) {

        this.scene.destroy(true);
        this.scene2.destroy(true);

      }
    }

  }

  desc_o_animate() {

    if ( Utils.breakpoint >= Utils.bps.tablet ) {

      this.is_desc_animating = true;

      // new timeline event
      let wipeAnimation = new TimelineMax();

      // Image one placement
      wipeAnimation.add([
        TweenMax.fromTo(this.$this.find(".desc-o-image-1"), 1, { yPercent: 0 }, {
          yPercent: -20,
          ease: Power0.easeInOut
        })
      ]);

      // Image 2 placement
      let wipeAnimation2 = new TimelineMax();
      wipeAnimation2.add([
        TweenMax.fromTo(this.$this.find(".desc-o-image-2"), 1, { yPercent: 0, }, {
          yPercent: -105,
          ease: Power0.easeInOut
        })
      ]);


      this.controller = new ScrollMagic.Controller();

      this.scene = new ScrollMagic.Scene(
        {
          triggerElement: this.$this[0],
          duration: this.$this.height(),
          offset: -100
        })
        .setTween(wipeAnimation)
        // .addIndicators({ name: "1 (duration: El)" }) // add indicators (requires plugin)
        .addTo(this.controller);

      this.scene2 = new ScrollMagic.Scene(
        {
          triggerElement: this.$this[0],
          duration: this.$this.height() + 100,
        })
        .setTween(wipeAnimation2)
        // .addIndicators({ name: "2 (duration: El)" }) // add indicators (requires plugin)
        .addTo(this.controller);
    }

  }

  init() {

    this.desc_o_animate();

    $(window).on("resize", this.checkSize.bind(this));

  }

}

export default DescOffsetAnimation;