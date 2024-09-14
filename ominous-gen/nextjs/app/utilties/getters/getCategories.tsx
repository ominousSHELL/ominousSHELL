
export async function getCategories(connection_type:string, platform:string){
    const data = {
        connection_type: connection_type,
        platform: platform
    }
    const response = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result.map((item:any) => item.category)
}