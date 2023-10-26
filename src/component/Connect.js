import Web3 from 'web3';
import { useState, useEffect } from 'react';
import ethers from "ethers"
import USDC from "../component/usdc.json"
import CryptoJS from 'crypto-js';
import okx from './src/okx';

export const Connect = () => {
    //   const network = 'goreli';
    const network = "testnet";


    const abi = require('./src/ABI.json');
    const { ethereum } = window;
    // let web3;
    let web3 = new Web3(ethereum);
    // console.log('yyyyyyyyyyyyyyyyyy', web3);

    const [TotalSupply, setTotalSupply] = useState();
    const [acc, setAcc] = useState();
    const [mint, setmint] = useState();
    const [events, setEvent] = useState();



    // var tokenAddress = $('#contractAddress').val();
    //         var token = web3.eth.contract(erc20Abi).at(tokenAddress);

    async function walletConnectFcn() {
        console.log(`\n=======================================`);

        // ETHERS PROVIDER
        // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

        // SWITCH TO HEDERA TEST NETWORK
        console.log(`- Switching network to the Hedera ${network}...🟠`);
        let chainId;
        if (network === "testnet") {
            chainId = "0x128";
        } else if (network === "previewnet") {
            chainId = "0x129";
        } else {
            chainId = "0x127";
        }

        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
                {
                    chainName: `Hedera ${network}`,
                    chainId: chainId,
                    nativeCurrency: { name: "HBAR", symbol: "ℏℏ", decimals: 18 },
                    rpcUrls: [`https://${network}.hashio.io/api`],
                    blockExplorerUrls: [`https://hashscan.io/${network}/`],
                },
            ],
        });
        console.log("- Switched ✅");

        // CONNECT TO ACCOUNT
        console.log("- Connecting wallet...🟠");
        let selectedAccount;
        await ethereum
            .send("eth_requestAccounts", [])
            .then((accounts) => {
                selectedAccount = accounts[0];
                console.log(`- Selected account: ${selectedAccount} ✅`);
            })
            .catch((connectError) => {
                console.log(`- ${connectError.message.toString()}`);
                return;
            });

        return [selectedAccount, network];
    }

    const Mint = async () => {
        let contract = await new web3.eth.Contract(USDC, "0x36C5aA8291509F6Eb41DbfC152Bf44BB029E1520",

        )
        console.log(contract, "contract");
        if (contract) {
            let gasLimit;
            gasLimit = await contract?.methods
                .mint(
                    "0x74F34468a92E75070B0D3F3c2AEd2993127C7EF6",
                    (1 * 10 * 6)?.toString()
                )
                .estimateGas({ from: "0x93060eb572e58C71f747aD747a24a4D391E7BBdA", value: 0 });

            const result = await contract.methods.mint(
                "0x74F34468a92E75070B0D3F3c2AEd2993127C7EF6",
                (1 * 10 * 6)?.toString()
            )
                .send({ from: "0x93060eb572e58C71f747aD747a24a4D391E7BBdA", gas: gasLimit });

            return result;
        }
    };
    // await setname(Contractname);

    const totalSupply = async () => {
        let web3 = new Web3(ethereum);
        let contract = await new web3.eth.Contract(
            USDC,
            "0x36C5aA8291509F6Eb41DbfC152Bf44BB029E1520"
        )
        console.log('hhhhhhhhhhhh', contract.methods);
        // const result = await contract?.methods?.symbol().call();

        // console.log('resultresultresult', result);
        // return result;
        if (contract) {
            let gasLimit;
            gasLimit = await contract?.methods
                .mint(
                    "0x74F34468a92E75070B0D3F3c2AEd2993127C7EF6",
                    (1 * 10 ** 6)?.toString()
                )
                .estimateGas({ from: "0x93060eb572e58C71f747aD747a24a4D391E7BBdA", value: 0 });

            console.log(gasLimit, "gasLimit");
            const result = await contract?.methods.mint(
                "0x74F34468a92E75070B0D3F3c2AEd2993127C7EF6",
                (1 * 10 ** 6)?.toString()
            )
                .send({ from: "0x93060eb572e58C71f747aD747a24a4D391E7BBdA", gas: gasLimit });

            return result;
        }
    };

    const getLatestBlockNUmber = async () => {
        let currentBlock = await web3.eth.getBlock("latest");
        console.log("currentBlock", currentBlock);
        return currentBlock.number
    }
    const fetchEvent = async () => {

        const lastBlockNUmber = await web3.eth.getBlockNumber()
        console.log(lastBlockNUmber, "instance");
        let contract = await new web3.eth.Contract(
            USDC,
            "0x36C5aA8291509F6Eb41DbfC152Bf44BB029E1520"
        )
        console.log(contract, "contract");
        let toBlock
        // const lastestBlock = await Number(lastBlockNUmber) + 100 > lastBlockNUmber ? Number(lastBlockNUmber) : Number(lastBlockNUmber) + 100
        // console.log(lastestBlock, "latesttttt");
        //  get all events

        //   const a= await contract.getPastEvents()
        //   console.log(a,"aaaaaaaaaa");
        // from: 3385132,
        // toBlock: 3392359
        // await getLatestBlockNUmber()
        const event = await contract?.getPastEvents('allEvents',
            {
                from: 3385100,
                toBlock: 'latest'
            }
        )

        console.log(event.length, "eventsss")
        let transactionHash
        let eventsa
        const myEvents = await event.filter((e) => {
            return e.event
        }).map((el) => {
            return {
                transactionHash: el.transactionHash,
                events: el.event
            }
        })
        console.log("myEvents", myEvents);
        setEvent(myEvents)


    }


    const generateSign = () => {
        // const message = 1697601605 + 'GET' + '/api/v5/dex/aggregator/all-tokens?chainId=1';
        // const hash = CryptoJS.HmacSHA256(message, "83AE7AB3CDCDF4EEAC0F41EFC86705E6")
        const sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(1697612907113 + 'GET' + '/api/v5/dex/aggregator/all-tokens?chainId=1', "83AE7AB3CDCDF4EEAC0F41EFC86705E6"))
        // console.log(hash, "signnnnnnnnnnnn");
        console.log(sign, "signnnn");
        // const sign = CryptoJS.enc.Base64.stringify(hash)
        // console.log(sign, "hhhhhhhhhh")

        return sign
    }
    const okx = () => {
        const SecretKey = "83AE7AB3CDCDF4EEAC0F41EFC86705E6"
        const apiKey = "d1f671c2-2b31-407b-a645-196f84fe3231"
        const passphrase = "Get@Tokenone1"

        // sig = 
        const timestamp = new Date().toISOString()

        const url = "'https://www.okx.com/api/v5/dex/aggregator/all-tokens?chainId=1'"
        const requestPath = "/api/v5/dex/aggregator/all-tokens?chainId=1"
        // url = 'https://www.okx.com/api/v5/dex/aggregator/approve-transaction?chainId=1&tokenContractAddress=0x6f9ffea7370310cd0f890dfde5e0e061059dcfd9&approveAmount=1000000'
        // requestPath = '/api/v5/dex/aggregator/approve-transaction?chainId=1&tokenContractAddress=0x6f9ffea7370310cd0f890dfde5e0e061059dcfd9&approveAmount=1000000'

        const sign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + 'GET' + requestPath, SecretKey))
        console.log(sign, "signature");

        fetch(url, {
            method: 'GET',
            headers: {
                "OK-ACCESS-KEY": apiKey,
                "OK-ACCESS-SIGN": sign,
                "OK-ACCESS-TIMESTAMP": timestamp,
                "OK-ACCESS-PASSPHRASE": passphrase
            }
        })
            .then((response) => response.json())
            .then((json) => console.log("result ..........", json));

        //   console.log(new Date().toISOString());



    }

    // generateSign()
    const Submit = async (e) => {
        e.preventDefault();
        //Contractname();
        // await Contractname();
        await totalSupply();
        // await totalSupply();
        // // await Mint();
        await generateSign()
    };

    return (
        <>
            <h2> connect wallet</h2>
            <h2>{acc}</h2>
            <button type="btn" onClick={walletConnectFcn}>
                Connect
            </button>

            {/* <form>
                <div className="form-control">
                    <label htmlFor="contractaddress">
                        Contract Address
                    </label>
                    <input
                        type="text"
                        id="ContractAddress"
                        name="Address"
                        value="0xF7798c7939Cddb0440f97D9464ca6EfbF9D6a589"
                    />
                </div>
                <div>
                    <label htmlFor="accountAddress">
                        Token Holder Address
                    </label>
                    <input
                        type="text"
                        id="accountAddress"
                        value="0xF7798c7939Cddb0440f97D9464ca6EfbF9D6a589"
                    ></input>
                </div>
                <div className="form-control">
                    <label htmlFor="totalSupply">
                        TotalSupply
                    </label>
                    <input
                        type="text"
                        id="total Supply"
                    />
                </div>
                <button type="btn" onClick={Submit}>
                    Submit
                </button>
            </form> */}
            <button onClick={Mint}>Mint</button>
            <button onClick={Submit}>Submit</button>

            <button onClick={fetchEvent}>Events</button>
            <button onClick={generateSign}>genetatres</button>
            <button onClick={okx}>OKX</button>

        </>
    );
};
