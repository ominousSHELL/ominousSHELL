export default async function getPayloadClasses(connection_type:string, platform:string, category:any){
    const data = {
        connection_type:connection_type,
        platform: platform,
        category: category
    }

    const response = await fetch('/api/payload_classes', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result.map((item:any) => item.class)
}
