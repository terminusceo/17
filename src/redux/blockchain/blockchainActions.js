// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// log
import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const disconnectSuccess = () => {
  return {
    type: "DISCONNECT_SUCCESS",
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());

    // Attempt to retrieve account from localStorage first
    const savedAccount = localStorage.getItem('walletAddress');
    if (savedAccount) {
      dispatch(updateAccount(savedAccount));
      return;
    }

    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();

    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();

    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum);
      let web3 = new Web3(ethereum);
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const networkId = await ethereum.request({
          method: "net_version",
        });
        if (networkId == CONFIG.NETWORK.ID) {
          const SmartContractObj = new Web3EthContract(
            abi,
            CONFIG.CONTRACT_ADDRESS
          );

          // Save the connected account to localStorage after successful connection
          localStorage.setItem('walletAddress', accounts[0]);

          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          );

          // Add listeners start
          ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length === 0) {  // If no accounts, treat it as a disconnect
              dispatch(disconnect());
            } else {
              dispatch(updateAccount(accounts[0]));
            }
          });
          ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};


export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));

    // Save the updated account to localStorage
    localStorage.setItem('walletAddress', account);
  };
};

export const disconnect = () => {
  return (dispatch) => {
    localStorage.removeItem('walletAddress');
    dispatch({ type: 'DISCONNECT_SUCCESS' });
  };
};


export const connectUsingSavedAccount = (savedAccount) => {
  return async (dispatch) => {
    // First, just update the account without connecting to MetaMask again.
    dispatch(updateAccountRequest({ account: savedAccount }));

    // Now, ensure connection to the contract.
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const abi = await abiResponse.json();
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const CONFIG = await configResponse.json();

    const { ethereum } = window;

    if (ethereum && ethereum.isMetaMask) {
      Web3EthContract.setProvider(ethereum);
      const web3 = new Web3(ethereum);
      const networkId = await ethereum.request({ method: "net_version" });

      if (networkId == CONFIG.NETWORK.ID) {
        const SmartContractObj = new Web3EthContract(abi, CONFIG.CONTRACT_ADDRESS);
        dispatch(
          connectSuccess({
            account: savedAccount,
            smartContract: SmartContractObj,
            web3: web3,
          })
        );

        // Since we're connected now, fetch data
        dispatch(fetchData());
      } else {
        dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
      }
    }
  };
};


