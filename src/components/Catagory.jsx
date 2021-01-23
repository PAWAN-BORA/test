import {useEffect, useState, useRef, createRef} from 'react';
import style from './style.module.css';
import {Link, useHistory} from "react-router-dom";
export default function Category({isNavbarOpen, categories, gotToProduct, imagePath}) {
    
    

    function Cart({category}) {
        let customClass = undefined;
        if(isNavbarOpen) {
            customClass = style.category_nav_open;
        } else {
            customClass = style.category_nav_close;
        }
        return(
            <div  to="/product" className={`${style.category_cart} ${customClass}`} onClick={()=>{gotToProduct(category.product)}} >
                <img src={imagePath.category+category.category_image} alt={category.category_name}/>
                <span>{category.category_name}</span>
            </div>
        );
    }
    return(
        <div className={style.main_catagory}>
            <div className={style.catatory_top}>Main Category</div>
            <div className={style.category_box}>
                {categories.map((category)=>{
                    return(
                        <div key={category.cat_id}>
                            <Cart  category={category}/>
                        </div>
                    );
                })}
            </div>
        </div>
    ); 
}