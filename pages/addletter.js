import PageLayout from "@/components/pageLayout";
import { useRouter } from "next/router";
import { ArrowLeftOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { MdContactMail } from "react-icons/md";

const Addletter = () => {
    const router = useRouter();
//   const menu = [
//     {
//       name: "Contact Manager",
//       path: "/contact",
//     },
//   ];
  return (
    
    <div>
    


    {/* <h4 className="font-bold text-lg my-2 mx-7">Lettre</h4> */}
    <h2 className="font-bold text-lg my-2 mx-7"  style={{ cursor: "pointer" }} onClick={() => router.back()}><ArrowLeftOutlined/> &nbsp;Nouvelle Lettre</h2>

    

    <fieldset className="border border-gray-700 p-4 max-w-3xl rounded space-y-4">
      <legend className="text-sm font-semibold px-2">
        Entrer votre Message
      </legend>

      <div className="flex gap-4 flex-wrap">
        <div className="flex flex-col flex-1">
          <label>Télephone</label>
          <div className="inline-block relative">
            <input
              type="text"
              className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
            />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              {/* <FaAlipay className="text-primaryColor" /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <label>Email Address</label>
          <div className="inline-block relative">
            <input
              type="search"
              className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
            />
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              {/* <FaAlipay className="text-primaryColor" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <label>Message Object</label>
        <div className="inline-block relative">
          <input
            type="search"
            className="block h-9 appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
          />
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            {/* <FaAlipay className="text-primaryColor" /> */}
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <label>Message</label>
        <div className="inline-block relative">
          <textarea
            rows="20"
            cols="10"
            className="block rounded appearance-none w-full bg-white border border-gray-700 placeholder-gray-600 hover:border-primaryColor px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:shadow-outline"
          >
            {" "}
          </textarea>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            {/* <FaAlipay className="text-primaryColor" /> */}
          </div>
        </div>
      </div>

      <button className="btn">  <span>Envoyez</span></button>
    </fieldset>

    </div>

  

  );
};

export default Addletter;
