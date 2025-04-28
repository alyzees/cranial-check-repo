function toggleEdit(idx) {
	var open = document.getElementsByClassName("open-edit");
	if (open[idx].style.maxHeight) {
		open[idx].style.maxHeight = null;
	} else {
		open[idx].style.maxHeight = open[idx].scrollHeight + "px";
	}
}
//---------------------EDITING ACCOUNT INFO-------------------//

//editing name
async function editName() {
	//getting input value
	const name = document.getElementById("edit-name")
		.value;
	//console.log(name);
	const data = { name };
	if (!name) {
		alert("Please enter a new name to change.");
	} else {
		const resp = await fetch('/~/spring2021/cranial-check/account/profile', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})

		const ans = await resp.json();
		//console.log(ans);
		//reloading page
		window.location.reload();
	}
}

//editing email 
async function editEmail() {
	//getting input value
	const username = document.getElementById("edit-email")
		.value;
	const data = { username };
	if (!username) {
		alert("Please enter a new email to change.");
	} else {
		const resp = await fetch('/~/spring2021/cranial-check/account/profile', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})

		const ans = await resp.json();
		window.location.reload();
	}
}

//editing password 
async function editPassword() {
	//getting input value
	const password = document.getElementById("edit-pass")
		.value;
	const confirm_pass = document.getElementById("confirm-pass")
		.value;
	const data = { password };
	if (!password) {
		alert("Please enter a new password to change.");
	} else {
		if (password != confirm_pass) {
			console.log(password);
			console.log(confirm_pass);
			alert("Passwords do not match, please enter again.");
		} else {
			const resp = await fetch('/~/spring2021/cranial-check/account/profile', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			})

			const ans = await resp.json();
			window.location.reload();
		}
	}
}

//showing account info
/*async function getAccountInfo() {
	const resp = await fetch('/~/spring2021/cranial-check/account/profile')
	const ans = await resp.json();
	console.log(ans);
}*/

// displaying profile picture if there is a data url in local storage
document.addEventListener("DOMContentLoaded", () => {
	const savedImageDataURL = localStorage.getItem("recent-profile"); //retrieve data url
	console.log(savedImageDataURL);
	//if there is a data url in storage, display as pfp
	if (savedImageDataURL) {
		document.getElementById("pfp")
			.setAttribute("src", savedImageDataURL);
	}
});

//uploading image
//reference: https://codepen.io/mobifreaks/pen/LIbca
function showImg(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$('#pfp')
				.attr('src', e.target.result);
		};

		reader.readAsDataURL(input.files[0]);
	}
}
//saving image to local storage
function saveImg() {
	const picture = document.querySelector("#picture")
		.files[0]
	console.log(picture); //shows files list in console --> mmust convert into data url to use in local storage
	const reader = new FileReader(); //instance that will actually convert the file into a data url string
	//wait for load event to retrieve result (data url as a string)
	reader.addEventListener("load", () => {
		console.log(reader.result); //result belongs to File Reader instance
		//there's a limit on data url size from image so we use try and catch in case it's too big
		try {
			localStorage.setItem("recent-profile", reader.result); //key:value stored on local storage (go to dev tools --> applications --> local storage)
			window.location.reload();
		} catch (e) {
			alert("Image is too big, upload a new one");
		}
	});
	reader.readAsDataURL(picture);
}