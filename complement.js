// Crediti: Vitale Carlo Simone

var complement = {
    twos: function(number) {
        //Ima use the "LOOK RIGHT AND FIND NUMBER" agorithm

        var result = "";
        var cutStr = "";
        var tempStr = "";
        var i = 0;

        if(typeof number !== "string") return result;

        i = number.length - 1;

        while(number[i] == "0") {
            result = number[i] + result;
            i--;
        }

        // Add the previous "1" manually cause i dont wanna run into probs

        result = "1" + result; // Dont remove cause of the next thing. AHAH

        cutStr = number.substring(0, i);


        for(var j = 0; j < cutStr.length; j++) {
            console.log(cutStr[j])
            if(cutStr[j] == "0") { 
                tempStr += "1";
                console.log("boh");
            } else {
                tempStr += "0";
                console.log("lol");
            }
        }

        result = tempStr + result;

        return result;
        
    }
}

// Crediti: Vitale Carlo Simone