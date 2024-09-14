export default function replaceIP(payload:any, old_port:string, new_port:string, isDefault:boolean){
    payload = String(payload)
    if (isDefault == false){
        return payload.replace('9001', old_port)
    }
    return payload.replace(old_port, new_port)
}