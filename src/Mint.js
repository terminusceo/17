import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './redux/data/dataActions';
import { StyledButton, StyledRoundButton } from './styles/globalStyles';
import Header from './Header';
import styled from 'styled-components';

const truncate = (input, len) =>
    input.length > len ? `${input.substring(0, len)}...` : input;


const MintContainer = styled.div`
  background-image: url(/config/images/bgblack2.png);
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: var(--primary);
  margin-bottom: 20px;
`;

const IncrementDecrementContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const AllocationText = styled.div`
  color: var(--primary);
  font-size: 20px;
  margin-top: 10px;
`;

const WhiteText = styled.div`
  color: white;
  font-size: 16px;
  margin-top: 5px;
`;

const GreenText = styled.div`
  color: green;
  font-size: 16px;
  margin-top: 5px;
`;

function Mint() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const [mintAmount, setMintAmount] = useState(1);
    const [claimingNft, setClaimingNft] = useState(false);
    const data = useSelector((state) => state.data);
    const [feedback, setFeedback] = useState('Click to mint your SIX.');
    const [mintOpen, setMintOpen] = useState(false);
    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: '',
        WEI_COST: 0,
        GAS_LIMIT: 0,
        NFT_NAME: '',
        DISPLAY_COST: 0,
        MAX_SUPPLY: 1,
    });

    const endTime = new Date('2023-08-26T16:00:00Z');



    const decrementMintAmount = () => {
        let newMintAmount = mintAmount - 1;
        if (newMintAmount < 1) {
            newMintAmount = 1;
        }
        setMintAmount(newMintAmount);
    };

    const incrementMintAmount = () => {
        let newMintAmount = mintAmount + 1;
        if (newMintAmount > 6) {
            newMintAmount = 6;
        }
        setMintAmount(newMintAmount);
    };

    const claimNFTs = () => {
        let cost = CONFIG.WEI_COST;
        let gasLimit = CONFIG.GAS_LIMIT;
        let totalCostWei = String(cost * mintAmount);
        let totalGasLimit = String(120000); // You can adjust this value
        console.log('Cost: ', totalCostWei);
        console.log('Gas limit: ', totalGasLimit);
        setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
        setClaimingNft(true);
        blockchain.smartContract.methods
            .mint(mintAmount)
            .send({
                gasLimit: String(totalGasLimit),
                to: CONFIG.CONTRACT_ADDRESS,
                from: blockchain.account,
                value: totalCostWei,
            })
            .once('error', (err) => {
                console.log(err);
                setFeedback('Sorry, something went wrong please try again later.');
                setClaimingNft(false);
            })
            .then((receipt) => {
                console.log(receipt);
                setFeedback(`WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`);
                setClaimingNft(false);
                dispatch(fetchData(blockchain.account));
            });
    };


    const getConfig = async () => {
        const configResponse = await fetch('/config/config.json');
        const config = await configResponse.json();
        SET_CONFIG(config);
    };

    useEffect(() => {
        getConfig();
    }, []);

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
            dispatch(fetchData(blockchain.account));
        }
    };


    useEffect(() => {
        getData();
    }, [blockchain.account]);



    const isWalletConnected = !!blockchain.account;

    const [elapsedSeconds, setElapsedSeconds] = useState(0);


    // New effect to update the time
    useEffect(() => {
        const updateTimeRemaining = () => {
            const now = new Date();
            const timeElapsed = endTime - now;
            const secondsElapsed = Math.floor(timeElapsed / 1000);

            if (timeElapsed <= 1000) {
                setMintOpen(true);
            } else {
                setElapsedSeconds(secondsElapsed);
            }
        };

        const interval = setInterval(() => {
            updateTimeRemaining();
        }, 1000);

        updateTimeRemaining();

        return () => clearInterval(interval);
    }, []);


    const AllocationContainer = styled.div`
  border: 2px solid var(--primary);
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
`;

    const AllocationTitle = styled(AllocationText)`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
  font-family: 'Normal';
`;

    const ListText = styled(WhiteText)`
  font-family: 'Normal';
  font-size: 24px;
  margin: 5px 0;
`;

    const LimitText = styled(GreenText)`
  font-family: 'Normal';
  font-size: 24px;
`;

    const TimerContainer = styled.div`
  font-size: 24px;
  
  color: var(--primary);
  margin-bottom: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 10px;
`;











    return (
        <MintContainer>
            <Header />
            {isWalletConnected ? (
                <>
                    <AllocationContainer>


                        <ListText>Supply: {data.totalSupply}/{CONFIG.MAX_SUPPLY} </ListText>
                    </AllocationContainer>

                    {/* New part to display the remaining time */}
                    {!mintOpen && elapsedSeconds > 0 && (
                        <TimerContainer>
                            {new Date(elapsedSeconds * 1000).toLocaleString("en-GB", {
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                timeZone: "UTC",
                            })}
                        </TimerContainer>
                    )}
                    <QuantityContainer>

                        <IncrementDecrementContainer>
                            <StyledRoundButton onClick={incrementMintAmount}>+</StyledRoundButton>
                            <StyledRoundButton onClick={decrementMintAmount}>-</StyledRoundButton>
                        </IncrementDecrementContainer>
                    </QuantityContainer>
                    <StyledButton onClick={claimNFTs} disabled={!mintOpen || claimingNft}>
                        {claimingNft ? 'Minting...' : `Mint ${mintAmount} for ${(CONFIG.DISPLAY_COST * mintAmount).toFixed(3)} ETH`}
                    </StyledButton>
                </>
            ) : (
                <WhiteText>Please connect your wallet to mint your SIX.</WhiteText>
            )}
        </MintContainer>
    );
}

export default Mint;
