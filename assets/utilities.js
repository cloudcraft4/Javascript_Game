Game.extend = function(src, dest) {
    // Create a copy of the source.

    var result = {};
    for (var key in src) {
        result[key] = src[key];
    }
    // Copy over all keys from dest
    for (var key in dest) {
        result[key] = dest[key];
    }
    return result;
};

//Taking this from old ROT.  Will it work?  Not sure
//Also probably bad form to actually modify function itself
//but whatever.  I don't care that much.
Function.prototype.extend = Function.prototype.extend || function(parent) {
	this.prototype = Object.create(parent.prototype);
	this.prototype.constructor = this;
	return this;
}

Array.prototype.random = Array.prototype.random || function() {
	if (!this.length) { return null; }
	return this[Math.floor(ROT.RNG.getUniform() * this.length)];
}

Array.prototype.randomize = Array.prototype.randomize || function() {
	var result = [];
	while (this.length) {
		var index = this.indexOf(this.random());
		result.push(this.splice(index, 1)[0]);
	}
	return result;
}