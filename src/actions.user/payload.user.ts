import { buildUser } from '../generators/user.generator';

export function buildUserPayload() {
    
    const user = buildUser();
      
    return JSON.stringify(user);
}