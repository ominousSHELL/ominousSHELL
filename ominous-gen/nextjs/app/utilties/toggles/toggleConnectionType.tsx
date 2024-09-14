import { reverse_cards, reverse_texts, bind_cards, bind_texts } from "../getters/getHTMLElements"
import resetCategories from "../resets/resetCategories"
import resetPayloadClasses from "../resets/resetPayloadClasses"

export function toggleConnectionType(type: string){
    const reverse_card_array = Array.from(reverse_cards)
    const reverse_text_array = Array.from(reverse_texts)
    const bind_card_array = Array.from(bind_cards)
    const bind_text_array = Array.from(bind_texts)

    if (type == 'reverse'){
        //Set reverse element
        reverse_card_array.forEach(reverse_card => {
            reverse_card.classList.add('bg-rose-500')
        })
        reverse_text_array.forEach(reverse_text => {
            reverse_text!.classList.remove('text-rose-500')
            reverse_text!.classList.add('text-gray-800')
        })
        //Reset bind element
        bind_card_array.forEach(bind_card => {
            bind_card.classList.remove('bg-sky-400')
        })
        bind_text_array.forEach(bind_text => {
            bind_text.classList.remove('text-gray-800')
            bind_text.classList.add('text-sky-400')
        })
    }
    
    if (type == 'bind'){
        //Set bind element
        bind_card_array.forEach(bind_card => {
            bind_card.classList.add('bg-sky-400')
        })
        bind_text_array.forEach(bind_text => {
            bind_text.classList.remove('text-sky-400')
            bind_text.classList.add('text-gray-800')
        })
        //Reset reverse element
        reverse_card_array.forEach(reverse_card => {
            reverse_card.classList.remove('bg-rose-500')
        })
        reverse_text_array.forEach(reverse_text => {
            reverse_text.classList.remove('text-gray-800')
            reverse_text.classList.add('text-rose-500')
        })
    }
}
