import { TableCell, TableRow, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as React from 'react';

class MTableTotalsRow extends React.Component {
  renderColumns() {
    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map((columnDef, index) => {
        const cellClassName = index < this.props.options.fixedColumns ? 'cell-fixed' : '';
        const value = this.props.getAggregation(this.props.renderData, columnDef);

        return value === undefined
          ? <TableCell key={`cell-total-${columnDef.tableData.id}`} className={cellClassName}>{value}</TableCell>
          : <this.props.components.Cell
              icons={this.props.icons}
              isFixed={index < this.props.options.fixedColumns}
              isTotals
              columnDef={columnDef}
              value={value}
              key={'cell-total-' + columnDef.tableData.id}
              // rowData={undefined}
              sorting={!!this.props.options.sorting}
              headerFiltering={this.props.options.filtering && this.props.options.filterType === 'header'}
            />;
      });
    return mapArr;
  }

  rotateIconStyle = isOpen => ({
    transform: isOpen ? 'rotate(90deg)' : 'none'
  });

  render() {
    const cellClassName = this.props.options.fixedColumns ? 'cell-fixed' : '';
    const renderColumns = this.renderColumns();
    let columnId = 0;
    const emptyCell = () => <TableCell padding="none" key={`key-column-${++columnId}`} className={cellClassName} />;

    if (this.props.options.selection) {
      renderColumns.splice(0, 0, emptyCell());
    }
    if (this.props.actions && this.props.actions.filter(a => !a.isFreeAction && !this.props.options.selection).length > 0) {
      if (this.props.options.actionsColumnIndex === -1) {
        renderColumns.push(emptyCell());
      } else if (this.props.options.actionsColumnIndex >= 0) {
        let endPos = 0;
        if (this.props.options.selection) {
          endPos = 1;
        }
        renderColumns.splice(this.props.options.actionsColumnIndex + endPos, 0, emptyCell());
      }
    }
    if (this.props.isTreeData) {
      renderColumns.splice(0, 0, <TableCell padding="none" key={"key-tree-data-column"} className={cellClassName}/>);
    }

    this.props.columns
      .filter(columnDef => columnDef.tableData.groupOrder > -1)
      .forEach(columnDef => {
        renderColumns.splice(0, 0, <TableCell padding="none" key={"key-group-cell" + columnDef.tableData.id} className={cellClassName} />);
      });

    return <TableRow className='totals-row'>
      {renderColumns}
    </TableRow>;
  }
}

MTableTotalsRow.defaultProps = {
  renderData: {},
  options: {}
};

MTableTotalsRow.propTypes = {
  actions: PropTypes.array,
  components: PropTypes.object,
  icons: PropTypes.any.isRequired,
  isTreeData: PropTypes.bool.isRequired,
  detailPanel: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.func]))]),
  renderData: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  getAggregation: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired
};

export const styles = theme => ({
  '@global': {
    '.totals-row td.MuiTableCell-footer': {
      position: 'sticky',
      bottom: 1,
      backgroundColor: theme.palette.background.paper, // Change according to theme,
      color: theme.palette.grey['900'],
      fontWeight: 'bold',
      fontSize: '0.875rem'
    }
  }
});

export default withStyles(styles)(MTableTotalsRow);
