import React from 'react'
import { shallow } from 'enzyme'
import App from './app'

describe('App', () => {
  it('should write "Hello, World!"', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.first().text()).toBe('Hello, World!')
  })
})
