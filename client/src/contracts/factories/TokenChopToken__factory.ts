/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { TokenChopToken } from "../TokenChopToken";

export class TokenChopToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides): Promise<TokenChopToken> {
    return super.deploy(overrides || {}) as Promise<TokenChopToken>;
  }
  getDeployTransaction(overrides?: Overrides): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TokenChopToken {
    return super.attach(address) as TokenChopToken;
  }
  connect(signer: Signer): TokenChopToken__factory {
    return super.connect(signer) as TokenChopToken__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenChopToken {
    return new Contract(address, _abi, signerOrProvider) as TokenChopToken;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "CollateralTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldPrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPrice",
        type: "uint256",
      },
    ],
    name: "PriceUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bandProtocol",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "base",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseSymbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collateral",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "poolType",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "previousPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "quote",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "quoteSymbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sister",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "typeId",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_typeId",
        type: "uint8",
      },
      {
        internalType: "address",
        name: "_base",
        type: "address",
      },
      {
        internalType: "address",
        name: "_quote",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sister",
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
        name: "_bandAddr",
        type: "address",
      },
    ],
    name: "setBandAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updateCollateralBySister",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_requestedAmount",
        type: "uint256",
      },
    ],
    name: "sendCollateralToSister",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_collateralAmount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenAmount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5033600a60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550613518806100616000396000f3fe608060405234801561001057600080fd5b50600436106101c45760003560e01c80638f940f63116100f9578063a9ed003d11610097578063c6950a7c11610071578063c6950a7c14610501578063d8dfeb451461050b578063dd62ed3e14610529578063f33ab2b814610559576101c4565b8063a9ed003d146104a7578063b1dd61b6146104c5578063c45a0155146104e3576101c4565b8063999b93af116100d3578063999b93af1461040b578063a035b1fe14610429578063a0712d6814610447578063a9059cbb14610477576101c4565b80638f940f63146103b1578063914e245a146103cf57806395d89b41146103ed576101c4565b80635001f3b5116101665780636fea6b1c116101405780636fea6b1c1461032757806370a082311461034557806380583be714610375578063893d20e814610393576101c4565b80635001f3b5146102cf578063607375a1146102ed57806360d6df6e14610309576101c4565b806323b872dd116101a257806323b872dd146102355780632e4e3d1114610265578063313ce5671461028157806342966c681461029f576101c4565b806306fdde03146101c9578063095ea7b3146101e757806318160ddd14610217575b600080fd5b6101d1610589565b6040516101de9190613106565b60405180910390f35b61020160048036038101906101fc919061282b565b610627565b60405161020e91906130eb565b60405180910390f35b61021f61063e565b60405161022c919061329f565b60405180910390f35b61024f600480360381019061024a91906127dc565b610644565b60405161025c91906130eb565b60405180910390f35b61027f600480360381019061027a9190612777565b6107a4565b005b610289610878565b60405161029691906132e3565b60405180910390f35b6102b960048036038101906102b491906128fa565b610881565b6040516102c691906130eb565b60405180910390f35b6102d7610aa1565b6040516102e49190613070565b60405180910390f35b6103076004803603810190610302919061294c565b610ac7565b005b610311611181565b60405161031e9190613106565b60405180910390f35b61032f61121f565b60405161033c9190613070565b60405180910390f35b61035f600480360381019061035a9190612777565b611245565b60405161036c919061329f565b60405180910390f35b61037d61125d565b60405161038a9190613106565b60405180910390f35b61039b6112fb565b6040516103a89190613070565b60405180910390f35b6103b9611325565b6040516103c691906132e3565b60405180910390f35b6103d7611338565b6040516103e4919061329f565b60405180910390f35b6103f561133e565b6040516104029190613106565b60405180910390f35b6104136113dc565b6040516104209190613070565b60405180910390f35b610431611402565b60405161043e919061329f565b60405180910390f35b610461600480360381019061045c91906128fa565b611408565b60405161046e91906130eb565b60405180910390f35b610491600480360381019061048c919061282b565b611625565b60405161049e91906130eb565b60405180910390f35b6104af61163c565b6040516104bc9190613070565b60405180910390f35b6104cd611662565b6040516104da9190613106565b60405180910390f35b6104eb611700565b6040516104f89190613070565b60405180910390f35b610509611726565b005b6105136117c8565b604051610520919061329f565b60405180910390f35b610543600480360381019061053e91906127a0565b6117ce565b604051610550919061329f565b60405180910390f35b610573600480360381019061056e91906128fa565b6117f3565b604051610580919061329f565b60405180910390f35b60028054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561061f5780601f106105f45761010080835404028352916020019161061f565b820191906000526020600020905b81548152906001019060200180831161060257829003601f168201915b505050505081565b6000610634338484611996565b6001905092915050565b600e5481565b6000610651848484611b61565b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610710576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610707906131df565b60405180910390fd5b610799843384600160008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403611996565b600190509392505050565b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610834576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161082b9061323f565b60405180910390fd5b80600f60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006012905090565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211156108ce57600080fd5b61091f826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611e5290919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610969611e72565b610971611fc7565b6000610982600b5484600e5461210e565b905061099981600b54611e5290919063ffffffff16565b600b819055506109cc600760019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16338361216c565b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef85604051610a2a919061329f565b60405180910390a33373ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167f14395d6fb6ac3870af345d12d989b966ccf04dcdd9e02b95722d12dca39eb4b083604051610a8f919061329f565b60405180910390a36001915050919050565b600760019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b57576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b4e9061323f565b60405180910390fd5b83600760006101000a81548160ff021916908360ff16021790555060008460ff1614610bb8576040518060400160405280600481526020017f5370656300000000000000000000000000000000000000000000000000000000815250610bef565b6040518060400160405280600681526020017f537461626c6500000000000000000000000000000000000000000000000000008152505b60069080519060200190610c0492919061259b565b5073da7a001b254cd22e46d3eab04d937489c93174c3600f60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600760016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600960006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600760019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b158015610d8557600080fd5b505afa158015610d99573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610dc29190612890565b60049080519060200190610dd792919061259b565b50604051602001610de79061305b565b604051602081830303815290604052805190602001206004604051602001610e0f9190613044565b6040516020818303038152906040528051906020012014610eca5760048054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610ec05780601f10610e9557610100808354040283529160200191610ec0565b820191906000526020600020905b815481529060010190602001808311610ea357829003601f168201915b5050505050610f01565b6040518060400160405280600381526020017f424e4200000000000000000000000000000000000000000000000000000000008152505b60049080519060200190610f1692919061259b565b50600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b158015610f7f57600080fd5b505afa158015610f93573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190610fbc9190612890565b60059080519060200190610fd192919061259b565b506040518060400160405280600b81526020017f546f6b656e43686f703a2000000000000000000000000000000000000000000081525060046040518060400160405280600181526020017f2f0000000000000000000000000000000000000000000000000000000000000081525060056040518060400160405280600181526020017f2000000000000000000000000000000000000000000000000000000000000000815250600660405160200161108f96959493929190612fbb565b604051602081830303815290604052600290805190602001906110b392919061259b565b50600460056000600760009054906101000a900460ff1660ff161461110d576040518060400160405280600181526020017f3100000000000000000000000000000000000000000000000000000000000000815250611144565b6040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152505b60405160200161115693929190613013565b6040516020818303038152906040526003908051906020019061117a92919061259b565b5050505050565b60058054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112175780601f106111ec57610100808354040283529160200191611217565b820191906000526020600020905b8154815290600101906020018083116111fa57829003601f168201915b505050505081565b600f60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006020528060005260406000206000915090505481565b60048054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156112f35780601f106112c8576101008083540402835291602001916112f3565b820191906000526020600020905b8154815290600101906020018083116112d657829003601f168201915b505050505081565b6000600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600760009054906101000a900460ff1681565b600c5481565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156113d45780601f106113a9576101008083540402835291602001916113d4565b820191906000526020600020905b8154815290600101906020018083116113b757829003601f168201915b505050505081565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600d5481565b6000611438600760019054906101000a900473ffffffffffffffffffffffffffffffffffffffff163330856122f6565b611440611e72565b611448611fc7565b60008290506000600e541415801561146357506000600b5414155b8015611470575060008314155b1561148757611484600e54600b548561210e565b90505b6114d8816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461246690919063ffffffff16565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061152f81600e5461246690919063ffffffff16565b600e8190555061154a83600b5461246690919063ffffffff16565b600b819055503373ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516115ae919061329f565b60405180910390a33073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f14395d6fb6ac3870af345d12d989b966ccf04dcdd9e02b95722d12dca39eb4b085604051611613919061329f565b60405180910390a36001915050919050565b6000611632338484611b61565b6001905092915050565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60068054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156116f85780601f106116cd576101008083540402835291602001916116f8565b820191906000526020600020905b8154815290600101906020018083116116db57829003601f168201915b505050505081565b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146117b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117ad9061323f565b60405180910390fd5b6117be611e72565b6117c6611fc7565b565b600b5481565b6001602052816000526040600020602052806000526040600020600091509150505481565b6000600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611885576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161187c9061323f565b60405180910390fd5b600082600b5410611896578261189a565b600b545b90506118eb600760019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168361216c565b61190081600b54611e5290919063ffffffff16565b600b81905550600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff167f14395d6fb6ac3870af345d12d989b966ccf04dcdd9e02b95722d12dca39eb4b083604051611985919061329f565b60405180910390a380915050919050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611a06576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119fd9061317f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611a76576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a6d9061327f565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051611b54919061329f565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415611bd1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611bc89061315f565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611c41576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c389061321f565b60405180910390fd5b806000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015611cc2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611cb9906131ff565b60405180910390fd5b611d13816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054611e5290919063ffffffff16565b6000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550611da6816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461246690919063ffffffff16565b6000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051611e45919061329f565b60405180910390a3505050565b600082821115611e6157600080fd5b600082840390508091505092915050565b6000600f60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008173ffffffffffffffffffffffffffffffffffffffff166365555bcc600460056040518363ffffffff1660e01b8152600401611ed8929190613128565b60606040518083038186803b158015611ef057600080fd5b505afa158015611f04573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f2891906128d1565b90506000816000015190506000811415611f77576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f6e9061325f565b60405180910390fd5b7f92664190cca12aca9cd5309d87194bdda75bb51362d71c06e1a6f75c7c765711600d5482604051611faa9291906132ba565b60405180910390a1600d54600c8190555080600d81905550505050565b6000600760009054906101000a900460ff1660ff161415612088576000611ffb600b54600c5461248590919063ffffffff16565b90506000612016600b54600d5461248590919063ffffffff16565b90508082141561202757505061210c565b8082101561205a5760006120448383611e5290919063ffffffff16565b90506000612051826124bf565b90505050612081565b600061206f8383611e5290919063ffffffff16565b9050600061207c826117f3565b905050505b505061210b565b600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c6950a7c6040518163ffffffff1660e01b8152600401600060405180830381600087803b1580156120f257600080fd5b505af1158015612106573d6000803e3d6000fd5b505050505b5b565b6000700100000000000000000000000000000000841061212d57600080fd5b700100000000000000000000000000000000831061214a57600080fd5b8183111561215757600080fd5b818385028161216257fe5b0490509392505050565b6000808473ffffffffffffffffffffffffffffffffffffffff166040518060400160405280601981526020017f7472616e7366657228616464726573732c75696e7432353629000000000000008152508051906020012085856040516024016121d69291906130c2565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516122409190612fa4565b6000604051808303816000865af19150503d806000811461227d576040519150601f19603f3d011682016040523d82523d6000602084013e612282565b606091505b50915091508180156122b057506000815114806122af5750808060200190518101906122ae9190612867565b5b5b6122ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016122e6906131bf565b60405180910390fd5b5050505050565b6000808573ffffffffffffffffffffffffffffffffffffffff166040518060600160405280602581526020016134be60259139805190602001208686866040516024016123459392919061308b565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040516123af9190612fa4565b6000604051808303816000865af19150503d80600081146123ec576040519150601f19603f3d011682016040523d82523d6000602084013e6123f1565b606091505b509150915081801561241f575060008151148061241e57508080602001905181019061241d9190612867565b5b5b61245e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016124559061319f565b60405180910390fd5b505050505050565b60008082840190508381101561247b57600080fd5b8091505092915050565b60008083141561249857600090506124b9565b60008284029050828482816124a957fe5b04146124b457600080fd5b809150505b92915050565b600080600960009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008173ffffffffffffffffffffffffffffffffffffffff1663f33ab2b8856040518263ffffffff1660e01b8152600401612522919061329f565b602060405180830381600087803b15801561253c57600080fd5b505af1158015612550573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125749190612923565b905061258b81600b5461246690919063ffffffff16565b600b819055508092505050919050565b828054600181600116156101000203166002900490600052602060002090601f0160209004810192826125d15760008555612618565b82601f106125ea57805160ff1916838001178555612618565b82800160010185558215612618579182015b828111156126175782518255916020019190600101906125fc565b5b5090506126259190612629565b5090565b5b8082111561264257600081600090555060010161262a565b5090565b60006126596126548461332f565b6132fe565b90508281526020810184848401111561267157600080fd5b61267c84828561341b565b509392505050565b60008135905061269381613461565b92915050565b6000815190506126a881613478565b92915050565b600082601f8301126126bf57600080fd5b81516126cf848260208601612646565b91505092915050565b6000606082840312156126ea57600080fd5b6126f460606132fe565b905060006127048482850161274d565b60008301525060206127188482850161274d565b602083015250604061272c8482850161274d565b60408301525092915050565b6000813590506127478161348f565b92915050565b60008151905061275c8161348f565b92915050565b600081359050612771816134a6565b92915050565b60006020828403121561278957600080fd5b600061279784828501612684565b91505092915050565b600080604083850312156127b357600080fd5b60006127c185828601612684565b92505060206127d285828601612684565b9150509250929050565b6000806000606084860312156127f157600080fd5b60006127ff86828701612684565b935050602061281086828701612684565b925050604061282186828701612738565b9150509250925092565b6000806040838503121561283e57600080fd5b600061284c85828601612684565b925050602061285d85828601612738565b9150509250929050565b60006020828403121561287957600080fd5b600061288784828501612699565b91505092915050565b6000602082840312156128a257600080fd5b600082015167ffffffffffffffff8111156128bc57600080fd5b6128c8848285016126ae565b91505092915050565b6000606082840312156128e357600080fd5b60006128f1848285016126d8565b91505092915050565b60006020828403121561290c57600080fd5b600061291a84828501612738565b91505092915050565b60006020828403121561293557600080fd5b60006129438482850161274d565b91505092915050565b6000806000806080858703121561296257600080fd5b600061297087828801612762565b945050602061298187828801612684565b935050604061299287828801612684565b92505060606129a387828801612684565b91505092959194509250565b6129b8816133c6565b82525050565b6129c7816133d8565b82525050565b60006129d882613389565b6129e2818561339f565b93506129f281856020860161341b565b80840191505092915050565b600081546001811660008114612a1b5760018114612a4057612a84565b607f6002830416612a2c818761339f565b955060ff1983168652808601935050612a84565b60028204612a4e818761339f565b9550612a598561335f565b60005b82811015612a7b57815481890152600182019150602081019050612a5c565b82880195505050505b505092915050565b6000612a9782613394565b612aa181856133aa565b9350612ab181856020860161341b565b612aba81613450565b840191505092915050565b600081546001811660008114612ae25760018114612b0857612b4c565b607f6002830416612af381876133aa565b955060ff198316865260208601935050612b4c565b60028204612b1681876133aa565b9550612b2185613374565b60005b82811015612b4357815481890152600182019150602081019050612b24565b80880195505050505b505092915050565b600081546001811660008114612b715760018114612b9657612bda565b607f6002830416612b8281876133bb565b955060ff1983168652808601935050612bda565b60028204612ba481876133bb565b9550612baf85613374565b60005b82811015612bd157815481890152600182019150602081019050612bb2565b82880195505050505b505092915050565b6000612bef6025836133aa565b91507f42455032303a207472616e736665722066726f6d20746865207a65726f20616460008301527f64726573730000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612c556024836133aa565b91507f42455032303a20617070726f76652066726f6d20746865207a65726f2061646460008301527f72657373000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612cbb601f836133aa565b91507f546f6b656e43686f703a205452414e534645525f46524f4d5f4641494c4544006000830152602082019050919050565b6000612cfb601a836133aa565b91507f546f6b656e43686f703a205452414e534645525f4641494c45440000000000006000830152602082019050919050565b6000612d3b6028836133aa565b91507f42455032303a207472616e7366657220616d6f756e742065786365656473206160008301527f6c6c6f77616e63650000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612da16004836133bb565b91507f57424e42000000000000000000000000000000000000000000000000000000006000830152600482019050919050565b6000612de16026836133aa565b91507f42455032303a207472616e7366657220616d6f756e742065786365656473206260008301527f616c616e636500000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612e476023836133aa565b91507f42455032303a207472616e7366657220746f20746865207a65726f206164647260008301527f65737300000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b6000612ead6014836133aa565b91507f546f6b656e43686f703a20464f5242494444454e0000000000000000000000006000830152602082019050919050565b6000612eed601e836133aa565b91507f546f6b656e43686f703a20507269636520757064617465204661696c656400006000830152602082019050919050565b6000612f2d6022836133aa565b91507f42455032303a20617070726f766520746f20746865207a65726f20616464726560008301527f73730000000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b612f8f81613404565b82525050565b612f9e8161340e565b82525050565b6000612fb082846129cd565b915081905092915050565b6000612fc782896129cd565b9150612fd382886129fe565b9150612fdf82876129cd565b9150612feb82866129fe565b9150612ff782856129cd565b915061300382846129fe565b9150819050979650505050505050565b600061301f82866129fe565b915061302b82856129fe565b915061303782846129cd565b9150819050949350505050565b60006130508284612b54565b915081905092915050565b600061306682612d94565b9150819050919050565b600060208201905061308560008301846129af565b92915050565b60006060820190506130a060008301866129af565b6130ad60208301856129af565b6130ba6040830184612f86565b949350505050565b60006040820190506130d760008301856129af565b6130e46020830184612f86565b9392505050565b600060208201905061310060008301846129be565b92915050565b600060208201905081810360008301526131208184612a8c565b905092915050565b600060408201905081810360008301526131428185612ac5565b905081810360208301526131568184612ac5565b90509392505050565b6000602082019050818103600083015261317881612be2565b9050919050565b6000602082019050818103600083015261319881612c48565b9050919050565b600060208201905081810360008301526131b881612cae565b9050919050565b600060208201905081810360008301526131d881612cee565b9050919050565b600060208201905081810360008301526131f881612d2e565b9050919050565b6000602082019050818103600083015261321881612dd4565b9050919050565b6000602082019050818103600083015261323881612e3a565b9050919050565b6000602082019050818103600083015261325881612ea0565b9050919050565b6000602082019050818103600083015261327881612ee0565b9050919050565b6000602082019050818103600083015261329881612f20565b9050919050565b60006020820190506132b46000830184612f86565b92915050565b60006040820190506132cf6000830185612f86565b6132dc6020830184612f86565b9392505050565b60006020820190506132f86000830184612f95565b92915050565b6000604051905081810181811067ffffffffffffffff821117156133255761332461344e565b5b8060405250919050565b600067ffffffffffffffff82111561334a5761334961344e565b5b601f19601f8301169050602081019050919050565b60008190508160005260206000209050919050565b60008190508160005260206000209050919050565b600081519050919050565b600081519050919050565b600081905092915050565b600082825260208201905092915050565b600081905092915050565b60006133d1826133e4565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b8381101561343957808201518184015260208101905061341e565b83811115613448576000848401525b50505050565bfe5b6000601f19601f8301169050919050565b61346a816133c6565b811461347557600080fd5b50565b613481816133d8565b811461348c57600080fd5b50565b61349881613404565b81146134a357600080fd5b50565b6134af8161340e565b81146134ba57600080fd5b5056fe7472616e7366657246726f6d28616464726573732c616464726573732c75696e7432353629a26469706673582212202574b57b9cc18cf8ec98b08ad46b455d4e8f232ccc64357adec0dc4acd424dab64736f6c63430007060033";
