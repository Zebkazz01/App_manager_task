import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPages";
import LoginPage from "./pages/LoginPages";
import HomePage from "./pages/HomePages";
import FooterPage from "./pages/FooterPages";
import { AuthProvider } from "./context/AuthContext";
import TaskPages from "./pages/TaskPage";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <main className="w-screen h-screen flex justify-between items-center flex-col dark:bg-gray-600/50">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#ff343493,transparent)] dark:bg-[radial-gradient(circle_800px_at_100%_200px,#ff0606,transparent)]"></div>
      </div>
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TaskPages />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
      <FooterPage />
    </main>
  );
}

export default App;
