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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _core = require("@material-ui/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

var MTableTotalsRow =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MTableTotalsRow, _React$Component);

  function MTableTotalsRow() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, MTableTotalsRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MTableTotalsRow)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rotateIconStyle", function (isOpen) {
      return {
        transform: isOpen ? 'rotate(90deg)' : 'none'
      };
    });
    return _this;
  }

  (0, _createClass2["default"])(MTableTotalsRow, [{
    key: "renderColumns",
    value: function renderColumns() {
      var _this2 = this;

      var mapArr = this.props.columns.filter(function (columnDef) {
        return !columnDef.hidden && !(columnDef.tableData.groupOrder > -1);
      }).sort(function (a, b) {
        return a.tableData.columnOrder - b.tableData.columnOrder;
      }).map(function (columnDef, index) {
        var cellClassName = index < _this2.props.options.fixedColumns ? 'cell-fixed' : '';

        var value = _this2.props.getAggregation(_this2.props.renderData, columnDef);

        return columnDef.aggregation === 'custom' || value === undefined ? React.createElement(_core.TableCell, {
          key: "cell-total-".concat(columnDef.tableData.id),
          className: cellClassName
        }, value) : React.createElement(_this2.props.components.Cell, {
          icons: _this2.props.icons,
          isFixed: index < _this2.props.options.fixedColumns,
          columnDef: columnDef,
          value: value,
          key: 'cell-total-' + columnDef.tableData.id,
          rowData: _this2.props.renderData[0],
          sorting: !!_this2.props.options.sorting,
          headerFiltering: _this2.props.options.filtering && _this2.props.options.filterType === 'header'
        });
      });
      return mapArr;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var cellClassName = this.props.options.fixedColumns ? 'cell-fixed' : '';
      var renderColumns = this.renderColumns();
      var columnId = 0;

      var emptyCell = function emptyCell() {
        return React.createElement(_core.TableCell, {
          padding: "none",
          key: "key-column-".concat(++columnId),
          className: cellClassName
        });
      };

      if (this.props.options.selection) {
        renderColumns.splice(0, 0, emptyCell());
      }

      if (this.props.actions && this.props.actions.filter(function (a) {
        return !a.isFreeAction && !_this3.props.options.selection;
      }).length > 0) {
        if (this.props.options.actionsColumnIndex === -1) {
          renderColumns.push(emptyCell());
        } else if (this.props.options.actionsColumnIndex >= 0) {
          var endPos = 0;

          if (this.props.options.selection) {
            endPos = 1;
          }

          renderColumns.splice(this.props.options.actionsColumnIndex + endPos, 0, emptyCell());
        }
      }

      if (this.props.isTreeData) {
        renderColumns.splice(0, 0, React.createElement(_core.TableCell, {
          padding: "none",
          key: "key-tree-data-column",
          className: cellClassName
        }));
      }

      this.props.columns.filter(function (columnDef) {
        return columnDef.tableData.groupOrder > -1;
      }).forEach(function (columnDef) {
        renderColumns.splice(0, 0, React.createElement(_core.TableCell, {
          padding: "none",
          key: "key-group-cell" + columnDef.tableData.id,
          className: cellClassName
        }));
      });
      return React.createElement(_core.TableRow, {
        className: "totals-row"
      }, renderColumns);
    }
  }]);
  return MTableTotalsRow;
}(React.Component);

MTableTotalsRow.defaultProps = {
  renderData: {},
  options: {}
};
MTableTotalsRow.propTypes = {
  actions: _propTypes["default"].array,
  components: _propTypes["default"].object,
  icons: _propTypes["default"].any.isRequired,
  isTreeData: _propTypes["default"].bool.isRequired,
  detailPanel: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]))]),
  renderData: _propTypes["default"].array.isRequired,
  options: _propTypes["default"].object.isRequired,
  getAggregation: _propTypes["default"].func.isRequired,
  columns: _propTypes["default"].array.isRequired
};

var styles = function styles(theme) {
  return {
    '@global': {
      '.totals-row td.MuiTableCell-footer': {
        position: 'sticky',
        bottom: 1,
        backgroundColor: theme.palette.background.paper,
        // Change according to theme,
        color: theme.palette.grey['900'],
        fontWeight: 'bold',
        fontSize: '0.875rem'
      }
    }
  };
};

exports.styles = styles;

var _default = (0, _core.withStyles)(styles)(MTableTotalsRow);

exports["default"] = _default;