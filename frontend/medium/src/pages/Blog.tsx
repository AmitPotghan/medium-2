import { RecoilRoot, useRecoilValueLoadable } from "recoil";
import { AppBar } from "../components/AppBar";
import { blogAtomFamily } from "../atoms/blog";
import { useParams } from "react-router-dom";


export function Blog() {
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return <div>
            {"Invalid blog ID"}
        </div>
    }
    return <div>
        <RecoilRoot>

            <BlogFetch id={id} />

        </RecoilRoot>
    </div>
}
export function BlogFetch({ id }: { id: string }) {
    let blogLoadable = useRecoilValueLoadable(blogAtomFamily(id));

    if (blogLoadable.state === "loading") {
        return <div>
            Loading...
        </div>
    }
    const blog = blogLoadable.contents;
    return <div>
        <div>
            <AppBar />
        </div>
        <div className="w-full">
            <BlogBody title={blog.title} content={blog.content} createdAt={blog.createdAt} author={{name:blog.author.name}} likes={blog.likes}/>
        </div>
    </div>
}
type blogsBodyProps = {
    id ?: string;
    title: string;
    content: string;
    published?: boolean;
    authorId?: string;
    createdAt: string; // or Date if you want to handle Date objects
    updatedAt?: string; // or Date if you want to handle Date objects
    likes: string; // assuming you want likes as a string
    author: {name:string};
  }
export function BlogBody({ title, content, createdAt, author,likes }: blogsBodyProps) {
    const authorName = author.name;
    return <div>
        <div className="w-full sm:w-1/2 cursor-default m-auto p-4 border-b-2 max-w-screen-md">
            <div className="">
                <div className="">
                    <div className="text-5xl font-bold mb-8">
                        {title}
                    </div>
                    <div className="flex ">
                        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <span className="font-xs font-semibold text-gray-600 dark:text-gray-300">{authorName[0].toUpperCase()}</span>
                        </div>
                        <div className="ml-2.5">
                            <div>{authorName}</div>
                            <div>Published on {createdAt.slice(0,10)}</div>
                        </div>
                    </div>
                    <div className="w-full border-y-2 border-slate-200 mt-4 p-2">
                        {likes} <span className="ml-1">{parseInt(likes) > 1 ? "Likes":"Like"}</span> 
                    </div>
                    <div className="mt-8 text-lg font-Merriweather whitespace-pre-wrap text-customBlack">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    </div>
}