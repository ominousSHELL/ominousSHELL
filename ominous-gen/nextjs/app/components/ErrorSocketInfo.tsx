export default function ErrorSocketInfo(props:any){
    return (
        <>
            <div className='hidden ip_errors text-center text-lg bg-rose-500 m-2 mx-16'>
                <h1>IP Address should be between 7 and 15 characters long!</h1>
            </div>
            <div className='hidden port_errors text-center text-lg bg-rose-500 m-2 mx-16'>
                <h1>Port should be between 3 and 5 digits long!</h1>
            </div>
        </>
    )
}