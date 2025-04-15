import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
  });
  useEffect(() => {
    const storedEntries = localStorage.getItem("journalEntries");
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addEntry = () => {
    if (formData.title && formData.content && formData.date) {
      const newEntry = { ...formData, id: Date.now() };
      setEntries([...entries, newEntry]);
      setFormData({ title: "", content: "", date: "" });
    }
  };

  return (
    <div className="app">
      <h1>Personal Journal 📔</h1>

    
      <div className="form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Write your thoughts here..."
          value={formData.content}
          onChange={handleInputChange}
        ></textarea>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <button onClick={addEntry}>Add Entry</button>
      </div>

      {/* Display Journal Entries */}
      <div className="entries">
        <h2>Your Entries</h2>
        {entries.length > 0 ? (
          <ul>
            {entries.map((entry) => (
              <li key={entry.id}>
                <h3>{entry.title}</h3>
                <p>{entry.content}</p>
                <small>{entry.date}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No entries yet. Start journaling today!</p>
        )}
      </div>
    </div>
  );
}

export default App;