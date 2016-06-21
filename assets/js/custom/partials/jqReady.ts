
namespace MyReadyFn {

  interface FnReady extends JQuery {
    list: any[];
    register(fn: any): JQuery;
    execute(): JQuery;
  };

  let $ = jQuery;

  let list = [];

  $.fn.register = function (fn) {
    list.push(fn);
  };

  $.fn.execute = function() {

    for (let i = 0; i < list.length; i++) {
      try {
        list[i].apply(document, [$]);
      }
      catch (e) {
        throw e;
      }
    }
  };

  export var test = function () {
    $.fn.execute();
  };
  export var register = function (fn) {
    $.fn.register(fn);
    console.log("Register");
  };

}

export default MyReadyFn;