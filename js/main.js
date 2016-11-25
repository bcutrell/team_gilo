$( document ).ready(function() {
    loadScript("js/sam.js", cb);

    function cb() {
        sam()
    }
    
    $("#navbarList li").click(function(evt) {
      var ele = evt.target;
      $(ele).addClass('clicked');
      $(this).siblings().children().removeClass('clicked')

      if (ele.id == "ourStory" ) {
        $('#sectionHeader').html('OUR STORY');
        $('#bodyContent').html(ourStoryHtml);
      } else if (ele.id == "weddingDetails" ) {
        $('#sectionHeader').html('WEDDING DETAILS');
        $('#bodyContent').html(weddingDetailsHTML);
      } else if (ele.id == "travel" ) {
        $('#sectionHeader').html('TRAVEL');
        $('#bodyContent').html(travelHTML);
      } else if (ele.id == "bridalParty" ) {
        $('#sectionHeader').html('BRIDAL PARTY');
        $('#bodyContent').html('');
      } else if (ele.id == "registry" ) {
        $('#sectionHeader').html('REGISTRY');
        $('#bodyContent').html('');
      }
    })

});

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}
