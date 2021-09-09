//alert("this file is working")

$(function(){
	addToHomescreen();
	Load24hr();
	LoadUVI();
	Load2hr();
	Load4d();
	changeStyleTimeHome();

	$("#welcome").on("click",hideWelcome);
	$("#orangebox").on("click",showProtectPage);
	$(".backbtn").on("click",showHomePageBack);
	$(".viewmorebtn").on("click",showUVIPage);

	redTag();
	$(".xbtn").on("click",closeTextbox);
});


/*----------------------------------------------------------------
------------------------------------------------------------------
Pages
------------------------------------------------------------------
-----------------------------------------------------------------*/
function hideWelcome(){
	TweenMax.to("#welcome",1,{display:"none",autoAlpha:0});
	TweenMax.to("#homepage",0,{display:"block",autoAlpha:1});
}

function showMapPageSwipe(){
	$("#mappage").css("display","block");
	$(".swipebtn2").css("display","block");
	$(".swipebtn1").css("display","none");
	TweenMax.fromTo("#mappage",0.8,{x:480},{x:0});
	TweenMax.fromTo("#homepage",0.8,{x:0},{x:-480,onComplete:hideHomePage});
}

function showHomePageSwipe(){
	$("#homepage").css("display","block");
	$(".swipebtn1").css("display","block");
	$(".swipebtn2").css("display","none");
	TweenMax.fromTo("#mappage",0.8,{x:0},{x:480});
	TweenMax.fromTo("#homepage",0.8,{x:-480},{x:0,onComplete:hideMapPage});
}

function showUVIPage (){
	$("#uvipage").css("display","block");
	$(".swipebtn1").css("display","none");
	TweenMax.fromTo("#uvipage",0.8,{x:480},{x:0,onComplete:hideHomePage});
}

function showHomePageBack(){
	$("#homepage").css("display","block");
	$(".swipebtn1").css("display","block");
	TweenMax.fromTo("#uvipage",0.8,{x:0},{x:480,onComplete:hideUVIPage});
}

function hideHomePage(){
	$("#homepage").css("display","none");
}

function hideMapPage(){
	$("#mappage").css("display","none");
}

function hideUVIPage(){
	$("#uvipage").css("display","none");
}

/*----------------------------------------------------------------
HAMMER PLUGIN
-----------------------------------------------------------------*/
/*HOME PAGE*/
var homepage = document.getElementById('homepage');
var hHomepage = new Hammer (homepage);
hHomepage.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hHomepage.on("swiperight swipeleft swipeup swipedown",

function(homepageLeft) {
	if(homepageLeft.type==="swipeleft"){
		showMapPageSwipe();
		}
});


/*MAPPAGE*/
var mappage = document.getElementById('mappage');
var hMappage = new Hammer (mappage);
hMappage.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hMappage.on("swiperight swipeleft swipeup swipedown",
function(mappageRight) {

	if(mappageRight.type==="swiperight"){
		showHomePageSwipe();
	}
}
);


/*UVI Page*/
var uvipage = document.getElementById('uvipage');
var hUvipage = new Hammer (uvipage);
hUvipage.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hUvipage.on("swiperight swipeleft swipeup swipedown",
function(uvipageSwipe) {

	if(uvipageSwipe.type==="swipeup"){
		showProtectPage();
	}

	if(uvipageSwipe.type==="swiperight"){
		showHomePageBack();
	}
}
);


var orangebox = document.getElementById('orangebox');
var hOrangebox= new Hammer (orangebox);
hOrangebox.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hOrangebox.on("swiperight swipeleft swipeup swipedown",
function(orangeboxDown) {

	if(orangeboxDown.type==="swipedown"){
		showProtectPage();
	}
}
);

/*----------------------------------------------------------------
------------------------------------------------------------------
24hr weather data:
------------------------------------------------------------------
-----------------------------------------------------------------*/
function Load24hr(){
	$.ajax({
		type: "GET",
		url: "https://api.data.gov.sg/v1/environment/24-hour-weather-forecast",
		dataType: "json"
	})

	.done(function(json) { //tween max oncomplete
		json24hr=json;
		ShowData24hr();
	})

	.fail(function() {
		console.log("error");
	});
}

/*----------------------------------------------------------------
------------------------------------------------------------------
Change BG colour according to time
Note: Only applies for fair, cloudy, partly cloudy
BG colour for overcast, showers, rain & hazy is in respective functions
------------------------------------------------------------------
-----------------------------------------------------------------*/
var currentTime = new Date().getHours();

function changeStyleTimeHome() {

	if (6 <= currentTime&&currentTime < 12) { //6pm to 12pm
		$("#homepage").css("background-color","#FFF9E4");
	}
	if (12 <= currentTime&&currentTime < 16) { //12pm to 4pm
		$("#homepage").css("background-color","#C5EBFA");
	}
	if (16 <= currentTime&&currentTime < 18) { //4pm to 6pm
		$("#homepage").css("background-color","#F4B1A9");
	}
	if (18 <= currentTime && currentTime < 24 || 0 <= currentTime && currentTime <6) { //6pm to 12am or 12am to 6am
		$("#homepage").css("background-color","#457BBA");
		changeToWhite();
	}
}
//in ready function

function changeStyleTimeMap(){
	if (6 <= currentTime&&currentTime < 12) { //6pm to 12pm
		$(".forecastbox").css("background-color","#FFF9E4");
	}
	if (12 <= currentTime&&currentTime < 16) { //12pm to 4pm
		$(".forecastbox").css("background-color","#C5EBFA");
	}
	if (16 <= currentTime&&currentTime < 18) { //4pm to 6pm
		$(".forecastbox").css("background-color","#F4B1A9");
	}
	if (18 <= currentTime && currentTime < 24 || 0 <= currentTime && currentTime <6) { //6pm to 12am or 12am to 6am
		$(".forecastbox").css("background-color","#457BBA");
	}
}
//NOT in ready function as I want the default colour to be #054477


/*----------------------------
JS2 show data
----------------------*/
function ShowData24hr(){

	var weather24h=json24hr.items[0].general.forecast.toLowerCase();
	//var weather24h="hazy"

	var weather24hRain= weather24h.search("rain");
	var weather24hThundery= weather24h.search("thundery showers");
	//thundery showers BEFORE showers
	var weather24hShowers= weather24h.search("showers");
	var weather24hFair= weather24h.search("fair");
	var weather24hPartlyCloudy= weather24h.search("partly cloudy");
	//partly cloudy BEFORE cloudy
	var weather24hCloudy= weather24h.search("cloudy");
	var weather24hOvercast= weather24h.search("overcast");
	var weather24hHazy= weather24h.search("hazy");


	if (weather24hRain>=0){
		$(".todaysforecastImg").css("background-image","url(img/bgrain.png)");
		$("#homepage").css("background-color","#82929E");
		changeToWhite();
		rainHome();
	}

	else if (weather24hThundery>=0) {
		$(".todaysforecastImg").css("background-image","url(img/bgshowers.png)");
		$("#homepage").css("background-color","#82929E");
		changeToWhite();
		lightningHome();
		rainHome();
	}

	else if (weather24hShowers>=0) {
		$(".todaysforecastImg").css("background-image","url(img/bgshowers.png)");
		$("#homepage").css("background-color","#82929E");
		changeToWhite();
		rainHome();
	}

	else if (weather24hFair>=0) {
		$(".todaysforecastImg").css("background-image","url(img/bgfair.png)");
	}

	else if (weather24hPartlyCloudy>=0) {
		$(".todaysforecastImg").css("background-image","url(img/bgpartlyc.png)");
	}

	else if (weather24hCloudy>=0) {
		$(".todaysforecastImg").css("background-image","url(img/bgcloudy.png)");
	}

	else if (weather24hOvercast>=0) {
		$(".todaysforecastImg").css("background-image","url(img/bgovercast.png)");
		$("#homepage").css("background-color","#82929E");
		changeToWhite();
	}

	else if (weather24hHazy>=0) { //Hazy
		$(".todaysforecastImg").css("background-image","url(img/bghazy.png)");
		$("#homepage").css("background-color","#B0BFC6");
	}

	else {
		console.log("error in finding 24h data")
	}

	var lt=json24hr.items[0].general.temperature.low;
	var ht=json24hr.items[0].general.temperature.high;

	var lrh=json24hr.items[0].general.relative_humidity.low;
	var hrh=json24hr.items[0].general.relative_humidity.high;

	var dw=json24hr.items[0].general.wind.direction;
	var lw=json24hr.items[0].general.wind.speed.low;
	var hw=json24hr.items[0].general.wind.speed.high;

	$(".temperaturerange").append(" "+lt+"&deg;C - "+ht+"&deg;C");
	$(".rh").append(" "+lrh+"% - "+hrh+"%");
	$(".wind").append(" "+dw+", "+lw+" - "+hw+" km/h");

	$(".todaysforecastText").append("<h3>TODAY'S FORECAST:</h3>"+weather24h);
}

function changeToWhite(){
	$(".todaysforecastBox").css("color","#fff");
	$(".st0").css("fill","#fff");
	$(".uvindexBox").css("color","#fff");
	$(".uvindexCircle").css("border","8px solid #fff");
	$(".todaysforecastBox").css("color","#fff");
}

/*============================lightning animation============================*/
function lightningHome(){
	lightningOverlayHome();
	lightningHome1();
	lightningHome2();
}

const lightning = new TimelineMax({
  paused: true,
})

function lightningHome1(){
	const tl = new TimelineMax().repeat(-1).repeatDelay(5);
	const streak = document.querySelectorAll('.lightningstreak1')
  const pathLength = document.querySelector('.lightningstreak1__path').getTotalLength()

  tl.set(streak, {
    opacity: 1,
		zIndex:20,
		strokeWidth: 0.5,
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength
  })
  tl.staggerTo(streak, 0.5, {
    strokeDashoffset: 0,
		zIndex:20,
    stroke: 'white',
		ease: Linear.easeIn
	}, -0.1)
  tl.staggerTo(streak, 0.7, {
    opacity: 0,
		zIndex:20,
		ease: Bounce.easeOut
	}, -0.02)
  tl.to(streak, 0.4, {
    opacity: 1,
		zIndex:20,
    strokeWidth: '1.5px',
		ease: Linear.easeOut
	})
 tl.to(streak, 0.5, {
    strokeWidth: '0.5px',
		zIndex:220,
		ease: Linear.easeOut
	})
  tl.staggerTo(streak, 0.4, {
    opacity: 0,
		zIndex:20,
		ease: Linear.easeOut,
	}, -0.1)

	return tl
}

function lightningHome2(){
	const tl = new TimelineMax().repeat(-1).repeatDelay(5);
	const streak = document.querySelectorAll('.lightningstreak2')
  const pathLength = document.querySelector('.lightningstreak2__path').getTotalLength()

  tl.set(streak, {
    opacity: 1,
		zIndex:20,
		strokeWidth: 0.5,
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength
  })
  tl.staggerTo(streak, 0.8, {
    strokeDashoffset: 0,
		zIndex:20,
    stroke: 'white',
		ease: Linear.easeIn
	}, -0.1)
  tl.staggerTo(streak, 0.5, {
    opacity: 0,
		zIndex:20,
		ease: Bounce.easeOut
	}, -0.02)
  tl.to(streak, 0.6, {
    opacity: 1,
		zIndex:20,
    strokeWidth: '1.2px',
		ease: Linear.easeOut
	})
 tl.to(streak, 0.4, {
    strokeWidth: '0.5px',
		zIndex:220,
		ease: Linear.easeOut
	})
  tl.staggerTo(streak, 0.5, {
    opacity: 0,
		zIndex:20,
		ease: Linear.easeOut,
	}, -0.1)

	return tl
}

function lightningOverlayHome(){
	TweenMax.to(".lightningstreak1",0,{zIndex:20,display:"block",repeat:-1,repeatDelay:5});
	TweenMax.to(".lightningstreak2",0.5,{zIndex:20,display:"block",repeat:-1,repeatDelay:4.8});
	TweenMax.to(".lightoverlay1",1.5,{display:"block",repeat:-1,repeatDelay:6});
	TweenMax.to(".lightoverlay1",2,{display:"none",repeat:-1,repeatDelay:5.5});
	TweenMax.to(".lightoverlay2",2,{display:"block",repeat:-1,repeatDelay:5.5});
	TweenMax.to(".lightoverlay2",2.5,{display:"none",repeat:-1,repeatDelay:5});
}

function lightningMap(){
	appendLightningMap();
	lightningOverlayMap();
	lightningMap1();
	lightningMap2();
}


const lightning2 = new TimelineMax({
  paused: true,
})

function appendLightningMap(){
	str='<div class="lightoverlay lightoverlay3"></div>'
	str+='<div class="lightoverlay lightoverlay4"></div>'
	str+='<svg class="lightningstreak3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path class="lightningstreak3__path" fill="none" stroke-miterlimit="10" d="M54.833 0l2.165 4.747-2.165 6.76 1.083 4.868v2.434l1.082 2.703 1.352 4.056 2.162 3.244v7.841l-1.62 2.434.54 2.974 1.08 3.516v4.326l2.705 1.893 5.68 5.137v11.626l-.402 2.704.4 2.705v3.786l5.95 15.142 1.622 7.03-.54 4.326.54 5.41-1.623 8.652 1.623 8.113 3.786 7.573-1.082 4.866v4.327l-1.35 8.382 2.433 12.44v6.49l1.903 4.324-1.092 4.87-2.704 1.622v3.784l-2.163 3.246v4.87l-2.164 6.217"/></svg>'
	str+='<svg class="lightningstreak4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path class="lightningstreak4__path" fill="none" stroke-miterlimit="10" d="M54.833 0l2.165 4.747-2.165 6.76 1.083 4.868v2.434l1.082 2.703 1.352 4.056 2.162 3.244v7.841l-1.62 2.434.54 2.974 1.08 3.516v4.326l2.705 1.893 5.68 5.137v11.626l-.402 2.704.4 2.705v3.786l5.95 15.142 1.622 7.03-.54 4.326.54 5.41-1.623 8.652 1.623 8.113 3.786 7.573-1.082 4.866v4.327l-1.35 8.382 2.433 12.44v6.49l1.903 4.324-1.092 4.87-2.704 1.622v3.784l-2.163 3.246v4.87l-2.164 6.217"/></svg>'
	$('.lightningmap').append(str);
}

function lightningMap1(){
	const tl = new TimelineMax().repeat(-1).repeatDelay(5);
	const streak = document.querySelectorAll('.lightningstreak3')
  const pathLength = document.querySelector('.lightningstreak3__path').getTotalLength()

  tl.set(streak, {
    opacity: 1,
		zIndex:20,
		strokeWidth: 0.5,
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength
  })
  tl.staggerTo(streak, 0.5, {
    strokeDashoffset: 0,
		zIndex:20,
    stroke: 'white',
		ease: Linear.easeIn
	}, -0.1)
  tl.staggerTo(streak, 0.7, {
    opacity: 0,
		zIndex:20,
		ease: Bounce.easeOut
	}, -0.02)
  tl.to(streak, 0.4, {
    opacity: 1,
		zIndex:20,
    strokeWidth: '1.5px',
		ease: Linear.easeOut
	})
 tl.to(streak, 0.5, {
    strokeWidth: '0.5px',
		zIndex:220,
		ease: Linear.easeOut
	})
  tl.staggerTo(streak, 0.4, {
    opacity: 0,
		zIndex:20,
		ease: Linear.easeOut,
	}, -0.1)

	return tl
}

function lightningMap2(){
	const tl2 = new TimelineMax().repeat(-1).repeatDelay(5);
	const streak2 = document.querySelectorAll('.lightningstreak4')
  const pathLength2 = document.querySelector('.lightningstreak4__path').getTotalLength()

  tl2.set(streak2, {
    opacity: 1,
		zIndex:20,
		strokeWidth: 0.5,
    strokeDasharray: pathLength2,
    strokeDashoffset: pathLength2
  })
  tl2.staggerTo(streak2, 0.8, {
    strokeDashoffset: 0,
		zIndex:20,
    stroke: 'white',
		ease: Linear.easeIn
	}, -0.1)
  tl2.staggerTo(streak2, 0.5, {
    opacity: 0,
		zIndex:20,
		ease: Bounce.easeOut
	}, -0.02)
  tl2.to(streak2, 0.6, {
    opacity: 1,
		zIndex:20,
    strokeWidth: '1.2px',
		ease: Linear.easeOut
	})
 tl2.to(streak2, 0.4, {
    strokeWidth: '0.5px',
		zIndex:220,
		ease: Linear.easeOut
	})
  tl2.staggerTo(streak2, 0.5, {
    opacity: 0,
		zIndex:20,
		ease: Linear.easeOut,
	}, -0.1)

	return tl2
}


function lightningOverlayMap(){
	TweenMax.to(".lightningstreak3",0,{zIndex:20,display:"block",repeat:-1,repeatDelay:5});
	TweenMax.to(".lightningstreak4",0.5,{zIndex:20,display:"block",repeat:-1,repeatDelay:4.8});

	TweenMax.to(".lightoverlay3",1.5,{display:"block",repeat:-1,repeatDelay:6});
	TweenMax.to(".lightoverlay3",2,{display:"none",repeat:-1,repeatDelay:5.5});
	TweenMax.to(".lightoverlay4",2,{display:"block",repeat:-1,repeatDelay:5.5});
	TweenMax.to(".lightoverlay4",2.5,{display:"none",repeat:-1,repeatDelay:5});
}


/*============================rain animation============================*/
var increment = 0;
var drops = "";
var backDrops = "";

while (increment < 100) {
	//couple random numbers to use for various randomizations
	//random number between 98 and 1
	var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
	//random number between 5 and 2
	var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
	//increment
	increment += randoFiver;
	//add in a new raindrop with various randomizations to certain CSS properties
	drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
	backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
}

function rainHome() {
  $('.rainhome').empty();
	$('.rainhome.front-row').append(drops);
}

function rainMap() {
  $('.rainmap').empty();
	$('.rainmap.front-row2').append(drops);
}
/*============================waves animation============================*/

$("#wave1").wavify({
  height: 20,
  bones: 10,
  amplitude: 12,
  color: "rgba(5, 68, 119, 1)",
  speed: 0.4,
});

$("#wave2").wavify({
  height: 10,
  bones: 5,
  amplitude: 22,
  color: "rgba(0, 45, 91, 1)",
  speed: 0.25,
});

$("#wave3").wavify({
  height: 10,
  bones: 6,
  amplitude: 22,
  color: "rgba(0, 45, 91, 1)",
  speed: 0.25,
});


/*----------------------------------------------------------------
------------------------------------------------------------------
4 day weather data:
------------------------------------------------------------------
-----------------------------------------------------------------*/
function Load4d(){

	$.ajax({
		type: "GET",
		url: "https://api.data.gov.sg/v1/environment/4-day-weather-forecast",
		dataType: "json"
	})

	.done(function(json) { //tween max oncomplete
		json4d=json;
		ShowData4d();
	})

	.fail(function() {
		console.log("error");
	});
}

/*----------------------------
JS2 show data
----------------------*/
function ShowData4d(){
	for(a=0;a<json4d.items[0].forecasts.length;a++){

		var fourDates=json4d.items[0].forecasts[a].date

		$(".fourD>div:eq("+a+")").append('<p>'+fourDates+'</p>');

		weather4d=json4d.items[0].forecasts[a].forecast.toLowerCase();
		//weather4d="cloudy(day)";

		var weather4dRain= weather4d.search("rain");
		var weather4dThundery= weather4d.search("thundery showers");
		//thundery showers BEFORE showers
		var weather4dShowers= weather4d.search("showers");
		var weather4dFair= weather4d.search("fair");
		var weather4dPartlyCloudy= weather4d.search("partly cloudy");
		//partly cloudy BEFORE cloudy
		var weather4dCloudy= weather4d.search("cloudy");
		var weather4dOvercast= weather4d.search("overcast");
		var weather4dHazy= weather4d.search("hazy");

		if (weather4dRain>=0){
			$(".fourDforecastwhite-box>div:eq("+a+")").css("background-image","url(img/wrain.png)");
		}
		else if (weather4dThundery>=0) {
			$(".fourDforecastwhite-box>div:eq("+a+")").css("background-image","url(img/wthundery.png)");
		}
		else if (weather4dShowers>=0) {
			$(".fourDforecastwhite-box>div:eq("+a+")").css("background-image","url(img/wshowers.png)");
		}
		else if (weather4dFair>=0) {
			$(".fourDforecastwhite-box>div:eq("+a+")").css("background-image","url(img/wfair.png)");
		}
		else if (weather4dPartlyCloudy>=0) {
			$(".fourDforecastwhite-box>div:eq("+a+")").css("background-image","url(img/wpartlycloudy.png)");
		}
		else if (weather4dCloudy>=0) {
			$(".fourDforecastwhite-box>div:eq("+a+")").css("background-image","url(img/wcloudy.png)");
		}
		else if (weather4dOvercast>=0) {
			$(".fourDforecastwhite-box>div:eq("+a+")").css("background-image","url(img/wovercast.png)");
		}
		else if (weather4dHazy>=0){
			$(".fourDforecastwhite-box>div:eq("+a+")").css("background-image","url(img/whazy.png)");
		}

		else {
			console.log("error in finding 4d data")
		}
}

}

/*----------------------------------------------------------------
------------------------------------------------------------------
2hr weather data:
------------------------------------------------------------------
-----------------------------------------------------------------*/
function Load2hr(){

	$.ajax({
		type: "GET",
		url: "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast",
		dataType: "json"
	})

	.done(function(json) { //tween max oncomplete
		json2hr=json;
		//ShowData2h();
	})

	.fail(function() {
		console.log("error");
	});
}


/*----------------------------
JS2 show data
----------------------*/

/*MAP PAGE - CLICK LCN TO DISPLAY DATA*/
var locations=[
	{filename:"bedok",image:"img/tbbedok.png", name:"Bedok Reservoir",operator:"People's Association Water-Venture (PAWV)",tel:"9710 1697",fax:"6294 4393",otherinfo:""},

	{filename:"jurong", name:"Jurong Lake",operator:"People's Association Water-Venture (PAWV)",tel:"9710 1697",fax:"6294 4393",otherinfo:""},

	{filename:"lseletar", name:"Lower Seletar Reservoir",operator:"People's Association Water-Venture (PAWV)",tel:"9710 1697",fax:"6294 4393",otherinfo:""},

	{filename:"macritchie", name:"MacRitchie Reservoir",operator:"Singapore Canoe Federation (SCF) The Paddle Lodge",tel:"6258 0057 / 6344 6337",fax:"6732 4358 / 6344 3915",otherinfo:""},

	{filename:"marina", name:"Marina Reservoir",operator:"People's Association Water-Venture (PAWV) PAssion WaVe @ Marina Bay",tel:"6296 6683",fax:"6294 4393",otherinfo:"<p>Singapore Canoe Federation (SCF)<br>The Paddle Lodge<br>Tel: 6258 0057 / 6344 6337<br>Fax: 6732 4358 / 6344 3915</p><p>Singapore Sports Hub Water Sports Centre<br>Tel: (65) 6653 8900</p>"},

	{filename:"pandan", name:"Pandan Reservoir",operator:"Singapore Canoe Federation (SCF) The Paddle Lodge",tel:"6258 0057 / 6344 6337",fax:"6732 4358 / 6344 3915",otherinfo:""}

	//otherinfo because marina reservoir has a total of 3 operators
]


function redTag(){
	$(".lcns").on("click",".lcn",showTextbox);
	$(".lcns").on("click",".lcn",showWeather);

	//event delegate to .lcn
	for(a=0;a<locations.length;a++){
		str='<div class="lcn-id" data-id='+a+'>';
		str+='<img class="lcn lcn-'+locations[a].filename+' " src="img/lcn.png" data-id='+a+'>';

		$(".lcns").append(str);
	}
}

function showWeather(){

	var locaID=[1,16,46,8,12,16];
	//bedok,jurong,lowerseletar,macritchie,marina,pandan;

	///////////////////////APPEND LOCATION AND FORECAST///////////////////////
	$(".reservoirTitleBox").empty();

	var i=$(this).data("id");
	var forecast2hClicked=json2hr.items[0].forecasts[locaID[i]].forecast
	//var forecast2hClicked="partly cloudy"

	title="<div class='reservoirTitle'><h3>IT IS</h3>";
	title+=forecast2hClicked;
	title+="<h3>AT</h3>";
	title+=locations[i].name+"<div class='reservoirTitle'>";

	$(".reservoirTitleBox").append(title);

	///////////////////////////////FORECAST IMAGE///////////////////////////////
	weather2hr=forecast2hClicked.toLowerCase();

	var weather2hrRain= weather2hr.search("rain");
	var weather2hrThundery= weather2hr.search("thundery showers");
	//thundery showers BEFORE showers
	var weather2hrShowers= weather2hr.search("showers");
	var weather2hrFair= weather2hr.search("fair");
	var weather2hrPartlyCloudy= weather2hr.search("partly cloudy");
	//partly cloudy BEFORE cloudy
	var weather2hrCloudy= weather2hr.search("cloudy");
	var weather2hrOvercast= weather2hr.search("overcast");
	var weather2hrHazy= weather2hr.search("hazy");

	if (weather2hrRain>=0){
		$(".currentforecast2h-img").css("background-image","url(img/bgrain.png)");
		$(".forecastbox").css("background-color","#82929E");
		changeToWhite();
		rainMap();
	}
	else if (weather2hrThundery>=0) {
		$(".currentforecast2h-img").css("background-image","url(img/bgshowers.png)");
		$(".forecastbox").css("background-color","#82929E");
		changeToWhite();
		lightningMap();
		rainMap();
	}
	else if (weather2hrShowers>=0) {
		$(".currentforecast2h-img").css("background-image","url(img/bgshowers.png)");
		$(".forecastbox").css("background-color","#82929E");
		changeToWhite();
		rainMap();
	}
	else if (weather2hrFair>=0) {
		$(".currentforecast2h-img").css("background-image","url(img/bgfair.png)");
		changeStyleTimeMap();
	}
	else if (weather2hrPartlyCloudy>=0) {
		$(".currentforecast2h-img").css("background-image","url(img/bgpartlyc.png)");
		changeStyleTimeMap();
	}
	else if (weather2hrCloudy>=0) {
		$(".currentforecast2h-img").css("background-image","url(img/bgcloudy.png)");
		changeStyleTimeMap();
	}
	else if (weather2hrOvercast>=0) {
		$(".currentforecast2h-img").css("background-image","url(img/bgovercast.png)");
		$(".forecastbox").css("background-color","#82929E");
		changeToWhite();
	}

	else if (weather2hrHazy>=0){
		$(".currentforecast2h-img").css("background-image","url(img/bghazy.png)");
		$(".forecastbox").css("background-color","#B0BFC6");
	}

	else {
		console.log("error in finding 2h data")
	}
}


function showTextbox(){
	removeData();
	var i=$(this).data("id");
	$(".tb-"+locations[i].filename).addClass("show"+locations[i].filename);
	//show textbox
	$(".xbtn-"+locations[i].filename).addClass("xbtn-show"+locations[i].filename);
	//show close button

	str='<div class="lcn-operator"><strong>Operator:</strong><br>'+locations[i].operator+'<br></div>';
	str+='<div class="lcn-operator">Tel: '+locations[i].tel+'<br></div>';
	str+='<div class="lcn-operator">Fax: '+locations[i].fax+'<br></div>';
	str+='<div class="lcn-operator">'+locations[i].otherinfo+'</div>';

	$("."+locations[i].filename+" "+".lcn-text").append(str);
	$("."+locations[i].filename+" "+".lcn-text").css("display","block");
}


function closeTextbox(){
	$(".reservoirTitleBox").empty();

	str='<div class="taptoviewweather">';
	str+='<p>Kayaks can be rented at the following locations:</p>';
	str+='<h3>Bedok Reservoir, Jurong Lake, Lower Seletar Reservoir, MacRitchie Reservoir, Marina Reservoir, Pandan Reservoir.</h3>';
	str+='<p>Tap the locations for more information!</p>';
	str+='</div>'
	$(".reservoirTitleBox").append(str);

	removeData();
}

function removeData(){
	for(var a=0;a<locations.length;a++){
		$(".tb-"+locations[a].filename).removeClass("show"+locations[a].filename);
		$(".xbtn-"+locations[a].filename).removeClass("xbtn-show"+locations[a].filename);
		$("."+locations[a].filename+" "+".lcn-text").empty();
		$("."+locations[a].filename+" "+".lcn-text").css("display","none");
		$(".currentforecast2h-img").css('background-image','none');
	}

	$(".forecastbox").css("background-color","#054477");
	$('.rainmap').empty();

	$('.lightningmap').empty();
}

/*----------------------------------------------------------------
------------------------------------------------------------------
UV Index data:
------------------------------------------------------------------
-----------------------------------------------------------------*/
function LoadUVI(){
	$.ajax({
	type: "GET",
	url: "https://api.data.gov.sg/v1/environment/uv-index",
	dataType: "json"
	})

	.done(function(json) {
		uvNumber = json.items[0].index[0].value;
		//uvNumber = 5;

		$(".uvindexNumber").append(uvNumber);
		$(".uv-number").append(uvNumber);

		//change colour function
		if (uvNumber <3){
			$(".uvcircle").addClass("low");
			$(".uv-title").append("low");
			$(".uv-text").append("Low risk of harm from unprotected exposure.");
			$(".methodstext").append("No protection needed. You can safely stay outside!");
			$(".sunscreen,.sunglasses,.umbrella,.hat").css("display","none");
			$(".methodsbox").append('<div class="methodsimg noneneeded"></div>');
			$(".methodsbox").addClass("noneneeded-centre");
		}

		else if (uvNumber <6){
			$(".uvcircle").addClass("moderate");
			$(".uv-title").append("moderate");
			$(".uv-text").append("Moderate risk of harm from unprotected exposure.");
			$(".methodstext").append("Use these if you are staying out for long!");
			$("#uvipage").css("background-image","url(img/bgmoderate.png)");
		}

		else if (uvNumber <8){
			$(".uvcircle").addClass("high");
			$(".uv-title").append("high");
			$(".uv-text").append("High risk of harm from unprotected exposure.");
			$(".methodstext").append("Limit sun exposure!");
			$("#uvipage").css("background-image","url(img/bghigh.png)");
		}

		else if (uvNumber <11){
			$(".uvcircle").addClass("veryhigh");
			$(".uv-title").append("very high");
			$(".uv-text").append("Very high risk of harm from unprotected exposure.");
			$(".methodstext").append("Warning: Avoid sun exposure!");
			$("#uvipage").css("background-image","url(img/veryhigh.png)");
		}
		else{
			$(".uvcircle").addClass("extreme");
			$(".uv-title").append("extreme");
			$(".uv-text").append("Extreme risk of harm from unprotected exposure.");
			$(".methodstext").append("Take extreme precautions!");
			$("#uvipage").css("background-image","url(img/extreme.png)");
			}
	})

	.fail(function() {
	console.log("error");
	});
}

var pmethods=[
	{name:"Sunscreen SPF 30+",description:"Apply sunscreen sufficiently and reapply every 2 hours. Use SPF 30 and above."},
	{name:"Sunglasses",description:"Sunglasses reduce the amount of UV radiation reaching the eyes, reducing the risk of contracting disesases."},
	{name:"Umbrella",description:"Use umbrellas to reduce UV exposure, especially on a sunny day."},
	{name:"Hat",description:"Wear caps/hats, especially when UV index is high. Broad-brimmed hats provide more UV protection."},
]

function appendProtectionM(){
	/*after clicking on protect yourself, append info*/
	$(".sunscreen,.sunglasses,.umbrella,.hat").css("display","block");
	$(".methodsbox").removeClass("methodsboxClicked2");
	$(".methodsbox").addClass("methodsboxClicked");

	for (a=0;a<pmethods.length;a++){
		$(".methodsbox>div:eq("+a+")").empty();
		str='<h3>'+pmethods[a].name+'</h3>';
		str+='<p>'+pmethods[a].description+'</p>';
		$(".methodsbox>div:eq("+a+")").append(str);
	}
}

function showProtectPage(){
	$("#orangebox").toggleClass("orangeboxClicked");
	$(".methodstext").toggleClass("methodstextClicked");
	$(".methodsbox").toggleClass("methodsboxClicked");
	$(".noneneeded").css("display","none");

		if (uvNumber <3){
			$(".methodstext").append(" Use these to protect yourself the next time UVI is higher.");
		}

	appendProtectionM();
	hideText();
	$(".tri1").toggleClass("trirotate1");
	$(".tri2").toggleClass("trirotate2"); //triangle rotate animation
}

var isToggled=true;

function hideText(){ //function to toggle hide and show text
	isToggled=!isToggled;
	if(isToggled){
		$(".methodsimg>*").empty();
	}

	if (isToggled && uvNumber <3){
		$(".sunscreen,.sunglasses,.umbrella,.hat").css("display","none");
		$(".methodsimg>*").empty();
		$(".methodsbox").toggleClass("methodsboxClicked2");
		$(".noneneeded").css("margin-top","-40px");
		$(".noneneeded").css("display","block");

		$(".methodstext").empty();
		$(".methodstext").append("No protection needed. You can safely stay outside!");
	}
}
