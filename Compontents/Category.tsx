"use client"
import React, { useEffect, useState } from 'react'
import Header from '@/compontent2/Header'
import TableData from '@/compontent2/Table'
import { CategoryType } from '@/Type'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
const Category = () => {
        
  const[category,setCategory]= useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
 
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryKey =  "categorySearch" 
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

},[searchValue,router,queryKey])

 const fetchApi = async()=>{
    try{
         const response =await  axios.get("/api/category",{
          params:searchValue? {name:searchValue}:{}
         }); 
         setCategory(response.data)
         console.log(response)
    }
    catch(e){
        console.log(e)
    }

  }

  useEffect(()=>{
         fetchApi();
  },[searchValue])
   const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/category/${id}`);
      fetchApi();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>
      <Header onCreate={fetchApi} setSelectedBrand={setSelectedCategory} type="category" searchValue={searchValue} setSearchValue={setSearchValue} queryKey={queryKey}/>
      <TableData datas ={category} handleDelete={handleDelete} selectedEdit={selectedCategory} setSelectedEdit={setSelectedCategory} onCreate={fetchApi} type='category'/>
    </div>
  )
}

export default Category
