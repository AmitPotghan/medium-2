import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    createdAt: string,
    id: string
    likes:number
    likedBy:{userId:string}[] | []
}
export function BlogCard({ authorName, title, content, createdAt, id ,likes,likedBy}: BlogCardProps) {
    const [heart,setHeart] = useState(likes);
    const [likeState,setLikeState] = useState(likedBy[0] ? true:false);
  
    const likesHandler = async()=>{
        if (likeState){
            setLikeState(false);
            setHeart(heart-1);
        }else{
            setLikeState(true);
            setHeart(heart+1);
        }

        axios.put(`${BACKEND_URL}/api/vi/blog/likes`,{
                postId:id
            },
            {headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }
        })
    }
    return <div className=" w-full sm:w-1/2  cursor-pointer m-auto p-4 border-b-2 max-w-screen-md font-Merriweather">
        <Link to={`/blog/${id}`}>
            <div className="flex ">
                <Avatar authorName={authorName} />
                <div className="ml-2">{authorName}</div>
                <div className="text-gray-600 font-normal ml-2">{createdAt}</div>
            </div>
            <div className="font-extrabold text-xl mt-2">
                {title}
            </div>
            <div className="mt-2">
                {content.slice(0, 200) + "..."}
            </div>
        </Link>
        <div className="mt-4 flex text-sm">
            <div className="">{`${Math.ceil(content.length /200)} min read`}</div>
            <div className="ml-4" onClick={likesHandler}>
                {heart} {heart === 1 ? "like":"likes"} 
            </div>
        </div>
        
    </div>
}
type authorNameProps = {
    authorName: string;
}
export function Avatar({ authorName }: authorNameProps) {
    return <div>
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-xs font-semibold text-gray-600 dark:text-gray-300">{authorName[0].toUpperCase()}</span>
        </div>
    </div>
}