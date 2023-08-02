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
                tbody.innerHTML = "";
                pageLayout.innerHTML = "";
                pageLayout.style = "";
                const row = tbody.insertRow();
                const err = row.insertCell();
                err.textContent = "No results!";
        }
}
