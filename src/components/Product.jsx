import style from './style.module.css'
import { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
export default function Products({products, addItemToCart}) {
    
    const history = useHistory();
    useEffect(()=>{
        if(products.length===0) {
            history.push('/');
        }
    }, [])
    function ProductCart({product}) {
        const [addedToCart, setAddedToCart] = useState(false);
        const [descriptionType, setDescriptionType] = useState('short');
        let description
        if(descriptionType==="short") {
            description = product.product_desc.substring(0, 50);

        } else if(descriptionType==="long") {
            description = product.product_desc
        }
        function addToCart(product) {
            setAddedToCart(true);
            setTimeout(()=>{
                addItemToCart(product);
                // setAddedToCart(true);
            }, 500)
        }
        return(
            <div className={style.product_cart}>
                <div className={style.product_name} dangerouslySetInnerHTML={{__html:product.store_product_name}}></div>
                <div className={style.product_desc}>
                {descriptionType==="short"?
                <>
                {description}...<span className={style.show_more} onClick={()=>{setDescriptionType('long')}}>MORE</span>
                </>:
                <>
                {description}
                </>
                }
                </div>
                <div className={style.product_cart_bottom}>
                    <div>Customize</div>
                    <div className={style.product_price}>
                        <span className={style.product_add} onClick={()=>{addToCart(product)}}>Add</span>
                        <div></div>
                        <span>&#36;{product.product_price}</span>
                    </div>
                </div>
                {addedToCart && 
                    <div className={style.product_added_to_cart}>Added to cart</div>
                }
            </div>
        );
    }

    return(
        <div className={style.product_container}>
            {products.map((product)=>{
                return <ProductCart key={product.store_product_id} product={product}/>
            })}
        </div>
    );
}