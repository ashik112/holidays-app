import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


// JSON "set" example
const setObject = async(key, value) => {
    await Storage.set({
        key: key,
        value: JSON.stringify(value)
    });
    // console.log("Object saved!")
};

// JSON "get" example
const getObject = async (key) => {
    const ret = await Storage.get({ key: key });
    const json = JSON.parse(ret.value);
    if(!json) {
        return null;
    }
    // console.log(`Retrieved value of ${key}: `, JSON.parse(ret.value));
    return  json;
};

const removeObject = async(key) => {
    await Storage.remove({ key: key });
    // console.log(`${key} removed from storage`)
};

const keys = async() => {
    const keys = await Storage.keys();
    // console.log('Got keys: ', keys);
    return keys;
};

const clear = async() => {
    await Storage.clear();
    // console.log('Storage Cleard!');
};

const storageService = {
    setObject,
    getObject,
    removeObject,
    keys,
    clear,
};

export default storageService;
