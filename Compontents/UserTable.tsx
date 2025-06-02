"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Pencil, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { inputTypes } from '@/Type'; 
import OrderTable from './OrderTable';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import Header from './Header';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname } from 'next/navigation';
import ProductTable from './ProductTable';

const UserTable = () => {
  const [userData, setUserData] = useState<inputTypes[]>([]);
  const [error, setError] = useState("");
  const [selectUser, setSelectUser] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [totalPage, setTotalPage] = useState(1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const name = searchParams.get("name") || "";
  const country = searchParams.get("country") || "";
 const page = parseInt(searchParams.get("page") || "1", 10);
  const[searchValue,setSearchValue]= useState(searchParams.get("name")?.trim()||"");
  const [searchCountry, setSearchCountry] = useState(searchParams.get( "country")?.trim() || "");


  const fetchApi = async () => {
    try {
      setError("");
     
      const page = searchParams.get("page") || 1;
      const limit = searchParams.get("limit") || 10;
      const getData = await axios.get(`/api/customer`, {
        params: { page, limit, name, country }
      });

      setUserData(getData.data.data);
      setTotalPage(Math.ceil(getData.data.meta.totalPages));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      
      setIsInitialLoading(false);
    }
  }


  useEffect(() => {
    fetchApi();
  }, [searchValue, searchCountry,searchParams]);

  const handleEdit = (user: inputTypes) => {
    setSelectUser(user)
  }

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/customer/${id}`);
    fetchApi(); 
  }

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', newPage.toString());
    router.push(`?${newParams.toString()}`);
  };

  useEffect(()=>{
          const params = new URLSearchParams();
          if(searchValue){
              params.set("name",searchValue);
  
          }
          if (searchCountry) params.set( "country" , searchCountry);
          router.push(`?${params.toString()}`);
  
      },[searchValue,searchCountry])


      const handleFilterChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name === "name") setSearchValue(value);
      else setSearchCountry(value);
    };
  


  return (
    <div >
  
      <Header
        type ="customer"
        onCreate={() => fetchApi()}
        selectedUser={selectUser}
        onClearEdit={() => setSelectUser(null)}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        searchValue={searchValue}
        searchCountry={searchCountry}
        setSearchValue={setSearchValue}
        setSearchCountry={setSearchCountry}
        handleFilterChanges={handleFilterChanges}
       
      />
      <div className='bg-white mt-3 rounded-2xl m-3 p-3 dark:bg-black'>
       {/* {
          pathname.includes("/products")?(
             <ProductTable/>
          ):(

          
        }*/}
        {
          isInitialLoading ? (
            <Table>
              <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
                    <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
                    <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
                    <TableCell><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
                    <TableCell className='text-right ml-auto'><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ):pathname.includes("product")?(
            <ProductTable/>
          ):pathname.includes("order")?(<OrderTable/>) : userData.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userData.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{i+1}</TableCell>
                      <TableCell>{d.name}</TableCell>
                      <TableCell>{d.email}</TableCell>
                      <TableCell>{d.country}</TableCell>
                      <TableCell className="text-right flex space-x-8 justify-end">
                        <button onClick={() => { handleEdit(d); setOpenDialog(true) }} className='cursor-pointer text-green-600'><Pencil /></button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className='cursor-pointer text-red-600'><Trash2 /></button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(d.id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className='flex justify-between mt-5'>
                 <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#"
                      onClick={(e)=>{e.preventDefault(); handlePageChange(page-1)}}
                      className={page == 1 ? "pointer-events-none opacity-50" : ""} />
                    </PaginationItem>
                    {
                     Array.from({ length: totalPage }).map((_, i) => (
                                  <PaginationItem key={i}>
                                    <PaginationLink href="#" isActive={page === i + 1}
                                      onClick={(e) => { e.preventDefault(); handlePageChange(i + 1) }}>
                                      {i + 1}
                                    </PaginationLink>
                                  </PaginationItem>
                                ))

                    }
                    
                   
                    <PaginationItem>
                      <PaginationNext href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(page + 1); }}
                      className= {page==totalPage?"pointer-events-none opacity-50":""}/>


                    </PaginationItem>
                  </PaginationContent>
              </Pagination>
                
              </div>
            </>
          ) : (
            <div className='flex justify-center'>
              <h1>No data found</h1>
            </div>
          )
        }
      </div>
     

    </div>
  )
}

export default UserTable
