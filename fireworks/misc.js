function getRandom(min, max) {
    if(max == null) {
		max = min;
		min = 0;
	}
        min = Math.ceil(min);
        max = max | 0; // binary OR operator is faster than Math.floor() function
        return ((Math.random() * (max - min + 1)) | 0) + min;
}

function getRandomFloat(min, max) {
    if(max == null) {
		max = min;
		min = 0;
	}
        return (Math.random() * (max - min)) + min;
}

function getRandomColor(min, max, alpha) {
    min = (min == null) ? 0 : min;
    max = (max == null) ? 255 : max;
    let r = getRandom(min, max);
    let g = getRandom(min, max);
    let b = getRandom(min, max);
    if(alpha != null && alpha >= 0 && alpha <= 1) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    }
    console.log(r,g,b);
    return "rgba(" + r + ", " + g + ", " + b + ", 1)";
}
