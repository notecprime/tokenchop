/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer } from "ethers";
import { Provider } from "@ethersproject/providers";

import type { ITokenChopToken } from "../ITokenChopToken";

export class ITokenChopToken__factory {
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITokenChopToken {
    return new Contract(address, _abi, signerOrProvider) as ITokenChopToken;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "base",
        type: "address",
      },
      {
        internalType: "address",
        name: "quote",
        type: "address",
      },
      {
        internalType: "address",
        name: "sister",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "setBandAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
