var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

var activeNote = {};

var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

var deleteNote = function(id) {
  return $.ajax({
    url: "/api/notes" + id,
    method: "DELETE",
  });
};

var renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr('readonly', true);
    $noteText.attr('readonly', true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.att('readonly', false);
    $noteText.att('readonly', false);
    $noteTitle.val('');
    $noteText.val('');
  }
};

var handleNoteSave = function() {
   var newNote = {
    title: noteTitle.val(),
    text: noteText.val()
  };
  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
var handleNoteView = function() {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

// Renders the appropriate buttons based on the state of the form
var handleRenderBtns = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render the list of note titles
var renderNoteList = function(notes) {
  $noteList.empty();
  
  var noteListItems = [];

  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);

    noteListItems.push($li);
  }
  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};


$saveNoteBtn.on('click', handleNoteSave);
$newNoteBtn.on('click', handleNewNoteView);
$noteList.on('click', '.list-group-item', handleNoteView);
$noteTitle.on('keyup', handleRenderSaveBtn);
$noteText.on('keyup', handleRenderSaveBtn);


getAndRenderNotes();