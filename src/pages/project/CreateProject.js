import { RootStyle, MainStyle } from '../../layouts/MainLayout';
import CreateProjectForm from "../../components/project/CreateProjectForm";

export default function CreateProject() {
    return (
        <RootStyle>
            <MainStyle>
                <CreateProjectForm />
            </MainStyle>
        </RootStyle>
    );
}