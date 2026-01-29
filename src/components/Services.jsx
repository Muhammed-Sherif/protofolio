import { useMemo, useState } from 'react';
import { createServiceBooking } from '../api/contentApi';
import './Services.css';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  preferredDate: '',
  preferredTime: '',
  notes: ''
};

function Services({ servicesSection, services }) {
  const sectionTitle = servicesSection?.title || 'Services';
  const sectionSubtitle =
    servicesSection?.subtitle || 'Reserve a service and I will get back to you.';

  const [selectedService, setSelectedService] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  const serviceList = useMemo(() => services || [], [services]);

  const onChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!selectedService) {
      setStatus('Please select a service first.');
      return;
    }

    setSending(true);
    setStatus('');

    try {
      await createServiceBooking({
        service_title: selectedService.title,
        service_price: selectedService.price,
        service_duration: selectedService.duration,
        client_name: form.name,
        client_email: form.email,
        client_phone: form.phone,
        preferred_date: form.preferredDate || null,
        preferred_time: form.preferredTime || null,
        notes: form.notes
      });
      setStatus('Your reservation was sent successfully.');
      setForm(emptyForm);
    } catch (error) {
      setStatus(error?.message || 'Unable to send reservation.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{sectionTitle}</h2>
          <p className="section-subtitle">{sectionSubtitle}</p>
        </div>

        <div className="services-layout">
          <div className="services-list">
            {serviceList.map((service) => (
              <button
                key={service.id ?? service.title}
                type="button"
                className={`service-card ${
                  selectedService?.id === service.id ? 'active' : ''
                }`}
                onClick={() => setSelectedService(service)}
              >
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="service-meta">
                  {service.price ? <span>{service.price}</span> : null}
                  {service.duration ? <span>{service.duration}</span> : null}
                </div>
              </button>
            ))}
          </div>

          <form className="service-form" onSubmit={onSubmit}>
            <h3>Reserve a Service</h3>
            <p className="form-hint">
              {selectedService
                ? `Selected: ${selectedService.title}`
                : 'Select a service on the left to continue.'}
            </p>
            <label>
              Full Name
              <input type="text" value={form.name} onChange={onChange('name')} required />
            </label>
            <label>
              Email
              <input type="email" value={form.email} onChange={onChange('email')} required />
            </label>
            <label>
              Phone (optional)
              <input type="text" value={form.phone} onChange={onChange('phone')} />
            </label>
            <div className="form-row">
              <label>
                Preferred Date
                <input type="date" value={form.preferredDate} onChange={onChange('preferredDate')} />
              </label>
              <label>
                Preferred Time
                <input type="time" value={form.preferredTime} onChange={onChange('preferredTime')} />
              </label>
            </div>
            <label>
              Notes
              <textarea rows="3" value={form.notes} onChange={onChange('notes')} />
            </label>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? 'Sending...' : 'Reserve Service'}
            </button>
            {status ? <p className="form-status">{status}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Services;
