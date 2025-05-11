import React, { useState, useEffect } from "react";
import "./ipek.css";

const possibleGifts = [
  "Bouquet of flowers",
  "Chocolate box",
  "Book",
  "Mug",
  "Necklace",
  "Notebook",
  "Watch",
  "Perfume",
  "Cup set",
  "Toy",
];

export default function IpekInterface({ onNext }) {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [giftHistory, setGiftHistory] = useState(() => {
    const stored = localStorage.getItem("giftHistory");
    return stored ? JSON.parse(stored) : {};
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [newGift, setNewGift] = useState("");
  const [selectedToDelete, setSelectedToDelete] = useState({});

  // load recipients
  useEffect(() => {
    const r = localStorage.getItem("recipients");
    if (r) {
      const arr = JSON.parse(r);
      setRecipients(arr);
      if (arr.length) setSelectedRecipient(arr[0].name);
    }
  }, []);

  // persist history
  useEffect(() => {
    localStorage.setItem("giftHistory", JSON.stringify(giftHistory));
  }, [giftHistory]);

  const history = giftHistory[selectedRecipient] || [];
  const filteredHistory = history.filter((g) =>
    g.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRecordGift = () => {
    const gift = newGift.trim();
    if (!gift) return;
    setGiftHistory((prev) => {
      const updated = { ...prev };
      if (!updated[selectedRecipient]) updated[selectedRecipient] = [];
      if (!updated[selectedRecipient].includes(gift)) {
        updated[selectedRecipient].push(gift);
      }
      return updated;
    });
    setNewGift("");
    setSearchTerm("");
  };

  const toggleDelete = (gift) => {
    setSelectedToDelete((prev) => ({
      ...prev,
      [selectedRecipient]: {
        ...prev[selectedRecipient],
        [gift]: !prev[selectedRecipient]?.[gift],
      },
    }));
  };

  const handleClearSelected = () => {
    const toDel = selectedToDelete[selectedRecipient] || {};
    setGiftHistory((prev) => {
      const updated = { ...prev };
      updated[selectedRecipient] = updated[selectedRecipient].filter(
        (g) => !toDel[g]
      );
      return updated;
    });
    setSelectedToDelete((prev) => ({
      ...prev,
      [selectedRecipient]: {},
    }));
  };

  const handleGenerateRecommendations = () => {
    // compute your recs if needed...
    onNext(); // <— now defined, coming from App.js
  };

  return (
    <div className="page-background">
      <div className="page-card">
        <h1>Gift History Tracker</h1>

        {/* Select recipient & search */}
        <div className="grid-3 mb-6">
          <div>
            <label className="block mb-1 font-medium">Recipient</label>
            <select
              className="input"
              value={selectedRecipient}
              onChange={(e) => {
                setSelectedRecipient(e.target.value);
                setSearchTerm("");
                setSelectedToDelete({});
              }}
              disabled={!recipients.length}
            >
              <option value="">– select –</option>
              {recipients.map((r, i) => (
                <option key={i} value={r.name}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Search Past Gifts</label>
            <input
              className="input"
              type="text"
              placeholder="e.g. Book"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* History with checkboxes */}
        <div>
          {filteredHistory.length > 0 ? (
            <ul className="history-list mb-4">
              {filteredHistory.map((g, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!selectedToDelete[selectedRecipient]?.[g]}
                    onChange={() => toggleDelete(g)}
                  />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mb-4">No past gifts found.</p>
          )}
        </div>

        {/* New Gift & Buttons */}
        <div className="mt-6">
          <div className="mb-4">
            <label className="block mb-1 font-medium">New Gift</label>
            <input
              className="input"
              type="text"
              placeholder="Type a gift…"
              value={newGift}
              onChange={(e) => setNewGift(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              className="btn flex-1"
              onClick={handleRecordGift}
              disabled={!newGift.trim()}
            >
              Record Gift
            </button>
            <button
              type="button"
              className="btn btn-clear flex-1"
              onClick={handleClearSelected}
              disabled={
                !Object.values(selectedToDelete[selectedRecipient] || {}).some(
                  Boolean
                )
              }
            >
              Clear Selected
            </button>
            <button
              type="button"
              className="btn btn-recommend flex-1"
              onClick={handleGenerateRecommendations}
              disabled={!selectedRecipient}
            >
              Generate Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
