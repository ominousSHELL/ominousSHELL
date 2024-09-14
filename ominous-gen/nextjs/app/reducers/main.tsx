//generic
import filterPayloads from "../utilties/misc/filterPayloads";
import errorDisabledOptions from "../utilties/misc/errorDisabledOptions";
//resets
import resetFilter from "../utilties/resets/resetFilter";
import resetPayloads from "../utilties/resets/resetPayloads";
import resetEncoders from "../utilties/resets/resetEncoders";
import resetFilterBar from "../utilties/resets/resetFilterBar";
import resetCategories from "../utilties/resets/resetCategories";
import resetPayloadClasses from "../utilties/resets/resetPayloadClasses";
//replacements
import replaceIP from "../utilties/replacers/replaceIP";
import replacePort from "../utilties/replacers/replacePort";
//toggles
import toggleError from "../utilties/toggles/toggleError";
import togglePayload from "../utilties/toggles/togglePayload";
import toggleEncoder from "../utilties/toggles/toggleEncoder";
import encodePayload from "../utilties/misc/encodePayload";
import toggleFilters from "../utilties/toggles/toggleFilters";
import toggleCategory from "../utilties/toggles/toggleCategory";
import togglePayloadClass from "../utilties/toggles/togglePayloadClass";
import { togglePlatform } from "../utilties/toggles/togglePlatform";
import { toggleConnectionType } from "../utilties/toggles/toggleConnectionType";

export const APPLICATION_DATA = {
    //Generic options
    connection_type: 'None',
    platform: 'None',
    //SOCKET options
    //IP
    valid_ip: '',
    ip_address: '127.0.0.1',
    old_valid_ip: '127.0.0.1',
    ip_address_error: false,
    //Port
    port: '9001',
    valid_port: '',
    old_valid_port: '9001',
    port_error: false,
    //PAYLOAD options
    payloads: [{}],
    payload_data: '',
    payload_language: '',
    //Encoding
    encoder: 'none',
    base64: false,
    url: false,
    encoded_payload_data: '',
    initialized_encoding: false,
    //Filtering
    filtered_payloads: [{}],
    initialized_filtering: false,
    //Categories
    category: '',
    categories: [''],
    //Classes
    payload_class: '',
    payload_classes: [''],
    payload_class_selected: false,
    //Caching
    original_payloads: [{}],
    original_payload_data: '',
}


export default function main(state: typeof APPLICATION_DATA, action:any){
    switch (action.type) {
        case 'TOGGLE_REVERSE':
            resetFilterBar()//Reset filter input bar state
            //Reset highlighted elements
            resetCategories()
            resetPayloadClasses()
            resetPayloads()
            resetEncoders()

            toggleConnectionType('reverse')
            state = {...state, connection_type: 'Reverse'}

            if (state.connection_type != 'None' && state.platform != 'None'){
                resetFilter()//Reset filter back to `category`
                return {
                    ...state,
                    //Reset state values
                    payload_classes: [''],
                    payload_class_selected: false,
                    payload_data: '',
                    payloads: [{}],
                    category: '',
                    initialized_filtering: false,
                    initialized_encoding: false,
                    encoder: 'none',
                }
            } 

            return state

        case 'TOGGLE_BIND':
            resetFilterBar()//Reset filter input bar state
            //Reset highligted elements
            resetCategories()
            resetPayloadClasses()
            resetPayloads()
            resetEncoders()

            toggleConnectionType('bind')
            state = {...state, connection_type: 'Bind'}

            if (state.connection_type != 'None' && state.platform != 'None'){
                resetFilter()//Reset filter back to `category`
                return {
                    ...state,
                    //Reset state values
                    payload_classes: [''],
                    payload_class_selected: false,
                    payload_data: '',
                    payloads: [{}],
                    category: '',
                    initialized_filtering: false,
                    initialized_encoding: false,
                    encoder: 'none',
                }
            }

            return state

        case 'TOGGLE_LINUX':
            resetFilterBar()//Reset filter input bar state
            //Reset highlighted elements
            resetCategories()
            resetPayloadClasses()
            resetPayloads()
            resetEncoders()

            togglePlatform('linux')
            state = {...state,platform: 'Linux'}

            if (state.connection_type != 'None' && state.platform != 'None'){
                //Default filter option back to `Category`
                resetFilter()
                return {
                    ...state,
                    //Reset state values
                    payload_classes: [''],
                    payload_class_selected: false,
                    payload_data: '',
                    payloads: [{}],
                    category: '',
                    initialized_filtering: false,
                    initialized_encoding: false,
                    encoder: 'none',
                }
            }
            
            return state
        case 'TOGGLE_WINDOWS':
            resetFilterBar() //Reset filter input bar state
            //Reset highlighted elements
            resetPayloadClasses()
            resetCategories()
            resetPayloads()
            resetEncoders()

            togglePlatform('windows')
            state = {...state,platform: 'Windows'}

            if (state.connection_type != 'None' && state.platform != 'None'){
                resetFilter()//Reset filter back to `category`
                return {
                    ...state,
                    //Reset state values
                    payload_classes: [''],
                    payload_class_selected: false,
                    payload_data: '',
                    payloads: [{}],
                    category: '',
                    //Reset initialized state values for new payloads
                    initialized_filtering: false,
                    initialized_encoding: false,
                    encoder: 'none',
                }
            }
            return state

        case 'TOGGLE_FILTERS':
            toggleFilters(action.element)
            return state

        case 'TOGGLE_CATEGORY':
            resetFilterBar()//Reset filter input bar state
            return {...state, category: toggleCategory(action.element)}

        case 'TOGGLE_CLASS':
            resetEncoders()//Reset highlighted elements

            state = {...state, payload_class: togglePayloadClass(action.element)}

            return {
                ...state,
                payload_class_selected:true,
                initialized_filtering: false,
                initialized_encoding: false,
                encoder: 'none',
            }

        case 'TOGGLE_PAYLOAD':
            resetEncoders()//Reset highlighted elements

            togglePayload(action.element)
            state = {
                ...state,
                //Reset state values for new payloads
                initialized_filtering: false,
                initialized_encoding: false,
                encoder: 'none',
            }

            return state

        case 'SET_IP':
            //Exit when user didn't toggle enough options
            if (state.payload_data == ''){ errorDisabledOptions(); return state }

            //Don't allow IP to be edited while encoder is active
            if (state.encoder != 'none'){return state}

            //Invalid IP Address
            if (action.event.target.value.length <= 6){
                state = {
                    ...state,
                    ip_address: action.event.target.value,
                    ip_address_error: true
                }
            }
            //Valid IP Address 
            if (action.event.target.value.length >= 7){
                state = {
                    ...state,
                    ip_address: action.event.target.value,
                    valid_ip: action.event.target.value,
                    ip_address_error: false
                }

                state = {
                    ...state,
                    payload_data: replaceIP(state.payload_data, state.old_valid_ip, state.valid_ip, true),
                    old_valid_ip: state.valid_ip//Cache original valid ip for replacement regex
                }
            }

            toggleError(state.ip_address_error, state.port_error) //Display invalid socket input when necessary

            //If encoding is initialized, cache original payload with newly edited payload
            state.initialized_encoding ? state = { ...state, original_payload_data: state.payload_data } : null

            return {
                ...state,
                //Reset encoding state values for new edited payload
                initialized_encoding: false,
            }

        case 'SET_PORT':
            //Exit when user didn't toggle enough options
            if (state.payload_data == ''){
                errorDisabledOptions()
                return state
            }

            //Don't allow IP to be edited while encoder is active
            if (state.encoder != 'none'){
                return state
            }

            //Invalid port number
            if (action.event.target.value.length < 3){
                state = {
                    ...state,
                    port: action.event.target.value,
                    port_error: true
                }
            }
            
            //Valid port number
            if (action.event.target.value.length >= 3){
                state = {
                    ...state,
                    port: action.event.target.value,
                    valid_port: action.event.target.value,
                    port_error: false
                }
                
                state = {
                    ...state,
                    payload_data: replacePort(state.payload_data, state.old_valid_port, state.valid_port, true),
                    old_valid_port: state.valid_port//Cache original valid port for replacement regex
                }
            }

            toggleError(state.ip_address_error, state.port_error)//Display invalid socket input when necessary

            //If encoding is initialized, cache original payload with newly edited payload
            state.initialized_encoding ? state = { ...state, original_payload_data: state.payload_data } : null

            return {
                ...state,
                initialized_encoding: false,//Reset encoding state values for new edited payload
            }

        case 'TOGGLE_ENCODER':
            //Exit when user didn't toggle enough options
            if (state.payload_data == ''){ errorDisabledOptions(); return state }

            //Init payload encoding
            if (state.initialized_encoding == false){
                state = {
                    ...state,
                    original_payload_data: state.payload_data,//Cache original payload data
                    initialized_encoding:  true
                }
            }

            //Set encoder
            state = { ...state, encoder: toggleEncoder(action.element) } 

            if (state.encoder != 'none'){
                //If base64 is enabled
                state.encoder == 'base64' ? state = { ...state, base64: true } : null
                //If url is enabled
                state.encoder == 'url' ? state = { ...state, url:true } : null

                state =  {
                    ...state,
                    //Encode original payload data
                    encoded_payload_data : encodePayload(state.encoder, state.original_payload_data, state.base64, state.url),
                    base64: false,
                    url: false
                }

                return { ...state, payload_data: state.encoded_payload_data }
            }

            //No encoding specified
            return { ...state, payload_data: state.original_payload_data }

        case 'FILTER_PAYLOAD':
            //Exit when user didn't toggle enough options
            if (state.payload_class_selected == false){ return state }

            resetPayloads()//Reset highlighted elements

            //Init payload filtering
            if (state.initialized_filtering == false){
                state = {
                    ...state,
                    original_payloads: state.payloads,//Cache original payloads list
                    initialized_filtering:  true
                }
            }

            state = {
                ...state,
                filtered_payloads: filterPayloads(action.event, state.original_payloads),
                payload_data: '',
            }

            return { ...state, payloads: state.filtered_payloads }
        
        
        //Store data from database calls
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'SET_PAYLOAD_CLASSES':
            return {
                ...state,
                payload_classes: action.payload
            }
        case 'SET_PAYLOADS':
            return {
                ...state,
                payloads: action.payload
            }
        case 'SET_PAYLOAD_DATA':
            state = {
                ...state,
                payload_data: action.payload
            }
            //Replace new payload data with old IP when default is not set
            state.old_valid_ip != '127.0.0.1' ? state = {...state,payload_data: replaceIP(state.payload_data, state.old_valid_ip, state.valid_ip, false)} : null
            //Replace new payload data with old Port when default is not set
            state.old_valid_port != '9001' ? state = {...state,payload_data: replacePort(state.payload_data, state.old_valid_port, state.valid_port, false)} : null
            return state
        case 'SET_PAYLOAD_LANGUAGE':
            return {
                ...state,
                payload_language: action.payload
            }
        default:
            return state
    }
}