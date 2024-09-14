import { category_options} from "../getters/getHTMLElements"
export default function toggleCategory(element:any){
    const category_options_array = Array.from(category_options)
    category_options_array.forEach(category_option => {
        category_option.classList.remove('bg-rose-500')
    })

    element.classList.add('bg-rose-500')
    return element.textContent
}