// No map
$(document).ready()

// Function to submit inputs to geocode api on form submit
$('#form').submit(function () {
  event.preventDefault();

  let city1 = $('#city-one').val();
  let city2 = $('#city-two').val();

  // City 1 GET request
  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(city1) + "&key=AIzaSyCVJFarvBKFpXZDJeAgbBbz4rOjFVvbfrQ",
    function(results) {
      console.log('Results is', results);
          if (results.status === 'OK') { // results is returning json object with status.
            $('#city-one-location').text("City 1: " + results.results[0].formatted_address)
          } else {
            $('#city-one-location').text("Invalid City 1 input. Please enter a valid city.")
          }
        })
  // City 2 GET request
  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(city2) + "&key=AIzaSyCVJFarvBKFpXZDJeAgbBbz4rOjFVvbfrQ",
    function(results) {
        if (results.status === 'OK') {
          $('#city-two-location').text("City 2: " + results.results[0].formatted_address)
        } else {
          $('#city-two-location').text("Invalid City 2 input. Please enter a valid city.")
        }
      })
    })
    
