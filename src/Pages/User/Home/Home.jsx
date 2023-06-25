// import Navbar from '../../../Components/UserComponents/Navbar/Navbar';
import React, { useEffect, useState, useContext, useRef } from 'react'
import Features from '../../../Components/UserComponents/Features/Features';
import HomeCarousel from '../../../Components/UserComponents/HomeCarousel/HomeCarousel';
import { logogodrej, logococa, logooppo, logopaypal, logophilips, playstore, appstore, logowhite, exclusive } from "../../../assets";
import Socials from '../../../Components/UserComponents/Socials/Socials';
import "./Home.css";
import { motion } from "framer-motion";
import Product from '../Products/Product';
import axios from 'axios'
import { ReactNotifications } from 'react-notifications-component';
import ProductContext from '../../../context/Product/ProductContext';
import Notification from '../../../Components/utils/Notifications/Notifications';
import Loader from '../../../Components/utils/Loader/Loader';
import { useSpeechContext } from '@speechly/react-client';
import MicNone from '@mui/icons-material/MicNone'
import MicOff from '@mui/icons-material/MicOff'
import UserContext from '../../../context/User/UserContext';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const Home = () => {
  const { user } = useContext(UserContext);
  const scrollRef = useRef(null);
  const { addToCart } = useContext(ProductContext)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [proFor, setProFor] = useState("");
  const { listening, segment, attachMicrophone, start, stop } = useSpeechContext();

  const handleClick = async () => {
    scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
    try {
      if (listening) {
        await stop();
      } else {
        clearFilters();
        // setLoading(true)
        await attachMicrophone();
        await start();
        setTimeout(async () => {
          await stop();
        }, 7000);
      }
    } catch (error) {
      if (error.toString().includes('Microphone consent is not given')) {
        alert('Microphone permission not allowed by browser. Turn it on First.')
      } else if (error.toString().includes('code: 1006')) {
        Notification('Error', 'No Connection', 'danger');
      } else {
        Notification('Error', error.toString(), 'danger');
      }
      await stop();
      setLoading(false)
    }
  };

  useEffect(() => {
    if (segment) {
      setLoading(false)
      const sentence = new Array();
      segment?.words?.forEach((i) => {
        sentence.push(i.value);
      })
      setCurr(sentence.join(' '))
      setFilters(sentence);
    }
  }, [segment]);


  useEffect(() => {
    getProducts();
    getCategories();
  }, [])

  const getCategories = async () => {
    setLoading(true)
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories`);
    const b = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/brands`);
    const c = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/colors`);
    setCategories(data);
    setBrands(b?.data);
    setColors(c?.data);
    setLoading(false)
  }

  const getProducts = async () => {
    setLoading(true)
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products`);
    setAllProducts(data);
    setProducts(data);
    setLoading(false);
  }




  const [curr, setCurr] = useState('')

  const cartAddition = async (id, q, col) => {
    setLoading(true)
    await addToCart(id, q, col);
    setLoading(false)
    Notification('Success', 'Product Added to Cart Successfully', 'success');
  }


  useEffect(() => {
    const colorful = color ? colors.find((i) => i._id === color) : null;
    const filteredProducts = allProducts.filter((product) => {
      const filter1 = keyword ? product?.name?.toLowerCase().includes(keyword?.toLowerCase()) || product?.description.toLowerCase().includes(keyword?.toLowerCase()) : true;
      const filter2 = proFor ? product?.proFor.toLowerCase() === proFor.toLowerCase() : true;
      const filter3 = category ? product?.category?._id.toLowerCase() === category.toLowerCase() : true;
      const filter4 = brand ? product?.brand?._id.toLowerCase() === brand.toLowerCase() : true;
      const filter5 = color ? product?.colors?.some((i) => i.name.includes(colorful?.name) || colorful?.name?.includes(i?.name)) : true;
      return filter1 && filter2 && filter3 && filter4 && filter5;
    });
    setProducts(filteredProducts);
  }, [category, brand, proFor, color, keyword])


  const setFilters = (sentence) => {
    sentence.forEach((word) => {
      const lowercaseWord = word.toLowerCase();

      if (['boys', 'men', , 'man', 'boy', 'gent', 'gents'].includes(lowercaseWord)) {
        setProFor('Men');
        return;
      }
      else if (['girls', 'women', 'ladies', 'lady', 'girl', 'woman'].includes(lowercaseWord)) {
        setProFor('Women');
        return;
      } else if (['children', 'child', 'kids', 'kid', 'toddler', 'toddlers'].includes(lowercaseWord)) {
        setProFor('Kids');
        return;
      }


      const categoryMatch = categories.find((category) => (category.name === lowercaseWord) || (category.name === (lowercaseWord + 's')) || (category.name === lowercaseWord + 'es') || (category.name === (lowercaseWord.slice(0, -1) + lowercaseWord + 'ies')));
      if (categoryMatch) {
        setCategory(categoryMatch?._id);
        return;
      }

      const brandMatch = brands.find((brand) => brand?.name === lowercaseWord);
      if (brandMatch) {
        setBrand(brandMatch?._id);
        return;
      }

      let colorMatch = colors.find((color) => color?.name === lowercaseWord);
      if (!colorMatch) {
        colorMatch = colors.find((color) => color?.name?.includes(lowercaseWord) || lowercaseWord?.includes(color?.name));
      }
      if (colorMatch) {
        setColor(colorMatch?._id);
        return;
      }
    });
  }
  const clearFilters = () => {
    setCategory(''); setBrand(''); setProFor(''); setColor(''); setKeyword(''); setCurr('');
  }

  return (<>
    {/* <Navbar /> */}
    <ReactNotifications />
    <HomeCarousel />
    {/* <Features /> */}
    <Socials />
    {/* <div className="row1">
      <div className="col1">
        <img src={exclusive} alt="exclusive" />
      </div>
      <div className="col1" id="col2">
        <h1 className="h2">Smart Band 4</h1>
        <p id="p">Smart Band is one of the most sold <br />product in the market these days. <br />It is worth Buying.</p>
        <Link to={user?.success && user?.loggedInUser.isAdmin === false ? '/products' : '/login'}>
          <button id="but" className="explore">Explore
            <h3 className="bu">&#8594;</h3>
          </button>
        </Link>
      </div>
    </div> */}
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

    <div ref={scrollRef}></div>

    {curr && <h1 className="gradient-text">{curr}</h1>}
    <div className={`mic-container ${listening && 'recording'} border-black`} onClick={handleClick}>{listening ? <MicOff fontSize='large' className='mic-icon' /> : <MicNone fontSize='large' className='mic-icon' />}</div>

    <div className='d-flex p-4'>
      <input type="text" placeholder='Search Your Products' onChange={(e) => setKeyword(e.target.value)} className='signupInput' />
    </div>



    <div className='d-flex p-4 justify-content-lg-evenly flex-wrap flex-md-nowrap'>
      <select className='signupInput' name='proFor' onChange={(e) => setProFor(e.target.value)} value={proFor}>
        <option value="" >Product For</option>
        {['Men', 'Women', 'Kids']?.map((i, k) => { return (<option key={k} value={i}>{i}</option>) })}
      </select>

      <select className='signupInput ms-sm-0 ms-md-1' name='category' onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="" >Category</option>
        {categories?.map((i, k) => { return (<option key={k} value={i?._id}>{i?.name}</option>) })}
      </select>

      <select className='signupInput ms-sm-0 ms-md-1 ' name='brand' onChange={(e) => setBrand(e.target.value)} value={brand}>
        <option value="" >Brand</option>
        {brands?.map((i, k) => { return (<option key={k} value={i?._id}>{i?.name}</option>) })}
      </select>

      <select className='signupInput ms-sm-0 ms-md-1' name='color' onChange={(e) => setColor(e.target.value)} value={color}>
        <option value="" >Color</option>
        {colors?.map((i, k) => { return (<option key={k} value={i?._id}>{i?.name}</option>) })}
      </select>
      <button className='btn btn-info ms-sm-0 ms-md-2 btn-sm text-light mt-2 w-50' onClick={clearFilters}>Clear</button>
    </div>
    {loading ? <Loader /> :
      <div className='d-flex flex-wrap align-items-center'>
        {products && products?.map((item, ind) => {
          return (item?.stock >= 1 && <Product cartAddition={cartAddition} key={ind} product={item} />)
        })}
      </div>
    }





  </>
  )
}

export default Home;