'use client'
import { IoIosSearch } from "react-icons/io";
import { ChangeEvent, MouseEvent } from "react";
import PayloadPreview from "./PayloadPreview";

  
export default function Sidebar(props:any){
    return (
    <div id='sidebar' className="hidden xl:hidden fixed top-0 bottom-0 p-2 overflow-scroll whitespace-nowrap text-center w-10/12 bg-gray-900">
        <div className="grid grid-cols-4 gap-4 my-3">
          CONNECTION TYPE:<div className={(props.APP.connection_type != 'None' ? (props.APP.connection_type == 'Reverse' ? 'bg-rose-500' : 'bg-blue-600') : 'bg-gray-500') + ' rounded mx-1 '}>{props.APP.connection_type}</div>
          PLATFORM:<div className={(props.APP.platform != 'None' ? (props.APP.platform == 'Linux' ? 'bg-yellow-500' : 'bg-blue-600') : 'bg-gray-500') + ' rounded mx-1 '}>{props.APP.platform}</div>
        </div>
        {/*Filter bar*/}
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
          <IoIosSearch/>
          <input type="text" id='filter_bar_mobile' onChange={(e: ChangeEvent<HTMLInputElement>) => props.filterPayload(e)} placeholder="Filter" className="text-base ml-4 w-full bg-transparent focus:outline-none"/>
        </div>

        {/*Payload results*/}
        <div className="grid grid-cols-1 grid-flow-row gap-2 place-items-center overflow-y-auto bg-gray-800 rounded h-40 m-2 p-2">
          {props.APP.payloads.map((payload:any, index:any) => (
            payload.name !== undefined && (<div tabIndex={0} key={index} onClick={(e: MouseEvent<HTMLDivElement>) => props.togglePayload(e.currentTarget)} className="payloads bg-gray-600 w-full p-2 mx-1 rounded">{payload.name}</div>)
          ))}
        </div>
        <div className="my-4 bg-gray-600 h-[1px]"></div>

        {/*Filters (category and payload class)*/}
        <h1 className="font-bold text-lg mb-2">Filters</h1>
        <div className="bg-gray-800 grid grid-flow-col gap-1 overflow-scroll">
          <div onClick={(e: MouseEvent<HTMLDivElement>) => props.toggleFilter(e.currentTarget)} className='category border border-gray-500 m-1 mx-3 py-2 rounded text-xl font-bold'>Category</div>
          <div onClick={(e: MouseEvent<HTMLDivElement>) => props.toggleFilter(e.currentTarget)} className="payload_class border border-gray-500 m-1 mx-3 py-2 rounded text-xl font-bold">Payload Class</div>
        </div>

        {/*Categories*/}
        <div className="bg-gray-800 m-1 my-2">
          <div className="category_container hidden">
            <div className="grid grid-cols-3 grid-flow-row gap-2 place-items-center overflow-scroll w-full bg-gray-800 rounded h-32">
              {props.APP.categories.map((category:any, index:any) => (
                category !== '' && (<div key={index} onClick={(e: MouseEvent<HTMLDivElement>) => props.toggleCategory(e.currentTarget)} className="categories bg-gray-600 p-2 m-1 rounded text-xl">{category}</div>)
              ))}
            </div>
          </div>

        {/*Payload Classes*/}
          <div className="payload_class_container hidden">
          <div className="grid grid-cols-3 grid-flow-row gap-2 place-items-center overflow-scroll w-full bg-gray-800 rounded h-32 py-3">
              {props.APP.payload_classes.map((payload_class:any, index:any) => (
                payload_class !== '' && (<div key={index} onClick={(e: MouseEvent<HTMLDivElement>) => props.toggleClass(e.currentTarget)} className="payload_classes bg-gray-600 p-2 m-1 rounded text-xl">{payload_class}</div>)
              ))}
            </div>
          </div>
        </div>

        {/*Payload Preview*/}
        <h1 className="font-bold text-lg mt-4 mb-2">Payload Preview</h1>
        <PayloadPreview text={props.APP.payload_data} language={props.APP.payload_language}/>
      </div>
    )
}