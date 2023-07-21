import { ethers } from "hardhat";
import { expect } from "chai";

// test the HelloWorld contract
describe("hello world", function() {
    it("should say hi", async function() {
        // 1. setup
        const HelloWorld = await ethers.getContractFactory("HelloWorld");

        // 2. deploy our contract
        const hello = (await HelloWorld.deploy()) as any;
        // await to make sure that node consensus has been achieved aka contract has truly been deployed
        await hello.waitForDeployment()

        // 3. call our functions to test
        expect(await hello.hello()).to.equal("Hello, World!");
    })
})