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


// data.getAllDataByCate(function(err, ret){
//   if (err) {
//     console.log(err);
//   } else {
//     //console.log(ret);
//     // data.getDataByUri(function(err_, ret_){
//     //   if (err) {
//     //     console.log(err_);
//     //   } else {
//     //     console.log(ret_);
//     //   }
//     // }, ret[1].URI)

//     // data.getTagsByUri(function(err_, ret_){
//     //   if (err) {
//     //     console.log(err_);
//     //   } else {
//     //     console.log(ret_);
//     //   }
//     // }, ret[1].URI)

//     data.getTagsByUris(function(err_, ret_){
//       if (err) {
//         console.log(err_);
//       } else {
//         console.log(ret_);
//       }
//     }, [ret[1].URI]);

//   }
// }, "document");


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

// var filepath = '/home/xiquan/.custard/resource/music/data/不要说话.mp3';
// data.getMusicPicData(function(err, ret) {
//   if (err) {
//     console.log("Error: ", err);
//   } else {
//     console.log("Result: ", ret);
//   }
// }, filepath)

// var filepath = '/home/xiquan/.custard/resource/video/data/movie.ogg';
// data.getVideoThumbnail(function(err, ret) {
//   if (err) {
//     console.log("Error: ", err);
//   } else {
//     console.log("Result: ", ret);
//   }
// }, filepath);

// data.getAllTagsByCategory(function(err, ret) {
//   if (err) {
//     console.log("Error: ", err);
//   } else {
//     console.log("Result: ", ret);
//   }
// }, "music");

// data.getFilesByTags(function(err, ret) {
//   if (err) {
//     console.log("Error: ", err);
//   } else {
//     console.log("Result: ", ret);
//   }
// }, ["music"]);

data.shellExec(function(err, ret) {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Result: ", ret);
  }
}, "echo lll");