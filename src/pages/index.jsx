import { useEffect, useState } from 'react';
import './style.scss';


// Assets
import LinkedInIcon from '../assets/images/linkedin.svg'
import GithubIcon from '../assets/images/github.svg'
import MailIcon from '../assets/images/mail.svg'
import ResumeIcon from '../assets/images/resume.svg'
import BrazilianFlag from '../assets/images/brazilian_flag.svg'
import UnitedKingdomFlag from '../assets/images/united_kingdom_flag.svg'
import ItalyFlag from '../assets/images/italy_flag.svg'



//Content
import Portuguese from '../mocks/portuguese.json'
import English from '../mocks/english.json'
import Italian from '../mocks/italian.json'

function MainPage() {
    const [data, setData] = useState(Italian);

    useEffect(() => {
        const userLanguage = navigator.language || navigator.languages[0];
        if (userLanguage.startsWith('en')) {
            setData(English);
        } else if (userLanguage.startsWith('pt')) {
            setData(Portuguese);
        } else if (userLanguage.startsWith('it')) {
            setData(Italian);
        } else {
            setData(English);
        }
    }, []);

    const changeLanguage = (language) => {
        switch (language) {
            case 'pt':
                setData(Portuguese);
                break
            case 'en':
                setData(English);
                break
            case 'it':
                setData(Italian);
                break
            default:
                setData(English);
                break
        }
    }

    return (
        <div className="body-container">
            <div className="header">
                <div className="header_left">
                    <h1>amabile zucchetti</h1>
                    <p>{data.header.local}</p>
                </div>
                <div className="header_right">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.open("https://github.com/amabilee", "_blank");
                        }}
                    >
                        github
                        <div className="text_container">
                            <img src={GithubIcon} />
                        </div>
                    </a>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.open("https://www.linkedin.com/in/amabilezucchetti", "_blank");
                        }}
                    >
                        linkedin
                        <div className="text_container">
                            <img src={LinkedInIcon} />
                        </div>
                    </a>
                    <a href='mailto:amabilezucchetti@proton.me'>
                        email
                        <div className="text_container">
                            <img src={MailIcon} />
                        </div>
                    </a>
                    <a href={data.header.curriculo !== "currículo"
                        ? "https://amabilee.github.io/portfolio-website/amabile_zucchetti_resume.pdf"
                        : "https://amabilee.github.io/portfolio-website/curriculo_amabile_zucchetti_2025.pdf"} target="_blank">
                        {data.header.curriculo}
                        <div className="text_container">
                            <img src={ResumeIcon} />
                        </div>
                    </a>
                </div>
            </div>
            <div className="hero">
                <h2>{data.hero.title}</h2>
                <h3 dangerouslySetInnerHTML={{ __html: data.hero.studying }} />
            </div>
            <div className="section_one">
                <p>{data.projects.projects}</p>
                <div className="project_box">
                    <div className="project_details">
                        <div className="project_title">
                            <p>{data.projects.project1.title}</p>
                            <div className="green_dot"></div>
                            <div className="text_container">
                                <p className="hidden_text">{data.projects.completo}</p>
                            </div>
                        </div>
                        <p>{data.projects.project1.description}</p>
                    </div>
                    <div className="project_details">
                        <div className="project_links">
                            <img src={GithubIcon} />
                            <div className="text_container">
                                <a
                                    href="#"
                                    className="hidden_text"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open("https://github.com/amabilee/sca-back-end", "_blank");
                                        window.open("https://github.com/amabilee/sca-front-end", "_blank");
                                    }}
                                >
                                    code
                                </a>
                            </div>
                        </div>
                        <div className="project_tags">
                            <p>react</p>
                            <p>javacsript</p>
                            <p>nodejs</p>
                            <p>mysql</p>
                        </div>
                    </div>
                </div>

                <div className="project_box">
                    <div className="project_details">
                        <div className="project_title">
                            <p>{data.projects.project2.title}</p>
                            <div className="green_dot"></div>
                            <div className="text_container">
                                <p className="hidden_text">{data.projects.completo}</p>
                            </div>
                        </div>
                        <p>{data.projects.project2.description}</p>
                    </div>
                    <div className="project_details">
                        <div className="project_links">
                            <img src={GithubIcon} />
                            <div className="text_container">
                                <a
                                    href="#"
                                    className="hidden_text"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open("https://github.com/amabilee/pasteur", "_blank");
                                    }}
                                >
                                    code
                                </a>
                            </div>
                        </div>
                        <div className="project_tags">
                            <p>react</p>
                            <p>javacsript</p>
                            <p>mui material</p>
                        </div>
                    </div>
                </div>

                <div className="project_box">
                    <div className="project_details">
                        <div className="project_title">
                            <p>{data.projects.project3.title}</p>
                            <div className="green_dot"></div>
                            <div className="text_container">
                                <p className="hidden_text">{data.projects.completo}</p>
                            </div>
                        </div>
                        <p>{data.projects.project3.description}</p>
                    </div>
                    <div className="project_details">
                        <div className="project_links">
                            <img src={GithubIcon} />
                            <div className="text_container">
                                <a
                                    href="#"
                                    className="hidden_text"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open("https://github.com/amabilee/navigation-automation-tool", "_blank");
                                    }}
                                >
                                    code
                                </a>
                            </div>
                        </div>
                        <div className="project_tags">
                            <p>python</p>
                            <p>selenium</p>
                            <p>pyqt5</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="footer">
                <div className="language_selector">
                    <img src={BrazilianFlag} onClick={() => changeLanguage('pt')} />
                    <img src={UnitedKingdomFlag} onClick={() => changeLanguage('en')} />
                    <img src={ItalyFlag} onClick={() => changeLanguage('it')} />
                </div>
                <p dangerouslySetInnerHTML={{ __html: data.footer.builtWith }} />
            </div>
        </div>
    );
}

export default MainPage;
