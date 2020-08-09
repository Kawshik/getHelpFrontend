// Navbar button controller
if(sessionStorage.userid==null){
	document.getElementById("signup-btn").classList.remove("is-hidden");
	document.getElementById("login-btn").classList.remove("is-hidden");
	document.getElementById("logout-btn").classList.add("is-hidden");
	document.getElementById("navbar-title").innerHTML = "Welcome, Users";
	window.location.replace("login.html");

} else {
	document.getElementById("navbar-title").innerHTML = "Welcome, " + sessionStorage.username;
	document.getElementById("signup-btn").classList.add("is-hidden");
	document.getElementById("login-btn").classList.add("is-hidden");
	document.getElementById("logout-btn").classList.remove("is-hidden");
}

function logout(){
	sessionStorage.clear();
	window.location.replace("login.html");
}


var taskContainer = document.getElementById("active-task-container");
function setTaskTemplate($category,$description,$helperId,$requestTime,$startTime,$status){

	var z = document.createElement('article');
	z.classList.add("message");
	
	if($status=="cancelled"){
		z.classList.add("is-danger");
	} else {
		z.classList.add("is-success");
	}

	var task = `
		<div class="message-body">
			<h5 class="title is-5">Category: <span class="title is-5">${$category}</span></h5>
			<h5 class="title is-6">Description: <span class="title is-6 is-small"><em>${$description}</em></span></h5>
			<h5 class="title is-6">Helper Id: <span class="title is-6 is-small"><em>${$helperId}</em></span></h5>
			<h5 class="title is-6">Task Request Time: <span class="title is-6 is-small"><em>${$requestTime}</em></span></h5>
			<h5 class="title is-6">Task Start Time: <span class="title is-6 is-small"><em>${$startTime}</em></span></h5>
			<h5 class="title is-6">Task Status: <span class="title is-6 is-small"><em>${$status}</em></span></h5>
		</div>
	`;

	z.innerHTML = task;
	// document.body.appendChild(z);
	taskContainer.appendChild(z);
}


const data = {
	"userId":""
}

function fetchData(){
	
	var request = new XMLHttpRequest();
	var endPoint = "http://localhost:8080/getHelp/helpSystem/api/get_user_history.php";
	
	// Open a new connection, using the GET request on the URL endpoint
	request.open('POST', endPoint, true);

	request.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	// document.getElementById("demo").innerHTML = this.statusText;
	    	// console.log(this.response);
	      	var data = JSON.parse(this.response);
	      	// console.log(data);
	      	// console.log(this.statusText);
	      	// console.log(typeof data);
	      	// console.log(data.length==null?"0":"1")

	      	if(data.length==null){
	      		console.log(data["message"]);
	      		var message = `
					<article class="message is-dark">
						<div class="message-body">
							<h5 class="title is-5">${data["message"]}</h5>
						</div>
					</article>
	      		`;

	      		taskContainer.innerHTML = message;
	      	} else {
				// Add data to task container
				for(var singleData of data){
					setTaskTemplate(singleData["category"],singleData["description"],singleData["helperId"],singleData["requestTime"],singleData["startTime"],singleData["status"]);
				}
	      	}
			
	     
		    //remove the loading gif
	      	document.getElementById("loading").classList.add("is-hidden");
	    }
  	};

	request.setRequestHeader("Content-type", "application/json");
	request.onload = function() {
	  	var data = JSON.parse(this.response)
	}


	// Send request
	request.send(JSON.stringify(data));
}


var userId = sessionStorage.userid;
// console.log(userId);
data.userId = userId;

fetchData();
			
// setTaskTemplate("Mechanic","Chain Problem, Head Light",0,"2020-05-08 20:53:49","0000-00-00 00:00:00","processing");
// setTaskTemplate("Mechanic","Chain Problem, Head Light",0,"2020-05-08 20:53:49","0000-00-00 00:00:00","processing");
// taskContainer.innerHTML += getTaskTemplate("Mechanic","Chain Problem, Head Light",0,"2020-05-08 20:53:49","0000-00-00 00:00:00","processing");
