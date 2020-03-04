import React, { useState } from 'react';

const defaultState = {
  mobileNavShow: false,
  toggleMobileNav: () => {},
};

const MenuContext = React.createContext(defaultState);

function MenuProvider(props) {
  const [mobileNavShow, setMobileNavShow] = useState(false);
  const { children } = props;

  function toggleMobileNav() {
    setMobileNavShow(!mobileNavShow);
  };

  return (
    <MenuContext.Provider
      value={{
        mobileNavShow,
        toggleMobileNav
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;

export { MenuProvider };
