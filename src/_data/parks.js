require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");

console.log(process.env.NPS_API_KEY);

module.exports = async function () {
  /* NPS API
    https://developer.nps.gov/api/v1/parks?stateCode=AZ&api_key=Lzaxn4GxDwGyMDKetBmsa28iqSkmDMJvICQ2t6qL

    See:  https://www.nps.gov/subjects/developer/api-documentation.htm
    Please use your own api_key, not mine!
    */
  /* hard code the state variable for now,
    but we will ultimately get this from the user */
  let state = "MA";
  let limit = 100;
  let start = 0;
  
  /* base URL for NPS API and David's api_key */
  let baseUrl = "https://developer.nps.gov/api/v1/parks";
  let apiKey = process.env.NPS_API_KEY;
  let userAgentString =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36";

  ///let url = base_url + "?stateCode=" + state + '&api_key=' + api_key;
  // let npsParams = { "stateCode": state, "api_key": api_key }
  let npsParams = {
    stateCode: state,
    start: start,
    limit: limit,
  };

  try {
    let url = baseUrl;
    let params = new URLSearchParams(npsParams);
    let queryString = params.toString();
    url = url + "?" + queryString;

    console.log(url);
    let parksData = await EleventyFetch(url, {
      fetchOptions: {
        headers: {
          "User-Agent": userAgentString,
          "X-Api-Key" : apiKey
        },
      },
      duration: "1d",
      type: "json",
    });
    return(parksData);
  } catch (err) {
    console.error("something is wrong");
    console.log(err);
  }
};
