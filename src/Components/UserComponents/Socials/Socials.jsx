import React from 'react'
import "./Socials.scss"
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs"
const Socials = () => {
    return (
        <div className="app__social">
            <div className='twitter'>
                <BsTwitter />
            </div>
            <div className='fb'>
                <BsFacebook />
            </div>
            <div className='insta'>
                <BsInstagram />
            </div>
        </div>)
}

export default Socials