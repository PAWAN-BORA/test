import React from 'react';
import style from './style.module.css';
import logo from '../logo.jpg';
import StorefrontIcon from '@material-ui/icons/Storefront';
import MenuIcon from '@material-ui/icons/Menu';
export default class Topbar extends React.Component{


    render() {
        return(
            <div className={style.topbar}>
                <div className={style.tobar_logo}>
                    <img src={logo}/>
                    <span style={{display:"inline-flex", justifyContent:"center", alignItems:"center"}}><StorefrontIcon/> <span>Phase 1, sushant lok</span></span>
                </div>
                <div className={style.menu_icon}>
                    <MenuIcon/>
                </div>
            </div>
        );
        
    }
}