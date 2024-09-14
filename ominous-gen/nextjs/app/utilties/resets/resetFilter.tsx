import { category_filters, category_containers, payload_class_filters,  payload_class_containers } from "../getters/getHTMLElements";
export default function resetFilter(){
    const category_filters_array = Array.from(category_filters)
    const category_containers_array = Array.from(category_containers)
    const payload_class_filters_array = Array.from(payload_class_filters)
    const payload_class_containers_array = Array.from(payload_class_containers)

    payload_class_filters_array.forEach(payload_class_filter => {
        payload_class_filter.classList.remove('bg-blue-600')
    })
    payload_class_containers_array.forEach(payload_class_container => {
        payload_class_container.classList.add('hidden')
    })    
   
    category_filters_array.forEach(category_filter => {
        category_filter.classList.add('bg-blue-600')
    })
    category_containers_array.forEach(category_container => {
        category_container.classList.remove('hidden')
    })
}