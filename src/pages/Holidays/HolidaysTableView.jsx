import React, {useMemo} from 'react';
import {useTable, useSortBy} from 'react-table';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

const Styles = styled.div`
  padding: 0rem;
  .table-striped>tbody>tr:nth-child(even)>td, 
  .table-striped>tbody>tr:nth-child(even)>th {
     background-color: rgba(39, 156, 250, 0.5); // Choose your own color here
   }
  table {
    margin-top: 100px;
    font-size: 12px;
    border-spacing: 0rem;
    border: 0px solid black;
    thead {
      background-color: #22ad809e; // Choose your own color here
      color: #FFFFFF;
    }
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 0px solid black;
      border-right: 0px solid black;
      :first-child {
        width: 60px;
      }
      :last-child {
        border-right: 0;
      }
    }
  }
`;

function HolidayTable({columns, data}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
      columns,
      data,
    },
    useSortBy,
  );
  // Render the UI for your table
  return (
    <Table
      size="sm"
      responsive
      hover
      {...getTableProps()}
    >
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th style={{ width: column.width }} {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render('Header')} {column.isSorted ? (column.isSortedDesc? ' 🔽': ' 🔼') : '🔼🔽'}
            </th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map(
        (row, i) => {
          prepareRow(row);
          return (
            <tr
              onClick={()=>{
                const url = row.original.detailsURL;
                Browser.open({ url: url }).then();
              }}
              {...row.getRowProps()}
            >
              {row.cells.map(cell => {
                return <td style={{ width: cell.column.width }} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        },
      )}
      </tbody>
    </Table>
  );
}

function HolidaysTableView({countryData}) {
  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'day',
        sortType: 'basic',
      },
      {
        Header: 'Day',
        accessor: 'weekDay',
        sortType: 'basic',
        width: '5%',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Details',
        accessor: 'detailsURL ',
        show: false,
      },
    ],
    [],
  );
  return (
    <Styles>
      <HolidayTable columns={columns} data={countryData.days}/>
    </Styles>
  );
}

export default HolidaysTableView;
