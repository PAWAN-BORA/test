import {useEffect, useState, useRef, createRef} from 'react';
import style from './style.module.css';

let customStyle = {
    width:"0px",
    height:"0px"
}
export default function Category() {
    const [data, setData] = useState({categories:[], imagePath:{}});
    const categoryBox = useRef();
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
    function setSize(totalWidth) {
        console.log("lsjdflskdf")
        if(totalWidth<768) {
            // width = totalWidth*25/100;
            // customStyle.width = width+"px";
            // customStyle.height = width+"px";
        } else {
            // width = totalWidth*25/100;
            // customStyle.width = width+"px";
            // customStyle.height = width+"px";
        }
        
    }
    function Cart({category}) {
        const cartBox = useRef();
        let customStyle = undefined;
        function setWidth() {
            let totalWidth = categoryBox.current.getBoundingClientRect().width;
            let width = undefined;
            if(totalWidth<768 && totalWidth>520) {
                width = totalWidth*32/100;
                
            } else {
                
                width = totalWidth*24/100;
            }
            cartBox.current.style.width = width+"px";
            cartBox.current.style.height = width+"px";
        }
        useEffect(()=>{
            setWidth();
            window.addEventListener("resize", setWidth)
        }, []) 
        return(
            <div ref={cartBox} className={style.category_cart}>
                <img src={data.imagePath.category+category.category_image} alt={category.category_name}/>
                <span>{category.category_name}</span>
            </div>
        );
    }
    return(
        <div className={style.main_catagory}>
            <div className={style.catatory_top}>Main Category</div>
            <div ref={categoryBox} className={style.category_box}>
                {data.categories.map((category, index)=>{
                    return(
                        <Cart key={index} category={category}/>
                    );
                })}
            </div>
        </div>
    ); 
}