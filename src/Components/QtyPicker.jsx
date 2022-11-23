import { useState } from 'react';
import Button from 'react-bootstrap/Button';


const QtyPicker = (props) => {

    const [qty, setQty] = useState(0)

    const handleIncrease = ()=> {
        setQty(qty += 1)
    }

    const handleDecrease = ()=> {
        if (qty > 0) {
            setQty(qty -= 1)
        }
    }

    return (

        <div className="qty-picker">
            <Button>-</Button>
            <label htmlFor="">5</label>
            <Button>+</Button>
        </div>
    )
}

export default QtyPicker;