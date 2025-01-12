import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

// create a proxy for each microservice
const microserviceProxy = createProxyMiddleware({
  target: 'http://microservice:3011',
  changeOrigin: true
});

const favoritemicroserviceProxy = createProxyMiddleware({
  target: 'http://favoritemicroservice:3012',
  changeOrigin: true
});

const forummicroserviceProxy = createProxyMiddleware({
  target: 'http://forummicroservice:3015',
  changeOrigin: true
});

const loginregistermicroserviceProxy = createProxyMiddleware({
  target: 'http://loginregistermicroservice:4000/',
  changeOrigin: true
});


const tipsmicroserviceProxy = createProxyMiddleware({
  target: 'http://tipsmicroservice:3016/',
  changeOrigin: true
});


const pantrymicroserviceProxy = createProxyMiddleware({
  target: 'http://pantrymicroservice:4010/',
  changeOrigin: true
});

router.use('/loginregistermicroservice', loginregistermicroserviceProxy);
router.use('/pantrymicroservice', pantrymicroserviceProxy);
router.use('/microservice', microserviceProxy);
router.use('/favoritemicroservice', favoritemicroserviceProxy);
router.use('/forummicroservice', forummicroserviceProxy);
router.use('/tipsmicroservice', tipsmicroserviceProxy);

export default router;
