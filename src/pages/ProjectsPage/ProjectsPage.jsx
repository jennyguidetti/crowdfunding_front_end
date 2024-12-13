import useProjects from "../../hooks/use-projects";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./ProjectsPage.css";

function ProjectsPage() {
    const { projects } = useProjects();
    console.log(projects);

    return (
        <div>
        {/* // <div>
        //     <Link to="/projects">Create Project</Link>
        // </div>
        // <button type="submit" onClick={handleSubmit}>
        //         Create Project // navigate to CreateProjectForm
        // </button> */}
        <div id="project-list">
            {projects.map((projectData, key) => {
                return <ProjectCard key={key} projectData={projectData} />;
            })}
        </div>
        </div>
    );
}

export default ProjectsPage;