// Crediti: Vitale Carlo Simone

var splitNumber = /\.|\,/g;

var convert = {
	fast: function (num, b1, b2) {
		return (parseInt(num, b1)).toString(b2);
	},
	
	power: function (num, b1, b2) {
		
		// To convert from a power to another. e.g. Base 2 to Base 8, or Base 4 to Base 16.
		
		// Find exponential:
		var exp = 0; var exp2 = 0;
		
		while (b1 ** exp < b2) exp++;
		while (b2 ** exp2 < b1) exp2++;
		
		var proc = []; var finalStr = ""; 
		
		var finalIntLen = 1;
		var numbers = num.split(splitNumber);
		
		// Find finalStrLen:
		finalIntLen = Math.ceil(numbers[0].length / exp);

		// Convert Integer
		for (var i = 0; i < finalIntLen; i++) {
			var tempStr = numbers[0].substring(numbers[0].length - (i * exp), numbers[0].length - exp - (i * exp)).padStart(exp, "0");
			var tempNum = (this.fast(tempStr, b1, b2)).padStart(exp2, "0");
			var p = {}; p.original = tempStr; p.converted = tempNum; p.type = "integer";
			proc.push(p);
			finalStr += tempNum.reverse();
		} 
		
		finalStr = finalStr.reverse();
		
		if (numbers.length <= 1)
			return {proc: proc.reverse(), string: finalStr };
		
		finalStr += ".";
		
		// Convert Float
		var finalFloatLen = 1;
		
		finalFloatLen = Math.ceil((numbers[1].length - (numbers[1].includes("_"))) / exp);

		var tempPush = []; 
		
		for (var i = 0; i < finalFloatLen; i++) {
			
			var tempStr = numbers[1].substring((i * exp), exp + (i * exp)).padEnd(exp, "0");;
			var tempNum = (this.fast(tempStr, b1, b2)).padEnd(exp2, "0");
			var p = {}; p.original = tempStr; p.converted = tempNum.reverse(); p.type = "float";
			tempPush.push(p);
			finalStr += tempNum.reverse();
		} 
		
		// Finish work:
		 
		tempPush = tempPush.reverse();
		proc = tempPush.concat(proc);
		
		return {proc: proc.reverse(), string: finalStr };
	},
	
	positional: function (num, b1) {
		// To convert from base x to base 10.
		var offset = 0;
		var numbers = num.split(splitNumber);
		
		offset = numbers[0].length;
		
		numbers = numbers.join("");
		
		var proc = [];
		var finalStr = 0;
		for (var i = 0; i < numbers.length; i++) {
			var n = this.fast(numbers[i], b1, 10);
			var mult = (b1 ** (offset - i - 1));
            var power = (offset - i - 1);

			var p = {}; p.original = numbers[i]; p.converted = n; p.multiplier = mult; p.power = power;
			proc.push(p);
			finalStr += n * mult;
		}
		
		proc = proc.reverse();
		finalStr = finalStr.toString();
		
		return {proc: proc, string: finalStr};
	},
	
	divmul: function (num, b1) {
		// To convert from base 10 to base x.
		var proc = [];
		var finalStr = "";
		
		// Make sure num is string:
		if (typeof num == "number") num = num.toString();
		
		// Keep it Integer
		var numbers = num.split(splitNumber);
		
		while(numbers[0] > 0) {
			var p = {}; p.converted = this.fast(numbers[0] % b1, 10, b1); p.dividend = numbers[0]; p.divisor = b1; p.type = "integer";
			proc.push(p);
			
			finalStr += p.converted;
			
			numbers[0] = (numbers[0] / b1) >> 0;
		}
		
		if(numbers[1]) {
			var tempConversion = this.floatBN(num, b1);
			// proc = proc.concat(tempConversion.proc);
			finalStr = tempConversion.string.reverse() + "." + finalStr;
			
			return {proc: {integer: proc, float: tempConversion.proc}, string: finalStr.reverse()}; 
		}
		
		return {proc: {integer: proc}, string: finalStr.reverse()};
	},
	
	float: function (num, b1) {
		var floatNumLen = num.split(splitNumber)[1].length;
		var floatNum = num.split(splitNumber)[1] / (10 ** num.split(splitNumber)[1].length);
		
		var o = 1.5; var proc = []; var finalStr = "";
		var limit = 15; var iLimit = 0;
		
		var holdFloatNum = [];
		
		while ((o != (o >> 0)) && (iLimit < limit)) {
			o = floatNum * b1;
						
			var p = {}; p.converted = this.fast(o >> 0, 10, b1); p.multiplicand = floatNum; p.multiplier = b1; p.result = o; p.type = "float";
			finalStr += p.converted;
			proc.push(p);
			
			floatNum = (o - (o >> 0)).toPrecision(floatNumLen);
			
			// CAN'T USE IT: FLOAT PRECISION SUCKS.
			// holdFloatNum.push(floatNum);
			// console.log(holdFloatNum.filter((value) => {return value == floatNum;}));
			
			iLimit++;
		}
		
		console.log("Could be a periodic number, who knows...");
		
		return {proc: proc, string: finalStr};
	},
	
	floatBN: function (num, b1) {
		
		BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_DOWN });
		
		var floatNumLen = num.split(splitNumber)[1].length;
		var floatNum = new BigNumber(num.split(splitNumber)[1]).dividedBy(10 ** num.split(splitNumber)[1].length);
		
		var o = new BigNumber("1.5"); var proc = []; var finalStr = "";
		var limit = 15; var iLimit = 0;
		
		var holdFloatNum = [];
		
		while (!(o.isEqualTo(o.integerValue())) && (iLimit < limit)) {
			o = (new BigNumber(floatNum).multipliedBy(b1));

			var p = {}; p.converted = this.fast(o.integerValue().toString(), 10, b1); p.multiplicand = floatNum.toString(); p.multiplier = b1; p.result = o.toString(); p.type = "float";
			finalStr += p.converted;
			proc.push(p);
			
			floatNum = (new BigNumber(o).minus(o.integerValue()));

			// CAN'T USE IT: FLOAT PRECISION SUCKS.
			// holdFloatNum.push(floatNum);
			// console.log(holdFloatNum.filter((value) => {return value == floatNum;}));
			
			iLimit++;
		}
		
		return {proc: proc, string: finalStr};
	}
};

// Crediti: Vitale Carlo Simone
