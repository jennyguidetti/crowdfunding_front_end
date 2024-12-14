import { useParams, Link } from "react-router-dom";
import useProject from "../../hooks/use-project";
import CreatePledgeForm from "../../components/CreatePledgeForm";
import "./ProjectPage.css";
import UpdateProjectForm from "../../components/UpdateProjectForm";
import DeleteProjectForm from "../../components/DeleteProjectForm";
import { useAuth } from "../../hooks/use-auth";

function ProjectPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    const { auth } = useAuth();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id);

    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>error.message</p>)
    }

    const isOwner = auth.userId === project.owner;

    return (
        <div className="project-container">
            <h2 className="project-title">{project.organisation_name}</h2>
            <h3 className="project-description">{project.organisation_description}</h3>
            <h3>Goal: {project.goal}</h3>
            <h3>Created at: {project.date_created}</h3>
            <h3>{`Open Status: ${project.is_open}`}</h3>
            <h3>Pledges:</h3>
            <ul>
                {project.pledges.map((pledgeData, key) => {
                    return (
                        <li key={key}>
                            {pledgeData.hours} from {pledgeData.supporter}
                        </li>
                    );
                })}
            </ul>
            <img src={project.image} alt={project.organisation_name} />

            < CreatePledgeForm projectId={id} />
            < UpdateProjectForm project={project} />
            < DeleteProjectForm project={project} />
        </div>
    );
}

export default ProjectPage;

// {showUpdateForm ?
//     <UpdateProjectForm project={project} />
//     :null
// }

// {auth.token && isOwner ? (
//     <button>
//         Something
//     </button>
// ) : null}
// )}