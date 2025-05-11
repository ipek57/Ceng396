import React, { useState } from "react";
import "./DerenInterface.css";

function DerenInterface() {
  const [selectedOption, setSelectedOption] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [template, setTemplate] = useState("");
  const [customMessage, setCustomMessage] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setContactInfo("");
  };

  const handleSend = () => {
    if (!selectedOption || !contactInfo.trim()) {
      alert("Please enter a valid email or phone number.");
      return;
    }

    const message = template && template !== "-- Select --" ? template : customMessage.trim();

    if (!message) {
      alert("Please select a template or write a custom message.");
      return;
    }

    alert(`Message sent via ${selectedOption} to ${contactInfo}: "${message}"`);
  };

  return (
    <div className="deren-wrapper">
      <div className="deren-container">
        <h2 className="deren-title">Send Greeting Message</h2>

        <label className="deren-label">Choose a Template:</label>
        <select
          className="deren-select"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
        >
          <option>-- Select --</option>
          <option>Happy Birthday</option>
          <option>Congratulations</option>
        </select>

        <label className="deren-label">Or Write a Custom Message:</label>
        <textarea
          className="deren-input"
          placeholder="Type your message here..."
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          rows="3"
        />

        <label className="deren-label">Send via:</label>
        <div className="deren-radio-group">
          <label>
            <input
              type="radio"
              value="Email"
              checked={selectedOption === "Email"}
              onChange={handleOptionChange}
            />
            Email
          </label>
          <label>
            <input
              type="radio"
              value="SMS"
              checked={selectedOption === "SMS"}
              onChange={handleOptionChange}
            />
            SMS
          </label>
        </div>

        {selectedOption && (
          <>
            <label className="deren-label">
              Enter {selectedOption === "Email" ? "Email Address" : "Phone Number"}:
            </label>
            <input
              type="text"
              className="deren-input"
              placeholder={selectedOption === "Email" ? "example@mail.com" : "+905..."}
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </>
        )}

        <button className="deren-button" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default DerenInterface;
