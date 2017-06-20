//Create Global Variables  
var name;
var destination;
var firstTrainTime;
var frequency;
var firstTrainTime_error;
var regexValidator = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);



//Initialize configuraiton to Firebase
var config = {
    apiKey: "AIzaSyBYeQw-2j6wLuc6aiDYIBNLbbeJaAgWNF4",
    authDomain: "testproject-8f68a.firebaseapp.com",
    databaseURL: "https://testproject-8f68a.firebaseio.com",
    projectId: "testproject-8f68a",
    storageBucket: "testproject-8f68a.appspot.com",
    messagingSenderId: "474557636526"
  };

    firebase.initializeApp(config);

    // Create a variable to reference the database
	var database = firebase.database();


	//Validation logic for First Train Time

	$("#firstTrainTime").focusout(function() {

		checkTime();

	});


	function checkTime() {

		firstTrainTime = $("#firstTrainTime").val().trim();
		

		if (regexValidator.test(firstTrainTime)) {
			
		} else {
			alert("Format not valid.  Please enter valid 24 hour time.");
		}
	} 

	//Validation logic for frequency-- Don't allow typing of alpha characters
	$("#frequency").keydown(function (er) {

		if (er.altKey || er.ctrlKey || er.shiftey) {
			er.preventDefault();
			} else {
			var key = er.keyCode;
			if (!((key == 8) || (key == 46) || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105))) {

				er.preventDefault();
				}
			}
		});


	//Function to capture input from the form
	$("#submit").on("click", function() {

		event.preventDefault();
		
		name = $("#trainName").val().trim();
		destination = $("#destination").val().trim();
		frequency = $("#frequency").val().trim(); 

	//Build Timetable based on firstTrainTime and frequency

	//Get current time

	//Get next arrival time from timetable

	//Convert current time and next arrival time into UNIX values

	//Subtract next arrival time from curren time to calculate minutes away


	//Send values to firebase
		database.ref().push({
			name: name,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency,

      });

	});

	database.ref().on("child_added", function(childSnapshot) {

		console.log(childSnapshot.val().name);
		console.log(childSnapshot.val().destination);
		console.log(childSnapshot.val().firstTrainTime);
		console.log(childSnapshot.val().frequency);

		

	  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

	database.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
		
		$('#tableId tr:last').after('<tr><td>' + name + '</td><td>' + destination + '</td></tr>');
		

	});
