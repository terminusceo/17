import styled from 'styled-components';
import { NavLink } from 'react-router-dom'; // Import NavLink
import { createGlobalStyle } from 'styled-components';
import { Link as ReactRouterLink } from 'react-router-dom';
import KistFont from './kist.woff';
import NormalFont from './font.woff';




const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Kist';
    src: url(${KistFont}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Normal';
    src: url(${NormalFont}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;




// Header styling
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent; // Making the background transparent
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  
  
`;

export const Logo = styled.img`
  height: 32px;
  width: 32px;
  margin-right: 30px;
`;

export const HeaderLinks = styled.div`
  display: flex;
  gap: 20px;
  font-family: 'Normal';
  font-size: 30px;
  margin-right: auto; /* Push the links to the right */
  font-weight: bold;
  
`;

export const CustomLink = styled(NavLink)`
  color: var(--header-bottom-border-color); /* Change to your desired color */
  text-decoration: none; /* Remove underline from links */
  font-weight: normal;

  &.active {
    font-weight: bold;
  }
`;


// Adjusting the button styling to make it transparent
export const WalletButton = styled.button`
  background: transparent;
  border: 1px solid var(--header-bottom-border-color); // You can customize the border color here
  color: var(--header-bottom-border-color); // You can customize the text color here
  padding: 8px 16px;
  font-size: 30px;
  font-family: 'Normal';
  cursor: pointer;
  transition: background-color 0.3s ease; // Smooth transition when hovering

  &:hover {
    background-color: rgba(128, 128, 128, 0.4); // Gray background with 10% opacity
  }
`;

export const WalletAddress = styled.div`
  /* Styles for the wallet address */
  color: var(--header-bottom-border-color);
  font-size: 25px;
  font-family: 'Normal';
  font-weight: bold;
`;


export const WalletDetails = styled.div`
  display: flex;
  align-items: center; // Vertically aligns children in the center
  gap: 1rem;           // Adds a gap between children, adjust as needed
`;

export const DisconnectButton = styled.button`
  background: transparent;
  border: 1px solid var(--header-bottom-border-color);
  color: var(--header-bottom-border-color);
  padding: 8px 16px;
  font-size: 25px;     // Matching the font size of WalletAddress
  font-family: 'Normal';
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(128, 128, 128, 0.4); // Gray background with 40% opacity on hover
  }
`;


// Body styling


export const StyledLink = styled(ReactRouterLink).attrs(props => ({
  as: props.to ? ReactRouterLink : 'a'
}))`
  text-decoration: none; 
  color: inherit; 
`;

export const CustomButton = styled(WalletButton)`
  margin: 0 10px; // This gives a 10px spacing between the buttons
  margin: 0 10px 20px 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px); // Assuming your header is 60px, this will center the buttons in the remaining viewport height;
  
`;




export const BodyContainer = styled.div`
  background: url('/config/images/bg.png') no-repeat center center fixed; 
  background-size: cover;
  background-attachment: scroll;
  overflow: auto;
  min-height: 100vh;
  padding: 20px;
  

  @media (max-width: 768px) {
    // Any mobile-specific styles can go here
  }
`;


export const ScrollContainer = styled.div`
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 10%; // Adjust as needed
`;

export const ScrollText = styled.p`
  font-size: 30px;
  font-family: 'Normal';
  margin: 0;
  color: var(--header-bottom-border-color);
`;

// Update in globalStyles.js

export const AnimatedArrow = styled.div`
  display: inline-block;
  margin-left: 5px;
  width: 15px;
  height: 15px;
  border-left: 3px solid  var(--header-bottom-border-color);
  border-bottom: 3px solid  var(--header-bottom-border-color);
  opacity: 1;
  animation: pulse 2s infinite;
  

  @keyframes pulse {
    0%, 100% {
      transform: rotate(-45deg) translateY(0);
      opacity: 1;
    }
    50% {
      transform: rotate(-45deg) translateY(0);
      opacity: 0;
    }
  }
`;



export const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; // Center the arrows horizontally
`;


export const IntroductionSection = styled.div`
  display: flex;
  flex-direction: column; // Stacking title and content wrapper vertically
  align-items: center;
  justify-content: center;
  background-image: url('/config/images/bgwhite.png');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh; // Ensures it takes at least the full viewport height
  padding: 20px;
  text-align: center; // Centering the title;
  color: var(--introduction);
  
`;

export const IntroductionTitle = styled.h1`
  font-size: 48px; // Increase font size
  margin-bottom: 40px; // Add spacing between the title and the rest
  font-style: italic;
  color: var(--introduction);
  font-family: 'Kist';
  width: 50%;
  
`;

export const ContentWrapper = styled.div`
  display: flex; // Horizontally aligning the gif and text
  width: 100%;
  max-width: 1000px; // You can adjust this to your preferred width
`;

export const IntroductionText = styled.div`
  flex: 1;
  padding-left: 10px; // Add spacing between the gif and text
`;

export const IntroductionGif = styled.img`
  flex: 1;
  max-width: 500px;
  height: auto;
`;

export const Subtitle = styled.h2`
  font-size: 25px; // Adjust the size as desired
  margin-bottom: 50px; // Add space below the subtitle
  font-family: 'Normal';
  font-weight: bold;
  text-align: left;
`;

export const Text = styled.p`
  font-size: 24px; // Adjust the size as desired
  margin-bottom: 25px;
  font-family: 'Normal';
  text-align: left;
`;




export const ArtSection = styled.div`
  background-image: url('/config/images/bgblack2.png');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ArtImage = styled.img`
  width: 500px; // Adjust as needed
  height: auto;
`;

export const ArrowLeft = styled.div`
  font-size: 40px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 20px;
  font-family: 'Normal';
  color: var(--primary);
`;

export const ArrowRight = styled.div`
  font-size: 40px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 20px;
  font-family: 'Normal';
  color: var(--primary);
`;

export const ArtTextPlaceholder = styled.div`
  text-align: center;
  font-size: 24px;
  padding: 20px;
  color: var(--primary); // set the text color to black
  margin-top: 20px; // add margin to position it below the gif
  margin-bottom: 10px;
  width: 50%;
  font-family: 'Normal';
`;

export const ArtTextTitle = styled.h2`
  font-size: 48px;
  text-align: center;
  margin-bottom: 30px; // Adjust as needed
  font-family: 'Kist', sans-serif;
  color: var(--primary);
`;


export const MintScheduleSection = styled.div`
  background-image: url('/config/images/bgblack2.png');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const MintScheduleTitle = styled.h2`
  color: var(--primary);
  font-size: 48px;
  margin-bottom: 20px;
  font-family: 'Kist', sans-serif;
`;


export const Box = styled.div`
  width: 1000px;
  height: 200px;
  background-color: var( --mint-info);
  opacity: 0.7;
  border: 2px solid var(--primary);
  margin: 20px;
  display: flex;
  flex-direction: column;
  color: var(--primary-text);
  font-size: 24px;
  border-radius: 30px 0 30px 0;
  padding: 10px;

  .top-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .title {
    font-size: 30px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px; // If you want some spacing between the title and the text
    font-family: 'Normal', sans-serif;
  }

  .bottom-row {
    flex-grow: 1; // Allows the bottom-row to take up remaining space
    display: flex;
    flex-direction: column; // Stacks the text vertically
    justify-content: flex-start; // Aligns the text at the top of the available space
    align-items: flex-start;
  }

  .text {
    font-size: 20px;
    font-family: 'Normal', sans-serif;
  }

  
`;

export const SmallBox = styled.div`
  background-color: rgba(255, 255, 255, 0.3); // White with 0.9 opacity
  color: var(--accent);
  padding: 5px 10px;
  border-radius: 5px;
  font-family: 'Normal';
  color: var(--primary)
`;


export const FAQSection = styled.div`
  background-image: url('/config/images/bgblack2.png');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FAQTitle = styled.h2`
  color: var(--primary-text);
  font-size: 48px;
  margin-bottom: 20px;
  font-family: 'Kist'
`;

export const FAQItem = styled.div`
  width: 50%;
  border: 0px solid var(--primary);
  margin: 20px;
  padding: 20px;
  color: var(--primary-text);
  font-size: 24px;
  border-radius: 20px;
`;

export const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  // Add additional styling here
  font-family:'Normal';
  color:  var(--primary)
`;

export const FAQQuestionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--primary); // Underline with a border
`;


export const FAQQuestionText = styled.span`
  flex-grow: 1; // Allow the text to take up available space
  font-size: 24px;
  font-weight: 400;
  font-family: 'Normal';
  color: var(--primary);
  margin-right: 10px; // Space between text and arrow
`;

export const FAQArrow = styled.span`
  width: 20px; // Fixed width to align arrows
  font-size: 24px;
  font-family: 'Normal';
  color: var(--primary);
  text-align: center;
`;

export const FAQAnswer = styled.div`
  padding: 10px 0; // Padding around the answer text
  font-size: 20px;
  font-family:'Normal';
  color:  var(--primary)
  line-height: 1.5;
`;


export const TextDescription = styled.p`
  // Your styling here
  font-size: 16px;
  color: #333;
  // etc.
`;


export const StyledRoundButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--secondary-text);
  color: var(--mint-info);
  font-size: 24px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:disabled {
    background-color: var(--secondary-text);
    cursor: not-allowed;
  }

  &:hover {
    background-color: var(--primary-hover); /* Add this color to your CSS variables if needed */
  }
`;

export const StyledButton = styled.button`
  background-color: var(--secondary-text);
  color: var(--mint-info);
  padding: 10px 20px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  

  &:disabled {
    background-color:  var(--secondary-text);
    cursor: not-allowed;
  }

  &:hover {
    background-color: var(--primary-hover); /* Add this color to your CSS variables if needed */
  }
`;


export default GlobalStyles;

















