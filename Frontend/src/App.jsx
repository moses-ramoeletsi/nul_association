import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainContent from "./pages/MainContent";
import NotFound from "./components/NotFound";
import AdminPanel from "./pages/AdminPanel";
import LoginForm from "./pages/AminLogin";
import EducationalTrip from "./components/EducationalTrip";
import Activities from "./pages/Activities";
import Layout from "./components/Layout";
import Members from "./pages/Members";
import Meetings from "./pages/Meetings";
import AddTrip from "./components/AddTrip";
import Seminars from "./components/Seminars";
import AddSeminars from "./components/AddSeminars";
import MentalHealthResourcePage from "./components/MentalHealthResourcePage ";
import AddHealthCare from "./components/AddHealthCare";
import Debates from "./components/Debates";
import AddDebate from "./components/AddDebate";
import Partnership from "./components/Partnership";
import AddCollaborator from "./components/AddCollaborator";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Main website route */}
          <Route path="/" element={<MainContent />} />
          <Route path="/seminars" element={<Seminars />} />
          <Route path="/mental-health" element={<MentalHealthResourcePage />} />
          <Route path="/education-trip" element={<EducationalTrip />} />
          <Route path="/annual-debates" element={<Debates />} />
          <Route path="/partnership" element={<Partnership />} />

          {/* Admin routes */}
          <Route path="/admin/*" element={<LoginForm />} />
          <Route path="/admin-panel/*" element={<AdminPanel />} />
          <Route path="/dashboard/*" element={<AdminPanel />} />

          <Route
            path="/members"
            element={
              <Layout>
                <Members />
              </Layout>
            }
          />
          <Route
            path="/activities"
            element={
              <Layout>
                <Activities />
              </Layout>
            }
          />
          <Route
            path="/meetings"
            element={
              <Layout>
                <Meetings />
              </Layout>
            }
          />
          {/*
        <Route
          path="/settings"
          element={
            <Layout>
            <Settings />
            </Layout>
            }
            /> */}
          <Route path="/add-trips" element={<AddTrip />} />
          <Route path="/seminar" element={<AddSeminars />} />
          <Route path="/health-care" element={<AddHealthCare />} />
          <Route path="/debates" element={<AddDebate />} />
          <Route path="/collaboration" element={<AddCollaborator />} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
