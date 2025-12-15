import cryptoRandomString from "crypto-random-string";
import URLRecord from "../models/urlRecordModel.js";

const PROJECT_URL = process.env.PROJECT_URL;
const SHORT_URL_LENGTH = Number(process.env.SHORT_URL_LENGTH);

export async function generateShortURL(customURLCode = "") {
  if (customURLCode) {
    return `${PROJECT_URL}/${customURLCode}`;
  }

  let urlCode;

  let attempts = 0;
  while (attempts < 10) {
    urlCode = cryptoRandomString({
      length: SHORT_URL_LENGTH,
      type: "url-safe",
    });

    const exists = await URLRecord.findOne({ where: { urlCode } });
    if (!exists) break;

    attempts++;
  }

  if (attempts === 10) {
    throw new Error("Too many collisions while generating URL code");
  }

  return `${PROJECT_URL}/${urlCode}`;
}
