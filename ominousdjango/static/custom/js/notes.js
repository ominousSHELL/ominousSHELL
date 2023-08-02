
async function updateLayout_notes(id, category){
	const response = await fetch(`http://localhost:8000/static/notes/categories/${category.toLowerCase()}/${id}/${id}.html`)
	file = await response.text();
	pageLayout_notes.style = "border: 2px solid turquoise;";
	pageLayout_notes.innerHTML = file;
}


async function updateTable_notes(data){
	if (data.length > 0){
		tbody_notes.innerHTML = "";
		for (var i=0; i < data.length; i++){
			const row = tbody_notes.insertRow();
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
				updateLayout_notes(ID, CATEGORY);
			});
			
		}
	}
	else if (data.length == 0){
		tbody_notes.innerHTML = "";
		pageLayout_notes.innerHTML = "";
		pageLayout_notes.style = "";
		const row = tbody_notes.insertRow();
		const err = row.insertCell();
		err.textContent = "No results!";
	}
}

async function request_notes(element){
	platform = PLATFORM;

	if (element.value == ""){
		search_term_notes = element.innerHTML.toLowerCase();
		search_term_notes = search_term_notes.split("<");
		search_term_notes = search_term_notes[0];
	}
	else{
		search_term_notes = element;
	}
	var response = await fetch(`http://localhost:8000/database_notes?query=${search_term_notes}&platform=${platform}`);
	var data = await response.json();
	updateTable_notes(data);
}

async function request_platform(element){
	PLATFORM = element.innerText;
	request_notes(search_term_notes);
	
}

async function search_note(element){
	if (element.value.length > 0){
		search_term_notes = element.value;
		request_notes(element.value);
	}
	else{
		tbody_notes.innerHTML = "";
	}
}


function absolute_notes(){
	var table = document.getElementById('table');
	table.style.position = "absolute";
	table.style.top = "15rem";
	table.style.right = "0";
}

function relative_notes(){
	var table = document.getElementById('table');
	table.style.position = "";
	table.style.top = "";
	table.style.right = "0";
}

function update_counter_notes(id, counter){
	var element = document.getElementById(id);
	element.textContent = counter;
}

async function category_counter_notes(){
	const ID = [ 'pwn_count', 'web_count', 'forensic_count', 'crypto_count', 'cloud_count', 'misc_count']; 
	for (var i=0; i < ID.length; i++){
		if (ID[i].includes('pwn')){;
			search_counter = 'Pwn';
		}	
		if (ID[i].includes('web')){;
			search_counter = 'Web';
		}	
		if (ID[i].includes('forensic')){;
			search_counter = 'Forensic';
		}	
		if (ID[i].includes('crypto')){;
			search_counter = 'Crypto';
		}	
		if (ID[i].includes('cloud')){;
			search_counter = 'Cloud';
		}	
		if (ID[i].includes('misc')){;
			search_counter = 'Misc';
		}	
		var response = await fetch("http://localhost:8000/database_notes?notes_counter=" + search_counter);
		var counter = await response.text();
		update_counter_notes(ID[i], counter);
	}
}

//Global variables
let pageLayout_notes = "";
let PLATFORM = "Hackthebox";
let search_term_notes = "";
let tbody_notes = "";

//Initialization
function main_notes(){
	pageLayout_notes = document.getElementById('pageLayout_notes');	
	tbody_notes = document.getElementById('tbody_notes');	
	category_counter_notes();
}

setTimeout('main_notes();', 1500);
