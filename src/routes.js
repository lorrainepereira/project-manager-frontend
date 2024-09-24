import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/auth/Login';
import Projects from "./pages/project/Projects";
import CreateProject from "./pages/project/CreateProject";
import Tasks from "./pages/task/Tasks";
import CreateTask from "./pages/task/CreateTask";
import EditProject from "./pages/project/EditProject";
import EditTask from "./pages/task/EditTask";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/new-project" element={<CreateProject />} />
        <Route path="/projects/edit-project" element={<EditProject />} />
        <Route path="/projects/list-task"  element={<Tasks />}/>
        <Route path="/projects/new-task" element={<CreateTask />}/>
        <Route path="/projects/edit-task" element={<EditTask />}/>
      </Routes>
    </BrowserRouter>
  )
}
