var js2xmlparser = require("js2xmlparser");

class DataUtils {

  static getData(jsonData, req) {
    let type = req.query.type || 'json';
    let start = parseInt(req.query.start || -1);
    let limit = parseInt(req.query.limit || -1);

    let responseData = [];
    if (start === -1) {
      responseData = jsonData;
    } else {
      start = start <= 0 ? 1 : start;
      limit = start + limit;
      responseData = jsonData.slice(start, limit);
    }

    if (type === 'json') {
      //
    } else if (type === 'xml') {
      responseData = js2xmlparser.parse("results", responseData);
    } else {
      return 'invalid type';
    }

    return responseData;
  }

}

module.exports = DataUtils;
