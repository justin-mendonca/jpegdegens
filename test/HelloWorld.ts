import { ethers } from "hardhat";

// test the HelloWorld contract
describe("TestGas", function() {
    it("Test", async function() {
        // 1. setup
        const Gas = await ethers.getContractFactory("TestGas");

        // 2. deploy our contract
        const gas = (await Gas.deploy()) as any;
        // await to make sure that node consensus has been achieved aka contract has truly been deployed
        await gas.waitForDeployment()

        // 3. call our functions to test
        for (let i = 0; i < 10; i++) {
            await gas.test1();
            await gas.test2();
            await gas.test3();
            await gas.test4();
            await gas.test5();
        }
    })
})