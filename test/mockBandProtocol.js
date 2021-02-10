const MockBandProtocol = artifacts.require("MockBandProtocol");

contract("MockBandProtocol", accounts => {

  it("GetReference 0", async () => {
    const instance = await MockBandProtocol.deployed();
    let data = await instance.getReferenceData('A','B');    
    console.log(data)
    data = await instance.getReferenceData('A','B');    
    console.log(data)
  });

  it("GetReference 1", async () => {
    const instance = await MockBandProtocol.deployed();
    const data = await instance.getReferenceData('A','B');
    console.log(data)
  });

});
