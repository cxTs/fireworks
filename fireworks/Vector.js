class Vector {
    x;
    y;
    z;

    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static add(vector1, vector2) {
        let x = vector1.x + vector2.x;
        let y = vector1.y + vector2.y;
        return new Vector(x, y);
    }

    static sub(vector1, vector2) {
        let x = vector1.x - vector2.x;
        let y = vector1.y - vector2.y;
        return new Vector(x, y);
    }
// return a normalized vector created with a vector "(0,0)" and an angle from the first radius of a trigo circle
    static fromAngle(angle) {
        let x = Math.cos(angle);
        let y = Math.sin(angle);
        return new Vector(x, y);
    }

// return a random normalized vector with max values as "seeds"
    static getRandomVector(maxX, maxY, maxZ) {
        let _maxX = (maxX != null) ? maxX : 1;
        let _maxY = (maxY != null) ? maxY : 1;
        let _maxZ = (maxZ != null) ? maxZ : 1;

        let x = Math.random() * _maxX;
        let y = Math.random() * _maxY;
        let z = Math.random() * _maxY;

        let v = new Vector(x, y, z);
        v.norm();
        return v;
    }

}

// PROTO //

// give the distance between 2 vectors
Vector.prototype.distanceFrom = function(vector) {
    return Math.sqrt( Math.pow((vector.x-this.x), 2) + Math.pow((vector.y-this.y), 2) );
}

// give the magnitude of the vector
Vector.prototype.mag = function() {
    let xSq = this.x * this.x;
    let ySq = this.y * this.y;
    let zSq = this.z * this.z;
    return Math.sqrt( xSq + ySq + zSq );
}

// limit the magnitude to the max parameter
Vector.prototype.limit = function(max) {
    if(this.mag() > max) {
        this.normalize();
        this.mult(max);
    }
}

// move vector compared to the x and y passed in args
Vector.prototype.move = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = (z != null) ? z : 0;
}

// rotate the vector around another by a given angle and maintain the distance between the 2 vectors
Vector.prototype.rotateAround = function(centerVector, angle) {
    let dist = this.distanceFrom(centerVector);
    this.x = (Math.cos(angle) * dist) + centerVector.x;
    this.y = (Math.sin(angle) * dist) + centerVector.y;
}


Vector.prototype.add = function(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
}

Vector.prototype.sub = function(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
}

// multiply a vector by a vector and give a new Vector object
// it's not a scalar product ! it's the vectorial product
// the result is a perpendicular vector to the 2 vectors that are multiplied
// this perpendicular vector is oriented follow the right hand rule.
Vector.prototype.cross = function(vector) {
    let t = this.mag() * vector.mag() * Math.sin(this.angleFrom(vector));
    return new Vector(0, 0, t);
}

// multiply a vector by a scalar ( to scale the vector)
Vector.prototype.mult = function(factor) {
    this.x *= factor;
    this.y *= factor;
    this.z *= factor;
}

// divide a vector by a scalar ( to scale the vector)
Vector.prototype.div = function(factor) {
    if(factor !== 0) this.mult(1 / factor);
}


// give the scalar product of a vector by a vector
// another method is A.B = ||A|| * ||B|| * cos(angleOfThe2Vectors)
Vector.prototype.dot = function(vector) {
    let x = this.x * vector.x;
    let y = this.y * vector.y;
    let z = this.z * vector.z;
    return x + y + z;
}

// give the angle between two vectors
// to get an angle in degrees, divide it by PI and multiply the result by 180.
Vector.prototype.angleFrom = function(vector) {
    let cosAngle = this.dot(vector) / (this.mag() * vector.mag());
    return Math.acos(cosAngle);
}

// normalize the vector (give the corresponding unit vector)
Vector.prototype.normalize = function() {
    let mag = this.mag();
    if(mag !== 0) this.div(mag);
}

// alias of normalize function
Vector.prototype.norm = function() {
    this.normalize();
}

// draw the vector on canvas as a circle
Vector.prototype.display = function(ctx, size, fill = true, stroke = false) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
    if(fill) {
        ctx.fill();
    }
    if(stroke) {
        ctx.stroke();
    }
    ctx.closePath();
}

// draw the vector on canvas as a 1x1 dot
Vector.prototype.vertex = function(ctx) {
    ctx.rect(this.x, this.y, 1, 1);
    ctx.fill();
}

// draw the arrow representation of the vector
Vector.prototype.arrow = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.x, this.y + this.y);
    ctx.closePath();
    ctx.stroke();
}

Vector.prototype.arrowFrom = function(ctx, origin) {
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(this.x + origin.x, this.y +origin.y);
    ctx.closePath();
    ctx.stroke();
}
