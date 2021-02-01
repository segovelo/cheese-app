import React, {useState} from 'react';
import {FaArrowCircleUp} from 'react-icons/fa';
import {RiArrowUpCircleFill} from 'react-icons/ri';
import {FcUp} from 'react-icons/fc';
import {ImArrowUp} from 'react-icons/im';
import './scrollArrow.css';

const ScrollArrow = () =>{

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 200){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
        <FaArrowCircleUp className="scrollTop" onClick={scrollTop} style={{display: showScroll ? 'flex' : 'none'}}/>
  );
}

export default ScrollArrow;