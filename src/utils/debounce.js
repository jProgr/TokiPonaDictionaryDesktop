/**
 * Returns a function that will not be executed on each call
 * but instead after some time period since last call.
 *
 * @param {(...any) => undefined} func The function to debounce
 * @param {number} wait The period after which func should be called
 * @param {boolean} immediate Whether to call func immediately
 * @return {(...any) => undefined} A debounced version of func
 *
 * @see https://davidwalsh.name/javascript-debounce-function
 */
function debounce(func, wait, immediate = false) {
  var timeout;

  return function () {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

module.exports = debounce;
