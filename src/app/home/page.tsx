import Image from "next/image";
import background from "/public/Cat.jpg";

const page = () => {
  return (
    <div className=" bg-white flex flex-col items-center justify-between lg:pl-72">
      <div className="relative w-full">
        <div className="absolute w-full">
          <Image
            src={background}
            width={2000}
            height={1000}
            alt="backgorund image"
            className="w-full "
          />
        </div>
        <div className="relative items-center max-w-screen-lg mx-auto text-center">
          <h2 className="flex items-center justify-center text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            ねこぴーすへようこそ
          </h2>
          <div className="mx-auto text-center">
            <h4 className="pt-2 text-gray-900 font-semibold tracking-tight">
              ねこぴーすは、世界中から不幸な猫が減って欲しいという思いから、制作されました。
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
