const $ = jQuery;
declare var Isotope: any;

class GalleryComponent {

  gridId: string;
  gallery_grid: number;
  gallery_wrapper_width: number;
  $fullGrid: JQuery;
  $galleryContainer: JQuery;
  $grid: any;
  currentHeight: string;
  currentHeightPX: number;
  reIsoTimeOut: number;
  isContained: boolean;

  constructor() {
    this.gridId = $(".inner-content-module").children("div").attr("id");
    this.$fullGrid = $("#" + this.gridId);
    this.$galleryContainer = $(".gallery-container");
  }

  setupIsotope() {
    // init isotope
    this.$grid = this.$fullGrid.isotope({
      percentPosition: true,
      itemSelector: ".gallery-item",
      isInitLayout: false,
      masonry: {
        "columnWidth": ".grid-sizer"
      },
      transitionDuration: ".6s"
    });
  }

  galleryIsotopeWrapper() {
    let windowWidthRef = $(window).innerWidth(); // for scroll bar fix currently

    // Is container or full width?
    if ( this.$galleryContainer.hasClass("container") ) {
      this.isContained = true;
    }

    //
    if ( windowWidthRef > 1600 && this.isContained === false ) {
      console.log("grid 5");
      this.gallery_grid = 5;
    } else if ( windowWidthRef <= 600 ) {
      this.gallery_grid = 1;
    } else if ( windowWidthRef <= 991 ) {
      this.gallery_grid = 2;
    } else if ( windowWidthRef <= 1199 ) {
      console.log("grid 3");
      this.gallery_grid = 3;
    } else {
      console.log("grid 4");
      this.gallery_grid = 4;
    }

    if ( $(".gallery-3-grid").length > 0 && windowWidthRef > 1248 ) {
      this.gallery_grid = 3;
    }

    if ( $(".gallery-4-grid").length > 0 && windowWidthRef > 1584 ) {
      this.gallery_grid = 4;
    }

    this.gallery_wrapper_width = $(".gallery-container").width();

    if ( this.gallery_wrapper_width % this.gallery_grid > 0 ) {
      this.gallery_wrapper_width = this.gallery_wrapper_width + ( this.gallery_grid - this.gallery_wrapper_width % this.gallery_grid);
    }
    $(".gallery-isotope").css("width", this.gallery_wrapper_width);

    return this.gallery_grid;
  }

  reloadIsotop() {
    this.$grid.isotope();
    this.setMinHeight();
  }

  setMinHeight() {

    // Set min height depending one what content was filtered
    this.currentHeight = $(".gallery-item.width1").css("padding-bottom");
    let heightStr = this.currentHeight.toString();
    this.currentHeightPX = this.pxConvert(heightStr);

    if ( this.currentHeightPX !== 0 ) {

      $(".gallery-isotope").css("min-height", Math.round(this.currentHeightPX));
    } else {
      this.currentHeightPX = $(".gallery-item.width1").height();

      $(".gallery-isotope").css("min-height", Math.round(this.currentHeightPX));
    }
  }

  pxConvert( objectHeight: string ) {
    return parseInt(objectHeight.slice(0, -2));
  }

  addImageTransition() {
    // add transition for intro animation
    $(".gallery-item").css("transition-duration", "600ms");
  }

  loadImagesIn() {
    this.$grid.isotope("once", "arrangeComplete", function () {

      // fade in
      $(".gallery-item").addClass("active");

      // remove animation for smooth filtering
      setTimeout(function () {
        $(".gallery-item").css("transition-duration", "0ms");
      }, 500);

    });
  }

  onResize() {

    clearTimeout(this.reIsoTimeOut);

    // gallery isotope
    if ( $(".gallery-container").length > 0 ) {
      this.galleryIsotopeWrapper();

      // on resize complete, readjust grid
      this.reIsoTimeOut = setTimeout(this.reloadIsotop.bind(this), 500);
    }
  }

  onFilterClick( el, el2 ) {
    let $this = $(el2.toElement);

    $this.parent().children("li").each(function () {
      $(this).removeClass("selected");
    });

    $this.addClass("selected");

    let filterValue = $this.attr("data-filter");

    this.reFilter(filterValue);
  }

  reFilter( item ) {
    this.$grid.isotope({
      filter: item
    });
  }

  // Get grid to assign dynamically

  init() {
    console.log("Isotope Init");

    // Add transition to animate image in gracefully
    this.addImageTransition();

    // Setup Isotope for the first time
    this.setupIsotope();

    // Create perfect grid
    this.galleryIsotopeWrapper();

    // delay isotope init using helper function that fires on resize
    setTimeout(this.reloadIsotop.bind(this), 1000);

    // Animate Images in onLoad
    this.loadImagesIn();

    // Add filter on Click
    let $this = this;
    $(".filter-group").on("click", "li", this.onFilterClick.bind(this, $this));

    $(window).on("resize", this.onResize.bind(this));
  }

}

let IsotopeGallery = new GalleryComponent();

export default IsotopeGallery;