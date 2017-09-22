# Toretto

A jQuery inspired, lightweight JavaScript library intended for DOM manipulation.

[Demo library][link]

[link]: https://luiemilio.github.io/toretto/

![Demo](/toretto_demo.png)

## Functionality

### $l

This is the main function. You can pass it a string which represents either an HTML element or Class. It will return an instance of the DomNodeCollection class.

### DomNodeCollection

Every element wrapped in the `$l` function will return an instance of this. This will allow to run the many functions of the API.

### html

Receives an argument that will then be set as the innerHTML of each of the elements.

### empty

Will clear out the content the element.

### ajax

Makes a simple ajax request. Receives a set of options and then does the call.

```javascript
l.ajax = function (options) {
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
```

### append

Receives an argument and then will add it as a child of the element.

### attr

Returns the attribute value of an element.

### addClass

Adds a class to an element.

```javascript
addClass(string) {
  this.els.forEach( (attr) => {
    return attr.classList.add(string);
  });
}
```

### removeClass

Removes a class from an element.

### children

Returns all the children of the element.

### parent

Returns the parent of the element.

### find

Receives an argument and then returns all the descendants of the element that match it.

### remove

Removes the element from the DOM.

### on

Adds an event handler to the element.

### off

Removes an event handler from the element.
