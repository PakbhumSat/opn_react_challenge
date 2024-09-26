**Tamboon React** is a code challenge for frontend developer.

## What I do in this project

Complete `handlePay()` function:
-> Complete the function by using fetch to update the payment from incoming parameters.
-> Handle when fetching is success then update the payment in db.json

Components:
-> Redesign the position and alignment of the contents to be better UI.
-> Handle user clickaway when change the selecting element.
-> Create a dialog to display when handlePAy has the result.

## Issue found

Noted: At first I run into an issue when tried to run the project `yarn run client`.

The error occurs like this:
`Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:71:19)
    at Object.createHash (node:crypto:133:10)
    at module.exports (/app/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/app/node_modules/webpack/lib/NormalModule.js:417:16)
    at /app/node_modules/webpack/lib/NormalModule.js:452:10
    at /app/node_modules/webpack/lib/NormalModule.js:323:13
    at /app/node_modules/loader-runner/lib/LoaderRunner.js:367:11
    at /app/node_modules/loader-runner/lib/LoaderRunner.js:233:18
    at context.callback (/app/node_modules/loader-runner/lib/LoaderRunner.js:111:13)
    at /app/node_modules/babel-loader/lib/index.js:59:103 {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}`

SOLUTION: Downgrade Node to version 16 (which will be updated automatically to 16.20 by default)
