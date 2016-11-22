const ourStoryHtml = " \
<div class='row'> \
<div class='col-md-12'> \
<p>They met at the gym.</p> \
</div> \
</div>"


$( document ).ready(function() {
    loadScript("js/sam.js", cb);

    function cb() {
        sam()
    }
    $("#navbarList li").click(function(evt) {
      var ele = evt.target;
      $(ele).addClass('clicked');
      $(this).siblings().children().removeClass('clicked')

      $('#bodyContent').html(ourStoryHtml)

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
