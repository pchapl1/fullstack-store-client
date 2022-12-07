import { useState } from "react";
import Button from 'react-bootstrap/Button';


const SearchBar = (props) => {

    const { urlEndpoint } = props

    const [query, setQuery] = useState('')

    const getFilteredProduct = async () => {
        if (!query) {
            return 
        }
        console.log(query)
        const response = await fetch(`${urlEndpoint}/user/search-product/${query}`)

        const result = await response.json()

        console.log(result)
    }

    

    // const filteredProduct = getFilteredProduct(query)

    return (
        <div className="search-bar d-flex">
            <input className="form-control" placeholder="search product" onChange={e => setQuery(e.target.value)} type="text" name="" id="" />
            <Button onClick={getFilteredProduct}>search</Button>
        </div>
    )
}

export default SearchBar;