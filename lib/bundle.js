/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const $l = __webpack_require__(1);


window.$l = $l;
window.getMovieList = getMovieList;

$l( () => window.body = $l('body'));

// ghibli
function getMovieList() {
  const options = {
    method: 'GET',
    url: 'https://ghibliapi.herokuapp.com/films',
    success(data) {
      $l(".movie-list").empty();
      appendMovieData(data);
    }
  };
  $l.ajax(options);
}

function appendMovieData(data) {
  $l('.all-movies-div').append(
    '<button type="button" class="style-movies" name="button">Style Movies</button>'
  );
  $l('.all-movies-div').append(
    '<button type="button" class="clear-movies" name="button">Clear Movies</button>'
  );
  $l('.style-movies').on('click', () => styleMovieList());
  $l('.clear-movies').on('click', () => clearMovieList());
  $l('.style-movies').addClass('style-movies-btn');
  $l('.clear-movies').addClass('style-movies-btn');
  data.forEach((movie, idx) => {
    $l(".movie-list").append(
      `<li class="movie-name-li">
        ${movie.title}
      </li>`
    );
  });
}

function clearMovieList() {
  $l('.movie-list').empty();
  $l('.style-movies').remove();
  $l('.clear-movies').remove();
  $l('.all-movies-btn').on('click', getMovieList);
}

function styleMovieList() {
  $l('.movie-name-li').addClass('movie-list-style');
}

//todo functions
function addTodo(e) {
  e.preventDefault();
  $l('.todo-ul').append(
    `<li>${e.target.children[0].value}</li>`
  );
  e.target.children[0].value = "";
}

function clearTodos() {
  $l('.todo-ul').empty();
}


//gif functions
function getQuestion(e) {
  e.preventDefault();

  const options = {
    method: 'GET',
    url: 'http://jservice.io/api/random',
    success(data) {
      $l('.j-q').empty();
      $l('.j-a').empty();
      appendQuestion(data['0']);
    },
    error(data) {
      console.log(data);
    },
  };

  $l.ajax(options);
}

function appendQuestion(question) {
  $l('.j-q').append(
    `<p>Category: ${question.category.title}</p></br><p>${question.question}</p>`
  );
  // debugger
  $l('.j-a').append(
    `<button class="j-a-btn" type="button" name="button">Get Answer</button>`
  );


  $l('.j-a').append(
    `<p class="j-a-p" style="display:none">${question.answer}</p>`
  );

  $l('.j-a-btn').on('click', () => revealAnswer());
}

function revealAnswer() {
  // debugger
  $l('.j-a-p').attr("style", "");
}



//initial events

$l(() => {
  $l('.all-movies-btn').on('click', getMovieList);
  $l('.todo-form').on('submit', addTodo);
  $l('.clear-todo-btn').on('click', clearTodos);
  $l('.q-btn').on('click', getQuestion);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(2);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor (els) {
    this.els = els;
  }

  html(string) {
    if (string === undefined) {
      return this.els[0].innerHTML;
    } else {
      this.els.forEach((el) => {
        el.innerHTML = string;
      });
      return this.els;
    }
  }

  empty() {
    this.els.forEach((el) => {
      el.innerHTML = "";
    });
    return this.els;
  }

  append(arg) {
    this.els.forEach((el) => {
      el.innerHTML += arg;
    });
  }


  attr(attrName, value){
    if (value === undefined) {
      return this.els[0].getAttribute(attrName);
    } else {
      this.els.forEach( (attr) => {
        return attr.setAttribute(attrName, value);
      });
    }
  }

  addClass(string) {
    this.els.forEach( (attr) => {
      return attr.classList.add(string);
    });
  }

  removeClass(string) {
    this.els.forEach( (attr) => {
      return attr.classList.remove(string);
    });
  }

  children() {
    const allChildren = [];
    this.els.forEach( (el) => {
      let children_arr = Array.from(el.children);
      children_arr.forEach( (child) => {
        allChildren.push(child);
      });
    });
    return new DomNodeCollection(allChildren);
  }

  parent() {
    const allParents = [];
    this.els.forEach( (el) => {
      if (!allParents.includes(el.parentNode)) {
        allParents.push(el.parentNode);
      }
    });
    return new DomNodeCollection(allParents);
  }

  find(selector) {
    let allDes = [];

    this.els.forEach( (el) => {
      let tempArr = Array.from(el.querySelectorAll(selector));
      allDes = allDes.concat(tempArr);
    });
    return new DomNodeCollection(allDes);
  }

  remove() {
    this.els.forEach( (el) => {
      el.remove();
    });

    this.els = [];
  }

  on(type, callback) {

    this.els.forEach( (el) => {
      if (el.eventCallback && Object.keys(el.eventCallback)) {
        el.eventCallback[type] = callback;
      } else {
        el.eventCallback = {[type]: callback};
      }

      el.addEventListener(type, callback);
    });
  }

  off(type){
    this.els.forEach( (el) => {
      el.removeEventListener(type, el.eventCallback[type]);
    });
  }

}

module.exports = DomNodeCollection;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map