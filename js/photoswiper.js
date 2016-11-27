// http://webdesign.tutsplus.com/tutorials/the-perfect-lightbox-using-photoswipe-with-jquery--cms-23587
// http://vnjs.net/www/project/freewall/

$( document ).ready(function() {
var img_list =
    [{ 
      path: 'hug_thumbs_up.jpg',
      size: '640x960'
    },
    { 
      path: 'kneel.jpg',
      size: '960x640'
    },
    { 
      path: 'outdoors.jpg',
      size: '478x720'
    },
    { 
      path: 'she_said_yes.jpg',
      size: '640x960'
    },
    { 
      path: 'cake.jpg',
      size: '539x960'
    },
    { 
      path: 'gino_logo.jpg',
      size: '612x612'
    },
    { 
      path: 'big_house.jpg',
      size: '663x432'
    }]


// height and width properties determine image size
$.each(img_list, function(idx, figure) {
    var path = figure.path;
    var size = figure.size;

var figure_html = 
"<figure class='brick' itemprop='associatedMedia' itemscope itemtype='http://schema.org/ImageObject'>" +
"<a href=img/" + path +
" itemprop='contentUrl' data-size=" + size +
">" +
"<img src=img/" + path +
" class='img-responsive' style='height:200px; width: 200px' itemprop='thumbnail' alt='Image description' />" +
"</a>" +
"<figcaption itemprop='caption description'></figcaption>" +
"</figure>"

$('.my-gallery').append(figure_html);  

})

// Execute photoswipe
initPhotoSwipeFromDOM('.my-gallery');

var wall = new Freewall('.my-gallery');
wall.fitWidth();

wall.reset({
selector: '.brick',
animate: true,
cellW: 200,
cellH: 200,
gutterY: 0,
gutterX: 0,
onResize: function() {
    wall.fitWidth();
}
});

var images = wall.container.find('.brick');
images.find('img').load(function() {
  wall.fitWidth();
});

});




var initPhotoSwipeFromDOM = function(gallerySelector) {

// parse slide data (url, title, size ...) from DOM elements 
// (children of gallerySelector)
var parseThumbnailElements = function(el) {
    var thumbElements = el.childNodes,
        numNodes = thumbElements.length,
        items = [],
        figureEl,
        linkEl,
        size,
        item;

    for(var i = 0; i < numNodes; i++) {

        figureEl = thumbElements[i]; // <figure> element

        // include only element nodes 
        if(figureEl.nodeType !== 1) {
            continue;
        }

        linkEl = figureEl.children[0]; // <a> element

        size = linkEl.getAttribute('data-size').split('x');

        // create slide object
        item = {
            src: linkEl.getAttribute('href'),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10)
        };



        if(figureEl.children.length > 1) {
            // <figcaption> content
            item.title = figureEl.children[1].innerHTML; 
        }

        if(linkEl.children.length > 0) {
            // <img> thumbnail element, retrieving thumbnail url
            item.msrc = linkEl.children[0].getAttribute('src');
        } 

        item.el = figureEl; // save link to element for getThumbBoundsFn
        items.push(item);
    }

    return items;
};

// find nearest parent element
var closest = function closest(el, fn) {
    return el && ( fn(el) ? el : closest(el.parentNode, fn) );
};

// triggers when user clicks on thumbnail
var onThumbnailsClick = function(e) {
    e = e || window.event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;

    var eTarget = e.target || e.srcElement;

    // find root element of slide
    var clickedListItem = closest(eTarget, function(el) {
        return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
    });

    if(!clickedListItem) {
        return;
    }

    // find index of clicked item by looping through all child nodes
    // alternatively, you may define index via data- attribute
    var clickedGallery = clickedListItem.parentNode,
        childNodes = clickedListItem.parentNode.childNodes,
        numChildNodes = childNodes.length,
        nodeIndex = 0,
        index;

    for (var i = 0; i < numChildNodes; i++) {
        if(childNodes[i].nodeType !== 1) { 
            continue; 
        }

        if(childNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
        }
        nodeIndex++;
    }



    if(index >= 0) {
        // open PhotoSwipe if valid index found
        openPhotoSwipe( index, clickedGallery );
    }
    return false;
};

// parse picture index and gallery index from URL (#&pid=1&gid=2)
var photoswipeParseHash = function() {
    var hash = window.location.hash.substring(1),
    params = {};

    if(hash.length < 5) {
        return params;
    }

    var vars = hash.split('&');
    for (var i = 0; i < vars.length; i++) {
        if(!vars[i]) {
            continue;
        }
        var pair = vars[i].split('=');  
        if(pair.length < 2) {
            continue;
        }           
        params[pair[0]] = pair[1];
    }

    if(params.gid) {
        params.gid = parseInt(params.gid, 10);
    }

    return params;
};

var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
    var pswpElement = document.querySelectorAll('.pswp')[0],
        gallery,
        options,
        items;

    items = parseThumbnailElements(galleryElement);

    // define options (if needed)
    options = {

        // define gallery index (for URL)
        galleryUID: galleryElement.getAttribute('data-pswp-uid'),

        getThumbBoundsFn: function(index) {
            // See Options -> getThumbBoundsFn section of documentation for more info
            var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                rect = thumbnail.getBoundingClientRect(); 

            return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
        }

    };

    // PhotoSwipe opened from URL
    if(fromURL) {
        if(options.galleryPIDs) {
            // parse real index when custom PIDs are used 
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for(var j = 0; j < items.length; j++) {
                if(items[j].pid == index) {
                    options.index = j;
                    break;
                }
            }
        } else {
            // in URL indexes start from 1
            options.index = parseInt(index, 10) - 1;
        }
    } else {
        options.index = parseInt(index, 10);
    }

    // exit if index not found
    if( isNaN(options.index) ) {
        return;
    }

    if(disableAnimation) {
        options.showAnimationDuration = 0;
    }

    // Pass data to PhotoSwipe and initialize it
    gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
};

// loop through all gallery elements and bind events
var galleryElements = document.querySelectorAll( gallerySelector );

for(var i = 0, l = galleryElements.length; i < l; i++) {
    galleryElements[i].setAttribute('data-pswp-uid', i+1);
    galleryElements[i].onclick = onThumbnailsClick;
}

// Parse URL and open gallery if it contains #&pid=3&gid=1
var hashData = photoswipeParseHash();
if(hashData.pid && hashData.gid) {
    openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
}
};


