import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaGlobe, FaCheck, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const LanguageContainer = styled.div`
	position: fixed;
	top: 20px;
	left: 20px;
	z-index: 9999;
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
	position: relative;
	z-index: 10000;

	&:hover {
		background-color: ${({ theme }) => theme.colors.light};
	}

	svg {
		font-size: 1.2rem;
		pointer-events: auto;
	}
`;

const LanguageDropdown = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 4px;
	box-shadow: ${({ theme }) => theme.shadows.medium};
	min-width: 200px;
	margin-top: 8px;
	opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
	visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
	transform: ${({ isOpen }) =>
		isOpen ? "translateY(0)" : "translateY(-10px)"};
	transition: all 0.3s ease;
	z-index: 10000;
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

const ConfirmationDialog = styled.div`
	padding: 15px;
	background-color: ${({ theme }) => theme.colors.light};
	border-radius: 4px;
	box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const ConfirmationText = styled.p`
	margin-bottom: 15px;
	color: ${({ theme }) => theme.colors.text};
`;

const ConfirmationButtons = styled.div`
	display: flex;
	gap: 10px;
	justify-content: flex-end;
`;

const ConfirmButton = styled.button`
	padding: 8px 15px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 5px;
	background-color: ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.light};
	transition: all 0.3s ease;

	&:hover {
		background-color: ${({ theme }) => theme.colors.secondary};
	}
`;

const CancelButton = styled(ConfirmButton)`
	background-color: ${({ theme }) => theme.colors.lightGray};
	color: ${({ theme }) => theme.colors.text};

	&:hover {
		background-color: ${({ theme }) => theme.colors.gray};
	}
`;

const languages = [
	{ code: "en", name: "English (US)", flag: "🇺🇸" },
	{ code: "es", name: "Español", flag: "🇪🇸" },
	{ code: "de", name: "Deutsch", flag: "🇩🇪" },
	{ code: "fr", name: "Français", flag: "🇫🇷" },
];

const LanguageSelector = () => {
	const { i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [selectedLanguage, setSelectedLanguage] = useState(null);
	const dropdownRef = useRef(null);
	const currentLanguage =
		languages.find((lang) => lang.code === i18n.language) || languages[0];

	const handleLanguageSelect = (language) => {
		setSelectedLanguage(language);
		setShowConfirmation(true);
	};

	const handleConfirm = () => {
		if (selectedLanguage) {
			i18n.changeLanguage(selectedLanguage.code);
			setIsOpen(false);
			setShowConfirmation(false);
			// Force a page refresh to ensure all content is updated
			window.location.reload();
		}
	};

	const handleCancel = () => {
		setSelectedLanguage(null);
		setShowConfirmation(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
				setShowConfirmation(false);
				setSelectedLanguage(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<LanguageContainer ref={dropdownRef}>
			<LanguageButton
				onClick={() => setIsOpen(!isOpen)}
				aria-label="Select language"
			>
				<FaGlobe />
				{currentLanguage.flag} {currentLanguage.code.toUpperCase()}
			</LanguageButton>
			<LanguageDropdown isOpen={isOpen}>
				{showConfirmation ? (
					<ConfirmationDialog>
						<ConfirmationText>
							Change language to {selectedLanguage?.name}?
						</ConfirmationText>
						<ConfirmationButtons>
							<CancelButton onClick={handleCancel}>
								<FaTimes /> Cancel
							</CancelButton>
							<ConfirmButton onClick={handleConfirm}>
								<FaCheck /> Confirm
							</ConfirmButton>
						</ConfirmationButtons>
					</ConfirmationDialog>
				) : (
					languages.map((language) => (
						<LanguageOption
							key={language.code}
							onClick={() => handleLanguageSelect(language)}
						>
							{language.flag} {language.name}
						</LanguageOption>
					))
				)}
			</LanguageDropdown>
		</LanguageContainer>
	);
};

export default LanguageSelector;
