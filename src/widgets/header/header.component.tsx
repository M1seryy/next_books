import React from "react";

import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-col mt-3.5">
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <h1 className="text-4xl">Book Store</h1>
        </Link>
        <ul className="flex gap-5">
          <li className="text-xl">Home</li>
          <li className="text-xl">Categories</li>
          <li className="text-xl">About</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
