import PropTypes from 'prop-types'
import ReactParallaxTilt from 'react-parallax-tilt'
import brain from './brain.png'

const Logo = ({onRouteChange}) => {
    return (
        <ReactParallaxTilt options={{ tiltMaxAngleX: -55,
            tiltMaxAngleY: -55 }} className="w-10 pa2 br2 shadow-3 bg-logo">
            <img className="pointer" onClick={() => onRouteChange('/')} src={brain} alt="brain"/>       
        </ReactParallaxTilt>
    )
}

Logo.propTypes = {
    onRouteChange: PropTypes.func.isRequired,
}

export default Logo
