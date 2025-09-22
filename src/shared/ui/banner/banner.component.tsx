import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mt-3.5 mb-3.5">
      <Image
        src={"/images/banner.jpg"}
        alt={"Banner"}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
    </div>
  );
};
export default Banner;
