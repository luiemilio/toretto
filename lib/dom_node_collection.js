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
