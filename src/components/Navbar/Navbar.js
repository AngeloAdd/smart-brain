import React from 'react'
import PropTypes from 'prop-types'
import Logo from '../Logo/Logo.js'

const Navbar = ( { onRouteChange, isSignedIn, id } ) => {
    return (
        <div className="flex justify-between pt4 ph4">
            
            <Logo onRouteChange={onRouteChange} />
            <div className="m0">

                { isSignedIn 
                    ?   (
                        <>
                            <button onClick={() => onRouteChange('signout')} className="link button-reset bg-transparent dim black mr4 b f4">
                                    Sign Out
                            </button>
                            <button onClick={() => onRouteChange('profile/' + id)} className="link button-reset bg-transparent dim black mr4 b f4">
                                    Profile
                            </button>
                        </>
                    )
                    :   ( 
                        <>
                            <button onClick={() => onRouteChange('signin')} className="link button-reset bg-transparent dim black mr4 b f4">
                                Sign In
                            </button>
                            <button onClick={() => onRouteChange('register')} className="link button-reset bg-transparent dim black mr4 b f4">
                                Register
                            </button>
                        </>
                    )
                }
            </div>

        </div>
    )
}

Navbar.propTypes = {
    onRouteChange: PropTypes.func.isRequired,
    isSignedIn: PropTypes.bool.isRequired,
    id: PropTypes.number,
}

export default Navbar
