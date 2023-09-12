"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genNpcInstanceID = void 0;
const Data_1 = require("../Data");
/**生成适用于此mod的 NPCID */
function genNpcInstanceID(id) {
    return `${Data_1.MOD_PREFIX}_NPC_${id}`;
}
exports.genNpcInstanceID = genNpcInstanceID;
