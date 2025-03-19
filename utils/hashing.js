const {hash, compare} = require("bcryptjs");
const {createHmac} = require("crypto");

exports.doHash = async (value, saltValue) => {
    try{
        const result = hash(value, saltValue);
        return result;
    } catch (error) {
        throw new Error(error);
    }
   
}

exports.doHashValidation = async (value, hashedValue) => {
    try {
        const result = compare(value, hashedValue);
        return result;
    } catch (error) {
        throw new Error(error);
    } 
}

exports.hmacProcess = (value, key) => {
    try {
        const result = createHmac('sha256', key).update(value).digest('hex');
        return result;
    } catch (error) {
        throw new Error(error);
        
    }
}
