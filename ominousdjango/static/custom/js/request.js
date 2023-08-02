async function request(element){
        if (element.value == ""){
                search_term = element.innerHTML.toLowerCase();
        }
        else{
                search_term = element;
        }
        var response = await fetch(`http://localhost:8000/database?query=${search_term}`);
        var data = await response.json();
        updateTable(data);
}
