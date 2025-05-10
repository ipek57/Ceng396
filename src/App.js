import React, { useState } from "react";
import DerenInterface from "./DerenInterface";
import IlgınInterface from "./IlgınInterface";
import IdilInterface from "./IdilInterface";
import IpekInterface from "./IpekInterface";
import SalihInterface from "./SalihInterface";
import "./App.css";

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
        return <p></p>;
    }
  };

  // Burada page-content'e conditional sınıf ekliyoruz:
  const contentClass = `page-content ${
    selectedUser === "ipek" ? "ipek-bg" : "default-bg"
  }`;

  return (
    <div className="App">
      {/* Sidebar */}
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
      </nav>

      <div className="page-wrapper">
        {/* Üst Sabit Başlık */}
        <header>
          <h1>Welcome to your favorite site!</h1>
        </header>

        {/* Ana İçerik: default veya ipek arkaplanı */}
        <main className={contentClass}>{renderInterface()}</main>
      </div>
    </div>
  );
}

export default App;
