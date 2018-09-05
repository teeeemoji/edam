/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/edam/404.html","a5380452da997e4750f76412e03b2580"],["/edam/4f246bb6dbb4f7b6914e9a007b00e33c.svg","4f246bb6dbb4f7b6914e9a007b00e33c"],["/edam/54d6cb2f693ceb46c5ae49b090874d1b.svg","54d6cb2f693ceb46c5ae49b090874d1b"],["/edam/7562b926206cf8ebb0816f2629d2567b.svg","7562b926206cf8ebb0816f2629d2567b"],["/edam/PICIDAE_COMMON.js","03b857b71cd8f194afa9d6b0d79daea3"],["/edam/PICIDAE_ENTRY.js","7a7b313413009c4ae54ac9097a239013"],["/edam/about/__information__.html","a0a5426f5bef978d9bdaaecf11ff4a7b"],["/edam/about/__information__.js","0bc0640d810cd0deecb3ec735fa784ae"],["/edam/about/why-named-edam_zh.html","f5ea25f7dd4924ea48299a019a9e2cda"],["/edam/about/why-named-edam_zh.js","db1e3c49f93153ddf6be91086f683112"],["/edam/about/why-needs-edam.html","a5380452da997e4750f76412e03b2580"],["/edam/about/why-needs-edam_zh.html","10871e626a49a32a4f2967baab0cec76"],["/edam/about/why-needs-edam_zh.js","f35f1df995ab53488de8f2a705a13e31"],["/edam/advanced/__information__.html","9d0f8e0d12e8afb5a007d7ccdc69f80f"],["/edam/advanced/__information__.js","510ead63cdabe22e0d5dff7ce4911e6a"],["/edam/advanced/process.html","98338de1cfb2d9a9921f9e6f88a75647"],["/edam/advanced/process.js","e8cd4cebfc82148a49b01fe0ac6d4379"],["/edam/advanced/process_zh.html","063b72f9a533968565f03cfe4a91c542"],["/edam/advanced/process_zh.js","46900900c4dc3048222bb841d8c0f869"],["/edam/advanced/standalone.html","1aca8fa2e41ae95a7e113b0b136f5cb5"],["/edam/advanced/standalone.js","11785cf9a3ae0172608d6e161d33ab75"],["/edam/advanced/standalone_zh.html","23514c7a94284f917598c0a97c736038"],["/edam/advanced/standalone_zh.js","c6967c67f41b88ac888dd63355987556"],["/edam/advanced/write-loader.html","cee95996e3b827221abe215e29b69be0"],["/edam/advanced/write-loader.js","5255718c59b52a08814d82f0e9cec166"],["/edam/advanced/write-loader_zh.html","d2b5974cdc102eb20042e7aa2ab100bc"],["/edam/advanced/write-loader_zh.js","1773e68a757d78b7dd37babfca658a0a"],["/edam/advanced/write-plugin.html","d67c1613cee94adecd5e2856121b028a"],["/edam/advanced/write-plugin.js","c9dd360144dafc30478bb150fe24b0d1"],["/edam/advanced/write-plugin_zh.html","6d8a2458a825ad470508ef494004d381"],["/edam/advanced/write-plugin_zh.js","e78c143241c74fa7a90a38f7b16aedc6"],["/edam/advanced/write-template.html","56be4954dad2b799cad49ad73d77fa6d"],["/edam/advanced/write-template.js","462d183184447b63a47bc2c48fdf5e95"],["/edam/advanced/write-template_zh.html","750e88f16583027697d5c83148474b8a"],["/edam/advanced/write-template_zh.js","c21e2ea4cef3d453d9bb33ff530a02bc"],["/edam/api.html","a5380452da997e4750f76412e03b2580"],["/edam/awesome/autocompete.html","55087a36b4934eb91e5f9014a3aabe1e"],["/edam/awesome/autocompete.js","d53bac74891ea3f1f415b7887fcef851"],["/edam/docs.html","a5380452da997e4750f76412e03b2580"],["/edam/features.html","c1b7664774b65e993b34ec511d6b64a1"],["/edam/features.js","1e49d061b07fadc14af0cd8c3b37478c"],["/edam/features_zh.html","cf76b54a4f78792699de7697b5a2e577"],["/edam/features_zh.js","f70a31249fa09c2c801cca9de01cf1b2"],["/edam/index.html","a7369337c74d68cf673d085b296c6955"],["/edam/index.js","cce893ddfe08dc13cff830e67b45a089"],["/edam/index_zh.html","1ef87eac0d7d12714f67d5869a9ad062"],["/edam/index_zh.js","9f5f1f5ec214fd32b1f6aac6e0c94041"],["/edam/packages/edam-cli.html","a5380452da997e4750f76412e03b2580"],["/edam/packages/edam-completer.html","a5380452da997e4750f76412e03b2580"],["/edam/packages/edam-gh-completer.html","a5380452da997e4750f76412e03b2580"],["/edam/packages/edam-plugin-dulcet-prompt.html","a5380452da997e4750f76412e03b2580"],["/edam/packages/edam-prettier-loader.html","a5380452da997e4750f76412e03b2580"],["/edam/packages/edam.html","a5380452da997e4750f76412e03b2580"],["/edam/style.css","74540cab9b9ffb7782f90412cfe35155"],["/edam/usage/__information__.html","6cb97622f3cb5656011cf902e12d71cb"],["/edam/usage/__information__.js","ae66b3fd1edc834b98f4b06b0ffe3787"],["/edam/usage/installation.html","4220046df838cf75a926a2ebfe77f003"],["/edam/usage/installation.js","ec0446ca0d736fccee4b4342be213c08"],["/edam/usage/installation_zh.html","538eab2a963a6f30f31f27e83619fb8e"],["/edam/usage/installation_zh.js","3a617c46b67f260dc5f07fafaa67b199"],["/edam/usage/options.html","4bb7087345a3d577d8f8ddd8bec5603c"],["/edam/usage/options.js","ae142a39a2f9545236c4236a131217ba"],["/edam/usage/options_zh.html","0b90c53a6f73dc415d3dd082277a79f9"],["/edam/usage/options_zh.js","fab7422eb4d75ff070e59460483f8f8e"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  return;
                  // throw new Error('Request for ' + cacheKey + ' returned a ' +
                  //  'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    if (!shouldRespond) {
      shouldRespond = [
        url.replace(/\/*$/, '.html'),
        url.replace(/\/*$/, '/index.html'),
        url
      ].some(function (maybeUrl) {
        if (urlsToCacheKeys.has(maybeUrl)) {
          url = maybeUrl
          return true
        }
      })
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/edam/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







