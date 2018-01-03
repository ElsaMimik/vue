import { shallow } from 'vue-test-utils'
import Component from '../src/components/SumAmount.vue'

let wrapper
let vm

beforeEach(() => {
    wrapper = shallow(Component)
    vm = wrapper.vm     
})

afterEach(() => {

})

describe('SumAmount', () => {
  test('SumTotal should equal to FirstAmount plus SecondAmount', () => {

    wrapper.setData({
      FirstAmount: 25,
      SecondAmount: 31
    })

    expect(vm.SumTotal).toEqual(56)
  })
})