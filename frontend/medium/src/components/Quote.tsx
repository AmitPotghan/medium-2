type InputsProps = {
    quote:string,
    writer:string,
    label:string
}
export function Quote({quote,writer,label}:InputsProps){
    return <div className=" h-screen p-20 flex justify-center items-center">
        <div className="">
            <div className="font-bold text-2xl">{quote}</div>
            <div className="mt-2 ">
                <p className="font-bold">{writer}</p>
                <p className="text-xs text-gray-600">{label}</p>
            </div>
        </div>
    </div>
}