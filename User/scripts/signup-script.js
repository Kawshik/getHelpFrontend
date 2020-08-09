const data  = {
	"firstname":"",
	"lastname":"",
	"gender":"",
	"address":"",
	"username":"",
	"email":"",
	"password":"",
	"passwordRepeat":""
}

var i = 0;
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var submit = document.getElementById('submit');


next.addEventListener("click",()=>{
	console.log(i);

	var currCol = document.getElementById("column-"+i);
	currCol.classList.remove('is-full');
	currCol.classList.add('is-hidden');
		
	i++;

	var nextCol = document.getElementById("column-"+i);
	nextCol.classList.add('is-full');
	nextCol.classList.remove('is-hidden');

	if(i==2){
		next.classList.add('is-hidden');
		submit.classList.remove('is-hidden');
	}
	if(i==1)
		prev.classList.remove('is-invisible');

});

prev.addEventListener("click",()=>{
	console.log(i);
	var currCol = document.getElementById("column-"+i);
	currCol.classList.remove('is-full');
	currCol.classList.add('is-hidden');
	
	i--;

	var nextCol = document.getElementById("column-"+i);
	nextCol.classList.add('is-full');
	nextCol.classList.remove('is-hidden');

	if(i==0)
			prev.classList.add('is-invisible');
	if(i==1){
		next.classList.remove('is-hidden');
		submit.classList.add('is-hidden');
	}
});

submit.addEventListener("click",()=>{
	var firstname = document.getElementById('firstname').value;
	var lastname = document.getElementById('lastname').value;
	
	var gender = "";
	var genderRadio = document.getElementsByName('gender');

	for (var i = 0, length = genderRadio.length; i < length; i++) {
	    if (genderRadio[i].checked) {
	        // do whatever you want with the checked radio
	        gender = genderRadio[i].value;

	        // only one radio can be logically checked, don't check the rest
	        break;
	    }
	}


	var addr1 = document.getElementById('addr1').value;
	var addr2 = document.getElementById('addr2').value;
	var city = document.getElementById('city').value;
	var state = document.getElementById('state').value;
	var pincode = document.getElementById('pincode').value;
	var address = addr1 + ", " + addr2 + ", " + city + ", " + state + ", " + pincode;


	var username = document.getElementById('username').value;
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var confirmPassword = document.getElementById('confirm-password').value;


	if(password!=confirmPassword){
		console.log("enter again");
	} else {		
		data.firstname = firstname;
		data.lastname = lastname;
		data.gender = gender;
		data.address = address;
		data.username = username;
		data.email = email;
		data.password = password;
		data.passwordRepeat = confirmPassword;
		console.log(data);

		sendData();
	}


});

function sendData(){
	//remove the loading gif in submit button
	document.getElementById("submit").classList.add("is-loading");


	var request = new XMLHttpRequest();
	
	var endPoint = "http://localhost:8080/getHelp/auth/users/SABAS/api/signup.php";
	
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
	      	
	      	//Close modal
	      	// document.getElementById("task-container").classList.remove("is-active");
		    
		    // reload the page
		    // location.reload();
		    if(response.statusCode==200)
		    	window.location = "login.html";
		    else
		    	console.log(response.message);
	    }
  	};

	request.setRequestHeader("Content-type", "application/json");
	
	request.onload = function() {
	  	var data = JSON.parse(this.response)
	}


	// Send request
	request.send(JSON.stringify(data));
}