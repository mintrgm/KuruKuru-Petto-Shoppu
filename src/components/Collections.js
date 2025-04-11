import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { useCart } from "../CartContext";
import "./Collections.css";

/* Exotic Pets */
import img0 from "../assets/0.png";
import img1 from "../assets/1.jpeg";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.jpeg";
import img5 from "../assets/5.png";
import img6 from "../assets/6.jpeg";
import img7 from "../assets/7.jpeg";
import img8 from "../assets/8.png";
import img9 from "../assets/9.jpeg";

/* Bites and Bowls */
import img10 from "../assets/10.jpeg";
import img11 from "../assets/11.jpeg";
import img12 from "../assets/12.jpeg";
import img13 from "../assets/13.jpeg";
import img14 from "../assets/14.jpeg";
import img15 from "../assets/15.jpeg";
import img16 from "../assets/16.jpeg";
import img17 from "../assets/17.jpeg";
import img18 from "../assets/18.jpeg";
import img19 from "../assets/19.jpeg";
import img20 from "../assets/20.jpeg";
import img21 from "../assets/21.jpeg";

/* Fetch and Fun */
import img22 from "../assets/22.jpeg";
import img23 from "../assets/23.jpeg";
import img24 from "../assets/24.jpeg";
import img25 from "../assets/25.jpeg";
import img26 from "../assets/26.jpeg";
import img27 from "../assets/27.jpeg";

/* Furry Homes */
import img28 from "../assets/28.jpeg";
import img29 from "../assets/29.jpeg";
import img30 from "../assets/30.jpeg";
import img31 from "../assets/31.jpeg";
import img32 from "../assets/32.jpeg";
import img33 from "../assets/33.jpeg";
import img34 from "../assets/34.jpeg";
import img35 from "../assets/35.jpeg";

/* Collars and Charms */
import img36 from "../assets/36.jpeg";
import img37 from "../assets/37.jpeg";
import img38 from "../assets/38.jpeg";
import img39 from "../assets/39.jpeg";
import img40 from "../assets/40.jpeg";
import img41 from "../assets/41.jpeg";
import img42 from "../assets/42.jpeg";
import img43 from "../assets/43.jpeg";
import img44 from "../assets/44.png";

/* Featured Pets*/
import img45 from "../assets/01.png";
import img46 from "../assets/011.png";
import img47 from "../assets/02.png";
import img48 from "../assets/022.png";
import img49 from "../assets/03.png";
import img50 from "../assets/033.png";
import img51 from "../assets/04.png";
import img52 from "../assets/044.png";


import searchIcon from "../assets/search.png";
import crossIcon from "../assets/cross.png";
import expArrow from "../assets/exparrow.png";
import expArrowB from "../assets/exparrow0.png";
import cartIcon from "../assets/cart.png";

const sliderImages = [img46, img48, img50, img52];

const products = [
  { name: "Axolotl", price: 15000, img: img0 },
  { name: "Albino Ball Python", price: 35000, img: img1 },
  { name: "Albino Ferret", price: 15000, img: img2 },
  { name: "Asian Small-Clawed Otter", price: 15000, img: img3 },
  { name: "Capybara", price: 930000, img: img4 },
  { name: "Hyacinth Macaw", price: 2250000, img: img5 },
  { name: "Indian Star Tortoise", price: 50000, img: img6 },
  { name: "Panther Chameleon", price: 18000, img: img7 },
  { name: "Platypus ", price:  130000000, img: img8 },
  { name: "Victoria Crowned Pigeon", price: 500000, img: img9 },
];

const bitesAndBowls = [
  { name: "Wildberry Mix Plates Pack", price: 5000, img: img10 },
  { name: "KoiKoi Snack Tray", price: 1500, img: img11 },
  { name: "Ferret Feast Diet", price: 950, img: img12 },
  { name: "Otter Munch Plate", price: 1600, img: img13 },
  { name: "Capy Crunch Platter", price: 2200, img: img14 },
  { name: "Macaw Munch Grains", price: 3500, img: img15 },
  { name: "Star Tortoise Treat Dish", price: 1400, img: img16 },
  { name: "Chameleon Water Dish", price: 1800, img: img17 },
  { name: "Platypus Paddle Cup", price: 2800, img: img18 },
  { name: "Royal Grain Feeder", price: 3000, img: img19 },
  { name: "Tortoise Water Plate", price: 1100, img: img20 },
  { name: "Axie Appetite Dish", price: 1200, img: img21 },
];

const fetchItems = [
  { name: "Slinky Slither Tunnel", price: 2500, img: img22 },
  { name: "Plushies Friend Pack", price: 1800, img: img23 },
  { name: "Interactive Food Dumbell", price: 2500, img: img24 },
  { name: "Capy Roller Wheel", price: 4000, img: img25 },
  { name: "Chroma Chase Ladder", price: 2700, img: img26 },
  { name: "Otter Dive Rings", price: 3200, img: img27 },
];

const furryHomes = [
  { name: "Aquatic Abode", price: 3800, img: img28 },
  { name: "Constellation Cove", price: 75000, img: img29 },
  { name: "Blizzard Burrow Bed", price: 200, img: img30 },
  { name: "Riverbank Retreat", price: 5500, img: img31 },
  { name: "Grassland Getaway", price: 6500, img: img32 },
  { name: "Prism Habitat", price: 4200, img: img33 },
  { name: "Coil Comfort Cave", price: 3300, img: img34 },
  { name: "Palatial Perch", price: 6000, img: img35 },
];

const collarItems = [
  { name: "Neotenic Necklace", price: 1500, img: img36 },
  { name: "Giraffe hat crochet", price: 2000, img: img37 },
  { name: "Figurine Pom Pom", price: 1200, img: img38 },
  { name: "Aqua Paws Pendant", price: 2300, img: img39 },
  { name: "Flower Crown crochet", price: 2000, img: img40 },
  { name: "Crochet Hats Pack", price: 3000, img: img41 },
  { name: "Capybara Burger", price: 1800, img: img42 },
  { name: "Donut Scale Tag", price: 2500, img: img43 },
  { name: "Outdoor Harness", price: 2700, img: img44 }
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
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const autoScrollRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const scrollRef = useRef(null);

  useEffect(() => {
    const animateElements = () => {
      document.querySelector(".slider-container")?.classList.add("slide-down");
      document.querySelectorAll(".slide-overlay").forEach(el => el.classList.add("slide-from-right"));
      document.querySelector(".search-wrapper")?.classList.add("zoom-in");
      document.querySelector(".slider-dots")?.classList.add("zoom-in");
  
      document.querySelectorAll(".section-header").forEach(el => el.classList.add("slide-from-left"));
      document.querySelectorAll(".arrow-controls").forEach(el => el.classList.add("slide-from-right"));
      document.querySelectorAll(".section-divider").forEach(el => el.classList.add("expand-center"));
  
      const productCards = document.querySelectorAll(".product-card");
      productCards.forEach((card, i) => {
        setTimeout(() => card.classList.add("pop-in"), i * 100);
      });
    };
  
    setTimeout(animateElements, 100); 
  }, []);  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target); // only once
          }
        });
      },
      { threshold: 0.2 }
    );
  
    document.querySelectorAll(".animate-on-scroll").forEach(el => {
      observer.observe(el);
    });
  }, []);  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
  
    let animationFrameId;
    let delayTimeout;
  
    const scrollStep = () => {
      if (!el || autoScrollPaused || userInteracted) return;
  
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 1;
      }
  
      animationFrameId = requestAnimationFrame(scrollStep);
    };
  
    delayTimeout = setTimeout(() => {
      animationFrameId = requestAnimationFrame(scrollStep);
      autoScrollRef.current = animationFrameId;
    }, 3000); 
  
    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoScrollPaused, userInteracted]);  
  
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

  const handleUserInteraction = () => {
    setAutoScrollPaused(true);
    setUserInteracted(true);

    setTimeout(() => {
      setUserInteracted(false);
      setAutoScrollPaused(false); 
    }, 1000);
  };

  const scrollLeft = () => {
    handleUserInteraction();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };
  
  const scrollRight = () => {
    handleUserInteraction();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
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
      <div className="slider-inner"
        style={{
          transform: `translateX(-${currentIndex * 100}vw)`,
          width: `${sliderImages.length * 100}vw`,
        }}
      >
        {sliderImages.map((src, i) => (
          <div className="slide-wrapper" key={i}>
            <img src={src} alt={`slide-${i}`} className="slide-image" />
            
            <div className="overlay-wrapper">
              <img
                src={[img45, img47, img49, img51][i]}
                alt={`overlay-${i}`}
                className="overlay-image"
              />
            </div>
          </div>
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
      <div className="product-section animate-on-scroll">
        <div className="section-header animate-on-scroll">
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

        <hr className="section-divider animate-on-scroll" />

        <div
          className="product-scroll"
          ref={scrollRef}
          onMouseEnter={handleUserInteraction}
          onMouseLeave={() => setAutoScrollPaused(false)}
        >
          {[...filteredProducts, ...filteredProducts].map((p, i) => (
            <div
              key={i}
              className="product-card animate-on-scroll"
              onMouseEnter={handleUserInteraction}
              onMouseLeave={() => setAutoScrollPaused(false)}
            >
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
        <div className="products-image-section">
        <img
          src={require("../assets/blob.png")}
          alt="Products"
          className="products-hero-image"
        />
        <h2 className="products-title-overlay animate-on-scroll">PRODUCTS</h2>
        </div>
      </div>

      <div className="white-section">

        {/* Bites & Bowls Section */}
        <div className="bites-section animate-on-scroll">
          <div className="bites-header animate-on-scroll">
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

          <hr className="sections-divider animate-on-scroll" />

          <div className={`bites-grid slide-${bitesPage === 1 ? 'right' : 'left'}`}>
            {bitesAndBowls.slice(bitesPage * 6, bitesPage * 6 + 6).map((item, i) => (
              <div className="bites-card animate-on-scroll" key={i}>
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
      <div className="fetch-section animate-on-scroll">
        <div className="bites-header animate-on-scroll">
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

        <hr className="sections-divider animate-on-scroll" />

        <div className={`fetch-grid slide-${fetchPage === 1 ? 'right' : 'left'}`}>
          {fetchItems.slice(fetchPage * 3, fetchPage * 3 + 3).map((item, i) => (
            <div className="fetch-card animate-on-scroll" key={i}>
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
      <div className="furry-section animate-on-scroll">
        <div className="bites-header animate-on-scroll">
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

        <hr className="sections-divider animate-on-scroll" />

        <div className={`furry-grid slide-${furryPage === 1 ? 'right' : 'left'}`}>
          {furryHomes.slice(furryPage * 4, furryPage * 4 + 4).map((item, i) => (
            <div className="furry-card animate-on-scroll" key={i}>
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
      <div className="collar-section animate-on-scroll">
        <div className="bites-header animate-on-scroll">
          <h2>Collars and Charms</h2>
        </div>

        <hr className="sections-divider animate-on-scroll" />

        <div className="collar-grid">
          {collarItems.map((item, i) => (
            <div className="collar-card animate-on-scroll" key={i}>
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
