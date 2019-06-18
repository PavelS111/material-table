"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.styles = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _pickers = require("@material-ui/pickers");

var _dateFns = _interopRequireDefault(require("@date-io/date-fns"));

var _propTypes = _interopRequireDefault(require("prop-types"));

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var MTableFilterButton =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MTableFilterButton, _React$Component);

  function MTableFilterButton(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MTableFilterButton);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MTableFilterButton).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleOpenPopoverButtonClick", function (e) {
      _this.setState({
        anchorEl: e.currentTarget
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handlePopoverClose", function () {
      _this.setState({
        anchorEl: null
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleLookupCheckboxToggle", function (columnDef, key) {
      var filterValue = (columnDef.tableData.filterValue || []).slice();
      var elementIndex = filterValue.indexOf(key);

      if (elementIndex === -1) {
        filterValue.push(key);
      } else {
        filterValue.splice(elementIndex, 1);
      }

      if (filterValue.length === 0) filterValue = undefined;

      _this.props.onFilterChanged(columnDef.tableData.id, filterValue);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleCheckboxToggle", function (columnDef) {
      var val;

      if (columnDef.tableData.filterValue === undefined) {
        val = 'checked';
      } else if (columnDef.tableData.filterValue === 'checked') {
        val = 'unchecked';
      }

      _this.props.onFilterChanged(columnDef.tableData.id, val);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleFilterNumericChange", function (columnDef, value, index) {
      var filterValue = columnDef.tableData.filterValue; //if both value are undef => filterValue = undef

      if (!value && filterValue && !filterValue[Math.abs(index - 1)]) filterValue = undefined;else {
        if (filterValue === undefined) filterValue = [undefined, undefined];
        filterValue[index] = value;
      }

      _this.props.onFilterChanged(columnDef.tableData.id, filterValue);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderLookupFilter", function (columnDef) {
      var classes = _this.props.classes;
      return React.createElement(_core.FormControl, {
        style: {
          width: '100%'
        }
      }, React.createElement(_core.List, {
        className: classes.filterList
      }, Object.keys(columnDef.lookup).sort(function (k1, k2) {
        return "".concat(columnDef.lookup[k1]).localeCompare("".concat(columnDef.lookup[k2]));
      }).map(function (key) {
        return React.createElement(_core.ListItem, {
          className: classes.filterListItem,
          key: key,
          role: undefined,
          dense: true,
          button: true,
          onClick: function onClick() {
            return _this.handleLookupCheckboxToggle(columnDef, key);
          }
        }, React.createElement(_core.Checkbox, {
          className: classes.filterCheckbox,
          checked: columnDef.tableData.filterValue ? columnDef.tableData.filterValue.indexOf(key.toString()) > -1 : false,
          tabIndex: -1,
          disableRipple: true
        }), React.createElement(_core.ListItemText, {
          primary: columnDef.lookup[key],
          className: classes.filterText
        }));
      })));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderBooleanFilter", function (columnDef) {
      var classes = _this.props.classes;
      return React.createElement(_core.Checkbox, {
        className: classes.filterCheckbox,
        indeterminate: columnDef.tableData.filterValue === undefined,
        checked: columnDef.tableData.filterValue === 'checked',
        onChange: function onChange() {
          return _this.handleCheckboxToggle(columnDef);
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderNumericFilter", function (columnDef) {
      var classes = _this.props.classes;
      return React.createElement(React.Fragment, null, React.createElement(_core.TextField, {
        type: "number",
        className: classes.filterNumericFrom,
        value: columnDef.tableData.filterValue && columnDef.tableData.filterValue[0] || '',
        onChange: function onChange(event) {
          return _this.handleFilterNumericChange(columnDef, event.target.value, 0);
        },
        InputProps: {
          startAdornment: React.createElement(_core.InputAdornment, {
            position: "start"
          }, React.createElement(React.Fragment, null, "\u0421:"))
        }
      }), React.createElement(_core.TextField, {
        type: "number",
        className: classes.filterNumericTo,
        value: columnDef.tableData.filterValue && columnDef.tableData.filterValue[1] || '',
        onChange: function onChange(event) {
          return _this.handleFilterNumericChange(columnDef, event.target.value, 1);
        },
        InputProps: {
          startAdornment: React.createElement(_core.InputAdornment, {
            position: "start"
          }, React.createElement(React.Fragment, null, "\u041F\u043E:"))
        }
      }));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderDefaultFilter", function (columnDef) {
      return React.createElement(_core.TextField, {
        style: columnDef.type === 'numeric' ? {
          "float": 'right'
        } : {},
        type: columnDef.type === 'numeric' ? 'number' : 'text',
        value: columnDef.tableData.filterValue || '',
        onChange: function onChange(event) {
          _this.props.onFilterChanged(columnDef.tableData.id, event.target.value);
        },
        InputProps: {
          startAdornment: React.createElement(_core.InputAdornment, {
            position: "start"
          }, React.createElement(React.Fragment, null))
        }
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderDateTypeFilter", function (columnDef) {
      var dateInputElement = null;

      var onDateInputChange = function onDateInputChange(date) {
        return _this.props.onFilterChanged(columnDef.tableData.id, date);
      };

      if (columnDef.type === 'date') {
        dateInputElement = React.createElement(_pickers.DatePicker, {
          value: columnDef.tableData.filterValue || null,
          onChange: onDateInputChange,
          clearable: true
        });
      } else if (columnDef.type === 'datetime') {
        dateInputElement = React.createElement(_pickers.DateTimePicker, {
          value: columnDef.tableData.filterValue || null,
          onChange: onDateInputChange,
          clearable: true
        });
      } else if (columnDef.type === 'time') {
        dateInputElement = React.createElement(_pickers.TimePicker, {
          value: columnDef.tableData.filterValue || null,
          onChange: onDateInputChange,
          clearable: true
        });
      }

      return React.createElement(_pickers.MuiPickersUtilsProvider, {
        utils: _dateFns["default"]
      }, dateInputElement);
    });
    _this.state = {
      anchorEl: null
    };
    return _this;
  }

  (0, _createClass2["default"])(MTableFilterButton, [{
    key: "getFilterTitle",
    value: function getFilterTitle() {
      var columnDef = this.props.columnDef;

      if (columnDef.field || columnDef.customFilterAndSearch) {
        if (columnDef.lookup) {
          var lookupResult = Object.keys(columnDef.lookup).filter(function (key) {
            return columnDef.tableData.filterValue && columnDef.tableData.filterValue.indexOf(key.toString()) > -1;
          }).map(function (key) {
            return columnDef.lookup[key];
          }).join(', ');
          return lookupResult;
        }

        return columnDef.tableData.filterValue;
      }

      return null;
    }
  }, {
    key: "renderFilterBody",
    value: function renderFilterBody(columnDef) {
      if (columnDef.field || columnDef.customFilterAndSearch) {
        if (columnDef.lookup) {
          return this.renderLookupFilter(columnDef);
        } else if (columnDef.type === 'boolean') {
          return this.renderBooleanFilter(columnDef);
        } else if (['date', 'datetime', 'time'].includes(columnDef.type)) {
          return this.renderDateTypeFilter(columnDef);
        } else if (columnDef.type === 'numeric') {
          return this.renderNumericFilter(columnDef);
        } else {
          return this.renderDefaultFilter(columnDef);
        }
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var columnDef = this.props.columnDef;
      if (columnDef.filtering === false) return null;
      var classes = this.props.classes;
      var popoverOpened = this.state.anchorEl !== null;
      var iconColor = "rgba(0, 0, 0, ".concat(columnDef.tableData.filterValue ? '1' : '0.2', ")");
      return React.createElement("span", {
        title: this.getFilterTitle()
      }, React.createElement(this.props.icons.Filter, {
        style: {
          color: iconColor
        },
        className: classes.filterIcon,
        "aria-owns": popoverOpened ? 'filter-popover' : undefined,
        "aria-haspopup": "true",
        variant: "contained",
        onClick: function onClick(e) {
          return _this2.handleOpenPopoverButtonClick(e);
        }
      }), React.createElement(_core.Popover, {
        id: "filter-popover",
        open: popoverOpened,
        anchorEl: this.state.anchorEl,
        onClose: this.handlePopoverClose,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      }, React.createElement("div", {
        className: classes.filterBody
      }, this.renderFilterBody(columnDef))));
    }
  }]);
  return MTableFilterButton;
}(React.Component);

var styles = function styles(theme) {
  return {
    filterIcon: {
      verticalAlign: 'middle',
      cursor: 'pointer'
    },
    filterBody: {
      padding: '8px'
    },
    filterCheckbox: {
      padding: '12px'
    },
    filterList: {
      padding: '0'
    },
    filterListItem: {
      padding: '0 12px'
    },
    filterText: {
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5em'
    },
    filterNumericFrom: {
      width: '100px',
      marginRight: '5px'
    },
    filterNumericTo: {
      width: '100px',
      marginLeft: '5px'
    }
  };
};

exports.styles = styles;
MTableFilterButton.propTypes = {
  icons: _propTypes["default"].object.isRequired,
  columnDef: _propTypes["default"].object.isRequired,
  onFilterChanged: _propTypes["default"].func.isRequired,
  classes: _propTypes["default"].object
};

var _default = (0, _core.withStyles)(styles)(MTableFilterButton);

exports["default"] = _default;