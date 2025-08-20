"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

interface Props {
  category?: string;
}

export const ProductList = ({ category }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
    })
  );

  return (
    <div>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
};

export const ProductListSkeleton = () => {
  return <div>Loading...</div>;
};
