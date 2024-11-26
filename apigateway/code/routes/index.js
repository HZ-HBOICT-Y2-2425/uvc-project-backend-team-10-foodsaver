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

const loginregistermicroserviceProxy = createProxyMiddleware({
  target: 'http://loginregistermicroservice:4000/',
  changeOrigin: true
});

router.use('/loginregistermicroservice', loginregistermicroserviceProxy);

router.use('/microservice', microserviceProxy);
router.use('/favoritemicroservice', favoritemicroserviceProxy);

export default router;
