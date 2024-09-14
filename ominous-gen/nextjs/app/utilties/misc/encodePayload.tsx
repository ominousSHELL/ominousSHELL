export default function encodePayload(type:string, data:any, base64:boolean, url:boolean){
    switch(type){
        case 'base64':
            if (base64){
                return btoa(data) 
            }
        case 'url':
            if (url){
                return encodeURIComponent(data)
            }
    }
    return data
}