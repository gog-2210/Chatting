import React from "react";
import { useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";

const messageList = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 h-screen bg-gray-200">
      {/* Header */}
      <div className="px-4 pt-4">
        <h1 className="text-xl font-medium mb-2 pl-2">Messages</h1>
        <div className="relative">
          <AiOutlineSearch className="absolute left-3 top-2 text-xl" />
          <input
            type="text"
            placeholder="Search"
            className="h-9 w-full rounded-3xl pl-10 border-2 border-gray-200 focus:outline-none focus:border-green-500 mb-3"
          />
        </div>
      </div>
      {/* Messages List */}
      <div
        className="overflow-y-scroll pl-4 "
        style={{ scrollbarColor: "#B9B9BA #E5E7EB" }}
      >
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/voiu.png"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Vợ iu❤️</h1>
            <p className="text-gray-500">Dạ a Guyn ơi về ăn cơm ạ</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/tuttung.png"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Tụt tưng iu dấu💕</h1>
            <p className="text-gray-500">Anh Guynn, em nhớ anh quá ò!</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/behangxom.jpg"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Bé hàng xóm</h1>
            <p className="text-gray-500">Đêm nay sang tiếp anh nhé 😘</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/chichutich.jpg"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Chị chủ tịch hư hỏng</h1>
            <p className="text-gray-500">tối sang nhà c tăng ca nhá bé iuu</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/onganhphonggym.jpg"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Ông anh phòng Gym</h1>
            <p className="text-gray-500">tối nay mình tập tư thế khác nha...</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/dichlenhietke.jpg"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Địch Lệ Nhiệt Kế</h1>
            <p className="text-gray-500">Guyn à, làm chồng c nhé🙄</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/eimi.jpg"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Bé Fukada Eimi</h1>
            <p className="text-gray-500">Bé chỉ muốn diễn cùng anh</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/bachbin.jpg"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">4 chị em Bách Bin iu dấu</h1>
            <p className="text-gray-500">Rose: a Guyn là của em😡</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/yua.jpg"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Yua Mikami 👉👌</h1>
            <p className="text-gray-500">em muốn đóng phim với anh cả đời</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/thuky.jpg"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Thư ký iu dấu lòng anh</h1>
            <p className="text-gray-500">Dạ chủ tịch, cần bé massage hong ạ</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/voiu.png"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Bé iu❤️</h1>
            <p className="text-gray-500">Dạ chủ tịch, cần bé massage hong ạ</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <Image
              layout="responsive"
              width={38}
              height={38}
              src="/behangxom.jpg"
              alt="profile"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Em iu❤️</h1>
            <p className="text-gray-500">Dạ chủ tịch, cần bé massage hong ạ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default messageList;
