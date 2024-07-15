import { Quote } from "../components/Quote"
import { Auth }  from "../components/Auth"
export function Signup(){
    console.log();
    return <div className="bg-customWhite">
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div >
                <Auth type="signup"/>
            </div>
            <div className="invisible lg:visible bg-customYellow">
                <Quote quote={'"The Customer Service I received was exceptional.The support team went above and beyond to address my concers"'} writer={"Jules Winnfields"} label="CEO, Acma inc"/>
            </div>
        </div>
    </div>
}
