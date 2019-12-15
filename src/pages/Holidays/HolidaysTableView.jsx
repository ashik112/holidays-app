import React, {useMemo} from 'react';
import {useTable, useSortBy} from 'react-table';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import { Plugins } from '@capacitor/core';
import {IonIcon, IonBadge} from "@ionic/react";
import arrowDown from 'ionicons/icons/imports/arrow-dropdown';
import arrowUp from 'ionicons/icons/imports/arrow-dropup';
import goToIcon from 'ionicons/icons/imports/information-circle-outline';
import {compareWithToday, getDayMonth, isEqualDay} from "../../services/dateService";

const { Browser } = Plugins;

const Styles = styled.div`
  padding: 0rem;
  .table-striped>tbody>tr:nth-child(even)>td, 
  .table-striped>tbody>tr:nth-child(even)>th {
     background-color: rgba(39, 156, 250, 0.5); // Choose your own color here
   }
  table {
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
              {
                  column.render('Header')} {
                  column.isSorted ?
                      (column.isSortedDesc?
                          <IonIcon icon={arrowUp} /> : <IonIcon icon={arrowDown} />
                      ) :
                      <>
                          <IonIcon icon={arrowUp} /> <IonIcon icon={arrowDown} />
                      </>
              }
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
  // const [upcoming, setUpcoming] = useState(null);
  let upcoming = null;
  if(countryData && countryData.days) {
    for(let i = 0; i < countryData.days.length ; i++) {
      const item = countryData.days[i];
      if(item) {
        if(compareWithToday(item.day) > 0) {
          upcoming = item.day;
          break;
        }
      }
    }
  }
  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'day',
        sortType: 'basic',
        Cell: (data) => {
          return (
              <span>{getDayMonth(data.row.original.day)}</span>
          );
        },
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
        Cell: (data) => {
          return (
            <span>
              <span>{data.row.original.name}</span>&nbsp;&nbsp;
              {isEqualDay(data.row.original.day, upcoming) && <IonBadge color="tertiary">Upcoming</IonBadge>}&nbsp;&nbsp;
              {compareWithToday(data.row.original.day) === 0 && <IonBadge color="success">Today!</IonBadge>}
            </span>
          );
        },
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: data => {
          return <span><span>{data.row.original.type}</span><IonIcon color="primary" style={{float: 'right'}} icon={goToIcon}/></span>;
        },
      },
      {
        Header: 'Details',
        accessor: 'detailsURL ',
        show: false,
      },
    ],
    [upcoming],
  );
  return (
    <Styles>
      <HolidayTable columns={columns} data={countryData.days}/>
    </Styles>
  );
}

export default HolidaysTableView;
