import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogsSkeleton } from "../components/BlogsSkeleton.tsx";
import { useBlogs } from "../hooks/index.ts";

export function Blogs(){
    const {loading,blogs} = useBlogs();
    
    if(loading){
        return <div>
            <div><AppBar/></div>
            <div>
                <BlogsSkeleton/>
                <BlogsSkeleton/>
                <BlogsSkeleton/>
                <BlogsSkeleton/>
                <BlogsSkeleton/>
            </div>
        </div>
    }
    return <div>
        <div className="max-w-screen-2xl m-auto">
            <AppBar/>
        </div>
        <div>
            {blogs.map(blog => <BlogCard 
                title={blog.title} 
                content={blog.content}
                authorName={blog.author.name} 
                likes={blog.likes}
                likedBy={blog.likedBy}
                id={blog.id} 
                createdAt={blog.createdAt.slice(0,10)}/>)}
        </div>
    </div>  
}