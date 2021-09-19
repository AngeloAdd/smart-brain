import React from "react";

const FaceBox = ({ cordinates}) => {
    return (
        <div className="absolute ba bw1 b--blue" 
            style={{
                height: cordinates.height,
                width: cordinates.width, 
                top: cordinates.from_top ,
                left: cordinates.from_left}}
        >
        </div>
    )
}

export default FaceBox