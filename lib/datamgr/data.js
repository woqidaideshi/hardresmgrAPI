var config = require('systemconfig'),
  path = require("path"),
  requireProxy = require('../../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync,
  data = requireProxy('data');

/**
 * @method getAllContacts
 *   获得所有联系人数组
 *
 * @param1 getAllContactsCb
 *   回调函数
 *   @result
 *     array[cate]: 联系人数组
 *        cate数据如下：
 *        cate{
 *           URI;
 *           version;
 *           name;
 *           photPath;
 *        }
 */
exports.getAllContacts = function(getAllContactsCb) {
  data.getAllContacts(function(cate) {
    getAllContactsCb(cate.retErr,cate.ret);
  });
}

/**
 * @method loadResources
 *   读取某个资源文件夹到数据库
 *
 * @param1 loadResourcesCb
 *   回调函数(err,result)
 *   @err
 *      string, specific err info
 *   @result
 *      array，object array, include file info of name exist file.
 *
 *   example:
 *   [{
 *     "origin_path": "/home/xiquan/WORK_DIRECTORY/resources/pictures/city1.jpg",
 *     "old_name": "city1.jpg",
 *     "re_name": "duplicate_at_2014年12月17日_下午1:30:40_duplicate_at_2014年12月17日_下午1:30:40_city1.jpg"
 *   }, {
 *     "origin_path": "/home/xiquan/WORK_DIRECTORY/resources/pictures/city3.jpg",
 *     "old_name": "city3.jpg",
 *     "re_name": "duplicate_at_2014年12月17日_下午1:30:40_duplicate_at_2014年12月17日_下午1:30:40_city3.jpg"
 *   }]
 *
 * @param2 path
 *   string，要加载资源的路径
 */
exports.loadResources = function(loadResourcesCb, path) {
  data.loadResources(path, function(retObj) {
     loadResourcesCb(retObj.retErr,retObj.ret);
  });
}

/**
 * @method loadContacts
 *   读取某个contact文件夹到数据库
 *
 * @param1 loadResourcesCb
 *   回调函数
 *   @result
 *      string，success代表成功，其他代表失败原因
 *
 * @param2 path
 *   string，要加载资源的路径
 */
exports.loadContacts = function(loadContactCb, path) {
  data.loadContacts(path, function(retObj) {
    loadContactCb(retObj.retErr,retObj.ret);
  });
}

exports.loadFile = function(loadFileCb, sFilePath) {
  data.loadFile(sFilePath, function(retObj) {
    loadFileCb(retObj.retErr,retObj.ret);
  });
}

/**
 * @method getAllCate
 *   查询所有基本分类
 *
 * @param1 getAllCateCb
 *   回调函数
 *   @result
 *     array[cate]: 分类数组
 *        cate{
 *           id;
 *           type;
 *           path;
 *        }
 */
 exports.getAllCate = function(getAllCateCb){
  data.getAllCate(function(retObj){
    getAllCateCb(retObj.retErr,retObj.ret);
  });
 }

 /**
 * @method getAllDataByCate
 *   查询某基本分类下的所有数据
 *
 * @param1 getAllDataByCateCb
 *   回调函数
 *   @result
 *     array[cate]: 数据数组
 *        如果是联系人，则返回数据如下：
 *        cate{
 *           URI;
 *           version;
 *           name;
 *           photPath;
 *        }
 *        如果是其他类型，则返回数据如下：
 *        cate{
 *           URI;
 *           version;
 *           filename;
 *           postfix;
 *           path;
 *        }
 */
 exports.getAllDataByCate = function(getAllDataByCateCb, cate) {
   data.getAllDataByCate(cate, function(retObj) {
     getAllDataByCateCb(retObj.retErr,retObj.ret)
   });
 }

 exports.getDataByPath = function(getDataByPathCb, sPath) {
   data.getDataByPath(sPath, function(retObj) {
     getDataByPathCb(retObj.retErr,JSON.parse(retObj.ret));
   });
 }

 exports.getRecentAccessData = function(getRecentAccessDataCb, category, num) {
   data.getRecentAccessData(category, num, function(retObj) {
     getRecentAccessDataCb(retObj.retErr, retObj.ret);
   });
 }

exports.getFilesByTags = function(getFilesByTagsCb, oTags) {
  data.getFilesByTags(oTags, function(retObj) {
    getFilesByTagsCb(retObj.retErr,retObj.ret);
  });
}

exports.getFilesByTagsInCategory = function(getFilesByTagsInCategoryCb, category, oTags) {
   data.getFilesByTagsInCategory(category, oTags, function(retObj) {
     getFilesByTagsInCategoryCb(retObj.retErr,retObj.ret);
   });
 }

exports.getDataByProperty = function(getDataByPropertyCb, options) {
  data.getDataByProperty(options, function(retObj) {
    getDataByPropertyCb(retObj.retErr,retObj.ret);
  });
}

 //API rmDataById:通过URI删除数据
//返回字符串：
//成功返回success;
//失败返回失败原因
exports.rmDataByUri = function(rmDataByUriCb, uri){
  data.rmDataByUri(uri, function(retObj){
    rmDataByUriCb(retObj.retErr,retObj.ret);
  });
}

//API getDataByUri:通过Uri查看数据所有信息
//返回具体数据类型对象
exports.getDataByUri = function(getDataByUriCb, uri){
  data.getDataByUri(uri, function(retObj){
    getDataByUriCb(retObj.retErr,retObj.ret);
  });
}

exports.openDataByUri = function(openDataByUriCb, uri) {
  data.openDataByUri(uri, function(retObj) {
    openDataByUriCb(retObj.retErr,retObj.ret);
  });
}