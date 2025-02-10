import React, { useState, useEffect } from 'react'
import './style.scss'

// Assets
import BrazilianFlag from '../../assets/images/brazilian_flag.svg'
import LinkedinLogo from '../../assets/images/linkedin.svg'
import GithubLogo from '../../assets/images/github.svg'
import MailLogo from '../../assets/images/mail.svg'

import Portuguese from '../../mocks/portuguese.json'
import English from '../../mocks/english.json'


function footer_component() {
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

  return (
    <>
      <div className='footer-column'>
        <a href="/amabile_zucchetti_resume.pdf" download className="download-button">
          <button>{data.footer.resume}</button>
        </a>
        <div className="social-media">
          <a href="https://www.linkedin.com/in/amabilezucchetti" target="_blank" rel="noopener noreferrer">
            <img src={LinkedinLogo} alt="LinkedIn Logo" />
          </a>
          <a href="https://github.com/amabilee" target="_blank" rel="noopener noreferrer">
            <img src={GithubLogo} alt="GitHub Logo" />
          </a>
          <a href="mailto:amabilezucchetti@proton.me">
            <img src={MailLogo} alt="Mail Logo" />
          </a>
        </div>
      </div>
      <div className="footer-container">
        <div className='footer-column'>
          <p className='notranslate'>Amábile <span>Zucchetti</span></p>
          <div className="inside-line">
            <div>
              <img src={BrazilianFlag} alt='Brazilian Flag' />
              <p>{data.footer.based}</p>
            </div>
            <p>© 2025 - {data.footer.present}</p>
          </div>
        </div>
        <div className='footer-column'>
          <div className="divider-line"></div>
          <a href="https://www.linkedin.com/in/amabilezucchetti" target="_blank" rel="noopener noreferrer">
            <img src={LinkedinLogo} alt="LinkedIn Logo" />
          </a>
          <a href="https://github.com/amabilee" target="_blank" rel="noopener noreferrer">
            <img src={GithubLogo} alt="GitHub Logo" />
          </a>
          <a href="mailto:amabilezucchetti@proton.me">
            <img src={MailLogo} alt="Mail Logo" />
          </a>
          <div className="divider-line"></div>
        </div>

        <div className='footer-column'>
          <a href="/amabile_zucchetti_resume.pdf" download className="download-button">
            <button>{data.footer.resume}</button>
          </a>
        </div>
      </div>
    </>
  )
}

export default footer_component