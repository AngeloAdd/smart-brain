import React, {useState} from "react";

const Register = ({ onRouteChange, loadUserData }) => {

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ registerError, setRegisterError ] = useState('')
   
    const onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
            })
        })
        .then( response => response.json())
        .then( data => {
            if(data.success === 'success'){
                loadUserData({
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    rank: data.rank,
                    created_at: data.created_at,
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
                    <label className="db fw6 lh-copy f6" htmlFor="username">Email</label>
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

export default Register