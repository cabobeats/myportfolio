"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+1) 307 429 38 17",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "info@ivandeveloper.xyz",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    description: "Santillana 128 Durango Mexico",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData(prevState => ({ ...prevState, service: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.4 } }}
      className="py-12"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col xl:flex-row gap-12">
          <div className="xl:w-[60%] order-2 xl:order-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg">
              <h2 className="text-4xl font-bold text-accent mb-4">Let's Collaborate</h2>
              <p className="text-gray-300 mb-6">
                Share your project details, and I'll be thrilled to explore how we can bring your vision to life.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
                <Input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
                <Input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                <Input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
              </div>
              <Select onValueChange={handleServiceChange} value={formData.service}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="Integrations Specialist">Integrations Specialist</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea
                className="h-[150px]"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              {submitStatus === 'success' && (
                <p className="text-green-400 mt-2">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 mt-2">Failed to send message. Please try again.</p>
              )}
            </form>
          </div>
          <div className="xl:w-[40%] order-1 xl:order-2">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-accent mb-6">Contact Information</h3>
              <ul className="space-y-6">
                {info.map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                      <div className="text-xl">{item.icon}</div>
                    </div>
                    <div>
                      <p className="text-gray-400">{item.title}</p>
                      <p className="text-lg font-medium">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;