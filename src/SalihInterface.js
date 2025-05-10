import React, { useState, useEffect } from 'react';
import './Salih.css';
import backgroundImage from './background_salih.jpg';

const interestOptions = [
  "Art", "Music", "Books/Comics", "Films/Series", "Sports", "Video Games",
  "Board Games", "Travelling", "Blogging", "Language"
];

function AddRecipientForm() {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    interests: [],
    hobbies: ''
  });

  const [status, setStatus] = useState(null);
  const [recipients, setRecipients] = useState([]);

  // localStorage'dan veriyi çek
  useEffect(() => {
    const stored = localStorage.getItem('recipients');
    if (stored) {
      setRecipients(JSON.parse(stored));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((i) => i !== value)
    }));
  };

  const validate = () => {
    return (
      formData.name.trim() !== '' &&
      formData.birthdate.trim() !== '' &&
      formData.interests.length > 0 &&
      formData.hobbies.trim() !== ''
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updated = [...recipients, formData];
      setRecipients(updated);
      localStorage.setItem('recipients', JSON.stringify(updated));
      setStatus('success');
      setFormData({ name: '', birthdate: '', interests: [], hobbies: '' });
    } else {
      setStatus('error');
    }
  };

  const handleClear = () => {
    localStorage.removeItem('recipients');
    setRecipients([]);
    setStatus(null);
  };

  return (
    <div
      className="form-background-wrapper"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="recipient-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Add Gift Recipient</h2>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <label>Birthdate</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleInputChange}
          />

          <label>Interests</label>
          <div className="checkbox-group">
            {interestOptions.map((interest) => (
              <label key={interest}>
                <input
                  type="checkbox"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleCheckboxChange}
                />
                {interest}
              </label>
            ))}
          </div>

          <label>Hobbies</label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleInputChange}
          />

          <button type="submit">Add Recipient</button>

          {status === 'success' && (
            <div className="success-message">✅ Recipient successfully added!</div>
          )}
          {status === 'error' && (
            <div className="error-message">❌ Please fill all the fields correctly.</div>
          )}
        </form>

        <div className="recipient-list">
          <h3>Added Recipients:</h3>
          <ul>
            {recipients.map((r, idx) => (
              <li key={idx}>
                <strong>{r.name}</strong><br />
                🎂 {r.birthdate} <br />
                💡 {r.interests.join(', ')} <br />
                🎨 {r.hobbies}
              </li>
            ))}
          </ul>
          {recipients.length > 0 && (
            <button className="clear-button" onClick={handleClear}>
              🗑️ Clear All Recipients
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddRecipientForm;
