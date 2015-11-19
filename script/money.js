function Money(option){
	Money.prototype.arr2=[];
	return new Money.prototype.init(option);
}

Money.prototype.init=function(option){
	this.opt=option;
	this.canvas=document.getElementById(this.opt.id);
	this.ctx=this.canvas.getContext("2d");
	this.imgY=0;
	var _this=this;
	draws(_this)
}

function pos(a){
	var wid=window.innerWidth;
	var m=Math.floor(wid/a);
	return Math.floor(Math.random()*m+1)*a
}

function draws(_this){
	var image=new Image();
	var m=(Math.ceil(Math.random()*10+1))%2;
	var uri = m==0 ? _this.opt.img2 : _this.opt.img1;
	image.src=uri;
	var cxt=_this.ctx;
	var startX=window.innerWidth;
	var startY=window.innerHeight;
	image.onload=function(){
		var z=0-image.height/2;
		var imgW=image.width;
		var aside=pos(imgW);
		if(aside>startX-image.width) aside=startX-image.width;
		animation(aside,z,cxt,image)
	}
	return setTimeout(function(){draws(_this)},1000);
}

function animation(a,b,cxt,image){
	b=b+1
	var y=12*b;
	var h=Basket.prototype.arr1.cy;
	if(y<h-image.height){
		cxt.clearRect(a,y-12,image.width,image.height);
		cxt.drawImage(image,a,y,image.width,image.height);
		window.requestAnimationFrame(function(){animation(a,b,cxt,image)});
	}else{
		cxt.clearRect(a,y-12,image.width,image.height);
	}

	Money.prototype.arr2.push(a);
}