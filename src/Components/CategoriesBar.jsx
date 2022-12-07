import { useState } from "react";

import Button from 'react-bootstrap/Button';


const CategoriesBar = (props)=> {

    return (
        <div className="cat-bar bg-light">

            <Button className="btn btn-sm">Men's Clothing</Button>
            <Button className="btn btn-sm">Jewelery</Button>
            <Button className="btn btn-sm">Electronics</Button>
            <Button className="btn btn-sm">Women's Clothing</Button>

        </div>
    )
}

export default CategoriesBar;