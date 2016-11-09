'use strict';

// Wit.ai parameters
//const WIT_TOKEN = process.env.WIT_TOKEN;
const WIT_TOKEN = "wittoken";
if (!WIT_TOKEN) {
  throw new Error('missing WIT_TOKEN');
}

// Messenger API parameters
//const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN;
const FB_PAGE_TOKEN = "EAAHwsu50wLoBAPsGNwYnC3XLRZBja7HVFEh9jZAbZBZA34ZAQg5rMxA8kfACA2GbgwpJKA0M45obaRFFPHIcDaG01VQxS0Ssk0UvBYbfpDPASt9izjJmhxQ4TT8awmNPKL33mgq0a0ienhwW0fpKDysPigqGaK8gfe0xmSh9tiAZDZD";


var FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;

if (!FB_VERIFY_TOKEN) {
  FB_VERIFY_TOKEN = "anhtuandeptrailaday";
}

module.exports = {
  WIT_TOKEN: WIT_TOKEN,
  FB_PAGE_TOKEN: FB_PAGE_TOKEN,
  FB_VERIFY_TOKEN: FB_VERIFY_TOKEN,
};