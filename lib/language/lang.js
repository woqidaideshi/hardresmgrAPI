var config = require('systemconfig'),
  utils = require('utils'),
  flowctl = utils.Flowctl(),
  path = require("path"),
  requireProxy = require('../../../../app/demo-rio/sdk/lib/requireProxy').requireProxySync,
  lang = requireProxy('lang');

/**
 * @method getInitInfo
 *    获取当前的语言环境、可用的语言列表、当前语言文件的具体信息
 *    目前的参数name是desktop
 */
exports.getInitInfo = function(getInitInfoCB, name) {
  lang.getInitInfo(name, function(ret) {
    if (ret.err) return getInitInfoCB(ret.err);
    getInitInfoCB(ret.ret);
  });
}

/**
 * @method getLang
 *   获取指定路径的语言配置文件，如果path为空字符串，则读取
 *   .local/share/webde/langs/locale.conf
 */
exports.getLang = function(getLangCB, path) {
  lang.getLang(path, function(ret) {
    if (ret.err) return getLangCB(ret.err);
    getLangCB(ret.ret);
  });
}

/**
 * @method getLangByName
 *   获取指定的语言文件
 *   目前的参数name是desktop
 */
exports.getLangByName = function(getLangByNameCB, name) {
  lang.getLangByName(name, function(ret) {
    if (ret.err) return getLangByNameCB(ret.err);
    getLangByNameCB(ret.ret);
  });
};

/**
 * @method getLangList
 *   获取当前可用的语言列表
 */
exports.getLangList = function(getLangListCB) {
  lang.getLangList(function(ret) {
    if (ret.err) return getLangListCB(ret.err);
    getLangListCB(ret.ret);
  });
};

/**
 * @method setLocale
 *   设置当前的语言环境
 *   目前的参数locale支持en和zh_CN
 */
exports.setLocale = function(setLocaleCB, locale) {
  lang.setLocale(locale, function(ret) {
    if (ret.err) return setLocaleCB(ret.err);
    setLocaleCB(ret.ret);
  });
}

/**
 * @method getLocale
 *   获取当前的语言环境
 */
exports.getLocale = function(getLocaleCB) {
  lang.getLocale(function(ret) {
    if (ret.err) return getLocaleCB(ret.err);
    getLocaleCB(ret.ret);
  });
}

/**
 * @method addLang
 *   添加一种语言文件
 *   langObject   {"name":langname,"path":langpath}
 *    将langpath指向的语言文件移动到.local/share/webde/langs
 *    同时将langname添加到locale.conf中的langList
 */
exports.addLang = function(addLangCB, langObject) {
  lang.addLang(langObject, function(ret) {
    if (ret.err) return addLangCB(ret.err);
    addLangCB(ret.ret);
  });
}

/**
 * @method removeLang
 *   删除指定的语言文件
 *   langObject   {"name":langname,"path":langpath}
 *    将.local/share/webde/langs中的指定文件删除
 *    同时将langname从locale.conf的langList中删除
 */
exports.removeLang = function(removeLangCB, langObject) {
  lang.removeLang(langObject, function(ret) {
    if (ret.err) return removeLangCB(ret.err);
    removeLangCB(ret.ret);
  });
}


var listeners = [];

function emit(param) {
  for (var listener in listeners) {
    listeners[listener].call(this, param);
  }
}

(function eventLoopInit() {
  lang.on('change', function(ret) {
    ret.event = 'change';
    emit(ret);
  });
  lang.on('add', function(ret) {
    ret.event = 'add';
    emit(ret);
  });
  lang.on('remove', function(ret) {
    ret.event = 'remove';
    emit(ret);
  });
})();

/**
 * Add listener for locale change
 * addListenerCB: function(err)
 *    err: error discription or null
 * listener: function(data)
 *    data: {
 *      event: the more detail event(change|add|remove)
 *      locale: current locale|new locale|removed locale
 *    }
 */
exports.addListener = function(addListenerCB, listener) {
  if (typeof listener !== 'function')
    return addListenerCB('listener must be a function');
  listeners.push(listener);
  addListenerCB(null);
}

/**
 * Remove listener from certain event
 * removeListenerCB: function(err)
 *    err: error discription or null
 * listener: function(data)
 *    data: {
 *      event: the more detail event(change|add|remove)
 *      locale: current locale|new locale|removed locale
 *    }
 */
exports.removeListener = function(removeListenerCB, listener) {
  if (typeof listener !== 'function')
    return removeListenerCB('listener must be a function');
  for (var i = 0; i < listeners.length; ++i) {
    if (listener == listeners[i]) {
      listeners.splice(i, 1);
      return removeListenerCB(null);
    }
  }
  removeListenerCB('listener not regiestered');
}
