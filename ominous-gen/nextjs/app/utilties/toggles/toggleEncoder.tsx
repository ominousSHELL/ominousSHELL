import { encoders } from "../getters/getHTMLElements"

let encoder:string

export default function toggleEncoder(element:HTMLDivElement){
    const encoders_array = Array.from(encoders)
    encoders_array.forEach(encoder => {
        encoder.classList.remove('bg-blue-600')
    })
    element.classList.add('bg-blue-600')
    encoder = String(element.textContent)
    return encoder.toLowerCase()
}