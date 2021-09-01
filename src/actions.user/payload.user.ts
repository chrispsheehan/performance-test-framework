import { buildUser } from '../generators/user.generator';
import User from './types/User';


export function buildUserPayload() {
    
    const user : User = buildUser();
      
    return JSON.stringify(user);
}