Aligner = {
    
    GAP_PENALTY:-2,
    MISMATCH_PENALTY:-1,
    MATCH_SCORE:1,

    align: function(options) {
        var first = options.first;
        var second = options.second;
        
        Aligner.GAP_PENALTY = parseInt(options.gap_penalty);
        Aligner.MISMATCH_PENALTY = parseInt(options.mismatch_penalty);
        Aligner.MATCH_SCORE = parseInt(options.match_score);
        
        var best = Aligner.recursivelyAlign({
            first:first,
            second:second,
        });
        console.log(best);
        
        return {
            first:best.first,
            second:best.second,
            score:best.score,
        }
        
    },
    recursivelyAlign: function(options) {
        if (options.first == "" || options.second == "") {
            var len = Math.max(options.first.length, options.second.length);
            return {
                first:options.first,
                second:options.second,
                score:len*Aligner.GAP_PENALTY,
            };
        }
        
        var firstChar = options.first[0];
        var secondChar = options.second[0];
        var match_penalty = firstChar == secondChar ? Aligner.MATCH_SCORE : Aligner.MISMATCH_PENALTY;
        
        // Case 1: Match the characters in both strands to each other
        var case1 = Aligner.recursivelyAlign({
            first:options.first.substr(1),
            second:options.second.substr(1),
        });
        
        case1.score += match_penalty;
        case1.first = firstChar + case1.first;
        case1.second = secondChar + case1.second; 
        
        var bestCase = case1;
        
        
        // Case 2: Match firstChar to a space
        var case2 = Aligner.recursivelyAlign({
            first:options.first.substr(1),
            second:options.second,
        });
        
        case2.score += Aligner.GAP_PENALTY;
        case2.first = firstChar + case2.first;
        case2.second = " " + case2.second;
        
        if (case2.score > bestCase.score) {
            bestCase = case2;
        }
        
        // Case 3: Match secondChar to a space
        var case3 = Aligner.recursivelyAlign({
            first:options.first,
            second:options.second.substr(1),
        });
        
        case3.score += Aligner.GAP_PENALTY;
        case3.first = " " + case3.first;
        case3.second = secondChar + case3.second;
        
        if (case3.score > bestCase.score) {
            bestCase = case3;
        }
        
        return bestCase;
    }
}