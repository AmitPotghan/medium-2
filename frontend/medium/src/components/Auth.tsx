import { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userSignUpBody } from "@amitpotghan/medium";
import axios from "axios";
import { BACKEND_URL } from "../config.ts";

interface authType{
    type:"signup" | "signin";
}
export function Auth({type}:authType){
    const navigate = useNavigate();
    const [postInput,setPostInput] = useState<userSignUpBody>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/vi/user/${type === "signup" ? "signup":"signin"}`,postInput);
            const jwt = response.data.token;
            localStorage.setItem('token',jwt);
            navigate('/blogs');
        }catch(e){
            alert("Error While Signing Up");
        }
    }
    return <div className="flex justify-center items-center flex-col h-screen w-full ">
        
        <div className="flex justify-center items-center flex-col border border-4 border-gray-100 bg-white p-4">
            <div className="text-3xl font-extrabold">
                {type === "signup" ? "Create An Account" : "Welcome,Back Login"}
            </div>
            <div className="text-base text-gray-600 flex">
                <div>{type === "signup" ? "Already have an Account?" :"Doesn't have an Account?"}</div>
                <div className="pl-2.5 underline">
                    <Link to={type === "signup" ? "/signin" :"/signup"}>{type === "signup" ? "signin" :"signup"}</Link>
                </div>
            </div>
            <div className="w-full mt-4">
                {type === "signup" ? <InputBox label={"Username"} placeholder="AmitPotghan" onChange={(e)=>{
                    setPostInput({
                    ...postInput,
                    name:e.target.value
                    })
                }}/> : null} 
                <InputBox label={"Email"} placeholder="amitpotghan70@gmail.com" onChange={(e)=>{
                    setPostInput({
                    ...postInput,
                    email:e.target.value
                    })
                }}/>
                <InputBox label={"Password"} type={"password"} placeholder="Password" onChange={(e)=>{
                    setPostInput({
                    ...postInput,
                    password:e.target.value
                    })
                }}/>
            </div>
            <button onClick = {sendRequest} className="w-full mt-6 bg bg-lime-500 p-2 border rounded-xl font-semibold">{type === "signup" ?" Create Account" :"Login" }</button>
        </div>
    </div>
}
interface InputBoxType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string;
}
function InputBox({label,onChange,placeholder,type}:InputBoxType){
    return <div>
        <div className="pt-2.5">
            <label className="block mb-2 text-xl font-medium text-gray-900">{label}</label>
            <input onChange={onChange} type={ type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    </div>
}