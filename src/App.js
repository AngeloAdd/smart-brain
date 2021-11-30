import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import SearchBar from './components/SearchBar/SearchBar'
import Image from './components/Image/Image'
import Rank from './components/Rank/Rank'
import Particles from 'react-tsparticles'
import particlesOption from './particles.json'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import fetchAbsolut from './utilities/fetchAbsolut'

const App = () => {
    const [ input, setInput ] = useState('')
    const [ imageUrl, setImageUrl ] = useState('')
    const [ boxes, setBoxes ] = useState([])
    const [ route, setRoute ] = useState('signin')
    const [ isSignedIn, setIsSignedIn ] = useState(false)
    const [ user, setUser ] = useState({
        id: 0,
        username: '',
        email:'',
        rank:0,
        created_at:'',
        updated_at:'',
    })

    const smartBrainFetch = fetchAbsolut('http://localhost:3000/')

    const clearAppState = () => {
        clearInputBar()

        clearImage()

        setBoxes([])
        
        setUser({
            id: 0,
            username: '',
            email:'',
            rank:0,
            created_at:'',
            updated_at:'',
        })

        setRoute('signin')
            
        setIsSignedIn(false)
    }

    const loadUserData = (user) => {
        setUser(obj => {
            obj.id = user.id
            obj.username = user.username
            obj.email = user.email
            obj.rank = user.rank
            obj.created_at = user.created_at
            obj.updated_at = user.updated_at
            return obj
        })
    }

    const onInputChange = (event) => {
        setInput(event.target.value)
    }

    const calculateCoordinates = (data) => {
        const coordinates = data.outputs[0].data.regions.map(el => {
            return {
                height: `${(el.region_info.bounding_box.bottom_row - el.region_info.bounding_box.top_row) * 100}%`,
                width: `${(el.region_info.bounding_box.right_col - el.region_info.bounding_box.left_col) * 100}%`,
                from_top: `${el.region_info.bounding_box.top_row * 100}%`,
                from_left: `${el.region_info.bounding_box.left_col * 100}%`,
            }
        })
        return coordinates
    }

    const onButtonSubmit = () => {
        smartBrainFetch('image/show', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input: input,
            }),
        })
            .then(setImageUrl(input))
            .then(resp => {
                if(resp) {
                    smartBrainFetch('user/update/rank', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: user.id,
                        }),
                    })  
                    .then( resp => resp.json())
                    .then( data => {
                        if(data.rank){
                            setUser({ ...user,
                                rank: parseInt(data.rank) })
                        }
                    })
                    .catch(e => console.log(e))
                }

                const coordinates = calculateCoordinates(resp)

                setBoxes(coordinates)
            })
            .catch(e => console.log(e))
    }

    const clearInputBar = () => setInput('')

    const clearImage = () => setImageUrl('')

    const onRouteChange = (route) => {
        if(route === 'signout'){
            clearAppState()

            return 
        } else if( route === '/'){
            if(user.id !== 0){
                setIsSignedIn(true)
            } else{
                setRoute('signin')

                setIsSignedIn(false)

                return
            }
        }
        setRoute(route)
    }

    return (
        <div>
            <Particles
                id="tsparticles"
                options={ particlesOption }
            />
            <Navbar isSignedIn={isSignedIn} onRouteChange={onRouteChange} id={user.id} />
            { route === '/'
                ? <>
                    <Rank user={user}/>
                    <SearchBar input={input} clearInputBar={clearInputBar} onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
                    <Image clearInputBar={clearInputBar} clearImage={clearImage} boxes={boxes} imageUrl={imageUrl}/>
                </>
                : ( route === 'signin'
                    ? <SignIn smartBrainFetch={smartBrainFetch} onRouteChange={onRouteChange} loadUserData={loadUserData} />
                    : (route === 'profile/' + user.id 
                        ? <Profile loadUserData={loadUserData} smartBrainFetch={smartBrainFetch} id={user.id} user={user} onRouteChange={onRouteChange}/>
                        : <Register onRouteChange={onRouteChange} smartBrainFetch={smartBrainFetch} loadUserData={loadUserData}/>
                    )
                )
            }
        </div>
    )
}

export default App
