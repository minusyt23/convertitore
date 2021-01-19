// Crediti: Vitale Carlo Simone

var displayConversion = {
	power: function(conversion, inB, outB) {
		
		if(inB === undefined) inB = inBase;
		if(outB === undefined) outB = outBase;
		
		var floatStart = true;
		
		// Create Elements:
		var mainDiv = document.createElement("div");
		var labelText = document.createTextNode("Conversione a basi di potenze, da " + inB + " a " + outB + ":");
		var label = document.createElement("p");
		var calcDiv = document.createElement("div"); calcDiv.classList.add("row");
		
		// Fill the Elements:
		for (var i = 0; i < conversion.proc.length; i++) {
					
			if(conversion.proc[i].type == "float" && floatStart) {
				
				floatStart = false;
				
				let commaText = document.createTextNode(",");
				let comma = document.createElement("p");
				let numDiv = document.createElement("div"); numDiv.classList.add("column");
				
				comma.appendChild(commaText);
				numDiv.appendChild(comma);
				calcDiv.appendChild(numDiv);
			}
			
			let resultText1 = document.createTextNode(conversion.proc[i].original + " =");
			let enter = document.createElement("br");
			let resultText2 = document.createTextNode(conversion.proc[i].converted);
			let result = document.createElement("p");
			let numDiv = document.createElement("div"); numDiv.classList.add("column");
			
			result.appendChild(resultText1);
			result.appendChild(enter);
			result.appendChild(resultText2);
			numDiv.appendChild(result);
			calcDiv.appendChild(numDiv);
		}
		
		// Order Elements:
		label.appendChild(labelText);
		mainDiv.appendChild(label);
		mainDiv.appendChild(calcDiv);
		document.getElementById("conversion").appendChild(mainDiv);
		
		return mainDiv;
	},
	
	positional: function(conversion) {
		var mainDiv = document.createElement("div");
		var labelText = document.createTextNode("Conversione posizionale, da " + inBase + " a 10:");
		var label = document.createElement("p");
		var calcDiv = document.createElement("div");
		
		var finalStr1 = "";
		var finalStr2 = ""; 
		var finalStr3 = "";
		
		for (var i = conversion.proc.length -1;  i >= 0; i--) {
					
			finalStr1 += conversion.proc[i].original + " &middot 10" + (conversion.proc[i].power).toString().sup() + (i == 0 ? " = " : " + ");
			finalStr2 += conversion.proc[i].converted + " &middot " + inBase + (conversion.proc[i].power).toString().sup() + (i == 0 ? " = " : " + ");
			finalStr3 += conversion.proc[i].converted + " &middot " + conversion.proc[i].multiplier + (i == 0 ? " = " : " + ");
		}
		
		var result = document.createElement("p");
		
		result.innerHTML += finalStr1;
		result.innerHTML += "<br>";
		result.innerHTML += finalStr2;
		result.innerHTML += "<br>";
		result.innerHTML += finalStr3;
		result.innerHTML += "<br>";
		result.innerHTML += conversion.string;
		
		calcDiv.appendChild(result);
		
		// Order Elements:
		label.appendChild(labelText);
		mainDiv.appendChild(label);
		mainDiv.appendChild(calcDiv);
		document.getElementById("conversion").appendChild(mainDiv);
		
		return mainDiv;
	},
	
	divmul: function(conversion) {
		var mainDiv = document.createElement("div");
		var labelText = document.createTextNode("Conversione a divisioni e moltiplicazioni successive, da 10 a " + outBase + ":");
		var label = document.createElement("p");
		var calcDiv = document.createElement("div");
		
		// Division Table:
		var divisionTable = document.createElement("table");
		// Explain Columns:
		var explainDividendText = document.createTextNode("Colonna dei dividendi");
		var explainDivisorText = document.createTextNode("Colonna dei divisori");
		var explainDResultText = document.createTextNode("Colonna dei risultati (già convertiti)");
		var explainDividend = document.createElement("td");
		var explainDivisor = document.createElement("td");
		var explainDResult = document.createElement("td");
		
		explainDividend.appendChild(explainDividendText);
		explainDivisor.appendChild(explainDivisorText);
		explainDResult.appendChild(explainDResultText);
		
		var explainDivisionRow = document.createElement("tr");
		explainDivisionRow.appendChild(explainDividend);
		explainDivisionRow.appendChild(explainDivisor);
		explainDivisionRow.appendChild(explainDResult);
		
		divisionTable.appendChild(explainDivisionRow);
		
		for(i = 0; i < conversion.proc.integer.length; i++) {
			let dividendText = document.createTextNode(conversion.proc.integer[i].dividend);
			let divisorText = document.createTextNode(conversion.proc.integer[i].divisor);
			let resultText = document.createTextNode(conversion.proc.integer[i].converted);
			let dividend = document.createElement("td");
			let divisor = document.createElement("td");
			let result = document.createElement("td");
			
			dividend.appendChild(dividendText);
			divisor.appendChild(divisorText);
			result.appendChild(resultText);
			
			let divisionRow = document.createElement("tr");
			divisionRow.appendChild(dividend);
			divisionRow.appendChild(divisor);
			divisionRow.appendChild(result);
			
			divisionTable.appendChild(divisionRow);
		}
		
		calcDiv.appendChild(divisionTable);
		
		if ( conversion.proc.float ) {
			var multiplicationTable = document.createElement("table");
			// Explain Columns:
			var explainMultiplicandText = document.createTextNode("Colonna dei moltiplicandi");
			var explainMultiplierText = document.createTextNode("Colonna dei moltiplicatori");
			var explainMResultText = document.createTextNode("Colonna dei risultati");
			var explainMultiplicand = document.createElement("td");
			var explainMultiplier = document.createElement("td");
			var explainMResult = document.createElement("td");
			
			explainMultiplicand.appendChild(explainMultiplicandText);
			explainMultiplier.appendChild(explainMultiplierText);
			explainMResult.appendChild(explainMResultText);
			
			var explainMultiplicationRow = document.createElement("tr");
			explainMultiplicationRow.appendChild(explainMultiplicand);
			explainMultiplicationRow.appendChild(explainMultiplier);
			explainMultiplicationRow.appendChild(explainMResult);
			
			multiplicationTable.appendChild(explainMultiplicationRow);
			
			for(i = 0; i < conversion.proc.float.length; i++) {
				let multiplicandText = document.createTextNode(conversion.proc.float[i].multiplicand);
				let multiplierText = document.createTextNode(conversion.proc.float[i].multiplier);
				let resultText = document.createTextNode(conversion.proc.float[i].converted);
				let multiplicand = document.createElement("td");
				let multiplier = document.createElement("td");
				let result = document.createElement("td");
				
				multiplicand.appendChild(multiplicandText);
				multiplier.appendChild(multiplierText);
				result.appendChild(resultText);
				
				let divisionRow = document.createElement("tr");
				divisionRow.appendChild(multiplicand);
				divisionRow.appendChild(multiplier);
				divisionRow.appendChild(result);
				
				multiplicationTable.appendChild(divisionRow);
			}
			
			calcDiv.appendChild(multiplicationTable);
		}
		
		// Order Elements:
		label.appendChild(labelText);
		mainDiv.appendChild(label);
		mainDiv.appendChild(calcDiv);
		document.getElementById("conversion").appendChild(mainDiv);
		
		return mainDiv;
	},
	
	finalResult: function(conversion) {
		var mainDiv = document.createElement("div");
		var labelText = document.createTextNode("Risultato finale:");
		var label = document.createElement("p");
		var calcDiv = document.createElement("div");
		
		calcDiv.innerText = conversion.string;
		
		// Order Elements:
		label.appendChild(labelText);
		mainDiv.appendChild(label);
		mainDiv.appendChild(calcDiv);
		document.getElementById("conversion").appendChild(mainDiv);
		
		return mainDiv;
	}
}

// Crediti: Vitale Carlo Simone
