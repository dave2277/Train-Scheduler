//Create Global Variables  
var name;
var destination;
var firstTrainTime;
var nextTrain;
var tMinutesTillTrain;
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
		

		if (!regexValidator.test(firstTrainTime)) {
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

    	var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    
    	// Current Time
    	var currentTime = moment();
    	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
    
    	// Difference between the times
    	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    	// Time apart (remainder)
    	var tRemainder = diffTime % frequency;
    	console.log(tRemainder);
    	
    	// Minute Until Train
    	tMinutesTillTrain = frequency - tRemainder;
    	console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    
    	// Next Train
    	nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");


	//Send values to firebase
		database.ref().push({
			name: name,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency,
			minutesAway: tMinutesTillTrain,
			nextTrain: nextTrain
      });

	});

	database.ref().on("child_added", function(childSnapshot) {
		

	  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

	database.ref().orderByChild("nextTrain").on("child_added", function(snapshot) {
		
		$('#tableId tr:last').after('<tr><td>' + name + '</td><td>' + destination + 
			'</td><td>' + frequency + '</td><td>' + nextTrain + '</td><td>' + tMinutesTillTrain + '</td></tr>' );
		
	});
