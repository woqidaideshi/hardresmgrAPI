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
    if(retObj.retErr){
      getAllContactsCb(retObj.retErr);
    }
    else{
      getAllContactsCb(null, retObj.ret);
    }
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
    loadResourcesCb(retObj.retErr, retObj.ret);
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
    if(retObj.retErr){
      loadContactCb(retObj.retErr);
    }
    else{
      loadContactCb(null, retObj.ret);
    }
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
    if(retObj.retErr){
      getAllCateCb(retObj.retErr);
    }
    else{
      getAllCateCb(null, retObj.ret);
    }
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
    getAllDataByCateCb(retObj.retErr, retObj.ret);
  });
 };

 //API rmDataById:通过URI删除数据
//返回字符串：
//成功返回success;
//失败返回失败原因
exports.rmDataByUri = function(rmDataByUriCb, uri){
  data.rmDataByUri(uri, function(retObj){
    if(retObj.retErr){
      rmDataByUriCb(retObj.retErr);
    }
    else{
      rmDataByUriCb(null, retObj.ret);
    }
  });
};

//API getDataByUri:通过Uri查看数据所有信息
//返回具体数据类型对象
exports.getDataByUri = function(getDataByUriCb, uri){
  data.getDataByUri(uri, function(retObj){
    getDataByUriCb(retObj.retErr, JSON.parse(retObj.ret));
  });
}


exports.initDesktop = function(initDesktopCb) {
  data.initDesktop(function(retObj) {
      initDesktopCb(retObj.retErr, retObj.ret);
  });
}

exports.renameDesktopFile = function(renameDesktopFileCb, oldName, newName) {
  var obj = new Object();
  obj.oldName = oldName;
  obj.newName = newName;
  data.renameDesktopFile(obj, function(retObj) {
    renameDesktopFileCb(retObj.retErr, retObj.ret);
  });
}

exports.readDesktopConfig = function(readDesktopConfigCb,filename) {
  data.readDesktopConfig(filename, function(retObj) {
    readDesktopConfigCb(retObj.retErr, retObj.ret);
  });
}

exports.writeDesktopConfig = function(writeDesktopConfigCb, sFileName, content) {
  var obj = {};
  obj.sFileName = sFileName;
  obj.oContent = content;
  data.writeDesktopConfig(obj, function(retObj) {
    writeDesktopConfigCb(retObj.retErr, retObj.ret);
  });
}

exports.moveToDesktopSingle = function(moveToDesktopSingleCb, sFilePath) {
  data.moveToDesktopSingle(sFilePath, function(retObj) {
    moveToDesktopSingleCb(retObj.retErr, retObj.ret);
  });
}

exports.createFileOnDesk = function(createFileOnDeskCb, sContent) {
  data.createFileOnDesk(sContent, function(retObj) {
    createFileOnDeskCb(retObj.retErr, retObj.ret);
  });
}

exports.shellExec = function (shellExecCb, command){
  data.shellExec(command, function(retObj){
    if(retObj.retErr){
      shellExecCb(retObj.retErr);
    }
    else{
      shellExecCb(null, retObj.ret);
    }
  });
};


exports.removeFileFromDB = function (removeFileFromDBCb, sFilePath){
  data.removeFileFromDB(function(retObj){
    if(retObj.retErr){
      removeFileFromDBCb(retObj.retErr);
    }
    else{
      removeFileFromDBCb(null, retObj.ret);
    }
  }, sFilePath);
};

exports.removeFileFromDesk = function (removeFileFromDeskCb, sFilePath){
  data.removeFileFromDesk(function(retObj){
    if(retObj.retErr){
      removeFileFromDeskCb(retObj.retErr);
    }
    else{
      removeFileFromDeskCb(null, retObj.ret);
    }
  }, sFilePath);
};

exports.getFilesFromDesk = function (getFilesFromDeskCb){
  data.getFilesFromDesk(function(retObj){
    if(retObj.retErr){
      getFilesFromDeskCb(retObj.retErr);
    }
    else{
      getFilesFromDeskCb(null, retObj.ret);
    }
  });
};


exports.renameFileOnDesk = function (renameFileOnDeskCb, oldName, newName){
  data.renameFileOnDesk(function(retObj){
    if(retObj.retErr){
      renameFileOnDeskCb(retObj.retErr);
    }
    else{
      renameFileOnDeskCb(null, retObj.ret);
    }
  }, oldName, newName);
};

exports.getMusicPicData = function (getMusicPicDataCb, filePath){
  data.getMusicPicData(filePath, function(retObj){
    getMusicPicDataCb(retObj.retErr, retObj.ret);
  });
};

exports.getVideoThumbnail = function (getVideoThumbnailCb, sPath){
  data.getVideoThumbnail(sPath, function(retObj){
    getVideoThumbnailCb(retObj.retErr, retObj.ret);
  });
};

exports.updateDataValue = function (updateDataValueCb, item){
  data.updateDataValue(function(retObj){
    if(retObj.retErr){
      updateDataValueCb(retObj.retErr);
    }
    else{
      updateDataValueCb(null, retObj.ret);
    }
  }, item);
};

exports.getDataByUri = function (getDataByUriCb, uri){
  data.getDataByUri(function(retObj){
    if(retObj.retErr){
      getDataByUriCb(retObj.retErr);
    }
    else{
      getDataByUriCb(null, retObj.ret);
    }
  }, uri);
};

exports.getTagsByUri = function (getTagsByUriCb, sUri){
  data.getTagsByUri(sUri, function(retObj) {
    getTagsByUriCb(retObj.retErr, JSON.parse(retObj.ret));
  });
};

exports.renameDataByUri = function (sUri, sNewName, renameDataByUriCb){
  data.renameDataByUri(sUri, sNewName, function(retObj){
    if(retObj.retErr){
      renameDataByUriCb(retObj.retErr);
    }
    else{
      renameDataByUriCb(null, retObj.ret);
    }
  });
};

exports.getTagsByUris = function (getTagsByUrisCb, oUris){
  data.getTagsByUris(oUris, function(retObj){
    getTagsByUrisCb(retObj.retErr, JSON.parse(retObj.ret));
  });
};

exports.setTagByUri = function (setTagByUriCb, oTags, sUri){
  data.setTagByUri(function(retObj){
    if(retObj.retErr){
      setTagByUriCb(retObj.retErr);
    }
    else{
      setTagByUriCb(null, retObj.ret);
    }
  }, oTags, sUri);
};
exports.setRelativeTagByPath = function (setRelativeTagByPathCb, sFilePath, sTags){
  data.setRelativeTagByPath(function(retObj){
    if(retObj.retErr){
      setRelativeTagByPathCb(retObj.retErr);
    }
    else{
      setRelativeTagByPathCb(null, retObj.ret);
    }
  }, sFilePath, sTags);
};
exports.getAllContacts = function (getAllContactsCb){
  data.getAllContacts(function(retObj){
    if(retObj.retErr){
      getAllContactsCb(retObj.retErr);
    }
    else{
      getAllContactsCb(null, retObj.ret);
    }
  });
};

exports.getAllDesktopFile = function (getAllDesktopFileCb){
  data.getAllDesktopFile(function(retObj){
    if(retObj.retErr){
      getAllDesktopFileCb(retObj.retErr);
    }
    else{
      getAllDesktopFileCb(null, retObj.ret);
    }
  });
};

exports.linkAppToDesktop = function (linkAppToDesktopCb, sApp, sType){
  data.linkAppToDesktop(function(retObj){
    if(retObj.retErr){
      linkAppToDesktopCb(retObj.retErr);
    }
    else{
      linkAppToDesktopCb(null, retObj.ret);
    }
  }, sApp, sType);
};

exports.unlinkApp = function (unlinkAppCb, sDir){
  data.unlinkApp(function(retObj){
    if(retObj.retErr){
      unlinkAppCb(retObj.retErr);
    }
    else{
      unlinkAppCb(null, retObj.ret);
    }
  },sDir);
};

exports.getAllVideo = function (getAllVideoCb){
  data.getAllVideo(function(retObj){
    if(retObj.retErr){
      getAllVideoCb(retObj.retErr);
    }
    else{
      getAllVideoCb(null, retObj.ret);
    }
  });
};

exports.getAllMusic = function (getAllMusicCb){
  data.getAllMusic(function(retObj){
    if(retObj.retErr){
      getAllMusicCb(retObj.retErr);
    }
    else{
      getAllMusicCb(null, retObj.ret);
    }
  });
};

exports.getIconPath = function (getIconPathCb, iconName, size){
  data.getIconPath(function(retObj){
    if(retObj.retErr){
      getIconPathCb(retObj.retErr);
    }
    else{
      getIconPathCb(null, retObj.ret);
    }
  }, iconName, size);
};


exports.getAllTagsByCategory = function (getAllTagsByCategoryCb, cate){
  data.getAllTagsByCategory(cate, function(retObj){
    getAllTagsByCategoryCb(retObj.retErr, retObj.ret);
  });
};

exports.getFilesByTags = function (getFilesByTagsCb, oTags){
  data.getFilesByTags(oTags, function(retObj){
    getFilesByTagsCb(retObj.retErr, retObj.ret);
  });
};