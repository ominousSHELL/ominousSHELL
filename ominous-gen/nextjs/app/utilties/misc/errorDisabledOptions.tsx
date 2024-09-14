import { error_disabled_options, error_disabled_options_container } from "../getters/getHTMLElements";

function removeErrorMessage(array:any){
    array.forEach((container: { classList: { add(arg0: string): unknown; remove: any; }; }) => {
        container.classList.add('hidden')
    })
}

 export default async function errorDisabledOptions(){
    const error_disabled_options_array = Array.from(error_disabled_options)
    const error_disabled_options_container_array = Array.from(error_disabled_options_container)
    error_disabled_options_container_array.forEach(error_disabled_options_container => {
        error_disabled_options_container.classList.remove('hidden')
    })

    error_disabled_options_array.forEach(async error_disabled_option => {
        error_disabled_option.innerHTML = 'Select A Payload First!'
        setTimeout(async () => {removeErrorMessage(error_disabled_options_container_array)}, 2500)
    })
}