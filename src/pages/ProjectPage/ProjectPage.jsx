import { useParams, Link } from "react-router-dom";
import useProject from "../../hooks/use-project";
import CreatePledgeForm from "../../components/CreatePledgeForm/CreatePledgeForm";
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

    const isOwner = parseInt(auth.userId) === parseInt(project.owner);

    return (
        <div>
            <div className="project-header-section">
                <h2>{project.organisation_name}</h2>
            </div>

            <div className="project-container">
                <div className="project-content">
                    <div className="project-info">
                        <h3 className="project-description">{project.organisation_description}</h3>
                        <div className="project-details">
                            <p><strong>Available hours:</strong> {project.goal} hours </p>
                            <p><strong>Applicants:</strong> {project.total_pledges} people </p>
                            <p><strong>Status:</strong> {project.is_open ? 'Open' : 'Closed'}</p>
                        </div>
                    </div>
                    
                    <div className="project-image">
                        <img src={project.image} alt={project.organisation_name} />
                    </div>
                </div>

                <div className="pledges-section">
                    <h3>Current applicant hours pledged</h3>
                    <ul className="pledge-list">
                        {project.pledges.map((pledgeData, key) => {
                            return (
                                <li key={key} className="pledge-item">
                                    {pledgeData.hours} hours
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {auth.token ? (
                    <div className="pledge-form-section">
                        <CreatePledgeForm projectId={id} />
                    </div>
                ) : (
            <div className="login-prompt" style={{ textAlign: 'center', margin: '20px 0' }}>
                        <p>Please <Link to="/login" style={{ color: '#007BFF' }}>login</Link> to make a pledge</p>
                    </div>
                )}

                {auth.token && isOwner && (
                    <div className="owner-actions">
                        <UpdateProjectForm project={project} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectPage;