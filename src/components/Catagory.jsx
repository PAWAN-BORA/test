import {useEffect, useState} from 'react';

export default function Category() {
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
        fetch('https://stg.app2food.com/menu/')
        .then(response => response.json())
        .then((jsonData)=>{
            if(jsonData.msg==="success") {
                console.log(jsonData.data);
                setCategories(jsonData.data.categories);
            } else {
                console.log(jsonData);
            }
        })
        .catch((err)=>{console.log(err)});

    }, [])

    return(
        <div>
            {categories.map((category, index)=>{
                return(<div key={index}>
                    {category.category_name}
                </div>);
            })}
        </div>
    ); 
}