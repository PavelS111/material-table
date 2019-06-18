/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  TableHead, TableRow, TableCell,
  TableSortLabel, Checkbox, withStyles
} from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
/* eslint-enable no-unused-vars */
export class MTableHeader extends React.Component {

  renderHeader() {
    const mapArr = this.props.columns.filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
      .map((columnDef, index) => {
        let content = (
          <Draggable
            key={columnDef.tableData.id}
            isDragDisabled={index < this.props.fixedColumns}
            draggableId={columnDef.tableData.id.toString()}
            index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              // style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
              >
                {columnDef.title}
              </div>
            )}
          </Draggable>
        );

        // if (this.props.grouping && columnDef.grouping !== false && columnDef.field) {
        //   content = (
        //     <Draggable
        //       key={columnDef.tableData.id}
        //       draggableId={columnDef.tableData.id.toString()}
        //       index={index}>
        //       {(provided, snapshot) => (
        //         <div
        //           ref={provided.innerRef}
        //           {...provided.draggableProps}
        //           {...provided.dragHandleProps}
        //         // style={this.getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        //         >
        //           {columnDef.title}
        //         </div>
        //       )}
        //     </Draggable>
        //   );
        // }

        if (columnDef.sorting !== false && this.props.sorting) {
          content = (
            <TableSortLabel
              active={this.props.orderBy === columnDef.tableData.id}
              direction={this.props.orderDirection || 'asc'}
              onClick={() => {
                const orderDirection = columnDef.tableData.id !== this.props.orderBy ? 'asc' : this.props.orderDirection === 'asc' ? 'desc' : 'asc';
                this.props.onOrderChange(columnDef.tableData.id, orderDirection);
              }}
            >
              {content}
            </TableSortLabel>
          );
        }

        if (this.props.filtering && this.props.filterType === 'header') {
          content = (
            <>
              {content}
              <this.props.components.FilterButton
                icons={this.props.icons}
                columnDef={columnDef}
                onFilterChanged={this.props.onFilterChanged}
              />
            </>
          );
        }

        const cellClassName = this.props.classes.header + (index < this.props.fixedColumns ? ' cell-fixed' : '');

        return (
          <TableCell
            key={columnDef.tableData.id}
            align={['numeric'].indexOf(columnDef.type) !== -1 ? "right" : "left"}
            className={cellClassName}
            style={{ ...this.props.headerStyle, ...columnDef.headerStyle, whiteSpace: 'nowrap' }}
          >
            {content}
          </TableCell>
        );
      });
    return mapArr;
  }

  renderActionsHeader() {
    const localization = { ...MTableHeader.defaultProps.localization, ...this.props.localization };
    const cellClassName = this.props.classes.header
      + (this.props.actionsHeaderIndex !== -1 && this.props.actionsHeaderIndex < this.props.fixedColumns ? ' cell-fixed' : '');

    return (
      <TableCell
        key="key-actions-column"
        padding="checkbox"
        className={cellClassName}
        style={{ ...this.props.headerStyle, textAlign: 'center' }}
      >
        <TableSortLabel disabled>{localization.actions}</TableSortLabel>
      </TableCell>
    );
  }
  renderSelectionHeader() {
    const cellClassName = this.props.classes.header + (this.props.fixedColumns ? ' cell-fixed' : '');

    return (
      <TableCell
        padding="none"
        key="key-selection-column"
        className={cellClassName}
        style={{ ...this.props.headerStyle }}
      >
        {this.props.showSelectAllCheckbox &&
          <Checkbox
            indeterminate={this.props.selectedCount > 0 && this.props.selectedCount < this.props.dataCount}
            checked={this.props.dataCount > 0 && this.props.selectedCount === this.props.dataCount}
            onChange={(event, checked) => this.props.onAllSelected && this.props.onAllSelected(checked)}
          />
        }
      </TableCell>
    );
  }

  renderDetailPanelColumnCell() {
    const cellClassName = this.props.classes.header
      + (this.props.detailPanelColumnAlignment === 'left' ? ' cell-fixed' : '');

    return <TableCell
            padding="none"
            key="key-detail-panel-column"
            className={cellClassName}
            style={{ ...this.props.headerStyle }}
          />;
  }

  render() {
    const cellClassName = this.props.classes.header + (this.props.fixedColumns ? ' cell-fixed' : '');
    const headers = this.renderHeader();
    if (this.props.hasSelection) {
      headers.splice(0, 0, this.renderSelectionHeader());
    }

    if (this.props.showActionsColumn) {
      if (this.props.actionsHeaderIndex >= 0) {
        let endPos = 0;
        if (this.props.hasSelection) {
          endPos = 1;
        }
        headers.splice(this.props.actionsHeaderIndex + endPos, 0, this.renderActionsHeader());
      } else if (this.props.actionsHeaderIndex === -1) {
        headers.push(this.renderActionsHeader());
      }
    }

    if (this.props.hasDetailPanel) {
      if (this.props.detailPanelColumnAlignment === 'right') {
        headers.push(this.renderDetailPanelColumnCell());
      } else {
        headers.splice(0, 0, this.renderDetailPanelColumnCell());
      }
    }

    if (this.props.isTreeData > 0) {
      headers.splice(0, 0,
        <TableCell
          padding="none"
          key={"key-tree-data-header"}
          className={cellClassName}
          style={{ ...this.props.headerStyle }}
        />
      );
    }

    this.props.columns
      .filter(columnDef => columnDef.tableData.groupOrder > -1)
      .forEach(columnDef => {
        headers.splice(0, 0, <TableCell padding="checkbox" key={"key-group-header" + columnDef.tableData.id} className={cellClassName} />);
      });

    return (
      <TableHead>
        <TableRow>
          {headers}
        </TableRow>
      </TableHead>
    );
  }
}

MTableHeader.defaultProps = {
  dataCount: 0,
  hasSelection: false,
  headerStyle: {},
  selectedCount: 0,
  sorting: true,
  localization: {
    actions: 'Actions'
  },
  orderBy: undefined,
  orderDirection: 'asc',
  actionsHeaderIndex: 0,
  detailPanelColumnAlignment: "left"
};

MTableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  dataCount: PropTypes.number,
  hasDetailPanel: PropTypes.bool.isRequired,
  detailPanelColumnAlignment: PropTypes.string,
  hasSelection: PropTypes.bool,
  headerStyle: PropTypes.object,
  localization: PropTypes.object,
  selectedCount: PropTypes.number,
  sorting: PropTypes.bool,
  onAllSelected: PropTypes.func,
  onOrderChange: PropTypes.func,
  orderBy: PropTypes.number,
  orderDirection: PropTypes.string,
  actionsHeaderIndex: PropTypes.number,
  showActionsColumn: PropTypes.bool,
  showSelectAllCheckbox: PropTypes.bool,
  fixedColumns: PropTypes.number
};


export const styles = theme => ({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: theme.palette.background.paper, // Change according to theme,
  }
});

export default withStyles(styles)(MTableHeader);