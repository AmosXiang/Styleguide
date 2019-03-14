


// -------------------- on page load ----------------

window.onload = function () {
  slidein();
  defineData();
  drawStartPage();
  drawTimeline();
  scrollToBottom();
  glitchEffect();

  document.getElementById("timeline").focus();
  window.onscroll = function () { pageScrolled() };
  window.onresize = function () { drawStartPage(); };
  window.onbeforeunload = function () { scrollToBottom(); } // scroll down on refresh



};

// -------------------- set data --------------------

function defineData() {

  window.incrementHeight = 25;
  window.moveBar = document.getElementById("moveBar");
  window.pageMap = document.getElementById("map");
  window.windowHeight = 0;
  window.maxTop = 0;


  window.items = '{ "items" : [' + '{"scale":"110","t1":"&nbsp&nbsp&nbsp&nbsp&nbspthis way.","t2":"This way please.","pic":"30"}' + ']}';

  window.sectionHight = [35, 70];
  window.sectionName = ['Game Design', '3D animation'];
  window.sectionColour = [];

}

function slidein() {
  $(document).ready(function () {

    $("h1").animate({ right: '300px' });

  });
}

// -------------------- size start page --------------------

function drawStartPage() {

  // change if resized more than 100px - avoids ios header change
  if (Math.abs(document.body.clientHeight - windowHeight) > 10) {

    // get sizes
    windowHeight = document.body.clientHeight;
    var startPage = document.getElementById("startPage");
    var startPageContent = document.getElementById("startPageContent");
    var startPageContentHeight = startPageContent.clientHeight;

    // set styles
    startPage.style.height = windowHeight + "px";
    var topOfContent = (windowHeight / 2) - (startPageContentHeight / 2);
    startPageContent.style.marginTop = topOfContent + "px";

  }

}

// -------------------- draw page --------------------

function drawTimeline() {

  // parse json
  var itm = JSON.parse(window.items);
  window.elements = [];




  // set current era
  var currentEra = 0;

  // loop through scale
  for (scale = 0; scale <= 110; scale++) {

    // set variables
    var t1 = "";
    var t2 = "";
    var pic = "";
    var contentDiv = "";

    // content page
    
    if (scale == 0) {
      var dateDiv =
        "<div class='date'>"+
          "<span class='dateNumber'> <div id='myWork'>Work</div></span>"+
          "<div class='colorBox'>"+       
            "<div class='colorBox2'></div>"+
            "<div id='subtitleG'>Earthquake Narrative Simulation </div>"+
            "<div id='gameIntro'>An immersive educational simulation that create the experience of an earthquake scenario. It provides different form of intuitive interaction between the user and the scene. Aimed to aid the annual ShakeOut BC drill for people to experience a simulated earthquake environment to practice and get prepared in case of the real Earthquake. </div>"+
         
            "<div class='wrapper'>"+
              "<a href='work.html' class='glitch'><img src='img/warning.jpg' alt=''/></a> "+
            "</div>"+
            "<div class='button'><a href='work.html'>More</a></div>"
          "</div>"+
        "</div>"
      ;
    }
    else if (scale == 35){
      var dateDiv =
        "<div class='date'>"+
          "<span class='dateNumber'> <div id='myWork'>Work#2</div></span>"+
          "<div class='colorBoxII'>"+       
            "<div class='colorBox3'></div>"+
            "<div id='subtitleA'>Animation - Panda's Advanture</div>"+
            "<div id='gameIntroA'>A short film that a panda falling from the cliff and went back to the Jurassic period  modeled and animated via Maya. </div>"+
         
            "<div class='wrapperII'>"+
              "<a href='work2.html' class='glitch'><img src='img/pandaF.jpg' alt=''/></a> "+
            "</div>"+
            "<div class='button2'><a href='work2.html'>More</a></div>"
          "</div>"+
        "</div>"
      ;
    }
    else if (scale == 70) {
      var dateDiv =
        "<div class='date'>"+
          "<span class='dateNumber'><div id='aboutMe'>About me</div><br></span>"+
          "<div class='colorBoxIII'>"+ 
            "<div class='colorBox4'></div>"+
            "<div id='selfIntro'>I passionate about the creation of immersive worlds through game design. I believe that creating gaming experience with good interactive storytelling provides the audiences with breathtaking and evocative experience.</div>"+
          "</div>"+ 
        "</div>"
        ;
    }
    // else if (scale % 10 === 0) {
    //   if (scale >= 1000) { var dateDiv = "<div class='date'><span class='dateNumber'>" + (scale / 1000).toFixed(2) + "</span><span class='dateM'> B<br /></span><span class='dateLabel'>years ago</span></div>"; }
    //   else { var dateDiv = "<div class='date'><span class='dateNumber'>" + scale + "</span><span class='dateM'> M<br /></span><span class='dateLabel'>scale ago</span></div>"; }
    // }
    else { dateDiv = ""; }

    // loop through all items
    for (n = 0; n < itm.items.length; n++) {

      // see if this scale is in array
      if (itm.items[n].scale == scale) {

        // if in array - set parameters of item
        t1 = itm.items[n].t1;
        t2 = itm.items[n].t2;
        pic = itm.items[n].pic;

        // add to elements array
        elements.push(scale);

      }
    }

    // adjust for image size
    var imageAdjust = pic * -160;

    // define content div
    if (t1) {
      contentDiv = "<div class='content' id='section" + scale + "'><div class='tImage' style='background-position: 0px " + imageAdjust + "px;''></div><br /><span class='t1'>" + t1 + "<br /></span><span class='t2'>" +
      " <a href='#myWork'><div class='arrow'></div></a>"
      +"</span></div>";
    }
    else { contentDiv = ""; }

    // create div
    var iDiv = document.createElement('div');

    // determine section background color
    var theColor = "#" + sectionColour[currentEra];
    if (scale == (sectionHight[currentEra] - 1)) {
      eraDiv = "<div class='eraLabel' id='thisEra" + scale + "'>" + sectionName[currentEra] + "</div>";
      currentEra = currentEra + 1;
    }
    else { eraDiv = ""; }

    // set div properties
    iDiv.className = 'scaleBlock';
    iDiv.innerHTML = dateDiv + eraDiv + contentDiv;
    iDiv.style.backgroundColor = theColor;

    // add div to page
    document.getElementById("timeline").appendChild(iDiv);

  } // end loop

} // end function

// -------------------- scroll to bottom --------------------

function scrollToBottom() {

  window.scrollTo(0, document.body.scrollHeight);

}

// -------------------- on scrolling --------------------

function pageScrolled() {

  // get body heights
  var scrollTop = document.body.scrollTop;
  var scrollHeight = document.body.scrollHeight;
  var windowHeight = document.body.clientHeight;

  // calculate percentage down
  maxTop = scrollHeight - windowHeight;
  var percentDown = scrollTop / maxTop;

  // adjust map line
  var mapHeight = pageMap.clientHeight;
  var mapDot = percentDown * mapHeight;
  document.getElementById("mapDot").style.top = mapDot;

  // loop through elements
  for (g = 0; g < elements.length; g++) {

    // set divnum
    var divnum = elements[g];

    // calculate placement
    var elementTop = document.getElementById("section" + divnum).offsetTop;
    var elementHeight = document.getElementById("section" + divnum).clientHeight;
    var elementTopOfScreen = elementTop - scrollTop;
    var elementCenterOfScreen = elementTopOfScreen - (windowHeight / 2) + (elementHeight / 2);
    var absoluteCenterDistance = Math.abs(elementCenterOfScreen);
    var halfWindowHeight = windowHeight / 2;

    // scale content
    var percentElementDownScreen = 1.5 - (absoluteCenterDistance / halfWindowHeight);
    var shouldScale = "yes";
    if (percentElementDownScreen < 0.1) { shouldScale = "no"; }
    if (percentElementDownScreen < 0.3) { percentElementDownScreen = 0.3; }
    else if (percentElementDownScreen > 1) { percentElementDownScreen = 1; }

    // scale div only if near screen
    if (shouldScale == "yes") {
      document.getElementById("section" + divnum).style.transform = "scale(" + percentElementDownScreen + ")";
      document.getElementById("section" + divnum).style.opacity = percentElementDownScreen;
    }

  }

  // adjust top message
  mapVisibility(scrollTop);
  navVisibility(scrollTop);
  deloreanVisibility(scrollTop);


}

// -------------------- years to pixels --------------------

function yearsToPixels(years) {
  return years * incrementHeight;
}



// -------------------- show hide map --------------------

function mapVisibility(scrollTop) {

  if (scrollTop < yearsToPixels(4610)) { pageMap.style.display = "inherit"; }
  else { pageMap.style.display = "none"; }

}




// -------------------- jump to page section --------------------

function jumpTo(newYear) {

  // animate if not already animating
  if (animatingNow == "no") {

    // set parameters
    animatingNow = "yes";
    var duration = 4000;
    if (newYear == 4600) { duration = 2000; }
    var toPos = yearsToPixels(newYear);

    // center icon on page if higher up
    if (newYear < 4200) {
      windowHeight = document.body.clientHeight;
      toPos = toPos - ((windowHeight / 2) - 200);
    }

    // dont scroll past bottom
    if (toPos >= maxTop) { toPos = maxTop; }

    // set animation parameters
    var startPos = window.scrollY,
      changePos = toPos - startPos,
      increment = 20;

    // animating direction
    if (startPos >= toPos) { animatingNow = "up"; }
    else { animatingNow = "down"; }

    // animate function
    var animateScroll = function (elapsedTime) {
      elapsedTime += increment;
      var position = easeInOut(elapsedTime, startPos, changePos, duration);
      window.scrollTo(0, position);
      if (elapsedTime < duration) {
        setTimeout(function () {
          animateScroll(elapsedTime);
        }, increment);
      }
      else { animatingNow = "no"; }
    };

    // start animation
    animateScroll(0);

  }

}

// -------------------- ease in out --------------------

function easeInOut(currentTime, start, change, duration) {

  currentTime /= duration / 2;
  if (currentTime < 1) { return change / 2 * currentTime * currentTime + start; }
  currentTime -= 1;
  return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;

}

// glitch effect
// https://codepen.io/wiledal/pen/rhHJc
function glitchEffect(){
  $(".glitch").each(function(i, el) {
    const $tar = $(el);
    
    return $tar.on("mouseenter", function() {
      if (!$tar.is(".glitch-initiated")) {
        $tar.addClass("glitch-initiated");
        const tarHeight = $tar.height();
        
        const originalHTML = $tar.html();
        
        $tar.html(`<span class='glitch-original'>${originalHTML}</span>`);
        
        const effectWrapper = $("<span>").addClass("glitch-effect");
        $tar.prepend(effectWrapper);
        
        i = tarHeight/2;
        return (() => {
          const result = [];
          while (i > 0) {
            i--;
          
            const ran = 3 - (Math.random() * 6);
            const newSpan = $("<span>").html(originalHTML).css({
              transform: `translate(${ran}px, -${i * 2}px)`
            });
            const newSpan2 = $("<span>").append(newSpan).css({
              transform: `translate(0, ${i * 2}px)`
            });
            result.push(effectWrapper.append(newSpan2));
          }
          return result;
        })();
      }
    });
  });
        
}


