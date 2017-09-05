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

  xhr.send(JSON.stringify(options.data));
};

$l( () => window.body = $l('body'));

window.$l = $l;
window.getMovieList = getMovieList;

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
    '<button type="button" class="style-movies" name="button">Style Movie List</button>'
  );
  $l('.style-movies').on('click', () => styleMovieList());
  $l('.style-movies').addClass('style-movies-btn');
  data.forEach((movie, idx) => {
    $l(".movie-list").append(
      `<li class="movie-name-li">
        ${movie.title}
      </li>`
    );
  });
}

function styleMovieList() {
  $l('.movie-name-li').addClass('movie-list-style');
}

$l(() => {
  $l('.all-movies-btn').on('click', getMovieList);
  $l('.todo-form').on('submit', addTodo);
});

//todo functions
function addTodo(e) {
  e.preventDefault();
  $l('.todo-ul').append(
    `<li>${e.target.children[0].value}</li>`
  );
  e.target.children[0].value = "";
}
