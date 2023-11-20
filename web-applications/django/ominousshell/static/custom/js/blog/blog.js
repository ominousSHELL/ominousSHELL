function update_counter(id, counter){
    var element = document.getElementById(id);
    element.textContent = counter;
}

async function category_counter(){
    const ID = [ 'security_count', 'linux_count', 'windows_count', 'software_count', 'networking_count'];
    for (var i=0; i < ID.length; i++){
		if (ID[i].includes('security')){
			search_counter = 'Security';
		}
		if (ID[i].includes('linux')){
			search_counter = 'Linux';
		}
		if (ID[i].includes('windows')){
			search_counter = 'Windows';
		}
		if (ID[i].includes('software')){
			search_counter = 'Software';
		}
		if (ID[i].includes('networking')){
			search_counter = 'Networking';
		}
		var response = await fetch("http://localhost:8000/database_blog/?blogs_counter=" + search_counter);
		var counter = await response.text();
		update_counter(ID[i], counter);
	}
}

async function update_blogs_table(data){
	if (data.length > 0){
		tbody_blog.innerHTML = "";
		tbody_blog_mobile.innerHTML = "";

		for (var i=0; i < data.length; i++){
			const row = tbody_blog.insertRow();
			const id = row.insertCell();
			const title = row.insertCell();
			const category = row.insertCell();
			const date = row.insertCell();

            //Mobile
            const row_mobile = tbody_blog_mobile.insertRow();
			const id_mobile = row_mobile.insertCell();
			const title_mobile = row_mobile.insertCell();
			const category_mobile = row_mobile.insertCell();
			const date_mobile = row_mobile.insertCell();

			id.textContent = data[i].id;
			title.textContent = data[i].title;
			category.textContent = data[i].category;
			date.textContent = data[i].date;

            //Mobile
            id_mobile.textContent = data[i].id;
			title_mobile.textContent = data[i].title
			category_mobile.textContent = data[i].category;
			date_mobile.textContent = data[i].date;

			const ID = id.textContent;
			const CATEGORY = category.textContent;
            const CATEGORY_URL = CATEGORY.toLowerCase().replace(/ /g, '_');

			id.addEventListener('click', () => {
				window.location.href = `http://localhost:8000/blogs/${CATEGORY_URL}/${ID}.html`;
			});

            //Mobile
            id_mobile.addEventListener('click', () => {
				window.location.href = `http://localhost:8000/blogs/${CATEGORY_URL}/${ID}.html`;
			});
		}
        
	}
	else if (data.length == 0){
		tbody_blog.innerHTML = "";
		const row = tbody_blog.insertRow();
		const err = row.insertCell();
		err.textContent = "No results!";

		//Mobile
		tbody_blog_mobile.innerHTML = "";
		const row_mobile = tbody_blog_mobile.insertRow();
		const err_mobile = row_mobile.insertCell();
		err_mobile.textContent = "No results!";
	}
}


async function request_blog(element){
	if (element.length == undefined){
		search_term = element.innerHTML.toLowerCase();
		search_term = search_term.split("<");
		search_term = search_term[0];
	}
	else{
		search_term = element;
	}
	var response = await fetch(`http://localhost:8000/database_blog/?query=${search_term}`);
	var data = await response.json();
	update_blogs_table(data);
	
}



async function search_blog(element){
	alert(element);
	if (element.value.length > 0){
		search_term = element.value;
		request_blog(element.value);
	}
	else{
		tbody_blog.innerHTML = "";
	}
}

//Global variables
let search_term = "";
let tbody_blog = "";
let tbody_blog_mobile = "";

//Initialization
function main(){
        tbody_blog = document.getElementById('tbody_blog');
        tbody_blog_mobile = document.getElementById('tbody_blog_mobile');
        category_counter();
}
setTimeout('main();', 500);

