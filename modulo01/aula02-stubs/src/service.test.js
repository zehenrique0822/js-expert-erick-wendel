const Service = require('./service')
const assert = require('assert')
const BASE_URL_1= "https://swapi.dev/api/planets/1"
const BASE_URL_2= "https://swapi.dev/api/planets/2"
const { createSandbox } = require('sinon')
const sinon = createSandbox()
const mocks = {
  tatooine: require('./../mocks/tatooine.json'),
  alderaan: require('./../mocks/alderaan.json')
}

;(async () => {
  // {
  //   // vai para a internet
  //   const service = new Service()
  //   const dados = await service.makeRequest(BASE_URL_2)
  //   console.log(JSON.stringify(dados))
  // }

  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine)
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan)

  {
    const expected = {
      name: "Tatooine",      
      surfaceWater: "1",
      appeardIn: 5
    }

    const results = await service.getPlanets(BASE_URL_1)
    assert.deepStrictEqual(results, expected)
  }

  {
    const expected = {
      name: "Alderaan",      
      surfaceWater: "40",
      appeardIn: 2
    }

    const results = await service.getPlanets(BASE_URL_2)
    assert.deepStrictEqual(results, expected)
  }
})()