import { ethers } from 'hardhat';
import { expect } from "chai";

// test the HelloWorld contract
describe('TestHero', function () {
  async function createHero() {
    const Hero = await ethers.getContractFactory('Hero');
    const hero = await Hero.deploy();

    await hero.waitForDeployment();

    return hero;
  }

  let hero;

  before(async () => {
    hero = await createHero()
  })

  it("Should get a zero hero array.", async () => {
    expect(await hero.getHeroes()).to.deep.equal([])
  })

  it("Should fail to create a hero when insufficient funds are sent to the contract", async () => {
    let expectedError;

    try {

        await hero.createHero(0, {
            value: ethers.parseEther('0.0499')
        })

    } catch (err) {
        expectedError = err;
    }

    expect(expectedError.message.includes("Insufficient funds: Please send required payment"))
  })
});
