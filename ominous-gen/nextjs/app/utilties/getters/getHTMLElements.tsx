//Connection Type
export let reverse_cards:HTMLCollectionOf<Element>
export let reverse_texts:HTMLCollectionOf<Element>
export let bind_cards:HTMLCollectionOf<Element>
export let bind_texts:HTMLCollectionOf<Element>
//Platform
export let linux:HTMLCollectionOf<Element>
export let windows:HTMLCollectionOf<Element>
//Filters
export let category_filters: HTMLCollectionOf<Element>
export let payload_class_filters: HTMLCollectionOf<Element>
export let category_containers: HTMLCollectionOf<Element>
export let payload_class_containers: HTMLCollectionOf<Element>
//Filter Options
export let category_options: HTMLCollectionOf<Element>
export let payload_class_options: HTMLCollectionOf<Element>
//Payloads
export let payloads: HTMLCollectionOf<Element>
//Encoders
export let encoders: HTMLCollectionOf<Element>
//Error Messages
export let ip_errors: HTMLCollectionOf<Element>
export let port_errors: HTMLCollectionOf<Element>
export let error_disabled_options: HTMLCollectionOf<Element>
export let error_disabled_options_container: HTMLCollectionOf<Element>



export function getHTMLElements(){
    //Connection Type
    reverse_cards = document.getElementsByClassName('reverse_card')
    reverse_texts = document.getElementsByClassName('reverse_text')
    bind_cards = document.getElementsByClassName('bind_card')
    bind_texts = document.getElementsByClassName('bind_text')
    //Platform
    linux = document.getElementsByClassName('linux')
    windows = document.getElementsByClassName('windows')
    //Filters
    category_filters =  document.getElementsByClassName('category')
    payload_class_filters =  document.getElementsByClassName('payload_class')
    category_containers = document.getElementsByClassName('category_container')
    payload_class_containers = document.getElementsByClassName('payload_class_container')
    //Filter Options
    category_options = document.getElementsByClassName('categories')
    payload_class_options = document.getElementsByClassName('payload_classes')
    //Payloads
    payloads = document.getElementsByClassName('payloads')
    //Encoders
    encoders = document.getElementsByClassName('encoders')
    //Error Messages
    ip_errors = document.getElementsByClassName('ip_errors')
    port_errors = document.getElementsByClassName('port_errors')
    error_disabled_options = document.getElementsByClassName('error_disabled_options')
    error_disabled_options_container = document.getElementsByClassName('error_disabled_options_container')
}