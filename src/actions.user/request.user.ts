import http, { Params } from 'k6/http';
import { setSleep } from '../lib/sleep.helpers';
import { buildUserPayload } from './payload.user';


export function getUsers(_url: string, headers : Params){
    
  headers.tags = { tag: "getuser" };

  let res = http.get(`${_url}/users`, headers);  
  
  setSleep(0.5, 1); 
  
  return res;
}


export function createUser(_url: string, headers : Params){
    
  headers.tags = { tag: "createuser" };

  let userPayload = buildUserPayload();

  let res = http.post(`${_url}/users`, userPayload, headers);  
  
  setSleep(0.5, 1); 
  
  return res;
}