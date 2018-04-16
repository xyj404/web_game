var time = 0;
//保存定时时间
var pause = true;
//设置是否暂停的标志
var set_timer;
//设置定时函数
var d = new Array(10);
var d_direct = new Array(
	[0], //第一个元素不用，从下标１开始使用
	[2,4], //大DIV编号为１的DIV可以去的位置
	[1,3,5],
	[2,6],
	[1,5,7],
	[2,4,6,8],
	[3,5,9],
	[4,8],
	[5,7,9],
	[6,8]
	);
//保存大DIV编号的可移动位置
var d_posXY = new Array(
	[0],//不使用第一个元素
	[0,0], //第一个表示left,第二个表示top,如这个第一块的位置为left:0px; top:0px;
	[150,0],
	[300,0],
	[0,150],
	[150,150],
	[300,150],
	[0,300],
	[150,300],
	[300,300]
	);
//大DIV编号的位置
d[1] = 1;
d[2] = 2;
d[3] = 3;
d[4] = 4;
d[5] = 5;
d[6] = 6;
d[7] = 7;
d[8] = 8;
d[9] = 0;
//默认按照顺序排好，大DIV第九块没有，所以为0, 我们用0来表示空白块

function move(id){
	//移动函数
	var i = 1;
	for (i = 1; i < 10; ++i){
		if (d[i] == id)
			break;
	}
	//这个for循环是为了找出小DIV在大DIV中的位置
	var target_d = 0;
	//保存小DIV可以去的编号， 0表示不能移动
	target_d = whereCanTo(i);
	//用来找出小DIV可以去的位置，如果返回0, 表示不能移动，如果可以移动，则返回可以取的位置编号
	if(target_d != 0){
		d[i] = 0;
		//把当前的大DIV标号设置为0,因为当前小DIV已经移走了
		d[target_d] = id;
		//把目标大DIV设置为被点击的小DIV编号
		document.getElementById("d"+id).style.left = d_posXY[target_d][0]+"px";
		document.getElementById("d"+id).style.top = d_posXY[target_d][1]+"px";
		//把被点击的小DIV移到目标大DIV的位置
	}

	var finish_flag = true;
	//设置游戏是否完成标志，true表示完成
	for(var k = 1; k < 9; ++k){
		if(d[k] != k){
			finish_flag = false;
			break;
				//如果大DIV保存的编号和它本身的编号不同，则表示不是全部按照顺序排的，设为false，跳出循环
		}
	}

	if (finish_flag == true){
		if(!pause){
			start();
		}
		alert("congratulation");
	}
	//如果完成则弹出提示框
}

function whereCanTo(cur_div){
	//判断是否可移动函数，参数是大DIV的编号，不是小DIV的编号，因为小DIV编号跟可以去哪没关系，小DIV是会动的
	var j = 0;
	var move_flag = false;
	for (j = 0; j < d_direct[cur_div].length; ++j){
		//把所有可能去的位置循环遍历一下
		if (d[ d_direct[cur_div][j] ] == 0){
			move_flag = true;
			break;
		}
		//如果目标的值为0，说明目标位置没有装小DIV，则可以移动，跳出循环
	}
	if (move_flag == true){
		return d_direct[cur_div][j];
	}
	else{
		return 0;
	}
	//可以移动，则返回目标位置的编号，否则返回0，表示不可移动
}

function timer(){
	//定时函数，每一秒执行一次
	time += 1;
	var min = parseInt(time/60); //分钟
	var sec = time%60;　//秒钟
	document.getElementById("timer").innerHTML = min+"分"+sec+"秒";
}

function start(){
	//开始暂停函数
	if (pause){
		document.getElementById("start").innerHTML = "暂停";
		pause = false;
		set_timer = setInterval(timer, 1000);//启动定时
	}
	else{
		document.getElementById("start").innerHTML = "开始";
		pause = true;
		clearInterval(set_timer);
	}
}

function reset(){
	//重置函数
	time = 0;
	random_d(); //把方块随机打乱函数
	if(pause) //如果暂停，则开始计时
		start();
}

function random_d(){
	//随机打乱方块函数，思路是从第九块开始，随机生成一个数，然后他们两块对调一下
	for (var i = 9; i > 1; --i){
		var to = parseInt(Math.random()*(i-1)+1);
	//产生随机数，范围从１到i，不能超出范围，因为没这个id的DIV
	if (d[i]!=0){
		document.getElementById("d"+d[i]).style.left = d_posXY[to][0]+"px";
		document.getElementById("d"+d[i]).style.top = d_posXY[to][1]+"px";
	}
	//把当前的DIV位置设置为随机产生的DIV的位置
	if(d[to]!=0){
		document.getElementById("d"+d[to]).style.left = d_posXY[i][0]+"px";
		document.getElementById("d"+d[to]).style.top = d_posXY[i][1]+"px";
	}
	//把随机产生的DIV的位置设置为当前的DIV的位置
	var temp = d[to];
	d[to] = d[i];
	d[i] = temp;
}
}

window.onload = function(){
	//初始化函数
	reset();
}