// No map
$(document).ready()

// Function to submit inputs to geocode api on form submit
$('#form').submit(function () {
  event.preventDefault();
  // assign city to variables
  let city1 = $('#city-one').val()
  let city2 = $('#city-two').val()
  // console.log("City 1 is", city1);
  // console.log("City 2 is", city2);

  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(city1) + "&key=AIzaSyCVJFarvBKFpXZDJeAgbBbz4rOjFVvbfrQ",
    function(results, status) {
      console.log('Results is', results);
      console.log('Status is', status); // Status is 'success', not 'OK'.
          if (status === 'OK') { // Changing to 'success' returns undefined.
            console.log("Connected to the API and the city is valid!"); // even though successful, return else result...
            $('#city-one-location').text(results[0].geometry.location)
          } else {
            $('#city-one-location').text("Invalid input. Please enter a valid city.")
          }
        })
  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(city2) + "&key=AIzaSyCVJFarvBKFpXZDJeAgbBbz4rOjFVvbfrQ",
    function(results, status) {
        if (status === 'OK') {
          $('#city-two-location').text(results[0].geometry.location)
        } else {
          $('#city-two-location').text("Invalid input. Please enter a valid city.")
        }
      })

    })

// MAP
// function initMap() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 2,
//     center: {lat: 0, lng: 0}
//   });
//   var geocoder = new google.maps.Geocoder();
//
//   document.getElementById('submit').addEventListener('click', function() {
//     geocodeAddress(geocoder, map);
//   });
// }
//
// function geocodeAddress(geocoder, resultsMap) {
//   var address = document.getElementById('address').value;
//   geocoder.geocode({'address': address}, function(results, status) {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });
//     } else {
//       ('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }
