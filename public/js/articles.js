$.getJSON("/articles", function (data) {
    console.log(data)
    for (var i = 0; i < data.length; i++) {
        
        $("#articles").append("<div class='card'><div class='card-body'><h5 data-id='" + data[i]._id + "class='card-title'>" + data[i].title + "</h5><p class='card-text'> <small>link: </small> <a href='" + data[i].link + "'> go to article</a><p class='card-text'>" + data[i].summary + "</p><button type='button' data-id='" + data[i]._id + "' class='btn btn-primary' id='addNote'>Add a Note</button> | <button type='button' data-id='" + data[i]._id + "' class='btn btn-primary' id='savedNotes' >Note for this Article</button><div id='myModal' class='modal'><div class='modal-content' id='myModalContent'><span class='close'>&times;Close</span></div></div><div id='newNote'></div></div></div>")
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

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

    .then(function(data) {

        var modalContent = document.getElementById("myModalContent");

        $(modalContent).append("<div class='card'><div id='cardBody' class='card-body'><h3 data-id='" + data.note._id + "' class='card-title'>" + data.note.title + "</h3><p class='card-text'><strong>" + data.note.body + "</strong></p><button type='button' data-id='" + data.note._id + "' class='btn btn-primary' id='deleteNote'>Delete Note</button><br><label for='newTitle'><h3>New Note Title</h3></label><hr><input id='newTitle' name='title'><br><label for='newBody'><strong>New Note Body</strong></label><hr><textarea id='newBody' name='body'></textarea><br><br><button type='button' data-id='" + data.note._id + "' class='btn btn-primary' id='updateNote'>Update Note</button></div></div>")

    })
    .then(function() {
        var modal = document.getElementById("myModal");
        var button = document.getElementById("deleteNote")
        var span = $(".close")[0];

        modal.style.display = "block";

        $(span).on("click", function() {
            modal.style.display = "none";
        });

    })
});

$(document).on("click", "#deleteNote", function() {

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: "/articles/notes/delete" + thisId
    });

    location.reload();
})

$(document).on("click", "#updateNote", function() {

    var thisId = $(this).attr("data-id");
    
    var newTitle = $("#newTitle").val();
    var newBody = $("#newBody").val();

    $.ajax({
        method: "PUT",
        url: "/articles/notes/update/" + thisId,
        data: {
            title: newTitle,
            body: newBody
        }
    })

})