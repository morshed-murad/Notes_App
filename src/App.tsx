import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard";
import { StarredNotesPage } from "./pages/starred-notes";
import { EditeNotePage } from "./pages/edit-note";
import { CreateNotesPage } from "./pages/create-notes";
import { NoteListPage } from "./pages/list-note";
import { Navbar } from "./components/navbar";
export function App() {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-grow p-4 md:p-8 mt-20">
          <Routes>
            <Route path="/" element={<NoteListPage />} />
            <Route path="/notes" element={<DashboardPage />} />
            <Route path="/notes/create" element={<CreateNotesPage />} />
            <Route path="/notes/:id" element={<EditeNotePage />} />
            <Route path="/favorites" element={<StarredNotesPage />} />
            <Route
              path="/settings"
              element={<div>Settings - Theme Toggle</div>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
