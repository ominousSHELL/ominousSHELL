import { ip_errors, port_errors } from "../getters/getHTMLElements";
export default function toggleError(ip_error: boolean, port_error:boolean){
    const ip_errors_array = Array.from(ip_errors)
    const port_errors_array = Array.from(port_errors)

    if (ip_error){
        ip_errors_array.forEach(ip_error => {
            ip_error.classList.remove('hidden')
        })
    }
    else{
        ip_errors_array.forEach(ip_error => {
            ip_error.classList.add('hidden')
        })
    }

    if (port_error){
        port_errors_array.forEach(port_error => {
            port_error.classList.remove('hidden')
        })
    }
    else{
        port_errors_array.forEach(port_error => {
            port_error.classList.add('hidden')
        })
    }
}