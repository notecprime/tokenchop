/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { MockBandProtocol } from "../MockBandProtocol";

export class MockBandProtocol__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<MockBandProtocol> {
    return super.deploy(overrides || {}) as Promise<MockBandProtocol>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MockBandProtocol {
    return super.attach(address) as MockBandProtocol;
  }
  connect(signer: Signer): MockBandProtocol__factory {
    return super.connect(signer) as MockBandProtocol__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockBandProtocol {
    return new Contract(address, _abi, signerOrProvider) as MockBandProtocol;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_base",
        type: "string",
      },
      {
        internalType: "string",
        name: "_quote",
        type: "string",
      },
    ],
    name: "getReferenceData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "rate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastUpdatedBase",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastUpdatedQuote",
            type: "uint256",
          },
        ],
        internalType: "struct MockBandProtocol.ReferenceData",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506103a8806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806365555bcc14610030575b600080fd5b61004a6004803603810190610045919061021e565b610060565b60405161005791906102db565b60405180910390f35b610068610195565b60006006438161007457fe5b06905060006040518060c00160405280604051806060016040528068056bc75e2d6310000081526020014281526020014281525081526020016040518060600160405280680ad78ebc5ac620000081526020014281526020014281525081526020016040518060600160405280681043561a8829300000815260200142815260200142815250815260200160405180606001604052806815af1d78b58c40000081526020014281526020014281525081526020016040518060600160405280681b1ae4d6e2ef50000081526020014281526020014281525081526020016040518060600160405280682086ac351052600000815260200142815260200142815250815250905080826006811061018657fe5b60200201519250505092915050565b60405180606001604052806000815260200160008152602001600081525090565b60006101c96101c484610327565b6102f6565b9050828152602081018484840111156101e157600080fd5b6101ec848285610361565b509392505050565b600082601f83011261020557600080fd5b81356102158482602086016101b6565b91505092915050565b6000806040838503121561023157600080fd5b600083013567ffffffffffffffff81111561024b57600080fd5b610257858286016101f4565b925050602083013567ffffffffffffffff81111561027457600080fd5b610280858286016101f4565b9150509250929050565b6060820160008201516102a060008501826102cc565b5060208201516102b360208501826102cc565b5060408201516102c660408501826102cc565b50505050565b6102d581610357565b82525050565b60006060820190506102f0600083018461028a565b92915050565b6000604051905081810181811067ffffffffffffffff8211171561031d5761031c610370565b5b8060405250919050565b600067ffffffffffffffff82111561034257610341610370565b5b601f19601f8301169050602081019050919050565b6000819050919050565b82818337600083830152505050565bfefea26469706673582212202919926f4f9966279564cc9eee4b8495a0023ffad35a054c6ae32ed7f5340b2f64736f6c63430007060033";
