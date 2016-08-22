const $ = jQuery;
// TODO: Sidebar image loading
class ImageLoaderComponent {
  arr: string[];
  body: JQuery;
  content: JQuery;
  hero: JQuery;
  hasHero: number;
  bgImage: JQuery;
  hasBgImage: number;

  constructor() {
    this.arr = [];
    this.body = $("body");
    this.content = $("#content");
    this.hero = $(".hero");
    this.hasHero = this.hero.length;
    this.bgImage = $(".img-loader-bg");
    this.hasBgImage = this.bgImage.length;
  }

  animateBlogPrimary(): void {
    let blogPrimary = $(".primary");
    let blogBgImage = blogPrimary.css("background-image");

    if ( blogBgImage !== "none" ) {
      setTimeout(function () {

        TweenLite
          .to(blogPrimary, .3,
            {
              z: ".001",
              opacity: 1,
            }
          );
      }, 300);
    }
  }

  animateBlogArticles(): void {
    let animate = new TimelineMax();

    for ( let i = 0; i < this.arr.length; i++ ) {
      animate.to(this.arr[ i ], 0.1, { opacity: "1", ease: "Linear.easeNone" });
    }
  }

  preloadImages(): void {
    this.arr = [];

    this.content.imagesLoaded({ background: true }, () => {

        // Blog primary article
        this.body.hasClass("blog") ? this.animateBlogPrimary() : "";

        // Hero header intro
        // this.hasHero > 0 ? this.animateHeroHeader() : "";
        this.hasBgImage > 0 ? this.bgImage.addClass("loaded") : "";

      })
      .always(function ( instance ) {
        // console.log("all images loaded");
      })
      .done(( instance ) => {
        // console.log("all images successfully loaded");

        // Animation for Blog index homepage
        this.animateBlogArticles();
        $(document).trigger("imgLoaded");
        
        // Example on how to trigger events elsewhere
        // $(document).on("imgLoaded", function(e){
        //   console.log("image loaded custom event");
        // });

      })
      .fail(function () {
        console.log("all images loaded, at least one is broken");
      })
      .progress(( instance, image ) => {
        // console.log(image);
        let result = image.isLoaded ? "loaded" : "broken";

        if ( result ) {
          this.arr.push(image.img);
        }
        // console.log("image is " + result + " for " + image.img.src);
      });
  }

  init(): void {
    // console.log("Image Preloader Module");

    this.preloadImages();
  }
}

let ImageLoader = new ImageLoaderComponent();

export default ImageLoader;