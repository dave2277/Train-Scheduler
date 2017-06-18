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

	$("#submit").on("click", function() {

		event.preventDefault();
		
		var name = $("#employeeName").val().trim();
		var role = $("#role").val().trim();
		var startDate = $("#startDate").val().trim();
		var rate = $("#rate").val().trim(); 

		database.ref().push({
			name: name,
			role: role,
			startDate: startDate,
			rate: rate,
			// dateAdded: database.ServerValue.TIMESTAMP
      });
	});

	database.ref().on("child_added", function(childSnapshot) {

		// console.log(childSnapshot.val().name);
		// console.log(childSnapshot.val().role);
		// console.log(childSnapshot.val().startDate;
		// console.log(childSnapshot.val().rate;

	  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

	dataRef.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
		.append("")

		$('#myTable tr:last').after('<tr><td>' + name + '</td></tr>');

	}
