const $ = jQuery;
import Utils from "../../partials/utils";

class SearchComponent {
  $searchTrigger: JQuery;
  $searchCloseTrigger: JQuery;
  $searchForm: JQuery;
  $searchButtonArea: JQuery;
  $icon: JQuery;
  $form: JQuery;
  $input: JQuery;
  $width: number;
  $height: number;
  isOpen: boolean;


  constructor() {
    this.$searchTrigger = $(".meta-search-trigger");
    this.$searchCloseTrigger = $(".super-search-close");
    this.$searchForm = $(".super-search");
    this.$searchButtonArea = $(".meta-search");
    this.$icon = this.$searchTrigger.children("i");
    this.$form = this.$searchForm.find(".sprout-search");
    this.$input = this.$form.first();
    this.$width = this.$searchButtonArea.width();
    this.$height = this.$searchButtonArea.height();
  }

  reload() {
    console.log("Search Reload");
    this.$searchTrigger = $(".meta-search-trigger");
    this.$searchCloseTrigger = $(".super-search-close");
    this.$searchForm = $(".super-search");
    this.$searchButtonArea = $(".meta-search");
    this.$icon = this.$searchTrigger.children("i");
    this.$form = $(".sprout-search");
    this.$width = this.$searchButtonArea.width();
    this.$height = this.$searchButtonArea.height();

    this.$searchTrigger.on("click", this.openSearch.bind(this)).bind(this);
    this.$searchCloseTrigger.on("click", this.closeSearch.bind(this)).bind(this);
  }

  getWidth(): number {
    return this.$searchButtonArea.width();
  }

  getHeight(): number {
    return this.$searchButtonArea.height();
  }

  getTopPosition(): number {
    return this.$searchTrigger.offset().top - $(window).scrollTop();
  }

  getLeftPosition(): number {
    return this.$searchTrigger.offset().left;
  }

  closeSearch( event ) {

    this.isOpen = false;

    let animation = new TimelineLite();

    TweenLite.to(this.$searchCloseTrigger, .2, {
      top: "5%",
      opacity: "0"
    });

    TweenLite.to(this.$form, .4, {
      top: "25%",
      opacity: "0",
      ease: Expo.easeInOut
    });

    animation.to(this.$searchForm, .2, {
      left: this.getLeftPosition(),
      top: this.getTopPosition(),
      width: this.getWidth(),
      height: this.getHeight(),
      delay: .3,
      opacity: 0,
      onComplete: function () {
        $("body").css({
          position: "relative",
          width: "100%"
        });
        TweenLite.to(this.$icon, .2, {
          top: "50%",
          opacity: "1",
        });
      }.bind(this)
    }).to(this.$searchForm, .4, {
      onComplete: function () {
        this.$searchForm.css({
          "z-index": -1,
          "left": 0,
          "top": 0,
          "width": 0,
          "height": 0,
        });
      }.bind(this)
    });

  }

  openSearch(event) {
    event.preventDefault();

    this.isOpen = true;

    // prevent button from being used once search is open
    this.$searchTrigger.blur();

    this.$searchForm.css({
      left: this.getLeftPosition(),
      top: this.getTopPosition(),
      width: 35,
      height: 35,
      "z-index": 999
    });

    let animation = new TimelineLite();

    animation.to(this.$searchForm, .2, {
      visibility: "visible",
      delay: .2
    }).to(this.$searchForm, .2, {
      left: 0,
      opacity: "1",
      top: 0,
      width: "100%",
      height: "100vh",
      borderRadius: 0,
      onComplete: function () {
        $("body").css({
          position: "fixed",
          width: "100%",
          overflowY: "scroll"
        });
        console.log("complete form animate in");
      }
    });

    TweenLite.to(this.$icon, .2, {
      top: "110%",
      opacity: "0",
    });

    TweenLite.to(this.$searchCloseTrigger, .3, {
      top: "3%",
      opacity: "1",
      delay: .4,
    });

    TweenLite.to(this.$form, .4, {
      top: "20%",
      opacity: "1",
      delay: .4,
      ease: Expo.easeInOut
    });

  }

  init() {
    console.log("Search loaded");
    // this.openSearch();
    this.$input.keyup((event) => {
      // if key is enter - animate out
      if ( event.which === 13) {
        this.closeSearch(event);
      }
    });

    this.$searchTrigger.on("click", this.openSearch.bind(this)).bind(this);
    this.$searchCloseTrigger.on("click", this.closeSearch.bind(this)).bind(this);
    
    $("body").keyup((event) => {
      if ( event.which === 27 && this.isOpen ) {
        this.closeSearch(event);
        event.preventDefault();
      } else {
        event.preventDefault();
        return;
      }
    });
  }
}

let SearchBox = new SearchComponent();

export default SearchBox;