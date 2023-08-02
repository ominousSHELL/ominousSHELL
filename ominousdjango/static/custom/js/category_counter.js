function update_counter(id, counter){
    var element = document.getElementById(id);
    element.textContent = counter;
}
async function category_counter(){
    const ID = [ 'security_count', 'linux_count', 'windows_count', 'software_count', 'ne
    for (var i=0; i < ID.length; i++){
       	if (ID[i].includes('security')){;
            var response = await fetch("http://localhost:8000/database?counter=" + 'Secu
            var counter = await response.text();
            update_counter(ID[i], counter);
        }
        if (ID[i].includes('linux')){;
            var response = await fetch("http://localhost:8000/database?counter=" + 'Linu
            var counter = await response.text();
            update_counter(ID[i], counter);
        }
        if (ID[i].includes('windows')){;
            var response = await fetch("http://localhost:8000/database?counter=" + 'Wind
            var counter = await response.text();
            update_counter(ID[i], counter);
        }
        if (ID[i].includes('software')){;
            var response = await fetch("http://localhost:8000/database?counter=" + 'Soft
            var counter = await response.text();
            update_counter(ID[i], counter);
        }
        if (ID[i].includes('network')){;
            var response = await fetch("http://localhost:8000/database?counter=" + 'Netw
            var counter = await response.text();
            update_counter(ID[i], counter);
        }
    }
}
