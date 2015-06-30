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
    getAllContactsCb(cate.ret);
  });
};

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
    if (retObj.retErr) {
      console.log(retObj.retErr);
    }
    loadResourcesCb(retObj.ret);
  });
};

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
    loadResourcesCb(retObj.ret);
  });
};

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
    getAllCateCb(retObj.ret);
  });
 };

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
 exports.getAllDataByCate = function(getAllDataByCateCb, cate){
  data.getAllDataByCate(cate, function(retObj){
    getAllDataByCateCb(retObj.ret);
  });
 };

 //API rmDataById:通过URI删除数据
//返回字符串：
//成功返回success;
//失败返回失败原因
exports.rmDataByUri = function(rmDataByUriCb, uri){
  data.rmDataByUri(uri, function(retObj){
    rmDataByUriCb(retObj.ret);
  });
};

//API getDataByUri:通过Uri查看数据所有信息
//返回具体数据类型对象
exports.getDataByUri = function(getDataByUriCb, uri){
  data.getDataByUri(uri, function(retObj){
    getDataByUriCb(retObj.ret);
  });
};

exports.initDesktop = function(initDesktopCb){
  data.initDesktop(function(retObj){
    initDesktopCb(retObj.ret);
  });
};

exports.shellExec = function (shellExecCb, command){
  data.shellExec(function(retObj){
    shellExecCb(retObj.ret);
  }, command);
};

exports.renameDesktopFile = function (renameDesktopFileCb, oldName, newName) {
  data.renameDesktopFile(function(retObj){
    renameDesktopFileCb(retObj.ret);
  }, oldName, newName);
};
exports.readDesktopConfig = function (readDesktopConfigCb, sFileName){
  data.readDesktopConfig(function(retObj){
    readDesktopConfigCb(retObj.ret);
  }, sFileName);
};

exports.writeDesktopConfig = function (writeDesktopConfigCb, sFileName, oContent){
  data.writeDesktopConfig(function(retObj){
    writeDesktopConfigCb(retObj.ret);
  }, sFileName, oContent);
};

exports.moveToDesktopSingle = function (moveToDesktopSingleCb, sFilePath){
  data.moveToDesktopSingle(function(retObj){
    moveToDesktopSingleCb(retObj.ret);
  }, sFilePath);
};

exports.removeFileFromDB = function (removeFileFromDBCb, sFilePath){
  data.removeFileFromDB(function(retObj){
    removeFileFromDBCb(retObj.ret);
  }, sFilePath);
};

exports.removeFileFromDesk = function (removeFileFromDeskCb, sFilePath){
  data.removeFileFromDesk(function(retObj){
    removeFileFromDeskCb(retObj.ret);
  }, sFilePath);
};

exports.getFilesFromDesk = function (getFilesFromDeskCb){
  data.getFilesFromDesk(function(retObj){
    getFilesFromDeskCb(retObj.ret);
  });
};

exports.createFileOnDesk = function (createFileOnDeskCb, sContent){
  data.createFileOnDesk(function(retObj){
    createFileOnDeskCb(retObj.ret);
  }, sContent);
};

exports.renameFileOnDesk = function (renameFileOnDeskCb, oldName, newName){
  data.renameFileOnDesk(function(retObj){
    renameFileOnDeskCb(retObj.ret);
  }, oldName, newName);
};

exports.getMusicPicData = function (getMusicPicDataCb, filePath){
  data.getMusicPicData(function(retObj){
    getMusicPicDataCb(retObj.ret);
  }, filePath);
};

exports.getVideoThumbnail = function (getVideoThumbnailCb, sPath){
  data.getVideoThumbnail(function(retObj){
    getDataByUriCb(retObj.ret);
  }, sPath);
};

exports.updateDataValue = function (updateDataValueCb, item){
  data.updateDataValue(function(retObj){
    updateDataValueCb(retObj.ret);
  }, item);
};

exports.getDataByUri = function (getDataByUriCb, uri){
  data.getDataByUri(function(retObj){
    getDataByUriCb(retObj.ret);
  }, uri);
};

exports.getTagsByUri = function (getTagsByUriCb, sUri){
  data.getTagsByUri(function(retObj){
    getTagsByUriCb(retObj.ret);
  }, sUri);
};

exports.renameDataByUri = function (sUri, sNewName, renameDataByUriCb){
  data.renameDataByUri(sUri, sNewName, function(retObj){
    renameDataByUriCb(retObj.ret);
  });
};

exports.getTagsByUris = function (getTagsByUrisCb, oUris){
  data.getTagsByUris(function(retObj){
    getTagsByUrisCb(retObj.ret);
  }, oUris);
};

exports.setTagByUri = function (setTagByUriCb, oTags, sUri){
  data.setTagByUri(function(retObj){
    setTagByUriCb(retObj.ret);
  }, oTags, sUri);
};
exports.setRelativeTagByPath = function (setRelativeTagByPathCb, sFilePath, sTags){
  data.setRelativeTagByPath(function(retObj){
    setRelativeTagByPathCb(retObj.ret);
  }, sFilePath, sTags);
};
exports.getAllContacts = function (getAllContactsCb){
  data.getAllContacts(function(retObj){
    getAllContactsCb(retObj.ret);
  });
};

exports.getAllDesktopFile = function (getAllDesktopFileCb){
  data.getAllDesktopFile(function(retObj){
    getAllDesktopFileCb(retObj.ret);
  });
};

exports.linkAppToDesktop = function (linkAppToDesktopCb, sApp, sType){
  data.linkAppToDesktop(function(retObj){
    linkAppToDesktopCb(retObj.ret);
  }, sApp, sType);
};

exports.unlinkApp = function (unlinkAppCb, sDir){
  data.unlinkApp(function(retObj){
    unlinkAppCb(retObj.ret);
  },sDir);
};

exports.getAllVideo = function (getAllVideoCb){
  data.getAllVideo(function(retObj){
    getAllVideoCb(retObj.ret);
  });
};

exports.getAllMusic = function (getAllMusicCb){
  data.getAllMusic(function(retObj){
    getAllMusicCb(retObj.ret);
  });
};

exports.getIconPath = function (getIconPathCb, iconName, size){
  data.getIconPath(function(retObj){
    getIconPathCb(retObj.ret);
  }, iconName, size);
};