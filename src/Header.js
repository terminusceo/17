import React, { useEffect } from 'react';
import * as s from './styles/globalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { connect, disconnect, updateAccount, connectUsingSavedAccount } from './redux/blockchain/blockchainActions';
import { NavLink } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);

    useEffect(() => {
        const savedAccount = localStorage.getItem('walletAddress');
        if (savedAccount && !blockchain.account) {
            dispatch(connectUsingSavedAccount(savedAccount));
        }
    }, [dispatch, blockchain.account]);



    const handleConnect = async () => {
        await dispatch(connect());
    };

    const handleDisconnect = async () => {
        await dispatch(disconnect());
    };

    return (
        <s.Header>
            <s.Logo src="/logo32.png" alt="Logo" />
            <s.HeaderLinks>
                <s.CustomLink exact to="/" activeClassName="active">Home</s.CustomLink>
                <s.CustomLink to="/mint" activeClassName="active">Mint</s.CustomLink>
            </s.HeaderLinks>
            {blockchain.account ? (
                <s.WalletDetails>
                    <s.WalletAddress>{blockchain.account}</s.WalletAddress>
                    <s.DisconnectButton onClick={handleDisconnect}>Disconnect</s.DisconnectButton>
                </s.WalletDetails>
            ) : (
                <s.WalletButton onClick={handleConnect}>Connect Wallet</s.WalletButton>
            )}
        </s.Header>
    );
}

export default Header;