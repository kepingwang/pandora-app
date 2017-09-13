import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.table`
  margin: 30px auto;
  border-collapse: collapse;
`;
const HeaderRow = styled.tr`
`;
const DataRow = styled.tr`
`;
const HeaderCell = styled.th`
  border-bottom: 2px solid #333;
  padding: 10px 10px 10px 0;
  :first-child {
    padding-left: 4px;
  }
`;
const DataCell = styled.td`
  border-top: 1px solid #aaa;
  padding: 10px 10px 10px 0;
  :first-child {
    padding-left: 4px;
  }
`;

const Table = ({ headers, data }) => (
  <Wrapper>
    <thead>
      <HeaderRow>
        {headers.map((header, idx) => (
          <HeaderCell key={idx}>{header}</HeaderCell>
        ))}
      </HeaderRow>
    </thead>
    <tbody>
      {data.map((row, idx1) => (
        <DataRow key={idx1}>
          {row.map((value, idx2) => (
            <DataCell key={idx2}>{value}</DataCell>
          ))}
        </DataRow>
      ))}
    </tbody>
  </Wrapper>
);

export default Table;
