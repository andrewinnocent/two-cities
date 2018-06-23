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
      let cityOneInfo = results.results[0]
      if (results.status === 'OK') { // results is returning json object with status.
          $('#city-one-location').text(`City 1: ${cityOneInfo.formatted_address}. Lat: ${cityOneInfo.geometry.location.lat}, Lng: ${cityOneInfo.geometry.location.lng}`)
          } else {
            $('#city-one-location').text("Invalid City 1 input. Please enter a valid city.").css("color", "red")
          }
      let cityOneGeocode = cityOneInfo.geometry.location  // The desire is to access this variable for the computeDistanceBetween()
      console.log(`1: ${cityOneLat}, 2: ${cityOneLng}, 3: ${cityOneCombo}`);
    })

  // City 2 GET request
  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(city2) + "&key=AIzaSyCVJFarvBKFpXZDJeAgbBbz4rOjFVvbfrQ",
    function(results) {
      let cityTwoInfo = results.results[0]
      if (results.status === 'OK') {
          $('#city-two-location').text(`City 2: ${cityTwoInfo.formatted_address}. Lat: ${cityTwoInfo.geometry.location.lat}, Lng: ${cityTwoInfo.geometry.location.lng}`)
        } else {
          $('#city-two-location').text("Invalid City 2 input. Please enter a valid city.").css("color", "red")
        }
      let cityTwoGeocode = cityTwoInfo.geometry.location  // The desire is to access this variable for the computeDistanceBetween()
    })

  // Distance between cities
  // Hardcoded it calculated appropriately. This issue I believe I need to resolve is scope to access cityOneGeocode & cityTwoGeocode
  $("#distance-between").text(`Distance between ${city1} and ${city2} is: ${(google.maps.geometry.spherical.computeDistanceBetween(
    new google.maps.LatLng(cityOneCombo),
    new google.maps.LatLng(cityTwoGeocode))/1000).toFixed(2)} km.`)
})
