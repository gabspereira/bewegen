var math = require('mathjs')

//Create DH Table:
//DH definitions says:
// --- Joint: axis is local "z"
// --- Links: Translation along "x"
// 						Rotation around "x"
//
//Every user should modify these values below accordingly with
//the robot arm dimensions and limits:
//
// rotation on "z" axis
// translation on "z" axis
// translation on "x" axis
// rotation on "x" axis



	var dh = math.matrix([[0.707, 0, 0.5, 0], [.707, 0, 0.3, 0]]);


	//define c1, s1, c2, s2
	var c1 = math.cos(math.subset(dh, math.index([0],[0])));
	var s1 = math.sin(math.subset(dh, math.index([0],[0])));
	var c2 = math.cos(math.subset(dh, math.index([1],[0])));
	var s2 = math.sin(math.subset(dh, math.index([1],[0])));

	var a = math.matrix([[c1, -s1, 0], [s1, c1, 0], [0, 0, 1]]);
	var b = math.matrix([[1, 0, 0.5], [0, 1, 0], [0, 0, 0]]);
	var c = math.matrix([[c2, -s2, 0], [s2, c2, 0], [0, 0 , 1]]);
	var d = math.matrix([[1, 0, 0.3], [0, 1, 0], [0, 0, 1]]);

	var foo1 = math.multiply(a, b);
	var foo2 = math.multiply(c, d);
	var x = math.multiply(foo1, foo2);
	var P = math.subset(x, math.index([0, 1, 2], [2]));




//debug
//console.log("This is your DH Table: " + dh);
//console.log("This is the value teta2:  " + math.subset(dh, math.index([1],[0])));
//console.log("Matrix x: " + x);

	console.log("This is End Effector Position (P): " + P.format(3));

var tf = function tf (x, y, z) {
	
	  if (typeof y === 'undefined' && typeof z === 'undefined') {
			    this.x = typeof x.x !== 'undefined' ? x.x : x[0];
			    this.y = typeof x.y !== 'undefined' ? x.y : x[1];
			    this.z = typeof x.z !== 'undefined' ? x.z : x[2];
			  } else {
					    this.x = x;
					    this.y = y;
					    this.z = z;
					  }

	  this.v = typeof this.z !== 'undefined' ? [this.x, this.y, this.z] : [this.x, this.y];

};

exports = module.exports = tf;
