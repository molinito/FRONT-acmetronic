import React from 'react';
import './Brands.css';
import img from '../../Assets/18.png';
import img1 from '../../Assets/19.png';
import img2 from '../../Assets/25.png';
import img3 from '../../Assets/21.png';



function nyCarousel() {
  return (
      
    <div id="demo" className="carousel slide" data-ride="carousel" style={{width: '80%', height:'100%', margin:"auto"}}>
    <h2>We work with the best brands</h2>

    <div className="carousel-inner" style={{width: '100%', height:'auto', borderRadius: "10px"}}>
  <div className="carousel-item active">
    <img src={img} style={{width: '100%', height:'250px'}}/>
  </div>
  <div className="carousel-item">
    <img src={img1} style={{width: '100%', height:'250px'}}/>
  </div>
  <div className="carousel-item">
    <img src={img2} style={{width: '100%', height:'250px'}}/>
  </div>
  <div className="carousel-item">
    <img src={img3} style={{width: '100%', height:'250px'}}/>
  </div>

    </div>

    <a className="carousel-control-prev" href="#demo"  data-slide="prev">
    <span className="carousel-control-prev-icon" style={{marginTop:"250px", marginRight:"80px"}}></span>
    </a>
    <a className="carousel-control-next" href="#demo" data-slide="next">
    <span className="carousel-control-next-icon" style={{marginTop:"250px", marginLeft:"80px"}}></span>
    </a>
    </div>
      
  );
}





export default nyCarousel;





