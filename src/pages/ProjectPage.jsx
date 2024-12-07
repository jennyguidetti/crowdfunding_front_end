import { useParams, Link } from "react-router-dom";
import useProject from "../hooks/use-project";
import CreatePledgeForm from "../components/CreatePledgeForm";

function ProjectPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id);

    if (isLoading) {
        return (<p>loading...</p>)
    }

    if (error) {
        return (<p>error.message</p>)
    }

    return (
        <div>
            <h2>{project.organisation_name}</h2>
            <h3>{project.organisation_description}</h3>
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
            < CreatePledgeForm projectId={id} />
            <img src={project.image} />
            {/* <Link to={"/pledges"} >
                <button type="button">Pledge to Organsation</button>
            </Link> */}
        </div>
    );
}

export default ProjectPage;