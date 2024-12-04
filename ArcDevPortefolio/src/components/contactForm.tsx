import { useState, FormEvent } from "react";
import axios from "axios";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submittingMessage, setSubmittingMessage] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");

  //Snapshot of the values of the form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //Handle the logic for submitting the email
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittingMessage(true);
    setSubmitMessage("");

    // Define the serverless function URL (local or production)
    
    const apiUrl =
      import.meta.env.VITE_APP_ENV === "development"
        ? "http://localhost:8888/.netlify/functions/send-email"
        : "/.netlify/functions/send-email";

    try {
      const res = await axios.post(apiUrl, formData);
      setSubmitMessage(res.data.message);
      setFormData({ name: "", email: "", message: "" }); //Clear the current data
    } catch (error) {
      setSubmitMessage("An error occured. Please try again");
    } finally {
      setSubmittingMessage(false);

      // Set timeout after updating submitMessage
      setTimeout(() => {
        setSubmitMessage("");
      }, 2000); //Clear message after 2 seconds
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        className="form-input"
        id="name"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        aria-label="Form Input for Name"
        type="text"
      />

      <input
        className="form-input"
        id="email"
        name="email"
        placeholder="E-Mail"
        value={formData.email}
        onChange={handleChange}
        required
        aria-label="Form Input for Email Address"
        type="email"
      />

      <textarea
        className="form-input"
        id="message"
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
        aria-label="Textarea to write the message"
      ></textarea>

      <button
        className="form-button"
        type="submit"
        disabled={submittingMessage}
      >
        {submittingMessage ? "Submitting..." : "Submit Email"}
      </button>
      {submitMessage && (
        <div className="email-notification" aria-live="polite" role="status">
          <p>{submitMessage}</p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
