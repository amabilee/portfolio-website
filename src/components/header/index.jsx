import React, { useState, useEffect } from 'react';
import './style.scss';

// Content
import Portuguese from '../../mocks/portuguese.json'
import English from '../../mocks/english.json'

function header_component() {
  const [data, setData] = useState(English);

    useEffect(() => {
        const userLanguage = navigator.language || navigator.languages[0];
        if (userLanguage.startsWith('en')) {
            setData(English);
        } else if (userLanguage.startsWith('pt')) {
            setData(Portuguese);
        } else {
            setData(English);
        }
    }, []);

  const scrollOffsets = {
    section1: 100,
    section2: 0,
    section3: -200,
    section4: -800,
    default: -1000
  };

  const handleScrollTo = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const offset = scrollOffsets[sectionId] ?? scrollOffsets.default;
    const position = section.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  };


  return (
    <div className="header-container">
      <p className='notranslate'>Amábile <span>Zucchetti</span></p>
      <div className="navigation-box">
        <p className='notranslate' onClick={() => handleScrollTo('section1')}>{data.header.home}</p>
        <p onClick={() => handleScrollTo('section2')}>{data.header.capabilities}</p>
        <p onClick={() => handleScrollTo('section3')}>{data.header.experience}</p>
        <p onClick={() => handleScrollTo('section4')}>{data.header.projects}</p>
      </div>
    </div>
  );
}

export default header_component;
