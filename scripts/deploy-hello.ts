import { ethers } from "hardhat";

async function deploy() {
  const HelloWorld = await ethers.getContractFactory("HelloWorld")
  // mirrors the test steps
  const hello = await HelloWorld.deploy();
  await hello.waitForDeployment();

  // return the actual contract
  return hello;
}

// this function takes the HelloWorld contract as a parameter
async function sayHello(hello) {
  console.log("Say Hello:", await hello.hello());
}

deploy().then(sayHello)