class Vector {

	constructor(x, y) {
    	this.x = x;
    	this.y = y;
    	this.angle = Math.atan(this.y / this.x);
  	}
 
  	static sum(v1, v2) {	  
		var vs = new Vector(0, 0);
	  
	  	vs.x = v1.x + v2.x;
	  	vs.y = v1.y + v2.y;
	  
	  	return vs;
  	}  

  	static abs(v) {
		return Math.pow(Math.pow(v.x, 2) + Math.pow(v.y, 2), 0.5);
  	}

	static angle(v) {
		return 180 / Math.PI * Math.atan(v.y / v.x);	
	}
	
	increaseAngle(deltaAngle) {
		this.angle = this.angle + deltaAngle;
	}
	
	decreaseAngle(deltaAngle) {
		this.angle = this.angle - deltaAngle;
	}
	
	moveForward(velocity) {
		this.x = this.x - velocity * Math.cos(this.angle);
		this.y = this.y + velocity * Math.sin(this.angle); 
	}

	moveBackward(velocity) {
		this.x = this.x - (-velocity) * Math.cos(this.angle);
		this.y = this.y + (-velocity) * Math.sin(this.angle); 
	}

}