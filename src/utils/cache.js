import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 }); // cache expires after 10 mins

export const getCached = (key) => cache.get(key);
export const setCached = (key, value) => cache.set(key, value);
