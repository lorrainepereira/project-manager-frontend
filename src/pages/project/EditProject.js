import {MainStyle, RootStyle} from "../../layouts/MainLayout";
import EditProjectForm from "../../components/project/EditProjectForm";

export default function EditProject() {
    return (
        <RootStyle>
            <MainStyle>
                <EditProjectForm />
            </MainStyle>
        </RootStyle>
    );
}