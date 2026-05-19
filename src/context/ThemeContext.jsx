import { createContext, useContext } from 'react';

const themeValue = {
  brandName: 'Atlas Tours',
  supportPhone: '+92 300 1234567',
  supportEmail: 'info@atlastours.pk',
  footerLinks: 'Home  |  Tours  |  Contact  |  Cart',
};

const ThemeContext = createContext(themeValue);

export function ThemeProvider({ children }) {
  return <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
