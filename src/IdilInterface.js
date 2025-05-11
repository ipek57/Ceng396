import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import "./idil.css";

export default function GiftRecommendations() {
  const [interest, setInterest] = useState("");
  const [budget, setBudget] = useState("");
  const [filteredGifts, setFilteredGifts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [favoriteGifts, setFavoriteGifts] = useState([]);
  const [showSelected, setShowSelected] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [currentGiftToSelect, setCurrentGiftToSelect] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);

useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    setDarkMode(true);
    document.body.classList.add("darkmode-force");
  }

  const savedGifts = localStorage.getItem("selectedGifts");
  if (savedGifts) {
    setSelectedGifts(JSON.parse(savedGifts));
  }

  const savedFavorites = localStorage.getItem("favoriteGifts");
  if (savedFavorites) {
    setFavoriteGifts(JSON.parse(savedFavorites));
  }

  // 🧠 Alıcıları yükle
  const storedRecipients = localStorage.getItem("recipients");
  if (storedRecipients) {
    setRecipients(JSON.parse(storedRecipients));
  }

  // 🌟 Arka plan sadece bu sayfada olsun
  document.body.classList.add("idil-background");

  // 🧹 Sayfadan çıkınca kaldır
  return () => {
    document.body.classList.remove("idil-background");
  };
}, []);



  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("darkmode-force", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const openSelectModal = (gift) => {
    setCurrentGiftToSelect(gift);
    setIsSelectModalOpen(true);
    setRecipient("");
    setOccasion("");
  };

  const closeSelectModal = () => {
    setIsSelectModalOpen(false);
    setCurrentGiftToSelect(null);
  };

  const handleConfirmSelect = () => {
    if (!recipient || !occasion) {
      alert("Please enter recipient and occasion.");
      return;
    }

    if (selectedGifts.find((g) => g.id === currentGiftToSelect.id)) {
      alert("You've already selected this gift.");
      closeSelectModal();
      return;
    }

    const updated = [...selectedGifts, { ...currentGiftToSelect, recipient, occasion }];
    setSelectedGifts(updated);
    localStorage.setItem("selectedGifts", JSON.stringify(updated));
    alert(`You selected: ${currentGiftToSelect.name} for ${recipient} on ${occasion}`);
    closeSelectModal();
  };

  const handleFavoriteGift = (gift) => {
    if (favoriteGifts.find((g) => g.id === gift.id)) {
      alert("You've already favorited this gift.");
      return;
    }

    const updated = [...favoriteGifts, gift];
    setFavoriteGifts(updated);
    localStorage.setItem("favoriteGifts", JSON.stringify(updated));
    alert(`Favorited: ${gift.name}`);
  };

  const handleDeleteGift = (id) => {
    const updated = selectedGifts.filter((gift) => gift.id !== id);
    setSelectedGifts(updated);
    localStorage.setItem("selectedGifts", JSON.stringify(updated));
  };

  const handleDeleteFavorite = (id) => {
    const updated = favoriteGifts.filter((gift) => gift.id !== id);
    setFavoriteGifts(updated);
    localStorage.setItem("favoriteGifts", JSON.stringify(updated));
  };

  const handleSearch = () => {
  let keywords = [interest.trim().toLowerCase()];

  // Eğer kullanıcı seçiliyse ve birden fazla ilgi alanı varsa, tümünü keywords olarak kullan
  if (selectedRecipient && selectedRecipient.interests.length > 0) {
    keywords = selectedRecipient.interests.map(i => i.toLowerCase());
  }

  const maxBudget = parseFloat(budget);

  const results = giftList.filter(
    (gift) =>
      keywords.some((kw) => gift.interest.toLowerCase().includes(kw)) &&
      (!isNaN(maxBudget) ? gift.price <= maxBudget : true)
  );

  setFilteredGifts(results);
  setHasSearched(true);
};



  const giftList = [
    {
      id: 1,
      name: "Personalized Mug",
      price: 15,
      interest: "coffee",
      image: "/images/mug.jpg",
      reason: "Perfect for those who love coffee and personalized items.",
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 40,
      interest: "music",
      image: "/images/speaker.jpg",
      reason: "Great gift for music enthusiasts.",
    },
    {
      id: 3,
      name: "Handmade Notebook",
      price: 20,
      interest: "journaling",
      image: "/images/notebook.jpg",
      reason: "Ideal for people who enjoy journaling and note-taking.",
    },
    {
      id: 4,
      name: "Yoga Mat",
      price: 25,
      interest: "fitness",
      image: "/images/yoga-mat.jpg",
      reason: "Perfect for those who value a healthy and active lifestyle.",
    },
    {
      id: 5,
      name: "Sketchbook Set",
      price: 30,
      interest: "art",
      image: "/images/sketchbook.jpg",
      reason: "Great for aspiring artists and sketch lovers.",
    },
    {
      id: 6,
      name: "Cooking Utensil Kit",
      price: 35,
      interest: "cooking",
      image: "/images/cooking.jpg",
      reason: "For those who love experimenting in the kitchen.",
    },
    {
      id: 7,
      name: "Book Reading Light",
      price: 12,
      interest: "reading",
      image: "/images/reading-light.jpg",
      reason: "Useful for night-time readers.",
    },
    {
      id: 8,
      name: "Gaming Mouse",
      price: 50,
      interest: "gaming",
      image: "/images/gaming-mouse.jpg",
      reason: "A must-have for PC gaming enthusiasts.",
    },
    {
      id: 9,
      name: "Wireless Headphones",
      price: 45,
      interest: "music",
      image: "/images/headphones.jpg",
      reason: "Listen to music anywhere with great sound quality.",
    },
    {
      id: 10,
      name: "Vinyl Record Collection",
      price: 35,
      interest: "music",
      image: "/images/vinyl.jpg",
      reason: "Perfect for retro and vintage music lovers.",
    },
    {
      id: 11,
      name: "Book Subscription Box",
      price: 30,
      interest: "reading",
      image: "/images/book-box.jpg",
      reason: "Surprise books delivered monthly.",
    },
    {
      id: 12,
      name: "Personal Library Kit",
      price: 20,
      interest: "reading",
      image: "/images/library-kit.jpg",
      reason: "Organize your personal book collection like a pro.",
    },
    {
  id: 13,
  name: "Comic Book Set",
  price: 25,
  interest: "books/comics",
  image: "/images/comic.jpg",
  reason: "Perfect for comic book fans and readers."
},
{
  id: 14,
  name: "Movie Night Kit",
  price: 30,
  interest: "films/series",
  image: "/images/movie-night.jpg",
  reason: "Everything needed for a cozy movie night."
},
{
  id: 15,
  name: "Fitness Tracker Band",
  price: 40,
  interest: "sports",
  image: "/images/fitness-band.jpg",
  reason: "Track steps and stay motivated in sports activities."
},
{
  id: 16,
  name: "Board Game Pack",
  price: 35,
  interest: "board games",
  image: "/images/board-game.jpg",
  reason: "Fun for game nights with friends and family."
},
{
  id: 17,
  name: "Travel Organizer Kit",
  price: 20,
  interest: "travelling",
  image: "/images/travel-kit.jpg",
  reason: "Keeps your essentials tidy while traveling."
},
{
  id: 18,
  name: "Blogging Journal",
  price: 18,
  interest: "blogging",
  image: "/images/blogging.jpg",
  reason: "For jotting down post ideas and creative thoughts."
},
{
  id: 19,
  name: "Dictionary",
  price: 15,
  interest: "language",
  image: "/images/dictionarys.jpg",
  reason: "A helpful tool for language learners."
}

  ];

  return (
<div className="gift-container idil-background">
      <header className="gift-header">
        <h1 className="gift-title">Gift Suggestions</h1>
        <div className="header-buttons">
          <button onClick={toggleDarkMode} className="darkmode-button">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button onClick={() => setShowSelected(!showSelected)} className="darkmode-button">
            {showSelected ? "Hide Selected" : "Selected Gifts"}
          </button>
          <button onClick={() => setShowFavorites(!showFavorites)} className="darkmode-button">
            {showFavorites ? "Hide Favorites" : "Favorite Gifts"}
          </button>
          <button
            onClick={() => {
              setInterest("");
              setBudget("");
              setFilteredGifts([]);
              setHasSearched(false);
            }}
            className="update-button"
          >
            Update
          </button>
        </div>
      </header>

      <div className="mb-6">
        <div className="input-group">
          <label className="input-label">Interest:</label>
          <input
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="input-field"
            placeholder="e.g. music, art, cooking"
          />
        </div>
        <div className="input-group">
  <label className="input-label">Select Recipient:</label>
  <select
    value={selectedRecipient ? selectedRecipient.name : ""}
    onChange={(e) => {
      const selected = recipients.find(r => r.name === e.target.value);
      setSelectedRecipient(selected || null);
      if (selected && selected.interests.length > 0) {
  setInterest(selected.interests.join(", ")); // tüm ilgi alanlarını virgülle yaz
      }
    }}
    className="input-field"
  >
    <option value="">-- No recipient selected --</option>
    {recipients.map((r, i) => (
      <option key={i} value={r.name}>{r.name}</option>
    ))}
  </select>
</div>

<div className="input-group">
  <label className="input-label">Max Budget ($):</label>
  <input
    type="number"
    value={budget}
    onChange={(e) => setBudget(e.target.value)}
    className="input-field"
    placeholder="e.g. 30"
  />
</div>

        <button onClick={handleSearch} className="suggest-button">
          Get Suggestions
        </button>
      </div>

      <div className="gift-grid">
        {hasSearched && filteredGifts.length === 0 ? (
          <div className="col-span-3 text-gray-600 italic">
            <p>No matching gifts found.</p>
            <p>Try increasing your budget or changing the interest.</p>
          </div>
        ) : (
          filteredGifts.map((gift) => (
            <div key={gift.id} className="gift-card">
              <img src={gift.image} alt={gift.name} className="gift-image" />
              <h2 className="gift-name">{gift.name}</h2>
              <p className="gift-price">${gift.price}</p>
              <p className="gift-reason">{gift.reason}</p>
              <button className="more-info-button" onClick={() => setSelectedGift(gift)}>More Info</button>
              <button className="select-button" onClick={() => openSelectModal(gift)}>Select This Gift</button>
              <button className="select-button" onClick={() => handleFavoriteGift(gift)}>Favorite</button>
            </div>
          ))
        )}
      </div>

      {showSelected && (
  <div className="mt-10 centered-gift-section">
    <h2 className="gift-title mb-4">Your Selected Gifts</h2>
    {selectedGifts.length === 0 ? (
      <p className="text-gray-500 italic">You haven’t selected any gifts yet.</p>
    ) : (
      <div className="centered-gift-grid">
        {selectedGifts.map((gift) => (
          <div key={gift.id} className="gift-card">
                  <img src={gift.image} alt={gift.name} className="gift-image" />
                  <h2 className="gift-name">{gift.name}</h2>
                  <p className="gift-price">${gift.price}</p>
                  <p className="gift-reason">{gift.reason}</p>
                  <p><strong>Recipient:</strong> {gift.recipient}</p>
                  <p><strong>Occasion:</strong> {gift.occasion}</p>
                  <button className="close-modal-button" onClick={() => handleDeleteGift(gift.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showFavorites && (
  <div className="mt-10 centered-gift-section">
    <h2 className="gift-title mb-4">Your Favorite Gifts</h2>
    {favoriteGifts.length === 0 ? (
      <p className="text-gray-500 italic">You haven’t favorited any gifts yet.</p>
    ) : (
      <div className="centered-gift-grid">
        {favoriteGifts.map((gift) => (
          <div key={gift.id} className="gift-card">
                  <img src={gift.image} alt={gift.name} className="gift-image" />
                  <h2 className="gift-name">{gift.name}</h2>
                  <p className="gift-price">${gift.price}</p>
                  <p className="gift-reason">{gift.reason}</p>
                  <button className="close-modal-button" onClick={() => handleDeleteFavorite(gift.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ReactModal
        isOpen={!!selectedGift}
        onRequestClose={() => setSelectedGift(null)}
        contentLabel="Gift Details"
        className="gift-modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        {selectedGift && (
          <div>
            <h2 className="modal-title">{selectedGift.name}</h2>
            <img src={selectedGift.image} alt={selectedGift.name} className="modal-image" />
            <p><strong>Price:</strong> ${selectedGift.price}</p>
            <p><strong>Details:</strong> {selectedGift.reason}</p>
            <button onClick={() => setSelectedGift(null)} className="close-modal-button">
              Close
            </button>
          </div>
        )}
      </ReactModal>

      <ReactModal
        isOpen={isSelectModalOpen}
        onRequestClose={closeSelectModal}
        contentLabel="Select Gift Details"
        className="gift-modal"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
      >
        {currentGiftToSelect && (
          <div>
            <h2 className="modal-title">Select Gift: {currentGiftToSelect.name}</h2>
            <div className="input-group">
              <label className="input-label">Recipient:</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="input-field"
                placeholder="Who is this gift for?"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Occasion:</label>
              <input
                type="text"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="input-field"
                placeholder="What's the occasion?"
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleConfirmSelect} className="suggest-button">
                Confirm
              </button>
              <button onClick={closeSelectModal} className="close-modal-button">
                Cancel
              </button>
            </div>
          </div>
        )}
      </ReactModal>
    </div>
  );
}
