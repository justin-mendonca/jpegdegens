import { ethers } from 'ethers';
import Counter from '../artifacts/contracts/Counter.sol/Counter.json';
// get Ethereum Metamask object
function getEth() {
  // @ts-ignore
  return window.ethereum;
}

async function hasAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({ method: 'eth_accounts' })) as string[];

  return accounts && accounts.length;
}

async function requestAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({
    method: 'eth_requestAccounts',
  })) as string[];

  return accounts && accounts.length;
}

async function run() {
  // check to see if there are accounts in metamask
  if (!(await hasAccounts()) && !(await requestAccounts())) {
    // if either of these methods do not work, handle error
    throw new Error('Oops, git gud dev');
  }

  const counter = new ethers.Contract(
    // need 3 things to connect to a contract:
    // 1. address, 2. interface to contract, 3. provider
    process.env.CONTRACT_ADDRESS,
    Counter.abi,
    await new ethers.BrowserProvider(getEth()).getSigner()
  );

  const el = document.createElement('div');
  async function setCounter(count?: number) {
    el.innerHTML = count || (await counter.getCounter());
  }
  setCounter();

  const button = document.createElement('button');
  button.innerText = 'Increment';

  button.onclick = async function () {
    await counter.count();
  };

  counter.on(counter.filters.CounterInc(), function (count) {
    setCounter(count);
  });

  document.body.appendChild(el);
  document.body.appendChild(button);
}

run();
