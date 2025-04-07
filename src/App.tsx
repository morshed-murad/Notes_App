import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard";
import { StarredNotesPage } from "./pages/starred-notes";
import { EditeNotePage } from "./pages/edit-note";
import { CreateNotesPage } from "./pages/create-notes";
import { NoteListPage } from "./pages/list-note";
import { Navbar } from "./components/navbar";
import ViewNotePage from "./pages/view";
import { ThemeTogglePage } from "./pages/them-toggle";
import useDarkModeStore from "./store/useDarkModeStore";

export function App() {
  const { isDarkMode } = useDarkModeStore();
  return (
    <Router>
      <div
        className={`flex h-screen overflow-auto  ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <Navbar />
        <div className="flex-grow p-4 md:p-8 mt-20  ">
          <Routes>
            <Route path="/" element={<NoteListPage />} />
            <Route path="/notes" element={<DashboardPage />} />
            <Route path="/notes/create" element={<CreateNotesPage />} />
            <Route path="/notes/:noteId" element={<EditeNotePage />} />
            <Route path="/notes/:noteId/view" element={<ViewNotePage />} />
            <Route path="/:noteId/view" element={<ViewNotePage />} />
            <Route path="/favorites/:noteId/view" element={<ViewNotePage />} />
            <Route path="/favorites" element={<StarredNotesPage />} />
            <Route path="/settings" element={<ThemeTogglePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
