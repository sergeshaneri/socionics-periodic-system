import type {
  Lang,
  ObjectType,
  DisplayObject,
  Tim,
  TraitExplanation,
} from '../types';
import {
  HADAMARD_MATRIX,
  POLES_ADJ_RU,
  POLES_ADJ_EN,
} from '../data';

export interface TraitExplanationParams {
  traitIdx: number;
  itemIdx: number;
  lang: Lang;
  objectType: ObjectType;
  currentObjects: DisplayObject[];
  tims: Tim[];
  itrs: string[];
  traits: string[];
  poles: string[][];
}

/**
 * Builds a full TraitExplanation for the tooltip.
 * Pure function: no React, no DOM.
 * Returns null if indices are out of bounds.
 */
export function getTraitExplanation(
  params: TraitExplanationParams
): TraitExplanation | null {
  const {
    traitIdx,
    itemIdx,
    lang,
    objectType,
    currentObjects,
    tims,
    itrs,
    traits,
    poles,
  } = params;

  if (itemIdx >= HADAMARD_MATRIX.length) return null;
  if (traitIdx >= HADAMARD_MATRIX[0].length) return null;
  const bit = HADAMARD_MATRIX[itemIdx][traitIdx];

  const baseNames = {
    TIM: lang === 'RU' ? 'ИЛЭ' : 'ILE',
    ITR: lang === 'RU' ? 'Тождеству' : 'Identity',
    RD: lang === 'RU' ? 'Существованию' : 'Existence',
  } as const;

  let subjectName = '';
  let poleName = '';
  let fullTrait = '';
  let description = '';

  if (objectType === 'TIM') {
    const activeTIM = currentObjects[itemIdx];
    subjectName = `${activeTIM.id} (${activeTIM.name})`;
    poleName = poles[traitIdx] ? poles[traitIdx][bit === 1 ? 0 : 1] : '';
    fullTrait = poles[traitIdx]
      ? `${poles[traitIdx][0]}/${poles[traitIdx][1]}`
      : traits[traitIdx] || '';

    description =
      lang === 'RU'
        ? `В системе Чурюмова этот признак является ключевой мерностью в структуре ${activeTIM.id}. Психоинформационный паттерн разворачивается согласно фрактальной динамике (текст будет дополнен позже).`
        : `In Churyumov's system, this trait is a key dimension in the structure of ${activeTIM.id}. Description will be added by owner later (placeholder).`;

    if (lang === 'RU') {
      if (activeTIM.id === 'СЭИ' && traitIdx === 2 && bit === 1) {
        description =
          'Дюма чаще рассчитывают на то, что все может быть так как раньше не было, надеются новому опыту. Не то чтобы они не опираются на прошлый опыт, просто они не зациклены на нем.';
      } else if (activeTIM.id === 'ЭИИ' && traitIdx === 4 && bit === 0) {
        description =
          'Достоевские имеют тенденцию обращать внимание на характеристики объектов, которые обусловлены принадлежностями к группам. Это можно назвать "инклюзивные" характеристики. Они включены в свойства объекта и всех других объектов, которые принадлежат к группе.';
      }
    }
  } else if (objectType === 'RD') {
    const targetTIM = tims[traitIdx];
    subjectName = targetTIM.id;
    poleName = poles[itemIdx] ? poles[itemIdx][bit === 1 ? 0 : 1] : '';
    fullTrait = poles[itemIdx]
      ? `${poles[itemIdx][0]}/${poles[itemIdx][1]}`
      : traits[itemIdx] || '';

    description =
      lang === 'RU'
        ? `Этот паттерн показывает положение типа ${targetTIM.id} относительно дихотомии ${fullTrait}.`
        : `This pattern shows the position of type ${targetTIM.id} relative to the dichotomy ${fullTrait}.`;

    if (lang === 'RU') {
      if (itemIdx === 4 && traitIdx === 15) {
        description =
          'Достоевские имеют тенденцию обращать внимание на характеристики объектов, которые обусловлены принадлежностями к группам. Это можно назвать "инклюзивные" характеристики. Они включены в свойства объекта и всех других объектов, которые принадлежат к группе.';
      }
      if (itemIdx === 1 && traitIdx === 14) {
        description =
          'Экстраверты более шумные и активные, легко тратят энергию, заводят новые знакомства. Конкретно про Штира можно сказать, что он довольно глубоко считывает внешнюю информацию о деятельности и технологиях.';
      }
    }
  } else {
    const activeITR = currentObjects[itemIdx];
    const polesAdj = lang === 'RU' ? POLES_ADJ_RU : POLES_ADJ_EN;
    subjectName = activeITR.id;
    poleName = polesAdj[traitIdx] ? polesAdj[traitIdx][bit === 1 ? 0 : 1] : '';
    fullTrait = poles[traitIdx]
      ? `${poles[traitIdx][0]}/${poles[traitIdx][1]}`
      : traits[traitIdx] || '';
    description =
      lang === 'RU'
        ? 'Описание интертипного отношения в данной мерности.'
        : 'Description of the intertype relation in this dimension.';
  }

  return {
    subjectName,
    poleName,
    bit,
    description,
    fullTrait,
    correspondingTim: tims[traitIdx],
    correspondingItr: itrs[traitIdx],
    correspondingRd: poles[traitIdx]
      ? `${poles[traitIdx][0]}/${poles[traitIdx][1]}`
      : traits[traitIdx] || '',
    equivalenceBase: baseNames[objectType],
  };
}
