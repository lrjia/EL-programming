const toggle = document.querySelector('#toggleGroup'),
red = document.querySelector('#BG'),
black = document.querySelector('#BGDark'),
starRed = document.querySelector('#lightStar'),
starRedBG = document.querySelector('#lightStarBG'),
starBlack = document.querySelector('#bigStarDark'),
starBlackBG = document.querySelector('#bigStarDarkBG'),
dsLines = document.querySelector('#deathStarLines'),
dsOverlay = document.querySelector('#deathStarOverlay'),
shipFront = document.querySelector('#falconFront'),
shipTop = document.querySelector('#falconTop'),
shipLinesMasked = document.querySelector('#falconLines'),
shipLines = document.querySelector('#falconLinesNoClip'),
falconOverlay = document.querySelector('#falconOverlay'),
lightStarGroup = document.querySelector('#bigLightStarGroup'),
lightStarGroupSmall = document.querySelectorAll('#smallLightStars circle'),
smallPlanet = document.querySelector('#smallPlanet'),
bigPlanet = document.querySelector('#bigPlanet'),
cometRight = document.querySelector('#cometRight'),
cometLeft = document.querySelector('#cometLeft'),
darkStarGroup = document.querySelector('#bigStarDarkGroup'),
darkStarGroupSmall = document.querySelectorAll('#smallDarkStars circle');

MorphSVGPlugin.convertToPath('line');

TweenMax.set('svg', { visibility: "visible" });
TweenMax.set(shipFront, { x: 45, scaleX: 0.75, transformOrigin: "right center" });
TweenMax.set(shipTop, { x: 34, opacity: 0, scaleX: 0.6, transformOrigin: "right center" });
TweenMax.set(shipLinesMasked, { opacity: 0, x: 4 });
TweenMax.set(falconOverlay, { opacity: 0 });
TweenMax.set(shipLines, { opacity: 0 });
TweenMax.set(darkStarGroup, { opacity: 0 });
TweenMax.set(cometLeft, { x: 60, scale: 0.95, opacity: 0, transformOrigin: "center center" });
TweenMax.set(cometRight, { scale: 0.90, transformOrigin: "center bottom" });
TweenMax.set(darkStarGroupSmall, { x: 75 });

// ROTATE STARS FUNCTION
const rotateStar = (x, y, delay) => {
  const starTl = new TimelineMax({ delay: delay });
  starTl.to(x, 0.24, {
    rotation: '+=90',
    transformOrigin: "center center",
    scale: 1.15 },
  'in').
  to(y, 0.24, {
    transformOrigin: "center center",
    scale: 1.15,
    attr: {
      'fill-opacity': "0.35" } },

  'in').
  to(x, 0.24, {
    rotation: '+=90',
    transformOrigin: "center center",
    scale: 1 },
  'out').
  to(y, 0.24, {
    transformOrigin: "center center",
    scale: 1,
    attr: {
      'fill-opacity': "0.25" } },

  'out');
  return starTl;
};

const onLoad = () => {
  rotateStar(starRed, starRedBG, 0.1);
};

// TOGGLE
// Set the transformValue to determine the direction of the toggle
const toggleBtn = transformValue => {
  const toggleTl = new TimelineMax({ paused: false }).
  to(toggle, 0.75, {
    x: transformValue,
    ease: Power1.easeIn },
  'toggle').
  to(toggle, 0.2, {
    scaleX: 0.97,
    transformOrigin: "right center" }).

  to(toggle, 0.2, {
    scaleX: 1,
    transformOrigin: "right center" });

  return toggleTl.timeScale(1.20);
};

// BACKGROUND
const bgTl = new TimelineMax({
  paused: true });

bgTl.to(black, 1, {
  opacity: 1 },
'in').
to(red, 1, {
  opacity: 0 },
'in');

// STARS
const toggleStars = (
starGroup, starGroupSmall,
transformValue, starGroup2,
starGroupSmall2, transformValue2,
transformValue3) =>
{
  const tl = new TimelineMax();
  tl.to(starGroup, 1, {
    x: transformValue,
    opacity: 0 },
  'toggle').
  to(starGroup, 0.32, {
    transformOrigin: "center center",
    scale: 0.6 },
  'toggle').
  to(starGroup, 0.5, {
    scale: 0.95 },
  'toggle+=0.32')
  // Small stars 
  .to(starGroupSmall, 0.75, {
    x: transformValue,
    opacity: 0 },
  'toggle').
  to(starGroupSmall, 0.32, {
    transformOrigin: "center center",
    scaleX: 1.75,
    scaleY: 0.55 },
  'toggle').
  to(starGroupSmall, 0.5, {
    transformOrigin: "center center",
    scaleX: 1,
    scaleY: 1 },
  'toggle+=0.5')
  // Star Group 2 
  .to(starGroup2, 0.75, {
    x: transformValue2,
    opacity: 1 },
  'toggle+=0.25')
  // Small Group 2
  .to(starGroupSmall2, 0.75, {
    x: transformValue2,
    opacity: 1 },
  'toggle+=0.25').
  to(starGroupSmall2, 0.7, {
    transformOrigin: "center center",
    scaleX: 1.75,
    scaleY: 0.55 },
  'toggle+=0.25').
  to(starGroupSmall2, 0.24, {
    transformOrigin: "center center",
    scaleX: 1,
    scaleY: 1 },
  'toggle+=0.8')
  // Bounce out
  .to(starGroup2, 0.24, {
    x: transformValue3,
    opacity: 1 },
  'toggle+=1').
  to(starGroupSmall2, 0.24, {
    x: transformValue3,
    opacity: 1 },
  'toggle+=1');
  return tl.timeScale(1.2);
};

// PLANETS
const togglePlanets = new TimelineMax({ paused: true });
// SMALL
togglePlanets.to(smallPlanet, 0.08, {
  x: 2,
  y: 1,
  transformOrigin: "center bottom",
  scale: 0.92 },
'toggle').
fromTo(smallPlanet, 0.32, {
  x: 2,
  y: 1 },
{
  x: -40,
  y: 0 },
'toggle+=0.08').
to(smallPlanet, 0.16, {
  opacity: 0 },
'toggle+=0.12')
// BIG
.to(bigPlanet, 0.16, {
  scale: 1.08,
  transformOrigin: "center center",
  ease: Linear.easeNone },
"toggle").
to(bigPlanet, 0.84, {
  x: -245,
  y: -10 },
'toggle+=0.16').
to(bigPlanet, 0.32, {
  transformOrigin: "center center",
  scale: 0.85 },
'toggle').
to(bigPlanet, 0.24, {
  opacity: 0 },
'toggle+=0.16')
// Change Planet color 
.set(bigPlanet, {
  attr: {
    fill: "url(#planetBigDark)" } },

'toggle+=0.32').
to(bigPlanet, 0.5, {
  transformOrigin: "center center",
  scale: 1,
  opacity: 1 },
'toggle+=0.48');

// COMETS
const toggleComet = new TimelineMax({ paused: true });
toggleComet
// RIGHT
.to(cometRight, 0.16, { x: 10, ease: Linear.easeNone }, 'toggle').
to(cometRight, 0.52, { x: -50, transformOrigin: "center bottom", ease: Linear.easeNone }, 'toggle+=0.16').
to(cometRight, 0.24, { opacity: 0 }, 'toggle+=0.48')
// LEFT
// hiding when toggle goes from r to l
.set(cometLeft, { opacity: 1 }, 'toggle+=0.32')
// showing when toggle goes from l to r
.set(cometLeft, { opacity: 1 }, 'toggle+=0.4').
to(cometLeft, 0.5, { x: 0, opacity: 1 }, 'toggle+=0.48');


// DEATH STAR TL 
const dsLinesTl = new TimelineMax({ paused: true,
  onReverseComplete: () => {
    // DEATH STAR OUT
    const tl = new TimelineMax();
    tl.to(centerBot, 0.2, { x: -3 }, 'bounce').
    to(centerMid, 0.2, { x: -3 }, 'bounce').
    to(centerTop, 0.2, { x: -3 }, 'bounce').
    to(circleGroup, 0.2, { scaleX: 0.98, x: -3, transformOrigin: "left center" }, 'bounce').
    to(outerBot, 0.2, { x: -3 }, 'bounce').
    to(outerTop, 0.2, { x: -3 }, 'bounce').
    to(smallLines, 0.2, { x: -3 }, 'bounce').
    to(smallLinesCenterRight, 0.2, { x: -2 }, 'bounce').
    to(smallLineRight, 0.2, { x: -3 }, 'bounce').
    to(middleLine, 0.2, { x: -3 }, 'bounce').
    to(bentLine, 0.2, { rotation: -3, transformOrigin: "right bottom" }, 'bounce').

    to(centerBot, 0.2, { x: 0 }, 'out').
    to(centerMid, 0.2, { x: 0 }, 'out').
    to(centerTop, 0.2, { x: 0 }, 'out').
    to(circleGroup, 0.2, { scaleX: 1, x: 0, transformOrigin: "left center" }, 'out').
    to(outerBot, 0.2, { x: 0 }, 'out').
    to(outerTop, 0.2, { x: 0 }, 'out').
    to(smallLines, 0.2, { x: 0 }, 'out').
    to(smallLinesCenterRight, 0.24, { x: 0 }, 'out').
    to(smallLineRight, 0.2, { x: 0 }, 'out').
    to(middleLine, 0.2, { x: 0 }, 'out').
    to(bentLine, 0.2, { rotation: 0, transformOrigin: "right bottom" }, 'out').
    add(() => {toggled = false;}, 'out+=0.25');} });

// Lines
const centerBot = document.querySelector('#centerBot'),
centerMid = document.querySelector('#centerMid'),
centerTop = document.querySelector('#centerTop'),
circleGroup = document.querySelector('#deathStarCircleGroup'),
outerBot = document.querySelector('#outerBot'),
outerTop = document.querySelector('#outerTop'),
smallLines = document.querySelectorAll('#smCL,#smL'),
smallLinesCenterRight = document.querySelector('#smCR'),
smallLineRight = document.querySelector('#smR'),
middleLine = document.querySelector('#deathStarMiddleLine'),
bentLine = document.querySelector('#bentLineLeft');

dsLinesTl.
to(centerBot, 0.16, {
  morphSVG: "#centerBotMorph",
  ease: Linear.easeNone },
'morph').
to(centerMid, 0.16, {
  morphSVG: "#centerMidMorph",
  ease: Linear.easeNone },
'morph').
to(centerTop, 0.16, {
  morphSVG: "#centerTopMorph",
  ease: Linear.easeNone },
'morph').
fromTo(outerBot, 0.16, { x: 0, y: 0 }, {
  morphSVG: "#outerBotMorph",
  ease: Linear.easeNone,
  x: 4,
  y: 2 },
'morph').
fromTo(outerTop, 0.16, { x: 0, y: 0 }, {
  morphSVG: "#outerTopMorph",
  ease: Linear.easeNone,
  x: 4,
  y: -1 },
'morph')
// Circle
.fromTo(circleGroup, 0.16, { x: 0, y: 0 }, {
  transformOrigin: "center center",
  scaleY: 1,
  scaleX: 0.9,
  x: 33,
  y: 0,
  ease: Linear.easeNone },
'morph').
fromTo(circleGroup, 0.16, { x: 33, y: 0, immediateRender: false }, {
  transformOrigin: "center center",
  scaleY: 1,
  scaleX: 0.9,
  x: 72,
  y: -2,
  ease: Linear.easeNone },
'morph+=0.16')
// Small Horizontal Lines death star
.fromTo(smallLines, 0.32, { x: 0 }, {
  x: 81,
  ease: Linear.easeNone },
'morph').
fromTo(smallLinesCenterRight, 0.32, { x: 0 }, {
  x: 77,
  ease: Linear.easeNone },
'morph').
fromTo(smallLineRight, 0.32, { x: 0 }, {
  x: 74,
  ease: Linear.easeNone },
"morph")
// Small Horizontal line middle
.fromTo(middleLine, 0.32, { x: 0 }, {
  x: 85,
  ease: Linear.easeNone },
'morph').
fromTo(smallLines, 0.16, { x: 81, immediateRender: false }, {
  x: 116,
  ease: Linear.easeNone },
'morph+=0.32').
fromTo(middleLine, 0.16, { x: 85, immediateRender: false }, {
  x: 113,
  ease: Linear.easeNone },
'morph+=0.32').
to(bentLine, 0.16, {
  morphSVG: '#bentLineLeftMorph',
  ease: Linear.easeNone },
'morph').
fromTo(centerBot, 0.16, { x: 0, y: 0 }, {
  morphSVG: "#centerBotMorph2",
  x: 4,
  y: 2,
  ease: Linear.easeNone },
'morph+=0.16').
fromTo(centerMid, 0.16, { x: 0 }, {
  morphSVG: "#centerMidMorph2",
  x: 4,
  ease: Linear.easeNone },
'morph+=0.16').
fromTo(centerTop, 0.16, { x: 0, y: 0 }, {
  morphSVG: "#centerTopMorph2",
  x: 4,
  y: -1,
  ease: Linear.easeNone },
'morph+=0.16').
to(bentLine, 0.16, {
  morphSVG: '#bentLineLeftMorph2',
  ease: Linear.easeNone },
'morph+=0.16').
fromTo(bentLine, 0.16, { y: 0 }, {
  morphSVG: '#bentLineLeftMorph3',
  transformOrigin: "left bottom",
  ease: Linear.easeNone,
  y: 1 },
'morph+=0.32')
//
.
set('#deathStar', { opacity: 0 }, "morph+=0.48");

let toggled = false;
// Falcon TL 
const falconIn = () => {
  const tl = new TimelineMax({
    onComplete: () => {
      toggled = true;
    } });

  tl.
  set(shipTop, { opacity: 1 }, 'toggle+=0.32').
  to(shipTop, 0.5, { x: 0, scaleX: 1 }, 'toggle+=0.32').
  to(shipFront, 0.5, { x: 0, scaleX: 1 }, 'toggle+=0.40').
  set(falconOverlay, { opacity: 1 }, 'toggle+=0.48').
  to(falconOverlay, 0.48, { x: -158 }, 'toggle+=0.48').
  to(falconOverlay, 1.1, { opacity: 0 }, 'toggle+=0.48').
  to(shipLinesMasked, 0.48, { opacity: 1, x: 0 }, 'toggle+=0.48').
  set(shipLines, { x: 0 }, 'toggle+=0.48').
  to(shipLines, 0.08, { opacity: 1, ease: Linear.easeNone }, 'toggle+=0.88')
  // Bounce Out
  .to(shipLinesMasked, 0.16, { x: 1, scaleX: 0.98, transformOrigin: "left center" }, 'toggle+=0.94').
  to('#falconDots', 0.16, { x: -1, transformOrigin: "left center" }, 'toggle+=0.94').
  to(shipLinesMasked, 0.16, { x: 0, scaleX: 1, transformOrigin: "left center" }, 'toggle+=1.10').
  to('#falconDots', 0.16, { x: 0, transformOrigin: "left center" }, 'toggle+=1.10');
  return tl.timeScale(1.20);
};


const falconOut = () => {
  const tl = new TimelineMax({
    onComplete: () => {
      TweenMax.set(shipLinesMasked, { clearProps: 'scale' });
    } });

  tl.
  to(shipLines, 0.24, { opacity: 0, x: 4, ease: Linear.easeNone }, 'toggle').
  to(shipLinesMasked, 0.32, { opacity: 0, x: -4, scale: 1.05, transformOrigin: "center center" }, 'toggle').
  to(falconOverlay, 0.32, { x: 0 }, 'toggle').
  to(shipTop, 0.08, { x: -2, y: 1, ease: Linear.easeNone }, 'toggle').
  to(shipTop, 0.40, { x: 34, y: 0, scaleX: 0.6, transformOrigin: "right center" }, 'toggle+=0.08').
  to(shipFront, 0.40, { x: 45, scaleX: 0.75, transformOrigin: "right center" }, 'toggle+=0.08').
  set(shipTop, { opacity: 0 }, 'toggle+=0.48');
  return tl.timeScale(1.2);
};


const starBounceOut = delay => {
  const tl = new TimelineMax({ delay: delay });
  tl.to(lightStarGroup, 0.64, { scale: 1.05, transformOrigin: "center center" }).
  to(lightStarGroup, 0.24, { scale: 1 });
  return tl.timeScale(1.2);
};

// MASTER TL
const masterTl = new TimelineMax({ paused: true });
masterTl.add(bgTl.play(), 0).
add(togglePlanets.play(), 0).
add(toggleComet.play(), 0).
add(dsLinesTl.play(), 0);

masterTl.timeScale(1.2);

// Event listener toggle
toggle.addEventListener('click', () => {
  if (masterTl.progress() === 0 && !masterTl.isActive() && toggled === false) {
    masterTl.play();
    toggleBtn(
    180);

    toggleStars(
    lightStarGroup,
    lightStarGroupSmall,
    "-375",
    darkStarGroup,
    darkStarGroupSmall,
    "-430",
    "-380");

    falconIn();
    rotateStar(
    starBlack,
    starBlackBG,
    1.18);

  }
  if (masterTl.progress() === 1 && !masterTl.isActive() && toggled === true) {
    masterTl.reverse();
    toggleBtn(
    0);

    toggleStars(
    darkStarGroup,
    darkStarGroupSmall,
    '0',
    lightStarGroup,
    lightStarGroupSmall,
    "25",
    "0");

    falconOut();
    starBounceOut(
    0.32);

    rotateStar(
    starRed,
    starRedBG,
    1.18);


  }
});

// ANIMATE STARS WHEN PAGE LOADS
onLoad();