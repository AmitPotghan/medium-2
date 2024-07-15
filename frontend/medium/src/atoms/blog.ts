import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";
import { BACKEND_URL } from "../config";


export const blogAtomFamily = atomFamily({
    key:"blogAtomFamily",
    default:selectorFamily({
        key:"blogAtomSelectorFamily",
        get:function (id:string){
            return async()=>{
                try{
                    const response = await axios.get(`${BACKEND_URL}/api/vi/blog/${id}`,{
                        headers:{
                            Authorization:"Bearer "+localStorage.getItem("token")
                        }
                    });
                    console.log(response.data)
                    return response.data;
                }
                catch(e){
                    console.log(e);
                }
            }
        }
    })
})

            