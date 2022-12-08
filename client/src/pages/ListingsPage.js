import React, {useState, useEffect}  from "react"
import ProductCard from '../components/ProductCard';

export default function ListingsPage() {
  const [listings, setListings] = useState([])

  useEffect(() => {
    async function getListingData() {
      try{
        let response = await fetch(`/api/listing`);

        if(!response.ok) throw new Error("Unable to get listings");
        
        let fetchedListings = await response.json();

        setListings(fetchedListings);
      }catch(err) {
        console.log(err);
      }
    }
    getListingData();
  }, []);

  return(
    <React.Fragment>
      {listings.map((itemData) => {
        return <ProductCard 
          key = {itemData.id}
          imageURL = {itemData.image}
          name = {itemData.listing_name}
          price = {itemData.price}
          gender = {itemData.gender}
          size = {itemData.size}
        />
      })}
    </React.Fragment>
  )
}