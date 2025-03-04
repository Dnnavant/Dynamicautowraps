import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import {
	FaCalendarAlt,
	FaCar,
	FaTools,
	FaInfoCircle,
	FaCheck,
	FaUser,
	FaEnvelope,
	FaPhone,
	FaClock,
} from "react-icons/fa";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import BookingPage from "./pages/BookingPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

// Styles
import GlobalStyle from "./assets/css/GlobalStyle";

// Theme
const theme = {
	colors: {
		primary: "#f1660a",
		secondary: "#333",
		accent: "#0a84f1",
		light: "#ffffff",
		dark: "#222222",
		gray: "#f5f5f5",
		lightGray: "#e0e0e0",
		error: "#d32f2f",
		success: "#388e3c",
	},
	fonts: {
		main: '"Arial", sans-serif',
	},
	breakpoints: {
		mobile: "576px",
		tablet: "768px",
		desktop: "992px",
		large: "1200px",
	},
	spacing: {
		xs: "0.25rem",
		sm: "0.5rem",
		md: "1rem",
		lg: "2rem",
		xl: "3rem",
	},
	transitions: {
		fast: "0.2s ease",
		medium: "0.3s ease",
		slow: "0.5s ease",
	},
	shadows: {
		small: "0 1px 3px rgba(0, 0, 0, 0.1)",
		medium: "0 2px 5px rgba(0, 0, 0, 0.1)",
		large: "0 4px 10px rgba(0, 0, 0, 0.1)",
	},
};

function App() {
	return (
		<HelmetProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Router>
					<Header />
					<main>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/services" element={<ServicesPage />} />
							<Route path="/services/:serviceType" element={<ServicesPage />} />
							<Route path="/booking" element={<BookingPage />} />
							<Route path="/about" element={<AboutPage />} />
							<Route path="/gallery" element={<GalleryPage />} />
							<Route path="/contact" element={<ContactPage />} />
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</main>
					<Footer />
				</Router>
			</ThemeProvider>
		</HelmetProvider>
	);
}

export default App;
