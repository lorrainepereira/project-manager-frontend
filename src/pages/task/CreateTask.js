import {MainStyle, RootStyle} from "../../layouts/MainLayout";
import CreateTaskForm from "../../components/task/CreateTaskForm";

export default function CreateTask() {
    return (
        <RootStyle>
            <MainStyle>
                <CreateTaskForm />
            </MainStyle>
        </RootStyle>
    );
}