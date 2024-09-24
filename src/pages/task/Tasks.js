import {ContentStyle, MainStyle, RootStyle} from "../../layouts/MainLayout";
import TaskList from "../../components/task/TaskList";
import Navbar from "../../layouts/Navbar";
import {Container, Stack, Typography} from "@mui/material";

export default function Tasks() {
    return (
        <RootStyle>
            <MainStyle>
                <Navbar refreshBalance={false}/>
                <Container maxWidth="lg">
                    <ContentStyle>
                        <Stack sx={{ mb: 5 }}>
                            <Typography variant="h4" gutterBottom>
                                Tarefas
                            </Typography>
                        </Stack>
                        <TaskList />
                    </ContentStyle>
                </Container>
            </MainStyle>
        </RootStyle>
    );
}