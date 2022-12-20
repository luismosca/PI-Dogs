import React from 'react'
import NavBar from '../Nav/Navbar';
import '../About/about.css'


const About = () => {
    return (
        <><div>
            <NavBar showSearch={false} />
            <h1>About</h1>
        </div>
        <div className="container-about">

            <h1>Projecto Individual</h1>
            <h1>Henry DOGS</h1>
            <h1>Luis Moscarelli</h1>

        </div></>
        
    )
}

export default About

