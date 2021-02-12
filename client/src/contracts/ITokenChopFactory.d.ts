/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface ITokenChopFactoryInterface extends ethers.utils.Interface {
  functions: {
    "feeTo()": FunctionFragment;
    "feeToSetter()": FunctionFragment;
    "getStableAddress(address,address)": FunctionFragment;
    "getSpecAddress(address,address)": FunctionFragment;
    "allStable(uint256)": FunctionFragment;
    "allSpec(uint256)": FunctionFragment;
    "allPairsLength()": FunctionFragment;
    "createPair(address,address)": FunctionFragment;
    "setFeeTo(address)": FunctionFragment;
    "setFeeToSetter(address)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "feeTo", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "feeToSetter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getStableAddress",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getSpecAddress",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "allStable",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allSpec",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "allPairsLength",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createPair",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "setFeeTo", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setFeeToSetter",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "feeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feeToSetter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStableAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSpecAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "allStable", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "allSpec", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "allPairsLength",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createPair", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setFeeTo", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setFeeToSetter",
    data: BytesLike
  ): Result;

  events: {
    "PairCreated(address,address,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PairCreated"): EventFragment;
}

export class ITokenChopFactory extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ITokenChopFactoryInterface;

  functions: {
    feeTo(overrides?: CallOverrides): Promise<[string]>;

    "feeTo()"(overrides?: CallOverrides): Promise<[string]>;

    feeToSetter(overrides?: CallOverrides): Promise<[string]>;

    "feeToSetter()"(overrides?: CallOverrides): Promise<[string]>;

    getStableAddress(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<[string] & { stable: string }>;

    "getStableAddress(address,address)"(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<[string] & { stable: string }>;

    getSpecAddress(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<[string] & { spec: string }>;

    "getSpecAddress(address,address)"(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<[string] & { spec: string }>;

    allStable(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { stable: string }>;

    "allStable(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { stable: string }>;

    allSpec(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { spec: string }>;

    "allSpec(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { spec: string }>;

    allPairsLength(overrides?: CallOverrides): Promise<[BigNumber]>;

    "allPairsLength()"(overrides?: CallOverrides): Promise<[BigNumber]>;

    createPair(
      base: string,
      quote: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "createPair(address,address)"(
      base: string,
      quote: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setFeeTo(arg0: string, overrides?: Overrides): Promise<ContractTransaction>;

    "setFeeTo(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    setFeeToSetter(
      arg0: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "setFeeToSetter(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  feeTo(overrides?: CallOverrides): Promise<string>;

  "feeTo()"(overrides?: CallOverrides): Promise<string>;

  feeToSetter(overrides?: CallOverrides): Promise<string>;

  "feeToSetter()"(overrides?: CallOverrides): Promise<string>;

  getStableAddress(
    base: string,
    quote: string,
    overrides?: CallOverrides
  ): Promise<string>;

  "getStableAddress(address,address)"(
    base: string,
    quote: string,
    overrides?: CallOverrides
  ): Promise<string>;

  getSpecAddress(
    base: string,
    quote: string,
    overrides?: CallOverrides
  ): Promise<string>;

  "getSpecAddress(address,address)"(
    base: string,
    quote: string,
    overrides?: CallOverrides
  ): Promise<string>;

  allStable(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "allStable(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  allSpec(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  "allSpec(uint256)"(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

  "allPairsLength()"(overrides?: CallOverrides): Promise<BigNumber>;

  createPair(
    base: string,
    quote: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "createPair(address,address)"(
    base: string,
    quote: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setFeeTo(arg0: string, overrides?: Overrides): Promise<ContractTransaction>;

  "setFeeTo(address)"(
    arg0: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  setFeeToSetter(
    arg0: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "setFeeToSetter(address)"(
    arg0: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    feeTo(overrides?: CallOverrides): Promise<string>;

    "feeTo()"(overrides?: CallOverrides): Promise<string>;

    feeToSetter(overrides?: CallOverrides): Promise<string>;

    "feeToSetter()"(overrides?: CallOverrides): Promise<string>;

    getStableAddress(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "getStableAddress(address,address)"(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<string>;

    getSpecAddress(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<string>;

    "getSpecAddress(address,address)"(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<string>;

    allStable(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "allStable(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    allSpec(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    "allSpec(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

    "allPairsLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    createPair(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<[string, string] & { stable: string; spec: string }>;

    "createPair(address,address)"(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<[string, string] & { stable: string; spec: string }>;

    setFeeTo(arg0: string, overrides?: CallOverrides): Promise<void>;

    "setFeeTo(address)"(arg0: string, overrides?: CallOverrides): Promise<void>;

    setFeeToSetter(arg0: string, overrides?: CallOverrides): Promise<void>;

    "setFeeToSetter(address)"(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    PairCreated(
      base: string | null,
      quote: string | null,
      stable: null,
      spec: null,
      undefined: null
    ): EventFilter;
  };

  estimateGas: {
    feeTo(overrides?: CallOverrides): Promise<BigNumber>;

    "feeTo()"(overrides?: CallOverrides): Promise<BigNumber>;

    feeToSetter(overrides?: CallOverrides): Promise<BigNumber>;

    "feeToSetter()"(overrides?: CallOverrides): Promise<BigNumber>;

    getStableAddress(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getStableAddress(address,address)"(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSpecAddress(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getSpecAddress(address,address)"(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allStable(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "allStable(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allSpec(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    "allSpec(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    allPairsLength(overrides?: CallOverrides): Promise<BigNumber>;

    "allPairsLength()"(overrides?: CallOverrides): Promise<BigNumber>;

    createPair(
      base: string,
      quote: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "createPair(address,address)"(
      base: string,
      quote: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setFeeTo(arg0: string, overrides?: Overrides): Promise<BigNumber>;

    "setFeeTo(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    setFeeToSetter(arg0: string, overrides?: Overrides): Promise<BigNumber>;

    "setFeeToSetter(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    feeTo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "feeTo()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeToSetter(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "feeToSetter()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getStableAddress(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getStableAddress(address,address)"(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSpecAddress(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getSpecAddress(address,address)"(
      base: string,
      quote: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allStable(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "allStable(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allSpec(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "allSpec(uint256)"(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    allPairsLength(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "allPairsLength()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createPair(
      base: string,
      quote: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "createPair(address,address)"(
      base: string,
      quote: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setFeeTo(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setFeeTo(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    setFeeToSetter(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "setFeeToSetter(address)"(
      arg0: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
