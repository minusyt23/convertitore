// Crediti: Vitale Carlo Simone

// Conversion variables;
var inBase = 10; var outBase = 2;

// Calculation variables;

String.prototype.reverse = function() { return this.split("").reverse().join(""); }

var calc = {
	add : function(a, b, base) {
		a = parseInt(a, base); b = parseInt(b, base);
		return (a + b).toString(base);
	},

	sub : function(a, b, base) {
		a = parseInt(a, base); b = parseInt(b, base);
		return (a - b).toString(base);
	},

	mul : function(a, b, base) {
		a = parseInt(a, base); b = parseInt(b, base);
		return (a * b).toString(base);
	},

	div : function(a, b, base) {
		a = parseInt(a, base); b = parseInt(b, base);
		return (a / b).toString(base);
	},
};



function APPConvert(number) {

	var tempConversion;
	
	var powerConv = false;
	var hiddenPower2Conv = false;
	var hiddenPower3Conv = false;
	
	var maxExp = 8;
	
	// Checks for Power Conversions
	
	for(var i = 1; i <= maxExp; i++) {
		if((inBase ** i) == outBase || (outBase ** i) == inBase) {
			powerConv = true;
		}
	}
	
	// Checks for hidden power² conversion
	
	var a = false, b = false;
	
	for(var i = 1; i <= maxExp; i++) {
		
		if((2 ** i) == inBase) {
			a = true;
		}
		if((2 ** i) == outBase) {
			b = true;
		}
		if(a == true && b == true) {
			hiddenPower2Conv = true;
			
		}
	}
	
	// Checks for hidden power³ conversion
	
	a = false; b = false;
	
	for(var i = 1; i <= maxExp; i++) {
		
		if((3 ** i) == inBase) {
			a = true;
		}
		if((3 ** i) == outBase) {
			b = true;
		}
		if(a == true && b == true) {
			hiddenPower3Conv = true;
		}
	}
	
	if (powerConv) { // Power conversion
		console.log("Power conversion:");
		
		tempConversion = convert.power(number, inBase, outBase);
		displayConversion.power(tempConversion);
		
		console.log(tempConversion);
	} else if (hiddenPower2Conv) { 
		console.log("Hidden power conversion: convert from base to 2");
		tempConversion = convert.power(number, inBase, 2);
		displayConversion.power(tempConversion, inBase, 2);
		console.log(tempConversion);
		console.log("Then from 2 to outBase:");
		tempConversion = convert.power(tempConversion.string, 2, outBase);
		displayConversion.power(tempConversion, 2);
		console.log(tempConversion);
	} else if (outBase != 10 && inBase != 10) { // Combo conversion
		console.log("First we transform in base 10:");
		tempConversion = convert.positional(number, inBase);
		displayConversion.positional(tempConversion);
		console.log(tempConversion);
		console.log("Then into our outBase:");
		tempConversion = convert.divmul(tempConversion.string, outBase);
		displayConversion.divmul(tempConversion);
		console.log(tempConversion);
		
	} else if (outBase == 10 && inBase != 10) { // Conversion in base 10
		console.log("We transform in base 10:");
		tempConversion = convert.positional(number, inBase);
		displayConversion.positional(tempConversion);
		console.log(tempConversion);
	} else if (outBase != 10 && inBase == 10) { // Conversion from base 10
		console.log("Just into our outBase:");
		tempConversion = convert.divmul(number, outBase);
		displayConversion.divmul(tempConversion);
		console.log(tempConversion);
	}
	displayConversion.finalResult(tempConversion);
}

function APPCalculate(number) {
	
}

document.getElementById("inBase").addEventListener("input", () => {
	inBase = parseInt(document.getElementById("inBase").value);
	document.getElementById("inBaseValue").innerText = inBase;
});

document.getElementById("outBase").addEventListener("input", () => {
	outBase = parseInt(document.getElementById("outBase").value);
	document.getElementById("outBaseValue").innerText = outBase;
});

document.getElementById("numberConvert").addEventListener("click", () => {
	APPConvert(document.getElementById("numberInput").value);
});

// Crediti: Vitale Carlo Simone
