import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion, AnimatePresence } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 45 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: 'easeOut' },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [modal, setModal] = useState({
    visible: false,
    message: '',
    type: '', // 'success' or 'error'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setModal({
        visible: true,
        message: 'Please fill in all fields.',
        type: 'error',
      });
      return;
    }

    if (!validateEmail(email)) {
      setModal({
        visible: true,
        message: 'Please enter a valid email address.',
        type: 'error',
      });
      return;
    }

    const serviceID = 'service_e03zfen';
    const templateID = 'template_fc2pxhr';
    const userID = 'cv-6E4e36G2EIxxRh';

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(
        (response) => {
          console.log('Email successfully sent!', response);
          setModal({
            visible: true,
            message: 'Your message has been sent successfully!',
            type: 'success',
          });
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('Error sending email:', error);
          setModal({
            visible: true,
            message: 'Something went wrong. Please try again.',
            type: 'error',
          });
        }
      );
  };

  const closeModal = () => {
    setModal({ ...modal, visible: false });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      className="p-10 bg-blue-600 text-white space-y-6 relative min-h-screen"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      <motion.h1 variants={item} className="text-4xl mb-6 text-center">
        Contact Us
      </motion.h1>

      <motion.p variants={item} className="text-lg text-center mb-6">
        Got a question, suggestion, or just want to say hi? We’d love to hear from you.
      </motion.p>

      <motion.form
        variants={item}
        className="space-y-6 max-w-2xl mx-auto text-left border border-black p-10 rounded-lg bg-white text-black"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            className="w-full px-4 py-2 h-32 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-orange-400 text-white rounded px-6 py-2 font-bold transition-transform hover:bg-orange-500 w-full"
        >
          Send Message
        </motion.button>
      </motion.form>

      {/* Modal */}
      <AnimatePresence>
        {modal.visible && (
          <motion.div
            initial={{ opacity: 0, y: '-50%', scale: 0.8 }}
            animate={{ opacity: 1, y: '0%', scale: 1 }}
            exit={{ opacity: 0, y: '-50%', scale: 0.8 }}
            className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm text-center"
          >
            <h2 className={`text-2xl font-bold ${modal.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {modal.type === 'success' ? 'Success!' : 'Error!'}
            </h2>
            <p className="mt-2 text-gray-700">{modal.message}</p>
            <button
              onClick={closeModal}
              className={`mt-4 px-4 py-2 rounded-lg font-semibold ${
                modal.type === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              } text-white`}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={item} className="pt-8 text-center">
        <p className="text-sm text-gray-200">
          You can also reach out directly via{' '}
          <a
            href="mailto:wajihulhasan01@gmail.com"
            className="underline text-white"
          >
            email
          </a>{' '}
          or connect on{' '}
          <a
            href="https://www.linkedin.com/in/wajihulhasan01"
            target="_blank"
            className="underline text-white"
          >
            LinkedIn
          </a>
          .
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
