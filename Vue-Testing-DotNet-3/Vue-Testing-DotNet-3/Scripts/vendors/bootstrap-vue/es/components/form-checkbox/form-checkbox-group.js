import { idMixin, formMixin, formOptionsMixin, formSizeMixin, formStateMixin, formCustomMixin } from '../../mixins';
import bFormCheckbox from './form-checkbox';

export default {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin, formCustomMixin, formOptionsMixin],
  components: { bFormCheckbox: bFormCheckbox },
  render: function render(h) {
    var t = this;
    var $slots = t.$slots;

    var checks = t.formOptions.map(function (option, idx) {
      return h('b-form-checkbox', {
        key: 'check_' + idx + '_opt',
        props: {
          id: t.safeId('_BV_check_' + idx + '_opt_'),
          name: t.name,
          value: option.value,
          required: t.name && t.required,
          disabled: option.disabled
        }
      }, [h('span', { domProps: { innerHTML: option.text } })]);
    });
    return h('div', {
      class: t.groupClasses,
      attrs: {
        id: t.safeId(),
        role: 'group',
        tabindex: '-1',
        // `data-toggle="buttons" will not be needed in BS V4.beta.3
        'data-toggle': t.buttons ? 'buttons' : null, // Needed for styling only!
        'aria-required': t.required ? 'true' : null,
        'aria-invalid': t.computedAriaInvalid
      }
    }, [$slots.first, checks, $slots.default]);
  },
  data: function data() {
    return {
      localChecked: this.checked || [],
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
      type: [String, Number, Object, Array, Boolean],
      default: null
    },
    validated: {
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
      var t = this;
      if (t.buttons) {
        return ['btn-group-toggle', t.stacked ? 'btn-group-vertical' : 'btn-group', t.size ? 'btn-group-' + this.size : '', t.validated ? 'was-validated' : ''];
      }
      return [t.sizeFormClass, t.stacked && t.custom ? 'custom-controls-stacked' : '', t.validated ? 'was-validated' : ''];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      var t = this;
      if (t.ariaInvalid === true || t.ariaInvalid === 'true' || t.ariaInvalid === '') {
        return 'true';
      }
      return t.get_State === false ? 'true' : null;
    },
    get_State: function get_State() {
      // Child radios sniff this value
      return this.computedState;
    }
  }
};