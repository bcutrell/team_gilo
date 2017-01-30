// TODO
// sync naming

$(document).ready(function() {
  setupRsvpBtn()

  setupPhotoswipeGallery('#photoGallery');

  addWeddingPartyPictures(dudes, '.dudes')
  addWeddingPartyPictures(ladies, '.girls')

  startSlick('.dudes, .girls')

  setCurrentSlide(boyContent, '.dudes', '.girl-content');
  setCurrentSlide(girlContent, '.girls', '.boy-content');

  changeContentOnSlideChange()


  setupGalleryLinks('#girlsList', '.girls')
  setupGalleryLinks('#boysList', '.dudes')
})

const ladies = [
  'bhuta',
  'pinone',
  'rossi',
  'nagle',
  'mary_carpenter',
  'james',
  'escalante'
];

const dudes = [
	'cakounes',
	'barkley',
	'sheehy',
	'miles_carpenter'
];

const girlContent = [
"<strong>Matron of Honor</strong> I have looked up to my sister my entire life: from stealing and sometimes ruining, her clothes, losing her favorite softball glove to now having her as my role model and best friend. We both love any outdoor activity, especially in Maine, entertaining, and most importantly spending time with our family. ",
"<strong>Maid of Honor</strong> Liz and I have been through it all together. From Kindergarten through Providence College to roommates in Boston she has been my lifelong best friend. We fight like sisters, we can reason our way out of anything and one day we will have own morning show, L&L.",
"<strong>Bridesmaid</strong> Otherwise known as Bun. We met freshman year at Providence and instantly became inseparable. She is the only person that could handle living with me all through college and beyond. She introduced me to the amazing world of country concerts and as co-captains we have brought several softball teams to almost championships (We have a good feeling about this year).",
"<strong>Bridesmaid</strong> Otherwise known as Cody. We met freshman year at Providence College and have been best friends ever since. We are often mixed up as twins, love to plan events and when the two of us are together no one else can get a word in. We are always up for exploring new places  that usually involves finding a cute coffee shop along the way.",
"<strong>Bridesmaid</strong> Otherwise known as Marnie. On our first family trip to Hawaii, Mary and I were bunkmates, survived the geckos and became instant best friends. Mary is the best sister in law a girl could ask for. I am happy she can deal with my brother (sorry Miles) because Mary had made our family that much better. Her, Miles and I will always be the tres amigos (with room for a fourth).  ",
"<strong>Bridesmaid</strong> Otherwise known as Little Sarah – Growing up Little Sarah hated her nickname and may have thought she was too cool for me. However, living in Boston we have become like sisters. We are scarily similar, from our bathrobe obsession to our ability to lose a phone 5 times in 1 car ride and are always down for a hiking adventure.",
"<strong>Bridesmaid</strong> The little sister I have always wanted! We share the same passion for traveling and she helps me find the best deals shopping. Dafne is so thoughtful in everything she does and I am so lucky to be gaining her as a little sister. Gino, Dafne and I have the best time just hanging out even if we are doing absolutely nothing :) "
]

const boyContent = [
"<strong>Best Man</strong> Tom and Gino met in college where through the fraternity, swim team, and living together they became great friends. Tom has always looked up to Gino and how cool he is. One day hopes to live up to his expectations.",
"<strong>Groomsmen</strong> Adam and Gino have shared almost everything. They were in the fraternity together. They swam together. They lived together in and out of college. Through thick and thin, Adam has always been a true friend to Gino.",
"<strong>Groomsmen</strong> Gino knew he would get along with John Sheehy the moment he walked in through the CrossFit gym doors. The two of them have used their common interest in fitness to spur a friendship outside of Burpees and Pull Ups.",
"<strong>Groomsmen</strong> The brother in law to be could not have been filled by a better man. With having a great sense of humor, laidback demeanor, and just the right amount of competitive spirit Gino has found Miles to be a wonderful, caring brother to Lori."
]


function addWeddingPartyPictures(people, galleryElement) {
  $.each(people, function(idx, person) {
    var img_url = 'img/' + person + '.jpg';
    var div_img = "<div class='c'><img class='car-image' src=" + img_url + " ></div>";
    $(galleryElement).append(div_img);
  })
}

function startSlick(element) {
  $(element).slick({
    'prevArrow':"<i class='prev angle left icon'></i>",
    'nextArrow':"<i class='next angle right icon'></i>"
    }
  );
}

function setCurrentSlide(contentMap, slickEle, contentEle) {
  var currentSlide = $(slickEle).slick('slickCurrentSlide');
  var content = contentMap[currentSlide];
  $(contentEle).html(content);
}

function setupGalleryLinks(listEle, galleryEle) {
  $(listEle).click(function(event) {
    var idx = $(event.target).parent().index();
    $(galleryEle).slick('slickGoTo', idx);
  })
}

function changeContentOnSlideChange() {
  $('.dudes, .girls').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    if ($(event.target).hasClass('dudes')) {
      var content = boyContent[nextSlide];
      $('.boy-content').html(content);
    } else {
      var content = girlContent[nextSlide];
      $('.girl-content').html(content);
    }
  });
}

function setupRsvpBtn() {
  $('.rsvp-btn').click(function() {
    $('.ui.modal').modal('show');
  })
}

// https://webdesign.tutsplus.com/tutorials/the-perfect-lightbox-using-photoswipe-with-jquery--cms-23587
// http://photoswipe.com/documentation/responsive-images.html
// http://webresizer.com/resizer/
// Semantic-UI image sizes
// Mini 35px
// Tiny 80px
// Small  150px
// Medium 300px
// Large  450px
// Big  600px
// Huge 800px
// Massive  960px
//
// http://resizeimage.net/
// http://makethumbnails.com/#options

function setupPhotoswipeGallery(element) {
  $(element).each( function() {
    var $pic     = $(this),
      getItems = function() {
        var items = [];
        $pic.find('a').each(function() {
        var $href   = $(this).attr('href'),
        $size   = $(this).data('size').split('x'),
        $width  = $size[0],
        $height = $size[1];

        var item = {
        src : $href,
        w   : $width,
        h   : $height,
        title: 'Image Caption'
        }

        items.push(item);
    });
    return items;
    }

var items = getItems();
console.log(items);
var $pswp = $('.pswp')[0];
$pic.on('click', 'a', function(event) {
      event.preventDefault();
          var $index = $(this).index();
          var options = {
                        index: $index
                        //bgOpacity: 0.7,
                        //showHideOpacity: true
      }
                   
// Initialize PhotoSwipe
var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
  lightBox.init();
});
});

}


