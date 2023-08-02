
async function updateLayout(id, category){
	const response = await fetch(`http://localhost:8000/static/blogs/categories/${category.toLowerCase()}/${id}/${id}.html`)
	file = await response.text();
	pageLayout.style = "border: 2px solid turquoise;";
	pageLayout.innerHTML = file;
}


async function updateTable(data){
	if (data.length > 0){
		tbody.innerHTML = "";
		for (var i=0; i < data.length; i++){
			const row = tbody.insertRow();
			const id = row.insertCell();
			const machine = row.insertCell();
			const category = row.insertCell();
			const date = row.insertCell();

			id.textContent = data[i].id;
			machine.textContent = data[i].machine;
			category.textContent = data[i].category;
			date.textContent = data[i].date;

			const ID = id.textContent;
			const CATEGORY = category.textContent;
			id.addEventListener('click', () => {
				updateLayout(ID, CATEGORY);
			});
			
		}
	}
	else if (data.length == 0){
		tbody.innerHTML = "";
		pageLayout.innerHTML = "";
		pageLayout.style = "";
		const row = tbody.insertRow();
		const err = row.insertCell();
		err.textContent = "No results!";
	}
}

async function request(element, platform){
	if (platform == undefined){
		platform = PLATFORM;
	}
	if (element.value == ""){
		search_term = element.innerHTML.toLowerCase();
		search_term = search_term.split("<");
		search_term = search_term[0];
	}
	else{
		search_term = element;
	}
	var response = await fetch(`http://localhost:8000/database_notes?query=${search_term}&platform=${platform}`);
	var data = await response.json();
	updateTable(data);
}

async function search_note(element){
	if (element.value.length > 0){
		request(element.value, PLATFORM);
	}
	else{
		tbody.innerHTML = "";
	}
}


function nav(element){
	//element.classList.className = "nav-link active";
	location.href = `http://localhost:8000/${element.innerText.toLowerCase()}`;
}
function absolute(){
	var table = document.getElementById('table');
	table.style.position = "absolute";
	table.style.top = "14rem";
	table.style.right = "";
}

function relative(){
	var table = document.getElementById('table');
	table.style.position = "";
	table.style.top = "";
	table.style.right = "";

}

function update_counter(id, counter){
	var element = document.getElementById(id);
	element.textContent = counter;
}
async function category_counter(){
	const ID = [ 'pwn_count', 'web_count', 'forensic_count', 'crypto_count', 'cloud_count', 'misc_count']; 
	for (var i=0; i < ID.length; i++){
		if (ID[i].includes('pwn')){;
			var response = await fetch("http://localhost:8000/database_notes?notes_counter=" + 'Pwn');
			var counter = await response.text();
			update_counter(ID[i], counter);
		}	
		if (ID[i].includes('web')){;
			var response = await fetch("http://localhost:8000/database_notes?notes_counter=" + 'Web');
			var counter = await response.text();
			update_counter(ID[i], counter);
		}	
		if (ID[i].includes('forensic')){;
			var response = await fetch("http://localhost:8000/database_notes?notes_counter=" + 'Forensic');
			var counter = await response.text();
			update_counter(ID[i], counter);
		}	
		if (ID[i].includes('crypto')){;
			var response = await fetch("http://localhost:8000/database_notes?notes_counter=" + 'Crypto');
			var counter = await response.text();
			update_counter(ID[i], counter);
		}	
		if (ID[i].includes('cloud')){;
			var response = await fetch("http://localhost:8000/database_notes?notes_counter=" + 'Cloud');
			var counter = await response.text();
			update_counter(ID[i], counter);
		}	
		if (ID[i].includes('misc')){;
			var response = await fetch("http://localhost:8000/database_notes?notes_counter=" + 'Misc');
			var counter = await response.text();
			update_counter(ID[i], counter);
		}	
	}
}

//Global variables
let pageLayout = "";
let PLATFORM = "Hackthebox";
let search_term = "";
let nav_tabs = "";
let tbody = "";

//Initialization
function main(){
	pageLayout = document.getElementById('pageLayout');	
	tbody = document.querySelector('tbody');	
	category_counter();
}

setTimeout('main();', 500);
