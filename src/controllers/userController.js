const Search = require("../models/search");

async function getUserSearches(userId) {
  return await Search.find({ userId });
}

async function saveUserSearch(userId, searchParams) {
  return await Search.save(
    new Search({
      userId,
      light: searchParams.light,
      humidity: searchParams.humidity,
      temperature: searchParams.temperature,
    }),
  );
}

module.exports = {
  getUserSearches,
  saveUserSearch,
};
