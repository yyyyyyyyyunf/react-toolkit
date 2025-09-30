/**
 * 测试用的用户代理字符串集合
 * 用于多个测试文件共享
 */

export interface UserAgentTestCase {
  name: string;
  userAgent: string;
  expectedBrowser: string;
  description: string;
}

// Chrome 相关 UA
export const chromeUserAgents: UserAgentTestCase[] = [
  {
    name: 'Chrome Desktop Windows',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    expectedBrowser: 'chrome',
    description: '桌面 Chrome Windows 10'
  },
  {
    name: 'Chrome Desktop Windows 140',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    expectedBrowser: 'chrome',
    description: '桌面 Chrome Windows 140'
  },
  {
    name: 'Chrome Desktop Windows 138',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    expectedBrowser: 'chrome',
    description: '桌面 Chrome Windows 138'
  },
  {
    name: 'Chrome Desktop macOS',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    expectedBrowser: 'chrome',
    description: '桌面 Chrome macOS'
  },
  {
    name: 'Chrome Desktop macOS 140',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    expectedBrowser: 'chrome',
    description: '桌面 Chrome macOS 140'
  },
  {
    name: 'Chrome Mobile Android',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    expectedBrowser: 'chrome',
    description: '移动 Chrome Android'
  },
  {
    name: 'Chrome WebView Android',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.120 Mobile Safari/537.36 wv',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView'
  },
  {
    name: 'Chrome WebView Android Legacy',
    userAgent: 'Mozilla/5.0 (Linux; Android 4.0.3; Galaxy Nexus Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Chrome/18.0.1025.133 Mobile Safari/534.30',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 旧版本'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; PJE110 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250503 MMWEBID/688 MicroMessenger/8.0.61.2880(0x28003D5B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 13 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; 2206123SC Build/TKQ1.220829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250802 MMWEBID/714 MicroMessenger/8.0.62.2900(0x28003E5A) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 13 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 11 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; PELM00 Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/890 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 11 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 12 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; NOP-AN00 Build/HUAWEINOP-AN01P; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/5395 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 14 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; V2244A Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380187 MMWEBSDK/20250804 MMWEBID/1664 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 14 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; V2309A Build/AP3A.240905.015.A1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/1770 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本2)'
  },
  {
    name: 'Chrome WebView Android 10 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; PDCM00 Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/2970 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 10 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 13 (WeChat 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; 23013RK75C Build/TKQ1.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/2679 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 13 (微信内置浏览器 版本2)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 3)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; BRC-AN00 Build/HONORBRC-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/5676 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本3)'
  },
  {
    name: 'Chrome WebView Android 14 (WeChat 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; PHS110 Build/UKQ1.230924.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/6688 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 14 (微信内置浏览器 版本2)'
  },
  {
    name: 'Chrome WebView Android 12 (WeChat 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; NOH-AN01 Build/HUAWEINOH-AN01; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/6140 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (微信内置浏览器 版本2)'
  },
  {
    name: 'Chrome WebView OpenHarmony (WeChat)',
    userAgent: 'Mozilla/5.0 (Phone; OpenHarmony 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 ArkWeb/4.1.6.1 Mobile  MicroMessenger/8.0.10.36(0xf3100a24) Weixin NetType/4G Language/zh_CN MMWEBID/6994 MMWEBSDK/202508070004 XWEB/1140319',
    expectedBrowser: 'chromeWebview',
    description: 'OpenHarmony Chrome WebView (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView OpenHarmony (WeChat 2)',
    userAgent: 'Mozilla/5.0 (Phone; OpenHarmony 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 ArkWeb/4.1.6.1 Mobile  MicroMessenger/8.0.10.41(0xf3100a29) Weixin NetType/4G Language/zh_CN MMWEBID/826 MMWEBSDK/202508070004 XWEB/1140319',
    expectedBrowser: 'chromeWebview',
    description: 'OpenHarmony Chrome WebView (微信内置浏览器 版本2)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 4)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; 23049RAD8C Build/AQ3A.241006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/8106 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本4)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 5)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; BVL-AN00 Build/HONORBVL-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/981 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本5)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 6)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; MAG-AN00 Build/HONORMAG-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/6537 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本6)'
  },
  {
    name: 'Chrome WebView OpenHarmony (WeChat 3)',
    userAgent: 'Mozilla/5.0 (Phone; OpenHarmony 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 ArkWeb/4.1.6.1 Mobile  MicroMessenger/8.0.10.41(0xf3100a29) Weixin NetType/WIFI Language/zh_CN MMWEBID/9424 MMWEBSDK/202508070004 XWEB/1140319',
    expectedBrowser: 'chromeWebview',
    description: 'OpenHarmony Chrome WebView (微信内置浏览器 版本3)'
  },
  {
    name: 'Chrome WebView Android 12 (WeChat 3)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; ALA-AN70 Build/HONORALA-AN70; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/3788 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (微信内置浏览器 版本3)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 7)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; MAA-AN10 Build/HONORMAA-AN10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/1070 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本7)'
  },
  {
    name: 'Chrome WebView Android 12 (WeChat 4)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; PLA-AL10 Build/HUAWEIPLA-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/7709 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (微信内置浏览器 版本4)'
  },
  {
    name: 'Chrome WebView Android 16 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 16; SM-S9380 Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20241202 MMWEBID/2593 MicroMessenger/8.0.56.2800(0x2800385E) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 16 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 8)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; PKM110 Build/UKQ1.231108.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/3802 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本8)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 9)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; REP-AN00 Build/HONORREP-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/2726 MicroMessenger/8.0.63.2920(0x28003FEC) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本9)'
  },
  {
    name: 'Chrome WebView OpenHarmony (WeChat 4)',
    userAgent: 'Mozilla/5.0 (Phone; OpenHarmony 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 ArkWeb/4.1.6.1 Mobile MicroMessenger/8.0.10.41(0xf3100a29) Weixin NetType/4G Language/zh_CN MMWEBID/8058 MMWEBSDK/202508070004 XWEB/1140319',
    expectedBrowser: 'chromeWebview',
    description: 'OpenHarmony Chrome WebView (微信内置浏览器 版本4)'
  },
  {
    name: 'Chrome WebView Android 14',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; LSA-AN00 Build/HONORLSA-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/99.0.4844.88 Mobile Safari/537.36',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 14'
  },
  {
    name: 'Chrome WebView Android 12',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; CLS-AL00 Build/HUAWEICLS-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12'
  },
  {
    name: 'Chrome WebView Android 10',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; CDY-AN00 Build/HUAWEICDY-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 10'
  },
  {
    name: 'Chrome WebView Android 15',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; MAA-AN10 Build/HONORMAA-AN10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/133.0.6943.137 Mobile Safari/537.36',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15'
  },
  {
    name: 'Chrome WebView Android 12 (版本2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; ALN-AL10 Build/HUAWEIALN-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (版本2)'
  },
  {
    name: 'Chrome WebView OpenHarmony',
    userAgent: 'Mozilla/5.0 (Phone; OpenHarmony 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 ArkWeb/4.1.6.1 Mobile',
    expectedBrowser: 'chromeWebview',
    description: 'OpenHarmony Chrome WebView'
  },
  {
    name: 'Chrome WebView OpenHarmony 6.0',
    userAgent: 'Mozilla/5.0 (Phone; OpenHarmony 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 ArkWeb/6.0.0.47 Mobile',
    expectedBrowser: 'chromeWebview',
    description: 'OpenHarmony 6.0 Chrome WebView'
  },
  {
    name: 'Chrome WebView OpenHarmony 5.0 (WeChat)',
    userAgent: 'Mozilla/5.0 (Phone; OpenHarmony 5.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 ArkWeb/4.1.6.1 Mobile MicroMessenger/8.0.10.41(0xf3100a29) Weixin NetType/WIFI Language/zh_CN MMWEBID/8020 MMWEBSDK/202508070004 XWEB/1140319',
    expectedBrowser: 'chromeWebview',
    description: 'OpenHarmony 5.0 Chrome WebView (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 12 (版本3)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; HBN-AL00 Build/HUAWEIHBN-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (版本3)'
  },
  {
    name: 'Chrome WebView Android 13 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; PEPM00 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250201 MMWEBID/5822 MicroMessenger/8.0.60.2860(0x28003C55) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 13 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; 23127PN0CC Build/AQ3A.240627.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/6534 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 10 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; STK-AL00 Build/HUAWEISTK-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/2860 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 10 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; 2206122SC Build/AQ3A.241006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/9401 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本2)'
  },
  {
    name: 'Chrome WebView Android 14 (WeChat)',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; 23113RKC6C Build/UKQ1.230804.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250201 MMWEBID/2236 MicroMessenger/8.0.60.2860(0x28003C55) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 14 (微信内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 12 (WeChat 4)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; JAD-AL50 Build/HUAWEIJAD-AL50; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/9562 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (微信内置浏览器 版本4)'
  },
  {
    name: 'Chrome WebView Android 13 (WeChat 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; 23049RAD8C Build/TKQ1.221114.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250503 MMWEBID/4886 MicroMessenger/8.0.61.2880(0x28003D5B) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 13 (微信内置浏览器 版本2)'
  },
  {
    name: 'Chrome WebView Android 12 (WeChat 5)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; ALN-AL80 Build/HUAWEIALN-AL80; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/4569 MicroMessenger/8.0.63.2920(0x28003FD7) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (微信内置浏览器 版本5)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 3)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; PTP-AN00 Build/HONORPTP-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/9177 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本3)'
  },
  {
    name: 'Chrome WebView Android 13 (WeChat 3)',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; RMX2205 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/3057 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 13 (微信内置浏览器 版本3)'
  },
  {
    name: 'Chrome WebView Android 12 (WeChat 6)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; GIA-AN00 Build/HONORGIA-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/2283 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (微信内置浏览器 版本6)'
  },
  {
    name: 'Chrome WebView Android 13 (WeChat 4)',
    userAgent: 'Mozilla/5.0 (Linux; Android 13; PHJ110 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/3420 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/5G Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 13 (微信内置浏览器 版本4)'
  },
  {
    name: 'Chrome WebView Android 15 (WeChat 4)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; ELP-AN00 Build/HONORELP-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.180 Mobile Safari/537.36 XWEB/1380215 MMWEBSDK/20250804 MMWEBID/3115 MicroMessenger/8.0.63.2920(0x28003F3A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (微信内置浏览器 版本4)'
  },
  {
    name: 'Chrome WebView Android 15 (ByteDance)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; 24129PN74C Build/AQ3A.240812.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/140.0.7339.35 Mobile Safari/537.36 aid/13 bytedancewebview/d8a21c6 JsSdk/2 NewsArticle/14.0.0 NetType/wifi TTWebView/1401130071401',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (字节跳动内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 11 (ByteDance)',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; M2007J17C Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.55 Mobile Safari/537.36 aid/13 bytedancewebview/d8a21c6 JsSdk/2 NewsArticle/14.0.0 NetType/wifi TTWebView/1381130069411',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 11 (字节跳动内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 12 (ByteDance)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; BLK-AL80 Build/HUAWEIBLK-AL80; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.55 Mobile Safari/537.36 aid/13 bytedancewebview/d8a21c6 JsSdk/2 NewsArticle/14.0.0 NetType/4g TTWebView/1381130069507',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (字节跳动内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 12 (ByteDance 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; NOH-AN01 Build/HUAWEINOH-AN01; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/138.0.7204.55 Mobile Safari/537.36 aid/13 bytedancewebview/d8a21c6 JsSdk/2 NewsArticle/14.0.0 NetType/wifi TTWebView/1381130069409',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (字节跳动内置浏览器 版本2)'
  },
  {
    name: 'Chrome WebView Android 12 (Alipay)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; BLK-AL80 Build/HUAWEIBLK-AL80; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.122 MYWeb/1.3.126.250916150540 UWS/3.22.2.9999 UCBS/3.22.2.9999_220000000000 Mobile Safari/537.36 NebulaSDK/1.8.100112 Nebula AlipayDefined(nt:4G,ws:320|0|3.3875,ac:sp) AliApp(AP/10.7.86.8000) AlipayClient/10.7.86.8000 Language/zh-Hans useStatusBar/true isConcaveScreen/true Region/CNAriver/10.7.86.8000 MiniProgram APXWebView DTN/2.0',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (支付宝内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 15 (Alipay)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; SM-S931B Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.122 MYWeb/1.3.126.250903161326 UWS/3.22.2.9999 UCBS/3.22.2.9999_220000000000 Mobile Safari/537.36 AlipayChannelId/5136 NebulaSDK/1.8.100112 Nebula AlipayDefined(nt:UNKNOWN,ws:360|0|3.0) AliApp(AP/10.7.80.7000) AlipayClient/10.7.80.7000 Language/de-DE useStatusBar/true isConcaveScreen/true Region/CNAriver/10.7.80.7000 MiniProgram APXWebView DTN/2.0',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (支付宝内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 14 (Baidu)',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; LE2100 Build/UKQ1.230924.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/117.0.0.0 Mobile Safari/537.36 haokan/7.89.0.10 (Baidu; P1 14)/sulPenO_43_41_0012EL/1027409r/C01A167BDFE8E778A7BD16232706319A%7CVWHVEW4WT/1/7.89.0.10/789001/1/immersiveMode/modeV4PlusWhite/bbqMode/bbqModeV2/blackStyle',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 14 (百度好看内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 18 (Baidu)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 SP-engine/3.52.0 main/1.0 baiduboxapp/15.30.0.10 (Baidu; P2 18.6.2) NABar/1.0 themeUA=Theme/default',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (百度APP内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 14 (Baidu 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 14; V2157A Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36 T7/15.30 swan/3.53.0 swan-baiduboxapp/15.31.0.10 baiduboxapp/15.31.0.10 (Baidu; P1 14)',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 14 (百度APP内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 18 (Baidu 2)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 haokan/7.77.0.10 (Baidu; P2 18.3.2)/2.3.81_2,31enohP/381d/EEE357548A23B6435D9F25895F47CD992DFD694D6OBHMIPNOAG/1/bbqModeV2/blackStyle/theme_normal',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (百度好看内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 16 (Baidu)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 swan/3.53.0 swan-baiduboxapp/15.31.0.10 baiduboxapp/15.31.0.10 (Baidu; P2 16.4.1)',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 16 (百度APP内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 10 (Baidu)',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; TEL-AN00a Build/HONORTEL-AN00a; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/92.0.4515.105 Mobile Safari/537.36 haokan/7.88.0.10 (Baidu; P1 10)/IEWAUH_92_01_a00NA-LET/1020712h/37B1F614BCCB69D25D4A57B2C6828FAB%7CV2V4MXJV2/1/7.88.0.10/788001/1/immersiveMode/modeV4PlusWhite/bbqMode/bbqModeV2/blackStyle/harmonyos',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 10 (百度好看内置浏览器)'
  },
  {
    name: 'Chrome Mobile Android (Xiaomi)',
    userAgent: 'Mozilla/5.0 (Linux; U; Android 14; zh-cn; 23113RKC6C Build/UKQ1.230804.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/109.0.5414.118 Mobile Safari/537.36 XiaoMi/MiuiBrowser/18.3.100522',
    expectedBrowser: 'chrome',
    description: 'Android Chrome Mobile 109 (小米浏览器)'
  },
  {
    name: 'Chrome Mobile Android (Xiaomi 2)',
    userAgent: 'Mozilla/5.0 (Linux; U; Android 15; zh-cn; 2304FPN6DC Build/AQ3A.240912.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.7049.79 Mobile Safari/537.36 XiaoMi/MiuiBrowser/20.4.10918',
    expectedBrowser: 'chrome',
    description: 'Android Chrome Mobile 135 (小米浏览器)'
  },
  {
    name: 'Chrome Mobile Android (Xiaomi 3)',
    userAgent: 'Mozilla/5.0 (Linux; U; Android 12; zh-cn; M2007J22C Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.7049.79 Mobile Safari/537.36 XiaoMi/MiuiBrowser/20.3.60923',
    expectedBrowser: 'chrome',
    description: 'Android Chrome Mobile 135 (小米浏览器)'
  },
  {
    name: 'Chrome Mobile Android (Xiaomi 4)',
    userAgent: 'Mozilla/5.0 (Linux; U; Android 16; zh-cn; 2509FPN0BC Build/BP2A.250605.031.A3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.7049.79 Mobile Safari/537.36 XiaoMi/MiuiBrowser/20.4.10918',
    expectedBrowser: 'chrome',
    description: 'Android Chrome Mobile 135 (小米浏览器)'
  },
  {
    name: 'Chrome Mobile Android (Xiaomi 5)',
    userAgent: 'Mozilla/5.0 (Linux; U; Android 13; zh-cn; M2012K11AC Build/TKQ1.221114.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.7049.79 Mobile Safari/537.36 XiaoMi/MiuiBrowser/20.3.60923',
    expectedBrowser: 'chrome',
    description: 'Android Chrome Mobile 135 (小米浏览器)'
  },
  {
    name: 'Safari WebView iOS 18 (CMCC)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148/wkwebview leadeon/12.0.0/CMCCIT',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (中国移动APP内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 18 (DiDi)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 didi.passenger/7.1.10 FusionKit/1.2.14',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (滴滴出行APP内置浏览器)'
  },
  {
    name: 'Firefox iOS 18',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/143 Mobile/15E148 Version/17.7',
    expectedBrowser: 'firefox',
    description: 'iOS Firefox 143 (独立浏览器)'
  },
  {
    name: 'Safari WebView iOS 18 (Generic)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (通用WebView)'
  },
  {
    name: 'Chrome WebView Android 15 (Generic)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; SM-A356E Build/AP3A.240905.015.A2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/140.0.7339.155',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (通用WebView)'
  },
  {
    name: 'Safari WebView iOS 16 (Minimal)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 16 (最小化WebView)'
  },
  {
    name: 'Safari WebView iOS 18 (Minimal)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (最小化WebView)'
  },
  {
    name: 'Safari WebView iOS 18 (Minimal 2)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (最小化WebView)'
  },
  {
    name: 'Chrome WebView Android 15 (Generic 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; PTP-AN10 Build/HONORPTP-AN10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/133.0.6943.137',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (通用WebView)'
  },
  {
    name: 'Safari WebView iOS 15 (Minimal)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 15 (最小化WebView)'
  },
  {
    name: 'Chrome WebView Android 12 (Generic)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; FOA-AL00 Build/HUAWEIFOA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (通用WebView)'
  },
  {
    name: 'Chrome WebView Android 12 (Generic 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; ADY-AL00 Build/HUAWEIADY-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (通用WebView)'
  },
  {
    name: 'Safari WebView iOS 15 (With Mobile)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 15 (带Mobile标识)'
  },
  {
    name: 'Safari WebView iOS 18 (Minimal 3)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (最小化WebView)'
  },
  {
    name: 'Safari WebView iOS 18 (Minimal 4)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (最小化WebView)'
  },
  {
    name: 'Chrome WebView Android 12 (Lark)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; NOH-AL10 Build/HUAWEINOH-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.152 Mobile Safari/537.36 Lark/7.52.4 LarkLocale/zh_CN ChannelName/Feishu EEMicroApp/1.10.50.0 TTWebView/1321130066519',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (飞书APP内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 15 (Lark)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; BRC-AN00 Build/HONORBRC-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.152 Mobile Safari/537.36 Lark/7.52.4 LarkLocale/zh_CN ChannelName/Feishu EEMicroApp/1.10.51.2 TTWebView/1321130066519',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (飞书APP内置浏览器)'
  },
  {
    name: 'Chrome Desktop macOS (Lark)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.128 Safari/537.36 Lark/7.18.0 LarkLocale/zh_CN Electron/Native WebApp/appCenter SuperApp',
    expectedBrowser: 'chrome',
    description: 'macOS Chrome 109 (飞书桌面应用内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 15 (Lark 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 15; 2210132C Build/AQ3A.240912.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.6778.260 Mobile Safari/537.36 Lark/7.18.10 LarkLocale/zh_CN ChannelName/Feishu',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 15 (飞书APP内置浏览器)'
  },
  {
    name: 'Chrome WebView Android 12 (Lark 2)',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; PLA-AL10 Build/HUAWEIPLA-AL10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.152 Mobile Safari/537.36 Lark/7.52.4 LarkLocale/zh_CN ChannelName/Feishu TTWebView/1321130066519',
    expectedBrowser: 'chromeWebview',
    description: 'Android Chrome WebView 12 (飞书APP内置浏览器)'
  }
];

// Safari 相关 UA
export const safariUserAgents: UserAgentTestCase[] = [
  {
    name: 'Safari Desktop macOS',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    expectedBrowser: 'safari',
    description: '桌面 Safari macOS'
  },
  {
    name: 'Safari Mobile iOS',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
    expectedBrowser: 'safari',
    description: '移动 Safari iOS'
  },
  {
    name: 'Safari WebView iOS 15',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/608.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 15'
  },
  {
    name: 'Safari WebView iOS 14',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari/604.1',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 14'
  },
  {
    name: 'Safari WebView iOS 13',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Mobile/15E148 Safari/604.1',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 13'
  },
  {
    name: 'Safari WebView iOS 12',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/15E148 Safari/604.1',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 12'
  },
  {
    name: 'Safari WebView iOS 11',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Mobile/15E148 Safari/604.1',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 11'
  },
  {
    name: 'Safari WebView iOS 18 (WeChat)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/4G Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (微信内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 16 (WeChat)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_7_11 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.38(0x1800262c) NetType/4G Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 16 (微信内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 18 (WeChat 2)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/4G Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (微信内置浏览器 版本2)'
  },
  {
    name: 'Safari WebView iOS 16 (WeChat 2)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.62(0x18003e3a) NetType/WIFI Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 16 (微信内置浏览器 版本2)'
  },
  {
    name: 'Safari WebView iOS 18 (WeChat 3)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/4G Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (微信内置浏览器 版本3)'
  },
  {
    name: 'Safari WebView iOS 18 (WeChat 4)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/4G Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (微信内置浏览器 版本4)'
  },
  {
    name: 'Safari WebView iOS 18 (WeChat 5)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/4G Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (微信内置浏览器 版本5)'
  },
  {
    name: 'Safari WebView iOS 18 (WeChat 6)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/4G Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (微信内置浏览器 版本6)'
  },
  {
    name: 'Safari WebView iOS 16 (WeChat 3)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/WIFI Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 16 (微信内置浏览器 版本3)'
  },
  {
    name: 'Safari WebView iOS 18 (WeChat 7)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/WIFI Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (微信内置浏览器 版本7)'
  },
  {
    name: 'Safari WebView iOS 17 (WeChat)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/4G Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 17 (微信内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 16 (WeChat 4)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.64(0x18004027) NetType/WIFI Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 16 (微信内置浏览器 版本4)'
  },
  {
    name: 'Safari WebView iOS 16 (WeChat 5)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.48(0x18003030) NetType/4G Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 16 (微信内置浏览器 版本5)'
  },
  {
    name: 'Safari WebView iOS 18 (WeChat 8)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/WIFI Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (微信内置浏览器 版本8)'
  },
  {
    name: 'Safari WebView iOS 18',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18'
  },
  {
    name: 'Safari WebView iOS 18 (版本2)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (版本2)'
  },
  {
    name: 'Safari WebView iOS 18 (版本3)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (版本3)'
  },
  {
    name: 'Safari WebView iOS 18 (版本4)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (版本4)'
  },
  {
    name: 'Safari WebView iOS 18 (版本5)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (版本5)'
  },
  {
    name: 'Safari WebView iOS 18 (版本6)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (版本6)'
  },
  {
    name: 'Safari WebView iOS 18 (版本7)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (版本7)'
  },
  {
    name: 'Safari WebView iOS 18 (版本8)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (版本8)'
  },
  {
    name: 'Safari WebView iOS 18 (版本9)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (版本9)'
  },
  {
    name: 'Safari WebView iOS 16 (WeChat)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/WIFI Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 16 (微信内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 18 (WeChat)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/WIFI Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (微信内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 18 (WeChat 2)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.63(0x18003f2f) NetType/WIFI Language/zh_CN',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (微信内置浏览器 版本2)'
  },
  {
    name: 'Safari WebView iOS 17 (ByteDance)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 bytedancewebview/d8a21c6 aid/13 NewsArticle/14.0.0.20 JsSdk/2.0 NetType/WIFI (News 14.0.0 17.600000)',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 17 (字节跳动内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 17 (ByteDance 2)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 bytedancewebview/d8a21c6 aid/13 NewsArticle/13.9.0.20 JsSdk/2.0 NetType/WIFI (News 13.9.0 17.600000)',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 17 (字节跳动内置浏览器 版本2)'
  },
  {
    name: 'Safari WebView iOS 18 (ByteDance)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 bytedancewebview/d8a21c6 aid/13 NewsArticle/13.9.0.20 JsSdk/2.0 NetType/WIFI (News 13.9.0 18.600000)',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (字节跳动内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 18 (Alipay)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/22G100 Ariver/1.1.0 AliApp(AP/10.7.86.6000) Nebula WK RVKType(1) AlipayDefined(nt:4G,ws:402|810|3.0) AlipayClient/10.7.86.6000 Language/zh-Hans Region/CN MiniProgram APXWebView NebulaX/1.0.0 XRiver/10.2.58.1 DTN/2.0',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (支付宝内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 15 (Alipay)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/19F77 Ariver/1.1.0 AliApp(AP/10.7.76.6000) Nebula WK RVKType(1) AlipayDefined(nt:4G,ws:390|780|3.0) AlipayClient/10.7.76.6000 Language/zh-Hans Region/CN MiniProgram APXWebView NebulaX/1.0.0 DTN/2.0',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 15 (支付宝内置浏览器)'
  },
  {
    name: 'Safari WebView iOS 18 (Alipay 2)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/22F76 Ariver/1.1.0 AliApp(AP/10.7.86.6000) Nebula WK RVKType(1) AlipayDefined(nt:WWAN,ws:430|868|3.0) AlipayClient/10.7.86.6000 Language/zh-Hans Region/CN MiniProgram APXWebView NebulaX/1.0.0 XRiver/10.2.58.1 DTN/2.0',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (支付宝内置浏览器 版本2)'
  },
  {
    name: 'Safari WebView iOS 18 (Alipay 3)',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/22G90 Ariver/1.1.0 AliApp(AP/10.7.86.6000) Nebula WK RVKType(1) AlipayDefined(nt:WWAN,ws:428|862|3.0) AlipayClient/10.7.86.6000 Language/zh-Hans Region/CN MiniProgram APXWebView NebulaX/1.0.0 DTN/2.0',
    expectedBrowser: 'safariWebview',
    description: 'iOS Safari WebView 18 (支付宝内置浏览器 版本3)'
  }
];

// Firefox 相关 UA
export const firefoxUserAgents: UserAgentTestCase[] = [
  {
    name: 'Firefox Desktop Windows',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    expectedBrowser: 'firefox',
    description: '桌面 Firefox Windows'
  },
  {
    name: 'Firefox Desktop macOS',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0',
    expectedBrowser: 'firefox',
    description: '桌面 Firefox macOS'
  },
  {
    name: 'Firefox Mobile Android',
    userAgent: 'Mozilla/5.0 (Mobile; rv:89.0) Gecko/89.0 Firefox/89.0',
    expectedBrowser: 'firefox',
    description: '移动 Firefox Android'
  }
];

// Edge 相关 UA
export const edgeUserAgents: UserAgentTestCase[] = [
  {
    name: 'Edge Desktop Windows',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59',
    expectedBrowser: 'edge',
    description: '桌面 Edge Windows'
  },
  {
    name: 'Edge Mobile Android',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36 EdgA/91.0.864.59',
    expectedBrowser: 'edge',
    description: '移动 Edge Android'
  }
];

// 其他浏览器 UA
export const otherBrowserUserAgents: UserAgentTestCase[] = [
  {
    name: 'Opera Desktop',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.277',
    expectedBrowser: 'opera',
    description: '桌面 Opera'
  },
  {
    name: 'Opera Mobile',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36 OPR/77.0.4054.277',
    expectedBrowser: 'opera',
    description: '移动 Opera'
  },
  {
    name: 'Samsung Internet',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.0 Chrome/91.0.4472.120 Mobile Safari/537.36',
    expectedBrowser: 'samsung',
    description: 'Samsung Internet'
  }
];

// 所有 UA 的集合
export const allUserAgents: UserAgentTestCase[] = [
  ...chromeUserAgents,
  ...safariUserAgents,
  ...firefoxUserAgents,
  ...edgeUserAgents,
  ...otherBrowserUserAgents
];

// 按浏览器类型分组的 UA
export const userAgentsByBrowser = {
  chrome: chromeUserAgents,
  safari: safariUserAgents,
  firefox: firefoxUserAgents,
  edge: edgeUserAgents,
  other: otherBrowserUserAgents
};

// 按功能支持分组的 UA（用于测试特定功能）
export const userAgentsByFeature = {
  webp: {
    supported: [
      ...chromeUserAgents,
      ...safariUserAgents.filter(ua => ua.name.includes('iOS 13') || ua.name.includes('iOS 14') || ua.name.includes('iOS 15')),
      ...firefoxUserAgents,
      ...edgeUserAgents,
      ...otherBrowserUserAgents
    ],
    unsupported: [
      ...safariUserAgents.filter(ua => ua.name.includes('iOS 11') || ua.name.includes('iOS 12'))
    ]
  },
  aspectRatio: {
    supported: [
      ...chromeUserAgents,
      ...safariUserAgents.filter(ua => ua.name.includes('iOS 15')),
      ...firefoxUserAgents,
      ...edgeUserAgents,
      ...otherBrowserUserAgents
    ],
    unsupported: [
      ...safariUserAgents.filter(ua => ua.name.includes('iOS 14') || ua.name.includes('iOS 13') || ua.name.includes('iOS 12') || ua.name.includes('iOS 11'))
    ]
  }
};
