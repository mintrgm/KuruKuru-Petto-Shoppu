import React, { useEffect, useState } from "react";
import "./BlogsEvents.css";
import bgCats from "../assets/004.png";
import expArrow from "../assets/exparrow0.png";
import img3 from "../assets/1000.png";
import img4 from "../assets/2000.jpeg";
import img5 from "../assets/3000.png";
import img6 from "../assets/4000.jpeg";

const sliderCards = [
  {
    icon: "45.jpeg",
    title: "My Tortoise is Faster Than My Wi-Fi",
    description:
      "You’d think a tortoise would be chill and slow, right? Not Gary. He’s already halfway to the neighbor’s yard while I’m still waiting for my page to load. Let’s talk about how underestimating exotic pets can lead to losing a race... and your cucumbers.",
  },
  {
    icon: "46.jpeg",
    title: "The Day My Gecko Started Judging Me",
    description:
      "I used to think I was the boss in this house. Then came Spud, my Leopard Gecko. With every blink and head tilt, he slowly dismantled my confidence. Was he plotting something—or just silently criticizing my life choices?",
  },
  {
    icon: "47.jpeg",
    title: "Parrot Problems: He Repeats My Online Orders",
    description:
      "Meet Mango, the parrot who heard “Add to cart” one too many times. Now he mimics my Amazon orders... in front of guests. Let's unpack how exotic pets might be the most dangerous kind of eavesdroppers.",
  },
];

const eventProducts = [
  {
    name: "Axolotl Spa & Chill",
    img: img3,
    description: "Ready to relax like a true regeneration king? Float with Axolotls in a bubble-filled zen pond while sipping cucumber water. Includes optional mud facials and zero social pressure—just like the Axo likes it."
  },
  {
    name: "Capybara Picnic & Vibe Fest",
    img: img4,
    description: "Hang out with the internet’s favorite unbothered unit. Bring snacks, grab a blanket, and vibe with Capybara as lo-fi beats play. Bonus: birds may or may not land on him during the event."
  },
  {
    name: "Midnight Mingle with the Pythons",
    img: img5,
    description: "Join us under soft lighting for a chill evening with the most elegant noodle around. Cozy, coiled, and completely unbothered—he might not talk much, but he slithers straight into your heart."
  },
  {
    name: "Otter Chaos & Cuddle Camp",
    img: img6,
    description: "Tiny hands, BIG energy. Slide into an evening of splashy games, snack raids, and cuddle sprints with the Asian Small-Clawed Otters. Warning: you might leave emotionally attached."
  }
];

const BlogsEvents = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderCards.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderCards.length) % sliderCards.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderCards.length);
  };

  const [verticalSwipe, setVerticalSwipe] = useState("translateY(0)");

  const scrollLeft = () => {
    setVerticalSwipe("translateY(-50px)");
    setTimeout(() => {
      setIndex((prev) => prev - 2);
      setVerticalSwipe("translateY(0)");
    }, 150);
  };

  const scrollRight = () => {
    setVerticalSwipe("translateY(50px)");
    setTimeout(() => {
      setIndex((prev) => prev + 2);
      setVerticalSwipe("translateY(0)");
    }, 150);
  };

  return (
    <div className="blogs-events-page">
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <h1>Exotic Pets,<br />Without the Extinction–Level Prices</h1>
            <p>
              Ever dreamed of cuddling a Capybara or sharing snacks with an otter? Same.<br />
              But between illegal import fees and millionaire budgets, we figured—<br />
              why not make exotic pets fun, visible, and just a little more “click-to-cart”?<br />
              Welcome to your dream pet jungle. Minus the smuggling charges.
            </p>
            <button
            className="hero-btn"
            onClick={() => {
              document.getElementById("scroll-to-blogs").scrollIntoView({
                behavior: "smooth",
                block: "center" 
              });
            }}
          >
            Learn More
          </button>
          </div>
          <div className="hero-image">
            <img src={require("../assets/001.png")} alt="Exotic Pet" />
          </div>
        </div>
      </section>

      <section className="hero-section1">
        <div className="hero-content-wrapper1">
          <div className="hero-image1">
            <img src={require("../assets/002.png")} alt="Exotic Pet Left" />
          </div>
          <div className="hero-text1">
            <h1>Capybara: The Unbothered King of Chill</h1>
            <p>
              Why is this 150-pound rodent everyone’s spirit animal?<br />
              Explore how capybaras became the internet’s emotional support animal<br />
              and how your bathtub might not be ready for one.
            </p>
          </div>
        </div>
      </section>

      <section className="hero-section1">
        <div className="hero-content-wrapper1">
          <div className="hero-text1">
            <h1>What If Your Chameleon Had an Instagram?</h1>
            <p>
              What would a day-in-the-life look like for your Panther Chameleon influencer?<br />
              Spoiler: It involves 7 naps, 1 escape attempt, and a heated argument with a houseplant.
            </p>
          </div>
          <div className="hero-image2">
            <img src={require("../assets/003.png")} alt="Exotic Pet Left" />
          </div>
        </div>
      </section>

      <section
        className="card-slider"
        id="scroll-to-blogs"
        style={{ backgroundImage: `url(${bgCats})` }}
      >
        <div className="slider-wrapper">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderCards.map((card, index) => (
              <div className="slider-card" key={index}>
                <div className="card-content">
                  <div className="circle-img">
                    <img src={require(`../assets/${card.icon}`)} alt="icon" />
                  </div>
                  <div className="card-text">
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <h1 className="events-heading">EVENTS</h1>


      <section className="events-products-section">
      {index > 0 && (
        <div className="arrow left" onClick={scrollLeft}>
          <img src={expArrow} alt="left" className="flipped" />
        </div>
      )}

      <div className="event-product-wrapper" style={{ transform: verticalSwipe }}>
        {eventProducts.slice(index, index + 2).map((item, i) => (
          <div className="event-product-card" key={i}>
            <div className="event-image-container">
              <img src={item.img} alt={item.name} className="event-product-img" />
              <div className="event-overlay">
                <p>{item.description}</p>
              </div>
            </div>
            <div className="event-product-details">
              <h3>{item.name}</h3>
              <button className="join-btn">Join Now</button>
            </div>
          </div>
        ))}
      </div>

      {index < eventProducts.length - 2 && (
        <div className="arrow right" onClick={scrollRight}>
          <img src={expArrow} alt="right" />
        </div>
      )}
    </section>
    </div>
  );
};

export default BlogsEvents;
