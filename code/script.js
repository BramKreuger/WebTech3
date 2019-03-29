//fucntions for hiding and showing the forms on the register page
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
