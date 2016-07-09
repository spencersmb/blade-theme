const $ = jQuery;
import Utils from "./utils";

interface QuoteStateInterface {
  selected: string;
  isFormActive: boolean;
}

class QuoteComponent {

  selectBtn: JQuery;
  switchBtn: JQuery;
  inputs: JQuery;
  quoteItemsArray: JQuery;
  selectConainer: JQuery;
  state: QuoteStateInterface;

  constructor() {
    this.selectBtn = $(".quote__select--btn");

    this.quoteItemsArray = $(".quote__item");
    this.selectConainer = this.selectBtn.find(".fieldset");
    this.state = {
      selected: '',
      isFormActive: false
    };

  }

  setWidth( label: JQuery ) {

    let labelWidth = label.outerWidth();
    this.switchBtn.css("width", labelWidth);

  }

  buildSelectBox() {

    let names = [];
    let fragment = $(document.createDocumentFragment());

    // get h2 titles from each quote item
    this.quoteItemsArray.each(( index, el ) => {

      let $this = $(el),
        title = $this.find("h2").text(),
        name = title.toLocaleLowerCase(),
        uniqueId = name + "-" + index;

      // Add matching ID's to each Card
      $this.attr("id", uniqueId);

      // Create input and label DOM elements
      let input = Utils.buildHtml("input", {
        id: uniqueId,
        type: "radio",
        class: "quote__input",
        name: uniqueId,
        value: name
      });

      let label = Utils.buildHtml("label", {
        for: uniqueId,
        class: index === 0 ? "selected" : ""
      }, title);


      fragment.append(input).append(label);

    });

    fragment.append('<span class="quote__switch"></span>');

    this.selectConainer.append(fragment);

  }

  buildSelectEventHandlers() {
    this.inputs = this.selectBtn.find(".quote__input");
    this.switchBtn = $(".quote__switch");

    // loop through each item and set width and change events and checked status
    this.inputs.each(( index, el ) => {

      let $this = $(el),
        nextLabel = $this.next();

      if ( index === 0 ) {
        $this.prop("checked", true);

        // set state to current selected input ID
        this.state.selected = $this.attr("id");
      }

      // find Selected, get width of label, set width of span
      if ( nextLabel.hasClass("selected") ) {
        this.setWidth(nextLabel);
      }

      // Add on change function here
      $this.change(this.onChange.bind(this));
    });
  }

  fadeIn( el: JQuery ) {

    TweenMax.to(el, .3, {
      opacity: 1,
      delay: .3
    });

  }

  onChange( e ) {

    let $this = $(e.currentTarget),
      fieldset = $this.parent(".fieldset"),
      prevItem = fieldset.find(".selected"),
      prevWidth = prevItem.outerWidth() - 1,
      inputId = $this.attr("id");

    // remove selected from Prev Label
    fieldset.find("label").removeClass("selected");

    // remove checked state from prev input
    prevItem.prev("input").prop("checked", false);

    // set new item to selected and checked
    let selectedLabel = fieldset.find("label[for=" + inputId + "]").addClass("selected");
    $this.prop("checked", true);

    // if the currently selected input matches the 2nd item - then move switchBtn right, otherwise back to position 1
    if ( inputId === $(this.inputs[ 1 ]).attr("id") ) {
      this.switchBtn.css({
        "webkitTransform": "translateX(" + prevWidth + "px)",
        "MozTransform": "translateX(" + prevWidth + "px)",
        "msTransform": "translateX(" + prevWidth + "px)",
        "OTransform": "translateX(" + prevWidth + "px)",
        "transform": "translateX(" + prevWidth + "px)"
      });
    } else {
      this.switchBtn.css({
        "webkitTransform": "translateX(0px)",
        "MozTransform": "translateX(0px)",
        "msTransform": "translateX(0px)",
        "OTransform": "translateX(0px)",
        "transform": "translateX(0px)"
      });
    }

    // change the width of the btn to match the width of the new label
    this.setWidth(selectedLabel);

    // set state to the newly selected input
    this.state.selected = $this.attr("id");
    console.log("Current State is: ", this.state.selected);

    this.toggleCards();

  }

  toggleCards() {

    // based on state, add selected to the card's id matching the state
    this.quoteItemsArray.each((index, el) => {

      let $this = $(el),
          id = $this.attr("id");

      $this.removeClass("selected");

      if( id === this.state.selected){

        $this.addClass("selected");

      }

    });

  }

  init() {
    console.log("Quote Builder");

    // build select box button inputs
    this.buildSelectBox();

    // set click events and first selected items for Select Box
    this.buildSelectEventHandlers();

    this.fadeIn(this.selectBtn);

    // select card
    this.toggleCards();

  }
}

const QuoteBuilder = new QuoteComponent();

export default QuoteBuilder;