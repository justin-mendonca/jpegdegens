import { ethers } from 'hardhat';
import { expect } from "chai";

// test the HelloWorld contract
describe('TestHero', function () {
  async function createHero() {
    const Hero = await ethers.getContractFactory('TestHero');
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

  it("Should create a hero when sufficient funds are sent to the contract", async () => {
    const hero = await createHero();

    await hero.setRandom(69);
    
    await hero.createHero(0, {
      value: ethers.parseEther('0.05')
    })

    const h = (await hero.getHeroes())[0];
    console.log(h)
    
    expect(await hero.getMagic(h)).to.equal(16);
    expect(await hero.getHealth(h)).to.equal(2);
  })
});
