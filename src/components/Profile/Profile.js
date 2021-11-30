import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const Profile = ({ id, smartBrainFetch, loadUserData, onRouteChange, user }) => {
    useEffect( () => {
        smartBrainFetch('user/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then( response => response.json())
        .then( data => {
            if(data.id){
                loadUserData({
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    rank: data.rank,
                    created_at: data.created_at,
                })
            }  else{
                onRouteChange('/')
            }
        })
    }, [loadUserData, onRouteChange, id])
    
    return (
        <div  className="flex flex-column justify-center items-center mv2 w-100">
            <p className="mb0 f3 white">
                {user.username}
            </p>
            <p className="mb0 f3 white">
                {user.email}
            </p>
            <p className="mb0 f3 white">
                {user.created_at}
            </p>
            <p className="bg-animate white hover-bg-moon-gray hover-black f3 ba br-100 pa2">
                {'#' + user.rank}
            </p>
        </div>
    )
}

Profile.propTypes = {
    id: PropTypes.string, 
    smartBrainFetch: PropTypes.func.isRequired,
    loadUserData: PropTypes.func.isRequired,
    onRouteChange:PropTypes.func.isRequired,
    user: PropTypes.object.isRequired, 
}

export default Profile
