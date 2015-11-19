
function Basket(option){
   Basket.prototype.arr1={cx:0,cy:0};
   return new Basket.prototype.init(option)
}
Basket.prototype.init=function(option){
	this.opt=option;
	this.canvas=document.getElementById(this.opt.id);
	this.ctx=this.canvas.getContext("2d");
	this.a={cx:0,cy:0,imgX:0,imgY:0};
	this.c={cx:0,cy:0};
	this.b={cx:0,cy:0};
	this.flag=true;
	this.draws();
	this.ev();
}
Basket.prototype.init.prototype={
	draws:function(){
		var image=new Image();
		image.src=this.opt.uri;
		var cxt=this.ctx;
		var _this=this;
		var startX=window.innerWidth;
		var startY=window.innerHeight;
		image.onload=function(){
			_this.a.cx=(startX-image.width)/2;
			_this.a.cy=startY-image.height;
			_this.a.imgX=image.width;
			_this.a.imgY=image.height;
			Basket.prototype.arr1.cy=_this.a.cy;
			cxt.drawImage(image,_this.a.cx,_this.a.cy);
		}
	},
	ev:function(){
		var _this=this;
		document.addEventListener("touchstart",function(e){
			starts(_this,e);e.preventDefault();},false);
		document.addEventListener("touchmove",function(e){
			moves(_this,e);e.preventDefault();},false);
		document.addEventListener("touchend",function(e){
			ups(_this,e);e.preventDefault();},false);
	}
}

function starts(_this,e){
	_this.flag=true;
	var evt=e.touches[0];
	_this.c.cx=evt.pageX;
	_this.c.cy=evt.pageY;
	if(_this.c.cy<_this.a.cy || _this.c.cx<_this.a.cx || _this.c.cx>_this.a.cx+_this.a.imgX){_this.flag=false;return false;}
	if(_this.c.cy>=_this.a.cy){_this.c.cy=_this.a.cy}
	e.stopPropagation();	
};
function moves(_this,e){
	var evt=e.touches[0];
	_this.c.cx=evt.pageX;
	var maxWidth=window.innerWidth-_this.a.imgX;
	if(_this.c.cx<0) _this.c.cx=0;
	if(_this.c.cx>maxWidth) _this.c.cx=maxWidth
	if(_this.flag){
		drawCar(_this,_this.c.cx)
	}
	e.stopPropagation();
};
function ups(_this,e){
	_this.a.cx=_this.b.cx;
	Basket.prototype.arr1.cx=_this.b.cx;
	Basket.prototype.arr1.cy=_this.c.cy;

};

function drawCar(_this,a){
	var cxt=_this.ctx;
	var scrX=window.innerWidth;
	cxt.clearRect(0,_this.c.cy,scrX,_this.a.imgY);
	var image=new Image();
	image.src=_this.opt.uri;
	image.onload=function(){
		cxt.drawImage(image,a,_this.c.cy);
	}
	_this.b.cx=a
}