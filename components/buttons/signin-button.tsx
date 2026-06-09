export function SigninButton(props:any){
    return(
    <button onClick={props.event} className="w-15 p-2 rounded-2xl bg-red-500 text-center justify-center hover:scale-110 hover:duration-75 ">
        {props.purpose}
    </button>
    )
    
};