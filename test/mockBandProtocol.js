const MockBandProtocol = artifacts.require("MockBandProtocol");

contract("MockBandProtocol", accounts => {

  it("GetReference 0", async () => {
    const instance = await MockBandProtocol.deployed();
    let data = await instance.getReferenceData('A','B');    
    data = await instance.getReferenceData('A','B');    
  });

  it("GetReference 1", async () => {
    const instance = await MockBandProtocol.deployed();
    const data = await instance.getReferenceData('A','B');
  });

});
