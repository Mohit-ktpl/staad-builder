import { useParams } from "react-router-dom";
import ProjectPage from "./file";
// import ProjectPage from "./ProjectPage";

export const ProjectPageWrapper = () => {
  const { projectId, phaseId } = useParams();
  // key forces React to remount ProjectPage when projectId or phaseId changes
  return <ProjectPage key={`${projectId}-${phaseId}`} />;
};
