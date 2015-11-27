function TableOfContents(container) {
  this.container = container;
  this.uls = [document.createElement("ul")];
  this.buildStructure();
}

TableOfContents.prototype.buildStructure = function() {
  var titles = this.container.querySelectorAll("h2, h3, h4, h5"),
  lastLvl = 0;
  for (var i = 0; i < titles.length; i++) {
    var title = titles[i],
    lvl = parseInt(title.tagName.replace("H", ""), 10) - 1;
    if (lvl - lastLvl > 1) {
      throw "There is an error in the titles structure: an h" + (lvl + 1) + " is following an h" + (lastLvl + 1) ;
    }
    lastLvl = lvl;
    var li = document.createElement("li"),
    a = document.createElement("a");
    a.setAttribute('href', '#');
    a.textContent = title.textContent;
    li.appendChild(a);
    if (!this.uls[lvl - 1]) {
      var ul = document.createElement("ul");
      this.uls[lvl - 1] = ul;
      this.uls[lvl - 2].lastChild.appendChild(ul);
    }
    this.uls[lvl] = null;  
    this.uls[lvl - 1].appendChild(li);
    this.bindScroll(a, title);
    
    a.addEventListener("click", function(e) {
      e.preventDefault();
    });
  }
};

TableOfContents.prototype.appendTo = function(element) {
  element.appendChild(this.uls[0]);
};

TableOfContents.prototype.bindScroll = function(a, title) {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    document.body.scrollTop = title.offsetTop;
  });
};

// to initialize a new table of contents on a page, specify the page's wrapper and the table of contents's wrapper
var t = new TableOfContents(document.querySelector(".container"));
t.appendTo(document.querySelector("#table-of-contents"));
