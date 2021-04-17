const axios = require("axios");
("use strict");
// https://github.com/TiagoDanin/Require-From-Web/blob/master/index.js
// https://github.com/floatdrop/require-from-string/blob/master/index.js

/* const Module = require("module")
const path = require("path") */
// code is BASE64 script based
// file name is string filenaming
module.exports = async function requireFromString(code, filename, opts) {
  if (typeof code !== "string") {
    // eslint-disable-next-line unicorn/prefer-type-error
    throw new Error("code must be a string, not " + typeof code);
  }
  // case when is base 64
  if (code.includes("http")) {
    console.log("hello new requared", code, filename, axios);
    const response = await axios.get(code); //.then((e) => e.data);

    console.log("response", response);
    let string = response.data.toString();
    if (code) {
      string += "\n" + code;
    }

    //const _module = new module.constructor();
    let m = new module.constructor();
    //_module.filename = code;
    console.log(m, module);
    m.filename = filename;
    m._compile(string, code);
  } else {
    let string = Buffer.from(code, "base64").toString();

    let m = new module.constructor();
    console.log(m, module);
    m.filename = filename;
    m._compile(string, filename);
  }

  console.log("klaus modales", module, globalThis.KLAUS);
  return { exports: module.exports, KLAUS: globalThis.KLAUS };
};
