// $(document).ready(function(){
//     $("h1").css("color", "red");
// });

$("h1").addClass("big-title");
$("h1").text("Bye");

$("Button").html("<em>Click</em>");

$("a").attr("href", "https://www.google.com");

// $("h1").click(function(){
//     $("h1").css("color", "purple");
// });

$("button").click(function () {
    //$("h1").fadeToggle();
    $("h1").slideToggle().animate({opacity: 0.5});
});

$(document).keypress(function (event) {
    $("h1").text(event.key);
});