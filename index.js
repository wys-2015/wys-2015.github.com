window.onload=function(){
	//选项卡
	(function(){
		var oNav=document.getElementById('nav');
		var aLi=oNav.getElementsByClassName('li');
		var oBox=document.getElementById('box');
		var aDiv=oBox.children; 

		for(var i=0; i<aLi.length; i++){
			(function(index){
				aLi[i].onclick=function(){					
					for(var i=0; i<aLi.length; i++){
						aDiv[i].className='content'+(index+1);
					}
					aDiv[index].className='active content'+(index+1);					
				};
			})(i)		
		};
	})();

	//跟随鼠标移入移出
	(function(){
		alert(1)
		var aSpan=document.querySelectorAll('.con3-left span');
		var aDiv=document.querySelectorAll('.con3-left div');

		for(var i=0; i<aDiv.length; i++){
			enter(aDiv[i]);
			leave(aDiv[i]);	
		};

		function enter(obj){
			obj.onmouseenter=function(ev){

				var oEvent=ev || event;
				var n=getN(obj,oEvent);	
				var oSpan=obj.children[0];

				switch(n){
					case 0:
						oSpan.style.left='200px';
						oSpan.style.top=0;
						break;
						
					case 1:
						oSpan.style.left=0;
						oSpan.style.top='200px';
						break;
						
					case 2:
						oSpan.style.left='-200px';
						oSpan.style.top=0;
						break;
						
					case 3:
						oSpan.style.left=0;
						oSpan.style.top='-200px';
						break;						
				}
				move(oSpan,{left:0,top:0});
				
			}	
		};

		function leave(obj){
			obj.onmouseleave=function(ev){
				var oEvent=ev || event;
				var n=getN(obj,oEvent);	
				var oSpan=obj.children[0];

				switch(n){
					case 0:
						move(oSpan,{left:200,top:0});
						break;
					
					case 1:
						move(oSpan,{left:0,top:200});	
						break;
						
					case 2:
						move(oSpan,{left:-200,top:0});
						break;
						
					case 3:
						move(oSpan,{top:-200,left:0});	
						break;	
				}
			}	
		}

		function getN(obj,ev){
			var x=obj.offsetLeft+obj.offsetWidth/2-ev.clientX;
			var y=obj.offsetTop+obj.offsetHeight/2-ev.clientY;

			return m=Math.round((d2a(Math.atan2(y,x))+180)/90)%4;
		};

		function d2a(d){
			return d*180/Math.PI;
		};
	})();


	//百度下拉
	(function(){
		var oT=document.getElementById('t1');	
		var oUl=document.getElementById('ul1');
		var oBtn=document.querySelector('.inp-btn');
		
		var iNow=-1;
		
		var oldValue='';
		
		oT.onkeyup=function(ev){
			var oEvent=ev || event;
			if(oEvent.keyCode==40 || oEvent.keyCode==38){
				return;	
			}
			
			if(oEvent.keyCode==13){
				window.open('https://www.baidu.com/s?wd='+oT.value,'_self');
				oT.value='';
			}
			
			jsonp({
				url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
				data:{
					wd:oT.value	
				},
				success:function(json){
					oUl.innerHTML='';
					
					var arr=json.s;
					
					if(arr.length){
						oUl.style.display='block';
					}else{
						oUl.style.display='none';
					}
					
					//DOM
					for(var i=0; i<arr.length; i++){
						var oLi=document.createElement('li');
						oLi.innerHTML=arr[i];
						oUl.appendChild(oLi);
						
						(function(index){
							oLi.onmouseover=function(){
								for(var i=0; i<oUl.children.length; i++){
									oUl.children[i].className='';
									
								}
								this.className='on';
								
								iNow=index;	
							};
							oLi.onmouseout=function(){
								for(var i=0; i<oUl.children.length; i++){
									oUl.children[i].className='';
									
								}	
							};
							oLi.onclick=function(){
								window.open('https://www.baidu.com/s?wd='+this.innerHTML,'_self');
								oT.value='';	
							};
						})(i);
					}
				}	
			});
			oldValue=oT.value;	
		};
		
		oT.onkeydown=function(ev){
			var aLi=oUl.children;
			
			var oEvent=ev || event;
			if(oEvent.keyCode==40){
				iNow++;
				if(iNow==aLi.length)iNow=-1;
				
				for(var i=0; i<aLi.length; i++){
					aLi[i].className='';
				}
				if(iNow==-1){
					oT.value=oldValue;
				}else{
					aLi[iNow].className='on';
					
					oT.value=aLi[iNow].innerHTML;	
				}
			}
			
			if(oEvent.keyCode==38){
				iNow--;
				if(iNow==-2)iNow=aLi.length-1;
				
				for(var i=0; i<aLi.length; i++){
					aLi[i].className='';
				}
				if(iNow==-1){
					oT.value=oldValue;
				}else{
					aLi[iNow].className='on';
					
					oT.value=aLi[iNow].innerHTML;	
				}
				return false;
			}
		};
		
		//点击搜索
		oBtn.onclick=function(){
			window.open('https://www.baidu.com/s?wd='+oT.value,'_self');
			oT.value='';	
		};
	})();

	//拖拽
	(function(){	
		var oBlock=document.getElementById('block');
		var oScroll=document.querySelector('.scroll');
		var oMid=document.querySelector('.scr-mid');
		var oLeft=document.querySelector('.con2-left');
		var top=0;
		var maxTop=0;
		var oContent=document.querySelector('.content2');
		
		oBlock.onmousedown=function (ev){
			var oEvent=ev || event;
			var disY=oEvent.clientY-oBlock.offsetTop;
			
			oScroll.onmousemove=function(ev){
				
				var oEvent=ev || event;
				top=oEvent.clientY-disY;
				setTop();

			};
			
			oScroll.onmouseup=function (){
				oScroll.onmousemove=null;
				oScroll.onmouseup=null;
			};
			return false;
		};

		//上下
		var oUp=document.querySelector('.scr-top');
		var oDown=document.querySelector('.scr-bottom');
		
		oUp.onclick=function(){
			top-=8;
			setTop();
		};
			
		oDown.onclick=function(){
			top+=8;
			setTop();
		};

		function setTop(){
			if(top<0){
				top=0;
			}else if(top>maxTop){
				top=maxTop
			};
			maxTop=oMid.offsetHeight-oBlock.offsetHeight;
			oBlock.style.top=top+'px';

			//求比例
			var oH=oLeft.offsetHeight-oScroll.offsetHeight;
			var oTop=-top/maxTop*oH;
			oLeft.style.top=oTop+'px';

			//手风琴
			var oOrg=document.querySelector('.organ');
			if(oTop<=-690){
				move(oOrg,{left:200,top:920})
			}else{
				move(oOrg,{left:-800,top:920})
			};

			//放大镜
			var oMagnifier=document.querySelector('.magnifier');
			if(oTop<=-330){
				move(oMagnifier,{left:50,top:570})
			}else{
				move(oMagnifier,{left:1500,top:570})
			};

			//碰撞运动
			var oCol=document.querySelector('.elastic');
			var oImg=document.querySelector('.elastic img');
			var oCon2=document.querySelector('.con2-content');
			var speedX=0;
			var speedY=0;
			var lastX=0;
			var lastY=0;
			var timer=null;
			oImg.onmousedown=function(ev){
				var disX=ev.clientX-oImg.offsetLeft-oCol.offsetLeft;
				var disY=ev.clientY-oImg.offsetTop;
				clearInterval(timer);
				oCon2.onmousemove=function(ev){
					var left=ev.clientX-disX-92;
					var top=ev.clientY-disY;
					if(left<0)left=0;
					if(left>oCol.offsetWidth-oImg.offsetWidth-5)left=oCol.offsetWidth-oImg.offsetWidth-5;
					if(top<0)top=0;
					if(top>oCol.offsetHeight-oImg.offsetHeight)top=oCol.offsetHeight-oImg.offsetHeight;
					oImg.style.left=left+'px';
					oImg.style.top=top+'px';

					speedX=ev.clientX-lastX;
					speedY=ev.clientY-lastY;
					lastX=ev.clientX;
					lastY=ev.clientY;
				};
				oCon2.onmouseup=function(){
					oCon2.onmousemove=null;
					oCon2.onmouseup=null;

					readyMove();
				}
				return false;
			};

			function readyMove(){
				timer=setInterval(function(){
					speedY+=1;

					var l=oImg.offsetLeft+speedX;
					var t=oImg.offsetTop+speedY;

					if(t>oCol.offsetHeight-oImg.offsetHeight){	
						speedY*=-0.7;
						speedX*=0.7;
						t=oCol.offsetHeight-oImg.offfsetHeight;
					};
					if(t<0){
						
						speedY*=-0.7;
						speedX*=0.7;
						t=0;
					};
					if(l>oCol.offsetWidth-oImg.offsetWidth){
						speedX*=-0.7;
						speedY*=0.7;
						l=oCol.offsetWidth-oImg.offsetWidth;
					}else if(l<0){
						speedX*=-0.7;
						speedY*=0.7;
						l=0;
					};

					if(Math.abs(speedX)<1)speedX=0;
					if(Math.abs(speedY)<1)speedY=0;

					oImg.style.left=l+'px';
					oImg.style.top=t+'px';

					if(speedX==0 && speedY==0 && t==oCol.clientHeight-oImg.offsetHeight)
					{
						clearInterval(timer);
					}
				},30)
			}

		};

		//手风琴效果（接上）
		(function(){
			var aLi=document.querySelectorAll('.organ ul li');
			var aSpan=document.querySelectorAll('.organ ul li span');
			var oOrg=document.querySelector('.organ');
			var oImg=oOrg.getElementsByTagName('img')[0];
			var nImgW=oImg.offsetWidth;
			var nSpanW=aSpan[0].offsetWidth;
			//alert(nImgW)
			for(var i=0; i<aLi.length; i++){
				if(i!=0){
					aLi[i].style.left=nImgW+i*nSpanW.legnth;
				}

				(function(index){
					aSpan[i].onmouseover=function(){
						for(var j=0; j<aLi.length; j++){
							if(j<=index){
								//aSpan[j].style.left=j*nSpanW+'px';
								aLi[j].style.left=j*20+'px';
							}
							else{
								aLi[j].style.left=740+(j-1)*20+'px';
							}
						}
					}
				})(i);
			}
			
		})();

		//滚轮
		addWheel(oContent,function(down){
			if(down){
				top+=10;
			}
			else{
				top-=10;
			}
			setTop();
		})

		function addWheel(obj,fn){
			if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
				obj.addEventListener('DOMMouseScroll', wheel, false)
			}else{
				obj.onmousewheel=wheel;
			}

			function wheel(ev){
				var oEvent=ev || event;
				var down=false;
				if(oEvent.wheelDelta){
					down=oEvent.wheelDelta>0? false:true; 
				}
				else{
					down=oEvent.detail>0? true:false;
				};

				fn(down);
			}
		};

		(function(){
		//日历
		var oCalendar=document.getElementById('calendar');
		var oUl=document.getElementById('ul1');
		var oP=oCalendar.getElementsByTagName('p')[0];
		
		var now=0;
		create();
		
		function create(){
			//年月
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+now);
			var year=oDate.getFullYear();
			var month=oDate.getMonth();
			oP.innerHTML=year+'年'+toDub(month+1)+'月';
			
			//开头空格
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+now);
			oDate.setDate(1);
			var week=oDate.getDay();
			(week==0)&&(week=7)
			for(var i=0; i<week-1; i++){
				var oLi=document.createElement('li');
				oUl.appendChild(oLi);
			}
			
			//创建
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+now);
			oDate.setMonth(oDate.getMonth()+1,1)
			oDate.setDate(0);
			var total=oDate.getDate();
			
			for(var i=0; i<total; i++){
				var oLi=document.createElement('li');
				oLi.innerHTML=i+1;
				
				oUl.appendChild(oLi);
			}
			//周末
			var aLi=oUl.children;
			for(var i=0; i<aLi.length; i++){
				if(i%7==5 || i%7==6){
					aLi[i].className='week';
				}
			}
			
			//今天
			var oDate=new Date();
			var today=oDate.getDate();
			for(var i=0; i<aLi.length; i++){
				if(aLi[i].innerHTML==today && oP.innerHTML==oDate.getFullYear()+'年'+toDub(oDate.getMonth()+1)+'月'){
					aLi[i].style.color='#f00';
					aLi[i].style.fontWeight='bold';
				}
			}
			
		}
		
		function toDub(n){
			return n<10? '0'+n : ''+n;
		}
		
		//上下日期查询
		var oCalPrev=document.getElementById('cal-prev');
		var oCalNext=document.getElementById('cal-next');
		
		oCalendar.onmouseover=function(){
			oCalPrev.style.display='block';	
			oCalNext.style.display='block';	
		}
		
		oCalendar.onmouseout=function(){
			oCalPrev.style.display='none';	
			oCalNext.style.display='none';	
		}
		
		oCalPrev.onclick=function(){
			oUl.innerHTML='';
			now--;
			create();	
		}
		oCalNext.onclick=function(){
			oUl.innerHTML='';
			now++;
			create();	
		}
	})();

	//放大镜
	(function(){
		var oDiv1=document.getElementById('mag1');
		var oDiv2=document.getElementById('mag2');
		var oImg=document.getElementById('mag2-img1');
		var oSpan=document.getElementById('span1');
		
		var maxLeft=0;
		var maxTop=0;
		var maxImgLeft=0;
		var maxImgTop=0;
		
		oDiv1.onmouseover=function (){
			oSpan.style.display='block';
			oDiv2.style.display='block';
			
			maxLeft=oDiv1.offsetWidth-oSpan.offsetWidth;
			maxTop=oDiv1.offsetHeight-oSpan.offsetHeight;
			maxImgLeft=oImg.offsetWidth-oDiv2.offsetWidth;
			maxImgTop=oImg.offsetHeight-oDiv2.offsetHeight;
		};
		
		oDiv1.onmouseout=function (){
			oSpan.style.display='none';
			oDiv2.style.display='none';
		};
		
		// 移动
		oDiv1.onmousemove=function (ev){
			var oEvent=ev || event;
			var left=oEvent.clientX-getPos(oDiv1).left-oSpan.offsetWidth/2;
			var top=oEvent.clientY-getPos(oDiv1).top-oSpan.offsetHeight/2;
		
			// 限制
			if (left < 0)
			{
				left=0;
			}
			else if (left > maxLeft)
			{
				left=maxLeft;
			}
			
			if (top < 0)
			{
				top=0;
			}
			else if (top > maxTop)
			{
				top=maxTop;
			}
			
			oSpan.style.left=left+'px';
			oSpan.style.top=top+'px';
			
			// 算比例
			oImg.style.left=-left/maxLeft*maxImgLeft+'px';
			oImg.style.top=-top/maxTop*maxImgTop+'px';
		};

		function getPos(obj){
			var left=0;
			var top=0;
			while(obj){
				left+=obj.offsetLeft;
				top+=obj.offsetTop;

				obj=obj.offsetParent;
			};
			return {left:left,top:top}
		}
	})();
	
	//时钟
	(function(){
		var oClock=document.querySelector('.clock');
		var oH=document.querySelector('.hour');
		var oM=document.querySelector('.min');
		var oS=document.querySelector('.sec');

		function tick(){
			var oDate=new Date();	
			var H=oDate.getHours();
			var M=oDate.getMinutes();
			var S=oDate.getSeconds();
			var mS=oDate.getMilliseconds();

			oH.style.transform='rotate('+(30*H+M/60*30)+'deg)';
			oM.style.transform='rotate('+(6*M+S/60*6)+'deg)';
			oS.style.transform='rotate('+(6*S+mS/1000*6)+'deg)';
		};
		tick();
		setInterval(tick,30);
	})();

	(function(){
		var oPic=document.querySelector('.pic');
		var oPre=document.querySelector('.pic-pre');
		var oNext=document.querySelector('.pic-next');
		var oImg=document.querySelector('.pic img');
		var timer=null;
		var bClick=false;

		//创建
		var C=7;
		var R=4;
		var aSpan=[];
		//var aPath=['pic0.jpg','pic1.jpg','pic2.jpg','pic3.jpg','pic4.jpg'];
		for(var r=0; r<R; r++){
			for(var c=0; c<C; c++){
				var oSpan=document.createElement('span');
				oSpan.style.width='100px';
				//console.log(oSpan.style.width)
				oSpan.style.height='100px';
				var left=c*100;
				var top=r*100;
				oSpan.style.left=left+'px';
				oSpan.style.top=top+'px';

				oSpan.style.backgroundPosition='-'+left+'px -'+top+'px';
				oPic.appendChild(oSpan);
				aSpan.push(oSpan);
			}
		}

		//点击
		var now=0;
		oNext.onclick=function(){
			if(bClick)return;
			bClick=true;
			//初始化
			now++;
			for(var i=0; i<aSpan.length; i++){
				aSpan[i].style.opacity=0;
				//alert(1)
				aSpan[i].style.backgroundImage='url(images/pic'+(now%5)+'.jpg)';
			};
			
			var n=0;
			timer=setInterval(function(){
				(function(index){
					move(aSpan[n],{opacity:1},{
						complete:function(){
							if(index==aSpan.length-1){
								oImg.src='images/pic'+(now%5)+'.jpg';
								bClick=false;
							}	
						}
					})
				})(n);

				n++;

				if(n==aSpan.length){
					clearInterval(timer);
				}
			},50)
		};

		oPre.onclick=function(){
			if(bClick)return;
			bClick=true;

			now--;

			if(now==-1)now=4;
			for(var i=0; i<aSpan.length; i++){
				aSpan[i].style.opacity=0;
				aSpan[i].style.backgroundImage='url(images/pic'+(now%5)+'.jpg)';
			};

			var n=0;
			timer=setInterval(function(){
				(function(index){
					move(aSpan[n],{opacity:1},{
						complete:function(){
							if(index==aSpan.length-1){
								oImg.src='images/pic'+(now%5)+'.jpg';
								bClick=false;
							}
						}
					})
				})(n)

				n++;
				if(n==aSpan.length){
					clearInterval(timer);
				}
			},50);		
		};

		//显示隐藏
		var oVis=document.querySelector('.vis');
		var oHid=document.querySelector('.hid');
		var oCal=document.querySelector('.calendar');
		var oClock=document.querySelector('.clock');
		var oP=document.querySelector('.pic-box')
		oHid.onclick=function(){
			move(oCal,{right:-300,top:50},{
				complete:function(){
					move(oClock,{right:-300,top:260},{
						complete:function(){
							move(oP,{left:250,top:50})
						}
					})
				}
			})
		}
		oVis.onclick=function(){
			move(oP,{left:50,top:50},{
				complete:function(){
					move(oClock,{right:50,top:260},{
						complete:function(){
							move(oCal,{right:50,top:50})
						}
					})
				}
			})
		}
	})();

};