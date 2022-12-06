import {
  Stack,
  Heading,
  Text,
  Button,
  Image,
  Divider,
  ButtonGroup
} from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import React from "react"
import ProductCard from '../components/ProductCard';
import {useState, useEffect} from "react";

export default function ListingsPage() {
  const [listings, setListings] = useState([])
  useEffect(() => {

    

    async function getListingData() {
      try{
        let response = await fetch(`/api/listing`);

        if(!response.ok) throw new Error("Unable to get listings");
        
        let fetchedListings = await response.json();

        setListings(fetchedListings.listingDataArray);
      }catch(err) {
        console.log(err);
      }
    }
    getListingData();
  }, []); 
  
  console.log(listings);

  return(
    <React.Fragment>
      <ProductCard/>
    </React.Fragment>
  )
}

