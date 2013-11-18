// JavaScript Document
onload=init;
var drop_array = new Array();
//vars to name the timers that make drops spawn and move every so often
var spawntimer;
var movetimer;
//create a bucket obj, instance of the bucket class below not on stage yet
var user_bucket= new Bucket(25,200);
function init(){
	//put that bucket on stage
	user_bucket.create();
	//when a key is pressed, do a function that responds depending on which key
	document.onkeydown = function(e){ checkKey(e);};
	//set an interval to do the spawn function every 2 seconds
	spawntimer = setInterval(spawn,2000);
	//set an interval to move the drops 20 times a second
	movetimer = setInterval(movealldrops,1000/20);
}

function checkKey(e){
	//set up the event again for certain browsers
	e = e || window.event;
	//right arrow key
	if(e.keyCode == '39'){
		//add to buckets x will move it a little to right
	user_bucket.x+=15;
		user_bucket.item_on_page.style.left = user_bucket.x + "px";
	}
	
	if(e.keyCode == '37'){
		//add to buckets x will move it a little to right
	user_bucket.x-=15;
		user_bucket.item_on_page.style.left = user_bucket.x + "px";
	}
}//close checkKey

function spawn() {
	//make an object based on the Drop Class:
	var anotherdrop = new Drop();
	anotherdrop.create();3
	
	drop_array.push(anotherdrop);
}

function movealldrops(){
//for each drop in the array
for (var i=0; i<drop_array.length; i++){
	var currentdrop = drop_array[i];
	//add to up-down position of drop (higher=lower on page)
	currentdrop.y +=5;
	//apply it to css of the drop on the page
	currentdrop.item_on_page.style.top = currentdrop.y + "px";
	
	//if a drop is low enough, destroy it
	if (currentdrop.y > 300){
		currentdrop.destroy();
	}//closes if loop
}//closes for loop
	
}
//let's make a Class (blueprint) for each Drop we generate
function Drop(){
	this.x; //starts empty, will keep track of each Drop's left-right position
	this.y; //starts empty, will keep track of each Drop's up-down position
	this.width=50;
	this.height=50;
	this.item_on_page;
	/** function does lots of things when a Drop gets created on the page
	*
	*/
	this.create = function(){
		//make a section element in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("section");
		//store a random x and y position, different for each Drop. I'm using screen width or 500, height of 300:
		this.x = Math.floor(Math.random()*500);
		this.y = -25//Math.floor(Math.random()*300);
		//use those x and y coordinates in the CSS to position the Drops:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.getElementsByTagName("body")[0].appendChild(this.item_on_page);
	}
	/** function does lots of things when a Drop is removed from the page
	*
	*/
	this.destroy = function(){
		//create an animated splash gif
		var newsplash= document.createElement("img");
		newsplash.src = "img/splash.gif?" + Math.random();
		//set its style: absolute, x&Y
		newsplash.style.position = "absolute";
		newsplash.style.left = this.x + "px";
		newsplash.style.top = this.y + "px";
		//attacj splash onto page
		  document.getElementsByTagName("body")[0].appendChild(newsplash);
			document.getElementsByTagName("body")[0].removeChild(this.item_on_page);
	//figure out that coins position in the array
	var this_drops_index_number = drop_array.indexOf(this);
	//splice it out of the array
	drop_array.splice(this_drops_index_number,1);
		
	}
} //close the drop Class

//let's make a Class (blueprint) for each Drop we generate
function Bucket(x,y){
	this.x=x; //starts empty, will keep track of each Drop's left-right position
	this.y=y; //starts empty, will keep track of each Drop's up-down position
	this.width=100;
	this.height=70;
	this.item_on_page;
	/** function does lots of things when a bucket gets created on the page
	*
	*/
	this.create = function(){
		//make a div element in the HTML, store it into the item-on-page we set up above.
		this.item_on_page = document.createElement("div");
		//use those x and y coordinates in the CSS to position the bucket:
		this.item_on_page.style.left = this.x + "px";
		this.item_on_page.style.top = this.y + "px";
		//attach the item to our HTML hierarchy, as a child of the body:
		document.getElementsByTagName("body")[0].appendChild(this.item_on_page);
	}
	/** function does lots of things when a bucket is removed from the page
	*
	*/
	this.destroy = function(){
	}
} //close the Class