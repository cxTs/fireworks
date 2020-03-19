//let firework = new Particle(getRandom(width), height + 10);
let gravity = new Vector(0, 0.2);

// let h = new Heart(20, 100);
let fireworks = [];
let nbFirework = 10;
for(let i = 0; i < nbFirework; i++) {
    fireworks.push(new Firework(gravity));
}

// utils
// function clearDebug() {
//     // for the purpose of this project, clear() doesn't really clear the scene but repaint it
//     // with a slightly transparent black color to give the symbols a blury effect when they move
//     ctx.save();
//     ctx.fillStyle = "#00000086";
//     ctx.fillRect(0, 0, width, height);
//     ctx.restore();
// }

// var center = new Vector(200, 200);


// h.moveTo(center);
//
// h.show(ctx, center, 2);
// console.log(h);
function draw() {
    clear(0, 0, .25);

    // a new firework on each frame
    if( getRandom(100) <= 5 && fireworks.length < 10)
        fireworks.push(new Firework(gravity));





    // anti-flickering loop direction (because of splice at the end)
    for(let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].show(ctx);

        // getting rid off fireworks that are out of sight
        if(fireworks[i].out) {
            fireworks.splice(i,1);
        }
    }
    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
