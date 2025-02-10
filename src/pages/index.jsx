import React, { useRef, useEffect, useState } from 'react';
import './style.scss';

// Components
import Header from '../components/header/index.jsx'
import Footer from '../components/footer/index.jsx'

// Assets
import LinkedInLogo from '../assets/images/linkedin.svg'
import GithubLogo from '../assets/images/github.svg'
import MailLogo from '../assets/images/mail.svg'
import CodeIcon from '../assets/images/code.svg'
import ToolIcon from '../assets/images/tool.svg'
import Divisor from '../assets/images/experience-divisor.svg'
import Arrow from '../assets/images/arrow.svg'

//Content
import Portuguese from '../mocks/portuguese.json'
import English from '../mocks/english.json'

function MainPage() {
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


    const sectionRef = useRef(null);
    const divisorRef = useRef(null);
    const projectBoxesRef = useRef([]);
    const jobBoxesRef = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const divisor = divisorRef.current;
        const jobBoxes = jobBoxesRef.current;
        const projectBoxes = projectBoxesRef.current;

        const sectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    section.classList.add('show');
                    sectionObserver.unobserve(section);
                }
            },
            {
                threshold: 0.4,
                rootMargin: '0px',
            }
        );

        const divisorObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    jobBoxes.forEach((box, index) => {
                        setTimeout(() => box.classList.add('show'), index * 200);
                    });
                    divisorObserver.unobserve(divisor);
                }
            },
            {
                threshold: 0.3,
            }
        );

        const projectObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    projectBoxes.forEach((box, index) => {
                        setTimeout(() => {
                            box.classList.add('show');
                        }, index * 200);
                    });
                    projectObserver.unobserve(entry.target);
                }
            },
            {
                threshold: 0.3,
            }
        );

        if (section) sectionObserver.observe(section);
        if (divisor) divisorObserver.observe(divisor);
        if (projectBoxes) projectBoxes.forEach((box) => projectObserver.observe(box));;

        return () => {
            sectionObserver.disconnect();
            divisorObserver.disconnect();
            projectObserver.disconnect()
        };
    }, []);

    return (
        <div className="body-container">
            <Header />
            <div id="section1" className="hero-container">
                <h1 dangerouslySetInnerHTML={{ __html: data.section1.title }} />
                <h3 dangerouslySetInnerHTML={{ __html: data.section1.subtitle }} />
                <p dangerouslySetInnerHTML={{ __html: data.section1.intro }} />

                <div className="contacts-row">
                    <a href="/amabile_zucchetti_resume.pdf" download className="download-button">
                        <button>{data.section1.contacts.resumeButton}</button>
                    </a>
                    <div className="divider-line"></div>
                    <div className="social-media">
                        <a href={data.section1.contacts.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                            <img src={LinkedInLogo} alt="LinkedIn Logo" />
                        </a>
                        <a href={data.section1.contacts.socialMedia.github} target="_blank" rel="noopener noreferrer">
                            <img src={GithubLogo} alt="GitHub Logo" />
                        </a>
                        <a href={data.section1.contacts.socialMedia.email}>
                            <img src={MailLogo} alt="Mail Logo" />
                        </a>
                    </div>
                </div>
            </div>
            <div ref={sectionRef} id="section2" className="capabilities-container">
                <div className="skills-box">
                    <div className="title">
                        <img src={CodeIcon} alt="Orange Code Icon" />
                        <h3>{data.section2.skillsBox.title}</h3>
                    </div>
                    {data.section2.skillsBox.skills.map((skill, index) => (
                        <p key={index}>{skill}</p>
                    ))}
                </div>
                <div className="tools-box">
                    <div className="title">
                        <img src={ToolIcon} alt="Orange Tool Icon" />
                        <h3>{data.section2.toolsBox.title}</h3>
                    </div>
                    <p>Front_end<br /><span>{data.section2.toolsBox.tools.frontEnd}</span></p>
                    <p>Back_end<br /><span>{data.section2.toolsBox.tools.backEnd}</span></p>
                    <p>{data.section2.toolsBox.interface}<br /><span>{data.section2.toolsBox.tools.design}</span></p>
                </div>
            </div>
            <div id="section3" className="experience-container">
                <h2>{data.section3.title}</h2>
                <p>{data.section3.subtitle}</p>
                <div className="divisor" ref={divisorRef}>
                    <img src={Divisor} alt="Experience Divisor Lines" />
                </div>
                {data.section3.jobData.map((job, idx) => (
                    <div key={idx} className="job-box" ref={(e) => (jobBoxesRef.current[idx] = e)}>
                        <p>1 &nbsp;&nbsp; <span>const</span> {job.job} = &#123;</p>
                        <p>2 &nbsp;&nbsp;&nbsp; {data.section3.categories[0]}: <span dangerouslySetInnerHTML={{ __html: job.title }} /></p>
                        <p>3 &nbsp;&nbsp;&nbsp; {data.section3.categories[1]}: <span dangerouslySetInnerHTML={{ __html: job.startDate }} /></p>
                        <p>4 &nbsp;&nbsp;&nbsp; {data.section3.categories[2]}: <span dangerouslySetInnerHTML={{ __html: job.endDate }} /></p>
                        <p>5 &nbsp;&nbsp;&nbsp; {data.section3.categories[3]}: <span dangerouslySetInnerHTML={{ __html: job.company }} /></p>
                        <p>6 &nbsp;&nbsp; &#125;</p>
                    </div>

                ))}
            </div>
            <div id="section4" className="project-container">
                <h2>{data.section4.title}</h2>
                <p>{data.section4.subtitle}</p>
                <div className="line-projects">
                    {data.section4.projects.map((project, index) => (
                        <div key={index} className="project-box" ref={(e) => (projectBoxesRef.current[index] = e)}>
                            <p>{project.title}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, idx) => (
                                    <p key={idx}>{tag}</p>
                                ))}
                            </div>
                            <p>{project.description}</p>
                            <div className={`${project.button ? 'project-button-arrow' : 'project-buttons'}`}>
                                {project.button ? (
                                    <button>
                                        <a href={project.button.link} target="_blank" rel="noopener noreferrer">
                                            <img src={Arrow} alt="White Arrow for Redirect" />
                                        </a>
                                    </button>
                                ) : project.buttons ? (
                                    project.buttons.map((btn, index) => (
                                        <button key={index}>
                                            <a href={btn.link} target="_blank" rel="noopener noreferrer">
                                                {btn.text}
                                                <img src={Arrow} alt="White Arrow for Redirect" />
                                            </a>
                                        </button>
                                    ))
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MainPage;
