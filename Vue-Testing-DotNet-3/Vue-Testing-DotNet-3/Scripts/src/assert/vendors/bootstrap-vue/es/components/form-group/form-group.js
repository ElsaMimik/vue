import { warn } from '../../utils';
import { select, selectAll, isVisible, setAttr, removeAttr, getAttr } from '../../utils/dom';
import { idMixin, formStateMixin } from '../../mixins';
import bFormRow from '../layout/form-row';
import bFormText from '../form/form-text';
import bFormInvalidFeedback from '../form/form-invalid-feedback';
import bFormValidFeedback from '../form/form-valid-feedback';

// Selector for finding firt input in the form-group
var SELECTOR = 'input:not(:disabled),textarea:not(:disabled),select:not(:disabled)';

export default {
  mixins: [idMixin, formStateMixin],
  components: { bFormRow: bFormRow, bFormText: bFormText, bFormInvalidFeedback: bFormInvalidFeedback, bFormValidFeedback: bFormValidFeedback },
  render: function render(h) {
    var t = this;
    var $slots = t.$slots;

    // Label / Legend
    var legend = h(false);
    if (t.hasLabel) {
      var children = $slots['label'];
      var legendTag = t.labelFor ? 'label' : 'legend';
      var legendDomProps = children ? {} : { innerHTML: t.label };
      var legendAttrs = { id: t.labelId, for: t.labelFor || null };
      var legendClick = t.labelFor || t.labelSrOnly ? {} : { click: t.legendClick };
      if (t.horizontal) {
        // Horizontal layout with label
        if (t.labelSrOnly) {
          // SR Only we wrap label/legend in a div to preserve layout
          children = h(legendTag, { class: ['sr-only'], attrs: legendAttrs, domProps: legendDomProps }, children);
          legend = h('div', { class: t.labelLayoutClasses }, [children]);
        } else {
          legend = h(legendTag, {
            class: [t.labelLayoutClasses, t.labelClasses],
            attrs: legendAttrs,
            domProps: legendDomProps,
            on: legendClick
          }, children);
        }
      } else {
        // Vertical layout with label
        legend = h(legendTag, {
          class: t.labelSrOnly ? ['sr-only'] : t.labelClasses,
          attrs: legendAttrs,
          domProps: legendDomProps,
          on: legendClick
        }, children);
      }
    } else if (t.horizontal) {
      // No label but has horizontal layout, so we need a spacer element for layout
      legend = h('div', { class: t.labelLayoutClasses });
    }

    // Invalid feeback text (explicitly hidden if state is valid)
    var invalidFeedback = h(false);
    if (t.hasInvalidFeedback) {
      var domProps = {};
      if (!$slots['invalid-feedback'] && !$slots['feedback']) {
        domProps = { innerHTML: t.invalidFeedback || t.feedback || '' };
      }
      invalidFeedback = h('b-form-invalid-feedback', {
        props: {
          id: t.invalidFeedbackId,
          forceShow: t.computedState === false
        },
        attrs: {
          role: 'alert',
          'aria-live': 'assertive',
          'aria-atomic': 'true'
        },
        domProps: domProps
      }, $slots['invalid-feedback'] || $slots['feedback']);
    }

    // Valid feeback text (explicitly hidden if state is invalid)
    var validFeedback = h(false);
    if (t.hasValidFeedback) {
      var _domProps = $slots['valid-feedback'] ? {} : { innerHTML: t.validFeedback || '' };
      validFeedback = h('b-form-valid-feedback', {
        props: {
          id: t.validFeedbackId,
          forceShow: t.computedState === true
        },
        attrs: {
          role: 'alert',
          'aria-live': 'assertive',
          'aria-atomic': 'true'
        },
        domProps: _domProps
      }, $slots['valid-feedback']);
    }

    // Form help text (description)
    var description = h(false);
    if (t.hasDescription) {
      var _domProps2 = $slots['description'] ? {} : { innerHTML: t.description || '' };
      description = h('b-form-text', { attrs: { id: t.descriptionId }, domProps: _domProps2 }, $slots['description']);
    }

    // Build content layout
    var content = h('div', {
      ref: 'content',
      class: t.inputLayoutClasses,
      attrs: t.labelFor ? {} : { role: 'group', 'aria-labelledby': t.labelId }
    }, [$slots['default'], invalidFeedback, validFeedback, description]);

    // Generate main form-group wrapper
    return h(t.labelFor ? 'div' : 'fieldset', {
      class: t.groupClasses,
      attrs: {
        id: t.safeId(),
        disabled: t.disabled,
        role: 'group',
        'aria-invalid': t.computedState === false ? 'true' : null,
        'aria-labelledby': t.labelId,
        'aria-describedby': t.labelFor ? null : t.describedByIds
      }
    }, t.horizontal ? [h('b-form-row', {}, [legend, content])] : [legend, content]);
  },

  props: {
    horizontal: {
      type: Boolean,
      default: false
    },
    labelCols: {
      type: [Number, String],
      default: 3,
      validator: function validator(value) {
        if (Number(value) >= 1 && Number(value) <= 11) {
          return true;
        }
        warn('b-form-group: label-cols must be a value between 1 and 11');
        return false;
      }
    },
    breakpoint: {
      type: String,
      default: 'sm'
    },
    labelTextAlign: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    labelFor: {
      type: String,
      default: null
    },
    labelSize: {
      type: String,
      default: null
    },
    labelSrOnly: {
      type: Boolean,
      default: false
    },
    labelClass: {
      type: [String, Array],
      default: null
    },
    description: {
      type: String,
      default: null
    },
    invalidFeedback: {
      type: String,
      default: null
    },
    feedback: {
      // Deprecated in favor of invalid-feedback
      type: String,
      default: null
    },
    validFeedback: {
      type: String,
      default: null
    },
    validated: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    groupClasses: function groupClasses() {
      return ['b-form-group', 'form-group', this.validated ? 'was-validated' : null, this.stateClass];
    },
    labelClasses: function labelClasses() {
      return [
      // BS V4.beta.3 will replace .col-form-legend with .col-form-label
      // so this next line will change to just: 'col-form-label',
      this.labelSize || this.labelFor ? 'col-form-label' : 'col-form-legend', this.labelSize ? 'col-form-label-' + this.labelSize : null, this.labelTextAlign ? 'text-' + this.labelTextAlign : null, this.horizontal ? null : 'pt-0', this.labelClass];
    },
    labelLayoutClasses: function labelLayoutClasses() {
      return [this.horizontal ? 'col-' + this.breakpoint + '-' + this.labelCols : null];
    },
    inputLayoutClasses: function inputLayoutClasses() {
      return [this.horizontal ? 'col-' + this.breakpoint + '-' + (12 - Number(this.labelCols)) : null];
    },
    hasLabel: function hasLabel() {
      return this.label || this.$slots['label'];
    },
    hasDescription: function hasDescription() {
      return this.description || this.$slots['description'];
    },
    hasInvalidFeedback: function hasInvalidFeedback() {
      if (this.computedState === true) {
        // If the form-group state is explicityly valid, we return false
        return false;
      }
      return this.invalidFeedback || this.feedback || this.$slots['invalid-feedback'] || this.$slots['feedback'];
    },
    hasValidFeedback: function hasValidFeedback() {
      if (this.computedState === false) {
        // If the form-group state is explicityly invalid, we return false
        return false;
      }
      return this.validFeedback || this.$slots['valid-feedback'];
    },
    labelId: function labelId() {
      return this.hasLabel ? this.safeId('_BV_label_') : null;
    },
    descriptionId: function descriptionId() {
      return this.hasDescription ? this.safeId('_BV_description_') : null;
    },
    invalidFeedbackId: function invalidFeedbackId() {
      return this.hasInvalidFeedback ? this.safeId('_BV_feedback_invalid_') : null;
    },
    validFeedbackId: function validFeedbackId() {
      return this.hasValidFeedback ? this.safeId('_BV_feedback_valid_') : null;
    },
    describedByIds: function describedByIds() {
      return [this.descriptionId, this.invalidFeedbackId, this.validFeedbackId].filter(function (i) {
        return i;
      }).join(' ') || null;
    }
  },
  watch: {
    describedByIds: function describedByIds(add, remove) {
      if (add !== remove) {
        this.setInputDescribedBy(add, remove);
      }
    }
  },
  methods: {
    legendClick: function legendClick(evt) {
      var tagName = evt.target ? evt.target.tagName : '';
      if (/^(input|select|textarea|label)$/i.test(tagName)) {
        // If clicked an input inside legend, we just let the default happen
        return;
      }
      // Focus the first non-disabled visible input when the legend element is clicked
      var inputs = selectAll(SELECTOR, this.$refs.content).filter(isVisible);
      if (inputs[0] && inputs[0].focus) {
        inputs[0].focus();
      }
    },
    setInputDescribedBy: function setInputDescribedBy(add, remove) {
      // Sets the `aria-describedby` attribute on the input if label-for is set.
      // Optionally accepts a string of IDs to remove as the second parameter
      if (this.labelFor && typeof document !== 'undefined') {
        var input = select('#' + this.labelFor, this.$refs.content);
        if (input) {
          var adb = 'aria-describedby';
          var ids = (getAttr(input, adb) || '').split(/\s+/);
          remove = (remove || '').split(/\s+/);
          // Update ID list, preserving any original IDs
          ids = ids.filter(function (id) {
            return remove.indexOf(id) === -1;
          }).concat(add || '').join(' ').trim();
          if (ids) {
            setAttr(input, adb, ids);
          } else {
            removeAttr(input, adb);
          }
        }
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      // Set the adia-describedby IDs on the input specified by label-for
      // We do this in a nextTick to ensure the children have finished rendering
      _this.setInputDescribedBy(_this.describedByIds);
    });
  }
};