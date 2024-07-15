import {  useNavigate } from "react-router-dom";

export function AppBar() {
    const navigate = useNavigate();
    return <div className="w-full h-16 bg-white border-b-2 flex justify-between ">
        <div className="text-3xl font-bold font-serif flex items-center py-4 px-4">
            <span>Medium</span>
        </div>
        <div className="flex items-center">
            <button className="py-2 px-4 bg-green-600 border rounded-3xl m-2" onClick={()=>navigate('/publish')}>Write</button>
            <div className="mr-6 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">A</span>
            </div>

        </div>

    </div>
}