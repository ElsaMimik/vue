import { idMixin, formMixin, formOptionsMixin, formSizeMixin, formStateMixin, formCustomMixin } from '../../mixins';
import bFormRadio from './form-radio';

export default {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formOptionsMixin],
  components: { bFormRadio: bFormRadio },
  render: function render(h) {
    var t = this;
    var $slots = t.$slots;

    var radios = t.formOptions.map(function (option, idx) {
      return h('b-form-radio', {
        key: 'radio_' + idx + '_opt',
        props: {
          id: t.safeId('_BV_radio_' + idx + '_opt_'),
          name: t.name,
          value: option.value,
          required: Boolean(t.name && t.required),
          disabled: option.disabled
        }
      }, [h('span', { domProps: { innerHTML: option.text } })]);
    });
    return h('div', {
      class: t.groupClasses,
      attrs: {
        id: t.safeId(),
        role: 'radiogroup',
        tabindex: '-1',
        // `data-toggle="buttons"` can be removed when BSV4.beta.3 is released
        'data-toggle': t.buttons ? 'buttons' : null, // Needed for styling only!
        'aria-required': t.required ? 'true' : null,
        'aria-invalid': t.computedAriaInvalid
      }
    }, [$slots.first, radios, $slots.default]);
  },
  data: function data() {
    return {
      localChecked: this.checked,
      // Flag for children
      is_RadioCheckGroup: true
    };
  },

  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    checked: {
      type: [String, Object, Number, Boolean],
      default: null
    },
    validated: {
      // Used for applying hte `was-validated` class to the group
      type: Boolean,
      default: false
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    stacked: {
      type: Boolean,
      default: false
    },
    buttons: {
      // Render as button style
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String,
      default: 'secondary'
    }
  },
  watch: {
    checked: function checked(newVal, oldVal) {
      this.localChecked = this.checked;
    },
    localChecked: function localChecked(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  },
  computed: {
    groupClasses: function groupClasses() {
      if (this.buttons) {
        return ['btn-group-toggle', this.stacked ? 'btn-group-vertical' : 'btn-group', this.size ? 'btn-group-' + this.size : '', this.validated ? 'was-validated' : ''];
      }
      return [this.sizeFormClass, this.stacked && this.custom ? 'custom-controls-stacked' : '', this.validated ? 'was-validated' : ''];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (this.ariaInvalid === true || this.ariaInvalid === 'true' || this.ariaInvalid === '') {
        return 'true';
      }
      return this.get_State === false ? 'true' : null;
    },
    get_State: function get_State() {
      // Required by child radios
      return this.computedState;
    }
  }
};