const data = {
	"userId" : "22",
	"task" : "Ac not working",
	"taskType" : "Electrician",
	"fullAddress" : "Dolaigaon, Bongaigaon, Assam",
	"latitude" : "26.503900",
	"longitude" : "90.537600",
	"time" : "2020-05-09 01:00:00"
}


function logout(){
	sessionStorage.clear();
	window.location.replace("login.html");
}

// logout();
console.log(sessionStorage.getItem('userid'));
if(sessionStorage.getItem('userid')==null){
	document.getElementById("signup-btn").classList.remove("is-hidden");
	document.getElementById("login-btn").classList.remove("is-hidden");
	document.getElementById("logout-btn").classList.add("is-hidden");
	document.getElementById("navbar-title").innerHTML = "Welcome, Users";
	window.location.replace("login.html");

} else {
	document.getElementById("navbar-title").innerHTML = "Welcome, " + sessionStorage.getItem('username');
	document.getElementById("signup-btn").classList.add("is-hidden");
	document.getElementById("login-btn").classList.add("is-hidden");
	document.getElementById("logout-btn").classList.remove("is-hidden");
}
console.log((sessionStorage.getItem('userid')==null)?"not set":"set");


function setCategory(category){
	console.log(category);
	data.taskType = category;
	document.getElementById("task-container").classList.add("is-active");
	document.getElementById("modal-title").innerHTML = category;	
}

document.getElementById("close-modal").addEventListener("click",()=>{document.getElementById("task-container").classList.remove("is-active");})

// Initialize all input of type date
var calendars = bulmaCalendar.attach('[type="time"]', '[datdata-display-mode="default"]');

var todayDate = new Date().getFullYear() + "-" +( (new Date().getMonth()+1)<10?"0"+(new Date().getMonth()+1) : (new Date().getMonth()+1) )+ "-" + ( (new Date().getDate())<10?"0"+(new Date().getDate()) : (new Date().getDate()) );
// console.log(todayDate);
var time = 0;

var element = document.querySelector('#time-picker');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', function(datepicker) {
		// console.log(datepicker.data.value());

		time = datepicker.data.value() + ":00";
	});
}


function sanitize(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

//submits the data to add_user_help_request
document.getElementById("modal-submit").addEventListener("click",()=>{
	if(time==0)
		time = ( (new Date().getHours())<10?"0"+(new Date().getHours()) : (new Date().getHours()) ) + ":" + ( (new Date().getMinutes())<10?"0"+(new Date().getMinutes()) : (new Date().getMinutes()) ) + ":" + ( (new Date().getSeconds())<10?"0"+(new Date().getSeconds()) : (new Date().getSeconds()) );
	console.log(todayDate + " " +time);
	data.time = todayDate + " " +time;
	
	// add description	
	data.task = sanitize(document.getElementById("description").value);

	data.userId = sessionStorage.getItem('userid');
	data.fullAddress = sessionStorage.getItem('address');
	
	sendData();

	console.log(JSON.stringify(data));
});


function sendData(){

	//remove the loading gif in submit button
	document.getElementById("modal-submit").classList.add("is-loading");


	var request = new XMLHttpRequest();
	var endPoint = "http://localhost:8080/getHelp/helpSystem/api/add_user_help_request.php";
	
	// Open a new connection, using the GET request on the URL endpoint
	request.open('POST', endPoint, true);

	request.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	// document.getElementById("demo").innerHTML = this.statusText;
	      	var data = JSON.parse(this.response)
	      	console.log(data)
	      	console.log(this.statusText)

		    //remove the loading gif in submit button
	      	document.getElementById("modal-submit").classList.remove("is-loading");
	      	
	      	//Close modal
	      	document.getElementById("task-container").classList.remove("is-active");
		    
		    // reload the page
		    // location.reload();
	    }
  	};
	request.setRequestHeader("Content-type", "application/json");
		request.onload = function() {
	  	var data = JSON.parse(this.response)
	}


	// Send request
	request.send(JSON.stringify(data));
}

// console.log(new Date(1589043070753));
// 1589043070753
// 1382086394000