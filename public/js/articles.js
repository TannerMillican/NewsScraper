$.getJSON("/articles", function (data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        
        $("#articles").append("<div class='card'><div class='card-body'><h5 data-id='" + data[i]._id + "class='card-title'>" + data[i].title + "</h5><p class='card-text'> <small>link: </small> <a href='" + data[i].link + "'> go to article</a><p class='card-text'>" + data[i].summary + "</p><button type='button' data-id='" + data[i]._id + "' class='btn btn-primary' id='addNote'>Add a Note</button>|<button type='button' data-id='" + data[i]._id + "' class='btn btn-primary' id='savedNotes' >Notes for Article</button><div id='myModal' class='modal'><div class='modal-content' id='myModalContent'><span class='close'>&times;</span></div></div><div id='newNote'></div></div></div>")
    }
});

 




$(document).on("click", "#addNote", function() {
    $("#newNote").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

    .then(function(data) {

        console.log(data)

        $("#newNote").append("<h3>Add a note title and note below</h3>");
        $("#newNote").append("<h5>" + data.title + "</h5>");
        $("#newNote").append("<input id='titleinput' name='title' >");
        $("#newNote").append("<br>");
        $("#newNote").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#newNote").append("<br>");
        $("#newNote").append("<button type='button' class='btn btn-primary' data-id='" + data._id + "' id='saveNote'>Save Note</button>");

        if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
        }
    });
});

$(document).on("click", "#saveNote", function () {

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(
            $("#newNote").remove()
        );
});

$(document).on("click", "#savedNotes", function () {

    var thisId = $(this).attr("data-id");
    console.log(thisId)

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

    .then(function(data) {

        console.log(data)

        var modalContent = document.getElementById("myModalContent");

        $(modalContent).append("<div class='card'><div class='card-body'><h5 data-id='" + data.note.id + "class='card-title'>" + data.note.title + "</h5><p class='card-text'>" + data.note.body + "</p><button id='deleteNote'>Delete Note</button></div></div>")

    })
    .then(function() {
        var modal = document.getElementById("myModal");
        var span = $(".close")[0];

        modal.style.display = "block";

        $(span).on("click", function() {
            modal.style.display = "none";
        });

        $(window).on("click", function() {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        })
    })
}) 