import { Grid, MuiThemeProvider, Button, Switch } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable from '../src';

let direction = 'ltr';
// direction = 'rtl';
const theme = createMuiTheme({
  direction: direction,
  palette: {
    type: 'light'
  }
});

const bigData = [];
for (let i = 0; i < 1; i++) {
  const d = {
    id: i + 1,
    name: 'Name' + i,
    surname: 'Surname' + Math.round(i / 10),
    isMarried: i % 2 ? true : false,
    birthDate: new Date(1987, 1, 1),
    birthCity: 0,
    sex: i % 2 ? 'Male' : 'Female',
    type: 'adult',
    insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
    time: new Date(1900, 1, 1, 14, 23, 35)
  };
  bigData.push(d);
}

class App extends Component {
  tableRef = React.createRef();

  colRenderCount = 0;

  state = {
    actionsAlign: 'right',
    filterType: 'header',
    text: 'text',
    selecteds: 0,
    data: [
      { id: 1, name: 'A1', surname: 'B', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 0, sex: 'Male', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), salary: 1000 },
      { id: 2, name: 'A2', surname: 'B', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: null, sex: 'Female', type: 'adult', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), salary: 2000, parentId: 1 },
      { id: 3, name: 'A3', surname: 'B', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), salary: 3000, parentId: 1 },
      { id: 4, name: 'A4', surname: 'C', isMarried: true, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), salary: 4000, parentId: 3 },
      { id: 5, name: 'A5', surname: 'C', isMarried: false, birthDate: new Date(1987, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), salary: 5000 },
      { id: 6, name: 'A6', surname: 'C', isMarried: true, birthDate: new Date(1989, 1, 1), birthCity: 34, sex: 'Female', type: 'child', insertDateTime: new Date(2018, 1, 1, 12, 23, 44), time: new Date(1900, 1, 1, 14, 23, 35), salary: 6000, parentId: 5 },
    ],
    columns: [
      {
        title: 'Adı', field: 'name', editComponent: props => {
          return (
            <input
              value={props.value}
              onChange={e => {
                var data = { ...props.rowData };
                data.name = e.target.value;
                data.surname = e.target.value.toLocaleUpperCase();
                props.onRowDataChange(data);
              }}
            />
          )
        }
      },
      {
        title: 'Soyadı', field: 'surname', editComponent: props => {
          this.inputBProps = props;
          return (
            <input
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
            />
          )
        }
      },
      { title: 'Evli', field: 'isMarried', type: 'boolean' },
      { title: 'Cinsiyet', field: 'sex', disableClick: true, editable: 'onAdd' },
      { title: 'Tipi', field: 'type', removable: false, editable: 'never' },
      { title: 'Doğum Yılı', field: 'birthDate', type: 'date', filtering: false },
      { title: 'Doğum Yeri', field: 'birthCity', lookup: { 34: 'İstanbul', 0: 'Şanlıurfa' } },
      { title: 'Kayıt Tarihi', field: 'insertDateTime', type: 'datetime' },
      { title: 'Zaman', field: 'time', type: 'time' },
      { title: 'Salary, $', field: 'salary', type: 'numeric' }
    ],
    remoteColumns: [
      { title: 'Avatar', field: 'avatar', render: rowData => <img style={{ height: 36, borderRadius: '50%' }} src={rowData.avatar} /> },
      { title: 'Id', field: 'id' },
      { title: 'First Name', field: 'first_name', defaultFilter: 'De' },
      { title: 'Last Name', field: 'last_name' },
    ]
  }

  render() {
    return (
      <>
        <MuiThemeProvider theme={theme}>
          <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Filter type: Header</Grid>
              <Grid item>
                <Switch
                  checked={this.state.filterType !== 'header'}
                  onChange={event => {
                    this.setState({ filterType: event.target.checked ? 'row' : 'header' });
                  }}
                />
              </Grid>
              <Grid item>Row</Grid>
            </Grid>
          <div style={{ maxWidth: '100%', direction }}>
            <Grid container>
              <Grid item xs={12}>
                <MaterialTable
                  tableRef={this.tableRef}
                  columns={this.state.columns}
                  data={this.state.data}
                  title="Demo Title"
                  options={{
                    columnsButton: true,
                    selection: true,
                    grouping: true,
                    filtering: true,
                    filterType: this.state.filterType,
                    fixedColumns: 3,
                    maxBodyHeight: '500px',
                  }}
                />
              </Grid>
            </Grid>
            {this.state.text}
            <button onClick={() => this.tableRef.current.onAllSelected(true)} style={{ margin: 10 }}>
              Select
            </button>
             <MaterialTable
              title="Remote Data Preview"
              columns={[
                {
                  title: 'Avatar',
                  field: 'avatar',
                  render: rowData => (
                    <img
                      style={{ height: 36, borderRadius: '50%' }}
                      src={rowData.avatar}
                    />
                  ),
                },
                { title: 'Id', field: 'id' },
                { title: 'First Name', field: 'first_name' },
                { title: 'Last Name', field: 'last_name' },
              ]}
              options={{
                grouping: true,
                filtering: true
              }}
              data={query => new Promise((resolve, reject) => {
                let url = 'https://reqres.in/api/users?'
                url += 'per_page=' + query.pageSize
                url += '&page=' + (query.page + 1)
                console.log(query);
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    resolve({
                      data: result.data,
                      page: result.page - 1,
                      totalCount: result.total,
                    })
                  })
              })}
            />
            <MaterialTable
              title="Basic Tree Data Preview"
              data={[
                {
                  id: 1,
                  name: 'a',
                  surname: 'Baran',
                  birthYear: 1987,
                  birthCity: 63,
                  sex: 'Male',
                  type: 'adult',
                },
                {
                  id: 2,
                  name: 'b',
                  surname: 'Baran',
                  birthYear: 1987,
                  birthCity: 34,
                  sex: 'Female',
                  type: 'adult',
                  parentId: 1,
                },
                {
                  id: 3,
                  name: 'c',
                  surname: 'Baran',
                  birthYear: 1987,
                  birthCity: 34,
                  sex: 'Female',
                  type: 'child',
                  parentId: 1,
                },
                {
                  id: 4,
                  name: 'd',
                  surname: 'Baran',
                  birthYear: 1987,
                  birthCity: 34,
                  sex: 'Female',
                  type: 'child',
                  parentId: 3,
                },
                {
                  id: 5,
                  name: 'e',
                  surname: 'Baran',
                  birthYear: 1987,
                  birthCity: 34,
                  sex: 'Female',
                  type: 'child',
                },
                {
                  id: 6,
                  name: 'f',
                  surname: 'Baran',
                  birthYear: 1987,
                  birthCity: 34,
                  sex: 'Female',
                  type: 'child',
                  parentId: 5,
                },
              ]}
              columns={[
                { title: 'Adı', field: 'name' },
                { title: 'Soyadı', field: 'surname' },
                { title: 'Cinsiyet', field: 'sex' },
                { title: 'Tipi', field: 'type', removable: false },
                { title: 'Doğum Yılı', field: 'birthYear', type: 'numeric' },
                {
                  title: 'Doğum Yeri',
                  field: 'birthCity',
                  lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                },
              ]}
              parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
              options={{
                selection: true,
                fixedColumns: 2
              }}
            />
            {/* <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Left</Grid>
              <Grid item>
                <Switch
                  checked={this.state.actionsAlign === 'right'}
                  onChange={event => {
                    this.setState({ actionsAlign: event.target.checked ? 'right' : 'left' });
                  }}
                  value="left"
                />
              </Grid>
              <Grid item>Right</Grid>
            </Grid> */}
            <MaterialTable
              title="Editable Preview"
              columns={this.state.columns}
              data={this.state.data}
              editable={{
                  onRowAdd: newData =>
                      new Promise((resolve, reject) => {
                          setTimeout(() => {
                              {
                                  /* const data = this.state.data;
                                  data.push(newData);
                                  this.setState({ data }, () => resolve()); */
                              }
                              resolve();
                          }, 1000);
                      }),
                  onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                          setTimeout(() => {
                              {
                                  /* const data = this.state.data;
                                  const index = data.indexOf(oldData);
                                  data[index] = newData;                
                                  this.setState({ data }, () => resolve()); */
                              }
                              resolve();
                          }, 1000);
                      }),
                  onRowDelete: oldData =>
                      new Promise((resolve, reject) => {
                          setTimeout(() => {
                              {
                                  /* let data = this.state.data;
                                  const index = data.indexOf(oldData);
                                  data.splice(index, 1);
                                  this.setState({ data }, () => resolve()); */
                              }
                              resolve();
                          }, 1000);
                      })
              }}
              options={{
                actionsAlign: this.state.actionsAlign,
                addRowPosition: this.state.actionsAlign === 'left' ? '' : 'last',
                fixedColumns: 1,
              }}
            />
          </div>
        </MuiThemeProvider>
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
