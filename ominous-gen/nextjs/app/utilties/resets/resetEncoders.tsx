import { encoders } from "../getters/getHTMLElements";
export default function resetEncoders(){
    const encoders_array = Array.from(encoders)
    encoders_array.forEach(encoder => {
        encoder.classList.remove('bg-blue-600')
    })

    encoders_array.forEach(encoder => {
        if (encoder.textContent == 'None'){
            encoder.classList.add('bg-blue-600')
        }
    })
}