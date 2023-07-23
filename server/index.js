import express, { json } from "express";
import Moralis from "moralis";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const port = 3001;
import { EvmChain } from "@moralisweb3/common-evm-utils";
const app = express();

app.use(cors());
app.use(json());

app.get("/tokenPrice", async (req, res) => {
    const { query } = req;

    const responseOne = await Moralis.EvmApi.token.getTokenPrice({
        chain: EvmChain.CRONOS,
        address: query.addressOne,
    });

    const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
        chain: EvmChain.CRONOS,
        address: query.addressTwo,
    });

    const usdPrices = {
        tokenOne: responseOne.raw.usdPrice,
        tokenTwo: responseTwo.raw.usdPrice,
        ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
    };

    console.log(usdPrices);

    return res.status(200).json({ usdPrices });
});

Moralis.start({
    apiKey: process.env.MORALIS_KEY,
}).then(() => {
    app.listen(port, () => {
        console.log(`Listening for API Calls`);
    });
});
