async function search(element){
	if (element.value.length > 0){
		request(element.value);
		search_term = search_term.split("<");
		search_term = search_term[0];

	}
	else{
		tbody.innerHTML = "";
	}
}


function nav(element){
	//Todo
	//Add active class to element
	window.location.replace(`http://localhost:8000/${element.innerText.toLowerCase()}`);
}

//Global variables
let pageLayout = "";
let nav_tabs = "";
let tbody = "";

//Initialization
function main(){
	pageLayout = document.getElementById('pageLayout');
	tbody = document.querySelector('tbody');
}

setTimeout('main();', 1000);
