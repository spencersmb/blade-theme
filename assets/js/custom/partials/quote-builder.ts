const $ = jQuery;
import Utils from "./utils";

class QuoteComponent {

  selectBtn: JQuery;
  switch: JQuery;

  constructor() {
    this.selectBtn = $(".quote__select--btn");
    this.switch = $(".quote__switch");
  }

  setWidth( label: JQuery ) {

    let labelWidth = label.outerWidth();
    this.switch.css("width", labelWidth);

  }

  init() {
    console.log("Quote Builder");

    let inputs = this.selectBtn.find(".quote__input");

    inputs.each(( index, el ) => {

      let $this = $(el),
        nextLabel = $this.next();

      // find Selected, get width of label, set width of span
      if ( nextLabel.hasClass("selected") ) {

        this.setWidth(nextLabel);

      }

      // Add on change function here
      $this.change(( e ) => {

        let $this = $(e.currentTarget),
          fieldset = $this.parent(".fieldset"),
          prevItem = fieldset.find(".selected"),
          prevWidth = prevItem.outerWidth() - 1,
          inputId = $this.attr("id");

        fieldset.find("label").removeClass("selected");

        let selectedLabel = fieldset.find("label[for=" + inputId + "]").addClass("selected");

        // if the currently selected input matches the 2nd item - then move switch right, otherwise back to position 1
        if ( inputId === $(inputs[ 1 ]).attr("id") ) {
          this.switch.css({
            "webkitTransform": "translateX(" + prevWidth + "px)",
            "MozTransform": "translateX(" + prevWidth + "px)",
            "msTransform": "translateX(" + prevWidth + "px)",
            "OTransform": "translateX(" + prevWidth + "px)",
            "transform": "translateX(" + prevWidth + "px)"
          });
        } else {
          this.switch.css({
            "webkitTransform": "translateX(0px)",
            "MozTransform": "translateX(0px)",
            "msTransform": "translateX(0px)",
            "OTransform": "translateX(0px)",
            "transform": "translateX(0px)"
          });
        }

        this.setWidth(selectedLabel);

      });
    });


  }
}

const QuoteBuilder = new QuoteComponent();

export default QuoteBuilder;