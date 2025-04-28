// --------------------------------------------------------------------------------------------- //
//console.log("test");
/*function logout() {
	fetch('/~/spring2021/cranial-check/logout', { method: 'POST' })
	location.href = '/~/spring2021/cranial-check'
}*/
async function logout() {
	const resp = await fetch ('/~/spring2021/cranial-check/logout', { 
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		})
	const ans = await resp.json();
	//show(ans);
	console.log(ans);
}

function openNav() {
	document.getElementById("nav")
		.style.width = "250px";
}
function closeNav() {
	document.getElementById("nav")
		.style.width = "0";
}
// ---------------------------------- BUTTONS TO CHANGE PAGES ---------------------------------- //
// --------------------------------------------------------------------------------------------- //

//shownSlide-1 is the index number of the div/page that is displayed
var shownSlide = 1;
//these are called in button html and adds to the slide index
function nextSlide(n) {
	displaySlides(shownSlide += n, n);
}

function displaySlides(n, x) {
	var slides = document.getElementsByClassName("outer-page");
	//if the slide index is larger than the array length --> function restarts it to 1 in order to bring the last page back to the start
	if (n > slides.length) {
		shownSlide = 1;
	}
	//if(n < 1) {shownSlide = slides.length;}
	for (var i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	//animation
	if (x == 1) {
		slides[shownSlide - 1].className = "outer-page upward-transition";
	}
	if (x == -1) {
		slides[shownSlide - 1].className = "outer-page downward-transition";
	}
	slides[shownSlide - 1].style.display = "block";
}

//display home slide when page loads
displaySlides(shownSlide, 0);

// --------------------------------------------------------------------------------------------- //
// ---------------------------------- SIGN UP AND LOGIN PAGES ---------------------------------- //
// --------------------------------------------------------------------------------------------- //
//signup variables

var signup = document.getElementById("signup");
var signupbtn = document.getElementById("signupbtn");
var spansignup = document.getElementById("close-signup");
var saveResults = document.getElementById("save-results");
var goSignUp = document.getElementById("go-signup");

//login variables
var login = document.getElementById("login");
var loginbtn = document.getElementById("loginbtn");
var spanlogin = document.getElementById("close-login");
var goLogin = document.getElementById("go-login");

// sign up pop-up form //
if (signupbtn) {
	signupbtn.onclick = function () {
		signup.style.display = "block";
		login.style.display = "none"; //make sure forms don't overlap
	};
}
if (spansignup) {
	spansignup.onclick = function () {
		signup.style.display = "none";
	};
}
if (goSignUp) {
	goSignUp.onclick = function () {
		signup.style.display = "block";
		login.style.display = "none";
	};
}

// login pop-up form //
if (loginbtn) {
	loginbtn.onclick = function () {
		login.style.display = "block";
		signup.style.display = "none"; //make sure forms don't overlap
	};
}
if (spanlogin) {
	spanlogin.onclick = function () {
		login.style.display = "none";
	};
}
if (goLogin) {
	goLogin.onclick = function () {
		login.style.display = "block";
		signup.style.display = "none";
	};
}
window.onclick = function (event) {
	if (event.target == login) {
		login.style.display = "none";
	} else if (event.target == signup) {
		signup.style.display = "none";
	}
};

// --------------------------------------------------------------------------------------------- //
// -------------------------------------- SYMPTOMS PAGES  -------------------------------------- //
// --------------------------------------------------------------------------------------------- //
// age slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

output.innerHTML = slider.value;

slider.oninput = function () {
	output.innerHTML = this.value;
};
//-------------------Model------------------
//symptom content divs
var contentHeaders = document.getElementsByClassName("symptoms-section");
var contentDivs = document.getElementsByClassName("symptoms-content");

function changeBoxColor(symptomIndex) {
	contentHeaders[symptomIndex].style.backgroundColor = "#A4BCC4";
}

function revertBoxColor(symptomIndex) {
	var content = contentDivs[symptomIndex];
	//leave box colored when box is open and symptoms are shown
	if (content.style.maxHeight == 0) {
		contentHeaders[symptomIndex].style.backgroundColor = "#fefefe";
	}
}

function toggleSymptomContent(symptomIndex) {
	var content = contentDivs[symptomIndex];
	var headers = contentHeaders[symptomIndex]
	//var clickArea = clickAreaDivs[symptomIndex];
	//in css max height is set to zero, so the content is not displayed => toggle content by toggling the max-height
	if (content.style.maxHeight) {
		//content.parentElement.style.display = "none";
		content.style.maxHeight = null;
	} else {
		content.style.maxHeight = content.scrollHeight + "px";
	}
}

//making symptoms rows active
var symptomRows = document.getElementsByClassName("checkbox");
//give function to all checkboxes
for (var x = 0; x < symptomRows.length; x++) {
	symptomRows[x].onclick = activeRow;
}

//toggle active class
function activeRow() {
	var row = this.parentNode;
	if (row.className == "symptom-row") {
		row.className += " active-row";
	} else {
		row.className = "symptom-row";
	}
}

// --------------------------------------------------------------------------------------------- //
// --------------------------------------- QUIZ PAGE  --------------------------------------- //
// --------------------------------------------------------------------------------------------- //
// date hidden input
function getDate() {
	var today = new Date().toLocaleDateString();
	document.getElementById("date")
		.value = today;
}
getDate();

// --------------------------------------------------------------------------------------------- //
// --------------------------------------- RESULTS PAGE  --------------------------------------- //
// --------------------------------------------------------------------------------------------- //

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function () {
		this.classList.toggle("active");
		var content = this.nextElementSibling;
		if (content.style.maxHeight) {
			content.style.maxHeight = null;
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
		}
	});
}