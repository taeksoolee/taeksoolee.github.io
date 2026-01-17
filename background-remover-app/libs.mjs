// 라이브러리 모듈 가져오기
import {
  pipeline as _pipeline,
  env as _env,
  RawImage as _RawImage
} from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.0/+esm';
import _Alpine from 'https://cdn.jsdelivr.net/npm/alpinejs@3.14.0/dist/module.esm.js';

/**
 * @type {import('alpinejs').Alpine}
 */
export const Alpine = _Alpine;

/**
 * @type {typeof import('@huggingface/transformers').Pipeline}
 */
export const pipeline = _pipeline;

/**
 * @type {typeof import('@huggingface/transformers').Env}
 */
export const env = _env;

/**
 * @type {typeof import('@huggingface/transformers').RawImage}
 */
export const RawImage = _RawImage;