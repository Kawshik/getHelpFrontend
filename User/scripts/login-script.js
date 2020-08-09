const data  = {
	"email":"",
	"password":""
}


submit.addEventListener("click",()=>{
	// window.location = "file:///C:/Users/kawshik/Desktop/getHelpUI/User/login.html";
	
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
		
	data.email = email;
	data.password = password;
	
	console.log(data);

	sendData();

});

function sendData(){
	//remove the loading gif in submit button
	document.getElementById("submit").classList.add("is-loading");


	var request = new XMLHttpRequest();
	
	var endPoint = "http://localhost:8080/getHelp/auth/users/SABAS/api/login.php";
	
	// Open a new connection, using the GET request on the URL endpoint
	request.open('POST', endPoint, true);

	request.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	// document.getElementById("demo").innerHTML = this.statusText;
	      	var response = JSON.parse(this.response)
	      	console.log(response)
	      	console.log(this.statusText)

		    //remove the loading gif in submit button
	      	document.getElementById("submit").classList.remove("is-loading");
	      	
	      	if(response.statusCode=="200"){
	      		console.log(response.message);

	      	} else {
	      		console.log(response.message);
	      	}
	      	//Close modal
	      	// document.getElementById("task-container").classList.remove("is-active");
		    
		    // reload the page
		    // location.reload();
		    // window.location = "file:///C:/Users/kawshik/Desktop/getHelpUI/User/login.html";
		    sessionStorage.setItem('username',response.userName);
		    sessionStorage.setItem('userid',response.userId);
		    sessionStorage.setItem('address',response.address);
		    window.location.replace("index.html");

	    }
  	};

	request.setRequestHeader("Content-type", "application/json");
	
	request.onload = function() {
	  	var data = JSON.parse(this.response)
	}


	// Send request
	request.send(JSON.stringify(data));
}