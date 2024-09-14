'use client'
import {ChangeEvent, useEffect, useReducer, useRef, useState } from "react";
import { IoIosSearch, IoLogoWindows } from "react-icons/io";
import { FcLinux } from "react-icons/fc";
import { MouseEvent } from "react";
import Hammer from 'hammerjs';
//Custom imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import PortInput from "./components/PortInput";
import ErrorAlert from "./components/ErrorSocketInfo";
import IPAddressInput from "./components/IPAddressInput";
import main, { APPLICATION_DATA } from "./reducers/main";
import PayloadPreview from "./components/PayloadPreview";
import { getHTMLElements } from "./utilties/getters/getHTMLElements";
import { closeSidebar, openSidebar } from "./utilties/toggles/toggleSidebar";
import ErrorDisabledOptions from "./components/ErrorDisabledOptions";
import { getCategories } from "./utilties/getters/getCategories";
import getPayloadClasses from "./utilties/getters/getPayloadClasses";
import { getPayloads } from "./utilties/getters/getPayloads";
import getPayloadData  from "./utilties/getters/getPayloadData";
import { getPayloadLanguage } from "./utilties/getters/getPayloadLanguage";


export default function Home(){
  //Reducers
  const [APP, dispatch] = useReducer(main, APPLICATION_DATA)
  //Custom dispatch for async data fetching, too lazy to use redux middleware
  async function customDispatch(type:string, event:any){
    switch(type){
      case 'TOGGLE_REVERSE':
        dispatch({type:'TOGGLE_REVERSE'})
        if (APP.connection_type != '' && APP.platform != ''){
          dispatch({type:'SET_CATEGORIES', payload: await getCategories('Reverse', APP.platform)})
        }
        break

      case 'TOGGLE_BIND':
        dispatch({type:'TOGGLE_BIND'})
        if (APP.connection_type != '' && APP.platform != ''){
          dispatch({type:'SET_CATEGORIES', payload: await getCategories('Bind', APP.platform)})
        }
        break

      case 'TOGGLE_LINUX':
        dispatch({type:'TOGGLE_LINUX'})
        if (APP.connection_type != '' && APP.platform != ''){
          dispatch({type:'SET_CATEGORIES', payload: await getCategories(APP.connection_type, 'Linux')})
        }
        break

      case 'TOGGLE_WINDOWS':
        dispatch({type:'TOGGLE_WINDOWS'})
        if (APP.connection_type != '' && APP.connection_type != ''){
          dispatch({type:'SET_CATEGORIES', payload: await getCategories(APP.connection_type, 'Windows')})
        }
        break

      case 'TOGGLE_CATEGORY':
        dispatch({type:'TOGGLE_CATEGORY', element: event})
        dispatch({type:'SET_PAYLOAD_CLASSES', payload: await getPayloadClasses(APP.connection_type, APP.platform, event.textContent)})
        break

      case 'TOGGLE_CLASS':
        dispatch({type:'TOGGLE_CLASS', element: event})
        dispatch({type:'SET_PAYLOADS', payload: await getPayloads(APP.connection_type, APP.platform, APP.category, event.textContent)})
        break

      case 'TOGGLE_PAYLOAD':
        dispatch({type:'TOGGLE_PAYLOAD', element: event})
        dispatch({type:'SET_PAYLOAD_LANGUAGE', payload: await getPayloadLanguage(event.textContent)})
        dispatch({type:'SET_PAYLOAD_DATA', payload: await getPayloadData(event.textContent)})
      default:
        return
    }
  }
  
  const swipeArea = useRef(null)
  useEffect(() => {
      //Retrieve html elements
      getHTMLElements()
      //Mobile swiping functionality
      const hammer = new Hammer(swipeArea.current!)
      hammer.on('swiperight', openSidebar)
      hammer.on('swipeleft', closeSidebar)
      return () => {
        hammer.destroy()
      }
    }, [])

    return (
    <main ref={swipeArea}>
      <Header/>
      {/*Mobile sidebar*/}
      <Sidebar toggleFilter={(event: MouseEvent<HTMLDivElement>) => dispatch({type:'TOGGLE_FILTERS', element: event})} toggleCategory={(event: MouseEvent<HTMLDivElement>) => customDispatch('TOGGLE_CATEGORY', event)} toggleClass={(event: MouseEvent<HTMLDivElement>) => customDispatch('TOGGLE_CLASS', event)} togglePayload={(event: MouseEvent<HTMLDivElement>) => customDispatch('TOGGLE_PAYLOAD', event)} filterPayload={(event: ChangeEvent<HTMLInputElement>) => dispatch({type:'FILTER_PAYLOAD', event: event})} connection_type={APP.connection_type} APP={APP}/>
      <div className="container xl:ml-5 text-5xl sm:text-7xl mt-5">
        <h1 className='typing-animation text-center'>Payload Generator</h1>
      </div>

      {/*Mobile Content*/}
      <div className="block xl:hidden mt-10">
            {/*Choose Connection Type*/}
            <h1 className="text-4xl text-center mb-5">Select Connection Type</h1>
           <div className="xl:hidden grid grid-cols-1 place-items-center mb-8">
            <div onClick={() => customDispatch('TOGGLE_REVERSE', null)} className='reverse_card border-rose-500 border border-3 rounded w-72 h-72 md:w-6/12 xl:h-96 xl:w-96 p-6 shadow'>
              <a href="#platforms" className='reverse_text text-rose-500 mb-2 text-8xl xl:text-9xl text-center font-bold tracking-tight'>Reverse Shell</a>
            </div>
          </div>
          <div className="xl:hidden grid grid-cols-1 place-items-center mb-8">
            <div onClick={() => customDispatch('TOGGLE_BIND', null)} className='bind_card border-blue-500 border border-3 rounded w-72 h-72 md:w-6/12 xl:h-96 xl:w-96 p-6 shadow'>
              <a href="#platforms" className='bind_text text-sky-400 mb-2 text-8xl xl:text-9xl text-center font-bold tracking-tight'>Bind Shell</a>
            </div>
          </div>

        {/*Choose Platform*/}
        <h1 id="platforms" className="text-4xl text-center mt-24">Select Platform</h1>
        <div className="grid grid-cols-2 place-items-center mx-16 lg:mx-64 mt-10 mb-8">
          <FcLinux className='linux text-8xl rounded-lg' onClick={() => customDispatch('TOGGLE_LINUX', null)}/>
          <IoLogoWindows className='windows text-8xl rounded-lg text-sky-300' onClick={() => customDispatch('TOGGLE_WINDOWS', null)}/>
        </div>

        <ErrorDisabledOptions/>

        {/*Generate Payload*/}
        <h1 className="text-5xl text-center mt-16">Generate Payload</h1>
          <ErrorAlert ip_error={APP.ip_address_error} port_error={APP.port_error} />
          <div className="bg-gray-800 rounded m-2 mx-4 grid grid-cols-2">
          {/*Choose Encoders*/}
            <div id='encoders' className="bg-gray-700 rounded p-1 m-1">
              <h1 className="text-lg text-center my-1">Encoders</h1>
              <div className="bg-gray-800 grid grid-cols-2 grid-flow-row place-items-center overflow-y-auto p-1 h-36">
                <div onClick={(event: MouseEvent<HTMLDivElement>) => dispatch({type:'TOGGLE_ENCODER', element: event.currentTarget})} className="encoders border-2 border-gray-600 p-2 m-1 rounded bg-blue-600">None</div>
                <div onClick={(event: MouseEvent<HTMLDivElement>) => dispatch({type:'TOGGLE_ENCODER', element: event.currentTarget})} className="encoders border-2 border-gray-600 p-2 m-1 rounded">Base64</div>
                <div onClick={(event: MouseEvent<HTMLDivElement>) => dispatch({type:'TOGGLE_ENCODER', element: event.currentTarget})} className="encoders border-2 border-gray-600 p-2 m-1 rounded">URL</div>
              </div>
            </div>

            {/*Set Socket Information*/}
            <div id='socket' className="bg-gray-700 rounded p-1 m-1">
              <h1 className="text-lg text-center my-1">Socket Information</h1>
              <div className="bg-gray-800 rounded grid grid-cols-1 grid-rows-2 p-1">
                <h1 className="text-center">IP Address</h1>
                <IPAddressInput id="ip_mobile" ip_address={APP.ip_address} onClick={(event: ChangeEvent<HTMLInputElement>) => dispatch({type:'SET_IP', event:event})}/>
                <h1 className="text-center">Port</h1>
                <PortInput id="port_mobile" port={APP.port} onClick={(event: ChangeEvent<HTMLInputElement>) => dispatch({type:'SET_PORT', event:event})}/> 
              </div>
            </div>

            {/*Payload Preview*/}
            <div id='generated_payload' className="bg-gray-700 rounded p-1 m-1 col-span-2 h-80">
              <h1 className="text-lg text-center my-1">Payload</h1>
              <div id='disable_payload'>
                <PayloadPreview text={APP.payload_data} language={APP.payload_language}/> 
              </div>
            </div>
          </div>
      </div>

      {/*Desktop Content*/}
      <div className="hidden xl:block mt-16">
        <h1 id="platforms" className="text-6xl text-center mb-5">Select Connection Type</h1>
        <div className="grid grid-cols-2 gap-4 place-items-center mx-64">
          <div className="grid grid-cols-1 place-items-center mb-8">
              <div onClick={() => customDispatch('TOGGLE_REVERSE', null)} className='reverse_card border-rose-500 border border-3 rounded w-72 h-72 md:w-6/12 xl:h-96 xl:w-96 p-6 shadow'>
                <a href="#platforms" className='reverse_text text-rose-500 mb-2 text-8xl xl:text-9xl font-bold tracking-tight'>Reverse Shell</a>
              </div>
          </div>

          <div className="grid grid-cols-1 place-items-center mb-8">
            <div onClick={() => customDispatch('TOGGLE_BIND', null)} className='bind_card border-blue-500 border border-3 rounded w-72 h-72 md:w-6/12 xl:h-96 xl:w-96 p-6 shadow'>
              <a href="#platforms" className='bind_text text-sky-400 mb-2 text-8xl xl:text-9xl text-center font-bold tracking-tight'>Bind Shell</a>
            </div>
          </div>
        </div>

        <h1 id="platforms" className="text-6xl text-center mt-20">Select Platform</h1>
        <div className="grid grid-cols-2 place-items-center mx-96 mt-10 mb-8">
          <FcLinux className='linux text-9xl rounded-lg' onClick={() => customDispatch('TOGGLE_LINUX', null)} />
          <IoLogoWindows className='windows text-9xl rounded-lg text-sky-300' onClick={() => customDispatch('TOGGLE_WINDOWS', null)}/>
        </div>

        <ErrorDisabledOptions/>

        <div className="grid grid-cols-2 grid-rows-1 gap-3 bg-gray-800 rounded mx-1">
          <div className="rounded bg-gray-600 m-2">
            {/*Filter Payloads*/}
            <h1 className="text-center text-5xl rounded ">Filter Payloads</h1>
            <div className="grid grid-cols-2 grid-rows-1 gap-1 bg-gray-800 rounded m-2">
              {/*Display settings*/}
              <div className="m-2 h-10 rounded">
                <div className="grid grid-cols-4 gap-1 my-1">
                CONN TYPE:<div className={(APP.connection_type != 'None' ? (APP.connection_type == 'Reverse' ? 'bg-rose-500' : 'bg-blue-600') : 'bg-gray-500') + ' rounded mx-1 text-center'}>{APP.connection_type}</div>
                PLATFORM:<div className={(APP.platform != 'None' ? (APP.platform == 'Linux' ? 'bg-yellow-500' : 'bg-blue-600') : 'bg-gray-500') + ' rounded mx-1 text-center'}>{APP.platform}</div>
                </div>
              </div>

              {/*Filter bar*/}
              <div className="m-2 h-12 rounded">
                <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
                  <IoIosSearch/>
                  <input type="text" id='filter_bar_desktop' onChange={(event: ChangeEvent<HTMLInputElement>) => dispatch({type:'FILTER_PAYLOAD', event: event})} placeholder="Filter" className="text-xl ml-4 w-full bg-transparent focus:outline-none"/>
                </div>
              </div>

              {/*Filters*/}
              <div className="border border-gray-500 m-2 h-96 rounded">
                <div className="bg-gray-800 grid grid-flow-col gap-1">
                  <div onClick={(event: MouseEvent<HTMLDivElement>) => dispatch({type:'TOGGLE_FILTERS', element: event.currentTarget})} className='category border border-gray-500 m-1 mx-3 py-2 rounded text-xl text-center font-bold'>Category</div>
                  <div onClick={(event: MouseEvent<HTMLDivElement>) => dispatch({type:'TOGGLE_FILTERS', element: event.currentTarget})} className="payload_class border border-gray-500 m-1 mx-3 py-2 rounded text-xl text-center font-bold">Payload Class</div>
                </div>

                <div className="bg-gray-800 m-2 my-2 mt-8">
                  <div className="category_container hidden">
                    <div className="grid grid-cols-1 grid-flow-row gap-2 place-items-start overflow-y-auto bg-gray-700 rounded h-72">
                      {APP.categories.map((category:any, index:any) => (
                        category !== '' && (<div key={index} onClick={(event: MouseEvent<HTMLDivElement>) => customDispatch('TOGGLE_CATEGORY', event.currentTarget)} className="categories bg-gray-600 p-2 m-1 my-3 w-11/12 ml-3 rounded text-3xl text-center">{category}</div>)
                      ))}
                    </div>
                  </div>
                </div>
                  <div className="payload_class_container hidden mx-1">
                    <div className="grid grid-cols-1 grid-flow-row gap-2 place-items-start overflow-y-auto w-full bg-gray-700 rounded h-72">
                        {APP.payload_classes.map((payload_class:any, index:any) => (
                          payload_class !== '' && (<div key={index} onClick={(event: MouseEvent<HTMLDivElement>) => customDispatch('TOGGLE_CLASS', event.currentTarget)} className="payload_classes bg-gray-600 p-2 m-1 my-3 w-11/12 ml-3 rounded text-3xl text-center">{payload_class}</div>)
                        ))}
                    </div>
                  </div>
              </div>

              {/*Results*/}
              <div className="border border-gray-500 m-2 h-96 rounded">
                <h1 className="text-center text-xl">Payloads</h1>
                <div className="grid grid-cols-1 grid-flow-row gap-1 place-items-start overflow-y-auto bg-gray-800 rounded h-80 m-1 p-2">
                  {APP.payloads.map((payload:any, index:any) => (
                  payload.name !== undefined && (<div tabIndex={0} key={index} onClick={(event: MouseEvent<HTMLDivElement>) => customDispatch('TOGGLE_PAYLOAD', event.currentTarget)} className="payloads bg-gray-600 w-full p-2 mx-1 rounded text-xl">{payload.name}</div>)
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/*Generate Payload*/}
          <div className="bg-gray-600 rounded m-2">
            <h1 className="text-center text-5xl">Generate Payload</h1>
            <ErrorAlert ip_error={APP.ip_address_error} port_error={APP.port_error} />

            <div className="grid grid-cols-2 grid-rows bg-gray-800 rounded m-2">
              {/*Encoders*/}
              <div className="bg-gray-700 rounded h-36 m-2 ">
                <h1 className="text-center text-xl my-1">Encoders</h1>
                <div className="bg-gray-800 rounded grid grid-cols-3 grid-flow-row place-items-center overflow-y-auto p-1 h-24 m-1 mx-2">
                  <div onClick={(event: MouseEvent<HTMLDivElement>) => dispatch({type:'TOGGLE_ENCODER', element: event.currentTarget})} className="encoders border-2 border-gray-600 p-1 m-1 px-4 rounded bg-blue-600 text-2xl">None</div>
                  <div onClick={(event: MouseEvent<HTMLDivElement>) => dispatch({type:'TOGGLE_ENCODER', element: event.currentTarget})} className="encoders border-2 border-gray-600 p-1 m-1 px-4 rounded text-2xl">Base64</div>
                  <div onClick={(event: MouseEvent<HTMLDivElement>) => dispatch({type:'TOGGLE_ENCODER', element: event.currentTarget})} className="encoders border-2 border-gray-600 p-1 m-1 px-4 rounded text-2xl">URL</div>
                </div>
              </div>
              {/*Socket Information*/}
              <div className="bg-gray-700 rounded h-36 m-2">
                <h1 className="text-center text-xl my-1">Socket Information</h1>
                <div className="gap-1 grid grid-cols-1 grid-rows-2 p-1 mx-1">
                  <IPAddressInput id="ip_desktop" ip_address={APP.ip_address} onClick={(event: ChangeEvent<HTMLInputElement>) => dispatch({type:'SET_IP', event:event})}/>
                  <PortInput id="port_desktop" port={APP.port} onClick={(event: ChangeEvent<HTMLInputElement>) => dispatch({type:'SET_PORT', event:event})}/> 
                </div>
              </div>

              {/*Socket Payload*/}
              <div className="col-span-2 bg-gray-700 rounded text-center h-72 mt-1 mx-2 mb-2">
                <div className="mx-2 my-2">
                  <PayloadPreview text={APP.payload_data} language={APP.payload_language}/> 
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
