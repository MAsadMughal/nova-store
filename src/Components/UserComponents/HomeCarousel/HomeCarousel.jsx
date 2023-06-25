import React from 'react'
import 'bootstrap/js/dist/carousel';
import "./Carousel.scss"
// import { about01, about02, about03, about04 } from "../../assets";


const HomeCarousel = () => {
  return (
    <div id='carousel-main' className='mb-5'>
      <div id="carouselExampleIndicators" className="carousel slide" style={{ height: window.innerWidth>=500?'50vh':'30vh', marginTop: '0px' }} data-bs-ride="carousel" data-bs-interval='1000'>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner" >
          <div className="carousel-item  active">
            <img style={{ height: window.innerWidth>=500?'50vh':'30vh' }} alt='carousel-Img' src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </div>
          <div className="carousel-item ">
            <img style={{ height: window.innerWidth>=500?'50vh':'30vh' }} alt='carousel-Img2' src="https://images.pexels.com/photos/7349260/pexels-photo-7349260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </div>
          <div className="carousel-item ">
            <img style={{ height: window.innerWidth>=500?'50vh':'30vh' }} alt='carousel-Img3' src="https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default HomeCarousel