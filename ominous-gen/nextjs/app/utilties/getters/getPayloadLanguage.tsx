export async function getPayloadLanguage(payload_name:string){
    const data = {
        name:payload_name
    }
    const response = await fetch('/api/payload_language', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    let result = await response.json();
    return String(result.map((item:any) => item.language)[0]).toLowerCase()
}