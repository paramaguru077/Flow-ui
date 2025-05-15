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
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import Header from './Header'
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const UserTable = () => {
  const [userData, setUserData] = useState<inputTypes[]>([]);
  const [error, setError] = useState("");
  const [selectUser, setSelectUser] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [totalPage, setTotalPage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") || "";
  const country = searchParams.get("country") || "";

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
  }, [name, country,searchParams]);

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


  return (
    <div>
  
      <Header
        onCreate={() => fetchApi()}
        selectedUser={selectUser}
        onClearEdit={() => setSelectUser(null)}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
      <div className='bg-white mt-3 rounded-2xl m-3 p-3'>
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
          ) : userData.length > 0 ? (
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
                <Button variant="destructive" className=" ring-1 bg-black/90"disabled={parseInt(searchParams.get('page') || '1') === 1}
                  onClick={() => handlePageChange(parseInt(searchParams.get('page') || '1') - 1)}>
                  Previous
                </Button>
                <Button variant="default" disabled={totalPage<1} className='border border-blue-700 bg-blue-400'
                  onClick={() => handlePageChange(parseInt(searchParams.get('page') || '1') + 1)}>
                  Next
                </Button>
              </div>
            </>
          ) : (
            <div className='flex justify-center'>
              <h1>No data found</h1>
            </div>
          )
        }
      </div>
      <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>

    </div>
  )
}

export default UserTable
