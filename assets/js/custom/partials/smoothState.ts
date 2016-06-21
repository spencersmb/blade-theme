const $ = jQuery;
import SvgHeader from "./header-svg";
import Nav from "../navigation/navigation";
import Search from "../navigation/components/search";

declare var revapi1: any;

class SmoothStateComponent {

  revapi: any;

  addBlacklistClass(): void {

    let loggedIn = $("Body").hasClass("logged-in");
    // Look at every link on the page if the href has the string add the class wp-link
    if ( loggedIn ) {
      $("a").each(function () {
        if ( this.href.indexOf("/wp-admin/") !== -1 ||
          this.href.indexOf("/wp-login.php") !== -1 ) {
          $(this).addClass("wp-link");
        }
      });
    }
  }

  init( rev ): void {

    console.log("SmoothState Loaded");
    
    let content = jQuery("#content");
    let settings = {
      debug: true,
      prefetch: true,
      cacheLength: 4,
      // anchors: "a",
      forms: "form",
      onStart: {

        // Set the duration of our animation
        duration: 300,

        // Alterations to the page
        render: function ( $container ) {
          if ( typeof rev !== "undefined" ) {
            // revapi1.revpause();
          }
          // Quickly toggles a class and restarts css animations
          if ( typeof this.revapi !== "undefined" ) {
            console.log("rev kill");
          }

          $container.addClass("is-exiting");
          smoothState.restartCSSAnimations();
        }
      },
      onReady: {
        duration: 0,
        render: function ( $container, $newContent ) {

          // Remove your CSS animation reversing class
          $container.removeClass("is-exiting");

          // Inject the new content
          content.html($newContent);
          // SvgHeader.animateIn();

        }
      },
      blacklist: ".wp-link, .mejs-container", // ignore admin links
      onAfter: () => {
        jQuery.readyFn.execute();
        this.addBlacklistClass();
      }
    };
    let smoothState = content.smoothState(settings).data("smoothState");

    // jQuery("body").smoothState({
    // debug: true,
    // // onStart runs as soon as link has been activated
    // onStart : {
    //
    //   // Set the duration of our animation
    //   duration: 250,
    //
    //   // Alterations to the page
    //   render: function () {
    //
    //     // Quickly toggles a class and restarts css animations
    //     $("body").animate({ "scrollTop": 500 });
    //   }
    // }
    // }).data("smoothState");
  }

}

let SmoothState = new SmoothStateComponent();

export default SmoothState;