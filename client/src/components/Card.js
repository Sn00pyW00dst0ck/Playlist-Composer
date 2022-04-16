import styles from './Card.module.css';
import React, {useState} from 'react';

function Card(props) {
    const [flipped, setFlipped] = useState(false);
    const card = document.querySelector(".card_inner");

    let classname1 = `${styles.card__face} ${styles.card__face__front}`;
    let classname2 = `${styles.card__face} ${styles.card__face__back}`;
    return (
        <div class={styles.card} onClick={() => {
            setFlipped(!flipped);
        }}>
		<div class={
            [flipped && styles.is_flipped, styles.card__inner]
            .filter(e => !!e)
            .join(' ')
        }>
			<div class={classname1}>
				<h2>{props.name}</h2>
                <p></p>
			</div>
			<div class={classname2}>
				<div class={styles.card__content}>
					<div class={styles.card__header}>
						<img src={props.image} alt="" class={styles.pp} />
						<h2>{props.name}</h2>
					</div>
					<div class={styles.card__body}>
						<h3>{props.role}</h3>
						<p>{props.info}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
    )
}

export default Card;