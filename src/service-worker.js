/* eslint-disable no-restricted-globals */
// src/service-worker.js

import { precacheAndRoute } from 'workbox-precaching'

precacheAndRoute(self.__WB_MANIFEST)
