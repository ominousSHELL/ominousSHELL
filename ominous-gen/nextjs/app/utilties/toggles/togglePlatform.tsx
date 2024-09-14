import { linux, windows } from "../getters/getHTMLElements"
import resetCategories from "../resets/resetCategories"
import resetPayloadClasses from "../resets/resetPayloadClasses"

export function togglePlatform(type:string){
    const linux_array = Array.from(linux)
    const windows_array = Array.from(windows)

    if (type == 'linux'){
        linux_array.forEach(linux => {
            linux.classList.add('bg-yellow-300')
        })
        windows_array.forEach(windows => {
            windows.classList.remove('bg-white')
        })
    }
    else if (type == 'windows'){
        windows_array.forEach(windows => {
            windows.classList.add('bg-white')
        })
        linux_array.forEach(linux => {
            linux.classList.remove('bg-yellow-300')
        })
    }
}
