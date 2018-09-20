
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCb7WU5mwud2yc8nVTBN4ynwS2aPGuajbw",
    authDomain: "train-ae3fd.firebaseapp.com",
    databaseURL: "https://train-ae3fd.firebaseio.com",
    projectId: "train-ae3fd",
    storageBucket: "train-ae3fd.appspot.com",
    messagingSenderId: "576577864239"
  };
  firebase.initializeApp(config);

  //setting the firebase data base to a variable
  var database = firebase.database();

  // 2. Button for adding trains
  //sends get request and refreshes the page
  $("#train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    let trainName = $("#train-name").val().trim();
    let destination = $("#destination-input").val().trim();
    //takes in time value, then format that you want
    // let trainTime = moment($("#start-input").val().trim(), "HH:mm").format("X");
    let trainTime = $('#start-input').val();
    let frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    let newTrain = {
      trainName: trainName,
      destination: destination,
      trainTime: trainTime,
      frequency: frequency
    };

    console.log(newTrain);
    //pushing information to firebase
    database.ref().push(newTrain);
    //clear from on refresh
    
    // location.reload();
});//closes event listener 


database.ref().on("child_added", (childSnapshot, prevChildKey) => {
  let dataCommingFromDB = childSnapshot.val();
    trainFromDB = dataCommingFromDB.trainName;
    destinationFromDB = dataCommingFromDB.destination;
    timeFromDB = dataCommingFromDB.trainTime;
    frequencyFromDB = dataCommingFromDB.frequency;

    // $('#tester').append(trainFromDB);
    // $('#tester').append(destinationFromDB);
    // $('#tester').append(timeFromDB);
    // $('#tester').append(frequencyFromDB);

    $("#train-table > tbody").append(
    "<tr><td>" + trainFromDB + 
    "</td><td>" + destinationFromDB + 
    "</td><td>" + timeFromDB + 
    "</td><td>" + frequencyFromDB + 
    "</td></tr>");

});//closes .on

//on submit clear form
