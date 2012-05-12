Aligner = {
    
    GAP_PENALTY:-2,
    MISMATCH_PENALTY:-1,
    MATCH_SCORE:1,
    
    
    align: function(options) {
        var first = options.first;
        var second = options.second;
        
        var best = Aligner.recursivelyAlign({
            firstSoFar:"",
            secondSoFar:"",
            first:first,
            second:second,
            score:0,
        });
        
        return {
            first:best.firstSoFar,
            second:best.secondSoFar,
            score:best.score,
        }
        
    },
    recursivelyAlign: function(options) {
        if (options.first == "") {
            return {
                firstSoFar:options.firstSoFar,
                secondSoFar:options.secondSoFar + options.second,
                score:options.score + options.second.length*Aligner.GAP_PENALTY,
            };
        }
        
        if (options.second == "") {
            return {
                firstSoFar:options.firstSoFar + options.first,
                secondSoFar:options.secondSoFar,
                score:options.score + options.first.length*Aligner.GAP_PENALTY,
            };
        }
        
        var firstChar = options.first[0];
        var secondChar = options.second[0];
        var match_penalty = firstChar == secondChar ? Aligner.MATCH_SCORE : Aligner.MISMATCH_PENALTY;
        
        // Case 1: Match the characters in both strands to each other
        var case1 = Aligner.recursivelyAlign({
            firstSoFar:options.firstSoFar + firstChar,
            secondSoFar:options.secondSoFar + secondChar,
            score:options.score + match_penalty,
            first:options.first.substr(1),
            second:options.second.substr(1),
        });
        
        var bestCase = case1;
        
        // Case 2: Match firstChar to a space
        var case2 = Aligner.recursivelyAlign({
            firstSoFar:options.firstSoFar + firstChar,
            secondSoFar:options.secondSoFar + " ",
            score:options.score + Aligner.GAP_PENALTY,
            first:options.first.substr(1),
            second:options.second,
        });
        
        if (case2.score > bestCase.score) {
            bestCase = case2;
        }
        
        // Case 3: Match secondChar to a space
        var case3 = Aligner.recursivelyAlign({
            firstSoFar:options.firstSoFar + " ",
            secondSoFar:options.secondSoFar + secondChar,
            score:options.score + Aligner.GAP_PENALTY,
            first:options.first,
            second:options.second.substr(1),
        });
        
        if (case3.score > bestCase.score) {
            bestCase = case3;
        }
        
        return bestCase;
        
        
    }
}