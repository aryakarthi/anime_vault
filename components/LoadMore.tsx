"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAnime } from "@/app/actions";
import { useInView } from "react-intersection-observer";
import AnimeCard from "./AnimeCard";

let page: number = 2;

export type AnimeCard = JSX.Element;

const LoadMore = () => {
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    if (inView) {
      fetchAnime(page).then((res) => {
        setData([...data, ...res]);
        page++;
      });
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>

      <section className="w-full flex justify-center items-center">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={60}
            height={60}
            className="objec-contain"
          />
        </div>
      </section>
    </>
  );
};

export default LoadMore;
