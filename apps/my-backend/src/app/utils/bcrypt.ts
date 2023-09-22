import * as bcrypt from 'bcrypt';

export function encryptPassword(rawPassword: string){
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(rawPassword, salt);
    return hash;
}

export function comparePassword(rawPassword: string, hashPassword: string){
    const isMatch = bcrypt.compareSync(rawPassword, hashPassword);
    return isMatch;
}