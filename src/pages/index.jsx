import React, { useEffect, useState, useRef } from "react";
import './style.scss';

// Icons
import GithubIcon from '../assets/icons/github.png'
import LinkedinIcon from '../assets/icons/LinkedIn.png'
import MailIcon from '../assets/icons/Email_Green.png'

// Assets
import ArrowIcon from '../assets/icons/arrow_pixel.svg?react';
import MediumArrow from '../assets/icons/medium_arrow.svg?react'

//Footer
import FlowerPixelArt from '../assets/pixelart/flower_pixelart.png'

//Data
import JSONFile from '../mocks/data.json'

function MainPage() {
    const data = JSONFile
    const [page, setPage] = useState('main')
    const [currentLanguage, SetCurrentLanguage] = useState('english')

    // Nav Manager
    const [activeSection, setActiveSection] = useState("home");
    const visibilityMap = useRef({});

    useEffect(() => {
        const sections = document.querySelectorAll(".observed-section");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id;
                    const visibleHeight = entry.intersectionRect.height;
                    visibilityMap.current[id] = visibleHeight >= 300;
                });

                for (const section of sections) {
                    const id = section.id;
                    if (visibilityMap.current[id]) {
                        const othersInvisible = [...sections]
                            .filter((s) => s.id !== id)
                            .every((s) => !visibilityMap.current[s.id]);

                        if (othersInvisible) {
                            setActiveSection(id);
                            break;
                        }
                    }
                }
            },
            {
                root: null,
                threshold: Array.from({ length: 101 }, (_, i) => i / 100),
            }
        );

        sections.forEach((section) => observer.observe(section));

        const boxes = document.querySelectorAll(".experience-box, .project-box");

        const boxObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.intersectionRatio === 1) {
                        entry.target.classList.add("viewing");
                    } else {
                        entry.target.classList.remove("viewing");
                    }
                });
            },
            {
                threshold: 1.0,
            }
        );

        boxes.forEach((box) => boxObserver.observe(box));


        return () => {
            observer.disconnect();
            boxObserver.disconnect();
        };

    }, []);

    const changePage = (page) => {
        if (page == 'projects') {
            setPage('projects')
        } else {
            setPage('main')
        }
    }
    // Language

    function getWebLanguageCode() {
        const lang = navigator.language || navigator.userLanguage || 'en';
        return lang.split('-')[0];
    }

    useEffect(() => {
        let tempLanguage = getWebLanguageCode()
        switch (tempLanguage) {
            case 'en':
                SetCurrentLanguage('english');
                break;
            case 'pt':
                SetCurrentLanguage('portuguese');
                break;
            case 'it':
                SetCurrentLanguage('italian');
                break;
            default:
                SetCurrentLanguage('english');
                break;

        }
    }, [])


    return (
        <div className="body-container">
            {page == 'main' ? (
                <>
                    <div className="left-container">
                        <div className="wrapper-box">
                            <div className="titles-container">
                                <h1>Amabile Zucchetti</h1>
                                <h2>{data[currentLanguage].title.role}</h2>
                                <h3>{data[currentLanguage].title.description}</h3>
                            </div>
                            <div className="nav-container">
                                <ul>
                                    <li className={activeSection === "home" ? "active-nav" : ""}>
                                        <div className="nav-line"></div>
                                        <p>{data[currentLanguage].navigation[0]}</p>
                                    </li>
                                    <li className={activeSection === "experience" ? "active-nav" : ""}>
                                        <div className="nav-line"></div>
                                        <p>{data[currentLanguage].navigation[1]}</p>
                                    </li>
                                    <li className={activeSection === "projects" ? "active-nav" : ""}>
                                        <div className="nav-line"></div>
                                        <p>{data[currentLanguage].navigation[2]}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="social-container">
                                <img src={GithubIcon} alt='Github Logo Pixel Art Icon' onClick={(e) => {
                                    e.preventDefault();
                                    window.open("https://github.com/amabilee", "_blank");
                                }}
                                />
                                <img src={LinkedinIcon} alt='LinkedIn Logo Pixel Art Icon' onClick={(e) => {
                                    e.preventDefault();
                                    window.open("https://www.linkedin.com/in/amabilezucchetti", "_blank");
                                }}
                                />
                                <img src={MailIcon} alt='Mail Logo Pixel Art Icon'
                                    onClick={() => {
                                        window.location.href = 'mailto:amabilezucchetti@proton.me';
                                    }} />
                            </div>
                            <p className='last_update_date'>{data[currentLanguage].update_date}</p>
                        </div>
                    </div>
                    <div className="right-container">
                        <p id="home" className="home-text observed-section">
                            {data[currentLanguage].profile.split('<br />').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>

                        <div id="experience" className="experiences-container observed-section">
                            <p>{data[currentLanguage].experience.section_title}</p>

                            {data && data[currentLanguage]?.experience?.items?.slice(0, 5).map((element, index) => (
                                <div className="experience-box" key={index}>
                                    <div className="date">
                                        <p>{element.date}</p>
                                    </div>
                                    <div className="details">
                                        <p className='experience-title'>{element.title} - {element.company}</p>
                                        <p className='experience-detail'>{element.details}</p>
                                        <div className="experience-tags">
                                            <ul>
                                                {element.tags && element.tags.map((tag, indexTag) => (
                                                    <li key={indexTag}><p>{tag}</p></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <h4
                                onClick={() => {
                                    window.location.href = 'https://amabilee.github.io/portfolio-website/resume.pdf';
                                }}
                            >{data[currentLanguage].experience.download_resume} <ArrowIcon /></h4>
                        </div>
                        <div id="projects" className="projects-container observed-section">
                            <p>{data[currentLanguage].projects.section_title}</p>
                            {data && data[currentLanguage]?.projects?.items?.slice(0, 3).map((element, index) => (
                                <div className="project-box" key={index} onClick={() => {
                                    if (element.link && element.link.trim() !== "") {
                                        window.open(element.link, "_blank");
                                    }
                                }}
                                    style={{ cursor: element.where_link && element.where_link.trim() !== "" ? "pointer" : "default" }}
                                >
                                    <div className="details">
                                        <p className='project-title'>{element.title} <ArrowIcon /></p>
                                        <p className='project-detail'>{element.details}</p>
                                        <div className="project-tags">
                                            <ul>
                                                {element.tags && element.tags.map((tag, indexTag) => (
                                                    <li key={indexTag}><p>{tag}</p></li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <h4 onClick={() => changePage('projects')}>{data[currentLanguage].projects.view_archive} <ArrowIcon /></h4>
                        </div>
                        <div className="footer-container">
                            <img src={FlowerPixelArt} />
                            <p className='footer-text'>{data[currentLanguage].credits}</p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="project-archive-container">
                        <div className="return-text" onClick={() => changePage('main')}>
                            <div className="svg-wrapper">
                                <MediumArrow />
                            </div>
                            <p>Amabile Zucchetti</p>
                        </div>
                        <h1>{data[currentLanguage].projects.main_page.title}</h1>

                        <table>
                            <thead>
                                <tr>
                                    {data && data[currentLanguage]?.projects?.main_page?.table_columns?.map((element, index) => (
                                        <th scope="col" key={index}>{element}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data && data[currentLanguage]?.projects?.items?.map((element, index) => (
                                    <tr key={index}>
                                        <th scope="row">{element.date}</th>
                                        {element.title && (() => {
                                            const words = element.title.split(" ");
                                            const lastWord = words.pop();
                                            const rest = words.join(" ");

                                            const isClickable = element.link && element.link.trim() !== "";
                                            const handleClick = () => {
                                                if (window.innerWidth < 740 && isClickable) {
                                                    window.open(element.link, "_blank");
                                                }
                                            };

                                            return (
                                                <td
                                                    onClick={handleClick}
                                                    style={{
                                                        cursor:
                                                            window.innerWidth < 740 && isClickable ? "pointer" : "default",
                                                    }}
                                                >
                                                    {rest}{" "}
                                                    <span className="nowrap">
                                                        {lastWord}&nbsp;<ArrowIcon />
                                                    </span>
                                                </td>
                                            );
                                        })()}

                                        <td
                                            onClick={() => {
                                                if (element.where_link && element.where_link.trim() !== "") {
                                                    window.open(element.where_link, "_blank");
                                                }
                                            }}
                                            style={{ cursor: element.where_link && element.where_link.trim() !== "" ? "pointer" : "default" }}
                                        >
                                            {element.where}
                                        </td>

                                        <td>
                                            <div className="tag-wrapper">
                                                {element.tags && element.tags.map((tag, indexTag) => (
                                                    <span key={indexTag}>{tag}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td
                                            onClick={() => {
                                                if (element.link && element.link.trim() !== "") {
                                                    window.open(element.link, "_blank");
                                                }
                                            }}
                                            style={{ cursor: element.link && element.link.trim() !== "" ? "pointer" : "default" }}
                                        >
                                            {element.link_title}<ArrowIcon /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

export default MainPage