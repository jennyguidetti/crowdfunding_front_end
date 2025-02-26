import useProjects from "../../hooks/use-projects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Link } from "react-router-dom";
import "./HomePage.css";
import Button from "../../components/Button/Button";

function HomePage() {
    const { projects } = useProjects();
    console.log(projects);

    const visibleProjects = projects.slice(0, 3); // Get the first 3 projects

    return (
        <div className="home-container">
            {/* Hard-coded About Section */}
            <div id="about-section">
                <h2>What is ParamediXPlus?</h2>
                <h3>
                    Designed for ambulance services globally to give paramedics around the world a chance to experience what working for other services is like.
                </h3>
            </div>

            {/* Dynamic Project Cards */}
            <h2>Featured Projects</h2>
            <div className="project-list">
                {visibleProjects.map((project) => (
                    <div className="project-card" key={project.id}>
                        <img src={project.image} alt={project.organisation_name} />
                        <h3>{project.organisation_name}</h3>
                        <p>{project.organisation_description}</p>
                    </div>
                ))}
            </div>

            <div className="see-all-section">
                <Link to="/projectsall">
                    <Button>See All Opportunities</Button>
                </Link>
            </div>

            <div className="extra-section">
                <h3>If you are from an ambulance service wishing to advertise an opportunity, {" "}
                <Link to="/createproject" style={{ color: "#007BFF", textDecoration: "underline" }}>
                        click here
                    </Link>{" "}
                </h3>
            </div>
        </div>
    );
}

export default HomePage;

// function HomePage() {
//     const { projects } = useProjects();
//     console.log(projects);

//     return (
//         <div id="project-list">
//             <h2>What is ParamediXPlus?</h2>
//             <h3>Designed for ambulance services globally to give paramedics around the world a chance to experience what working for other services is like</h3>
//             {projects.map((projectData, key) => {
//                 return <ProjectCard key={key} projectData={projectData} />;
//             })}
//             
//         </div>
//     );
// }