import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

// export type TArrowButtonProps = {
// 	OnClick (): void
// }

type ТArrowButtonProps = {
	onClick: (e: React.MouseEvent) => void; // Типизация для пропа onClick
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: ТArrowButtonProps) => {
	const containerStyle = clsx({
		[styles.container]: true, // будет добавлен всегда
		[styles.container_open]: isOpen, // будет добавлен только когда open === true
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={containerStyle}
			onClick={onClick}>
			<img src={arrow} alt='иконка стрелочки' className={styles.arrow} />
		</div>
	);
};
