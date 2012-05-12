$(document).ready(function(){

    $("#align").click(function() {
        var first = $("#first").val();
        var second = $("#second").val();
        
        var gap_penalty = $("#gap_penalty").val();
        var mismatch_penalty = $("#mismatch_penalty").val();
        var match_score = $("#match_score").val();
        
        var alignment = Aligner.align({
            first:first,
            second:second,
            gap_penalty:gap_penalty,
            mismatch_penalty:mismatch_penalty,
            match_score:match_score,
        });
        
        alignment.first = alignment.first.replace(" ", "&nbsp;");
        alignment.second = alignment.second.replace(" ", "&nbsp;");
        
        $("#firstResult").html(alignment.first);
        $("#secondResult").html(alignment.second);
        $("#scoreResult").html(alignment.score);
        
    });


});