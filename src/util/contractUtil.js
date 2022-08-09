import { ethers } from "ethers";

function getProvider() {
  if (window.ethereum) return new ethers.providers.Web3Provider(ethereum);
}
function getContract(address, abi) {
  let provider = getProvider();
  let contract = new ethers.Contract(address, abi, provider.getSigner());
  return contract;
}

async function autoSwitch() {
  let provider = getProvider();
  if (window.ethereum) {
    provider.getNetwork().then(async (data) => {
      if (data.chainId != process.env.VUE_APP_CHAINID) {
        await setupNetwork();
        return;
      }
    });
  }
}
async function setupNetwork() {
  const nodes = [process.env.VUE_APP_CHAINADDRESS];
  const provider = ethereum;
  if (provider) {
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainName: "psc",
            chainId: `0x${Number(process.env.VUE_APP_CHAINID).toString(16)}`,
            rpcUrls: nodes,

            nativeCurrency: {
              name: "PSC",
              symbol: "psc",
              decimals: 18,
            },
          },
        ],
      });

      return true;
    } catch (error) {
      return false;
    }
  } else {
    console.error(
      "Can't setup the psc network on metamask because window.ethereum is undefined"
    );
    return false;
  }
}
export { getProvider, getContract, autoSwitch };
