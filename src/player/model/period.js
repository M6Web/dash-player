import { AdaptationSet } from './adaptationSet';

export class Period {
  static createFrom(htmlNode) {
    return new Period(Array.from(htmlNode.getElementsByTagName('AdaptationSet')).map(AdaptationSet.createFrom));
  }

  constructor(adaptationSets) {
    this.adaptationSets = adaptationSets;
  }

  findAdaptationSetByType = type => this.adaptationSets.find(({ attributes: { mimeType } }) => mimeType.includes(type));
}
