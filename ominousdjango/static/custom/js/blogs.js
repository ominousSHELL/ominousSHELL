
async function updateLayout(id, category){
	const response = await fetch(`http://localhost:8000/static/blogs/categories/${category.toLowerCase()}/${id}/${id}.html`)
	file = await response.text();
	pageLayout.style = "border: 2px solid turquoise;";
	pageLayout.innerHTML = file;
}


async function updateTable(data){
	if (data.length > 0){
		tbody_blog.innerHTML = "";
		for (var i=0; i < data.length; i++){
			const row = tbody_blog.insertRow();
			const id = row.insertCell();
			const title = row.insertCell();
			const category = row.insertCell();
			const date = row.insertCell();

			id.textContent = data[i].id;
			title.textContent = data[i].title;
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
		tbody_blog.innerHTML = "";
		pageLayout.innerHTML = "";
		pageLayout.style = "";
		const row = tbody_blog.insertRow();
		const err = row.insertCell();
		err.textContent = "No results!";
	}
}

async function request_blog(element){
	if (element.value == ""){
		search_term = element.innerHTML.toLowerCase();
		search_term = search_term.split("<");
		search_term = search_term[0];
	}
	else{
		search_term = element;
	}
	var response = await fetch(`http://localhost:8000/database_blog?query=${search_term}`);
	var data = await response.json();
	updateTable(data);
}

async function search_blog(element){
	if (element.value.length > 0){
		search_term = element.value;
		request_blog(element.value);
	}
	else{
		tbody_blog.innerHTML = "";
	}
}


function nav(element){
	//element.classList.className = "nav-link active";
	location.href = `http://localhost:8000/${element.innerText.toLowerCase()}`;
}
function update_counter(id, counter){
	var element = document.getElementById(id);
	element.textContent = counter;
}
async function category_counter(){
	const ID = [ 'security_count', 'linux_count', 'windows_count', 'software_count', 'networking_count']; 

	for (var i=0; i < ID.length; i++){
		if (ID[i].includes('security')){;
			search_counter = 'Security';
		}	
		if (ID[i].includes('linux')){;
			search_counter = 'Linux';
		}	
		if (ID[i].includes('windows')){;
			search_counter = 'Windows';
		}	
		if (ID[i].includes('software')){;
			search_counter = 'Software';
		}	
		if (ID[i].includes('network')){;
			search_counter = 'Networking';
		}	
		var response = await fetch("http://localhost:8000/database_blog?blogs_counter=" + search_counter);
		var counter = await response.text();
		update_counter(ID[i], counter);
	}
}

//Global variables
let pageLayout = "";
let search_term = "";
let nav_tabs = "";
let tbody_blog = "";

//Initialization
function main(){
	pageLayout = document.getElementById('pageLayout_blog');	
	tbody_blog = document.getElementById('tbody_blog');	
	category_counter();
}

setTimeout('main();', 500);
