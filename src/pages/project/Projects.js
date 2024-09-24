import {Container, Stack, Typography} from '@mui/material';
import Navbar from '../../layouts/Navbar';
import {ContentStyle, MainStyle, RootStyle} from '../../layouts/MainLayout';
import ProjectList from "../../components/project/ProjectList";

export default function Projects() {
    return (
        <RootStyle>
            <MainStyle>
                <Navbar refreshBalance={false}/>
                <Container maxWidth="lg">
                    <ContentStyle>
                        <Stack sx={{ mb: 5 }}>
                            <Typography variant="h4" gutterBottom>
                                Projetos
                            </Typography>
                        </Stack>
                        <ProjectList />
                    </ContentStyle>
                </Container>
            </MainStyle>
        </RootStyle>
    );
}