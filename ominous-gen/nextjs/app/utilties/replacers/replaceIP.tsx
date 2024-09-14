export default function replaceIP(payload:any, old_ip:string, new_ip:string, isDefault:boolean){
    payload = String(payload)
    if (isDefault == false){
        return payload.replace('127.0.0.1', old_ip)
    }
    return payload.replace(old_ip, new_ip)
}