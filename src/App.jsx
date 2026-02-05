import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Booking from './components/Booking';
import Terms from './components/Terms';
import Dashboard from './components/Dashboard';
import ScrollToTop from './components/ScrollToTop';
import { fetchContent, saveContent } from './api/contentApi';
import { defaultContent, mergeContent } from './data/defaultContent';
import './App.css';

function App() {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const hydratedContent = useMemo(() => mergeContent(content), [content]);

  useEffect(() => {
    let mounted = true;

    const loadContent = async () => {
      try {
        const data = await fetchContent();
        if (mounted && data) {
          setContent(mergeContent(data));
        }
      } catch (error) {
        if (mounted) {
          setLoadError(error?.message || 'Unable to load content from API.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadContent();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSave = async (nextContent) => {
    setSaving(true);
    setSaveError('');
    try {
      const saved = await saveContent(nextContent);
      setContent(mergeContent(saved || nextContent));
      return { ok: true };
    } catch (error) {
      setSaveError(error?.message || 'Unable to save content.');
      return { ok: false };
    } finally {
      setSaving(false);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home content={hydratedContent} />} />
          <Route path="/booking" element={<Booking content={hydratedContent} />} />
          <Route
            path="/terms"
            element={<Terms terms={hydratedContent.terms} contact={hydratedContent.contact} />}
          />
          <Route
            path="/admin"
            element={(
              <Dashboard
                content={hydratedContent}
                onSave={handleSave}
                loading={loading}
                loadError={loadError}
                saving={saving}
                saveError={saveError}
              />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
