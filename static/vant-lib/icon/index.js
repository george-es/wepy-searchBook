"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var component_1 = require('./../common/component.js');

component_1.VantComponent({
  props: {
    dot: Boolean,
    info: null,
    size: null,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    },
    name: {
      type: String,
      observer: function observer(val) {
        this.setData({
          isImageName: val.indexOf('/') !== -1
        });
      }
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit('click');
    }
  }
});