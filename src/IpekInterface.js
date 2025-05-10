import React, { useState } from "react";
import "./ipek.css"; // CSS’in yolunu projenin yapısına göre kontrol et

const mockRecipients = [
  { id: 1, name: "İlgin" },
  { id: 2, name: "İdil" },
  { id: 3, name: "Deren" },
  { id: 4, name: "İpek" },
  { id: 5, name: "Salih" },
];

const initialGiftHistory = {
  1: ["Çiçek Buketi", "Çikolata Kutusu"],
  2: ["Kitap", "Kupa"],
  3: [],
  4: ["Kolye", "Defter"],
  5: ["Saat"],
};

const possibleGifts = [
  "Çiçek Buketi",
  "Çikolata Kutusu",
  "Kitap",
  "Kupa",
  "Kolye",
  "Defter",
  "Saat",
  "Parfüm",
  "Bardak Seti",
  "Oyuncak",
];

export default function GiftHistoryPage() {
  const [selectedRecipient, setSelectedRecipient] = useState(
    mockRecipients[0].id
  );
  const [giftHistory, setGiftHistory] = useState({ ...initialGiftHistory });
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const history = giftHistory[selectedRecipient] || [];
  const filteredHistory = history.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRecordGift = () => {
    const gift = window.prompt("Enter gift name to record:");
    if (gift && gift.trim()) {
      setGiftHistory((prev) => {
        const updated = { ...prev };
        updated[selectedRecipient] = [
          ...(updated[selectedRecipient] || []),
          gift.trim(),
        ];
        return updated;
      });
      setRecommendations([]); // Yeni kayıt gelince önerileri temizle
    }
  };

  const handleGenerateRecommendations = () => {
    const past = giftHistory[selectedRecipient] || [];
    const unique = [...new Set(possibleGifts)];
    const recs = unique.filter((g) => !past.includes(g));
    setRecommendations(recs.slice(0, 3)); // En fazla 3 öneri
  };

  return (
    <div className="page-background">
      <div className="page-card">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Gift History Tracker (UC09)
        </h1>

        {/* Selector & Search */}
        <div className="grid-3 mb-6">
          <div>
            <label htmlFor="recipient">Recipient</label>
            <select
              id="recipient"
              className="select"
              value={selectedRecipient}
              onChange={(e) => {
                setSelectedRecipient(+e.target.value);
                setRecommendations([]);
                setSearchTerm("");
              }}
            >
              {mockRecipients.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="search">Search Past Gifts</label>
            <input
              id="search"
              type="text"
              placeholder="e.g. Kitap"
              className="input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* History */}
        <div>
          {filteredHistory.length > 0 ? (
            <ul className="history-list">
              {filteredHistory.map((gift, idx) => (
                <li key={idx}>{gift}</li>
              ))}
            </ul>
          ) : (
            <p className="no-history">
              No past gifts found for this recipient.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <button className="btn btn-record" onClick={handleRecordGift}>
            Record Gift
          </button>
          <button
            className="btn btn-recommend"
            onClick={handleGenerateRecommendations}
          >
            Generate Recommendations
          </button>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="recommend-card">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Recommendations
            </h2>
            <ul className="list-decimal list-inside text-gray-700">
              {recommendations.map((gift, idx) => (
                <li key={idx}>{gift}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
