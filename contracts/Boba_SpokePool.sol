// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.0;

import "./Ovm_SpokePool.sol";

/**
 * @notice Boba Spoke pool. Note that the l2ETH and l2WETH are the opposite as that in Optimism.
 */
contract Boba_SpokePool is Ovm_SpokePool {
    /**
     * @notice Construct the OVM Boba SpokePool.
     * @param _initialDepositId Starting deposit ID. Set to 0 unless this is a re-deployment in order to mitigate
     * relay hash collisions.
     * @param _crossDomainAdmin Cross domain admin to set. Can be changed by admin.
     * @param _hubPool Hub pool address to set. Can be changed by admin.
     * @param _timerAddress Timer address to set.
     */
    function initialize(
        uint32 _initialDepositId,
        address _crossDomainAdmin,
        address _hubPool,
        address _timerAddress
    ) public initializer {
        __OvmSpokePool_init(
            _initialDepositId,
            _crossDomainAdmin,
            _hubPool,
            0x4200000000000000000000000000000000000006,
            0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000,
            _timerAddress
        );
    }
}
