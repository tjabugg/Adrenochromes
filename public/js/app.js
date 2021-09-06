//Initialise ScrollMagic - this will manage all the scroll scenes
const controller = new ScrollMagic.Controller();
//Timeline
const tween = new TimelineLite();

gsap.registerPlugin(ScrollTrigger);

// -----------------------------------------------------------------------------------------------

console.clear();

const distortCanvas = document.querySelector('.distort')
const distortContext = distortCanvas.getContext("2d");

distortCanvas.width = window.innerWidth;
distortCanvas.height = window.innerHeight;

const frameNumber = 239;

// Empty array of Images
const distortImages = []
const pixels = {
    frame: 0
};

// -----------------------------------------------------------------------------------------------

const selectedFrame = index => (
    `assets/distort/${(index + 1).toString().padStart(4, '0')}.jpg`
    // `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
);

for (let i = 0; i < frameNumber; i++) {
    const newImage = new Image();
    newImage.src = selectedFrame(i);
    distortImages.push(newImage);
}

gsap.to(pixels, {
    frame: frameNumber - 1,
    snap: "frame",
    scrollTrigger: {
        trigger: ".distorter",
        start: "top top",
        end: "+=3000",
        scrub: 2,
        pin: true,
    },
    onUpdate: draw // use animation onUpdate instead of scrollTrigger's onUpdate
});

distortImages[0].onload = draw;

function draw() {
    distortContext.clearRect(0, 0, distortCanvas.width, distortCanvas.height);
    distortContext.drawImage(distortImages[pixels.frame], 0, 0, distortCanvas.width, distortCanvas.height);
}

// -----------------------------------------------------------------------------------------------

gsap.to(".chrome", {
    scrollTrigger: {
        trigger: ".animation",
        start: "top top",
        end: "bottom",
        scrub: 1,
        pin: true,
        // markers: true,
    },
    x: -window.innerWidth * 9,
    ease: "power1. inOut",
    duration: 3
});

// -----------------------------------------------------------------------------------------------

//Initialize hoverEffect library
new hoverEffect({
    //Where the images are injected
    parent: document.querySelector('.sticky-image'),
    intensity: 0.4,
    image1: 'assets/images/Page_03.png',
    image2: 'assets/images/Page_05.png',
    speedIn: 7,
    speedOut: 7,
    displacementImage: 'assets/images/Displacement.png'
});

// -----------------------------------------------------------------------------------------------

function splitScroll() {
    new ScrollMagic.Scene({
            duration: '358%', //How long the scroll will last (pixels)
            triggerElement: '.sticky-image', //What's going to trigger our scroll
            triggerHook: 0 //Positioned at the top of the page
        })
        .setPin('.sticky-image')
        // .addIndicators()
        .addTo(controller);
}

splitScroll();