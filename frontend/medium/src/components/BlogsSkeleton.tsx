export function BlogsSkeleton(){
    return <div>
        <div className="w-full sm:w-1/2 max-w-screen-md cursor-pointer m-auto p-4 border-b-2 max-w-screen-md">
            <div role="status" className=" w-full animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded dark:bg-gray-700 w-1/4 mb-2.5"></div>
                <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-1/3 mb-4"></div>
                <div className="h-2.5 bg-gray-200 rounded dark:bg-gray-700 w-4/5 max-w-[360px] mb-2.5"></div>
                <div className="h-2.5 bg-gray-200 rounded dark:bg-gray-700 w-4/5 mb-2.5"></div>
            </div>
        </div>
    </div>
}
        