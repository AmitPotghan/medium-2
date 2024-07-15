import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

 export interface blogsInput{
    id:string,
    title:string,
    content:string,
    author:{
        name:string
    }
    likes:number
    likedBy:{userId:string}[] | []
    createdAt:string
}

export function useBlogs(){
    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<blogsInput[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/vi/blog/bulk`,{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setBlogs(response.data.blogs);
            setLoading(false);
            })
    },[])
    
    return {
        loading,
        blogs
    }
}