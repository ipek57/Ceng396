import React, { useState } from "react";
import DerenInterface from "./DerenInterface";
import IlgınInterface from "./IlgınInterface";
import IdilInterface from "./IdilInterface";
import IpekInterface from "./IpekInterface";
import SalihInterface from "./SalihInterface";
import "./App.css";

function Homepage({ onStart }) {
  return (
    <div className="homepage">
      <h2>Smart Gift Selector &amp; Reminder Robot</h2>
      <p>
        This project is designed to maintain a comprehensive history of all
        gifts given to each recipient, intelligently preventing duplicate
        recommendations by analyzing past transactions. Leveraging sophisticated
        tracking and personalization algorithms, the system delivers
        thoughtfully curated, diverse gift suggestions tailored to individual
        tastes and occasions—ensuring every gift choice is both meaningful and
        memorable.
      </p>
      <button className="btn-home-main" onClick={onStart}>
        Click to begin
      </button>
    </div>
  );
}

function App() {
  const [selectedUser, setSelectedUser] = useState("");

  const renderInterface = () => {
    switch (selectedUser) {
      case "ilgin":
        return <IlgınInterface />;
      case "idil":
        return <IdilInterface />;
      case "deren":
        return <DerenInterface />;
      case "ipek":
        return <IpekInterface />;
      case "salih":
        return <SalihInterface />;
      default:
        return <Homepage onStart={() => setSelectedUser("ilgin")} />;
    }
  };

  return (
    <div className="App">
      <nav className="menu">
        <div className="menu-header">
          Smart Gift Selector
          <br />
          and Reminder Robot
        </div>
        <button onClick={() => setSelectedUser("ilgin")}>Ilgın</button>
        <button onClick={() => setSelectedUser("idil")}>İdil</button>
        <button onClick={() => setSelectedUser("deren")}>Deren</button>
        <button onClick={() => setSelectedUser("ipek")}>İpek</button>
        <button onClick={() => setSelectedUser("salih")}>Salih</button>

        {/* Sidebar’daki Return Home butonu */}
        {selectedUser && (
          <button
            className="btn-home-sidebar"
            onClick={() => setSelectedUser("")}
          >
            Return Home
          </button>
        )}
      </nav>

      <div className="page-wrapper">
        <header>
          <h1>Welcome to your favorite site!</h1>
        </header>

        <main className="page-content">{renderInterface()}</main>
      </div>
    </div>
  );
}

export default App;
