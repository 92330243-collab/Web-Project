import React, { useState } from 'react'
import '../styles/Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section container contact">
      <div>
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">
          Questions, feedback, or partnership ideas — we'd love to hear from you.
        </p>

        <ul className="contact-details">
          <li>hello@healthtrack.app</li>
          <li>+961 81 340 560</li>
          <li>Beirut, Lebanon</li>
        </ul>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn btn-primary">
          Send Message
        </button>

        {sent && <p className="contact-success">Thanks! Your message has been sent.</p>}
      </form>
    </section>
  )
}
