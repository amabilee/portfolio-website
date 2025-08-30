import React, { useEffect, useState, useRef } from "react";
import './style.scss';

// Assets
import LinkedInLogo from '../assets/icons/linkedin.svg?react'
import GithubInLogo from '../assets/icons/github.svg?react'
import MailIcon from '../assets/icons/mail.svg?react'
import NavArrow from '../assets/misc/navArrow.svg?react'

// Projects
import PsicareBanner from '../assets/projects/psicare_banner.png'
import PasteurBanner from '../assets/projects/pasteur_banner.jpeg'
import ACSBanner from '../assets/projects/acs_banner.png'
import NavigationBanner from '../assets/projects/navigation_banner.png'

function MainPage() {
    const [activeSection, setActiveSection] = useState("home");

    // Informations
    const projects = [
        {
            image: PsicareBanner,
            title: "Psicare - Psychiatric Clinic Manager",
            description: "Digital platform for managing psychiatric clinic workflows, streamlining appointment scheduling, patient and staff registration, and reporting. Designed to enhance the user experience and improve control, security, and efficiency throughout the clinic.",
            github: "https://github.com/amabilee/psicare-frontend"
        },
        {
            image: ACSBanner,
            title: "Access Control System",
            description: "System for managing secure access to facilities, enabling user authentication, identification badge generation, and detailed tracking of personnel and vehicles. Supports role-based access, real-time entry/exit logging, and alert visualization based on status and CNH validity.",
            github: "https://github.com/amabilee/sca-front-end"
        },
        {
            image: PasteurBanner,
            title: "Pasteur - Sterilization Clinic Manager",
            description: "A management system for dental materials that records incoming and outgoing requests, streamlines validation, tracks histories, offers mobile-friendly interfaces, and uses digital signatures to improve efficiency, traceability, and administrative control.",
            github: "https://github.com/amabilee/pasteur"
        },
        {
            image: NavigationBanner,
            title: "Navigation Automation Tool",
            description: "A tool for automating navigation tasks by defining and managing sequences of links with customizable intervals. The application includes an easy-to-use graphical interface for adding, editing, and managing automations.",
            github: "https://github.com/amabilee/navigation-automation-tool"

        }
    ]

    const experiences = [
        {
            title: "Software Engineer I - III",
            location: "Fábrica de Tecnologias Turing",
            description: "I worked in the front-end team, managing backlog, roadmap, and technical direction while also acting as Product Designer. I delivered multiple stalled systems by realigning priorities and coordinating cross-functional teams. I developed responsive, accessible, and high-performance interfaces.",
            date: "Nov 2023 — Present",
            tags: ["JavaScript", "HTML & SCSS", "React", "Vite", "Node.js", "MongoDB", "MySQL", "PostgreSQL"]
        },
        {
            title: "Research Assistant",
            "location": "UniEVANGÉLICA",
            description: "Contribute to the design and development of a multilingual digital platform supporting immigrant and refugee integration in Brazil. Produce accessible, multilingual content on documentation, employment, and legal rights, ensuring cultural and linguistic inclusivity. Conduct research on migration trends to guide platform features and user experience. Coordinate outreach, manage digital communications, and organize community events to expand project impact.",
            date: "Aug 2024 — Present",
            tags: ["JavaScript", "React", "Node.js", "Figma"]
        },
        {
            title: "Software Engineer",
            location: "Brazilian Air Force (FAB)",
            description: "Conducted exploratory research with stakeholders, producing requirement specifications, process flowcharts, and technical documentation. Designed internal solutions and prototypes, ensuring usability, compliance, and alignment with project needs. Developed and implemented secure, scalable features to improve operational performance. Contributed to system architecture and optimization to enhance efficiency, reliability, and overall security.",
            date: "May 2024 — Oct 2024",
        }
    ]

    const aboutText = (window.innerWidth <= 400 ? "I architect user interfaces with a strong focus on usability, accessibility, and performance.<br /><br />I specialize in solving real challenges by transforming complex problems into scalable front-end solutions, turning design systems into reusable, high-quality code that works seamlessly on any device.<br /><br />I thrive in a collaborative environment, partnering with designers to bring ideas to life and with back-end engineers to integrate solutions efficiently. I have contributed to diverse projects, from academic platforms to internal tools, always aiming for clarity and consistency.<br /><br />Outside of work, I enjoy puzzles and find inspiration in the subtle beauty of the world, from city architecture to the quiet rhythm of everyday life." : "I architect user interfaces with a strong focus on usability, accessibility, and performance.<br /><br />My expertise lies in solving real challenges by transforming complex problems into scalable front-end solutions—turning design systems into reusable, high-quality code that works seamlessly on any device.<br /><br />I thrive in a collaborative environment. I partner closely with designers to bring their ideas to life and with back-end engineers to integrate solutions elegantly and efficiently.<br /><br />I have experience contributing to diverse projects, from academic platforms to internal tools, always aiming to bring clarity and consistency to the interface layer.<br /><br />Outside of work, I enjoy a good puzzle and find inspiration by observing the subtle beauty in the world, whether it's through the architecture of a city or the quiet rhythm of everyday life.")

    // Navigation
    const sectionRefs = {
        home: useRef(null),
        profile: useRef(null),
        works: useRef(null),
        experiences: useRef(null),
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.6,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.dataset.section);
                }
            });
        }, options);

        Object.values(sectionRefs).forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => {
            observer.disconnect();
        };
    });

    useEffect(() => {
        const container = sectionRefs.experiences.current;

        const handleWheel = (e) => {
            const atTop = container.scrollTop <= 30;
            if (atTop && e.deltaY < 0) {
                window.scrollBy({ top: e.deltaY, behavior: "auto" });
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    });

    // Projects Navigation
    const [currentPage, setCurrentPage] = useState(0);
    const [animationDirection, setAnimationDirection] = useState(null);

    const [projectsPerPage, setProjectsPerPage] = useState(
        window.innerWidth < 520 ? 1 : window.innerWidth < 740 ? 2 : 3
    );

    useEffect(() => {
        const handleResize = () => {
            setProjectsPerPage(window.innerWidth < 520 ? 1 : window.innerWidth < 740 ? 2 : 3);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const paginatedEvents = projects.slice(
        currentPage * projectsPerPage,
        currentPage * projectsPerPage + projectsPerPage
    );

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setAnimationDirection('right');
            setCurrentPage(prev => prev + 1);

            setTimeout(() => {
                setAnimationDirection(null);
            }, 1000);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setAnimationDirection('left');
            setCurrentPage(prev => prev - 1);

            setTimeout(() => {
                setAnimationDirection(null);
            }, 1000);
        }
    };



    return (
        <div className="body-container">
            <div className="background-sphere"></div>
            <div className="background-sphere"></div>
            <div className="navigation">
                <p className={activeSection === "home" ? "active-nav" : ""}>home</p>
                <p className={activeSection === "profile" ? "active-nav" : ""}>
                    profile
                </p>
                <p className={activeSection === "works" ? "active-nav" : ""}>works</p>
                <p className={activeSection === "experiences" ? "active-nav" : ""}>
                    experiences
                </p>
            </div>
            <div className="section-one" ref={sectionRefs.home} data-section="home">
                <div className="text-box">
                    <h1>Hi, I&apos;m <span>Amábile Zucchetti</span></h1>
                    <h2>Front-End Engineer & UI/UX Designer</h2>
                    <h3>I love transforming challenges into effective digital solutions.</h3>
                </div>
            </div>
            <div className="section-two" ref={sectionRefs.profile} data-section="profile">
                <h4>About me</h4>
                <p>
                    {aboutText.split(/<br\s*\/?>/gi).map((part, index) => (
                        <React.Fragment key={index}>
                            {part}
                            {index < aboutText.split(/<br\s*\/?>/gi).length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </p>

                <div className="social">
                    <LinkedInLogo
                        alt='LinkedIn Logo Pixel Art Icon'
                        onClick={(e) => {
                            e.preventDefault();
                            window.open("https://www.linkedin.com/in/amabilezucchetti", "_blank");
                        }} />
                    <GithubInLogo
                        alt='Github Logo Pixel Art Icon'
                        onClick={(e) => {
                            e.preventDefault();
                            window.open("https://github.com/amabilee", "_blank");
                        }} />
                    <MailIcon
                        alt='Mail Logo Pixel Art Icon'
                        onClick={() => {
                            window.location.href = 'mailto:amabilezucchetti@proton.me';
                        }} />
                    <a onClick={() => {
                        window.location.href = 'https://amabilee.github.io/portfolio-website/resume.pdf';
                    }}>Résumé</a>
                </div>
            </div>
            <div className="section-three" ref={sectionRefs.works} data-section="works">
                <h4>Selected Works</h4>
                <div className={`projects-container slide-${animationDirection}`}>
                    {paginatedEvents.map((element, index) => (
                        <div className="project-card" key={index}>
                            <img src={element.image} alt={element.title} className="image" />
                            <p className="title">{element.title}</p>
                            <p className="description">{element.description}</p>
                            <GithubInLogo
                                alt='Github Logo Pixel Art Icon' onClick={(e) => {
                                    e.preventDefault();
                                    window.open(element.github, "_blank");
                                }} />
                        </div>
                    ))}
                </div>
                {projects.length > projectsPerPage && (
                    <div className="projects-navigation">
                        <NavArrow onClick={goToPreviousPage} className={currentPage === 0 ? "disabled" : ""} />
                        <div className="pages">
                            {Array.from({ length: totalPages }, (_, index) => {
                                const page = index + 1;
                                const isActive = currentPage + 1 === page;

                                let extraClass = "";
                                if (isActive && currentPage === 0) extraClass = "only-right";
                                else if (isActive && currentPage + 1 === totalPages) extraClass = "only-left";

                                return (
                                    <p
                                        key={page}
                                        className={`${isActive ? `active-nav ${extraClass}` : ""}`}
                                    >
                                        {page}
                                    </p>
                                );
                            })}
                        </div>
                        <NavArrow onClick={goToNextPage} className={currentPage === totalPages - 1 ? "disabled" : ""} />
                    </div>
                )}

            </div>
            <div className="section-four" ref={sectionRefs.experiences} data-section="experiences">
                <h4>Previous Experiences</h4>
                {experiences.map((element, index) => (
                    <div className="experience-card" key={index}>
                        <div className="sphere"></div>
                        <div className="text-box">
                            <p className="title">
                                {element.title}&nbsp;<span>·</span> <span>{element.location}</span>
                            </p>
                            <p className="date">{element.date}</p>
                            <p className="description">
                                {element.description}
                            </p>
                            <div className="tags">
                                {element?.tags?.map((tag, i) => (
                                    <p key={i}>{tag}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <p onClick={() => {
                    window.location.href = 'https://amabilee.github.io/portfolio-website/resume.pdf';
                }}>View full résumé</p>
            </div>
        </div>
    )
}

export default MainPage