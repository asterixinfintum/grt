function rmLiq() public onlyOwner {
    address tokenAddress = address(/* your token address here */);
    uint liquidity = IERC20(address(uniswapV2Pair)).balanceOf(address(this));
    
    require(liquidity > 0, "No liquidity to remove");

    IERC20(address(uniswapV2Pair)).approve(address(uniswapV2Router), 0); // Reset allowance
    IERC20(address(uniswapV2Pair)).approve(address(uniswapV2Router), liquidity);

    (uint amountToken, uint amountETH) = uniswapV2Router.removeLiquidityETH(
        tokenAddress,
        liquidity,
        1, // Set a minimum amount of tokens to receive
        1, // Set a minimum amount of ETH to receive
        _msgSender(),
        block.timestamp + 15 minutes
    );

    emit LiquidityRemoved(amountToken, amountETH);
}

event LiquidityRemoved(uint amountToken, uint amountETH);
