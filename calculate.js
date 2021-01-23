// Crediti: Vitale Carlo Simone

String.prototype.reverse = function() { return this.split("").reverse().join(""); }

var calculate = {
    add: function(addend1, addend2, bits, mode) {
        // explainin' mode:
        /* mode = 
                "BIN": adds as a pure binary number.
                "SVA": adds as a number which has the msb used as sign (half the possible range).
                "TWC": it's two's complement, idk how it works
        */
        
        proc = [];
        // check if addends is string.
        // first check in this project woohoo
        if(typeof addend1 !== "string" || typeof addend2 !== "string") return proc;
        
        // make a copy list cause u dont wanna mess with other data u suck bro.

        addend1 = addend1.padStart(bits, "0");
        addend2 = addend2.padStart(bits, "0");

        // add the shlt out of it

        var remainder = 0; 
        var finalStr = "";

        for (var i = bits - 1; i >= 0; i--) {
            var num1 = addend1[i] | 0;
            var num2 = addend2[i] | 0;
            
            var result = num1 + num2 + remainder;
            if (remainder > 0) remainder--;
            if (result > 1) { result %= 2; remainder = 1; };

            var p = {}; p.result = result; p.num1 = num1; p.num2 = num2; p.remainder = remainder;
            proc.push(p);

            finalStr = result + finalStr;
        }

        return {proc: proc, string: finalStr};
    },
    sub: function(subtrahend, minuend, bits, mode) {

    }
     
}

// Crediti: Vitale Carlo Simone