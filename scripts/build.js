const { resolve } = require('path') 
const { asyncExec } = require('../scripts/helper');

const ARTIFACTS_DIR = 'client/src/contracts';
const OZ_ERC20_FILE = 'node_modules/@openzeppelin/contracts/build/contracts/ERC20PresetMinterPauser.json';
const UNI_FACTORY_FILE = 'node_modules/@uniswap/v2-core/build/UniswapV2Factory.json';

async function build() {
    const artifactDir = resolve(ARTIFACTS_DIR)
    const ozErc20File = resolve(OZ_ERC20_FILE)
    const uniFactoryFile = resolve(UNI_FACTORY_FILE)
    await asyncExec("truffle compile")
    await asyncExec(`typechain --target=ethers-v5 --outDir ${artifactDir} ${artifactDir}/**/*.json`)
    await asyncExec(`typechain --target=ethers-v5 --outDir ${artifactDir}/external {${ozErc20File},${uniFactoryFile}}`)
}

if (require.main === module) {
    build()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error)
            process.exit(1)
        })
}