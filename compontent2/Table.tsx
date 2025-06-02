"use client";
import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useSearchParams, useRouter } from 'next/navigation';
import { BrandTyes } from '@/Type'; 
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import BrandForm from '@/Forms/BrandForm';
import CategoryForm from '@/Forms/CategoryForm';
type Props = {
  datas: BrandTyes[];
  handleDelete:(value:number)=> void;
  selectedEdit:any;
   onCreate:()=>void;
    setSelectedEdit: React.Dispatch<React.SetStateAction<BrandTyes | null>>;
    type: "brand"|"category";
};

const TableData = ({ datas,handleDelete,selectedEdit,setSelectedEdit,onCreate,type }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleEdit = (brand: BrandTyes) => {
  
    setSelectedEdit(brand);
  };



  return (
    <div>
      <div className='bg-white mt-3 rounded-2xl m-3 p-3 dark:bg-black'>
        {isLoading ? (
          <Table>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : datas.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Product Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datas.map((d, i) => (
                <TableRow key={d.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{new Date(d.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{d.productCount}</TableCell>
                  <TableCell className="text-right flex justify-end space-x-4">
                     <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                 <button onClick={() => handleEdit(d)} className="text-green-600"><Pencil /></button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Create </DialogTitle>
                    <DialogDescription asChild>
                        
                   {
                    type==="brand"?
                      <BrandForm
                     selectedbrand={selectedEdit}
                      onCreate={onCreate}
                      setOpenDialog={setOpenDialog}
                      onClearEdit={()=>setSelectedEdit(null)} 
                     />:
                     <CategoryForm
                       selectedCategory={selectedEdit}
                      onCreate={onCreate}
                      setOpenDialog={setOpenDialog}
                      onClearEdit={()=>setSelectedEdit(null)} 
                     />

                   }
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
             </Dialog>
                   
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="text-red-600"><Trash2 /></button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this brand.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(Number(d.id))}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className='flex justify-center p-5'>
            <h1>No brands found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableData;
