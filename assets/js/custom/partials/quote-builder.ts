const $ = jQuery;
import Utils from "./utils";


interface QuoteStateInterface {
  selected: string;
  isFormActive: boolean;
}

interface QuoteSelectedObject {
  title: string;
  price: string;
  description: string;
  bullets: Object;
  imgSrc: string;
}

class QuoteComponent {

  selectBtn: JQuery;
  switchBtn: JQuery;
  formBuilder: JQuery;
  quoteChooser: JQuery;
  inputs: JQuery;
  quoteItemsArray: JQuery;
  selectConainer: JQuery;
  state: QuoteStateInterface;
  quoteContainer: JQuery;
  selectedItem: QuoteSelectedObject;
  resizeTimer: number;
  currentBreakpoint: number;

  constructor() {
    this.quoteContainer = $(".quote");
    this.selectBtn = $(".quote__select--btn");
    this.quoteItemsArray = $(".quote__item");
    this.formBuilder = $(".quote__form--input");
    this.quoteChooser = $(".quote__form--select");
    this.selectConainer = this.selectBtn.find(".fieldset");
    this.state = {
      selected: '',
      isFormActive: false
    };
    this.currentBreakpoint = Utils.breakpoint;

  }

  getSelectedLabel() {
    return this.selectConainer.find(".selected");
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
        title = $this.find(".card__item--content > h2").text(),
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

    // Get color from data el and set button
    let $button_color = this.selectConainer.data("color");
    fragment.append('<span class="quote__switch shadow-small-btn" style="background-color:' + $button_color + '"></span>');

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

  buildCardEventHandlers() {

    // Main Cards
    this.quoteItemsArray.each(( index, el ) => {

      let $this = $(el),
        button = $this.find(".card__item--btn");

      button.on("click", this.openForm.bind(this));

    });

    // Back button for tablet
    let button = this.formBuilder.find(".tablet").find(".go-back");
    button.on("click", this.closeForm.bind(this));

  }

  fadeIn( el: JQuery ) {

    TweenMax.to(el, .3, {
      opacity: 1,
      delay: .3
    });

  }

  setTranslateX( currentTarget: JQuery, width: Number ) {
    let $this = currentTarget;
    let inputId = $this.attr("id");

    // if the currently selected input matches the 2nd item - then move switchBtn right, otherwise back to position 1
    if ( inputId === $(this.inputs[ 1 ]).attr("id") ) {
      this.switchBtn.css({
        "webkitTransform": "translateX(" + width + "px)",
        "MozTransform": "translateX(" + width + "px)",
        "msTransform": "translateX(" + width + "px)",
        "OTransform": "translateX(" + width + "px)",
        "transform": "translateX(" + width + "px)"
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
    this.setTranslateX($this, prevWidth);

    // change the width of the btn to match the width of the new label
    this.setWidth(selectedLabel);

    // set state to the newly selected input
    this.state.selected = $this.attr("id");
    // console.log("Current State is: ", this.state.selected);

    this.toggleCards();

  }

  toggleCards() {

    // based on state, add selected to the card's id matching the state
    this.quoteItemsArray.each(( index, el ) => {

      let $this = $(el),
        id = $this.attr("id");

      $this.removeClass("selected shadow-medium-dark");

      if ( id === this.state.selected ) {

        $this.addClass("selected shadow-medium-dark");

      }

    });

  }

  setActivePlan() {

    let id = this.state.selected;

    let selectedCard = this.quoteItemsArray.filter(( item ) => {
      return $(this.quoteItemsArray[ item ]).attr("id") === id;
    });

    let button = '<a class="rounded-btn white-btn go-back" href="#">Go Back</a>';

    // find form
    let formRef = selectedCard.find(".quote__form--temp").find(".quote__form--inner");
    let form = formRef.detach();

    // cloned element
    let modifiedElement = selectedCard.clone();

    // add form to the VC content area
    let quoteFormContainer = $(".quote__form--vc");
    quoteFormContainer.append(form);

    // find button and remove
    modifiedElement.find(".card__item--btn").remove();

    // modifiedElement.insertBefore(this.formBuilder.find(".go-back"));
    let cardWrapper = this.formBuilder.find(".quote__form--card-wrapper");

    cardWrapper.append(modifiedElement).append(button);

    // Back button inside wrapper
    let buttonDom = cardWrapper.find(".go-back");
    buttonDom.on("click", this.closeForm.bind(this));


  }

  putFormBack( form: JQuery ) {
    let id = this.state.selected;
    
    // find element id that matches the current state
    let selectedCard = this.quoteItemsArray.filter(( item ) => {
      return $(this.quoteItemsArray[ item ]).attr("id") === id;
    });

    selectedCard.find(".quote__form--temp").append( form );
  }

  closeForm( e ) {
    e.preventDefault();
    this.state.isFormActive = false;

    // ref for items in VC view
    let card = this.formBuilder.find(".card__item");
    let backBtn = this.formBuilder.find(".quote__form--card-wrapper").find(".go-back");
    let form = this.formBuilder.find(".quote__form--vc").find(".quote__form--inner");

    card.removeClass("in");

    setTimeout(() => {
      // set form to active
      this.formBuilder.removeClass("active");

      // set body back to scrollable
      $("body").css("overflow-y", "auto");

    }, 400);

    if ( Utils.breakpoint >= Utils.bps.laptop ) {

      this.formBuilder
        .find(".quote__form--vc")
        .one('otransitionend oTransitionEnd msTransitionEnd transitionend',
          ( e ) => {

            // remove visibility once animation completes
            this.formBuilder.css("visibility", "hidden");
            this.quoteChooser.css("opacity", "1");

            // z-index fix
            $(".inner-page-wrapper").children("div").css("z-index", "0");

            // remove current card html
            card.remove();
            backBtn.remove();

            this.putFormBack( form.detach() );

          });
    } else {

      // remove visibility once animation completes
      this.formBuilder.css("visibility", "hidden");
      this.quoteChooser.css("opacity", "1");

      // z-index fix
      $(".inner-page-wrapper").children("div").css("z-index", "0");

      // remove current card html
      card.remove();
      backBtn.remove();

      this.putFormBack( form.detach() );
    }

    // fade out first display
    this.quoteChooser.addClass("active");
  }

  openForm( e ) {
    e.preventDefault();

    let $this = $(e.currentTarget);
    let parentConatiner = $this.parent("div").parent("div");

    // disable button click if item is selected
    if ( !parentConatiner.hasClass("selected") ) {
      return;
    }

    // set state
    this.state.isFormActive = true;

    // set content plan HTML in new form area
    this.setActivePlan();

    // Animate form in
    let activateInnerForm = () => {

      // z-index fix
      $(".inner-page-wrapper").children("div").css("z-index", "-1");
      this.quoteContainer.parents(".vc_row").css("z-index", "2");

      // fade out cards
      this.quoteChooser.css("opacity", "0");

      // set form to active
      this.formBuilder.addClass("active");

      // add visibility immediately
      this.formBuilder.css("visibility", "visible");

      // fade out first display
      this.quoteChooser.removeClass("active");
    };

    // if desktop scroll top
    if ( Utils.breakpoint >= Utils.bps.laptop ) {

      // scroll top of div on open for graceful UX
      $("body,html").animate(
        {
          "scrollTop": this.quoteContainer.offset().top
        }, 200, () => {
          activateInnerForm();
        }
      ).bind(this);

    }else {
      activateInnerForm();
    }


    let card = this.formBuilder.find(".quote__form--card");

    // Set body to not scroll
    $("body").css("overflow-y", "hidden");

    if ( Utils.breakpoint >= Utils.bps.laptop ) {
      card.one('otransitionend oTransitionEnd msTransitionEnd transitionend',
        ( e ) => {

          // fade card in once data is set & the card bg is finished animating
          card.find(".card__item").addClass("in");

        });
    } else {

      // fade card in once data is set & the card bg is finished animating
      card.find(".card__item").addClass("in");

    }

  }

  resize() {

    // On resize end - check button size to accurately resize selected button width
    clearTimeout(this.resizeTimer);

    this.resizeTimer = setTimeout(() => {

      if ( this.currentBreakpoint !== Utils.breakpoint ) {

        let selectedLabel = this.getSelectedLabel(),
          selectedInput = selectedLabel.prev(),
          firstLabel = $(this.inputs[ 0 ]).next(),
          firstLabelWidth = firstLabel.outerWidth() - 1;

        this.setTranslateX(selectedInput, firstLabelWidth);
        this.setWidth(selectedLabel);
        this.currentBreakpoint = Utils.breakpoint;
      }

    }, 400);

  }

  init() {
    // console.log("Quote Builder");

    // build select box button inputs
    this.buildSelectBox();

    // set click events and first selected items for Select Box
    this.buildSelectEventHandlers();

    this.fadeIn(this.selectBtn);

    // select card
    this.toggleCards();

    // add click events to cards buttons
    this.buildCardEventHandlers();

    // fade main container in
    this.fadeIn(this.quoteContainer);

    // on resize change button size
    $(window).on("resize", this.resize.bind(this));

  }
}

const QuoteBuilder = new QuoteComponent();

export default QuoteBuilder;