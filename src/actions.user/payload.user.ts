import { buildUser } from '../generators/user.generator.js';

export function buildUserPayload() {
    
    const user = buildUser();
      
    return JSON.stringify(user);
}
