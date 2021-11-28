import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const SignIn = ({ onRouteChange, loadUserData }) => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loginError, setLoginError ] = useState('')

    const onSubmitSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        .then( response => response.json())
        .then( data =>{
            console.log(data)
            if(data.id){
                loadUserData({
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    rank: data.rank,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                })
                onRouteChange('/')
            }  else{
                onLoginError(data)
            }
        })
    }

    const onEmailChange = (event) => setEmail(event.target.value)

    const onPasswordChange = (event) => setPassword(event.target.value)

    const onLoginError = (error) => setLoginError(error)

    return (
        <article className="mw6 center br3 pa4 pa4-ns mv3 ba b--black-10 shadow-5">
            <div className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 center fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3 ph4">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3 ph4">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        {
                            loginError
                                ? <div className="fw5 mt2 red f5">{loginError}</div>
                                : null
                        }    
                    
                    </div>
                </fieldset>
                <div className="w-100 flex justify-center items-center">
                    <button 
                        onClick={onSubmitSignIn}
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

SignIn.propTypes = {
    onRouteChange: PropTypes.func.isRequired,
    loadUserData: PropTypes.func.isRequired,
}

export default SignIn
