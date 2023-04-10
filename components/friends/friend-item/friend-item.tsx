import Chevron from "@/components/icon/chevron";
import { useState } from "react";

const BookInfo = ({ type }: { type: 1 | 2 | 3 }) => {
  return (
    <div className="flex gap-2 mb-3 text-xs">
      <div>
        {type === 1 && "읽고 있는 책"}
        {type === 2 && "함께 읽는 책"}
        {type === 3 && "아카이브"}
      </div>
      <div className="w-10 h-10 bg-slate-200">사진</div>
      <div className="flex flex-col items-center h-10">
        <div className="">책제목</div>
        <div className="px-1 my-auto rounded-full bg-slate-400">+9</div>
      </div>
    </div>
  );
};

const FriendItem = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <li
      className="overflow-hidden"
      onClick={() => setIsSelected((prev) => !prev)}
    >
      <div className="relative z-10 flex items-center py-2 bg-white">
        <div className="w-12 h-12 mr-2 rounded-md bg-slate-600">사진</div>
        <div className="flex-1">
          <div className="">이름</div>
          <div className="text-sm">상태메시지</div>
        </div>
        <div
          className={`${
            isSelected ? "rotate-180" : "rotate-0"
          } transition-transform duration-500`}
        >
          <Chevron width={5} color="black" />
        </div>
      </div>
      <div
        className={`z-0 -top-full ${
          isSelected ? "mt-0" : "-mt-[50%]"
        } transition-[margin-top] duration-500 ease-in-out`}
      >
        <div className="">
          <BookInfo type={1} />
          <BookInfo type={2} />
          <BookInfo type={3} />
        </div>
      </div>
    </li>
  );
};
export default FriendItem;
