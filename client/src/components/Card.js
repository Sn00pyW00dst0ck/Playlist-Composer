import styles from './Card.module.css';
import React, {useState} from 'react';

function Card(props) {
    const [flipped, setFlipped] = useState(false);
    const card = document.querySelector(".card_inner");

    let classname1 = `${styles.card__face} ${styles.card__face__front}`;
    let classname2 = `${styles.card__face} ${styles.card__face__back}`;
    return (
    <div className={styles.card} onClick={(event) => {
            setFlipped(!flipped);
        }}>
		<div className={
            [(flipped) && styles.is_flipped, styles.card__inner]
            .filter(e => !!e)
            .join(' ')
        }>
			<div className={classname1}>
				<h2>{props.name}</h2>
                <p></p>
			</div>
			<div className={classname2}>
				<div className={styles.card__content}>
					<div className={styles.card__header}>
						<img src={props.image} alt="" className={styles.pp} />
						<h2>{props.name}</h2>
					</div>
					<div className={styles.card__body}>
						<h3>{props.role}</h3>
						<p>{props.info}</p>
					</div>
                    <a onClick={(event) =>  {
                        event.stopPropagation();
                    }} href={props.url} target='_blank' className={styles.profileLink}><button >See more work by this developer</button></a>
				</div>
			</div>
		</div>
	</div>
    )
}

export default Card;