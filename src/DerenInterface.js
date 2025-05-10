// DerenInterface.js

import React, { useState } from 'react';

const templates = {
  birthday: "Happy Birthday! Wishing you all the best.",
  anniversary: "Happy Anniversary! Here's to many more wonderful years.",
  thankYou: "Thank you for everything you do!",
};

function DerenInterface() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [method, setMethod] = useState('email');
  const [status, setStatus] = useState('');

  const handleSend = () => {
    if (!selectedTemplate) {
      setStatus("Please select a template.");
      return;
    }

    const messageToSend = customMessage || templates[selectedTemplate];
    console.log("Sending via:", method);
    console.log("Message:", messageToSend);
    setStatus("Message sent successfully!");
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Send Greeting Message</h2>

      <label>Choose a Template:</label><br />
      <select onChange={(e) => setSelectedTemplate(e.target.value)} value={selectedTemplate}>
        <option value="">-- Select --</option>
        <option value="birthday">Birthday</option>
        <option value="anniversary">Anniversary</option>
        <option value="thankYou">Thank You</option>
      </select>

      {selectedTemplate && (
        <>
          <p><strong>Preview:</strong> {templates[selectedTemplate]}</p>
          <label>Edit the message (optional):</label><br />
          <textarea
            rows="4"
            cols="50"
            placeholder="Customize the message here..."
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          />
        </>
      )}

      <div style={{ marginTop: '10px' }}>
        <label>Send via:</label><br />
        <label>
          <input type="radio" name="method" value="email" checked={method === 'email'} onChange={() => setMethod('email')} />
          Email
        </label>
        <label style={{ marginLeft: '15px' }}>
          <input type="radio" name="method" value="sms" checked={method === 'sms'} onChange={() => setMethod('sms')} />
          SMS
        </label>
      </div>

      <button onClick={handleSend} style={{ marginTop: '15px' }}>Send</button>

      {status && <p style={{ color: 'green', marginTop: '10px' }}>{status}</p>}
    </div>
  );
}

export default DerenInterface;
