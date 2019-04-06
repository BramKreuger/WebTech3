//TOGGLING VISIBILITY OF REGISTER/LOGIN FORMS
function showRegister()
{
	var form_show = document.getElementById("register");
	var form_hide = document.getElementById("login");

	form_show.style.display = "block";
	form_hide.style.display = "none";

}

function showLogin()
{
	var form_show = document.getElementById("login");
	var form_hide = document.getElementById("register");

	form_show.style.display = "block";
	form_hide.style.display = "none";
}


function toggleVisibility()
{
	if(arguments.length>0)
	{
		for(var i = 0; i<arguments.length; i++)
		{

			var current = arguments[i];
			if(current.style.display == "none")
			{
				current.style.display = "";
			}
			else{
				current.style.display = "none";
			}
		}
	}
}

//AJAX REGISTER/LOGIN FORM REQUESTS
function checkRegister(form)
{
	// check wether all fields are filled in
	for (var i = 0; i < 5; i++) {
		if (form[i].value == "")
		{
			alert("please fill in all the fields!");
			break;
		}
	}

	if(form.password.value != form.password2.value)
	{
		alert("passwords do not match!");
	}

	//Post the information to server
	else
	{
		var request = new XMLHttpRequest();

		request.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200)
			{
				var response = JSON.parse(this.responseText);
				console.log(response);
				

				if (response == "OK")
				{
					window.location.replace("/ok.html");
				}
				else
				{
					alert("this email adress is already registered");
			
				}
			}
			
		};
		request.open("POST", "/form/register");
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.send("fname="+form.fname.value+
				"&lname="+form.lname.value+
				"&email="+form.email.value+
				"&password="+form.password.value );	
	}
}

function checkLogin(form)
{
	// check wether all fields are filled in
	if(form.email.value == "" || form.password.value == "")
	{
		alert("please fill in you login info first")
	}
	
	else
	{

		var request = new XMLHttpRequest();

		request.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200)
			{
				var response = this.responseText;

				if (response == "OK")
				{
					//Login variable set to True,
					window.location.replace("/home.html");

					//Set interface text to "fname lname"
					
				}
				else
				{
					alert("The combination of email and password could not be found. Please try again or register first.");
				}
			}	
		};
		request.open("POST", "/form/login");
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.send("email="+form.email.value+"&password="+form.password.value );
	}	
}

