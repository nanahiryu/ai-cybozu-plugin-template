import fs from "fs";
import packFromManifest from "@kintone/plugin-packer/from-manifest";

const generatePlugin = (manifestJSONPath, privateKey) => {
  return packFromManifest(manifestJSONPath, privateKey).then(
    (output) => output.privateKey
  );
};

generatePlugin("./plugin/manifest.json", "./key/private.ppk").then(
  (privateKey) => {
    fs.writeFileSync("./key/private.ppk", privateKey);
  }
);
