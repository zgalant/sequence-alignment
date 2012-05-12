$(document).ready(function(){

    $("#align").click(function() {
        var first = $("#first").val();
        var second = $("#second").val();
        
        var alignment = Aligner.align({
            first:first,
            second:second,
        });
        
        $("#firstResult").html(alignment.first);
        $("#secondResult").html(alignment.second);
        $("#scoreResult").html(alignment.score);
        
    });


});