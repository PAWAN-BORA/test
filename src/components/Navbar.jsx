import style from './style.module.css'

export default function Navbar() {


    return(
        <div className={style.navbar}>
            <div className={style.navbar_top}>
                <span>
                    <div>pickup at:Today 10:30 am</div>
                    <div>Phase 1, Sushant Lok Phase, Gurugram</div>
                </span>
                <span>
                    icon
                </span>
            </div>
        </div>
    );
}