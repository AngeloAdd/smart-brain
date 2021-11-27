import './App.css';
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar.js'
import SearchBar from './components/SearchBar/SearchBar.js'
import Image from './components/Image/Image.js'
import Rank from './components/Rank/Rank.js'
import Particles from "react-tsparticles";
import particlesOption from './particles.json'
import SignIn from './components/SignIn/SignIn';
import React from 'react';
import Register from './components/Register/Register';
import clarifai from './var/clarifaiApi';
import Profile from './components/Profile/Profile.js'

const App = () => {

  const [ input, setInput ] = useState('')
  const [ imageUrl, setImageUrl ] = useState('')
  const [ boxes, setBoxes ] = useState([])
  const [ route, setRoute ] = useState('signin')
  const [ isSignedIn, setIsSignedIn ] = useState(false)
  const [ user , setUser] = useState({
    id: 0,
    username: '',
    email:'',
    rank:0,
    created_at:'',
  })

  const loadUserData = (user) => {
    setUser(obj => {
      obj.id = user.id
      obj.username = user.username
      obj.email = user.email
      obj.rank = user.rank
      obj.created_at = user.created_at
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
        from_left: `${el.region_info.bounding_box.left_col * 100}%`
        }
      })
    return coordinates
  }

  const onButtonSubmit = () => {
    clarifai.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', input, {video: false})
      .then(setImageUrl(input))
      .then(resp => {
        if(resp) {
          fetch('http://localhost:3000/image',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: user.id,
            })
          })  
          .then( resp => resp.json())
          .then( data => {
            if(data.success === 'success'){
              setUser({...user, rank: parseInt(data.rank)})
            }
          })
        }
        const coordinates = calculateCoordinates(resp)
        setBoxes(coordinates)
      })
      .catch(e => console.log(e));
  }

  const clearInputBar = () => {
    setInput('')
  }

  const clearImage = () => {
    setImageUrl('')
  }

  const onRouteChange = (route) => {
    if(route === 'signout'){
      setRoute('signin')
      setIsSignedIn(false)
      return 
    } else if( route === '/'){
      setIsSignedIn(true)
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
          ? <React.Fragment>
              <Rank user={user}/>
              <SearchBar input={input} clearInputBar={clearInputBar} onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
              <Image clearInputBar={clearInputBar} clearImage={clearImage} boxes={boxes} imageUrl={imageUrl}/>
            </React.Fragment>
          : ( route === 'signin'
              ? <SignIn onRouteChange={onRouteChange} loadUserData={loadUserData} />
              : (route === 'profile/' + user.id 
                  ? <Profile loadUserData={loadUserData} id={user.id} user={user} onRouteChange={onRouteChange}/>
                  : <Register onRouteChange={onRouteChange} loadUserData={loadUserData}/>
                )
            )
      }
    </div>
  );
}

export default App;
