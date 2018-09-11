const rp = require('./../lib');

const checkEducationGovUkAvailable = async () => {
  try {
    const response = await rp({
      method: 'GET',
      uri: 'http://www.education.gov.uk',
    });
    const match = response.match(/<title>(.{1,})<\/title>/gm);
    return match ? match[0] : '!UNKNONW!';
  } catch (e) {
    throw new Error(`${e.statusCode}: ${e.message}`);
  }
};

checkEducationGovUkAvailable().then((title) => {
  console.info(`available. title: ${title}`);
}).catch((e) => {
  console.error(`unavailable: ${e.message}`);
});