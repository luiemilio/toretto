const $l = require('./lib/main.js');


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
