import "hardhat-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";

import { L2_ADDRESS_MAP } from "./consts";

const func = async function (hre: HardhatRuntimeEnvironment) {
  const { companionNetworks, getChainId, getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  // Grab L1 addresses:
  const { deployments: l1Deployments } = companionNetworks.l1;
  const hubPool = await l1Deployments.get("HubPool");
  console.log(`Using l1 hub pool @ ${hubPool.address}`);

  const chainId = parseInt(await getChainId());

  await deploy("ZkSync_SpokePool", {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
    args: [
      L2_ADDRESS_MAP[chainId].zkErc20Bridge,
      L2_ADDRESS_MAP[chainId].zkEthBridge,
      hubPool.address, // Set hub pool as cross domain admin since it delegatecalls the ZkSync_Adapter logic.
      hubPool.address,
      L2_ADDRESS_MAP[chainId].l2Weth, // l2Weth
      "0x0000000000000000000000000000000000000000", // timer
    ],
  });
};
module.exports = func;
func.tags = ["ZkSyncSpokePool", "zksync"];
