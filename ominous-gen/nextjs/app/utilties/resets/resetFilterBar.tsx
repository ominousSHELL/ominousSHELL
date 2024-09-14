export default function resetFilterBar(){
    const filter_bar_mobile = document.getElementById('filter_bar_mobile') 
    const filter_bar_desktop = document.getElementById('filter_bar_desktop') 
    if (filter_bar_mobile instanceof HTMLInputElement){
        filter_bar_mobile.value = ''
    }
    if (filter_bar_desktop instanceof HTMLInputElement){
        filter_bar_desktop.value = ''
    }
}