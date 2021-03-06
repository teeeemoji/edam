/**
 * @file merge
 * @author Cuttle Cong
 * @date 2018/3/22
 * @description
 */
import * as _ from 'lodash'

export default function getExtendsMerge(
  option: { concatKeys: string[] | '*' } = { concatKeys: [] }
) {
  return function(source, ...objects: Array<object>) {
    return _.mergeWith(source, ...objects, function customizer(
      sourceVal,
      extendsVal,
      key
    ) {
      if (
        (option.concatKeys === '*' || option.concatKeys.includes(key))
      ) {
        return _.uniq((extendsVal || []).concat(sourceVal || []))
      }

      if (Array.isArray(extendsVal)) {
        return extendsVal
      }
      if (Array.isArray(sourceVal)) {
        return sourceVal
      }
    })
  }
}
