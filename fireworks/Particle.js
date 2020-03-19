function Particle(x, y, g) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, getRandom(-18, -8));
    this.acc = new Vector(0, 0);
    this.gravity = (g != null) ? g : new Vector(0, 0);
    this.size = 2;

}


Particle.prototype.applyForce = function(force) {
    this.acc.add(force);
}

Particle.prototype.update = function() {
    this.applyForce(this.gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
}

Particle.prototype.show = function(ctx, size) {
    this.pos.display(ctx, size);
}
