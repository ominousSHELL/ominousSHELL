import { payloads } from "../getters/getHTMLElements";

export default function resetPayloads(){
    const payloads_array = Array.from(payloads)    
    payloads_array.forEach(payload => {
        payload.classList.remove('bg-rose-500')
    })
}