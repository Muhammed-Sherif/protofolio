import Header from './Header';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import Footer from './Footer';

function Home({ content }) {
  const hero = content?.hero;
  const about = content?.about;
  const projects = content?.projects;
  const projectsSection = content?.projectsSection;
  const contact = content?.contact;

  return (
    <>
      <Header />
      <Hero hero={hero} />
      <About about={about} />
      <Projects projects={projects} section={projectsSection} />
      <Skills />
      <Contact contact={contact} />
      <Footer />
    </>
  );
}

export default Home;
