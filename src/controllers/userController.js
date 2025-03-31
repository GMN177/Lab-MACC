import Search from "../models/search.js";

async function getUserSearches(userId) {
  return await Search.find({ userId });
}

async function saveUserSearch(userId, searchToSave) {
  return await new Search({
    userId,
    lng: searchToSave.lng,
    lat: searchToSave.lat,
    brightness: searchToSave.brightness,
    humidity: searchToSave.humidity,
    temperature: searchToSave.temperature,
  }).save();
}

export default { getUserSearches, saveUserSearch };
