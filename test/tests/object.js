const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid object', type: 'object', value: { a: true }, expected: { a: true } },
      { name: 'Invalid object', type: 'object', value: 'a', error: 'object_notAPlainObject' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            object: _.get(test, 'value')
          },
          fields: [
            { field: 'object', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.object')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
