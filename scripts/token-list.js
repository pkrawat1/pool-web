"use strict";

const fs = require("fs");
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({
  auth: "your token",
});

(async () => {
  const res = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
    owner: "trustwallet",
      repo: "assets",
      tree_sha: "b2b2108f7f86c7e22efdec6f446b35527be8f3d9",
      truncated: true
  })
  // console.log(JSON.stringify(res))
  const tokenIds = res.data.tree.reduce((acc, { path: fileName }) => {
    acc[fileName.toLowerCase()] = fileName;
    return acc;
  }, {});
  fs.writeFileSync("./lib/token-list.json", JSON.stringify(tokenIds));
})();

// https
//   .get(options, (res) => {
//     let data = "";
//     res.on("data", (chunk) => {
//       data += chunk;
//     });
//     res.on("end", () => {
//       console.log(data);
//       data = JSON.parse(data);
//       const tokenList = data.tokens.reduce((acc, token) => {
//         acc[token.address.toLowerCase()] = token.address;
//         return acc;
//       }, {});
//       console.log(tokenList);
//       fs.writeFileSync("./lib/token-list.json", JSON.stringify(tokenList));
//     });
//   })
//   .on("error", (err) => {
//     console.log(err.message);
//   });
