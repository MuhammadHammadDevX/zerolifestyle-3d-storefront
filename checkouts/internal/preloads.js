
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com","https://extensions.shopifycdn.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.Lg8ZtQUP.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.B4UGqwY7.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor-legacy.L-iohbD_.js","/cdn/shopifycloud/checkout-web/assets/c1/context-browser-legacy.qNWuRZUp.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayCheckoutGqlVersion-legacy.C42Of5f6.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-mapper-load-recovery-legacy.ZQx7H6mr.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-eager-mappers-legacy.BGoVEkzn.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-proposal-legacy.BdwXg_rK.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-installmentsNotSupportedForAddress-legacy.D-xrXFwx.js","/cdn/shopifycloud/checkout-web/assets/c1/consent-manager-shared-legacy.miD9QMKn.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-extension-execution-errors-legacy.6_sNoBTq.js","/cdn/shopifycloud/checkout-web/assets/c1/extensions-rpc-legacy.NuTaY3mD.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-normalizeBuyerDetails-legacy.Bbb47c-m.js","/cdn/shopifycloud/checkout-web/assets/c1/NotFound-legacy.DW807rJg.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-derivations-legacy.BY_HtjZ1.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-grouping-legacy.C4ufjnYc.js","/cdn/shopifycloud/checkout-web/assets/c1/color-contrast-colorContrast-legacy.Ppigxv6d.js","/cdn/shopifycloud/checkout-web/assets/c1/hydrate-legacy.hbyegtmq.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en-legacy.DXHKBPbQ.js","/cdn/shopifycloud/checkout-web/assets/c1/OnePage-legacy.CQrdVEmN.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUnauthenticatedErrorModal-legacy.CYHhOZwG.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePostPurchase-legacy.CVL-XifY.js","/cdn/shopifycloud/checkout-web/assets/c1/components-DeliveryTransition-legacy.0ypf4GrA.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShowShopPayOptin-legacy.DlqgSLLL.js","/cdn/shopifycloud/checkout-web/assets/c1/remember-me-hooks-legacy.CnCOAt7p.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink-legacy.BduaWpg5.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressForm-legacy.9ZVVvhVc.js","/cdn/shopifycloud/checkout-web/assets/c1/PhoneField-legacy.CNamyIGD.js","/cdn/shopifycloud/checkout-web/assets/c1/ImpressionEventCapture-legacy.CTmZwoM0.js","/cdn/shopifycloud/checkout-web/assets/c1/components-RedirectionNotice.module-legacy.Cvrml7ER.js","/cdn/shopifycloud/checkout-web/assets/c1/Popover-legacy.Dplm21ED.js","/cdn/shopifycloud/checkout-web/assets/c1/Choice-legacy.Cb_8xWH9.js","/cdn/shopifycloud/checkout-web/assets/c1/business-customer-constants-legacy.BVioQ5Z6.js","/cdn/shopifycloud/checkout-web/assets/c1/Checkbox-legacy.C51gBrZ0.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl-legacy.BSlXB7Wp.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useEcpSpiDebugLog-legacy.CLXq4w2z.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo-legacy.DaLeVC1x.js","/cdn/shopifycloud/checkout-web/assets/c1/Monorail-monorailMetric-wallets-legacy.CmZSx2vt.js","/cdn/shopifycloud/checkout-web/assets/c1/cross-border-hooks-legacy.CCJUdnKj.js","/cdn/shopifycloud/checkout-web/assets/c1/EmptyState-legacy.CECwjEQ_.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks-legacy.7abUGkU6.js","/cdn/shopifycloud/checkout-web/assets/c1/PendingShipping-legacy.mlMLuKa-.js","/cdn/shopifycloud/checkout-web/assets/c1/components-useVaultedMsiInstallments-legacy.Bbk1iWOr.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentIcon-legacy.CXepWNiq.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-context-legacy.DDprvvV_.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage-legacy.BDWSS6vu.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentLine-legacy.CzMk9kog.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName-legacy.D9FSzTIG.js","/cdn/shopifycloud/checkout-web/assets/c1/cvv-cvvBridge-legacy.DgYL1ozf.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useFilteredShopPayAvailablePaymentMethods-legacy.FPjNDaj3.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-legacy.BUdcGtSz.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary-legacy.DaaMnrd-.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPaySessionTokenStorage-legacy.COyC05pj.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit-legacy.BTzFezzI.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentButtons-legacy.B3gDBSvX.js","/cdn/shopifycloud/checkout-web/assets/c1/IncentiveBadge-legacy.Bs7_A1pA.js","/cdn/shopifycloud/checkout-web/assets/c1/utils-useViolationsHandler-legacy.QUiGoGkG.js","/cdn/shopifycloud/checkout-web/assets/c1/negotiated-findSelectedDeliveryMethod-legacy.CDFmCo3_.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-payment-button-legacy.gucNA1Jb.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useStableHostMethodsReferences-legacy.0znPNUUq.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-monorail-legacy.B766kmSX.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useAvailableShopPromotionDiscount-legacy.C5ULbKpU.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressSelector-legacy.BDQcuORK.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner-legacy.CL9CeSrT.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch-legacy.BG-3boYr.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-as-guest-amazon-pay-legacy.B8mOw0QX.js","/cdn/shopifycloud/checkout-web/assets/c1/Middot-legacy.CHAvVBUk.js","/cdn/shopifycloud/checkout-web/assets/c1/EstimatedDeliveryContent-legacy.DPznLFqj.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodRateLabel-legacy.CazDvnci.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-consolidated-included-legacy.BshpFldp.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingLines-legacy.B5Uz3Wzn.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown-legacy.BIdE6jg-.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal-legacy.CPOPVMTw.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector-legacy.DFyxb6nC.js","/cdn/shopifycloud/checkout-web/assets/c1/TextArea-legacy.CzhNPksG.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown-legacy.yUWGqxQU.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList-legacy.DGir9L6L.js","/cdn/shopifycloud/checkout-web/assets/c1/extensibility-browser-engine-legacy.A2kz8C4i.js","/cdn/shopifycloud/checkout-web/assets/c1/component-RuntimeExtension-legacy.DaHVz6oo.js","/cdn/shopifycloud/checkout-web/assets/c1/AnnouncementRuntimeExtensions-legacy.DWyOuuc7.js","/cdn/shopifycloud/checkout-web/assets/c1/QRCode-legacy.C6ZruqAj.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-dates-legacy.DCA0mtXE.js","/cdn/shopifycloud/checkout-web/assets/c1/NumberField-legacy.FSla8Sm0.js","/cdn/shopifycloud/checkout-web/assets/c1/extensions-remote-dom-legacy.B3s-AiaO.js","/cdn/shopifycloud/checkout-web/assets/c1/EmailField-legacy.DrXv47Sl.js","/cdn/shopifycloud/checkout-web/assets/c1/Sheet-legacy.D7PQG7Ds.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-rendering-extension-targets-legacy.d9kcp8M6.js","/cdn/shopifycloud/checkout-web/assets/c1/dist-v4-legacy.hxLzMo8h.js","/cdn/shopifycloud/checkout-web/assets/c1/ExtensionsInner-legacy.BT4b0vPj.js","/cdn/shopifycloud/checkout-web/assets/c1/adapter-host-legacy.D1Lzg8FQ.js","/cdn/shopifycloud/checkout-web/assets/c1/sandbox.C6K77SV1.worker.js","/cdn/shopifycloud/checkout-web/assets/c1/sandbox-2025-07.BuraKs6q.worker.js","https://extensions.shopifycdn.com/shopifycloud/checkout-web/assets/c1/polyfills-entry-legacy.y34Tq78B.worker.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0722/8106/3702/files/logo_x320.png?v=1676901766"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  