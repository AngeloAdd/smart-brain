import React from 'react'
import PropTypes from 'prop-types'
import './Image.css'
import FaceBox from '../FaceBox/FaceBox.js'

const Image = ({ imageUrl, boxes, clearImage, clearInputBar }) => {
    return (
        <div  className="flex justify-center mt2 w-100">
            <div className="relative">
                {
                    imageUrl !== '' &&
                    <button onClick={() => {clearImage(); clearInputBar()}} className="button-reset absolute bg-transparent btn-clear">
                        <i className="fas fa-times-circle f3 dark-blue">
                        </i>
                    </button>
                }

                <img alt='' height="auto" width="500px"  src={imageUrl} />
                
                { 
                    boxes.map((el, index) => {
                        return <FaceBox key={index} cordinates={ el } />
                    })
                }
            </div>
        </div>
    )
}

Image.propTypes = {
    imageUrl: PropTypes.string,
    boxes: PropTypes.array,
    clearImage: PropTypes.func.isRequired,
    clearInputBar: PropTypes.func.isRequired,
}

export default Image
