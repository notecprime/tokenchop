Tokenchop is a DeFi solution that splits any BEP20 token (e.g. WBNB) into two new BEP20 tokens with different risk-return profiles based on a pair (e.g. WBNB/BUSD). 

The two new tokens are fund pools, one Stable and the other Speculative. The Spec pool takes all the gains and losses for both pools. Users can deposit or withdraw their original tokens at any time by minting or burning the corresponding token. A token of the stable pool is effectively a synthetic stable coin with a fixed value relative to the quote (eg. BUSD). This value is protected by the Speculative pool funds. A token of the Speculative pool is a synthetic margin account with leverage as it gets all the gains and losses for the funds across the contracts.

Benefits of the Stable pool
- Ability to create stable token without the need for collateral in excess of the value created.
- No transaction costs beyond gas to lock in a tokens price
- Return provided from fees paid by the Speculative pool

Benefits of the Speculative pool
- Cost effective method to create leverage.
- No risk of loss beyond the value of tokens in the pool
- No collateral requirement beyond the value of the tokens in the pool

Market mechanism
- The two pools create their own market as the supply of each pool will vary according to market demand. There should be pool size ratio (SR) which represents market equilibrium.

PSR = Total Stable Pool Value / Total Spec Pool Value

Stable pool
- Below PSR
The Stable pool is smaller than predicted by PSR.
The Stable pool risk is less than market as there are proportionally more Spec funds to protect the Stable pool
The Stable pool return is higher than market as the fees are split across less Stable pool
As both risk and return is better than market the pool should increase towards PSR
- Above R
The Stable pool is larger than predicted by PSR.
The Stable pool risk is greater than market as there are proportionally fewer Spec funds to protect the Stable pool
The Stable pool return is lower than market as the fees are split across more Stable pool
As both risk and return are worse than market the pool should decrease towards PSR

Spec pool
- Below R
The Spec pool is larger than predicted by PSR.
The Spec pool risk does not change as this is related to change in market price, not the size of the Stable Pool
The Spec pool return is lower than market as the Stable pool gains are split across more Spec pool funds
As risk is unchanged but return is worse than market the pool should decrease towards PSR
- Above R
The Spec pool is smaller than predicted by PSR.
The Spec pool risk does not change as this is related to change in market price, not the size of the Stable Pool
The Spec pool return is higher than market as the Stable pool gains are split across fewer Spec pool funds
As risk is unchanged but return is better than market the pool should increase towards PSR

Market price
Market price is determined by onchain oracles

Mechanism for maintaining the pools

Each token maintains a total collateral value. This is increased by the equivalent amount when funds are deposited, and decreased when tokens withdrawn
Whenever funds are deposited or withdrawn for either pool a reprice occurs first. This establishes the share of collateral for each token.
Collateral is transferred between the pools to adjust for gains or losses.

e.g.     USD	ETH
ETH/USD 1500	  1
Stable 	1500	  1
Spec	1500	  1

ETH/USD 1000
Stable	1500	1.5
Spec	 500	0.5


mint stable 500		1500
mint spec 500		1000
mint stable 1000	2000
burn stable 300		1500
burn spec 1000		3000
