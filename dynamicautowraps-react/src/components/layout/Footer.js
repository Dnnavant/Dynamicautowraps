import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	FaFacebookF,
	FaInstagram,
	FaTwitter,
	FaYoutube,
	FaMapMarkerAlt,
	FaPhone,
	FaEnvelope,
} from "react-icons/fa";

// Logo import
import logo from "../../assets/images/logo.png";

const StyledFooter = styled.footer`
	background-color: ${({ theme }) => theme.colors.secondary};
	color: ${({ theme }) => theme.colors.light};
	padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const FooterContainer = styled.div`
	max-width: 1200px;
	margin: 0 auto;
	padding: 0 ${({ theme }) => theme.spacing.lg};
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: ${({ theme }) => theme.spacing.xl};

	@media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		grid-template-columns: 1fr;
	}
`;

const FooterColumn = styled.div`
	h3 {
		color: ${({ theme }) => theme.colors.primary};
		margin-bottom: ${({ theme }) => theme.spacing.md};
		font-size: 1.2rem;
		position: relative;

		&:after {
			content: "";
			position: absolute;
			bottom: -10px;
			left: 0;
			width: 50px;
			height: 2px;
			background-color: ${({ theme }) => theme.colors.primary};
		}
	}
`;

const FooterLogo = styled.div`
	margin-bottom: ${({ theme }) => theme.spacing.md};

	img {
		height: 60px;
		filter: brightness(0) invert(1);
	}
`;

const FooterText = styled.p`
	margin-bottom: ${({ theme }) => theme.spacing.md};
	font-size: 0.9rem;
	line-height: 1.6;
`;

const FooterLinks = styled.ul`
	list-style: none;
`;

const FooterLink = styled.li`
	margin-bottom: ${({ theme }) => theme.spacing.sm};

	a {
		color: ${({ theme }) => theme.colors.light};
		transition: color ${({ theme }) => theme.transitions.fast};
		display: block;
		font-size: 0.9rem;

		&:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`;

const ContactItem = styled.div`
	display: flex;
	align-items: flex-start;
	margin-bottom: ${({ theme }) => theme.spacing.sm};

	svg {
		margin-right: ${({ theme }) => theme.spacing.sm};
		color: ${({ theme }) => theme.colors.primary};
		margin-top: 4px;
	}

	p {
		margin: 0;
		font-size: 0.9rem;
	}
`;

const SocialLinks = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing.sm};
	margin-top: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, 0.1);
	color: ${({ theme }) => theme.colors.light};
	transition: all ${({ theme }) => theme.transitions.medium};

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary};
		transform: translateY(-3px);
	}
`;

const BottomBar = styled.div`
	max-width: 1200px;
	margin: ${({ theme }) => theme.spacing.lg} auto 0;
	padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
		flex-direction: column;
		gap: ${({ theme }) => theme.spacing.sm};
		text-align: center;
	}
`;

const Copyright = styled.p`
	font-size: 0.8rem;
	color: rgba(255, 255, 255, 0.7);
`;

const BottomLinks = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.spacing.md};

	a {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.7);

		&:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`;

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<StyledFooter>
			<FooterContainer>
				<FooterColumn>
					<FooterLogo>
						<Link to="/">
							<img src={logo} alt="Dynamic Auto Wraps" />
						</Link>
					</FooterLogo>
					<FooterText>
						Professional vehicle wrapping and automotive services. We transform
						vehicles with premium wraps, paint protection, and detailing
						services.
					</FooterText>
					<SocialLinks>
						<SocialLink
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaFacebookF />
						</SocialLink>
						<SocialLink
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaInstagram />
						</SocialLink>
						<SocialLink
							href="https://twitter.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaTwitter />
						</SocialLink>
						<SocialLink
							href="https://youtube.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<FaYoutube />
						</SocialLink>
					</SocialLinks>
				</FooterColumn>

				<FooterColumn>
					<h3>Quick Links</h3>
					<FooterLinks>
						<FooterLink>
							<Link to="/">Home</Link>
						</FooterLink>
						<FooterLink>
							<Link to="/services">Services</Link>
						</FooterLink>
						<FooterLink>
							<Link to="/about">About Us</Link>
						</FooterLink>
						<FooterLink>
							<Link to="/gallery">Gallery</Link>
						</FooterLink>
						<FooterLink>
							<Link to="/contact">Contact</Link>
						</FooterLink>
						<FooterLink>
							<Link to="/booking">Book Now</Link>
						</FooterLink>
					</FooterLinks>
				</FooterColumn>

				<FooterColumn>
					<h3>Our Services</h3>
					<FooterLinks>
						<FooterLink>
							<Link to="/services/wraps">Vehicle Wraps</Link>
						</FooterLink>
						<FooterLink>
							<Link to="/services/ppf">Paint Protection Film</Link>
						</FooterLink>
						<FooterLink>
							<Link to="/services/signage">Business Signage</Link>
						</FooterLink>
						<FooterLink>
							<Link to="/services/detailing">Auto Detailing</Link>
						</FooterLink>
						<FooterLink>
							<Link to="/services/commercial">Commercial Wraps</Link>
						</FooterLink>
						<FooterLink>
							<Link to="/services/custom">Custom Designs</Link>
						</FooterLink>
					</FooterLinks>
				</FooterColumn>

				<FooterColumn>
					<h3>Contact Us</h3>
					<ContactItem>
						<FaMapMarkerAlt />
						<p>123 Wrap Street, City, State 12345</p>
					</ContactItem>
					<ContactItem>
						<FaPhone />
						<p>(555) 123-4567</p>
					</ContactItem>
					<ContactItem>
						<FaEnvelope />
						<p>info@dynamicautowraps.com</p>
					</ContactItem>
					<FooterText>
						<strong>Hours:</strong>
						<br />
						Monday - Friday: 9am - 6pm
						<br />
						Saturday: 10am - 4pm
						<br />
						Sunday: Closed
					</FooterText>
				</FooterColumn>
			</FooterContainer>

			<BottomBar>
				<Copyright>
					&copy; {currentYear} Dynamic Auto Wraps. All Rights Reserved.
				</Copyright>
				<BottomLinks>
					<Link to="/privacy-policy">Privacy Policy</Link>
					<Link to="/terms-of-service">Terms of Service</Link>
				</BottomLinks>
			</BottomBar>
		</StyledFooter>
	);
};

export default Footer;
