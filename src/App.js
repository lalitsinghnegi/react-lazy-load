import React from 'react';
import { LazyImage } from './LazyImage';
import styled, { createGlobalStyle } from "styled-components";

import './App.css';
import _ from 'lodash';
const Global = createGlobalStyle`
  body {
    background-color: #141414;
    color: white;
    font-family: sans-serif;
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  row-gap: 1rem;
  column-gap: 1rem;
  padding: 1rem;
  justify-items: center;
`;

function App() {
  return (
    <main>
      <Global />
      <h1>Hello CodeSandbox</h1>
      <Grid>
        {_.range(1000).map(index => (
         <LazyImage
         key={index}
         src={`https://picsum.photos/100/100/?image=${index}`}
         alt="placeholder"
       />
        ))}
      </Grid>
    </main>
  );
}

export default App;
