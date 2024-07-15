import { AppBar2 } from "../components/AppBar2"
import { TextArea } from "../components/TextArea"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config";
import { createBlogPost } from "@amitpotghan/medium";

export function Publish(){
    const [publishInput,setPublishInput] = useState<createBlogPost>({
        title:"",
        content:""
    })
    const navigate = useNavigate();

    async function publishHandler(){
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/vi/blog`,
                publishInput,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer "+localStorage.getItem("token") 
                    }
                }
            );
            console.log(response)
            navigate('/blogs')

        } catch (error) {
            console.error('Error publishing blog:', error);
        }
    }
    return <div>
        <div className="max-w-screen-2xl m-auto">
            <AppBar2 handler={publishHandler}/>
        </div>
        <div className="flex justify-center items-center">
            <div className=" w-full px-5 font-medium font-Merriweather text-customBlack max-w-screen-md">
                <div className="font-bold">
                    <TextArea onChange={(e)=>{
                    setPublishInput({
                    ...publishInput,
                    title:e.target.value
                    })
                }} placeholder="Title" className="p-2 w-full resize-none text-4xl focus:outline-none"/>
                </div>
                <TextArea onChange={(e)=>{
                    setPublishInput({
                    ...publishInput,
                    content:e.target.value
                    })
                }} placeholder="Tell Your Story..." className="block w-full text-xl font-Merriweather text-customBlack whitespace-pre-wrap p-2 text-sm text-gray-800 resize-none bg-white focus:outline-none"/>
            </div>
        </div>
        
    </div>
}