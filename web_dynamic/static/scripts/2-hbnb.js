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
  });
  