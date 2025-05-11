import React, { useState, useEffect } from 'react';
import './ilgin.css';


function BudgetCardForm() {
  const [formData, setFormData] = useState({
    cardId: '',
    cardOwner: '',
    amount: ''
  });

  const [budgets, setBudgets] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('budgetCards');
    if (stored) {
      setBudgets(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    return (
      formData.cardId.trim().length === 8 &&
      formData.cardOwner.trim() !== '' &&
      !isNaN(parseFloat(formData.amount)) &&
      parseFloat(formData.amount) > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newEntry = {
        cardId: formData.cardId,
        cardOwner: formData.cardOwner,
        amount: parseFloat(formData.amount).toFixed(2)
      };
      const updated = [...budgets, newEntry];
      setBudgets(updated);
      localStorage.setItem('budgetCards', JSON.stringify(updated));
      setFormData({ cardId: '', cardOwner: '', amount: '' });
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <div class="form-background-wrapper">
    <div className="card-form-container">
       <form onSubmit={handleSubmit}>
        <h2>💳 Add Budget Card Info</h2>

        <label>Card ID (8 digits)</label>
        <input
          type="text"
          name="cardId"
          value={formData.cardId}
          onChange={handleChange}
          maxLength="8"
        />

        <label>Card Owner Name</label>
        <input
          type="text"
          name="cardOwner"
          value={formData.cardOwner}
          onChange={handleChange}
        />

        <label>Budget Amount (₺)</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
        />

        <button type="submit">Save Budget</button>

        {status === 'success' && (
          <div className="success-message">✅ Budget saved successfully!</div>
        )}
        {status === 'error' && (
          <div className="error-message">❌ Please enter valid card info.</div>
        )}
      </form>

      <div className="budget-card-list">
        <h3>📋 Saved Budgets:</h3>
        <ul>
          {budgets.map((b, idx) => (
            <li key={idx}>
              <strong>{b.cardOwner}</strong><br />
              🪪 {b.cardId}<br />
              💰 ₺{b.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

export default BudgetCardForm;
