import { createTheme } from '@mui/material/styles';

/**
 * Design system TupiaManager.
 *
 * Tokens migrados do antigo tema Bootstrap (ver histórico em index.css):
 *  - accent roxo  #7c5cbf  -> primary
 *  - sidebar dark #2c2e33  -> sidebar.bg
 *  - topbar dark  #343a40  -> topbar.bg / text.primary
 *  - content bg   #f0f0f0  -> background.default
 *  - fonte Poppins
 *
 * Centraliza cor, tipografia e spacing para garantir identidade visual
 * deliberada e estados (hover/focus/disabled) padronizados.
 */

// Cores fora da paleta padrão do MUI, usadas pelo layout administrativo.
export const adminColors = {
  sidebarBg: '#2c2e33',
  topbarBg: '#343a40',
  sidebarWidth: 220,
  topbarHeight: 60,
} as const;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7c5cbf',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#343a40',
    },
    success: {
      main: '#2e7d32',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#f0f0f0',
      paper: '#ffffff',
    },
    text: {
      primary: '#343a40',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 2,
      },
    },
  },
});

export default theme;
