import { gfxLoad } from "./gfxLoad.js";

// Config object with defined data structure and image URLs.
// Only strings and arrays of strings are allowed.
//
const gfxSource = {
    chrome: "https://thesigns.icu/gfxLoad/icon-chrome.png",
    firefox: "https://thesigns.icu/gfxLoad/icon-firefox.png",
    safari: "https://thesigns.icu/gfxLoad/icon-safari.png",
    edge: "https://thesigns.icu/gfxLoad/icon-edge.png",
    opera: "https://thesigns.icu/gfxLoad/icon-opera.png",
    mario: [
        "https://thesigns.icu/gfxLoad/mario-run-0.png",
        "https://thesigns.icu/gfxLoad/mario-run-1.png",
        "https://thesigns.icu/gfxLoad/mario-run-2.png",
    ],
}

// Load the images and draw them
//
gfxLoad(gfxSource).then(gfx => {
    
    const canvas = document.body.querySelector("canvas");
    const ctx = canvas.getContext("2d");
  
    let marioFrame = 0;
    let marioX = 100;

    setInterval(() => {

        ctx.clearRect(0, 0, 800, 400);

        ctx.drawImage(gfx.chrome, 10, 30);
        ctx.drawImage(gfx.firefox, 320, 200, 140, 140);
        ctx.drawImage(gfx.edge, 670, 220, 110, 110);

        ctx.drawImage(gfx.mario[marioFrame], marioX, 120);
        marioFrame > 1 ? marioFrame = 0 : ++marioFrame;
        marioX > 850 ? marioX = -50 : marioX += 15;

        ctx.drawImage(gfx.safari, 300, 50, 133, 133);
        ctx.drawImage(gfx.opera, 450, 60, 250, 250);

    }, 50);
    
}).catch(err => {
    console.log(err);
});





