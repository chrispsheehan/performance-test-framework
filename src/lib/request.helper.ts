import { Params } from 'k6/http';


export function createRequestConfig () : Params {

  return {
    headers: { 
      'Content-Type': 'application/json'
    }
  };
}