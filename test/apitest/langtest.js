function APIcall(callback) {
  callback();
}

function example() {
  var p = document.getElementById("inputDiv");
  //API function call here.
  APIcall(function() {
    p.innerHTML = "Hi this is example DEMO.";
  });
}

function getInitInfo() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['lang'], function(lang) {
    lang.getInitInfo(function(err, ret) {
      if (err) {
        p.innerHTML = err;
      };
      p.innerHTML = JSON.stringify(ret);
    }, 'desktop');
  });
}

function getLang() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['lang'], function(lang) {
    lang.getLang(function(err, ret) {
      if (err) {
        p.innerHTML = err;
      };
      p.innerHTML = JSON.stringify(ret);
    }, '');
  });
}

function getLangByName() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['lang'], function(lang) {
    lang.getLangByName(function(err, ret) {
      if (err) {
        p.innerHTML = err;
      };
      p.innerHTML = JSON.stringify(ret);
    }, 'desktop');
  });
}

function getLangList() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['lang'], function(lang) {
    lang.getLangList(function(err, ret) {
      if (err) {
        p.innerHTML = err;
      };
      p.innerHTML = JSON.stringify(ret);
    });
  });
}

function setLocale() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['lang'], function(lang) {
    lang.setLocale(function(err, ret) {
      if (err) {
        p.innerHTML = err;
      };
      p.innerHTML = 'set locale: success!';
    }, 'zh_CN');
  });
}

function getCurLocale() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['lang'], function(lang) {
    lang.getCurLocale(function(err, ret) {
      if (err) {
        p.innerHTML = err;
      };
      p.innerHTML = ret;
    });
  });
}

function addLang() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['lang'], function(lang) {
    var langString = {
      "name": "en",
      "path": "/home/qiushi/work/app/demo-rio/service/lang/implements/langs/en"
    };
    lang.addLang(function(err, ret) {
      if (err) {
        p.innerHTML = err;
      };
      p.innerHTML = 'add Lang: success!';
    }, langString);
  });
}

function removeLang() {
  var p = document.getElementById("inputDiv");
  WDC.requireAPI(['lang'], function(lang) {
    var langString = {
      "name": "en",
      "path": "/home/qiushi/.local/share/webde/langs/en"
    };
    lang.removeLang(function(err, ret) {
      if (err) {
        p.innerHTML = err;
      };
      p.innerHTML = 'remove Lang: success!';
    }, langString);
  });
}