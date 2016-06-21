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
    // this.svg.attr("width", this.winWidth);
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

  init(): void {
    console.log("Svg header loaded");

    // this.svg.height(this._setSvgHeight());
    // this.svg.attr("height", this._setSvgHeight());

    TweenLite.to(this.svg, .1, {
      y: "3",
      z: ".001",
      width: this._setWindowWidth(),
      height: this._setSvgHeight(),
      delay: 0,
      ease: "Linear.easeNone"
    });



    $(window).on("resize", this.resizeSvg.bind(this)).bind(this);
  }
}

let SvgHeader = new SvgHeaderComponent();

export default SvgHeader;