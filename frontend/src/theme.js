import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7C3AED',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#9333EA',
      contrastText: '#FFFFFF'
    },
    accent: {
      main: '#A855F7'
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280'
    },
    divider: '#E5E7EB',
    success: {
      main: '#10B981'
    },
    warning: {
      main: '#F59E0B'
    },
    error: {
      main: '#EF4444'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.025em' },
    h2: { fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em' },
    h3: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.025em' },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    h5: { fontSize: '1.05rem', fontWeight: 600 },
    h6: { fontSize: '0.875rem', fontWeight: 600 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 500 }
  },
  shape: {
    borderRadius: 8
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 6px rgba(0, 0, 0, 0.05)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.05), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    ...Array(21).fill('0px 4px 20px rgba(0, 0, 0, 0.03)')
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.04)',
          border: '1px solid #E2E8F0',
          backgroundImage: 'none'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          backgroundColor: '#F8FAFC',
          color: '#475569'
        }
      }
    }
  }
});

export default theme;
