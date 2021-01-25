// Crediti: Vitale Carlo Simone

String.prototype.reverse = function() { return this.split("").reverse().join(""); }

var calculate = {
    add: function(addend1, addend2, bits) {
        var proc = [];
        var carry = 0; 
        var finalStr = "";
        var overflow = false;
        
        // check if addends is string.
        if(typeof addend1 !== "string" || typeof addend2 !== "string") return proc;
        
        // make a copy list cause u dont wanna mess with other data u suck bro.

        addend1 = addend1.padStart(bits, "0");
        addend2 = addend2.padStart(bits, "0");

        // add the shlt out of it

        for (var i = bits - 1; i >= 0; i--) {
            var num1 = addend1[i] | 0;
            var num2 = addend2[i] | 0;
            
            var result = num1 + num2 + carry;
            if (carry > 0) carry--;
            if (result > 1) { result %= 2; carry = 1; };

            var p = {}; p.result = result; p.addend1 = num1; p.addend2 = num2; p.carry = carry;
            proc.push(p);

            finalStr = result + finalStr;
        }

        if((parseInt(addend1,2) + parseInt(addend2,2)) != parseInt(finalStr,2)) overflow = true;

        return {proc: proc, string: finalStr, overflow: overflow};
    },

    sub: function(subtrahend, minuend, bits) {
        var proc = [];
        var remainder = 0;
        var finalStr = "";
        var underflow = false;

        if(typeof subtrahend !== "string" || typeof minuend !== "string") return proc;

        subtrahend = subtrahend.padStart(bits, "0");
        minuend = minuend.padStart(bits, "0");

        // subtract the shlt out of it
        // "sketchy as hell, please let's think different."

        for (var i = bits - 1; i >= 0; i--) {
            var num1 = subtrahend[i] | 0;
            var num2 = minuend[i] | 0;
            
            var result = (remainder ^ num1) - num2;
            
            if (remainder != 0 && num1 == 1) remainder = 0;
            if (result < 0) { result = 1; remainder = 1; };

            var p = {}; p.result = result; p.subtrahend = num1; p.minuend = num2; p.remainder = remainder;
            proc.push(p);

            finalStr = result + finalStr;
        }

        return {proc: proc, string: finalStr, underflow: underflow};
    },

    mul: function(multiplier, multiplicand, bits) {
        var proc = [];
        var carry = 0;
        var finalStr = "";
        var overflow = false;

        if(typeof multiplier !== "string" || typeof multiplicand !== "string") return proc;

        // multiply the shlt out of it
        // "what"

        for (var i = multiplicand.length - 1, j = 0; i >= 0, j < multiplicand.length; i--, j++) {
            var yesorno = multiplicand[i] | 0;
            
            if(yesorno) { }

            var result = 0;
        }

        multiplier = multiplier.padStart(bits, "0");
        multiplicand = multiplicand.padStart(bits, "0");

        for (var i = bits - 1; i >= 0; i--) {
            var num1 = multiplier[i] | 0;
            var num2 = multiplicand[i] | 0;

            var result = 0;
        }
    }
     
}

// Crediti: Vitale Carlo Simone