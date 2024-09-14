import {payload_class_options} from "../getters/getHTMLElements"


export default function togglePayloadClass(element:any){
    const payload_class_options_array = Array.from(payload_class_options)
    payload_class_options_array.forEach(payload_class_option => {
        payload_class_option.classList.remove('bg-rose-500')
    }) 

    element.classList.add('bg-rose-500')
    return element.textContent
}