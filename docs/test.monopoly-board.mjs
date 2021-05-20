import emoji from '/static/html/components/component_modules/emoji/emoji.mjs';
import task from '/static/html/components/component_modules/heap/index.mjs'
import isEmpty from '/static/html/components/component_modules/isEmpty/isEmpty.mjs'

describe('Monopoly', async function () {
  this.timeout(10000);
  before(async function () {
    // console.log('emoji', emoji('moon'))
  });
  describe('case №1', async function () {
    it('case №1 action 1', function () {
      return new Promise(async (resolve, reject) => {
        resolve(true)
      })
    })
    it('case №1 action 2', function () {
      return new Promise(async (resolve, reject) => {
          resolve(true)
      })
    })
  })
})