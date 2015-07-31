var config = require('systemconfig'),
  path = require("path"),
  requireProxy = require('../../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync,
  data = requireProxy('data'),
  exec = require('child_process').exec,
  fs = require('fs');
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
  data.getAllContacts(function(retObj) {
    if (retObj.ret) {
      var _ret = JSON.parse(retObj.ret);
    } else {
      var _ret = [];
    }
    getAllContactsCb(retObj.retErr,_ret);
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
    loadContactCb(retObj.retErr,retObj.ret);
  });
}

exports.loadFile = function(loadFileCb, sFilePath) {
  data.loadFile(sFilePath, function(retObj) {
    loadFileCb(retObj.retErr,retObj.ret);
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
    getAllCateCb(retObj.retErr, JSON.parse(retObj.ret));
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
 exports.getAllDataByCate = function(getAllDataByCateCb, cate) {
   data.getAllDataByCate(cate, function(retObj) {
     if (retObj.ret) {
       var _ret = JSON.parse(retObj.ret);
     } else {
       var _ret = [];
     }
     getAllDataByCateCb(retObj.retErr, _ret);
   });
 }

 exports.getDataByPath = function(getDataByPathCb, sPath) {
   data.getDataByPath(sPath, function(retObj) {
     getDataByPathCb(retObj.retErr,JSON.parse(retObj.ret));
   });
 }

 exports.getRecentAccessData = function(getRecentAccessDataCb, category, num) {
   var obj = new Object();
   obj.category = category;
   obj.num = num;
   data.getRecentAccessData(obj, function(retObj) {
     if (retObj.ret) {
       var _ret = JSON.parse(retObj.ret);
     } else {
       var _ret = [];
     }
     getRecentAccessDataCb(retObj.retErr, _ret);
   });
 }

exports.getFilesByTags = function(getFilesByTagsCb, oTags) {
  data.getFilesByTags(oTags, function(retObj) {
     if (retObj.ret) {
       var _ret = JSON.parse(retObj.ret);
     } else {
       var _ret = [];
     }
    getFilesByTagsCb(retObj.retErr,_ret);
  });
}

exports.getFilesByTagsInCategory = function(getFilesByTagsInCategoryCb, category, oTags) {
  var obj = new Object();
  obj.category = category;
  obj.oTags = oTags;
  data.getFilesByTagsInCategory(obj, function(retObj) {
     if (retObj.ret) {
       var _ret = JSON.parse(retObj.ret);
     } else {
       var _ret = [];
     }
    getFilesByTagsInCategoryCb(retObj.retErr, _ret);
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
};

//API getDataByUri:通过Uri查看数据所有信息
//返回具体数据类型对象
exports.getDataByUri = function(getDataByUriCb, uri){
  data.getDataByUri(uri, function(retObj){
     if (retObj.ret) {
       var _ret = JSON.parse(retObj.ret);
     } else {
       var _ret = [];
     }
    getDataByUriCb(retObj.retErr, _ret);
  });
}

exports.openDataByUri = function(openDataByUriCb, uri) {
  data.openDataByUri(uri, function(retObj) {
    openDataByUriCb(retObj.retErr,retObj.ret);
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
    if(retObj.retErr){
      readDesktopConfigCb(retObj.retErr);
    }
    else{
      readDesktopConfigCb(null, retObj.ret);
    }
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
    if (retObj.ret) {
      var _ret = JSON.parse(retObj.ret);
    } else {
      var _ret = [];
    }
    moveToDesktopSingleCb(retObj.retErr, _ret);
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
      if(retObj.ret){
        var _ret = retObj.ret;
      }else{
        var _ret = "not found";
      }
      shellExecCb(null, _ret);
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

function getMusicPicData(filePath, callback) {
  var ID3 = require('id3v2-parser');
  var stream = require('fs').createReadStream(filePath);
  var parser = stream.pipe(new ID3());
  var picData = false;

  function backupIcon(callback_) {
    var option = {
      encoding: 'base64'
    }
    var backup_icon = path.join(config.APPBASEPATH, '/demo-rio/newdatamgr/icons/music_180_180.png');
    fs.readFile(backup_icon, option, function(err, buffer_base64) {
      if (err) {
        return callback_(err, null);
      }
      return callback_(null, buffer_base64);
    })
  }
  parser.on('error', function() {
    //if error, then read a backup icon in local.
    return backupIcon(callback);
  });
  parser.on('data', function(tag) {
    if (tag.type == 'APIC') {
      picData = (tag.value.data).toString('base64');
    }
  });
  stream.on('close', function() {
    if (picData) {
      return callback(null, picData);
    } else {
      //if no music thumbnail found, then read a backup icon in local.
      return backupIcon(callback);
    }
  });
}
exports.getMusicPicData = getMusicPicData;

exports.getMusicPicData = function(getMusicPicDataCb, filePath) {
  getMusicPicData(filePath, function(err, ret) {
    if (err) {
      getMusicPicDataCb(err);
    } else {
      getMusicPicDataCb(null, ret);
    }
  });
};

function readVideoThumbnail(sPath, callback) {
  var fs_extra =require('fs-extra');

  function backupIcon(callback) {
    //if thumbnail read err, then read a backup icon in local.
    var option = {
      encoding: 'base64'
    }
    var backup_icon = path.join(config.APPBASEPATH, '/demo-rio/newdatamgr/icons/video_320_180.png');
    fs.readFile(backup_icon, option, function(err, buffer_base64) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, buffer_base64);
    })
  }

  fs.open(sPath, 'r', function(err, fd) {
    if (err) {
      return callback(err, null);
    }
    fs.closeSync(fd);
    var tmpBaseDir = path.join(process.env["HOME"], '/tmp');
    fs_extra.ensureDir(tmpBaseDir, function(err) {
      if (err) {
        return callback(err, null);
      }
      var name = path.basename(sPath) + '_snapshot.png';
      var tmpDir = path.join(tmpBaseDir, name);
      var sCommand = 'avconv -i ' + sPath + ' -f image2 -ss 00:05 -vframes 1 -s 640X320 ' + tmpDir;
      exec(sCommand, function(err) {
        if (err) {
          return backupIcon(callback);
        }
        var option = {
          encoding: 'base64'
        }
        fs.readFile(tmpDir, option, function(err, buffer_base64) {
          if (err) {
            return backupIcon(callback);
          } else {
            //remove tmp thumbnail file after scuccessfully get it.
            fs_extra.remove(tmpDir, function(err) {
              if (err) {
                return backupIcon(callback);
              } else {
                return callback(null, buffer_base64);
              }
            })
          }
        })
      })
    })
  })
}
exports.readVideoThumbnail = readVideoThumbnail;

exports.getVideoThumbnail = function (getVideoThumbnailCb, sPath){
  readVideoThumbnail(sPath, function(err, ret){
    getVideoThumbnailCb(err, ret);
  });
};

exports.updateDataValue = function (updateDataValueCb, item){
  item = JSON.stringify(item);
  data.updateDataValue(item, function(retObj){
    if(retObj.retErr){
      updateDataValueCb(retObj.retErr);
    }
    else{
      updateDataValueCb(null, retObj.ret);
    }
  });
};

exports.getTagsByUri = function(getTagsByUriCb, sUri) {
  data.getTagsByUri(sUri, function(retObj) {
    if (retObj.ret) {
      var _ret = JSON.parse(retObj.ret);
    } else {
      var _ret = [];
    }
    getTagsByUriCb(retObj.retErr, _ret);
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
    if (retObj.ret) {
      var _ret = JSON.parse(retObj.ret);
    } else {
      var _ret = [];
    }
    getTagsByUrisCb(retObj.retErr, _ret);
  });
};

exports.setTagByUri = function(setTagByUriCb, oTags, sUri) {
  var obj = new Object();
  obj.oTags = oTags;
  obj.sUri = sUri;
  data.setTagByUri(obj, function(retObj) {
    if (retObj.retErr) {
      setTagByUriCb(retObj.retErr);
    } else {
      setTagByUriCb(null, retObj.ret);
    }
  });
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

exports.getAllDesktopFile = function (getAllDesktopFileCb){
  data.getAllDesktopFile(function(retObj){
    if(retObj.retErr){
      getAllDesktopFileCb(retObj.retErr);
    }
    else{
      getAllDesktopFileCb(null, JSON.parse(retObj.ret));
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
    if (retObj.ret) {
      var _ret = JSON.parse(retObj.ret);
    } else {
      var _ret = [];
    }
    getAllVideoCb(retObj.retErr, _ret);
  });
};

exports.getAllMusic = function (getAllMusicCb){
  data.getAllMusic(function(retObj){
    if (retObj.ret) {
      var _ret = JSON.parse(retObj.ret);
    } else {
      var _ret = [];
    }
    getAllMusicCb(retObj.retErr, _ret);
  });
};

exports.getIconPath = function(getIconPathCb, iconName, size) {
  function readTheme(callback) {
    var _path = path.join(config.RESOURCEPATH, '/desktop/data/Theme.conf');
    fs.readFile(_path, function(err, result) {
      if (err) {
        return callback(err);
      }
      return callback(null, JSON.parse(result));
    })
  }

  function _getIconPath(iconName_, size_, callback) {
    if (typeof callback !== "function")
      throw "Bad type of callback!!";

    function readConfCb(err, result) {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      var iconTheme = result['icontheme']['name'];

      getIconPathWithTheme(iconName_, size_, iconTheme, function(err_, iconPath_) {
        if (err_) {
          getIconPathWithTheme(iconName_, size_, "hicolor", function(err_, iconPath_) {
            if (err_) {
              exec('locate ' + iconName_ + ' | grep -E \"\.(png|svg)$\"', function(err, stdout, stderr) {
                if (err || stdout == '') return callback('Not found');
                return callback(null, stdout.replace(/\n$/, '').split('\n').reverse());
              });
            } else {
              callback(null, iconPath_);
            }
          });
        } else {
          callback(null, iconPath_);
        }
      });
    }
    readTheme(readConfCb);
  }

  function getIconPathWithTheme(iconName_, size_, themeName_, callback) {
    if (typeof callback != 'function')
      throw 'Bad type of function';
    var HOME_DIR_ICON = path.join(process.env["HOME"], "/.local/share/icons/");
    var XDG_DATA_DIRS = process.env["XDG_DATA_DIRS"].split(':');
    var _iconSearchPath = [];
    _iconSearchPath.push(HOME_DIR_ICON);
    for (var i = 0; i < XDG_DATA_DIRS.length; i++) {
      var item = path.join(XDG_DATA_DIRS[i], "/icons/");
      _iconSearchPath.push(item);
    }
    _iconSearchPath.push("/usr/share/pixmaps")

    var findIcon = function(index_) {
      if (index_ == _iconSearchPath.length) {
        return callback('Not found');
      }
      var _path = _iconSearchPath[index_];
      if (index_ < _iconSearchPath.length - 1) _path += themeName_;
      fs.exists(_path, function(exists_) {
        if (exists_) {
          var tmp = 'find ' + _path + ' -regextype \"posix-egrep\" -regex \".*' + ((index_ < _iconSearchPath.length - 1) ? size_ : '') + '.*/(.*/)*' + iconName_ + '\.(svg|png)$\"';
          exec(tmp, function(err, stdout, stderr) {
            if (err) {
              console.log(err, stdout, stderr);
              return;
            }
            if (stdout == '') {
              fs.readFile(_path + '/index.theme', 'utf-8', function(err, data) {
                var _parents = [];
                if (err) {
                  //console.log(err);
                } else {
                  var lines = data.split('\n');
                  for (var i = 0; i < lines.length; ++i) {
                    if (lines[i].substr(0, 7) == "Inherits") {
                      attr = lines[i].split('=');
                      _parents = attr[1].split(',');
                    }
                  }
                }
                //recursive try to find from parents
                var findFromParent = function(index__) {
                  if (index__ == _parents.length) return;
                  getIconPathWithTheme(iconName_, size_, _parents[index__], function(err_, iconPath_) {
                    if (err_) {
                      findFromParent(index__ + 1);
                    } else {
                      callback(null, iconPath_);
                    }
                  });
                };
                findFromParent(0);
                //if not fonud
                findIcon(index_ + 1);
              });
            } else {
              callback(null, stdout.split('\n'));
            }
          });
        } else {
          findIcon(index_ + 1);
        }
      });
    };
    findIcon(0);
  }
  _getIconPath(iconName, size, getIconPathCb);
};


exports.getAllTagsByCategory = function (getAllTagsByCategoryCb, cate){
  data.getAllTagsByCategory(cate, function(retObj){
    if (retObj.ret) {
      var _ret = JSON.parse(retObj.ret);
    } else {
      var _ret = [];
    }
    getAllTagsByCategoryCb(retObj.retErr, _ret);
  });
};



exports.createFile = function(createFileCb, input, category) {
  var obj = new Object();
  obj.input = input;
  obj.category = category;
  data.createFile(obj, function(retObj) {
    createFileCb(retObj.retErr, retObj.ret);
  });
};

exports.rmTagsByUri = function (rmTagsByUriCb, sTag, oUri) {
  var obj = new Object();
  obj.sTag = sTag;
  obj.oUri = oUri;
  data.rmTagsByUri(obj, function(retObj) {
    rmTagsByUriCb(retObj.retErr, retObj.ret);
  });
};

exports.getTmpPath = function(getTmpPathCb) {
  console.log("Request handler 'getTmpPath' was called.");
  data.getTmpPath(function(retObj) {
    if (retObj.ret) {
      var _ret = retObj.ret;//JSON.parse(retObj.ret);
    } else {
      var _ret = "notfound";
    }
    getTmpPathCb(retObj.retErr, _ret);
  });
};


<<<<<<< HEAD
exports.exportData = function(exportDataCb, sEdition, sPath){
  console.log("Request handler 'exportData' was called.");
  var obj = new Object();
  obj.sEdition = sEdition;
  obj.sPath = sPath;
  data.exportData(obj, function(retObj) {
    var _ret;
    if (retObj.ret) {
      _ret = retObj.ret;
    } else {
      _ret = "notfound";
    }
    exportDataCb(retObj.retErr, _ret);
  });
};

exports.importData = function(importDataCb, sPath){
  console.log("Request handler 'importData' was called.");
  data.importData(sPath, function(retObj) {
    var _ret;
    if (retObj.ret) {
      _ret = retObj.ret;
    } else {
      _ret = "notfound";
    }
    importDataCb(retObj.retErr, _ret);
      });
};

exports.addPreTag = function(addPreTagCb, tag, category) {
  console.log("Request handler 'addPreTag' was called.");
  var obj = new Object();
  obj.tag = tag;
  obj.category = category;
  data.addPreTag(obj, function(retObj) {
    if (retObj.retErr) {
      addPreTagCb(retObj.retErr);
    } else {
      addPreTagCb(null, retObj.ret);
    }
  });
};


exports.getServerAddress = function(getServerAddressCb) {
  console.log("Request handler 'getServerAddress' was called.");
  data.getServerAddress(function(retObj) {
    if (retObj.ret) {
      var _ret = JSON.parse(retObj.ret);
    } else {
      var _ret = "notfound";
    }
    getServerAddressCb(retObj.retErr, _ret);
  });
};

