// load Lunr db and search functions

var listSelector = "#deck-list-container li";
// cls: so we don't start with a blank page:
showAll();

var idx = lunr(function() {
  // define searchable fields
  this.ref("id");
  this.field("title");
  this.field("body");

  this.k1(1.3)
  this.b(0)

  // create a list of all searchable entries by reading out the
  // '#question-list-container' and saving it as a list of json doc's:
  var documents = htmlElementsToJSON(listSelector, function($element) {
    var ref = $element.attr("deck-id"),
      title = $element.find("h2 a").text(),
      body = $element.find("p").text();

    return { id: ref, title: title, body: body };
  });

  // add all entires to lunr
  documents.forEach(function(doc) {
    this.add(doc);
    // console.log(doc);
  }, this);
});

function htmlElementsToJSON(listSelector, unmarschallFunction) {
  // add the list elements to lunr
  var qs = $(listSelector);
  var entries = [];
  for (var i = 0; i < qs.length; i++) {
    var $q = $(qs[i]);
    entries.push(unmarschallFunction($q));
  }
  return entries;
}

function search(searchTerm) {
  var results = idx.search(searchTerm);
  // reset(hide) all entries
  $(listSelector).removeClass("show");
  // console.log("found: "+results.length);
  for (var i = 0; i < results.length; i++) {
    var result = results[i];
    $(listSelector + "[deck-id=" + result.ref + "]").addClass("show");
  }
}

function showAll(searchTerm) {
  $(listSelector).addClass("show");
}

$("#searchterm").on("search paste keyup", function(event) {
  var st = $(this).val();

  if (st.length === 0) {
    showAll();
  } else {
    // make it async, otherwise the keyboard input is interrupted
    setTimeout(function() {
      search(st);
    }, 100);
  }
});

// show all results when clicking this button
$(".all").click(function() {
  showAll();
});

// show oracle decks only
$(".oracle-decks").click(function() {
  search("odeck");
});

// show tarot decks only
$(".tarot-decks").click(function() {
  search("tdeck");
});
