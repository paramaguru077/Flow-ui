"use client"
import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import Header from './Header';
import axios from 'axios'
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination"
import { customerTypes } from '@/Type';

const ProductTable = () => {
  const [products, setProducts] = useState<customerTypes[]>([]);
  const [selectProduct, setSelectProduct] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [totalPage, setTotalPage] = useState(1);

  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const name = searchParams.get("name")?.trim() || "";
  const category = searchParams.get("category")?.trim() || "";

  const [searchValue, setSearchValue] = useState(name);
  const [searchCategory, setSearchCategory] = useState(category);

  const fetchApi = async () => {
    try {
      setIsLoading(true);
      const limit = 10;
      const res = await axios.get("/api/products", {
        params: { page, limit, name, category }
      });
      setProducts(res.data.data || []);
      setTotalPage(Math.ceil(res.data.meta?.totalPages || 1));
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [searchParams]);

  const handleEdit = (product: customerTypes) => {
    setSelectProduct(product);
    setOpenDialog(true);
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/api/products/${id}`);
    fetchApi();
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', newPage.toString());
    router.push(`?${newParams.toString()}`);
  };

  // Update filters in URL when searchValue/searchCategory change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) params.set("name", searchValue);
    else params.delete("name");

    if (searchCategory) params.set("category", searchCategory);
    else params.delete("category");

   //params.set("page", "1"); // reset to page 1 on filter
    router.push(`?${params.toString()}`);
  }, [searchValue, searchCategory]);


  //filter
  const handleFilterChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  if (name === "name") setSearchValue(value);
  else if (name === "category") setSearchCategory(value);
};


  return (
    <div>
      <Header
        type="product"
        onCreate={fetchApi}
        selectedUser={selectProduct}
        onClearEdit={() => setSelectProduct(null)}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        searchValue={searchValue}
        searchCountry={searchCategory}
        setSearchValue={setSearchValue}
        setSearchCountry={setSearchCategory}
        handleFilterChanges={handleFilterChanges}
      />

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
        ) : products.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((d, i) => (
                  <TableRow key={d.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{d.name}</TableCell>
                    <TableCell>{d.brand}</TableCell>
                    <TableCell>{d.category}</TableCell>
                    <TableCell>{d.price}</TableCell>
                    <TableCell>{d.stock}</TableCell>
                    <TableCell className="text-right flex justify-end space-x-6">
                      <button onClick={() => handleEdit(d)} className='text-green-600'><Pencil /></button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className='text-red-600'><Trash2 /></button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this product.
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
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(page - 1); }}
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPage }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        isActive={page === i + 1}
                        onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(page + 1); }}
                      className={page === totalPage ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <div className='flex justify-center'><h1>No products found</h1></div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
