//-------------------------------------------------------------------//
// logout button //
// function logout() {
// 	fetch('/~/spring2021/cranial-check/logout', { method: 'POST' })
// 	location.href = '/~/spring2021/cranial-check'
// }

async function logout() {
	const resp = await fetch ('/~/spring2021/cranial-check/logout', { 
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
	const ans = await resp.json();
}

//-------------------------------------------------------------------//
//--------------------------------GLOSSARY---------------------------//
//-------------------------------------------------------------------//
var conditionNames = document.getElementsByClassName("condition-name");
var items = document.getElementsByClassName("glossary-item");
var conditionContent = document.getElementsByClassName("glossary-content");
// SEARCH BAR GLOSSARY
function searchGlossary() {
	var input = document.getElementById("search");
	var filter = input.value.toUpperCase();
	//var conditionNames=document.getElementsByClassName("condition-name");
	//var items=document.getElementsByClassName("glossary-item");
	//whenever a character is entered to the input box, it's filtered through all condition names
	for (var i = 0; i < conditionNames.length; i++) {
		//inner text for cross browser
		var nameText = conditionNames[i].txtContent || conditionNames[i].innerText;
		if (nameText.toUpperCase()
			.indexOf(filter) > -1) {
			items[i].style.display = "";
			//changing color of displayed conditions and making them bold
			if (input.value.length > 0) {
				conditionNames[i].style.fontWeight = "700";
			} else {
				conditionNames[i].style.fontWeight = "400";
			}
		} else {
			items[i].style.display = "none";
		}
	}
}
//GLOSSARY COLLAPSIBLES
//loop through the array of collapsibles and give it a function 
for (var i = 0; i < items.length; i++) {
	items[i].addEventListener("click", function () {
		conditionContent = this.children[1];
		conditionName = this.children[0];
		if (conditionContent.style.maxHeight) {
			conditionContent.style.maxHeight = null;
			conditionName.style.backgroundColor = "#fefefe";
		} else {
			conditionContent.style.maxHeight = conditionContent.scrollHeight + "px";
			conditionName.style.backgroundColor = "#A4BCC4";
		}
	});
}
//------------------------------------------------------//
//------------------NAV BAR-----------------------------//
//------------------------------------------------------//
//console.log(conditionContent[0].style.maxHeight);
//don't use open() --> existing JS function that loads new page
function openNav() {
	document.getElementById("nav")
		.style.width = "250px";
}

function closeNav() {
	document.getElementById("nav")
		.style.width = "0";
}
//------------------------------------------------------//
//------------------DISPLAYING TABLE------------------//
//------------------------------------------------------//
// ------------- Looping through date, age, symptoms ------------- //
var dateList = document.getElementsByClassName("date-list");
var ageList = document.getElementsByClassName("age-list");
var symptomsList = document.getElementsByClassName("symptoms-list");
var conditionsList = document.getElementsByClassName("conditions-list");
//console.log(conditionsList[18]);

// ------------------------------------------------------------- //
//-------------------PAST SYMPTOMS/RESULTS---------------------- //
// ------------------------------------------------------------- //
var tbody = document.getElementById("tbody");

function past_symptoms_list(pastSymptoms) {
	var list = document.createElement("ul");
	for (var i = 0; i < pastSymptoms.length; i++) {
		var listSymptom = document.createElement("li");
		var listContent = document.createTextNode(pastSymptoms[i]);
		listSymptom.appendChild(listContent);
		list.appendChild(listSymptom);
	}
	return list;
}

function past_conditions_list(pastConditions) {
	var list = document.createElement("ol");
	for (var i = 0; i < pastConditions.length; i++) {
		var listCondition = document.createElement("li");
		var listContent = document.createTextNode(pastConditions[i]);
		listCondition.appendChild(listContent);
		list.appendChild(listCondition);
	}
	return list;
}

for (var i = symptomsList.length - 2; i >= 0; i--) {
	var tr = document.createElement("tr");
	var td_date = document.createElement("td");
	var td_age = document.createElement("td");
	var td_symptom = document.createElement("td");
	var td_condition = document.createElement("td");

	td_date.innerHTML = dateList[i].textContent;
	td_age.innerHTML = ageList[i].textContent;

	var li_symptoms = past_symptoms_list(symptomsList[i].textContent.split(","));
	var li_conditions = past_conditions_list(conditionsList[i].textContent.split(","));

	td_symptom.appendChild(li_symptoms);
	td_condition.appendChild(li_conditions);

	tr.appendChild(td_date);
	tr.appendChild(td_age);
	tr.appendChild(td_symptom);
	tr.appendChild(td_condition);
	tbody.appendChild(tr);
}

// ------------------------------------------------------------- //
//-----------------MOST RECENT SYMPTOMS/RESULTS----------------- //
// ------------------------------------------------------------- //
//removing all the dates, ages, and symptoms but the most recent
if (symptomsList.length > 1) {
	//"backward iteration" aka reverse loop --> i decreases as length changes due to .remove() 
	for (var i = symptomsList.length - 2; i >= 0; i--) {
		symptomsList[i].remove();
		ageList[i].remove();
		dateList[i].remove();
	}
}
//turning symptoms div element into array
var symptoms = symptomsList[0].textContent;
var symptoms_array = symptoms.split(",");
var displaySymptoms = document.getElementById("symptoms-display");
//console.log(symptoms_array);
//creating unordered list
var list = document.createElement("ul");
for (var i = 0; i < symptoms_array.length; i++) {
	var listSymptom = document.createElement("li");
	var listContent = document.createTextNode(symptoms_array[i]);
	listSymptom.appendChild(listContent);
	list.appendChild(listSymptom);
}

//appending to table and taking out array list
displaySymptoms.appendChild(list);
symptomsList[0].style.display = "none";

// ------------- Looping through conditions ------------- //
if (conditionsList.length > 1) {
	for (var i = conditionsList.length - 2; i >= 0; i--) {
		conditionsList[i].remove();
	}
}
var conditions = conditionsList[0].textContent;
//console.log(conditions);
var conditions_array = conditions.split(",");
var displayConditions = document.getElementById("conditions-display");
//creating ordered list
var list_c = document.createElement("ol");
for (var i = 0; i < conditions_array.length; i++) {
	var listCondition = document.createElement("li");
	var conditionContent = document.createTextNode(conditions_array[i]);
	listCondition.appendChild(conditionContent);
	list_c.appendChild(listCondition);
}

//appending to table and taking out array list
displayConditions.appendChild(list_c);
conditionsList[0].style.display = "none";

//--------------------------FILTERING-------------------------//
//-------------------------------------------------------------------//
//FILTER TOGGLE
var filter_names = document.getElementsByClassName("filter-name");
for (var x = 0; x < filter_names.length; x++) {
	filter_names[x].addEventListener("click", function () {
		//toggle the class with a psuedo element that changes the + to -
		this.classList.toggle("active-option");
		//the inputs/search bar div of each corresponding div
		var section = this.nextElementSibling;
		if (section.style.maxHeight) {
			section.style.maxHeight = null;
			//restartFilter();
		} else {
			section.style.maxHeight = section.scrollHeight + "px";
		}
	});
}

// SYMPTOMS SEARCH BAR FILTER
function searchResults() {
	let input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("search-results");
	filter = input.value.toUpperCase();
	table = document.getElementById("past-table");
	tr = table.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[2];
		if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
				if (input.value.length > 0) {
					td.style.fontWeight = "700";
					td.style.color = "#6792a1";
				} else {
					td.style.fontWeight = "400";
					td.style.color = "#000000";
				}
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}
//AGE FILTER
var ageHistory = document.getElementsByClassName("age-history");
var ageArray = [];
//loop through all the age entries and append text content to the end of an empty array to get all the ages in one array
for (var i = 0; i < ageHistory.length; i++) {
	var age = ageHistory[i].textContent;
	ageArray.push(age);
}
var uniqueList = [];
for (var i = 0; i < ageArray.length; i++) {
	//if the array element has not appeared yet in the empty array, the index number will be -1 --> prevent duplicates from being pushed
	if (uniqueList.indexOf(ageArray[i]) === -1) {
		uniqueList.push(ageArray[i]);
	}
}
//removing the last element of the age array (most recent age entry, which will not be on the past entries table)
//uniqueList.pop();
var ageSection = document.getElementById("age-filter")
for (var i = 0; i < uniqueList.length; i++) {
	var ageOption = document.createElement("input");
	ageOption.id = uniqueList[i];
	ageOption.setAttribute("type", "radio");
	ageOption.setAttribute("name", "ages");
	ageOption.value = uniqueList[i];
	ageOption.className = "age-button radio"
	var ageLabel = document.createElement("LABEL");
	var ageTxt = document.createTextNode(uniqueList[i]);
	ageLabel.appendChild(ageTxt);
	var br = document.createElement("br");
	ageLabel.setAttribute("for", uniqueList[i]);
	ageSection.appendChild(ageOption);
	ageSection.appendChild(ageLabel);
	ageSection.appendChild(br);
	console.log(ageOption.id);
	//console.log(uniqueList[i]);
}
//giving sorting function to each radio button
var ageButtons = document.getElementsByClassName("age-button");
console.log(ageButtons.length);
for (var i = 0; i < ageButtons.length; i++) {
	ageButtons[i].addEventListener("click", function () {
		//value (age listed) of selected radio button
		var num_value = this.value;
		var value = num_value.trim(); //getting rid of whitespace in the string
		var table = document.getElementById("past-table");
		//array of rows/entries
		var age_row = table.getElementsByTagName("tr");
		for (var i = 0; i < age_row.length; i++) {
			//access age td of each row
			var age_content = age_row[i].getElementsByTagName("td")[1];
			//console.log(age_content);
			if (age_content) {
				//getting inner text (age listed in entry)
				var txtValue = age_content.textContent || age_content.innerText;
				if (txtValue == value) {
					age_row[i].style.display = "";
					age_content.style.color = "#6792a1"; //changing color when filtered
				} else {
					age_row[i].style.display = "none";
					age_content.style.color = "#000000";
				}
			}
		}
	});
}

//RESULTS FILTER
var result_radios = document.getElementsByClassName("result-radio");
console.log(result_radios.length);
for (var i = 0; i < result_radios.length; i++) {
	result_radios[i].addEventListener("click", function () {
		var table = document.getElementById("past-table");
		var row = table.getElementsByTagName("tr"); //array of rows/entries
		var value=this.value;
		for(var i=0;i<row.length;i++){
			//console.log(value);
			var result_content = row[i].getElementsByTagName("td")[3];
			//console.log(result_content);
			if (result_content){
				var txtValue = result_content.textContent || result_content.innerText;
				if(txtValue.indexOf(value)>-1){
					console.log("true");
					row[i].style.display = "";
					result_content.style.color="#6792a1";
				}
				else{
					row[i].style.display = "none";
					result_content.style.color="#000000";
				}
			}
		}
	});	
}


//DATE FILTER
var date_radios = document.getElementsByClassName("");


//temporary solution to multi-filter --> having disabled buttons
/*function restartFilter(){
	//restarting all filters when they're closed and displaying all the results 
	var table = document.getElementById("past-table");
	var rows = table.getElementsByTagName("tr");
	var cells = document.getElementsByTagName("td");
	var radios = document.getElementsByClassName("radio");
	var search = document.getElementById("search-results");
	//console.log(radios.length)
	//console.log(rows.length);
	for(var i=0;i<rows.length;i++){
		rows[i].style.display="";
	}
	for(var i=0;i<cells.length;i++){
		cells[i].style.color="#000000";
		}
	//console.log("hello");
	for(var i=0;i<radios.length;i++){
		radios[i].checked=false;
	}
	search.value="";
}*/