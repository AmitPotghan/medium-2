import { useState,ChangeEvent } from "react"

interface textAreaProps {
    placeholder?:string | "";
    className?: string | undefined;
    onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void
}
export function TextArea({placeholder,className,onChange}:textAreaProps){
    const [height, setHeight] = useState('auto');

    const handleChange = (event:ChangeEvent<HTMLTextAreaElement>) => {
      const textarea = event.target;
      textarea.style.height = 'auto'; // Reset the height
      textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scroll height
      setHeight(textarea.style.height); // Update state with the new height
    };
    return <div>
        <textarea 
            id="editor"  
            rows={1}
            onChange={(e)=>{
                handleChange(e)
                onChange(e);
            }} 
            style={{height:height}} 
            className={className} 
            placeholder={placeholder} required ></textarea>
    </div>
}