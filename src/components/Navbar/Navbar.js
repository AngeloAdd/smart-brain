import React from "react";
import Logo from '../Logo/Logo.js'

const Navbar = ( { onRouteChange, isSignedIn, id } ) => {
    return (
        <div className="flex justify-between pt4 ph4">
            
            <Logo />
            <div className="m0">

                { isSignedIn 
                    ?   (
                            <React.Fragment>
                                <button onClick={() => onRouteChange('signout')} className="link button-reset bg-transparent dim black mr4 b f4">
                                    Sign Out
                                </button>
                                <button onClick={() => onRouteChange('profile/' + id)} className="link button-reset bg-transparent dim black mr4 b f4">
                                    Profile
                                </button>
                            </React.Fragment>
                        )
                    :   ( 
                        <React.Fragment>
                            <button onClick={() => onRouteChange('signin')} className="link button-reset bg-transparent dim black mr4 b f4">
                                Sign In
                            </button>
                            <button onClick={() => onRouteChange('register')} className="link button-reset bg-transparent dim black mr4 b f4">
                                Register
                            </button>
                        </React.Fragment>
                        )
                }
            </div>

        </div>
    )
}

export default Navbar