"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const OrderTable = () => {
  const [orderItem, setOrderItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const orderApi = async () => {
    try {
      setIsLoading(true); 
      const response = await axios.get("/api/orders");
      setOrderItem(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
    orderApi();
  }, []);

  return (
    <div className='bg-white mt-3 rounded-2xl m-3 p-3 dark:bg-black'>
      {isLoading ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Shipped</TableHead>
            </TableRow>
          </TableHeader>
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
      ) : orderItem.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Shipped</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItem.map((d, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{new Date(d.date).toLocaleDateString()}</TableCell>
                <TableCell>{d.customerName}</TableCell>
                <TableCell>{d.country}</TableCell>
                <TableCell>{d.total}</TableCell>
                <TableCell>{d.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className='flex justify-center'><h1>No orders found</h1></div>
      )}
    </div>
  );
};

export default OrderTable;
