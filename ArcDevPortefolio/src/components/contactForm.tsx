import { useState, FormEvent } from "react";
import emailjs from "emailjs-com";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  // Initialize state for form data
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const { name, email, message } = formData;

  //Loading State and notification message
  const [submittingMessage, setSubmittingMessage] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [showNotification, setShowNotification] = useState<boolean>(false);

  //Snapshot of the values of the form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    autoExpandTextArea(e.target);
  };

  // Allows automatica resize of the textarea upon text input or deleting
  const autoExpandTextArea = (textarea: HTMLElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmittingMessage(true);
    setSubmitMessage("");
    setShowNotification(true);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: message,
        },
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      setSubmitMessage("Email sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Clear the form fields
      console.log(result)
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitMessage("An error occurred. Please try again");

    } finally {
      setSubmittingMessage(false);
      setTimeout(() => setShowNotification(false), 2500);
      setTimeout(() => setSubmitMessage(""), 3500);
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
        className={`form-button ${submittingMessage ? "active remove-border" : ""
          }`}
        type="submit"
        disabled={submittingMessage}
      >
        {submittingMessage ? (
          <span className="notification-loader"></span>
        ) : (
          "Submit"
        )}
      </button>
      {submitMessage && (
        <div
          className={`email-notification ${showNotification ? "show" : "hide"}`}
          aria-live="polite"
          role="status"
        >
          <p>{submitMessage}</p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
