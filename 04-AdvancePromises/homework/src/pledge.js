"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
  if (typeof executor !== "function") throw new TypeError("executor function");
  this._state = "pending";
  this._handlerGroups = [];
  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (value) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = value;
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (reason) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = reason;
    this._callHandlers();
  }
};
//hasta acá OK con CD

$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb !== "function") successCb = false;
  if (typeof errorCb !== "function") errorCb = false;
  const downstreamPromise = new $Promise(function () {});
  this._handlerGroups.push({ successCb, errorCb, downstreamPromise });
  if (this._state !== "pending") this._callHandlers();
  return downstreamPromise;
};

$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length > 0) {
    let actual = this._handlerGroups.shift();
    if (this._state === "fulfilled") {
      if (!actual.successCb) {
        actual.downstreamPromise._internalResolve(this._value);
      } else {
        try {
          const result = actual.successCb(this._value);
          if (result instanceof $Promise) {
            result.then(
              (value) => actual.downstreamPromise._internalResolve(value),
              (err) => actual.downstreamPromise._internalReject(err)
            );
          } else {
            actual.downstreamPromise._internalResolve(result);
          }
        } catch (e) {
          actual.downstreamPromise._internalReject(e);
        }
      }
    } else if (this._state === "rejected") {
      if (!actual.errorCb) {
        actual.downstreamPromise._internalReject(this._value);
      } else {
        try {
          const result = actual.errorCb(this._value);
          if (result instanceof $Promise) {
            result.then(
              (value) => actual.downstreamPromise._internalResolve(value),
              (err) => actual.downstreamPromise._internalReject(err)
            );
          } else {
            actual.downstreamPromise._internalResolve(result);
          }
        } catch (e) {
          actual.downstreamPromise._internalReject(e);
        }
      }
    }
  }
};
$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};
$Promise.prototype.resolve = function () {};
$Promise.prototype.all = function () {};
module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
