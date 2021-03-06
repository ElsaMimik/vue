import { idMixin, formMixin, formSizeMixin, formStateMixin } from '../../mixins';
import { arrayIncludes } from '../../utils/array';

// Valid supported input types
var TYPES = ['text', 'password', 'email', 'number', 'url', 'tel', 'search', 'range', 'color', 'date', 'time', 'datetime', 'datetime-local', 'month', 'week'];

export default {
  mixins: [idMixin, formMixin, formSizeMixin, formStateMixin],
  render: function render(h) {
    var t = this;
    return h('input', {
      ref: 'input',
      class: t.inputClass,
      domProps: { value: t.localValue },
      attrs: {
        id: t.safeId(),
        name: t.name,
        type: t.localType,
        disabled: t.disabled,
        required: t.required,
        readonly: t.readonly || t.plaintext,
        placeholder: t.placeholder,
        autocomplete: t.autocomplete || null,
        'aria-required': t.required ? 'true' : null,
        'aria-invalid': t.computedAriaInvalid
      },
      on: {
        input: t.onInput,
        change: t.onChange
      }
    });
  },
  data: function data() {
    return {
      localValue: this.value
    };
  },

  props: {
    value: {
      default: null
    },
    type: {
      type: String,
      default: 'text',
      validator: function validator(type) {
        return arrayIncludes(TYPES, type);
      }
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    plaintext: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    formatter: {
      type: Function
    },
    lazyFormatter: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localType: function localType() {
      // We only allow certain types
      return arrayIncludes(TYPES, this.type) ? this.type : 'text';
    },
    inputClass: function inputClass() {
      return [this.plaintext ? 'form-control-plaintext' : 'form-control',
      // Fix missing width:100% in Bootstrap V4.beta.2
      this.plaintext ? 'w-100' : '', this.sizeFormClass, this.stateClass];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (!this.ariaInvalid || this.ariaInvalid === 'false') {
        // this.ariaInvalid is null or false or 'false'
        return this.computedState === false ? 'true' : null;
      }
      if (this.ariaInvalid === true) {
        // User wants explicit aria-invalid=true
        return 'true';
      }
      // Most likely a string value (which could be 'true')
      return this.ariaInvalid;
    }
  },
  watch: {
    value: function value(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.localValue = newVal;
      }
    },
    localValue: function localValue(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal);
      }
    }
  },
  methods: {
    format: function format(value, e) {
      if (this.formatter) {
        var formattedValue = this.formatter(value, e);
        if (formattedValue !== value) {
          return formattedValue;
        }
      }
      return value;
    },
    onInput: function onInput(evt) {
      var value = evt.target.value;
      if (this.lazyFormatter) {
        // Update the model with the current unformated value
        this.localValue = value;
      } else {
        this.localValue = this.format(value, evt);
      }
    },
    onChange: function onChange(evt) {
      this.localValue = this.format(evt.target.value, evt);
      this.$emit('change', this.localValue);
    },
    focus: function focus() {
      if (!this.disabled) {
        this.$el.focus();
      }
    }
  }
};