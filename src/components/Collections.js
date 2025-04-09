import React, { useEffect, useRef, useState } from "react";
import "./Collections.css";

import img1 from "../assets/0.png";
import img2 from "../assets/1.png";
import img3 from "../assets/2.png";
import img4 from "../assets/4.png";
import searchIcon from "../assets/search.png";
import crossIcon from "../assets/cross.png";
import expArrow from "../assets/exparrow.png";
import cartIcon from "../assets/cart.png";

const sliderImages = [img1, img2, img3, img4];

const products = [
  { name: "Albino Python", price: 25000, img: img1 },
  { name: "Macaw Parrot", price: 18000, img: img2 },
  { name: "Axolotl", price: 12000, img: img3 },
  { name: "Sugar Glider", price: 15000, img: img4 },
  { name: "Chameleon", price: 9000, img: img2 },
  { name: "Fennec Fox", price: 22000, img: img1 },
  { name: "Capybara", price: 27000, img: img3 },
  { name: "Blue Poison Dart Frog", price: 8000, img: img4 },
  { name: "Koi Fish", price: 5000, img: img2 },
  { name: "Serval Cat", price: 32000, img: img1 },
];

const Collections = () => {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    if (el) {
      el.addEventListener("scroll", handleScroll);
      handleScroll();
    }
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollLeft = () => scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  const scrollRight = () => scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });

  const handleSuggestionClick = (name) => {
    setQuery(name);
    setSuggestions([]);
  };

  const handleSearchClick = () => {
    if (!searched && query.trim()) {
      const matched = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(matched);
      setSearched(true);
      setSuggestions([]);
    } else {
      setQuery("");
      setFilteredProducts(products);
      setSearched(false);
    }
  };

  return (
    <div className="collections-page">
      <div className="slider-container">
        <div
          className="slider-inner"
          style={{
            transform: `translateX(-${currentIndex * 100}vw)`,
            width: `${sliderImages.length * 100}vw`,
          }}
        >
          {sliderImages.map((src, i) => (
            <img key={i} src={src} alt={`slide-${i}`} className="slide-image" />
          ))}
        </div>

        {/* Search Bar */}
        <div className="search-wrapper">
            <div className="search-bar">
                <input
                type="text"
                className="search-input"
                value={query}
                placeholder="Search..."
                onChange={(e) => {
                    const value = e.target.value;
                    setQuery(value);
                    setSearched(false);
                  
                    if (value.trim() === "") {
                      setSuggestions([]);
                      setFilteredProducts(products);
                      return;
                    }
                  
                    const matched = products.filter((p) =>
                      p.name.toLowerCase().includes(value.toLowerCase())
                    );
                    setSuggestions(matched);
                  }}
                />
                <button className="search-button" onClick={handleSearchClick}>
                <img src={searched ? crossIcon : searchIcon} alt="search" />
                </button>
            </div>

            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                {suggestions.map((sug, idx) => (
                    <li key={idx} onClick={() => handleSuggestionClick(sug.name)}>
                    {sug.name}
                    </li>
                ))}
                </ul>
            )}
            </div>

        {/* Dots */}
        <div className="slider-dots">
          {sliderImages.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(i)}
            ></div>
          ))}
        </div>
      </div>

      {/* Exotic Friends Section */}
      <div className="product-section">
        <div className="section-header">
          <h2>Exotic Friends</h2>
          <div className="arrow-controls">
            {canScrollLeft && (
              <img src={expArrow} alt="Left" className="arrow" onClick={scrollLeft} />
            )}
            {canScrollRight && (
              <img src={expArrow} alt="Right" className="arrow flipped" onClick={scrollRight} />
            )}
          </div>
        </div>

        <hr className="section-divider" />

        <div className="product-scroll" ref={scrollRef}>
          {filteredProducts.map((p, i) => (
            <div key={i} className="product-card">
              <img src={p.img} alt={p.name} className="product-image" />
              <div className="cart-hover">
                <img src={cartIcon} alt="cart" className="cart-icon" />
              </div>
              <p className="product-name">{p.name}</p>
              <div className="dropdowns">
                <select>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <select
                  onChange={(e) => {
                    const val = e.target.value.toLowerCase();
                    e.target.style.backgroundColor =
                      val === "brown" ? "#77554B" : val;
                    e.target.style.color = val === "black" ? "white" : "black";
                  }}
                  defaultValue="Black"
                >
                  <option>Black</option>
                  <option>White</option>
                  <option>Brown</option>
                </select>
              </div>
              <p className="product-price">Rs. {p.price}/-</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
