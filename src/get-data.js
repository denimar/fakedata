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
      start = start <= 0 ? 0 : start;
      limit = start + limit;
      responseData = jsonData.slice(start, limit);
    }

    // console.log('--------------------');
    // console.log('--------------------');
    // console.log(req.query);
    // console.log('--------------------');
    // console.log('--------------------');


    let jsonResponse = null;
    if (req.url.indexOf('/tree/') !== -1) {

      let lazyLoad = JSON.parse(req.query.lazyLoad || false);
      if (lazyLoad) {
        let item = req.query.item;
        if (item) {
          jsonResponse = _getChildren(responseData, JSON.parse(item));
        } else {
          //throw new Error('You have to set "item" param when lazy load.');
        }
      } else {
        jsonResponse = responseData;
      }
    } else {
      jsonResponse = {
        success: true,
        data: responseData,
        total: jsonData.length
      };
    }


    if (type === 'json') {
      //
    } else if (type === 'xml') {
      jsonResponse = js2xmlparser.parse("results", jsonResponse);
    } else {
      return 'invalid type';
    }

    return jsonResponse;
  }

}

function _findItem(data, item) {
  if (data) {
    if (item.root) {
      return {children: data};
    } else {
      if (data) {
        for (let i = 0 ; i < data.length ; i++) {
          let dataItem = data[i];
          if (dataItem.id === item.id) {
            return dataItem;
          } else {
            let foundItem = _findItem(dataItem.children, item)
            if (foundItem) {
              return foundItem;
            }
          }
        }
      }
    }
  }
  return null;
}

function _getChildren(allData, item) {
  let foundItem = _findItem(allData, item);

  let childrenToReturn = [];
  let children = foundItem.children || [];

  // console.log('++++++++++++++++++++++');
  // console.log('++++++++++++++++++++++');
  // console.log(children);
  // console.log('++++++++++++++++++++++');
  // console.log('++++++++++++++++++++++');

  for (let i = 0 ; i < children.length ; i++) {
    let child = children[i];
    childrenToReturn.push({
      id: child.id,
      text: child.text,
      isLeaf: child.isLeaf
    });
  }
  return childrenToReturn;
}


module.exports = DataUtils;
