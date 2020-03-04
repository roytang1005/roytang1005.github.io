import React, { useState } from 'react';

const defaultState = {
  dark: false,
  notFound: false,
  toggleDark: () => {},
};

const ThemeContext = React.createContext(defaultState);

function ThemeProvider(props) {
  const [dark, setDark] = useState(false);
  const [notFound] = useState(false);
  const { children } = props;

  function toggleDark() {
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        notFound,
        toggleDark
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export { ThemeProvider }
