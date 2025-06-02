"use client"
import React, { useEffect, useState } from 'react'
import Header from '@/compontent2/Header'
import TableData from '@/compontent2/Table'
import axios from 'axios'
import { BrandTyes } from '@/Type'
import { useRouter, useSearchParams } from 'next/navigation'
import UserInfo from '@/compontent2/UserInfo'
const BrandTable = () => {
 const[brand,setBrand]= useState<BrandTyes[]>([]);
 const[selectedBrand,setSelectedBrand]= useState<BrandTyes|null>(null);
 const searchParams = useSearchParams();
 const router = useRouter();
 const [openDialog, setOpenDialog] = useState(false);
 const queryKey =  "brandSearch" 
 const intialValue = searchParams.get(queryKey);
 const [searchValue,setSearchValue]= useState(intialValue||"");
useEffect(()=>{
    if (!router || !queryKey) return;
    const url  = new URLSearchParams(window.location.search);
    if(searchValue){
      url.set(queryKey,searchValue)
    }
    else{
      url.delete(queryKey)
    }
   router.push(`?${url.toString()}`);

},[searchValue,router,queryKey,])
useEffect(()=>{
 fetchApi();
},[searchValue])

const fetchApi = async () => {
  try {
    const response = await axios.get("/api/brands", {
      params: searchValue ? { name: searchValue } : {},
    });
    setBrand(response.data);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};


   const handleDelete = async (id: number) => {
    console.log(id);
    try {
      await axios.delete(`/api/brands/${id}`);
      fetchApi();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };


  return (
    <div>
   {/*     <UserInfo/>*/}
        <Header onCreate={fetchApi} setSelectedBrand={setSelectedBrand} type="brand" searchValue={searchValue} setSearchValue={setSearchValue}  queryKey={queryKey} />
        <TableData datas ={brand} handleDelete={handleDelete}
        selectedEdit ={selectedBrand} setSelectedEdit={setSelectedBrand} onCreate={fetchApi}
        type='brand'
        />
        
    </div>
   
  )
}

export default BrandTable

