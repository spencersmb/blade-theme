declare var ScrollMagic: any;
const $ = jQuery;

class ProcessComponent {

  container: JQuery;
  item: JQuery;

  constructor() {
    this.container = $(".process-container");
    this.item = $(".process-item-container");
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

  animateIn() {
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

  init() {
    this.animateIn();
    this.desc_o_animate();
  }
}

let ProcessMap = new ProcessComponent();

export default ProcessMap;