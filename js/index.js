// js for login & register
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const cont = document.getElementById('cont');

signUpButton.addEventListener('click', () => {
	cont.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	cont.classList.remove("right-panel-active");
});
// end js for login & register

