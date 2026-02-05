import Header from './Header';
import Services from './Services';
import Footer from './Footer';
import './Booking.css';
import { useLocation } from 'react-router-dom';

function Booking({ content }) {
  const servicesSection = content?.servicesSection;
  const services = content?.services;

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialService = query.get('service');

  return (
    <>
      <Header />
      <main className="booking-page">
        <section className="booking-hero">
          <div className="booking-hero-inner">
            <p className="booking-eyebrow">Booking</p>
            <h1 className="booking-title">Reserve a Service</h1>
            <p className="booking-subtitle">
              Choose a service, share a few details, and I will confirm the schedule with you.
            </p>
            <div className="booking-actions">
              <a href="#services" className="btn btn-primary">Start Booking</a>
              <a href="/#contact" className="btn btn-secondary">Ask a Question</a>
            </div>
          </div>
        </section>
        <Services
          servicesSection={servicesSection}
          services={services}
          showForm={true}
          initialSelected={initialService}
        />
      </main>
      <Footer />
    </>
  );
}

export default Booking;
