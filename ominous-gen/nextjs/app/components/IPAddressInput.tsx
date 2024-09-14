import {KeyboardEvent, ChangeEvent, useState} from "react";

export default function IPAddressInput(props:any){
    let focus = false
    function filter(event: KeyboardEvent){
        const element = event.target
        //Is CTRL-A or CTRL-X pressed
        if (event.ctrlKey || event.metaKey) {
            if (event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 'x') {
                return; 
            }
        }
        
        if (event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Tab' || event.key == 'Delete'){
            return
        }

        //Allow digits, period and backspace
        const NUMBERS_PERIOD_BACKSPACE = /[0-9.]/
        if (NUMBERS_PERIOD_BACKSPACE.test(event.key) || event.key == 'Backspace'){
            return 
        }

        event.preventDefault()
    }
    return(
        <>
            <input id={props.id} placeholder="127.0.0.1" type='text' value={props.ip_address} onChange={(e: ChangeEvent<HTMLInputElement>) => props.onClick(e)} onKeyDown={filter} className="bg-gray-600 rounded p-1 ip_addresses focus:outline-none text-2xl xl:text-3xl text-center mx-3" minLength={7} maxLength={15} />
        </>
    )
}