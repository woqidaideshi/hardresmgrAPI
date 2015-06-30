var data = require("./data.js")

// data.initDesktop(function(err,ret) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(ret);
//   }
// })


// var oldName = 'totem';
// var newName = 'test_totem';
// data.renameDesktopFile(function(err, ret) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(ret);
//   }
// }, oldName, newName)


// var path = "/home/xiquan/resources";
// data.loadResources(function(err, ret){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(ret);
//   }
// }, path)


data.getAllDataByCate(function(err, ret){
  if (err) {
    console.log(err);
  } else {
    //console.log(ret);
    // data.getDataByUri(function(err_, ret_){
    //   if (err) {
    //     console.log(err_);
    //   } else {
    //     console.log(ret_);
    //   }
    // }, ret[1].URI)

    data.

  }
}, "document");


// var filename = "Theme.conf";
// data.readDesktopConfig(function(err, ret) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(ret);
//   }
// }, filename)


// var filename = "Theme.conf";
// var content = {
//   tast: "good",
//   this: "is",
//   only: "aasdas",
//   test: "object_tesdast",
//   modify: 1,
//   aaa:"aaaaaaaaaaaaaaaa"
// };
// data.writeDesktopConfig(function(err, ret) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(ret);
//   }
// },filename,  content)

// var filepath = '/home/xiquan/testFile/testJSON.txt';
// data.moveToDesktopSingle(function(err, ret) {
//   if (err) {
//     console.log("Error: ", err);
//   } else {
//     console.log("Result: ", ret);
//   }
// }, filepath)

// var sContent = 'testtesttesttesttesttesttesttesttest';
// data.createFileOnDesk(function(err, ret) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(ret);
//   }
// }, sContent)