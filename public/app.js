$(document).ready(function () {

  function appendData(data) {
    //Remove any content that may already be on the page
    $("#articles").empty();
    for (var i = 0; i < data.length; i++) {

      $("#articles").append("<p data-id='" + data[i]._id + "'><div class='card mb-3'><div class='row no-gutters'><div class='col-md-2'>" +
        "<img src='" + data[i].image.split(" ")[0] + "' class='card-img'>" +
        "</div><div class='col-md-10'><div class='card-body'><h5 class='card-title'>" + data[i].title +
        "</h5><p class='card-text'>" + data[i].description + "</p><a href='" + data[i].link + "' class='btn btn-primary'>Link to recipe</a>" +
        "<a id='savearticle' class='btn btn-primary' href='' data-id='" + data[i]._id + "'>Save Receipe</a>" +
        "</div></div></div></div>");
    }
  }

  function appendSavedData(data) {

    $('#scrapper-title').empty();
    $('#scrapper-title').append('Saved Recipes');

    $("#articles").empty();

    for (var i = 0; i < data.length; i++) {

      $("#articles").append("<p data-id='" + data[i]._id + "'><div class='card mb-3'><div class='row no-gutters'><div class='col-md-2'>" +
        "<img src='" + data[i].image.split(" ")[0] + "' class='card-img'>" +
        "</div><div class='col-md-10'><div class='card-body'><h5 class='card-title'>" + data[i].title +
        "</h5><p class='card-text'>" + data[i].description + "</p><a href='" + data[i].link + "' class='btn btn-primary'>Link to recipe</a>" +
        "<a id='unsavearticle' class='btn btn-primary' href='' data-id='" + data[i]._id + "'>Remove from Saved</a>" +
        "<a id='addnotes' class='btn btn-primary' href='' data-id='" + data[i]._id + "'>Add or View Notes</a>" +
        "</div></div></div></div>"
        +
        //  Modal
        "<div class='modal' tabindex='-1' role='dialog' id='exampleModal' aria-labelledby='exampleModalLabel' aria-hidden='true'>" +
        "<div class='modal-dialog' role='document'>" +
        "<div class='modal-content'><div class='modal-header'>" +
        "<h5 class='modal-title' id='modalTitle'></h5>" +
        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span></button></div>" +
        "<div class='modal-body' id='preExistingNotes'><p>No notes yet.</p></div>" +
        "<div id='notes'></div>" +
        "<div class='modal-footer'></div></div></div></div>"
      );
    }
  };

  function renderRecipies() {
    // Grab the articles as a json
    $.getJSON("/articles", function (data) {
      appendData(data);
    });
  }

  renderRecipies();

  // scrape recipes
  $("#scrapeArticles").click(function () {
    event.preventDefault();
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/scrape"
    })
      // With that done, add the note information to the page
      .then(function (data) {
        if (data) {
          renderRecipies();
        }
      });
  });

  // Show saved recipes
  $("#savedArticles").click(function () {
    event.preventDefault();
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/saved"
    })
      // With that done, add the note information to the page
      .then(function (data) {
        appendSavedData(data);
        $("#scrapeArticles").hide();
        $("#clearArticles").hide();
        
      });
  });

  // Clear recipes
  $("#clearArticles").click(function () {
    event.preventDefault();
    // remove html so user no longer sees the recipes
    $("#articles").empty();

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/clear"
    })
      // With that done, add the note information to the page
      .then(function (data) {

        console.log(data);
      });
  });

  // Add notes
  $(document).on("click", "#addnotes", function () {

    event.preventDefault();
    $("#exampleModal").modal("show");

    // Empty the notes from the note section
    $("#notes").empty();
    var thisId = $(this).attr("data-id");

    // Make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/notes/" + thisId
    })

      .then(function (data) {

        $("#modalTitle").html("Notes for: " + data[0].title);
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the recipe saved to it
        $("#notes").append("<button type='button' data-id='" + data[0]._id + "' id='savenote' class='btn btn-primary'>Save Note</button>");

        // If there's a note in the article
        if (data[0].note.body) {
          // Place the note in the body textarea
          $("#bodyinput").val(data[0].note.body);
          $("#preExistingNotes").html(data[0].note.body);
        }
      });


  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function () {

    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/newnotes/" + thisId,
      data: {
        note: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function (data) {
        $("#notes").empty();
        $("#exampleModal").modal("hide");
      });
  });

  //   mark an recipe as saved
  $(document).on("click", "#savearticle", function () {

    event.preventDefault();

    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the recipe
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function (data) {
        renderRecipies();
      });
  });

  //   mark an recipe as unsaved
  $(document).on("click", "#unsavearticle", function () {

    event.preventDefault();

    var thisId = $(this).attr("data-id");
    // Now make an ajax call for the recipe
    $.ajax({
      method: "GET",
      url: "/articles/unsave/" + thisId
    })
      // With that done, add the note information to the page
      .then(function (data) {

        // Now make an ajax call for the recipe
        $.ajax({
          method: "GET",
          url: "/articles/saved"
        })
          // With that done, add the note information to the page
          .then(function (data) {
            appendSavedData(data);
          });
      });
  });

});