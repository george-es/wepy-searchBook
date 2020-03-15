"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var basic_1 = require('./../mixins/basic.js');

var relationFunctions = {
  ancestor: {
    linked: function linked(parent) {
      this.parent = parent;
    },
    unlinked: function unlinked() {
      this.parent = null;
    }
  },
  descendant: {
    linked: function linked(child) {
      this.children = this.children || [];
      this.children.push(child);
    },
    unlinked: function unlinked(child) {
      this.children = (this.children || []).filter(function (it) {
        return it !== child;
      });
    }
  }
};

function mapKeys(source, target, map) {
  Object.keys(map).forEach(function (key) {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

function makeRelation(options, vantOptions, relation) {
  var _a;

  var type = relation.type,
      name = relation.name,
      _linked = relation.linked,
      _unlinked = relation.unlinked,
      _linkChanged = relation.linkChanged;
  var beforeCreate = vantOptions.beforeCreate,
      destroyed = vantOptions.destroyed;

  if (type === 'descendant') {
    options.created = function () {
      beforeCreate && beforeCreate.bind(this)();
      this.children = this.children || [];
    };

    options.detached = function () {
      this.children = [];
      destroyed && destroyed.bind(this)();
    };
  }

  options.relations = Object.assign(options.relations || {}, (_a = {}, _a["../" + name + "/index"] = {
    type: type,
    linked: function linked(node) {
      relationFunctions[type].linked.bind(this)(node);
      _linked && _linked.bind(this)(node);
    },
    linkChanged: function linkChanged(node) {
      _linkChanged && _linkChanged.bind(this)(node);
    },
    unlinked: function unlinked(node) {
      relationFunctions[type].unlinked.bind(this)(node);
      _unlinked && _unlinked.bind(this)(node);
    }
  }, _a));
}

function VantComponent(vantOptions) {
  if (vantOptions === void 0) {
    vantOptions = {};
  }

  var options = {};
  mapKeys(vantOptions, options, {
    data: 'data',
    props: 'properties',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    relations: 'relations',
    destroyed: 'detached',
    classes: 'externalClasses'
  });
  var relation = vantOptions.relation;

  if (relation) {
    makeRelation(options, vantOptions, relation);
  } // add default externalClasses


  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class'); // add default behaviors

  options.behaviors = options.behaviors || [];
  options.behaviors.push(basic_1.basic); // map field to form-field behavior

  if (vantOptions.field) {
    options.behaviors.push('wx://form-field');
  } // add default options


  options.options = {
    multipleSlots: true,
    addGlobalClass: true
  };
  Component(options);
}

exports.VantComponent = VantComponent;