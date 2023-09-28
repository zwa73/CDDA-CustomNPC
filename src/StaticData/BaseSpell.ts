import { JArray } from "@zwa73/utils";
import { saveStaticData } from "./StaticData";
import { TARGET_MON_ID } from "./BaseMonster";
import { genSpellID } from "@src/ModDefine";
import { Spell } from "..";


/**n格以内算作进入战斗 */
export const BATTLE_RANGE = 20;
/**n格以内酸作进入近战 */
export const MELEE_RANGE = 3;

/**用于必定成功的控制法术的flags */
export const CON_SPELL_FLAG = ["SILENT", "NO_HANDS", "NO_LEGS", "NO_FAIL"] as const;
export const BaseSpell:Spell[] = [
	{
		type: "SPELL",
		id: genSpellID("SummonSpellTarget"),
		name: "召唤法术标靶",
		description: "召唤法术标靶怪物",
		flags: ["HOSTILE_SUMMON",...CON_SPELL_FLAG],
		valid_targets: ["ground"],
		min_damage: 1,
		max_damage: 1,
		min_aoe: 1,
		max_aoe: 1,
		effect: "summon",
		effect_str: TARGET_MON_ID,
		min_duration: 1,
		max_duration: 1,
		shape: "blast",
	},
	{
		id: genSpellID("KillSpellTarget"),
		type: "SPELL",
		name: "清除法术标靶",
		description: "清除法术标靶",
		effect: "attack",
		shape: "blast",
		valid_targets: ["hostile"],
		flags: [...CON_SPELL_FLAG,"NO_EXPLOSION_SFX","IGNORE_WALLS","NON_MAGICAL"],
		min_damage: 100,
		max_damage: 100,
		damage_type:"pure",
		min_aoe: BATTLE_RANGE,
		targeted_monster_ids: [TARGET_MON_ID],
	},
	{
		type: "SPELL",
		id: genSpellID("InitCurrHP"),
		name: "初始化当前生命值",
		description: "初始化当前生命值变量",
		flags: [...CON_SPELL_FLAG],
		valid_targets: ["hostile"],
		min_aoe: BATTLE_RANGE,
		max_aoe: BATTLE_RANGE,
		effect: "effect_on_condition",
		effect_str: "CNPC_EOC_InitCurrHP",
		shape: "blast",
	},
	{
		type: "SPELL",
		id: genSpellID("CheckCurrHP_Range"),
		name: "检测当前生命值_远程",
		description: "检测战斗范围内的敌人当前生命值是否有变动",
		flags: [...CON_SPELL_FLAG],
		valid_targets: ["hostile"],
		min_aoe: BATTLE_RANGE,
		max_aoe: BATTLE_RANGE,
		effect: "effect_on_condition",
		effect_str: "CNPC_EOC_CheckCurrHP_Range",
		shape: "blast",
	},
	{
		type: "SPELL",
		id: genSpellID("CheckCurrHP_Melee"),
		name: "检测当前生命值_近战",
		description: "检测近战范围内的敌人当前生命值是否有变动",
		flags: [...CON_SPELL_FLAG],
		valid_targets: ["hostile"],
		min_aoe: MELEE_RANGE,
		max_aoe: MELEE_RANGE,
		effect: "effect_on_condition",
		effect_str: "CNPC_EOC_CheckCurrHP_Melee",
		shape: "blast",
	},
	{
		id: genSpellID("TestConeSpell_DMG"),
		type: "SPELL",
		name: "测试用锥形法术 伤害部分",
		description: "测试用锥形法术 伤害部分",
		effect: "attack",
		shape: "cone",
		valid_targets: ["hostile", "ground"],
		min_damage: 100,
		max_damage: 100,
		min_aoe: 90,
		min_range: BATTLE_RANGE,
		base_casting_time: 100,
		damage_type: "heat",
	},
	{
		id: genSpellID("TestConeSpell"),
		type: "SPELL",
		name: "测试用锥形法术",
		description: "测试用锥形法术",
		effect: "attack",
		shape: "cone",
		valid_targets: ["hostile"],
		flags: ["WONDER", "RANDOM_TARGET",...CON_SPELL_FLAG],
		min_damage: 1,
		max_damage: 1,
		min_aoe: 90,
		min_range: BATTLE_RANGE,
		base_casting_time: 100,
		extra_effects: [{ id: genSpellID("TestConeSpell_DMG") }],
		targeted_monster_ids: [TARGET_MON_ID],
	},
    {
		type: "SPELL",
		id: genSpellID("SpawnBaseNpc"),
		name: "生成测试NPC",
		description: "生成测试NPC",
		flags: [...CON_SPELL_FLAG],
		valid_targets: ["self"],
		effect: "effect_on_condition",
		effect_str: "CNPC_EOC_SpawnBaseNpc",
		shape: "blast",
	}
];


saveStaticData('BaseSpell',BaseSpell);