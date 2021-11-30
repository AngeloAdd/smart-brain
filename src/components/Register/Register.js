import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Register = ({ onRouteChange, smartBrainFetch, loadUserData }) => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ registerError, setRegisterError ] = useState('')
   
    const onSubmitRegister = () => {
        smartBrainFetch('user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })
        .then( response => response.json())
        .then( data => {
            if(Array.isArray(data) && data.length && data[0].id){
                const user = data[0]
                loadUserData({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    rank: user.rank,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                })
                onRouteChange('/')
            } 
            else {
                onRegisterError(data)
            } 
        }) 
    }

    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onRegisterError = (error) => setRegisterError(error)

    return (
        <article className="mw6 center br3 pa4 pa5-ns mv3 ba b--black-10 shadow-5">
            <div className="measure center">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 center fw6 ph0 mh0">Register</legend>
                    <div className="mt3 ph4">
                        <label className="db fw6 lh-copy f6" htmlFor="username">Username</label>
                        <input onChange={onUsernameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="username"  id="username" />
                    </div>
                    <div className="mt3 ph4">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input onChange={onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    {
                        registerError === 'Email already present'
                            ? <div className="fw5 mt2 red f5">{registerError}</div>
                            : null
                    }    
                    <div className="mv3 ph4">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input onChange={onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        {
                            registerError
                                ? <div className="fw5 mt2 red f5">{registerError}</div>
                                : null
                        }   
                    </div>
                </fieldset>
                <div className="w-100 flex justify-center items-center">
                    <button 
                        onClick={onSubmitRegister}
                        className="center b ph3 pv2 button-reset ba b--black bg-transparent grow pointer f5 dib"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </div>
        </article>
    )
}

Register.propTypes = {
    onRouteChange: PropTypes.func.isRequired,
    smartBrainFetch: PropTypes.func.isRequired,
    loadUserData: PropTypes.func.isRequired,
}

export default Register
