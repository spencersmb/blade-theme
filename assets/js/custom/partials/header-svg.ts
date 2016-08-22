const $ = jQuery;
import Utils from "./utils";


class SvgHeaderComponent {
  svg: JQuery;
  height: number;
  window: JQuery;
  winWidth: number;
  proportion: number;

  constructor() {
    this.svg = $(".divider-svg");
    this.window = $(window);
    this.proportion = 18;
    this.winWidth = this._setWindowWidth();
    this.height = this.winWidth / this.proportion;
  }

  _setWindowWidth(): number {
    return $(window).width();
  }

  _setSvgHeight(): number {
    let height = this._setWindowWidth() / 18;

    return height;
  }

  resizeSvg() {

    this.winWidth = this._setWindowWidth();
    this.height = this._setSvgHeight();

    // set width of item
    this.svg.css("width", this.winWidth);

    // set height proportion of 28
    this.svg.attr("height", this.height);
    this.svg.height(this.height);
  }

  animateIn() {
    // console.log("Animate In");

    this.svg = $(".divider-svg");
    this.proportion = 18;
    this.window = $(window);
    this.winWidth = this.window.width();
    this.height = this.winWidth / this.proportion;

    // set width of item
    this.svg.attr("width", this.winWidth);

    // set height proportion of 28
    this.svg.attr("height", this.height);
    this.svg.height(this.height);

    TweenLite.to(this.svg, .3, {
      opacity: 1,
      height: this.height,
      bottom: "-3px",
    });
  }

  loadDivider() {
    let y = Utils.breakpoint < Utils.bps.tablet ? 0 : 50;
    TweenLite.to(this.svg, .1, {
      y: y,
      z: ".001",
      width: this._setWindowWidth(),
      height: this._setSvgHeight(),
      delay: 0,
      ease: "Linear.easeNone",
      onComplete: () => {
        this.svg.parent("div").css("opacity", 1);
        this.svg.addClass("m-page scene_element scene_element--fadeinupDivider");
      }
    });
  }

  init(): void {
    // console.log("Svg header loaded");

    this.loadDivider();


    $(window).on("resize", this.resizeSvg.bind(this)).bind(this);
  }
}

let SvgHeader = new SvgHeaderComponent();

export default SvgHeader;