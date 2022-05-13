import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, execute} = deployments;

  const {deployer, admin} = await getNamedAccounts();

  const fourHours = 60 * 60 * 4;
  await deploy('4hrTimelock', {
    from: deployer,
    contract: 'TokenController',
    args: [fourHours, [admin], [admin]],
    log: true,
  });

  const sevenDays = 60 * 60 * 24 * 7;
  await deploy('7daysTimelock', {
    from: deployer,
    contract: 'TokenController',
    args: [sevenDays, [admin], [admin]],
    log: true,
  });

  await execute('4hrTimelock', { from: deployer }, 'revokeRole', '0x5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5', deployer);
  await execute('7daysTimelock', { from: deployer }, 'revokeRole', '0x5f58e3a2316349923ce3780f8d587db2d72378aed66a8261c916544fa6846ca5', deployer);

};
export default func;
func.tags = ['TokenController'];
