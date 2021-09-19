import React from "react";
import './SignIn.css'


const SignIn = ({ onRouteChange }) => {
    return (
        <article className="mw6 center br3 pa4 pa5-ns mv3 ba b--black-10 shadow-5">
            <div className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 center fw6 ph0 mh0">Sign In</legend>
                <div className="mt3 ph4">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                </div>
                <div className="mv3 ph4">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                </div>
                </fieldset>
                <div className="w-100 flex justify-center items-center">
                    <button 
                        onClick={() => onRouteChange('/')}
                        className="center b ph3 pv2 button-reset ba b--black bg-transparent grow pointer f5 dib"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
                <div className="lh-copy w-100 flex justify-center mt3">
                    <button onClick={() => onRouteChange('register')} className="f6 link dim black db bg-transparent button-reset">Register</button>
                </div>
            </div>
        </article>
    )
}

export default SignIn