import React, { useState } from "react";
import "./AxolotlDetail.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { useCart } from "../CartContext";
import cartIcon from "../assets/cart.png";
import bgImage from "../assets/abg.png";

import axolotlImg from "../assets/a8.png";
import axolotl0 from "../assets/a9.png";
import axolotl1 from "../assets/a0.jpeg";
import axolotl2 from "../assets/a1.jpeg";
import axolotl3 from "../assets/a2.jpeg";
import axolotl4 from "../assets/a3.jpeg";
import axolotl5 from "../assets/a4.jpeg";
import axolotl6 from "../assets/a5.jpeg";
import axolotl7 from "../assets/a6.jpeg";
import axolotl8 from "../assets/a7.jpeg";
import essential1 from "../assets/21.jpeg";
import essential2 from "../assets/28.jpeg";
import essential3 from "../assets/33.jpeg";

const AxolotlDetail = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [selectedImg, setSelectedImg] = useState(axolotl1);
  const galleryImages = [axolotl5, axolotl6, axolotl7, axolotl8];

  const handleAddToCart = (item) => {
    if (!user) {
      navigate("/login");
    } else {
      addToCart(item);
    }
  };

  const essentials = [
    {
      name: "Axie Appetite Dish",
      price: 1200,
      img: essential1,
    },
    {
      name: "Aquatic Abode",
      price: 3800,
      img: essential2,
    },
    {
      name: "Prism Habitat",
      price: 4200,
      img: essential3,
    },
  ];

  const handlePurchaseNow = () => {
    navigate("/payment");
  };

  return (
    <>
      <div className="axolotl-page">
        <div className="axolotl-bg-top">
          <img src={bgImage} alt="Background" className="bg-image" />
        </div>

        <div className="axolotl-content">
          <div className="left-text">
            <h1 className="title">Axolotl</h1>
            <div className="price-with-cart">
              <p className="price">Rs. 15,000</p>
              <img
                src={cartIcon}
                alt="cart"
                className="inline-cart-icon"
                onClick={() =>
                  handleAddToCart({
                    name: "Axolotl",
                    price: 15000,
                    img: axolotlImg,
                    quantity: 1,
                    color: "Black",
                  })
                }
              />
            </div>
            <button className="purchase-btn" onClick={handlePurchaseNow}>
              Purchase Now
            </button>
          </div>

          <div className="right-image">
            <img src={axolotlImg} alt="Axolotl" />
          </div>
        </div>
      </div>

      <div className="axolotl-detail-gallery-section">
        <div className="gallery-side-by-side">
          <div className="gallery-left-img">
            <img src={axolotl0} alt="Axolotl Full Left" />
          </div>

          <div className="gallery-right-content">
            <div className="gallery-description">
              <h2>Description</h2>
              <p>
                Discover the magical aquatic world of the Axolotl – a rare creature with regenerative powers
                and a charming face. Select a variant below to preview. Leucistic axolotls have a pale white 
                color and bright pink or red gills. Unlike Albinos, these axolotls have dark-colored eyes and
                sometimes, freckles on their heads and bodies.
              </p>
            </div>

            <div className="main-preview-img">
              <img src={selectedImg} alt="Preview Axolotl" />
            </div>

            <div className="preview-thumbnails">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  className={`preview-thumb ${selectedImg === img ? "active-thumb" : ""}`}
                  onClick={() => setSelectedImg(img)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="essentials-section">
          <h2 className="essentials-title">Don't forget the essentials!</h2>
          <hr className="essentials-divider" />

          <div className="essentials-product-list">
            {essentials.map((item, index) => (
              <div className="essentials-card" key={index}>
                <div className="essentials-img-container">
                  <img src={item.img} alt={item.name} className="essentials-image" />
                </div>
                <img
                  src={cartIcon}
                  className="essentials-cart-icon"
                  alt="cart"
                  onClick={() =>
                    handleAddToCart({ ...item, quantity: 1, color: "Default" })
                  }
                />
                <div className="essentials-info">
                  <p className="essentials-name">{item.name}</p>
                  <p className="essentials-price">Rs. {item.price}/-</p>
                  <select className="essentials-qty">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="axoknowledge-section">
          <div className="axoknowledge-header">
            <h2 className="axoknowledge-title">Before Purchasing Your First Axolotl...</h2>
            <p className="axoknowledge-desc">
              Are you ready to purchase an axolotl? Before you do, there are a few super important things you should do first:
              <br /><br />
              🐟 Purchase a properly-sized tank and all of the necessary equipment.  
              <br />
              🔄 Establish a healthy Nitrogen Cycle in your tank.  
              <br />
              📦 Read and understand the Axolotl Planet Shipping / DOA Policy.  
              <br />
              🧑‍🏫 If you’re in North Texas, come meet our experts! Otherwise, check our guides and blog to become the best Axolotl parent ever.
            </p>
          </div>

          <div className="axoknowledge-cards">
            {[ 
              {
                name: "The Best Axolotl Care Guide in the World",
                img: axolotl2,
                desc: "The Axolotl starter pack you never knew you needed. From water temp to ninja hiding caves!"
              },
              {
                name: "How to Cycle an Aquarium",
                img: axolotl3,
                desc: "Your tank is basically a mini poop ecosystem. Here’s how to not kill your fishy friend."
              },
              {
                name: "Axolotl Health and Disease Prevention: A Comprehensive Guide",
                img: axolotl4,
                desc: "Bumps, blobs, and bloats? Don’t panic—just read this. Your Axolotl will thank you!"
              }
            ].map((item, i) => (
              <div className="axoknowledge-card" key={i}>
                <div className="axoknowledge-img-container" onClick={() => window.location.href = "/blogs-events"}>
                  <img src={item.img} alt={item.name} className="axoknowledge-img" />
                  <div className="axoknowledge-overlay">
                    <p>{item.desc}</p>
                  </div>
                </div>
                <h3 className="axoknowledge-name">{item.name}</h3>
                <button className="axoknowledge-btn" onClick={() => window.location.href = "/blogs-events"}>Learn More</button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

export default AxolotlDetail;
