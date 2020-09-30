import qz from "qz-tray";
export default {
  install(Vue, options) {
    Vue.prototype.$printer = {
      startConnection: function() {
        qz.security.setCertificatePromise(function(resolve, reject) {
          resolve(
            "-----BEGIN CERTIFICATE-----\n" +
              "MIIECzCCAvOgAwIBAgIJAL3DheFQ/5HqMA0GCSqGSIb3DQEBCwUAMIGaMQswCQYD" +
              "VQQGEwJLWjEZMBcGA1UECAwQU291dGggS2F6YWtoc3RhbjERMA8GA1UEBwwIU2h5" +
              "bWtlbnQxEjAQBgNVBAoMCVRNVC1Hcm91cDEMMAoGA1UECwwDSU1TMRcwFQYDVQQD" +
              "DA4qLnRtdC1ncm91cC5rejEiMCAGCSqGSIb3DQEJARYTdG9vZ21zb2Z0QGdtYWls" +
              "LmNvbTAgFw0yMDAyMTkwOTEyMTZaGA8yMDUxMDgxNDA5MTIxNlowgZoxCzAJBgNV" +
              "BAYTAktaMRkwFwYDVQQIDBBTb3V0aCBLYXpha2hzdGFuMREwDwYDVQQHDAhTaHlt" +
              "a2VudDESMBAGA1UECgwJVE1ULUdyb3VwMQwwCgYDVQQLDANJTVMxFzAVBgNVBAMM" +
              "DioudG10LWdyb3VwLmt6MSIwIAYJKoZIhvcNAQkBFhN0b29nbXNvZnRAZ21haWwu" +
              "Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2kUPBlHrf6d6hSVk" +
              "KlP2pr1K4ok2kbLgZGcqDKRthmOLqxTbVkeIUCskU5+XvYcCSkaRsVf7adMVOS+m" +
              "acKDP6r3rkDRIeB1qHXTJfg6D/dyD1jFMb98EPufrNwHD5ezuaDqKNfc3xTThHt9" +
              "wvYE3DvRo8ZOK1whmA1CBO6yEgqL7MPGCzylDwgxT7CnFDrNZRr+DWpsBqHmnMhh" +
              "3U/KQCT4K8FpekE/FQPChAnkJ82HcoyuT7FyPzSo+qZA0RbkRUybyJSu4BJJjxcv" +
              "qWKvCvphzB6Z5AzjYA4RsBiG5GqbhyJkPqy4Ugp4XL6nq1jquV9apMjoPpQR0KZx" +
              "s8v3PQIDAQABo1AwTjAdBgNVHQ4EFgQU3SoOb6jQzTbOSRKfImtnjzQrqHUwHwYD" +
              "VR0jBBgwFoAU3SoOb6jQzTbOSRKfImtnjzQrqHUwDAYDVR0TBAUwAwEB/zANBgkq" +
              "hkiG9w0BAQsFAAOCAQEABgmTjZZW85rG9mO6CBmjzHUqMR6uPxP8g23N1CJnAx/x" +
              "fqsGfH4yAGibCB55lxpZhR4X6q3YfXqdtgThD3gEMErf5bopRuO9fP1w39sz6cpJ" +
              "+jVKT7NMCzCY2ElIAOU7cbD/pNCm87GXznsODH8KuMYwinbq0JcFGc/0jlgAB5ob" +
              "rps076bJGQODMNu3GghvBApg9kVcMSM1zDjzNDWS8tzRkZ5iuZiKNqA9HkYpTFSn" +
              "BKiro6cXFKYc7FhQqPX5JI7rlvduK3jJEdHO/+fq/Jqxmx13GlXm9cQQVtoT9EJ7" +
              "YomfRz1sq5sXQ6zvbhD54HT/04vlhBYrFSPAwuKjGw==\n" +
              "-----END CERTIFICATE-----"
          );
        });

        qz.security.setSignaturePromise(function(toSign) {
          return async function(resolve, reject) {
            try {
              const sign = await (
                await fetch(
                  `http://localhost:4040/order/esc-sign?toSign=${toSign}`
                )
              ).text();

              resolve(sign);
            } catch (err) {
              // console.error(err);
              reject(err);
            }
          };
        });

        qz.websocket.connect().catch(function(e) {
          console.error(e);
        });
      },
      closeConnection: function() {
        qz.websocket.disconnect();
      },

      print: async function(orderText) {
        await qz.printers.getDefault().then(function(printer) {
          let config = qz.configs.create(printer);
          let data = [
            {
              type: "pixel",
              format: "html",
              flavor: "plain", // or 'plain' if the data is raw HTML
              data: orderText
            }
          ];
          return qz.print(config, data).catch(function(e) {
            console.error(e);
          });
        });
      }
    };
  }
};
