import {useState} from 'react';
import style from './style.module.css'
import EditIcon from '@material-ui/icons/Edit';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function Navbar({isNavbarOpen, cartData, changeItemCount, removeItemFromCart}) {

    function EmptyCart() {
    
        return (
            <div className={style.navbar_cart}>
                <div className={style.navbar_empty_cart}>
                    <div className={style.navbar_cart_icon}>
                    <ShoppingCartIcon />
                    </div>
                    <div className={style.navbar_text_view}>
                        Cart is Empty
                    </div>
                    <div className={style.navbar_empty_text}>
                        looks like you have not made your choice yet 
                    </div>
                </div>
            </div>
        );
    }

    function Cart({item}) {
        // const [itemNum, setItemNum] = useState(1);

        const handleChange = (event) => {
            // setItemNum(event.target.value);
            changeItemCount(item, event.target.value)
        };
        function viewItem(num) {
            let element = []
            for(let i=0; i<num; i++) {
                element.push(<MenuItem value={i+1}>{i+1}</MenuItem>);
            }
            return element;
        }
        return(
            <div className={style.cart_item}>
                <div>
                <Select
                    value={item.addedItem}
                    onChange={handleChange}
                    >
                    {item.addedItem<10?
                        viewItem(10):
                        viewItem(item.addedItem)
                    }
                   
                </Select>
                </div>
                <div className={style.cart_item_detail} >
                    <div>
                        <span dangerouslySetInnerHTML={{__html:item.store_product_name}}></span>
                        <span>&#36;{item.product_price*item.addedItem}</span>
                    </div>
                    <div style={{marginTop:"10px"}}>
                        <span className={style.navbar_remove} onClick={()=>{removeItemFromCart(item)}}>REMOVE</span>
                        <span className={style.navbar_edit}>EDIT</span>
                    </div>
                </div>
            </div>
        )
    }

    function Checkout({totalItems}) {
        let totalPrice = 0;

        for(let t of totalItems) {
            totalPrice += t.product_price*t.addedItem;
        }
        totalPrice = Math.round(totalPrice*100)/100;
        return(
            <div className={style.navbar_checkout}>
                <div>
                    CHECKOUT
                </div>
                <div className={style.navbar_totalPrice}>
                    <span style={{fontSize:"10px"}}>ORDER TOTAL</span> <span>&#36;{totalPrice}</span>
                </div>
            </div>
        );
    }
    let customClass = undefined;
    if(isNavbarOpen) {
        customClass = style.navbar_open;
    } else {
        customClass = style.navbar_close;
    } 

    return(
        <div className={`${style.navbar} ${customClass}`}>
            <div className={style.navbar_top}>
                <span className={style.navbar_address}>
                    <div>pickup at:Today 10:30 am</div>
                    <div className={style.navbar_location}>Phase 1, Sushant Lok Phase, Gurugram</div>
                </span>
                <span className={style.navbar_icon}>
                    <EditIcon/>
                </span>
            </div>
            
            {cartData.length===0?
                <EmptyCart/>:
                <div className={style.cart_items}>
                    {cartData.map((item)=>{
                        return <Cart key={item.store_product_id} item={item}/>
                    })}
                </div>
            }
            {cartData.length!==0 && 
                <Checkout totalItems={cartData} />
            }
        </div>
    );
}


