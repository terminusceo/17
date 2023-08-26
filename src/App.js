import React, { useState } from 'react';
import * as s from './styles/globalStyles';
import { useDispatch } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import styled from 'styled-components'; // Make sure you have this import statement
import Header from './Header';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';


AOS.init();



function App() {
  const dispatch = useDispatch();
  const gifs = ["/config/images/art1.gif", "/config/images/art2.gif", "/config/images/art3.gif", "/config/images/art4.gif", "/config/images/art5.gif", "/config/images/art6.gif"];
  const [currentGif, setCurrentGif] = useState(0);

  const handleNextGif = () => {
    setCurrentGif((prevGif) => (prevGif + 1) % gifs.length);
  };

  const handlePreviousGif = () => {
    setCurrentGif((prevGif) => (prevGif - 1 + gifs.length) % gifs.length);
  };

  // State for FAQ toggle
  const [faqItems, setFaqItems] = useState([
    {
      question: "THE ORIGIN",
      answer: "Six Press is an ode to the mesmerizing power of number six. With 1296 unique collectibles, our project fuses the natural allure of mathematical beauty and symmetrical artistry with avant-garde digital craftsmanship. Six Press isn’t just about art; it’s about the harmonious blend of nature's patterns and human creation.",
      isOpen: false
    },
    {
      question: "MINT DETAILS",
      answer: "The Minting process commences at 4 PM UTC, on August 26th. Each mint is priced at 0.099ETH.",
      isOpen: false
    },
    {
      question: "THE GRAND REVEAL",
      answer: "All will be unveiled within 24 hours post the minting's conclusion. Prepare to be enthralled by the world of Six Press!",
      isOpen: false
    },
    {
      question: "OUR CREATORS",
      answer: "At Six Press, our creators stand at intersection of time-honored artistry and cutting-edge technology. They’ve mastered delicate balance of chaos and order, meticulously crafting each collectible to resonate with both the heart and mind.",
      isOpen: false
    },
    // Add more questions and answers as needed
  ]);



  // Function to toggle FAQ item visibility
  const toggleFAQItem = (index) => {
    setFaqItems((prevItems) =>
      prevItems.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : false,
      }))
    );
  };





  return (
    <div>
      <Header /> {/* Use the Header component here */}

      <s.BodyContainer>


        {/* Components and content inside the main body go here */}
      </s.BodyContainer>


      <s.ScrollContainer>
        <s.StyledLink href="https://opensea.io/collection/six-press" target="_blank" rel="noopener noreferrer">
          <s.CustomButton>OpenSea</s.CustomButton>
        </s.StyledLink>

        <s.StyledLink to="/mint">
          <s.CustomButton>Mint</s.CustomButton>
        </s.StyledLink>

        <s.ScrollText>Scroll to start exploring</s.ScrollText>
        <s.ArrowContainer>
          <s.AnimatedArrow />
          <s.AnimatedArrow />
          <s.AnimatedArrow />
        </s.ArrowContainer>
      </s.ScrollContainer>

      <s.IntroductionSection data-aos="fade-up" data-aos-duration="2000">
        <s.IntroductionTitle>Six Press: A Collection of 1296 Unique Digital Artifacts</s.IntroductionTitle>
        <s.ContentWrapper>
          <s.IntroductionGif src="/config/images/art1.gif" alt="Introduction Gif" />
          <s.IntroductionText>
            <s.Subtitle>Six Press: Intersection of Mathematical Beauty and Digital Artistry</s.Subtitle>
            <s.Text>In the vast expanse of digital creation, number 6 emerges as a symbol of harmony, symmetry and balance. Six Press captures this essence, merging mathematical elegance of the number with boundless creativity of the digital age. Each of our 1296 collectibles is a testament to this fusion, a blend of deliberate planning and artistic inspiration.</s.Text>
            <s.Text>At the heart of Six Press lies a commitment to meticulous art of design. Every piece is a product of intricate calculations, ensuring that form and function move together in a dance of symmetry and precision. </s.Text>
            <s.Text>Six Press: A symphony of chaos and order, where the art of symmetry meets digital precision</s.Text>
          </s.IntroductionText>
        </s.ContentWrapper>

      </s.IntroductionSection>

      <s.ArtSection data-aos="fade-up" data-aos-duration="2000">
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <s.ArtTextTitle>Six Press art</s.ArtTextTitle> {/* Title or text above the art */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <s.ArrowLeft onClick={() => setCurrentGif(currentGif === 0 ? gifs.length - 1 : currentGif - 1)}>
              &#8592;
            </s.ArrowLeft>
            <s.ArtImage src={gifs[currentGif]} alt="Art" />
            <s.ArrowRight onClick={() => setCurrentGif((currentGif + 1) % gifs.length)}>
              &#8594;
            </s.ArrowRight>
          </div>
          <s.ArtTextPlaceholder>
            {/* Place your text here */}
            <p>Six Press is where artistry meets precision. Within the 1296 collectibles, the spirit of number six shines through each pixel,
              blending ancient tradition with the new age of digital creation. It's a collection where nature's symmetries meet mathematical beauty.
            </p>
          </s.ArtTextPlaceholder>

          <s.ArtTextPlaceholder>
            {/* Place your text here */}
            <p>

              At Six Press, every form narrates a tale of passion and balance between chaos and order. Each artwork is not just a visual experience;
              it's a journey. A dance of age-old craftsmanship with digital intricacies, inviting viewers into a world of art and algorithm.</p>
          </s.ArtTextPlaceholder>
        </div>
      </s.ArtSection>
      <s.MintScheduleSection data-aos="fade-up" data-aos-duration="1000">
        <s.MintScheduleTitle>Mint Schedule</s.MintScheduleTitle>


        <s.Box>
          <div className="top-row">
            <s.SmallBox>26 AUGUST - 12 - 3 PM UTC</s.SmallBox>

          </div>
          <div className="bottom-row">
            <div className="section">
              <div className="title">WHITELIST</div>
              <div className="text">The whitelist sale is reserved for project supporters included in the prepaid Whitelist.
                Every person on this list has the secured option to mint six SIX.</div>
            </div>
            {/* Add more sections as needed */}
          </div>
        </s.Box>
        <s.Box>
          <div className="top-row">
            <s.SmallBox>26 AUGUST - 3-4 PM UTC</s.SmallBox>
            <s.SmallBox>PRICE: 0.099 ETH</s.SmallBox>
          </div>
          <div className="bottom-row">
            <div className="section">
              <div className="title">WAITLIST</div>
              <div className="text">Should there be any supply left after the Whitelist stage, the Waitlist sale will commence at once.
                Those who applied via the portal, qualify for the Waitlist. Please note that the Waitlist allows only one mint for each wallet.</div>
            </div>
            {/* Add more sections as needed */}
          </div>
        </s.Box>
        <s.Box>
          <div className="top-row">
            <s.SmallBox>26 AUGUST - 4 PM UTC</s.SmallBox>
            <s.SmallBox>PRICE: 0.099 ETH</s.SmallBox>
          </div>
          <div className="bottom-row">
            <div className="section">
              <div className="title">PUBLIC MINT</div>
              <div className="text">If there's remaining supply after the Waitlist stage, the Public sale will initiate without delay. This stage limits minting to six SIX.</div>
            </div>
            {/* Add more sections as needed */}
          </div>
        </s.Box>
      </s.MintScheduleSection>
      <s.FAQSection data-aos="fade-up" data-aos-duration="2000">
        <s.FAQTitle>Frequently Asked Questions</s.FAQTitle>
        {faqItems.map((item, index) => (
          <s.FAQItem key={index}>
            <s.FAQQuestionContainer onClick={() => toggleFAQItem(index)}> {/* Use container here */}
              <s.FAQQuestionText>{item.question}</s.FAQQuestionText>
              <s.FAQArrow>{item.isOpen ? '↑' : '↓'}</s.FAQArrow>
            </s.FAQQuestionContainer>
            {item.isOpen && <s.FAQAnswer>{item.answer}</s.FAQAnswer>}
          </s.FAQItem>
        ))}
      </s.FAQSection>





    </div>
  );
}

export default App;
