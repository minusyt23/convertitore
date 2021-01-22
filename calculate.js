// Crediti: Vitale Carlo Simone

String.prototype.reverse = function() {
	return this.split("").reverse().join("");
}

var calculate = {
    add: function(addends, bits) {
        proc = [];
        // check if addends is array and then, checks if the content is string.
        // first check in this project woohoo
        if(typeof addends !== "object") return proc;
        if(addends.length < 2) return proc;
        if(typeof addends[0] !== "string" || typeof addends[1] !== "string") return proc;
        
        var tempNum1 = addends[0]; var tempNum2 = addends[1]; 
        tempNum1.padStart(3, "0");
        tempNum2.padStart(bits, "0");
        var cp_addends = new Array(2)
        cp_addends[0] = tempNum1; cp_addends[1] = tempNum2;

        console.log(tempNum1);

        // add the shlt out of it

        var remainder = 0; 
        var finalStr = "";

        var pSt = "1";
        pSt.padStart(bits, "0");
        console.log(pSt);

        for (var i = bits - 1; i >= 0; i--) {
            var num1 = cp_addends[0][i] | 0;
            var num2 = cp_addends[1][i] | 0;
            
            var result = num1 + num2 + remainder;
            if (remainder > 0) remainder--;
            if (result > 1) { result %= 2; remainder = 1; };

            var p = {}; p.result = result; p.num1 = num1; p.num2 = num2; p.remainder = remainder;
            proc.push(p);

            finalStr += result;
        }

        return {proc: proc, string: finalStr.reverse()};
    }
}