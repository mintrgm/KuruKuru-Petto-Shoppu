import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { useCart } from "../CartContext";
import "./Collections.css";

import img1 from "../assets/0.png";
import img2 from "../assets/1.png";
import img3 from "../assets/2.png";
import img4 from "../assets/4.png";
import searchIcon from "../assets/search.png";
import crossIcon from "../assets/cross.png";
import expArrow from "../assets/exparrow.png";
import expArrowB from "../assets/exparrow0.png";
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

const bitesAndBowls = [
  { name: "Chicken Bites", price: 450, img: img1 },
  { name: "Salmon Snacks", price: 500, img: img1 },
  { name: "Tuna Treats", price: 480, img: img1 },
  { name: "Chewy Bones", price: 400, img: img1 },
  { name: "Veggie Mix Bowl", price: 600, img: img1 },
  { name: "Grain-Free Kibble", price: 750, img: img1 },
  { name: "Beef Nuggets", price: 520, img: img1 },
  { name: "Soft Lamb Bites", price: 490, img: img1 },
  { name: "Ocean Delight", price: 510, img: img1 },
  { name: "Turkey Crunch", price: 550, img: img1 },
  { name: "Fruit Mix Bowl", price: 495, img: img1 },
  { name: "Mini Bacon Rolls", price: 530, img: img1 },
];

const fetchItems = [
  { name: "Rubber Bone", price: 320, img: img2 },
  { name: "Squeaky Ball", price: 250, img: img3 },
  { name: "Rope Tug", price: 400, img: img1 },
  { name: "Frisbee Flyer", price: 550, img: img4 },
  { name: "Chew Stick", price: 300, img: img2 },
  { name: "Plush Duck", price: 450, img: img3 },
  { name: "Treat Puzzle", price: 600, img: img1 },
  { name: "Interactive Bone", price: 500, img: img4 }
];

const furryHomes = [
  { name: "Plush Cat Bed", price: 1200, img: img4 },
  { name: "Wooden Dog House", price: 2500, img: img4 },
  { name: "Bunny Hutch", price: 1800, img: img3 },
  { name: "Hamster Habitat", price: 1400, img: img1 },
  { name: "Pet Tent", price: 1000, img: img4 },
  { name: "Cat Tree Condo", price: 2200, img: img2 },
  { name: "Foldable Crate", price: 1600, img: img2 },
  { name: "Luxury Dog Bed", price: 2000, img: img4 },
];

const collarItems = [
  { name: "Leather Collar", price: 400, img: img1 },
  { name: "Charm Bell", price: 150, img: img2 },
  { name: "Studded Collar", price: 600, img: img3 },
  { name: "Bow Tie Charm", price: 200, img: img4 },
  { name: "Reflective Band", price: 350, img: img2 },
  { name: "Floral Collar", price: 450, img: img3 },
  { name: "Name Tag Charm", price: 250, img: img1 },
  { name: "Sparkle Band", price: 500, img: img4 },
  { name: "Gold Buckle", price: 550, img: img2 }
];

const Collections = () => {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [bitesPage, setBitesPage] = useState(0);
  const [fetchPage, setFetchPage] = useState(0);
  const [furryPage, setFurryPage] = useState(0);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
  };

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
              <div
                className="cart-hover"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else {
                    addToCart({
                      name: p.name,
                      price: p.price,
                      img: p.img,
                      quantity: 1,
                      color: "Black",
                    });
                  }
                }}
              >
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
                    e.target.style.backgroundColor = val === "brown" ? "#77554B" : val;
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

      <div className="products-image-section">
        <img
          src={require("../assets/blob.png")}
          alt="Products"
          className="products-hero-image"
        />
        <h2 className="products-title-overlay">PRODUCTS</h2>
      </div>

      <div className="white-section">

        {/* Bites & Bowls Section */}
        <div className="bites-section">
          <div className="bites-header">
            <h2>Bites and Bowls</h2>
            <div className="arrow-controls">
              {bitesPage === 0 && (
                <img
                  src={expArrowB}
                  alt="Next"
                  className="arrow arrow-right"
                  onClick={() => setBitesPage(1)}
                />
              )}
              {bitesPage === 1 && (
                <img
                  src={expArrowB}
                  alt="Previous"
                  className="arrow arrow-left flipped"
                  onClick={() => setBitesPage(0)}
                />
              )}
            </div>
          </div>

          <hr className="sections-divider" />

          <div className={`bites-grid slide-${bitesPage === 1 ? 'right' : 'left'}`}>
            {bitesAndBowls.slice(bitesPage * 6, bitesPage * 6 + 6).map((item, i) => (
              <div className="bites-card" key={i}>
                <div className="bites-image-wrapper">
                  <img src={item.img} alt={item.name} className="bites-image" />
                  <div
                    className="cart-hover"
                    onClick={() => {
                      if (!user) navigate("/login");
                      else addToCart({ name: item.name, price: item.price, img: item.img, quantity: 1, color: "Black" });
                    }}
                  >
                    <img src={cartIcon} alt="cart" className="cart-icon" />
                  </div>
                </div>
                <div className="bites-details">
                  <div className="bites-col-left">
                    <p className="product-name">{item.name}</p>
                    <p className="product-price">Rs. {item.price}/-</p>
                  </div>
                  <div className="bites-col-right">
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                    <select
                      onChange={(e) => {
                        const val = e.target.value.toLowerCase();
                        e.target.style.backgroundColor = val === "brown" ? "#77554B" : val;
                        e.target.style.color = val === "black" ? "white" : "black";
                      }}
                      defaultValue="Black"
                    >
                      <option>Black</option>
                      <option>White</option>
                      <option>Brown</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fetch & Fun Section */}
      <div className="fetch-section">
        <div className="bites-header">
          <h2>Fetch and Fun</h2>
          <div className="arrow-controls">
            {fetchPage === 0 && (
              <img
                src={expArrowB}
                alt="Next"
                className="arrow arrow-right"
                onClick={() => setFetchPage(1)}
              />
            )}
            {fetchPage === 1 && (
              <img
                src={expArrowB}
                alt="Previous"
                className="arrow arrow-left flipped"
                onClick={() => setFetchPage(0)}
              />
            )}
          </div>
        </div>

        <hr className="sections-divider" />

        <div className="fetch-grid">
          {fetchItems.slice(fetchPage * 3, fetchPage * 3 + 3).map((item, i) => (
            <div className="fetch-card" key={i}>
              <img src={item.img} alt={item.name} className="fetch-image" />
              
              <div className="fetch-overlay">
                <div className="fetch-details">
                  <p className="product-name">{item.name}</p>
                  <div className="dropdowns">
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                    <select
                      onChange={(e) => {
                        const val = e.target.value.toLowerCase();
                        e.target.style.backgroundColor = val === "brown" ? "#77554B" : val;
                        e.target.style.color = val === "black" ? "white" : "black";
                      }}
                      defaultValue="Black"
                    >
                      <option>Black</option>
                      <option>White</option>
                      <option>Brown</option>
                    </select>
                  </div>
                  <p className="product-price">Rs. {item.price}/-</p>
                </div>
              </div>

              <div
                className="cart-hover"
                onClick={() => {
                  if (!user) navigate("/login");
                  else addToCart({
                    name: item.name,
                    price: item.price,
                    img: item.img,
                    quantity: 1,
                    color: "Black",
                  });
                }}
              >
                <img src={cartIcon} alt="cart" className="cart-icon" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Furry Homes Section */}
      <div className="furry-section">
        <div className="bites-header">
          <h2>Furry Homes</h2>
          <div className="arrow-controls">
            {furryPage === 0 && (
              <img
                src={expArrowB}
                alt="Next"
                className="arrow arrow-right"
                onClick={() => setFurryPage(1)}
              />
            )}
            {furryPage === 1 && (
              <img
                src={expArrowB}
                alt="Previous"
                className="arrow arrow-left flipped"
                onClick={() => setFurryPage(0)}
              />
            )}
          </div>
        </div>

        <hr className="sections-divider" />

        <div className="furry-grid">
          {furryHomes.slice(furryPage * 4, furryPage * 4 + 4).map((item, i) => (
            <div className="furry-card" key={i}>
              <div className="furry-image-wrapper">
                <img src={item.img} alt={item.name} className="furry-image" />
                <div
                  className="cart-hover"
                  onClick={() => {
                    if (!user) navigate("/login");
                    else addToCart({
                      name: item.name,
                      price: item.price,
                      img: item.img,
                      quantity: 1,
                      color: "Black",
                    });
                  }}
                >
                  <img src={cartIcon} alt="cart" className="cart-icon" />
                </div>
              </div>

              <div className="furry-details">
                <div className="furry-col-left">
                  <p className="product-name">{item.name}</p>
                  <div className="furry-dropdowns">
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                    <select
                      onChange={(e) => {
                        const val = e.target.value.toLowerCase();
                        e.target.style.backgroundColor = val === "brown" ? "#77554B" : val;
                        e.target.style.color = val === "black" ? "white" : "black";
                      }}
                      defaultValue="Black"
                    >
                      <option>Black</option>
                      <option>White</option>
                      <option>Brown</option>
                    </select>
                  </div>
                  <p className="product-price">Rs. {item.price}/-</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collars and Charms Section */}
      <div className="collar-section">
        <div className="bites-header">
          <h2>Collars and Charms</h2>
        </div>

        <hr className="sections-divider" />

        <div className="collar-grid">
          {collarItems.map((item, i) => (
            <div className="collar-card" key={i}>
              <div className="collar-image-wrapper">
                <img src={item.img} alt={item.name} className="collar-image" />
                <div
                  className="cart-hover"
                  onClick={() => {
                    if (!user) navigate("/login");
                    else addToCart({ name: item.name, price: item.price, img: item.img, quantity: 1, color: "Black" });
                  }}
                >
                  <img src={cartIcon} alt="cart" className="cart-icon" />
                </div>
              </div>
              <div className="collar-details">
                <div className="collar-col-left">
                  <p className="product-name">{item.name}</p>
                  <p className="product-price">Rs. {item.price}/-</p>
                </div>
                <div className="collar-col-right">
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                  <select
                    onChange={(e) => {
                      const val = e.target.value.toLowerCase();
                      e.target.style.backgroundColor = val === "brown" ? "#77554B" : val;
                      e.target.style.color = val === "black" ? "white" : "black";
                    }}
                    defaultValue="Black"
                  >
                    <option>Black</option>
                    <option>White</option>
                    <option>Brown</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div> 
    </div>
  );
};

export default Collections;
