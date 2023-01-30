const { palindrome } = require('../utils/for_testing')

test.skip('palindrome of oscar', () => {
  const result = palindrome('miBlock')

  expect(result).toBe('kcolBim')
})

test.skip('palindrome of empty string', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
  const result = palindrome()

  expect(result).toBe()
})
