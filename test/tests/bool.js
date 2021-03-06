const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid bool', type: 'boolean', value: true, expected: true },
      { name: 'Valid bool', type: 'boolean', value: false, expected: false },
      { name: 'Valid bool as string', type: 'boolean', value: 'true', expected: true },
      { name: 'Valid bool as string', type: 'boolean', value: 'false', expected: false },
      { name: 'Invalid - value is integer', type: 'boolean', value: 123, error: 'bool_notBoolean' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            bool: _.get(test, 'value')
          },
          fields: [
            { field: 'bool', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).toEqual(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.bool')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
