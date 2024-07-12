import React, {useState, useEffect} from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LightTheme from '../themes/light';
import DarkTheme from '../themes/dark';
import Home from './pages/Home';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(p: any) => p.theme.bodyBackgroundColor};
    min-height: 100vh;
    margin: 0;
    color: ${(p: any) => p.theme.bodyFontColor};
    font-family: 'Kaushan Script'
  }
`;

function App() {
  const localTheme = localStorage.getItem('theme');
  const defaultTheme = JSON.stringify(LightTheme);
  let initialTheme = JSON.parse(localTheme || defaultTheme);

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
      localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeProvider theme={{...theme, setTheme: () => {
      setTheme((s: any) => s.id === 'light' ? DarkTheme : LightTheme);
    }}}>
      <GlobalStyle/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
