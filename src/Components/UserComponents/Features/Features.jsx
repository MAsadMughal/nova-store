import { motion } from "framer-motion";
import React from 'react';
import { about01, about02, about03, about04 } from "../../../assets";
import "./Features.scss";


const variants = {
    whileInView: {
        scale: 1.10,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    whileHover: {
        scale: 1.20,
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    }
};

const abouts = [
    { title: "Design Implementation", description: "Just Attraction Focused.", img: about01 },
    { title: "Packaging Process", description: "Functionality Centered.", img: about04 },
    { title: "In Time Delivery", description: "Full Fledge Product.", img: about03 },
    { title: "Your Feedbacks", description: "Ratings Driven.", img: about02 }];


const Features = () => {
    return (
        <>
            <motion.h2 whileInView={{ opacity: 1 }} className='head-text'>
                <span>Passion</span>&nbsp;=
                <span>&nbsp;Product</span>
            </motion.h2>


            <div className="app__profiles container">
                {abouts.map((item, ind) =>
                    <motion.div whileHover="whileHover" whileInView="whileInView" variants={variants} transition={{ type: "tween", duration: 0.5 }} className="app__profiles-item" key={ind} >
                        <img src={item.img} alt="asad" />
                        <p className='bold-text' style={{ marginTop: 20 }}>{item.title}</p>
                        <p className='p-text' style={{ marginTop: 10 }}>{item.description}</p>
                    </motion.div>
                )}
            </div>
        </>
    )
}

export default Features