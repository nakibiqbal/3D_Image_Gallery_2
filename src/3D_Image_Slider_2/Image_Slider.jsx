import { useRef, useState } from "react";
import "./Image_Slider.css";
import { Data } from "./Images_Data/Images_Data";
import Images from "./Animation_Logics/Images";

const Image_Slider = () => {
    const [imgData] = useState(Data)
    const parentRef = useRef(null);

    return (
        <>

            <section ref={parentRef} id="imgSection">

                <div className="imgContainer">

                    <div className="imgWrapper">

                        {
                            imgData.map(({ src }, index) => {
                                return (
                                    <Images key={index} src={src} parentRef={parentRef} index={index} />
                                )
                            })
                        }

                    </div>

                </div>

            </section>

        </>
    )
}
export default Image_Slider;