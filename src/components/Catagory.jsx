import {useEffect, useState, useRef, createRef} from 'react';
import style from './style.module.css';
export default function Category() {
    const [data, setData] = useState({categories:[], imagePath:{}});
    useEffect(()=>{
        fetch('https://stg.app2food.com/menu/')
        .then(response => response.json())
        .then((jsonData)=>{
            if(jsonData.msg==="success") {
                console.log(jsonData.data.imagePath);
                setData(jsonData.data);

            } else {
                console.log(jsonData);
            }
        })
        .catch((err)=>{console.log(err)});

    }, [])

    function Cart({category}) {
        return(
            <div className={style.category_cart}>
                <img src={data.imagePath.category+category.category_image} alt={category.category_name}/>
                <span>{category.category_name}</span>
            </div>
        );
    }
    return(
        <div className={style.main_catagory}>
            <div className={style.catatory_top}>Main Category</div>
            <div className={style.category_box}>
                {data.categories.map((category, index)=>{
                    return(
                        <Cart key={index} category={category}/>
                    );
                })}
            </div>
        </div>
    ); 
}