import { useEffect, useMemo, useState } from 'react';
import { fetchAdminProfile, loginAdmin, updateAdminProfile } from '../api/contentApi';
import './Dashboard.css';

const emptyProject = () => ({
  id: Date.now(),
  title: '',
  description: '',
  thumbnail: '',
  link: '',
  tags: []
});

const getStoredToken = () => {
  if (typeof localStorage === 'undefined') {
    return '';
  }
  return localStorage.getItem('admin_token') || '';
};

function Dashboard({
  content,
  onSave,
  loading,
  loadError,
  saving,
  saveError
}) {
  const [draft, setDraft] = useState(content);
  const [saveNotice, setSaveNotice] = useState('');
  const [token, setToken] = useState(getStoredToken());
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  const [profileStatus, setProfileStatus] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        return;
      }
      try {
        const data = await fetchAdminProfile();
        setProfileForm({
          name: data?.name || '',
          email: data?.email || '',
          password: '',
          passwordConfirmation: '',
        });
      } catch (error) {
        setProfileStatus(error?.message || 'Unable to load profile.');
      }
    };

    loadProfile();
  }, [token]);

  const projectList = useMemo(() => draft?.projects || [], [draft]);
  const serviceList = useMemo(() => draft?.services || [], [draft]);

  const updateSection = (section, field, value) => {
    setDraft((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateProjectsSection = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      projectsSection: {
        ...prev.projectsSection,
        [field]: value
      }
    }));
  };

  const updateServicesSection = (field, value) => {
    setDraft((prev) => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        [field]: value
      }
    }));
  };

  const updateProject = (id, field, value) => {
    setDraft((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id
          ? { ...project, [field]: value }
          : project
      )
    }));
  };

  const addProject = () => {
    setDraft((prev) => ({
      ...prev,
      projects: [...prev.projects, emptyProject()]
    }));
  };

  const removeProject = (id) => {
    setDraft((prev) => ({
      ...prev,
      projects: prev.projects.filter((project) => project.id !== id)
    }));
  };

  const updateService = (id, field, value) => {
    setDraft((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === id
          ? { ...service, [field]: value }
          : service
      )
    }));
  };

  const addService = () => {
    setDraft((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        { id: Date.now(), title: '', description: '', price: '', duration: '' }
      ]
    }));
  };

  const removeService = (id) => {
    setDraft((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== id)
    }));
  };

  const handleSave = async () => {
    if (!token) {
      setSaveNotice('Please login before saving.');
      return;
    }
    console.log('Saving portfolio content payload:', draft);
    const result = await onSave(draft);
    if (result?.ok) {
      setSaveNotice('Changes saved successfully.');
      setTimeout(() => setSaveNotice(''), 4000);
    }
  };

  const handleLoginChange = (field) => (event) => {
    setLoginForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const result = await loginAdmin(loginForm);
      if (result?.token) {
        localStorage.setItem('admin_token', result.token);
        setToken(result.token);
        setLoginForm({ email: '', password: '' });
        setProfileStatus('');
      } else {
        setLoginError('Login failed.');
      }
    } catch (error) {
      setLoginError(error?.message || 'Login failed.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken('');
  };

  const handleOpenProfile = () => {
    setActiveTab('profile');
    setAccountMenuOpen(false);
  };

  const handleProfileChange = (field) => (event) => {
    setProfileForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();
    setProfileStatus('');
    setProfileSaving(true);
    try {
      const payload = {
        name: profileForm.name,
        email: profileForm.email,
      };

      if (profileForm.password) {
        payload.password = profileForm.password;
        payload.password_confirmation = profileForm.passwordConfirmation;
      }

      console.log('Updating admin profile payload:', payload);
      await updateAdminProfile(payload);
      setProfileStatus('Profile updated.');
      setProfileForm((prev) => ({
        ...prev,
        password: '',
        passwordConfirmation: '',
      }));
    } catch (error) {
      setProfileStatus(error?.message || 'Unable to update profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-card">Loading content...</div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="dashboard">
        <div className="dashboard-card login-card">
          <h2>Admin Login</h2>
          <p className="helper-text">Enter your admin email and password.</p>
          <form className="login-form" onSubmit={handleLogin}>
            <label>
              Email
              <input
                type="email"
                value={loginForm.email}
                onChange={handleLoginChange('email')}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange('password')}
                required
              />
            </label>
            <button type="submit" className="btn btn-primary" disabled={loggingIn}>
              {loggingIn ? 'Signing in...' : 'Sign In'}
            </button>
            {loginError ? <p className="dashboard-status error">{loginError}</p> : null}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Portfolio Admin</p>
          <h1>Content Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage CTA, hero image, services, projects, about, terms, and contact details.
          </p>
        </div>
        <div className="dashboard-actions">
          <div className="account-menu">
            <button
              type="button"
              className="btn btn-secondary icon-button"
              onClick={() => setAccountMenuOpen((prev) => !prev)}
              aria-label="Account menu"
            >
              <span className="icon-circle" aria-hidden="true">•</span>
            </button>
            {accountMenuOpen ? (
              <div className="account-dropdown">
                <button type="button" onClick={handleOpenProfile}>
                  Edit Profile
                </button>
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {loadError ? <p className="dashboard-status error">{loadError}</p> : null}
      {saveError ? <p className="dashboard-status error">{saveError}</p> : null}

      <div className="dashboard-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          Hero
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          Services
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
          onClick={() => setActiveTab('terms')}
        >
          Terms
        </button>
      </div>

      <section className="dashboard-grid">
        <div className={`dashboard-card ${activeTab === 'hero' ? 'is-active' : 'is-hidden'}`}>
          <h2>Hero Section</h2>
          <label>
            Title
            <input
              type="text"
              value={draft.hero?.title || ''}
              onChange={(event) => updateSection('hero', 'title', event.target.value)}
            />
          </label>
          <label>
            Subtitle
            <input
              type="text"
              value={draft.hero?.subtitle || ''}
              onChange={(event) => updateSection('hero', 'subtitle', event.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              rows="4"
              value={draft.hero?.description || ''}
              onChange={(event) => updateSection('hero', 'description', event.target.value)}
            />
          </label>
          <label>
            Hero Image URL
            <input
              type="text"
              value={draft.hero?.imageUrl || ''}
              onChange={(event) => updateSection('hero', 'imageUrl', event.target.value)}
            />
          </label>
          <div className="dashboard-row">
            <label>
              Primary CTA Text
              <input
                type="text"
                value={draft.hero?.ctaPrimaryText || ''}
                onChange={(event) => updateSection('hero', 'ctaPrimaryText', event.target.value)}
              />
            </label>
            <label>
              Primary CTA Link
              <input
                type="text"
                value={draft.hero?.ctaPrimaryUrl || ''}
                onChange={(event) => updateSection('hero', 'ctaPrimaryUrl', event.target.value)}
              />
            </label>
          </div>
          <div className="dashboard-row">
            <label>
              Secondary CTA Text
              <input
                type="text"
                value={draft.hero?.ctaSecondaryText || ''}
                onChange={(event) => updateSection('hero', 'ctaSecondaryText', event.target.value)}
              />
            </label>
            <label>
              Secondary CTA Link
              <input
                type="text"
                value={draft.hero?.ctaSecondaryUrl || ''}
                onChange={(event) => updateSection('hero', 'ctaSecondaryUrl', event.target.value)}
              />
            </label>
          </div>
        </div>

        <div className={`dashboard-card ${activeTab === 'about' ? 'is-active' : 'is-hidden'}`}>
          <h2>About Section</h2>
          <label>
            Title
            <input
              type="text"
              value={draft.about?.title || ''}
              onChange={(event) => updateSection('about', 'title', event.target.value)}
            />
          </label>
          <label>
            Subtitle
            <input
              type="text"
              value={draft.about?.subtitle || ''}
              onChange={(event) => updateSection('about', 'subtitle', event.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              rows="4"
              value={draft.about?.body || ''}
              onChange={(event) => updateSection('about', 'body', event.target.value)}
            />
          </label>
          <label>
            Highlights (one per line)
            <textarea
              rows="4"
              value={(draft.about?.highlights || []).join('\n')}
              onChange={(event) =>
                updateSection(
                  'about',
                  'highlights',
                  event.target.value
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean)
                )
              }
            />
          </label>
        </div>

        <div className={`dashboard-card ${activeTab === 'projects' ? 'is-active' : 'is-hidden'}`}>
          <h2>Projects Section</h2>
          <label>
            Section Title
            <input
              type="text"
              value={draft.projectsSection?.title || ''}
              onChange={(event) => updateProjectsSection('title', event.target.value)}
            />
          </label>
          <label>
            Section Subtitle
            <input
              type="text"
              value={draft.projectsSection?.subtitle || ''}
              onChange={(event) => updateProjectsSection('subtitle', event.target.value)}
            />
          </label>
          <div className="project-editor">
            {projectList.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.title || 'New Project'}</h3>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => removeProject(project.id)}
                  >
                    Remove
                  </button>
                </div>
                <label>
                  Title
                  <input
                    type="text"
                    value={project.title}
                    onChange={(event) => updateProject(project.id, 'title', event.target.value)}
                  />
                </label>
                <label>
                  Description
                  <textarea
                    rows="3"
                    value={project.description}
                    onChange={(event) => updateProject(project.id, 'description', event.target.value)}
                  />
                </label>
                <label>
                  Thumbnail URL
                  <input
                    type="text"
                    value={project.thumbnail}
                    onChange={(event) => updateProject(project.id, 'thumbnail', event.target.value)}
                  />
                </label>
                <label>
                  Project Link
                  <input
                    type="text"
                    value={project.link}
                    onChange={(event) => updateProject(project.id, 'link', event.target.value)}
                  />
                </label>
                <label>
                  Tags (comma separated)
                  <input
                    type="text"
                    value={(project.tags || []).join(', ')}
                    onChange={(event) =>
                      updateProject(
                        project.id,
                        'tags',
                        event.target.value
                          .split(',')
                          .map((tag) => tag.trim())
                          .filter(Boolean)
                      )
                    }
                  />
                </label>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-primary" onClick={addProject}>
            Add Project
          </button>
        </div>

        <div className={`dashboard-card ${activeTab === 'services' ? 'is-active' : 'is-hidden'}`}>
          <h2>Services Section</h2>
          <label>
            Section Title
            <input
              type="text"
              value={draft.servicesSection?.title || ''}
              onChange={(event) => updateServicesSection('title', event.target.value)}
            />
          </label>
          <label>
            Section Subtitle
            <input
              type="text"
              value={draft.servicesSection?.subtitle || ''}
              onChange={(event) => updateServicesSection('subtitle', event.target.value)}
            />
          </label>
          <div className="project-editor">
            {serviceList.map((service) => (
              <div key={service.id} className="project-card">
                <div className="project-header">
                  <h3>{service.title || 'New Service'}</h3>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => removeService(service.id)}
                  >
                    Remove
                  </button>
                </div>
                <label>
                  Title
                  <input
                    type="text"
                    value={service.title}
                    onChange={(event) => updateService(service.id, 'title', event.target.value)}
                  />
                </label>
                <label>
                  Description
                  <textarea
                    rows="3"
                    value={service.description}
                    onChange={(event) => updateService(service.id, 'description', event.target.value)}
                  />
                </label>
                <div className="dashboard-row">
                  <label>
                    Price
                    <input
                      type="text"
                      value={service.price || ''}
                      onChange={(event) => updateService(service.id, 'price', event.target.value)}
                    />
                  </label>
                  <label>
                    Duration
                    <input
                      type="text"
                      value={service.duration || ''}
                      onChange={(event) => updateService(service.id, 'duration', event.target.value)}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-primary" onClick={addService}>
            Add Service
          </button>
        </div>

        <div className={`dashboard-card ${activeTab === 'contact' ? 'is-active' : 'is-hidden'}`}>
          <h2>Contact Section</h2>
          <label>
            Title
            <input
              type="text"
              value={draft.contact?.title || ''}
              onChange={(event) => updateSection('contact', 'title', event.target.value)}
            />
          </label>
          <label>
            Subtitle
            <input
              type="text"
              value={draft.contact?.subtitle || ''}
              onChange={(event) => updateSection('contact', 'subtitle', event.target.value)}
            />
          </label>
          <div className="dashboard-row">
            <label>
              Email
              <input
                type="email"
                value={draft.contact?.email || ''}
                onChange={(event) => updateSection('contact', 'email', event.target.value)}
              />
            </label>
            <label>
              WhatsApp Number
              <input
                type="text"
                value={draft.contact?.whatsappNumber || ''}
                onChange={(event) => updateSection('contact', 'whatsappNumber', event.target.value)}
              />
            </label>
          </div>
          <div className="dashboard-row">
            <label>
              GitHub URL
              <input
                type="text"
                value={draft.contact?.githubUrl || ''}
                onChange={(event) => updateSection('contact', 'githubUrl', event.target.value)}
              />
            </label>
            <label>
              GitHub Label
              <input
                type="text"
                value={draft.contact?.githubLabel || ''}
                onChange={(event) => updateSection('contact', 'githubLabel', event.target.value)}
              />
            </label>
          </div>
          <div className="dashboard-row">
            <label>
              LinkedIn URL
              <input
                type="text"
                value={draft.contact?.linkedinUrl || ''}
                onChange={(event) => updateSection('contact', 'linkedinUrl', event.target.value)}
              />
            </label>
            <label>
              LinkedIn Label
              <input
                type="text"
                value={draft.contact?.linkedinLabel || ''}
                onChange={(event) => updateSection('contact', 'linkedinLabel', event.target.value)}
              />
            </label>
          </div>
          <label>
            WhatsApp URL (optional)
            <input
              type="text"
              value={draft.contact?.whatsappUrl || ''}
              onChange={(event) => updateSection('contact', 'whatsappUrl', event.target.value)}
            />
          </label>
          <label>
            Benefits (one per line)
            <textarea
              rows="4"
              value={(draft.contact?.benefits || []).join('\n')}
              onChange={(event) =>
                updateSection(
                  'contact',
                  'benefits',
                  event.target.value
                    .split('\n')
                    .map((line) => line.trim())
                    .filter(Boolean)
                )
              }
            />
          </label>
        </div>

        <div className={`dashboard-card ${activeTab === 'terms' ? 'is-active' : 'is-hidden'}`}>
          <h2>Terms & Conditions</h2>
          <p className="helper-text">
            Paste HTML content for each language. If empty, the default terms page is used.
          </p>
          <label>
            Page Title
            <input
              type="text"
              value={draft.terms?.title || ''}
              onChange={(event) => updateSection('terms', 'title', event.target.value)}
            />
          </label>
          <label>
            English HTML
            <textarea
              rows="6"
              value={draft.terms?.contentHtml || ''}
              onChange={(event) => updateSection('terms', 'contentHtml', event.target.value)}
            />
          </label>
          <label>
            Arabic HTML
            <textarea
              rows="6"
              value={draft.terms?.contentHtmlAr || ''}
              onChange={(event) => updateSection('terms', 'contentHtmlAr', event.target.value)}
            />
          </label>
        </div>

        <div className={`dashboard-card ${activeTab === 'profile' ? 'is-active' : 'is-hidden'}`}>
          <h2>Admin Profile</h2>
          <p className="helper-text">
            Update the admin name, email, and password.
          </p>
          <form onSubmit={handleProfileSave} className="profile-form">
            <label>
              Name
              <input
                type="text"
                value={profileForm.name}
                onChange={handleProfileChange('name')}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={profileForm.email}
                onChange={handleProfileChange('email')}
                required
              />
            </label>
            <div className="dashboard-row">
              <label>
                New Password
                <input
                  type="password"
                  value={profileForm.password}
                  onChange={handleProfileChange('password')}
                />
              </label>
              <label>
                Confirm Password
                <input
                  type="password"
                  value={profileForm.passwordConfirmation}
                  onChange={handleProfileChange('passwordConfirmation')}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={profileSaving}>
              {profileSaving ? 'Updating...' : 'Update Profile'}
            </button>
            {profileStatus ? <p className="dashboard-status">{profileStatus}</p> : null}
          </form>
        </div>
      </section>

      <div className="dashboard-footer-actions">
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {saveNotice ? <span className="dashboard-status success">{saveNotice}</span> : null}
      </div>
    </div>
  );
}

export default Dashboard;
