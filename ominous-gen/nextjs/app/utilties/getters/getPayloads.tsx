
export async function getPayloads(connection_type:string, platform:string, category:string, payload_class:string){
    const data = {
        connection_type:connection_type,
        platform: platform,
        category: category,
        class:payload_class
    }

    const response = await fetch('/api/payloads', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result.map((item:any) => item)
}