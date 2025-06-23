import styles from './Cards.module.css'

function Card(props){
    return(
    <div className={styles.card}>
        <img src={props.image_name} alt={props.title} className={styles.cardLogo} />
        <h3>{props.title}</h3>
        <p>{props.card_detail}</p>
    </div>
    )
};
export default Card;