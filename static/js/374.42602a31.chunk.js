/*! For license information please see 374.42602a31.chunk.js.LICENSE.txt */
(self.webpackChunkaiw_web_app = self.webpackChunkaiw_web_app || []).push([
  [374],
  {
    69941: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CoinbaseWalletSDK = void 0);
      const n = r(63401),
        i = r(86009),
        s = r(27542),
        o = r(69536),
        a = r(25872),
        l = r(46684),
        c = r(93470),
        u = r(75362),
        h = r(41827),
        d = r(60030),
        f = r(79106);
      class p {
        constructor(e) {
          var t, r, n;
          (this._appName = ""),
            (this._appLogoUrl = null),
            (this._relay = null),
            (this._relayEventManager = null);
          const a = e.linkAPIUrl || i.LINK_API_URL;
          "undefined" === typeof e.overrideIsMetaMask
            ? (this._overrideIsMetaMask = !1)
            : (this._overrideIsMetaMask = e.overrideIsMetaMask),
            (this._overrideIsCoinbaseWallet =
              null === (t = e.overrideIsCoinbaseWallet) || void 0 === t || t),
            (this._overrideIsCoinbaseBrowser =
              null !== (r = e.overrideIsCoinbaseBrowser) && void 0 !== r && r),
            (this._diagnosticLogger = e.diagnosticLogger),
            (this._reloadOnDisconnect =
              null === (n = e.reloadOnDisconnect) || void 0 === n || n);
          const g = new URL(a),
            m = `${g.protocol}//${g.host}`;
          if (
            ((this._storage = new o.ScopedLocalStorage(`-walletlink:${m}`)),
            this._storage.setItem("version", p.VERSION),
            this.walletExtension || this.coinbaseBrowser)
          )
            return;
          this._relayEventManager = new u.RelayEventManager();
          const _ = (0, s.isMobileWeb)(),
            v =
              e.uiConstructor ||
              ((e) =>
                _ ? new c.MobileRelayUI(e) : new h.WalletLinkRelayUI(e)),
            y = {
              linkAPIUrl: a,
              version: f.LIB_VERSION,
              darkMode: !!e.darkMode,
              uiConstructor: v,
              storage: this._storage,
              relayEventManager: this._relayEventManager,
              diagnosticLogger: this._diagnosticLogger,
              reloadOnDisconnect: this._reloadOnDisconnect,
              enableMobileWalletLink: e.enableMobileWalletLink,
            };
          (this._relay = _ ? new l.MobileRelay(y) : new d.WalletLinkRelay(y)),
            this.setAppInfo(e.appName, e.appLogoUrl),
            e.headlessMode || this._relay.attachUI();
        }
        makeWeb3Provider() {
          let e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : "",
            t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 1;
          const r = this.walletExtension;
          if (r)
            return (
              this.isCipherProvider(r) || r.setProviderInfo(e, t),
              !1 === this._reloadOnDisconnect &&
                "function" === typeof r.disableReloadOnDisconnect &&
                r.disableReloadOnDisconnect(),
              r
            );
          const n = this.coinbaseBrowser;
          if (n) return n;
          const i = this._relay;
          if (!i || !this._relayEventManager || !this._storage)
            throw new Error("Relay not initialized, should never happen");
          return (
            e || i.setConnectDisabled(!0),
            new a.CoinbaseWalletProvider({
              relayProvider: () => Promise.resolve(i),
              relayEventManager: this._relayEventManager,
              storage: this._storage,
              jsonRpcUrl: e,
              chainId: t,
              qrUrl: this.getQrUrl(),
              diagnosticLogger: this._diagnosticLogger,
              overrideIsMetaMask: this._overrideIsMetaMask,
              overrideIsCoinbaseWallet: this._overrideIsCoinbaseWallet,
              overrideIsCoinbaseBrowser: this._overrideIsCoinbaseBrowser,
            })
          );
        }
        setAppInfo(e, t) {
          var r;
          (this._appName = e || "DApp"),
            (this._appLogoUrl = t || (0, s.getFavicon)());
          const n = this.walletExtension;
          n
            ? this.isCipherProvider(n) ||
              n.setAppInfo(this._appName, this._appLogoUrl)
            : null === (r = this._relay) ||
              void 0 === r ||
              r.setAppInfo(this._appName, this._appLogoUrl);
        }
        disconnect() {
          var e;
          const t =
            null === this || void 0 === this ? void 0 : this.walletExtension;
          t
            ? t.close()
            : null === (e = this._relay) || void 0 === e || e.resetAndReload();
        }
        getQrUrl() {
          var e, t;
          return null !==
            (t =
              null === (e = this._relay) || void 0 === e
                ? void 0
                : e.getQRCodeUrl()) && void 0 !== t
            ? t
            : null;
        }
        getCoinbaseWalletLogo(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 240;
          return (0, n.walletLogo)(e, t);
        }
        get walletExtension() {
          var e;
          return null !== (e = window.coinbaseWalletExtension) && void 0 !== e
            ? e
            : window.walletLinkExtension;
        }
        get coinbaseBrowser() {
          var e, t;
          try {
            const r =
              null !== (e = window.ethereum) && void 0 !== e
                ? e
                : null === (t = window.top) || void 0 === t
                ? void 0
                : t.ethereum;
            if (!r) return;
            return "isCoinbaseBrowser" in r && r.isCoinbaseBrowser ? r : void 0;
          } catch (r) {
            return;
          }
        }
        isCipherProvider(e) {
          return "boolean" === typeof e.isCipher && e.isCipher;
        }
      }
      (t.CoinbaseWalletSDK = p), (p.VERSION = f.LIB_VERSION);
    },
    63401: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.walletLogo = void 0);
      t.walletLogo = (e, t) => {
        let r;
        switch (e) {
          case "standard":
          default:
            return (
              (r = t),
              `data:image/svg+xml,%3Csvg width='${t}' height='${r}' viewBox='0 0 1024 1024' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect width='1024' height='1024' fill='%230052FF'/%3E %3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M152 512C152 710.823 313.177 872 512 872C710.823 872 872 710.823 872 512C872 313.177 710.823 152 512 152C313.177 152 152 313.177 152 512ZM420 396C406.745 396 396 406.745 396 420V604C396 617.255 406.745 628 420 628H604C617.255 628 628 617.255 628 604V420C628 406.745 617.255 396 604 396H420Z' fill='white'/%3E %3C/svg%3E `
            );
          case "circle":
            return (
              (r = t),
              `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${t}' height='${r}' viewBox='0 0 999.81 999.81'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052fe;%7D.cls-2%7Bfill:%23fefefe;%7D.cls-3%7Bfill:%230152fe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M655-115.9h56c.83,1.59,2.36.88,3.56,1a478,478,0,0,1,75.06,10.42C891.4-81.76,978.33-32.58,1049.19,44q116.7,126,131.94,297.61c.38,4.14-.34,8.53,1.78,12.45v59c-1.58.84-.91,2.35-1,3.56a482.05,482.05,0,0,1-10.38,74.05c-24,106.72-76.64,196.76-158.83,268.93s-178.18,112.82-287.2,122.6c-4.83.43-9.86-.25-14.51,1.77H654c-1-1.68-2.69-.91-4.06-1a496.89,496.89,0,0,1-105.9-18.59c-93.54-27.42-172.78-77.59-236.91-150.94Q199.34,590.1,184.87,426.58c-.47-5.19.25-10.56-1.77-15.59V355c1.68-1,.91-2.7,1-4.06a498.12,498.12,0,0,1,18.58-105.9c26-88.75,72.64-164.9,140.6-227.57q126-116.27,297.21-131.61C645.32-114.57,650.35-113.88,655-115.9Zm377.92,500c0-192.44-156.31-349.49-347.56-350.15-194.13-.68-350.94,155.13-352.29,347.42-1.37,194.55,155.51,352.1,348.56,352.47C876.15,734.23,1032.93,577.84,1032.93,384.11Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-2' d='M1032.93,384.11c0,193.73-156.78,350.12-351.29,349.74-193-.37-349.93-157.92-348.56-352.47C334.43,189.09,491.24,33.28,685.37,34,876.62,34.62,1032.94,191.67,1032.93,384.11ZM683,496.81q43.74,0,87.48,0c15.55,0,25.32-9.72,25.33-25.21q0-87.48,0-175c0-15.83-9.68-25.46-25.59-25.46H595.77c-15.88,0-25.57,9.64-25.58,25.46q0,87.23,0,174.45c0,16.18,9.59,25.7,25.84,25.71Z' transform='translate(-183.1 115.9)'/%3E%3Cpath class='cls-3' d='M683,496.81H596c-16.25,0-25.84-9.53-25.84-25.71q0-87.23,0-174.45c0-15.82,9.7-25.46,25.58-25.46H770.22c15.91,0,25.59,9.63,25.59,25.46q0,87.47,0,175c0,15.49-9.78,25.2-25.33,25.21Q726.74,496.84,683,496.81Z' transform='translate(-183.1 115.9)'/%3E%3C/svg%3E`
            );
          case "text":
            return (
              (r = (0.1 * t).toFixed(2)),
              `data:image/svg+xml,%3Csvg width='${t}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`
            );
          case "textWithLogo":
            return (
              (r = (0.25 * t).toFixed(2)),
              `data:image/svg+xml,%3Csvg width='${t}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%230052ff;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`
            );
          case "textLight":
            return (
              (r = (0.1 * t).toFixed(2)),
              `data:image/svg+xml,%3Csvg width='${t}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 528.15 53.64'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Ctitle%3ECoinbase_Wordmark_SubBrands_ALL%3C/title%3E%3Cpath class='cls-1' d='M164.45,15a15,15,0,0,0-11.74,5.4V0h-8.64V52.92h8.5V48a15,15,0,0,0,11.88,5.62c10.37,0,18.21-8.21,18.21-19.3S174.67,15,164.45,15Zm-1.3,30.67c-6.19,0-10.73-4.83-10.73-11.31S157,23,163.22,23s10.66,4.82,10.66,11.37S169.34,45.65,163.15,45.65Zm83.31-14.91-6.34-.93c-3-.43-5.18-1.44-5.18-3.82,0-2.59,2.8-3.89,6.62-3.89,4.18,0,6.84,1.8,7.42,4.76h8.35c-.94-7.49-6.7-11.88-15.55-11.88-9.15,0-15.2,4.68-15.2,11.3,0,6.34,4,10,12,11.16l6.33.94c3.1.43,4.83,1.65,4.83,4,0,2.95-3,4.17-7.2,4.17-5.12,0-8-2.09-8.43-5.25h-8.49c.79,7.27,6.48,12.38,16.84,12.38,9.44,0,15.7-4.32,15.7-11.74C258.12,35.28,253.58,31.82,246.46,30.74Zm-27.65-2.3c0-8.06-4.9-13.46-15.27-13.46-9.79,0-15.26,5-16.34,12.6h8.57c.43-3,2.73-5.4,7.63-5.4,4.39,0,6.55,1.94,6.55,4.32,0,3.09-4,3.88-8.85,4.39-6.63.72-14.84,3-14.84,11.66,0,6.7,5,11,12.89,11,6.19,0,10.08-2.59,12-6.7.28,3.67,3,6.05,6.84,6.05h5v-7.7h-4.25Zm-8.5,9.36c0,5-4.32,8.64-9.57,8.64-3.24,0-6-1.37-6-4.25,0-3.67,4.39-4.68,8.42-5.11s6-1.22,7.13-2.88ZM281.09,15c-11.09,0-19.23,8.35-19.23,19.36,0,11.6,8.72,19.3,19.37,19.3,9,0,16.06-5.33,17.86-12.89h-9c-1.3,3.31-4.47,5.19-8.71,5.19-5.55,0-9.72-3.46-10.66-9.51H299.3V33.12C299.3,22.46,291.53,15,281.09,15Zm-9.87,15.26c1.37-5.18,5.26-7.7,9.72-7.7,4.9,0,8.64,2.8,9.51,7.7ZM19.3,23a9.84,9.84,0,0,1,9.5,7h9.14c-1.65-8.93-9-15-18.57-15A19,19,0,0,0,0,34.34c0,11.09,8.28,19.3,19.37,19.3,9.36,0,16.85-6,18.5-15H28.8a9.75,9.75,0,0,1-9.43,7.06c-6.27,0-10.66-4.83-10.66-11.31S13,23,19.3,23Zm41.11-8A19,19,0,0,0,41,34.34c0,11.09,8.28,19.3,19.37,19.3A19,19,0,0,0,79.92,34.27C79.92,23.33,71.64,15,60.41,15Zm.07,30.67c-6.19,0-10.73-4.83-10.73-11.31S54.22,23,60.41,23s10.8,4.89,10.8,11.37S66.67,45.65,60.48,45.65ZM123.41,15c-5.62,0-9.29,2.3-11.45,5.54V15.7h-8.57V52.92H112V32.69C112,27,115.63,23,121,23c5,0,8.06,3.53,8.06,8.64V52.92h8.64V31C137.66,21.6,132.84,15,123.41,15ZM92,.36a5.36,5.36,0,0,0-5.55,5.47,5.55,5.55,0,0,0,11.09,0A5.35,5.35,0,0,0,92,.36Zm-9.72,23h5.4V52.92h8.64V15.7h-14Zm298.17-7.7L366.2,52.92H372L375.29,44H392l3.33,8.88h6L386.87,15.7ZM377,39.23l6.45-17.56h.1l6.56,17.56ZM362.66,15.7l-7.88,29h-.11l-8.14-29H341l-8,28.93h-.1l-8-28.87H319L329.82,53h5.45l8.19-29.24h.11L352,53h5.66L368.1,15.7Zm135.25,0v4.86h12.32V52.92h5.6V20.56h12.32V15.7ZM467.82,52.92h25.54V48.06H473.43v-12h18.35V31.35H473.43V20.56h19.93V15.7H467.82ZM443,15.7h-5.6V52.92h24.32V48.06H443Zm-30.45,0h-5.61V52.92h24.32V48.06H412.52Z'/%3E%3C/svg%3E`
            );
          case "textWithLogoLight":
            return (
              (r = (0.25 * t).toFixed(2)),
              `data:image/svg+xml,%3Csvg width='${t}' height='${r}' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 308.44 77.61'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23fefefe;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='M142.94,20.2l-7.88,29H135l-8.15-29h-5.55l-8,28.93h-.11l-8-28.87H99.27l10.84,37.27h5.44l8.2-29.24h.1l8.41,29.24h5.66L148.39,20.2Zm17.82,0L146.48,57.42h5.82l3.28-8.88h16.65l3.34,8.88h6L167.16,20.2Zm-3.44,23.52,6.45-17.55h.11l6.56,17.55ZM278.2,20.2v4.86h12.32V57.42h5.6V25.06h12.32V20.2ZM248.11,57.42h25.54V52.55H253.71V40.61h18.35V35.85H253.71V25.06h19.94V20.2H248.11ZM223.26,20.2h-5.61V57.42H242V52.55H223.26Zm-30.46,0h-5.6V57.42h24.32V52.55H192.8Zm-154,38A19.41,19.41,0,1,1,57.92,35.57H77.47a38.81,38.81,0,1,0,0,6.47H57.92A19.39,19.39,0,0,1,38.81,58.21Z'/%3E%3C/svg%3E`
            );
        }
      };
    },
    86009: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LINK_API_URL = void 0),
        (t.LINK_API_URL = "https://www.walletlink.org");
    },
    50116: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.errorValues = t.standardErrorCodes = void 0),
        (t.standardErrorCodes = {
          rpc: {
            invalidInput: -32e3,
            resourceNotFound: -32001,
            resourceUnavailable: -32002,
            transactionRejected: -32003,
            methodNotSupported: -32004,
            limitExceeded: -32005,
            parse: -32700,
            invalidRequest: -32600,
            methodNotFound: -32601,
            invalidParams: -32602,
            internal: -32603,
          },
          provider: {
            userRejectedRequest: 4001,
            unauthorized: 4100,
            unsupportedMethod: 4200,
            disconnected: 4900,
            chainDisconnected: 4901,
            unsupportedChain: 4902,
          },
        }),
        (t.errorValues = {
          "-32700": {
            standard: "JSON RPC 2.0",
            message:
              "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
          },
          "-32600": {
            standard: "JSON RPC 2.0",
            message: "The JSON sent is not a valid Request object.",
          },
          "-32601": {
            standard: "JSON RPC 2.0",
            message: "The method does not exist / is not available.",
          },
          "-32602": {
            standard: "JSON RPC 2.0",
            message: "Invalid method parameter(s).",
          },
          "-32603": {
            standard: "JSON RPC 2.0",
            message: "Internal JSON-RPC error.",
          },
          "-32000": { standard: "EIP-1474", message: "Invalid input." },
          "-32001": { standard: "EIP-1474", message: "Resource not found." },
          "-32002": { standard: "EIP-1474", message: "Resource unavailable." },
          "-32003": { standard: "EIP-1474", message: "Transaction rejected." },
          "-32004": { standard: "EIP-1474", message: "Method not supported." },
          "-32005": {
            standard: "EIP-1474",
            message: "Request limit exceeded.",
          },
          4001: { standard: "EIP-1193", message: "User rejected the request." },
          4100: {
            standard: "EIP-1193",
            message:
              "The requested account and/or method has not been authorized by the user.",
          },
          4200: {
            standard: "EIP-1193",
            message:
              "The requested method is not supported by this Ethereum provider.",
          },
          4900: {
            standard: "EIP-1193",
            message: "The provider is disconnected from all chains.",
          },
          4901: {
            standard: "EIP-1193",
            message: "The provider is disconnected from the specified chain.",
          },
          4902: { standard: "EIP-3085", message: "Unrecognized chain ID." },
        });
    },
    3970: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.standardErrors = void 0);
      const n = r(50116),
        i = r(35320);
      function s(e, t) {
        const [r, n] = a(t);
        return new l(e, r || (0, i.getMessageFromCode)(e), n);
      }
      function o(e, t) {
        const [r, n] = a(t);
        return new c(e, r || (0, i.getMessageFromCode)(e), n);
      }
      function a(e) {
        if (e) {
          if ("string" === typeof e) return [e];
          if ("object" === typeof e && !Array.isArray(e)) {
            const { message: t, data: r } = e;
            if (t && "string" !== typeof t)
              throw new Error("Must specify string message.");
            return [t || void 0, r];
          }
        }
        return [];
      }
      t.standardErrors = {
        rpc: {
          parse: (e) => s(n.standardErrorCodes.rpc.parse, e),
          invalidRequest: (e) => s(n.standardErrorCodes.rpc.invalidRequest, e),
          invalidParams: (e) => s(n.standardErrorCodes.rpc.invalidParams, e),
          methodNotFound: (e) => s(n.standardErrorCodes.rpc.methodNotFound, e),
          internal: (e) => s(n.standardErrorCodes.rpc.internal, e),
          server: (e) => {
            if (!e || "object" !== typeof e || Array.isArray(e))
              throw new Error(
                "Ethereum RPC Server errors must provide single object argument."
              );
            const { code: t } = e;
            if (!Number.isInteger(t) || t > -32005 || t < -32099)
              throw new Error(
                '"code" must be an integer such that: -32099 <= code <= -32005'
              );
            return s(t, e);
          },
          invalidInput: (e) => s(n.standardErrorCodes.rpc.invalidInput, e),
          resourceNotFound: (e) =>
            s(n.standardErrorCodes.rpc.resourceNotFound, e),
          resourceUnavailable: (e) =>
            s(n.standardErrorCodes.rpc.resourceUnavailable, e),
          transactionRejected: (e) =>
            s(n.standardErrorCodes.rpc.transactionRejected, e),
          methodNotSupported: (e) =>
            s(n.standardErrorCodes.rpc.methodNotSupported, e),
          limitExceeded: (e) => s(n.standardErrorCodes.rpc.limitExceeded, e),
        },
        provider: {
          userRejectedRequest: (e) =>
            o(n.standardErrorCodes.provider.userRejectedRequest, e),
          unauthorized: (e) => o(n.standardErrorCodes.provider.unauthorized, e),
          unsupportedMethod: (e) =>
            o(n.standardErrorCodes.provider.unsupportedMethod, e),
          disconnected: (e) => o(n.standardErrorCodes.provider.disconnected, e),
          chainDisconnected: (e) =>
            o(n.standardErrorCodes.provider.chainDisconnected, e),
          unsupportedChain: (e) =>
            o(n.standardErrorCodes.provider.unsupportedChain, e),
          custom: (e) => {
            if (!e || "object" !== typeof e || Array.isArray(e))
              throw new Error(
                "Ethereum Provider custom errors must provide single object argument."
              );
            const { code: t, message: r, data: n } = e;
            if (!r || "string" !== typeof r)
              throw new Error('"message" must be a nonempty string');
            return new c(t, r, n);
          },
        },
      };
      class l extends Error {
        constructor(e, t, r) {
          if (!Number.isInteger(e))
            throw new Error('"code" must be an integer.');
          if (!t || "string" !== typeof t)
            throw new Error('"message" must be a nonempty string.');
          super(t), (this.code = e), void 0 !== r && (this.data = r);
        }
      }
      class c extends l {
        constructor(e, t, r) {
          if (
            !(function (e) {
              return Number.isInteger(e) && e >= 1e3 && e <= 4999;
            })(e)
          )
            throw new Error(
              '"code" must be an integer such that: 1000 <= code <= 4999'
            );
          super(e, t, r);
        }
      }
    },
    98829: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.standardErrors =
          t.standardErrorCodes =
          t.serializeError =
          t.getMessageFromCode =
          t.getErrorCode =
            void 0);
      const n = r(50116);
      Object.defineProperty(t, "standardErrorCodes", {
        enumerable: !0,
        get: function () {
          return n.standardErrorCodes;
        },
      });
      const i = r(3970);
      Object.defineProperty(t, "standardErrors", {
        enumerable: !0,
        get: function () {
          return i.standardErrors;
        },
      });
      const s = r(15883);
      Object.defineProperty(t, "serializeError", {
        enumerable: !0,
        get: function () {
          return s.serializeError;
        },
      });
      const o = r(35320);
      Object.defineProperty(t, "getErrorCode", {
        enumerable: !0,
        get: function () {
          return o.getErrorCode;
        },
      }),
        Object.defineProperty(t, "getMessageFromCode", {
          enumerable: !0,
          get: function () {
            return o.getMessageFromCode;
          },
        });
    },
    15883: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.serializeError = void 0);
      const n = r(5717),
        i = r(79106),
        s = r(50116),
        o = r(35320);
      t.serializeError = function (e, t) {
        const r = (0, o.serialize)(
            (function (e) {
              if ("string" === typeof e)
                return { message: e, code: s.standardErrorCodes.rpc.internal };
              if ((0, n.isErrorResponse)(e))
                return Object.assign(Object.assign({}, e), {
                  message: e.errorMessage,
                  code: e.errorCode,
                  data: { method: e.method },
                });
              return e;
            })(e),
            { shouldIncludeStack: !0 }
          ),
          a = new URL("https://docs.cloud.coinbase.com/wallet-sdk/docs/errors");
        a.searchParams.set("version", i.LIB_VERSION),
          a.searchParams.set("code", r.code.toString());
        const l = (function (e, t) {
          const r = null === e || void 0 === e ? void 0 : e.method;
          if (r) return r;
          if (void 0 === t) return;
          if ("string" === typeof t) return t;
          if (!Array.isArray(t)) return t.method;
          if (t.length > 0) return t[0].method;
          return;
        })(r.data, t);
        return (
          l && a.searchParams.set("method", l),
          a.searchParams.set("message", r.message),
          Object.assign(Object.assign({}, r), { docUrl: a.href })
        );
      };
    },
    35320: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.serialize =
          t.getErrorCode =
          t.isValidCode =
          t.getMessageFromCode =
          t.JSON_RPC_SERVER_ERROR_MESSAGE =
            void 0);
      const n = r(50116),
        i = "Unspecified error message.";
      function s(e) {
        let r =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : i;
        if (e && Number.isInteger(e)) {
          const r = e.toString();
          if (c(n.errorValues, r)) return n.errorValues[r].message;
          if (a(e)) return t.JSON_RPC_SERVER_ERROR_MESSAGE;
        }
        return r;
      }
      function o(e) {
        if (!Number.isInteger(e)) return !1;
        const t = e.toString();
        return !!n.errorValues[t] || !!a(e);
      }
      function a(e) {
        return e >= -32099 && e <= -32e3;
      }
      function l(e) {
        return e && "object" === typeof e && !Array.isArray(e)
          ? Object.assign({}, e)
          : e;
      }
      function c(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      function u(e, t) {
        return (
          "object" === typeof e &&
          null !== e &&
          t in e &&
          "string" === typeof e[t]
        );
      }
      (t.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error."),
        (t.getMessageFromCode = s),
        (t.isValidCode = o),
        (t.getErrorCode = function (e) {
          var t;
          return "number" === typeof e
            ? e
            : (function (e) {
                return (
                  "object" === typeof e &&
                  null !== e &&
                  ("number" === typeof e.code ||
                    "number" === typeof e.errorCode)
                );
              })(e)
            ? null !== (t = e.code) && void 0 !== t
              ? t
              : e.errorCode
            : void 0;
        }),
        (t.serialize = function (e) {
          let { shouldIncludeStack: t = !1 } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          const r = {};
          if (
            e &&
            "object" === typeof e &&
            !Array.isArray(e) &&
            c(e, "code") &&
            o(e.code)
          ) {
            const t = e;
            (r.code = t.code),
              t.message && "string" === typeof t.message
                ? ((r.message = t.message), c(t, "data") && (r.data = t.data))
                : ((r.message = s(r.code)), (r.data = { originalError: l(e) }));
          } else
            (r.code = n.standardErrorCodes.rpc.internal),
              (r.message = u(e, "message") ? e.message : i),
              (r.data = { originalError: l(e) });
          return t && (r.stack = u(e, "stack") ? e.stack : void 0), r;
        });
    },
    21042: (e, t) => {
      "use strict";
      function r() {
        return (e) => e;
      }
      var n;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ProviderType =
          t.RegExpString =
          t.IntNumber =
          t.BigIntString =
          t.AddressString =
          t.HexString =
          t.OpaqueType =
            void 0),
        (t.OpaqueType = r),
        (t.HexString = (e) => e),
        (t.AddressString = (e) => e),
        (t.BigIntString = (e) => e),
        (t.IntNumber = function (e) {
          return Math.floor(e);
        }),
        (t.RegExpString = (e) => e),
        (function (e) {
          (e.CoinbaseWallet = "CoinbaseWallet"),
            (e.MetaMask = "MetaMask"),
            (e.Unselected = "");
        })(n || (t.ProviderType = n = {}));
    },
    27542: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.isMobileWeb =
          t.getLocation =
          t.isInIFrame =
          t.createQrUrl =
          t.getFavicon =
          t.range =
          t.isBigNumber =
          t.ensureParsedJSONObject =
          t.ensureBN =
          t.ensureRegExpString =
          t.ensureIntNumber =
          t.ensureBuffer =
          t.ensureAddressString =
          t.ensureEvenLengthHexString =
          t.ensureHexString =
          t.isHexString =
          t.prepend0x =
          t.strip0x =
          t.has0xPrefix =
          t.hexStringFromIntNumber =
          t.intNumberFromHexString =
          t.bigIntStringFromBN =
          t.hexStringFromBuffer =
          t.hexStringToUint8Array =
          t.uint8ArrayToHex =
          t.randomBytesHex =
            void 0);
      const i = n(r(6373)),
        s = r(98829),
        o = r(21042),
        a = /^[0-9]*$/,
        l = /^[a-f0-9]*$/;
      function c(e) {
        return [...e].map((e) => e.toString(16).padStart(2, "0")).join("");
      }
      function u(e) {
        return e.startsWith("0x") || e.startsWith("0X");
      }
      function h(e) {
        return u(e) ? e.slice(2) : e;
      }
      function d(e) {
        return u(e) ? `0x${e.slice(2)}` : `0x${e}`;
      }
      function f(e) {
        if ("string" !== typeof e) return !1;
        const t = h(e).toLowerCase();
        return l.test(t);
      }
      function p(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if ("string" === typeof e) {
          const r = h(e).toLowerCase();
          if (l.test(r)) return (0, o.HexString)(t ? `0x${r}` : r);
        }
        throw s.standardErrors.rpc.invalidParams(
          `"${String(e)}" is not a hexadecimal string`
        );
      }
      function g(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          r = p(e, !1);
        return (
          r.length % 2 === 1 && (r = (0, o.HexString)(`0${r}`)),
          t ? (0, o.HexString)(`0x${r}`) : r
        );
      }
      function m(e) {
        if ("number" === typeof e && Number.isInteger(e))
          return (0, o.IntNumber)(e);
        if ("string" === typeof e) {
          if (a.test(e)) return (0, o.IntNumber)(Number(e));
          if (f(e))
            return (0, o.IntNumber)(new i.default(g(e, !1), 16).toNumber());
        }
        throw s.standardErrors.rpc.invalidParams(
          `Not an integer: ${String(e)}`
        );
      }
      function _(e) {
        if (null == e || "function" !== typeof e.constructor) return !1;
        const { constructor: t } = e;
        return "function" === typeof t.config && "number" === typeof t.EUCLID;
      }
      function v() {
        try {
          return null !== window.frameElement;
        } catch (e) {
          return !1;
        }
      }
      (t.randomBytesHex = function (e) {
        return c(crypto.getRandomValues(new Uint8Array(e)));
      }),
        (t.uint8ArrayToHex = c),
        (t.hexStringToUint8Array = function (e) {
          return new Uint8Array(e.match(/.{1,2}/g).map((e) => parseInt(e, 16)));
        }),
        (t.hexStringFromBuffer = function (e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          const r = e.toString("hex");
          return (0, o.HexString)(t ? `0x${r}` : r);
        }),
        (t.bigIntStringFromBN = function (e) {
          return (0, o.BigIntString)(e.toString(10));
        }),
        (t.intNumberFromHexString = function (e) {
          return (0, o.IntNumber)(new i.default(g(e, !1), 16).toNumber());
        }),
        (t.hexStringFromIntNumber = function (e) {
          return (0, o.HexString)(`0x${new i.default(e).toString(16)}`);
        }),
        (t.has0xPrefix = u),
        (t.strip0x = h),
        (t.prepend0x = d),
        (t.isHexString = f),
        (t.ensureHexString = p),
        (t.ensureEvenLengthHexString = g),
        (t.ensureAddressString = function (e) {
          if ("string" === typeof e) {
            const t = h(e).toLowerCase();
            if (f(t) && 40 === t.length) return (0, o.AddressString)(d(t));
          }
          throw s.standardErrors.rpc.invalidParams(
            `Invalid Ethereum address: ${String(e)}`
          );
        }),
        (t.ensureBuffer = function (e) {
          if (Buffer.isBuffer(e)) return e;
          if ("string" === typeof e) {
            if (f(e)) {
              const t = g(e, !1);
              return Buffer.from(t, "hex");
            }
            return Buffer.from(e, "utf8");
          }
          throw s.standardErrors.rpc.invalidParams(
            `Not binary data: ${String(e)}`
          );
        }),
        (t.ensureIntNumber = m),
        (t.ensureRegExpString = function (e) {
          if (e instanceof RegExp) return (0, o.RegExpString)(e.toString());
          throw s.standardErrors.rpc.invalidParams(
            `Not a RegExp: ${String(e)}`
          );
        }),
        (t.ensureBN = function (e) {
          if (null !== e && (i.default.isBN(e) || _(e)))
            return new i.default(e.toString(10), 10);
          if ("number" === typeof e) return new i.default(m(e));
          if ("string" === typeof e) {
            if (a.test(e)) return new i.default(e, 10);
            if (f(e)) return new i.default(g(e, !1), 16);
          }
          throw s.standardErrors.rpc.invalidParams(
            `Not an integer: ${String(e)}`
          );
        }),
        (t.ensureParsedJSONObject = function (e) {
          if ("string" === typeof e) return JSON.parse(e);
          if ("object" === typeof e) return e;
          throw s.standardErrors.rpc.invalidParams(
            `Not a JSON string or an object: ${String(e)}`
          );
        }),
        (t.isBigNumber = _),
        (t.range = function (e, t) {
          return Array.from({ length: t - e }, (t, r) => e + r);
        }),
        (t.getFavicon = function () {
          const e =
              document.querySelector('link[sizes="192x192"]') ||
              document.querySelector('link[sizes="180x180"]') ||
              document.querySelector('link[rel="icon"]') ||
              document.querySelector('link[rel="shortcut icon"]'),
            { protocol: t, host: r } = document.location,
            n = e ? e.getAttribute("href") : null;
          return !n || n.startsWith("javascript:") || n.startsWith("vbscript:")
            ? null
            : n.startsWith("http://") ||
              n.startsWith("https://") ||
              n.startsWith("data:")
            ? n
            : n.startsWith("//")
            ? t + n
            : `${t}//${r}${n}`;
        }),
        (t.createQrUrl = function (e, t, r, n, i, s) {
          const o = n ? "parent-id" : "id";
          return `${r}/#/link?${new URLSearchParams({
            [o]: e,
            secret: t,
            server: r,
            v: i,
            chainId: s.toString(),
          }).toString()}`;
        }),
        (t.isInIFrame = v),
        (t.getLocation = function () {
          try {
            return v() && window.top ? window.top.location : window.location;
          } catch (e) {
            return window.location;
          }
        }),
        (t.isMobileWeb = function () {
          var e;
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            null ===
              (e =
                null === window || void 0 === window
                  ? void 0
                  : window.navigator) || void 0 === e
              ? void 0
              : e.userAgent
          );
        });
    },
    36374: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CoinbaseWalletProvider = t.CoinbaseWalletSDK = void 0);
      const n = r(69941),
        i = r(25872);
      var s = r(69941);
      Object.defineProperty(t, "CoinbaseWalletSDK", {
        enumerable: !0,
        get: function () {
          return s.CoinbaseWalletSDK;
        },
      });
      var o = r(25872);
      Object.defineProperty(t, "CoinbaseWalletProvider", {
        enumerable: !0,
        get: function () {
          return o.CoinbaseWalletProvider;
        },
      }),
        (t.default = n.CoinbaseWalletSDK),
        "undefined" !== typeof window &&
          ((window.CoinbaseWalletSDK = n.CoinbaseWalletSDK),
          (window.CoinbaseWalletProvider = i.CoinbaseWalletProvider),
          (window.WalletLink = n.CoinbaseWalletSDK),
          (window.WalletLinkProvider = i.CoinbaseWalletProvider));
    },
    82215: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Cipher = void 0);
      const n = r(27542);
      t.Cipher = class {
        constructor(e) {
          this.secret = e;
        }
        async encrypt(e) {
          const t = this.secret;
          if (64 !== t.length) throw Error("secret must be 256 bits");
          const r = crypto.getRandomValues(new Uint8Array(12)),
            i = await crypto.subtle.importKey(
              "raw",
              (0, n.hexStringToUint8Array)(t),
              { name: "aes-gcm" },
              !1,
              ["encrypt", "decrypt"]
            ),
            s = new TextEncoder(),
            o = await window.crypto.subtle.encrypt(
              { name: "AES-GCM", iv: r },
              i,
              s.encode(e)
            ),
            a = o.slice(o.byteLength - 16),
            l = o.slice(0, o.byteLength - 16),
            c = new Uint8Array(a),
            u = new Uint8Array(l),
            h = new Uint8Array([...r, ...c, ...u]);
          return (0, n.uint8ArrayToHex)(h);
        }
        async decrypt(e) {
          const t = this.secret;
          if (64 !== t.length) throw Error("secret must be 256 bits");
          return new Promise((r, i) => {
            !(async function () {
              const s = await crypto.subtle.importKey(
                  "raw",
                  (0, n.hexStringToUint8Array)(t),
                  { name: "aes-gcm" },
                  !1,
                  ["encrypt", "decrypt"]
                ),
                o = (0, n.hexStringToUint8Array)(e),
                a = o.slice(0, 12),
                l = o.slice(12, 28),
                c = o.slice(28),
                u = new Uint8Array([...c, ...l]),
                h = { name: "AES-GCM", iv: new Uint8Array(a) };
              try {
                const e = await window.crypto.subtle.decrypt(h, s, u),
                  t = new TextDecoder();
                r(t.decode(e));
              } catch (d) {
                i(d);
              }
            })();
          });
        }
      };
    },
    69536: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ScopedLocalStorage = void 0);
      t.ScopedLocalStorage = class {
        constructor(e) {
          this.scope = e;
        }
        setItem(e, t) {
          localStorage.setItem(this.scopedKey(e), t);
        }
        getItem(e) {
          return localStorage.getItem(this.scopedKey(e));
        }
        removeItem(e) {
          localStorage.removeItem(this.scopedKey(e));
        }
        clear() {
          const e = this.scopedKey(""),
            t = [];
          for (let r = 0; r < localStorage.length; r++) {
            const n = localStorage.key(r);
            "string" === typeof n && n.startsWith(e) && t.push(n);
          }
          t.forEach((e) => localStorage.removeItem(e));
        }
        scopedKey(e) {
          return `${this.scope}:${e}`;
        }
      };
    },
    39744: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default =
          '@namespace svg "http://www.w3.org/2000/svg";.-cbwsdk-css-reset,.-cbwsdk-css-reset *{animation:none;animation-delay:0;animation-direction:normal;animation-duration:0;animation-fill-mode:none;animation-iteration-count:1;animation-name:none;animation-play-state:running;animation-timing-function:ease;backface-visibility:visible;background:0;background-attachment:scroll;background-clip:border-box;background-color:rgba(0,0,0,0);background-image:none;background-origin:padding-box;background-position:0 0;background-position-x:0;background-position-y:0;background-repeat:repeat;background-size:auto auto;border:0;border-style:none;border-width:medium;border-color:inherit;border-bottom:0;border-bottom-color:inherit;border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom-style:none;border-bottom-width:medium;border-collapse:separate;border-image:none;border-left:0;border-left-color:inherit;border-left-style:none;border-left-width:medium;border-radius:0;border-right:0;border-right-color:inherit;border-right-style:none;border-right-width:medium;border-spacing:0;border-top:0;border-top-color:inherit;border-top-left-radius:0;border-top-right-radius:0;border-top-style:none;border-top-width:medium;box-shadow:none;box-sizing:border-box;caption-side:top;clear:none;clip:auto;color:inherit;columns:auto;column-count:auto;column-fill:balance;column-gap:normal;column-rule:medium none currentColor;column-rule-color:currentColor;column-rule-style:none;column-rule-width:none;column-span:1;column-width:auto;counter-increment:none;counter-reset:none;direction:ltr;empty-cells:show;float:none;font:normal;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;height:auto;hyphens:none;letter-spacing:normal;line-height:normal;list-style:none;list-style-image:none;list-style-position:outside;list-style-type:disc;margin:0;margin-bottom:0;margin-left:0;margin-right:0;margin-top:0;opacity:1;orphans:0;outline:0;outline-color:invert;outline-style:none;outline-width:medium;overflow:visible;overflow-x:visible;overflow-y:visible;padding:0;padding-bottom:0;padding-left:0;padding-right:0;padding-top:0;page-break-after:auto;page-break-before:auto;page-break-inside:auto;perspective:none;perspective-origin:50% 50%;pointer-events:auto;position:static;quotes:"\\201C" "\\201D" "\\2018" "\\2019";tab-size:8;table-layout:auto;text-align:inherit;text-align-last:auto;text-decoration:none;text-decoration-color:inherit;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-shadow:none;text-transform:none;transform:none;transform-style:flat;transition:none;transition-delay:0s;transition-duration:0s;transition-property:none;transition-timing-function:ease;unicode-bidi:normal;vertical-align:baseline;visibility:visible;white-space:normal;widows:0;word-spacing:normal;z-index:auto}.-cbwsdk-css-reset strong{font-weight:bold}.-cbwsdk-css-reset *{box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;line-height:1}.-cbwsdk-css-reset [class*=container]{margin:0;padding:0}.-cbwsdk-css-reset style{display:none}');
    },
    78970: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.injectCssReset = void 0);
      const i = n(r(39744));
      t.injectCssReset = function () {
        const e = document.createElement("style");
        (e.type = "text/css"),
          e.appendChild(document.createTextNode(i.default)),
          document.documentElement.appendChild(e);
      };
    },
    25872: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CoinbaseWalletProvider = void 0);
      const i = n(r(6373)),
        s = r(17283),
        o = r(98829),
        a = r(27542),
        l = r(46684),
        c = r(84155),
        u = r(5576),
        h = r(5717),
        d = n(r(2213)),
        f = r(55419),
        p = r(36105),
        g = r(28158),
        m = "DefaultChainId",
        _ = "DefaultJsonRpcUrl";
      class v extends s.EventEmitter {
        constructor(e) {
          var t, r;
          super(),
            (this._filterPolyfill = new p.FilterPolyfill(this)),
            (this._subscriptionManager = new g.SubscriptionManager(this)),
            (this._relay = null),
            (this._addresses = []),
            (this.hasMadeFirstChainChangedEmission = !1),
            (this.setProviderInfo = this.setProviderInfo.bind(this)),
            (this.updateProviderInfo = this.updateProviderInfo.bind(this)),
            (this.getChainId = this.getChainId.bind(this)),
            (this.setAppInfo = this.setAppInfo.bind(this)),
            (this.enable = this.enable.bind(this)),
            (this.close = this.close.bind(this)),
            (this.send = this.send.bind(this)),
            (this.sendAsync = this.sendAsync.bind(this)),
            (this.request = this.request.bind(this)),
            (this._setAddresses = this._setAddresses.bind(this)),
            (this.scanQRCode = this.scanQRCode.bind(this)),
            (this.genericRequest = this.genericRequest.bind(this)),
            (this._chainIdFromOpts = e.chainId),
            (this._jsonRpcUrlFromOpts = e.jsonRpcUrl),
            (this._overrideIsMetaMask = e.overrideIsMetaMask),
            (this._relayProvider = e.relayProvider),
            (this._storage = e.storage),
            (this._relayEventManager = e.relayEventManager),
            (this.diagnostic = e.diagnosticLogger),
            (this.reloadOnDisconnect = !0),
            (this.isCoinbaseWallet =
              null === (t = e.overrideIsCoinbaseWallet) || void 0 === t || t),
            (this.isCoinbaseBrowser =
              null !== (r = e.overrideIsCoinbaseBrowser) && void 0 !== r && r),
            (this.qrUrl = e.qrUrl);
          const n = this.getChainId(),
            i = (0, a.prepend0x)(n.toString(16));
          this.emit("connect", { chainIdStr: i });
          const s = this._storage.getItem(c.LOCAL_STORAGE_ADDRESSES_KEY);
          if (s) {
            const e = s.split(" ");
            "" !== e[0] &&
              ((this._addresses = e.map((e) => (0, a.ensureAddressString)(e))),
              this.emit("accountsChanged", e));
          }
          this._subscriptionManager.events.on("notification", (e) => {
            this.emit("message", { type: e.method, data: e.params });
          }),
            this._isAuthorized() && this.initializeRelay(),
            window.addEventListener("message", (e) => {
              var t;
              if (
                e.origin === location.origin &&
                e.source === window &&
                "walletLinkMessage" === e.data.type &&
                "dappChainSwitched" === e.data.data.action
              ) {
                const r = e.data.data.chainId,
                  n =
                    null !== (t = e.data.data.jsonRpcUrl) && void 0 !== t
                      ? t
                      : this.jsonRpcUrl;
                this.updateProviderInfo(n, Number(r));
              }
            });
        }
        get selectedAddress() {
          return this._addresses[0] || void 0;
        }
        get networkVersion() {
          return this.getChainId().toString(10);
        }
        get chainId() {
          return (0, a.prepend0x)(this.getChainId().toString(16));
        }
        get isWalletLink() {
          return !0;
        }
        get isMetaMask() {
          return this._overrideIsMetaMask;
        }
        get host() {
          return this.jsonRpcUrl;
        }
        get connected() {
          return !0;
        }
        isConnected() {
          return !0;
        }
        get jsonRpcUrl() {
          var e;
          return null !== (e = this._storage.getItem(_)) && void 0 !== e
            ? e
            : this._jsonRpcUrlFromOpts;
        }
        set jsonRpcUrl(e) {
          this._storage.setItem(_, e);
        }
        disableReloadOnDisconnect() {
          this.reloadOnDisconnect = !1;
        }
        setProviderInfo(e, t) {
          this.isCoinbaseBrowser ||
            ((this._chainIdFromOpts = t), (this._jsonRpcUrlFromOpts = e)),
            this.updateProviderInfo(this.jsonRpcUrl, this.getChainId());
        }
        updateProviderInfo(e, t) {
          this.jsonRpcUrl = e;
          const r = this.getChainId();
          this._storage.setItem(m, t.toString(10));
          (!((0, a.ensureIntNumber)(t) !== r) &&
            this.hasMadeFirstChainChangedEmission) ||
            (this.emit("chainChanged", this.getChainId()),
            (this.hasMadeFirstChainChangedEmission = !0));
        }
        async watchAsset(e, t, r, n, i, s) {
          const o = await this.initializeRelay(),
            a = await o.watchAsset(
              e,
              t,
              r,
              n,
              i,
              null === s || void 0 === s ? void 0 : s.toString()
            ).promise;
          return !(0, h.isErrorResponse)(a) && !!a.result;
        }
        async addEthereumChain(e, t, r, n, i, s) {
          var o, l;
          if ((0, a.ensureIntNumber)(e) === this.getChainId()) return !1;
          const c = await this.initializeRelay(),
            u = c.inlineAddEthereumChain(e.toString());
          this._isAuthorized() ||
            u ||
            (await c.requestEthereumAccounts().promise);
          const d = await c.addEthereumChain(e.toString(), t, i, r, n, s)
            .promise;
          return (
            !(0, h.isErrorResponse)(d) &&
            (!0 ===
              (null === (o = d.result) || void 0 === o
                ? void 0
                : o.isApproved) && this.updateProviderInfo(t[0], e),
            !0 ===
              (null === (l = d.result) || void 0 === l ? void 0 : l.isApproved))
          );
        }
        async switchEthereumChain(e) {
          const t = await this.initializeRelay(),
            r = await t.switchEthereumChain(
              e.toString(10),
              this.selectedAddress || void 0
            ).promise;
          if ((0, h.isErrorResponse)(r)) {
            if (!r.errorCode) return;
            throw r.errorCode === o.standardErrorCodes.provider.unsupportedChain
              ? o.standardErrors.provider.unsupportedChain()
              : o.standardErrors.provider.custom({
                  message: r.errorMessage,
                  code: r.errorCode,
                });
          }
          const n = r.result;
          n.isApproved &&
            n.rpcUrl.length > 0 &&
            this.updateProviderInfo(n.rpcUrl, e);
        }
        setAppInfo(e, t) {
          this.initializeRelay().then((r) => r.setAppInfo(e, t));
        }
        async enable() {
          var e;
          return (
            null === (e = this.diagnostic) ||
              void 0 === e ||
              e.log(f.EVENTS.ETH_ACCOUNTS_STATE, {
                method: "provider::enable",
                addresses_length: this._addresses.length,
                sessionIdHash: this._relay
                  ? u.Session.hash(this._relay.session.id)
                  : void 0,
              }),
            this._isAuthorized()
              ? [...this._addresses]
              : await this.send("eth_requestAccounts")
          );
        }
        async close() {
          (await this.initializeRelay()).resetAndReload();
        }
        send(e, t) {
          try {
            const r = this._send(e, t);
            if (r instanceof Promise)
              return r.catch((t) => {
                throw (0, o.serializeError)(t, e);
              });
          } catch (r) {
            throw (0, o.serializeError)(r, e);
          }
        }
        _send(e, t) {
          if ("string" === typeof e) {
            const r = {
              jsonrpc: "2.0",
              id: 0,
              method: e,
              params: Array.isArray(t) ? t : void 0 !== t ? [t] : [],
            };
            return this._sendRequestAsync(r).then((e) => e.result);
          }
          if ("function" === typeof t) {
            const r = e,
              n = t;
            return this._sendAsync(r, n);
          }
          if (Array.isArray(e)) {
            return e.map((e) => this._sendRequest(e));
          }
          const r = e;
          return this._sendRequest(r);
        }
        async sendAsync(e, t) {
          try {
            return this._sendAsync(e, t).catch((t) => {
              throw (0, o.serializeError)(t, e);
            });
          } catch (r) {
            return Promise.reject((0, o.serializeError)(r, e));
          }
        }
        async _sendAsync(e, t) {
          if ("function" !== typeof t) throw new Error("callback is required");
          if (Array.isArray(e)) {
            const r = t;
            return void this._sendMultipleRequestsAsync(e)
              .then((e) => r(null, e))
              .catch((e) => r(e, null));
          }
          const r = t;
          return this._sendRequestAsync(e)
            .then((e) => r(null, e))
            .catch((e) => r(e, null));
        }
        async request(e) {
          try {
            return this._request(e).catch((t) => {
              throw (0, o.serializeError)(t, e.method);
            });
          } catch (t) {
            return Promise.reject((0, o.serializeError)(t, e.method));
          }
        }
        async _request(e) {
          if (!e || "object" !== typeof e || Array.isArray(e))
            throw o.standardErrors.rpc.invalidRequest({
              message: "Expected a single, non-array, object argument.",
              data: e,
            });
          const { method: t, params: r } = e;
          if ("string" !== typeof t || 0 === t.length)
            throw o.standardErrors.rpc.invalidRequest({
              message: "'args.method' must be a non-empty string.",
              data: e,
            });
          if (
            void 0 !== r &&
            !Array.isArray(r) &&
            ("object" !== typeof r || null === r)
          )
            throw o.standardErrors.rpc.invalidRequest({
              message: "'args.params' must be an object or array if provided.",
              data: e,
            });
          const n = void 0 === r ? [] : r,
            i = this._relayEventManager.makeRequestId();
          return (
            await this._sendRequestAsync({
              method: t,
              params: n,
              jsonrpc: "2.0",
              id: i,
            })
          ).result;
        }
        async scanQRCode(e) {
          const t = await this.initializeRelay(),
            r = await t.scanQRCode((0, a.ensureRegExpString)(e)).promise;
          if ((0, h.isErrorResponse)(r))
            throw (0, o.serializeError)(r.errorMessage, "scanQRCode");
          if ("string" !== typeof r.result)
            throw (0, o.serializeError)(
              "result was not a string",
              "scanQRCode"
            );
          return r.result;
        }
        async genericRequest(e, t) {
          const r = await this.initializeRelay(),
            n = await r.genericRequest(e, t).promise;
          if ((0, h.isErrorResponse)(n))
            throw (0, o.serializeError)(n.errorMessage, "generic");
          if ("string" !== typeof n.result)
            throw (0, o.serializeError)("result was not a string", "generic");
          return n.result;
        }
        async connectAndSignIn(e) {
          var t;
          let r;
          null === (t = this.diagnostic) ||
            void 0 === t ||
            t.log(f.EVENTS.ETH_ACCOUNTS_STATE, {
              method: "provider::connectAndSignIn",
              sessionIdHash: this._relay
                ? u.Session.hash(this._relay.session.id)
                : void 0,
            });
          try {
            const t = await this.initializeRelay();
            if (!(t instanceof l.MobileRelay))
              throw new Error("connectAndSignIn is only supported on mobile");
            if (
              ((r = await t.connectAndSignIn(e).promise),
              (0, h.isErrorResponse)(r))
            )
              throw new Error(r.errorMessage);
          } catch (i) {
            if (
              "string" === typeof i.message &&
              i.message.match(/(denied|rejected)/i)
            )
              throw o.standardErrors.provider.userRejectedRequest(
                "User denied account authorization"
              );
            throw i;
          }
          if (!r.result) throw new Error("accounts received is empty");
          const { accounts: n } = r.result;
          return (
            this._setAddresses(n),
            this.isCoinbaseBrowser ||
              (await this.switchEthereumChain(this.getChainId())),
            r.result
          );
        }
        async selectProvider(e) {
          const t = await this.initializeRelay(),
            r = await t.selectProvider(e).promise;
          if ((0, h.isErrorResponse)(r))
            throw (0, o.serializeError)(r.errorMessage, "selectProvider");
          if ("string" !== typeof r.result)
            throw (0, o.serializeError)(
              "result was not a string",
              "selectProvider"
            );
          return r.result;
        }
        supportsSubscriptions() {
          return !1;
        }
        subscribe() {
          throw new Error("Subscriptions are not supported");
        }
        unsubscribe() {
          throw new Error("Subscriptions are not supported");
        }
        disconnect() {
          return !0;
        }
        _sendRequest(e) {
          const t = { jsonrpc: "2.0", id: e.id },
            { method: r } = e;
          if (
            ((t.result = this._handleSynchronousMethods(e)),
            void 0 === t.result)
          )
            throw new Error(
              `Coinbase Wallet does not support calling ${r} synchronously without a callback. Please provide a callback parameter to call ${r} asynchronously.`
            );
          return t;
        }
        _setAddresses(e, t) {
          if (!Array.isArray(e)) throw new Error("addresses is not an array");
          const r = e.map((e) => (0, a.ensureAddressString)(e));
          JSON.stringify(r) !== JSON.stringify(this._addresses) &&
            ((this._addresses = r),
            this.emit("accountsChanged", this._addresses),
            this._storage.setItem(c.LOCAL_STORAGE_ADDRESSES_KEY, r.join(" ")));
        }
        _sendRequestAsync(e) {
          return new Promise((t, r) => {
            try {
              const n = this._handleSynchronousMethods(e);
              if (void 0 !== n)
                return t({ jsonrpc: "2.0", id: e.id, result: n });
              const i = this._handleAsynchronousFilterMethods(e);
              if (void 0 !== i)
                return void i
                  .then((r) =>
                    t(Object.assign(Object.assign({}, r), { id: e.id }))
                  )
                  .catch((e) => r(e));
              const s = this._handleSubscriptionMethods(e);
              if (void 0 !== s)
                return void s
                  .then((r) =>
                    t({ jsonrpc: "2.0", id: e.id, result: r.result })
                  )
                  .catch((e) => r(e));
            } catch (n) {
              return r(n);
            }
            this._handleAsynchronousMethods(e)
              .then(
                (r) => r && t(Object.assign(Object.assign({}, r), { id: e.id }))
              )
              .catch((e) => r(e));
          });
        }
        _sendMultipleRequestsAsync(e) {
          return Promise.all(e.map((e) => this._sendRequestAsync(e)));
        }
        _handleSynchronousMethods(e) {
          const { method: t } = e,
            r = e.params || [];
          switch (t) {
            case "eth_accounts":
              return this._eth_accounts();
            case "eth_coinbase":
              return this._eth_coinbase();
            case "eth_uninstallFilter":
              return this._eth_uninstallFilter(r);
            case "net_version":
              return this._net_version();
            case "eth_chainId":
              return this._eth_chainId();
            default:
              return;
          }
        }
        async _handleAsynchronousMethods(e) {
          const { method: t } = e,
            r = e.params || [];
          switch (t) {
            case "eth_requestAccounts":
              return this._eth_requestAccounts();
            case "eth_sign":
              return this._eth_sign(r);
            case "eth_ecRecover":
              return this._eth_ecRecover(r);
            case "personal_sign":
              return this._personal_sign(r);
            case "personal_ecRecover":
              return this._personal_ecRecover(r);
            case "eth_signTransaction":
              return this._eth_signTransaction(r);
            case "eth_sendRawTransaction":
              return this._eth_sendRawTransaction(r);
            case "eth_sendTransaction":
              return this._eth_sendTransaction(r);
            case "eth_signTypedData_v1":
              return this._eth_signTypedData_v1(r);
            case "eth_signTypedData_v2":
              return this._throwUnsupportedMethodError();
            case "eth_signTypedData_v3":
              return this._eth_signTypedData_v3(r);
            case "eth_signTypedData_v4":
            case "eth_signTypedData":
              return this._eth_signTypedData_v4(r);
            case "cbWallet_arbitrary":
              return this._cbwallet_arbitrary(r);
            case "wallet_addEthereumChain":
              return this._wallet_addEthereumChain(r);
            case "wallet_switchEthereumChain":
              return this._wallet_switchEthereumChain(r);
            case "wallet_watchAsset":
              return this._wallet_watchAsset(r);
          }
          return (await this.initializeRelay())
            .makeEthereumJSONRPCRequest(e, this.jsonRpcUrl)
            .catch((t) => {
              var r;
              throw (
                ((t.code !== o.standardErrorCodes.rpc.methodNotFound &&
                  t.code !== o.standardErrorCodes.rpc.methodNotSupported) ||
                  null === (r = this.diagnostic) ||
                  void 0 === r ||
                  r.log(f.EVENTS.METHOD_NOT_IMPLEMENTED, {
                    method: e.method,
                    sessionIdHash: this._relay
                      ? u.Session.hash(this._relay.session.id)
                      : void 0,
                  }),
                t)
              );
            });
        }
        _handleAsynchronousFilterMethods(e) {
          const { method: t } = e,
            r = e.params || [];
          switch (t) {
            case "eth_newFilter":
              return this._eth_newFilter(r);
            case "eth_newBlockFilter":
              return this._eth_newBlockFilter();
            case "eth_newPendingTransactionFilter":
              return this._eth_newPendingTransactionFilter();
            case "eth_getFilterChanges":
              return this._eth_getFilterChanges(r);
            case "eth_getFilterLogs":
              return this._eth_getFilterLogs(r);
          }
        }
        _handleSubscriptionMethods(e) {
          switch (e.method) {
            case "eth_subscribe":
            case "eth_unsubscribe":
              return this._subscriptionManager.handleRequest(e);
          }
        }
        _isKnownAddress(e) {
          try {
            const t = (0, a.ensureAddressString)(e);
            return this._addresses
              .map((e) => (0, a.ensureAddressString)(e))
              .includes(t);
          } catch (t) {}
          return !1;
        }
        _ensureKnownAddress(e) {
          var t;
          if (!this._isKnownAddress(e))
            throw (
              (null === (t = this.diagnostic) ||
                void 0 === t ||
                t.log(f.EVENTS.UNKNOWN_ADDRESS_ENCOUNTERED),
              new Error("Unknown Ethereum address"))
            );
        }
        _prepareTransactionParams(e) {
          const t = e.from
            ? (0, a.ensureAddressString)(e.from)
            : this.selectedAddress;
          if (!t) throw new Error("Ethereum address is unavailable");
          this._ensureKnownAddress(t);
          return {
            fromAddress: t,
            toAddress: e.to ? (0, a.ensureAddressString)(e.to) : null,
            weiValue:
              null != e.value ? (0, a.ensureBN)(e.value) : new i.default(0),
            data: e.data ? (0, a.ensureBuffer)(e.data) : Buffer.alloc(0),
            nonce: null != e.nonce ? (0, a.ensureIntNumber)(e.nonce) : null,
            gasPriceInWei:
              null != e.gasPrice ? (0, a.ensureBN)(e.gasPrice) : null,
            maxFeePerGas:
              null != e.maxFeePerGas ? (0, a.ensureBN)(e.maxFeePerGas) : null,
            maxPriorityFeePerGas:
              null != e.maxPriorityFeePerGas
                ? (0, a.ensureBN)(e.maxPriorityFeePerGas)
                : null,
            gasLimit: null != e.gas ? (0, a.ensureBN)(e.gas) : null,
            chainId: e.chainId
              ? (0, a.ensureIntNumber)(e.chainId)
              : this.getChainId(),
          };
        }
        _isAuthorized() {
          return this._addresses.length > 0;
        }
        _requireAuthorization() {
          if (!this._isAuthorized())
            throw o.standardErrors.provider.unauthorized({});
        }
        _throwUnsupportedMethodError() {
          throw o.standardErrors.provider.unsupportedMethod({});
        }
        async _signEthereumMessage(e, t, r, n) {
          this._ensureKnownAddress(t);
          try {
            const i = await this.initializeRelay(),
              s = await i.signEthereumMessage(e, t, r, n).promise;
            if ((0, h.isErrorResponse)(s)) throw new Error(s.errorMessage);
            return { jsonrpc: "2.0", id: 0, result: s.result };
          } catch (i) {
            if (
              "string" === typeof i.message &&
              i.message.match(/(denied|rejected)/i)
            )
              throw o.standardErrors.provider.userRejectedRequest(
                "User denied message signature"
              );
            throw i;
          }
        }
        async _ethereumAddressFromSignedMessage(e, t, r) {
          const n = await this.initializeRelay(),
            i = await n.ethereumAddressFromSignedMessage(e, t, r).promise;
          if ((0, h.isErrorResponse)(i)) throw new Error(i.errorMessage);
          return { jsonrpc: "2.0", id: 0, result: i.result };
        }
        _eth_accounts() {
          return [...this._addresses];
        }
        _eth_coinbase() {
          return this.selectedAddress || null;
        }
        _net_version() {
          return this.getChainId().toString(10);
        }
        _eth_chainId() {
          return (0, a.hexStringFromIntNumber)(this.getChainId());
        }
        getChainId() {
          const e = this._storage.getItem(m);
          if (!e) return (0, a.ensureIntNumber)(this._chainIdFromOpts);
          const t = parseInt(e, 10);
          return (0, a.ensureIntNumber)(t);
        }
        async _eth_requestAccounts() {
          var e;
          if (
            (null === (e = this.diagnostic) ||
              void 0 === e ||
              e.log(f.EVENTS.ETH_ACCOUNTS_STATE, {
                method: "provider::_eth_requestAccounts",
                addresses_length: this._addresses.length,
                sessionIdHash: this._relay
                  ? u.Session.hash(this._relay.session.id)
                  : void 0,
              }),
            this._isAuthorized())
          )
            return Promise.resolve({
              jsonrpc: "2.0",
              id: 0,
              result: this._addresses,
            });
          let t;
          try {
            const e = await this.initializeRelay();
            if (
              ((t = await e.requestEthereumAccounts().promise),
              (0, h.isErrorResponse)(t))
            )
              throw new Error(t.errorMessage);
          } catch (r) {
            if (
              "string" === typeof r.message &&
              r.message.match(/(denied|rejected)/i)
            )
              throw o.standardErrors.provider.userRejectedRequest(
                "User denied account authorization"
              );
            throw r;
          }
          if (!t.result) throw new Error("accounts received is empty");
          return (
            this._setAddresses(t.result),
            this.isCoinbaseBrowser ||
              (await this.switchEthereumChain(this.getChainId())),
            { jsonrpc: "2.0", id: 0, result: this._addresses }
          );
        }
        _eth_sign(e) {
          this._requireAuthorization();
          const t = (0, a.ensureAddressString)(e[0]),
            r = (0, a.ensureBuffer)(e[1]);
          return this._signEthereumMessage(r, t, !1);
        }
        _eth_ecRecover(e) {
          const t = (0, a.ensureBuffer)(e[0]),
            r = (0, a.ensureBuffer)(e[1]);
          return this._ethereumAddressFromSignedMessage(t, r, !1);
        }
        _personal_sign(e) {
          this._requireAuthorization();
          const t = (0, a.ensureBuffer)(e[0]),
            r = (0, a.ensureAddressString)(e[1]);
          return this._signEthereumMessage(t, r, !0);
        }
        _personal_ecRecover(e) {
          const t = (0, a.ensureBuffer)(e[0]),
            r = (0, a.ensureBuffer)(e[1]);
          return this._ethereumAddressFromSignedMessage(t, r, !0);
        }
        async _eth_signTransaction(e) {
          this._requireAuthorization();
          const t = this._prepareTransactionParams(e[0] || {});
          try {
            const e = await this.initializeRelay(),
              r = await e.signEthereumTransaction(t).promise;
            if ((0, h.isErrorResponse)(r)) throw new Error(r.errorMessage);
            return { jsonrpc: "2.0", id: 0, result: r.result };
          } catch (r) {
            if (
              "string" === typeof r.message &&
              r.message.match(/(denied|rejected)/i)
            )
              throw o.standardErrors.provider.userRejectedRequest(
                "User denied transaction signature"
              );
            throw r;
          }
        }
        async _eth_sendRawTransaction(e) {
          const t = (0, a.ensureBuffer)(e[0]),
            r = await this.initializeRelay(),
            n = await r.submitEthereumTransaction(t, this.getChainId()).promise;
          if ((0, h.isErrorResponse)(n)) throw new Error(n.errorMessage);
          return { jsonrpc: "2.0", id: 0, result: n.result };
        }
        async _eth_sendTransaction(e) {
          this._requireAuthorization();
          const t = this._prepareTransactionParams(e[0] || {});
          try {
            const e = await this.initializeRelay(),
              r = await e.signAndSubmitEthereumTransaction(t).promise;
            if ((0, h.isErrorResponse)(r)) throw new Error(r.errorMessage);
            return { jsonrpc: "2.0", id: 0, result: r.result };
          } catch (r) {
            if (
              "string" === typeof r.message &&
              r.message.match(/(denied|rejected)/i)
            )
              throw o.standardErrors.provider.userRejectedRequest(
                "User denied transaction signature"
              );
            throw r;
          }
        }
        async _eth_signTypedData_v1(e) {
          this._requireAuthorization();
          const t = (0, a.ensureParsedJSONObject)(e[0]),
            r = (0, a.ensureAddressString)(e[1]);
          this._ensureKnownAddress(r);
          const n = d.default.hashForSignTypedDataLegacy({ data: t }),
            i = JSON.stringify(t, null, 2);
          return this._signEthereumMessage(n, r, !1, i);
        }
        async _eth_signTypedData_v3(e) {
          this._requireAuthorization();
          const t = (0, a.ensureAddressString)(e[0]),
            r = (0, a.ensureParsedJSONObject)(e[1]);
          this._ensureKnownAddress(t);
          const n = d.default.hashForSignTypedData_v3({ data: r }),
            i = JSON.stringify(r, null, 2);
          return this._signEthereumMessage(n, t, !1, i);
        }
        async _eth_signTypedData_v4(e) {
          this._requireAuthorization();
          const t = (0, a.ensureAddressString)(e[0]),
            r = (0, a.ensureParsedJSONObject)(e[1]);
          this._ensureKnownAddress(t);
          const n = d.default.hashForSignTypedData_v4({ data: r }),
            i = JSON.stringify(r, null, 2);
          return this._signEthereumMessage(n, t, !1, i);
        }
        async _cbwallet_arbitrary(e) {
          const t = e[0],
            r = e[1];
          if ("string" !== typeof r)
            throw new Error("parameter must be a string");
          if ("object" !== typeof t || null === t)
            throw new Error("parameter must be an object");
          return {
            jsonrpc: "2.0",
            id: 0,
            result: await this.genericRequest(t, r),
          };
        }
        async _wallet_addEthereumChain(e) {
          var t, r, n, i;
          const s = e[0];
          if (
            0 === (null === (t = s.rpcUrls) || void 0 === t ? void 0 : t.length)
          )
            return {
              jsonrpc: "2.0",
              id: 0,
              error: { code: 2, message: "please pass in at least 1 rpcUrl" },
            };
          if (!s.chainName || "" === s.chainName.trim())
            throw o.standardErrors.rpc.invalidParams(
              "chainName is a required field"
            );
          if (!s.nativeCurrency)
            throw o.standardErrors.rpc.invalidParams(
              "nativeCurrency is a required field"
            );
          const a = parseInt(s.chainId, 16);
          return (await this.addEthereumChain(
            a,
            null !== (r = s.rpcUrls) && void 0 !== r ? r : [],
            null !== (n = s.blockExplorerUrls) && void 0 !== n ? n : [],
            s.chainName,
            null !== (i = s.iconUrls) && void 0 !== i ? i : [],
            s.nativeCurrency
          ))
            ? { jsonrpc: "2.0", id: 0, result: null }
            : {
                jsonrpc: "2.0",
                id: 0,
                error: { code: 2, message: "unable to add ethereum chain" },
              };
        }
        async _wallet_switchEthereumChain(e) {
          const t = e[0];
          return (
            await this.switchEthereumChain(parseInt(t.chainId, 16)),
            { jsonrpc: "2.0", id: 0, result: null }
          );
        }
        async _wallet_watchAsset(e) {
          const t = Array.isArray(e) ? e[0] : e;
          if (!t.type)
            throw o.standardErrors.rpc.invalidParams("Type is required");
          if ("ERC20" !== (null === t || void 0 === t ? void 0 : t.type))
            throw o.standardErrors.rpc.invalidParams(
              `Asset of type '${t.type}' is not supported`
            );
          if (!(null === t || void 0 === t ? void 0 : t.options))
            throw o.standardErrors.rpc.invalidParams("Options are required");
          if (!(null === t || void 0 === t ? void 0 : t.options.address))
            throw o.standardErrors.rpc.invalidParams("Address is required");
          const r = this.getChainId(),
            { address: n, symbol: i, image: s, decimals: a } = t.options;
          return {
            jsonrpc: "2.0",
            id: 0,
            result: await this.watchAsset(t.type, n, i, a, s, r),
          };
        }
        _eth_uninstallFilter(e) {
          const t = (0, a.ensureHexString)(e[0]);
          return this._filterPolyfill.uninstallFilter(t);
        }
        async _eth_newFilter(e) {
          const t = e[0];
          return {
            jsonrpc: "2.0",
            id: 0,
            result: await this._filterPolyfill.newFilter(t),
          };
        }
        async _eth_newBlockFilter() {
          return {
            jsonrpc: "2.0",
            id: 0,
            result: await this._filterPolyfill.newBlockFilter(),
          };
        }
        async _eth_newPendingTransactionFilter() {
          return {
            jsonrpc: "2.0",
            id: 0,
            result: await this._filterPolyfill.newPendingTransactionFilter(),
          };
        }
        _eth_getFilterChanges(e) {
          const t = (0, a.ensureHexString)(e[0]);
          return this._filterPolyfill.getFilterChanges(t);
        }
        _eth_getFilterLogs(e) {
          const t = (0, a.ensureHexString)(e[0]);
          return this._filterPolyfill.getFilterLogs(t);
        }
        initializeRelay() {
          return this._relay
            ? Promise.resolve(this._relay)
            : this._relayProvider().then(
                (e) => (
                  e.setAccountsCallback((e, t) => this._setAddresses(e, t)),
                  e.setChainCallback((e, t) => {
                    this.updateProviderInfo(t, parseInt(e, 10));
                  }),
                  e.setDappDefaultChainCallback(this._chainIdFromOpts),
                  (this._relay = e),
                  e
                )
              );
        }
      }
      t.CoinbaseWalletProvider = v;
    },
    55419: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.EVENTS = void 0),
        (t.EVENTS = {
          STARTED_CONNECTING: "walletlink_sdk.started.connecting",
          CONNECTED_STATE_CHANGE: "walletlink_sdk.connected",
          DISCONNECTED: "walletlink_sdk.disconnected",
          METADATA_DESTROYED: "walletlink_sdk_metadata_destroyed",
          LINKED: "walletlink_sdk.linked",
          FAILURE: "walletlink_sdk.generic_failure",
          SESSION_CONFIG_RECEIVED:
            "walletlink_sdk.session_config_event_received",
          ETH_ACCOUNTS_STATE: "walletlink_sdk.eth_accounts_state",
          SESSION_STATE_CHANGE: "walletlink_sdk.session_state_change",
          UNLINKED_ERROR_STATE: "walletlink_sdk.unlinked_error_state",
          SKIPPED_CLEARING_SESSION: "walletlink_sdk.skipped_clearing_session",
          GENERAL_ERROR: "walletlink_sdk.general_error",
          WEB3_REQUEST: "walletlink_sdk.web3.request",
          WEB3_REQUEST_PUBLISHED: "walletlink_sdk.web3.request_published",
          WEB3_RESPONSE: "walletlink_sdk.web3.response",
          METHOD_NOT_IMPLEMENTED: "walletlink_sdk.method_not_implemented",
          UNKNOWN_ADDRESS_ENCOUNTERED:
            "walletlink_sdk.unknown_address_encountered",
        });
    },
    36105: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.filterFromParam = t.FilterPolyfill = void 0);
      const n = r(21042),
        i = r(27542),
        s = { jsonrpc: "2.0", id: 0 };
      function o(e) {
        return {
          fromBlock: l(e.fromBlock),
          toBlock: l(e.toBlock),
          addresses:
            void 0 === e.address
              ? null
              : Array.isArray(e.address)
              ? e.address
              : [e.address],
          topics: e.topics || [],
        };
      }
      function a(e) {
        const t = {
          fromBlock: c(e.fromBlock),
          toBlock: c(e.toBlock),
          topics: e.topics,
        };
        return null !== e.addresses && (t.address = e.addresses), t;
      }
      function l(e) {
        if (void 0 === e || "latest" === e || "pending" === e) return "latest";
        if ("earliest" === e) return (0, n.IntNumber)(0);
        if ((0, i.isHexString)(e)) return (0, i.intNumberFromHexString)(e);
        throw new Error(`Invalid block option: ${String(e)}`);
      }
      function c(e) {
        return "latest" === e ? e : (0, i.hexStringFromIntNumber)(e);
      }
      function u() {
        return Object.assign(Object.assign({}, s), {
          error: { code: -32e3, message: "filter not found" },
        });
      }
      function h() {
        return Object.assign(Object.assign({}, s), { result: [] });
      }
      (t.FilterPolyfill = class {
        constructor(e) {
          (this.logFilters = new Map()),
            (this.blockFilters = new Set()),
            (this.pendingTransactionFilters = new Set()),
            (this.cursors = new Map()),
            (this.timeouts = new Map()),
            (this.nextFilterId = (0, n.IntNumber)(1)),
            (this.REQUEST_THROTTLE_INTERVAL = 1e3),
            (this.lastFetchTimestamp = new Date(0)),
            (this.resolvers = []),
            (this.provider = e);
        }
        async newFilter(e) {
          const t = o(e),
            r = this.makeFilterId(),
            n = await this.setInitialCursorPosition(r, t.fromBlock);
          return (
            console.info(
              `Installing new log filter(${r}):`,
              t,
              "initial cursor position:",
              n
            ),
            this.logFilters.set(r, t),
            this.setFilterTimeout(r),
            (0, i.hexStringFromIntNumber)(r)
          );
        }
        async newBlockFilter() {
          const e = this.makeFilterId(),
            t = await this.setInitialCursorPosition(e, "latest");
          return (
            console.info(
              `Installing new block filter (${e}) with initial cursor position:`,
              t
            ),
            this.blockFilters.add(e),
            this.setFilterTimeout(e),
            (0, i.hexStringFromIntNumber)(e)
          );
        }
        async newPendingTransactionFilter() {
          const e = this.makeFilterId(),
            t = await this.setInitialCursorPosition(e, "latest");
          return (
            console.info(
              `Installing new block filter (${e}) with initial cursor position:`,
              t
            ),
            this.pendingTransactionFilters.add(e),
            this.setFilterTimeout(e),
            (0, i.hexStringFromIntNumber)(e)
          );
        }
        uninstallFilter(e) {
          const t = (0, i.intNumberFromHexString)(e);
          return (
            console.info(`Uninstalling filter (${t})`), this.deleteFilter(t), !0
          );
        }
        getFilterChanges(e) {
          const t = (0, i.intNumberFromHexString)(e);
          return (
            this.timeouts.has(t) && this.setFilterTimeout(t),
            this.logFilters.has(t)
              ? this.getLogFilterChanges(t)
              : this.blockFilters.has(t)
              ? this.getBlockFilterChanges(t)
              : this.pendingTransactionFilters.has(t)
              ? this.getPendingTransactionFilterChanges(t)
              : Promise.resolve(u())
          );
        }
        async getFilterLogs(e) {
          const t = (0, i.intNumberFromHexString)(e),
            r = this.logFilters.get(t);
          return r
            ? this.sendAsyncPromise(
                Object.assign(Object.assign({}, s), {
                  method: "eth_getLogs",
                  params: [a(r)],
                })
              )
            : u();
        }
        makeFilterId() {
          return (0, n.IntNumber)(++this.nextFilterId);
        }
        sendAsyncPromise(e) {
          return new Promise((t, r) => {
            this.provider.sendAsync(e, (e, n) =>
              e
                ? r(e)
                : Array.isArray(n) || null == n
                ? r(
                    new Error(
                      `unexpected response received: ${JSON.stringify(n)}`
                    )
                  )
                : void t(n)
            );
          });
        }
        deleteFilter(e) {
          console.info(`Deleting filter (${e})`),
            this.logFilters.delete(e),
            this.blockFilters.delete(e),
            this.pendingTransactionFilters.delete(e),
            this.cursors.delete(e),
            this.timeouts.delete(e);
        }
        async getLogFilterChanges(e) {
          const t = this.logFilters.get(e),
            r = this.cursors.get(e);
          if (!r || !t) return u();
          const o = await this.getCurrentBlockHeight(),
            l = "latest" === t.toBlock ? o : t.toBlock;
          if (r > o) return h();
          if (r > Number(t.toBlock)) return h();
          console.info(`Fetching logs from ${r} to ${l} for filter ${e}`);
          const c = await this.sendAsyncPromise(
            Object.assign(Object.assign({}, s), {
              method: "eth_getLogs",
              params: [
                a(
                  Object.assign(Object.assign({}, t), {
                    fromBlock: r,
                    toBlock: l,
                  })
                ),
              ],
            })
          );
          if (Array.isArray(c.result)) {
            const t = c.result.map((e) =>
                (0, i.intNumberFromHexString)(e.blockNumber || "0x0")
              ),
              s = Math.max(...t);
            if (s && s > r) {
              const t = (0, n.IntNumber)(s + 1);
              console.info(
                `Moving cursor position for filter (${e}) from ${r} to ${t}`
              ),
                this.cursors.set(e, t);
            }
          }
          return c;
        }
        async getBlockFilterChanges(e) {
          const t = this.cursors.get(e);
          if (!t) return u();
          const r = await this.getCurrentBlockHeight();
          if (t > r) return h();
          console.info(`Fetching blocks from ${t} to ${r} for filter (${e})`);
          const o = (
              await Promise.all(
                (0, i.range)(t, r + 1).map((e) =>
                  this.getBlockHashByNumber((0, n.IntNumber)(e))
                )
              )
            ).filter((e) => !!e),
            a = (0, n.IntNumber)(t + o.length);
          return (
            console.info(
              `Moving cursor position for filter (${e}) from ${t} to ${a}`
            ),
            this.cursors.set(e, a),
            Object.assign(Object.assign({}, s), { result: o })
          );
        }
        async getPendingTransactionFilterChanges(e) {
          return Promise.resolve(h());
        }
        async setInitialCursorPosition(e, t) {
          const r = await this.getCurrentBlockHeight(),
            n = "number" === typeof t && t > r ? t : r;
          return this.cursors.set(e, n), n;
        }
        setFilterTimeout(e) {
          const t = this.timeouts.get(e);
          t && window.clearTimeout(t);
          const r = window.setTimeout(() => {
            console.info(`Filter (${e}) timed out`), this.deleteFilter(e);
          }, 3e5);
          this.timeouts.set(e, r);
        }
        async getCurrentBlockHeight() {
          const e = new Date();
          if (
            e.getTime() - this.lastFetchTimestamp.getTime() >
            this.REQUEST_THROTTLE_INTERVAL
          ) {
            this.lastFetchTimestamp = e;
            const t = await this._getCurrentBlockHeight();
            (this.currentBlockHeight = t),
              this.resolvers.forEach((e) => e(t)),
              (this.resolvers = []);
          }
          return this.currentBlockHeight
            ? this.currentBlockHeight
            : new Promise((e) => this.resolvers.push(e));
        }
        async _getCurrentBlockHeight() {
          const { result: e } = await this.sendAsyncPromise(
            Object.assign(Object.assign({}, s), {
              method: "eth_blockNumber",
              params: [],
            })
          );
          return (0, i.intNumberFromHexString)((0, i.ensureHexString)(e));
        }
        async getBlockHashByNumber(e) {
          const t = await this.sendAsyncPromise(
            Object.assign(Object.assign({}, s), {
              method: "eth_getBlockByNumber",
              params: [(0, i.hexStringFromIntNumber)(e), !1],
            })
          );
          return t.result && "string" === typeof t.result.hash
            ? (0, i.ensureHexString)(t.result.hash)
            : null;
        }
      }),
        (t.filterFromParam = o);
    },
    28158: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.SubscriptionManager = void 0);
      const n = r(28447),
        i = r(44136),
        s = () => {};
      t.SubscriptionManager = class {
        constructor(e) {
          const t = new n.PollingBlockTracker({
              provider: e,
              pollingInterval: 15e3,
              setSkipCacheFlag: !0,
            }),
            { events: r, middleware: s } = i({ blockTracker: t, provider: e });
          (this.events = r), (this.subscriptionMiddleware = s);
        }
        async handleRequest(e) {
          const t = {};
          return await this.subscriptionMiddleware(e, t, s, s), t;
        }
        destroy() {
          this.subscriptionMiddleware.destroy();
        }
      };
    },
    84155: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.RelayAbstract =
          t.APP_VERSION_KEY =
          t.LOCAL_STORAGE_ADDRESSES_KEY =
          t.WALLET_USER_NAME_KEY =
            void 0);
      const n = r(98829);
      (t.WALLET_USER_NAME_KEY = "walletUsername"),
        (t.LOCAL_STORAGE_ADDRESSES_KEY = "Addresses"),
        (t.APP_VERSION_KEY = "AppVersion");
      t.RelayAbstract = class {
        async makeEthereumJSONRPCRequest(e, t) {
          if (!t) throw new Error("Error: No jsonRpcUrl provided");
          return window
            .fetch(t, {
              method: "POST",
              body: JSON.stringify(e),
              mode: "cors",
              headers: { "Content-Type": "application/json" },
            })
            .then((e) => e.json())
            .then((t) => {
              if (!t) throw n.standardErrors.rpc.parse({});
              const r = t,
                { error: i } = r;
              if (i) throw (0, n.serializeError)(i, e.method);
              return r;
            });
        }
      };
    },
    75362: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.RelayEventManager = void 0);
      const n = r(27542);
      t.RelayEventManager = class {
        constructor() {
          (this._nextRequestId = 0), (this.callbacks = new Map());
        }
        makeRequestId() {
          this._nextRequestId = (this._nextRequestId + 1) % 2147483647;
          const e = this._nextRequestId,
            t = (0, n.prepend0x)(e.toString(16));
          return this.callbacks.get(t) && this.callbacks.delete(t), e;
        }
      };
    },
    5576: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Session = void 0);
      const n = r(20307),
        i = r(27542),
        s = "session:id",
        o = "session:secret",
        a = "session:linked";
      class l {
        constructor(e, t, r, s) {
          (this._storage = e),
            (this._id = t || (0, i.randomBytesHex)(16)),
            (this._secret = r || (0, i.randomBytesHex)(32)),
            (this._key = new n.sha256()
              .update(`${this._id}, ${this._secret} WalletLink`)
              .digest("hex")),
            (this._linked = !!s);
        }
        static load(e) {
          const t = e.getItem(s),
            r = e.getItem(a),
            n = e.getItem(o);
          return t && n ? new l(e, t, n, "1" === r) : null;
        }
        static hash(e) {
          return new n.sha256().update(e).digest("hex");
        }
        get id() {
          return this._id;
        }
        get secret() {
          return this._secret;
        }
        get key() {
          return this._key;
        }
        get linked() {
          return this._linked;
        }
        set linked(e) {
          (this._linked = e), this.persistLinked();
        }
        save() {
          return (
            this._storage.setItem(s, this._id),
            this._storage.setItem(o, this._secret),
            this.persistLinked(),
            this
          );
        }
        persistLinked() {
          this._storage.setItem(a, this._linked ? "1" : "0");
        }
      }
      t.Session = l;
    },
    46684: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.MobileRelay = void 0);
      const n = r(27542),
        i = r(60030),
        s = r(93470);
      class o extends i.WalletLinkRelay {
        constructor(e) {
          var t;
          super(e),
            (this._enableMobileWalletLink =
              null !== (t = e.enableMobileWalletLink) && void 0 !== t && t);
        }
        requestEthereumAccounts() {
          return this._enableMobileWalletLink
            ? super.requestEthereumAccounts()
            : {
                promise: new Promise(() => {
                  const e = (0, n.getLocation)();
                  e.href = `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(
                    e.href
                  )}`;
                }),
                cancel: () => {},
              };
        }
        publishWeb3RequestEvent(e, t) {
          if (
            (super.publishWeb3RequestEvent(e, t),
            !(
              this._enableMobileWalletLink && this.ui instanceof s.MobileRelayUI
            ))
          )
            return;
          let r = !1;
          switch (t.method) {
            case "requestEthereumAccounts":
            case "connectAndSignIn":
              (r = !0), this.ui.openCoinbaseWalletDeeplink(this.getQRCodeUrl());
              break;
            case "switchEthereumChain":
              return;
            default:
              (r = !0), this.ui.openCoinbaseWalletDeeplink();
          }
          r &&
            window.addEventListener(
              "blur",
              () => {
                window.addEventListener(
                  "focus",
                  () => {
                    this.connection.checkUnseenEvents();
                  },
                  { once: !0 }
                );
              },
              { once: !0 }
            );
        }
        handleWeb3ResponseMessage(e) {
          super.handleWeb3ResponseMessage(e),
            this._enableMobileWalletLink &&
              this.ui instanceof s.MobileRelayUI &&
              this.ui.closeOpenedWindow();
        }
        connectAndSignIn(e) {
          if (!this._enableMobileWalletLink)
            throw new Error(
              "connectAndSignIn is supported only when enableMobileWalletLink is on"
            );
          return this.sendRequest({
            method: "connectAndSignIn",
            params: {
              appName: this.appName,
              appLogoUrl: this.appLogoUrl,
              domain: window.location.hostname,
              aud: window.location.href,
              version: "1",
              type: "eip4361",
              nonce: e.nonce,
              iat: new Date().toISOString(),
              chainId: `eip155:${this.dappDefaultChain}`,
              statement: e.statement,
              resources: e.resources,
            },
          });
        }
      }
      t.MobileRelay = o;
    },
    93470: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.MobileRelayUI = void 0);
      const n = r(48021);
      t.MobileRelayUI = class {
        constructor(e) {
          (this.attached = !1),
            (this.darkMode = !1),
            (this.openedWindow = null),
            (this.redirectDialog = new n.RedirectDialog()),
            (this.darkMode = e.darkMode);
        }
        attach() {
          if (this.attached)
            throw new Error("Coinbase Wallet SDK UI is already attached");
          this.redirectDialog.attach(), (this.attached = !0);
        }
        setConnected(e) {}
        closeOpenedWindow() {
          var e;
          null === (e = this.openedWindow) || void 0 === e || e.close(),
            (this.openedWindow = null);
        }
        redirectToCoinbaseWallet(e) {
          const t = new URL("https://go.cb-w.com/walletlink");
          t.searchParams.append("redirect_url", window.location.href),
            e && t.searchParams.append("wl_url", e),
            (this.openedWindow = window.open(t.href, "cbw-opener")),
            this.openedWindow &&
              setTimeout(() => this.closeOpenedWindow(), 5e3);
        }
        openCoinbaseWalletDeeplink(e) {
          this.redirectDialog.present({
            title: "Redirecting to Coinbase Wallet...",
            buttonText: "Open",
            darkMode: this.darkMode,
            onButtonClick: () => {
              this.redirectToCoinbaseWallet(e);
            },
          }),
            setTimeout(() => {
              this.redirectToCoinbaseWallet(e);
            }, 99);
        }
        showConnecting(e) {
          return () => {
            this.closeOpenedWindow(), this.redirectDialog.clear();
          };
        }
        hideRequestEthereumAccounts() {
          this.closeOpenedWindow(), this.redirectDialog.clear();
        }
        requestEthereumAccounts() {}
        addEthereumChain() {}
        watchAsset() {}
        selectProvider() {}
        switchEthereumChain() {}
        signEthereumMessage() {}
        signEthereumTransaction() {}
        submitEthereumTransaction() {}
        ethereumAddressFromSignedMessage() {}
        reloadUI() {}
        setStandalone() {}
        setConnectDisabled() {}
        inlineAccountsResponse() {
          return !1;
        }
        inlineAddEthereumChain() {
          return !1;
        }
        inlineWatchAsset() {
          return !1;
        }
        inlineSwitchEthereumChain() {
          return !1;
        }
        isStandalone() {
          return !1;
        }
      };
    },
    60030: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WalletLinkRelay = void 0);
      const n = r(98829),
        i = r(21042),
        s = r(27542),
        o = r(55419),
        a = r(84155),
        l = r(5576),
        c = r(83820),
        u = r(5717),
        h = r(41827);
      class d extends a.RelayAbstract {
        constructor(e) {
          var t;
          super(),
            (this.accountsCallback = null),
            (this.chainCallbackParams = { chainId: "", jsonRpcUrl: "" }),
            (this.chainCallback = null),
            (this.dappDefaultChain = 1),
            (this.appName = ""),
            (this.appLogoUrl = null),
            (this.linkedUpdated = (e) => {
              var t;
              this.isLinked = e;
              const r = this.storage.getItem(a.LOCAL_STORAGE_ADDRESSES_KEY);
              if (
                (e && (this.session.linked = e),
                (this.isUnlinkedErrorState = !1),
                r)
              ) {
                const n = r.split(" "),
                  i = "true" === this.storage.getItem("IsStandaloneSigning");
                if ("" !== n[0] && !e && this.session.linked && !i) {
                  this.isUnlinkedErrorState = !0;
                  const e = this.getSessionIdHash();
                  null === (t = this.diagnostic) ||
                    void 0 === t ||
                    t.log(o.EVENTS.UNLINKED_ERROR_STATE, { sessionIdHash: e });
                }
              }
            }),
            (this.metadataUpdated = (e, t) => {
              this.storage.setItem(e, t);
            }),
            (this.chainUpdated = (e, t) => {
              (this.chainCallbackParams.chainId === e &&
                this.chainCallbackParams.jsonRpcUrl === t) ||
                ((this.chainCallbackParams = { chainId: e, jsonRpcUrl: t }),
                this.chainCallback && this.chainCallback(e, t));
            }),
            (this.accountUpdated = (e) => {
              this.accountsCallback && this.accountsCallback([e]),
                d.accountRequestCallbackIds.size > 0 &&
                  (Array.from(d.accountRequestCallbackIds.values()).forEach(
                    (t) => {
                      const r = {
                        type: "WEB3_RESPONSE",
                        id: t,
                        response: {
                          method: "requestEthereumAccounts",
                          result: [e],
                        },
                      };
                      this.invokeCallback(
                        Object.assign(Object.assign({}, r), { id: t })
                      );
                    }
                  ),
                  d.accountRequestCallbackIds.clear());
            }),
            (this.connectedUpdated = (e) => {
              this.ui.setConnected(e);
            }),
            (this.resetAndReload = this.resetAndReload.bind(this)),
            (this.linkAPIUrl = e.linkAPIUrl),
            (this.storage = e.storage),
            (this.options = e);
          const { session: r, ui: n, connection: i } = this.subscribe();
          (this._session = r),
            (this.connection = i),
            (this.relayEventManager = e.relayEventManager),
            (this.diagnostic = e.diagnosticLogger),
            (this._reloadOnDisconnect =
              null === (t = e.reloadOnDisconnect) || void 0 === t || t),
            (this.ui = n);
        }
        subscribe() {
          const e =
              l.Session.load(this.storage) ||
              new l.Session(this.storage).save(),
            { linkAPIUrl: t, diagnostic: r } = this,
            n = new c.WalletLinkConnection({
              session: e,
              linkAPIUrl: t,
              diagnostic: r,
              listener: this,
            }),
            { version: i, darkMode: s } = this.options,
            o = this.options.uiConstructor({
              linkAPIUrl: t,
              version: i,
              darkMode: s,
              session: e,
            });
          return n.connect(), { session: e, ui: o, connection: n };
        }
        attachUI() {
          this.ui.attach();
        }
        resetAndReload() {
          Promise.race([
            this.connection.setSessionMetadata("__destroyed", "1"),
            new Promise((e) => setTimeout(() => e(null), 1e3)),
          ])
            .then(() => {
              var e, t;
              const r = this.ui.isStandalone();
              null === (e = this.diagnostic) ||
                void 0 === e ||
                e.log(o.EVENTS.SESSION_STATE_CHANGE, {
                  method: "relay::resetAndReload",
                  sessionMetadataChange: "__destroyed, 1",
                  sessionIdHash: this.getSessionIdHash(),
                }),
                this.connection.destroy();
              const n = l.Session.load(this.storage);
              if (
                ((null === n || void 0 === n ? void 0 : n.id) ===
                this._session.id
                  ? this.storage.clear()
                  : n &&
                    (null === (t = this.diagnostic) ||
                      void 0 === t ||
                      t.log(o.EVENTS.SKIPPED_CLEARING_SESSION, {
                        sessionIdHash: this.getSessionIdHash(),
                        storedSessionIdHash: l.Session.hash(n.id),
                      })),
                this._reloadOnDisconnect)
              )
                return void this.ui.reloadUI();
              this.accountsCallback && this.accountsCallback([], !0);
              const { session: i, ui: s, connection: a } = this.subscribe();
              (this._session = i),
                (this.connection = a),
                (this.ui = s),
                r && this.ui.setStandalone && this.ui.setStandalone(!0),
                this.attachUI();
            })
            .catch((e) => {
              var t;
              null === (t = this.diagnostic) ||
                void 0 === t ||
                t.log(o.EVENTS.FAILURE, {
                  method: "relay::resetAndReload",
                  message: `failed to reset and reload with ${e}`,
                  sessionIdHash: this.getSessionIdHash(),
                });
            });
        }
        setAppInfo(e, t) {
          (this.appName = e), (this.appLogoUrl = t);
        }
        getStorageItem(e) {
          return this.storage.getItem(e);
        }
        get session() {
          return this._session;
        }
        setStorageItem(e, t) {
          this.storage.setItem(e, t);
        }
        signEthereumMessage(e, t, r, n) {
          return this.sendRequest({
            method: "signEthereumMessage",
            params: {
              message: (0, s.hexStringFromBuffer)(e, !0),
              address: t,
              addPrefix: r,
              typedDataJson: n || null,
            },
          });
        }
        ethereumAddressFromSignedMessage(e, t, r) {
          return this.sendRequest({
            method: "ethereumAddressFromSignedMessage",
            params: {
              message: (0, s.hexStringFromBuffer)(e, !0),
              signature: (0, s.hexStringFromBuffer)(t, !0),
              addPrefix: r,
            },
          });
        }
        signEthereumTransaction(e) {
          return this.sendRequest({
            method: "signEthereumTransaction",
            params: {
              fromAddress: e.fromAddress,
              toAddress: e.toAddress,
              weiValue: (0, s.bigIntStringFromBN)(e.weiValue),
              data: (0, s.hexStringFromBuffer)(e.data, !0),
              nonce: e.nonce,
              gasPriceInWei: e.gasPriceInWei
                ? (0, s.bigIntStringFromBN)(e.gasPriceInWei)
                : null,
              maxFeePerGas: e.gasPriceInWei
                ? (0, s.bigIntStringFromBN)(e.gasPriceInWei)
                : null,
              maxPriorityFeePerGas: e.gasPriceInWei
                ? (0, s.bigIntStringFromBN)(e.gasPriceInWei)
                : null,
              gasLimit: e.gasLimit
                ? (0, s.bigIntStringFromBN)(e.gasLimit)
                : null,
              chainId: e.chainId,
              shouldSubmit: !1,
            },
          });
        }
        signAndSubmitEthereumTransaction(e) {
          return this.sendRequest({
            method: "signEthereumTransaction",
            params: {
              fromAddress: e.fromAddress,
              toAddress: e.toAddress,
              weiValue: (0, s.bigIntStringFromBN)(e.weiValue),
              data: (0, s.hexStringFromBuffer)(e.data, !0),
              nonce: e.nonce,
              gasPriceInWei: e.gasPriceInWei
                ? (0, s.bigIntStringFromBN)(e.gasPriceInWei)
                : null,
              maxFeePerGas: e.maxFeePerGas
                ? (0, s.bigIntStringFromBN)(e.maxFeePerGas)
                : null,
              maxPriorityFeePerGas: e.maxPriorityFeePerGas
                ? (0, s.bigIntStringFromBN)(e.maxPriorityFeePerGas)
                : null,
              gasLimit: e.gasLimit
                ? (0, s.bigIntStringFromBN)(e.gasLimit)
                : null,
              chainId: e.chainId,
              shouldSubmit: !0,
            },
          });
        }
        submitEthereumTransaction(e, t) {
          return this.sendRequest({
            method: "submitEthereumTransaction",
            params: {
              signedTransaction: (0, s.hexStringFromBuffer)(e, !0),
              chainId: t,
            },
          });
        }
        scanQRCode(e) {
          return this.sendRequest({
            method: "scanQRCode",
            params: { regExp: e },
          });
        }
        getQRCodeUrl() {
          return (0, s.createQrUrl)(
            this._session.id,
            this._session.secret,
            this.linkAPIUrl,
            !1,
            this.options.version,
            this.dappDefaultChain
          );
        }
        genericRequest(e, t) {
          return this.sendRequest({
            method: "generic",
            params: { action: t, data: e },
          });
        }
        sendGenericMessage(e) {
          return this.sendRequest(e);
        }
        sendRequest(e) {
          let t = null;
          const r = (0, s.randomBytesHex)(8),
            n = (n) => {
              this.publishWeb3RequestCanceledEvent(r),
                this.handleErrorResponse(r, e.method, n),
                null === t || void 0 === t || t();
            };
          return {
            promise: new Promise((i, s) => {
              this.ui.isStandalone() ||
                (t = this.ui.showConnecting({
                  isUnlinkedErrorState: this.isUnlinkedErrorState,
                  onCancel: n,
                  onResetConnection: this.resetAndReload,
                })),
                this.relayEventManager.callbacks.set(r, (e) => {
                  if (
                    (null === t || void 0 === t || t(),
                    (0, u.isErrorResponse)(e))
                  )
                    return s(new Error(e.errorMessage));
                  i(e);
                }),
                this.ui.isStandalone()
                  ? this.sendRequestStandalone(r, e)
                  : this.publishWeb3RequestEvent(r, e);
            }),
            cancel: n,
          };
        }
        setConnectDisabled(e) {
          this.ui.setConnectDisabled(e);
        }
        setAccountsCallback(e) {
          this.accountsCallback = e;
        }
        setChainCallback(e) {
          this.chainCallback = e;
        }
        setDappDefaultChainCallback(e) {
          (this.dappDefaultChain = e),
            this.ui instanceof h.WalletLinkRelayUI && this.ui.setChainId(e);
        }
        publishWeb3RequestEvent(e, t) {
          var r;
          const n = { type: "WEB3_REQUEST", id: e, request: t },
            i = l.Session.load(this.storage);
          null === (r = this.diagnostic) ||
            void 0 === r ||
            r.log(o.EVENTS.WEB3_REQUEST, {
              eventId: n.id,
              method: `relay::${t.method}`,
              sessionIdHash: this.getSessionIdHash(),
              storedSessionIdHash: i ? l.Session.hash(i.id) : "",
              isSessionMismatched: (
                (null === i || void 0 === i ? void 0 : i.id) !==
                this._session.id
              ).toString(),
            }),
            this.publishEvent("Web3Request", n, !0)
              .then((e) => {
                var r;
                null === (r = this.diagnostic) ||
                  void 0 === r ||
                  r.log(o.EVENTS.WEB3_REQUEST_PUBLISHED, {
                    eventId: n.id,
                    method: `relay::${t.method}`,
                    sessionIdHash: this.getSessionIdHash(),
                    storedSessionIdHash: i ? l.Session.hash(i.id) : "",
                    isSessionMismatched: (
                      (null === i || void 0 === i ? void 0 : i.id) !==
                      this._session.id
                    ).toString(),
                  });
              })
              .catch((e) => {
                this.handleWeb3ResponseMessage({
                  type: "WEB3_RESPONSE",
                  id: n.id,
                  response: { method: t.method, errorMessage: e.message },
                });
              });
        }
        publishWeb3RequestCanceledEvent(e) {
          const t = { type: "WEB3_REQUEST_CANCELED", id: e };
          this.publishEvent("Web3RequestCanceled", t, !1).then();
        }
        publishEvent(e, t, r) {
          return this.connection.publishEvent(e, t, r);
        }
        handleWeb3ResponseMessage(e) {
          var t;
          const { response: r } = e;
          if (
            (null === (t = this.diagnostic) ||
              void 0 === t ||
              t.log(o.EVENTS.WEB3_RESPONSE, {
                eventId: e.id,
                method: `relay::${r.method}`,
                sessionIdHash: this.getSessionIdHash(),
              }),
            "requestEthereumAccounts" === r.method)
          )
            return (
              d.accountRequestCallbackIds.forEach((t) =>
                this.invokeCallback(
                  Object.assign(Object.assign({}, e), { id: t })
                )
              ),
              void d.accountRequestCallbackIds.clear()
            );
          this.invokeCallback(e);
        }
        handleErrorResponse(e, t, r, i) {
          var s;
          const o =
            null !== (s = null === r || void 0 === r ? void 0 : r.message) &&
            void 0 !== s
              ? s
              : (0, n.getMessageFromCode)(i);
          this.handleWeb3ResponseMessage({
            type: "WEB3_RESPONSE",
            id: e,
            response: { method: t, errorMessage: o, errorCode: i },
          });
        }
        invokeCallback(e) {
          const t = this.relayEventManager.callbacks.get(e.id);
          t && (t(e.response), this.relayEventManager.callbacks.delete(e.id));
        }
        requestEthereumAccounts() {
          const e = {
              method: "requestEthereumAccounts",
              params: {
                appName: this.appName,
                appLogoUrl: this.appLogoUrl || null,
              },
            },
            t = (0, s.randomBytesHex)(8),
            r = (r) => {
              this.publishWeb3RequestCanceledEvent(t),
                this.handleErrorResponse(t, e.method, r);
            };
          return {
            promise: new Promise((i, s) => {
              if (
                (this.relayEventManager.callbacks.set(t, (e) => {
                  if (
                    (this.ui.hideRequestEthereumAccounts(),
                    (0, u.isErrorResponse)(e))
                  )
                    return s(new Error(e.errorMessage));
                  i(e);
                }),
                this.ui.inlineAccountsResponse())
              ) {
                const e = (e) => {
                  this.handleWeb3ResponseMessage({
                    type: "WEB3_RESPONSE",
                    id: t,
                    response: { method: "requestEthereumAccounts", result: e },
                  });
                };
                this.ui.requestEthereumAccounts({ onCancel: r, onAccounts: e });
              } else {
                const e = n.standardErrors.provider.userRejectedRequest(
                  "User denied account authorization"
                );
                this.ui.requestEthereumAccounts({ onCancel: () => r(e) });
              }
              d.accountRequestCallbackIds.add(t),
                this.ui.inlineAccountsResponse() ||
                  this.ui.isStandalone() ||
                  this.publishWeb3RequestEvent(t, e);
            }),
            cancel: r,
          };
        }
        selectProvider(e) {
          const t = "selectProvider",
            r = (0, s.randomBytesHex)(8);
          return {
            cancel: (e) => {
              this.publishWeb3RequestCanceledEvent(r),
                this.handleErrorResponse(r, t, e);
            },
            promise: new Promise((t, n) => {
              this.relayEventManager.callbacks.set(r, (e) => {
                if ((0, u.isErrorResponse)(e))
                  return n(new Error(e.errorMessage));
                t(e);
              });
              this.ui.selectProvider &&
                this.ui.selectProvider({
                  onApprove: (e) => {
                    this.handleWeb3ResponseMessage({
                      type: "WEB3_RESPONSE",
                      id: r,
                      response: { method: "selectProvider", result: e },
                    });
                  },
                  onCancel: (e) => {
                    this.handleWeb3ResponseMessage({
                      type: "WEB3_RESPONSE",
                      id: r,
                      response: {
                        method: "selectProvider",
                        result: i.ProviderType.Unselected,
                      },
                    });
                  },
                  providerOptions: e,
                });
            }),
          };
        }
        watchAsset(e, t, r, n, i, o) {
          const a = {
            method: "watchAsset",
            params: {
              type: e,
              options: { address: t, symbol: r, decimals: n, image: i },
              chainId: o,
            },
          };
          let l = null;
          const c = (0, s.randomBytesHex)(8),
            h = (e) => {
              this.publishWeb3RequestCanceledEvent(c),
                this.handleErrorResponse(c, a.method, e),
                null === l || void 0 === l || l();
            };
          this.ui.inlineWatchAsset() ||
            (l = this.ui.showConnecting({
              isUnlinkedErrorState: this.isUnlinkedErrorState,
              onCancel: h,
              onResetConnection: this.resetAndReload,
            }));
          return {
            cancel: h,
            promise: new Promise((s, h) => {
              this.relayEventManager.callbacks.set(c, (e) => {
                if (
                  (null === l || void 0 === l || l(), (0, u.isErrorResponse)(e))
                )
                  return h(new Error(e.errorMessage));
                s(e);
              });
              const d = (e) => {
                  this.handleWeb3ResponseMessage({
                    type: "WEB3_RESPONSE",
                    id: c,
                    response: { method: "watchAsset", result: !1 },
                  });
                },
                f = () => {
                  this.handleWeb3ResponseMessage({
                    type: "WEB3_RESPONSE",
                    id: c,
                    response: { method: "watchAsset", result: !0 },
                  });
                };
              this.ui.inlineWatchAsset() &&
                this.ui.watchAsset({
                  onApprove: f,
                  onCancel: d,
                  type: e,
                  address: t,
                  symbol: r,
                  decimals: n,
                  image: i,
                  chainId: o,
                }),
                this.ui.inlineWatchAsset() ||
                  this.ui.isStandalone() ||
                  this.publishWeb3RequestEvent(c, a);
            }),
          };
        }
        addEthereumChain(e, t, r, n, i, o) {
          const a = {
            method: "addEthereumChain",
            params: {
              chainId: e,
              rpcUrls: t,
              blockExplorerUrls: n,
              chainName: i,
              iconUrls: r,
              nativeCurrency: o,
            },
          };
          let l = null;
          const c = (0, s.randomBytesHex)(8),
            h = (e) => {
              this.publishWeb3RequestCanceledEvent(c),
                this.handleErrorResponse(c, a.method, e),
                null === l || void 0 === l || l();
            };
          this.ui.inlineAddEthereumChain(e) ||
            (l = this.ui.showConnecting({
              isUnlinkedErrorState: this.isUnlinkedErrorState,
              onCancel: h,
              onResetConnection: this.resetAndReload,
            }));
          return {
            promise: new Promise((t, r) => {
              this.relayEventManager.callbacks.set(c, (e) => {
                if (
                  (null === l || void 0 === l || l(), (0, u.isErrorResponse)(e))
                )
                  return r(new Error(e.errorMessage));
                t(e);
              });
              const n = (e) => {
                  this.handleWeb3ResponseMessage({
                    type: "WEB3_RESPONSE",
                    id: c,
                    response: {
                      method: "addEthereumChain",
                      result: { isApproved: !1, rpcUrl: "" },
                    },
                  });
                },
                i = (e) => {
                  this.handleWeb3ResponseMessage({
                    type: "WEB3_RESPONSE",
                    id: c,
                    response: {
                      method: "addEthereumChain",
                      result: { isApproved: !0, rpcUrl: e },
                    },
                  });
                };
              this.ui.inlineAddEthereumChain(e) &&
                this.ui.addEthereumChain({
                  onCancel: n,
                  onApprove: i,
                  chainId: a.params.chainId,
                  rpcUrls: a.params.rpcUrls,
                  blockExplorerUrls: a.params.blockExplorerUrls,
                  chainName: a.params.chainName,
                  iconUrls: a.params.iconUrls,
                  nativeCurrency: a.params.nativeCurrency,
                }),
                this.ui.inlineAddEthereumChain(e) ||
                  this.ui.isStandalone() ||
                  this.publishWeb3RequestEvent(c, a);
            }),
            cancel: h,
          };
        }
        switchEthereumChain(e, t) {
          const r = {
              method: "switchEthereumChain",
              params: Object.assign({ chainId: e }, { address: t }),
            },
            i = (0, s.randomBytesHex)(8);
          return {
            promise: new Promise((t, s) => {
              this.relayEventManager.callbacks.set(i, (e) =>
                (0, u.isErrorResponse)(e) && e.errorCode
                  ? s(
                      n.standardErrors.provider.custom({
                        code: e.errorCode,
                        message:
                          "Unrecognized chain ID. Try adding the chain using addEthereumChain first.",
                      })
                    )
                  : (0, u.isErrorResponse)(e)
                  ? s(new Error(e.errorMessage))
                  : void t(e)
              );
              this.ui.switchEthereumChain({
                onCancel: (t) => {
                  var r;
                  if (t) {
                    const s =
                      null !== (r = (0, n.getErrorCode)(t)) && void 0 !== r
                        ? r
                        : n.standardErrorCodes.provider.unsupportedChain;
                    this.handleErrorResponse(
                      i,
                      "switchEthereumChain",
                      t instanceof Error
                        ? t
                        : n.standardErrors.provider.unsupportedChain(e),
                      s
                    );
                  } else
                    this.handleWeb3ResponseMessage({
                      type: "WEB3_RESPONSE",
                      id: i,
                      response: {
                        method: "switchEthereumChain",
                        result: { isApproved: !1, rpcUrl: "" },
                      },
                    });
                },
                onApprove: (e) => {
                  this.handleWeb3ResponseMessage({
                    type: "WEB3_RESPONSE",
                    id: i,
                    response: {
                      method: "switchEthereumChain",
                      result: { isApproved: !0, rpcUrl: e },
                    },
                  });
                },
                chainId: r.params.chainId,
                address: r.params.address,
              }),
                this.ui.inlineSwitchEthereumChain() ||
                  this.ui.isStandalone() ||
                  this.publishWeb3RequestEvent(i, r);
            }),
            cancel: (e) => {
              this.publishWeb3RequestCanceledEvent(i),
                this.handleErrorResponse(i, r.method, e);
            },
          };
        }
        inlineAddEthereumChain(e) {
          return this.ui.inlineAddEthereumChain(e);
        }
        getSessionIdHash() {
          return l.Session.hash(this._session.id);
        }
        sendRequestStandalone(e, t) {
          const r = (r) => {
              this.handleErrorResponse(e, t.method, r);
            },
            n = (t) => {
              this.handleWeb3ResponseMessage({
                type: "WEB3_RESPONSE",
                id: e,
                response: t,
              });
            };
          switch (t.method) {
            case "signEthereumMessage":
              this.ui.signEthereumMessage({
                request: t,
                onSuccess: n,
                onCancel: r,
              });
              break;
            case "signEthereumTransaction":
              this.ui.signEthereumTransaction({
                request: t,
                onSuccess: n,
                onCancel: r,
              });
              break;
            case "submitEthereumTransaction":
              this.ui.submitEthereumTransaction({
                request: t,
                onSuccess: n,
                onCancel: r,
              });
              break;
            case "ethereumAddressFromSignedMessage":
              this.ui.ethereumAddressFromSignedMessage({
                request: t,
                onSuccess: n,
              });
              break;
            default:
              r();
          }
        }
      }
      (t.WalletLinkRelay = d), (d.accountRequestCallbackIds = new Set());
    },
    83820: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WalletLinkConnection = void 0);
      const n = r(21042),
        i = r(82215),
        s = r(55419),
        o = r(84155),
        a = r(5576),
        l = r(25404),
        c = r(57393);
      t.WalletLinkConnection = class {
        constructor(e) {
          let {
            session: t,
            linkAPIUrl: r,
            listener: u,
            diagnostic: h,
            WebSocketClass: d = WebSocket,
          } = e;
          (this.destroyed = !1),
            (this.lastHeartbeatResponse = 0),
            (this.nextReqId = (0, n.IntNumber)(1)),
            (this._connected = !1),
            (this._linked = !1),
            (this.shouldFetchUnseenEventsOnConnect = !1),
            (this.requestResolutions = new Map()),
            (this.handleSessionMetadataUpdated = (e) => {
              if (!e) return;
              new Map([
                ["__destroyed", this.handleDestroyed],
                ["EthereumAddress", this.handleAccountUpdated],
                ["WalletUsername", this.handleWalletUsernameUpdated],
                ["AppVersion", this.handleAppVersionUpdated],
                [
                  "ChainId",
                  (t) =>
                    e.JsonRpcUrl && this.handleChainUpdated(t, e.JsonRpcUrl),
                ],
              ]).forEach((t, r) => {
                const n = e[r];
                void 0 !== n && t(n);
              });
            }),
            (this.handleDestroyed = (e) => {
              var t, r;
              "1" === e &&
                (null === (t = this.listener) ||
                  void 0 === t ||
                  t.resetAndReload(),
                null === (r = this.diagnostic) ||
                  void 0 === r ||
                  r.log(s.EVENTS.METADATA_DESTROYED, {
                    alreadyDestroyed: this.isDestroyed,
                    sessionIdHash: a.Session.hash(this.session.id),
                  }));
            }),
            (this.handleAccountUpdated = async (e) => {
              var t, r;
              try {
                const r = await this.cipher.decrypt(e);
                null === (t = this.listener) ||
                  void 0 === t ||
                  t.accountUpdated(r);
              } catch (n) {
                null === (r = this.diagnostic) ||
                  void 0 === r ||
                  r.log(s.EVENTS.GENERAL_ERROR, {
                    message: "Had error decrypting",
                    value: "selectedAddress",
                  });
              }
            }),
            (this.handleMetadataUpdated = async (e, t) => {
              var r, n;
              try {
                const n = await this.cipher.decrypt(t);
                null === (r = this.listener) ||
                  void 0 === r ||
                  r.metadataUpdated(e, n);
              } catch (i) {
                null === (n = this.diagnostic) ||
                  void 0 === n ||
                  n.log(s.EVENTS.GENERAL_ERROR, {
                    message: "Had error decrypting",
                    value: e,
                  });
              }
            }),
            (this.handleWalletUsernameUpdated = async (e) => {
              this.handleMetadataUpdated(o.WALLET_USER_NAME_KEY, e);
            }),
            (this.handleAppVersionUpdated = async (e) => {
              this.handleMetadataUpdated(o.APP_VERSION_KEY, e);
            }),
            (this.handleChainUpdated = async (e, t) => {
              var r, n;
              try {
                const n = await this.cipher.decrypt(e),
                  i = await this.cipher.decrypt(t);
                null === (r = this.listener) ||
                  void 0 === r ||
                  r.chainUpdated(n, i);
              } catch (i) {
                null === (n = this.diagnostic) ||
                  void 0 === n ||
                  n.log(s.EVENTS.GENERAL_ERROR, {
                    message: "Had error decrypting",
                    value: "chainId|jsonRpcUrl",
                  });
              }
            }),
            (this.session = t),
            (this.cipher = new i.Cipher(t.secret)),
            (this.diagnostic = h),
            (this.listener = u);
          const f = new c.WalletLinkWebSocket(`${r}/rpc`, d);
          f.setConnectionStateListener(async (e) => {
            var r;
            null === (r = this.diagnostic) ||
              void 0 === r ||
              r.log(s.EVENTS.CONNECTED_STATE_CHANGE, {
                state: e,
                sessionIdHash: a.Session.hash(t.id),
              });
            let n = !1;
            switch (e) {
              case c.ConnectionState.DISCONNECTED:
                if (!this.destroyed) {
                  const e = async () => {
                    await new Promise((e) => setTimeout(e, 5e3)),
                      this.destroyed ||
                        f.connect().catch(() => {
                          e();
                        });
                  };
                  e();
                }
                break;
              case c.ConnectionState.CONNECTED:
                try {
                  await this.authenticate(),
                    this.sendIsLinked(),
                    this.sendGetSessionConfig(),
                    (n = !0);
                } catch (i) {}
                this.updateLastHeartbeat(),
                  setInterval(() => {
                    this.heartbeat();
                  }, 1e4),
                  this.shouldFetchUnseenEventsOnConnect &&
                    this.fetchUnseenEventsAPI();
              case c.ConnectionState.CONNECTING:
            }
            this.connected !== n && (this.connected = n);
          }),
            f.setIncomingDataListener((e) => {
              var r, n, i;
              switch (e.type) {
                case "Heartbeat":
                  return void this.updateLastHeartbeat();
                case "IsLinkedOK":
                case "Linked": {
                  const n = "IsLinkedOK" === e.type ? e.linked : void 0;
                  null === (r = this.diagnostic) ||
                    void 0 === r ||
                    r.log(s.EVENTS.LINKED, {
                      sessionIdHash: a.Session.hash(t.id),
                      linked: n,
                      type: e.type,
                      onlineGuests: e.onlineGuests,
                    }),
                    (this.linked = n || e.onlineGuests > 0);
                  break;
                }
                case "GetSessionConfigOK":
                case "SessionConfigUpdated":
                  null === (n = this.diagnostic) ||
                    void 0 === n ||
                    n.log(s.EVENTS.SESSION_CONFIG_RECEIVED, {
                      sessionIdHash: a.Session.hash(t.id),
                      metadata_keys:
                        e && e.metadata ? Object.keys(e.metadata) : void 0,
                    }),
                    this.handleSessionMetadataUpdated(e.metadata);
                  break;
                case "Event":
                  this.handleIncomingEvent(e);
              }
              void 0 !== e.id &&
                (null === (i = this.requestResolutions.get(e.id)) ||
                  void 0 === i ||
                  i(e));
            }),
            (this.ws = f),
            (this.http = new l.WalletLinkHTTP(r, t.id, t.key));
        }
        connect() {
          var e;
          if (this.destroyed) throw new Error("instance is destroyed");
          null === (e = this.diagnostic) ||
            void 0 === e ||
            e.log(s.EVENTS.STARTED_CONNECTING, {
              sessionIdHash: a.Session.hash(this.session.id),
            }),
            this.ws.connect();
        }
        destroy() {
          var e;
          (this.destroyed = !0),
            this.ws.disconnect(),
            null === (e = this.diagnostic) ||
              void 0 === e ||
              e.log(s.EVENTS.DISCONNECTED, {
                sessionIdHash: a.Session.hash(this.session.id),
              }),
            (this.listener = void 0);
        }
        get isDestroyed() {
          return this.destroyed;
        }
        get connected() {
          return this._connected;
        }
        set connected(e) {
          var t, r;
          (this._connected = e),
            e &&
              (null === (t = this.onceConnected) ||
                void 0 === t ||
                t.call(this)),
            null === (r = this.listener) ||
              void 0 === r ||
              r.connectedUpdated(e);
        }
        setOnceConnected(e) {
          return new Promise((t) => {
            this.connected
              ? e().then(t)
              : (this.onceConnected = () => {
                  e().then(t), (this.onceConnected = void 0);
                });
          });
        }
        get linked() {
          return this._linked;
        }
        set linked(e) {
          var t, r;
          (this._linked = e),
            e &&
              (null === (t = this.onceLinked) || void 0 === t || t.call(this)),
            null === (r = this.listener) || void 0 === r || r.linkedUpdated(e);
        }
        setOnceLinked(e) {
          return new Promise((t) => {
            this.linked
              ? e().then(t)
              : (this.onceLinked = () => {
                  e().then(t), (this.onceLinked = void 0);
                });
          });
        }
        async handleIncomingEvent(e) {
          var t, r;
          if ("Event" === e.type && "Web3Response" === e.event)
            try {
              const r = await this.cipher.decrypt(e.data),
                n = JSON.parse(r);
              if ("WEB3_RESPONSE" !== n.type) return;
              null === (t = this.listener) ||
                void 0 === t ||
                t.handleWeb3ResponseMessage(n);
            } catch (n) {
              null === (r = this.diagnostic) ||
                void 0 === r ||
                r.log(s.EVENTS.GENERAL_ERROR, {
                  message: "Had error decrypting",
                  value: "incomingEvent",
                });
            }
        }
        async checkUnseenEvents() {
          if (this.connected) {
            await new Promise((e) => setTimeout(e, 250));
            try {
              await this.fetchUnseenEventsAPI();
            } catch (e) {
              console.error("Unable to check for unseen events", e);
            }
          } else this.shouldFetchUnseenEventsOnConnect = !0;
        }
        async fetchUnseenEventsAPI() {
          this.shouldFetchUnseenEventsOnConnect = !1;
          (await this.http.fetchUnseenEvents()).forEach((e) =>
            this.handleIncomingEvent(e)
          );
        }
        async setSessionMetadata(e, t) {
          const r = {
            type: "SetSessionConfig",
            id: (0, n.IntNumber)(this.nextReqId++),
            sessionId: this.session.id,
            metadata: { [e]: t },
          };
          return this.setOnceConnected(async () => {
            const e = await this.makeRequest(r);
            if ("Fail" === e.type)
              throw new Error(e.error || "failed to set session metadata");
          });
        }
        async publishEvent(e, t) {
          let r =
            arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
          const i = await this.cipher.encrypt(
              JSON.stringify(
                Object.assign(Object.assign({}, t), {
                  origin: location.origin,
                  relaySource: window.coinbaseWalletExtension
                    ? "injected_sdk"
                    : "sdk",
                })
              )
            ),
            s = {
              type: "PublishEvent",
              id: (0, n.IntNumber)(this.nextReqId++),
              sessionId: this.session.id,
              event: e,
              data: i,
              callWebhook: r,
            };
          return this.setOnceLinked(async () => {
            const e = await this.makeRequest(s);
            if ("Fail" === e.type)
              throw new Error(e.error || "failed to publish event");
            return e.eventId;
          });
        }
        sendData(e) {
          this.ws.sendData(JSON.stringify(e));
        }
        updateLastHeartbeat() {
          this.lastHeartbeatResponse = Date.now();
        }
        heartbeat() {
          if (Date.now() - this.lastHeartbeatResponse > 2e4)
            this.ws.disconnect();
          else
            try {
              this.ws.sendData("h");
            } catch (e) {}
        }
        async makeRequest(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 6e4;
          const r = e.id;
          let n;
          return (
            this.sendData(e),
            Promise.race([
              new Promise((e, i) => {
                n = window.setTimeout(() => {
                  i(new Error(`request ${r} timed out`));
                }, t);
              }),
              new Promise((e) => {
                this.requestResolutions.set(r, (t) => {
                  clearTimeout(n), e(t), this.requestResolutions.delete(r);
                });
              }),
            ])
          );
        }
        async authenticate() {
          const e = {
              type: "HostSession",
              id: (0, n.IntNumber)(this.nextReqId++),
              sessionId: this.session.id,
              sessionKey: this.session.key,
            },
            t = await this.makeRequest(e);
          if ("Fail" === t.type)
            throw new Error(t.error || "failed to authentcate");
        }
        sendIsLinked() {
          const e = {
            type: "IsLinked",
            id: (0, n.IntNumber)(this.nextReqId++),
            sessionId: this.session.id,
          };
          this.sendData(e);
        }
        sendGetSessionConfig() {
          const e = {
            type: "GetSessionConfig",
            id: (0, n.IntNumber)(this.nextReqId++),
            sessionId: this.session.id,
          };
          this.sendData(e);
        }
      };
    },
    25404: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WalletLinkHTTP = void 0);
      t.WalletLinkHTTP = class {
        constructor(e, t, r) {
          (this.linkAPIUrl = e), (this.sessionId = t);
          const n = `${t}:${r}`;
          this.auth = `Basic ${btoa(n)}`;
        }
        async markUnseenEventsAsSeen(e) {
          return Promise.all(
            e.map((e) =>
              fetch(`${this.linkAPIUrl}/events/${e.eventId}/seen`, {
                method: "POST",
                headers: { Authorization: this.auth },
              })
            )
          ).catch((e) => console.error("Unabled to mark event as failed:", e));
        }
        async fetchUnseenEvents() {
          var e;
          const t = await fetch(`${this.linkAPIUrl}/events?unseen=true`, {
            headers: { Authorization: this.auth },
          });
          if (t.ok) {
            const { events: r, error: n } = await t.json();
            if (n) throw new Error(`Check unseen events failed: ${n}`);
            const i =
              null !==
                (e =
                  null === r || void 0 === r
                    ? void 0
                    : r
                        .filter((e) => "Web3Response" === e.event)
                        .map((e) => ({
                          type: "Event",
                          sessionId: this.sessionId,
                          eventId: e.id,
                          event: e.event,
                          data: e.data,
                        }))) && void 0 !== e
                ? e
                : [];
            return this.markUnseenEventsAsSeen(i), i;
          }
          throw new Error(`Check unseen events failed: ${t.status}`);
        }
      };
    },
    57393: (e, t) => {
      "use strict";
      var r;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WalletLinkWebSocket = t.ConnectionState = void 0),
        (function (e) {
          (e[(e.DISCONNECTED = 0)] = "DISCONNECTED"),
            (e[(e.CONNECTING = 1)] = "CONNECTING"),
            (e[(e.CONNECTED = 2)] = "CONNECTED");
        })(r || (t.ConnectionState = r = {}));
      t.WalletLinkWebSocket = class {
        setConnectionStateListener(e) {
          this.connectionStateListener = e;
        }
        setIncomingDataListener(e) {
          this.incomingDataListener = e;
        }
        constructor(e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : WebSocket;
          (this.WebSocketClass = t),
            (this.webSocket = null),
            (this.pendingData = []),
            (this.url = e.replace(/^http/, "ws"));
        }
        async connect() {
          if (this.webSocket) throw new Error("webSocket object is not null");
          return new Promise((e, t) => {
            var n;
            let i;
            try {
              this.webSocket = i = new this.WebSocketClass(this.url);
            } catch (s) {
              return void t(s);
            }
            null === (n = this.connectionStateListener) ||
              void 0 === n ||
              n.call(this, r.CONNECTING),
              (i.onclose = (e) => {
                var n;
                this.clearWebSocket(),
                  t(new Error(`websocket error ${e.code}: ${e.reason}`)),
                  null === (n = this.connectionStateListener) ||
                    void 0 === n ||
                    n.call(this, r.DISCONNECTED);
              }),
              (i.onopen = (t) => {
                var n;
                if (
                  (e(),
                  null === (n = this.connectionStateListener) ||
                    void 0 === n ||
                    n.call(this, r.CONNECTED),
                  this.pendingData.length > 0)
                ) {
                  [...this.pendingData].forEach((e) => this.sendData(e)),
                    (this.pendingData = []);
                }
              }),
              (i.onmessage = (e) => {
                var t, r;
                if ("h" === e.data)
                  null === (t = this.incomingDataListener) ||
                    void 0 === t ||
                    t.call(this, { type: "Heartbeat" });
                else
                  try {
                    const t = JSON.parse(e.data);
                    null === (r = this.incomingDataListener) ||
                      void 0 === r ||
                      r.call(this, t);
                  } catch (n) {}
              });
          });
        }
        disconnect() {
          var e;
          const { webSocket: t } = this;
          if (t) {
            this.clearWebSocket(),
              null === (e = this.connectionStateListener) ||
                void 0 === e ||
                e.call(this, r.DISCONNECTED),
              (this.connectionStateListener = void 0),
              (this.incomingDataListener = void 0);
            try {
              t.close();
            } catch (n) {}
          }
        }
        sendData(e) {
          const { webSocket: t } = this;
          if (!t) return this.pendingData.push(e), void this.connect();
          t.send(e);
        }
        clearWebSocket() {
          const { webSocket: e } = this;
          e &&
            ((this.webSocket = null),
            (e.onclose = null),
            (e.onerror = null),
            (e.onmessage = null),
            (e.onopen = null));
        }
      };
    },
    5717: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.isErrorResponse = void 0),
        (t.isErrorResponse = function (e) {
          return void 0 !== e.errorMessage;
        });
    },
    41827: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WalletLinkRelayUI = void 0);
      const n = r(78970),
        i = r(30689),
        s = r(74523);
      t.WalletLinkRelayUI = class {
        constructor(e) {
          (this.standalone = null),
            (this.attached = !1),
            (this.snackbar = new s.Snackbar({ darkMode: e.darkMode })),
            (this.linkFlow = new i.LinkFlow({
              darkMode: e.darkMode,
              version: e.version,
              sessionId: e.session.id,
              sessionSecret: e.session.secret,
              linkAPIUrl: e.linkAPIUrl,
              isParentConnection: !1,
            }));
        }
        attach() {
          if (this.attached)
            throw new Error("Coinbase Wallet SDK UI is already attached");
          const e = document.documentElement,
            t = document.createElement("div");
          (t.className = "-cbwsdk-css-reset"),
            e.appendChild(t),
            this.linkFlow.attach(t),
            this.snackbar.attach(t),
            (this.attached = !0),
            (0, n.injectCssReset)();
        }
        setConnected(e) {
          this.linkFlow.setConnected(e);
        }
        setChainId(e) {
          this.linkFlow.setChainId(e);
        }
        setConnectDisabled(e) {
          this.linkFlow.setConnectDisabled(e);
        }
        addEthereumChain() {}
        watchAsset() {}
        switchEthereumChain() {}
        requestEthereumAccounts(e) {
          this.linkFlow.open({ onCancel: e.onCancel });
        }
        hideRequestEthereumAccounts() {
          this.linkFlow.close();
        }
        signEthereumMessage() {}
        signEthereumTransaction() {}
        submitEthereumTransaction() {}
        ethereumAddressFromSignedMessage() {}
        showConnecting(e) {
          let t;
          return (
            (t = e.isUnlinkedErrorState
              ? {
                  autoExpand: !0,
                  message: "Connection lost",
                  menuItems: [
                    {
                      isRed: !1,
                      info: "Reset connection",
                      svgWidth: "10",
                      svgHeight: "11",
                      path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
                      defaultFillRule: "evenodd",
                      defaultClipRule: "evenodd",
                      onClick: e.onResetConnection,
                    },
                  ],
                }
              : {
                  message: "Confirm on phone",
                  menuItems: [
                    {
                      isRed: !0,
                      info: "Cancel transaction",
                      svgWidth: "11",
                      svgHeight: "11",
                      path: "M10.3711 1.52346L9.21775 0.370117L5.37109 4.21022L1.52444 0.370117L0.371094 1.52346L4.2112 5.37012L0.371094 9.21677L1.52444 10.3701L5.37109 6.53001L9.21775 10.3701L10.3711 9.21677L6.53099 5.37012L10.3711 1.52346Z",
                      defaultFillRule: "inherit",
                      defaultClipRule: "inherit",
                      onClick: e.onCancel,
                    },
                    {
                      isRed: !1,
                      info: "Reset connection",
                      svgWidth: "10",
                      svgHeight: "11",
                      path: "M5.00008 0.96875C6.73133 0.96875 8.23758 1.94375 9.00008 3.375L10.0001 2.375V5.5H9.53133H7.96883H6.87508L7.80633 4.56875C7.41258 3.3875 6.31258 2.53125 5.00008 2.53125C3.76258 2.53125 2.70633 3.2875 2.25633 4.36875L0.812576 3.76875C1.50008 2.125 3.11258 0.96875 5.00008 0.96875ZM2.19375 6.43125C2.5875 7.6125 3.6875 8.46875 5 8.46875C6.2375 8.46875 7.29375 7.7125 7.74375 6.63125L9.1875 7.23125C8.5 8.875 6.8875 10.0312 5 10.0312C3.26875 10.0312 1.7625 9.05625 1 7.625L0 8.625V5.5H0.46875H2.03125H3.125L2.19375 6.43125Z",
                      defaultFillRule: "evenodd",
                      defaultClipRule: "evenodd",
                      onClick: e.onResetConnection,
                    },
                  ],
                }),
            this.snackbar.presentItem(t)
          );
        }
        reloadUI() {
          document.location.reload();
        }
        inlineAccountsResponse() {
          return !1;
        }
        inlineAddEthereumChain() {
          return !1;
        }
        inlineWatchAsset() {
          return !1;
        }
        inlineSwitchEthereumChain() {
          return !1;
        }
        setStandalone(e) {
          this.standalone = e;
        }
        isStandalone() {
          var e;
          return null !== (e = this.standalone) && void 0 !== e && e;
        }
      };
    },
    34885: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default =
          ".-cbwsdk-css-reset .-cbwsdk-connect-content{height:430px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-connect-content.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-header{display:flex;align-items:center;justify-content:space-between;margin:0 0 30px}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading{font-style:normal;font-weight:500;font-size:28px;line-height:36px;margin:0}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-layout{display:flex;flex-direction:row}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-left{margin-right:30px;display:flex;flex-direction:column;justify-content:space-between}.-cbwsdk-css-reset .-cbwsdk-connect-content-column-right{flex:25%;margin-right:34px}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-wrapper{width:220px;height:220px;border-radius:12px;display:flex;justify-content:center;align-items:center;background:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting{position:absolute;top:0;bottom:0;left:0;right:0;display:flex;flex-direction:column;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light{background-color:rgba(255,255,255,.95)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.light>p{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark{background-color:rgba(10,11,13,.9)}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting.dark>p{color:#fff}.-cbwsdk-css-reset .-cbwsdk-connect-content-qr-connecting>p{font-size:12px;font-weight:bold;margin-top:16px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app{border-radius:8px;font-size:14px;line-height:20px;padding:12px;width:339px}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.light{background:#eef0f3;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-connect-content-update-app.dark{background:#1e2025;color:#8a919e}.-cbwsdk-css-reset .-cbwsdk-cancel-button{-webkit-appearance:none;border:none;background:none;cursor:pointer;padding:0;margin:0}.-cbwsdk-css-reset .-cbwsdk-cancel-button-x{position:relative;display:block;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-wallet-steps{padding:0 0 0 16px;margin:0;width:100%;list-style:decimal}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item{list-style-type:decimal;display:list-item;font-style:normal;font-weight:400;font-size:16px;line-height:24px;margin-top:20px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-item-wrapper{display:flex;align-items:center}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-pad-left{margin-left:6px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon{display:flex;border-radius:50%;height:24px;width:24px}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.light{background:#0052ff}.-cbwsdk-css-reset .-cbwsdk-wallet-steps-icon.dark{background:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item{align-items:center;display:flex;flex-direction:row;padding:16px 24px;gap:12px;cursor:pointer;border-radius:100px;font-weight:600}.-cbwsdk-css-reset .-cbwsdk-connect-item.light{background:#f5f8ff;color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-connect-item.dark{background:#001033;color:#588af5}.-cbwsdk-css-reset .-cbwsdk-connect-item-copy-wrapper{margin:0 4px 0 8px}.-cbwsdk-css-reset .-cbwsdk-connect-item-title{margin:0 0 0;font-size:16px;line-height:24px;font-weight:500}.-cbwsdk-css-reset .-cbwsdk-connect-item-description{font-weight:400;font-size:14px;line-height:20px;margin:0}");
    },
    40431: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CoinbaseWalletSteps = t.ConnectContent = void 0);
      const i = n(r(20061)),
        s = r(26803),
        o = r(27542),
        a = r(79106),
        l = r(42152),
        c = r(73974),
        u = r(17541),
        h = r(35468),
        d = r(41239),
        f = n(r(34885)),
        p = "Coinbase Wallet app",
        g = "Connect with your self-custody wallet",
        m = y,
        _ = (e) => ("light" === e ? "#FFFFFF" : "#0A0B0D");
      function v(e) {
        let { title: t, description: r, theme: n } = e;
        return (0, s.h)(
          "div",
          { className: (0, i.default)("-cbwsdk-connect-item", n) },
          (0, s.h)("div", null, (0, s.h)(c.CoinbaseWalletRound, null)),
          (0, s.h)(
            "div",
            { className: "-cbwsdk-connect-item-copy-wrapper" },
            (0, s.h)("h3", { className: "-cbwsdk-connect-item-title" }, t),
            (0, s.h)("p", { className: "-cbwsdk-connect-item-description" }, r)
          )
        );
      }
      function y(e) {
        let { theme: t } = e;
        return (0, s.h)(
          "ol",
          { className: "-cbwsdk-wallet-steps" },
          (0, s.h)(
            "li",
            { className: (0, i.default)("-cbwsdk-wallet-steps-item", t) },
            (0, s.h)(
              "div",
              { className: "-cbwsdk-wallet-steps-item-wrapper" },
              "Open Coinbase Wallet app"
            )
          ),
          (0, s.h)(
            "li",
            { className: (0, i.default)("-cbwsdk-wallet-steps-item", t) },
            (0, s.h)(
              "div",
              { className: "-cbwsdk-wallet-steps-item-wrapper" },
              (0, s.h)(
                "span",
                null,
                "Tap ",
                (0, s.h)("strong", null, "Scan"),
                " "
              ),
              (0, s.h)(
                "span",
                {
                  className: (0, i.default)(
                    "-cbwsdk-wallet-steps-pad-left",
                    "-cbwsdk-wallet-steps-icon",
                    t
                  ),
                },
                (0, s.h)(u.QRCodeIcon, { fill: _(t) })
              )
            )
          )
        );
      }
      (t.ConnectContent = function (e) {
        const { theme: t } = e,
          r = (0, o.createQrUrl)(
            e.sessionId,
            e.sessionSecret,
            e.linkAPIUrl,
            e.isParentConnection,
            e.version,
            e.chainId
          ),
          n = m;
        return (0, s.h)(
          "div",
          {
            "data-testid": "connect-content",
            className: (0, i.default)("-cbwsdk-connect-content", t),
          },
          (0, s.h)("style", null, f.default),
          (0, s.h)(
            "div",
            { className: "-cbwsdk-connect-content-header" },
            (0, s.h)(
              "h2",
              {
                className: (0, i.default)("-cbwsdk-connect-content-heading", t),
              },
              "Scan to connect with our mobile app"
            ),
            e.onCancel &&
              (0, s.h)(
                "button",
                {
                  type: "button",
                  className: "-cbwsdk-cancel-button",
                  onClick: e.onCancel,
                },
                (0, s.h)(l.CloseIcon, {
                  fill: "light" === t ? "#0A0B0D" : "#FFFFFF",
                })
              )
          ),
          (0, s.h)(
            "div",
            { className: "-cbwsdk-connect-content-layout" },
            (0, s.h)(
              "div",
              { className: "-cbwsdk-connect-content-column-left" },
              (0, s.h)(v, { title: p, description: g, theme: t })
            ),
            (0, s.h)(
              "div",
              { className: "-cbwsdk-connect-content-column-right" },
              (0, s.h)(
                "div",
                { className: "-cbwsdk-connect-content-qr-wrapper" },
                (0, s.h)(h.QRCode, {
                  content: r,
                  width: 200,
                  height: 200,
                  fgColor: "#000",
                  bgColor: "transparent",
                }),
                (0, s.h)("input", {
                  type: "hidden",
                  name: "cbw-cbwsdk-version",
                  value: a.LIB_VERSION,
                }),
                (0, s.h)("input", { type: "hidden", value: r })
              ),
              (0, s.h)(n, { theme: t }),
              !e.isConnected &&
                (0, s.h)(
                  "div",
                  {
                    "data-testid": "connecting-spinner",
                    className: (0, i.default)(
                      "-cbwsdk-connect-content-qr-connecting",
                      t
                    ),
                  },
                  (0, s.h)(d.Spinner, {
                    size: 36,
                    color: "dark" === t ? "#FFF" : "#000",
                  }),
                  (0, s.h)("p", null, "Connecting...")
                )
            )
          )
        );
      }),
        (t.CoinbaseWalletSteps = y);
    },
    27017: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default =
          ".-cbwsdk-css-reset .-cbwsdk-connect-dialog{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop{z-index:2147483647;position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.light{background-color:rgba(0,0,0,.5)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop.dark{background-color:rgba(50,53,61,.4)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box{display:flex;position:relative;flex-direction:column;transform:scale(1);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-box-hidden{opacity:0;transform:scale(0.85)}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container{display:block}.-cbwsdk-css-reset .-cbwsdk-connect-dialog-container-hidden{display:none}");
    },
    42763: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ConnectDialog = void 0);
      const i = n(r(20061)),
        s = r(26803),
        o = r(81599),
        a = r(40431),
        l = r(54567),
        c = n(r(27017));
      t.ConnectDialog = (e) => {
        const { isOpen: t, darkMode: r } = e,
          [n, u] = (0, o.useState)(!t),
          [h, d] = (0, o.useState)(!t);
        (0, o.useEffect)(() => {
          const e = [
            window.setTimeout(() => {
              d(!t);
            }, 10),
          ];
          return (
            t
              ? u(!1)
              : e.push(
                  window.setTimeout(() => {
                    u(!0);
                  }, 360)
                ),
            () => {
              e.forEach(window.clearTimeout);
            }
          );
        }, [t]);
        const f = r ? "dark" : "light";
        return (0, s.h)(
          "div",
          {
            class: (0, i.default)(
              "-cbwsdk-connect-dialog-container",
              n && "-cbwsdk-connect-dialog-container-hidden"
            ),
          },
          (0, s.h)("style", null, c.default),
          (0, s.h)("div", {
            class: (0, i.default)(
              "-cbwsdk-connect-dialog-backdrop",
              f,
              h && "-cbwsdk-connect-dialog-backdrop-hidden"
            ),
          }),
          (0, s.h)(
            "div",
            { class: "-cbwsdk-connect-dialog" },
            (0, s.h)(
              "div",
              {
                class: (0, i.default)(
                  "-cbwsdk-connect-dialog-box",
                  h && "-cbwsdk-connect-dialog-box-hidden"
                ),
              },
              e.connectDisabled
                ? null
                : (0, s.h)(a.ConnectContent, {
                    theme: f,
                    version: e.version,
                    sessionId: e.sessionId,
                    sessionSecret: e.sessionSecret,
                    linkAPIUrl: e.linkAPIUrl,
                    isConnected: e.isConnected,
                    isParentConnection: e.isParentConnection,
                    chainId: e.chainId,
                    onCancel: e.onCancel,
                  }),
              (0, s.h)(l.TryExtensionContent, { theme: f })
            )
          )
        );
      };
    },
    30689: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LinkFlow = void 0);
      const n = r(26803),
        i = r(42763);
      t.LinkFlow = class {
        constructor(e) {
          (this.connected = !1),
            (this.chainId = 1),
            (this.isOpen = !1),
            (this.onCancel = null),
            (this.root = null),
            (this.connectDisabled = !1),
            (this.darkMode = e.darkMode),
            (this.version = e.version),
            (this.sessionId = e.sessionId),
            (this.sessionSecret = e.sessionSecret),
            (this.linkAPIUrl = e.linkAPIUrl),
            (this.isParentConnection = e.isParentConnection);
        }
        attach(e) {
          (this.root = document.createElement("div")),
            (this.root.className = "-cbwsdk-link-flow-root"),
            e.appendChild(this.root),
            this.render();
        }
        setConnected(e) {
          this.connected !== e && ((this.connected = e), this.render());
        }
        setChainId(e) {
          this.chainId !== e && ((this.chainId = e), this.render());
        }
        detach() {
          var e;
          this.root &&
            ((0, n.render)(null, this.root),
            null === (e = this.root.parentElement) ||
              void 0 === e ||
              e.removeChild(this.root));
        }
        setConnectDisabled(e) {
          this.connectDisabled = e;
        }
        open(e) {
          (this.isOpen = !0), (this.onCancel = e.onCancel), this.render();
        }
        close() {
          (this.isOpen = !1), (this.onCancel = null), this.render();
        }
        render() {
          this.root &&
            (0, n.render)(
              (0, n.h)(i.ConnectDialog, {
                darkMode: this.darkMode,
                version: this.version,
                sessionId: this.sessionId,
                sessionSecret: this.sessionSecret,
                linkAPIUrl: this.linkAPIUrl,
                isOpen: this.isOpen,
                isConnected: this.connected,
                isParentConnection: this.isParentConnection,
                chainId: this.chainId,
                onCancel: this.onCancel,
                connectDisabled: this.connectDisabled,
              }),
              this.root
            );
        }
      };
    },
    35468: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.QRCode = void 0);
      const i = r(26803),
        s = r(81599),
        o = n(r(76577));
      t.QRCode = (e) => {
        const [t, r] = (0, s.useState)("");
        return (
          (0, s.useEffect)(() => {
            var t, n;
            const i = new o.default({
                content: e.content,
                background: e.bgColor || "#ffffff",
                color: e.fgColor || "#000000",
                container: "svg",
                ecl: "M",
                width: null !== (t = e.width) && void 0 !== t ? t : 256,
                height: null !== (n = e.height) && void 0 !== n ? n : 256,
                padding: 0,
                image: e.image,
              }),
              s = Buffer.from(i.svg(), "utf8").toString("base64");
            r(`data:image/svg+xml;base64,${s}`);
          }, [e.bgColor, e.content, e.fgColor, e.height, e.image, e.width]),
          t ? (0, i.h)("img", { src: t, alt: "QR Code" }) : null
        );
      };
    },
    287: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default =
          ".-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;transition:opacity .25s;background-color:rgba(10,11,13,.5)}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-backdrop-hidden{opacity:0}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box{display:block;position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);padding:20px;border-radius:8px;background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box p{display:block;font-weight:400;font-size:14px;line-height:20px;padding-bottom:12px;color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box button{appearance:none;border:none;background:none;color:#0052ff;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark{background-color:#0a0b0d;color:#fff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.dark button{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light{background-color:#fff;color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-redirect-dialog-box.light button{color:#0052ff}");
    },
    48021: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.RedirectDialog = void 0);
      const i = n(r(20061)),
        s = r(26803),
        o = r(78970),
        a = r(31062),
        l = n(r(287));
      t.RedirectDialog = class {
        constructor() {
          this.root = null;
        }
        attach() {
          const e = document.documentElement;
          (this.root = document.createElement("div")),
            (this.root.className = "-cbwsdk-css-reset"),
            e.appendChild(this.root),
            (0, o.injectCssReset)();
        }
        present(e) {
          this.render(e);
        }
        clear() {
          this.render(null);
        }
        render(e) {
          this.root &&
            ((0, s.render)(null, this.root),
            e &&
              (0, s.render)(
                (0, s.h)(
                  c,
                  Object.assign({}, e, {
                    onDismiss: () => {
                      this.clear();
                    },
                  })
                ),
                this.root
              ));
        }
      };
      const c = (e) => {
        let {
          title: t,
          buttonText: r,
          darkMode: n,
          onButtonClick: o,
          onDismiss: c,
        } = e;
        const u = n ? "dark" : "light";
        return (0, s.h)(
          a.SnackbarContainer,
          { darkMode: n },
          (0, s.h)(
            "div",
            { class: "-cbwsdk-redirect-dialog" },
            (0, s.h)("style", null, l.default),
            (0, s.h)("div", {
              class: "-cbwsdk-redirect-dialog-backdrop",
              onClick: c,
            }),
            (0, s.h)(
              "div",
              { class: (0, i.default)("-cbwsdk-redirect-dialog-box", u) },
              (0, s.h)("p", null, t),
              (0, s.h)("button", { onClick: o }, r)
            )
          )
        );
      };
    },
    75961: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default =
          ".-cbwsdk-css-reset .-gear-container{margin-left:16px !important;margin-right:9px !important;display:flex;align-items:center;justify-content:center;width:24px;height:24px;transition:opacity .25s}.-cbwsdk-css-reset .-gear-container *{user-select:none}.-cbwsdk-css-reset .-gear-container svg{opacity:0;position:absolute}.-cbwsdk-css-reset .-gear-icon{height:12px;width:12px;z-index:10000}.-cbwsdk-css-reset .-cbwsdk-snackbar{align-items:flex-end;display:flex;flex-direction:column;position:fixed;right:0;top:0;z-index:2147483647}.-cbwsdk-css-reset .-cbwsdk-snackbar *{user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance{display:flex;flex-direction:column;margin:8px 16px 0 16px;overflow:visible;text-align:left;transform:translateX(0);transition:opacity .25s,transform .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header:hover .-gear-container svg{opacity:1}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header{display:flex;align-items:center;background:#fff;overflow:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-cblogo{margin:8px 8px 8px 8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-header-message{color:#000;font-size:13px;line-height:1.5;user-select:none}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu{background:#fff;transition:opacity .25s ease-in-out,transform .25s linear,visibility 0s;visibility:hidden;border:1px solid #e7ebee;box-sizing:border-box;border-radius:8px;opacity:0;flex-direction:column;padding-left:8px;padding-right:8px}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:last-child{margin-bottom:8px !important}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover{background:#f5f7f8;border-radius:6px;transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover span{color:#050f19;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item:hover svg path{fill:#000;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item{visibility:inherit;height:35px;margin-top:8px;margin-bottom:0;display:flex;flex-direction:row;align-items:center;padding:8px;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item *{visibility:inherit;cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover{background:rgba(223,95,103,.2);transition:background .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover *{cursor:pointer}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover svg path{fill:#df5f67;transition:fill .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-is-red:hover span{color:#df5f67;transition:color .25s}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-menu-item-info{color:#aaa;font-size:13px;margin:0 8px 0 32px;position:absolute}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-hidden{opacity:0;text-align:left;transform:translateX(25%);transition:opacity .5s linear}.-cbwsdk-css-reset .-cbwsdk-snackbar-instance-expanded .-cbwsdk-snackbar-instance-menu{opacity:1;display:flex;transform:translateY(8px);visibility:visible}");
    },
    74523: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.SnackbarInstance = t.SnackbarContainer = t.Snackbar = void 0);
      const i = n(r(20061)),
        s = r(26803),
        o = r(81599),
        a = n(r(75961));
      t.Snackbar = class {
        constructor(e) {
          (this.items = new Map()),
            (this.nextItemKey = 0),
            (this.root = null),
            (this.darkMode = e.darkMode);
        }
        attach(e) {
          (this.root = document.createElement("div")),
            (this.root.className = "-cbwsdk-snackbar-root"),
            e.appendChild(this.root),
            this.render();
        }
        presentItem(e) {
          const t = this.nextItemKey++;
          return (
            this.items.set(t, e),
            this.render(),
            () => {
              this.items.delete(t), this.render();
            }
          );
        }
        clear() {
          this.items.clear(), this.render();
        }
        render() {
          this.root &&
            (0, s.render)(
              (0, s.h)(
                "div",
                null,
                (0, s.h)(
                  t.SnackbarContainer,
                  { darkMode: this.darkMode },
                  Array.from(this.items.entries()).map((e) => {
                    let [r, n] = e;
                    return (0, s.h)(
                      t.SnackbarInstance,
                      Object.assign({}, n, { key: r })
                    );
                  })
                )
              ),
              this.root
            );
        }
      };
      t.SnackbarContainer = (e) =>
        (0, s.h)(
          "div",
          { class: (0, i.default)("-cbwsdk-snackbar-container") },
          (0, s.h)("style", null, a.default),
          (0, s.h)("div", { class: "-cbwsdk-snackbar" }, e.children)
        );
      t.SnackbarInstance = (e) => {
        let { autoExpand: t, message: r, menuItems: n } = e;
        const [a, l] = (0, o.useState)(!0),
          [c, u] = (0, o.useState)(null !== t && void 0 !== t && t);
        (0, o.useEffect)(() => {
          const e = [
            window.setTimeout(() => {
              l(!1);
            }, 1),
            window.setTimeout(() => {
              u(!0);
            }, 1e4),
          ];
          return () => {
            e.forEach(window.clearTimeout);
          };
        });
        return (0, s.h)(
          "div",
          {
            class: (0, i.default)(
              "-cbwsdk-snackbar-instance",
              a && "-cbwsdk-snackbar-instance-hidden",
              c && "-cbwsdk-snackbar-instance-expanded"
            ),
          },
          (0, s.h)(
            "div",
            {
              class: "-cbwsdk-snackbar-instance-header",
              onClick: () => {
                u(!c);
              },
            },
            (0, s.h)("img", {
              src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEuNDkyIDEwLjQxOWE4LjkzIDguOTMgMCAwMTguOTMtOC45M2gxMS4xNjNhOC45MyA4LjkzIDAgMDE4LjkzIDguOTN2MTEuMTYzYTguOTMgOC45MyAwIDAxLTguOTMgOC45M0gxMC40MjJhOC45MyA4LjkzIDAgMDEtOC45My04LjkzVjEwLjQxOXoiIGZpbGw9IiMxNjUyRjAiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEwLjQxOSAwSDIxLjU4QzI3LjMzNSAwIDMyIDQuNjY1IDMyIDEwLjQxOVYyMS41OEMzMiAyNy4zMzUgMjcuMzM1IDMyIDIxLjU4MSAzMkgxMC40MkM0LjY2NSAzMiAwIDI3LjMzNSAwIDIxLjU4MVYxMC40MkMwIDQuNjY1IDQuNjY1IDAgMTAuNDE5IDB6bTAgMS40ODhhOC45MyA4LjkzIDAgMDAtOC45MyA4LjkzdjExLjE2M2E4LjkzIDguOTMgMCAwMDguOTMgOC45M0gyMS41OGE4LjkzIDguOTMgMCAwMDguOTMtOC45M1YxMC40MmE4LjkzIDguOTMgMCAwMC04LjkzLTguOTNIMTAuNDJ6IiBmaWxsPSIjZmZmIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTggMjYuMDQ5Yy01LjU0OSAwLTEwLjA0Ny00LjQ5OC0xMC4wNDctMTAuMDQ3IDAtNS41NDggNC40OTgtMTAuMDQ2IDEwLjA0Ny0xMC4wNDYgNS41NDggMCAxMC4wNDYgNC40OTggMTAuMDQ2IDEwLjA0NiAwIDUuNTQ5LTQuNDk4IDEwLjA0Ny0xMC4wNDYgMTAuMDQ3eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik0xMi43NjIgMTQuMjU0YzAtLjgyMi42NjctMS40ODkgMS40ODktMS40ODloMy40OTdjLjgyMiAwIDEuNDg4LjY2NiAxLjQ4OCAxLjQ4OXYzLjQ5N2MwIC44MjItLjY2NiAxLjQ4OC0xLjQ4OCAxLjQ4OGgtMy40OTdhMS40ODggMS40ODggMCAwMS0xLjQ4OS0xLjQ4OHYtMy40OTh6IiBmaWxsPSIjMTY1MkYwIi8+PC9zdmc+",
              class: "-cbwsdk-snackbar-instance-header-cblogo",
            }),
            " ",
            (0, s.h)(
              "div",
              { class: "-cbwsdk-snackbar-instance-header-message" },
              r
            ),
            (0, s.h)(
              "div",
              { class: "-gear-container" },
              !c &&
                (0, s.h)(
                  "svg",
                  {
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                  },
                  (0, s.h)("circle", {
                    cx: "12",
                    cy: "12",
                    r: "12",
                    fill: "#F5F7F8",
                  })
                ),
              (0, s.h)("img", {
                src: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDYuNzV2LTEuNWwtMS43Mi0uNTdjLS4wOC0uMjctLjE5LS41Mi0uMzItLjc3bC44MS0xLjYyLTEuMDYtMS4wNi0xLjYyLjgxYy0uMjQtLjEzLS41LS4yNC0uNzctLjMyTDYuNzUgMGgtMS41bC0uNTcgMS43MmMtLjI3LjA4LS41My4xOS0uNzcuMzJsLTEuNjItLjgxLTEuMDYgMS4wNi44MSAxLjYyYy0uMTMuMjQtLjI0LjUtLjMyLjc3TDAgNS4yNXYxLjVsMS43Mi41N2MuMDguMjcuMTkuNTMuMzIuNzdsLS44MSAxLjYyIDEuMDYgMS4wNiAxLjYyLS44MWMuMjQuMTMuNS4yMy43Ny4zMkw1LjI1IDEyaDEuNWwuNTctMS43MmMuMjctLjA4LjUyLS4xOS43Ny0uMzJsMS42Mi44MSAxLjA2LTEuMDYtLjgxLTEuNjJjLjEzLS4yNC4yMy0uNS4zMi0uNzdMMTIgNi43NXpNNiA4LjVhMi41IDIuNSAwIDAxMC01IDIuNSAyLjUgMCAwMTAgNXoiIGZpbGw9IiMwNTBGMTkiLz48L3N2Zz4=",
                class: "-gear-icon",
                title: "Expand",
              })
            )
          ),
          n &&
            n.length > 0 &&
            (0, s.h)(
              "div",
              { class: "-cbwsdk-snackbar-instance-menu" },
              n.map((e, t) =>
                (0, s.h)(
                  "div",
                  {
                    class: (0, i.default)(
                      "-cbwsdk-snackbar-instance-menu-item",
                      e.isRed && "-cbwsdk-snackbar-instance-menu-item-is-red"
                    ),
                    onClick: e.onClick,
                    key: t,
                  },
                  (0, s.h)(
                    "svg",
                    {
                      width: e.svgWidth,
                      height: e.svgHeight,
                      viewBox: "0 0 10 11",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                    (0, s.h)("path", {
                      "fill-rule": e.defaultFillRule,
                      "clip-rule": e.defaultClipRule,
                      d: e.path,
                      fill: "#AAAAAA",
                    })
                  ),
                  (0, s.h)(
                    "span",
                    {
                      class: (0, i.default)(
                        "-cbwsdk-snackbar-instance-menu-item-info",
                        e.isRed &&
                          "-cbwsdk-snackbar-instance-menu-item-info-is-red"
                      ),
                    },
                    e.info
                  )
                )
              )
            )
        );
      };
    },
    31062: function (e, t, r) {
      "use strict";
      var n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, r, n) {
                void 0 === n && (n = r);
                var i = Object.getOwnPropertyDescriptor(t, r);
                (i &&
                  !("get" in i
                    ? !t.__esModule
                    : i.writable || i.configurable)) ||
                  (i = {
                    enumerable: !0,
                    get: function () {
                      return t[r];
                    },
                  }),
                  Object.defineProperty(e, n, i);
              }
            : function (e, t, r, n) {
                void 0 === n && (n = r), (e[n] = t[r]);
              }),
        i =
          (this && this.__exportStar) ||
          function (e, t) {
            for (var r in e)
              "default" === r ||
                Object.prototype.hasOwnProperty.call(t, r) ||
                n(t, e, r);
          };
      Object.defineProperty(t, "__esModule", { value: !0 }), i(r(74523), t);
    },
    57757: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default =
          ".-cbwsdk-css-reset .-cbwsdk-spinner{display:inline-block}.-cbwsdk-css-reset .-cbwsdk-spinner svg{display:inline-block;animation:2s linear infinite -cbwsdk-spinner-svg}.-cbwsdk-css-reset .-cbwsdk-spinner svg circle{animation:1.9s ease-in-out infinite both -cbwsdk-spinner-circle;display:block;fill:rgba(0,0,0,0);stroke-dasharray:283;stroke-dashoffset:280;stroke-linecap:round;stroke-width:10px;transform-origin:50% 50%}@keyframes -cbwsdk-spinner-svg{0%{transform:rotateZ(0deg)}100%{transform:rotateZ(360deg)}}@keyframes -cbwsdk-spinner-circle{0%,25%{stroke-dashoffset:280;transform:rotate(0)}50%,75%{stroke-dashoffset:75;transform:rotate(45deg)}100%{stroke-dashoffset:280;transform:rotate(360deg)}}");
    },
    41239: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Spinner = void 0);
      const i = r(26803),
        s = n(r(57757));
      t.Spinner = (e) => {
        var t;
        const r = null !== (t = e.size) && void 0 !== t ? t : 64,
          n = e.color || "#000";
        return (0, i.h)(
          "div",
          { class: "-cbwsdk-spinner" },
          (0, i.h)("style", null, s.default),
          (0, i.h)(
            "svg",
            {
              viewBox: "0 0 100 100",
              xmlns: "http://www.w3.org/2000/svg",
              style: { width: r, height: r },
            },
            (0, i.h)("circle", { style: { cx: 50, cy: 50, r: 45, stroke: n } })
          )
        );
      };
    },
    32365: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default =
          ".-cbwsdk-css-reset .-cbwsdk-try-extension{display:flex;margin-top:12px;height:202px;width:700px;border-radius:12px;padding:30px}.-cbwsdk-css-reset .-cbwsdk-try-extension.light{background:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension.dark{background:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-column-half{flex:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading{font-style:normal;font-weight:500;font-size:25px;line-height:32px;margin:0;max-width:204px}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.light{color:#0a0b0d}.-cbwsdk-css-reset .-cbwsdk-try-extension-heading.dark{color:#fff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta{appearance:none;border:none;background:none;color:#0052ff;cursor:pointer;padding:0;text-decoration:none;display:block;font-weight:600;font-size:16px;line-height:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.light{color:#0052ff}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta.dark{color:#588af5}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-wrapper{display:flex;align-items:center;margin-top:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-cta-icon{display:block;margin-left:4px;height:14px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list{display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0;padding:0;list-style:none;height:100%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item{display:flex;align-items:center;flex-flow:nowrap;margin-top:24px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item:first-of-type{margin-top:0}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon-wrapper{display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon{display:flex;height:32px;width:32px;border-radius:50%}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon svg{margin:auto;display:block}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.light{background:#eef0f3}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-icon.dark{background:#1e2025}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy{display:block;font-weight:400;font-size:14px;line-height:20px;padding-left:12px}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.light{color:#5b636e}.-cbwsdk-css-reset .-cbwsdk-try-extension-list-item-copy.dark{color:#8a919e}");
    },
    54567: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.TryExtensionContent = void 0);
      const i = n(r(20061)),
        s = r(26803),
        o = r(81599),
        a = r(70264),
        l = r(49348),
        c = r(11089),
        u = n(r(32365));
      t.TryExtensionContent = function (e) {
        let { theme: t } = e;
        const [r, n] = (0, o.useState)(!1),
          h = (0, o.useCallback)(() => {
            window.open(
              "https://api.wallet.coinbase.com/rpc/v2/desktop/chrome",
              "_blank"
            );
          }, []),
          d = (0, o.useCallback)(() => {
            r ? window.location.reload() : (h(), n(!0));
          }, [h, r]);
        return (0, s.h)(
          "div",
          { class: (0, i.default)("-cbwsdk-try-extension", t) },
          (0, s.h)("style", null, u.default),
          (0, s.h)(
            "div",
            { class: "-cbwsdk-try-extension-column-half" },
            (0, s.h)(
              "h3",
              { class: (0, i.default)("-cbwsdk-try-extension-heading", t) },
              "Or try the Coinbase Wallet browser extension"
            ),
            (0, s.h)(
              "div",
              { class: "-cbwsdk-try-extension-cta-wrapper" },
              (0, s.h)(
                "button",
                {
                  class: (0, i.default)("-cbwsdk-try-extension-cta", t),
                  onClick: d,
                },
                r ? "Refresh" : "Install"
              ),
              (0, s.h)(
                "div",
                null,
                !r &&
                  (0, s.h)(a.ArrowLeftIcon, {
                    class: "-cbwsdk-try-extension-cta-icon",
                    fill: "light" === t ? "#0052FF" : "#588AF5",
                  })
              )
            )
          ),
          (0, s.h)(
            "div",
            { class: "-cbwsdk-try-extension-column-half" },
            (0, s.h)(
              "ul",
              { class: "-cbwsdk-try-extension-list" },
              (0, s.h)(
                "li",
                { class: "-cbwsdk-try-extension-list-item" },
                (0, s.h)(
                  "div",
                  { class: "-cbwsdk-try-extension-list-item-icon-wrapper" },
                  (0, s.h)(
                    "span",
                    {
                      class: (0, i.default)(
                        "-cbwsdk-try-extension-list-item-icon",
                        t
                      ),
                    },
                    (0, s.h)(l.LaptopIcon, {
                      fill: "light" === t ? "#0A0B0D" : "#FFFFFF",
                    })
                  )
                ),
                (0, s.h)(
                  "div",
                  {
                    class: (0, i.default)(
                      "-cbwsdk-try-extension-list-item-copy",
                      t
                    ),
                  },
                  "Connect with dapps with just one click on your desktop browser"
                )
              ),
              (0, s.h)(
                "li",
                { class: "-cbwsdk-try-extension-list-item" },
                (0, s.h)(
                  "div",
                  { class: "-cbwsdk-try-extension-list-item-icon-wrapper" },
                  (0, s.h)(
                    "span",
                    {
                      class: (0, i.default)(
                        "-cbwsdk-try-extension-list-item-icon",
                        t
                      ),
                    },
                    (0, s.h)(c.SafeIcon, {
                      fill: "light" === t ? "#0A0B0D" : "#FFFFFF",
                    })
                  )
                ),
                (0, s.h)(
                  "div",
                  {
                    class: (0, i.default)(
                      "-cbwsdk-try-extension-list-item-copy",
                      t
                    ),
                  },
                  "Add an additional layer of security by using a supported Ledger hardware wallet"
                )
              )
            )
          )
        );
      };
    },
    70264: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ArrowLeftIcon = void 0);
      const n = r(26803);
      t.ArrowLeftIcon = function (e) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              xmlns: "http://www.w3.org/2000/svg",
            },
            e
          ),
          (0, n.h)("path", {
            d: "M8.60675 0.155884L7.37816 1.28209L12.7723 7.16662H0V8.83328H12.6548L6.82149 14.6666L8 15.8451L15.8201 8.02501L8.60675 0.155884Z",
          })
        );
      };
    },
    42152: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CloseIcon = void 0);
      const n = r(26803);
      t.CloseIcon = function (e) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "40",
              height: "40",
              viewBox: "0 0 40 40",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            e
          ),
          (0, n.h)("path", {
            d: "M13.7677 13L12.3535 14.4142L18.3535 20.4142L12.3535 26.4142L13.7677 27.8284L19.7677 21.8284L25.7677 27.8284L27.1819 26.4142L21.1819 20.4142L27.1819 14.4142L25.7677 13L19.7677 19L13.7677 13Z",
          })
        );
      };
    },
    73974: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CoinbaseWalletRound = void 0);
      const n = r(26803);
      t.CoinbaseWalletRound = function (e) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "28",
              height: "28",
              viewBox: "0 0 28 28",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            e
          ),
          (0, n.h)("circle", { cx: "14", cy: "14", r: "14", fill: "#0052FF" }),
          (0, n.h)("path", {
            d: "M23.8521 14.0003C23.8521 19.455 19.455 23.8521 14.0003 23.8521C8.54559 23.8521 4.14844 19.455 4.14844 14.0003C4.14844 8.54559 8.54559 4.14844 14.0003 4.14844C19.455 4.14844 23.8521 8.54559 23.8521 14.0003Z",
            fill: "white",
          }),
          (0, n.h)("path", {
            d: "M11.1855 12.5042C11.1855 12.0477 11.1855 11.7942 11.2835 11.642C11.3814 11.4899 11.4793 11.3377 11.6261 11.287C11.8219 11.1855 12.0178 11.1855 12.5073 11.1855H15.4934C15.983 11.1855 16.1788 11.1855 16.3746 11.287C16.5215 11.3884 16.6683 11.4899 16.7173 11.642C16.8152 11.8449 16.8152 12.0477 16.8152 12.5042V15.4965C16.8152 15.953 16.8152 16.2066 16.7173 16.3587C16.6194 16.5109 16.5215 16.663 16.3746 16.7137C16.1788 16.8152 15.983 16.8152 15.4934 16.8152H12.5073C12.0178 16.8152 11.8219 16.8152 11.6261 16.7137C11.4793 16.6123 11.3324 16.5109 11.2835 16.3587C11.1855 16.1558 11.1855 15.953 11.1855 15.4965V12.5042Z",
            fill: "#0052FF",
          })
        );
      };
    },
    49348: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LaptopIcon = void 0);
      const n = r(26803);
      t.LaptopIcon = function (e) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "14",
              height: "14",
              viewBox: "0 0 14 14",
              xmlns: "http://www.w3.org/2000/svg",
            },
            e
          ),
          (0, n.h)("path", {
            d: "M1.8001 2.2002H12.2001V9.40019H1.8001V2.2002ZM3.4001 3.8002V7.80019H10.6001V3.8002H3.4001Z",
          }),
          (0, n.h)("path", {
            d: "M13.4001 10.2002H0.600098C0.600098 11.0838 1.31644 11.8002 2.2001 11.8002H11.8001C12.6838 11.8002 13.4001 11.0838 13.4001 10.2002Z",
          })
        );
      };
    },
    17541: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.QRCodeIcon = void 0);
      const n = r(26803);
      t.QRCodeIcon = function (e) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "18",
              height: "18",
              viewBox: "0 0 24 24",
              xmlns: "http://www.w3.org/2000/svg",
            },
            e
          ),
          (0, n.h)("path", { d: "M3 3V8.99939L5 8.99996V5H9V3H3Z" }),
          (0, n.h)("path", { d: "M15 21L21 21V15.0006L19 15V19L15 19V21Z" }),
          (0, n.h)("path", { d: "M21 9H19V5H15.0006L15 3H21V9Z" }),
          (0, n.h)("path", { d: "M3 15V21H8.99939L8.99996 19H5L5 15H3Z" })
        );
      };
    },
    11089: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.SafeIcon = void 0);
      const n = r(26803);
      t.SafeIcon = function (e) {
        return (0, n.h)(
          "svg",
          Object.assign(
            {
              width: "14",
              height: "14",
              viewBox: "0 0 14 14",
              xmlns: "http://www.w3.org/2000/svg",
            },
            e
          ),
          (0, n.h)("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: "M0.600098 0.600098V11.8001H13.4001V0.600098H0.600098ZM7.0001 9.2001C5.3441 9.2001 4.0001 7.8561 4.0001 6.2001C4.0001 4.5441 5.3441 3.2001 7.0001 3.2001C8.6561 3.2001 10.0001 4.5441 10.0001 6.2001C10.0001 7.8561 8.6561 9.2001 7.0001 9.2001ZM0.600098 12.6001H3.8001V13.4001H0.600098V12.6001ZM10.2001 12.6001H13.4001V13.4001H10.2001V12.6001ZM8.8001 6.2001C8.8001 7.19421 7.99421 8.0001 7.0001 8.0001C6.00598 8.0001 5.2001 7.19421 5.2001 6.2001C5.2001 5.20598 6.00598 4.4001 7.0001 4.4001C7.99421 4.4001 8.8001 5.20598 8.8001 6.2001Z",
          })
        );
      };
    },
    74379: (e, t, r) => {
      const n = r(13077),
        i = r(6373);
      function s(e) {
        return e.startsWith("int[")
          ? "int256" + e.slice(3)
          : "int" === e
          ? "int256"
          : e.startsWith("uint[")
          ? "uint256" + e.slice(4)
          : "uint" === e
          ? "uint256"
          : e.startsWith("fixed[")
          ? "fixed128x128" + e.slice(5)
          : "fixed" === e
          ? "fixed128x128"
          : e.startsWith("ufixed[")
          ? "ufixed128x128" + e.slice(6)
          : "ufixed" === e
          ? "ufixed128x128"
          : e;
      }
      function o(e) {
        return parseInt(/^\D+(\d+)$/.exec(e)[1], 10);
      }
      function a(e) {
        var t = /^\D+(\d+)x(\d+)$/.exec(e);
        return [parseInt(t[1], 10), parseInt(t[2], 10)];
      }
      function l(e) {
        var t = e.match(/(.*)\[(.*?)\]$/);
        return t ? ("" === t[2] ? "dynamic" : parseInt(t[2], 10)) : null;
      }
      function c(e) {
        var t = typeof e;
        if ("string" === t)
          return n.isHexString(e)
            ? new i(n.stripHexPrefix(e), 16)
            : new i(e, 10);
        if ("number" === t) return new i(e);
        if (e.toArray) return e;
        throw new Error("Argument is not a number");
      }
      function u(e, t) {
        var r, s, h, d;
        if ("address" === e) return u("uint160", c(t));
        if ("bool" === e) return u("uint8", t ? 1 : 0);
        if ("string" === e) return u("bytes", new Buffer(t, "utf8"));
        if (
          (function (e) {
            return e.lastIndexOf("]") === e.length - 1;
          })(e)
        ) {
          if ("undefined" === typeof t.length) throw new Error("Not an array?");
          if ("dynamic" !== (r = l(e)) && 0 !== r && t.length > r)
            throw new Error("Elements exceed array size: " + r);
          for (d in ((h = []),
          (e = e.slice(0, e.lastIndexOf("["))),
          "string" === typeof t && (t = JSON.parse(t)),
          t))
            h.push(u(e, t[d]));
          if ("dynamic" === r) {
            var f = u("uint256", t.length);
            h.unshift(f);
          }
          return Buffer.concat(h);
        }
        if ("bytes" === e)
          return (
            (t = new Buffer(t)),
            (h = Buffer.concat([u("uint256", t.length), t])),
            t.length % 32 !== 0 &&
              (h = Buffer.concat([h, n.zeros(32 - (t.length % 32))])),
            h
          );
        if (e.startsWith("bytes")) {
          if ((r = o(e)) < 1 || r > 32)
            throw new Error("Invalid bytes<N> width: " + r);
          return n.setLengthRight(t, 32);
        }
        if (e.startsWith("uint")) {
          if ((r = o(e)) % 8 || r < 8 || r > 256)
            throw new Error("Invalid uint<N> width: " + r);
          if ((s = c(t)).bitLength() > r)
            throw new Error(
              "Supplied uint exceeds width: " + r + " vs " + s.bitLength()
            );
          if (s < 0) throw new Error("Supplied uint is negative");
          return s.toArrayLike(Buffer, "be", 32);
        }
        if (e.startsWith("int")) {
          if ((r = o(e)) % 8 || r < 8 || r > 256)
            throw new Error("Invalid int<N> width: " + r);
          if ((s = c(t)).bitLength() > r)
            throw new Error(
              "Supplied int exceeds width: " + r + " vs " + s.bitLength()
            );
          return s.toTwos(256).toArrayLike(Buffer, "be", 32);
        }
        if (e.startsWith("ufixed")) {
          if (((r = a(e)), (s = c(t)) < 0))
            throw new Error("Supplied ufixed is negative");
          return u("uint256", s.mul(new i(2).pow(new i(r[1]))));
        }
        if (e.startsWith("fixed"))
          return (r = a(e)), u("int256", c(t).mul(new i(2).pow(new i(r[1]))));
        throw new Error("Unsupported or invalid type: " + e);
      }
      function h(e) {
        return "string" === e || "bytes" === e || "dynamic" === l(e);
      }
      function d(e, t) {
        if (e.length !== t.length)
          throw new Error("Number of types are not matching the values");
        for (var r, i, a = [], l = 0; l < e.length; l++) {
          var u = s(e[l]),
            h = t[l];
          if ("bytes" === u) a.push(h);
          else if ("string" === u) a.push(new Buffer(h, "utf8"));
          else if ("bool" === u) a.push(new Buffer(h ? "01" : "00", "hex"));
          else if ("address" === u) a.push(n.setLength(h, 20));
          else if (u.startsWith("bytes")) {
            if ((r = o(u)) < 1 || r > 32)
              throw new Error("Invalid bytes<N> width: " + r);
            a.push(n.setLengthRight(h, r));
          } else if (u.startsWith("uint")) {
            if ((r = o(u)) % 8 || r < 8 || r > 256)
              throw new Error("Invalid uint<N> width: " + r);
            if ((i = c(h)).bitLength() > r)
              throw new Error(
                "Supplied uint exceeds width: " + r + " vs " + i.bitLength()
              );
            a.push(i.toArrayLike(Buffer, "be", r / 8));
          } else {
            if (!u.startsWith("int"))
              throw new Error("Unsupported or invalid type: " + u);
            if ((r = o(u)) % 8 || r < 8 || r > 256)
              throw new Error("Invalid int<N> width: " + r);
            if ((i = c(h)).bitLength() > r)
              throw new Error(
                "Supplied int exceeds width: " + r + " vs " + i.bitLength()
              );
            a.push(i.toTwos(r).toArrayLike(Buffer, "be", r / 8));
          }
        }
        return Buffer.concat(a);
      }
      e.exports = {
        rawEncode: function (e, t) {
          var r = [],
            n = [],
            i = 32 * e.length;
          for (var o in e) {
            var a = s(e[o]),
              l = u(a, t[o]);
            h(a)
              ? (r.push(u("uint256", i)), n.push(l), (i += l.length))
              : r.push(l);
          }
          return Buffer.concat(r.concat(n));
        },
        solidityPack: d,
        soliditySHA3: function (e, t) {
          return n.keccak(d(e, t));
        },
      };
    },
    2213: (e, t, r) => {
      const n = r(13077),
        i = r(74379),
        s = {
          type: "object",
          properties: {
            types: {
              type: "object",
              additionalProperties: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    type: { type: "string" },
                  },
                  required: ["name", "type"],
                },
              },
            },
            primaryType: { type: "string" },
            domain: { type: "object" },
            message: { type: "object" },
          },
          required: ["types", "primaryType", "domain", "message"],
        },
        o = {
          encodeData(e, t, r) {
            let s =
              !(arguments.length > 3 && void 0 !== arguments[3]) ||
              arguments[3];
            const o = ["bytes32"],
              a = [this.hashType(e, r)];
            if (s) {
              const l = (e, t, o) => {
                if (void 0 !== r[t])
                  return [
                    "bytes32",
                    null == o
                      ? "0x0000000000000000000000000000000000000000000000000000000000000000"
                      : n.keccak(this.encodeData(t, o, r, s)),
                  ];
                if (void 0 === o)
                  throw new Error(`missing value for field ${e} of type ${t}`);
                if ("bytes" === t) return ["bytes32", n.keccak(o)];
                if ("string" === t)
                  return (
                    "string" === typeof o && (o = Buffer.from(o, "utf8")),
                    ["bytes32", n.keccak(o)]
                  );
                if (t.lastIndexOf("]") === t.length - 1) {
                  const r = t.slice(0, t.lastIndexOf("[")),
                    s = o.map((t) => l(e, r, t));
                  return [
                    "bytes32",
                    n.keccak(
                      i.rawEncode(
                        s.map((e) => {
                          let [t] = e;
                          return t;
                        }),
                        s.map((e) => {
                          let [, t] = e;
                          return t;
                        })
                      )
                    ),
                  ];
                }
                return [t, o];
              };
              for (const n of r[e]) {
                const [e, r] = l(n.name, n.type, t[n.name]);
                o.push(e), a.push(r);
              }
            } else
              for (const i of r[e]) {
                let e = t[i.name];
                if (void 0 !== e)
                  if ("bytes" === i.type)
                    o.push("bytes32"), (e = n.keccak(e)), a.push(e);
                  else if ("string" === i.type)
                    o.push("bytes32"),
                      "string" === typeof e && (e = Buffer.from(e, "utf8")),
                      (e = n.keccak(e)),
                      a.push(e);
                  else if (void 0 !== r[i.type])
                    o.push("bytes32"),
                      (e = n.keccak(this.encodeData(i.type, e, r, s))),
                      a.push(e);
                  else {
                    if (i.type.lastIndexOf("]") === i.type.length - 1)
                      throw new Error(
                        "Arrays currently unimplemented in encodeData"
                      );
                    o.push(i.type), a.push(e);
                  }
              }
            return i.rawEncode(o, a);
          },
          encodeType(e, t) {
            let r = "",
              n = this.findTypeDependencies(e, t).filter((t) => t !== e);
            n = [e].concat(n.sort());
            for (const i of n) {
              if (!t[i]) throw new Error("No type definition specified: " + i);
              r +=
                i +
                "(" +
                t[i]
                  .map((e) => {
                    let { name: t, type: r } = e;
                    return r + " " + t;
                  })
                  .join(",") +
                ")";
            }
            return r;
          },
          findTypeDependencies(e, t) {
            let r =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : [];
            if (((e = e.match(/^\w*/)[0]), r.includes(e) || void 0 === t[e]))
              return r;
            r.push(e);
            for (const n of t[e])
              for (const e of this.findTypeDependencies(n.type, t, r))
                !r.includes(e) && r.push(e);
            return r;
          },
          hashStruct(e, t, r) {
            let i =
              !(arguments.length > 3 && void 0 !== arguments[3]) ||
              arguments[3];
            return n.keccak(this.encodeData(e, t, r, i));
          },
          hashType(e, t) {
            return n.keccak(this.encodeType(e, t));
          },
          sanitizeData(e) {
            const t = {};
            for (const r in s.properties) e[r] && (t[r] = e[r]);
            return (
              t.types &&
                (t.types = Object.assign({ EIP712Domain: [] }, t.types)),
              t
            );
          },
          hash(e) {
            let t =
              !(arguments.length > 1 && void 0 !== arguments[1]) ||
              arguments[1];
            const r = this.sanitizeData(e),
              i = [Buffer.from("1901", "hex")];
            return (
              i.push(this.hashStruct("EIP712Domain", r.domain, r.types, t)),
              "EIP712Domain" !== r.primaryType &&
                i.push(this.hashStruct(r.primaryType, r.message, r.types, t)),
              n.keccak(Buffer.concat(i))
            );
          },
        };
      e.exports = {
        TYPED_MESSAGE_SCHEMA: s,
        TypedDataUtils: o,
        hashForSignTypedDataLegacy: function (e) {
          return (function (e) {
            const t = new Error("Expect argument to be non-empty array");
            if ("object" !== typeof e || !e.length) throw t;
            const r = e.map(function (e) {
                return "bytes" === e.type ? n.toBuffer(e.value) : e.value;
              }),
              s = e.map(function (e) {
                return e.type;
              }),
              o = e.map(function (e) {
                if (!e.name) throw t;
                return e.type + " " + e.name;
              });
            return i.soliditySHA3(
              ["bytes32", "bytes32"],
              [
                i.soliditySHA3(new Array(e.length).fill("string"), o),
                i.soliditySHA3(s, r),
              ]
            );
          })(e.data);
        },
        hashForSignTypedData_v3: function (e) {
          return o.hash(e.data, !1);
        },
        hashForSignTypedData_v4: function (e) {
          return o.hash(e.data);
        },
      };
    },
    13077: (e, t, r) => {
      const n = r(85831),
        i = r(6373);
      function s(e) {
        return Buffer.allocUnsafe(e).fill(0);
      }
      function o(e, t, r) {
        const n = s(t);
        return (
          (e = a(e)),
          r
            ? e.length < t
              ? (e.copy(n), n)
              : e.slice(0, t)
            : e.length < t
            ? (e.copy(n, t - e.length), n)
            : e.slice(-t)
        );
      }
      function a(e) {
        if (!Buffer.isBuffer(e))
          if (Array.isArray(e)) e = Buffer.from(e);
          else if ("string" === typeof e)
            e = l(e)
              ? Buffer.from((t = c(e)).length % 2 ? "0" + t : t, "hex")
              : Buffer.from(e);
          else if ("number" === typeof e) e = intToBuffer(e);
          else if (null === e || void 0 === e) e = Buffer.allocUnsafe(0);
          else if (i.isBN(e)) e = e.toArrayLike(Buffer);
          else {
            if (!e.toArray) throw new Error("invalid type");
            e = Buffer.from(e.toArray());
          }
        var t;
        return e;
      }
      function l(e) {
        return "string" === typeof e && e.match(/^0x[0-9A-Fa-f]*$/);
      }
      function c(e) {
        return "string" === typeof e && e.startsWith("0x") ? e.slice(2) : e;
      }
      e.exports = {
        zeros: s,
        setLength: o,
        setLengthRight: function (e, t) {
          return o(e, t, !0);
        },
        isHexString: l,
        stripHexPrefix: c,
        toBuffer: a,
        bufferToHex: function (e) {
          return "0x" + (e = a(e)).toString("hex");
        },
        keccak: function (e, t) {
          return (
            (e = a(e)),
            t || (t = 256),
            n("keccak" + t)
              .update(e)
              .digest()
          );
        },
      };
    },
    76577: (e) => {
      function t(e) {
        (this.mode = n.MODE_8BIT_BYTE), (this.data = e), (this.parsedData = []);
        for (var t = 0, r = this.data.length; t < r; t++) {
          var i = [],
            s = this.data.charCodeAt(t);
          s > 65536
            ? ((i[0] = 240 | ((1835008 & s) >>> 18)),
              (i[1] = 128 | ((258048 & s) >>> 12)),
              (i[2] = 128 | ((4032 & s) >>> 6)),
              (i[3] = 128 | (63 & s)))
            : s > 2048
            ? ((i[0] = 224 | ((61440 & s) >>> 12)),
              (i[1] = 128 | ((4032 & s) >>> 6)),
              (i[2] = 128 | (63 & s)))
            : s > 128
            ? ((i[0] = 192 | ((1984 & s) >>> 6)), (i[1] = 128 | (63 & s)))
            : (i[0] = s),
            this.parsedData.push(i);
        }
        (this.parsedData = Array.prototype.concat.apply([], this.parsedData)),
          this.parsedData.length != this.data.length &&
            (this.parsedData.unshift(191),
            this.parsedData.unshift(187),
            this.parsedData.unshift(239));
      }
      function r(e, t) {
        (this.typeNumber = e),
          (this.errorCorrectLevel = t),
          (this.modules = null),
          (this.moduleCount = 0),
          (this.dataCache = null),
          (this.dataList = []);
      }
      (t.prototype = {
        getLength: function (e) {
          return this.parsedData.length;
        },
        write: function (e) {
          for (var t = 0, r = this.parsedData.length; t < r; t++)
            e.put(this.parsedData[t], 8);
        },
      }),
        (r.prototype = {
          addData: function (e) {
            var r = new t(e);
            this.dataList.push(r), (this.dataCache = null);
          },
          isDark: function (e, t) {
            if (
              e < 0 ||
              this.moduleCount <= e ||
              t < 0 ||
              this.moduleCount <= t
            )
              throw new Error(e + "," + t);
            return this.modules[e][t];
          },
          getModuleCount: function () {
            return this.moduleCount;
          },
          make: function () {
            this.makeImpl(!1, this.getBestMaskPattern());
          },
          makeImpl: function (e, t) {
            (this.moduleCount = 4 * this.typeNumber + 17),
              (this.modules = new Array(this.moduleCount));
            for (var n = 0; n < this.moduleCount; n++) {
              this.modules[n] = new Array(this.moduleCount);
              for (var i = 0; i < this.moduleCount; i++)
                this.modules[n][i] = null;
            }
            this.setupPositionProbePattern(0, 0),
              this.setupPositionProbePattern(this.moduleCount - 7, 0),
              this.setupPositionProbePattern(0, this.moduleCount - 7),
              this.setupPositionAdjustPattern(),
              this.setupTimingPattern(),
              this.setupTypeInfo(e, t),
              this.typeNumber >= 7 && this.setupTypeNumber(e),
              null == this.dataCache &&
                (this.dataCache = r.createData(
                  this.typeNumber,
                  this.errorCorrectLevel,
                  this.dataList
                )),
              this.mapData(this.dataCache, t);
          },
          setupPositionProbePattern: function (e, t) {
            for (var r = -1; r <= 7; r++)
              if (!(e + r <= -1 || this.moduleCount <= e + r))
                for (var n = -1; n <= 7; n++)
                  t + n <= -1 ||
                    this.moduleCount <= t + n ||
                    (this.modules[e + r][t + n] =
                      (0 <= r && r <= 6 && (0 == n || 6 == n)) ||
                      (0 <= n && n <= 6 && (0 == r || 6 == r)) ||
                      (2 <= r && r <= 4 && 2 <= n && n <= 4));
          },
          getBestMaskPattern: function () {
            for (var e = 0, t = 0, r = 0; r < 8; r++) {
              this.makeImpl(!0, r);
              var n = m.getLostPoint(this);
              (0 == r || e > n) && ((e = n), (t = r));
            }
            return t;
          },
          createMovieClip: function (e, t, r) {
            var n = e.createEmptyMovieClip(t, r);
            this.make();
            for (var i = 0; i < this.modules.length; i++)
              for (var s = 1 * i, o = 0; o < this.modules[i].length; o++) {
                var a = 1 * o;
                this.modules[i][o] &&
                  (n.beginFill(0, 100),
                  n.moveTo(a, s),
                  n.lineTo(a + 1, s),
                  n.lineTo(a + 1, s + 1),
                  n.lineTo(a, s + 1),
                  n.endFill());
              }
            return n;
          },
          setupTimingPattern: function () {
            for (var e = 8; e < this.moduleCount - 8; e++)
              null == this.modules[e][6] && (this.modules[e][6] = e % 2 == 0);
            for (var t = 8; t < this.moduleCount - 8; t++)
              null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0);
          },
          setupPositionAdjustPattern: function () {
            for (
              var e = m.getPatternPosition(this.typeNumber), t = 0;
              t < e.length;
              t++
            )
              for (var r = 0; r < e.length; r++) {
                var n = e[t],
                  i = e[r];
                if (null == this.modules[n][i])
                  for (var s = -2; s <= 2; s++)
                    for (var o = -2; o <= 2; o++)
                      this.modules[n + s][i + o] =
                        -2 == s ||
                        2 == s ||
                        -2 == o ||
                        2 == o ||
                        (0 == s && 0 == o);
              }
          },
          setupTypeNumber: function (e) {
            for (
              var t = m.getBCHTypeNumber(this.typeNumber), r = 0;
              r < 18;
              r++
            ) {
              var n = !e && 1 == ((t >> r) & 1);
              this.modules[Math.floor(r / 3)][
                (r % 3) + this.moduleCount - 8 - 3
              ] = n;
            }
            for (r = 0; r < 18; r++) {
              n = !e && 1 == ((t >> r) & 1);
              this.modules[(r % 3) + this.moduleCount - 8 - 3][
                Math.floor(r / 3)
              ] = n;
            }
          },
          setupTypeInfo: function (e, t) {
            for (
              var r = (this.errorCorrectLevel << 3) | t,
                n = m.getBCHTypeInfo(r),
                i = 0;
              i < 15;
              i++
            ) {
              var s = !e && 1 == ((n >> i) & 1);
              i < 6
                ? (this.modules[i][8] = s)
                : i < 8
                ? (this.modules[i + 1][8] = s)
                : (this.modules[this.moduleCount - 15 + i][8] = s);
            }
            for (i = 0; i < 15; i++) {
              s = !e && 1 == ((n >> i) & 1);
              i < 8
                ? (this.modules[8][this.moduleCount - i - 1] = s)
                : i < 9
                ? (this.modules[8][15 - i - 1 + 1] = s)
                : (this.modules[8][15 - i - 1] = s);
            }
            this.modules[this.moduleCount - 8][8] = !e;
          },
          mapData: function (e, t) {
            for (
              var r = -1,
                n = this.moduleCount - 1,
                i = 7,
                s = 0,
                o = this.moduleCount - 1;
              o > 0;
              o -= 2
            )
              for (6 == o && o--; ; ) {
                for (var a = 0; a < 2; a++)
                  if (null == this.modules[n][o - a]) {
                    var l = !1;
                    s < e.length && (l = 1 == ((e[s] >>> i) & 1)),
                      m.getMask(t, n, o - a) && (l = !l),
                      (this.modules[n][o - a] = l),
                      -1 == --i && (s++, (i = 7));
                  }
                if ((n += r) < 0 || this.moduleCount <= n) {
                  (n -= r), (r = -r);
                  break;
                }
              }
          },
        }),
        (r.PAD0 = 236),
        (r.PAD1 = 17),
        (r.createData = function (e, t, n) {
          for (
            var i = b.getRSBlocks(e, t), s = new w(), o = 0;
            o < n.length;
            o++
          ) {
            var a = n[o];
            s.put(a.mode, 4),
              s.put(a.getLength(), m.getLengthInBits(a.mode, e)),
              a.write(s);
          }
          var l = 0;
          for (o = 0; o < i.length; o++) l += i[o].dataCount;
          if (s.getLengthInBits() > 8 * l)
            throw new Error(
              "code length overflow. (" +
                s.getLengthInBits() +
                ">" +
                8 * l +
                ")"
            );
          for (
            s.getLengthInBits() + 4 <= 8 * l && s.put(0, 4);
            s.getLengthInBits() % 8 != 0;

          )
            s.putBit(!1);
          for (
            ;
            !(s.getLengthInBits() >= 8 * l) &&
            (s.put(r.PAD0, 8), !(s.getLengthInBits() >= 8 * l));

          )
            s.put(r.PAD1, 8);
          return r.createBytes(s, i);
        }),
        (r.createBytes = function (e, t) {
          for (
            var r = 0,
              n = 0,
              i = 0,
              s = new Array(t.length),
              o = new Array(t.length),
              a = 0;
            a < t.length;
            a++
          ) {
            var l = t[a].dataCount,
              c = t[a].totalCount - l;
            (n = Math.max(n, l)), (i = Math.max(i, c)), (s[a] = new Array(l));
            for (var u = 0; u < s[a].length; u++)
              s[a][u] = 255 & e.buffer[u + r];
            r += l;
            var h = m.getErrorCorrectPolynomial(c),
              d = new y(s[a], h.getLength() - 1).mod(h);
            o[a] = new Array(h.getLength() - 1);
            for (u = 0; u < o[a].length; u++) {
              var f = u + d.getLength() - o[a].length;
              o[a][u] = f >= 0 ? d.get(f) : 0;
            }
          }
          var p = 0;
          for (u = 0; u < t.length; u++) p += t[u].totalCount;
          var g = new Array(p),
            _ = 0;
          for (u = 0; u < n; u++)
            for (a = 0; a < t.length; a++)
              u < s[a].length && (g[_++] = s[a][u]);
          for (u = 0; u < i; u++)
            for (a = 0; a < t.length; a++)
              u < o[a].length && (g[_++] = o[a][u]);
          return g;
        });
      for (
        var n = {
            MODE_NUMBER: 1,
            MODE_ALPHA_NUM: 2,
            MODE_8BIT_BYTE: 4,
            MODE_KANJI: 8,
          },
          i = 1,
          s = 0,
          o = 3,
          a = 2,
          l = 0,
          c = 1,
          u = 2,
          h = 3,
          d = 4,
          f = 5,
          p = 6,
          g = 7,
          m = {
            PATTERN_POSITION_TABLE: [
              [],
              [6, 18],
              [6, 22],
              [6, 26],
              [6, 30],
              [6, 34],
              [6, 22, 38],
              [6, 24, 42],
              [6, 26, 46],
              [6, 28, 50],
              [6, 30, 54],
              [6, 32, 58],
              [6, 34, 62],
              [6, 26, 46, 66],
              [6, 26, 48, 70],
              [6, 26, 50, 74],
              [6, 30, 54, 78],
              [6, 30, 56, 82],
              [6, 30, 58, 86],
              [6, 34, 62, 90],
              [6, 28, 50, 72, 94],
              [6, 26, 50, 74, 98],
              [6, 30, 54, 78, 102],
              [6, 28, 54, 80, 106],
              [6, 32, 58, 84, 110],
              [6, 30, 58, 86, 114],
              [6, 34, 62, 90, 118],
              [6, 26, 50, 74, 98, 122],
              [6, 30, 54, 78, 102, 126],
              [6, 26, 52, 78, 104, 130],
              [6, 30, 56, 82, 108, 134],
              [6, 34, 60, 86, 112, 138],
              [6, 30, 58, 86, 114, 142],
              [6, 34, 62, 90, 118, 146],
              [6, 30, 54, 78, 102, 126, 150],
              [6, 24, 50, 76, 102, 128, 154],
              [6, 28, 54, 80, 106, 132, 158],
              [6, 32, 58, 84, 110, 136, 162],
              [6, 26, 54, 82, 110, 138, 166],
              [6, 30, 58, 86, 114, 142, 170],
            ],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function (e) {
              for (
                var t = e << 10;
                m.getBCHDigit(t) - m.getBCHDigit(m.G15) >= 0;

              )
                t ^= m.G15 << (m.getBCHDigit(t) - m.getBCHDigit(m.G15));
              return ((e << 10) | t) ^ m.G15_MASK;
            },
            getBCHTypeNumber: function (e) {
              for (
                var t = e << 12;
                m.getBCHDigit(t) - m.getBCHDigit(m.G18) >= 0;

              )
                t ^= m.G18 << (m.getBCHDigit(t) - m.getBCHDigit(m.G18));
              return (e << 12) | t;
            },
            getBCHDigit: function (e) {
              for (var t = 0; 0 != e; ) t++, (e >>>= 1);
              return t;
            },
            getPatternPosition: function (e) {
              return m.PATTERN_POSITION_TABLE[e - 1];
            },
            getMask: function (e, t, r) {
              switch (e) {
                case l:
                  return (t + r) % 2 == 0;
                case c:
                  return t % 2 == 0;
                case u:
                  return r % 3 == 0;
                case h:
                  return (t + r) % 3 == 0;
                case d:
                  return (Math.floor(t / 2) + Math.floor(r / 3)) % 2 == 0;
                case f:
                  return ((t * r) % 2) + ((t * r) % 3) == 0;
                case p:
                  return (((t * r) % 2) + ((t * r) % 3)) % 2 == 0;
                case g:
                  return (((t * r) % 3) + ((t + r) % 2)) % 2 == 0;
                default:
                  throw new Error("bad maskPattern:" + e);
              }
            },
            getErrorCorrectPolynomial: function (e) {
              for (var t = new y([1], 0), r = 0; r < e; r++)
                t = t.multiply(new y([1, _.gexp(r)], 0));
              return t;
            },
            getLengthInBits: function (e, t) {
              if (1 <= t && t < 10)
                switch (e) {
                  case n.MODE_NUMBER:
                    return 10;
                  case n.MODE_ALPHA_NUM:
                    return 9;
                  case n.MODE_8BIT_BYTE:
                  case n.MODE_KANJI:
                    return 8;
                  default:
                    throw new Error("mode:" + e);
                }
              else if (t < 27)
                switch (e) {
                  case n.MODE_NUMBER:
                    return 12;
                  case n.MODE_ALPHA_NUM:
                    return 11;
                  case n.MODE_8BIT_BYTE:
                    return 16;
                  case n.MODE_KANJI:
                    return 10;
                  default:
                    throw new Error("mode:" + e);
                }
              else {
                if (!(t < 41)) throw new Error("type:" + t);
                switch (e) {
                  case n.MODE_NUMBER:
                    return 14;
                  case n.MODE_ALPHA_NUM:
                    return 13;
                  case n.MODE_8BIT_BYTE:
                    return 16;
                  case n.MODE_KANJI:
                    return 12;
                  default:
                    throw new Error("mode:" + e);
                }
              }
            },
            getLostPoint: function (e) {
              for (var t = e.getModuleCount(), r = 0, n = 0; n < t; n++)
                for (var i = 0; i < t; i++) {
                  for (var s = 0, o = e.isDark(n, i), a = -1; a <= 1; a++)
                    if (!(n + a < 0 || t <= n + a))
                      for (var l = -1; l <= 1; l++)
                        i + l < 0 ||
                          t <= i + l ||
                          (0 == a && 0 == l) ||
                          (o == e.isDark(n + a, i + l) && s++);
                  s > 5 && (r += 3 + s - 5);
                }
              for (n = 0; n < t - 1; n++)
                for (i = 0; i < t - 1; i++) {
                  var c = 0;
                  e.isDark(n, i) && c++,
                    e.isDark(n + 1, i) && c++,
                    e.isDark(n, i + 1) && c++,
                    e.isDark(n + 1, i + 1) && c++,
                    (0 != c && 4 != c) || (r += 3);
                }
              for (n = 0; n < t; n++)
                for (i = 0; i < t - 6; i++)
                  e.isDark(n, i) &&
                    !e.isDark(n, i + 1) &&
                    e.isDark(n, i + 2) &&
                    e.isDark(n, i + 3) &&
                    e.isDark(n, i + 4) &&
                    !e.isDark(n, i + 5) &&
                    e.isDark(n, i + 6) &&
                    (r += 40);
              for (i = 0; i < t; i++)
                for (n = 0; n < t - 6; n++)
                  e.isDark(n, i) &&
                    !e.isDark(n + 1, i) &&
                    e.isDark(n + 2, i) &&
                    e.isDark(n + 3, i) &&
                    e.isDark(n + 4, i) &&
                    !e.isDark(n + 5, i) &&
                    e.isDark(n + 6, i) &&
                    (r += 40);
              var u = 0;
              for (i = 0; i < t; i++)
                for (n = 0; n < t; n++) e.isDark(n, i) && u++;
              return (r += 10 * (Math.abs((100 * u) / t / t - 50) / 5));
            },
          },
          _ = {
            glog: function (e) {
              if (e < 1) throw new Error("glog(" + e + ")");
              return _.LOG_TABLE[e];
            },
            gexp: function (e) {
              for (; e < 0; ) e += 255;
              for (; e >= 256; ) e -= 255;
              return _.EXP_TABLE[e];
            },
            EXP_TABLE: new Array(256),
            LOG_TABLE: new Array(256),
          },
          v = 0;
        v < 8;
        v++
      )
        _.EXP_TABLE[v] = 1 << v;
      for (v = 8; v < 256; v++)
        _.EXP_TABLE[v] =
          _.EXP_TABLE[v - 4] ^
          _.EXP_TABLE[v - 5] ^
          _.EXP_TABLE[v - 6] ^
          _.EXP_TABLE[v - 8];
      for (v = 0; v < 255; v++) _.LOG_TABLE[_.EXP_TABLE[v]] = v;
      function y(e, t) {
        if (void 0 == e.length) throw new Error(e.length + "/" + t);
        for (var r = 0; r < e.length && 0 == e[r]; ) r++;
        this.num = new Array(e.length - r + t);
        for (var n = 0; n < e.length - r; n++) this.num[n] = e[n + r];
      }
      function b(e, t) {
        (this.totalCount = e), (this.dataCount = t);
      }
      function w() {
        (this.buffer = []), (this.length = 0);
      }
      (y.prototype = {
        get: function (e) {
          return this.num[e];
        },
        getLength: function () {
          return this.num.length;
        },
        multiply: function (e) {
          for (
            var t = new Array(this.getLength() + e.getLength() - 1), r = 0;
            r < this.getLength();
            r++
          )
            for (var n = 0; n < e.getLength(); n++)
              t[r + n] ^= _.gexp(_.glog(this.get(r)) + _.glog(e.get(n)));
          return new y(t, 0);
        },
        mod: function (e) {
          if (this.getLength() - e.getLength() < 0) return this;
          for (
            var t = _.glog(this.get(0)) - _.glog(e.get(0)),
              r = new Array(this.getLength()),
              n = 0;
            n < this.getLength();
            n++
          )
            r[n] = this.get(n);
          for (n = 0; n < e.getLength(); n++)
            r[n] ^= _.gexp(_.glog(e.get(n)) + t);
          return new y(r, 0).mod(e);
        },
      }),
        (b.RS_BLOCK_TABLE = [
          [1, 26, 19],
          [1, 26, 16],
          [1, 26, 13],
          [1, 26, 9],
          [1, 44, 34],
          [1, 44, 28],
          [1, 44, 22],
          [1, 44, 16],
          [1, 70, 55],
          [1, 70, 44],
          [2, 35, 17],
          [2, 35, 13],
          [1, 100, 80],
          [2, 50, 32],
          [2, 50, 24],
          [4, 25, 9],
          [1, 134, 108],
          [2, 67, 43],
          [2, 33, 15, 2, 34, 16],
          [2, 33, 11, 2, 34, 12],
          [2, 86, 68],
          [4, 43, 27],
          [4, 43, 19],
          [4, 43, 15],
          [2, 98, 78],
          [4, 49, 31],
          [2, 32, 14, 4, 33, 15],
          [4, 39, 13, 1, 40, 14],
          [2, 121, 97],
          [2, 60, 38, 2, 61, 39],
          [4, 40, 18, 2, 41, 19],
          [4, 40, 14, 2, 41, 15],
          [2, 146, 116],
          [3, 58, 36, 2, 59, 37],
          [4, 36, 16, 4, 37, 17],
          [4, 36, 12, 4, 37, 13],
          [2, 86, 68, 2, 87, 69],
          [4, 69, 43, 1, 70, 44],
          [6, 43, 19, 2, 44, 20],
          [6, 43, 15, 2, 44, 16],
          [4, 101, 81],
          [1, 80, 50, 4, 81, 51],
          [4, 50, 22, 4, 51, 23],
          [3, 36, 12, 8, 37, 13],
          [2, 116, 92, 2, 117, 93],
          [6, 58, 36, 2, 59, 37],
          [4, 46, 20, 6, 47, 21],
          [7, 42, 14, 4, 43, 15],
          [4, 133, 107],
          [8, 59, 37, 1, 60, 38],
          [8, 44, 20, 4, 45, 21],
          [12, 33, 11, 4, 34, 12],
          [3, 145, 115, 1, 146, 116],
          [4, 64, 40, 5, 65, 41],
          [11, 36, 16, 5, 37, 17],
          [11, 36, 12, 5, 37, 13],
          [5, 109, 87, 1, 110, 88],
          [5, 65, 41, 5, 66, 42],
          [5, 54, 24, 7, 55, 25],
          [11, 36, 12],
          [5, 122, 98, 1, 123, 99],
          [7, 73, 45, 3, 74, 46],
          [15, 43, 19, 2, 44, 20],
          [3, 45, 15, 13, 46, 16],
          [1, 135, 107, 5, 136, 108],
          [10, 74, 46, 1, 75, 47],
          [1, 50, 22, 15, 51, 23],
          [2, 42, 14, 17, 43, 15],
          [5, 150, 120, 1, 151, 121],
          [9, 69, 43, 4, 70, 44],
          [17, 50, 22, 1, 51, 23],
          [2, 42, 14, 19, 43, 15],
          [3, 141, 113, 4, 142, 114],
          [3, 70, 44, 11, 71, 45],
          [17, 47, 21, 4, 48, 22],
          [9, 39, 13, 16, 40, 14],
          [3, 135, 107, 5, 136, 108],
          [3, 67, 41, 13, 68, 42],
          [15, 54, 24, 5, 55, 25],
          [15, 43, 15, 10, 44, 16],
          [4, 144, 116, 4, 145, 117],
          [17, 68, 42],
          [17, 50, 22, 6, 51, 23],
          [19, 46, 16, 6, 47, 17],
          [2, 139, 111, 7, 140, 112],
          [17, 74, 46],
          [7, 54, 24, 16, 55, 25],
          [34, 37, 13],
          [4, 151, 121, 5, 152, 122],
          [4, 75, 47, 14, 76, 48],
          [11, 54, 24, 14, 55, 25],
          [16, 45, 15, 14, 46, 16],
          [6, 147, 117, 4, 148, 118],
          [6, 73, 45, 14, 74, 46],
          [11, 54, 24, 16, 55, 25],
          [30, 46, 16, 2, 47, 17],
          [8, 132, 106, 4, 133, 107],
          [8, 75, 47, 13, 76, 48],
          [7, 54, 24, 22, 55, 25],
          [22, 45, 15, 13, 46, 16],
          [10, 142, 114, 2, 143, 115],
          [19, 74, 46, 4, 75, 47],
          [28, 50, 22, 6, 51, 23],
          [33, 46, 16, 4, 47, 17],
          [8, 152, 122, 4, 153, 123],
          [22, 73, 45, 3, 74, 46],
          [8, 53, 23, 26, 54, 24],
          [12, 45, 15, 28, 46, 16],
          [3, 147, 117, 10, 148, 118],
          [3, 73, 45, 23, 74, 46],
          [4, 54, 24, 31, 55, 25],
          [11, 45, 15, 31, 46, 16],
          [7, 146, 116, 7, 147, 117],
          [21, 73, 45, 7, 74, 46],
          [1, 53, 23, 37, 54, 24],
          [19, 45, 15, 26, 46, 16],
          [5, 145, 115, 10, 146, 116],
          [19, 75, 47, 10, 76, 48],
          [15, 54, 24, 25, 55, 25],
          [23, 45, 15, 25, 46, 16],
          [13, 145, 115, 3, 146, 116],
          [2, 74, 46, 29, 75, 47],
          [42, 54, 24, 1, 55, 25],
          [23, 45, 15, 28, 46, 16],
          [17, 145, 115],
          [10, 74, 46, 23, 75, 47],
          [10, 54, 24, 35, 55, 25],
          [19, 45, 15, 35, 46, 16],
          [17, 145, 115, 1, 146, 116],
          [14, 74, 46, 21, 75, 47],
          [29, 54, 24, 19, 55, 25],
          [11, 45, 15, 46, 46, 16],
          [13, 145, 115, 6, 146, 116],
          [14, 74, 46, 23, 75, 47],
          [44, 54, 24, 7, 55, 25],
          [59, 46, 16, 1, 47, 17],
          [12, 151, 121, 7, 152, 122],
          [12, 75, 47, 26, 76, 48],
          [39, 54, 24, 14, 55, 25],
          [22, 45, 15, 41, 46, 16],
          [6, 151, 121, 14, 152, 122],
          [6, 75, 47, 34, 76, 48],
          [46, 54, 24, 10, 55, 25],
          [2, 45, 15, 64, 46, 16],
          [17, 152, 122, 4, 153, 123],
          [29, 74, 46, 14, 75, 47],
          [49, 54, 24, 10, 55, 25],
          [24, 45, 15, 46, 46, 16],
          [4, 152, 122, 18, 153, 123],
          [13, 74, 46, 32, 75, 47],
          [48, 54, 24, 14, 55, 25],
          [42, 45, 15, 32, 46, 16],
          [20, 147, 117, 4, 148, 118],
          [40, 75, 47, 7, 76, 48],
          [43, 54, 24, 22, 55, 25],
          [10, 45, 15, 67, 46, 16],
          [19, 148, 118, 6, 149, 119],
          [18, 75, 47, 31, 76, 48],
          [34, 54, 24, 34, 55, 25],
          [20, 45, 15, 61, 46, 16],
        ]),
        (b.getRSBlocks = function (e, t) {
          var r = b.getRsBlockTable(e, t);
          if (void 0 == r)
            throw new Error(
              "bad rs block @ typeNumber:" + e + "/errorCorrectLevel:" + t
            );
          for (var n = r.length / 3, i = [], s = 0; s < n; s++)
            for (
              var o = r[3 * s + 0], a = r[3 * s + 1], l = r[3 * s + 2], c = 0;
              c < o;
              c++
            )
              i.push(new b(a, l));
          return i;
        }),
        (b.getRsBlockTable = function (e, t) {
          switch (t) {
            case i:
              return b.RS_BLOCK_TABLE[4 * (e - 1) + 0];
            case s:
              return b.RS_BLOCK_TABLE[4 * (e - 1) + 1];
            case o:
              return b.RS_BLOCK_TABLE[4 * (e - 1) + 2];
            case a:
              return b.RS_BLOCK_TABLE[4 * (e - 1) + 3];
            default:
              return;
          }
        }),
        (w.prototype = {
          get: function (e) {
            var t = Math.floor(e / 8);
            return 1 == ((this.buffer[t] >>> (7 - (e % 8))) & 1);
          },
          put: function (e, t) {
            for (var r = 0; r < t; r++)
              this.putBit(1 == ((e >>> (t - r - 1)) & 1));
          },
          getLengthInBits: function () {
            return this.length;
          },
          putBit: function (e) {
            var t = Math.floor(this.length / 8);
            this.buffer.length <= t && this.buffer.push(0),
              e && (this.buffer[t] |= 128 >>> this.length % 8),
              this.length++;
          },
        });
      var E = [
        [17, 14, 11, 7],
        [32, 26, 20, 14],
        [53, 42, 32, 24],
        [78, 62, 46, 34],
        [106, 84, 60, 44],
        [134, 106, 74, 58],
        [154, 122, 86, 64],
        [192, 152, 108, 84],
        [230, 180, 130, 98],
        [271, 213, 151, 119],
        [321, 251, 177, 137],
        [367, 287, 203, 155],
        [425, 331, 241, 177],
        [458, 362, 258, 194],
        [520, 412, 292, 220],
        [586, 450, 322, 250],
        [644, 504, 364, 280],
        [718, 560, 394, 310],
        [792, 624, 442, 338],
        [858, 666, 482, 382],
        [929, 711, 509, 403],
        [1003, 779, 565, 439],
        [1091, 857, 611, 461],
        [1171, 911, 661, 511],
        [1273, 997, 715, 535],
        [1367, 1059, 751, 593],
        [1465, 1125, 805, 625],
        [1528, 1190, 868, 658],
        [1628, 1264, 908, 698],
        [1732, 1370, 982, 742],
        [1840, 1452, 1030, 790],
        [1952, 1538, 1112, 842],
        [2068, 1628, 1168, 898],
        [2188, 1722, 1228, 958],
        [2303, 1809, 1283, 983],
        [2431, 1911, 1351, 1051],
        [2563, 1989, 1423, 1093],
        [2699, 2099, 1499, 1139],
        [2809, 2213, 1579, 1219],
        [2953, 2331, 1663, 1273],
      ];
      function k(e) {
        if (
          ((this.options = {
            padding: 4,
            width: 256,
            height: 256,
            typeNumber: 4,
            color: "#000000",
            background: "#ffffff",
            ecl: "M",
            image: { svg: "", width: 0, height: 0 },
          }),
          "string" === typeof e && (e = { content: e }),
          e)
        )
          for (var t in e) this.options[t] = e[t];
        if ("string" !== typeof this.options.content)
          throw new Error("Expected 'content' as string!");
        if (0 === this.options.content.length)
          throw new Error("Expected 'content' to be non-empty!");
        if (!(this.options.padding >= 0))
          throw new Error("Expected 'padding' value to be non-negative!");
        if (!(this.options.width > 0) || !(this.options.height > 0))
          throw new Error(
            "Expected 'width' or 'height' value to be higher than zero!"
          );
        var n = this.options.content,
          l = (function (e, t) {
            for (
              var r = (function (e) {
                  var t = encodeURI(e)
                    .toString()
                    .replace(/\%[0-9a-fA-F]{2}/g, "a");
                  return t.length + (t.length != e ? 3 : 0);
                })(e),
                n = 1,
                i = 0,
                s = 0,
                o = E.length;
              s <= o;
              s++
            ) {
              var a = E[s];
              if (!a)
                throw new Error(
                  "Content too long: expected " + i + " but got " + r
                );
              switch (t) {
                case "L":
                  i = a[0];
                  break;
                case "M":
                  i = a[1];
                  break;
                case "Q":
                  i = a[2];
                  break;
                case "H":
                  i = a[3];
                  break;
                default:
                  throw new Error("Unknwon error correction level: " + t);
              }
              if (r <= i) break;
              n++;
            }
            if (n > E.length) throw new Error("Content too long");
            return n;
          })(n, this.options.ecl),
          c = (function (e) {
            switch (e) {
              case "L":
                return i;
              case "M":
                return s;
              case "Q":
                return o;
              case "H":
                return a;
              default:
                throw new Error("Unknwon error correction level: " + e);
            }
          })(this.options.ecl);
        (this.qrcode = new r(l, c)), this.qrcode.addData(n), this.qrcode.make();
      }
      (k.prototype.svg = function (e) {
        var t = this.options || {},
          r = this.qrcode.modules;
        "undefined" == typeof e && (e = { container: t.container || "svg" });
        for (
          var n = "undefined" == typeof t.pretty || !!t.pretty,
            i = n ? "  " : "",
            s = n ? "\r\n" : "",
            o = t.width,
            a = t.height,
            l = r.length,
            c = o / (l + 2 * t.padding),
            u = a / (l + 2 * t.padding),
            h = "undefined" != typeof t.join && !!t.join,
            d = "undefined" != typeof t.swap && !!t.swap,
            f = "undefined" == typeof t.xmlDeclaration || !!t.xmlDeclaration,
            p = "undefined" != typeof t.predefined && !!t.predefined,
            g = p
              ? i +
                '<defs><path id="qrmodule" d="M0 0 h' +
                u +
                " v" +
                c +
                ' H0 z" style="fill:' +
                t.color +
                ';shape-rendering:crispEdges;" /></defs>' +
                s
              : "",
            m =
              i +
              '<rect x="0" y="0" width="' +
              o +
              '" height="' +
              a +
              '" style="fill:' +
              t.background +
              ';shape-rendering:crispEdges;"/>' +
              s,
            _ = "",
            v = "",
            y = 0;
          y < l;
          y++
        )
          for (var b = 0; b < l; b++) {
            if (r[b][y]) {
              var w = b * c + t.padding * c,
                E = y * u + t.padding * u;
              if (d) {
                var k = w;
                (w = E), (E = k);
              }
              if (h) {
                var S = c + w,
                  M = u + E;
                (w = Number.isInteger(w) ? Number(w) : w.toFixed(2)),
                  (E = Number.isInteger(E) ? Number(E) : E.toFixed(2)),
                  (S = Number.isInteger(S) ? Number(S) : S.toFixed(2)),
                  (v +=
                    "M" +
                    w +
                    "," +
                    E +
                    " V" +
                    (M = Number.isInteger(M) ? Number(M) : M.toFixed(2)) +
                    " H" +
                    S +
                    " V" +
                    E +
                    " H" +
                    w +
                    " Z ");
              } else
                _ += p
                  ? i +
                    '<use x="' +
                    w.toString() +
                    '" y="' +
                    E.toString() +
                    '" href="#qrmodule" />' +
                    s
                  : i +
                    '<rect x="' +
                    w.toString() +
                    '" y="' +
                    E.toString() +
                    '" width="' +
                    c +
                    '" height="' +
                    u +
                    '" style="fill:' +
                    t.color +
                    ';shape-rendering:crispEdges;"/>' +
                    s;
            }
          }
        h &&
          (_ =
            i +
            '<path x="0" y="0" style="fill:' +
            t.color +
            ';shape-rendering:crispEdges;" d="' +
            v +
            '" />');
        let C = "";
        if (void 0 !== this.options.image && this.options.image.svg) {
          const e = (o * this.options.image.width) / 100,
            t = (a * this.options.image.height) / 100;
          (C += `<svg x="${o / 2 - e / 2}" y="${
            a / 2 - t / 2
          }" width="${e}" height="${t}" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet">`),
            (C += this.options.image.svg + s),
            (C += "</svg>");
        }
        var R = "";
        switch (e.container) {
          case "svg":
            f && (R += '<?xml version="1.0" standalone="yes"?>' + s),
              (R +=
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' +
                o +
                '" height="' +
                a +
                '">' +
                s),
              (R += g + m + _),
              (R += C),
              (R += "</svg>");
            break;
          case "svg-viewbox":
            f && (R += '<?xml version="1.0" standalone="yes"?>' + s),
              (R +=
                '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ' +
                o +
                " " +
                a +
                '">' +
                s),
              (R += g + m + _),
              (R += C),
              (R += "</svg>");
            break;
          case "g":
            (R += '<g width="' + o + '" height="' + a + '">' + s),
              (R += g + m + _),
              (R += C),
              (R += "</g>");
            break;
          default:
            R += (g + m + _ + C).replace(/^\s+/, "");
        }
        return R;
      }),
        (e.exports = k);
    },
    79106: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LIB_VERSION = void 0),
        (t.LIB_VERSION = "3.9.1");
    },
    20061: (e, t, r) => {
      "use strict";
      function n(e) {
        var t,
          r,
          i = "";
        if ("string" == typeof e || "number" == typeof e) i += e;
        else if ("object" == typeof e)
          if (Array.isArray(e))
            for (t = 0; t < e.length; t++)
              e[t] && (r = n(e[t])) && (i && (i += " "), (i += r));
          else for (t in e) e[t] && (i && (i += " "), (i += t));
        return i;
      }
      function i() {
        for (var e, t, r = 0, i = ""; r < arguments.length; )
          (e = arguments[r++]) && (t = n(e)) && (i && (i += " "), (i += t));
        return i;
      }
      r.r(t), r.d(t, { clsx: () => i, default: () => s });
      const s = i;
    },
    45751: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      const n = r(27284);
      function i(e, t, r) {
        try {
          Reflect.apply(e, t, r);
        } catch (n) {
          setTimeout(() => {
            throw n;
          });
        }
      }
      class s extends n.EventEmitter {
        emit(e) {
          let t = "error" === e;
          const r = this._events;
          if (void 0 !== r) t = t && void 0 === r.error;
          else if (!t) return !1;
          for (
            var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), o = 1;
            o < n;
            o++
          )
            s[o - 1] = arguments[o];
          if (t) {
            let e;
            if ((s.length > 0 && ([e] = s), e instanceof Error)) throw e;
            const t = new Error(
              "Unhandled error." + (e ? ` (${e.message})` : "")
            );
            throw ((t.context = e), t);
          }
          const a = r[e];
          if (void 0 === a) return !1;
          if ("function" === typeof a) i(a, this, s);
          else {
            const e = a.length,
              t = (function (e) {
                const t = e.length,
                  r = new Array(t);
                for (let n = 0; n < t; n += 1) r[n] = e[n];
                return r;
              })(a);
            for (let r = 0; r < e; r += 1) i(t[r], this, s);
          }
          return !0;
        }
      }
      t.default = s;
    },
    56040: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.assertExhaustive =
          t.assertStruct =
          t.assert =
          t.AssertionError =
            void 0);
      const n = r(87089);
      function i(e, t) {
        return (function (e) {
          var t, r;
          return Boolean(
            "string" ===
              typeof (null ===
                (r =
                  null ===
                    (t = null === e || void 0 === e ? void 0 : e.prototype) ||
                  void 0 === t
                    ? void 0
                    : t.constructor) || void 0 === r
                ? void 0
                : r.name)
          );
        })(e)
          ? new e({ message: t })
          : e({ message: t });
      }
      class s extends Error {
        constructor(e) {
          super(e.message), (this.code = "ERR_ASSERTION");
        }
      }
      (t.AssertionError = s),
        (t.assert = function (e) {
          let t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : "Assertion failed.";
          if (!e) {
            if (t instanceof Error) throw t;
            throw i(
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : s,
              t
            );
          }
        }),
        (t.assertStruct = function (e, t) {
          let r =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : "Assertion failed",
            o =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : s;
          try {
            (0, n.assert)(e, t);
          } catch (a) {
            throw i(
              o,
              `${r}: ${(function (e) {
                const t = (function (e) {
                  return "object" === typeof e && null !== e && "message" in e;
                })(e)
                  ? e.message
                  : String(e);
                return t.endsWith(".") ? t.slice(0, -1) : t;
              })(a)}.`
            );
          }
        }),
        (t.assertExhaustive = function (e) {
          throw new Error(
            "Invalid branch reached. Should be detected during compilation."
          );
        });
    },
    49709: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.base64 = void 0);
      const n = r(87089),
        i = r(56040);
      t.base64 = function (e) {
        let t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        var r, s;
        const o = null !== (r = t.paddingRequired) && void 0 !== r && r,
          a = null !== (s = t.characterSet) && void 0 !== s ? s : "base64";
        let l, c;
        return (
          "base64" === a
            ? (l = String.raw`[A-Za-z0-9+\/]`)
            : ((0, i.assert)("base64url" === a),
              (l = String.raw`[-_A-Za-z0-9]`)),
          (c = o
            ? new RegExp(`^(?:${l}{4})*(?:${l}{3}=|${l}{2}==)?$`, "u")
            : new RegExp(
                `^(?:${l}{4})*(?:${l}{2,3}|${l}{3}=|${l}{2}==)?$`,
                "u"
              )),
          (0, n.pattern)(e, c)
        );
      };
    },
    33403: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.createDataView =
          t.concatBytes =
          t.valueToBytes =
          t.stringToBytes =
          t.numberToBytes =
          t.signedBigIntToBytes =
          t.bigIntToBytes =
          t.hexToBytes =
          t.bytesToString =
          t.bytesToNumber =
          t.bytesToSignedBigInt =
          t.bytesToBigInt =
          t.bytesToHex =
          t.assertIsBytes =
          t.isBytes =
            void 0);
      const n = r(56040),
        i = r(63205),
        s = 48,
        o = 58,
        a = 87;
      const l = (function () {
        const e = [];
        return () => {
          if (0 === e.length)
            for (let t = 0; t < 256; t++)
              e.push(t.toString(16).padStart(2, "0"));
          return e;
        };
      })();
      function c(e) {
        return e instanceof Uint8Array;
      }
      function u(e) {
        (0, n.assert)(c(e), "Value must be a Uint8Array.");
      }
      function h(e) {
        if ((u(e), 0 === e.length)) return "0x";
        const t = l(),
          r = new Array(e.length);
        for (let n = 0; n < e.length; n++) r[n] = t[e[n]];
        return (0, i.add0x)(r.join(""));
      }
      function d(e) {
        u(e);
        const t = h(e);
        return BigInt(t);
      }
      function f(e) {
        var t;
        if (
          "0x" ===
          (null === (t = null === e || void 0 === e ? void 0 : e.toLowerCase) ||
          void 0 === t
            ? void 0
            : t.call(e))
        )
          return new Uint8Array();
        (0, i.assertIsHexString)(e);
        const r = (0, i.remove0x)(e).toLowerCase(),
          n = r.length % 2 === 0 ? r : `0${r}`,
          l = new Uint8Array(n.length / 2);
        for (let i = 0; i < l.length; i++) {
          const e = n.charCodeAt(2 * i),
            t = n.charCodeAt(2 * i + 1),
            r = e - (e < o ? s : a),
            c = t - (t < o ? s : a);
          l[i] = 16 * r + c;
        }
        return l;
      }
      function p(e) {
        (0, n.assert)("bigint" === typeof e, "Value must be a bigint."),
          (0, n.assert)(e >= BigInt(0), "Value must be a non-negative bigint.");
        return f(e.toString(16));
      }
      function g(e) {
        (0, n.assert)("number" === typeof e, "Value must be a number."),
          (0, n.assert)(e >= 0, "Value must be a non-negative number."),
          (0, n.assert)(
            Number.isSafeInteger(e),
            "Value is not a safe integer. Use `bigIntToBytes` instead."
          );
        return f(e.toString(16));
      }
      function m(e) {
        return (
          (0, n.assert)("string" === typeof e, "Value must be a string."),
          new TextEncoder().encode(e)
        );
      }
      function _(e) {
        if ("bigint" === typeof e) return p(e);
        if ("number" === typeof e) return g(e);
        if ("string" === typeof e) return e.startsWith("0x") ? f(e) : m(e);
        if (c(e)) return e;
        throw new TypeError(`Unsupported value type: "${typeof e}".`);
      }
      (t.isBytes = c),
        (t.assertIsBytes = u),
        (t.bytesToHex = h),
        (t.bytesToBigInt = d),
        (t.bytesToSignedBigInt = function (e) {
          u(e);
          let t = BigInt(0);
          for (const r of e) t = (t << BigInt(8)) + BigInt(r);
          return BigInt.asIntN(8 * e.length, t);
        }),
        (t.bytesToNumber = function (e) {
          u(e);
          const t = d(e);
          return (
            (0, n.assert)(
              t <= BigInt(Number.MAX_SAFE_INTEGER),
              "Number is not a safe integer. Use `bytesToBigInt` instead."
            ),
            Number(t)
          );
        }),
        (t.bytesToString = function (e) {
          return u(e), new TextDecoder().decode(e);
        }),
        (t.hexToBytes = f),
        (t.bigIntToBytes = p),
        (t.signedBigIntToBytes = function (e, t) {
          (0, n.assert)("bigint" === typeof e, "Value must be a bigint."),
            (0, n.assert)(
              "number" === typeof t,
              "Byte length must be a number."
            ),
            (0, n.assert)(t > 0, "Byte length must be greater than 0."),
            (0, n.assert)(
              (function (e, t) {
                (0, n.assert)(t > 0);
                const r = e >> BigInt(31);
                return !(((~e & r) + (e & ~r)) >> BigInt(8 * t - 1));
              })(e, t),
              "Byte length is too small to represent the given value."
            );
          let r = e;
          const i = new Uint8Array(t);
          for (let n = 0; n < i.length; n++)
            (i[n] = Number(BigInt.asUintN(8, r))), (r >>= BigInt(8));
          return i.reverse();
        }),
        (t.numberToBytes = g),
        (t.stringToBytes = m),
        (t.valueToBytes = _),
        (t.concatBytes = function (e) {
          const t = new Array(e.length);
          let r = 0;
          for (let i = 0; i < e.length; i++) {
            const n = _(e[i]);
            (t[i] = n), (r += n.length);
          }
          const n = new Uint8Array(r);
          for (let i = 0, s = 0; i < t.length; i++)
            n.set(t[i], s), (s += t[i].length);
          return n;
        }),
        (t.createDataView = function (e) {
          if ("undefined" !== typeof Buffer && e instanceof Buffer) {
            const t = e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
            return new DataView(t);
          }
          return new DataView(e.buffer, e.byteOffset, e.byteLength);
        });
    },
    25541: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ChecksumStruct = void 0);
      const n = r(87089),
        i = r(49709);
      t.ChecksumStruct = (0, n.size)(
        (0, i.base64)((0, n.string)(), { paddingRequired: !0 }),
        44,
        44
      );
    },
    48084: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.createHex =
          t.createBytes =
          t.createBigInt =
          t.createNumber =
            void 0);
      const n = r(87089),
        i = r(56040),
        s = r(33403),
        o = r(63205),
        a = (0, n.union)([
          (0, n.number)(),
          (0, n.bigint)(),
          (0, n.string)(),
          o.StrictHexStruct,
        ]),
        l = (0, n.coerce)((0, n.number)(), a, Number),
        c = (0, n.coerce)((0, n.bigint)(), a, BigInt),
        u =
          ((0, n.union)([o.StrictHexStruct, (0, n.instance)(Uint8Array)]),
          (0, n.coerce)(
            (0, n.instance)(Uint8Array),
            (0, n.union)([o.StrictHexStruct]),
            s.hexToBytes
          )),
        h = (0, n.coerce)(
          o.StrictHexStruct,
          (0, n.instance)(Uint8Array),
          s.bytesToHex
        );
      (t.createNumber = function (e) {
        try {
          const t = (0, n.create)(e, l);
          return (
            (0, i.assert)(
              Number.isFinite(t),
              `Expected a number-like value, got "${e}".`
            ),
            t
          );
        } catch (t) {
          if (t instanceof n.StructError)
            throw new Error(`Expected a number-like value, got "${e}".`);
          throw t;
        }
      }),
        (t.createBigInt = function (e) {
          try {
            return (0, n.create)(e, c);
          } catch (t) {
            if (t instanceof n.StructError)
              throw new Error(
                `Expected a number-like value, got "${String(t.value)}".`
              );
            throw t;
          }
        }),
        (t.createBytes = function (e) {
          if ("string" === typeof e && "0x" === e.toLowerCase())
            return new Uint8Array();
          try {
            return (0, n.create)(e, u);
          } catch (t) {
            if (t instanceof n.StructError)
              throw new Error(
                `Expected a bytes-like value, got "${String(t.value)}".`
              );
            throw t;
          }
        }),
        (t.createHex = function (e) {
          if (
            (e instanceof Uint8Array && 0 === e.length) ||
            ("string" === typeof e && "0x" === e.toLowerCase())
          )
            return "0x";
          try {
            return (0, n.create)(e, h);
          } catch (t) {
            if (t instanceof n.StructError)
              throw new Error(
                `Expected a bytes-like value, got "${String(t.value)}".`
              );
            throw t;
          }
        });
    },
    10137: function (e, t) {
      "use strict";
      var r,
        n,
        i =
          (this && this.__classPrivateFieldSet) ||
          function (e, t, r, n, i) {
            if ("m" === n)
              throw new TypeError("Private method is not writable");
            if ("a" === n && !i)
              throw new TypeError(
                "Private accessor was defined without a setter"
              );
            if ("function" === typeof t ? e !== t || !i : !t.has(e))
              throw new TypeError(
                "Cannot write private member to an object whose class did not declare it"
              );
            return (
              "a" === n ? i.call(e, r) : i ? (i.value = r) : t.set(e, r), r
            );
          },
        s =
          (this && this.__classPrivateFieldGet) ||
          function (e, t, r, n) {
            if ("a" === r && !n)
              throw new TypeError(
                "Private accessor was defined without a getter"
              );
            if ("function" === typeof t ? e !== t || !n : !t.has(e))
              throw new TypeError(
                "Cannot read private member from an object whose class did not declare it"
              );
            return "m" === r
              ? n
              : "a" === r
              ? n.call(e)
              : n
              ? n.value
              : t.get(e);
          };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.FrozenSet = t.FrozenMap = void 0);
      class o {
        constructor(e) {
          r.set(this, void 0), i(this, r, new Map(e), "f"), Object.freeze(this);
        }
        get size() {
          return s(this, r, "f").size;
        }
        [((r = new WeakMap()), Symbol.iterator)]() {
          return s(this, r, "f")[Symbol.iterator]();
        }
        entries() {
          return s(this, r, "f").entries();
        }
        forEach(e, t) {
          return s(this, r, "f").forEach((r, n, i) => e.call(t, r, n, this));
        }
        get(e) {
          return s(this, r, "f").get(e);
        }
        has(e) {
          return s(this, r, "f").has(e);
        }
        keys() {
          return s(this, r, "f").keys();
        }
        values() {
          return s(this, r, "f").values();
        }
        toString() {
          return `FrozenMap(${this.size}) {${
            this.size > 0
              ? ` ${[...this.entries()]
                  .map((e) => {
                    let [t, r] = e;
                    return `${String(t)} => ${String(r)}`;
                  })
                  .join(", ")} `
              : ""
          }}`;
        }
      }
      t.FrozenMap = o;
      class a {
        constructor(e) {
          n.set(this, void 0), i(this, n, new Set(e), "f"), Object.freeze(this);
        }
        get size() {
          return s(this, n, "f").size;
        }
        [((n = new WeakMap()), Symbol.iterator)]() {
          return s(this, n, "f")[Symbol.iterator]();
        }
        entries() {
          return s(this, n, "f").entries();
        }
        forEach(e, t) {
          return s(this, n, "f").forEach((r, n, i) => e.call(t, r, n, this));
        }
        has(e) {
          return s(this, n, "f").has(e);
        }
        keys() {
          return s(this, n, "f").keys();
        }
        values() {
          return s(this, n, "f").values();
        }
        toString() {
          return `FrozenSet(${this.size}) {${
            this.size > 0
              ? ` ${[...this.values()].map((e) => String(e)).join(", ")} `
              : ""
          }}`;
        }
      }
      (t.FrozenSet = a),
        Object.freeze(o),
        Object.freeze(o.prototype),
        Object.freeze(a),
        Object.freeze(a.prototype);
    },
    17743: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
    },
    63205: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.remove0x =
          t.add0x =
          t.assertIsStrictHexString =
          t.assertIsHexString =
          t.isStrictHexString =
          t.isHexString =
          t.StrictHexStruct =
          t.HexStruct =
            void 0);
      const n = r(87089),
        i = r(56040);
      function s(e) {
        return (0, n.is)(e, t.HexStruct);
      }
      function o(e) {
        return (0, n.is)(e, t.StrictHexStruct);
      }
      (t.HexStruct = (0, n.pattern)((0, n.string)(), /^(?:0x)?[0-9a-f]+$/iu)),
        (t.StrictHexStruct = (0, n.pattern)(
          (0, n.string)(),
          /^0x[0-9a-f]+$/iu
        )),
        (t.isHexString = s),
        (t.isStrictHexString = o),
        (t.assertIsHexString = function (e) {
          (0, i.assert)(s(e), "Value must be a hexadecimal string.");
        }),
        (t.assertIsStrictHexString = function (e) {
          (0, i.assert)(
            o(e),
            'Value must be a hexadecimal string, starting with "0x".'
          );
        }),
        (t.add0x = function (e) {
          return e.startsWith("0x")
            ? e
            : e.startsWith("0X")
            ? `0x${e.substring(2)}`
            : `0x${e}`;
        }),
        (t.remove0x = function (e) {
          return e.startsWith("0x") || e.startsWith("0X") ? e.substring(2) : e;
        });
    },
    21576: function (e, t, r) {
      "use strict";
      var n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, r, n) {
                void 0 === n && (n = r);
                var i = Object.getOwnPropertyDescriptor(t, r);
                (i &&
                  !("get" in i
                    ? !t.__esModule
                    : i.writable || i.configurable)) ||
                  (i = {
                    enumerable: !0,
                    get: function () {
                      return t[r];
                    },
                  }),
                  Object.defineProperty(e, n, i);
              }
            : function (e, t, r, n) {
                void 0 === n && (n = r), (e[n] = t[r]);
              }),
        i =
          (this && this.__exportStar) ||
          function (e, t) {
            for (var r in e)
              "default" === r ||
                Object.prototype.hasOwnProperty.call(t, r) ||
                n(t, e, r);
          };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        i(r(56040), t),
        i(r(49709), t),
        i(r(33403), t),
        i(r(25541), t),
        i(r(48084), t),
        i(r(10137), t),
        i(r(17743), t),
        i(r(63205), t),
        i(r(87264), t),
        i(r(49865), t),
        i(r(15369), t),
        i(r(17490), t),
        i(r(22407), t),
        i(r(8281), t),
        i(r(57627), t),
        i(r(90800), t),
        i(r(5947), t);
    },
    87264: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getJsonRpcIdValidator =
          t.assertIsJsonRpcError =
          t.isJsonRpcError =
          t.assertIsJsonRpcFailure =
          t.isJsonRpcFailure =
          t.assertIsJsonRpcSuccess =
          t.isJsonRpcSuccess =
          t.assertIsJsonRpcResponse =
          t.isJsonRpcResponse =
          t.assertIsPendingJsonRpcResponse =
          t.isPendingJsonRpcResponse =
          t.JsonRpcResponseStruct =
          t.JsonRpcFailureStruct =
          t.JsonRpcSuccessStruct =
          t.PendingJsonRpcResponseStruct =
          t.assertIsJsonRpcRequest =
          t.isJsonRpcRequest =
          t.assertIsJsonRpcNotification =
          t.isJsonRpcNotification =
          t.JsonRpcNotificationStruct =
          t.JsonRpcRequestStruct =
          t.JsonRpcParamsStruct =
          t.JsonRpcErrorStruct =
          t.JsonRpcIdStruct =
          t.JsonRpcVersionStruct =
          t.jsonrpc2 =
          t.getJsonSize =
          t.isValidJson =
          t.JsonStruct =
          t.UnsafeJsonStruct =
            void 0);
      const n = r(87089),
        i = r(56040);
      (t.UnsafeJsonStruct = (0, n.union)([
        (0, n.literal)(null),
        (0, n.boolean)(),
        (0, n.define)(
          "finite number",
          (e) => (0, n.is)(e, (0, n.number)()) && Number.isFinite(e)
        ),
        (0, n.string)(),
        (0, n.array)((0, n.lazy)(() => t.UnsafeJsonStruct)),
        (0, n.record)(
          (0, n.string)(),
          (0, n.lazy)(() => t.UnsafeJsonStruct)
        ),
      ])),
        (t.JsonStruct = (0, n.define)("Json", (e, r) => {
          function n(e, t) {
            const n = [...t.validator(e, r)];
            return !(n.length > 0) || n;
          }
          try {
            const r = n(e, t.UnsafeJsonStruct);
            return !0 !== r
              ? r
              : n(JSON.parse(JSON.stringify(e)), t.UnsafeJsonStruct);
          } catch (i) {
            return i instanceof RangeError && "Circular reference detected";
          }
        })),
        (t.isValidJson = function (e) {
          return (0, n.is)(e, t.JsonStruct);
        }),
        (t.getJsonSize = function (e) {
          (0, i.assertStruct)(e, t.JsonStruct, "Invalid JSON value");
          const r = JSON.stringify(e);
          return new TextEncoder().encode(r).byteLength;
        }),
        (t.jsonrpc2 = "2.0"),
        (t.JsonRpcVersionStruct = (0, n.literal)(t.jsonrpc2)),
        (t.JsonRpcIdStruct = (0, n.nullable)(
          (0, n.union)([(0, n.number)(), (0, n.string)()])
        )),
        (t.JsonRpcErrorStruct = (0, n.object)({
          code: (0, n.integer)(),
          message: (0, n.string)(),
          data: (0, n.optional)(t.JsonStruct),
          stack: (0, n.optional)((0, n.string)()),
        })),
        (t.JsonRpcParamsStruct = (0, n.optional)(
          (0, n.union)([
            (0, n.record)((0, n.string)(), t.JsonStruct),
            (0, n.array)(t.JsonStruct),
          ])
        )),
        (t.JsonRpcRequestStruct = (0, n.object)({
          id: t.JsonRpcIdStruct,
          jsonrpc: t.JsonRpcVersionStruct,
          method: (0, n.string)(),
          params: t.JsonRpcParamsStruct,
        })),
        (t.JsonRpcNotificationStruct = (0, n.omit)(t.JsonRpcRequestStruct, [
          "id",
        ])),
        (t.isJsonRpcNotification = function (e) {
          return (0, n.is)(e, t.JsonRpcNotificationStruct);
        }),
        (t.assertIsJsonRpcNotification = function (e, r) {
          (0, i.assertStruct)(
            e,
            t.JsonRpcNotificationStruct,
            "Invalid JSON-RPC notification",
            r
          );
        }),
        (t.isJsonRpcRequest = function (e) {
          return (0, n.is)(e, t.JsonRpcRequestStruct);
        }),
        (t.assertIsJsonRpcRequest = function (e, r) {
          (0, i.assertStruct)(
            e,
            t.JsonRpcRequestStruct,
            "Invalid JSON-RPC request",
            r
          );
        }),
        (t.PendingJsonRpcResponseStruct = (0, n.object)({
          id: t.JsonRpcIdStruct,
          jsonrpc: t.JsonRpcVersionStruct,
          result: (0, n.optional)((0, n.unknown)()),
          error: (0, n.optional)(t.JsonRpcErrorStruct),
        })),
        (t.JsonRpcSuccessStruct = (0, n.object)({
          id: t.JsonRpcIdStruct,
          jsonrpc: t.JsonRpcVersionStruct,
          result: t.JsonStruct,
        })),
        (t.JsonRpcFailureStruct = (0, n.object)({
          id: t.JsonRpcIdStruct,
          jsonrpc: t.JsonRpcVersionStruct,
          error: t.JsonRpcErrorStruct,
        })),
        (t.JsonRpcResponseStruct = (0, n.union)([
          t.JsonRpcSuccessStruct,
          t.JsonRpcFailureStruct,
        ])),
        (t.isPendingJsonRpcResponse = function (e) {
          return (0, n.is)(e, t.PendingJsonRpcResponseStruct);
        }),
        (t.assertIsPendingJsonRpcResponse = function (e, r) {
          (0, i.assertStruct)(
            e,
            t.PendingJsonRpcResponseStruct,
            "Invalid pending JSON-RPC response",
            r
          );
        }),
        (t.isJsonRpcResponse = function (e) {
          return (0, n.is)(e, t.JsonRpcResponseStruct);
        }),
        (t.assertIsJsonRpcResponse = function (e, r) {
          (0, i.assertStruct)(
            e,
            t.JsonRpcResponseStruct,
            "Invalid JSON-RPC response",
            r
          );
        }),
        (t.isJsonRpcSuccess = function (e) {
          return (0, n.is)(e, t.JsonRpcSuccessStruct);
        }),
        (t.assertIsJsonRpcSuccess = function (e, r) {
          (0, i.assertStruct)(
            e,
            t.JsonRpcSuccessStruct,
            "Invalid JSON-RPC success response",
            r
          );
        }),
        (t.isJsonRpcFailure = function (e) {
          return (0, n.is)(e, t.JsonRpcFailureStruct);
        }),
        (t.assertIsJsonRpcFailure = function (e, r) {
          (0, i.assertStruct)(
            e,
            t.JsonRpcFailureStruct,
            "Invalid JSON-RPC failure response",
            r
          );
        }),
        (t.isJsonRpcError = function (e) {
          return (0, n.is)(e, t.JsonRpcErrorStruct);
        }),
        (t.assertIsJsonRpcError = function (e, r) {
          (0, i.assertStruct)(
            e,
            t.JsonRpcErrorStruct,
            "Invalid JSON-RPC error",
            r
          );
        }),
        (t.getJsonRpcIdValidator = function (e) {
          const {
            permitEmptyString: t,
            permitFractions: r,
            permitNull: n,
          } = Object.assign(
            { permitEmptyString: !0, permitFractions: !1, permitNull: !0 },
            e
          );
          return (e) =>
            Boolean(
              ("number" === typeof e && (r || Number.isInteger(e))) ||
                ("string" === typeof e && (t || e.length > 0)) ||
                (n && null === e)
            );
        });
    },
    49865: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
    },
    15369: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.createModuleLogger = t.createProjectLogger = void 0);
      const i = (0, n(r(76522)).default)("metamask");
      (t.createProjectLogger = function (e) {
        return i.extend(e);
      }),
        (t.createModuleLogger = function (e, t) {
          return e.extend(t);
        });
    },
    17490: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.calculateNumberSize =
          t.calculateStringSize =
          t.isASCII =
          t.isPlainObject =
          t.ESCAPE_CHARACTERS_REGEXP =
          t.JsonSize =
          t.hasProperty =
          t.isObject =
          t.isNullOrUndefined =
          t.isNonEmptyArray =
            void 0),
        (t.isNonEmptyArray = function (e) {
          return Array.isArray(e) && e.length > 0;
        }),
        (t.isNullOrUndefined = function (e) {
          return null === e || void 0 === e;
        }),
        (t.isObject = function (e) {
          return Boolean(e) && "object" === typeof e && !Array.isArray(e);
        });
      function r(e) {
        return e.charCodeAt(0) <= 127;
      }
      (t.hasProperty = (e, t) => Object.hasOwnProperty.call(e, t)),
        (function (e) {
          (e[(e.Null = 4)] = "Null"),
            (e[(e.Comma = 1)] = "Comma"),
            (e[(e.Wrapper = 1)] = "Wrapper"),
            (e[(e.True = 4)] = "True"),
            (e[(e.False = 5)] = "False"),
            (e[(e.Quote = 1)] = "Quote"),
            (e[(e.Colon = 1)] = "Colon"),
            (e[(e.Date = 24)] = "Date");
        })(t.JsonSize || (t.JsonSize = {})),
        (t.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu),
        (t.isPlainObject = function (e) {
          if ("object" !== typeof e || null === e) return !1;
          try {
            let t = e;
            for (; null !== Object.getPrototypeOf(t); )
              t = Object.getPrototypeOf(t);
            return Object.getPrototypeOf(e) === t;
          } catch (t) {
            return !1;
          }
        }),
        (t.isASCII = r),
        (t.calculateStringSize = function (e) {
          var n;
          return (
            e.split("").reduce((e, t) => (r(t) ? e + 1 : e + 2), 0) +
            (null !== (n = e.match(t.ESCAPE_CHARACTERS_REGEXP)) && void 0 !== n
              ? n
              : []
            ).length
          );
        }),
        (t.calculateNumberSize = function (e) {
          return e.toString().length;
        });
    },
    22407: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.hexToBigInt =
          t.hexToNumber =
          t.bigIntToHex =
          t.numberToHex =
            void 0);
      const n = r(56040),
        i = r(63205);
      t.numberToHex = (e) => (
        (0, n.assert)("number" === typeof e, "Value must be a number."),
        (0, n.assert)(e >= 0, "Value must be a non-negative number."),
        (0, n.assert)(
          Number.isSafeInteger(e),
          "Value is not a safe integer. Use `bigIntToHex` instead."
        ),
        (0, i.add0x)(e.toString(16))
      );
      t.bigIntToHex = (e) => (
        (0, n.assert)("bigint" === typeof e, "Value must be a bigint."),
        (0, n.assert)(e >= 0, "Value must be a non-negative bigint."),
        (0, i.add0x)(e.toString(16))
      );
      t.hexToNumber = (e) => {
        (0, i.assertIsHexString)(e);
        const t = parseInt(e, 16);
        return (
          (0, n.assert)(
            Number.isSafeInteger(t),
            "Value is not a safe integer. Use `hexToBigInt` instead."
          ),
          t
        );
      };
      t.hexToBigInt = (e) => (
        (0, i.assertIsHexString)(e), BigInt((0, i.add0x)(e))
      );
    },
    8281: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
    },
    57627: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.timeSince = t.inMilliseconds = t.Duration = void 0),
        (function (e) {
          (e[(e.Millisecond = 1)] = "Millisecond"),
            (e[(e.Second = 1e3)] = "Second"),
            (e[(e.Minute = 6e4)] = "Minute"),
            (e[(e.Hour = 36e5)] = "Hour"),
            (e[(e.Day = 864e5)] = "Day"),
            (e[(e.Week = 6048e5)] = "Week"),
            (e[(e.Year = 31536e6)] = "Year");
        })(t.Duration || (t.Duration = {}));
      const r = (e, t) => {
        if (!((e) => Number.isInteger(e) && e >= 0)(e))
          throw new Error(
            `"${t}" must be a non-negative integer. Received: "${e}".`
          );
      };
      (t.inMilliseconds = function (e, t) {
        return r(e, "count"), e * t;
      }),
        (t.timeSince = function (e) {
          return r(e, "timestamp"), Date.now() - e;
        });
    },
    90800: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
    },
    5947: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.satisfiesVersionRange =
          t.gtRange =
          t.gtVersion =
          t.assertIsSemVerRange =
          t.assertIsSemVerVersion =
          t.isValidSemVerRange =
          t.isValidSemVerVersion =
          t.VersionRangeStruct =
          t.VersionStruct =
            void 0);
      const n = r(70891),
        i = r(87089),
        s = r(56040);
      (t.VersionStruct = (0, i.refine)(
        (0, i.string)(),
        "Version",
        (e) => null !== (0, n.valid)(e) || `Expected SemVer version, got "${e}"`
      )),
        (t.VersionRangeStruct = (0, i.refine)(
          (0, i.string)(),
          "Version range",
          (e) =>
            null !== (0, n.validRange)(e) || `Expected SemVer range, got "${e}"`
        )),
        (t.isValidSemVerVersion = function (e) {
          return (0, i.is)(e, t.VersionStruct);
        }),
        (t.isValidSemVerRange = function (e) {
          return (0, i.is)(e, t.VersionRangeStruct);
        }),
        (t.assertIsSemVerVersion = function (e) {
          (0, s.assertStruct)(e, t.VersionStruct);
        }),
        (t.assertIsSemVerRange = function (e) {
          (0, s.assertStruct)(e, t.VersionRangeStruct);
        }),
        (t.gtVersion = function (e, t) {
          return (0, n.gt)(e, t);
        }),
        (t.gtRange = function (e, t) {
          return (0, n.gtr)(e, t);
        }),
        (t.satisfiesVersionRange = function (e, t) {
          return (0, n.satisfies)(e, t, { includePrerelease: !0 });
        });
    },
    43703: (e, t, r) => {
      "use strict";
      const n = r(44548),
        i = Symbol("max"),
        s = Symbol("length"),
        o = Symbol("lengthCalculator"),
        a = Symbol("allowStale"),
        l = Symbol("maxAge"),
        c = Symbol("dispose"),
        u = Symbol("noDisposeOnSet"),
        h = Symbol("lruList"),
        d = Symbol("cache"),
        f = Symbol("updateAgeOnGet"),
        p = () => 1;
      const g = (e, t, r) => {
          const n = e[d].get(t);
          if (n) {
            const t = n.value;
            if (m(e, t)) {
              if ((v(e, n), !e[a])) return;
            } else
              r && (e[f] && (n.value.now = Date.now()), e[h].unshiftNode(n));
            return t.value;
          }
        },
        m = (e, t) => {
          if (!t || (!t.maxAge && !e[l])) return !1;
          const r = Date.now() - t.now;
          return t.maxAge ? r > t.maxAge : e[l] && r > e[l];
        },
        _ = (e) => {
          if (e[s] > e[i])
            for (let t = e[h].tail; e[s] > e[i] && null !== t; ) {
              const r = t.prev;
              v(e, t), (t = r);
            }
        },
        v = (e, t) => {
          if (t) {
            const r = t.value;
            e[c] && e[c](r.key, r.value),
              (e[s] -= r.length),
              e[d].delete(r.key),
              e[h].removeNode(t);
          }
        };
      class y {
        constructor(e, t, r, n, i) {
          (this.key = e),
            (this.value = t),
            (this.length = r),
            (this.now = n),
            (this.maxAge = i || 0);
        }
      }
      const b = (e, t, r, n) => {
        let i = r.value;
        m(e, i) && (v(e, r), e[a] || (i = void 0)),
          i && t.call(n, i.value, i.key, e);
      };
      e.exports = class {
        constructor(e) {
          if (
            ("number" === typeof e && (e = { max: e }),
            e || (e = {}),
            e.max && ("number" !== typeof e.max || e.max < 0))
          )
            throw new TypeError("max must be a non-negative number");
          this[i] = e.max || 1 / 0;
          const t = e.length || p;
          if (
            ((this[o] = "function" !== typeof t ? p : t),
            (this[a] = e.stale || !1),
            e.maxAge && "number" !== typeof e.maxAge)
          )
            throw new TypeError("maxAge must be a number");
          (this[l] = e.maxAge || 0),
            (this[c] = e.dispose),
            (this[u] = e.noDisposeOnSet || !1),
            (this[f] = e.updateAgeOnGet || !1),
            this.reset();
        }
        set max(e) {
          if ("number" !== typeof e || e < 0)
            throw new TypeError("max must be a non-negative number");
          (this[i] = e || 1 / 0), _(this);
        }
        get max() {
          return this[i];
        }
        set allowStale(e) {
          this[a] = !!e;
        }
        get allowStale() {
          return this[a];
        }
        set maxAge(e) {
          if ("number" !== typeof e)
            throw new TypeError("maxAge must be a non-negative number");
          (this[l] = e), _(this);
        }
        get maxAge() {
          return this[l];
        }
        set lengthCalculator(e) {
          "function" !== typeof e && (e = p),
            e !== this[o] &&
              ((this[o] = e),
              (this[s] = 0),
              this[h].forEach((e) => {
                (e.length = this[o](e.value, e.key)), (this[s] += e.length);
              })),
            _(this);
        }
        get lengthCalculator() {
          return this[o];
        }
        get length() {
          return this[s];
        }
        get itemCount() {
          return this[h].length;
        }
        rforEach(e, t) {
          t = t || this;
          for (let r = this[h].tail; null !== r; ) {
            const n = r.prev;
            b(this, e, r, t), (r = n);
          }
        }
        forEach(e, t) {
          t = t || this;
          for (let r = this[h].head; null !== r; ) {
            const n = r.next;
            b(this, e, r, t), (r = n);
          }
        }
        keys() {
          return this[h].toArray().map((e) => e.key);
        }
        values() {
          return this[h].toArray().map((e) => e.value);
        }
        reset() {
          this[c] &&
            this[h] &&
            this[h].length &&
            this[h].forEach((e) => this[c](e.key, e.value)),
            (this[d] = new Map()),
            (this[h] = new n()),
            (this[s] = 0);
        }
        dump() {
          return this[h]
            .map(
              (e) =>
                !m(this, e) && {
                  k: e.key,
                  v: e.value,
                  e: e.now + (e.maxAge || 0),
                }
            )
            .toArray()
            .filter((e) => e);
        }
        dumpLru() {
          return this[h];
        }
        set(e, t, r) {
          if ((r = r || this[l]) && "number" !== typeof r)
            throw new TypeError("maxAge must be a number");
          const n = r ? Date.now() : 0,
            a = this[o](t, e);
          if (this[d].has(e)) {
            if (a > this[i]) return v(this, this[d].get(e)), !1;
            const o = this[d].get(e).value;
            return (
              this[c] && (this[u] || this[c](e, o.value)),
              (o.now = n),
              (o.maxAge = r),
              (o.value = t),
              (this[s] += a - o.length),
              (o.length = a),
              this.get(e),
              _(this),
              !0
            );
          }
          const f = new y(e, t, a, n, r);
          return f.length > this[i]
            ? (this[c] && this[c](e, t), !1)
            : ((this[s] += f.length),
              this[h].unshift(f),
              this[d].set(e, this[h].head),
              _(this),
              !0);
        }
        has(e) {
          if (!this[d].has(e)) return !1;
          const t = this[d].get(e).value;
          return !m(this, t);
        }
        get(e) {
          return g(this, e, !0);
        }
        peek(e) {
          return g(this, e, !1);
        }
        pop() {
          const e = this[h].tail;
          return e ? (v(this, e), e.value) : null;
        }
        del(e) {
          v(this, this[d].get(e));
        }
        load(e) {
          this.reset();
          const t = Date.now();
          for (let r = e.length - 1; r >= 0; r--) {
            const n = e[r],
              i = n.e || 0;
            if (0 === i) this.set(n.k, n.v);
            else {
              const e = i - t;
              e > 0 && this.set(n.k, n.v, e);
            }
          }
        }
        prune() {
          this[d].forEach((e, t) => g(this, t, !1));
        }
      };
    },
    76830: (e, t, r) => {
      const n = Symbol("SemVer ANY");
      class i {
        static get ANY() {
          return n;
        }
        constructor(e, t) {
          if (((t = s(t)), e instanceof i)) {
            if (e.loose === !!t.loose) return e;
            e = e.value;
          }
          (e = e.trim().split(/\s+/).join(" ")),
            c("comparator", e, t),
            (this.options = t),
            (this.loose = !!t.loose),
            this.parse(e),
            this.semver === n
              ? (this.value = "")
              : (this.value = this.operator + this.semver.version),
            c("comp", this);
        }
        parse(e) {
          const t = this.options.loose ? o[a.COMPARATORLOOSE] : o[a.COMPARATOR],
            r = e.match(t);
          if (!r) throw new TypeError(`Invalid comparator: ${e}`);
          (this.operator = void 0 !== r[1] ? r[1] : ""),
            "=" === this.operator && (this.operator = ""),
            r[2]
              ? (this.semver = new u(r[2], this.options.loose))
              : (this.semver = n);
        }
        toString() {
          return this.value;
        }
        test(e) {
          if (
            (c("Comparator.test", e, this.options.loose),
            this.semver === n || e === n)
          )
            return !0;
          if ("string" === typeof e)
            try {
              e = new u(e, this.options);
            } catch (t) {
              return !1;
            }
          return l(e, this.operator, this.semver, this.options);
        }
        intersects(e, t) {
          if (!(e instanceof i))
            throw new TypeError("a Comparator is required");
          return "" === this.operator
            ? "" === this.value || new h(e.value, t).test(this.value)
            : "" === e.operator
            ? "" === e.value || new h(this.value, t).test(e.semver)
            : (!(t = s(t)).includePrerelease ||
                ("<0.0.0-0" !== this.value && "<0.0.0-0" !== e.value)) &&
              !(
                !t.includePrerelease &&
                (this.value.startsWith("<0.0.0") ||
                  e.value.startsWith("<0.0.0"))
              ) &&
              (!(
                !this.operator.startsWith(">") || !e.operator.startsWith(">")
              ) ||
                !(
                  !this.operator.startsWith("<") || !e.operator.startsWith("<")
                ) ||
                !(
                  this.semver.version !== e.semver.version ||
                  !this.operator.includes("=") ||
                  !e.operator.includes("=")
                ) ||
                !!(
                  l(this.semver, "<", e.semver, t) &&
                  this.operator.startsWith(">") &&
                  e.operator.startsWith("<")
                ) ||
                !!(
                  l(this.semver, ">", e.semver, t) &&
                  this.operator.startsWith("<") &&
                  e.operator.startsWith(">")
                ));
        }
      }
      e.exports = i;
      const s = r(3713),
        { safeRe: o, t: a } = r(55852),
        l = r(39089),
        c = r(96470),
        u = r(97530),
        h = r(4721);
    },
    4721: (e, t, r) => {
      class n {
        constructor(e, t) {
          if (((t = s(t)), e instanceof n))
            return e.loose === !!t.loose &&
              e.includePrerelease === !!t.includePrerelease
              ? e
              : new n(e.raw, t);
          if (e instanceof o)
            return (
              (this.raw = e.value), (this.set = [[e]]), this.format(), this
            );
          if (
            ((this.options = t),
            (this.loose = !!t.loose),
            (this.includePrerelease = !!t.includePrerelease),
            (this.raw = e.trim().split(/\s+/).join(" ")),
            (this.set = this.raw
              .split("||")
              .map((e) => this.parseRange(e.trim()))
              .filter((e) => e.length)),
            !this.set.length)
          )
            throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
          if (this.set.length > 1) {
            const e = this.set[0];
            if (
              ((this.set = this.set.filter((e) => !m(e[0]))),
              0 === this.set.length)
            )
              this.set = [e];
            else if (this.set.length > 1)
              for (const t of this.set)
                if (1 === t.length && _(t[0])) {
                  this.set = [t];
                  break;
                }
          }
          this.format();
        }
        format() {
          return (
            (this.range = this.set
              .map((e) => e.join(" ").trim())
              .join("||")
              .trim()),
            this.range
          );
        }
        toString() {
          return this.range;
        }
        parseRange(e) {
          const t =
              ((this.options.includePrerelease && p) |
                (this.options.loose && g)) +
              ":" +
              e,
            r = i.get(t);
          if (r) return r;
          const n = this.options.loose,
            s = n ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
          (e = e.replace(s, A(this.options.includePrerelease))),
            a("hyphen replace", e),
            (e = e.replace(c[u.COMPARATORTRIM], h)),
            a("comparator trim", e),
            (e = e.replace(c[u.TILDETRIM], d)),
            a("tilde trim", e),
            (e = e.replace(c[u.CARETTRIM], f)),
            a("caret trim", e);
          let l = e
            .split(" ")
            .map((e) => y(e, this.options))
            .join(" ")
            .split(/\s+/)
            .map((e) => I(e, this.options));
          n &&
            (l = l.filter(
              (e) => (
                a("loose invalid filter", e, this.options),
                !!e.match(c[u.COMPARATORLOOSE])
              )
            )),
            a("range list", l);
          const _ = new Map(),
            v = l.map((e) => new o(e, this.options));
          for (const i of v) {
            if (m(i)) return [i];
            _.set(i.value, i);
          }
          _.size > 1 && _.has("") && _.delete("");
          const b = [..._.values()];
          return i.set(t, b), b;
        }
        intersects(e, t) {
          if (!(e instanceof n)) throw new TypeError("a Range is required");
          return this.set.some(
            (r) =>
              v(r, t) &&
              e.set.some(
                (e) =>
                  v(e, t) && r.every((r) => e.every((e) => r.intersects(e, t)))
              )
          );
        }
        test(e) {
          if (!e) return !1;
          if ("string" === typeof e)
            try {
              e = new l(e, this.options);
            } catch (t) {
              return !1;
            }
          for (let r = 0; r < this.set.length; r++)
            if (x(this.set[r], e, this.options)) return !0;
          return !1;
        }
      }
      e.exports = n;
      const i = new (r(43703))({ max: 1e3 }),
        s = r(3713),
        o = r(76830),
        a = r(96470),
        l = r(97530),
        {
          safeRe: c,
          t: u,
          comparatorTrimReplace: h,
          tildeTrimReplace: d,
          caretTrimReplace: f,
        } = r(55852),
        { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: g } = r(34256),
        m = (e) => "<0.0.0-0" === e.value,
        _ = (e) => "" === e.value,
        v = (e, t) => {
          let r = !0;
          const n = e.slice();
          let i = n.pop();
          for (; r && n.length; )
            (r = n.every((e) => i.intersects(e, t))), (i = n.pop());
          return r;
        },
        y = (e, t) => (
          a("comp", e, t),
          (e = k(e, t)),
          a("caret", e),
          (e = w(e, t)),
          a("tildes", e),
          (e = M(e, t)),
          a("xrange", e),
          (e = R(e, t)),
          a("stars", e),
          e
        ),
        b = (e) => !e || "x" === e.toLowerCase() || "*" === e,
        w = (e, t) =>
          e
            .trim()
            .split(/\s+/)
            .map((e) => E(e, t))
            .join(" "),
        E = (e, t) => {
          const r = t.loose ? c[u.TILDELOOSE] : c[u.TILDE];
          return e.replace(r, (t, r, n, i, s) => {
            let o;
            return (
              a("tilde", e, t, r, n, i, s),
              b(r)
                ? (o = "")
                : b(n)
                ? (o = `>=${r}.0.0 <${+r + 1}.0.0-0`)
                : b(i)
                ? (o = `>=${r}.${n}.0 <${r}.${+n + 1}.0-0`)
                : s
                ? (a("replaceTilde pr", s),
                  (o = `>=${r}.${n}.${i}-${s} <${r}.${+n + 1}.0-0`))
                : (o = `>=${r}.${n}.${i} <${r}.${+n + 1}.0-0`),
              a("tilde return", o),
              o
            );
          });
        },
        k = (e, t) =>
          e
            .trim()
            .split(/\s+/)
            .map((e) => S(e, t))
            .join(" "),
        S = (e, t) => {
          a("caret", e, t);
          const r = t.loose ? c[u.CARETLOOSE] : c[u.CARET],
            n = t.includePrerelease ? "-0" : "";
          return e.replace(r, (t, r, i, s, o) => {
            let l;
            return (
              a("caret", e, t, r, i, s, o),
              b(r)
                ? (l = "")
                : b(i)
                ? (l = `>=${r}.0.0${n} <${+r + 1}.0.0-0`)
                : b(s)
                ? (l =
                    "0" === r
                      ? `>=${r}.${i}.0${n} <${r}.${+i + 1}.0-0`
                      : `>=${r}.${i}.0${n} <${+r + 1}.0.0-0`)
                : o
                ? (a("replaceCaret pr", o),
                  (l =
                    "0" === r
                      ? "0" === i
                        ? `>=${r}.${i}.${s}-${o} <${r}.${i}.${+s + 1}-0`
                        : `>=${r}.${i}.${s}-${o} <${r}.${+i + 1}.0-0`
                      : `>=${r}.${i}.${s}-${o} <${+r + 1}.0.0-0`))
                : (a("no pr"),
                  (l =
                    "0" === r
                      ? "0" === i
                        ? `>=${r}.${i}.${s}${n} <${r}.${i}.${+s + 1}-0`
                        : `>=${r}.${i}.${s}${n} <${r}.${+i + 1}.0-0`
                      : `>=${r}.${i}.${s} <${+r + 1}.0.0-0`)),
              a("caret return", l),
              l
            );
          });
        },
        M = (e, t) => (
          a("replaceXRanges", e, t),
          e
            .split(/\s+/)
            .map((e) => C(e, t))
            .join(" ")
        ),
        C = (e, t) => {
          e = e.trim();
          const r = t.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
          return e.replace(r, (r, n, i, s, o, l) => {
            a("xRange", e, r, n, i, s, o, l);
            const c = b(i),
              u = c || b(s),
              h = u || b(o),
              d = h;
            return (
              "=" === n && d && (n = ""),
              (l = t.includePrerelease ? "-0" : ""),
              c
                ? (r = ">" === n || "<" === n ? "<0.0.0-0" : "*")
                : n && d
                ? (u && (s = 0),
                  (o = 0),
                  ">" === n
                    ? ((n = ">="),
                      u
                        ? ((i = +i + 1), (s = 0), (o = 0))
                        : ((s = +s + 1), (o = 0)))
                    : "<=" === n &&
                      ((n = "<"), u ? (i = +i + 1) : (s = +s + 1)),
                  "<" === n && (l = "-0"),
                  (r = `${n + i}.${s}.${o}${l}`))
                : u
                ? (r = `>=${i}.0.0${l} <${+i + 1}.0.0-0`)
                : h && (r = `>=${i}.${s}.0${l} <${i}.${+s + 1}.0-0`),
              a("xRange return", r),
              r
            );
          });
        },
        R = (e, t) => (
          a("replaceStars", e, t), e.trim().replace(c[u.STAR], "")
        ),
        I = (e, t) => (
          a("replaceGTE0", e, t),
          e.trim().replace(c[t.includePrerelease ? u.GTE0PRE : u.GTE0], "")
        ),
        A = (e) => (t, r, n, i, s, o, a, l, c, u, h, d, f) =>
          `${(r = b(n)
            ? ""
            : b(i)
            ? `>=${n}.0.0${e ? "-0" : ""}`
            : b(s)
            ? `>=${n}.${i}.0${e ? "-0" : ""}`
            : o
            ? `>=${r}`
            : `>=${r}${e ? "-0" : ""}`)} ${(l = b(c)
            ? ""
            : b(u)
            ? `<${+c + 1}.0.0-0`
            : b(h)
            ? `<${c}.${+u + 1}.0-0`
            : d
            ? `<=${c}.${u}.${h}-${d}`
            : e
            ? `<${c}.${u}.${+h + 1}-0`
            : `<=${l}`)}`.trim(),
        x = (e, t, r) => {
          for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
          if (t.prerelease.length && !r.includePrerelease) {
            for (let r = 0; r < e.length; r++)
              if (
                (a(e[r].semver),
                e[r].semver !== o.ANY && e[r].semver.prerelease.length > 0)
              ) {
                const n = e[r].semver;
                if (
                  n.major === t.major &&
                  n.minor === t.minor &&
                  n.patch === t.patch
                )
                  return !0;
              }
            return !1;
          }
          return !0;
        };
    },
    97530: (e, t, r) => {
      const n = r(96470),
        { MAX_LENGTH: i, MAX_SAFE_INTEGER: s } = r(34256),
        { safeRe: o, t: a } = r(55852),
        l = r(3713),
        { compareIdentifiers: c } = r(16465);
      class u {
        constructor(e, t) {
          if (((t = l(t)), e instanceof u)) {
            if (
              e.loose === !!t.loose &&
              e.includePrerelease === !!t.includePrerelease
            )
              return e;
            e = e.version;
          } else if ("string" !== typeof e)
            throw new TypeError(
              `Invalid version. Must be a string. Got type "${typeof e}".`
            );
          if (e.length > i)
            throw new TypeError(`version is longer than ${i} characters`);
          n("SemVer", e, t),
            (this.options = t),
            (this.loose = !!t.loose),
            (this.includePrerelease = !!t.includePrerelease);
          const r = e.trim().match(t.loose ? o[a.LOOSE] : o[a.FULL]);
          if (!r) throw new TypeError(`Invalid Version: ${e}`);
          if (
            ((this.raw = e),
            (this.major = +r[1]),
            (this.minor = +r[2]),
            (this.patch = +r[3]),
            this.major > s || this.major < 0)
          )
            throw new TypeError("Invalid major version");
          if (this.minor > s || this.minor < 0)
            throw new TypeError("Invalid minor version");
          if (this.patch > s || this.patch < 0)
            throw new TypeError("Invalid patch version");
          r[4]
            ? (this.prerelease = r[4].split(".").map((e) => {
                if (/^[0-9]+$/.test(e)) {
                  const t = +e;
                  if (t >= 0 && t < s) return t;
                }
                return e;
              }))
            : (this.prerelease = []),
            (this.build = r[5] ? r[5].split(".") : []),
            this.format();
        }
        format() {
          return (
            (this.version = `${this.major}.${this.minor}.${this.patch}`),
            this.prerelease.length &&
              (this.version += `-${this.prerelease.join(".")}`),
            this.version
          );
        }
        toString() {
          return this.version;
        }
        compare(e) {
          if (
            (n("SemVer.compare", this.version, this.options, e),
            !(e instanceof u))
          ) {
            if ("string" === typeof e && e === this.version) return 0;
            e = new u(e, this.options);
          }
          return e.version === this.version
            ? 0
            : this.compareMain(e) || this.comparePre(e);
        }
        compareMain(e) {
          return (
            e instanceof u || (e = new u(e, this.options)),
            c(this.major, e.major) ||
              c(this.minor, e.minor) ||
              c(this.patch, e.patch)
          );
        }
        comparePre(e) {
          if (
            (e instanceof u || (e = new u(e, this.options)),
            this.prerelease.length && !e.prerelease.length)
          )
            return -1;
          if (!this.prerelease.length && e.prerelease.length) return 1;
          if (!this.prerelease.length && !e.prerelease.length) return 0;
          let t = 0;
          do {
            const r = this.prerelease[t],
              i = e.prerelease[t];
            if (
              (n("prerelease compare", t, r, i), void 0 === r && void 0 === i)
            )
              return 0;
            if (void 0 === i) return 1;
            if (void 0 === r) return -1;
            if (r !== i) return c(r, i);
          } while (++t);
        }
        compareBuild(e) {
          e instanceof u || (e = new u(e, this.options));
          let t = 0;
          do {
            const r = this.build[t],
              i = e.build[t];
            if (
              (n("prerelease compare", t, r, i), void 0 === r && void 0 === i)
            )
              return 0;
            if (void 0 === i) return 1;
            if (void 0 === r) return -1;
            if (r !== i) return c(r, i);
          } while (++t);
        }
        inc(e, t, r) {
          switch (e) {
            case "premajor":
              (this.prerelease.length = 0),
                (this.patch = 0),
                (this.minor = 0),
                this.major++,
                this.inc("pre", t, r);
              break;
            case "preminor":
              (this.prerelease.length = 0),
                (this.patch = 0),
                this.minor++,
                this.inc("pre", t, r);
              break;
            case "prepatch":
              (this.prerelease.length = 0),
                this.inc("patch", t, r),
                this.inc("pre", t, r);
              break;
            case "prerelease":
              0 === this.prerelease.length && this.inc("patch", t, r),
                this.inc("pre", t, r);
              break;
            case "major":
              (0 === this.minor &&
                0 === this.patch &&
                0 !== this.prerelease.length) ||
                this.major++,
                (this.minor = 0),
                (this.patch = 0),
                (this.prerelease = []);
              break;
            case "minor":
              (0 === this.patch && 0 !== this.prerelease.length) ||
                this.minor++,
                (this.patch = 0),
                (this.prerelease = []);
              break;
            case "patch":
              0 === this.prerelease.length && this.patch++,
                (this.prerelease = []);
              break;
            case "pre": {
              const e = Number(r) ? 1 : 0;
              if (!t && !1 === r)
                throw new Error(
                  "invalid increment argument: identifier is empty"
                );
              if (0 === this.prerelease.length) this.prerelease = [e];
              else {
                let n = this.prerelease.length;
                for (; --n >= 0; )
                  "number" === typeof this.prerelease[n] &&
                    (this.prerelease[n]++, (n = -2));
                if (-1 === n) {
                  if (t === this.prerelease.join(".") && !1 === r)
                    throw new Error(
                      "invalid increment argument: identifier already exists"
                    );
                  this.prerelease.push(e);
                }
              }
              if (t) {
                let n = [t, e];
                !1 === r && (n = [t]),
                  0 === c(this.prerelease[0], t)
                    ? isNaN(this.prerelease[1]) && (this.prerelease = n)
                    : (this.prerelease = n);
              }
              break;
            }
            default:
              throw new Error(`invalid increment argument: ${e}`);
          }
          return (
            (this.raw = this.format()),
            this.build.length && (this.raw += `+${this.build.join(".")}`),
            this
          );
        }
      }
      e.exports = u;
    },
    48628: (e, t, r) => {
      const n = r(69646);
      e.exports = (e, t) => {
        const r = n(e.trim().replace(/^[=v]+/, ""), t);
        return r ? r.version : null;
      };
    },
    39089: (e, t, r) => {
      const n = r(88643),
        i = r(96193),
        s = r(98178),
        o = r(98315),
        a = r(66437),
        l = r(7926);
      e.exports = (e, t, r, c) => {
        switch (t) {
          case "===":
            return (
              "object" === typeof e && (e = e.version),
              "object" === typeof r && (r = r.version),
              e === r
            );
          case "!==":
            return (
              "object" === typeof e && (e = e.version),
              "object" === typeof r && (r = r.version),
              e !== r
            );
          case "":
          case "=":
          case "==":
            return n(e, r, c);
          case "!=":
            return i(e, r, c);
          case ">":
            return s(e, r, c);
          case ">=":
            return o(e, r, c);
          case "<":
            return a(e, r, c);
          case "<=":
            return l(e, r, c);
          default:
            throw new TypeError(`Invalid operator: ${t}`);
        }
      };
    },
    48956: (e, t, r) => {
      const n = r(97530),
        i = r(69646),
        { safeRe: s, t: o } = r(55852);
      e.exports = (e, t) => {
        if (e instanceof n) return e;
        if (("number" === typeof e && (e = String(e)), "string" !== typeof e))
          return null;
        let r = null;
        if ((t = t || {}).rtl) {
          const n = t.includePrerelease ? s[o.COERCERTLFULL] : s[o.COERCERTL];
          let i;
          for (
            ;
            (i = n.exec(e)) && (!r || r.index + r[0].length !== e.length);

          )
            (r && i.index + i[0].length === r.index + r[0].length) || (r = i),
              (n.lastIndex = i.index + i[1].length + i[2].length);
          n.lastIndex = -1;
        } else r = e.match(t.includePrerelease ? s[o.COERCEFULL] : s[o.COERCE]);
        if (null === r) return null;
        const a = r[2],
          l = r[3] || "0",
          c = r[4] || "0",
          u = t.includePrerelease && r[5] ? `-${r[5]}` : "",
          h = t.includePrerelease && r[6] ? `+${r[6]}` : "";
        return i(`${a}.${l}.${c}${u}${h}`, t);
      };
    },
    25947: (e, t, r) => {
      const n = r(97530);
      e.exports = (e, t, r) => {
        const i = new n(e, r),
          s = new n(t, r);
        return i.compare(s) || i.compareBuild(s);
      };
    },
    53657: (e, t, r) => {
      const n = r(57722);
      e.exports = (e, t) => n(e, t, !0);
    },
    57722: (e, t, r) => {
      const n = r(97530);
      e.exports = (e, t, r) => new n(e, r).compare(new n(t, r));
    },
    14050: (e, t, r) => {
      const n = r(69646);
      e.exports = (e, t) => {
        const r = n(e, null, !0),
          i = n(t, null, !0),
          s = r.compare(i);
        if (0 === s) return null;
        const o = s > 0,
          a = o ? r : i,
          l = o ? i : r,
          c = !!a.prerelease.length;
        if (!!l.prerelease.length && !c)
          return l.patch || l.minor
            ? a.patch
              ? "patch"
              : a.minor
              ? "minor"
              : "major"
            : "major";
        const u = c ? "pre" : "";
        return r.major !== i.major
          ? u + "major"
          : r.minor !== i.minor
          ? u + "minor"
          : r.patch !== i.patch
          ? u + "patch"
          : "prerelease";
      };
    },
    88643: (e, t, r) => {
      const n = r(57722);
      e.exports = (e, t, r) => 0 === n(e, t, r);
    },
    98178: (e, t, r) => {
      const n = r(57722);
      e.exports = (e, t, r) => n(e, t, r) > 0;
    },
    98315: (e, t, r) => {
      const n = r(57722);
      e.exports = (e, t, r) => n(e, t, r) >= 0;
    },
    13093: (e, t, r) => {
      const n = r(97530);
      e.exports = (e, t, r, i, s) => {
        "string" === typeof r && ((s = i), (i = r), (r = void 0));
        try {
          return new n(e instanceof n ? e.version : e, r).inc(t, i, s).version;
        } catch (o) {
          return null;
        }
      };
    },
    66437: (e, t, r) => {
      const n = r(57722);
      e.exports = (e, t, r) => n(e, t, r) < 0;
    },
    7926: (e, t, r) => {
      const n = r(57722);
      e.exports = (e, t, r) => n(e, t, r) <= 0;
    },
    81124: (e, t, r) => {
      const n = r(97530);
      e.exports = (e, t) => new n(e, t).major;
    },
    14792: (e, t, r) => {
      const n = r(97530);
      e.exports = (e, t) => new n(e, t).minor;
    },
    96193: (e, t, r) => {
      const n = r(57722);
      e.exports = (e, t, r) => 0 !== n(e, t, r);
    },
    69646: (e, t, r) => {
      const n = r(97530);
      e.exports = function (e, t) {
        let r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (e instanceof n) return e;
        try {
          return new n(e, t);
        } catch (i) {
          if (!r) return null;
          throw i;
        }
      };
    },
    71967: (e, t, r) => {
      const n = r(97530);
      e.exports = (e, t) => new n(e, t).patch;
    },
    80295: (e, t, r) => {
      const n = r(69646);
      e.exports = (e, t) => {
        const r = n(e, t);
        return r && r.prerelease.length ? r.prerelease : null;
      };
    },
    37180: (e, t, r) => {
      const n = r(57722);
      e.exports = (e, t, r) => n(t, e, r);
    },
    26771: (e, t, r) => {
      const n = r(25947);
      e.exports = (e, t) => e.sort((e, r) => n(r, e, t));
    },
    3172: (e, t, r) => {
      const n = r(4721);
      e.exports = (e, t, r) => {
        try {
          t = new n(t, r);
        } catch (i) {
          return !1;
        }
        return t.test(e);
      };
    },
    21357: (e, t, r) => {
      const n = r(25947);
      e.exports = (e, t) => e.sort((e, r) => n(e, r, t));
    },
    42803: (e, t, r) => {
      const n = r(69646);
      e.exports = (e, t) => {
        const r = n(e, t);
        return r ? r.version : null;
      };
    },
    70891: (e, t, r) => {
      const n = r(55852),
        i = r(34256),
        s = r(97530),
        o = r(16465),
        a = r(69646),
        l = r(42803),
        c = r(48628),
        u = r(13093),
        h = r(14050),
        d = r(81124),
        f = r(14792),
        p = r(71967),
        g = r(80295),
        m = r(57722),
        _ = r(37180),
        v = r(53657),
        y = r(25947),
        b = r(21357),
        w = r(26771),
        E = r(98178),
        k = r(66437),
        S = r(88643),
        M = r(96193),
        C = r(98315),
        R = r(7926),
        I = r(39089),
        A = r(48956),
        x = r(76830),
        L = r(4721),
        N = r(3172),
        P = r(43657),
        T = r(97974),
        O = r(55716),
        B = r(26887),
        j = r(54952),
        D = r(82277),
        F = r(17349),
        U = r(70620),
        $ = r(71238),
        H = r(56571),
        W = r(40490);
      e.exports = {
        parse: a,
        valid: l,
        clean: c,
        inc: u,
        diff: h,
        major: d,
        minor: f,
        patch: p,
        prerelease: g,
        compare: m,
        rcompare: _,
        compareLoose: v,
        compareBuild: y,
        sort: b,
        rsort: w,
        gt: E,
        lt: k,
        eq: S,
        neq: M,
        gte: C,
        lte: R,
        cmp: I,
        coerce: A,
        Comparator: x,
        Range: L,
        satisfies: N,
        toComparators: P,
        maxSatisfying: T,
        minSatisfying: O,
        minVersion: B,
        validRange: j,
        outside: D,
        gtr: F,
        ltr: U,
        intersects: $,
        simplifyRange: H,
        subset: W,
        SemVer: s,
        re: n.re,
        src: n.src,
        tokens: n.t,
        SEMVER_SPEC_VERSION: i.SEMVER_SPEC_VERSION,
        RELEASE_TYPES: i.RELEASE_TYPES,
        compareIdentifiers: o.compareIdentifiers,
        rcompareIdentifiers: o.rcompareIdentifiers,
      };
    },
    34256: (e) => {
      const t = Number.MAX_SAFE_INTEGER || 9007199254740991;
      e.exports = {
        MAX_LENGTH: 256,
        MAX_SAFE_COMPONENT_LENGTH: 16,
        MAX_SAFE_BUILD_LENGTH: 250,
        MAX_SAFE_INTEGER: t,
        RELEASE_TYPES: [
          "major",
          "premajor",
          "minor",
          "preminor",
          "patch",
          "prepatch",
          "prerelease",
        ],
        SEMVER_SPEC_VERSION: "2.0.0",
        FLAG_INCLUDE_PRERELEASE: 1,
        FLAG_LOOSE: 2,
      };
    },
    96470: (e) => {
      const t =
        "object" === typeof process &&
        {
          NODE_ENV: "production",
          PUBLIC_URL: "",
          WDS_SOCKET_HOST: void 0,
          WDS_SOCKET_PATH: void 0,
          WDS_SOCKET_PORT: void 0,
          FAST_REFRESH: !0,
          REACT_APP_WEB_BASE_URL: "https://app.stabilityworld.ai",
          REACT_APP_UNLOCK_COMMINGSOON: "",
          REACT_APP_API_BASE_URL: "https://api.stabilityworld.ai",
          REACT_APP_API: "https://api.stabilityworld.ai/api/app/",
          REACT_APP_GOOGLE_CLIENT_ID:
            "846996706584-rpl4hgo013g8ojko4qro4nu2uinqqnra.apps.googleusercontent.com",
          REACT_APP_DISCORD_CLIENT_ID: "1253661276383739974",
          REACT_APP_CALLBACK_DISCORD: "https://app.stabilityworld.ai",
          REACT_APP_CALLBACK_GOOGLE: "https://app.stabilityworld.ai",
          REACT_APP_REF_URL: "https://app.stabilityworld.ai",
          REACT_APP_PROJECT_ID: "f9ea16e5a146c0e64bf2832000287c02",
          REACT_APP_TELEGRAM_CALLBACK: "https://app.stabilityworld.ai",
          REACT_APP_TELEGRAM_BOT_ID: "6437228099",
        }.NODE_DEBUG &&
        /\bsemver\b/i.test(
          {
            NODE_ENV: "production",
            PUBLIC_URL: "",
            WDS_SOCKET_HOST: void 0,
            WDS_SOCKET_PATH: void 0,
            WDS_SOCKET_PORT: void 0,
            FAST_REFRESH: !0,
            REACT_APP_WEB_BASE_URL: "https://app.stabilityworld.ai",
            REACT_APP_UNLOCK_COMMINGSOON: "",
            REACT_APP_API_BASE_URL: "https://api.stabilityworld.ai",
            REACT_APP_API: "https://api.stabilityworld.ai/api/app/",
            REACT_APP_GOOGLE_CLIENT_ID:
              "846996706584-rpl4hgo013g8ojko4qro4nu2uinqqnra.apps.googleusercontent.com",
            REACT_APP_DISCORD_CLIENT_ID: "1253661276383739974",
            REACT_APP_CALLBACK_DISCORD: "https://app.stabilityworld.ai",
            REACT_APP_CALLBACK_GOOGLE: "https://app.stabilityworld.ai",
            REACT_APP_REF_URL: "https://app.stabilityworld.ai",
            REACT_APP_PROJECT_ID: "f9ea16e5a146c0e64bf2832000287c02",
            REACT_APP_TELEGRAM_CALLBACK: "https://app.stabilityworld.ai",
            REACT_APP_TELEGRAM_BOT_ID: "6437228099",
          }.NODE_DEBUG
        )
          ? function () {
              for (
                var e = arguments.length, t = new Array(e), r = 0;
                r < e;
                r++
              )
                t[r] = arguments[r];
              return console.error("SEMVER", ...t);
            }
          : () => {};
      e.exports = t;
    },
    16465: (e) => {
      const t = /^[0-9]+$/,
        r = (e, r) => {
          const n = t.test(e),
            i = t.test(r);
          return (
            n && i && ((e = +e), (r = +r)),
            e === r ? 0 : n && !i ? -1 : i && !n ? 1 : e < r ? -1 : 1
          );
        };
      e.exports = {
        compareIdentifiers: r,
        rcompareIdentifiers: (e, t) => r(t, e),
      };
    },
    3713: (e) => {
      const t = Object.freeze({ loose: !0 }),
        r = Object.freeze({});
      e.exports = (e) => (e ? ("object" !== typeof e ? t : e) : r);
    },
    55852: (e, t, r) => {
      const {
          MAX_SAFE_COMPONENT_LENGTH: n,
          MAX_SAFE_BUILD_LENGTH: i,
          MAX_LENGTH: s,
        } = r(34256),
        o = r(96470),
        a = ((t = e.exports = {}).re = []),
        l = (t.safeRe = []),
        c = (t.src = []),
        u = (t.t = {});
      let h = 0;
      const d = "[a-zA-Z0-9-]",
        f = [
          ["\\s", 1],
          ["\\d", s],
          [d, i],
        ],
        p = (e, t, r) => {
          const n = ((e) => {
              for (const [t, r] of f)
                e = e
                  .split(`${t}*`)
                  .join(`${t}{0,${r}}`)
                  .split(`${t}+`)
                  .join(`${t}{1,${r}}`);
              return e;
            })(t),
            i = h++;
          o(e, i, t),
            (u[e] = i),
            (c[i] = t),
            (a[i] = new RegExp(t, r ? "g" : void 0)),
            (l[i] = new RegExp(n, r ? "g" : void 0));
        };
      p("NUMERICIDENTIFIER", "0|[1-9]\\d*"),
        p("NUMERICIDENTIFIERLOOSE", "\\d+"),
        p("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`),
        p(
          "MAINVERSION",
          `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${
            c[u.NUMERICIDENTIFIER]
          })`
        ),
        p(
          "MAINVERSIONLOOSE",
          `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${
            c[u.NUMERICIDENTIFIERLOOSE]
          })\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`
        ),
        p(
          "PRERELEASEIDENTIFIER",
          `(?:${c[u.NUMERICIDENTIFIER]}|${c[u.NONNUMERICIDENTIFIER]})`
        ),
        p(
          "PRERELEASEIDENTIFIERLOOSE",
          `(?:${c[u.NUMERICIDENTIFIERLOOSE]}|${c[u.NONNUMERICIDENTIFIER]})`
        ),
        p(
          "PRERELEASE",
          `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${
            c[u.PRERELEASEIDENTIFIER]
          })*))`
        ),
        p(
          "PRERELEASELOOSE",
          `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${
            c[u.PRERELEASEIDENTIFIERLOOSE]
          })*))`
        ),
        p("BUILDIDENTIFIER", `${d}+`),
        p(
          "BUILD",
          `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`
        ),
        p(
          "FULLPLAIN",
          `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`
        ),
        p("FULL", `^${c[u.FULLPLAIN]}$`),
        p(
          "LOOSEPLAIN",
          `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${
            c[u.BUILD]
          }?`
        ),
        p("LOOSE", `^${c[u.LOOSEPLAIN]}$`),
        p("GTLT", "((?:<|>)?=?)"),
        p("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),
        p("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`),
        p(
          "XRANGEPLAIN",
          `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${
            c[u.XRANGEIDENTIFIER]
          })(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${
            c[u.BUILD]
          }?)?)?`
        ),
        p(
          "XRANGEPLAINLOOSE",
          `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${
            c[u.XRANGEIDENTIFIERLOOSE]
          })(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${
            c[u.BUILD]
          }?)?)?`
        ),
        p("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`),
        p("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`),
        p(
          "COERCEPLAIN",
          `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`
        ),
        p("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`),
        p(
          "COERCEFULL",
          c[u.COERCEPLAIN] +
            `(?:${c[u.PRERELEASE]})?` +
            `(?:${c[u.BUILD]})?(?:$|[^\\d])`
        ),
        p("COERCERTL", c[u.COERCE], !0),
        p("COERCERTLFULL", c[u.COERCEFULL], !0),
        p("LONETILDE", "(?:~>?)"),
        p("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0),
        (t.tildeTrimReplace = "$1~"),
        p("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`),
        p("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`),
        p("LONECARET", "(?:\\^)"),
        p("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0),
        (t.caretTrimReplace = "$1^"),
        p("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`),
        p("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`),
        p("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`),
        p("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`),
        p(
          "COMPARATORTRIM",
          `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`,
          !0
        ),
        (t.comparatorTrimReplace = "$1$2$3"),
        p(
          "HYPHENRANGE",
          `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`
        ),
        p(
          "HYPHENRANGELOOSE",
          `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${
            c[u.XRANGEPLAINLOOSE]
          })\\s*$`
        ),
        p("STAR", "(<|>)?=?\\s*\\*"),
        p("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"),
        p("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
    },
    17349: (e, t, r) => {
      const n = r(82277);
      e.exports = (e, t, r) => n(e, t, ">", r);
    },
    71238: (e, t, r) => {
      const n = r(4721);
      e.exports = (e, t, r) => (
        (e = new n(e, r)), (t = new n(t, r)), e.intersects(t, r)
      );
    },
    70620: (e, t, r) => {
      const n = r(82277);
      e.exports = (e, t, r) => n(e, t, "<", r);
    },
    97974: (e, t, r) => {
      const n = r(97530),
        i = r(4721);
      e.exports = (e, t, r) => {
        let s = null,
          o = null,
          a = null;
        try {
          a = new i(t, r);
        } catch (l) {
          return null;
        }
        return (
          e.forEach((e) => {
            a.test(e) &&
              ((s && -1 !== o.compare(e)) || ((s = e), (o = new n(s, r))));
          }),
          s
        );
      };
    },
    55716: (e, t, r) => {
      const n = r(97530),
        i = r(4721);
      e.exports = (e, t, r) => {
        let s = null,
          o = null,
          a = null;
        try {
          a = new i(t, r);
        } catch (l) {
          return null;
        }
        return (
          e.forEach((e) => {
            a.test(e) &&
              ((s && 1 !== o.compare(e)) || ((s = e), (o = new n(s, r))));
          }),
          s
        );
      };
    },
    26887: (e, t, r) => {
      const n = r(97530),
        i = r(4721),
        s = r(98178);
      e.exports = (e, t) => {
        e = new i(e, t);
        let r = new n("0.0.0");
        if (e.test(r)) return r;
        if (((r = new n("0.0.0-0")), e.test(r))) return r;
        r = null;
        for (let i = 0; i < e.set.length; ++i) {
          const t = e.set[i];
          let o = null;
          t.forEach((e) => {
            const t = new n(e.semver.version);
            switch (e.operator) {
              case ">":
                0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0),
                  (t.raw = t.format());
              case "":
              case ">=":
                (o && !s(t, o)) || (o = t);
                break;
              case "<":
              case "<=":
                break;
              default:
                throw new Error(`Unexpected operation: ${e.operator}`);
            }
          }),
            !o || (r && !s(r, o)) || (r = o);
        }
        return r && e.test(r) ? r : null;
      };
    },
    82277: (e, t, r) => {
      const n = r(97530),
        i = r(76830),
        { ANY: s } = i,
        o = r(4721),
        a = r(3172),
        l = r(98178),
        c = r(66437),
        u = r(7926),
        h = r(98315);
      e.exports = (e, t, r, d) => {
        let f, p, g, m, _;
        switch (((e = new n(e, d)), (t = new o(t, d)), r)) {
          case ">":
            (f = l), (p = u), (g = c), (m = ">"), (_ = ">=");
            break;
          case "<":
            (f = c), (p = h), (g = l), (m = "<"), (_ = "<=");
            break;
          default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (a(e, t, d)) return !1;
        for (let n = 0; n < t.set.length; ++n) {
          const r = t.set[n];
          let o = null,
            a = null;
          if (
            (r.forEach((e) => {
              e.semver === s && (e = new i(">=0.0.0")),
                (o = o || e),
                (a = a || e),
                f(e.semver, o.semver, d)
                  ? (o = e)
                  : g(e.semver, a.semver, d) && (a = e);
            }),
            o.operator === m || o.operator === _)
          )
            return !1;
          if ((!a.operator || a.operator === m) && p(e, a.semver)) return !1;
          if (a.operator === _ && g(e, a.semver)) return !1;
        }
        return !0;
      };
    },
    56571: (e, t, r) => {
      const n = r(3172),
        i = r(57722);
      e.exports = (e, t, r) => {
        const s = [];
        let o = null,
          a = null;
        const l = e.sort((e, t) => i(e, t, r));
        for (const i of l) {
          n(i, t, r)
            ? ((a = i), o || (o = i))
            : (a && s.push([o, a]), (a = null), (o = null));
        }
        o && s.push([o, null]);
        const c = [];
        for (const [n, i] of s)
          n === i
            ? c.push(n)
            : i || n !== l[0]
            ? i
              ? n === l[0]
                ? c.push(`<=${i}`)
                : c.push(`${n} - ${i}`)
              : c.push(`>=${n}`)
            : c.push("*");
        const u = c.join(" || "),
          h = "string" === typeof t.raw ? t.raw : String(t);
        return u.length < h.length ? u : t;
      };
    },
    40490: (e, t, r) => {
      const n = r(4721),
        i = r(76830),
        { ANY: s } = i,
        o = r(3172),
        a = r(57722),
        l = [new i(">=0.0.0-0")],
        c = [new i(">=0.0.0")],
        u = (e, t, r) => {
          if (e === t) return !0;
          if (1 === e.length && e[0].semver === s) {
            if (1 === t.length && t[0].semver === s) return !0;
            e = r.includePrerelease ? l : c;
          }
          if (1 === t.length && t[0].semver === s) {
            if (r.includePrerelease) return !0;
            t = c;
          }
          const n = new Set();
          let i, u, f, p, g, m, _;
          for (const s of e)
            ">" === s.operator || ">=" === s.operator
              ? (i = h(i, s, r))
              : "<" === s.operator || "<=" === s.operator
              ? (u = d(u, s, r))
              : n.add(s.semver);
          if (n.size > 1) return null;
          if (i && u) {
            if (((f = a(i.semver, u.semver, r)), f > 0)) return null;
            if (0 === f && (">=" !== i.operator || "<=" !== u.operator))
              return null;
          }
          for (const s of n) {
            if (i && !o(s, String(i), r)) return null;
            if (u && !o(s, String(u), r)) return null;
            for (const e of t) if (!o(s, String(e), r)) return !1;
            return !0;
          }
          let v =
              !(!u || r.includePrerelease || !u.semver.prerelease.length) &&
              u.semver,
            y =
              !(!i || r.includePrerelease || !i.semver.prerelease.length) &&
              i.semver;
          v &&
            1 === v.prerelease.length &&
            "<" === u.operator &&
            0 === v.prerelease[0] &&
            (v = !1);
          for (const s of t) {
            if (
              ((_ = _ || ">" === s.operator || ">=" === s.operator),
              (m = m || "<" === s.operator || "<=" === s.operator),
              i)
            )
              if (
                (y &&
                  s.semver.prerelease &&
                  s.semver.prerelease.length &&
                  s.semver.major === y.major &&
                  s.semver.minor === y.minor &&
                  s.semver.patch === y.patch &&
                  (y = !1),
                ">" === s.operator || ">=" === s.operator)
              ) {
                if (((p = h(i, s, r)), p === s && p !== i)) return !1;
              } else if (">=" === i.operator && !o(i.semver, String(s), r))
                return !1;
            if (u)
              if (
                (v &&
                  s.semver.prerelease &&
                  s.semver.prerelease.length &&
                  s.semver.major === v.major &&
                  s.semver.minor === v.minor &&
                  s.semver.patch === v.patch &&
                  (v = !1),
                "<" === s.operator || "<=" === s.operator)
              ) {
                if (((g = d(u, s, r)), g === s && g !== u)) return !1;
              } else if ("<=" === u.operator && !o(u.semver, String(s), r))
                return !1;
            if (!s.operator && (u || i) && 0 !== f) return !1;
          }
          return (
            !(i && m && !u && 0 !== f) && !(u && _ && !i && 0 !== f) && !y && !v
          );
        },
        h = (e, t, r) => {
          if (!e) return t;
          const n = a(e.semver, t.semver, r);
          return n > 0
            ? e
            : n < 0 || (">" === t.operator && ">=" === e.operator)
            ? t
            : e;
        },
        d = (e, t, r) => {
          if (!e) return t;
          const n = a(e.semver, t.semver, r);
          return n < 0
            ? e
            : n > 0 || ("<" === t.operator && "<=" === e.operator)
            ? t
            : e;
        };
      e.exports = function (e, t) {
        let r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        if (e === t) return !0;
        (e = new n(e, r)), (t = new n(t, r));
        let i = !1;
        e: for (const n of e.set) {
          for (const e of t.set) {
            const t = u(n, e, r);
            if (((i = i || null !== t), t)) continue e;
          }
          if (i) return !1;
        }
        return !0;
      };
    },
    43657: (e, t, r) => {
      const n = r(4721);
      e.exports = (e, t) =>
        new n(e, t).set.map((e) =>
          e
            .map((e) => e.value)
            .join(" ")
            .trim()
            .split(" ")
        );
    },
    54952: (e, t, r) => {
      const n = r(4721);
      e.exports = (e, t) => {
        try {
          return new n(e, t).range || "*";
        } catch (r) {
          return null;
        }
      };
    },
    50549: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = r(6326),
        i = r(15868),
        s = (function () {
          function e() {
            this._semaphore = new i.default(1);
          }
          return (
            (e.prototype.acquire = function () {
              return n.__awaiter(this, void 0, void 0, function () {
                var e;
                return n.__generator(this, function (t) {
                  switch (t.label) {
                    case 0:
                      return [4, this._semaphore.acquire()];
                    case 1:
                      return (e = t.sent()), [2, e[1]];
                  }
                });
              });
            }),
            (e.prototype.runExclusive = function (e) {
              return this._semaphore.runExclusive(function () {
                return e();
              });
            }),
            (e.prototype.isLocked = function () {
              return this._semaphore.isLocked();
            }),
            (e.prototype.release = function () {
              this._semaphore.release();
            }),
            e
          );
        })();
      t.default = s;
    },
    15868: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      var n = r(6326),
        i = (function () {
          function e(e) {
            if (((this._maxConcurrency = e), (this._queue = []), e <= 0))
              throw new Error(
                "semaphore must be initialized to a positive value"
              );
            this._value = e;
          }
          return (
            (e.prototype.acquire = function () {
              var e = this,
                t = this.isLocked(),
                r = new Promise(function (t) {
                  return e._queue.push(t);
                });
              return t || this._dispatch(), r;
            }),
            (e.prototype.runExclusive = function (e) {
              return n.__awaiter(this, void 0, void 0, function () {
                var t, r, i;
                return n.__generator(this, function (n) {
                  switch (n.label) {
                    case 0:
                      return [4, this.acquire()];
                    case 1:
                      (t = n.sent()), (r = t[0]), (i = t[1]), (n.label = 2);
                    case 2:
                      return n.trys.push([2, , 4, 5]), [4, e(r)];
                    case 3:
                      return [2, n.sent()];
                    case 4:
                      return i(), [7];
                    case 5:
                      return [2];
                  }
                });
              });
            }),
            (e.prototype.isLocked = function () {
              return this._value <= 0;
            }),
            (e.prototype.release = function () {
              if (this._maxConcurrency > 1)
                throw new Error(
                  "this method is unavailabel on semaphores with concurrency > 1; use the scoped release returned by acquire instead"
                );
              if (this._currentReleaser) {
                var e = this._currentReleaser;
                (this._currentReleaser = void 0), e();
              }
            }),
            (e.prototype._dispatch = function () {
              var e = this,
                t = this._queue.shift();
              if (t) {
                var r = !1;
                (this._currentReleaser = function () {
                  r || ((r = !0), e._value++, e._dispatch());
                }),
                  t([this._value--, this._currentReleaser]);
              }
            }),
            e
          );
        })();
      t.default = i;
    },
    98982: (e, t, r) => {
      "use strict";
      t.eu = void 0;
      var n = r(50549);
      Object.defineProperty(t, "eu", {
        enumerable: !0,
        get: function () {
          return n.default;
        },
      });
      var i = r(15868);
      var s = r(73141);
    },
    73141: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.withTimeout = void 0);
      var n = r(6326);
      t.withTimeout = function (e, t, r) {
        var i = this;
        return (
          void 0 === r && (r = new Error("timeout")),
          {
            acquire: function () {
              return new Promise(function (s, o) {
                return n.__awaiter(i, void 0, void 0, function () {
                  var i, a;
                  return n.__generator(this, function (n) {
                    switch (n.label) {
                      case 0:
                        return (
                          (i = !1),
                          setTimeout(function () {
                            (i = !0), o(r);
                          }, t),
                          [4, e.acquire()]
                        );
                      case 1:
                        return (
                          (a = n.sent()),
                          i ? (Array.isArray(a) ? a[1] : a)() : s(a),
                          [2]
                        );
                    }
                  });
                });
              });
            },
            runExclusive: function (e) {
              return n.__awaiter(this, void 0, void 0, function () {
                var t, r;
                return n.__generator(this, function (n) {
                  switch (n.label) {
                    case 0:
                      (t = function () {}), (n.label = 1);
                    case 1:
                      return n.trys.push([1, , 7, 8]), [4, this.acquire()];
                    case 2:
                      return (
                        (r = n.sent()),
                        Array.isArray(r) ? ((t = r[1]), [4, e(r[0])]) : [3, 4]
                      );
                    case 3:
                      return [2, n.sent()];
                    case 4:
                      return (t = r), [4, e()];
                    case 5:
                      return [2, n.sent()];
                    case 6:
                      return [3, 8];
                    case 7:
                      return t(), [7];
                    case 8:
                      return [2];
                  }
                });
              });
            },
            release: function () {
              e.release();
            },
            isLocked: function () {
              return e.isLocked();
            },
          }
        );
      };
    },
    6373: function (e, t, r) {
      !(function (e, t) {
        "use strict";
        function n(e, t) {
          if (!e) throw new Error(t || "Assertion failed");
        }
        function i(e, t) {
          e.super_ = t;
          var r = function () {};
          (r.prototype = t.prototype),
            (e.prototype = new r()),
            (e.prototype.constructor = e);
        }
        function s(e, t, r) {
          if (s.isBN(e)) return e;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== e &&
              (("le" !== t && "be" !== t) || ((r = t), (t = 10)),
              this._init(e || 0, t || 10, r || "be"));
        }
        var o;
        "object" === typeof e ? (e.exports = s) : (t.BN = s),
          (s.BN = s),
          (s.wordSize = 26);
        try {
          o =
            "undefined" !== typeof window &&
            "undefined" !== typeof window.Buffer
              ? window.Buffer
              : r(47790).Buffer;
        } catch (I) {}
        function a(e, t) {
          var r = e.charCodeAt(t);
          return r >= 48 && r <= 57
            ? r - 48
            : r >= 65 && r <= 70
            ? r - 55
            : r >= 97 && r <= 102
            ? r - 87
            : void n(!1, "Invalid character in " + e);
        }
        function l(e, t, r) {
          var n = a(e, r);
          return r - 1 >= t && (n |= a(e, r - 1) << 4), n;
        }
        function c(e, t, r, i) {
          for (var s = 0, o = 0, a = Math.min(e.length, r), l = t; l < a; l++) {
            var c = e.charCodeAt(l) - 48;
            (s *= i),
              (o = c >= 49 ? c - 49 + 10 : c >= 17 ? c - 17 + 10 : c),
              n(c >= 0 && o < i, "Invalid character"),
              (s += o);
          }
          return s;
        }
        function u(e, t) {
          (e.words = t.words),
            (e.length = t.length),
            (e.negative = t.negative),
            (e.red = t.red);
        }
        if (
          ((s.isBN = function (e) {
            return (
              e instanceof s ||
              (null !== e &&
                "object" === typeof e &&
                e.constructor.wordSize === s.wordSize &&
                Array.isArray(e.words))
            );
          }),
          (s.max = function (e, t) {
            return e.cmp(t) > 0 ? e : t;
          }),
          (s.min = function (e, t) {
            return e.cmp(t) < 0 ? e : t;
          }),
          (s.prototype._init = function (e, t, r) {
            if ("number" === typeof e) return this._initNumber(e, t, r);
            if ("object" === typeof e) return this._initArray(e, t, r);
            "hex" === t && (t = 16), n(t === (0 | t) && t >= 2 && t <= 36);
            var i = 0;
            "-" === (e = e.toString().replace(/\s+/g, ""))[0] &&
              (i++, (this.negative = 1)),
              i < e.length &&
                (16 === t
                  ? this._parseHex(e, i, r)
                  : (this._parseBase(e, t, i),
                    "le" === r && this._initArray(this.toArray(), t, r)));
          }),
          (s.prototype._initNumber = function (e, t, r) {
            e < 0 && ((this.negative = 1), (e = -e)),
              e < 67108864
                ? ((this.words = [67108863 & e]), (this.length = 1))
                : e < 4503599627370496
                ? ((this.words = [67108863 & e, (e / 67108864) & 67108863]),
                  (this.length = 2))
                : (n(e < 9007199254740992),
                  (this.words = [67108863 & e, (e / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === r && this._initArray(this.toArray(), t, r);
          }),
          (s.prototype._initArray = function (e, t, r) {
            if ((n("number" === typeof e.length), e.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(e.length / 3)),
              (this.words = new Array(this.length));
            for (var i = 0; i < this.length; i++) this.words[i] = 0;
            var s,
              o,
              a = 0;
            if ("be" === r)
              for (i = e.length - 1, s = 0; i >= 0; i -= 3)
                (o = e[i] | (e[i - 1] << 8) | (e[i - 2] << 16)),
                  (this.words[s] |= (o << a) & 67108863),
                  (this.words[s + 1] = (o >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), s++);
            else if ("le" === r)
              for (i = 0, s = 0; i < e.length; i += 3)
                (o = e[i] | (e[i + 1] << 8) | (e[i + 2] << 16)),
                  (this.words[s] |= (o << a) & 67108863),
                  (this.words[s + 1] = (o >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), s++);
            return this._strip();
          }),
          (s.prototype._parseHex = function (e, t, r) {
            (this.length = Math.ceil((e.length - t) / 6)),
              (this.words = new Array(this.length));
            for (var n = 0; n < this.length; n++) this.words[n] = 0;
            var i,
              s = 0,
              o = 0;
            if ("be" === r)
              for (n = e.length - 1; n >= t; n -= 2)
                (i = l(e, t, n) << s),
                  (this.words[o] |= 67108863 & i),
                  s >= 18
                    ? ((s -= 18), (o += 1), (this.words[o] |= i >>> 26))
                    : (s += 8);
            else
              for (
                n = (e.length - t) % 2 === 0 ? t + 1 : t;
                n < e.length;
                n += 2
              )
                (i = l(e, t, n) << s),
                  (this.words[o] |= 67108863 & i),
                  s >= 18
                    ? ((s -= 18), (o += 1), (this.words[o] |= i >>> 26))
                    : (s += 8);
            this._strip();
          }),
          (s.prototype._parseBase = function (e, t, r) {
            (this.words = [0]), (this.length = 1);
            for (var n = 0, i = 1; i <= 67108863; i *= t) n++;
            n--, (i = (i / t) | 0);
            for (
              var s = e.length - r,
                o = s % n,
                a = Math.min(s, s - o) + r,
                l = 0,
                u = r;
              u < a;
              u += n
            )
              (l = c(e, u, u + n, t)),
                this.imuln(i),
                this.words[0] + l < 67108864
                  ? (this.words[0] += l)
                  : this._iaddn(l);
            if (0 !== o) {
              var h = 1;
              for (l = c(e, u, e.length, t), u = 0; u < o; u++) h *= t;
              this.imuln(h),
                this.words[0] + l < 67108864
                  ? (this.words[0] += l)
                  : this._iaddn(l);
            }
            this._strip();
          }),
          (s.prototype.copy = function (e) {
            e.words = new Array(this.length);
            for (var t = 0; t < this.length; t++) e.words[t] = this.words[t];
            (e.length = this.length),
              (e.negative = this.negative),
              (e.red = this.red);
          }),
          (s.prototype._move = function (e) {
            u(e, this);
          }),
          (s.prototype.clone = function () {
            var e = new s(null);
            return this.copy(e), e;
          }),
          (s.prototype._expand = function (e) {
            for (; this.length < e; ) this.words[this.length++] = 0;
            return this;
          }),
          (s.prototype._strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (s.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          "undefined" !== typeof Symbol && "function" === typeof Symbol.for)
        )
          try {
            s.prototype[Symbol.for("nodejs.util.inspect.custom")] = h;
          } catch (I) {
            s.prototype.inspect = h;
          }
        else s.prototype.inspect = h;
        function h() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
        }
        var d = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          f = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          p = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176,
          ];
        (s.prototype.toString = function (e, t) {
          var r;
          if (((t = 0 | t || 1), 16 === (e = e || 10) || "hex" === e)) {
            r = "";
            for (var i = 0, s = 0, o = 0; o < this.length; o++) {
              var a = this.words[o],
                l = (16777215 & ((a << i) | s)).toString(16);
              (s = (a >>> (24 - i)) & 16777215),
                (i += 2) >= 26 && ((i -= 26), o--),
                (r =
                  0 !== s || o !== this.length - 1
                    ? d[6 - l.length] + l + r
                    : l + r);
            }
            for (0 !== s && (r = s.toString(16) + r); r.length % t !== 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          if (e === (0 | e) && e >= 2 && e <= 36) {
            var c = f[e],
              u = p[e];
            r = "";
            var h = this.clone();
            for (h.negative = 0; !h.isZero(); ) {
              var g = h.modrn(u).toString(e);
              r = (h = h.idivn(u)).isZero() ? g + r : d[c - g.length] + g + r;
            }
            for (this.isZero() && (r = "0" + r); r.length % t !== 0; )
              r = "0" + r;
            return 0 !== this.negative && (r = "-" + r), r;
          }
          n(!1, "Base should be between 2 and 36");
        }),
          (s.prototype.toNumber = function () {
            var e = this.words[0];
            return (
              2 === this.length
                ? (e += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (e += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  n(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -e : e
            );
          }),
          (s.prototype.toJSON = function () {
            return this.toString(16, 2);
          }),
          o &&
            (s.prototype.toBuffer = function (e, t) {
              return this.toArrayLike(o, e, t);
            }),
          (s.prototype.toArray = function (e, t) {
            return this.toArrayLike(Array, e, t);
          });
        function g(e, t, r) {
          r.negative = t.negative ^ e.negative;
          var n = (e.length + t.length) | 0;
          (r.length = n), (n = (n - 1) | 0);
          var i = 0 | e.words[0],
            s = 0 | t.words[0],
            o = i * s,
            a = 67108863 & o,
            l = (o / 67108864) | 0;
          r.words[0] = a;
          for (var c = 1; c < n; c++) {
            for (
              var u = l >>> 26,
                h = 67108863 & l,
                d = Math.min(c, t.length - 1),
                f = Math.max(0, c - e.length + 1);
              f <= d;
              f++
            ) {
              var p = (c - f) | 0;
              (u +=
                ((o = (i = 0 | e.words[p]) * (s = 0 | t.words[f]) + h) /
                  67108864) |
                0),
                (h = 67108863 & o);
            }
            (r.words[c] = 0 | h), (l = 0 | u);
          }
          return 0 !== l ? (r.words[c] = 0 | l) : r.length--, r._strip();
        }
        (s.prototype.toArrayLike = function (e, t, r) {
          this._strip();
          var i = this.byteLength(),
            s = r || Math.max(1, i);
          n(i <= s, "byte array longer than desired length"),
            n(s > 0, "Requested array length <= 0");
          var o = (function (e, t) {
            return e.allocUnsafe ? e.allocUnsafe(t) : new e(t);
          })(e, s);
          return this["_toArrayLike" + ("le" === t ? "LE" : "BE")](o, i), o;
        }),
          (s.prototype._toArrayLikeLE = function (e, t) {
            for (var r = 0, n = 0, i = 0, s = 0; i < this.length; i++) {
              var o = (this.words[i] << s) | n;
              (e[r++] = 255 & o),
                r < e.length && (e[r++] = (o >> 8) & 255),
                r < e.length && (e[r++] = (o >> 16) & 255),
                6 === s
                  ? (r < e.length && (e[r++] = (o >> 24) & 255),
                    (n = 0),
                    (s = 0))
                  : ((n = o >>> 24), (s += 2));
            }
            if (r < e.length) for (e[r++] = n; r < e.length; ) e[r++] = 0;
          }),
          (s.prototype._toArrayLikeBE = function (e, t) {
            for (
              var r = e.length - 1, n = 0, i = 0, s = 0;
              i < this.length;
              i++
            ) {
              var o = (this.words[i] << s) | n;
              (e[r--] = 255 & o),
                r >= 0 && (e[r--] = (o >> 8) & 255),
                r >= 0 && (e[r--] = (o >> 16) & 255),
                6 === s
                  ? (r >= 0 && (e[r--] = (o >> 24) & 255), (n = 0), (s = 0))
                  : ((n = o >>> 24), (s += 2));
            }
            if (r >= 0) for (e[r--] = n; r >= 0; ) e[r--] = 0;
          }),
          Math.clz32
            ? (s.prototype._countBits = function (e) {
                return 32 - Math.clz32(e);
              })
            : (s.prototype._countBits = function (e) {
                var t = e,
                  r = 0;
                return (
                  t >= 4096 && ((r += 13), (t >>>= 13)),
                  t >= 64 && ((r += 7), (t >>>= 7)),
                  t >= 8 && ((r += 4), (t >>>= 4)),
                  t >= 2 && ((r += 2), (t >>>= 2)),
                  r + t
                );
              }),
          (s.prototype._zeroBits = function (e) {
            if (0 === e) return 26;
            var t = e,
              r = 0;
            return (
              0 === (8191 & t) && ((r += 13), (t >>>= 13)),
              0 === (127 & t) && ((r += 7), (t >>>= 7)),
              0 === (15 & t) && ((r += 4), (t >>>= 4)),
              0 === (3 & t) && ((r += 2), (t >>>= 2)),
              0 === (1 & t) && r++,
              r
            );
          }),
          (s.prototype.bitLength = function () {
            var e = this.words[this.length - 1],
              t = this._countBits(e);
            return 26 * (this.length - 1) + t;
          }),
          (s.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var e = 0, t = 0; t < this.length; t++) {
              var r = this._zeroBits(this.words[t]);
              if (((e += r), 26 !== r)) break;
            }
            return e;
          }),
          (s.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (s.prototype.toTwos = function (e) {
            return 0 !== this.negative
              ? this.abs().inotn(e).iaddn(1)
              : this.clone();
          }),
          (s.prototype.fromTwos = function (e) {
            return this.testn(e - 1)
              ? this.notn(e).iaddn(1).ineg()
              : this.clone();
          }),
          (s.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (s.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (s.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (s.prototype.iuor = function (e) {
            for (; this.length < e.length; ) this.words[this.length++] = 0;
            for (var t = 0; t < e.length; t++)
              this.words[t] = this.words[t] | e.words[t];
            return this._strip();
          }),
          (s.prototype.ior = function (e) {
            return n(0 === (this.negative | e.negative)), this.iuor(e);
          }),
          (s.prototype.or = function (e) {
            return this.length > e.length
              ? this.clone().ior(e)
              : e.clone().ior(this);
          }),
          (s.prototype.uor = function (e) {
            return this.length > e.length
              ? this.clone().iuor(e)
              : e.clone().iuor(this);
          }),
          (s.prototype.iuand = function (e) {
            var t;
            t = this.length > e.length ? e : this;
            for (var r = 0; r < t.length; r++)
              this.words[r] = this.words[r] & e.words[r];
            return (this.length = t.length), this._strip();
          }),
          (s.prototype.iand = function (e) {
            return n(0 === (this.negative | e.negative)), this.iuand(e);
          }),
          (s.prototype.and = function (e) {
            return this.length > e.length
              ? this.clone().iand(e)
              : e.clone().iand(this);
          }),
          (s.prototype.uand = function (e) {
            return this.length > e.length
              ? this.clone().iuand(e)
              : e.clone().iuand(this);
          }),
          (s.prototype.iuxor = function (e) {
            var t, r;
            this.length > e.length
              ? ((t = this), (r = e))
              : ((t = e), (r = this));
            for (var n = 0; n < r.length; n++)
              this.words[n] = t.words[n] ^ r.words[n];
            if (this !== t)
              for (; n < t.length; n++) this.words[n] = t.words[n];
            return (this.length = t.length), this._strip();
          }),
          (s.prototype.ixor = function (e) {
            return n(0 === (this.negative | e.negative)), this.iuxor(e);
          }),
          (s.prototype.xor = function (e) {
            return this.length > e.length
              ? this.clone().ixor(e)
              : e.clone().ixor(this);
          }),
          (s.prototype.uxor = function (e) {
            return this.length > e.length
              ? this.clone().iuxor(e)
              : e.clone().iuxor(this);
          }),
          (s.prototype.inotn = function (e) {
            n("number" === typeof e && e >= 0);
            var t = 0 | Math.ceil(e / 26),
              r = e % 26;
            this._expand(t), r > 0 && t--;
            for (var i = 0; i < t; i++)
              this.words[i] = 67108863 & ~this.words[i];
            return (
              r > 0 &&
                (this.words[i] = ~this.words[i] & (67108863 >> (26 - r))),
              this._strip()
            );
          }),
          (s.prototype.notn = function (e) {
            return this.clone().inotn(e);
          }),
          (s.prototype.setn = function (e, t) {
            n("number" === typeof e && e >= 0);
            var r = (e / 26) | 0,
              i = e % 26;
            return (
              this._expand(r + 1),
              (this.words[r] = t
                ? this.words[r] | (1 << i)
                : this.words[r] & ~(1 << i)),
              this._strip()
            );
          }),
          (s.prototype.iadd = function (e) {
            var t, r, n;
            if (0 !== this.negative && 0 === e.negative)
              return (
                (this.negative = 0),
                (t = this.isub(e)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== e.negative)
              return (
                (e.negative = 0),
                (t = this.isub(e)),
                (e.negative = 1),
                t._normSign()
              );
            this.length > e.length
              ? ((r = this), (n = e))
              : ((r = e), (n = this));
            for (var i = 0, s = 0; s < n.length; s++)
              (t = (0 | r.words[s]) + (0 | n.words[s]) + i),
                (this.words[s] = 67108863 & t),
                (i = t >>> 26);
            for (; 0 !== i && s < r.length; s++)
              (t = (0 | r.words[s]) + i),
                (this.words[s] = 67108863 & t),
                (i = t >>> 26);
            if (((this.length = r.length), 0 !== i))
              (this.words[this.length] = i), this.length++;
            else if (r !== this)
              for (; s < r.length; s++) this.words[s] = r.words[s];
            return this;
          }),
          (s.prototype.add = function (e) {
            var t;
            return 0 !== e.negative && 0 === this.negative
              ? ((e.negative = 0), (t = this.sub(e)), (e.negative ^= 1), t)
              : 0 === e.negative && 0 !== this.negative
              ? ((this.negative = 0), (t = e.sub(this)), (this.negative = 1), t)
              : this.length > e.length
              ? this.clone().iadd(e)
              : e.clone().iadd(this);
          }),
          (s.prototype.isub = function (e) {
            if (0 !== e.negative) {
              e.negative = 0;
              var t = this.iadd(e);
              return (e.negative = 1), t._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(e),
                (this.negative = 1),
                this._normSign()
              );
            var r,
              n,
              i = this.cmp(e);
            if (0 === i)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            i > 0 ? ((r = this), (n = e)) : ((r = e), (n = this));
            for (var s = 0, o = 0; o < n.length; o++)
              (s = (t = (0 | r.words[o]) - (0 | n.words[o]) + s) >> 26),
                (this.words[o] = 67108863 & t);
            for (; 0 !== s && o < r.length; o++)
              (s = (t = (0 | r.words[o]) + s) >> 26),
                (this.words[o] = 67108863 & t);
            if (0 === s && o < r.length && r !== this)
              for (; o < r.length; o++) this.words[o] = r.words[o];
            return (
              (this.length = Math.max(this.length, o)),
              r !== this && (this.negative = 1),
              this._strip()
            );
          }),
          (s.prototype.sub = function (e) {
            return this.clone().isub(e);
          });
        var m = function (e, t, r) {
          var n,
            i,
            s,
            o = e.words,
            a = t.words,
            l = r.words,
            c = 0,
            u = 0 | o[0],
            h = 8191 & u,
            d = u >>> 13,
            f = 0 | o[1],
            p = 8191 & f,
            g = f >>> 13,
            m = 0 | o[2],
            _ = 8191 & m,
            v = m >>> 13,
            y = 0 | o[3],
            b = 8191 & y,
            w = y >>> 13,
            E = 0 | o[4],
            k = 8191 & E,
            S = E >>> 13,
            M = 0 | o[5],
            C = 8191 & M,
            R = M >>> 13,
            I = 0 | o[6],
            A = 8191 & I,
            x = I >>> 13,
            L = 0 | o[7],
            N = 8191 & L,
            P = L >>> 13,
            T = 0 | o[8],
            O = 8191 & T,
            B = T >>> 13,
            j = 0 | o[9],
            D = 8191 & j,
            F = j >>> 13,
            U = 0 | a[0],
            $ = 8191 & U,
            H = U >>> 13,
            W = 0 | a[1],
            q = 8191 & W,
            V = W >>> 13,
            z = 0 | a[2],
            G = 8191 & z,
            J = z >>> 13,
            Z = 0 | a[3],
            K = 8191 & Z,
            Y = Z >>> 13,
            Q = 0 | a[4],
            X = 8191 & Q,
            ee = Q >>> 13,
            te = 0 | a[5],
            re = 8191 & te,
            ne = te >>> 13,
            ie = 0 | a[6],
            se = 8191 & ie,
            oe = ie >>> 13,
            ae = 0 | a[7],
            le = 8191 & ae,
            ce = ae >>> 13,
            ue = 0 | a[8],
            he = 8191 & ue,
            de = ue >>> 13,
            fe = 0 | a[9],
            pe = 8191 & fe,
            ge = fe >>> 13;
          (r.negative = e.negative ^ t.negative), (r.length = 19);
          var me =
            (((c + (n = Math.imul(h, $))) | 0) +
              ((8191 & (i = ((i = Math.imul(h, H)) + Math.imul(d, $)) | 0)) <<
                13)) |
            0;
          (c = ((((s = Math.imul(d, H)) + (i >>> 13)) | 0) + (me >>> 26)) | 0),
            (me &= 67108863),
            (n = Math.imul(p, $)),
            (i = ((i = Math.imul(p, H)) + Math.imul(g, $)) | 0),
            (s = Math.imul(g, H));
          var _e =
            (((c + (n = (n + Math.imul(h, q)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, V)) | 0) + Math.imul(d, q)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(d, V)) | 0) + (i >>> 13)) | 0) +
              (_e >>> 26)) |
            0),
            (_e &= 67108863),
            (n = Math.imul(_, $)),
            (i = ((i = Math.imul(_, H)) + Math.imul(v, $)) | 0),
            (s = Math.imul(v, H)),
            (n = (n + Math.imul(p, q)) | 0),
            (i = ((i = (i + Math.imul(p, V)) | 0) + Math.imul(g, q)) | 0),
            (s = (s + Math.imul(g, V)) | 0);
          var ve =
            (((c + (n = (n + Math.imul(h, G)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, J)) | 0) + Math.imul(d, G)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(d, J)) | 0) + (i >>> 13)) | 0) +
              (ve >>> 26)) |
            0),
            (ve &= 67108863),
            (n = Math.imul(b, $)),
            (i = ((i = Math.imul(b, H)) + Math.imul(w, $)) | 0),
            (s = Math.imul(w, H)),
            (n = (n + Math.imul(_, q)) | 0),
            (i = ((i = (i + Math.imul(_, V)) | 0) + Math.imul(v, q)) | 0),
            (s = (s + Math.imul(v, V)) | 0),
            (n = (n + Math.imul(p, G)) | 0),
            (i = ((i = (i + Math.imul(p, J)) | 0) + Math.imul(g, G)) | 0),
            (s = (s + Math.imul(g, J)) | 0);
          var ye =
            (((c + (n = (n + Math.imul(h, K)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, Y)) | 0) + Math.imul(d, K)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(d, Y)) | 0) + (i >>> 13)) | 0) +
              (ye >>> 26)) |
            0),
            (ye &= 67108863),
            (n = Math.imul(k, $)),
            (i = ((i = Math.imul(k, H)) + Math.imul(S, $)) | 0),
            (s = Math.imul(S, H)),
            (n = (n + Math.imul(b, q)) | 0),
            (i = ((i = (i + Math.imul(b, V)) | 0) + Math.imul(w, q)) | 0),
            (s = (s + Math.imul(w, V)) | 0),
            (n = (n + Math.imul(_, G)) | 0),
            (i = ((i = (i + Math.imul(_, J)) | 0) + Math.imul(v, G)) | 0),
            (s = (s + Math.imul(v, J)) | 0),
            (n = (n + Math.imul(p, K)) | 0),
            (i = ((i = (i + Math.imul(p, Y)) | 0) + Math.imul(g, K)) | 0),
            (s = (s + Math.imul(g, Y)) | 0);
          var be =
            (((c + (n = (n + Math.imul(h, X)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, ee)) | 0) + Math.imul(d, X)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(d, ee)) | 0) + (i >>> 13)) | 0) +
              (be >>> 26)) |
            0),
            (be &= 67108863),
            (n = Math.imul(C, $)),
            (i = ((i = Math.imul(C, H)) + Math.imul(R, $)) | 0),
            (s = Math.imul(R, H)),
            (n = (n + Math.imul(k, q)) | 0),
            (i = ((i = (i + Math.imul(k, V)) | 0) + Math.imul(S, q)) | 0),
            (s = (s + Math.imul(S, V)) | 0),
            (n = (n + Math.imul(b, G)) | 0),
            (i = ((i = (i + Math.imul(b, J)) | 0) + Math.imul(w, G)) | 0),
            (s = (s + Math.imul(w, J)) | 0),
            (n = (n + Math.imul(_, K)) | 0),
            (i = ((i = (i + Math.imul(_, Y)) | 0) + Math.imul(v, K)) | 0),
            (s = (s + Math.imul(v, Y)) | 0),
            (n = (n + Math.imul(p, X)) | 0),
            (i = ((i = (i + Math.imul(p, ee)) | 0) + Math.imul(g, X)) | 0),
            (s = (s + Math.imul(g, ee)) | 0);
          var we =
            (((c + (n = (n + Math.imul(h, re)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, ne)) | 0) + Math.imul(d, re)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(d, ne)) | 0) + (i >>> 13)) | 0) +
              (we >>> 26)) |
            0),
            (we &= 67108863),
            (n = Math.imul(A, $)),
            (i = ((i = Math.imul(A, H)) + Math.imul(x, $)) | 0),
            (s = Math.imul(x, H)),
            (n = (n + Math.imul(C, q)) | 0),
            (i = ((i = (i + Math.imul(C, V)) | 0) + Math.imul(R, q)) | 0),
            (s = (s + Math.imul(R, V)) | 0),
            (n = (n + Math.imul(k, G)) | 0),
            (i = ((i = (i + Math.imul(k, J)) | 0) + Math.imul(S, G)) | 0),
            (s = (s + Math.imul(S, J)) | 0),
            (n = (n + Math.imul(b, K)) | 0),
            (i = ((i = (i + Math.imul(b, Y)) | 0) + Math.imul(w, K)) | 0),
            (s = (s + Math.imul(w, Y)) | 0),
            (n = (n + Math.imul(_, X)) | 0),
            (i = ((i = (i + Math.imul(_, ee)) | 0) + Math.imul(v, X)) | 0),
            (s = (s + Math.imul(v, ee)) | 0),
            (n = (n + Math.imul(p, re)) | 0),
            (i = ((i = (i + Math.imul(p, ne)) | 0) + Math.imul(g, re)) | 0),
            (s = (s + Math.imul(g, ne)) | 0);
          var Ee =
            (((c + (n = (n + Math.imul(h, se)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, oe)) | 0) + Math.imul(d, se)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(d, oe)) | 0) + (i >>> 13)) | 0) +
              (Ee >>> 26)) |
            0),
            (Ee &= 67108863),
            (n = Math.imul(N, $)),
            (i = ((i = Math.imul(N, H)) + Math.imul(P, $)) | 0),
            (s = Math.imul(P, H)),
            (n = (n + Math.imul(A, q)) | 0),
            (i = ((i = (i + Math.imul(A, V)) | 0) + Math.imul(x, q)) | 0),
            (s = (s + Math.imul(x, V)) | 0),
            (n = (n + Math.imul(C, G)) | 0),
            (i = ((i = (i + Math.imul(C, J)) | 0) + Math.imul(R, G)) | 0),
            (s = (s + Math.imul(R, J)) | 0),
            (n = (n + Math.imul(k, K)) | 0),
            (i = ((i = (i + Math.imul(k, Y)) | 0) + Math.imul(S, K)) | 0),
            (s = (s + Math.imul(S, Y)) | 0),
            (n = (n + Math.imul(b, X)) | 0),
            (i = ((i = (i + Math.imul(b, ee)) | 0) + Math.imul(w, X)) | 0),
            (s = (s + Math.imul(w, ee)) | 0),
            (n = (n + Math.imul(_, re)) | 0),
            (i = ((i = (i + Math.imul(_, ne)) | 0) + Math.imul(v, re)) | 0),
            (s = (s + Math.imul(v, ne)) | 0),
            (n = (n + Math.imul(p, se)) | 0),
            (i = ((i = (i + Math.imul(p, oe)) | 0) + Math.imul(g, se)) | 0),
            (s = (s + Math.imul(g, oe)) | 0);
          var ke =
            (((c + (n = (n + Math.imul(h, le)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, ce)) | 0) + Math.imul(d, le)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(d, ce)) | 0) + (i >>> 13)) | 0) +
              (ke >>> 26)) |
            0),
            (ke &= 67108863),
            (n = Math.imul(O, $)),
            (i = ((i = Math.imul(O, H)) + Math.imul(B, $)) | 0),
            (s = Math.imul(B, H)),
            (n = (n + Math.imul(N, q)) | 0),
            (i = ((i = (i + Math.imul(N, V)) | 0) + Math.imul(P, q)) | 0),
            (s = (s + Math.imul(P, V)) | 0),
            (n = (n + Math.imul(A, G)) | 0),
            (i = ((i = (i + Math.imul(A, J)) | 0) + Math.imul(x, G)) | 0),
            (s = (s + Math.imul(x, J)) | 0),
            (n = (n + Math.imul(C, K)) | 0),
            (i = ((i = (i + Math.imul(C, Y)) | 0) + Math.imul(R, K)) | 0),
            (s = (s + Math.imul(R, Y)) | 0),
            (n = (n + Math.imul(k, X)) | 0),
            (i = ((i = (i + Math.imul(k, ee)) | 0) + Math.imul(S, X)) | 0),
            (s = (s + Math.imul(S, ee)) | 0),
            (n = (n + Math.imul(b, re)) | 0),
            (i = ((i = (i + Math.imul(b, ne)) | 0) + Math.imul(w, re)) | 0),
            (s = (s + Math.imul(w, ne)) | 0),
            (n = (n + Math.imul(_, se)) | 0),
            (i = ((i = (i + Math.imul(_, oe)) | 0) + Math.imul(v, se)) | 0),
            (s = (s + Math.imul(v, oe)) | 0),
            (n = (n + Math.imul(p, le)) | 0),
            (i = ((i = (i + Math.imul(p, ce)) | 0) + Math.imul(g, le)) | 0),
            (s = (s + Math.imul(g, ce)) | 0);
          var Se =
            (((c + (n = (n + Math.imul(h, he)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, de)) | 0) + Math.imul(d, he)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(d, de)) | 0) + (i >>> 13)) | 0) +
              (Se >>> 26)) |
            0),
            (Se &= 67108863),
            (n = Math.imul(D, $)),
            (i = ((i = Math.imul(D, H)) + Math.imul(F, $)) | 0),
            (s = Math.imul(F, H)),
            (n = (n + Math.imul(O, q)) | 0),
            (i = ((i = (i + Math.imul(O, V)) | 0) + Math.imul(B, q)) | 0),
            (s = (s + Math.imul(B, V)) | 0),
            (n = (n + Math.imul(N, G)) | 0),
            (i = ((i = (i + Math.imul(N, J)) | 0) + Math.imul(P, G)) | 0),
            (s = (s + Math.imul(P, J)) | 0),
            (n = (n + Math.imul(A, K)) | 0),
            (i = ((i = (i + Math.imul(A, Y)) | 0) + Math.imul(x, K)) | 0),
            (s = (s + Math.imul(x, Y)) | 0),
            (n = (n + Math.imul(C, X)) | 0),
            (i = ((i = (i + Math.imul(C, ee)) | 0) + Math.imul(R, X)) | 0),
            (s = (s + Math.imul(R, ee)) | 0),
            (n = (n + Math.imul(k, re)) | 0),
            (i = ((i = (i + Math.imul(k, ne)) | 0) + Math.imul(S, re)) | 0),
            (s = (s + Math.imul(S, ne)) | 0),
            (n = (n + Math.imul(b, se)) | 0),
            (i = ((i = (i + Math.imul(b, oe)) | 0) + Math.imul(w, se)) | 0),
            (s = (s + Math.imul(w, oe)) | 0),
            (n = (n + Math.imul(_, le)) | 0),
            (i = ((i = (i + Math.imul(_, ce)) | 0) + Math.imul(v, le)) | 0),
            (s = (s + Math.imul(v, ce)) | 0),
            (n = (n + Math.imul(p, he)) | 0),
            (i = ((i = (i + Math.imul(p, de)) | 0) + Math.imul(g, he)) | 0),
            (s = (s + Math.imul(g, de)) | 0);
          var Me =
            (((c + (n = (n + Math.imul(h, pe)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, ge)) | 0) + Math.imul(d, pe)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(d, ge)) | 0) + (i >>> 13)) | 0) +
              (Me >>> 26)) |
            0),
            (Me &= 67108863),
            (n = Math.imul(D, q)),
            (i = ((i = Math.imul(D, V)) + Math.imul(F, q)) | 0),
            (s = Math.imul(F, V)),
            (n = (n + Math.imul(O, G)) | 0),
            (i = ((i = (i + Math.imul(O, J)) | 0) + Math.imul(B, G)) | 0),
            (s = (s + Math.imul(B, J)) | 0),
            (n = (n + Math.imul(N, K)) | 0),
            (i = ((i = (i + Math.imul(N, Y)) | 0) + Math.imul(P, K)) | 0),
            (s = (s + Math.imul(P, Y)) | 0),
            (n = (n + Math.imul(A, X)) | 0),
            (i = ((i = (i + Math.imul(A, ee)) | 0) + Math.imul(x, X)) | 0),
            (s = (s + Math.imul(x, ee)) | 0),
            (n = (n + Math.imul(C, re)) | 0),
            (i = ((i = (i + Math.imul(C, ne)) | 0) + Math.imul(R, re)) | 0),
            (s = (s + Math.imul(R, ne)) | 0),
            (n = (n + Math.imul(k, se)) | 0),
            (i = ((i = (i + Math.imul(k, oe)) | 0) + Math.imul(S, se)) | 0),
            (s = (s + Math.imul(S, oe)) | 0),
            (n = (n + Math.imul(b, le)) | 0),
            (i = ((i = (i + Math.imul(b, ce)) | 0) + Math.imul(w, le)) | 0),
            (s = (s + Math.imul(w, ce)) | 0),
            (n = (n + Math.imul(_, he)) | 0),
            (i = ((i = (i + Math.imul(_, de)) | 0) + Math.imul(v, he)) | 0),
            (s = (s + Math.imul(v, de)) | 0);
          var Ce =
            (((c + (n = (n + Math.imul(p, pe)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(p, ge)) | 0) + Math.imul(g, pe)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(g, ge)) | 0) + (i >>> 13)) | 0) +
              (Ce >>> 26)) |
            0),
            (Ce &= 67108863),
            (n = Math.imul(D, G)),
            (i = ((i = Math.imul(D, J)) + Math.imul(F, G)) | 0),
            (s = Math.imul(F, J)),
            (n = (n + Math.imul(O, K)) | 0),
            (i = ((i = (i + Math.imul(O, Y)) | 0) + Math.imul(B, K)) | 0),
            (s = (s + Math.imul(B, Y)) | 0),
            (n = (n + Math.imul(N, X)) | 0),
            (i = ((i = (i + Math.imul(N, ee)) | 0) + Math.imul(P, X)) | 0),
            (s = (s + Math.imul(P, ee)) | 0),
            (n = (n + Math.imul(A, re)) | 0),
            (i = ((i = (i + Math.imul(A, ne)) | 0) + Math.imul(x, re)) | 0),
            (s = (s + Math.imul(x, ne)) | 0),
            (n = (n + Math.imul(C, se)) | 0),
            (i = ((i = (i + Math.imul(C, oe)) | 0) + Math.imul(R, se)) | 0),
            (s = (s + Math.imul(R, oe)) | 0),
            (n = (n + Math.imul(k, le)) | 0),
            (i = ((i = (i + Math.imul(k, ce)) | 0) + Math.imul(S, le)) | 0),
            (s = (s + Math.imul(S, ce)) | 0),
            (n = (n + Math.imul(b, he)) | 0),
            (i = ((i = (i + Math.imul(b, de)) | 0) + Math.imul(w, he)) | 0),
            (s = (s + Math.imul(w, de)) | 0);
          var Re =
            (((c + (n = (n + Math.imul(_, pe)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(_, ge)) | 0) + Math.imul(v, pe)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(v, ge)) | 0) + (i >>> 13)) | 0) +
              (Re >>> 26)) |
            0),
            (Re &= 67108863),
            (n = Math.imul(D, K)),
            (i = ((i = Math.imul(D, Y)) + Math.imul(F, K)) | 0),
            (s = Math.imul(F, Y)),
            (n = (n + Math.imul(O, X)) | 0),
            (i = ((i = (i + Math.imul(O, ee)) | 0) + Math.imul(B, X)) | 0),
            (s = (s + Math.imul(B, ee)) | 0),
            (n = (n + Math.imul(N, re)) | 0),
            (i = ((i = (i + Math.imul(N, ne)) | 0) + Math.imul(P, re)) | 0),
            (s = (s + Math.imul(P, ne)) | 0),
            (n = (n + Math.imul(A, se)) | 0),
            (i = ((i = (i + Math.imul(A, oe)) | 0) + Math.imul(x, se)) | 0),
            (s = (s + Math.imul(x, oe)) | 0),
            (n = (n + Math.imul(C, le)) | 0),
            (i = ((i = (i + Math.imul(C, ce)) | 0) + Math.imul(R, le)) | 0),
            (s = (s + Math.imul(R, ce)) | 0),
            (n = (n + Math.imul(k, he)) | 0),
            (i = ((i = (i + Math.imul(k, de)) | 0) + Math.imul(S, he)) | 0),
            (s = (s + Math.imul(S, de)) | 0);
          var Ie =
            (((c + (n = (n + Math.imul(b, pe)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(b, ge)) | 0) + Math.imul(w, pe)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(w, ge)) | 0) + (i >>> 13)) | 0) +
              (Ie >>> 26)) |
            0),
            (Ie &= 67108863),
            (n = Math.imul(D, X)),
            (i = ((i = Math.imul(D, ee)) + Math.imul(F, X)) | 0),
            (s = Math.imul(F, ee)),
            (n = (n + Math.imul(O, re)) | 0),
            (i = ((i = (i + Math.imul(O, ne)) | 0) + Math.imul(B, re)) | 0),
            (s = (s + Math.imul(B, ne)) | 0),
            (n = (n + Math.imul(N, se)) | 0),
            (i = ((i = (i + Math.imul(N, oe)) | 0) + Math.imul(P, se)) | 0),
            (s = (s + Math.imul(P, oe)) | 0),
            (n = (n + Math.imul(A, le)) | 0),
            (i = ((i = (i + Math.imul(A, ce)) | 0) + Math.imul(x, le)) | 0),
            (s = (s + Math.imul(x, ce)) | 0),
            (n = (n + Math.imul(C, he)) | 0),
            (i = ((i = (i + Math.imul(C, de)) | 0) + Math.imul(R, he)) | 0),
            (s = (s + Math.imul(R, de)) | 0);
          var Ae =
            (((c + (n = (n + Math.imul(k, pe)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(k, ge)) | 0) + Math.imul(S, pe)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(S, ge)) | 0) + (i >>> 13)) | 0) +
              (Ae >>> 26)) |
            0),
            (Ae &= 67108863),
            (n = Math.imul(D, re)),
            (i = ((i = Math.imul(D, ne)) + Math.imul(F, re)) | 0),
            (s = Math.imul(F, ne)),
            (n = (n + Math.imul(O, se)) | 0),
            (i = ((i = (i + Math.imul(O, oe)) | 0) + Math.imul(B, se)) | 0),
            (s = (s + Math.imul(B, oe)) | 0),
            (n = (n + Math.imul(N, le)) | 0),
            (i = ((i = (i + Math.imul(N, ce)) | 0) + Math.imul(P, le)) | 0),
            (s = (s + Math.imul(P, ce)) | 0),
            (n = (n + Math.imul(A, he)) | 0),
            (i = ((i = (i + Math.imul(A, de)) | 0) + Math.imul(x, he)) | 0),
            (s = (s + Math.imul(x, de)) | 0);
          var xe =
            (((c + (n = (n + Math.imul(C, pe)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(C, ge)) | 0) + Math.imul(R, pe)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(R, ge)) | 0) + (i >>> 13)) | 0) +
              (xe >>> 26)) |
            0),
            (xe &= 67108863),
            (n = Math.imul(D, se)),
            (i = ((i = Math.imul(D, oe)) + Math.imul(F, se)) | 0),
            (s = Math.imul(F, oe)),
            (n = (n + Math.imul(O, le)) | 0),
            (i = ((i = (i + Math.imul(O, ce)) | 0) + Math.imul(B, le)) | 0),
            (s = (s + Math.imul(B, ce)) | 0),
            (n = (n + Math.imul(N, he)) | 0),
            (i = ((i = (i + Math.imul(N, de)) | 0) + Math.imul(P, he)) | 0),
            (s = (s + Math.imul(P, de)) | 0);
          var Le =
            (((c + (n = (n + Math.imul(A, pe)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(A, ge)) | 0) + Math.imul(x, pe)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(x, ge)) | 0) + (i >>> 13)) | 0) +
              (Le >>> 26)) |
            0),
            (Le &= 67108863),
            (n = Math.imul(D, le)),
            (i = ((i = Math.imul(D, ce)) + Math.imul(F, le)) | 0),
            (s = Math.imul(F, ce)),
            (n = (n + Math.imul(O, he)) | 0),
            (i = ((i = (i + Math.imul(O, de)) | 0) + Math.imul(B, he)) | 0),
            (s = (s + Math.imul(B, de)) | 0);
          var Ne =
            (((c + (n = (n + Math.imul(N, pe)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(N, ge)) | 0) + Math.imul(P, pe)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(P, ge)) | 0) + (i >>> 13)) | 0) +
              (Ne >>> 26)) |
            0),
            (Ne &= 67108863),
            (n = Math.imul(D, he)),
            (i = ((i = Math.imul(D, de)) + Math.imul(F, he)) | 0),
            (s = Math.imul(F, de));
          var Pe =
            (((c + (n = (n + Math.imul(O, pe)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(O, ge)) | 0) + Math.imul(B, pe)) | 0)) <<
                13)) |
            0;
          (c =
            ((((s = (s + Math.imul(B, ge)) | 0) + (i >>> 13)) | 0) +
              (Pe >>> 26)) |
            0),
            (Pe &= 67108863);
          var Te =
            (((c + (n = Math.imul(D, pe))) | 0) +
              ((8191 & (i = ((i = Math.imul(D, ge)) + Math.imul(F, pe)) | 0)) <<
                13)) |
            0;
          return (
            (c =
              ((((s = Math.imul(F, ge)) + (i >>> 13)) | 0) + (Te >>> 26)) | 0),
            (Te &= 67108863),
            (l[0] = me),
            (l[1] = _e),
            (l[2] = ve),
            (l[3] = ye),
            (l[4] = be),
            (l[5] = we),
            (l[6] = Ee),
            (l[7] = ke),
            (l[8] = Se),
            (l[9] = Me),
            (l[10] = Ce),
            (l[11] = Re),
            (l[12] = Ie),
            (l[13] = Ae),
            (l[14] = xe),
            (l[15] = Le),
            (l[16] = Ne),
            (l[17] = Pe),
            (l[18] = Te),
            0 !== c && ((l[19] = c), r.length++),
            r
          );
        };
        function _(e, t, r) {
          (r.negative = t.negative ^ e.negative),
            (r.length = e.length + t.length);
          for (var n = 0, i = 0, s = 0; s < r.length - 1; s++) {
            var o = i;
            i = 0;
            for (
              var a = 67108863 & n,
                l = Math.min(s, t.length - 1),
                c = Math.max(0, s - e.length + 1);
              c <= l;
              c++
            ) {
              var u = s - c,
                h = (0 | e.words[u]) * (0 | t.words[c]),
                d = 67108863 & h;
              (a = 67108863 & (d = (d + a) | 0)),
                (i +=
                  (o =
                    ((o = (o + ((h / 67108864) | 0)) | 0) + (d >>> 26)) | 0) >>>
                  26),
                (o &= 67108863);
            }
            (r.words[s] = a), (n = o), (o = i);
          }
          return 0 !== n ? (r.words[s] = n) : r.length--, r._strip();
        }
        function v(e, t, r) {
          return _(e, t, r);
        }
        function y(e, t) {
          (this.x = e), (this.y = t);
        }
        Math.imul || (m = g),
          (s.prototype.mulTo = function (e, t) {
            var r = this.length + e.length;
            return 10 === this.length && 10 === e.length
              ? m(this, e, t)
              : r < 63
              ? g(this, e, t)
              : r < 1024
              ? _(this, e, t)
              : v(this, e, t);
          }),
          (y.prototype.makeRBT = function (e) {
            for (
              var t = new Array(e), r = s.prototype._countBits(e) - 1, n = 0;
              n < e;
              n++
            )
              t[n] = this.revBin(n, r, e);
            return t;
          }),
          (y.prototype.revBin = function (e, t, r) {
            if (0 === e || e === r - 1) return e;
            for (var n = 0, i = 0; i < t; i++)
              (n |= (1 & e) << (t - i - 1)), (e >>= 1);
            return n;
          }),
          (y.prototype.permute = function (e, t, r, n, i, s) {
            for (var o = 0; o < s; o++) (n[o] = t[e[o]]), (i[o] = r[e[o]]);
          }),
          (y.prototype.transform = function (e, t, r, n, i, s) {
            this.permute(s, e, t, r, n, i);
            for (var o = 1; o < i; o <<= 1)
              for (
                var a = o << 1,
                  l = Math.cos((2 * Math.PI) / a),
                  c = Math.sin((2 * Math.PI) / a),
                  u = 0;
                u < i;
                u += a
              )
                for (var h = l, d = c, f = 0; f < o; f++) {
                  var p = r[u + f],
                    g = n[u + f],
                    m = r[u + f + o],
                    _ = n[u + f + o],
                    v = h * m - d * _;
                  (_ = h * _ + d * m),
                    (m = v),
                    (r[u + f] = p + m),
                    (n[u + f] = g + _),
                    (r[u + f + o] = p - m),
                    (n[u + f + o] = g - _),
                    f !== a &&
                      ((v = l * h - c * d), (d = l * d + c * h), (h = v));
                }
          }),
          (y.prototype.guessLen13b = function (e, t) {
            var r = 1 | Math.max(t, e),
              n = 1 & r,
              i = 0;
            for (r = (r / 2) | 0; r; r >>>= 1) i++;
            return 1 << (i + 1 + n);
          }),
          (y.prototype.conjugate = function (e, t, r) {
            if (!(r <= 1))
              for (var n = 0; n < r / 2; n++) {
                var i = e[n];
                (e[n] = e[r - n - 1]),
                  (e[r - n - 1] = i),
                  (i = t[n]),
                  (t[n] = -t[r - n - 1]),
                  (t[r - n - 1] = -i);
              }
          }),
          (y.prototype.normalize13b = function (e, t) {
            for (var r = 0, n = 0; n < t / 2; n++) {
              var i =
                8192 * Math.round(e[2 * n + 1] / t) +
                Math.round(e[2 * n] / t) +
                r;
              (e[n] = 67108863 & i),
                (r = i < 67108864 ? 0 : (i / 67108864) | 0);
            }
            return e;
          }),
          (y.prototype.convert13b = function (e, t, r, i) {
            for (var s = 0, o = 0; o < t; o++)
              (s += 0 | e[o]),
                (r[2 * o] = 8191 & s),
                (s >>>= 13),
                (r[2 * o + 1] = 8191 & s),
                (s >>>= 13);
            for (o = 2 * t; o < i; ++o) r[o] = 0;
            n(0 === s), n(0 === (-8192 & s));
          }),
          (y.prototype.stub = function (e) {
            for (var t = new Array(e), r = 0; r < e; r++) t[r] = 0;
            return t;
          }),
          (y.prototype.mulp = function (e, t, r) {
            var n = 2 * this.guessLen13b(e.length, t.length),
              i = this.makeRBT(n),
              s = this.stub(n),
              o = new Array(n),
              a = new Array(n),
              l = new Array(n),
              c = new Array(n),
              u = new Array(n),
              h = new Array(n),
              d = r.words;
            (d.length = n),
              this.convert13b(e.words, e.length, o, n),
              this.convert13b(t.words, t.length, c, n),
              this.transform(o, s, a, l, n, i),
              this.transform(c, s, u, h, n, i);
            for (var f = 0; f < n; f++) {
              var p = a[f] * u[f] - l[f] * h[f];
              (l[f] = a[f] * h[f] + l[f] * u[f]), (a[f] = p);
            }
            return (
              this.conjugate(a, l, n),
              this.transform(a, l, d, s, n, i),
              this.conjugate(d, s, n),
              this.normalize13b(d, n),
              (r.negative = e.negative ^ t.negative),
              (r.length = e.length + t.length),
              r._strip()
            );
          }),
          (s.prototype.mul = function (e) {
            var t = new s(null);
            return (
              (t.words = new Array(this.length + e.length)), this.mulTo(e, t)
            );
          }),
          (s.prototype.mulf = function (e) {
            var t = new s(null);
            return (t.words = new Array(this.length + e.length)), v(this, e, t);
          }),
          (s.prototype.imul = function (e) {
            return this.clone().mulTo(e, this);
          }),
          (s.prototype.imuln = function (e) {
            var t = e < 0;
            t && (e = -e), n("number" === typeof e), n(e < 67108864);
            for (var r = 0, i = 0; i < this.length; i++) {
              var s = (0 | this.words[i]) * e,
                o = (67108863 & s) + (67108863 & r);
              (r >>= 26),
                (r += (s / 67108864) | 0),
                (r += o >>> 26),
                (this.words[i] = 67108863 & o);
            }
            return (
              0 !== r && ((this.words[i] = r), this.length++),
              t ? this.ineg() : this
            );
          }),
          (s.prototype.muln = function (e) {
            return this.clone().imuln(e);
          }),
          (s.prototype.sqr = function () {
            return this.mul(this);
          }),
          (s.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (s.prototype.pow = function (e) {
            var t = (function (e) {
              for (var t = new Array(e.bitLength()), r = 0; r < t.length; r++) {
                var n = (r / 26) | 0,
                  i = r % 26;
                t[r] = (e.words[n] >>> i) & 1;
              }
              return t;
            })(e);
            if (0 === t.length) return new s(1);
            for (
              var r = this, n = 0;
              n < t.length && 0 === t[n];
              n++, r = r.sqr()
            );
            if (++n < t.length)
              for (var i = r.sqr(); n < t.length; n++, i = i.sqr())
                0 !== t[n] && (r = r.mul(i));
            return r;
          }),
          (s.prototype.iushln = function (e) {
            n("number" === typeof e && e >= 0);
            var t,
              r = e % 26,
              i = (e - r) / 26,
              s = (67108863 >>> (26 - r)) << (26 - r);
            if (0 !== r) {
              var o = 0;
              for (t = 0; t < this.length; t++) {
                var a = this.words[t] & s,
                  l = ((0 | this.words[t]) - a) << r;
                (this.words[t] = l | o), (o = a >>> (26 - r));
              }
              o && ((this.words[t] = o), this.length++);
            }
            if (0 !== i) {
              for (t = this.length - 1; t >= 0; t--)
                this.words[t + i] = this.words[t];
              for (t = 0; t < i; t++) this.words[t] = 0;
              this.length += i;
            }
            return this._strip();
          }),
          (s.prototype.ishln = function (e) {
            return n(0 === this.negative), this.iushln(e);
          }),
          (s.prototype.iushrn = function (e, t, r) {
            var i;
            n("number" === typeof e && e >= 0),
              (i = t ? (t - (t % 26)) / 26 : 0);
            var s = e % 26,
              o = Math.min((e - s) / 26, this.length),
              a = 67108863 ^ ((67108863 >>> s) << s),
              l = r;
            if (((i -= o), (i = Math.max(0, i)), l)) {
              for (var c = 0; c < o; c++) l.words[c] = this.words[c];
              l.length = o;
            }
            if (0 === o);
            else if (this.length > o)
              for (this.length -= o, c = 0; c < this.length; c++)
                this.words[c] = this.words[c + o];
            else (this.words[0] = 0), (this.length = 1);
            var u = 0;
            for (c = this.length - 1; c >= 0 && (0 !== u || c >= i); c--) {
              var h = 0 | this.words[c];
              (this.words[c] = (u << (26 - s)) | (h >>> s)), (u = h & a);
            }
            return (
              l && 0 !== u && (l.words[l.length++] = u),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this._strip()
            );
          }),
          (s.prototype.ishrn = function (e, t, r) {
            return n(0 === this.negative), this.iushrn(e, t, r);
          }),
          (s.prototype.shln = function (e) {
            return this.clone().ishln(e);
          }),
          (s.prototype.ushln = function (e) {
            return this.clone().iushln(e);
          }),
          (s.prototype.shrn = function (e) {
            return this.clone().ishrn(e);
          }),
          (s.prototype.ushrn = function (e) {
            return this.clone().iushrn(e);
          }),
          (s.prototype.testn = function (e) {
            n("number" === typeof e && e >= 0);
            var t = e % 26,
              r = (e - t) / 26,
              i = 1 << t;
            return !(this.length <= r) && !!(this.words[r] & i);
          }),
          (s.prototype.imaskn = function (e) {
            n("number" === typeof e && e >= 0);
            var t = e % 26,
              r = (e - t) / 26;
            if (
              (n(
                0 === this.negative,
                "imaskn works only with positive numbers"
              ),
              this.length <= r)
            )
              return this;
            if (
              (0 !== t && r++,
              (this.length = Math.min(r, this.length)),
              0 !== t)
            ) {
              var i = 67108863 ^ ((67108863 >>> t) << t);
              this.words[this.length - 1] &= i;
            }
            return this._strip();
          }),
          (s.prototype.maskn = function (e) {
            return this.clone().imaskn(e);
          }),
          (s.prototype.iaddn = function (e) {
            return (
              n("number" === typeof e),
              n(e < 67108864),
              e < 0
                ? this.isubn(-e)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) <= e
                  ? ((this.words[0] = e - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(e),
                    (this.negative = 1),
                    this)
                : this._iaddn(e)
            );
          }),
          (s.prototype._iaddn = function (e) {
            this.words[0] += e;
            for (var t = 0; t < this.length && this.words[t] >= 67108864; t++)
              (this.words[t] -= 67108864),
                t === this.length - 1
                  ? (this.words[t + 1] = 1)
                  : this.words[t + 1]++;
            return (this.length = Math.max(this.length, t + 1)), this;
          }),
          (s.prototype.isubn = function (e) {
            if ((n("number" === typeof e), n(e < 67108864), e < 0))
              return this.iaddn(-e);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(e), (this.negative = 1), this
              );
            if (((this.words[0] -= e), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var t = 0; t < this.length && this.words[t] < 0; t++)
                (this.words[t] += 67108864), (this.words[t + 1] -= 1);
            return this._strip();
          }),
          (s.prototype.addn = function (e) {
            return this.clone().iaddn(e);
          }),
          (s.prototype.subn = function (e) {
            return this.clone().isubn(e);
          }),
          (s.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (s.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (s.prototype._ishlnsubmul = function (e, t, r) {
            var i,
              s,
              o = e.length + r;
            this._expand(o);
            var a = 0;
            for (i = 0; i < e.length; i++) {
              s = (0 | this.words[i + r]) + a;
              var l = (0 | e.words[i]) * t;
              (a = ((s -= 67108863 & l) >> 26) - ((l / 67108864) | 0)),
                (this.words[i + r] = 67108863 & s);
            }
            for (; i < this.length - r; i++)
              (a = (s = (0 | this.words[i + r]) + a) >> 26),
                (this.words[i + r] = 67108863 & s);
            if (0 === a) return this._strip();
            for (n(-1 === a), a = 0, i = 0; i < this.length; i++)
              (a = (s = -(0 | this.words[i]) + a) >> 26),
                (this.words[i] = 67108863 & s);
            return (this.negative = 1), this._strip();
          }),
          (s.prototype._wordDiv = function (e, t) {
            var r = (this.length, e.length),
              n = this.clone(),
              i = e,
              o = 0 | i.words[i.length - 1];
            0 !== (r = 26 - this._countBits(o)) &&
              ((i = i.ushln(r)), n.iushln(r), (o = 0 | i.words[i.length - 1]));
            var a,
              l = n.length - i.length;
            if ("mod" !== t) {
              ((a = new s(null)).length = l + 1),
                (a.words = new Array(a.length));
              for (var c = 0; c < a.length; c++) a.words[c] = 0;
            }
            var u = n.clone()._ishlnsubmul(i, 1, l);
            0 === u.negative && ((n = u), a && (a.words[l] = 1));
            for (var h = l - 1; h >= 0; h--) {
              var d =
                67108864 * (0 | n.words[i.length + h]) +
                (0 | n.words[i.length + h - 1]);
              for (
                d = Math.min((d / o) | 0, 67108863), n._ishlnsubmul(i, d, h);
                0 !== n.negative;

              )
                d--,
                  (n.negative = 0),
                  n._ishlnsubmul(i, 1, h),
                  n.isZero() || (n.negative ^= 1);
              a && (a.words[h] = d);
            }
            return (
              a && a._strip(),
              n._strip(),
              "div" !== t && 0 !== r && n.iushrn(r),
              { div: a || null, mod: n }
            );
          }),
          (s.prototype.divmod = function (e, t, r) {
            return (
              n(!e.isZero()),
              this.isZero()
                ? { div: new s(0), mod: new s(0) }
                : 0 !== this.negative && 0 === e.negative
                ? ((a = this.neg().divmod(e, t)),
                  "mod" !== t && (i = a.div.neg()),
                  "div" !== t &&
                    ((o = a.mod.neg()), r && 0 !== o.negative && o.iadd(e)),
                  { div: i, mod: o })
                : 0 === this.negative && 0 !== e.negative
                ? ((a = this.divmod(e.neg(), t)),
                  "mod" !== t && (i = a.div.neg()),
                  { div: i, mod: a.mod })
                : 0 !== (this.negative & e.negative)
                ? ((a = this.neg().divmod(e.neg(), t)),
                  "div" !== t &&
                    ((o = a.mod.neg()), r && 0 !== o.negative && o.isub(e)),
                  { div: a.div, mod: o })
                : e.length > this.length || this.cmp(e) < 0
                ? { div: new s(0), mod: this }
                : 1 === e.length
                ? "div" === t
                  ? { div: this.divn(e.words[0]), mod: null }
                  : "mod" === t
                  ? { div: null, mod: new s(this.modrn(e.words[0])) }
                  : {
                      div: this.divn(e.words[0]),
                      mod: new s(this.modrn(e.words[0])),
                    }
                : this._wordDiv(e, t)
            );
            var i, o, a;
          }),
          (s.prototype.div = function (e) {
            return this.divmod(e, "div", !1).div;
          }),
          (s.prototype.mod = function (e) {
            return this.divmod(e, "mod", !1).mod;
          }),
          (s.prototype.umod = function (e) {
            return this.divmod(e, "mod", !0).mod;
          }),
          (s.prototype.divRound = function (e) {
            var t = this.divmod(e);
            if (t.mod.isZero()) return t.div;
            var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod,
              n = e.ushrn(1),
              i = e.andln(1),
              s = r.cmp(n);
            return s < 0 || (1 === i && 0 === s)
              ? t.div
              : 0 !== t.div.negative
              ? t.div.isubn(1)
              : t.div.iaddn(1);
          }),
          (s.prototype.modrn = function (e) {
            var t = e < 0;
            t && (e = -e), n(e <= 67108863);
            for (var r = (1 << 26) % e, i = 0, s = this.length - 1; s >= 0; s--)
              i = (r * i + (0 | this.words[s])) % e;
            return t ? -i : i;
          }),
          (s.prototype.modn = function (e) {
            return this.modrn(e);
          }),
          (s.prototype.idivn = function (e) {
            var t = e < 0;
            t && (e = -e), n(e <= 67108863);
            for (var r = 0, i = this.length - 1; i >= 0; i--) {
              var s = (0 | this.words[i]) + 67108864 * r;
              (this.words[i] = (s / e) | 0), (r = s % e);
            }
            return this._strip(), t ? this.ineg() : this;
          }),
          (s.prototype.divn = function (e) {
            return this.clone().idivn(e);
          }),
          (s.prototype.egcd = function (e) {
            n(0 === e.negative), n(!e.isZero());
            var t = this,
              r = e.clone();
            t = 0 !== t.negative ? t.umod(e) : t.clone();
            for (
              var i = new s(1), o = new s(0), a = new s(0), l = new s(1), c = 0;
              t.isEven() && r.isEven();

            )
              t.iushrn(1), r.iushrn(1), ++c;
            for (var u = r.clone(), h = t.clone(); !t.isZero(); ) {
              for (
                var d = 0, f = 1;
                0 === (t.words[0] & f) && d < 26;
                ++d, f <<= 1
              );
              if (d > 0)
                for (t.iushrn(d); d-- > 0; )
                  (i.isOdd() || o.isOdd()) && (i.iadd(u), o.isub(h)),
                    i.iushrn(1),
                    o.iushrn(1);
              for (
                var p = 0, g = 1;
                0 === (r.words[0] & g) && p < 26;
                ++p, g <<= 1
              );
              if (p > 0)
                for (r.iushrn(p); p-- > 0; )
                  (a.isOdd() || l.isOdd()) && (a.iadd(u), l.isub(h)),
                    a.iushrn(1),
                    l.iushrn(1);
              t.cmp(r) >= 0
                ? (t.isub(r), i.isub(a), o.isub(l))
                : (r.isub(t), a.isub(i), l.isub(o));
            }
            return { a: a, b: l, gcd: r.iushln(c) };
          }),
          (s.prototype._invmp = function (e) {
            n(0 === e.negative), n(!e.isZero());
            var t = this,
              r = e.clone();
            t = 0 !== t.negative ? t.umod(e) : t.clone();
            for (
              var i, o = new s(1), a = new s(0), l = r.clone();
              t.cmpn(1) > 0 && r.cmpn(1) > 0;

            ) {
              for (
                var c = 0, u = 1;
                0 === (t.words[0] & u) && c < 26;
                ++c, u <<= 1
              );
              if (c > 0)
                for (t.iushrn(c); c-- > 0; )
                  o.isOdd() && o.iadd(l), o.iushrn(1);
              for (
                var h = 0, d = 1;
                0 === (r.words[0] & d) && h < 26;
                ++h, d <<= 1
              );
              if (h > 0)
                for (r.iushrn(h); h-- > 0; )
                  a.isOdd() && a.iadd(l), a.iushrn(1);
              t.cmp(r) >= 0 ? (t.isub(r), o.isub(a)) : (r.isub(t), a.isub(o));
            }
            return (i = 0 === t.cmpn(1) ? o : a).cmpn(0) < 0 && i.iadd(e), i;
          }),
          (s.prototype.gcd = function (e) {
            if (this.isZero()) return e.abs();
            if (e.isZero()) return this.abs();
            var t = this.clone(),
              r = e.clone();
            (t.negative = 0), (r.negative = 0);
            for (var n = 0; t.isEven() && r.isEven(); n++)
              t.iushrn(1), r.iushrn(1);
            for (;;) {
              for (; t.isEven(); ) t.iushrn(1);
              for (; r.isEven(); ) r.iushrn(1);
              var i = t.cmp(r);
              if (i < 0) {
                var s = t;
                (t = r), (r = s);
              } else if (0 === i || 0 === r.cmpn(1)) break;
              t.isub(r);
            }
            return r.iushln(n);
          }),
          (s.prototype.invm = function (e) {
            return this.egcd(e).a.umod(e);
          }),
          (s.prototype.isEven = function () {
            return 0 === (1 & this.words[0]);
          }),
          (s.prototype.isOdd = function () {
            return 1 === (1 & this.words[0]);
          }),
          (s.prototype.andln = function (e) {
            return this.words[0] & e;
          }),
          (s.prototype.bincn = function (e) {
            n("number" === typeof e);
            var t = e % 26,
              r = (e - t) / 26,
              i = 1 << t;
            if (this.length <= r)
              return this._expand(r + 1), (this.words[r] |= i), this;
            for (var s = i, o = r; 0 !== s && o < this.length; o++) {
              var a = 0 | this.words[o];
              (s = (a += s) >>> 26), (a &= 67108863), (this.words[o] = a);
            }
            return 0 !== s && ((this.words[o] = s), this.length++), this;
          }),
          (s.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (s.prototype.cmpn = function (e) {
            var t,
              r = e < 0;
            if (0 !== this.negative && !r) return -1;
            if (0 === this.negative && r) return 1;
            if ((this._strip(), this.length > 1)) t = 1;
            else {
              r && (e = -e), n(e <= 67108863, "Number is too big");
              var i = 0 | this.words[0];
              t = i === e ? 0 : i < e ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -t : t;
          }),
          (s.prototype.cmp = function (e) {
            if (0 !== this.negative && 0 === e.negative) return -1;
            if (0 === this.negative && 0 !== e.negative) return 1;
            var t = this.ucmp(e);
            return 0 !== this.negative ? 0 | -t : t;
          }),
          (s.prototype.ucmp = function (e) {
            if (this.length > e.length) return 1;
            if (this.length < e.length) return -1;
            for (var t = 0, r = this.length - 1; r >= 0; r--) {
              var n = 0 | this.words[r],
                i = 0 | e.words[r];
              if (n !== i) {
                n < i ? (t = -1) : n > i && (t = 1);
                break;
              }
            }
            return t;
          }),
          (s.prototype.gtn = function (e) {
            return 1 === this.cmpn(e);
          }),
          (s.prototype.gt = function (e) {
            return 1 === this.cmp(e);
          }),
          (s.prototype.gten = function (e) {
            return this.cmpn(e) >= 0;
          }),
          (s.prototype.gte = function (e) {
            return this.cmp(e) >= 0;
          }),
          (s.prototype.ltn = function (e) {
            return -1 === this.cmpn(e);
          }),
          (s.prototype.lt = function (e) {
            return -1 === this.cmp(e);
          }),
          (s.prototype.lten = function (e) {
            return this.cmpn(e) <= 0;
          }),
          (s.prototype.lte = function (e) {
            return this.cmp(e) <= 0;
          }),
          (s.prototype.eqn = function (e) {
            return 0 === this.cmpn(e);
          }),
          (s.prototype.eq = function (e) {
            return 0 === this.cmp(e);
          }),
          (s.red = function (e) {
            return new C(e);
          }),
          (s.prototype.toRed = function (e) {
            return (
              n(!this.red, "Already a number in reduction context"),
              n(0 === this.negative, "red works only with positives"),
              e.convertTo(this)._forceRed(e)
            );
          }),
          (s.prototype.fromRed = function () {
            return (
              n(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (s.prototype._forceRed = function (e) {
            return (this.red = e), this;
          }),
          (s.prototype.forceRed = function (e) {
            return (
              n(!this.red, "Already a number in reduction context"),
              this._forceRed(e)
            );
          }),
          (s.prototype.redAdd = function (e) {
            return (
              n(this.red, "redAdd works only with red numbers"),
              this.red.add(this, e)
            );
          }),
          (s.prototype.redIAdd = function (e) {
            return (
              n(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, e)
            );
          }),
          (s.prototype.redSub = function (e) {
            return (
              n(this.red, "redSub works only with red numbers"),
              this.red.sub(this, e)
            );
          }),
          (s.prototype.redISub = function (e) {
            return (
              n(this.red, "redISub works only with red numbers"),
              this.red.isub(this, e)
            );
          }),
          (s.prototype.redShl = function (e) {
            return (
              n(this.red, "redShl works only with red numbers"),
              this.red.shl(this, e)
            );
          }),
          (s.prototype.redMul = function (e) {
            return (
              n(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, e),
              this.red.mul(this, e)
            );
          }),
          (s.prototype.redIMul = function (e) {
            return (
              n(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, e),
              this.red.imul(this, e)
            );
          }),
          (s.prototype.redSqr = function () {
            return (
              n(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (s.prototype.redISqr = function () {
            return (
              n(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (s.prototype.redSqrt = function () {
            return (
              n(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (s.prototype.redInvm = function () {
            return (
              n(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (s.prototype.redNeg = function () {
            return (
              n(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (s.prototype.redPow = function (e) {
            return (
              n(this.red && !e.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, e)
            );
          });
        var b = { k256: null, p224: null, p192: null, p25519: null };
        function w(e, t) {
          (this.name = e),
            (this.p = new s(t, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new s(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function E() {
          w.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function k() {
          w.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function S() {
          w.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function M() {
          w.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function C(e) {
          if ("string" === typeof e) {
            var t = s._prime(e);
            (this.m = t.p), (this.prime = t);
          } else
            n(e.gtn(1), "modulus must be greater than 1"),
              (this.m = e),
              (this.prime = null);
        }
        function R(e) {
          C.call(this, e),
            (this.shift = this.m.bitLength()),
            this.shift % 26 !== 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new s(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (w.prototype._tmp = function () {
          var e = new s(null);
          return (e.words = new Array(Math.ceil(this.n / 13))), e;
        }),
          (w.prototype.ireduce = function (e) {
            var t,
              r = e;
            do {
              this.split(r, this.tmp),
                (t = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength());
            } while (t > this.n);
            var n = t < this.n ? -1 : r.ucmp(this.p);
            return (
              0 === n
                ? ((r.words[0] = 0), (r.length = 1))
                : n > 0
                ? r.isub(this.p)
                : void 0 !== r.strip
                ? r.strip()
                : r._strip(),
              r
            );
          }),
          (w.prototype.split = function (e, t) {
            e.iushrn(this.n, 0, t);
          }),
          (w.prototype.imulK = function (e) {
            return e.imul(this.k);
          }),
          i(E, w),
          (E.prototype.split = function (e, t) {
            for (var r = 4194303, n = Math.min(e.length, 9), i = 0; i < n; i++)
              t.words[i] = e.words[i];
            if (((t.length = n), e.length <= 9))
              return (e.words[0] = 0), void (e.length = 1);
            var s = e.words[9];
            for (t.words[t.length++] = s & r, i = 10; i < e.length; i++) {
              var o = 0 | e.words[i];
              (e.words[i - 10] = ((o & r) << 4) | (s >>> 22)), (s = o);
            }
            (s >>>= 22),
              (e.words[i - 10] = s),
              0 === s && e.length > 10 ? (e.length -= 10) : (e.length -= 9);
          }),
          (E.prototype.imulK = function (e) {
            (e.words[e.length] = 0),
              (e.words[e.length + 1] = 0),
              (e.length += 2);
            for (var t = 0, r = 0; r < e.length; r++) {
              var n = 0 | e.words[r];
              (t += 977 * n),
                (e.words[r] = 67108863 & t),
                (t = 64 * n + ((t / 67108864) | 0));
            }
            return (
              0 === e.words[e.length - 1] &&
                (e.length--, 0 === e.words[e.length - 1] && e.length--),
              e
            );
          }),
          i(k, w),
          i(S, w),
          i(M, w),
          (M.prototype.imulK = function (e) {
            for (var t = 0, r = 0; r < e.length; r++) {
              var n = 19 * (0 | e.words[r]) + t,
                i = 67108863 & n;
              (n >>>= 26), (e.words[r] = i), (t = n);
            }
            return 0 !== t && (e.words[e.length++] = t), e;
          }),
          (s._prime = function (e) {
            if (b[e]) return b[e];
            var t;
            if ("k256" === e) t = new E();
            else if ("p224" === e) t = new k();
            else if ("p192" === e) t = new S();
            else {
              if ("p25519" !== e) throw new Error("Unknown prime " + e);
              t = new M();
            }
            return (b[e] = t), t;
          }),
          (C.prototype._verify1 = function (e) {
            n(0 === e.negative, "red works only with positives"),
              n(e.red, "red works only with red numbers");
          }),
          (C.prototype._verify2 = function (e, t) {
            n(0 === (e.negative | t.negative), "red works only with positives"),
              n(e.red && e.red === t.red, "red works only with red numbers");
          }),
          (C.prototype.imod = function (e) {
            return this.prime
              ? this.prime.ireduce(e)._forceRed(this)
              : (u(e, e.umod(this.m)._forceRed(this)), e);
          }),
          (C.prototype.neg = function (e) {
            return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
          }),
          (C.prototype.add = function (e, t) {
            this._verify2(e, t);
            var r = e.add(t);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this);
          }),
          (C.prototype.iadd = function (e, t) {
            this._verify2(e, t);
            var r = e.iadd(t);
            return r.cmp(this.m) >= 0 && r.isub(this.m), r;
          }),
          (C.prototype.sub = function (e, t) {
            this._verify2(e, t);
            var r = e.sub(t);
            return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this);
          }),
          (C.prototype.isub = function (e, t) {
            this._verify2(e, t);
            var r = e.isub(t);
            return r.cmpn(0) < 0 && r.iadd(this.m), r;
          }),
          (C.prototype.shl = function (e, t) {
            return this._verify1(e), this.imod(e.ushln(t));
          }),
          (C.prototype.imul = function (e, t) {
            return this._verify2(e, t), this.imod(e.imul(t));
          }),
          (C.prototype.mul = function (e, t) {
            return this._verify2(e, t), this.imod(e.mul(t));
          }),
          (C.prototype.isqr = function (e) {
            return this.imul(e, e.clone());
          }),
          (C.prototype.sqr = function (e) {
            return this.mul(e, e);
          }),
          (C.prototype.sqrt = function (e) {
            if (e.isZero()) return e.clone();
            var t = this.m.andln(3);
            if ((n(t % 2 === 1), 3 === t)) {
              var r = this.m.add(new s(1)).iushrn(2);
              return this.pow(e, r);
            }
            for (
              var i = this.m.subn(1), o = 0;
              !i.isZero() && 0 === i.andln(1);

            )
              o++, i.iushrn(1);
            n(!i.isZero());
            var a = new s(1).toRed(this),
              l = a.redNeg(),
              c = this.m.subn(1).iushrn(1),
              u = this.m.bitLength();
            for (
              u = new s(2 * u * u).toRed(this);
              0 !== this.pow(u, c).cmp(l);

            )
              u.redIAdd(l);
            for (
              var h = this.pow(u, i),
                d = this.pow(e, i.addn(1).iushrn(1)),
                f = this.pow(e, i),
                p = o;
              0 !== f.cmp(a);

            ) {
              for (var g = f, m = 0; 0 !== g.cmp(a); m++) g = g.redSqr();
              n(m < p);
              var _ = this.pow(h, new s(1).iushln(p - m - 1));
              (d = d.redMul(_)), (h = _.redSqr()), (f = f.redMul(h)), (p = m);
            }
            return d;
          }),
          (C.prototype.invm = function (e) {
            var t = e._invmp(this.m);
            return 0 !== t.negative
              ? ((t.negative = 0), this.imod(t).redNeg())
              : this.imod(t);
          }),
          (C.prototype.pow = function (e, t) {
            if (t.isZero()) return new s(1).toRed(this);
            if (0 === t.cmpn(1)) return e.clone();
            var r = new Array(16);
            (r[0] = new s(1).toRed(this)), (r[1] = e);
            for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], e);
            var i = r[0],
              o = 0,
              a = 0,
              l = t.bitLength() % 26;
            for (0 === l && (l = 26), n = t.length - 1; n >= 0; n--) {
              for (var c = t.words[n], u = l - 1; u >= 0; u--) {
                var h = (c >> u) & 1;
                i !== r[0] && (i = this.sqr(i)),
                  0 !== h || 0 !== o
                    ? ((o <<= 1),
                      (o |= h),
                      (4 === ++a || (0 === n && 0 === u)) &&
                        ((i = this.mul(i, r[o])), (a = 0), (o = 0)))
                    : (a = 0);
              }
              l = 26;
            }
            return i;
          }),
          (C.prototype.convertTo = function (e) {
            var t = e.umod(this.m);
            return t === e ? t.clone() : t;
          }),
          (C.prototype.convertFrom = function (e) {
            var t = e.clone();
            return (t.red = null), t;
          }),
          (s.mont = function (e) {
            return new R(e);
          }),
          i(R, C),
          (R.prototype.convertTo = function (e) {
            return this.imod(e.ushln(this.shift));
          }),
          (R.prototype.convertFrom = function (e) {
            var t = this.imod(e.mul(this.rinv));
            return (t.red = null), t;
          }),
          (R.prototype.imul = function (e, t) {
            if (e.isZero() || t.isZero())
              return (e.words[0] = 0), (e.length = 1), e;
            var r = e.imul(t),
              n = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              i = r.isub(n).iushrn(this.shift),
              s = i;
            return (
              i.cmp(this.m) >= 0
                ? (s = i.isub(this.m))
                : i.cmpn(0) < 0 && (s = i.iadd(this.m)),
              s._forceRed(this)
            );
          }),
          (R.prototype.mul = function (e, t) {
            if (e.isZero() || t.isZero()) return new s(0)._forceRed(this);
            var r = e.mul(t),
              n = r
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              i = r.isub(n).iushrn(this.shift),
              o = i;
            return (
              i.cmp(this.m) >= 0
                ? (o = i.isub(this.m))
                : i.cmpn(0) < 0 && (o = i.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (R.prototype.invm = function (e) {
            return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })((e = r.nmd(e)), this);
    },
    33415: (e) => {
      var t = 1e3,
        r = 60 * t,
        n = 60 * r,
        i = 24 * n,
        s = 7 * i,
        o = 365.25 * i;
      function a(e, t, r, n) {
        var i = t >= 1.5 * r;
        return Math.round(e / r) + " " + n + (i ? "s" : "");
      }
      e.exports = function (e, l) {
        l = l || {};
        var c = typeof e;
        if ("string" === c && e.length > 0)
          return (function (e) {
            if ((e = String(e)).length > 100) return;
            var a =
              /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
                e
              );
            if (!a) return;
            var l = parseFloat(a[1]);
            switch ((a[2] || "ms").toLowerCase()) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return l * o;
              case "weeks":
              case "week":
              case "w":
                return l * s;
              case "days":
              case "day":
              case "d":
                return l * i;
              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return l * n;
              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return l * r;
              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return l * t;
              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return l;
              default:
                return;
            }
          })(e);
        if ("number" === c && isFinite(e))
          return l.long
            ? (function (e) {
                var s = Math.abs(e);
                if (s >= i) return a(e, s, i, "day");
                if (s >= n) return a(e, s, n, "hour");
                if (s >= r) return a(e, s, r, "minute");
                if (s >= t) return a(e, s, t, "second");
                return e + " ms";
              })(e)
            : (function (e) {
                var s = Math.abs(e);
                if (s >= i) return Math.round(e / i) + "d";
                if (s >= n) return Math.round(e / n) + "h";
                if (s >= r) return Math.round(e / r) + "m";
                if (s >= t) return Math.round(e / t) + "s";
                return e + "ms";
              })(e);
        throw new Error(
          "val is not a non-empty string or a valid number. val=" +
            JSON.stringify(e)
        );
      };
    },
    76522: (e, t, r) => {
      (t.formatArgs = function (t) {
        if (
          ((t[0] =
            (this.useColors ? "%c" : "") +
            this.namespace +
            (this.useColors ? " %c" : " ") +
            t[0] +
            (this.useColors ? "%c " : " ") +
            "+" +
            e.exports.humanize(this.diff)),
          !this.useColors)
        )
          return;
        const r = "color: " + this.color;
        t.splice(1, 0, r, "color: inherit");
        let n = 0,
          i = 0;
        t[0].replace(/%[a-zA-Z%]/g, (e) => {
          "%%" !== e && (n++, "%c" === e && (i = n));
        }),
          t.splice(i, 0, r);
      }),
        (t.save = function (e) {
          try {
            e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug");
          } catch (r) {}
        }),
        (t.load = function () {
          let e;
          try {
            e = t.storage.getItem("debug");
          } catch (r) {}
          !e &&
            "undefined" !== typeof process &&
            "env" in process &&
            (e = {
              NODE_ENV: "production",
              PUBLIC_URL: "",
              WDS_SOCKET_HOST: void 0,
              WDS_SOCKET_PATH: void 0,
              WDS_SOCKET_PORT: void 0,
              FAST_REFRESH: !0,
              REACT_APP_WEB_BASE_URL: "https://app.stabilityworld.ai",
              REACT_APP_UNLOCK_COMMINGSOON: "",
              REACT_APP_API_BASE_URL: "https://api.stabilityworld.ai",
              REACT_APP_API: "https://api.stabilityworld.ai/api/app/",
              REACT_APP_GOOGLE_CLIENT_ID:
                "846996706584-rpl4hgo013g8ojko4qro4nu2uinqqnra.apps.googleusercontent.com",
              REACT_APP_DISCORD_CLIENT_ID: "1253661276383739974",
              REACT_APP_CALLBACK_DISCORD: "https://app.stabilityworld.ai",
              REACT_APP_CALLBACK_GOOGLE: "https://app.stabilityworld.ai",
              REACT_APP_REF_URL: "https://app.stabilityworld.ai",
              REACT_APP_PROJECT_ID: "f9ea16e5a146c0e64bf2832000287c02",
              REACT_APP_TELEGRAM_CALLBACK: "https://app.stabilityworld.ai",
              REACT_APP_TELEGRAM_BOT_ID: "6437228099",
            }.DEBUG);
          return e;
        }),
        (t.useColors = function () {
          if (
            "undefined" !== typeof window &&
            window.process &&
            ("renderer" === window.process.type || window.process.__nwjs)
          )
            return !0;
          if (
            "undefined" !== typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
          )
            return !1;
          return (
            ("undefined" !== typeof document &&
              document.documentElement &&
              document.documentElement.style &&
              document.documentElement.style.WebkitAppearance) ||
            ("undefined" !== typeof window &&
              window.console &&
              (window.console.firebug ||
                (window.console.exception && window.console.table))) ||
            ("undefined" !== typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
              parseInt(RegExp.$1, 10) >= 31) ||
            ("undefined" !== typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
          );
        }),
        (t.storage = (function () {
          try {
            return localStorage;
          } catch (e) {}
        })()),
        (t.destroy = (() => {
          let e = !1;
          return () => {
            e ||
              ((e = !0),
              console.warn(
                "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
              ));
          };
        })()),
        (t.colors = [
          "#0000CC",
          "#0000FF",
          "#0033CC",
          "#0033FF",
          "#0066CC",
          "#0066FF",
          "#0099CC",
          "#0099FF",
          "#00CC00",
          "#00CC33",
          "#00CC66",
          "#00CC99",
          "#00CCCC",
          "#00CCFF",
          "#3300CC",
          "#3300FF",
          "#3333CC",
          "#3333FF",
          "#3366CC",
          "#3366FF",
          "#3399CC",
          "#3399FF",
          "#33CC00",
          "#33CC33",
          "#33CC66",
          "#33CC99",
          "#33CCCC",
          "#33CCFF",
          "#6600CC",
          "#6600FF",
          "#6633CC",
          "#6633FF",
          "#66CC00",
          "#66CC33",
          "#9900CC",
          "#9900FF",
          "#9933CC",
          "#9933FF",
          "#99CC00",
          "#99CC33",
          "#CC0000",
          "#CC0033",
          "#CC0066",
          "#CC0099",
          "#CC00CC",
          "#CC00FF",
          "#CC3300",
          "#CC3333",
          "#CC3366",
          "#CC3399",
          "#CC33CC",
          "#CC33FF",
          "#CC6600",
          "#CC6633",
          "#CC9900",
          "#CC9933",
          "#CCCC00",
          "#CCCC33",
          "#FF0000",
          "#FF0033",
          "#FF0066",
          "#FF0099",
          "#FF00CC",
          "#FF00FF",
          "#FF3300",
          "#FF3333",
          "#FF3366",
          "#FF3399",
          "#FF33CC",
          "#FF33FF",
          "#FF6600",
          "#FF6633",
          "#FF9900",
          "#FF9933",
          "#FFCC00",
          "#FFCC33",
        ]),
        (t.log = console.debug || console.log || (() => {})),
        (e.exports = r(35237)(t));
      const { formatters: n } = e.exports;
      n.j = function (e) {
        try {
          return JSON.stringify(e);
        } catch (t) {
          return "[UnexpectedJSONParseError]: " + t.message;
        }
      };
    },
    35237: (e, t, r) => {
      e.exports = function (e) {
        function t(e) {
          let r,
            i,
            s,
            o = null;
          function a() {
            for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++)
              n[i] = arguments[i];
            if (!a.enabled) return;
            const s = a,
              o = Number(new Date()),
              l = o - (r || o);
            (s.diff = l),
              (s.prev = r),
              (s.curr = o),
              (r = o),
              (n[0] = t.coerce(n[0])),
              "string" !== typeof n[0] && n.unshift("%O");
            let c = 0;
            (n[0] = n[0].replace(/%([a-zA-Z%])/g, (e, r) => {
              if ("%%" === e) return "%";
              c++;
              const i = t.formatters[r];
              if ("function" === typeof i) {
                const t = n[c];
                (e = i.call(s, t)), n.splice(c, 1), c--;
              }
              return e;
            })),
              t.formatArgs.call(s, n);
            (s.log || t.log).apply(s, n);
          }
          return (
            (a.namespace = e),
            (a.useColors = t.useColors()),
            (a.color = t.selectColor(e)),
            (a.extend = n),
            (a.destroy = t.destroy),
            Object.defineProperty(a, "enabled", {
              enumerable: !0,
              configurable: !1,
              get: () =>
                null !== o
                  ? o
                  : (i !== t.namespaces &&
                      ((i = t.namespaces), (s = t.enabled(e))),
                    s),
              set: (e) => {
                o = e;
              },
            }),
            "function" === typeof t.init && t.init(a),
            a
          );
        }
        function n(e, r) {
          const n = t(
            this.namespace + ("undefined" === typeof r ? ":" : r) + e
          );
          return (n.log = this.log), n;
        }
        function i(e) {
          return e
            .toString()
            .substring(2, e.toString().length - 2)
            .replace(/\.\*\?$/, "*");
        }
        return (
          (t.debug = t),
          (t.default = t),
          (t.coerce = function (e) {
            if (e instanceof Error) return e.stack || e.message;
            return e;
          }),
          (t.disable = function () {
            const e = [
              ...t.names.map(i),
              ...t.skips.map(i).map((e) => "-" + e),
            ].join(",");
            return t.enable(""), e;
          }),
          (t.enable = function (e) {
            let r;
            t.save(e), (t.namespaces = e), (t.names = []), (t.skips = []);
            const n = ("string" === typeof e ? e : "").split(/[\s,]+/),
              i = n.length;
            for (r = 0; r < i; r++)
              n[r] &&
                ("-" === (e = n[r].replace(/\*/g, ".*?"))[0]
                  ? t.skips.push(new RegExp("^" + e.slice(1) + "$"))
                  : t.names.push(new RegExp("^" + e + "$")));
          }),
          (t.enabled = function (e) {
            if ("*" === e[e.length - 1]) return !0;
            let r, n;
            for (r = 0, n = t.skips.length; r < n; r++)
              if (t.skips[r].test(e)) return !1;
            for (r = 0, n = t.names.length; r < n; r++)
              if (t.names[r].test(e)) return !0;
            return !1;
          }),
          (t.humanize = r(33415)),
          (t.destroy = function () {
            console.warn(
              "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
            );
          }),
          Object.keys(e).forEach((r) => {
            t[r] = e[r];
          }),
          (t.names = []),
          (t.skips = []),
          (t.formatters = {}),
          (t.selectColor = function (e) {
            let r = 0;
            for (let t = 0; t < e.length; t++)
              (r = (r << 5) - r + e.charCodeAt(t)), (r |= 0);
            return t.colors[Math.abs(r) % t.colors.length];
          }),
          t.enable(t.load()),
          t
        );
      };
    },
    17289: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BaseBlockTracker = void 0);
      const i = n(r(45751)),
        s = (e, t) => e + t,
        o = ["sync", "latest"];
      class a extends i.default {
        constructor(e) {
          super(),
            (this._blockResetDuration = e.blockResetDuration || 2e4),
            (this._usePastBlocks = e.usePastBlocks || !1),
            (this._currentBlock = null),
            (this._isRunning = !1),
            (this._onNewListener = this._onNewListener.bind(this)),
            (this._onRemoveListener = this._onRemoveListener.bind(this)),
            (this._resetCurrentBlock = this._resetCurrentBlock.bind(this)),
            this._setupInternalEvents();
        }
        async destroy() {
          this._cancelBlockResetTimeout(),
            await this._maybeEnd(),
            super.removeAllListeners();
        }
        isRunning() {
          return this._isRunning;
        }
        getCurrentBlock() {
          return this._currentBlock;
        }
        async getLatestBlock() {
          if (this._currentBlock) return this._currentBlock;
          return await new Promise((e) => this.once("latest", e));
        }
        removeAllListeners(e) {
          return (
            e ? super.removeAllListeners(e) : super.removeAllListeners(),
            this._setupInternalEvents(),
            this._onRemoveListener(),
            this
          );
        }
        _setupInternalEvents() {
          this.removeListener("newListener", this._onNewListener),
            this.removeListener("removeListener", this._onRemoveListener),
            this.on("newListener", this._onNewListener),
            this.on("removeListener", this._onRemoveListener);
        }
        _onNewListener(e) {
          o.includes(e) && this._maybeStart();
        }
        _onRemoveListener() {
          this._getBlockTrackerEventCount() > 0 || this._maybeEnd();
        }
        async _maybeStart() {
          this._isRunning ||
            ((this._isRunning = !0),
            this._cancelBlockResetTimeout(),
            await this._start(),
            this.emit("_started"));
        }
        async _maybeEnd() {
          this._isRunning &&
            ((this._isRunning = !1),
            this._setupBlockResetTimeout(),
            await this._end(),
            this.emit("_ended"));
        }
        _getBlockTrackerEventCount() {
          return o.map((e) => this.listenerCount(e)).reduce(s);
        }
        _shouldUseNewBlock(e) {
          const t = this._currentBlock;
          if (!t) return !0;
          const r = l(e),
            n = l(t);
          return (this._usePastBlocks && r < n) || r > n;
        }
        _newPotentialLatest(e) {
          this._shouldUseNewBlock(e) && this._setCurrentBlock(e);
        }
        _setCurrentBlock(e) {
          const t = this._currentBlock;
          (this._currentBlock = e),
            this.emit("latest", e),
            this.emit("sync", { oldBlock: t, newBlock: e });
        }
        _setupBlockResetTimeout() {
          this._cancelBlockResetTimeout(),
            (this._blockResetTimeout = setTimeout(
              this._resetCurrentBlock,
              this._blockResetDuration
            )),
            this._blockResetTimeout.unref && this._blockResetTimeout.unref();
        }
        _cancelBlockResetTimeout() {
          this._blockResetTimeout && clearTimeout(this._blockResetTimeout);
        }
        _resetCurrentBlock() {
          this._currentBlock = null;
        }
      }
      function l(e) {
        return Number.parseInt(e, 16);
      }
      t.BaseBlockTracker = a;
    },
    46603: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PollingBlockTracker = void 0);
      const i = n(r(10402)),
        s = n(r(69732)),
        o = r(17289),
        a = r(18302),
        l = (0, a.createModuleLogger)(a.projectLogger, "polling-block-tracker"),
        c = (0, i.default)();
      class u extends o.BaseBlockTracker {
        constructor() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          var t;
          if (!e.provider)
            throw new Error("PollingBlockTracker - no provider specified.");
          super(
            Object.assign(Object.assign({}, e), {
              blockResetDuration:
                null !== (t = e.blockResetDuration) && void 0 !== t
                  ? t
                  : e.pollingInterval,
            })
          ),
            (this._provider = e.provider),
            (this._pollingInterval = e.pollingInterval || 2e4),
            (this._retryTimeout = e.retryTimeout || this._pollingInterval / 10),
            (this._keepEventLoopActive =
              void 0 === e.keepEventLoopActive || e.keepEventLoopActive),
            (this._setSkipCacheFlag = e.setSkipCacheFlag || !1);
        }
        async checkForLatestBlock() {
          return await this._updateLatestBlock(), await this.getLatestBlock();
        }
        async _start() {
          this._synchronize();
        }
        async _end() {}
        async _synchronize() {
          for (var e; this._isRunning; )
            try {
              await this._updateLatestBlock();
              const e = h(this._pollingInterval, !this._keepEventLoopActive);
              this.emit("_waitingForNextIteration"), await e;
            } catch (t) {
              const n = new Error(
                `PollingBlockTracker - encountered an error while attempting to update latest block:\n${
                  null !== (e = t.stack) && void 0 !== e ? e : t
                }`
              );
              try {
                this.emit("error", n);
              } catch (r) {
                console.error(n);
              }
              const i = h(this._retryTimeout, !this._keepEventLoopActive);
              this.emit("_waitingForNextIteration"), await i;
            }
        }
        async _updateLatestBlock() {
          const e = await this._fetchLatestBlock();
          this._newPotentialLatest(e);
        }
        async _fetchLatestBlock() {
          const e = {
            jsonrpc: "2.0",
            id: c(),
            method: "eth_blockNumber",
            params: [],
          };
          this._setSkipCacheFlag && (e.skipCache = !0), l("Making request", e);
          const t = await (0, s.default)((t) =>
            this._provider.sendAsync(e, t)
          )();
          if ((l("Got response", t), t.error))
            throw new Error(
              `PollingBlockTracker - encountered error fetching block:\n${t.error.message}`
            );
          return t.result;
        }
      }
      function h(e, t) {
        return new Promise((r) => {
          const n = setTimeout(r, e);
          n.unref && t && n.unref();
        });
      }
      t.PollingBlockTracker = u;
    },
    40320: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.SubscribeBlockTracker = void 0);
      const i = n(r(10402)),
        s = r(17289),
        o = (0, i.default)();
      class a extends s.BaseBlockTracker {
        constructor() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (!e.provider)
            throw new Error("SubscribeBlockTracker - no provider specified.");
          super(e),
            (this._provider = e.provider),
            (this._subscriptionId = null);
        }
        async checkForLatestBlock() {
          return await this.getLatestBlock();
        }
        async _start() {
          if (void 0 === this._subscriptionId || null === this._subscriptionId)
            try {
              const e = await this._call("eth_blockNumber");
              (this._subscriptionId = await this._call(
                "eth_subscribe",
                "newHeads"
              )),
                this._provider.on("data", this._handleSubData.bind(this)),
                this._newPotentialLatest(e);
            } catch (e) {
              this.emit("error", e);
            }
        }
        async _end() {
          if (null !== this._subscriptionId && void 0 !== this._subscriptionId)
            try {
              await this._call("eth_unsubscribe", this._subscriptionId),
                (this._subscriptionId = null);
            } catch (e) {
              this.emit("error", e);
            }
        }
        _call(e) {
          for (
            var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1;
            n < t;
            n++
          )
            r[n - 1] = arguments[n];
          return new Promise((t, n) => {
            this._provider.sendAsync(
              { id: o(), method: e, params: r, jsonrpc: "2.0" },
              (e, r) => {
                e ? n(e) : t(r.result);
              }
            );
          });
        }
        _handleSubData(e, t) {
          var r;
          "eth_subscription" === t.method &&
            (null === (r = t.params) || void 0 === r
              ? void 0
              : r.subscription) === this._subscriptionId &&
            this._newPotentialLatest(t.params.result.number);
        }
      }
      t.SubscribeBlockTracker = a;
    },
    28447: function (e, t, r) {
      "use strict";
      var n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, r, n) {
                void 0 === n && (n = r),
                  Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: function () {
                      return t[r];
                    },
                  });
              }
            : function (e, t, r, n) {
                void 0 === n && (n = r), (e[n] = t[r]);
              }),
        i =
          (this && this.__exportStar) ||
          function (e, t) {
            for (var r in e)
              "default" === r ||
                Object.prototype.hasOwnProperty.call(t, r) ||
                n(t, e, r);
          };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        i(r(46603), t),
        i(r(40320), t);
    },
    18302: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.createModuleLogger = t.projectLogger = void 0);
      const n = r(21576);
      Object.defineProperty(t, "createModuleLogger", {
        enumerable: !0,
        get: function () {
          return n.createModuleLogger;
        },
      }),
        (t.projectLogger = (0, n.createProjectLogger)("eth-block-tracker"));
    },
    69732: (e) => {
      "use strict";
      const t = (e, t) =>
        function () {
          const r = t.promiseModule,
            n = new Array(arguments.length);
          for (let e = 0; e < arguments.length; e++) n[e] = arguments[e];
          return new r((r, i) => {
            t.errorFirst
              ? n.push(function (e, n) {
                  if (t.multiArgs) {
                    const t = new Array(arguments.length - 1);
                    for (let e = 1; e < arguments.length; e++)
                      t[e - 1] = arguments[e];
                    e ? (t.unshift(e), i(t)) : r(t);
                  } else e ? i(e) : r(n);
                })
              : n.push(function (e) {
                  if (t.multiArgs) {
                    const e = new Array(arguments.length - 1);
                    for (let t = 0; t < arguments.length; t++)
                      e[t] = arguments[t];
                    r(e);
                  } else r(e);
                }),
              e.apply(this, n);
          });
        };
      e.exports = (e, r) => {
        r = Object.assign(
          {
            exclude: [/.+(Sync|Stream)$/],
            errorFirst: !0,
            promiseModule: Promise,
          },
          r
        );
        const n = (e) => {
          const t = (t) => ("string" === typeof t ? e === t : t.test(e));
          return r.include ? r.include.some(t) : !r.exclude.some(t);
        };
        let i;
        i =
          "function" === typeof e
            ? function () {
                return r.excludeMain
                  ? e.apply(this, arguments)
                  : t(e, r).apply(this, arguments);
              }
            : Object.create(Object.getPrototypeOf(e));
        for (const s in e) {
          const o = e[s];
          i[s] = "function" === typeof o && n(s) ? t(o, r) : o;
        }
        return i;
      };
    },
    70707: (e, t, r) => {
      const n = r(99994);
      e.exports = class extends n {
        constructor() {
          super(), (this.allResults = []);
        }
        async update() {
          throw new Error("BaseFilterWithHistory - no update method specified");
        }
        addResults(e) {
          (this.allResults = this.allResults.concat(e)), super.addResults(e);
        }
        addInitialResults(e) {
          (this.allResults = this.allResults.concat(e)),
            super.addInitialResults(e);
        }
        getAllResults() {
          return this.allResults;
        }
      };
    },
    99994: (e, t, r) => {
      const n = r(45751).default;
      e.exports = class extends n {
        constructor() {
          super(), (this.updates = []);
        }
        async initialize() {}
        async update() {
          throw new Error("BaseFilter - no update method specified");
        }
        addResults(e) {
          (this.updates = this.updates.concat(e)),
            e.forEach((e) => this.emit("update", e));
        }
        addInitialResults(e) {}
        getChangesAndClear() {
          const e = this.updates;
          return (this.updates = []), e;
        }
      };
    },
    98308: (e, t, r) => {
      const n = r(99994),
        i = r(7274),
        { incrementHexInt: s } = r(73108);
      e.exports = class extends n {
        constructor(e) {
          let { provider: t, params: r } = e;
          super(), (this.type = "block"), (this.provider = t);
        }
        async update(e) {
          let { oldBlock: t, newBlock: r } = e;
          const n = r,
            o = s(t),
            a = (
              await i({ provider: this.provider, fromBlock: o, toBlock: n })
            ).map((e) => e.hash);
          this.addResults(a);
        }
      };
    },
    7274: (e) => {
      function t(e) {
        return void 0 === e || null === e ? e : Number.parseInt(e, 16);
      }
      function r(e) {
        if (void 0 === e || null === e) return e;
        return "0x" + e.toString(16);
      }
      function n(e, t) {
        return new Promise((r, n) => {
          e.sendAsync(t, (e, t) => {
            e
              ? n(e)
              : t.error
              ? n(t.error)
              : t.result
              ? r(t.result)
              : n(new Error("Result was empty"));
          });
        });
      }
      e.exports = async function (e) {
        let { provider: i, fromBlock: s, toBlock: o } = e;
        s || (s = o);
        const a = t(s),
          l = t(o),
          c = Array(l - a + 1)
            .fill()
            .map((e, t) => a + t)
            .map(r);
        let u = await Promise.all(
          c.map((e) =>
            (async function (e, t, r) {
              for (let s = 0; s < 3; s++)
                try {
                  return await n(e, {
                    id: 1,
                    jsonrpc: "2.0",
                    method: t,
                    params: r,
                  });
                } catch (i) {
                  console.error(
                    `provider.sendAsync failed: ${i.stack || i.message || i}`
                  );
                }
              return null;
            })(i, "eth_getBlockByNumber", [e, !1])
          )
        );
        return (u = u.filter((e) => null !== e)), u;
      };
    },
    73108: (e) => {
      function t(e) {
        return e.sort((e, t) =>
          "latest" === e || "earliest" === t
            ? 1
            : "latest" === t || "earliest" === e
            ? -1
            : r(e) - r(t)
        );
      }
      function r(e) {
        return void 0 === e || null === e ? e : Number.parseInt(e, 16);
      }
      function n(e) {
        if (void 0 === e || null === e) return e;
        let t = e.toString(16);
        return t.length % 2 && (t = "0" + t), "0x" + t;
      }
      function i() {
        return Math.floor(16 * Math.random()).toString(16);
      }
      e.exports = {
        minBlockRef: function () {
          for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
            r[n] = arguments[n];
          return t(r)[0];
        },
        maxBlockRef: function () {
          for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
            r[n] = arguments[n];
          const i = t(r);
          return i[i.length - 1];
        },
        sortBlockRefs: t,
        bnToHex: function (e) {
          return "0x" + e.toString(16);
        },
        blockRefIsNumber: function (e) {
          return e && !["earliest", "latest", "pending"].includes(e);
        },
        hexToInt: r,
        incrementHexInt: function (e) {
          if (void 0 === e || null === e) return e;
          return n(r(e) + 1);
        },
        intToHex: n,
        unsafeRandomBytes: function (e) {
          let t = "0x";
          for (let r = 0; r < e; r++) (t += i()), (t += i());
          return t;
        },
      };
    },
    72592: (e, t, r) => {
      const n = r(98982).eu,
        { createAsyncMiddleware: i, createScaffoldMiddleware: s } = r(23534),
        o = r(27361),
        a = r(98308),
        l = r(72313),
        { intToHex: c, hexToInt: u } = r(73108);
      function h(e) {
        return d(async function () {
          const t = await e(...arguments);
          return c(t.id);
        });
      }
      function d(e) {
        return i(async (t, r) => {
          const n = await e.apply(null, t.params);
          r.result = n;
        });
      }
      function f(e, t) {
        const r = [];
        for (let n in e) r.push(e[n]);
        return r;
      }
      e.exports = function (e) {
        let { blockTracker: t, provider: r } = e,
          i = 0,
          p = {};
        const g = new n(),
          m = (function (e) {
            let { mutex: t } = e;
            return (e) => async (r, n, i, s) => {
              (await t.acquire())(), e(r, n, i, s);
            };
          })({ mutex: g }),
          _ = s({
            eth_newFilter: m(h(y)),
            eth_newBlockFilter: m(h(b)),
            eth_newPendingTransactionFilter: m(h(w)),
            eth_uninstallFilter: m(d(S)),
            eth_getFilterChanges: m(d(E)),
            eth_getFilterLogs: m(d(k)),
          }),
          v = async (e) => {
            let { oldBlock: t, newBlock: r } = e;
            if (0 === p.length) return;
            const n = await g.acquire();
            try {
              await Promise.all(
                f(p).map(async (e) => {
                  try {
                    await e.update({ oldBlock: t, newBlock: r });
                  } catch (n) {
                    console.error(n);
                  }
                })
              );
            } catch (i) {
              console.error(i);
            }
            n();
          };
        return (
          (_.newLogFilter = y),
          (_.newBlockFilter = b),
          (_.newPendingTransactionFilter = w),
          (_.uninstallFilter = S),
          (_.getFilterChanges = E),
          (_.getFilterLogs = k),
          (_.destroy = () => {
            !(async function () {
              const e = f(p).length;
              (p = {}), C({ prevFilterCount: e, newFilterCount: 0 });
            })();
          }),
          _
        );
        async function y(e) {
          const t = new o({ provider: r, params: e });
          await M(t);
          return t;
        }
        async function b() {
          const e = new a({ provider: r });
          await M(e);
          return e;
        }
        async function w() {
          const e = new l({ provider: r });
          await M(e);
          return e;
        }
        async function E(e) {
          const t = u(e),
            r = p[t];
          if (!r) throw new Error(`No filter for index "${t}"`);
          return r.getChangesAndClear();
        }
        async function k(e) {
          const t = u(e),
            r = p[t];
          if (!r) throw new Error(`No filter for index "${t}"`);
          let n = [];
          return "log" === r.type && (n = r.getAllResults()), n;
        }
        async function S(e) {
          const t = u(e),
            r = p[t],
            n = Boolean(r);
          return (
            n &&
              (await (async function (e) {
                const t = f(p).length;
                delete p[e];
                const r = f(p).length;
                C({ prevFilterCount: t, newFilterCount: r });
              })(t)),
            n
          );
        }
        async function M(e) {
          const r = f(p).length,
            n = await t.getLatestBlock();
          await e.initialize({ currentBlock: n }),
            i++,
            (p[i] = e),
            (e.id = i),
            (e.idHex = c(i));
          return C({ prevFilterCount: r, newFilterCount: f(p).length }), i;
        }
        function C(e) {
          let { prevFilterCount: r, newFilterCount: n } = e;
          0 === r && n > 0
            ? t.on("sync", v)
            : r > 0 && 0 === n && t.removeListener("sync", v);
        }
      };
    },
    27361: (e, t, r) => {
      const n = r(62922),
        i = r(52794),
        s = r(70707),
        {
          bnToHex: o,
          hexToInt: a,
          incrementHexInt: l,
          minBlockRef: c,
          blockRefIsNumber: u,
        } = r(73108);
      e.exports = class extends s {
        constructor(e) {
          let { provider: t, params: r } = e;
          super(),
            (this.type = "log"),
            (this.ethQuery = new n(t)),
            (this.params = Object.assign(
              {
                fromBlock: "latest",
                toBlock: "latest",
                address: void 0,
                topics: [],
              },
              r
            )),
            this.params.address &&
              (Array.isArray(this.params.address) ||
                (this.params.address = [this.params.address]),
              (this.params.address = this.params.address.map((e) =>
                e.toLowerCase()
              )));
        }
        async initialize(e) {
          let { currentBlock: t } = e,
            r = this.params.fromBlock;
          ["latest", "pending"].includes(r) && (r = t),
            "earliest" === r && (r = "0x0"),
            (this.params.fromBlock = r);
          const n = c(this.params.toBlock, t),
            i = Object.assign({}, this.params, { toBlock: n }),
            s = await this._fetchLogs(i);
          this.addInitialResults(s);
        }
        async update(e) {
          let { oldBlock: t, newBlock: r } = e;
          const n = r;
          let i;
          i = t ? l(t) : r;
          const s = Object.assign({}, this.params, {
              fromBlock: i,
              toBlock: n,
            }),
            o = (await this._fetchLogs(s)).filter((e) => this.matchLog(e));
          this.addResults(o);
        }
        async _fetchLogs(e) {
          return await i((t) => this.ethQuery.getLogs(e, t))();
        }
        matchLog(e) {
          if (a(this.params.fromBlock) >= a(e.blockNumber)) return !1;
          if (
            u(this.params.toBlock) &&
            a(this.params.toBlock) <= a(e.blockNumber)
          )
            return !1;
          const t = e.address && e.address.toLowerCase();
          if (this.params.address && t && !this.params.address.includes(t))
            return !1;
          return this.params.topics.every((t, r) => {
            let n = e.topics[r];
            if (!n) return !1;
            n = n.toLowerCase();
            let i = Array.isArray(t) ? t : [t];
            if (i.includes(null)) return !0;
            i = i.map((e) => e.toLowerCase());
            return i.includes(n);
          });
        }
      };
    },
    52794: (e) => {
      "use strict";
      const t = (e, t, r, n) =>
          function () {
            for (var i = arguments.length, s = new Array(i), o = 0; o < i; o++)
              s[o] = arguments[o];
            return new (0, t.promiseModule)((i, o) => {
              t.multiArgs
                ? s.push(function () {
                    for (
                      var e = arguments.length, r = new Array(e), n = 0;
                      n < e;
                      n++
                    )
                      r[n] = arguments[n];
                    t.errorFirst ? (r[0] ? o(r) : (r.shift(), i(r))) : i(r);
                  })
                : t.errorFirst
                ? s.push((e, t) => {
                    e ? o(e) : i(t);
                  })
                : s.push(i);
              const a = this === r ? n : this;
              Reflect.apply(e, a, s);
            });
          },
        r = new WeakMap();
      e.exports = (e, n) => {
        n = {
          exclude: [/.+(?:Sync|Stream)$/],
          errorFirst: !0,
          promiseModule: Promise,
          ...n,
        };
        const i = typeof e;
        if (null === e || ("object" !== i && "function" !== i))
          throw new TypeError(
            `Expected \`input\` to be a \`Function\` or \`Object\`, got \`${
              null === e ? "null" : i
            }\``
          );
        const s = new WeakMap(),
          o = new Proxy(e, {
            apply(e, r, i) {
              const a = s.get(e);
              if (a) return Reflect.apply(a, r, i);
              const l = n.excludeMain ? e : t(e, n, o, e);
              return s.set(e, l), Reflect.apply(l, r, i);
            },
            get(e, i) {
              const a = e[i];
              if (
                !((e, t) => {
                  let i = r.get(e);
                  if ((i || ((i = {}), r.set(e, i)), t in i)) return i[t];
                  const s = (e) =>
                      "string" === typeof e || "symbol" === typeof t
                        ? t === e
                        : e.test(t),
                    o = Reflect.getOwnPropertyDescriptor(e, t),
                    a = void 0 === o || o.writable || o.configurable,
                    l =
                      (n.include ? n.include.some(s) : !n.exclude.some(s)) && a;
                  return (i[t] = l), l;
                })(e, i) ||
                a === Function.prototype[i]
              )
                return a;
              const l = s.get(a);
              if (l) return l;
              if ("function" === typeof a) {
                const r = t(a, n, o, e);
                return s.set(a, r), r;
              }
              return a;
            },
          });
        return o;
      };
    },
    44136: (e, t, r) => {
      const n = r(45751).default,
        { createAsyncMiddleware: i, createScaffoldMiddleware: s } = r(23534),
        o = r(72592),
        { unsafeRandomBytes: a, incrementHexInt: l } = r(73108),
        c = r(7274);
      function u(e) {
        return null === e || void 0 === e
          ? null
          : {
              hash: e.hash,
              parentHash: e.parentHash,
              sha3Uncles: e.sha3Uncles,
              miner: e.miner,
              stateRoot: e.stateRoot,
              transactionsRoot: e.transactionsRoot,
              receiptsRoot: e.receiptsRoot,
              logsBloom: e.logsBloom,
              difficulty: e.difficulty,
              number: e.number,
              gasLimit: e.gasLimit,
              gasUsed: e.gasUsed,
              nonce: e.nonce,
              mixHash: e.mixHash,
              timestamp: e.timestamp,
              extraData: e.extraData,
            };
      }
      e.exports = function (e) {
        let { blockTracker: t, provider: r } = e;
        const h = {},
          d = o({ blockTracker: t, provider: r });
        let f = !1;
        const p = new n(),
          g = s({
            eth_subscribe: i(async function (e, n) {
              if (f)
                throw new Error(
                  "SubscriptionManager - attempting to use after destroying"
                );
              const i = e.params[0],
                s = a(16);
              let o;
              switch (i) {
                case "newHeads":
                  o = p({ subId: s });
                  break;
                case "logs":
                  const t = e.params[1];
                  o = g({ subId: s, filter: await d.newLogFilter(t) });
                  break;
                default:
                  throw new Error(
                    `SubscriptionManager - unsupported subscription type "${i}"`
                  );
              }
              return (h[s] = o), void (n.result = s);
              function p(e) {
                let { subId: n } = e;
                const s = {
                  type: i,
                  destroy: async () => {
                    t.removeListener("sync", s.update);
                  },
                  update: async (e) => {
                    let { oldBlock: t, newBlock: i } = e;
                    const s = i,
                      o = l(t);
                    (await c({ provider: r, fromBlock: o, toBlock: s }))
                      .map(u)
                      .filter((e) => null !== e)
                      .forEach((e) => {
                        m(n, e);
                      });
                  },
                };
                return t.on("sync", s.update), s;
              }
              function g(e) {
                let { subId: t, filter: r } = e;
                r.on("update", (e) => m(t, e));
                return {
                  type: i,
                  destroy: async () => await d.uninstallFilter(r.idHex),
                };
              }
            }),
            eth_unsubscribe: i(async function (e, t) {
              if (f)
                throw new Error(
                  "SubscriptionManager - attempting to use after destroying"
                );
              const r = e.params[0],
                n = h[r];
              if (!n) return void (t.result = !1);
              delete h[r], await n.destroy(), (t.result = !0);
            }),
          });
        return (
          (g.destroy = function () {
            p.removeAllListeners();
            for (const e in h) h[e].destroy(), delete h[e];
            f = !0;
          }),
          { events: p, middleware: g }
        );
        function m(e, t) {
          p.emit("notification", {
            jsonrpc: "2.0",
            method: "eth_subscription",
            params: { subscription: e, result: t },
          });
        }
      };
    },
    72313: (e, t, r) => {
      const n = r(99994),
        i = r(7274),
        { incrementHexInt: s } = r(73108);
      e.exports = class extends n {
        constructor(e) {
          let { provider: t } = e;
          super(), (this.type = "tx"), (this.provider = t);
        }
        async update(e) {
          let { oldBlock: t } = e;
          const r = t,
            n = s(t),
            o = await i({ provider: this.provider, fromBlock: n, toBlock: r }),
            a = [];
          for (const i of o) a.push(...i.transactions);
          this.addResults(a);
        }
      };
    },
    62922: (e, t, r) => {
      const n = r(60049),
        i = r(10402)();
      function s(e) {
        this.currentProvider = e;
      }
      function o(e) {
        return function () {
          var t = [].slice.call(arguments),
            r = t.pop();
          this.sendAsync({ method: e, params: t }, r);
        };
      }
      function a(e, t) {
        return function () {
          var r = [].slice.call(arguments),
            n = r.pop();
          r.length < e && r.push("latest"),
            this.sendAsync({ method: t, params: r }, n);
        };
      }
      (e.exports = s),
        (s.prototype.getBalance = a(2, "eth_getBalance")),
        (s.prototype.getCode = a(2, "eth_getCode")),
        (s.prototype.getTransactionCount = a(2, "eth_getTransactionCount")),
        (s.prototype.getStorageAt = a(3, "eth_getStorageAt")),
        (s.prototype.call = a(2, "eth_call")),
        (s.prototype.protocolVersion = o("eth_protocolVersion")),
        (s.prototype.syncing = o("eth_syncing")),
        (s.prototype.coinbase = o("eth_coinbase")),
        (s.prototype.mining = o("eth_mining")),
        (s.prototype.hashrate = o("eth_hashrate")),
        (s.prototype.gasPrice = o("eth_gasPrice")),
        (s.prototype.accounts = o("eth_accounts")),
        (s.prototype.blockNumber = o("eth_blockNumber")),
        (s.prototype.getBlockTransactionCountByHash = o(
          "eth_getBlockTransactionCountByHash"
        )),
        (s.prototype.getBlockTransactionCountByNumber = o(
          "eth_getBlockTransactionCountByNumber"
        )),
        (s.prototype.getUncleCountByBlockHash = o(
          "eth_getUncleCountByBlockHash"
        )),
        (s.prototype.getUncleCountByBlockNumber = o(
          "eth_getUncleCountByBlockNumber"
        )),
        (s.prototype.sign = o("eth_sign")),
        (s.prototype.sendTransaction = o("eth_sendTransaction")),
        (s.prototype.sendRawTransaction = o("eth_sendRawTransaction")),
        (s.prototype.estimateGas = o("eth_estimateGas")),
        (s.prototype.getBlockByHash = o("eth_getBlockByHash")),
        (s.prototype.getBlockByNumber = o("eth_getBlockByNumber")),
        (s.prototype.getTransactionByHash = o("eth_getTransactionByHash")),
        (s.prototype.getTransactionByBlockHashAndIndex = o(
          "eth_getTransactionByBlockHashAndIndex"
        )),
        (s.prototype.getTransactionByBlockNumberAndIndex = o(
          "eth_getTransactionByBlockNumberAndIndex"
        )),
        (s.prototype.getTransactionReceipt = o("eth_getTransactionReceipt")),
        (s.prototype.getUncleByBlockHashAndIndex = o(
          "eth_getUncleByBlockHashAndIndex"
        )),
        (s.prototype.getUncleByBlockNumberAndIndex = o(
          "eth_getUncleByBlockNumberAndIndex"
        )),
        (s.prototype.getCompilers = o("eth_getCompilers")),
        (s.prototype.compileLLL = o("eth_compileLLL")),
        (s.prototype.compileSolidity = o("eth_compileSolidity")),
        (s.prototype.compileSerpent = o("eth_compileSerpent")),
        (s.prototype.newFilter = o("eth_newFilter")),
        (s.prototype.newBlockFilter = o("eth_newBlockFilter")),
        (s.prototype.newPendingTransactionFilter = o(
          "eth_newPendingTransactionFilter"
        )),
        (s.prototype.uninstallFilter = o("eth_uninstallFilter")),
        (s.prototype.getFilterChanges = o("eth_getFilterChanges")),
        (s.prototype.getFilterLogs = o("eth_getFilterLogs")),
        (s.prototype.getLogs = o("eth_getLogs")),
        (s.prototype.getWork = o("eth_getWork")),
        (s.prototype.submitWork = o("eth_submitWork")),
        (s.prototype.submitHashrate = o("eth_submitHashrate")),
        (s.prototype.sendAsync = function (e, t) {
          var r;
          this.currentProvider.sendAsync(
            ((r = e), n({ id: i(), jsonrpc: "2.0", params: [] }, r)),
            function (e, r) {
              if (
                (!e &&
                  r.error &&
                  (e = new Error("EthQuery - RPC Error - " + r.error.message)),
                e)
              )
                return t(e);
              t(null, r.result);
            }
          );
        });
    },
    83192: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.EthereumProviderError = t.EthereumRpcError = void 0);
      const n = r(95376);
      class i extends Error {
        constructor(e, t, r) {
          if (!Number.isInteger(e))
            throw new Error('"code" must be an integer.');
          if (!t || "string" !== typeof t)
            throw new Error('"message" must be a nonempty string.');
          super(t), (this.code = e), void 0 !== r && (this.data = r);
        }
        serialize() {
          const e = { code: this.code, message: this.message };
          return (
            void 0 !== this.data && (e.data = this.data),
            this.stack && (e.stack = this.stack),
            e
          );
        }
        toString() {
          return n.default(this.serialize(), s, 2);
        }
      }
      t.EthereumRpcError = i;
      function s(e, t) {
        if ("[Circular]" !== t) return t;
      }
      t.EthereumProviderError = class extends i {
        constructor(e, t, r) {
          if (
            !(function (e) {
              return Number.isInteger(e) && e >= 1e3 && e <= 4999;
            })(e)
          )
            throw new Error(
              '"code" must be an integer such that: 1000 <= code <= 4999'
            );
          super(e, t, r);
        }
      };
    },
    96950: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.errorValues = t.errorCodes = void 0),
        (t.errorCodes = {
          rpc: {
            invalidInput: -32e3,
            resourceNotFound: -32001,
            resourceUnavailable: -32002,
            transactionRejected: -32003,
            methodNotSupported: -32004,
            limitExceeded: -32005,
            parse: -32700,
            invalidRequest: -32600,
            methodNotFound: -32601,
            invalidParams: -32602,
            internal: -32603,
          },
          provider: {
            userRejectedRequest: 4001,
            unauthorized: 4100,
            unsupportedMethod: 4200,
            disconnected: 4900,
            chainDisconnected: 4901,
          },
        }),
        (t.errorValues = {
          "-32700": {
            standard: "JSON RPC 2.0",
            message:
              "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
          },
          "-32600": {
            standard: "JSON RPC 2.0",
            message: "The JSON sent is not a valid Request object.",
          },
          "-32601": {
            standard: "JSON RPC 2.0",
            message: "The method does not exist / is not available.",
          },
          "-32602": {
            standard: "JSON RPC 2.0",
            message: "Invalid method parameter(s).",
          },
          "-32603": {
            standard: "JSON RPC 2.0",
            message: "Internal JSON-RPC error.",
          },
          "-32000": { standard: "EIP-1474", message: "Invalid input." },
          "-32001": { standard: "EIP-1474", message: "Resource not found." },
          "-32002": { standard: "EIP-1474", message: "Resource unavailable." },
          "-32003": { standard: "EIP-1474", message: "Transaction rejected." },
          "-32004": { standard: "EIP-1474", message: "Method not supported." },
          "-32005": {
            standard: "EIP-1474",
            message: "Request limit exceeded.",
          },
          4001: { standard: "EIP-1193", message: "User rejected the request." },
          4100: {
            standard: "EIP-1193",
            message:
              "The requested account and/or method has not been authorized by the user.",
          },
          4200: {
            standard: "EIP-1193",
            message:
              "The requested method is not supported by this Ethereum provider.",
          },
          4900: {
            standard: "EIP-1193",
            message: "The provider is disconnected from all chains.",
          },
          4901: {
            standard: "EIP-1193",
            message: "The provider is disconnected from the specified chain.",
          },
        });
    },
    8917: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ethErrors = void 0);
      const n = r(83192),
        i = r(82653),
        s = r(96950);
      function o(e, t) {
        const [r, s] = l(t);
        return new n.EthereumRpcError(e, r || i.getMessageFromCode(e), s);
      }
      function a(e, t) {
        const [r, s] = l(t);
        return new n.EthereumProviderError(e, r || i.getMessageFromCode(e), s);
      }
      function l(e) {
        if (e) {
          if ("string" === typeof e) return [e];
          if ("object" === typeof e && !Array.isArray(e)) {
            const { message: t, data: r } = e;
            if (t && "string" !== typeof t)
              throw new Error("Must specify string message.");
            return [t || void 0, r];
          }
        }
        return [];
      }
      t.ethErrors = {
        rpc: {
          parse: (e) => o(s.errorCodes.rpc.parse, e),
          invalidRequest: (e) => o(s.errorCodes.rpc.invalidRequest, e),
          invalidParams: (e) => o(s.errorCodes.rpc.invalidParams, e),
          methodNotFound: (e) => o(s.errorCodes.rpc.methodNotFound, e),
          internal: (e) => o(s.errorCodes.rpc.internal, e),
          server: (e) => {
            if (!e || "object" !== typeof e || Array.isArray(e))
              throw new Error(
                "Ethereum RPC Server errors must provide single object argument."
              );
            const { code: t } = e;
            if (!Number.isInteger(t) || t > -32005 || t < -32099)
              throw new Error(
                '"code" must be an integer such that: -32099 <= code <= -32005'
              );
            return o(t, e);
          },
          invalidInput: (e) => o(s.errorCodes.rpc.invalidInput, e),
          resourceNotFound: (e) => o(s.errorCodes.rpc.resourceNotFound, e),
          resourceUnavailable: (e) =>
            o(s.errorCodes.rpc.resourceUnavailable, e),
          transactionRejected: (e) =>
            o(s.errorCodes.rpc.transactionRejected, e),
          methodNotSupported: (e) => o(s.errorCodes.rpc.methodNotSupported, e),
          limitExceeded: (e) => o(s.errorCodes.rpc.limitExceeded, e),
        },
        provider: {
          userRejectedRequest: (e) =>
            a(s.errorCodes.provider.userRejectedRequest, e),
          unauthorized: (e) => a(s.errorCodes.provider.unauthorized, e),
          unsupportedMethod: (e) =>
            a(s.errorCodes.provider.unsupportedMethod, e),
          disconnected: (e) => a(s.errorCodes.provider.disconnected, e),
          chainDisconnected: (e) =>
            a(s.errorCodes.provider.chainDisconnected, e),
          custom: (e) => {
            if (!e || "object" !== typeof e || Array.isArray(e))
              throw new Error(
                "Ethereum Provider custom errors must provide single object argument."
              );
            const { code: t, message: r, data: i } = e;
            if (!r || "string" !== typeof r)
              throw new Error('"message" must be a nonempty string');
            return new n.EthereumProviderError(t, r, i);
          },
        },
      };
    },
    38484: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getMessageFromCode =
          t.serializeError =
          t.EthereumProviderError =
          t.EthereumRpcError =
          t.ethErrors =
          t.errorCodes =
            void 0);
      const n = r(83192);
      Object.defineProperty(t, "EthereumRpcError", {
        enumerable: !0,
        get: function () {
          return n.EthereumRpcError;
        },
      }),
        Object.defineProperty(t, "EthereumProviderError", {
          enumerable: !0,
          get: function () {
            return n.EthereumProviderError;
          },
        });
      const i = r(82653);
      Object.defineProperty(t, "serializeError", {
        enumerable: !0,
        get: function () {
          return i.serializeError;
        },
      }),
        Object.defineProperty(t, "getMessageFromCode", {
          enumerable: !0,
          get: function () {
            return i.getMessageFromCode;
          },
        });
      const s = r(8917);
      Object.defineProperty(t, "ethErrors", {
        enumerable: !0,
        get: function () {
          return s.ethErrors;
        },
      });
      const o = r(96950);
      Object.defineProperty(t, "errorCodes", {
        enumerable: !0,
        get: function () {
          return o.errorCodes;
        },
      });
    },
    82653: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.serializeError =
          t.isValidCode =
          t.getMessageFromCode =
          t.JSON_RPC_SERVER_ERROR_MESSAGE =
            void 0);
      const n = r(96950),
        i = r(83192),
        s = n.errorCodes.rpc.internal,
        o = "Unspecified error message. This is a bug, please report it.",
        a = { code: s, message: l(s) };
      function l(e) {
        let r =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : o;
        if (Number.isInteger(e)) {
          const r = e.toString();
          if (d(n.errorValues, r)) return n.errorValues[r].message;
          if (u(e)) return t.JSON_RPC_SERVER_ERROR_MESSAGE;
        }
        return r;
      }
      function c(e) {
        if (!Number.isInteger(e)) return !1;
        const t = e.toString();
        return !!n.errorValues[t] || !!u(e);
      }
      function u(e) {
        return e >= -32099 && e <= -32e3;
      }
      function h(e) {
        return e && "object" === typeof e && !Array.isArray(e)
          ? Object.assign({}, e)
          : e;
      }
      function d(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      (t.JSON_RPC_SERVER_ERROR_MESSAGE = "Unspecified server error."),
        (t.getMessageFromCode = l),
        (t.isValidCode = c),
        (t.serializeError = function (e) {
          let { fallbackError: t = a, shouldIncludeStack: r = !1 } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          var n, s;
          if (!t || !Number.isInteger(t.code) || "string" !== typeof t.message)
            throw new Error(
              "Must provide fallback error with integer number code and string message."
            );
          if (e instanceof i.EthereumRpcError) return e.serialize();
          const o = {};
          if (
            e &&
            "object" === typeof e &&
            !Array.isArray(e) &&
            d(e, "code") &&
            c(e.code)
          ) {
            const t = e;
            (o.code = t.code),
              t.message && "string" === typeof t.message
                ? ((o.message = t.message), d(t, "data") && (o.data = t.data))
                : ((o.message = l(o.code)), (o.data = { originalError: h(e) }));
          } else {
            o.code = t.code;
            const r = null === (n = e) || void 0 === n ? void 0 : n.message;
            (o.message = r && "string" === typeof r ? r : t.message),
              (o.data = { originalError: h(e) });
          }
          const u = null === (s = e) || void 0 === s ? void 0 : s.stack;
          return r && e && u && "string" === typeof u && (o.stack = u), o;
        });
    },
    27284: (e) => {
      "use strict";
      var t,
        r = "object" === typeof Reflect ? Reflect : null,
        n =
          r && "function" === typeof r.apply
            ? r.apply
            : function (e, t, r) {
                return Function.prototype.apply.call(e, t, r);
              };
      t =
        r && "function" === typeof r.ownKeys
          ? r.ownKeys
          : Object.getOwnPropertySymbols
          ? function (e) {
              return Object.getOwnPropertyNames(e).concat(
                Object.getOwnPropertySymbols(e)
              );
            }
          : function (e) {
              return Object.getOwnPropertyNames(e);
            };
      var i =
        Number.isNaN ||
        function (e) {
          return e !== e;
        };
      function s() {
        s.init.call(this);
      }
      (e.exports = s),
        (e.exports.once = function (e, t) {
          return new Promise(function (r, n) {
            function i(r) {
              e.removeListener(t, s), n(r);
            }
            function s() {
              "function" === typeof e.removeListener &&
                e.removeListener("error", i),
                r([].slice.call(arguments));
            }
            g(e, t, s, { once: !0 }),
              "error" !== t &&
                (function (e, t, r) {
                  "function" === typeof e.on && g(e, "error", t, r);
                })(e, i, { once: !0 });
          });
        }),
        (s.EventEmitter = s),
        (s.prototype._events = void 0),
        (s.prototype._eventsCount = 0),
        (s.prototype._maxListeners = void 0);
      var o = 10;
      function a(e) {
        if ("function" !== typeof e)
          throw new TypeError(
            'The "listener" argument must be of type Function. Received type ' +
              typeof e
          );
      }
      function l(e) {
        return void 0 === e._maxListeners
          ? s.defaultMaxListeners
          : e._maxListeners;
      }
      function c(e, t, r, n) {
        var i, s, o, c;
        if (
          (a(r),
          void 0 === (s = e._events)
            ? ((s = e._events = Object.create(null)), (e._eventsCount = 0))
            : (void 0 !== s.newListener &&
                (e.emit("newListener", t, r.listener ? r.listener : r),
                (s = e._events)),
              (o = s[t])),
          void 0 === o)
        )
          (o = s[t] = r), ++e._eventsCount;
        else if (
          ("function" === typeof o
            ? (o = s[t] = n ? [r, o] : [o, r])
            : n
            ? o.unshift(r)
            : o.push(r),
          (i = l(e)) > 0 && o.length > i && !o.warned)
        ) {
          o.warned = !0;
          var u = new Error(
            "Possible EventEmitter memory leak detected. " +
              o.length +
              " " +
              String(t) +
              " listeners added. Use emitter.setMaxListeners() to increase limit"
          );
          (u.name = "MaxListenersExceededWarning"),
            (u.emitter = e),
            (u.type = t),
            (u.count = o.length),
            (c = u),
            console && console.warn && console.warn(c);
        }
        return e;
      }
      function u() {
        if (!this.fired)
          return (
            this.target.removeListener(this.type, this.wrapFn),
            (this.fired = !0),
            0 === arguments.length
              ? this.listener.call(this.target)
              : this.listener.apply(this.target, arguments)
          );
      }
      function h(e, t, r) {
        var n = { fired: !1, wrapFn: void 0, target: e, type: t, listener: r },
          i = u.bind(n);
        return (i.listener = r), (n.wrapFn = i), i;
      }
      function d(e, t, r) {
        var n = e._events;
        if (void 0 === n) return [];
        var i = n[t];
        return void 0 === i
          ? []
          : "function" === typeof i
          ? r
            ? [i.listener || i]
            : [i]
          : r
          ? (function (e) {
              for (var t = new Array(e.length), r = 0; r < t.length; ++r)
                t[r] = e[r].listener || e[r];
              return t;
            })(i)
          : p(i, i.length);
      }
      function f(e) {
        var t = this._events;
        if (void 0 !== t) {
          var r = t[e];
          if ("function" === typeof r) return 1;
          if (void 0 !== r) return r.length;
        }
        return 0;
      }
      function p(e, t) {
        for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
        return r;
      }
      function g(e, t, r, n) {
        if ("function" === typeof e.on) n.once ? e.once(t, r) : e.on(t, r);
        else {
          if ("function" !== typeof e.addEventListener)
            throw new TypeError(
              'The "emitter" argument must be of type EventEmitter. Received type ' +
                typeof e
            );
          e.addEventListener(t, function i(s) {
            n.once && e.removeEventListener(t, i), r(s);
          });
        }
      }
      Object.defineProperty(s, "defaultMaxListeners", {
        enumerable: !0,
        get: function () {
          return o;
        },
        set: function (e) {
          if ("number" !== typeof e || e < 0 || i(e))
            throw new RangeError(
              'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
                e +
                "."
            );
          o = e;
        },
      }),
        (s.init = function () {
          (void 0 !== this._events &&
            this._events !== Object.getPrototypeOf(this)._events) ||
            ((this._events = Object.create(null)), (this._eventsCount = 0)),
            (this._maxListeners = this._maxListeners || void 0);
        }),
        (s.prototype.setMaxListeners = function (e) {
          if ("number" !== typeof e || e < 0 || i(e))
            throw new RangeError(
              'The value of "n" is out of range. It must be a non-negative number. Received ' +
                e +
                "."
            );
          return (this._maxListeners = e), this;
        }),
        (s.prototype.getMaxListeners = function () {
          return l(this);
        }),
        (s.prototype.emit = function (e) {
          for (var t = [], r = 1; r < arguments.length; r++)
            t.push(arguments[r]);
          var i = "error" === e,
            s = this._events;
          if (void 0 !== s) i = i && void 0 === s.error;
          else if (!i) return !1;
          if (i) {
            var o;
            if ((t.length > 0 && (o = t[0]), o instanceof Error)) throw o;
            var a = new Error(
              "Unhandled error." + (o ? " (" + o.message + ")" : "")
            );
            throw ((a.context = o), a);
          }
          var l = s[e];
          if (void 0 === l) return !1;
          if ("function" === typeof l) n(l, this, t);
          else {
            var c = l.length,
              u = p(l, c);
            for (r = 0; r < c; ++r) n(u[r], this, t);
          }
          return !0;
        }),
        (s.prototype.addListener = function (e, t) {
          return c(this, e, t, !1);
        }),
        (s.prototype.on = s.prototype.addListener),
        (s.prototype.prependListener = function (e, t) {
          return c(this, e, t, !0);
        }),
        (s.prototype.once = function (e, t) {
          return a(t), this.on(e, h(this, e, t)), this;
        }),
        (s.prototype.prependOnceListener = function (e, t) {
          return a(t), this.prependListener(e, h(this, e, t)), this;
        }),
        (s.prototype.removeListener = function (e, t) {
          var r, n, i, s, o;
          if ((a(t), void 0 === (n = this._events))) return this;
          if (void 0 === (r = n[e])) return this;
          if (r === t || r.listener === t)
            0 === --this._eventsCount
              ? (this._events = Object.create(null))
              : (delete n[e],
                n.removeListener &&
                  this.emit("removeListener", e, r.listener || t));
          else if ("function" !== typeof r) {
            for (i = -1, s = r.length - 1; s >= 0; s--)
              if (r[s] === t || r[s].listener === t) {
                (o = r[s].listener), (i = s);
                break;
              }
            if (i < 0) return this;
            0 === i
              ? r.shift()
              : (function (e, t) {
                  for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                  e.pop();
                })(r, i),
              1 === r.length && (n[e] = r[0]),
              void 0 !== n.removeListener &&
                this.emit("removeListener", e, o || t);
          }
          return this;
        }),
        (s.prototype.off = s.prototype.removeListener),
        (s.prototype.removeAllListeners = function (e) {
          var t, r, n;
          if (void 0 === (r = this._events)) return this;
          if (void 0 === r.removeListener)
            return (
              0 === arguments.length
                ? ((this._events = Object.create(null)),
                  (this._eventsCount = 0))
                : void 0 !== r[e] &&
                  (0 === --this._eventsCount
                    ? (this._events = Object.create(null))
                    : delete r[e]),
              this
            );
          if (0 === arguments.length) {
            var i,
              s = Object.keys(r);
            for (n = 0; n < s.length; ++n)
              "removeListener" !== (i = s[n]) && this.removeAllListeners(i);
            return (
              this.removeAllListeners("removeListener"),
              (this._events = Object.create(null)),
              (this._eventsCount = 0),
              this
            );
          }
          if ("function" === typeof (t = r[e])) this.removeListener(e, t);
          else if (void 0 !== t)
            for (n = t.length - 1; n >= 0; n--) this.removeListener(e, t[n]);
          return this;
        }),
        (s.prototype.listeners = function (e) {
          return d(this, e, !0);
        }),
        (s.prototype.rawListeners = function (e) {
          return d(this, e, !1);
        }),
        (s.listenerCount = function (e, t) {
          return "function" === typeof e.listenerCount
            ? e.listenerCount(t)
            : f.call(e, t);
        }),
        (s.prototype.listenerCount = f),
        (s.prototype.eventNames = function () {
          return this._eventsCount > 0 ? t(this._events) : [];
        });
    },
    95376: (e) => {
      (e.exports = o), (o.default = o), (o.stable = u), (o.stableStringify = u);
      var t = "[...]",
        r = "[Circular]",
        n = [],
        i = [];
      function s() {
        return {
          depthLimit: Number.MAX_SAFE_INTEGER,
          edgesLimit: Number.MAX_SAFE_INTEGER,
        };
      }
      function o(e, t, r, o) {
        var a;
        "undefined" === typeof o && (o = s()), l(e, "", 0, [], void 0, 0, o);
        try {
          a =
            0 === i.length
              ? JSON.stringify(e, t, r)
              : JSON.stringify(e, d(t), r);
        } catch (u) {
          return JSON.stringify(
            "[unable to serialize, circular reference is too complex to analyze]"
          );
        } finally {
          for (; 0 !== n.length; ) {
            var c = n.pop();
            4 === c.length
              ? Object.defineProperty(c[0], c[1], c[3])
              : (c[0][c[1]] = c[2]);
          }
        }
        return a;
      }
      function a(e, t, r, s) {
        var o = Object.getOwnPropertyDescriptor(s, r);
        void 0 !== o.get
          ? o.configurable
            ? (Object.defineProperty(s, r, { value: e }), n.push([s, r, t, o]))
            : i.push([t, r, e])
          : ((s[r] = e), n.push([s, r, t]));
      }
      function l(e, n, i, s, o, c, u) {
        var h;
        if (((c += 1), "object" === typeof e && null !== e)) {
          for (h = 0; h < s.length; h++)
            if (s[h] === e) return void a(r, e, n, o);
          if ("undefined" !== typeof u.depthLimit && c > u.depthLimit)
            return void a(t, e, n, o);
          if ("undefined" !== typeof u.edgesLimit && i + 1 > u.edgesLimit)
            return void a(t, e, n, o);
          if ((s.push(e), Array.isArray(e)))
            for (h = 0; h < e.length; h++) l(e[h], h, h, s, e, c, u);
          else {
            var d = Object.keys(e);
            for (h = 0; h < d.length; h++) {
              var f = d[h];
              l(e[f], f, h, s, e, c, u);
            }
          }
          s.pop();
        }
      }
      function c(e, t) {
        return e < t ? -1 : e > t ? 1 : 0;
      }
      function u(e, t, r, o) {
        "undefined" === typeof o && (o = s());
        var a,
          l = h(e, "", 0, [], void 0, 0, o) || e;
        try {
          a =
            0 === i.length
              ? JSON.stringify(l, t, r)
              : JSON.stringify(l, d(t), r);
        } catch (u) {
          return JSON.stringify(
            "[unable to serialize, circular reference is too complex to analyze]"
          );
        } finally {
          for (; 0 !== n.length; ) {
            var c = n.pop();
            4 === c.length
              ? Object.defineProperty(c[0], c[1], c[3])
              : (c[0][c[1]] = c[2]);
          }
        }
        return a;
      }
      function h(e, i, s, o, l, u, d) {
        var f;
        if (((u += 1), "object" === typeof e && null !== e)) {
          for (f = 0; f < o.length; f++)
            if (o[f] === e) return void a(r, e, i, l);
          try {
            if ("function" === typeof e.toJSON) return;
          } catch (_) {
            return;
          }
          if ("undefined" !== typeof d.depthLimit && u > d.depthLimit)
            return void a(t, e, i, l);
          if ("undefined" !== typeof d.edgesLimit && s + 1 > d.edgesLimit)
            return void a(t, e, i, l);
          if ((o.push(e), Array.isArray(e)))
            for (f = 0; f < e.length; f++) h(e[f], f, f, o, e, u, d);
          else {
            var p = {},
              g = Object.keys(e).sort(c);
            for (f = 0; f < g.length; f++) {
              var m = g[f];
              h(e[m], m, f, o, e, u, d), (p[m] = e[m]);
            }
            if ("undefined" === typeof l) return p;
            n.push([l, i, e]), (l[i] = p);
          }
          o.pop();
        }
      }
      function d(e) {
        return (
          (e =
            "undefined" !== typeof e
              ? e
              : function (e, t) {
                  return t;
                }),
          function (t, r) {
            if (i.length > 0)
              for (var n = 0; n < i.length; n++) {
                var s = i[n];
                if (s[1] === t && s[0] === r) {
                  (r = s[2]), i.splice(n, 1);
                  break;
                }
              }
            return e.call(this, t, r);
          }
        );
      }
    },
    56329: (e) => {
      "function" === typeof Object.create
        ? (e.exports = function (e, t) {
            t &&
              ((e.super_ = t),
              (e.prototype = Object.create(t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })));
          })
        : (e.exports = function (e, t) {
            if (t) {
              e.super_ = t;
              var r = function () {};
              (r.prototype = t.prototype),
                (e.prototype = new r()),
                (e.prototype.constructor = e);
            }
          });
    },
    1625: function (e, t, r) {
      "use strict";
      var n =
        (this && this.__importDefault) ||
        function (e) {
          return e && e.__esModule ? e : { default: e };
        };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.JsonRpcEngine = void 0);
      const i = n(r(73556)),
        s = r(38484);
      class o extends i.default {
        constructor() {
          super(), (this._middleware = []);
        }
        push(e) {
          this._middleware.push(e);
        }
        handle(e, t) {
          if (t && "function" !== typeof t)
            throw new Error('"callback" must be a function if provided.');
          return Array.isArray(e)
            ? t
              ? this._handleBatch(e, t)
              : this._handleBatch(e)
            : t
            ? this._handle(e, t)
            : this._promiseHandle(e);
        }
        asMiddleware() {
          return async (e, t, r, n) => {
            try {
              const [i, s, a] = await o._runAllMiddleware(
                e,
                t,
                this._middleware
              );
              return s
                ? (await o._runReturnHandlers(a), n(i))
                : r(async (e) => {
                    try {
                      await o._runReturnHandlers(a);
                    } catch (t) {
                      return e(t);
                    }
                    return e();
                  });
            } catch (i) {
              return n(i);
            }
          };
        }
        async _handleBatch(e, t) {
          try {
            const r = await Promise.all(e.map(this._promiseHandle.bind(this)));
            return t ? t(null, r) : r;
          } catch (r) {
            if (t) return t(r);
            throw r;
          }
        }
        _promiseHandle(e) {
          return new Promise((t) => {
            this._handle(e, (e, r) => {
              t(r);
            });
          });
        }
        async _handle(e, t) {
          if (!e || Array.isArray(e) || "object" !== typeof e) {
            const r = new s.EthereumRpcError(
              s.errorCodes.rpc.invalidRequest,
              "Requests must be plain objects. Received: " + typeof e,
              { request: e }
            );
            return t(r, { id: void 0, jsonrpc: "2.0", error: r });
          }
          if ("string" !== typeof e.method) {
            const r = new s.EthereumRpcError(
              s.errorCodes.rpc.invalidRequest,
              "Must specify a string method. Received: " + typeof e.method,
              { request: e }
            );
            return t(r, { id: e.id, jsonrpc: "2.0", error: r });
          }
          const r = Object.assign({}, e),
            n = { id: r.id, jsonrpc: r.jsonrpc };
          let i = null;
          try {
            await this._processRequest(r, n);
          } catch (o) {
            i = o;
          }
          return (
            i && (delete n.result, n.error || (n.error = s.serializeError(i))),
            t(i, n)
          );
        }
        async _processRequest(e, t) {
          const [r, n, i] = await o._runAllMiddleware(e, t, this._middleware);
          if (
            (o._checkForCompletion(e, t, n), await o._runReturnHandlers(i), r)
          )
            throw r;
        }
        static async _runAllMiddleware(e, t, r) {
          const n = [];
          let i = null,
            s = !1;
          for (const a of r)
            if ((([i, s] = await o._runMiddleware(e, t, a, n)), s)) break;
          return [i, s, n.reverse()];
        }
        static _runMiddleware(e, t, r, n) {
          return new Promise((i) => {
            const o = (e) => {
                const r = e || t.error;
                r && (t.error = s.serializeError(r)), i([r, !0]);
              },
              l = (r) => {
                t.error
                  ? o(t.error)
                  : (r &&
                      ("function" !== typeof r &&
                        o(
                          new s.EthereumRpcError(
                            s.errorCodes.rpc.internal,
                            `JsonRpcEngine: "next" return handlers must be functions. Received "${typeof r}" for request:\n${a(
                              e
                            )}`,
                            { request: e }
                          )
                        ),
                      n.push(r)),
                    i([null, !1]));
              };
            try {
              r(e, t, l, o);
            } catch (c) {
              o(c);
            }
          });
        }
        static async _runReturnHandlers(e) {
          for (const t of e)
            await new Promise((e, r) => {
              t((t) => (t ? r(t) : e()));
            });
        }
        static _checkForCompletion(e, t, r) {
          if (!("result" in t) && !("error" in t))
            throw new s.EthereumRpcError(
              s.errorCodes.rpc.internal,
              `JsonRpcEngine: Response has no error or result for request:\n${a(
                e
              )}`,
              { request: e }
            );
          if (!r)
            throw new s.EthereumRpcError(
              s.errorCodes.rpc.internal,
              `JsonRpcEngine: Nothing ended request:\n${a(e)}`,
              { request: e }
            );
        }
      }
      function a(e) {
        return JSON.stringify(e, null, 2);
      }
      t.JsonRpcEngine = o;
    },
    78658: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.createAsyncMiddleware = void 0),
        (t.createAsyncMiddleware = function (e) {
          return async (t, r, n, i) => {
            let s;
            const o = new Promise((e) => {
              s = e;
            });
            let a = null,
              l = !1;
            const c = async () => {
              (l = !0),
                n((e) => {
                  (a = e), s();
                }),
                await o;
            };
            try {
              await e(t, r, c), l ? (await o, a(null)) : i(null);
            } catch (u) {
              a ? a(u) : i(u);
            }
          };
        });
    },
    6630: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.createScaffoldMiddleware = void 0),
        (t.createScaffoldMiddleware = function (e) {
          return (t, r, n, i) => {
            const s = e[t.method];
            return void 0 === s
              ? n()
              : "function" === typeof s
              ? s(t, r, n, i)
              : ((r.result = s), i());
          };
        });
    },
    82820: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getUniqueId = void 0);
      const r = 4294967295;
      let n = Math.floor(Math.random() * r);
      t.getUniqueId = function () {
        return (n = (n + 1) % r), n;
      };
    },
    91316: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.createIdRemapMiddleware = void 0);
      const n = r(82820);
      t.createIdRemapMiddleware = function () {
        return (e, t, r, i) => {
          const s = e.id,
            o = n.getUniqueId();
          (e.id = o),
            (t.id = o),
            r((r) => {
              (e.id = s), (t.id = s), r();
            });
        };
      };
    },
    23534: function (e, t, r) {
      "use strict";
      var n =
          (this && this.__createBinding) ||
          (Object.create
            ? function (e, t, r, n) {
                void 0 === n && (n = r),
                  Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: function () {
                      return t[r];
                    },
                  });
              }
            : function (e, t, r, n) {
                void 0 === n && (n = r), (e[n] = t[r]);
              }),
        i =
          (this && this.__exportStar) ||
          function (e, t) {
            for (var r in e)
              "default" === r ||
                Object.prototype.hasOwnProperty.call(t, r) ||
                n(t, e, r);
          };
      Object.defineProperty(t, "__esModule", { value: !0 }),
        i(r(91316), t),
        i(r(78658), t),
        i(r(6630), t),
        i(r(82820), t),
        i(r(1625), t),
        i(r(11054), t);
    },
    11054: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.mergeMiddleware = void 0);
      const n = r(1625);
      t.mergeMiddleware = function (e) {
        const t = new n.JsonRpcEngine();
        return e.forEach((e) => t.push(e)), t.asMiddleware();
      };
    },
    73556: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 });
      const n = r(27284);
      function i(e, t, r) {
        try {
          Reflect.apply(e, t, r);
        } catch (n) {
          setTimeout(() => {
            throw n;
          });
        }
      }
      class s extends n.EventEmitter {
        emit(e) {
          let t = "error" === e;
          const r = this._events;
          if (void 0 !== r) t = t && void 0 === r.error;
          else if (!t) return !1;
          for (
            var n = arguments.length, s = new Array(n > 1 ? n - 1 : 0), o = 1;
            o < n;
            o++
          )
            s[o - 1] = arguments[o];
          if (t) {
            let e;
            if ((s.length > 0 && ([e] = s), e instanceof Error)) throw e;
            const t = new Error(
              "Unhandled error." + (e ? ` (${e.message})` : "")
            );
            throw ((t.context = e), t);
          }
          const a = r[e];
          if (void 0 === a) return !1;
          if ("function" === typeof a) i(a, this, s);
          else {
            const e = a.length,
              t = (function (e) {
                const t = e.length,
                  r = new Array(t);
                for (let n = 0; n < t; n += 1) r[n] = e[n];
                return r;
              })(a);
            for (let r = 0; r < e; r += 1) i(t[r], this, s);
          }
          return !0;
        }
      }
      t.default = s;
    },
    10402: (e) => {
      e.exports = function (e) {
        var t = (e = e || {}).max || Number.MAX_SAFE_INTEGER,
          r =
            "undefined" !== typeof e.start
              ? e.start
              : Math.floor(Math.random() * t);
        return function () {
          return (r %= t), r++;
        };
      };
    },
    85831: (e, t, r) => {
      e.exports = r(87597)(r(5890));
    },
    87597: (e, t, r) => {
      const n = r(22923),
        i = r(66271);
      e.exports = function (e) {
        const t = n(e),
          r = i(e);
        return function (e, n) {
          switch ("string" === typeof e ? e.toLowerCase() : e) {
            case "keccak224":
              return new t(1152, 448, null, 224, n);
            case "keccak256":
              return new t(1088, 512, null, 256, n);
            case "keccak384":
              return new t(832, 768, null, 384, n);
            case "keccak512":
              return new t(576, 1024, null, 512, n);
            case "sha3-224":
              return new t(1152, 448, 6, 224, n);
            case "sha3-256":
              return new t(1088, 512, 6, 256, n);
            case "sha3-384":
              return new t(832, 768, 6, 384, n);
            case "sha3-512":
              return new t(576, 1024, 6, 512, n);
            case "shake128":
              return new r(1344, 256, 31, n);
            case "shake256":
              return new r(1088, 512, 31, n);
            default:
              throw new Error("Invald algorithm: " + e);
          }
        };
      };
    },
    22923: (e, t, r) => {
      const { Transform: n } = r(77764);
      e.exports = (e) =>
        class t extends n {
          constructor(t, r, n, i, s) {
            super(s),
              (this._rate = t),
              (this._capacity = r),
              (this._delimitedSuffix = n),
              (this._hashBitLength = i),
              (this._options = s),
              (this._state = new e()),
              this._state.initialize(t, r),
              (this._finalized = !1);
          }
          _transform(e, t, r) {
            let n = null;
            try {
              this.update(e, t);
            } catch (i) {
              n = i;
            }
            r(n);
          }
          _flush(e) {
            let t = null;
            try {
              this.push(this.digest());
            } catch (r) {
              t = r;
            }
            e(t);
          }
          update(e, t) {
            if (!Buffer.isBuffer(e) && "string" !== typeof e)
              throw new TypeError("Data must be a string or a buffer");
            if (this._finalized) throw new Error("Digest already called");
            return (
              Buffer.isBuffer(e) || (e = Buffer.from(e, t)),
              this._state.absorb(e),
              this
            );
          }
          digest(e) {
            if (this._finalized) throw new Error("Digest already called");
            (this._finalized = !0),
              this._delimitedSuffix &&
                this._state.absorbLastFewBits(this._delimitedSuffix);
            let t = this._state.squeeze(this._hashBitLength / 8);
            return void 0 !== e && (t = t.toString(e)), this._resetState(), t;
          }
          _resetState() {
            return this._state.initialize(this._rate, this._capacity), this;
          }
          _clone() {
            const e = new t(
              this._rate,
              this._capacity,
              this._delimitedSuffix,
              this._hashBitLength,
              this._options
            );
            return (
              this._state.copy(e._state), (e._finalized = this._finalized), e
            );
          }
        };
    },
    66271: (e, t, r) => {
      const { Transform: n } = r(77764);
      e.exports = (e) =>
        class t extends n {
          constructor(t, r, n, i) {
            super(i),
              (this._rate = t),
              (this._capacity = r),
              (this._delimitedSuffix = n),
              (this._options = i),
              (this._state = new e()),
              this._state.initialize(t, r),
              (this._finalized = !1);
          }
          _transform(e, t, r) {
            let n = null;
            try {
              this.update(e, t);
            } catch (i) {
              n = i;
            }
            r(n);
          }
          _flush() {}
          _read(e) {
            this.push(this.squeeze(e));
          }
          update(e, t) {
            if (!Buffer.isBuffer(e) && "string" !== typeof e)
              throw new TypeError("Data must be a string or a buffer");
            if (this._finalized) throw new Error("Squeeze already called");
            return (
              Buffer.isBuffer(e) || (e = Buffer.from(e, t)),
              this._state.absorb(e),
              this
            );
          }
          squeeze(e, t) {
            this._finalized ||
              ((this._finalized = !0),
              this._state.absorbLastFewBits(this._delimitedSuffix));
            let r = this._state.squeeze(e);
            return void 0 !== t && (r = r.toString(t)), r;
          }
          _resetState() {
            return this._state.initialize(this._rate, this._capacity), this;
          }
          _clone() {
            const e = new t(
              this._rate,
              this._capacity,
              this._delimitedSuffix,
              this._options
            );
            return (
              this._state.copy(e._state), (e._finalized = this._finalized), e
            );
          }
        };
    },
    80127: (e, t) => {
      const r = [
        1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
        2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136,
        0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648, 32905,
        2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648,
        32778, 0, 2147483658, 2147483648, 2147516545, 2147483648, 32896,
        2147483648, 2147483649, 0, 2147516424, 2147483648,
      ];
      t.p1600 = function (e) {
        for (let t = 0; t < 24; ++t) {
          const n = e[0] ^ e[10] ^ e[20] ^ e[30] ^ e[40],
            i = e[1] ^ e[11] ^ e[21] ^ e[31] ^ e[41],
            s = e[2] ^ e[12] ^ e[22] ^ e[32] ^ e[42],
            o = e[3] ^ e[13] ^ e[23] ^ e[33] ^ e[43],
            a = e[4] ^ e[14] ^ e[24] ^ e[34] ^ e[44],
            l = e[5] ^ e[15] ^ e[25] ^ e[35] ^ e[45],
            c = e[6] ^ e[16] ^ e[26] ^ e[36] ^ e[46],
            u = e[7] ^ e[17] ^ e[27] ^ e[37] ^ e[47],
            h = e[8] ^ e[18] ^ e[28] ^ e[38] ^ e[48],
            d = e[9] ^ e[19] ^ e[29] ^ e[39] ^ e[49];
          let f = h ^ ((s << 1) | (o >>> 31)),
            p = d ^ ((o << 1) | (s >>> 31));
          const g = e[0] ^ f,
            m = e[1] ^ p,
            _ = e[10] ^ f,
            v = e[11] ^ p,
            y = e[20] ^ f,
            b = e[21] ^ p,
            w = e[30] ^ f,
            E = e[31] ^ p,
            k = e[40] ^ f,
            S = e[41] ^ p;
          (f = n ^ ((a << 1) | (l >>> 31))), (p = i ^ ((l << 1) | (a >>> 31)));
          const M = e[2] ^ f,
            C = e[3] ^ p,
            R = e[12] ^ f,
            I = e[13] ^ p,
            A = e[22] ^ f,
            x = e[23] ^ p,
            L = e[32] ^ f,
            N = e[33] ^ p,
            P = e[42] ^ f,
            T = e[43] ^ p;
          (f = s ^ ((c << 1) | (u >>> 31))), (p = o ^ ((u << 1) | (c >>> 31)));
          const O = e[4] ^ f,
            B = e[5] ^ p,
            j = e[14] ^ f,
            D = e[15] ^ p,
            F = e[24] ^ f,
            U = e[25] ^ p,
            $ = e[34] ^ f,
            H = e[35] ^ p,
            W = e[44] ^ f,
            q = e[45] ^ p;
          (f = a ^ ((h << 1) | (d >>> 31))), (p = l ^ ((d << 1) | (h >>> 31)));
          const V = e[6] ^ f,
            z = e[7] ^ p,
            G = e[16] ^ f,
            J = e[17] ^ p,
            Z = e[26] ^ f,
            K = e[27] ^ p,
            Y = e[36] ^ f,
            Q = e[37] ^ p,
            X = e[46] ^ f,
            ee = e[47] ^ p;
          (f = c ^ ((n << 1) | (i >>> 31))), (p = u ^ ((i << 1) | (n >>> 31)));
          const te = e[8] ^ f,
            re = e[9] ^ p,
            ne = e[18] ^ f,
            ie = e[19] ^ p,
            se = e[28] ^ f,
            oe = e[29] ^ p,
            ae = e[38] ^ f,
            le = e[39] ^ p,
            ce = e[48] ^ f,
            ue = e[49] ^ p,
            he = g,
            de = m,
            fe = (v << 4) | (_ >>> 28),
            pe = (_ << 4) | (v >>> 28),
            ge = (y << 3) | (b >>> 29),
            me = (b << 3) | (y >>> 29),
            _e = (E << 9) | (w >>> 23),
            ve = (w << 9) | (E >>> 23),
            ye = (k << 18) | (S >>> 14),
            be = (S << 18) | (k >>> 14),
            we = (M << 1) | (C >>> 31),
            Ee = (C << 1) | (M >>> 31),
            ke = (I << 12) | (R >>> 20),
            Se = (R << 12) | (I >>> 20),
            Me = (A << 10) | (x >>> 22),
            Ce = (x << 10) | (A >>> 22),
            Re = (N << 13) | (L >>> 19),
            Ie = (L << 13) | (N >>> 19),
            Ae = (P << 2) | (T >>> 30),
            xe = (T << 2) | (P >>> 30),
            Le = (B << 30) | (O >>> 2),
            Ne = (O << 30) | (B >>> 2),
            Pe = (j << 6) | (D >>> 26),
            Te = (D << 6) | (j >>> 26),
            Oe = (U << 11) | (F >>> 21),
            Be = (F << 11) | (U >>> 21),
            je = ($ << 15) | (H >>> 17),
            De = (H << 15) | ($ >>> 17),
            Fe = (q << 29) | (W >>> 3),
            Ue = (W << 29) | (q >>> 3),
            $e = (V << 28) | (z >>> 4),
            He = (z << 28) | (V >>> 4),
            We = (J << 23) | (G >>> 9),
            qe = (G << 23) | (J >>> 9),
            Ve = (Z << 25) | (K >>> 7),
            ze = (K << 25) | (Z >>> 7),
            Ge = (Y << 21) | (Q >>> 11),
            Je = (Q << 21) | (Y >>> 11),
            Ze = (ee << 24) | (X >>> 8),
            Ke = (X << 24) | (ee >>> 8),
            Ye = (te << 27) | (re >>> 5),
            Qe = (re << 27) | (te >>> 5),
            Xe = (ne << 20) | (ie >>> 12),
            et = (ie << 20) | (ne >>> 12),
            tt = (oe << 7) | (se >>> 25),
            rt = (se << 7) | (oe >>> 25),
            nt = (ae << 8) | (le >>> 24),
            it = (le << 8) | (ae >>> 24),
            st = (ce << 14) | (ue >>> 18),
            ot = (ue << 14) | (ce >>> 18);
          (e[0] = he ^ (~ke & Oe)),
            (e[1] = de ^ (~Se & Be)),
            (e[10] = $e ^ (~Xe & ge)),
            (e[11] = He ^ (~et & me)),
            (e[20] = we ^ (~Pe & Ve)),
            (e[21] = Ee ^ (~Te & ze)),
            (e[30] = Ye ^ (~fe & Me)),
            (e[31] = Qe ^ (~pe & Ce)),
            (e[40] = Le ^ (~We & tt)),
            (e[41] = Ne ^ (~qe & rt)),
            (e[2] = ke ^ (~Oe & Ge)),
            (e[3] = Se ^ (~Be & Je)),
            (e[12] = Xe ^ (~ge & Re)),
            (e[13] = et ^ (~me & Ie)),
            (e[22] = Pe ^ (~Ve & nt)),
            (e[23] = Te ^ (~ze & it)),
            (e[32] = fe ^ (~Me & je)),
            (e[33] = pe ^ (~Ce & De)),
            (e[42] = We ^ (~tt & _e)),
            (e[43] = qe ^ (~rt & ve)),
            (e[4] = Oe ^ (~Ge & st)),
            (e[5] = Be ^ (~Je & ot)),
            (e[14] = ge ^ (~Re & Fe)),
            (e[15] = me ^ (~Ie & Ue)),
            (e[24] = Ve ^ (~nt & ye)),
            (e[25] = ze ^ (~it & be)),
            (e[34] = Me ^ (~je & Ze)),
            (e[35] = Ce ^ (~De & Ke)),
            (e[44] = tt ^ (~_e & Ae)),
            (e[45] = rt ^ (~ve & xe)),
            (e[6] = Ge ^ (~st & he)),
            (e[7] = Je ^ (~ot & de)),
            (e[16] = Re ^ (~Fe & $e)),
            (e[17] = Ie ^ (~Ue & He)),
            (e[26] = nt ^ (~ye & we)),
            (e[27] = it ^ (~be & Ee)),
            (e[36] = je ^ (~Ze & Ye)),
            (e[37] = De ^ (~Ke & Qe)),
            (e[46] = _e ^ (~Ae & Le)),
            (e[47] = ve ^ (~xe & Ne)),
            (e[8] = st ^ (~he & ke)),
            (e[9] = ot ^ (~de & Se)),
            (e[18] = Fe ^ (~$e & Xe)),
            (e[19] = Ue ^ (~He & et)),
            (e[28] = ye ^ (~we & Pe)),
            (e[29] = be ^ (~Ee & Te)),
            (e[38] = Ze ^ (~Ye & fe)),
            (e[39] = Ke ^ (~Qe & pe)),
            (e[48] = Ae ^ (~Le & We)),
            (e[49] = xe ^ (~Ne & qe)),
            (e[0] ^= r[2 * t]),
            (e[1] ^= r[2 * t + 1]);
        }
      };
    },
    5890: (e, t, r) => {
      const n = r(80127);
      function i() {
        (this.state = [
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0,
        ]),
          (this.blockSize = null),
          (this.count = 0),
          (this.squeezing = !1);
      }
      (i.prototype.initialize = function (e, t) {
        for (let r = 0; r < 50; ++r) this.state[r] = 0;
        (this.blockSize = e / 8), (this.count = 0), (this.squeezing = !1);
      }),
        (i.prototype.absorb = function (e) {
          for (let t = 0; t < e.length; ++t)
            (this.state[~~(this.count / 4)] ^= e[t] << ((this.count % 4) * 8)),
              (this.count += 1),
              this.count === this.blockSize &&
                (n.p1600(this.state), (this.count = 0));
        }),
        (i.prototype.absorbLastFewBits = function (e) {
          (this.state[~~(this.count / 4)] ^= e << ((this.count % 4) * 8)),
            0 !== (128 & e) &&
              this.count === this.blockSize - 1 &&
              n.p1600(this.state),
            (this.state[~~((this.blockSize - 1) / 4)] ^=
              128 << (((this.blockSize - 1) % 4) * 8)),
            n.p1600(this.state),
            (this.count = 0),
            (this.squeezing = !0);
        }),
        (i.prototype.squeeze = function (e) {
          this.squeezing || this.absorbLastFewBits(1);
          const t = Buffer.alloc(e);
          for (let r = 0; r < e; ++r)
            (t[r] =
              (this.state[~~(this.count / 4)] >>> ((this.count % 4) * 8)) &
              255),
              (this.count += 1),
              this.count === this.blockSize &&
                (n.p1600(this.state), (this.count = 0));
          return t;
        }),
        (i.prototype.copy = function (e) {
          for (let t = 0; t < 50; ++t) e.state[t] = this.state[t];
          (e.blockSize = this.blockSize),
            (e.count = this.count),
            (e.squeezing = this.squeezing);
        }),
        (e.exports = i);
    },
    31579: (e) => {
      "use strict";
      var t = {};
      function r(e, r, n) {
        n || (n = Error);
        var i = (function (e) {
          var t, n;
          function i(t, n, i) {
            return (
              e.call(
                this,
                (function (e, t, n) {
                  return "string" === typeof r ? r : r(e, t, n);
                })(t, n, i)
              ) || this
            );
          }
          return (
            (n = e),
            ((t = i).prototype = Object.create(n.prototype)),
            (t.prototype.constructor = t),
            (t.__proto__ = n),
            i
          );
        })(n);
        (i.prototype.name = n.name), (i.prototype.code = e), (t[e] = i);
      }
      function n(e, t) {
        if (Array.isArray(e)) {
          var r = e.length;
          return (
            (e = e.map(function (e) {
              return String(e);
            })),
            r > 2
              ? "one of "
                  .concat(t, " ")
                  .concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1]
              : 2 === r
              ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1])
              : "of ".concat(t, " ").concat(e[0])
          );
        }
        return "of ".concat(t, " ").concat(String(e));
      }
      r(
        "ERR_INVALID_OPT_VALUE",
        function (e, t) {
          return 'The value "' + t + '" is invalid for option "' + e + '"';
        },
        TypeError
      ),
        r(
          "ERR_INVALID_ARG_TYPE",
          function (e, t, r) {
            var i, s, o, a;
            if (
              ("string" === typeof t &&
              ((s = "not "), t.substr(!o || o < 0 ? 0 : +o, s.length) === s)
                ? ((i = "must not be"), (t = t.replace(/^not /, "")))
                : (i = "must be"),
              (function (e, t, r) {
                return (
                  (void 0 === r || r > e.length) && (r = e.length),
                  e.substring(r - t.length, r) === t
                );
              })(e, " argument"))
            )
              a = "The ".concat(e, " ").concat(i, " ").concat(n(t, "type"));
            else {
              var l = (function (e, t, r) {
                return (
                  "number" !== typeof r && (r = 0),
                  !(r + t.length > e.length) && -1 !== e.indexOf(t, r)
                );
              })(e, ".")
                ? "property"
                : "argument";
              a = 'The "'
                .concat(e, '" ')
                .concat(l, " ")
                .concat(i, " ")
                .concat(n(t, "type"));
            }
            return (a += ". Received type ".concat(typeof r));
          },
          TypeError
        ),
        r("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"),
        r("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
          return "The " + e + " method is not implemented";
        }),
        r("ERR_STREAM_PREMATURE_CLOSE", "Premature close"),
        r("ERR_STREAM_DESTROYED", function (e) {
          return "Cannot call " + e + " after a stream was destroyed";
        }),
        r("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"),
        r("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"),
        r("ERR_STREAM_WRITE_AFTER_END", "write after end"),
        r(
          "ERR_STREAM_NULL_VALUES",
          "May not write null values to stream",
          TypeError
        ),
        r(
          "ERR_UNKNOWN_ENCODING",
          function (e) {
            return "Unknown encoding: " + e;
          },
          TypeError
        ),
        r(
          "ERR_STREAM_UNSHIFT_AFTER_END_EVENT",
          "stream.unshift() after end event"
        ),
        (e.exports.F = t);
    },
    30921: (e, t, r) => {
      "use strict";
      var n =
        Object.keys ||
        function (e) {
          var t = [];
          for (var r in e) t.push(r);
          return t;
        };
      e.exports = c;
      var i = r(17823),
        s = r(97843);
      r(56329)(c, i);
      for (var o = n(s.prototype), a = 0; a < o.length; a++) {
        var l = o[a];
        c.prototype[l] || (c.prototype[l] = s.prototype[l]);
      }
      function c(e) {
        if (!(this instanceof c)) return new c(e);
        i.call(this, e),
          s.call(this, e),
          (this.allowHalfOpen = !0),
          e &&
            (!1 === e.readable && (this.readable = !1),
            !1 === e.writable && (this.writable = !1),
            !1 === e.allowHalfOpen &&
              ((this.allowHalfOpen = !1), this.once("end", u)));
      }
      function u() {
        this._writableState.ended || process.nextTick(h, this);
      }
      function h(e) {
        e.end();
      }
      Object.defineProperty(c.prototype, "writableHighWaterMark", {
        enumerable: !1,
        get: function () {
          return this._writableState.highWaterMark;
        },
      }),
        Object.defineProperty(c.prototype, "writableBuffer", {
          enumerable: !1,
          get: function () {
            return this._writableState && this._writableState.getBuffer();
          },
        }),
        Object.defineProperty(c.prototype, "writableLength", {
          enumerable: !1,
          get: function () {
            return this._writableState.length;
          },
        }),
        Object.defineProperty(c.prototype, "destroyed", {
          enumerable: !1,
          get: function () {
            return (
              void 0 !== this._readableState &&
              void 0 !== this._writableState &&
              this._readableState.destroyed &&
              this._writableState.destroyed
            );
          },
          set: function (e) {
            void 0 !== this._readableState &&
              void 0 !== this._writableState &&
              ((this._readableState.destroyed = e),
              (this._writableState.destroyed = e));
          },
        });
    },
    86589: (e, t, r) => {
      "use strict";
      e.exports = i;
      var n = r(32415);
      function i(e) {
        if (!(this instanceof i)) return new i(e);
        n.call(this, e);
      }
      r(56329)(i, n),
        (i.prototype._transform = function (e, t, r) {
          r(null, e);
        });
    },
    17823: (e, t, r) => {
      "use strict";
      var n;
      (e.exports = S), (S.ReadableState = k);
      r(27284).EventEmitter;
      var i = function (e, t) {
          return e.listeners(t).length;
        },
        s = r(41472),
        o = r(26382).Buffer,
        a =
          ("undefined" !== typeof r.g
            ? r.g
            : "undefined" !== typeof window
            ? window
            : "undefined" !== typeof self
            ? self
            : {}
          ).Uint8Array || function () {};
      var l,
        c = r(6948);
      l = c && c.debuglog ? c.debuglog("stream") : function () {};
      var u,
        h,
        d,
        f = r(40618),
        p = r(66711),
        g = r(29896).getHighWaterMark,
        m = r(31579).F,
        _ = m.ERR_INVALID_ARG_TYPE,
        v = m.ERR_STREAM_PUSH_AFTER_EOF,
        y = m.ERR_METHOD_NOT_IMPLEMENTED,
        b = m.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
      r(56329)(S, s);
      var w = p.errorOrDestroy,
        E = ["error", "close", "destroy", "pause", "resume"];
      function k(e, t, i) {
        (n = n || r(30921)),
          (e = e || {}),
          "boolean" !== typeof i && (i = t instanceof n),
          (this.objectMode = !!e.objectMode),
          i && (this.objectMode = this.objectMode || !!e.readableObjectMode),
          (this.highWaterMark = g(this, e, "readableHighWaterMark", i)),
          (this.buffer = new f()),
          (this.length = 0),
          (this.pipes = null),
          (this.pipesCount = 0),
          (this.flowing = null),
          (this.ended = !1),
          (this.endEmitted = !1),
          (this.reading = !1),
          (this.sync = !0),
          (this.needReadable = !1),
          (this.emittedReadable = !1),
          (this.readableListening = !1),
          (this.resumeScheduled = !1),
          (this.paused = !0),
          (this.emitClose = !1 !== e.emitClose),
          (this.autoDestroy = !!e.autoDestroy),
          (this.destroyed = !1),
          (this.defaultEncoding = e.defaultEncoding || "utf8"),
          (this.awaitDrain = 0),
          (this.readingMore = !1),
          (this.decoder = null),
          (this.encoding = null),
          e.encoding &&
            (u || (u = r(56e3).I),
            (this.decoder = new u(e.encoding)),
            (this.encoding = e.encoding));
      }
      function S(e) {
        if (((n = n || r(30921)), !(this instanceof S))) return new S(e);
        var t = this instanceof n;
        (this._readableState = new k(e, this, t)),
          (this.readable = !0),
          e &&
            ("function" === typeof e.read && (this._read = e.read),
            "function" === typeof e.destroy && (this._destroy = e.destroy)),
          s.call(this);
      }
      function M(e, t, r, n, i) {
        l("readableAddChunk", t);
        var s,
          c = e._readableState;
        if (null === t)
          (c.reading = !1),
            (function (e, t) {
              if ((l("onEofChunk"), t.ended)) return;
              if (t.decoder) {
                var r = t.decoder.end();
                r &&
                  r.length &&
                  (t.buffer.push(r), (t.length += t.objectMode ? 1 : r.length));
              }
              (t.ended = !0),
                t.sync
                  ? A(e)
                  : ((t.needReadable = !1),
                    t.emittedReadable || ((t.emittedReadable = !0), x(e)));
            })(e, c);
        else if (
          (i ||
            (s = (function (e, t) {
              var r;
              (n = t),
                o.isBuffer(n) ||
                  n instanceof a ||
                  "string" === typeof t ||
                  void 0 === t ||
                  e.objectMode ||
                  (r = new _("chunk", ["string", "Buffer", "Uint8Array"], t));
              var n;
              return r;
            })(c, t)),
          s)
        )
          w(e, s);
        else if (c.objectMode || (t && t.length > 0))
          if (
            ("string" === typeof t ||
              c.objectMode ||
              Object.getPrototypeOf(t) === o.prototype ||
              (t = (function (e) {
                return o.from(e);
              })(t)),
            n)
          )
            c.endEmitted ? w(e, new b()) : C(e, c, t, !0);
          else if (c.ended) w(e, new v());
          else {
            if (c.destroyed) return !1;
            (c.reading = !1),
              c.decoder && !r
                ? ((t = c.decoder.write(t)),
                  c.objectMode || 0 !== t.length ? C(e, c, t, !1) : L(e, c))
                : C(e, c, t, !1);
          }
        else n || ((c.reading = !1), L(e, c));
        return !c.ended && (c.length < c.highWaterMark || 0 === c.length);
      }
      function C(e, t, r, n) {
        t.flowing && 0 === t.length && !t.sync
          ? ((t.awaitDrain = 0), e.emit("data", r))
          : ((t.length += t.objectMode ? 1 : r.length),
            n ? t.buffer.unshift(r) : t.buffer.push(r),
            t.needReadable && A(e)),
          L(e, t);
      }
      Object.defineProperty(S.prototype, "destroyed", {
        enumerable: !1,
        get: function () {
          return (
            void 0 !== this._readableState && this._readableState.destroyed
          );
        },
        set: function (e) {
          this._readableState && (this._readableState.destroyed = e);
        },
      }),
        (S.prototype.destroy = p.destroy),
        (S.prototype._undestroy = p.undestroy),
        (S.prototype._destroy = function (e, t) {
          t(e);
        }),
        (S.prototype.push = function (e, t) {
          var r,
            n = this._readableState;
          return (
            n.objectMode
              ? (r = !0)
              : "string" === typeof e &&
                ((t = t || n.defaultEncoding) !== n.encoding &&
                  ((e = o.from(e, t)), (t = "")),
                (r = !0)),
            M(this, e, t, !1, r)
          );
        }),
        (S.prototype.unshift = function (e) {
          return M(this, e, null, !0, !1);
        }),
        (S.prototype.isPaused = function () {
          return !1 === this._readableState.flowing;
        }),
        (S.prototype.setEncoding = function (e) {
          u || (u = r(56e3).I);
          var t = new u(e);
          (this._readableState.decoder = t),
            (this._readableState.encoding =
              this._readableState.decoder.encoding);
          for (var n = this._readableState.buffer.head, i = ""; null !== n; )
            (i += t.write(n.data)), (n = n.next);
          return (
            this._readableState.buffer.clear(),
            "" !== i && this._readableState.buffer.push(i),
            (this._readableState.length = i.length),
            this
          );
        });
      var R = 1073741824;
      function I(e, t) {
        return e <= 0 || (0 === t.length && t.ended)
          ? 0
          : t.objectMode
          ? 1
          : e !== e
          ? t.flowing && t.length
            ? t.buffer.head.data.length
            : t.length
          : (e > t.highWaterMark &&
              (t.highWaterMark = (function (e) {
                return (
                  e >= R
                    ? (e = R)
                    : (e--,
                      (e |= e >>> 1),
                      (e |= e >>> 2),
                      (e |= e >>> 4),
                      (e |= e >>> 8),
                      (e |= e >>> 16),
                      e++),
                  e
                );
              })(e)),
            e <= t.length
              ? e
              : t.ended
              ? t.length
              : ((t.needReadable = !0), 0));
      }
      function A(e) {
        var t = e._readableState;
        l("emitReadable", t.needReadable, t.emittedReadable),
          (t.needReadable = !1),
          t.emittedReadable ||
            (l("emitReadable", t.flowing),
            (t.emittedReadable = !0),
            process.nextTick(x, e));
      }
      function x(e) {
        var t = e._readableState;
        l("emitReadable_", t.destroyed, t.length, t.ended),
          t.destroyed ||
            (!t.length && !t.ended) ||
            (e.emit("readable"), (t.emittedReadable = !1)),
          (t.needReadable =
            !t.flowing && !t.ended && t.length <= t.highWaterMark),
          B(e);
      }
      function L(e, t) {
        t.readingMore || ((t.readingMore = !0), process.nextTick(N, e, t));
      }
      function N(e, t) {
        for (
          ;
          !t.reading &&
          !t.ended &&
          (t.length < t.highWaterMark || (t.flowing && 0 === t.length));

        ) {
          var r = t.length;
          if ((l("maybeReadMore read 0"), e.read(0), r === t.length)) break;
        }
        t.readingMore = !1;
      }
      function P(e) {
        var t = e._readableState;
        (t.readableListening = e.listenerCount("readable") > 0),
          t.resumeScheduled && !t.paused
            ? (t.flowing = !0)
            : e.listenerCount("data") > 0 && e.resume();
      }
      function T(e) {
        l("readable nexttick read 0"), e.read(0);
      }
      function O(e, t) {
        l("resume", t.reading),
          t.reading || e.read(0),
          (t.resumeScheduled = !1),
          e.emit("resume"),
          B(e),
          t.flowing && !t.reading && e.read(0);
      }
      function B(e) {
        var t = e._readableState;
        for (l("flow", t.flowing); t.flowing && null !== e.read(); );
      }
      function j(e, t) {
        return 0 === t.length
          ? null
          : (t.objectMode
              ? (r = t.buffer.shift())
              : !e || e >= t.length
              ? ((r = t.decoder
                  ? t.buffer.join("")
                  : 1 === t.buffer.length
                  ? t.buffer.first()
                  : t.buffer.concat(t.length)),
                t.buffer.clear())
              : (r = t.buffer.consume(e, t.decoder)),
            r);
        var r;
      }
      function D(e) {
        var t = e._readableState;
        l("endReadable", t.endEmitted),
          t.endEmitted || ((t.ended = !0), process.nextTick(F, t, e));
      }
      function F(e, t) {
        if (
          (l("endReadableNT", e.endEmitted, e.length),
          !e.endEmitted &&
            0 === e.length &&
            ((e.endEmitted = !0),
            (t.readable = !1),
            t.emit("end"),
            e.autoDestroy))
        ) {
          var r = t._writableState;
          (!r || (r.autoDestroy && r.finished)) && t.destroy();
        }
      }
      function U(e, t) {
        for (var r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
        return -1;
      }
      (S.prototype.read = function (e) {
        l("read", e), (e = parseInt(e, 10));
        var t = this._readableState,
          r = e;
        if (
          (0 !== e && (t.emittedReadable = !1),
          0 === e &&
            t.needReadable &&
            ((0 !== t.highWaterMark
              ? t.length >= t.highWaterMark
              : t.length > 0) ||
              t.ended))
        )
          return (
            l("read: emitReadable", t.length, t.ended),
            0 === t.length && t.ended ? D(this) : A(this),
            null
          );
        if (0 === (e = I(e, t)) && t.ended)
          return 0 === t.length && D(this), null;
        var n,
          i = t.needReadable;
        return (
          l("need readable", i),
          (0 === t.length || t.length - e < t.highWaterMark) &&
            l("length less than watermark", (i = !0)),
          t.ended || t.reading
            ? l("reading or ended", (i = !1))
            : i &&
              (l("do read"),
              (t.reading = !0),
              (t.sync = !0),
              0 === t.length && (t.needReadable = !0),
              this._read(t.highWaterMark),
              (t.sync = !1),
              t.reading || (e = I(r, t))),
          null === (n = e > 0 ? j(e, t) : null)
            ? ((t.needReadable = t.length <= t.highWaterMark), (e = 0))
            : ((t.length -= e), (t.awaitDrain = 0)),
          0 === t.length &&
            (t.ended || (t.needReadable = !0), r !== e && t.ended && D(this)),
          null !== n && this.emit("data", n),
          n
        );
      }),
        (S.prototype._read = function (e) {
          w(this, new y("_read()"));
        }),
        (S.prototype.pipe = function (e, t) {
          var r = this,
            n = this._readableState;
          switch (n.pipesCount) {
            case 0:
              n.pipes = e;
              break;
            case 1:
              n.pipes = [n.pipes, e];
              break;
            default:
              n.pipes.push(e);
          }
          (n.pipesCount += 1), l("pipe count=%d opts=%j", n.pipesCount, t);
          var s =
            (!t || !1 !== t.end) && e !== process.stdout && e !== process.stderr
              ? a
              : g;
          function o(t, i) {
            l("onunpipe"),
              t === r &&
                i &&
                !1 === i.hasUnpiped &&
                ((i.hasUnpiped = !0),
                l("cleanup"),
                e.removeListener("close", f),
                e.removeListener("finish", p),
                e.removeListener("drain", c),
                e.removeListener("error", d),
                e.removeListener("unpipe", o),
                r.removeListener("end", a),
                r.removeListener("end", g),
                r.removeListener("data", h),
                (u = !0),
                !n.awaitDrain ||
                  (e._writableState && !e._writableState.needDrain) ||
                  c());
          }
          function a() {
            l("onend"), e.end();
          }
          n.endEmitted ? process.nextTick(s) : r.once("end", s),
            e.on("unpipe", o);
          var c = (function (e) {
            return function () {
              var t = e._readableState;
              l("pipeOnDrain", t.awaitDrain),
                t.awaitDrain && t.awaitDrain--,
                0 === t.awaitDrain && i(e, "data") && ((t.flowing = !0), B(e));
            };
          })(r);
          e.on("drain", c);
          var u = !1;
          function h(t) {
            l("ondata");
            var i = e.write(t);
            l("dest.write", i),
              !1 === i &&
                (((1 === n.pipesCount && n.pipes === e) ||
                  (n.pipesCount > 1 && -1 !== U(n.pipes, e))) &&
                  !u &&
                  (l("false write response, pause", n.awaitDrain),
                  n.awaitDrain++),
                r.pause());
          }
          function d(t) {
            l("onerror", t),
              g(),
              e.removeListener("error", d),
              0 === i(e, "error") && w(e, t);
          }
          function f() {
            e.removeListener("finish", p), g();
          }
          function p() {
            l("onfinish"), e.removeListener("close", f), g();
          }
          function g() {
            l("unpipe"), r.unpipe(e);
          }
          return (
            r.on("data", h),
            (function (e, t, r) {
              if ("function" === typeof e.prependListener)
                return e.prependListener(t, r);
              e._events && e._events[t]
                ? Array.isArray(e._events[t])
                  ? e._events[t].unshift(r)
                  : (e._events[t] = [r, e._events[t]])
                : e.on(t, r);
            })(e, "error", d),
            e.once("close", f),
            e.once("finish", p),
            e.emit("pipe", r),
            n.flowing || (l("pipe resume"), r.resume()),
            e
          );
        }),
        (S.prototype.unpipe = function (e) {
          var t = this._readableState,
            r = { hasUnpiped: !1 };
          if (0 === t.pipesCount) return this;
          if (1 === t.pipesCount)
            return (
              (e && e !== t.pipes) ||
                (e || (e = t.pipes),
                (t.pipes = null),
                (t.pipesCount = 0),
                (t.flowing = !1),
                e && e.emit("unpipe", this, r)),
              this
            );
          if (!e) {
            var n = t.pipes,
              i = t.pipesCount;
            (t.pipes = null), (t.pipesCount = 0), (t.flowing = !1);
            for (var s = 0; s < i; s++)
              n[s].emit("unpipe", this, { hasUnpiped: !1 });
            return this;
          }
          var o = U(t.pipes, e);
          return (
            -1 === o ||
              (t.pipes.splice(o, 1),
              (t.pipesCount -= 1),
              1 === t.pipesCount && (t.pipes = t.pipes[0]),
              e.emit("unpipe", this, r)),
            this
          );
        }),
        (S.prototype.on = function (e, t) {
          var r = s.prototype.on.call(this, e, t),
            n = this._readableState;
          return (
            "data" === e
              ? ((n.readableListening = this.listenerCount("readable") > 0),
                !1 !== n.flowing && this.resume())
              : "readable" === e &&
                (n.endEmitted ||
                  n.readableListening ||
                  ((n.readableListening = n.needReadable = !0),
                  (n.flowing = !1),
                  (n.emittedReadable = !1),
                  l("on readable", n.length, n.reading),
                  n.length ? A(this) : n.reading || process.nextTick(T, this))),
            r
          );
        }),
        (S.prototype.addListener = S.prototype.on),
        (S.prototype.removeListener = function (e, t) {
          var r = s.prototype.removeListener.call(this, e, t);
          return "readable" === e && process.nextTick(P, this), r;
        }),
        (S.prototype.removeAllListeners = function (e) {
          var t = s.prototype.removeAllListeners.apply(this, arguments);
          return (
            ("readable" !== e && void 0 !== e) || process.nextTick(P, this), t
          );
        }),
        (S.prototype.resume = function () {
          var e = this._readableState;
          return (
            e.flowing ||
              (l("resume"),
              (e.flowing = !e.readableListening),
              (function (e, t) {
                t.resumeScheduled ||
                  ((t.resumeScheduled = !0), process.nextTick(O, e, t));
              })(this, e)),
            (e.paused = !1),
            this
          );
        }),
        (S.prototype.pause = function () {
          return (
            l("call pause flowing=%j", this._readableState.flowing),
            !1 !== this._readableState.flowing &&
              (l("pause"),
              (this._readableState.flowing = !1),
              this.emit("pause")),
            (this._readableState.paused = !0),
            this
          );
        }),
        (S.prototype.wrap = function (e) {
          var t = this,
            r = this._readableState,
            n = !1;
          for (var i in (e.on("end", function () {
            if ((l("wrapped end"), r.decoder && !r.ended)) {
              var e = r.decoder.end();
              e && e.length && t.push(e);
            }
            t.push(null);
          }),
          e.on("data", function (i) {
            (l("wrapped data"),
            r.decoder && (i = r.decoder.write(i)),
            !r.objectMode || (null !== i && void 0 !== i)) &&
              (r.objectMode || (i && i.length)) &&
              (t.push(i) || ((n = !0), e.pause()));
          }),
          e))
            void 0 === this[i] &&
              "function" === typeof e[i] &&
              (this[i] = (function (t) {
                return function () {
                  return e[t].apply(e, arguments);
                };
              })(i));
          for (var s = 0; s < E.length; s++)
            e.on(E[s], this.emit.bind(this, E[s]));
          return (
            (this._read = function (t) {
              l("wrapped _read", t), n && ((n = !1), e.resume());
            }),
            this
          );
        }),
        "function" === typeof Symbol &&
          (S.prototype[Symbol.asyncIterator] = function () {
            return void 0 === h && (h = r(85374)), h(this);
          }),
        Object.defineProperty(S.prototype, "readableHighWaterMark", {
          enumerable: !1,
          get: function () {
            return this._readableState.highWaterMark;
          },
        }),
        Object.defineProperty(S.prototype, "readableBuffer", {
          enumerable: !1,
          get: function () {
            return this._readableState && this._readableState.buffer;
          },
        }),
        Object.defineProperty(S.prototype, "readableFlowing", {
          enumerable: !1,
          get: function () {
            return this._readableState.flowing;
          },
          set: function (e) {
            this._readableState && (this._readableState.flowing = e);
          },
        }),
        (S._fromList = j),
        Object.defineProperty(S.prototype, "readableLength", {
          enumerable: !1,
          get: function () {
            return this._readableState.length;
          },
        }),
        "function" === typeof Symbol &&
          (S.from = function (e, t) {
            return void 0 === d && (d = r(8756)), d(S, e, t);
          });
    },
    32415: (e, t, r) => {
      "use strict";
      e.exports = u;
      var n = r(31579).F,
        i = n.ERR_METHOD_NOT_IMPLEMENTED,
        s = n.ERR_MULTIPLE_CALLBACK,
        o = n.ERR_TRANSFORM_ALREADY_TRANSFORMING,
        a = n.ERR_TRANSFORM_WITH_LENGTH_0,
        l = r(30921);
      function c(e, t) {
        var r = this._transformState;
        r.transforming = !1;
        var n = r.writecb;
        if (null === n) return this.emit("error", new s());
        (r.writechunk = null),
          (r.writecb = null),
          null != t && this.push(t),
          n(e);
        var i = this._readableState;
        (i.reading = !1),
          (i.needReadable || i.length < i.highWaterMark) &&
            this._read(i.highWaterMark);
      }
      function u(e) {
        if (!(this instanceof u)) return new u(e);
        l.call(this, e),
          (this._transformState = {
            afterTransform: c.bind(this),
            needTransform: !1,
            transforming: !1,
            writecb: null,
            writechunk: null,
            writeencoding: null,
          }),
          (this._readableState.needReadable = !0),
          (this._readableState.sync = !1),
          e &&
            ("function" === typeof e.transform &&
              (this._transform = e.transform),
            "function" === typeof e.flush && (this._flush = e.flush)),
          this.on("prefinish", h);
      }
      function h() {
        var e = this;
        "function" !== typeof this._flush || this._readableState.destroyed
          ? d(this, null, null)
          : this._flush(function (t, r) {
              d(e, t, r);
            });
      }
      function d(e, t, r) {
        if (t) return e.emit("error", t);
        if ((null != r && e.push(r), e._writableState.length)) throw new a();
        if (e._transformState.transforming) throw new o();
        return e.push(null);
      }
      r(56329)(u, l),
        (u.prototype.push = function (e, t) {
          return (
            (this._transformState.needTransform = !1),
            l.prototype.push.call(this, e, t)
          );
        }),
        (u.prototype._transform = function (e, t, r) {
          r(new i("_transform()"));
        }),
        (u.prototype._write = function (e, t, r) {
          var n = this._transformState;
          if (
            ((n.writecb = r),
            (n.writechunk = e),
            (n.writeencoding = t),
            !n.transforming)
          ) {
            var i = this._readableState;
            (n.needTransform || i.needReadable || i.length < i.highWaterMark) &&
              this._read(i.highWaterMark);
          }
        }),
        (u.prototype._read = function (e) {
          var t = this._transformState;
          null === t.writechunk || t.transforming
            ? (t.needTransform = !0)
            : ((t.transforming = !0),
              this._transform(t.writechunk, t.writeencoding, t.afterTransform));
        }),
        (u.prototype._destroy = function (e, t) {
          l.prototype._destroy.call(this, e, function (e) {
            t(e);
          });
        });
    },
    97843: (e, t, r) => {
      "use strict";
      function n(e) {
        var t = this;
        (this.next = null),
          (this.entry = null),
          (this.finish = function () {
            !(function (e, t, r) {
              var n = e.entry;
              e.entry = null;
              for (; n; ) {
                var i = n.callback;
                t.pendingcb--, i(r), (n = n.next);
              }
              t.corkedRequestsFree.next = e;
            })(t, e);
          });
      }
      var i;
      (e.exports = S), (S.WritableState = k);
      var s = { deprecate: r(82390) },
        o = r(41472),
        a = r(26382).Buffer,
        l =
          ("undefined" !== typeof r.g
            ? r.g
            : "undefined" !== typeof window
            ? window
            : "undefined" !== typeof self
            ? self
            : {}
          ).Uint8Array || function () {};
      var c,
        u = r(66711),
        h = r(29896).getHighWaterMark,
        d = r(31579).F,
        f = d.ERR_INVALID_ARG_TYPE,
        p = d.ERR_METHOD_NOT_IMPLEMENTED,
        g = d.ERR_MULTIPLE_CALLBACK,
        m = d.ERR_STREAM_CANNOT_PIPE,
        _ = d.ERR_STREAM_DESTROYED,
        v = d.ERR_STREAM_NULL_VALUES,
        y = d.ERR_STREAM_WRITE_AFTER_END,
        b = d.ERR_UNKNOWN_ENCODING,
        w = u.errorOrDestroy;
      function E() {}
      function k(e, t, s) {
        (i = i || r(30921)),
          (e = e || {}),
          "boolean" !== typeof s && (s = t instanceof i),
          (this.objectMode = !!e.objectMode),
          s && (this.objectMode = this.objectMode || !!e.writableObjectMode),
          (this.highWaterMark = h(this, e, "writableHighWaterMark", s)),
          (this.finalCalled = !1),
          (this.needDrain = !1),
          (this.ending = !1),
          (this.ended = !1),
          (this.finished = !1),
          (this.destroyed = !1);
        var o = !1 === e.decodeStrings;
        (this.decodeStrings = !o),
          (this.defaultEncoding = e.defaultEncoding || "utf8"),
          (this.length = 0),
          (this.writing = !1),
          (this.corked = 0),
          (this.sync = !0),
          (this.bufferProcessing = !1),
          (this.onwrite = function (e) {
            !(function (e, t) {
              var r = e._writableState,
                n = r.sync,
                i = r.writecb;
              if ("function" !== typeof i) throw new g();
              if (
                ((function (e) {
                  (e.writing = !1),
                    (e.writecb = null),
                    (e.length -= e.writelen),
                    (e.writelen = 0);
                })(r),
                t)
              )
                !(function (e, t, r, n, i) {
                  --t.pendingcb,
                    r
                      ? (process.nextTick(i, n),
                        process.nextTick(x, e, t),
                        (e._writableState.errorEmitted = !0),
                        w(e, n))
                      : (i(n),
                        (e._writableState.errorEmitted = !0),
                        w(e, n),
                        x(e, t));
                })(e, r, n, t, i);
              else {
                var s = I(r) || e.destroyed;
                s ||
                  r.corked ||
                  r.bufferProcessing ||
                  !r.bufferedRequest ||
                  R(e, r),
                  n ? process.nextTick(C, e, r, s, i) : C(e, r, s, i);
              }
            })(t, e);
          }),
          (this.writecb = null),
          (this.writelen = 0),
          (this.bufferedRequest = null),
          (this.lastBufferedRequest = null),
          (this.pendingcb = 0),
          (this.prefinished = !1),
          (this.errorEmitted = !1),
          (this.emitClose = !1 !== e.emitClose),
          (this.autoDestroy = !!e.autoDestroy),
          (this.bufferedRequestCount = 0),
          (this.corkedRequestsFree = new n(this));
      }
      function S(e) {
        var t = this instanceof (i = i || r(30921));
        if (!t && !c.call(S, this)) return new S(e);
        (this._writableState = new k(e, this, t)),
          (this.writable = !0),
          e &&
            ("function" === typeof e.write && (this._write = e.write),
            "function" === typeof e.writev && (this._writev = e.writev),
            "function" === typeof e.destroy && (this._destroy = e.destroy),
            "function" === typeof e.final && (this._final = e.final)),
          o.call(this);
      }
      function M(e, t, r, n, i, s, o) {
        (t.writelen = n),
          (t.writecb = o),
          (t.writing = !0),
          (t.sync = !0),
          t.destroyed
            ? t.onwrite(new _("write"))
            : r
            ? e._writev(i, t.onwrite)
            : e._write(i, s, t.onwrite),
          (t.sync = !1);
      }
      function C(e, t, r, n) {
        r ||
          (function (e, t) {
            0 === t.length &&
              t.needDrain &&
              ((t.needDrain = !1), e.emit("drain"));
          })(e, t),
          t.pendingcb--,
          n(),
          x(e, t);
      }
      function R(e, t) {
        t.bufferProcessing = !0;
        var r = t.bufferedRequest;
        if (e._writev && r && r.next) {
          var i = t.bufferedRequestCount,
            s = new Array(i),
            o = t.corkedRequestsFree;
          o.entry = r;
          for (var a = 0, l = !0; r; )
            (s[a] = r), r.isBuf || (l = !1), (r = r.next), (a += 1);
          (s.allBuffers = l),
            M(e, t, !0, t.length, s, "", o.finish),
            t.pendingcb++,
            (t.lastBufferedRequest = null),
            o.next
              ? ((t.corkedRequestsFree = o.next), (o.next = null))
              : (t.corkedRequestsFree = new n(t)),
            (t.bufferedRequestCount = 0);
        } else {
          for (; r; ) {
            var c = r.chunk,
              u = r.encoding,
              h = r.callback;
            if (
              (M(e, t, !1, t.objectMode ? 1 : c.length, c, u, h),
              (r = r.next),
              t.bufferedRequestCount--,
              t.writing)
            )
              break;
          }
          null === r && (t.lastBufferedRequest = null);
        }
        (t.bufferedRequest = r), (t.bufferProcessing = !1);
      }
      function I(e) {
        return (
          e.ending &&
          0 === e.length &&
          null === e.bufferedRequest &&
          !e.finished &&
          !e.writing
        );
      }
      function A(e, t) {
        e._final(function (r) {
          t.pendingcb--,
            r && w(e, r),
            (t.prefinished = !0),
            e.emit("prefinish"),
            x(e, t);
        });
      }
      function x(e, t) {
        var r = I(t);
        if (
          r &&
          ((function (e, t) {
            t.prefinished ||
              t.finalCalled ||
              ("function" !== typeof e._final || t.destroyed
                ? ((t.prefinished = !0), e.emit("prefinish"))
                : (t.pendingcb++,
                  (t.finalCalled = !0),
                  process.nextTick(A, e, t)));
          })(e, t),
          0 === t.pendingcb &&
            ((t.finished = !0), e.emit("finish"), t.autoDestroy))
        ) {
          var n = e._readableState;
          (!n || (n.autoDestroy && n.endEmitted)) && e.destroy();
        }
        return r;
      }
      r(56329)(S, o),
        (k.prototype.getBuffer = function () {
          for (var e = this.bufferedRequest, t = []; e; )
            t.push(e), (e = e.next);
          return t;
        }),
        (function () {
          try {
            Object.defineProperty(k.prototype, "buffer", {
              get: s.deprecate(
                function () {
                  return this.getBuffer();
                },
                "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
                "DEP0003"
              ),
            });
          } catch (e) {}
        })(),
        "function" === typeof Symbol &&
        Symbol.hasInstance &&
        "function" === typeof Function.prototype[Symbol.hasInstance]
          ? ((c = Function.prototype[Symbol.hasInstance]),
            Object.defineProperty(S, Symbol.hasInstance, {
              value: function (e) {
                return (
                  !!c.call(this, e) ||
                  (this === S && e && e._writableState instanceof k)
                );
              },
            }))
          : (c = function (e) {
              return e instanceof this;
            }),
        (S.prototype.pipe = function () {
          w(this, new m());
        }),
        (S.prototype.write = function (e, t, r) {
          var n,
            i = this._writableState,
            s = !1,
            o = !i.objectMode && ((n = e), a.isBuffer(n) || n instanceof l);
          return (
            o &&
              !a.isBuffer(e) &&
              (e = (function (e) {
                return a.from(e);
              })(e)),
            "function" === typeof t && ((r = t), (t = null)),
            o ? (t = "buffer") : t || (t = i.defaultEncoding),
            "function" !== typeof r && (r = E),
            i.ending
              ? (function (e, t) {
                  var r = new y();
                  w(e, r), process.nextTick(t, r);
                })(this, r)
              : (o ||
                  (function (e, t, r, n) {
                    var i;
                    return (
                      null === r
                        ? (i = new v())
                        : "string" === typeof r ||
                          t.objectMode ||
                          (i = new f("chunk", ["string", "Buffer"], r)),
                      !i || (w(e, i), process.nextTick(n, i), !1)
                    );
                  })(this, i, e, r)) &&
                (i.pendingcb++,
                (s = (function (e, t, r, n, i, s) {
                  if (!r) {
                    var o = (function (e, t, r) {
                      e.objectMode ||
                        !1 === e.decodeStrings ||
                        "string" !== typeof t ||
                        (t = a.from(t, r));
                      return t;
                    })(t, n, i);
                    n !== o && ((r = !0), (i = "buffer"), (n = o));
                  }
                  var l = t.objectMode ? 1 : n.length;
                  t.length += l;
                  var c = t.length < t.highWaterMark;
                  c || (t.needDrain = !0);
                  if (t.writing || t.corked) {
                    var u = t.lastBufferedRequest;
                    (t.lastBufferedRequest = {
                      chunk: n,
                      encoding: i,
                      isBuf: r,
                      callback: s,
                      next: null,
                    }),
                      u
                        ? (u.next = t.lastBufferedRequest)
                        : (t.bufferedRequest = t.lastBufferedRequest),
                      (t.bufferedRequestCount += 1);
                  } else M(e, t, !1, l, n, i, s);
                  return c;
                })(this, i, o, e, t, r))),
            s
          );
        }),
        (S.prototype.cork = function () {
          this._writableState.corked++;
        }),
        (S.prototype.uncork = function () {
          var e = this._writableState;
          e.corked &&
            (e.corked--,
            e.writing ||
              e.corked ||
              e.bufferProcessing ||
              !e.bufferedRequest ||
              R(this, e));
        }),
        (S.prototype.setDefaultEncoding = function (e) {
          if (
            ("string" === typeof e && (e = e.toLowerCase()),
            !(
              [
                "hex",
                "utf8",
                "utf-8",
                "ascii",
                "binary",
                "base64",
                "ucs2",
                "ucs-2",
                "utf16le",
                "utf-16le",
                "raw",
              ].indexOf((e + "").toLowerCase()) > -1
            ))
          )
            throw new b(e);
          return (this._writableState.defaultEncoding = e), this;
        }),
        Object.defineProperty(S.prototype, "writableBuffer", {
          enumerable: !1,
          get: function () {
            return this._writableState && this._writableState.getBuffer();
          },
        }),
        Object.defineProperty(S.prototype, "writableHighWaterMark", {
          enumerable: !1,
          get: function () {
            return this._writableState.highWaterMark;
          },
        }),
        (S.prototype._write = function (e, t, r) {
          r(new p("_write()"));
        }),
        (S.prototype._writev = null),
        (S.prototype.end = function (e, t, r) {
          var n = this._writableState;
          return (
            "function" === typeof e
              ? ((r = e), (e = null), (t = null))
              : "function" === typeof t && ((r = t), (t = null)),
            null !== e && void 0 !== e && this.write(e, t),
            n.corked && ((n.corked = 1), this.uncork()),
            n.ending ||
              (function (e, t, r) {
                (t.ending = !0),
                  x(e, t),
                  r && (t.finished ? process.nextTick(r) : e.once("finish", r));
                (t.ended = !0), (e.writable = !1);
              })(this, n, r),
            this
          );
        }),
        Object.defineProperty(S.prototype, "writableLength", {
          enumerable: !1,
          get: function () {
            return this._writableState.length;
          },
        }),
        Object.defineProperty(S.prototype, "destroyed", {
          enumerable: !1,
          get: function () {
            return (
              void 0 !== this._writableState && this._writableState.destroyed
            );
          },
          set: function (e) {
            this._writableState && (this._writableState.destroyed = e);
          },
        }),
        (S.prototype.destroy = u.destroy),
        (S.prototype._undestroy = u.undestroy),
        (S.prototype._destroy = function (e, t) {
          t(e);
        });
    },
    85374: (e, t, r) => {
      "use strict";
      var n;
      function i(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e, t) {
              if ("object" !== typeof e || null === e) return e;
              var r = e[Symbol.toPrimitive];
              if (void 0 !== r) {
                var n = r.call(e, t || "default");
                if ("object" !== typeof n) return n;
                throw new TypeError(
                  "@@toPrimitive must return a primitive value."
                );
              }
              return ("string" === t ? String : Number)(e);
            })(e, "string");
            return "symbol" === typeof t ? t : String(t);
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var s = r(85997),
        o = Symbol("lastResolve"),
        a = Symbol("lastReject"),
        l = Symbol("error"),
        c = Symbol("ended"),
        u = Symbol("lastPromise"),
        h = Symbol("handlePromise"),
        d = Symbol("stream");
      function f(e, t) {
        return { value: e, done: t };
      }
      function p(e) {
        var t = e[o];
        if (null !== t) {
          var r = e[d].read();
          null !== r &&
            ((e[u] = null), (e[o] = null), (e[a] = null), t(f(r, !1)));
        }
      }
      function g(e) {
        process.nextTick(p, e);
      }
      var m = Object.getPrototypeOf(function () {}),
        _ = Object.setPrototypeOf(
          (i(
            (n = {
              get stream() {
                return this[d];
              },
              next: function () {
                var e = this,
                  t = this[l];
                if (null !== t) return Promise.reject(t);
                if (this[c]) return Promise.resolve(f(void 0, !0));
                if (this[d].destroyed)
                  return new Promise(function (t, r) {
                    process.nextTick(function () {
                      e[l] ? r(e[l]) : t(f(void 0, !0));
                    });
                  });
                var r,
                  n = this[u];
                if (n)
                  r = new Promise(
                    (function (e, t) {
                      return function (r, n) {
                        e.then(function () {
                          t[c] ? r(f(void 0, !0)) : t[h](r, n);
                        }, n);
                      };
                    })(n, this)
                  );
                else {
                  var i = this[d].read();
                  if (null !== i) return Promise.resolve(f(i, !1));
                  r = new Promise(this[h]);
                }
                return (this[u] = r), r;
              },
            }),
            Symbol.asyncIterator,
            function () {
              return this;
            }
          ),
          i(n, "return", function () {
            var e = this;
            return new Promise(function (t, r) {
              e[d].destroy(null, function (e) {
                e ? r(e) : t(f(void 0, !0));
              });
            });
          }),
          n),
          m
        );
      e.exports = function (e) {
        var t,
          r = Object.create(
            _,
            (i((t = {}), d, { value: e, writable: !0 }),
            i(t, o, { value: null, writable: !0 }),
            i(t, a, { value: null, writable: !0 }),
            i(t, l, { value: null, writable: !0 }),
            i(t, c, { value: e._readableState.endEmitted, writable: !0 }),
            i(t, h, {
              value: function (e, t) {
                var n = r[d].read();
                n
                  ? ((r[u] = null), (r[o] = null), (r[a] = null), e(f(n, !1)))
                  : ((r[o] = e), (r[a] = t));
              },
              writable: !0,
            }),
            t)
          );
        return (
          (r[u] = null),
          s(e, function (e) {
            if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
              var t = r[a];
              return (
                null !== t &&
                  ((r[u] = null), (r[o] = null), (r[a] = null), t(e)),
                void (r[l] = e)
              );
            }
            var n = r[o];
            null !== n &&
              ((r[u] = null), (r[o] = null), (r[a] = null), n(f(void 0, !0))),
              (r[c] = !0);
          }),
          e.on("readable", g.bind(null, r)),
          r
        );
      };
    },
    40618: (e, t, r) => {
      "use strict";
      function n(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n);
        }
        return r;
      }
      function i(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? n(Object(r), !0).forEach(function (t) {
                s(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
            : n(Object(r)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(r, t)
                );
              });
        }
        return e;
      }
      function s(e, t, r) {
        return (
          (t = a(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function o(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, a(n.key), n);
        }
      }
      function a(e) {
        var t = (function (e, t) {
          if ("object" !== typeof e || null === e) return e;
          var r = e[Symbol.toPrimitive];
          if (void 0 !== r) {
            var n = r.call(e, t || "default");
            if ("object" !== typeof n) return n;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === t ? String : Number)(e);
        })(e, "string");
        return "symbol" === typeof t ? t : String(t);
      }
      var l = r(26382).Buffer,
        c = r(60782).inspect,
        u = (c && c.custom) || "inspect";
      e.exports = (function () {
        function e() {
          !(function (e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          })(this, e),
            (this.head = null),
            (this.tail = null),
            (this.length = 0);
        }
        var t, r, n;
        return (
          (t = e),
          (r = [
            {
              key: "push",
              value: function (e) {
                var t = { data: e, next: null };
                this.length > 0 ? (this.tail.next = t) : (this.head = t),
                  (this.tail = t),
                  ++this.length;
              },
            },
            {
              key: "unshift",
              value: function (e) {
                var t = { data: e, next: this.head };
                0 === this.length && (this.tail = t),
                  (this.head = t),
                  ++this.length;
              },
            },
            {
              key: "shift",
              value: function () {
                if (0 !== this.length) {
                  var e = this.head.data;
                  return (
                    1 === this.length
                      ? (this.head = this.tail = null)
                      : (this.head = this.head.next),
                    --this.length,
                    e
                  );
                }
              },
            },
            {
              key: "clear",
              value: function () {
                (this.head = this.tail = null), (this.length = 0);
              },
            },
            {
              key: "join",
              value: function (e) {
                if (0 === this.length) return "";
                for (var t = this.head, r = "" + t.data; (t = t.next); )
                  r += e + t.data;
                return r;
              },
            },
            {
              key: "concat",
              value: function (e) {
                if (0 === this.length) return l.alloc(0);
                for (
                  var t, r, n, i = l.allocUnsafe(e >>> 0), s = this.head, o = 0;
                  s;

                )
                  (t = s.data),
                    (r = i),
                    (n = o),
                    l.prototype.copy.call(t, r, n),
                    (o += s.data.length),
                    (s = s.next);
                return i;
              },
            },
            {
              key: "consume",
              value: function (e, t) {
                var r;
                return (
                  e < this.head.data.length
                    ? ((r = this.head.data.slice(0, e)),
                      (this.head.data = this.head.data.slice(e)))
                    : (r =
                        e === this.head.data.length
                          ? this.shift()
                          : t
                          ? this._getString(e)
                          : this._getBuffer(e)),
                  r
                );
              },
            },
            {
              key: "first",
              value: function () {
                return this.head.data;
              },
            },
            {
              key: "_getString",
              value: function (e) {
                var t = this.head,
                  r = 1,
                  n = t.data;
                for (e -= n.length; (t = t.next); ) {
                  var i = t.data,
                    s = e > i.length ? i.length : e;
                  if (
                    (s === i.length ? (n += i) : (n += i.slice(0, e)),
                    0 === (e -= s))
                  ) {
                    s === i.length
                      ? (++r,
                        t.next
                          ? (this.head = t.next)
                          : (this.head = this.tail = null))
                      : ((this.head = t), (t.data = i.slice(s)));
                    break;
                  }
                  ++r;
                }
                return (this.length -= r), n;
              },
            },
            {
              key: "_getBuffer",
              value: function (e) {
                var t = l.allocUnsafe(e),
                  r = this.head,
                  n = 1;
                for (r.data.copy(t), e -= r.data.length; (r = r.next); ) {
                  var i = r.data,
                    s = e > i.length ? i.length : e;
                  if ((i.copy(t, t.length - e, 0, s), 0 === (e -= s))) {
                    s === i.length
                      ? (++n,
                        r.next
                          ? (this.head = r.next)
                          : (this.head = this.tail = null))
                      : ((this.head = r), (r.data = i.slice(s)));
                    break;
                  }
                  ++n;
                }
                return (this.length -= n), t;
              },
            },
            {
              key: u,
              value: function (e, t) {
                return c(
                  this,
                  i(i({}, t), {}, { depth: 0, customInspect: !1 })
                );
              },
            },
          ]) && o(t.prototype, r),
          n && o(t, n),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          e
        );
      })();
    },
    66711: (e) => {
      "use strict";
      function t(e, t) {
        n(e, t), r(e);
      }
      function r(e) {
        (e._writableState && !e._writableState.emitClose) ||
          (e._readableState && !e._readableState.emitClose) ||
          e.emit("close");
      }
      function n(e, t) {
        e.emit("error", t);
      }
      e.exports = {
        destroy: function (e, i) {
          var s = this,
            o = this._readableState && this._readableState.destroyed,
            a = this._writableState && this._writableState.destroyed;
          return o || a
            ? (i
                ? i(e)
                : e &&
                  (this._writableState
                    ? this._writableState.errorEmitted ||
                      ((this._writableState.errorEmitted = !0),
                      process.nextTick(n, this, e))
                    : process.nextTick(n, this, e)),
              this)
            : (this._readableState && (this._readableState.destroyed = !0),
              this._writableState && (this._writableState.destroyed = !0),
              this._destroy(e || null, function (e) {
                !i && e
                  ? s._writableState
                    ? s._writableState.errorEmitted
                      ? process.nextTick(r, s)
                      : ((s._writableState.errorEmitted = !0),
                        process.nextTick(t, s, e))
                    : process.nextTick(t, s, e)
                  : i
                  ? (process.nextTick(r, s), i(e))
                  : process.nextTick(r, s);
              }),
              this);
        },
        undestroy: function () {
          this._readableState &&
            ((this._readableState.destroyed = !1),
            (this._readableState.reading = !1),
            (this._readableState.ended = !1),
            (this._readableState.endEmitted = !1)),
            this._writableState &&
              ((this._writableState.destroyed = !1),
              (this._writableState.ended = !1),
              (this._writableState.ending = !1),
              (this._writableState.finalCalled = !1),
              (this._writableState.prefinished = !1),
              (this._writableState.finished = !1),
              (this._writableState.errorEmitted = !1));
        },
        errorOrDestroy: function (e, t) {
          var r = e._readableState,
            n = e._writableState;
          (r && r.autoDestroy) || (n && n.autoDestroy)
            ? e.destroy(t)
            : e.emit("error", t);
        },
      };
    },
    85997: (e, t, r) => {
      "use strict";
      var n = r(31579).F.ERR_STREAM_PREMATURE_CLOSE;
      function i() {}
      e.exports = function e(t, r, s) {
        if ("function" === typeof r) return e(t, null, r);
        r || (r = {}),
          (s = (function (e) {
            var t = !1;
            return function () {
              if (!t) {
                t = !0;
                for (
                  var r = arguments.length, n = new Array(r), i = 0;
                  i < r;
                  i++
                )
                  n[i] = arguments[i];
                e.apply(this, n);
              }
            };
          })(s || i));
        var o = r.readable || (!1 !== r.readable && t.readable),
          a = r.writable || (!1 !== r.writable && t.writable),
          l = function () {
            t.writable || u();
          },
          c = t._writableState && t._writableState.finished,
          u = function () {
            (a = !1), (c = !0), o || s.call(t);
          },
          h = t._readableState && t._readableState.endEmitted,
          d = function () {
            (o = !1), (h = !0), a || s.call(t);
          },
          f = function (e) {
            s.call(t, e);
          },
          p = function () {
            var e;
            return o && !h
              ? ((t._readableState && t._readableState.ended) || (e = new n()),
                s.call(t, e))
              : a && !c
              ? ((t._writableState && t._writableState.ended) || (e = new n()),
                s.call(t, e))
              : void 0;
          },
          g = function () {
            t.req.on("finish", u);
          };
        return (
          !(function (e) {
            return e.setHeader && "function" === typeof e.abort;
          })(t)
            ? a && !t._writableState && (t.on("end", l), t.on("close", l))
            : (t.on("complete", u),
              t.on("abort", p),
              t.req ? g() : t.on("request", g)),
          t.on("end", d),
          t.on("finish", u),
          !1 !== r.error && t.on("error", f),
          t.on("close", p),
          function () {
            t.removeListener("complete", u),
              t.removeListener("abort", p),
              t.removeListener("request", g),
              t.req && t.req.removeListener("finish", u),
              t.removeListener("end", l),
              t.removeListener("close", l),
              t.removeListener("finish", u),
              t.removeListener("end", d),
              t.removeListener("error", f),
              t.removeListener("close", p);
          }
        );
      };
    },
    8756: (e) => {
      e.exports = function () {
        throw new Error("Readable.from is not available in the browser");
      };
    },
    22471: (e, t, r) => {
      "use strict";
      var n;
      var i = r(31579).F,
        s = i.ERR_MISSING_ARGS,
        o = i.ERR_STREAM_DESTROYED;
      function a(e) {
        if (e) throw e;
      }
      function l(e) {
        e();
      }
      function c(e, t) {
        return e.pipe(t);
      }
      e.exports = function () {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
          t[i] = arguments[i];
        var u,
          h = (function (e) {
            return e.length
              ? "function" !== typeof e[e.length - 1]
                ? a
                : e.pop()
              : a;
          })(t);
        if ((Array.isArray(t[0]) && (t = t[0]), t.length < 2))
          throw new s("streams");
        var d = t.map(function (e, i) {
          var s = i < t.length - 1;
          return (function (e, t, i, s) {
            s = (function (e) {
              var t = !1;
              return function () {
                t || ((t = !0), e.apply(void 0, arguments));
              };
            })(s);
            var a = !1;
            e.on("close", function () {
              a = !0;
            }),
              void 0 === n && (n = r(85997)),
              n(e, { readable: t, writable: i }, function (e) {
                if (e) return s(e);
                (a = !0), s();
              });
            var l = !1;
            return function (t) {
              if (!a && !l)
                return (
                  (l = !0),
                  (function (e) {
                    return e.setHeader && "function" === typeof e.abort;
                  })(e)
                    ? e.abort()
                    : "function" === typeof e.destroy
                    ? e.destroy()
                    : void s(t || new o("pipe"))
                );
            };
          })(e, s, i > 0, function (e) {
            u || (u = e), e && d.forEach(l), s || (d.forEach(l), h(u));
          });
        });
        return t.reduce(c);
      };
    },
    29896: (e, t, r) => {
      "use strict";
      var n = r(31579).F.ERR_INVALID_OPT_VALUE;
      e.exports = {
        getHighWaterMark: function (e, t, r, i) {
          var s = (function (e, t, r) {
            return null != e.highWaterMark ? e.highWaterMark : t ? e[r] : null;
          })(t, i, r);
          if (null != s) {
            if (!isFinite(s) || Math.floor(s) !== s || s < 0)
              throw new n(i ? r : "highWaterMark", s);
            return Math.floor(s);
          }
          return e.objectMode ? 16 : 16384;
        },
      };
    },
    41472: (e, t, r) => {
      e.exports = r(27284).EventEmitter;
    },
    77764: (e, t, r) => {
      ((t = e.exports = r(17823)).Stream = t),
        (t.Readable = t),
        (t.Writable = r(97843)),
        (t.Duplex = r(30921)),
        (t.Transform = r(32415)),
        (t.PassThrough = r(86589)),
        (t.finished = r(85997)),
        (t.pipeline = r(22471));
    },
    56e3: (e, t, r) => {
      "use strict";
      var n = r(59966).Buffer,
        i =
          n.isEncoding ||
          function (e) {
            switch ((e = "" + e) && e.toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
              case "raw":
                return !0;
              default:
                return !1;
            }
          };
      function s(e) {
        var t;
        switch (
          ((this.encoding = (function (e) {
            var t = (function (e) {
              if (!e) return "utf8";
              for (var t; ; )
                switch (e) {
                  case "utf8":
                  case "utf-8":
                    return "utf8";
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return "utf16le";
                  case "latin1":
                  case "binary":
                    return "latin1";
                  case "base64":
                  case "ascii":
                  case "hex":
                    return e;
                  default:
                    if (t) return;
                    (e = ("" + e).toLowerCase()), (t = !0);
                }
            })(e);
            if ("string" !== typeof t && (n.isEncoding === i || !i(e)))
              throw new Error("Unknown encoding: " + e);
            return t || e;
          })(e)),
          this.encoding)
        ) {
          case "utf16le":
            (this.text = l), (this.end = c), (t = 4);
            break;
          case "utf8":
            (this.fillLast = a), (t = 4);
            break;
          case "base64":
            (this.text = u), (this.end = h), (t = 3);
            break;
          default:
            return (this.write = d), void (this.end = f);
        }
        (this.lastNeed = 0),
          (this.lastTotal = 0),
          (this.lastChar = n.allocUnsafe(t));
      }
      function o(e) {
        return e <= 127
          ? 0
          : e >> 5 === 6
          ? 2
          : e >> 4 === 14
          ? 3
          : e >> 3 === 30
          ? 4
          : e >> 6 === 2
          ? -1
          : -2;
      }
      function a(e) {
        var t = this.lastTotal - this.lastNeed,
          r = (function (e, t, r) {
            if (128 !== (192 & t[0])) return (e.lastNeed = 0), "\ufffd";
            if (e.lastNeed > 1 && t.length > 1) {
              if (128 !== (192 & t[1])) return (e.lastNeed = 1), "\ufffd";
              if (e.lastNeed > 2 && t.length > 2 && 128 !== (192 & t[2]))
                return (e.lastNeed = 2), "\ufffd";
            }
          })(this, e);
        return void 0 !== r
          ? r
          : this.lastNeed <= e.length
          ? (e.copy(this.lastChar, t, 0, this.lastNeed),
            this.lastChar.toString(this.encoding, 0, this.lastTotal))
          : (e.copy(this.lastChar, t, 0, e.length),
            void (this.lastNeed -= e.length));
      }
      function l(e, t) {
        if ((e.length - t) % 2 === 0) {
          var r = e.toString("utf16le", t);
          if (r) {
            var n = r.charCodeAt(r.length - 1);
            if (n >= 55296 && n <= 56319)
              return (
                (this.lastNeed = 2),
                (this.lastTotal = 4),
                (this.lastChar[0] = e[e.length - 2]),
                (this.lastChar[1] = e[e.length - 1]),
                r.slice(0, -1)
              );
          }
          return r;
        }
        return (
          (this.lastNeed = 1),
          (this.lastTotal = 2),
          (this.lastChar[0] = e[e.length - 1]),
          e.toString("utf16le", t, e.length - 1)
        );
      }
      function c(e) {
        var t = e && e.length ? this.write(e) : "";
        if (this.lastNeed) {
          var r = this.lastTotal - this.lastNeed;
          return t + this.lastChar.toString("utf16le", 0, r);
        }
        return t;
      }
      function u(e, t) {
        var r = (e.length - t) % 3;
        return 0 === r
          ? e.toString("base64", t)
          : ((this.lastNeed = 3 - r),
            (this.lastTotal = 3),
            1 === r
              ? (this.lastChar[0] = e[e.length - 1])
              : ((this.lastChar[0] = e[e.length - 2]),
                (this.lastChar[1] = e[e.length - 1])),
            e.toString("base64", t, e.length - r));
      }
      function h(e) {
        var t = e && e.length ? this.write(e) : "";
        return this.lastNeed
          ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
          : t;
      }
      function d(e) {
        return e.toString(this.encoding);
      }
      function f(e) {
        return e && e.length ? this.write(e) : "";
      }
      (t.I = s),
        (s.prototype.write = function (e) {
          if (0 === e.length) return "";
          var t, r;
          if (this.lastNeed) {
            if (void 0 === (t = this.fillLast(e))) return "";
            (r = this.lastNeed), (this.lastNeed = 0);
          } else r = 0;
          return r < e.length
            ? t
              ? t + this.text(e, r)
              : this.text(e, r)
            : t || "";
        }),
        (s.prototype.end = function (e) {
          var t = e && e.length ? this.write(e) : "";
          return this.lastNeed ? t + "\ufffd" : t;
        }),
        (s.prototype.text = function (e, t) {
          var r = (function (e, t, r) {
            var n = t.length - 1;
            if (n < r) return 0;
            var i = o(t[n]);
            if (i >= 0) return i > 0 && (e.lastNeed = i - 1), i;
            if (--n < r || -2 === i) return 0;
            if (((i = o(t[n])), i >= 0))
              return i > 0 && (e.lastNeed = i - 2), i;
            if (--n < r || -2 === i) return 0;
            if (((i = o(t[n])), i >= 0))
              return i > 0 && (2 === i ? (i = 0) : (e.lastNeed = i - 3)), i;
            return 0;
          })(this, e, t);
          if (!this.lastNeed) return e.toString("utf8", t);
          this.lastTotal = r;
          var n = e.length - (r - this.lastNeed);
          return e.copy(this.lastChar, 0, n), e.toString("utf8", t, n);
        }),
        (s.prototype.fillLast = function (e) {
          if (this.lastNeed <= e.length)
            return (
              e.copy(
                this.lastChar,
                this.lastTotal - this.lastNeed,
                0,
                this.lastNeed
              ),
              this.lastChar.toString(this.encoding, 0, this.lastTotal)
            );
          e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length),
            (this.lastNeed -= e.length);
        });
    },
    26803: (e, t, r) => {
      "use strict";
      r.r(t),
        r.d(t, {
          Component: () => M,
          Fragment: () => S,
          cloneElement: () => z,
          createContext: () => G,
          createElement: () => w,
          createRef: () => k,
          h: () => w,
          hydrate: () => V,
          isValidElement: () => o,
          options: () => i,
          render: () => q,
          toChildArray: () => P,
        });
      var n,
        i,
        s,
        o,
        a,
        l,
        c,
        u,
        h,
        d,
        f,
        p,
        g = {},
        m = [],
        _ = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
        v = Array.isArray;
      function y(e, t) {
        for (var r in t) e[r] = t[r];
        return e;
      }
      function b(e) {
        var t = e.parentNode;
        t && t.removeChild(e);
      }
      function w(e, t, r) {
        var i,
          s,
          o,
          a = {};
        for (o in t)
          "key" == o ? (i = t[o]) : "ref" == o ? (s = t[o]) : (a[o] = t[o]);
        if (
          (arguments.length > 2 &&
            (a.children = arguments.length > 3 ? n.call(arguments, 2) : r),
          "function" == typeof e && null != e.defaultProps)
        )
          for (o in e.defaultProps)
            void 0 === a[o] && (a[o] = e.defaultProps[o]);
        return E(e, a, i, s, null);
      }
      function E(e, t, r, n, o) {
        var a = {
          type: e,
          props: t,
          key: r,
          ref: n,
          __k: null,
          __: null,
          __b: 0,
          __e: null,
          __d: void 0,
          __c: null,
          constructor: void 0,
          __v: null == o ? ++s : o,
          __i: -1,
          __u: 0,
        };
        return null == o && null != i.vnode && i.vnode(a), a;
      }
      function k() {
        return { current: null };
      }
      function S(e) {
        return e.children;
      }
      function M(e, t) {
        (this.props = e), (this.context = t);
      }
      function C(e, t) {
        if (null == t) return e.__ ? C(e.__, e.__i + 1) : null;
        for (var r; t < e.__k.length; t++)
          if (null != (r = e.__k[t]) && null != r.__e) return r.__e;
        return "function" == typeof e.type ? C(e) : null;
      }
      function R(e) {
        var t, r;
        if (null != (e = e.__) && null != e.__c) {
          for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
            if (null != (r = e.__k[t]) && null != r.__e) {
              e.__e = e.__c.base = r.__e;
              break;
            }
          return R(e);
        }
      }
      function I(e) {
        ((!e.__d && (e.__d = !0) && a.push(e) && !A.__r++) ||
          l !== i.debounceRendering) &&
          ((l = i.debounceRendering) || c)(A);
      }
      function A() {
        var e, t, r, n, s, o, l, c;
        for (a.sort(u); (e = a.shift()); )
          e.__d &&
            ((t = a.length),
            (n = void 0),
            (o = (s = (r = e).__v).__e),
            (l = []),
            (c = []),
            r.__P &&
              (((n = y({}, s)).__v = s.__v + 1),
              i.vnode && i.vnode(n),
              D(
                r.__P,
                n,
                s,
                r.__n,
                void 0 !== r.__P.ownerSVGElement,
                32 & s.__u ? [o] : null,
                l,
                null == o ? C(s) : o,
                !!(32 & s.__u),
                c
              ),
              (n.__v = s.__v),
              (n.__.__k[n.__i] = n),
              F(l, n, c),
              n.__e != o && R(n)),
            a.length > t && a.sort(u));
        A.__r = 0;
      }
      function x(e, t, r, n, i, s, o, a, l, c, u) {
        var h,
          d,
          f,
          p,
          _,
          v = (n && n.__k) || m,
          y = t.length;
        for (r.__d = l, L(r, t, v), l = r.__d, h = 0; h < y; h++)
          null != (f = r.__k[h]) &&
            "boolean" != typeof f &&
            "function" != typeof f &&
            ((d = -1 === f.__i ? g : v[f.__i] || g),
            (f.__i = h),
            D(e, f, d, i, s, o, a, l, c, u),
            (p = f.__e),
            f.ref &&
              d.ref != f.ref &&
              (d.ref && $(d.ref, null, f), u.push(f.ref, f.__c || p, f)),
            null == _ && null != p && (_ = p),
            65536 & f.__u || d.__k === f.__k
              ? (l && !l.isConnected && (l = C(d)), (l = N(f, l, e)))
              : "function" == typeof f.type && void 0 !== f.__d
              ? (l = f.__d)
              : p && (l = p.nextSibling),
            (f.__d = void 0),
            (f.__u &= -196609));
        (r.__d = l), (r.__e = _);
      }
      function L(e, t, r) {
        var n,
          i,
          s,
          o,
          a,
          l = t.length,
          c = r.length,
          u = c,
          h = 0;
        for (e.__k = [], n = 0; n < l; n++)
          (o = n + h),
            null !=
            (i = e.__k[n] =
              null == (i = t[n]) ||
              "boolean" == typeof i ||
              "function" == typeof i
                ? null
                : "string" == typeof i ||
                  "number" == typeof i ||
                  "bigint" == typeof i ||
                  i.constructor == String
                ? E(null, i, null, null, null)
                : v(i)
                ? E(S, { children: i }, null, null, null)
                : void 0 === i.constructor && i.__b > 0
                ? E(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v)
                : i)
              ? ((i.__ = e),
                (i.__b = e.__b + 1),
                (a = T(i, r, o, u)),
                (i.__i = a),
                (s = null),
                -1 !== a && (u--, (s = r[a]) && (s.__u |= 131072)),
                null == s || null === s.__v
                  ? (-1 == a && h--,
                    "function" != typeof i.type && (i.__u |= 65536))
                  : a !== o &&
                    (a === o + 1
                      ? h++
                      : a > o
                      ? u > l - o
                        ? (h += a - o)
                        : h--
                      : a < o
                      ? a == o - 1 && (h = a - o)
                      : (h = 0),
                    a !== n + h && (i.__u |= 65536)))
              : (s = r[o]) &&
                null == s.key &&
                s.__e &&
                0 == (131072 & s.__u) &&
                (s.__e == e.__d && (e.__d = C(s)),
                H(s, s, !1),
                (r[o] = null),
                u--);
        if (u)
          for (n = 0; n < c; n++)
            null != (s = r[n]) &&
              0 == (131072 & s.__u) &&
              (s.__e == e.__d && (e.__d = C(s)), H(s, s));
      }
      function N(e, t, r) {
        var n, i;
        if ("function" == typeof e.type) {
          for (n = e.__k, i = 0; n && i < n.length; i++)
            n[i] && ((n[i].__ = e), (t = N(n[i], t, r)));
          return t;
        }
        e.__e != t && (r.insertBefore(e.__e, t || null), (t = e.__e));
        do {
          t = t && t.nextSibling;
        } while (null != t && 8 === t.nodeType);
        return t;
      }
      function P(e, t) {
        return (
          (t = t || []),
          null == e ||
            "boolean" == typeof e ||
            (v(e)
              ? e.some(function (e) {
                  P(e, t);
                })
              : t.push(e)),
          t
        );
      }
      function T(e, t, r, n) {
        var i = e.key,
          s = e.type,
          o = r - 1,
          a = r + 1,
          l = t[r];
        if (
          null === l ||
          (l && i == l.key && s === l.type && 0 == (131072 & l.__u))
        )
          return r;
        if (n > (null != l && 0 == (131072 & l.__u) ? 1 : 0))
          for (; o >= 0 || a < t.length; ) {
            if (o >= 0) {
              if (
                (l = t[o]) &&
                0 == (131072 & l.__u) &&
                i == l.key &&
                s === l.type
              )
                return o;
              o--;
            }
            if (a < t.length) {
              if (
                (l = t[a]) &&
                0 == (131072 & l.__u) &&
                i == l.key &&
                s === l.type
              )
                return a;
              a++;
            }
          }
        return -1;
      }
      function O(e, t, r) {
        "-" === t[0]
          ? e.setProperty(t, null == r ? "" : r)
          : (e[t] =
              null == r
                ? ""
                : "number" != typeof r || _.test(t)
                ? r
                : r + "px");
      }
      function B(e, t, r, n, i) {
        var s;
        e: if ("style" === t)
          if ("string" == typeof r) e.style.cssText = r;
          else {
            if (("string" == typeof n && (e.style.cssText = n = ""), n))
              for (t in n) (r && t in r) || O(e.style, t, "");
            if (r) for (t in r) (n && r[t] === n[t]) || O(e.style, t, r[t]);
          }
        else if ("o" === t[0] && "n" === t[1])
          (s = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1"))),
            (t =
              t.toLowerCase() in e || "onFocusOut" === t || "onFocusIn" === t
                ? t.toLowerCase().slice(2)
                : t.slice(2)),
            e.l || (e.l = {}),
            (e.l[t + s] = r),
            r
              ? n
                ? (r.u = n.u)
                : ((r.u = h), e.addEventListener(t, s ? f : d, s))
              : e.removeEventListener(t, s ? f : d, s);
        else {
          if (i) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
          else if (
            "width" != t &&
            "height" != t &&
            "href" != t &&
            "list" != t &&
            "form" != t &&
            "tabIndex" != t &&
            "download" != t &&
            "rowSpan" != t &&
            "colSpan" != t &&
            "role" != t &&
            t in e
          )
            try {
              e[t] = null == r ? "" : r;
              break e;
            } catch (e) {}
          "function" == typeof r ||
            (null == r || (!1 === r && "-" !== t[4])
              ? e.removeAttribute(t)
              : e.setAttribute(t, r));
        }
      }
      function j(e) {
        return function (t) {
          if (this.l) {
            var r = this.l[t.type + e];
            if (null == t.t) t.t = h++;
            else if (t.t < r.u) return;
            return r(i.event ? i.event(t) : t);
          }
        };
      }
      function D(e, t, r, n, s, o, a, l, c, u) {
        var h,
          d,
          f,
          p,
          g,
          m,
          _,
          b,
          w,
          E,
          k,
          C,
          R,
          I,
          A,
          L = t.type;
        if (void 0 !== t.constructor) return null;
        128 & r.__u && ((c = !!(32 & r.__u)), (o = [(l = t.__e = r.__e)])),
          (h = i.__b) && h(t);
        e: if ("function" == typeof L)
          try {
            if (
              ((b = t.props),
              (w = (h = L.contextType) && n[h.__c]),
              (E = h ? (w ? w.props.value : h.__) : n),
              r.__c
                ? (_ = (d = t.__c = r.__c).__ = d.__E)
                : ("prototype" in L && L.prototype.render
                    ? (t.__c = d = new L(b, E))
                    : ((t.__c = d = new M(b, E)),
                      (d.constructor = L),
                      (d.render = W)),
                  w && w.sub(d),
                  (d.props = b),
                  d.state || (d.state = {}),
                  (d.context = E),
                  (d.__n = n),
                  (f = d.__d = !0),
                  (d.__h = []),
                  (d._sb = [])),
              null == d.__s && (d.__s = d.state),
              null != L.getDerivedStateFromProps &&
                (d.__s == d.state && (d.__s = y({}, d.__s)),
                y(d.__s, L.getDerivedStateFromProps(b, d.__s))),
              (p = d.props),
              (g = d.state),
              (d.__v = t),
              f)
            )
              null == L.getDerivedStateFromProps &&
                null != d.componentWillMount &&
                d.componentWillMount(),
                null != d.componentDidMount && d.__h.push(d.componentDidMount);
            else {
              if (
                (null == L.getDerivedStateFromProps &&
                  b !== p &&
                  null != d.componentWillReceiveProps &&
                  d.componentWillReceiveProps(b, E),
                !d.__e &&
                  ((null != d.shouldComponentUpdate &&
                    !1 === d.shouldComponentUpdate(b, d.__s, E)) ||
                    t.__v === r.__v))
              ) {
                for (
                  t.__v !== r.__v &&
                    ((d.props = b), (d.state = d.__s), (d.__d = !1)),
                    t.__e = r.__e,
                    t.__k = r.__k,
                    t.__k.forEach(function (e) {
                      e && (e.__ = t);
                    }),
                    k = 0;
                  k < d._sb.length;
                  k++
                )
                  d.__h.push(d._sb[k]);
                (d._sb = []), d.__h.length && a.push(d);
                break e;
              }
              null != d.componentWillUpdate &&
                d.componentWillUpdate(b, d.__s, E),
                null != d.componentDidUpdate &&
                  d.__h.push(function () {
                    d.componentDidUpdate(p, g, m);
                  });
            }
            if (
              ((d.context = E),
              (d.props = b),
              (d.__P = e),
              (d.__e = !1),
              (C = i.__r),
              (R = 0),
              "prototype" in L && L.prototype.render)
            ) {
              for (
                d.state = d.__s,
                  d.__d = !1,
                  C && C(t),
                  h = d.render(d.props, d.state, d.context),
                  I = 0;
                I < d._sb.length;
                I++
              )
                d.__h.push(d._sb[I]);
              d._sb = [];
            } else
              do {
                (d.__d = !1),
                  C && C(t),
                  (h = d.render(d.props, d.state, d.context)),
                  (d.state = d.__s);
              } while (d.__d && ++R < 25);
            (d.state = d.__s),
              null != d.getChildContext &&
                (n = y(y({}, n), d.getChildContext())),
              f ||
                null == d.getSnapshotBeforeUpdate ||
                (m = d.getSnapshotBeforeUpdate(p, g)),
              x(
                e,
                v(
                  (A =
                    null != h && h.type === S && null == h.key
                      ? h.props.children
                      : h)
                )
                  ? A
                  : [A],
                t,
                r,
                n,
                s,
                o,
                a,
                l,
                c,
                u
              ),
              (d.base = t.__e),
              (t.__u &= -161),
              d.__h.length && a.push(d),
              _ && (d.__E = d.__ = null);
          } catch (e) {
            (t.__v = null),
              c || null != o
                ? ((t.__e = l),
                  (t.__u |= c ? 160 : 32),
                  (o[o.indexOf(l)] = null))
                : ((t.__e = r.__e), (t.__k = r.__k)),
              i.__e(e, t, r);
          }
        else
          null == o && t.__v === r.__v
            ? ((t.__k = r.__k), (t.__e = r.__e))
            : (t.__e = U(r.__e, t, r, n, s, o, a, c, u));
        (h = i.diffed) && h(t);
      }
      function F(e, t, r) {
        t.__d = void 0;
        for (var n = 0; n < r.length; n++) $(r[n], r[++n], r[++n]);
        i.__c && i.__c(t, e),
          e.some(function (t) {
            try {
              (e = t.__h),
                (t.__h = []),
                e.some(function (e) {
                  e.call(t);
                });
            } catch (e) {
              i.__e(e, t.__v);
            }
          });
      }
      function U(e, t, r, i, s, o, a, l, c) {
        var u,
          h,
          d,
          f,
          p,
          m,
          _,
          y = r.props,
          w = t.props,
          E = t.type;
        if (("svg" === E && (s = !0), null != o))
          for (u = 0; u < o.length; u++)
            if (
              (p = o[u]) &&
              "setAttribute" in p == !!E &&
              (E ? p.localName === E : 3 === p.nodeType)
            ) {
              (e = p), (o[u] = null);
              break;
            }
        if (null == e) {
          if (null === E) return document.createTextNode(w);
          (e = s
            ? document.createElementNS("http://www.w3.org/2000/svg", E)
            : document.createElement(E, w.is && w)),
            (o = null),
            (l = !1);
        }
        if (null === E) y === w || (l && e.data === w) || (e.data = w);
        else {
          if (
            ((o = o && n.call(e.childNodes)),
            (y = r.props || g),
            !l && null != o)
          )
            for (y = {}, u = 0; u < e.attributes.length; u++)
              y[(p = e.attributes[u]).name] = p.value;
          for (u in y)
            (p = y[u]),
              "children" == u ||
                ("dangerouslySetInnerHTML" == u
                  ? (d = p)
                  : "key" === u || u in w || B(e, u, null, p, s));
          for (u in w)
            (p = w[u]),
              "children" == u
                ? (f = p)
                : "dangerouslySetInnerHTML" == u
                ? (h = p)
                : "value" == u
                ? (m = p)
                : "checked" == u
                ? (_ = p)
                : "key" === u ||
                  (l && "function" != typeof p) ||
                  y[u] === p ||
                  B(e, u, p, y[u], s);
          if (h)
            l ||
              (d && (h.__html === d.__html || h.__html === e.innerHTML)) ||
              (e.innerHTML = h.__html),
              (t.__k = []);
          else if (
            (d && (e.innerHTML = ""),
            x(
              e,
              v(f) ? f : [f],
              t,
              r,
              i,
              s && "foreignObject" !== E,
              o,
              a,
              o ? o[0] : r.__k && C(r, 0),
              l,
              c
            ),
            null != o)
          )
            for (u = o.length; u--; ) null != o[u] && b(o[u]);
          l ||
            ((u = "value"),
            void 0 !== m &&
              (m !== e[u] ||
                ("progress" === E && !m) ||
                ("option" === E && m !== y[u])) &&
              B(e, u, m, y[u], !1),
            (u = "checked"),
            void 0 !== _ && _ !== e[u] && B(e, u, _, y[u], !1));
        }
        return e;
      }
      function $(e, t, r) {
        try {
          "function" == typeof e ? e(t) : (e.current = t);
        } catch (e) {
          i.__e(e, r);
        }
      }
      function H(e, t, r) {
        var n, s;
        if (
          (i.unmount && i.unmount(e),
          (n = e.ref) && ((n.current && n.current !== e.__e) || $(n, null, t)),
          null != (n = e.__c))
        ) {
          if (n.componentWillUnmount)
            try {
              n.componentWillUnmount();
            } catch (e) {
              i.__e(e, t);
            }
          n.base = n.__P = null;
        }
        if ((n = e.__k))
          for (s = 0; s < n.length; s++)
            n[s] && H(n[s], t, r || "function" != typeof e.type);
        r || null == e.__e || b(e.__e), (e.__c = e.__ = e.__e = e.__d = void 0);
      }
      function W(e, t, r) {
        return this.constructor(e, r);
      }
      function q(e, t, r) {
        var s, o, a, l;
        i.__ && i.__(e, t),
          (o = (s = "function" == typeof r) ? null : (r && r.__k) || t.__k),
          (a = []),
          (l = []),
          D(
            t,
            (e = ((!s && r) || t).__k = w(S, null, [e])),
            o || g,
            g,
            void 0 !== t.ownerSVGElement,
            !s && r
              ? [r]
              : o
              ? null
              : t.firstChild
              ? n.call(t.childNodes)
              : null,
            a,
            !s && r ? r : o ? o.__e : t.firstChild,
            s,
            l
          ),
          F(a, e, l);
      }
      function V(e, t) {
        q(e, t, V);
      }
      function z(e, t, r) {
        var i,
          s,
          o,
          a,
          l = y({}, e.props);
        for (o in (e.type && e.type.defaultProps && (a = e.type.defaultProps),
        t))
          "key" == o
            ? (i = t[o])
            : "ref" == o
            ? (s = t[o])
            : (l[o] = void 0 === t[o] && void 0 !== a ? a[o] : t[o]);
        return (
          arguments.length > 2 &&
            (l.children = arguments.length > 3 ? n.call(arguments, 2) : r),
          E(e.type, l, i || e.key, s || e.ref, null)
        );
      }
      function G(e, t) {
        var r = {
          __c: (t = "__cC" + p++),
          __: e,
          Consumer: function (e, t) {
            return e.children(t);
          },
          Provider: function (e) {
            var r, n;
            return (
              this.getChildContext ||
                ((r = []),
                ((n = {})[t] = this),
                (this.getChildContext = function () {
                  return n;
                }),
                (this.shouldComponentUpdate = function (e) {
                  this.props.value !== e.value &&
                    r.some(function (e) {
                      (e.__e = !0), I(e);
                    });
                }),
                (this.sub = function (e) {
                  r.push(e);
                  var t = e.componentWillUnmount;
                  e.componentWillUnmount = function () {
                    r.splice(r.indexOf(e), 1), t && t.call(e);
                  };
                })),
              e.children
            );
          },
        };
        return (r.Provider.__ = r.Consumer.contextType = r);
      }
      (n = m.slice),
        (i = {
          __e: function (e, t, r, n) {
            for (var i, s, o; (t = t.__); )
              if ((i = t.__c) && !i.__)
                try {
                  if (
                    ((s = i.constructor) &&
                      null != s.getDerivedStateFromError &&
                      (i.setState(s.getDerivedStateFromError(e)), (o = i.__d)),
                    null != i.componentDidCatch &&
                      (i.componentDidCatch(e, n || {}), (o = i.__d)),
                    o)
                  )
                    return (i.__E = i);
                } catch (t) {
                  e = t;
                }
            throw e;
          },
        }),
        (s = 0),
        (o = function (e) {
          return null != e && null == e.constructor;
        }),
        (M.prototype.setState = function (e, t) {
          var r;
          (r =
            null != this.__s && this.__s !== this.state
              ? this.__s
              : (this.__s = y({}, this.state))),
            "function" == typeof e && (e = e(y({}, r), this.props)),
            e && y(r, e),
            null != e && this.__v && (t && this._sb.push(t), I(this));
        }),
        (M.prototype.forceUpdate = function (e) {
          this.__v && ((this.__e = !0), e && this.__h.push(e), I(this));
        }),
        (M.prototype.render = S),
        (a = []),
        (c =
          "function" == typeof Promise
            ? Promise.prototype.then.bind(Promise.resolve())
            : setTimeout),
        (u = function (e, t) {
          return e.__v.__b - t.__v.__b;
        }),
        (A.__r = 0),
        (h = 0),
        (d = j(!1)),
        (f = j(!0)),
        (p = 0);
    },
    81599: (e, t, r) => {
      "use strict";
      r.r(t),
        r.d(t, {
          useCallback: () => C,
          useContext: () => R,
          useDebugValue: () => I,
          useEffect: () => w,
          useErrorBoundary: () => A,
          useId: () => x,
          useImperativeHandle: () => S,
          useLayoutEffect: () => E,
          useMemo: () => M,
          useReducer: () => b,
          useRef: () => k,
          useState: () => y,
        });
      var n,
        i,
        s,
        o,
        a = r(26803),
        l = 0,
        c = [],
        u = [],
        h = a.options,
        d = h.__b,
        f = h.__r,
        p = h.diffed,
        g = h.__c,
        m = h.unmount,
        _ = h.__;
      function v(e, t) {
        h.__h && h.__h(i, e, l || t), (l = 0);
        var r = i.__H || (i.__H = { __: [], __h: [] });
        return e >= r.__.length && r.__.push({ __V: u }), r.__[e];
      }
      function y(e) {
        return (l = 1), b(j, e);
      }
      function b(e, t, r) {
        var s = v(n++, 2);
        if (
          ((s.t = e),
          !s.__c &&
            ((s.__ = [
              r ? r(t) : j(void 0, t),
              function (e) {
                var t = s.__N ? s.__N[0] : s.__[0],
                  r = s.t(t, e);
                t !== r && ((s.__N = [r, s.__[1]]), s.__c.setState({}));
              },
            ]),
            (s.__c = i),
            !i.u))
        ) {
          var o = function (e, t, r) {
            if (!s.__c.__H) return !0;
            var n = s.__c.__H.__.filter(function (e) {
              return !!e.__c;
            });
            if (
              n.every(function (e) {
                return !e.__N;
              })
            )
              return !a || a.call(this, e, t, r);
            var i = !1;
            return (
              n.forEach(function (e) {
                if (e.__N) {
                  var t = e.__[0];
                  (e.__ = e.__N), (e.__N = void 0), t !== e.__[0] && (i = !0);
                }
              }),
              !(!i && s.__c.props === e) && (!a || a.call(this, e, t, r))
            );
          };
          i.u = !0;
          var a = i.shouldComponentUpdate,
            l = i.componentWillUpdate;
          (i.componentWillUpdate = function (e, t, r) {
            if (this.__e) {
              var n = a;
              (a = void 0), o(e, t, r), (a = n);
            }
            l && l.call(this, e, t, r);
          }),
            (i.shouldComponentUpdate = o);
        }
        return s.__N || s.__;
      }
      function w(e, t) {
        var r = v(n++, 3);
        !h.__s && B(r.__H, t) && ((r.__ = e), (r.i = t), i.__H.__h.push(r));
      }
      function E(e, t) {
        var r = v(n++, 4);
        !h.__s && B(r.__H, t) && ((r.__ = e), (r.i = t), i.__h.push(r));
      }
      function k(e) {
        return (
          (l = 5),
          M(function () {
            return { current: e };
          }, [])
        );
      }
      function S(e, t, r) {
        (l = 6),
          E(
            function () {
              return "function" == typeof e
                ? (e(t()),
                  function () {
                    return e(null);
                  })
                : e
                ? ((e.current = t()),
                  function () {
                    return (e.current = null);
                  })
                : void 0;
            },
            null == r ? r : r.concat(e)
          );
      }
      function M(e, t) {
        var r = v(n++, 7);
        return B(r.__H, t)
          ? ((r.__V = e()), (r.i = t), (r.__h = e), r.__V)
          : r.__;
      }
      function C(e, t) {
        return (
          (l = 8),
          M(function () {
            return e;
          }, t)
        );
      }
      function R(e) {
        var t = i.context[e.__c],
          r = v(n++, 9);
        return (
          (r.c = e),
          t ? (null == r.__ && ((r.__ = !0), t.sub(i)), t.props.value) : e.__
        );
      }
      function I(e, t) {
        h.useDebugValue && h.useDebugValue(t ? t(e) : e);
      }
      function A(e) {
        var t = v(n++, 10),
          r = y();
        return (
          (t.__ = e),
          i.componentDidCatch ||
            (i.componentDidCatch = function (e, n) {
              t.__ && t.__(e, n), r[1](e);
            }),
          [
            r[0],
            function () {
              r[1](void 0);
            },
          ]
        );
      }
      function x() {
        var e = v(n++, 11);
        if (!e.__) {
          for (var t = i.__v; null !== t && !t.__m && null !== t.__; ) t = t.__;
          var r = t.__m || (t.__m = [0, 0]);
          e.__ = "P" + r[0] + "-" + r[1]++;
        }
        return e.__;
      }
      function L() {
        for (var e; (e = c.shift()); )
          if (e.__P && e.__H)
            try {
              e.__H.__h.forEach(T), e.__H.__h.forEach(O), (e.__H.__h = []);
            } catch (n) {
              (e.__H.__h = []), h.__e(n, e.__v);
            }
      }
      (h.__b = function (e) {
        (i = null), d && d(e);
      }),
        (h.__ = function (e, t) {
          e && t.__k && t.__k.__m && (e.__m = t.__k.__m), _ && _(e, t);
        }),
        (h.__r = function (e) {
          f && f(e), (n = 0);
          var t = (i = e.__c).__H;
          t &&
            (s === i
              ? ((t.__h = []),
                (i.__h = []),
                t.__.forEach(function (e) {
                  e.__N && (e.__ = e.__N), (e.__V = u), (e.__N = e.i = void 0);
                }))
              : (t.__h.forEach(T), t.__h.forEach(O), (t.__h = []), (n = 0))),
            (s = i);
        }),
        (h.diffed = function (e) {
          p && p(e);
          var t = e.__c;
          t &&
            t.__H &&
            (t.__H.__h.length &&
              ((1 !== c.push(t) && o === h.requestAnimationFrame) ||
                ((o = h.requestAnimationFrame) || P)(L)),
            t.__H.__.forEach(function (e) {
              e.i && (e.__H = e.i),
                e.__V !== u && (e.__ = e.__V),
                (e.i = void 0),
                (e.__V = u);
            })),
            (s = i = null);
        }),
        (h.__c = function (e, t) {
          t.some(function (e) {
            try {
              e.__h.forEach(T),
                (e.__h = e.__h.filter(function (e) {
                  return !e.__ || O(e);
                }));
            } catch (i) {
              t.some(function (e) {
                e.__h && (e.__h = []);
              }),
                (t = []),
                h.__e(i, e.__v);
            }
          }),
            g && g(e, t);
        }),
        (h.unmount = function (e) {
          m && m(e);
          var t,
            r = e.__c;
          r &&
            r.__H &&
            (r.__H.__.forEach(function (e) {
              try {
                T(e);
              } catch (e) {
                t = e;
              }
            }),
            (r.__H = void 0),
            t && h.__e(t, r.__v));
        });
      var N = "function" == typeof requestAnimationFrame;
      function P(e) {
        var t,
          r = function () {
            clearTimeout(n), N && cancelAnimationFrame(t), setTimeout(e);
          },
          n = setTimeout(r, 100);
        N && (t = requestAnimationFrame(r));
      }
      function T(e) {
        var t = i,
          r = e.__c;
        "function" == typeof r && ((e.__c = void 0), r()), (i = t);
      }
      function O(e) {
        var t = i;
        (e.__c = e.__()), (i = t);
      }
      function B(e, t) {
        return (
          !e ||
          e.length !== t.length ||
          t.some(function (t, r) {
            return t !== e[r];
          })
        );
      }
      function j(e, t) {
        return "function" == typeof t ? t(e) : t;
      }
    },
    59966: (e, t, r) => {
      var n = r(26382),
        i = n.Buffer;
      function s(e, t) {
        for (var r in e) t[r] = e[r];
      }
      function o(e, t, r) {
        return i(e, t, r);
      }
      i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
        ? (e.exports = n)
        : (s(n, t), (t.Buffer = o)),
        (o.prototype = Object.create(i.prototype)),
        s(i, o),
        (o.from = function (e, t, r) {
          if ("number" === typeof e)
            throw new TypeError("Argument must not be a number");
          return i(e, t, r);
        }),
        (o.alloc = function (e, t, r) {
          if ("number" !== typeof e)
            throw new TypeError("Argument must be a number");
          var n = i(e);
          return (
            void 0 !== t
              ? "string" === typeof r
                ? n.fill(t, r)
                : n.fill(t)
              : n.fill(0),
            n
          );
        }),
        (o.allocUnsafe = function (e) {
          if ("number" !== typeof e)
            throw new TypeError("Argument must be a number");
          return i(e);
        }),
        (o.allocUnsafeSlow = function (e) {
          if ("number" !== typeof e)
            throw new TypeError("Argument must be a number");
          return n.SlowBuffer(e);
        });
    },
    25039: (e, t, r) => {
      var n = r(59966).Buffer;
      function i(e, t) {
        (this._block = n.alloc(e)),
          (this._finalSize = t),
          (this._blockSize = e),
          (this._len = 0);
      }
      (i.prototype.update = function (e, t) {
        "string" === typeof e && ((t = t || "utf8"), (e = n.from(e, t)));
        for (
          var r = this._block,
            i = this._blockSize,
            s = e.length,
            o = this._len,
            a = 0;
          a < s;

        ) {
          for (var l = o % i, c = Math.min(s - a, i - l), u = 0; u < c; u++)
            r[l + u] = e[a + u];
          (a += c), (o += c) % i === 0 && this._update(r);
        }
        return (this._len += s), this;
      }),
        (i.prototype.digest = function (e) {
          var t = this._len % this._blockSize;
          (this._block[t] = 128),
            this._block.fill(0, t + 1),
            t >= this._finalSize &&
              (this._update(this._block), this._block.fill(0));
          var r = 8 * this._len;
          if (r <= 4294967295)
            this._block.writeUInt32BE(r, this._blockSize - 4);
          else {
            var n = (4294967295 & r) >>> 0,
              i = (r - n) / 4294967296;
            this._block.writeUInt32BE(i, this._blockSize - 8),
              this._block.writeUInt32BE(n, this._blockSize - 4);
          }
          this._update(this._block);
          var s = this._hash();
          return e ? s.toString(e) : s;
        }),
        (i.prototype._update = function () {
          throw new Error("_update must be implemented by subclass");
        }),
        (e.exports = i);
    },
    20307: (e, t, r) => {
      var n = (e.exports = function (e) {
        e = e.toLowerCase();
        var t = n[e];
        if (!t)
          throw new Error(e + " is not supported (we accept pull requests)");
        return new t();
      });
      (n.sha = r(42809)),
        (n.sha1 = r(61222)),
        (n.sha224 = r(61189)),
        (n.sha256 = r(81892)),
        (n.sha384 = r(21248)),
        (n.sha512 = r(47169));
    },
    42809: (e, t, r) => {
      var n = r(56329),
        i = r(25039),
        s = r(59966).Buffer,
        o = [1518500249, 1859775393, -1894007588, -899497514],
        a = new Array(80);
      function l() {
        this.init(), (this._w = a), i.call(this, 64, 56);
      }
      function c(e) {
        return (e << 30) | (e >>> 2);
      }
      function u(e, t, r, n) {
        return 0 === e
          ? (t & r) | (~t & n)
          : 2 === e
          ? (t & r) | (t & n) | (r & n)
          : t ^ r ^ n;
      }
      n(l, i),
        (l.prototype.init = function () {
          return (
            (this._a = 1732584193),
            (this._b = 4023233417),
            (this._c = 2562383102),
            (this._d = 271733878),
            (this._e = 3285377520),
            this
          );
        }),
        (l.prototype._update = function (e) {
          for (
            var t,
              r = this._w,
              n = 0 | this._a,
              i = 0 | this._b,
              s = 0 | this._c,
              a = 0 | this._d,
              l = 0 | this._e,
              h = 0;
            h < 16;
            ++h
          )
            r[h] = e.readInt32BE(4 * h);
          for (; h < 80; ++h)
            r[h] = r[h - 3] ^ r[h - 8] ^ r[h - 14] ^ r[h - 16];
          for (var d = 0; d < 80; ++d) {
            var f = ~~(d / 20),
              p =
                0 |
                ((((t = n) << 5) | (t >>> 27)) +
                  u(f, i, s, a) +
                  l +
                  r[d] +
                  o[f]);
            (l = a), (a = s), (s = c(i)), (i = n), (n = p);
          }
          (this._a = (n + this._a) | 0),
            (this._b = (i + this._b) | 0),
            (this._c = (s + this._c) | 0),
            (this._d = (a + this._d) | 0),
            (this._e = (l + this._e) | 0);
        }),
        (l.prototype._hash = function () {
          var e = s.allocUnsafe(20);
          return (
            e.writeInt32BE(0 | this._a, 0),
            e.writeInt32BE(0 | this._b, 4),
            e.writeInt32BE(0 | this._c, 8),
            e.writeInt32BE(0 | this._d, 12),
            e.writeInt32BE(0 | this._e, 16),
            e
          );
        }),
        (e.exports = l);
    },
    61222: (e, t, r) => {
      var n = r(56329),
        i = r(25039),
        s = r(59966).Buffer,
        o = [1518500249, 1859775393, -1894007588, -899497514],
        a = new Array(80);
      function l() {
        this.init(), (this._w = a), i.call(this, 64, 56);
      }
      function c(e) {
        return (e << 5) | (e >>> 27);
      }
      function u(e) {
        return (e << 30) | (e >>> 2);
      }
      function h(e, t, r, n) {
        return 0 === e
          ? (t & r) | (~t & n)
          : 2 === e
          ? (t & r) | (t & n) | (r & n)
          : t ^ r ^ n;
      }
      n(l, i),
        (l.prototype.init = function () {
          return (
            (this._a = 1732584193),
            (this._b = 4023233417),
            (this._c = 2562383102),
            (this._d = 271733878),
            (this._e = 3285377520),
            this
          );
        }),
        (l.prototype._update = function (e) {
          for (
            var t,
              r = this._w,
              n = 0 | this._a,
              i = 0 | this._b,
              s = 0 | this._c,
              a = 0 | this._d,
              l = 0 | this._e,
              d = 0;
            d < 16;
            ++d
          )
            r[d] = e.readInt32BE(4 * d);
          for (; d < 80; ++d)
            r[d] =
              ((t = r[d - 3] ^ r[d - 8] ^ r[d - 14] ^ r[d - 16]) << 1) |
              (t >>> 31);
          for (var f = 0; f < 80; ++f) {
            var p = ~~(f / 20),
              g = (c(n) + h(p, i, s, a) + l + r[f] + o[p]) | 0;
            (l = a), (a = s), (s = u(i)), (i = n), (n = g);
          }
          (this._a = (n + this._a) | 0),
            (this._b = (i + this._b) | 0),
            (this._c = (s + this._c) | 0),
            (this._d = (a + this._d) | 0),
            (this._e = (l + this._e) | 0);
        }),
        (l.prototype._hash = function () {
          var e = s.allocUnsafe(20);
          return (
            e.writeInt32BE(0 | this._a, 0),
            e.writeInt32BE(0 | this._b, 4),
            e.writeInt32BE(0 | this._c, 8),
            e.writeInt32BE(0 | this._d, 12),
            e.writeInt32BE(0 | this._e, 16),
            e
          );
        }),
        (e.exports = l);
    },
    61189: (e, t, r) => {
      var n = r(56329),
        i = r(81892),
        s = r(25039),
        o = r(59966).Buffer,
        a = new Array(64);
      function l() {
        this.init(), (this._w = a), s.call(this, 64, 56);
      }
      n(l, i),
        (l.prototype.init = function () {
          return (
            (this._a = 3238371032),
            (this._b = 914150663),
            (this._c = 812702999),
            (this._d = 4144912697),
            (this._e = 4290775857),
            (this._f = 1750603025),
            (this._g = 1694076839),
            (this._h = 3204075428),
            this
          );
        }),
        (l.prototype._hash = function () {
          var e = o.allocUnsafe(28);
          return (
            e.writeInt32BE(this._a, 0),
            e.writeInt32BE(this._b, 4),
            e.writeInt32BE(this._c, 8),
            e.writeInt32BE(this._d, 12),
            e.writeInt32BE(this._e, 16),
            e.writeInt32BE(this._f, 20),
            e.writeInt32BE(this._g, 24),
            e
          );
        }),
        (e.exports = l);
    },
    81892: (e, t, r) => {
      var n = r(56329),
        i = r(25039),
        s = r(59966).Buffer,
        o = [
          1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
          2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
          1925078388, 2162078206, 2614888103, 3248222580, 3835390401,
          4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692,
          1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
          3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912,
          1294757372, 1396182291, 1695183700, 1986661051, 2177026350,
          2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
          3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
          659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
          1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
          2756734187, 3204031479, 3329325298,
        ],
        a = new Array(64);
      function l() {
        this.init(), (this._w = a), i.call(this, 64, 56);
      }
      function c(e, t, r) {
        return r ^ (e & (t ^ r));
      }
      function u(e, t, r) {
        return (e & t) | (r & (e | t));
      }
      function h(e) {
        return (
          ((e >>> 2) | (e << 30)) ^
          ((e >>> 13) | (e << 19)) ^
          ((e >>> 22) | (e << 10))
        );
      }
      function d(e) {
        return (
          ((e >>> 6) | (e << 26)) ^
          ((e >>> 11) | (e << 21)) ^
          ((e >>> 25) | (e << 7))
        );
      }
      function f(e) {
        return ((e >>> 7) | (e << 25)) ^ ((e >>> 18) | (e << 14)) ^ (e >>> 3);
      }
      n(l, i),
        (l.prototype.init = function () {
          return (
            (this._a = 1779033703),
            (this._b = 3144134277),
            (this._c = 1013904242),
            (this._d = 2773480762),
            (this._e = 1359893119),
            (this._f = 2600822924),
            (this._g = 528734635),
            (this._h = 1541459225),
            this
          );
        }),
        (l.prototype._update = function (e) {
          for (
            var t,
              r = this._w,
              n = 0 | this._a,
              i = 0 | this._b,
              s = 0 | this._c,
              a = 0 | this._d,
              l = 0 | this._e,
              p = 0 | this._f,
              g = 0 | this._g,
              m = 0 | this._h,
              _ = 0;
            _ < 16;
            ++_
          )
            r[_] = e.readInt32BE(4 * _);
          for (; _ < 64; ++_)
            r[_] =
              0 |
              (((((t = r[_ - 2]) >>> 17) | (t << 15)) ^
                ((t >>> 19) | (t << 13)) ^
                (t >>> 10)) +
                r[_ - 7] +
                f(r[_ - 15]) +
                r[_ - 16]);
          for (var v = 0; v < 64; ++v) {
            var y = (m + d(l) + c(l, p, g) + o[v] + r[v]) | 0,
              b = (h(n) + u(n, i, s)) | 0;
            (m = g),
              (g = p),
              (p = l),
              (l = (a + y) | 0),
              (a = s),
              (s = i),
              (i = n),
              (n = (y + b) | 0);
          }
          (this._a = (n + this._a) | 0),
            (this._b = (i + this._b) | 0),
            (this._c = (s + this._c) | 0),
            (this._d = (a + this._d) | 0),
            (this._e = (l + this._e) | 0),
            (this._f = (p + this._f) | 0),
            (this._g = (g + this._g) | 0),
            (this._h = (m + this._h) | 0);
        }),
        (l.prototype._hash = function () {
          var e = s.allocUnsafe(32);
          return (
            e.writeInt32BE(this._a, 0),
            e.writeInt32BE(this._b, 4),
            e.writeInt32BE(this._c, 8),
            e.writeInt32BE(this._d, 12),
            e.writeInt32BE(this._e, 16),
            e.writeInt32BE(this._f, 20),
            e.writeInt32BE(this._g, 24),
            e.writeInt32BE(this._h, 28),
            e
          );
        }),
        (e.exports = l);
    },
    21248: (e, t, r) => {
      var n = r(56329),
        i = r(47169),
        s = r(25039),
        o = r(59966).Buffer,
        a = new Array(160);
      function l() {
        this.init(), (this._w = a), s.call(this, 128, 112);
      }
      n(l, i),
        (l.prototype.init = function () {
          return (
            (this._ah = 3418070365),
            (this._bh = 1654270250),
            (this._ch = 2438529370),
            (this._dh = 355462360),
            (this._eh = 1731405415),
            (this._fh = 2394180231),
            (this._gh = 3675008525),
            (this._hh = 1203062813),
            (this._al = 3238371032),
            (this._bl = 914150663),
            (this._cl = 812702999),
            (this._dl = 4144912697),
            (this._el = 4290775857),
            (this._fl = 1750603025),
            (this._gl = 1694076839),
            (this._hl = 3204075428),
            this
          );
        }),
        (l.prototype._hash = function () {
          var e = o.allocUnsafe(48);
          function t(t, r, n) {
            e.writeInt32BE(t, n), e.writeInt32BE(r, n + 4);
          }
          return (
            t(this._ah, this._al, 0),
            t(this._bh, this._bl, 8),
            t(this._ch, this._cl, 16),
            t(this._dh, this._dl, 24),
            t(this._eh, this._el, 32),
            t(this._fh, this._fl, 40),
            e
          );
        }),
        (e.exports = l);
    },
    47169: (e, t, r) => {
      var n = r(56329),
        i = r(25039),
        s = r(59966).Buffer,
        o = [
          1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
          3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
          2453635748, 2937671579, 2870763221, 3664609560, 3624381080,
          2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987,
          3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103,
          633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774,
          944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983,
          1495990901, 1249150122, 1856431235, 1555081692, 3175218132,
          1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016,
          2952996808, 2566594879, 3210313671, 3203337956, 3336571891,
          1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895,
          168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372,
          1522805485, 1396182291, 2643833823, 1695183700, 2343527390,
          1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627,
          2730485921, 1290863460, 2820302411, 3158454273, 3259730800,
          3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804,
          1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734,
          3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877,
          3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063,
          2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
          2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
          2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
          3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
          3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
          174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
          685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
          1126000580, 2618297676, 1288033470, 3409855158, 1501505948,
          4234509866, 1607167915, 987167468, 1816402316, 1246189591,
        ],
        a = new Array(160);
      function l() {
        this.init(), (this._w = a), i.call(this, 128, 112);
      }
      function c(e, t, r) {
        return r ^ (e & (t ^ r));
      }
      function u(e, t, r) {
        return (e & t) | (r & (e | t));
      }
      function h(e, t) {
        return (
          ((e >>> 28) | (t << 4)) ^
          ((t >>> 2) | (e << 30)) ^
          ((t >>> 7) | (e << 25))
        );
      }
      function d(e, t) {
        return (
          ((e >>> 14) | (t << 18)) ^
          ((e >>> 18) | (t << 14)) ^
          ((t >>> 9) | (e << 23))
        );
      }
      function f(e, t) {
        return ((e >>> 1) | (t << 31)) ^ ((e >>> 8) | (t << 24)) ^ (e >>> 7);
      }
      function p(e, t) {
        return (
          ((e >>> 1) | (t << 31)) ^
          ((e >>> 8) | (t << 24)) ^
          ((e >>> 7) | (t << 25))
        );
      }
      function g(e, t) {
        return ((e >>> 19) | (t << 13)) ^ ((t >>> 29) | (e << 3)) ^ (e >>> 6);
      }
      function m(e, t) {
        return (
          ((e >>> 19) | (t << 13)) ^
          ((t >>> 29) | (e << 3)) ^
          ((e >>> 6) | (t << 26))
        );
      }
      function _(e, t) {
        return e >>> 0 < t >>> 0 ? 1 : 0;
      }
      n(l, i),
        (l.prototype.init = function () {
          return (
            (this._ah = 1779033703),
            (this._bh = 3144134277),
            (this._ch = 1013904242),
            (this._dh = 2773480762),
            (this._eh = 1359893119),
            (this._fh = 2600822924),
            (this._gh = 528734635),
            (this._hh = 1541459225),
            (this._al = 4089235720),
            (this._bl = 2227873595),
            (this._cl = 4271175723),
            (this._dl = 1595750129),
            (this._el = 2917565137),
            (this._fl = 725511199),
            (this._gl = 4215389547),
            (this._hl = 327033209),
            this
          );
        }),
        (l.prototype._update = function (e) {
          for (
            var t = this._w,
              r = 0 | this._ah,
              n = 0 | this._bh,
              i = 0 | this._ch,
              s = 0 | this._dh,
              a = 0 | this._eh,
              l = 0 | this._fh,
              v = 0 | this._gh,
              y = 0 | this._hh,
              b = 0 | this._al,
              w = 0 | this._bl,
              E = 0 | this._cl,
              k = 0 | this._dl,
              S = 0 | this._el,
              M = 0 | this._fl,
              C = 0 | this._gl,
              R = 0 | this._hl,
              I = 0;
            I < 32;
            I += 2
          )
            (t[I] = e.readInt32BE(4 * I)),
              (t[I + 1] = e.readInt32BE(4 * I + 4));
          for (; I < 160; I += 2) {
            var A = t[I - 30],
              x = t[I - 30 + 1],
              L = f(A, x),
              N = p(x, A),
              P = g((A = t[I - 4]), (x = t[I - 4 + 1])),
              T = m(x, A),
              O = t[I - 14],
              B = t[I - 14 + 1],
              j = t[I - 32],
              D = t[I - 32 + 1],
              F = (N + B) | 0,
              U = (L + O + _(F, N)) | 0;
            (U =
              ((U = (U + P + _((F = (F + T) | 0), T)) | 0) +
                j +
                _((F = (F + D) | 0), D)) |
              0),
              (t[I] = U),
              (t[I + 1] = F);
          }
          for (var $ = 0; $ < 160; $ += 2) {
            (U = t[$]), (F = t[$ + 1]);
            var H = u(r, n, i),
              W = u(b, w, E),
              q = h(r, b),
              V = h(b, r),
              z = d(a, S),
              G = d(S, a),
              J = o[$],
              Z = o[$ + 1],
              K = c(a, l, v),
              Y = c(S, M, C),
              Q = (R + G) | 0,
              X = (y + z + _(Q, R)) | 0;
            X =
              ((X =
                ((X = (X + K + _((Q = (Q + Y) | 0), Y)) | 0) +
                  J +
                  _((Q = (Q + Z) | 0), Z)) |
                0) +
                U +
                _((Q = (Q + F) | 0), F)) |
              0;
            var ee = (V + W) | 0,
              te = (q + H + _(ee, V)) | 0;
            (y = v),
              (R = C),
              (v = l),
              (C = M),
              (l = a),
              (M = S),
              (a = (s + X + _((S = (k + Q) | 0), k)) | 0),
              (s = i),
              (k = E),
              (i = n),
              (E = w),
              (n = r),
              (w = b),
              (r = (X + te + _((b = (Q + ee) | 0), Q)) | 0);
          }
          (this._al = (this._al + b) | 0),
            (this._bl = (this._bl + w) | 0),
            (this._cl = (this._cl + E) | 0),
            (this._dl = (this._dl + k) | 0),
            (this._el = (this._el + S) | 0),
            (this._fl = (this._fl + M) | 0),
            (this._gl = (this._gl + C) | 0),
            (this._hl = (this._hl + R) | 0),
            (this._ah = (this._ah + r + _(this._al, b)) | 0),
            (this._bh = (this._bh + n + _(this._bl, w)) | 0),
            (this._ch = (this._ch + i + _(this._cl, E)) | 0),
            (this._dh = (this._dh + s + _(this._dl, k)) | 0),
            (this._eh = (this._eh + a + _(this._el, S)) | 0),
            (this._fh = (this._fh + l + _(this._fl, M)) | 0),
            (this._gh = (this._gh + v + _(this._gl, C)) | 0),
            (this._hh = (this._hh + y + _(this._hl, R)) | 0);
        }),
        (l.prototype._hash = function () {
          var e = s.allocUnsafe(64);
          function t(t, r, n) {
            e.writeInt32BE(t, n), e.writeInt32BE(r, n + 4);
          }
          return (
            t(this._ah, this._al, 0),
            t(this._bh, this._bl, 8),
            t(this._ch, this._cl, 16),
            t(this._dh, this._dl, 24),
            t(this._eh, this._el, 32),
            t(this._fh, this._fl, 40),
            t(this._gh, this._gl, 48),
            t(this._hh, this._hl, 56),
            e
          );
        }),
        (e.exports = l);
    },
    82390: (e, t, r) => {
      function n(e) {
        try {
          if (!r.g.localStorage) return !1;
        } catch (n) {
          return !1;
        }
        var t = r.g.localStorage[e];
        return null != t && "true" === String(t).toLowerCase();
      }
      e.exports = function (e, t) {
        if (n("noDeprecation")) return e;
        var r = !1;
        return function () {
          if (!r) {
            if (n("throwDeprecation")) throw new Error(t);
            n("traceDeprecation") ? console.trace(t) : console.warn(t),
              (r = !0);
          }
          return e.apply(this, arguments);
        };
      };
    },
    60049: (e) => {
      e.exports = function () {
        for (var e = {}, r = 0; r < arguments.length; r++) {
          var n = arguments[r];
          for (var i in n) t.call(n, i) && (e[i] = n[i]);
        }
        return e;
      };
      var t = Object.prototype.hasOwnProperty;
    },
    48678: (e) => {
      "use strict";
      e.exports = function (e) {
        e.prototype[Symbol.iterator] = function* () {
          for (let e = this.head; e; e = e.next) yield e.value;
        };
      };
    },
    44548: (e, t, r) => {
      "use strict";
      function n(e) {
        var t = this;
        if (
          (t instanceof n || (t = new n()),
          (t.tail = null),
          (t.head = null),
          (t.length = 0),
          e && "function" === typeof e.forEach)
        )
          e.forEach(function (e) {
            t.push(e);
          });
        else if (arguments.length > 0)
          for (var r = 0, i = arguments.length; r < i; r++)
            t.push(arguments[r]);
        return t;
      }
      function i(e, t, r) {
        var n = t === e.head ? new a(r, null, t, e) : new a(r, t, t.next, e);
        return (
          null === n.next && (e.tail = n),
          null === n.prev && (e.head = n),
          e.length++,
          n
        );
      }
      function s(e, t) {
        (e.tail = new a(t, e.tail, null, e)),
          e.head || (e.head = e.tail),
          e.length++;
      }
      function o(e, t) {
        (e.head = new a(t, null, e.head, e)),
          e.tail || (e.tail = e.head),
          e.length++;
      }
      function a(e, t, r, n) {
        if (!(this instanceof a)) return new a(e, t, r, n);
        (this.list = n),
          (this.value = e),
          t ? ((t.next = this), (this.prev = t)) : (this.prev = null),
          r ? ((r.prev = this), (this.next = r)) : (this.next = null);
      }
      (e.exports = n),
        (n.Node = a),
        (n.create = n),
        (n.prototype.removeNode = function (e) {
          if (e.list !== this)
            throw new Error("removing node which does not belong to this list");
          var t = e.next,
            r = e.prev;
          return (
            t && (t.prev = r),
            r && (r.next = t),
            e === this.head && (this.head = t),
            e === this.tail && (this.tail = r),
            e.list.length--,
            (e.next = null),
            (e.prev = null),
            (e.list = null),
            t
          );
        }),
        (n.prototype.unshiftNode = function (e) {
          if (e !== this.head) {
            e.list && e.list.removeNode(e);
            var t = this.head;
            (e.list = this),
              (e.next = t),
              t && (t.prev = e),
              (this.head = e),
              this.tail || (this.tail = e),
              this.length++;
          }
        }),
        (n.prototype.pushNode = function (e) {
          if (e !== this.tail) {
            e.list && e.list.removeNode(e);
            var t = this.tail;
            (e.list = this),
              (e.prev = t),
              t && (t.next = e),
              (this.tail = e),
              this.head || (this.head = e),
              this.length++;
          }
        }),
        (n.prototype.push = function () {
          for (var e = 0, t = arguments.length; e < t; e++)
            s(this, arguments[e]);
          return this.length;
        }),
        (n.prototype.unshift = function () {
          for (var e = 0, t = arguments.length; e < t; e++)
            o(this, arguments[e]);
          return this.length;
        }),
        (n.prototype.pop = function () {
          if (this.tail) {
            var e = this.tail.value;
            return (
              (this.tail = this.tail.prev),
              this.tail ? (this.tail.next = null) : (this.head = null),
              this.length--,
              e
            );
          }
        }),
        (n.prototype.shift = function () {
          if (this.head) {
            var e = this.head.value;
            return (
              (this.head = this.head.next),
              this.head ? (this.head.prev = null) : (this.tail = null),
              this.length--,
              e
            );
          }
        }),
        (n.prototype.forEach = function (e, t) {
          t = t || this;
          for (var r = this.head, n = 0; null !== r; n++)
            e.call(t, r.value, n, this), (r = r.next);
        }),
        (n.prototype.forEachReverse = function (e, t) {
          t = t || this;
          for (var r = this.tail, n = this.length - 1; null !== r; n--)
            e.call(t, r.value, n, this), (r = r.prev);
        }),
        (n.prototype.get = function (e) {
          for (var t = 0, r = this.head; null !== r && t < e; t++) r = r.next;
          if (t === e && null !== r) return r.value;
        }),
        (n.prototype.getReverse = function (e) {
          for (var t = 0, r = this.tail; null !== r && t < e; t++) r = r.prev;
          if (t === e && null !== r) return r.value;
        }),
        (n.prototype.map = function (e, t) {
          t = t || this;
          for (var r = new n(), i = this.head; null !== i; )
            r.push(e.call(t, i.value, this)), (i = i.next);
          return r;
        }),
        (n.prototype.mapReverse = function (e, t) {
          t = t || this;
          for (var r = new n(), i = this.tail; null !== i; )
            r.push(e.call(t, i.value, this)), (i = i.prev);
          return r;
        }),
        (n.prototype.reduce = function (e, t) {
          var r,
            n = this.head;
          if (arguments.length > 1) r = t;
          else {
            if (!this.head)
              throw new TypeError("Reduce of empty list with no initial value");
            (n = this.head.next), (r = this.head.value);
          }
          for (var i = 0; null !== n; i++) (r = e(r, n.value, i)), (n = n.next);
          return r;
        }),
        (n.prototype.reduceReverse = function (e, t) {
          var r,
            n = this.tail;
          if (arguments.length > 1) r = t;
          else {
            if (!this.tail)
              throw new TypeError("Reduce of empty list with no initial value");
            (n = this.tail.prev), (r = this.tail.value);
          }
          for (var i = this.length - 1; null !== n; i--)
            (r = e(r, n.value, i)), (n = n.prev);
          return r;
        }),
        (n.prototype.toArray = function () {
          for (
            var e = new Array(this.length), t = 0, r = this.head;
            null !== r;
            t++
          )
            (e[t] = r.value), (r = r.next);
          return e;
        }),
        (n.prototype.toArrayReverse = function () {
          for (
            var e = new Array(this.length), t = 0, r = this.tail;
            null !== r;
            t++
          )
            (e[t] = r.value), (r = r.prev);
          return e;
        }),
        (n.prototype.slice = function (e, t) {
          (t = t || this.length) < 0 && (t += this.length),
            (e = e || 0) < 0 && (e += this.length);
          var r = new n();
          if (t < e || t < 0) return r;
          e < 0 && (e = 0), t > this.length && (t = this.length);
          for (var i = 0, s = this.head; null !== s && i < e; i++) s = s.next;
          for (; null !== s && i < t; i++, s = s.next) r.push(s.value);
          return r;
        }),
        (n.prototype.sliceReverse = function (e, t) {
          (t = t || this.length) < 0 && (t += this.length),
            (e = e || 0) < 0 && (e += this.length);
          var r = new n();
          if (t < e || t < 0) return r;
          e < 0 && (e = 0), t > this.length && (t = this.length);
          for (var i = this.length, s = this.tail; null !== s && i > t; i--)
            s = s.prev;
          for (; null !== s && i > e; i--, s = s.prev) r.push(s.value);
          return r;
        }),
        (n.prototype.splice = function (e, t) {
          e > this.length && (e = this.length - 1),
            e < 0 && (e = this.length + e);
          for (var r = 0, n = this.head; null !== n && r < e; r++) n = n.next;
          var s = [];
          for (r = 0; n && r < t; r++)
            s.push(n.value), (n = this.removeNode(n));
          null === n && (n = this.tail),
            n !== this.head && n !== this.tail && (n = n.prev);
          for (
            r = 0;
            r < (arguments.length <= 2 ? 0 : arguments.length - 2);
            r++
          )
            n = i(
              this,
              n,
              r + 2 < 2 || arguments.length <= r + 2 ? void 0 : arguments[r + 2]
            );
          return s;
        }),
        (n.prototype.reverse = function () {
          for (
            var e = this.head, t = this.tail, r = e;
            null !== r;
            r = r.prev
          ) {
            var n = r.prev;
            (r.prev = r.next), (r.next = n);
          }
          return (this.head = t), (this.tail = e), this;
        });
      try {
        r(48678)(n);
      } catch (l) {}
    },
    87089: (e, t, r) => {
      "use strict";
      r.r(t),
        r.d(t, {
          Struct: () => u,
          StructError: () => n,
          any: () => M,
          array: () => C,
          assert: () => h,
          assign: () => m,
          bigint: () => R,
          boolean: () => I,
          coerce: () => K,
          create: () => d,
          date: () => A,
          defaulted: () => Y,
          define: () => _,
          deprecated: () => v,
          dynamic: () => y,
          empty: () => X,
          enums: () => x,
          func: () => L,
          instance: () => N,
          integer: () => P,
          intersection: () => T,
          is: () => p,
          lazy: () => b,
          literal: () => O,
          map: () => B,
          mask: () => f,
          max: () => te,
          min: () => re,
          never: () => j,
          nonempty: () => ne,
          nullable: () => D,
          number: () => F,
          object: () => U,
          omit: () => w,
          optional: () => $,
          partial: () => E,
          pattern: () => ie,
          pick: () => k,
          record: () => H,
          refine: () => oe,
          regexp: () => W,
          set: () => q,
          size: () => se,
          string: () => V,
          struct: () => S,
          trimmed: () => Q,
          tuple: () => z,
          type: () => G,
          union: () => J,
          unknown: () => Z,
          validate: () => g,
        });
      class n extends TypeError {
        constructor(e, t) {
          let r;
          const { message: n, explanation: i, ...s } = e,
            { path: o } = e,
            a = 0 === o.length ? n : `At path: ${o.join(".")} -- ${n}`;
          super(i ?? a),
            null != i && (this.cause = a),
            Object.assign(this, s),
            (this.name = this.constructor.name),
            (this.failures = () => r ?? (r = [e, ...t()]));
        }
      }
      function i(e) {
        return "object" === typeof e && null != e;
      }
      function s(e) {
        if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
        const t = Object.getPrototypeOf(e);
        return null === t || t === Object.prototype;
      }
      function o(e) {
        return "symbol" === typeof e
          ? e.toString()
          : "string" === typeof e
          ? JSON.stringify(e)
          : `${e}`;
      }
      function a(e, t, r, n) {
        if (!0 === e) return;
        !1 === e ? (e = {}) : "string" === typeof e && (e = { message: e });
        const { path: i, branch: s } = t,
          { type: a } = r,
          {
            refinement: l,
            message: c = `Expected a value of type \`${a}\`${
              l ? ` with refinement \`${l}\`` : ""
            }, but received: \`${o(n)}\``,
          } = e;
        return {
          value: n,
          type: a,
          refinement: l,
          key: i[i.length - 1],
          path: i,
          branch: s,
          ...e,
          message: c,
        };
      }
      function* l(e, t, r, n) {
        var s;
        (i((s = e)) && "function" === typeof s[Symbol.iterator]) || (e = [e]);
        for (const i of e) {
          const e = a(i, t, r, n);
          e && (yield e);
        }
      }
      function c(e, t) {
        let r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return (function* () {
          const {
              path: n = [],
              branch: s = [e],
              coerce: o = !1,
              mask: a = !1,
            } = r,
            l = { path: n, branch: s };
          if (
            o &&
            ((e = t.coercer(e, l)),
            a && "type" !== t.type && i(t.schema) && i(e) && !Array.isArray(e))
          )
            for (const r in e) void 0 === t.schema[r] && delete e[r];
          let u = "valid";
          for (const i of t.validator(e, l))
            (i.explanation = r.message), (u = "not_valid"), yield [i, void 0];
          for (let [h, d, f] of t.entries(e, l)) {
            const t = c(d, f, {
              path: void 0 === h ? n : [...n, h],
              branch: void 0 === h ? s : [...s, d],
              coerce: o,
              mask: a,
              message: r.message,
            });
            for (const r of t)
              r[0]
                ? ((u = null != r[0].refinement ? "not_refined" : "not_valid"),
                  yield [r[0], void 0])
                : o &&
                  ((d = r[1]),
                  void 0 === h
                    ? (e = d)
                    : e instanceof Map
                    ? e.set(h, d)
                    : e instanceof Set
                    ? e.add(d)
                    : i(e) && (void 0 !== d || h in e) && (e[h] = d));
          }
          if ("not_valid" !== u)
            for (const i of t.refiner(e, l))
              (i.explanation = r.message),
                (u = "not_refined"),
                yield [i, void 0];
          "valid" === u && (yield [void 0, e]);
        })();
      }
      class u {
        constructor(e) {
          const {
            type: t,
            schema: r,
            validator: n,
            refiner: i,
            coercer: s = (e) => e,
            entries: o = function* () {},
          } = e;
          (this.type = t),
            (this.schema = r),
            (this.entries = o),
            (this.coercer = s),
            (this.validator = n ? (e, t) => l(n(e, t), t, this, e) : () => []),
            (this.refiner = i ? (e, t) => l(i(e, t), t, this, e) : () => []);
        }
        assert(e, t) {
          return h(e, this, t);
        }
        create(e, t) {
          return d(e, this, t);
        }
        is(e) {
          return p(e, this);
        }
        mask(e, t) {
          return f(e, this, t);
        }
        validate(e) {
          return g(
            e,
            this,
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          );
        }
      }
      function h(e, t, r) {
        const n = g(e, t, { message: r });
        if (n[0]) throw n[0];
      }
      function d(e, t, r) {
        const n = g(e, t, { coerce: !0, message: r });
        if (n[0]) throw n[0];
        return n[1];
      }
      function f(e, t, r) {
        const n = g(e, t, { coerce: !0, mask: !0, message: r });
        if (n[0]) throw n[0];
        return n[1];
      }
      function p(e, t) {
        return !g(e, t)[0];
      }
      function g(e, t) {
        const r = c(
            e,
            t,
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
          ),
          i = (function (e) {
            const { done: t, value: r } = e.next();
            return t ? void 0 : r;
          })(r);
        if (i[0]) {
          return [
            new n(i[0], function* () {
              for (const e of r) e[0] && (yield e[0]);
            }),
            void 0,
          ];
        }
        return [void 0, i[1]];
      }
      function m() {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
          t[r] = arguments[r];
        const n = "type" === t[0].type,
          i = t.map((e) => e.schema),
          s = Object.assign({}, ...i);
        return n ? G(s) : U(s);
      }
      function _(e, t) {
        return new u({ type: e, schema: null, validator: t });
      }
      function v(e, t) {
        return new u({
          ...e,
          refiner: (t, r) => void 0 === t || e.refiner(t, r),
          validator: (r, n) => void 0 === r || (t(r, n), e.validator(r, n)),
        });
      }
      function y(e) {
        return new u({
          type: "dynamic",
          schema: null,
          *entries(t, r) {
            const n = e(t, r);
            yield* n.entries(t, r);
          },
          validator: (t, r) => e(t, r).validator(t, r),
          coercer: (t, r) => e(t, r).coercer(t, r),
          refiner: (t, r) => e(t, r).refiner(t, r),
        });
      }
      function b(e) {
        let t;
        return new u({
          type: "lazy",
          schema: null,
          *entries(r, n) {
            t ?? (t = e()), yield* t.entries(r, n);
          },
          validator: (r, n) => (t ?? (t = e()), t.validator(r, n)),
          coercer: (r, n) => (t ?? (t = e()), t.coercer(r, n)),
          refiner: (r, n) => (t ?? (t = e()), t.refiner(r, n)),
        });
      }
      function w(e, t) {
        const { schema: r } = e,
          n = { ...r };
        for (const i of t) delete n[i];
        return "type" === e.type ? G(n) : U(n);
      }
      function E(e) {
        const t = e instanceof u,
          r = t ? { ...e.schema } : { ...e };
        for (const n in r) r[n] = $(r[n]);
        return t && "type" === e.type ? G(r) : U(r);
      }
      function k(e, t) {
        const { schema: r } = e,
          n = {};
        for (const i of t) n[i] = r[i];
        return "type" === e.type ? G(n) : U(n);
      }
      function S(e, t) {
        return (
          console.warn(
            "superstruct@0.11 - The `struct` helper has been renamed to `define`."
          ),
          _(e, t)
        );
      }
      function M() {
        return _("any", () => !0);
      }
      function C(e) {
        return new u({
          type: "array",
          schema: e,
          *entries(t) {
            if (e && Array.isArray(t))
              for (const [r, n] of t.entries()) yield [r, n, e];
          },
          coercer: (e) => (Array.isArray(e) ? e.slice() : e),
          validator: (e) =>
            Array.isArray(e) ||
            `Expected an array value, but received: ${o(e)}`,
        });
      }
      function R() {
        return _("bigint", (e) => "bigint" === typeof e);
      }
      function I() {
        return _("boolean", (e) => "boolean" === typeof e);
      }
      function A() {
        return _(
          "date",
          (e) =>
            (e instanceof Date && !isNaN(e.getTime())) ||
            `Expected a valid \`Date\` object, but received: ${o(e)}`
        );
      }
      function x(e) {
        const t = {},
          r = e.map((e) => o(e)).join();
        for (const n of e) t[n] = n;
        return new u({
          type: "enums",
          schema: t,
          validator: (t) =>
            e.includes(t) || `Expected one of \`${r}\`, but received: ${o(t)}`,
        });
      }
      function L() {
        return _(
          "func",
          (e) =>
            "function" === typeof e ||
            `Expected a function, but received: ${o(e)}`
        );
      }
      function N(e) {
        return _(
          "instance",
          (t) =>
            t instanceof e ||
            `Expected a \`${e.name}\` instance, but received: ${o(t)}`
        );
      }
      function P() {
        return _(
          "integer",
          (e) =>
            ("number" === typeof e && !isNaN(e) && Number.isInteger(e)) ||
            `Expected an integer, but received: ${o(e)}`
        );
      }
      function T(e) {
        return new u({
          type: "intersection",
          schema: null,
          *entries(t, r) {
            for (const n of e) yield* n.entries(t, r);
          },
          *validator(t, r) {
            for (const n of e) yield* n.validator(t, r);
          },
          *refiner(t, r) {
            for (const n of e) yield* n.refiner(t, r);
          },
        });
      }
      function O(e) {
        const t = o(e),
          r = typeof e;
        return new u({
          type: "literal",
          schema:
            "string" === r || "number" === r || "boolean" === r ? e : null,
          validator: (r) =>
            r === e || `Expected the literal \`${t}\`, but received: ${o(r)}`,
        });
      }
      function B(e, t) {
        return new u({
          type: "map",
          schema: null,
          *entries(r) {
            if (e && t && r instanceof Map)
              for (const [n, i] of r.entries())
                yield [n, n, e], yield [n, i, t];
          },
          coercer: (e) => (e instanceof Map ? new Map(e) : e),
          validator: (e) =>
            e instanceof Map ||
            `Expected a \`Map\` object, but received: ${o(e)}`,
        });
      }
      function j() {
        return _("never", () => !1);
      }
      function D(e) {
        return new u({
          ...e,
          validator: (t, r) => null === t || e.validator(t, r),
          refiner: (t, r) => null === t || e.refiner(t, r),
        });
      }
      function F() {
        return _(
          "number",
          (e) =>
            ("number" === typeof e && !isNaN(e)) ||
            `Expected a number, but received: ${o(e)}`
        );
      }
      function U(e) {
        const t = e ? Object.keys(e) : [],
          r = j();
        return new u({
          type: "object",
          schema: e || null,
          *entries(n) {
            if (e && i(n)) {
              const i = new Set(Object.keys(n));
              for (const r of t) i.delete(r), yield [r, n[r], e[r]];
              for (const e of i) yield [e, n[e], r];
            }
          },
          validator: (e) => i(e) || `Expected an object, but received: ${o(e)}`,
          coercer: (e) => (i(e) ? { ...e } : e),
        });
      }
      function $(e) {
        return new u({
          ...e,
          validator: (t, r) => void 0 === t || e.validator(t, r),
          refiner: (t, r) => void 0 === t || e.refiner(t, r),
        });
      }
      function H(e, t) {
        return new u({
          type: "record",
          schema: null,
          *entries(r) {
            if (i(r))
              for (const n in r) {
                const i = r[n];
                yield [n, n, e], yield [n, i, t];
              }
          },
          validator: (e) => i(e) || `Expected an object, but received: ${o(e)}`,
        });
      }
      function W() {
        return _("regexp", (e) => e instanceof RegExp);
      }
      function q(e) {
        return new u({
          type: "set",
          schema: null,
          *entries(t) {
            if (e && t instanceof Set) for (const r of t) yield [r, r, e];
          },
          coercer: (e) => (e instanceof Set ? new Set(e) : e),
          validator: (e) =>
            e instanceof Set ||
            `Expected a \`Set\` object, but received: ${o(e)}`,
        });
      }
      function V() {
        return _(
          "string",
          (e) =>
            "string" === typeof e || `Expected a string, but received: ${o(e)}`
        );
      }
      function z(e) {
        const t = j();
        return new u({
          type: "tuple",
          schema: null,
          *entries(r) {
            if (Array.isArray(r)) {
              const n = Math.max(e.length, r.length);
              for (let i = 0; i < n; i++) yield [i, r[i], e[i] || t];
            }
          },
          validator: (e) =>
            Array.isArray(e) || `Expected an array, but received: ${o(e)}`,
        });
      }
      function G(e) {
        const t = Object.keys(e);
        return new u({
          type: "type",
          schema: e,
          *entries(r) {
            if (i(r)) for (const n of t) yield [n, r[n], e[n]];
          },
          validator: (e) => i(e) || `Expected an object, but received: ${o(e)}`,
          coercer: (e) => (i(e) ? { ...e } : e),
        });
      }
      function J(e) {
        const t = e.map((e) => e.type).join(" | ");
        return new u({
          type: "union",
          schema: null,
          coercer(t) {
            for (const r of e) {
              const [e, n] = r.validate(t, { coerce: !0 });
              if (!e) return n;
            }
            return t;
          },
          validator(r, n) {
            const i = [];
            for (const t of e) {
              const [...e] = c(r, t, n),
                [s] = e;
              if (!s[0]) return [];
              for (const [t] of e) t && i.push(t);
            }
            return [
              `Expected the value to satisfy a union of \`${t}\`, but received: ${o(
                r
              )}`,
              ...i,
            ];
          },
        });
      }
      function Z() {
        return _("unknown", () => !0);
      }
      function K(e, t, r) {
        return new u({
          ...e,
          coercer: (n, i) =>
            p(n, t) ? e.coercer(r(n, i), i) : e.coercer(n, i),
        });
      }
      function Y(e, t) {
        let r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return K(e, Z(), (e) => {
          const n = "function" === typeof t ? t() : t;
          if (void 0 === e) return n;
          if (!r.strict && s(e) && s(n)) {
            const t = { ...e };
            let r = !1;
            for (const e in n) void 0 === t[e] && ((t[e] = n[e]), (r = !0));
            if (r) return t;
          }
          return e;
        });
      }
      function Q(e) {
        return K(e, V(), (e) => e.trim());
      }
      function X(e) {
        return oe(e, "empty", (t) => {
          const r = ee(t);
          return (
            0 === r ||
            `Expected an empty ${e.type} but received one with a size of \`${r}\``
          );
        });
      }
      function ee(e) {
        return e instanceof Map || e instanceof Set ? e.size : e.length;
      }
      function te(e, t) {
        let r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        const { exclusive: n } = r;
        return oe(e, "max", (r) =>
          n
            ? r < t
            : r <= t ||
              `Expected a ${e.type} less than ${
                n ? "" : "or equal to "
              }${t} but received \`${r}\``
        );
      }
      function re(e, t) {
        let r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        const { exclusive: n } = r;
        return oe(e, "min", (r) =>
          n
            ? r > t
            : r >= t ||
              `Expected a ${e.type} greater than ${
                n ? "" : "or equal to "
              }${t} but received \`${r}\``
        );
      }
      function ne(e) {
        return oe(
          e,
          "nonempty",
          (t) =>
            ee(t) > 0 ||
            `Expected a nonempty ${e.type} but received an empty one`
        );
      }
      function ie(e, t) {
        return oe(
          e,
          "pattern",
          (r) =>
            t.test(r) ||
            `Expected a ${e.type} matching \`/${t.source}/\` but received "${r}"`
        );
      }
      function se(e, t) {
        let r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t;
        const n = `Expected a ${e.type}`,
          i = t === r ? `of \`${t}\`` : `between \`${t}\` and \`${r}\``;
        return oe(e, "size", (e) => {
          if ("number" === typeof e || e instanceof Date)
            return (t <= e && e <= r) || `${n} ${i} but received \`${e}\``;
          if (e instanceof Map || e instanceof Set) {
            const { size: s } = e;
            return (
              (t <= s && s <= r) ||
              `${n} with a size ${i} but received one with a size of \`${s}\``
            );
          }
          {
            const { length: s } = e;
            return (
              (t <= s && s <= r) ||
              `${n} with a length ${i} but received one with a length of \`${s}\``
            );
          }
        });
      }
      function oe(e, t, r) {
        return new u({
          ...e,
          *refiner(n, i) {
            yield* e.refiner(n, i);
            const s = l(r(n, i), i, e, n);
            for (const e of s) yield { ...e, refinement: t };
          },
        });
      }
    },
  },
]);
//# sourceMappingURL=374.42602a31.chunk.js.map
