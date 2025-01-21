import React, { useState } from "react";
import { BLUE_COLOR } from "../utils/colorConstants";

const cardStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-5px)",
  },
};

const CategoryWiseContent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    "All",
    "Electrical Appliances",
    "Furniture",
    "Home Decor",
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Input */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search items..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
          }}
        />
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveTab(category)}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              backgroundColor: activeTab === category ? BLUE_COLOR : "#f0f0f0",
              color: activeTab === category ? "white" : "black",
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category Content */}
      <div style={{ marginTop: "20px" }}>
        {activeTab === "All" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div style={cardStyle}>
              <h3>Electric Kettle</h3>
              <p>Fast boiling electric kettle with auto shut-off</p>
            </div>
            <div style={cardStyle}>
              <h3>Sofa Set</h3>
              <p>3-seater comfortable sofa with premium fabric</p>
            </div>
            <div style={cardStyle}>
              <h3>Wall Clock</h3>
              <p>Modern design wall clock for home decor</p>
            </div>
          </div>
        )}

        {activeTab === "Electrical Appliances" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div style={cardStyle}>
              <h3>Electric Kettle</h3>
              <p>Fast boiling electric kettle with auto shut-off</p>
            </div>
            <div style={cardStyle}>
              <h3>Microwave Oven</h3>
              <p>Digital microwave with multiple cooking modes</p>
            </div>
            <div style={cardStyle}>
              <h3>Coffee Maker</h3>
              <p>Programmable coffee maker with timer</p>
            </div>
          </div>
        )}

        {activeTab === "Furniture" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div style={cardStyle}>
              <h3>Sofa Set</h3>
              <p>3-seater comfortable sofa with premium fabric</p>
            </div>
            <div style={cardStyle}>
              <h3>Dining Table</h3>
              <p>6-seater wooden dining table set</p>
            </div>
            <div style={cardStyle}>
              <h3>Bookshelf</h3>
              <p>Modern bookshelf with adjustable shelves</p>
            </div>
          </div>
        )}

        {activeTab === "Home Decor" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div style={cardStyle}>
              <h3>Wall Clock</h3>
              <p>Modern design wall clock for home decor</p>
            </div>
            <div style={cardStyle}>
              <h3>Table Lamp</h3>
              <p>Decorative table lamp with ambient lighting</p>
            </div>
            <div style={cardStyle}>
              <h3>Throw Pillows</h3>
              <p>Set of decorative throw pillows</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryWiseContent;
