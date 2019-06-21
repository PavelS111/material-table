"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _core = require("@material-ui/core");

var _reactDoubleScrollbar = _interopRequireDefault(require("react-double-scrollbar"));

var React = _interopRequireWildcard(require("react"));

var _components = require("./components");

var _reactBeautifulDnd = require("react-beautiful-dnd");

var _dataManager = _interopRequireDefault(require("./utils/data-manager"));

var _debounce = require("debounce");

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */
var tableCounter = 1;

var MaterialTable =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2["default"])(MaterialTable, _React$Component);

  function MaterialTable(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MaterialTable);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MaterialTable).call(this, _props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dataManager", new _dataManager["default"]());
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isRemoteData", function (props) {
      return !Array.isArray((props || _this.props).data);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onAllSelected", function (checked) {
      _this.dataManager.changeAllSelected(checked);

      _this.setState(_this.dataManager.getRenderState(), function () {
        return _this.onSelectionChange();
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChangeColumnHidden", function (columnId, hidden) {
      _this.dataManager.changeColumnHidden(columnId, hidden);

      _this.setState(_this.dataManager.getRenderState());

      if (_this.props.onChangeColumnHidden) {
        _this.props.onChangeColumnHidden(columnId, hidden, _this.state.columns.sort(function (a, b) {
          return a.tableData.columnOrder > b.tableData.columnOrder ? 1 : -1;
        }));
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChangeGroupOrder", function (groupedColumn) {
      _this.dataManager.changeGroupOrder(groupedColumn.tableData.id);

      _this.setState(_this.dataManager.getRenderState());
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChangeOrder", function (orderBy, orderDirection) {
      _this.dataManager.changeOrder(orderBy, orderDirection);

      if (_this.isRemoteData()) {
        var query = (0, _objectSpread2["default"])({}, _this.state.query);
        query.page = 0;
        query.orderBy = _this.state.columns.find(function (a) {
          return a.tableData.id === orderBy;
        });
        query.orderDirection = orderDirection;

        _this.onQueryChange(query, function () {
          _this.props.onOrderChange && _this.props.onOrderChange(orderBy, orderDirection);
        });
      } else {
        _this.setState(_this.dataManager.getRenderState(), function () {
          _this.props.onOrderChange && _this.props.onOrderChange(orderBy, orderDirection);
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChangePage", function (event, page) {
      if (_this.isRemoteData()) {
        var query = (0, _objectSpread2["default"])({}, _this.state.query);
        query.page = page;

        _this.onQueryChange(query, function () {
          _this.props.onChangePage && _this.props.onChangePage(page);
        });
      } else {
        _this.dataManager.changeCurrentPage(page);

        _this.setState(_this.dataManager.getRenderState(), function () {
          _this.props.onChangePage && _this.props.onChangePage(page);
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChangeRowsPerPage", function (event) {
      var pageSize = event.target.value;

      _this.dataManager.changePageSize(pageSize);

      if (_this.isRemoteData()) {
        var query = (0, _objectSpread2["default"])({}, _this.state.query);
        query.pageSize = event.target.value;
        query.page = 0;

        _this.onQueryChange(query, function () {
          _this.props.onChangeRowsPerPage && _this.props.onChangeRowsPerPage(pageSize);
        });
      } else {
        _this.dataManager.changeCurrentPage(0);

        _this.setState(_this.dataManager.getRenderState(), function () {
          _this.props.onChangeRowsPerPage && _this.props.onChangeRowsPerPage(pageSize);
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onDragEnd", function (result) {
      if (result && result.destination && result.destination.index < _this.props.options.fixedColumns && result.destination.droppableId === "headers") {
        return;
      }

      _this.dataManager.changeByDrag(result);

      _this.setState(_this.dataManager.getRenderState());

      if (result && result.destination && result.destination.droppableId === 'headers' && result.source && result.source.droppableId === result.destination.droppableId && _this.props.onChangeColumnOrder) {
        _this.props.onChangeColumnOrder(_this.state.columns.sort(function (a, b) {
          return a.tableData.columnOrder > b.tableData.columnOrder ? 1 : -1;
        }));
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onGroupExpandChanged", function (path) {
      _this.dataManager.changeGroupExpand(path);

      _this.setState(_this.dataManager.getRenderState());
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onGroupRemoved", function (groupedColumn, index) {
      var result = {
        combine: null,
        destination: {
          droppableId: "headers",
          index: 0
        },
        draggableId: groupedColumn.tableData.id,
        mode: "FLUID",
        reason: "DROP",
        source: {
          index: index,
          droppableId: "groups"
        },
        type: "DEFAULT"
      };

      _this.dataManager.changeByDrag(result);

      _this.setState(_this.dataManager.getRenderState());
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onEditingApproved", function (mode, newData, oldData) {
      if (mode === "add") {
        _this.setState({
          isLoading: true
        }, function () {
          _this.props.editable.onRowAdd(newData).then(function (result) {
            _this.setState({
              isLoading: false,
              showAddRow: false
            }, function () {
              if (_this.isRemoteData()) {
                _this.onQueryChange(_this.state.query);
              }
            });
          })["catch"](function (reason) {
            _this.setState({
              isLoading: false
            });
          });
        });
      } else if (mode === "update") {
        _this.setState({
          isLoading: true
        }, function () {
          _this.props.editable.onRowUpdate(newData, oldData).then(function (result) {
            _this.dataManager.changeRowEditing(oldData);

            _this.setState((0, _objectSpread2["default"])({
              isLoading: false
            }, _this.dataManager.getRenderState()), function () {
              if (_this.isRemoteData()) {
                _this.onQueryChange(_this.state.query);
              }
            });
          })["catch"](function (reason) {
            _this.setState({
              isLoading: false
            });
          });
        });
      } else if (mode === "delete") {
        _this.setState({
          isLoading: true
        }, function () {
          _this.props.editable.onRowDelete(oldData).then(function (result) {
            _this.dataManager.changeRowEditing(oldData);

            _this.setState((0, _objectSpread2["default"])({
              isLoading: false
            }, _this.dataManager.getRenderState()), function () {
              if (_this.isRemoteData()) {
                _this.onQueryChange(_this.state.query);
              }
            });
          })["catch"](function (reason) {
            _this.setState({
              isLoading: false
            });
          });
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onEditingCanceled", function (mode, rowData) {
      if (mode === "add") {
        _this.setState({
          showAddRow: false
        });
      } else if (mode === "update" || mode === "delete") {
        _this.dataManager.changeRowEditing(rowData);

        _this.setState(_this.dataManager.getRenderState());
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onQueryChange", function (query, callback) {
      query = (0, _objectSpread2["default"])({}, _this.state.query, query);

      _this.setState({
        isLoading: true
      }, function () {
        _this.props.data(query).then(function (result) {
          query.totalCount = result.totalCount;
          query.page = result.page;

          _this.dataManager.setData(result.data);

          _this.setState((0, _objectSpread2["default"])({
            isLoading: false
          }, _this.dataManager.getRenderState(), {
            query: query
          }), function () {
            callback && callback();
          });
        });
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onRowSelected", function (event, path, dataClicked) {
      _this.dataManager.changeRowSelected(event.target.checked, path);

      _this.setState(_this.dataManager.getRenderState(), function () {
        return _this.onSelectionChange(dataClicked);
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSelectionChange", function (dataClicked) {
      if (_this.props.onSelectionChange) {
        var selectedRows = [];

        var findSelecteds = function findSelecteds(list) {
          list.forEach(function (row) {
            if (row.tableData.checked) {
              selectedRows.push(row);
            }

            row.tableData.childRows && findSelecteds(row.tableData.childRows);
          });
        };

        findSelecteds(_this.state.originalData);

        _this.props.onSelectionChange(selectedRows, dataClicked);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSearchChange", function (searchText) {
      return _this.setState({
        searchText: searchText
      }, _this.onSearchChangeDebounce);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSearchChangeDebounce", (0, _debounce.debounce)(function () {
      _this.dataManager.changeSearchText(_this.state.searchText);

      if (_this.isRemoteData()) {
        var query = (0, _objectSpread2["default"])({}, _this.state.query);
        query.page = 0;
        query.search = _this.state.searchText;

        _this.onQueryChange(query);
      } else {
        _this.setState(_this.dataManager.getRenderState());
      }
    }, _this.props.options.debounceInterval));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onFilterChange", function (columnId, value) {
      _this.dataManager.changeFilterValue(columnId, value);

      _this.setState({}, _this.onFilterChangeDebounce);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onFilterChangeDebounce", (0, _debounce.debounce)(function () {
      if (_this.isRemoteData()) {
        var query = (0, _objectSpread2["default"])({}, _this.state.query);
        query.filters = _this.state.columns.filter(function (a) {
          return a.tableData.filterValue;
        }).map(function (a) {
          return {
            column: a,
            operator: "=",
            value: a.tableData.filterValue
          };
        });

        _this.onQueryChange(query);
      } else {
        _this.setState(_this.dataManager.getRenderState());
      }
    }, _this.props.options.debounceInterval));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onTreeExpandChanged", function (path, data) {
      _this.dataManager.changeTreeExpand(path);

      _this.setState(_this.dataManager.getRenderState(), function () {
        _this.props.onTreeExpandChange && _this.props.onTreeExpandChange(data, data.tableData.isTreeExpanded);
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onToggleDetailPanel", function (path, render) {
      _this.dataManager.changeDetailPanelVisibility(path, render);

      _this.setState(_this.dataManager.getRenderState());
    });
    _this.id = "m_table_".concat(tableCounter++);

    var calculatedProps = _this.getProps(_props);

    _this.setDataManagerFields(calculatedProps, true);

    var renderState = _this.dataManager.getRenderState();

    _this.state = (0, _objectSpread2["default"])({
      data: []
    }, renderState, {
      query: {
        filters: renderState.columns.filter(function (a) {
          return a.tableData.filterValue;
        }).map(function (a) {
          return {
            column: a,
            operator: "=",
            value: a.tableData.filterValue
          };
        }),
        orderBy: renderState.columns.find(function (a) {
          return a.tableData.id === renderState.orderBy;
        }),
        orderDirection: renderState.orderDirection,
        page: 0,
        pageSize: calculatedProps.options.pageSize,
        search: renderState.searchText,
        totalCount: 0
      },
      showAddRow: false
    });
    return _this;
  }

  (0, _createClass2["default"])(MaterialTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.setState(this.dataManager.getRenderState(), function () {
        if (_this2.isRemoteData()) {
          _this2.onQueryChange(_this2.state.query);
        }
      });
    }
  }, {
    key: "setDataManagerFields",
    value: function setDataManagerFields(props, isInit) {
      var defaultSortColumnIndex = -1;
      var defaultSortDirection = '';

      if (props) {
        defaultSortColumnIndex = props.columns.findIndex(function (a) {
          return a.defaultSort;
        });
        defaultSortDirection = defaultSortColumnIndex > -1 ? props.columns[defaultSortColumnIndex].defaultSort : '';
      }

      this.dataManager.setColumns(props.columns);
      this.dataManager.setDefaultExpanded(props.options.defaultExpanded);

      if (this.isRemoteData(props)) {
        this.dataManager.changeApplySearch(false);
        this.dataManager.changeApplyFilters(false);
      } else {
        this.dataManager.changeApplySearch(true);
        this.dataManager.changeApplyFilters(true);
        this.dataManager.setData(props.data);
      }

      isInit && this.dataManager.changeOrder(defaultSortColumnIndex, defaultSortDirection);
      isInit && this.dataManager.changeCurrentPage(props.options.initialPage ? props.options.initialPage : 0);
      isInit && this.dataManager.changePageSize(props.options.pageSize);
      isInit && this.dataManager.changePaging(props.options.paging);
      isInit && this.dataManager.changeParentFunc(props.parentChildData);
      this.dataManager.changeDetailPanelType(props.options.detailPanelType);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var props = this.getProps(nextProps);
      this.setDataManagerFields(props);
      this.setState(this.dataManager.getRenderState());
    }
  }, {
    key: "getProps",
    value: function getProps(props) {
      var _this3 = this;

      var calculatedProps = (0, _objectSpread2["default"])({}, props || this.props);
      var localization = calculatedProps.localization.body;
      calculatedProps.actions = (0, _toConsumableArray2["default"])(calculatedProps.actions || []);

      if (calculatedProps.editable) {
        if (calculatedProps.editable.onRowAdd) {
          calculatedProps.actions.push({
            icon: calculatedProps.icons.Add,
            tooltip: localization.addTooltip,
            isFreeAction: true,
            onClick: function onClick() {
              _this3.dataManager.changeRowEditing();

              _this3.setState((0, _objectSpread2["default"])({}, _this3.dataManager.getRenderState(), {
                showAddRow: !_this3.state.showAddRow
              }));
            }
          });
        }

        if (calculatedProps.editable.onRowUpdate) {
          calculatedProps.actions.push(function (rowData) {
            return {
              icon: calculatedProps.icons.Edit,
              tooltip: localization.editTooltip,
              disabled: calculatedProps.editable.isEditable && !calculatedProps.editable.isEditable(rowData),
              onClick: function onClick(e, rowData) {
                _this3.dataManager.changeRowEditing(rowData, "update");

                _this3.setState((0, _objectSpread2["default"])({}, _this3.dataManager.getRenderState(), {
                  showAddRow: false
                }));
              }
            };
          });
        }

        if (calculatedProps.editable.onRowDelete) {
          calculatedProps.actions.push(function (rowData) {
            return {
              icon: calculatedProps.icons.Delete,
              tooltip: localization.deleteTooltip,
              disabled: calculatedProps.editable.isDeletable && !calculatedProps.editable.isDeletable(rowData),
              onClick: function onClick(e, rowData) {
                _this3.dataManager.changeRowEditing(rowData, "delete");

                _this3.setState((0, _objectSpread2["default"])({}, _this3.dataManager.getRenderState(), {
                  showAddRow: false
                }));
              }
            };
          });
        }
      }

      calculatedProps.components = (0, _objectSpread2["default"])({}, MaterialTable.defaultProps.components, calculatedProps.components);
      calculatedProps.icons = (0, _objectSpread2["default"])({}, MaterialTable.defaultProps.icons, calculatedProps.icons);
      calculatedProps.options = (0, _objectSpread2["default"])({}, MaterialTable.defaultProps.options, calculatedProps.options);
      return calculatedProps;
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var props = this.getProps();

      if (props.options.paging) {
        var localization = (0, _objectSpread2["default"])({}, MaterialTable.defaultProps.localization.pagination, this.props.localization.pagination);
        return React.createElement(_core.Table, null, React.createElement(_core.TableFooter, {
          style: {
            display: 'grid'
          }
        }, React.createElement(_core.TableRow, null, React.createElement(props.components.Pagination, {
          classes: {
            root: props.classes.paginationRoot,
            toolbar: props.classes.paginationToolbar,
            caption: props.classes.paginationCaption,
            selectRoot: props.classes.paginationSelectRoot
          },
          style: {
            "float": props.theme.direction === "rtl" ? "" : "right",
            overflowX: 'auto',
            borderBottom: 'none'
          },
          colSpan: 3,
          count: this.isRemoteData() ? this.state.query.totalCount : this.state.data.length,
          icons: props.icons,
          rowsPerPage: this.state.pageSize,
          rowsPerPageOptions: props.options.pageSizeOptions,
          SelectProps: {
            renderValue: function renderValue(value) {
              return React.createElement("div", {
                style: {
                  padding: '0px 5px'
                }
              }, value + ' ' + localization.labelRowsSelect + ' ');
            }
          },
          page: this.isRemoteData() ? this.state.query.page : this.state.currentPage,
          onChangePage: this.onChangePage,
          onChangeRowsPerPage: this.onChangeRowsPerPage,
          ActionsComponent: function ActionsComponent(subProps) {
            return props.options.paginationType === 'normal' ? React.createElement(_components.MTablePagination, (0, _extends2["default"])({}, subProps, {
              icons: props.icons,
              localization: localization,
              showFirstLastPageButtons: props.options.showFirstLastPageButtons
            })) : React.createElement(_components.MTableSteppedPagination, (0, _extends2["default"])({}, subProps, {
              icons: props.icons,
              localization: localization
            }));
          },
          labelDisplayedRows: function labelDisplayedRows(row) {
            return localization.labelDisplayedRows.replace('{from}', row.from).replace('{to}', row.to).replace('{count}', row.count);
          },
          labelRowsPerPage: localization.labelRowsPerPage
        }))));
      }
    }
  }, {
    key: "renderTable",
    value: function renderTable() {
      var _this4 = this;

      var props = this.getProps();
      return React.createElement(_core.Table, {
        id: this.id
      }, props.options.header && React.createElement(props.components.Header, {
        localization: (0, _objectSpread2["default"])({}, MaterialTable.defaultProps.localization.header, this.props.localization.header),
        columns: this.state.columns,
        hasSelection: props.options.selection,
        headerStyle: props.options.headerStyle,
        selectedCount: this.state.selectedCount,
        dataCount: props.parentChildData ? this.state.treefiedDataLength : this.state.data.length,
        hasDetailPanel: !!props.detailPanel,
        detailPanelColumnAlignment: props.options.detailPanelColumnAlignment,
        showActionsColumn: props.actions && props.actions.filter(function (a) {
          return !a.isFreeAction && !_this4.props.options.selection;
        }).length > 0,
        showSelectAllCheckbox: props.options.showSelectAllCheckbox,
        orderBy: this.state.orderBy,
        orderDirection: this.state.orderDirection,
        onAllSelected: this.onAllSelected,
        onOrderChange: this.onChangeOrder,
        actionsHeaderIndex: props.options.actionsColumnIndex,
        sorting: props.options.sorting,
        grouping: props.options.grouping,
        filtering: props.options.filtering,
        filterType: props.options.filterType,
        isTreeData: this.props.parentChildData !== undefined,
        icons: this.props.icons,
        onFilterChanged: this.onFilterChange,
        components: props.components,
        fixedColumns: props.options.fixedColumns
      }), React.createElement(props.components.Body, {
        actions: props.actions,
        components: props.components,
        icons: props.icons,
        renderData: this.state.renderData,
        currentPage: this.state.currentPage,
        initialFormData: props.initialFormData,
        pageSize: this.state.pageSize,
        columns: this.state.columns,
        detailPanel: props.detailPanel,
        options: props.options,
        getFieldValue: this.dataManager.getFieldValue,
        isTreeData: this.props.parentChildData !== undefined,
        onFilterChanged: this.onFilterChange,
        onRowSelected: this.onRowSelected,
        onToggleDetailPanel: this.onToggleDetailPanel,
        onGroupExpandChanged: this.onGroupExpandChanged,
        onTreeExpandChanged: this.onTreeExpandChanged,
        onEditingCanceled: this.onEditingCanceled,
        onEditingApproved: this.onEditingApproved,
        localization: (0, _objectSpread2["default"])({}, MaterialTable.defaultProps.localization.body, this.props.localization.body),
        onRowClick: this.props.onRowClick,
        showAddRow: this.state.showAddRow,
        hasAnyEditingRow: !!(this.state.lastEditingRow || this.state.showAddRow),
        hasDetailPanel: !!props.detailPanel,
        treeDataMaxLevel: this.state.treeDataMaxLevel
      }), this.props.options.aggregation && !!this.dataManager.filteredData && !!this.dataManager.filteredData.length && React.createElement(_core.TableFooter, null, React.createElement(props.components.Totals, {
        components: props.components,
        icons: props.icons,
        renderData: this.dataManager.filteredData,
        options: props.options,
        getAggregation: this.dataManager.getAggregation,
        columns: props.columns,
        isTreeData: this.props.parentChildData !== undefined,
        detailPanel: props.detailPanel,
        actions: props.actions,
        hasAnyEditingRow: !!(this.state.lastEditingRow || this.state.showAddRow)
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var props = this.getProps();
      return React.createElement(_reactBeautifulDnd.DragDropContext, {
        onDragEnd: this.onDragEnd
      }, React.createElement(props.components.Container, {
        style: (0, _objectSpread2["default"])({
          position: 'relative'
        }, props.style)
      }, props.options.toolbar && React.createElement(props.components.Toolbar, {
        actions: props.actions,
        components: props.components,
        selectedRows: this.state.selectedCount > 0 ? this.state.originalData.filter(function (a) {
          return a.tableData.checked;
        }) : [],
        columns: this.state.columns,
        columnsButton: props.options.columnsButton,
        icons: props.icons,
        exportAllData: props.options.exportAllData,
        exportButton: props.options.exportButton,
        exportDelimiter: props.options.exportDelimiter,
        exportFileName: props.options.exportFileName,
        exportCsv: props.options.exportCsv,
        getFieldValue: this.dataManager.getFieldValue,
        data: this.state.data,
        renderData: this.state.renderData,
        search: props.options.search,
        showTitle: props.options.showTitle,
        showTextRowsSelected: props.options.showTextRowsSelected,
        toolbarButtonAlignment: props.options.toolbarButtonAlignment,
        searchFieldAlignment: props.options.searchFieldAlignment,
        searchText: this.state.searchText,
        searchFieldStyle: props.options.searchFieldStyle,
        title: props.title,
        onSearchChanged: this.onSearchChange,
        onColumnsChanged: this.onChangeColumnHidden,
        localization: (0, _objectSpread2["default"])({}, MaterialTable.defaultProps.localization.toolbar, this.props.localization.toolbar)
      }), props.options.grouping && React.createElement(props.components.Groupbar, {
        icons: props.icons,
        localization: (0, _objectSpread2["default"])({}, MaterialTable.defaultProps.localization.grouping, props.localization.grouping),
        groupColumns: this.state.columns.filter(function (col) {
          return col.tableData.groupOrder > -1;
        }).sort(function (col1, col2) {
          return col1.tableData.groupOrder - col2.tableData.groupOrder;
        }),
        onSortChanged: this.onChangeGroupOrder,
        onGroupRemoved: this.onGroupRemoved
      }), React.createElement(ScrollBar, {
        "double": props.options.doubleHorizontalScroll,
        tableId: this.id
      }, React.createElement(_reactBeautifulDnd.Droppable, {
        droppableId: "headers",
        direction: "horizontal"
      }, function (provided, snapshot) {
        return React.createElement("div", {
          ref: provided.innerRef
        }, React.createElement("div", {
          style: {
            maxHeight: props.options.maxBodyHeight,
            overflowY: 'auto'
          }
        }, _this5.renderTable()), provided.placeholder);
      })), (this.state.isLoading || props.isLoading) && props.options.loadingType === "linear" && React.createElement("div", {
        style: {
          position: 'relative',
          width: '100%'
        }
      }, React.createElement("div", {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%'
        }
      }, React.createElement(_core.LinearProgress, null))), this.renderFooter(), (this.state.isLoading || props.isLoading) && props.options.loadingType === 'overlay' && React.createElement("div", {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 11
        }
      }, React.createElement(props.components.OverlayLoading, {
        theme: props.theme
      }))), React.createElement("style", null, ".totals-row td.MuiTableCell-footer:before {\n      content: '';\n      position: absolute;\n      left: 0;\n      top: 0;\n      width: 100%;\n      border-bottom: 1px solid rgba(0,0,0,0.12);\n    }"));
    }
  }]);
  return MaterialTable;
}(React.Component);

exports["default"] = MaterialTable;

var ScrollBar = function ScrollBar(_ref) {
  var _double = _ref["double"],
      children = _ref.children,
      tableId = _ref.tableId;

  var _React$useState = React.useState(0),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      scrollX = _React$useState2[0],
      setScrollX = _React$useState2[1];

  var divRef = null;

  var setRef = function setRef(ref) {
    return divRef = ref && ref.children[0] && ref.children[0].children && ref.children[0].children[0];
  };

  if (_double) {
    return React.createElement(_reactDoubleScrollbar["default"], null, children);
  } else {
    return React.createElement("div", {
      ref: setRef,
      style: {
        overflowX: 'auto'
      },
      onScroll: function onScroll() {
        return divRef && setScrollX(divRef.scrollLeft);
      }
    }, children, React.createElement("style", null, "#".concat(tableId, " .cell-fixed { transform: translateX(").concat(scrollX, "px); }")));
  }
};