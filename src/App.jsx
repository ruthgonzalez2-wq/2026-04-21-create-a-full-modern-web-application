import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { StudioPage } from './pages/StudioPage'
import { MarketingPage } from './pages/MarketingPage'
import { HelpsPage } from './pages/HelpsPage'
import { EbooksPage } from './pages/EbooksPage'
import { CoursesPage } from './pages/CoursesPage'
import { JobsPage } from './pages/JobsPage'
import { AdminPage } from './pages/AdminPage'
import { TermsPage } from './pages/TermsPage'
import { PrivacyPage } from './pages/PrivacyPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/helps" element={<HelpsPage />} />
        <Route path="/ebooks" element={<EbooksPage />} />
        <Route path="/cursos" element={<CoursesPage />} />
        <Route path="/trabajos" element={<JobsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
