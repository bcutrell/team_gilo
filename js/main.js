$( document ).ready(function() {
    // Set initial content
    $('#sectionHeader').html('OUR STORY');
    $('#bodyContent').html(ourStoryHtml);
    
    $("#navbarList li").click(function(evt) {
      event.preventDefault();

      var ele = evt.target;
      $(ele).addClass('clicked');
      $(this).siblings().children().removeClass('clicked')

      if (ele.id == "ourStory" ) {
        $('#sectionHeader').html('OUR STORY');
        $('#bodyContent').html(ourStoryHtml);
      } else if (ele.id == "weddingDetails" ) {
        $('#sectionHeader').html('DETAILS');
        $('#bodyContent').html(weddingDetailsHTML);
      } else if (ele.id == "travel" ) {
        $('#sectionHeader').html('TRAVEL');
        $('#bodyContent').html(travelHTML);
      } else if (ele.id == "bridalParty" ) {
        $('#sectionHeader').html('BRIDAL PARTY');
        $('#bodyContent').html(bridalPartyHTML);
      } else if (ele.id == "registry" ) {
        $('#sectionHeader').html('REGISTRY');
        $('#bodyContent').html(registryHTML );
      }

      // scroll to div
      $('html, body').animate({
        scrollTop: $('#sectionHeader').offset().top
      }, 1000);
    })
});

