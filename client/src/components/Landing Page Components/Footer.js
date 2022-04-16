import Card from './Card'
import styles from './Footer.module.css';
import Gabe from "../../imgs/Gabe.png";
import Patrick from "../../imgs/Patrick.png"
import Andy from "../../imgs/Andy.png";

function Footer() {
    let info1 = `Developed the backend API for easy communication with
    Spotify, worked on the fetch/retrievel of 
    Spotify API information, and also
    directed and oversee frontend design choices`;
    let info2 = `Developed several crucial components in the backend, assisted
    in development of the data structures, chief frontend designer`;
    let info3 = `Helped with frontend design and initial server setup. Mainly
    responsible for creating the algorithm/data structure that supports
    the web app's main functionality`;
    let url1 = 'https://github.com/Sn00pyW00dst0ck';
    let url2 = 'https://github.com/Patrick-Lapid';
    let url3 = 'https://github.com/XianJianZhang';
    return (
        <div class={styles.container}>
            <Card 
                name="Gabriel Aldous" 
                role="Backend Developer and Spotify Interaction"
                image={Gabe}
                info={info1}
                url={url1}
            />
            <Card 
                name="Alan Patrick Lapid" 
                role="Backend Developer/Frontend Design" 
                image={Patrick}
                info={info2}
                url={url2}
                />
            <Card 
                name="Xian Jian Zhang (Andy)" 
                role="Frontend Design/Algorithms"
                image={Andy}
                info={info3}
                url={url3}
                />
        </div>
    )
}

export default Footer;