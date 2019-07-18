$(document).ready(function () {

  function appendData(data) {
    //Remove any content that may already be on the page
    $("#articles").empty();
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page

      $("#articles").append("<p data-id='" + data[i]._id + "'><div class='card mb-3'><div class='row no-gutters'><div class='col-md-2'>" +
        "<img src='" + data[i].image.split(" ")[0] + "' class='card-img'>" +
        "</div><div class='col-md-10'><div class='card-body'><h5 class='card-title'>" + data[i].title +
        "</h5><p class='card-text'>" + data[i].description + "</p><a href='" + data[i].link + "' class='btn btn-primary'>Link to recipe</a>" +
        "<a id='savearticle' class='btn btn-primary' href='' data-id='" + data[i]._id + "'>Save Receipe</a>" +
        "</div></div></div></div>");
    }
  }

  function renderRecipies() {
    // Grab the articles as a json
    $.getJSON("/articles", function (data) {
      appendData(data);
    });
  }

  renderRecipies();

  // scrape articles - DONE
  $("#scrapeArticles").click(function () {
    event.preventDefault();
    alert("This scrape may take a few seconds to complete. Thank you for waiting!");
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


  //   Show saved articles - DONE
  $("#savedArticles").click(function () {
    event.preventDefault();
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/saved"
    })
      // With that done, add the note information to the page
      .then(function (data) {
        let $title = $('#scrapper-title');
        $title.empty();
        $title.append('Saved Recipies');

        //Remove any content that may already be on the page
        $("#articles").empty();
        // For each one
        for (var i = 0; i < data.length; i++) {
          // Display the apropos information on the page
          $("#articles").append("<p data-id='" + data[i]._id + "'><div class='card mb-3'><div class='row no-gutters'><div class='col-md-2'>" +
            "<img src='" + data[i].image.split(" ")[0] + "' class='card-img'>" +
            "</div><div class='col-md-10'><div class='card-body'><h5 class='card-title'>" + data[i].title +
            "</h5><p class='card-text'>" + data[i].description + "</p><a href='" + data[i].link + "' class='btn btn-primary'>Link to recipe</a>" +
            "<a id='unsavearticle' class='btn btn-primary' href='' data-id='" + data[i]._id + "'>Remove from Saved</a>" +
            "<a id='addnotes' class='btn btn-primary' href='' data-id='" + data[i]._id + "'>Add Notes</a>" +
            "</div></div></div></div>");
        }

      });
  });

  $("#clearArticles").click(function () {
    event.preventDefault();
    // remove html so user no longer sees the recipies
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


  //   mark an article as saved - DONE
  $(document).on("click", "#savearticle", function () {

    event.preventDefault();

    var thisId = $(this).attr("data-id");
    console.log(thisId);

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function (data) {
        console.log(data);

      });
  });

    //   mark an article as unsaved
    $(document).on("click", "#unsavearticle", function () {

      event.preventDefault();
  
      var thisId = $(this).attr("data-id");
      // Now make an ajax call for the Article
      $.ajax({
        method: "GET",
        url: "/articles/unsave/" + thisId
      })
        // With that done, add the note information to the page
        .then(function (data) {

    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/saved"
    })
      // With that done, add the note information to the page
      .then(function (data) {
        let $title = $('#scrapper-title');
        $title.empty();
        $title.append('Saved Recipies');

        //Remove any content that may already be on the page
        $("#articles").empty();
        // For each one
        for (var i = 0; i < data.length; i++) {
          // Display the apropos information on the page
          $("#articles").append("<p data-id='" + data[i]._id + "'><div class='card mb-3'><div class='row no-gutters'><div class='col-md-2'>" +
            "<img src='" + data[i].image.split(" ")[0] + "' class='card-img'>" +
            "</div><div class='col-md-10'><div class='card-body'><h5 class='card-title'>" + data[i].title +
            "</h5><p class='card-text'>" + data[i].description + "</p><a href='" + data[i].link + "' class='btn btn-primary'>Link to recipe</a>" +
            "<a id='unsavearticle' class='btn btn-primary' href='' data-id='" + data[i]._id + "'>Remove from Saved</a>" +
            "<a id='addnotes' class='btn btn-primary' href='' data-id='" + data[i]._id + "'>Add Notes</a>" +
            "</div></div></div></div>");
        }

      });

  
        });
    });


  //   // Whenever someone clicks a p tag
  //   $(document).on("click", "p", function() {
  //     // Empty the notes from the note section
  //     $("#notes").empty();
  //     // Save the id from the p tag
  //     var thisId = $(this).attr("data-id");

  //     // Now make an ajax call for the Article
  //     $.ajax({
  //       method: "GET",
  //       url: "/articles/" + thisId
  //     })
  //       // With that done, add the note information to the page
  //       .then(function(data) {
  //         console.log(data);
  //         // The title of the article
  //         $("#notes").append("<h2>" + data.title + "</h2>");
  //         // An input to enter a new title
  //         $("#notes").append("<input id='titleinput' name='title' >");
  //         // A textarea to add a new note body
  //         $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
  //         // A button to submit a new note, with the id of the article saved to it
  //         $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

  //         // If there's a note in the article
  //         if (data.note) {
  //           // Place the title of the note in the title input
  //           $("#titleinput").val(data.note.title);
  //           // Place the body of the note in the body textarea
  //           $("#bodyinput").val(data.note.body);
  //         }
  //       });
  //   });

  //   // When you click the savenote button
  //   $(document).on("click", "#savenote", function() {
  //     // Grab the id associated with the article from the submit button
  //     var thisId = $(this).attr("data-id");

  //     // Run a POST request to change the note, using what's entered in the inputs
  //     $.ajax({
  //       method: "POST",
  //       url: "/articles/" + thisId,
  //       data: {
  //         // Value taken from title input
  //         title: $("#titleinput").val(),
  //         // Value taken from note textarea
  //         body: $("#bodyinput").val()
  //       }
  //     })
  //       // With that done
  //       .then(function(data) {
  //         // Log the response
  //         console.log(data);
  //         // Empty the notes section
  //         $("#notes").empty();
  //       });

  //     // Also, remove the values entered in the input and textarea for note entry
  //     $("#titleinput").val("");
  //     $("#bodyinput").val("");
  //   });
});