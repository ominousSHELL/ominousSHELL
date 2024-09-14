export default async function getPayloadData(payload_name:string){
    const data = {
        name:payload_name
    }
    const response = await fetch('/api/payload_data', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    let result = await response.json();
    return result.map((item:any) => item.data)[0]
}