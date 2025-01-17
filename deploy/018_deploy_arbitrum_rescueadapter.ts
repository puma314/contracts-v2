import { L1_ADDRESS_MAP } from "./consts";

import "hardhat-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types/runtime";

const func = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const chainId = parseInt(await getChainId());

  await deploy("Arbitrum_RescueAdapter", {
    from: deployer,
    log: true,
    skipIfAlreadyDeployed: true,
    args: [L1_ADDRESS_MAP[chainId].l1ArbitrumInbox],
  });
};

module.exports = func;
func.dependencies = ["HubPool"];
func.tags = ["ArbitrumRescueAdapter", "mainnet"];
