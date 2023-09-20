"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSpell = exports.ControlSpellFlags = void 0;
const StaticData_1 = require("./StaticData");
const BaseMonster_1 = require("./BaseMonster");
const ModDefine_1 = require("@src/ModDefine");
/**用于必定成功的控制法术的flags */
exports.ControlSpellFlags = ["SILENT", "NO_HANDS", "NO_LEGS", "NO_FAIL"];
exports.BaseSpell = [
    {
        type: "SPELL",
        id: (0, ModDefine_1.genSpellID)("SummonTarget"),
        name: "召唤标靶",
        description: "召唤标靶怪物",
        flags: ["HOSTILE_SUMMON", ...exports.ControlSpellFlags],
        valid_targets: ["ground"],
        min_damage: 1,
        max_damage: 1,
        min_aoe: 1,
        max_aoe: 1,
        effect: "summon",
        effect_str: BaseMonster_1.TARGET_MON_ID,
        min_duration: 1,
        max_duration: 1,
        shape: "blast",
    },
    {
        type: "SPELL",
        id: (0, ModDefine_1.genSpellID)("InitCurrHP"),
        name: "初始化当前生命值",
        description: "初始化当前生命值变量",
        flags: exports.ControlSpellFlags,
        valid_targets: ["hostile"],
        min_aoe: 20,
        max_aoe: 20,
        effect: "effect_on_condition",
        effect_str: "CNPC_EOC_InitCurrHP",
        shape: "blast",
    },
    {
        type: "SPELL",
        id: (0, ModDefine_1.genSpellID)("CheckCurrHP"),
        name: "检测当前生命值",
        description: "检测当前生命值是否有变动",
        flags: exports.ControlSpellFlags,
        valid_targets: ["hostile"],
        min_aoe: 20,
        max_aoe: 20,
        effect: "effect_on_condition",
        effect_str: "CNPC_EOC_CheckCurrHP",
        shape: "blast",
    },
    {
        id: (0, ModDefine_1.genSpellID)("TestConeSpell_DMG"),
        type: "SPELL",
        name: "测试用锥形法术 伤害部分",
        description: "测试用锥形法术 伤害部分",
        effect: "attack",
        shape: "cone",
        valid_targets: ["hostile", "ground"],
        min_damage: 100,
        max_damage: 100,
        min_aoe: 90,
        min_range: 20,
        base_casting_time: 100,
        damage_type: "heat",
    },
    {
        id: (0, ModDefine_1.genSpellID)("TestConeSpell"),
        type: "SPELL",
        name: "测试用锥形法术",
        description: "测试用锥形法术",
        effect: "attack",
        shape: "cone",
        valid_targets: ["hostile"],
        flags: ["WONDER", "RANDOM_TARGET", ...exports.ControlSpellFlags],
        min_damage: 1,
        max_damage: 1,
        min_aoe: 90,
        min_range: 20,
        base_casting_time: 100,
        extra_effects: [{ id: (0, ModDefine_1.genSpellID)("TestConeSpell_DMG") }],
        targeted_monster_ids: [BaseMonster_1.TARGET_MON_ID],
    },
    {
        type: "SPELL",
        id: (0, ModDefine_1.genSpellID)("SpawnBaseNpc"),
        name: "生成测试NPC",
        description: "生成测试NPC",
        flags: exports.ControlSpellFlags,
        valid_targets: ["self"],
        effect: "effect_on_condition",
        effect_str: "CNPC_EOC_SpawnBaseNpc",
        shape: "blast",
    }
];
(0, StaticData_1.saveStaticData)('BaseSpell', exports.BaseSpell);
