$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        
        $("#articles").append("<div class='card'><div class='card-body'><h5 data-id='" + data[i]._id + "class='card-title'>" + data[i].title + "</h5><p class='card-text'> <small>link: </small> <a href='" + data[i].link + "'> go to article</a><p class='card-text'>" + data[i].summary + "</p><button type='button' data-id='" + data[i]._id + "' class='btn btn-primary' id='addNote'>Add a Note</button><div id='note'></div></div></div>")
    }
});

// $.getJSON("/notes", function (data) {
//     console.log(data)
//     for (var i = 0; i < data.length; i++) {
//         $("#notes").append("<p data-id='" + data[i]._id + "'> &#8226" + data[i].title + "<br />" + data[i].body + "</p>")
//     }
// })

$(document).on("click", "#addNote", function() {
    $("#note").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

    .then(function(data) {

        $("#note").append("<h3>Add a note title and note below</h3>");
        $("#note").append("<h5>" + data.title + "</h5>");
        $("#note").append("<input id='titleinput' name='title' >");
        $("#note").append("<br>");
        $("#note").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#note").append("<br>");
        $("#note").append("<button type='button' class='btn btn-primary' data-id='" + data._id + "' id='saveNote'>Save Note</button>");

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
        .then(function (data) {

            console.log(data);

            $("#note").remove();
        });
});

