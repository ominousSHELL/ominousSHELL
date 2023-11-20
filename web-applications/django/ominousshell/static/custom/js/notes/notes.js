async function update_counter_notes(id, counter){
	var element = document.getElementById(id);
	element.textContent = counter;
}

async function platform_counter(){
	const ID = ['htb_counter', 'thm_counter'];
	for (var i=0; i < ID.length; i++){
		if (ID[i].includes('htb')){;
			search_counter = 'HTB';
		}
		if (ID[i].includes('thm')){;
			search_counter = 'THM';
		}
		var response = await fetch("http://localhost:8000/database_notes/?platform_counter=" + search_counter);
		var counter = await response.text();
		update_counter_notes(ID[i], counter);
	}
}


async function category_counter_notes(){
	const ID = [ 'pwn_count', 'hardware_count', 'crypto_count', 'reversing_count', 'gamepwn_count', 'blockchain_count', 'forensics_count', 'misc_count', 'mobile_count', 'web_count']; 
	for (var i=0; i < ID.length; i++){
		if (ID[i].includes('pwn')){;
			search_counter = 'Pwn';
		}	
		if (ID[i].includes('hardware')){;
			search_counter = 'Hardware';
		}	
		if (ID[i].includes('crypto')){;
			search_counter = 'Crypto';
		}	
		if (ID[i].includes('reversing')){;
			search_counter = 'Reversing';
		}	
		if (ID[i].includes('gamepwn')){;
			search_counter = 'GamePwn';
		}	
		if (ID[i].includes('blockchain')){;
			search_counter = 'Blockchain';
		}
		if (ID[i].includes('forensics')){;
			search_counter = 'Forensics';
		}	
		if (ID[i].includes('misc')){;
			search_counter = 'Misc';
		}
		if (ID[i].includes('mobile')){;
			search_counter = 'Mobile';
		}
		if (ID[i].includes('web')){;
			search_counter = 'Web';
		}
		var response = await fetch("http://localhost:8000/database_notes/?notes_counter=" + search_counter);
		var counter = await response.text();
		update_counter_notes(ID[i], counter);
	}
}

async function update_notes_table(data){
	if (data.length > 0){
		tbody_notes.innerHTML = "";
		tbody_notes_mobile.innerHTML = "";

		for (var i=0; i < data.length; i++){
			const row = tbody_notes.insertRow();
			const id = row.insertCell();
			const machine = row.insertCell();
			const category = row.insertCell();
			const difficulty = row.insertCell();
			const platform = row.insertCell();
			const date = row.insertCell();

            //Mobile
            const row_mobile = tbody_notes_mobile.insertRow();
			const id_mobile = row_mobile.insertCell();
			const machine_mobile = row_mobile.insertCell();
			const category_mobile = row_mobile.insertCell();
			const difficulty_mobile = row_mobile.insertCell();
			const platform_mobile = row_mobile.insertCell();
			const date_mobile = row_mobile.insertCell();

			id.textContent = data[i].id;
			machine.textContent = data[i].machine;
			category.textContent = data[i].category;
			difficulty.textContent = data[i].difficulty;
			platform.textContent = data[i].platform;
			date.textContent = data[i].date;
			

            //Mobile
            id_mobile.textContent = data[i].id;
			machine_mobile.textContent = data[i].machine;
			category_mobile.textContent = data[i].category;
			difficulty_mobile.textContent = data[i].difficulty;
			platform_mobile.textContent = data[i].platform;
			date_mobile.textContent = data[i].date;

			//Create clickable table field
			const ID = id.textContent;
			const CATEGORY = category.textContent.toLowerCase();
			const PLATFORM = platform.textContent.toLowerCase();

			id.addEventListener('click', () => {
				window.location.href = `http://localhost:8000/notes/${CATEGORY}/${PLATFORM}/${ID}.html`;
			});

            //Mobile
            id_mobile.addEventListener('click', () => {
				window.location.href = `http://localhost:8000/notes/${CATEGORY}/${PLATFORM}/${ID}.html`;
			});
		}
        
	}

	else if (data.length == 0){
		tbody_notes.innerHTML = "";
		const row = tbody_notes.insertRow();
		const err = row.insertCell();
		err.textContent = "No results!";

		//Mobile
		tbody_notes_mobile.innerHTML = "";
		const row_mobile = tbody_notes_mobile.insertRow();
		const err_mobile = row_mobile.insertCell();
		err_mobile.textContent = "No results!";
	}
}


async function request_note(element, platform){
	platform = PLATFORM;
	if (element.length == undefined){
		search_term_notes = element.innerHTML.toLowerCase();
		search_term_notes = search_term_notes.split("<");
		search_term_notes = search_term_notes[0];
	}
	else{
		search_term_notes = element;
	}
	var response = await fetch(`http://localhost:8000/database_notes/?query=${search_term_notes}&platform=${platform}`);
	var data = await response.json();
	update_notes_table(data);
}

async function request_platform(element){
	const htb = document.getElementById('htb');
	const thm = document.getElementById('thm');

	if (element.innerText == "HTB"){
		thm.style = "text-decoration: none";
		htb.style = "text-decoration: underline";
	}
	else if(element.innerHTML == "THM"){
		htb.style = "text-decoration: none";
		thm.style = "text-decoration: underline";
	}

	PLATFORM = element.innerText;
	request_note(search_term_notes, PLATFORM);
}

async function search_note(element){
	if (element.value.length > 0){
		search_term_notes = element.value;
		request_note(element.value, PLATFORM);
	}
	else{
		tbody_notes.innerHTML = "";
	}
}

//Global variables
let notes_page_layout = "";
let PLATFORM = "HTB";
let search_term_notes = "";
let tbody_notes = "";

//Initialization
function main_notes(){	
	tbody_notes = document.getElementById('tbody_notes');
	tbody_notes_mobile = document.getElementById('tbody_notes_mobile');
	category_counter_notes();
	platform_counter();
}

setTimeout('main_notes();', 500);
