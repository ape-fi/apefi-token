import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, execute} = deployments;

  const {deployer, admin} = await getNamedAccounts();

  await deploy('ApeFiToken', {
    from: deployer,
    args: ['Ape Finance', 'APEFI'],
    log: true,
  });

  await execute('ApeFiToken', { from: deployer }, 'transferOwnership', admin);
};
export default func;
func.tags = ['ApeFi'];
