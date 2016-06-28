import {BpsInterface} from "../interfaces/bps.interface";
const $ = jQuery;

// Add interface JQuerySmooth {
// smoothState():void;
// }
// smoothState(arg: Object): JQuery;

class UtilityComponent {
  windowWidth: number;
  breakpoint: number;
  breakpoints: number[];
  bps: BpsInterface;
  browser: string;

  private _setBreakpoints = ( bps: BpsInterface ) => {
    let arr = [];

    for ( let key in bps ) {
      if ( bps.hasOwnProperty(key) ) {
        arr.push(bps[ key ]);
      }
    }

    return arr.reverse();
  };
  private _checkBreakpoint = () => {
    // make breakpoint event available to all files via the window object
    let old_breakpoint = this.breakpoint;

    this._setBreakpoint();

    if ( old_breakpoint !== this.breakpoint ) {

      $(window).trigger("breakpointChange", Utils.breakpoint);
    }
  };
  private _setBreakpoint = () => {
    // get breakpoint from css
    let body = getComputedStyle(document.body),
      zindex = getComputedStyle(document.body)[ "z-index" ];

    this.breakpoint = parseInt(zindex, 10);
  };
  private _setWindowWidth = () => {
    this.windowWidth = window.innerWidth;
  };

  whichBrowser() {
    if ( (navigator.userAgent.toLowerCase().indexOf("safari") > -1) && !(
      navigator.userAgent.toLowerCase().indexOf("chrome") > -1) && (navigator.appName ===
      "Netscape") ) {

      if ( navigator.userAgent.match(/iPad/i) !== null ) {
        return "ipad";

      } else {
        return "safari";
      }
    }
  }

  constructor() {
    this.windowWidth = 0;
    this.breakpoint = 320;
    this.breakpoints = [];
    this.bps = {
      mobile: 544,
      tablet: 768,
      laptop: 992,
      desktop: 1200,
      desktop_xl: 1600
    };
    this.browser = this.whichBrowser();
  }

  init(): void {
    console.log("Utilities loaded");

    // set breakpoint on window load
    this._setBreakpoint();
    this._setWindowWidth();
    console.log("Current Breakpoint is:", this.breakpoint);

    // create full array for image compression ref
    this.breakpoints = this._setBreakpoints(this.bps);

    $(window).on("resize", this._checkBreakpoint).bind(this);
  }
}

let Utils = new UtilityComponent();

export default Utils;