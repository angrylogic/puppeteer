/* Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: joonlee@google.com (Joon Lee)
 */

goog.require('goog.testing.jsunit');
goog.require('puppet.finalize');


var callIndex = 0;
var finalizer1CallIndex = -1;
var finalizer2CallIndex = -1;
var lastFinalizerCallIndex = -1;

function finalizer1() {
  finalizer1CallIndex = callIndex++;
}

function finalizer2() {
  finalizer2CallIndex = callIndex++;
}

function lastFinalizer() {
  lastFinalizerCallIndex = callIndex++;
}

function testCallFinalizers() {
  puppet.finalize.callFinalizers(true);
  assertEquals(-1, finalizer1CallIndex);
  assertEquals(-1, finalizer2CallIndex);
  assertEquals(-1, lastFinalizerCallIndex);

  puppet.finalize.setLastFinalizer(lastFinalizer);
  puppet.finalize.addFinalizer(finalizer1);
  puppet.finalize.addFinalizer(finalizer2);

  puppet.finalize.callFinalizers(true);
  assertEquals(0, finalizer1CallIndex);
  assertEquals(1, finalizer2CallIndex);
  assertEquals(2, lastFinalizerCallIndex);
}
