import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function PortInput(props:any){

    function filter(event: KeyboardEvent){
        if (event.ctrlKey || event.metaKey) {
            if (event.key.toLowerCase() === 'a' || event.key.toLowerCase() === 'x') {
                return; 
            }
        }
        if (event.key == 'ArrowUp' || event.key == 'ArrowDown' || event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Tab' || event.key == 'Delete'){
            return
        }

        //Allow digits and Backspace
        const NUMBERS_PERIOD_BACKSPACE = /[0-9]/
        if (NUMBERS_PERIOD_BACKSPACE.test(event.key) || event.key == 'Backspace'){
            return 
        }

        event.preventDefault()
    }

    return (
        <>
            <input id={props.id} placeholder="9001" type='text' value={props.port} onChange={(e: ChangeEvent<HTMLInputElement>) => props.onClick(e)} onKeyDown={filter} className="bg-gray-600 rounded p-1 focus:outline-none text-xl xl:text-2xl mx-3 xl:mx-0 ml-12 xl:ml-32 w-16 xl:w-20 text-center" minLength={3} maxLength={5} />
        </>
    )
}