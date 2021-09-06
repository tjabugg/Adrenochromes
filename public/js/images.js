//Initialise ScrollMagic - this will manage all the scroll scenes
const control = new ScrollMagic.Controller();

function overlayScroll() {
    new ScrollMagic.Scene({
            duration: '150%', //How long the scroll will last (pixels)
            triggerElement: '.split', //What's going to trigger our scroll
            triggerHook: 0 //Positioned at the top of the page
        })
        .setPin('.split')
        // .addIndicators()
        .addTo(control);
}

overlayScroll();

// -----------------------------------------------------------------------------------------------

console.clear();

const canvas = document.querySelector('.chemical')
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 213;

// Empty array of Images
const images = []
const chemicals = {
    frame: 0
};

// -----------------------------------------------------------------------------------------------
// 1. This turns turns the image number from an integer into a string

// We’ ll write a function that returns the file path 
// with the number of the image file we want, 
// based off of the user’ s scroll position.

// Since the image number is an integer, 
// we’ ll need to turn it in to a string and use padStart(4, '0')
const currentFrame = index => (
    `assets/nobg/${(index + 1).toString().padStart(4, '0')}.png`
    // `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`
);

// -----------------------------------------------------------------------------------------------
// 2. For each of the 147 images, 
// creates a image element,
// sets the source to that from the link and add it to the array

// Create a for loop for each of the 147 images
for (let i = 0; i < frameCount; i++) {
    //The Image() constructor creates a new HTMLImageElement instance.
    const img = new Image();
    //Set the source of the image to the index of the for loop
    img.src = currentFrame(i);
    //Add the img to the array of image
    images.push(img);
}

// -----------------------------------------------------------------------------------------------

gsap.to(chemicals, {
    frame: frameCount - 1,
    snap: "frame",
    scrollTrigger: {
        trigger: ".spinner",
        start: "top top",
        end: "+=7000",
        scrub: 2,
        pin: true,
    },
    onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
});

images[0].onload = render;

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[chemicals.frame], 0, 0, canvas.width, canvas.height);
}

gsap.to(".slice", {
    scrollTrigger: {
        trigger: ".slicer",
        start: "top bottom",
        end: "+=6000",
        scrub: true,
        // pin: true,
        // markers: true,
    },
    x: -window.innerWidth,
    stagger: 0.01
});