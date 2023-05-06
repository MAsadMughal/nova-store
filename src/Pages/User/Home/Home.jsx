// import Navbar from '../../../Components/UserComponents/Navbar/Navbar';
import React from 'react'
import Features from '../../../Components/UserComponents/Features/Features';
import HomeCarousel from '../../../Components/UserComponents/HomeCarousel/HomeCarousel';
import { logogodrej, logococa, logooppo, logopaypal, logophilips, playstore, appstore, logowhite, exclusive } from "../../../assets";
import Socials from '../../../Components/UserComponents/Socials/Socials';
import "./Home.css";
import { motion } from "framer-motion";

const Home = () => {
  return (<>
    {/* <Navbar /> */}
    <HomeCarousel />
    <Features />
    <Socials />
    <div className="row1">
      <div className="col1">
        <img src={exclusive} alt="exclusive" />
      </div>
      <div className="col1" id="col2">
        <h1 className="h2">Smart Band 4</h1>
        <p id="p">Smart Band is one of the most sold <br />product in the market these days. <br />It is worth Buying.</p>
        <button id="but" className="explore"><a className="a" id="as" href="/">Explore</a>
          <h3 className="bu">&#8594;</h3>
        </button>
      </div>
    </div>
    <div className="logos">
      <motion.div>
        <img src={logogodrej} alt="home" />
      </motion.div>
      <motion.div>
        <img src={logococa} alt="home" />
      </motion.div>
      <motion.div>
        <img src={logooppo} alt="home" />
      </motion.div>
      <motion.div>
        <img src={logopaypal} alt="home" />
      </motion.div>
      <motion.div>
        <img src={logophilips} alt="home" />
      </motion.div>
    </div>
    <div className="foot">
      <div className="footer">
        <div className="c2">
          <img className='logowhite' src={logowhite} alt="home" />
        </div>
        <div className="c1">
          <h2 id="fh2">Download our app</h2>
          <p id="fp2"> You can download our android and ios app.</p>
          <img className='c1img' src={playstore} alt="home" />
          <img className='c1img' src={appstore} alt="home" />

        </div>

        <div className="c3">
          <h2 id="fh2">Useful Links</h2>
          <ul id="ul">
            <li className="lis" id="l1">Coupons</li>
            <li className="lis" id="l2">Return Policy</li>
            <li className="lis" id="l3">Blog Posts</li>
            <li className="lis" id="l4">join Affiliate</li>
          </ul>
        </div>

        <div className="c4">
          <h2 id="fh2">Follow Us</h2>
          <ul id="ul">
            <li className="lis" id="l1">Facebook</li>
            <li className="lis" id="l2">Instagram</li>
            <li className="lis" id="l3">Twitter</li>
            <li className="lis" id="l4">Youtube </li>
          </ul>

        </div>
      </div>
      <div className="ft">
        <hr id="lin" />
        <p id="f2">Copyright &#169; 2023 - ASAD ULLAH</p>
      </div>
    </div>
  </>
  )
}

export default Home;