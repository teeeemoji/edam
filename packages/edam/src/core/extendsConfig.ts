/**
 * @file extendsConfig
 * @author Cuttle Cong
 * @date 2018/3/24
 * @description
 */
import { default as normalizeSource, Options } from './normalizeSource'
import { EdamConfig } from '../types/Options'
import toArray from '../lib/toArray'
import extendsMerge from './extendsMerge'
import { loadConfig } from '../lib/loadConfig'
import * as _ from 'lodash'
import * as preduce from 'p-reduce'
import * as nps from 'path'
import resolve from '../lib/resolve'

const untildify = require('untildify')
const debug = require('debug')('edam:extendsConfig')

export type Track = {
  [id: string]: {
    status: 'visiting' | 'visited' | 'first'
    value?: any
  }
}

function toNormalizedFileSource(source, options) {
  if (!source) {
    return source
  }
  let s = normalizeSource(source, options)
  // if (s.type === 'file') {
  //   return s.url
  // }
  return source
}

export function normalizePlugins(plugins, options: Options) {
  plugins = toArray(plugins)
  return <[Function, any]>plugins.map(p => {
    function getPlugin(p) {
      const res = resolve(p, { ...options, safe: false, global: true })
      debug('get Plugin: %s -> %s', p, res)
      return require(res)
    }

    if (_.isString(p)) {
      return [getPlugin(p), {}]
    } else if (_.isArray(p) && _.isString(p[0])) {
      return [getPlugin(p[0]), p[1]]
    }
    return p
  })
}

export async function innerExtendsConfig(
  config: EdamConfig,
  options: Options,
  track?: Track
): Promise<EdamConfig> {
  let extendConfig: EdamConfig
  config = _.cloneDeep(config)
  debug('config %O', config)

  if (typeof config.output === 'string') {
    config.output = nps.resolve(options.cwd, config.output)
  }

  // source and alias could be relative path
  config.source = normalizeSource(config.source, options)
  if (config.alias) {
    _.each(config.alias, (val, key) => {
      config.alias[key] = normalizeSource(val, options)
    })
  }

  if (config.plugins) {
    config.plugins = normalizePlugins(config.plugins, options)
  }
  if (config.extends) {
    const extendsArray = (config.extends = toArray(config.extends))
    const configList = await Promise.all(
      extendsArray.map(source => {
        return loadConfig(untildify(source), { ...options, filename: true })
      })
    )
    extendConfig = await preduce(
      configList,
      async (collection, { config: innerConfig, filename }) => {
        let value
        track[filename] = track[filename] || { status: 'first' }
        if (track[filename].status === 'visited') {
          value = track[filename].value
        } else if (track[filename].status === 'visiting') {
          value = {}
        } else {
          track[filename] = { status: 'visiting' }
          value = await innerExtendsConfig(
            innerConfig,
            {
              ...options,
              cwd: nps.dirname(filename)
            },
            track
          )
          track[filename] = {
            status: 'visited',
            value
          }
        }

        return extendsMerge(collection, value)
      },
      {}
    )
  }

  const result = extendsMerge({}, extendConfig, config)
  debug('extended track %O', track)
  debug('extended result %O', result)
  return result
}

export default async function extendsConfig(
  config: EdamConfig,
  options: Options & { track?: boolean }
): Promise<{ config: EdamConfig; track?: Track }> {
  options = {
    track: true,
    ...options
  }
  const track = {}
  return {
    config: await innerExtendsConfig(config, options, track),
    track: options.track ? track : null
  }
}
