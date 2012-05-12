$(document).ready(function(){

    $("#align").click(function() {
        var first = $("#first").val();
        var second = $("#second").val();
        
        Aligner.align({
            first:first,
            second:second,
        });
        
    });


});