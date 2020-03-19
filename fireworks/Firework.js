function Firework(gravity) {
    // state
    this.out = false;
    this.exploded = false;
    this.gravity = gravity;
    this.lifeSpan = 1;
    this.particles = [];
    this.nbParticles = 100;

    // color
    this.r = getRandom(0xFF);
    this.g = getRandom(0xFF);
    this.b = getRandom(0xFF);
    this.color = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.lifeSpan + ")";

    // firework first step
    this.rocket = new Particle(getRandom(width), height + getRandom(100), this.gravity);


}

Firework.prototype.update = function() {
    if(!this.exploded) {
        this.rocket.update();
        // first step end here
        if(this.rocket.vel.y >= 0) this.exploded = true;
        if(this.particles.length < 100 && this.exploded) this.explode();
    } else {
        for(let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].show(ctx);
            if(this.particles[i].pos.y > height + 10) {
                this.particles.splice(i, 1);
            }
        }
    }

    if(this.exploded && this.particles.length == 0) this.out = true;

}

Firework.prototype.explode = function() {
    for(let i = 0; i < this.nbParticles; i++) {
        let p = new Particle(this.rocket.pos.x, this.rocket.pos.y, this.gravity);
        p.size = 2;
        p.vel.x = getRandom(-6, 6);
        p.vel.y = getRandom(-8, 8);
        //let r = new Vector(Math.random(), Math.random());
        let r = Vector.getRandomVector(p.pos.x, p.pos.y);
        p.applyForce(r);
        this.particles.push(p);
    }
}

Firework.prototype.show = function(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    if(!this.exploded) {
        this.rocket.show(ctx, this.rocket.size);
    }else {
        for(let i = 0; i < this.particles.length; i++) {
            this.particles[i].show(ctx, this.particles[i].size);
            this.particles[i].size *= 1.015;
        }
        this.updateColor();
    }
    ctx.restore();
}


Firework.prototype.updateColor = function() {
    this.lifeSpan -= .03;
    this.color = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.lifeSpan + ")";
}
