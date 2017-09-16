const DomNodeCollection = require('./dom_node_collection.js');

let funcArray = [];

document.addEventListener("DOMContentLoaded", function() {
  funcArray.forEach( (func) => {
    func();
  });
});

function $l(selector) {

  if (selector instanceof HTMLElement) {
    return new DomNodeCollection([selector]);
  } else if (typeof selector === 'string') {
    const nodeList = document.querySelectorAll(selector);
    const nodeArray = Array.from(nodeList);
    return new DomNodeCollection(nodeArray);
  }


  if (typeof selector === 'function') {
    if (document.readyState === 'complete') {
      selector();
    } else {
      funcArray.push(selector);
    }
  }
}

$l.extend = function (...objects) {
  obj = Object.assign(...objects);
  return obj;
};

$l.ajax = function (options) {
  def = {
    method: 'GET',
    url: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    success: () => {},
    error: () => {},
  };

  options = $l.extend(def, options);

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url, true);
  xhr.onload = (e) => {
    if (xhr.status > 199 && xhr.status < 300) {
      options.success(JSON.parse(xhr.response));
    } else {
      options.error(JSON.parse(xhr.response));
    }
  };

  // debugger

  xhr.send(JSON.stringify(options.data));
};

module.exports = $l;
