import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// Logo import - you'll need to add your logo to the assets folder
import logo from "../../assets/images/logo.png";

const StyledHeader = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	background-color: ${({ scrolled, theme }) =>
		scrolled ? theme.colors.light : "rgba(255, 255, 255, 0.9)"};
	box-shadow: ${({ scrolled, theme }) =>
		scrolled ? theme.shadows.medium : "none"};
	transition: all ${({ theme }) => theme.transitions.medium};
`;

const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
	max-width: 1200px;
	margin: 0 auto;
`;

const Logo = styled.div`
	img {
		height: 60px;
		transition: height ${({ theme }) => theme.transitions.medium};

		@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
			height: 50px;
		}
	}
`;

const Nav = styled.nav`
	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		position: fixed;
		top: 0;
		right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
		width: 70%;
		height: 100vh;
		background-color: ${({ theme }) => theme.colors.light};
		box-shadow: ${({ theme }) => theme.shadows.large};
		transition: right ${({ theme }) => theme.transitions.medium};
		padding: ${({ theme }) => theme.spacing.xl}
			${({ theme }) => theme.spacing.lg};
		display: flex;
		flex-direction: column;
		z-index: 1001;
	}
`;

const NavList = styled.ul`
	display: flex;
	gap: ${({ theme }) => theme.spacing.lg};

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		flex-direction: column;
		gap: ${({ theme }) => theme.spacing.md};
	}
`;

const NavItem = styled.li`
	position: relative;
`;

const StyledNavLink = styled(NavLink)`
	color: ${({ theme }) => theme.colors.secondary};
	font-weight: 600;
	padding: ${({ theme }) => theme.spacing.xs} 0;
	position: relative;

	&:after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background-color: ${({ theme }) => theme.colors.primary};
		transition: width ${({ theme }) => theme.transitions.medium};
	}

	&:hover:after,
	&.active:after {
		width: 100%;
	}

	&.active {
		color: ${({ theme }) => theme.colors.primary};
	}
`;

const MobileMenuButton = styled.button`
	display: none;
	font-size: 1.5rem;
	color: ${({ theme }) => theme.colors.secondary};
	z-index: 1002;

	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		display: block;
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
	visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
	transition: all ${({ theme }) => theme.transitions.medium};
	z-index: 1000;
`;

const Header = () => {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	// Handle scroll event to change header style
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (isOpen && !e.target.closest("nav") && !e.target.closest("button")) {
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [isOpen]);

	// Close mobile menu when window is resized to desktop size
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth > 768 && isOpen) {
				setIsOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [isOpen]);

	// Toggle mobile menu
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<StyledHeader scrolled={scrolled}>
			<HeaderContainer>
				<Logo>
					<Link to="/">
						<img src={logo} alt="Dynamic Auto Wraps Logo" />
					</Link>
				</Logo>

				<MobileMenuButton onClick={toggleMenu}>
					{isOpen ? <FaTimes /> : <FaBars />}
				</MobileMenuButton>

				<Nav isOpen={isOpen}>
					<NavList>
						<NavItem>
							<StyledNavLink to="/">{t("nav.home")}</StyledNavLink>
						</NavItem>
						<NavItem>
							<StyledNavLink to="/services">{t("nav.services")}</StyledNavLink>
						</NavItem>
						<NavItem>
							<StyledNavLink to="/about">{t("nav.about")}</StyledNavLink>
						</NavItem>
						<NavItem>
							<StyledNavLink to="/gallery">{t("nav.gallery")}</StyledNavLink>
						</NavItem>
						<NavItem>
							<StyledNavLink to="/contact">{t("nav.contact")}</StyledNavLink>
						</NavItem>
						<NavItem>
							<StyledNavLink to="/booking">{t("nav.booking")}</StyledNavLink>
						</NavItem>
					</NavList>
				</Nav>
			</HeaderContainer>
			<Overlay isOpen={isOpen} onClick={toggleMenu} />
		</StyledHeader>
	);
};

export default Header;
