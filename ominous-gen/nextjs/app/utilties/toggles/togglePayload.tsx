import { payloads } from "../getters/getHTMLElements";

export default function togglePayload(element:any){
    const payloads_array = Array.from(payloads)    

    payloads_array.forEach(payload => {
        payload.classList.remove('bg-rose-500')
    })
    element.classList.add('bg-rose-500')
}