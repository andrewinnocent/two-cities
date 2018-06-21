// API key AIzaSyCVJFarvBKFpXZDJeAgbBbz4rOjFVvbfrQ

var geocoder;
var map;
function initMap() {
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 3,
     center: {lat: 0, lng: 0}
   });
   var geocoder = new google.maps.Geocoder();

   document.getElementById('submit').addEventListener('click', function() {
     geocodeAddress(geocoder, map);
   });
 }

function codeAddress() {
  var address = document.getElementById('city-one').value; // prob won't need .value
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
