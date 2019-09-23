import { shallowMount } from '@vue/test-utils';
import Planner from "../../src/Planner.vue";

describe('Planner.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Planner, {
      propsData: { msg },
    });
    expect(wrapper.text()).toHaveLength(100);
  });
});
