import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';
import { Select } from '../select/Select';
import { Text } from '../text/';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from '../../constants/articleProps';

type TArticleParamsFormProps = {	
	setPageState: React.Dispatch<
		React.SetStateAction<{
			fontFamilyOption: OptionType;
			fontSizeOption: OptionType;
			fontColor: OptionType;
			contentWidth: OptionType;
			backgroundColor: OptionType;
		}>
	>;
};

export const ArticleParamsForm = ({
	setPageState
}: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const asideRef = useRef<HTMLElement | null>(null);

	const [fontFamilyState, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontColorState, setFontColor] = useState(
		defaultArticleState.fontColor
	);
	const [bckgrndColorState, setbckgrndColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidthState, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [fontSizeState, setFontSize] = useState(
		defaultArticleState.fontSizeOption
	);

	const containerStyle = clsx({
		[styles.container]: true, // будет добавлен всегда
		[styles.container_open]: isOpen, // будет добавлен только когда open === true
	});

	function handleClickArrowButton() {
		setIsOpen((isOpen) => !isOpen);
	}

	useEffect(() => {
		if (!isOpen) return;

		function handleClickOutside(event: MouseEvent) {
			if (
				asideRef.current &&
				!asideRef.current?.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	function handleFontFamily(selected: OptionType) {
		setFontFamily(selected);
	}

	function handleFontColor(selected: OptionType) {
		setFontColor(selected);
	}

	function handleBckgrndColor(selected: OptionType) {
		setbckgrndColor(selected);
	}

	function handleContentWidth(selected: OptionType) {
		setContentWidth(selected);
	}

	function handleFontSize(selected: OptionType) {
		setFontSize(selected);
	}

	function handleResetButton() {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setbckgrndColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
		setPageState(defaultArticleState);
	}

	function handleSubmitButton(event: React.FormEvent) {
		event.preventDefault();
		setPageState({
			fontFamilyOption: fontFamilyState,
			fontSizeOption: fontSizeState,
			fontColor: fontColorState,
			contentWidth: contentWidthState,
			backgroundColor: bckgrndColorState,
		});
	}

	return (
		<main>
			<ArrowButton isOpen={isOpen} onClick={handleClickArrowButton} />
			<aside ref={asideRef} className={containerStyle}>
				<form className={styles.form} onSubmit={handleSubmitButton}>
					<Text as='h3' size={31} weight={800} uppercase={true}>
						задайте праметры
					</Text>
					<Select
						selected={fontFamilyState}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleFontFamily}></Select>
					<RadioGroup
						title='размер шрифта'
						selected={fontSizeState}
						options={fontSizeOptions}
						name='fontSizeState.value'
						onChange={handleFontSize}
					/>
					<Select
						selected={fontColorState}
						options={fontColors}
						title='цвет шрифта'
						onChange={handleFontColor}></Select>
					<Separator />
					<Select
						selected={bckgrndColorState}
						options={backgroundColors}
						title='цвет фона'
						onChange={handleBckgrndColor}></Select>
					<Select
						selected={contentWidthState}
						options={contentWidthArr}
						title='ширина контента'
						onChange={handleContentWidth}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetButton} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</main>
	);
};
