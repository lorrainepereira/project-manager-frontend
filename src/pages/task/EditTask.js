import {MainStyle, RootStyle} from "../../layouts/MainLayout";
import EditTaskForm from "../../components/task/EditTaskForm";

export default function EditTask() {
    return (
        <RootStyle>
            <MainStyle>
                <EditTaskForm />
            </MainStyle>
        </RootStyle>
    );
}