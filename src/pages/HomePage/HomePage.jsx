import useProjects from "../../hooks/use-projects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    const { projects } = useProjects();
    console.log(projects);

    const visibleProjects = projects.slice(0,3);

    return (
        <div>
            <div id="about-section">
                <h2>What is ParamediXPlus?</h2>
                <h3>
                    Designed for ambulance services globally to give paramedics around the world a chance to experience what working for other services is like.<br />
                    Have a look at what services are currently advertising openings below:<br /><br />
                </h3>

            </div>
            
            <div id="project-list">
                {visibleProjects.map((projectData, key) => {
                    return <ProjectCard key={key} projectData={projectData} />;
                })}
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