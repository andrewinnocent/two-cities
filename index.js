// No map
$(document).ready()

// Function to submit inputs to geocode api on form submit
$('#form').submit(function() {
  event.preventDefault();

  let city1 = $('#city-one').val();
  let city2 = $('#city-two').val();

  // City 1 GET request
  // $.when() allows parallel async requests
  $.when(
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(city1) + "&key=AIzaSyCVJFarvBKFpXZDJeAgbBbz4rOjFVvbfrQ",
    function(results) {
      let cityOneInfo = results.results[0]
      if (results.status === 'OK') { // results is returning json object with status.
        $('#city-one-location').text(`City 1: ${cityOneInfo.formatted_address}. Lat: ${cityOneInfo.geometry.location.lat}, Lng: ${cityOneInfo.geometry.location.lng}`).css("color", "black")
      } else {
        $('#city-one-location').text("Invalid City 1 input. Please enter a valid city.").css("color", "red")
      }
    }),

  // City 2 GET request
  $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(city2) + "&key=AIzaSyCVJFarvBKFpXZDJeAgbBbz4rOjFVvbfrQ",
    function(results) {
      let cityTwoInfo = results.results[0]
      if (results.status === 'OK') {
        $('#city-two-location').text(`City 2: ${cityTwoInfo.formatted_address}. Lat: ${cityTwoInfo.geometry.location.lat}, Lng: ${cityTwoInfo.geometry.location.lng}`).css("color", "black")
      } else {
        $('#city-two-location').text("Invalid City 2 input. Please enter a valid city.").css("color", "red")
      }
    })
)

  // Distance between cities
  // params are Deferred objects that are resolved: [ data, statusText, jqXHR ]
  .then((cityOne, cityTwo) => {
    // console.log('cityOne is', cityOne);

    let cityOneGeocode = cityOne[0].results[0].geometry.location
    let cityTwoGeocode = cityTwo[0].results[0].geometry.location

    let distance = (google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(cityOneGeocode),
      new google.maps.LatLng(cityTwoGeocode)) / 1000).toFixed(2)

    if (distance === "NaN") {
      $("#distance-between").text("Distance couldn't be calculated. Make sure the cities are valid.").css("color", "red")
    } else {
      $("#distance-between").text(`Distance between ${city1} and ${city2} is: ${distance} km.`).css("color", "black")
    }
  })
})
