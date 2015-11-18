var arr1=[];
function Basket(option){
   return new Basket.prototype.init(option)
}
Basket.prototype.init=function(option){
	this.opt=option;
	this.canvas=document.getElementById(this.opt.id);
	this.ctx=this.canvas.getContext("2d");
	this.a={cx:0,cy:0,imgX:0};
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
			cxt.drawImage(image,_this.a.cx,_this.a.cy);
		}
	},
	ev:function(){
		var _this=this;
		document.addEventListener("touchstart",function(e){
			starts(_this,e);e.preventDefault();},false);
		document.addEventListener("touchmove",function(e){
			moves(_this,e);e.preventDefault();},false);
		document.addEventListener("touchup",function(e){
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
};
function ups(){

};

function drawCar(_this,a){
	var cxt=_this.ctx;
	var scrX=window.innerWidth;
	var scrY=window.innerHeight;
	cxt.clearRect(0,0,scrX,scrY);
	var image=new Image();
	image.src=_this.opt.uri;
	image.onload=function(){
		cxt.drawImage(image,a,_this.c.cy);
	}
	return{
		nowLeft:a,
		nowTop:_this.c.cy
	}
}