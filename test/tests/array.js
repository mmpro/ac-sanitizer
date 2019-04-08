const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid array of numbers', type: 'array', value: [1,2,3], expected: [1,2,3] },
      { name: 'Valid array of strings', type: 'array', value: ['a', 'b', 'c'], expected:  ['a', 'b', 'c'] },
      { name: 'Invalid array', type: 'array', value: 'a', error: 'array_notAnArray' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            array: _.get(test, 'value')
          },
          fields: [
            { field: 'array', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.array')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}