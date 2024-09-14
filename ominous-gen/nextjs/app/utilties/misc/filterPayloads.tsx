import { ChangeEvent } from "react";

export default function filterPayloads(event: ChangeEvent<HTMLInputElement>, payloads: any){
    payloads = payloads.filter((payload: { name: string; }) => (
        payload.name.toLowerCase().includes(event.target.value.toLowerCase())
    ))

    return payloads
}