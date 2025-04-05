import React, { useState } from "react";
import styled from "styled-components";
import { FaGlobe } from "react-icons/fa";

const LanguageContainer = styled.div`
	position: fixed;
	top: 20px;
	left: 20px;
	z-index: 1000;
`;

const LanguageButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 8px;
	color: ${({ theme }) => theme.colors.text};
	font-size: 1rem;
	padding: 8px 12px;
	border-radius: 4px;
	transition: all 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.colors.light};
	}

	svg {
		font-size: 1.2rem;
	}
`;

const LanguageDropdown = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 4px;
	box-shadow: ${({ theme }) => theme.shadows.medium};
	min-width: 150px;
	margin-top: 8px;
	display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const LanguageOption = styled.button`
	width: 100%;
	padding: 10px 15px;
	text-align: left;
	border: none;
	background: none;
	cursor: pointer;
	color: ${({ theme }) => theme.colors.text};
	display: flex;
	align-items: center;
	gap: 8px;
	transition: all 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary};
		color: ${({ theme }) => theme.colors.light};
	}
`;

const languages = [
	{ code: "en", name: "English (US)", flag: "🇺🇸" },
	{ code: "es", name: "Español", flag: "🇪🇸" },
	{ code: "de", name: "Deutsch", flag: "🇩🇪" },
	{ code: "fr", name: "Français", flag: "🇫🇷" },
];

const LanguageSelector = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

	const handleLanguageChange = (language) => {
		setCurrentLanguage(language);
		setIsOpen(false);
		// Here you would implement the actual language change logic
		// For example, using i18n or a similar library
	};

	return (
		<LanguageContainer>
			<LanguageButton onClick={() => setIsOpen(!isOpen)}>
				<FaGlobe />
				{currentLanguage.flag} {currentLanguage.code.toUpperCase()}
			</LanguageButton>
			<LanguageDropdown isOpen={isOpen}>
				{languages.map((language) => (
					<LanguageOption
						key={language.code}
						onClick={() => handleLanguageChange(language)}
					>
						{language.flag} {language.name}
					</LanguageOption>
				))}
			</LanguageDropdown>
		</LanguageContainer>
	);
};

export default LanguageSelector;
