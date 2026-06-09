interface SigninButtonProps {
    event: () => void;
    purpose: string;
}

export function SigninButton({ event, purpose }: SigninButtonProps){
    return(
    <button onClick={event} className="w-15 p-2 rounded-2xl bg-red-500 text-center justify-center hover:scale-110 hover:duration-75 ">
        {purpose}
    </button>
    )
    
};