$(document).ready(function () {
    let selected = [];
  
    // Listen for changes on each input checkbox tag
    $('input[type=checkbox]').click(function () {
      let name = $(this).attr('data-name');
      if ($(this).is(':checked')) {
        selected.push(name);
      } else {
        selected = selected.filter(val => val !== name);
      }
  
      if (selected.length === 0) {
        $('.amenities h4').html('&nbsp;');
      } else {
        $('.amenities h4').text(selected.join(', '));
      }
    });
  
    // Check API status and update the #api_status div
    function checkApiStatus() {
      $.get('http://localhost:5001/api/v1/status/', function(data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      }).fail(function() {
        $('#api_status').removeClass('available');
      });
    }
  
    // Initial check for API status
    checkApiStatus();


    const search = (filters = {}) => {
		$.ajax({
		  type: 'POST',
		  url: 'http://localhost:5001/api/v1/places_search',
		  data: JSON.stringify(filters),
		  //dataType: 'json',
		  contentType: 'application/json',
		  success: function (data) {
			$('SECTION.places').empty();
			$('SECTION.places').append(data.map(place => {
			  return `<article>
						<div class="title_box">
						  <h2>${place.name}</h2>
						  <div class="price_by_night">${place.price_by_night}</div>
						</div>
						<div class="information">
						  <div class="max_guest">${place.max_guest} Guests</div>
						  <div class="number_rooms">${place.number_rooms} Bedrooms</div>
						  <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
						</div>
						<div class="description">
						  ${place.description}
						</div>
					  </article>`
			}));
		  }
		});
	  };

	$("#search").click(function(){
		const filters = {amenities: Object.keys(selected)};
    search(filters);
	});
	search()
  });
