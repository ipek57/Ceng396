import React, { useState } from "react";
import "./DerenInterface.css";

function DerenInterface() {
  const [selectedOption, setSelectedOption] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setContactInfo(""); // clear previous value
  };

  const handleSend = () => {
    alert(`Sending via ${selectedOption}: ${contactInfo}`);
  };

  return (
    <div className="deren-wrapper">
      <div className="deren-container">
        <h2 className="deren-title">Send Greeting Message</h2>

        <label className="deren-label">Choose a Template:</label>
        <select className="deren-select">
          <option>-- Select --</option>
          <option>Happy Birthday</option>
          <option>Congratulations</option>
        </select>

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
