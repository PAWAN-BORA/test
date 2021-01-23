import style from './style.module.css'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useState } from 'react';
import { Description } from '@material-ui/icons';
export default function Products({products, addItemToCart}) {
    
    function ProductCart({product}) {
        const [descriptionType, setDescriptionType] = useState('short');
        let description
        if(descriptionType==="short") {
            description = product.product_desc.substring(0, 50);

        } else if(descriptionType==="long") {
            description = product.product_desc
        }
        return(
            <div className={style.product_cart}>
                <div className={style.product_name}>{product.store_product_name}</div>
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
                        <span className={style.product_add} onClick={()=>{addItemToCart(product)}}>Add</span>
                        <div></div>
                        <span>&#36;{product.product_price}</span>
                    </div>
                </div>
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