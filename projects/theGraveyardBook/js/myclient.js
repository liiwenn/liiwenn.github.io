// JavaScript Document
$(document).ready(() => {
	//let birdFound = renderBirdBlock(); //CONTROL
  //displayProfiles(birdList);

	//displayBirds(birdFound);
	// loadBirds();
});

// MODEL
// load php/photolisting.php
function loadBirds() {
	fetch('php/photolisting.php')
		.then(function (response) { //
			return response.json();
		})
		.then(function (myJson) {
			displayBirds(myJson);
		})
		.catch(error => console.error('Error:', error));
	return false;
}

function goBack(){
	window.location.assign("neilsworks.php");
}

// VIEW
// display bird found
// function displayBirds(birdFound) {
// 	let htmlBlock = "";
//
// 	jQuery.each(birdFound, function (i, each) {
// 			htmlBlock += renderBirdBlock(each);
// 		}
// 	);
//
// 	$("#bookslist").html(htmlBlock);
//
// }

// render each bird record
// function renderBirdBlock(book) {
//
// 	return `<div class="item">
// 			  <img src="img/bkcovers/${book.imageRef}" alt="cover">
// 				<h2>${book.title}</h2>
// 			  <div class="blackline"></div>
// 			  <h3>SYNOPSIS:</h3>
// 			  <p>${book.synopsis}</p>
// 			  <h3>RELEASE DATE:</h3>
// 			  <p>${book.date}</p>
// 			  <h3>ISBN:</h3>
// 			  <p>${book.ISBN}</p>
//
// 				<div class="btn-2col">
// 					<div>
// 						<button class="btn btn-white" href="editbook.html?bookid=${book.id}">EDIT</button>
// 					</div>
// 					<div>
// 						<button class="btn btn-white" type="submit">DELETE</button>
// 					</div>
// 				</div>
//
//
//
// 			</div>`
// }









//////////////////ASSIGNMENT 2//ASSIGNMENT 2//ASSIGNMENT 2/////////////////
//////////////////ASSIGNMENT 2//ASSIGNMENT 2//ASSIGNMENT 2/////////////////
//////////////////ASSIGNMENT 2//ASSIGNMENT 2//ASSIGNMENT 2/////////////////



//////////////////////////////////////////////////////////////////////////
//                                                                      //
//                               REGISTER                               //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

// CONTROLLER
// validate the form data
function doRegister(frm) {

	// check that required fields are filled
	if ( _std.isEmpty(frm.username.value) || _std.isEmpty(frm.user_email.value) || 	_std.isEmpty(frm.user_pwd.value) ) {
		displayMsg("One or more required fields are empty.");
		return false; // stopped
	}

	// check that the 2 password are the same
	if (frm.user_pwd.value !== frm.user_c_pwd.value) {
		displayMsg("Both passwords must be the same.");
		return false; // stopped
	}

	// no problem, proceed
	let frmData = new FormData(frm); // extract data from form/elements
	register(frmData); // pass the form
	return false;
}

// call registerUser.php to register the user
function register(frmData) {
	let url = 'php/registerUser.php';
	fetch(url, {
			method: 'POST',
			body: frmData
		})
		.then(response => {
			return response.json(); // convert the RESPONSE to JSON data
		})
		.then(myJson => { // take the JSON data
			// check RESPONSE
			let msg = "";
			if (myJson.err < 0) { // errors!
				msg = myJson.msg;
			} else { // id of new record can be retrieve via myJson.newID;
				msg = "User Account Created!";
			}
			displayMsg( msg ); // display Message
		})
		.catch(error => console.error('Error:', error));
	return false;
}

function displayMsg(msg) {
	// check data
	$("#fb-result").html(msg);
}


//////////////////////////////////////////////////////////////////////////
//                                                                      //
//                             CONTACT FORM                             //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

// CONTROLLER
// validate the form data
function submitForm(frm) {
	// check that required fields are filled
		if ( _std.isEmpty(frm.firstname.value) || _std.isEmpty(frm.email.value) || 	_std.isEmpty(frm.subject.value) || _std.isEmpty(frm.message.value) ) {
			displayMsg("One or more required fields are empty.");
			return false; // stopped
		}

		// no problem, proceed
		let frmData = new FormData(frm); // extract data from form/elements
		contact(frmData); // pass the form
		return false;
	}

	// call contactform.php to register the user
	function contact(frmData) {
		let url = 'php/contactForm.php';
		fetch(url, {
				method: 'POST',
				body: frmData
			})
			.then(response => {
				return response.json(); // convert the RESPONSE to JSON data
			})
			.then(myJson => { // take the JSON data
				// check RESPONSE
				let msg = "";
				if (myJson.err < 0) { // errors!
					msg = myJson.msg;
				} else { // id of new record can be retrieve via myJson.newID;
					msg = "We will get back to you shortly. Thank you!";
				}
				displayMsg( msg ); // display Message

			})
			.catch(error => console.error('Error:', error));
		return false;
	}

function displayMsg(msg) {
	$("#fb-result").html(msg);
}


//////////////////////////////////////////////////////////////////////////
//                                                                      //
//                               ADD BIRD                               //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

// CONTROLLER
// CREATE
// add a bird record with form data
function addBird(frm) {

	// validate input
	//is the name and description filled?
	if (_std.isEmpty(frm.nname.value)) {
		displayMsg("name is empty");
		return false;
	}
	if (_std.isEmpty(frm.description.value)) {
		displayMsg("description is empty");
		return false;
	}

	// success? proceed
	let frmData = new FormData(frm); // extract data from form
	addBirdData(frmData);

	return false; // stop! don't submit the form!
}

// send frmData to server via addBirdData.php
function addBirdData(frmData) {
	let url = 'php/addBirdData.php';
	fetch(url, {
			method: 'POST',
			body: frmData
		})
		.then(response => {
			return response.json(); // convert the response to JSON data
		})
		.then(myJson => { // take the JSON data
			let msg = "";
			if (myJson.lastID < 0) {
				msg = "Error adding new record";
			} else {
				msg = "record inserted.";
			}
			displayMsg( msg ); // display Message
		})
		.catch(error => console.error('Error:', error));
	return false;

}


//////////////////////////////////////////////////////////////////////////
//                                                                      //
//                               EDIT BIRD                              //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

// load bird record based on id
function loadABird(id) {
	let url = 'php/searchbird.php';
	let frmData = new FormData(); // create EMPTY formData
	frmData.append("id", id);
	fetch(url, {
			method: 'POST',
			body: frmData
		})
		.then(response => {
			return response.json(); // convert the response to JSON data
		})
		.then(myJson => { // take the JSON data
			fillForm(myJson); // pass to displayBirds
		})
		.catch(error => console.error('Error:', error));
	return false;

}

// fill the form with the record
function fillForm(bird) {
	$("#frm-bird-info input[name=birdid]").val(bird.id); // hidden
	$("#frm-bird-info input[name=nname]").val(bird.title);

	$("#frm-bird-info input[name=imageFile]").val(bird.imageRef); // hidden

	$("#frm-bird-info input[name=description]").val(bird.synopsis);

	$("#frm-bird-info input[name=isbn]").val(bird.ISBN);

	$("#current-img").html(`<img alt="${bird.title}" src="img/bkcovers/${bird.ImageRef}">`);

	// convert html formatted string to normal string
	let descr = _std.html2entity(bird.synopsis);
	$("#frm-bird-info textarea[name=description]").val(descr);
}

// UPDATE BIRD
// add a bird record with form data
function updateBird(frm) {
	// validate input
	//is the name and description filled?
	if (_std.isEmpty(frm.nname.value)) {
		displayMsg("name is empty");
		return false;
	}
	if (_std.isEmpty(frm.description.value)) {
		displayMsg("description is empty");
		return false;
	}

	// success? proceed
	let frmData = new FormData(frm); // extract data from form

	updateBirdData(frmData);

	return false; // stop! don't submit the form!
}

// send frmData to server via addBirdData.php
function updateBirdData(frmData) {
	let url = 'php/updateBirdData.php';
	fetch(url, {
			method: 'POST',
			body: frmData
		})
		.then(response => {
			return response.json(); // convert the response to JSON data
		})
		.then(myJson => { // take the JSON data
			let msg = "";
			if ((myJson.lastID < 0) || (myJson.err < 0)) {
				msg = myJson.msg;
			} else {
				msg = "record updated";
			}
			displayMsg( msg ); // display Message
		})
		.catch(error => console.error('Error:', error));
	return false;
}


//////////////////////////////////////////////////////////////////////////
//                                                                      //
//                             DELETE BIRD                              //
//                                                                      //
//////////////////////////////////////////////////////////////////////////

function deleteBird(id) {
	let url = 'php/deleteBirdData.php';
	let frmData = new FormData(); // create EMPTY formData
	frmData.append("id", id);
	fetch(url, {
			method: 'POST',
			body: frmData
		})
		.then(response => {
			return response.json(); // convert the response to JSON data
		})
		.then(myJson => { // take the JSON data
			fillForm(myJson);
			window.location.assign("neilsworks.php") // loads the page
		})
		.catch(error => console.error('Error:', error));
	return false;
}
