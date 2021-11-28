import React from 'react'
import PropTypes from 'prop-types'

const FaceBox = ({ cordinates}) => {
    return (
        <div className="absolute ba bw1 b--blue" 
            style={{
                height: cordinates.height,
                width: cordinates.width, 
                top: cordinates.from_top,
                left: cordinates.from_left}}
        >
        </div>
    )
}

FaceBox.propTypes = {
    cordinates: PropTypes.object.isRequired,
}

export default FaceBox
