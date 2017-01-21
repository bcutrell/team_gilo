class StickyNavigation {
	
	constructor() {
		this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		let self = this;
		$('.et-hero-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkTabContainerPosition();
    this.findCurrentTabSelector();
	}
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkTabContainerPosition() {
		let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
		if($(window).scrollTop() > offset) {
			$('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
		} 
		else {
			$('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.et-hero-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.et-hero-tab-slider').css('width', width);
		$('.et-hero-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();


$(document).ready(function() {

var girls = [
'bhuta',
'pinone',
'rossi',
'nagle',
'mary_carpenter',
'james',
'escalante'
];

$.each(girls, function(idx, girl) {
	var girl_url = 'img/' + girl + '.jpg';
	var div_img = "<div class='c'><img class='ui image' src=" + girl_url + " ></div>";
	$('.girls').append(div_img);
})

$('.dudes, .girls').slick({
'prevArrow':"<i class='prev angle left icon'></i>",
'nextArrow':"<i class='next angle right icon'></i>"
}
);

var currentSlide = $('.girls').slick('slickCurrentSlide');
var content = girlContentMap(currentSlide);
$('.girl-content').html(content);


// read based on data-index
$('.dudes').on('afterChange', function(event, slick, direction) {
  // $('.top').text(slick.currentSlide);
  // console.log('afterChange');
});

$('.dudes, .girls').on('beforeChange', function(event, slick, currentSlide, nextSlide){
  var content = girlContentMap(nextSlide);
  $('.girl-content').html(content);
});

// $('.dudes').slick('slickGoTo', 2);
$('#girlsList').click(function(event) {
	var idx = $(event.target).parent().index()
	$('.girls').slick('slickGoTo', idx);
})



})

const girlContent = [
"Matron of Honor – I have looked up to my sister my entire life: from stealing and sometimes ruining, her clothes, losing her favorite softball glove to now having her as my role model and best friend. We both love any outdoor activity, especially in Maine, entertaining, and most importantly spending time with our family. ",
"Maidof Honor Liz and I have been through it all together. From Kindergarten through Providence College to roommates in Boston she has been my lifelong best friend. We fight like sisters, we can reason our way out of anything and one day we will have own morning show, L&L.",
"Bridesmaid Otherwise known as Bun. We met freshman year at Providence and instantly became inseparable. She is the only person that could handle living with me all through college and beyond. She introduced me to the amazing world of country concerts and as co-captains we have brought several softball teams to almost championships (We have a good feeling about this year).",
"Bridesmaid Otherwise known as Cody. We met freshman year at Providence College and have been best friends ever since. We are often mixed up as twins, love to plan events and when the two of us are together no one else can get a word in. We are always up for exploring new places  that usually involves finding a cute coffee shop along the way.",
"Bridesmaid Otherwise known as Marnie. On our first family trip to Hawaii, Mary and I were bunkmates, survived the geckos and became instant best friends. Mary is the best sister in law a girl could ask for. I am happy she can deal with my brother (sorry Miles) because Mary had made our family that much better. Her, Miles and I will always be the tres amigos (with room for a fourth).  ",
"Bridesmaid Otherwise known as Little Sarah – Growing up Little Sarah hated her nickname and may have thought she was too cool for me. However, living in Boston we have become like sisters. We are scarily similar, from our bathrobe obsession to our ability to lose a phone 5 times in 1 car ride and are always down for a hiking adventure.",
"Bridesmaid The little sister I have always wanted! We share the same passion for traveling and she helps me find the best deals shopping. Dafne is so thoughtful in everything she does and I am so lucky to be gaining her as a little sister. Gino, Dafne and I have the best time just hanging out even if we are doing absolutely nothing :) "
]

function girlContentMap(idx) {
	return girlContent[idx]
}



$('.rsvp-btn').click(function() {
	$('.ui.modal').modal('show');
})