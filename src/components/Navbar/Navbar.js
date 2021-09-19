import React from "react";
import Logo from '../Logo/Logo.js'

const Navbar = ( { onRouteChange, isSignedIn } ) => {
    return (
        <div className="flex justify-between pt4 ph4">
            
            <Logo />
            <div className="m0">

                { isSignedIn 
                    ?   <button onClick={() => onRouteChange('signout')} className="link button-reset bg-transparent dim black mr4 b f4">
                            Sign Out
                        </button>
                    : ( <React.Fragment>
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