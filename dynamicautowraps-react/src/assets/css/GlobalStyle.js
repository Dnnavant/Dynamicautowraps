import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset and Base Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    scroll-padding-top: 80px; /* Account for fixed header */
  }

  body {
    font-family: ${(props) => props.theme.fonts.main};
    line-height: 1.6;
    color: ${(props) => props.theme.colors.secondary};
    background-color: ${(props) => props.theme.colors.light};
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Smooth scrolling for all scrollable elements */
  * {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.light};
  }

  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${(props) => props.theme.colors.accent};
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
    transition: color ${(props) => props.theme.transitions.medium};
    
    &:hover {
      color: ${(props) => props.theme.colors.accent};
    }
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: ${(props) => props.theme.spacing.md};
    line-height: 1.3;
    font-weight: 700;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  p {
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  section {
    padding: ${(props) => props.theme.spacing.xl} 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${(props) => props.theme.spacing.md};
  }

  .btn {
    display: inline-block;
    padding: ${(props) => props.theme.spacing.sm} ${(props) =>
	props.theme.spacing.lg};
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.light};
    border-radius: 4px;
    font-weight: 600;
    text-align: center;
    transition: all ${(props) => props.theme.transitions.medium};
    
    &:hover {
      background-color: ${(props) => props.theme.colors.accent};
      color: ${(props) => props.theme.colors.light};
      transform: translateY(-2px);
      box-shadow: ${(props) => props.theme.shadows.medium};
    }
    
    &.btn-secondary {
      background-color: ${(props) => props.theme.colors.secondary};
      
      &:hover {
        background-color: ${(props) => props.theme.colors.dark};
      }
    }
    
    &.btn-outline {
      background-color: transparent;
      border: 2px solid ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.primary};
      
      &:hover {
        background-color: ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.light};
      }
    }
  }

  /* Utility Classes */
  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-primary {
    color: ${(props) => props.theme.colors.primary};
  }

  .text-secondary {
    color: ${(props) => props.theme.colors.secondary};
  }

  .mb-1 {
    margin-bottom: ${(props) => props.theme.spacing.xs};
  }

  .mb-2 {
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }

  .mb-3 {
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  .mb-4 {
    margin-bottom: ${(props) => props.theme.spacing.lg};
  }

  .mb-5 {
    margin-bottom: ${(props) => props.theme.spacing.xl};
  }

  /* Accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  /* Responsive */
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.75rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
    
    h4 {
      font-size: 1.25rem;
    }
    
    section {
      padding: ${(props) => props.theme.spacing.lg} 0;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    h1 {
      font-size: 1.75rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    h3 {
      font-size: 1.25rem;
    }
    
    h4 {
      font-size: 1.1rem;
    }
  }
`;

export default GlobalStyle;
